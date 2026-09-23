import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 1. FAIL-CLOSED: Verify Cryptographic HMAC SHA256 Signature
    if (!webhookSecret || webhookSecret.includes("placeholder") || webhookSecret.trim() === "") {
      console.error("[SECURITY] Razorpay Webhook Secret is unconfigured. Failing closed.");
      return NextResponse.json(
        { error: "Webhook verification unavailable. Server credentials unconfigured." },
        { status: 503 }
      );
    }

    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-razorpay-signature header." },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const isMatch =
      expectedSignature.length === signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(signature, "utf-8")
      );

    if (!isMatch) {
      console.error("[SECURITY ALERT] Razorpay webhook signature mismatch!");
      return NextResponse.json(
        { error: "Invalid cryptographic webhook signature." },
        { status: 400 }
      );
    }

    // 2. Parse Event Payload
    const payload = JSON.parse(rawBody);
    const event = payload.event as string;

    // We listen for order.paid or payment.captured
    if (event === "order.paid" || event === "payment.captured") {
      const paymentEntity =
        payload.payload?.payment?.entity ||
        payload.payload?.order?.entity;

      const notes = paymentEntity?.notes || {};
      const userId = notes.userId as string;
      const subscriptionTier = (notes.subscription_tier as string) || "ai_practice_pass";

      if (userId) {
        // 3. Update public.profiles in Supabase via Admin Client (bypassing RLS safely)
        try {
          const oneYearFromNow = new Date();
          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

          // Get current coins
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
              campus_coins: currentCoins + 500, // Award 500 bonus Campus Coins
            })
            .eq("id", userId);

          console.log(`[Razorpay Webhook] User ${userId} upgraded to ${subscriptionTier} with +500 coins.`);
        } catch (dbError) {
          console.error("[Razorpay Webhook] Database update error:", dbError);
        }
      }
    }

    return NextResponse.json({ status: "ok", received: true });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook handler encountered an error." },
      { status: 500 }
    );
  }
}
