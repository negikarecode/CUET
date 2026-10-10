import React from 'react';
import Link from 'next/link';
import { useTestStore } from '@/lib/store/useTestStore';
import { RecordedTestAttempt } from '@/types';
import { formatDateIndian, MARKING_SCHEME } from '@/lib/config/dashboardConfig';

export const RecentEvaluationsTable: React.FC = () => {
  const testAttempts = useTestStore((s) => s.testAttempts) || [];
  const hasRealAttempts = testAttempts.length > 0;

  return (
    <div className="app-card space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div>
          <h2 className="text-[20px] font-semibold text-[var(--text)] leading-[1.25]">
            Recent sessions
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] mt-0.5">
            Your latest completed practice tests and mock attempts.
          </p>
        </div>

        {hasRealAttempts && (
          <Link
            href="/dashboard/mocks"
            className="text-[14px] font-medium text-[var(--accent)] hover:underline"
          >
            All tests
          </Link>
        )}
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
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden sm:table w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[12px] font-medium text-[var(--text-muted)]">
                <th className="py-3 pr-4 font-medium">Test title</th>
                <th className="py-3 px-4 font-medium">Subject</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium text-right">Score</th>
                <th className="py-3 px-4 font-medium text-right">Accuracy</th>
                <th className="py-3 pl-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {testAttempts.slice(0, 5).map((att: RecordedTestAttempt, idx: number) => {
                const formattedDate = formatDateIndian(att.submittedAt || new Date());
                const maxMarks = att.maxMarks || MARKING_SCHEME.MAX_MARKS_PER_SUBJECT;
                const title = att.testTitle || `${att.subject || 'Domain'} CBT Mock Test`;

                return (
                  <tr
                    key={att.id || `attempt-${idx}`}
                    className="h-12 border-b border-[var(--border)] text-[14px] hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3 pr-4 font-medium text-[var(--text)] truncate max-w-[200px]">
                      {title}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">
                      {att.subject || 'Domain'}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-muted)] whitespace-nowrap">
                      {formattedDate}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[var(--text)] tabular-nums whitespace-nowrap">
                      {att.totalMarks} / {maxMarks}
                    </td>
                    <td className="py-3 px-4 text-right text-[var(--text-secondary)] tabular-nums whitespace-nowrap">
                      {att.accuracyPercentage}%
                    </td>
                    <td className="py-3 pl-4 text-right whitespace-nowrap">
                      <Link
                        href={`/dashboard/mocks`}
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
            {testAttempts.slice(0, 5).map((att: RecordedTestAttempt, idx: number) => {
              const formattedDate = formatDateIndian(att.submittedAt || new Date());
              const maxMarks = att.maxMarks || MARKING_SCHEME.MAX_MARKS_PER_SUBJECT;
              const title = att.testTitle || `${att.subject || 'Domain'} CBT Mock Test`;

              return (
                <div
                  key={att.id || `mobile-att-${idx}`}
                  className="p-3 rounded-[8px] border border-[var(--border)] space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[var(--text)]">
                        {title}
                      </h3>
                      <p className="text-[12px] text-[var(--text-muted)]">
                        {att.subject || 'Domain'} • {formattedDate}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/mocks`}
                      className="text-[14px] font-medium text-[var(--accent)] shrink-0"
                    >
                      Review
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-[14px] pt-1 border-t border-[var(--border)] tabular-nums">
                    <span className="text-[var(--text-secondary)]">Score: {att.totalMarks} / {maxMarks}</span>
                    <span className="font-medium text-[var(--text)]">Accuracy: {att.accuracyPercentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentEvaluationsTable;
