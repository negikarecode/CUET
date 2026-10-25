const fs = require("fs");

function repairGT15(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q43 (index 42): Calendar reasoning from Page 15 Q.42
  qs[42] = {
    questionNumber: 43,
    questionId: "CUET-UG-GAT-2025-S1-P15-Q43",
    chapter: "General Mental Ability",
    topic: "Calendar Reasoning",
    questionText: "It was Monday on 16 January 2023. What was the day of the week on 12 January 2024?",
    options: [
      { id: "A", text: "Monday", isCorrect: false, explanation: "Incorrect day." },
      { id: "B", text: "Thursday", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "Friday", isCorrect: true, explanation: "From 16 Jan 2023 to 16 Jan 2024 is an ordinary year span of 365 days (February 29 of 2024 has not occurred yet). 365 mod 7 = 1 odd day => 16 Jan 2024 is Tuesday. 12 Jan 2024 is 4 days earlier: Tuesday - 4 days = Friday." },
      { id: "D", text: "Saturday", isCorrect: false, explanation: "Incorrect calculation." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. The interval from 16 January 2023 to 16 January 2024 does not include the leap day of 2024 (29 February).\n2. Total days in this interval = 365 days.\n3. Number of odd days = 365 % 7 = 1 odd day.\n4. Therefore, 16 January 2024 falls on Monday + 1 day = Tuesday.\n5. 12 January 2024 is 4 days prior to 16 January 2024:\n   Tuesday - 4 days = Friday.\n\nHence Option C (Friday) is correct.",
    solution: {
      quick: "12 January 2024 was a Friday.",
      concept: "Calendar odd days counting across consecutive years: Ordinary year contributes 1 odd day.",
      detailed: "16 Jan 2024 is Tuesday (Monday + 1). 12 Jan 2024 is 4 days before Tuesday => Friday."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 40
  };

  // Q50 (index 49): MGNREGA features from Page 19 Q.50
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P15-Q50",
    chapter: "Current Affairs & Government Schemes",
    topic: "Rural Development & Social Welfare",
    questionText: "The National Rural Employment Guarantee Act (NREGA) 2005, now known as Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), was launched on 2nd February 2006. It envisages securing the livelihood of people in rural areas through which of the following provisions?\n(A) Guarantees at least 100 days of wage employment per financial year to every rural household.\n(B) Employment to be given within 15 days of the application for work.\n(C) Employment to be provided within a 5 km radius, else extra travel wages to be paid.\n(D) At least 50% of beneficiaries have to be women.\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B) and (C) only", isCorrect: true, explanation: "Statements (A), (B), and (C) are statutory provisions of MGNREGA. Statement (D) is incorrect because the Act stipulates that at least one-third (33%), not 50%, of the beneficiaries must be women." },
      { id: "B", text: "(A), (B) and (D) only", isCorrect: false, explanation: "Statement (D) is incorrect (statutory women reservation is 33%, not 50%)." },
      { id: "C", text: "(B), (C) and (D) only", isCorrect: false, explanation: "Statement (D) is incorrect." },
      { id: "D", text: "(A), (C) and (D) only", isCorrect: false, explanation: "Statement (D) is incorrect." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "Key legal entitlements under MGNREGA 2005:\n1. 100 days of guaranteed wage employment in a financial year to every rural household whose adult members volunteer for unskilled manual work.\n2. Employment must be provided within 15 days of demand; failing which, an unemployment allowance must be paid by the state government.\n3. Work must be provided within a 5 km radius of the applicant's residence; if beyond 5 km, an additional 10% wage is payable to cover travel and living expenses.\n4. Section 6(1) of Schedule II mandates that at least one-third (33.3%) of beneficiaries should be women, not 50%.\nTherefore, (A), (B) and (C) only are correct.\nHence Option A is correct.",
    solution: {
      quick: "(A), (B) and (C) only are correct provisions of MGNREGA.",
      concept: "Statutory provisions of MGNREGA 2005: 100 days work, 15-day timeline, 5km distance, 33% women participation.",
      detailed: "Statements A, B, C are true. D is false because women quota is at least one-third (33%), not 50%."
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

repairGT15("pyq/general-test/15.json");
if (fs.existsSync("mock/general-test/15.json")) {
  repairGT15("mock/general-test/15.json");
}
