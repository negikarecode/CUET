import { RecordedQuestionAttempt } from "@/types";
import {
  SessionConfidenceLevel,
  SessionQualityEvaluation,
  evaluateSessionQuality,
} from "@/lib/config/dashboardConfig";

export type { SessionConfidenceLevel, SessionQualityEvaluation };

/**
 * Pure deterministic session validity evaluator.
 * Evaluates session quality from question telemetry:
 * - Median time per question
 * - Accuracy relative to chance (25% for 4 options)
 * - Identifies low-effort/rushed sessions
 * - Determines session confidence (Low / Medium / High)
 */
export function evaluateSessionValidity(
  questions: RecordedQuestionAttempt[]
): SessionQualityEvaluation {
  const attempted = questions.filter(
    (q) => q.selectedOption !== null && q.selectedOption !== undefined
  );

  const times = attempted.map((q) => q.timeSpentSeconds || 0);
  const correctCount = attempted.filter((q) => q.isCorrect === true).length;

  return evaluateSessionQuality({
    timesSpentSeconds: times,
    correctCount,
    totalAttempted: attempted.length,
    optionCount: 4,
  });
}
