import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Target } from "lucide-react";
import { TopicMastery } from "@/types";
import { normalizeSubject } from "@/lib/analytics";

interface StrengthsWeaknessesProps {
  weaknesses?: TopicMastery[];
  strengths?: TopicMastery[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  weaknesses = [],
}) => {
  // Sort by priority: high data first, then lowest accuracy, then highest incorrect count
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs h-full flex flex-col justify-between space-y-4">
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Topics to Fix
              </h2>
            </div>
          </div>

          <Link
            href="/dashboard/ai-coach"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline shrink-0 flex items-center gap-1"
          >
            <span>AI Coach</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Priority focus areas identified from your practice test errors.
        </p>

        {/* Main List */}
        <div className="space-y-3 pt-3">
          {displayWeaknesses.length === 0 ? (
            <div className="py-10 text-center space-y-2 bg-slate-50/60 rounded-xl border border-dashed border-slate-200 p-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-semibold text-slate-800">
                No critical weaknesses detected
              </h3>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Complete mock and practice tests to calibrate topic mastery.
              </p>
            </div>
          ) : (
            displayWeaknesses.map((w, idx) => {
              const subjectKey = normalizeSubject(w.subject).key;
              const topicTitle = w.chapter || w.microTopic || "Domain concept";
              const attempts = w.attemptsCount || 0;
              const isStrongEvidence = attempts >= 20;
              const isDeveloping = attempts >= 10 && attempts < 20;

              return (
                <div
                  key={`weakness-${idx}`}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-col gap-2.5"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                        {w.subject}
                      </span>

                      {isStrongEvidence ? (
                        <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          High confidence ({attempts} Qs)
                        </span>
                      ) : isDeveloping ? (
                        <span className="font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                          Developing ({attempts} Qs)
                        </span>
                      ) : (
                        <span className="font-medium text-slate-500 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-md">
                          Preliminary ({attempts} Qs)
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-sm font-bold text-slate-900 line-clamp-1 leading-snug mt-1"
                      title={topicTitle}
                    >
                      {topicTitle}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                      <span>Accuracy: <strong className={w.accuracyPercentage < 50 ? "text-rose-600" : "text-amber-600"}>{w.accuracyPercentage}%</strong></span>
                      <span>{w.incorrectCount || 0} mistakes recorded</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 gap-2">
                    <Link
                      href={`/dashboard/notes/${subjectKey}`}
                      className="text-xs font-medium text-slate-600 hover:text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Review notes</span>
                    </Link>

                    <Link
                      href={`/dashboard/ai-coach?subject=${subjectKey}`}
                      className="inline-flex items-center justify-center gap-1 h-7 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <span>AI Diagnosis</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StrengthsWeaknesses;
