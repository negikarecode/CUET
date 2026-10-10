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
    coverage,
    isBelowCoverageThreshold,
    hasNoData,
  } = resolution;

  const coveragePct = Math.round(coverage * 100);

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
              {chosenCombination.label} ({totalRequiredCount} subjects evaluated on {course.cutoffScale}-pt scale)
            </p>
          </div>
        </div>

        {/* Coverage Meter */}
        <div className="flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-slate-600">
            Coverage:
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  coveragePct >= 75
                    ? "bg-emerald-500"
                    : coveragePct >= 50
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${coveragePct}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold ${
                coveragePct >= 75
                  ? "text-emerald-700"
                  : coveragePct >= 50
                  ? "text-amber-700"
                  : "text-rose-700"
              }`}
            >
              {subjectsWithDataCount}/{totalRequiredCount} ({coveragePct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Coverage Warning Alert if < 50% or missing subjects */}
      {isBelowCoverageThreshold && (
        <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-900">
              {hasNoData
                ? "No valid mock attempts recorded for this course."
                : "Very rough estimate (Coverage below 50%)"}
            </p>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Admission cutoffs in CUET are determined by aggregate marks across all required papers.
              Comparing on partial subjects is a directional approximation. Complete your missing mocks to unlock authoritative standing.
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

                {sub.hasData ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {sub.userPercentage}%
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-200 shrink-0">
                    No data yet
                  </span>
                )}
              </div>

              {/* Status details & Action link */}
              <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-[11px]">
                {sub.hasData ? (
                  <span className="text-slate-500 text-[10px]">
                    {sub.answeredQuestions} Qs calibrated
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium text-[10px]">
                    Subject required
                  </span>
                )}

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
          );
        })}
      </div>

      {/* Approximation Note */}
      <p className="text-[11px] text-slate-400 italic">
        * University of Delhi evaluates combined raw composite scores across papers. Individual domain subject cutoffs are not published separately.
      </p>
    </div>
  );
}
