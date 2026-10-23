import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeSubject } from "@/lib/analytics";
import { AI_COACH_CONFIG } from "@/lib/ai-coach/config";
import {
  checkSubjectEligibility,
  computeAICoachStats,
} from "@/lib/ai-coach/stats-engine";
import {
  acquireGenerationLock,
  releaseGenerationLock,
  reserveDailyReportSlot,
  refundDailyReportSlot,
  getDailyUsageCount,
  getNextMidnightIST,
} from "@/lib/ai-coach/quota-engine";
import { generateAICoachReport } from "@/lib/ai-coach/ai-service";

const DEFAULT_SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"];

/**
 * GET /api/ai-coach/* dispatcher
 */
export async function handleAICoachGet(
  req: NextRequest,
  action?: string
): Promise<NextResponse> {
  const resolvedAction = action || req.nextUrl?.pathname?.split("/").pop() || "status";

  const supabase = createClient();
  let authUser = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    authUser = user;
  } catch {}

  if (!authUser?.id) {
    return NextResponse.json(
      { error: "Authentication required to access AI Coach.", code: "AUTH_REQUIRED" },
      { status: 401 }
    );
  }

  const userId = authUser.id;
  const searchParams = req.nextUrl.searchParams;

  // 1. GET /api/ai-coach/status
  if (resolvedAction === "status") {
    const subjectParam = searchParams.get("subject");

    if (subjectParam) {
      const eligibility = await checkSubjectEligibility(userId, subjectParam);
      return NextResponse.json({ success: true, eligibility });
    }

    // Return status for all profile enrolled subjects or default subjects
    let subjects = DEFAULT_SUBJECTS;
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("selected_subjects")
        .eq("id", userId)
        .maybeSingle();

      if (profile?.selected_subjects && Array.isArray(profile.selected_subjects) && profile.selected_subjects.length > 0) {
        subjects = profile.selected_subjects;
      }
    } catch {}

    const eligibilities = await Promise.all(
      subjects.map((sub) => checkSubjectEligibility(userId, sub))
    );

    const dailyUsage = await getDailyUsageCount(userId);
    const reportsLeftToday = Math.max(0, AI_COACH_CONFIG.DAILY_REPORT_LIMIT - dailyUsage);

    return NextResponse.json({
      success: true,
      subjects: eligibilities,
      reportsLeftToday,
      dailyLimitReached: reportsLeftToday === 0,
      nextResetIso: getNextMidnightIST(),
    });
  }

  // 2. GET /api/ai-coach/reports
  if (resolvedAction === "reports") {
    const subjectParam = searchParams.get("subject");
    const supabaseAdmin = createAdminClient();

    let query = supabaseAdmin
      .from("ai_reports")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (subjectParam) {
      const norm = normalizeSubject(subjectParam);
      query = query.ilike("subject", norm.name);
    }

    const { data: reports, error } = await query;
    if (error) {
      return NextResponse.json({ error: "Failed to load reports" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      reports: reports || [],
    });
  }

  return NextResponse.json({ error: `Unknown AI Coach GET action: ${resolvedAction}` }, { status: 404 });
}

/**
 * POST /api/ai-coach/* dispatcher
 */
export async function handleAICoachPost(
  req: NextRequest,
  action?: string
): Promise<NextResponse> {
  const resolvedAction = action || req.nextUrl?.pathname?.split("/").pop() || "";

  const supabase = createClient();
  let authUser = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    authUser = user;
  } catch {}

  if (!authUser?.id) {
    return NextResponse.json(
      { error: "Authentication required to access AI Coach.", code: "AUTH_REQUIRED" },
      { status: 401 }
    );
  }

  const userId = authUser.id;
  const body = await req.json().catch(() => ({}));

  // 1. POST /api/ai-coach/generate
  if (resolvedAction === "generate") {
    const subject = body.subject;
    if (!subject || typeof subject !== "string") {
      return NextResponse.json(
        { error: "Missing required parameter 'subject'" },
        { status: 400 }
      );
    }

    const norm = normalizeSubject(subject);

    // Step A: Check eligibility (150 unique fresh questions since last report)
    const eligibility = await checkSubjectEligibility(userId, norm.name);
    if (!eligibility.isUnlocked) {
      return NextResponse.json(
        {
          error: `Incomplete calibration: ${norm.name} requires at least 150 unique question attempts since your last report. Current: ${eligibility.freshQuestionsCount}/150 questions.`,
          code: "CALIBRATION_GATE_LOCKED",
          freshQuestionsCount: eligibility.freshQuestionsCount,
          requiredQuestions: eligibility.requiredQuestions,
          questionsRemaining: eligibility.questionsRemaining,
        },
        { status: 403 }
      );
    }

    // Step B: Double-click duplicate lock
    const lockAcquired = acquireGenerationLock(userId, norm.name);
    if (!lockAcquired) {
      return NextResponse.json(
        {
          error: "A report generation is already in progress for this subject. Please wait a moment.",
          code: "GENERATION_IN_PROGRESS",
        },
        { status: 409 }
      );
    }

    // Step C: Atomically reserve 1 daily report quota slot
    const slotReservation = await reserveDailyReportSlot(userId);
    if (!slotReservation.success) {
      releaseGenerationLock(userId, norm.name);
      return NextResponse.json(
        {
          error: "Daily report generation limit (3/3) reached. Limit resets at midnight IST.",
          code: "DAILY_LIMIT_REACHED",
          nextResetIso: eligibility.nextResetIso,
        },
        { status: 429 }
      );
    }

    try {
      // Step D: Compute ALL deterministic stats in code
      const { stats, previousReportStats } = await computeAICoachStats(
        userId,
        norm.name,
        eligibility.lastReportDate
      );

      // Step E: Call AI with strict JSON schema
      const { report, model } = await generateAICoachReport(
        stats,
        previousReportStats
      );

      // Step F: Persist report to public.ai_reports
      const supabaseAdmin = createAdminClient();
      const scoreSnapshot = {
        netScore: stats.netScore,
        potentialScore: stats.potentialScore,
        accuracyPercentage: stats.overallAccuracyPercentage,
        negativeMarksLost: stats.negativeMarksLost,
      };

      const { data: savedReport, error: saveErr } = await supabaseAdmin
        .from("ai_reports")
        .insert({
          user_id: userId,
          subject: norm.name,
          stats_json: stats as any,
          report_json: report as any,
          questions_analyzed: stats.uniqueQuestionsAnalyzed,
          score_snapshot: scoreSnapshot as any,
          model,
          prompt_version: AI_COACH_CONFIG.PROMPT_VERSION,
        })
        .select("*")
        .single();

      if (saveErr || !savedReport) {
        throw new Error(saveErr?.message || "Database insert failed on ai_reports");
      }

      return NextResponse.json({
        success: true,
        report: savedReport,
      });
    } catch (err: any) {
      // Step G: REFUND QUOTA SLOT IF CALL OR VALIDATION FAILS
      console.error("[AI Coach] Generation failure, refunding quota slot:", err);
      await refundDailyReportSlot(userId);

      return NextResponse.json(
        {
          error: "AI diagnostic generation encountered an error. Your daily report credit was not used. Please try again.",
          details: err?.message,
        },
        { status: 500 }
      );
    } finally {
      // Release idempotency lock
      releaseGenerationLock(userId, norm.name);
    }
  }

  // 2. POST /api/ai-coach/feedback
  if (resolvedAction === "feedback") {
    const { reportId, feedback } = body;
    if (!reportId || (feedback !== "up" && feedback !== "down" && feedback !== null)) {
      return NextResponse.json({ error: "Invalid feedback payload" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();
    const { error } = await supabaseAdmin
      .from("ai_reports")
      .update({ feedback })
      .eq("id", reportId)
      .eq("user_id", userId);

    if (error) {
      return NextResponse.json({ error: "Failed to record feedback" }, { status: 500 });
    }

    return NextResponse.json({ success: true, feedback });
  }

  return NextResponse.json({ error: `Unknown AI Coach POST action: ${resolvedAction}` }, { status: 404 });
}
