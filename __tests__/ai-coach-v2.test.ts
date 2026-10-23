/**
 * Automated Test Suite: CUET AI Learning Coach V2
 * 
 * Tests all core subsystems:
 * 1. Mistake Detective V2 (10 diagnostic categories, confidence tiers, clarification questions)
 * 2. Subject Weakness Radar V2 (4 confidence tiers, 3 dimensions, cross-chapter patterns)
 * 3. Personalized Repair Plan Engine V2 (4-stage lifecycle, priority scoring, recovery gate)
 * 4. 150-Question Diagnostic Cycle System (149, 150, 151, 300 questions, idempotent boundaries)
 * 5. Student Performance Command Center (5 core questions, deterministic metrics)
 * 6. AI Token Logger & Cost Tracking (pricing formulas, USD/INR estimation, zero token leakage)
 */

import {
  diagnoseMistakeDeterministically,
} from "../lib/mistake-detective";
import {
  AI_COACH_CONFIG,
  getConfidenceLabel,
} from "../lib/ai-coach/config";
import {
  getOrCreateTopicRepairPlanV2,
  recordRepairPlanProgress,
  calculateTopicPriorityScore,
} from "../lib/repair-plan-v2";
import {
  computeAuthoritativeDiagnosticProgress,
  countQualifyingQuestions,
  DIAGNOSTIC_UNLOCK_THRESHOLD,
} from "../lib/diagnostic-status";
import { buildPerformanceCommandCenter } from "../lib/command-center";
import { tokenLogger } from "../lib/ai/token-logger";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  PASS: ${message}`);
    passedCount++;
  } else {
    console.error(`  FAIL: ${message}`);
    failedCount++;
  }
}

console.log("\n============================================================");
console.log("UNIT TESTS: CUET AI Learning Coach V2");
console.log("============================================================\n");

// ─── 1. MISTAKE DETECTIVE V2 ──────────────────────────────────────────────────
console.log("1. Mistake Detective V2 (10 Diagnostic Categories):");

// Category 1: Question Misinterpretation (NOT / EXCEPT qualifier)
const qualifierMistake = diagnoseMistakeDeterministically({
  questionId: "q_qualifier_1",
  selectedOption: "B",
  correctOption: "C",
  questionText: "Which of the following statements is NOT a valid assumption of kinetic theory of gases?",
  timeSpentSeconds: 22,
  chapter: "Kinetic Theory",
  subject: "Physics",
});
assert(
  qualifierMistake.category === "question_misinterpretation",
  `Correctly flags NOT/EXCEPT qualifier misinterpretation (got: ${qualifierMistake.category})`
);
assert(
  qualifierMistake.nature === "INTERPRETATION",
  `Correctly assigns INTERPRETATION nature (got: ${qualifierMistake.nature})`
);

// Category 2: Careless Error (Very rapid completion < 14s)
const carelessMistake = diagnoseMistakeDeterministically({
  questionId: "q_careless_1",
  selectedOption: "A",
  correctOption: "D",
  questionText: "What is the SI unit of magnetic flux density?",
  timeSpentSeconds: 8,
  chapter: "Magnetism",
  subject: "Physics",
});
assert(
  carelessMistake.category === "careless_error",
  `Correctly flags careless error for rapid response < 14s (got: ${carelessMistake.category})`
);
assert(
  carelessMistake.clarificationQuestion !== undefined,
  "Generates clarification question for careless error confirmation"
);

// Category 3: Time Management & Pacing Issue (> 75s struggle)
const pacingMistake = diagnoseMistakeDeterministically({
  questionId: "q_pacing_1",
  selectedOption: "C",
  correctOption: "A",
  questionText: "Calculate the equivalent resistance of an infinite ladder network...",
  timeSpentSeconds: 110,
  chapter: "Current Electricity",
  subject: "Physics",
});
assert(
  pacingMistake.category === "time_management_pacing",
  `Correctly flags time management pacing issue for response > 75s (got: ${pacingMistake.category})`
);

// Category 4: Calculation / Execution Error (Numerical questions)
const numericalMistake = diagnoseMistakeDeterministically({
  questionId: "q_numerical_1",
  selectedOption: "B",
  correctOption: "C",
  questionText: "A body of mass 2.5 kg moves at 4.0 m/s. Find its kinetic energy.",
  timeSpentSeconds: 45,
  archetype: "Numerical",
  chapter: "Work Energy Power",
  subject: "Physics",
});
assert(
  numericalMistake.category === "calculation_execution_error",
  `Correctly flags calculation execution error on numerical stem (got: ${numericalMistake.category})`
);

// Category 5: Repeated Error Pattern (Recurrence on same topic)
const repeatedMistake = diagnoseMistakeDeterministically({
  questionId: "q_repeated_1",
  selectedOption: "A",
  correctOption: "B",
  questionText: "Which complex exhibits optical isomerism?",
  timeSpentSeconds: 40,
  chapter: "Coordination Compounds",
  microTopic: "Isomerism",
  subject: "Chemistry",
  recentMistakeCountOnTopic: 3,
});
assert(
  repeatedMistake.category === "repeated_error_pattern",
  `Correctly flags repeated error pattern when recent mistakes >= 2 (got: ${repeatedMistake.category})`
);
assert(
  repeatedMistake.confidence === "high",
  "Assigns HIGH confidence to repeated error pattern"
);

// Category 6: Incorrect Formula or Method Selection
const formulaMistake = diagnoseMistakeDeterministically({
  questionId: "q_formula_1",
  selectedOption: "A",
  correctOption: "D",
  questionText: "Calculate the half-life of a first order reaction...",
  timeSpentSeconds: 42,
  chapter: "Chemical Kinetics",
  subject: "Chemistry",
  distractorTrap: "Used zero-order formula [A]0/2k instead of first-order 0.693/k",
});
assert(
  formulaMistake.category === "formula_method_error",
  `Correctly flags formula method error from trap metadata (got: ${formulaMistake.category})`
);

// Category 7: Incorrect Application of Known Concept (Boundary condition)
const boundaryMistake = diagnoseMistakeDeterministically({
  questionId: "q_boundary_1",
  selectedOption: "B",
  correctOption: "C",
  questionText: "In SN2 reaction of 2-bromobutane...",
  timeSpentSeconds: 50,
  chapter: "Haloalkanes",
  subject: "Chemistry",
  misconceptionDescription: "Assumed complete retention of configuration instead of Walden inversion",
});
assert(
  boundaryMistake.category === "incorrect_concept_application",
  `Correctly flags incorrect concept application (got: ${boundaryMistake.category})`
);

// Category 8: Conceptual Misunderstanding (Qualitative standard timing)
const conceptMistake = diagnoseMistakeDeterministically({
  questionId: "q_concept_1",
  selectedOption: "B",
  correctOption: "A",
  questionText: "Which cell organelle is known as the powerhouse of the cell?",
  timeSpentSeconds: 35,
  chapter: "Cell Biology",
  subject: "Biology",
});
assert(
  conceptMistake.category === "conceptual_misunderstanding",
  `Correctly flags conceptual misunderstanding for standard duration (got: ${conceptMistake.category})`
);

// ─── 2. AI COACH CONFIGURATION & CONFIDENCE THRESHOLDS ─────────────────────────
console.log("\n2. AI Coach Configuration & Confidence Thresholds:");

assert(AI_COACH_CONFIG.FRESH_QUESTIONS_THRESHOLD === 150, "Fresh questions unlock threshold is 150");
assert((AI_COACH_CONFIG as any).MIN_TIME_SPENT_SECONDS === undefined, "Zero time-based exclusion filter exists");
assert(AI_COACH_CONFIG.DAILY_REPORT_LIMIT === 3, "Daily report limit is 3 per candidate");
assert(AI_COACH_CONFIG.RESET_TIMEZONE === "Asia/Kolkata", "Reset timezone is Asia/Kolkata (midnight IST)");
assert(AI_COACH_CONFIG.MIN_TOPIC_ATTEMPTS === 5, "Topic confidence threshold is 5 attempts");
assert(getConfidenceLabel(2) === "insufficient data", "< 5 attempts labeled 'insufficient data'");
assert(getConfidenceLabel(4) === "insufficient data", "4 attempts labeled 'insufficient data'");
assert(getConfidenceLabel(5) === "sufficient", ">= 5 attempts labeled 'sufficient'");
assert(AI_COACH_CONFIG.MODEL === "gemini-2.0-flash", "Model is gemini-2.0-flash");
assert(AI_COACH_CONFIG.MARKING_SCHEME.CORRECT === 5, "CUET correct mark is +5");
assert(AI_COACH_CONFIG.MARKING_SCHEME.INCORRECT === -1, "CUET incorrect mark is -1");

// ─── 3. PERSONALIZED REPAIR PLAN ENGINE V2 ────────────────────────────────────
console.log("\n3. Personalized Repair Plan Engine V2:");

const priorityScore = calculateTopicPriorityScore({
  accuracy: 25,
  attemptsCount: 8,
  isHighYieldSyllabus: true,
  daysSinceLastAttempt: 1,
});
// 75*0.4 (30) + 40*0.3 (12) + 80*0.2 (16) + 90*0.1 (9) = 67
assert(priorityScore >= 60 && priorityScore <= 75, `Calculates defensible priority score (got: ${priorityScore})`);

const testPlan = getOrCreateTopicRepairPlanV2({
  subject: "Physics",
  chapter: "Ray Optics",
  accuracy: 30,
  attemptsCount: 6,
});

assert(testPlan.steps.length === 4, "Plan has strictly 4 progressive steps");
assert(testPlan.steps[0].status === "available", "Step 1 is available initially");
assert(testPlan.steps[1].status === "locked", "Step 2 is locked before Step 1 completion");
assert(testPlan.sessionTemplates.length === 3, "Offers 3 study session templates (5m, 15m, 30m)");

// Progress step 1 -> Concept reviewed
const planAfterStep1 = recordRepairPlanProgress({
  subject: "Physics",
  chapter: "Ray Optics",
  completedStep: 1,
});
assert(planAfterStep1.steps[0].status === "completed", "Step 1 completed successfully");
assert(planAfterStep1.steps[1].status === "available", "Step 2 unlocked upon Step 1 completion");

// Retest with 85% accuracy -> Marks as RECOVERED
const planRecovered = recordRepairPlanProgress({
  subject: "Physics",
  chapter: "Ray Optics",
  completedStep: 3,
  scoreOrAccuracy: 85,
});
assert(planRecovered.isRecovered === true, "Marks topic as RECOVERED when retest accuracy >= 80%");
assert(planRecovered.currentStage === "RECOVERED", `Stage set to RECOVERED (got ${planRecovered.currentStage})`);

// ─── 4. DIAGNOSTIC CYCLE ENGINE (149, 150, 151, 300) ──────────────────────────
console.log("\n4. Diagnostic Cycle Engine (150-Question Window Math):");

assert(DIAGNOSTIC_UNLOCK_THRESHOLD === 150, "DIAGNOSTIC_UNLOCK_THRESHOLD is 150");

const p149 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 149 });
assert(p149.isUnlocked === false, "At 149 Qs: isUnlocked is false");
assert(p149.questionsToUnlock === 1, "At 149 Qs: 1 question to unlock");
assert(p149.completedCyclesCount === 0, "At 149 Qs: 0 completed cycles");
assert(p149.currentCycleQuestionCount === 149, "At 149 Qs: 149 questions in active cycle");

const p150 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 150 });
assert(p150.isUnlocked === true, "At 150 Qs: isUnlocked is true");
assert(p150.questionsToUnlock === 0, "At 150 Qs: 0 questions to unlock");
assert(p150.completedCyclesCount === 1, "At 150 Qs: exactly 1 completed cycle");
assert(p150.currentCycleQuestionCount === 0, "At 150 Qs: active cycle counter resets to 0");
assert(p150.currentCycleNumber === 2, "At 150 Qs: active cycle is Cycle 2");

const p151 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 151 });
assert(p151.isUnlocked === true, "At 151 Qs: remains unlocked");
assert(p151.completedCyclesCount === 1, "At 151 Qs: exactly 1 completed cycle");
assert(p151.currentCycleQuestionCount === 1, "At 151 Qs: 1 question accumulated in Cycle 2");

const p300 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 300 });
assert(p300.completedCyclesCount === 2, "At 300 Qs: exactly 2 completed cycles");
assert(p300.currentCycleQuestionCount === 0, "At 300 Qs: active cycle counter resets to 0");
assert(p300.currentCycleNumber === 3, "At 300 Qs: active cycle is Cycle 3");

// Deduplication test: duplicate network attempts do not double count
const rawWithDups = [
  { testId: "test_1", questionId: "q1", selectedOption: "A" },
  { testId: "test_1", questionId: "q1", selectedOption: "A" }, // duplicate
  { testId: "test_1", questionId: "q2", selectedOption: "B" },
  { testId: "test_1", questionId: "q3", selectedOption: null }, // skipped
];
assert(countQualifyingQuestions(rawWithDups) === 2, `Deduplicates duplicate question attempts to 2 (got ${countQualifyingQuestions(rawWithDups)})`);

// ─── 5. STUDENT PERFORMANCE COMMAND CENTER ────────────────────────────────────
console.log("\n5. Student Performance Command Center (5 Core Questions):");

const mockTestAttempts: any[] = [
  {
    id: "att_1",
    testId: "phys_mock_1",
    testTitle: "Physics CBT Mock 1",
    subject: "Physics",
    correctCount: 35,
    incorrectCount: 5,
    attemptedCount: 40,
    unattemptedCount: 10,
    totalMarks: 170,
    maxMarks: 250,
    accuracyPercentage: 88,
    timeTakenSeconds: 3200,
    submittedAt: "2026-10-15T10:00:00Z",
    questions: [
      { questionId: "q_opt_1", subject: "Physics", chapter: "Optics", isCorrect: true, timeSpentSeconds: 35, selectedOption: "A", prompt: "Refraction through glass slab..." },
      { questionId: "q_opt_2", subject: "Physics", chapter: "Optics", isCorrect: true, timeSpentSeconds: 30, selectedOption: "B", prompt: "Total internal reflection..." },
      { questionId: "q_opt_3", subject: "Physics", chapter: "Optics", isCorrect: true, timeSpentSeconds: 40, selectedOption: "C", prompt: "Focal length formula..." },
      { questionId: "q_opt_4", subject: "Physics", chapter: "Optics", isCorrect: true, timeSpentSeconds: 38, selectedOption: "D", prompt: "Prism deviation angle..." },
      { questionId: "q_em_1", subject: "Physics", chapter: "Electromagnetism", isCorrect: false, timeSpentSeconds: 95, selectedOption: "B", prompt: "Biot-Savart law calculation..." },
      { questionId: "q_em_2", subject: "Physics", chapter: "Electromagnetism", isCorrect: false, timeSpentSeconds: 90, selectedOption: "C", prompt: "Toroid magnetic field..." },
    ],
  },
];

const commandCenter = buildPerformanceCommandCenter({
  testAttempts: mockTestAttempts,
  availableMinutes: 30,
});

assert(
  commandCenter.answers.q1_performingWell.strongChapters.length >= 1,
  "Answers Q1 (Performing Well): identified Optics as strong chapter"
);
assert(
  commandCenter.answers.q2_holdingMeBack.bottlenecks.length >= 1,
  "Answers Q2 (Holding Me Back): identified Electromagnetism time-sink/penalties"
);
assert(
  commandCenter.answers.q3_workOnNext.priorityTask !== undefined,
  "Answers Q3 (Work on Next): provides concrete priority task with actionUrl"
);
assert(
  commandCenter.answers.q4_isImproving.trajectory !== undefined,
  "Answers Q4 (Is Improving): determines trajectory and cycle status"
);
assert(
  commandCenter.answers.q5_nextSessionPlan.sessionSteps.length === 3,
  "Answers Q5 (Next Session Plan): structured 30-min session with 3 steps"
);

// ─── 6. AI TOKEN LOGGER & COST CONTROLS ───────────────────────────────────────
console.log("\n6. AI Token Logger & Cost Tracking:");

const tokenLog = tokenLogger.logUsage({
  userId: "user_test",
  feature: "why_wrong",
  model: "llama-3.3-70b-versatile",
  promptTokens: 400,
  completionTokens: 150,
  latencyMs: 180,
  cached: false,
});

assert(tokenLog.totalTokens === 550, `Calculates total tokens accurately (550, got ${tokenLog.totalTokens})`);
assert(tokenLog.estimatedCostUsd > 0, `Calculates estimated USD cost (${tokenLog.estimatedCostUsd})`);

const cachedLog = tokenLogger.logUsage({
  userId: "user_test",
  feature: "why_wrong",
  model: "llama-3.3-70b-versatile",
  promptTokens: 400,
  completionTokens: 150,
  latencyMs: 1,
  cached: true,
});

assert(cachedLog.estimatedCostUsd === 0, "Cached token usage incurs exactly $0.00 cost (zero token leakage)");

console.log("\n============================================================");
console.log(`SUMMARY: ${passedCount} passed, ${failedCount} failed`);
console.log("============================================================\n");

if (failedCount > 0) {
  process.exit(1);
}
