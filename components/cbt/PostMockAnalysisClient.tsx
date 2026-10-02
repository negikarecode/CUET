"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
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
} from "lucide-react";
import {
  PostMockDeterministicReport,
  AIPostMockInsight,
  NormalizedDifficulty,
} from "@/types/postMockAnalysis";
import MathRenderer from "@/components/cbt/MathRenderer";

interface PostMockAnalysisClientProps {
  report: PostMockDeterministicReport;
  onRetake?: () => void;
  initialSelectedChapter?: string;
  initialSelectedDifficulty?: NormalizedDifficulty;
}

export default function PostMockAnalysisClient({
  report,
  onRetake,
  initialSelectedChapter,
  initialSelectedDifficulty,
}: PostMockAnalysisClientProps) {
  const { overall, difficultyBreakdown, chapterBreakdown, chapterDifficultyMatrix, allQuestions } =
    report;

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
  }) => {
    if (options.chapter !== undefined) setFilterChapter(options.chapter);
    if (options.difficulty !== undefined) setFilterDifficulty(options.difficulty);
    if (options.result !== undefined) setFilterResult(options.result);

    setTimeout(() => {
      questionReviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // Filtered Questions for Click-Through Question Review
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      if (filterDifficulty !== "all" && q.difficulty !== filterDifficulty) return false;
      if (filterChapter !== "all" && q.chapter !== filterChapter) return false;
      if (filterResult === "correct" && q.isCorrect !== true) return false;
      if (filterResult === "incorrect" && (q.isCorrect !== false || !q.isAttempted)) return false;
      if (filterResult === "skipped" && !q.isSkipped) return false;
      return true;
    });
  }, [allQuestions, filterDifficulty, filterChapter, filterResult]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. MOCK COMPLETED: Overall Performance (Deterministic numbers) */}
      <div className="bg-[#FAF7EE] rounded-2xl border-2 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-black text-xs font-black uppercase tracking-wider mb-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              Official Post-Mock Analysis · Single Attempt Evaluation
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
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onRetake && (
              <button
                type="button"
                onClick={onRetake}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                <span>Re-attempt Mock</span>
              </button>
            )}
            <Link
              href="/dashboard/mocks"
              className="px-4 py-2.5 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <span>Back to Mocks</span>
            </Link>
          </div>
        </div>

        {/* Primary Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5 mt-6 pt-6 border-t-2 border-black/10">
          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Score</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black">
              {overall.totalMarks}{" "}
              <span className="text-xs font-bold text-black/50">/ {overall.maxMarks}</span>
            </p>
          </div>

          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Accuracy</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black">
              {overall.accuracyPercentage}%
            </p>
          </div>

          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-[#059669] tracking-wider">Correct</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-[#059669]">
              {overall.correctCount}
            </p>
          </div>

          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-[#DC2626] tracking-wider">Incorrect</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-[#DC2626]">
              {overall.incorrectCount}
            </p>
          </div>

          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Skipped</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black/70">
              {overall.skippedCount}
            </p>
          </div>

          <div className="bg-white rounded-xl p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <span className="text-[10px] font-black uppercase text-black/60 tracking-wider">Avg Pace</span>
            <p className="text-2xl sm:text-3xl font-black font-mono mt-0.5 text-black">
              {overall.avgTimePerQuestionSeconds}s{" "}
              <span className="text-xs font-semibold text-black/50">/ Q</span>
            </p>
          </div>
        </div>
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
              Ranked by question count and sample weight to reflect meaningful paper distribution.
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
                  <td className="py-3 px-3 text-center font-mono text-[#059669]">+{row.correct}</td>
                  <td className="py-3 px-3 text-center font-mono text-[#DC2626]">-{row.incorrect}</td>
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
                const hasData = cell && cell.totalQuestions > 0;
                const isAttempted = cell && cell.attempted > 0;

                return (
                  <div
                    key={diff}
                    className={`p-4 rounded-xl border-2 border-black flex flex-col justify-between ${
                      hasData ? "bg-[#FAF7EE]/60" : "bg-slate-50 opacity-70"
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
                        {hasData ? (
                          <>
                            {cell.correct}{" "}
                            <span className="text-xs font-semibold text-black/50">
                              / {cell.attempted} attempted
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-black/40">
                            No {diff} questions in paper
                          </span>
                        )}
                      </p>
                      {hasData && (
                        <p className="text-[11px] font-semibold text-black/60 mt-1">
                          {cell.totalQuestions} total questions ({cell.skipped} skipped)
                        </p>
                      )}
                    </div>

                    {hasData && (
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
                            difficulty: "all",
                            chapter: "all",
                            result: "all",
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

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
            {/* Result Filter */}
            <span className="text-[11px] font-black text-black mr-1">Result:</span>
            <button
              type="button"
              onClick={() => setFilterResult("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black cursor-pointer transition-all ${
                filterResult === "all" ? "bg-black text-white" : "bg-white text-black hover:bg-[#FEF3C7]"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterResult("correct")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black cursor-pointer transition-all ${
                filterResult === "correct" ? "bg-[#10B981] text-black" : "bg-white text-black hover:bg-[#D1FAE5]"
              }`}
            >
              Correct ({overall.correctCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterResult("incorrect")}
              className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black cursor-pointer transition-all ${
                filterResult === "incorrect" ? "bg-[#FF5C5C] text-white" : "bg-white text-black hover:bg-[#FEE2E2]"
              }`}
            >
              Incorrect ({overall.incorrectCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterResult("skipped")}
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
                    onClick={() => setFilterDifficulty(diff)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black border border-black uppercase cursor-pointer transition-all ${
                      filterDifficulty === diff
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
              value={filterChapter}
              onChange={(e) => setFilterChapter(e.target.value)}
              className="px-2 py-1 rounded-lg border border-black bg-white text-xs font-bold text-black focus:outline-none cursor-pointer"
            >
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

                  {/* Explanation & NCERT Reference */}
                  {q.explanation && (
                    <div className="p-3 rounded-lg bg-[#FAF7EE] border border-black/30 text-xs text-black space-y-1">
                      <span className="text-[10px] font-black uppercase text-black/60 block">
                        Verified Solution &amp; NCERT Rationale:
                      </span>
                      <MathRenderer text={q.explanation} className="text-black/85 leading-relaxed font-medium" />
                      {q.ncertReference && (
                        <span className="text-[10px] font-bold text-black/60 block pt-1">
                          Source: {q.ncertReference}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
