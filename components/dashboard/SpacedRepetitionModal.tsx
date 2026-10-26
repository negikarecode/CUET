"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Play,
} from "lucide-react";
import {
  SpacedRepetitionItem,
  getSpacedRepetitionSummary,
  recordSpacedReviewAttempt,
  SPACED_INTERVALS_DAYS,
} from "@/lib/spaced-repetition";

interface SpacedRepetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onLaunchCBTDrill?: (items: SpacedRepetitionItem[]) => void;
}

export function SpacedRepetitionModal({
  isOpen,
  onClose,
  userId,
  onLaunchCBTDrill,
}: SpacedRepetitionModalProps) {
  const [items, setItems] = useState<SpacedRepetitionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const reloadItems = React.useCallback(() => {
    const summary = getSpacedRepetitionSummary(userId);
    setItems(summary.dueItems);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [userId]);

  useEffect(() => {
    if (isOpen) {
      reloadItems();
      setReviewedCount(0);
    }
  }, [isOpen, reloadItems]);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentIndex]);

  if (!isOpen) return null;

  const currentItem = items[currentIndex];
  const isFinished = items.length === 0 || currentIndex >= items.length;

  const handleCheckAnswer = () => {
    if (!selectedOption || !currentItem || isAnswered) return;
    const isCorrect = selectedOption === currentItem.correctOption;

    recordSpacedReviewAttempt(
      userId,
      currentItem.questionId,
      selectedOption,
      isCorrect
    );

    setIsAnswered(true);
    setReviewedCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Mistake Notebook Review Queue
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold font-mono">
                  2d & 7d Resurface
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Resurfacing missed questions after 2 days, then 7 days. Mastered after 2 consecutive correct answers.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isFinished ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-3xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  {reviewedCount > 0 ? "Review Session Completed!" : "Review Queue is Clear!"}
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
                  {reviewedCount > 0
                    ? `You reviewed ${reviewedCount} due question${reviewedCount === 1 ? "" : "s"}. Mastered questions require 2 consecutive correct attempts.`
                    : "No questions are currently due for re-attempt under the 2-day / 7-day schedule. Missed questions are saved here automatically."}
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            currentItem && (
              <div className="space-y-5">
                {/* Meta badge strip */}
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500 font-semibold">
                      Question {currentIndex + 1} of {items.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                      {currentItem.subject} · {currentItem.chapter}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-mono text-[10px] font-bold">
                      Interval: {currentItem.intervalDays}d (Tier {currentItem.currentIntervalIndex + 1}/{SPACED_INTERVALS_DAYS.length})
                    </span>
                    {currentItem.reviewed_by_human && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {currentItem.prompt}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {(currentItem.options || [
                    { id: "A", text: "Option A" },
                    { id: "B", text: "Option B" },
                    { id: "C", text: "Option C" },
                    { id: "D", text: "Option D" },
                  ]).map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const isCorrect = opt.id === currentItem.correctOption;
                    let optStyle = "bg-white border-slate-200 hover:border-slate-300 text-slate-800";

                    if (isAnswered) {
                      if (isCorrect) {
                        optStyle = "bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold";
                      } else if (isSelected) {
                        optStyle = "bg-rose-50 border-rose-300 text-rose-950 font-semibold";
                      } else {
                        optStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                      }
                    } else if (isSelected) {
                      optStyle = "bg-indigo-50 border-indigo-400 text-indigo-950 ring-1 ring-indigo-400";
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => setSelectedOption(opt.id)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs flex items-center gap-3 transition-all cursor-pointer ${optStyle}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg border font-mono text-[11px] font-bold flex items-center justify-center shrink-0 ${
                            isAnswered && isCorrect
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : isAnswered && isSelected
                              ? "bg-rose-600 text-white border-rose-600"
                              : isSelected
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Drawer after submission */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2 animate-in fade-in duration-200 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Verified Explanation</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold text-indigo-700">
                        {selectedOption === currentItem.correctOption
                          ? "Advancing interval"
                          : "Resetting to Day 1 interval"}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {currentItem.explanation || "Official answer: Option " + currentItem.correctOption}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Modal Footer */}
        {!isFinished && currentItem && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
            {onLaunchCBTDrill && (
              <button
                type="button"
                onClick={() => onLaunchCBTDrill(items)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Play className="w-3 h-3 fill-slate-700" />
                <span>Practice All in CBT Exam Mode</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {!isAnswered ? (
                <button
                  type="button"
                  disabled={!selectedOption}
                  onClick={handleCheckAnswer}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs cursor-pointer shadow-xs transition-all"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <span>{currentIndex < items.length - 1 ? "Next Question" : "Finish Review"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
