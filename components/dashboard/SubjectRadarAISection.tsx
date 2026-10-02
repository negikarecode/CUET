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
  onRefresh: () => void;
  onLaunchRepairDrill: (topic: string, practiceType?: string) => void;
}

export function SubjectRadarAISection({
  subject,
  analysis,
  isLoading,
  onRefresh,
  onLaunchRepairDrill,
}: SubjectRadarAISectionProps) {
  const [activeTab, setActiveTab] = useState<"insights" | "cross_chapter" | "difficulty" | "profile">("insights");

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border-3 border-black p-6 shadow-[5px_5px_0px_0px_#000] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center animate-spin">
              <Brain className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-black uppercase tracking-tight">
                AI Evidence Analyst
              </h3>
              <p className="text-xs text-black/60 font-semibold">
                Synthesizing cross-chapter telemetry &amp; error mechanisms for {subject}...
              </p>
            </div>
          </div>
        </div>
        <div className="h-24 bg-[#FAF7EE] rounded-xl border-2 border-black/10 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-black/40">Evaluating response patterns...</span>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-2xl border-3 border-black p-6 shadow-[5px_5px_0px_0px_#000] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="text-sm font-black text-black uppercase tracking-tight">
              AI Evidence Analyst
            </h3>
          </div>
          <button
            onClick={onRefresh}
            className="px-3 py-1 rounded-lg bg-[#FAF7EE] hover:bg-black hover:text-white border-2 border-black text-xs font-black transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Generate Analysis</span>
          </button>
        </div>
        <p className="text-xs text-black/70 font-semibold">
          Click above to generate cross-chapter AI telemetry interpretation on your accumulated {subject} question attempts.
        </p>
      </div>
    );
  }

  const isInsufficient = analysis.status === "insufficient_data";

  return (
    <div className="bg-white rounded-2xl border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000] space-y-5">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg bg-black text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-[1px_1px_0px_0px_#000]">
              <Brain className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>AI EVIDENCE ANALYST</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FAF7EE] text-black border border-black text-[10px] font-bold uppercase">
              {subject}
            </span>
            <span
              className={`px-2 py-0.5 rounded border border-black text-[10px] font-black uppercase ${
                analysis.diagnosticConfidence === "HIGH"
                  ? "bg-[#DCFCE7] text-[#16A34A]"
                  : analysis.diagnosticConfidence === "MEDIUM"
                  ? "bg-[#FEF3C7] text-[#B45309]"
                  : "bg-[#F3F4F6] text-black/70"
              }`}
            >
              {analysis.evidenceThresholdLabel}
            </span>
          </div>
          <p className="text-xs font-bold text-black/80">
            {analysis.subjectSummary}
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-[#FAF7EE] hover:bg-black hover:text-white border-2 border-black text-xs font-black transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]"
          title="Re-analyze latest questions"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Refresh Analysis</span>
        </button>
      </div>

      {isInsufficient ? (
        <div className="p-4 rounded-xl bg-[#FFFBEB] border-2 border-black text-xs space-y-2">
          <p className="font-bold text-black">
            Sample Calibration Phase: Need at least 5 qualifying questions in {subject} to unlock deep pattern detection.
          </p>
          <p className="text-black/70 text-[11px]">
            The deterministic engine is currently collecting initial baseline signals. Complete a full CBT mock to calibrate your error taxonomy.
          </p>
        </div>
      ) : (
        <>
          {/* 2. Sub-Tabs */}
          <div className="flex items-center gap-2 border-b-2 border-black/10 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab("insights")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-black flex items-center gap-1.5 ${
                activeTab === "insights"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-[#FAF7EE] text-black hover:bg-white"
              }`}
            >
              <Zap className="w-3 h-3 text-[#F59E0B]" />
              <span>Key Error Patterns ({analysis.keyPatterns.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("cross_chapter")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-black flex items-center gap-1.5 ${
                activeTab === "cross_chapter"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-[#FAF7EE] text-black hover:bg-white"
              }`}
            >
              <Layers className="w-3 h-3 text-[#3B82F6]" />
              <span>Cross-Chapter Patterns ({analysis.crossChapterPatterns.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("difficulty")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-black flex items-center gap-1.5 ${
                activeTab === "difficulty"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-[#FAF7EE] text-black hover:bg-white"
              }`}
            >
              <Target className="w-3 h-3 text-[#10B981]" />
              <span>Difficulty Progression</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all border-2 border-black flex items-center gap-1.5 ${
                activeTab === "profile"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-[#FAF7EE] text-black hover:bg-white"
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#EC4899]" />
              <span>Subject Learning Profile</span>
            </button>
          </div>

          {/* 3. Tab Contents */}
          {/* TAB 1: KEY PATTERNS & KNOWLEDGE VS PERFORMANCE */}
          {activeTab === "insights" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.keyPatterns.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-black text-xs uppercase tracking-tight">
                        {pat.title}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border border-black ${
                          pat.classification === "KNOWLEDGE_PROBLEM"
                            ? "bg-[#FEF2F2] text-[#DC2626]"
                            : pat.classification === "PERFORMANCE_PROBLEM"
                            ? "bg-[#FEF3C7] text-[#B45309]"
                            : "bg-[#EFF6FF] text-[#2563EB]"
                        }`}
                      >
                        {pat.classification?.replace("_", " ") || "PATTERN"}
                      </span>
                    </div>
                    <p className="text-black/80 font-bold leading-relaxed">
                      {pat.description}
                    </p>
                    {pat.evidenceQuestionIds.length > 0 && (
                      <div className="pt-1 flex items-center gap-1.5 text-[10px] text-black/60 font-mono">
                        <span>Evidence:</span>
                        <span className="font-bold">{pat.evidenceQuestionIds.length} question(s) verified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Categorized Bullet Summaries */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {analysis.knowledgePatterns.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#FEF2F2] border-2 border-black space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                    <span className="font-black text-[#DC2626] uppercase text-[10px] block">
                      Knowledge / Conceptual
                    </span>
                    <ul className="space-y-1 font-semibold text-black/90">
                      {analysis.knowledgePatterns.map((kp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#DC2626] font-bold">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.performancePatterns.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#FEF3C7] border-2 border-black space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                    <span className="font-black text-[#B45309] uppercase text-[10px] block">
                      Execution / Performance
                    </span>
                    <ul className="space-y-1 font-semibold text-black/90">
                      {analysis.performancePatterns.map((pp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#B45309] font-bold">•</span>
                          <span>{pp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.interpretationPatterns.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#EFF6FF] border-2 border-black space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                    <span className="font-black text-[#1D4ED8] uppercase text-[10px] block">
                      Question Interpretation
                    </span>
                    <ul className="space-y-1 font-semibold text-black/90">
                      {analysis.interpretationPatterns.map((ip, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#1D4ED8] font-bold">•</span>
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
            <div className="space-y-3">
              {analysis.crossChapterPatterns.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#F0FDF4] border-2 border-black text-xs font-bold text-[#15803D]">
                  ✅ No recurring cross-chapter systemic issues detected. Mistakes remain isolated to individual chapters.
                </div>
              ) : (
                analysis.crossChapterPatterns.map((cp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-black text-black text-sm tracking-tight">
                        {cp.pattern}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {cp.chapters.map((chap, ci) => (
                          <span
                            key={ci}
                            className="px-2 py-0.5 rounded bg-[#FAF7EE] border border-black text-[10px] font-black uppercase text-black"
                          >
                            {chap}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-black/80 font-bold leading-relaxed">
                      {cp.description}
                    </p>
                    {cp.evidenceQuestionIds.length > 0 && (
                      <p className="text-[10px] font-mono text-black/60 pt-1">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F0FDF4] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
                <span className="text-[10px] font-black uppercase text-[#15803D] block">
                  Easy Questions (Direct Recall)
                </span>
                <p className="text-black/90 font-bold leading-relaxed">
                  {analysis.difficultyAnalysis.easy}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
                <span className="text-[10px] font-black uppercase text-[#B45309] block">
                  Moderate Questions (Application)
                </span>
                <p className="text-black/90 font-bold leading-relaxed">
                  {analysis.difficultyAnalysis.medium}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FEF2F2] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
                <span className="text-[10px] font-black uppercase text-[#DC2626] block">
                  Hard Questions (Multi-Step Integration)
                </span>
                <p className="text-black/90 font-bold leading-relaxed">
                  {analysis.difficultyAnalysis.hard}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LEARNING PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border-2 border-black space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-[#15803D] block">
                    Core Strengths ({analysis.learningProfile.strengths.length})
                  </span>
                  <ul className="space-y-1 font-semibold text-black/90">
                    {analysis.learningProfile.strengths.map((s, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FEF2F2] border-2 border-black space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-[#DC2626] block">
                    Vulnerabilities ({analysis.learningProfile.weaknesses.length})
                  </span>
                  <ul className="space-y-1 font-semibold text-black/90">
                    {analysis.learningProfile.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {analysis.cycleIntegration && analysis.cycleIntegration.observations.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border-2 border-black text-xs space-y-1 shadow-[2px_2px_0px_0px_#000]">
                  <span className="text-[10px] font-black uppercase text-black/70 tracking-wider block">
                    Diagnostic Cycle History
                  </span>
                  <ul className="space-y-0.5 text-black/90 font-bold text-[11px]">
                    {analysis.cycleIntegration.observations.map((obs, i) => (
                      <li key={i}>• {obs}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 4. Priority Action Items (Connected Directly to Repair Drills) */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[11px] font-black uppercase text-black tracking-wider block">
              RECOMMENDED REPAIR TARGETS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.priorityAreas.map((pa, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] flex flex-col justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <h4 className="font-black text-black text-xs">{pa.title}</h4>
                    <p className="text-black/70 font-bold text-[11px]">{pa.reason}</p>
                    <ul className="list-disc pl-4 text-[10px] text-black/80 font-medium space-y-0.5 pt-1">
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
                    className="w-full py-2 px-3 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
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
