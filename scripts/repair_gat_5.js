const fs = require("fs");

function repairGT5(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // 1. Repair Q5 (index 4) or ensure seating arrangement is included
  // Original Q5 from NTA Page 2: In how many ways can 15 people be seated around two round tables with seating capacities of 7 and 8 people?
  // In existing file: index 4 has "Vo V3 and Vs are the volumes of four cubes...", index 6 has duplicate plant hormones.
  // We can put the round table seating arrangement into index 6 (Q7) to replace duplicate plant hormones!
  qs[6] = {
    questionNumber: 7,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q07",
    chapter: "Quantitative Reasoning",
    topic: "Permutations and Combinations",
    questionText: "In how many ways can 15 people be seated around two round tables with seating capacities of 7 and 8 people?",
    options: [
      { id: "A", text: "15! / 8", isCorrect: false, explanation: "Omits division by the circular arrangement of the second table." },
      { id: "B", text: "15! / 56", isCorrect: true, explanation: "Number of ways = 15C7 * (7-1)! * (8-1)! = (15! / (7! * 8!)) * 6! * 7! = 15! / (8 * 7) = 15! / 56." },
      { id: "C", text: "15! / 7", isCorrect: false, explanation: "Incorrect circular permutation calculation." },
      { id: "D", text: "15! / (7! * 8!)", isCorrect: false, explanation: "This only chooses the groups without arranging them around the tables." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. Select 7 people out of 15 to sit at the table of capacity 7: 15C7 = 15! / (7! * 8!). The remaining 8 people automatically go to the second table.\n2. Arrange 7 people at a round table: (7 - 1)! = 6! ways.\n3. Arrange 8 people at a round table: (8 - 1)! = 7! ways.\n4. Total seating arrangements = [15! / (7! * 8!)] * 6! * 7! = 15! * 6! / 8! = 15! / (8 * 7) = 15! / 56.\n\nHence, Option B (15! / 56, or 15! / (8 * 7)) is correct.",
    solution: {
      quick: "Total arrangements = 15C7 * 6! * 7! = 15! / 56.",
      concept: "Group selection followed by circular permutations: n persons around a circle is (n-1)!.",
      detailed: "Total ways = (15! / (7! * 8!)) * 6! * 7! = 15! / (8 * 7) = 15! / 56."
    },
    questionType: "conceptual",
    difficulty: 3,
    difficultyLevel: 3,
    estimatedTimeSeconds: 60
  };

  // 2. Repair Q19 (index 18) which was a duplicate of Q18 (Mean problem).
  // Replace with authentic Q22 from Page 8: Reena and Sunita age problem!
  qs[18] = {
    questionNumber: 19,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q19",
    chapter: "Quantitative Reasoning",
    topic: "Problems on Ages",
    questionText: "Reena is twice as old as Sunita. Three years ago, Reena was three times as old as Sunita. What is the present age of Reena?",
    options: [
      { id: "A", text: "18 years", isCorrect: false, explanation: "Incorrect age calculation." },
      { id: "B", text: "6 years", isCorrect: false, explanation: "6 years is Sunita's present age, not Reena's." },
      { id: "C", text: "16 years", isCorrect: false, explanation: "Incorrect age calculation." },
      { id: "D", text: "12 years", isCorrect: true, explanation: "Let Sunita's age = S, Reena's age = R = 2S. Three years ago: (2S - 3) = 3(S - 3) => 2S - 3 = 3S - 9 => S = 6. Reena's age = 2 * 6 = 12 years." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. Let Sunita's current age be S and Reena's current age be R.\n2. Given: R = 2S.\n3. Three years ago:\n   (R - 3) = 3 * (S - 3)\n   (2S - 3) = 3S - 9\n   3S - 2S = 9 - 3\n   S = 6 years.\n4. Reena's present age R = 2 * 6 = 12 years.\n\nHence, Option D (12 years) is correct.",
    solution: {
      quick: "Reena's present age is 12 years.",
      concept: "Linear equations in one variable applied to age word problems.",
      detailed: "R = 2S; 2S - 3 = 3(S - 3) => S = 6 => R = 12."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 40
  };

  // 3. Replace Q46 (index 45) with authentic Q45 from Page 14 (Foreign travellers chronological order)
  qs[45] = {
    questionNumber: 46,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q46",
    chapter: "General Awareness",
    topic: "Medieval Indian History and Foreign Travellers",
    questionText: "Arrange the following foreign travellers who visited India in chronological order, starting from the earliest to the most recent:\n(A) Marco Polo (Italy)\n(B) Al-Biruni (Uzbekistan)\n(C) Francois Bernier (France)\n(D) Ibn Battuta (Morocco)\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (C), (B), (D)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "B", text: "(A), (D), (C), (B)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "C", text: "(B), (A), (D), (C)", isCorrect: true, explanation: "Al-Biruni (early 11th century, 1017) -> Marco Polo (late 13th century, 1292) -> Ibn Battuta (14th century, 1333) -> Francois Bernier (17th century, 1656)." },
      { id: "D", text: "(B), (C), (A), (D)", isCorrect: false, explanation: "Incorrect chronology." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "Chronology of foreign travellers in India:\n1. Al-Biruni: Arrived in 1017 CE during Mahmud of Ghazni's invasions (11th century).\n2. Marco Polo: Visited the Pandyan kingdom around 1292–1294 CE (late 13th century).\n3. Ibn Battuta: Arrived during Muhammad bin Tughlaq's reign in 1333 CE (14th century).\n4. Francois Bernier: Visited the Mughal Empire between 1656 and 1668 CE during Shah Jahan and Aurangzeb's reign (17th century).\nSequence: (B), (A), (D), (C).\nHence Option C is correct.",
    solution: {
      quick: "Chronological sequence is (B), (A), (D), (C).",
      concept: "Historical chronology of medieval travellers: Al-Biruni (11th c) -> Marco Polo (13th c) -> Ibn Battuta (14th c) -> Bernier (17th c).",
      detailed: "Al-Biruni (1017) -> Marco Polo (1292) -> Ibn Battuta (1333) -> Bernier (1656)."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 60
  };

  // 4. Replace Q47 (index 46) with authentic Q48 from Page 14 (Colored balls probability)
  qs[46] = {
    questionNumber: 47,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q47",
    chapter: "General Mental Ability",
    topic: "Probability of Combinations",
    questionText: "A bag contains 4 red, 5 blue and 3 green balls. If two balls are drawn at random from the bag, then which of the following statements are correct?\n(A) The probability that both balls are red is 1/11.\n(B) The probability that one ball is red and one ball is blue is 10/33.\n(C) The probability that both balls are blue is 5/33.\n(D) The probability that both balls are green is 5/11.\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B) and (C) only", isCorrect: true, explanation: "Statements (A), (B), and (C) are mathematically correct. Statement (D) is false (3C2/66 = 1/22, not 5/11)." },
      { id: "B", text: "(A), (B) and (D) only", isCorrect: false, explanation: "Statement (D) is false." },
      { id: "C", text: "(B) and (D) only", isCorrect: false, explanation: "Statement (D) is false." },
      { id: "D", text: "(A), (B), (C) and (D)", isCorrect: false, explanation: "Statement (D) is false." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "Total balls = 4 + 5 + 3 = 12.\nTotal ways to draw 2 balls = 12C2 = (12 * 11) / 2 = 66.\n1. Statement (A): P(both red) = 4C2 / 66 = 6 / 66 = 1/11 (Correct).\n2. Statement (B): P(1 red, 1 blue) = (4 * 5) / 66 = 20 / 66 = 10/33 (Correct).\n3. Statement (C): P(both blue) = 5C2 / 66 = 10 / 66 = 5/33 (Correct).\n4. Statement (D): P(both green) = 3C2 / 66 = 3 / 66 = 1/22 != 5/11 (Incorrect).\nTherefore, (A), (B) and (C) only are correct.\nHence Option A is correct.",
    solution: {
      quick: "(A), (B) and (C) only are correct.",
      concept: "Combinations and classical probability for drawing colored balls without replacement.",
      detailed: "Total = 12C2 = 66. Both red = 6/66 = 1/11. One red, one blue = 20/66 = 10/33. Both blue = 10/66 = 5/33. Both green = 3/66 = 1/22."
    },
    questionType: "conceptual",
    difficulty: 3,
    difficultyLevel: 3,
    estimatedTimeSeconds: 75
  };

  // 5. Replace Q48 (index 47) with authentic Time and Work problem
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q48",
    chapter: "Numerical Ability",
    topic: "Time and Work",
    questionText: "A and B working together can finish a piece of work in 12 days while B alone can finish the same work in 30 days. In how many days can A alone finish the same work?",
    options: [
      { id: "A", text: "24 days", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "B", text: "20 days", isCorrect: true, explanation: "1/A = 1/12 - 1/30 = (5 - 2)/60 = 3/60 = 1/20 => A alone finishes in 20 days." },
      { id: "C", text: "12 days", isCorrect: false, explanation: "12 days is the combined time of A and B." },
      { id: "D", text: "18 days", isCorrect: false, explanation: "Incorrect calculation." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. Work done by (A + B) in 1 day = 1/12.\n2. Work done by B alone in 1 day = 1/30.\n3. Work done by A alone in 1 day = 1/12 - 1/30 = (5 - 2)/60 = 3/60 = 1/20.\n4. Therefore, A alone finishes the work in 20 days.\nHence Option B is correct.",
    solution: {
      quick: "A alone can finish the work in 20 days.",
      concept: "Time and work rate subtraction formula: 1/A = 1/(A+B) - 1/B.",
      detailed: "1/A = 1/12 - 1/30 = 3/60 = 1/20 => A = 20 days."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // 6. Replace Q49 (index 48) with authentic Q49 from Page 15 (INS-2B for Bhutan)
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q49",
    chapter: "Current Affairs",
    topic: "India Space Diplomacy",
    questionText: "As part of bilateral cooperation in space technology, for which of the following neighboring countries did India launch the Indian Space Research Organization (ISRO) Nano Satellite 2 (INS-2B) in 2022 and inaugurated a ground station in the same country in 2023?",
    options: [
      { id: "A", text: "Maldives", isCorrect: false, explanation: "Incorrect country." },
      { id: "B", text: "Bangladesh", isCorrect: false, explanation: "Incorrect country." },
      { id: "C", text: "Sri Lanka", isCorrect: false, explanation: "Incorrect country." },
      { id: "D", text: "Bhutan", isCorrect: true, explanation: "India jointly developed and launched the India-Bhutan SAT (INS-2B) on PSLV-C54 in November 2022, and the ground station was inaugurated in Thimphu in March 2023." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "India and Bhutan jointly developed the India-Bhutan SAT (INS-2B), launched by ISRO on board PSLV-C54 in November 2022. The dedicated satellite ground station in Thimphu was officially inaugurated in March 2023.\nHence Option D is correct.",
    solution: {
      quick: "Bhutan is the correct country (India-Bhutan SAT INS-2B).",
      concept: "India-Bhutan bilateral space cooperation and ISRO satellite ground station.",
      detailed: "INS-2B was launched in 2022 and its ground station in Thimphu, Bhutan was inaugurated in 2023."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // 7. Replace Q50 (index 49) with authentic Q50 from Page 15 (PSLV launcher for Mangalyaan & Chandrayaan-1)
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P05-Q50",
    chapter: "General Awareness",
    topic: "Indian Space Missions and Launch Vehicles",
    questionText: "Which among the following launchers was used to launch India's Mars Orbiter Mission (Mangalyaan) and the Chandrayaan-1 Lunar Mission?",
    options: [
      { id: "A", text: "Geosynchronous Satellite Launch Vehicle Mark II (GSLV-Mk II)", isCorrect: false, explanation: "GSLV Mk II launched GSAT communication satellites." },
      { id: "B", text: "Small Satellite Launch Vehicle (SSLV)", isCorrect: false, explanation: "SSLV is ISRO's newest launcher for small satellites." },
      { id: "C", text: "Launch Vehicle Mark-3 (LVM-3)", isCorrect: false, explanation: "LVM-3 launched Chandrayaan-2 and Chandrayaan-3." },
      { id: "D", text: "Polar Satellite Launch Vehicle (PSLV)", isCorrect: true, explanation: "PSLV-C11 launched Chandrayaan-1 in 2008 and PSLV-C25 launched Mars Orbiter Mission (Mangalyaan) in 2013." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "ISRO's workhorse rocket Polar Satellite Launch Vehicle (PSLV) launched both Chandrayaan-1 (on PSLV-C11 in October 2008) and the Mars Orbiter Mission / Mangalyaan (on PSLV-C25 in November 2013).\nHence Option D is correct.",
    solution: {
      quick: "Polar Satellite Launch Vehicle (PSLV) launched both Chandrayaan-1 and Mangalyaan.",
      concept: "ISRO launch vehicles: PSLV launched Chandrayaan-1 (PSLV-C11) and Mangalyaan (PSLV-C25).",
      detailed: "PSLV-C11 launched Chandrayaan-1 (2008) and PSLV-C25 launched MOM (2013)."
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
  console.log("Repaired", filePath);
}

repairGT5("pyq/general-test/5.json");
if (fs.existsSync("mock/general-test/5.json")) {
  repairGT5("mock/general-test/5.json");
}
