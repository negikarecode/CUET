import { SupabaseClient } from "@supabase/supabase-js";
import { RecordedTestAttempt } from "@/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveCanonicalTestId } from "@/lib/canonical-tests";

/**
 * Reconstructs authentic RecordedTestAttempt[] from public.user_attempts in Supabase.
 * Authoritative single source of truth for student test history directly synced to database.
 * Requires an authenticated, non-empty userId and queries via privileged admin client
 * to join authoritative question metadata while strictly enforcing user ownership.
 */
export async function fetchServerTestAttempts(
  _supabase: SupabaseClient | null,
  userId: string
): Promise<RecordedTestAttempt[]> {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new Error("[SECURITY FATAL] fetchServerTestAttempts requires a non-empty authenticated userId.");
  }

  try {
    const supabaseAdmin = createAdminClient();
    const { data: userAttempts, error } = await supabaseAdmin
      .from("user_attempts")
      .select(`
        id,
        attempt_id,
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
          correct_option,
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          explanation
        ),
        tests (
          id,
          title,
          subject,
          total_questions
        )
      `)
      .eq("user_id", userId.trim())
      .order("created_at", { ascending: false });

    if (error || !userAttempts || userAttempts.length === 0) {
      return [];
    }

    // Filter valid answered attempts
    const validRows = userAttempts.filter(
      (ua: any) => ua && (ua.selected_option !== null && ua.selected_option !== undefined)
    );

    const testGroups = new Map<
      string,
      {
        attemptId: string;
        testId: string;
        testTitle: string;
        subject: string;
        totalQuestions: number;
        questions: any[];
        submittedAt: string;
        seenQuestionIds: Set<string>;
      }
    >();

    validRows.forEach((ua: any) => {
      // Safely unbox relations whether returned as single object or array
      const q = Array.isArray(ua.questions) ? ua.questions[0] : ua.questions;
      const testObj = Array.isArray(ua.tests) ? ua.tests[0] : ua.tests;

      const tId = ua.test_id || testObj?.id || "mock-1";
      // Group by attempt_id if available, otherwise by test_id + submission timestamp bucket
      const sessionAttemptId = ua.attempt_id
        ? String(ua.attempt_id)
        : `${tId}:::${ua.created_at ? new Date(ua.created_at).toISOString().slice(0, 16) : "default"}`;

      const subject = q?.subject || testObj?.subject || "Domain";
      const testTitle = testObj?.title || `CUET ${subject} Mock`;
      const testTotalQuestions = testObj?.total_questions || 50;

      if (!testGroups.has(sessionAttemptId)) {
        const canonicalSlug = resolveCanonicalTestId(String(tId), String(testTitle), String(subject));
        testGroups.set(sessionAttemptId, {
          attemptId: ua.attempt_id ? String(ua.attempt_id) : sessionAttemptId,
          testId: canonicalSlug || String(tId),
          testTitle: String(testTitle),
          subject: String(subject),
          totalQuestions: Number(testTotalQuestions) || 50,
          questions: [],
          submittedAt: ua.created_at ? new Date(ua.created_at).toISOString() : new Date().toISOString(),
          seenQuestionIds: new Set<string>(),
        });
      }

      const group = testGroups.get(sessionAttemptId)!;
      const qIdentifier = String(ua.question_id || ua.id);

      // Deduplicate questions within the same attempt session
      if (group.seenQuestionIds.has(qIdentifier)) return;
      group.seenQuestionIds.add(qIdentifier);

      const isCorrect =
        ua.is_correct === true ||
        ua.is_correct === "true" ||
        ua.is_correct === 1 ||
        (ua.selected_option && q?.correct_option && ua.selected_option === q.correct_option);

      group.questions.push({
        questionId: qIdentifier,
        questionNumber: group.questions.length + 1,
        prompt: q?.question_text || `Question ${group.questions.length + 1}`,
        subject: group.subject,
        chapter: q?.chapter || "Domain Core",
        microTopic: q?.micro_topic || "Key Concept",
        options: [
          { id: "A", text: q?.option_a || "Option A" },
          { id: "B", text: q?.option_b || "Option B" },
          { id: "C", text: q?.option_c || "Option C" },
          { id: "D", text: q?.option_d || "Option D" },
        ],
        selectedOption: ua.selected_option,
        correctOption: q?.correct_option || "A",
        explanation: q?.explanation || "",
        ncertReference: q?.ncert_reference || "",
        isCorrect: Boolean(isCorrect),
        timeSpentSeconds: Number(ua.time_spent_seconds) || 0,
        isTimeSink: Boolean(ua.is_time_sink || (ua.time_spent_seconds && ua.time_spent_seconds > 72)),
      });
    });

    return Array.from(testGroups.values()).map((g) => {
      const correct = g.questions.filter((q) => q.isCorrect).length;
      const attempted = g.questions.length;
      const incorrect = Math.max(0, attempted - correct);
      const totalMarks = correct * 5 - incorrect * 1;
      const totalQuestions = g.totalQuestions || Math.max(50, attempted);
      const maxMarks = totalQuestions * 5;
      const unattempted = Math.max(0, totalQuestions - attempted);

      return {
        id: g.attemptId || g.testId,
        attemptId: g.attemptId,
        userId,
        testId: g.testId,
        testTitle: g.testTitle,
        subject: g.subject,
        totalQuestions,
        attemptedCount: attempted,
        unattemptedCount: unattempted,
        correctCount: correct,
        incorrectCount: incorrect,
        totalMarks,
        maxMarks,
        accuracyPercentage: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
        timeTakenSeconds: g.questions.reduce((sum, q) => sum + (q.timeSpentSeconds || 0), 0),
        timeSinkCount: g.questions.filter((q) => q.isTimeSink).length,
        submittedAt: g.submittedAt,
        questions: g.questions,
      };
    });
  } catch (err) {
    console.error("[fetchServerTestAttempts Exception]:", err);
    return [];
  }
}
