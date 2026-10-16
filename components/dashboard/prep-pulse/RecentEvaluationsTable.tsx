"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, History, Calendar } from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { RecordedTestAttempt } from "@/types";
import { formatDateTimeIndian, MARKING_SCHEME } from "@/lib/config/dashboardConfig";
import { deduplicateTestAttempts } from "@/lib/analytics";

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
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600">
              <History className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
              Recent Sessions
            </h2>
            {hasRealAttempts && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {sortedAttempts.length} total
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Your latest completed practice tests, full-length mocks, and PYQ simulations.
          </p>
        </div>

        {hasMoreThan5 ? (
          <Link
            href="/dashboard/sessions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            <span>Full test history ({sortedAttempts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : hasRealAttempts ? (
          <Link
            href="/dashboard/mocks"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Explore all tests
          </Link>
        ) : null}
      </div>

      {!hasRealAttempts ? (
        <div className="py-12 text-center space-y-3 bg-slate-50/60 rounded-xl border border-dashed border-slate-200 p-6">
          <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-800">
            No test sessions recorded yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Take a mock test or practice quiz to start building your diagnostic history.
          </p>
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Take a mock test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View (>=640px) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 pr-4 font-semibold">Test Title</th>
                  <th className="py-3 px-4 font-semibold">Subject</th>
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold text-right">Score</th>
                  <th className="py-3 px-4 font-semibold text-right">Accuracy</th>
                  <th className="py-3 pl-4 font-semibold text-right">Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedAttempts.map((att: RecordedTestAttempt) => {
                  const formattedDateTime = formatDateTimeIndian(att.submittedAt || new Date());
                  const isPracticeTest =
                    att.testTitle?.toLowerCase().includes("practice") ||
                    att.testTitle?.toLowerCase().includes("unit") ||
                    (att.totalQuestions && att.totalQuestions <= 20);
                  const maxMarks = att.maxMarks || (isPracticeTest ? 100 : MARKING_SCHEME.MAX_MARKS_PER_SUBJECT);
                  const title = att.testTitle || `${att.subject || "Domain"} CBT Mock Test`;
                  const reviewHref = (att.id || att.testId)
                    ? (att.testId?.toLowerCase().includes("pyq")
                        ? `/dashboard/pyqs/analysis/${att.id || att.testId}`
                        : `/dashboard/mocks/analysis/${att.id || att.testId}`)
                    : `/dashboard/mocks`;

                  return (
                    <tr
                      key={att.id}
                      className="text-xs sm:text-sm hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3.5 pr-4 font-semibold text-slate-900 max-w-[280px]">
                        <span className="line-clamp-2 leading-snug" title={title}>
                          {title}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs">
                          {att.subject || "Domain"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 text-xs tabular-nums whitespace-nowrap">
                        {formattedDateTime}
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 tabular-nums whitespace-nowrap">
                        {att.totalMarks} <span className="text-slate-400 font-normal">/ {maxMarks}</span>
                      </td>

                      <td className="py-3.5 px-4 text-right tabular-nums whitespace-nowrap">
                        <span className={`font-semibold ${
                          (att.accuracyPercentage || 0) >= 75
                            ? "text-emerald-700"
                            : (att.accuracyPercentage || 0) >= 50
                            ? "text-blue-700"
                            : "text-amber-700"
                        }`}>
                          {att.accuracyPercentage}%
                        </span>
                      </td>

                      <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                        <Link
                          href={reviewHref}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700 hover:underline"
                        >
                          <span>Review</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Collapsible Cards (<640px) */}
          <div className="sm:hidden space-y-3">
            {displayedAttempts.map((att: RecordedTestAttempt) => {
              const formattedDateTime = formatDateTimeIndian(att.submittedAt || new Date());
              const isPracticeTest =
                att.testTitle?.toLowerCase().includes("practice") ||
                att.testTitle?.toLowerCase().includes("unit") ||
                (att.totalQuestions && att.totalQuestions <= 20);
              const maxMarks = att.maxMarks || (isPracticeTest ? 100 : MARKING_SCHEME.MAX_MARKS_PER_SUBJECT);
              const title = att.testTitle || `${att.subject || "Domain"} CBT Mock Test`;
              const reviewHref = (att.id || att.testId)
                ? (att.testId?.toLowerCase().includes("pyq")
                    ? `/dashboard/pyqs/analysis/${att.id || att.testId}`
                    : `/dashboard/mocks/analysis/${att.id || att.testId}`)
                : `/dashboard/mocks`;

              return (
                <div
                  key={att.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[11px]">
                          {att.subject || "Domain"}
                        </span>
                        <span>•</span>
                        <span>{formattedDateTime}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug" title={title}>
                        {title}
                      </h3>
                    </div>

                    <Link
                      href={reviewHref}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60 shrink-0"
                    >
                      <span>Review</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/70 tabular-nums">
                    <span className="text-slate-600">
                      Score: <strong className="text-slate-900">{att.totalMarks} / {maxMarks}</strong>
                    </span>
                    <span className="font-semibold text-slate-900">
                      Accuracy: <strong className="text-blue-700">{att.accuracyPercentage}%</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full History Bar if >5 attempts */}
          {hasMoreThan5 && (
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/60 p-3 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <History className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Showing latest <strong>5</strong> of <strong>{sortedAttempts.length}</strong> completed sessions
                </span>
              </div>
              <Link
                href="/dashboard/sessions"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-xs font-semibold text-slate-800 hover:text-blue-600 transition-all shadow-xs shrink-0"
              >
                <span>Full session history</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentEvaluationsTable;
