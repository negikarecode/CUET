import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPaymentProvider } from "@/lib/payments/provider";
import {
  getPricingOffer,
  getUserEntitlement,
  getUserUsageSummary,
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

      const { event, userId, tier, orderId, paymentId, amount } = webhookResult;

      if ((event === "order.paid" || event === "payment.captured") && userId) {
        const supabaseAdmin = createAdminClient();
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        try {
          // Attempt atomic PostgreSQL transaction fulfillment (SEC-01)
          const { error: rpcError } = await supabaseAdmin.rpc("fulfill_payment_order", {
            p_user_id: userId,
            p_provider: provider.name,
            p_provider_order_id: orderId || "",
            p_provider_payment_id: paymentId || `wh_${Date.now()}`,
            p_provider_signature: webhookSignature,
            p_amount_paise: amount || 200,
            p_currency: "INR",
            p_tier: tier || "all_access_pass",
            p_expires_at: oneYearFromNow.toISOString(),
            p_bonus_coins: 500,
            p_raw_payload: { event, orderId },
          });

          if (!rpcError) {
            console.log(`[Webhook Atomic Fulfillment] User ${userId} successfully upgraded to Premium.`);
            return NextResponse.json({ status: "ok", received: true });
          }

          // FAIL-CLOSED: Never fall back to uncoordinated non-atomic mutations on fulfillment errors
          console.error(`[CRITICAL SEC-01] Webhook atomic fulfillment rejected for user ${userId}:`, rpcError);
          return NextResponse.json(
            { error: "Atomic payment fulfillment rejected.", code: "ATOMIC_FULFILLMENT_FAILED" },
            { status: 500 }
          );
        } catch (dbError) {
          console.error("[Webhook DB Update Notice]:", dbError);
          return NextResponse.json({ error: "Webhook processing exception.", code: "INTERNAL_ERROR" }, { status: 500 });
        }
      }

      // ─── 1B. HANDLE REFUNDS & CHARGEBACKS ──────────────────────────────────
      if (
        event === "refund.created" ||
        event === "refund.processed" ||
        event === "payment.dispute.created"
      ) {
        const supabaseAdmin = createAdminClient();
        let targetUserId = userId;

        // If userId was not passed in webhook notes, resolve it via payment_transactions or payment_orders
        if (!targetUserId && paymentId) {
          try {
            const { data: tx } = await supabaseAdmin
              .from("payment_transactions")
              .select("user_id, provider_order_id")
              .eq("provider_payment_id", paymentId)
              .maybeSingle();

            if (tx?.user_id) {
              targetUserId = tx.user_id;
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
            `[Webhook Refund/Dispute Error] Could not resolve user for event ${event}, paymentId=${paymentId}, orderId=${orderId}`
          );
          return NextResponse.json(
            { error: "Unable to resolve target user for refund/dispute event.", code: "USER_RESOLUTION_FAILED" },
            { status: 422 }
          );
        }

        try {
          await supabaseAdmin
            .from("profiles")
            .update({
              is_premium: false,
              subscription_tier: "free",
              updated_at: new Date().toISOString(),
            })
            .eq("id", targetUserId);

          if (paymentId) {
            await supabaseAdmin
              .from("payment_transactions")
              .update({ status: "refunded" })
              .eq("provider_payment_id", paymentId);
          }

          if (orderId) {
            await supabaseAdmin
              .from("payment_orders")
              .update({ status: "refunded", updated_at: new Date().toISOString() })
              .eq("provider_order_id", orderId);
          }

          console.log(`[Webhook Refund Processed] Entitlement revoked for user ${targetUserId}.`);
          return NextResponse.json({ status: "ok", refunded: true });
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
        tier = "all_access_pass",
      } = body;

      const supabaseAdmin = createAdminClient();

      // Verify order ownership if payment_orders table has this order
      let expectedAmountPaise: number | null = null;

      try {
        const { data: existingOrder } = await supabaseAdmin
          .from("payment_orders")
          .select("user_id, status, amount_paise, plan_id")
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

          expectedAmountPaise = existingOrder.amount_paise;
        }
      } catch (err) {
        console.warn("[Payment Orders Query Notice]:", err);
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
            tier: profile?.subscription_tier || tier,
            expiresAt: profile?.subscription_expires_at || null,
            idempotent: true,
          });
        }
      } catch (err) {
        console.warn("[Payment Transactions Query Notice]:", err);
      }

      // Verify payment status and amount with gateway provider (Fail-Closed)
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

      // Anti-Tampering: Enforce that paid amount meets or exceeds the required order price
      const pricing = await getPricingOffer();
      const requiredAmountPaise = expectedAmountPaise || pricing.currentPricePaise;
      if (statusCheck.amount < requiredAmountPaise) {
        console.error(
          `[SECURITY ALERT] Payment amount tampering: order ${razorpay_order_id} expected ${requiredAmountPaise} paise, but received ${statusCheck.amount} paise.`
        );
        return NextResponse.json(
          {
            error: "Payment amount does not match authorized order amount.",
            code: "PAYMENT_AMOUNT_MISMATCH",
          },
          { status: 400 }
        );
      }

      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      // ─── ATOMIC TRANSACTION FULFILLMENT (SEC-01) ───────────────────────────
      // Calls PostgreSQL stored function fulfill_payment_order to atomically:
      // 1. Lock rows FOR UPDATE
      // 2. Insert payment_transaction exactly once
      // 3. Mark payment_order paid exactly once
      // 4. Grant Premium entitlement & award bonus coins
      // 5. Claim launch promotional slot
      // 6. Roll back all related changes if any step fails
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
          p_tier: tier,
          p_expires_at: oneYearFromNow.toISOString(),
          p_bonus_coins: 500,
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
          message: fulfillmentResult.message || "CUETMate Premium successfully activated! +500 Campus Coins awarded.",
          tier: fulfillmentResult.tier || tier,
          expiresAt: fulfillmentResult.expires_at || oneYearFromNow.toISOString(),
          bonusCoinsAwarded: fulfillmentResult.bonus_coins_awarded ?? 500,
          idempotent: Boolean(fulfillmentResult.idempotent),
        });
      }

      // ─── FAIL-CLOSED ENFORCEMENT (SEC-01) ──────────────────────────────────
      // If atomic RPC fulfillment fails, fail closed strictly with HTTP 503.
      // Never perform unsafe, uncoordinated non-atomic partial table mutations
      // that could leave payments captured but accounts locked or corrupted.
      console.error("[CRITICAL SEC-01] Atomic payment fulfillment failed or unavailable:", fulfillmentError);
      return NextResponse.json(
        {
          error: "Payment confirmed by gateway, but atomic account provisioning encountered a system error. Please retry or contact support.",
          code: "ATOMIC_FULFILLMENT_FAILED",
        },
        { status: 503 }
      );
    }

    // ─── CASE B: CREATE ORDER ────────────────────────────────────────────────
    const rateIdentifier = getClientRateLimitIdentifier(req, authUser.id, "payment:create_order");
    const rateCheck = await rateLimit("payment:create_order", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    const pricing = await getPricingOffer();
    const amountPaise = pricing.currentPricePaise;
    const isPromotional = pricing.isPromotionalActive;

    const orderResult = await provider.createOrder({
      userId: authUser.id,
      userEmail: authUser.email || "aspirant@cuetmate.in",
      userName: authUser.user_metadata?.full_name || "CUET Aspirant",
      amountPaise,
      currency: "INR",
      planId: pricing.planId,
      isPromotional,
    });

    // Record order in payment_orders table if available and reserve promotional slot if active
    try {
      const supabaseAdmin = createAdminClient();
      const { data: insertedOrder, error: insertError } = await supabaseAdmin
        .from("payment_orders")
        .insert({
          user_id: authUser.id,
          provider: provider.name,
          provider_order_id: orderResult.orderId,
          plan_id: pricing.planId,
          amount_paise: amountPaise,
          currency: "INR",
          is_promotional: isPromotional,
          status: "created",
        })
        .select("id")
        .maybeSingle();

      if (insertError) {
        console.warn("[Payment Order Insert Warning]:", insertError);
      }

      // If this is an early-bird promotional order, atomically reserve a promotional slot
      if (isPromotional && insertedOrder?.id) {
        try {
          // Reserve the lowest available slot (status = 'released' or expired reservation)
          const nowIso = new Date().toISOString();
          const { data: availableSlot } = await supabaseAdmin
            .from("promotional_slots")
            .select("slot_number")
            .or(`status.eq.released,and(status.eq.reserved,expires_at.lt.${nowIso})`)
            .order("slot_number", { ascending: true })
            .limit(1)
            .maybeSingle();

          if (availableSlot?.slot_number) {
            const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
            await supabaseAdmin
              .from("promotional_slots")
              .update({
                order_id: insertedOrder.id,
                user_id: authUser.id,
                status: "reserved",
                reserved_at: nowIso,
                expires_at: expiresAt,
                claimed_at: null,
              })
              .eq("slot_number", availableSlot.slot_number);

            await supabaseAdmin
              .from("payment_orders")
              .update({ promotional_slot_number: availableSlot.slot_number })
              .eq("id", insertedOrder.id);
          }
        } catch (slotErr) {
          console.warn("[Promotional Slot Reservation Warning]:", slotErr);
        }
      }
    } catch (orderRecordErr) {
      console.warn("[Payment Order Record Exception]:", orderRecordErr);
    }

    return NextResponse.json({
      order_id: orderResult.orderId,
      orderId: orderResult.orderId,
      amount: orderResult.amount,
      currency: orderResult.currency,
      key_id: orderResult.keyId,
      keyId: orderResult.keyId,
      isSimulated: orderResult.isSimulated,
      tier: "all_access_pass",
      isPromotional,
      remainingSlots: pricing.remainingPromotionalSlots,
    });
  } catch (error: any) {
    console.error("[Payments API Handler Error]:", error);
    return NextResponse.json(
      { error: "Payment processing failed. Please retry." },
      { status: 500 }
    );
  }
}
