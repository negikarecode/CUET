import { DU_COLLEGES, DUCollegeItem } from "@/lib/constants/duColleges";

export interface CollegeBenchmarkResult {
  collegeName: string;
  universityName: string;
  campus: string;
  historicalCutoffPercentile: number;
  targetScoreFormatted: string;
  predictedPercentile: number;
  deltaPercentile: number;
  status: "surpassed" | "striking_distance" | "needs_remediation" | "calibrating";
  statusLabel: string;
  statusBadgeClass: string;
  recommendation: string;
}

// Canonical cutoffs for prominent colleges
const CUTOFF_LOOKUP: Record<string, { cutoff: number; targetScore: string }> = {
  // North Campus Flagships
  srcc: { cutoff: 99.4, targetScore: "788 / 800" },
  "st-stephens": { cutoff: 99.3, targetScore: "786 / 800" },
  hindu: { cutoff: 99.2, targetScore: "784 / 800" },
  lsr: { cutoff: 99.1, targetScore: "782 / 800" },
  miranda: { cutoff: 98.9, targetScore: "778 / 800" },
  hansraj: { cutoff: 98.7, targetScore: "775 / 800" },
  kmc: { cutoff: 98.0, targetScore: "768 / 800" },
  ramjas: { cutoff: 97.6, targetScore: "762 / 800" },
  "sgtb-khalsa": { cutoff: 96.8, targetScore: "752 / 800" },
  "ip-college": { cutoff: 96.5, targetScore: "748 / 800" },
  "daulat-ram": { cutoff: 96.2, targetScore: "745 / 800" },

  // South Campus Flagships
  venky: { cutoff: 97.4, targetScore: "760 / 800" },
  gargi: { cutoff: 95.8, targetScore: "742 / 800" },
  arsd: { cutoff: 95.2, targetScore: "736 / 800" },
  maitreyi: { cutoff: 94.6, targetScore: "730 / 800" },
  dcac: { cutoff: 95.4, targetScore: "738 / 800" },
  sbsc: { cutoff: 96.0, targetScore: "744 / 800" },
  sggscc: { cutoff: 96.4, targetScore: "748 / 800" },
  "dyal-singh": { cutoff: 94.0, targetScore: "725 / 800" },
  kamala_nehru: { cutoff: 94.8, targetScore: "732 / 800" },
  "motilal-nehru": { cutoff: 93.2, targetScore: "715 / 800" },
};

/**
 * Resolves cutoff metadata for a given college name
 */
export function getCollegeCutoffInfo(collegeName: string): {
  campus: string;
  cutoff: number;
  targetScore: string;
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
    };
  }

  // Check direct key matches or campus heuristics
  if (clean.includes("srcc") || clean.includes("shri ram college")) {
    return { campus: "North Campus", cutoff: 99.4, targetScore: "788 / 800" };
  }
  if (clean.includes("stephen")) {
    return { campus: "North Campus", cutoff: 99.3, targetScore: "786 / 800" };
  }
  if (clean.includes("hindu")) {
    return { campus: "North Campus", cutoff: 99.2, targetScore: "784 / 800" };
  }
  if (clean.includes("lsr") || clean.includes("lady shri ram")) {
    return { campus: "South Campus", cutoff: 99.1, targetScore: "782 / 800" };
  }
  if (clean.includes("miranda")) {
    return { campus: "North Campus", cutoff: 98.9, targetScore: "778 / 800" };
  }
  if (clean.includes("hansraj") || clean.includes("hans raj")) {
    return { campus: "North Campus", cutoff: 98.7, targetScore: "775 / 800" };
  }
  if (clean.includes("venky") || clean.includes("venkateswara")) {
    return { campus: "South Campus", cutoff: 97.4, targetScore: "760 / 800" };
  }
  if (clean.includes("north campus")) {
    return { campus: "North Campus", cutoff: 97.5, targetScore: "760 / 800" };
  }
  if (clean.includes("south campus")) {
    return { campus: "South Campus", cutoff: 95.0, targetScore: "735 / 800" };
  }
  if (matched) {
    const campusBase =
      matched.campus === "North Campus"
        ? 97.0
        : matched.campus === "South Campus"
        ? 94.5
        : 92.0;
    return {
      campus: matched.campus,
      cutoff: campusBase,
      targetScore: `${Math.round(campusBase * 7.8)} / 800`,
    };
  }

  // General Central University default
  return {
    campus: "Central University",
    cutoff: 93.0,
    targetScore: "720 / 800",
  };
}

/**
 * Calculates real-time Readiness Index comparing predicted CUET percentile vs. estimated historical cutoff
 */
export function calculateCollegeReadiness(
  collegeName: string,
  universityName: string = "Delhi University",
  accuracyPercentage: number = 0,
  totalAttempts: number = 0
): CollegeBenchmarkResult {
  const { campus, cutoff, targetScore } = getCollegeCutoffInfo(collegeName);

  // If user has fewer than 15 attempts, calibration is preliminary
  if (totalAttempts < 15) {
    const predicted = Math.max(50, Math.min(88, Math.round((accuracyPercentage || 65) * 0.9 * 10) / 10));
    return {
      collegeName: collegeName || "Delhi University — SRCC",
      universityName: universityName || "Delhi University",
      campus,
      historicalCutoffPercentile: cutoff,
      targetScoreFormatted: targetScore,
      predictedPercentile: predicted,
      deltaPercentile: Math.round((predicted - cutoff) * 10) / 10,
      status: "calibrating",
      statusLabel: "Calibration Underway",
      statusBadgeClass: "bg-blue-100 text-blue-900 border-blue-400",
      recommendation: `Attempt at least 150 questions across Domain mocks to calibrate accurate percentile prediction against ${collegeName}.`,
    };
  }

  // Empirical prediction model:
  // Base from domain mock accuracy, plus stability weighting for question volume
  const accuracyBase = accuracyPercentage * 0.95;
  const volumeBonus = Math.min(5.0, Math.log10(totalAttempts + 1) * 2.2);
  const rawPredicted = accuracyBase + volumeBonus;
  const predictedPercentile = Math.min(99.9, Math.max(50.0, Math.round(rawPredicted * 10) / 10));
  const delta = Math.round((predictedPercentile - cutoff) * 10) / 10;

  if (delta >= 0) {
    return {
      collegeName,
      universityName,
      campus,
      historicalCutoffPercentile: cutoff,
      targetScoreFormatted: targetScore,
      predictedPercentile,
      deltaPercentile: delta,
      status: "surpassed",
      statusLabel: `Cutoff Surpassed (+${delta}%)`,
      statusBadgeClass: "bg-[#D1FAE5] text-black border-black",
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
      predictedPercentile,
      deltaPercentile: delta,
      status: "striking_distance",
      statusLabel: `Within Striking Distance (${delta}%)`,
      statusBadgeClass: "bg-[#FEF3C7] text-black border-black",
      recommendation: `Targetable within ~2 weeks of targeted micro-topic fix drills. Bridge the remaining ${Math.abs(delta)}% gap.`,
    };
  }

  return {
    collegeName,
    universityName,
    campus,
    historicalCutoffPercentile: cutoff,
    targetScoreFormatted: targetScore,
    predictedPercentile,
    deltaPercentile: delta,
    status: "needs_remediation",
    statusLabel: `Gap to Bridge (${delta}%)`,
    statusBadgeClass: "bg-[#FEE2E2] text-[#991B1B] border-[#DC2626]",
    recommendation: `Priority focus needed on your top 3 persistent red-zone topics to raise domain accuracy toward ${cutoff}%.`,
  };
}
