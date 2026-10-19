import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/verify-payment
 * Authoritative cryptographic signature verification for Razorpay Web Checkout.
 *
 * Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
 *
 * Request Body:
 * {
 *   "razorpay_order_id": "order_xxx",   // or "order_id"
 *   "razorpay_payment_id": "pay_xxx",   // or "payment_id"
 *   "razorpay_signature": "hex_sig"     // or "signature"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay Key Secret is unconfigured on the server." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const orderId = body.razorpay_order_id || body.order_id;
    const paymentId = body.razorpay_payment_id || body.payment_id;
    const signature = body.razorpay_signature || body.signature;

    // Validate missing fields
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          error: "Missing required verification fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.",
          code: "MISSING_FIELDS",
        },
        { status: 400 }
      );
    }

    // Cryptographic HMAC-SHA256 calculation: order_id + "|" + payment_id
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature, "utf-8");
    const actualBuf = Buffer.from(String(signature), "utf-8");

    const isMatch =
      expectedBuf.length === actualBuf.length &&
      crypto.timingSafeEqual(expectedBuf, actualBuf);

    if (!isMatch) {
      console.warn(`[SECURITY ALERT] Razorpay signature mismatch for order: ${orderId}, payment: ${paymentId}`);
      return NextResponse.json(
        {
          error: "Cryptographic HMAC-SHA256 signature mismatch. Payment verification failed.",
          code: "INVALID_SIGNATURE",
          success: false,
        },
        { status: 400 }
      );
    }

    // Signature verified successfully!
    let authUser: { id: string; email?: string } | null = null;
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      authUser = user;
    } catch {}

    const targetUserId = authUser?.id || body.userId;
    const tier = body.tier || "all_access_pass";
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    if (targetUserId) {
      try {
        const supabaseAdmin = createAdminClient();

        // Check existing profile
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("campus_coins, is_premium")
          .eq("id", targetUserId)
          .maybeSingle();

        const currentCoins = profile?.campus_coins ?? 50;
        const wasAlreadyPremium = Boolean(profile?.is_premium);

        // Update profile entitlement
        await supabaseAdmin
          .from("profiles")
          .update({
            is_premium: true,
            subscription_tier: tier,
            subscription_expires_at: oneYearFromNow.toISOString(),
            campus_coins: wasAlreadyPremium ? currentCoins : currentCoins + 500,
          })
          .eq("id", targetUserId);

        // Update order status if payment_orders table exists
        await supabaseAdmin
          .from("payment_orders")
          .update({ status: "captured" })
          .eq("provider_order_id", orderId);

        // Idempotently record transaction
        await supabaseAdmin.from("payment_transactions").upsert(
          {
            user_id: targetUserId,
            provider: "razorpay",
            provider_payment_id: paymentId,
            provider_signature: signature,
            amount_paise: body.amount || 49900,
            currency: body.currency || "INR",
            status: "captured",
            raw_payload: { order_id: orderId, payment_id: paymentId },
          },
          { onConflict: "provider_payment_id" }
        );

        console.log(`[Payment Verified] Candidate ${targetUserId} upgraded to CUETMate Premium (${tier}).`);
      } catch (dbErr) {
        console.error("[Profile Upgrade Notice]:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment signature verified successfully! Premium entitlement activated.",
      order_id: orderId,
      payment_id: paymentId,
      tier,
      expiresAt: oneYearFromNow.toISOString(),
    });
  } catch (error: any) {
    console.error("[Verify Payment Error]:", error);
    return NextResponse.json(
      { error: "Internal server error during payment verification." },
      { status: 500 }
    );
  }
}
