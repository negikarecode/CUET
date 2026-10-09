import React from 'react';
import { Calendar, Star, BarChart2, ArrowUp } from 'lucide-react';

// Mini Sparkline Bar Chart matching reference inspiration (4 soft pastel bars + 1 solid active bar)
interface SparklineBarsProps {
  type: 'blue' | 'amber' | 'emerald';
  data?: number[];
}

// Ascending 5-step proportions matching the design inspiration
const DEFAULT_HEIGHTS = [20, 36, 52, 72, 100];

const SparklineBars: React.FC<SparklineBarsProps> = ({ type, data }) => {
  const heights = React.useMemo(() => {
    if (data && data.length >= 5) {
      const slice = data.slice(-5);
      const min = Math.min(...slice);
      const max = Math.max(...slice);
      const range = max - min || 1;
      return slice.map(v => Math.round(20 + ((v - min) / range) * 80));
    }
    return DEFAULT_HEIGHTS;
  }, [data]);

  const colorConfig = {
    blue: {
      pastel: 'bg-[#BFDBFE]',
      solid: 'bg-[#2563EB]',
    },
    amber: {
      pastel: 'bg-[#FDE68A]',
      solid: 'bg-[#F59E0B]',
    },
    emerald: {
      pastel: 'bg-[#A7F3D0]',
      solid: 'bg-[#10B981]',
    },
  };

  const colors = colorConfig[type];

  return (
    <div className="flex items-end gap-1.5 h-11 justify-end shrink-0 pl-2 select-none" aria-hidden="true">
      {heights.map((h, idx) => {
        const isLast = idx === heights.length - 1;
        return (
          <div
            key={idx}
            className={`w-1.5 rounded-t-[2px] rounded-b-[1px] transition-all duration-300 ${
              isLast ? colors.solid : colors.pastel
            }`}
            style={{ height: `${h}%` }}
          />
        );
      })}
    </div>
  );
};

interface TopMetricsRowProps {
  totalAttempted?: number;
  averageScore?: number;
  percentile?: number;
}

export const TopMetricsRow: React.FC<TopMetricsRowProps> = ({
  totalAttempted = 0,
  averageScore = 0,
  percentile = 0,
}) => {
  const hasAttempts = totalAttempted > 0;
  const displayAttempted = hasAttempts ? totalAttempted : 0;
  const displayScore = hasAttempts && averageScore > 0 ? averageScore : null;
  const displayPercentile = hasAttempts && percentile > 0 ? `${percentile.toFixed(1)}%` : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
      
      {/* 1. Total Tests Attempted */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[175px] group">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#2563EB] shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">
                TOTAL QUESTIONS
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">
                ATTEMPTED
              </span>
            </div>
          </div>
          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-tight ${
            hasAttempts ? "bg-[#E8FAF4] text-[#10B981]" : "bg-amber-50 text-amber-800 border border-amber-200/60"
          }`}>
            {hasAttempts ? (
              <>
                <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                Active
              </>
            ) : (
              "Calibration Gate"
            )}
          </div>
        </div>

        {/* Bottom Numbers & Sparkline */}
        <div className="mt-6 flex items-end justify-between gap-2">
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
              {displayAttempted}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-2 leading-tight max-w-[130px]">
              {hasAttempts ? "Questions answered in CUET CBT format" : "0 / 150 Qs to complete calibration gate"}
            </div>
          </div>
          <SparklineBars type="blue" data={hasAttempts ? [Math.max(1, Math.round(displayAttempted * 0.2)), Math.max(1, Math.round(displayAttempted * 0.4)), Math.max(1, Math.round(displayAttempted * 0.6)), Math.max(1, Math.round(displayAttempted * 0.8)), displayAttempted] : [20, 20, 20, 20, 20]} />
        </div>
      </div>

      {/* 2. Average Score */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[175px] group">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF9EE] flex items-center justify-center text-[#F59E0B] shrink-0 group-hover:scale-105 transition-transform">
              <Star className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">
                AVERAGE ACCURACY
              </span>
            </div>
          </div>
          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-tight ${
            displayScore ? "bg-[#E8FAF4] text-[#10B981]" : "bg-slate-100 text-slate-600"
          }`}>
            {displayScore ? "Live Calculated" : "Pending Mock"}
          </div>
        </div>

        {/* Bottom Numbers & Sparkline */}
        <div className="mt-6 flex items-end justify-between gap-2">
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none flex items-baseline">
              {displayScore !== null ? (
                <>
                  {displayScore} <span className="text-lg font-medium text-slate-400 ml-0.5">/2000</span>
                </>
              ) : (
                <span className="text-slate-400">--</span>
              )}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-2 leading-tight">
              {displayScore !== null ? "Derived from verified answers" : "Take a mock test to establish score"}
            </div>
          </div>
          <SparklineBars type="amber" data={displayScore ? [1200, 1300, 1380, 1450, displayScore] : [20, 20, 20, 20, 20]} />
        </div>
      </div>

      {/* 3. Overall Percentile */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[175px] group">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAFBF3] flex items-center justify-center text-[#10B981] shrink-0 group-hover:scale-105 transition-transform">
              <BarChart2 className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">
                ESTIMATED PERCENTILE
              </span>
            </div>
          </div>
          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-tight ${
            displayPercentile ? "bg-[#E8FAF4] text-[#10B981]" : "bg-slate-100 text-slate-600"
          }`}>
            {displayPercentile ? "Calibrated" : "Calibration Gate"}
          </div>
        </div>

        {/* Bottom Numbers & Sparkline */}
        <div className="mt-6 flex items-end justify-between gap-2">
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
              {displayPercentile !== null ? displayPercentile : <span className="text-slate-400">--</span>}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-2 leading-tight">
              {displayPercentile !== null ? "All-India cohort projection" : "Requires 150 questions across mocks"}
            </div>
          </div>
          <SparklineBars type="emerald" data={displayPercentile ? [60, 68, 75, 82, Math.round(percentile)] : [20, 20, 20, 20, 20]} />
        </div>
      </div>

    </div>
  );
};
