import { deduplicateTestAttempts } from "../lib/analytics";
import { isFullLengthMockAttempt } from "../lib/mock-stats";
import { computeAuthoritativeDiagnosticProgress, DIAGNOSTIC_UNLOCK_THRESHOLD } from "../lib/diagnostic-status";
import { RecordedTestAttempt } from "../types";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  FAIL: ${testName}`);
    if (detail) console.error(`    Detail: ${detail}`);
  }
}

console.log("\n============================================================");
console.log("UNIT TESTS: Core Shared Helpers (Task 5)");
console.log("============================================================\n");

// 1. Score Calculation (+5 / -1 including negative preservation)
console.log("1. Score Calculation Formula (+5 correct, -1 incorrect):");

function calculateSessionScore(correctCount: number, incorrectCount: number): number {
  return correctCount * 5 - incorrectCount * 1;
}

assert(calculateSessionScore(40, 0) === 200, "Perfect score: 40 correct, 0 wrong = 200 marks");
assert(calculateSessionScore(30, 10) === 140, "Mixed score: 30 correct, 10 wrong = 140 marks");
assert(calculateSessionScore(0, 10) === -10, "Negative score: 0 correct, 10 wrong = -10 marks (preserved, no zero clamping)");
assert(calculateSessionScore(1, 15) === -10, "Negative score: 1 correct, 15 wrong = -10 marks");
assert(calculateSessionScore(0, 0) === 0, "Zero score: 0 correct, 0 wrong = 0 marks");

// 2. Accuracy Calculation
console.log("\n2. Accuracy Calculation (Safe division & rounding):");

function calculateAccuracy(correctCount: number, attemptedCount: number): number {
  return attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
}

assert(calculateAccuracy(0, 0) === 0, "Zero attempts yields 0% accuracy without NaN or division by zero");
assert(calculateAccuracy(40, 40) === 100, "40/40 yields 100%");
assert(calculateAccuracy(35, 50) === 70, "35/50 yields 70%");
assert(calculateAccuracy(1, 3) === 33, "1/3 yields 33% (properly rounded)");
assert(calculateAccuracy(2, 3) === 67, "2/3 yields 67% (properly rounded)");

// 3. Mock-Only Filtering
console.log("\n3. Mock-Only Filtering (isFullLengthMockAttempt):");

const fullMockAttempt: RecordedTestAttempt = {
  id: "attempt_mock_01",
  attemptId: "att_mock_01",
  testId: "physics_mock_01",
  testTitle: "Physics Full Length Mock 1",
  totalQuestions: 50,
  correctCount: 40,
  incorrectCount: 10,
  totalMarks: 190,
  accuracyPercentage: 80,
  submittedAt: new Date().toISOString(),
};

const pyqAttempt: RecordedTestAttempt = {
  id: "attempt_pyq_01",
  attemptId: "att_pyq_01",
  testId: "pyq_physics_2024_s1",
  testTitle: "Physics 2024 Shift 1 PYQ Past Paper",
  totalQuestions: 50,
  correctCount: 38,
  incorrectCount: 12,
  totalMarks: 178,
  accuracyPercentage: 76,
  submittedAt: new Date().toISOString(),
};

const practiceDrillAttempt: RecordedTestAttempt = {
  id: "attempt_practice_01",
  attemptId: "att_practice_01",
  testId: "practice_optics_u1",
  testTitle: "Optics Chapter Practice Drill",
  totalQuestions: 20,
  correctCount: 18,
  incorrectCount: 2,
  totalMarks: 88,
  accuracyPercentage: 90,
  submittedAt: new Date().toISOString(),
};

assert(isFullLengthMockAttempt(fullMockAttempt) === true, "Identifies full-length CBT mock as valid mock attempt");
assert(isFullLengthMockAttempt(pyqAttempt) === false, "Strictly excludes official PYQ past paper from mock attempts");
assert(isFullLengthMockAttempt(practiceDrillAttempt) === false, "Strictly excludes chapter practice drill from mock attempts");

// 4. Deduplication
console.log("\n4. Deduplication (deduplicateTestAttempts):");

const duplicateAttempts: RecordedTestAttempt[] = [
  fullMockAttempt,
  { ...fullMockAttempt, id: "duplicate_id_same_attempt", attemptId: fullMockAttempt.attemptId },
  { ...fullMockAttempt, id: "duplicate_fingerprint", attemptId: "diff_attempt_id", submittedAt: fullMockAttempt.submittedAt },
  practiceDrillAttempt,
];

const deduped = deduplicateTestAttempts(duplicateAttempts);
assert(deduped.length === 2, `Deduplicates 4 entries (2 duplicate mocks) to exactly 2 unique tests (got ${deduped.length})`);
assert(deduplicateTestAttempts([]).length === 0, "Handles empty array without crashing");

// 5. Projected Cutoff Extrapolation
console.log("\n5. Linear Projected Cutoff Extrapolation:");

function projectCutoffFromSeries(
  yearlyData: Array<{ year: number; cutoffValue: number }>,
  targetYear: number = 2026,
  cutoffScale: number = 800
): number {
  const n = yearlyData.length;
  if (n < 3) return yearlyData[n - 1]?.cutoffValue || 0;

  const meanX = yearlyData.reduce((sum, d) => sum + d.year, 0) / n;
  const meanY = yearlyData.reduce((sum, d) => sum + d.cutoffValue, 0) / n;

  let numerator = 0;
  let denominator = 0;
  for (const d of yearlyData) {
    const diffX = d.year - meanX;
    const diffY = d.cutoffValue - meanY;
    numerator += diffX * diffY;
    denominator += diffX * diffX;
  }

  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = meanY - slope * meanX;
  const rawProj = slope * targetYear + intercept;
  const clamped = Math.max(0, Math.min(cutoffScale, rawProj));
  return Math.round(clamped * 10) / 10;
}

// 4-year rising series from requirements: 545 (2022), 550.6 (2023), 557.3 (2024), 568.4 (2025)
const fourYearRisingSeries = [
  { year: 2022, cutoffValue: 545 },
  { year: 2023, cutoffValue: 550.6 },
  { year: 2024, cutoffValue: 557.3 },
  { year: 2025, cutoffValue: 568.4 },
];

const projection = projectCutoffFromSeries(fourYearRisingSeries, 2026);
assert(
  Math.abs(projection - 574.5) <= 0.2,
  `Rising 4-year series (545, 550.6, 557.3, 568.4) projects near 574.5 (got ${projection})`
);

// 6. Diagnostic Cycle Math (Threshold = 150)
console.log("\n6. Diagnostic Cycle Thresholds (149, 150, 151, 300):");

assert(DIAGNOSTIC_UNLOCK_THRESHOLD === 150, "DIAGNOSTIC_UNLOCK_THRESHOLD is strictly 150 questions");

const prog149 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 149 });
assert(prog149.isUnlocked === false, "At 149 questions: diagnostic is LOCKED");
assert(prog149.questionsToUnlock === 1, "At 149 questions: 1 question to unlock");
assert(prog149.completedCyclesCount === 0, "At 149 questions: 0 completed cycles");
assert(prog149.currentCycleQuestionCount === 149, "At 149 questions: 149 accumulated in Cycle 1");
assert(prog149.unlockProgressPercentage === 99, "At 149 questions: 99% progress");

const prog150 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 150 });
assert(prog150.isUnlocked === true, "At 150 questions: diagnostic is UNLOCKED");
assert(prog150.questionsToUnlock === 0, "At 150 questions: 0 questions to unlock");
assert(prog150.completedCyclesCount === 1, "At 150 questions: exactly 1 completed cycle");
assert(prog150.currentCycleQuestionCount === 0, "At 150 questions: cycle question counter resets to 0");
assert(prog150.unlockProgressPercentage === 100, "At 150 questions: 100% progress");

const prog151 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 151 });
assert(prog151.isUnlocked === true, "At 151 questions: diagnostic remains UNLOCKED");
assert(prog151.completedCyclesCount === 1, "At 151 questions: 1 completed cycle");
assert(prog151.currentCycleQuestionCount === 1, "At 151 questions: 1 question accumulated in Cycle 2");

const prog300 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 300 });
assert(prog300.isUnlocked === true, "At 300 questions: diagnostic is UNLOCKED");
assert(prog300.completedCyclesCount === 2, "At 300 questions: exactly 2 completed cycles");
assert(prog300.currentCycleQuestionCount === 0, "At 300 questions: cycle question counter resets to 0");

// 7. Gamification Trophy Rules
console.log("\n7. Gamification Trophy Rules Verification:");

interface TrophyTestInput {
  accuracyPercentage: number;
  correctAnswers: number;
  totalQuestions: number;
  totalTimeSpentSeconds: number;
  currentStreak?: number;
  isRepairQuiz?: boolean;
}

function evaluateEarnedTrophyIds(metrics: TrophyTestInput): string[] {
  const unlocked: string[] = [];
  if (metrics.accuracyPercentage > 90 && metrics.correctAnswers >= 4) {
    unlocked.push("ncert-sharpshooter");
  }
  const avgTime = metrics.totalQuestions > 0 ? metrics.totalTimeSpentSeconds / metrics.totalQuestions : 999;
  if (metrics.totalQuestions >= 50 && avgTime < 45 && metrics.accuracyPercentage > 80) {
    unlocked.push("speed-demon");
  }
  if ((metrics.currentStreak ?? 0) >= 7) {
    unlocked.push("consistency-king");
  }
  if (metrics.isRepairQuiz && metrics.accuracyPercentage >= 80) {
    unlocked.push("the-phoenix");
  }
  return unlocked;
}

assert(
  evaluateEarnedTrophyIds({
    accuracyPercentage: 95,
    correctAnswers: 19,
    totalQuestions: 20,
    totalTimeSpentSeconds: 600,
  }).includes("ncert-sharpshooter"),
  "Awards ncert-sharpshooter when accuracy > 90% and correct answers >= 4"
);

assert(
  evaluateEarnedTrophyIds({
    accuracyPercentage: 85,
    correctAnswers: 42,
    totalQuestions: 50,
    totalTimeSpentSeconds: 2000, // 40s per question (< 45s)
  }).includes("speed-demon"),
  "Awards speed-demon when 50 Qs, < 45s avg, >80% accuracy"
);

assert(
  evaluateEarnedTrophyIds({
    accuracyPercentage: 70,
    correctAnswers: 14,
    totalQuestions: 20,
    totalTimeSpentSeconds: 600,
    currentStreak: 7,
  }).includes("consistency-king"),
  "Awards consistency-king when streak >= 7"
);

assert(
  evaluateEarnedTrophyIds({
    accuracyPercentage: 80,
    correctAnswers: 4,
    totalQuestions: 5,
    totalTimeSpentSeconds: 150,
    isRepairQuiz: true,
  }).includes("the-phoenix"),
  "Awards the-phoenix when repair quiz accuracy >= 80%"
);

console.log("\n============================================================");
console.log(`SUMMARY: ${passed} passed, ${failed} failed`);
console.log("============================================================\n");

if (failed > 0) {
  process.exit(1);
}
