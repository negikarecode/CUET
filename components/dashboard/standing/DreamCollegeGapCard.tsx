"use client";

import React, { useState } from "react";
import {
  Target,
  Sparkles,
  TrendingUp,
  Bot,
  Loader2,
  ChevronRight,
  Lock,
  Info,
} from "lucide-react";
import {
  DreamCollegeGapAnalysis,
  getProjectedCutoff,
} from "@/lib/standing-engine";
import { StandingExplanationResult } from "@/lib/ai/standing-explainer";

interface DreamCollegeGapCardProps {
  analysis: DreamCollegeGapAnalysis | null;
  targetCollege: string;
  onSelectCollege?: (collegeName: string) => void;
  onSaveAsProfileTarget?: (collegeName: string) => void;
  availableColleges?: string[];
  userId?: string;
  isSavedAsTarget?: boolean;
  compositeScore?: number;
}

function formatScore(num: number): string {
  const rounded = Math.round(num * 10) / 10;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1);
}

export default function DreamCollegeGapCard({
  analysis,
  targetCollege,
  userId = "guest",
  compositeScore,
}: DreamCollegeGapCardProps) {
  // AI Explanation State
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<StandingExplanationResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleFetchAIExplanation = async () => {
    if (!analysis || !analysis.isComplete) return;
    setIsLoadingAI(true);
    setAiError(null);

    try {
      const payload = {
        targetCollege: analysis.targetCollege,
        courseName: analysis.targetCourse,
        cutoffScale: analysis.cutoffScale,
        expectedCutoffMarks: analysis.expectedCutoffMarks,
        cutoffDisplay: analysis.cutoffDisplay,
        combinedMarks: analysis.combinedMarks,
        marksGap: analysis.marksGap,
        gapDisplay: analysis.gapDisplay,
        status: analysis.status,
        statusLabel: analysis.statusLabel,
        isComplete: analysis.isComplete,
        hasNoData: analysis.hasNoData,
        participatingSubjects: (analysis.subjectImprovementBreakdown || [])
          .filter((s) => s.hasData)
          .map((s) => s.subjectName),
        missingSubjects: (analysis.subjectImprovementBreakdown || [])
          .filter((s) => !s.hasData)
          .map((s) => s.subjectName),
        subjectBreakdown: (analysis.subjectImprovementBreakdown || []).map((s) => ({
          subjectName: s.subjectName,
          currentMarks: s.currentMarks,
          subjectMaxMarks: s.subjectMaxMarks,
          targetMarks: s.targetMarks,
          marksNeeded: s.marksNeeded,
        })),
        userId,
      };

      const res = await fetch("/api/standing/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Unable to load explanation.");
      }

      const data: StandingExplanationResult = await res.json();
      setAiExplanation(data);
    } catch (err: any) {
      console.warn("AI explanation fetch failed:", err);
      setAiError("Could not connect to AI advisor. Falling back to deterministic plan.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  if (!analysis) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Dream College Gap Analysis
            </h3>
            <p className="text-sm text-slate-500">
              Target: {targetCollege}
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center space-y-1">
          <p className="text-sm font-bold text-slate-800">No past cutoff data yet</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            This college offers the selected course, but historical admission cutoff benchmarks have not been recorded yet. Gap analysis is disabled for this target.
          </p>
        </div>
      </div>
    );
  }

  // Calculate composite total: exact sum of subject averages
  const currentTotal =
    compositeScore !== undefined
      ? compositeScore
      : analysis.combinedMarks !== null
      ? analysis.combinedMarks
      : (analysis.subjectImprovementBreakdown || []).reduce(
          (sum, s) => sum + (s.currentMarks || 0),
          0
        );

  const roundedTotal = Math.round(currentTotal * 10) / 10;
  const formattedTotal = formatScore(roundedTotal);
  const projection = getProjectedCutoff(
    analysis.targetCollege,
    (analysis as any).courseId || "bsc_hons_physics",
    analysis.category
  );
  const hasNoCutoffHistory = projection.yearsCount === 0 || projection.basis === "No past cutoff data yet";
  const formattedExpected = hasNoCutoffHistory ? "No past cutoff data yet" : formatScore(projection.projectedValue);

  const completedSubjects = (analysis.subjectImprovementBreakdown || []).filter((s) => s.hasData);
  const pendingCount = (analysis.subjectImprovementBreakdown || []).length - completedSubjects.length;

  let partialStatusText = "";
  if (completedSubjects.length === 1 && completedSubjects[0]) {
    partialStatusText = `${completedSubjects[0].subjectName} so far: ${completedSubjects[0].currentMarks ?? 0} / ${completedSubjects[0].subjectMaxMarks} · ${pendingCount} ${pendingCount === 1 ? "subject" : "subjects"} pending`;
  } else if (completedSubjects.length > 1) {
    const list = completedSubjects.map((s) => `${s.subjectName} (${s.currentMarks ?? 0})`).join(" + ");
    partialStatusText = `${list} · ${pendingCount} ${pendingCount === 1 ? "subject" : "subjects"} pending`;
  } else {
    partialStatusText = "No mock tests attempted yet · 3 subjects pending";
  }

  const gap = Math.round(Math.abs(roundedTotal - projection.projectedValue) * 10) / 10;
  const formattedGap = formatScore(gap);

  const isAboveCutoff = !hasNoCutoffHistory && roundedTotal >= projection.projectedValue;
  const isBelowCutoff = !hasNoCutoffHistory && roundedTotal < projection.projectedValue;
  const isIncomplete = analysis.status === "incomplete";

  const gapDisplay = hasNoCutoffHistory
    ? "Disabled"
    : isAboveCutoff
    ? gap === 0
      ? "Meets cutoff"
      : `+${formattedGap} marks above`
    : `${formattedGap} marks below`;

  const missingSubjects = (analysis.subjectImprovementBreakdown || [])
    .filter((s) => !s.hasData)
    .map((s) => s.subjectName);

  const gapLabel = hasNoCutoffHistory
    ? "Gap Analysis"
    : !analysis.isComplete
    ? "Overall Gap"
    : isBelowCutoff
    ? "Marks below cutoff"
    : "Marks above cutoff";

  const userProgressPercent = Math.min(
    100,
    Math.max(0, Math.round((currentTotal / analysis.cutoffScale) * 100))
  );
  const targetTickPercent = hasNoCutoffHistory
    ? null
    : Math.min(
        99,
        Math.max(1, Math.round((projection.projectedValue / analysis.cutoffScale) * 100))
      );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* 1. Header: Target alignment info on left, Explain My Result on right */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Dream College Gap Analysis
            </h3>
            <p className="text-sm text-slate-500">
              Target alignment against {analysis.targetCollege} ({analysis.targetCourse})
            </p>
          </div>
        </div>

        {/* Explain My Result Button: disabled until all required subjects have data */}
        <div
          className="relative inline-flex group self-start sm:self-auto"
          tabIndex={!analysis.isComplete ? 0 : undefined}
          role={!analysis.isComplete ? "region" : undefined}
          aria-label={
            !analysis.isComplete
              ? "Complete all 3 subjects to unlock"
              : undefined
          }
        >
          <button
            type="button"
            onClick={handleFetchAIExplanation}
            disabled={!analysis.isComplete || isLoadingAI}
            className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all shadow-2xs ${
              !analysis.isComplete
                ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-80"
                : "bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/80 cursor-pointer"
            }`}
          >
            {isLoadingAI ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Explain My Result</span>
              </>
            )}
          </button>
          {!analysis.isComplete && (
            <div
              role="tooltip"
              className="pointer-events-none absolute bottom-full right-0 mb-2 hidden group-hover:block group-focus:block w-60 p-2 bg-slate-900 text-white text-[12px] rounded-xl shadow-xl z-50 text-center font-medium"
            >
              Complete all 3 subjects to unlock
            </div>
          )}
        </div>
      </div>

      {/* 2. Metrics Section: Side-by-side when incomplete; 4-card grid when complete */}
      {!analysis.isComplete ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Expected Cutoff: 28px+ */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block">
                Expected Cutoff
              </span>
              <span
                tabIndex={0}
                role="note"
                aria-label="A projection from past cutoffs. Actual cutoffs may differ."
                title="A projection from past cutoffs. Actual cutoffs may differ."
                className="cursor-help text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-full"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="my-1.5 flex items-baseline gap-2 flex-wrap">
              <div className="flex items-baseline">
                <span className={`font-bold text-slate-900 tracking-tight leading-none ${hasNoCutoffHistory ? "text-lg sm:text-xl" : "text-[28px] sm:text-[32px]"}`}>
                  {formattedExpected}
                </span>
                {!hasNoCutoffHistory && (
                  <span className="text-[15px] font-normal text-slate-500 ml-1">
                    /{analysis.cutoffScale}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                {projection.likelyRange.label}
              </span>
            </div>
            <span className="text-xs text-slate-500 block">
              {projection.basis}
            </span>
          </div>

          {/* Progress / Status Tile Side-by-side */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block">
                Current Performance
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {pendingCount} {pendingCount === 1 ? "Subject" : "Subjects"} Pending
              </span>
            </div>
            <div className="my-1">
              <p className="text-sm sm:text-base font-bold text-slate-900">
                {partialStatusText}
              </p>
            </div>
            {/* Visual Progress Bar with Target Position Tick */}
            <div className="pt-1">
              <div className="relative w-full h-[9px] bg-slate-200 rounded-full">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${userProgressPercent}%` }}
                />
                {targetTickPercent !== null && (
                  <div
                    className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-slate-900 z-10 rounded-full"
                    style={{ left: `${targetTickPercent}%` }}
                    title={`Expected Cutoff: ${formattedExpected}/${analysis.cutoffScale}`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full 4-card grid when complete */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Expected Cutoff: 28px+ */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500 block">
                Expected Cutoff
              </span>
              <span
                tabIndex={0}
                role="note"
                aria-label="A projection from past cutoffs. Actual cutoffs may differ."
                title="A projection from past cutoffs. Actual cutoffs may differ."
                className="cursor-help text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-full"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="my-1.5 flex items-baseline gap-2 flex-wrap">
              <div className="flex items-baseline">
                <span className={`font-bold text-slate-900 tracking-tight leading-none ${hasNoCutoffHistory ? "text-lg sm:text-xl" : "text-[28px] sm:text-[32px]"}`}>
                  {formattedExpected}
                </span>
                {!hasNoCutoffHistory && (
                  <span className="text-[15px] font-normal text-slate-500 ml-1">
                    /{analysis.cutoffScale}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                {projection.likelyRange.label}
              </span>
            </div>
            <span className="text-xs text-slate-500 block">
              {projection.basis}
            </span>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <span className="text-[13px] font-bold uppercase tracking-wider text-slate-500 block">
              Current Performance
            </span>
            <div className="my-1.5">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 block truncate">
                {formattedTotal}/{analysis.cutoffScale} marks
              </span>
            </div>
            <span className="text-sm text-slate-500 block">
              Combined arithmetic total
            </span>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <span className="text-[13px] font-bold uppercase tracking-wider text-slate-500 block">
              {gapLabel}
            </span>
            <div className="my-1.5">
              <span
                className={`text-xl sm:text-2xl font-bold block truncate ${
                  isAboveCutoff
                    ? "text-emerald-700"
                    : isBelowCutoff
                    ? "text-orange-700"
                    : "text-slate-700"
                }`}
              >
                {gapDisplay}
              </span>
            </div>
            <span className="text-sm text-slate-500 block">
              Target difference
            </span>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/60 flex flex-col justify-between">
            <span className="text-[13px] font-bold uppercase tracking-wider text-slate-500 block">
              Admission Standing
            </span>
            <div className="my-1.5">
              <span
                className={`inline-flex px-3 py-1 rounded-xl text-sm font-bold border ${
                  hasNoCutoffHistory
                    ? "bg-slate-100 text-slate-700 border-slate-200"
                    : isAboveCutoff
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : isBelowCutoff
                    ? "bg-amber-50 text-amber-900 border-amber-200"
                    : isIncomplete
                    ? "bg-blue-50 text-blue-900 border-blue-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {hasNoCutoffHistory ? "No past cutoff data yet" : analysis.statusLabel}
              </span>
            </div>
            <span className="text-sm text-slate-500 block">
              Official benchmark standing
            </span>
          </div>
        </div>
      )}

      {/* 3. Composite Progress Line or No Data Notice */}
      {hasNoCutoffHistory ? (
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-600">
          <strong>Cutoff Data Notice:</strong> No past cutoff data yet for {analysis.targetCollege} in {analysis.targetCourse}. Gap analysis and comparisons against official cutoffs are disabled until admission benchmarks are recorded.
        </div>
      ) : analysis.isComplete && (
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm sm:text-base text-slate-700 font-medium">
            <span>
              Your total: <strong className="font-bold text-slate-900">{formattedTotal} / {analysis.cutoffScale}</strong> vs Expected <strong className="font-bold text-slate-900">{formattedExpected}</strong>
            </span>
            <span
              className={`text-sm font-semibold ${
                isAboveCutoff
                  ? "text-emerald-700"
                  : isBelowCutoff
                  ? "text-amber-800"
                  : "text-slate-700"
              }`}
            >
              {gapDisplay}
            </span>
          </div>

          {/* Visual Progress Bar with Target Position Tick */}
          <div className="relative w-full h-[11px] bg-slate-200 rounded-full">
            <div
              className={`h-full rounded-full transition-all ${
                isAboveCutoff
                  ? "bg-emerald-500"
                  : currentTotal > 0
                  ? "bg-blue-600"
                  : "bg-transparent"
              }`}
              style={{ width: `${userProgressPercent}%` }}
            />
            <div
              className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-slate-900 z-10 rounded-full"
              style={{ left: `${targetTickPercent}%` }}
              title={`Expected Cutoff: ${formattedExpected}/${analysis.cutoffScale}`}
            />
          </div>
        </div>
      )}

      {/* 4. One-line Inline Locked Banner (when incomplete) */}
      {!analysis.isComplete && (
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-600 font-medium">
          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Complete {missingSubjects.length > 0 ? missingSubjects.join(" and ") : "all required subjects"} to unlock overall standing
          </span>
        </div>
      )}

      {/* 5. Trajectory Narrative Banner (when complete) */}
      {analysis.isComplete && (
        <div className="p-4 bg-blue-50/60 border border-blue-200/70 rounded-xl flex items-start gap-3">
          <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-blue-950">
              Admission Trajectory & Guidance:
            </p>
            <p className="text-sm text-blue-900 leading-relaxed">
              {analysis.summaryMessage}
            </p>
          </div>
        </div>
      )}

      {/* 6. AI Explanation Result Box */}
      {aiExplanation && (
        <div className="p-4 bg-purple-50/50 border border-purple-200/80 rounded-xl space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-purple-900">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>AI Admissions Advisor Diagnosis</span>
            </div>
            <span className="text-[13px] font-semibold bg-white px-2.5 py-0.5 rounded-md border border-purple-200 text-purple-700">
              {aiExplanation.isAiGenerated ? "AI-Generated Insight" : "Deterministic Pattern"}
            </span>
          </div>

          <p className="text-sm text-purple-950 leading-relaxed font-sans">
            {aiExplanation.summary}
          </p>

          {aiExplanation.nextActions.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="text-[13px] font-bold text-purple-900 uppercase tracking-wider">
                Recommended Next Actions:
              </p>
              <ul className="space-y-1">
                {aiExplanation.nextActions.map((action: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-purple-900"
                  >
                    <ChevronRight className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {aiError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-800">
          {aiError}
        </div>
      )}
    </div>
  );
}
