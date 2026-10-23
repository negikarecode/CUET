/**
 * Student Performance Command Center Engine
 * 
 * Unifies all analytics and learning coach subsystems into a single source of truth answering the 5 core student questions:
 * 1. Where am I currently performing well?
 * 2. What is holding me back?
 * 3. What should I work on next?
 * 4. Is my preparation improving?
 * 5. What should I do in my next study session?
 * 
 * Strictly deterministic metrics, zero token leakage, reproducible from student attempt telemetry.
 */

import { RecordedTestAttempt, RecordedQuestionAttempt } from "@/types";
import { computeAuthoritativeDiagnosticProgress, AuthoritativeDiagnosticProgress, countQualifyingFromTestAttempts } from "@/lib/diagnostic-status";
import { deduplicateTestAttempts, normalizeSubject } from "@/lib/analytics";
import { getOrCreateTopicRepairPlanV2, TopicRepairPlanV2 } from "@/lib/repair-plan-v2";

export interface CommandCenterAnswer1 {
  question: "Where am I currently performing well?";
  summary: string;
  strongChapters: Array<{
    chapter: string;
    subject: string;
    accuracyPercentage: number;
    attemptedCount: number;
    distinctQuestions: number;
    status: "Mastered" | "Strong" | "Consistent";
  }>;
  speedStrengthsCount: number;
  overallHighAccuracy: boolean;
}

export interface CommandCenterAnswer2 {
  question: "What is holding me back?";
  summary: string;
  bottlenecks: Array<{
    type: "CRITICAL_CHAPTER" | "FATAL_TIME_SINK" | "QUALIFIER_TRAP" | "PACING_RUSH";
    title: string;
    description: string;
    marksImpact: string;
    evidenceQuestionIds: string[];
  }>;
}

export interface CommandCenterAnswer3 {
  question: "What should I work on next?";
  summary: string;
  priorityTask: {
    title: string;
    subject: string;
    chapter: string;
    reason: string;
    actionUrl: string;
    actionLabel: string;
    estimatedMinutes: number;
    repairPlan?: TopicRepairPlanV2;
  };
}

export interface CommandCenterAnswer4 {
  question: "Is my preparation improving?";
  summary: string;
  trajectory: "IMPROVING" | "STABLE" | "DECLINING" | "INSUFFICIENT_EVIDENCE";
  recentAttemptsAccuracy: number[];
  accuracyChangePoints: number;
  diagnosticCycleStatus: {
    cycleNumber: number;
    questionCount: number;
    isUnlocked: boolean;
    progressPercentage: number;
  };
  resolvedTopicsCount: number;
}

export interface CommandCenterAnswer5 {
  question: "What should I do in my next study session?";
  summary: string;
  recommendedDurationMinutes: 15 | 30;
  sessionSteps: Array<{
    order: number;
    title: string;
    durationMinutes: number;
    activity: string;
    actionUrl: string;
  }>;
}

export interface PerformanceCommandCenterReport {
  studentId: string;
  generatedAt: string;
  totalAttempts: number;
  totalQualifyingQuestions: number;
  overallAccuracy: number;
  diagnosticProgress: AuthoritativeDiagnosticProgress;
  answers: {
    q1_performingWell: CommandCenterAnswer1;
    q2_holdingMeBack: CommandCenterAnswer2;
    q3_workOnNext: CommandCenterAnswer3;
    q4_isImproving: CommandCenterAnswer4;
    q5_nextSessionPlan: CommandCenterAnswer5;
  };
}

/**
 * Computes the unified Performance Command Center answers deterministically.
 */
export function buildPerformanceCommandCenter(params: {
  studentId?: string;
  testAttempts: RecordedTestAttempt[];
  availableMinutes?: number;
}): PerformanceCommandCenterReport {
  const { studentId = "student", testAttempts, availableMinutes = 25 } = params;

  const cleanAttempts = deduplicateTestAttempts(testAttempts || []);
  const allQuestions: RecordedQuestionAttempt[] = [];
  cleanAttempts.forEach((t) => {
    (t.questions || []).forEach((q) => {
      if (q.selectedOption !== null && q.selectedOption !== undefined) {
        allQuestions.push(q);
      }
    });
  });

  const totalQualifying = countQualifyingFromTestAttempts(cleanAttempts);
  const diagnosticProgress = computeAuthoritativeDiagnosticProgress({
    totalAttempted: totalQualifying,
  });

  const correctCount = allQuestions.filter((q) => q.isCorrect === true).length;
  const overallAccuracy = totalQualifying > 0 ? Math.round((correctCount / totalQualifying) * 100) : 0;

  // ─── 1. WHERE AM I PERFORMING WELL? ──────────────────────────────────────────
  const chapterStats = new Map<string, { subject: string; chapter: string; total: number; correct: number; distinct: Set<string> }>();
  allQuestions.forEach((q) => {
    const ch = q.chapter || "Core Chapter";
    const sub = normalizeSubject(q.subject).name;
    const key = `${sub}:::${ch}`;
    const entry = chapterStats.get(key) || { subject: sub, chapter: ch, total: 0, correct: 0, distinct: new Set() };
    entry.total += 1;
    if (q.isCorrect) entry.correct += 1;
    entry.distinct.add(q.questionId);
    chapterStats.set(key, entry);
  });

  const strongChapters: CommandCenterAnswer1["strongChapters"] = [];
  const weakChapters: Array<{ subject: string; chapter: string; accuracy: number; total: number }> = [];

  chapterStats.forEach((stat) => {
    const acc = Math.round((stat.correct / stat.total) * 100);
    const distinctCount = stat.distinct.size;
    if (distinctCount >= 4 && acc >= 75) {
      strongChapters.push({
        chapter: stat.chapter,
        subject: stat.subject,
        accuracyPercentage: acc,
        attemptedCount: stat.total,
        distinctQuestions: distinctCount,
        status: acc >= 90 ? "Mastered" : acc >= 80 ? "Strong" : "Consistent",
      });
    } else if (stat.total >= 3 && acc <= 60) {
      weakChapters.push({
        chapter: stat.chapter,
        subject: stat.subject,
        accuracy: acc,
        total: stat.total,
      });
    }
  });

  strongChapters.sort((a, b) => b.accuracyPercentage - a.accuracyPercentage);
  weakChapters.sort((a, b) => a.accuracy - b.accuracy);

  const speedStrengthsCount = allQuestions.filter((q) => q.isCorrect && (q.timeSpentSeconds || 0) <= 40).length;

  const firstStrong = strongChapters[0];
  const answer1: CommandCenterAnswer1 = {
    question: "Where am I currently performing well?",
    summary:
      firstStrong
        ? `Demonstrating solid mastery across ${strongChapters.length} key chapter${
            strongChapters.length === 1 ? "" : "s"
          }, led by ${firstStrong.chapter} in ${firstStrong.subject} (${firstStrong.accuracyPercentage}% accuracy).`
        : totalQualifying < 10
        ? "Baseline calibration in progress. Complete at least 10 questions to establish verified strength areas."
        : "Balanced domain practice recorded without distinct high-accuracy chapter outliers yet.",
    strongChapters: strongChapters.slice(0, 4),
    speedStrengthsCount,
    overallHighAccuracy: overallAccuracy >= 75,
  };

  // ─── 2. WHAT IS HOLDING ME BACK? ─────────────────────────────────────────────
  const bottlenecks: CommandCenterAnswer2["bottlenecks"] = [];

  // Primary chapter weakness
  if (weakChapters.length > 0 && weakChapters[0]) {
    const topWeak = weakChapters[0];
    const missedCount = topWeak.total - Math.round((topWeak.accuracy / 100) * topWeak.total);
    const weakQIds = allQuestions
      .filter((q) => q.chapter === topWeak.chapter && !q.isCorrect)
      .map((q) => q.questionId);

    bottlenecks.push({
      type: "CRITICAL_CHAPTER",
      title: `Vulnerability: ${topWeak.chapter} (${topWeak.subject})`,
      description: `Accuracy is currently ${topWeak.accuracy}% across ${topWeak.total} attempts. Persistent mistakes on concept definitions and application boundaries.`,
      marksImpact: `Loss of approximately ${missedCount * 6} marks in CUET mock scoring (+5 / -1).`,
      evidenceQuestionIds: weakQIds.slice(0, 4),
    });
  }

  // Fatal time sinks (>75s and incorrect)
  const timeSinkErrors = allQuestions.filter((q) => !q.isCorrect && (q.timeSpentSeconds || 0) > 75);
  if (timeSinkErrors.length >= 2) {
    bottlenecks.push({
      type: "FATAL_TIME_SINK",
      title: "Fatal Time Sinks (>75s per question)",
      description: `${timeSinkErrors.length} questions consumed over 75 seconds before resulting in a negative penalty. Double penalty: lost exam time plus negative mark.`,
      marksImpact: `Wasted ~${Math.round(timeSinkErrors.reduce((s, q) => s + (q.timeSpentSeconds || 0), 0) / 60)} minutes of exam duration.`,
      evidenceQuestionIds: timeSinkErrors.map((q) => q.questionId).slice(0, 4),
    });
  }

  // Negative qualifier trap
  const qualifierErrors = allQuestions.filter(
    (q) =>
      !q.isCorrect &&
      (((q.prompt || "").toUpperCase().includes("NOT")) ||
        ((q.prompt || "").toUpperCase().includes("EXCEPT")) ||
        ((q.prompt || "").toUpperCase().includes("INCORRECT")))
  );
  if (qualifierErrors.length >= 2) {
    bottlenecks.push({
      type: "QUALIFIER_TRAP",
      title: "Restrictive Qualifier Distractor Trap",
      description: `${qualifierErrors.length} penalty mistakes on stems with "NOT", "EXCEPT", or "INCORRECT", indicating rushed reading of stem constraints.`,
      marksImpact: `Incurred ${qualifierErrors.length * 6} lost marks compared to correct identification.`,
      evidenceQuestionIds: qualifierErrors.map((q) => q.questionId).slice(0, 4),
    });
  }

  if (bottlenecks.length === 0) {
    bottlenecks.push({
      type: "CRITICAL_CHAPTER",
      title: "No Major Bottlenecks Detected",
      description: "Error rate is evenly distributed without recurring single-topic clusters or excessive time sinks.",
      marksImpact: "Keep pace steady to avoid careless slips on straightforward questions.",
      evidenceQuestionIds: [],
    });
  }

  const primaryBottleneck = bottlenecks[0];
  const answer2: CommandCenterAnswer2 = {
    question: "What is holding me back?",
    summary:
      primaryBottleneck && primaryBottleneck.type !== "CRITICAL_CHAPTER"
        ? `Primary drag on score: ${primaryBottleneck.title}. Addressing this directly will recover lost marks fastest.`
        : "No critical knowledge or pacing bottlenecks detected in recorded attempts.",
    bottlenecks,
  };

  // ─── 3. WHAT SHOULD I WORK ON NEXT? ──────────────────────────────────────────
  const primaryWeak = weakChapters[0] || {
    subject: "Physics",
    chapter: "General Domain Foundations",
    accuracy: 50,
    total: 5,
  };
  const primaryPlan = getOrCreateTopicRepairPlanV2({
    subject: primaryWeak.subject,
    chapter: primaryWeak.chapter,
    accuracy: primaryWeak.accuracy,
    attemptsCount: primaryWeak.total,
  });

  const nextStep = primaryPlan.steps.find((s) => s.status === "available") || primaryPlan.steps[0];

  const answer3: CommandCenterAnswer3 = {
    question: "What should I work on next?",
    summary: `Prioritized repair intervention: ${primaryPlan.chapter} (${primaryPlan.subject}). Complete ${nextStep.title} (${nextStep.estimatedMinutes} mins).`,
    priorityTask: {
      title: primaryPlan.chapter,
      subject: primaryPlan.subject,
      chapter: primaryPlan.chapter,
      reason: `Accuracy is ${primaryWeak.accuracy}% (${primaryWeak.total} attempts). Recovering this topic recovers up to ${(primaryWeak.total) * 6} marks.`,
      actionUrl: nextStep.actionUrl,
      actionLabel: nextStep.actionLabel,
      estimatedMinutes: nextStep.estimatedMinutes,
      repairPlan: primaryPlan,
    },
  };

  // ─── 4. IS MY PREPARATION IMPROVING? ─────────────────────────────────────────
  const recentMocks = cleanAttempts.slice(0, 5);
  const recentAccuracies = recentMocks.map((m) => m.accuracyPercentage || 0).reverse();

  let trajectory: CommandCenterAnswer4["trajectory"] = "INSUFFICIENT_EVIDENCE";
  let accChange = 0;

  if (recentAccuracies.length >= 3) {
    const firstHalf = recentAccuracies.slice(0, Math.floor(recentAccuracies.length / 2));
    const secondHalf = recentAccuracies.slice(Math.floor(recentAccuracies.length / 2));
    const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    accChange = Math.round(avgSecond - avgFirst);

    if (accChange >= 5) trajectory = "IMPROVING";
    else if (accChange <= -5) trajectory = "DECLINING";
    else trajectory = "STABLE";
  }

  const answer4: CommandCenterAnswer4 = {
    question: "Is my preparation improving?",
    summary:
      trajectory === "IMPROVING"
        ? `Preparation is improving (+${accChange}% accuracy trend across recent tests). Keep maintaining structured practice.`
        : trajectory === "STABLE"
        ? "Accuracy is holding stable. Target identified weak chapters to break through to the next score band."
        : trajectory === "DECLINING"
        ? `Recent accuracy dipped by ${Math.abs(accChange)}%. Avoid fatigue and complete a targeted repair drill before attempting full mocks.`
        : "Complete at least 3 mock tests or sectional papers to measure trajectory.",
    trajectory,
    recentAttemptsAccuracy: recentAccuracies,
    accuracyChangePoints: accChange,
    diagnosticCycleStatus: {
      cycleNumber: diagnosticProgress.currentCycleNumber,
      questionCount: diagnosticProgress.currentCycleQuestionCount,
      isUnlocked: diagnosticProgress.isUnlocked,
      progressPercentage: diagnosticProgress.activeCycleProgressPercentage,
    },
    resolvedTopicsCount: strongChapters.length,
  };

  // ─── 5. WHAT SHOULD I DO IN MY NEXT STUDY SESSION? ───────────────────────────
  const sessionDuration: 15 | 30 = availableMinutes >= 25 ? 30 : 15;
  const canonicalSub = normalizeSubject(primaryWeak.subject);

  const sessionSteps =
    sessionDuration === 15
      ? [
          {
            order: 1,
            title: "5-Min Concept & Trap Review",
            durationMinutes: 5,
            activity: `Review NCERT rules and distinction boundaries for ${primaryWeak.chapter}.`,
            actionUrl: `/dashboard/ai-coach?subject=${canonicalSub.key}`,
          },
          {
            order: 2,
            title: "7-Min Adaptive 5-Question Drill",
            durationMinutes: 7,
            activity: `Solve 5 targeted questions targeting your recorded error patterns in ${primaryWeak.chapter}.`,
            actionUrl: `/dashboard/mocks?subject=${canonicalSub.key}&drill=true`,
          },
          {
            order: 3,
            title: "3-Min Solution Debrief",
            durationMinutes: 3,
            activity: "Review detailed solutions for any questions missed in the drill.",
            actionUrl: `/dashboard/ai-coach?subject=${canonicalSub.key}`,
          },
        ]
      : [
          {
            order: 1,
            title: "8-Min NCERT Concept Deep Dive",
            durationMinutes: 8,
            activity: `Study key formulas, named reactions, and qualifier traps in ${primaryWeak.chapter}.`,
            actionUrl: `/dashboard/ai-coach?subject=${canonicalSub.key}`,
          },
          {
            order: 2,
            title: "14-Min 10-Question Targeted Drill",
            durationMinutes: 14,
            activity: `Solve 10 questions under standard 60-second exam pacing. Aim for ≥80% accuracy.`,
            actionUrl: `/dashboard/mocks?subject=${canonicalSub.key}&drill=true`,
          },
          {
            order: 3,
            title: "8-Min Verification Retest",
            durationMinutes: 8,
            activity: "Take a timed 5-question retest to lock in mastery and verify recovery.",
            actionUrl: `/dashboard/mocks?subject=${canonicalSub.key}&retest=true`,
          },
        ];

  const answer5: CommandCenterAnswer5 = {
    question: "What should I do in my next study session?",
    summary: `Structured ${sessionDuration}-minute recovery session targeting ${primaryWeak.chapter} (${primaryWeak.subject}).`,
    recommendedDurationMinutes: sessionDuration,
    sessionSteps,
  };

  return {
    studentId,
    generatedAt: new Date().toISOString(),
    totalAttempts: cleanAttempts.length,
    totalQualifyingQuestions: totalQualifying,
    overallAccuracy,
    diagnosticProgress,
    answers: {
      q1_performingWell: answer1,
      q2_holdingMeBack: answer2,
      q3_workOnNext: answer3,
      q4_isImproving: answer4,
      q5_nextSessionPlan: answer5,
    },
  };
}
