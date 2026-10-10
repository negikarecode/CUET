"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { QuestionOption } from "@/types";
import { WhyWrongResponse } from "@/app/api/ai/why-wrong/route";

interface WhyWrongExplanationModalProps {
  question: {
    questionId: string;
    prompt: string;
    options?: QuestionOption[];
    selectedOption: string;
    correctOption: string;
    subject: string;
    chapter: string;
    explanation?: string;
    source?: string;
    reviewed_by_human?: boolean;
    timeSpentSeconds?: number;
  };
  onClose: () => void;
}

export function WhyWrongExplanationModal({
  question,
  onClose,
}: WhyWrongExplanationModalProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WhyWrongResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<"up" | "down" | null>(null);
  const [isFlagged, setIsFlagged] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchExplanation = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/ai/why-wrong", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: question.questionId,
            prompt: question.prompt,
            options: question.options || [],
            selectedOption: question.selectedOption,
            correctOption: question.correctOption,
            subject: question.subject,
            chapter: question.chapter,
            explanation: question.explanation,
            source: question.source,
            reviewed_by_human: question.reviewed_by_human,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to load explanation.");
        }

        const json = await res.json();
        if (isMounted) {
          setData(json.data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Failed to load explanation.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchExplanation();
    return () => {
      isMounted = false;
    };
  }, [question]);

  const handleFlagSubmit = async () => {
    if (!flagReason.trim()) return;
    try {
      await fetch("/api/ai/why-wrong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "flag",
          questionId: question.questionId,
          selectedOption: question.selectedOption,
          reason: flagReason,
        }),
      });
      setIsFlagged(true);
      setShowFlagModal(false);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Why Did I Get This Wrong?
                </h3>
                {data && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      data.reviewed_by_human
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}
                  >
                    {data.reviewed_by_human ? (
                      <>
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Explanation Reviewed</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>AI-generated</span>
                      </>
                    )}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {question.subject} · {question.chapter}
                {question.timeSpentSeconds ? ` · ${question.timeSpentSeconds}s answered` : ""}
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Question Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
            <p className="font-bold text-slate-900 text-xs sm:text-sm leading-relaxed">
              {question.prompt}
            </p>

            {/* Answer Options Breakdown */}
            {question.options && question.options.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {question.options.map((opt) => {
                  const isUserSelected = opt.id === question.selectedOption;
                  const isCorrect = opt.id === question.correctOption;

                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl border flex items-start gap-2.5 transition-all ${
                        isUserSelected
                          ? "bg-rose-50 border-rose-300 text-rose-950 font-semibold"
                          : isCorrect
                          ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold"
                          : "bg-white border-slate-200/80 text-slate-700"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5 ${
                          isUserSelected
                            ? "bg-rose-600 text-white"
                            : isCorrect
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="flex-1 text-xs leading-normal">{opt.text}</span>
                      {isUserSelected && (
                        <span className="text-[10px] uppercase font-bold text-rose-700 shrink-0 font-mono px-1.5 py-0.5 rounded bg-rose-100">
                          Your Answer ✗
                        </span>
                      )}
                      {isCorrect && (
                        <span className="text-[10px] uppercase font-bold text-emerald-700 shrink-0 font-mono px-1.5 py-0.5 rounded bg-emerald-100">
                          Correct ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {loading ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin mx-auto" />
              <p className="font-medium text-slate-600">Analyzing error pattern &amp; distractor trap...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 space-y-2">
              <p className="font-semibold">Unable to generate deep explanation right now.</p>
              <p className="text-[11px] text-slate-600">{question.explanation}</p>
            </div>
          ) : data ? (
            <div className="space-y-4">
              {/* Correct Reasoning */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>The Correct Reasoning</span>
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {data.correctReasoning}
                </p>
              </div>

              {/* Underlying Concept */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Underlying Concept</span>
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {data.underlyingConcept}
                </p>
              </div>

              {/* Why Tempting (Distractor Analysis) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Why Your Selected Option ({data.selectedOption}) Was Tempting</span>
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {data.whyTempting}
                </p>
              </div>

              {/* Similar Practice Question */}
              {data.similarPracticeQuestion && (
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-purple-700" />
                      <span>Similar Practice Question</span>
                    </span>
                    <span className="text-[10px] font-medium text-purple-700">Test Your Immediate Recall</span>
                  </div>

                  <p className="font-semibold text-slate-900 leading-snug">
                    {data.similarPracticeQuestion.prompt}
                  </p>

                  <div className="space-y-1.5">
                    {data.similarPracticeQuestion.options.map((opt) => {
                      const isSelected = practiceAnswer === opt.id;
                      const isCorrect = opt.id === data.similarPracticeQuestion.correctOption;

                      let btnStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
                      if (practiceSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-50 border-rose-300 text-rose-950 font-bold";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-purple-100 border-purple-400 text-purple-950 font-semibold";
                      }

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          disabled={practiceSubmitted}
                          onClick={() => setPracticeAnswer(opt.id)}
                          className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 text-xs transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-md font-mono text-[10px] font-bold bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                            {opt.id}
                          </span>
                          <span className="flex-1">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!practiceSubmitted ? (
                    <button
                      type="button"
                      disabled={!practiceAnswer}
                      onClick={() => setPracticeSubmitted(true)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold text-xs cursor-pointer transition-all shadow-xs"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-white border border-purple-200 text-xs space-y-1">
                      <p className="font-bold text-slate-900">
                        {practiceAnswer === data.similarPracticeQuestion.correctOption
                          ? "🎉 Correct!"
                          : `Incorrect. The right option is ${data.similarPracticeQuestion.correctOption}.`}
                      </p>
                      <p className="text-slate-600 font-medium">
                        {data.similarPracticeQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback Controls */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <span>Was this helpful?</span>
                  <button
                    type="button"
                    onClick={() => setUserRating("up")}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      userRating === "up"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200"
                    }`}
                    title="Helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRating("down")}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      userRating === "down"
                        ? "bg-rose-50 text-rose-700 border-rose-300"
                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200"
                    }`}
                    title="Not helpful"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  {isFlagged ? (
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <Flag className="w-3 h-3" /> Flagged for review
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowFlagModal(true)}
                      className="text-slate-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Flag className="w-3 h-3" />
                      <span>Flag incorrect</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Flag Modal Backdrop */}
        {showFlagModal && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 max-w-sm w-full space-y-3 shadow-xl">
              <h4 className="font-bold text-slate-900 text-sm">Flag Inaccurate Explanation</h4>
              <p className="text-xs text-slate-500">
                Please let us know what part of the explanation was incorrect or unclear:
              </p>
              <textarea
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="e.g. NCERT reference misquoted, wrong distractor assumption..."
                className="w-full h-20 p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFlagModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 text-xs hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!flagReason.trim()}
                  onClick={handleFlagSubmit}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs disabled:opacity-50 cursor-pointer"
                >
                  Submit Flag
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs transition-all"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
