/**
 * Authoritative Diagnostic Cycle Progress & Qualification Gate
 * 
 * Single source of truth driving:
 * 1. The dashboard's diagnostic-unlock status
 * 2. Next-action card state, progress counter & progress bar
 * 3. Top metrics row unlock status
 * 4. Cycle history and active cycle progression
 */

import { RecordedQuestionAttempt, RecordedTestAttempt } from "@/types";
import { CYCLE_WINDOW_SIZE } from "@/lib/cycle-engine";

export const DIAGNOSTIC_UNLOCK_THRESHOLD = CYCLE_WINDOW_SIZE; // 150

export interface AuthoritativeDiagnosticProgress {
  /** Whether the full diagnostic is unlocked (total qualifying >= 150) */
  isUnlocked: boolean;
  /** Total qualifying answered questions across all valid attempts */
  totalQualifyingAttempts: number;
  /** Number of fully completed 150-question cycles */
  completedCyclesCount: number;
  /** Active cycle number (1-indexed: Cycle 1 before 150, Cycle 2 from 150 to 299, etc.) */
  currentCycleNumber: number;
  /** Number of questions accumulated in the active cycle (0-149) */
  currentCycleQuestionCount: number;
  /** Standard cycle window size (150) */
  cycleWindowSize: number;
  /** Questions remaining to unlock the full diagnostic (0 when unlocked) */
  questionsToUnlock: number;
  /** Progress percentage towards initial 150-question unlock (0-100) */
  unlockProgressPercentage: number;
  /** Progress percentage within the current active cycle (0-100) */
  activeCycleProgressPercentage: number;
  /** Status badge identifier */
  statusBadge: "locked" | "unlocked";
  /** Authoritative status label */
  statusText: string;
  /** Clear human-readable progress description */
  progressText: string;
}

/**
 * Filter and deduplicate questions to identify eligible qualifying diagnostic attempts.
 * Rules:
 * - Must be answered (selectedOption is not null/undefined)
 * - Unique by (testId + questionId)
 */
export function countQualifyingQuestions(
  attempts: Array<RecordedQuestionAttempt | any>
): number {
  if (!attempts || !Array.isArray(attempts)) return 0;
  const seen = new Set<string>();
  let count = 0;

  for (const q of attempts) {
    if (q.selectedOption === null || q.selectedOption === undefined) continue;
    const testKey = (q.testId || q.mockId || q.sessionId || "test").toString().trim();
    const qKey = (q.questionId || (q.questionNumber !== undefined ? `q_${q.questionNumber}` : q.id || "q")).toString().trim();
    const canonicalKey = `${testKey}:::${qKey}`;
    if (seen.has(canonicalKey)) continue;
    seen.add(canonicalKey);
    count++;
  }

  return count;
}

/**
 * Extracts qualifying question count from RecordedTestAttempt array.
 */
export function countQualifyingFromTestAttempts(
  testAttempts: RecordedTestAttempt[]
): number {
  if (!testAttempts || !Array.isArray(testAttempts)) return 0;

  // Flatten all inner questions if present
  const allQuestions: any[] = [];
  let fallbackAttemptedSum = 0;

  for (const test of testAttempts) {
    if (Array.isArray(test.questions) && test.questions.length > 0) {
      test.questions.forEach((q) => {
        allQuestions.push({
          ...q,
          testId: test.testId || test.id,
        });
      });
    } else {
      fallbackAttemptedSum += test.attemptedCount || 0;
    }
  }

  if (allQuestions.length > 0) {
    return countQualifyingQuestions(allQuestions);
  }

  return fallbackAttemptedSum;
}

/**
 * Computes authoritative diagnostic progress state.
 * Reuses the 150-question cycle window architecture.
 */
export function computeAuthoritativeDiagnosticProgress(params: {
  totalAttempted: number;
  currentCycleNumber?: number;
  currentCycleQuestionCount?: number;
  completedCyclesCount?: number;
}): AuthoritativeDiagnosticProgress {
  const total = Math.max(0, Math.floor(params.totalAttempted || 0));
  const isUnlocked = total >= DIAGNOSTIC_UNLOCK_THRESHOLD;

  const completedCyclesCount =
    params.completedCyclesCount !== undefined && params.completedCyclesCount >= 0
      ? params.completedCyclesCount
      : Math.floor(total / DIAGNOSTIC_UNLOCK_THRESHOLD);

  const currentCycleNumber =
    params.currentCycleNumber !== undefined && params.currentCycleNumber > 0
      ? params.currentCycleNumber
      : completedCyclesCount + 1;

  // Real cycle questions within the active cycle
  const calculatedRemainder = total % DIAGNOSTIC_UNLOCK_THRESHOLD;
  let currentCycleQuestionCount: number;

  if (params.currentCycleQuestionCount !== undefined && params.currentCycleQuestionCount > 0) {
    currentCycleQuestionCount = params.currentCycleQuestionCount;
  } else if (total > 0 && calculatedRemainder > 0) {
    currentCycleQuestionCount = calculatedRemainder;
  } else {
    currentCycleQuestionCount = 0;
  }

  const questionsToUnlock = Math.max(0, DIAGNOSTIC_UNLOCK_THRESHOLD - total);
  const unlockProgressPercentage = Math.min(
    100,
    Math.round((total / DIAGNOSTIC_UNLOCK_THRESHOLD) * 100)
  );

  const activeCycleProgressPercentage = Math.min(
    100,
    Math.round((currentCycleQuestionCount / DIAGNOSTIC_UNLOCK_THRESHOLD) * 100)
  );

  const statusBadge = isUnlocked ? "unlocked" : "locked";
  const statusText = isUnlocked
    ? "Diagnostic unlocked"
    : "Diagnostic unlocks at 150 questions";

  let progressText: string;
  if (!isUnlocked) {
    progressText = `${total} of 150 questions`;
  } else if (currentCycleQuestionCount > 0) {
    progressText = `Cycle ${currentCycleNumber}: ${currentCycleQuestionCount} of 150 questions`;
  } else if (completedCyclesCount > 0) {
    progressText = `Cycle ${completedCyclesCount} completed • Ready for Cycle ${currentCycleNumber}`;
  } else {
    progressText = `Cycle ${currentCycleNumber}: 0 of 150 questions`;
  }

  return {
    isUnlocked,
    totalQualifyingAttempts: total,
    completedCyclesCount,
    currentCycleNumber,
    currentCycleQuestionCount,
    cycleWindowSize: DIAGNOSTIC_UNLOCK_THRESHOLD,
    questionsToUnlock,
    unlockProgressPercentage,
    activeCycleProgressPercentage,
    statusBadge,
    statusText,
    progressText,
  };
}
