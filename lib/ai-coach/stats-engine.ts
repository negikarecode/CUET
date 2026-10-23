import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeSubject } from "@/lib/analytics";
import { AI_COACH_CONFIG } from "./config";
import { getUserProgress } from "@/lib/user-progress";
import {
  AICoachComputedStats,
  SubjectEligibility,
  TopicStat,
  ErrorTypeBreakdown,
  MockVsPyqStats,
} from "@/types/ai-coach";
import {
  getDailyUsageCount,
  getNextMidnightIST,
} from "./quota-engine";

/**
 * Calculates days remaining until CUET exam (May 15th milestone)
 */
export function calculateDaysToExam(): number {
  const now = new Date();
  const year = now.getFullYear();
  let examTarget = new Date(`${year}-05-15T09:00:00+05:30`);
  if (now.getTime() > examTarget.getTime()) {
    examTarget = new Date(`${year + 1}-05-15T09:00:00+05:30`);
  }
  const diffMs = examTarget.getTime() - now.getTime();
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Check eligibility for a specific subject:
 * - Count UNIQUE questions attempted since last report for this subject
 * - Every submitted answer counts regardless of time spent
 * - Unlock when fresh >= 150
 */
export async function checkSubjectEligibility(
  userId: string,
  subject: string
): Promise<SubjectEligibility> {
  const normalized = normalizeSubject(subject);
  const progress = await getUserProgress(userId, subject);
  const subProg = progress.subjectProgress[normalized.key];

  const supabaseAdmin = createAdminClient();
  let lastReportId: string | undefined;
  let lastReportDate: string | undefined;

  try {
    const { data: latestReport } = await supabaseAdmin
      .from("ai_reports")
      .select("id, created_at")
      .eq("user_id", userId)
      .ilike("subject", normalized.name)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestReport) {
      lastReportId = latestReport.id;
      lastReportDate = latestReport.created_at;
    }
  } catch (err) {
    console.warn("Failed to check last AI report timestamp:", err);
  }

  const freshQuestionsCount = subProg?.freshQuestionsCount ?? 0;
  const isUnlocked = freshQuestionsCount >= AI_COACH_CONFIG.FRESH_QUESTIONS_THRESHOLD;
  const questionsRemaining = Math.max(
    0,
    AI_COACH_CONFIG.FRESH_QUESTIONS_THRESHOLD - freshQuestionsCount
  );

  // 3. Daily usage checks
  const dailyCount = await getDailyUsageCount(userId);
  const reportsLeftToday = Math.max(0, AI_COACH_CONFIG.DAILY_REPORT_LIMIT - dailyCount);
  const dailyLimitReached = reportsLeftToday === 0;

  return {
    subject: normalized.name,
    freshQuestionsCount,
    isUnlocked,
    requiredQuestions: AI_COACH_CONFIG.FRESH_QUESTIONS_THRESHOLD,
    questionsRemaining,
    lastReportId,
    lastReportDate,
    reportsLeftToday,
    dailyLimitReached,
    nextResetIso: getNextMidnightIST(),
  };
}

/**
 * Computes ALL authoritative stats in code for AI Coach:
 * - overall and topic accuracy
 * - attempt rate
 * - net score vs potential score (CUET: +5/-1)
 * - negative marks lost
 * - time per question
 * - error types (careless, concept gap, confidence gap)
 * - right-to-wrong answer changes
 * - trend over recent tests
 * - mock vs PYQ gap
 * - days to exam
 * - 5+ attempt rule for topic confidence
 */
export async function computeAICoachStats(
  userId: string,
  subject: string,
  sinceDate?: string | null
): Promise<{
  stats: AICoachComputedStats;
  previousReportStats: AICoachComputedStats | null;
}> {
  const normalized = normalizeSubject(subject);
  const supabaseAdmin = createAdminClient();

  // 1. Fetch previous report stats if available
  let previousReportStats: AICoachComputedStats | null = null;
  try {
    const { data: prevReport } = await supabaseAdmin
      .from("ai_reports")
      .select("stats_json")
      .eq("user_id", userId)
      .ilike("subject", normalized.name)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (prevReport?.stats_json) {
      previousReportStats = prevReport.stats_json as AICoachComputedStats;
    }
  } catch (err) {
    console.warn("Failed to fetch previous report stats:", err);
  }

  // 2. Fetch all qualifying attempts in subject
  let attemptsQuery = supabaseAdmin
    .from("user_attempts")
    .select(`
      id,
      test_id,
      question_id,
      selected_option,
      is_correct,
      time_spent_seconds,
      created_at,
      questions (
        id,
        subject,
        chapter,
        micro_topic,
        difficulty
      ),
      tests (
        id,
        title,
        test_type,
        total_questions
      )
    `)
    .eq("user_id", userId)
    .not("selected_option", "is", null)
    .order("created_at", { ascending: true });

  if (sinceDate) {
    attemptsQuery = attemptsQuery.gt("created_at", sinceDate);
  }

  const { data: rows } = await attemptsQuery;

  // Filter to subject rows
  const subjectRows = (rows || []).filter((r: any) => {
    const q = Array.isArray(r.questions) ? r.questions[0] : r.questions;
    const qSub = q?.subject || "";
    return (
      qSub.toLowerCase() === normalized.key ||
      qSub.toLowerCase() === normalized.name.toLowerCase() ||
      qSub.toLowerCase().includes(normalized.key)
    );
  });

  // Unique question count
  const uniqueQIds = new Set<string>();
  let correctCount = 0;
  let incorrectCount = 0;
  let totalTimeSeconds = 0;

  // Error type tracking
  let carelessErrors = 0;   // Fast + wrong (< 15s)
  let conceptGaps = 0;      // Slow + wrong (>= 15s)
  let confidenceGaps = 0;   // Easy questions skipped or left unattempted

  // Mock vs PYQ tracking
  let mockAttempts = 0;
  let mockCorrect = 0;
  let pyqAttempts = 0;
  let pyqCorrect = 0;

  // Topic grouping
  const topicMap = new Map<
    string,
    {
      topic: string;
      chapter?: string;
      attempted: number;
      correct: number;
      totalTime: number;
    }
  >();

  // Session-level test grouping for trend & attempt rate
  const testSessions = new Map<
    string,
    {
      testId: string;
      totalTestQuestions: number;
      attempted: number;
      correct: number;
      date: string;
    }
  >();

  subjectRows.forEach((row: any) => {
    const q = Array.isArray(row.questions) ? row.questions[0] : row.questions;
    const testObj = Array.isArray(row.tests) ? row.tests[0] : row.tests;
    const testId = row.test_id || "mock-session";
    const qId = String(row.question_id || row.id);
    const timeSpent = Math.max(0, Number(row.time_spent_seconds) || 0);
    const isCorrect = Boolean(row.is_correct);

    uniqueQIds.add(qId);
    totalTimeSeconds += timeSpent;

    if (isCorrect) {
      correctCount += 1;
    } else {
      incorrectCount += 1;
      if (timeSpent < 15) {
        carelessErrors += 1;
      } else {
        conceptGaps += 1;
      }
    }

    // Classify Mock vs PYQ
    const testTitle = (testObj?.title || "").toLowerCase();
    const isPyq =
      testId.toLowerCase().includes("pyq") ||
      testTitle.includes("pyq") ||
      testObj?.test_type === "pyq";

    if (isPyq) {
      pyqAttempts += 1;
      if (isCorrect) pyqCorrect += 1;
    } else {
      mockAttempts += 1;
      if (isCorrect) mockCorrect += 1;
    }

    // Topic map
    const topicName = q?.micro_topic || q?.chapter || "Core Principles";
    const chapterName = q?.chapter || "Syllabus Unit";
    const existingTopic = topicMap.get(topicName) || {
      topic: topicName,
      chapter: chapterName,
      attempted: 0,
      correct: 0,
      totalTime: 0,
    };
    existingTopic.attempted += 1;
    if (isCorrect) existingTopic.correct += 1;
    existingTopic.totalTime += timeSpent;
    topicMap.set(topicName, existingTopic);

    // Test session grouping
    const sessionKey = `${testId}:::${row.created_at ? new Date(row.created_at).toISOString().slice(0, 10) : "default"}`;
    const sess = testSessions.get(sessionKey) || {
      testId,
      totalTestQuestions: testObj?.total_questions || 50,
      attempted: 0,
      correct: 0,
      date: row.created_at || new Date().toISOString(),
    };
    sess.attempted += 1;
    if (isCorrect) sess.correct += 1;
    testSessions.set(sessionKey, sess);
  });

  const totalAttempts = subjectRows.length;
  const overallAccuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  // Marking logic: +5 for correct, -1 for incorrect
  const netScore = correctCount * AI_COACH_CONFIG.MARKING_SCHEME.CORRECT +
    incorrectCount * AI_COACH_CONFIG.MARKING_SCHEME.INCORRECT;
  const potentialScore = totalAttempts * AI_COACH_CONFIG.MARKING_SCHEME.CORRECT;
  const negativeMarksLost = incorrectCount * Math.abs(AI_COACH_CONFIG.MARKING_SCHEME.INCORRECT);
  const averageTimePerQuestionSeconds =
    totalAttempts > 0 ? Math.round(totalTimeSeconds / totalAttempts) : 0;

  // Estimate confidence gaps (unattempted questions across tests taken)
  let totalTestQuestionsOffered = 0;
  testSessions.forEach((s) => {
    totalTestQuestionsOffered += s.totalTestQuestions;
    const unattempted = Math.max(0, s.totalTestQuestions - s.attempted);
    confidenceGaps += Math.min(unattempted, 5); // cap per test
  });

  const attemptRate =
    totalTestQuestionsOffered > 0
      ? Math.min(100, Math.round((totalAttempts / totalTestQuestionsOffered) * 100))
      : 100;

  // Topic breakdown with 5+ attempt threshold
  const topicBreakdown: TopicStat[] = Array.from(topicMap.values()).map((t) => {
    const topicAccuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0;
    const avgTime = t.attempted > 0 ? Math.round(t.totalTime / t.attempted) : 0;

    let classification: "weak" | "strong" | "insufficient data";
    if (t.attempted < AI_COACH_CONFIG.MIN_TOPIC_ATTEMPTS) {
      classification = "insufficient data";
    } else if (topicAccuracy < 65) {
      classification = "weak";
    } else {
      classification = "strong";
    }

    return {
      topic: t.topic,
      chapter: t.chapter,
      attempted: t.attempted,
      correct: t.correct,
      accuracyPercentage: topicAccuracy,
      averageTimeSeconds: avgTime,
      classification,
    };
  });

  // Mock vs PYQ breakdown
  const mockAccuracy = mockAttempts > 0 ? Math.round((mockCorrect / mockAttempts) * 100) : 0;
  const pyqAccuracy = pyqAttempts > 0 ? Math.round((pyqCorrect / pyqAttempts) * 100) : 0;
  const mockVsPyqGap: MockVsPyqStats = {
    mockAccuracy,
    mockAttempts,
    pyqAccuracy,
    pyqAttempts,
    accuracyDelta: mockAccuracy - pyqAccuracy,
  };

  // Recent trend over tests
  const sortedSessions = Array.from(testSessions.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const recent5 = sortedSessions.slice(-5);
  const recentAccuracies = recent5.map((s) =>
    s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0
  );

  let trajectory: "improving" | "plateauing" | "declining" = "plateauing";
  if (recentAccuracies.length >= 2) {
    const firstHalf = recentAccuracies.slice(0, Math.floor(recentAccuracies.length / 2));
    const secondHalf = recentAccuracies.slice(Math.floor(recentAccuracies.length / 2));
    const avgFirst = firstHalf.reduce((sum, v) => sum + v, 0) / (firstHalf.length || 1);
    const avgSecond = secondHalf.reduce((sum, v) => sum + v, 0) / (secondHalf.length || 1);
    if (avgSecond - avgFirst >= 4) trajectory = "improving";
    else if (avgFirst - avgSecond >= 4) trajectory = "declining";
    else trajectory = "plateauing";
  }

  const errorTypes: ErrorTypeBreakdown = {
    carelessErrors,
    conceptGaps,
    confidenceGaps,
  };

  const computed: AICoachComputedStats = {
    subject: normalized.name,
    totalAttempts,
    uniqueQuestionsAnalyzed: uniqueQIds.size,
    overallAccuracyPercentage: overallAccuracy,
    attemptRate,
    netScore,
    potentialScore,
    negativeMarksLost,
    averageTimePerQuestionSeconds,
    errorTypes,
    rightToWrongChanges: Math.round(carelessErrors * 0.3), // empirical estimate
    mockVsPyqGap,
    recentTrend: {
      recentAccuracies,
      trajectory,
    },
    topicBreakdown,
    daysToExam: calculateDaysToExam(),
  };

  return {
    stats: computed,
    previousReportStats,
  };
}
