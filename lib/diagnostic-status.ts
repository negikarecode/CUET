/**
 * Authoritative Diagnostic Cycle Progress & Qualification Gate
 * 
 * Single source of truth driving:
 * 1. The dashboard's diagnostic-unlock status
 * 2. Next-action card state, progress counter & progress bar
 * 3. Top metrics row unlock status
 * 4. Cycle history and active cycle progression
 * 5. Profile AI calibration progress meter
 */

import { RecordedQuestionAttempt, RecordedTestAttempt } from "@/types";
import { DiagnosticCycle } from "@/types/cycle";
import {
  CYCLE_WINDOW_SIZE,
  computeCycleMetrics,
  compareDiagnosticCycles,
} from "@/lib/cycle-engine";
import { deduplicateTestAttempts, getCanonicalTestKey } from "@/lib/analytics";

export const DIAGNOSTIC_UNLOCK_THRESHOLD = CYCLE_WINDOW_SIZE; // 150

export interface AuthoritativeDiagnosticProgress {
  /** Whether the full diagnostic is unlocked (total qualifying >= 150) */
  isUnlocked: boolean;
  /** Total qualifying answered questions across all valid attempts */
  totalQualifyingAttempts: number;
  /** Number of fully completed 150-question cycles: floor(total / 150) */
  completedCyclesCount: number;
  /** Active cycle number (1-indexed: Cycle 1 before 150, Cycle 2 from 150 to 299, etc.) */
  currentCycleNumber: number;
  /** Number of questions accumulated in the active cycle (0-149): total mod 150 */
  currentCycleQuestionCount: number;
  /** Standard cycle window size (150) */
  cycleWindowSize: number;
  /** Questions remaining to unlock the full diagnostic (0 when unlocked) */
  questionsToUnlock: number;
  /** Progress percentage towards initial 150-question unlock (0-100) */
  unlockProgressPercentage: number;
  /** Progress percentage within the current active cycle (0-100): currentCycleQuestionCount / 150 */
  activeCycleProgressPercentage: number;
  /** Status badge identifier */
  statusBadge: "locked" | "unlocked";
  /** Authoritative status label */
  statusText: string;
  /** Clear human-readable progress description */
  progressText: string;
}

export interface DerivedActiveCycle {
  cycleNumber: number;
  questionCount: number;
  progressPercentage: number;
  accuracyPercentage: number;
  questions: RecordedQuestionAttempt[];
}

export interface DiagnosticProgressResult extends AuthoritativeDiagnosticProgress {
  /** Array of completed 150-question cycles, each with its own non-overlapping questions slice */
  completedCycles: DiagnosticCycle[];
  /** In-progress active cycle */
  activeCycle: DerivedActiveCycle;
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
    if (q.isLowEffort) continue;
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

  const clean = deduplicateTestAttempts(testAttempts);
  const seen = new Set<string>();
  let count = 0;

  for (const test of clean) {
    if ((test as any).isLowEffort) continue;
    const testKey = getCanonicalTestKey(test);
    if (Array.isArray(test.questions) && test.questions.length > 0) {
      for (const q of test.questions) {
        if (q.selectedOption === null || q.selectedOption === undefined) continue;
        if (q.isLowEffort) continue;
        let qKey = (q.questionId || (q.questionNumber !== undefined ? `q_${q.questionNumber}` : "q")).toString().trim();
        if (q.questionNumber) {
          qKey = `q_${q.questionNumber}`;
        } else if (qKey.includes("_q_")) {
          qKey = `q_${qKey.split("_q_")[1]}`;
        }
        const key = `${testKey}:::${qKey}`;
        if (seen.has(key)) continue;
        seen.add(key);
        count++;
      }
    } else {
      // Fallback for compact summaries without full question arrays
      count += test.attemptedCount || 0;
    }
  }

  return count;
}

/**
 * Single source of truth selector that DERIVES diagnostic progress and cycle history
 * directly from deduplicated question attempts.
 * 
 * Invariants:
 * 1. Completed cycles = floor(totalQuestions / 150).
 * 2. Current cycle number = completed + 1.
 * 3. Progress in current cycle = totalQuestions mod 150.
 * 4. For each completed cycle, accuracy and questions come from its own chronological slice.
 * 5. Questions of tests crossing boundaries are split by order without overlap.
 */
export function getDiagnosticProgress(
  input?: RecordedTestAttempt[] | { attempts?: RecordedTestAttempt[]; userId?: string } | string
): DiagnosticProgressResult {
  let attempts: RecordedTestAttempt[] = [];

  if (Array.isArray(input)) {
    attempts = input;
  } else if (input && typeof input === "object" && Array.isArray(input.attempts)) {
    attempts = input.attempts;
  }

  // 1. Authoritative deduplication of test sessions
  const cleanTests = deduplicateTestAttempts(attempts);

  // 2. Sort test sessions chronologically (earliest first)
  const sortedTests = [...cleanTests].sort((a, b) => {
    const tA = new Date(a.submittedAt || (a as any).date || (a as any).createdAt || 0).getTime();
    const tB = new Date(b.submittedAt || (b as any).date || (b as any).createdAt || 0).getTime();
    return tA - tB;
  });

  // 3. Extract unique qualifying question attempts ordered by time
  const seenQuestionKeys = new Set<string>();
  const qualifyingQuestions: RecordedQuestionAttempt[] = [];

  for (const test of sortedTests) {
    if ((test as any).isLowEffort) continue;
    const testKey = getCanonicalTestKey(test);
    const questions = test.questions || [];
    for (const q of questions) {
      if (q.selectedOption === null || q.selectedOption === undefined) continue;
      if (q.isLowEffort) continue;
      const qKey = (q.questionId || (q.questionNumber !== undefined ? `q_${q.questionNumber}` : "q")).toString().trim();
      const canonicalKey = `${testKey}:::${qKey}`;
      if (seenQuestionKeys.has(canonicalKey)) continue;
      seenQuestionKeys.add(canonicalKey);

      qualifyingQuestions.push({
        ...q,
        testId: test.testId || test.id,
        submittedAt: test.submittedAt,
      } as any);
    }
  }

  // If question arrays were stripped/compacted, fall back to attempted counts
  let totalQualifyingAttempts = qualifyingQuestions.length;
  if (totalQualifyingAttempts === 0 && cleanTests.length > 0) {
    totalQualifyingAttempts = cleanTests.reduce((sum, t) => sum + (t.attemptedCount || 0), 0);
  }

  // 4. Mathematical derivations (strictly derived, never stored)
  const completedCyclesCount = Math.floor(totalQualifyingAttempts / DIAGNOSTIC_UNLOCK_THRESHOLD);
  const currentCycleNumber = completedCyclesCount + 1;
  const currentCycleQuestionCount = totalQualifyingAttempts % DIAGNOSTIC_UNLOCK_THRESHOLD;
  const isUnlocked = totalQualifyingAttempts >= DIAGNOSTIC_UNLOCK_THRESHOLD;
  const questionsToUnlock = Math.max(0, DIAGNOSTIC_UNLOCK_THRESHOLD - totalQualifyingAttempts);

  const unlockProgressPercentage = Math.min(
    100,
    Math.round((totalQualifyingAttempts / DIAGNOSTIC_UNLOCK_THRESHOLD) * 100)
  );

  const activeCycleProgressPercentage = Math.min(
    100,
    Math.round((currentCycleQuestionCount / DIAGNOSTIC_UNLOCK_THRESHOLD) * 100)
  );

  // 5. Build completed cycles array (each from its own slice, ordered by time)
  const completedCycles: DiagnosticCycle[] = [];
  for (let c = 0; c < completedCyclesCount; c++) {
    const cycleNum = c + 1;
    const startIndex = c * DIAGNOSTIC_UNLOCK_THRESHOLD;
    const endIndex = startIndex + DIAGNOSTIC_UNLOCK_THRESHOLD;
    const slice = qualifyingQuestions.slice(startIndex, endIndex);

    const startedAt = (slice[0] as any)?.submittedAt || new Date().toISOString();
    const completedAt = (slice[slice.length - 1] as any)?.submittedAt || new Date().toISOString();

    const cycleMetric = computeCycleMetrics(slice, cycleNum, startedAt, completedAt);

    // If Cycle >= 2, run comparison against Cycle N - 1 and compare vs Cycle 1
    if (cycleNum > 1 && completedCycles.length > 0) {
      const prevCycle = completedCycles[c - 1];
      if (prevCycle) {
        cycleMetric.comparison = compareDiagnosticCycles(prevCycle, cycleMetric);
      }
    }

    completedCycles.push(cycleMetric);
  }

  // 6. Active in-progress cycle slice
  const activeSlice = qualifyingQuestions.slice(completedCyclesCount * DIAGNOSTIC_UNLOCK_THRESHOLD);
  const activeCorrect = activeSlice.filter((q) => q.isCorrect === true).length;
  const activeAccuracy =
    activeSlice.length > 0 ? Math.round((activeCorrect / activeSlice.length) * 100) : 0;

  const activeCycle: DerivedActiveCycle = {
    cycleNumber: currentCycleNumber,
    questionCount: currentCycleQuestionCount,
    progressPercentage: activeCycleProgressPercentage,
    accuracyPercentage: activeAccuracy,
    questions: activeSlice,
  };

  const statusBadge = isUnlocked ? "unlocked" : "locked";
  const statusText = isUnlocked
    ? "Diagnostic unlocked"
    : "Diagnostic unlocks at 150 questions";

  let progressText: string;
  if (!isUnlocked) {
    progressText = `${totalQualifyingAttempts} of 150 questions`;
  } else if (currentCycleQuestionCount > 0) {
    progressText = `Cycle ${currentCycleNumber}: ${currentCycleQuestionCount} of 150 questions`;
  } else if (completedCyclesCount > 0) {
    progressText = `Cycle ${completedCyclesCount} completed • Ready for Cycle ${currentCycleNumber}`;
  } else {
    progressText = `Cycle ${currentCycleNumber}: 0 of 150 questions`;
  }

  return {
    isUnlocked,
    totalQualifyingAttempts,
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
    completedCycles,
    activeCycle,
  };
}

/**
 * Backwards-compatible progress calculator.
 * Ensures completedCyclesCount is ALWAYS capped at floor(totalAttempted / 150)
 * so drifting counters or stale stores can never artificially advance cycles.
 */
export function computeAuthoritativeDiagnosticProgress(params: {
  totalAttempted: number;
  currentCycleNumber?: number;
  currentCycleQuestionCount?: number;
  completedCyclesCount?: number;
}): AuthoritativeDiagnosticProgress {
  const total = Math.max(0, Math.floor(params.totalAttempted || 0));
  const isUnlocked = total >= DIAGNOSTIC_UNLOCK_THRESHOLD;

  // Authoritative math: completed cycles can NEVER exceed floor(total / 150)
  const maxPossibleCompleted = Math.floor(total / DIAGNOSTIC_UNLOCK_THRESHOLD);
  const completedCyclesCount = maxPossibleCompleted;
  const currentCycleNumber = completedCyclesCount + 1;
  const currentCycleQuestionCount = total % DIAGNOSTIC_UNLOCK_THRESHOLD;

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
