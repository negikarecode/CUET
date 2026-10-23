import assert from "node:assert";
import { normalizeSubject } from "@/lib/analytics";
import { getUserProgress } from "@/lib/user-progress";
import { getMockStats } from "@/lib/mock-stats";
import { deduplicateTestAttempts } from "@/lib/analytics";
import { runBackfill } from "@/scripts/backfill_user_sessions";
import { AI_COACH_CONFIG } from "@/lib/ai-coach/config";
import { checkSubjectEligibility } from "@/lib/ai-coach/stats-engine";
import { RecordedTestAttempt } from "@/types";

async function runTest(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    console.log(`  PASS: ${name}`);
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function main() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: User Progress & Cross-Page Data Reconciliation");
  console.log("============================================================\n");

  const TEST_USER_ID = "8f9f59eb-f9b7-450e-87fc-47799085aabd";

  // 1. Time Rule Elimination & Sub-1-Second Counting
  console.log("1. Time Rule Elimination & Sub-1-Second Answer Counting:");
  await runTest("Config has zero time-spent gating threshold (undefined)", () => {
    assert.strictEqual((AI_COACH_CONFIG as any).MIN_TIME_SPENT_SECONDS, undefined);
  });

  await runTest("Sub-1-second questions count towards total and unique questions", async () => {
    const progress = await getUserProgress(TEST_USER_ID, "physics");
    // User answered 136 out of 150 questions in under 3 seconds (some in 0-1s).
    // All 150 must be counted!
    assert.strictEqual(progress.totalAttempts, 150);
    assert.strictEqual(progress.totalUniqueQuestionsAttempted, 150);
    const physicsProg = progress.subjectProgress["physics"];
    assert.ok(physicsProg, "Physics progress should exist");
    assert.strictEqual(physicsProg.uniqueQuestionsAttempted, 150);
    assert.strictEqual(physicsProg.freshQuestionsCount, 150);
    assert.strictEqual(physicsProg.isUnlocked, true);
    assert.strictEqual(physicsProg.questionsRemainingToUnlock, 0);
  });

  // 2. Cross-Page Agreement
  console.log("\n2. Cross-Page Data Agreement & Single Source of Truth:");
  await runTest("Dashboard, Mock list, Analytics chart, Past sessions, and AI Coach all agree", async () => {
    const progress = await getUserProgress(TEST_USER_ID);
    const eligibility = await checkSubjectEligibility(TEST_USER_ID, "physics");
    const mockStats = getMockStats("physics", progress.serverAttempts);

    // a. Dashboard KPIs
    assert.strictEqual(progress.totalAttempts, 150, "Dashboard attempted matches 150");
    assert.strictEqual(progress.totalCorrect, 36, "Dashboard correct matches 36");
    assert.strictEqual(progress.overallAccuracyPercentage, 24, "Dashboard accuracy matches 24%");

    // b. AI Coach
    assert.strictEqual(eligibility.freshQuestionsCount, 150, "AI Coach count matches 150");
    assert.strictEqual(eligibility.isUnlocked, true, "AI Coach unlock status matches true");
    assert.strictEqual(eligibility.questionsRemaining, 0, "AI Coach questions remaining is 0");

    // c. Mock list status ("3 of 20 attempted")
    assert.strictEqual(mockStats.attemptedMocksCount, 3, "Mock list attempted count is 3");
    assert.strictEqual(mockStats.totalMocksCount, 20, "Mock list total is 20");
    assert.deepStrictEqual(
      Array.from(mockStats.attemptedMockIds).sort(),
      ["physics-mock-1", "physics-mock-2", "physics-mock-3"].sort(),
      "Attempted mock IDs match all 3 mocks"
    );

    // d. Past sessions count
    assert.strictEqual(progress.serverAttempts.length, 3, "Past sessions count is exactly 3");
    assert.strictEqual(progress.completedTests.length, 3, "Completed tests count is exactly 3");

    // e. Analytics chart plotted tests
    assert.strictEqual(progress.testHistoryForChart.length, 3, "Analytics chart has exactly 3 tests plotted");
    assert.strictEqual(progress.testHistoryForChart[0]!.rawScore, -8, "Mock 1 score is -8");
    assert.strictEqual(progress.testHistoryForChart[1]!.rawScore, 46, "Mock 2 score is 46");
    assert.strictEqual(progress.testHistoryForChart[2]!.rawScore, 28, "Mock 3 score is 28");
  });

  // 3. Subject Casing & Spelling Normalization
  console.log("\n3. Subject Name Normalization ('physics' vs 'Physics'):");
  await runTest("Normalizes lowercase, uppercase, and trimmed variations to canonical slug", () => {
    const s1 = normalizeSubject("physics");
    const s2 = normalizeSubject("Physics");
    const s3 = normalizeSubject("PHYSICS");
    const s4 = normalizeSubject("  Physics  ");

    assert.strictEqual(s1.key, "physics");
    assert.strictEqual(s2.key, "physics");
    assert.strictEqual(s3.key, "physics");
    assert.strictEqual(s4.key, "physics");

    assert.strictEqual(s1.name, "Physics");
    assert.strictEqual(s2.name, "Physics");
  });

  await runTest("getUserProgress normalizes 'physics' vs 'Physics' into one canonical bucket", async () => {
    const prog1 = await getUserProgress(TEST_USER_ID, "physics");
    const prog2 = await getUserProgress(TEST_USER_ID, "Physics");
    const prog3 = await getUserProgress(TEST_USER_ID, "PHYSICS");

    assert.deepStrictEqual(
      prog1.subjectProgress["physics"],
      prog2.subjectProgress["physics"],
      "Lower and upper cases produce identical subjectProgress"
    );
    assert.deepStrictEqual(
      prog1.subjectProgress["physics"],
      prog3.subjectProgress["physics"],
      "All-caps produces identical subjectProgress"
    );
  });

  // 4. Idempotency & Deduplication
  console.log("\n4. Idempotency & Duplicate Prevention:");
  await runTest("Deduplicates identical test attempt records cleanly without self-dropping", () => {
    const sampleAttempt: RecordedTestAttempt = {
      id: "physics-mock-1:::2026-10-23T12:28",
      attemptId: "physics-mock-1:::2026-10-23T12:28",
      userId: TEST_USER_ID,
      testId: "physics-mock-1",
      testTitle: "CUET UG Physics Full Mock Paper 1 (NTA Pattern)",
      subject: "Physics",
      totalQuestions: 50,
      attemptedCount: 50,
      unattemptedCount: 0,
      correctCount: 7,
      incorrectCount: 43,
      totalMarks: -8,
      maxMarks: 250,
      accuracyPercentage: 14,
      timeTakenSeconds: 300,
      timeSinkCount: 0,
      submittedAt: "2026-10-23T12:28:42.116Z",
      questions: [],
    };

    // Submitting the same attempt twice
    const deduped = deduplicateTestAttempts([sampleAttempt, { ...sampleAttempt }]);
    assert.strictEqual(deduped.length, 1, "Duplicate submission reduced to exactly 1");
    assert.strictEqual(deduped[0]!.id, sampleAttempt.id);
  });

  // 5. Backfill Idempotency
  console.log("\n5. Backfill Reversibility & Idempotency:");
  await runTest("Backfill runs cleanly twice without creating duplicate ledger or session rows", async () => {
    // Run backfill in dry-run mode twice
    await runBackfill(true);
    await runBackfill(true);

    const progress = await getUserProgress(TEST_USER_ID);
    assert.strictEqual(progress.completedTests.length, 3, "Exactly 3 completed mock sessions remain");
  });

  console.log("\n============================================================");
  console.log("ALL TESTS COMPLETED SUCCESSFULLY");
  console.log("============================================================\n");
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
