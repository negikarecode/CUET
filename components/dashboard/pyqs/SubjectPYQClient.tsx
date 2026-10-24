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
  Lock,
  Sparkles,
  BookOpen,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import {
  getPYQTestsForSubject,
  PYQTestItem,
  SUBJECT_DURATION_MINUTES,
} from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useEntitlement } from "@/lib/hooks/useEntitlement";
import { deduplicateTestAttempts, normalizeSubject } from "@/lib/analytics";
import { RecordedTestAttempt } from "@/types";
import SearchableSelect from "@/components/ui/SearchableSelect";
import ChapterWisePYQView from "@/components/dashboard/pyqs/ChapterWisePYQView";

export interface SubjectPYQClientProps {
  subject?: string;
  initialIsPremium?: boolean;
  initialIsVerified?: boolean;
  initialUserId?: string;
}

type StatusFilter = "all" | "attempted" | "not_attempted";
type SortOption = "paper_number" | "best_score" | "lowest_score";

// Helper to reliably extract the paper index from test ID
function getPaperNumber(test: PYQTestItem): number {
  if (test.paperNumber) return test.paperNumber;
  const match = test.id.match(/-pyq-(\d+)$/i);
  if (match && match[1]) return parseInt(match[1], 10);
  return 1;
}

// Format short human-readable titles
function formatShortPaperTitle(test: PYQTestItem): string {
  const paperNum = getPaperNumber(test);
  return `Paper ${paperNum}`;
}

export default function SubjectPYQClient({
  subject: propSubject,
  initialIsPremium = false,
  initialIsVerified = false,
  initialUserId,
}: SubjectPYQClientProps) {
  const routeParams = useParams();
  const rawSubject = (propSubject || routeParams?.subject || "") as string;
  const subjectKey = decodeURIComponent(rawSubject).toLowerCase().trim();

  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

  // Authoritative entitlement hook
  const { isPremium, isConfirmedFree } = useEntitlement({
    initialIsPremium,
    initialIsVerified,
    initialUserId,
  });

  // Tab state: year-wise (default) or chapter-wise
  const [activeTab, setActiveTab] = useState<"year" | "chapter">("year");

  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("paper_number");

  const normalized = normalizeSubject(subjectKey);
  const subjectName = normalized.name;

  const durationMinutes =
    SUBJECT_DURATION_MINUTES[subjectKey] ??
    (["322", "306", "319", "301", "309", "308", "501"].includes(normalized.key) ? 60 : 45);

  const pyqPapers: PYQTestItem[] = useMemo(() => {
    const list = getPYQTestsForSubject(subjectKey);
    return [...list].sort((a, b) => getPaperNumber(a) - getPaperNumber(b));
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

  // Distinct unlocked PYQ paper IDs across the platform
  const unlockedDistinctPyqIds = useMemo(() => {
    const set = new Set<string>();
    (cleanAttempts || []).forEach((att) => {
      const id = (att.testId || "").toLowerCase().trim();
      if (id) set.add(id);
    });
    return set;
  }, [cleanAttempts]);

  const totalUnlockedDistinctPyqs = unlockedDistinctPyqIds.size;

  // Map each paper to its attempt history and authoritative best attempt
  const paperCardsData = useMemo(() => {
    return pyqPapers.map((test) => {
      const paperNum = getPaperNumber(test);
      const testId = test.id;

      const matchingAttempts = cleanAttempts.filter((att) => {
        const attId = (att.testId || att.id || "").toLowerCase();
        const matchesDirectId = attId === testId.toLowerCase();
        const attSubjectKey = normalizeSubject(att.subject || att.testTitle || "").key;
        const matchesSubject = attSubjectKey === normalized.key;
        const matchesPaperIndex =
          attId.includes(`-pyq-${paperNum}`) ||
          attId.includes(`paper-${paperNum}`) ||
          (att.testTitle || "").toLowerCase().includes(`paper ${paperNum}`);

        return matchesDirectId || (matchesSubject && matchesPaperIndex);
      });

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
  }, [pyqPapers, cleanAttempts, normalized.key]);

  // Overall statistics for this subject
  const subjectStats = useMemo(() => {
    if (!isClient) {
      return {
        attemptedCount: 0,
        peakScore: null as number | null,
        averageAccuracy: 0,
        nextPaper: pyqPapers[0] || null,
        isAllAttempted: false,
      };
    }

    const attemptedCards = paperCardsData.filter((c) => c.hasAttempted);
    const attemptedCount = attemptedCards.length;

    let peakScore: number | null = null;
    let totalAccuracy = 0;

    attemptedCards.forEach((c) => {
      if (c.bestAttempt) {
        const marks = c.bestAttempt.totalMarks ?? 0;
        if (peakScore === null || marks > peakScore) {
          peakScore = marks;
        }
        totalAccuracy += c.bestAttempt.accuracyPercentage ?? 0;
      }
    });

    const averageAccuracy = attemptedCount > 0 ? Math.round(totalAccuracy / attemptedCount) : 0;
    const nextUnattempted = paperCardsData.find((c) => !c.hasAttempted);

    return {
      attemptedCount,
      peakScore,
      averageAccuracy,
      nextPaper: nextUnattempted ? nextUnattempted.test : null,
      isAllAttempted: attemptedCount === pyqPapers.length && pyqPapers.length > 0,
    };
  }, [isClient, paperCardsData, pyqPapers]);

  // Total attempts completed by this candidate across this subject's PYQs
  const totalSubjectPYQAttempts = useMemo(() => {
    return paperCardsData.reduce((acc, c) => acc + c.attemptsCount, 0);
  }, [paperCardsData]);

  // Available exam years from papers
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    pyqPapers.forEach((p) => {
      if (p.year) years.add(p.year.toString());
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [pyqPapers]);

  // Filtered & sorted cards
  const displayedCards = useMemo(() => {
    let list = paperCardsData;

    // Filter by year
    if (selectedYear !== "all") {
      list = list.filter((c) => c.test.year && c.test.year.toString() === selectedYear);
    }

    // Filter by status
    if (statusFilter === "attempted") {
      list = list.filter((c) => c.hasAttempted);
    } else if (statusFilter === "not_attempted") {
      list = list.filter((c) => !c.hasAttempted);
    }

    // Sort cards
    return [...list].sort((a, b) => {
      if (sortBy === "best_score") {
        const scoreA = a.bestAttempt?.totalMarks ?? -9999;
        const scoreB = b.bestAttempt?.totalMarks ?? -9999;
        return scoreB - scoreA;
      }
      if (sortBy === "lowest_score") {
        const scoreA = a.bestAttempt?.totalMarks ?? 9999;
        const scoreB = b.bestAttempt?.totalMarks ?? 9999;
        return scoreA - scoreB;
      }
      const numA = getPaperNumber(a.test);
      const numB = getPaperNumber(b.test);
      return numA - numB;
    });
  }, [paperCardsData, selectedYear, statusFilter, sortBy]);

  const progressPercent = Math.min(
    100,
    Math.round((subjectStats.attemptedCount / (pyqPapers.length || 1)) * 100)
  );

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

      {/* Free Plan Status Banner - Rendered ONLY after confirmed Free */}
      {isConfirmedFree && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white rounded">
                Free Plan
              </span>
              <h3 className="text-sm font-bold text-amber-900">
                {Math.min(1, totalUnlockedDistinctPyqs)} of 1 Free PYQ Paper Unlocked
              </h3>
            </div>
            <p className="text-xs text-amber-800/80">
              Free plan includes 1 distinct official past year paper with unlimited retries. Upgrade to CUETMate Premium for unlimited access to all shift papers across all subjects with complete NCERT solutions.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2.5">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to Premium (₹2)</span>
            </Link>
          </div>
        </div>
      )}

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

          {/* Primary CTA button in header: opens first unattempted paper or upgrade */}
          <div className="shrink-0 flex items-center gap-2">
            {!isPremium && isConfirmedFree && (totalSubjectPYQAttempts >= 1 || (subjectStats.nextPaper && pyqPapers[0]?.id !== subjectStats.nextPaper.id)) ? (
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock All PYQ Papers (₹2)</span>
              </Link>
            ) : (
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
            )}
          </div>
        </div>

        {/* Stat Chips + Progress bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/60 tabular-nums">
              {subjectStats.attemptedCount} of {pyqPapers.length} Attempted
            </span>

            {subjectStats.peakScore !== null && (
              <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center gap-1.5 tabular-nums">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Peak: {subjectStats.peakScore} / 250</span>
                {subjectStats.peakScore < 0 && (
                  <span
                    tabIndex={0}
                    role="tooltip"
                    aria-label="Negative score due to incorrect answers penalty (+5 / -1)."
                    title="Negative score due to incorrect answers penalty (+5 / -1)."
                    className="inline-flex items-center text-rose-600 cursor-help focus:outline-hidden"
                  >
                    <Info className="w-3 h-3" />
                  </span>
                )}
              </span>
            )}

            {subjectStats.averageAccuracy > 0 && (
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 tabular-nums">
                {subjectStats.averageAccuracy}% Avg Accuracy
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:w-48">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 font-bold tabular-nums">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tab Switcher: Year-wise | Chapter-wise */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200/90 shadow-xs w-full sm:w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("year")}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "year"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Year-wise Papers</span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
              activeTab === "year" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            {pyqPapers.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("chapter")}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "chapter"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chapter-wise</span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
              activeTab === "chapter" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            NEW
          </span>
        </button>
      </div>

      {/* ── Chapter-wise view ── */}
      {activeTab === "chapter" && (
        <ChapterWisePYQView subjectKey={subjectKey} />
      )}

      {/* ── Year-wise view ── */}
      {activeTab === "year" && (
        <>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Year Filter Buttons */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedYear("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedYear === "all"
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Years ({pyqPapers.length})
            </button>
            {availableYears.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedYear === year
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Status
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("attempted")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === "attempted"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Attempted ({subjectStats.attemptedCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("not_attempted")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === "not_attempted"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Unattempted ({Math.max(0, pyqPapers.length - subjectStats.attemptedCount)})
            </button>
          </div>
        </div>

        <div className="w-full sm:w-48">
          <SearchableSelect
            options={[
              { value: "paper_number", label: "Sort: Paper Number" },
              { value: "best_score", label: "Sort: Highest Score" },
              { value: "lowest_score", label: "Sort: Lowest Score" },
            ]}
            value={sortBy}
            onChange={(val) => setSortBy(val as SortOption)}
            placeholder="Sort by"
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
            const paperNum = getPaperNumber(test);
            const isFirstPaper = paperNum === 1 || pyqPapers[0]?.id === test.id;

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
                      <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-1.5">
                        <span>CUET UG {test.year || 2025}</span>
                        {test.dateDisplay && (
                          <>
                            <span>·</span>
                            <span>{test.dateDisplay}</span>
                          </>
                        )}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {test.isExpanded || test.completenessStatus === "expanded" || (test.questions && test.questions > 50) ? (
                          <span
                            title={test.structureNote || "Includes authentic optional sections"}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md border bg-purple-50 text-purple-700 border-purple-200"
                          >
                            {test.questions} Questions (Optional Sections)
                          </span>
                        ) : test.isPartial || test.completenessStatus === "partial" || (test.questions && test.questions < 50) ? (
                          <span
                            title={test.structureNote || "Partial reconstruction from authentic session"}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md border bg-amber-50 text-amber-700 border-amber-200"
                          >
                            {test.questions}/50 Questions (Partial)
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md border bg-emerald-50 text-emerald-700 border-emerald-200">
                            50/50 Questions
                          </span>
                        )}
                        {test.verificationStatus === "official_final_key_verified" && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 text-blue-600" />
                            Official NTA Key
                          </span>
                        )}
                        {test.verificationStatus === "independently_verified" && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5 text-slate-500" />
                            Verified Solution
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {!isPremium && isConfirmedFree && (
                        hasAttempted ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 inline-flex items-center gap-1">
                            FREE — UNLIMITED RETRIES
                          </span>
                        ) : isFirstPaper && totalUnlockedDistinctPyqs < 1 ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            FREE
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 inline-flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-600" />
                            <span>Premium</span>
                          </span>
                        )
                      )}
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0">
                        {test.shift || `Shift 1`}
                      </span>
                    </div>
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
                  {!isPremium && isConfirmedFree && !isFirstPaper && !hasAttempted ? (
                    <Link
                      href="/pricing"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Upgrade to Unlock (₹2)</span>
                    </Link>
                  ) : hasAttempted && bestAttempt ? (
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
                  ) : !isPremium && isConfirmedFree && totalUnlockedDistinctPyqs >= 1 ? (
                    <Link
                      href="/pricing"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-all cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Free Limit Reached · Upgrade</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/test/${test.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      <span>Start</span>
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
          <p className="text-sm font-semibold text-slate-800">No PYQ papers match the selected filter.</p>
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
      {/* Close year-wise conditional */}
      </>)}
    </div>
  );
}
