import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeSubject } from "@/lib/analytics";
import { resolveCanonicalTestId } from "@/lib/canonical-tests";
import { calculateActiveStreak } from "@/lib/gamification";
import { SUBJECT_MOCK_COUNTS } from "@/lib/data/subjects";
import { RecordedTestAttempt, RecordedQuestionAttempt } from "@/types";

export interface CompletedTestSummary {
  id: string;
  testId: string;
  testTitle: string;
  subject: string;
  subjectKey: string;
  testType: "mock" | "pyq" | "practice";
  mockNumber?: number;
  score: number;
  maxMarks: number;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracyPercentage: number;
  timeTakenSeconds: number;
  submittedAt: string;
  questions?: RecordedQuestionAttempt[];
}

export interface SubjectProgress {
  subject: string;
  subjectKey: string;
  uniqueQuestionsAttempted: number;
  totalAttempts: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracyPercentage: number;
  completedTests: CompletedTestSummary[];
  completedMockNumbers: number[];
  attemptedMocksCount: number;
  totalMocksCount: number;
  peakScore: number | null;
  averageScore: number | null;
  latestScore: number | null;
  latestMock: CompletedTestSummary | null;
  isUnlocked: boolean;
  freshQuestionsCount: number;
  questionsRemainingToUnlock: number;
}

export interface UserProgressChartPoint {
  id: string;
  testId: string;
  mockLabel: string;
  subject: string;
  rawScore: number;
  plottedScore: number;
  maxMarks: number;
  accuracy: number;
  rollingScore: number;
  rollingAccuracy: number;
  submittedAt: string;
}

export interface UserProgress {
  userId: string;
  totalUniqueQuestionsAttempted: number;
  totalAttempts: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallAccuracyPercentage: number;
  activeStreak: number;
  latestMock: CompletedTestSummary | null;
  completedTests: CompletedTestSummary[];
  serverAttempts: RecordedTestAttempt[];
  subjectProgress: Record<string, SubjectProgress>;
  testHistoryForChart: UserProgressChartPoint[];
}

export const UNLOCK_QUESTIONS = 150;

/**
 * Authoritative single source of truth for all user attempt counts,
 * completed tests, scores, streaks, and AI Coach eligibility.
 *
 * Rules:
 * - NO time-based filtering. All answered questions count regardless of time_spent.
 * - Normalized subjects (case-insensitive, canonical slug key).
 * - CUET marking: +5 correct, -1 incorrect, 0 unattempted.
 */
export async function getUserProgress(
  userId: string,
  _filterSubject?: string
): Promise<UserProgress> {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return createEmptyUserProgress(userId || "guest");
  }

  const cleanUserId = userId.trim();
  const supabaseAdmin = createAdminClient();

  // 1. Fetch user profile for streak and settings
  let activeStreak = 0;
  try {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("current_streak, last_practice_date")
      .eq("id", cleanUserId)
      .maybeSingle();

    if (profile) {
      activeStreak = calculateActiveStreak(
        profile.current_streak ?? 0,
        profile.last_practice_date
      );
    }
  } catch (err) {
    console.warn("[getUserProgress] Error fetching profile streak:", err);
  }

  // 2. Fetch all user attempts from database (No time filter!)
  let userAttempts: any[] = [];
  try {
    const { data, error } = await supabaseAdmin
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
          total_questions,
          duration_minutes
        )
      `)
      .eq("user_id", cleanUserId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getUserProgress] Database error fetching user_attempts:", error);
    } else if (data) {
      userAttempts = data;
    }
  } catch (err) {
    console.error("[getUserProgress] Exception fetching user_attempts:", err);
  }

  // 3. Check latest AI reports per subject for AI Coach fresh question cutoff
  const lastReportCutoffBySubject = new Map<string, string>();
  try {
    const { data: reports } = await supabaseAdmin
      .from("ai_reports")
      .select("subject, created_at")
      .eq("user_id", cleanUserId)
      .order("created_at", { ascending: false });

    if (reports && reports.length > 0) {
      reports.forEach((r) => {
        const subKey = normalizeSubject(r.subject || "").key;
        if (!lastReportCutoffBySubject.has(subKey)) {
          lastReportCutoffBySubject.set(subKey, r.created_at);
        }
      });
    }
  } catch {
    // ai_reports table may not exist yet in dev/staging, fallback gracefully
  }

  // 4. Filter answered attempts
  const answeredAttempts = userAttempts.filter(
    (ua) => ua.selected_option !== null && ua.selected_option !== undefined
  );

  // Group attempts into sessions
  const sessionGroups = new Map<
    string,
    {
      sessionId: string;
      testId: string;
      testTitle: string;
      subject: string;
      subjectKey: string;
      totalQuestions: number;
      submittedAt: string;
      questions: RecordedQuestionAttempt[];
      seenQuestionIds: Set<string>;
    }
  >();

  answeredAttempts.forEach((ua) => {
    const q = Array.isArray(ua.questions) ? ua.questions[0] : ua.questions;
    const testObj = Array.isArray(ua.tests) ? ua.tests[0] : ua.tests;
    const rawSubject = q?.subject || testObj?.subject || "Physics";
    const normSub = normalizeSubject(rawSubject);

    const tId = ua.test_id || testObj?.id || "mock-1";
    const timestampBucket = ua.created_at
      ? new Date(ua.created_at).toISOString().slice(0, 16)
      : "default";
    const sessionKey = `${tId}:::${timestampBucket}`;

    const testTitle = testObj?.title || `CUET ${normSub.name} Mock`;
    const totalQuestions = testObj?.total_questions || 50;

    if (!sessionGroups.has(sessionKey)) {
      const canonicalSlug = resolveCanonicalTestId(String(tId), String(testTitle), normSub.name);
      sessionGroups.set(sessionKey, {
        sessionId: sessionKey,
        testId: canonicalSlug || String(tId),
        testTitle: String(testTitle),
        subject: normSub.name,
        subjectKey: normSub.key,
        totalQuestions: Number(totalQuestions) || 50,
        submittedAt: ua.created_at ? new Date(ua.created_at).toISOString() : new Date().toISOString(),
        questions: [],
        seenQuestionIds: new Set<string>(),
      });
    }

    const group = sessionGroups.get(sessionKey)!;
    const qIdentifier = String(ua.question_id || ua.id);

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
      subject: normSub.name,
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

  // Reconstruct completed test objects and server attempts
  const completedTests: CompletedTestSummary[] = [];
  const serverAttempts: RecordedTestAttempt[] = [];

  sessionGroups.forEach((g) => {
    const correctCount = g.questions.filter((q) => q.isCorrect).length;
    const attemptedCount = g.questions.length;
    const incorrectCount = Math.max(0, attemptedCount - correctCount);
    const score = correctCount * 5 - incorrectCount * 1;
    const totalQuestions = g.totalQuestions || Math.max(50, attemptedCount);
    const unattemptedCount = Math.max(0, totalQuestions - attemptedCount);
    const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const timeTakenSeconds = g.questions.reduce((sum, q) => sum + (q.timeSpentSeconds || 0), 0);

    // Determine test type and mock number
    const tIdLow = g.testId.toLowerCase();
    const titleLow = g.testTitle.toLowerCase();
    const isPyq = tIdLow.includes("pyq") || titleLow.includes("pyq") || titleLow.includes("past paper");
    const isPractice = tIdLow.includes("practice") || titleLow.includes("practice") || tIdLow.includes("repair");
    const testType = isPyq ? "pyq" : isPractice ? "practice" : "mock";

    let mockNumber: number | undefined;
    if (testType === "mock") {
      const match =
        tIdLow.match(/(?:mock|paper)[-_]?(\d+)/i) ||
        tIdLow.match(/-(\d+)$/) ||
        titleLow.match(/\bmock(?:\s+paper|\s+test|\s+exam)?\s+(\d+)\b/i) ||
        titleLow.match(/\bpaper\s+(\d+)\b/i);
      if (match && match[1]) {
        mockNumber = parseInt(match[1], 10);
      }
    }

    const completedSummary: CompletedTestSummary = {
      id: g.sessionId,
      testId: g.testId,
      testTitle: g.testTitle,
      subject: g.subject,
      subjectKey: g.subjectKey,
      testType,
      mockNumber,
      score,
      maxMarks: totalQuestions * 5,
      totalQuestions,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracyPercentage,
      timeTakenSeconds,
      submittedAt: g.submittedAt,
      questions: g.questions,
    };

    completedTests.push(completedSummary);

    serverAttempts.push({
      id: g.sessionId,
      attemptId: g.sessionId,
      userId: cleanUserId,
      testId: g.testId,
      testTitle: g.testTitle,
      subject: g.subject,
      totalQuestions,
      attemptedCount,
      unattemptedCount,
      correctCount,
      incorrectCount,
      totalMarks: score,
      maxMarks: totalQuestions * 5,
      accuracyPercentage,
      timeTakenSeconds,
      timeSinkCount: g.questions.filter((q) => q.isTimeSink).length,
      submittedAt: g.submittedAt,
      questions: g.questions,
    });
  });

  // Sort completed tests newest first
  completedTests.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
  serverAttempts.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  // Group metrics by subject
  const subjectProgressMap: Record<string, SubjectProgress> = {};
  const globalUniqueQIds = new Set<string>();

  answeredAttempts.forEach((ua) => {
    const q = Array.isArray(ua.questions) ? ua.questions[0] : ua.questions;
    const testObj = Array.isArray(ua.tests) ? ua.tests[0] : ua.tests;
    const rawSub = q?.subject || testObj?.subject || "Physics";
    const norm = normalizeSubject(rawSub);
    const subKey = norm.key;

    if (q?.id || ua.question_id) {
      globalUniqueQIds.add(String(q?.id || ua.question_id));
    }

    if (!subjectProgressMap[subKey]) {
      const subjectTests = completedTests.filter((t) => t.subjectKey === subKey);
      const mockNumbersSet = new Set<number>();
      subjectTests.forEach((t) => {
        if (t.testType === "mock" && t.mockNumber !== undefined) {
          mockNumbersSet.add(t.mockNumber);
        }
      });
      const completedMockNumbers = Array.from(mockNumbersSet).sort((a, b) => a - b);
      const totalMocksCount = SUBJECT_MOCK_COUNTS[subKey] ?? 50;

      const mockScores = subjectTests
        .filter((t) => t.testType === "mock")
        .map((t) => t.score);
      const peakScore = mockScores.length > 0 ? Math.max(...mockScores) : null;
      const averageScore =
        mockScores.length > 0
          ? Math.round(mockScores.reduce((sum, s) => sum + s, 0) / mockScores.length)
          : null;
      const latestMock = subjectTests.find((t) => t.testType === "mock") || null;

      subjectProgressMap[subKey] = {
        subject: norm.name,
        subjectKey: subKey,
        uniqueQuestionsAttempted: 0,
        totalAttempts: 0,
        correctCount: 0,
        incorrectCount: 0,
        unattemptedCount: 0,
        accuracyPercentage: 0,
        completedTests: subjectTests,
        completedMockNumbers,
        attemptedMocksCount: completedMockNumbers.length,
        totalMocksCount,
        peakScore,
        averageScore,
        latestScore: latestMock ? latestMock.score : null,
        latestMock,
        isUnlocked: false,
        freshQuestionsCount: 0,
        questionsRemainingToUnlock: UNLOCK_QUESTIONS,
      };
    }

    const subProg = subjectProgressMap[subKey]!;
    subProg.totalAttempts += 1;

    const isMatch =
      ua.is_correct === true ||
      ua.is_correct === "true" ||
      ua.is_correct === 1 ||
      (ua.selected_option && q?.correct_option && ua.selected_option === q.correct_option);

    if (isMatch) subProg.correctCount += 1;
    else subProg.incorrectCount += 1;
  });

  // Calculate unique questions per subject & AI fresh count
  Object.keys(subjectProgressMap).forEach((subKey) => {
    const prog = subjectProgressMap[subKey]!;
    const subjectQIds = new Set<string>();
    const freshQIds = new Set<string>();
    const cutoff = lastReportCutoffBySubject.get(subKey);

    answeredAttempts.forEach((ua) => {
      const q = Array.isArray(ua.questions) ? ua.questions[0] : ua.questions;
      const testObj = Array.isArray(ua.tests) ? ua.tests[0] : ua.tests;
      const rawSub = q?.subject || testObj?.subject || "Physics";
      if (normalizeSubject(rawSub).key !== subKey) return;

      const qId = String(q?.id || ua.question_id || ua.id);
      subjectQIds.add(qId);

      if (!cutoff || (ua.created_at && new Date(ua.created_at) > new Date(cutoff))) {
        freshQIds.add(qId);
      }
    });

    prog.uniqueQuestionsAttempted = subjectQIds.size;
    prog.freshQuestionsCount = freshQIds.size;
    prog.isUnlocked = prog.freshQuestionsCount >= UNLOCK_QUESTIONS;
    prog.questionsRemainingToUnlock = Math.max(0, UNLOCK_QUESTIONS - prog.freshQuestionsCount);
    prog.accuracyPercentage =
      prog.totalAttempts > 0
        ? Math.round((prog.correctCount / prog.totalAttempts) * 100)
        : 0;
  });

  // Overall metrics
  const totalAttempts = answeredAttempts.length;
  const totalCorrect = answeredAttempts.filter(
    (ua) =>
      ua.is_correct === true ||
      ua.is_correct === "true" ||
      ua.is_correct === 1 ||
      (ua.selected_option && ua.questions?.correct_option && ua.selected_option === ua.questions.correct_option)
  ).length;
  const totalIncorrect = Math.max(0, totalAttempts - totalCorrect);
  const overallAccuracyPercentage =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  const latestMock = completedTests.find((t) => t.testType === "mock") || null;

  // Construct chart trend history (chronological oldest to newest)
  const chronologicalMocks = [...completedTests]
    .filter((t) => t.testType === "mock")
    .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());

  const testHistoryForChart: UserProgressChartPoint[] = chronologicalMocks.map(
    (att, idx) => {
      const rawScore = att.score;
      const accuracy = att.accuracyPercentage;
      const plottedScore = Math.max(0, rawScore);

      // 5-mock rolling average
      const windowStart = Math.max(0, idx - 4);
      const windowSlice = chronologicalMocks.slice(windowStart, idx + 1);
      const avgScore =
        windowSlice.reduce((sum, item) => sum + Math.max(0, item.score), 0) /
        windowSlice.length;
      const avgAccuracy =
        windowSlice.reduce((sum, item) => sum + item.accuracyPercentage, 0) /
        windowSlice.length;

      return {
        id: att.id || `mock-${idx + 1}`,
        testId: att.testId,
        mockLabel: att.mockNumber ? `Mock ${att.mockNumber}` : `Mock ${idx + 1}`,
        subject: att.subject,
        rawScore,
        plottedScore,
        maxMarks: att.maxMarks,
        accuracy,
        rollingScore: Math.round(avgScore * 10) / 10,
        rollingAccuracy: Math.round(avgAccuracy * 10) / 10,
        submittedAt: att.submittedAt,
      };
    }
  );

  return {
    userId: cleanUserId,
    totalUniqueQuestionsAttempted: globalUniqueQIds.size,
    totalAttempts,
    totalCorrect,
    totalIncorrect,
    overallAccuracyPercentage,
    activeStreak,
    latestMock,
    completedTests,
    serverAttempts,
    subjectProgress: subjectProgressMap,
    testHistoryForChart,
  };
}

function createEmptyUserProgress(userId: string): UserProgress {
  return {
    userId,
    totalUniqueQuestionsAttempted: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    overallAccuracyPercentage: 0,
    activeStreak: 0,
    latestMock: null,
    completedTests: [],
    serverAttempts: [],
    subjectProgress: {},
    testHistoryForChart: [],
  };
}
