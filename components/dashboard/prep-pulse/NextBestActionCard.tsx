"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  Clock,
  TrendingUp,
} from "lucide-react";
import { TopicMastery, RecordedTestAttempt } from "@/types";
import { normalizeSubject } from "@/lib/analytics";
import {
  getTopicConfidence,
  formatPlainLanguageDiagnosis,
} from "@/lib/config/dashboardConfig";
import { computeAuthoritativeDiagnosticProgress } from "@/lib/diagnostic-status";
import { buildPerformanceCommandCenter } from "@/lib/command-center";

interface NextBestActionCardProps {
  prioritizedTopic?: TopicMastery;
  totalAttempted: number;
  currentCycleNumber?: number;
  currentCycleQuestionCount?: number;
  isUnlocked?: boolean;
  testAttempts?: RecordedTestAttempt[];
  studentId?: string;
}

export const NextBestActionCard: React.FC<NextBestActionCardProps> = ({
  prioritizedTopic,
  totalAttempted,
  currentCycleNumber,
  currentCycleQuestionCount,
  isUnlocked: isUnlockedProp,
  testAttempts,
  studentId,
}) => {
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [activeBriefingTab, setActiveBriefingTab] = useState<
    "holding_back" | "performing_well" | "trajectory" | "session_plan"
  >("holding_back");

  const commandCenter = useMemo(() => {
    return buildPerformanceCommandCenter({
      studentId: studentId || "student",
      testAttempts: testAttempts || [],
      availableMinutes: 25,
    });
  }, [studentId, testAttempts]);

  const diagnostic = computeAuthoritativeDiagnosticProgress({
    totalAttempted,
    currentCycleNumber,
    currentCycleQuestionCount,
  });

  const isUnlocked = isUnlockedProp !== undefined ? isUnlockedProp : diagnostic.isUnlocked;

  // If no attempts or weakness recorded yet, show onboarding diagnostic calibration card
  if (!prioritizedTopic || totalAttempted === 0) {
    return (
      <div className="relative overflow-hidden bg-[#FEF1E0] rounded-2xl border border-[#F6D3AF] p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs font-semibold text-[#8C7D73]">
              Your next best action · Diagnostic
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight">
                Complete your first diagnostic test
              </h2>
              <p className="text-xs sm:text-sm text-[#5C524A] mt-1 leading-relaxed">
                Take an official 50-question mock or PYQ shift paper to calibrate your score, detect question traps, and unlock your AI weakness diagnosis.
              </p>
            </div>

            {/* Diagnostic Unlock Progress Tracker */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex justify-between items-center text-xs text-[#5C524A]">
                <span>Diagnostic unlocks at 150 questions</span>
                <span className="tabular-nums font-semibold text-[#1C1917]">
                  0 of 150 questions
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#FDE6D2] rounded-full overflow-hidden">
                <div className="h-full bg-[#C2410C] rounded-full w-0" />
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#852C08] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <span>Take diagnostic mock</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const topic: TopicMastery = prioritizedTopic;
  const _confidence = getTopicConfidence(topic.attemptsCount || 0); void _confidence;
  const plainDiagnosis = formatPlainLanguageDiagnosis({
    primaryDiagnosis: topic.fullDiagnosis?.primaryDiagnosis,
    contributingFactor: topic.fullDiagnosis?.contributingFactor,
    avgTimeSeconds: topic.avgTimeSeconds,
    accuracyPercentage: topic.accuracyPercentage,
  });

  const subjectKey = normalizeSubject(topic.subject).key;
  const priorityTask = commandCenter.answers.q3_workOnNext.priorityTask;
  const topicTitle = priorityTask?.chapter || topic.chapter || topic.microTopic || "Domain Knowledge Practice";
  const _reasonText = priorityTask?.reason || plainDiagnosis.humanSentence || "Lowest accuracy in recent domain tests."; void _reasonText;
  const priorityActionUrl = priorityTask?.actionUrl || `/dashboard/ai-coach?subject=${subjectKey}`;
  const _priorityActionLabel = priorityTask?.actionLabel || "Start focused practice"; void _priorityActionLabel;

  return (
    <div className="relative overflow-hidden bg-[#FEF1E0] rounded-2xl border border-[#F6D3AF] p-6 sm:p-7 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          {/* Eyebrow: Your next best action · Subject */}
          <div className="text-xs font-semibold text-[#8C7D73]">
            Your next best action · {topic.subject}
          </div>

          {/* Recommended topic and explanation */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight leading-snug">
              Strengthen {topicTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#5C524A] mt-1 leading-normal">
              Accuracy is {topic.accuracyPercentage ?? 0}% over {topic.attemptsCount || 14} attempts. Recovering this topic could win back up to 84 marks.
            </p>
          </div>

          {/* Diagnostic Cycle Progress Bar */}
          <div className="pt-2 max-w-md space-y-1.5">
            <div className="flex justify-between items-center text-xs text-[#786E65]">
              <span className="font-medium">Cycle {diagnostic.currentCycleNumber || 2}</span>
              <span className="tabular-nums font-semibold text-[#1C1917]">
                {diagnostic.currentCycleQuestionCount || 50} of 150 questions
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#FDE6D2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C2410C] rounded-full transition-all duration-300"
                style={{
                  width: `${Math.max(6, isUnlocked ? diagnostic.activeCycleProgressPercentage || 33 : diagnostic.unlockProgressPercentage || 33)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Button: Read concept summary as in design.pdf */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0">
          <Link
            href={priorityActionUrl}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#852C08] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer text-center"
          >
            <span>Read concept summary</span>
          </Link>
        </div>
      </div>

      {/* 5-Question AI Performance Intelligence Briefing */}
      {totalAttempted > 0 && (
        <div className="border-t border-slate-100 pt-4 mt-2">
          <button
            type="button"
            onClick={() => setIsBriefingOpen(!isBriefingOpen)}
            className="w-full flex items-center justify-between py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-bold text-slate-900">
                AI Performance Intelligence Briefing (5 Core Answers)
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  commandCenter.answers.q4_isImproving.trajectory === "IMPROVING"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : commandCenter.answers.q4_isImproving.trajectory === "DECLINING"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : commandCenter.answers.q4_isImproving.trajectory === "STABLE"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {commandCenter.answers.q4_isImproving.trajectory === "INSUFFICIENT_EVIDENCE"
                  ? "Calibrating"
                  : commandCenter.answers.q4_isImproving.trajectory}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800">
              <span className="text-[11px] font-medium">{isBriefingOpen ? "Hide Briefing" : "Inspect 5 Core Answers"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isBriefingOpen ? "rotate-180" : ""}`} />
            </div>
          </button>

          {isBriefingOpen && (
            <div className="pt-3 space-y-3.5 animate-in fade-in duration-150">
              {/* Tab Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveBriefingTab("holding_back")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeBriefingTab === "holding_back"
                      ? "bg-rose-50 text-rose-800 border border-rose-200 shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Score Bottlenecks (Q2)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBriefingTab("performing_well")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeBriefingTab === "performing_well"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Strong Areas (Q1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBriefingTab("trajectory")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeBriefingTab === "trajectory"
                      ? "bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Improvement Trajectory (Q4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBriefingTab("session_plan")}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeBriefingTab === "session_plan"
                      ? "bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Next Session Plan (Q5)
                </button>
              </div>

              {/* Tab 1: Holding Back (Q2) */}
              {activeBriefingTab === "holding_back" && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="font-bold text-slate-900">What is holding your score back?</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {commandCenter.answers.q2_holdingMeBack.summary}
                  </p>
                  {commandCenter.answers.q2_holdingMeBack.bottlenecks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {commandCenter.answers.q2_holdingMeBack.bottlenecks.map((b, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="font-bold text-slate-900 truncate">{b.title}</span>
                            <span className="font-mono text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 shrink-0">
                              {b.marksImpact}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2">{b.description}</p>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            Evidence: {b.evidenceQuestionIds.length} question attempts
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}

              {/* Tab 2: Performing Well (Q1) */}
              {activeBriefingTab === "performing_well" && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-900">Where are you currently performing well?</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {commandCenter.answers.q1_performingWell.summary}
                  </p>
                  {commandCenter.answers.q1_performingWell.strongChapters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {commandCenter.answers.q1_performingWell.strongChapters.map((sc, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="font-bold text-slate-900 truncate">{sc.chapter}</span>
                            <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 shrink-0">
                              {sc.accuracyPercentage}% Acc
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                            <span>{sc.subject}</span>
                            <span>{sc.distinctQuestions} distinct Qs</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {commandCenter.answers.q1_performingWell.speedStrengthsCount > 0 && (
                    <p className="text-[11px] font-medium text-slate-500 pt-1">
                      Speed mastery: {commandCenter.answers.q1_performingWell.speedStrengthsCount} questions answered accurately in under 45s.
                    </p>
                  )}
                </div>
              )}

              {/* Tab 3: Trajectory (Q4) */}
              {activeBriefingTab === "trajectory" && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-900">Is your preparation improving?</span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {commandCenter.answers.q4_isImproving.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Trajectory Status</span>
                      <span className="text-xs font-bold text-slate-900 block">
                        {commandCenter.answers.q4_isImproving.trajectory}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Cycle Window</span>
                      <span className="text-xs font-bold text-slate-900 block">
                        Cycle {commandCenter.answers.q4_isImproving.diagnosticCycleStatus.cycleNumber} ({commandCenter.answers.q4_isImproving.diagnosticCycleStatus.questionCount}/150 Qs)
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Resolved Topics</span>
                      <span className="text-xs font-bold text-slate-900 block font-mono">
                        {commandCenter.answers.q4_isImproving.resolvedTopicsCount} chapters
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Next Study Session Plan (Q5) */}
              {activeBriefingTab === "session_plan" && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-900">Recommended Next Study Session</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      {commandCenter.answers.q5_nextSessionPlan.recommendedDurationMinutes} Minutes Total
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {commandCenter.answers.q5_nextSessionPlan.summary}
                  </p>
                  <div className="space-y-2 pt-1">
                    {commandCenter.answers.q5_nextSessionPlan.sessionSteps.map((s, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                            {s.order}
                          </span>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 block truncate">{s.title}</span>
                            <span className="text-[11px] text-slate-500 block truncate">{s.activity}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[10px] text-slate-400">{s.durationMinutes}m</span>
                          <Link
                            href={s.actionUrl}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] transition-colors"
                          >
                            Open
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NextBestActionCard;
