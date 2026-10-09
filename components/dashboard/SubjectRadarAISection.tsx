"use client";

import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Zap,
  Target,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
} from "lucide-react";
import { SubjectRadarAIAnalysis } from "@/types/subject-ai";

interface SubjectRadarAISectionProps {
  subject: string;
  analysis: SubjectRadarAIAnalysis | null;
  isLoading: boolean;
  status?: "idle" | "running" | "complete" | "error";
  errorMessage?: string | null;
  isUnlocked?: boolean;
  currentQuestionsCount?: number;
  requiredQuestionsCount?: number;
  onRefresh: () => void;
  onLaunchRepairDrill: (topic: string, practiceType?: string) => void;
}

export function SubjectRadarAISection({
  subject,
  analysis,
  isLoading,
  status = "idle",
  errorMessage,
  isUnlocked = true,
  currentQuestionsCount = 0,
  requiredQuestionsCount = 150,
  onRefresh,
  onLaunchRepairDrill,
}: SubjectRadarAISectionProps) {
  const [activeTab, setActiveTab] = useState<"insights" | "cross_chapter" | "difficulty" | "profile">("insights");

  // Calibration locked state (under 150 questions)
  if (!isUnlocked) {
    const progressPct = Math.min(100, Math.round((currentQuestionsCount / requiredQuestionsCount) * 100));
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>AI Evidence Analyst</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-bold uppercase tracking-wider">
                  Calibration Required
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Requires minimum {requiredQuestionsCount} qualifying questions in {subject} to calibrate patterns.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Cycle Calibration Progress</span>
            <span className="font-mono text-slate-900 font-bold">{currentQuestionsCount} / {requiredQuestionsCount} Questions ({progressPct}%)</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 font-medium">
            AI telemetry analysis activates once you complete 150 questions to ensure statistically verified diagnostic recommendations without false positives.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 animate-spin">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                AI Evidence Analyst
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Synthesizing cross-chapter telemetry &amp; error mechanisms for {subject}...
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center text-center space-y-2 animate-pulse">
          <span className="text-xs font-semibold text-slate-700">Analyzing verified question telemetry...</span>
          <span className="text-[11px] text-slate-500">Cross-referencing error taxonomy, speed pacing, and difficulty progression</span>
        </div>
      </div>
    );
  }

  if (status === "error" && !analysis) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              AI Evidence Analyst
            </h3>
          </div>
          <button
            onClick={onRefresh}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Analysis</span>
          </button>
        </div>
        <p className="text-xs text-rose-600 font-medium">
          {errorMessage || "AI interpretation could not be generated right now."}
        </p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              AI Evidence Analyst
            </h3>
          </div>
          <button
            onClick={onRefresh}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Generate Analysis</span>
          </button>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Click above to generate cross-chapter AI telemetry interpretation on your accumulated {subject} question attempts.
        </p>
      </div>
    );
  }

  const isInsufficient = analysis.status === "insufficient_data";
  const isFallback = analysis.status === "fallback";

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Fallback Notice Banner if AI interpretation service is unavailable */}
      {isFallback && (
        <div className="p-3.5 px-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs font-medium text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>AI interpretation temporarily unavailable — displaying verified telemetry analysis from deterministic engine.</span>
          </div>
          <button
            onClick={onRefresh}
            className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-[11px] transition-all shrink-0 cursor-pointer shadow-xs"
          >
            Retry AI
          </button>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              <span>AI Evidence Analyst</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              {subject}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                analysis.diagnosticConfidence === "HIGH"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : analysis.diagnosticConfidence === "MEDIUM"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {analysis.evidenceThresholdLabel}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-600">
            {analysis.subjectSummary}
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          title="Re-analyze latest questions"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refresh Analysis</span>
        </button>
      </div>

      {isInsufficient ? (
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs space-y-1.5">
          <p className="font-bold text-amber-900">
            Sample Calibration Phase: Need at least 5 qualifying questions in {subject} to unlock deep pattern detection.
          </p>
          <p className="text-amber-800/80 text-[11px] font-medium">
            The deterministic engine is currently collecting initial baseline signals. Complete a full CBT mock to calibrate your error taxonomy.
          </p>
        </div>
      ) : (
        <>
          {/* 2. Sub-Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("insights")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === "insights"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Key Error Patterns ({analysis.keyPatterns.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("cross_chapter")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === "cross_chapter"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Cross-Chapter Patterns ({analysis.crossChapterPatterns.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("difficulty")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === "difficulty"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              <span>Difficulty Progression</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === "profile"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Subject Learning Profile</span>
            </button>
          </div>

          {/* 3. Tab Contents */}
          {/* TAB 1: KEY PATTERNS & KNOWLEDGE VS PERFORMANCE */}
          {activeTab === "insights" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {analysis.keyPatterns.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs tracking-tight">
                        {pat.title}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          pat.classification === "KNOWLEDGE_PROBLEM"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : pat.classification === "PERFORMANCE_PROBLEM"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {pat.classification?.replace("_", " ") || "PATTERN"}
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {pat.description}
                    </p>
                    {pat.evidenceQuestionIds.length > 0 && (
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                        <span>Evidence:</span>
                        <span className="font-semibold text-slate-600">{pat.evidenceQuestionIds.length} question(s) verified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Categorized Bullet Summaries */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                {analysis.knowledgePatterns.length > 0 && (
                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-2">
                    <span className="font-bold text-rose-700 uppercase tracking-wider text-[10px] block">
                      Knowledge / Conceptual
                    </span>
                    <ul className="space-y-1.5 font-medium text-slate-700">
                      {analysis.knowledgePatterns.map((kp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.performancePatterns.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
                    <span className="font-bold text-amber-700 uppercase tracking-wider text-[10px] block">
                      Execution / Performance
                    </span>
                    <ul className="space-y-1.5 font-medium text-slate-700">
                      {analysis.performancePatterns.map((pp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{pp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.interpretationPatterns.length > 0 && (
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                    <span className="font-bold text-blue-700 uppercase tracking-wider text-[10px] block">
                      Question Interpretation
                    </span>
                    <ul className="space-y-1.5 font-medium text-slate-700">
                      {analysis.interpretationPatterns.map((ip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{ip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CROSS-CHAPTER PATTERNS */}
          {activeTab === "cross_chapter" && (
            <div className="space-y-3.5">
              {analysis.crossChapterPatterns.length === 0 ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-800">
                  ✅ No recurring cross-chapter systemic issues detected. Mistakes remain isolated to individual chapters.
                </div>
              ) : (
                analysis.crossChapterPatterns.map((cp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-xs space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-slate-900 text-sm tracking-tight">
                        {cp.pattern}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {cp.chapters.map((chap, ci) => (
                          <span
                            key={ci}
                            className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                          >
                            {chap}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {cp.description}
                    </p>
                    {cp.evidenceQuestionIds.length > 0 && (
                      <p className="text-[11px] text-slate-400 font-medium pt-1">
                        Cross-chapter evidence verified across {cp.evidenceQuestionIds.length} question attempt(s).
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: DIFFICULTY PROGRESSION */}
          {activeTab === "difficulty" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Easy Questions (Direct Recall)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {analysis.difficultyAnalysis.easy}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                  Moderate Questions (Application)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {analysis.difficultyAnalysis.medium}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                  Hard Questions (Multi-Step Integration)
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {analysis.difficultyAnalysis.hard}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LEARNING PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    Core Strengths ({analysis.learningProfile.strengths.length})
                  </span>
                  <ul className="space-y-1.5 font-medium text-slate-700">
                    {analysis.learningProfile.strengths.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4.5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                    Vulnerabilities ({analysis.learningProfile.weaknesses.length})
                  </span>
                  <ul className="space-y-1.5 font-medium text-slate-700">
                    {analysis.learningProfile.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {analysis.cycleIntegration && analysis.cycleIntegration.observations.length > 0 && (
                <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Diagnostic Cycle History
                  </span>
                  <ul className="space-y-1 text-slate-700 font-medium text-xs">
                    {analysis.cycleIntegration.observations.map((obs, i) => (
                      <li key={i}>• {obs}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 4. Priority Action Items (Connected Directly to Repair Drills) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
              Recommended Repair Targets
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {analysis.priorityAreas.map((pa, idx) => (
                <div
                  key={idx}
                  className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between gap-3 text-xs shadow-xs"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 text-xs">{pa.title}</h4>
                    <p className="text-slate-500 font-medium text-[11px]">{pa.reason}</p>
                    <ul className="list-disc pl-4 text-[11px] text-slate-600 font-medium space-y-0.5 pt-1">
                      {pa.actions.map((act, ai) => (
                        <li key={ai}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onLaunchRepairDrill(
                        pa.recommendedDrillTopic || pa.title,
                        pa.recommendedDrillType || "5-Question Concept Repair"
                      )
                    }
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Launch Targeted Repair Drill</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
