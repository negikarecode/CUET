import { DU_COLLEGES, DUCollegeItem } from "@/lib/constants/duColleges";

export interface CollegeBenchmarkResult {
  collegeName: string;
  universityName: string;
  campus: string;
  historicalCutoffPercentile: number;
  targetScoreFormatted: string;
  targetScoreNumber: number;
  currentScore: number;
  pointsGap: number;
  gapLabel: string;
  gapExplanation: string;
  predictedPercentile: number;
  deltaPercentile: number;
  status: "surpassed" | "striking_distance" | "needs_remediation" | "calibrating";
  statusLabel: string;
  statusBadgeClass: string;
  recommendation: string;
}

// Canonical cutoffs for prominent colleges on real CUET per-subject 250-mark scale
const CUTOFF_LOOKUP: Record<string, { cutoff: number; targetScoreNumber: number; targetScore: string }> = {
  // North Campus Flagships
  srcc: { cutoff: 99.4, targetScoreNumber: 242, targetScore: "242 / 250 pts" },
  "st-stephens": { cutoff: 99.3, targetScoreNumber: 240, targetScore: "240 / 250 pts" },
  hindu: { cutoff: 99.2, targetScoreNumber: 238, targetScore: "238 / 250 pts" },
  lsr: { cutoff: 99.1, targetScoreNumber: 236, targetScore: "236 / 250 pts" },
  miranda: { cutoff: 98.9, targetScoreNumber: 234, targetScore: "234 / 250 pts" },
  hansraj: { cutoff: 98.7, targetScoreNumber: 232, targetScore: "232 / 250 pts" },
  kmc: { cutoff: 98.0, targetScoreNumber: 228, targetScore: "228 / 250 pts" },
  ramjas: { cutoff: 97.6, targetScoreNumber: 225, targetScore: "225 / 250 pts" },
  "sgtb-khalsa": { cutoff: 96.8, targetScoreNumber: 220, targetScore: "220 / 250 pts" },
  "ip-college": { cutoff: 96.5, targetScoreNumber: 218, targetScore: "218 / 250 pts" },
  "daulat-ram": { cutoff: 96.2, targetScoreNumber: 215, targetScore: "215 / 250 pts" },

  // South Campus Flagships
  venky: { cutoff: 97.4, targetScoreNumber: 222, targetScore: "222 / 250 pts" },
  gargi: { cutoff: 95.8, targetScoreNumber: 212, targetScore: "212 / 250 pts" },
  arsd: { cutoff: 95.2, targetScoreNumber: 210, targetScore: "210 / 250 pts" },
  maitreyi: { cutoff: 94.6, targetScoreNumber: 206, targetScore: "206 / 250 pts" },
  dcac: { cutoff: 95.4, targetScoreNumber: 210, targetScore: "210 / 250 pts" },
  sbsc: { cutoff: 96.0, targetScoreNumber: 214, targetScore: "214 / 250 pts" },
  sggscc: { cutoff: 96.4, targetScoreNumber: 216, targetScore: "216 / 250 pts" },
  "dyal-singh": { cutoff: 94.0, targetScoreNumber: 204, targetScore: "204 / 250 pts" },
  kamala_nehru: { cutoff: 94.8, targetScoreNumber: 208, targetScore: "208 / 250 pts" },
  "motilal-nehru": { cutoff: 93.2, targetScoreNumber: 200, targetScore: "200 / 250 pts" },
};

/**
 * Resolves cutoff metadata for a given college name
 */
export function getCollegeCutoffInfo(collegeName: string): {
  campus: string;
  cutoff: number;
  targetScore: string;
  targetScoreNumber: number;
} {
  const clean = (collegeName || "").toLowerCase().trim();

  // Try matching against DU_COLLEGES list
  const matched = DU_COLLEGES.find((col: DUCollegeItem) => {
    const nameLow = col.name.toLowerCase();
    const shortLow = (col.shortName || "").toLowerCase();
    return (
      clean === nameLow ||
      clean === shortLow ||
      clean.includes(col.id) ||
      nameLow.includes(clean) ||
      (shortLow && clean.includes(shortLow))
    );
  });

  if (matched && CUTOFF_LOOKUP[matched.id]) {
    const data = CUTOFF_LOOKUP[matched.id]!;
    return {
      campus: matched.campus,
      cutoff: data.cutoff,
      targetScore: data.targetScore,
      targetScoreNumber: data.targetScoreNumber,
    };
  }

  // Check direct key matches or campus heuristics (CUET 250-point single-subject scale)
  if (clean.includes("srcc") || clean.includes("shri ram college")) {
    return { campus: "North Campus", cutoff: 99.4, targetScore: "242 / 250 pts", targetScoreNumber: 242 };
  }
  if (clean.includes("stephen")) {
    return { campus: "North Campus", cutoff: 99.3, targetScore: "240 / 250 pts", targetScoreNumber: 240 };
  }
  if (clean.includes("hindu")) {
    return { campus: "North Campus", cutoff: 99.2, targetScore: "238 / 250 pts", targetScoreNumber: 238 };
  }
  if (clean.includes("lsr") || clean.includes("lady shri ram")) {
    return { campus: "South Campus", cutoff: 99.1, targetScore: "236 / 250 pts", targetScoreNumber: 236 };
  }
  if (clean.includes("miranda")) {
    return { campus: "North Campus", cutoff: 98.9, targetScore: "234 / 250 pts", targetScoreNumber: 234 };
  }
  if (clean.includes("hansraj") || clean.includes("hans raj")) {
    return { campus: "North Campus", cutoff: 98.7, targetScore: "232 / 250 pts", targetScoreNumber: 232 };
  }
  if (clean.includes("venky") || clean.includes("venkateswara")) {
    return { campus: "South Campus", cutoff: 97.4, targetScore: "222 / 250 pts", targetScoreNumber: 222 };
  }
  if (clean.includes("north campus")) {
    return { campus: "North Campus", cutoff: 97.5, targetScore: "225 / 250 pts", targetScoreNumber: 225 };
  }
  if (clean.includes("south campus")) {
    return { campus: "South Campus", cutoff: 95.0, targetScore: "210 / 250 pts", targetScoreNumber: 210 };
  }
  if (matched) {
    const campusBase =
      matched.campus === "North Campus"
        ? 97.0
        : matched.campus === "South Campus"
        ? 94.5
        : 92.0;
    const scoreNum = Math.round(campusBase * 2.4);
    return {
      campus: matched.campus,
      cutoff: campusBase,
      targetScore: `${scoreNum} / 250 pts`,
      targetScoreNumber: scoreNum,
    };
  }

  // General Central University default
  return {
    campus: "Central University",
    cutoff: 93.0,
    targetScore: "200 / 250 pts",
    targetScoreNumber: 200,
  };
}

/**
 * Calculates real-time Readiness Index comparing predicted CUET percentile vs. estimated historical cutoff
 */
export function calculateCollegeReadiness(
  collegeName: string,
  universityName: string = "Delhi University",
  accuracyPercentage: number = 0,
  totalAttempts: number = 0,
  currentScore: number = 0
): CollegeBenchmarkResult {
  const { campus, cutoff, targetScore, targetScoreNumber } = getCollegeCutoffInfo(collegeName);
  const pointsGap = Math.max(0, targetScoreNumber - currentScore);
  const gapLabel = pointsGap > 0 ? `Need +${pointsGap} pts to reach target` : "Target score reached";
  const gapExplanation = `Calculated on the CUET marking scheme (+5 correct, -1 incorrect, max 250 pts). Target is ${targetScore} (${cutoff}%ile historical cutoff for ${collegeName}). Current score is ${currentScore} / 250 pts.`;

  // If user has 0 attempts, prediction is uncalibrated baseline
  if (totalAttempts === 0) {
    return {
      collegeName: collegeName || "Target College",
      universityName: universityName || "Target University",
      campus,
      historicalCutoffPercentile: cutoff,
      targetScoreFormatted: targetScore,
      targetScoreNumber,
      currentScore,
      pointsGap,
      gapLabel,
      gapExplanation,
      predictedPercentile: 0,
      deltaPercentile: -cutoff,
      status: "calibrating",
      statusLabel: "Uncalibrated Baseline",
      statusBadgeClass: "bg-slate-100 text-slate-800 border-slate-200",
      recommendation: `Attempt at least 150 questions across Domain mocks to calibrate accurate percentile prediction against ${collegeName || "your target college"}.`,
    };
  }

  // If user has fewer than 15 attempts, calibration is preliminary
  if (totalAttempts < 15) {
    const predicted = Math.round(accuracyPercentage * 0.9 * 10) / 10;
    return {
      collegeName: collegeName || "Target College",
      universityName: universityName || "Target University",
      campus,
      historicalCutoffPercentile: cutoff,
      targetScoreFormatted: targetScore,
      targetScoreNumber,
      currentScore,
      pointsGap,
      gapLabel,
      gapExplanation,
      predictedPercentile: predicted,
      deltaPercentile: Math.round((predicted - cutoff) * 10) / 10,
      status: "calibrating",
      statusLabel: "Calibration Underway",
      statusBadgeClass: "bg-blue-50 text-blue-800 border-blue-200",
      recommendation: `Attempt at least 150 questions across Domain mocks to calibrate accurate percentile prediction against ${collegeName || "your target college"}.`,
    };
  }

  // Empirical prediction model:
  // Base from domain mock accuracy, plus stability weighting for question volume
  const accuracyBase = accuracyPercentage * 0.95;
  const volumeBonus = Math.min(5.0, Math.log10(totalAttempts + 1) * 2.2);
  const rawPredicted = accuracyBase + volumeBonus;
  const predictedPercentile = Math.min(99.9, Math.max(0, Math.round(rawPredicted * 10) / 10));
  const delta = Math.round((predictedPercentile - cutoff) * 10) / 10;

  if (delta >= 0) {
    return {
      collegeName,
      universityName,
      campus,
      historicalCutoffPercentile: cutoff,
      targetScoreFormatted: targetScore,
      targetScoreNumber,
      currentScore,
      pointsGap,
      gapLabel,
      gapExplanation,
      predictedPercentile,
      deltaPercentile: delta,
      status: "surpassed",
      statusLabel: `Cutoff Surpassed (+${delta}%)`,
      statusBadgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
      recommendation: `High probability admission! Maintain pacing consistency and avoid negative marking traps.`,
    };
  }

  if (delta >= -3.5) {
    return {
      collegeName,
      universityName,
      campus,
      historicalCutoffPercentile: cutoff,
      targetScoreFormatted: targetScore,
      targetScoreNumber,
      currentScore,
      pointsGap,
      gapLabel,
      gapExplanation,
      predictedPercentile,
      deltaPercentile: delta,
      status: "striking_distance",
      statusLabel: `Within Striking Distance (${gapLabel})`,
      statusBadgeClass: "bg-amber-50 text-amber-800 border-amber-200",
      recommendation: `Targetable within ~2 weeks of targeted micro-topic fix drills. Bridge the remaining ${pointsGap} pts gap.`,
    };
  }

  return {
    collegeName,
    universityName,
    campus,
    historicalCutoffPercentile: cutoff,
    targetScoreFormatted: targetScore,
    targetScoreNumber,
    currentScore,
    pointsGap,
    gapLabel,
    gapExplanation,
    predictedPercentile,
    deltaPercentile: delta,
    status: "needs_remediation",
    statusLabel: gapLabel,
    statusBadgeClass: "bg-rose-50 text-rose-800 border-rose-200",
    recommendation: `Priority focus needed on your top 3 persistent red-zone topics to raise domain score toward ${targetScore}.`,
  };
}
