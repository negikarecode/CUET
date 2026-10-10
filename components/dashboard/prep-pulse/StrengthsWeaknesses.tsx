import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { TopicMastery } from '@/types';
import { GlowCard } from './GlowCard';
import { getTopicConfidence, formatPlainLanguageDiagnosis } from '@/lib/config/dashboardConfig';
import { normalizeSubject } from '@/lib/analytics';

interface StrengthsWeaknessesProps {
  weaknesses?: TopicMastery[];
  strengths?: TopicMastery[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  weaknesses = [],
  strengths = [],
}) => {
  // Sort weaknesses by priority:
  // Topics with >= 10 attempts come first, then lowest accuracy, then highest incorrect count
  const sortedWeaknesses = [...weaknesses].sort((a, b) => {
    const aHigh = (a.attemptsCount || 0) >= 10 ? 1 : 0;
    const bHigh = (b.attemptsCount || 0) >= 10 ? 1 : 0;
    if (aHigh !== bHigh) return bHigh - aHigh;
    if (a.accuracyPercentage !== b.accuracyPercentage) {
      return a.accuracyPercentage - b.accuracyPercentage;
    }
    return (b.incorrectCount || 0) - (a.incorrectCount || 0);
  });

  const displayWeaknesses = sortedWeaknesses.slice(0, 3);
  const displayStrengths = strengths.slice(0, 2);

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Diagnostic Strengths &amp; Priority Weaknesses
          </h2>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Calibrated against CUET negative marking and question attempts
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{displayWeaknesses.length + displayStrengths.length} Topics Identified</span>
        </span>
      </div>

      {/* Main List */}
      <div className="my-auto py-3 space-y-3.5">
        {displayWeaknesses.length === 0 && displayStrengths.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <Target className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-[13px] font-semibold text-slate-700">No diagnostic topics yet</p>
            <p className="text-[13px] text-slate-500 max-w-sm mx-auto">
              Complete your first CBT mock test to calibrate topic-level accuracy.
            </p>
          </div>
        ) : (
          <>
            {/* Weakness Rows */}
            {displayWeaknesses.map((w, idx) => {
              const confidence = getTopicConfidence(w.attemptsCount || 0);
              const plainDiagnosis = formatPlainLanguageDiagnosis({
                primaryDiagnosis: w.fullDiagnosis?.primaryDiagnosis || (w.accuracyPercentage < 50 ? 'Conceptual Gap' : 'Precision Slip'),
                contributingFactor: w.fullDiagnosis?.contributingFactor,
                avgTimeSeconds: w.avgTimeSeconds,
                accuracyPercentage: w.accuracyPercentage,
              });
              const subjectKey = normalizeSubject(w.subject).key;

              return (
                <div
                  key={`weakness-${idx}`}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-600 mt-0.5">
                      {confidence.isReliable ? (
                        <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 stroke-[2.2]" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {w.subject}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${confidence.badgeColorClass}`}>
                          {confidence.badgeLabel}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {w.chapter || w.microTopic}
                      </h3>

                      <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                        {plainDiagnosis.humanSentence}
                      </p>

                      <div className="flex items-center gap-3 text-[13px] text-slate-500 font-mono pt-0.5">
                        <span className="font-bold text-rose-600">{w.accuracyPercentage}% Accuracy</span>
                        <span>•</span>
                        <span>{w.attemptsCount} Attempts</span>
                        {w.avgTimeSeconds ? (
                          <>
                            <span>•</span>
                            <span>Avg {w.avgTimeSeconds}s / Q</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Individual "Practice this" button for EVERY row (Phase 2 #6) */}
                  <div className="shrink-0 self-end sm:self-center pt-2 sm:pt-0">
                    <Link
                      href={`/dashboard/radar?subject=${subjectKey}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-2xs hover:shadow-sm"
                    >
                      <span>Practice this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Strengths Rows */}
            {displayStrengths.map((s, idx) => {
              const subjectKey = normalizeSubject(s.subject).key;
              return (
                <div
                  key={`strength-${idx}`}
                  className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 text-emerald-700 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                          {s.subject}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Mastered Topic
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900">
                        {s.chapter || s.microTopic}
                      </h3>

                      <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                        Strong concept stability and speed. Maintain periodic revision.
                      </p>

                      <div className="flex items-center gap-3 text-[13px] text-slate-500 font-mono pt-0.5">
                        <span className="font-bold text-emerald-600">{s.accuracyPercentage}% Accuracy</span>
                        <span>•</span>
                        <span>{s.attemptsCount} Attempts</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 self-end sm:self-center pt-2 sm:pt-0">
                    <Link
                      href={`/dashboard/radar?subject=${subjectKey}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all shadow-2xs"
                    >
                      <span>Review drills</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[13px] text-slate-500">
        <span>Click &ldquo;Practice this&rdquo; on any topic to launch targeted repair drill</span>
        <Link
          href="/dashboard/radar"
          className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
        >
          <span>All topics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </GlowCard>
  );
};

export default StrengthsWeaknesses;
