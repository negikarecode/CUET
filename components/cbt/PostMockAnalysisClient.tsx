"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  BarChart3,
  Brain,
  Filter,
  Hourglass,
  Layers,
  Loader2,
  RotateCcw,
  Sparkles,
  Target,
  Trophy as TrophyIcon,
  Zap,
} from "lucide-react";
import {
  PostMockDeterministicReport,
  AIPostMockInsight,
  NormalizedDifficulty,
} from "@/types/postMockAnalysis";
import { Trophy } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { getTestAttemptStats } from "@/lib/analytics";
import MathRenderer from "@/components/cbt/MathRenderer";

interface PostMockAnalysisClientProps {
  report: PostMockDeterministicReport;
  onRetake?: () => void;
  initialSelectedChapter?: string;
  initialSelectedDifficulty?: NormalizedDifficulty;
  earnedXP?: number;
  unlockedTrophies?: Trophy[];
  attemptsCount?: number;
  bestMarks?: number;
  bestAccuracy?: number;
  isNewPersonalBest?: boolean;
  scoreImprovement?: number;
}

export default function PostMockAnalysisClient({
  report,
  onRetake,
  initialSelectedChapter,
  initialSelectedDifficulty,
  earnedXP: propEarnedXP,
  unlockedTrophies: propUnlockedTrophies,
  attemptsCount: propAttemptsCount,
  bestMarks: propBestMarks,
  bestAccuracy: propBestAccuracy,
  isNewPersonalBest: propIsNewPersonalBest,
  scoreImprovement: propScoreImprovement,
}: PostMockAnalysisClientProps) {
  const router = useRouter();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const { overall, difficultyBreakdown, chapterBreakdown, chapterDifficultyMatrix, allQuestions } =
    report;

  // Derive all-time personal best stats if not explicitly passed as props
  const computedStats = useMemo(() => {
    if (propAttemptsCount !== undefined) {
      return {
        attemptsCount: propAttemptsCount,
        bestMarks: propBestMarks ?? overall.totalMarks,
        bestAccuracy: propBestAccuracy ?? overall.accuracyPercentage,
        isNewPersonalBest: propIsNewPersonalBest ?? true,
        scoreImprovement: propScoreImprovement ?? 0,
      };
    }
    const stats = getTestAttemptStats(testAttempts, report.testId);
    const count = Math.max(1, stats.attemptsCount);
    const bestAtt = stats.bestAttempt;
    const currentMarks = overall.totalMarks;
    const currentAcc = overall.accuracyPercentage;
    const bMarks = bestAtt ? Math.max(bestAtt.totalMarks, currentMarks) : currentMarks;
    const bAcc =
      bestAtt && bestAtt.totalMarks > currentMarks ? bestAtt.accuracyPercentage : currentAcc;
    const isNewPB = !bestAtt || currentMarks >= bestAtt.totalMarks;
    const improvement = bestAtt && currentMarks > bestAtt.totalMarks ? currentMarks - bestAtt.totalMarks : 0;
    return {
      attemptsCount: count,
      bestMarks: bMarks,
      bestAccuracy: bAcc,
      isNewPersonalBest: isNewPB,
      scoreImprovement: improvement,
    };
  }, [
    propAttemptsCount,
    propBestMarks,
    propBestAccuracy,
    propIsNewPersonalBest,
    propScoreImprovement,
    testAttempts,
    report.testId,
    overall.totalMarks,
    overall.accuracyPercentage,
  ]);

  const attemptsCount = computedStats.attemptsCount;
  const bestMarks = computedStats.bestMarks;
  const bestAccuracy = computedStats.bestAccuracy;
  const isNewPersonalBest = computedStats.isNewPersonalBest;
  const scoreImprovement = computedStats.scoreImprovement;

  // Selected Chapter for deeper Chapter × Difficulty breakdown
  const [selectedChapter, setSelectedChapter] = useState<string>(
    initialSelectedChapter || chapterBreakdown[0]?.chapter || "Core Chapter"
  );

  // Active filter for Question Review section
  const [filterDifficulty, setFilterDifficulty] = useState<NormalizedDifficulty | "all">(
    initialSelectedDifficulty || "all"
  );
  const [filterChapter, setFilterChapter] = useState<string>("all");
  const [filterResult, setFilterResult] = useState<"all" | "correct" | "incorrect" | "skipped">(
    "all"
  );
  // Specific question ID filter (e.g. from clicking "Inspect evidence" on AI pattern or chapter)
  const [filterQuestionIds, setFilterQuestionIds] = useState<string[] | null>(null);
  const [activeEvidenceLabel, setActiveEvidenceLabel] = useState<string | null>(null);

  // AI Interpretation State
  const [aiInsight, setAiInsight] = useState<AIPostMockInsight | null>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState(false);

  // Ref to question review container for smooth scrolling
  const questionReviewRef = useRef<HTMLDivElement>(null);

  // Fetch or trigger Post-Mock AI Insight
  useEffect(() => {
    let isMounted = true;
    setAiLoading(true);
    setAiError(false);

    fetch("/api/ai/post-mock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report, userId: report.userId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("AI insight service error");
        return res.json();
      })
      .then((data) => {
        if (isMounted && data?.aiInsight) {
          setAiInsight(data.aiInsight);
          setAiLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn("AI post-mock fetch notice:", err);
          setAiError(true);
          setAiLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [report]);

  // Data for selected chapter in Chapter × Difficulty breakdown
  const currentChapterMatrixRow = chapterDifficultyMatrix[selectedChapter] || null;

  // Click-through to question review
  const handleInspectSlice = (options: {
    chapter?: string;
    difficulty?: NormalizedDifficulty | "all";
    result?: "all" | "correct" | "incorrect" | "skipped";
    questionIds?: string[];
    evidenceLabel?: string;
  }) => {
    if (options.questionIds) {
      setFilterQuestionIds(options.questionIds);
      setActiveEvidenceLabel(options.evidenceLabel || `${options.questionIds.length} Question Evidence`);
      setFilterChapter("all");
      setFilterDifficulty("all");
      setFilterResult("all");
    } else {
      setFilterQuestionIds(null);
      setActiveEvidenceLabel(null);
      if (options.chapter !== undefined) setFilterChapter(options.chapter);
      if (options.difficulty !== undefined) setFilterDifficulty(options.difficulty);
      if (options.result !== undefined) setFilterResult(options.result);
    }

    setTimeout(() => {
      questionReviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // Filtered Questions for Click-Through Question Review
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      if (filterQuestionIds !== null) {
        return filterQuestionIds.includes(q.questionId);
      }
      if (filterDifficulty !== "all" && q.difficulty !== filterDifficulty) return false;
      if (filterChapter !== "all" && q.chapter !== filterChapter) return false;
      if (filterResult === "correct" && q.isCorrect !== true) return false;
      if (filterResult === "incorrect" && (q.isCorrect !== false || !q.isAttempted)) return false;
      if (filterResult === "skipped" && !q.isSkipped) return false;
      return true;
    });
  }, [allQuestions, filterQuestionIds, filterDifficulty, filterChapter, filterResult]);

  const minutesTaken = Math.floor(overall.totalTimeSeconds / 60);
  const secondsTaken = overall.totalTimeSeconds % 60;
  const timeTakenFormatted = `${minutesTaken}m ${secondsTaken.toString().padStart(2, "0")}s`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Simple Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/mocks"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <span>←</span>
            <span>Mocks History</span>
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200 font-mono">
            POST-MOCK RESULTS
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onRetake ? (
            <button
              type="button"
              onClick={onRetake}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
              <span>Retake Mock</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push(`/test/${report.testId}?reattempt=true`)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
              <span>Retake Mock</span>
            </button>
          )}
          <Link
            href="/dashboard/mocks"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all"
          >
            Back to Mocks
          </Link>
        </div>
      </div>

      {/* SECTION 1 — OFFICIAL SCORECARD */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-200/80 shadow-xs">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              Official NTA CUET CBT Scorecard
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {report.testTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Subject: <span className="font-semibold text-slate-700">{report.subject}</span> · Completed on{" "}
              {new Date(report.submittedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Scoring Rule: +5 Correct | -1 Incorrect | 0 Unattempted
            </p>
          </div>
        </div>

        {/* Primary Deterministic Scorecard Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6 pt-6 border-t border-slate-100">
          {/* Score */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Score</span>
              {propEarnedXP && propEarnedXP > 0 ? (
                <span className="text-[9px] font-semibold font-mono bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full border border-amber-200">
                  +{propEarnedXP} XP
                </span>
              ) : null}
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-slate-900">
              {overall.totalMarks}{" "}
              <span className="text-xs font-medium text-slate-400">/ {overall.maxMarks}</span>
            </p>
            <p className="text-[10px] text-blue-600 font-semibold mt-1">
              {overall.totalMarks >= 225
                ? "Top 99th %tile"
                : overall.totalMarks >= 175
                ? "DU North Campus"
                : "Remediation"}
            </p>
          </div>

          {/* Accuracy */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 shadow-xs">
            <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Accuracy</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-slate-900">
              {overall.accuracyPercentage}%
            </p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">
              {overall.correctCount} of {overall.attemptedCount} attempted
            </p>
          </div>

          {/* Correct */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 shadow-xs">
            <span className="text-[10px] font-semibold uppercase text-emerald-600 tracking-wider">Correct</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-emerald-600">
              {overall.correctCount}
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">
              +{overall.correctCount * 5} marks
            </p>
          </div>

          {/* Incorrect */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 shadow-xs">
            <span className="text-[10px] font-semibold uppercase text-rose-600 tracking-wider">Incorrect</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-rose-600">
              {overall.incorrectCount}
            </p>
            <p className="text-[10px] text-rose-600 font-semibold mt-1">
              -{overall.incorrectCount} penalty
            </p>
          </div>

          {/* Unattempted / Skipped */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 shadow-xs">
            <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Unattempted</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-slate-600">
              {overall.skippedCount}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              0 penalty
            </p>
          </div>

          {/* Time Elapsed & Time Sinks */}
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Time Elapsed</span>
              {overall.timeSinkCount > 0 && (
                <span className="text-[9px] font-semibold font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded-full border border-rose-200">
                  {overall.timeSinkCount} Sinks
                </span>
              )}
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-slate-900">
              {timeTakenFormatted}
            </p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">
              Allocated: 60m ({overall.avgTimePerQuestionSeconds}s/Q)
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2 — BEST RESULT / ATTEMPT HISTORY */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs">
            <TrophyIcon className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-semibold uppercase bg-slate-900 text-white px-2.5 py-0.5 rounded-full font-mono">
                Paper Benchmark
              </span>
              {attemptsCount <= 1 ? (
                <span className="text-[10px] font-semibold uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full shadow-xs">
                  Initial Baseline Recorded
                </span>
              ) : isNewPersonalBest ? (
                <span className="text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-xs">
                  New Personal Best!
                </span>
              ) : (
                <span className="text-[10px] font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full shadow-xs">
                  Personal Best Tracker
                </span>
              )}
              <span className="text-[10px] font-medium uppercase bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-0.5 rounded-full">
                {attemptsCount} {attemptsCount === 1 ? "Attempt" : "Attempts"} Total
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 pt-0.5">
              <span>Best Result: {bestMarks} / {overall.maxMarks} Marks</span>
              <span className="text-sm font-medium text-slate-500 font-mono">({bestAccuracy}% Accuracy)</span>
            </h2>

            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              {attemptsCount <= 1
                ? "This is your first completed attempt on this paper. Use the option to re-attempt anytime and strive for 225+ North Campus score!"
                : isNewPersonalBest && scoreImprovement > 0
                ? `Incredible progress! You outperformed your previous high by +${scoreImprovement} marks on this test.`
                : isNewPersonalBest
                ? "You matched your all-time high score on this test."
                : `Your personal best on this paper is ${bestMarks} marks (${bestAccuracy}% accuracy). You scored ${overall.totalMarks} marks in this run.`}
            </p>
          </div>
        </div>

        {/* Trophies celebration if unlocked */}
        {propUnlockedTrophies && propUnlockedTrophies.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-3 shrink-0 shadow-xs">
            <Award className="w-5 h-5 text-amber-600" />
            <div className="text-xs font-semibold text-amber-900">
              <span className="font-bold">Unlocked: </span>
              {propUnlockedTrophies.map((t) => t.title).join(", ")}
            </div>
          </div>
        )}
      </div>

      {/* 2. DIFFICULTY ANALYSIS */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Difficulty Breakdown</span>
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Accuracy and penalty distribution partitioned across difficulty tiers present in this mock.
            </p>
          </div>
          <span className="text-[11px] font-medium text-slate-500 font-mono">
            Click any tier to filter questions below
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {difficultyBreakdown.map((item) => {
            const badgeBg =
              item.difficulty === "easy"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : item.difficulty === "medium"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : item.difficulty === "hard"
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-slate-100 text-slate-700 border-slate-200";

            return (
              <button
                key={item.difficulty}
                type="button"
                onClick={() =>
                  handleInspectSlice({
                    difficulty: item.difficulty,
                    chapter: "all",
                    result: "all",
                  })
                }
                className="text-left p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border shadow-xs ${badgeBg}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-800">
                    {item.attempted > 0 ? `${item.accuracy}% Accuracy` : "Unattempted"}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-2xl font-bold text-slate-900 font-mono">
                    {item.correct}{" "}
                    <span className="text-sm font-medium text-slate-400">/ {item.attempted}</span>
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {item.totalQuestions} Questions
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 mt-3 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      item.accuracy >= 75
                        ? "bg-emerald-500"
                        : item.accuracy >= 50
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 mt-3 pt-2.5 border-t border-slate-200/60">
                  <span className="text-emerald-600">+{item.correct} correct</span>
                  <span className="text-rose-600">-{item.incorrect} wrong</span>
                  <span className="text-slate-400">{item.skipped} skipped</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CHAPTER-WISE ANALYSIS */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Chapter-wise Performance</span>
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Sorted by number of questions in this mock.
            </p>
          </div>
          <span className="text-[11px] font-medium text-slate-500 font-mono">
            {chapterBreakdown.length} Chapters Tested
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500 bg-slate-50/70">
                <th className="py-2.5 px-3">Chapter</th>
                <th className="py-2.5 px-3 text-center">Questions</th>
                <th className="py-2.5 px-3 text-center">Attempted</th>
                <th className="py-2.5 px-3 text-center text-emerald-600">Correct</th>
                <th className="py-2.5 px-3 text-center text-rose-600">Incorrect</th>
                <th className="py-2.5 px-3 text-center">Accuracy</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y border-b border-slate-200 text-xs font-medium text-slate-800">
              {chapterBreakdown.map((row) => (
                <tr
                  key={row.chapter}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    selectedChapter === row.chapter ? "bg-blue-50/50" : ""
                  }`}
                >
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      onClick={() => setSelectedChapter(row.chapter)}
                      className="font-semibold text-left hover:text-blue-600 text-slate-900 cursor-pointer"
                    >
                      {row.chapter}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{row.totalQuestions}</td>
                  <td className="py-3 px-3 text-center font-mono">{row.attempted}</td>
                  <td className="py-3 px-3 text-center font-mono text-emerald-600 font-semibold">{row.correct}</td>
                  <td className="py-3 px-3 text-center font-mono text-rose-600 font-semibold">{row.incorrect}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-mono font-semibold text-xs border ${
                        row.accuracy >= 75
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : row.accuracy >= 50
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      }`}
                    >
                      {row.accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        handleInspectSlice({
                          chapter: row.chapter,
                          difficulty: "all",
                          result: "all",
                        })
                      }
                      className="px-3 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-semibold transition-all shadow-xs cursor-pointer"
                    >
                      View Qs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. CHAPTER × DIFFICULTY: Deep Concept vs Application Analysis */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>Chapter × Difficulty Analysis</span>
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Inspect how depth of question difficulty affects performance in a specific chapter.
            </p>
          </div>

          {/* Chapter Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">Select Chapter:</span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none shadow-xs cursor-pointer"
            >
              {chapterBreakdown.map((c) => (
                <option key={c.chapter} value={c.chapter}>
                  {c.chapter} ({c.totalQuestions} Qs)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Chapter Breakdown Cards */}
        {currentChapterMatrixRow ? (
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Performance Tiers for &ldquo;{selectedChapter}&rdquo;:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {(["easy", "medium", "hard"] as NormalizedDifficulty[]).map((diff) => {
                const cell = currentChapterMatrixRow[diff];
                const hasQuestions = cell && cell.totalQuestions > 0;
                const isAttempted = cell && cell.attempted > 0;

                return (
                  <div
                    key={diff}
                    className={`p-5 rounded-2xl border flex flex-col justify-between shadow-xs ${
                      hasQuestions ? "bg-slate-50/70 border-slate-200/80" : "bg-slate-50/40 border-slate-200/40 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                        {diff}
                      </span>
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {isAttempted && cell.accuracy !== null ? `${cell.accuracy}%` : "—"}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="text-xl font-bold text-slate-900 font-mono">
                        {hasQuestions ? (
                          isAttempted ? (
                            <>
                              {cell.correct}{" "}
                              <span className="text-xs font-medium text-slate-400">
                                / {cell.attempted} attempted
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-medium text-slate-500">
                              0 attempted
                            </span>
                          )
                        ) : (
                          <span className="text-sm font-normal text-slate-400">
                            No {diff} questions in this mock
                          </span>
                        )}
                      </p>
                      {hasQuestions && (
                        <p className="text-[11px] font-medium text-slate-500 mt-1">
                          {cell.totalQuestions} total questions ({cell.skipped} skipped)
                        </p>
                      )}
                    </div>

                    {hasQuestions && (
                      <button
                        type="button"
                        onClick={() =>
                          handleInspectSlice({
                            chapter: selectedChapter,
                            difficulty: diff,
                            result: "all",
                          })
                        }
                        className="mt-4 w-full py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[11px] transition-all shadow-xs cursor-pointer"
                      >
                        Inspect {diff.toUpperCase()} Questions
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Compact Full-Paper Matrix */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
            Full Chapter × Difficulty Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase text-slate-500">
                  <th className="py-2 px-3 text-left">Chapter</th>
                  <th className="py-2 px-3">Easy</th>
                  <th className="py-2 px-3">Medium</th>
                  <th className="py-2 px-3">Hard</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b border-slate-200 font-mono font-medium">
                {chapterBreakdown.map((ch) => {
                  const row = chapterDifficultyMatrix[ch.chapter];
                  return (
                    <tr key={ch.chapter} className="hover:bg-slate-50/80">
                      <td className="py-2 px-3 text-left font-sans font-semibold text-slate-900">
                        {ch.chapter}
                      </td>
                      <td className="py-2 px-3">
                        {row?.easy?.accuracy !== null ? (
                          <span className="font-semibold text-emerald-600">{row?.easy?.accuracy}%</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {row?.medium?.accuracy !== null ? (
                          <span className="font-semibold text-amber-600">{row?.medium?.accuracy}%</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {row?.hard?.accuracy !== null ? (
                          <span className="font-semibold text-rose-600">{row?.hard?.accuracy}%</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. AI POST-MOCK INSIGHT: Grounded Observational Interpretation */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Brain className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                AI Post-Mock Insights &amp; Observations
              </h2>
              <p className="text-[11px] text-slate-500 font-normal">
                What this single mock reveals about difficulty response and mistake distribution.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200/80 shadow-xs">
            Observational Engine
          </span>
        </div>

        {aiLoading ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-xs font-semibold text-slate-500">
              Generating grounded AI observations from your verified telemetry...
            </p>
          </div>
        ) : aiInsight ? (
          <div className="space-y-4 text-xs font-normal leading-relaxed text-slate-700">
            {/* Summary */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                Mock Summary
              </span>
              <p className="text-sm font-semibold text-slate-900">{aiInsight.summary}</p>
            </div>

            {/* Difficulty Insight */}
            {aiInsight.difficultyInsight && (
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 shadow-xs">
                <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
                  Difficulty Transition
                </span>
                <p className="text-xs font-medium text-slate-800">{aiInsight.difficultyInsight}</p>
              </div>
            )}

            {/* Notable Patterns */}
            {aiInsight.notablePatterns && aiInsight.notablePatterns.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aiInsight.notablePatterns.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
                  >
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{pat.title}</span>
                    </h4>
                    <p className="text-[11px] text-slate-600">{pat.description}</p>
                    {pat.evidenceQuestionIds && pat.evidenceQuestionIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleInspectSlice({
                            questionIds: pat.evidenceQuestionIds,
                            evidenceLabel: `AI Pattern: ${pat.title}`,
                          })
                        }
                        className="mt-2 text-[10px] font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Inspect evidence ({pat.evidenceQuestionIds.length} Qs)
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Recommended Next Steps */}
            {aiInsight.recommendedNextSteps && aiInsight.recommendedNextSteps.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-amber-900 block mb-2 tracking-wider">
                  Recommended Immediate Next Steps:
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-xs font-semibold text-amber-800">
                  {aiInsight.recommendedNextSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500">
              {aiError
                ? "AI insight is temporarily unavailable. All deterministic performance and question data above are fully verified."
                : "AI insight unavailable for this mock. Deterministic analysis above is fully verified."}
            </p>
          </div>
        )}
      </div>

      {/* 6. CLICK-THROUGH QUESTION REVIEW */}
      <div
        ref={questionReviewRef}
        className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden"
      >
        {/* Review Filter Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                <span>Question Evidence &amp; Verification</span>
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Every metric above is backed by the questions below. Filter by chapter, difficulty, or result.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-xl shadow-xs">
              Showing {filteredQuestions.length} of {allQuestions.length} Qs
            </span>
          </div>

          {/* Active Evidence Inspection Banner */}
          {filterQuestionIds !== null && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900">
              <span>
                Filtered by: <span className="font-bold text-amber-950">{activeEvidenceLabel || "Evidence Slice"}</span> ({filteredQuestions.length} Questions)
              </span>
              <button
                type="button"
                onClick={() => {
                  setFilterQuestionIds(null);
                  setActiveEvidenceLabel(null);
                }}
                className="px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-800 cursor-pointer shadow-xs"
              >
                Clear Evidence Filter
              </button>
            </div>
          )}

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
            {/* Result Filter */}
            <span className="text-[11px] font-semibold text-slate-600 mr-1">Result:</span>
            <button
              type="button"
              onClick={() => {
                setFilterQuestionIds(null);
                setActiveEvidenceLabel(null);
                setFilterResult("all");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all shadow-xs ${
                filterResult === "all" && filterQuestionIds === null
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterQuestionIds(null);
                setActiveEvidenceLabel(null);
                setFilterResult("correct");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all shadow-xs ${
                filterResult === "correct"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 hover:bg-emerald-50 border-slate-200"
              }`}
            >
              Correct ({overall.correctCount})
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterQuestionIds(null);
                setActiveEvidenceLabel(null);
                setFilterResult("incorrect");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all shadow-xs ${
                filterResult === "incorrect"
                  ? "bg-rose-600 text-white border-rose-600"
                  : "bg-white text-slate-700 hover:bg-rose-50 border-slate-200"
              }`}
            >
              Incorrect ({overall.incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterQuestionIds(null);
                setActiveEvidenceLabel(null);
                setFilterResult("skipped");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all shadow-xs ${
                filterResult === "skipped"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              Skipped ({overall.skippedCount})
            </button>

            {/* Difficulty Filter */}
            <span className="text-[11px] font-semibold text-slate-600 ml-3 mr-1">Difficulty:</span>
            {(["all", "easy", "medium", "hard", "unknown"] as Array<NormalizedDifficulty | "all">).map(
              (diff) => {
                if (diff !== "all" && !difficultyBreakdown.some((d) => d.difficulty === diff)) {
                  return null;
                }
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => {
                      setFilterQuestionIds(null);
                      setActiveEvidenceLabel(null);
                      setFilterDifficulty(diff);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border uppercase cursor-pointer transition-all shadow-xs ${
                      filterDifficulty === diff && filterQuestionIds === null
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                    }`}
                  >
                    {diff}
                  </button>
                );
              }
            )}

            {/* Chapter Filter */}
            <span className="text-[11px] font-semibold text-slate-600 ml-3 mr-1">Chapter:</span>
            <select
              value={filterQuestionIds !== null ? "custom" : filterChapter}
              onChange={(e) => {
                setFilterQuestionIds(null);
                setActiveEvidenceLabel(null);
                setFilterChapter(e.target.value);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none shadow-xs cursor-pointer"
            >
              {filterQuestionIds !== null && <option value="custom">Evidence Selection</option>}
              <option value="all">All Chapters</option>
              {chapterBreakdown.map((c) => (
                <option key={c.chapter} value={c.chapter}>
                  {c.chapter}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="divide-y divide-slate-100 p-6 space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-sm font-semibold text-slate-700">No questions match the current filter selection.</p>
              <button
                type="button"
                onClick={() => {
                  setFilterDifficulty("all");
                  setFilterChapter("all");
                  setFilterResult("all");
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const isCorrect = q.isCorrect === true;
              const isIncorrect = q.isAttempted && q.isCorrect === false;

              return (
                <div key={q.questionId} className="pt-6 first:pt-0">
                  {/* Status Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-sm text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-xl shadow-xs">
                        Q{q.questionNumber}
                      </span>
                      <span className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                        {q.chapter}
                      </span>
                      <span className="text-[10px] font-semibold uppercase bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {/* Time Spent */}
                      <span
                        className={`inline-flex items-center gap-1 font-mono font-medium px-2.5 py-0.5 rounded-full border shadow-xs ${
                          q.isTimeSink
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        <Hourglass className="w-3 h-3 stroke-[2]" />
                        {q.timeSpentSeconds}s {q.isTimeSink && "(Time Sink >72s)"}
                      </span>

                      {/* Score Result */}
                      {isCorrect ? (
                        <span className="bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                          +5 Marks (Correct)
                        </span>
                      ) : isIncorrect ? (
                        <span className="bg-rose-50 text-rose-700 font-semibold px-2.5 py-0.5 rounded-full border border-rose-200 shadow-xs">
                          -1 Mark (Penalty)
                        </span>
                      ) : (
                        <span className="bg-slate-50 text-slate-600 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
                          0 Marks (Skipped)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prompt */}
                  <div className="font-semibold text-sm text-slate-900 mb-3">
                    <MathRenderer text={q.prompt} />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt) => {
                      const isCandidatePick = q.selectedOption === opt.id;
                      const isTrueCorrect = q.correctOption === opt.id;

                      let optClasses = "border border-slate-200/80 bg-white text-slate-800";
                      if (isTrueCorrect) {
                        optClasses = "border-2 border-emerald-500 bg-emerald-50/70 text-slate-900 font-medium";
                      } else if (isCandidatePick && !isTrueCorrect) {
                        optClasses = "border-2 border-rose-500 bg-rose-50/70 text-slate-900 font-medium";
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl flex items-start gap-2 text-xs shadow-xs transition-all ${optClasses}`}
                        >
                          <span className="font-mono font-bold shrink-0 text-slate-600">({opt.id})</span>
                          <div className="flex-1">
                            <MathRenderer text={opt.text} />
                          </div>
                          {isTrueCorrect && (
                            <span className="text-[10px] font-bold uppercase text-emerald-700 shrink-0">
                              Correct Key
                            </span>
                          )}
                          {isCandidatePick && !isTrueCorrect && (
                            <span className="text-[10px] font-bold uppercase text-rose-700 shrink-0">
                              Your Pick
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation, 3-Level Breakdown & AI Diagnosis with MathRenderer */}
                  {(q.explanation || q.solution?.quick || q.solution?.concept || q.formula || q.keyConcept || q.misconception) && (
                    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs space-y-3 shadow-xs">
                      {q.explanation && (
                        <div className="text-slate-700 leading-relaxed font-normal">
                          <strong className="text-slate-900 font-bold uppercase text-[10px] tracking-wider block mb-1">
                            Verified Solution &amp; NCERT Rationale:
                          </strong>
                          <MathRenderer text={q.explanation} className="text-slate-700 leading-relaxed" />
                          {q.ncertReference && (
                            <span className="text-[10px] font-medium text-slate-500 block pt-1.5">
                              Source: {q.ncertReference}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 3-Level Solution Cards: Quick Takeaway & Core Concept */}
                      {q.solution && (q.solution.quick || q.solution.concept) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                          {q.solution.quick && (
                            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                              <span className="text-[10px] font-bold uppercase text-blue-600 block mb-0.5">
                                30-Sec Takeaway
                              </span>
                              <MathRenderer
                                text={q.solution.quick}
                                className="text-slate-800 font-medium text-[11px] leading-relaxed"
                              />
                            </div>
                          )}
                          {q.solution.concept && (
                            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                              <span className="text-[10px] font-bold uppercase text-emerald-600 block mb-0.5">
                                Core NCERT Concept
                              </span>
                              <MathRenderer
                                text={q.solution.concept}
                                className="text-slate-800 font-medium text-[11px] leading-relaxed"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Formula / Key Concept Highlight */}
                      {(q.formula || q.keyConcept) && (
                        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-slate-900 shadow-xs">
                          <span className="text-[10px] font-bold uppercase text-amber-900 block mb-0.5">
                            Formula / Principle
                          </span>
                          <MathRenderer
                            text={q.formula || q.keyConcept || ""}
                            className="font-medium text-[11px] leading-relaxed text-amber-950"
                          />
                        </div>
                      )}

                      {/* Common Misconception Alert */}
                      {q.misconception && (
                        <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-slate-900 shadow-xs">
                          <span className="text-[10px] font-bold uppercase text-rose-800 block mb-0.5">
                            Common Trap / Misconception
                          </span>
                          <MathRenderer
                            text={q.misconception.description || ""}
                            className="font-medium text-[11px] leading-relaxed text-rose-950"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* SECTION 8 — FINAL ACTIONS BAR */}
      <div className="p-6 bg-slate-50/80 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
            <span>Next Steps for CUET Domain Mastery</span>
            <span className="text-xs font-medium text-slate-500 font-mono">
              (Personal Best: {bestMarks} / {overall.maxMarks})
            </span>
          </h4>
          <p className="text-xs text-slate-500 font-normal max-w-xl">
            Focus on eliminating recurring error patterns before the real CUET exam. Review your incorrect questions or trigger targeted chapter repair drills.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
          {overall.incorrectCount > 0 && (
            <button
              type="button"
              onClick={() => {
                handleInspectSlice({ result: "incorrect" });
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              Review {overall.incorrectCount} Incorrect Questions
            </button>
          )}

          <Link
            href="/dashboard/radar"
            className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 font-semibold text-xs border border-amber-200 shadow-xs transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Targeted Weakness Practice</span>
          </Link>

          {onRetake ? (
            <button
              type="button"
              onClick={onRetake}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
              <span>Retake Mock</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push(`/test/${report.testId}?reattempt=true`)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
              <span>Retake Mock</span>
            </button>
          )}

          <Link
            href="/dashboard/mocks"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all"
          >
            Back to Mocks
          </Link>
        </div>
      </div>
    </div>
  );
}
