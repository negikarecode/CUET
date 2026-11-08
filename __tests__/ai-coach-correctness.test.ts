import assert from "node:assert";
import {
  resolveCanonicalTopic,
  getTopicBucket,
  partitionTopics,
} from "@/lib/ai-coach/canonical-topics";
import { computeMarksLost } from "@/lib/ai-coach/marks";
import { buildDeterministicAICoachReport } from "@/lib/ai-coach/ai-service";
import { calculateActiveStreak } from "@/lib/gamification";
import { AICoachComputedStats, TopicStat } from "@/types/ai-coach";

let passedCount = 0;
let failedCount = 0;

function runTest(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passedCount++;
  } catch (err: any) {
    console.error(`  FAIL: ${name} - ${err?.message || err}`);
    failedCount++;
  }
}

async function main() {
  console.log("============================================================");
  console.log("UNIT TESTS: CUET AI Coach Correctness & Consistency");
  console.log("============================================================\n");

  // 1. CANONICAL TOPICS & QUESTION MAPPING
  console.log("1. Canonical Topics & Single Topic Table:");

  runTest("Resolves 'Current Electricity & Semiconductor Electronics' with semiconductor keywords to Semiconductor Electronics", () => {
    const topic = resolveCanonicalTopic(
      "physics",
      "Current Electricity & Semiconductor Electronics",
      "P-N Junction Diode and Logic Gates"
    );
    assert.strictEqual(topic.id, "semiconductor-electronics");
    assert.strictEqual(topic.name, "Semiconductor Electronics");
  });

  runTest("Resolves 'Current Electricity & Semiconductor Electronics' without semiconductor to Current Electricity", () => {
    const topic = resolveCanonicalTopic(
      "physics",
      "Current Electricity & Semiconductor Electronics",
      "Ohm's Law and Kirchhoff's Rules"
    );
    assert.strictEqual(topic.id, "current-electricity");
    assert.strictEqual(topic.name, "Current Electricity");
  });

  runTest("Wave Optics is never missing and resolves distinctly from Ray Optics", () => {
    const wave = resolveCanonicalTopic("physics", "Optics", "Interference of Light & Young's Double Slit");
    assert.strictEqual(wave.id, "wave-optics");
    assert.strictEqual(wave.name, "Wave Optics");

    const ray = resolveCanonicalTopic("physics", "Optics", "Total Internal Reflection and Prisms");
    assert.strictEqual(ray.id, "ray-optics");
    assert.strictEqual(ray.name, "Ray Optics and Optical Instruments");
  });

  runTest("Sub-topic and chapter sharing the same name merge into one canonical ID", () => {
    const t1 = resolveCanonicalTopic("physics", "Current Electricity", "Current Electricity");
    const t2 = resolveCanonicalTopic("physics", "Current Electricity", "Current Electricity - Basic Concepts");
    assert.strictEqual(t1.id, "current-electricity");
    assert.strictEqual(t2.id, "current-electricity");
    assert.strictEqual(t1.name, t2.name);
  });

  runTest("Mutually exclusive buckets: every topic is in exactly ONE status bucket", () => {
    const sampleTopics: TopicStat[] = [
      { id: "t1", topic: "Fix Topic", attempted: 10, correct: 4, accuracyPercentage: 40, classification: "weak" }, // fix
      { id: "t2", topic: "Strength Topic", attempted: 15, correct: 12, accuracyPercentage: 80, classification: "strong" }, // strength
      { id: "t3", topic: "Needs Data Topic", attempted: 3, correct: 1, accuracyPercentage: 33, classification: "insufficient data" }, // needs_data
      { id: "t4", topic: "Neutral 1 (65% acc)", attempted: 10, correct: 6, accuracyPercentage: 60, classification: "weak" }, // neutral
      { id: "t5", topic: "Neutral 2 (80% acc, only 6 att)", attempted: 6, correct: 5, accuracyPercentage: 83, classification: "strong" }, // neutral (<10 att)
    ];

    const partitioned = partitionTopics(sampleTopics);

    // Assert each topic is in exactly one bucket
    assert.strictEqual(partitioned.fix.length, 1);
    assert.strictEqual(partitioned.fix[0]?.id, "t1");

    assert.strictEqual(partitioned.strength.length, 1);
    assert.strictEqual(partitioned.strength[0]?.id, "t2");

    assert.strictEqual(partitioned.needs_data.length, 1);
    assert.strictEqual(partitioned.needs_data[0]?.id, "t3");

    assert.strictEqual(partitioned.neutral.length, 2);
    assert.ok(partitioned.neutral.some((t) => t.id === "t4"));
    assert.ok(partitioned.neutral.some((t) => t.id === "t5"));

    // Check no topic appears in two buckets
    const allAssignedIds = [
      ...partitioned.fix.map((t) => t.id),
      ...partitioned.strength.map((t) => t.id),
      ...partitioned.needs_data.map((t) => t.id),
      ...partitioned.neutral.map((t) => t.id),
    ];
    const uniqueIds = new Set(allAssignedIds);
    assert.strictEqual(allAssignedIds.length, uniqueIds.size, "No topic may appear in multiple buckets!");
  });

  // 2. FIXTURE (a): NEAR-RANDOM USER (24% over 150, no skips)
  console.log("\n2. Fixture (a): Near-Random User (24% over 150, no skips):");

  const nearRandomStats: AICoachComputedStats = {
    subject: "Physics",
    totalAttempts: 150,
    uniqueQuestionsAnalyzed: 150,
    overallAccuracyPercentage: 24,
    attemptRate: 100,
    netScore: 36 * 5 - 114 * 1, // 180 - 114 = 66
    potentialScore: 750,
    negativeMarksLost: 114,
    errorTypes: {
      carelessErrors: 0,
      conceptGaps: 0,
      confidenceGaps: 0,
      secondGuessing: 0,
    },
    mockVsPyqGap: { mockAccuracy: 24, mockAttempts: 150, pyqAccuracy: 0, pyqAttempts: 0, accuracyDelta: 24 },
    recentTrend: { recentAccuracies: [24, 24, 24], trajectory: "plateauing" },
    topicBreakdown: [
      { id: "current-electricity", topic: "Current Electricity", attempted: 50, correct: 12, accuracyPercentage: 24, classification: "weak", bucket: "fix" },
      { id: "wave-optics", topic: "Wave Optics", attempted: 50, correct: 12, accuracyPercentage: 24, classification: "weak", bucket: "fix" },
      { id: "electrostatics", topic: "Electric Charges and Fields", attempted: 50, correct: 12, accuracyPercentage: 24, classification: "weak", bucket: "fix" },
    ],
    near_random: true,
    data_quality: "near_random",
    skipped_rate: 0,
    fast_wrong_rate: 0.85,
    median_seconds_per_question: 6,
    mistake_tags_count: null,
    daysToExam: 180,
  };

  const nearRandomReport = buildDeterministicAICoachReport(nearRandomStats, null);

  runTest("Near-random summary has NO 'concept gap' and mentions guessing", () => {
    assert.ok(!nearRandomReport.summary.toLowerCase().includes("concept gap"), "Must not claim concept gap");
    assert.ok(
      nearRandomReport.summary.toLowerCase().includes("guessing") ||
      nearRandomReport.summary.toLowerCase().includes("random"),
      "Must mention guessing or random baseline"
    );
  });

  runTest("Near-random leaks have neutral, evidence-first titles and no invented causes", () => {
    for (const leak of nearRandomReport.biggest_leaks) {
      assert.ok(!leak.issue.toLowerCase().includes("severe concept gap"));
      assert.ok(!leak.issue.toLowerCase().includes("concept gap"));
      assert.ok(
        leak.issue.toLowerCase().includes("low accuracy") ||
        leak.issue.toLowerCase().includes("needs practice"),
        "Issue title must be neutral and evidence-first"
      );
      assert.strictEqual(leak.likelyConfusion, undefined, "Near-random leaks must not invent causal confusion");
    }
  });

  runTest("Near-random report verified strengths shows 'No strong topics yet. Keep practicing'", () => {
    assert.deepStrictEqual(nearRandomReport.strengths, ["No strong topics yet. Keep practicing"]);
  });

  runTest("Near-random advice gives +5/-1 expected value and does NOT say skip uncertain", () => {
    const fullText = JSON.stringify(nearRandomReport);
    assert.ok(!fullText.toLowerCase().includes("skip doubtful"));
    assert.ok(!fullText.toLowerCase().includes("skip questions you are unsure"));
    assert.ok(!fullText.toLowerCase().includes("avoid guessing"));
    assert.ok(
      nearRandomReport.test_taking_strategy.some((tip) => tip.includes("+0.5 marks on average")),
      "Must provide +0.5 EV calculation for elimination"
    );
  });

  runTest("Every number shown in near-random report matches computed stats", () => {
    const marksCalc = computeMarksLost(nearRandomStats.negativeMarksLost);
    assert.strictEqual(marksCalc.penaltyMarks, 114);
    assert.strictEqual(marksCalc.missedMarks, 684);
    assert.ok(nearRandomReport.test_taking_strategy[0]?.includes(String(nearRandomStats.netScore)));
    assert.ok(nearRandomReport.test_taking_strategy[0]?.includes(String(nearRandomStats.potentialScore)));
  });

  // 3. FIXTURE (b): HEALTHY USER (~70%)
  console.log("\n3. Fixture (b): Healthy User (~70%):");

  const healthyStats: AICoachComputedStats = {
    subject: "Physics",
    totalAttempts: 160,
    uniqueQuestionsAnalyzed: 160,
    overallAccuracyPercentage: 70,
    attemptRate: 95,
    netScore: 112 * 5 - 48 * 1, // 560 - 48 = 512
    potentialScore: 800,
    negativeMarksLost: 48,
    errorTypes: {
      carelessErrors: 5,
      conceptGaps: 12,
      confidenceGaps: 8,
      secondGuessing: 3,
    },
    mockVsPyqGap: { mockAccuracy: 72, mockAttempts: 100, pyqAccuracy: 67, pyqAttempts: 60, accuracyDelta: 5 },
    recentTrend: { recentAccuracies: [65, 68, 70, 72, 75], trajectory: "improving" },
    topicBreakdown: [
      { id: "current-electricity", topic: "Current Electricity", attempted: 40, correct: 18, accuracyPercentage: 45, classification: "weak", bucket: "fix", mostCommonWrongOption: "B" },
      { id: "ray-optics", topic: "Ray Optics and Optical Instruments", attempted: 40, correct: 32, accuracyPercentage: 80, classification: "strong", bucket: "strength" },
      { id: "wave-optics", topic: "Wave Optics", attempted: 40, correct: 34, accuracyPercentage: 85, classification: "strong", bucket: "strength" },
      { id: "atoms", topic: "Atoms", attempted: 40, correct: 28, accuracyPercentage: 70, classification: "strong", bucket: "strength" },
    ],
    near_random: false,
    data_quality: "ok",
    skipped_rate: 0.05,
    fast_wrong_rate: 0.12,
    median_seconds_per_question: 55,
    mistake_tags_count: 25,
    daysToExam: 180,
  };

  const healthyReport = buildDeterministicAICoachReport(healthyStats, null);

  runTest("Healthy user report differs meaningfully from near-random report", () => {
    assert.notStrictEqual(healthyReport.summary, nearRandomReport.summary);
    assert.ok(healthyReport.strengths.length > 0 && healthyReport.strengths[0] !== "No strong topics yet. Keep practicing");
    assert.ok(healthyReport.strengths.some((s) => s.includes("Ray Optics")));
  });

  runTest("Healthy user leak includes 'Possible confusion' with distractor Option B", () => {
    const leak = healthyReport.biggest_leaks.find((l) => l.topic === "Current Electricity");
    assert.ok(leak);
    assert.ok(leak.likelyConfusion?.includes("Possible confusion with trap Option B."));
  });

  // 4. FIXTURE (c): THIN-DATA USER (<50 questions)
  console.log("\n4. Fixture (c): Thin-Data User (<50 questions):");

  const thinStats: AICoachComputedStats = {
    subject: "Physics",
    totalAttempts: 35,
    uniqueQuestionsAnalyzed: 35,
    overallAccuracyPercentage: 60,
    attemptRate: 100,
    netScore: 21 * 5 - 14 * 1,
    potentialScore: 175,
    negativeMarksLost: 14,
    errorTypes: { carelessErrors: 2, conceptGaps: 0, confidenceGaps: 0, secondGuessing: 0 },
    mockVsPyqGap: { mockAccuracy: 60, mockAttempts: 35, pyqAccuracy: 0, pyqAttempts: 0, accuracyDelta: 60 },
    recentTrend: { recentAccuracies: [60], trajectory: "plateauing" },
    topicBreakdown: [
      { id: "current-electricity", topic: "Current Electricity", attempted: 4, correct: 2, accuracyPercentage: 50, classification: "insufficient data", bucket: "needs_data" },
      { id: "atoms", topic: "Atoms", attempted: 3, correct: 2, accuracyPercentage: 67, classification: "insufficient data", bucket: "needs_data" },
    ],
    near_random: false,
    data_quality: "thin",
    skipped_rate: 0,
    fast_wrong_rate: null,
    median_seconds_per_question: null,
    mistake_tags_count: null,
    daysToExam: 180,
  };

  const thinReport = buildDeterministicAICoachReport(thinStats, null);

  runTest("Thin user topics with <5 attempts are strictly in needs_data bucket", () => {
    assert.strictEqual(thinStats.data_quality, "thin");
    const partitioned = partitionTopics(thinStats.topicBreakdown);
    assert.strictEqual(partitioned.needs_data.length, 2);
    assert.strictEqual(partitioned.fix.length, 0);
    assert.strictEqual(partitioned.strength.length, 0);
  });

  runTest("Thin user report outputs 'No strong topics yet. Keep practicing'", () => {
    assert.deepStrictEqual(thinReport.strengths, ["No strong topics yet. Keep practicing"]);
  });

  // 5. PLAN CONSISTENCY & BUTTON MATCHING
  console.log("\n5. Plan Consistency & Duration Matching:");

  runTest("Every plan item matches its button and only targets fix bucket or mixed review", () => {
    const validButtons = ["Start 10-question fix", "Open Mistake Notebook", "Rest Day Scheduled"];
    for (const planItem of healthyReport.weekly_plan) {
      assert.ok(planItem.buttonText, "Plan item must have buttonText");
      assert.ok(validButtons.includes(planItem.buttonText), `Invalid button: ${planItem.buttonText}`);
      if (planItem.buttonText === "Start 10-question fix") {
        assert.ok(planItem.task.includes("10 questions") || planItem.task.includes("10 mixed questions"));
        assert.strictEqual(planItem.minutes, 20, "10-question drills must have 20-minute allocation");
      } else if (planItem.buttonText === "Open Mistake Notebook") {
        assert.ok(planItem.task.toLowerCase().includes("mistake notebook"));
        assert.strictEqual(planItem.minutes, 15);
      } else if (planItem.buttonText === "Rest Day Scheduled") {
        assert.ok(planItem.task.toLowerCase().includes("rest"));
        assert.strictEqual(planItem.minutes, 15);
      }
    }
  });

  runTest("Weekly plan never repeats weak labels when fix topics < 7", () => {
    const fixFocuses = healthyReport.weekly_plan
      .filter((p) => p.focus === "Current Electricity")
      .map((p) => p.focus);
    assert.strictEqual(fixFocuses.length, 1, "Must not repeat weak topic across days");
  });

  // 6. STREAK CONSISTENCY
  console.log("\n6. Streak Consistency Across Routes:");

  runTest("Streak returns 0 when no practice date exists", () => {
    assert.strictEqual(calculateActiveStreak(0, null, "2026-11-08"), 0);
    assert.strictEqual(calculateActiveStreak(5, null, "2026-11-08"), 0);
  });

  runTest("Streak is active when last practice was today or yesterday", () => {
    assert.strictEqual(calculateActiveStreak(3, "2026-11-08", "2026-11-08"), 3);
    assert.strictEqual(calculateActiveStreak(3, "2026-11-07", "2026-11-08"), 3);
  });

  runTest("Streak breaks to 0 when last practice was 2 or more days ago", () => {
    assert.strictEqual(calculateActiveStreak(3, "2026-11-06", "2026-11-08"), 0);
    assert.strictEqual(calculateActiveStreak(10, "2026-11-01", "2026-11-08"), 0);
  });

  console.log("\n============================================================");
  console.log(`CORRECTNESS TEST SUMMARY: ${passedCount} passed, ${failedCount} failed`);
  console.log("============================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
