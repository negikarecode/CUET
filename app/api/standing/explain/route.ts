import { NextRequest, NextResponse } from "next/server";
import { getStandingExplanation, StandingExplanationRequest } from "@/lib/ai/standing-explainer";
import { createClient } from "@/lib/supabase/server";
import { checkServerRateLimit, getClientIdentifier, getRateLimitHeaders } from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as StandingExplanationRequest;

    if (!body || !body.targetCollege || !body.courseName) {
      return NextResponse.json(
        { error: "Missing required parameters for standing explanation." },
        { status: 400 }
      );
    }

    // 1. Resolve Auth User & Check Rate Limits
    let authUserId: string | null = null;
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser?.id) authUserId = authUser.id;
    } catch {}

    const clientIdentifier = getClientIdentifier(req, authUserId || body.userId);
    const rateCheck = checkServerRateLimit("standing_explain", clientIdentifier, 30);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Daily explanation limit reached. Please try again tomorrow.",
          limit: rateCheck.limit,
          remaining: 0,
        },
        { status: 429, headers: getRateLimitHeaders(rateCheck) }
      );
    }

    const explanation = await getStandingExplanation(body);
    return NextResponse.json(explanation, {
      headers: getRateLimitHeaders(rateCheck),
    });
  } catch (err: any) {
    console.error("Error in /api/standing/explain:", err);
    return NextResponse.json(
      { error: "Internal server error generating explanation." },
      { status: 500 }
    );
  }
}
