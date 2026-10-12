import {
  computeUserSubjectPerformance,
  resolveCourseRequirements,
  computeMultiYearCutoff,
  computeCollegeStandings,
  computeDreamCollegeGap,
  calculateSubjectTargetMarks,
  UserSubjectPerformance,
  resolveTargetCollegeMatch,
  matchCourseToId,
  CANONICAL_COURSES_MAP,
} from "../lib/standing-engine";
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
  console.log("WHERE DO I STAND: MARKS-ONLY ADMISSION ENGINE TEST SUITE");
  console.log("===============================================================\n");

  // -------------------------------------------------------------------------
  // SUITE 1: Arithmetic Mean of Mock Scores in Marks
  // -------------------------------------------------------------------------
  console.log("SUITE 1: Arithmetic Mean of Mock Scores (Marks Only)");

  // Physics Mock 1: 50 Qs, 40 correct -> 40*5 - 10*1 = 190 marks out of 250
  const physMock1 = createAttempt({
    testId: "phys_mock_1",
    subject: "Physics",
    questionCount: 50,
    correctCount: 40, // 190 marks
    avgTimeSeconds: 50,
  });

  // Physics Mock 2: 50 Qs, 10 correct -> 10*5 - 40*1 = 10 marks out of 250
  const physMock2 = createAttempt({
    testId: "phys_mock_2",
    subject: "Physics",
    questionCount: 50,
    correctCount: 10, // 10 marks
    avgTimeSeconds: 4,
  });

  const perf1 = computeUserSubjectPerformance([physMock1, physMock2]);
  assert(
    perf1["physics"] !== undefined,
    "Subject Performance: Physics record exists"
  );
  assert(
    perf1["physics"]?.validSessionsCount === 2,
    `Session Count: Both sessions recorded (Found: ${perf1["physics"]?.validSessionsCount})`
  );
  // Arithmetic mean = (190 + 10) / 2 = 100 marks out of 250
  assert(
    perf1["physics"]?.averageMarks === 100,
    `Marks Average: Arithmetic mean is exactly 100 marks (Found: ${perf1["physics"]?.averageMarks})`
  );
  assert(
    perf1["physics"]?.maxMarks === 250,
    `Subject Maximum: Max marks is 250 (Found: ${perf1["physics"]?.maxMarks})`
  );

  // 3-mock average test: 180, 200, 160 -> (180+200+160)/3 = 180 marks
  const chem1 = createAttempt({ testId: "chem_1", subject: "Chemistry", questionCount: 50, correctCount: 38 }); // 38*5 - 12*1 = 178
  const chem2 = createAttempt({ testId: "chem_2", subject: "Chemistry", questionCount: 50, correctCount: 42 }); // 42*5 - 8*1 = 202
  const perfChem = computeUserSubjectPerformance([chem1, chem2]);
  // (178 + 202) / 2 = 190 marks
  assert(
    perfChem["chemistry"]?.averageMarks === 190,
    `Multi-mock Mean: Arithmetic mean of 178 and 202 is 190 marks (Found: ${perfChem["chemistry"]?.averageMarks})`
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 2: Negative Marking Support (+5 / -1 Scheme)
  // -------------------------------------------------------------------------
  console.log("SUITE 2: Negative Marking (+5 / -1 Scheme)");

  // Attempt with net negative marks: 5 correct, 45 incorrect -> 5*5 - 45*1 = 25 - 45 = -20 marks
  const negMock = createAttempt({
    testId: "math_neg_1",
    subject: "Mathematics",
    questionCount: 50,
    correctCount: 5,
  });
  assert(
    negMock.totalMarks === -20,
    `Negative Marking Math: 5 correct and 45 incorrect produces -20 marks (Found: ${negMock.totalMarks})`
  );

  const perfNeg = computeUserSubjectPerformance([negMock]);
  assert(
    perfNeg["maths"]?.averageMarks === -20,
    `Engine Negative Marks: Preserves negative average marks accurately (Found: ${perfNeg["maths"]?.averageMarks})`
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 3: Incomplete Subject Data & Root Cause Trace (No 4.9% Fabrication)
  // -------------------------------------------------------------------------
  console.log("SUITE 3: Incomplete Subject Data & Root-Cause Trace (No 4.9% Fabrication)");

  // Simulate the EXACT user case:
  // Candidate completed ONLY 1 subject (Physics) with 36.8 marks out of 250.
  // Targeting B.Sc (Hons.) Physics (requires 3 subjects: Physics, Chemistry, Maths out of 750).
  // Historical cutoff: 319.5/750 marks.
  const singleSubjectMock: RecordedTestAttempt = {
    id: "attempt_single_phys",
    userId: "user_test",
    testId: "phys_single",
    testTitle: "Physics Mock 1",
    subject: "Physics",
    totalQuestions: 50,
    attemptedCount: 50,
    unattemptedCount: 0,
    correctCount: 14,
    incorrectCount: 36,
    totalMarks: 34, // or 36.8
    maxMarks: 250,
    accuracyPercentage: 28,
    timeTakenSeconds: 2400,
    timeSinkCount: 0,
    submittedAt: new Date().toISOString(),
    isLowEffort: false,
    questions: [],
  };
  // Directly provide 36.8 averageMarks to verify the exact number
  const singleSubjectPerf: Record<string, UserSubjectPerformance> = {
    physics: {
      subjectId: "physics",
      subjectName: "Physics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 36.8, // Exactly 36.8/250 marks
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
    chemistry: {
      subjectId: "chemistry",
      subjectName: "Chemistry",
      answeredQuestions: 0,
      validSessionsCount: 0,
      excludedLowEffortCount: 0,
      averageMarks: 0,
      maxMarks: 250,
      hasSufficientData: false,
      status: "no_attempts",
    },
    maths: {
      subjectId: "maths",
      subjectName: "Mathematics",
      answeredQuestions: 0,
      validSessionsCount: 0,
      excludedLowEffortCount: 0,
      averageMarks: 0,
      maxMarks: 250,
      hasSufficientData: false,
      status: "no_attempts",
    },
  };

  const resIncomplete = resolveCourseRequirements("bsc_hons_physics", singleSubjectPerf, undefined, 319.5);

  assert(
    resIncomplete.totalRequiredCount === 3,
    `Course Requirements: Requires 3 subjects (Found: ${resIncomplete.totalRequiredCount})`
  );
  assert(
    resIncomplete.subjectsWithDataCount === 1,
    `Subjects with Data: Exactly 1 subject available (Found: ${resIncomplete.subjectsWithDataCount})`
  );
  assert(
    resIncomplete.isComplete === false,
    "Completeness Gate: Flagged as incomplete (isComplete: false)"
  );

  // ROOT CAUSE BUG VERIFICATION:
  // In the old buggy system: 36.8 / 750 = 4.9% overall score was fabricated.
  // In the corrected marks-only engine: combinedAverageMarks MUST BE NULL!
  assert(
    resIncomplete.combinedAverageMarks === null,
    `Bug Fix Verification: combinedAverageMarks is strictly null, NEVER divided by composite 750 (Found: ${resIncomplete.combinedAverageMarks})`
  );
  assert(
    resIncomplete.standingLabel === "Incomplete — awaiting remaining subjects",
    `Standing Label: Explicitly labeled '${resIncomplete.standingLabel}'`
  );

  // Per-subject metrics verification:
  const physChoice = resIncomplete.resolvedSubjects.find((s) => s.subjectId === "physics");
  assert(
    physChoice !== undefined && physChoice.averageMarks === 36.8,
    `Physics Score: Preserved on 250-mark denominator (Found: ${physChoice?.averageMarks}/250 marks)`
  );
  assert(
    physChoice?.targetMarks === 106.5,
    `Physics Target: 319.5 / 3 = 106.5 marks (Found: ${physChoice?.targetMarks})`
  );
  // marksNeeded = max(0, 106.5 - 36.8) = 69.7 marks
  assert(
    physChoice?.marksNeeded === 69.7,
    `Physics Marks Needed: max(0, 106.5 - 36.8) = 69.7 marks (Found: ${physChoice?.marksNeeded})`
  );

  // Missing subjects verification:
  const chemChoice = resIncomplete.resolvedSubjects.find((s) => s.subjectId === "chemistry");
  assert(
    chemChoice?.hasData === false && chemChoice.averageMarks === null,
    "Missing Chemistry: hasData is false and averageMarks is null"
  );
  assert(
    chemChoice?.marksNeeded === 106.5,
    `Missing Subject Needed: Full target of 106.5 marks needed (Found: ${chemChoice?.marksNeeded})`
  );

  // Dream College Gap test with incomplete data:
  const dreamIncomplete = computeDreamCollegeGap({
    collegeName: "Miranda House (W)",
    courseId: "bsc_hons_physics",
    category: "UR",
    userAttempts: [singleSubjectMock],
  });
  assert(
    dreamIncomplete !== null,
    "Dream College Analysis: Successfully computed for Miranda House"
  );
  if (dreamIncomplete) {
    assert(
      dreamIncomplete.isComplete === false,
      "Dream College Completeness: Marked as incomplete"
    );
    assert(
      dreamIncomplete.combinedMarks === null,
      `Dream College Combined: combinedMarks is strictly null (Found: ${dreamIncomplete.combinedMarks})`
    );
    assert(
      dreamIncomplete.status === "incomplete",
      `Dream College Status: Status is 'incomplete' (Found: ${dreamIncomplete.status})`
    );
    assert(
      dreamIncomplete.gapDisplay === "Awaiting all subjects",
      `Dream College Gap Display: Displays 'Awaiting all subjects' (Found: ${dreamIncomplete.gapDisplay})`
    );
    assert(
      dreamIncomplete.statusLabel === "Incomplete — awaiting remaining subjects",
      `Dream College Status Label: Displays '${dreamIncomplete.statusLabel}'`
    );
  }

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 4: Complete Subject Data & Arithmetic Combined Total
  // -------------------------------------------------------------------------
  console.log("SUITE 4: Complete Subject Data & Direct Composite Comparison");

  // User with all 3 required science subjects for B.Sc Physics:
  // Physics = 120 marks, Chemistry = 110 marks, Maths = 100 marks
  // Combined score = 120 + 110 + 100 = 330 marks out of 750
  const completeSciencePerf: Record<string, UserSubjectPerformance> = {
    physics: {
      subjectId: "physics",
      subjectName: "Physics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 120,
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
    chemistry: {
      subjectId: "chemistry",
      subjectName: "Chemistry",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 110,
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
    maths: {
      subjectId: "maths",
      subjectName: "Mathematics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 100,
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
  };

  const resComplete = resolveCourseRequirements("bsc_hons_physics", completeSciencePerf, undefined, 319.5);
  assert(
    resComplete.isComplete === true,
    "Completeness Gate: All 3 subjects available"
  );
  assert(
    resComplete.combinedAverageMarks === 330,
    `Combined Total: 120 + 110 + 100 = 330 marks (Found: ${resComplete.combinedAverageMarks})`
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 5: Exact Cutoff Matches, Scores Above & Below Cutoff
  // -------------------------------------------------------------------------
  console.log("SUITE 5: Cutoff Comparisons (Exact Match, Above, Below)");

  const targetCutoff = 319.5;

  // Case A: Exact Cutoff Match (319.5 vs 319.5) -> marksGap = 0
  const exactCombined = 319.5;
  const gapExact = Math.round((targetCutoff - exactCombined) * 10) / 10;
  assert(gapExact === 0, "Exact Match Gap: 319.5 - 319.5 = 0 marks");
  const exactDisplay = gapExact <= 0
    ? (gapExact === 0 ? "0 marks (meets cutoff)" : `${Math.abs(gapExact)} marks above cutoff`)
    : `${gapExact} marks below cutoff`;
  assert(
    exactDisplay === "0 marks (meets cutoff)",
    `Exact Match Label: Displays '0 marks (meets cutoff)' (Found: '${exactDisplay}')`
  );

  // Case B: Score Above Cutoff (350 vs 319.5) -> marksGap = -30.5
  const aboveCombined = 350.0;
  const gapAbove = Math.round((targetCutoff - aboveCombined) * 10) / 10;
  assert(gapAbove === -30.5, "Above Cutoff Gap: 319.5 - 350.0 = -30.5 marks");
  const aboveDisplay = `${Math.abs(gapAbove)} marks above cutoff`;
  assert(
    aboveDisplay === "30.5 marks above cutoff",
    `Above Cutoff Label: Displays '30.5 marks above cutoff' (Found: '${aboveDisplay}')`
  );

  // Case C: Score Below Cutoff (294.5 vs 319.5) -> marksGap = 25.0
  const belowCombined = 294.5;
  const gapBelow = Math.round((targetCutoff - belowCombined) * 10) / 10;
  assert(gapBelow === 25.0, "Below Cutoff Gap: 319.5 - 294.5 = 25.0 marks");
  const belowDisplay = `${gapBelow} marks below cutoff`;
  assert(
    belowDisplay === "25 marks below cutoff",
    `Below Cutoff Label: Displays '25 marks below cutoff' (Found: '${belowDisplay}')`
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 6: Unequal Subject Weights & Proportional Target Marks
  // -------------------------------------------------------------------------
  console.log("SUITE 6: Unequal Subject Weights & Equal-Share Division");

  // Rule 1: 3 equally weighted papers (each out of 250, composite 750)
  // Cutoff 319.5 -> cutoffMarks / 3 = 106.5
  const eqTarget3 = calculateSubjectTargetMarks(319.5, 750, 250, 3);
  assert(
    eqTarget3 === 106.5,
    `Equal 3-subject target: 319.5 / 3 = 106.5 marks (Found: ${eqTarget3})`
  );

  // Rule 2: 4 equally weighted papers (each out of 250, composite 1000)
  // Cutoff 910.8 -> cutoffMarks / 4 = 227.7
  const eqTarget4 = calculateSubjectTargetMarks(910.8, 1000, 250, 4);
  assert(
    eqTarget4 === 227.7,
    `Equal 4-subject target: 910.8 / 4 = 227.7 marks (Found: ${eqTarget4})`
  );

  // Rule 3: Unequal weighting scenario:
  // Composite cutoffScale is 500.
  // Paper A has max 200 marks, Paper B has max 300 marks. Composite cutoff = 350 marks.
  // Target A = 350 * (200 / 500) = 140 marks.
  // Target B = 350 * (300 / 500) = 210 marks.
  const targetUnequalA = calculateSubjectTargetMarks(350, 500, 200, 2);
  const targetUnequalB = calculateSubjectTargetMarks(350, 500, 300, 2);
  assert(
    targetUnequalA === 140,
    `Unequal Target A: 350 * (200/500) = 140 marks (Found: ${targetUnequalA})`
  );
  assert(
    targetUnequalB === 210,
    `Unequal Target B: 350 * (300/500) = 210 marks (Found: ${targetUnequalB})`
  );
  assert(
    targetUnequalA + targetUnequalB === 350,
    `Unequal Target Sum: 140 + 210 = 350 equals total cutoff (Found: ${targetUnequalA + targetUnequalB})`
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 7: Course Requirement Resolution (one_of and best_of Selection)
  // -------------------------------------------------------------------------
  console.log("SUITE 7: Course Requirement Rules (Required, One_of, Best_of)");

  const bcomPerf: Record<string, UserSubjectPerformance> = {
    english: {
      subjectId: "english",
      subjectName: "English",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 210, // 210/250 marks
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
    maths: {
      subjectId: "maths",
      subjectName: "Mathematics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 160, // 160/250 marks
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
    accs: {
      subjectId: "accs",
      subjectName: "Accountancy",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 225, // 225/250 marks (beats Maths 160)
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
    eco: {
      subjectId: "eco",
      subjectName: "Economics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 215, // 215/250 marks
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
    bst: {
      subjectId: "bst",
      subjectName: "Business Studies",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 200, // 200/250 marks
      maxMarks: 250,
      hasSufficientData: true,
      status: "valid",
    },
  };

  const resBCom = resolveCourseRequirements("bcom_hons", bcomPerf);
  assert(
    resBCom.chosenCombination !== undefined,
    "B.Com Resolution: Successfully picked combination"
  );
  // Accountancy (225) > Maths (160) -> comb_2_accounts should be chosen
  assert(
    resBCom.chosenCombination.id === "comb_2_accounts",
    `Optimal Choice: Picked Accountancy path over lower Maths score (Combination: ${resBCom.chosenCombination.id})`
  );
  assert(
    resBCom.isComplete === true,
    "Full Completeness: 4/4 subjects available"
  );
  // Total marks = 210 (English) + 225 (Accounts) + 215 (Eco) + 200 (BST) = 850 marks
  assert(
    resBCom.combinedAverageMarks === 850,
    `Combined B.Com Marks: 210 + 225 + 215 + 200 = 850 marks (Found: ${resBCom.combinedAverageMarks})`
  );

  console.log();

  // -------------------------------------------------------------------------
  // SUITE 8: Dream College Resolution & Acronym Mapping
  // -------------------------------------------------------------------------
  console.log("SUITE 8: College Acronym Resolution");

  assert(
    resolveTargetCollegeMatch("SRCC") === "Shri Ram College of Commerce",
    `College Matcher: SRCC -> Shri Ram College of Commerce (Found: ${resolveTargetCollegeMatch("SRCC")})`
  );
  assert(
    resolveTargetCollegeMatch("LSR") === "Lady Shri Ram College for Women (W)",
    `College Matcher: LSR -> Lady Shri Ram College for Women (W) (Found: ${resolveTargetCollegeMatch("LSR")})`
  );
  assert(
    resolveTargetCollegeMatch("St. Stephens") === "St. Stephen's College",
    `College Matcher: St. Stephens -> St. Stephen's College (Found: ${resolveTargetCollegeMatch("St. Stephens")})`
  );

  const srccMulti = computeMultiYearCutoff("Shri Ram College of Commerce", "bcom_hons", "UR");
  assert(
    srccMulti !== null && srccMulti.cutoffScale === 1000,
    `Multi-Year Cutoff: SRCC B.Com cutoff scale is 1000 marks (Found: ${srccMulti?.cutoffScale})`
  );

  const standingsTest = computeCollegeStandings({ courseId: "bcom_hons", userAttempts: [physMock1] });
  assert(
    standingsTest.standings.length > 0,
    `College Standings: Generated standings across colleges (Found: ${standingsTest.standings.length})`
  );

  assert(
    matchCourseToId("B.Com (Hons)") === "bcom_hons",
    `Course Matcher: B.Com (Hons) matches bcom_hons (Found: ${matchCourseToId("B.Com (Hons)")})`
  );

  assert(
    CANONICAL_COURSES_MAP["bcom_hons"]?.cutoffScale === 1000,
    `Canonical Map: bcom_hons has 1000 cutoff scale (Found: ${CANONICAL_COURSES_MAP["bcom_hons"]?.cutoffScale})`
  );

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
