import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStandingExplanation, StandingExplanationRequest } from "@/lib/ai/standing-explainer";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";

export const dynamic = "force-dynamic";

/**
 * POST /api/standing/explain
 * Authoritative AI Standing Explainer utilizing Google Gemini 2.0.
 * Enforces session authentication, email confirmation, Premium entitlements, and rate limits (SEC-04).
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate candidate session
    const supabase = createClient();
    let authUser = null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      authUser = user;
    } catch {}

    if (!authUser?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Active candidate account required to access dream college analysis.", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    // 2. Enforce verified email
    const isEmailVerified = Boolean(
      authUser.email_confirmed_at ||
      authUser.confirmed_at ||
      (authUser.app_metadata?.provider && authUser.app_metadata.provider !== "email")
    );

    if (!isEmailVerified) {
      return NextResponse.json(
        { error: "Email verification required before accessing AI standing explanations.", code: "EMAIL_VERIFICATION_REQUIRED" },
        { status: 403 }
      );
    }

    // 3. Enforce Premium Entitlement (Standing explainer is a Premium-only feature)
    const { getUserEntitlement } = await import("@/lib/payments/entitlements");
    const entitlement = await getUserEntitlement(authUser.id);
    if (!entitlement.isPremium) {
      return NextResponse.json(
        {
          error: "Unlock Dream College Standing analysis with CUETMate Premium.",
          code: "PAYWALL_FEATURE_LOCKED",
          feature: "standing_explain",
        },
        { status: 403 }
      );
    }

    // 4. Rate Limiting bound to authenticated candidate
    const rateIdentifier = getClientRateLimitIdentifier(req, authUser.id, "ai:standing_explain");
    const rateCheck = await rateLimit("ai:standing_explain", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    // 5. Input Validation & Bounds
    const body = (await req.json().catch(() => ({}))) as StandingExplanationRequest;

    if (!body || !body.targetCollege || !body.courseName) {
      return NextResponse.json(
        { error: "targetCollege and courseName are required fields." },
        { status: 400 }
      );
    }

    if (
      typeof body.targetCollege !== "string" ||
      typeof body.courseName !== "string" ||
      body.targetCollege.length > 200 ||
      body.courseName.length > 200
    ) {
      return NextResponse.json(
        { error: "Input fields exceed acceptable character limits (max 200 characters)." },
        { status: 400 }
      );
    }

    const result = await getStandingExplanation(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[Standing Explain API Error]:", err?.message || err);
    return NextResponse.json(
      { error: "Failed to generate standing explanation. Please try again." },
      { status: 500 }
    );
  }
}
