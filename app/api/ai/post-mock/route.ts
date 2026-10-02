import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PostMockDeterministicReport } from "@/types/postMockAnalysis";
import { generatePostMockAIInsight } from "@/lib/post-mock-ai-engine";
import { getCachedPostMockAI, setCachedPostMockAI } from "@/lib/ai-cache";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { report, userId: clientUserId } = body as {
      report: PostMockDeterministicReport;
      userId?: string;
    };

    if (!report || !report.attemptId || !report.overall) {
      return NextResponse.json(
        { error: "Invalid payload. Valid PostMockDeterministicReport is required." },
        { status: 400 }
      );
    }

    // Determine secure user identity
    let activeUserId = clientUserId || report.userId || "guest";
    try {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser?.id) {
        activeUserId = authUser.id;
      }
    } catch {
      // Offline or client authenticated
    }

    // Generate deterministic fingerprint of mock telemetry for caching
    const fingerprint = `${report.overall.attemptedCount}_${report.overall.correctCount}_${report.overall.totalMarks}_${report.allQuestions.length}`;

    // 1. Check user-scoped cache FIRST
    const cached = getCachedPostMockAI(activeUserId, report.attemptId, fingerprint);
    if (cached) {
      return NextResponse.json(
        { aiInsight: cached, cached: true },
        { headers: { "X-Cache": "HIT" } }
      );
    }

    // 2. Generate AI Insight (LLM with deterministic fallback)
    const aiInsight = await generatePostMockAIInsight(report);

    // 3. Persist to user-scoped cache
    setCachedPostMockAI(activeUserId, report.attemptId, fingerprint, aiInsight);

    return NextResponse.json({ aiInsight, cached: false });
  } catch (err: any) {
    console.error("Post-Mock AI endpoint error:", err);
    return NextResponse.json(
      {
        error: "Failed to generate post-mock AI insight",
        aiInsight: {
          status: "unavailable",
          summary: "AI interpretation is temporarily unavailable.",
          difficultyInsight: "",
          chapterInsights: [],
          notablePatterns: [],
          recommendedNextSteps: [],
          generatedAt: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
