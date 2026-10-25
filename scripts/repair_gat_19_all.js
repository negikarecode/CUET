const fs = require("fs");

function repairGT19(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q47 (index 46): Gujarat oil fields from Page 8 Q.23
  qs[46] = {
    questionNumber: 47,
    questionId: "CUET-UG-GAT-2025-S1-P19-Q47",
    chapter: "General Awareness",
    topic: "Indian Geography - Mineral & Energy Resources",
    questionText: "Which among the following oil fields are located in the state of Gujarat?\n(A) Nawgam\n(B) Moran\n(C) Kalol\n(D) Lunej\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B) and (C) only", isCorrect: false, explanation: "Moran (Moran-Hugrijan) is located in Assam, not Gujarat." },
      { id: "B", text: "(A), (B) and (D) only", isCorrect: false, explanation: "Moran is in Assam." },
      { id: "C", text: "(A), (C) and (D) only", isCorrect: true, explanation: "Nawgam, Kalol, and Lunej (near Cambay/Khambhat) are major onshore petroleum fields in Gujarat. Moran-Hugrijan is in Assam." },
      { id: "D", text: "(B), (C) and (D) only", isCorrect: false, explanation: "Moran is in Assam." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. The Gujarat petroleum basin includes major onshore oil and gas fields such as Ankleshwar, Kalol, Nawgam, Mehsana, Sobhasan, Kosamba, and Lunej.\n2. Moran (Moran-Hugrijan) is an important oilfield located in the Upper Assam basin along the Brahmaputra valley.\n3. Therefore, Nawgam (A), Kalol (C), and Lunej (D) are located in Gujarat.\n\nHence Option C ((A), (C) and (D) only) is correct.",
    solution: {
      quick: "(A), (C) and (D) only are oil fields located in Gujarat.",
      concept: "Distribution of petroleum fields in India: Gujarat Basin (Ankleshwar, Kalol, Nawgam, Lunej) vs Assam Basin (Digboi, Naharkatiya, Moran).",
      detailed: "Nawgam, Kalol, Lunej are in Gujarat. Moran is in Assam."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 40
  };

  // Q48 (index 47): Arrange in ascending order from Page 9 Q.24
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P19-Q48",
    chapter: "Quantitative Reasoning",
    topic: "Percentages and Numerical Ordering",
    questionText: "Arrange the following in ascending order of their numerical values:\n(A) 12.5% of 1960\n(B) 5% of 6000\n(C) 9% of 3000\n(D) 11% of 2000\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B), (D), (C)", isCorrect: false, explanation: "Incorrect order." },
      { id: "B", text: "(D), (B), (C), (A)", isCorrect: false, explanation: "Incorrect order." },
      { id: "C", text: "(D), (A), (C), (B)", isCorrect: true, explanation: "(D) 11% of 2000 = 220. (A) 12.5% of 1960 = 1960 / 8 = 245. (C) 9% of 3000 = 270. (B) 5% of 6000 = 300. Ascending order: 220 < 245 < 270 < 300 => (D), (A), (C), (B)." },
      { id: "D", text: "(D), (C), (A), (B)", isCorrect: false, explanation: "(A) is 245 which is less than (C) 270." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Evaluate each percentage expression:\n   (A) 12.5% of 1960 = (1/8) * 1960 = 245.\n   (B) 5% of 6000 = (5/100) * 6000 = 300.\n   (C) 9% of 3000 = (9/100) * 3000 = 270.\n   (D) 11% of 2000 = (11/100) * 2000 = 220.\n2. Arranging the calculated values in ascending order (smallest to largest):\n   220 < 245 < 270 < 300\n   (D) < (A) < (C) < (B).\n\nHence Option C ((D), (A), (C), (B)) is correct.",
    solution: {
      quick: "Ascending order: (D), (A), (C), (B) [220 < 245 < 270 < 300].",
      concept: "Calculating percentage of quantities and ordering values.",
      detailed: "D = 220, A = 245, C = 270, B = 300 => D < A < C < B."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 40
  };

  // Q49 (index 48): Radha photograph blood relation from Page 11 Q.31
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P19-Q49",
    chapter: "General Mental Ability",
    topic: "Blood Relations",
    questionText: "Pointing towards a photograph, Radha said, 'This person is the son of my husband's father's only daughter.' How is the person in the photograph related to Radha?",
    options: [
      { id: "A", text: "Son", isCorrect: false, explanation: "The person is her sister-in-law's son, not her own son." },
      { id: "B", text: "Brother", isCorrect: false, explanation: "Incorrect relation." },
      { id: "C", text: "Uncle", isCorrect: false, explanation: "Incorrect relation." },
      { id: "D", text: "Nephew", isCorrect: true, explanation: "Radha's husband's father is her father-in-law. Her father-in-law's only daughter is her husband's sister (Radha's sister-in-law). The son of her sister-in-law is her nephew." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. Break down the family relationship stepwise:\n   - 'My husband's father' = Radha's father-in-law.\n   - 'My husband's father's only daughter' = Radha's husband's sister (Radha's sister-in-law).\n   - 'Son of my husband's sister' = Radha's nephew.\n2. Therefore, the person in the photograph is Radha's nephew.\n\nHence Option D (Nephew) is correct.",
    solution: {
      quick: "The person is Radha's nephew.",
      concept: "Deductive blood relationship mapping: Husband's father's daughter = Sister-in-law; Sister-in-law's son = Nephew.",
      detailed: "Husband's sister's son = Nephew."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q50 (index 49): Walking in opposite directions from Page 16 Q.43
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P19-Q50",
    chapter: "General Mental Ability",
    topic: "Direction Sense Test",
    questionText: "'A' and 'B' start from the same place and walk in opposite directions, each traveling 20 m. 'A' then turns right and walks 15 m. 'B' turns left and walks 15 m. How far are they now from each other?",
    options: [
      { id: "A", text: "40 m", isCorrect: true, explanation: "Let the starting point be (0, 0). If A walks East 20 m to (20, 0) and turns right (South) 15 m, A is at (20, -15). B walks West 20 m to (-20, 0) and turns left (South) 15 m, B is at (-20, -15). The horizontal distance between (20, -15) and (-20, -15) is 20 - (-20) = 40 m." },
      { id: "B", text: "70 m", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "20 m", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "D", text: "35 m", isCorrect: false, explanation: "Incorrect calculation." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. Assume the starting point is the origin (0, 0).\n2. Suppose A walks East for 20 m to reach (20, 0). Turning right (facing South) and walking 15 m brings A to (20, -15).\n3. B walks in the opposite direction (West) for 20 m to reach (-20, 0). Turning left (facing South) and walking 15 m brings B to (-20, -15).\n4. Both A and B are now at the same vertical coordinate (y = -15).\n5. Distance between them = |x_A - x_B| = |20 - (-20)| = 40 m.\n\nHence Option A (40 m) is correct.",
    solution: {
      quick: "Distance between them is 40 m.",
      concept: "Coordinate tracking in directional movements: Opposite walks along x-axis with symmetric turns along y-axis leave separation equal to total x-displacement.",
      detailed: "Separation = 20 + 20 = 40 m."
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

repairGT19("pyq/general-test/19.json");
if (fs.existsSync("mock/general-test/19.json")) {
  repairGT19("mock/general-test/19.json");
}
