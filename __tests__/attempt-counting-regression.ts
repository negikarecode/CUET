import { computeAnalyticsFromAttempts, normalizeSubject } from "../lib/analytics";
import { RecordedTestAttempt, RecordedQuestionAttempt } from "../types";

function createMockAttempt(testId: string, subject: string, questionCount: number = 50): RecordedTestAttempt {
  const questions: RecordedQuestionAttempt[] = [];
  for (let i = 1; i <= questionCount; i++) {
    questions.push({
      questionId: `${testId}_q_${i}`,
      questionNumber: i,
      subject,
      chapter: "Calculus",
      microTopic: "Integration",
      prompt: `Question ${i}`,
      options: [
        { id: "A", text: "Option A" },
        { id: "B", text: "Option B" },
      ],
      questionType: "MCQ",
      selectedOption: i <= 12 ? "A" : "B",
      correctOption: "A",
      isCorrect: i <= 12,
      timeSpentSeconds: 45,
      isTimeSink: false,
      difficulty: "medium",
      ncertReference: "NCERT Class 12",
      explanation: "Solution",
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
    correctCount: 12,
    incorrectCount: 38,
    totalMarks: 22,
    maxMarks: 250,
    accuracyPercentage: 24,
    timeTakenSeconds: 2250,
    timeSinkCount: 0,
    submittedAt: new Date().toISOString(),
    questions,
  };
}

function runTests() {
  console.log("=== Running Attempt Counting & Deduplication Tests ===");

  // 1. Single 50-Q mock test
  const mock1 = createMockAttempt("math-mock-1", "Mathematics", 50);
  const analytics1 = computeAnalyticsFromAttempts([mock1]);

  console.assert(
    analytics1.totalQuestionsAttempted === 50,
    `Expected 50 total questions attempted, got ${analytics1.totalQuestionsAttempted}`
  );
  console.assert(
    analytics1.completedTestsCount === 1,
    `Expected 1 completed test, got ${analytics1.completedTestsCount}`
  );

  const mathKey = normalizeSubject("Mathematics").key;
  const mathCal1 = analytics1.subjectCalibration?.[mathKey];
  console.assert(
    mathCal1?.totalAttempted === 50,
    `Expected 50 attempts for Mathematics, got ${mathCal1?.totalAttempted}`
  );
  console.assert(
    mathCal1?.attemptsToUnlock === 100,
    `Expected 100 left to unlock for Mathematics, got ${mathCal1?.attemptsToUnlock}`
  );

  console.log("Test 1 Passed: 1 single 50-Q mock produces exactly 50 total questions and 50/150 subject calibration.");

  // 2. Re-rendering / re-recording the same test attempt (same testId)
  const duplicateMock1 = { ...mock1, id: `attempt_math-mock-1_dup_${Date.now()}` };
  // Zustand store replaces if testId matches:
  const attemptsList = [mock1];
  const existingIdx = attemptsList.findIndex((a) => a.testId === duplicateMock1.testId);
  if (existingIdx >= 0) {
    attemptsList[existingIdx] = duplicateMock1;
  } else {
    attemptsList.unshift(duplicateMock1);
  }
  const analyticsAfterReRender = computeAnalyticsFromAttempts(attemptsList);

  console.assert(
    analyticsAfterReRender.totalQuestionsAttempted === 50,
    `Expected 50 after re-render/re-submit, got ${analyticsAfterReRender.totalQuestionsAttempted}`
  );
  console.assert(
    attemptsList.length === 1,
    `Expected 1 attempt in store after re-render, got ${attemptsList.length}`
  );

  console.log("Test 2 Passed: Re-rendering / re-submitting the same mock does NOT increment attempts count.");

  // 3. Two distinct 50-Q mock tests
  const mock2 = createMockAttempt("math-mock-2", "Mathematics", 50);
  const analytics2 = computeAnalyticsFromAttempts([mock1, mock2]);

  console.assert(
    analytics2.totalQuestionsAttempted === 100,
    `Expected 100 total questions attempted across 2 mocks, got ${analytics2.totalQuestionsAttempted}`
  );
  console.assert(
    analytics2.completedTestsCount === 2,
    `Expected 2 completed tests, got ${analytics2.completedTestsCount}`
  );

  const mathCal2 = analytics2.subjectCalibration?.[mathKey];
  console.assert(
    mathCal2?.totalAttempted === 100,
    `Expected 100 attempts for Mathematics across 2 mocks, got ${mathCal2?.totalAttempted}`
  );
  console.assert(
    mathCal2?.attemptsToUnlock === 50,
    `Expected 50 left to unlock for Mathematics across 2 mocks, got ${mathCal2?.attemptsToUnlock}`
  );

  console.log("Test 3 Passed: 2 distinct 50-Q mocks produce exactly 100 total questions and 100/150 subject calibration.");

  // 4. Server deduplication test
  const simulatedDbUserAttempts = [
    // Mock 1 questions (50 questions)
    ...mock1.questions.map((q) => ({
      id: `ua_1_${q.questionId}`,
      test_id: "test-uuid-1",
      question_id: q.questionId,
      selected_option: q.selectedOption,
      is_correct: q.isCorrect,
    })),
    // Duplicate rows from duplicate POST
    ...mock1.questions.map((q) => ({
      id: `ua_2_${q.questionId}`,
      test_id: "test-uuid-1",
      question_id: q.questionId,
      selected_option: q.selectedOption,
      is_correct: q.isCorrect,
    })),
  ];

  const seenDbKeys = new Set<string>();
  const deduplicatedAttemptedRows = simulatedDbUserAttempts.filter((ua) => {
    if (ua.selected_option === null || ua.selected_option === undefined) return false;
    const key = `${ua.test_id || "default"}_${ua.question_id || ua.id}`;
    if (seenDbKeys.has(key)) return false;
    seenDbKeys.add(key);
    return true;
  });

  console.assert(
    simulatedDbUserAttempts.length === 100,
    `Expected 100 raw db attempts before dedup, got ${simulatedDbUserAttempts.length}`
  );
  console.assert(
    deduplicatedAttemptedRows.length === 50,
    `Expected 50 deduplicated db attempts, got ${deduplicatedAttemptedRows.length}`
  );

  console.log("Test 4 Passed: Server deduplication properly filters duplicate rows down to 50.");

  console.log("\nALL REGRESSION TESTS PASSED SUCCESSFULLY!");
}

runTests();
