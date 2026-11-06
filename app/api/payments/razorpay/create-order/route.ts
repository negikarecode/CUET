import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PRICING_CONFIG, getPriceInPaise } from "@/lib/pricing";

export const dynamic = "force-dynamic";

/**
 * POST /api/payments/razorpay/create-order
 *
 * Authenticated endpoint to generate a verified Razorpay order.
 * Payable amount is computed strictly server-side from lib/pricing.ts.
 */
export async function POST(_req: NextRequest) {
  try {
    // 1. Authenticate candidate via Supabase session
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required to initiate checkout." },
        { status: 401 }
      );
    }

    const admin = createAdminClient();

    // 2. Prevent duplicate purchases if user already holds active Gold Pass
    const { data: profile } = await admin
      .from("profiles")
      .select("is_premium, subscription_expires_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.is_premium) {
      let isNotExpired = true;
      if (profile.subscription_expires_at) {
        const expTime = new Date(profile.subscription_expires_at).getTime();
        if (!isNaN(expTime) && expTime < Date.now()) {
          isNotExpired = false;
        }
      }
      if (isNotExpired) {
        return NextResponse.json(
          { error: "You already have an active Gold Pass." },
          { status: 409 }
        );
      }
    }

    // 3. Compute amount ONLY from single pricing source of truth (Never accept from client)
    const amountPaise = getPriceInPaise();
    const currency = "INR";
    const receipt = `rcpt_${user.id.slice(0, 8)}_${Date.now()}`.slice(0, 40);

    const keyId =
      process.env.RAZORPAY_KEY_ID ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      "rzp_test_placeholder";
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId: string;

    // 4. Create order via official Razorpay SDK or test simulator
    if (
      keyId &&
      keySecret &&
      !keySecret.includes("dummy") &&
      !keySecret.includes("placeholder") &&
      !keySecret.includes("your_razorpay")
    ) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await razorpay.orders.create({
        amount: amountPaise,
        currency,
        receipt,
        notes: {
          user_id: user.id,
          user_email: user.email || "",
          plan: PRICING_CONFIG.planName,
          platform: "CUET_AI_PREP",
        },
      });

      razorpayOrderId = order.id;
    } else {
      // Deterministic simulated order for test environments / local development
      razorpayOrderId = `order_${crypto.randomBytes(12).toString("hex")}`;
    }

    // 5. Insert created order into payments ledger
    const { error: insertErr } = await admin.from("payments").insert({
      user_id: user.id,
      provider: "razorpay",
      razorpay_order_id: razorpayOrderId,
      amount_paise: amountPaise,
      currency,
      status: "created",
      plan: PRICING_CONFIG.planName,
    });

    if (insertErr) {
      console.error("[Razorpay create-order] Failed to insert payments row:", insertErr);
      // Fallback: also ensure legacy payment_orders records this order if table pending migration
      try {
        await admin.from("payment_orders").insert({
          user_id: user.id,
          provider: "razorpay",
          provider_order_id: razorpayOrderId,
          plan_id: PRICING_CONFIG.planId,
          amount_paise: amountPaise,
          currency,
          status: "created",
        });
      } catch {}
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountPaise,
      currency,
      keyId,
    });
  } catch (error: any) {
    console.error("[Razorpay create-order error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to initialize payment order." },
      { status: 500 }
    );
  }
}
