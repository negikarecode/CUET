import {
  computeUserSubjectPerformance,
  resolveCourseRequirements,
  computeMultiYearCutoff,
  evaluateChanceBand,
  computeDreamCollegeGap,
  UserSubjectPerformance,
} from "../lib/standing-engine";
import { STANDING_CONFIG } from "../lib/config/standingConfig";
import { RecordedTestAttempt, RecordedQuestionAttempt } from "../types";

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

function createAttempt(params: {
  testId: string;
  subject: string;
  questionCount: number;
  correctCount: number;
  avgTimeSeconds?: number;
  isLowEffort?: boolean;
  dateOffsetDays?: number;
}): RecordedTestAttempt {
  const {
    testId,
    subject,
    questionCount,
    correctCount,
    avgTimeSeconds = 45,
    isLowEffort = false,
    dateOffsetDays = 0,
  } = params;

  const questions: RecordedQuestionAttempt[] = [];
  for (let i = 1; i <= questionCount; i++) {
    const isCorrect = i <= correctCount;
    questions.push({
      questionId: `${testId}_q_${i}`,
      questionNumber: i,
      subject,
      chapter: "Core Chapter",
      microTopic: "Core Topic",
      selectedOption: isCorrect ? "A" : "B",
      correctOption: "A",
      isCorrect,
      timeSpentSeconds: avgTimeSeconds,
      isTimeSink: avgTimeSeconds > 72,
    });
  }

  const date = new Date(Date.now() - dateOffsetDays * 24 * 60 * 60 * 1000).toISOString();
  const incorrectCount = questionCount - correctCount;
  const totalMarks = correctCount * 5 - incorrectCount * 1;
  const maxMarks = questionCount * 5;

  return {
    id: `attempt_${testId}`,
    userId: "test_user_standing",
    testId,
    testTitle: `${subject} Mock`,
    subject,
    totalQuestions: questionCount,
    attemptedCount: questionCount,
    unattemptedCount: 0,
    correctCount,
    incorrectCount,
    totalMarks,
    maxMarks,
    accuracyPercentage: Math.round((correctCount / questionCount) * 100),
    timeTakenSeconds: questionCount * avgTimeSeconds,
    timeSinkCount: 0,
    submittedAt: date,
    isLowEffort,
    questions,
  };
}

async function runStandingTests() {
  console.log("===============================================================");
  console.log("WHERE DO I STAND: DETERMINISTIC ENGINE TEST SUITE");
  console.log("===============================================================\n");

  // -------------------------------------------------------------------------
  // SUITE 1: Low-effort session exclusion & user subject performance
  // -------------------------------------------------------------------------
  console.log("SUITE 1: Low-Effort Session Exclusion & Subject Performance");

  // User takes 1 valid physics test (40/50 correct, 80%), and 1 rushed/guessing session (5s median, 10/50 correct)
  const validPhysics = createAttempt({
    testId: "phys_valid_1",
    subject: "Physics",
    questionCount: 50,
    correctCount: 40, // 40*5 - 10*1 = 190 / 250 = 76%
    avgTimeSeconds: 50,
    isLowEffort: false,
  });

  const lowEffortPhysics = createAttempt({
    testId: "phys_rushed_2",
    subject: "Physics",
    questionCount: 50,
    correctCount: 10,
    avgTimeSeconds: 4, // 4s < 8s threshold -> Low Effort!
    isLowEffort: true,
  });

  const perf1 = computeUserSubjectPerformance([validPhysics, lowEffortPhysics]);
  assert(
    perf1["physics"] !== undefined,
    "Subject Performance: Physics subject record exists"
  );
  assert(
    perf1["physics"]?.validSessionsCount === 1,
    `Session Gate: Exactly 1 valid session counted (Found: ${perf1["physics"]?.validSessionsCount})`
  );
  assert(
    perf1["physics"]?.excludedLowEffortCount === 1,
    `Session Gate: Exactly 1 low-effort session excluded (Found: ${perf1["physics"]?.excludedLowEffortCount})`
  );
  assert(
    perf1["physics"]?.hasSufficientData === true,
    "Data Gate: 50 valid questions satisfies >= 15 questions threshold"
  );
  assert(
    perf1["physics"]?.weightedPercentage === 76,
    `Score Calculation: Correct weighted percentage is 76% (Found: ${perf1["physics"]?.weightedPercentage}%)`
  );

  // Subject below threshold (only 5 questions)
  const fewQuestionsBio = createAttempt({
    testId: "bio_few_1",
    subject: "Biology",
    questionCount: 5,
    correctCount: 4,
    avgTimeSeconds: 40,
    isLowEffort: false,
  });

  const perf2 = computeUserSubjectPerformance([fewQuestionsBio]);
  assert(
    perf2["bio"]?.hasSufficientData === false,
    `Data Gate: 5 questions is below 15 minimum (hasSufficientData: ${perf2["bio"]?.hasSufficientData})`
  );
  assert(
    perf2["bio"]?.status === "insufficient_data",
    `Status Label: Subject labeled insufficient_data (Status: ${perf2["bio"]?.status})`
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 2: Course Requirement Resolution (required, one_of, best_of)
  // -------------------------------------------------------------------------
  console.log("SUITE 2: Course Requirement Resolution (Required, One_of, Best_of)");

  // Setup mock user performance for B.Com (Hons.):
  // Student has: English (85%), Maths (70%), Accounts (90%), Economics (88%), BST (82%)
  const userPerfMock: Record<string, UserSubjectPerformance> = {
    english: {
      subjectId: "english",
      subjectName: "English",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 85,
      weightedPercentage: 85,
      hasSufficientData: true,
      status: "valid",
    },
    maths: {
      subjectId: "maths",
      subjectName: "Mathematics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 70,
      weightedPercentage: 70,
      hasSufficientData: true,
      status: "valid",
    },
    accs: {
      subjectId: "accs",
      subjectName: "Accountancy",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 90,
      weightedPercentage: 90,
      hasSufficientData: true,
      status: "valid",
    },
    eco: {
      subjectId: "eco",
      subjectName: "Economics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 88,
      weightedPercentage: 88,
      hasSufficientData: true,
      status: "valid",
    },
    bst: {
      subjectId: "bst",
      subjectName: "Business Studies",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 82,
      weightedPercentage: 82,
      hasSufficientData: true,
      status: "valid",
    },
  };

  const resBCom = resolveCourseRequirements("bcom_hons", userPerfMock);
  assert(
    resBCom.chosenCombination !== undefined,
    "Course Resolution: Successfully picked combination for B.Com (Hons.)"
  );
  // Accountancy (90%) path with Eco (88%) and English (85%) should beat or tie Maths (70%)
  assert(
    resBCom.chosenCombination.id === "comb_2_accounts",
    `Optimal Choice: Picked Accountancy path over lower Maths score (Combination: ${resBCom.chosenCombination.id})`
  );
  assert(
    resBCom.coverage === 1.0,
    `Full Coverage: 4/4 subjects available (Coverage: ${resBCom.coverage})`
  );
  assert(
    resBCom.resolvedSubjects.some((s) => s.subjectId === "accs"),
    "Rule Validation: Accountancy is present in resolved subjects"
  );
  assert(
    resBCom.resolvedSubjects.some((s) => s.subjectId === "eco"),
    "Best_of Selection: Economics picked as top domain subject"
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 3 & 4: Missing Subjects NOT treated as zero & Coverage Calculation
  // -------------------------------------------------------------------------
  console.log("SUITE 3 & 4: Missing Subjects & Coverage Calculation");

  // Student targeting B.Sc (Hons.) Physics (requires Physics, Chemistry, Maths out of 750)
  // Student has ONLY taken Physics (80%) and Maths (70%), but NO Chemistry attempts.
  const partialSciencePerf: Record<string, UserSubjectPerformance> = {
    physics: {
      subjectId: "physics",
      subjectName: "Physics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 80,
      weightedPercentage: 80,
      hasSufficientData: true,
      status: "valid",
    },
    maths: {
      subjectId: "maths",
      subjectName: "Mathematics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 70,
      weightedPercentage: 70,
      hasSufficientData: true,
      status: "valid",
    },
    chemistry: {
      subjectId: "chemistry",
      subjectName: "Chemistry",
      answeredQuestions: 0,
      validSessionsCount: 0,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 0,
      weightedPercentage: 0,
      hasSufficientData: false,
      status: "no_attempts",
    },
  };

  const resPhysics = resolveCourseRequirements("bsc_hons_physics", partialSciencePerf);
  assert(
    resPhysics.totalRequiredCount === 3,
    `Total Required: 3 subjects for B.Sc Physics (Found: ${resPhysics.totalRequiredCount})`
  );
  assert(
    resPhysics.subjectsWithDataCount === 2,
    `Subjects with Data: 2 subjects (Found: ${resPhysics.subjectsWithDataCount})`
  );
  assert(
    Math.abs(resPhysics.coverage - 0.67) < 0.02,
    `Coverage Math: 2/3 = 0.67 coverage (Found: ${resPhysics.coverage})`
  );
  // CRITICAL CHECK: Missing chemistry must NOT be treated as zero!
  // userPct must be mean of Physics (80%) and Maths (70%) = 75%, NOT (80 + 70 + 0)/3 = 50%!
  assert(
    resPhysics.userPct === 75,
    `Missing Subject Integrity: user_pct is (80+70)/2 = 75%, NEVER treated as zero (Found: ${resPhysics.userPct}%)`
  );
  assert(
    resPhysics.missingSubjectNames.includes("Chemistry"),
    `Missing Subject Identification: Chemistry flagged as missing (Missing: ${resPhysics.missingSubjectNames.join(", ")})`
  );

  // When coverage is below 50%: only 1 of 4 subjects
  const veryLowCoveragePerf: Record<string, UserSubjectPerformance> = {
    english: {
      subjectId: "english",
      subjectName: "English",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      rawAveragePercentage: 80,
      weightedPercentage: 80,
      hasSufficientData: true,
      status: "valid",
    },
  };
  const resLowCov = resolveCourseRequirements("bcom_hons", veryLowCoveragePerf);
  assert(
    resLowCov.coverage === 0.25,
    `Low Coverage Math: 1/4 = 0.25 (Found: ${resLowCov.coverage})`
  );
  assert(
    resLowCov.isBelowCoverageThreshold === true,
    "Coverage Threshold: Flagged as below confidence threshold (isBelowCoverageThreshold: true)"
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 5: Band Thresholds at Boundaries (Safe, Likely, Possible, Reach, Far)
  // -------------------------------------------------------------------------
  console.log("SUITE 5: Band Thresholds at Precise Boundaries");

  // Expected range: [70.0% to 80.0%], midpoint = 75.0%, reachMargin = 5.0% (reach down to 65.0%)
  const low = 70.0;
  const high = 80.0;

  // Exactly at high boundary (80.0%) -> Safe
  assert(
    evaluateChanceBand(80.0, low, high) === "Safe",
    "Band Boundary: Exactly at high (80.0%) is Safe"
  );
  // Above high boundary (82.5%) -> Safe
  assert(
    evaluateChanceBand(82.5, low, high) === "Safe",
    "Band Boundary: Above high (82.5%) is Safe"
  );
  // Between midpoint and high (77.0%) -> Likely
  assert(
    evaluateChanceBand(77.0, low, high) === "Likely",
    "Band Boundary: 77.0% (between mid 75% and high 80%) is Likely"
  );
  // Exactly at midpoint (75.0%) -> Likely
  assert(
    evaluateChanceBand(75.0, low, high) === "Likely",
    "Band Boundary: Exactly at midpoint (75.0%) is Likely"
  );
  // Between low and midpoint (72.0%) -> Possible
  assert(
    evaluateChanceBand(72.0, low, high) === "Possible",
    "Band Boundary: 72.0% (between low 70% and mid 75%) is Possible"
  );
  // Exactly at low boundary (70.0%) -> Possible
  assert(
    evaluateChanceBand(70.0, low, high) === "Possible",
    "Band Boundary: Exactly at low (70.0%) is Possible"
  );
  // Just below low (69.9% to 65.0%) -> Reach
  assert(
    evaluateChanceBand(69.5, low, high) === "Reach",
    "Band Boundary: 69.5% (within reach margin) is Reach"
  );
  assert(
    evaluateChanceBand(65.0, low, high) === "Reach",
    "Band Boundary: 65.0% (exact lower bound of reach) is Reach"
  );
  // Below reach boundary (64.9%) -> Far
  assert(
    evaluateChanceBand(64.9, low, high) === "Far",
    "Band Boundary: 64.9% (below reach margin) is Far"
  );
  // No data / null -> Far
  assert(
    evaluateChanceBand(null, low, high) === "Far",
    "Band Boundary: null percentage is Far"
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 6: Multi-Year Range Calculation (1 year vs 2+ years)
  // -------------------------------------------------------------------------
  console.log("SUITE 6: Multi-Year Range Calculation (1 Year vs 2+ Years)");

  // SRCC B.Com (Hons.) has 2025 and 2026 cutoffs in data
  const srccStats = computeMultiYearCutoff("Shri Ram College of Commerce", "bcom_hons", "UR");
  assert(srccStats !== null, "Multi-Year: SRCC B.Com (Hons.) record found in dataset");
  if (srccStats) {
    assert(
      srccStats.years.length === 2,
      `Multi-Year: Covers 2 years (Found: ${srccStats.years.join(", ")})`
    );
    assert(
      srccStats.expectedRange.highPct > srccStats.expectedRange.lowPct,
      `Multi-Year: Valid range [${srccStats.expectedRange.lowPct}% - ${srccStats.expectedRange.highPct}%]`
    );
    assert(
      srccStats.cutoffScale === 1000,
      `Cutoff Scale: 1000 marks scale for B.Com Hons (Found: ${srccStats.cutoffScale})`
    );
  }

  // Filter by single year (2026) to test single-year widening rule
  const singleYearStats = computeMultiYearCutoff(
    "Shri Ram College of Commerce",
    "bcom_hons",
    "UR",
    2026
  );
  assert(singleYearStats !== null, "Single Year: Found 2026 filtered cutoff");
  if (singleYearStats) {
    assert(
      singleYearStats.years.length === 1,
      "Single Year: Exactly 1 year in range"
    );
    const expectedLow = Math.round((singleYearStats.latestPercentage - STANDING_CONFIG.SINGLE_YEAR_WIDEN_PERCENTAGE) * 10) / 10;
    const expectedHigh = Math.round((singleYearStats.latestPercentage + STANDING_CONFIG.SINGLE_YEAR_WIDEN_PERCENTAGE) * 10) / 10;
    assert(
      Math.abs(singleYearStats.expectedRange.lowPct - expectedLow) < 0.2 &&
      Math.abs(singleYearStats.expectedRange.highPct - expectedHigh) < 0.2,
      `Single Year Widening: Widened by +/-2.5% [${singleYearStats.expectedRange.lowPct}% - ${singleYearStats.expectedRange.highPct}%]`
    );
  }

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 7: Dream College Gap Math
  // -------------------------------------------------------------------------
  console.log("SUITE 7: Dream College Gap Math");

  // User with valid mock performance
  const userAttemptList: RecordedTestAttempt[] = [
    createAttempt({
      testId: "eng_mock_1",
      subject: "English",
      questionCount: 50,
      correctCount: 42, // (42*5 - 8*1) = 202 / 250 = 80.8%
      avgTimeSeconds: 45,
    }),
    createAttempt({
      testId: "acc_mock_1",
      subject: "Accountancy",
      questionCount: 50,
      correctCount: 45, // (45*5 - 5*1) = 220 / 250 = 88.0%
      avgTimeSeconds: 50,
    }),
    createAttempt({
      testId: "eco_mock_1",
      subject: "Economics",
      questionCount: 50,
      correctCount: 43, // (43*5 - 7*1) = 208 / 250 = 83.2%
      avgTimeSeconds: 48,
    }),
    createAttempt({
      testId: "bst_mock_1",
      subject: "Business Studies",
      questionCount: 50,
      correctCount: 41, // (41*5 - 9*1) = 196 / 250 = 78.4%
      avgTimeSeconds: 42,
    }),
  ];

  const dreamGap = computeDreamCollegeGap({
    collegeName: "Shri Ram College of Commerce",
    courseId: "bcom_hons",
    category: "UR",
    userAttempts: userAttemptList,
  });

  assert(dreamGap !== null, "Dream College: Successfully computed SRCC gap analysis");
  if (dreamGap) {
    assert(
      dreamGap.userPct !== null && dreamGap.userPct > 80,
      `User Score: Accurately computed user percentage (${dreamGap.userPct}%)`
    );
    assert(
      dreamGap.expectedCutoffPct > 90,
      `Target Cutoff: Expected SRCC cutoff is >90% (${dreamGap.expectedCutoffPct}%)`
    );
    assert(
      dreamGap.gapPercentagePoints === Math.round((dreamGap.expectedCutoffPct - (dreamGap.userPct || 0)) * 10) / 10,
      `Gap Math: Accurate gap in percentage points (${dreamGap.gapPercentagePoints}%)`
    );
    assert(
      dreamGap.gapMarks > 0,
      `Marks Gap: Positive gap marks computed (${dreamGap.gapMarks} marks)`
    );
    assert(
      dreamGap.subjectImprovementBreakdown.length === 4,
      `Subject Breakdown: Detailed breakdown across all 4 participating subjects (${dreamGap.subjectImprovementBreakdown.length})`
    );
    assert(
      dreamGap.summaryMessage.includes("Raise your domain average"),
      `Narrative Generation: Generated clear 'what it would take' narrative (${dreamGap.summaryMessage})`
    );
  }

  console.log();
  console.log("===============================================================");
  console.log(`STANDING ENGINE TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("===============================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runStandingTests().catch((err) => {
  console.error("Test Suite execution failed:", err);
  process.exit(1);
});
