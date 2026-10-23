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
} from "lucide-react";
import { SubjectEligibility, AICoachStoredReport } from "@/types/ai-coach";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "info" | "success";
    text: string;
  } | null>(null);
  const [feedbackState, setFeedbackState] = useState<"up" | "down" | null>(null);

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

  // Handle generation
  const handleGenerateReport = async () => {
    if (!activeSubject || !activeSubject.isUnlocked || dailyLimitReached) return;

    setIsGenerating(true);
    setStatusMessage({
      type: "info",
      text: "Synthesizing empirical telemetry, analyzing error patterns, and formulating your coaching strategy...",
    });

    try {
      const res = await fetch("/api/ai-coach/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: activeSubject.subject }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.report) {
        setActiveReport(data.report);
        setFeedbackState(null);
        setStatusMessage({
          type: "success",
          text: `AI Coach evaluation for ${activeSubject.subject} generated successfully!`,
        });
        refreshStatus();
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Generation failed. Your daily report credit was not used.",
        });
        refreshStatus();
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network connection interrupted. Your daily report credit was not deducted.",
      });
    } finally {
      setIsGenerating(false);
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
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white shadow-xl border border-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>CUET UG Deterministic Diagnostic Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              AI Coach
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Subject-level diagnostic evaluation calibrated every 150 unique questions. Uncover careless speed leaks, concept gaps, and score-accelerating weekly plans.
            </p>
          </div>

          {/* Daily Quota Counter Badge */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-right">
              <div className="text-xs uppercase font-bold tracking-wider text-indigo-200">
                Daily Report Quota
              </div>
              <div className="text-2xl font-black text-white mt-0.5">
                {reportsLeftToday}{" "}
                <span className="text-sm font-semibold text-slate-300">of 3 left today</span>
              </div>
              <div className="text-xs text-indigo-300/80 mt-1 flex items-center gap-1 sm:justify-end">
                <Clock className="w-3 h-3" />
                <span>Resets at midnight IST ({resetTimeFormatted})</span>
              </div>
            </div>

            <Link
              href="/dashboard/reports"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 hover:text-white transition-colors"
            >
              <span>View Saved Reports Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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
            onClick={() => setStatusMessage(null)}
            className="text-xs font-bold hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

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
                    ? "bg-indigo-50/70 border-indigo-600 shadow-md ring-2 ring-indigo-600/20"
                    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-900">{sub.subject}</span>
                  {sub.isUnlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      <Unlock className="w-3 h-3 text-emerald-600" />
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
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        sub.isUnlocked ? "bg-emerald-500" : "bg-indigo-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-500">
                  {sub.isUnlocked
                    ? "Sufficient telemetry to generate comprehensive report"
                    : `${sub.questionsRemaining} more questions needed to unlock`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Generation Action & Current Report View */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>{activeSubject?.subject} Diagnostic Dossier</span>
              {activeSubject?.isUnlocked && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Calibrated
                </span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {activeSubject?.isUnlocked
                ? `150+ unique questions verified. Ready to evaluate accuracy leaks and pacing.`
                : `Attempt ${activeSubject?.questionsRemaining} more unique questions in ${activeSubject?.subject} mocks or PYQs to calibrate.`}
            </p>
          </div>

          <button
            type="button"
            disabled={!activeSubject?.isUnlocked || isGenerating || dailyLimitReached}
            onClick={handleGenerateReport}
            className={`px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              !activeSubject?.isUnlocked || dailyLimitReached
                ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                : isGenerating
                ? "bg-indigo-400 text-white cursor-wait"
                : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg active:scale-98"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Evaluating Telemetry...</span>
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
            {/* Score Snapshot Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-700">
                  Net Score
                </span>
                <div className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
                  {activeReport.stats_json.netScore}{" "}
                  <span className="text-xs font-normal text-indigo-600">
                    / {activeReport.stats_json.potentialScore}
                  </span>
                </div>
                <span className="text-[10px] text-indigo-600/80">CUET +5 / -1 Marking</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-700">
                  Overall Accuracy
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {activeReport.stats_json.overallAccuracyPercentage}%
                </div>
                <span className="text-[10px] text-slate-500">
                  Across {activeReport.questions_analyzed} unique Qs
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                <span className="text-[11px] uppercase tracking-wider font-bold text-rose-700">
                  Negative Marks Lost
                </span>
                <div className="text-xl sm:text-2xl font-black text-rose-950 mt-1">
                  -{activeReport.stats_json.negativeMarksLost}
                </div>
                <span className="text-[10px] text-rose-600/80">Lost to -1 wrong penalties</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                <span className="text-[11px] uppercase tracking-wider font-bold text-blue-700">
                  Avg Pacing
                </span>
                <div className="text-xl sm:text-2xl font-black text-blue-950 mt-1">
                  {activeReport.stats_json.averageTimePerQuestionSeconds}s
                </div>
                <span className="text-[10px] text-blue-600/80">Per question (Target: &lt;60s)</span>
              </div>
            </div>

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

            {/* Biggest Leaks (Issues, Evidence, Fixes) */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Critical Score Leaks</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeReport.report_json.biggest_leaks.map((leak, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-xs space-y-2"
                  >
                    <div className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                      {leak.issue}
                    </div>
                    <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-800">Evidence: </span>
                      {leak.evidence}
                    </div>
                    <div className="text-xs text-indigo-900 bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100">
                      <span className="font-semibold text-indigo-700">Fix: </span>
                      {leak.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                  <span>Exam Pacing & Test Strategy</span>
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
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Personalized 7-Day Score Accelerator Plan</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
                {activeReport.report_json.weekly_plan.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-indigo-600">{item.day}</span>
                      <span className="text-slate-500 text-[10px]">{item.minutes}m</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-800 truncate">
                      {item.focus}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
                      {item.task}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Test Goal & Comparison */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-700">
                  Target Next Mock Goal
                </span>
                <p className="text-xs sm:text-sm font-bold text-indigo-950">
                  {activeReport.report_json.next_test_goal}
                </p>
                <p className="text-xs text-indigo-700/80">
                  {activeReport.report_json.comparison_with_previous}
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
    </div>
  );
}
