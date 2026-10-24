import assert from "assert";
import { buildScoredSet } from "@/lib/scoring";
import { calculateExamScore, CUET_UG_2026_CONFIG } from "@/lib/config/examConfig";

console.log("\n============================================================");
console.log("SUITE: CUET UG CBT Scoring Engine Remediation");
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

const standardQuestion = {
  id: "Q1",
  questionNumber: 1,
  correctOptionId: "B",
  options: [
    { id: "A", text: "Alpha" },
    { id: "B", text: "Beta" },
    { id: "C", text: "Gamma" },
    { id: "D", text: "Delta" },
  ],
};

const droppedQuestion = {
  id: "Q2",
  questionNumber: 2,
  official_answer_status: "officially_dropped",
  isDropped: true,
  correctOption: "DROPPED",
  options: [
    { id: "A", text: "Opt 1" },
    { id: "B", text: "Opt 2" },
    { id: "C", text: "Opt 3" },
    { id: "D", text: "Opt 4" },
  ],
};

const multiCorrectQuestion = {
  id: "Q3",
  questionNumber: 3,
  acceptedAnswers: ["A", "D"],
  options: [
    { id: "A", text: "Opt 1" },
    { id: "B", text: "Opt 2" },
    { id: "C", text: "Opt 3" },
    { id: "D", text: "Opt 4" },
  ],
};

runTest("1. Standard question scores correctly (+5 for correct, -1 for wrong, 0 for unanswered)", () => {
  const setCorrect = buildScoredSet([standardQuestion], [{ id: "Q1", selectedOption: "B" }]);
  assert.strictEqual(setCorrect[0]?.isCorrect, true);

  const setWrong = buildScoredSet([standardQuestion], [{ id: "Q1", selectedOption: "A" }]);
  assert.strictEqual(setWrong[0]?.isCorrect, false);

  const setUnanswered = buildScoredSet([standardQuestion], [{ id: "Q1", selectedOption: null }]);
  assert.strictEqual(setUnanswered[0]?.isCorrect, false);
  assert.strictEqual(setUnanswered[0]?.selectedOption, null);
});

runTest("1b. Standard question with Option D as correct key is NOT misclassified as dropped", () => {
  const standardQuestionD = {
    id: "Q1_D",
    questionNumber: 10,
    correctOptionId: "D",
    options: [
      { id: "A", text: "Alpha" },
      { id: "B", text: "Beta" },
      { id: "C", text: "Gamma" },
      { id: "D", text: "Delta" },
    ],
  };

  const setCorrectD = buildScoredSet([standardQuestionD], [{ id: "Q1_D", selectedOption: "D" }]);
  assert.strictEqual(setCorrectD[0]?.isCorrect, true);
  assert.strictEqual(setCorrectD[0]?.isDropped, false);
  assert.strictEqual(setCorrectD[0]?.expectedOption, "D");

  const setWrongA = buildScoredSet([standardQuestionD], [{ id: "Q1_D", selectedOption: "A" }]);
  assert.strictEqual(setWrongA[0]?.isCorrect, false);
  assert.strictEqual(setWrongA[0]?.isDropped, false);
});

runTest("2. Dropped question awards full credit (+5) for candidate choosing A, B, C, or D", () => {
  for (const opt of ["A", "B", "C", "D"]) {
    const set = buildScoredSet([droppedQuestion], [{ id: "Q2", selectedOption: opt }]);
    assert.strictEqual(set[0]?.isCorrect, true);
    assert.strictEqual(set[0]?.isDropped, true);
    assert.strictEqual(set[0]?.expectedOption, "DROPPED");

    const score = calculateExamScore(1, 0, 0, CUET_UG_2026_CONFIG, 1);
    assert.strictEqual(score.totalMarks, 5);
  }
});

runTest("3. Dropped question receives 0 marks when left unanswered (does not penalize)", () => {
  const set = buildScoredSet([droppedQuestion], [{ id: "Q2", selectedOption: null }]);
  assert.strictEqual(set[0]?.isCorrect, false);
  assert.strictEqual(set[0]?.selectedOption, null);

  const score = calculateExamScore(0, 0, 1, CUET_UG_2026_CONFIG, 1);
  assert.strictEqual(score.totalMarks, 0);
});

runTest("4. Multiple-correct question awards +5 for either accepted key (A or D), and -1 for wrong key (B or C)", () => {
  const setA = buildScoredSet([multiCorrectQuestion], [{ id: "Q3", selectedOption: "A" }]);
  assert.strictEqual(setA[0]?.isCorrect, true);
  assert.strictEqual(setA[0]?.isMultipleCorrect, true);

  const setD = buildScoredSet([multiCorrectQuestion], [{ id: "Q3", selectedOption: "D" }]);
  assert.strictEqual(setD[0]?.isCorrect, true);

  const setB = buildScoredSet([multiCorrectQuestion], [{ id: "Q3", selectedOption: "B" }]);
  assert.strictEqual(setB[0]?.isCorrect, false);

  const setC = buildScoredSet([multiCorrectQuestion], [{ id: "Q3", selectedOption: "C" }]);
  assert.strictEqual(setC[0]?.isCorrect, false);
});

runTest("5. Mixed section calculation conforms strictly to CUET marking rules (+5 / -1)", () => {
  const authQuestions = [standardQuestion, droppedQuestion, multiCorrectQuestion];
  const clientQuestions = [
    { id: "Q1", selectedOption: "B" }, // Standard correct: +5
    { id: "Q2", selectedOption: "C" }, // Dropped attempted: +5
    { id: "Q3", selectedOption: "C" }, // Multi-correct wrong: -1
  ];

  const scored = buildScoredSet(authQuestions, clientQuestions);
  const correctCount = scored.filter((s) => s.selectedOption && s.isCorrect).length;
  const incorrectCount = scored.filter((s) => s.selectedOption && !s.isCorrect).length;

  assert.strictEqual(correctCount, 2);
  assert.strictEqual(incorrectCount, 1);

  const score = calculateExamScore(correctCount, incorrectCount, 0, CUET_UG_2026_CONFIG, 3);
  assert.strictEqual(score.totalMarks, 9); // 2 * 5 - 1 = 9
  assert.strictEqual(score.maxMarks, 15);
});

runTest("6. Unresolved questions never award +5 or assess penalties when candidate picks placeholder A", () => {
  const unresolvedQuestion = {
    id: "Q_UNRES",
    questionNumber: 4,
    official_answer_status: "unresolved",
    needs_human_review: true,
    correctOption: "A", // Placeholder key
    options: [
      { id: "A", text: "Option A (Pending Subject Verification)" },
      { id: "B", text: "Option B (Pending Subject Verification)" },
      { id: "C", text: "Option C (Pending Subject Verification)" },
      { id: "D", text: "Option D (Pending Subject Verification)" },
    ],
  };

  // Candidate selects placeholder "A"
  const setA = buildScoredSet([unresolvedQuestion], [{ id: "Q_UNRES", selectedOption: "A" }]);
  assert.strictEqual(setA[0]?.isCorrect, false);
  assert.strictEqual(setA[0]?.isUnresolved, true);
  assert.strictEqual(setA[0]?.expectedOption, "UNRESOLVED");

  // Candidate selects "B"
  const setB = buildScoredSet([unresolvedQuestion], [{ id: "Q_UNRES", selectedOption: "B" }]);
  assert.strictEqual(setB[0]?.isCorrect, false);
  assert.strictEqual(setB[0]?.isUnresolved, true);
  assert.strictEqual(setB[0]?.expectedOption, "UNRESOLVED");
});

runTest("7. CUET Mathematics CBT scoring enforces 40 max attempts and 200 max marks", () => {
  // 40 questions attempted: 38 correct, 2 incorrect
  const mathScore = calculateExamScore(38, 2, 0, CUET_UG_2026_CONFIG, 40);
  assert.strictEqual(mathScore.maxMarks, 200); // 40 * 5 = 200
  assert.strictEqual(mathScore.totalMarks, 188); // 38 * 5 - 2 = 188
  assert.strictEqual(mathScore.percentage, 94);
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
