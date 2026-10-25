const fs = require("fs");

function repairGT13(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q49 (index 48): Equation of line with equal intercepts passing through (2, 5)
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q49",
    chapter: "Quantitative Reasoning",
    topic: "Coordinate Geometry - Straight Lines",
    questionText: "The equation of the straight line which makes equal non-zero intercepts on the coordinate axes and passes through the point (2, 5) shall be:",
    options: [
      { id: "A", text: "2X + 2Y = 7", isCorrect: false, explanation: "Does not pass through (2, 5)." },
      { id: "B", text: "2X + Y = 7", isCorrect: false, explanation: "Does not make equal intercepts." },
      { id: "C", text: "X + 2Y = 7", isCorrect: false, explanation: "Does not make equal intercepts." },
      { id: "D", text: "X + Y = 7", isCorrect: true, explanation: "Intercept form: x/a + y/a = 1 => x + y = a. Substituting point (2, 5): 2 + 5 = 7 => a = 7. Thus the equation is X + Y = 7." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. The intercept form of the equation of a line is x/a + y/b = 1, where a and b are x-intercept and y-intercept.\n2. Since the intercepts are equal, a = b:\n   x/a + y/a = 1 => x + y = a.\n3. The line passes through the point (2, 5), so:\n   2 + 5 = a => a = 7.\n4. Substituting a = 7 gives the equation:\n   X + Y = 7.\n\nHence Option D (X + Y = 7) is correct.",
    solution: {
      quick: "Equal intercepts means slope = -1 => X + Y = 2 + 5 = 7.",
      concept: "Intercept form of a line: x/a + y/b = 1. Equal intercepts => x + y = a.",
      detailed: "x + y = 2 + 5 = 7."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q50 (index 49): Chronological order of national movement events
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q50",
    chapter: "General Awareness",
    topic: "Modern Indian History - Freedom Struggle",
    questionText: "Put the following historical events in chronological order, starting with the earliest to the most recent:\n(A) Dandi March\n(B) Swadeshi Movement\n(C) Chauri Chaura incident\n(D) Home Rule Movement\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (C), (D), (B)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "B", text: "(B), (D), (C), (A)", isCorrect: true, explanation: "Swadeshi Movement (1905) -> Home Rule Movement (1916) -> Chauri Chaura incident (1922) -> Dandi March (1930)." },
      { id: "C", text: "(B), (A), (D), (C)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "D", text: "(C), (D), (B), (A)", isCorrect: false, explanation: "Incorrect chronology." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "Chronology of Indian Freedom Movement events:\n1. Swadeshi Movement (B): Launched in 1905 following the partition of Bengal.\n2. Home Rule Movement (D): Founded in 1916 by Bal Gangadhar Tilak and Annie Besant.\n3. Chauri Chaura Incident (C): Took place on 4 February 1922 in Gorakhpur district, leading Mahatma Gandhi to withdraw the Non-Cooperation Movement.\n4. Dandi March (A): Undertaken by Mahatma Gandhi from Sabarmati Ashram to Dandi between 12 March and 6 April 1930, inaugurating the Civil Disobedience Movement.\nSequence: (B), (D), (C), (A).\nHence Option B is correct.",
    solution: {
      quick: "Chronology: (B), (D), (C), (A).",
      concept: "Major modern Indian history milestones: Swadeshi (1905) -> Home Rule (1916) -> Chauri Chaura (1922) -> Dandi March (1930).",
      detailed: "Swadeshi (1905) -> Home Rule (1916) -> Chauri Chaura (1922) -> Dandi March (1930)."
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
  console.log("Successfully finalized GT 13 for:", filePath);
}

repairGT13("pyq/general-test/13.json");
if (fs.existsSync("mock/general-test/13.json")) {
  repairGT13("mock/general-test/13.json");
}
