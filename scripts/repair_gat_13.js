const fs = require("fs");

function repairGT13(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q15 (index 14): Compound interest sum triples in 4 years -> 9 times in 8 years
  qs[14] = {
    questionNumber: 15,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q15",
    chapter: "Quantitative Reasoning",
    topic: "Compound Interest",
    questionText: "If a certain sum becomes three times in 4 years at compound interest, then in how many years will it become 9 times?",
    options: [
      { id: "A", text: "2 years", isCorrect: false, explanation: "Incorrect period." },
      { id: "B", text: "10 years", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "8 years", isCorrect: true, explanation: "At compound interest, if P becomes 3P in 4 years, then it multiplies by 3 every 4 years. To become 9P = 3^2 * P, time taken is 2 * 4 = 8 years." },
      { id: "D", text: "6 years", isCorrect: false, explanation: "Incorrect calculation." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Under compound interest compounding annually, the amount after t years is A = P(1 + r/100)^t.\n2. In 4 years, A = 3P => (1 + r/100)^4 = 3.\n3. We want the sum to become 9 times, so A = 9P = 3^2 * P.\n4. (1 + r/100)^t = 3^2 = [(1 + r/100)^4]^2 = (1 + r/100)^8.\n5. Equating the exponents: t = 8 years.\n\nHence Option C (8 years) is correct.",
    solution: {
      quick: "Time = 4 * 2 = 8 years (9 = 3^2, so time is 2 * 4 years).",
      concept: "Power property of compound growth: If sum multiplies by k in T years, it becomes k^n in n*T years.",
      detailed: "3P in 4 years => 3^2 P = 9P in 2 * 4 = 8 years."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 35
  };

  // Q48 (index 47): DPT triple vaccine does not protect against Polio
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q48",
    chapter: "General Science",
    topic: "Human Health & Immunization",
    questionText: "The DPT Triple Vaccine given to young children does not help protect them against which of the following diseases?",
    options: [
      { id: "A", text: "Polio", isCorrect: true, explanation: "DPT protects against Diphtheria (D), Pertussis/whooping cough (P), and Tetanus (T). Protection against Polio is provided separately by Oral Polio Vaccine (OPV) or Inactivated Polio Vaccine (IPV)." },
      { id: "B", text: "Pertussis", isCorrect: false, explanation: "DPT protects against Pertussis (whooping cough)." },
      { id: "C", text: "Diphtheria", isCorrect: false, explanation: "DPT protects against Diphtheria." },
      { id: "D", text: "Tetanus", isCorrect: false, explanation: "DPT protects against Tetanus." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "The DPT combination vaccine is formulated to protect against three infectious bacterial diseases in children: Diphtheria, Pertussis (whooping cough), and Tetanus. It does not provide protection against Poliomyelitis (polio), which is immunized via OPV (Sabin) or IPV (Salk).\nHence Option A (Polio) is correct.",
    solution: {
      quick: "DPT protects against Diphtheria, Pertussis, and Tetanus, but NOT Polio.",
      concept: "Universal Immunization Programme: DPT = Diphtheria + Pertussis + Tetanus. Polio is immunized via OPV/IPV.",
      detailed: "Polio is caused by poliovirus and requires separate vaccination."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

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

  // Q50 (index 49): Average of 15 papers marks
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q50",
    chapter: "Quantitative Reasoning",
    topic: "Averages and Statistics",
    questionText: "The average marks of 15 papers is 45. The average marks of the first 8 papers is 48 and that of the last 8 papers is 40. The marks of the eighth paper will be:",
    options: [
      { id: "A", text: "29", isCorrect: true, explanation: "Sum of all 15 = 15 * 45 = 675. Sum of first 8 = 8 * 48 = 384. Sum of last 8 = 8 * 40 = 320. 8th paper is counted in both, so 8th paper = 384 + 320 - 675 = 704 - 675 = 29." },
      { id: "B", text: "28", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "39", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "D", text: "38", isCorrect: false, explanation: "Incorrect calculation." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. Total marks for 15 papers = 15 * 45 = 675.\n2. Total marks for the first 8 papers = 8 * 48 = 384.\n3. Total marks for the last 8 papers = 8 * 40 = 320.\n4. Notice that the 8th paper is included in both the first 8 and the last 8 papers:\n   Sum(first 8) + Sum(last 8) = Total(15) + Marks(8th paper)\n   384 + 320 = 675 + Marks(8th paper)\n   704 = 675 + Marks(8th paper)\n   Marks(8th paper) = 704 - 675 = 29.\n\nHence Option A (29) is correct.",
    solution: {
      quick: "Marks of 8th paper = (8 * 48) + (8 * 40) - (15 * 45) = 384 + 320 - 675 = 29.",
      concept: "Overlapping average principle: Sum(A) + Sum(B) - Sum(Total) = Overlapping item.",
      detailed: "704 - 675 = 29."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 40
  };

  if (Array.isArray(data)) {
    fs.writeFileSync(filePath, JSON.stringify(qs, null, 2), "utf8");
  } else {
    data.questions = qs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }
  console.log("Successfully repaired", filePath);
}

repairGT13("pyq/general-test/13.json");
if (fs.existsSync("mock/general-test/13.json")) {
  repairGT13("mock/general-test/13.json");
}
