"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import { CourseResolutionResult } from "@/lib/standing-engine";
import { RecordedTestAttempt } from "@/types";

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
  testAttempts?: RecordedTestAttempt[];
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
  testAttempts = [],
}: SubjectCombinationCardProps) {
  const {
    course,
    chosenCombination,
    resolvedSubjects,
    subjectsWithDataCount,
    totalRequiredCount,
  } = resolution;

  // Full-width grid: 3-column on md+ for standard 3-subject combinations, 4-column if 4 subjects
  const gridClass =
    resolvedSubjects.length >= 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
      : "grid grid-cols-1 md:grid-cols-3 gap-4 w-full";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* 1. Header with small "1/3 done" badge next to section title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Required Subject Combination
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[13px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {subjectsWithDataCount}/{totalRequiredCount} done
              </span>
              <span
                className="cursor-help text-slate-400 hover:text-slate-600 inline-flex items-center"
                title="University of Delhi evaluates combined raw composite marks across papers (+5 / -1 marking scheme). Individual domain subject cutoffs are not published separately."
              >
                <Info className="w-4 h-4" />
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {chosenCombination.label} ({totalRequiredCount} subjects evaluated on {course.cutoffScale}-mark scale)
              {targetCollege ? ` • Target: ${targetCollege}` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Redesigned Subject Cards Grid (Hero of the page) */}
      <div className={gridClass}>
        {resolvedSubjects.map((sub) => {
          const breakdownItem = subjectBreakdown.find(
            (b) =>
              b.subjectId.toLowerCase() === sub.subjectId.toLowerCase() ||
              b.subjectName.toLowerCase() === sub.subjectName.toLowerCase()
          );

          // College target tied to selected college if available
          const collegeTarget = breakdownItem ? breakdownItem.targetMarks : sub.targetMarks;
          const marksNeeded = breakdownItem
            ? breakdownItem.marksNeeded
            : Math.max(0, Math.round((collegeTarget - (sub.averageMarks ?? 0)) * 10) / 10);

          const hasData = sub.hasData && sub.averageMarks !== null;
          const currentScore = sub.averageMarks ?? 0;
          const isTargetMet = hasData && currentScore >= collegeTarget;

          // Progress percentage and target position tick mark
          const progressPercent = Math.min(100, Math.max(0, Math.round((currentScore / 250) * 100)));
          const targetTickPercent = Math.min(99, Math.max(1, Math.round((collegeTarget / 250) * 100)));

          const mockUrl = `/dashboard/mocks/${sub.subjectId}`;
          const { display: displayName, full: fullName } = cleanSubjectName(sub.subjectName);

          // TODO: When mock session count is added directly to ResolvedSubjectChoice, replace this attempt lookup
          const mockCount =
            testAttempts.filter((a) => {
              const aSub = (a.subject || "").toLowerCase().trim();
              return (
                aSub === sub.subjectId.toLowerCase().trim() ||
                aSub === sub.subjectName.toLowerCase().trim()
              );
            }).length || 1;

          return (
            <div
              key={sub.subjectId}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                isTargetMet
                  ? "bg-emerald-50/20 border-emerald-200/90 shadow-2xs"
                  : hasData
                  ? "bg-white border-slate-200 shadow-2xs"
                  : "bg-slate-50/50 border-slate-200/80"
              }`}
            >
              <div className="space-y-3.5">
                {/* Subject Name (18px semibold) & Mandatory Subject label (13px muted) */}
                <div>
                  <h4
                    className="text-[18px] font-semibold text-slate-900 leading-snug truncate"
                    title={fullName}
                  >
                    {displayName}
                  </h4>
                  <span className="text-[13px] text-slate-500 font-medium capitalize block mt-0.5">
                    {sub.ruleType === "best_of"
                      ? "Best-of domain"
                      : sub.ruleType === "one_of"
                      ? "Alternative option"
                      : "Mandatory subject"}
                  </span>
                </div>

                {/* Score Section */}
                <div>
                  {hasData ? (
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-[34px] sm:text-[36px] font-bold text-slate-900 tracking-tight leading-none">
                          {currentScore}
                        </span>
                        <span className="text-[16px] font-normal text-slate-500 ml-1.5">
                          /250
                        </span>
                      </div>
                      <span className="text-[13px] text-slate-500 font-medium mt-1 block">
                        from {mockCount} mock test{mockCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-[34px] sm:text-[36px] font-bold text-slate-400 tracking-tight leading-none">
                          —
                        </span>
                        <span className="text-[16px] font-normal text-slate-400 ml-1.5">
                          /250
                        </span>
                      </div>
                      <span className="text-[13px] text-slate-400 font-medium mt-1 block">
                        No attempts recorded
                      </span>
                    </div>
                  )}
                </div>

                {/* Target (16-18px) & Marks Gap Pill (14px) */}
                <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                  <span className="text-[16px] text-slate-700 font-medium">
                    Target: <strong className="font-semibold text-slate-900">{collegeTarget}</strong>
                  </span>

                  {/* Marks gap pill */}
                  {hasData ? (
                    isTargetMet ? (
                      <span className="px-3 py-1 rounded-full text-[14px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Target met
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[14px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {marksNeeded} to go
                      </span>
                    )
                  ) : (
                    <span className="px-3 py-1 rounded-full text-[14px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {collegeTarget} to go
                    </span>
                  )}
                </div>

                {/* Progress bar: 10-12px tall, rounded, with tick marker at target position */}
                <div className="pt-0.5">
                  <div className="relative w-full h-[11px] bg-slate-100 rounded-full">
                    {/* Fill */}
                    <div
                      className={`h-full rounded-full transition-all ${
                        isTargetMet
                          ? "bg-emerald-500"
                          : hasData
                          ? "bg-blue-600"
                          : "bg-transparent"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                    {/* Tick marker at the target position */}
                    {collegeTarget > 0 && (
                      <div
                        className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-slate-800 z-10 rounded-full"
                        style={{ left: `${targetTickPercent}%` }}
                        title={`Target: ${collegeTarget}/250`}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {hasData ? (
                  <Link
                    href={mockUrl}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 font-semibold text-[14px] transition-all shadow-2xs flex items-center justify-center gap-2"
                  >
                    <span>Improve</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ) : (
                  <Link
                    href={mockUrl}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Take mock</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
