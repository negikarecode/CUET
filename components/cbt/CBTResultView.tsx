"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Award,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Hourglass,
  Trophy as TrophyIcon,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { calculateXP, updateStreak, evaluateTrophies } from "@/lib/gamification";
import { getTestAttemptStats } from "@/lib/analytics";
import { Trophy, RecordedTestAttempt } from "@/types";
import DiagnosticReportModal from "./DiagnosticReportModal";
import MathRenderer from "./MathRenderer";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function CBTResultView() {
  const { t, translateStem } = useTranslation();
  const testMeta = useCBTStore((state) => state.testMeta);
  const questions = useCBTStore((state) => state.questions);
  const answers = useCBTStore((state) => state.answers);
  const submittedScore = useCBTStore((state) => state.submittedScore);
  const resetSession = useCBTStore((state) => state.resetSession);

  const user = useTestStore((state) => state.user);
  const testAttempts = useTestStore((state) => state.testAttempts);
  const addXP = useTestStore((state) => state.addXP);
  const addCoins = useTestStore((state) => state.addCoins);
  const recordTestAttempt = useTestStore((state) => state.recordTestAttempt);

  const [diagnosticModalOpen, setDiagnosticModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "correct" | "incorrect" | "timesinks" | "unattempted"
  >("all");
  const [earnedXP, setEarnedXP] = useState(0);
  const [unlockedTrophies, setUnlockedTrophies] = useState<Trophy[]>([]);
  const hasProcessedRef = useRef(false);

  // Derive all-time personal best stats for this specific test
  const currentTestId = testMeta?.id ?? "cbt_exam";
  const testStats = getTestAttemptStats(testAttempts, currentTestId);
  const attemptsCount = Math.max(1, testStats.attemptsCount);
  const bestAttempt = testStats.bestAttempt;

  const currentMarks = submittedScore?.totalMarks ?? 0;
  const currentAccuracy = submittedScore?.accuracyPercentage ?? 0;
  const bestMarks = bestAttempt ? Math.max(bestAttempt.totalMarks, currentMarks) : currentMarks;
  const bestAccuracy =
    bestAttempt && bestAttempt.totalMarks > currentMarks
      ? bestAttempt.accuracyPercentage
      : currentAccuracy;
  const isNewPersonalBest = !bestAttempt || currentMarks >= bestAttempt.totalMarks;
  const scoreImprovement =
    bestAttempt && currentMarks > bestAttempt.totalMarks
      ? currentMarks - bestAttempt.totalMarks
      : 0;

  useEffect(() => {
    if (hasProcessedRef.current || !submittedScore) return;
    hasProcessedRef.current = true;

    // 1. Record the complete attempt for Weakness Radar, Accuracy, and Solved Questions analytics
    const questionAttempts = questions.map((q) => {
      const ans = answers[q.id];
      const selectedOption = ans?.selectedOption ?? null;
      const isCorrect =
        selectedOption !== null && selectedOption !== undefined
          ? selectedOption === q.correctOptionId
          : null;
      const timeSpent = ans?.timeSpentSeconds ?? 0;
      return {
        questionId: q.id,
        conceptId: q.conceptId,
        questionNumber: q.questionNumber,
        subject: testMeta?.subject ?? "Physics",
        chapter: q.chapter || q.topic || "Domain Core",
        microTopic: q.topic,
        prompt: q.prompt,
        options: q.options,
        questionType: q.questionType,
        selectedOption,
        correctOption: q.correctOptionId,
        isCorrect,
        timeSpentSeconds: timeSpent,
        isTimeSink: timeSpent > 72,
        ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter || q.topic})`,
        explanation: q.explanation,
      };
    });

    const attemptRecord: RecordedTestAttempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      userId: user.id || "guest",
      testId: testMeta?.id ?? "cbt_exam",
      testTitle: testMeta?.title ?? "CUET Domain Examination Paper",
      subject: testMeta?.subject ?? "Physics",
      totalQuestions: questions.length,
      attemptedCount: submittedScore.attemptedCount,
      unattemptedCount: submittedScore.unattemptedCount,
      correctCount: submittedScore.correctCount,
      incorrectCount: submittedScore.incorrectCount,
      totalMarks: submittedScore.totalMarks,
      maxMarks: submittedScore.maxMarks,
      accuracyPercentage: submittedScore.accuracyPercentage,
      timeTakenSeconds: submittedScore.timeTakenSeconds,
      timeSinkCount: submittedScore.timeSinkCount,
      submittedAt: new Date().toISOString(),
      questions: questionAttempts,
    };

    // Save locally into user store
    recordTestAttempt(attemptRecord);

    // Save asynchronously to Supabase database via API
    fetch("/api/test/record-attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attemptRecord),
    }).catch((err) => {
      console.warn("Background attempt database sync notice:", err);
    });

    const xp = calculateXP(
      submittedScore.correctCount,
      submittedScore.accuracyPercentage,
      submittedScore.timeTakenSeconds,
      questions.length
    );
    setEarnedXP(xp);
    addXP(xp);

    // Update practice streak
    updateStreak(user.id);

    // Evaluate trophy achievements
    evaluateTrophies(user.id, {
      totalQuestions: questions.length,
      correctAnswers: submittedScore.correctCount,
      accuracyPercentage: submittedScore.accuracyPercentage,
      totalTimeSpentSeconds: submittedScore.timeTakenSeconds,
      isRepairQuiz: questions.length <= 5,
      currentStreak: user.dailyStreak,
    }).then((newlyUnlocked) => {
      if (newlyUnlocked.length > 0) {
        setUnlockedTrophies(newlyUnlocked);
        newlyUnlocked.forEach((t) => {
          addXP(t.xp_reward);
          addCoins(t.coin_reward);
        });
      }
    });
  }, [
    submittedScore,
    questions,
    answers,
    testMeta,
    recordTestAttempt,
    user.id,
    user.dailyStreak,
    addXP,
    addCoins,
  ]);

  if (!submittedScore) return null;

  const {
    totalMarks,
    maxMarks,
    correctCount,
    incorrectCount,
    unattemptedCount,
    accuracyPercentage,
    timeTakenSeconds,
    timeSinkCount,
  } = submittedScore;

  const minutesTaken = Math.floor(timeTakenSeconds / 60);
  const secondsTaken = timeTakenSeconds % 60;
  const timeTakenFormatted = `${minutesTaken}m ${secondsTaken.toString().padStart(2, "0")}s`;

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const ans = answers[q.id];
    const isSelected = ans?.selectedOption !== null && ans?.selectedOption !== undefined;
    const isCorrect = isSelected && ans?.selectedOption === q.correctOptionId;
    const isIncorrect = isSelected && ans?.selectedOption !== q.correctOptionId;
    const isTimeSink = (ans?.timeSpentSeconds ?? 0) > 72;

    if (activeFilter === "correct") return isCorrect;
    if (activeFilter === "incorrect") return isIncorrect;
    if (activeFilter === "timesinks") return isTimeSink;
    if (activeFilter === "unattempted") return !isSelected;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-[#FAF7EE] rounded-xl text-black p-6 sm:p-8 border-2 border-black shadow-[6px_6px_0px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-black text-xs font-black uppercase tracking-wider mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              Official NTA CUET CBT Scorecard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
              {testMeta?.title ?? "CUET Domain Examination Paper"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-black/70 font-semibold">
              Scoring Rule: +5 Correct | -1 Incorrect | 0 Unattempted
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setDiagnosticModalOpen(true)}
              className="px-5 py-3 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs flex items-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>{t("aiDiagnosis", "AI Mistake Decrypter & Remedial Quiz")}</span>
            </button>
            <button
              type="button"
              onClick={resetSession}
              className="px-5 py-3 rounded-lg bg-white text-black hover:bg-[#FAF7EE] font-black text-xs flex items-center gap-2 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>{t("retakeTest", "Re-attempt Test")}</span>
            </button>
            <Link
              href="/dashboard"
              className="px-5 py-3 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-xs flex items-center gap-2 shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Home className="w-4 h-4 stroke-[2.5]" />
              <span>{t("backToDashboard", "Dashboard")}</span>
            </Link>
          </div>
        </div>

        {/* Primary Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t-2 border-black/10">
          {/* Total Marks */}
          <div className="bg-white rounded-lg p-4 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-black uppercase tracking-wider text-black/60">
                {t("overallScore", "Net Score")}
              </p>
              {earnedXP > 0 && (
                <span className="text-[10px] font-black font-mono bg-[#FEF3C7] text-black px-1.5 py-0.2 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                  +{earnedXP} XP
                </span>
              )}
            </div>
            <p className="text-3xl sm:text-4xl font-black font-mono mt-1 text-black">
              {totalMarks}{" "}
              <span className="text-sm font-bold text-black/50">
                / {maxMarks}
              </span>
            </p>
            <p className="text-[10px] text-black font-bold mt-1">
              {totalMarks >= 225
                ? "Top 99th Percentile Track"
                : totalMarks >= 175
                ? "North Campus DU Competitive"
                : "Needs Remediation"}
            </p>
          </div>

          {/* Accuracy */}
          <div className="bg-white rounded-lg p-4 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <p className="text-[11px] font-black uppercase tracking-wider text-black/60">
              {t("accuracy", "Accuracy")}
            </p>
            <p className="text-3xl sm:text-4xl font-black font-mono mt-1 text-black">
              {accuracyPercentage}%
            </p>
            <p className="text-[10px] text-black/70 font-semibold mt-1">
              {correctCount} correct of {submittedScore.attemptedCount} attempted
            </p>
          </div>

          {/* Time Taken */}
          <div className="bg-white rounded-lg p-4 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <p className="text-[11px] font-black uppercase tracking-wider text-black/60">
              Time Elapsed
            </p>
            <p className="text-3xl sm:text-4xl font-black font-mono mt-1 text-black">
              {timeTakenFormatted}
            </p>
            <p className="text-[10px] text-black/70 font-semibold mt-1">
              Out of 60m allocated
            </p>
          </div>

          {/* Time Sinks */}
          <div className="bg-white rounded-lg p-4 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <p className="text-[11px] font-black uppercase tracking-wider text-black/60">
              Time-Sinks (&gt;72s)
            </p>
            <p className="text-3xl sm:text-4xl font-black font-mono mt-1 text-[#DC2626]">
              {timeSinkCount}
            </p>
            <p className="text-[10px] text-black/70 font-semibold mt-1">
              Questions slowing your pace
            </p>
          </div>
        </div>
      </div>

      {/* Personal Best Performance Benchmark & Re-attempt Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-white border-2 border-black shadow-[5px_5px_0px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-5 animate-in fade-in duration-300">
        <div className="flex items-start gap-4">
          <div className="w-13 h-13 rounded-xl bg-[#FEF3C7] border-2 border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_#000]">
            <TrophyIcon className="w-7 h-7 text-[#D97706]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase bg-black text-white px-2.5 py-0.5 rounded font-mono">
                Official Paper Benchmark
              </span>
              {attemptsCount <= 1 ? (
                <span className="text-[10px] font-black uppercase bg-[#FEF3C7] text-black border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                  Initial Baseline Recorded
                </span>
              ) : isNewPersonalBest ? (
                <span className="text-[10px] font-black uppercase bg-[#D1FAE5] text-[#065F46] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000] flex items-center gap-1">
                  <span>New Personal Best!</span>
                </span>
              ) : (
                <span className="text-[10px] font-black uppercase bg-[#FAF7EE] text-black border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                  Personal Best Tracker
                </span>
              )}
              <span className="text-[10px] font-black uppercase bg-[#FAF7EE] text-black/80 border border-black px-2 py-0.5 rounded">
                {attemptsCount} {attemptsCount === 1 ? "Attempt" : "Attempts"} Total
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-2 pt-0.5">
              <span>Best Result: {bestMarks} / {maxMarks} Marks</span>
              <span className="text-sm font-bold text-black/60 font-mono">({bestAccuracy}% Accuracy)</span>
            </h2>

            <p className="text-xs text-black/75 font-semibold leading-relaxed">
              {attemptsCount <= 1
                ? "This is your first completed attempt on this paper. Use the option below to re-attempt anytime and strive for 225+ North Campus score!"
                : isNewPersonalBest && scoreImprovement > 0
                ? `Incredible progress! You outperformed your previous high by +${scoreImprovement} marks on this test.`
                : isNewPersonalBest
                ? "You matched your all-time high score on this test."
                : `Your personal best on this paper is ${bestMarks} marks (${bestAccuracy}% accuracy). You scored ${currentMarks} marks in this run.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={resetSession}
            className="px-5 py-3 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>Re-attempt This Test</span>
          </button>
        </div>
      </div>

      {/* Unlocked Trophies & XP Celebration Banner */}
      {unlockedTrophies.length > 0 && (
        <div className="p-5 rounded-xl bg-[#FEF3C7] text-black border-2 border-black shadow-[5px_5px_0px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-lg bg-white border-2 border-black text-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <Award className="w-7 h-7 text-[#F59E0B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded-full border border-black">
                  Achievement Unlocked!
                </span>
              </div>
              <h3 className="text-base font-black text-black mt-1">
                You earned {unlockedTrophies.map((t) => t.title).join(" & ")}!
              </h3>
              <p className="text-xs text-black/80 font-bold">
                Rewards added: +{unlockedTrophies.reduce((acc, t) => acc + t.xp_reward, 0)} XP and +{unlockedTrophies.length * 25} Campus Coins
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg bg-black hover:bg-[#121212] text-white border-2 border-black font-black text-xs shrink-0 shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
          >
            <span>View in Trophy Cabinet</span>
          </Link>
        </div>
      )}

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#D1FAE5] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-xs text-black/60 font-black uppercase">{t("correct", "Correct Answers")}</p>
            <p className="text-2xl font-black text-black font-mono">
              {correctCount}{" "}
              <span className="text-xs text-[#059669] font-black">
                (+{correctCount * 5} marks)
              </span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#FEE2E2] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <XCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-xs text-black/60 font-black uppercase">{t("incorrect", "Incorrect Answers")}</p>
            <p className="text-2xl font-black text-black font-mono">
              {incorrectCount}{" "}
              <span className="text-xs text-[#DC2626] font-black">
                (-{incorrectCount} penalty)
              </span>
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#FAF7EE] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <HelpCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-xs text-black/60 font-black uppercase">{t("unattempted", "Unattempted")}</p>
            <p className="text-2xl font-black text-black font-mono">
              {unattemptedCount}{" "}
              <span className="text-xs text-black/60 font-black">
                (0 penalty)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] overflow-hidden">
        {/* Filter Navigation */}
        <div className="p-6 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF7EE]">
          <div>
            <h2 className="text-lg font-black text-black tracking-tight">
              {t("questionBreakdown", "Detailed Question Post-Mortem & AI Diagnosis")}
            </h2>
            <p className="text-xs text-black/70 font-semibold mt-0.5">
              Review every solution, time spent per question, and diagnostic alerts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black border-2 border-black transition-all ${
                activeFilter === "all"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FEF3C7] shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {t("allQuestions", "All")} ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("correct")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black border-2 border-black transition-all ${
                activeFilter === "correct"
                  ? "bg-[#10B981] text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#D1FAE5] shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {t("correct", "Correct")} ({correctCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("incorrect")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black border-2 border-black transition-all ${
                activeFilter === "incorrect"
                  ? "bg-[#FF5C5C] text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FEE2E2] shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {t("incorrect", "Incorrect")} ({incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("timesinks")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black border-2 border-black transition-all ${
                activeFilter === "timesinks"
                  ? "bg-[#F59E0B] text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FEF3C7] shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {t("timeSinks", "Time-Sinks >72s")} ({timeSinkCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("unattempted")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black border-2 border-black transition-all ${
                activeFilter === "unattempted"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {t("unattempted", "Unattempted")} ({unattemptedCount})
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="divide-y-2 divide-black/10 p-6 space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF7EE]/50 rounded-lg border-2 border-dashed border-black/20">
              <p className="text-sm font-black text-black">
                No questions found under &ldquo;{activeFilter}&rdquo; filter.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q) => {
            const ans = answers[q.id];
            const userChoice = ans?.selectedOption;
            const isAnswered = userChoice !== null && userChoice !== undefined;
            const isCorrect = isAnswered && userChoice === q.correctOptionId;
            const isIncorrect = isAnswered && !isCorrect;
            const timeSpent = ans?.timeSpentSeconds ?? 0;
            const isTimeSink = timeSpent > 72;

            return (
              <div key={q.id} className="pt-6 first:pt-0">
                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-black bg-[#FEF3C7] border border-black px-2.5 py-1 rounded shadow-[1px_1px_0px_0px_#000]">
                      Q{q.questionNumber}
                    </span>
                    <div className="text-xs font-bold text-black">
                      <MathRenderer text={q.topic} inline />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {/* Time Spent Badge */}
                    <span
                      className={`inline-flex items-center gap-1 font-mono font-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000] ${
                        isTimeSink
                          ? "bg-[#FEE2E2] text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      <Hourglass className="w-3 h-3 stroke-[2.5]" />
                      {timeSpent}s {isTimeSink && "(Time Sink >72s)"}
                    </span>

                    {/* Result Badge */}
                    {isCorrect ? (
                      <span className="bg-[#D1FAE5] text-black font-black px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                        +5 {t("correctMarks", "Marks (Correct)")}
                      </span>
                    ) : isIncorrect ? (
                      <span className="bg-[#FEE2E2] text-black font-black px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                        -1 {t("penaltyMarks", "Mark (Penalty)")}
                      </span>
                    ) : (
                      <span className="bg-white text-black font-black px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                        0 {t("skippedMarks", "Marks (Skipped)")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Prompt with MathRenderer */}
                <div className="text-sm font-bold text-black leading-relaxed font-sans whitespace-pre-line">
                  <MathRenderer text={translateStem(q.prompt)} />
                </div>

                {/* Options Review with MathRenderer */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt) => {
                    const isUserPick = userChoice === opt.id;
                    const isRightAnswer = opt.id === q.correctOptionId;

                    let borderClass = "border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000]";
                    if (isRightAnswer) {
                      borderClass = "border-2 border-black bg-[#D1FAE5] text-black font-black shadow-[3px_3px_0px_0px_#000]";
                    } else if (isUserPick && !isRightAnswer) {
                      borderClass = "border-2 border-black bg-[#FEE2E2] text-black font-black shadow-[3px_3px_0px_0px_#000]";
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-lg border-2 flex items-start gap-2.5 ${borderClass}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white border border-black flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5" translate="no">
                          {opt.id}
                        </span>
                        <div className="flex-1">
                          <MathRenderer text={translateStem(opt.text)} inline />
                          {isUserPick && (
                            <span className="ml-2 text-[10px] font-black uppercase tracking-wider text-black/60">
                              {t("yourPick", "(Your Pick)")}
                            </span>
                          )}
                          {isRightAnswer && (
                            <span className="ml-2 text-[10px] font-black uppercase tracking-wider text-[#059669]">
                              {t("correct", "(Correct)")}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Solution, 3-Level Breakdown & AI Diagnosis with MathRenderer */}
                <div className="mt-4 p-4 rounded-xl bg-[#FAF7EE] border-2 border-black text-xs space-y-3 shadow-[3px_3px_0px_0px_#000]">
                  <div className="text-black/80 font-medium leading-relaxed">
                    <strong className="text-black font-black">{t("explanation", "Explanation:")} </strong>
                    <MathRenderer text={q.explanation || q.solution?.detailed || "Standard verified solution based on NCERT guidelines."} className="mt-1" />
                  </div>

                  {/* 3-Level Solution Cards: Quick & Concept */}
                  {q.solution && (q.solution.quick || q.solution.concept) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t-2 border-black/10">
                      {q.solution.quick && (
                        <div className="p-2.5 rounded-lg bg-white border border-black/30">
                          <span className="text-[10px] font-black uppercase text-[#2563EB] block mb-0.5">30-Sec Takeaway</span>
                          <p className="text-black/90 font-semibold text-[11px] leading-snug">{q.solution.quick}</p>
                        </div>
                      )}
                      {q.solution.concept && (
                        <div className="p-2.5 rounded-lg bg-white border border-black/30">
                          <span className="text-[10px] font-black uppercase text-[#059669] block mb-0.5">Core NCERT Concept</span>
                          <p className="text-black/90 font-semibold text-[11px] leading-snug">{q.solution.concept}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Formula / Key Concept Highlight */}
                  {(q.formula || q.keyConcept) && (
                    <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#F59E0B] text-black">
                      <span className="text-[10px] font-black uppercase text-[#B45309] block mb-0.5">Formula / Principle</span>
                      <p className="font-bold text-[11px]">{q.formula || q.keyConcept}</p>
                    </div>
                  )}

                  {/* Common Misconception Alert */}
                  {q.misconception && (
                    <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#EF4444] text-black">
                      <span className="text-[10px] font-black uppercase text-[#DC2626] block mb-0.5">Common Trap / Misconception</span>
                      <p className="font-semibold text-[11px] text-black/90">{q.misconception.description}</p>
                    </div>
                  )}

                  {q.aiDiagnosisNotes && (
                    <div className="pt-2 border-t-2 border-black/10 flex items-start gap-2 text-black">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5 fill-[#F59E0B]" />
                      <div className="font-bold">
                        <MathRenderer text={q.aiDiagnosisNotes} inline />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }))}
        </div>

        {/* Bottom Re-attempt and Navigation Card */}
        <div className="p-6 bg-[#FAF7EE] border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className="text-sm font-black text-black flex items-center gap-2">
              <span>Ready for another run?</span>
              <span className="text-[11px] font-bold text-black/60">
                (Personal Best: {bestMarks} / {maxMarks})
              </span>
            </h4>
            <p className="text-xs text-black/70 font-semibold">
              Re-attempting the mock sharpens time-management and helps eliminate recurring trap mistakes.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={resetSession}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Re-attempt Paper</span>
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* AI NCERT Diagnostic Report & Repair Quiz Modal */}
      <DiagnosticReportModal
        isOpen={diagnosticModalOpen}
        onClose={() => setDiagnosticModalOpen(false)}
        testId={testMeta?.id ?? "cbt_exam"}
      />
    </div>
  );
}
