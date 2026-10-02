import {
  computeCycleMetrics,
  compareDiagnosticCycles,
  processQuestionsIntoCycles,
} from "../lib/cycle-engine";
import {
  buildDeterministicSubjectRadarAI,
} from "../lib/subject-ai-engine";
import {
  RecordedQuestionAttempt,
} from "../types";
import { SubjectRadarAIPayload } from "../types/subject-ai";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests += 1;
  if (condition) {
    passedTests += 1;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests += 1;
    console.error(`  [FAIL] ${testName}`);
    if (detail) {
      console.error(`         Reason: ${detail}`);
    }
  }
}

// Telemetry Question Builder
function createAttempt(
  id: string,
  subject: string,
  chapter: string,
  microTopic: string,
  isCorrect: boolean,
  timeSeconds: number,
  difficulty: "easy" | "medium" | "hard",
  selectedOption: "A" | "B" | "C" | "D" | null = "A",
  errorCategory?: string
): RecordedQuestionAttempt {
  return {
    questionId: id,
    questionNumber: 1,
    prompt: `Question prompt for ${id} in ${chapter}`,
    options: [
      { id: "A", text: "Option A", isCorrect: true },
      { id: "B", text: "Option B", isCorrect: false },
      { id: "C", text: "Option C", isCorrect: false },
      { id: "D", text: "Option D", isCorrect: false },
    ],
    selectedOption,
    correctOption: "A",
    isCorrect,
    subject,
    chapter,
    microTopic,
    difficulty,
    timeSpentSeconds: timeSeconds,
    isTimeSink: timeSeconds > 75,
    errorCategory,
  };
}

async function runEndToEndAudit() {
  console.log("==========================================================================");
  console.log("FINAL FULL END-TO-END AUDIT: RADAR + AI + DIAGNOSTIC CYCLE + COMPARISON");
  console.log("==========================================================================\n");

  // =========================================================================
  // FLOW 1: QUESTION -> DETERMINISTIC RADAR CONSISTENCY
  // =========================================================================
  console.log("--> FLOW 1: RAW QUESTION TELEMETRY -> DETERMINISTIC RADAR CONSISTENCY");
  {
    const attempts: RecordedQuestionAttempt[] = [
      createAttempt("q1", "Physics", "Ray Optics", "Refraction", false, 45, "medium", "B", "Conceptual Gap"),
      createAttempt("q2", "Physics", "Ray Optics", "Lenses", false, 65, "medium", "B", "Calculation Error"),
      createAttempt("q3", "Physics", "Ray Optics", "Mirrors", true, 30, "easy", "A"),
      createAttempt("q4", "Physics", "Electrostatics", "Coulomb", true, 25, "easy", "A"),
      createAttempt("q5", "Physics", "Electrostatics", "Gauss", true, 35, "medium", "A"),
    ];

    const cycle = computeCycleMetrics(attempts, 1);
    assert(cycle.totalQuestionsAttempted === 5, "Total attempted count is exactly 5");
    assert(cycle.accuracyPercentage === 60, "Overall accuracy is 60% (3/5)");
    assert(cycle.responseTelemetry.avgTimeSeconds === 40, "Average response time correctly calculated as 40s");

    const rayOptics = cycle.topicPerformance.find((t) => t.chapter === "Ray Optics");
    assert(Boolean(rayOptics), "Ray Optics chapter recorded");
    assert(rayOptics?.accuracy === 33, "Ray Optics accuracy is 33% (1/3)");
    assert(rayOptics?.attempts === 3, "Ray Optics attempts count is 3");
    assert(rayOptics?.incorrect === 2, "Ray Optics incorrect count is 2");

    const electro = cycle.topicPerformance.find((t) => t.chapter === "Electrostatics");
    assert(Boolean(electro), "Electrostatics chapter recorded");
    assert(electro?.accuracy === 100, "Electrostatics accuracy is 100% (2/2)");

    assert(cycle.subjectPerformance["physics"]?.accuracy === 60, "Subject accuracy strictly aligns at 60%");
  }

  // =========================================================================
  // FLOW 2: RADAR -> AI EVIDENCE TRACEABILITY & DETERMINISTIC BOUNDS
  // =========================================================================
  console.log("\n--> FLOW 2: RADAR -> AI INTERPRETATION EVIDENCE TRACEABILITY");
  {
    const attempts = [
      createAttempt("ev1", "Chemistry", "Solutions", "Raoult's Law", false, 20, "medium", "B", "Distractor Trap"),
      createAttempt("ev2", "Chemistry", "Solutions", "Henry's Law", false, 18, "medium", "B", "Question Interpretation"),
      createAttempt("ev3", "Chemistry", "Solutions", "Colligative", true, 30, "easy", "A"),
      createAttempt("ev4", "Chemistry", "Solutions", "Vapor Pressure", true, 25, "easy", "A"),
      createAttempt("ev5", "Chemistry", "Solutions", "Ideal Solutions", true, 35, "medium", "A"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "audit-user-trace",
      subject: "Chemistry",
      questions: attempts.map((a) => ({
        questionId: a.questionId,
        prompt: a.prompt || "",
        options: a.options || [],
        selectedOption: a.selectedOption,
        correctOption: a.correctOption,
        isCorrect: a.isCorrect,
        chapter: a.chapter,
        microTopic: a.microTopic,
        difficulty: a.difficulty,
        timeSpentSeconds: a.timeSpentSeconds || 0,
        errorCategory: a.errorCategory,
      })),
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 26,
        difficultyStats: {
          easy: { attempted: 2, correct: 2, accuracy: 100 },
          medium: { attempted: 3, correct: 1, accuracy: 33 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [{ chapter: "Solutions", attempted: 5, correct: 3, accuracy: 60, avgTimeSeconds: 26 }],
        errorTaxonomy: {
          totalErrors: 2,
          conceptualGapCount: 0,
          applicationGapCount: 0,
          calculationCount: 0,
          distractorTrapCount: 1,
          questionInterpretationCount: 1,
          factualRecallCount: 0,
          formulaMethodCount: 0,
          carelessCount: 0,
          multiStepReasoningCount: 0,
          timePacingCount: 0,
          guessingCount: 0,
          memoryConfusionCount: 0,
        },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const aiRes = buildDeterministicSubjectRadarAI(payload);
    assert(aiRes.diagnosticConfidence === "LOW", "AI respects deterministic confidence: LOW");
    assert(aiRes.evidenceThresholdLabel === "Early signal", "AI respects threshold tier: Early signal");
    const interpPattern = aiRes.keyPatterns.find((p) => p.classification === "QUESTION_INTERPRETATION");
    assert(Boolean(interpPattern), "Identifies QUESTION_INTERPRETATION pattern from telemetry");
    assert(
      interpPattern ? interpPattern.evidenceQuestionIds.includes("ev1") && interpPattern.evidenceQuestionIds.includes("ev2") : false,
      "Every AI diagnostic claim traces directly back to real question IDs (ev1, ev2)"
    );
  }

  // =========================================================================
  // FLOW 3: RADAR -> REPAIR QUIZ ROUTING
  // =========================================================================
  console.log("\n--> FLOW 3: RADAR -> REPAIR QUIZ TARGETING");
  {
    const attempts = [
      createAttempt("rp-1", "Mathematics", "Calculus", "Integration by Parts", false, 75, "hard", "B", "Calculation Error"),
      createAttempt("rp-2", "Mathematics", "Calculus", "Definite Integrals", false, 80, "hard", "B", "Calculation Error"),
      createAttempt("rp-3", "Mathematics", "Calculus", "Limits", true, 30, "easy", "A"),
      createAttempt("rp-4", "Mathematics", "Algebra", "Matrices", true, 35, "easy", "A"),
      createAttempt("rp-5", "Mathematics", "Algebra", "Determinants", true, 40, "medium", "A"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "repair-user",
      subject: "Mathematics",
      questions: attempts.map((a) => ({
        questionId: a.questionId,
        prompt: a.prompt || "",
        options: a.options || [],
        selectedOption: a.selectedOption,
        correctOption: a.correctOption,
        isCorrect: a.isCorrect,
        chapter: a.chapter,
        microTopic: a.microTopic,
        difficulty: a.difficulty,
        timeSpentSeconds: a.timeSpentSeconds || 0,
        errorCategory: a.errorCategory,
      })),
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 52,
        difficultyStats: {
          easy: { attempted: 2, correct: 2, accuracy: 100 },
          medium: { attempted: 1, correct: 1, accuracy: 100 },
          hard: { attempted: 2, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Calculus", attempted: 3, correct: 1, accuracy: 33, avgTimeSeconds: 62 },
          { chapter: "Algebra", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 37 },
        ],
        errorTaxonomy: {
          totalErrors: 2,
          conceptualGapCount: 0,
          applicationGapCount: 0,
          calculationCount: 2,
          distractorTrapCount: 0,
          questionInterpretationCount: 0,
          factualRecallCount: 0,
          formulaMethodCount: 0,
          carelessCount: 0,
          multiStepReasoningCount: 0,
          timePacingCount: 0,
          guessingCount: 0,
          memoryConfusionCount: 0,
        },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const aiRes = buildDeterministicSubjectRadarAI(payload);
    const topArea = aiRes.priorityAreas[0];
    assert(Boolean(topArea), "Priority repair area exists");
    assert(topArea?.recommendedDrillTopic === "Calculus", "Priority area targets weakest topic: Calculus");
    assert(
      topArea?.recommendedDrillType === "5-Question Concept Repair" || topArea?.recommendedDrillType === "10-Question Application Drill",
      "Adaptive drill type specified appropriately"
    );
  }

  // =========================================================================
  // FLOW 4 & 5: 150-QUESTION WINDOW, ROLLOVER, IDEMPOTENCY & HISTORY
  // =========================================================================
  console.log("\n--> FLOW 4 & 5: 150-QUESTION WINDOW SLICING, ROLLOVER & IDEMPOTENCY");
  {
    // Generate 149 questions (Cycle 1 active)
    const q149: RecordedQuestionAttempt[] = [];
    for (let i = 1; i <= 149; i++) {
      q149.push(createAttempt(`q-c1-${i}`, "Physics", "Mechanics", "Kinematics", i % 2 === 0, 30, "medium"));
    }

    const res149 = await processQuestionsIntoCycles([], q149);
    assert(res149.cycles.length === 0, "149 questions: 0 completed cycles");
    assert(res149.currentCycleNumber === 1, "Active cycle is Cycle 1");
    assert(res149.currentCycleQuestionCount === 149, "Active question counter is 149 / 150");
    assert(res149.justCompletedCycle === null, "Cycle 1 not finalized yet at 149");

    // Add 150th question (Cycle 1 finalizes)
    const q150 = [...q149, createAttempt("q-c1-150", "Physics", "Mechanics", "Kinematics", true, 30, "medium")];
    const res150 = await processQuestionsIntoCycles([], q150);
    assert(res150.cycles.length === 1, "Exactly 150 questions: 1 cycle finalized permanently");
    assert(res150.cycles[0]?.cycleNumber === 1, "Finalized cycle is Cycle 1");
    assert(res150.cycles[0]?.totalQuestionsAttempted === 150, "Cycle 1 preserved all 150 qualifying attempts");
    assert(res150.currentCycleNumber === 2, "Active cycle number automatically incremented to Cycle 2");
    assert(res150.currentCycleQuestionCount === 0, "Active counter automatically reset to 0 / 150");
    assert(res150.justCompletedCycle !== null, "justCompletedCycle event fired for Cycle 1");

    // Add question 151 (Belongs to Cycle 2)
    const q151 = [...q150, createAttempt("q-c2-1", "Physics", "Mechanics", "Kinematics", true, 30, "medium")];
    const res151 = await processQuestionsIntoCycles(res150.cycles, q151);
    assert(res151.cycles.length === 1, "Completed cycles count remains 1");
    assert(res151.currentCycleNumber === 2, "Current cycle is Cycle 2");
    assert(res151.currentCycleQuestionCount === 1, "Current cycle counter is 1 / 150");
    assert(res151.justCompletedCycle === null, "No new cycle completion event on question 151");

    // IDEMPOTENCY TEST: Re-running processQuestionsIntoCycles with the same list does NOT duplicate or alter cycles
    const resReRun = await processQuestionsIntoCycles(res151.cycles, q151);
    assert(resReRun.cycles.length === 1, "Idempotent: Cycle list remains 1 cycle");
    assert(resReRun.currentCycleNumber === 2, "Idempotent: Current cycle number remains 2");
    assert(resReRun.currentCycleQuestionCount === 1, "Idempotent: Current question count remains 1");
    assert(resReRun.justCompletedCycle === null, "Idempotent: No re-trigger of completed notification");
  }

  // =========================================================================
  // FLOW 6 & 7: CYCLE COMPARISON (CYCLE 1 VS CYCLE 2) & AI NARRATIVE
  // =========================================================================
  console.log("\n--> FLOW 6 & 7: 6-PART COMPARATIVE ANALYSIS (CYCLE 1 vs CYCLE 2)");
  {
    // Cycle 1:
    // Topic A (Ray Optics): 30% accuracy (Weak)
    // Topic B (Solutions): 50% accuracy with Conceptual Gap (Moderate/Weak)
    // Topic C (Electrostatics): 90% accuracy (Strong)
    const c1Questions: RecordedQuestionAttempt[] = [];
    // 50 Qs Ray Optics (30% correct = 15 correct, 35 incorrect)
    for (let i = 1; i <= 50; i++) {
      c1Questions.push(createAttempt(`c1-ro-${i}`, "Physics", "Ray Optics", "Prism", i <= 15, 45, "medium", "A", "Conceptual Gap"));
    }
    // 50 Qs Solutions (50% correct = 25 correct, 25 incorrect)
    for (let i = 1; i <= 50; i++) {
      c1Questions.push(createAttempt(`c1-sol-${i}`, "Chemistry", "Solutions", "Raoult", i <= 25, 40, "medium", "A", "Conceptual Gap"));
    }
    // 50 Qs Electrostatics (90% correct = 45 correct, 5 incorrect)
    for (let i = 1; i <= 50; i++) {
      c1Questions.push(createAttempt(`c1-elec-${i}`, "Physics", "Electrostatics", "Field", i <= 45, 30, "easy", "A"));
    }

    const cycle1 = computeCycleMetrics(c1Questions, 1);
    assert(cycle1.totalQuestionsAttempted === 150, "Cycle 1 has 150 questions");

    // Cycle 2:
    // Topic A (Ray Optics): 80% accuracy (Resolved/Fixed!)
    // Topic B (Solutions): 48% accuracy with Calculation Error (Recurring Weak, Error Pattern Changed!)
    // Topic C (Electrostatics): 40% accuracy (Regressed/What Got Worse!)
    // Topic D (Kinetics): 30% accuracy (New Mistake!)
    const c2Questions: RecordedQuestionAttempt[] = [];
    // 40 Qs Ray Optics (80% correct = 32 correct, 8 incorrect)
    for (let i = 1; i <= 40; i++) {
      c2Questions.push(createAttempt(`c2-ro-${i}`, "Physics", "Ray Optics", "Prism", i <= 32, 40, "medium", "A"));
    }
    // 40 Qs Solutions (48% correct = 19 correct, 21 incorrect, now Calculation Error)
    for (let i = 1; i <= 40; i++) {
      c2Questions.push(createAttempt(`c2-sol-${i}`, "Chemistry", "Solutions", "Raoult", i <= 19, 70, "medium", "A", "Calculation Error"));
    }
    // 40 Qs Electrostatics (40% correct = 16 correct, 24 incorrect -> Dropped from 90%!)
    for (let i = 1; i <= 40; i++) {
      c2Questions.push(createAttempt(`c2-elec-${i}`, "Physics", "Electrostatics", "Field", i <= 16, 50, "medium", "A", "Conceptual Gap"));
    }
    // 30 Qs Kinetics (30% correct = 9 correct, 21 incorrect -> New Mistake!)
    for (let i = 1; i <= 30; i++) {
      c2Questions.push(createAttempt(`c2-kin-${i}`, "Chemistry", "Chemical Kinetics", "Rate Law", i <= 9, 60, "medium", "A", "Conceptual Gap"));
    }

    const cycle2 = computeCycleMetrics(c2Questions, 2);
    assert(cycle2.totalQuestionsAttempted === 150, "Cycle 2 has 150 questions");

    // Run Comparison Engine
    const comparison = compareDiagnosticCycles(cycle1, cycle2);

    // 1. WHAT WAS FIXED? (Ray Optics: 30% -> 80%)
    const fixedRayOptics = comparison.resolved.find((r) => r.name === "Ray Optics");
    assert(Boolean(fixedRayOptics), "What Was Fixed: Ray Optics correctly identified as resolved");
    assert(fixedRayOptics?.previousAccuracy === 30 && fixedRayOptics?.currentAccuracy === 80, "Ray Optics accuracy jump: 30% -> 80%");

    // 2. WHAT REMAINED WEAK? (Solutions: 50% -> 48%, errorPatternChanged)
    const weakSolutions = comparison.recurringWeak.find((w) => w.name === "Solutions");
    assert(Boolean(weakSolutions), "What Remained Weak: Solutions identified as persistent weakness");
    assert(Boolean(weakSolutions?.errorPatternChanged), "Error pattern shift detected (Conceptual Gap -> Calculation Error)");

    // 3. WHAT GOT WORSE? (Electrostatics: 90% -> 40%, drop = 50 pts)
    const worseElectro = comparison.declined.find((d) => d.name === "Electrostatics");
    assert(Boolean(worseElectro), "What Got Worse: Electrostatics identified as regression");
    assert(worseElectro?.dropPercentagePoints === 50, "Drop is exactly 50 percentage points");

    // 4. WHAT NEW MISTAKES APPEARED? (Chemical Kinetics: absent in Cycle 1, 30% in Cycle 2)
    const newKinetics = comparison.newMistakes.find((n) => n.name === "Chemical Kinetics");
    assert(Boolean(newKinetics), "New Mistakes: Chemical Kinetics identified as emerging issue");

    // 5. WHAT SHOULD THE STUDENT FOCUS ON NEXT?
    assert(comparison.recommendedFocus.length > 0, "Actionable next cycle recommendations generated");
    assert(
      comparison.recommendedFocus.some((f) => f.topic === "Solutions" || f.topic === "Chemical Kinetics" || f.topic === "Electrostatics"),
      "Next focus prioritizes shifted recurring weakness, regressions, and emerging topics"
    );
  }

  // =========================================================================
  // FLOW 8: CROSS-CYCLE PERSISTENCE WITHOUT DUPLICATION
  // =========================================================================
  console.log("\n--> FLOW 8: CROSS-CYCLE PERSISTENCE");
  {
    // When Topic B persists from C1 to C2, verify it is marked recurring and NOT treated as a "new mistake" in C2
    const c1Q = [
      createAttempt("p-c1-1", "Physics", "Mechanics", "Work", false, 40, "medium", "B", "Conceptual Gap"),
      createAttempt("p-c1-2", "Physics", "Mechanics", "Work", false, 45, "medium", "B", "Conceptual Gap"),
    ];
    const c2Q = [
      createAttempt("p-c2-1", "Physics", "Mechanics", "Work", false, 42, "medium", "B", "Conceptual Gap"),
      createAttempt("p-c2-2", "Physics", "Mechanics", "Work", false, 48, "medium", "B", "Conceptual Gap"),
    ];

    const c1 = computeCycleMetrics(c1Q, 1);
    const c2 = computeCycleMetrics(c2Q, 2);
    const comp = compareDiagnosticCycles(c1, c2);

    assert(comp.newMistakes.length === 0, "Persistent topic is NOT classified as a new mistake in Cycle 2");
    assert(comp.recurringWeak.some((r) => r.name === "Mechanics"), "Correctly classified under recurring weaknesses");
  }

  // =========================================================================
  // FLOW 9: DATA BOUNDARIES & STRICT 150 ISOLATION
  // =========================================================================
  console.log("\n--> FLOW 9: DATA BOUNDARIES & ZERO LEAKAGE");
  {
    // Generate 320 questions across 2 completed cycles + 20 remainder
    const q320: RecordedQuestionAttempt[] = [];
    for (let i = 1; i <= 320; i++) {
      q320.push(createAttempt(`b-${i}`, "Biology", "Genetics", "Mendel", i % 2 === 0, 25, "medium"));
    }

    const res = await processQuestionsIntoCycles([], q320);
    assert(res.cycles.length === 2, "320 questions produces exactly 2 completed cycles");
    assert(res.cycles[0]?.totalQuestionsAttempted === 150, "Cycle 1 has strictly 150 questions");
    assert(res.cycles[1]?.totalQuestionsAttempted === 150, "Cycle 2 has strictly 150 questions");
    assert(res.currentCycleNumber === 3, "Current cycle is Cycle 3");
    assert(res.currentCycleQuestionCount === 20, "Cycle 3 remainder is strictly 20 / 150");

    // Ensure Cycle 1 has questions 1 to 150, Cycle 2 has questions 151 to 300
    const c1Ids = new Set(res.cycles[0]?.questions.map((q) => q.questionId));
    const c2Ids = new Set(res.cycles[1]?.questions.map((q) => q.questionId));
    assert(c1Ids.has("b-1") && c1Ids.has("b-150"), "Cycle 1 contains bounds b-1 to b-150");
    assert(!c1Ids.has("b-151"), "Cycle 1 contains zero leakage from Cycle 2 (b-151 absent)");
    assert(c2Ids.has("b-151") && c2Ids.has("b-300"), "Cycle 2 contains bounds b-151 to b-300");
    assert(!c2Ids.has("b-301"), "Cycle 2 contains zero leakage from Cycle 3 remainder (b-301 absent)");
  }

  // =========================================================================
  // FLOW 10: FAILURE RESILIENCE
  // =========================================================================
  console.log("\n--> FLOW 10: FAILURE CONDITIONS & DETERMINISTIC STABILITY");
  {
    // Test with missing fields, nulls, corrupt values
    const corruptQuestions: RecordedQuestionAttempt[] = [
      {
        questionId: "corrupt-1",
        questionNumber: 1,
        prompt: "",
        selectedOption: "A",
        correctOption: "A",
        isCorrect: true,
        subject: undefined as any,
        chapter: undefined as any,
        microTopic: undefined as any,
        timeSpentSeconds: undefined as any,
        isTimeSink: false,
      },
      {
        questionId: "corrupt-2",
        questionNumber: 2,
        prompt: "",
        selectedOption: null, // Unanswered should be filtered out
        correctOption: "A",
        isCorrect: null,
        subject: "Physics",
        chapter: "Ray Optics",
        microTopic: "Prisms",
        timeSpentSeconds: 0,
        isTimeSink: false,
      },
    ];

    const cycle = computeCycleMetrics(corruptQuestions, 1);
    assert(cycle.totalQuestionsAttempted === 1, "Unanswered/null attempts cleanly excluded");
    assert(cycle.accuracyPercentage === 100, "Accuracy correctly computed on valid qualifying attempts");
    assert(cycle.questions.length === 1, "Corrupted attempt filtered without crash");
  }

  console.log("\n==========================================================================");
  console.log(`END-TO-END AUDIT COMPLETE: ${passedTests}/${totalTests} PASSED, ${failedTests} FAILED`);
  console.log("==========================================================================");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runEndToEndAudit().catch((err) => {
  console.error("FATAL in End-to-End Audit:", err);
  process.exit(1);
});
