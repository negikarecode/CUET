"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Bookmark,
  Sparkles,
  ChevronRight,
  Lightbulb,
  Award,
} from "lucide-react";
import { MOCK_SAMPLE_QUESTION } from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LatexRenderer from "@/components/common/LatexRenderer";

export default function CBTMockPreview() {
  const { t, translateStem } = useTranslation();
  const isClient = useIsClient();
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>("A");
  const [isMarkedReview, setIsMarkedReview] = useState(false);
  const [showAiDiagnosis, setShowAiDiagnosis] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(59 * 60 + 42); // 59m 42s
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const addXP = useTestStore((state) => state.addXP);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optId: "A" | "B" | "C" | "D") => {
    setSelectedOption(optId);
  };

  const handleClear = () => {
    setSelectedOption(null);
  };

  const handleMarkReview = () => {
    setIsMarkedReview((prev) => !prev);
  };

  const isCorrect = selectedOption === MOCK_SAMPLE_QUESTION.correctOptionId;

  // Mock question status palette for 50 questions
  const paletteQuestions = Array.from({ length: 50 }, (_, i) => {
    const num = i + 1;
    let status: "answered" | "not_answered" | "marked" | "not_visited" = "not_visited";
    if (num === 1) {
      status = isMarkedReview
        ? "marked"
        : selectedOption
        ? "answered"
        : "not_answered";
    } else if (num <= 5) {
      status = "answered";
    } else if (num <= 8) {
      status = "marked";
    } else if (num <= 14) {
      status = "not_answered";
    }
    return { num, status };
  });

  return (
    <section id="cbt-simulator" className="py-16 bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-50 text-blue-700 font-mono text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                NTA CBT INTERFACE
              </span>
              <span className="text-xs font-medium text-slate-500">
                Official Shift Simulation
              </span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Real-Time CBT Screen &amp; Instant AI Mistake Diagnosis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Experience the exact test palette, clock countdown, and question layout used in the CUET exam center.
            </p>
          </div>

          {/* Real CBT Countdown Clock Header */}
          <div className="flex items-center gap-3.5 bg-white text-slate-900 px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs shrink-0">
            <Clock className="w-5 h-5 text-amber-500 stroke-[2.5]" />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                {t("timeRemaining", "Time Remaining")}
              </p>
              <p className="text-2xl font-bold font-mono tracking-tight text-slate-900" translate="no">
                {isClient ? formatTimer(secondsRemaining) : "59:42"}
              </p>
            </div>
          </div>
        </div>

        {/* CBT Main Grid: Left is Question Area, Right is NTA Question Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Question Panel (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Question Top Bar */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900">
                  {t("question", "Question")} No. {currentQuestionNumber}
                </span>
                <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200/60 text-[11px] font-medium">
                  {MOCK_SAMPLE_QUESTION.topic}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px]">
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  {t("marksPlus", "Marks: +5")}
                </span>
                <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  {t("marksMinus", "Negative: -1")}
                </span>
                <span className="text-slate-400 hidden sm:inline font-medium">
                  {MOCK_SAMPLE_QUESTION.pyqSource}
                </span>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="p-6 sm:p-8">
              <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed font-sans">
                <LatexRenderer content={translateStem(MOCK_SAMPLE_QUESTION.prompt)} />
              </div>

              {/* Options */}
              <div className="mt-8 space-y-3">
                {MOCK_SAMPLE_QUESTION.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all font-sans text-sm focus:outline-none cursor-pointer ${
                        isSelected
                          ? "bg-blue-50/60 border-blue-600 text-slate-900 shadow-xs font-semibold"
                          : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                        translate="no"
                      >
                        {opt.id}
                      </div>
                      <div className="leading-snug flex-1">
                        <LatexRenderer content={translateStem(opt.text)} inline />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons in NTA CBT Format */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 shadow-xs transition-all cursor-pointer"
                  >
                    {t("clearResponse", "Clear Response")}
                  </button>
                  <button
                    type="button"
                    onClick={handleMarkReview}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isMarkedReview
                        ? "bg-amber-100 text-amber-900 border-amber-300"
                        : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{isMarkedReview ? t("markedReview", "Marked for Review") : t("markForReview", "Mark for Review")}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedOption) {
                        addXP(15);
                      }
                      setShowAiDiagnosis(true);
                    }}
                    className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs hover:shadow flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>{t("saveAndNext", "Save & Next")}</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Mistake Diagnosis Drawer / Callout */}
            {showAiDiagnosis && (
              <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{t("aiDiagnosis", "AI Granular Mistake Diagnosis & Concept Deep-Dive")}</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-0.5 rounded-full border ${
                      isCorrect
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {isCorrect ? `+5 ${t("correctMarks", "Marks (Correct)")}` : `-1 ${t("penaltyMarks", "Mark (Penalty)")}`}
                  </span>
                </div>

                <div className="text-xs text-slate-600 font-medium leading-relaxed">
                  <strong className="text-slate-900 font-bold">{t("officialSolutionText", "Official Solution")}: </strong>
                  <LatexRenderer content={MOCK_SAMPLE_QUESTION.explanation} className="mt-1" />
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/60 p-4 text-xs shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 stroke-[2.5]" />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 block mb-0.5">
                        {t("trapOptionAnalysisText", "NTA Trap Breakdown")}:
                      </span>
                      <LatexRenderer content={MOCK_SAMPLE_QUESTION.aiDiagnosisNotes} className="text-slate-600 font-medium text-xs leading-relaxed" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Palette Panel (4 cols): NTA Standard Question Grid */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">
                  {t("questionPalette", "Question Palette")} (50 Qs)
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  {t("physics", "Physics")} (312)
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2.5 text-[11px] font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold" translate="no">
                    6
                  </span>
                  <span>{t("answered", "Answered")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold" translate="no">
                    6
                  </span>
                  <span>{t("notAnswered", "Not Answered")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold" translate="no">
                    3
                  </span>
                  <span>{t("markedReview", "Marked Review")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-[10px] flex items-center justify-center font-bold" translate="no">
                    35
                  </span>
                  <span>{t("notVisited", "Not Visited")}</span>
                </div>
              </div>

              {/* Numbered Matrix Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-1.5 max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-200/60">
                {paletteQuestions.map((q) => {
                  let colorClasses = "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100";
                  if (q.status === "answered") {
                    colorClasses = "bg-emerald-500 text-white font-bold";
                  } else if (q.status === "marked") {
                    colorClasses = "bg-amber-500 text-white font-bold";
                  } else if (q.status === "not_answered") {
                    colorClasses = "bg-rose-500 text-white font-bold";
                  }

                  const isCurrent = q.num === currentQuestionNumber;

                  return (
                    <button
                      key={q.num}
                      type="button"
                      onClick={() => setCurrentQuestionNumber(q.num)}
                      className={`h-8 rounded-xl text-xs transition-all flex items-center justify-center font-mono cursor-pointer ${colorClasses} ${
                        isCurrent ? "ring-2 ring-blue-600 scale-105" : ""
                      }`}
                      translate="no"
                    >
                      {q.num}
                    </button>
                  );
                })}
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    alert("Mock session submitted! 50 compulsory questions evaluated.");
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xs hover:shadow cursor-pointer"
                >
                  {t("submitTest", "Submit Test Paper")}
                </button>
              </div>
            </div>

            {/* Preparation Tip Box */}
            <div className="rounded-3xl border border-amber-200/80 bg-amber-50/60 p-5 text-xs text-slate-800 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Award className="w-4 h-4 text-amber-600" />
                <span>NTA Strategy Tip:</span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                Every question is now compulsory. Avoid blind guessing—an unattempted question scores 0, but an incorrect attempt costs you a net -6 marks. Flag time-sinks for review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
