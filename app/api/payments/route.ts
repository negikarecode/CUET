import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPaymentProvider } from "@/lib/payments/provider";
import {
  getPricingOffer,
  getUserEntitlement,
  getUserUsageSummary,
  getPlanConfig,
  reconcileUserEntitlements,
} from "@/lib/payments/entitlements";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";

export const dynamic = "force-dynamic";

/**
 * GET /api/payments
 * Authoritative endpoint for pricing, promotional availability, and student entitlement/usage.
 */
export async function GET(_req: NextRequest) {
  try {
    const pricingOffer = await getPricingOffer();

    // Check optional authenticated user session
    let authUser = null;
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      authUser = user;
    } catch {
      // Guest
    }

    let entitlement = null;
    let usage = null;

    if (authUser?.id) {
      entitlement = await getUserEntitlement(authUser.id);
      usage = await getUserUsageSummary(authUser.id);
    }

    return NextResponse.json({
      success: true,
      pricing: pricingOffer,
      entitlement,
      usage,
    });
  } catch (error: any) {
    console.error("[Payments GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve pricing information." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/payments
 * Unified handler for:
 * 1. Webhooks (via x-razorpay-signature)
 * 2. Order creation (action: "create-order")
 * 3. Payment verification (action: "verify")
 */
export async function POST(req: NextRequest) {
  const provider = getPaymentProvider();

  try {
    // ─── 1. WEBHOOK INVOCATION ───────────────────────────────────────────────
    const webhookSignature = req.headers.get("x-razorpay-signature");
    if (webhookSignature) {
      const rawBody = await req.text();
      const webhookResult = provider.verifyWebhook(rawBody, webhookSignature);

      if (!webhookResult.isValid) {
        console.error("[SECURITY ALERT] Invalid webhook signature detected. Failing closed.");
        return NextResponse.json(
          { error: "Invalid cryptographic webhook signature." },
          { status: 400 }
        );
      }

      const {
        event,
        userId,
        orderId,
        paymentId: rawPaymentId,
        amount,
        currency,
        refundId,
        refundAmount,
        disputeId,
        disputeAmount,
        disputeReason,
      } = webhookResult;

      let paymentId = rawPaymentId;

      // ─── WEBHOOK INBOX RECORDING & DEDUPLICATION ─────────────────────────────
      const eventIdHeader = req.headers.get("x-razorpay-event-id");
      const resolvedEventId = eventIdHeader || webhookResult.eventId || null;
      const supabaseAdmin = createAdminClient();

      let webhookEventPk: string | null = null;
      try {
        const { data: recordRes, error: recErr } = await supabaseAdmin.rpc("record_webhook_event", {
          p_provider: provider.name,
          p_event_id: resolvedEventId,
          p_event_type: event || "unknown",
          p_payment_id: paymentId || null,
          p_order_id: orderId || null,
          p_signature: webhookSignature,
          p_payload: webhookResult.rawPayload || {},
        });

        if (!recErr && recordRes) {
          if (recordRes.is_duplicate && recordRes.action === "ignore") {
            console.log(`[Webhook Deduplication] Event ${resolvedEventId || "(no-id)"} already processed. Ignoring duplicate.`);
            return NextResponse.json({ status: "ok", received: true, deduplicated: true });
          }
          webhookEventPk = recordRes.event_pk || null;
        }
      } catch (inboxErr) {
        console.warn("[Webhook Inbox Recording Warning]:", inboxErr);
      }

      const finalizeEvent = async (status: "processed" | "failed" | "deferred", errorMsg?: string) => {
        if (!webhookEventPk) return;
        try {
          await supabaseAdmin.rpc("finalize_webhook_event", {
            p_event_pk: webhookEventPk,
            p_status: status,
            p_error_message: errorMsg || null,
          });
        } catch (finErr) {
          console.warn("[Webhook Finalize Warning]:", finErr);
        }
      };

      // CRITICAL SEC-02: 'authorized' is NOT paid. Do NOT activate Premium on authorization alone.
      if (event === "payment.authorized") {
        console.log(`[Webhook Notice] Payment ${paymentId || "unknown"} is authorized but not captured. Entitlement fulfillment deferred.`);
        await finalizeEvent("deferred", "Awaiting capture");
        return NextResponse.json({ status: "ok", received: true, message: "Payment authorized; awaiting capture." });
      }

      // ─── 1A. HANDLE ORDER.PAID & PAYMENT.CAPTURED (FULFILLMENT GATE) ───────────
      if (event === "order.paid" || event === "payment.captured") {
        // Requirement P1: If event is order.paid without payment ID, attempt retrieval of captured payment from provider
        if (event === "order.paid" && !paymentId && orderId) {
          try {
            const orderPayments = await provider.fetchOrderPayments(orderId);
            const capturedPayment = orderPayments.find((p) => p.status === "captured");
            if (capturedPayment) {
              paymentId = capturedPayment.id;
            }
          } catch (fetchErr) {
            console.warn(`[Webhook Notice] Unable to fetch payments for order ${orderId}:`, fetchErr);
          }
        }

        // P1: Do not fulfill an order solely from order.paid unless the actual associated payment is retrieved and captured
        if (!paymentId) {
          console.log(`[Webhook Deferral] Event ${event} received for order ${orderId} without a verified captured payment ID. Fulfillment deferred.`);
          await finalizeEvent("deferred", "Verified captured payment ID is required");
          return NextResponse.json({
            status: "ok",
            received: true,
            message: "Fulfillment deferred: verified captured payment ID is required.",
          });
        }

        // Authoritative resolution of order and user from database
        let orderRecord: any = null;
        if (orderId) {
          try {
            const { data: ord, error: ordErr } = await supabaseAdmin
              .from("payment_orders")
              .select("id, user_id, status, amount_paise, plan_id, provider, currency, is_promotional")
              .eq("provider_order_id", orderId)
              .maybeSingle();
            if (ordErr) {
              console.warn("[Webhook Order Resolution Error]:", ordErr);
            }
            orderRecord = ord;
          } catch (ordErr) {
            console.warn("[Webhook Order Resolution Notice]:", ordErr);
          }
        }

        const effectiveUserId = userId || orderRecord?.user_id;
        if (!effectiveUserId) {
          console.error(`[CRITICAL] Webhook fulfillment failed: Cannot resolve candidate user for order ${orderId}, payment ${paymentId}`);
          await finalizeEvent("failed", "Unable to resolve target user for fulfillment");
          return NextResponse.json(
            { error: "Unable to resolve target user for fulfillment.", code: "USER_RESOLUTION_FAILED" },
            { status: 422 }
          );
        }

        // Validate provider matching
        if (orderRecord?.provider && orderRecord.provider !== provider.name) {
          console.error(`[SECURITY ALERT] Provider mismatch in webhook: order was created for ${orderRecord.provider}, received ${provider.name}`);
          await finalizeEvent("failed", "Payment provider mismatch on webhook fulfillment");
          return NextResponse.json(
            { error: "Payment provider mismatch on webhook fulfillment.", code: "PROVIDER_MISMATCH" },
            { status: 400 }
          );
        }

        // Exact amount validation: reject underpayment and overpayment
        const effectiveAmountPaise = amount ?? orderRecord?.amount_paise;
        if (orderRecord?.amount_paise && effectiveAmountPaise !== orderRecord.amount_paise) {
          console.error(
            `[SECURITY ALERT] Amount mismatch in webhook fulfillment: expected exactly ${orderRecord.amount_paise} paise, received ${effectiveAmountPaise} paise.`
          );
          await finalizeEvent("failed", "Payment amount mismatch");
          return NextResponse.json(
            { error: "Payment amount mismatch.", code: "PAYMENT_AMOUNT_MISMATCH" },
            { status: 400 }
          );
        }

        // Derive plan configuration server-side
        const resolvedPlanId = orderRecord?.plan_id || "all_access_pass_799";
        let planConfig;
        try {
          planConfig = getPlanConfig(resolvedPlanId);
        } catch {
          planConfig = getPlanConfig("all_access_pass_799");
        }

        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        try {
          // Attempt atomic PostgreSQL transaction fulfillment (SEC-01)
          const { error: rpcError } = await supabaseAdmin.rpc("fulfill_payment_order", {
            p_user_id: effectiveUserId,
            p_provider: provider.name,
            p_provider_order_id: orderId || "",
            p_provider_payment_id: paymentId,
            p_provider_signature: webhookSignature,
            p_amount_paise: effectiveAmountPaise || planConfig.standardPricePaise,
            p_currency: currency || orderRecord?.currency || "INR",
            p_tier: planConfig.tier,
            p_expires_at: oneYearFromNow.toISOString(),
            p_bonus_coins: planConfig.bonusCoins,
            p_raw_payload: { event, orderId, paymentId },
          });

          if (!rpcError) {
            console.log(`[Webhook Atomic Fulfillment] User ${effectiveUserId} successfully upgraded to Premium via payment ${paymentId}.`);
            await finalizeEvent("processed");
            return NextResponse.json({ status: "ok", received: true });
          }

          // FAIL-CLOSED: Never fall back to uncoordinated non-atomic mutations on fulfillment errors
          console.error(`[CRITICAL SEC-01] Webhook atomic fulfillment rejected for user ${effectiveUserId}:`, rpcError);
          await finalizeEvent("failed", rpcError.message);
          return NextResponse.json(
            { error: "Atomic payment fulfillment rejected.", code: "ATOMIC_FULFILLMENT_FAILED" },
            { status: 500 }
          );
        } catch (dbError: any) {
          console.error("[Webhook DB Update Notice]:", dbError);
          await finalizeEvent("failed", dbError?.message);
          return NextResponse.json({ error: "Webhook processing exception.", code: "INTERNAL_ERROR" }, { status: 500 });
        }
      }

      // ─── 1B. HANDLE DISPUTES (MONOTONIC STATE MACHINE RPC) ─────────────────
      // Invariant State Machine Specification (Atomic SQL RPC process_payment_dispute):
      // - payment.dispute.created: .update({ status: "disputed", dispute_status: "under_review" })
      // - payment.dispute.won: .update({ status: "captured", dispute_status: "won" }) [Dispute Won]
      // - payment.dispute.lost: .update({ status: "disputed_lost", dispute_status: "lost" })
      // - Promotional Inventory: updatedOrd?.is_promotional && updatedOrd?.id -> .update({ status: "released", user_id: null, order_id: null, claimed_at: null })
      if (
        event === "payment.dispute.created" ||
        event === "payment.dispute.won" ||
        event === "payment.dispute.lost"
      ) {
        if (!disputeId) {
          console.error(`[Webhook Dispute Error] Missing disputeId in event ${event}`);
          await finalizeEvent("failed", "Missing dispute ID");
          return NextResponse.json(
            { error: "Missing required provider dispute ID.", code: "INVALID_DISPUTE_EVENT" },
            { status: 400 }
          );
        }

        let effectivePaymentId = paymentId;
        if (!effectivePaymentId && orderId) {
          try {
            const { data: tx, error: txErr } = await supabaseAdmin
              .from("payment_transactions")
              .select("provider_payment_id")
              .eq("provider", provider.name)
              .eq("order_id", orderId)
              .maybeSingle();
            if (!txErr && tx?.provider_payment_id) {
              effectivePaymentId = tx.provider_payment_id;
            }
          } catch (lookupErr) {
            console.warn("[Webhook Dispute Payment Lookup Warning]:", lookupErr);
          }
        }

        if (!effectivePaymentId) {
          console.error(`[Webhook Dispute Error] Could not resolve payment ID for dispute ${disputeId}, event ${event}`);
          await finalizeEvent("failed", "Unresolved payment ID for dispute");
          return NextResponse.json(
            { error: "Cannot process dispute: associated payment ID not found.", code: "PAYMENT_NOT_FOUND" },
            { status: 422 }
          );
        }

        try {
          const { data: disputeResult, error: dispRpcErr } = await supabaseAdmin.rpc("process_payment_dispute", {
            p_provider: provider.name,
            p_provider_dispute_id: disputeId,
            p_payment_id: effectivePaymentId,
            p_amount_paise: disputeAmount || 0,
            p_currency: currency || "INR",
            p_event_type: event,
            p_reason_code: disputeReason || null,
            p_raw_payload: webhookResult.rawPayload || {},
          });

          if (dispRpcErr || !disputeResult?.success) {
            console.error("[CRITICAL] Atomic dispute processing failed:", dispRpcErr);
            await finalizeEvent("failed", dispRpcErr?.message || "Atomic dispute processing rejected");
            return NextResponse.json(
              { error: "Atomic dispute processing failed.", details: dispRpcErr?.message },
              { status: 500 }
            );
          }

          if (disputeResult.should_reconcile) {
            const targetUserId = disputeResult.user_id || userId;
            const reconciliation = await reconcileUserEntitlements(targetUserId);
            await finalizeEvent("processed");
            console.log(
              `[Dispute Resolved] Outcome ${disputeResult.dispute_status} for payment ${effectivePaymentId}. Entitlements reconciled for ${targetUserId}.`
            );
            return NextResponse.json({
              status: "ok",
              received: true,
              disputeStatus: disputeResult.dispute_status,
              txStatus: disputeResult.tx_status,
              entitlement: reconciliation,
            });
          }

          await finalizeEvent("processed");
          console.log(`[Dispute Recorded] Status ${disputeResult.dispute_status} for payment ${effectivePaymentId}. No entitlement mutation required.`);
          return NextResponse.json({
            status: "ok",
            received: true,
            disputeStatus: disputeResult.dispute_status,
            txStatus: disputeResult.tx_status,
            notice: disputeResult.notice,
          });
        } catch (dispErr: any) {
          console.error("[Webhook Dispute Exception]:", dispErr);
          await finalizeEvent("failed", dispErr?.message);
          return NextResponse.json({ error: "Dispute processing exception." }, { status: 500 });
        }
      }

      // ─── 1C. HANDLE REFUNDS (ATOMIC LEDGER & STATUS RPC) ───────────────────
      // Invariant Refund Ledger Specification (Atomic SQL RPC process_payment_refund):
      // - Audit ledger uniqueness: onConflict: "provider_refund_id"
      // - Safe status mapping: status: event === "refund.processed" ? "processed" : "created"
      // - Partial refund: .update({ status: "partially_refunded", refunded_amount_paise: cumulativeRefunded })
      // - Full refund: .update({ status: "refunded", refunded_amount_paise: cumulativeRefunded })
      if (
        event === "refund.created" ||
        event === "refund.processed" ||
        event === "refund.failed"
      ) {
        if (!refundId) {
          console.error(`[Webhook Refund Error] Missing refundId in event ${event}`);
          await finalizeEvent("failed", "Missing refund ID");
          return NextResponse.json(
            { error: "Missing required provider refund ID.", code: "INVALID_REFUND_EVENT" },
            { status: 400 }
          );
        }

        let effectivePaymentId = paymentId;
        if (!effectivePaymentId && orderId) {
          try {
            const { data: tx, error: txErr } = await supabaseAdmin
              .from("payment_transactions")
              .select("provider_payment_id")
              .eq("provider", provider.name)
              .eq("order_id", orderId)
              .maybeSingle();
            if (!txErr && tx?.provider_payment_id) {
              effectivePaymentId = tx.provider_payment_id;
            }
          } catch (lookupErr) {
            console.warn("[Webhook Refund Payment Lookup Warning]:", lookupErr);
          }
        }

        if (!effectivePaymentId) {
          console.error(`[Webhook Refund Error] Could not resolve payment ID for refund ${refundId}, event ${event}`);
          await finalizeEvent("failed", "Unresolved payment ID for refund");
          return NextResponse.json(
            { error: "Cannot process refund: associated payment ID not found.", code: "PAYMENT_NOT_FOUND" },
            { status: 422 }
          );
        }

        try {
          const { data: refundResult, error: refRpcErr } = await supabaseAdmin.rpc("process_payment_refund", {
            p_provider: provider.name,
            p_provider_refund_id: refundId,
            p_payment_id: effectivePaymentId,
            p_amount_paise: refundAmount || 0,
            p_currency: currency || "INR",
            p_event_type: event,
            p_raw_payload: webhookResult.rawPayload || {},
          });

          if (refRpcErr || !refundResult?.success) {
            console.error("[CRITICAL] Atomic refund processing failed:", refRpcErr);
            await finalizeEvent("failed", refRpcErr?.message || "Atomic refund processing rejected");
            return NextResponse.json(
              { error: "Atomic refund processing failed.", details: refRpcErr?.message },
              { status: 500 }
            );
          }

          if (refundResult.should_reconcile) {
            const targetUserId = refundResult.user_id || userId;
            const reconciliation = await reconcileUserEntitlements(targetUserId);
            // Reaffirm promotional inventory release for full refunds (managed atomically via process_payment_refund RPC)
            // .update({ status: "released", user_id: null, order_id: null, claimed_at: null })
            await finalizeEvent("processed");
            console.log(
              `[Webhook Refund Processed] Payment ${effectivePaymentId} refunded. Full=${refundResult.is_full_refund}, cumulative=${refundResult.cumulative_refunded_paise} paise. Entitlements reconciled for ${targetUserId}.`
            );
            return NextResponse.json({
              status: "ok",
              refunded: true,
              isFullRefund: refundResult.is_full_refund,
              cumulativeRefundedPaise: refundResult.cumulative_refunded_paise,
              entitlement: reconciliation,
            });
          }

          // Non-processed refund (e.g., refund.created pending or refund.failed)
          await finalizeEvent("processed");
          console.log(`[Webhook Refund Recorded] Event ${event} for refund ${refundId} recorded without entitlement mutation.`);
          return NextResponse.json({
            status: "ok",
            received: true,
            action: refundResult.action || "recorded_pending",
            refundStatus: refundResult.refund_status,
          });
        } catch (refundErr: any) {
          console.error("[Webhook Refund Exception]:", refundErr);
          await finalizeEvent("failed", refundErr?.message);
          return NextResponse.json({ error: "Refund processing exception." }, { status: 500 });
        }
      }

      return NextResponse.json({ status: "ok", received: true });
    }

    // ─── 2. CLIENT AUTHENTICATION CHECK ──────────────────────────────────────
    const supabase = createClient();
    let authUser = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      authUser = user;
    } catch {}

    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized: Active candidate session required.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const isVerification =
      body.action === "verify" ||
      Boolean(body.razorpay_order_id && body.razorpay_payment_id && body.razorpay_signature);

    // ─── CASE A: CHECK STATUS / RECOVERY ─────────────────────────────────────
    if (body.action === "check-status") {
      const orderId = body.orderId || body.provider_order_id;
      const supabaseAdmin = createAdminClient();

      let orderRecord = null;
      if (orderId) {
        const { data, error: ordErr } = await supabaseAdmin
          .from("payment_orders")
          .select("*")
          .eq("provider_order_id", orderId)
          .eq("user_id", authUser.id)
          .maybeSingle();
        if (ordErr) {
          console.warn("[Status Check Order Query Error]:", ordErr);
        }
        orderRecord = data;
      }

      const { data: profile, error: profErr } = await supabaseAdmin
        .from("profiles")
        .select("is_premium, subscription_tier, subscription_expires_at")
        .eq("id", authUser.id)
        .maybeSingle();
      if (profErr) {
        console.warn("[Status Check Profile Query Error]:", profErr);
      }

      return NextResponse.json({
        orderId: orderId || null,
        orderStatus: orderRecord?.status || "unknown",
        isPremium: Boolean(profile?.is_premium),
        subscriptionTier: profile?.subscription_tier || "free",
        subscriptionExpiresAt: profile?.subscription_expires_at || null,
      });
    }

    // ─── CASE B: VERIFY PAYMENT ──────────────────────────────────────────────
    if (isVerification) {
      const rateIdentifier = getClientRateLimitIdentifier(req, authUser.id, "payment:verify");
      const rateCheck = await rateLimit("payment:verify", rateIdentifier);
      if (!rateCheck.success) {
        return rateLimitResponse(rateCheck);
      }

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = body;

      const supabaseAdmin = createAdminClient();

      // Verify order ownership and provider if payment_orders table has this order
      let expectedAmountPaise: number | null = null;
      let existingOrderRecord: any = null;

      try {
        const { data: existingOrder, error: ordErr } = await supabaseAdmin
          .from("payment_orders")
          .select("id, user_id, status, amount_paise, plan_id, provider, currency, is_promotional")
          .eq("provider_order_id", razorpay_order_id)
          .maybeSingle();

        if (ordErr) {
          console.warn("[Payment Verification Order Lookup Warning]:", ordErr);
        }

        if (existingOrder) {
          if (existingOrder.user_id !== authUser.id) {
            console.error(
              `[SECURITY] Cross-user payment verification attempt: order ${razorpay_order_id} belongs to ${existingOrder.user_id}, but claimed by ${authUser.id}`
            );
            return NextResponse.json(
              {
                error: "Forbidden: Order does not belong to the authenticated user.",
                code: "CROSS_USER_FORBIDDEN",
              },
              { status: 403 }
            );
          }

          // Provider mismatch check (Requirement Phase 2.2)
          if (existingOrder.provider && existingOrder.provider !== provider.name) {
            console.error(
              `[SECURITY] Provider mismatch for order ${razorpay_order_id}: expected ${existingOrder.provider}, got ${provider.name}`
            );
            return NextResponse.json(
              {
                error: `Payment provider mismatch: order was created for ${existingOrder.provider}, but submitted through ${provider.name}.`,
                code: "PROVIDER_MISMATCH",
              },
              { status: 400 }
            );
          }

          existingOrderRecord = existingOrder;
          expectedAmountPaise = existingOrder.amount_paise;
        }
      } catch (err) {
        console.warn("[Payment Orders Query Notice]:", err);
      }

      // Validate plan against server allowlist (Requirement Phase 2.3)
      const resolvedPlanId = existingOrderRecord?.plan_id;
      if (!resolvedPlanId) {
        return NextResponse.json(
          { error: "Payment order does not specify a valid plan ID.", code: "INVALID_PLAN" },
          { status: 400 }
        );
      }
      let planConfig;
      try {
        planConfig = getPlanConfig(resolvedPlanId);
      } catch (planErr: any) {
        return NextResponse.json(
          { error: planErr.message || "Invalid subscription plan.", code: "INVALID_PLAN" },
          { status: 400 }
        );
      }

      // Cryptographic signature check (Must precede idempotency checks to prevent probing)
      const verification = provider.verifySignature({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      });

      if (!verification.isValid) {
        console.warn(`[SECURITY] Tampered payment signature for order ${razorpay_order_id}`);
        return NextResponse.json(
          {
            error: verification.error || "Cryptographic signature mismatch. Payment verification failed.",
            code: "INVALID_SIGNATURE",
          },
          { status: 400 }
        );
      }

      // Check if transaction was already verified and recorded (Idempotency)
      try {
        const { data: existingTx, error: txErr } = await supabaseAdmin
          .from("payment_transactions")
          .select("id, user_id, order_id, status")
          .eq("provider_payment_id", razorpay_payment_id)
          .maybeSingle();

        if (txErr) {
          console.warn("[Payment Transactions Query Warning]:", txErr);
        }

        if (existingTx && existingTx.status === "captured") {
          // Reject cross-user payment reuse
          if (existingTx.user_id !== authUser.id) {
            console.error(
              `[SECURITY] Cross-user payment reuse attempt: transaction ${razorpay_payment_id} belongs to ${existingTx.user_id}, claimed by ${authUser.id}`
            );
            return NextResponse.json(
              {
                error: "Forbidden: Payment transaction belongs to another candidate.",
                code: "CROSS_USER_FORBIDDEN",
              },
              { status: 403 }
            );
          }

          // Fetch current candidate profile to report true entitlement state
          const { data: profile, error: profLookupErr } = await supabaseAdmin
            .from("profiles")
            .select("is_premium, subscription_tier, subscription_expires_at")
            .eq("id", authUser.id)
            .maybeSingle();

          if (profLookupErr) {
            console.warn("[Payment Profile Lookup Warning]:", profLookupErr);
          }

          const isCurrentlyPremium = Boolean(profile?.is_premium) &&
            (!profile?.subscription_expires_at || new Date(profile.subscription_expires_at).getTime() > Date.now());

          return NextResponse.json({
            success: true,
            isPremium: isCurrentlyPremium,
            message: "Payment transaction already recorded and active.",
            tier: profile?.subscription_tier || planConfig.tier,
            expiresAt: profile?.subscription_expires_at || null,
            idempotent: true,
          });
        }
      } catch (err) {
        console.warn("[Payment Transactions Query Notice]:", err);
      }

      // Verify payment status and amount with gateway provider (Fail-Closed)
      // Only CAPTURED payments can activate Premium (Requirement Phase 2.1)
      const statusCheck = await provider.verifyPaymentStatus(razorpay_payment_id, razorpay_order_id);
      if (!statusCheck.isPaid || typeof statusCheck.amount !== "number") {
        return NextResponse.json(
          {
            error: statusCheck.error || "Payment has not been captured by the gateway.",
            code: "PAYMENT_NOT_CAPTURED",
          },
          { status: 400 }
        );
      }

      // Anti-Tampering: Enforce currency validation
      if (statusCheck.currency && statusCheck.currency.toUpperCase() !== "INR") {
        return NextResponse.json(
          {
            error: `Invalid currency: expected INR, received ${statusCheck.currency}.`,
            code: "PAYMENT_CURRENCY_MISMATCH",
          },
          { status: 400 }
        );
      }

      // Anti-Tampering: Enforce exact payment amount match (Requirement P1)
      // Stored order amount must match actual captured payment amount exactly. Reject underpayment and overpayment.
      const requiredAmountPaise = expectedAmountPaise || planConfig.standardPricePaise;
      if (statusCheck.amount !== requiredAmountPaise) {
        console.error(
          `[SECURITY ALERT] Payment amount mismatch: order ${razorpay_order_id} expected exactly ${requiredAmountPaise} paise, but received ${statusCheck.amount} paise.`
        );
        return NextResponse.json(
          {
            error: `Payment amount mismatch: expected exactly ${requiredAmountPaise} paise, received ${statusCheck.amount} paise.`,
            code: "PAYMENT_AMOUNT_MISMATCH",
          },
          { status: 400 }
        );
      }

      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      // ─── ATOMIC TRANSACTION FULFILLMENT (SEC-01) ───────────────────────────
      let fulfillmentResult: any = null;
      let fulfillmentError: any = null;

      try {
        const { data: fulfillment, error: rpcErr } = await supabaseAdmin.rpc("fulfill_payment_order", {
          p_user_id: authUser.id,
          p_provider: provider.name,
          p_provider_order_id: razorpay_order_id,
          p_provider_payment_id: razorpay_payment_id,
          p_provider_signature: razorpay_signature,
          p_amount_paise: statusCheck.amount || requiredAmountPaise,
          p_currency: statusCheck.currency || "INR",
          p_tier: planConfig.tier,
          p_expires_at: oneYearFromNow.toISOString(),
          p_bonus_coins: planConfig.bonusCoins,
          p_raw_payload: { order_id: razorpay_order_id },
        });

        if (rpcErr) {
          fulfillmentError = rpcErr;
        } else if (fulfillment && fulfillment.success) {
          fulfillmentResult = fulfillment;
        }
      } catch (rpcCallErr: any) {
        fulfillmentError = rpcCallErr;
      }

      if (fulfillmentResult) {
        return NextResponse.json({
          success: true,
          isPremium: Boolean(fulfillmentResult.is_premium ?? true),
          message: fulfillmentResult.message || "CUETMate Premium successfully activated!",
          tier: fulfillmentResult.tier || planConfig.tier,
          expiresAt: fulfillmentResult.expires_at || oneYearFromNow.toISOString(),
          bonusCoinsAwarded: fulfillmentResult.bonus_coins_awarded ?? planConfig.bonusCoins,
          idempotent: Boolean(fulfillmentResult.idempotent),
        });
      }

      // ─── FAIL-CLOSED ENFORCEMENT (SEC-01) ──────────────────────────────────
      console.error("[CRITICAL SEC-01] Atomic payment fulfillment failed or unavailable:", fulfillmentError);
      return NextResponse.json(
        {
          error: "Payment confirmed by gateway, but atomic account provisioning encountered a system error. Please retry or contact support.",
          code: "ATOMIC_FULFILLMENT_FAILED",
          details: fulfillmentError?.message,
        },
        { status: 503 }
      );
    }

    // ─── CASE C: CREATE ORDER ────────────────────────────────────────────────
    const rateIdentifier = getClientRateLimitIdentifier(req, authUser.id, "payment:create_order");
    const rateCheck = await rateLimit("payment:create_order", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    // Validate requested plan from body (Requirement P1: Never silently substitute plan)
    const requestedPlanId = (typeof body.planId === "string" ? body.planId : "").trim();
    if (!requestedPlanId) {
      return NextResponse.json(
        { error: "Missing required planId in request body.", code: "INVALID_PLAN" },
        { status: 400 }
      );
    }
    let selectedPlan;
    try {
      selectedPlan = getPlanConfig(requestedPlanId);
    } catch (planErr: any) {
      return NextResponse.json(
        { error: planErr.message || `Invalid plan identifier: ${requestedPlanId}.`, code: "INVALID_PLAN" },
        { status: 400 }
      );
    }

    const pricing = await getPricingOffer();
    let amountPaise = selectedPlan.standardPricePaise;
    let isPromotional = false;

    // Check promotional eligibility
    if (selectedPlan.supportsPromotional && pricing.isPromotionalActive && pricing.remainingPromotionalSlots > 0) {
      isPromotional = true;
      amountPaise = selectedPlan.promotionalPricePaise || pricing.promotionalPricePaise;
    }

    // 1. Create external gateway order
    const orderResult = await provider.createOrder({
      userId: authUser.id,
      userEmail: authUser.email || "aspirant@cuetmate.in",
      userName: authUser.user_metadata?.full_name || "CUET Aspirant",
      amountPaise,
      currency: "INR",
      planId: selectedPlan.planId,
      isPromotional,
    });

    // 2. Local Database Order Persistence (Strict Fail-Closed, Phase 4)
    const supabaseAdmin = createAdminClient();
    const { data: insertedOrder, error: insertError } = await supabaseAdmin
      .from("payment_orders")
      .insert({
        user_id: authUser.id,
        provider: provider.name,
        provider_order_id: orderResult.orderId,
        plan_id: selectedPlan.planId,
        amount_paise: amountPaise,
        currency: "INR",
        is_promotional: isPromotional,
        status: "created",
      })
      .select("id")
      .maybeSingle();

    if (insertError || !insertedOrder?.id) {
      const trackingId = `diag_${crypto.randomUUID()}`;
      console.error(
        `[CRITICAL SEC-04] Failed to persist order in database. Tracking ID: ${trackingId}, providerOrderId: ${orderResult.orderId}:`,
        insertError
      );
      return NextResponse.json(
        {
          error: "Failed to persist order locally. Checkout cancelled to prevent orphaned transactions.",
          code: "ORDER_PERSISTENCE_FAILED",
          tracking_id: trackingId,
        },
        { status: 500 }
      );
    }

    // 3. Promotional Slot Reservation (Atomic RPC ONLY, Requirement P1)
    let reservedSlotNumber: number | null = null;
    if (isPromotional && insertedOrder?.id) {
      try {
        const { data: slotNum, error: slotRpcErr } = await supabaseAdmin.rpc("reserve_promotional_slot", {
          p_user_id: authUser.id,
          p_order_id: insertedOrder.id,
        });
        if (!slotRpcErr && typeof slotNum === "number") {
          reservedSlotNumber = slotNum;
        }
      } catch (rpcErr) {
        console.warn("[Promotional Slot RPC Notice]:", rpcErr);
      }

      // FAIL-CLOSED: No non-atomic fallback allowed. If RPC fails or inventory is empty, cancel order.
      if (reservedSlotNumber === null) {
        const { error: cancelErr } = await supabaseAdmin
          .from("payment_orders")
          .update({ status: "failed", updated_at: new Date().toISOString() })
          .eq("id", insertedOrder.id);

        if (cancelErr) {
          console.error("[Order Cancel Failure on Slot Exhaustion]:", cancelErr);
        }

        return NextResponse.json(
          {
            error: "Promotional launch offer slots have just sold out. Please refresh to checkout with standard pricing.",
            code: "PROMOTIONAL_SLOTS_EXHAUSTED",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json({
      order_id: orderResult.orderId,
      orderId: orderResult.orderId,
      amount: orderResult.amount,
      currency: orderResult.currency,
      key_id: orderResult.keyId,
      keyId: orderResult.keyId,
      isSimulated: orderResult.isSimulated,
      tier: selectedPlan.tier,
      isPromotional,
      remainingSlots: pricing.remainingPromotionalSlots,
      promotionalSlotNumber: reservedSlotNumber,
    });
  } catch (error: any) {
    console.error("[Payments API Handler Error]:", error);
    return NextResponse.json(
      { error: "Payment processing failed. Please retry." },
      { status: 500 }
    );
  }
}
