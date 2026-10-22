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
} from "lucide-react";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";
import {
  CUET_SUBJECTS,
  getMockTestsForSubject,
  MockTestItem,
  SUBJECT_DURATION_MINUTES,
} from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useEntitlement } from "@/lib/hooks/useEntitlement";
import { getMockStats, matchesMockPaper, isFullLengthMockAttempt } from "@/lib/mock-stats";
import { deduplicateTestAttempts, normalizeSubject } from "@/lib/analytics";
import { RecordedTestAttempt } from "@/types";
import SearchableSelect from "@/components/ui/SearchableSelect";

export interface SubjectMocksClientProps {
  subject?: string;
  initialIsPremium?: boolean;
  initialIsVerified?: boolean;
  initialUserId?: string;
}

type StatusFilter = "all" | "attempted" | "not_attempted";
type SortOption = "mock_number" | "best_score" | "lowest_score";

export default function SubjectMocksClient({
  subject: propSubject,
  initialIsPremium = false,
  initialIsVerified = false,
  initialUserId,
}: SubjectMocksClientProps) {
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

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("mock_number");

  const metadata = getSubjectMetadata(subjectKey);
  const subjectConfig = CUET_SUBJECTS.find(
    (s) => s.id === subjectKey || s.name.toLowerCase() === subjectKey
  );

  const subjectName =
    metadata?.name ??
    subjectConfig?.name ??
    (subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1).replace(/[-_]/g, " "));

  const durationMinutes =
    SUBJECT_DURATION_MINUTES[subjectKey] ??
    (["322", "306", "319", "301", "309", "308", "501"].includes(metadata?.officialCode || "") ? 60 : 45);

  const mockTests: MockTestItem[] = useMemo(() => {
    return getMockTestsForSubject(subjectKey);
  }, [subjectKey]);

  // Authoritative subject mock statistics (single source of truth)
  const mockStats = useMemo(() => {
    if (!isClient) {
      return {
        attemptedMocksCount: 0,
        totalMocksCount: mockTests.length || 20,
        peakScore: null as number | null,
        peakMaxMarks: 250,
        averageAccuracy: 0,
        nextUnattemptedMockIndex: 1,
        isAllAttempted: false,
        hasAttempts: false,
      };
    }
    return getMockStats(subjectKey, testAttempts || []);
  }, [isClient, subjectKey, testAttempts, mockTests.length]);

  // Clean deduplicated attempts list
  const cleanAttempts = useMemo(() => {
    return deduplicateTestAttempts(testAttempts || []);
  }, [testAttempts]);

  // Distinct unlocked mock IDs across all subjects on the platform
  const unlockedDistinctMockIds = useMemo(() => {
    const set = new Set<string>();
    (cleanAttempts || []).forEach((att) => {
      if (isFullLengthMockAttempt(att)) {
        const id = (att.testId || att.id || "").toLowerCase().trim();
        if (id) set.add(id);
      }
    });
    return set;
  }, [cleanAttempts]);

  const totalUnlockedDistinctMocks = unlockedDistinctMockIds.size;

  // Subject-specific mock attempts
  const subjectMockAttempts = useMemo(() => {
    const canonicalKey = normalizeSubject(subjectKey).key;
    return cleanAttempts.filter((att) => {
      if (!isFullLengthMockAttempt(att)) return false;
      const attSubj = normalizeSubject(att.subject || att.testTitle || "").key;
      return attSubj === canonicalKey;
    });
  }, [cleanAttempts, subjectKey]);

  // Next unattempted mock ID for the header primary action button
  const nextMockId = useMemo(() => {
    const nextIdx = mockStats.nextUnattemptedMockIndex;
    const item = mockTests[nextIdx - 1];
    return item ? item.id : mockTests[0]?.id || `${subjectKey}-mock-1`;
  }, [mockStats.nextUnattemptedMockIndex, mockTests, subjectKey]);

  // Map each mock test to its attempt history and authoritative best attempt
  const mockCardsData = useMemo(() => {
    return mockTests.map((test, idx) => {
      const mockNum = test.mockNumber || idx + 1;
      const testId = test.id;

      const matchingAttempts = subjectMockAttempts.filter((att) =>
        matchesMockPaper(att, subjectKey, testId, mockNum)
      );

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
        mockNum,
        attemptsCount: sortedChronological.length,
        hasAttempted: Boolean(bestAttempt),
        bestAttempt,
        bestAttemptNumber,
        lastAttemptDate,
      };
    });
  }, [mockTests, subjectMockAttempts, subjectKey]);

  // Filtered & sorted cards
  const displayedCards = useMemo(() => {
    let list = mockCardsData;

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
      return a.mockNum - b.mockNum;
    });
  }, [mockCardsData, statusFilter, sortBy]);

  const progressPercent = Math.min(
    100,
    Math.round((mockStats.attemptedMocksCount / (mockTests.length || 20)) * 100)
  );

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-5 sm:space-y-6">
      {/* 1. Breadcrumb navigation */}
      <div>
        <Link
          href="/dashboard/mocks"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Mock Exams</span>
        </Link>
      </div>

      {/* Free Plan Status & Limit Banner - Render ONLY after confirming user is on Free Plan */}
      {isConfirmedFree && (
        <div className="bg-gradient-to-r from-amber-50 via-white to-blue-50 rounded-2xl border border-amber-200/90 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                FREE PLAN STATUS
              </span>
              <span className="text-xs font-bold text-slate-700">
                {Math.min(3, totalUnlockedDistinctMocks)} of 3 Free Mock Exams Unlocked
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Free plan includes 3 distinct full CBT mock exams with unlimited retries. Mock 4 through 20 and unlimited subject mocks require CUETMate Premium.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2.5">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to Premium (₹499)</span>
            </Link>
          </div>
        </div>
      )}

      {/* 2. Compact Subject Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {subjectName} Mock Exams
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium truncate max-w-2xl">
              Authentic 50-question compulsory full syllabus CBT simulation papers with instant solutions.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-0.5">
              <span>{durationMinutes} min</span>
              <span className="text-slate-300">·</span>
              <span>50 questions</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-slate-700">+5 / −1 marking</span>
            </div>
          </div>

          {/* Primary CTA button in header: opens first unattempted mock or upgrade if confirmed free and locked */}
          <div className="shrink-0 flex items-center gap-2">
            {!isPremium && isConfirmedFree && (mockStats.nextUnattemptedMockIndex > 3 || (totalUnlockedDistinctMocks >= 3 && !unlockedDistinctMockIds.has(nextMockId.toLowerCase()))) ? (
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock All 20 Mocks (₹499)</span>
              </Link>
            ) : (
              <Link
                href={mockStats.isAllAttempted ? `/test/${mockTests[0]?.id || `${subjectKey}-mock-1`}?reattempt=true` : `/test/${nextMockId}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
              >
                {mockStats.isAllAttempted ? (
                  <>
                    <RotateCw className="w-4 h-4" />
                    <span>Re-attempt All Mocks</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Mock {mockStats.nextUnattemptedMockIndex}</span>
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
              {mockStats.attemptedMocksCount} of {mockTests.length || 20} Attempted
            </span>

            {mockStats.peakScore !== null && (
              <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center gap-1.5 tabular-nums">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Peak: {mockStats.peakScore} / {mockStats.peakMaxMarks}</span>
                {mockStats.peakScore < 0 && (
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

            {mockStats.averageAccuracy > 0 && (
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 tabular-nums">
                {mockStats.averageAccuracy}% Avg Accuracy
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

      {/* 3. Filter and Sorting Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs self-start">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Mocks ({mockCardsData.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("attempted")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === "attempted"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Attempted ({mockStats.attemptedMocksCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("not_attempted")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === "not_attempted"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Unattempted ({Math.max(0, (mockTests.length || 20) - mockStats.attemptedMocksCount)})
          </button>
        </div>

        <div className="w-full sm:w-48">
          <SearchableSelect
            options={[
              { value: "mock_number", label: "Sort: Mock Number (1-20)" },
              { value: "best_score", label: "Sort: Highest Score" },
              { value: "lowest_score", label: "Sort: Lowest Score" },
            ]}
            value={sortBy}
            onChange={(val) => setSortBy(val as SortOption)}
            placeholder="Sort by"
          />
        </div>
      </div>

      {/* 4. Mock Cards Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      {displayedCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          {displayedCards.map((card) => {
            const { test, mockNum, attemptsCount, hasAttempted, bestAttempt, bestAttemptNumber, lastAttemptDate } =
              card;
            const isNegativeScore = (bestAttempt?.totalMarks ?? 0) < 0;

            return (
              <div
                key={test.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4 min-w-0"
              >
                <div className="space-y-3 flex-1 flex flex-col min-w-0">
                  {/* Title with mock number as visual anchor */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Full Syllabus Mock {mockNum}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {!isPremium && isConfirmedFree && (
                        hasAttempted ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 inline-flex items-center gap-1">
                            FREE — UNLIMITED RETRIES
                          </span>
                        ) : mockNum > 3 || totalUnlockedDistinctMocks >= 3 ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 inline-flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-600" />
                            <span>Premium</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            FREE
                          </span>
                        )
                      )}
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                        Mock #{mockNum}
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
                  {!isPremium && isConfirmedFree && mockNum > 3 ? (
                    <Link
                      href="/pricing"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Upgrade to Unlock (₹499)</span>
                    </Link>
                  ) : hasAttempted && bestAttempt ? (
                    <>
                      <Link
                        href={`/dashboard/mocks/analysis/${bestAttempt.id || test.id}`}
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
                  ) : !isPremium && isConfirmedFree && totalUnlockedDistinctMocks >= 3 ? (
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
          <p className="text-sm font-semibold text-slate-800">No mock tests match the selected status filter.</p>
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Show all mocks
          </button>
        </div>
      )}
    </div>
  );
}
