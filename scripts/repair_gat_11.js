const fs = require("fs");

function repairGT11(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q43 (index 42): Fibre crops
  qs[42] = {
    questionNumber: 43,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q43",
    chapter: "General Awareness",
    topic: "Indian Agriculture & Crop Classification",
    questionText: "Which among the following are fibre crops?\n(A) Cotton\n(B) Jute\n(C) Hemp\n(D) Berseem\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(A), (B) and (C) only", isCorrect: true, explanation: "Cotton, jute, and hemp are traditional fiber crops grown for their bast/seed fibers. Berseem (Trifolium alexandrinum) is a nutritious fodder crop." },
      { id: "B", text: "(B), (C) and (D) only", isCorrect: false, explanation: "Berseem is a fodder crop, not a fibre crop." },
      { id: "C", text: "(A), (B) and (D) only", isCorrect: false, explanation: "Berseem is a fodder crop, not a fibre crop." },
      { id: "D", text: "(A), (C) and (D) only", isCorrect: false, explanation: "Berseem is a fodder crop, not a fibre crop." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. Fiber crops are field crops grown for their fibers, which are used to make paper, cloth, rope, and bagging materials.\n2. Cotton (Gossypium spp.), Jute (Corchorus spp.), and Sunn Hemp/True Hemp (Cannabis sativa) are primary commercial fiber crops.\n3. Berseem (Egyptian clover) is an important leguminous winter fodder crop used for animal feed.\n\nTherefore, (A), (B) and (C) only are fibre crops.\nHence Option A is correct.",
    solution: {
      quick: "(A), (B) and (C) only are fibre crops.",
      concept: "Classification of agronomic crops into fiber crops (cotton, jute, hemp) and forage/fodder crops (berseem).",
      detailed: "Cotton, jute, and hemp produce fiber. Berseem is an annual clover used as cattle feed."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 40
  };

  // Q44 (index 43): Great Smoky Mountains National Park
  qs[43] = {
    questionNumber: 44,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q44",
    chapter: "General Awareness",
    topic: "World Geography and UNESCO Heritage Sites",
    questionText: "The Great Smoky Mountains National Park, a UNESCO World Heritage Site, is located in which country?",
    options: [
      { id: "A", text: "United States of America", isCorrect: true, explanation: "The Great Smoky Mountains National Park straddles the border between North Carolina and Tennessee in the United States and was designated a UNESCO World Heritage Site in 1983." },
      { id: "B", text: "Zimbabwe", isCorrect: false, explanation: "Incorrect country." },
      { id: "C", text: "Australia", isCorrect: false, explanation: "Incorrect country." },
      { id: "D", text: "New Zealand", isCorrect: false, explanation: "Incorrect country." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "The Great Smoky Mountains National Park is located along the Appalachian Mountains on the border of North Carolina and Tennessee in the United States of America. Renowned for its rich biodiversity and ancient mountains, it was inscribed as a UNESCO World Heritage Site in 1983.\nHence Option A (United States of America) is correct.",
    solution: {
      quick: "Located in the United States of America.",
      concept: "Global UNESCO World Heritage Sites and national parks geography.",
      detailed: "Straddles North Carolina and Tennessee in the USA."
    },
    questionType: "conceptual",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 35
  };

  // Q45 (index 44): Golden City of Rajasthan
  qs[44] = {
    questionNumber: 45,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q45",
    chapter: "General Awareness",
    topic: "Indian Geography - Sobriquets of Cities",
    questionText: "Which of the following cities of Rajasthan is known as the 'Golden City'?",
    options: [
      { id: "A", text: "Kota", isCorrect: false, explanation: "Kota is known as the coaching capital or educational city of Rajasthan." },
      { id: "B", text: "Jaisalmer", isCorrect: true, explanation: "Jaisalmer is known as the 'Golden City' because of the golden yellow sandstone used extensively in its architecture and the surrounding Thar Desert sands." },
      { id: "C", text: "Udaipur", isCorrect: false, explanation: "Udaipur is known as the 'City of Lakes' or 'White City'." },
      { id: "D", text: "Jodhpur", isCorrect: false, explanation: "Jodhpur is known as the 'Blue City' or 'Sun City'." }
    ],
    correctOption: "B",
    correctOptionId: "B",
    detailedSolution: "Jaisalmer, located in the Thar Desert of western Rajasthan, is popularly called the 'Golden City' of India. The massive Jaisalmer Fort and ancient havelis are constructed from distinctive yellow-brown sandstone that shimmers like gold under the desert sun.\nHence Option B (Jaisalmer) is correct.",
    solution: {
      quick: "Jaisalmer is known as the Golden City.",
      concept: "Geographical sobriquets of Indian cities: Jaipur (Pink City), Jodhpur (Blue City), Udaipur (City of Lakes/White City), Jaisalmer (Golden City).",
      detailed: "Jaisalmer is crowned by its golden sandstone fort and architecture."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q46 (index 45): The mean of 6 numbers is 19
  qs[45] = {
    questionNumber: 46,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q46",
    chapter: "Quantitative Reasoning",
    topic: "Averages and Statistics",
    questionText: "The mean of 6 numbers is 19. If two more numbers are included, the mean of the 8 numbers becomes 23. What is the sum of the two included numbers?",
    options: [
      { id: "A", text: "72", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "B", text: "68", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "70", isCorrect: true, explanation: "Sum of 6 numbers = 6 * 19 = 114. Sum of 8 numbers = 8 * 23 = 184. Sum of two included numbers = 184 - 114 = 70." },
      { id: "D", text: "67", isCorrect: false, explanation: "Incorrect calculation." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Sum of original 6 numbers = 6 * 19 = 114.\n2. When 2 numbers are added, total numbers = 8.\n3. Sum of all 8 numbers = 8 * 23 = 184.\n4. Sum of the two newly included numbers = 184 - 114 = 70.\n\nHence Option C (70) is correct.",
    solution: {
      quick: "Sum = (8 * 23) - (6 * 19) = 184 - 114 = 70.",
      concept: "Properties of arithmetic mean: Total Sum = Number of items * Mean.",
      detailed: "Difference in total sums = 184 - 114 = 70."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 35
  };

  // Q47 (index 46): Startup India year
  qs[46] = {
    questionNumber: 47,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q47",
    chapter: "Current Affairs & Government Schemes",
    topic: "Major Government Initiatives",
    questionText: "The 'Startup India' initiative to foster entrepreneurship and promote innovation was launched by the Government of India in which year?",
    options: [
      { id: "A", text: "2014", isCorrect: false, explanation: "Make in India was launched in 2014." },
      { id: "B", text: "2015", isCorrect: false, explanation: "Digital India was launched in 2015." },
      { id: "C", text: "2016", isCorrect: true, explanation: "Startup India was officially launched on 16 January 2016 by Prime Minister Narendra Modi." },
      { id: "D", text: "2017", isCorrect: false, explanation: "Incorrect year." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "The 'Startup India' initiative was formally inaugurated by Prime Minister Narendra Modi on 16 January 2016 at Vigyan Bhavan, New Delhi, to build a strong ecosystem for nurturing innovation and startups in India.\nHence Option C (2016) is correct.",
    solution: {
      quick: "Startup India was launched in 2016.",
      concept: "Milestone government schemes: Startup India (January 2016), Digital India (July 2015), Make in India (September 2014).",
      detailed: "Officially launched on 16 January 2016."
    },
    questionType: "conceptual",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q48 (index 47): Alok walking distance
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q48",
    chapter: "General Mental Ability",
    topic: "Direction Sense Test",
    questionText: "Alok walks from point P to point Q which is 6 km away, then turns right and walks for 12 km to point R, again turns right and goes 11 km to point S. What is the shortest distance between points P and S?",
    options: [
      { id: "A", text: "8 km", isCorrect: false, explanation: "Incorrect distance." },
      { id: "B", text: "11 km", isCorrect: false, explanation: "Incorrect distance." },
      { id: "C", text: "10 km", isCorrect: false, explanation: "Incorrect distance." },
      { id: "D", text: "13 km", isCorrect: true, explanation: "Horizontal displacement = 11 - 6 = 5 km. Vertical displacement = 12 km. By Pythagoras theorem, distance PS = sqrt(5^2 + 12^2) = sqrt(25 + 144) = sqrt(169) = 13 km." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. Let P be at origin (0, 0). Walking 6 km East to Q puts Q at (6, 0).\n2. Turning right (facing South) and walking 12 km puts R at (6, -12).\n3. Turning right again (facing West) and walking 11 km puts S at (6 - 11, -12) = (-5, -12).\n4. Shortest straight-line distance between P(0, 0) and S(-5, -12):\n   d = sqrt((-5 - 0)^2 + (-12 - 0)^2) = sqrt(25 + 144) = sqrt(169) = 13 km.\n\nHence Option D (13 km) is correct.",
    solution: {
      quick: "Distance = sqrt(5^2 + 12^2) = 13 km.",
      concept: "Pythagorean triples in direction displacement: (5, 12, 13).",
      detailed: "Displacement along axes is 5 km and 12 km => sqrt(25 + 144) = 13 km."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 45
  };

  // Q49 (index 48): 8 men and 3 boys work
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q49",
    chapter: "Quantitative Reasoning",
    topic: "Time and Work",
    questionText: "8 men and 3 boys together can complete a piece of work in 5 days. If 5 boys can complete the same piece of work in 15 days, in how many days do 5 men complete the same piece of work?",
    options: [
      { id: "A", text: "8 days", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "B", text: "14 days", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "C", text: "12 days", isCorrect: false, explanation: "Incorrect calculation." },
      { id: "D", text: "10 days", isCorrect: true, explanation: "Total work = 5 boys * 15 days = 75 boy-days. 1 boy does 1/75 per day. In 5 days, 3 boys do 5 * 3 * (1/75) = 1/5 work. The 8 men do 1 - 1/5 = 4/5 work in 5 days => 1 man does (4/5)/(8*5) = 1/50 per day. 5 men do 5 * (1/50) = 1/10 work per day => 10 days." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "1. Let 1 man's 1-day work = m, and 1 boy's 1-day work = b.\n2. 5 boys take 15 days, so:\n   5 * b * 15 = 1 => 75b = 1 => b = 1/75.\n3. 8 men and 3 boys take 5 days:\n   5 * (8m + 3b) = 1 => 40m + 15b = 1.\n4. Substitute b = 1/75:\n   40m + 15 * (1/75) = 1\n   40m + 1/5 = 1 => 40m = 4/5 => m = 4 / (5 * 40) = 1/50.\n5. 1 man does 1/50 of the work per day.\n   5 men do 5 * (1/50) = 1/10 of the work per day.\n6. Therefore, 5 men complete the work in 1 / (1/10) = 10 days.\n\nHence Option D (10 days) is correct.",
    solution: {
      quick: "5 men complete the work in 10 days.",
      concept: "Unitary work rate method: equate total work to solve for individual man and boy work rates.",
      detailed: "b = 1/75; 40m + 15(1/75) = 1 => m = 1/50 => 5 men do 5/50 = 1/10 per day => 10 days."
    },
    questionType: "direct-numerical",
    difficulty: 2,
    difficultyLevel: 2,
    estimatedTimeSeconds: 50
  };

  // Q50 (index 49): Mirror image letters
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P11-Q50",
    chapter: "General Mental Ability",
    topic: "Mirror Images and Reflection Symmetry",
    questionText: "Which of the following capital letters of the English Alphabet change(s) in appearance when viewed through a plane mirror?\n(A) W\n(B) N\n(C) S\n(D) T\nChoose the correct answer from the options given below:",
    options: [
      { id: "A", text: "(B) and (C) only", isCorrect: true, explanation: "Letters W and T have vertical line symmetry, so their mirror reflections are identical to the original. Letters N and S lack vertical symmetry, so their mirror reflections appear reversed." },
      { id: "B", text: "(C) only", isCorrect: false, explanation: "Letter N also changes upon reflection." },
      { id: "C", text: "(B), (C) and (D) only", isCorrect: false, explanation: "Letter T does not change because of vertical bilateral symmetry." },
      { id: "D", text: "(B) only", isCorrect: false, explanation: "Letter S also changes upon reflection." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. When viewed in a vertical plane mirror, an object undergoes lateral inversion (left and right swap).\n2. Letters with vertical symmetry (bilateral vertical axis) remain unchanged: W and T look identical in a mirror.\n3. Letters without vertical symmetry change in appearance: N becomes a reversed N, and S becomes a reversed S.\n4. Therefore, only (B) and (C) change in appearance.\n\nHence Option A is correct.",
    solution: {
      quick: "(B) and (C) only change in a mirror.",
      concept: "Vertical symmetry in plane mirror reflections: Letters like A, H, I, M, O, T, U, V, W, X, Y do not change. N and S invert laterally.",
      detailed: "W and T possess vertical symmetry; N and S do not, so they change."
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

repairGT11("pyq/general-test/11.json");
if (fs.existsSync("mock/general-test/11.json")) {
  repairGT11("mock/general-test/11.json");
}
