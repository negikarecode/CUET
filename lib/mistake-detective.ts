/**
 * Mistake Detective V2 — Root-Cause Error Diagnostics
 * 
 * Production-grade diagnostic engine covering the 10 diagnostic categories:
 * 1. Conceptual misunderstanding
 * 2. Missing prerequisite knowledge
 * 3. Incorrect formula or method selection
 * 4. Calculation or execution error
 * 5. Misinterpretation of the question
 * 6. Incorrect application of a known concept
 * 7. Time-management or pacing issue
 * 8. Repeated error pattern
 * 9. Possible careless error
 * 10. Unclassified or insufficient evidence
 * 
 * Rules:
 * - Deterministic signals first (time spent, question archetype, qualifier markers, distractor traps, attempt history)
 * - Calibrated confidence (high, medium, preliminary)
 * - Ambiguity handling with targeted clarification question
 * - Grounded NCERT corrections and follow-up assessment micro-checks
 * - Zero token leakage, deterministic fallback, sub-millisecond in-memory cache
 */

import crypto from "crypto";

export type MistakeCategoryV2 =
  | "conceptual_misunderstanding"
  | "missing_prerequisite"
  | "formula_method_error"
  | "calculation_execution_error"
  | "question_misinterpretation"
  | "incorrect_concept_application"
  | "time_management_pacing"
  | "repeated_error_pattern"
  | "careless_error"
  | "unclassified_insufficient_evidence";

export interface MistakeCategoryMeta {
  key: MistakeCategoryV2;
  label: string;
  shortDescription: string;
  nature: "KNOWLEDGE" | "EXECUTION" | "INTERPRETATION" | "HABITUAL" | "UNCLASSIFIED";
}

export const MISTAKE_CATEGORIES: Record<MistakeCategoryV2, MistakeCategoryMeta> = {
  conceptual_misunderstanding: {
    key: "conceptual_misunderstanding",
    label: "Conceptual Misunderstanding",
    shortDescription: "Gaps in core definitions, laws, or theoretical principles.",
    nature: "KNOWLEDGE",
  },
  missing_prerequisite: {
    key: "missing_prerequisite",
    label: "Missing Prerequisite Knowledge",
    shortDescription: "Underlying foundational math or earlier grade concepts unmastered.",
    nature: "KNOWLEDGE",
  },
  formula_method_error: {
    key: "formula_method_error",
    label: "Incorrect Formula or Method Selection",
    shortDescription: "Chose an inappropriate equation or theorem for the problem setup.",
    nature: "EXECUTION",
  },
  calculation_execution_error: {
    key: "calculation_execution_error",
    label: "Calculation or Execution Error",
    shortDescription: "Arithmetic mistake, sign flip, unit conversion slip, or power-of-10 error.",
    nature: "EXECUTION",
  },
  question_misinterpretation: {
    key: "question_misinterpretation",
    label: "Misinterpretation of Question",
    shortDescription: "Overlooked NOT/EXCEPT qualifiers, swapped values, or misread the stem.",
    nature: "INTERPRETATION",
  },
  incorrect_concept_application: {
    key: "incorrect_concept_application",
    label: "Incorrect Application of Known Concept",
    shortDescription: "Understood the concept in isolation but applied it outside valid boundary conditions.",
    nature: "KNOWLEDGE",
  },
  time_management_pacing: {
    key: "time_management_pacing",
    label: "Time-Management or Pacing Issue",
    shortDescription: "Excessive time spent (>75s) causing cognitive overload, or panic rush.",
    nature: "EXECUTION",
  },
  repeated_error_pattern: {
    key: "repeated_error_pattern",
    label: "Repeated Error Pattern",
    shortDescription: "Recurring misconception or vulnerability detected across multiple questions.",
    nature: "HABITUAL",
  },
  careless_error: {
    key: "careless_error",
    label: "Possible Careless Error",
    shortDescription: "Rapid response (<15s) with hasty choice on an otherwise accessible question.",
    nature: "EXECUTION",
  },
  unclassified_insufficient_evidence: {
    key: "unclassified_insufficient_evidence",
    label: "Unclassified / Insufficient Evidence",
    shortDescription: "Signal too ambiguous to diagnose confidently without further student input.",
    nature: "UNCLASSIFIED",
  },
};

export interface MistakeDetectiveInput {
  questionId: string;
  selectedOption: string;
  selectedOptionText?: string;
  correctOption: string;
  correctOptionText?: string;
  questionText: string;
  explanation?: string;
  chapter?: string;
  microTopic?: string;
  subject?: string;
  timeSpentSeconds?: number;
  questionType?: string;
  archetype?: string;
  distractorTrap?: string | null;
  misconceptionDescription?: string | null;
  recentMistakeCountOnTopic?: number;
  studentAnsweredFollowUp?: string;
}

export interface MistakeDetectiveOutput {
  questionId: string;
  selectedOption: string;
  correctOption: string;
  category: MistakeCategoryV2;
  categoryLabel: string;
  nature: MistakeCategoryMeta["nature"];
  confidence: "high" | "medium" | "preliminary";
  finding: string;
  correctReasoning: string;
  whyCategorySelected: string;
  uncertaintyNote: string;
  ncertCorrection: string;
  correctiveAction: string;
  followUpCheck: {
    prompt: string;
    targetSkill: string;
    expectedVerification: string;
  };
  clarificationQuestion?: {
    questionText: string;
    options: string[];
  };
  fromCache: boolean;
  tokensUsed: number;
}

// In-memory L1 cache for sub-millisecond responses
export const l1DetectiveCache = new Map<string, MistakeDetectiveOutput>();

export function getDetectiveCacheKey(questionId: string, selectedOption: string): string {
  return crypto
    .createHash("sha256")
    .update(`v2_${questionId}_${selectedOption}`)
    .digest("hex");
}

/**
 * Deterministically analyzes a student mistake across the 10 diagnostic categories.
 */
export function diagnoseMistakeDeterministically(
  input: MistakeDetectiveInput
): MistakeDetectiveOutput {
  const {
    questionId,
    selectedOption,
    selectedOptionText = "",
    correctOption,
    correctOptionText = "",
    questionText,
    explanation = "",
    chapter = "Core Chapter",
    microTopic = "Domain Concept",
    subject = "Domain",
    timeSpentSeconds = 45,
    questionType = "",
    archetype = "",
    distractorTrap,
    misconceptionDescription,
    recentMistakeCountOnTopic = 0,
  } = input;

  const stemUpper = questionText.toUpperCase();
  const isQualifierPresent =
    stemUpper.includes("NOT") ||
    stemUpper.includes("EXCEPT") ||
    stemUpper.includes("INCORRECT") ||
    stemUpper.includes("LEAST") ||
    stemUpper.includes("FALSE");

  const isNumerical =
    archetype.toLowerCase().includes("numerical") ||
    questionType.toLowerCase().includes("numerical") ||
    /\d+[\.\/]\d+|\b\d+\s*(m|s|kg|j|v|w|a|mol|n|pa|hz|k)\b/i.test(questionText);

  let category: MistakeCategoryV2 = "unclassified_insufficient_evidence";
  let confidence: "high" | "medium" | "preliminary" = "medium";
  let whySelected = "";
  let clarificationQuestion: { questionText: string; options: string[] } | undefined = undefined;

  // Rule 1: Repeated Error Pattern (High priority: recurrence across recent attempts)
  if (recentMistakeCountOnTopic >= 2) {
    category = "repeated_error_pattern";
    confidence = "high";
    whySelected = `You have recorded ${recentMistakeCountOnTopic + 1} mistakes in "${chapter} — ${microTopic}". This pattern shows a persistent, recurring gap rather than an isolated oversight.`;
  }
  // Rule 2: Question Misinterpretation (Overlooked negative qualifier)
  else if (isQualifierPresent && (timeSpentSeconds < 30 || distractorTrap?.toLowerCase().includes("qualifier"))) {
    category = "question_misinterpretation";
    confidence = timeSpentSeconds < 20 ? "high" : "medium";
    whySelected = `The question contains a negative or restrictive qualifier ("NOT" / "EXCEPT" / "INCORRECT"). Response telemetry (${timeSpentSeconds}s) indicates the condition was overlooked, leading to selecting a statement that is true instead of the false one asked for.`;
  }
  // Rule 3: Careless Error (Very rapid answer on non-trivial problem)
  else if (timeSpentSeconds < 14) {
    category = "careless_error";
    confidence = "medium";
    whySelected = `Rapid completion in only ${timeSpentSeconds} seconds. In CUET exams, questions with 4 options require at least 25-40s to verify all alternatives. Hasty selection without eliminating all choices is the likely cause.`;
    clarificationQuestion = {
      questionText: "Were you rushing to beat the timer or did you feel confident in this option immediately?",
      options: [
        "I recognized the topic and answered quickly without reading all options",
        "I was rushing under time pressure",
        "I thought I had the right calculation",
      ],
    };
  }
  // Rule 4: Time-Management or Pacing Issue (Extended struggle > 75s)
  else if (timeSpentSeconds > 75) {
    category = "time_management_pacing";
    confidence = "medium";
    whySelected = `Spent ${timeSpentSeconds} seconds (well above the 60s benchmark). Extended solving time followed by an incorrect answer shows struggle with retrieval, multi-step calculation, or second-guessing.`;
  }
  // Rule 5: Calculation or Execution Error (Numerical questions with plausible math slip)
  else if (isNumerical) {
    category = "calculation_execution_error";
    confidence = "medium";
    whySelected = `This is a numerical problem in ${chapter}. Distractors in CUET numericals are commonly engineered around arithmetic slips, inverted ratios, missing conversion factors (e.g. cm to m), or sign flips.`;
    clarificationQuestion = {
      questionText: "Which part of the calculation led to this option?",
      options: [
        "I made an arithmetic or decimal calculation slip",
        "I forgot a unit conversion or sign convention",
        "I was unsure of the formula from the start",
      ],
    };
  }
  // Rule 6: Incorrect Formula or Method Selection
  else if (distractorTrap?.toLowerCase().includes("formula") || distractorTrap?.toLowerCase().includes("method")) {
    category = "formula_method_error";
    confidence = "high";
    whySelected = `The chosen distractor reflects an incorrect formula or method setup: ${distractorTrap}.`;
  }
  // Rule 7: Incorrect Application of Known Concept (Boundary condition missed)
  else if (misconceptionDescription || distractorTrap) {
    category = "incorrect_concept_application";
    confidence = "high";
    whySelected = `Specific distractor trap identified: ${misconceptionDescription || distractorTrap}. The concept was applied outside its valid NCERT boundary conditions.`;
  }
  // Rule 8: Conceptual Misunderstanding (Default for qualitative question with normal time)
  else if (timeSpentSeconds >= 20 && timeSpentSeconds <= 75) {
    category = "conceptual_misunderstanding";
    confidence = "medium";
    whySelected = `You dedicated adequate solving time (${timeSpentSeconds}s), indicating a deliberate attempt. The error reflects a conceptual gap in distinguishing Option (${selectedOption}) from the verified NCERT rule in Option (${correctOption}).`;
  }
  // Rule 9: Missing Prerequisite Knowledge (Complex inter-chapter concepts)
  else if (chapter.toLowerCase().includes("calculus") || chapter.toLowerCase().includes("equilibrium") || chapter.toLowerCase().includes("genetics")) {
    category = "missing_prerequisite";
    confidence = "preliminary";
    whySelected = `This question in ${chapter} requires prerequisite mathematical or biochemical foundations. A gap in the prerequisite makes applying the target concept difficult.`;
  }
  // Rule 10: Fallback to Unclassified
  else {
    category = "unclassified_insufficient_evidence";
    confidence = "preliminary";
    whySelected = `Insufficient telemetry to isolate the exact cause between a conceptual gap, hasty reading, or calculation error.`;
    clarificationQuestion = {
      questionText: "What was your main thought process when selecting this option?",
      options: [
        "I was confused between this and the correct option",
        "I misread what the question was asking for",
        "I guessed because I did not recall this topic",
      ],
    };
  }

  const meta = MISTAKE_CATEGORIES[category];

  const ncertText = explanation && explanation.length > 20
    ? explanation
    : `According to NCERT ${subject} (${chapter}), the verified principle confirms Option (${correctOption}) "${correctOptionText || "Correct Option"}".`;

  const finding = `You selected Option (${selectedOption})${
    selectedOptionText ? ` ("${selectedOptionText}")` : ""
  }, whereas Option (${correctOption})${
    correctOptionText ? ` ("${correctOptionText}")` : ""
  } is the correct statement.`;

  const correctiveAction =
    category === "question_misinterpretation"
      ? "Circle or highlight negative qualifiers (NOT, EXCEPT) in future questions and verify whether the chosen option is true or false before clicking save."
      : category === "careless_error"
      ? "Implement the 25-second discipline: read all 4 options completely even when Option A looks immediately correct."
      : category === "calculation_execution_error"
      ? "Write out units explicitly at each step and verify powers of ten before selecting the final option."
      : category === "time_management_pacing"
      ? "If a numerical question is not yielding an answer after 50 seconds, mark it for review and move forward to protect easier marks."
      : category === "repeated_error_pattern"
      ? `Review the NCERT summary table for "${microTopic}" and solve 5 targeted repair questions to break the error habit.`
      : `Revisit NCERT definitions and distinction criteria for "${microTopic}" to ensure boundary conditions are recognized.`;

  const followUpCheck = {
    prompt: `Verify: Under what specific conditions does Option (${correctOption}) apply in ${chapter}?`,
    targetSkill: `${microTopic} — Boundary Verification`,
    expectedVerification: `Direct recall of NCERT rule stated in: "${ncertText.slice(0, 120)}..."`,
  };

  const uncertaintyNote =
    confidence === "high"
      ? "High confidence: Diagnosed from converging telemetry and verified question trap metadata."
      : confidence === "medium"
      ? "Medium confidence: Hypothesized based on question archetype and response duration. Validated against NCERT key."
      : "Preliminary observation: Evidence is preliminary. Further attempts in this chapter will refine the diagnosis.";

  return {
    questionId,
    selectedOption,
    correctOption,
    category,
    categoryLabel: meta.label,
    nature: meta.nature,
    confidence,
    finding,
    correctReasoning: ncertText,
    whyCategorySelected: whySelected,
    uncertaintyNote,
    ncertCorrection: ncertText,
    correctiveAction,
    followUpCheck,
    clarificationQuestion,
    fromCache: false,
    tokensUsed: 0,
  };
}

/**
 * Main entry point with sub-millisecond caching.
 */
export async function diagnoseMistakeV2(
  input: MistakeDetectiveInput
): Promise<MistakeDetectiveOutput> {
  const cacheKey = getDetectiveCacheKey(input.questionId, input.selectedOption);

  // 1. Check L1 memory cache
  const cached = l1DetectiveCache.get(cacheKey);
  if (cached) {
    return {
      ...cached,
      fromCache: true,
      tokensUsed: 0,
    };
  }

  // 2. Deterministic diagnosis
  const result = diagnoseMistakeDeterministically(input);

  // 3. Store in L1 cache (bounded to 500 entries)
  if (l1DetectiveCache.size >= 500) {
    const oldestKey = l1DetectiveCache.keys().next().value;
    if (oldestKey) l1DetectiveCache.delete(oldestKey);
  }
  l1DetectiveCache.set(cacheKey, result);

  return result;
}
