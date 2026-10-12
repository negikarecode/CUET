"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { CourseResolutionResult } from "@/lib/standing-engine";

interface SubjectCombinationCardProps {
  resolution: CourseResolutionResult;
}

export default function SubjectCombinationCard({
  resolution,
}: SubjectCombinationCardProps) {
  const {
    course,
    chosenCombination,
    resolvedSubjects,
    subjectsWithDataCount,
    totalRequiredCount,
    isComplete,
    hasNoData,
  } = resolution;

  const progressFraction = totalRequiredCount > 0
    ? Math.min(100, Math.round((subjectsWithDataCount / totalRequiredCount) * 100))
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Required Subject Combination
            </h3>
            <p className="text-xs text-slate-500">
              {chosenCombination.label} ({totalRequiredCount} subjects evaluated on {course.cutoffScale}-mark scale)
            </p>
          </div>
        </div>

        {/* Coverage Meter */}
        <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-slate-600">
            Completed:
          </span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isComplete
                    ? "bg-emerald-500"
                    : subjectsWithDataCount > 0
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${progressFraction}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold ${
                isComplete
                  ? "text-emerald-700"
                  : subjectsWithDataCount > 0
                  ? "text-amber-700"
                  : "text-rose-700"
              }`}
            >
              {subjectsWithDataCount} of {totalRequiredCount} subjects completed
            </span>
          </div>
        </div>
      </div>

      {/* Coverage Warning Alert if missing subjects */}
      {!isComplete && (
        <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-900">
              {hasNoData
                ? "No mock test attempts recorded for this course."
                : `Incomplete subject combination (${subjectsWithDataCount} of ${totalRequiredCount} subjects completed)`}
            </p>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Admission cutoffs in CUET are determined by aggregate marks across all required papers.
              Each subject score is tracked out of its paper maximum (250 marks) and cannot be compared directly with composite cutoffs until all subjects are completed. Take mocks in your missing subjects to unlock your overall standing.
            </p>
          </div>
        </div>
      )}

      {/* Subject Pills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {resolvedSubjects.map((sub) => {
          const mockUrl = `/dashboard/mocks/${sub.subjectId}`;

          return (
            <div
              key={sub.subjectId}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 ${
                sub.hasData
                  ? "bg-slate-50/70 border-slate-200/80"
                  : "bg-rose-50/30 border-rose-200/60"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {sub.subjectName}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize">
                    {sub.ruleType === "best_of"
                      ? "Best-of domain"
                      : sub.ruleType === "one_of"
                      ? "Alternative option"
                      : "Mandatory subject"}
                  </span>
                </div>

                {sub.hasData && sub.averageMarks !== null ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {sub.averageMarks}/{sub.maxMarks} marks
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-200 shrink-0">
                    No data yet
                  </span>
                )}
              </div>

              {/* Status details & Action link */}
              <div className="pt-2 border-t border-slate-200/50 flex flex-col gap-1.5 text-[11px]">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Target: {sub.targetMarks}/{sub.maxMarks} marks</span>
                  {sub.hasData && sub.averageMarks !== null ? (
                    <span className={sub.marksNeeded > 0 ? "text-blue-600 font-semibold" : "text-emerald-600 font-semibold"}>
                      {sub.marksNeeded > 0 ? `${sub.marksNeeded} marks needed` : "Target met"}
                    </span>
                  ) : (
                    <span className="text-rose-600 font-medium">Subject required</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400 text-[10px]">
                    {sub.hasData ? `${sub.answeredQuestions} Qs recorded` : "250 marks paper"}
                  </span>
                  <Link
                    href={mockUrl}
                    className={`inline-flex items-center gap-1 font-semibold text-[11px] transition-colors ${
                      sub.hasData
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-rose-700 hover:text-rose-800 underline underline-offset-2"
                    }`}
                  >
                    <span>{sub.hasData ? "Improve" : "Take mock"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Approximation Note */}
      <p className="text-[11px] text-slate-400 italic">
        * University of Delhi evaluates combined raw composite marks across papers (+5 / -1 marking scheme). Individual domain subject cutoffs are not published separately.
      </p>
    </div>
  );
}
