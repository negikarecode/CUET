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
    <section id="cbt-simulator" className="py-16 bg-[#FAF7EE] border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b-2 border-black gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-black text-white font-mono text-xs font-black px-2.5 py-1 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                NTA CBT INTERFACE
              </span>
              <span className="text-xs font-bold text-black/60">
                Official Shift Simulation
              </span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-black tracking-tight">
              Real-Time CBT Screen & Instant AI Mistake Diagnosis
            </h2>
            <p className="text-xs sm:text-sm text-black/70 mt-1 font-medium">
              Experience the exact test palette, clock countdown, and question layout used in the CUET exam center.
            </p>
          </div>

          {/* Real CBT Countdown Clock Header */}
          <div className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] shrink-0">
            <Clock className="w-6 h-6 text-[#F59E0B] stroke-[2.5]" />
            <div>
              <p className="text-[10px] uppercase font-black tracking-wider text-black/60">
                {t("timeRemaining", "Time Remaining")}
              </p>
              <p className="text-2xl font-black font-mono tracking-tight text-black" translate="no">
                {isClient ? formatTimer(secondsRemaining) : "59:42"}
              </p>
            </div>
          </div>
        </div>

        {/* CBT Main Grid: Left is Question Area, Right is NTA Question Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Question Panel (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] overflow-hidden">
            {/* Question Top Bar */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#FAF7EE] border-b-2 border-black text-xs font-black text-black">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-black">
                  {t("question", "Question")} No. {currentQuestionNumber}
                </span>
                <span className="bg-[#FEF3C7] text-black px-2 py-0.5 rounded-full border border-black text-[11px] shadow-[1px_1px_0px_0px_#000]">
                  {MOCK_SAMPLE_QUESTION.topic}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-black bg-[#D1FAE5] border border-black px-2 py-0.5 rounded font-mono font-black shadow-[1px_1px_0px_0px_#000]">
                  {t("marksPlus", "Marks: +5")}
                </span>
                <span className="text-black bg-[#FEE2E2] border border-black px-2 py-0.5 rounded font-mono font-black shadow-[1px_1px_0px_0px_#000]">
                  {t("marksMinus", "Negative: -1")}
                </span>
                <span className="text-black/60 hidden sm:inline font-bold">
                  {MOCK_SAMPLE_QUESTION.pyqSource}
                </span>
              </div>
            </div>

            {/* Question Prompt */}
            <div className="p-6 sm:p-8">
              <p className="text-base sm:text-lg font-bold text-black leading-relaxed font-sans">
                {translateStem(MOCK_SAMPLE_QUESTION.prompt)}
              </p>

              {/* Options */}
              <div className="mt-8 space-y-3">
                {MOCK_SAMPLE_QUESTION.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full flex items-start gap-3 p-4 rounded-lg border-2 border-black text-left transition-all font-sans text-sm focus:outline-none ${
                        isSelected
                          ? "bg-[#D1FAE5] text-black shadow-[3px_3px_0px_0px_#000] font-black"
                          : "bg-white hover:bg-[#FEF3C7]/40 text-black shadow-[2px_2px_0px_0px_#000]"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-black transition-colors ${
                          isSelected
                            ? "bg-black text-white"
                            : "bg-[#FAF7EE] text-black"
                        }`}
                        translate="no"
                      >
                        {opt.id}
                      </div>
                      <span className="font-bold text-black leading-snug">
                        {translateStem(opt.text)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons in NTA CBT Format */}
              <div className="mt-8 pt-6 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3.5 py-2 text-xs font-black rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] transition-all"
                  >
                    {t("clearResponse", "Clear Response")}
                  </button>
                  <button
                    type="button"
                    onClick={handleMarkReview}
                    className={`px-3.5 py-2 text-xs font-black rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all flex items-center gap-1.5 ${
                      isMarkedReview
                        ? "bg-[#F59E0B] text-black"
                        : "bg-[#FEF3C7] text-black hover:bg-[#FDE68A]"
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
                    className="px-5 py-2.5 text-xs font-black rounded-lg bg-[#FF5C5C] text-white hover:bg-[#FF4545] border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center gap-2 transition-all"
                  >
                    <span>{t("saveAndNext", "Save & Next")}</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Mistake Diagnosis Drawer / Callout */}
            {showAiDiagnosis && (
              <div className="border-t-2 border-black bg-[#FFFDF9] p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-black font-black text-sm">
                    <Sparkles className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>{t("aiDiagnosis", "AI Granular Mistake Diagnosis & Concept Deep-Dive")}</span>
                  </div>
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_#000] ${
                      isCorrect
                        ? "bg-[#D1FAE5] text-black"
                        : "bg-[#FEE2E2] text-black"
                    }`}
                  >
                    {isCorrect ? `+5 ${t("correctMarks", "Marks (Correct)")}` : `-1 ${t("penaltyMarks", "Mark (Penalty)")}`}
                  </span>
                </div>

                <p className="text-xs text-black/80 font-medium leading-relaxed mb-3">
                  <strong className="text-black font-black">{t("officialSolutionText", "Official Solution")}: </strong>
                  {MOCK_SAMPLE_QUESTION.explanation}
                </p>

                <div className="rounded-xl bg-white border-2 border-black p-3.5 text-xs shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5 stroke-[2.5]" />
                    <div>
                      <span className="font-black text-black">
                        {t("trapOptionAnalysisText", "NTA Trap Breakdown")}:
                      </span>
                      <p className="text-black/70 font-medium mt-0.5">
                        {MOCK_SAMPLE_QUESTION.aiDiagnosisNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Palette Panel (4 cols): NTA Standard Question Grid */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border-2 border-black p-5 shadow-[5px_5px_0px_0px_#000]">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <h3 className="font-black text-black text-sm">
                  {t("questionPalette", "Question Palette")} (50 Qs)
                </h3>
                <span className="text-[11px] text-black/60 font-bold">
                  {t("physics", "Physics")} (312)
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 my-4 text-[11px] font-bold text-black">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#10B981] text-black text-[10px] flex items-center justify-center font-black border border-black shadow-[1px_1px_0px_0px_#000]" translate="no">
                    6
                  </span>
                  <span>{t("answered", "Answered")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#FF5C5C] text-white text-[10px] flex items-center justify-center font-black border border-black shadow-[1px_1px_0px_0px_#000]" translate="no">
                    6
                  </span>
                  <span>{t("notAnswered", "Not Answered")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#F59E0B] text-black text-[10px] flex items-center justify-center font-black border border-black shadow-[1px_1px_0px_0px_#000]" translate="no">
                    3
                  </span>
                  <span>{t("markedReview", "Marked Review")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-white text-black text-[10px] flex items-center justify-center font-black border border-black shadow-[1px_1px_0px_0px_#000]" translate="no">
                    35
                  </span>
                  <span>{t("notVisited", "Not Visited")}</span>
                </div>
              </div>

              {/* Numbered Matrix Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-1.5 max-h-56 overflow-y-auto p-2 bg-[#FAF7EE] rounded-xl border-2 border-black">
                {paletteQuestions.map((q) => {
                  let colorClasses = "bg-white text-black hover:bg-black/5";
                  if (q.status === "answered") {
                    colorClasses = "bg-[#10B981] text-black font-black";
                  } else if (q.status === "marked") {
                    colorClasses = "bg-[#F59E0B] text-black font-black";
                  } else if (q.status === "not_answered") {
                    colorClasses = "bg-[#FF5C5C] text-white font-black";
                  }

                  const isCurrent = q.num === currentQuestionNumber;

                  return (
                    <button
                      key={q.num}
                      type="button"
                      onClick={() => setCurrentQuestionNumber(q.num)}
                      className={`h-8 rounded text-xs transition-all flex items-center justify-center font-mono border border-black shadow-[1px_1px_0px_0px_#000] ${colorClasses} ${
                        isCurrent ? "ring-2 ring-black scale-105" : ""
                      }`}
                      translate="no"
                    >
                      {q.num}
                    </button>
                  );
                })}
              </div>

              {/* Submit Action */}
              <div className="mt-5 pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={() => {
                    alert("Mock session submitted! 50 compulsory questions evaluated.");
                  }}
                  className="w-full py-2.5 rounded-lg bg-black hover:bg-[#121212] text-white border-2 border-black font-black text-xs tracking-wider uppercase transition-all shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  {t("submitTest", "Submit Test Paper")}
                </button>
              </div>
            </div>


            {/* Preparation Tip Box */}
            <div className="rounded-xl border-2 border-black bg-[#FEF3C7] p-4 text-xs text-black shadow-[3px_3px_0px_0px_#000]">
              <div className="flex items-center gap-2 font-black mb-1">
                <Award className="w-4 h-4 text-black" />
                <span>NTA Strategy Tip:</span>
              </div>
              <p className="text-black/80 font-medium leading-relaxed">
                Every question is now compulsory. Avoid blind guessing—an unattempted question scores 0, but an incorrect attempt costs you a net -6 marks. Flag time-sinks for review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
