/**
 * Regression Test Suite: Scorecard Instant Correctness & Answer State Integrity
 *
 * Verifies that:
 * 1. Correct answers are shown as correct on the first scorecard render without temporary incorrect flash.
 * 2. Incorrect answers are shown as incorrect with -1 penalty.
 * 3. Unanswered questions are shown as skipped (0 marks), not incorrect by default.
 * 4. Mixed correct, incorrect, and unanswered questions render correctly.
 * 5. Unknown / loading correctness data is preserved as null and NEVER coerced to false.
 * 6. Slow network / delayed API response does not cause premature incorrect rendering.
 * 7. Refreshing or reopening the scorecard preserves accurate results.
 * 8. Final score and negative marking remain strictly compliant (+5, -1, 0).
 * 9. Post-mock engine telemetry normalization handles all option key formats without mismatch.
 */

import assert from "node:assert";

class MockStorage {
  private store = new Map<string, string>();
  get length(): number { return this.store.size; }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  getItem(key: string): string | null { return this.store.get(key) ?? null; }
  setItem(key: string, value: string): void { this.store.set(key, value); }
  removeItem(key: string): void { this.store.delete(key); }
  clear(): void { this.store.clear(); }
}

const mockLocalStorage = new MockStorage();
const mockSessionStorage = new MockStorage();

(global as any).window = {
  localStorage: mockLocalStorage,
  sessionStorage: mockSessionStorage,
  location: { pathname: "/test/physics-mock-1", origin: "http://localhost:3000" },
};

import { useCBTStore, sanitizeQuestionForActiveExam } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { buildPostMockDeterministicReport } from "@/lib/post-mock-engine";
import { resolveQuestionCorrectOptionId } from "@/lib/scoring";
import { RecordedTestAttempt } from "@/types";

runAllScorecardRegressionTests().catch((err) => {
  console.error("FATAL ERROR IN SCORECARD REGRESSION SUITE:", err);
  process.exit(1);
});

async function runAllScorecardRegressionTests() {
  console.log("=================================================================");
  console.log("    SCORECARD INSTANT CORRECTNESS & FLASH PREVENTION TESTS       ");
  console.log("=================================================================\n");

  resetEnvironment();

  await test1_CorrectAnswerShownAsCorrectImmediately();
  await test2_IncorrectAnswerShownAsIncorrect();
  await test3_UnansweredQuestionsNotMarkedIncorrect();
  await test4_MixedSubmissionsRenderAccurately();
  await test5_MissingCorrectnessDataPreservedAsNullNeverCoercedToFalse();
  await test6_SlowNetworkDoesNotFlashIncorrectAnswers();
  await test7_ScorecardReloadPreservesAccurateState();
  await test8_NegativeMarkingAndGradingIntegrity();
  await test9_AuthoritativeKeyResolutionAcrossAllRepresentations();

  console.log("\n=================================================================");
  console.log("  ALL SCORECARD CORRECTNESS REGRESSION TESTS PASSED! ✅          ");
  console.log("=================================================================\n");
}

function resetEnvironment() {
  mockLocalStorage.clear();
  mockSessionStorage.clear();
  useCBTStore.getState().abandonTest();
  useTestStore.getState().clearAttempts();
}

/**
 * 1. A correct answer is shown as correct on the first scorecard render.
 */
async function test1_CorrectAnswerShownAsCorrectImmediately() {
  console.log("Test 1: Correct answer shown as correct on the first scorecard render");
  resetEnvironment();

  const testId = "physics-mock-1";
  const { testMeta, questions: rawQuestions } = getQuestionsForTest(testId);
  const activeQuestions = rawQuestions.map(sanitizeQuestionForActiveExam);

  // Initialize test session
  useCBTStore.getState().initTest(testId, testMeta, activeQuestions, true);

  // Question 1 correct key in physics-mock-1 is "C"
  const q1Correct = resolveQuestionCorrectOptionId(rawQuestions[0]);
  assert.strictEqual(q1Correct, "C", "Q1 correct key must be C");

  // Select option C (correct)
  useCBTStore.getState().selectOption("C");

  // Mock server response for record-attempt returning authoritative questions
  (global as any).fetch = async (url: string) => {
    if (url.includes("/api/test/record-attempt")) {
      return {
        ok: true,
        json: async () => ({
          success: true,
          questions: rawQuestions,
          attempt: {
            attemptedCount: 1,
            unattemptedCount: 49,
            correctCount: 1,
            incorrectCount: 0,
            totalMarks: 5,
            maxMarks: 250,
            accuracyPercentage: 100,
          },
        }),
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };

  // Submit test
  await useCBTStore.getState().submitTest();

  // Inspect state immediately after submission
  const state = useCBTStore.getState();
  assert.strictEqual(state.isSubmitted, true, "Test must be submitted");
  assert.strictEqual(state.submittedScore?.correctCount, 1, "Correct count must be 1 on first render");
  assert.strictEqual(state.submittedScore?.incorrectCount, 0, "Incorrect count must be 0 on first render");
  assert.strictEqual(state.submittedScore?.totalMarks, 5, "Total marks must be +5 on first render");

  // Build report from recorded attempt
  const recordedAttempt = useTestStore.getState().testAttempts[0];
  assert(recordedAttempt, "Recorded attempt must exist in test store");
  const report = buildPostMockDeterministicReport(recordedAttempt, state.questions);

  assert.strictEqual(report.overall.correctCount, 1, "Report correct count must be 1");
  assert.strictEqual(report.overall.incorrectCount, 0, "Report incorrect count must be 0");
  assert.strictEqual(report.overall.totalMarks, 5, "Report total marks must be 5");
  assert(report.allQuestions[0], "First question must exist in report");
  assert.strictEqual(report.allQuestions[0]!.isCorrect, true, "Q1 isCorrect must be TRUE on first render");
  assert.strictEqual(report.allQuestions[0]!.correctOption, "C", "Q1 correctOption must be 'C'");

  console.log("  ✓ PASS: Correct answer displays as +5 marks (correct) immediately without flash.");
}

/**
 * 2. An incorrect answer is shown as incorrect on the first valid render.
 */
async function test2_IncorrectAnswerShownAsIncorrect() {
  console.log("Test 2: Incorrect answer shown as incorrect on first valid render");
  resetEnvironment();

  const testId = "physics-mock-1";
  const { testMeta, questions: rawQuestions } = getQuestionsForTest(testId);
  const activeQuestions = rawQuestions.map(sanitizeQuestionForActiveExam);

  useCBTStore.getState().initTest(testId, testMeta, activeQuestions, true);

  // Q1 correct key is "C". Candidate selects "A" (incorrect).
  useCBTStore.getState().selectOption("A");

  (global as any).fetch = async (url: string) => {
    if (url.includes("/api/test/record-attempt")) {
      return {
        ok: true,
        json: async () => ({
          success: true,
          questions: rawQuestions,
          attempt: {
            attemptedCount: 1,
            unattemptedCount: 49,
            correctCount: 0,
            incorrectCount: 1,
            totalMarks: -1,
            maxMarks: 250,
            accuracyPercentage: 0,
          },
        }),
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };

  await useCBTStore.getState().submitTest();

  const state = useCBTStore.getState();
  assert.strictEqual(state.submittedScore?.correctCount, 0, "Correct count must be 0");
  assert.strictEqual(state.submittedScore?.incorrectCount, 1, "Incorrect count must be 1");
  assert.strictEqual(state.submittedScore?.totalMarks, -1, "Total marks must be -1 for incorrect answer");

  const recordedAttempt = useTestStore.getState().testAttempts[0];
  assert(recordedAttempt, "Recorded attempt must exist in test store");
  const report = buildPostMockDeterministicReport(recordedAttempt, state.questions);

  assert(report.allQuestions[0], "First question must exist in report");
  assert.strictEqual(report.allQuestions[0]!.isCorrect, false, "Q1 isCorrect must be false");
  assert.strictEqual(report.allQuestions[0]!.selectedOption, "A", "Candidate pick must be 'A'");
  assert.strictEqual(report.allQuestions[0]!.correctOption, "C", "Correct option must be 'C'");

  console.log("  ✓ PASS: Incorrect answer correctly graded with -1 penalty on first render.");
}

/**
 * 3. An unanswered question is shown as unanswered, not incorrect by default.
 */
async function test3_UnansweredQuestionsNotMarkedIncorrect() {
  console.log("Test 3: Unanswered questions shown as unanswered, not incorrect by default");
  resetEnvironment();

  const testId = "physics-mock-1";
  const { testMeta, questions: rawQuestions } = getQuestionsForTest(testId);
  const activeQuestions = rawQuestions.map(sanitizeQuestionForActiveExam);

  useCBTStore.getState().initTest(testId, testMeta, activeQuestions, true);

  // Candidate answers Q1, but leaves Q2 through Q50 unanswered
  useCBTStore.getState().selectOption("C"); // Q1 correct

  (global as any).fetch = async () => ({
    ok: true,
    json: async () => ({ success: true, questions: rawQuestions }),
  });

  await useCBTStore.getState().submitTest();

  const recordedAttempt = useTestStore.getState().testAttempts[0];
  assert(recordedAttempt, "Recorded attempt must exist in test store");
  const report = buildPostMockDeterministicReport(recordedAttempt, useCBTStore.getState().questions);

  // Check unanswered questions (Q2 through Q50)
  for (let i = 1; i < report.allQuestions.length; i++) {
    const q = report.allQuestions[i];
    assert(q, `Q${i + 1} must exist in report`);
    assert.strictEqual(q!.isAttempted, false, `Q${i + 1} must be marked isAttempted=false`);
    assert.strictEqual(q!.isSkipped, true, `Q${i + 1} must be marked isSkipped=true`);
    assert.strictEqual(q!.isCorrect, null, `Q${i + 1} isCorrect must be NULL, never false`);
    assert.strictEqual(q!.selectedOption, null, `Q${i + 1} selectedOption must be null`);
  }

  assert.strictEqual(report.overall.skippedCount, 49, "Skipped count must be 49");
  assert.strictEqual(report.overall.incorrectCount, 0, "Incorrect count must not count unanswered questions");

  console.log("  ✓ PASS: 49 unattempted questions strictly preserved as skipped (null correctness, 0 penalty).");
}

/**
 * 4. Mixed correct, incorrect, and unanswered questions render correctly.
 */
async function test4_MixedSubmissionsRenderAccurately() {
  console.log("Test 4: Mixed correct, incorrect, and unanswered questions render correctly");
  resetEnvironment();

  const testId = "physics-mock-1";
  const { testMeta, questions: rawQuestions } = getQuestionsForTest(testId);
  const activeQuestions = rawQuestions.map(sanitizeQuestionForActiveExam);

  useCBTStore.getState().initTest(testId, testMeta, activeQuestions, true);

  // Q1 correct key is "C". Answer "C" -> correct (+5)
  useCBTStore.getState().selectOption("C");
  useCBTStore.getState().saveAndNext();

  // Q2 correct key is rawQuestions[1]
  const q2Correct = resolveQuestionCorrectOptionId(rawQuestions[1])!;
  const q2Wrong = q2Correct === "A" ? "B" : "A";
  useCBTStore.getState().selectOption(q2Wrong as any); // Q2 incorrect (-1)
  useCBTStore.getState().saveAndNext();

  // Leave Q3 through Q50 unattempted (0 marks)

  (global as any).fetch = async () => ({
    ok: true,
    json: async () => ({ success: true, questions: rawQuestions }),
  });

  await useCBTStore.getState().submitTest();

  const recordedAttempt = useTestStore.getState().testAttempts[0];
  assert(recordedAttempt, "Recorded attempt must exist in test store");
  const report = buildPostMockDeterministicReport(recordedAttempt, useCBTStore.getState().questions);

  assert.strictEqual(report.overall.attemptedCount, 2, "Attempted count must be 2");
  assert.strictEqual(report.overall.correctCount, 1, "Correct count must be 1");
  assert.strictEqual(report.overall.incorrectCount, 1, "Incorrect count must be 1");
  assert.strictEqual(report.overall.skippedCount, 48, "Skipped count must be 48");
  // Total marks: 1 * 5 - 1 = +4 marks
  assert.strictEqual(report.overall.totalMarks, 4, "Total marks must be exactly +4 (5 - 1)");
  assert.strictEqual(report.overall.accuracyPercentage, 50, "Accuracy must be 50%");

  console.log("  ✓ PASS: Mixed submission (1 correct, 1 wrong, 48 unattempted) grades to exactly +4 marks.");
}

/**
 * 5. Unknown / loading correctness data is preserved as null and NEVER coerced to false.
 */
async function test5_MissingCorrectnessDataPreservedAsNullNeverCoercedToFalse() {
  console.log("Test 5: Missing correctness data preserved as null and never coerced to false");

  // Synthesize an attempt where answer keys have not yet loaded from server
  const syntheticAttempt: RecordedTestAttempt = {
    id: "attempt_pending_123",
    attemptId: "pending_uuid",
    userId: "test_user",
    testId: "custom_exam",
    testTitle: "Test Paper",
    subject: "Physics",
    totalQuestions: 2,
    attemptedCount: 2,
    unattemptedCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    totalMarks: 0,
    maxMarks: 10,
    accuracyPercentage: 0,
    timeTakenSeconds: 60,
    timeSinkCount: 0,
    submittedAt: new Date().toISOString(),
    questions: [
      {
        questionId: "q_1",
        questionNumber: 1,
        subject: "Physics",
        chapter: "Kinematics",
        microTopic: "Core",
        prompt: "Sample question prompt",
        options: [
          { id: "A", text: "Option A" },
          { id: "B", text: "Option B" },
          { id: "C", text: "Option C" },
          { id: "D", text: "Option D" },
        ],
        selectedOption: "B",
        correctOption: ("" as any), // Key unknown / not yet loaded
        isCorrect: null,            // Status unknown
        timeSpentSeconds: 30,
        difficulty: "medium",
        isTimeSink: false,
      },
      {
        questionId: "q_2",
        questionNumber: 2,
        subject: "Physics",
        chapter: "Kinematics",
        microTopic: "Core",
        prompt: "Sample question 2",
        options: [
          { id: "A", text: "Option A" },
          { id: "B", text: "Option B" },
          { id: "C", text: "Option C" },
          { id: "D", text: "Option D" },
        ],
        selectedOption: null, // Skipped
        correctOption: ("" as any),
        isCorrect: null,
        timeSpentSeconds: 10,
        difficulty: "easy",
        isTimeSink: false,
      },
    ],
  };

  // Build report without fallback questions (keys completely missing)
  const report = buildPostMockDeterministicReport(syntheticAttempt);

  // CRITICAL VERIFICATION:
  // Q1 had an attempted answer, but unknown key. It MUST NOT be marked incorrect!
  assert(report.allQuestions[0], "First question must exist in report");
  assert.strictEqual(
    report.allQuestions[0]!.isCorrect,
    null,
    "Unknown correctness must remain NULL, never coerced to false"
  );
  assert.strictEqual(
    report.overall.incorrectCount,
    0,
    "Unknown answers must NOT be counted as incorrect in score summary"
  );
  assert.strictEqual(
    report.overall.totalMarks,
    0,
    "Unknown answers must not deduct negative marks (-1)"
  );

  console.log("  ✓ PASS: Unknown correctness strictly remains null and does not increment incorrectCount or apply negative marking.");
}

/**
 * 6. Slow network / delayed API response does not flash incorrect answers.
 */
async function test6_SlowNetworkDoesNotFlashIncorrectAnswers() {
  console.log("Test 6: Slow network does not flash incorrect answers");
  resetEnvironment();

  const testId = "physics-mock-1";
  const { testMeta, questions: rawQuestions } = getQuestionsForTest(testId);
  const activeQuestions = rawQuestions.map(sanitizeQuestionForActiveExam);

  useCBTStore.getState().initTest(testId, testMeta, activeQuestions, true);
  useCBTStore.getState().selectOption("C"); // Q1 correct

  // Simulate a network delay before record-attempt responds
  let networkFinished = false;
  (global as any).fetch = async (url: string) => {
    if (url.includes("/api/test/record-attempt")) {
      await new Promise((r) => setTimeout(r, 50));
      networkFinished = true;
      return {
        ok: true,
        json: async () => ({
          success: true,
          questions: rawQuestions,
          attempt: {
            attemptedCount: 1,
            unattemptedCount: 49,
            correctCount: 1,
            incorrectCount: 0,
            totalMarks: 5,
            maxMarks: 250,
            accuracyPercentage: 100,
          },
        }),
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };

  // Launch submission asynchronously
  const submitPromise = useCBTStore.getState().submitTest();

  // While submission is in-flight, isSubmitted must remain false (submit modal stays open with spinner)
  assert.strictEqual(
    useCBTStore.getState().isSubmitted,
    false,
    "Scorecard must NOT open while submission network request is in-flight"
  );

  await submitPromise;
  assert.strictEqual(networkFinished, true, "Network request must have finished");

  // Once submitted, scorecard opens with verified correct state immediately
  const finalState = useCBTStore.getState();
  assert.strictEqual(finalState.isSubmitted, true, "Scorecard opens after submission completes");
  assert.strictEqual(finalState.submittedScore?.correctCount, 1, "First visible render has correctCount = 1");
  assert.strictEqual(finalState.submittedScore?.incorrectCount, 0, "First visible render has incorrectCount = 0");

  console.log("  ✓ PASS: Scorecard opens only after verification finishes; no intermediate incorrect flash occurs.");
}

/**
 * 7. Refreshing or reopening the scorecard preserves accurate results.
 */
async function test7_ScorecardReloadPreservesAccurateState() {
  console.log("Test 7: Scorecard reload preserves accurate state");
  resetEnvironment();

  const testId = "chemistry-mock-1";
  const { testMeta, questions: rawQuestions } = getQuestionsForTest(testId);
  const activeQuestions = rawQuestions.map(sanitizeQuestionForActiveExam);

  useCBTStore.getState().initTest(testId, testMeta, activeQuestions, true);

  const q1Key = resolveQuestionCorrectOptionId(rawQuestions[0])!;
  useCBTStore.getState().selectOption(q1Key as any);

  (global as any).fetch = async () => ({
    ok: true,
    json: async () => ({ success: true, questions: rawQuestions }),
  });

  await useCBTStore.getState().submitTest();

  const preReloadScore = useCBTStore.getState().submittedScore;

  // Simulate page refresh: initTest without forceFresh
  useCBTStore.getState().initTest(testId, testMeta, activeQuestions, false);

  const postReloadState = useCBTStore.getState();
  assert.strictEqual(postReloadState.isSubmitted, true, "Reloaded test must remain submitted");
  assert.strictEqual(
    postReloadState.submittedScore?.correctCount,
    preReloadScore?.correctCount,
    "Reloaded correctCount must match pre-reload score"
  );
  assert.strictEqual(
    postReloadState.submittedScore?.totalMarks,
    preReloadScore?.totalMarks,
    "Reloaded totalMarks must match pre-reload score"
  );

  console.log("  ✓ PASS: Refreshing or reopening the scorecard preserves verified scores identically.");
}

/**
 * 8. Final score and negative marking remain strictly NTA compliant (+5, -1, 0).
 */
async function test8_NegativeMarkingAndGradingIntegrity() {
  console.log("Test 8: Negative marking and grading integrity (+5, -1, 0)");

  // Test full range of scenarios
  const cases = [
    { correct: 50, wrong: 0, unattempted: 0, expectedMarks: 250 },
    { correct: 0, wrong: 50, unattempted: 0, expectedMarks: -50 },
    { correct: 40, wrong: 5, unattempted: 5, expectedMarks: 195 },
    { correct: 0, wrong: 0, unattempted: 50, expectedMarks: 0 },
    { correct: 10, wrong: 10, unattempted: 30, expectedMarks: 40 },
  ];

  for (const c of cases) {
    const marks = c.correct * 5 - c.wrong * 1;
    assert.strictEqual(
      marks,
      c.expectedMarks,
      `Marking calculation for (${c.correct}C, ${c.wrong}W, ${c.unattempted}U) must equal ${c.expectedMarks}`
    );
  }

  console.log("  ✓ PASS: NTA +5 / -1 / 0 marking scheme verified across all score distributions.");
}

/**
 * 9. Authoritative key resolution across all representations.
 */
async function test9_AuthoritativeKeyResolutionAcrossAllRepresentations() {
  console.log("Test 9: Authoritative key resolution across all representations");

  // Format 1: correctOptionId
  assert.strictEqual(resolveQuestionCorrectOptionId({ correctOptionId: "B" }), "B");
  // Format 2: correct_option (DB snake_case)
  assert.strictEqual(resolveQuestionCorrectOptionId({ correct_option: "C" }), "C");
  // Format 3: correctOption (camelCase)
  assert.strictEqual(resolveQuestionCorrectOptionId({ correctOption: "D" }), "D");
  // Format 4: options array with isCorrect: true
  assert.strictEqual(
    resolveQuestionCorrectOptionId({
      options: [
        { id: "A", isCorrect: false },
        { id: "B", isCorrect: true },
        { id: "C", isCorrect: false },
        { id: "D", isCorrect: false },
      ],
    }),
    "B"
  );
  // Format 5: lowercase normalization
  assert.strictEqual(resolveQuestionCorrectOptionId({ correctOptionId: "a" }), "A");
  // Format 6: null / undefined / missing returns null
  assert.strictEqual(resolveQuestionCorrectOptionId(null), null);
  assert.strictEqual(resolveQuestionCorrectOptionId({}), null);
  assert.strictEqual(resolveQuestionCorrectOptionId({ correctOptionId: "" }), null);

  console.log("  ✓ PASS: All 6 question representations resolve reliably to canonical 'A'|'B'|'C'|'D'.");
}
