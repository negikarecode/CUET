import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { RecordedTestAttempt } from "@/types";
import { stringToUuid, computeAnalyticsFromAttempts } from "@/lib/analytics";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { CUET_UG_2026_CONFIG, calculateExamScore } from "@/lib/config/examConfig";
import { calculateNextStreakOnPractice, getLocalDateString } from "@/lib/gamification";

export const dynamic = "force-dynamic";

const recentAttemptSubmissions = new Map<string, number>();

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

    const totalQ = attempt.totalQuestions || attempt.questions.length || 50;
    const { totalMarks, maxMarks } = calculateExamScore(
      verifiedCorrectCount,
      verifiedIncorrectCount,
      unattemptedCount,
      CUET_UG_2026_CONFIG,
      totalQ
    );

    attempt.totalMarks = totalMarks;
    attempt.maxMarks = maxMarks;
    attempt.accuracyPercentage =
      verifiedAttemptedCount > 0
        ? Math.round((verifiedCorrectCount / verifiedAttemptedCount) * 100)
        : 0;

    // Determine target User ID securely
    let targetUserId = "guest";
    let isSupabaseAuthenticated = false;

    try {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser?.id) {
        targetUserId = authUser.id;
        isSupabaseAuthenticated = true;
      }
    } catch {
      // Offline / client-only fallback
    }

    // Server Idempotency Guard: prevent duplicate submissions within 60 seconds
    const attemptIdStr = (attempt.attemptId || attempt.id || "").trim();
    const idempotencyKey = attemptIdStr
      ? `${targetUserId}_${attemptIdStr}`
      : `${targetUserId}_${stringToUuid(attempt.testId)}_${attempt.id || ""}`;
    const nowMs = Date.now();
    const lastSeen = recentAttemptSubmissions.get(idempotencyKey);
    if (lastSeen && nowMs - lastSeen < 60000) {
      return NextResponse.json({
        success: true,
        deduplicated: true,
        persistedToDatabase: isSupabaseAuthenticated,
        attempt,
      });
    }
    recentAttemptSubmissions.set(idempotencyKey, nowMs);
    if (recentAttemptSubmissions.size > 500) {
      for (const [k, t] of recentAttemptSubmissions.entries()) {
        if (nowMs - t > 60000) recentAttemptSubmissions.delete(k);
      }
    }

    // Persist to database ONLY when user has a verified Supabase authenticated session
    const canPersistToDatabase = isSupabaseAuthenticated;

    let updatedStreak: number | undefined;

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

        // 3. Database Idempotency Check & user_attempts insertion
        let attemptUuid: string | null = null;
        if (attempt.attemptId) {
          attemptUuid = /^[0-9a-f-]{36}$/i.test(attempt.attemptId)
            ? attempt.attemptId
            : stringToUuid(attempt.attemptId);
        }

        let hasAttemptIdCol = false;
        if (attemptUuid) {
          try {
            const { data: existingSessionRows, error: colCheckError } = await supabaseAdmin
              .from("user_attempts")
              .select("id")
              .eq("user_id", targetUserId)
              .eq("attempt_id", attemptUuid)
              .limit(1);

            if (!colCheckError) {
              hasAttemptIdCol = true;
              if (existingSessionRows && existingSessionRows.length > 0) {
                // Existing session already recorded! Return idempotent success
                return NextResponse.json({
                  success: true,
                  deduplicated: true,
                  persistedToDatabase: true,
                  attempt,
                });
              }
            }
          } catch {
            hasAttemptIdCol = false;
          }
        }

        // Prepare user_attempts for all attempted questions (deduplicated by question UUID)
        const seenQuestionUuids = new Set<string>();
        const attemptsToInsert: any[] = [];

        attempt.questions
          .filter((q) => q.selectedOption !== null && q.selectedOption !== undefined)
          .forEach((q, idx) => {
            const qUuid = stringToUuid(q.questionId || `${attempt.testId}_q_${idx + 1}`);
            if (seenQuestionUuids.has(qUuid)) return;
            seenQuestionUuids.add(qUuid);

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

            const rowData: any = {
              user_id: targetUserId,
              test_id: testUuid,
              question_id: qUuid,
              selected_option: validOption,
              is_correct: isCorrect,
              time_spent_seconds: Math.max(0, q.timeSpentSeconds || 0),
            };

            if (hasAttemptIdCol && attemptUuid) {
              rowData.attempt_id = attemptUuid;
            }

            attemptsToInsert.push(rowData);
          });

        if (attemptsToInsert.length > 0) {
          if (hasAttemptIdCol && attemptUuid) {
            // Delete only if this exact attempt_id was previously partially inserted
            await supabaseAdmin
              .from("user_attempts")
              .delete()
              .eq("user_id", targetUserId)
              .eq("attempt_id", attemptUuid);
          } else {
            // Fallback for legacy schema: remove previous attempt on this test
            await supabaseAdmin
              .from("user_attempts")
              .delete()
              .eq("user_id", targetUserId)
              .eq("test_id", testUuid);
          }

          const { error: insertErr } = await supabaseAdmin
            .from("user_attempts")
            .insert(attemptsToInsert);
          if (insertErr) {
            console.error("[Record Attempt Insert DB Error]:", insertErr);
          }
        }

        // 4. Update profile XP, practice streak, and canonical total_questions_attempted
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("xp, current_streak, last_practice_date")
          .eq("id", targetUserId)
          .maybeSingle();

        // Calculate authoritative unique attempted count from database
        const { count: canonicalDbAttemptCount } = await supabaseAdmin
          .from("user_attempts")
          .select("id", { count: "exact", head: true })
          .eq("user_id", targetUserId);

        if (profile) {
          const earnedXP = (attempt.correctCount || 0) * 10;
          const todayStr = getLocalDateString();

          updatedStreak = calculateNextStreakOnPractice(
            profile.current_streak ?? 0,
            profile.last_practice_date,
            todayStr
          );

          await supabaseAdmin
            .from("profiles")
            .update({
              xp: (profile.xp || 0) + earnedXP,
              current_streak: updatedStreak,
              last_practice_date: todayStr,
              total_questions_attempted: canonicalDbAttemptCount ?? attemptsToInsert.length,
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
      streak: updatedStreak,
    });
  } catch (error: any) {
    console.error("[Record Attempt Unexpected Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
