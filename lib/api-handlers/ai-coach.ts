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
  getDailyUsageCount,
  getNextMidnightIST,
} from "@/lib/ai-coach/quota-engine";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";
import { generateAICoachReport } from "@/lib/ai-coach/ai-service";
import { generateTopicPracticeQuiz } from "@/lib/ai-coach/practice-engine";
import { setMistakeTag, MistakeTag } from "@/lib/spaced-repetition";

const DEFAULT_SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"];

// In-memory fallback report cache if public.ai_reports table is unmigrated
const fallbackReports = new Map<string, any[]>();

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
      console.warn("[AI Coach] ai_reports table query failed, serving from fallback cache:", error.message);
      const userCached = fallbackReports.get(userId) || [];
      const validCached = userCached.filter((r) => (r.questions_analyzed || 0) > 0);
      const filtered = subjectParam
        ? validCached.filter((r) => r.subject?.toLowerCase() === normalizeSubject(subjectParam).name.toLowerCase())
        : validCached;
      return NextResponse.json({
        success: true,
        reports: filtered,
      });
    }

    const validReports = (reports || []).filter((r) => (r.questions_analyzed || 0) > 0);
    return NextResponse.json({
      success: true,
      reports: validReports,
    });
  }

  // 3. GET /api/ai-coach/practice-quiz
  if (resolvedAction === "practice-quiz") {
    const subjectParam = searchParams.get("subject") || "Physics";
    const topicParam = searchParams.get("topic") || "Core Concepts";
    const quiz = generateTopicPracticeQuiz(subjectParam, topicParam, userId);
    return NextResponse.json({
      success: true,
      ...quiz,
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
    // Rate limit: 5 requests per minute per candidate to prevent cost abuse
    const rateIdentifier = getClientRateLimitIdentifier(req, userId, "ai_coach:generate");
    const rateCheck = await rateLimit("ai_coach:generate", rateIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

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

    // Step A1: Pre-check daily quota BEFORE calculating stats or calling external Groq API (Cost Abuse / Denial of Wallet Defense)
    const currentDailyUsage = await getDailyUsageCount(userId);
    if (currentDailyUsage >= AI_COACH_CONFIG.DAILY_REPORT_LIMIT) {
      return NextResponse.json(
        {
          error: "Daily report generation limit (3/3) reached. Limit resets at midnight IST.",
          code: "DAILY_LIMIT_REACHED",
          nextResetIso: eligibility.nextResetIso,
        },
        { status: 429 }
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

    try {
      // Step C: Compute ALL deterministic stats in code
      const { stats, previousReportStats } = await computeAICoachStats(
        userId,
        norm.name,
        eligibility.lastReportDate
      );

      // Step D: Call Groq AI with 3 backoff retries respecting retry-after
      const { report, model, isFallback } = await generateAICoachReport(
        stats,
        previousReportStats
      );

      // Step E: Quota check and reservation
      // Rule: A daily credit is ONLY used when a full AI report is saved!
      let quotaConsumed = false;
      if (!isFallback) {
        const slotReservation = await reserveDailyReportSlot(userId);
        if (!slotReservation.success) {
          if (slotReservation.count >= AI_COACH_CONFIG.DAILY_REPORT_LIMIT) {
            return NextResponse.json(
              {
                error: "Daily report generation limit (3/3) reached. Limit resets at midnight IST.",
                code: "DAILY_LIMIT_REACHED",
                nextResetIso: eligibility.nextResetIso,
              },
              { status: 429 }
            );
          }
          return NextResponse.json(
            {
              error: "Quota reservation encountered a system error. Please try again.",
              code: "QUOTA_ERROR",
            },
            { status: 500 }
          );
        }
        quotaConsumed = true;
      }

      // Step F: Persist report to public.ai_reports (with resilient fallback)
      const supabaseAdmin = createAdminClient();
      const scoreSnapshot = {
        netScore: stats.netScore,
        potentialScore: stats.potentialScore,
        accuracyPercentage: stats.overallAccuracyPercentage,
        negativeMarksLost: stats.negativeMarksLost,
      };

      let finalReport: any = null;

      try {
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
          console.warn("[AI Coach] Database insert failed on ai_reports (table may be unmigrated):", saveErr?.message);
        } else {
          finalReport = savedReport;
        }
      } catch (insertErr: any) {
        console.warn("[AI Coach] Exception saving to ai_reports table:", insertErr?.message);
      }

      if (!finalReport) {
        finalReport = {
          id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `report_${Date.now()}`,
          user_id: userId,
          subject: norm.name,
          stats_json: stats,
          report_json: report,
          questions_analyzed: stats.uniqueQuestionsAnalyzed,
          score_snapshot: scoreSnapshot,
          model,
          is_fallback: isFallback,
          prompt_version: AI_COACH_CONFIG.PROMPT_VERSION,
          created_at: new Date().toISOString(),
          feedback: null,
        };
        const userCached = (fallbackReports.get(userId) || []).filter((r) => (r.questions_analyzed || 0) > 0);
        userCached.unshift(finalReport);
        fallbackReports.set(userId, userCached);
      }

      // Ensure is_fallback flag matches result on returned object
      if (finalReport) {
        finalReport.is_fallback = isFallback;
      }

      return NextResponse.json({
        success: true,
        report: finalReport,
        isFallback,
        quotaConsumed,
      });
    } catch (err: any) {
      console.error("[AI Coach] Generation failure:", err);

      return NextResponse.json(
        {
          error: "AI diagnostic generation encountered an error. Your daily report credit was not used. Please try again.",
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

  // 3. POST /api/ai-coach/tag-mistake
  if (resolvedAction === "tag-mistake") {
    const { questionId, tag } = body;
    if (!questionId || !tag) {
      return NextResponse.json({ error: "Missing required fields: questionId, tag" }, { status: 400 });
    }

    setMistakeTag(userId, questionId, tag as MistakeTag);

    try {
      const supabaseAdmin = createAdminClient();
      const { data: rows } = await supabaseAdmin
        .from("user_attempts")
        .select("id, diagnostic_report")
        .eq("user_id", userId)
        .eq("question_id", questionId)
        .limit(1);

      if (rows && rows.length > 0 && rows[0]) {
        const existingDiag = rows[0].diagnostic_report || {};
        await supabaseAdmin
          .from("user_attempts")
          .update({
            diagnostic_report: {
              ...existingDiag,
              mistakeTag: tag,
            },
          })
          .eq("id", rows[0].id);
      }
    } catch (err: any) {
      console.warn("[AI Coach] Failed to persist mistake tag to user_attempts:", err?.message);
    }

    return NextResponse.json({ success: true, questionId, tag });
  }

  return NextResponse.json({ error: `Unknown AI Coach POST action: ${resolvedAction}` }, { status: 404 });
}
