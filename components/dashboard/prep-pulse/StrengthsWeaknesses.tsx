import React from 'react';
import Link from 'next/link';
import { TopicMastery } from '@/types';
import { normalizeSubject } from '@/lib/analytics';

interface StrengthsWeaknessesProps {
  weaknesses?: TopicMastery[];
  strengths?: TopicMastery[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  weaknesses = [],
}) => {
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
    <div className="app-card space-y-4 h-full flex flex-col justify-between">
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-[var(--text)] leading-[1.25]">
              Topics to fix
            </h2>
            <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
              Focus areas identified from your practice test errors.
            </p>
          </div>

          <Link
            href="/dashboard/radar"
            className="text-[13px] font-medium text-[var(--accent)] hover:underline shrink-0 ml-2"
          >
            View all
          </Link>
        </div>

        {/* Main List */}
        <div className="space-y-3 pt-3">
          {displayWeaknesses.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-[14px] font-medium text-[var(--text)]">
                No topics need attention yet
              </p>
              <p className="text-[13px] text-[var(--text-secondary)] max-w-sm mx-auto">
                Complete practice tests to identify specific topics for targeted review.
              </p>
            </div>
          ) : (
            displayWeaknesses.map((w, idx) => {
              const subjectKey = normalizeSubject(w.subject).key;
              const topicTitle = w.chapter || w.microTopic || 'Domain concept';
              const attempts = w.attemptsCount || 0;
              const isLowData = attempts < 10;

              return (
                <div
                  key={`weakness-${idx}`}
                  className="p-3.5 rounded-[8px] border border-[var(--border)] flex flex-col gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-medium text-[var(--text-muted)]">
                        {w.subject}
                      </span>
                      <span className="text-[12px] font-medium text-[var(--danger)] bg-[var(--danger-subtle)] px-2 py-0.5 rounded-[6px]">
                        Needs work
                      </span>
                      {isLowData && (
                        <span className="text-[12px] font-medium text-slate-500 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-[6px]">
                          Low data
                        </span>
                      )}
                    </div>

                    <h3 className="text-[15px] font-semibold text-[var(--text)] line-clamp-2 leading-snug" title={topicTitle}>
                      {topicTitle}
                    </h3>

                    <p className="text-[13px] text-[var(--text-secondary)] tabular-nums">
                      Based on {attempts} {attempts === 1 ? 'question' : 'questions'} • {w.accuracyPercentage}% accuracy
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[var(--border)] gap-2">
                    <Link
                      href={`/dashboard/notes/${subjectKey}`}
                      className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:underline"
                    >
                      Read notes
                    </Link>
                    <Link
                      href={`/dashboard/radar?subject=${subjectKey}`}
                      className="inline-flex items-center justify-center h-8 px-3.5 rounded-[6px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-medium transition-colors shadow-xs"
                    >
                      Practice this topic
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
