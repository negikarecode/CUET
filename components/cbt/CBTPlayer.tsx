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
  ArrowLeft,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { Question, QuestionStatus } from "@/types";
import CBTSubmitModal from "./CBTSubmitModal";
import CBTExitWarningModal from "./CBTExitWarningModal";
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
  const openExitModal = useCBTStore((state) => state.openExitModal);
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

  // Intercept window/tab close or refresh attempts during active test with standard browser confirmation
  useEffect(() => {
    if (isSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      const msg = "Warning: No test data will be recorded if you close or leave this test.";
      e.returnValue = msg;
      return msg;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.onbeforeunload = null;
    };
  }, [isSubmitted]);

  // Intercept browser back button / swipe back gesture during active test
  useEffect(() => {
    if (isSubmitted) return;

    // Push initial history state to intercept the back action
    window.history.pushState({ cbtActiveSession: true }, "", window.location.href);

    const handlePopState = () => {
      if (!isSubmitted) {
        // Prevent navigating away immediately by re-pushing current state
        window.history.pushState({ cbtActiveSession: true }, "", window.location.href);
        // Show the exit warning modal informing user that no data will be recorded
        openExitModal();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isSubmitted, openExitModal]);

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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="text-center p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
          <p className="text-sm font-semibold text-slate-800">No active test questions loaded.</p>
        </div>
      </div>
    );
  }

  const currentAnswer = questionStates[currentQ.id];
  const selectedOption = currentAnswer?.selectedOption ?? null;
  const counts = getSummaryCounts();

  return (
    <CBTErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] select-none text-slate-900">
        {/* =================================================================== */}
        {/* HEADER BAR: Subject Title, Countdown Timer, Submit Action */}
        {/* =================================================================== */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Exit/Back Button, Test Paper & Subject Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <button
                type="button"
                onClick={openExitModal}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                title={t("exitTestTooltip", "Exit Test (Warning: No data will be recorded)")}
                aria-label="Exit Test"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                <span className="hidden sm:inline">{t("back", "Back")}</span>
              </button>

              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                CBT
              </div>
              <div className="truncate min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-xs sm:text-base font-bold text-slate-900 truncate">
                    {testMeta?.title ?? examConfig.name}
                  </h1>
                  <span className="hidden md:inline rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase">
                    {questions.length <= 15 || testMeta?.title?.toLowerCase().includes("repair")
                      ? `Adaptive Repair Drill • ${questions.length} Questions`
                      : t("compulsoryBadge", `${examConfig.totalQuestions} Compulsory Qs`)}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate hidden sm:block">
                  {questions.length <= 15 || testMeta?.title?.toLowerCase().includes("repair") ? (
                    <>
                      {t("subjectLabel", "Subject:")} <span className="font-semibold text-slate-700">{testMeta?.subject}</span> • Target: <span className="font-semibold text-emerald-600">80%+ Mastery</span> • ~{Math.ceil(remainingSeconds / 60)} mins
                    </>
                  ) : (
                    <>
                      {t("subjectLabel", "Subject:")} <span className="font-semibold text-slate-700">{testMeta?.subject}</span> ({testMeta?.code}) • {t("markingInfo", `Marking: +${examConfig.correctMarks} / ${examConfig.incorrectMarks} / 0`)}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Center / Right: Countdown Timer & Submit Button */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Countdown Timer */}
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl border font-mono transition-colors shadow-xs ${
                  isUnder5Minutes
                    ? "bg-rose-50 border-rose-200 text-rose-700 font-bold animate-pulse"
                    : "bg-slate-50 border-slate-200 text-slate-800"
                }`}
                title="Continuous Real Exam Countdown Timer"
              >
                <Clock
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2] ${
                    isUnder5Minutes ? "text-rose-600" : "text-amber-500"
                  }`}
                />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] sm:text-[9px] uppercase font-semibold text-slate-400 hidden sm:inline">
                    {t("timeLeft", "Time Left")}
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-wider" translate="no">
                    {formatTimer(remainingSeconds)}
                  </span>
                </div>
              </div>

              {/* Mobile Palette Toggle Button */}
              <button
                type="button"
                onClick={() => setMobilePaletteOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-1 text-xs font-semibold"
                aria-label="Open Question Palette"
              >
                <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                <span className="hidden sm:inline">{t("palette", "Palette")}</span>
              </button>

              {/* Submit Test Button */}
              <button
                type="button"
                onClick={openSubmitModal}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow transition-all flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2]" />
                <span className="hidden sm:inline">
                  {questions.length <= 15 || testMeta?.title?.toLowerCase().includes("repair")
                    ? "Submit Drill"
                    : t("submitTest", "Submit Test")}
                </span>
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
          <section className="lg:col-span-8 xl:col-span-9 flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Question Workspace Sub-header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-50/70 border-b border-slate-200/80 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-semibold text-blue-700 text-xs bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-lg">
                  {t("question", "Question")} {currentQuestionIndex + 1} {t("of", "of")} {questions.length}
                </span>
                <div className="text-slate-700 font-medium hidden sm:inline">
                  <MathRenderer text={currentQ.topic} inline />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px]">
                {/* Official NTA Language Switcher (13 CUET Official Languages) */}
                <LanguageSelector variant="cbt" />

                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                  {t("marksPlus", "Marks: +5")}
                </span>
                <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-semibold">
                  {t("marksMinus", "Negative: -1")}
                </span>
                {currentAnswer?.timeSpentSeconds ? (
                  <span className="text-slate-500 hidden md:inline font-medium">
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
                      className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        isChecked
                          ? "bg-blue-50/70 border-blue-600 text-slate-900 shadow-xs"
                          : "bg-white hover:bg-slate-50/80 border-slate-200/80 text-slate-800 hover:border-slate-300"
                      }`}
                    >
                      {/* Radio Circle */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs shrink-0 mt-0.5 transition-all ${
                          isChecked
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                        translate="no"
                      >
                        {opt.id}
                      </div>

                      {/* Option Text with MathRenderer and translation stem */}
                      <div className="text-sm font-medium leading-relaxed pt-0.5 flex-1">
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
            <div className="p-3.5 sm:p-5 bg-slate-50/70 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              {/* Left Actions: Clear & Mark for Review */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={clearResponse}
                  disabled={selectedOption === null}
                  className="px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all"
                >
                  <span className="hidden sm:inline">{t("clearResponse", "Clear Response")}</span>
                  <span className="sm:hidden">{t("clear", "Clear")}</span>
                </button>

                <button
                  type="button"
                  onClick={markForReviewAndNext}
                  className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 shadow-xs ${
                    currentAnswer?.isMarkedForReview
                      ? "bg-amber-100 border-amber-300 text-amber-900"
                      : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100/80"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 stroke-[2]" />
                  <span className="hidden sm:inline">{t("markForReview", "Mark for Review & Next")}</span>
                  <span className="sm:hidden">{t("review", "Review & Next")}</span>
                </button>
              </div>

              {/* Right Actions: Prev, Next, Save & Next */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2]" />
                  <span className="hidden sm:inline">{t("previous", "Previous")}</span>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  disabled={currentQuestionIndex >= questions.length - 1}
                  className="px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all flex items-center gap-1"
                >
                  <span className="hidden sm:inline">{t("next", "Next")}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
                </button>

                <button
                  type="button"
                  onClick={saveAndNext}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs tracking-wide shadow-xs hover:shadow transition-all flex items-center gap-1.5"
                >
                  <span>{t("saveAndNext", "Save & Next")}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2]" />
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
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end justify-center">
            <div className="w-full max-h-[85vh] bg-white rounded-t-3xl border-t border-slate-200 p-5 overflow-y-auto shadow-xl animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  {t("questionPalette", "Question Palette")} ({t("question", "Questions")} 1 {t("of", "to")} {questions.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setMobilePaletteOpen(false)}
                  className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-xs"
                >
                  <X className="w-5 h-5 stroke-[2]" />
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

        {/* =================================================================== */}
        {/* EXIT WARNING MODAL (NO DATA RECORDED WARNING) */}
        {/* =================================================================== */}
        <CBTExitWarningModal />
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
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          {t("questionPalette", "Question Palette")}
        </h2>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
          {questions.length} {t("questionsCount", "Questions")}
        </span>
      </div>

      {/* Official NTA 5-State Summary Count Legend */}
      <div className="grid grid-cols-2 gap-2.5 my-4 text-[11px] font-semibold text-slate-700">
        {/* Answered: Emerald */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold font-mono shrink-0 shadow-xs">
            {counts.answered}
          </span>
          <span className="truncate">{t("answered", "Answered")}</span>
        </div>

        {/* Not Answered: Rose */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-lg bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold font-mono shrink-0 shadow-xs">
            {counts.notAnswered}
          </span>
          <span className="truncate">{t("notAnswered", "Not Answered")}</span>
        </div>

        {/* Marked for Review: Amber */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-lg bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold font-mono shrink-0 shadow-xs">
            {counts.markedReview}
          </span>
          <span className="truncate">{t("markedReview", "Marked Review")}</span>
        </div>

        {/* Answered & Marked for Review */}
        <div className="flex items-center gap-2">
          <span className="relative w-5 h-5 rounded-lg bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold font-mono shrink-0 shadow-xs">
            {counts.answeredMarkedReview}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
          </span>
          <span className="truncate">{t("ansAndMarked", "Ans & Marked")}</span>
        </div>

        {/* Not Visited: Slate */}
        <div className="col-span-2 flex items-center gap-2 pt-2 border-t border-slate-100">
          <span className="w-5 h-5 rounded-lg bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center font-semibold font-mono shrink-0 border border-slate-200">
            {counts.notVisited}
          </span>
          <span className="text-slate-500">{t("notVisited", "Not Visited")}</span>
        </div>
      </div>

      {/* Numbered Grid (1 to N) */}
      <div className="grid grid-cols-5 gap-2 max-h-[340px] overflow-y-auto p-2.5 bg-slate-50/70 rounded-2xl border border-slate-200/60">
        {questions.map((q, idx) => {
          const status = getStatus(q.id);
          const isCurrent = idx === currentIndex;

          let colorClasses = "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs";
          let hasTick = false;

          if (status === "answered") {
            colorClasses = "bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-xs";
          } else if (status === "not_answered") {
            colorClasses = "bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-xs";
          } else if (status === "marked_review") {
            colorClasses = "bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-xs";
          } else if (status === "answered_marked_review") {
            colorClasses = "bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-xs";
            hasTick = true;
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-9 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center cursor-pointer ${colorClasses} ${
                isCurrent
                  ? "ring-2 ring-blue-600 ring-offset-2 scale-105 z-10 shadow-sm"
                  : ""
              }`}
              title={`Question ${idx + 1}: ${status.replace("_", " ")}`}
            >
              <span>{idx + 1}</span>
              {hasTick && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
