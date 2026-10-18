import { computeAnalyticsFromAttempts, getCanonicalTestKey, deduplicateTestAttempts } from "../lib/analytics";
import { computeAuthoritativeDiagnosticProgress, countQualifyingFromTestAttempts } from "../lib/diagnostic-status";
import { stringToUuid } from "../lib/utils";
import { RecordedTestAttempt, RecordedQuestionAttempt } from "../types";

function build50QuestionMock(testId: string, testTitle: string, correctCount = 16): RecordedTestAttempt {
  const totalQuestions = 50;
  const incorrectCount = totalQuestions - correctCount;
  const questions: RecordedQuestionAttempt[] = [];

  for (let i = 1; i <= totalQuestions; i++) {
    const isCorrect = i <= correctCount;
    questions.push({
      questionId: `${testId}_q_${i}`,
      questionNumber: i,
      subject: "Physics",
      chapter: "Electrostatics",
      microTopic: "Electric Charges and Fields",
      prompt: `Physics Question ${i}`,
      options: [
        { id: "A", text: "Option A" },
        { id: "B", text: "Option B" },
        { id: "C", text: "Option C" },
        { id: "D", text: "Option D" },
      ],
      selectedOption: isCorrect ? "A" : "B",
      correctOption: "A",
      isCorrect,
      timeSpentSeconds: 45,
      isTimeSink: false,
      difficulty: "medium",
    });
  }

  return {
    id: `attempt_${stringToUuid(testId)}`,
    attemptId: stringToUuid(testId),
    userId: "student-uuid-1",
    testId,
    testTitle,
    subject: "Physics",
    totalQuestions,
    attemptedCount: totalQuestions,
    unattemptedCount: 0,
    correctCount,
    incorrectCount,
    totalMarks: correctCount * 5 - incorrectCount * 1, // 16 * 5 - 34 * 1 = 80 - 34 = 46
    maxMarks: totalQuestions * 5, // 250
    accuracyPercentage: Math.round((correctCount / totalQuestions) * 100), // 32%
    timeTakenSeconds: totalQuestions * 45,
    timeSinkCount: 0,
    submittedAt: "2026-10-18T18:00:00.000Z",
    questions,
  };
}

async function runInvariantTests() {
  console.log("=== Running Comprehensive Data Integrity & Invariant Verification Suite ===\n");

  // Scenario: Student took 1 test with 50 questions (16 correct, 34 incorrect).
  const localAttempt = build50QuestionMock("physics-mock-1", "Physics Mock 1", 16);
  // Server reconstructed attempt with UUID testId and Supabase timestamp within network transit window
  const serverUuid = stringToUuid("physics-mock-1");
  const serverAttempt: RecordedTestAttempt = {
    ...build50QuestionMock(serverUuid, "Physics Mock 1", 16),
    id: serverUuid,
    testId: serverUuid,
    attemptId: undefined, // server attempt from user_attempts table often has undefined attemptId
    submittedAt: "2026-10-18T18:00:25.000Z", // 25 seconds later
  };

  // Test 1: Canonical Test Key Invariance
  const keyLocal = getCanonicalTestKey(localAttempt);
  const keyServer = getCanonicalTestKey(serverAttempt);
  console.log(`[Test 1] Canonical test key: local="${keyLocal}", server="${keyServer}"`);
  if (keyLocal !== "physics:::mock-1" || keyServer !== "physics:::mock-1") {
    throw new Error(`[FAIL] Expected both to resolve to "physics:::mock-1", got "${keyLocal}" and "${keyServer}"`);
  }
  console.log("  ✓ Test 1 Passed: Both local and server attempts produce identical canonical test key: physics:::mock-1\n");

  // Test 2: Attempt Deduplication Invariance
  const deduplicated = deduplicateTestAttempts([localAttempt, serverAttempt]);
  console.log(`[Test 2] Deduplication: Input 2 mixed attempts -> Deduplicated count = ${deduplicated.length}`);
  if (deduplicated.length !== 1) {
    throw new Error(`[FAIL] Expected deduplicated length to be 1, got ${deduplicated.length}`);
  }
  console.log("  ✓ Test 2 Passed: Exactly 1 distinct completed test preserved.\n");

  // Test 3: Metric Invariants (Score, Questions, Accuracy)
  const dAtt = deduplicated[0]!;
  console.log(`[Test 3] Metrics Verification:`);
  console.log(`  - Attempted Questions: ${dAtt.attemptedCount} (Expected: 50)`);
  console.log(`  - Correct Answers: ${dAtt.correctCount} (Expected: 16)`);
  console.log(`  - Score: ${dAtt.totalMarks} / ${dAtt.maxMarks} (Expected: 46 / 250)`);
  console.log(`  - Accuracy: ${dAtt.accuracyPercentage}% (Expected: 32%)`);
  if (dAtt.attemptedCount !== 50) throw new Error(`[FAIL] Expected attemptedCount=50, got ${dAtt.attemptedCount}`);
  if (dAtt.correctCount !== 16) throw new Error(`[FAIL] Expected correctCount=16, got ${dAtt.correctCount}`);
  if (dAtt.totalMarks !== 46) throw new Error(`[FAIL] Expected totalMarks=46, got ${dAtt.totalMarks}`);
  if (dAtt.accuracyPercentage !== 32) throw new Error(`[FAIL] Expected accuracy=32, got ${dAtt.accuracyPercentage}`);
  console.log("  ✓ Test 3 Passed: Score formula +5/-1 and accuracy percentage are exact.\n");

  // Test 4: Analytics Pipeline Invariant (computeAnalyticsFromAttempts)
  const analytics = computeAnalyticsFromAttempts([localAttempt, serverAttempt]);
  console.log(`[Test 4] Analytics Engine Deduplication:`);
  console.log(`  - Total Questions Attempted: ${analytics.totalQuestionsAttempted} (Expected: 50)`);
  console.log(`  - Completed Tests Count: ${analytics.completedTestsCount} (Expected: 1)`);
  console.log(`  - Overall Accuracy: ${analytics.overallAccuracyPercentage}% (Expected: 32%)`);
  if (analytics.totalQuestionsAttempted !== 50) {
    throw new Error(`[FAIL] Expected 50 total questions attempted, got ${analytics.totalQuestionsAttempted}`);
  }
  if (analytics.completedTestsCount !== 1) {
    throw new Error(`[FAIL] Expected 1 completed test, got ${analytics.completedTestsCount}`);
  }
  if (analytics.overallAccuracyPercentage !== 32) {
    throw new Error(`[FAIL] Expected 32% accuracy, got ${analytics.overallAccuracyPercentage}`);
  }
  console.log("  ✓ Test 4 Passed: computeAnalyticsFromAttempts eliminates duplication across test representations.\n");

  // Test 5: Diagnostic Status & Cycle Progress Invariant
  const qualifyingCount = countQualifyingFromTestAttempts([localAttempt, serverAttempt]);
  const diagProgress = computeAuthoritativeDiagnosticProgress({ totalAttempted: qualifyingCount });
  console.log(`[Test 5] Diagnostic Cycle Tracking:`);
  console.log(`  - Qualifying Questions: ${qualifyingCount} (Expected: 50)`);
  console.log(`  - Cycle Number: ${diagProgress.currentCycleNumber} (Expected: 1)`);
  console.log(`  - Current Cycle Progress: ${diagProgress.currentCycleQuestionCount} / 150 (Expected: 50 / 150)`);
  console.log(`  - Questions to Unlock: ${diagProgress.questionsToUnlock} (Expected: 100)`);
  console.log(`  - Is Diagnostic Unlocked: ${diagProgress.isUnlocked} (Expected: false)`);
  if (qualifyingCount !== 50) throw new Error(`[FAIL] Expected 50 qualifying questions, got ${qualifyingCount}`);
  if (diagProgress.currentCycleQuestionCount !== 50) {
    throw new Error(`[FAIL] Expected 50 cycle questions, got ${diagProgress.currentCycleQuestionCount}`);
  }
  if (diagProgress.questionsToUnlock !== 100) {
    throw new Error(`[FAIL] Expected 100 questions to unlock, got ${diagProgress.questionsToUnlock}`);
  }
  if (diagProgress.isUnlocked !== false) {
    throw new Error(`[FAIL] Expected locked before 150 questions`);
  }
  console.log("  ✓ Test 5 Passed: Diagnostic Cycle preserves 150-question boundary.\n");

  // Test 6: UUID Invariance across modules
  const idStr = "physics-mock-1";
  const utilsUuid = stringToUuid(idStr);
  console.log(`[Test 6] stringToUuid determinism: ${utilsUuid}`);
  if (utilsUuid !== "585d4e76-af46-4c0c-bf55-5b479758dd76") {
    throw new Error(`[FAIL] UUID does not match canonical MD5 v4 RFC 4122 hash`);
  }
  console.log("  ✓ Test 6 Passed: stringToUuid produces expected RFC 4122 v4 hash.\n");

  console.log("===============================================================");
  console.log("ALL DATA INTEGRITY INVARIANT TESTS PASSED! (0 Failures) ✅");
  console.log("===============================================================\n");
}

runInvariantTests().catch((err) => {
  console.error("Invariant Test Suite FAILED:", err);
  process.exit(1);
});
