import { NextResponse } from "next/server";
import { RecordAttemptPayload, StudentAttempt, WeaknessScore } from "@/lib/types";
import { AppDataStore, SEED_SUBJECTS, SEED_CHAPTERS, SEED_TOPICS } from "@/lib/data-store";
import {
  calculateAccuracyScore,
  calculateSpeedScore,
  calculateConsistencyScore,
  calculateFinalWeaknessScore,
  getWeaknessLevel,
} from "@/lib/weakness-engine";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { stringToUuid } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body: RecordAttemptPayload = await req.json();

    if (!body.topic_id || !body.question_id) {
      return NextResponse.json(
        { success: false, error: "Missing required attempt parameters" },
        { status: 400 }
      );
    }

    const studentId = AppDataStore.student.id;
    const now = new Date().toISOString();

    // 1. Record Attempt
    const newAttempt: StudentAttempt = {
      id: AppDataStore.attempts.length + 1,
      student_id: studentId,
      question_id: body.question_id,
      subject_id: body.subject_id,
      chapter_id: body.chapter_id,
      topic_id: body.topic_id,
      selected_option: body.selected_option,
      is_correct: body.is_correct,
      is_skipped: body.is_skipped,
      time_taken_seconds: body.time_taken_seconds || 0,
      attempt_source: (body.attempt_source as any) || "practice",
      session_id: body.session_id,
      attempt_number: 1,
      attempted_at: now,
    };

    AppDataStore.attempts.push(newAttempt);

    // If Supabase is active, persist in public.user_attempts
    if (isSupabaseConfigured()) {
      try {
        const testUuid = body.session_id
          ? stringToUuid(body.session_id)
          : stringToUuid(`topic_practice_${body.topic_id}`);
        const qUuid = stringToUuid(String(body.question_id));

        await supabase.from("user_attempts").insert([
          {
            user_id: studentId,
            test_id: testUuid,
            question_id: qUuid,
            selected_option: body.selected_option,
            is_correct: body.is_correct,
            time_spent_seconds: body.time_taken_seconds || 0,
          },
        ]);
      } catch (err) {
        console.warn("Supabase insert attempt fallback:", err);
      }
    }

    // 2. Fetch all attempts for this student + topic
    const topicAttempts = AppDataStore.attempts.filter(
      (a) => a.student_id === studentId && a.topic_id === body.topic_id
    );

    const totalAttempts = topicAttempts.length;
    const correctCount = topicAttempts.filter((a) => a.is_correct).length;
    const wrongCount = topicAttempts.filter((a) => !a.is_correct && !a.is_skipped).length;
    const skippedCount = topicAttempts.filter((a) => a.is_skipped).length;
    const totalTime = topicAttempts.reduce((sum, a) => sum + a.time_taken_seconds, 0);
    const avgTimeSeconds = totalAttempts > 0 ? totalTime / totalAttempts : 0;

    // 3. Weakness Engine Math Calculations
    const accuracyScore = calculateAccuracyScore(correctCount, wrongCount, skippedCount);
    const speedScore = calculateSpeedScore(avgTimeSeconds, "medium");
    const consistencyScore = calculateConsistencyScore(topicAttempts);
    const finalWeaknessScore = calculateFinalWeaknessScore(accuracyScore, speedScore, consistencyScore);
    const weaknessLevel = getWeaknessLevel(finalWeaknessScore);

    const topic = SEED_TOPICS.find((t) => t.id === body.topic_id);
    const subject = SEED_SUBJECTS.find((s) => s.id === body.subject_id);
    const chapter = SEED_CHAPTERS.find((c) => c.id === body.chapter_id);

    const updatedScore: WeaknessScore = {
      id: body.topic_id,
      student_id: studentId,
      topic_id: body.topic_id,
      subject_id: body.subject_id,
      chapter_id: body.chapter_id,
      total_attempts: totalAttempts,
      correct_count: correctCount,
      wrong_count: wrongCount,
      skipped_count: skippedCount,
      accuracy_score: accuracyScore,
      speed_score: speedScore,
      consistency_score: consistencyScore,
      final_weakness_score: finalWeaknessScore,
      weakness_level: weaknessLevel,
      avg_time_seconds: Math.round(avgTimeSeconds * 100) / 100,
      last_attempted: now,
      last_updated: now,
      topic,
      subject,
      chapter,
    };

    AppDataStore.weaknessScores.set(body.topic_id, updatedScore);

    // If Supabase is active, upsert weakness_scores
    if (isSupabaseConfigured()) {
      try {
        await supabase.from("weakness_scores").upsert([
          {
            student_id: studentId,
            topic_id: body.topic_id,
            subject_id: body.subject_id,
            chapter_id: body.chapter_id,
            total_attempts: totalAttempts,
            correct_count: correctCount,
            wrong_count: wrongCount,
            skipped_count: skippedCount,
            accuracy_score: accuracyScore,
            speed_score: speedScore,
            consistency_score: consistencyScore,
            final_weakness_score: finalWeaknessScore,
            weakness_level: weaknessLevel,
            avg_time_seconds: avgTimeSeconds,
            last_attempted: now,
            last_updated: now,
          },
        ]);
      } catch (err) {
        console.warn("Supabase upsert weakness score fallback:", err);
      }
    }

    return NextResponse.json({
      success: true,
      weaknessScore: updatedScore,
    });
  } catch (error: unknown) {
    console.error("Error recording student attempt:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error recording attempt" },
      { status: 500 }
    );
  }
}
