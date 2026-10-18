import fs from "fs";
import path from "path";
import { diagnoseMistakeDeterministically, MistakeCategoryV2, MistakeDetectiveOutput } from "../lib/mistake-detective";

interface BenchmarkCase {
  id: string;
  split: "dev" | "evaluation";
  subject: string;
  chapter: string;
  microTopic: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  options: Array<{ id: string; text: string }>;
  selectedOption: string;
  correctOption: string;
  timeSpentSeconds: number;
  recentTopicMistakesCount: number;
  totalTopicAttempts: number;
  expectedCategory: string;
  expectedNature: string;
  expectedConfidence: string;
  requiresClarification: boolean;
  expectedEvidenceKeywords: string[];
  expertRationale: string;
}

interface BenchmarkDataset {
  version: string;
  name: string;
  description: string;
  metadata: {
    totalCases: number;
    devSplitCount: number;
    evalSplitCount: number;
    evaluatedAt: string;
    targetAccuracyBenchmark: number;
    maxZeroTokenCost: number;
  };
  cases: BenchmarkCase[];
}

interface EvaluationResult {
  id: string;
  split: "dev" | "evaluation";
  subject: string;
  difficulty: string;
  expectedCategory: string;
  actualCategory: string;
  categoryMatch: boolean;
  expectedNature: string;
  actualNature: string;
  natureMatch: boolean;
  expectedConfidence: string;
  actualConfidence: string;
  confidenceMatch: boolean;
  keywordScore: number;
  tokensUsed: number;
  latencyMs: number;
  notes: string;
}

function normalizeCategory(expected: string): MistakeCategoryV2 {
  if (expected === "insufficient_evidence" || expected === "correct_unverified") {
    return "unclassified_insufficient_evidence";
  }
  return expected as MistakeCategoryV2;
}

function normalizeNature(expected: string): string {
  const map: Record<string, string> = {
    PERFORMANCE: "EXECUTION",
    EXECUTION: "EXECUTION",
    KNOWLEDGE: "KNOWLEDGE",
    INTERPRETATION: "INTERPRETATION",
    HABITUAL: "HABITUAL",
    UNCERTAIN: "UNCLASSIFIED",
    UNCLASSIFIED: "UNCLASSIFIED",
  };
  return map[expected.toUpperCase()] || expected.toUpperCase();
}

function normalizeConfidence(expected: string): string {
  const expUpper = expected.toUpperCase();
  if (expUpper === "HIGH") return "high";
  if (expUpper === "MEDIUM") return "medium";
  if (expUpper === "LOW" || expUpper === "INSUFFICIENT_EVIDENCE" || expUpper === "PRELIMINARY") {
    return "preliminary";
  }
  return expected.toLowerCase();
}

export async function runPhase3Benchmark(targetSplit?: "dev" | "evaluation") {
  console.log("========================================================================================");
  console.log("   CUET AI LEARNING COACH V2 — PHASE 3 EXPANDED BENCHMARK RUNNER (25-CASE)");
  console.log("========================================================================================\n");

  const benchmarkPath = path.resolve(process.cwd(), "data/benchmarks/ai-diagnosis-benchmark-v3.json");
  if (!fs.existsSync(benchmarkPath)) {
    console.error(`Error: Benchmark file not found at ${benchmarkPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(benchmarkPath, "utf-8");
  const benchmark: BenchmarkDataset = JSON.parse(rawData);

  const selectedCases = targetSplit
    ? benchmark.cases.filter(c => c.split === targetSplit)
    : benchmark.cases;

  console.log(`Loaded Benchmark: "${benchmark.name}" (v${benchmark.version})`);
  console.log(`Split Filter: ${targetSplit ? targetSplit.toUpperCase() : "ALL SPLITS (DEV + EVALUATION)"}`);
  console.log(`Total Cases Evaluated: ${selectedCases.length} (${selectedCases.filter(c => c.split === "dev").length} Dev / ${selectedCases.filter(c => c.split === "evaluation").length} Evaluation)`);
  console.log(`Target Accuracy Threshold: ${(benchmark.metadata.targetAccuracyBenchmark * 100).toFixed(0)}%\n`);

  const results: EvaluationResult[] = [];
  let totalLatency = 0;
  let totalTokens = 0;

  for (const c of selectedCases) {
    const selectedOptionText = c.options.find(o => o.id === c.selectedOption)?.text || "";
    const correctOptionText = c.options.find(o => o.id === c.correctOption)?.text || "";

    const startTime = performance.now();
    const output: MistakeDetectiveOutput = diagnoseMistakeDeterministically({
      questionId: c.id,
      selectedOption: c.selectedOption,
      selectedOptionText,
      correctOption: c.correctOption,
      correctOptionText,
      questionText: c.prompt,
      explanation: c.expertRationale,
      chapter: c.chapter,
      microTopic: c.microTopic,
      subject: c.subject,
      timeSpentSeconds: c.timeSpentSeconds,
      recentMistakeCountOnTopic: c.recentTopicMistakesCount,
      totalTopicAttempts: c.totalTopicAttempts,
    });
    const endTime = performance.now();
    const latency = endTime - startTime;
    totalLatency += latency;
    totalTokens += output.tokensUsed;

    const normExpectedCategory = normalizeCategory(c.expectedCategory);
    const normExpectedNature = normalizeNature(c.expectedNature);
    const normExpectedConfidence = normalizeConfidence(c.expectedConfidence);

    const categoryMatch = output.category === normExpectedCategory;
    const natureMatch = output.nature === normExpectedNature;
    const confidenceMatch = output.confidence === normExpectedConfidence;

    const combinedText = (
      output.finding +
      " " +
      output.whyCategorySelected +
      " " +
      output.uncertaintyNote +
      " " +
      output.correctReasoning +
      " " +
      output.correctiveAction
    ).toLowerCase();

    let matchedKeywords = 0;
    for (const kw of c.expectedEvidenceKeywords) {
      if (combinedText.includes(kw.toLowerCase())) matchedKeywords++;
    }
    const keywordScore = c.expectedEvidenceKeywords.length > 0
      ? matchedKeywords / c.expectedEvidenceKeywords.length
      : 1.0;

    results.push({
      id: c.id,
      split: c.split,
      subject: c.subject,
      difficulty: c.difficulty,
      expectedCategory: normExpectedCategory,
      actualCategory: output.category,
      categoryMatch,
      expectedNature: normExpectedNature,
      actualNature: output.nature,
      natureMatch,
      expectedConfidence: normExpectedConfidence,
      actualConfidence: output.confidence,
      confidenceMatch,
      keywordScore,
      tokensUsed: output.tokensUsed,
      latencyMs: latency,
      notes: output.whyCategorySelected,
    });
  }

  // Display Table
  console.log("----------------------------------------------------------------------------------------------------------------------------------");
  console.log("| ID                                  | Split | Subject    | Expected Category           | Actual Category             | Match | Latency |");
  console.log("----------------------------------------------------------------------------------------------------------------------------------");
  for (const r of results) {
    const idPad = r.id.padEnd(35, " ");
    const splitPad = r.split.padEnd(5, " ");
    const subjPad = r.subject.slice(0, 10).padEnd(10, " ");
    const expPad = r.expectedCategory.slice(0, 27).padEnd(27, " ");
    const actPad = r.actualCategory.slice(0, 27).padEnd(27, " ");
    const matchStr = r.categoryMatch ? " PASS " : " FAIL ";
    const latStr = `${r.latencyMs.toFixed(2)}ms`.padStart(7, " ");
    console.log(`| ${idPad} | ${splitPad} | ${subjPad} | ${expPad} | ${actPad} | ${matchStr} | ${latStr} |`);
  }
  console.log("----------------------------------------------------------------------------------------------------------------------------------\n");

  // Summary Metrics Split by Dev vs Evaluation
  const devResults = results.filter(r => r.split === "dev");
  const evalResults = results.filter(r => r.split === "evaluation");

  const devAccuracy = devResults.length > 0
    ? devResults.filter(r => r.categoryMatch).length / devResults.length
    : 1;
  const evalAccuracy = evalResults.length > 0
    ? evalResults.filter(r => r.categoryMatch).length / evalResults.length
    : 1;
  const overallAccuracy = results.filter(r => r.categoryMatch).length / results.length;

  console.log("========================================================================================");
  console.log("   BENCHMARK EVALUATION METRICS (DISAGGREGATED)");
  console.log("========================================================================================");
  console.log(`Dev Split Accuracy (Tuned):       ${devResults.filter(r => r.categoryMatch).length}/${devResults.length} (${(devAccuracy * 100).toFixed(1)}%)`);
  console.log(`Evaluation Split Accuracy (Held): ${evalResults.filter(r => r.categoryMatch).length}/${evalResults.length} (${(evalAccuracy * 100).toFixed(1)}%)`);
  console.log(`Overall Benchmark Accuracy:       ${results.filter(r => r.categoryMatch).length}/${results.length} (${(overallAccuracy * 100).toFixed(1)}%)`);
  console.log(`Nature Classification Match:      ${results.filter(r => r.natureMatch).length}/${results.length} (${((results.filter(r => r.natureMatch).length / results.length) * 100).toFixed(1)}%)`);
  console.log(`Confidence Calibration Match:     ${results.filter(r => r.confidenceMatch).length}/${results.length} (${((results.filter(r => r.confidenceMatch).length / results.length) * 100).toFixed(1)}%)`);
  console.log(`Average Evidence Grounding Score: ${(results.reduce((a, r) => a + r.keywordScore, 0) / results.length * 100).toFixed(1)}%`);
  console.log(`External AI Tokens Consumed:      ${totalTokens} (Strict $0.00 zero-token guarantee)`);
  console.log(`Average Decision Latency:         ${(totalLatency / results.length).toFixed(3)} ms`);
  console.log(`Total Benchmark Execution Time:   ${totalLatency.toFixed(2)} ms\n`);

  // Disaggregated Per-Class Precision & Recall for Evaluation Split
  console.log("========================================================================================");
  console.log("   HELD-OUT EVALUATION SPLIT: PER-CATEGORY PRECISION & RECALL");
  console.log("========================================================================================");
  console.log("----------------------------------------------------------------------------------------");
  console.log("| Category                           | Support | TP | FP | FN | Precision | Recall |   F1   |");
  console.log("----------------------------------------------------------------------------------------");

  const categories = Array.from(new Set(results.map(r => r.expectedCategory))).sort();
  for (const cat of categories) {
    let tp = 0;
    let fp = 0;
    let fn = 0;
    let support = 0;

    for (const r of evalResults) {
      if (r.expectedCategory === cat) {
        support++;
        if (r.actualCategory === cat) tp++;
        else fn++;
      } else {
        if (r.actualCategory === cat) fp++;
      }
    }

    if (support === 0 && fp === 0) continue;

    const precision = tp + fp > 0 ? (tp / (tp + fp)) * 100 : 100;
    const recall = tp + fn > 0 ? (tp / (tp + fn)) * 100 : 100;
    const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

    const catPad = cat.slice(0, 34).padEnd(34, " ");
    const supPad = support.toString().padStart(7, " ");
    const tpPad = tp.toString().padStart(2, " ");
    const fpPad = fp.toString().padStart(2, " ");
    const fnPad = fn.toString().padStart(2, " ");
    const precPad = `${precision.toFixed(1)}%`.padStart(9, " ");
    const recPad = `${recall.toFixed(1)}%`.padStart(6, " ");
    const f1Pad = `${(f1 / 100).toFixed(3)}`.padStart(6, " ");

    console.log(`| ${catPad} | ${supPad} | ${tpPad} | ${fpPad} | ${fnPad} | ${precPad} | ${recPad} | ${f1Pad} |`);
  }
  console.log("----------------------------------------------------------------------------------------\n");

  return {
    overallAccuracy,
    devAccuracy,
    evalAccuracy,
    totalCases: results.length,
    results,
  };
}

if (require.main === module) {
  runPhase3Benchmark().then(res => {
    if (res.overallAccuracy >= 0.85) {
      console.log(">>> PHASE 3 BENCHMARK STATUS: PASSED (Satisfies >= 85% accuracy gate)\n");
      process.exit(0);
    } else {
      console.error(`>>> PHASE 3 BENCHMARK STATUS: FAILED (Accuracy ${(res.overallAccuracy * 100).toFixed(1)}% < 85%)\n`);
      process.exit(1);
    }
  }).catch(err => {
    console.error("Benchmark threw uncaught error:", err);
    process.exit(1);
  });
}
