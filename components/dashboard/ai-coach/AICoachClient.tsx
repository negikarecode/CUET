"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Lock,
  Unlock,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  ArrowRight,
  Calendar,
  Target,
  ShieldAlert,
  Play,
  Tag,
  BookmarkCheck,
  Info,
} from "lucide-react";
import { SubjectEligibility, AICoachStoredReport, TopicPracticeDelta } from "@/types/ai-coach";
import { loadTopicPracticeDeltas } from "@/lib/ai-coach/practice-deltas";
import { getSpacedRepetitionSummary } from "@/lib/spaced-repetition";
import { SpacedRepetitionModal } from "@/components/dashboard/SpacedRepetitionModal";
import AICoachTopicQuizModal from "./AICoachTopicQuizModal";

interface AICoachClientProps {
  initialSubjects: SubjectEligibility[];
  initialReportsLeftToday: number;
  initialDailyLimitReached: boolean;
  initialNextResetIso: string;
}

export default function AICoachClient({
  initialSubjects,
  initialReportsLeftToday,
  initialDailyLimitReached,
  initialNextResetIso,
}: AICoachClientProps) {
  const [subjects, setSubjects] = useState<SubjectEligibility[]>(initialSubjects);
  const [reportsLeftToday, setReportsLeftToday] = useState(initialReportsLeftToday);
  const [dailyLimitReached, setDailyLimitReached] = useState(initialDailyLimitReached);
  const [nextResetIso, setNextResetIso] = useState(initialNextResetIso);

  const [selectedSubjectName, setSelectedSubjectName] = useState<string>(
    initialSubjects[0]?.subject || "Physics"
  );
  const [activeReport, setActiveReport] = useState<AICoachStoredReport | null>(null);
  // Per-subject loading and error states
  const [loadingBySubject, setLoadingBySubject] = useState<Record<string, boolean>>({});
  const [errorBySubject, setErrorBySubject] = useState<Record<string, string | null>>({});
  const [statusBySubject, setStatusBySubject] = useState<Record<string, {
    type: "error" | "info" | "success";
    text: string;
  } | null>>({});

  const isGenerating = Boolean(loadingBySubject[selectedSubjectName]);
  const statusMessage = statusBySubject[selectedSubjectName] || (errorBySubject[selectedSubjectName] ? {
    type: "error" as const,
    text: errorBySubject[selectedSubjectName]!,
  } : null);
  const [feedbackState, setFeedbackState] = useState<"up" | "down" | null>(null);

  // Topic Practice Quiz & Mistake Notebook State
  const [practiceQuizState, setPracticeQuizState] = useState<{
    isOpen: boolean;
    topic: string;
    baselineAccuracy: number;
  }>({
    isOpen: false,
    topic: "",
    baselineAccuracy: 0,
  });
  const [isMistakeNotebookOpen, setIsMistakeNotebookOpen] = useState(false);
  const [topicDeltas, setTopicDeltas] = useState<TopicPracticeDelta[]>([]);
  const [notebookSummary, setNotebookSummary] = useState<{
    dueTodayCount: number;
    masteredCount: number;
    totalTracked: number;
  }>({ dueTodayCount: 0, masteredCount: 0, totalTracked: 0 });

  const reloadDeltasAndNotebook = React.useCallback(() => {
    try {
      const deltas = loadTopicPracticeDeltas();
      setTopicDeltas(deltas);
      const summary = getSpacedRepetitionSummary("guest");
      setNotebookSummary({
        dueTodayCount: summary.dueTodayCount,
        masteredCount: summary.masteredCount,
        totalTracked: summary.totalTracked,
      });
    } catch (e) {
      console.warn("Failed to load topic deltas or notebook summary:", e);
    }
  }, []);

  useEffect(() => {
    reloadDeltasAndNotebook();
  }, [reloadDeltasAndNotebook, selectedSubjectName]);

  const extractTopicFromLeak = (leak: { topic?: string; issue: string }, defaultSubject: string): string => {
    if (leak.topic && leak.topic.trim()) return leak.topic.trim();
    const match = leak.issue.match(/(?:gap in|topic|in)\s+([A-Za-z0-9\s]+)/i);
    if (match && match[1]) {
      return match[1].trim();
    }
    return defaultSubject;
  };

  const extractTopicFromPlanItem = (
    item: { focus?: string; task?: string },
    defaultSubject: string,
    report: AICoachStoredReport | null
  ): string => {
    const text = `${item.focus || ""} ${item.task || ""}`;
    if (report?.report_json?.biggest_leaks && report.report_json.biggest_leaks.length > 0) {
      for (const leak of report.report_json.biggest_leaks) {
        if (leak.topic && text.toLowerCase().includes(leak.topic.toLowerCase())) {
          return leak.topic;
        }
      }
    }
    if (report?.stats_json?.topicBreakdown) {
      for (const t of report.stats_json.topicBreakdown) {
        if (t.topic && text.toLowerCase().includes(t.topic.toLowerCase())) {
          return t.topic;
        }
      }
    }
    return item.focus || report?.report_json?.biggest_leaks?.[0]?.topic || defaultSubject;
  };

  const getBaselineAccuracyForTopic = (
    report: AICoachStoredReport | null,
    topicName: string
  ): number => {
    if (!report?.stats_json?.topicBreakdown) return 0;
    const match = report.stats_json.topicBreakdown.find(
      (t) =>
        t.topic.toLowerCase().includes(topicName.toLowerCase()) ||
        topicName.toLowerCase().includes(t.topic.toLowerCase())
    );
    return match?.accuracyPercentage ?? 0;
  };

  const handlePracticeTopic = (topicName: string, baselineAcc?: number) => {
    const base =
      baselineAcc !== undefined
        ? baselineAcc
        : getBaselineAccuracyForTopic(activeReport, topicName);
    setPracticeQuizState({
      isOpen: true,
      topic: topicName,
      baselineAccuracy: base,
    });
  };

  const handleQuizCompleted = (delta: TopicPracticeDelta) => {
    reloadDeltasAndNotebook();
    setStatusBySubject((prev) => ({
      ...prev,
      [selectedSubjectName]: {
        type: "success",
        text: `Practice completed for ${delta.topic}! Immediate progress: ${delta.beforeAccuracy}% → ${delta.afterAccuracy}%.`,
      },
    }));
  };

  const activeSubject = subjects.find(
    (s) => s.subject.toLowerCase() === selectedSubjectName.toLowerCase()
  ) || subjects[0];

  // Refresh status from API
  const refreshStatus = async () => {
    try {
      const res = await fetch("/api/ai-coach/status");
      const data = await res.json();
      if (data.success) {
        setSubjects(data.subjects);
        setReportsLeftToday(data.reportsLeftToday);
        setDailyLimitReached(data.dailyLimitReached);
        setNextResetIso(data.nextResetIso);
      }
    } catch (err) {
      console.warn("Failed to refresh AI Coach status:", err);
    }
  };

  // Fetch most recent report for selected subject if available
  useEffect(() => {
    let isCancelled = false;
    const fetchLatestReport = async () => {
      try {
        const res = await fetch(
          `/api/ai-coach/reports?subject=${encodeURIComponent(selectedSubjectName)}`
        );
        const data = await res.json();
        if (!isCancelled && data.success && Array.isArray(data.reports) && data.reports.length > 0) {
          setActiveReport(data.reports[0]);
          setFeedbackState(data.reports[0].feedback || null);
        } else if (!isCancelled) {
          setActiveReport(null);
          setFeedbackState(null);
        }
      } catch {
        if (!isCancelled) setActiveReport(null);
      }
    };

    fetchLatestReport();
    return () => {
      isCancelled = true;
    };
  }, [selectedSubjectName]);

  // Handle generation (per-subject loading and error states)
  const handleGenerateReport = async (targetSubject?: string) => {
    const subToGen = targetSubject || selectedSubjectName;
    const targetSubObj =
      subjects.find((s) => s.subject.toLowerCase() === subToGen.toLowerCase()) || activeSubject;

    if (!targetSubObj || !targetSubObj.isUnlocked || dailyLimitReached) return;

    setLoadingBySubject((prev) => ({ ...prev, [subToGen]: true }));
    setErrorBySubject((prev) => ({ ...prev, [subToGen]: null }));
    setStatusBySubject((prev) => ({
      ...prev,
      [subToGen]: {
        type: "info",
        text: `Analyzing your practice data in ${subToGen}, identifying error patterns, and preparing your report...`,
      },
    }));

    try {
      const res = await fetch("/api/ai-coach/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: targetSubObj.subject }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.report) {
        if (subToGen.toLowerCase() === selectedSubjectName.toLowerCase()) {
          setActiveReport(data.report);
          setFeedbackState(null);
        }
        if (data.isFallback) {
          setStatusBySubject((prev) => ({
            ...prev,
            [subToGen]: {
              type: "info",
              text: "Groq call failed after 3 retries. Showing computed stats, Topics to Fix, and rule-based 7-day plan.",
            },
          }));
        } else {
          setStatusBySubject((prev) => ({
            ...prev,
            [subToGen]: {
              type: "success",
              text: `AI Coach evaluation for ${targetSubObj.subject} generated successfully!`,
            },
          }));
        }
        refreshStatus();
      } else {
        const errMsg = data.error || "Generation failed. Your daily report credit was not used.";
        setErrorBySubject((prev) => ({ ...prev, [subToGen]: errMsg }));
        setStatusBySubject((prev) => ({
          ...prev,
          [subToGen]: {
            type: "error",
            text: errMsg,
          },
        }));
        refreshStatus();
      }
    } catch {
      const netErr = "Network connection interrupted. Your daily report credit was not deducted.";
      setErrorBySubject((prev) => ({ ...prev, [subToGen]: netErr }));
      setStatusBySubject((prev) => ({
        ...prev,
        [subToGen]: {
          type: "error",
          text: netErr,
        },
      }));
    } finally {
      setLoadingBySubject((prev) => ({ ...prev, [subToGen]: false }));
    }
  };

  // Handle Feedback
  const handleFeedback = async (vote: "up" | "down") => {
    if (!activeReport) return;
    const nextVote = feedbackState === vote ? null : vote;
    setFeedbackState(nextVote);

    try {
      await fetch("/api/ai-coach/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: activeReport.id, feedback: nextVote }),
      });
    } catch (err) {
      console.warn("Failed to save feedback:", err);
    }
  };

  // Calculate midnight reset display time
  const resetTimeFormatted = (() => {
    try {
      return new Date(nextResetIso).toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Midnight IST";
    }
  })();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Banner matching design.pdf Page 4 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#441408] text-white shadow-xl border border-[#5A1D0D] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF1E0] text-[#9F3014] text-xs font-semibold border border-[#F6D3AF]">
              <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Calibrated every 150 questions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              AI Coach
            </h1>
            <p className="text-sm sm:text-base text-[#F5EBE1] max-w-2xl leading-relaxed">
              Subject-level diagnostic evaluation calibrated every 150 unique questions. Uncover careless errors, concept gaps, second-guessing patterns, and score-accelerating weekly plans.
            </p>
            <p className="text-xs text-[#FCE7D0]/90 font-medium pt-1">
              Your name, phone and email are never sent to the AI
            </p>
          </div>

          {/* Daily Quota Counter Badge */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-right">
              <div className="text-xs uppercase font-bold tracking-wider text-[#FCE7D0]">
                Daily Report Quota
              </div>
              <div className="text-2xl font-black text-white mt-0.5">
                {reportsLeftToday}{" "}
                <span className="text-sm font-semibold text-[#F5EBE1]">of 3 left today</span>
              </div>
              <div className="text-xs text-[#FCE7D0]/80 mt-1 flex items-center gap-1 sm:justify-end">
                <Clock className="w-3 h-3" />
                <span>Resets at midnight IST ({resetTimeFormatted})</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMistakeNotebookOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5EBE1] border border-white/20 text-xs font-bold transition-all cursor-pointer"
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-[#FCE7D0]" />
                <span>Mistake Notebook ({notebookSummary.dueTodayCount} Due)</span>
              </button>

              <Link
                href="/dashboard/reports"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FCE7D0] hover:text-white transition-colors"
              >
                <span>View Saved Reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Status message alert */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
            statusMessage.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === "error" ? (
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
            ) : statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            ) : (
              <RefreshCw className="w-5 h-5 shrink-0 text-blue-600 animate-spin" />
            )}
            <p className="text-xs sm:text-sm font-medium">{statusMessage.text}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatusBySubject((prev) => ({ ...prev, [selectedSubjectName]: null }));
              setErrorBySubject((prev) => ({ ...prev, [selectedSubjectName]: null }));
            }}
            className="text-xs font-bold hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 3. "Do this today" single action (taken from latest report's top leak) */}
      {(() => {
        const topLeak = activeReport?.report_json?.biggest_leaks?.[0];
        if (!topLeak) return null;
        const topLeakTopic = extractTopicFromLeak(topLeak, selectedSubjectName);
        return (
          <div className="p-6 rounded-3xl bg-[#FEF1E0] border border-[#F6D3AF] text-stone-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
            <div className="space-y-1.5 flex-1 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FCE7D0] text-[#9F3014] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-[#F6D3AF]">
                  <Sparkles className="w-3 h-3 text-[#C2410C]" />
                  Do This Today · {selectedSubjectName}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                {topLeak.issue}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-2xl">
                {topLeak.evidence}
              </p>
              {topLeak.likelyConfusion && (
                <p className="text-xs text-[#9F3014] font-medium pt-0.5">
                  <span className="font-bold">Likely Concept Confusion: </span>
                  {topLeak.likelyConfusion}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handlePracticeTopic(topLeakTopic)}
              className="px-5 py-3 rounded-2xl bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#852C08] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start 10-question fix</span>
            </button>
          </div>
        );
      })()}

      {/* 4. Immediate Topic Practice Progress (Separate from 150-question report gate) */}
      {topicDeltas && topicDeltas.length > 0 && (() => {
        const firstDelta = topicDeltas[0];
        if (!firstDelta) return null;
        return (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Immediate Topic Progress
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  Separate from 150-Question Calibration Gate
                </span>
              </div>
              <div className="text-base font-bold text-slate-900">
                {firstDelta.topic}: {firstDelta.beforeAccuracy}% → {firstDelta.afterAccuracy}%
                <span className="ml-2 text-xs font-semibold text-emerald-700">
                  ({firstDelta.afterAccuracy >= firstDelta.beforeAccuracy ? "+" : ""}
                  {firstDelta.afterAccuracy - firstDelta.beforeAccuracy}% change across {firstDelta.attemptsCount} practice questions)
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Recorded on {new Date(firstDelta.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}. Keep practicing flagged topics to eliminate marks lost to wrong answers!
              </p>
            </div>

            <button
              type="button"
              onClick={() => handlePracticeTopic(firstDelta.topic, firstDelta.afterAccuracy)}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Practice {firstDelta.topic} (10 Qs)</span>
            </button>
          </div>
        );
      })()}

      {/* 3. Subject Eligibility Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Subject Calibration & Eligibility
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Requires 150 unique questions attempted since last report
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((sub) => {
            const isSelected = sub.subject.toLowerCase() === selectedSubjectName.toLowerCase();
            const percentage = Math.min(100, Math.round((sub.freshQuestionsCount / 150) * 100));

            return (
              <div
                key={sub.subject}
                onClick={() => setSelectedSubjectName(sub.subject)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                  isSelected
                    ? "bg-[#FFF5EA] border-[#C2410C] shadow-xs ring-2 ring-[#C2410C]/20"
                    : "bg-white border-[#EFE6DC] hover:border-[#F6D3AF] shadow-xs hover:shadow"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-900">{sub.subject}</span>
                  {sub.isUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF] text-[11px] font-bold">
                      <Unlock className="w-3 h-3 text-[#C2410C]" />
                      Ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                      <Lock className="w-3 h-3 text-slate-400" />
                      Locked
                    </span>
                  )}
                </div>

                {/* Progress Ring / Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {sub.freshQuestionsCount} / 150 Qs
                    </span>
                    <span className="text-slate-500 font-medium">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#FEF1E0] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        sub.isUnlocked ? "bg-[#C2410C]" : "bg-[#C2410C]"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-500">
                  {sub.lastReportId
                    ? `Next report unlocks after 150 new questions (${sub.freshQuestionsCount}/150)`
                    : sub.isUnlocked
                    ? "Ready to generate first report (150/150)"
                    : `${sub.questionsRemaining} more questions needed to unlock`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Generation Action & Current Report View */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE6DC] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE6DC]">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>{activeSubject?.subject} Diagnostic Dossier</span>
              {activeSubject?.isUnlocked && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF] text-xs font-bold">
                  Calibrated
                </span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {activeReport || activeSubject?.lastReportId
                ? activeSubject?.isUnlocked
                  ? "150 new questions completed! You can now generate your next report."
                  : `Next report unlocks after 150 new questions (${activeSubject?.freshQuestionsCount || 0}/150)`
                : activeSubject?.isUnlocked
                ? "150 unique questions verified. Ready to evaluate accuracy leaks and error patterns."
                : `Attempt ${activeSubject?.questionsRemaining} more unique questions in ${activeSubject?.subject} mocks or PYQs to calibrate.`}
            </p>
          </div>

          <button
            type="button"
            disabled={!activeSubject?.isUnlocked || isGenerating || dailyLimitReached}
            onClick={() => handleGenerateReport(selectedSubjectName)}
            className={`px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              !activeSubject?.isUnlocked || dailyLimitReached
                ? "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none"
                : isGenerating
                ? "bg-[#C2410C]/70 text-white cursor-wait"
                : "bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#852C08] text-white hover:shadow-lg active:scale-98"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Preparing your report...</span>
              </>
            ) : dailyLimitReached ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Daily Limit (3/3) Reached</span>
              </>
            ) : !activeSubject?.isUnlocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Locked ({activeSubject?.questionsRemaining} Qs left)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate AI Coach Report</span>
              </>
            )}
          </button>
        </div>

        {/* Report Display */}
        {activeReport ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Next report status indicator */}
            <div className="p-3.5 rounded-2xl bg-[#FEF1E0] border border-[#F6D3AF] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9F3014]">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C2410C] shrink-0" />
                Next report unlocks after 150 new questions ({activeSubject?.freshQuestionsCount || 0}/150)
              </span>
              <span className="text-stone-700 font-medium">
                {activeSubject?.isUnlocked
                  ? "150 new questions completed — ready to generate next report!"
                  : `${activeSubject?.questionsRemaining || 0} questions remaining until next unlock`}
              </span>
            </div>

            {/* Fallback Mode Banner */}
            {(activeReport.is_fallback || activeReport.model === "rule-based-fallback") && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Rule-Based Fallback Mode
                    </span>
                  </div>
                  <p className="text-xs text-amber-700">
                    AI service was temporarily unavailable after 3 retries. Computed stats, Topics to Fix, and rule-based 7-day plan are displayed below. Your daily report credit was not used.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => handleGenerateReport(selectedSubjectName)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
                  <span>{isGenerating ? "Retrying..." : "Refresh AI narrative"}</span>
                </button>
              </div>
            )}

            {/* Random Answering Flag */}
            {(activeReport.report_json?.random_answering_note || activeReport.stats_json?.hasRandomAnswering) && (
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300/80 text-amber-950 flex items-center gap-2.5 shadow-2xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold">
                  This looks like random answering, so the advice may be less accurate.
                </span>
              </div>
            )}

            {/* Score Snapshot Grid matching design.pdf Page 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[#FEF1E0] border border-[#F6D3AF]">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#9F3014]">
                  Net Score
                </span>
                <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  {activeReport.stats_json.netScore}{" "}
                  <span className="text-xs font-normal text-stone-600">
                    / {activeReport.stats_json.potentialScore}
                  </span>
                </div>
                <span className="text-[10px] text-stone-600">CUET +5 / -1 Marking</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FEF1E0] border border-[#F6D3AF]">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#9F3014]">
                  Overall Accuracy
                </span>
                <div className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  {activeReport.stats_json.overallAccuracyPercentage}%
                </div>
                <span className="text-[10px] text-stone-600">
                  Across {activeReport.questions_analyzed} unique Qs
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FEF1E0] border border-[#F6D3AF]">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#9F3014]">
                  Marks lost to wrong answers
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#C2410C] mt-1">
                  -{activeReport.stats_json.negativeMarksLost}
                </div>
                <span className="text-[10px] text-stone-600">Lost to negative marking</span>
              </div>
            </div>

            {/* Tagged Mistake Patterns Card */}
            {activeReport.stats_json.mistakeTags && (
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Student-Tagged Mistake Categories</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Didn&apos;t know concept</span>
                    <span className="text-lg font-bold text-slate-900">{activeReport.stats_json.mistakeTags.didntKnowConcept}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Misread question</span>
                    <span className="text-lg font-bold text-slate-900">{activeReport.stats_json.mistakeTags.misread}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Guessed answer</span>
                    <span className="text-lg font-bold text-slate-900">{activeReport.stats_json.mistakeTags.guessed}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">Changed answer</span>
                    <span className="text-lg font-bold text-slate-900">{activeReport.stats_json.mistakeTags.changedAnswer}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Diagnostic Summary */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Coach Diagnostic Brief</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activeReport.report_json.summary}
              </p>
            </div>

            {/* Biggest Leaks (Issues, Evidence, Fixes & Practice button) */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#C2410C]" />
                <span>Critical Score Leaks</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeReport.report_json.biggest_leaks.map((leak, idx) => {
                  const leakTopic = extractTopicFromLeak(leak, selectedSubjectName);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-[#F6D3AF] shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-[#C2410C] uppercase tracking-wide">
                          {leak.issue}
                        </div>
                        <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="font-semibold text-slate-800">Evidence: </span>
                          {leak.evidence}
                        </div>
                        {leak.likelyConfusion && (
                          <div className="text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                            <span className="font-semibold text-amber-800">Likely Concept Confusion: </span>
                            {leak.likelyConfusion}
                          </div>
                        )}
                        <div className="text-xs text-indigo-900 bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100">
                          <span className="font-semibold text-indigo-700">Fix: </span>
                          {leak.fix}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePracticeTopic(leakTopic)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start 10-question fix</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Topics to Fix & Insufficient Data Breakdown */}
            {(() => {
              const breakdown = activeReport.stats_json.topicBreakdown || [];
              const weakTopics = breakdown
                .filter((t) => (t.attempted ?? 0) >= 5 && (t.accuracyPercentage ?? 0) < 65)
                .slice(0, 6);
              const insufficientTopics = activeReport.stats_json.insufficient_data_topics || [];

              if (weakTopics.length === 0 && insufficientTopics.length === 0) return null;

              return (
                <div className="space-y-4">
                  {weakTopics.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white border border-[#EFE6DC] shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                          <Target className="w-4 h-4 text-rose-600" />
                          <span>Topics to Fix</span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          Topics with &ge;5 attempts needing improvement
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {weakTopics.map((top, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-[#FFF8F0] border border-[#EFE6DC] flex flex-col justify-between gap-2.5"
                          >
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                                {top.topic}
                              </div>
                              <div className="flex items-center justify-between text-[11px] text-slate-600">
                                <span>{top.attempted} attempts</span>
                                <span className={`font-bold ${top.accuracyPercentage < 50 ? "text-rose-600" : "text-amber-600"}`}>
                                  {top.accuracyPercentage}% accuracy
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handlePracticeTopic(top.topic, top.accuracyPercentage)}
                              className="w-full py-1.5 px-2 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>Start 10-question fix</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {insufficientTopics.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
                        <Info className="w-3.5 h-3.5 text-slate-500" />
                        <span>Topics needing more data (&lt; 5 attempts)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {insufficientTopics.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-medium inline-flex items-center gap-1.5"
                          >
                            <span>{t.topic}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({t.attempted} {t.attempted === 1 ? "attempt" : "attempts"})
                            </span>
                            <span className="text-[11px] font-semibold text-amber-700">
                              needs more data
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Strengths & Test Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Strengths</span>
                </div>
                <ul className="space-y-2">
                  {activeReport.report_json.strengths.map((st, idx) => (
                    <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-3">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Test-Taking Strategy</span>
                </div>
                <ul className="space-y-2">
                  {activeReport.report_json.test_taking_strategy.map((st, idx) => (
                    <li key={idx} className="text-xs text-blue-950 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7-Day Action Plan */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C2410C]" />
                <span>Personalized 7-Day Score Accelerator Plan</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
                {activeReport.report_json.weekly_plan.map((item, idx) => {
                  const planTopic = extractTopicFromPlanItem(item, selectedSubjectName, activeReport);
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-[#C2410C]">{item.day}</span>
                          <span className="text-slate-500 text-[10px]">{item.minutes}m</span>
                        </div>
                        <div className="text-[11px] font-bold text-slate-800">
                          {item.focus}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {item.task}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePracticeTopic(planTopic)}
                        className="w-full mt-1.5 py-1.5 px-2 rounded-lg bg-[#FEF1E0] hover:bg-[#FCE7D0] text-[#9F3014] text-[11px] font-bold flex items-center justify-center gap-1 transition-colors border border-[#F6D3AF] cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-[#C2410C]" />
                        <span>Start 10-question fix</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target for your next mock card matching design.pdf Page 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FEF1E0] border border-[#F6D3AF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#9F3014]">
                  Target for your next mock · {selectedSubjectName}
                </span>
                <p className="text-xs sm:text-sm font-bold text-stone-900">
                  {activeReport.report_json.next_test_goal}
                </p>
                <p className="text-xs text-stone-600">
                  {!activeReport.report_json.comparison_with_previous ||
                  activeReport.report_json.comparison_with_previous.toLowerCase().includes("no previous")
                    ? "First report: this is your baseline"
                    : activeReport.report_json.comparison_with_previous}
                </p>
              </div>

              {/* Thumbs Up / Down */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className="text-xs text-slate-500 font-medium">Was this helpful?</span>
                <button
                  type="button"
                  onClick={() => handleFeedback("up")}
                  className={`p-2 rounded-xl border transition-colors ${
                    feedbackState === "up"
                      ? "bg-emerald-500 text-white border-emerald-600"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                  aria-label="Thumbs up"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFeedback("down")}
                  className={`p-2 rounded-xl border transition-colors ${
                    feedbackState === "down"
                      ? "bg-rose-500 text-white border-rose-600"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                  aria-label="Thumbs down"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
              Disclaimer: This performance analysis provides AI-powered guidance and study suggestions based on recorded test telemetry; it does not constitute a guarantee of actual examination results.
            </div>
          </div>
        ) : (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800">
              No Report Generated Yet for {activeSubject?.subject}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {activeSubject?.isUnlocked
                ? `You have reached the 150-question calibration gate! Click 'Generate AI Coach Report' above to unlock your personalized diagnostic review.`
                : `Complete ${activeSubject?.questionsRemaining} more questions in domain mocks or PYQs to unlock your first report.`}
            </p>
          </div>
        )}
      </div>

      {/* 10-Question Targeted Practice Quiz Modal */}
      <AICoachTopicQuizModal
        isOpen={practiceQuizState.isOpen}
        onClose={() => setPracticeQuizState((prev) => ({ ...prev, isOpen: false }))}
        subject={selectedSubjectName}
        topic={practiceQuizState.topic}
        userId="guest"
        baselineAccuracy={practiceQuizState.baselineAccuracy}
        onQuizCompleted={handleQuizCompleted}
      />

      {/* Spaced Repetition Mistake Notebook Modal */}
      <SpacedRepetitionModal
        isOpen={isMistakeNotebookOpen}
        onClose={() => {
          setIsMistakeNotebookOpen(false);
          reloadDeltasAndNotebook();
        }}
        userId="guest"
      />
    </div>
  );
}
