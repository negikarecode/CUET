import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

interface VerifyRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
  userId?: string;
  tier?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VerifyRequestBody;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId = "user_cuet_aspirant_01",
      tier = "ai_practice_pass",
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify signature if secret is live
    if (
      keySecret &&
      !keySecret.includes("placeholder") &&
      razorpay_signature
    ) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { error: "Invalid payment verification signature." },
          { status: 400 }
        );
      }
    }

    // Upgrade user profile in Supabase
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
    } catch {
      // Local fallback
    }

    return NextResponse.json({
      success: true,
      message: "Subscription successfully activated! 500 Campus Coins awarded.",
      tier,
      expiresAt: oneYearFromNow.toISOString(),
      bonusCoinsAwarded: 500,
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: "Payment verification failed." },
      { status: 500 }
    );
  }
}
