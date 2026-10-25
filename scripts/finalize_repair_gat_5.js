const fs = require("fs");

function repairGT5Full(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q45 (index 44): Digit 3 in counting from 1 to 1000
  qs[44] = {
    questionNumber: 45,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q45",
    chapter: "General Mental Ability",
    topic: "Number Properties and Permutations",
    questionText: "How many times does the digit 3 appear in the counting from 1 to 1000?",
    options: [
      { id: "A", text: "300", isCorrect: true, explanation: "In numbers from 000 to 999, there are 1000 numbers with 3 digits each = 3000 digits. By symmetry, digit 3 appears 3000 / 10 = 300 times. 1000 has no 3, so total = 300." },
      { id: "B", text: "250", isCorrect: false, explanation: "Incorrect count." },
      { id: "C", text: "360", isCorrect: false, explanation: "Incorrect count." },
      { id: "D", text: "210", isCorrect: false, explanation: "Incorrect count." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. Consider all 3-digit representations from 000 to 999 (total 1000 numbers).\n2. Total digits written = 1000 * 3 = 3000 digits.\n3. Since each digit (0 to 9) appears with equal frequency in these 3000 positions:\n   Frequency of digit 3 = 3000 / 10 = 300 times.\n4. The number 1000 contains no 3.\n\nTherefore, the digit 3 appears exactly 300 times.\nHence Option A is correct.",
    solution: {
      quick: "Digit 3 appears exactly 300 times from 1 to 1000.",
      concept: "Digit counting principle: In numbers 0 to 10^n - 1, each non-zero digit appears n * 10^(n-1) times.",
      detailed: "For n = 3 (1 to 999): 3 * 10^(3-1) = 3 * 100 = 300 times."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q46 (index 45): Five-digit numbers without repetition using 0, 1, 2, 3, 4
  qs[45] = {
    questionNumber: 46,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q46",
    chapter: "General Mental Ability",
    topic: "Permutations and Combinations",
    questionText: "How many five-digit numbers can be formed by using the digits 0, 1, 2, 3 and 4 when repetition of digits is not allowed?",
    options: [
      { id: "A", text: "120", isCorrect: false, explanation: "120 includes numbers with 0 as the leading digit (which are 4-digit numbers)." },
      { id: "B", text: "84", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "250", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "D", text: "96", isCorrect: true, explanation: "The ten-thousands place cannot be 0, so it has 4 choices (1, 2, 3, 4). The remaining 4 places can be filled by the remaining 4 digits in 4! = 24 ways. Total = 4 * 24 = 96." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. A five-digit number cannot have 0 as its first digit (ten-thousands place).\n2. Choices for the first digit (from {1, 2, 3, 4}) = 4.\n3. The remaining 4 positions can be filled with the remaining 4 digits (including 0) without repetition in 4! = 4 * 3 * 2 * 1 = 24 ways.\n4. Total 5-digit numbers = 4 * 24 = 96.\n\nHence Option D (96) is correct.",
    solution: {
      quick: "Total numbers = 4 * 4! = 4 * 24 = 96.",
      concept: "Multiplication rule of counting with restriction on the leading digit (non-zero).",
      detailed: "Leading digit has 4 choices (1,2,3,4); remaining 4 positions filled in 4! = 24 ways. 4 * 24 = 96."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 40
  };

  // Q47 (index 46): Cylinder and Hemisphere surface area statements
  qs[46] = {
    questionNumber: 47,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q47",
    chapter: "Quantitative Reasoning",
    topic: "Mensuration - Surface Areas",
    questionText: "Consider the following statements:\nI. If the height of a cylinder is doubled, the area of the curved surface is doubled.\nII. If the radius of a hemispherical solid is doubled, its total surface area becomes fourfold.\nWhich of the above statement(s) is / are true?",
    options: [
      { id: "A", text: "Only I", isCorrect: false, explanation: "Statement II is also true." },
      { id: "B", text: "Only II", isCorrect: false, explanation: "Statement I is also true." },
      { id: "C", text: "I & II Both", isCorrect: true, explanation: "Curved surface of cylinder = 2*pi*r*h (linear in h, so doubles). Total surface area of solid hemisphere = 3*pi*r^2 (quadratic in r, so becomes (2r)^2 = 4r^2, fourfold)." },
      { id: "D", text: "Neither I nor II", isCorrect: false, explanation: "Both statements are correct." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Statement I: Curved surface area (CSA) of a cylinder = 2 * pi * r * h. When height h becomes 2h, new CSA = 2 * pi * r * (2h) = 2 * (2 * pi * r * h) = 2 * CSA. Thus, curved surface area is doubled (True).\n2. Statement II: Total surface area (TSA) of a solid hemisphere = 3 * pi * r^2. When radius r is doubled to 2r, new TSA = 3 * pi * (2r)^2 = 3 * pi * 4r^2 = 4 * (3 * pi * r^2) = 4 * TSA. Thus, total surface area becomes fourfold (True).\n3. Both Statement I and Statement II are true.\n\nHence Option C (I & II Both) is correct.",
    solution: {
      quick: "Both statements I and II are true.",
      concept: "Scaling factors in mensuration: CSA of cylinder varies directly with h; TSA of solid hemisphere varies with r^2.",
      detailed: "CSA = 2*pi*r*h (doubles with h); TSA of hemisphere = 3*pi*r^2 (quadruples with r)."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 50
  };

  // Q48 (index 47): Number series 2, 15, 41, 80, 132, ?
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q48",
    chapter: "General Mental Ability",
    topic: "Number Series",
    questionText: "What is the missing number in the sequence 2, 15, 41, 80, 132, ?",
    options: [
      { id: "A", text: "212", isCorrect: false, explanation: "Incorrect difference calculation." },
      { id: "B", text: "165", isCorrect: false, explanation: "Incorrect difference calculation." },
      { id: "C", text: "197", isCorrect: true, explanation: "Differences are successive multiples of 13: 15-2=13, 41-15=26, 80-41=39, 132-80=52. Next difference is 65 => 132 + 65 = 197." },
      { id: "D", text: "144", isCorrect: false, explanation: "Incorrect difference calculation." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Find successive differences between terms:\n   15 - 2 = 13 (13 * 1)\n   41 - 15 = 26 (13 * 2)\n   80 - 41 = 39 (13 * 3)\n   132 - 80 = 52 (13 * 4)\n2. The differences form an arithmetic progression with common difference 13 (multiples of 13).\n3. The next difference is 13 * 5 = 65.\n4. Therefore, missing term = 132 + 65 = 197.\n\nHence Option C (197) is correct.",
    solution: {
      quick: "Missing number is 197.",
      concept: "Second-order difference pattern: differences are multiples of 13 (+13, +26, +39, +52, +65).",
      detailed: "132 + 65 = 197."
    },
    questionType: "direct-numerical",
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
  console.log("Successfully finalized repair for:", filePath);
}

repairGT5Full("pyq/general-test/5.json");
if (fs.existsSync("mock/general-test/5.json")) {
  repairGT5Full("mock/general-test/5.json");
}
