"use client";

import React, { useState } from "react";
import {
  X,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Award,
  Brain,
  Target,
  Check,
} from "lucide-react";
import { DiagnosticCycle } from "@/types/cycle";

interface CycleAnalysisModalProps {
  cycle: DiagnosticCycle;
  onClose: () => void;
}

export function CycleAnalysisModal({ cycle, onClose }: CycleAnalysisModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "comparison" | "ai" | "topics">("overview");
  const isBaseline = cycle.cycleNumber === 1 || !cycle.comparison;
  const comp = cycle.comparison;
  const ai = cycle.aiAnalysis;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-lg shadow-xs">
              C{cycle.cycleNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Diagnostic Cycle {cycle.cycleNumber} Report
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                  {isBaseline ? "Baseline Diagnostic" : `Compared vs Cycle ${cycle.cycleNumber - 1}`}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium font-mono">
                {cycle.totalQuestionsAttempted} Questions Analyzed · {cycle.overallAccuracyPercentage}% Overall Accuracy · Status: {cycle.status.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-blue-50 text-blue-700 border-blue-200/60 shadow-xs"
                : "bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100"
            }`}
          >
            Cycle Overview
          </button>

          {!isBaseline && (
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "comparison"
                  ? "bg-blue-50 text-blue-700 border-blue-200/60 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100"
              }`}
            >
              <span>Comparative Analysis</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </button>
          )}

          <button
            onClick={() => setActiveTab("ai")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "ai"
                ? "bg-purple-50 text-purple-700 border-purple-200/60 shadow-xs"
                : "bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100"
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Interpretation</span>
          </button>

          <button
            onClick={() => setActiveTab("topics")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              activeTab === "topics"
                ? "bg-blue-50 text-blue-700 border-blue-200/60 shadow-xs"
                : "bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100"
            }`}
          >
            Topic Breakdown ({cycle.topicPerformance.length})
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Baseline Notice if Cycle 1 */}
              {isBaseline && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1 shadow-xs">
                  <p className="font-bold text-amber-900 uppercase text-[11px] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Baseline Diagnostic Profile</span>
                  </p>
                  <p className="font-medium text-amber-800 text-xs">
                    Cycle 1 establishes your initial performance baseline. Comparative analytics will automatically activate upon completing Cycle 2.
                  </p>
                </div>
              )}

              {/* 4 Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
                  <p className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">{cycle.overallAccuracyPercentage}%</p>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                    {cycle.correctAnswersCount}/{cycle.totalQuestionsAttempted} Correct
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Pace</span>
                  <p className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">{cycle.responseTelemetry.avgTimeSeconds}s</p>
                  <p className="text-[10px] font-semibold text-slate-500 mt-0.5">per question</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 shadow-xs">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Strengths</span>
                  <p className="text-2xl font-extrabold text-emerald-900 font-mono mt-0.5">{cycle.strengths.length}</p>
                  <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">Dominant domains</p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 shadow-xs">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Weaknesses</span>
                  <p className="text-2xl font-extrabold text-rose-900 font-mono mt-0.5">{cycle.diagnosedWeaknesses.length}</p>
                  <p className="text-[10px] font-semibold text-rose-600 mt-0.5">Requires drill practice</p>
                </div>
              </div>

              {/* Subject Breakdown Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Subject Performance in Cycle {cycle.cycleNumber}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(cycle.subjectPerformance).map((sub) => (
                    <div key={sub.subjectKey} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{sub.subject}</span>
                        <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {sub.accuracy}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.max(4, sub.accuracy)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
                        <span>{sub.correct}/{sub.attempted} Correct</span>
                        <span>{sub.avgTimeSeconds}s avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Diagnosed Weaknesses */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Diagnosed Weakness Clusters ({cycle.diagnosedWeaknesses.length})
                </h3>
                {cycle.diagnosedWeaknesses.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs font-semibold text-emerald-800">
                    ✅ Outstanding performance! No chronic weakness clusters diagnosed in this cycle.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cycle.diagnosedWeaknesses.map((w, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 shadow-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">{w.subject}</span>
                          <span className="text-xs font-bold font-mono text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-100">{w.accuracyPercentage}% Acc</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{w.chapter}</h4>
                        <p className="text-[11px] font-medium text-slate-700">{w.fullDiagnosis?.primaryDiagnosis || "Knowledge Gap"}</p>
                        <p className="text-[10px] font-medium text-slate-500">Drill: {w.fullDiagnosis?.recommendedPracticeType || "5-Question Concept Repair"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 6-PART COMPARATIVE ANALYSIS (CYCLE 2+) */}
          {activeTab === "comparison" && comp && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-1 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    CYCLE {comp.previousCycleNumber} → CYCLE {comp.currentCycleNumber} DELTA
                  </span>
                  <span className="text-xs font-bold font-mono">
                    Accuracy Delta: {comp.accuracyDelta > 0 ? `+${comp.accuracyDelta}%` : `${comp.accuracyDelta}%`}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-300">
                  Detailed root-cause comparison answering the 6 critical evolution questions.
                </p>
              </div>

              {/* 1. WHAT IMPROVED? */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    1. What Improved? ({comp.improved.length})
                  </h3>
                </div>
                {comp.improved.length === 0 ? (
                  <p className="text-xs font-medium text-slate-400 italic">No significant topic score improvements detected in this cycle.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.improved.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 shadow-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">{item.subject}</span>
                          <span className="text-xs font-bold font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                            +{item.deltaPercentage} pts
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.topic}</h4>
                        <p className="text-xs font-mono font-medium text-slate-600">
                          Cycle {comp.previousCycleNumber}: {item.previousAccuracy}% → Cycle {comp.currentCycleNumber}: {item.currentAccuracy}%
                        </p>
                        <p className="text-[11px] font-medium text-slate-500">{item.evidence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. WHAT REMAINED WEAK? (WITH ERROR PATTERN SHIFT) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <RefreshCw className="w-4 h-4 text-rose-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    2. What Remained Weak? ({comp.recurringWeak.length})
                  </h3>
                </div>
                {comp.recurringWeak.length === 0 ? (
                  <p className="text-xs font-medium text-slate-400 italic">No recurring chronic weaknesses identified across both cycles.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.recurringWeak.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">{item.subject}</span>
                          <span className="text-xs font-bold font-mono text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200">
                            {item.currentAccuracy}% Acc
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.topic}</h4>
                        <p className="text-[11px] font-semibold text-slate-700">
                          Status: <span className="text-rose-600">{item.status}</span>
                        </p>
                        {item.errorPatternShift ? (
                          <div className="p-2.5 rounded-xl bg-white border border-rose-200/60 text-[11px] font-medium text-slate-800">
                            🔄 <span className="font-bold">Error Pattern Shift:</span> {item.explanation}
                          </div>
                        ) : (
                          <p className="text-[11px] font-medium text-slate-600">{item.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. WHAT WAS FIXED? */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    3. What Was Fixed / Resolved? ({comp.resolved.length})
                  </h3>
                </div>
                {comp.resolved.length === 0 ? (
                  <p className="text-xs font-medium text-slate-400 italic">No weaknesses met the strict resolution criteria this cycle.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.resolved.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 shadow-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">{item.subject}</span>
                          <span className="text-xs font-bold font-mono text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                            ✅ Resolved ({item.currentAccuracy}%)
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.topic}</h4>
                        <p className="text-[11px] font-medium text-slate-600">
                          Was {item.previousAccuracy}% ({item.previousErrors} errors) → Now {item.currentAccuracy}% ({item.currentErrors} errors)
                        </p>
                        <p className="text-[10px] font-medium text-slate-500">{item.resolutionEvidence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. NEW MISTAKES APPEARED */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    4. New Mistakes &amp; Emerging Patterns ({comp.newMistakes.length})
                  </h3>
                </div>
                {comp.newMistakes.length === 0 ? (
                  <p className="text-xs font-medium text-slate-400 italic">No newly emerging mistake patterns detected in this cycle.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.newMistakes.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 shadow-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">{item.subject}</span>
                          <span className="text-xs font-bold font-mono text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                            🆕 New Pattern
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.topic}</h4>
                        <p className="text-[11px] font-medium text-slate-700">
                          Pattern: {item.primaryPattern}
                        </p>
                        <p className="text-[10px] font-medium text-slate-500">{item.evidence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. WHAT GOT WORSE? (DECLINES) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    5. What Got Worse? ({comp.declined.length})
                  </h3>
                </div>
                {comp.declined.length === 0 ? (
                  <p className="text-xs font-medium text-slate-400 italic">No significant regressions detected between cycles.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.declined.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 shadow-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800">{item.subject}</span>
                          <span className="text-xs font-bold font-mono text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-200">
                            ⚠️ {item.declinePercentage} pts
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.topic}</h4>
                        <p className="text-xs font-mono font-medium text-slate-600">
                          Cycle {comp.previousCycleNumber}: {item.previousAccuracy}% → Cycle {comp.currentCycleNumber}: {item.currentAccuracy}%
                        </p>
                        <p className="text-[11px] font-medium text-slate-500">{item.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. WHAT SHOULD THE STUDENT FOCUS ON NEXT? */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Target className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    6. What Should You Focus On Next? ({comp.recommendedFocus.length})
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {comp.recommendedFocus.map((focus, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {focus.priority}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{focus.topic}</span>
                          <span className="text-[10px] font-semibold text-slate-400 font-mono">({focus.subject})</span>
                        </div>
                        <p className="text-xs font-medium text-slate-600">{focus.reason}</p>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] font-semibold text-slate-800">
                          👉 Action: {focus.recommendedDrill}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI INTERPRETATION */}
          {activeTab === "ai" && (
            <div className="space-y-5">
              {ai ? (
                <>
                  <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span>Executive Diagnostic Narrative</span>
                    </span>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {ai.overallNarrative}
                    </p>
                  </div>

                  {ai.recurringMisconceptions.length > 0 && (
                    <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 shadow-xs space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                        Identified Misconceptions &amp; Root Causes
                      </span>
                      <ul className="space-y-1.5 text-xs font-medium text-slate-700">
                        {ai.recurringMisconceptions.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ai.crossTopicPatterns.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 shadow-xs space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        Cross-Topic Error Behaviors
                      </span>
                      <ul className="space-y-1.5 text-xs font-medium text-slate-700">
                        {ai.crossTopicPatterns.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Recommended Remediation Roadmap
                    </span>
                    <ul className="space-y-2 text-xs font-semibold text-slate-800">
                      {ai.personalizedRoadmap.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-xs font-medium text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  AI Interpretation pending generation.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TOPIC BREAKDOWN */}
          {activeTab === "topics" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cycle.topicPerformance.map((topic, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{topic.subject}</span>
                      <span
                        className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full border ${
                          topic.accuracy >= 70
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : topic.accuracy >= 50
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {topic.accuracy}%
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{topic.chapter}</h4>
                    <p className="text-[11px] font-medium text-slate-600">
                      {topic.correct}/{topic.attempts} Correct · {topic.incorrect} Incorrect · {topic.avgTimeSeconds}s avg
                    </p>
                    <p className="text-[10px] font-medium text-slate-400">
                      Primary pattern: {topic.primaryDiagnosis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs font-semibold text-slate-500 font-mono">
            Cycle {cycle.cycleNumber} of diagnostic history
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
