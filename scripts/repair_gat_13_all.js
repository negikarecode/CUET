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

  // Q24 (index 23): Mode of data 2, 4, 5, 2, 4, 8, 2, 4, 7, 8, 12, 4
  qs[23] = {
    questionNumber: 24,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q24",
    chapter: "Quantitative Reasoning",
    topic: "Statistics - Mode",
    questionText: "What is the mode of the given data set: 2, 4, 5, 2, 4, 8, 2, 4, 7, 8, 12, 4?",
    options: [
      { id: "A", text: "8", isCorrect: false, explanation: "8 occurs only 2 times." },
      { id: "B", text: "4", isCorrect: true, explanation: "The number 4 occurs 4 times, which is the highest frequency in the distribution." },
      { id: "C", text: "6", isCorrect: false, explanation: "6 is not in the data set." },
      { id: "D", text: "7", isCorrect: false, explanation: "7 occurs only 1 time." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. Count the frequency of each distinct observation in the data set:\n   2 occurs 3 times\n   4 occurs 4 times\n   5 occurs 1 time\n   7 occurs 1 time\n   8 occurs 2 times\n   12 occurs 1 time\n2. The observation with the maximum frequency is 4 (frequency = 4).\n3. By definition, the mode of a data set is the value that appears most frequently.\n\nTherefore, the mode is 4.\nHence Option B is correct.",
    solution: {
      quick: "Mode is 4 (highest frequency of 4 times).",
      concept: "Definition of statistical mode: the value that occurs with maximum frequency.",
      detailed: "Frequencies: 4 appears 4 times, 2 appears 3 times, 8 appears 2 times, others 1 time. Mode = 4."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 25
  };

  // Q39 (index 38): Motor boat downstream and upstream
  qs[38] = {
    questionNumber: 39,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q39",
    chapter: "Quantitative Reasoning",
    topic: "Boats and Streams",
    questionText: "A motor boat can travel at 15 km/hr in still water. It traveled 63 km downstream in a river and then returned, taking altogether 10 hours. What is the rate of flow of the river?",
    options: [
      { id: "A", text: "3 km/hr", isCorrect: false, explanation: "63/18 + 63/12 = 3.5 + 5.25 = 8.75 hours != 10 hours." },
      { id: "B", text: "6 km/hr", isCorrect: true, explanation: "Speed downstream = 15 + 6 = 21 km/hr (time = 63/21 = 3 hrs). Speed upstream = 15 - 6 = 9 km/hr (time = 63/9 = 7 hrs). Total time = 3 + 7 = 10 hours." },
      { id: "C", text: "3.5 km/hr", isCorrect: false, explanation: "Incorrect stream velocity." },
      { id: "D", text: "5 km/hr", isCorrect: false, explanation: "63/20 + 63/10 = 3.15 + 6.3 = 9.45 hours != 10 hours." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. Let the rate of flow of the river (speed of current) be v km/hr.\n2. Speed downstream = (15 + v) km/hr; Speed upstream = (15 - v) km/hr.\n3. Total time equation:\n   63 / (15 + v) + 63 / (15 - v) = 10.\n4. Combine fractions:\n   63 * [(15 - v) + (15 + v)] / (225 - v^2) = 10\n   63 * 30 / (225 - v^2) = 10\n   1890 / (225 - v^2) = 10\n   225 - v^2 = 189\n   v^2 = 225 - 189 = 36\n   v = 6 km/hr.\n\nHence Option B (6 km/hr) is correct.",
    solution: {
      quick: "Rate of flow is 6 km/hr (63/21 + 63/9 = 3 + 7 = 10 hours).",
      concept: "Boats and streams kinematic equation: t_total = d/(u+v) + d/(u-v).",
      detailed: "63/(15+v) + 63/(15-v) = 10 => 1890/(225-v^2) = 10 => v^2 = 36 => v = 6."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 50
  };

  // Q42 (index 41): Conical tent cloth length
  qs[41] = {
    questionNumber: 42,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q42",
    chapter: "Quantitative Reasoning",
    topic: "Mensuration - Cones",
    questionText: "How many meters of cloth 6 meters wide will be required to make a conical tent, the radius of whose base is 21 m and height is 20 m? (Use pi = 22/7)",
    options: [
      { id: "A", text: "209 meters", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "B", text: "627 meters", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "638 meters", isCorrect: false, explanation: "Incorrect slant height." },
      { id: "D", text: "319 meters", isCorrect: true, explanation: "Slant height l = sqrt(21^2 + 20^2) = sqrt(441 + 400) = sqrt(841) = 29 m. Curved Surface Area = pi * r * l = (22/7) * 21 * 29 = 66 * 29 = 1914 m^2. Length of cloth = Area / Width = 1914 / 6 = 319 meters." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. Base radius r = 21 m, height h = 20 m.\n2. Slant height of the cone l:\n   l = sqrt(r^2 + h^2) = sqrt(21^2 + 20^2) = sqrt(441 + 400) = sqrt(841) = 29 m.\n3. Curved surface area (CSA) of the conical tent:\n   CSA = pi * r * l = (22/7) * 21 * 29 = 22 * 3 * 29 = 66 * 29 = 1914 m^2.\n4. Width of cloth w = 6 m. Let required length be L:\n   Area of rectangular cloth = L * w = CSA\n   L * 6 = 1914 => L = 1914 / 6 = 319 meters.\n\nHence Option D (319 meters) is correct.",
    solution: {
      quick: "Length of cloth = (pi * r * l) / width = 1914 / 6 = 319 meters.",
      concept: "Surface area of right circular cone: CSA = pi * r * l; Slant height l = sqrt(r^2 + h^2).",
      detailed: "l = sqrt(441+400) = 29. CSA = (22/7)*21*29 = 1914 m^2. Length = 1914/6 = 319 m."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q48 (index 47): When white light is dispersed into its seven-colour components by a prism, which color of light bends the least?
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q48",
    chapter: "General Science",
    topic: "Optics - Dispersion of Light",
    questionText: "When white light is dispersed into its seven-colour components by a glass prism, which colour of light bends the least?",
    options: [
      { id: "A", text: "Yellow", isCorrect: false, explanation: "Yellow has an intermediate wavelength and deviation." },
      { id: "B", text: "Violet", isCorrect: false, explanation: "Violet has the shortest wavelength and bends (deviates) the most." },
      { id: "C", text: "Green", isCorrect: false, explanation: "Green is in the middle of the spectrum." },
      { id: "D", text: "Red", isCorrect: true, explanation: "Red light has the longest wavelength in the visible spectrum, travels fastest in the prism material, has the smallest refractive index, and hence bends (deviates) the least." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. Dispersion of light occurs because the refractive index of a prism material varies inversely with wavelength (Cauchy's dispersion formula).\n2. Red light has the longest wavelength (~700 nm) among visible colors, so the refractive index of glass for red light is lowest, meaning it slows down the least and bends (deviates) the least.\n3. Violet light has the shortest wavelength (~400 nm) and bends the most.\n\nHence Option D (Red) is correct.",
    solution: {
      quick: "Red light bends the least because it has the longest visible wavelength.",
      concept: "Dispersion of light: Angle of deviation varies inversely with wavelength (delta proportional to 1/lambda).",
      detailed: "Red has longest wavelength => least deviation. Violet has shortest wavelength => most deviation."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q49 (index 48): Area of right-angled triangle with hyp 17 and side 8
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q49",
    chapter: "Quantitative Reasoning",
    topic: "Mensuration - Triangles",
    questionText: "The area of a right-angled triangle with hypotenuse 17 cm and one side being 8 cm shall be:",
    options: [
      { id: "A", text: "68 cm²", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "B", text: "60 cm²", isCorrect: true, explanation: "Other side = sqrt(17^2 - 8^2) = sqrt(289 - 64) = sqrt(225) = 15 cm. Area = 1/2 * base * height = 1/2 * 8 * 15 = 60 cm²." },
      { id: "C", text: "120 cm²", isCorrect: false, explanation: "120 cm² is base * height (omits 1/2 factor)." },
      { id: "D", text: "136 cm²", isCorrect: false, explanation: "Incorrect formula." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. In a right-angled triangle, by Pythagoras theorem:\n   c^2 = a^2 + b^2\n   17^2 = 8^2 + b^2\n   289 = 64 + b^2\n   b^2 = 289 - 64 = 225 => b = 15 cm.\n2. Area of right-angled triangle:\n   Area = (1/2) * a * b = (1/2) * 8 * 15 = 4 * 15 = 60 cm².\n\nHence Option B (60 cm²) is correct.",
    solution: {
      quick: "Area = (1/2) * 8 * 15 = 60 cm².",
      concept: "Pythagorean triples: (8, 15, 17) forms a right triangle. Area = (1/2) * product of legs.",
      detailed: "b = sqrt(289 - 64) = 15. Area = 1/2 * 8 * 15 = 60 cm²."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q50 (index 49): Chronological order of religious teachers
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P13-Q50",
    chapter: "General Awareness",
    topic: "Medieval Indian History - Bhakti and Sufi Movements",
    questionText: "Arrange the following religious teachers in chronological order, beginning with the earliest to the last:\n(A) Shaikh Ahmad Sirhindi\n(B) Basavanna\n(C) Vallabhacharya\n(D) Andal\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (D), (B), (C)", isCorrect: false, explanation: "Incorrect chronology." },
      { id: "B", text: "(D), (C), (B), (A)", isCorrect: false, explanation: "Basavanna lived in the 12th century, before Vallabhacharya (15th–16th century)." },
      { id: "C", text: "(D), (B), (C), (A)", isCorrect: true, explanation: "Andal (8th century Tamil Alwar saint) -> Basavanna (12th century Lingayat founder) -> Vallabhacharya (late 15th - early 16th century Pushtimarg founder) -> Shaikh Ahmad Sirhindi (late 16th - early 17th century Naqshbandi Sufi saint)." },
      { id: "D", text: "(C), (B), (D), (A)", isCorrect: false, explanation: "Andal lived centuries before Vallabhacharya." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "Historical chronology of Bhakti and Sufi saints:\n1. Andal: Only female Alwar saint of Tamil Vaishnavism (circa 8th century CE).\n2. Basavanna: 12th-century philosopher, statesman, and founder of the Lingayat (Veerashaiva) tradition in Karnataka (1106–1167 CE).\n3. Vallabhacharya: Bhakti philosopher who founded the Pushtimarg sect of Vaishnavism (1479–1531 CE).\n4. Shaikh Ahmad Sirhindi: Prominent Indian Islamic scholar and Sufi master of the Naqshbandi order (1564–1624 CE).\nChronological order: (D) Andal -> (B) Basavanna -> (C) Vallabhacharya -> (A) Shaikh Ahmad Sirhindi.\nHence Option C is correct.",
    solution: {
      quick: "Chronology: (D), (B), (C), (A).",
      concept: "Timeline of Bhakti/Sufi movement leaders: Andal (8th c) -> Basavanna (12th c) -> Vallabhacharya (15th-16th c) -> Sirhindi (16th-17th c).",
      detailed: "Andal (8th c) -> Basavanna (12th c) -> Vallabhacharya (1479-1531) -> Sirhindi (1564-1624)."
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
  console.log("Successfully repaired", filePath);
}

repairGT13("pyq/general-test/13.json");
if (fs.existsSync("mock/general-test/13.json")) {
  repairGT13("mock/general-test/13.json");
}
