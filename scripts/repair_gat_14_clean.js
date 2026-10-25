const fs = require("fs");

function repairGT14Clean(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q16 (index 15): Two numbers in ratio 3:5, 9 subtracted -> greater number
  qs[15] = {
    questionNumber: 16,
    questionId: "CUET-UG-GAT-2025-S1-P14-Q16",
    chapter: "Quantitative Reasoning",
    topic: "Ratio and Proportion",
    questionText: "Two numbers are in the ratio of 3 : 5. If 9 is subtracted from each number, the ratio becomes 12 : 23. Find the greater number.",
    options: [
      { id: "A", text: "55", isCorrect: true, explanation: "Let numbers be 3x and 5x. (3x - 9) / (5x - 9) = 12 / 23 => 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Greater number = 5 * 11 = 55." },
      { id: "B", text: "65", isCorrect: false, explanation: "Incorrect value." },
      { id: "C", text: "57", isCorrect: false, explanation: "Incorrect value." },
      { id: "D", text: "63", isCorrect: false, explanation: "Incorrect value." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. Let the two numbers be 3x and 5x.\n2. When 9 is subtracted from both numbers:\n   (3x - 9) / (5x - 9) = 12 / 23.\n3. Cross-multiply:\n   23 * (3x - 9) = 12 * (5x - 9)\n   69x - 207 = 60x - 108\n   69x - 60x = 207 - 108\n   9x = 99\n   x = 11.\n4. The two numbers are:\n   Smaller number = 3 * 11 = 33\n   Greater number = 5 * 11 = 55.\n\nHence Option A (55) is correct.",
    solution: {
      quick: "Greater number = 5 * 11 = 55.",
      concept: "Linear equations formed by cross-multiplying ratio fractions.",
      detailed: "(3x - 9)/(5x - 9) = 12/23 => 9x = 99 => x = 11 => 5x = 55."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 40
  };

  // Q24 (index 23): Alphanumeric series 45G54, 47J57, 50N61, 54S66, ?
  qs[23] = {
    questionNumber: 24,
    questionId: "CUET-UG-GAT-2025-S1-P14-Q24",
    chapter: "General Mental Ability",
    topic: "Alphanumeric Series",
    questionText: "What should come next in the series given below?\n45G54, 47J57, 50N61, 54S66, ?",
    options: [
      { id: "A", text: "59D45", isCorrect: false, explanation: "Incorrect sequence." },
      { id: "B", text: "74Y72", isCorrect: false, explanation: "Incorrect first number." },
      { id: "C", text: "59Y72", isCorrect: true, explanation: "First number: 45 +2 -> 47 +3 -> 50 +4 -> 54 +5 -> 59. Middle letter: G(7) +3 -> J(10) +4 -> N(14) +5 -> S(19) +6 -> Y(25). Last number: 54 +3 -> 57 +4 -> 61 +5 -> 66 +6 -> 72. Next term is 59Y72." },
      { id: "D", text: "74D45", isCorrect: false, explanation: "Incorrect sequence." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. First number progression: 45 (+2) -> 47 (+3) -> 50 (+4) -> 54 (+5) -> 59.\n2. Middle letter progression: G(7) (+3) -> J(10) (+4) -> N(14) (+5) -> S(19) (+6) -> Y(25).\n3. Last number progression: 54 (+3) -> 57 (+4) -> 61 (+5) -> 66 (+6) -> 72.\n4. Combining the three patterns gives: 59Y72.\n\nHence Option C (59Y72) is correct.",
    solution: {
      quick: "Next term is 59Y72.",
      concept: "Multi-element sequence reasoning: evaluate numerical and alphabetical differences independently.",
      detailed: "First number adds +2, +3, +4, +5 => 59; letter adds +3, +4, +5, +6 => Y; last number adds +3, +4, +5, +6 => 72."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  if (Array.isArray(data)) {
    fs.writeFileSync(filePath, JSON.stringify(qs, null, 2), "utf8");
  } else {
    data.questions = qs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }
  console.log("Successfully cleaned duplicates in:", filePath);
}

repairGT14Clean("pyq/general-test/14.json");
if (fs.existsSync("mock/general-test/14.json")) {
  repairGT14Clean("mock/general-test/14.json");
}
