/**
 * Centralized CUET UG Scoring & Assessment Constants
 *
 * Scoring Framework:
 * 1. Raw Subject Score: 50 compulsory questions × +5 marks = 250 max raw score (−1 per incorrect).
 * 2. Normalized Subject Score: NTA equi-percentile score mapped to 200 max per domain subject.
 * 3. Composite Degree Target: 4 subjects (1 Language + 3 Domains) = 800 max composite score for Delhi University.
 */

export const CUET_SCORING = {
  // Raw Exam Question Scheme
  QUESTIONS_PER_DOMAIN: 50,
  CORRECT_MARK: 5,
  INCORRECT_PENALTY: -1,
  UNATTEMPTED_MARK: 0,
  MAX_RAW_SCORE_PER_SUBJECT: 250, // 50 Qs × 5 marks
  EXAM_DURATION_MINUTES: 60,

  // NTA Normalized Scores (Per Subject)
  MAX_NORMALIZED_SCORE_PER_SUBJECT: 200,
  TOPPER_SAMPLE_SUBJECT_SCORE: 198, // 198 / 200 normalized score

  // Delhi University (DU) Composite Target (4 subjects: 1 Lang + 3 Domains)
  MAX_COMPOSITE_SCORE_DU: 800, // 4 × 200
  SRCC_SAMPLE_TARGET_SCORE: "800 / 800",

  // Clear labels to distinguish Raw vs Normalized figures
  LABELS: {
    RAW_EXAM_SCHEME: "50 Qs • +5/−1 Scheme (Max 250 Raw)",
    NORMALIZED_SUBJECT: "Normalized Subject Score (out of 200)",
    COMPOSITE_DU: "DU Composite Cutoff (out of 800)",
    SAMPLE_PROJECTION: "Sample Projection (Normalized)",
  },
} as const;
