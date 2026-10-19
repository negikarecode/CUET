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
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("campus_coins, is_premium")
            .eq("id", userId)
            .single();

          const currentCoins = profile?.campus_coins ?? 0;
          const wasAlreadyPremium = Boolean(profile?.is_premium);

          // Update profile entitlement
          await supabaseAdmin
            .from("profiles")
            .update({
              is_premium: true,
              subscription_tier: tier || "all_access_pass",
              subscription_expires_at: oneYearFromNow.toISOString(),
              campus_coins: wasAlreadyPremium ? currentCoins : currentCoins + 500,
            })
            .eq("id", userId);

          // Log transaction idempotently if table exists
          if (paymentId) {
            await supabaseAdmin.from("payment_transactions").upsert(
              {
                user_id: userId,
                provider: provider.name,
                provider_payment_id: paymentId,
                amount_paise: amount || 49900,
                currency: "INR",
                status: "captured",
                raw_payload: { event, orderId },
              },
              { onConflict: "provider_payment_id" }
            );
          }

          console.log(`[Webhook Verified] User ${userId} successfully upgraded to Premium.`);
        } catch (dbError) {
          console.error("[Webhook DB Update Notice]:", dbError);
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
      try {
        const { data: existingOrder } = await supabaseAdmin
          .from("payment_orders")
          .select("user_id, status")
          .eq("provider_order_id", razorpay_order_id)
          .maybeSingle();

        if (existingOrder && existingOrder.user_id !== authUser.id) {
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
      } catch {}

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

      // Verify payment status with gateway provider where available
      const statusCheck = await provider.verifyPaymentStatus(razorpay_payment_id, razorpay_order_id);
      if (!statusCheck.isPaid) {
        return NextResponse.json(
          {
            error: statusCheck.error || "Payment has not been captured by the gateway.",
            code: "PAYMENT_NOT_CAPTURED",
          },
          { status: 400 }
        );
      }

      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      try {
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("campus_coins, is_premium")
          .eq("id", authUser.id)
          .single();

        const currentCoins = profile?.campus_coins ?? 50;
        const wasAlreadyPremium = Boolean(profile?.is_premium);

        // Grant Premium Entitlement
        await supabaseAdmin
          .from("profiles")
          .update({
            is_premium: true,
            subscription_tier: tier,
            subscription_expires_at: oneYearFromNow.toISOString(),
            campus_coins: wasAlreadyPremium ? currentCoins : currentCoins + 500,
          })
          .eq("id", authUser.id);

        // Record verified transaction if table exists
        await supabaseAdmin.from("payment_transactions").upsert(
          {
            user_id: authUser.id,
            provider: provider.name,
            provider_payment_id: razorpay_payment_id,
            provider_signature: razorpay_signature,
            amount_paise: 49900,
            currency: "INR",
            status: "captured",
            raw_payload: { order_id: razorpay_order_id },
          },
          { onConflict: "provider_payment_id" }
        );

        // If promotional slot used, record claim
        try {
          await supabaseAdmin
            .from("promotional_slots")
            .update({ status: "claimed", claimed_at: new Date().toISOString() })
            .eq("user_id", authUser.id)
            .eq("status", "reserved");
        } catch {}
      } catch (dbErr) {
        console.error("[Profile Upgrade Notice]:", dbErr);
      }

      return NextResponse.json({
        success: true,
        message: "CUETMate Premium successfully activated! +500 Campus Coins awarded.",
        tier,
        expiresAt: oneYearFromNow.toISOString(),
        bonusCoinsAwarded: 500,
      });
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

    // Record order in payment_orders table if available
    try {
      const supabaseAdmin = createAdminClient();
      await supabaseAdmin.from("payment_orders").insert({
        user_id: authUser.id,
        provider: provider.name,
        provider_order_id: orderResult.orderId,
        plan_id: pricing.planId,
        amount_paise: amountPaise,
        currency: "INR",
        is_promotional: isPromotional,
        status: "created",
      });
    } catch {}

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
