import React from "react";

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
  maxScore = 250,
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
      id: "score",
      label: "Latest mock",
      value: hasAttempts ? `${score} / ${maxScore}` : "— / 250",
      context: hasAttempts && testTitle ? testTitle : "No mock tests attempted yet",
    },
    {
      id: "accuracy",
      label: "Recent accuracy",
      value: hasAttempts ? `${accuracyPercentage}%` : "0%",
      context: hasAttempts
        ? `${correctCount} of ${totalAttempted} correct`
        : "No attempts yet",
    },
    {
      id: "attempted",
      label: "Questions attempted",
      value: `${totalAttempted}`,
      context:
        completedTestsCount > 0
          ? `Across ${completedTestsCount} ${completedTestsCount === 1 ? "test" : "tests"}`
          : "Across 0 tests",
    },
    {
      id: "streak",
      label: "Study streak",
      value: `${dailyStreak} ${dailyStreak === 1 ? "day" : "days"}`,
      context: "Consecutive practice days",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:border-purple-200 transition-colors"
        >
          {/* Label */}
          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            {card.label}
          </div>

          {/* Large Value */}
          <div className="my-1.5">
            <span className="text-2xl sm:text-[32px] font-extrabold text-slate-900 tracking-tight tabular-nums block leading-tight">
              {card.value}
            </span>
          </div>

          {/* Context note */}
          <div className="text-xs text-slate-500 truncate font-medium">
            {card.context}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopMetricsRow;
