import {
  generateSubjectRadarAIAnalysis,
  buildDeterministicSubjectRadarAI,
} from "../lib/subject-ai-engine";
import {
  SubjectRadarAIPayload,
} from "../types/subject-ai";
import {
  getCachedSubjectRadarAI,
  setCachedSubjectRadarAI,
} from "../lib/ai-cache";

type PayloadQuestion = SubjectRadarAIPayload["questions"][number];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests += 1;
  if (condition) {
    passedTests += 1;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests += 1;
    console.error(`  [FAIL] ${testName}`);
    if (detail) {
      console.error(`         Reason: ${detail}`);
    }
  }
}

// Helper to construct sample question telemetry
function makeQuestion(
  id: string,
  chapter: string,
  microTopic: string,
  prompt: string,
  isCorrect: boolean,
  timeSeconds: number,
  difficulty: "easy" | "medium" | "hard",
  errorCategory?: string
): PayloadQuestion {
  return {
    questionId: id,
    prompt,
    options: ["A", "B", "C", "D"],
    selectedOption: isCorrect ? "A" : "B",
    correctOption: "A",
    isCorrect,
    chapter,
    microTopic,
    difficulty,
    timeSpentSeconds: timeSeconds,
    errorCategory,
  };
}

const emptyTaxonomy = {
  totalErrors: 0,
  conceptualGapCount: 0,
  applicationGapCount: 0,
  calculationCount: 0,
  distractorTrapCount: 0,
  questionInterpretationCount: 0,
  factualRecallCount: 0,
  formulaMethodCount: 0,
  carelessCount: 0,
  multiStepReasoningCount: 0,
  timePacingCount: 0,
  guessingCount: 0,
  memoryConfusionCount: 0,
};

async function runAdversarialQASuite() {
  console.log("==================================================================");
  console.log("ADVERSARIAL REAL-DATA QA: SUBJECT WEAKNESS RADAR AI INTEGRATION");
  console.log("==================================================================\n");

  // -------------------------------------------------------------
  // TEST 1: LOW DATA (<5 attempts and 5-9 attempts)
  // -------------------------------------------------------------
  console.log("--> Scenario 1: Low Data (1-4 attempts vs 5-9 attempts)");
  {
    // 1-4 attempts
    const lowDataQuestions: PayloadQuestion[] = [
      makeQuestion("q1", "Electrochemistry", "Nernst Equation", "Calculate EMF", false, 45, "medium", "Conceptual Gap"),
      makeQuestion("q2", "Solutions", "Raoult's Law", "Ideal solution vapor pressure", true, 30, "easy"),
    ];

    const lowPayload: SubjectRadarAIPayload = {
      userId: "test-user-low-data",
      subject: "Chemistry",
      questions: lowDataQuestions,
      deterministicStats: {
        totalAttempted: 2,
        correctCount: 1,
        incorrectCount: 1,
        accuracyPercentage: 50,
        avgTimeSeconds: 37,
        difficultyStats: {
          easy: { attempted: 1, correct: 1, accuracy: 100 },
          medium: { attempted: 1, correct: 0, accuracy: 0 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Electrochemistry", attempted: 1, correct: 0, accuracy: 0, avgTimeSeconds: 45 },
          { chapter: "Solutions", attempted: 1, correct: 1, accuracy: 100, avgTimeSeconds: 30 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 1, conceptualGapCount: 1 },
        diagnosticConfidence: "INSUFFICIENT_EVIDENCE",
        evidenceThresholdLabel: "Insufficient evidence",
      },
    };

    const res1 = await generateSubjectRadarAIAnalysis(lowPayload);
    assert(res1.status === "insufficient_data", "Low Data (2 Qs) returns status 'insufficient_data'");
    assert(res1.diagnosticConfidence === "INSUFFICIENT_EVIDENCE", "Confidence remains authoritative INSUFFICIENT_EVIDENCE");
    assert(res1.keyPatterns.length === 0, "Zero hallucinated key patterns under 5 attempts");
    assert(res1.crossChapterPatterns.length === 0, "Zero hallucinated cross-chapter patterns under 5 attempts");

    // 5-9 attempts (Early signal)
    const earlyQuestions: PayloadQuestion[] = [
      makeQuestion("eq1", "Electrochemistry", "Nernst", "EMF calculation", false, 40, "medium", "Calculation Error"),
      makeQuestion("eq2", "Electrochemistry", "Faraday", "Charge calculation", false, 50, "medium", "Calculation Error"),
      makeQuestion("eq3", "Solutions", "Raoult", "Vapor pressure", true, 30, "easy"),
      makeQuestion("eq4", "Solutions", "Colligative", "Boiling point elevation", true, 35, "medium"),
      makeQuestion("eq5", "Chemical Kinetics", "Rate Law", "Order determination", false, 45, "medium", "Conceptual Gap"),
      makeQuestion("eq6", "Chemical Kinetics", "Arrhenius", "Activation energy", true, 40, "hard"),
    ];

    const earlyPayload: SubjectRadarAIPayload = {
      userId: "test-user-early-signal",
      subject: "Chemistry",
      questions: earlyQuestions,
      deterministicStats: {
        totalAttempted: 6,
        correctCount: 3,
        incorrectCount: 3,
        accuracyPercentage: 50,
        avgTimeSeconds: 40,
        difficultyStats: {
          easy: { attempted: 1, correct: 1, accuracy: 100 },
          medium: { attempted: 4, correct: 1, accuracy: 25 },
          hard: { attempted: 1, correct: 1, accuracy: 100 },
        },
        chapterPerformance: [
          { chapter: "Electrochemistry", attempted: 2, correct: 0, accuracy: 0, avgTimeSeconds: 45 },
          { chapter: "Solutions", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 32 },
          { chapter: "Chemical Kinetics", attempted: 2, correct: 1, accuracy: 50, avgTimeSeconds: 42 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 3, calculationCount: 2, conceptualGapCount: 1 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const resEarly = buildDeterministicSubjectRadarAI(earlyPayload);
    assert(resEarly.diagnosticConfidence === "LOW", "5-9 Qs maintains LOW deterministic confidence");
    assert(resEarly.evidenceThresholdLabel === "Early signal", "Label strictly maintains 'Early signal'");
  }

  // -------------------------------------------------------------
  // TEST 2: SINGLE-CHAPTER WEAKNESS
  // -------------------------------------------------------------
  console.log("\n--> Scenario 2: Single-Chapter Weakness");
  {
    // All mistakes concentrated in Ray Optics; Wave Optics & Mechanics are 100%
    const singleChapQuestions: PayloadQuestion[] = [
      makeQuestion("sq1", "Ray Optics", "Snell Law", "Refraction index", false, 50, "easy", "Conceptual Gap"),
      makeQuestion("sq2", "Ray Optics", "Lens Formula", "Focal length", false, 60, "medium", "Calculation Error"),
      makeQuestion("sq3", "Ray Optics", "Prism", "Angle of deviation", false, 55, "hard", "Calculation Error"),
      makeQuestion("sq4", "Ray Optics", "TIR", "Critical angle", false, 40, "medium", "Conceptual Gap"),
      makeQuestion("sq5", "Wave Optics", "Interference", "Fringe width", true, 35, "medium"),
      makeQuestion("sq6", "Wave Optics", "Diffraction", "Central maxima", true, 40, "easy"),
      makeQuestion("sq7", "Mechanics", "Friction", "Limiting friction", true, 30, "easy"),
      makeQuestion("sq8", "Mechanics", "Work-Energy", "Potential energy", true, 35, "medium"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "test-user-single-chap",
      subject: "Physics",
      questions: singleChapQuestions,
      deterministicStats: {
        totalAttempted: 8,
        correctCount: 4,
        incorrectCount: 4,
        accuracyPercentage: 50,
        avgTimeSeconds: 43,
        difficultyStats: {
          easy: { attempted: 3, correct: 2, accuracy: 67 },
          medium: { attempted: 4, correct: 2, accuracy: 50 },
          hard: { attempted: 1, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Ray Optics", attempted: 4, correct: 0, accuracy: 0, avgTimeSeconds: 51 },
          { chapter: "Wave Optics", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 37 },
          { chapter: "Mechanics", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 32 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 4, conceptualGapCount: 2, calculationCount: 2 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    assert(res.crossChapterPatterns.length === 0, "No cross-chapter pattern invented when mistakes are in 1 chapter only");
    assert(res.priorityAreas.some((p) => p.recommendedDrillTopic === "Ray Optics"), "Ray Optics accurately identified as the priority repair target");
  }

  // -------------------------------------------------------------
  // TEST 3: CROSS-CHAPTER PATTERN
  // -------------------------------------------------------------
  console.log("\n--> Scenario 3: Real Cross-Chapter Pattern");
  {
    // Calculation errors in Electrochemistry AND Solutions AND Kinetics
    const crossQuestions: PayloadQuestion[] = [
      makeQuestion("cq1", "Electrochemistry", "Nernst", "EMF calculation", false, 50, "medium", "Calculation Error"),
      makeQuestion("cq2", "Solutions", "Van 't Hoff", "Osmotic pressure numerical", false, 60, "medium", "Calculation Error"),
      makeQuestion("cq3", "Chemical Kinetics", "Rate Constant", "Half-life numerical", false, 55, "medium", "Calculation Error"),
      makeQuestion("cq4", "Solid State", "Bragg Law", "Lattice calculation", true, 40, "medium"),
      makeQuestion("cq5", "Solutions", "Henry Law", "Solubility constant", true, 30, "easy"),
      makeQuestion("cq6", "Electrochemistry", "Conductivity", "Kohlrausch Law", true, 35, "easy"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "test-user-cross-chap",
      subject: "Chemistry",
      questions: crossQuestions,
      deterministicStats: {
        totalAttempted: 6,
        correctCount: 3,
        incorrectCount: 3,
        accuracyPercentage: 50,
        avgTimeSeconds: 45,
        difficultyStats: {
          easy: { attempted: 2, correct: 2, accuracy: 100 },
          medium: { attempted: 4, correct: 1, accuracy: 25 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Electrochemistry", attempted: 2, correct: 1, accuracy: 50, avgTimeSeconds: 42 },
          { chapter: "Solutions", attempted: 2, correct: 1, accuracy: 50, avgTimeSeconds: 45 },
          { chapter: "Chemical Kinetics", attempted: 1, correct: 0, accuracy: 0, avgTimeSeconds: 55 },
          { chapter: "Solid State", attempted: 1, correct: 1, accuracy: 100, avgTimeSeconds: 40 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 3, calculationCount: 3 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    assert(res.crossChapterPatterns.length >= 1, "Cross-chapter pattern detected across multiple chapters");
    const calcPattern = res.crossChapterPatterns.find((p) => p.pattern.includes("Numerical") || p.pattern.includes("Calculation"));
    assert(Boolean(calcPattern), "Identifies numerical calculation setup as a transferable pattern");
    assert(
      calcPattern ? calcPattern.chapters.length >= 2 : false,
      "Groups at least 2 distinct chapters (Electrochemistry, Solutions, Kinetics)"
    );
  }

  // -------------------------------------------------------------
  // TEST 4: DIFFERENT PROBLEMS, SAME ACCURACY
  // -------------------------------------------------------------
  console.log("\n--> Scenario 4: Different Problems, Same Accuracy");
  {
    // Student A: 50% accuracy due to qualifier / NOT traps
    const studentAQuestions: PayloadQuestion[] = [
      makeQuestion("sa1", "Biology", "Genetics", "Which of the following is NOT true?", false, 25, "medium", "Distractor Trap"),
      makeQuestion("sa2", "Biology", "Ecology", "All EXCEPT one are abiotic factors:", false, 20, "medium", "Question Interpretation"),
      makeQuestion("sa3", "Biology", "Genetics", "DNA replication", true, 30, "easy"),
      makeQuestion("sa4", "Biology", "Ecology", "Food chains", true, 28, "easy"),
      makeQuestion("sa5", "Biology", "Cell", "Organelles", true, 20, "easy"),
      makeQuestion("sa6", "Biology", "Cell", "Mitosis", true, 22, "easy"),
    ];

    // Student B: 50% accuracy due to core NCERT theoretical confusion
    const studentBQuestions: PayloadQuestion[] = [
      makeQuestion("sb1", "Biology", "Genetics", "Mendelian ratios definition", false, 55, "medium", "Conceptual Gap"),
      makeQuestion("sb2", "Biology", "Genetics", "Incomplete dominance mechanism", false, 60, "medium", "Conceptual Gap"),
      makeQuestion("sb3", "Biology", "Ecology", "Biomass pyramid", true, 25, "easy"),
      makeQuestion("sb4", "Biology", "Ecology", "Nutrient cycles", true, 30, "easy"),
      makeQuestion("sb5", "Biology", "Cell", "Organelles", true, 20, "easy"),
      makeQuestion("sb6", "Biology", "Cell", "Mitosis", true, 22, "easy"),
    ];

    const payloadA: SubjectRadarAIPayload = {
      userId: "student-a",
      subject: "Biology",
      questions: studentAQuestions,
      deterministicStats: {
        totalAttempted: 6,
        correctCount: 4,
        incorrectCount: 2,
        accuracyPercentage: 67,
        avgTimeSeconds: 24,
        difficultyStats: {
          easy: { attempted: 4, correct: 4, accuracy: 100 },
          medium: { attempted: 2, correct: 0, accuracy: 0 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Genetics", attempted: 2, correct: 1, accuracy: 50, avgTimeSeconds: 27 },
          { chapter: "Ecology", attempted: 2, correct: 1, accuracy: 50, avgTimeSeconds: 24 },
          { chapter: "Cell", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 21 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, questionInterpretationCount: 1, distractorTrapCount: 1 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const payloadB: SubjectRadarAIPayload = {
      userId: "student-b",
      subject: "Biology",
      questions: studentBQuestions,
      deterministicStats: {
        totalAttempted: 6,
        correctCount: 4,
        incorrectCount: 2,
        accuracyPercentage: 67,
        avgTimeSeconds: 40,
        difficultyStats: {
          easy: { attempted: 4, correct: 4, accuracy: 100 },
          medium: { attempted: 2, correct: 0, accuracy: 0 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Genetics", attempted: 2, correct: 0, accuracy: 0, avgTimeSeconds: 57 },
          { chapter: "Ecology", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 27 },
          { chapter: "Cell", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 21 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, conceptualGapCount: 2 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const resA = buildDeterministicSubjectRadarAI(payloadA);
    const resB = buildDeterministicSubjectRadarAI(payloadB);

    const aHasInterpretation = resA.keyPatterns.some((p) => p.classification === "QUESTION_INTERPRETATION");
    const bHasKnowledge = resB.keyPatterns.some((p) => p.classification === "KNOWLEDGE_PROBLEM");

    assert(aHasInterpretation, "Student A diagnosed with QUESTION_INTERPRETATION (NOT/EXCEPT)");
    assert(bHasKnowledge, "Student B diagnosed with KNOWLEDGE_PROBLEM (Conceptual discrimination)");
    assert(
      resA.keyPatterns[0]?.title !== resB.keyPatterns[0]?.title,
      "Diagnoses are materially different despite identical overall accuracy"
    );
  }

  // -------------------------------------------------------------
  // TEST 5: DIFFICULTY PARADOX
  // -------------------------------------------------------------
  console.log("\n--> Scenario 5: Difficulty Paradox (Normal vs Reverse Paradox)");
  {
    // Normal: Easy 90%, Med 70%, Hard 30%
    const normalPayload: SubjectRadarAIPayload = {
      userId: "user-norm",
      subject: "Maths",
      questions: [
        makeQuestion("nm1", "Calculus", "Limits", "Direct limit", true, 25, "easy"),
        makeQuestion("nm2", "Calculus", "Continuity", "Standard continuity", true, 35, "medium"),
        makeQuestion("nm3", "Calculus", "Integration", "By parts", false, 90, "hard", "Calculation Error"),
        makeQuestion("nm4", "Calculus", "Differential", "Order and degree", true, 20, "easy"),
        makeQuestion("nm5", "Calculus", "Definite Int", "Properties", false, 110, "hard", "Calculation Error"),
      ],
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 56,
        difficultyStats: {
          easy: { attempted: 2, correct: 2, accuracy: 100 },
          medium: { attempted: 1, correct: 1, accuracy: 100 },
          hard: { attempted: 2, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [{ chapter: "Calculus", attempted: 5, correct: 3, accuracy: 60, avgTimeSeconds: 56 }],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, calculationCount: 2 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const resNormal = buildDeterministicSubjectRadarAI(normalPayload);
    assert(resNormal.difficultyAnalysis.easy.includes("Strong foundation"), "Normal: Easy recognized as Strong foundation");
    assert(resNormal.difficultyAnalysis.hard.includes("Steep drop"), "Normal: Hard recognized as steep drop");

    // Reverse: Easy 25% (missed direct questions), Hard 100% (solved complex multi-step)
    const reversePayload: SubjectRadarAIPayload = {
      userId: "user-rev",
      subject: "Maths",
      questions: [
        makeQuestion("rm1", "Algebra", "Matrices", "Order of matrix", false, 15, "easy", "Conceptual Gap"),
        makeQuestion("rm2", "Algebra", "Determinants", "Value of 2x2", false, 18, "easy", "Conceptual Gap"),
        makeQuestion("rm3", "Algebra", "Matrices", "Symmetric definition", false, 14, "easy", "Conceptual Gap"),
        makeQuestion("rm4", "Algebra", "Matrices", "Inverse formula", true, 30, "easy"),
        makeQuestion("rm5", "Algebra", "System of Eq", "Cramer's multi-step rank integration", true, 90, "hard"),
        makeQuestion("rm6", "Algebra", "Determinants", "Complex eigenvalue application", true, 85, "hard"),
      ],
      deterministicStats: {
        totalAttempted: 6,
        correctCount: 3,
        incorrectCount: 3,
        accuracyPercentage: 50,
        avgTimeSeconds: 42,
        difficultyStats: {
          easy: { attempted: 4, correct: 1, accuracy: 25 },
          medium: { attempted: 0, correct: 0, accuracy: 0 },
          hard: { attempted: 2, correct: 2, accuracy: 100 },
        },
        chapterPerformance: [{ chapter: "Algebra", attempted: 6, correct: 3, accuracy: 50, avgTimeSeconds: 42 }],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 3, conceptualGapCount: 3 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const resReverse = buildDeterministicSubjectRadarAI(reversePayload);
    assert(resReverse.difficultyAnalysis.easy.includes("Vulnerability on direct questions"), "Reverse Paradox: Detects vulnerability on direct questions");
    assert(resReverse.difficultyAnalysis.hard.includes("Superior multi-step competence"), "Reverse Paradox: Detects superior multi-step competence on hard questions");
  }

  // -------------------------------------------------------------
  // TEST 6: KNOWLEDGE VS PERFORMANCE CLASSIFICATION
  // -------------------------------------------------------------
  console.log("\n--> Scenario 6: Knowledge vs Performance vs Interpretation");
  {
    const questions: PayloadQuestion[] = [
      makeQuestion("k1", "Physics", "Mechanics", "Conservation law definition", false, 45, "easy", "Conceptual Gap"),
      makeQuestion("k2", "Physics", "Mechanics", "Work energy theorem statement", false, 40, "medium", "Knowledge Confusion"),
      makeQuestion("p1", "Physics", "Thermodynamics", "Efficiency calculation 1 - T2/T1", false, 80, "medium", "Calculation Error"),
      makeQuestion("p2", "Physics", "Thermodynamics", "Work in isobaric process", false, 85, "medium", "Sign Error"),
      makeQuestion("i1", "Physics", "Waves", "Which statement is NOT true?", false, 20, "medium", "Question Interpretation"),
      makeQuestion("i2", "Physics", "Waves", "All of the following EXCEPT:", false, 18, "medium", "Distractor Trap"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "user-kvp",
      subject: "Physics",
      questions,
      deterministicStats: {
        totalAttempted: 6,
        correctCount: 0,
        incorrectCount: 6,
        accuracyPercentage: 0,
        avgTimeSeconds: 48,
        difficultyStats: {
          easy: { attempted: 1, correct: 0, accuracy: 0 },
          medium: { attempted: 5, correct: 0, accuracy: 0 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Mechanics", attempted: 2, correct: 0, accuracy: 0, avgTimeSeconds: 42 },
          { chapter: "Thermodynamics", attempted: 2, correct: 0, accuracy: 0, avgTimeSeconds: 82 },
          { chapter: "Waves", attempted: 2, correct: 0, accuracy: 0, avgTimeSeconds: 19 },
        ],
        errorTaxonomy: {
          ...emptyTaxonomy,
          totalErrors: 6,
          conceptualGapCount: 2,
          calculationCount: 2,
          questionInterpretationCount: 1,
          distractorTrapCount: 1,
        },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    assert(res.keyPatterns.some((p) => p.classification === "KNOWLEDGE_PROBLEM"), "Detects KNOWLEDGE_PROBLEM from conceptual gaps");
    assert(res.keyPatterns.some((p) => p.classification === "PERFORMANCE_PROBLEM"), "Detects PERFORMANCE_PROBLEM from calculation/sign errors");
    assert(res.keyPatterns.some((p) => p.classification === "QUESTION_INTERPRETATION"), "Detects QUESTION_INTERPRETATION from qualifier traps");
  }

  // -------------------------------------------------------------
  // TEST 7: NO CROSS-CHAPTER EVIDENCE
  // -------------------------------------------------------------
  console.log("\n--> Scenario 7: No Cross-Chapter Evidence Invented");
  {
    // Chapter A has a conceptual gap; Chapter B has an interpretation slip. Different mechanisms!
    const questions: PayloadQuestion[] = [
      makeQuestion("nc1", "Economics", "Microeconomics", "Elasticity formula meaning", false, 45, "easy", "Conceptual Gap"),
      makeQuestion("nc2", "Economics", "Macroeconomics", "Which of the following is NOT in GDP?", false, 20, "medium", "Question Interpretation"),
      makeQuestion("nc3", "Economics", "Microeconomics", "Law of demand", true, 30, "easy"),
      makeQuestion("nc4", "Economics", "Macroeconomics", "Fiscal policy", true, 35, "medium"),
      makeQuestion("nc5", "Economics", "Indian Economy", "NITI Aayog", true, 25, "easy"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "user-no-cross",
      subject: "Economics",
      questions,
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 31,
        difficultyStats: {
          easy: { attempted: 3, correct: 2, accuracy: 67 },
          medium: { attempted: 2, correct: 1, accuracy: 50 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Microeconomics", attempted: 2, correct: 1, accuracy: 50, avgTimeSeconds: 37 },
          { chapter: "Macroeconomics", attempted: 2, correct: 1, accuracy: 50, avgTimeSeconds: 27 },
          { chapter: "Indian Economy", attempted: 1, correct: 1, accuracy: 100, avgTimeSeconds: 25 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, conceptualGapCount: 1, questionInterpretationCount: 1 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    assert(res.crossChapterPatterns.length === 0, "Does NOT invent transferable pattern simply because two chapters have 50% accuracy");
  }

  // -------------------------------------------------------------
  // TEST 8: CORRECT BUT SLOW
  // -------------------------------------------------------------
  console.log("\n--> Scenario 8: Correct But Slow");
  {
    // Questions are 100% correct, but time is 95s and 110s
    const questions: PayloadQuestion[] = [
      makeQuestion("sl1", "Physics", "Current Electricity", "Kirchhoff Loop Rule", true, 95, "hard"),
      makeQuestion("sl2", "Physics", "Current Electricity", "Potentiometer balance", true, 110, "hard"),
      makeQuestion("sl3", "Physics", "Current Electricity", "Ohm's law", true, 30, "easy"),
      makeQuestion("sl4", "Physics", "Current Electricity", "Drift velocity", true, 35, "medium"),
      makeQuestion("sl5", "Physics", "Current Electricity", "Resistance wire", true, 28, "easy"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "user-slow-correct",
      subject: "Physics",
      questions,
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 5,
        incorrectCount: 0,
        accuracyPercentage: 100,
        avgTimeSeconds: 59,
        difficultyStats: {
          easy: { attempted: 2, correct: 2, accuracy: 100 },
          medium: { attempted: 1, correct: 1, accuracy: 100 },
          hard: { attempted: 2, correct: 2, accuracy: 100 },
        },
        chapterPerformance: [{ chapter: "Current Electricity", attempted: 5, correct: 5, accuracy: 100, avgTimeSeconds: 59 }],
        errorTaxonomy: emptyTaxonomy,
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    const hasPacingObs = res.performancePatterns.some((p) => p.includes("Pacing observation") && p.includes(">80s"));
    assert(hasPacingObs, "Correct-but-slow surfaced as pacing observation rather than accuracy weakness");
    assert(Boolean(res.learningProfile.weaknesses[0]?.includes("No critical chapter failures")), "Does not label 100% chapter as a knowledge weakness");
  }

  // -------------------------------------------------------------
  // TEST 9: VERY FAST RESPONSES (OBSERVATIONAL LANGUAGE ONLY)
  // -------------------------------------------------------------
  console.log("\n--> Scenario 9: Very Fast Responses (Zero Psychological Guessing)");
  {
    const questions: PayloadQuestion[] = [
      makeQuestion("vf1", "History", "Harappan Civilization", "Town planning", true, 8, "easy"),
      makeQuestion("vf2", "History", "Harappan Civilization", "Great Bath location", false, 9, "easy", "Factual Slip"),
      makeQuestion("vf3", "History", "Harappan Civilization", "Seals material", true, 11, "easy"),
      makeQuestion("vf4", "History", "Harappan Civilization", "Drainage system", false, 7, "medium", "Factual Slip"),
      makeQuestion("vf5", "History", "Harappan Civilization", "Bronze statue", true, 10, "easy"),
    ];

    const payload: SubjectRadarAIPayload = {
      userId: "user-fast",
      subject: "History",
      questions,
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 9,
        difficultyStats: {
          easy: { attempted: 4, correct: 3, accuracy: 75 },
          medium: { attempted: 1, correct: 0, accuracy: 0 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [{ chapter: "Harappan Civilization", attempted: 5, correct: 3, accuracy: 60, avgTimeSeconds: 9 }],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, factualRecallCount: 2 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    const serialized = JSON.stringify(res).toLowerCase();
    const noPsychologicalTerms = !serialized.includes("you guessed") && !serialized.includes("careless") && !serialized.includes("you panicked");
    assert(noPsychologicalTerms, "Strictly avoids psychological claims ('you guessed', 'careless', 'panicked')");
    const hasTelemetryObs = res.performancePatterns.some((p) => p.includes("Telemetry observation") && p.includes("under 15s"));
    assert(hasTelemetryObs, "Uses neutral observational telemetry phrasing ('Telemetry observation: X questions answered in under 15s')");
  }

  // -------------------------------------------------------------
  // TEST 10: CYCLE COMPARISON OBSERVATIONS
  // -------------------------------------------------------------
  console.log("\n--> Scenario 10: Diagnostic Cycle Comparison");
  {
    const payloadWithCycle: SubjectRadarAIPayload = {
      userId: "user-cycle-test",
      subject: "Chemistry",
      questions: [
        makeQuestion("c1", "Chemistry", "Solutions", "Raoult Law", true, 30, "easy"),
        makeQuestion("c2", "Chemistry", "Solutions", "Colligative", true, 35, "medium"),
        makeQuestion("c3", "Chemistry", "Electrochem", "Nernst", false, 50, "medium", "Sign Error"),
        makeQuestion("c4", "Chemistry", "Electrochem", "Faraday", false, 55, "medium", "Sign Error"),
        makeQuestion("c5", "Chemistry", "Kinetics", "Rate Law", true, 40, "medium"),
      ],
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 42,
        difficultyStats: {
          easy: { attempted: 1, correct: 1, accuracy: 100 },
          medium: { attempted: 4, correct: 2, accuracy: 50 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Solutions", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 32 },
          { chapter: "Electrochem", attempted: 2, correct: 0, accuracy: 0, avgTimeSeconds: 52 },
          { chapter: "Kinetics", attempted: 1, correct: 1, accuracy: 100, avgTimeSeconds: 40 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, calculationCount: 2 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
      cycleInfo: {
        currentCycleNumber: 2,
        currentCycleQuestionCount: 50,
        resolvedWeaknesses: ["Haloalkanes SN1/SN2"],
        recurringWeaknesses: ["Electrochem Nernst Equation"],
      },
    };

    const res = buildDeterministicSubjectRadarAI(payloadWithCycle);
    assert(Boolean(res.cycleIntegration), "Cycle integration object preserved");
    assert(res.cycleIntegration?.currentCycleNumber === 2, "Reflects Cycle 2");
    assert(
      Boolean(res.cycleIntegration?.observations.some((o) => o.includes("Resolved from prior cycle: Haloalkanes SN1/SN2"))),
      "Accurately reports resolved weakness from Cycle 1"
    );
    assert(
      Boolean(res.cycleIntegration?.observations.some((o) => o.includes("Recurring across cycles: Electrochem Nernst Equation"))),
      "Accurately reports recurring weakness across cycles"
    );
  }

  // -------------------------------------------------------------
  // TEST 11: AI FAILURE & DETERMINISTIC FALLBACK
  // -------------------------------------------------------------
  console.log("\n--> Scenario 11: AI Failure & Fallback Resilience");
  {
    // Simulating API unavailable by temporarily swapping API key
    const originalKey = process.env.GROQ_API_KEY;
    delete process.env.GROQ_API_KEY;

    const payload: SubjectRadarAIPayload = {
      userId: "user-fallback",
      subject: "Physics",
      questions: [
        makeQuestion("fb1", "Physics", "Mechanics", "Newton's Laws", false, 45, "easy", "Conceptual Gap"),
        makeQuestion("fb2", "Physics", "Mechanics", "Momentum", false, 50, "medium", "Conceptual Gap"),
        makeQuestion("fb3", "Physics", "Mechanics", "Impulse", true, 30, "easy"),
        makeQuestion("fb4", "Physics", "Mechanics", "Energy", true, 35, "medium"),
        makeQuestion("fb5", "Physics", "Mechanics", "Collisions", true, 40, "hard"),
      ],
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 40,
        difficultyStats: {
          easy: { attempted: 2, correct: 1, accuracy: 50 },
          medium: { attempted: 2, correct: 1, accuracy: 50 },
          hard: { attempted: 1, correct: 1, accuracy: 100 },
        },
        chapterPerformance: [{ chapter: "Mechanics", attempted: 5, correct: 3, accuracy: 60, avgTimeSeconds: 40 }],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, conceptualGapCount: 2 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = await generateSubjectRadarAIAnalysis(payload);
    assert(res.status === "fallback", "Fallback triggers seamlessly without API key");
    assert(res.subjectSummary.includes("Analyzed 5 qualifying questions"), "Deterministic summary populated with accurate attempt stats");
    assert(res.keyPatterns.length > 0, "Deterministic key patterns populated without crash");

    // Restore environment
    if (originalKey) {
      process.env.GROQ_API_KEY = originalKey;
    }
  }

  // -------------------------------------------------------------
  // TEST 12: CACHE VERIFICATION
  // -------------------------------------------------------------
  console.log("\n--> Scenario 12: Telemetry Cache Verification");
  {
    const userId = "cache-test-user";
    const subjectKey = "chemistry";
    const fingerprint = "150_72_2_50";
    const dummyAnalysis = {
      subject: "Chemistry",
      generatedAt: new Date().toISOString(),
      status: "completed" as const,
      diagnosticConfidence: "HIGH" as const,
      evidenceThresholdLabel: "Established weakness" as const,
      subjectSummary: "Cached report test",
      keyPatterns: [],
      knowledgePatterns: [],
      performancePatterns: [],
      interpretationPatterns: [],
      crossChapterPatterns: [],
      difficultyAnalysis: { easy: "ok", medium: "ok", hard: "ok" },
      priorityAreas: [],
      learningProfile: {
        strengths: [],
        weaknesses: [],
        recurringIssues: [],
        transferableIssues: [],
        difficultyPattern: "Normal",
        recommendedFocus: [],
      },
    };

    setCachedSubjectRadarAI(userId, subjectKey, fingerprint, dummyAnalysis);
    const retrieved = getCachedSubjectRadarAI(userId, subjectKey, fingerprint);
    assert(retrieved !== null, "Cache hits on identical userId, subject, and fingerprint");
    assert(retrieved?.subjectSummary === "Cached report test", "Cached object contents retrieved intact");

    const diffFingerprint = getCachedSubjectRadarAI(userId, subjectKey, "151_72_2_51");
    assert(diffFingerprint === null, "Cache properly misses when question count increments");
  }

  // -------------------------------------------------------------
  // TEST 13: REPAIR CONNECTION
  // -------------------------------------------------------------
  console.log("\n--> Scenario 13: Repair Connection Data Integrity");
  {
    const payload: SubjectRadarAIPayload = {
      userId: "user-repair",
      subject: "Physics",
      questions: [
        makeQuestion("rp1", "Ray Optics", "Refraction", "Prism formula", false, 60, "medium", "Conceptual Gap"),
        makeQuestion("rp2", "Ray Optics", "Lenses", "Lensmaker equation", false, 55, "medium", "Calculation Error"),
        makeQuestion("rp3", "Ray Optics", "Mirrors", "Mirror formula", true, 30, "easy"),
        makeQuestion("rp4", "Electrostatics", "Coulomb", "Field calculation", true, 35, "easy"),
        makeQuestion("rp5", "Electrostatics", "Gauss", "Flux through cube", true, 40, "medium"),
      ],
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 44,
        difficultyStats: {
          easy: { attempted: 2, correct: 2, accuracy: 100 },
          medium: { attempted: 3, correct: 1, accuracy: 33 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [
          { chapter: "Ray Optics", attempted: 3, correct: 1, accuracy: 33, avgTimeSeconds: 48 },
          { chapter: "Electrostatics", attempted: 2, correct: 2, accuracy: 100, avgTimeSeconds: 37 },
        ],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, conceptualGapCount: 1, calculationCount: 1 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    const topPriority = res.priorityAreas[0];
    assert(Boolean(topPriority), "Priority repair area exists");
    assert(topPriority?.recommendedDrillTopic === "Ray Optics", "Recommended drill topic maps to weakest chapter: Ray Optics");
    assert(
      topPriority?.recommendedDrillType === "5-Question Concept Repair" || topPriority?.recommendedDrillType === "10-Question Application Drill",
      "Assigns standard adaptive drill type"
    );
  }

  // -------------------------------------------------------------
  // TEST 14: EVIDENCE TRACEABILITY
  // -------------------------------------------------------------
  console.log("\n--> Scenario 14: Evidence Traceability");
  {
    const q1 = makeQuestion("trace-q1", "Chemistry", "Solutions", "Which is NOT a colligative property?", false, 25, "medium", "Question Interpretation");
    const q2 = makeQuestion("trace-q2", "Chemistry", "Solutions", "All EXCEPT one are ideal:", false, 22, "medium", "Distractor Trap");
    const q3 = makeQuestion("trace-q3", "Chemistry", "Solutions", "Molality definition", true, 20, "easy");
    const q4 = makeQuestion("trace-q4", "Chemistry", "Solutions", "Molarity definition", true, 24, "easy");
    const q5 = makeQuestion("trace-q5", "Chemistry", "Solutions", "Normality definition", true, 26, "easy");

    const payload: SubjectRadarAIPayload = {
      userId: "user-trace",
      subject: "Chemistry",
      questions: [q1, q2, q3, q4, q5],
      deterministicStats: {
        totalAttempted: 5,
        correctCount: 3,
        incorrectCount: 2,
        accuracyPercentage: 60,
        avgTimeSeconds: 23,
        difficultyStats: {
          easy: { attempted: 3, correct: 3, accuracy: 100 },
          medium: { attempted: 2, correct: 0, accuracy: 0 },
          hard: { attempted: 0, correct: 0, accuracy: 0 },
        },
        chapterPerformance: [{ chapter: "Solutions", attempted: 5, correct: 3, accuracy: 60, avgTimeSeconds: 23 }],
        errorTaxonomy: { ...emptyTaxonomy, totalErrors: 2, questionInterpretationCount: 1, distractorTrapCount: 1 },
        diagnosticConfidence: "LOW",
        evidenceThresholdLabel: "Early signal",
      },
    };

    const res = buildDeterministicSubjectRadarAI(payload);
    const pattern = res.keyPatterns.find((p) => p.classification === "QUESTION_INTERPRETATION");
    assert(Boolean(pattern), "Qualifier pattern found");
    assert(
      pattern ? pattern.evidenceQuestionIds.includes("trace-q1") && pattern.evidenceQuestionIds.includes("trace-q2") : false,
      "Every claim references exact evidenceQuestionIds (trace-q1, trace-q2)"
    );
  }

  console.log("\n==================================================================");
  console.log(`QA SUITE COMPLETE: ${passedTests}/${totalTests} PASSED, ${failedTests} FAILED`);
  console.log("==================================================================");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runAdversarialQASuite().catch((err) => {
  console.error("FATAL in QA Suite:", err);
  process.exit(1);
});
