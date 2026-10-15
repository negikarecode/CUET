import { getDiagnosticProgress, computeAuthoritativeDiagnosticProgress } from "../lib/diagnostic-status";
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

function createMockAttempt(
  testId: string,
  questionCount: number,
  options: {
    startIndex?: number;
    submittedAt?: string;
    correctMod?: number;
    subject?: string;
  } = {}
): RecordedTestAttempt {
  const startIndex = options.startIndex || 1;
  const submittedAt = options.submittedAt || new Date(Date.now() + startIndex * 1000).toISOString();
  const correctMod = options.correctMod || 2;
  const subject = options.subject || "Physics";

  const questions: RecordedQuestionAttempt[] = [];
  let correctCount = 0;
  let incorrectCount = 0;

  for (let i = 0; i < questionCount; i++) {
    const qNum = startIndex + i;
    const isCorrect = i % correctMod === 0;
    if (isCorrect) correctCount++;
    else incorrectCount++;

    questions.push({
      questionId: `${testId}_q_${qNum}`,
      questionNumber: qNum,
      subject,
      chapter: "Test Chapter",
      microTopic: "Topic A",
      selectedOption: isCorrect ? "A" : "B",
      correctOption: "A",
      isCorrect,
      timeSpentSeconds: 45,
      isTimeSink: false,
    });
  }

  return {
    id: `attempt_${testId}`,
    attemptId: `att_${testId}`,
    userId: "test-user-1",
    testId,
    testTitle: `Test ${testId}`,
    subject,
    timeSinkCount: 0,
    totalQuestions: questionCount,
    attemptedCount: questionCount,
    unattemptedCount: 0,
    correctCount,
    incorrectCount,
    totalMarks: correctCount * 5 - incorrectCount,
    maxMarks: questionCount * 5,
    accuracyPercentage: Math.round((correctCount / questionCount) * 100),
    timeTakenSeconds: questionCount * 45,
    submittedAt,
    questions,
  };
}

async function runDiagnosticCycleTests() {
  console.log("===============================================================");
  console.log("DIAGNOSTIC CYCLE ENGINE UNIT TESTS");
  console.log("===============================================================\n");

  // -------------------------------------------------------------
  // Test 1: Exactly 150 questions -> 1 completed cycle, cycle 2 in progress at 0/150
  // -------------------------------------------------------------
  console.log("Scenario 1: Exactly 150 questions");
  {
    const attempts = [
      createMockAttempt("mock_1", 50, { submittedAt: "2026-10-01T10:00:00Z" }),
      createMockAttempt("mock_2", 50, { submittedAt: "2026-10-02T10:00:00Z" }),
      createMockAttempt("mock_3", 50, { submittedAt: "2026-10-03T10:00:00Z" }),
    ];

    const progress = getDiagnosticProgress(attempts);

    assert(
      progress.completedCyclesCount === 1,
      "Exactly 150 questions: completedCyclesCount === 1",
      `Got ${progress.completedCyclesCount}`
    );
    assert(
      progress.currentCycleNumber === 2,
      "Exactly 150 questions: currentCycleNumber === 2",
      `Got ${progress.currentCycleNumber}`
    );
    assert(
      progress.currentCycleQuestionCount === 0,
      "Exactly 150 questions: currentCycleQuestionCount === 0",
      `Got ${progress.currentCycleQuestionCount}`
    );
    assert(
      progress.completedCycles.length === 1,
      "Exactly 150 questions: completedCycles.length === 1",
      `Got ${progress.completedCycles.length}`
    );
    assert(
      progress.completedCycles[0]?.questions.length === 150,
      "Cycle 1 has exact 150 questions",
      `Got ${progress.completedCycles[0]?.questions.length}`
    );
    assert(
      progress.activeCycle.questionCount === 0 && progress.activeCycle.cycleNumber === 2,
      "Active cycle is Cycle 2 with 0 questions",
      `Got cycle ${progress.activeCycle.cycleNumber}, count ${progress.activeCycle.questionCount}`
    );
  }

  // -------------------------------------------------------------
  // Test 2: Exactly 149 questions -> 0 completed cycles, cycle 1 in progress at 149/150
  // -------------------------------------------------------------
  console.log("\nScenario 2: Exactly 149 questions");
  {
    const attempts = [
      createMockAttempt("mock_1", 50, { submittedAt: "2026-10-01T10:00:00Z" }),
      createMockAttempt("mock_2", 50, { submittedAt: "2026-10-02T10:00:00Z" }),
      createMockAttempt("mock_3", 49, { submittedAt: "2026-10-03T10:00:00Z" }),
    ];

    const progress = getDiagnosticProgress(attempts);

    assert(
      progress.completedCyclesCount === 0,
      "149 questions: completedCyclesCount === 0",
      `Got ${progress.completedCyclesCount}`
    );
    assert(
      progress.currentCycleNumber === 1,
      "149 questions: currentCycleNumber === 1",
      `Got ${progress.currentCycleNumber}`
    );
    assert(
      progress.currentCycleQuestionCount === 149,
      "149 questions: currentCycleQuestionCount === 149",
      `Got ${progress.currentCycleQuestionCount}`
    );
    assert(
      progress.completedCycles.length === 0,
      "149 questions: completedCycles.length === 0",
      `Got ${progress.completedCycles.length}`
    );
    assert(
      progress.isUnlocked === false,
      "149 questions: isUnlocked === false",
      `Got ${progress.isUnlocked}`
    );
    assert(
      progress.activeCycle.questionCount === 149 && progress.activeCycle.cycleNumber === 1,
      "Active cycle is Cycle 1 with 149 questions",
      `Got cycle ${progress.activeCycle.cycleNumber}, count ${progress.activeCycle.questionCount}`
    );
  }

  // -------------------------------------------------------------
  // Test 3: Exactly 151 questions -> 1 completed cycle, cycle 2 in progress at 1/150
  // -------------------------------------------------------------
  console.log("\nScenario 3: Exactly 151 questions");
  {
    const attempts = [
      createMockAttempt("mock_1", 50, { submittedAt: "2026-10-01T10:00:00Z" }),
      createMockAttempt("mock_2", 50, { submittedAt: "2026-10-02T10:00:00Z" }),
      createMockAttempt("mock_3", 51, { submittedAt: "2026-10-03T10:00:00Z" }),
    ];

    const progress = getDiagnosticProgress(attempts);

    assert(
      progress.completedCyclesCount === 1,
      "151 questions: completedCyclesCount === 1",
      `Got ${progress.completedCyclesCount}`
    );
    assert(
      progress.currentCycleNumber === 2,
      "151 questions: currentCycleNumber === 2",
      `Got ${progress.currentCycleNumber}`
    );
    assert(
      progress.currentCycleQuestionCount === 1,
      "151 questions: currentCycleQuestionCount === 1",
      `Got ${progress.currentCycleQuestionCount}`
    );
    assert(
      progress.completedCycles.length === 1,
      "151 questions: completedCycles.length === 1",
      `Got ${progress.completedCycles.length}`
    );
    assert(
      progress.completedCycles[0]?.questions.length === 150,
      "Cycle 1 has exact 150 questions slice",
      `Got ${progress.completedCycles[0]?.questions.length}`
    );
    assert(
      progress.activeCycle.questionCount === 1 && progress.activeCycle.cycleNumber === 2,
      "Active cycle is Cycle 2 with 1 question in progress",
      `Got cycle ${progress.activeCycle.cycleNumber}, count ${progress.activeCycle.questionCount}`
    );
  }

  // -------------------------------------------------------------
  // Test 4: Exactly 300 questions -> 2 completed cycles, cycle 3 in progress at 0/150
  // -------------------------------------------------------------
  console.log("\nScenario 4: Exactly 300 questions");
  {
    const attempts = [
      createMockAttempt("mock_1", 50, { submittedAt: "2026-10-01T10:00:00Z" }),
      createMockAttempt("mock_2", 50, { submittedAt: "2026-10-02T10:00:00Z" }),
      createMockAttempt("mock_3", 50, { submittedAt: "2026-10-03T10:00:00Z" }),
      createMockAttempt("mock_4", 50, { submittedAt: "2026-10-04T10:00:00Z" }),
      createMockAttempt("mock_5", 50, { submittedAt: "2026-10-05T10:00:00Z" }),
      createMockAttempt("mock_6", 50, { submittedAt: "2026-10-06T10:00:00Z" }),
    ];

    const progress = getDiagnosticProgress(attempts);

    assert(
      progress.completedCyclesCount === 2,
      "300 questions: completedCyclesCount === 2",
      `Got ${progress.completedCyclesCount}`
    );
    assert(
      progress.currentCycleNumber === 3,
      "300 questions: currentCycleNumber === 3",
      `Got ${progress.currentCycleNumber}`
    );
    assert(
      progress.currentCycleQuestionCount === 0,
      "300 questions: currentCycleQuestionCount === 0",
      `Got ${progress.currentCycleQuestionCount}`
    );
    assert(
      progress.completedCycles.length === 2,
      "300 questions: completedCycles.length === 2",
      `Got ${progress.completedCycles.length}`
    );
    assert(
      progress.completedCycles[0]?.cycleNumber === 1 && progress.completedCycles[1]?.cycleNumber === 2,
      "Completed cycles are Cycle 1 and Cycle 2 in order",
      `Got ${progress.completedCycles[0]?.cycleNumber}, ${progress.completedCycles[1]?.cycleNumber}`
    );

    // Verify non-overlapping slices
    const c1QIds = new Set(progress.completedCycles[0]!.questions.map((q) => q.questionId));
    const c2Overlap = progress.completedCycles[1]!.questions.filter((q) => c1QIds.has(q.questionId));
    assert(
      c2Overlap.length === 0,
      "Cycle 1 and Cycle 2 do not share any question attempts (zero overlap)",
      `Found ${c2Overlap.length} overlapping questions`
    );
  }

  // -------------------------------------------------------------
  // Test 5: Double-submitted session -> Counted once
  // -------------------------------------------------------------
  console.log("\nScenario 5: Double-submitted session deduplication");
  {
    const att1 = createMockAttempt("mock_dup_1", 50, { submittedAt: "2026-10-01T10:00:00Z" });
    const att1Clone = { ...att1, id: "attempt_mock_dup_1_copy" }; // Same testId & questionIds
    const att2 = createMockAttempt("mock_dup_2", 50, { submittedAt: "2026-10-02T10:00:00Z" });
    const att3 = createMockAttempt("mock_dup_3", 50, { submittedAt: "2026-10-03T10:00:00Z" });

    // Submit att1 twice
    const progress = getDiagnosticProgress([att1, att1Clone, att2, att3]);

    assert(
      progress.totalQualifyingAttempts === 150,
      "Double submit: 4 attempt objects with 1 duplicate test -> 150 qualifying questions (not 200)",
      `Got ${progress.totalQualifyingAttempts}`
    );
    assert(
      progress.completedCyclesCount === 1,
      "Double submit: produces exactly 1 completed cycle",
      `Got ${progress.completedCyclesCount}`
    );
    assert(
      progress.currentCycleNumber === 2,
      "Double submit: current cycle is Cycle 2",
      `Got ${progress.currentCycleNumber}`
    );
    assert(
      progress.currentCycleQuestionCount === 0,
      "Double submit: current cycle progress is 0/150",
      `Got ${progress.currentCycleQuestionCount}`
    );
  }

  // -------------------------------------------------------------
  // Test 6: Test crossing the 150 boundary is split correctly
  // (e.g. 140 questions before, test has 20 questions -> 160 total)
  // -------------------------------------------------------------
  console.log("\nScenario 6: Test crossing 150 boundary (140 -> 160 questions)");
  {
    const att1 = createMockAttempt("mock_split_1", 50, { submittedAt: "2026-10-01T10:00:00Z" });
    const att2 = createMockAttempt("mock_split_2", 50, { submittedAt: "2026-10-02T10:00:00Z" });
    const att3 = createMockAttempt("mock_split_3", 40, { submittedAt: "2026-10-03T10:00:00Z" }); // 140 Qs so far
    const att4 = createMockAttempt("mock_split_4", 20, { submittedAt: "2026-10-04T10:00:00Z" }); // 20 Qs crosses boundary

    const progress = getDiagnosticProgress([att1, att2, att3, att4]);

    assert(
      progress.totalQualifyingAttempts === 160,
      "Total qualifying attempts is exactly 160",
      `Got ${progress.totalQualifyingAttempts}`
    );
    assert(
      progress.completedCyclesCount === 1,
      "Completed cycles is 1 (floor(160 / 150))",
      `Got ${progress.completedCyclesCount}`
    );
    assert(
      progress.currentCycleNumber === 2,
      "Current cycle number is 2",
      `Got ${progress.currentCycleNumber}`
    );
    assert(
      progress.currentCycleQuestionCount === 10,
      "Active cycle question count is exactly 10 (160 mod 150)",
      `Got ${progress.currentCycleQuestionCount}`
    );
    assert(
      progress.completedCycles[0]?.questions.length === 150,
      "Cycle 1 slice has exactly 150 questions",
      `Got ${progress.completedCycles[0]?.questions.length}`
    );

    // Verify boundary test was split:
    // First 10 questions of att4 belong to Cycle 1
    const att4InCycle1 = progress.completedCycles[0]!.questions.filter(
      (q) => (q as any).testId === "mock_split_4"
    );
    assert(
      att4InCycle1.length === 10,
      "Test crossing boundary: exactly 10 questions of Test 4 placed into Cycle 1",
      `Got ${att4InCycle1.length}`
    );

    // Remaining 10 questions of att4 belong to Active Cycle 2
    const att4InActive = progress.activeCycle.questions.filter(
      (q) => (q as any).testId === "mock_split_4"
    );
    assert(
      att4InActive.length === 10,
      "Test crossing boundary: remaining 10 questions of Test 4 placed into Active Cycle 2",
      `Got ${att4InActive.length}`
    );

    // Verify zero overlap between Cycle 1 questions and Active Cycle questions
    const c1Ids = new Set(progress.completedCycles[0]!.questions.map((q) => q.questionId));
    const activeOverlap = progress.activeCycle.questions.filter((q) => c1Ids.has(q.questionId));
    assert(
      activeOverlap.length === 0,
      "Test crossing boundary: zero overlap between Cycle 1 and Active Cycle questions",
      `Found ${activeOverlap.length} overlapping questions`
    );
  }

  // -------------------------------------------------------------
  // Test 7: computeAuthoritativeDiagnosticProgress capping invariant
  // -------------------------------------------------------------
  console.log("\nScenario 7: computeAuthoritativeDiagnosticProgress safety clamp");
  {
    // Stale or drifting parameters passing completedCyclesCount = 2 with only 150 questions
    const clamped = computeAuthoritativeDiagnosticProgress({
      totalAttempted: 150,
      completedCyclesCount: 2, // Drifting or duplicate count
    });

    assert(
      clamped.completedCyclesCount === 1,
      "Safety clamp: completedCyclesCount capped at floor(150 / 150) = 1, ignoring drifting input 2",
      `Got ${clamped.completedCyclesCount}`
    );
    assert(
      clamped.currentCycleNumber === 2,
      "Safety clamp: currentCycleNumber is 2",
      `Got ${clamped.currentCycleNumber}`
    );
    assert(
      clamped.currentCycleQuestionCount === 0,
      "Safety clamp: currentCycleQuestionCount is 0",
      `Got ${clamped.currentCycleQuestionCount}`
    );
  }

  console.log("\n===============================================================");
  console.log(`DIAGNOSTIC CYCLE UNIT TESTS SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("===============================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runDiagnosticCycleTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
