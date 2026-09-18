import { NextResponse } from "next/server";
import { AppDataStore, SEED_TOPICS, SEED_SUBJECTS, SEED_CHAPTERS } from "@/lib/data-store";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    AppDataStore.initialize();
    const topicId = parseInt(params.id, 10);
    if (isNaN(topicId)) {
      return NextResponse.json({ error: "Invalid topic ID" }, { status: 400 });
    }

    const topic = SEED_TOPICS.find((t) => t.id === topicId);
    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    const score = AppDataStore.weaknessScores.get(topicId) || {
      id: topicId,
      student_id: AppDataStore.student.id,
      topic_id: topicId,
      subject_id: topic.subject_id,
      chapter_id: topic.chapter_id,
      total_attempts: 0,
      correct_count: 0,
      wrong_count: 0,
      skipped_count: 0,
      accuracy_score: 0,
      speed_score: 0,
      consistency_score: 0,
      final_weakness_score: 0,
      weakness_level: "untested",
      avg_time_seconds: 0,
      last_attempted: "",
      last_updated: new Date().toISOString(),
      topic,
      subject: SEED_SUBJECTS.find((s) => s.id === topic.subject_id),
      chapter: SEED_CHAPTERS.find((c) => c.id === topic.chapter_id),
    };

    return NextResponse.json({
      success: true,
      topic,
      weaknessScore: score,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch topic analysis" },
      { status: 500 }
    );
  }
}
