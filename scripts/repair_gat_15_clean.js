const fs = require("fs");

function repairGT15Clean(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q39 (index 38): Dynasty chronology from Page 14 Q.39
  qs[38] = {
    questionNumber: 39,
    questionId: "CUET-UG-GAT-2025-S1-P15-Q39",
    chapter: "General Awareness",
    topic: "Medieval Indian History - Delhi Sultanate & Mughals",
    questionText: "Arrange the following dynasties in order of their occurrence in medieval India, beginning with the earliest to the most recent:\n(A) The Mughal Dynasty\n(B) The Tughlak Dynasty\n(C) The Khilji Dynasty\n(D) The Lodhi Dynasty\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B), (C), (D)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "B", text: "(A), (C), (B), (D)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "C", text: "(B), (A), (D), (C)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "D", text: "(C), (B), (D), (A)", isCorrect: true, explanation: "Khilji Dynasty (1290–1320) -> Tughlak Dynasty (1320–1414) -> Lodhi Dynasty (1451–1526) -> Mughal Empire (established 1526 by Babur after First Battle of Panipat)." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "Chronological sequence of medieval Indian dynasties:\n1. (C) Khilji Dynasty: Ruled the Delhi Sultanate from 1290 to 1320 CE (founded by Jalaluddin Khilji; famous ruler Alauddin Khilji).\n2. (B) Tughlak Dynasty: Ruled from 1320 to 1414 CE (founded by Ghiyasuddin Tughlaq; Muhammad bin Tughlaq).\n3. (D) Lodhi Dynasty: Ruled from 1451 to 1526 CE (founded by Bahlul Lodhi; Ibrahim Lodhi was the last Sultan).\n4. (A) Mughal Dynasty: Founded in 1526 CE by Babur after defeating Ibrahim Lodhi in the First Battle of Panipat.\nSequence: (C), (B), (D), (A).\nHence Option D is correct.",
    solution: {
      quick: "Chronological sequence: (C), (B), (D), (A).",
      concept: "Succession of Delhi Sultanate dynasties: Slave -> Khilji -> Tughlak -> Sayyid -> Lodhi -> Mughal.",
      detailed: "Khilji (1290) -> Tughlak (1320) -> Lodhi (1451) -> Mughal (1526)."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 35
  };

  // Q40 (index 39): Clarify stem of series B2D, C3F, E4I, H5M, ?, Q7X
  qs[39].questionText = "Find the missing term that completes the alphanumeric series:\nB2D, C3F, E4I, H5M, ?, Q7X";

  if (Array.isArray(data)) {
    fs.writeFileSync(filePath, JSON.stringify(qs, null, 2), "utf8");
  } else {
    data.questions = qs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }
  console.log("Successfully cleaned duplicates in:", filePath);
}

repairGT15Clean("pyq/general-test/15.json");
if (fs.existsSync("mock/general-test/15.json")) {
  repairGT15Clean("mock/general-test/15.json");
}
