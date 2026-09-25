/**
 * CUET UG Master Question Paper Generator (v2) - Type Definitions
 * Strictly aligned with the v2 Specification (Sections 0 - 21)
 */

export type DifficultyLevel = "Easy" | "Moderate" | "Difficult" | "Very Difficult";

export type SkillTested =
  | "Recall"
  | "Understanding"
  | "Application"
  | "Analysis"
  | "Multi-concept Reasoning"
  | "Numerical Reasoning";

export type Archetype =
  | "Assertion-Reasoning"
  | "Statement Evaluation"
  | "Match the Columns"
  | "Chronological Sequence"
  | "Multi-Statement Selection"
  | "Calculation Trap"
  | "Conceptual Application"
  | "Data Interpretation";

export type OptionId = "A" | "B" | "C" | "D";

export interface V2Option {
  id: OptionId;
  text: string;
  isCorrect: boolean;
  studentSelectionTrap: string;
}

export interface V2NcertReference {
  part: string;
  chapter: string;
  section: string;
  concept: string;
  sourceChunkId: string;
}

export interface V2Explanation {
  stepByStepSolution: string;
  coreNcertConcept: string;
  proEliminationTip: string;
}

export interface V2Verification {
  applicableForNumericalOnly: boolean;
  formula: string | null;
  inputValues: string | null;
  computation: string | null;
}

export interface V2ReviewFlags {
  needsAdditionalContext: boolean;
  needsNumericalReview: boolean;
  calibrationSource: "fewshot" | "abstract_definition";
  confidenceNote: string | null;
}

export interface V2Question {
  questionNumber: number;
  chapter: string;
  microTopic: string;
  difficulty: DifficultyLevel;
  skillTested: SkillTested;
  archetype: Archetype;
  ncertReference: V2NcertReference;
  questionText: string;
  options: [V2Option, V2Option, V2Option, V2Option];
  correctOption: OptionId;
  estimatedTimeSeconds: number;
  explanation: V2Explanation;
  verification: V2Verification;
  reviewFlags: V2ReviewFlags;
}

export interface V2TestMetadata {
  subject: string;
  targetExam: "CUET UG";
  batchNumber: number;
  totalBatches: number;
  batchQuestionCount: number;
  totalQuestionCount: number;
  durationMinutes: number;
  markingScheme: {
    correct: 5;
    incorrect: -1;
    unattempted: 0;
  };
  calibrationSource: "fewshot" | "abstract_definition";
}

export interface V2BatchResponse {
  testMetadata: V2TestMetadata;
  questions: V2Question[];
}

export interface MasterPromptVariables {
  subject: string;
  batchQuestionCount: number;
  totalQuestionCount: number;
  batchNumber: number;
  totalBatches: number;
  durationMinutes: number;
  chaptersCoveredSoFar: string[];
  retrievedNcertContext: string;
  fewshotExamples: string;
}

export interface NcertSourceChunk {
  sourceChunkId: string;
  subject: string;
  part: string;
  chapter: string;
  section: string;
  concept: string;
  text: string;
  keywords?: string[];
}

export interface FewShotExemplar {
  subject: string;
  source: string;
  questionNumber?: number | string;
  archetype?: string;
  questionText: string;
  options?: Array<{ id: string; text: string }>;
  correctOption?: string;
  explanation?: string;
}

export interface NumericalVerificationResult {
  questionNumber: number;
  applicable: boolean;
  passed: boolean;
  formula: string | null;
  computationExpression: string | null;
  computedValue: number | null;
  expectedValue: number | null;
  correctOptionText: string;
  distractorTrapMatch: OptionId | null;
  discrepancyNote?: string;
}

export interface BatchAuditMetrics {
  questionCount: number;
  expectedCount: number;
  difficultyCounts: Record<DifficultyLevel, number>;
  archetypeCounts: Record<string, number>;
  optionDistribution: Record<OptionId, number>;
  numericalCount: number;
  numericalVerifiedPassed: number;
  numericalNeedsReview: number;
  needsAdditionalContextCount: number;
  katexPassed: boolean;
  uniqueStemsPassed: boolean;
  optionsIntegrityPassed: boolean;
}

export interface FullPaperAuditReport {
  subject: string;
  totalQuestions: number;
  totalBatches: number;
  targetDifficultyDistribution: {
    Easy: string; // 20%
    Moderate: string; // 50%
    Difficult: string; // 25%
    "Very Difficult": string; // 5%
  };
  actualDifficultyDistribution: Record<DifficultyLevel, number>;
  difficultyPercentages: Record<DifficultyLevel, string>;
  optionPositionDistribution: Record<OptionId, number>;
  chaptersCovered: string[];
  totalNumericalQuestions: number;
  numericalPassed: number;
  numericalReviewRequired: number;
  humanReviewQueue: Array<{
    questionNumber: number;
    reason: string;
    question: V2Question;
  }>;
  spotCheckSampleQueue: Array<{
    questionNumber: number;
    question: V2Question;
  }>;
  overallCompliant: boolean;
  warnings: string[];
}
