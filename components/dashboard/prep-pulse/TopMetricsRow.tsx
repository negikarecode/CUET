import React from 'react';
import { ArrowUp, Flame } from 'lucide-react';


interface TopMetricsRowProps {
  totalAttempted?: number;
  averageScore?: number;
  percentile?: number;
  dailyStreak?: number;
}

export const TopMetricsRow: React.FC<TopMetricsRowProps> = ({
  totalAttempted = 0,
  averageScore = 0,
  percentile = 0,
  dailyStreak = 0,
}) => {
  const hasAttempts = totalAttempted > 0;
  const displayAttempted = hasAttempts ? totalAttempted : 0;
  const displayScore = hasAttempts && averageScore > 0 ? averageScore : null;
  const displayPercentile = hasAttempts && percentile > 0 ? `${percentile.toFixed(1)}%` : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
      
      {/* 1. Total Questions Attempted (Vibrant Sky Blue Card) */}
      <div className="bg-[#0C8CE9] text-white rounded-3xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(12,140,233,0.25)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-100">
              Questions
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {displayAttempted.toLocaleString()}
            </div>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 shrink-0">
            <ArrowUp className="w-3 h-3 stroke-[2.5]" />
            {hasAttempts ? "Active" : "0 / 150"}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-xs text-sky-100 font-medium truncate min-w-0">
            {hasAttempts ? "NTA CBT mock questions" : "Complete calibration gate"}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none">
            {[35, 50, 65, 80, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? "bg-white" : "bg-white/40"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Average Accuracy / Score (Dark Charcoal Card) */}
      <div className="bg-[#1C1C1C] text-white rounded-3xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Accuracy
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {displayScore !== null ? `${Math.round(displayScore / 20)}%` : "--"}
            </div>
          </div>
          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
            displayScore ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/10 text-slate-300"
          }`}>
            {displayScore ? (
              <>
                <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                Live
              </>
            ) : (
              "Pending"
            )}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-xs text-slate-400 font-medium truncate min-w-0">
            {displayScore !== null ? `${displayScore} / 2000 points` : "Take first diagnostic mock"}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none">
            {[40, 55, 60, 75, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? "bg-emerald-400" : "bg-slate-700"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Predicted Percentile (Royal Blue Card) */}
      <div className="bg-[#0284C7] text-white rounded-3xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(2,132,199,0.25)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-100">
              Percentile
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {displayPercentile !== null ? displayPercentile : "--"}
            </div>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20 shrink-0">
            <ArrowUp className="w-3 h-3 stroke-[2.5]" />
            {displayPercentile ? "Projected" : "Baseline"}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-xs text-sky-100 font-medium truncate min-w-0">
            {displayPercentile ? "All-India cohort projection" : "Requires 150 Qs calibration"}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none">
            {[30, 45, 65, 80, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? "bg-white" : "bg-white/40"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Active Study Streak (Dark Charcoal Card) */}
      <div className="bg-[#1C1C1C] text-white rounded-3xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Study Streak
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 flex items-baseline gap-1">
              {dailyStreak} <span className="text-sm font-semibold text-amber-400">Days</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
            Active
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-xs text-slate-400 font-medium truncate min-w-0">
            {dailyStreak > 0 ? "Daily practice consistency" : "Solve 1 mock today"}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none">
            {[25, 45, 60, 75, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? "bg-amber-400" : "bg-slate-700"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
