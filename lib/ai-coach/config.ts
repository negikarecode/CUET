/**
 * Authoritative AI Coach Configuration & Constraints
 *
 * Rules:
 * - Eligibility: count UNIQUE questions attempted (mocks + PYQs + practice) since the last report.
 *   Unlock when fresh >= 150 (FRESH_QUESTIONS_THRESHOLD).
 * - No time-based exclusion: Every submitted answer counts regardless of completion time.
 *   time_spent_seconds is preserved for telemetry & pacing analysis, never to exclude attempts.
 * - Daily limit: 3 reports per user across all subjects, resetting at midnight IST (DAILY_REPORT_LIMIT).
 * - Confidence gate: Only label a topic "weak" or "strong" with 5+ attempts (MIN_TOPIC_ATTEMPTS);
 *   otherwise mark it "insufficient data".
 * - Marking scheme: CUET (+5 correct, -1 wrong, 0 unattempted).
 */

export const AI_COACH_CONFIG = {
  FRESH_QUESTIONS_THRESHOLD: 150,
  DAILY_REPORT_LIMIT: 3,
  RESET_TIMEZONE: "Asia/Kolkata",
  MIN_TOPIC_ATTEMPTS: 5,
  MODEL: "gemini-2.0-flash",
  GROQ_MODEL: "llama-3.3-70b-versatile",
  PROMPT_VERSION: "v1.0",
  MARKING_SCHEME: {
    CORRECT: 5,
    INCORRECT: -1,
    UNATTEMPTED: 0,
  },
} as const;

export function getConfidenceLabel(attemptsCount: number): "insufficient data" | "sufficient" {
  return attemptsCount >= AI_COACH_CONFIG.MIN_TOPIC_ATTEMPTS ? "sufficient" : "insufficient data";
}
