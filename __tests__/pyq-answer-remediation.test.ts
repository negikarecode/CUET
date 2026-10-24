import assert from "assert";
import fs from "fs";
import path from "path";

console.log("\n============================================================");
console.log("SUITE: CUET UG PYQ Answer Remediation Regression");
console.log("============================================================\n");

let passed = 0;
let failed = 0;

function runTest(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  PASS: ${name}`);
  } catch (err: any) {
    failed++;
    console.error(`  FAIL: ${name} - ${err.message}`);
  }
}

const rootDir = process.cwd();

runTest("Failure Case 1: Physics Paper 1 Q1 (Kirchhoff loop law) correct option is B (Energy)", () => {
  const filePath = path.join(rootDir, "pyq", "physics", "1.json");
  assert.strictEqual(fs.existsSync(filePath), true);
  const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const q1 = questions[0];

  assert.match(q1.questionText, /Kirchhoff['’]s second law/i);
  assert.strictEqual(q1.correctOption, "B");
  assert.strictEqual(q1.correctOptionId, "B");
  assert.strictEqual(q1.options.find((o: any) => o.id === "B")?.isCorrect, true);
  assert.strictEqual(q1.options.find((o: any) => o.id === "D")?.isCorrect, false);
  assert.strictEqual(q1.official_answer_status, "independently_verified");
});

runTest("Failure Case 2: Accountancy Paper 18 Q1 (Interest on drawings) correct option is B (Nil)", () => {
  const filePath = path.join(rootDir, "pyq", "accountancy", "18.json");
  assert.strictEqual(fs.existsSync(filePath), true);
  const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const q1 = questions[0];

  assert.match(q1.questionText, /interest on drawings/i);
  assert.strictEqual(q1.correctOption, "B");
  assert.strictEqual(q1.correctOptionId, "B");
  assert.strictEqual(q1.options.find((o: any) => o.id === "B")?.isCorrect, true);
  assert.strictEqual(q1.options.find((o: any) => o.id === "D")?.isCorrect, false);
  assert.strictEqual(q1.official_answer_status, "independently_verified");
});

runTest("Zero questions retain invalid 'official_final_key_verified' without booklet evidence", () => {
  const canPath = path.join(rootDir, "PYQ_CANONICAL_DATABASE.jsonl");
  const content = fs.readFileSync(canPath, "utf-8");
  const lines = content.split("\n").filter((l) => l.trim().length > 0);

  let invalidOfficialClaims = 0;
  for (const line of lines) {
    const rec = JSON.parse(line);
    if (
      rec.answer_verification_status === "official_final_key_verified" &&
      rec.exam_year === 2025
    ) {
      // All 2025 CBT positional claims must have been revoked
      invalidOfficialClaims++;
    }
  }

  assert.strictEqual(invalidOfficialClaims, 0);
});

runTest("Every publishable question with correctOption has matching option marked isCorrect: true", () => {
  const sampleFiles = [
    path.join(rootDir, "pyq", "physics", "1.json"),
    path.join(rootDir, "pyq", "accountancy", "18.json"),
    path.join(rootDir, "pyq", "chemistry", "5.json"),
    path.join(rootDir, "pyq", "maths", "2.json"),
  ];

  for (const f of sampleFiles) {
    const questions = JSON.parse(fs.readFileSync(f, "utf-8"));
    for (const q of questions) {
      if (q.isPublishable === false || q.needs_human_review || q.correctOption === "UNRESOLVED" || q.correctOption === "DROPPED") {
        continue;
      }
      const correctOpt = q.correctOption;
      const matchingOpt = q.options.find((o: any) => o.id === correctOpt);
      assert.notStrictEqual(matchingOpt, undefined);
      assert.strictEqual(matchingOpt.isCorrect, true);
    }
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
