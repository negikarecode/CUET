/**
 * Authoritative Central Exam Configuration System
 * Source: NTA CUET UG 2026 Information Bulletin & Official Guidelines
 */

export interface ExamConfig {
  id: string;
  name: string;
  edition: string;
  sourceAuthority: string;
  totalQuestions: number;
  allQuestionsCompulsory: boolean;
  durationMinutes: number;
  durationSeconds: number;
  correctMarks: number;
  incorrectMarks: number;
  unansweredMarks: number;
  maxMarks: number;
  mode: "CBT" | "PEN_PAPER";
  negativeMarkingEnabled: boolean;
  instructions: string[];
}

export const CUET_UG_2026_CONFIG: ExamConfig = {
  id: "CUET_2026",
  name: "CUET UG 2026 Pattern Practice Exam",
  edition: "2026",
  sourceAuthority: "NTA CUET UG 2026 Official Information Bulletin",
  totalQuestions: 50,
  allQuestionsCompulsory: true,
  durationMinutes: 60,
  durationSeconds: 3600,
  correctMarks: 5,
  incorrectMarks: -1,
  unansweredMarks: 0,
  maxMarks: 250, // 50 questions * 5 marks = 250
  mode: "CBT",
  negativeMarkingEnabled: true,
  instructions: [
    "The examination consists of 50 compulsory questions across the selected domain.",
    "Total time duration is 60 minutes.",
    "Each correct response is awarded +5 marks.",
    "Each incorrect response incurs a negative deduction of -1 mark (-0.25 penalty ratio).",
    "Unanswered questions receive 0 marks with zero penalty.",
    "You may navigate freely between questions using the Question Palette.",
    "Questions marked for review without an answer will not be evaluated.",
    "Questions answered and marked for review will be evaluated according to NTA CBT rules.",
  ],
};

/**
 * Registry of exam configurations allowing future editions (CUET_2027, CUET_2028)
 * to be plugged in seamlessly without rewrites.
 */
export const EXAM_CONFIG_REGISTRY: Record<string, ExamConfig> = {
  CUET_2026: CUET_UG_2026_CONFIG,
};

export const DEFAULT_EXAM_CONFIG_ID = "CUET_2026";

export function getExamConfig(configId: string = DEFAULT_EXAM_CONFIG_ID): ExamConfig {
  return EXAM_CONFIG_REGISTRY[configId] || CUET_UG_2026_CONFIG;
}

export function getActiveExamConfig(): ExamConfig {
  return CUET_UG_2026_CONFIG;
}

/**
 * Calculates score strictly according to authoritative exam configuration
 */
export function calculateExamScore(
  correctCount: number,
  incorrectCount: number,
  unansweredCount: number,
  config: ExamConfig = CUET_UG_2026_CONFIG
): {
  totalMarks: number;
  maxMarks: number;
  percentage: number;
} {
  const totalMarks =
    correctCount * config.correctMarks +
    incorrectCount * config.incorrectMarks +
    unansweredCount * config.unansweredMarks;
  
  const maxMarks = config.totalQuestions * config.correctMarks;
  const percentage = Math.max(0, Math.round((totalMarks / maxMarks) * 100));

  return { totalMarks, maxMarks, percentage };
}
