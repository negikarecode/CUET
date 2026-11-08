import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUserProgress, SubjectProgress } from "@/lib/user-progress";
import { getCollegeCutoffInfo, calculateCollegeReadiness } from "@/lib/college-benchmarks";
import { computeMarksLost } from "@/lib/ai-coach/marks";

export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, any>;
      required: string[];
    };
  };
}

export const CHAT_TOOLS_DEFINITIONS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "get_performance_summary",
      description:
        "Get candidate's overall CUET preparation summary including total attempts, accuracy, streak, target college, and data-quality metrics (near_chance, attempts_count, skipped_rate, median_seconds_per_question, mistake_tags_count, fast_wrong_rate, data_quality).",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_weak_topics",
      description:
        "Retrieve topics where accuracy is below 60% with at least 5 attempts (sufficient data). Topics with fewer than 5 attempts are strictly reported as insufficient data. Includes data_quality fields.",
      parameters: {
        type: "object",
        properties: {
          subject: {
            type: "string",
            description: "Optional subject filter, e.g. 'Physics', 'Accountancy', 'Economics', 'Mathematics'.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_strong_topics",
      description:
        "Retrieve topics where accuracy is 75% or higher with at least 5 attempts.",
      parameters: {
        type: "object",
        properties: {
          subject: {
            type: "string",
            description: "Optional subject filter, e.g. 'Physics', 'Chemistry', 'Business Studies'.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_recent_attempts",
      description:
        "List candidate's recent mock tests or practice sessions with scores, accuracy, and dates.",
      parameters: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of recent attempts to retrieve (1 to 10, default 5).",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_attempt_review",
      description:
        "Get detailed diagnostic analysis of a specific completed mock test or practice attempt, including marks gained, marks lost to negative marking, and missed topics.",
      parameters: {
        type: "object",
        properties: {
          testId: {
            type: "string",
            description: "The ID of the test or mock attempt to review.",
          },
        },
        required: ["testId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_question_review",
      description:
        "Review a specific question attempted by the candidate: question stem, student answer, correct answer, NCERT explanation, and misconception diagnosis.",
      parameters: {
        type: "object",
        properties: {
          questionId: {
            type: "string",
            description: "The unique question ID.",
          },
        },
        required: ["questionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_behavior_patterns",
      description:
        "Analyze exam behavioral patterns: guessing patterns, data quality awareness, pacing leaks, trap option susceptibility, and time sinks.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_college_gap",
      description:
        "Calculate the cutoff points gap between candidate's current score projection and target college cutoff (e.g. SRCC, St. Stephen's, Hindu, LSR).",
      parameters: {
        type: "object",
        properties: {
          collegeName: {
            type: "string",
            description: "Optional college name. If omitted, uses candidate's configured target college.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_study_plan",
      description:
        "Generate a structured multi-day study and practice plan focused on fixing the student's biggest accuracy leaks.",
      parameters: {
        type: "object",
        properties: {
          days: {
            type: "number",
            description: "Number of days in the plan (default 7).",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "suggest_actions",
      description:
        "Suggest up to 3 immediate high-leverage action chips for the student (e.g. 'Fix Magnetism (10 Qs)', 'Review last mock').",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];

export interface DataQualityMetrics {
  attempts_count: number;
  skipped_rate: number;
  median_seconds_per_question: number | null | "unknown";
  mistake_tags_count: number | "unknown";
  near_chance: boolean;
  fast_wrong_rate: number | "unknown";
  data_quality: "ok" | "thin" | "near_random" | "untagged";
  hasTimingData: boolean;
  hasTagData: boolean;
}

/**
 * Computes authoritative data-quality metrics across attempts.
 * Zero counts are returned as "unknown" when underlying data could not have produced them.
 */
export function computeDataQualityMetrics(
  attempts: any[],
  completedTests: any[] = []
): DataQualityMetrics {
  const attempts_count = attempts.length;

  // 1. Skipped Rate:
  let skipped_rate = 0;
  const totalQuestionsInTests = completedTests.reduce(
    (sum, t) => sum + (Number(t.totalQuestions) || 0),
    0
  );
  const totalUnattemptedInTests = completedTests.reduce(
    (sum, t) => sum + (Number(t.unattemptedCount) || 0),
    0
  );

  if (totalQuestionsInTests > 0) {
    skipped_rate = Math.round((totalUnattemptedInTests / totalQuestionsInTests) * 1000) / 1000;
  } else if (attempts_count > 0) {
    const unattempted = attempts.filter(
      (a) => a.selected_option === null || a.selected_option === "" || a.selected_option === undefined
    ).length;
    skipped_rate = Math.round((unattempted / attempts_count) * 1000) / 1000;
  }

  // 2. Timing metrics:
  // Check if positive time_spent_seconds values exist in underlying data
  const timingValues = attempts
    .map((a) => a.time_spent_seconds)
    .filter((t): t is number => typeof t === "number" && !isNaN(t) && t > 0);

  const hasTimingData = timingValues.length > 0;
  let median_seconds_per_question: number | "unknown" = "unknown";
  if (hasTimingData) {
    const sorted = [...timingValues].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    median_seconds_per_question =
      sorted.length % 2 !== 0 ? sorted[mid]! : Math.round((sorted[mid - 1]! + sorted[mid]!) / 2);
  }

  // 3. Mistake tags count (how many wrong answers the student tagged themselves):
  const wrongAttempts = attempts.filter(
    (a) => a.is_correct === false || (!a.is_correct && a.selected_option !== null && a.selected_option !== "")
  );

  const taggedAttempts = wrongAttempts.filter((a) => {
    const diag = a.diagnostic_report;
    return !!diag?.mistakeTag || !!diag?.userTag;
  });

  const hasTagData = taggedAttempts.length > 0;
  const mistake_tags_count: number | "unknown" = hasTagData ? taggedAttempts.length : "unknown";

  // 4. Fast wrong rate (share of wrong answers answered in under 10 seconds):
  let fast_wrong_rate: number | "unknown" = "unknown";
  if (hasTimingData) {
    if (wrongAttempts.length === 0) {
      fast_wrong_rate = 0;
    } else {
      const fastWrong = wrongAttempts.filter(
        (a) => typeof a.time_spent_seconds === "number" && a.time_spent_seconds > 0 && a.time_spent_seconds < 10
      ).length;
      fast_wrong_rate = Math.round((fastWrong / wrongAttempts.length) * 100) / 100;
    }
  }

  // 5. Accuracy & Near Chance calculation:
  // near_chance is true when accuracy <= 32% over >= 50 four-option questions AND skipped_rate < 5%
  const correctCount = attempts.filter((a) => a.is_correct === true).length;
  const accuracyFraction = attempts_count > 0 ? correctCount / attempts_count : 0;
  const accuracyPercent = Math.round(accuracyFraction * 100);

  const near_chance = attempts_count >= 50 && accuracyPercent <= 32 && skipped_rate < 0.05;

  // 6. Data Quality classification: "ok" | "thin" | "near_random" | "untagged"
  let data_quality: "ok" | "thin" | "near_random" | "untagged" = "ok";
  if (near_chance) {
    data_quality = "near_random";
  } else if (attempts_count < 15) {
    data_quality = "thin";
  } else if (!hasTagData) {
    data_quality = "untagged";
  } else {
    data_quality = "ok";
  }

  return {
    attempts_count,
    skipped_rate,
    median_seconds_per_question,
    mistake_tags_count,
    near_chance,
    fast_wrong_rate,
    data_quality,
    hasTimingData,
    hasTagData,
  };
}

/**
 * Safe User-Scoped Tool Dispatcher
 * The user_id is injected exclusively by server auth session, NEVER from client or model arguments.
 */
export async function executeChatTool(
  toolName: string,
  args: Record<string, any>,
  userId: string
): Promise<string> {
  try {
    let result: any;

    switch (toolName) {
      case "get_performance_summary":
        result = await getPerformanceSummary(userId);
        break;
      case "get_weak_topics":
        result = await getWeakTopics(userId, args?.subject);
        break;
      case "get_strong_topics":
        result = await getStrongTopics(userId, args?.subject);
        break;
      case "list_recent_attempts":
        result = await listRecentAttempts(userId, args?.limit);
        break;
      case "get_attempt_review":
        result = await getAttemptReview(userId, args?.testId);
        break;
      case "get_question_review":
        result = await getQuestionReview(userId, args?.questionId);
        break;
      case "get_behavior_patterns":
        result = await getBehaviorPatterns(userId);
        break;
      case "get_college_gap":
        result = await getCollegeGap(userId, args?.collegeName);
        break;
      case "get_study_plan":
        result = await getStudyPlan(userId, args?.days);
        break;
      case "suggest_actions":
        result = await suggestActions(userId);
        break;
      default:
        result = { error: `Unrecognized tool: ${toolName}` };
    }

    return `<tool_data>\n${JSON.stringify(result, null, 2)}\n</tool_data>`;
  } catch (err: any) {
    return `<tool_data>\n{"error": "Failed to execute ${toolName}: ${err?.message || "Unknown error"}"}\n</tool_data>`;
  }
}

// ---------------------------------------------------------------------------
// 1. Performance Summary
// ---------------------------------------------------------------------------
async function getPerformanceSummary(userId: string) {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("target_stream, target_university, target_college, target_course, selected_subjects, current_streak, xp, campus_coins")
    .eq("id", userId)
    .maybeSingle();

  const progress = await getUserProgress(userId);

  const { data: rawAttempts } = await supabaseAdmin
    .from("user_attempts")
    .select("id, is_correct, selected_option, time_spent_seconds, diagnostic_report")
    .eq("user_id", userId);

  const attempts = rawAttempts || [];
  const metrics = computeDataQualityMetrics(attempts, progress.completedTests || []);

  if (progress.totalAttempts === 0 && attempts.length === 0) {
    return {
      hasData: false,
      data_quality: "thin",
      attempts_count: 0,
      skipped_rate: 0,
      median_seconds_per_question: "unknown",
      mistake_tags_count: "unknown",
      near_chance: false,
      fast_wrong_rate: "unknown",
      message: "No mock tests or practice questions completed yet.",
      profile: {
        targetStream: profile?.target_stream || "General",
        targetCollege: profile?.target_college || "Central University",
        targetCourse: profile?.target_course || "Undergraduate Program",
        selectedSubjects: profile?.selected_subjects || [],
      },
      recommendation: "Take your first 50-question diagnostic mock test to establish your baseline score.",
    };
  }

  const subjectSummary = Object.values(progress.subjectProgress || {}).map((s: SubjectProgress) => ({
    subject: s.subject,
    accuracy: `${s.accuracyPercentage}%`,
    totalAttempts: s.totalAttempts,
    completedMocks: s.completedMockNumbers.length,
    latestScore: s.latestScore,
    peakScore: s.peakScore,
  }));

  return {
    hasData: true,
    data_quality: metrics.data_quality,
    attempts_count: metrics.attempts_count,
    skipped_rate: metrics.skipped_rate,
    median_seconds_per_question: metrics.median_seconds_per_question,
    mistake_tags_count: metrics.mistake_tags_count,
    near_chance: metrics.near_chance,
    fast_wrong_rate: metrics.fast_wrong_rate,
    targetStream: profile?.target_stream || "General",
    targetUniversity: profile?.target_university || "Delhi University",
    targetCollege: profile?.target_college || "SRCC",
    targetCourse: profile?.target_course || "Undergraduate Program",
    dailyStreak: progress.activeStreak,
    totalAttempts: progress.totalAttempts || metrics.attempts_count,
    totalCorrect: progress.totalCorrect,
    overallAccuracy: `${progress.overallAccuracyPercentage}%`,
    subjects: subjectSummary,
  };
}

// ---------------------------------------------------------------------------
// 2. Weak Topics (Accuracy < 60%, Min 5 Attempts)
// ---------------------------------------------------------------------------
async function getWeakTopics(userId: string, subjectFilter?: string) {
  const { data: attempts } = await supabaseAdmin
    .from("user_attempts")
    .select("question_id, is_correct, selected_option, time_spent_seconds, diagnostic_report")
    .eq("user_id", userId);

  if (!attempts || attempts.length === 0) {
    return {
      hasData: false,
      data_quality: "thin",
      attempts_count: 0,
      skipped_rate: 0,
      median_seconds_per_question: "unknown",
      mistake_tags_count: "unknown",
      near_chance: false,
      fast_wrong_rate: "unknown",
      message: "Zero attempts recorded. Cannot evaluate weak topics yet.",
    };
  }

  const metrics = computeDataQualityMetrics(attempts);

  const questionIds = Array.from(new Set(attempts.map((a) => a.question_id)));
  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id, subject, micro_topic, chapter")
    .in("id", questionIds);

  const questionMetaMap = new Map<string, { subject: string; topic: string }>();
  for (const q of questions || []) {
    questionMetaMap.set(q.id, {
      subject: q.subject,
      topic: q.micro_topic || q.chapter || "General",
    });
  }

  const topicStats: Record<string, { subject: string; correct: number; total: number }> = {};

  for (const att of attempts) {
    const meta = questionMetaMap.get(att.question_id);
    if (!meta) continue;
    if (subjectFilter && meta.subject.toLowerCase() !== subjectFilter.toLowerCase()) continue;

    const key = `${meta.subject} - ${meta.topic}`;
    if (!topicStats[key]) {
      topicStats[key] = { subject: meta.subject, correct: 0, total: 0 };
    }
    topicStats[key].total += 1;
    if (att.is_correct) topicStats[key].correct += 1;
  }

  const weakTopics: any[] = [];
  const insufficientDataTopics: any[] = [];

  for (const [topicKey, stats] of Object.entries(topicStats)) {
    const acc = Math.round((stats.correct / stats.total) * 100);
    if (stats.total < 5) {
      // Hard invariant: Under 5 attempts CANNOT be called a weak topic
      insufficientDataTopics.push({
        topic: topicKey,
        attempts: stats.total,
        status: "Need at least 5 questions to calibrate",
      });
    } else if (acc < 60) {
      weakTopics.push({
        topic: topicKey,
        subject: stats.subject,
        accuracy: `${acc}%`,
        attempts: stats.total,
        marksLostEstimate: (stats.total - stats.correct) * 6, // 5 lost + 1 penalty
        fixAction: `Fix ${topicKey} (10 Qs)`,
      });
    }
  }

  weakTopics.sort((a, b) => parseInt(a.accuracy) - parseInt(b.accuracy));

  return {
    hasData: true,
    data_quality: metrics.data_quality,
    attempts_count: metrics.attempts_count,
    skipped_rate: metrics.skipped_rate,
    median_seconds_per_question: metrics.median_seconds_per_question,
    mistake_tags_count: metrics.mistake_tags_count,
    near_chance: metrics.near_chance,
    fast_wrong_rate: metrics.fast_wrong_rate,
    near_chance_note: metrics.near_chance
      ? "Overall accuracy is near random chance (<= 32% over 50+ Qs). Accuracy across topics reflects guessing rather than localized concept gaps."
      : undefined,
    weakTopicsCount: weakTopics.length,
    weakTopics,
    insufficientDataTopics: insufficientDataTopics.slice(0, 5),
  };
}

// ---------------------------------------------------------------------------
// 3. Strong Topics (Accuracy >= 75%, Min 5 Attempts)
// ---------------------------------------------------------------------------
async function getStrongTopics(userId: string, subjectFilter?: string) {
  const { data: attempts } = await supabaseAdmin
    .from("user_attempts")
    .select("question_id, is_correct")
    .eq("user_id", userId);

  if (!attempts || attempts.length === 0) {
    return {
      hasData: false,
      message: "Zero attempts recorded. Cannot evaluate strong topics yet.",
    };
  }

  const questionIds = Array.from(new Set(attempts.map((a) => a.question_id)));
  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id, subject, micro_topic, chapter")
    .in("id", questionIds);

  const questionMetaMap = new Map<string, { subject: string; topic: string }>();
  for (const q of questions || []) {
    questionMetaMap.set(q.id, {
      subject: q.subject,
      topic: q.micro_topic || q.chapter || "General",
    });
  }

  const topicStats: Record<string, { subject: string; correct: number; total: number }> = {};

  for (const att of attempts) {
    const meta = questionMetaMap.get(att.question_id);
    if (!meta) continue;
    if (subjectFilter && meta.subject.toLowerCase() !== subjectFilter.toLowerCase()) continue;

    const key = `${meta.subject} - ${meta.topic}`;
    if (!topicStats[key]) {
      topicStats[key] = { subject: meta.subject, correct: 0, total: 0 };
    }
    topicStats[key].total += 1;
    if (att.is_correct) topicStats[key].correct += 1;
  }

  const strongTopics: any[] = [];
  for (const [topicKey, stats] of Object.entries(topicStats)) {
    if (stats.total >= 5) {
      const acc = Math.round((stats.correct / stats.total) * 100);
      if (acc >= 75) {
        strongTopics.push({
          topic: topicKey,
          subject: stats.subject,
          accuracy: `${acc}%`,
          attempts: stats.total,
        });
      }
    }
  }

  strongTopics.sort((a, b) => parseInt(b.accuracy) - parseInt(a.accuracy));

  return {
    hasData: true,
    strongTopicsCount: strongTopics.length,
    strongTopics,
  };
}

// ---------------------------------------------------------------------------
// 4. List Recent Attempts
// ---------------------------------------------------------------------------
async function listRecentAttempts(userId: string, limit = 5) {
  const cappedLimit = Math.min(Math.max(1, limit || 5), 10);
  const progress = await getUserProgress(userId);

  if (progress.completedTests.length === 0) {
    return {
      hasData: false,
      message: "No test attempts completed yet.",
    };
  }

  const recent = progress.completedTests.slice(0, cappedLimit).map((t) => ({
    testId: t.testId,
    title: t.testTitle,
    subject: t.subject,
    type: t.testType,
    score: `${t.score} / ${t.maxMarks}`,
    accuracy: `${t.accuracyPercentage}%`,
    correct: t.correctCount,
    incorrect: t.incorrectCount,
    unattempted: t.unattemptedCount,
    submittedAt: t.submittedAt,
  }));

  return {
    hasData: true,
    count: recent.length,
    attempts: recent,
  };
}

// ---------------------------------------------------------------------------
// 5. Get Attempt Review
// ---------------------------------------------------------------------------
async function getAttemptReview(userId: string, testId: string) {
  if (!testId) {
    return { error: "testId is required." };
  }

  const { data: attempts } = await supabaseAdmin
    .from("user_attempts")
    .select("question_id, selected_option, is_correct, time_spent_seconds, is_time_sink, diagnostic_report, created_at")
    .eq("user_id", userId)
    .eq("test_id", testId);

  if (!attempts || attempts.length === 0) {
    return {
      hasData: false,
      message: `No attempt records found for test ID: ${testId}.`,
    };
  }

  const correct = attempts.filter((a) => a.is_correct).length;
  const incorrect = attempts.filter((a) => !a.is_correct && a.selected_option !== null && a.selected_option !== "").length;
  const netScore = correct * 5 - incorrect * 1;
  const marksCalc = computeMarksLost(incorrect);
  const marksLostToNegative = marksCalc.penaltyMarks;
  const marksLostToOmissionOrError = marksCalc.missedMarks;

  return {
    hasData: true,
    testId,
    totalAnswered: attempts.length,
    correctCount: correct,
    incorrectCount: incorrect,
    netScore,
    marksLostToNegative,
    potentialScoreIfCorrect: netScore + marksLostToOmissionOrError,
    missedQuestions: attempts
      .filter((a) => !a.is_correct)
      .slice(0, 5)
      .map((a) => ({
        questionId: a.question_id,
        selectedOption: a.selected_option,
        timeSpentSeconds: a.time_spent_seconds ?? "unknown",
        isTimeSink: a.is_time_sink,
        classification: a.diagnostic_report?.errorClassification || "Concept or Slip",
      })),
  };
}

// ---------------------------------------------------------------------------
// 6. Get Question Review
// ---------------------------------------------------------------------------
async function getQuestionReview(userId: string, questionId: string) {
  if (!questionId) {
    return { error: "questionId is required." };
  }

  const { data: attempt } = await supabaseAdmin
    .from("user_attempts")
    .select("selected_option, is_correct, time_spent_seconds, diagnostic_report")
    .eq("user_id", userId)
    .eq("question_id", questionId)
    .maybeSingle();

  const { data: question } = await supabaseAdmin
    .from("questions")
    .select("id, question_text, options, correct_option, explanation, subject, micro_topic")
    .eq("id", questionId)
    .maybeSingle();

  if (!question) {
    return { error: `Question with ID ${questionId} not found.` };
  }

  return {
    questionId,
    subject: question.subject,
    topic: question.micro_topic || "General",
    questionText: question.question_text,
    options: question.options,
    correctOption: question.correct_option,
    candidateAnswer: attempt ? attempt.selected_option : "Not attempted by user",
    isCorrect: attempt ? attempt.is_correct : null,
    explanation: question.explanation,
    diagnosticMisconception: attempt?.diagnostic_report?.diagnosisMessage || "Review NCERT formula and definitions.",
  };
}

// ---------------------------------------------------------------------------
// 7. Behavioral Patterns
// ---------------------------------------------------------------------------
async function getBehaviorPatterns(userId: string) {
  const { data: attempts } = await supabaseAdmin
    .from("user_attempts")
    .select("id, question_id, is_correct, is_time_sink, diagnostic_report, selected_option, time_spent_seconds")
    .eq("user_id", userId);

  if (!attempts || attempts.length === 0) {
    return {
      hasData: false,
      data_quality: "thin",
      attempts_count: 0,
      skipped_rate: 0,
      median_seconds_per_question: "unknown",
      mistake_tags_count: "unknown",
      near_chance: false,
      fast_wrong_rate: "unknown",
      time_sink_count: "unknown",
      message: "Need test attempts to evaluate behavioral patterns.",
    };
  }

  const metrics = computeDataQualityMetrics(attempts);

  // Time sink calculations
  let timeSinks: number | "unknown" = "unknown";
  let timeSinkObservation = "";

  if (!metrics.hasTimingData) {
    timeSinks = "unknown";
    timeSinkObservation = "Per-question timing data is unknown as question durations were not recorded. Question pacing cannot be determined.";
  } else if (metrics.near_chance) {
    timeSinks = attempts.filter((a) => a.is_time_sink || (a.time_spent_seconds && a.time_spent_seconds > 90)).length;
    timeSinkObservation = `Accuracy is close to what random guessing gives (${metrics.attempts_count} attempts). Pacing patterns cannot be separated from guessing speed.`;
  } else {
    timeSinks = attempts.filter((a) => a.is_time_sink || (a.time_spent_seconds && a.time_spent_seconds > 90)).length;
    timeSinkObservation =
      timeSinks > 3
        ? `${timeSinks} questions exceeded 90s. Skipping stubborn numericals preserves time.`
        : "Pacing is steady with few extended linger periods.";
  }

  // Trap option susceptibility
  let trapOptionSusceptibility = "";
  if (metrics.near_chance) {
    trapOptionSusceptibility = "Accuracy is near random chance; cannot determine distractor trap susceptibility without un-guessed attempts.";
  } else if (metrics.mistake_tags_count === "unknown") {
    trapOptionSusceptibility = "I can't tell your trap susceptibility yet because no wrong answers have been tagged in the mistake review.";
  } else {
    const trapOptionHits = attempts.filter((a) =>
      a.diagnostic_report?.errorClassification?.toLowerCase().includes("trap") ||
      a.diagnostic_report?.mistakeTag === "Misread"
    ).length;
    trapOptionSusceptibility =
      trapOptionHits > 2
        ? `${trapOptionHits} questions flagged as distractor traps. Read final prompt constraints carefully.`
        : "Low distractor trap susceptibility observed on tagged mistakes.";
  }

  // Mistake categories
  let mistakeCategories: any = "unknown";
  let mistakeObservation = "";
  if (metrics.mistake_tags_count === "unknown") {
    mistakeCategories = "unknown";
    mistakeObservation = "I can't tell your mistake types yet because no wrong answers have been categorized with mistake tags.";
  } else {
    const wrongAttempts = attempts.filter((a) => !a.is_correct);
    mistakeCategories = {
      conceptGap: wrongAttempts.filter((a) => a.diagnostic_report?.mistakeTag === "Didn't know concept").length,
      misread: wrongAttempts.filter((a) => a.diagnostic_report?.mistakeTag === "Misread").length,
      guessed: wrongAttempts.filter((a) => a.diagnostic_report?.mistakeTag === "Guessed").length,
      changedAnswer: wrongAttempts.filter((a) => a.diagnostic_report?.mistakeTag === "Changed my answer").length,
    };
    mistakeObservation = `${metrics.mistake_tags_count} mistakes categorized by student.`;
  }

  return {
    hasData: true,
    data_quality: metrics.data_quality,
    attempts_count: metrics.attempts_count,
    skipped_rate: metrics.skipped_rate,
    median_seconds_per_question: metrics.median_seconds_per_question,
    mistake_tags_count: metrics.mistake_tags_count,
    near_chance: metrics.near_chance,
    fast_wrong_rate: metrics.fast_wrong_rate,
    time_sink_count: timeSinks,
    timeSinkObservation,
    trapOptionSusceptibility,
    mistake_categories: mistakeCategories,
    mistakeObservation,
  };
}

// ---------------------------------------------------------------------------
// 8. Target College Gap
// ---------------------------------------------------------------------------
async function getCollegeGap(userId: string, requestedCollege?: string) {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("target_college, target_course, target_university")
    .eq("id", userId)
    .maybeSingle();

  const collegeName = requestedCollege || profile?.target_college || "SRCC";
  const progress = await getUserProgress(userId);

  // Compute current average per-subject score on 250 scale
  let currentEstimatedScore = 180;
  if (progress.completedTests.length > 0) {
    const scores = progress.completedTests.map((t) => (t.score / t.maxMarks) * 250);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    currentEstimatedScore = Math.round(avg);
  }

  const readiness = calculateCollegeReadiness(
    collegeName,
    profile?.target_university || "Delhi University",
    progress.overallAccuracyPercentage,
    progress.totalAttempts,
    currentEstimatedScore
  );
  const cutoffInfo = getCollegeCutoffInfo(collegeName);

  return {
    targetCollege: collegeName,
    targetCourse: profile?.target_course || "Undergraduate Program",
    university: profile?.target_university || "Delhi University",
    campus: cutoffInfo.campus,
    targetScore: cutoffInfo.targetScore,
    currentEstimatedScore: `${currentEstimatedScore} / 250`,
    pointsGap: readiness.pointsGap,
    status: readiness.statusLabel,
    gapExplanation: readiness.gapExplanation,
    recommendation: readiness.recommendation,
  };
}

// ---------------------------------------------------------------------------
// 9. Study Plan
// ---------------------------------------------------------------------------
async function getStudyPlan(userId: string, days = 7) {
  const weakData = await getWeakTopics(userId);
  const cappedDays = Math.min(Math.max(3, days || 7), 14);

  const plan = [];
  const weakList =
    weakData.hasData && Array.isArray(weakData.weakTopics) ? weakData.weakTopics : [];

  for (let d = 1; d <= cappedDays; d++) {
    const topic =
      weakList.length > 0
        ? weakList[(d - 1) % weakList.length]?.topic
        : "Core NCERT Formulas & Definitions";
    plan.push({
      day: `Day ${d}`,
      focusTopic: topic,
      session1: "Review NCERT summary & mistake journal (20 mins)",
      session2: "Solve 10 targeted practice questions (+5/-1 marking) (25 mins)",
      targetAccuracy: "80%",
    });
  }

  return {
    days: cappedDays,
    plan,
    coreRule: "Always review why wrong options were tempting before moving to new questions.",
  };
}

// ---------------------------------------------------------------------------
// 10. Suggest Actions (Max 3 Action Chips, User-Validated, Min 5 Attempts)
// ---------------------------------------------------------------------------
async function suggestActions(userId: string) {
  const progress = await getUserProgress(userId);

  const { data: rawAttempts } = await supabaseAdmin
    .from("user_attempts")
    .select("id, question_id, is_correct, selected_option, time_spent_seconds, diagnostic_report, test_id")
    .eq("user_id", userId);

  const attempts = rawAttempts || [];

  if (progress.totalAttempts === 0 && attempts.length === 0) {
    return {
      actions: [
        {
          priority: 1,
          title: "Complete 50-Q Diagnostic Mock",
          reason: "Calibrate baseline accuracy across domain subjects.",
          actionRoute: "/dashboard/mocks",
        },
        {
          priority: 2,
          title: "Set Target College & Course",
          reason: "Define admission cutoffs for real-time gap tracking.",
          actionRoute: "/dashboard/profile",
        },
        {
          priority: 3,
          title: "Review NCERT Notes",
          reason: "Quick formula refresher before attempting timed mocks.",
          actionRoute: "/dashboard/notes",
        },
      ],
    };
  }

  const metrics = computeDataQualityMetrics(attempts, progress.completedTests || []);

  // Near-chance handling: Suggest untimed drill and elimination practice
  if (metrics.near_chance) {
    return {
      actions: [
        {
          priority: 1,
          title: "Untimed 10-Q Drill",
          reason: "Focus on comprehension without timer pressure.",
          actionRoute: "/dashboard/practice",
        },
        {
          priority: 2,
          title: "Elimination Practice (5 Qs)",
          reason: "Eliminate 2 obvious wrong options before picking an answer.",
          actionRoute: "/dashboard/practice",
        },
        {
          priority: 3,
          title: "Review Core Formulas",
          reason: "Reinforce NCERT fundamentals before re-checking accuracy.",
          actionRoute: "/dashboard/notes",
        },
      ],
    };
  }

  const weakData = await getWeakTopics(userId);
  // Strict rule: only suggest weak topic if attempts >= 5
  const eligibleWeakTopics = (weakData.weakTopics || []).filter(
    (t: any) => typeof t.attempts === "number" && t.attempts >= 5
  );

  const topWeak = eligibleWeakTopics[0] || null;

  const actions: Array<{ priority: number; title: string; reason: string; actionRoute: string }> = [];

  // 1. Weak topic action (if >= 5 attempts)
  if (topWeak) {
    const cleanTopicName = topWeak.topic.includes(" - ")
      ? topWeak.topic.split(" - ").slice(1).join(" - ").trim()
      : topWeak.topic;
    actions.push({
      priority: 1,
      title: `Fix ${cleanTopicName} (10 Qs)`,
      reason: `Accuracy is ${topWeak.accuracy} over ${topWeak.attempts} attempts.`,
      actionRoute: "/dashboard/practice",
    });
  }

  // 2. Review last completed mock if available
  if (progress.completedTests.length > 0) {
    actions.push({
      priority: 2,
      title: "Review last mock",
      reason: "Review distractor traps and second-guessing slips.",
      actionRoute: "/dashboard/mocks",
    });
  } else {
    actions.push({
      priority: 2,
      title: "Take a Full 50-Q Mock",
      reason: "Practice under authentic 60-minute CBT conditions.",
      actionRoute: "/dashboard/mocks",
    });
  }

  // 3. Untagged mistakes review or general practice
  if (metrics.data_quality === "untagged" || metrics.mistake_tags_count === "unknown") {
    actions.push({
      priority: 3,
      title: "Tag recent mistakes",
      reason: "Classify your wrong answers in your review journal.",
      actionRoute: "/dashboard/reports",
    });
  } else {
    actions.push({
      priority: 3,
      title: "10-Question Targeted Practice",
      reason: "Keep domain concepts fresh with a short practice set.",
      actionRoute: "/dashboard/practice",
    });
  }

  return {
    actions: actions.slice(0, 3),
  };
}
