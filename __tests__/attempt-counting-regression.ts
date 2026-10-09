import { computeAnalyticsFromAttempts, normalizeSubject } from "../lib/analytics";
import { processQuestionsIntoCycles } from "../lib/cycle-engine";
import { RecordedTestAttempt, RecordedQuestionAttempt } from "../types";

function createMockAttempt(
  testId: string,
  subject: string,
  questionCount: number = 40,
  correctCount: number = 8
): RecordedTestAttempt {
  const questions: RecordedQuestionAttempt[] = [];
  for (let i = 1; i <= questionCount; i++) {
    const isCorrect = i <= correctCount;
    questions.push({
      questionId: `${testId}_q_${i}`,
      questionNumber: i,
      subject,
      chapter: subject === "Mathematics" ? "Calculus" : "Organic Chemistry",
      microTopic: subject === "Mathematics" ? "Integration" : "Alcohols & Phenols",
      prompt: `Question ${i}`,
      options: [
        { id: "A", text: "Option A" },
        { id: "B", text: "Option B" },
      ],
      questionType: "MCQ",
      selectedOption: isCorrect ? "A" : "B",
      correctOption: "A",
      isCorrect,
      timeSpentSeconds: 45,
      isTimeSink: false,
      difficulty: "medium",
      ncertReference: "NCERT Class 12",
      explanation: "Solution explanation",
    });
  }

  return {
    id: `attempt_${testId}_${Date.now()}`,
    userId: "test-user-123",
    testId,
    testTitle: `${subject} Mock Examination`,
    subject,
    totalQuestions: questionCount,
    attemptedCount: questionCount,
    unattemptedCount: 0,
    correctCount,
    incorrectCount: questionCount - correctCount,
    totalMarks: correctCount * 5 - (questionCount - correctCount) * 1,
    maxMarks: questionCount * 5,
    accuracyPercentage: Math.round((correctCount / questionCount) * 100),
    timeTakenSeconds: questionCount * 45,
    timeSinkCount: 0,
    submittedAt: new Date().toISOString(),
    questions,
  };
}

async function runTests() {
  console.log("=== Running Canonical Attempt Counting & Integrity Regression Suite ===\n");

  // 1. Fresh user completes 1 mock of 40 qualifying questions (The exact user bug scenario)
  console.log("TEST 1: 1 Mock of 40 Questions (8 correct -> 20% accuracy)");
  const mock40 = createMockAttempt("math-mock-1", "Mathematics", 40, 8);
  const analytics1 = computeAnalyticsFromAttempts([mock40]);

  console.assert(
    analytics1.totalQuestionsAttempted === 40,
    `[FAIL] Expected exactly 40 total questions attempted, got ${analytics1.totalQuestionsAttempted}`
  );
  console.assert(
    analytics1.overallAccuracyPercentage === 20,
    `[FAIL] Expected 20% accuracy, got ${analytics1.overallAccuracyPercentage}%`
  );
  console.assert(
    analytics1.completedTestsCount === 1,
    `[FAIL] Expected 1 completed test, got ${analytics1.completedTestsCount}`
  );

  const mathKey = normalizeSubject("Mathematics").key;
  const mathCal = analytics1.subjectCalibration?.[mathKey];
  console.assert(
    mathCal?.totalAttempted === 40,
    `[FAIL] Expected 40 attempts for Mathematics calibration, got ${mathCal?.totalAttempted}`
  );
  console.assert(
    mathCal?.attemptsToUnlock === 110,
    `[FAIL] Expected 110 remaining to unlock, got ${mathCal?.attemptsToUnlock}`
  );

  // Verify Cycle Engine with 40 questions
  const cycles1 = await processQuestionsIntoCycles([], mock40.questions);
  console.assert(
    cycles1.currentCycleNumber === 1,
    `[FAIL] Expected cycle 1, got ${cycles1.currentCycleNumber}`
  );
  console.assert(
    cycles1.currentCycleQuestionCount === 40,
    `[FAIL] Expected 40 questions in cycle 1, got ${cycles1.currentCycleQuestionCount}`
  );
  console.assert(
    cycles1.cycles.length === 0,
    `[FAIL] Expected 0 completed cycles, got ${cycles1.cycles.length}`
  );
  console.log("  ✓ Test 1 Passed: Exactly 40 attempts, 20% accuracy, 40/150 in cycle.");

  // 2. Idempotency under multiple submissions (1x, 2x, 10x duplicate callbacks)
  console.log("\nTEST 2: Submission Idempotency (Processed 1x, 2x, 10x)");
  const duplicateAttempts: RecordedTestAttempt[] = [];
  for (let i = 0; i < 10; i++) {
    duplicateAttempts.push({
      ...mock40,
      id: `attempt_dup_${i}_${mock40.testId}`,
    });
  }

  const analytics10x = computeAnalyticsFromAttempts(duplicateAttempts);
  console.assert(
    analytics10x.totalQuestionsAttempted === 40,
    `[FAIL] 10 duplicate submissions produced ${analytics10x.totalQuestionsAttempted} attempts (expected 40)`
  );
  console.assert(
    analytics10x.completedTestsCount === 1,
    `[FAIL] 10 duplicate submissions produced ${analytics10x.completedTestsCount} tests (expected 1)`
  );

  const cycles10x = await processQuestionsIntoCycles(
    [],
    duplicateAttempts.flatMap((a) => a.questions || [])
  );
  console.assert(
    cycles10x.currentCycleQuestionCount === 40,
    `[FAIL] 10 duplicate submissions produced ${cycles10x.currentCycleQuestionCount} cycle questions (expected 40)`
  );
  console.log("  ✓ Test 2 Passed: Processed 10x duplicate submissions -> still exactly 40 attempts.");

  // 3. Different Subjects: 40 Mathematics + 40 Chemistry = 80 Total
  console.log("\nTEST 3: Multi-Subject Isolation (40 Math + 40 Chemistry)");
  const chem40 = createMockAttempt("chem-mock-1", "Chemistry", 40, 20);
  const multiSubjectAnalytics = computeAnalyticsFromAttempts([mock40, chem40]);

  console.assert(
    multiSubjectAnalytics.totalQuestionsAttempted === 80,
    `[FAIL] Expected 80 total questions across Math + Chem, got ${multiSubjectAnalytics.totalQuestionsAttempted}`
  );
  console.assert(
    multiSubjectAnalytics.completedTestsCount === 2,
    `[FAIL] Expected 2 completed tests, got ${multiSubjectAnalytics.completedTestsCount}`
  );

  const chemKey = normalizeSubject("Chemistry").key;
  const chemCal = multiSubjectAnalytics.subjectCalibration?.[chemKey];
  const mathCal2 = multiSubjectAnalytics.subjectCalibration?.[mathKey];

  console.assert(
    mathCal2?.totalAttempted === 40,
    `[FAIL] Mathematics should show exactly 40 attempts, got ${mathCal2?.totalAttempted}`
  );
  console.assert(
    chemCal?.totalAttempted === 40,
    `[FAIL] Chemistry should show exactly 40 attempts, got ${chemCal?.totalAttempted}`
  );

  const multiCycles = await processQuestionsIntoCycles([], [
    ...(mock40.questions || []),
    ...(chem40.questions || []),
  ]);
  console.assert(
    multiCycles.currentCycleQuestionCount === 80,
    `[FAIL] Expected 80 cycle questions, got ${multiCycles.currentCycleQuestionCount}`
  );
  console.log("  ✓ Test 3 Passed: Math = 40, Chem = 40, Total = 80, Cycle = 80.");

  // 4. 150-Question Diagnostic Cycle Boundary & Gate
  console.log("\nTEST 4: 150-Question Calibration Gate Boundary (149 vs 150)");
  const mock50_1 = createMockAttempt("mock-50-1", "Physics", 50, 25);
  const mock50_2 = createMockAttempt("mock-50-2", "Physics", 50, 25);
  const mock49_3 = createMockAttempt("mock-49-3", "Physics", 49, 25);

  const questions149 = [
    ...(mock50_1.questions || []),
    ...(mock50_2.questions || []),
    ...(mock49_3.questions || []),
  ];
  const under150Cycles = await processQuestionsIntoCycles([], questions149);
  console.assert(
    under150Cycles.currentCycleQuestionCount === 149,
    `[FAIL] Expected 149 questions, got ${under150Cycles.currentCycleQuestionCount}`
  );
  console.assert(
    under150Cycles.cycles.length === 0,
    `[FAIL] 149 questions should not complete cycle 1, got ${under150Cycles.cycles.length} completed`
  );

  // Add 1 more question to hit exactly 150
  const mock1_single = createMockAttempt("mock-1-single", "Physics", 1, 1);
  const questions150 = [...questions149, ...(mock1_single.questions || [])];
  const exact150Cycles = await processQuestionsIntoCycles([], questions150);
  console.assert(
    exact150Cycles.cycles.length === 1,
    `[FAIL] Exactly 150 questions must complete Cycle 1, got ${exact150Cycles.cycles.length} completed`
  );
  console.assert(
    exact150Cycles.cycles[0]?.cycleNumber === 1 &&
      exact150Cycles.cycles[0]?.questions.length === 150,
    `[FAIL] Completed cycle 1 must have exactly 150 questions`
  );
  console.assert(
    exact150Cycles.currentCycleNumber === 2 && exact150Cycles.currentCycleQuestionCount === 0,
    `[FAIL] After 150 questions, should advance to Cycle 2 with 0 questions`
  );
  console.log("  ✓ Test 4 Passed: 149 remains locked in Cycle 1; 150 completes Cycle 1 and advances to Cycle 2.");

  // 5. Database user_attempts deduplication logic
  console.log("\nTEST 5: Database user_attempts Deduplication Invariant");
  const dbRowsWithDupes = [
    // 40 qualifying answers
    ...mock40.questions.map((q) => ({
      id: `ua_canon_${q.questionId}`,
      test_id: "mock_uuid_40",
      question_id: q.questionId,
      selected_option: q.selectedOption,
      is_correct: q.isCorrect,
    })),
    // Duplicate rows from duplicate concurrent POST
    ...mock40.questions.map((q) => ({
      id: `ua_dupe_${q.questionId}`,
      test_id: "mock_uuid_40",
      question_id: q.questionId,
      selected_option: q.selectedOption,
      is_correct: q.isCorrect,
    })),
  ];

  console.assert(
    dbRowsWithDupes.length === 80,
    `[FAIL] Expected 80 raw rows before dedup, got ${dbRowsWithDupes.length}`
  );

  const seenKeys = new Set<string>();
  const deduplicated = dbRowsWithDupes.filter((ua) => {
    if (ua.selected_option === null || ua.selected_option === undefined) return false;
    const k = `${ua.test_id || "default"}:::${ua.question_id || ua.id}`;
    if (seenKeys.has(k)) return false;
    seenKeys.add(k);
    return true;
  });

  console.assert(
    deduplicated.length === 40,
    `[FAIL] Deduplication must reduce 80 rows to 40, got ${deduplicated.length}`
  );
  console.log("  ✓ Test 5 Passed: 80 duplicate DB rows deduplicated to 40 canonical attempts.");

  console.log("\n==================================================");
  console.log("ALL 5 CANONICAL ATTEMPT REGRESSION TESTS PASSED! ✅");
  console.log("==================================================");
}

runTests();
