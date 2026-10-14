"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  Info,
  AlertCircle,
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

function formatScore(num: number): string {
  const rounded = Math.round(num * 10) / 10;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1);
}

import { getMockStats } from "@/lib/mock-stats";

function getSubjectMockStats(
  subjectId: string,
  subjectName: string,
  testAttempts: RecordedTestAttempt[],
  engineAverage: number | null
): {
  hasData: boolean;
  averageMarks: number | null;
  formattedScore: string;
  mockCount: number;
  helperText: string;
} {
  const stats = getMockStats(subjectId || subjectName, testAttempts);

  if (stats.hasAttempts && stats.averageScore !== null) {
    return {
      hasData: true,
      averageMarks: stats.averageScore,
      formattedScore: stats.formattedScore,
      mockCount: stats.attemptedMocksCount,
      helperText: stats.helperText,
    };
  }

  // Fallback if testAttempts is empty or pending hydration but engine has computed valid average
  if (engineAverage !== null && engineAverage !== undefined && engineAverage > 0) {
    const rounded = Math.round(engineAverage * 10) / 10;
    const formatted = formatScore(rounded);
    return {
      hasData: true,
      averageMarks: rounded,
      formattedScore: formatted,
      mockCount: 1,
      helperText: "avg of 1 mock test",
    };
  }

  return {
    hasData: false,
    averageMarks: null,
    formattedScore: "—",
    mockCount: 0,
    helperText: "No attempts recorded",
  };
}

export default function SubjectCombinationCard({
  resolution,
  subjectBreakdown = [],
  targetCollege: _targetCollege,
  testAttempts = [],
}: SubjectCombinationCardProps) {
  const {
    course,
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
            <p className="text-[13px] sm:text-sm text-slate-500 mt-0.5">
              {resolvedSubjects.map((s) => cleanSubjectName(s.subjectName).display).join(" + ")} · {course.cutoffScale}-mark scale
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
          const formattedTarget = formatScore(collegeTarget);

          // Compute exact mock-test average marks and mock count
          const stats = getSubjectMockStats(
            sub.subjectId,
            sub.subjectName,
            testAttempts,
            sub.averageMarks
          );

          const hasData = stats.hasData && stats.averageMarks !== null;
          const avgScore = stats.averageMarks ?? 0;
          const isTargetMet = hasData && avgScore >= collegeTarget;

          // "X to go" gap: target minus average, never below 0
          const marksGap = Math.max(0, Math.round((collegeTarget - avgScore) * 10) / 10);
          const formattedMarksGap = formatScore(marksGap);

          // Progress bar fill: uses the same average
          const progressPercent = hasData
            ? Math.min(100, Math.max(0, Math.round((avgScore / 250) * 100)))
            : 0;
          const targetTickPercent = Math.min(
            99,
            Math.max(1, Math.round((collegeTarget / 250) * 100))
          );

          const mockUrl = `/dashboard/mocks/${sub.subjectId}`;
          const { display: displayName, full: fullName } = cleanSubjectName(sub.subjectName);

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

                {/* Score Section: AVERAGE marks across all mock tests */}
                <div>
                  {hasData ? (
                    <div>
                      <div className="flex items-baseline">
                        <span
                          className={`text-[34px] sm:text-[36px] font-bold tracking-tight leading-none ${
                            (stats.averageMarks ?? 0) < 0
                              ? "text-rose-600 font-extrabold inline-flex items-center gap-1.5"
                              : "text-slate-900"
                          }`}
                        >
                          {stats.formattedScore}
                          {(stats.averageMarks ?? 0) < 0 && (
                            <span
                              tabIndex={0}
                              role="note"
                              aria-label="Includes negative marking (+5 / -1). Wrong answers can reduce your score below 0."
                              title="Includes negative marking (+5 / -1). Wrong answers can reduce your score below 0."
                              className="cursor-help inline-flex items-center focus:outline-none focus:ring-1 focus:ring-rose-500 rounded-full"
                            >
                              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            </span>
                          )}
                        </span>
                        <span className="text-[16px] font-normal text-slate-500 ml-1.5">
                          /250
                        </span>
                      </div>
                      <span className="text-[13px] text-slate-500 font-medium mt-1 block">
                        {stats.helperText}
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
                        {stats.helperText}
                      </span>
                    </div>
                  )}
                </div>

                {/* Target (16-18px) & Marks Gap Pill (14px) */}
                <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                  <span className="text-[15px] sm:text-[16px] text-slate-700 font-medium">
                    Target: <strong className="font-semibold text-slate-900">{formattedTarget}</strong>
                  </span>

                  {/* Marks gap pill */}
                  {hasData ? (
                    isTargetMet ? (
                      <span className="px-3 py-1 rounded-full text-[13px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Target met
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[13px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {formattedMarksGap} to go
                      </span>
                    )
                  ) : (
                    <span className="px-3 py-1 rounded-full text-[13px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      Not started
                    </span>
                  )}
                </div>

                {/* Small note near per-subject target */}
                <p className="text-[11px] text-slate-400 font-normal">
                  Target is split equally across the {totalRequiredCount} subjects.
                </p>

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
                        title={`Target: ${formattedTarget}/250`}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {hasData ? (
                  <Link
                    href={`/dashboard/practice/${sub.subjectId}`}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 font-semibold text-[13px] transition-all shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <span>Practice weak topics</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ) : (
                  <Link
                    href={mockUrl}
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Take mock</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Subtle Disclaimer directly beneath subject cards grid */}
      <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-gray-500 pt-1">
        <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span>Marks shown are the average of your mock test scores in each subject.</span>
      </div>
    </div>
  );
}
