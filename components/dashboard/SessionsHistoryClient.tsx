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
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { RecordedTestAttempt } from "@/types";
import { formatDateTimeIndian } from "@/lib/config/dashboardConfig";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { stringToUuid } from "@/lib/utils";

interface SessionsHistoryClientProps {
  initialAttempts?: RecordedTestAttempt[];
}

export type SessionType = "Mock" | "Past Paper" | "Practice";

function getSessionType(att: RecordedTestAttempt): SessionType {
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

function getSessionSubtitle(att: RecordedTestAttempt, type: SessionType): string {
  const title = (att.testTitle || "").trim();
  const testId = (att.testId || "").trim();
  const combined = `${title} ${testId}`;

  const yearMatch = combined.match(/202[0-9]/);
  const shiftMatch = combined.match(/shift\s*([1-3]|i{1,3})/i);
  const dateMatch = combined.match(/(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*)/i);

  if (type === "Past Paper") {
    const year = yearMatch ? yearMatch[0] : "2025";
    const datePart = dateMatch ? dateMatch[0] : "";
    const shiftPart = shiftMatch && shiftMatch[0]
      ? shiftMatch[0].replace(/([a-z]+)/i, (m) => (m && m[0] ? m[0].toUpperCase() + m.slice(1).toLowerCase() : m))
      : "";
    const parts = [year, datePart, shiftPart].filter(Boolean);
    return parts.length > 0 ? parts.join(" · ") : "Official Past Paper";
  }
  if (type === "Practice") {
    const qCount = att.totalQuestions || (att.questions?.length) || 20;
    return `Chapter Practice Drill · ${qCount} Questions`;
  }
  const qCount = att.totalQuestions || (att.questions?.length) || 50;
  return `Full Syllabus CBT Mock · ${qCount} Questions`;
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

function getReviewHref(att: RecordedTestAttempt): string {
  const id = att.id || att.testId || "";
  const testId = (att.testId || "").toLowerCase();
  if (testId.includes("pyq") || testId.includes("past")) {
    return `/dashboard/pyqs/analysis/${id}`;
  }
  return `/dashboard/mocks/analysis/${id}`;
}

function getRetakeHref(att: RecordedTestAttempt): string {
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
      const localKeys = new Set(
        localAttempts.flatMap((a) => [
          (a.testId || "").trim(),
          (a.id || "").trim(),
          stringToUuid((a.testId || "").trim()),
        ])
      );

      initialAttempts.forEach((att) => {
        const k = (att.testId || att.id || "").trim();
        const uuidK = stringToUuid(k);
        const matchesLocal = localAttempts.some(
          (la) =>
            la.testTitle?.toLowerCase().trim() === att.testTitle?.toLowerCase().trim() &&
            la.subject?.toLowerCase().trim() === att.subject?.toLowerCase().trim()
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
    const seen = new Set<string>();
    const unique: RecordedTestAttempt[] = [];

    list.forEach((att) => {
      const canonicalKey = stringToUuid(att.testId || att.id || att.testTitle || "");
      const normKey = `${(att.subject || "").toLowerCase().trim()}:::${(att.testTitle || "").toLowerCase().trim()}`;
      if (!seen.has(canonicalKey) && !seen.has(normKey)) {
        seen.add(canonicalKey);
        seen.add(normKey);
        unique.push(att);
      }
    });

    return unique;
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
        <div className="w-9 h-9 border-3 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-[28px] font-bold text-[var(--text)] tracking-tight">
            Session History
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-1">
            Complete chronological record of all your completed CUET CBT mocks, past papers, and practice tests.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-[8px] bg-[var(--accent)] hover:bg-blue-600 text-white text-[13px] font-semibold shadow-xs transition-all"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Take a Mock Test</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      {allAttempts.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="app-card p-4 flex items-center gap-3.5 border border-[var(--border)] shadow-xs">
            <div className="w-11 h-11 rounded-[10px] bg-blue-50 flex items-center justify-center text-[var(--accent)] shrink-0">
              <ClipboardCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Completed Sessions
              </p>
              <p className="text-[22px] font-bold text-[var(--text)] tabular-nums mt-0.5">
                {stats.totalCount}
              </p>
            </div>
          </div>

          <div className="app-card p-4 flex items-center gap-3.5 border border-[var(--border)] shadow-xs">
            <div className="w-11 h-11 rounded-[10px] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Average Score
              </p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-[22px] font-bold text-[var(--text)] tabular-nums">
                  {stats.avgScore}
                </span>
                <span className="text-[13px] font-normal text-[var(--text-muted)] tabular-nums">
                  / {stats.avgMaxMarks}
                </span>
                <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">
                  {stats.avgScorePercentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="app-card p-4 flex items-center gap-3.5 border border-[var(--border)] shadow-xs">
            <div className="w-11 h-11 rounded-[10px] bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Target className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Average Accuracy
              </p>
              <p className="text-[22px] font-bold text-[var(--text)] tabular-nums mt-0.5">
                {stats.avgAccuracy}%
              </p>
            </div>
          </div>

          <div className="app-card p-4 flex items-center gap-3.5 border border-[var(--border)] shadow-xs">
            <div className="w-11 h-11 rounded-[10px] bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Personal Best
              </p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-[22px] font-bold text-purple-700 tabular-nums">
                  {stats.bestScore}
                </span>
                <span className="text-[13px] font-normal text-[var(--text-muted)] tabular-nums">
                  / {stats.bestMaxMarks}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Score-over-Time Line Chart Card */}
      {allAttempts.length > 0 && (
        <div className="app-card p-5 border border-[var(--border)] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[var(--border)]">
            <div>
              <h2 className="text-[16px] font-bold text-[var(--text)] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
                <span>Score Trajectory Over Time</span>
              </h2>
              <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">
                Chronological marks scored across test sessions
              </p>
            </div>

            {/* Subject Selector for Line Chart */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[12px] text-[var(--text-muted)] font-medium">Filter Chart:</span>
              <select
                aria-label="Filter chart by subject"
                value={chartSubject}
                onChange={(e) => setChartSubject(e.target.value)}
                className="h-8 px-2.5 rounded-[6px] border border-[var(--border)] bg-white text-[12px] font-semibold text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
              >
                <option value="all">All Subjects ({allAttempts.length})</option>
                {availableSubjects.map((sub) => {
                  const count = allAttempts.filter(
                    (a) => a.subject?.toLowerCase() === sub.toLowerCase()
                  ).length;
                  return (
                    <option key={sub} value={sub}>
                      {sub} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* SVG Score Line Chart */}
          <div className="w-full">
            {chartPoints.length === 0 ? (
              <div className="py-12 text-center text-[13px] text-[var(--text-muted)]">
                No attempts recorded for {chartSubject}.
              </div>
            ) : chartPoints.length === 1 && chartPoints[0] ? (
              (() => {
                const sp = chartPoints[0];
                return (
                  <div className="py-8 px-4 text-center bg-slate-50 rounded-[10px] border border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <p className="text-[13px] font-medium text-[var(--text-secondary)]">Single session recorded:</p>
                    <p className="text-[18px] font-bold text-[var(--text)]">
                      {sp.testTitle} —{" "}
                      <span className="text-[var(--accent)]">{sp.totalMarks}</span> /{" "}
                      {sp.maxMarks || 250} marks
                    </p>
                    <p className="text-[12px] text-[var(--text-muted)]">
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

      {/* Filter and Search Bar */}
      {allAttempts.length > 0 && (
        <div className="app-card p-4 space-y-3.5 border border-[var(--border)] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search by test title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-[8px] border border-[var(--border)] bg-white text-[13px] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Type Filter */}
            <div className="md:col-span-2">
              <select
                aria-label="Filter by paper type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full h-10 px-3 rounded-[8px] border border-[var(--border)] bg-white text-[13px] font-medium text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="mock">Full Mocks</option>
                <option value="past_paper">Past Papers</option>
                <option value="practice">Chapter Practice</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="md:col-span-2">
              <select
                aria-label="Filter by date range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full h-10 px-3 rounded-[8px] border border-[var(--border)] bg-white text-[13px] font-medium text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3">
              <select
                aria-label="Sort sessions"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full h-10 px-3 rounded-[8px] border border-[var(--border)] bg-white text-[13px] font-medium text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
              >
                <option value="newest">Sort: Latest first</option>
                <option value="oldest">Sort: Oldest first</option>
                <option value="highest_score">Sort: Highest score</option>
                <option value="highest_accuracy">Sort: Highest accuracy</option>
              </select>
            </div>
          </div>

          {/* Subject Pills */}
          {availableSubjects.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-[13px] border-t border-slate-100">
              <span className="text-[var(--text-muted)] mr-1 flex items-center gap-1 shrink-0 font-medium">
                <Filter className="w-3.5 h-3.5" />
                <span>Subject:</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSubject === "all"
                    ? "bg-[var(--accent)] text-white shadow-xs"
                    : "bg-slate-100 text-[var(--text-secondary)] hover:bg-slate-200"
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
                    className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      selectedSubject.toLowerCase() === sub.toLowerCase()
                        ? "bg-[var(--accent)] text-white shadow-xs"
                        : "bg-slate-100 text-[var(--text-secondary)] hover:bg-slate-200"
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

      {/* Sessions List */}
      {allAttempts.length === 0 ? (
        /* Zero State: User has not taken any tests */
        <div className="app-card py-16 px-4 text-center space-y-4 border border-[var(--border)]">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-[var(--accent)] flex items-center justify-center mx-auto">
            <ClipboardCheck className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-[18px] font-semibold text-[var(--text)]">No test sessions recorded yet</h3>
            <p className="text-[14px] text-[var(--text-secondary)]">
              Complete a full-length CBT mock test or chapter practice drill to start tracking your performance history and admission standing.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[8px] bg-[var(--accent)] hover:bg-blue-600 text-white text-[14px] font-semibold transition-all shadow-xs"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Browse Mock Tests</span>
            </Link>
          </div>
        </div>
      ) : filteredAttempts.length === 0 ? (
        /* Filter Zero State: No tests match search/subject */
        <div className="app-card py-12 px-4 text-center space-y-3 border border-[var(--border)]">
          <p className="text-[15px] font-medium text-[var(--text)]">No sessions match your search or filters</p>
          <p className="text-[13px] text-[var(--text-secondary)]">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[var(--border)] bg-white text-[13px] font-semibold text-[var(--text)] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      ) : (
        <div className="app-card overflow-hidden border border-[var(--border)] shadow-xs space-y-0">
          {/* Header count info */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between text-[13px] text-[var(--text-secondary)] bg-white">
            <span>
              Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> –{" "}
              <strong>{Math.min(currentPage * pageSize, filteredAttempts.length)}</strong> of{" "}
              <strong>{filteredAttempts.length}</strong> session
              {filteredAttempts.length === 1 ? "" : "s"}
            </span>
            <span className="text-[12px] text-[var(--text-muted)] font-medium">
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

          {/* Desktop Table View - No nested vertical scroll, sticky thead, fits without horizontal scroll at 1280px */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse table-auto">
              <thead className="sticky top-0 z-10 bg-slate-50 shadow-2xs border-b border-[var(--border)]">
                <tr className="text-[12px] font-semibold text-[var(--text-muted)] bg-slate-50">
                  <th className="py-2.5 pl-3 pr-2 font-semibold">Test Title</th>
                  <th className="py-2.5 px-2 font-semibold">Subject</th>
                  <th className="py-2.5 px-2 font-semibold whitespace-nowrap">Date & Time</th>
                  <th className="py-2.5 px-2 font-semibold text-right whitespace-nowrap">Marks Scored</th>
                  <th className="py-2 px-2 font-semibold text-right" title="Calculated as correct / attempted questions">
                    <span className="block leading-tight">Accuracy</span>
                    <span className="block text-[10px] text-[var(--text-muted)] font-normal">(attempted)</span>
                  </th>
                  <th className="py-2.5 px-2 font-semibold text-right whitespace-nowrap">Breakdown</th>
                  <th className="py-2.5 pr-3 pl-1 font-semibold text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-white">
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
                      className="hover:bg-slate-50/80 transition-colors text-[13px] group cursor-pointer"
                    >
                      {/* Test Title with Wrap to Two Lines and Subtitle */}
                      <td className="py-2.5 pl-3 pr-2 font-medium max-w-[220px]">
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900 leading-snug whitespace-normal break-words">
                            {title}
                          </p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {isPersonalBest && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                                ★ Personal Best
                              </span>
                            )}
                            <span
                              className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold border ${
                                type === "Mock"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : type === "Past Paper"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {type}
                            </span>
                            <span className="text-[11px] text-[var(--text-muted)] whitespace-normal">
                              {subtitle}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="py-2.5 px-2 whitespace-normal">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80 whitespace-nowrap">
                          {att.subject || "Domain"}
                        </span>
                      </td>

                      {/* Date & Time (Two lines) */}
                      <td className="py-2.5 px-2 text-[var(--text-muted)] text-[12px] font-medium leading-tight whitespace-nowrap">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{dt.date}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 pl-5">{dt.time}</span>
                        </div>
                      </td>

                      {/* Marks Scored (Negative in Red) */}
                      <td className="py-2.5 px-2 text-right tabular-nums whitespace-nowrap">
                        <span
                          className={`text-[14px] ${
                            (att.totalMarks ?? 0) < 0
                              ? "text-rose-600 font-extrabold"
                              : "text-[var(--text)] font-bold"
                          }`}
                        >
                          {att.totalMarks}
                        </span>
                        <span className="text-[12px] font-normal text-[var(--text-muted)]">
                          {" "}
                          / {maxMarks}
                        </span>
                      </td>

                      {/* Accuracy */}
                      <td className="py-2.5 px-2 text-right tabular-nums whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-[6px] text-[12px] font-semibold border ${
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

                      {/* Breakdown: 7 correct · 6 wrong · 37 skipped */}
                      <td className="py-2.5 px-2 text-right tabular-nums whitespace-nowrap">
                        <div className="flex flex-col items-end gap-1">
                          <div className="text-[11px] font-medium whitespace-nowrap">
                            <span className="text-emerald-600 font-semibold">{correct} correct</span>
                            <span className="text-slate-300 mx-1">·</span>
                            <span className="text-rose-500 font-semibold">{wrong} wrong</span>
                            <span className="text-slate-300 mx-1">·</span>
                            <span className="text-slate-500">{skipped} skipped</span>
                          </div>
                          {/* Mini Progress Ratio */}
                          <div className="w-20 h-1.5 rounded-full bg-slate-100 overflow-hidden flex">
                            <div
                              style={{ width: `${Math.min(100, (correct / totalQ) * 100)}%` }}
                              className="bg-emerald-500 h-full"
                            />
                            <div
                              style={{ width: `${Math.min(100, (wrong / totalQ) * 100)}%` }}
                              className="bg-rose-500 h-full"
                            />
                            <div
                              style={{ width: `${Math.min(100, (skipped / totalQ) * 100)}%` }}
                              className="bg-slate-200 h-full"
                            />
                          </div>
                        </div>
                      </td>

                      {/* Action Buttons: Review, Retake, Delete */}
                      <td className="py-2.5 pr-3 pl-1 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={reviewHref}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-[12px] font-semibold bg-blue-50 text-[var(--accent)] hover:bg-blue-100 transition-colors"
                            title="Review test report and solutions"
                          >
                            <span>Review</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={retakeHref}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-[6px] text-[12px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Retake this test"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span className="hidden xl:inline">Retake</span>
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSessionToDelete(att);
                            }}
                            className="p-1.5 rounded-[6px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[var(--border)] flex items-center justify-between bg-white text-[13px]">
              <div className="text-[var(--text-secondary)]">
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-[6px] border border-[var(--border)] bg-white text-[var(--text)] font-medium hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-[6px] text-[13px] font-semibold transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[var(--accent)] text-white shadow-xs"
                        : "bg-white border border-[var(--border)] text-[var(--text-secondary)] hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-[6px] border border-[var(--border)] bg-white text-[var(--text)] font-medium hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
                <h3 className="text-[16px] font-bold text-slate-900">Delete Test Session</h3>
              </div>
              <button
                type="button"
                onClick={() => setSessionToDelete(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-[13px] text-slate-600">
              <p>
                Are you sure you want to permanently delete your session for:
              </p>
              <div className="p-3 bg-slate-50 rounded-[8px] border border-slate-200/70 space-y-1">
                <p className="font-semibold text-slate-900">
                  {sessionToDelete.testTitle || `${sessionToDelete.subject} Mock Test`}
                </p>
                <p className="text-[12px] text-slate-500">
                  Score: <strong>{sessionToDelete.totalMarks}</strong> /{" "}
                  {sessionToDelete.maxMarks || 250} marks · Accuracy:{" "}
                  <strong>{sessionToDelete.accuracyPercentage}%</strong>
                </p>
                <p className="text-[12px] text-slate-400">
                  {formatDateTimeIndian(sessionToDelete.submittedAt || new Date())}
                </p>
              </div>
              <p className="text-rose-600 text-[12px] font-medium pt-1">
                Warning: This will remove your attempt records and recalculate your dashboard stats. This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setSessionToDelete(null)}
                className="px-4 py-2 text-[13px] font-semibold rounded-[8px] border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-[13px] font-semibold rounded-[8px] bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
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
        viewBox={`0 0 ${totalW} ${chartHeight}`}
        className="w-full h-auto overflow-visible select-none"
      >
        <defs>
          <linearGradient id="scoreAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
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
              key={idx}
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
              className="absolute z-30 pointer-events-none bg-slate-900 text-white text-[12px] rounded-[8px] p-2.5 shadow-xl max-w-xs space-y-1 transition-all duration-150 -translate-x-1/2 bottom-[80%]"
              style={{
                left: `${(hoveredCoord.x / totalW) * 100}%`,
              }}
            >
              <p className="font-semibold text-white leading-tight">
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
              <p className="text-[10px] text-slate-400">
                {formatDateTimeIndian(hoveredCoord.attempt.submittedAt || new Date())}
              </p>
            </div>
          );
        })()
      ) : null}
    </div>
  );
}
