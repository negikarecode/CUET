"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useTestStore } from "@/lib/store/useTestStore";
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

  // Fallback sessions matching design.pdf Page 1
  const defaultSessions = [
    {
      id: "demo-mock-50",
      title: "Physics Full Mock Paper 50",
      date: "26 Oct 2026",
      score: "−2 / 250",
      accuracy: "16%",
      reviewUrl: "/dashboard/mocks",
    },
    {
      id: "demo-mock-3",
      title: "Physics Full Mock Paper 3",
      date: "23 Oct 2026",
      score: "28 / 250",
      accuracy: "26%",
      reviewUrl: "/dashboard/mocks",
    },
    {
      id: "demo-mock-2",
      title: "Physics Full Mock Paper 2",
      date: "23 Oct 2026",
      score: "46 / 250",
      accuracy: "32%",
      reviewUrl: "/dashboard/mocks",
    },
    {
      id: "demo-mock-1",
      title: "Physics Full Mock Paper 1",
      date: "23 Oct 2026",
      score: "−8 / 250",
      accuracy: "14%",
      reviewUrl: "/dashboard/mocks",
    },
  ];

  const sessions =
    sortedAttempts.length > 0
      ? sortedAttempts.slice(0, 5).map((att) => {
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
        })
      : defaultSessions;

  return (
    <div className="bg-white rounded-2xl border border-[#EFE6DC] p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EFE6DC] pb-3">
        <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
          Recent sessions
        </h2>

        <Link
          href="/dashboard/sessions"
          className="text-xs font-semibold text-[#C2410C] hover:underline"
        >
          View all past sessions
        </Link>
      </div>

      {/* Table */}
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
                    className="text-xs font-semibold text-[#C2410C] hover:underline"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEvaluationsTable;
