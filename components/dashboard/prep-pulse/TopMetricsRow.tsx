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
  score = -2,
  maxScore = 250,
  testTitle = "Physics Full Mock 50",
  accuracyPercentage = 22,
  correctCount = 44,
  totalAttempted = 200,
  completedTestsCount = 4,
  dailyStreak = 1,
}) => {
  const hasAttempts = totalAttempted > 0;

  const statCards = [
    {
      id: "score",
      label: "Latest mock",
      value: hasAttempts ? `${score} / ${maxScore}` : "−2 / 250",
      context: testTitle || "Physics Full Mock 50",
    },
    {
      id: "accuracy",
      label: "Recent accuracy",
      value: hasAttempts ? `${accuracyPercentage}%` : "22%",
      context: hasAttempts
        ? `${correctCount} of ${totalAttempted} correct`
        : "44 of 200 correct",
    },
    {
      id: "attempted",
      label: "Questions attempted",
      value: hasAttempts ? `${totalAttempted}` : "200",
      context:
        completedTestsCount > 0
          ? `Across ${completedTestsCount} ${completedTestsCount === 1 ? "test" : "tests"}`
          : "Across 4 tests",
    },
    {
      id: "streak",
      label: "Study streak",
      value: `${dailyStreak || 1} ${dailyStreak === 1 ? "day" : "days"}`,
      context: "Consecutive practice days",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl border border-[#EFE6DC] p-5 sm:p-6 shadow-2xs flex flex-col justify-between"
        >
          {/* Label */}
          <div className="text-xs text-[#8C7D73] font-medium">
            {card.label}
          </div>

          {/* Large Value */}
          <div className="my-1.5">
            <span className="text-2xl sm:text-[32px] font-bold text-[#1C1917] tracking-tight tabular-nums block leading-tight">
              {card.value}
            </span>
          </div>

          {/* Context note */}
          <div className="text-xs text-[#786E65] truncate">
            {card.context}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopMetricsRow;
