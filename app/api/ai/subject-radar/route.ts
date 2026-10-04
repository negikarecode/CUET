import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateSubjectRadarAIAnalysis } from "@/lib/subject-ai-engine";
import { getCachedSubjectRadarAI, setCachedSubjectRadarAI } from "@/lib/ai-cache";
import { SubjectRadarAIPayload } from "@/types/subject-ai";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/ai/subject-radar
 * Generates or retrieves cached evidence-based AI learning analysis for a domain subject.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body: SubjectRadarAIPayload = await req.json();
    const { subject, deterministicStats, cycleInfo } = body;

    if (!subject || !deterministicStats) {
      return NextResponse.json(
        { error: "Invalid payload: subject and deterministicStats required" },
        { status: 400 }
      );
    }

    const userId = body.userId || user?.id || "guest";

    // Strictly enforce minimum 150 qualifying questions for diagnostic cycle analysis
    const totalAttempted = deterministicStats.totalAttempted || 0;
    const cycleQuestionCount = cycleInfo?.currentCycleQuestionCount ?? totalAttempted;
    const isCompletedCycle = cycleQuestionCount >= 150 || totalAttempted >= 150;

    if (!isCompletedCycle) {
      return NextResponse.json(
        {
          error: "Calibration Incomplete: Minimum 150 qualifying questions required for Subject Weakness Radar analysis.",
          currentCycleQuestionCount: cycleQuestionCount,
          required: 150,
        },
        { status: 400 }
      );
    }

    // Build unique cache fingerprint strictly scoped to user + cycleNumber + exact question telemetry
    const fingerprint = `${deterministicStats.totalAttempted}_${deterministicStats.accuracyPercentage}_${
      cycleInfo?.currentCycleNumber || 1
    }_${cycleQuestionCount}`;

    // 1. Check cache first to avoid redundant LLM calls on page refresh
    const cached = getCachedSubjectRadarAI(userId, subject, fingerprint);
    if (cached) {
      return NextResponse.json({
        success: true,
        source: "cache",
        analysis: cached,
      });
    }

    // 2. Run Evidence-Based AI Analysis (Groq LPU with verified deterministic fallback)
    const analysis = await generateSubjectRadarAIAnalysis(body);

    // 3. Store in cache
    setCachedSubjectRadarAI(userId, subject, fingerprint, analysis);

    return NextResponse.json({
      success: true,
      source: "generated",
      analysis,
    });
  } catch (error) {
    console.error("Subject Radar AI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate subject AI analysis" },
      { status: 500 }
    );
  }
}
