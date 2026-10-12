import { NextRequest, NextResponse } from "next/server";
import { diagnoseMistake } from "@/lib/ai/gemini-diagnostics";
import { createClient } from "@/lib/supabase/server";
import { checkServerRateLimit, getClientIdentifier, getRateLimitHeaders } from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      questionId,
      selectedOption,
      questionText,
      selectedOptionText,
      correctOption,
      correctOptionText,
      explanation,
      microTopic,
      timeSpentSeconds,
    } = body;

    if (!questionId || !selectedOption) {
      return NextResponse.json(
        { error: "questionId and selectedOption are required." },
        { status: 400 }
      );
    }

    // 1. Resolve Auth User & Apply Rate Limiting
    let authUserId: string | null = null;
    let isPremium = false;
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser?.id) {
        authUserId = authUser.id;
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_premium")
          .eq("id", authUser.id)
          .single();
        if (profile?.is_premium) isPremium = true;
      }
    } catch {}

    const clientIdentifier = getClientIdentifier(req, authUserId);
    const rateCheck = checkServerRateLimit("diagnose_mistake", clientIdentifier, isPremium ? 60 : 30);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: "Daily AI mistake diagnosis limit reached. Upgrade to unlock more.",
          limit: rateCheck.limit,
          remaining: 0,
          resetAt: rateCheck.resetAt,
        },
        { status: 429, headers: getRateLimitHeaders(rateCheck) }
      );
    }

    const result = await diagnoseMistake({
      questionId,
      selectedOption,
      questionText: questionText || "CUET Exam Question",
      selectedOptionText,
      correctOption: correctOption || "A",
      correctOptionText,
      explanation,
      microTopic,
      timeSpentSeconds,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Cache": result.fromCache ? "HIT" : "MISS",
        "X-Tokens-Used": result.tokensUsed.toString(),
        ...getRateLimitHeaders(rateCheck),
      },
    });
  } catch (error) {
    console.error("Mistake Diagnostic API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during mistake diagnosis." },
      { status: 500 }
    );
  }
}
