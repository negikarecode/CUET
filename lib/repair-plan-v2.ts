/**
 * Personalized Repair Plan Engine V2
 * 
 * Production-grade study plan engine compliant with Master Prompt specifications:
 * - 4-Stage Progressive Lifecycle:
 *     1. Concept Revision Task (NCERT definitions, core distinctions)
 *     2. Targeted Practice Drill (5-question adaptive error-pattern practice)
 *     3. Timed Retest (Exam condition re-attempt)
 *     4. Recovery Verification (≥80% on retest → marked "RECOVERED")
 * - Defensible Prioritization Algorithm:
 *     Priority Score = (Severity Gap × 0.4) + (Evidence Sample Size × 0.3) + (Exam Marks Weight × 0.2) + (Recency × 0.1)
 * - 3 Practical Study Session Templates:
 *     5-minute Quick Fix
 *     15-minute Focused Repair
 *     30-minute Deep Dive
 * - Adaptation: Dynamic adjustment based on whether the student improves or requires prerequisite review
 */

import { safeStorage } from "@/lib/storage/safe-storage";
import { normalizeSubject } from "@/lib/analytics";

export type RepairStageV2 =
  | "NOT_STARTED"
  | "CONCEPT_REVIEWED"
  | "DRILL_COMPLETED"
  | "RETEST_COMPLETED"
  | "RECOVERED";

export interface RepairStepV2 {
  stepNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  estimatedMinutes: number;
  status: "locked" | "available" | "in_progress" | "completed";
  actionUrl: string;
  actionLabel: string;
  completedAt?: string;
  resultScore?: number;
}

export type SessionTemplateType = "quick_5" | "focused_15" | "deep_30";

export interface StudySessionTemplate {
  type: SessionTemplateType;
  title: string;
  totalMinutes: number;
  description: string;
  recommendedFor: string;
  steps: Array<{
    name: string;
    minutes: number;
    activity: string;
  }>;
}

export const STUDY_SESSION_TEMPLATES: Record<SessionTemplateType, StudySessionTemplate> = {
  quick_5: {
    type: "quick_5",
    title: "5-Minute Quick Fix",
    totalMinutes: 5,
    description: "Rapid review of the primary trap option and 2 verification questions.",
    recommendedFor: "Careless slips, qualifier misreads, or quick revision between classes.",
    steps: [
      { name: "Trap Rule Check", minutes: 2, activity: "Read the verified NCERT distinction and boundary rule." },
      { name: "Instant Check", minutes: 3, activity: "Solve 2 rapid verification questions to confirm recall." },
    ],
  },
  focused_15: {
    type: "focused_15",
    title: "15-Minute Focused Repair",
    totalMinutes: 15,
    description: "Standard remediation: NCERT concept review followed by a targeted 5-question adaptive drill.",
    recommendedFor: "Identified chapter weaknesses with 5–15 attempts where accuracy is below 65%.",
    steps: [
      { name: "Concept & Formula Walkthrough", minutes: 5, activity: "Review key formulas, reaction conditions, and common traps." },
      { name: "5-Question Adaptive Drill", minutes: 7, activity: "Solve 5 adaptive questions targeting your exact error pattern." },
      { name: "Solution Debrief", minutes: 3, activity: "Inspect explanations for any missed drill questions." },
    ],
  },
  deep_30: {
    type: "deep_30",
    title: "30-Minute Deep Dive",
    totalMinutes: 30,
    description: "Comprehensive recovery: concept study, worked examples, 10-question drill, and timed retest.",
    recommendedFor: "Persistent or recurring weaknesses with multiple recorded mistakes across cycles.",
    steps: [
      { name: "Full Theory Review", minutes: 8, activity: "Comprehensive review of the NCERT topic and related prerequisite concepts." },
      { name: "Worked Example Study", minutes: 4, activity: "Step-by-step analysis of correct multi-step execution." },
      { name: "10-Question Targeted Drill", minutes: 12, activity: "Timed solving under standard CUET exam constraints." },
      { name: "Recovery Verification Retest", minutes: 6, activity: "Final 5-question verification to confirm mastery." },
    ],
  },
};

export interface TopicRepairPlanV2 {
  planId: string;
  userId: string;
  subject: string;
  subjectKey: string;
  chapter: string;
  microTopic: string;
  currentStage: RepairStageV2;
  isRecovered: boolean;
  priorityScore: number;
  priorityRank: number;
  evidenceAttemptCount: number;
  baselineAccuracy: number;
  retestAccuracy?: number;
  steps: [RepairStepV2, RepairStepV2, RepairStepV2, RepairStepV2];
  sessionTemplates: StudySessionTemplate[];
  createdAt: string;
  updatedAt: string;
  recoveredAt?: string;
  prerequisiteReviewSuggested?: boolean;
}

function getPlanStorageKey(userId: string, topicKey: string): string {
  return `cuet_repair_plan_v2:${userId.trim().toLowerCase()}:${topicKey.trim().toLowerCase()}`;
}

/**
 * Calculates priority score for a weak topic deterministically:
 * Priority = (Severity Gap × 0.4) + (Sample Size Weight × 0.3) + (Weightage × 0.2) + (Recency × 0.1)
 */
export function calculateTopicPriorityScore(params: {
  accuracy: number;
  attemptsCount: number;
  isHighYieldSyllabus?: boolean;
  daysSinceLastAttempt?: number;
}): number {
  const { accuracy, attemptsCount, isHighYieldSyllabus = true, daysSinceLastAttempt = 1 } = params;

  // Severity gap: 0 (100% acc) to 100 (0% acc)
  const severityGap = Math.max(0, 100 - accuracy);

  // Evidence sample size: saturates at 20 attempts
  const sampleWeight = Math.min(100, attemptsCount * 5);

  // Exam weightage: high-yield CUET chapter = 80, standard = 50
  const examWeight = isHighYieldSyllabus ? 80 : 50;

  // Recency weight: fresher mistakes have slightly higher priority
  const recencyWeight = Math.max(20, 100 - daysSinceLastAttempt * 10);

  const rawScore =
    severityGap * 0.4 +
    sampleWeight * 0.3 +
    examWeight * 0.2 +
    recencyWeight * 0.1;

  return Math.round(rawScore);
}

/**
 * Creates or retrieves a persistent Repair Plan V2 for a weak chapter.
 */
export function getOrCreateTopicRepairPlanV2(params: {
  userId?: string;
  subject: string;
  chapter: string;
  microTopic?: string;
  accuracy: number;
  attemptsCount: number;
  isHighYield?: boolean;
}): TopicRepairPlanV2 {
  const {
    userId = "guest",
    subject,
    chapter,
    microTopic = chapter,
    accuracy,
    attemptsCount,
    isHighYield = true,
  } = params;

  const canonical = normalizeSubject(subject);
  const topicKey = `${canonical.key}:::${chapter}`.toLowerCase();
  const storageKey = getPlanStorageKey(userId, topicKey);

  // Check stored state
  if (typeof window !== "undefined") {
    try {
      const stored = safeStorage.getItem(storageKey);
      if (stored) {
        const parsed: TopicRepairPlanV2 = JSON.parse(stored);
        if (parsed && parsed.steps && parsed.steps.length === 4) {
          return parsed;
        }
      }
    } catch {}
  }

  const priorityScore = calculateTopicPriorityScore({
    accuracy,
    attemptsCount,
    isHighYieldSyllabus: isHighYield,
  });

  const step1: RepairStepV2 = {
    stepNumber: 1,
    title: "Step 1: NCERT Concept & Distinction Review",
    description: `Review fundamental rules, formula conditions, and named distinctions for ${chapter}.`,
    estimatedMinutes: 5,
    status: "available",
    actionUrl: `/dashboard/radar?subject=${canonical.key}`,
    actionLabel: "Read Concept Summary",
  };

  const step2: RepairStepV2 = {
    stepNumber: 2,
    title: "Step 2: Targeted 5-Question Repair Drill",
    description: `Solve 5 adaptive questions targeting your exact recorded mistakes in ${chapter}.`,
    estimatedMinutes: 7,
    status: "locked",
    actionUrl: `/dashboard/mocks?subject=${canonical.key}&drill=true&chapter=${encodeURIComponent(chapter)}`,
    actionLabel: "Start 5-Q Drill",
  };

  const step3: RepairStepV2 = {
    stepNumber: 3,
    title: "Step 3: Timed Retest Under Exam Conditions",
    description: `Re-test ${chapter} with fresh questions under strict 60s/question CBT pacing.`,
    estimatedMinutes: 10,
    status: "locked",
    actionUrl: `/dashboard/mocks?subject=${canonical.key}&retest=true&chapter=${encodeURIComponent(chapter)}`,
    actionLabel: "Begin Timed Retest",
  };

  const step4: RepairStepV2 = {
    stepNumber: 4,
    title: "Step 4: Recovery Verification & Mastery Gate",
    description: `Achieve ≥80% accuracy on retest to verify skill recovery and retire this weakness.`,
    estimatedMinutes: 3,
    status: "locked",
    actionUrl: `/dashboard/radar?subject=${canonical.key}`,
    actionLabel: "Verify Recovery",
  };

  const newPlan: TopicRepairPlanV2 = {
    planId: `plan_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    subject: canonical.name,
    subjectKey: canonical.key,
    chapter,
    microTopic,
    currentStage: "NOT_STARTED",
    isRecovered: false,
    priorityScore,
    priorityRank: 1,
    evidenceAttemptCount: attemptsCount,
    baselineAccuracy: accuracy,
    steps: [step1, step2, step3, step4],
    sessionTemplates: [
      STUDY_SESSION_TEMPLATES.quick_5,
      STUDY_SESSION_TEMPLATES.focused_15,
      STUDY_SESSION_TEMPLATES.deep_30,
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      safeStorage.setItem(storageKey, JSON.stringify(newPlan));
    } catch {}
  }

  return newPlan;
}

/**
 * Updates the state of a repair plan following a completed event (e.g., drill finished or retest submitted).
 */
export function recordRepairPlanProgress(params: {
  userId?: string;
  subject: string;
  chapter: string;
  completedStep: 1 | 2 | 3 | 4;
  scoreOrAccuracy?: number;
}): TopicRepairPlanV2 {
  const plan = getOrCreateTopicRepairPlanV2({
    userId: params.userId,
    subject: params.subject,
    chapter: params.chapter,
    accuracy: 50,
    attemptsCount: 5,
  });

  const now = new Date().toISOString();
  plan.updatedAt = now;

  if (params.completedStep === 1) {
    plan.steps[0].status = "completed";
    plan.steps[0].completedAt = now;
    plan.steps[1].status = "available";
    plan.currentStage = "CONCEPT_REVIEWED";
  } else if (params.completedStep === 2) {
    plan.steps[0].status = "completed";
    plan.steps[1].status = "completed";
    plan.steps[1].completedAt = now;
    plan.steps[1].resultScore = params.scoreOrAccuracy;
    plan.steps[2].status = "available";
    plan.currentStage = "DRILL_COMPLETED";
  } else if (params.completedStep === 3) {
    plan.steps[0].status = "completed";
    plan.steps[1].status = "completed";
    plan.steps[2].status = "completed";
    plan.steps[2].completedAt = now;
    plan.steps[2].resultScore = params.scoreOrAccuracy;
    plan.retestAccuracy = params.scoreOrAccuracy;
    plan.steps[3].status = "available";
    plan.currentStage = "RETEST_COMPLETED";

    // Recovery check: did the student achieve >= 80% on retest?
    if (params.scoreOrAccuracy !== undefined && params.scoreOrAccuracy >= 80) {
      plan.steps[3].status = "completed";
      plan.steps[3].completedAt = now;
      plan.isRecovered = true;
      plan.recoveredAt = now;
      plan.currentStage = "RECOVERED";
    } else {
      // Retest did not meet 80% threshold: adapt plan
      plan.prerequisiteReviewSuggested = true;
      plan.steps[3].description = `Retest accuracy was ${params.scoreOrAccuracy ?? 0}%. Review prerequisite concepts before re-attempting.`;
    }
  } else if (params.completedStep === 4) {
    plan.steps[3].status = "completed";
    plan.steps[3].completedAt = now;
    plan.isRecovered = true;
    plan.recoveredAt = now;
    plan.currentStage = "RECOVERED";
  }

  const canonical = normalizeSubject(params.subject);
  const topicKey = `${canonical.key}:::${params.chapter}`.toLowerCase();
  const storageKey = getPlanStorageKey(params.userId || "guest", topicKey);

  if (typeof window !== "undefined") {
    try {
      safeStorage.setItem(storageKey, JSON.stringify(plan));
    } catch {}
  }

  return plan;
}
