import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUserProgress, SubjectProgress } from "@/lib/user-progress";
import { getCollegeCutoffInfo, calculateCollegeReadiness } from "@/lib/college-benchmarks";

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
        "Get the candidate's overall CUET preparation summary: total questions attempted, overall accuracy, current streak, selected subjects, and target college/course goals.",
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
        "Retrieve topics where accuracy is below 60% with at least 5 attempts (sufficient data). Topics with fewer than 5 attempts are reported as insufficient data.",
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
        "Analyze exam behavioral patterns: second-guessing leaks (changing correct answers to wrong), trap option susceptibility, and time sinks.",
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
        "Suggest the top 3 immediate high-leverage actions for the student (e.g., take a diagnostic mock, solve a 10-Q topic fix, review formulas).",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];

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

  if (progress.totalAttempts === 0) {
    return {
      hasData: false,
      message: "No mock tests or practice questions completed yet.",
      profile: {
        targetStream: profile?.target_stream || "General",
        targetCollege: profile?.target_college || "Central University",
        targetCourse: profile?.target_course || "Undergraduate Program",
        selectedSubjects: profile?.selected_subjects || [],
      },
      recommendation: "Take the first 50-question diagnostic mock test to establish your baseline.",
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
    targetStream: profile?.target_stream || "General",
    targetUniversity: profile?.target_university || "Delhi University",
    targetCollege: profile?.target_college || "SRCC",
    targetCourse: profile?.target_course || "Undergraduate Program",
    dailyStreak: progress.activeStreak,
    totalAttempts: progress.totalAttempts,
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
    .select("question_id, is_correct, diagnostic_report")
    .eq("user_id", userId);

  if (!attempts || attempts.length === 0) {
    return {
      hasData: false,
      message: "Zero attempts recorded. Cannot evaluate weak topics yet.",
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

  const weakTopics: any[] = [];
  const insufficientDataTopics: any[] = [];

  for (const [topicKey, stats] of Object.entries(topicStats)) {
    const acc = Math.round((stats.correct / stats.total) * 100);
    if (stats.total < 5) {
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
        fixAction: `Start 10-question practice fix on ${topicKey}`,
      });
    }
  }

  weakTopics.sort((a, b) => parseInt(a.accuracy) - parseInt(b.accuracy));

  return {
    hasData: true,
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
  const marksLostToNegative = incorrect * 1;
  const marksLostToOmissionOrError = incorrect * 6; // +5 not earned + 1 deducted

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
        timeSpentSeconds: a.time_spent_seconds,
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
    .select("is_correct, is_time_sink, diagnostic_report, selected_option")
    .eq("user_id", userId);

  if (!attempts || attempts.length === 0) {
    return {
      hasData: false,
      message: "Need test attempts to evaluate behavioral patterns.",
    };
  }

  const total = attempts.length;
  const timeSinks = attempts.filter((a) => a.is_time_sink).length;
  const trapOptionHits = attempts.filter((a) =>
    a.diagnostic_report?.errorClassification?.toLowerCase().includes("trap")
  ).length;

  return {
    hasData: true,
    totalAttempted: total,
    timeSinkQuestionsCount: timeSinks,
    timeSinkObservation:
      timeSinks > 3
        ? "You tend to get stuck on calculation-heavy problems. Skipping after 90 seconds preserves time for direct questions."
        : "Healthy pacing: you rarely linger excessively on stubborn questions.",
    trapOptionSusceptibility:
      trapOptionHits > 2
        ? `${trapOptionHits} questions lost to distractor traps (e.g. sign errors, unit mismatch). Read final prompt clauses carefully.`
        : "Low distractor trap susceptibility: high conceptual precision.",
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
// 10. Suggest Actions
// ---------------------------------------------------------------------------
async function suggestActions(userId: string) {
  const progress = await getUserProgress(userId);

  if (progress.totalAttempts === 0) {
    return {
      actions: [
        {
          priority: 1,
          title: "Complete 50-Question Diagnostic Mock",
          reason: "Calibrate your baseline accuracy, speed, and negative mark leaks across all domain subjects.",
          actionRoute: "/dashboard/mocks",
        },
        {
          priority: 2,
          title: "Set Target College & Course",
          reason: "Define your admission cutoffs in your profile to enable real-time points-gap tracking.",
          actionRoute: "/dashboard/profile",
        },
        {
          priority: 3,
          title: "Review NCERT Chapter Notes",
          reason: "Quick formula and concept refresher before attempting timed mocks.",
          actionRoute: "/dashboard/notes",
        },
      ],
    };
  }

  const weakData = await getWeakTopics(userId);
  const topWeak = Array.isArray(weakData.weakTopics) ? weakData.weakTopics[0] : null;

  return {
    actions: [
      {
        priority: 1,
        title: topWeak ? `Fix ${topWeak.topic}` : "10-Question Targeted Practice",
        reason: topWeak
          ? `Your current accuracy is ${topWeak.accuracy}. Eliminating errors here will recover up to ${topWeak.marksLostEstimate} marks.`
          : "Keep concepts fresh with a short timed practice drill.",
        actionRoute: "/dashboard/practice",
      },
      {
        priority: 2,
        title: "Take a Full 50-Question Subject Mock",
        reason: "Practice under authentic 60-minute NTA CBT conditions to build stamina.",
        actionRoute: "/dashboard/mocks",
      },
      {
        priority: 3,
        title: "Analyze Mistake Journal",
        reason: "Review distractor traps and second-guessing slips from your latest attempt.",
        actionRoute: "/dashboard/reports",
      },
    ],
  };
}
