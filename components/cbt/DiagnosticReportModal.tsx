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
  }, [isOpen, testId, questions, answers]);

  if (!isOpen) return null;

  // Handle immediate launch of 5-question AI Repair Quiz
  const handleLaunchRepairQuiz = async (topic: string) => {
    setLaunchingQuiz(true);
    try {
      const res = await fetch("/api/ai/repair-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user_cuet_aspirant_01",
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
        return "bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]";
      case "Misreading Error":
        return "bg-[#F3E8FF] text-[#6B21A8] border-[#A855F7]";
      case "Careless Error":
        return "bg-[#E0F2FE] text-[#0369A1] border-[#38BDF8]";
      case "Concept Confusion":
      case "Option Confusion":
        return "bg-[#FFEDD5] text-[#C2410C] border-[#FB923C]";
      case "Application Error":
        return "bg-[#EEF2FF] text-[#3730A3] border-[#6366F1]";
      case "Time Pressure Error":
        return "bg-[#FFE4E6] text-[#9F1239] border-[#FB7185]";
      case "Conceptual Gap":
      default:
        return "bg-[#FEE2E2] text-[#991B1B] border-[#EF4444]";
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#FAF7EE] text-black p-6 border-b-2 border-black flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-black">
              <Sparkles className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-black">
                  CUET AI Performance Intelligence Engine
                </h3>
                <span className="bg-[#D1FAE5] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full border border-black uppercase shadow-[1px_1px_0px_0px_#000]">
                  Master Engine
                </span>
                {readiness && (
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border border-black uppercase shadow-[1px_1px_0px_0px_#000] ${
                      readiness.level === "Very Strong"
                        ? "bg-[#A7F3D0] text-black"
                        : readiness.level === "Strong"
                        ? "bg-[#BAE6FD] text-black"
                        : readiness.level === "Moderate"
                        ? "bg-[#FEF08A] text-black"
                        : "bg-[#FECDD3] text-black"
                    }`}
                  >
                    Readiness: {readiness.level}
                  </span>
                )}
              </div>
              <p className="text-xs text-black/70 font-semibold mt-0.5">
                Multi-dimensional post-mortem analyzing cognitive error types, NCERT anchors, and net mark recovery.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black shadow-[2px_2px_0px_0px_#000] transition-all"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Navigation Tabs */}
        {data && !loading && (
          <div className="bg-white border-b-2 border-black px-6 pt-3 flex items-center gap-2 overflow-x-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("decrypter")}
              className={`px-4 py-2 text-xs font-black rounded-t-lg border-2 border-b-0 border-black transition-all flex items-center gap-1.5 ${
                activeTab === "decrypter"
                  ? "bg-[#FAF7EE] text-black translate-y-[2px]"
                  : "bg-neutral-100 text-black/60 hover:text-black"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>NCERT Error Decrypter ({data.mistake_analyses.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("breakdown")}
              className={`px-4 py-2 text-xs font-black rounded-t-lg border-2 border-b-0 border-black transition-all flex items-center gap-1.5 ${
                activeTab === "breakdown"
                  ? "bg-[#FAF7EE] text-black translate-y-[2px]"
                  : "bg-neutral-100 text-black/60 hover:text-black"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Loss Breakdown & Next Actions</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("report")}
              className={`px-4 py-2 text-xs font-black rounded-t-lg border-2 border-b-0 border-black transition-all flex items-center gap-1.5 ${
                activeTab === "report"
                  ? "bg-[#FAF7EE] text-black translate-y-[2px]"
                  : "bg-neutral-100 text-black/60 hover:text-black"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Executive Intelligence Report</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF7EE]/40">
          {/* Loading State */}
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-10 h-10 border-4 border-black border-t-[#FF5C5C] rounded-full animate-spin" />
              <div>
                <p className="text-sm font-black text-black">
                  Executing CUET AI Performance Intelligence scan...
                </p>
                <p className="text-xs text-black/70 font-semibold mt-1">
                  Classifying errors (A–L), cross-referencing NCERT chapters, and formulating 7-point recovery strategy.
                </p>
              </div>
            </div>
          )}

          {/* Error State or Rate Limit State */}
          {error && !loading && (
            isRateLimited ? (
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-black text-center space-y-4 shadow-[4px_4px_0px_0px_#000] animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-lg bg-white border-2 border-black text-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_#000]">
                  <Zap className="w-7 h-7 fill-[#F59E0B] text-[#D97706]" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-black tracking-tight">
                    Daily AI Analysis Limit Reached
                  </h4>
                  <p className="text-xs text-black/80 font-medium mt-1 max-w-md mx-auto leading-relaxed">
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
              <div className="p-6 rounded-xl bg-[#FEE2E2] border-2 border-black text-center space-y-3 shadow-[4px_4px_0px_0px_#000]">
                <AlertTriangle className="w-8 h-8 text-[#DC2626] mx-auto stroke-[2.5]" />
                <p className="text-sm font-black text-black">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-white rounded-lg border-2 border-black text-xs font-black text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FAF7EE]"
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
              <div className="p-5 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-black font-black text-sm">
                    <Brain className="w-4 h-4 text-black" />
                    <span>Executive Intelligence Summary</span>
                  </div>
                  {readiness && (
                    <span className="text-[11px] font-mono font-bold text-black/70">
                      Confidence: {readiness.confidence}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                  {data.overall_summary}
                </p>

                {/* Primary Weak Topics Badges */}
                <div className="mt-4 pt-3 border-t-2 border-black/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-black">
                    High-Priority Weakness Targets:
                  </span>
                  {data.primary_weak_topics.map((topic, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF3C7] border-2 border-black text-black font-mono text-xs font-black shadow-[1px_1px_0px_0px_#000]"
                    >
                      <Target className="w-3 h-3 text-[#DC2626]" />
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
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                        <Hourglass className="w-4 h-4 text-[#F59E0B] stroke-[2.5]" />
                        <span>Pacing Bottlenecks Detected ({data.time_sink_alerts.length})</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.time_sink_alerts.map((alert, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-lg border-2 border-black bg-[#FEF3C7] text-xs flex items-start gap-2.5 shadow-[2px_2px_0px_0px_#000]"
                          >
                            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5 stroke-[2.5]" />
                            <div>
                              <span className="font-black text-black">
                                Pacing Alert (Q{alert.question_number}):
                              </span>
                              <p className="text-black/80 mt-0.5 leading-relaxed font-semibold">
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
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                        <BookOpen className="w-4 h-4 text-black" />
                        <span>NCERT Concept Decrypter ({data.mistake_analyses.length} Errors Analyzed)</span>
                      </div>
                      <span className="text-[11px] text-black/60 font-bold">
                        12-Factor Error Classification
                      </span>
                    </div>

                    <div className="space-y-4">
                      {data.mistake_analyses.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/10 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-[#FF5C5C] text-white font-black text-xs flex items-center justify-center font-mono border border-black shadow-[1px_1px_0px_0px_#000]">
                                #{idx + 1}
                              </span>
                              <div className="text-xs font-black text-black">
                                <MathRenderer text={item.micro_topic} inline />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.error_classification && (
                                <span
                                  className={`text-[10px] font-black px-2.5 py-0.5 rounded border-2 shadow-[1px_1px_0px_0px_#000] ${getErrorBadgeStyle(
                                    item.error_classification
                                  )}`}
                                >
                                  {item.error_classification}
                                </span>
                              )}
                              {item.confidence && (
                                <span className="text-[10px] font-bold text-black/70 bg-neutral-100 px-2 py-0.5 rounded border border-black">
                                  {item.confidence} Confidence
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Distractor Trap Callout */}
                          <div className="p-3 rounded-lg bg-[#FEE2E2] border-2 border-black text-xs">
                            <span className="font-black text-black flex items-center gap-1.5 mb-1">
                              <Zap className="w-3.5 h-3.5 text-[#DC2626] stroke-[2.5]" />
                              Why You Picked the Trap Option:
                            </span>
                            <div className="text-black/80 font-medium leading-relaxed">
                              <MathRenderer text={item.distractor_trap} />
                            </div>
                          </div>

                          {/* Exact NCERT Rules in 2 bullet points */}
                          <div className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black text-xs space-y-1.5">
                            <span className="font-black text-black flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] stroke-[3]" />
                              Exact NCERT Concept Rule:
                            </span>
                            <ul className="list-disc list-inside text-black/80 font-medium space-y-1 pl-1">
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
                  {/* "Why Am I Losing Marks?" Section 26 */}
                  {whyLosingMarks.length > 0 && (
                    <div className="p-5 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] space-y-4">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                        <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
                        <span>Why Am I Losing Marks? (Cognitive Breakdown)</span>
                      </div>
                      <p className="text-xs text-black/70 font-semibold">
                        Your lost marks are classified across cognitive error patterns rather than generic lack of effort:
                      </p>

                      <div className="space-y-3">
                        {whyLosingMarks.map((cause, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-black text-black">
                              <span>{cause.cause}</span>
                              <span className="font-mono">{cause.percentage}%</span>
                            </div>
                            <div className="w-full h-3 bg-neutral-100 rounded-full border-2 border-black overflow-hidden shadow-[1px_1px_0px_0px_#000]">
                              <div
                                className="h-full bg-[#FF5C5C]"
                                style={{ width: `${Math.max(5, cause.percentage)}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-black/70 font-medium">{cause.evidence}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 7-Point Next Actions Plan (Section 28) */}
                  {nextActions && (
                    <div className="p-5 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] space-y-4">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                        <Compass className="w-4 h-4 text-[#0369A1]" />
                        <span>What Should I Do Next? (7-Point Action Plan)</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-[#FAF7EE] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                          <span className="font-black text-black">1. Biggest Strength</span>
                          <p className="text-black/80 font-semibold mt-1">{nextActions.biggest_strength}</p>
                        </div>
                        <div className="p-3 bg-[#FEE2E2] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                          <span className="font-black text-black">2. Biggest Weakness</span>
                          <p className="text-black/80 font-semibold mt-1">{nextActions.biggest_weakness}</p>
                        </div>
                        <div className="p-3 bg-[#FEF3C7] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                          <span className="font-black text-black">3. Recurring Trap</span>
                          <p className="text-black/80 font-semibold mt-1">{nextActions.biggest_recurring_mistake}</p>
                        </div>
                        <div className="p-3 bg-[#EEF2FF] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                          <span className="font-black text-black">4. Highest-Impact Focus</span>
                          <p className="text-black/80 font-semibold mt-1">{nextActions.highest_impact_topic}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-lg border-2 border-black text-xs space-y-2 shadow-[2px_2px_0px_0px_#000]">
                        <span className="font-black text-black">5. Recommended NCERT Revision:</span>
                        <ul className="list-disc list-inside space-y-1 text-black/80 font-semibold pl-1">
                          {nextActions.recommended_revision.map((rev, rIdx) => (
                            <li key={rIdx}>{rev}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-white rounded-lg border-2 border-black text-xs space-y-2 shadow-[2px_2px_0px_0px_#000]">
                        <span className="font-black text-black">6. Recommended Practice:</span>
                        <ul className="list-disc list-inside space-y-1 text-black/80 font-semibold pl-1">
                          {nextActions.recommended_practice.map((prac, pIdx) => (
                            <li key={pIdx}>{prac}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-[#D1FAE5] rounded-lg border-2 border-black text-xs flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                        <div>
                          <span className="font-black text-black">7. Recommended Next Test:</span>
                          <p className="text-black/80 font-bold mt-0.5">{nextActions.recommended_next_test}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Micro-Topic Accuracy Table */}
                  {Object.keys(data.analytics.microTopicAccuracy).length > 0 && (
                    <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                      <div className="flex items-center gap-2 mb-3 text-xs font-black text-black uppercase tracking-wider">
                        <Layers className="w-4 h-4 text-black" />
                        <span>Micro-Topic Accuracy Breakdown</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        {Object.entries(data.analytics.microTopicAccuracy).map(
                          ([topic, stat], tIdx) => (
                            <div
                              key={tIdx}
                              className="p-2.5 bg-[#FAF7EE] rounded-lg border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_0px_#000]"
                            >
                              <span className="text-black font-bold truncate max-w-[170px]" title={topic}>
                                {topic}
                              </span>
                              <span
                                className={`font-mono font-black text-xs px-2 py-0.5 rounded border border-black ${
                                  stat.percentage >= 75
                                    ? "bg-[#D1FAE5] text-black"
                                    : stat.percentage >= 50
                                    ? "bg-[#FEF3C7] text-black"
                                    : "bg-[#FEE2E2] text-black"
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

              {/* TAB 3: Full Natural-Language Student Report (Section 33) */}
              {activeTab === "report" && (
                <div className="p-6 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black">
                      <FileText className="w-4 h-4 text-black" />
                      <span>Section 33 Natural-Language Student Report</span>
                    </div>
                    <span className="text-[11px] font-mono font-black bg-[#FAF7EE] px-2.5 py-0.5 rounded border border-black">
                      CUET-UG Intelligence
                    </span>
                  </div>

                  <div className="prose prose-sm max-w-none text-black/90 font-medium space-y-4 leading-relaxed">
                    {data.natural_language_report ? (
                      <div className="whitespace-pre-line text-xs sm:text-sm">
                        {data.natural_language_report}
                      </div>
                    ) : (
                      <p className="text-xs text-black/70">
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
        <div className="p-6 bg-[#FAF7EE] border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-black/70 font-semibold">
            Remedial Drills focus on unattempted/failed questions only.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-lg border-2 border-black bg-white text-black font-black text-xs hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              Back to Scorecard
            </button>

            {/* Prominent Action Button: Generate 5-Question AI Repair Quiz */}
            <button
              type="button"
              disabled={loading || launchingQuiz}
              onClick={() => handleLaunchRepairQuiz(primaryWeakTopic)}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs flex items-center justify-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50 transition-all group"
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
                  <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
