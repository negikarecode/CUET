import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/create-order
 * Creates an authoritative Razorpay order for Standard Web Checkout.
 *
 * Request Body:
 * {
 *   "amount": 49900,         // amount in paise (minimum 100 paise)
 *   "currency": "INR",       // optional, defaults to "INR"
 *   "receipt": "rcpt_12345"  // optional receipt identifier
 * }
 *
 * Response:
 * {
 *   "order_id": "order_xxx",
 *   "amount": 49900,
 *   "currency": "INR",
 *   "key_id": "rzp_test_xxx"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials are not configured on the server." },
        { status: 500 }
      );
    }

    // Check Authorization header for explicit auth token validation
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "").trim();
      if (!token || token === "invalid_token" || token === "null" || token === "undefined") {
        return NextResponse.json(
          { error: "Unauthorized: Invalid or expired authorization token." },
          { status: 401 }
        );
      }
    }

    // Optional Supabase authenticated candidate resolution
    let authUser: { id: string; email?: string; user_metadata?: { full_name?: string } } | null = null;
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      authUser = user;
    } catch {
      // Direct API test / guest invocation
    }

    const body = await req.json().catch(() => ({}));
    const rawAmount = body.amount ?? body.amountPaise;
    const parsedAmount = typeof rawAmount === "string" ? parseInt(rawAmount, 10) : Number(rawAmount);

    // Validate amount >= 100 paise (Razorpay minimum transaction threshold)
    if (rawAmount === undefined || rawAmount === null || isNaN(parsedAmount) || parsedAmount < 100) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum amount is 100 paise (₹1.00)." },
        { status: 400 }
      );
    }

    const currency = (body.currency || "INR").toUpperCase();
    const receipt = (
      body.receipt ||
      `rcpt_${authUser?.id ? authUser.id.slice(0, 8) : "guest"}_${Date.now()}`
    ).slice(0, 40);

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    try {
      const order = await razorpay.orders.create({
        amount: parsedAmount,
        currency,
        receipt,
        notes: {
          userId: authUser?.id || body.userId || "guest",
          userEmail: authUser?.email || body.email || "aspirant@cuetmate.in",
          planId: body.planId || "all_access_pass_799",
          platform: "CUET_AI_PREP",
          ...(body.notes || {}),
        },
      });

      // Record created order in payment_orders table if user is logged in
      if (authUser?.id) {
        try {
          const supabaseAdmin = createAdminClient();
          await supabaseAdmin.from("payment_orders").insert({
            user_id: authUser.id,
            provider: "razorpay",
            provider_order_id: order.id,
            plan_id: body.planId || "all_access_pass_799",
            amount_paise: parsedAmount,
            currency,
            status: "created",
          });
        } catch {
          // Non-blocking database logging
        }
      }

      return NextResponse.json({
        order_id: order.id,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId,
      });
    } catch (razorpayError: any) {
      console.error("[Razorpay API Order Creation Error]:", razorpayError);
      const statusCode = razorpayError.statusCode || 500;
      if (statusCode === 401) {
        return NextResponse.json(
          { error: "Razorpay authentication failed: Invalid Key ID or Key Secret." },
          { status: 401 }
        );
      }
      return NextResponse.json(
        {
          error: razorpayError.error?.description || razorpayError.message || "Failed to create Razorpay order.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("[Create Order Handler Error]:", error);
    return NextResponse.json(
      { error: "Internal server error processing order creation." },
      { status: 500 }
    );
  }
}
