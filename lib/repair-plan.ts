import { CALIBRATION_THRESHOLDS } from "@/lib/config/dashboardConfig";

export interface TopicRepairPlanEvents {
  conceptReviewed: boolean;
  conceptReviewedAt?: string;
  drillAttempted: boolean;
  drillAttemptedAt?: string;
  drillScore?: number;
  retestDone: boolean;
  retestDoneAt?: string;
  retestAccuracy?: number;
  recoveryVerified: boolean;
  recoveryVerifiedAt?: string;
}

export type StepState = "not_started" | "active" | "completed" | "locked";

export interface RepairPlanStepInfo {
  stepNumber: number;
  title: string;
  description: string;
  state: StepState;
  status: StepState;
  isCompleted: boolean;
  isActive: boolean;
  isLocked: boolean;
  badge: string;
}

export type TopicRepairStage =
  | "NOT_STARTED"
  | "CONCEPT_REVIEWED"
  | "DRILL_COMPLETED"
  | "RETEST_COMPLETED"
  | "RECOVERED";

export interface TopicRepairState {
  userId: string;
  topicKey: string;
  topic: string;
  currentStage: TopicRepairStage;
  stage: "DETECTED" | "DIAGNOSED" | "PRACTICING" | "RECOVERED";
  isRecovered: boolean;
  step1: RepairPlanStepInfo;
  step2: RepairPlanStepInfo;
  step3: RepairPlanStepInfo;
  step4: RepairPlanStepInfo;
  steps: [RepairPlanStepInfo, RepairPlanStepInfo, RepairPlanStepInfo, RepairPlanStepInfo];
  events: TopicRepairPlanEvents;
}

export type DerivedRepairPlan = TopicRepairState;

const DEFAULT_EVENTS: TopicRepairPlanEvents = {
  conceptReviewed: false,
  drillAttempted: false,
  retestDone: false,
  recoveryVerified: false,
};

// Memory store for server environments, test runners, and fast cross-renders
const memoryEventStore = new Map<string, TopicRepairPlanEvents>();

function getStorageKey(userId: string, topicKey: string): string {
  return `cuet_repair_plan:${userId.trim().toLowerCase()}:${topicKey.trim().toLowerCase()}`;
}

/**
 * Loads stored repair events for a user and topic.
 */
export function getStoredTopicEvents(
  userId: string = "guest",
  topicKey: string
): TopicRepairPlanEvents {
  const key = getStorageKey(userId, topicKey);
  const mem = memoryEventStore.get(key);
  if (mem) return { ...mem };

  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = { ...DEFAULT_EVENTS, ...parsed };
        memoryEventStore.set(key, merged);
        return merged;
      }
    } catch {
      // Ignore localStorage error
    }
  }

  return { ...DEFAULT_EVENTS };
}

/**
 * Saves topic repair events.
 */
export function saveTopicEvents(
  userId: string = "guest",
  topicKey: string,
  events: Partial<TopicRepairPlanEvents>
): TopicRepairPlanEvents {
  const current = getStoredTopicEvents(userId, topicKey);
  const updated: TopicRepairPlanEvents = { ...current, ...events };
  const key = getStorageKey(userId, topicKey);

  memoryEventStore.set(key, updated);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(updated));
    } catch {
      // Ignore localStorage error
    }
  }

  return updated;
}

/**
 * Clears repair events for testing or reset.
 */
export function clearRepairEvents(userId: string = "guest", topicKey: string): void {
  const key = getStorageKey(userId, topicKey);
  memoryEventStore.delete(key);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  }
}

/**
 * Derives repair plan steps strictly from recorded events and topic telemetry.
 *
 * Supports both:
 * 1) deriveTopicRepairPlan(userId, topic, testAttempts)
 * 2) deriveTopicRepairPlan({ userId, topicKey, attemptsCount, ... })
 */
export function deriveTopicRepairPlan(
  arg1:
    | string
    | {
        userId?: string;
        topicKey?: string;
        topic?: string;
        attemptsCount?: number;
        accuracyPercentage?: number;
        avgTimeSeconds?: number;
        customEvents?: TopicRepairPlanEvents;
      },
  arg2?: string,
  arg3?: any[]
): TopicRepairState {
  let userId = "guest";
  let topic = "General";
  let attemptsCount = 0;
  let accuracyPercentage = 0;
  let avgTimeSeconds = 60;
  let customEvents: TopicRepairPlanEvents | undefined = undefined;

  if (typeof arg1 === "string") {
    userId = arg1 || "guest";
    topic = arg2 || "General";
    const rawAttempts = Array.isArray(arg3) ? arg3 : [];

    // Extract questions for this topic across test sessions
    let matchingQuestions: any[] = [];
    for (const item of rawAttempts) {
      if (item && Array.isArray(item.questions)) {
        for (const q of item.questions) {
          if (
            (q.chapter && q.chapter.toLowerCase() === topic.toLowerCase()) ||
            (q.topic && q.topic.toLowerCase() === topic.toLowerCase()) ||
            (q.microTopic && q.microTopic.toLowerCase() === topic.toLowerCase())
          ) {
            matchingQuestions.push(q);
          }
        }
      } else if (item && (item.chapter || item.topic)) {
        if (
          (item.chapter && item.chapter.toLowerCase() === topic.toLowerCase()) ||
          (item.topic && item.topic.toLowerCase() === topic.toLowerCase())
        ) {
          matchingQuestions.push(item);
        }
      }
    }

    if (matchingQuestions.length > 0) {
      attemptsCount = matchingQuestions.length;
      const correct = matchingQuestions.filter((q) => q.isCorrect === true).length;
      accuracyPercentage = Math.round((correct / attemptsCount) * 100);
      const totalTime = matchingQuestions.reduce(
        (sum, q) => sum + (q.timeSpentSeconds || 60),
        0
      );
      avgTimeSeconds = Math.round(totalTime / attemptsCount);
    }
  } else if (arg1 && typeof arg1 === "object") {
    userId = arg1.userId || "guest";
    topic = arg1.topicKey || arg1.topic || "General";
    attemptsCount = arg1.attemptsCount || 0;
    accuracyPercentage = arg1.accuracyPercentage || 0;
    avgTimeSeconds = arg1.avgTimeSeconds || 60;
    customEvents = arg1.customEvents;
  }

  const events = customEvents || getStoredTopicEvents(userId, topic);

  // Recovery verification rule:
  // Requires >= 10 attempts AND >= 80% accuracy under reasonable pacing (<= 75s)
  const isTelemetryRecovered =
    attemptsCount >= CALIBRATION_THRESHOLDS.RECOVERY_MIN_ATTEMPTS &&
    accuracyPercentage >= CALIBRATION_THRESHOLDS.RECOVERY_MIN_ACCURACY &&
    avgTimeSeconds <= CALIBRATION_THRESHOLDS.RECOVERY_MAX_AVG_TIME;

  const recoveryVerified = events.recoveryVerified || isTelemetryRecovered;

  // Step 1: Concept Repair
  // Before student starts, step 1 must NOT be completed.
  const step1Completed = events.conceptReviewed;
  const step1Active = !step1Completed;
  const step1State: StepState = step1Completed ? "completed" : "not_started";

  // Step 2: Guided Drill
  // Active ONLY after step 1 is completed. Before step 1, step 2 is locked!
  const step2Completed = events.drillAttempted;
  const step2Active = step1Completed && !step2Completed;
  const step2Locked = !step1Completed;
  const step2State: StepState = step2Completed ? "completed" : step2Active ? "active" : "locked";

  // Step 3: Timed Retest
  // Active ONLY after step 2 is attempted.
  const step3Completed = events.retestDone;
  const step3Active = step2Completed && !step3Completed;
  const step3Locked = !step2Completed;
  const step3State: StepState = step3Completed ? "completed" : step3Active ? "active" : "locked";

  // Step 4: Recovery Check
  const step4Completed = recoveryVerified;
  const step4Active = step3Completed && !step4Completed;
  const step4Locked = !step3Completed;
  const step4State: StepState = step4Completed ? "completed" : step4Active ? "active" : "locked";

  // Current stage derivation
  let currentStage: TopicRepairStage = "NOT_STARTED";
  let stage: TopicRepairState["stage"] = "DETECTED";

  if (recoveryVerified) {
    currentStage = "RECOVERED";
    stage = "RECOVERED";
  } else if (step3Completed) {
    currentStage = "RETEST_COMPLETED";
    stage = "PRACTICING";
  } else if (step2Completed) {
    currentStage = "DRILL_COMPLETED";
    stage = "PRACTICING";
  } else if (step1Completed) {
    currentStage = "CONCEPT_REVIEWED";
    stage = "DIAGNOSED";
  }

  const step1: RepairPlanStepInfo = {
    stepNumber: 1,
    title: "① CONCEPT REPAIR",
    description: "NCERT core definitions and distinctions reviewed.",
    state: step1State,
    status: step1State,
    isCompleted: step1Completed,
    isActive: step1Active,
    isLocked: false,
    badge: step1Completed ? "✓ Done" : "Not started",
  };

  const step2: RepairPlanStepInfo = {
    stepNumber: 2,
    title: "② GUIDED DRILL",
    description: "5 targeted adaptive questions on weak patterns.",
    state: step2State,
    status: step2State,
    isCompleted: step2Completed,
    isActive: step2Active,
    isLocked: step2Locked,
    badge: step2Completed ? "✓ Completed" : step2Active ? "→ Active" : "Locked",
  };

  const step3: RepairPlanStepInfo = {
    stepNumber: 3,
    title: "③ TIMED RETEST",
    description: "10 Qs at expected exam pacing.",
    state: step3State,
    status: step3State,
    isCompleted: step3Completed,
    isActive: step3Active,
    isLocked: step3Locked,
    badge: step3Completed ? "✓ Done" : step3Active ? "→ Ready" : "Locked",
  };

  const step4: RepairPlanStepInfo = {
    stepNumber: 4,
    title: "④ RECOVERY CHECK",
    description: "Verified only when ≥80% accuracy over 10+ attempts.",
    state: step4State,
    status: step4State,
    isCompleted: step4Completed,
    isActive: step4Active,
    isLocked: step4Locked,
    badge: step4Completed ? "✅ Recovered" : step4Active ? "Evaluating" : "Pending",
  };

  const steps: [RepairPlanStepInfo, RepairPlanStepInfo, RepairPlanStepInfo, RepairPlanStepInfo] = [
    step1,
    step2,
    step3,
    step4,
  ];

  return {
    userId,
    topicKey: topic,
    topic,
    currentStage,
    stage,
    isRecovered: recoveryVerified,
    step1,
    step2,
    step3,
    step4,
    steps,
    events: {
      ...events,
      recoveryVerified,
    },
  };
}

/**
 * Records a repair progress event and returns the newly derived plan state.
 */
export function recordRepairEvent(
  userId: string = "guest",
  topicKey: string,
  event:
    | "concept_reviewed"
    | "drill_attempted"
    | "drill_completed"
    | "retest_done"
    | "retest_completed"
    | "recovery_verified",
  extraData?: { score?: number; accuracy?: number }
): TopicRepairState {
  const updates: Partial<TopicRepairPlanEvents> = {};
  const iso = new Date().toISOString();

  if (event === "concept_reviewed") {
    updates.conceptReviewed = true;
    updates.conceptReviewedAt = iso;
  } else if (event === "drill_attempted" || event === "drill_completed") {
    updates.drillAttempted = true;
    updates.drillAttemptedAt = iso;
    if (extraData?.score !== undefined) {
      updates.drillScore = extraData.score;
    }
  } else if (event === "retest_done" || event === "retest_completed") {
    updates.retestDone = true;
    updates.retestDoneAt = iso;
    if (extraData?.accuracy !== undefined) {
      updates.retestAccuracy = extraData.accuracy;
    }
  } else if (event === "recovery_verified") {
    updates.recoveryVerified = true;
    updates.recoveryVerifiedAt = iso;
  }

  saveTopicEvents(userId, topicKey, updates);
  return deriveTopicRepairPlan(userId, topicKey, []);
}
