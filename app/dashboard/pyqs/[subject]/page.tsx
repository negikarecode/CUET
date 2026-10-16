"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  RotateCw,
  BarChart2,
  Trophy,
  Clock,
  Info,
} from "lucide-react";
import {
  getPYQTestsForSubject,
  PYQTestItem,
  SUBJECT_DURATION_MINUTES,
} from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { deduplicateTestAttempts, normalizeSubject } from "@/lib/analytics";
import SearchableSelect, { SearchableSelectOption } from "@/components/ui/SearchableSelect";
import { RecordedTestAttempt } from "@/types";

interface SubjectPYQPageProps {
  params: {
    subject: string;
  };
}

type StatusFilter = "all" | "attempted" | "not_attempted";
type SortOption = "newest" | "oldest" | "best_score" | "lowest_score";

function formatShortPaperTitle(test: PYQTestItem): string {
  if (test.dateDisplay && test.shift) {
    return `${test.dateDisplay} · ${test.shift}`;
  }
  if (test.dateDisplay) return test.dateDisplay;
  const match = test.label.match(
    /\((\d{1,2}\s+[A-Za-z]+\s+\d{4})\s+(Shift\s+\d+)\)/i
  );
  if (match && match[1] && match[2]) {
    return `${match[1]} · ${match[2]}`;
  }
  if (test.shift && test.year) {
    return `CUET ${test.year} · ${test.shift}`;
  }
  return test.label;
}

export default function SubjectPYQListPage({ params }: SubjectPYQPageProps) {
  const routeParams = useParams();
  const rawSubject = (params?.subject || routeParams?.subject || "") as string;
  const subjectKey = decodeURIComponent(rawSubject).toLowerCase().trim();

  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const normalized = normalizeSubject(subjectKey);
  const subjectName = normalized.name;

  const durationMinutes =
    SUBJECT_DURATION_MINUTES[subjectKey] ??
    (["322", "306", "319", "301", "309", "308", "501"].includes(normalized.key) ? 60 : 45);

  const pyqPapers: PYQTestItem[] = useMemo(() => {
    return getPYQTestsForSubject(subjectKey);
  }, [subjectKey]);

  // Clean deduplicated test attempts strictly matching PYQs
  const cleanAttempts = useMemo(() => {
    const deduped = deduplicateTestAttempts(testAttempts || []);
    return deduped.filter((att) => {
      const id = (att.testId || "").toLowerCase();
      const title = (att.testTitle || "").toLowerCase();
      return id.includes("-pyq") || id.includes("pyq") || title.includes("shift") || title.includes("pyq");
    });
  }, [testAttempts]);

  // Map each paper to its attempt history and authoritative best attempt
  const paperCardsData = useMemo(() => {
    return pyqPapers.map((test) => {
      const matchingAttempts = cleanAttempts.filter((att) => att.testId === test.id);

      const sortedChronological = [...matchingAttempts].sort(
        (a, b) => new Date(a.submittedAt || 0).getTime() - new Date(b.submittedAt || 0).getTime()
      );

      let bestAttempt: RecordedTestAttempt | null = null;
      let bestAttemptNumber = 1;

      const firstAttempt = sortedChronological[0];
      if (firstAttempt) {
        bestAttempt = sortedChronological.reduce<RecordedTestAttempt>((best, curr, cIdx) => {
          const currScore = curr.totalMarks ?? 0;
          const bestScore = best.totalMarks ?? 0;
          if (currScore > bestScore) {
            bestAttemptNumber = cIdx + 1;
            return curr;
          }
          if (currScore === bestScore) {
            if ((curr.accuracyPercentage ?? 0) > (best.accuracyPercentage ?? 0)) {
              bestAttemptNumber = cIdx + 1;
              return curr;
            }
          }
          return best;
        }, firstAttempt);
      }

      let lastAttemptDate = "";
      const latest = sortedChronological[sortedChronological.length - 1];
      if (latest && latest.submittedAt) {
        const d = new Date(latest.submittedAt);
        if (!isNaN(d.getTime())) {
          lastAttemptDate = d.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        }
      }

      return {
        test,
        shortTitle: formatShortPaperTitle(test),
        attemptsCount: sortedChronological.length,
        hasAttempted: Boolean(bestAttempt),
        bestAttempt,
        bestAttemptNumber,
        lastAttemptDate,
      };
    });
  }, [pyqPapers, cleanAttempts]);

  // Precomputed subject stats
  const subjectStats = useMemo(() => {
    const attemptedCards = paperCardsData.filter((c) => c.hasAttempted);
    const attemptedCount = attemptedCards.length;
    const totalCount = paperCardsData.length;

    let peakScore: number | null = null;
    let totalAcc = 0;
    for (const c of attemptedCards) {
      if (c.bestAttempt) {
        const score = c.bestAttempt.totalMarks ?? 0;
        if (peakScore === null || score > peakScore) peakScore = score;
        totalAcc += c.bestAttempt.accuracyPercentage ?? 0;
      }
    }

    const firstUnattempted = paperCardsData.find((c) => !c.hasAttempted);
    const nextPaper = firstUnattempted ? firstUnattempted.test : pyqPapers[0] || null;

    return {
      attemptedCount,
      totalCount,
      peakScore,
      peakMaxMarks: 250,
      averageAccuracy: attemptedCount > 0 ? Math.round(totalAcc / attemptedCount) : 0,
      nextPaper,
      isAllAttempted: totalCount > 0 && attemptedCount >= totalCount,
    };
  }, [paperCardsData, pyqPapers]);

  // Available years from papers
  const availableYears = useMemo(() => {
    const set = new Set<string>();
    for (const p of pyqPapers) {
      if (p.year) set.add(String(p.year));
    }
    return Array.from(set).sort().reverse();
  }, [pyqPapers]);

  const yearSelectOptions: SearchableSelectOption[] = useMemo(() => {
    const list: SearchableSelectOption[] = [
      { value: "all", label: `All Years (${pyqPapers.length} Papers)` },
    ];
    for (const yr of availableYears) {
      const count = pyqPapers.filter((p) => String(p.year) === yr).length;
      list.push({
        value: yr,
        label: `CUET ${yr} (${count} Papers)`,
      });
    }
    return list;
  }, [availableYears, pyqPapers]);

  const sortSelectOptions: SearchableSelectOption[] = useMemo(() => {
    return [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
      { value: "best_score", label: "Best Score (Highest)" },
      { value: "lowest_score", label: "Lowest Score" },
    ];
  }, []);

  // Filter & sort cards
  const displayedCards = useMemo(() => {
    let list = paperCardsData;

    // Filter by year
    if (selectedYear !== "all") {
      list = list.filter((c) => String(c.test.year) === selectedYear);
    }

    // Filter by status
    if (statusFilter === "attempted") {
      list = list.filter((c) => c.hasAttempted);
    } else if (statusFilter === "not_attempted") {
      list = list.filter((c) => !c.hasAttempted);
    }

    // Sort cards
    return [...list].sort((a, b) => {
      if (sortBy === "newest") {
        const dateA = a.test.examDate || "";
        const dateB = b.test.examDate || "";
        if (dateB !== dateA) return dateB.localeCompare(dateA);
        return (b.test.shift || "").localeCompare(a.test.shift || "");
      }
      if (sortBy === "oldest") {
        const dateA = a.test.examDate || "";
        const dateB = b.test.examDate || "";
        if (dateA !== dateB) return dateA.localeCompare(dateB);
        return (a.test.shift || "").localeCompare(b.test.shift || "");
      }
      if (sortBy === "best_score") {
        const scoreA = a.bestAttempt?.totalMarks ?? -9999;
        const scoreB = b.bestAttempt?.totalMarks ?? -9999;
        return scoreB - scoreA;
      }
      if (sortBy === "lowest_score") {
        const hasA = a.hasAttempted;
        const hasB = b.hasAttempted;
        if (hasA && !hasB) return -1;
        if (!hasA && hasB) return 1;
        const scoreA = a.bestAttempt?.totalMarks ?? 9999;
        const scoreB = b.bestAttempt?.totalMarks ?? 9999;
        return scoreA - scoreB;
      }
      return 0;
    });
  }, [paperCardsData, selectedYear, statusFilter, sortBy]);

  const progressPercent = Math.min(
    100,
    Math.round((subjectStats.attemptedCount / (pyqPapers.length || 1)) * 100)
  );

  if (!isClient) {
    return <div className="min-h-screen bg-[#F8FAFC]" />;
  }

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* 1. Breadcrumb navigation */}
      <div>
        <Link
          href="/dashboard/pyqs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Previous Year Questions</span>
        </Link>
      </div>

      {/* 2. Compact Subject Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {subjectName} PYQ Papers
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium truncate max-w-2xl">
              Official NTA CUET CBT shift papers with complete step-by-step NCERT solutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-0.5">
              <span>{durationMinutes} min</span>
              <span className="text-slate-300">·</span>
              <span>50 questions</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-slate-700">+5 / −1 marking</span>
            </div>
          </div>

          {/* Primary CTA button in header: opens first unattempted paper */}
          <div className="shrink-0 flex items-center gap-2">
            <Link
              href={
                subjectStats.isAllAttempted
                  ? `/test/${pyqPapers[0]?.id || `${subjectKey}-pyq-1`}?reattempt=true`
                  : `/test/${subjectStats.nextPaper?.id || `${subjectKey}-pyq-1`}`
              }
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              {subjectStats.isAllAttempted ? (
                <>
                  <RotateCw className="w-4 h-4" />
                  <span>Re-attempt All Papers</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Next Paper ({formatShortPaperTitle(subjectStats.nextPaper || pyqPapers[0]!)})</span>
                </>
              )}
            </Link>
          </div>
        </div>

        {/* Stat Chips + Progress bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/60 tabular-nums">
              {subjectStats.attemptedCount} of {pyqPapers.length} Attempted
            </span>

            {subjectStats.peakScore !== null && (
              <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 tabular-nums">
                Peak Score: {subjectStats.peakScore} / {subjectStats.peakMaxMarks}
              </span>
            )}

            {subjectStats.attemptedCount > 0 && (
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 tabular-nums">
                Avg Accuracy: {subjectStats.averageAccuracy}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 min-w-[180px]">
            <span className="shrink-0 font-medium tabular-nums">{progressPercent}% Completed</span>
            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/50">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Toolbar: Year filter, Status filter & Sort control */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Year Filter */}
          <div className="min-w-[170px]">
            <SearchableSelect
              ariaLabel="Filter by Year"
              value={selectedYear}
              onChange={(val) => setSelectedYear(val)}
              options={yearSelectOptions}
              searchPlaceholder="Search exam years..."
              buttonClassName="text-xs font-semibold py-1.5 px-3 rounded-lg border-slate-200 bg-white"
            />
          </div>

          {/* Status segmented control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({paperCardsData.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("attempted")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === "attempted"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Attempted ({subjectStats.attemptedCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("not_attempted")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === "not_attempted"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Not attempted ({paperCardsData.length - subjectStats.attemptedCount})
            </button>
          </div>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Sort:</span>
          <SearchableSelect
            ariaLabel="Sort PYQ papers"
            value={sortBy}
            onChange={(val) => setSortBy(val as SortOption)}
            options={sortSelectOptions}
            buttonClassName="py-1.5 px-3 text-xs bg-slate-50 hover:bg-slate-100 font-semibold rounded-lg border-slate-200"
          />
        </div>
      </div>

      {/* 4. PYQ Paper Cards Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      {displayedCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          {displayedCards.map((card) => {
            const { test, shortTitle, attemptsCount, hasAttempted, bestAttempt, bestAttemptNumber, lastAttemptDate } =
              card;
            const isNegativeScore = (bestAttempt?.totalMarks ?? 0) < 0;

            return (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 min-w-0"
              >
                <div className="space-y-3 flex-1 flex flex-col min-w-0">
                  {/* Title with exam date & shift as visual anchor */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {shortTitle}
                      </h3>
                      {test.year && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          CUET UG {test.year} Official NTA Paper
                        </p>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0">
                      {test.shift || `Shift 1`}
                    </span>
                  </div>

                  {/* Status area */}
                  <div className="min-h-[56px] flex flex-col justify-center">
                    {hasAttempted && bestAttempt ? (
                      <div className="px-3.5 py-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-slate-900 space-y-1 text-xs">
                        <div className="flex items-center justify-between gap-1.5 font-bold">
                          <div className="flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="text-amber-900">Best:</span>
                            <span
                              className={`tabular-nums ${
                                isNegativeScore ? "text-rose-600 font-extrabold" : "text-slate-900"
                              }`}
                            >
                              {bestAttempt.totalMarks} / {bestAttempt.maxMarks || 250}
                            </span>
                            {isNegativeScore && (
                              <span
                                tabIndex={0}
                                role="tooltip"
                                aria-label="Includes negative marking (+5 / -1)."
                                title="Includes negative marking (+5 / -1)."
                                className="inline-flex items-center text-rose-600 cursor-help focus:outline-hidden"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-normal text-amber-800">
                            Attempt #{bestAttemptNumber}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-amber-900/80 font-normal truncate">
                          <span>{bestAttempt.accuracyPercentage}% accuracy</span>
                          <span>·</span>
                          <span>
                            {attemptsCount} {attemptsCount === 1 ? "attempt" : "attempts"}
                          </span>
                          {lastAttemptDate && (
                            <>
                              <span>·</span>
                              <span>{lastAttemptDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full min-h-[56px] flex items-center gap-2 text-slate-400 text-xs bg-slate-50/70 border border-slate-100 rounded-xl px-3.5 py-2.5">
                        <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                        <span className="font-normal">Not attempted yet</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer buttons pinned to bottom with mt-auto */}
                <div className="pt-3 border-t border-slate-100 mt-auto flex flex-col gap-2 w-full">
                  {hasAttempted && bestAttempt ? (
                    <>
                      <Link
                        href={`/dashboard/pyqs/analysis/${bestAttempt.id || test.id}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>Analysis</span>
                      </Link>

                      <Link
                        href={`/test/${test.id}?reattempt=true`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                        <span>Re-attempt</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`/test/${test.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      <span>Start Paper</span>
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-800">No shift papers match the selected filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedYear("all");
              setStatusFilter("all");
            }}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Show all papers
          </button>
        </div>
      )}
    </div>
  );
}
