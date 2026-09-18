import { NextResponse } from "next/server";
import { AppDataStore, SEED_TOPICS, SEED_SUBJECTS, SEED_CHAPTERS } from "@/lib/data-store";
import {
  calculateAccuracyScore,
  calculateSpeedScore,
  calculateConsistencyScore,
  calculateFinalWeaknessScore,
  getWeaknessLevel,
} from "@/lib/weakness-engine";

export async function POST() {
  try {
    AppDataStore.initialize();
    const studentId = AppDataStore.student.id;

    for (const topic of SEED_TOPICS) {
      const topicAttempts = AppDataStore.attempts.filter(
        (a) => a.student_id === studentId && a.topic_id === topic.id
      );

      if (topicAttempts.length === 0) continue;

      const totalAttempts = topicAttempts.length;
      const correct = topicAttempts.filter((a) => a.is_correct).length;
      const wrong = topicAttempts.filter((a) => !a.is_correct && !a.is_skipped).length;
      const skipped = topicAttempts.filter((a) => a.is_skipped).length;
      const totalTime = topicAttempts.reduce((sum, a) => sum + a.time_taken_seconds, 0);
      const avgTime = totalAttempts > 0 ? totalTime / totalAttempts : 0;

      const accuracy = calculateAccuracyScore(correct, wrong, skipped);
      const speed = calculateSpeedScore(avgTime, "medium");
      const consistency = calculateConsistencyScore(topicAttempts);
      const finalScore = calculateFinalWeaknessScore(accuracy, speed, consistency);
      const level = getWeaknessLevel(finalScore);

      AppDataStore.weaknessScores.set(topic.id, {
        id: topic.id,
        student_id: studentId,
        topic_id: topic.id,
        subject_id: topic.subject_id,
        chapter_id: topic.chapter_id,
        total_attempts: totalAttempts,
        correct_count: correct,
        wrong_count: wrong,
        skipped_count: skipped,
        accuracy_score: accuracy,
        speed_score: speed,
        consistency_score: consistency,
        final_weakness_score: finalScore,
        weakness_level: level,
        avg_time_seconds: Math.round(avgTime * 100) / 100,
        last_attempted: topicAttempts[topicAttempts.length - 1].attempted_at,
        last_updated: new Date().toISOString(),
        topic,
        subject: SEED_SUBJECTS.find((s) => s.id === topic.subject_id),
        chapter: SEED_CHAPTERS.find((c) => c.id === topic.chapter_id),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Recalculated all weakness scores successfully",
      totalUpdated: AppDataStore.weaknessScores.size,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to recalculate weakness scores" },
      { status: 500 }
    );
  }
}
