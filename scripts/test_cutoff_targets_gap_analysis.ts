import {
  calculateSubjectTargetMarks,
  resolveCourseRequirements,
  computeMultiYearCutoff,
  computeDreamCollegeGap,
  getProjectedCutoff,
  resolveCanonicalCutoffCollege,
  matchCourseToId,
  CANONICAL_COURSES_MAP,
  NORMALIZED_CUTOFFS,
} from "../lib/standing-engine";
import { RecordedTestAttempt } from "../types";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✅ PASSED: ${message}`);
}

function assertClose(actual: number, expected: number, delta = 0.1, message = "") {
  if (Math.abs(actual - expected) > delta) {
    console.error(`❌ FAILED: ${message} (Expected ${expected}, got ${actual})`);
    throw new Error(`Assertion failed: ${message} (Expected ${expected}, got ${actual})`);
  }
  console.log(`✅ PASSED: ${message} (Expected ${expected}, got ${actual})`);
}

console.log("===============================================================================");
console.log("RUNNING AUTOMATED TEST SUITE: SUBJECT CUTOFF TARGETS & DREAM COLLEGE GAP");
console.log("===============================================================================\n");

// ---------------------------------------------------------------------------
// TEST 1: Equally Weighted Target Calculations (Section 1 of Prompt)
// ---------------------------------------------------------------------------
console.log("--- TEST 1: Formula Verification (600/3=200, 480/3=160, 800/4=200) ---");

// 1a: 600 out of 750 based on 3 equally weighted subjects -> 200
const target600 = calculateSubjectTargetMarks(600, 750, 250, 3, true);
assert(target600 === 200, `600 / 3 subjects = 200 marks (got ${target600})`);

// 1b: 480 out of 600 based on 3 equally weighted subjects -> 160
const target480 = calculateSubjectTargetMarks(480, 600, 200, 3, true);
assert(target480 === 160, `480 / 3 subjects = 160 marks (got ${target480})`);

// 1c: 800 out of 1000 based on 4 equally weighted subjects -> 200
const target800 = calculateSubjectTargetMarks(800, 1000, 250, 4, true);
assert(target800 === 200, `800 / 4 subjects = 200 marks (got ${target800})`);

// 1d: Marks remaining formula: max(0, perSubjectTarget - studentSubjectAverage)
const studentAverage = 150;
const marksRemaining = Math.max(0, target600 - studentAverage);
assert(marksRemaining === 50, `Remaining marks needed: 200 - 150 = 50 (got ${marksRemaining})`);

// 1e: Marks remaining never negative when student average exceeds target
const exceedingAverage = 220;
const marksRemainingExceeding = Math.max(0, target600 - exceedingAverage);
assert(marksRemainingExceeding === 0, `Remaining marks is 0 when score exceeds target (got ${marksRemainingExceeding})`);


// ---------------------------------------------------------------------------
// TEST 2: Counted vs Qualifying Requirements (DU B.Sc. Physics 3 Counted + 1 Language)
// ---------------------------------------------------------------------------
console.log("\n--- TEST 2: Counted vs Qualifying Requirements (DU B.Sc. Physics) ---");

// DU B.Sc. Physics has 3 counted domain subjects (PCM, 750 scale) + 1 qualifying language (min 30% / 75 marks).
// Total cutoff: 600/750. Targets should divide by 3 (200 each), NOT by 4 (150).
const physicsResolution = resolveCourseRequirements(
  "bsc_hons_physics",
  {
    english: {
      subjectId: "english",
      subjectName: "English",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 120,
      maxMarks: 250,
      rawAveragePercentage: 48,
      weightedPercentage: 48,
      hasSufficientData: true,
      status: "valid",
    },
    physics: {
      subjectId: "physics",
      subjectName: "Physics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 150,
      maxMarks: 250,
      rawAveragePercentage: 60,
      weightedPercentage: 60,
      hasSufficientData: true,
      status: "valid",
    },
    chemistry: {
      subjectId: "chemistry",
      subjectName: "Chemistry",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 140,
      maxMarks: 250,
      rawAveragePercentage: 56,
      weightedPercentage: 56,
      hasSufficientData: true,
      status: "valid",
    },
    maths: {
      subjectId: "maths",
      subjectName: "Mathematics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 160,
      maxMarks: 250,
      rawAveragePercentage: 64,
      weightedPercentage: 64,
      hasSufficientData: true,
      status: "valid",
    },
  },
  undefined,
  600
);

const countedSubjects = physicsResolution.resolvedSubjects.filter((s) => s.isCountedInCutoff !== false);
const qualifyingSubjects = physicsResolution.resolvedSubjects.filter((s) => s.isCountedInCutoff === false);

assert(countedSubjects.length === 3, `Physics has exactly 3 counted domain subjects (got ${countedSubjects.length})`);
assert(qualifyingSubjects.length === 1, `Physics has 1 qualifying language requirement (got ${qualifyingSubjects.length})`);

// Counted domain targets must be 600 / 3 = 200 marks, NOT 600 / 4 = 150 marks
for (const sub of countedSubjects) {
  assert(
    sub.targetMarks === 200,
    `${sub.subjectName} target is 200 marks (600/3), not 150 (got ${sub.targetMarks})`
  );
}

// Qualifying language target must be min 30% of 250 = 75 marks
const langSub = qualifyingSubjects[0]!;
assert(
  langSub.targetMarks === 75,
  `Qualifying language target is 75 marks (30% of 250) (got ${langSub.targetMarks})`
);
assert(
  langSub.isCountedInCutoff === false,
  `Qualifying language is marked as isCountedInCutoff: false`
);

// Combined total must be sum of COUNTED subjects only: 150 + 140 + 160 = 450 (English 120 must NOT be added!)
assert(
  physicsResolution.combinedAverageMarks === 450,
  `Physics combined score is 450 (150+140+160), excluding qualifying English (got ${physicsResolution.combinedAverageMarks})`
);


// ---------------------------------------------------------------------------
// TEST 3: Missing Mock Display ("No score yet" and Not Fabricating Scores)
// ---------------------------------------------------------------------------
console.log("\n--- TEST 3: Missing Mock Attempt Handling ---");

const incompleteResolution = resolveCourseRequirements(
  "bsc_hons_physics",
  {
    physics: {
      subjectId: "physics",
      subjectName: "Physics",
      answeredQuestions: 50,
      validSessionsCount: 1,
      excludedLowEffortCount: 0,
      averageMarks: 150,
      maxMarks: 250,
      rawAveragePercentage: 60,
      weightedPercentage: 60,
      hasSufficientData: true,
      status: "valid",
    },
    // chemistry and maths have NOT been attempted!
  },
  undefined,
  600
);

assert(
  incompleteResolution.isComplete === false,
  `Incomplete resolution is marked isComplete: false`
);
assert(
  incompleteResolution.combinedAverageMarks === null,
  `Incomplete resolution has combinedAverageMarks: null (never fabricates total from partial subjects)`
);

const unattemptedChem = incompleteResolution.resolvedSubjects.find((s) => s.subjectId === "chemistry")!;
assert(
  unattemptedChem.hasData === false,
  `Unattempted Chemistry has hasData: false`
);
assert(
  unattemptedChem.averageMarks === null,
  `Unattempted Chemistry has averageMarks: null (not 0)`
);


// ---------------------------------------------------------------------------
// TEST 4: Canonical College Resolution for Hansraj College and Top Colleges
// ---------------------------------------------------------------------------
console.log("\n--- TEST 4: College Canonical Resolution ---");

const testCases = [
  { input: "Hans Raj College", expected: "Hansraj College" },
  { input: "hansraj", expected: "Hansraj College" },
  { input: "Shri Ram College of Commerce (SRCC)", expected: "Shri Ram College of Commerce" },
  { input: "SRCC", expected: "Shri Ram College of Commerce" },
  { input: "Kirori Mal College (KMC)", expected: "Kirori Mal College" },
  { input: "kmc", expected: "Kirori Mal College" },
  { input: "Lady Shri Ram College for Women (LSR)", expected: "Lady Shri Ram College for Women (W)" },
  { input: "Shaheed Sukhdev College of Business Studies (SSCBS)", expected: "Shaheed Sukhdev College Business Studies" },
  { input: "sscbs", expected: "Shaheed Sukhdev College Business Studies" },
  { input: "Hindu College", expected: "Hindu College" },
  { input: "hindu", expected: "Hindu College" },
  { input: "Miranda House", expected: "Miranda House (W)" },
];

for (const tc of testCases) {
  const resolved = resolveCanonicalCutoffCollege(tc.input);
  assert(
    resolved === tc.expected,
    `"${tc.input}" resolves to "${tc.expected}" (got "${resolved}")`
  );
}


// ---------------------------------------------------------------------------
// TEST 5: Hansraj College + Computer Science Historical Cutoffs
// (Exact UI values: 767.1 in 2023, 774.9 in 2024, 784.4 in 2025, 783.9 in 2026)
// ---------------------------------------------------------------------------
console.log("\n--- TEST 5: Hansraj College + CS Historical Cutoffs ---");

const hansrajCSStats = computeMultiYearCutoff("Hans Raj College", "bsc_hons_computer_science", "UR");
assert(hansrajCSStats !== null, "Hansraj College CS UR stats found");

const yearlyCutoffs = hansrajCSStats!.yearlyData.map((d) => ({ year: d.year, val: d.cutoffValue }));
console.log("Historical cutoffs retrieved:", yearlyCutoffs);

assert(yearlyCutoffs.some((d) => d.year === 2023 && Math.abs(d.val - 767.1) < 0.2), "2023 cutoff is 767.1");
assert(yearlyCutoffs.some((d) => d.year === 2024 && Math.abs(d.val - 774.9) < 0.2), "2024 cutoff is 774.9");
assert(yearlyCutoffs.some((d) => d.year === 2025 && Math.abs(d.val - 784.4) < 0.2), "2025 cutoff is 784.4");
assert(yearlyCutoffs.some((d) => d.year === 2026 && Math.abs(d.val - 783.9) < 0.2), "2026 cutoff is 783.9");


// ---------------------------------------------------------------------------
// TEST 6: Course Aliases ("b.sc. cs", "bsc_cs", "B.Sc. CS")
// ---------------------------------------------------------------------------
console.log("\n--- TEST 6: Course Aliases Resolution ---");

assert(matchCourseToId("b.sc. cs") === "bsc_hons_computer_science", `"b.sc. cs" resolves to "bsc_hons_computer_science"`);
assert(matchCourseToId("bsc_cs") === "bsc_hons_computer_science", `"bsc_cs" resolves to "bsc_hons_computer_science"`);
assert(matchCourseToId("B.Sc. (Hons) CS") === "bsc_hons_computer_science", `"B.Sc. (Hons) CS" resolves to "bsc_hons_computer_science"`);
assert(matchCourseToId("bsc_phys") === "bsc_hons_physics", `"bsc_phys" resolves to "bsc_hons_physics"`);
assert(matchCourseToId("bsc_chem") === "bsc_hons_chemistry", `"bsc_chem" resolves to "bsc_hons_chemistry"`);


// ---------------------------------------------------------------------------
// TEST 7: Dream College Gap Analysis for Hansraj College + CS
// (Must NOT say "No past cutoff data yet")
// ---------------------------------------------------------------------------
console.log("\n--- TEST 7: Dream College Gap Analysis for Hansraj College + CS ---");

const hansrajGap = computeDreamCollegeGap({
  collegeName: "Hans Raj College",
  courseId: "bsc_cs",
  category: "UR",
  userAttempts: [],
});

assert(hansrajGap !== null, "Hansraj College gap analysis returned valid object");
assert(hansrajGap!.hasNoCutoffHistory === false, "hasNoCutoffHistory is FALSE for Hansraj College");
assert(hansrajGap!.cutoffDisplay !== "No past cutoff data yet", "cutoffDisplay has official marks, not 'No past cutoff data yet'");
assert(Math.abs(hansrajGap!.expectedCutoffMarks - 783.9) < 0.2, `expectedCutoffMarks is latest 2026 cutoff (783.9) (got ${hansrajGap!.expectedCutoffMarks})`);
assert(hansrajGap!.cutoffScale === 1000, `cutoffScale is 1000 for Computer Science (got ${hansrajGap!.cutoffScale})`);

// 4 counted subjects for CS: per-subject target should be 783.9 / 4 = 196 marks
const csSubjectTargets = hansrajGap!.subjectImprovementBreakdown;
assert(csSubjectTargets.length === 4, `Computer Science has 4 counted subjects (got ${csSubjectTargets.length})`);
for (const sub of csSubjectTargets) {
  assertClose(sub.targetMarks, 196, 0.5, `${sub.subjectName} target is ~196 marks (783.9 / 4)`);
  assert(sub.currentPerformanceDisplay === "No score yet", `${sub.subjectName} displays "No score yet" when not attempted`);
}


// ---------------------------------------------------------------------------
// TEST 8: Category Matching (UR, OBC, SC, ST, EWS, PwBD)
// ---------------------------------------------------------------------------
console.log("\n--- TEST 8: Category Matching for Hansraj College CS ---");

const categories = ["UR", "OBC", "SC", "ST", "EWS", "PwBD"] as const;
for (const cat of categories) {
  const catGap = computeDreamCollegeGap({
    collegeName: "Hans Raj College",
    courseId: "bsc_hons_computer_science",
    category: cat,
    userAttempts: [],
  });
  assert(catGap !== null, `Category ${cat} found`);
  assert(catGap!.hasNoCutoffHistory === false, `Category ${cat} has historical cutoffs`);
  assert(catGap!.expectedCutoffMarks > 0, `Category ${cat} expected cutoff > 0 (got ${catGap!.expectedCutoffMarks})`);
  console.log(`  ${cat}: ${catGap!.expectedCutoffMarks} / ${catGap!.cutoffScale} marks`);
}


// ---------------------------------------------------------------------------
// TEST 9: Admission Year Selection & Future-Year Fallback
// ---------------------------------------------------------------------------
console.log("\n--- TEST 9: Admission Year Selection & Fallback ---");

// 9a: Selected year 2025 -> should retrieve 2025 cutoff (784.4)
const gap2025 = computeDreamCollegeGap({
  collegeName: "Hansraj College",
  courseId: "bsc_hons_computer_science",
  category: "UR",
  userAttempts: [],
  filterYear: 2025,
});
assert(gap2025 !== null, "2025 gap found");
assertClose(gap2025!.expectedCutoffMarks, 784.4, 0.2, "2025 cutoff is 784.4");
assert(gap2025!.effectiveYear === 2025, "effectiveYear is 2025");
assert(gap2025!.isFallbackYear === false, "isFallbackYear is false for 2025");
assert(gap2025!.cutoffYearLabel.includes("2025"), `cutoffYearLabel mentions 2025 (got "${gap2025!.cutoffYearLabel}")`);

// 9b: Selected year 2027 (future year without published cutoff) -> falls back to 2026 with clear label
const gap2027 = computeDreamCollegeGap({
  collegeName: "Hansraj College",
  courseId: "bsc_hons_computer_science",
  category: "UR",
  userAttempts: [],
  filterYear: 2027,
});
assert(gap2027 !== null, "2027 gap found");
assert(gap2027!.isFallbackYear === true, "isFallbackYear is true for 2027");
assert(gap2027!.effectiveYear === 2026, "effectiveYear is 2026");
assertClose(gap2027!.expectedCutoffMarks, 783.9, 0.2, "Falls back to latest official 2026 cutoff (783.9)");
assert(gap2027!.cutoffYearLabel.includes("2026"), `cutoffYearLabel mentions 2026 fallback (got "${gap2027!.cutoffYearLabel}")`);


// ---------------------------------------------------------------------------
// TEST 10: Projection and Trend Chart Consistency
// ---------------------------------------------------------------------------
console.log("\n--- TEST 10: Projection and Trend Consistency ---");

const projection = getProjectedCutoff("Hans Raj College", "bsc_hons_computer_science", "UR");
assert(projection.yearsCount === 4, `getProjectedCutoff retrieves all 4 years (got ${projection.yearsCount})`);
assert(projection.projectedValue > 700, `projectedValue is reasonable (>700, got ${projection.projectedValue})`);
assert(projection.perSubjectTarget > 0, `perSubjectTarget is > 0 (got ${projection.perSubjectTarget})`);


// ---------------------------------------------------------------------------
// TEST 11: Scale Compatibility & Incompatible Combinations
// ---------------------------------------------------------------------------
console.log("\n--- TEST 11: Incompatible Scale Safety ---");

// If student attempts 4 mock subjects totaling 1000 scale, but college cutoff scale is 750 (or vice versa):
const dummyAttempts: RecordedTestAttempt[] = [
  {
    id: "att-1",
    testId: "test-1",
    testTitle: "English Mock",
    subject: "English",
    correctCount: 40,
    incorrectCount: 10,
    unattemptedCount: 0,
    accuracy: 80,
    timeSpentSeconds: 2000,
    submittedAt: new Date().toISOString(),
    totalMarks: 190,
  },
  {
    id: "att-2",
    testId: "test-2",
    testTitle: "Physics Mock",
    subject: "Physics",
    correctCount: 40,
    incorrectCount: 10,
    unattemptedCount: 0,
    accuracy: 80,
    timeSpentSeconds: 2000,
    submittedAt: new Date().toISOString(),
    totalMarks: 190,
  },
  {
    id: "att-3",
    testId: "test-3",
    testTitle: "Chemistry Mock",
    subject: "Chemistry",
    correctCount: 40,
    incorrectCount: 10,
    unattemptedCount: 0,
    accuracy: 80,
    timeSpentSeconds: 2000,
    submittedAt: new Date().toISOString(),
    totalMarks: 190,
  },
  {
    id: "att-4",
    testId: "test-4",
    testTitle: "Maths Mock",
    subject: "Mathematics",
    correctCount: 40,
    incorrectCount: 10,
    unattemptedCount: 0,
    accuracy: 80,
    timeSpentSeconds: 2000,
    submittedAt: new Date().toISOString(),
    totalMarks: 190,
  },
];

const completedHansraj = computeDreamCollegeGap({
  collegeName: "Hans Raj College",
  courseId: "bsc_cs",
  category: "UR",
  userAttempts: dummyAttempts,
});

assert(completedHansraj !== null, "Completed gap analysis exists");
assert(completedHansraj!.isComplete === true, "Analysis is complete");
assert(completedHansraj!.combinedMarks !== null, `Combined marks calculated (got ${completedHansraj!.combinedMarks})`);
assert(completedHansraj!.marksGap !== null, `Marks gap calculated: cutoff - student = ${completedHansraj!.marksGap}`);


// ---------------------------------------------------------------------------
// TEST 12: Genuinely Missing Cutoff Record Empty State
// ---------------------------------------------------------------------------
console.log("\n--- TEST 12: Informative Empty State for Nonexistent Combinations ---");

const nonexistentGap = computeDreamCollegeGap({
  collegeName: "Nonexistent College XYZ",
  courseId: "bsc_hons_physics",
  category: "UR",
  userAttempts: [],
});

assert(nonexistentGap !== null, "Nonexistent combination returns informative object, not null");
assert(nonexistentGap!.hasNoCutoffHistory === true, "hasNoCutoffHistory is true");
assert(nonexistentGap!.status === "no_data", "Status is 'no_data'");
assert(
  nonexistentGap!.emptyStateReason?.includes("Nonexistent College XYZ"),
  `emptyStateReason specifically mentions the college name (got "${nonexistentGap!.emptyStateReason}")`
);

console.log("\n===============================================================================");
console.log("🎉 ALL TESTS PASSED SUCCESSFULLY! FULL DATA FLOW VERIFIED.");
console.log("===============================================================================\n");
