import React from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { TopicMastery } from '@/types';
import { GlowCard } from './GlowCard';

interface StrengthsWeaknessesProps {
  weaknesses?: TopicMastery[];
  strengths?: TopicMastery[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  weaknesses = [],
  strengths = [],
}) => {
  // Combine top authentic weaknesses and top authentic strengths (up to 4 total)
  const items = [
    ...weaknesses.slice(0, 2).map((w, i) => ({
      id: `weakness-${i}`,
      type: w.accuracyPercentage < 40 ? ('critical' as const) : ('warning' as const),
      subject: w.subject,
      title: `${w.subject}: ${w.chapter || w.microTopic}`,
      subtitle: `${w.accuracyPercentage}% accuracy across ${w.attemptsCount} questions. ${w.diagnosticInsight || 'Targeted drill recommended.'}`,
    })),
    ...strengths.slice(0, 2).map((s, i) => ({
      id: `strength-${i}`,
      type: ('strength' as const),
      subject: s.subject,
      title: `${s.subject}: ${s.chapter || s.microTopic}`,
      subtitle: `${s.accuracyPercentage}% accuracy across ${s.attemptsCount} questions. High concept stability.`,
    })),
  ];

  const totalInsights = items.length;

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
    <GlowCard className="p-6 h-full flex flex-col justify-between">
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
          <Sparkles className="w-3 h-3 text-blue-600" /> {totalInsights > 0 ? `${totalInsights} Insights` : 'Calibrating'}
        </span>
      </div>

      {/* Itemized List or Honest Calibration Gate */}
      {items.length === 0 ? (
        <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
          <Sparkles className="w-8 h-8 text-blue-400/50 mb-2" />
          <p className="text-sm font-semibold text-slate-700">No diagnostic suggestions yet</p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Complete your first mock test or practice set to identify strengths and priority weak areas.
          </p>
        </div>
      ) : (
        <div className="space-y-3 my-auto py-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/dashboard/radar?subject=${encodeURIComponent(item.subject)}`}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 transition-all group cursor-pointer border border-transparent hover:border-slate-200/50 action-glow"
            >
              {getStatusIcon(item.type)}
              
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 leading-tight transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                  {item.subtitle}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Action CTA with Glow effect */}
      <div className="pt-3 border-t border-slate-50">
        {(() => {
          const primaryWeakness = weaknesses[0];
          return (
            <Link
              href={primaryWeakness ? `/dashboard/radar?subject=${encodeURIComponent(primaryWeakness.subject)}` : '/test'}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-2 group active:scale-[0.99] action-glow"
            >
              <span>
                {primaryWeakness 
                  ? `Practice Weak Areas (${primaryWeakness.chapter || primaryWeakness.microTopic})` 
                  : 'Start Diagnostic Drill'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-slate-700 transition-all" />
            </Link>
          );
        })()}
      </div>
    </GlowCard>
  );
};

export default StrengthsWeaknesses;
