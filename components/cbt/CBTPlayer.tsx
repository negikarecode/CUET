"use client";

import React, { useEffect, useState } from "react";
import {
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Grid,
  X,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { Question, QuestionStatus } from "@/types";
import CBTSubmitModal from "./CBTSubmitModal";
import CBTResultView from "./CBTResultView";
import { CBTErrorBoundary } from "./CBTErrorBoundary";
import MathRenderer from "./MathRenderer";
import CBTCaseStudyPanel from "./CBTCaseStudyPanel";
import CBTDiagramViewer from "./CBTDiagramViewer";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { getActiveExamConfig } from "@/lib/config/examConfig";

export default function CBTPlayer() {
  const { t, translateStem } = useTranslation();
  const isClient = useIsClient();
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(false);
  const examConfig = getActiveExamConfig();

  // Store state and actions
  const testMeta = useCBTStore((state) => state.testMeta);
  const questions = useCBTStore((state) => state.questions);
  const currentQuestionIndex = useCBTStore((state) => state.currentQuestionIndex);
  const remainingSeconds = useCBTStore((state) => state.remainingSeconds);
  const isTimerRunning = useCBTStore((state) => state.isTimerRunning);
  const questionStates = useCBTStore((state) => state.questionStates);
  const isSubmitted = useCBTStore((state) => state.isSubmitted);

  const selectOption = useCBTStore((state) => state.selectOption);
  const clearResponse = useCBTStore((state) => state.clearResponse);
  const saveAndNext = useCBTStore((state) => state.saveAndNext);
  const markForReviewAndNext = useCBTStore((state) => state.markForReviewAndNext);
  const goToPrevious = useCBTStore((state) => state.goToPrevious);
  const goToNext = useCBTStore((state) => state.goToNext);
  const jumpToQuestion = useCBTStore((state) => state.jumpToQuestion);
  const tickSecond = useCBTStore((state) => state.tickSecond);
  const openSubmitModal = useCBTStore((state) => state.openSubmitModal);
  const getQuestionStatus = useCBTStore((state) => state.getQuestionStatus);
  const getSummaryCounts = useCBTStore((state) => state.getSummaryCounts);

  // Active wall-clock anchored interval for countdown timer and question-level time tracking
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    // Immediately synchronize timer on mount
    tickSecond();

    const handleVisibilityOrFocus = () => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        tickSecond();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    const interval = setInterval(() => {
      tickSecond();
    }, 1000);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, [isTimerRunning, isSubmitted, tickSecond]);

  // Format timer MM:SS
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Warning state if under 5 minutes (300 seconds)
  const isUnder5Minutes = remainingSeconds <= 300;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold">Initializing NTA CBT Secure Engine...</p>
        </div>
      </div>
    );
  }

  // If test has been finalized/submitted, display the Scorecard and Post-Mortem View
  if (isSubmitted) {
    return (
      <CBTErrorBoundary>
        <CBTResultView />
      </CBTErrorBoundary>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  if (!currentQ) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="text-center p-6 bg-white rounded-2xl border-2 border-black">
          <p className="text-sm font-bold text-slate-800">No active test questions loaded.</p>
        </div>
      </div>
    );
  }

  const currentAnswer = questionStates[currentQ.id];
  const selectedOption = currentAnswer?.selectedOption ?? null;
  const counts = getSummaryCounts();

  return (
    <CBTErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#FAF7EE] select-none">
        {/* =================================================================== */}
        {/* HEADER BAR: Subject Title, Countdown Timer, Submit Action */}
        {/* =================================================================== */}
        <header className="sticky top-0 z-40 bg-[#FAF7EE] border-b-2 border-black">
          <div className="max-w-[1600px] mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Test Paper & Subject Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FF5C5C] text-white border-2 border-black flex items-center justify-center font-black text-xs shrink-0 shadow-[1px_1px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000]">
                CBT
              </div>
              <div className="truncate min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-xs sm:text-base font-black text-black truncate">
                    {testMeta?.title ?? examConfig.name}
                  </h1>
                  <span className="hidden md:inline rounded-full bg-[#FEF3C7] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_0px_#000]">
                    {t("compulsoryBadge", `${examConfig.totalQuestions} Compulsory Qs`)}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-black/70 font-semibold truncate hidden sm:block">
                  {t("subjectLabel", "Subject:")} <span className="font-black text-black">{testMeta?.subject}</span> ({testMeta?.code}) • {t("markingInfo", `Marking: +${examConfig.correctMarks} / ${examConfig.incorrectMarks} / 0`)}
                </p>
              </div>
            </div>

            {/* Center / Right: Countdown Timer & Submit Button */}
            <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
              {/* Countdown Timer */}
              <div
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg border-2 border-black font-mono transition-colors shadow-[1px_1px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] ${
                  isUnder5Minutes
                    ? "bg-[#FEE2E2] text-black font-black animate-pulse"
                    : "bg-white text-black"
                }`}
                title="Continuous Real Exam Countdown Timer"
              >
                <Clock
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${
                    isUnder5Minutes ? "text-[#DC2626]" : "text-[#F59E0B]"
                  }`}
                />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] sm:text-[9px] uppercase font-black text-black/60 hidden sm:inline">
                    {t("timeLeft", "Time Left")}
                  </span>
                  <span className="text-xs sm:text-base font-black tracking-wider" translate="no">
                    {formatTimer(remainingSeconds)}
                  </span>
                </div>
              </div>

              {/* Mobile Palette Toggle Button */}
              <button
                type="button"
                onClick={() => setMobilePaletteOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] shadow-[1px_1px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 text-xs font-black"
                aria-label="Open Question Palette"
              >
                <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">{t("palette", "Palette")}</span>
              </button>

              {/* Submit Test Button */}
              <button
                type="button"
                onClick={openSubmitModal}
                className="px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white border-2 border-black font-black text-xs sm:text-sm tracking-wide shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 sm:gap-1.5 shrink-0"
              >
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">{t("submitTest", "Submit Test")}</span>
                <span className="sm:hidden">{t("submit", "Submit")}</span>
              </button>
            </div>
          </div>
        </header>

        {/* =================================================================== */}
        {/* MAIN BODY: 70% Workspace (Left) + 30% Question Palette (Right) */}
        {/* =================================================================== */}
        <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================================================================= */}
          {/* LEFT PANEL: Question Workspace (70% on Desktop = 8-9 cols) */}
          {/* ================================================================= */}
          <section className="lg:col-span-8 xl:col-span-9 flex flex-col bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] overflow-hidden">
            {/* Question Workspace Sub-header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#FAF7EE] border-b-2 border-black text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-black text-sm bg-[#FEF3C7] border border-black px-2.5 py-1 rounded shadow-[1px_1px_0px_0px_#000]">
                  {t("question", "Question")} {currentQuestionIndex + 1} {t("of", "of")} {questions.length}
                </span>
                <div className="text-black font-bold hidden sm:inline">
                  <MathRenderer text={currentQ.topic} inline />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px]">
                {/* Official NTA Language Switcher (13 CUET Official Languages) */}
                <LanguageSelector variant="cbt" />

                <span className="text-black bg-[#D1FAE5] border border-black px-2 py-0.5 rounded font-black shadow-[1px_1px_0px_0px_#000]">
                  {t("marksPlus", "Marks: +5")}
                </span>
                <span className="text-black bg-[#FEE2E2] border border-black px-2 py-0.5 rounded font-black shadow-[1px_1px_0px_0px_#000]">
                  {t("marksMinus", "Negative: -1")}
                </span>
                {currentAnswer?.timeSpentSeconds ? (
                  <span className="text-black/70 hidden md:inline font-bold">
                    {t("spent", "Spent:")} {currentAnswer.timeSpentSeconds}s
                  </span>
                ) : null}
              </div>
            </div>

            {/* Question Text, Case Study Reading Panel, and Visual Diagram */}
            <div className="p-6 sm:p-8 flex-1">
              <CBTCaseStudyPanel
                prompt={translateStem(currentQ.prompt)}
                questionNumber={currentQuestionIndex + 1}
              />

              <CBTDiagramViewer question={currentQ} />

              {/* Radio Button Options (A, B, C, D) with KaTeX Math Rendering */}
              <div className="mt-8 space-y-3">
                {currentQ.options.map((opt) => {
                  const isChecked = selectedOption === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectOption(opt.id)}
                      className={`w-full flex items-start gap-3.5 p-4 rounded-lg border-2 border-black text-left cursor-pointer transition-all ${
                        isChecked
                          ? "bg-[#D1FAE5] text-black shadow-[3px_3px_0px_0px_#000] font-black"
                          : "bg-white hover:bg-[#FAF7EE] text-black shadow-[2px_2px_0px_0px_#000]"
                      }`}
                    >
                      {/* Radio Circle */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-0.5 border border-black transition-all ${
                          isChecked
                            ? "bg-black text-white"
                            : "bg-[#FAF7EE] text-black"
                        }`}
                        translate="no"
                      >
                        {opt.id}
                      </div>

                      {/* Option Text with MathRenderer and translation stem */}
                      <div className="text-sm font-bold leading-normal pt-0.5 flex-1">
                        <MathRenderer text={translateStem(opt.text)} inline />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =============================================================== */}
            {/* BOTTOM ACTION BAR: Save & Next, Clear, Mark for Review, Prev/Next */}
            {/* =============================================================== */}
            <div className="p-3 sm:p-5 bg-[#FAF7EE] border-t-2 border-black flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              {/* Left Actions: Clear & Mark for Review */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={clearResponse}
                  disabled={selectedOption === null}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] disabled:opacity-40 disabled:pointer-events-none shadow-[2px_2px_0px_0px_#000] transition-all"
                >
                  <span className="hidden sm:inline">{t("clearResponse", "Clear Response")}</span>
                  <span className="sm:hidden">{t("clear", "Clear")}</span>
                </button>

                <button
                  type="button"
                  onClick={markForReviewAndNext}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black rounded-lg border-2 border-black transition-all flex items-center gap-1 sm:gap-1.5 shadow-[2px_2px_0px_0px_#000] ${
                    currentAnswer?.isMarkedForReview
                      ? "bg-[#F59E0B] text-black"
                      : "bg-[#FEF3C7] text-black hover:bg-[#FDE68A]"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="hidden sm:inline">{t("markForReview", "Mark for Review & Next")}</span>
                  <span className="sm:hidden">{t("review", "Review & Next")}</span>
                </button>
              </div>

              {/* Right Actions: Prev, Next, Save & Next */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] disabled:opacity-40 disabled:pointer-events-none shadow-[2px_2px_0px_0px_#000] transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  <span className="hidden sm:inline">{t("previous", "Previous")}</span>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  disabled={currentQuestionIndex >= questions.length - 1}
                  className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] disabled:opacity-40 disabled:pointer-events-none shadow-[2px_2px_0px_0px_#000] transition-all flex items-center gap-1"
                >
                  <span className="hidden sm:inline">{t("next", "Next")}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={saveAndNext}
                  className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white border-2 border-black font-black text-xs tracking-wide shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 sm:gap-1.5"
                >
                  <span>{t("saveAndNext", "Save & Next")}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* RIGHT PANEL: Question Palette (30% on Desktop = 3-4 cols) */}
          {/* ================================================================= */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-4">
            <PaletteCard
              questions={questions}
              currentIndex={currentQuestionIndex}
              getStatus={getQuestionStatus}
              onSelectQuestion={jumpToQuestion}
              counts={counts}
            />
          </aside>
        </main>

        {/* =================================================================== */}
        {/* MOBILE QUESTION PALETTE DRAWER / BOTTOM SHEET */}
        {/* =================================================================== */}
        {mobilePaletteOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
            <div className="w-full max-h-[85vh] bg-white rounded-t-xl border-t-2 border-x-2 border-black p-5 overflow-y-auto shadow-[8px_8px_0px_0px_#000] animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                <h3 className="text-sm font-black text-black">
                  {t("questionPalette", "Question Palette")} ({t("question", "Questions")} 1 {t("of", "to")} {questions.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setMobilePaletteOpen(false)}
                  className="p-1 rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000]"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              <PaletteCard
                questions={questions}
                currentIndex={currentQuestionIndex}
                getStatus={getQuestionStatus}
                onSelectQuestion={(idx) => {
                  jumpToQuestion(idx);
                  setMobilePaletteOpen(false);
                }}
                counts={counts}
              />
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SUBMISSION CONFIRMATION MODAL */}
        {/* =================================================================== */}
        <CBTSubmitModal />
      </div>
    </CBTErrorBoundary>
  );
}

// Sub-component: Question Palette Card with NTA Color Codes & Summary Count Legend
interface PaletteProps {
  questions: Question[];
  currentIndex: number;
  getStatus: (qId: string) => QuestionStatus;
  onSelectQuestion: (index: number) => void;
  counts: {
    answered: number;
    notAnswered: number;
    notVisited: number;
    markedReview: number;
    answeredMarkedReview: number;
    total: number;
  };
}

function PaletteCard({
  questions,
  currentIndex,
  getStatus,
  onSelectQuestion,
  counts,
}: PaletteProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black">
        <h2 className="font-black text-black text-xs uppercase tracking-wider">
          {t("questionPalette", "Question Palette")}
        </h2>
        <span className="text-[11px] font-black text-black bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
          {questions.length} {t("questionsCount", "Questions")}
        </span>
      </div>

      {/* Official NTA 5-State Summary Count Legend */}
      <div className="grid grid-cols-2 gap-2 my-4 text-[11px] font-bold text-black">
        {/* Answered: Green */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[#10B981] text-black text-[10px] flex items-center justify-center font-black font-mono shrink-0 border border-black shadow-[1px_1px_0px_0px_#000]">
            {counts.answered}
          </span>
          <span className="truncate">{t("answered", "Answered")}</span>
        </div>

        {/* Not Answered: Red */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[#FF5C5C] text-white text-[10px] flex items-center justify-center font-black font-mono shrink-0 border border-black shadow-[1px_1px_0px_0px_#000]">
            {counts.notAnswered}
          </span>
          <span className="truncate">{t("notAnswered", "Not Answered")}</span>
        </div>

        {/* Marked for Review: Amber */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[#F59E0B] text-black text-[10px] flex items-center justify-center font-black font-mono shrink-0 border border-black shadow-[1px_1px_0px_0px_#000]">
            {counts.markedReview}
          </span>
          <span className="truncate">{t("markedReview", "Marked Review")}</span>
        </div>

        {/* Answered & Marked for Review */}
        <div className="flex items-center gap-2">
          <span className="relative w-5 h-5 rounded bg-[#F59E0B] text-black text-[10px] flex items-center justify-center font-black font-mono shrink-0 border border-black shadow-[1px_1px_0px_0px_#000]">
            {counts.answeredMarkedReview}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-1 ring-black" />
          </span>
          <span className="truncate">{t("ansAndMarked", "Ans & Marked")}</span>
        </div>

        {/* Not Visited: Cream */}
        <div className="col-span-2 flex items-center gap-2 pt-1 border-t border-black/10">
          <span className="w-5 h-5 rounded bg-[#FAF7EE] text-black text-[10px] flex items-center justify-center font-bold font-mono shrink-0 border border-black shadow-[1px_1px_0px_0px_#000]">
            {counts.notVisited}
          </span>
          <span>{t("notVisited", "Not Visited")}</span>
        </div>
      </div>

      {/* Numbered Grid (1 to N) */}
      <div className="grid grid-cols-5 gap-1.5 max-h-[340px] overflow-y-auto p-2 bg-[#FAF7EE] rounded-xl border-2 border-black">
        {questions.map((q, idx) => {
          const status = getStatus(q.id);
          const isCurrent = idx === currentIndex;

          let colorClasses = "bg-white text-black hover:bg-black/5";
          let hasTick = false;

          if (status === "answered") {
            colorClasses = "bg-[#10B981] text-black font-black";
          } else if (status === "not_answered") {
            colorClasses = "bg-[#FF5C5C] text-white font-black";
          } else if (status === "marked_review") {
            colorClasses = "bg-[#F59E0B] text-black font-black";
          } else if (status === "answered_marked_review") {
            colorClasses = "bg-[#F59E0B] text-black font-black";
            hasTick = true;
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-9 rounded text-xs font-mono font-black transition-all flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#000] ${colorClasses} ${
                isCurrent
                  ? "ring-2 ring-black scale-105 z-10 shadow-[2px_2px_0px_0px_#000]"
                  : ""
              }`}
              title={`Question ${idx + 1}: ${status.replace("_", " ")}`}
            >
              <span>{idx + 1}</span>
              {hasTick && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-1 ring-black" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
