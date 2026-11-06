import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/payments/razorpay/webhook
 *
 * Secure server-side webhook listener for Razorpay lifecycle events.
 * Guarantees candidate entitlement is granted even if the browser tab
 * was closed before the client-side verify completed.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Read raw request text before parsing (required for HMAC verification)
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      console.warn("[Razorpay Webhook] Missing x-razorpay-signature header.");
      return NextResponse.json(
        { error: "Missing signature header." },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // 2. Validate cryptographic signature
    if (webhookSecret && !webhookSecret.includes("your_razorpay")) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const expectedBuf = Buffer.from(expectedSignature, "utf-8");
      const incomingBuf = Buffer.from(signature, "utf-8");

      const isValid =
        expectedBuf.length === incomingBuf.length &&
        crypto.timingSafeEqual(expectedBuf, incomingBuf);

      if (!isValid) {
        console.error("[SECURITY ALERT] Invalid Razorpay webhook signature. Failing closed.");
        return NextResponse.json(
          { error: "Invalid cryptographic webhook signature." },
          { status: 400 }
        );
      }
    } else if (process.env.NODE_ENV === "production") {
      console.error("[SECURITY ALERT] RAZORPAY_WEBHOOK_SECRET not configured in production.");
      return NextResponse.json(
        { error: "Webhook secret unconfigured." },
        { status: 500 }
      );
    }

    // 3. Parse JSON event payload
    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const event = payload?.event;
    const paymentEntity = payload?.payload?.payment?.entity;
    const orderEntity = payload?.payload?.order?.entity;

    const orderId = orderEntity?.id || paymentEntity?.order_id;
    const paymentId = paymentEntity?.id;

    const admin = createAdminClient();
    const nowIso = new Date().toISOString();

    // 4. Handle Successful Payment Events (order.paid, payment.captured)
    if (event === "order.paid" || event === "payment.captured") {
      if (orderId) {
        // Find existing payment row
        const { data: paymentRecord } = await admin
          .from("payments")
          .select("id, user_id, status")
          .eq("razorpay_order_id", orderId)
          .maybeSingle();

        const targetUserId =
          paymentRecord?.user_id ||
          paymentEntity?.notes?.userId ||
          paymentEntity?.notes?.user_id;

        // Idempotently update payment row to 'paid'
        if (paymentRecord && paymentRecord.status !== "paid") {
          await admin
            .from("payments")
            .update({
              status: "paid",
              razorpay_payment_id: paymentId || null,
              paid_at: nowIso,
            })
            .eq("razorpay_order_id", orderId);
        }

        // Idempotently grant Gold Pass in profiles
        if (targetUserId) {
          const oneYearFromNow = new Date();
          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

          await admin
            .from("profiles")
            .update({
              is_premium: true,
              subscription_tier: "all_access_pass",
              subscription_expires_at: oneYearFromNow.toISOString(),
              updated_at: nowIso,
            })
            .eq("id", targetUserId);
        }

        // Mirror update to legacy payment_orders if present
        try {
          await admin
            .from("payment_orders")
            .update({
              status: "paid",
              updated_at: nowIso,
            })
            .eq("provider_order_id", orderId);
        } catch {}
      }
    } else if (event === "payment.failed") {
      if (orderId) {
        // Mark payment row failed only if not already paid
        await admin
          .from("payments")
          .update({ status: "failed" })
          .eq("razorpay_order_id", orderId)
          .neq("status", "paid");
      }
    }

    // Always respond 200 quickly to acknowledge valid webhook receipt
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("[Razorpay Webhook Error]:", error);
    // Respond 500 so Razorpay retries if an unexpected crash occurred
    return NextResponse.json(
      { error: "Webhook processing error." },
      { status: 500 }
    );
  }
}
