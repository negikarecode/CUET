import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const VALID_REASONS = [
  "wrong_answer",
  "ambiguous_question",
  "factual_error",
  "out_of_syllabus",
  "formatting_or_typo",
  "other",
] as const;

type ReportReason = (typeof VALID_REASONS)[number];

/**
 * POST /api/questions/report
 * DPDP Act 2023 - Data Quality & Accuracy Feedback
 * Allows authenticated candidates to report errant question keys,
 * flawed explanations, or formatting defects. Enforces daily rate-limiting (10/day).
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { ok: false, error: "Please log in to report a question issue." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { questionId, testId, reportReason, comment } = body;

    if (!questionId || typeof questionId !== "string") {
      return NextResponse.json(
        { ok: false, error: "Valid Question ID is required." },
        { status: 400 }
      );
    }

    if (!reportReason || !VALID_REASONS.includes(reportReason as ReportReason)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Please select a valid report reason: ${VALID_REASONS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const safeComment = typeof comment === "string" ? comment.trim().slice(0, 1000) : "";
    const safeQuestionId = questionId.trim().slice(0, 128);
    const safeTestId = typeof testId === "string" ? testId.trim().slice(0, 128) : null;
    const userId = user.id;

    // Daily Rate-Limiting: Maximum 10 reports per user per rolling 24-hour window
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count, error: countErr } = await supabaseAdmin
      .from("question_reports")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", oneDayAgo);

    if (countErr) {
      console.warn("[Question Report Rate Check Warning]:", countErr);
    } else if (count !== null && count >= 10) {
      return NextResponse.json(
        {
          ok: false,
          error: "Daily feedback limit reached. You can submit up to 10 question reports per 24 hours.",
          code: "RATE_LIMIT_EXCEEDED",
        },
        { status: 429 }
      );
    }

    // Insert Report Record
    const { error: insertErr } = await supabaseAdmin
      .from("question_reports")
      .insert({
        user_id: userId,
        question_id: safeQuestionId,
        test_id: safeTestId,
        report_reason: reportReason,
        comment: safeComment || null,
        status: "pending",
      });

    if (insertErr) {
      console.error("[Question Report DB Insert Error]:", insertErr);
      return NextResponse.json(
        { ok: false, error: "Database error recording question report. Please retry." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you for helping maintain exam accuracy. Your report has been submitted to the academic review panel.",
    });
  } catch (error: any) {
    console.error("[Question Report Route Error]:", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while processing your question report." },
      { status: 500 }
    );
  }
}
