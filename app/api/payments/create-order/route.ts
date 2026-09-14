import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";

interface CreateOrderRequestBody {
  planId?: "ai_practice_pass_499" | "all_access_pass_799";
  userId?: string;
  email?: string;
  name?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as CreateOrderRequestBody;

    // 1. Authenticate user via Supabase Server Session
    let userId = body.userId || "user_cuet_aspirant_01";
    let userEmail = body.email || "aspirant@cuet-prep.in";

    try {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        userId = authUser.id;
        userEmail = authUser.email || userEmail;
      }
    } catch {
      // Fall back to client-provided userId for local offline development
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Authentication required to initiate checkout." },
        { status: 401 }
      );
    }

    // 2. Determine Pricing Tier
    const isAllAccess = body.planId === "all_access_pass_799";
    const amountInPaise = isAllAccess ? 79900 : 49900; // ₹799 or ₹499
    const tierName = isAllAccess ? "all_access_pass" : "ai_practice_pass";

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // 3. Initialize Razorpay SDK (with simulated fallback if placeholder keys are used)
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

      const receipt = `order_rcptid_${userId.slice(0, 8)}_${Date.now()}`.slice(0, 40);

      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          userId,
          userEmail,
          subscription_tier: tierName,
          platform: "CUET_AI_PREP",
        },
      });

      orderId = order.id;
    } else {
      // Simulated Razorpay Order ID for offline/development sandbox testing
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
    console.error("Razorpay Create Order Error:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay checkout order. Please retry." },
      { status: 500 }
    );
  }
}
