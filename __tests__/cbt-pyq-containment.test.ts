import assert from "assert";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { isQuestionEligibleForActiveCBT, isQuestionUnresolved, resolveQuestionCorrectOptionId } from "@/lib/scoring";

console.log("\n============================================================");
console.log("SUITE: CUET UG CBT PYQ Emergency Containment Regression");
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

// 1. Question-level containment: Questions with empty options or unresolved status strictly fail eligibility
runTest("Question Containment: Incomplete question fixture with empty options is strictly ineligible for active CBT", () => {
  const dummyQuarantined = {
    questionNumber: 6,
    questionText: "Sample incomplete question",
    options: [],
    correctOption: "UNRESOLVED",
    isPublishable: false
  };
  assert.strictEqual(isQuestionEligibleForActiveCBT(dummyQuarantined), false);
  assert.strictEqual(isQuestionUnresolved(dummyQuarantined), true);
  assert.strictEqual(resolveQuestionCorrectOptionId(dummyQuarantined), null);
});

// 2. Verification of Repaired Chemistry Paper 2: Now fully reconstructed (50/50 questions) with genuine answers
runTest("Repaired Paper 2: Chemistry Paper 2 is fully reconstructed (50/50 questions) with genuine answers", () => {
  const res = getQuestionsForTest("chemistry-pyq-2");
  assert.strictEqual(res.questions.length, 50, "Repaired paper 2 must return all 50 verified questions");
  assert.doesNotMatch(res.testMeta.title, /Under Reconstruction/i);

  const rawQ = require("../pyq/chemistry/2.json")[5]; // Q6
  assert.strictEqual(rawQ.questionNumber, 6);
  assert.strictEqual(rawQ.options?.length, 4);
  assert.strictEqual(isQuestionEligibleForActiveCBT(rawQ), true);
  assert.strictEqual(isQuestionUnresolved(rawQ), false);
  assert.strictEqual(resolveQuestionCorrectOptionId(rawQ), "A");
});

// 3. Verification of Repaired Chemistry Paper 10: Now fully restored to 50 genuine questions
runTest("Repaired Paper 10: Chemistry Paper 10 is fully reconstructed (50/50 questions) with genuine answers", () => {
  const res = getQuestionsForTest("chemistry-pyq-10");
  assert.strictEqual(res.questions.length, 50, "Repaired paper must return all 50 verified questions");
  assert.doesNotMatch(res.testMeta.title, /Under Reconstruction/i);

  const q25 = res.questions[24];
  assert.ok(q25, "q25 must be defined");
  assert.strictEqual(q25.questionNumber, 25);
  assert.strictEqual(q25.options?.length, 4);
  assert.strictEqual(q25.correctOptionId, "C");
  assert.strictEqual(isQuestionEligibleForActiveCBT(q25), true);
  assert.strictEqual(isQuestionUnresolved(q25), false);
});

// 3b. Verification of Repaired English Paper 1: Recovered and fully reconstructed (50/50 questions)
runTest("Repaired English Paper 1: English Paper 1 is fully reconstructed (50/50 questions) with genuine answers", () => {
  const res = getQuestionsForTest("english-pyq-1");
  assert.strictEqual(res.questions.length, 50, "Repaired english paper 1 must return all 50 verified questions");
  assert.doesNotMatch(res.testMeta.title, /Under Reconstruction/i);

  const q1 = res.questions[0];
  assert.ok(q1, "q1 must be defined");
  assert.strictEqual(q1.questionNumber, 1);
  assert.strictEqual(q1.correctOptionId, "C");
  assert.strictEqual(isQuestionEligibleForActiveCBT(q1), true);

  const q22 = res.questions[21];
  assert.ok(q22, "q22 must be defined");
  assert.strictEqual(q22.questionNumber, 22);
  assert.strictEqual(q22.correctOptionId, "D");
  assert.strictEqual(q22.options?.length, 4);
  assert.strictEqual(isQuestionEligibleForActiveCBT(q22), true);
});

// 3c. Verification of Repaired English Paper 2: Recovered and fully reconstructed (50/50 questions)
runTest("Repaired English Paper 2: English Paper 2 is fully reconstructed (50/50 questions) with genuine answers", () => {
  const res = getQuestionsForTest("english-pyq-2");
  assert.strictEqual(res.questions.length, 50, "Repaired english paper 2 must return all 50 verified questions");
  assert.doesNotMatch(res.testMeta.title, /Under Reconstruction/i);

  const q1 = res.questions[0];
  assert.ok(q1, "q1 must be defined");
  assert.strictEqual(q1.questionNumber, 1);
  assert.strictEqual(q1.correctOptionId, "C");
  assert.strictEqual(isQuestionEligibleForActiveCBT(q1), true);

  const q14 = res.questions[13];
  assert.ok(q14, "q14 must be defined");
  assert.strictEqual(q14.questionNumber, 14);
  assert.strictEqual(q14.correctOptionId, "B");
  assert.strictEqual(q14.options?.length, 4);
  assert.strictEqual(isQuestionEligibleForActiveCBT(q14), true);
});

// 3d. Verification of Repaired English Paper 3: Recovered and fully reconstructed (50/50 questions)
runTest("Repaired English Paper 3: English Paper 3 is fully reconstructed (50/50 questions) with genuine answers", () => {
  const res = getQuestionsForTest("english-pyq-3");
  assert.strictEqual(res.questions.length, 50, "Repaired english paper 3 must return all 50 verified questions");
  assert.doesNotMatch(res.testMeta.title, /Under Reconstruction/i);

  const q1 = res.questions[0];
  assert.ok(q1, "q1 must be defined");
  assert.strictEqual(q1.questionNumber, 1);
  assert.strictEqual(q1.correctOptionId, "B");
  assert.strictEqual(isQuestionEligibleForActiveCBT(q1), true);

  const q40 = res.questions[39];
  assert.ok(q40, "q40 must be defined");
  assert.strictEqual(q40.questionNumber, 40);
  assert.strictEqual(q40.correctOptionId, "A");
  assert.strictEqual(q40.options?.length, 4);
  assert.strictEqual(isQuestionEligibleForActiveCBT(q40), true);

  const q50 = res.questions[49];
  assert.ok(q50, "q50 must be defined");
  assert.strictEqual(q50.questionNumber, 50);
  assert.strictEqual(q50.correctOptionId, "D");
  assert.strictEqual(q50.options?.length, 4);
  assert.strictEqual(isQuestionEligibleForActiveCBT(q50), true);
});

// 3e. Verification of Repaired English Paper 4: Recovered and fully reconstructed (50/50 questions)
runTest("Repaired English Paper 4: English Paper 4 is fully reconstructed (50/50 questions) with genuine answers", () => {
  const res = getQuestionsForTest("english-pyq-4");
  assert.strictEqual(res.questions.length, 50, "Repaired english paper 4 must return all 50 verified questions");
  assert.doesNotMatch(res.testMeta.title, /Under Reconstruction/i);

  const q1 = res.questions[0];
  assert.ok(q1, "q1 must be defined");
  assert.strictEqual(q1.questionNumber, 1);
  assert.strictEqual(q1.correctOptionId, "C");
  assert.strictEqual(isQuestionEligibleForActiveCBT(q1), true);

  const q36 = res.questions[35];
  assert.ok(q36, "q36 must be defined");
  assert.strictEqual(q36.questionNumber, 36);
  assert.strictEqual(q36.correctOptionId, "C");
  assert.strictEqual(q36.options?.length, 4);
  assert.strictEqual(isQuestionEligibleForActiveCBT(q36), true);

  const q50 = res.questions[49];
  assert.ok(q50, "q50 must be defined");
  assert.strictEqual(q50.questionNumber, 50);
  assert.strictEqual(q50.correctOptionId, "C");
  assert.strictEqual(q50.options?.length, 4);
  assert.strictEqual(isQuestionEligibleForActiveCBT(q50), true);
});

// 3. Reconstructed Mathematics papers full accessibility
runTest("Repaired Mathematics papers 1 and 2 return full verified questions (85/85 each)", () => {
  const res1 = getQuestionsForTest("maths-pyq-1");
  assert.strictEqual(res1.questions.length, 85, "Repaired Maths Paper 1 must return 85 questions");
  assert.doesNotMatch(res1.testMeta.title, /Under Reconstruction/i);

  const res2 = getQuestionsForTest("maths-pyq-2");
  assert.strictEqual(res2.questions.length, 85, "Repaired Maths Paper 2 must return 85 questions");
  assert.doesNotMatch(res2.testMeta.title, /Under Reconstruction/i);
});

// 4. Complete authentic papers remain accessible
runTest("Complete verified papers (Accountancy 1, BST 1, Geo 1) return full 50 questions", () => {
  const acc = getQuestionsForTest("accountancy-pyq-1");
  assert.strictEqual(acc.questions.length, 50);
  assert.doesNotMatch(acc.testMeta.title, /Under Reconstruction/i);

  const bst = getQuestionsForTest("bst-pyq-1");
  assert.strictEqual(bst.questions.length, 50);
  assert.doesNotMatch(bst.testMeta.title, /Under Reconstruction/i);

  const geo = getQuestionsForTest("geo-pyq-1");
  assert.strictEqual(geo.questions.length, 50);
  assert.doesNotMatch(geo.testMeta.title, /Under Reconstruction/i);
});

// 5. Practice mock bank isolation
runTest("Protection Rule: Standard 50-question mock exams remain 100% intact", () => {
  const physMock = getQuestionsForTest("physics-mock-1");
  assert.strictEqual(physMock.questions.length, 50);
  assert.match(physMock.testMeta.title, /Full Mock Paper 1/i);

  const chemMock = getQuestionsForTest("chemistry-mock-1");
  assert.strictEqual(chemMock.questions.length, 50);
});

// 6. Synthetic boilerplate detection in eligibility validator
runTest("Questions with synthetic Option A boilerplate explanations are rejected by eligibility check", () => {
  const dummyQ = {
    id: "dummy-test-1",
    questionNumber: 1,
    prompt: "Sample question prompt with sufficient length to pass stem check?",
    options: [
      { id: "A", text: "Option A text" },
      { id: "B", text: "Option B text" },
      { id: "C", text: "Option C text" },
      { id: "D", text: "Option D text" },
    ],
    correctOption: "A",
    detailedSolution: "Step-by-Step Breakdown: 1. Analyze the stem and evaluate the criteria established in English. 2. Compare each given option against NCERT textbook statements. 3. Option A is consistent with the canonical curriculum.",
  };
  assert.strictEqual(isQuestionEligibleForActiveCBT(dummyQ), false);
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
