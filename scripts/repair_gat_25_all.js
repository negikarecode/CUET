const fs = require("fs");

function repairGT25(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q46 (index 45): Revolt of 1857 changes from Page 15 Q.46
  qs[45] = {
    questionNumber: 46,
    questionId: "CUET-UG-GAT-2025-S1-P25-Q46",
    chapter: "General Awareness",
    topic: "Modern Indian History - Revolt of 1857 Aftermath",
    questionText: "Which of the following were important policy changes introduced by the British Crown after the Revolt of 1857?\n(A) The British Government accepted direct responsibility for ruling India.\n(B) It was decided that all the territories of Indian rulers would be annexed immediately.\n(C) The proportion of Indian soldiers in the army would be reduced and European soldiers would be increased.\n(D) Policies were formulated to protect landlords and zamindars and give them security of rights over their lands.\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B) and (D) Only", isCorrect: false, explanation: "Statement (B) is false; Queen Victoria's Proclamation of 1858 promised no further territorial annexations." },
      { id: "B", text: "(A), (C) and (D) Only", isCorrect: true, explanation: "Under the Government of India Act 1858, the British Crown took direct control (A). Territorial annexation was abandoned, reversing the Doctrine of Lapse (B is false). The Peel Commission reorganized the army by increasing European soldiers and decreasing Indian soldiers (C). Landlords and taluqdars were reassured of their rights (D)." },
      { id: "C", text: "(B), (C) and (D) Only", isCorrect: false, explanation: "Statement (B) is false." },
      { id: "D", text: "(A), (B), (C) and (D)", isCorrect: false, explanation: "Statement (B) is false." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "Following the suppression of the 1857 revolt, the British Parliament enacted the Government of India Act 1858:\n1. (A) British Crown assumed direct responsibility for governance, ending East India Company rule.\n2. (B) Annexation was explicitly renounced in Queen Victoria's Proclamation of November 1858 (rulers were assured their territories would not be annexed).\n3. (C) Based on the Peel Commission, the proportion of European soldiers was increased, especially in artillery and strategic garrisons, while Indian troop strength was reduced.\n4. (D) Land rights of loyal landlords and taluqdars/zamindars were recognized and protected.\nTherefore, (A), (C) and (D) only are correct.\nHence Option B is correct.",
    solution: {
      quick: "(A), (C) and (D) only are correct policy changes after 1857.",
      concept: "Post-1857 British policy reforms: Transfer of power to Crown, end of territorial annexation, army restructuring, and landlord conciliation.",
      detailed: "Statements A, C, D are true. B is false because Queen Victoria's 1858 proclamation ceased annexations."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 40
  };

  // Q47 (index 46): Relative density instrument from Page 15 Q.47
  qs[46] = {
    questionNumber: 47,
    questionId: "CUET-UG-GAT-2025-S1-P25-Q47",
    chapter: "General Science",
    topic: "Scientific Instruments & Measurements",
    questionText: "Which of the following instruments is used for measuring the relative density (specific gravity) of liquids?",
    options: [
      { id: "A", text: "Lactometer", isCorrect: false, explanation: "A lactometer is a specialized hydrometer used only to test the purity and relative density of milk." },
      { id: "B", text: "Decimeter", isCorrect: false, explanation: "A decimeter is a metric unit of length (0.1 meter)." },
      { id: "C", text: "Hydrometer", isCorrect: true, explanation: "A hydrometer is an instrument used for measuring the relative density (specific gravity) of liquids based on the concept of buoyancy (Archimedes' principle)." },
      { id: "D", text: "Orthometer", isCorrect: false, explanation: "Incorrect instrument." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "A hydrometer is an instrument used to determine the specific gravity (relative density) of liquids. It operates on Archimedes' principle of flotation, where a weighted glass bulb floats higher in denser liquids and sinks lower in less dense liquids.\nHence Option C (Hydrometer) is correct.",
    solution: {
      quick: "A hydrometer measures the relative density of liquids.",
      concept: "Principles of buoyancy and flotation: Hydrometer measures specific gravity of liquids.",
      detailed: "Based on Archimedes' principle, calibrated stem indicates liquid relative density directly."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q48 (index 47): Real numbers statements from Page 15 Q.48
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P25-Q48",
    chapter: "Quantitative Reasoning",
    topic: "Number Systems - Rational and Irrational Numbers",
    questionText: "Which of the following statements is/are correct?\n(A) Every irrational number is a real number.\n(B) Every real number is an irrational number.\n(C) The sum or difference of a rational number and an irrational number is an irrational number.\n(D) The product or quotient of a non-zero rational number with an irrational number is an irrational number.\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B) and (D) only", isCorrect: false, explanation: "Statement (B) is false (e.g., 2 is a real number but rational)." },
      { id: "B", text: "(D), (B) and (C) only", isCorrect: false, explanation: "Statement (B) is false." },
      { id: "C", text: "(A), (C) and (D) only", isCorrect: true, explanation: "Real numbers are partitioned into rationals and irrationals, so every irrational is real (A). Real numbers also include rationals, so not every real is irrational (B is false). Adding or subtracting a rational with an irrational always yields an irrational (C). Multiplying or dividing a non-zero rational with an irrational always yields an irrational (D)." },
      { id: "D", text: "(A) and (D) only", isCorrect: false, explanation: "Statement (C) is also correct." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Statement (A): Real numbers are the union of all rational and irrational numbers. Hence, every irrational number is a real number (True).\n2. Statement (B): Real numbers include integers and fractions (rational numbers), so not every real number is irrational (False).\n3. Statement (C): Let r be rational and x be irrational. If r + x = q (rational), then x = q - r would be rational, a contradiction. Hence, r ± x is irrational (True).\n4. Statement (D): If r != 0 is rational and x is irrational, if r * x = q (rational), then x = q / r would be rational, a contradiction. Hence, r * x is irrational (True).\nTherefore, (A), (C) and (D) only are correct.\nHence Option C is correct.",
    solution: {
      quick: "(A), (C) and (D) only are correct statements.",
      concept: "Fundamental arithmetic properties of real and irrational numbers.",
      detailed: "A, C, D are true. B is false because rational numbers are real numbers but not irrational."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 40
  };

  // Q49 (index 48): Author of Midnight's Children from Page 15 Q.49
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P25-Q49",
    chapter: "General Awareness",
    topic: "Books and Authors",
    questionText: "The author of the acclaimed novel 'Midnight's Children' is:",
    options: [
      { id: "A", text: "Arundhati Roy", isCorrect: false, explanation: "Arundhati Roy authored 'The God of Small Things' (1997 Booker Prize winner)." },
      { id: "B", text: "Salman Rushdie", isCorrect: true, explanation: "'Midnight's Children' was written by Salman Rushdie and won the Booker Prize in 1981, the Booker of Bookers in 1993, and the Best of the Booker in 2008." },
      { id: "C", text: "Ruskin Bond", isCorrect: false, explanation: "Ruskin Bond authored 'The Room on the Roof' and 'Our Trees Still Grow in Dehra'." },
      { id: "D", text: "Khushwant Singh", isCorrect: false, explanation: "Khushwant Singh authored 'Train to Pakistan'." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "Salman Rushdie wrote the milestone 1981 novel 'Midnight's Children', which deals with India's transition from British colonialism to independence and the partition of India through magical realism. It was awarded the 1981 Booker Prize and later named the 'Booker of Bookers'.\nHence Option B (Salman Rushdie) is correct.",
    solution: {
      quick: "Salman Rushdie authored Midnight's Children.",
      concept: "Major Indian English literature classics: Salman Rushdie won the Booker Prize for Midnight's Children.",
      detailed: "Won 1981 Booker Prize and 1993 Booker of Bookers."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q50 (index 49): Features of metals NOT correct from Page 16 Q.50
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P25-Q50",
    chapter: "General Science",
    topic: "Chemistry - Metals and Non-Metals",
    questionText: "Which of the following features of metals is NOT correct?",
    options: [
      { id: "A", text: "Metals combine with oxygen to form basic oxides.", isCorrect: false, explanation: "This is a correct feature (e.g., Na2O, CaO, MgO are basic oxides)." },
      { id: "B", text: "All metals have the same reactions with water as they have with dilute acid.", isCorrect: true, explanation: "This statement is NOT correct. Metal reactivity varies widely across the reactivity series; for example, sodium reacts violently with cold water, while copper does not react with water or dilute hydrochloric acid." },
      { id: "C", text: "Metals can form positive ions by losing electrons to non-metals.", isCorrect: false, explanation: "This is a correct feature of electropositive metallic elements." },
      { id: "D", text: "Metals are lustrous, malleable, ductile and are good conductors of heat and electricity.", isCorrect: false, explanation: "This is a standard physical property of metallic elements." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. Statement 1 is correct: Metal oxides are typically basic in nature (or amphoteric like Al2O3, ZnO).\n2. Statement 2 is INCORRECT: Different metals exhibit vastly different chemical activities based on the electrochemical reactivity series. Highly reactive metals (potassium, sodium) react violently with cold water. Moderately reactive metals (zinc, iron) react only with steam or dilute acids. Noble metals (copper, silver, gold) do not react with water or dilute non-oxidizing acids.\n3. Statement 3 is correct: Metals have low ionization energies and electropositively lose valence electrons to form cations.\n4. Statement 4 is correct: Malleability, ductility, metallic luster, and electrical/thermal conductivity are defining physical properties of metals.\n\nHence Option B is the incorrect statement (the required answer).",
    solution: {
      quick: "Option B is incorrect because metal reactivity varies widely across the reactivity series.",
      concept: "Reactivity series of metals: Reactions with water and acids depend strictly on the metal's position relative to hydrogen.",
      detailed: "Different metals have completely different reactivities; statement 2 is false."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 35
  };

  if (Array.isArray(data)) {
    fs.writeFileSync(filePath, JSON.stringify(qs, null, 2), "utf8");
  } else {
    data.questions = qs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }
  console.log("Successfully repaired", filePath);
}

repairGT25("pyq/general-test/25.json");
if (fs.existsSync("mock/general-test/25.json")) {
  repairGT25("mock/general-test/25.json");
}
