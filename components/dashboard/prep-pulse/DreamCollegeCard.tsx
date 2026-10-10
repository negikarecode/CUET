import React from 'react';
import Link from 'next/link';
import { MapPin, Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import { calculateCollegeReadiness } from '@/lib/college-benchmarks';
import { GlowCard } from './GlowCard';

interface DreamCollegeCardProps {
  targetCollege?: string;
  targetUniversity?: string;
  accuracyPercentage?: number;
  totalAttempts?: number;
  currentScore?: number;
}

export const DreamCollegeCard: React.FC<DreamCollegeCardProps> = ({
  targetCollege = 'Shri Ram College of Commerce',
  targetUniversity = 'Delhi University',
  accuracyPercentage = 0,
  totalAttempts = 0,
  currentScore = 0,
}) => {
  const readiness = calculateCollegeReadiness(
    targetCollege,
    targetUniversity,
    accuracyPercentage,
    totalAttempts,
    currentScore
  );

  const getCollegeImage = (college: string) => {
    const c = college.toLowerCase();
    if (c.includes('srcc') || c.includes('shri ram') || c.includes('commerce')) {
      return '/assets/images/srcc.jpg';
    }
    if (c.includes('hindu')) {
      return '/assets/images/hindu-college.jpg';
    }
    if (c.includes('stephen')) {
      return '/assets/images/st-stephens.jpg';
    }
    if (c.includes('miranda')) {
      return '/assets/images/miranda-house.jpg';
    }
    return '/assets/images/delhi-university.jpg';
  };

  const collegeImg = getCollegeImage(targetCollege);

  return (
    <GlowCard className="p-0 overflow-hidden h-full flex flex-col justify-between group">
      {/* Top Banner with Real Campus Photo */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${collegeImg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/50 backdrop-blur-md text-white border border-white/20">
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            Dream College Target
          </span>
          <span
            title={readiness.gapExplanation}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md cursor-help ${readiness.statusBadgeClass}`}
          >
            <Sparkles className="w-3 h-3" />
            {readiness.statusLabel}
          </span>
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-sm">
            {targetCollege}
          </h3>
          <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
            <span>{readiness.campus} • {targetUniversity}</span>
          </p>
        </div>
      </div>

      {/* Body Content with Benchmarks */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Metric Comparison Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Historical Cutoff
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">
              {readiness.historicalCutoffPercentile}%ile
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
              NTA CUET Standard
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
              Target Score
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-blue-900 font-mono mt-0.5 block">
              {readiness.targetScoreFormatted}
            </span>
            <span className="text-[10px] text-blue-600 font-medium mt-0.5 block">
              Required Benchmark
            </span>
          </div>
        </div>

        {/* Gap & Recommendation Note with Tooltip */}
        <div
          title={readiness.gapExplanation}
          className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed space-y-1 cursor-help"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-slate-700">Target Gap:</span>
            <span className="font-mono text-rose-600 font-bold">{readiness.gapLabel}</span>
          </div>
          <p className="font-medium text-[11px] text-slate-600">
            {readiness.recommendation}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/dashboard/mocks"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-[0.99]"
          >
            <span>Practice Calibrated Mocks for {targetCollege.slice(0, 16)}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </GlowCard>
  );
};

export default DreamCollegeCard;
