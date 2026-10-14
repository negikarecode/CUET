import React from 'react';
import { MARKING_SCHEME } from '@/lib/config/dashboardConfig';

interface TopMetricsRowProps {
  score?: number;
  maxScore?: number;
  testTitle?: string;
  accuracyPercentage?: number;
  correctCount?: number;
  totalAttempted?: number;
  completedTestsCount?: number;
  dailyStreak?: number;
  percentile?: number;
}

export const TopMetricsRow: React.FC<TopMetricsRowProps> = ({
  score = 0,
  maxScore = MARKING_SCHEME.MAX_SCORE_PER_SUBJECT,
  testTitle,
  accuracyPercentage = 0,
  correctCount = 0,
  totalAttempted = 0,
  completedTestsCount = 0,
  dailyStreak = 0,
}) => {
  const hasAttempts = totalAttempted > 0;

  const statCards = [
    {
      id: 'score',
      label: 'Latest score',
      value: hasAttempts ? `${score} / ${maxScore}` : '—',
      context: testTitle || 'Marking scheme: +5 / -1',
      tooltip: testTitle || undefined,
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
      context:
        completedTestsCount > 0
          ? `across ${completedTestsCount} ${completedTestsCount === 1 ? 'test' : 'tests'}`
          : totalAttempted > 0
          ? `${totalAttempted} answered`
          : '0 answered',
    },
    {
      id: 'streak',
      label: 'Streak',
      value: `${dailyStreak} ${dailyStreak === 1 ? 'day' : 'days'}`,
      context: dailyStreak > 0 ? 'days in a row' : 'Start your streak today',
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
          <span className="text-[26px] sm:text-[28px] font-semibold text-[var(--text)] tabular-nums mt-1.5">
            {card.value}
          </span>
          <span
            className="text-[13px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-snug"
            title={card.tooltip || card.context}
          >
            {card.context}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TopMetricsRow;
