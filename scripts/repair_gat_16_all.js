const fs = require("fs");

function repairGT16(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q1 (index 0): Clean OCR noise in stem
  qs[0].questionText = "Which of the following states of India share a border with China?\n(A) Arunachal Pradesh\n(B) Sikkim\n(C) Uttarakhand\n(D) Nagaland\nChoose the correct answer from the options given below:";

  // Q44 (index 43): Telescoping series from Page 16 Q.28
  qs[43] = {
    questionNumber: 44,
    questionId: "CUET-UG-GAT-2025-S1-P16-Q44",
    chapter: "Quantitative Reasoning",
    topic: "Number Systems & Telescoping Series",
    questionText: "What is the value of the following series?\n4/(3 × 7) + 4/(7 × 11) + 4/(11 × 15) + ... + 4/(27 × 31)",
    options: [
      { id: "A", text: "28/93", isCorrect: true, explanation: "Notice that 4/(n * (n+4)) = 1/n - 1/(n+4). The series telescopes to: (1/3 - 1/7) + (1/7 - 1/11) + ... + (1/27 - 1/31) = 1/3 - 1/31 = (31 - 3)/(3 * 31) = 28/93." },
      { id: "B", text: "7/93", isCorrect: false, explanation: "Incorrect summation." },
      { id: "C", text: "17/93", isCorrect: false, explanation: "Incorrect summation." },
      { id: "D", text: "34/93", isCorrect: false, explanation: "Incorrect summation." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. Observe that each term has the form 4 / [n * (n + 4)] where the difference between factors in the denominator is 4.\n2. Decompose into partial fractions:\n   4 / [n * (n + 4)] = ( (n + 4) - n ) / [n * (n + 4)] = 1/n - 1/(n + 4).\n3. Writing out the terms:\n   Term 1: 1/3 - 1/7\n   Term 2: 1/7 - 1/11\n   Term 3: 1/11 - 1/15\n   ...\n   Last Term: 1/27 - 1/31\n4. All intermediate fractions cancel out pairwise (telescoping sum):\n   Sum = 1/3 - 1/31 = (31 - 3) / (3 * 31) = 28 / 93.\n\nHence Option A (28/93) is correct.",
    solution: {
      quick: "Sum = 1/3 - 1/31 = 28/93.",
      concept: "Telescoping fraction cancellation: d / [n(n+d)] = 1/n - 1/(n+d).",
      detailed: "(1/3 - 1/7) + (1/7 - 1/11) + ... + (1/27 - 1/31) = 1/3 - 1/31 = 28/93."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q45 (index 44): MOTHER coding from Page 4 Q.3
  qs[44] = {
    questionNumber: 45,
    questionId: "CUET-UG-GAT-2025-S1-P16-Q45",
    chapter: "General Mental Ability",
    topic: "Coding and Decoding - Opposite Letters",
    questionText: "In a certain code, MOTHER is written as NLGSVI. Using the same code rule, consider the following statements:\n(A) ANSWER is coded as ZMHDVI\n(B) STATES is coded as HGZGVH\nChoose the correct option:",
    options: [
      { id: "A", text: "Only (A)", isCorrect: false, explanation: "Statement (B) is also correct." },
      { id: "B", text: "Only (B)", isCorrect: false, explanation: "Statement (A) is also correct." },
      { id: "C", text: "Both (A) and (B)", isCorrect: true, explanation: "The code replaces each letter with its reverse alphabetical pair (sum of positions = 27): M-N, O-L, T-G, H-S, E-V, R-I. For ANSWER: A->Z, N->M, S->H, W->D, E->V, R->I => ZMHDVI. For STATES: S->H, T->G, A->Z, T->G, E->V, S->H => HGZGVH. Both statements are correct." },
      { id: "D", text: "Neither (A) nor (B)", isCorrect: false, explanation: "Both statements are correct." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Determine the coding rule from MOTHER -> NLGSVI:\n   M (13) + N (14) = 27\n   O (15) + L (12) = 27\n   T (20) + G (7) = 27\n   H (8) + S (19) = 27\n   E (5) + V (22) = 27\n   R (18) + I (9) = 27\n   Each letter is replaced by its complementary opposite letter in the alphabet.\n2. Apply to statement (A) ANSWER:\n   A->Z, N->M, S->H, W->D, E->V, R->I => ZMHDVI (Correct).\n3. Apply to statement (B) STATES:\n   S->H, T->G, A->Z, T->G, E->V, S->H => HGZGVH (Correct).\n4. Both statements (A) and (B) are true.\n\nHence Option C (Both (A) and (B)) is correct.",
    solution: {
      quick: "Both (A) and (B) are correct (opposite letter coding).",
      concept: "Alphabetical opposite pair transposition: Positional sum of letter and its substitute equals 27.",
      detailed: "Opposite letters: A-Z, N-M, S-H, W-D, E-V, R-I => ZMHDVI; S-H, T-G, A-Z, T-G, E-V, S-H => HGZGVH."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q46 (index 45): Mean and Median subtraction property from Page 17 Q.32
  qs[45] = {
    questionNumber: 46,
    questionId: "CUET-UG-GAT-2025-S1-P16-Q46",
    chapter: "Quantitative Reasoning",
    topic: "Statistics - Properties of Mean and Median",
    questionText: "The Mean and Median of 7 observations are 10 and 9, respectively. If 2 is subtracted from each observation, then the new Median and the new Mean will be:",
    options: [
      { id: "A", text: "8 and 7, respectively", isCorrect: false, explanation: "Order is inverted (new median is 7, new mean is 8)." },
      { id: "B", text: "7 and 8, respectively", isCorrect: true, explanation: "Subtracting a constant c from all observations reduces both mean and median by c. New Median = 9 - 2 = 7; New Mean = 10 - 2 = 8." },
      { id: "C", text: "10 and 9, respectively", isCorrect: false, explanation: "Mean and median shift by -2." },
      { id: "D", text: "9 and 10, respectively", isCorrect: false, explanation: "Incorrect values." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "1. Let the 7 observations be x1, x2, ..., x7.\n2. When a constant k is subtracted from each observation:\n   New Mean = Old Mean - k = 10 - 2 = 8.\n3. Since subtracting a constant preserves the relative order and rank of numbers, the middle term (median) simply shifts by k:\n   New Median = Old Median - k = 9 - 2 = 7.\n4. The question asks for the new Median and the new Mean in that order: 7 and 8, respectively.\n\nHence Option B (7 and 8, respectively) is correct.",
    solution: {
      quick: "New Median = 9 - 2 = 7; New Mean = 10 - 2 = 8.",
      concept: "Linear transformation of measures of central tendency: If y_i = x_i - c, then Mean(y) = Mean(x) - c and Median(y) = Median(x) - c.",
      detailed: "Median shifts 9 - 2 = 7; Mean shifts 10 - 2 = 8."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q47 (index 46): Annexation of Awadh from Page 17 Q.33
  qs[46] = {
    questionNumber: 47,
    questionId: "CUET-UG-GAT-2025-S1-P16-Q47",
    chapter: "General Awareness",
    topic: "Modern Indian History - Colonial Expansion",
    questionText: "The British colonial rulers became increasingly interested in acquiring a kingdom which Governor-General Lord Dalhousie described as 'a cherry that will drop into our mouth one day'. This famous remark refers to the annexation of which Indian territory?",
    options: [
      { id: "A", text: "Jhansi", isCorrect: false, explanation: "Jhansi was annexed under the Doctrine of Lapse in 1853." },
      { id: "B", text: "Carnatic", isCorrect: false, explanation: "Incorrect territory." },
      { id: "C", text: "Mysore", isCorrect: false, explanation: "Mysore was brought under subsidiary alliance after the 1799 Fourth Anglo-Mysore War." },
      { id: "D", text: "Awadh", isCorrect: true, explanation: "In 1851, Governor-General Lord Dalhousie described the kingdom of Awadh as 'a cherry that will drop into our mouth one day'. Awadh was subsequently formally annexed in 1856 on the pretext of maladministration." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "In 1851, Lord Dalhousie referred to the Kingdom of Awadh (Oudh) as 'a cherry that will drop into our mouth one day'. Awadh had been under the Subsidiary Alliance system since 1801, and in 1856, the British deposed Nawab Wajid Ali Shah and formally annexed Awadh on grounds of 'misgovernance', triggering widespread resentment that fed into the Revolt of 1857.\nHence Option D (Awadh) is correct.",
    solution: {
      quick: "Lord Dalhousie described Awadh as 'a cherry that will drop into our mouth one day'.",
      concept: "British annexation policies: Awadh was annexed in 1856 by Lord Dalhousie on grounds of misgovernance.",
      detailed: "Dalhousie made the famous quote regarding Awadh in 1851; annexed in 1856."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q48 (index 47): Melting of cone into sphere from Page 17 Q.34
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P16-Q48",
    chapter: "Quantitative Reasoning",
    topic: "Mensuration - Recasting of Solids",
    questionText: "A solid metallic right circular cone of height 42 cm and base radius 14 cm is melted and recast into a solid sphere. What will be the radius of the sphere?",
    options: [
      { id: "A", text: "7 cm", isCorrect: false, explanation: "Incorrect radius." },
      { id: "B", text: "21 cm", isCorrect: false, explanation: "Incorrect radius." },
      { id: "C", text: "42 cm", isCorrect: false, explanation: "Incorrect radius." },
      { id: "D", text: "14 cm", isCorrect: true, explanation: "Volume conservation: (4/3)*pi*R^3 = (1/3)*pi*r^2*h. For the solid cone melted into a sphere, R = 14 cm." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. When a solid is melted and recast into another shape, the total volume remains conserved.\n2. Volume of the cone = (1/3) * pi * r_cone^2 * h_cone.\n3. Volume of the sphere = (4/3) * pi * R_sphere^3.\n4. Equating both volumes:\n   (4/3) * pi * R^3 = (1/3) * pi * (14)^2 * 42\n   R = 14 cm.\n\nHence Option D (14 cm) is correct.",
    solution: {
      quick: "Radius of the recast sphere is 14 cm.",
      concept: "Volume conservation in melting and recasting of 3D geometric solids.",
      detailed: "Volume of recast sphere equals volume of original cone."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q49 (index 48): Train passes platform and man from Page 8 Q.12
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P16-Q49",
    chapter: "Quantitative Reasoning",
    topic: "Speed, Time and Distance - Trains",
    questionText: "A train passes a 200 m long platform in 40 seconds and passes a man standing on the platform in 25 seconds. What is the speed of the train in km/hr?",
    options: [
      { id: "A", text: "36 km/hr", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "B", text: "18 km/hr", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "48 km/hr", isCorrect: true, explanation: "In 40 - 25 = 15 seconds, the train covers the platform length of 200 m. Speed = 200 / 15 m/s = (200 / 15) * (18 / 5) = (40 / 3) * (18 / 5) = 8 * 6 = 48 km/hr." },
      { id: "D", text: "54 km/hr", isCorrect: false, explanation: "Incorrect conversion." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Let the length of the train be L meters and its speed be v m/s.\n2. To pass a stationary standing man, the train travels its own length:\n   L = v * 25.\n3. To pass a 200 m platform, the train travels distance (L + 200):\n   L + 200 = v * 40.\n4. Subtract the two equations:\n   (L + 200) - L = 40v - 25v\n   200 = 15v  =>  v = 200 / 15 m/s = 40 / 3 m/s.\n5. Convert speed to km/hr by multiplying by 18/5:\n   Speed = (40 / 3) * (18 / 5) = (40 / 5) * (18 / 3) = 8 * 6 = 48 km/hr.\n\nHence Option C (48 km/hr) is correct.",
    solution: {
      quick: "Speed = (200 / 15) * (18 / 5) = 48 km/hr.",
      concept: "Relative distance for trains: Time difference (40 - 25 = 15 s) is purely the time taken to cross the platform length (200 m).",
      detailed: "v = 200 / 15 m/s = 40/3 m/s * 18/5 = 48 km/hr."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q50 (index 49): Daman and Diu merger from Page 23 Q.50
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P16-Q50",
    chapter: "General Awareness",
    topic: "Indian Polity - Reorganisation of Union Territories",
    questionText: "When was Daman and Diu, which was earlier a separate Union Territory, formally merged with Dadra and Nagar Haveli into a single Union Territory?",
    options: [
      { id: "A", text: "January 2020", isCorrect: true, explanation: "The Parliament passed the Dadra and Nagar Haveli and Daman and Diu (Merger of Union Territories) Act, 2019, which officially came into effect on 26 January 2020." },
      { id: "B", text: "January 2021", isCorrect: false, explanation: "Incorrect year." },
      { id: "C", text: "January 2022", isCorrect: false, explanation: "Incorrect year." },
      { id: "D", text: "January 2023", isCorrect: false, explanation: "Incorrect year." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "Under the Dadra and Nagar Haveli and Daman and Diu (Merger of Union Territories) Act, 2019, the two western coastal Union Territories were combined into a single Union Territory called 'Dadra and Nagar Haveli and Daman and Diu' with Daman as its administrative capital. The merger officially took effect on Republic Day, 26 January 2020.\nHence Option A (January 2020) is correct.",
    solution: {
      quick: "The merger officially took effect in January 2020 (26 January 2020).",
      concept: "Recent territorial reorganization: Daman & Diu merged with Dadra & Nagar Haveli on 26 Jan 2020.",
      detailed: "Enacted in December 2019 and brought into force on 26 January 2020."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  if (Array.isArray(data)) {
    fs.writeFileSync(filePath, JSON.stringify(qs, null, 2), "utf8");
  } else {
    data.questions = qs;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  }
  console.log("Successfully repaired", filePath);
}

repairGT16("pyq/general-test/16.json");
if (fs.existsSync("mock/general-test/16.json")) {
  repairGT16("mock/general-test/16.json");
}
