import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/payments/razorpay/verify
 *
 * Authenticated endpoint to verify cryptographic signature and grant
 * candidate Gold Pass entitlement idempotently.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate candidate session
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required to verify payment." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required verification parameters." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    // 2. Fetch payment row and verify ownership (SEC-02: prevent claiming another user's order)
    const { data: paymentRecord, error: fetchErr } = await admin
      .from("payments")
      .select("id, user_id, status, razorpay_order_id, amount_paise")
      .eq("razorpay_order_id", razorpay_order_id)
      .maybeSingle();

    if (fetchErr) {
      console.warn("[Razorpay verify] payments lookup warning:", fetchErr);
    }

    // Verify order ownership
    if (paymentRecord && paymentRecord.user_id !== user.id) {
      console.error(
        `[SECURITY ALERT] Cross-user payment verification attempt: order ${razorpay_order_id} belongs to ${paymentRecord.user_id}, attempted by ${user.id}`
      );
      return NextResponse.json(
        { error: "Order does not belong to the authenticated user." },
        { status: 403 }
      );
    }

    // 3. Idempotency Check: if already marked paid, return success immediately
    if (paymentRecord && paymentRecord.status === "paid") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified.",
        isPremium: true,
      });
    }

    // 4. Verify Cryptographic HMAC-SHA256 Signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isTestMode =
      !keySecret ||
      keySecret.includes("dummy") ||
      keySecret.includes("placeholder") ||
      keySecret.includes("your_razorpay");

    if (!isTestMode && keySecret) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const expectedBuf = Buffer.from(generatedSignature, "utf-8");
      const clientBuf = Buffer.from(razorpay_signature, "utf-8");

      const isSigValid =
        expectedBuf.length === clientBuf.length &&
        crypto.timingSafeEqual(expectedBuf, clientBuf);

      if (!isSigValid) {
        console.error(
          `[SECURITY ALERT] Invalid payment signature for order ${razorpay_order_id}`
        );
        return NextResponse.json(
          { error: "Cryptographic signature verification failed." },
          { status: 400 }
        );
      }
    } else {
      // In local dev/test mode without live secrets, verify standard structure
      if (!razorpay_signature || razorpay_signature.length < 8) {
        return NextResponse.json(
          { error: "Malformed test signature." },
          { status: 400 }
        );
      }
    }

    // 5. Update payments table: mark as 'paid'
    const nowIso = new Date().toISOString();
    await admin
      .from("payments")
      .update({
        status: "paid",
        razorpay_payment_id,
        paid_at: nowIso,
      })
      .eq("razorpay_order_id", razorpay_order_id);

    // Also update legacy payment_orders if present
    try {
      await admin
        .from("payment_orders")
        .update({
          status: "paid",
          updated_at: nowIso,
        })
        .eq("provider_order_id", razorpay_order_id);
    } catch {}

    // 6. Authoritatively Grant Gold Pass Entitlement in public.profiles
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const { error: profileErr } = await admin
      .from("profiles")
      .update({
        is_premium: true,
        subscription_tier: "all_access_pass",
        subscription_expires_at: oneYearFromNow.toISOString(),
        updated_at: nowIso,
      })
      .eq("id", user.id);

    if (profileErr) {
      console.error("[Razorpay verify] Profile entitlement grant error:", profileErr);
      return NextResponse.json(
        { error: "Payment captured, but entitlement synchronization failed. Please contact support." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Gold Pass activated successfully.",
      isPremium: true,
    });
  } catch (error: any) {
    console.error("[Razorpay verify error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify payment." },
      { status: 500 }
    );
  }
}
