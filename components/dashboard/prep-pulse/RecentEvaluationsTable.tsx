"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { deduplicateTestAttempts } from "@/lib/analytics";

export const RecentEvaluationsTable: React.FC = () => {
  const rawAttempts = useTestStore((state) => state.testAttempts);

  // Deduplicate and sort attempts newest first
  const sortedAttempts = useMemo(() => {
    const attempts = rawAttempts || [];
    if (attempts.length === 0) return [];
    const deduped = deduplicateTestAttempts(attempts);
    return [...deduped].sort((a, b) => {
      const ta = new Date(a.submittedAt || (a as any).date || 0).getTime();
      const tb = new Date(b.submittedAt || (b as any).date || 0).getTime();
      return tb - ta;
    });
  }, [rawAttempts]);

  const sessions = useMemo(() => {
    return sortedAttempts.slice(0, 5).map((att) => {
      const d = new Date(att.submittedAt || (att as any).date || Date.now());
      const dateStr = d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const maxMarks = att.maxMarks || 250;
      const scoreVal = att.totalMarks ?? 0;
      const scoreStr = `${scoreVal < 0 ? "−" + Math.abs(scoreVal) : scoreVal} / ${maxMarks}`;
      const accStr = `${att.accuracyPercentage ?? 0}%`;

      let reviewUrl = `/dashboard/mocks`;
      if (att.id) {
        reviewUrl = `/dashboard/mocks/analysis/${att.id}`;
      }

      return {
        id: att.id || att.testId,
        title: att.testTitle || `${att.subject || "Subject"} Full Mock Paper`,
        date: dateStr,
        score: scoreStr,
        accuracy: accStr,
        reviewUrl,
      };
    });
  }, [sortedAttempts]);

  return (
    <div className="bg-white rounded-2xl border border-[#EFE6DC] p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EFE6DC] pb-3">
        <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
          Recent sessions
        </h2>

        {sessions.length > 0 && (
          <Link
            href="/dashboard/sessions"
            className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline"
          >
            View all past sessions
          </Link>
        )}
      </div>

      {/* Content: Real sessions if present, clean empty state otherwise */}
      {sessions.length === 0 ? (
        <div className="py-10 px-4 text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-200">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">No mock evaluations yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Completed full-length CBT mock tests and official PYQ papers will appear here with score breakdowns.
            </p>
          </div>
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline pt-1"
          >
            <span>Take a CBT Mock Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFE6DC] text-xs font-medium text-[#8C7D73]">
                <th className="py-2.5 pr-4">Test</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Score</th>
                <th className="py-2.5 px-4">Accuracy</th>
                <th className="py-2.5 pl-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6DC] text-xs sm:text-sm">
              {sessions.map((s, idx) => (
                <tr key={s.id || idx} className="hover:bg-[#FFF8F0]/50 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-[#1C1917]">
                    {s.title}
                  </td>
                  <td className="py-3.5 px-4 text-[#5C524A] whitespace-nowrap">
                    {s.date}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1C1917] tabular-nums whitespace-nowrap">
                    {s.score}
                  </td>
                  <td className="py-3.5 px-4 text-[#5C524A] tabular-nums whitespace-nowrap">
                    {s.accuracy}
                  </td>
                  <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                    <Link
                      href={s.reviewUrl}
                      className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentEvaluationsTable;
