import { WeaknessLevel, WeaknessScore, StudentAttempt, Recommendation } from './types';

// ─────────────────────────────────────────────────
// SCORE 1: Accuracy Score (60% of final score)
// ─────────────────────────────────────────────────
export function calculateAccuracyScore(
  correct: number,
  wrong: number,
  skipped: number
): number {
  const total = correct + wrong + skipped;
  if (total === 0) return 0;
  
  // Skipped counts as half wrong (no mark strategy)
  const accuracyScore = (correct / total) * 100;
  return Math.round(accuracyScore * 100) / 100;
}

// ─────────────────────────────────────────────────
// SCORE 2: Speed Score (25% of final score)
// ─────────────────────────────────────────────────
export function calculateSpeedScore(
  avgTimeSeconds: number,
  difficulty: 'easy' | 'medium' | 'hard'
): number {
  const targetTimes = { easy: 30, medium: 45, hard: 65 };
  const target = targetTimes[difficulty];
  
  if (avgTimeSeconds <= target) {
    return 100; // At or below target = perfect score
  } else if (avgTimeSeconds <= target * 1.5) {
    // Proportionally reduce score
    const speedScore = 100 - ((avgTimeSeconds - target) / target) * 100;
    return Math.max(10, Math.round(speedScore * 100) / 100);
  } else {
    return 10; // Way too slow = minimum score
  }
}

// ─────────────────────────────────────────────────
// SCORE 3: Consistency Score (15% of final score)
// ─────────────────────────────────────────────────
export function calculateConsistencyScore(
  attempts: StudentAttempt[]
): number {
  if (attempts.length < 3) return 50; // Not enough data
  
  const recent = attempts.slice(-5); // Last 5 attempts
  const results: number[] = recent.map(a => (a.is_correct ? 1 : 0));
  
  // Split into first half and second half
  const mid = Math.floor(results.length / 2);
  const firstHalf = results.slice(0, mid);
  const secondHalf = results.slice(mid);
  
  const firstAvg = firstHalf.reduce<number>((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce<number>((a, b) => a + b, 0) / secondHalf.length;
  
  // Count repeated wrong answers
  const questionWrongCount: Record<number, number> = {};
  attempts.forEach(a => {
    if (!a.is_correct && !a.is_skipped) {
      questionWrongCount[a.question_id] = 
        (questionWrongCount[a.question_id] || 0) + 1;
    }
  });
  const repeatedMistakes = Object.values(questionWrongCount)
    .filter(count => count >= 2).length;
  const penalty = repeatedMistakes * 10;
  
  let consistencyScore: number;
  if (secondAvg > firstAvg) {
    consistencyScore = 70 + (secondAvg * 30) - penalty;
  } else if (secondAvg === firstAvg) {
    consistencyScore = 50 - penalty;
  } else {
    consistencyScore = 30 - penalty;
  }
  
  return Math.max(0, Math.min(100, Math.round(consistencyScore)));
}

// ─────────────────────────────────────────────────
// FINAL: Weakness Score Calculator
// ─────────────────────────────────────────────────
export function calculateFinalWeaknessScore(
  accuracyScore: number,
  speedScore: number,
  consistencyScore: number
): number {
  const final = (
    (accuracyScore    * 0.60) +
    (speedScore       * 0.25) +
    (consistencyScore * 0.15)
  );
  return Math.round(final * 100) / 100;
}

// ─────────────────────────────────────────────────
// HELPER: Get Weakness Level from Score
// ─────────────────────────────────────────────────
export function getWeaknessLevel(score: number): WeaknessLevel {
  if (score < 40)  return 'critical';
  if (score < 55)  return 'weak';
  if (score < 70)  return 'average';
  if (score < 85)  return 'strong';
  return 'excellent';
}

// ─────────────────────────────────────────────────
// HELPER: Weakness Level Config (for UI)
// ─────────────────────────────────────────────────
export const WEAKNESS_CONFIG = {
  critical:  { 
    emoji: '🔴', 
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    badgeColor: 'bg-red-100 text-red-800',
    label: 'Critical',
    message: 'Needs immediate attention',
    priority: 1
  },
  weak:      { 
    emoji: '🟠', 
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    badgeColor: 'bg-orange-100 text-orange-800',
    label: 'Needs Work',
    message: 'Practice regularly',
    priority: 2
  },
  average:   { 
    emoji: '🟡', 
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    label: 'Average',
    message: 'Keep practicing',
    priority: 3
  },
  strong:    { 
    emoji: '🟢', 
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    badgeColor: 'bg-green-100 text-green-800',
    label: 'Strong',
    message: 'Maintain with revision',
    priority: 4
  },
  excellent: { 
    emoji: '✅', 
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    badgeColor: 'bg-blue-100 text-blue-800',
    label: 'Excellent',
    message: 'Light revision only',
    priority: 5
  },
  untested:  { 
    emoji: '⬜', 
    color: 'gray',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-600',
    badgeColor: 'bg-gray-100 text-gray-700',
    label: 'Not Started',
    message: 'You haven\'t tried this yet',
    priority: 0
  }
};

// ─────────────────────────────────────────────────
// HELPER: Calculate Overall Health Score
// ─────────────────────────────────────────────────
export function calculateOverallHealthScore(
  weaknessScores: WeaknessScore[]
): number {
  if (weaknessScores.length === 0) return 0;
  
  const testedScores = weaknessScores.filter(
    w => w.weakness_level !== 'untested'
  );
  
  if (testedScores.length === 0) return 0;
  
  const total = testedScores.reduce(
    (sum, w) => sum + w.final_weakness_score, 0
  );
  
  return Math.round(total / testedScores.length);
}

// ─────────────────────────────────────────────────
// HELPER: Get Top 3 Recommendations
// ─────────────────────────────────────────────────
export function getTopRecommendations(
  weaknessScores: WeaknessScore[],
  limit: number = 3
): Recommendation[] {
  // Sort by weakness level (critical first) 
  // then by final score (lowest first)
  const sorted = weaknessScores
    .filter(w => 
      w.weakness_level === 'critical' || 
      w.weakness_level === 'weak'
    )
    .sort((a, b) => a.final_weakness_score - b.final_weakness_score)
    .slice(0, limit);
  
  return sorted.map((w, index) => ({
    topic_id: w.topic_id,
    topic_name: w.topic?.topic_name || 'Unknown Topic',
    subject_name: w.subject?.name || 'Unknown Subject',
    weakness_score: w.final_weakness_score,
    weakness_level: w.weakness_level,
    questions_ready: Math.floor(Math.random() * 10) + 15, // 15-25 questions
    estimated_minutes: Math.floor(Math.random() * 15) + 15, // 15-30 mins
    priority: index + 1
  }));
}
