#!/usr/bin/env tsx
/**
 * CUET UG Master Question Paper Generator (v2) - Command Line Interface
 *
 * Usage:
 *   npx tsx scripts/generate-v2-paper.ts --subject business_studies --questions 10 --dry-run
 *   npx tsx scripts/generate-v2-paper.ts --subject economics --questions 50 --batch-size 10 --output generated-eco.json
 *   npx tsx scripts/generate-v2-paper.ts --subject physics --questions 15 --live
 */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

import { BatchOrchestrator } from "../lib/generator_v2";

function parseArgs() {
  const args = process.argv.slice(2);
  const options: {
    subject: string;
    questions: number;
    batchSize: number;
    duration: number;
    dryRun: boolean;
    output?: string;
    saveMockNum?: number;
  } = {
    subject: "business_studies",
    questions: 10,
    batchSize: 10,
    duration: 45,
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextVal = args[i + 1];
    if (arg === "--subject" && nextVal !== undefined) {
      options.subject = nextVal;
      i++;
    } else if (arg === "--questions" && nextVal !== undefined) {
      options.questions = parseInt(nextVal, 10);
      i++;
    } else if (arg === "--batch-size" && nextVal !== undefined) {
      options.batchSize = parseInt(nextVal, 10);
      i++;
    } else if (arg === "--duration" && nextVal !== undefined) {
      options.duration = parseInt(nextVal, 10);
      i++;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--live") {
      options.dryRun = false;
    } else if (arg === "--output" && nextVal !== undefined) {
      options.output = nextVal;
      i++;
    } else if (arg === "--save-mock" && nextVal !== undefined) {
      options.saveMockNum = parseInt(nextVal, 10);
      i++;
    }
  }

  return options;
}

async function main() {
  const opts = parseArgs();

  console.log("=".repeat(70));
  console.log("  CUET UG MASTER QUESTION PAPER GENERATOR (v2)");
  console.log("  Grounding: NCERT Retrieval Only | Verification: External Sandbox");
  console.log("=".repeat(70));
  console.log(`  Subject:               ${opts.subject}`);
  console.log(`  Total Target:          ${opts.questions} questions`);
  console.log(`  Batch Size (<= 15):    ${opts.batchSize}`);
  console.log(`  Execution Mode:        ${opts.dryRun ? "Offline Calibrated Sandbox (Dry Run)" : "Live AI (gemini-2.0-flash)"}`);
  console.log("-".repeat(70));

  const orchestrator = new BatchOrchestrator({
    subject: opts.subject,
    totalQuestionCount: opts.questions,
    batchSize: opts.batchSize,
    durationMinutes: opts.duration,
    useLiveAi: !opts.dryRun,
  });

  try {
    const startTime = Date.now();
    const result = await orchestrator.generateFullPaper();
    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`\n  Generation Complete in ${elapsedSeconds}s!`);
    console.log(`  Total Batches Processed: ${result.batches.length}`);
    console.log(`  Total Questions Built:   ${result.allQuestions.length}`);

    // Print Audit Metrics
    console.log("\n" + "=".repeat(70));
    console.log("  ACADEMIC & PSYCHOMETRIC AUDIT SUMMARY (Section 6, 8, 10, 18)");
    console.log("=".repeat(70));
    console.log("  Difficulty Distribution (Target: 20% Easy | 50% Mod | 25% Diff | 5% Very Diff):");
    for (const [diff, count] of Object.entries(result.auditReport.actualDifficultyDistribution)) {
      const pct = (result.auditReport.difficultyPercentages as any)[diff];
      console.log(`    - ${diff.padEnd(14)}: ${String(count).padStart(3)} (${pct})`);
    }

    console.log("\n  Option Position Balancing (Target: ~25% per key across paper):");
    for (const [key, count] of Object.entries(result.auditReport.optionPositionDistribution)) {
      const pct = ((count / result.allQuestions.length) * 100).toFixed(1);
      console.log(`    - Key ${key}: ${String(count).padStart(3)} (${pct}%)`);
    }

    console.log("\n  Mandatory Numerical Sandbox Verification (Section 10):");
    console.log(`    - Total Numerical Questions: ${result.auditReport.totalNumericalQuestions}`);
    console.log(`    - Sandbox Passed:            ${result.auditReport.numericalPassed}`);
    console.log(`    - Sandbox Needs Review:      ${result.auditReport.numericalReviewRequired}`);

    console.log("\n  Human Review Routing (Section 18):");
    console.log(`    - Flagged Review Queue:      ${result.auditReport.humanReviewQueue.length} items`);
    console.log(`    - 20% Spot-Check Queue:      ${result.auditReport.spotCheckSampleQueue.length} items sampled`);

    if (result.auditReport.humanReviewQueue.length > 0) {
      console.log("\n  [REVIEW QUEUE DETAILS]");
      for (const item of result.auditReport.humanReviewQueue) {
        console.log(`    * Q${item.questionNumber}: ${item.reason}`);
      }
    }

    // Save Output if specified
    if (opts.output) {
      const outPath = path.resolve(process.cwd(), opts.output);
      fs.writeFileSync(
        outPath,
        JSON.stringify(
          {
            auditReport: result.auditReport,
            batches: result.batches,
            questions: result.allQuestions,
            platformQuestions: result.platformQuestions,
          },
          null,
          2
        )
      );
      console.log(`\n  Saved Full Output Artifact: ${outPath}`);
    }

    // Save to CBT Mock format if requested
    if (opts.saveMockNum) {
      const mockDir = path.resolve(process.cwd(), "mock", opts.subject);
      if (!fs.existsSync(mockDir)) {
        fs.mkdirSync(mockDir, { recursive: true });
      }
      const mockFile = path.join(mockDir, `${opts.saveMockNum}.json`);
      fs.writeFileSync(mockFile, JSON.stringify(result.platformQuestions, null, 2));
      console.log(`  Saved CBT Mock Test File:   ${mockFile}`);
    }

    console.log("\n" + "=".repeat(70));
    console.log("  PIPELINE STATUS: " + (result.auditReport.overallCompliant ? "100% COMPLIANT & APPROVED" : "FLAGGED FOR REVIEW"));
    console.log("=".repeat(70) + "\n");
  } catch (err: any) {
    console.error(`\n  [PIPELINE ERROR]: ${err.message}\n`);
    process.exit(1);
  }
}

main();
