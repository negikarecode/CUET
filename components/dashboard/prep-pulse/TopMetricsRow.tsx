import React from 'react';
import { Target, CheckCircle2, HelpCircle, Flame } from 'lucide-react';
import { MARKING_SCHEME, CALIBRATION_THRESHOLDS } from '@/lib/config/dashboardConfig';

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
  score = 10,
  maxScore = MARKING_SCHEME.MAX_SCORE_PER_SUBJECT,
  accuracyPercentage = 20,
  correctCount = 10,
  totalAttempted = 50,
  dailyStreak = 1,
}) => {
  const hasAttempts = totalAttempted > 0;
  const isCalibrated = totalAttempted >= CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_GATE;

  // Semantic badge helpers
  const getScoreBadge = () => {
    if (!hasAttempts) return { label: 'No attempts', className: 'bg-white/10 text-slate-300 border-white/20' };
    if (score >= 200) return { label: 'High score', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' };
    if (score >= 120) return { label: 'Moderate', className: 'bg-sky-500/20 text-sky-200 border-sky-400/30' };
    return { label: 'Baseline', className: 'bg-amber-500/20 text-amber-200 border-amber-400/30' };
  };

  const getAccuracyBadge = () => {
    if (!hasAttempts) return { label: 'Pending', className: 'bg-white/10 text-slate-300 border-white/20' };
    if (accuracyPercentage >= 75) return { label: 'Strong', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' };
    if (accuracyPercentage >= 50) return { label: 'Average', className: 'bg-sky-500/20 text-sky-200 border-sky-400/30' };
    return { label: 'Needs focus', className: 'bg-rose-500/20 text-rose-300 border-rose-400/30' };
  };

  const scoreBadge = getScoreBadge();
  const accuracyBadge = getAccuracyBadge();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
      {/* 1. Score Card (Vibrant Sky Blue Card) */}
      <div className="bg-[#0C8CE9] text-white rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(12,140,233,0.25)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-sky-100 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-sky-200" />
              Current Score
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 font-mono">
              {hasAttempts ? `${score} / ${maxScore} pts` : '--'}
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shrink-0 ${scoreBadge.className}`}>
            {scoreBadge.label}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-[13px] text-sky-100 font-medium truncate min-w-0">
            {hasAttempts ? 'CUET (+5 correct, -1 incorrect)' : 'Take first mock to score'}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none" aria-hidden="true">
            {[35, 50, 65, 80, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? 'bg-white' : 'bg-white/40'
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Accuracy Card (Dark Charcoal Card) */}
      <div className="bg-[#1C1C1C] text-white rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              Accuracy
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 font-mono">
              {hasAttempts ? `${accuracyPercentage}%` : '--'}
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${accuracyBadge.className}`}>
            {accuracyBadge.label}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-[13px] text-slate-300 font-medium truncate min-w-0">
            {hasAttempts ? `${correctCount} of ${totalAttempted} correct` : 'No attempts recorded'}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none" aria-hidden="true">
            {[40, 55, 60, 75, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? 'bg-emerald-400' : 'bg-slate-700'
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Questions Attempted Card (Royal Blue Card) */}
      <div className="bg-[#0284C7] text-white rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(2,132,199,0.25)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-sky-100 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-sky-200" />
              Questions
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 font-mono">
              {totalAttempted.toLocaleString()}
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shrink-0 ${
            isCalibrated
              ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
              : 'bg-amber-500/20 text-amber-200 border-amber-400/30'
          }`}>
            {isCalibrated ? 'Calibrated' : `${totalAttempted}/150 Qs`}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-[13px] text-sky-100 font-medium truncate min-w-0">
            {isCalibrated ? 'Full calibration unlocked' : `${Math.max(0, 150 - totalAttempted)} Qs to unlock diagnostics`}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none" aria-hidden="true">
            {[30, 45, 65, 80, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? 'bg-white' : 'bg-white/40'
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Active Study Streak Card (Dark Charcoal Card) */}
      <div className="bg-[#1C1C1C] text-white rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px] group relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[13px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              Study Streak
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 flex items-baseline gap-1 font-mono">
              {dailyStreak} <span className="text-sm font-semibold text-amber-400">{dailyStreak === 1 ? 'Day' : 'Days'}</span>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${
            dailyStreak > 0
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              : 'bg-white/10 text-slate-400 border-white/10'
          }`}>
            {dailyStreak > 0 ? `${dailyStreak}d Streak` : 'Start today'}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <span className="text-[13px] text-slate-300 font-medium truncate min-w-0">
            {dailyStreak > 0 ? 'Daily practice consistency' : 'Solve 1 mock today to start'}
          </span>
          <div className="flex items-end gap-1 h-9 justify-end shrink-0 select-none" aria-hidden="true">
            {[25, 45, 60, 75, 100].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-t-[2px] transition-all ${
                  i === 4 ? 'bg-amber-400' : 'bg-slate-700'
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

export default TopMetricsRow;
