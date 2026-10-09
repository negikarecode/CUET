import React, { useState } from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { STRENGTHS_WEAKNESSES } from '@/lib/data/dashboardMockData';
import { GlowCard } from './GlowCard';

export const StrengthsWeaknesses: React.FC = () => {
  const [practiceGenerated, setPracticeGenerated] = useState(false);

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'strength':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'improvement':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-600 shadow-2xs">
            <TrendingUp className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-600 shadow-2xs">
            <AlertCircle className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'critical':
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center justify-center shrink-0 text-rose-600 shadow-2xs">
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GlowCard className="p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Strengths & Weaknesses
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            AI-driven diagnostic suggestions
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 action-glow cursor-default">
          <Sparkles className="w-3 h-3 text-blue-600" /> 4 Insights
        </span>
      </div>

      {/* Itemized List with Status Icon Badges and Action Glow */}
      <div className="space-y-3 my-auto py-3">
        {STRENGTHS_WEAKNESSES.map((item) => (
          <div 
            key={item.id}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-all group cursor-pointer border border-transparent hover:border-slate-200/50 action-glow"
          >
            {getStatusIcon(item.type)}
            
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-tight">
                {item.title}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                {item.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action CTA with Glow effect */}
      <div className="pt-3 border-t border-slate-50">
        <button
          onClick={() => {
            setPracticeGenerated(true);
            setTimeout(() => setPracticeGenerated(false), 3000);
          }}
          className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-2 group active:scale-[0.99] action-glow"
        >
          {practiceGenerated ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Calculus & Organic Drill Created!</span>
            </>
          ) : (
            <>
              <span>Practice Weak Areas (15-min Drill)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-slate-700 transition-all" />
            </>
          )}
        </button>
      </div>
    </GlowCard>
  );
};
