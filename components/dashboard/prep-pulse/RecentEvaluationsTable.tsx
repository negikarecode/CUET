import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, History } from 'lucide-react';
import { useTestStore } from '@/lib/store/useTestStore';
import { RecordedTestAttempt } from '@/types';
import { formatDateTimeIndian, MARKING_SCHEME } from '@/lib/config/dashboardConfig';
import { deduplicateTestAttempts } from '@/lib/analytics';

export const RecentEvaluationsTable: React.FC = () => {
  const rawAttempts = useTestStore((s) => s.testAttempts);

  // Deduplicate attempts strictly and sort newest first
  const sortedAttempts = useMemo(() => {
    const attempts = rawAttempts || [];
    const deduped = deduplicateTestAttempts(attempts);
    return deduped.sort((a, b) => {
      const timeA = new Date(a.submittedAt || (a as any).date || 0).getTime();
      const timeB = new Date(b.submittedAt || (b as any).date || 0).getTime();
      return timeB - timeA;
    });
  }, [rawAttempts]);

  const hasRealAttempts = sortedAttempts.length > 0;
  const hasMoreThan5 = sortedAttempts.length > 5;
  const displayedAttempts = sortedAttempts.slice(0, 5);

  return (
    <div className="app-card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-semibold text-[var(--text)] leading-[1.25]">
              Recent sessions
            </h2>
            {hasRealAttempts && (
              <span className="text-[13px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {sortedAttempts.length} total
              </span>
            )}
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] mt-0.5">
            Your latest completed practice tests and mock attempts.
          </p>
        </div>

        {hasMoreThan5 ? (
          <Link
            href="/dashboard/sessions"
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--accent)] hover:underline"
          >
            <span>Full history ({sortedAttempts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : hasRealAttempts ? (
          <Link
            href="/dashboard/mocks"
            className="text-[14px] font-medium text-[var(--accent)] hover:underline"
          >
            All tests
          </Link>
        ) : null}
      </div>

      {!hasRealAttempts ? (
        <div className="py-12 text-center space-y-3">
          <p className="text-[14px] text-[var(--text-secondary)]">
            No test sessions recorded yet.
          </p>
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center justify-center h-10 px-4 rounded-[8px] border border-[var(--border-strong)] bg-white hover:bg-slate-50 text-[14px] font-medium text-[var(--text)] transition-colors"
          >
            Take a mock test
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="hidden sm:table w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[13px] font-medium text-[var(--text-muted)]">
                  <th className="py-3 pr-4 font-medium">Test title</th>
                  <th className="py-3 px-4 font-medium">Subject</th>
                  <th className="py-3 px-4 font-medium">Date & Time</th>
                  <th className="py-3 px-4 font-medium text-right">Score</th>
                  <th className="py-3 px-4 font-medium text-right">Accuracy</th>
                  <th className="py-3 pl-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedAttempts.map((att: RecordedTestAttempt) => {
                  const formattedDateTime = formatDateTimeIndian(att.submittedAt || new Date());
                  const isPracticeTest =
                    att.testTitle?.toLowerCase().includes("practice") ||
                    att.testTitle?.toLowerCase().includes("unit") ||
                    (att.totalQuestions && att.totalQuestions <= 20);
                  const maxMarks = att.maxMarks || (isPracticeTest ? 100 : MARKING_SCHEME.MAX_MARKS_PER_SUBJECT);
                  const title = att.testTitle || `${att.subject || 'Domain'} CBT Mock Test`;
                  const reviewHref = (att.id || att.testId)
                    ? (att.testId?.toLowerCase().includes("pyq")
                        ? `/dashboard/pyqs/analysis/${att.id || att.testId}`
                        : `/dashboard/mocks/analysis/${att.id || att.testId}`)
                    : `/dashboard/mocks`;

                  return (
                    <tr
                      key={att.id}
                      className="border-b border-[var(--border)] text-[14px] hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3 pr-4 font-medium text-[var(--text)] max-w-[280px]">
                        <span className="line-clamp-2 leading-snug" title={title}>
                          {title}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">
                        {att.subject || 'Domain'}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-muted)] text-[13px] whitespace-nowrap">
                        {formattedDateTime}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-[var(--text)] tabular-nums whitespace-nowrap">
                        {att.totalMarks} / {maxMarks}
                      </td>
                      <td className="py-3 px-4 text-right text-[var(--text-secondary)] tabular-nums whitespace-nowrap">
                        {att.accuracyPercentage}%
                      </td>
                      <td className="py-3 pl-4 text-right whitespace-nowrap">
                        <Link
                          href={reviewHref}
                          className="text-[14px] font-medium text-[var(--accent)] hover:underline"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Mobile Collapsed Cards (<640px) */}
            <div className="sm:hidden space-y-3">
              {displayedAttempts.map((att: RecordedTestAttempt) => {
                const formattedDateTime = formatDateTimeIndian(att.submittedAt || new Date());
                const isPracticeTest =
                  att.testTitle?.toLowerCase().includes("practice") ||
                  att.testTitle?.toLowerCase().includes("unit") ||
                  (att.totalQuestions && att.totalQuestions <= 20);
                const maxMarks = att.maxMarks || (isPracticeTest ? 100 : MARKING_SCHEME.MAX_MARKS_PER_SUBJECT);
                const title = att.testTitle || `${att.subject || 'Domain'} CBT Mock Test`;
                const reviewHref = (att.id || att.testId)
                  ? (att.testId?.toLowerCase().includes("pyq")
                      ? `/dashboard/pyqs/analysis/${att.id || att.testId}`
                      : `/dashboard/mocks/analysis/${att.id || att.testId}`)
                  : `/dashboard/mocks`;

                return (
                  <div
                    key={att.id}
                    className="p-3.5 rounded-[8px] border border-[var(--border)] space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-semibold text-[var(--text)] line-clamp-2 leading-snug" title={title}>
                          {title}
                        </h3>
                        <p className="text-[13px] text-[var(--text-muted)] mt-0.5">
                          {att.subject || 'Domain'} • {formattedDateTime}
                        </p>
                      </div>
                      <Link
                        href={reviewHref}
                        className="text-[14px] font-medium text-[var(--accent)] shrink-0 ml-2"
                      >
                        Review
                      </Link>
                    </div>

                    <div className="flex items-center justify-between text-[14px] pt-1.5 border-t border-[var(--border)] tabular-nums">
                      <span className="text-[var(--text-secondary)]">Score: {att.totalMarks} / {maxMarks}</span>
                      <span className="font-medium text-[var(--text)]">Accuracy: {att.accuracyPercentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full History Bar if more than 5 attempts */}
          {hasMoreThan5 && (
            <div className="pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/60 p-3 rounded-[8px]">
              <div className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                <History className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>
                  Showing latest <strong>5</strong> of <strong>{sortedAttempts.length}</strong> completed sessions
                </span>
              </div>
              <Link
                href="/dashboard/sessions"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-[6px] bg-white border border-[var(--border-strong)] hover:border-[var(--accent)] text-[13px] font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-all shadow-sm shrink-0"
              >
                <span>Full history of sessions</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentEvaluationsTable;
