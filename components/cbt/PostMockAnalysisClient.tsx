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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/mocks"
            className="text-xs font-black text-black hover:underline decoration-2 flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Mocks History</span>
          </Link>
          <span className="text-black/30 font-bold">|</span>
          <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded font-mono">
            POST-MOCK RESULTS
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onRetake ? (
            <button
              type="button"
              onClick={onRetake}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Retake Mock</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push(`/test/${report.testId}?reattempt=true`)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Retake Mock</span>
            </button>
          )}
          <Link
            href="/dashboard/mocks"
            className="px-4 py-2 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Back to Mocks
          </Link>
        </div>
      </div>

      {/* SECTION 1 — OFFICIAL SCORECARD */}
      <div className="bg-[#FAF7EE] rounded-2xl border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-black text-xs font-black uppercase tracking-wider mb-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              Official NTA CUET CBT Scorecard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              {report.testTitle}
            </h1>
            <p className="text-xs sm:text-sm text-black/70 font-semibold mt-1">
              Subject: <span className="font-bold text-black">{report.subject}</span> · Completed on{" "}
              {new Date(report.submittedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-black/60 font-semibold mt-0.5">
              Scoring Rule: +5 Correct | -1 Incorrect | 0 Unattempted
            </p>
          </div>
        </div>

        {/* Primary Deterministic Scorecard Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6 pt-6 border-t-2 border-black/10">
          {/* Score */}
          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Score</span>
              {propEarnedXP && propEarnedXP > 0 ? (
                <span className="text-[9px] font-black font-mono bg-[#FEF3C7] text-black px-1 py-0.2 rounded border border-black">
                  +{propEarnedXP} XP
                </span>
              ) : null}
            </div>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black">
              {overall.totalMarks}{" "}
              <span className="text-xs font-bold text-black/50">/ {overall.maxMarks}</span>
            </p>
            <p className="text-[10px] text-black font-bold mt-1">
              {overall.totalMarks >= 225
                ? "Top 99th %tile"
                : overall.totalMarks >= 175
                ? "DU North Campus"
                : "Remediation"}
            </p>
          </div>

          {/* Accuracy */}
          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Accuracy</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black">
              {overall.accuracyPercentage}%
            </p>
            <p className="text-[10px] text-black/70 font-semibold mt-1">
              {overall.correctCount} of {overall.attemptedCount} attempted
            </p>
          </div>

          {/* Correct */}
          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-[#059669] tracking-wider">Correct</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-[#059669]">
              {overall.correctCount}
            </p>
            <p className="text-[10px] text-[#059669] font-black mt-1">
              +{overall.correctCount * 5} marks
            </p>
          </div>

          {/* Incorrect */}
          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-[#DC2626] tracking-wider">Incorrect</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-[#DC2626]">
              {overall.incorrectCount}
            </p>
            <p className="text-[10px] text-[#DC2626] font-black mt-1">
              -{overall.incorrectCount} penalty
            </p>
          </div>

          {/* Unattempted / Skipped */}
          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Unattempted</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black/70">
              {overall.skippedCount}
            </p>
            <p className="text-[10px] text-black/60 font-black mt-1">
              0 penalty
            </p>
          </div>

          {/* Time Elapsed & Time Sinks */}
          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Time Elapsed</span>
              {overall.timeSinkCount > 0 && (
                <span className="text-[9px] font-black font-mono bg-[#FEE2E2] text-[#DC2626] px-1 py-0.2 rounded border border-black">
                  {overall.timeSinkCount} Sinks
                </span>
              )}
            </div>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black">
              {timeTakenFormatted}
            </p>
            <p className="text-[10px] text-black/70 font-semibold mt-1">
              Allocated: 60m ({overall.avgTimePerQuestionSeconds}s/Q)
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2 — BEST RESULT / ATTEMPT HISTORY */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-black shadow-[5px_5px_0px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_#000]">
            <TrophyIcon className="w-6 h-6 text-[#D97706]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase bg-black text-white px-2.5 py-0.5 rounded font-mono">
                Paper Benchmark
              </span>
              {attemptsCount <= 1 ? (
                <span className="text-[10px] font-black uppercase bg-[#FEF3C7] text-black border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                  Initial Baseline Recorded
                </span>
              ) : isNewPersonalBest ? (
                <span className="text-[10px] font-black uppercase bg-[#D1FAE5] text-[#065F46] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
                  New Personal Best!
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

            <h2 className="text-lg sm:text-xl font-black text-black tracking-tight flex items-center gap-2 pt-0.5">
              <span>Best Result: {bestMarks} / {overall.maxMarks} Marks</span>
              <span className="text-sm font-bold text-black/60 font-mono">({bestAccuracy}% Accuracy)</span>
            </h2>

            <p className="text-xs text-black/75 font-semibold leading-relaxed">
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
          <div className="p-3 rounded-xl bg-[#FEF3C7] border-2 border-black flex items-center gap-3 shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <Award className="w-5 h-5 text-[#F59E0B]" />
            <div className="text-xs font-bold text-black">
              <span className="font-black">Unlocked: </span>
              {propUnlockedTrophies.map((t) => t.title).join(", ")}
            </div>
          </div>
        )}
      </div>

      {/* 2. DIFFICULTY ANALYSIS */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-7 shadow-[5px_5px_0px_0px_#000] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black/10 pb-4">
          <div>
            <h2 className="text-lg font-black text-black tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FF5C5C]" />
              <span>Difficulty Breakdown</span>
            </h2>
            <p className="text-xs text-black/65 font-semibold mt-0.5">
              Accuracy and penalty distribution partitioned across difficulty tiers present in this mock.
            </p>
          </div>
          <span className="text-[11px] font-bold text-black/60 font-mono">
            Click any tier to filter questions below
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {difficultyBreakdown.map((item) => {
            const badgeBg =
              item.difficulty === "easy"
                ? "bg-[#D1FAE5] text-[#065F46]"
                : item.difficulty === "medium"
                ? "bg-[#FEF3C7] text-[#92400E]"
                : item.difficulty === "hard"
                ? "bg-[#FEE2E2] text-[#991B1B]"
                : "bg-slate-100 text-slate-700";

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
                className="text-left p-4 rounded-xl border-2 border-black bg-[#FAF7EE]/50 hover:bg-[#FAF7EE] shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000] ${badgeBg}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs font-mono font-black text-black">
                    {item.attempted > 0 ? `${item.accuracy}% Accuracy` : "Unattempted"}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-2xl font-black text-black font-mono">
                    {item.correct}{" "}
                    <span className="text-sm font-semibold text-black/50">/ {item.attempted}</span>
                  </span>
                  <span className="text-xs font-bold text-black/60">
                    {item.totalQuestions} Questions
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-black/10 mt-3 overflow-hidden border border-black">
                  <div
                    className={`h-full transition-all ${
                      item.accuracy >= 75
                        ? "bg-[#10B981]"
                        : item.accuracy >= 50
                        ? "bg-[#F59E0B]"
                        : "bg-[#FF5C5C]"
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-black/70 mt-2.5 pt-2 border-t border-black/10">
                  <span className="text-[#059669]">+{item.correct} correct</span>
                  <span className="text-[#DC2626]">-{item.incorrect} wrong</span>
                  <span className="text-black/50">{item.skipped} skipped</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CHAPTER-WISE ANALYSIS */}
      <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-7 shadow-[5px_5px_0px_0px_#000] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black/10 pb-4">
          <div>
            <h2 className="text-lg font-black text-black tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#FF5C5C]" />
              <span>Chapter-wise Performance</span>
            </h2>
            <p className="text-xs text-black/65 font-semibold mt-0.5">
              Sorted by number of questions in this mock.
            </p>
          </div>
          <span className="text-[11px] font-bold text-black/60 font-mono">
            {chapterBreakdown.length} Chapters Tested
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black text-[11px] font-black uppercase text-black/70 bg-[#FAF7EE]">
                <th className="py-2.5 px-3">Chapter</th>
                <th className="py-2.5 px-3 text-center">Questions</th>
                <th className="py-2.5 px-3 text-center">Attempted</th>
                <th className="py-2.5 px-3 text-center text-[#059669]">Correct</th>
                <th className="py-2.5 px-3 text-center text-[#DC2626]">Incorrect</th>
                <th className="py-2.5 px-3 text-center">Accuracy</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y border-b-2 border-black text-xs font-bold text-black">
              {chapterBreakdown.map((row) => (
                <tr
                  key={row.chapter}
                  className={`hover:bg-[#FEF3C7]/40 transition-colors ${
                    selectedChapter === row.chapter ? "bg-[#FEF3C7]/60" : ""
                  }`}
                >
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      onClick={() => setSelectedChapter(row.chapter)}
                      className="font-black text-left hover:underline decoration-2 text-black cursor-pointer"
                    >
                      {row.chapter}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{row.totalQuestions}</td>
                  <td className="py-3 px-3 text-center font-mono">{row.attempted}</td>
                  <td className="py-3 px-3 text-center font-mono text-[#059669]">{row.correct}</td>
                  <td className="py-3 px-3 text-center font-mono text-[#DC2626]">{row.incorrect}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-mono font-black text-xs border border-black ${
                        row.accuracy >= 75
                          ? "bg-[#D1FAE5] text-[#065F46]"
                          : row.accuracy >= 50
                          ? "bg-[#FEF3C7] text-[#92400E]"
                          : "bg-[#FEE2E2] text-[#991B1B]"
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
                      className="px-2.5 py-1 rounded bg-white hover:bg-black hover:text-white border border-black text-[11px] font-black transition-all shadow-[1px_1px_0px_0px_#000] cursor-pointer"
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
      <div className="bg-white rounded-2xl border-2 border-black p-6 sm:p-7 shadow-[5px_5px_0px_0px_#000] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black/10 pb-4">
          <div>
            <h2 className="text-lg font-black text-black tracking-tight flex items-center gap-2">
              <Target className="w-5 h-5 text-[#FF5C5C]" />
              <span>Chapter × Difficulty Analysis</span>
            </h2>
            <p className="text-xs text-black/65 font-semibold mt-0.5">
              Inspect how depth of question difficulty affects performance in a specific chapter.
            </p>
          </div>

          {/* Chapter Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-black">Select Chapter:</span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border-2 border-black bg-[#FAF7EE] text-xs font-black text-black focus:outline-none shadow-[2px_2px_0px_0px_#000] cursor-pointer"
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
            <h3 className="text-sm font-black text-black mb-3">
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
                    className={`p-4 rounded-xl border-2 border-black flex flex-col justify-between ${
                      hasQuestions ? "bg-[#FAF7EE]/60" : "bg-slate-50 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-black tracking-wider">
                        {diff}
                      </span>
                      <span className="font-mono font-black text-xs text-black">
                        {isAttempted && cell.accuracy !== null ? `${cell.accuracy}%` : "—"}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="text-xl font-black text-black font-mono">
                        {hasQuestions ? (
                          isAttempted ? (
                            <>
                              {cell.correct}{" "}
                              <span className="text-xs font-semibold text-black/50">
                                / {cell.attempted} attempted
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-black/60">
                              0 attempted
                            </span>
                          )
                        ) : (
                          <span className="text-sm font-semibold text-black/40">
                            No {diff} questions in this mock
                          </span>
                        )}
                      </p>
                      {hasQuestions && (
                        <p className="text-[11px] font-semibold text-black/60 mt-1">
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
                        className="mt-3 w-full py-1.5 rounded-lg border-2 border-black bg-white hover:bg-black hover:text-white font-black text-[11px] transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer"
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
        <div className="pt-4 border-t-2 border-black/10">
          <h3 className="text-xs font-black uppercase text-black/70 tracking-wider mb-2">
            Full Chapter × Difficulty Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-black bg-[#FAF7EE] text-[11px] font-black uppercase">
                  <th className="py-2 px-3 text-left">Chapter</th>
                  <th className="py-2 px-3">Easy</th>
                  <th className="py-2 px-3">Medium</th>
                  <th className="py-2 px-3">Hard</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b-2 border-black font-mono font-bold">
                {chapterBreakdown.map((ch) => {
                  const row = chapterDifficultyMatrix[ch.chapter];
                  return (
                    <tr key={ch.chapter} className="hover:bg-[#FAF7EE]/50">
                      <td className="py-2 px-3 text-left font-sans font-black text-black">
                        {ch.chapter}
                      </td>
                      <td className="py-2 px-3">
                        {row?.easy?.accuracy !== null ? (
                          <span className="font-black text-[#059669]">{row?.easy?.accuracy}%</span>
                        ) : (
                          <span className="text-black/30">—</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {row?.medium?.accuracy !== null ? (
                          <span className="font-black text-[#D97706]">{row?.medium?.accuracy}%</span>
                        ) : (
                          <span className="text-black/30">—</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {row?.hard?.accuracy !== null ? (
                          <span className="font-black text-[#DC2626]">{row?.hard?.accuracy}%</span>
                        ) : (
                          <span className="text-black/30">—</span>
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
      <div className="bg-[#FAF7EE] rounded-2xl border-2 border-black p-6 sm:p-7 shadow-[5px_5px_0px_0px_#000] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF5C5C] text-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
              <Brain className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-black text-black tracking-tight">
                AI Post-Mock Insights &amp; Observations
              </h2>
              <p className="text-[11px] text-black/70 font-semibold">
                What this single mock reveals about difficulty response and mistake distribution.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase bg-[#FEF3C7] text-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
            Observational Engine
          </span>
        </div>

        {aiLoading ? (
          <div className="py-8 flex flex-col items-center justify-center gap-2 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#FF5C5C]" />
            <p className="text-xs font-bold text-black/70">
              Generating grounded AI observations from your verified telemetry...
            </p>
          </div>
        ) : aiInsight ? (
          <div className="space-y-4 text-xs font-semibold leading-relaxed text-black">
            {/* Summary */}
            <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <span className="text-[10px] font-black uppercase text-black/50 block mb-1">
                Mock Summary
              </span>
              <p className="text-sm font-bold text-black">{aiInsight.summary}</p>
            </div>

            {/* Difficulty Insight */}
            {aiInsight.difficultyInsight && (
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-black/50 block mb-1">
                  Difficulty Transition
                </span>
                <p className="text-xs font-bold text-black">{aiInsight.difficultyInsight}</p>
              </div>
            )}

            {/* Notable Patterns */}
            {aiInsight.notablePatterns && aiInsight.notablePatterns.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aiInsight.notablePatterns.map((pat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                  >
                    <h4 className="text-xs font-black text-black flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{pat.title}</span>
                    </h4>
                    <p className="text-[11px] text-black/75">{pat.description}</p>
                    {pat.evidenceQuestionIds && pat.evidenceQuestionIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleInspectSlice({
                            questionIds: pat.evidenceQuestionIds,
                            evidenceLabel: `AI Pattern: ${pat.title}`,
                          })
                        }
                        className="mt-2 text-[10px] font-black text-[#FF5C5C] hover:underline cursor-pointer"
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
              <div className="p-4 rounded-xl bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-black block mb-2 tracking-wider">
                  Recommended Immediate Next Steps:
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-xs font-bold text-black">
                  {aiInsight.recommendedNextSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-white border border-black/20 text-center">
            <p className="text-xs font-bold text-black/60">
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
        className="bg-white rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_#000] overflow-hidden"
      >
        {/* Review Filter Bar */}
        <div className="p-6 border-b-2 border-black bg-[#FAF7EE] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-black tracking-tight flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#FF5C5C]" />
                <span>Question Evidence &amp; Verification</span>
              </h2>
              <p className="text-xs text-black/70 font-semibold mt-0.5">
                Every metric above is backed by the questions below. Filter by chapter, difficulty, or result.
              </p>
            </div>
            <span className="text-xs font-mono font-black text-black bg-white border border-black px-2.5 py-1 rounded shadow-[1px_1px_0px_0px_#000]">
              Showing {filteredQuestions.length} of {allQuestions.length} Qs
            </span>
          </div>

          {/* Active Evidence Inspection Banner */}
          {filterQuestionIds !== null && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FEF3C7] border-2 border-black text-xs font-bold text-black">
              <span>
                Filtered by: <span className="font-black text-black">{activeEvidenceLabel || "Evidence Slice"}</span> ({filteredQuestions.length} Questions)
              </span>
              <button
                type="button"
                onClick={() => {
                  setFilterQuestionIds(null);
                  setActiveEvidenceLabel(null);
                }}
                className="px-2.5 py-1 rounded bg-black text-white text-[11px] font-black hover:bg-neutral-800 cursor-pointer"
              >
                Clear Evidence Filter
              </button>
            </div>
          )}

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
            {/* Result Filter */}
            <span className="text-[11px] font-black text-black mr-1">Result:</span>
            <button
              type="button"
              onClick={() => {
                setFilterQuestionIds(null);
                setActiveEvidenceLabel(null);
                setFilterResult("all");
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black cursor-pointer transition-all ${
                filterResult === "all" && filterQuestionIds === null ? "bg-black text-white" : "bg-white text-black hover:bg-[#FEF3C7]"
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
              className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black cursor-pointer transition-all ${
                filterResult === "correct" ? "bg-[#10B981] text-black" : "bg-white text-black hover:bg-[#D1FAE5]"
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
              className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black cursor-pointer transition-all ${
                filterResult === "incorrect" ? "bg-[#FF5C5C] text-white" : "bg-white text-black hover:bg-[#FEE2E2]"
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
              className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black cursor-pointer transition-all ${
                filterResult === "skipped" ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"
              }`}
            >
              Skipped ({overall.skippedCount})
            </button>

            {/* Difficulty Filter */}
            <span className="text-[11px] font-black text-black ml-3 mr-1">Difficulty:</span>
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
                    className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black uppercase cursor-pointer transition-all ${
                      filterDifficulty === diff && filterQuestionIds === null
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-[#FEF3C7]"
                    }`}
                  >
                    {diff}
                  </button>
                );
              }
            )}

            {/* Chapter Filter */}
            <span className="text-[11px] font-black text-black ml-3 mr-1">Chapter:</span>
            <select
              value={filterQuestionIds !== null ? "custom" : filterChapter}
              onChange={(e) => {
                setFilterQuestionIds(null);
                setActiveEvidenceLabel(null);
                setFilterChapter(e.target.value);
              }}
              className="px-2 py-1 rounded-lg border border-black bg-white text-xs font-bold text-black focus:outline-none cursor-pointer"
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
        <div className="divide-y-2 divide-black/10 p-6 space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF7EE]/50 rounded-xl border-2 border-dashed border-black/20">
              <p className="text-sm font-black text-black">No questions match the current filter selection.</p>
              <button
                type="button"
                onClick={() => {
                  setFilterDifficulty("all");
                  setFilterChapter("all");
                  setFilterResult("all");
                }}
                className="mt-3 px-4 py-1.5 rounded-lg bg-black text-white font-black text-xs cursor-pointer"
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
                      <span className="font-mono font-black text-sm text-black bg-[#FEF3C7] border border-black px-2.5 py-1 rounded shadow-[1px_1px_0px_0px_#000]">
                        Q{q.questionNumber}
                      </span>
                      <span className="text-xs font-bold text-black bg-[#FAF7EE] border border-black px-2 py-0.5 rounded">
                        {q.chapter}
                      </span>
                      <span className="text-[10px] font-black uppercase bg-white border border-black px-2 py-0.5 rounded">
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {/* Time Spent */}
                      <span
                        className={`inline-flex items-center gap-1 font-mono font-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000] ${
                          q.isTimeSink ? "bg-[#FEE2E2] text-black" : "bg-white text-black"
                        }`}
                      >
                        <Hourglass className="w-3 h-3 stroke-[2.5]" />
                        {q.timeSpentSeconds}s {q.isTimeSink && "(Time Sink >72s)"}
                      </span>

                      {/* Score Result */}
                      {isCorrect ? (
                        <span className="bg-[#D1FAE5] text-black font-black px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                          +5 Marks (Correct)
                        </span>
                      ) : isIncorrect ? (
                        <span className="bg-[#FEE2E2] text-black font-black px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                          -1 Mark (Penalty)
                        </span>
                      ) : (
                        <span className="bg-white text-black font-black px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
                          0 Marks (Skipped)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prompt */}
                  <div className="font-bold text-sm text-black mb-3">
                    <MathRenderer text={q.prompt} />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt) => {
                      const isCandidatePick = q.selectedOption === opt.id;
                      const isTrueCorrect = q.correctOption === opt.id;

                      let optClasses = "border border-black/30 bg-white text-black";
                      if (isTrueCorrect) {
                        optClasses = "border-2 border-black bg-[#D1FAE5] text-black font-bold";
                      } else if (isCandidatePick && !isTrueCorrect) {
                        optClasses = "border-2 border-black bg-[#FEE2E2] text-black font-bold";
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-2.5 rounded-lg flex items-start gap-2 text-xs ${optClasses}`}
                        >
                          <span className="font-mono font-black shrink-0">({opt.id})</span>
                          <div className="flex-1">
                            <MathRenderer text={opt.text} />
                          </div>
                          {isTrueCorrect && (
                            <span className="text-[10px] font-black uppercase text-[#065F46] shrink-0">
                              Correct Key
                            </span>
                          )}
                          {isCandidatePick && !isTrueCorrect && (
                            <span className="text-[10px] font-black uppercase text-[#991B1B] shrink-0">
                              Your Pick
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation, 3-Level Breakdown & AI Diagnosis with MathRenderer */}
                  {(q.explanation || q.solution?.quick || q.solution?.concept || q.formula || q.keyConcept || q.misconception) && (
                    <div className="p-4 rounded-xl bg-[#FAF7EE] border-2 border-black text-xs space-y-3 shadow-[2px_2px_0px_0px_#000]">
                      {q.explanation && (
                        <div className="text-black/85 leading-relaxed font-medium">
                          <strong className="text-black font-black uppercase text-[10px] tracking-wider block mb-1">
                            Verified Solution &amp; NCERT Rationale:
                          </strong>
                          <MathRenderer text={q.explanation} className="text-black/85 leading-relaxed" />
                          {q.ncertReference && (
                            <span className="text-[10px] font-bold text-black/60 block pt-1.5">
                              Source: {q.ncertReference}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 3-Level Solution Cards: Quick Takeaway & Core Concept */}
                      {q.solution && (q.solution.quick || q.solution.concept) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-black/10">
                          {q.solution.quick && (
                            <div className="p-2.5 rounded-lg bg-white border border-black/30">
                              <span className="text-[10px] font-black uppercase text-[#2563EB] block mb-0.5">
                                30-Sec Takeaway
                              </span>
                              <MathRenderer
                                text={q.solution.quick}
                                className="text-black/90 font-semibold text-[11px] leading-relaxed"
                              />
                            </div>
                          )}
                          {q.solution.concept && (
                            <div className="p-2.5 rounded-lg bg-white border border-black/30">
                              <span className="text-[10px] font-black uppercase text-[#059669] block mb-0.5">
                                Core NCERT Concept
                              </span>
                              <MathRenderer
                                text={q.solution.concept}
                                className="text-black/90 font-semibold text-[11px] leading-relaxed"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Formula / Key Concept Highlight */}
                      {(q.formula || q.keyConcept) && (
                        <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#F59E0B] text-black">
                          <span className="text-[10px] font-black uppercase text-[#B45309] block mb-0.5">
                            Formula / Principle
                          </span>
                          <MathRenderer
                            text={q.formula || q.keyConcept || ""}
                            className="font-bold text-[11px] leading-relaxed text-black"
                          />
                        </div>
                      )}

                      {/* Common Misconception Alert */}
                      {q.misconception && (
                        <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#EF4444] text-black">
                          <span className="text-[10px] font-black uppercase text-[#DC2626] block mb-0.5">
                            Common Trap / Misconception
                          </span>
                          <MathRenderer
                            text={q.misconception.description || ""}
                            className="font-semibold text-[11px] leading-relaxed text-black/90"
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
      <div className="p-6 bg-[#FAF7EE] rounded-2xl border-2 border-black shadow-[5px_5px_0px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base font-black text-black flex items-center justify-center md:justify-start gap-2">
            <span>Next Steps for CUET Domain Mastery</span>
            <span className="text-xs font-bold text-black/60 font-mono">
              (Personal Best: {bestMarks} / {overall.maxMarks})
            </span>
          </h4>
          <p className="text-xs text-black/70 font-semibold max-w-xl">
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
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              Review {overall.incorrectCount} Incorrect Questions
            </button>
          )}

          <Link
            href="/dashboard/radar"
            className="px-4 py-2.5 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Targeted Weakness Practice</span>
          </Link>

          {onRetake ? (
            <button
              type="button"
              onClick={onRetake}
              className="px-4 py-2.5 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Retake Mock</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push(`/test/${report.testId}?reattempt=true`)}
              className="px-4 py-2.5 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Retake Mock</span>
            </button>
          )}

          <Link
            href="/dashboard/mocks"
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Back to Mocks
          </Link>
        </div>
      </div>
    </div>
  );
}
