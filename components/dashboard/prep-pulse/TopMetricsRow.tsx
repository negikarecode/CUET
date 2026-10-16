import React from "react";
import { Award, Target, Layers, Flame } from "lucide-react";
import { MARKING_SCHEME } from "@/lib/config/dashboardConfig";

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
      id: "score",
      label: "Latest mock score",
      value: hasAttempts ? `${score} / ${maxScore}` : "—",
      context: testTitle ? testTitle : "CUET Marking: +5 / -1",
      tooltip: testTitle || "Calculated using official CUET UG marking formula",
      icon: Award,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-200/60",
    },
    {
      id: "accuracy",
      label: "Recent accuracy",
      value: hasAttempts ? `${accuracyPercentage}%` : "—",
      context: hasAttempts
        ? `${correctCount} of ${totalAttempted} correct`
        : "Complete a test to track accuracy",
      tooltip: `${correctCount} correct answers out of ${totalAttempted} total attempts`,
      icon: Target,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border-emerald-200/60",
    },
    {
      id: "attempted",
      label: "Questions attempted",
      value: `${totalAttempted}`,
      context:
        completedTestsCount > 0
          ? `Across ${completedTestsCount} ${completedTestsCount === 1 ? "test" : "tests"}`
          : totalAttempted > 0
          ? `${totalAttempted} answered`
          : "0 questions answered",
      tooltip: "Total qualifying CUET question attempts recorded",
      icon: Layers,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50 border-indigo-200/60",
    },
    {
      id: "streak",
      label: "Study streak",
      value: `${dailyStreak} ${dailyStreak === 1 ? "day" : "days"}`,
      context: dailyStreak > 0 ? "Consecutive practice days" : "Practice today to start streak",
      tooltip: "Active consecutive days with completed practice or mock tests",
      icon: Flame,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-200/60",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${card.iconBg}`}>
                <Icon className={`w-4 h-4 ${card.iconColor}`} strokeWidth={2} />
              </div>
            </div>

            {/* Middle row: Large value */}
            <div className="my-2.5">
              <span className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight tabular-nums block">
                {card.value}
              </span>
            </div>

            {/* Bottom row: Subtitle context */}
            <div className="pt-2 border-t border-slate-100">
              <span
                className="text-xs text-slate-500 truncate block leading-normal"
                title={card.tooltip}
              >
                {card.context}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopMetricsRow;
