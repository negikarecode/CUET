const fs = require("fs");

function repairGT12(filePath) {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const qs = Array.isArray(data) ? data : data.questions;

  // Q48 (index 47): Cyclist 170m in 17s -> 6 km time
  qs[47] = {
    questionNumber: 48,
    questionId: "CUET-UG-GAT-2025-S1-P12-Q48",
    chapter: "Quantitative Reasoning",
    topic: "Speed, Distance and Time",
    questionText: "A cyclist covers a distance of 170 meters in 17 seconds. The time taken by the cyclist to cover a distance of 6 km shall be how much?",
    options: [
      { id: "A", text: "60 minutes", isCorrect: false, explanation: "Incorrect time conversion." },
      { id: "B", text: "30 minutes", isCorrect: false, explanation: "Incorrect speed calculation." },
      { id: "C", text: "10 minutes", isCorrect: true, explanation: "Speed = 170 m / 17 s = 10 m/s = 600 m/min. Distance = 6 km = 6000 m. Time = 6000 m / (600 m/min) = 10 minutes." },
      { id: "D", text: "20 minutes", isCorrect: false, explanation: "Incorrect time conversion." }
    ],
    correctOption: "C",
    correctOptionId: "C",
    detailedSolution: "1. Calculate speed in meters per second:\n   Speed = Distance / Time = 170 m / 17 s = 10 m/s.\n2. Convert speed to meters per minute:\n   10 m/s = 10 * 60 = 600 m/min.\n3. Convert required distance to meters:\n   6 km = 6 * 1000 = 6000 m.\n4. Time taken:\n   Time = 6000 m / (600 m/min) = 10 minutes.\n\nHence Option C (10 minutes) is correct.",
    solution: {
      quick: "Time = 6000 m / (10 m/s) = 600 seconds = 10 minutes.",
      concept: "Basic kinematics relation: Time = Distance / Speed.",
      detailed: "Speed = 170/17 = 10 m/s. For 6000 m: t = 6000 / 10 = 600 s = 10 min."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 40
  };

  // Q49 (index 48): Ananyaa ordinary die face opposite square
  qs[48] = {
    questionNumber: 49,
    questionId: "CUET-UG-GAT-2025-S1-P12-Q49",
    chapter: "General Mental Ability",
    topic: "Dice and Cube Reasoning",
    questionText: "Ananyaa rolls an ordinary standard dice and gets the number 2 on the face of the dice. What shall be the square of the number that lies exactly opposite on the dice to the number that Ananyaa got?",
    options: [
      { id: "A", text: "25", isCorrect: true, explanation: "In a standard die, opposite faces sum to 7. The face opposite to 2 is 7 - 2 = 5. The square of 5 is 5^2 = 25." },
      { id: "B", text: "9", isCorrect: false, explanation: "9 is the square of 3, not the face opposite 2." },
      { id: "C", text: "1", isCorrect: false, explanation: "1 is the face opposite 6." },
      { id: "D", text: "16", isCorrect: false, explanation: "16 is the square of 4, which is opposite 3." }
    ],
    correctOption: "A",
    correctOptionId: "A",
    detailedSolution: "1. On a standard, ordinary six-faced die, the sum of numbers on any two opposite faces is always 7.\n2. Since Ananyaa rolled a 2, the number on the opposite face is:\n   Opposite face = 7 - 2 = 5.\n3. The square of this opposite number is:\n   5^2 = 25.\n\nHence Option A (25) is correct.",
    solution: {
      quick: "Opposite face = 7 - 2 = 5. Square = 5^2 = 25.",
      concept: "Standard die property: Sum of opposite faces = 7.",
      detailed: "Opposite to 2 is 5 => 5^2 = 25."
    },
    questionType: "direct-numerical",
    difficulty: 1,
    difficultyLevel: 1,
    estimatedTimeSeconds: 30
  };

  // Q50 (index 49): Meghalaya full statehood year
  qs[49] = {
    questionNumber: 50,
    questionId: "CUET-UG-GAT-2025-S1-P12-Q50",
    chapter: "General Awareness",
    topic: "Indian Polity & Post-Independence History",
    questionText: "In which year did Meghalaya become a full-fledged state, carved from the erstwhile state of Assam?",
    options: [
      { id: "A", text: "1969", isCorrect: false, explanation: "1969 was the Assam Reorganisation (Meghalaya) Act that created an autonomous state within Assam." },
      { id: "B", text: "1970", isCorrect: false, explanation: "In 1970, Meghalaya was an autonomous sub-state." },
      { id: "C", text: "1971", isCorrect: false, explanation: "The North-Eastern Areas (Reorganisation) Act was enacted in December 1971." },
      { id: "D", text: "1972", isCorrect: true, explanation: "Meghalaya achieved full statehood on 21 January 1972 under the North-Eastern Areas (Reorganisation) Act, 1971." }
    ],
    correctOption: "D",
    correctOptionId: "D",
    detailedSolution: "Meghalaya was originally carved out of Assam as an autonomous state in 1970. Under the North-Eastern Areas (Reorganisation) Act of 1971, Meghalaya attained full-fledged statehood within the Indian Union on 21 January 1972.\nHence Option D (1972) is correct.",
    solution: {
      quick: "Meghalaya became a full-fledged state in 1972.",
      concept: "Reorganisation of North-Eastern States: Manipur, Meghalaya, and Tripura attained full statehood in January 1972.",
      detailed: "Full statehood achieved on 21 January 1972."
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

repairGT12("pyq/general-test/12.json");
if (fs.existsSync("mock/general-test/12.json")) {
  repairGT12("mock/general-test/12.json");
}
