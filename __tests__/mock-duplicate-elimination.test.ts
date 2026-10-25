/**
 * CUET Global Duplicate Question Elimination Regression Test Suite
 *
 * Verifies:
 * 1. Candidate Key regression fixture (Computer Science Mock 35 Q9 vs Q20)
 * 2. Level A: Exact duplicate detection and normalization
 * 3. Level B: Structural duplicate detection (shuffled options tolerance)
 * 4. Level C: Semantic duplicate detection and distinction from legitimate similar questions
 * 5. Full 22-subject mock audit: all 1,100 mock files have exactly 50 unique questions
 *    with 0 intra-mock duplicates!
 */

import fs from "fs";
import path from "path";
import assert from "node:assert";
import {
  normalizeQuestionText,
  normalizeOptionText,
  getExactFingerprint,
  getStructuralFingerprint,
  compareQuestions,
  extractNumbers,
  DuplicateCheckQuestion,
} from "../lib/duplicate-detection";
import { getQuestionsForTest } from "../lib/data/mock50Questions";
import { SUBJECT_MOCK_DEFINITIONS } from "../lib/data/subject-mock-definitions";

let passedCount = 0;
let failedCount = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    passedCount++;
    console.log(`  PASS: ${name}`);
  } catch (err: any) {
    failedCount++;
    console.error(`  FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

async function runAllDuplicateEliminationTests() {
  console.log("=================================================================");
  console.log("   CUET GLOBAL DUPLICATE QUESTION ELIMINATION REGRESSION SUITE   ");
  console.log("=================================================================\n");

  // --------------------------------------------------------------------------
  // TEST 1: Candidate Key Regression Evidence
  // --------------------------------------------------------------------------
  console.log("[1] Candidate Key Regression Fixture (CS Mock 35 Q9 vs Q20)");

  const q9CandidateKey: DuplicateCheckQuestion = {
    questionNumber: 9,
    questionId: "COMPUTER_SCI-M35-Q09",
    questionText: "In the Relational Database Model, a 'Candidate Key' is defined as:",
    chapter: "Database Concepts",
    topic: "Relational Model: Candidate Key vs Primary Key",
    options: [
      { id: "A", text: "Any column that allows NULL values throughout the table", isCorrect: false },
      { id: "B", text: "A minimal superkey that has the potential to uniquely identify each tuple in a relation", isCorrect: true },
      { id: "C", text: "A foreign key pointing to an external non-relational database", isCorrect: false },
      { id: "D", text: "A composite attribute containing only floating-point values", isCorrect: false },
    ],
    correctOption: "B",
  };

  const q20CandidateKeyShuffled: DuplicateCheckQuestion = {
    questionNumber: 20,
    questionId: "COMPUTER_SCI-M35-Q20",
    questionText: "In the Relational Database Model, a 'Candidate Key' is defined as:",
    chapter: "Database Concepts",
    topic: "Relational Model: Candidate Key vs Primary Key",
    options: [
      { id: "A", text: "Any column that allows NULL values throughout the table", isCorrect: false },
      { id: "B", text: "A foreign key pointing to an external non-relational database", isCorrect: false },
      { id: "C", text: "A minimal superkey that has the potential to uniquely identify each tuple in a relation", isCorrect: true },
      { id: "D", text: "A composite attribute containing only floating-point values", isCorrect: false },
    ],
    correctOption: "C",
  };

  test("Candidate Key duplicate detected as Level B Structural Duplicate despite reordered options", () => {
    const res = compareQuestions(q9CandidateKey, q20CandidateKeyShuffled);
    assert.strictEqual(res.isDuplicate, true);
    assert.strictEqual(res.level, "STRUCTURAL_B");
    assert.ok(res.confidence >= 0.99);
    assert.strictEqual(getStructuralFingerprint(q9CandidateKey), getStructuralFingerprint(q20CandidateKeyShuffled));
  });

  test("Repaired Computer Science Mock 35 now contains distinct questions at Q9 and Q20", () => {
    const cs35 = getQuestionsForTest("computer-science-mock-35");
    assert.strictEqual(cs35.questions.length, 50);

    const q9 = cs35.questions[8];
    const q20 = cs35.questions[19];

    assert.ok(q9, "Q9 must exist");
    assert.ok(q20, "Q20 must exist");

    const comp = compareQuestions(
      { questionText: q9.prompt, options: q9.options },
      { questionText: q20.prompt, options: q20.options }
    );

    assert.strictEqual(comp.isDuplicate, false);
    assert.strictEqual(comp.level, "DISTINCT");
    assert.notStrictEqual(
      getStructuralFingerprint({ questionText: q9.prompt, options: q9.options }),
      getStructuralFingerprint({ questionText: q20.prompt, options: q20.options })
    );
  });

  // --------------------------------------------------------------------------
  // TEST 2: Level A Exact Duplicate Detection & Normalization
  // --------------------------------------------------------------------------
  console.log("\n[2] Level A: Exact Duplicate Detection & Normalization");

  test("Strips artificial prefixes and normalizes whitespace", () => {
    const s1 = "  [Set 35.9]   In the Relational Database Model, a 'Candidate Key' is defined as: \n";
    const s2 = "Set 35.20: In the Relational Database Model, a 'Candidate Key' is defined as:";
    const s3 = "Question 9: In the Relational Database Model, a 'Candidate Key' is defined as:";

    assert.strictEqual(normalizeQuestionText(s1), normalizeQuestionText(s2));
    assert.strictEqual(normalizeQuestionText(s2), normalizeQuestionText(s3));
  });

  test("Normalizes HTML entities and Unicode quotes", () => {
    const stemHtml = "What is the unit of electric flux &nbsp;&amp;&nbsp; field&mdash;intensity?";
    const stemClean = "What is the unit of electric flux and field - intensity?";
    assert.strictEqual(normalizeQuestionText(stemHtml), normalizeQuestionText(stemClean));
  });

  test("Level A exact duplicate flagged with 1.0 confidence", () => {
    const qA: DuplicateCheckQuestion = {
      questionText: "What is the primary function of ribosomes in a cell?",
      options: [
        { id: "A", text: "Protein synthesis", isCorrect: true },
        { id: "B", text: "Lipid storage", isCorrect: false },
        { id: "C", text: "DNA replication", isCorrect: false },
        { id: "D", text: "ATP generation", isCorrect: false },
      ],
    };
    const qB: DuplicateCheckQuestion = {
      questionText: "  [Set 12.1] What is the primary function of ribosomes in a cell?  ",
      options: [
        { id: "A", text: "Protein synthesis", isCorrect: true },
        { id: "B", text: "Lipid storage", isCorrect: false },
        { id: "C", text: "DNA replication", isCorrect: false },
        { id: "D", text: "ATP generation", isCorrect: false },
      ],
    };

    const res = compareQuestions(qA, qB);
    assert.strictEqual(res.isDuplicate, true);
    assert.strictEqual(res.level, "EXACT_A");
    assert.strictEqual(res.confidence, 1.0);
  });

  // --------------------------------------------------------------------------
  // TEST 3: Level B Structural Duplicates
  // --------------------------------------------------------------------------
  console.log("\n[3] Level B: Structural Duplicate Detection");

  test("Detects structural duplicates with shuffled options and different question numbers", () => {
    const q1: DuplicateCheckQuestion = {
      questionNumber: 4,
      questionId: "MOCK-Q04",
      questionText: "Which SQL clause is used to filter group results after aggregation?",
      options: [
        { id: "A", text: "HAVING", isCorrect: true },
        { id: "B", text: "WHERE", isCorrect: false },
        { id: "C", text: "ORDER BY", isCorrect: false },
        { id: "D", text: "GROUP BY", isCorrect: false },
      ],
    };
    const q2: DuplicateCheckQuestion = {
      questionNumber: 15,
      questionId: "MOCK-Q15",
      questionText: "Which SQL clause is used to filter group results after aggregation?",
      options: [
        { id: "A", text: "WHERE", isCorrect: false },
        { id: "B", text: "ORDER BY", isCorrect: false },
        { id: "C", text: "GROUP BY", isCorrect: false },
        { id: "D", text: "HAVING", isCorrect: true },
      ],
    };

    const res = compareQuestions(q1, q2);
    assert.strictEqual(res.isDuplicate, true);
    assert.strictEqual(res.level, "STRUCTURAL_B");
  });

  // --------------------------------------------------------------------------
  // TEST 4: Level C Semantic Duplicates vs Legitimate Similar Questions
  // --------------------------------------------------------------------------
  console.log("\n[4] Level C: Semantic Duplicates vs Legitimate Similar Questions");

  test("Flags high-confidence semantic duplicates when stems are closely paraphrased", () => {
    const q1: DuplicateCheckQuestion = {
      questionText: "In Python, which function is used to calculate the length of a list?",
      options: [
        { id: "A", text: "len()", isCorrect: true },
        { id: "B", text: "count()", isCorrect: false },
        { id: "C", text: "size()", isCorrect: false },
        { id: "D", text: "length()", isCorrect: false },
      ],
    };
    const q2: DuplicateCheckQuestion = {
      questionText: "In Python programming, what function is used to compute the length of a given list?",
      options: [
        { id: "A", text: "len()", isCorrect: true },
        { id: "B", text: "count()", isCorrect: false },
        { id: "C", text: "size()", isCorrect: false },
        { id: "D", text: "length()", isCorrect: false },
      ],
    };

    const res = compareQuestions(q1, q2);
    assert.strictEqual(res.isDuplicate, true);
    assert.strictEqual(res.level, "SEMANTIC_C");
    assert.ok(res.confidence >= 0.88);
  });

  test("Distinguishes legitimate similar questions covering different cognitive aspects", () => {
    const qDef: DuplicateCheckQuestion = {
      questionText: "In the Relational Database Model, a 'Candidate Key' is defined as:",
      options: [
        { id: "A", text: "A minimal superkey uniquely identifying tuples", isCorrect: true },
        { id: "B", text: "A foreign key pointing to external tables", isCorrect: false },
      ],
    };
    const qDiff: DuplicateCheckQuestion = {
      questionText: "How does a Candidate Key differ from a Primary Key in relational databases?",
      options: [
        { id: "A", text: "Any candidate key not chosen as primary key becomes an alternate key", isCorrect: true },
        { id: "B", text: "Primary keys allow NULL values while candidate keys do not", isCorrect: false },
      ],
    };

    const res = compareQuestions(qDef, qDiff);
    assert.strictEqual(res.isDuplicate, false);
    assert.strictEqual(res.level, "DISTINCT");
  });

  test("Distinguishes parameterized numerical problems with distinct numbers", () => {
    const qNum1: DuplicateCheckQuestion = {
      questionText: "A point charge of 10 μC is placed at the center of a cubic Gaussian surface of edge 9.0 cm. What is the net electric flux through the surface?",
      options: [
        { id: "A", text: "1.13 x 10^6 N m^2/C", isCorrect: true },
        { id: "B", text: "2.26 x 10^6 N m^2/C", isCorrect: false },
      ],
    };
    const qNum2: DuplicateCheckQuestion = {
      questionText: "A point charge of 25 μC is placed at the center of a cubic Gaussian surface of edge 9.0 cm. What is the net electric flux through the surface?",
      options: [
        { id: "A", text: "2.82 x 10^6 N m^2/C", isCorrect: true },
        { id: "B", text: "1.13 x 10^6 N m^2/C", isCorrect: false },
      ],
    };

    assert.deepStrictEqual(extractNumbers(qNum1.questionText!), ["10", "9.0"]);
    assert.deepStrictEqual(extractNumbers(qNum2.questionText!), ["25", "9.0"]);

    const res = compareQuestions(qNum1, qNum2);
    assert.strictEqual(res.isDuplicate, false);
    assert.strictEqual(res.level, "DISTINCT");
  });

  // --------------------------------------------------------------------------
  // TEST 5: Global Mock Dataset Audit (1,100 Mocks, 55,000 Questions)
  // --------------------------------------------------------------------------
  console.log("\n[5] Global Verification: All 22 Subjects & 1,100 Mock Papers");

  test("Audits all 1,100 mocks: exactly 50 questions each and 0 intra-mock duplicates", () => {
    const subjects = SUBJECT_MOCK_DEFINITIONS;
    assert.strictEqual(subjects.length, 22);

    let totalMocks = 0;
    let totalQuestions = 0;
    let intraMockDuplicatesFound = 0;

    for (const sub of subjects) {
      for (let m = 1; m <= 50; m++) {
        const filePath = path.join(process.cwd(), "mock", sub.folder, `${m}.json`);
        assert.ok(fs.existsSync(filePath), `Mock file missing: ${filePath}`);

        const questions = JSON.parse(fs.readFileSync(filePath, "utf8"));
        assert.ok(Array.isArray(questions), `Mock content not an array: ${filePath}`);
        assert.strictEqual(questions.length, 50, `Mock ${m} for ${sub.id} must have exactly 50 questions`);

        totalMocks++;
        totalQuestions += questions.length;

        const seenFingerprints = new Set<string>();
        for (let idx = 0; idx < questions.length; idx++) {
          const q = questions[idx];

          // 4 options and valid correctOption
          assert.strictEqual(q.questionNumber, idx + 1, `q.questionNumber mismatch in ${sub.id} M${m} Q${idx + 1}`);
          assert.strictEqual(q.options.length, 4, `Options != 4 in ${sub.id} M${m} Q${idx + 1}`);
          assert.ok(["A", "B", "C", "D"].includes(q.correctOption), `Invalid correctOption in ${sub.id} M${m} Q${idx + 1}`);

          const correctOptions = q.options.filter((o: any) => o.isCorrect);
          assert.strictEqual(correctOptions.length, 1, `Option with isCorrect != 1 in ${sub.id} M${m} Q${idx + 1}`);
          assert.strictEqual(correctOptions[0].id, q.correctOption, `correctOption mismatch in ${sub.id} M${m} Q${idx + 1}`);

          // Assert zero intra-mock duplicates
          const sfp = getStructuralFingerprint(q);
          if (seenFingerprints.has(sfp)) {
            intraMockDuplicatesFound++;
          }
          seenFingerprints.add(sfp);
        }
      }
    }

    assert.strictEqual(totalMocks, 1100, "Must audit all 1,100 mocks");
    assert.strictEqual(totalQuestions, 55000, "Must audit all 55,000 questions");
    assert.strictEqual(intraMockDuplicatesFound, 0, "Remaining intra-mock duplicates must be 0");
  });

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------
  console.log("\n=================================================================");
  console.log(`TOTAL TESTS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log("=================================================================");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runAllDuplicateEliminationTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
