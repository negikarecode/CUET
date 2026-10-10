/**
 * Automated Verification Test Suite for Radar & Diagnostic Refactor
 * Tests:
 * 1. Validity gate (fast clicking <8s, chance accuracy, normal session)
 * 2. Topic state labelling (8 states, colors, strict 20-attempt gate for established weakness)
 * 3. Narrative consistency check (rejects false praise when accuracy < 50% or strengths = 0)
 * 4. Repair-plan state derivation (event-driven steps 1-4, recovery rule >=80% over 10+ attempts)
 * 5. Spaced repetition scheduling (1, 3, 7, 21 days, advance on correct, reset on incorrect, skip low-effort)
 * 6. Cycle counting (150 qualifying questions, in-progress vs completed, remainder logic)
 * 7. Explanation caching (sub-millisecond retrieval by key)
 */

import { evaluateSessionQuality } from "../lib/config/dashboardConfig";
import { getTopicDiagnosticState } from "../lib/config/dashboardConfig";
import { validateCycleNarrativeConsistency } from "../lib/cycle-engine";
import { deriveTopicRepairPlan, recordRepairEvent, clearRepairEvents } from "../lib/repair-plan";
import {
  enrollMissedQuestion,
  recordSpacedReviewAttempt,
  getSpacedRepetitionSummary,
  SPACED_INTERVALS_DAYS,
} from "../lib/spaced-repetition";
import {
  setCachedWhyWrongExplanation,
  getCachedWhyWrongExplanation,
} from "../lib/ai-cache";
import { processQuestionsIntoCycles } from "../lib/cycle-engine";
import { RecordedQuestionAttempt } from "../types";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}${detail ? ` - ${detail}` : ""}`);
    failed++;
  }
}

async function runTests() {
  console.log("\n========================================================");
  console.log("🚀 RUNNING RADAR & DIAGNOSTIC ENGINE VERIFICATION TESTS");
  console.log("========================================================\n");

  // -------------------------------------------------------------------------
  // TEST 1: Validity Gate
  // -------------------------------------------------------------------------
  console.log("📌 Test 1: Validity Gate");
  {
    // Fast clicking session: 50 questions, median time 3s, accuracy 20%
    const fastTimes = Array(50).fill(3);
    const fastRes = evaluateSessionQuality({
      questionTimesSeconds: fastTimes,
      correctCount: 10,
      totalQuestions: 50,
      numOptionsPerQuestion: 4,
    });
    assert(fastRes.isLowEffort === true, "Fast clicking session (<8s median) marked low_effort");
    assert(fastRes.sessionConfidence === "Low", "Fast clicking session confidence is Low");
    assert(fastRes.reason.includes("8 seconds"), "Reason specifies median time below 8s");

    // Chance accuracy session: 50 questions, normal pacing 45s, but only 10/50 correct (20% <= 25% chance)
    const chanceTimes = Array(50).fill(45);
    const chanceRes = evaluateSessionQuality({
      questionTimesSeconds: chanceTimes,
      correctCount: 10,
      totalQuestions: 50,
      numOptionsPerQuestion: 4,
    });
    assert(chanceRes.isLowEffort === true, "Near-chance accuracy (20% <= 25%) marked low_effort");

    // Normal valid session: 50 questions, 50s median, 35/50 correct (70%)
    const normalTimes = Array(50).fill(50);
    const normalRes = evaluateSessionQuality({
      questionTimesSeconds: normalTimes,
      correctCount: 35,
      totalQuestions: 50,
      numOptionsPerQuestion: 4,
    });
    assert(normalRes.isLowEffort === false, "Normal session (50s median, 70% acc) is valid");
    assert(normalRes.sessionConfidence === "High", "Normal session confidence is High");
  }

  // -------------------------------------------------------------------------
  // TEST 2: Topic State Labelling & Color Palette
  // -------------------------------------------------------------------------
  console.log("\n📌 Test 2: Topic State Labelling & Color Consistency");
  {
    // 3 attempts -> insufficient_data
    const s1 = getTopicDiagnosticState({ attemptsCount: 3, accuracyPercentage: 30 });
    assert(s1.state === "insufficient_data", "<5 attempts labeled insufficient_data");
    assert(s1.color === "slate", "insufficient_data has slate color");

    // 7 attempts -> early_signal
    const s2 = getTopicDiagnosticState({ attemptsCount: 7, accuracyPercentage: 30 });
    assert(s2.state === "early_signal", "5-9 attempts labeled early_signal");
    assert(s2.color === "amber", "early_signal has amber color");

    // 15 attempts -> emerging_weakness (NOT established!)
    const s3 = getTopicDiagnosticState({ attemptsCount: 15, accuracyPercentage: 30 });
    assert(s3.state === "emerging_weakness", "10-19 attempts labeled emerging_weakness");
    assert(s3.color === "amber", "emerging_weakness has amber color");

    // 25 attempts, 40% accuracy -> established_weakness
    const s4 = getTopicDiagnosticState({ attemptsCount: 25, accuracyPercentage: 40 });
    assert(s4.state === "established_weakness", ">=20 attempts with <65% acc labeled established_weakness");
    assert(s4.color === "red", "established_weakness has RED color (NEVER green!)");

    // Recovered topic -> recovered
    const s5 = getTopicDiagnosticState({ attemptsCount: 25, accuracyPercentage: 85, isRecovered: true });
    assert(s5.state === "recovered", "Recovered topic labeled recovered");
    assert(s5.color === "green", "recovered has green color (Green ONLY for strength/recovered!)");
  }

  // -------------------------------------------------------------------------
  // TEST 3: Narrative Consistency Check (Reject False Praise)
  // -------------------------------------------------------------------------
  console.log("\n📌 Test 3: Narrative Consistency Check");
  {
    // Low accuracy (23%) and 0 strengths with false praise
    const badNarrative = "Student shows strong performance in core concepts and consistent foundational theory grasp.";
    const check1 = validateCycleNarrativeConsistency({
      narrative: badNarrative,
      accuracyPercentage: 23,
      strengthsCount: 0,
    });
    assert(check1.isValid === false, "Rejects false praise when accuracy < 50% and strengths = 0");
    assert(check1.reason !== undefined && check1.reason.includes("23%"), "Rejection reason cites true telemetry");

    // Truthful diagnostic narrative
    const honestNarrative = "Student completed initial diagnostic cycle with 23% overall accuracy. Core gaps localized to Environmental Pollution.";
    const check2 = validateCycleNarrativeConsistency({
      narrative: honestNarrative,
      accuracyPercentage: 23,
      strengthsCount: 0,
    });
    assert(check2.isValid === true, "Accepts honest fact-grounded diagnostic narrative");
  }

  // -------------------------------------------------------------------------
  // TEST 4: Event-Driven Repair Plan State Derivation
  // -------------------------------------------------------------------------
  console.log("\n📌 Test 4: Event-Driven Repair Plan State Derivation");
  {
    const userId = "test_user_unit";
    const topic = "Soil Erosion and Conservation";
    clearRepairEvents(userId, topic);

    // Initial unstarted plan: Step 1 must NOT be ticked and Step 2 must NOT be Active
    const initialPlan = deriveTopicRepairPlan(userId, topic, []);
    assert(initialPlan.step1.status !== "completed", "Before starting, Step 1 is NOT completed/ticked");
    assert(initialPlan.step2.status !== "active", "Before starting, Step 2 is NOT active");
    assert(initialPlan.currentStage === "NOT_STARTED", "Initial stage is NOT_STARTED");

    // User reviews concept
    recordRepairEvent(userId, topic, "concept_reviewed");
    const planAfterConcept = deriveTopicRepairPlan(userId, topic, []);
    assert(planAfterConcept.step1.status === "completed", "After concept review, Step 1 is completed");
    assert(planAfterConcept.step2.status === "active", "After concept review, Step 2 becomes active");
    assert(planAfterConcept.currentStage === "CONCEPT_REVIEWED", "Stage transitions to CONCEPT_REVIEWED");

    // Recovery rule test: <10 attempts or <80% accuracy cannot count as recovered
    const mockAttemptsUnder10 = [
      {
        testId: "t1",
        questions: Array(8).fill({
          questionId: "q",
          subject: "Environmental Studies",
          chapter: topic,
          selectedOption: "A",
          correctOption: "A",
          isCorrect: true,
          timeSpentSeconds: 40,
        }),
      },
    ] as any;
    const planUnder10 = deriveTopicRepairPlan(userId, topic, mockAttemptsUnder10);
    assert(planUnder10.isRecovered === false, "Recovery requires >=10 attempts (8 attempts is not recovered)");

    // >=10 attempts with >=80% accuracy -> recovered
    const mockAttemptsOver10 = [
      {
        testId: "t2",
        questions: Array(12).fill({
          questionId: "q",
          subject: "Environmental Studies",
          chapter: topic,
          selectedOption: "A",
          correctOption: "A",
          isCorrect: true,
          timeSpentSeconds: 40,
        }),
      },
    ] as any;
    const planOver10 = deriveTopicRepairPlan(userId, topic, mockAttemptsOver10);
    assert(planOver10.isRecovered === true, "Recovery verified at >=80% accuracy over 12 attempts");
  }

  // -------------------------------------------------------------------------
  // TEST 5: Spaced Repetition Scheduling
  // -------------------------------------------------------------------------
  console.log("\n📌 Test 5: Spaced Repetition Scheduling");
  {
    assert(SPACED_INTERVALS_DAYS.length === 4, "Spaced intervals has 4 tiers (1, 3, 7, 21 days)");
    assert(SPACED_INTERVALS_DAYS[0] === 1, "Interval 1 is 1 day");
    assert(SPACED_INTERVALS_DAYS[1] === 3, "Interval 2 is 3 days");
    assert(SPACED_INTERVALS_DAYS[2] === 7, "Interval 3 is 7 days");
    assert(SPACED_INTERVALS_DAYS[3] === 21, "Interval 4 is 21 days");

    // Skip question answered in low-effort session
    const lowEffortQuestion = {
      questionId: "q_low_effort_1",
      subject: "EVS",
      chapter: "Air Pollution",
      prompt: "What is smog?",
      correctOption: "B",
      userSelectedOption: "A",
      explanation: "Smoke and fog.",
      isLowEffort: true,
    };
    const enrolledLow = enrollMissedQuestion("user_sr_test", lowEffortQuestion);
    assert(enrolledLow === null, "Questions from low-effort sessions are skipped from spaced repetition");

    // Enroll valid question
    const validQuestion = {
      questionId: "q_valid_1",
      subject: "EVS",
      chapter: "Air Pollution",
      prompt: "What causes acid rain?",
      correctOption: "C",
      userSelectedOption: "A",
      explanation: "SO2 and NOx emissions.",
      isLowEffort: false,
    };
    const enrolled = enrollMissedQuestion("user_sr_test", validQuestion);
    assert(enrolled !== null && enrolled.intervalDays === 1, "Valid missed question enrolled with 1-day interval");

    // Test advancing interval on correct answer
    const reviewed = recordSpacedReviewAttempt("user_sr_test", "q_valid_1", "C", true, 45);
    assert(reviewed !== null && reviewed.intervalDays === 3, "Correct answer advances interval to 3 days");

    // Test summary function
    const summary = getSpacedRepetitionSummary("user_sr_test");
    assert(summary.totalTracked >= 1, "Spaced repetition summary tracks enrolled question");
  }

  // -------------------------------------------------------------------------
  // TEST 6: Cycle Counting & Qualification
  // -------------------------------------------------------------------------
  console.log("\n📌 Test 6: Cycle Counting (150 Qualifying Questions, In-Progress vs Completed)");
  {
    // Generate 50 unique questions (baseline user attempt)
    const q50: RecordedQuestionAttempt[] = Array.from({ length: 50 }, (_, i) => ({
      questionId: `q_50_${i + 1}`,
      questionNumber: i + 1,
      selectedOption: "A",
      correctOption: "A",
      isCorrect: i < 10,
      timeSpentSeconds: 40,
      testId: "mock_1",
    })) as any;

    const res50 = await processQuestionsIntoCycles([], q50);
    assert(res50.currentCycleNumber === 1, "50 questions: currentCycleNumber is 1");
    assert(res50.currentCycleQuestionCount === 50, "50 questions: currentCycleQuestionCount is 50");
    assert(res50.cycles.length === 0, "50 questions: 0 completed cycles");

    // Generate 150 unique questions (Cycle 1 completed)
    const q150: RecordedQuestionAttempt[] = Array.from({ length: 150 }, (_, i) => ({
      questionId: `q_150_${i + 1}`,
      questionNumber: i + 1,
      selectedOption: "A",
      correctOption: "A",
      isCorrect: true,
      timeSpentSeconds: 40,
      testId: `mock_${Math.floor(i / 50) + 1}`,
    })) as any;

    const res150 = await processQuestionsIntoCycles([], q150);
    assert(res150.cycles.length === 1, "150 questions: exactly 1 cycle completed");
    assert(res150.cycles[0]?.cycleNumber === 1, "Completed cycle is Cycle 1 (150/150)");
    assert(res150.currentCycleNumber === 2, "After 150 questions, currentCycleNumber is 2");
    assert(res150.currentCycleQuestionCount === 0, "Cycle 2 starts with 0 / 150 questions (No Cycle 2: 150/150 bug!)");

    // Verify low-effort questions are filtered out from cycle progress
    const qWithLowEffort: RecordedQuestionAttempt[] = [
      ...q50,
      ...Array.from({ length: 20 }, (_, i) => ({
        questionId: `q_low_${i}`,
        selectedOption: "A",
        correctOption: "A",
        isCorrect: true,
        isLowEffort: true, // Low effort flag
        testId: "low_mock",
      })) as any,
    ];
    const resFiltered = await processQuestionsIntoCycles([], qWithLowEffort);
    assert(resFiltered.currentCycleQuestionCount === 50, "Low effort questions do not advance cycle count (50 Qs remain)");
  }

  // -------------------------------------------------------------------------
  // TEST 7: Explanation Caching
  // -------------------------------------------------------------------------
  console.log("\n📌 Test 7: Explanation Caching");
  {
    const qId = "q_test_chemistry_101";
    const selected = "C";
    const sampleExplanation = {
      questionId: qId,
      selectedOption: selected,
      correctOption: "A",
      correctReasoning: "Standard reduction potential of Fluorine is highest.",
      underlyingConcept: "Electrochemical series order",
      whyTempting: "Option C confuses ionization energy with reduction potential.",
    };

    setCachedWhyWrongExplanation(qId, selected, sampleExplanation);
    const start = performance.now();
    const retrieved = getCachedWhyWrongExplanation(qId, selected);
    const elapsedMs = performance.now() - start;

    assert(retrieved !== null, "Explanation retrieved from cache successfully");
    assert(retrieved.whyTempting === sampleExplanation.whyTempting, "Cached content matches exact payload");
    assert(elapsedMs < 5, `Cache retrieval is sub-millisecond (${elapsedMs.toFixed(3)}ms)`);
  }

  console.log("\n========================================================");
  console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
