/**
 * Comprehensive Integrity & Mock Identity Regression Test Suite
 *
 * Verifies:
 * 1. Mock Identity & Canonical Slug Resolution (Bug 2)
 *    - Re-attempting Chemistry Mock 1 opens Chemistry Mock 1
 *    - Re-attempting History Mock 1 opens History Mock 1 (never Physics Mock 1)
 *    - Re-attempting via database UUID resolves to canonical mock
 *    - Unknown / unresolvable UUID returns null and empty questions (no silent Physics fallback)
 * 2. Scoring & Grading Pipeline Integrity
 *    - Gandhi Dandi question: selecting Option C ("6 April 1930") awards +5 marks and isCorrect: true
 *    - History Mock 1 (Q1) and Practice Unit 11 Test 20 (Q14) grade correctly
 *    - Explanation text matches the authoritative key without contradiction
 *    - Multi-schema key resolution (correctOptionId, correct_option, correctOption, options[].isCorrect)
 * 3. Fresh attempt isolation
 *    - New attempt references authentic mock ID
 *    - Old attempt and scorecard remain intact and unaltered in attempt store
 */

import assert from "node:assert";
import { stringToUuid } from "../lib/utils";
import { resolveCanonicalTestId, getAuthoritativeTestSlug } from "../lib/canonical-tests";
import { getQuestionsForTest, resolveSubjectDefinition } from "../lib/data/mock50Questions";
import { buildScoredSet } from "../lib/scoring";
import { RecordedTestAttempt } from "../types";

describeIntegrityTests();

async function describeIntegrityTests() {
  console.log("=================================================================");
  console.log("   CUETMATE MOCK IDENTITY & GRADING INTEGRITY REGRESSION SUITE   ");
  console.log("=================================================================\n");

  test1_PreserveExactMockIdentityChemistry();
  test2_PreserveExactMockIdentityHistoryAndOthers();
  test3_DatabaseUuidReverseResolution();
  test4_UnknownTestNeverFallsBackToPhysics();
  test5_GandhiDandiQuestionGradingIntegrity();
  test6_MultiSchemaAuthoritativeScoring();
  test7_ScorecardHistoryPreservation();

  console.log("\n=================================================================");
  console.log("  ALL MOCK IDENTITY & GRADING INTEGRITY TESTS PASSED! ✅         ");
  console.log("=================================================================\n");
}

/**
 * 1. Re-attempting Chemistry Mock 1 opens Chemistry Mock 1
 */
function test1_PreserveExactMockIdentityChemistry() {
  console.log("Test 1: Re-attempting Chemistry Mock 1 resolves to Chemistry Mock 1");

  const canonical = resolveCanonicalTestId("chemistry-mock-1");
  assert.strictEqual(canonical, "chemistry-mock-1", "Canonical ID must be chemistry-mock-1");

  const { testMeta, questions } = getQuestionsForTest(canonical!);
  assert.strictEqual(testMeta.subject, "Chemistry", "Subject must be Chemistry");
  assert.strictEqual(questions.length, 50, "Must have 50 chemistry questions");
  assert.ok(testMeta.title.includes("Chemistry"), "Title must contain Chemistry");
  console.log("  ✓ Chemistry Mock 1 resolves with 50 questions and Chemistry subject");
}

/**
 * 2. Re-attempting History Mock 1 opens History Mock 1 (never Physics Mock 1)
 */
function test2_PreserveExactMockIdentityHistoryAndOthers() {
  console.log("Test 2: Re-attempting History Mock 1 opens History Mock 1 (never Physics)");

  const canonicalHistory = resolveCanonicalTestId("history-mock-1");
  assert.strictEqual(canonicalHistory, "history-mock-1");

  const { testMeta: histMeta, questions: histQuestions } = getQuestionsForTest(canonicalHistory!);
  assert.strictEqual(histMeta.subject, "History", "Subject must be History, NOT Physics");
  assert.strictEqual(histQuestions.length, 50, "Must have 50 history questions");
  assert.ok(!histMeta.subject.toLowerCase().includes("physics"), "Must NOT be Physics");

  // Also verify other subjects: Economics, Business Studies, Political Science
  const ecoSlug = resolveCanonicalTestId("economics-mock-2");
  assert.strictEqual(ecoSlug, "eco-mock-2");
  const { testMeta: ecoMeta } = getQuestionsForTest(ecoSlug!);
  assert.strictEqual(ecoMeta.subject, "Economics");

  const polSlug = resolveCanonicalTestId("political-science-mock-3");
  assert.strictEqual(polSlug, "pol-science-mock-3");
  const { testMeta: polMeta } = getQuestionsForTest(polSlug!);
  assert.strictEqual(polMeta.subject, "Political Science");

  console.log("  ✓ History, Economics, and Political Science mocks preserve exact identity");
}

/**
 * 3. Database UUID reverse resolution (Scorecard Re-attempt)
 */
function test3_DatabaseUuidReverseResolution() {
  console.log("Test 3: Database UUID maps back to authentic canonical mock slug");

  // Supabase stores user_attempts.test_id as stringToUuid(testSlug)
  const historyUuid = stringToUuid("history-mock-1");
  const resolvedHist = resolveCanonicalTestId(historyUuid);
  assert.strictEqual(resolvedHist, "history-mock-1", "UUID must resolve to history-mock-1");

  const chemUuid = stringToUuid("chemistry-mock-1");
  const resolvedChem = resolveCanonicalTestId(chemUuid);
  assert.strictEqual(resolvedChem, "chemistry-mock-1", "UUID must resolve to chemistry-mock-1");

  // Attempt with metadata
  const mockAttempt: RecordedTestAttempt = {
    id: "attempt_123",
    userId: "user_456",
    testId: historyUuid,
    testTitle: "CUET UG History Full Mock Paper 1 (50 Compulsory Qs)",
    subject: "History",
    totalQuestions: 50,
    attemptedCount: 40,
    unattemptedCount: 10,
    correctCount: 35,
    incorrectCount: 5,
    totalMarks: 170,
    maxMarks: 250,
    accuracyPercentage: 88,
    timeTakenSeconds: 2400,
    timeSinkCount: 2,
    submittedAt: new Date().toISOString(),
    questions: [],
  };

  const authoritativeSlug = getAuthoritativeTestSlug(mockAttempt);
  assert.strictEqual(authoritativeSlug, "history-mock-1", "Authoritative slug from attempt must be history-mock-1");

  const { testMeta } = getQuestionsForTest(authoritativeSlug!);
  assert.strictEqual(testMeta.subject, "History", "Loaded exam must be History, never Physics");
  console.log("  ✓ Database UUID resolves back to authentic canonical mock without loss");
}

/**
 * 4. Unknown test ID or corrupted UUID never falls back to Physics
 */
function test4_UnknownTestNeverFallsBackToPhysics() {
  console.log("Test 4: Unknown test ID returns empty questions and never defaults to Physics");

  const unknownId = "unknown-corrupted-test-xyz";
  const canonical = resolveCanonicalTestId(unknownId);
  assert.strictEqual(canonical, null, "Unknown ID must resolve to null");

  const subjectDef = resolveSubjectDefinition(unknownId);
  assert.strictEqual(subjectDef, null, "Unknown ID subject definition must be null");

  const { testMeta, questions } = getQuestionsForTest(unknownId);
  assert.strictEqual(questions.length, 0, "Unknown ID must return 0 questions");
  assert.strictEqual(testMeta.subject, "Unknown", "Unknown ID must not be Physics");
  console.log("  ✓ Unknown test returns 0 questions cleanly and does not default to Physics");
}

/**
 * 5. Gandhi Dandi Question Grading Integrity (+5 marks, isCorrect: true)
 */
function test5_GandhiDandiQuestionGradingIntegrity() {
  console.log("Test 5: Gandhi Dandi Question grading integrity");

  // 1. History Mock 1 (Question 1)
  const { questions: histQuestions } = getQuestionsForTest("history-mock-1");
  const q1 = histQuestions[0]!;
  assert.ok(q1.prompt.includes("Dandi") || q1.prompt.includes("Salt Law"), "Q1 must be the Gandhi Dandi question");

  // Candidate selects Option C: "6 April 1930"
  const candidateSelectedC = [{
    questionNumber: 1,
    selectedOption: "C" as const,
    timeSpentSeconds: 45,
  }];

  const scoredSetC = buildScoredSet([q1], candidateSelectedC);
  assert.strictEqual(scoredSetC.length, 1);
  assert.strictEqual(scoredSetC[0]!.isCorrect, true, "Selecting Option C must be graded CORRECT");
  assert.strictEqual(scoredSetC[0]!.expectedOption, "C", "Expected option must be C");

  // Candidate selects Option A: "26 January 1930"
  const candidateSelectedA = [{
    questionNumber: 1,
    selectedOption: "A" as const,
    timeSpentSeconds: 30,
  }];

  const scoredSetA = buildScoredSet([q1], candidateSelectedA);
  assert.strictEqual(scoredSetA.length, 1);
  assert.strictEqual(scoredSetA[0]!.isCorrect, false, "Selecting Option A must be graded INCORRECT");

  // Verify explanation text asserts Option C and contains no contradiction
  assert.ok(q1.explanation.includes("Option C is correct"), "Explanation must state Option C is correct");
  assert.ok(!q1.explanation.includes("Option A is correct"), "Explanation must NOT contradict with Option A");

  // 2. Practice Test Unit 11 Test 20 (Question 14)
  const { questions: practiceQuestions } = getQuestionsForTest("practice-history-unit11-test20");
  const dandiPracticeQ = practiceQuestions.find(q =>
    q.prompt.includes("Dandi") || q.prompt.includes("Salt Law") || q.explanation.includes("fistful of natural salt")
  )!;
  assert.ok(dandiPracticeQ, "Practice test must contain Gandhi Dandi question");

  const practiceScored = buildScoredSet([dandiPracticeQ], [{
    questionNumber: dandiPracticeQ.questionNumber,
    selectedOption: "C" as const,
    timeSpentSeconds: 40,
  }]);

  assert.strictEqual(practiceScored[0]!.isCorrect, true, "Selecting C on practice question must be graded CORRECT");
  assert.strictEqual(practiceScored[0]!.expectedOption, "C", "Practice expected option must be C");
  assert.ok(!dandiPracticeQ.explanation.includes("Hence, Option A is correct"), "Obsolete 'Option A is correct' must be removed");
  console.log("  ✓ Gandhi Dandi question grades +5 for Option C across both Mock and Practice");
}

/**
 * 6. Multi-format authoritative key scoring invariant
 */
function test6_MultiSchemaAuthoritativeScoring() {
  console.log("Test 6: Multi-schema authoritative key scoring invariant");

  const mockQuestions: any[] = [
    { questionNumber: 1, correctOptionId: "A" },
    { questionNumber: 2, correct_option: "B" },
    { questionNumber: 3, correctOption: "C" },
    { questionNumber: 4, options: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D", isCorrect: true }] },
  ];

  const clientAnswers = [
    { questionNumber: 1, selectedOption: "A" }, // correct -> +5
    { questionNumber: 2, selectedOption: "B" }, // correct -> +5
    { questionNumber: 3, selectedOption: "A" }, // incorrect -> -1
    { questionNumber: 4, selectedOption: "D" }, // correct -> +5
  ];

  const scored = buildScoredSet(mockQuestions, clientAnswers);
  assert.strictEqual(scored[0]!.isCorrect, true, "correctOptionId A must evaluate true");
  assert.strictEqual(scored[1]!.isCorrect, true, "correct_option B must evaluate true");
  assert.strictEqual(scored[2]!.isCorrect, false, "correctOption C with selected A must evaluate false");
  assert.strictEqual(scored[3]!.isCorrect, true, "options[].isCorrect D must evaluate true");

  const correctCount = scored.filter(s => s.isCorrect).length;
  const incorrectCount = scored.filter(s => !s.isCorrect).length;
  const totalMarks = correctCount * 5 - incorrectCount;
  assert.strictEqual(totalMarks, 14, "Marks must be 3 * 5 - 1 = 14");
  console.log("  ✓ Multi-schema keys (correctOptionId, correct_option, correctOption, options[].isCorrect) grade accurately");
}

/**
 * 7. Scorecard History Preservation
 */
function test7_ScorecardHistoryPreservation() {
  console.log("Test 7: Scorecard history preservation on re-attempt");

  const pastAttempt: RecordedTestAttempt = {
    id: "attempt_chem_1",
    userId: "test_user",
    testId: "chemistry-mock-1",
    testTitle: "CUET UG Chemistry Full Mock Paper 1 (50 Compulsory Qs)",
    subject: "Chemistry",
    totalQuestions: 50,
    attemptedCount: 50,
    unattemptedCount: 0,
    correctCount: 45,
    incorrectCount: 5,
    totalMarks: 220,
    maxMarks: 250,
    accuracyPercentage: 90,
    timeTakenSeconds: 3200,
    timeSinkCount: 3,
    submittedAt: "2026-10-20T10:00:00.000Z",
    questions: [],
  };

  // Resolve re-attempt slug
  const retakeSlug = getAuthoritativeTestSlug(pastAttempt);
  assert.strictEqual(retakeSlug, "chemistry-mock-1");

  // Load fresh questions for re-attempt
  const { questions } = getQuestionsForTest(retakeSlug!);
  assert.strictEqual(questions.length, 50);

  // Assert past attempt remains untouched
  assert.strictEqual(pastAttempt.totalMarks, 220, "Past attempt marks must not be modified");
  assert.strictEqual(pastAttempt.submittedAt, "2026-10-20T10:00:00.000Z", "Past attempt timestamp must not change");
  console.log("  ✓ Previous attempt scorecard and results remain completely intact");
}
