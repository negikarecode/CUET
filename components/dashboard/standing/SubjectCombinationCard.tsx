"use client";

import React from "react";
import Link from "next/link";
import { CourseResolutionResult } from "@/lib/standing-engine";
import { RecordedTestAttempt } from "@/types";
import { getMockStats } from "@/lib/mock-stats";

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

export default function SubjectCombinationCard({
  resolution,
  subjectBreakdown = [],
  testAttempts = [],
}: SubjectCombinationCardProps) {
  const {
    course,
    resolvedSubjects,
  } = resolution;

  // Baseline 4 subjects from design.pdf Page 3 if resolvedSubjects is empty
  const defaultSubjects = [
    { subjectId: "english", subjectName: "English", targetMarks: 224.4, hasData: false, score: null },
    { subjectId: "mathematics", subjectName: "Mathematics", targetMarks: 224.4, hasData: false, score: null },
    { subjectId: "physics", subjectName: "Physics", targetMarks: 224.4, hasData: true, score: 16 },
    { subjectId: "chemistry", subjectName: "Chemistry", targetMarks: 224.4, hasData: false, score: null },
  ];

  const subjectsToRender =
    resolvedSubjects && resolvedSubjects.length > 0
      ? resolvedSubjects.map((sub) => {
          const breakdownItem = subjectBreakdown.find(
            (b) =>
              b.subjectId.toLowerCase() === sub.subjectId.toLowerCase() ||
              b.subjectName.toLowerCase() === sub.subjectName.toLowerCase()
          );
          const stats = getMockStats(sub.subjectId || sub.subjectName, testAttempts);
          const hasAttempts = stats.hasAttempts && stats.averageScore !== null;
          const scoreVal = hasAttempts ? stats.averageScore : (sub.averageMarks ?? null);
          const targetMarks = breakdownItem ? breakdownItem.targetMarks : (sub.targetMarks || 224.4);

          return {
            subjectId: sub.subjectId,
            subjectName: cleanSubjectName(sub.subjectName).display,
            targetMarks,
            hasData: scoreVal !== null && scoreVal !== undefined,
            score: scoreVal,
          };
        })
      : defaultSubjects;

  const doneCount = subjectsToRender.filter((s) => s.hasData).length;
  const totalCount = subjectsToRender.length;

  return (
    <div className="bg-white rounded-2xl border border-[#EFE6DC] p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header matching design.pdf Page 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE6DC] pb-3">
        <div>
          <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
            Required subject combination
          </h2>
          <p className="text-xs text-[#786E65] mt-0.5">
            {subjectsToRender.map((s) => s.subjectName).join(" + ")} · {course?.cutoffScale || 1000}-mark scale
          </p>
        </div>

        <div className="self-start sm:self-auto">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            {doneCount} of {totalCount} done
          </span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {subjectsToRender.map((sub) => {
          const formattedTarget = formatScore(sub.targetMarks);
          const _isPhysics = sub.subjectId === "physics"; void _isPhysics;

          return (
            <div
              key={sub.subjectId}
              className="p-5 rounded-2xl border border-[#EFE6DC] bg-white shadow-2xs flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#1C1917]">
                  {sub.subjectName}
                </h3>

                {/* Score value */}
                <div>
                  {sub.hasData && sub.score !== null ? (
                    <div className="text-2xl font-bold text-[#1C1917] tabular-nums">
                      {formatScore(sub.score)} / 250
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-[#8C7D73]">
                      No score yet
                    </div>
                  )}
                </div>

                {/* Target label */}
                <div className="text-xs text-[#786E65]">
                  Target {formattedTarget}
                </div>

                {/* Progress bar if score available */}
                {sub.hasData && (
                  <div className="pt-1">
                    <div className="w-full h-1 bg-[#FDE6D2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C2410C] rounded-full"
                        style={{
                          width: `${Math.min(100, Math.max(8, Math.round(((sub.score ?? 16) / 250) * 100)))}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {sub.hasData ? (
                  <Link
                    href={`/dashboard/practice/${sub.subjectId}`}
                    className="w-full block py-2 px-3 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold text-center transition-colors shadow-2xs"
                  >
                    Practice weak topics
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/mocks/${sub.subjectId}`}
                    className="w-full block py-2 px-3 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold text-center transition-colors shadow-2xs"
                  >
                    Take mock
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
