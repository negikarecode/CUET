import React from 'react';
import { MARKING_SCHEME } from '@/lib/config/dashboardConfig';

interface TopMetricsRowProps {
  score?: number;
  maxScore?: number;
  accuracyPercentage?: number;
  correctCount?: number;
  totalAttempted?: number;
  dailyStreak?: number;
  percentile?: number;
}

export const TopMetricsRow: React.FC<TopMetricsRowProps> = ({
  score = 0,
  maxScore = MARKING_SCHEME.MAX_SCORE_PER_SUBJECT,
  accuracyPercentage = 0,
  correctCount = 0,
  totalAttempted = 0,
  dailyStreak = 0,
}) => {
  const hasAttempts = totalAttempted > 0;

  const statCards = [
    {
      id: 'score',
      label: 'Latest score',
      value: hasAttempts ? `${score} / ${maxScore}` : '—',
      context: 'Marking scheme: +5 / -1',
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: hasAttempts ? `${accuracyPercentage}%` : '—',
      context: hasAttempts ? `${correctCount} of ${totalAttempted} correct` : 'No attempts recorded',
    },
    {
      id: 'attempted',
      label: 'Questions attempted',
      value: `${totalAttempted}`,
      context: totalAttempted >= 150 ? 'Full diagnostic unlocked' : `${150 - totalAttempted} to unlock full report`,
    },
    {
      id: 'streak',
      label: 'Streak',
      value: `${dailyStreak} ${dailyStreak === 1 ? 'day' : 'days'}`,
      context: 'Daily practice sessions',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {statCards.map((card) => (
        <div
          key={card.id}
          className="app-card flex flex-col justify-between"
        >
          <span className="text-[14px] font-medium text-[var(--text-secondary)]">
            {card.label}
          </span>
          <span className="text-[28px] font-semibold text-[var(--text)] tabular-nums mt-2">
            {card.value}
          </span>
          <span className="text-[14px] text-[var(--text-muted)] mt-1 truncate">
            {card.context}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TopMetricsRow;
