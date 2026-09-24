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
        trueQuestions.forEach((tq) => {
          if (tq.correctOptionId) {
            authMap.set(tq.id, tq.correctOptionId);
            if (tq.questionId) authMap.set(tq.questionId, tq.correctOptionId);
            authMap.set(String(tq.questionNumber), tq.correctOptionId);
            authMap.set(`q_${tq.questionNumber}`, tq.correctOptionId);
            authMap.set(tq.questionNumber.toString().padStart(2, "0"), tq.correctOptionId);
          }
        });
      }
    } catch {
      // Fallback for ad-hoc custom tests
    }

    let verifiedCorrectCount = 0;
    let verifiedIncorrectCount = 0;
    let verifiedAttemptedCount = 0;

    attempt.questions.forEach((q, idx) => {
      if (q.selectedOption !== null && q.selectedOption !== undefined) {
        verifiedAttemptedCount += 1;
        const expectedOption =
          authMap.get(q.questionId) ||
          authMap.get(String(q.questionNumber)) ||
          authMap.get(String(idx + 1)) ||
          authMap.get((idx + 1).toString().padStart(2, "0")) ||
          authMap.get((q as any).id || "") ||
          q.correctOption;

        const isMatch = Boolean(expectedOption && q.selectedOption === expectedOption);
        q.isCorrect = isMatch;
        if (expectedOption) {
          q.correctOption = expectedOption as "A" | "B" | "C" | "D";
        }

        if (isMatch) {
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

        // 1. Ensure test record exists in tests table so foreign key constraint is satisfied
        const testUuid = stringToUuid(attempt.testId);
        await supabaseAdmin.from("tests").upsert(
          {
            id: testUuid,
            title: attempt.testTitle || `CUET ${attempt.subject || "Domain"} Mock Test`,
            subject: attempt.subject || "Physics",
            total_questions: attempt.totalQuestions || attempt.questions.length || 50,
            duration_minutes: 60,
            is_active: true,
          },
          { onConflict: "id" }
        );

        // 2. Ensure question records exist in questions table with metadata
        const questionsToUpsert = attempt.questions.map((q, idx) => {
          const qUuid = stringToUuid(q.questionId || `${attempt.testId}_q_${idx + 1}`);
          const optA =
            q.options?.find((o: any) => o.id === "A")?.text || (q as any).optionA || "Option A";
          const optB =
            q.options?.find((o: any) => o.id === "B")?.text || (q as any).optionB || "Option B";
          const optC =
            q.options?.find((o: any) => o.id === "C")?.text || (q as any).optionC || "Option C";
          const optD =
            q.options?.find((o: any) => o.id === "D")?.text || (q as any).optionD || "Option D";
          const expectedOption =
            authMap.get(q.questionId) ||
            authMap.get(String(q.questionNumber)) ||
            authMap.get(String(idx + 1)) ||
            authMap.get((idx + 1).toString().padStart(2, "0")) ||
            q.correctOption ||
            "A";

          return {
            id: qUuid,
            subject: q.subject || attempt.subject || "Physics",
            chapter: q.chapter || "Domain Core",
            micro_topic: q.microTopic || q.chapter || "Core Concept",
            ncert_reference: q.ncertReference || `NCERT Class 12 (${q.chapter || "Core"})`,
            archetype: "Direct Fact",
            question_text: q.prompt || `Question ${q.questionNumber || idx + 1}`,
            option_a: optA,
            option_b: optB,
            option_c: optC,
            option_d: optD,
            correct_option: expectedOption,
            explanation: q.explanation || "Official Solution",
          };
        });

        if (questionsToUpsert.length > 0) {
          await supabaseAdmin.from("questions").upsert(questionsToUpsert, { onConflict: "id" });
        }

        // 3. Prepare and insert user_attempts for all attempted questions
        const attemptsToInsert = attempt.questions
          .filter((q) => q.selectedOption !== null && q.selectedOption !== undefined)
          .map((q, idx) => {
            const qUuid = stringToUuid(q.questionId || `${attempt.testId}_q_${idx + 1}`);
            const expectedOption =
              authMap.get(q.questionId) ||
              authMap.get(String(q.questionNumber)) ||
              authMap.get(String(idx + 1)) ||
              authMap.get((idx + 1).toString().padStart(2, "0")) ||
              q.correctOption;
            const isCorrect = Boolean(
              (expectedOption && q.selectedOption === expectedOption) || q.isCorrect === true
            );

            const rawOpt =
              typeof q.selectedOption === "string" ? q.selectedOption.trim().toUpperCase() : null;
            const validOption =
              rawOpt && ["A", "B", "C", "D"].includes(rawOpt) ? rawOpt : null;

            return {
              user_id: targetUserId,
              test_id: testUuid,
              question_id: qUuid,
              selected_option: validOption,
              is_correct: isCorrect,
              time_spent_seconds: Math.max(0, q.timeSpentSeconds || 0),
            };
          });

        if (attemptsToInsert.length > 0) {
          const { error: insertErr } = await supabaseAdmin
            .from("user_attempts")
            .insert(attemptsToInsert);
          if (insertErr) {
            console.error("[Record Attempt Insert DB Error]:", insertErr);
          }
        }

        // 4. Update profile XP and practice streak if profile exists
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
