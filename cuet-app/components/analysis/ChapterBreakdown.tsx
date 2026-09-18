"use client";

import React, { useState } from "react";
import { ChapterMetrics } from "@/lib/types";
import { Layers, CheckCircle2, XCircle } from "lucide-react";

interface ChapterBreakdownProps {
  chapters: ChapterMetrics[];
}

export function ChapterBreakdown({ chapters = [] }: ChapterBreakdownProps) {
  const [filter, setFilter] = useState<"all" | "weak" | "strong">("all");

  const filteredChapters = chapters.filter((ch) => {
    if (filter === "weak") return ch.accuracy < 60;
    if (filter === "strong") return ch.accuracy >= 75;
    return true;
  });

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" />
            Chapter-Level Mastery
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Granular accuracy and score breakdown per NCERT chapter
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
              filter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All ({chapters.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("weak")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
              filter === "weak" ? "bg-white text-rose-700 shadow-sm" : "text-slate-500 hover:text-rose-600"
            }`}
          >
            Needs Work ({chapters.filter((c) => c.accuracy < 60).length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("strong")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
              filter === "strong" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-emerald-600"
            }`}
          >
            Mastered ({chapters.filter((c) => c.accuracy >= 75).length})
          </button>
        </div>
      </div>

      {filteredChapters.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm font-medium">
          No chapters match the selected filter.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="pb-3">Chapter</th>
                <th className="pb-3 text-center">Questions</th>
                <th className="pb-3 text-center">Correct</th>
                <th className="pb-3 text-center">Wrong</th>
                <th className="pb-3 text-center">Score (+5/-1)</th>
                <th className="pb-3 text-center">Accuracy</th>
                <th className="pb-3 text-right">Avg Pace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredChapters.map((ch) => (
                <tr key={ch.chapter_id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pr-3 font-bold text-slate-900 max-w-xs">
                    {ch.chapter_name || `Chapter ${ch.chapter_id}`}
                  </td>
                  <td className="py-3.5 text-center text-slate-600 font-semibold">{ch.total_questions}</td>
                  <td className="py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {ch.correct}
                    </span>
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                      <XCircle className="h-3.5 w-3.5" />
                      {ch.wrong}
                    </span>
                  </td>
                  <td className="py-3.5 text-center font-black text-slate-900">
                    {ch.raw_score > 0 ? `+${ch.raw_score}` : ch.raw_score}
                  </td>
                  <td className="py-3.5 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                        ch.accuracy >= 75
                          ? "bg-emerald-100 text-emerald-800"
                          : ch.accuracy >= 55
                          ? "bg-blue-100 text-blue-800"
                          : ch.accuracy >= 40
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {ch.accuracy}%
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-medium text-slate-500">{ch.avg_time_seconds}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
