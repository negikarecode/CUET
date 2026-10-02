import {
  normalizeDifficulty,
  normalizeChapter,
  buildPostMockDeterministicReport,
} from "../lib/post-mock-engine";
import { buildDeterministicPostMockAIInsight } from "../lib/post-mock-ai-engine";
import { RecordedTestAttempt, RecordedQuestionAttempt } from "../types";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`FAIL: ${msg}`);
  }
}

console.log("=== Running Post-Mock Analysis Engine Unit Tests ===");

// 1. Difficulty Normalization Tests
assert(normalizeDifficulty("easy") === "easy", "Easy lowercase");
assert(normalizeDifficulty("1") === "easy", "1 is easy");
assert(normalizeDifficulty(2) === "easy", "2 is easy");
assert(normalizeDifficulty("medium") === "medium", "Medium string");
assert(normalizeDifficulty(3) === "medium", "3 is medium");
assert(normalizeDifficulty("hard") === "hard", "Hard string");
assert(normalizeDifficulty(4) === "hard", "4 is hard");
assert(normalizeDifficulty(5) === "hard", "5 is hard");
assert(normalizeDifficulty(undefined) === "unknown", "Undefined difficulty maps to unknown");
assert(normalizeDifficulty(null) === "unknown", "Null difficulty maps to unknown");
assert(normalizeDifficulty("") === "unknown", "Empty difficulty maps to unknown");
assert(normalizeDifficulty("insane") === "unknown", "Unrecognized difficulty maps to unknown");
console.log("✓ Difficulty normalization tests passed.");

// 2. Chapter Normalization Tests
assert(normalizeChapter("Electrochemistry") === "Electrochemistry", "Valid chapter preserved");
assert(normalizeChapter("   Solutions   ") === "Solutions", "Trimmed chapter name");
assert(normalizeChapter(undefined) === "Unknown / Not Available", "Undefined chapter classified as Unknown");
assert(normalizeChapter(null) === "Unknown / Not Available", "Null chapter classified as Unknown");
assert(normalizeChapter("") === "Unknown / Not Available", "Empty chapter classified as Unknown");
assert(normalizeChapter("Domain Core") === "Unknown / Not Available", "Generic 'Domain Core' classified as Unknown");
console.log("✓ Chapter normalization tests passed.");

// 3. Mock Attempt Data with All Edge Cases
// 10 questions:
// - 4 Electrochemistry: 2 Easy (both correct), 1 Medium (correct), 1 Hard (incorrect)
// - 3 Solutions: 1 Easy (correct), 1 Medium (incorrect), 1 Hard (skipped)
// - 3 with Missing Metadata: 1 missing difficulty, 1 missing chapter, 1 skipped missing both
const mockQuestions: RecordedQuestionAttempt[] = [
  // Electrochemistry
  {
    questionId: "q1",
    questionNumber: 1,
    subject: "Chemistry",
    chapter: "Electrochemistry",
    microTopic: "Nernst Equation",
    prompt: "What is the cell potential?",
    selectedOption: "A",
    correctOption: "A",
    isCorrect: true,
    timeSpentSeconds: 45,
    isTimeSink: false,
    difficulty: "easy",
  },
  {
    questionId: "q2",
    questionNumber: 2,
    subject: "Chemistry",
    chapter: "Electrochemistry",
    microTopic: "Faraday Law",
    prompt: "Mass deposited is proportional to?",
    selectedOption: "B",
    correctOption: "B",
    isCorrect: true,
    timeSpentSeconds: 50,
    isTimeSink: false,
    difficulty: "easy",
  },
  {
    questionId: "q3",
    questionNumber: 3,
    subject: "Chemistry",
    chapter: "Electrochemistry",
    microTopic: "Conductance",
    prompt: "Molar conductivity at infinite dilution?",
    selectedOption: "C",
    correctOption: "C",
    isCorrect: true,
    timeSpentSeconds: 65,
    isTimeSink: false,
    difficulty: "medium",
  },
  {
    questionId: "q4",
    questionNumber: 4,
    subject: "Chemistry",
    chapter: "Electrochemistry",
    microTopic: "Kohlrausch Law",
    prompt: "Calculate limiting molar conductivity for weak electrolyte.",
    selectedOption: "D",
    correctOption: "B",
    isCorrect: false,
    timeSpentSeconds: 85,
    isTimeSink: true,
    difficulty: "hard",
  },

  // Solutions
  {
    questionId: "q5",
    questionNumber: 5,
    subject: "Chemistry",
    chapter: "Solutions",
    microTopic: "Henry Law",
    prompt: "Gas solubility in liquid varies with?",
    selectedOption: "A",
    correctOption: "A",
    isCorrect: true,
    timeSpentSeconds: 30,
    isTimeSink: false,
    difficulty: "easy",
  },
  {
    questionId: "q6",
    questionNumber: 6,
    subject: "Chemistry",
    chapter: "Solutions",
    microTopic: "Raoult Law",
    prompt: "Vapor pressure of ideal solution?",
    selectedOption: "A",
    correctOption: "C",
    isCorrect: false,
    timeSpentSeconds: 90,
    isTimeSink: true,
    difficulty: "medium",
  },
  {
    questionId: "q7",
    questionNumber: 7,
    subject: "Chemistry",
    chapter: "Solutions",
    microTopic: "Osmotic Pressure",
    prompt: "Which solution is isotonic?",
    selectedOption: null, // Skipped
    correctOption: "D",
    isCorrect: null,
    timeSpentSeconds: 15,
    isTimeSink: false,
    difficulty: "hard",
  },

  // Missing Metadata Edge Cases
  {
    questionId: "q8",
    questionNumber: 8,
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    microTopic: "Rate Law",
    prompt: "Unit of second order rate constant?",
    selectedOption: "B",
    correctOption: "B",
    isCorrect: true,
    timeSpentSeconds: 40,
    isTimeSink: false,
    difficulty: undefined, // Missing difficulty -> Unknown
  },
  {
    questionId: "q9",
    questionNumber: 9,
    subject: "Chemistry",
    chapter: undefined as any, // Missing chapter edge-case -> Unknown / Not Available
    microTopic: "General",
    prompt: "Catalyst increases rate by lowering?",
    selectedOption: "C",
    correctOption: "A",
    isCorrect: false,
    timeSpentSeconds: 35,
    isTimeSink: false,
    difficulty: "easy",
  },
  {
    questionId: "q10",
    questionNumber: 10,
    subject: "Chemistry",
    chapter: "", // Empty chapter -> Unknown / Not Available
    microTopic: "Unknown",
    prompt: "Activation energy calculation.",
    selectedOption: null, // Skipped
    correctOption: "D",
    isCorrect: null,
    timeSpentSeconds: 10,
    isTimeSink: false,
    difficulty: undefined, // Unknown
  },
];

const mockAttempt: RecordedTestAttempt = {
  id: "attempt_chem_test_01",
  userId: "user_test_alpha",
  testId: "chem_mock_01",
  testTitle: "CUET UG Chemistry Full Mock 1",
  subject: "Chemistry",
  totalQuestions: 10,
  attemptedCount: 8,
  unattemptedCount: 2,
  correctCount: 5,
  incorrectCount: 3,
  totalMarks: 5 * 5 - 3, // 22
  maxMarks: 50,
  accuracyPercentage: 63,
  timeTakenSeconds: 465,
  timeSinkCount: 2,
  submittedAt: new Date().toISOString(),
  questions: mockQuestions,
};

// 4. Test Report Generation
const report = buildPostMockDeterministicReport(mockAttempt);

// Validate Overall Stats
assert(report.overall.totalQuestions === 10, "Total questions should be 10");
assert(report.overall.attemptedCount === 8, "Attempted count should be 8");
assert(report.overall.correctCount === 5, "Correct count should be 5");
assert(report.overall.incorrectCount === 3, "Incorrect count should be 3");
assert(report.overall.skippedCount === 2, "Skipped count should be 2");
assert(report.overall.accuracyPercentage === 63, "Accuracy should be 5/8 = 63%");
assert(report.overall.totalMarks === 22, "Total marks should be 5*5 - 3 = 22");
assert(report.overall.maxMarks === 50, "Max marks should be 10*5 = 50");
assert(report.overall.timeSinkCount === 2, "Time sinks count should be 2");
console.log("✓ Overall deterministic metrics match exactly.");

// Validate Difficulty Breakdown
const easyDiff = report.difficultyBreakdown.find((d) => d.difficulty === "easy");
assert(!!easyDiff, "Easy difficulty tier present");
assert(easyDiff?.totalQuestions === 4, "Easy total is 4 (q1, q2, q5, q9)");
assert(easyDiff?.attempted === 4, "Easy attempted is 4");
assert(easyDiff?.correct === 3, "Easy correct is 3");
assert(easyDiff?.incorrect === 1, "Easy incorrect is 1");
assert(easyDiff?.accuracy === 75, "Easy accuracy is 3/4 = 75%");

const hardDiff = report.difficultyBreakdown.find((d) => d.difficulty === "hard");
assert(!!hardDiff, "Hard difficulty tier present");
assert(hardDiff?.totalQuestions === 2, "Hard total is 2 (q4, q7)");
assert(hardDiff?.attempted === 1, "Hard attempted is 1 (q4)");
assert(hardDiff?.correct === 0, "Hard correct is 0");
assert(hardDiff?.incorrect === 1, "Hard incorrect is 1");
assert(hardDiff?.skipped === 1, "Hard skipped is 1 (q7)");
assert(hardDiff?.accuracy === 0, "Hard accuracy is 0%");

const unknownDiff = report.difficultyBreakdown.find((d) => d.difficulty === "unknown");
assert(!!unknownDiff, "Unknown difficulty tier present for missing metadata questions");
assert(unknownDiff?.totalQuestions === 2, "Unknown total is 2 (q8, q10)");
console.log("✓ Difficulty breakdown assertions passed.");

// Validate Chapter Breakdown
const electrochem = report.chapterBreakdown.find((c) => c.chapter === "Electrochemistry");
assert(!!electrochem, "Electrochemistry chapter present");
assert(electrochem?.totalQuestions === 4, "Electrochemistry has 4 questions");
assert(electrochem?.correct === 3, "Electrochemistry has 3 correct");
assert(electrochem?.incorrect === 1, "Electrochemistry has 1 incorrect");
assert(electrochem?.accuracy === 75, "Electrochemistry accuracy is 75%");

const unknownChap = report.chapterBreakdown.find((c) => c.chapter === "Unknown / Not Available");
assert(!!unknownChap, "Unknown chapter present for missing metadata questions");
assert(unknownChap?.totalQuestions === 2, "Unknown chapter has 2 questions (q9, q10)");
console.log("✓ Chapter breakdown assertions passed.");

// Validate Chapter × Difficulty Matrix
const matrix = report.chapterDifficultyMatrix;
assert(matrix["Electrochemistry"]?.["easy"]?.accuracy === 100, "Electrochemistry Easy accuracy is 2/2 = 100%");
assert(matrix["Electrochemistry"]?.["medium"]?.accuracy === 100, "Electrochemistry Medium accuracy is 1/1 = 100%");
assert(matrix["Electrochemistry"]?.["hard"]?.accuracy === 0, "Electrochemistry Hard accuracy is 0/1 = 0%");
assert(matrix["Solutions"]?.["hard"]?.accuracy === null, "Solutions Hard question was skipped, accuracy must be null ('-'), NOT 0%");
console.log("✓ Chapter × Difficulty matrix assertions (including null accuracy on skipped) passed.");

// 5. Test Deterministic Fallback AI Insight
const aiInsight = buildDeterministicPostMockAIInsight(report);
assert(aiInsight.status === "available", "AI insight status is available");
assert(aiInsight.summary.includes("63%"), "AI summary includes verified accuracy");
assert(aiInsight.summary.includes("22/50"), "AI summary includes verified score");
assert(aiInsight.notablePatterns.length > 0, "Notable patterns generated");
assert(aiInsight.recommendedNextSteps.length > 0, "Recommended next steps generated");
console.log("✓ AI observational interpretation tests passed.");

console.log("\nALL POST-MOCK ANALYSIS TESTS PASSED SUCCESSFULLY! (100% Deterministic & Isolated)");
