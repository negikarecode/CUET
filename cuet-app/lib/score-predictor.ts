import { supabase as defaultSupabase } from './supabase';
import { AppDataStore } from './data-store';
import { PerformanceMetrics, ScorePrediction } from './types';

// ─────────────────────────────────────────────────────
// Based on real CUET 2023/2024/2025 NTA data (approximate)
// Rank estimates for score ranges
// ─────────────────────────────────────────────────────
const RANK_TABLE = [
  { minScore: 180, rank_min: 1,      rank_max: 500    },
  { minScore: 170, rank_min: 500,    rank_max: 2000   },
  { minScore: 160, rank_min: 2000,   rank_max: 6000   },
  { minScore: 150, rank_min: 6000,   rank_max: 15000  },
  { minScore: 140, rank_min: 15000,  rank_max: 30000  },
  { minScore: 130, rank_min: 30000,  rank_max: 55000  },
  { minScore: 120, rank_min: 55000,  rank_max: 90000  },
  { minScore: 100, rank_min: 90000,  rank_max: 150000 },
  { minScore: 80,  rank_min: 150000, rank_max: 250000 },
  { minScore: 0,   rank_min: 250000, rank_max: 600000 },
];

export function estimateRank(score: number): { min: number; max: number } {
  for (const range of RANK_TABLE) {
    if (score >= range.minScore) {
      return { min: range.rank_min, max: range.rank_max };
    }
  }
  return { min: 500000, max: 600000 };
}

export function estimatePercentile(rank: number): number {
  const totalStudents = 1200000; // ~12 lakh CUET aspirants
  return Math.round((1 - rank / totalStudents) * 100 * 10) / 10;
}

// ─────────────────────────────────────────────────────
// MAIN: Predict actual CUET score based on mock history
// ─────────────────────────────────────────────────────
export async function predictCUETScore(
  studentId: string,
  currentMetrics: PerformanceMetrics,
  supabaseClient?: any
): Promise<ScorePrediction> {
  const sb = supabaseClient || defaultSupabase;

  let allScores: number[] = [];

  // Try Supabase first
  if (sb) {
    try {
      const { data: history } = await sb
        .from('score_history')
        .select('raw_score, max_score, percentage, test_date')
        .eq('student_id', studentId)
        .eq('test_type', 'full_mock')
        .order('test_date', { ascending: false })
        .limit(10);

      if (history && history.length > 0) {
        allScores = history.map((h: any) => h.raw_score);
      }
    } catch (err) {
      console.warn('[ScorePredictor] Supabase history fetch fallback:', err);
    }
  }

  // Fallback to AppDataStore
  if (allScores.length === 0) {
    allScores = AppDataStore.getScoreHistory(studentId).map((h) => h.raw_score);
  }

  const currentScore = currentMetrics.raw_score;

  // ── CONFIDENCE LEVEL ─────────────────────────────
  let confidence: ScorePrediction['confidence'];
  let confidenceReason: string;

  if (allScores.length === 0) {
    confidence = 'low';
    confidenceReason = 'This is your first mock test. Take 3+ mocks for accurate prediction.';
  } else if (allScores.length < 3) {
    confidence = 'low';
    confidenceReason = `Based on ${allScores.length + 1} mock tests. Take ${3 - allScores.length} more for better accuracy.`;
  } else if (allScores.length < 6) {
    confidence = 'medium';
    confidenceReason = `Based on ${allScores.length + 1} mock tests. Getting more accurate!`;
  } else {
    confidence = 'high';
    confidenceReason = `Based on ${allScores.length + 1} mock tests. High confidence prediction.`;
  }

  // ── TREND ANALYSIS ────────────────────────────────
  let trend: ScorePrediction['trend'];
  let scoreVsLast = 0;

  if (allScores.length === 0) {
    trend = 'first_test';
  } else {
    const lastScore = allScores[0];
    scoreVsLast = currentScore - lastScore;

    if (allScores.length >= 2) {
      const recent3 = [currentScore, ...allScores.slice(0, 2)];
      const isImproving = recent3[0] > recent3[1] && (recent3.length < 3 || recent3[1] >= recent3[2]);
      const isDeclining = recent3[0] < recent3[1] && (recent3.length < 3 || recent3[1] <= recent3[2]);

      trend = isImproving ? 'improving' : isDeclining ? 'declining' : 'stable';
    } else {
      trend = scoreVsLast > 0 ? 'improving' : scoreVsLast < 0 ? 'declining' : 'stable';
    }
  }

  // ── PREDICTION CALCULATION ────────────────────────
  // Exponential weighted average: recent tests have higher weights
  const allWithCurrent = [currentScore, ...allScores];

  let predictedScore: number;
  if (allWithCurrent.length === 1) {
    predictedScore = currentScore;
  } else {
    const weights = allWithCurrent.map((_, i) => Math.pow(0.7, i));
    const weightSum = weights.reduce((s, w) => s + w, 0);
    predictedScore = Math.round(
      allWithCurrent.reduce((sum, score, i) => sum + score * weights[i], 0) / weightSum
    );
  }

  // Range size adjusts according to sample size confidence
  const rangeSize = confidence === 'high' ? 8 : confidence === 'medium' ? 14 : 22;

  const predictedMin = Math.max(0, predictedScore - rangeSize);
  const predictedMax = Math.min(200, predictedScore + rangeSize);

  // ── RANK ESTIMATE ─────────────────────────────────
  const rankMin = estimateRank(predictedMax);
  const rankMax = estimateRank(predictedMin);
  const avgPredictedRank = Math.round((rankMin.min + rankMax.max) / 2);
  const percentile = estimatePercentile(avgPredictedRank);

  const last5Scores = allWithCurrent.slice(0, 5);
  const avgLast5 = last5Scores.length > 0
    ? Math.round(last5Scores.reduce((s, sc) => s + sc, 0) / last5Scores.length)
    : currentScore;

  const bestEver = Math.max(...allWithCurrent);

  return {
    predicted_min: predictedMin,
    predicted_max: predictedMax,
    predicted_rank_min: rankMin.min,
    predicted_rank_max: rankMax.max,
    confidence,
    confidence_reason: confidenceReason,
    trend,
    score_vs_last: scoreVsLast,
    avg_last_5: avgLast5,
    best_ever: bestEver,
    all_scores: allWithCurrent,
    percentile_estimate: percentile,
  };
}
