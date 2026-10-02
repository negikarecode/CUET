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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl border-3 border-black w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[8px_8px_0px_0px_#000] overflow-hidden my-auto">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-[#FAF7EE] border-b-2 border-black flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-mono font-black text-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              C{cycle.cycleNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-black tracking-tight uppercase">
                  Diagnostic Cycle {cycle.cycleNumber} Report
                </h2>
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black uppercase tracking-wider">
                  {isBaseline ? "Baseline Diagnostic" : `Compared vs Cycle ${cycle.cycleNumber - 1}`}
                </span>
              </div>
              <p className="text-xs text-black/70 font-semibold font-mono">
                {cycle.totalQuestionsAttempted} Questions Analyzed · {cycle.overallAccuracyPercentage}% Overall Accuracy · Status: {cycle.status.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_#000]"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-3 bg-white border-b-2 border-black/10 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-xs font-black rounded-t-lg border-t-2 border-x-2 border-black transition-all ${
              activeTab === "overview"
                ? "bg-white text-black -mb-[2px] border-b-2 border-b-white z-10"
                : "bg-[#FAF7EE] text-black/60 hover:text-black"
            }`}
          >
            Cycle Overview
          </button>

          {!isBaseline && (
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-4 py-2 text-xs font-black rounded-t-lg border-t-2 border-x-2 border-black transition-all flex items-center gap-1.5 ${
                activeTab === "comparison"
                  ? "bg-white text-black -mb-[2px] border-b-2 border-b-white z-10"
                  : "bg-[#FAF7EE] text-black/60 hover:text-black"
              }`}
            >
              <span>Comparative Analysis</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            </button>
          )}

          <button
            onClick={() => setActiveTab("ai")}
            className={`px-4 py-2 text-xs font-black rounded-t-lg border-t-2 border-x-2 border-black transition-all flex items-center gap-1.5 ${
              activeTab === "ai"
                ? "bg-white text-black -mb-[2px] border-b-2 border-b-white z-10"
                : "bg-[#FAF7EE] text-black/60 hover:text-black"
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>AI Interpretation</span>
          </button>

          <button
            onClick={() => setActiveTab("topics")}
            className={`px-4 py-2 text-xs font-black rounded-t-lg border-t-2 border-x-2 border-black transition-all ${
              activeTab === "topics"
                ? "bg-white text-black -mb-[2px] border-b-2 border-b-white z-10"
                : "bg-[#FAF7EE] text-black/60 hover:text-black"
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
                <div className="p-4 rounded-xl bg-[#FEF3C7] border-2 border-black text-xs space-y-1 shadow-[2px_2px_0px_0px_#000]">
                  <p className="font-black text-[#92400E] uppercase text-[11px] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#D97706]" />
                    <span>BASELINE DIAGNOSTIC PROFILE</span>
                  </p>
                  <p className="font-bold text-black text-xs">
                    Cycle 1 establishes your initial performance baseline. Comparative analytics will automatically activate upon completing Cycle 2.
                  </p>
                </div>
              )}

              {/* 4 Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[10px] font-black text-black/60 uppercase">Accuracy</span>
                  <p className="text-2xl font-black text-black font-mono">{cycle.overallAccuracyPercentage}%</p>
                  <p className="text-[10px] font-bold text-black/70">
                    {cycle.correctAnswersCount}/{cycle.totalQuestionsAttempted} Correct
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[10px] font-black text-black/60 uppercase">Average Pace</span>
                  <p className="text-2xl font-black text-black font-mono">{cycle.responseTelemetry.avgTimeSeconds}s</p>
                  <p className="text-[10px] font-bold text-black/70">per question</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[10px] font-black text-[#15803D] uppercase">Strengths</span>
                  <p className="text-2xl font-black text-black font-mono">{cycle.strengths.length}</p>
                  <p className="text-[10px] font-bold text-[#15803D]">Dominant domains</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FEF2F2] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[10px] font-black text-[#DC2626] uppercase">Weaknesses</span>
                  <p className="text-2xl font-black text-black font-mono">{cycle.diagnosedWeaknesses.length}</p>
                  <p className="text-[10px] font-bold text-[#DC2626]">Requires drill practice</p>
                </div>
              </div>

              {/* Subject Breakdown Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase text-black tracking-wider">
                  Subject Performance in Cycle {cycle.cycleNumber}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(cycle.subjectPerformance).map((sub) => (
                    <div key={sub.subjectKey} className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-black">{sub.subject}</span>
                        <span className="text-xs font-black font-mono px-2 py-0.5 rounded bg-black text-white">
                          {sub.accuracy}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 border border-black rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#10B981]"
                          style={{ width: `${Math.max(4, sub.accuracy)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-black/70">
                        <span>{sub.correct}/{sub.attempted} Correct</span>
                        <span>{sub.avgTimeSeconds}s avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Diagnosed Weaknesses */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase text-black tracking-wider">
                  Diagnosed Weakness Clusters ({cycle.diagnosedWeaknesses.length})
                </h3>
                {cycle.diagnosedWeaknesses.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#F0FDF4] border-2 border-black text-xs font-bold text-[#15803D]">
                    ✅ Outstanding performance! No chronic weakness clusters diagnosed in this cycle.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cycle.diagnosedWeaknesses.map((w, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#FFFBEB] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-[#B45309]">{w.subject}</span>
                          <span className="text-xs font-black font-mono text-[#DC2626]">{w.accuracyPercentage}% Acc</span>
                        </div>
                        <h4 className="text-sm font-black text-black">{w.chapter}</h4>
                        <p className="text-[11px] font-bold text-black/80">{w.fullDiagnosis?.primaryDiagnosis || "Knowledge Gap"}</p>
                        <p className="text-[10px] font-medium text-black/70">Drill: {w.fullDiagnosis?.recommendedPracticeType || "5-Question Concept Repair"}</p>
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
              <div className="p-4 rounded-xl bg-black text-white space-y-1 shadow-[3px_3px_0px_0px_#000]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#F59E0B]">
                    CYCLE {comp.previousCycleNumber} → CYCLE {comp.currentCycleNumber} DELTA
                  </span>
                  <span className="text-xs font-black font-mono">
                    Accuracy Delta: {comp.accuracyDelta > 0 ? `+${comp.accuracyDelta}%` : `${comp.accuracyDelta}%`}
                  </span>
                </div>
                <p className="text-xs font-bold text-white/90">
                  Detailed root-cause comparison answering the 6 critical evolution questions.
                </p>
              </div>

              {/* 1. WHAT IMPROVED? */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                  <TrendingUp className="w-4 h-4 text-[#16A34A]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    1. What Improved? ({comp.improved.length})
                  </h3>
                </div>
                {comp.improved.length === 0 ? (
                  <p className="text-xs font-medium text-black/60 italic">No significant topic score improvements detected in this cycle.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.improved.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#F0FDF4] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-[#15803D]">{item.subject}</span>
                          <span className="text-xs font-black font-mono text-[#15803D] bg-white px-2 py-0.5 rounded border border-[#15803D]">
                            +{item.deltaPercentage} pts
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-black">{item.topic}</h4>
                        <p className="text-xs font-mono font-bold text-black/80">
                          Cycle {comp.previousCycleNumber}: {item.previousAccuracy}% → Cycle {comp.currentCycleNumber}: {item.currentAccuracy}%
                        </p>
                        <p className="text-[11px] font-medium text-black/70">{item.evidence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. WHAT REMAINED WEAK? (WITH ERROR PATTERN SHIFT) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                  <RefreshCw className="w-4 h-4 text-[#DC2626]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    2. What Remained Weak? ({comp.recurringWeak.length})
                  </h3>
                </div>
                {comp.recurringWeak.length === 0 ? (
                  <p className="text-xs font-medium text-black/60 italic">No recurring chronic weaknesses identified across both cycles.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.recurringWeak.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#FEF2F2] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-[#DC2626]">{item.subject}</span>
                          <span className="text-xs font-black font-mono text-[#DC2626] bg-white px-2 py-0.5 rounded border border-[#DC2626]">
                            {item.currentAccuracy}% Acc
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-black">{item.topic}</h4>
                        <p className="text-[11px] font-bold text-black">
                          Status: <span className="text-[#DC2626]">{item.status}</span>
                        </p>
                        {item.errorPatternShift ? (
                          <div className="p-2 rounded bg-white border border-[#DC2626]/40 text-[11px] font-semibold text-black/90">
                            🔄 <span className="font-bold">Error Pattern Shift:</span> {item.explanation}
                          </div>
                        ) : (
                          <p className="text-[11px] font-medium text-black/80">{item.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. WHAT WAS FIXED? */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    3. What Was Fixed / Resolved? ({comp.resolved.length})
                  </h3>
                </div>
                {comp.resolved.length === 0 ? (
                  <p className="text-xs font-medium text-black/60 italic">No weaknesses met the strict resolution criteria this cycle.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.resolved.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#DCFCE7] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-[#16A34A]">{item.subject}</span>
                          <span className="text-xs font-black font-mono text-[#16A34A] bg-white px-2 py-0.5 rounded border border-[#16A34A]">
                            ✅ Resolved ({item.currentAccuracy}%)
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-black">{item.topic}</h4>
                        <p className="text-[11px] font-bold text-black/80">
                          Was {item.previousAccuracy}% ({item.previousErrors} errors) → Now {item.currentAccuracy}% ({item.currentErrors} errors)
                        </p>
                        <p className="text-[10px] font-medium text-black/70">{item.resolutionEvidence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. NEW MISTAKES APPEARED */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    4. New Mistakes &amp; Emerging Patterns ({comp.newMistakes.length})
                  </h3>
                </div>
                {comp.newMistakes.length === 0 ? (
                  <p className="text-xs font-medium text-black/60 italic">No newly emerging mistake patterns detected in this cycle.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.newMistakes.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#FFFBEB] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-[#B45309]">{item.subject}</span>
                          <span className="text-xs font-black font-mono text-[#B45309] bg-white px-2 py-0.5 rounded border border-[#B45309]">
                            🆕 New Pattern
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-black">{item.topic}</h4>
                        <p className="text-[11px] font-bold text-black/90">
                          Pattern: {item.primaryPattern}
                        </p>
                        <p className="text-[10px] font-medium text-black/70">{item.evidence}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. WHAT GOT WORSE? (DECLINES) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                  <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    5. What Got Worse? ({comp.declined.length})
                  </h3>
                </div>
                {comp.declined.length === 0 ? (
                  <p className="text-xs font-medium text-black/60 italic">No significant regressions detected between cycles.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {comp.declined.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-[#92400E]">{item.subject}</span>
                          <span className="text-xs font-black font-mono text-[#DC2626] bg-white px-2 py-0.5 rounded border border-[#DC2626]">
                            ⚠️ {item.declinePercentage} pts
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-black">{item.topic}</h4>
                        <p className="text-xs font-mono font-bold text-black/80">
                          Cycle {comp.previousCycleNumber}: {item.previousAccuracy}% → Cycle {comp.currentCycleNumber}: {item.currentAccuracy}%
                        </p>
                        <p className="text-[11px] font-medium text-black/80">{item.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. WHAT SHOULD THE STUDENT FOCUS ON NEXT? */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b-2 border-black pb-2">
                  <Target className="w-4 h-4 text-black" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-black">
                    6. What Should You Focus On Next? ({comp.recommendedFocus.length})
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {comp.recommendedFocus.map((focus, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {focus.priority}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-black">{focus.topic}</span>
                          <span className="text-[10px] font-bold text-black/60 font-mono">({focus.subject})</span>
                        </div>
                        <p className="text-xs font-medium text-black/80">{focus.reason}</p>
                        <div className="p-2 rounded bg-[#FAF7EE] border border-black/20 text-[11px] font-bold text-black">
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
                  <div className="p-4 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-black/60 flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-[#8B5CF6]" />
                      <span>Executive Diagnostic Narrative</span>
                    </span>
                    <p className="text-sm font-semibold text-black leading-relaxed">
                      {ai.overallNarrative}
                    </p>
                  </div>

                  {ai.recurringMisconceptions.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#FEF2F2] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626]">
                        Identified Misconceptions &amp; Root Causes
                      </span>
                      <ul className="space-y-1.5 text-xs font-medium text-black">
                        {ai.recurringMisconceptions.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#DC2626] font-bold">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {ai.crossTopicPatterns.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#FFFBEB] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">
                        Cross-Topic Error Behaviors
                      </span>
                      <ul className="space-y-1.5 text-xs font-medium text-black">
                        {ai.crossTopicPatterns.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#B45309] font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-[#F0FDF4] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#15803D]">
                      Recommended Remediation Roadmap
                    </span>
                    <ul className="space-y-2 text-xs font-semibold text-black">
                      {ai.personalizedRoadmap.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-xs font-bold text-black/60 bg-[#FAF7EE] rounded-xl border-2 border-black">
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
                  <div key={idx} className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-black/60">{topic.subject}</span>
                      <span
                        className={`text-xs font-black font-mono px-2 py-0.5 rounded border border-black ${
                          topic.accuracy >= 70
                            ? "bg-[#DCFCE7] text-[#16A34A]"
                            : topic.accuracy >= 50
                            ? "bg-[#FEF3C7] text-[#B45309]"
                            : "bg-[#FEF2F2] text-[#DC2626]"
                        }`}
                      >
                        {topic.accuracy}%
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-black">{topic.chapter}</h4>
                    <p className="text-[11px] font-bold text-black/70">
                      {topic.correct}/{topic.attempts} Correct · {topic.incorrect} Incorrect · {topic.avgTimeSeconds}s avg
                    </p>
                    <p className="text-[10px] font-medium text-black/60">
                      Primary pattern: {topic.primaryDiagnosis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF7EE] border-t-2 border-black flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs font-bold text-black/70 font-mono">
            Cycle {cycle.cycleNumber} of diagnostic history
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-black text-white hover:bg-black/90 font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
