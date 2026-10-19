"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Award,
  Target,
  ChevronRight,
  ClipboardCheck,
  TrendingUp,
  RotateCcw,
  RotateCw,
  Trash2,
  AlertTriangle,
  ChevronLeft,
  X,
  Loader2,
  Compass,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { RecordedTestAttempt } from "@/types";
import { formatDateTimeIndian } from "@/lib/config/dashboardConfig";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { stringToUuid } from "@/lib/utils";
import { deduplicateTestAttempts, getCanonicalTestKey } from "@/lib/analytics";
import SearchableSelect from "@/components/ui/SearchableSelect";

interface SessionsHistoryClientProps {
  initialAttempts?: RecordedTestAttempt[];
}

export type SessionType = "Mock" | "Past Paper" | "Practice";

function getSessionType(att?: RecordedTestAttempt | null): SessionType {
  if (!att) return "Mock";
  const str = `${att.testId || ""} ${att.testTitle || ""} ${att.subject || ""}`.toLowerCase();
  if (str.includes("pyq") || str.includes("past paper") || str.includes("official past")) {
    return "Past Paper";
  }
  if (
    str.includes("practice") ||
    str.includes("drill") ||
    str.includes("unit") ||
    str.includes("chapter") ||
    (att.totalQuestions && att.totalQuestions <= 25)
  ) {
    return "Practice";
  }
  return "Mock";
}

function getSessionSubtitle(att?: RecordedTestAttempt | null, type?: SessionType): string {
  if (!att) return "CBT Test Session";
  const actualType = type || getSessionType(att);
  const title = (att.testTitle || "").trim();
  const testId = (att.testId || "").trim();
  const combined = `${title} ${testId}`;

  const yearMatch = combined.match(/202[0-9]/);
  const shiftMatch = combined.match(/shift\s*([1-3]|i{1,3})/i);
  const dateMatch = combined.match(/(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*)/i);

  if (actualType === "Past Paper") {
    const year = yearMatch ? yearMatch[0] : "2025";
    const datePart = dateMatch ? dateMatch[0] : "";
    const shiftPart = shiftMatch && shiftMatch[0]
      ? shiftMatch[0].replace(/([a-z]+)/i, (m) => (m && m[0] ? m[0].toUpperCase() + m.slice(1).toLowerCase() : m))
      : "";
    const parts = [year, datePart, shiftPart].filter(Boolean);
    return parts.length > 0 ? parts.join(" · ") : "Official Past Paper";
  }
  if (actualType === "Practice") {
    const qCount = att.totalQuestions || (att.questions?.length) || 20;
    return `Chapter Practice Drill · ${qCount} ${qCount === 1 ? "Question" : "Questions"}`;
  }
  const qCount = att.totalQuestions || (att.questions?.length) || 50;
  return `Full Syllabus CBT Mock · ${qCount} ${qCount === 1 ? "Question" : "Questions"}`;
}

function splitDateTimeIndian(dateStr?: string | Date): { date: string; time: string } {
  if (!dateStr) return { date: "—", time: "—" };
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { date: "—", time: "—" };
  const date = d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { date, time };
}

function getReviewHref(att?: RecordedTestAttempt | null): string {
  if (!att) return "/dashboard/mocks";
  const id = att.id || att.testId || "";
  const testId = (att.testId || "").toLowerCase();
  if (testId.includes("pyq") || testId.includes("past")) {
    return `/dashboard/pyqs/analysis/${id}`;
  }
  return `/dashboard/mocks/analysis/${id}`;
}

function getRetakeHref(att?: RecordedTestAttempt | null): string {
  if (!att) return "/dashboard/mocks";
  const targetId = att.testId || att.id || "";
  return `/test/${targetId}?reattempt=true`;
}

export default function SessionsHistoryClient({
  initialAttempts = [],
}: SessionsHistoryClientProps) {
  const router = useRouter();
  const isClient = useIsClient();
  const rawStoreAttempts = useTestStore((s) => s.testAttempts);
  const storeAttempts = useMemo(() => rawStoreAttempts || [], [rawStoreAttempts]);
  const recordTestAttempt = useTestStore((s) => s.recordTestAttempt);
  const deleteTestAttempt = useTestStore((s) => s.deleteTestAttempt);

  // Synchronize initial server attempts into Zustand store idempotently
  useEffect(() => {
    if (initialAttempts.length > 0) {
      const state = useTestStore.getState();
      const localAttempts = state.testAttempts || [];
      const localCanonicalKeys = new Set(localAttempts.map(getCanonicalTestKey));
      const localKeys = new Set(
        localAttempts.flatMap((a) => [
          (a.testId || "").trim().toLowerCase(),
          (a.id || "").trim().toLowerCase(),
          (a.attemptId || "").trim().toLowerCase(),
          stringToUuid((a.testId || "").trim()),
        ])
      );

      initialAttempts.forEach((att) => {
        const k = (att.testId || att.id || "").trim().toLowerCase();
        const uuidK = stringToUuid(k);
        const attCanonicalKey = getCanonicalTestKey(att);
        const matchesLocal =
          localCanonicalKeys.has(attCanonicalKey) ||
          localAttempts.some(
            (la) =>
              (att.attemptId && la.attemptId && la.attemptId.toLowerCase() === att.attemptId.toLowerCase()) ||
              (att.id && la.id && la.id.toLowerCase() === att.id.toLowerCase()) ||
              (att.testId && la.testId && la.testId.toLowerCase() === att.testId.toLowerCase()) ||
              (la.testTitle?.toLowerCase().trim() === att.testTitle?.toLowerCase().trim() &&
                la.subject?.toLowerCase().trim() === att.subject?.toLowerCase().trim())
          );
        if (k && !localKeys.has(k) && !localKeys.has(uuidK) && !matchesLocal) {
          recordTestAttempt(att);
        }
      });
    }
  }, [initialAttempts, recordTestAttempt]);

  // Canonical deduplication across store and server attempts
  const allAttempts = useMemo(() => {
    const list = storeAttempts.length > 0 ? storeAttempts : initialAttempts;
    return deduplicateTestAttempts(list);
  }, [storeAttempts, initialAttempts]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [dateRange, setDateRange] = useState<"all" | "today" | "7days" | "30days">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest_score" | "highest_accuracy">("newest");

  // Chart subject filter
  const [chartSubject, setChartSubject] = useState<string>("all");

  // Pagination state (25 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Deletion modal state
  const [sessionToDelete, setSessionToDelete] = useState<RecordedTestAttempt | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Extract unique subjects
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    allAttempts.forEach((a) => {
      if (a.subject) set.add(a.subject);
    });
    return Array.from(set).sort();
  }, [allAttempts]);

  // Overall KPI statistics
  const stats = useMemo(() => {
    if (allAttempts.length === 0) {
      return {
        totalCount: 0,
        avgScore: 0,
        avgMaxMarks: 250,
        avgScorePercentage: 0,
        avgAccuracy: 0,
        bestScore: 0,
        bestMaxMarks: 250,
      };
    }

    const totalCount = allAttempts.length;
    let sumScore = 0;
    let sumMaxMarks = 0;
    let sumAccuracy = 0;
    let bestScore = -Infinity;
    let bestMaxMarks = 250;

    allAttempts.forEach((att) => {
      const score = att.totalMarks ?? 0;
      const totalQ = att.totalQuestions || (att.questions?.length) || (att.maxMarks ? Math.round(att.maxMarks / 5) : 50);
      const maxM = totalQ * 5;
      const acc = att.attemptedCount && att.attemptedCount > 0
        ? Math.round(((att.correctCount || 0) / att.attemptedCount) * 100)
        : (att.accuracyPercentage || 0);

      sumScore += score;
      sumMaxMarks += maxM;
      sumAccuracy += acc;

      if (score > bestScore) {
        bestScore = score;
        bestMaxMarks = maxM;
      }
    });

    const avgScore = Math.round(sumScore / totalCount);
    const avgMaxMarks = Math.round(sumMaxMarks / totalCount);
    const avgScorePercentage = avgMaxMarks > 0 ? Math.max(0, Math.round((avgScore / avgMaxMarks) * 100)) : 0;
    const avgAccuracy = Math.round(sumAccuracy / totalCount);

    return {
      totalCount,
      avgScore,
      avgMaxMarks,
      avgScorePercentage,
      avgAccuracy,
      bestScore: bestScore === -Infinity ? 0 : bestScore,
      bestMaxMarks,
    };
  }, [allAttempts]);

  // Filtered & sorted attempts
  const filteredAttempts = useMemo(() => {
    const now = Date.now();
    return allAttempts
      .filter((att) => {
        // Subject filter
        if (selectedSubject !== "all" && att.subject?.toLowerCase() !== selectedSubject.toLowerCase()) {
          return false;
        }

        // Type filter
        if (selectedType !== "all") {
          const t = getSessionType(att);
          if (t.toLowerCase().replace(/\s+/g, "_") !== selectedType.toLowerCase()) {
            return false;
          }
        }

        // Date-range filter
        if (dateRange !== "all") {
          const attemptTime = new Date(att.submittedAt || 0).getTime();
          if (dateRange === "today") {
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            if (attemptTime < todayStart.getTime()) return false;
          } else if (dateRange === "7days") {
            const cutoff = now - 7 * 24 * 60 * 60 * 1000;
            if (attemptTime < cutoff) return false;
          } else if (dateRange === "30days") {
            const cutoff = now - 30 * 24 * 60 * 60 * 1000;
            if (attemptTime < cutoff) return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const title = (att.testTitle || "").toLowerCase();
          const subject = (att.subject || "").toLowerCase();
          return title.includes(q) || subject.includes(q);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") {
          return new Date(a.submittedAt || 0).getTime() - new Date(b.submittedAt || 0).getTime();
        }
        if (sortBy === "highest_score") {
          return (b.totalMarks || 0) - (a.totalMarks || 0);
        }
        if (sortBy === "highest_accuracy") {
          return (b.accuracyPercentage || 0) - (a.accuracyPercentage || 0);
        }
        // Default: newest first
        return new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime();
      });
  }, [allAttempts, searchQuery, selectedSubject, selectedType, dateRange, sortBy]);

  // Reset pagination to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubject, selectedType, dateRange, sortBy]);

  // Paginated items
  const totalPages = Math.max(1, Math.ceil(filteredAttempts.length / pageSize));
  const paginatedAttempts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAttempts.slice(start, start + pageSize);
  }, [filteredAttempts, currentPage]);

  // Chart data: Chronological points filtered by chartSubject
  const chartPoints = useMemo(() => {
    const list = allAttempts.filter((att) => {
      if (chartSubject === "all") return true;
      return att.subject?.toLowerCase() === chartSubject.toLowerCase();
    });

    return [...list].sort(
      (a, b) => new Date(a.submittedAt || 0).getTime() - new Date(b.submittedAt || 0).getTime()
    );
  }, [allAttempts, chartSubject]);

  // Delete session handler
  const handleConfirmDelete = async () => {
    if (!sessionToDelete) return;
    setIsDeleting(true);
    try {
      const testKey = sessionToDelete.testId || sessionToDelete.id || "";
      deleteTestAttempt(testKey);

      await fetch(`/api/student/attempts?testId=${encodeURIComponent(testKey)}`, {
        method: "DELETE",
      }).catch((err) => console.warn("Failed to delete attempt from database:", err));

      setSessionToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isClient) {
    return (
      <div className="py-16 flex justify-center items-center">
        <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
      {/* 1. Top Header & Navigation */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 tracking-wide uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>CUET UG 2026 · Past Performance Record</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Session History
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Complete chronological record of all your completed CUET CBT mocks, past papers, and practice tests.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Take a Mock Test</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Summary KPI Cards */}
      {allAttempts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Completed Sessions */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0">
              <ClipboardCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                Completed Sessions
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                {stats.totalCount}
              </p>
            </div>
          </div>

          {/* Card 2: Average Score */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                Average Score
              </p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                  {stats.avgScore}
                </span>
                <span className="text-xs font-medium text-slate-400 tabular-nums">
                  /{stats.avgMaxMarks}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60 ml-1">
                  {stats.avgScorePercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Average Accuracy */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0">
              <Target className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                Average Accuracy
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                {stats.avgAccuracy}%
              </p>
            </div>
          </div>

          {/* Card 4: Personal Best */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600 shrink-0">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                Personal Best
              </p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-extrabold text-purple-700 tabular-nums">
                  {stats.bestScore}
                </span>
                <span className="text-xs font-medium text-slate-400 tabular-nums">
                  /{stats.bestMaxMarks}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* 3. Score Trajectory Line Chart */}
      {allAttempts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Score Trajectory Over Time</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Chronological marks scored across test sessions
              </p>
            </div>

            {/* Subject Selector for Line Chart */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400 font-medium">Filter Chart:</span>
              <div className="w-48 sm:w-56">
                <SearchableSelect
                  ariaLabel="Filter chart by subject"
                  value={chartSubject}
                  onChange={(val) => setChartSubject(val)}
                  options={[
                    { value: "all", label: `All Subjects (${allAttempts.length})` },
                    ...availableSubjects.map((sub) => {
                      const count = allAttempts.filter(
                        (a) => a.subject?.toLowerCase() === sub.toLowerCase()
                      ).length;
                      return {
                        value: sub,
                        label: `${sub} (${count})`,
                      };
                    }),
                  ]}
                  buttonClassName="py-1 px-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700"
                  searchPlaceholder="Search subjects..."
                />
              </div>
            </div>
          </div>

          {/* SVG Score Line Chart */}
          <div className="w-full">
            {chartPoints.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No attempts recorded for {chartSubject}.
              </div>
            ) : chartPoints.length === 1 && chartPoints[0] ? (
              (() => {
                const sp = chartPoints[0];
                return (
                  <div className="py-8 px-4 text-center bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <p className="text-xs font-medium text-slate-500">Single session recorded:</p>
                    <p className="text-base sm:text-lg font-bold text-slate-900">
                      {sp.testTitle} —{" "}
                      <span className="text-blue-600">{sp.totalMarks}</span> /{" "}
                      {sp.maxMarks || 250} marks
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {formatDateTimeIndian(sp.submittedAt || new Date())}
                    </p>
                  </div>
                );
              })()
            ) : (
              <ScoreLineChart points={chartPoints} />
            )}
          </div>
        </div>
      )}

      {/* 4. Filter and Search Toolbar */}
      {allAttempts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="relative sm:col-span-2 lg:col-span-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by test title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Type Filter */}
            <div className="lg:col-span-2">
              <SearchableSelect
                ariaLabel="Filter by paper type"
                value={selectedType}
                onChange={(val) => setSelectedType(val)}
                options={[
                  { value: "all", label: "All Types" },
                  { value: "mock", label: "Full Mocks" },
                  { value: "past_paper", label: "Past Papers" },
                  { value: "practice", label: "Chapter Practice" },
                ]}
                className="w-full"
                buttonClassName="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800"
              />
            </div>

            {/* Date Range Filter */}
            <div className="lg:col-span-2">
              <SearchableSelect
                ariaLabel="Filter by date range"
                value={dateRange}
                onChange={(val) => setDateRange(val as any)}
                options={[
                  { value: "all", label: "All Time" },
                  { value: "today", label: "Today" },
                  { value: "7days", label: "Last 7 Days" },
                  { value: "30days", label: "Last 30 Days" },
                ]}
                className="w-full"
                buttonClassName="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800"
              />
            </div>

            {/* Sort Selector */}
            <div className="lg:col-span-3">
              <SearchableSelect
                ariaLabel="Sort sessions"
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                options={[
                  { value: "newest", label: "Sort: Latest first" },
                  { value: "oldest", label: "Sort: Oldest first" },
                  { value: "highest_score", label: "Sort: Highest score" },
                  { value: "highest_accuracy", label: "Sort: Highest accuracy" },
                ]}
                className="w-full"
                buttonClassName="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Subject Pills */}
          {availableSubjects.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs border-t border-slate-100 scrollbar-none">
              <span className="text-slate-400 mr-1 flex items-center gap-1 shrink-0 font-semibold">
                <Filter className="w-3.5 h-3.5" />
                <span>Subject:</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSubject === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Subjects ({allAttempts.length})
              </button>
              {availableSubjects.map((sub) => {
                const count = allAttempts.filter(
                  (a) => a.subject?.toLowerCase() === sub.toLowerCase()
                ).length;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      selectedSubject.toLowerCase() === sub.toLowerCase()
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {sub} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. Sessions Results / Presentation */}
      {allAttempts.length === 0 ? (
        /* Zero State: User has not taken any tests */
        <div className="bg-white rounded-2xl py-16 px-4 text-center space-y-4 border border-slate-200/90 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200/60 shadow-xs">
            <ClipboardCheck className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No test sessions recorded yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Complete a full-length CBT mock test or chapter practice drill to start tracking your performance history and admission standing.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center justify-center gap-2 py-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Browse Mock Tests</span>
            </Link>
          </div>
        </div>
      ) : filteredAttempts.length === 0 ? (
        /* Filter Zero State: No tests match search/subject */
        <div className="bg-white rounded-2xl py-12 px-4 text-center space-y-3 border border-slate-200/90 shadow-xs">
          <p className="text-base font-bold text-slate-900">No sessions match your search or filters</p>
          <p className="text-xs text-slate-400">
            Try resetting the filters or entering different search keywords.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedSubject("all");
              setSelectedType("all");
              setDateRange("all");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header count info */}
          <div className="bg-white rounded-2xl border border-slate-200/90 px-4 py-3 shadow-xs flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-900 font-bold">{(currentPage - 1) * pageSize + 1}</strong> –{" "}
              <strong className="text-slate-900 font-bold">{Math.min(currentPage * pageSize, filteredAttempts.length)}</strong> of{" "}
              <strong className="text-slate-900 font-bold">{filteredAttempts.length}</strong> session
              {filteredAttempts.length === 1 ? "" : "s"}
            </span>
            <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
              Sorted by{" "}
              {sortBy === "newest"
                ? "latest date"
                : sortBy === "oldest"
                ? "oldest date"
                : sortBy === "highest_score"
                ? "highest marks"
                : "highest accuracy"}
            </span>
          </div>

          {/* Desktop Table View (>= 768px) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse table-auto">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 pl-4 pr-2 font-bold">Test Title</th>
                    <th className="py-3 px-3 font-bold">Subject</th>
                    <th className="py-3 px-3 font-bold whitespace-nowrap">Date & Time</th>
                    <th className="py-3 px-3 font-bold text-right whitespace-nowrap">Marks Scored</th>
                    <th className="py-3 px-3 font-bold text-right" title="Calculated as correct / attempted questions">
                      Accuracy
                    </th>
                    <th className="py-3 px-3 font-bold text-right whitespace-nowrap">Breakdown</th>
                    <th className="py-3 pr-4 pl-2 font-bold text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedAttempts.map((att: RecordedTestAttempt, idx: number) => {
                    const type = getSessionType(att);
                    const subtitle = getSessionSubtitle(att, type);
                    const totalQ = att.totalQuestions || (att.questions?.length) || (att.maxMarks ? Math.round(att.maxMarks / 5) : 50);
                    const maxMarks = totalQ * 5;
                    const title = att.testTitle || `${att.subject || "Domain"} CBT Mock Test`;
                    const reviewHref = getReviewHref(att);
                    const retakeHref = getRetakeHref(att);
                    const isPersonalBest = stats.bestScore > 0 && att.totalMarks === stats.bestScore;
                    const correct = att.correctCount || 0;
                    const wrong = att.incorrectCount || 0;
                    const skipped = Math.max(0, totalQ - (correct + wrong));
                    const acc = att.attemptedCount && att.attemptedCount > 0
                      ? Math.round(((att.correctCount || 0) / att.attemptedCount) * 100)
                      : (att.accuracyPercentage || 0);
                    const dt = splitDateTimeIndian(att.submittedAt);

                    return (
                      <tr
                        key={att.id || `session-${idx}`}
                        onClick={() => router.push(reviewHref)}
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      >
                        {/* Test Title */}
                        <td className="py-3.5 pl-4 pr-2 font-medium max-w-[240px]">
                          <div className="space-y-1">
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug whitespace-normal break-words">
                              {title}
                            </p>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {isPersonalBest && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                                  <Award className="w-3 h-3 text-amber-700" /> Personal Best
                                </span>
                              )}
                              <span
                                className={`inline-block px-1.5 py-0.5 rounded-md text-[10px] font-bold border ${
                                  type === "Mock"
                                    ? "bg-blue-50 text-blue-700 border-blue-200/80"
                                    : type === "Past Paper"
                                    ? "bg-purple-50 text-purple-700 border-purple-200/80"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                                }`}
                              >
                                {type}
                              </span>
                              <span className="text-[11px] text-slate-400 whitespace-normal">
                                {subtitle}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Subject */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 font-sans">
                            {att.subject || "Domain"}
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-3 text-slate-500 font-medium whitespace-nowrap">
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{dt.date}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 pl-5 font-mono">{dt.time}</span>
                          </div>
                        </td>

                        {/* Marks Scored */}
                        <td className="py-3.5 px-3 text-right tabular-nums whitespace-nowrap">
                          <span
                            className={`text-sm ${
                              (att.totalMarks ?? 0) < 0
                                ? "text-rose-600 font-extrabold"
                                : "text-slate-900 font-bold"
                            }`}
                          >
                            {att.totalMarks}
                          </span>
                          <span className="text-xs font-normal text-slate-400">
                            {" "}/ {maxMarks}
                          </span>
                        </td>

                        {/* Accuracy */}
                        <td className="py-3.5 px-3 text-right tabular-nums whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold border ${
                              acc >= 70
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : acc >= 40
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {acc}%
                          </span>
                        </td>

                        {/* Breakdown */}
                        <td className="py-3.5 px-3 text-right tabular-nums whitespace-nowrap">
                          <div className="flex flex-col items-end gap-1">
                            <div className="text-[11px] font-medium whitespace-nowrap">
                              <span className="text-emerald-600 font-bold">{correct} correct</span>
                              <span className="text-slate-300 mx-1">·</span>
                              <span className="text-rose-500 font-bold">{wrong} wrong</span>
                              <span className="text-slate-300 mx-1">·</span>
                              <span className="text-slate-400">{skipped} skipped</span>
                            </div>
                            <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden flex border border-slate-200/50">
                              <div
                                style={{ width: `${totalQ > 0 ? Math.min(100, (correct / totalQ) * 100) : 0}%` }}
                                className="bg-emerald-500 h-full"
                              />
                              <div
                                style={{ width: `${totalQ > 0 ? Math.min(100, (wrong / totalQ) * 100) : 0}%` }}
                                className="bg-rose-500 h-full"
                              />
                              <div
                                style={{ width: `${totalQ > 0 ? Math.min(100, (skipped / totalQ) * 100) : 0}%` }}
                                className="bg-slate-200 h-full"
                              />
                            </div>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 pr-4 pl-2 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={reviewHref}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 transition-colors shadow-2xs"
                              title="View test analysis and solutions"
                            >
                              <span>Analysis</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>

                            <Link
                              href={retakeHref}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60 transition-colors"
                              title="Re-attempt this test"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                              <span className="hidden xl:inline">Re-attempt</span>
                            </Link>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSessionToDelete(att);
                              }}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete this test session"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card-Based List (< 768px) */}
          <div className="block md:hidden space-y-3.5">
            {paginatedAttempts.map((att: RecordedTestAttempt, idx: number) => {
              const type = getSessionType(att);
              const subtitle = getSessionSubtitle(att, type);
              const totalQ = att.totalQuestions || (att.questions?.length) || (att.maxMarks ? Math.round(att.maxMarks / 5) : 50);
              const maxMarks = totalQ * 5;
              const title = att.testTitle || `${att.subject || "Domain"} CBT Mock Test`;
              const reviewHref = getReviewHref(att);
              const retakeHref = getRetakeHref(att);
              const isPersonalBest = stats.bestScore > 0 && att.totalMarks === stats.bestScore;
              const correct = att.correctCount || 0;
              const wrong = att.incorrectCount || 0;
              const skipped = Math.max(0, totalQ - (correct + wrong));
              const acc = att.attemptedCount && att.attemptedCount > 0
                ? Math.round(((att.correctCount || 0) / att.attemptedCount) * 100)
                : (att.accuracyPercentage || 0);
              const dt = splitDateTimeIndian(att.submittedAt);

              return (
                <div
                  key={att.id || `mobile-session-${idx}`}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {isPersonalBest && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <Award className="w-3 h-3 text-amber-700" /> PB
                          </span>
                        )}
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                            type === "Mock"
                              ? "bg-blue-50 text-blue-700 border-blue-200/80"
                              : type === "Past Paper"
                              ? "bg-purple-50 text-purple-700 border-purple-200/80"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                          }`}
                        >
                          {type}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-sans">
                          {att.subject || "Domain"}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {subtitle} · {dt.date} at {dt.time}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p
                        className={`text-base font-extrabold tabular-nums ${
                          (att.totalMarks ?? 0) < 0 ? "text-rose-600" : "text-slate-900"
                        }`}
                      >
                        {att.totalMarks}
                        <span className="text-xs font-normal text-slate-400">/{maxMarks}</span>
                      </p>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border mt-0.5 ${
                          acc >= 70
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : acc >= 40
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {acc}% acc
                      </span>
                    </div>
                  </div>

                  {/* Breakdown pill */}
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between text-xs font-medium">
                    <span className="text-emerald-700 font-bold">{correct} Correct</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-rose-600 font-bold">{wrong} Wrong</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{skipped} Skipped</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                    <Link
                      href={reviewHref}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs text-center shadow-xs transition-colors"
                    >
                      Analysis
                    </Link>
                    <Link
                      href={retakeHref}
                      className="py-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>Retake</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSessionToDelete(att)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex items-center justify-between text-xs">
              <div className="text-slate-500 font-medium">
                Page <strong className="text-slate-900 font-bold">{currentPage}</strong> of{" "}
                <strong className="text-slate-900 font-bold">{totalPages}</strong>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Delete Confirmation Modal */}
      {sessionToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-rose-600">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                <h3 className="text-base font-bold text-slate-900">Delete Test Session</h3>
              </div>
              <button
                type="button"
                onClick={() => setSessionToDelete(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <p>
                Are you sure you want to permanently delete your session for:
              </p>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                <p className="font-bold text-slate-900">
                  {sessionToDelete.testTitle || `${sessionToDelete.subject} Mock Test`}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Score: <strong className="text-slate-800">{sessionToDelete.totalMarks}</strong> /{" "}
                  {sessionToDelete.maxMarks || 250} marks · Accuracy:{" "}
                  <strong className="text-slate-800">{sessionToDelete.accuracyPercentage}%</strong>
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {formatDateTimeIndian(sessionToDelete.submittedAt || new Date())}
                </p>
              </div>
              <p className="text-rose-600 text-xs font-semibold pt-1">
                Warning: This will remove your attempt records and recalculate your dashboard stats. This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setSessionToDelete(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Interactive SVG Score-over-Time Line Chart Component
// -----------------------------------------------------------------------------
interface ScoreLineChartProps {
  points: RecordedTestAttempt[];
}

function ScoreLineChart({ points }: ScoreLineChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const chartHeight = 180;
  const paddingLeft = 45;
  const paddingRight = 48;
  const paddingTop = 20;
  const paddingBottom = 42;

  // Find max marks ceiling and min floor for Y-axis (allowing negative scores)
  const { minFloor, maxCeiling } = useMemo(() => {
    let max = 250;
    let min = 0;
    points.forEach((p) => {
      const totalQ = p.totalQuestions || (p.questions?.length) || (p.maxMarks ? Math.round(p.maxMarks / 5) : 50);
      const m = totalQ * 5;
      if (m > max) max = m;
      const s = p.totalMarks ?? 0;
      if (s < min) min = s;
    });
    // Snap min to clean 50 step below if negative
    const floor = min < 0 ? Math.floor(min / 50) * 50 : 0;
    return { minFloor: floor, maxCeiling: max };
  }, [points]);

  const scoreRange = maxCeiling - minFloor;

  // Compute average score across points
  const avgScore = useMemo(() => {
    if (points.length === 0) return 0;
    const sum = points.reduce((acc, p) => acc + (p.totalMarks ?? 0), 0);
    return Math.round(sum / points.length);
  }, [points]);

  // Calculate coordinates for each point
  const totalW = 800; // viewBox coordinate space
  const plotW = totalW - paddingLeft - paddingRight;
  const plotH = chartHeight - paddingTop - paddingBottom;

  const coords = useMemo(() => {
    if (points.length <= 1) return [];
    return points.map((p, idx) => {
      const x = paddingLeft + (idx / (points.length - 1)) * plotW;
      const rawScore = p.totalMarks ?? 0;
      const ratio = scoreRange > 0 ? (rawScore - minFloor) / scoreRange : 0;
      const y = paddingTop + plotH - ratio * plotH;
      return { x, y, score: rawScore, attempt: p, idx };
    });
  }, [points, minFloor, scoreRange, plotW, plotH, paddingLeft, paddingTop]);

  // Construct SVG path string
  const pathD = useMemo(() => {
    if (coords.length < 2) return "";
    return coords.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, "");
  }, [coords]);

  // Area path for gradient fill down to zero or minFloor line
  const areaD = useMemo(() => {
    if (coords.length < 2) return "";
    const firstCoord = coords[0];
    const lastCoord = coords[coords.length - 1];
    if (!firstCoord || !lastCoord) return "";
    const firstX = firstCoord.x;
    const lastX = lastCoord.x;
    const zeroRatio = scoreRange > 0 ? (0 - minFloor) / scoreRange : 0;
    const baselineY = paddingTop + plotH - zeroRatio * plotH;
    return `${pathD} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
  }, [pathD, coords, minFloor, scoreRange, paddingTop, plotH]);

  // Average line Y coordinate
  const avgRatio = scoreRange > 0 ? (avgScore - minFloor) / scoreRange : 0;
  const avgY = paddingTop + plotH - avgRatio * plotH;

  // Selected X-axis tick indices to prevent overlapping labels
  const xTickIndices = useMemo(() => {
    const n = points.length;
    if (n <= 6) return points.map((_, i) => i);
    const step = Math.ceil(n / 5);
    const indices: number[] = [];
    for (let i = 0; i < n; i += step) {
      indices.push(i);
    }
    if (indices[indices.length - 1] !== n - 1) {
      indices.push(n - 1);
    }
    return indices;
  }, [points]);

  return (
    <div className="relative w-full">
      <svg
        role="img"
        aria-label="Score trend chart across test sessions"
        viewBox={`0 0 ${totalW} ${chartHeight}`}
        className="w-full h-auto overflow-visible select-none"
      >
        <defs>
          <linearGradient id="scoreAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = paddingTop + plotH - ratio * plotH;
          const label = Math.round(minFloor + ratio * scoreRange);
          return (
            <g key={ratio}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={totalW - paddingRight}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray={label === 0 ? undefined : "3 3"}
                strokeWidth={label === 0 ? "1.5" : "1"}
              />
              <text
                x={paddingLeft - 8}
                y={y + 3.5}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-mono font-medium"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Average Score dashed benchmark line */}
        {points.length > 1 && (
          <g>
            <line
              x1={paddingLeft}
              y1={avgY}
              x2={totalW - paddingRight}
              y2={avgY}
              stroke="#10B981"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
            <text
              x={totalW - paddingRight}
              y={avgY - 6}
              textAnchor="end"
              className="text-[11px] fill-emerald-600 font-bold font-sans"
            >
              Avg: {avgScore} marks
            </text>
          </g>
        )}

        {/* Gradient fill area */}
        {areaD && <path d={areaD} fill="url(#scoreAreaGrad)" />}

        {/* Trendline */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Data points */}
        {coords.map((pt, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <g
              key={pt.attempt?.id || idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {isHovered && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="8"
                  fill="#2563EB"
                  fillOpacity="0.2"
                  className="animate-ping"
                />
              )}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? "5.5" : "4"}
                fill={isHovered ? "#1D4ED8" : pt.score < 0 ? "#E11D48" : "#2563EB"}
                stroke="#FFFFFF"
                strokeWidth="2"
                className="transition-all duration-150"
              />
            </g>
          );
        })}

        {/* Visible X-Axis Labels */}
        {coords.length > 0 &&
          xTickIndices.map((ptIdx) => {
            const pt = coords[ptIdx];
            if (!pt) return null;
            const dt = splitDateTimeIndian(pt.attempt.submittedAt);
            const labelText = dt.date !== "—" ? dt.date.split(" ").slice(0, 2).join(" ") : `Mock ${ptIdx + 1}`;
            return (
              <g key={`xtick-${ptIdx}`}>
                <line
                  x1={pt.x}
                  y1={paddingTop + plotH}
                  x2={pt.x}
                  y2={paddingTop + plotH + 5}
                  stroke="#CBD5E1"
                  strokeWidth="1"
                />
                <text
                  x={pt.x}
                  y={paddingTop + plotH + 18}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-500 font-medium"
                >
                  {labelText}
                </text>
              </g>
            );
          })}
      </svg>

      {/* Tooltip on Hover */}
      {hoveredIdx !== null && coords[hoveredIdx] ? (
        (() => {
          const hoveredCoord = coords[hoveredIdx];
          if (!hoveredCoord) return null;
          const totalQ = hoveredCoord.attempt.totalQuestions || 50;
          const maxM = totalQ * 5;
          return (
            <div
              className="absolute z-30 pointer-events-none bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl max-w-xs space-y-1 transition-all duration-150 -translate-x-1/2 bottom-[80%]"
              style={{
                left: `${(hoveredCoord.x / totalW) * 100}%`,
              }}
            >
              <p className="font-bold text-white leading-tight">
                {hoveredCoord.attempt.testTitle}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span>
                  Score:{" "}
                  <strong className={hoveredCoord.score < 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                    {hoveredCoord.score}
                  </strong>
                  /{maxM}
                </span>
                <span>·</span>
                <span>
                  Acc: <strong className="text-blue-400 font-bold">{hoveredCoord.attempt.accuracyPercentage}%</strong>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                {formatDateTimeIndian(hoveredCoord.attempt.submittedAt || new Date())}
              </p>
            </div>
          );
        })()
      ) : null}
    </div>
  );
}
