"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { RecordedTestAttempt } from "@/types";
import { formatDateIndian, MARKING_SCHEME } from "@/lib/config/dashboardConfig";
import { useIsClient } from "@/lib/hooks/useIsClient";

interface SessionsHistoryClientProps {
  initialAttempts?: RecordedTestAttempt[];
}

export default function SessionsHistoryClient({
  initialAttempts = [],
}: SessionsHistoryClientProps) {
  const isClient = useIsClient();
  const storeAttempts = useTestStore((s) => s.testAttempts) || [];
  const recordTestAttempt = useTestStore((s) => s.recordTestAttempt);

  // Synchronize initial server attempts into Zustand store if not already present
  useEffect(() => {
    if (initialAttempts.length > 0) {
      const state = useTestStore.getState();
      const localAttempts = state.testAttempts || [];
      const localKeys = new Set(localAttempts.map((a) => (a.testId || a.id || "").trim()));

      initialAttempts.forEach((att) => {
        const k = (att.testId || att.id || "").trim();
        if (k && !localKeys.has(k)) {
          recordTestAttempt(att);
        }
      });
    }
  }, [initialAttempts, recordTestAttempt]);

  // Merge store and server attempts uniquely by testId / id
  const allAttempts = useMemo(() => {
    const list = storeAttempts.length > 0 ? storeAttempts : initialAttempts;
    const seen = new Set<string>();
    const unique: RecordedTestAttempt[] = [];

    list.forEach((att) => {
      const key = (att.id || att.testId || "").trim();
      if (!key || !seen.has(key)) {
        if (key) seen.add(key);
        unique.push(att);
      }
    });

    return unique;
  }, [storeAttempts, initialAttempts]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest_score" | "highest_accuracy">("newest");

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
      return { totalCount: 0, avgScore: 0, avgAccuracy: 0, bestScore: 0 };
    }

    const totalCount = allAttempts.length;
    let sumScore = 0;
    let sumAccuracy = 0;
    let bestScore = 0;

    allAttempts.forEach((att) => {
      const score = att.totalMarks || 0;
      const acc = att.accuracyPercentage || 0;
      sumScore += score;
      sumAccuracy += acc;
      if (score > bestScore) bestScore = score;
    });

    return {
      totalCount,
      avgScore: Math.round(sumScore / totalCount),
      avgAccuracy: Math.round(sumAccuracy / totalCount),
      bestScore,
    };
  }, [allAttempts]);

  // Filtered & sorted attempts
  const filteredAttempts = useMemo(() => {
    return allAttempts
      .filter((att) => {
        // Subject filter
        if (selectedSubject !== "all" && att.subject?.toLowerCase() !== selectedSubject.toLowerCase()) {
          return false;
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
  }, [allAttempts, searchQuery, selectedSubject, sortBy]);

  if (!isClient) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="w-8 h-8 border-3 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] sm:text-[30px] font-bold text-[var(--text)] tracking-tight">
              Session History
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-blue-50 text-[var(--accent)] border border-blue-200">
              {allAttempts.length} Total
            </span>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] mt-1">
            Complete chronological record of all your completed CUET CBT mocks, past papers, and practice tests.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-[8px] bg-[var(--accent)] hover:bg-blue-600 text-white text-[14px] font-semibold shadow-sm transition-all"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Take a Mock Test</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      {allAttempts.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="app-card p-4 flex items-center gap-3 border border-[var(--border)]">
            <div className="w-10 h-10 rounded-[8px] bg-blue-50 flex items-center justify-center text-[var(--accent)] shrink-0">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[var(--text-secondary)]">Completed Sessions</p>
              <p className="text-[20px] font-bold text-[var(--text)] tabular-nums">{stats.totalCount}</p>
            </div>
          </div>

          <div className="app-card p-4 flex items-center gap-3 border border-[var(--border)]">
            <div className="w-10 h-10 rounded-[8px] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[var(--text-secondary)]">Average Score</p>
              <p className="text-[20px] font-bold text-[var(--text)] tabular-nums">{stats.avgScore} <span className="text-[13px] font-normal text-[var(--text-muted)]">marks</span></p>
            </div>
          </div>

          <div className="app-card p-4 flex items-center gap-3 border border-[var(--border)]">
            <div className="w-10 h-10 rounded-[8px] bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[var(--text-secondary)]">Average Accuracy</p>
              <p className="text-[20px] font-bold text-[var(--text)] tabular-nums">{stats.avgAccuracy}%</p>
            </div>
          </div>

          <div className="app-card p-4 flex items-center gap-3 border border-[var(--border)]">
            <div className="w-10 h-10 rounded-[8px] bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[var(--text-secondary)]">Personal Best</p>
              <p className="text-[20px] font-bold text-[var(--text)] tabular-nums">{stats.bestScore} <span className="text-[13px] font-normal text-[var(--text-muted)]">marks</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      {allAttempts.length > 0 && (
        <div className="app-card p-4 space-y-3 border border-[var(--border)]">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search by test title or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-[8px] border border-[var(--border)] bg-white text-[14px] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="sort-select" className="text-[13px] font-medium text-[var(--text-secondary)] whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-10 px-3 rounded-[8px] border border-[var(--border)] bg-white text-[13px] font-medium text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
              >
                <option value="newest">Latest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest_score">Highest score</option>
                <option value="highest_accuracy">Highest accuracy</option>
              </select>
            </div>
          </div>

          {/* Subject Pills */}
          {availableSubjects.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-[13px]">
              <span className="text-[var(--text-muted)] mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Subject:</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                  selectedSubject === "all"
                    ? "bg-[var(--accent)] text-white shadow-xs"
                    : "bg-slate-100 text-[var(--text-secondary)] hover:bg-slate-200"
                }`}
              >
                All Subjects ({allAttempts.length})
              </button>
              {availableSubjects.map((sub) => {
                const count = allAttempts.filter((a) => a.subject?.toLowerCase() === sub.toLowerCase()).length;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
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
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-[8px] bg-[var(--accent)] hover:bg-blue-600 text-white text-[14px] font-semibold transition-all shadow-sm"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Browse Mock Tests</span>
            </Link>
          </div>
        </div>
      ) : filteredAttempts.length === 0 ? (
        /* Filter Zero State: No tests match search/subject */
        <div className="app-card py-12 px-4 text-center space-y-3 border border-[var(--border)]">
          <p className="text-[15px] font-medium text-[var(--text)]">No sessions match your search or filter</p>
          <p className="text-[13px] text-[var(--text-secondary)]">Try resetting the subject filter or entering different keywords.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedSubject("all");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[var(--border)] bg-white text-[13px] font-semibold text-[var(--text)] hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      ) : (
        <div className="app-card overflow-hidden border border-[var(--border)] space-y-0">
          {/* Header count info */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between text-[13px] text-[var(--text-secondary)]">
            <span>
              Showing <strong>{filteredAttempts.length}</strong> session{filteredAttempts.length === 1 ? "" : "s"}
            </span>
            <span className="text-[12px] text-[var(--text-muted)]">
              Sorted by {sortBy === "newest" ? "latest date" : sortBy === "oldest" ? "oldest date" : sortBy === "highest_score" ? "highest marks" : "highest accuracy"}
            </span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[12px] font-semibold text-[var(--text-muted)] bg-slate-50/75">
                  <th className="py-3 px-4 font-medium">Test title</th>
                  <th className="py-3 px-4 font-medium">Subject</th>
                  <th className="py-3 px-4 font-medium">Date & Time</th>
                  <th className="py-3 px-4 font-medium text-right">Marks Scored</th>
                  <th className="py-3 px-4 font-medium text-right">Accuracy</th>
                  <th className="py-3 px-4 font-medium text-right">Breakdown</th>
                  <th className="py-3 pr-4 pl-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredAttempts.map((att: RecordedTestAttempt, idx: number) => {
                  const formattedDate = formatDateIndian(att.submittedAt || new Date());
                  const maxMarks = att.maxMarks || MARKING_SCHEME.MAX_MARKS_PER_SUBJECT;
                  const title = att.testTitle || `${att.subject || "Domain"} CBT Mock Test`;
                  const reviewHref = (att.id || att.testId)
                    ? (att.testId?.toLowerCase().includes("pyq")
                        ? `/dashboard/pyqs/analysis/${att.id || att.testId}`
                        : `/dashboard/mocks/analysis/${att.id || att.testId}`)
                    : `/dashboard/mocks`;

                  return (
                    <tr
                      key={att.id || `session-${idx}`}
                      className="h-14 hover:bg-slate-50/60 transition-colors text-[14px]"
                    >
                      <td className="py-3 px-4 font-medium text-[var(--text)] max-w-[280px]">
                        <p className="truncate font-semibold text-slate-900">{title}</p>
                        <p className="text-[12px] text-[var(--text-muted)]">{att.totalQuestions || 50} Questions</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {att.subject || "Domain"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[var(--text-muted)] whitespace-nowrap text-[13px]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formattedDate}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[var(--text)] tabular-nums whitespace-nowrap">
                        <span className="text-[15px]">{att.totalMarks}</span>
                        <span className="text-[13px] font-normal text-[var(--text-muted)]"> / {maxMarks}</span>
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[13px] font-semibold ${
                          (att.accuracyPercentage || 0) >= 70
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : (att.accuracyPercentage || 0) >= 40
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {att.accuracyPercentage}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-[12px] text-[var(--text-muted)] tabular-nums whitespace-nowrap">
                        <span className="text-emerald-600 font-medium">+{att.correctCount || 0}</span>
                        <span className="mx-1">/</span>
                        <span className="text-rose-500 font-medium">-{att.incorrectCount || 0}</span>
                      </td>
                      <td className="py-3 pr-4 pl-2 text-right whitespace-nowrap">
                        <Link
                          href={reviewHref}
                          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)] hover:text-blue-700 hover:underline"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (<640px) */}
          <div className="sm:hidden divide-y divide-[var(--border)]">
            {filteredAttempts.map((att: RecordedTestAttempt, idx: number) => {
              const formattedDate = formatDateIndian(att.submittedAt || new Date());
              const maxMarks = att.maxMarks || MARKING_SCHEME.MAX_MARKS_PER_SUBJECT;
              const title = att.testTitle || `${att.subject || "Domain"} CBT Mock Test`;
              const reviewHref = (att.id || att.testId)
                ? (att.testId?.toLowerCase().includes("pyq")
                    ? `/dashboard/pyqs/analysis/${att.id || att.testId}`
                    : `/dashboard/mocks/analysis/${att.id || att.testId}`)
                : `/dashboard/mocks`;

              return (
                <div key={att.id || `mobile-session-${idx}`} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {att.subject || "Domain"}
                      </span>
                      <h4 className="text-[15px] font-semibold text-[var(--text)] leading-snug">{title}</h4>
                      <p className="text-[12px] text-[var(--text-muted)] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                      </p>
                    </div>
                    <Link
                      href={reviewHref}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[6px] bg-blue-50 text-[var(--accent)] border border-blue-200 text-[13px] font-semibold shrink-0"
                    >
                      <span>Review</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-[13px] pt-2 border-t border-[var(--border)] bg-slate-50/50 -mx-4 -mb-4 px-4 py-2.5 rounded-b-[8px] tabular-nums">
                    <div>
                      <span className="text-[var(--text-muted)] text-[11px] uppercase tracking-wider block">Score</span>
                      <span className="font-bold text-[var(--text)] text-[14px]">
                        {att.totalMarks} <span className="font-normal text-[var(--text-muted)] text-[12px]">/ {maxMarks}</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[var(--text-muted)] text-[11px] uppercase tracking-wider block">Accuracy</span>
                      <span className="font-bold text-[var(--text)] text-[14px]">
                        {att.accuracyPercentage}%
                      </span>
                    </div>

                    <div>
                      <span className="text-[var(--text-muted)] text-[11px] uppercase tracking-wider block">Correct / Wrong</span>
                      <span className="font-medium text-[13px]">
                        <span className="text-emerald-600 font-semibold">+{att.correctCount || 0}</span>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-rose-500 font-semibold">-{att.incorrectCount || 0}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
