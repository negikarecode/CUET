const fs = require("fs");

function repairGT14(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q47 (index 46): Lezim folk dance of Maharashtra
  qs[46] = {
    questionNumber: 47,
    questionId: "CUET-UG-GAT-2025-S1-P14-Q47",
    chapter: "General Awareness",
    topic: "Indian Art & Culture - Folk Dances",
    questionText: "The 'Lezim' form of folk dance is traditionally associated with which of the following States of India?",
    options: [
      { id: "A", text: "Maharashtra", isCorrect: true, explanation: "Lezim is a vigorous folk dance form from Maharashtra named after the wooden musical instrument with small metal cymbals (jingle sticks) used during Ganesh Chaturthi and other cultural festivals." },
      { id: "B", text: "Nagaland", isCorrect: false, explanation: "Incorrect state." },
      { id: "C", text: "Tamil Nadu", isCorrect: false, explanation: "Incorrect state." },
      { id: "D", text: "Telangana", isCorrect: false, explanation: "Incorrect state." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "Lezim (also spelled Lazim) is a popular folk dance of Maharashtra. Dancers carry a small musical instrument called 'Lezim' (a wooden rod with a chain containing jingling metal discs) and dance to the rhythmic beats of dholki and halgi, showcasing physical fitness, discipline, and acrobatic drill movements.\nHence Option A (Maharashtra) is correct.",
    solution: {
      quick: "Lezim folk dance belongs to Maharashtra.",
      concept: "Traditional folk dances of India: Lezim, Lavani, and Koli are cultural dances of Maharashtra.",
      detailed: "Performed using the Lezim instrument during festivals across Maharashtra."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q48 (index 47): Strategic Petroleum Reserves (ISPRL)
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P14-Q48",
    chapter: "General Awareness",
    topic: "Energy Security and National Infrastructure",
    questionText: "The Government of India through Indian Strategic Petroleum Reserves Limited (ISPRL) has set up Phase-1 underground Strategic Petroleum Reserves (SPR) at which of the following locations with a combined capacity of 5.33 MMT?\n(A) Padur\n(B) Digboi\n(C) Mangaluru\n(D) Visakhapatnam\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B) and (C) only", isCorrect: false, explanation: "Digboi is not an underground Strategic Petroleum Reserve facility." },
      { id: "B", text: "(A), (B) and (D) only", isCorrect: false, explanation: "Digboi is an oil refinery/field, not an SPR." },
      { id: "C", text: "(A), (C) and (D) only", isCorrect: true, explanation: "Under Phase 1, India established 5.33 MMT of strategic crude oil storage in rock caverns at three coastal locations: Visakhapatnam (1.33 MMT), Mangaluru (1.5 MMT), and Padur (2.5 MMT)." },
      { id: "D", text: "(B), (C) and (D) only", isCorrect: false, explanation: "Digboi is not an SPR site." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "Under Phase-1 of the Strategic Petroleum Reserves (SPR) programme, Indian Strategic Petroleum Reserves Limited (ISPRL) constructed 5.33 MMT of underground crude oil storage facilities in subterranean rock caverns at:\n1. Visakhapatnam (Andhra Pradesh) – 1.33 MMT\n2. Mangaluru (Karnataka) – 1.50 MMT\n3. Padur (Karnataka) – 2.50 MMT\nDigboi in Assam is India's oldest refinery and oil town, not part of the ISPRL SPR facilities.\nTherefore, (A), (C) and (D) only are correct.\nHence Option C is correct.",
    solution: {
      quick: "(A), (C) and (D) only are Strategic Petroleum Reserves.",
      concept: "National energy security: Phase-1 SPR locations are Visakhapatnam, Mangaluru, and Padur.",
      detailed: "Padur, Mangaluru, and Visakhapatnam house underground caverns totaling 5.33 MMT."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q49 (index 48): Sahitya Akademi Award 2024 for Punjabi
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P14-Q49",
    chapter: "Current Affairs",
    topic: "Awards and Honors - Sahitya Akademi",
    questionText: "Who among the following was conferred the prestigious Sahitya Akademi Award 2024 for Punjabi literature?",
    options: [
      { id: "A", text: "Gurdial Singh", isCorrect: false, explanation: "Eminent Punjabi novelist and Jnanpith laureate who passed away in 2016." },
      { id: "B", text: "Pal Kaur", isCorrect: true, explanation: "Dr. Pal Kaur won the Sahitya Akademi Award 2024 for Punjabi for her acclaimed autobiographical/literary work." },
      { id: "C", text: "Baldev Singh", isCorrect: false, explanation: "Won the award in 2011 for 'Dhaahan Dilli De Kingre'." },
      { id: "D", text: "Nachhattar Singh", isCorrect: false, explanation: "Won the award in 2017 for 'Slow Down'." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "Dr. Pal Kaur was announced as the recipient of the Sahitya Akademi Award 2024 in the Punjabi language category for her distinguished literary contributions.\nHence Option B (Pal Kaur) is correct.",
    solution: {
      quick: "Pal Kaur was awarded the Sahitya Akademi Award 2024 for Punjabi.",
      concept: "Sahitya Akademi annual awards in 24 Indian languages recognise outstanding literary works.",
      detailed: "Dr. Pal Kaur received the 2024 award for Punjabi."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 35
  };

  // Q50 (index 49): Union Territory of Ladakh land borders
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P14-Q50",
    chapter: "General Awareness",
    topic: "Indian Geography - Political Boundaries",
    questionText: "The Union Territory of Ladakh does NOT share an international land border with which of the following countries?",
    options: [
      { id: "A", text: "Nepal", isCorrect: true, explanation: "Ladakh shares borders with Pakistan (along LOC), China (along LAC), and Afghanistan (in northern PoK). Ladakh does not share any border with Nepal (Uttarakhand, UP, Bihar, WB, and Sikkim border Nepal)." },
      { id: "B", text: "Pakistan", isCorrect: false, explanation: "Ladakh shares a boundary with Pakistan across the Line of Control." },
      { id: "C", text: "China", isCorrect: false, explanation: "Ladakh shares a long border with China (Tibet and Xinjiang) across the Line of Actual Control." },
      { id: "D", text: "Afghanistan", isCorrect: false, explanation: "India's official boundary in northern Ladakh (Wakhan corridor) borders Afghanistan." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. The Union Territory of Ladakh is bounded by Pakistan-administered Kashmir to the west, China (Tibet Autonomous Region and Xinjiang) to the north and east, and officially Afghanistan along the narrow Wakhan Corridor in the northwest.\n2. Nepal is separated from Ladakh by the states of Himachal Pradesh and Uttarakhand.\n3. Therefore, Ladakh does NOT share any land border with Nepal.\n\nHence Option A (Nepal) is correct.",
    solution: {
      quick: "Ladakh does not share a border with Nepal.",
      concept: "International borders of Indian states: Nepal borders Uttarakhand, UP, Bihar, West Bengal, and Sikkim.",
      detailed: "Ladakh borders Pakistan, China, and Afghanistan, but not Nepal."
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

repairGT14("pyq/general-test/14.json");
if (fs.existsSync("mock/general-test/14.json")) {
  repairGT14("mock/general-test/14.json");
}
