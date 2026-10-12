import { SupabaseClient } from "@supabase/supabase-js";
import { RecordedTestAttempt } from "@/types";

/**
 * Reconstructs authentic RecordedTestAttempt[] from public.user_attempts in Supabase.
 * Authoritative single source of truth for student test history directly synced to database.
 */
export async function fetchServerTestAttempts(
  supabase: SupabaseClient,
  userId: string
): Promise<RecordedTestAttempt[]> {
  try {
    const { data: userAttempts, error } = await supabase
      .from("user_attempts")
      .select(`
        id,
        selected_option,
        is_correct,
        time_spent_seconds,
        is_time_sink,
        test_id,
        question_id,
        created_at,
        questions (
          id,
          subject,
          chapter,
          micro_topic,
          ncert_reference,
          correct_option
        ),
        tests (
          id,
          title,
          subject
        )
      `)
      .eq("user_id", userId);

    if (error || !userAttempts || userAttempts.length === 0) {
      return [];
    }

    // Deduplicate by test_id + question_id
    const seenCanonical = new Set<string>();
    const attemptedRows = userAttempts.filter((ua: any) => {
      if (ua.selected_option === null || ua.selected_option === undefined) return false;
      const key = `${ua.test_id || "default"}:::${ua.question_id || ua.id}`;
      if (seenCanonical.has(key)) return false;
      seenCanonical.add(key);
      return true;
    });

    const testGroups = new Map<
      string,
      {
        testId: string;
        testTitle: string;
        subject: string;
        questions: any[];
        submittedAt: string;
      }
    >();

    attemptedRows.forEach((ua: any) => {
      const tId = ua.test_id || "mock-1";
      const q = ua.questions;
      const subject = q?.subject || ua.tests?.subject || "Domain";
      const testTitle = ua.tests?.title || `CUET ${subject} Mock`;

      if (!testGroups.has(tId)) {
        testGroups.set(tId, {
          testId: tId,
          testTitle,
          subject,
          questions: [],
          submittedAt: ua.created_at || new Date().toISOString(),
        });
      }

      const group = testGroups.get(tId)!;
      const isCorrect =
        ua.is_correct === true ||
        ua.is_correct === "true" ||
        ua.is_correct === 1 ||
        (ua.selected_option && q?.correct_option && ua.selected_option === q.correct_option);

      group.questions.push({
        questionId: ua.question_id || ua.id,
        questionNumber: group.questions.length + 1,
        prompt: `Question ${group.questions.length + 1}`,
        subject,
        chapter: q?.chapter || "Domain Core",
        microTopic: q?.micro_topic || "Key Concept",
        selectedOption: ua.selected_option,
        correctOption: q?.correct_option || "A",
        isCorrect: Boolean(isCorrect),
        timeSpentSeconds: ua.time_spent_seconds || 0,
        isTimeSink: Boolean(ua.is_time_sink || (ua.time_spent_seconds && ua.time_spent_seconds > 72)),
      });
    });

    return Array.from(testGroups.values()).map((g) => {
      const correct = g.questions.filter((q) => q.isCorrect).length;
      const attempted = g.questions.length;
      const incorrect = attempted - correct;
      const totalMarks = Math.max(0, correct * 5 - incorrect * 1);
      return {
        id: g.testId,
        userId,
        testId: g.testId,
        testTitle: g.testTitle,
        subject: g.subject,
        totalQuestions: Math.max(50, attempted),
        attemptedCount: attempted,
        unattemptedCount: Math.max(0, 50 - attempted),
        correctCount: correct,
        incorrectCount: incorrect,
        totalMarks,
        maxMarks: 250,
        accuracyPercentage: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
        timeTakenSeconds: g.questions.reduce((sum, q) => sum + (q.timeSpentSeconds || 0), 0),
        timeSinkCount: g.questions.filter((q) => q.isTimeSink).length,
        submittedAt: g.submittedAt,
        questions: g.questions,
      };
    });
  } catch (err) {
    console.warn("fetchServerTestAttempts notice:", err);
    return [];
  }
}
