import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface CreateOrderRequestBody {
  action?: "create-order" | "verify";
  planId?: "ai_pass_399" | "ai_practice_pass_499" | "all_access_pass_799";
  userId?: string;
  email?: string;
  name?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  tier?: string;
}

export async function POST(req: NextRequest) {
  try {
    // ─── 1. WEBHOOK INVOCATION ───────────────────────────────────────────────
    const webhookSignature = req.headers.get("x-razorpay-signature");
    if (webhookSignature) {
      const rawBody = await req.text();
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

      if (!webhookSecret || webhookSecret.includes("placeholder") || webhookSecret.trim() === "") {
        console.error("[SECURITY] Razorpay Webhook Secret is unconfigured. Failing closed.");
        return NextResponse.json(
          { error: "Webhook verification unavailable. Server credentials unconfigured." },
          { status: 503 }
        );
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const isMatch =
        expectedSignature.length === webhookSignature.length &&
        crypto.timingSafeEqual(
          Buffer.from(expectedSignature, "utf-8"),
          Buffer.from(webhookSignature, "utf-8")
        );

      if (!isMatch) {
        console.error("[SECURITY ALERT] Razorpay webhook signature mismatch!");
        return NextResponse.json(
          { error: "Invalid cryptographic webhook signature." },
          { status: 400 }
        );
      }

      const payload = JSON.parse(rawBody);
      const event = payload.event as string;

      if (event === "order.paid" || event === "payment.captured") {
        const paymentEntity =
          payload.payload?.payment?.entity ||
          payload.payload?.order?.entity;

        const notes = paymentEntity?.notes || {};
        const userId = notes.userId as string;
        const subscriptionTier = (notes.subscription_tier as string) || "ai_practice_pass";

        if (userId) {
          try {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

            const { data: profile } = await supabaseAdmin
              .from("profiles")
              .select("campus_coins")
              .eq("id", userId)
              .single();

            const currentCoins = profile?.campus_coins ?? 0;

            await supabaseAdmin
              .from("profiles")
              .update({
                is_premium: true,
                subscription_tier: subscriptionTier,
                subscription_expires_at: oneYearFromNow.toISOString(),
                campus_coins: currentCoins + 500,
              })
              .eq("id", userId);

            console.log(`[Razorpay Webhook] User ${userId} upgraded to ${subscriptionTier} with +500 coins.`);
          } catch (dbError) {
            console.error("[Razorpay Webhook] Database update error:", dbError);
          }
        }
      }

      return NextResponse.json({ status: "ok", received: true });
    }

    // ─── 2. CLIENT API: CREATE-ORDER OR VERIFY ──────────────────────────────
    const body = (await req.json().catch(() => ({}))) as CreateOrderRequestBody;
    const isVerification =
      body.action === "verify" ||
      Boolean(body.razorpay_order_id && body.razorpay_payment_id && body.razorpay_signature);

    // Require active authenticated user session for both actions
    const supabase = createClient();
    let authUser = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      authUser = user;
    } catch {
      // Fallback
    }

    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized: Active user session required.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const targetUserId = authUser.id;

    // ─── CASE A: VERIFY PAYMENT ──────────────────────────────────────────────
    if (isVerification) {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        tier = "ai_practice_pass",
      } = body;

      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      // Fail-closed security policy
      if (!keySecret || keySecret.includes("placeholder") || keySecret.trim() === "") {
        console.error("[SECURITY ALERT] Razorpay Key Secret is unconfigured or placeholder. Failing closed.");
        return NextResponse.json(
          {
            error: "Payment verification gateway is currently unavailable. Server credentials missing or unconfigured.",
            code: "PAYMENT_GATEWAY_MISCONFIGURED",
          },
          { status: 503 }
        );
      }

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          {
            error: "Missing mandatory payment verification fields: order ID, payment ID, or signature.",
            code: "INVALID_VERIFICATION_PAYLOAD",
          },
          { status: 400 }
        );
      }

      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const expectedBuf = Buffer.from(expectedSignature, "utf-8");
      const actualBuf = Buffer.from(razorpay_signature, "utf-8");

      const signaturesMatch =
        expectedBuf.length === actualBuf.length &&
        crypto.timingSafeEqual(expectedBuf, actualBuf);

      if (!signaturesMatch) {
        console.warn(`[SECURITY] Tampered payment signature for order ${razorpay_order_id}`);
        return NextResponse.json(
          {
            error: "Cryptographic signature mismatch. Payment verification failed.",
            code: "INVALID_SIGNATURE",
          },
          { status: 400 }
        );
      }

      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      try {
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("campus_coins")
          .eq("id", targetUserId)
          .single();

        const currentCoins = profile?.campus_coins ?? 120;

        await supabaseAdmin
          .from("profiles")
          .update({
            is_premium: true,
            subscription_tier: tier,
            subscription_expires_at: oneYearFromNow.toISOString(),
            campus_coins: currentCoins + 500,
          })
          .eq("id", targetUserId);
      } catch (dbErr) {
        console.error("Supabase profile upgrade error:", dbErr);
      }

      return NextResponse.json({
        success: true,
        message: "Subscription successfully verified and activated! 500 Campus Coins awarded.",
        tier,
        expiresAt: oneYearFromNow.toISOString(),
        bonusCoinsAwarded: 500,
      });
    }

    // ─── CASE B: CREATE ORDER ────────────────────────────────────────────────
    const userEmail = authUser.email || body.email || "aspirant@cuet-prep.in";

    const is399 = body.planId === "ai_pass_399";
    const isAllAccess = body.planId === "all_access_pass_799";
    const amountInPaise = is399 ? 39900 : isAllAccess ? 79900 : 49900;
    const tierName = is399 ? "ai_pass_399" : isAllAccess ? "all_access_pass" : "ai_practice_pass";

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const isConfigured =
      keyId &&
      keySecret &&
      !keyId.includes("placeholder") &&
      !keySecret.includes("placeholder");

    let orderId: string;

    if (isConfigured) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const receipt = `order_rcptid_${targetUserId.slice(0, 8)}_${Date.now()}`.slice(0, 40);

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          userId: targetUserId,
          userEmail,
          subscription_tier: tierName,
          platform: "CUET_AI_PREP",
        },
      });

      orderId = order.id;
    } else {
      orderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    }

    return NextResponse.json({
      orderId,
      amount: amountInPaise,
      currency: "INR",
      keyId: keyId || "rzp_test_placeholder_key_id",
      isSimulated: !isConfigured,
      tier: tierName,
    });
  } catch (error) {
    console.error("Payments Route Error:", error);
    return NextResponse.json(
      { error: "Payment processing failed. Please retry." },
      { status: 500 }
    );
  }
}
