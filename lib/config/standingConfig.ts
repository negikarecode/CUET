/**
 * Authoritative Configuration for "Where Do I Stand" College Cutoff Engine
 * Single source of truth for:
 * - Marking scheme & scale constants
 * - Data sufficiency & validity thresholds
 * - Decay weights for time-based session recency
 * - Coverage thresholds
 * - Band margins & multi-year range widening
 * - Disclaimers & legal copy
 */

export const STANDING_CONFIG = {
  // Marking Scheme
  CORRECT_MARKS: 5,
  INCORRECT_MARKS: -1,
  UNANSWERED_MARKS: 0,
  QUESTIONS_PER_SUBJECT: 50,
  MAX_MARKS_PER_SUBJECT: 250,

  // Minimum telemetry required for a subject to exit "insufficient_data"
  MIN_ANSWERED_QUESTIONS_PER_SUBJECT: 15,

  // Minimum required coverage before estimate is considered reliable
  COVERAGE_CONFIDENCE_THRESHOLD: 0.50, // 50% coverage required for standard ranking
  MIN_REQUIRED_SUBJECTS_FOR_RANKING: 1, // at least 1 valid subject required to show ranking

  // Session Recency Decay:
  // Weight recent sessions higher using exponential decay: weight = exp(-decayRate * daysAgo)
  // or rank decay: weight = Math.pow(decayFactor, sessionRankFromLatest)
  SESSION_RECENCY_DECAY_FACTOR: 0.92, // recent mock has weight 1.0, 2nd has 0.92, 3rd has 0.85, etc.
  MAX_RECENCY_WINDOW_DAYS: 180,

  // Raw mock to expected real CUET score adjustment factor
  // Default 1.0. Allows calibration if mock difficulty is harder or easier than actual exam
  SCORE_ADJUSTMENT_FACTOR: 1.0,

  // Band Margins (in percentage points)
  REACH_MARGIN_PERCENTAGE: 5.0, // Within 5% below the lower cutoff bound is "Reach", below is "Far"
  SINGLE_YEAR_WIDEN_PERCENTAGE: 2.5, // Widen range by +/-2.5% when only one year of cutoff data exists
  MIN_RANGE_SPREAD_PERCENTAGE: 1.5, // Minimum low-to-high spread to avoid false precision

  // Default User Category
  DEFAULT_CATEGORY: "UR" as const,
  SUPPORTED_CATEGORIES: ["UR", "OBC", "SC", "ST", "EWS", "PwBD"] as const,

  // Disclaimers
  DISCLAIMER_TEXT:
    "Cutoff comparisons are estimates based on official previous years' University of Delhi admission lists. Real CUET cutoffs fluctuate annually based on applicant volume, test difficulty, and NTA equi-percentile shift normalization.",
  MOCK_NORMALIZATION_NOTE:
    "Student scores reflect raw timed practice sessions and are not NTA equi-percentile normalized across test shifts. Score adjustment factor is 1.0x.",
  COVERAGE_APPROXIMATION_NOTE:
    "When a student has not attempted all required subjects, standing is projected based on performance in completed subjects. Official admissions evaluate the aggregate total across all specified subjects.",
} as const;

export type CategoryCode = (typeof STANDING_CONFIG.SUPPORTED_CATEGORIES)[number];

export type ChanceBand = "Safe" | "Likely" | "Possible" | "Reach" | "Far";

export interface ChanceBandInfo {
  band: ChanceBand;
  label: string;
  badgeClass: string;
  cardBorderClass: string;
  description: string;
}

export const CHANCE_BANDS: Record<ChanceBand, ChanceBandInfo> = {
  Safe: {
    band: "Safe",
    label: "Safe",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    cardBorderClass: "border-emerald-200 bg-emerald-50/40",
    description: "Your projected average comfortably exceeds the highest historical cutoff in this range.",
  },
  Likely: {
    band: "Likely",
    label: "Likely",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    cardBorderClass: "border-blue-200 bg-blue-50/40",
    description: "Your performance is above the historical midpoint for admission.",
  },
  Possible: {
    band: "Possible",
    label: "Possible",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    cardBorderClass: "border-amber-200 bg-amber-50/40",
    description: "Your standing sits inside the historical cutoff window.",
  },
  Reach: {
    band: "Reach",
    label: "Reach",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-300",
    cardBorderClass: "border-orange-200 bg-orange-50/40",
    description: "Within striking distance (within 5% of cutoff). Targeted practice can bridge this gap.",
  },
  Far: {
    band: "Far",
    label: "Far",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
    cardBorderClass: "border-rose-200 bg-rose-50/40",
    description: "Significant score elevation required to reach the historical threshold.",
  },
};
