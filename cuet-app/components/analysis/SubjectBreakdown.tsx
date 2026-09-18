"use client";

import React, { useState } from "react";
import { SubjectMetrics, ChapterMetrics } from "@/lib/types";
import { BookOpen, ChevronDown, ChevronUp, Award, AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react";

interface SubjectBreakdownProps {
  subjects: SubjectMetrics[];
  chapters?: ChapterMetrics[];
}

export function SubjectBreakdown({ subjects = [], chapters = [] }: SubjectBreakdownProps) {
  const [expandedSubjectId, setExpandedSubjectId] = useState<number | null>(null);

  const toggleSubject = (id: number) => {
    setExpandedSubjectId(expandedSubjectId === id ? null : id);
  };

  const getAccuracyColor = (acc: number) => {
    if (acc >= 75) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (acc >= 55) return "text-blue-600 bg-blue-50 border-blue-200";
    if (acc >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getProgressBarColor = (acc: number) => {
    if (acc >= 75) return "bg-emerald-500";
    if (acc >= 55) return "bg-blue-500";
    if (acc >= 40) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            Subject Breakdown
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Section-by-section mastery and time investment
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {subjects.length} {subjects.length === 1 ? "Subject" : "Subjects"} Tested
        </span>
      </div>

      <div className="space-y-4">
        {subjects.map((subj) => {
          const isExpanded = expandedSubjectId === subj.subject_id;
          const subjectChapters = chapters.filter((c) => c.subject_id === subj.subject_id);

          return (
            <div
              key={subj.subject_id}
              className="rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 overflow-hidden"
            >
              <div
                onClick={() => toggleSubject(subj.subject_id)}
                className="p-5 cursor-pointer select-none space-y-4"
              >
                {/* Top Row: Title, Accuracy Badge, Raw Score */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-sm">
                      {subj.subject_name?.substring(0, 2).toUpperCase() || `S${subj.subject_id}`}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {subj.subject_name || `Subject ${subj.subject_id}`}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {subj.total_questions} Questions • {subj.avg_time_seconds}s avg pace
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-base font-black text-slate-900">
                        {subj.raw_score} <span className="text-xs text-slate-400">/ {subj.max_score}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {subj.percentage}% CUET Marks
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-black border ${getAccuracyColor(
                        subj.accuracy
                      )}`}
                    >
                      {subj.accuracy}% Acc
                    </span>

                    {subjectChapters.length > 0 && (
                      <button
                        type="button"
                        aria-label="Toggle chapters"
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${getProgressBarColor(
                        subj.accuracy
                      )}`}
                      style={{ width: `${Math.min(100, Math.max(0, subj.accuracy))}%` }}
                    />
                  </div>
                </div>

                {/* Bottom stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span><b>{subj.correct}</b> Correct (+{subj.correct * 5})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                    <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    <span><b>{subj.wrong}</b> Wrong (-{subj.wrong})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                    <span className="shrink-0">⏭️</span>
                    <span><b>{subj.skipped}</b> Skipped (0)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
                    <Clock className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                    <span>Pace: <b>{subj.avg_time_seconds}s</b> / q</span>
                  </div>
                </div>

                {/* Strongest and Weakest Chapter callouts */}
                {(subj.strongest_chapter || subj.weakest_chapter) && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 text-xs">
                    {subj.strongest_chapter && (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md font-medium">
                        <Award className="h-3.5 w-3.5 text-emerald-600" />
                        Best: <b className="font-bold">{subj.strongest_chapter}</b>
                      </span>
                    )}
                    {subj.weakest_chapter && (
                      <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md font-medium">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        Needs Review: <b className="font-bold">{subj.weakest_chapter}</b>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Expandable Chapter Breakdown Table */}
              {isExpanded && subjectChapters.length > 0 && (
                <div className="border-t border-slate-200 bg-white p-4 sm:p-5 space-y-3 animate-in fade-in duration-200">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Chapter Accuracy under {subj.subject_name}
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                          <th className="pb-2">Chapter</th>
                          <th className="pb-2 text-center">Questions</th>
                          <th className="pb-2 text-center">Correct / Wrong</th>
                          <th className="pb-2 text-center">Accuracy</th>
                          <th className="pb-2 text-right">Avg Pace</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {subjectChapters.map((ch) => (
                          <tr key={ch.chapter_id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2.5 font-bold text-slate-900">{ch.chapter_name}</td>
                            <td className="py-2.5 text-center">{ch.total_questions}</td>
                            <td className="py-2.5 text-center">
                              <span className="text-emerald-600 font-bold">{ch.correct}</span>
                              {" / "}
                              <span className="text-rose-600 font-bold">{ch.wrong}</span>
                            </td>
                            <td className="py-2.5 text-center">
                              <span
                                className={`px-2 py-0.5 rounded-md font-black ${
                                  ch.accuracy >= 70
                                    ? "bg-emerald-100 text-emerald-800"
                                    : ch.accuracy >= 50
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {ch.accuracy}%
                              </span>
                            </td>
                            <td className="py-2.5 text-right text-slate-500">{ch.avg_time_seconds}s</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
