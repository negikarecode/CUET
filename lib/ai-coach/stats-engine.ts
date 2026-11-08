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
  MistakeTagCounts,
} from "@/types/ai-coach";
import { getMistakeTagCounts } from "@/lib/spaced-repetition";
import {
  getDailyUsageCount,
  getNextMidnightIST,
} from "./quota-engine";
import { resolveCanonicalTopic, getTopicBucket } from "./canonical-topics";
import { computeMarksLost } from "./marks";

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
      .select("id, created_at, questions_analyzed")
      .eq("user_id", userId)
      .ilike("subject", normalized.name)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestReport && (latestReport.questions_analyzed || 0) > 0) {
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
 * Checks whether a question is tagged as easy based on question/attempt metadata
 */
export function isQuestionTaggedEasy(q: any, row?: any): boolean {
  const raw =
    q?.difficulty ??
    row?.difficulty ??
    q?.difficultyLevel ??
    row?.difficultyLevel ??
    row?.diagnostic_report?.difficulty;
  if (typeof raw === "string") {
    const s = raw.trim().toLowerCase();
    return s === "easy" || s === "1";
  }
  if (typeof raw === "number") {
    return raw <= 1;
  }
  const qNum = q?.questionNumber ?? q?.question_number ?? row?.question_number;
  if (typeof qNum === "number" && qNum > 0 && qNum <= 15) {
    return true;
  }
  return false;
}

/**
 * Computes ALL authoritative stats in code for AI Coach:
 * - overall and topic accuracy
 * - attempt rate
 * - net score vs potential score (CUET: +5/-1)
 * - marks lost to wrong answers (negativeMarksLost)
 * - non-time error classification:
 *   * topic accuracy < 40% with 5+ attempts: "concept gap"
 *   * wrong answers on questions tagged easy: "careless"
 *   * skipped questions: "confidence gap"
 *   * right-to-wrong answer changes: "second-guessing"
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

  // 2. Fetch all qualifying attempts in subject (no time-based selection)
  let attemptsQuery = supabaseAdmin
    .from("user_attempts")
    .select(`
      id,
      test_id,
      question_id,
      selected_option,
      is_correct,
      created_at,
      diagnostic_report,
      questions (
        id,
        subject,
        chapter,
        micro_topic,
        is_pyq
      ),
      tests (
        id,
        title,
        subject,
        total_questions
      )
    `)
    .eq("user_id", userId)
    .not("selected_option", "is", null)
    .order("created_at", { ascending: true });

  if (sinceDate) {
    attemptsQuery = attemptsQuery.gt("created_at", sinceDate);
  }

  const { data: rows, error: queryErr } = await attemptsQuery;
  if (queryErr) {
    console.error("[Stats Engine] Error fetching user_attempts:", queryErr.message);
  }

  // Filter to subject rows (using question subject or fallback test subject)
  const subjectRows = (rows || []).filter((r: any) => {
    const q = Array.isArray(r.questions) ? r.questions[0] : r.questions;
    const testObj = Array.isArray(r.tests) ? r.tests[0] : r.tests;
    const qSub = q?.subject || testObj?.subject || "";
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

  // Non-time error type tracking:
  // - Wrong answers on questions tagged easy: "careless"
  // - Right-to-wrong answer changes: "second-guessing"
  let carelessErrors = 0;
  let secondGuessing = 0;

  // Mock vs PYQ tracking
  let mockAttempts = 0;
  let mockCorrect = 0;
  let pyqAttempts = 0;
  let pyqCorrect = 0;

  // Topic grouping by canonical topic ID
  const topicMap = new Map<
    string,
    {
      id: string;
      topic: string;
      chapter?: string;
      attempted: number;
      correct: number;
    }
  >();

  // Track wrong distractors per topic ID for concept confusion diagnosis
  const topicWrongDistractors = new Map<string, Map<string, number>>();

  // Timing tracking (only populated if underlying attempt records contain valid timing)
  const timingValues: number[] = [];
  let wrongAnswersWithTiming = 0;
  let fastWrongCount = 0;

  // Track mistake tags from database rows
  const dbMistakeTagCounts: MistakeTagCounts = {
    didntKnowConcept: 0,
    misread: 0,
    guessed: 0,
    changedAnswer: 0,
  };

  // Session-level test grouping for trend, attempt rate, and skipped questions ("confidence gap")
  const testSessions = new Map<
    string,
    {
      testId: string;
      totalTestQuestions: number;
      attempted: number;
      correct: number;
      optionCounts: Record<string, number>;
      date: string;
    }
  >();

  subjectRows.forEach((row: any) => {
    const q = Array.isArray(row.questions) ? row.questions[0] : row.questions;
    const testObj = Array.isArray(row.tests) ? row.tests[0] : row.tests;
    const testId = row.test_id || "mock-session";
    const qId = String(row.question_id || row.id);
    const isCorrect = Boolean(row.is_correct);

    uniqueQIds.add(qId);

    // Track per-question timing if present
    const rawTime =
      row?.diagnostic_report?.timeSpentSeconds ??
      row?.diagnostic_report?.time_spent ??
      row?.time_spent_seconds ??
      row?.time_spent;
    if (typeof rawTime === "number" && !isNaN(rawTime) && rawTime > 0) {
      timingValues.push(rawTime);
      if (!isCorrect) {
        wrongAnswersWithTiming += 1;
        if (rawTime < 10) {
          fastWrongCount += 1;
        }
      }
    }

    if (isCorrect) {
      correctCount += 1;
    } else {
      incorrectCount += 1;
      // Wrong answers on questions tagged easy: "careless"
      if (isQuestionTaggedEasy(q, row)) {
        carelessErrors += 1;
      }
    }

    // Answer changes: count only when the final submitted answer differs from the first saved answer for that question
    const diag = row?.diagnostic_report;
    const firstSaved = diag?.first_saved_option || diag?.firstSavedOption || row?.first_saved_option;
    const finalSaved = row?.selected_option || diag?.final_option || diag?.finalOption;

    if (firstSaved && finalSaved) {
      if (String(firstSaved).trim().toUpperCase() !== String(finalSaved).trim().toUpperCase()) {
        secondGuessing += 1;
      }
    } else if (
      row?.diagnostic_report?.answer_changed === true ||
      row?.diagnostic_report?.answerChanged === true ||
      row?.diagnostic_report?.right_to_wrong ||
      row?.diagnostic_report?.rightToWrongChange ||
      row?.diagnostic_report?.second_guessing ||
      row?.right_to_wrong ||
      row?.is_second_guess
    ) {
      secondGuessing += 1;
    }

    // Classify Mock vs PYQ
    const testTitle = (testObj?.title || "").toLowerCase();
    const isPyq =
      testId.toLowerCase().includes("pyq") ||
      testTitle.includes("pyq") ||
      Boolean(q?.is_pyq);

    if (isPyq) {
      pyqAttempts += 1;
      if (isCorrect) pyqCorrect += 1;
    } else {
      mockAttempts += 1;
      if (isCorrect) mockCorrect += 1;
    }

    // Canonical Topic Mapping
    const canonicalMeta = resolveCanonicalTopic(normalized.key, q?.chapter, q?.micro_topic);
    const topicKey = canonicalMeta.id;
    const existingTopic = topicMap.get(topicKey) || {
      id: canonicalMeta.id,
      topic: canonicalMeta.name,
      chapter: canonicalMeta.chapter,
      attempted: 0,
      correct: 0,
    };
    existingTopic.attempted += 1;
    if (isCorrect) {
      existingTopic.correct += 1;
    } else if (row.selected_option) {
      const optStr = String(row.selected_option).trim().toUpperCase();
      const currentTopicWrong = topicWrongDistractors.get(topicKey) || new Map<string, number>();
      currentTopicWrong.set(optStr, (currentTopicWrong.get(optStr) || 0) + 1);
      topicWrongDistractors.set(topicKey, currentTopicWrong);
    }
    topicMap.set(topicKey, existingTopic);

    // Mistake tags from row diagnostic report
    const rawTag =
      row?.diagnostic_report?.mistakeTag ||
      row?.diagnostic_report?.tag ||
      row?.diagnostic_report?.mistake_tag;
    if (rawTag) {
      if (rawTag === "Didn't know concept" || rawTag === "concept") dbMistakeTagCounts.didntKnowConcept++;
      else if (rawTag === "Misread" || rawTag === "misread") dbMistakeTagCounts.misread++;
      else if (rawTag === "Guessed" || rawTag === "guessed") dbMistakeTagCounts.guessed++;
      else if (rawTag === "Changed my answer" || rawTag === "changed") dbMistakeTagCounts.changedAnswer++;
    }

    // Test session grouping
    const sessionKey = `${testId}:::${row.created_at ? new Date(row.created_at).toISOString().slice(0, 10) : "default"}`;
    const sess = testSessions.get(sessionKey) || {
      testId,
      totalTestQuestions: testObj?.total_questions || 50,
      attempted: 0,
      correct: 0,
      optionCounts: {} as Record<string, number>,
      date: row.created_at || new Date().toISOString(),
    };
    sess.attempted += 1;
    if (isCorrect) sess.correct += 1;
    if (row.selected_option) {
      const opt = String(row.selected_option).trim().toUpperCase();
      sess.optionCounts[opt] = (sess.optionCounts[opt] || 0) + 1;
    }
    testSessions.set(sessionKey, sess);
  });

  // Check for random answering (one option chosen for >80% of answers, with no skips)
  // or low-signal assessment (accuracy < 12% across completed 50-question mock with zero skips)
  // NEVER exclude attempts from counting - every submitted answer counts toward the 150 unlock and all stats.
  let hasRandomAnswering = false;
  let hasLowSignalAttempt = false;
  testSessions.forEach((s) => {
    if (s.totalTestQuestions > 0 && s.attempted >= s.totalTestQuestions) {
      for (const opt in s.optionCounts) {
        const cnt = s.optionCounts[opt] || 0;
        if (cnt / s.attempted > 0.8) {
          hasRandomAnswering = true;
          hasLowSignalAttempt = true;
          break;
        }
      }
      if (s.totalTestQuestions >= 50 && s.attempted >= 50) {
        const sessionAcc = (s.correct / s.attempted) * 100;
        if (sessionAcc < 12) {
          hasLowSignalAttempt = true;
        }
      }
    }
  });

  const totalAttempts = subjectRows.length;
  const overallAccuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  // Marking logic: +5 for correct, -1 for incorrect
  const marksCalc = computeMarksLost(incorrectCount);
  const netScore = correctCount * AI_COACH_CONFIG.MARKING_SCHEME.CORRECT +
    incorrectCount * AI_COACH_CONFIG.MARKING_SCHEME.INCORRECT;
  const potentialScore = totalAttempts * AI_COACH_CONFIG.MARKING_SCHEME.CORRECT;
  const negativeMarksLost = marksCalc.penaltyMarks;

  // Rule 2: Skipped questions: "confidence gap"
  let confidenceGaps = 0;
  let totalTestQuestionsOffered = 0;
  testSessions.forEach((s) => {
    totalTestQuestionsOffered += s.totalTestQuestions;
    const unattempted = Math.max(0, s.totalTestQuestions - s.attempted);
    confidenceGaps += unattempted;
  });

  const attemptRate =
    totalTestQuestionsOffered > 0
      ? Math.min(100, Math.round((totalAttempts / totalTestQuestionsOffered) * 100))
      : 100;

  const skipped_rate =
    totalTestQuestionsOffered > 0
      ? Math.round((confidenceGaps / totalTestQuestionsOffered) * 1000) / 1000
      : 0;

  // Near-random guessing detection: accuracy <= 32% over >= 50 four-option questions AND skipped_rate < 5%
  const near_random = totalAttempts >= 50 && overallAccuracy <= 32 && skipped_rate < 0.05;

  // Per-question timing metrics (null if underlying telemetry lacks timing)
  const fast_wrong_rate =
    wrongAnswersWithTiming > 0
      ? Math.round((fastWrongCount / wrongAnswersWithTiming) * 1000) / 1000
      : null;

  let median_seconds_per_question: number | null = null;
  if (timingValues.length > 0) {
    const sorted = [...timingValues].sort((a, b) => a - b);
    median_seconds_per_question = Math.round(sorted[Math.floor(sorted.length / 2)]!);
  }

  // Topic breakdown with canonical 4-bucket partition
  const topicBreakdown: TopicStat[] = Array.from(topicMap.values()).map((t) => {
    const topicAccuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0;
    const bucket = getTopicBucket({ attempted: t.attempted, accuracyPercentage: topicAccuracy });

    let classification: "weak" | "strong" | "insufficient data";
    if (bucket === "needs_data") {
      classification = "insufficient data";
    } else if (bucket === "fix") {
      classification = "weak";
    } else {
      classification = "strong";
    }

    const wrongDistractors = topicWrongDistractors.get(t.id);
    let mostCommonWrongOption: string | undefined;
    if (wrongDistractors && wrongDistractors.size > 0) {
      let maxCnt = 0;
      wrongDistractors.forEach((cnt, opt) => {
        if (cnt > maxCnt) {
          maxCnt = cnt;
          mostCommonWrongOption = opt;
        }
      });
    }

    return {
      id: t.id,
      topic: t.topic,
      chapter: t.chapter,
      attempted: t.attempted,
      correct: t.correct,
      accuracyPercentage: topicAccuracy,
      classification,
      bucket,
      mostCommonWrongOption,
    };
  });

  // Rule 2: Topic accuracy < 40% with 5+ attempts in fix bucket: "concept gap"
  // When near_random is true, NEVER claim concept gaps
  const conceptGapTopics = near_random
    ? []
    : topicBreakdown.filter(
        (t) => t.bucket === "fix" && t.accuracyPercentage < 40
      );
  const conceptGaps = conceptGapTopics.reduce((sum, t) => sum + (t.attempted - t.correct), 0);

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
    secondGuessing,
  };

  let localTagCounts: MistakeTagCounts = {
    didntKnowConcept: 0,
    misread: 0,
    guessed: 0,
    changedAnswer: 0,
  };
  try {
    localTagCounts = getMistakeTagCounts(userId);
  } catch {}

  const mergedMistakeTags: MistakeTagCounts = {
    didntKnowConcept: Math.max(dbMistakeTagCounts.didntKnowConcept, localTagCounts.didntKnowConcept),
    misread: Math.max(dbMistakeTagCounts.misread, localTagCounts.misread),
    guessed: Math.max(dbMistakeTagCounts.guessed, localTagCounts.guessed),
    changedAnswer: Math.max(dbMistakeTagCounts.changedAnswer, localTagCounts.changedAnswer),
  };

  const totalRawTags =
    mergedMistakeTags.didntKnowConcept +
    mergedMistakeTags.misread +
    mergedMistakeTags.guessed +
    mergedMistakeTags.changedAnswer;
  const mistake_tags_count = totalRawTags > 0 ? totalRawTags : null;

  let data_quality: "ok" | "thin" | "near_random" | "untagged" = "ok";
  if (near_random) {
    data_quality = "near_random";
  } else if (totalAttempts < 50) {
    data_quality = "thin";
  } else if (mistake_tags_count === null) {
    data_quality = "untagged";
  }

  const insufficientDataTopics = topicBreakdown.filter(
    (t) => t.bucket === "needs_data"
  );

  const computed: AICoachComputedStats = {
    subject: normalized.name,
    totalAttempts,
    uniqueQuestionsAnalyzed: uniqueQIds.size,
    overallAccuracyPercentage: overallAccuracy,
    attemptRate,
    netScore,
    potentialScore,
    negativeMarksLost,
    errorTypes,
    mistakeTags: mergedMistakeTags,
    rightToWrongChanges: secondGuessing,
    mockVsPyqGap,
    recentTrend: {
      recentAccuracies,
      trajectory,
    },
    topicBreakdown,
    insufficient_data_topics: insufficientDataTopics,
    hasRandomAnswering: Boolean(hasRandomAnswering || near_random),
    hasLowSignalAttempt: Boolean(hasLowSignalAttempt || near_random),
    data_quality,
    near_random,
    fast_wrong_rate,
    skipped_rate,
    median_seconds_per_question,
    mistake_tags_count,
    daysToExam: calculateDaysToExam(),
  };

  return {
    stats: computed,
    previousReportStats,
  };
}
