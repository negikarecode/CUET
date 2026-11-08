/**
 * Shared Marks Calculations & Explanations for CUET (+5 / -1 Marking)
 *
 * In CUET UG:
 * - Each correct answer earns +5 marks.
 * - Each wrong answer incurs a -1 penalty (penaltyMarks = incorrectCount * 1).
 * - Each wrong answer also misses the +5 marks it would have earned if correct,
 *   so the total opportunity cost ("marks missed") is 6 marks per wrong answer (5 missed + 1 penalty).
 */

export interface MarksCalculations {
  incorrectCount: number;
  penaltyMarks: number;
  penaltyMarksDisplay: string;
  penaltyLabel: string;
  penaltyTooltip: string;
  missedMarks: number;
  missedMarksDisplay: string;
  missedLabel: string;
  missedTooltip: string;
}

export function computeMarksLost(incorrectCount: number): MarksCalculations {
  const safeCount = Math.max(0, Math.floor(incorrectCount || 0));
  const penaltyMarks = safeCount * 1;
  const missedMarks = safeCount * 6;

  return {
    incorrectCount: safeCount,
    penaltyMarks,
    penaltyMarksDisplay: `-${penaltyMarks}`,
    penaltyLabel: `Penalty from wrong answers: -${penaltyMarks} (1 per wrong answer)`,
    penaltyTooltip: "Every wrong answer deducts 1 mark (-1 penalty) from your raw score under official CUET rules.",
    missedMarks,
    missedMarksDisplay: `${missedMarks}`,
    missedLabel: `Marks missed vs. correct answers: ${missedMarks} (6 per wrong answer: +5 missed and -1 penalty)`,
    missedTooltip: "Each wrong answer costs 6 marks compared to getting it right: 5 marks you didn't earn plus 1 penalty mark deducted.",
  };
}
