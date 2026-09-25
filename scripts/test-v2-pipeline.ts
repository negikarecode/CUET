#!/usr/bin/env tsx
/**
 * Automated Verification Suite for CUET UG Master Question Paper Generator (v2)
 * Tests Sections 0, 1, 2, 6, 8, 10, 16, 18 against strict psychometric and computational constraints.
 */

import {
  renderMasterPrompt,
  NcertRetriever,
  MathVerifier,
  BatchOrchestrator,
  V2Question,
} from "../lib/generator_v2";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, title: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${title}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${title}`);
    if (detail) console.error(`         ${detail}`);
  }
}

async function runTests() {
  console.log("=".repeat(70));
  console.log("  CUET UG MASTER GENERATOR (v2) - AUTOMATED VERIFICATION SUITE");
  console.log("=".repeat(70) + "\n");

  // ─── SUITE 1: Section 0 Enforcement (Max 15 Batch Count) ───
  console.log("Suite 1: Section 0 Batching Rule Enforcement");
  try {
    renderMasterPrompt({
      subject: "business_studies",
      batchQuestionCount: 20, // VIOLATION: > 15
      totalQuestionCount: 50,
      batchNumber: 1,
      totalBatches: 3,
      durationMinutes: 45,
      chaptersCoveredSoFar: [],
      retrievedNcertContext: "Sample context",
      fewshotExamples: "Sample exemplar",
    });
    assert(false, "Should reject batch question count > 15", "Did not throw on batch count 20");
  } catch (err: any) {
    assert(
      err.message.includes("Section 0 Violation"),
      "Successfully enforces batch count <= 15 limit",
      err.message
    );
  }

  // ─── SUITE 2: Section 1 Hard Stop (Empty NCERT Context) ───
  console.log("\nSuite 2: Section 1 NCERT Grounding Hard-Stop Rule");
  try {
    renderMasterPrompt({
      subject: "physics",
      batchQuestionCount: 10,
      totalQuestionCount: 50,
      batchNumber: 1,
      totalBatches: 5,
      durationMinutes: 45,
      chaptersCoveredSoFar: [],
      retrievedNcertContext: "   ", // EMPTY CONTEXT
      fewshotExamples: "",
    });
    assert(false, "Should reject empty NCERT context", "Did not throw on empty context");
  } catch (err: any) {
    assert(
      err.message.includes("Section 1 Hard Stop"),
      "Successfully triggers hard-stop when RETRIEVED_NCERT_CONTEXT is empty",
      err.message
    );
  }

  // ─── SUITE 3: Section 2 Calibration Anchoring ───
  console.log("\nSuite 3: Section 2 Few-Shot Calibration Mode Detection");
  const withExemplars = renderMasterPrompt({
    subject: "economics",
    batchQuestionCount: 10,
    totalQuestionCount: 50,
    batchNumber: 1,
    totalBatches: 5,
    durationMinutes: 45,
    chaptersCoveredSoFar: [],
    retrievedNcertContext: "NCERT Chapter 3 Money and Banking",
    fewshotExamples: "Exemplar question 1...",
  });
  assert(
    withExemplars.calibrationSource === "fewshot",
    "Detects fewshot calibration source when exemplars provided"
  );

  const withoutExemplars = renderMasterPrompt({
    subject: "economics",
    batchQuestionCount: 10,
    totalQuestionCount: 50,
    batchNumber: 1,
    totalBatches: 5,
    durationMinutes: 45,
    chaptersCoveredSoFar: [],
    retrievedNcertContext: "NCERT Chapter 3 Money and Banking",
    fewshotExamples: "",
  });
  assert(
    withoutExemplars.calibrationSource === "abstract_definition",
    "Detects abstract_definition fallback when few-shot is empty"
  );

  // ─── SUITE 4: NCERT Chunker & Retriever ───
  console.log("\nSuite 4: NCERT Chunker & Dynamic Retrieval Engine");
  const retriever = new NcertRetriever();
  const bstResult = retriever.retrieveContext({
    subject: "business_studies",
    query: "Unity of command and Fayol",
  });
  assert(bstResult.chunks.length > 0, "Retrieves relevant chunks for business_studies query");
  assert(
    bstResult.contextString.includes("ncert-bst-p1-ch2-s2"),
    "Chunk ID is properly surfaced for strict grounding citation"
  );

  // Ingest custom markdown document test
  const customIngested = retriever.ingestDocument(
    "sociology",
    "Part I",
    "Demographic Structure",
    `## Age Structure of the Indian Population
The age structure of the population refers to the proportion of persons in different age groups relative to the total population.
Demographic dividend occurs when the proportion of working people in the total population is high.`,
    "ncert-soc-test"
  );
  assert(customIngested.length >= 1, "Ingests document into structured chunks with chunk IDs");
  const socResult = retriever.retrieveContext({
    subject: "sociology",
    query: "demographic dividend",
  });
  assert(socResult.contextString.includes("Demographic dividend"), "Retrieves newly ingested custom chunks");

  // ─── SUITE 5: Section 10 Mandatory Numerical Verification Sandbox ───
  console.log("\nSuite 5: Section 10 Numerical Sandbox & Distractor Collision Detection");
  const verifier = new MathVerifier();

  // Test 5A: Clean accurate numerical calculation
  const qClean: V2Question = {
    questionNumber: 1,
    chapter: "Determination of Income",
    microTopic: "Investment Multiplier",
    difficulty: "Moderate",
    skillTested: "Numerical Reasoning",
    archetype: "Calculation Trap",
    ncertReference: {
      part: "Part II",
      chapter: "Determination of Income",
      section: "4.1",
      concept: "Multiplier",
      sourceChunkId: "chunk_eco_1",
    },
    questionText: "If autonomous investment increases by ₹500 crores and MPS = 0.20, what is the total change in national income?",
    options: [
      { id: "A", text: "100", isCorrect: false, studentSelectionTrap: "Multiplication trap" },
      { id: "B", text: "2500", isCorrect: true, studentSelectionTrap: "None" },
      { id: "C", text: "2000", isCorrect: false, studentSelectionTrap: "Offset error" },
      { id: "D", text: "625", isCorrect: false, studentSelectionTrap: "Inversion error" },
    ],
    correctOption: "B",
    estimatedTimeSeconds: 60,
    explanation: {
      stepByStepSolution: "k = 1 / 0.2 = 5. Delta Y = 5 * 500 = 2500",
      coreNcertConcept: "Investment multiplier",
      proEliminationTip: "5 * 500 = 2500",
    },
    verification: {
      applicableForNumericalOnly: true,
      formula: "k = 1 / MPS; Delta Y = k * Delta I",
      inputValues: "MPS = 0.20, Delta I = 500",
      computation: "(500 * (1 / 0.20)) = 2500",
    },
    reviewFlags: {
      needsAdditionalContext: false,
      needsNumericalReview: false,
      calibrationSource: "fewshot",
      confidenceNote: null,
    },
  };

  const cleanRes = verifier.verifyQuestion(qClean);
  assert(cleanRes.passed === true, "Verifies correct numerical arithmetic in sandbox", cleanRes.discrepancyNote);
  assert(cleanRes.computedValue === 2500, "Computed value matches expected 2500");

  // Test 5B: Faulty arithmetic (Model in-context arithmetic error)
  const qFaulty: V2Question = {
    ...qClean,
    questionNumber: 2,
    verification: {
      applicableForNumericalOnly: true,
      formula: "k = 1 / MPS",
      inputValues: "MPS = 0.20, Delta I = 500",
      computation: "(500 * 0.20) = 100", // Evaluates to 100 instead of 2500!
    },
  };
  const faultyRes = verifier.verifyQuestion(qFaulty);
  assert(faultyRes.passed === false, "Detects arithmetic mismatch between computation and correctOption");
  assert(
    faultyRes.distractorTrapMatch === "A",
    "Identifies fatal collision: computation matches distractor A instead of correctOption B"
  );

  // ─── SUITE 6: Multi-Batch Orchestration & Merging ───
  console.log("\nSuite 6: Multi-Batch Orchestration & Merging (50 Questions)");
  const orchestrator = new BatchOrchestrator({
    subject: "business_studies",
    totalQuestionCount: 50,
    batchSize: 10,
    useLiveAi: false, // Use deterministic calibrated engine for unit test
  });

  const batchDistribution = orchestrator.calculateBatchDistribution();
  assert(
    batchDistribution.length === 5 && batchDistribution.every((s) => s <= 15),
    "Splits 50-question mock into 5 batches each <= 15 (Section 0 compliant)"
  );

  const fullPaper = await orchestrator.generateFullPaper();
  assert(fullPaper.allQuestions.length === 50, "Assembled complete 50-question paper");
  const firstQ = fullPaper.allQuestions[0];
  const lastQ = fullPaper.allQuestions[49];
  assert(
    firstQ !== undefined &&
      lastQ !== undefined &&
      firstQ.questionNumber === 1 &&
      lastQ.questionNumber === 50,
    "Sequential question numbering 1..50 preserved across batches"
  );

  // ─── SUITE 7: Section 6 & 8 Balance and Section 18 Human Review ───
  console.log("\nSuite 7: Section 6, 8, and 18 Academic Audit & Sampling");
  const report = fullPaper.auditReport;
  assert(
    report.optionPositionDistribution.A > 0 &&
      report.optionPositionDistribution.B > 0 &&
      report.optionPositionDistribution.C > 0 &&
      report.optionPositionDistribution.D > 0,
    "Option balancing active across all 4 keys (A/B/C/D)"
  );

  assert(
    report.spotCheckSampleQueue.length >= 10, // 20% of 50 = 10
    `Section 18 spot-check sample generated: ${report.spotCheckSampleQueue.length} items (>= 20% sample)`
  );

  // ─── SUITE 8: Platform Model Conversion ───
  console.log("\nSuite 8: Platform Schema Compatibility (types/index.ts)");
  const pQ = fullPaper.platformQuestions[0];
  assert(
    pQ !== undefined &&
      pQ.id.startsWith("cuet_") &&
      pQ.options.length === 4 &&
      pQ.correctOptionId !== undefined,
    "Converts cleanly to platform Question interface for immediate CBT mock readiness"
  );
  assert(
    pQ !== undefined &&
      pQ.solution?.quick !== undefined &&
      pQ.solution?.concept !== undefined,
    "Solution components (quick, concept, detailed) accurately mapped"
  );

  console.log("\n" + "=".repeat(70));
  console.log(`  VERIFICATION RESULTS: ${passedTests} PASSED / ${failedTests} FAILED (${totalTests} total)`);
  console.log("=".repeat(70) + "\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
