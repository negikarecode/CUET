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
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs transition-all hover:shadow-sm">
        {/* Subtle accent highlight line on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Initial Diagnostic Calibration
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500">
                Cycle 1
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                Complete your first diagnostic test
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Take an official 50-question mock or PYQ shift paper to calibrate your score, detect question traps, and unlock your AI weakness diagnosis.
              </p>
            </div>

            {/* Diagnostic Unlock Progress Tracker */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-700">Diagnostic unlocks at 150 questions</span>
                <span className="tabular-nums font-semibold text-slate-900">
                  0 of 150 questions
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: "0%" }}
                />
              </div>
              <p className="text-[12px] text-slate-500">
                150 qualifying questions needed to unlock full multi-subject radar & error taxonomy.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm cursor-pointer text-center"
            >
              <span>Start diagnostic test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const topic: TopicMastery = prioritizedTopic;
  const confidence = getTopicConfidence(topic.attemptsCount || 0);
  const plainDiagnosis = formatPlainLanguageDiagnosis({
    primaryDiagnosis: topic.fullDiagnosis?.primaryDiagnosis,
    contributingFactor: topic.fullDiagnosis?.contributingFactor,
    avgTimeSeconds: topic.avgTimeSeconds,
    accuracyPercentage: topic.accuracyPercentage,
  });

  const subjectKey = normalizeSubject(topic.subject).key;
  const priorityTask = commandCenter.answers.q3_workOnNext.priorityTask;
  const topicTitle = priorityTask?.chapter || topic.chapter || topic.microTopic || "Domain Knowledge Practice";
  const reasonText = priorityTask?.reason || plainDiagnosis.humanSentence || "Lowest accuracy in recent domain tests.";
  const priorityActionUrl = priorityTask?.actionUrl || `/dashboard/radar?subject=${subjectKey}`;
  const priorityActionLabel = priorityTask?.actionLabel || "Start focused practice";

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs transition-all hover:shadow-sm">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3.5 max-w-2xl">
          {/* Header metadata row */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Your Next Best Action
            </span>

            <span className="text-slate-300">•</span>

            <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {topic.subject}
            </span>

            {!confidence.isReliable ? (
              <span className="inline-flex items-center gap-1 font-medium text-amber-700 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                Preliminary signal ({topic.attemptsCount || 0} attempts)
              </span>
            ) : (
              <span className="font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                High confidence ({topic.attemptsCount || 0} attempts)
              </span>
            )}
          </div>

          {/* Recommended topic and explanation */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Strengthen {topicTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-normal">
              Target this priority concept to recover lost marks and prevent trap errors in upcoming tests.
            </p>
          </div>

          {/* "Why this matters" callout box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs sm:text-sm text-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span>Why this matters:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {reasonText}
            </p>
            {topic.accuracyPercentage !== undefined && (
              <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 tabular-nums">
                <span>Accuracy: <strong className="text-slate-900">{topic.accuracyPercentage}%</strong></span>
                <span>•</span>
                <span>Attempted: <strong className="text-slate-900">{topic.attemptsCount || 0}</strong> questions</span>
                {topic.avgTimeSeconds ? (
                  <>
                    <span>•</span>
                    <span>Avg speed: <strong className="text-slate-900">{topic.avgTimeSeconds}s</strong>/q</span>
                  </>
                ) : null}
              </div>
            )}
          </div>

          {/* Diagnostic Cycle Progress */}
          <div className="pt-1 max-w-md space-y-1.5">
            {!isUnlocked ? (
              /* LOCKED STATE (<150 questions) */
              <>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700">Diagnostic unlocks at 150 questions</span>
                  <span className="tabular-nums font-semibold text-slate-900">
                    {diagnostic.progressText}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(4, diagnostic.unlockProgressPercentage)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {diagnostic.questionsToUnlock} qualifying questions remaining to unlock cycle analysis.
                </p>
              </>
            ) : (
              /* UNLOCKED STATE (>=150 questions) */
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cycle {diagnostic.currentCycleNumber} Active</span>
                  </span>
                  <span className="tabular-nums font-semibold text-slate-900">
                    {diagnostic.progressText}
                  </span>
                </div>
                {diagnostic.currentCycleQuestionCount > 0 ? (
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(4, diagnostic.activeCycleProgressPercentage)}%` }}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>

        {/* Clear Action Hierarchy: 1 prominent primary button + 1 subtle secondary link */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0 self-stretch sm:self-auto lg:self-center">
          <Link
            href={priorityActionUrl}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer text-center"
          >
            <span>{priorityActionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {isUnlocked && (
            <Link
              href="/dashboard/radar"
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer text-center"
            >
              View diagnosis report
            </Link>
          )}
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
