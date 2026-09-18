import { NextResponse } from "next/server";
import { AppDataStore, SEED_QUESTIONS } from "@/lib/data-store";

export async function GET(
  request: Request,
  { params }: { params: { topic_id: string } }
) {
  try {
    const topicId = parseInt(params.topic_id, 10);
    if (isNaN(topicId)) {
      return NextResponse.json({ error: "Invalid topic ID" }, { status: 400 });
    }

    const studentId = AppDataStore.student.id;

    // 1. Get all questions matching topic (or fallback to related subject questions if bank has few items)
    let questions = SEED_QUESTIONS.filter((q) => q.topic_id === topicId);
    if (questions.length === 0) {
      // Provide representative questions from syllabus
      questions = SEED_QUESTIONS;
    }

    // 2. Count correct answers per question for this student
    const correctCounts: Record<number, number> = {};
    const wrongCounts: Record<number, number> = {};

    AppDataStore.attempts
      .filter((a) => a.student_id === studentId)
      .forEach((a) => {
        if (a.is_correct) {
          correctCounts[a.question_id] = (correctCounts[a.question_id] || 0) + 1;
        } else if (!a.is_skipped) {
          wrongCounts[a.question_id] = (wrongCounts[a.question_id] || 0) + 1;
        }
      });

    // 3. Filter out questions already answered correctly 3+ times
    const filtered = questions.filter((q) => (correctCounts[q.id] || 0) < 3);

    // 4. Prioritize questions the student got wrong before
    const sorted = (filtered.length > 0 ? filtered : questions).sort((a, b) => {
      const wrongA = wrongCounts[a.id] || 0;
      const wrongB = wrongCounts[b.id] || 0;
      return wrongB - wrongA; // higher wrong count comes first
    });

    const finalQuestions = sorted.slice(0, 20);

    return NextResponse.json({
      success: true,
      topicId,
      total: finalQuestions.length,
      questions: finalQuestions,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch practice questions" },
      { status: 500 }
    );
  }
}
