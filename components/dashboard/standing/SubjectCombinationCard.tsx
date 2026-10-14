"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Clock,
} from "lucide-react";
import { CourseResolutionResult } from "@/lib/standing-engine";

interface SubjectCombinationCardProps {
  resolution: CourseResolutionResult;
  subjectBreakdown?: Array<{
    subjectId: string;
    subjectName: string;
    hasData: boolean;
    currentMarks: number | null;
    subjectMaxMarks: number;
    currentPerformanceDisplay: string;
    targetMarks: number;
    targetMarksDisplay: string;
    marksNeeded: number;
    marksNeededDisplay: string;
  }>;
  targetCollege?: string;
}

function cleanSubjectName(name: string): { display: string; full: string } {
  if (name.toLowerCase().startsWith("mathematics")) {
    return { display: "Mathematics", full: name };
  }
  return { display: name, full: name };
}

export default function SubjectCombinationCard({
  resolution,
  subjectBreakdown = [],
  targetCollege,
}: SubjectCombinationCardProps) {
  const {
    course,
    chosenCombination,
    resolvedSubjects,
    subjectsWithDataCount,
    totalRequiredCount,
    isComplete,
  } = resolution;

  const progressFraction = totalRequiredCount > 0
    ? Math.min(100, Math.round((subjectsWithDataCount / totalRequiredCount) * 100))
    : 0;

  const missingSubjects = resolvedSubjects.filter((s) => !s.hasData);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900">
                Required Subject Combination
              </h3>
              <span
                className="cursor-help text-slate-400 hover:text-slate-600 inline-flex items-center"
                title="University of Delhi evaluates combined raw composite marks across papers (+5 / -1 marking scheme). Individual domain subject cutoffs are not published separately."
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {chosenCombination.label} ({totalRequiredCount} subjects evaluated on {course.cutoffScale}-mark scale)
              {targetCollege ? ` • Target: ${targetCollege}` : ""}
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

      {/* ONE Incomplete Banner with Missing Subject Mock Links */}
      {!isComplete && (
        <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-bold text-xs text-amber-950">
                  {subjectsWithDataCount} of {totalRequiredCount} subjects completed
                </span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed max-w-2xl">
                Admission cutoffs require composite marks across all required subjects. Take mocks in your missing subjects to unlock your overall standing.
              </p>
            </div>

            {/* Direct buttons to missing subjects' mocks */}
            {missingSubjects.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {missingSubjects.map((sub) => {
                  const { display } = cleanSubjectName(sub.subjectName);
                  return (
                    <Link
                      key={sub.subjectId}
                      href={`/dashboard/mocks/${sub.subjectId}`}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <span>Take {display} Mock</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all"
              style={{ width: `${progressFraction}%` }}
            />
          </div>
        </div>
      )}

      {/* Merged Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {resolvedSubjects.map((sub) => {
          const breakdownItem = subjectBreakdown.find(
            (b) =>
              b.subjectId.toLowerCase() === sub.subjectId.toLowerCase() ||
              b.subjectName.toLowerCase() === sub.subjectName.toLowerCase()
          );

          // Use target tied to selected college if available
          const collegeTarget = breakdownItem ? breakdownItem.targetMarks : sub.targetMarks;
          const marksNeeded = breakdownItem
            ? breakdownItem.marksNeeded
            : Math.max(0, Math.round(collegeTarget - (sub.averageMarks ?? 0)));

          const hasData = sub.hasData && sub.averageMarks !== null;
          const currentScore = sub.averageMarks ?? 0;
          const isTargetMet = hasData && currentScore >= collegeTarget;
          const isPartial = hasData && !isTargetMet;

          const progressPercent = Math.min(100, Math.max(0, Math.round((currentScore / 250) * 100)));
          const mockUrl = `/dashboard/mocks/${sub.subjectId}`;
          const { display: displayName, full: fullName } = cleanSubjectName(sub.subjectName);

          return (
            <div
              key={sub.subjectId}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                isTargetMet
                  ? "bg-emerald-50/20 border-emerald-200/80"
                  : isPartial
                  ? "bg-white border-slate-200"
                  : "bg-slate-50/60 border-slate-200/70"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <span
                      className="text-xs font-bold text-slate-900 leading-snug"
                      title={fullName}
                    >
                      {displayName}
                    </span>
                    <span className="text-[10px] text-slate-400 capitalize">
                      {sub.ruleType === "best_of"
                        ? "Best-of domain"
                        : sub.ruleType === "one_of"
                        ? "Alternative option"
                        : "Mandatory subject"}
                    </span>
                  </div>

                  {/* Status Badge: Green ONLY when meets target; Amber when partial; Slate/Red when no data */}
                  {isTargetMet ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {currentScore}/250
                    </span>
                  ) : isPartial ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {currentScore}/250
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 shrink-0">
                      No data
                    </span>
                  )}
                </div>

                {/* Score Progress Bar (Score / 250) */}
                <div className="mt-2.5 space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isTargetMet
                          ? "bg-emerald-500"
                          : isPartial
                          ? "bg-amber-500"
                          : "bg-slate-200"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Status details & Action link */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-[11px]">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">
                    Target: <strong className="text-slate-700">{collegeTarget}/250</strong>
                  </span>
                  {hasData ? (
                    isTargetMet ? (
                      <span className="text-emerald-700 font-bold">Target met</span>
                    ) : (
                      <span className="text-amber-800 font-bold">{marksNeeded} marks needed</span>
                    )
                  ) : (
                    <span className="text-slate-500 font-medium">Mock needed</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 text-[10px]">
                    {hasData ? `${sub.answeredQuestions} Qs recorded` : "250 marks paper"}
                  </span>
                  <Link
                    href={mockUrl}
                    className={`inline-flex items-center gap-1 font-semibold text-[11px] transition-colors ${
                      hasData
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-amber-700 hover:text-amber-800 font-bold underline underline-offset-2"
                    }`}
                  >
                    <span>{hasData ? "Improve" : "Take mock"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
