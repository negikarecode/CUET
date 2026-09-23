import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { RecordedTestAttempt } from "@/types";
import { stringToUuid, computeAnalyticsFromAttempts } from "@/lib/analytics";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { CUET_UG_2026_CONFIG, calculateExamScore } from "@/lib/config/examConfig";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const attempt = (await req.json()) as RecordedTestAttempt;

    if (!attempt || !attempt.testId || !Array.isArray(attempt.questions)) {
      return NextResponse.json(
        { error: "Invalid attempt payload. testId and questions are required." },
        { status: 400 }
      );
    }

    // Authoritative Server-Side Answer Key Verification
    let authMap = new Map<string, string>();
    let authoritativeQuestions: any[] = [];
    try {
      const { questions: trueQuestions } = getQuestionsForTest(attempt.testId);
      if (trueQuestions && trueQuestions.length > 0) {
        authoritativeQuestions = trueQuestions;
        authMap = new Map(trueQuestions.map((tq) => [tq.id, tq.correctOptionId]));
      }
    } catch {
      // Fallback for ad-hoc custom tests
    }

    let verifiedCorrectCount = 0;
    let verifiedIncorrectCount = 0;
    let verifiedAttemptedCount = 0;

    attempt.questions.forEach((q) => {
      if (q.selectedOption !== null && q.selectedOption !== undefined) {
        verifiedAttemptedCount += 1;
        const expectedOption = authMap.get(q.questionId) || q.correctOption;
        if (q.selectedOption === expectedOption) {
          verifiedCorrectCount += 1;
        } else {
          verifiedIncorrectCount += 1;
        }
      }
    });

    attempt.correctCount = verifiedCorrectCount;
    attempt.incorrectCount = verifiedIncorrectCount;
    attempt.attemptedCount = verifiedAttemptedCount;
    const unattemptedCount = Math.max(0, (attempt.totalQuestions || attempt.questions.length) - verifiedAttemptedCount);
    attempt.unattemptedCount = unattemptedCount;

    const { totalMarks, maxMarks } = calculateExamScore(
      verifiedCorrectCount,
      verifiedIncorrectCount,
      unattemptedCount,
      CUET_UG_2026_CONFIG
    );

    attempt.totalMarks = totalMarks;
    attempt.maxMarks = maxMarks;
    attempt.accuracyPercentage =
      verifiedAttemptedCount > 0
        ? Math.round((verifiedCorrectCount / verifiedAttemptedCount) * 100)
        : 0;

    // Determine target User ID
    let targetUserId = attempt.userId || "guest";
    let isSupabaseAuthenticated = false;

    try {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        targetUserId = authUser.id;
        isSupabaseAuthenticated = true;
      }
    } catch {
      // Offline / client-only fallback
    }

    // If we have a valid Supabase authenticated user or UUID profile, persist to Supabase
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const canPersistToDatabase =
      isSupabaseAuthenticated || uuidRegex.test(targetUserId);

    if (canPersistToDatabase) {
      try {
        const supabaseAdmin = createAdminClient();

        // 1. Prepare user_attempts batch (questions and tests are pre-seeded in the database)
        const testUuid = stringToUuid(attempt.testId);
        const attemptsToInsert: any[] = [];

        attempt.questions.forEach((q, idx) => {
          const qUuid = stringToUuid(q.questionId || `${attempt.testId}_q_${idx + 1}`);

          attemptsToInsert.push({
            user_id: targetUserId,
            test_id: testUuid,
            question_id: qUuid,
            selected_option: q.selectedOption,
            is_correct: q.isCorrect,
            time_spent_seconds: q.timeSpentSeconds || 0,
          });
        });

        // 2. Batch insert user_attempts
        if (attemptsToInsert.length > 0) {
          await supabaseAdmin.from("user_attempts").insert(attemptsToInsert);
        }

        // 3. Update profile XP and practice streak if profile exists
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("xp, current_streak, last_practice_date")
          .eq("id", targetUserId)
          .maybeSingle();

        if (profile) {
          const earnedXP = (attempt.correctCount || 0) * 10;
          const todayStr = new Date().toISOString().split("T")[0];

          let updatedStreak = profile.current_streak || 1;
          if (profile.last_practice_date !== todayStr) {
            updatedStreak += 1;
          }

          await supabaseAdmin
            .from("profiles")
            .update({
              xp: (profile.xp || 0) + earnedXP,
              current_streak: updatedStreak,
              last_practice_date: todayStr,
            })
            .eq("id", targetUserId);
        }
      } catch (dbErr) {
        console.warn("[Record Attempt DB Warning]:", dbErr);
        // Continue gracefully so response returns analytics to client
      }
    }

    // Compute analytics for this attempt
    const analytics = computeAnalyticsFromAttempts([attempt]);

    return NextResponse.json({
      success: true,
      persistedToDatabase: canPersistToDatabase,
      analytics,
      attempt,
      questions: authoritativeQuestions,
    });
  } catch (error: any) {
    console.error("[Record Attempt Unexpected Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
