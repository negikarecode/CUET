"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  AlertTriangle,
  Zap,
  BookOpen,
  Hourglass,
  CheckCircle2,
  X,
  RotateCcw,
  ArrowRight,
  Target,
  Brain,
  Layers,
  BarChart3,
  FileText,
  Compass,
  ShieldAlert,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { DiagnosticResponseData } from "@/app/api/ai/diagnose/route";
import { RepairQuizResponse } from "@/app/api/ai/repair-quiz/route";
import UpgradeButton from "@/components/payments/UpgradeButton";
import MathRenderer from "./MathRenderer";

interface DiagnosticReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  testId: string;
}

export default function DiagnosticReportModal({
  isOpen,
  onClose,
  testId,
}: DiagnosticReportModalProps) {
  const user = useTestStore((state) => state.user);
  const questions = useCBTStore((state) => state.questions);
  const answers = useCBTStore((state) => state.answers);
  const initTest = useCBTStore((state) => state.initTest);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DiagnosticResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [launchingQuiz, setLaunchingQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<"decrypter" | "breakdown" | "report">("decrypter");

  // Fetch AI Diagnosis when modal opens
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setIsRateLimited(false);

    const attemptsPayload = questions.map((q) => {
      const ans = answers[q.id];
      return {
        questionId: q.id,
        selectedOption: ans?.selectedOption ?? null,
        timeSpentSeconds: ans?.timeSpentSeconds ?? 0,
      };
    });

    fetch("/api/ai/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testId,
        userId: user?.id,
        attempts: attemptsPayload,
      }),
    })
      .then(async (res) => {
        if (res.status === 429) {
          const errData = await res.json().catch(() => ({}));
          if (isMounted) {
            setIsRateLimited(true);
            setError(errData.error || "Daily AI analysis limit reached. Upgrade to unlock more.");
            setLoading(false);
          }
          return null;
        }
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((resData: DiagnosticResponseData | null) => {
        if (isMounted && resData) {
          setData(resData);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Diagnosis fetch error:", err);
          setError("Failed to generate AI diagnosis. Please try again.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, testId, questions, answers, user?.id]);

  if (!isOpen) return null;

  // Handle immediate launch of 5-question AI Repair Quiz
  const handleLaunchRepairQuiz = async (topic: string) => {
    setLaunchingQuiz(true);
    try {
      const res = await fetch("/api/ai/repair-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          weakMicroTopics: [topic],
          subject: data?.primary_weak_topics[0] ?? "Remedial Concept Polish",
        }),
      });

      if (!res.ok) throw new Error("Failed to generate repair quiz");

      const quizData = (await res.json()) as RepairQuizResponse;

      // Initialize the CBT store with the 5-question repair quiz
      initTest(
        quizData.testId,
        {
          id: quizData.testId,
          title: quizData.title,
          subject: quizData.subject,
          code: quizData.code,
          totalQuestions: 5,
          durationMinutes: 8,
        },
        quizData.questions
      );

      // Close modal to let student solve the repair quiz immediately in CBT Player
      onClose();
    } catch (err) {
      console.error("Error launching repair quiz:", err);
      alert("Unable to generate repair quiz. Please try again.");
    } finally {
      setLaunchingQuiz(false);
    }
  };

  const primaryWeakTopic = data?.primary_weak_topics[0] || "Targeted NCERT Weak Spot";
  const readiness = data?.structured_report?.readiness;
  const whyLosingMarks = data?.structured_report?.why_losing_marks || [];
  const nextActions = data?.structured_report?.next_actions;

  const getErrorBadgeStyle = (errorType?: string) => {
    switch (errorType) {
      case "Calculation Error":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Misreading Error":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Careless Error":
        return "bg-sky-50 text-sky-800 border-sky-200";
      case "Concept Confusion":
      case "Option Confusion":
        return "bg-orange-50 text-orange-800 border-orange-200";
      case "Application Error":
        return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "Time Pressure Error":
        return "bg-pink-50 text-pink-800 border-pink-200";
      case "Conceptual Gap":
      default:
        return "bg-rose-50 text-rose-800 border-rose-200";
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-50/80 text-slate-900 p-6 border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  CUET AI Performance Intelligence Engine
                </h3>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase shadow-xs">
                  Master Engine
                </span>
                {readiness && (
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border uppercase shadow-xs ${
                      readiness.level === "Very Strong"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : readiness.level === "Strong"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : readiness.level === "Moderate"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    Readiness: {readiness.level}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Multi-dimensional post-mortem analyzing cognitive error types, NCERT anchors, and net mark recovery.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-xs transition-all"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Navigation Tabs */}
        {data && !loading && (
          <div className="bg-white border-b border-slate-200 px-6 pt-2 flex items-center gap-2 overflow-x-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("decrypter")}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 border-b-2 ${
                activeTab === "decrypter"
                  ? "bg-blue-50/60 text-blue-700 border-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>NCERT Error Decrypter ({data.mistake_analyses.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("breakdown")}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 border-b-2 ${
                activeTab === "breakdown"
                  ? "bg-blue-50/60 text-blue-700 border-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Loss Breakdown & Next Actions</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("report")}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 border-b-2 ${
                activeTab === "report"
                  ? "bg-blue-50/60 text-blue-700 border-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Executive Intelligence Report</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/60">
          {/* Loading State */}
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Executing CUET AI Performance Intelligence scan...
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Classifying errors (A–L), cross-referencing NCERT chapters, and formulating 7-point recovery strategy.
                </p>
              </div>
            </div>
          )}

          {/* Error State or Rate Limit State */}
          {error && !loading && (
            isRateLimited ? (
              <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-4 shadow-xs animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                  <Zap className="w-7 h-7 fill-amber-500 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                    Daily AI Analysis Limit Reached
                  </h4>
                  <p className="text-xs text-slate-600 font-medium mt-1 max-w-md mx-auto leading-relaxed">
                    Free tier candidates are allocated 3 AI diagnostic scans per day. Upgrade to the <strong>Ranker Pass</strong> to unlock 25 runs/day, instant NCERT decrypters, and adaptive repair drills.
                  </p>
                </div>
                <div className="flex justify-center pt-2">
                  <UpgradeButton
                    planId="ai_practice_pass_499"
                    variant="amber"
                    buttonText="Upgrade to AI Practice Pass (₹499)"
                  />
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-rose-50/80 border border-rose-200 text-center space-y-3 shadow-xs">
                <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto stroke-[2]" />
                <p className="text-sm font-bold text-slate-900">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50"
                >
                  Retry Diagnosis
                </button>
              </div>
            )
          )}

          {/* Diagnosis Content */}
          {data && !loading && (
            <>
              {/* Executive Summary Card (always visible above tabs) */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span>Executive Intelligence Summary</span>
                  </div>
                  {readiness && (
                    <span className="text-[11px] font-mono font-medium text-slate-500">
                      Confidence: {readiness.confidence}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {data.overall_summary}
                </p>

                {/* Primary Weak Topics Badges */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-800">
                    High-Priority Weakness Targets:
                  </span>
                  {data.primary_weak_topics.map((topic, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs font-semibold shadow-xs"
                    >
                      <Target className="w-3 h-3 text-rose-600" />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* TAB 1: NCERT Error Decrypter */}
              {activeTab === "decrypter" && (
                <>
                  {/* Pacing Bottlenecks & Alerts */}
                  {data.time_sink_alerts.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <Hourglass className="w-4 h-4 text-amber-500 stroke-[2]" />
                        <span>Pacing Bottlenecks Detected ({data.time_sink_alerts.length})</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.time_sink_alerts.map((alert, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs flex items-start gap-2.5 shadow-xs"
                          >
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 stroke-[2]" />
                            <div>
                              <span className="font-bold text-slate-900">
                                Pacing Alert (Q{alert.question_number}):
                              </span>
                              <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">
                                {alert.message}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Mistake Decrypter Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span>NCERT Concept Decrypter ({data.mistake_analyses.length} Errors Analyzed)</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        12-Factor Error Classification
                      </span>
                    </div>

                    <div className="space-y-4">
                      {data.mistake_analyses.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center font-mono border border-rose-200 shadow-xs">
                                #{idx + 1}
                              </span>
                              <div className="text-xs font-bold text-slate-900">
                                <MathRenderer text={item.micro_topic} inline />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.error_classification && (
                                <span
                                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shadow-xs ${getErrorBadgeStyle(
                                    item.error_classification
                                  )}`}
                                >
                                  {item.error_classification}
                                </span>
                              )}
                              {item.confidence && (
                                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                                  {item.confidence} Confidence
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Distractor Trap Callout */}
                          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs">
                            <span className="font-bold text-rose-900 flex items-center gap-1.5 mb-1">
                              <Zap className="w-3.5 h-3.5 text-rose-600 stroke-[2]" />
                              Why You Picked the Trap Option:
                            </span>
                            <div className="text-slate-700 font-normal leading-relaxed">
                              <MathRenderer text={item.distractor_trap} />
                            </div>
                          </div>

                          {/* Exact NCERT Rules in bullet points */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                            <span className="font-bold text-slate-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                              Exact NCERT Concept Rule:
                            </span>
                            <ul className="list-disc list-inside text-slate-700 font-medium space-y-1 pl-1">
                              {item.ncert_rule.map((rule, rIdx) => (
                                <li key={rIdx} className="leading-relaxed">
                                  <MathRenderer text={rule} inline />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: Loss Breakdown & Next Actions */}
              {activeTab === "breakdown" && (
                <div className="space-y-6">
                  {/* "Why Am I Losing Marks?" Section */}
                  {whyLosingMarks.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>Why Am I Losing Marks? (Cognitive Breakdown)</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        Your lost marks are classified across cognitive error patterns rather than generic lack of effort:
                      </p>

                      <div className="space-y-3">
                        {whyLosingMarks.map((cause, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                              <span>{cause.cause}</span>
                              <span className="font-mono text-rose-600">{cause.percentage}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-200/60 overflow-hidden shadow-xs">
                              <div
                                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all"
                                style={{ width: `${Math.max(5, cause.percentage)}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium">{cause.evidence}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 7-Point Next Actions Plan */}
                  {nextActions && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                        <Compass className="w-4 h-4 text-blue-600" />
                        <span>What Should I Do Next? (7-Point Action Plan)</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 shadow-xs">
                          <span className="font-bold text-slate-900">1. Biggest Strength</span>
                          <p className="text-slate-600 font-medium mt-1">{nextActions.biggest_strength}</p>
                        </div>
                        <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 shadow-xs">
                          <span className="font-bold text-rose-900">2. Biggest Weakness</span>
                          <p className="text-slate-700 font-medium mt-1">{nextActions.biggest_weakness}</p>
                        </div>
                        <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200 shadow-xs">
                          <span className="font-bold text-amber-900">3. Recurring Trap</span>
                          <p className="text-slate-700 font-medium mt-1">{nextActions.biggest_recurring_mistake}</p>
                        </div>
                        <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 shadow-xs">
                          <span className="font-bold text-blue-900">4. Highest-Impact Focus</span>
                          <p className="text-slate-700 font-medium mt-1">{nextActions.highest_impact_topic}</p>
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 text-xs space-y-2 shadow-xs">
                        <span className="font-bold text-slate-900">5. Recommended NCERT Revision:</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium pl-1">
                          {nextActions.recommended_revision.map((rev, rIdx) => (
                            <li key={rIdx}>{rev}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 text-xs space-y-2 shadow-xs">
                        <span className="font-bold text-slate-900">6. Recommended Practice:</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 font-medium pl-1">
                          {nextActions.recommended_practice.map((prac, pIdx) => (
                            <li key={pIdx}>{prac}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs flex items-center justify-between shadow-xs">
                        <div>
                          <span className="font-bold text-emerald-900">7. Recommended Next Test:</span>
                          <p className="text-emerald-700 font-medium mt-0.5">{nextActions.recommended_next_test}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Micro-Topic Accuracy Table */}
                  {Object.keys(data.analytics.microTopicAccuracy).length > 0 && (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-800 uppercase tracking-wider">
                        <Layers className="w-4 h-4 text-blue-600" />
                        <span>Micro-Topic Accuracy Breakdown</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                        {Object.entries(data.analytics.microTopicAccuracy).map(
                          ([topic, stat], tIdx) => (
                            <div
                              key={tIdx}
                              className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-xs"
                            >
                              <span className="text-slate-800 font-medium truncate max-w-[170px]" title={topic}>
                                {topic}
                              </span>
                              <span
                                className={`font-mono font-semibold text-xs px-2.5 py-0.5 rounded-full border ${
                                  stat.percentage >= 75
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : stat.percentage >= 50
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-rose-50 text-rose-700 border-rose-200"
                                }`}
                              >
                                {stat.percentage}% ({stat.correct}/{stat.total})
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Full Natural-Language Student Report */}
              {activeTab === "report" && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Executive Natural-Language Student Report</span>
                    </div>
                    <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                      CUET-UG Intelligence
                    </span>
                  </div>

                  <div className="prose prose-sm max-w-none text-slate-700 font-normal space-y-4 leading-relaxed">
                    {data.natural_language_report ? (
                      <div className="whitespace-pre-line text-xs sm:text-sm">
                        {data.natural_language_report}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Natural language report generation in progress. Check back shortly.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer: Prominent AI Repair Quiz Launcher */}
        <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            Remedial Drills focus on unattempted/failed questions only.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 shadow-xs transition-all"
            >
              Back to Scorecard
            </button>

            {/* Action Button: Generate 5-Question AI Repair Quiz */}
            <button
              type="button"
              disabled={loading || launchingQuiz}
              onClick={() => handleLaunchRepairQuiz(primaryWeakTopic)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all disabled:opacity-50 group"
            >
              {launchingQuiz ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Configuring 5-Question Repair Quiz...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
                  <span>Generate 5-Question AI Repair Quiz for {primaryWeakTopic.slice(0, 24)}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
