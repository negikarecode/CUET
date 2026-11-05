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
        paymentAmountRefunded,
      } = webhookResult;

      let paymentId = rawPaymentId;

      // CRITICAL SEC-02: 'authorized' is NOT paid. Do NOT activate Premium on authorization alone.
      if (event === "payment.authorized") {
        console.log(`[Webhook Notice] Payment ${paymentId || "unknown"} is authorized but not captured. Entitlement fulfillment deferred.`);
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
          return NextResponse.json({
            status: "ok",
            received: true,
            message: "Fulfillment deferred: verified captured payment ID is required.",
          });
        }

        const supabaseAdmin = createAdminClient();

        // Authoritative resolution of order and user from database
        let orderRecord: any = null;
        if (orderId) {
          try {
            const { data: ord } = await supabaseAdmin
              .from("payment_orders")
              .select("id, user_id, status, amount_paise, plan_id, provider, currency, is_promotional")
              .eq("provider_order_id", orderId)
              .maybeSingle();
            orderRecord = ord;
          } catch (ordErr) {
            console.warn("[Webhook Order Resolution Notice]:", ordErr);
          }
        }

        const effectiveUserId = userId || orderRecord?.user_id;
        if (!effectiveUserId) {
          console.error(`[CRITICAL] Webhook fulfillment failed: Cannot resolve candidate user for order ${orderId}, payment ${paymentId}`);
          return NextResponse.json(
            { error: "Unable to resolve target user for fulfillment.", code: "USER_RESOLUTION_FAILED" },
            { status: 422 }
          );
        }

        // Validate provider matching
        if (orderRecord?.provider && orderRecord.provider !== provider.name) {
          console.error(`[SECURITY ALERT] Provider mismatch in webhook: order was created for ${orderRecord.provider}, received ${provider.name}`);
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
            return NextResponse.json({ status: "ok", received: true });
          }

          // FAIL-CLOSED: Never fall back to uncoordinated non-atomic mutations on fulfillment errors
          console.error(`[CRITICAL SEC-01] Webhook atomic fulfillment rejected for user ${effectiveUserId}:`, rpcError);
          return NextResponse.json(
            { error: "Atomic payment fulfillment rejected.", code: "ATOMIC_FULFILLMENT_FAILED" },
            { status: 500 }
          );
        } catch (dbError) {
          console.error("[Webhook DB Update Notice]:", dbError);
          return NextResponse.json({ error: "Webhook processing exception.", code: "INTERNAL_ERROR" }, { status: 500 });
        }
      }

      // ─── 1B. HANDLE DISPUTES (SEPARATED FROM REFUNDS) ─────────────────────────
      if (
        event === "payment.dispute.created" ||
        event === "payment.dispute.won" ||
        event === "payment.dispute.lost"
      ) {
        const supabaseAdmin = createAdminClient();
        let targetUserId = userId;

        // Resolve user through transaction record if not present in notes
        let txRecord: any = null;
        if (paymentId) {
          try {
            const { data: tx } = await supabaseAdmin
              .from("payment_transactions")
              .select("id, user_id, order_id, status, amount_paise")
              .eq("provider_payment_id", paymentId)
              .maybeSingle();
            if (tx) {
              txRecord = tx;
              targetUserId = targetUserId || tx.user_id;
            }
          } catch (lookupErr) {
            console.warn("[Webhook Dispute Tx Lookup Warning]:", lookupErr);
          }
        }

        if (!targetUserId && orderId) {
          try {
            const { data: ord } = await supabaseAdmin
              .from("payment_orders")
              .select("user_id")
              .eq("provider_order_id", orderId)
              .maybeSingle();
            if (ord?.user_id) targetUserId = ord.user_id;
          } catch (lookupErr) {
            console.warn("[Webhook Dispute Order Lookup Warning]:", lookupErr);
          }
        }

        if (!targetUserId) {
          console.error(`[Webhook Dispute Error] Could not resolve user for dispute event ${event}, paymentId=${paymentId}`);
          return NextResponse.json(
            { error: "Unable to resolve target user for dispute event.", code: "USER_RESOLUTION_FAILED" },
            { status: 422 }
          );
        }

        try {
          if (event === "payment.dispute.created") {
            // Record dispute audit entry
            if (disputeId) {
              try {
                await supabaseAdmin
                  .from("payment_disputes")
                  .upsert({
                    provider_dispute_id: disputeId,
                    payment_id: paymentId || "",
                    transaction_id: txRecord?.id || null,
                    amount_paise: disputeAmount || txRecord?.amount_paise || 0,
                    currency: currency || "INR",
                    status: "under_review",
                    reason_code: disputeReason || null,
                    raw_payload: webhookResult.rawPayload || {},
                  }, { onConflict: "provider_dispute_id" });
              } catch (e: any) {
                console.warn("[Dispute Insert Warning]:", e?.message);
              }
            }

            // Update transaction status to 'disputed' WITHOUT marking refunded
            // CRITICAL: Do NOT release promotional inventory on dispute creation!
            if (paymentId && txRecord?.status !== "disputed_lost" && txRecord?.status !== "refunded") {
              await supabaseAdmin
                .from("payment_transactions")
                .update({ status: "disputed", dispute_status: "under_review" })
                .eq("provider_payment_id", paymentId);
            }

            console.log(`[Dispute Created] Transaction for payment ${paymentId} marked disputed (under review). Inventory preserved.`);
            return NextResponse.json({ status: "ok", received: true, disputeStatus: "under_review" });
          }

          if (event === "payment.dispute.won") {
            if (disputeId) {
              try {
                await supabaseAdmin
                  .from("payment_disputes")
                  .update({ status: "won", updated_at: new Date().toISOString() })
                  .eq("provider_dispute_id", disputeId);
              } catch (e: any) {
                console.warn("[Dispute Won Update Warning]:", e?.message);
              }
            }

            // Restore transaction status to 'captured'
            if (paymentId) {
              await supabaseAdmin
                .from("payment_transactions")
                .update({ status: "captured", dispute_status: "won" })
                .eq("provider_payment_id", paymentId);
            }

            const reconciliation = await reconcileUserEntitlements(targetUserId);
            console.log(`[Dispute Won] Payment ${paymentId} affirmed. Premium confirmed active for ${targetUserId}.`);
            return NextResponse.json({ status: "ok", received: true, disputeStatus: "won", entitlement: reconciliation });
          }

          if (event === "payment.dispute.lost") {
            if (disputeId) {
              try {
                await supabaseAdmin
                  .from("payment_disputes")
                  .update({ status: "lost", updated_at: new Date().toISOString() })
                  .eq("provider_dispute_id", disputeId);
              } catch (e: any) {
                console.warn("[Dispute Lost Update Warning]:", e?.message);
              }
            }

            // Mark transaction as lost chargeback
            if (paymentId) {
              await supabaseAdmin
                .from("payment_transactions")
                .update({ status: "disputed_lost", dispute_status: "lost" })
                .eq("provider_payment_id", paymentId);
            }

            // Release promotional slot and reconcile
            if (orderId) {
              const { data: updatedOrd } = await supabaseAdmin
                .from("payment_orders")
                .update({ status: "refunded", updated_at: new Date().toISOString() })
                .eq("provider_order_id", orderId)
                .select("id, is_promotional")
                .maybeSingle();

              if (updatedOrd?.is_promotional && updatedOrd?.id) {
                await supabaseAdmin
                  .from("promotional_slots")
                  .update({ status: "released", user_id: null, order_id: null, claimed_at: null })
                  .eq("order_id", updatedOrd.id);
              }
            }

            const reconciliation = await reconcileUserEntitlements(targetUserId);
            console.log(`[Dispute Lost] Chargeback finalized for payment ${paymentId}. Entitlements reconciled for ${targetUserId}.`);
            return NextResponse.json({ status: "ok", received: true, disputeStatus: "lost", entitlement: reconciliation });
          }
        } catch (dispErr) {
          console.error("[Webhook Dispute Error]:", dispErr);
          return NextResponse.json({ error: "Dispute processing error." }, { status: 500 });
        }
      }

      // ─── 1C. HANDLE REFUNDS (PARTIAL VS FULL DIFFERENTIATION) ─────────────────
      if (
        event === "refund.created" ||
        event === "refund.processed"
      ) {
        const supabaseAdmin = createAdminClient();
        let targetUserId = userId;

        let txRecord: any = null;
        if (paymentId) {
          try {
            const { data: tx } = await supabaseAdmin
              .from("payment_transactions")
              .select("id, user_id, order_id, amount_paise, status, refunded_amount_paise")
              .eq("provider_payment_id", paymentId)
              .maybeSingle();

            if (tx) {
              txRecord = tx;
              targetUserId = targetUserId || tx.user_id;
            }
          } catch (lookupErr) {
            console.warn("[Webhook Refund Lookup Warning]:", lookupErr);
          }
        }

        if (!targetUserId && orderId) {
          try {
            const { data: ord } = await supabaseAdmin
              .from("payment_orders")
              .select("user_id")
              .eq("provider_order_id", orderId)
              .maybeSingle();

            if (ord?.user_id) {
              targetUserId = ord.user_id;
            }
          } catch (lookupErr) {
            console.warn("[Webhook Refund Order Lookup Warning]:", lookupErr);
          }
        }

        if (!targetUserId) {
          console.error(
            `[Webhook Refund Error] Could not resolve user for refund event ${event}, paymentId=${paymentId}, orderId=${orderId}`
          );
          return NextResponse.json(
            { error: "Unable to resolve target user for refund event.", code: "USER_RESOLUTION_FAILED" },
            { status: 422 }
          );
        }

        try {
          // Record refund event in payment_refunds table (audit trail & idempotency)
          if (refundId && paymentId) {
            try {
              await supabaseAdmin
                .from("payment_refunds")
                .upsert({
                  provider_refund_id: refundId,
                  payment_id: paymentId,
                  transaction_id: txRecord?.id || null,
                  amount_paise: refundAmount || 0,
                  currency: currency || "INR",
                  status: event === "refund.processed" ? "processed" : "created",
                  raw_payload: webhookResult.rawPayload || {},
                }, { onConflict: "provider_refund_id" });
            } catch (e: any) {
              console.warn("[Refund Upsert Warning]:", e?.message);
            }
          }

          // Authoritative cumulative refund calculation
          const capturedAmount = txRecord?.amount_paise || amount || 0;
          const currentRefundPaise = refundAmount || 0;
          const cumulativeRefunded = paymentAmountRefunded ?? (Number(txRecord?.refunded_amount_paise || 0) + currentRefundPaise);
          const isFullRefund = capturedAmount > 0 && cumulativeRefunded >= capturedAmount;

          if (isFullRefund) {
            // FULL REFUND: Mark transaction refunded, order refunded, release promotional slot, and reconcile
            if (paymentId) {
              await supabaseAdmin
                .from("payment_transactions")
                .update({ status: "refunded", refunded_amount_paise: cumulativeRefunded })
                .eq("provider_payment_id", paymentId);
            }

            if (orderId) {
              const { data: updatedOrd } = await supabaseAdmin
                .from("payment_orders")
                .update({ status: "refunded", updated_at: new Date().toISOString() })
                .eq("provider_order_id", orderId)
                .select("id, is_promotional")
                .maybeSingle();

              if (updatedOrd?.is_promotional && updatedOrd?.id) {
                await supabaseAdmin
                  .from("promotional_slots")
                  .update({ status: "released", user_id: null, order_id: null, claimed_at: null })
                  .eq("order_id", updatedOrd.id);
              }
            }

            const reconciliation = await reconcileUserEntitlements(targetUserId);
            console.log(
              `[Webhook Full Refund Processed] Entitlements reconciled for user ${targetUserId}: isPremium=${reconciliation.isPremium}, tier=${reconciliation.tier}.`
            );
            return NextResponse.json({ status: "ok", refunded: true, isFullRefund: true, entitlement: reconciliation });
          } else {
            // PARTIAL REFUND: Mark transaction partially_refunded.
            // Policy: Partial refunds do NOT revoke the entire entitlement or release promotional inventory.
            if (paymentId) {
              await supabaseAdmin
                .from("payment_transactions")
                .update({ status: "partially_refunded", refunded_amount_paise: cumulativeRefunded })
                .eq("provider_payment_id", paymentId);
            }

            const reconciliation = await reconcileUserEntitlements(targetUserId);
            console.log(
              `[Webhook Partial Refund Processed] User ${targetUserId} retains access: isPremium=${reconciliation.isPremium}, tier=${reconciliation.tier}.`
            );
            return NextResponse.json({ status: "ok", refunded: true, isFullRefund: false, entitlement: reconciliation });
          }
        } catch (refundErr) {
          console.error("[Webhook Refund Error]:", refundErr);
          return NextResponse.json({ error: "Refund processing error." }, { status: 500 });
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
        const { data } = await supabaseAdmin
          .from("payment_orders")
          .select("*")
          .eq("provider_order_id", orderId)
          .eq("user_id", authUser.id)
          .maybeSingle();
        orderRecord = data;
      }

      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("is_premium, subscription_tier, subscription_expires_at")
        .eq("id", authUser.id)
        .maybeSingle();

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
        const { data: existingOrder } = await supabaseAdmin
          .from("payment_orders")
          .select("id, user_id, status, amount_paise, plan_id, provider, currency, is_promotional")
          .eq("provider_order_id", razorpay_order_id)
          .maybeSingle();

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
        const { data: existingTx } = await supabaseAdmin
          .from("payment_transactions")
          .select("id, user_id, order_id, status")
          .eq("provider_payment_id", razorpay_payment_id)
          .maybeSingle();

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
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("is_premium, subscription_tier, subscription_expires_at")
            .eq("id", authUser.id)
            .maybeSingle();

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
        await supabaseAdmin
          .from("payment_orders")
          .update({ status: "failed", updated_at: new Date().toISOString() })
          .eq("id", insertedOrder.id);

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
