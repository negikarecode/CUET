"use client";

import React, { useState } from "react";
import {
  Target,
  Sparkles,
  TrendingUp,
  Bookmark,
  Check,
  Search,
  Bot,
  Loader2,
  ChevronRight,
} from "lucide-react";
import {
  DreamCollegeGapAnalysis,
} from "@/lib/standing-engine";
import { StandingExplanationResult } from "@/lib/ai/standing-explainer";
import { CHANCE_BANDS } from "@/lib/config/standingConfig";

interface DreamCollegeGapCardProps {
  analysis: DreamCollegeGapAnalysis | null;
  targetCollege: string;
  onSelectCollege: (collegeName: string) => void;
  onSaveAsProfileTarget?: (collegeName: string) => void;
  availableColleges: string[];
  userId?: string;
  isSavedAsTarget?: boolean;
}

export default function DreamCollegeGapCard({
  analysis,
  targetCollege,
  onSelectCollege,
  onSaveAsProfileTarget,
  availableColleges,
  userId = "guest",
  isSavedAsTarget = false,
}: DreamCollegeGapCardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // AI Explanation State (Phase 4)
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<StandingExplanationResult | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const filteredColleges = availableColleges.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleSaveTarget = () => {
    if (onSaveAsProfileTarget && targetCollege) {
      onSaveAsProfileTarget(targetCollege);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const handleFetchAIExplanation = async () => {
    if (!analysis) return;
    setIsLoadingAI(true);
    setAiError(null);

    try {
      const payload = {
        targetCollege: analysis.targetCollege,
        courseName: analysis.targetCourse,
        band: analysis.band,
        userPct: analysis.userPct,
        cutoffRange: {
          lowPct: Math.max(0, analysis.expectedCutoffPct - 2.5),
          highPct: Math.min(100, analysis.expectedCutoffPct + 2.5),
          midpointPct: analysis.expectedCutoffPct,
        },
        gapPercentagePoints: analysis.gapPercentagePoints,
        coverage: analysis.coverage,
        participatingSubjects: analysis.subjectImprovementBreakdown
          .filter((s) => s.currentPct !== null)
          .map((s) => s.subjectName),
        missingSubjects: analysis.subjectImprovementBreakdown
          .filter((s) => s.currentPct === null)
          .map((s) => s.subjectName),
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
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs text-center">
        <p className="text-xs text-slate-500">
          No cutoff data available for {targetCollege} in this course. Select a different college.
        </p>
      </div>
    );
  }

  const bandInfo = CHANCE_BANDS[analysis.band];
  const isTargetMet = analysis.gapPercentagePoints === 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header & Dream College Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Dream College Gap Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Target alignment against {analysis.targetCollege} ({analysis.targetCourse})
            </p>
          </div>
        </div>

        {/* Search / Switch College Dropdown */}
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="max-w-[160px] truncate">{analysis.targetCollege}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 max-h-72 flex flex-col">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search colleges..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 mb-1 focus:outline-hidden focus:border-blue-500"
                  autoFocus
                />
                <div className="overflow-y-auto space-y-0.5 flex-1 [scrollbar-width:thin]">
                  {filteredColleges.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        onSelectCollege(c);
                        setIsDropdownOpen(false);
                        setSearchQuery("");
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                        c === targetCollege
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save as Target College */}
          <button
            type="button"
            onClick={handleSaveTarget}
            disabled={isSavedAsTarget || justSaved}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSavedAsTarget || justSaved
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-xs"
            }`}
          >
            {isSavedAsTarget || justSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved Target</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Set as Target</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Expected Cutoff
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900">
              {analysis.expectedCutoffPct}%
            </span>
            <span className="text-xs text-slate-500">
              ({analysis.expectedCutoffMarks}/{analysis.cutoffScale} pts)
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Your Current Level
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900">
              {analysis.userPct !== null ? `${analysis.userPct}%` : "No data"}
            </span>
            {analysis.userEquivalentMarks !== null && (
              <span className="text-xs text-slate-500">
                (~{analysis.userEquivalentMarks} pts)
              </span>
            )}
          </div>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Cutoff Gap
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className={`text-lg font-bold ${
                isTargetMet ? "text-emerald-700" : "text-orange-700"
              }`}
            >
              {isTargetMet ? "Matched" : `+${analysis.gapPercentagePoints}%`}
            </span>
            {!isTargetMet && (
              <span className="text-xs text-slate-500">
                (+{analysis.gapMarks} marks)
              </span>
            )}
          </div>
        </div>

        <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Standing Band
          </span>
          <div className="mt-1">
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${bandInfo.badgeClass}`}
            >
              {bandInfo.label}
            </span>
          </div>
        </div>
      </div>

      {/* "What it would take" Narrative Banner */}
      <div className="p-3.5 bg-blue-50/60 border border-blue-200/70 rounded-xl flex items-start gap-3">
        <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-blue-950">
            What it would take to secure admission:
          </p>
          <p className="text-xs text-blue-900 leading-relaxed">
            {analysis.summaryMessage}
          </p>
        </div>
      </div>

      {/* Per-Subject Improvement Breakdown */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Per-Subject Target Breakdown (Assuming Equal Improvement)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {analysis.subjectImprovementBreakdown.map((s) => (
            <div
              key={s.subjectId}
              className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 truncate">
                  {s.subjectName}
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  Target: {s.targetPctNeeded}%
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>
                  Current: {s.currentPct !== null ? `${s.currentPct}%` : "No data"}
                </span>
                <span className="font-bold text-blue-600">
                  {s.marksDelta > 0 ? `+${s.marksDelta} pts needed` : "Met"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation Action Strip (Phase 4) */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Bot className="w-4 h-4 text-purple-600 shrink-0" />
          <span>Need an AI breakdown of your test trajectory?</span>
        </div>

        <button
          type="button"
          onClick={handleFetchAIExplanation}
          disabled={isLoadingAI}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100/80 text-purple-700 border border-purple-200/80 text-xs font-semibold transition-all shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          {isLoadingAI ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Fact Matrix...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Explain My Result</span>
            </>
          )}
        </button>
      </div>

      {/* AI Explanation Result Box */}
      {aiExplanation && (
        <div className="p-4 bg-purple-50/50 border border-purple-200/80 rounded-xl space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>AI Admissions Advisor Diagnosis</span>
            </div>
            <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded-md border border-purple-200 text-purple-700">
              {aiExplanation.isAiGenerated ? "AI-Generated Insight" : "Deterministic Pattern"}
            </span>
          </div>

          <p className="text-xs text-purple-950 leading-relaxed font-sans">
            {aiExplanation.summary}
          </p>

          {aiExplanation.nextActions.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">
                Recommended Next Actions:
              </p>
              <ul className="space-y-1">
                {aiExplanation.nextActions.map((action: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-purple-900"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {aiError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
          {aiError}
        </div>
      )}
    </div>
  );
}
