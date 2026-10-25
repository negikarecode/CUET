const fs = require("fs");

function repairGT23(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q9 (index 8): Distance between (2, -2) and (5, k) is 5
  qs[8] = {
    questionNumber: 9,
    questionId: "CUET-UG-GAT-2025-S1-P23-Q09",
    chapter: "Quantitative Reasoning",
    topic: "Coordinate Geometry - Distance Formula",
    questionText: "If the distance between the points (2, -2) and (5, k) is 5 units, then one of the possible values of k shall be which of the following?",
    options: [
      { id: "A", text: "6", isCorrect: false, explanation: "Incorrect value." },
      { id: "B", text: "4", isCorrect: false, explanation: "Incorrect value." },
      { id: "C", text: "2", isCorrect: true, explanation: "Distance formula: d = sqrt((x2 - x1)^2 + (y2 - y1)^2) => 5 = sqrt((5 - 2)^2 + (k - (-2))^2) => 25 = 3^2 + (k + 2)^2 => 25 = 9 + (k + 2)^2 => (k + 2)^2 = 16 => k + 2 = ±4 => k = 2 or k = -6." },
      { id: "D", text: "1", isCorrect: false, explanation: "Incorrect value." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. The distance between points P(x1, y1) and Q(x2, y2) is given by:\n   PQ = sqrt((x2 - x1)^2 + (y2 - y1)^2).\n2. Given P(2, -2), Q(5, k), and PQ = 5:\n   5 = sqrt((5 - 2)^2 + (k - (-2))^2)\n   5 = sqrt(3^2 + (k + 2)^2)\n   25 = 9 + (k + 2)^2\n   (k + 2)^2 = 16\n   k + 2 = ±4.\n3. Solving for k:\n   Case 1: k + 2 = 4  =>  k = 2.\n   Case 2: k + 2 = -4 =>  k = -6.\n4. Among the given choices, k = 2 is present.\n\nHence Option C (2) is correct.",
    solution: {
      quick: "Possible value of k is 2.",
      concept: "Distance formula in Cartesian plane: d^2 = (x2 - x1)^2 + (y2 - y1)^2.",
      detailed: "(5 - 2)^2 + (k + 2)^2 = 25 => 9 + (k + 2)^2 = 25 => k + 2 = 4 => k = 2."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 35
  };

  // Q14 (index 13): Sum of perfect squares between 150 and 250
  qs[13] = {
    questionNumber: 14,
    questionId: "CUET-UG-GAT-2025-S1-P23-Q14",
    chapter: "Quantitative Reasoning",
    topic: "Number Properties - Perfect Squares",
    questionText: "The sum of the perfect squares between 150 and 250 is:",
    options: [
      { id: "A", text: "580", isCorrect: false, explanation: "Incorrect sum." },
      { id: "B", text: "600", isCorrect: false, explanation: "Incorrect sum." },
      { id: "C", text: "570", isCorrect: false, explanation: "Incorrect sum." },
      { id: "D", text: "590", isCorrect: true, explanation: "The perfect squares between 150 and 250 are 13^2 = 169, 14^2 = 196, and 15^2 = 225. Their sum = 169 + 196 + 225 = 590." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. Identify the integers whose squares fall strictly between 150 and 250:\n   12^2 = 144 (< 150)\n   13^2 = 169\n   14^2 = 196\n   15^2 = 225\n   16^2 = 256 (> 250)\n2. The perfect squares strictly between 150 and 250 are 169, 196, and 225.\n3. Compute their sum:\n   Sum = 169 + 196 + 225 = 590.\n\nHence Option D (590) is correct.",
    solution: {
      quick: "Sum = 169 + 196 + 225 = 590.",
      concept: "Integer square bounds: 13^2 = 169, 14^2 = 196, 15^2 = 225 fall between 150 and 250.",
      detailed: "169 + 196 + 225 = 590."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q17 (index 16): Linear equation word problem (pens and pencils)
  qs[16] = {
    questionNumber: 17,
    questionId: "CUET-UG-GAT-2025-S1-P23-Q17",
    chapter: "Quantitative Reasoning",
    topic: "Linear Equations in Two Variables",
    questionText: "Rita purchased 9 pens and 7 pencils for ₹66. Megha also bought 5 pens and 11 pencils of the same kind for ₹58. What is the cost of 3 pencils?",
    options: [
      { id: "A", text: "₹9", isCorrect: true, explanation: "Let cost of 1 pen = p and 1 pencil = c. 9p + 7c = 66 and 5p + 11c = 58. Multiplying equations: 45p + 35c = 330 and 45p + 99c = 522. Subtracting gives 64c = 192 => c = 3. Cost of 3 pencils = 3 * 3 = ₹9." },
      { id: "B", text: "₹15", isCorrect: false, explanation: "Incorrect cost." },
      { id: "C", text: "₹6", isCorrect: false, explanation: "₹6 is the cost of 2 pencils." },
      { id: "D", text: "₹12", isCorrect: false, explanation: "₹12 is the cost of 4 pencils." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. Let the cost of one pen be p and the cost of one pencil be c.\n2. Formulate equations from the given statements:\n   Equation (1): 9p + 7c = 66\n   Equation (2): 5p + 11c = 58\n3. Multiply Equation (1) by 5 and Equation (2) by 9 to eliminate p:\n   45p + 35c = 330\n   45p + 99c = 522\n4. Subtract the first from the second:\n   64c = 192  =>  c = 192 / 64 = 3.\n5. Therefore, the cost of one pencil is ₹3.\n   Cost of 3 pencils = 3 * 3 = ₹9.\n\nHence Option A (₹9) is correct.",
    solution: {
      quick: "Cost of 3 pencils = 3 * ₹3 = ₹9.",
      concept: "Elimination method for simultaneous linear equations in two variables.",
      detailed: "9p + 7c = 66 and 5p + 11c = 58 => 64c = 192 => c = 3 => 3c = 9."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 40
  };

  // Q23 (index 22): Number classification odd one out
  qs[22] = {
    questionNumber: 23,
    questionId: "CUET-UG-GAT-2025-S1-P23-Q23",
    chapter: "General Mental Ability",
    topic: "Number Classification (Odd One Out)",
    questionText: "Find the odd one out from the following four-digit numbers:\n1. 3085\n2. 9900\n3. 5116\n4. 8179",
    options: [
      { id: "A", text: "3085", isCorrect: false, explanation: "In 3085, the middle two digits (08 = 8) equal the sum of the first and last digits (3 + 5 = 8)." },
      { id: "B", text: "9900", isCorrect: true, explanation: "In all other numbers, the middle two digits equal the sum of the first and last digits: 3 + 5 = 08 (in 3085), 5 + 6 = 11 (in 5116), 8 + 9 = 17 (in 8179). In 9900, 9 + 0 = 9 != 90." },
      { id: "C", text: "5116", isCorrect: false, explanation: "5 + 6 = 11." },
      { id: "D", text: "8179", isCorrect: false, explanation: "8 + 9 = 17." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. Examine the internal digit relationships of each number:\n   - In 3085: First digit = 3, Last digit = 5. Sum = 3 + 5 = 8, which forms the middle digits '08'.\n   - In 5116: First digit = 5, Last digit = 6. Sum = 5 + 6 = 11, which forms the middle digits '11'.\n   - In 8179: First digit = 8, Last digit = 9. Sum = 8 + 9 = 17, which forms the middle digits '17'.\n   - In 9900: First digit = 9, Last digit = 0. Sum = 9 + 0 = 9, but the middle digits are '90' (not 09).\n2. Therefore, 9900 does not follow the rule satisfied by the other three numbers.\n\nHence Option B (9900) is correct.",
    solution: {
      quick: "9900 is the odd one out.",
      concept: "Digit-pattern classification: Middle two digits equal the sum of outer digits.",
      detailed: "3+5=8 (08), 5+6=11, 8+9=17; but 9+0=9 != 90."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Clean preambles of Q26 and Q47
  qs[25].questionText = "Six friends A, B, C, D, E and F are sitting around a circular table facing the centre:\n(A) A is second to the left of C.\n(B) B is between A and D.\n(C) E is opposite to B.\nWho is sitting to the immediate right of F?";
  qs[46].questionText = "Consider the following statements regarding a family's children:\nStatement I: M has three daughters.\nStatement II: Each daughter of M has two brothers.\nHow many children does M have in total?";

  if (Array.isArray(data)) {
    fs.writeFileSync(filePath, JSON.stringify(qs, null, 2), "utf8");
  } else {
    data.questions = qs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }
  console.log("Successfully repaired", filePath);
}

repairGT23("pyq/general-test/23.json");
if (fs.existsSync("mock/general-test/23.json")) {
  repairGT23("mock/general-test/23.json");
}
