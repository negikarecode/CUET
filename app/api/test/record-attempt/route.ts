import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { RecordedTestAttempt } from "@/types";
import { stringToUuid, computeAnalyticsFromAttempts } from "@/lib/analytics";

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

        // 1. Ensure test paper exists in public.tests
        const testUuid = stringToUuid(attempt.testId);
        await supabaseAdmin.from("tests").upsert(
          {
            id: testUuid,
            title: attempt.testTitle || `CUET ${attempt.subject} Mock Paper`,
            subject: attempt.subject || "Physics",
            total_questions: attempt.totalQuestions || attempt.questions.length,
            duration_minutes: Math.ceil((attempt.timeTakenSeconds || 3600) / 60),
            is_active: true,
          },
          { onConflict: "id" }
        );

        // 2. Prepare questions and user_attempts batches
        const questionsToUpsert: any[] = [];
        const attemptsToInsert: any[] = [];

        attempt.questions.forEach((q, idx) => {
          const qUuid = stringToUuid(q.questionId || `${attempt.testId}_q_${idx + 1}`);

          questionsToUpsert.push({
            id: qUuid,
            subject: q.subject || attempt.subject || "Physics",
            chapter: q.chapter || "Domain Core",
            micro_topic: q.microTopic || "Key Concept",
            ncert_reference:
              q.ncertReference ||
              `NCERT Class 12 (${q.chapter || "General"}), Section Focus`,
            archetype: "Direct Fact",
            question_text: `Question ${q.questionNumber || idx + 1}`,
            option_a: "Option A",
            option_b: "Option B",
            option_c: "Option C",
            option_d: "Option D",
            correct_option: q.correctOption || "A",
            explanation: q.explanation || "Detailed solution based on NCERT guidelines.",
            is_pyq: false,
            pyq_year: 2024,
          });

          attemptsToInsert.push({
            user_id: targetUserId,
            test_id: testUuid,
            question_id: qUuid,
            selected_option: q.selectedOption,
            is_correct: q.isCorrect,
            time_spent_seconds: q.timeSpentSeconds || 0,
          });
        });

        // Batch upsert questions (ignore duplicate errors)
        if (questionsToUpsert.length > 0) {
          await supabaseAdmin
            .from("questions")
            .upsert(questionsToUpsert, { onConflict: "id" });
        }

        // Batch insert user_attempts
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
    });
  } catch (error: any) {
    console.error("[Record Attempt Unexpected Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
