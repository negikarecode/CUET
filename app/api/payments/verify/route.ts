import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

interface VerifyRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  userId?: string;
  tier?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Partial<VerifyRequestBody>;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId = "user_cuet_aspirant_01",
      tier = "ai_practice_pass",
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // FAIL-CLOSED SECURITY POLICY:
    // If Razorpay secret is missing or placeholder in production, strictly reject payment verification.
    // Never bypass signature verification or grant free premium access.
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

    // Cryptographic HMAC SHA-256 signature verification
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const signaturesMatch = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(razorpay_signature, "utf-8")
    );

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

    // Upgrade user profile in Supabase only after verified signature
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    try {
      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("campus_coins")
        .eq("id", userId)
        .single();

      const currentCoins = profile?.campus_coins ?? 120;

      await supabase
        .from("profiles")
        .update({
          is_premium: true,
          subscription_tier: tier,
          subscription_expires_at: oneYearFromNow.toISOString(),
          campus_coins: currentCoins + 500,
        })
        .eq("id", userId);
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
  } catch (error) {
    console.error("Payment Verification Fatal Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed due to internal error." },
      { status: 500 }
    );
  }
}
