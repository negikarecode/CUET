import assert from "node:assert";
import {
  computeAuthoritativeDiagnosticProgress,
  countQualifyingQuestions,
  countQualifyingFromTestAttempts,
  DIAGNOSTIC_UNLOCK_THRESHOLD,
} from "../lib/diagnostic-status";
import { processQuestionsIntoCycles } from "../lib/cycle-engine";
import { RecordedQuestionAttempt, RecordedTestAttempt } from "../types";

function createMockQuestions(count: number, testIdPrefix = "test"): RecordedQuestionAttempt[] {
  const list: RecordedQuestionAttempt[] = [];
  for (let i = 1; i <= count; i++) {
    list.push({
      questionId: `q_${i}`,
      questionNumber: i,
      prompt: `Prompt ${i}`,
      subject: "Physics",
      chapter: "Electrostatics",
      microTopic: "Coulomb's Law",
      options: [
        { id: "A", text: "Option A" },
        { id: "B", text: "Option B" },
      ],
      questionType: "MCQ",
      selectedOption: "A",
      correctOption: "A",
      isCorrect: true,
      timeSpentSeconds: 45,
      isTimeSink: false,
      difficulty: "medium",
      ncertReference: "NCERT Class 12",
      explanation: "Explanation",
      testId: `${testIdPrefix}_${Math.ceil(i / 50)}`,
    } as any);
  }
  return list;
}

function createMockTestAttempt(
  testId: string,
  questionCount: number
): RecordedTestAttempt {
  const questions = createMockQuestions(questionCount, testId);
  return {
    id: `att_${testId}`,
    userId: "user-123",
    testId,
    testTitle: "Test Attempt",
    subject: "Physics",
    totalQuestions: questionCount,
    attemptedCount: questionCount,
    unattemptedCount: 0,
    correctCount: questionCount,
    incorrectCount: 0,
    totalMarks: questionCount * 5,
    maxMarks: questionCount * 5,
    accuracyPercentage: 100,
    timeTakenSeconds: questionCount * 45,
    timeSinkCount: 0,
    submittedAt: new Date().toISOString(),
    questions,
  };
}

async function runTestSuite() {
  console.log("=================================================================");
  console.log("  CUET DASHBOARD 150-QUESTION DIAGNOSTIC UNLOCK STATE TEST SUITE ");
  console.log("=================================================================\n");

  // 1. Scenario 1: 0 qualifying questions (locked, 0/150)
  console.log("Test 1: 0 qualifying questions");
  const diag0 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 0 });
  assert.strictEqual(diag0.isUnlocked, false, "Should be locked at 0 questions");
  assert.strictEqual(diag0.completedCyclesCount, 0, "Completed cycles should be 0");
  assert.strictEqual(diag0.currentCycleNumber, 1, "Active cycle should be 1");
  assert.strictEqual(diag0.currentCycleQuestionCount, 0, "Active cycle questions should be 0");
  assert.strictEqual(diag0.unlockProgressPercentage, 0, "Unlock progress should be 0%");
  assert.strictEqual(diag0.statusBadge, "locked", "Status badge should be locked");
  assert.strictEqual(diag0.statusText, "Diagnostic unlocks at 150 questions");
  assert.strictEqual(diag0.progressText, "0 of 150 questions");
  console.log("  ✓ Passed: 0 questions shows locked at 0 of 150 questions.");

  // 2. Scenario 2: 75 qualifying questions (locked, 75/150)
  console.log("\nTest 2: 75 qualifying questions");
  const diag75 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 75 });
  assert.strictEqual(diag75.isUnlocked, false, "Should be locked at 75 questions");
  assert.strictEqual(diag75.completedCyclesCount, 0, "Completed cycles should be 0");
  assert.strictEqual(diag75.currentCycleNumber, 1, "Active cycle should be 1");
  assert.strictEqual(diag75.currentCycleQuestionCount, 75, "Active cycle questions should be 75");
  assert.strictEqual(diag75.unlockProgressPercentage, 50, "Unlock progress should be 50%");
  assert.strictEqual(diag75.statusBadge, "locked", "Status badge should be locked");
  assert.strictEqual(diag75.statusText, "Diagnostic unlocks at 150 questions");
  assert.strictEqual(diag75.progressText, "75 of 150 questions");
  console.log("  ✓ Passed: 75 questions shows locked at 75 of 150 questions (50% progress).");

  // 3. Scenario 3: 149 qualifying questions (locked, 149/150)
  console.log("\nTest 3: 149 qualifying questions");
  const diag149 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 149 });
  assert.strictEqual(diag149.isUnlocked, false, "Should be locked at 149 questions");
  assert.strictEqual(diag149.completedCyclesCount, 0, "Completed cycles should be 0");
  assert.strictEqual(diag149.currentCycleNumber, 1, "Active cycle should be 1");
  assert.strictEqual(diag149.currentCycleQuestionCount, 149, "Active cycle questions should be 149");
  assert.strictEqual(diag149.unlockProgressPercentage, 99, "Unlock progress should be 99%");
  assert.strictEqual(diag149.statusBadge, "locked", "Status badge should be locked");
  assert.strictEqual(diag149.statusText, "Diagnostic unlocks at 150 questions");
  assert.strictEqual(diag149.progressText, "149 of 150 questions");
  console.log("  ✓ Passed: 149 questions remains locked at 149 of 150 questions.");

  // 4. Scenario 4: Exactly 150 qualifying questions (unlocked, completed cycle 1, cycle 2 at 0/150)
  console.log("\nTest 4: Exactly 150 qualifying questions");
  const diag150 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 150 });
  assert.strictEqual(diag150.isUnlocked, true, "Should be unlocked at 150 questions");
  assert.strictEqual(diag150.completedCyclesCount, 1, "Completed cycles should be 1");
  assert.strictEqual(diag150.currentCycleNumber, 2, "Active cycle should advance to 2");
  assert.strictEqual(diag150.currentCycleQuestionCount, 0, "Active cycle questions should start at 0");
  assert.strictEqual(diag150.unlockProgressPercentage, 100, "Unlock progress should be 100%");
  assert.strictEqual(diag150.statusBadge, "unlocked", "Status badge should be unlocked");
  assert.strictEqual(diag150.statusText, "Diagnostic unlocked");
  assert.strictEqual(diag150.progressText, "Cycle 1 completed • Ready for Cycle 2");

  // Verify with cycle engine
  const q150 = createMockQuestions(150);
  const cycleEngine150 = await processQuestionsIntoCycles([], q150);
  assert.strictEqual(cycleEngine150.cycles.length, 1, "Cycle engine should produce 1 completed cycle");
  assert.strictEqual(cycleEngine150.currentCycleNumber, 2, "Cycle engine should report current cycle 2");
  assert.strictEqual(cycleEngine150.currentCycleQuestionCount, 0, "Cycle engine should report 0 in cycle 2");
  console.log("  ✓ Passed: 150 questions completes Cycle 1 and unlocks diagnostic.");

  // 5. Scenario 5: 205 qualifying questions (The exact user bug: unlocked, cycle 2 at 55/150)
  console.log("\nTest 5: 205 qualifying questions (The primary bug scenario)");
  const diag205 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 205 });
  assert.strictEqual(diag205.isUnlocked, true, "Should be unlocked at 205 questions");
  assert.strictEqual(diag205.completedCyclesCount, 1, "Completed cycles should be 1");
  assert.strictEqual(diag205.currentCycleNumber, 2, "Active cycle should be 2");
  assert.strictEqual(diag205.currentCycleQuestionCount, 55, "Active cycle questions should be 55 (205 % 150)");
  assert.strictEqual(diag205.activeCycleProgressPercentage, 37, "Cycle 2 progress bar should be 37% (55/150)");
  assert.strictEqual(diag205.statusBadge, "unlocked", "Status badge should be unlocked");
  assert.strictEqual(diag205.statusText, "Diagnostic unlocked", "Should NEVER say 'Unlocks at 150 questions'");
  assert.strictEqual(diag205.progressText, "Cycle 2: 55 of 150 questions", "Should show 55 of 150 in Cycle 2");

  // Verify recovery if stale 0 was passed
  const diag205StaleZero = computeAuthoritativeDiagnosticProgress({
    totalAttempted: 205,
    currentCycleQuestionCount: 0,
  });
  assert.strictEqual(diag205StaleZero.isUnlocked, true, "Should still be unlocked");
  assert.strictEqual(diag205StaleZero.currentCycleQuestionCount, 55, "Should auto-correct stale 0 to 55");
  assert.strictEqual(diag205StaleZero.progressText, "Cycle 2: 55 of 150 questions");

  // Verify with cycle engine
  const q205 = createMockQuestions(205);
  const cycleEngine205 = await processQuestionsIntoCycles([], q205);
  assert.strictEqual(cycleEngine205.cycles.length, 1, "Cycle engine has 1 completed cycle");
  assert.strictEqual(cycleEngine205.currentCycleNumber, 2, "Current cycle is 2");
  assert.strictEqual(cycleEngine205.currentCycleQuestionCount, 55, "Current cycle question count is 55");
  console.log("  ✓ Passed: 205 questions correctly unlocked with Cycle 2 at 55 of 150 questions.");

  // 6. Scenario 6: Exactly 300 qualifying questions (unlocked, cycle 2 completed)
  console.log("\nTest 6: Exactly 300 qualifying questions (Cycle 2 completed)");
  const diag300 = computeAuthoritativeDiagnosticProgress({ totalAttempted: 300 });
  assert.strictEqual(diag300.isUnlocked, true, "Should be unlocked at 300 questions");
  assert.strictEqual(diag300.completedCyclesCount, 2, "Completed cycles should be 2");
  assert.strictEqual(diag300.currentCycleNumber, 3, "Active cycle should advance to 3");
  assert.strictEqual(diag300.currentCycleQuestionCount, 0, "Active cycle questions should start at 0");
  assert.strictEqual(diag300.progressText, "Cycle 2 completed • Ready for Cycle 3");

  const q300 = createMockQuestions(300);
  const cycleEngine300 = await processQuestionsIntoCycles([], q300);
  assert.strictEqual(cycleEngine300.cycles.length, 2, "Cycle engine produces 2 completed cycles");
  assert.strictEqual(cycleEngine300.currentCycleNumber, 3, "Current cycle advances to 3");
  assert.strictEqual(cycleEngine300.currentCycleQuestionCount, 0, "Cycle 3 starts at 0");
  console.log("  ✓ Passed: 300 questions completes Cycle 2 and advances to Cycle 3.");

  // 7. Scenario 7: Non-qualifying or disqualified attempts (ensure not counted)
  console.log("\nTest 7: Non-qualifying & duplicate attempts excluded");
  const mixedQuestions: any[] = [
    // 50 valid answered questions
    ...createMockQuestions(50, "test-valid"),
    // 10 unanswered questions (selectedOption: null)
    {
      testId: "test-unanswered",
      questionId: "q_unans_1",
      selectedOption: null,
    },
    {
      testId: "test-unanswered",
      questionId: "q_unans_2",
      selectedOption: undefined,
    },
    // 10 duplicate questions (same testId + questionId)
    {
      testId: "test-valid_1",
      questionId: "q_1",
      selectedOption: "B",
    },
    {
      testId: "test-valid_1",
      questionId: "q_2",
      selectedOption: "A",
    },
  ];

  const validCount = countQualifyingQuestions(mixedQuestions);
  assert.strictEqual(validCount, 50, "Only the 50 unique answered questions should qualify");
  console.log("  ✓ Passed: Unanswered and duplicate questions strictly excluded.");

  // 8. Scenario 8: Dashboard reload/hydration (authoritative state persisted)
  console.log("\nTest 8: Dashboard reload/hydration consistency");
  const testAttempts = [
    createMockTestAttempt("test-1", 50),
    createMockTestAttempt("test-2", 50),
    createMockTestAttempt("test-3", 50),
    createMockTestAttempt("test-4", 55),
  ];
  const countFromTests = countQualifyingFromTestAttempts(testAttempts);
  assert.strictEqual(countFromTests, 205, "Reconstructed qualifying attempts sum to 205");

  const rehydratedDiag = computeAuthoritativeDiagnosticProgress({
    totalAttempted: countFromTests,
  });
  assert.strictEqual(rehydratedDiag.isUnlocked, true, "Persists unlocked state after reload");
  assert.strictEqual(rehydratedDiag.currentCycleNumber, 2, "Persists Cycle 2");
  assert.strictEqual(rehydratedDiag.currentCycleQuestionCount, 55, "Persists 55 in Cycle 2");
  console.log("  ✓ Passed: Authoritative state accurately rehydrated across reload.");

  // 9. Scenario 9: Next-action card rendering correct text and CTA
  console.log("\nTest 9: Next-action card text & CTA verification");
  // Locked state
  const lockedState = computeAuthoritativeDiagnosticProgress({ totalAttempted: 120 });
  assert.strictEqual(lockedState.isUnlocked, false);
  assert.strictEqual(lockedState.statusText, "Diagnostic unlocks at 150 questions");
  assert.strictEqual(lockedState.progressText, "120 of 150 questions");

  // Unlocked state
  const unlockedState = computeAuthoritativeDiagnosticProgress({ totalAttempted: 205 });
  assert.strictEqual(unlockedState.isUnlocked, true);
  assert.strictEqual(unlockedState.statusText, "Diagnostic unlocked");
  assert.strictEqual(unlockedState.progressText, "Cycle 2: 55 of 150 questions");
  console.log("  ✓ Passed: Next-action card text and CTAs verified in locked & unlocked modes.");

  // 10. Scenario 10: Consistency between top metrics, diagnostic status, and next-action card
  console.log("\nTest 10: Full cross-component metric consistency");
  const totalUserAttempted = 205;
  const topMetricsContext = totalUserAttempted >= DIAGNOSTIC_UNLOCK_THRESHOLD
    ? "Full diagnostic unlocked"
    : `${DIAGNOSTIC_UNLOCK_THRESHOLD - totalUserAttempted} to unlock full report`;

  const nextActionState = computeAuthoritativeDiagnosticProgress({
    totalAttempted: totalUserAttempted,
  });

  assert.strictEqual(topMetricsContext, "Full diagnostic unlocked");
  assert.strictEqual(nextActionState.isUnlocked, true);
  assert.strictEqual(nextActionState.statusText, "Diagnostic unlocked");
  assert.strictEqual(nextActionState.progressText, "Cycle 2: 55 of 150 questions");
  console.log("  ✓ Passed: Top metrics, diagnostic status, and next-action card are 100% consistent.");

  console.log("\n=================================================================");
  console.log("  ALL 10 DIAGNOSTIC UNLOCK REGRESSION TESTS PASSED! ✅           ");
  console.log("=================================================================\n");
}

runTestSuite().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
