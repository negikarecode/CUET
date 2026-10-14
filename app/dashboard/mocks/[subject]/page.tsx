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
  ChevronDown,
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
import { getMockStats } from "@/lib/mock-stats";
import { deduplicateTestAttempts } from "@/lib/analytics";
import { stringToUuid } from "@/lib/utils";
import { RecordedTestAttempt } from "@/types";

interface SubjectPageProps {
  params: {
    subject: string;
  };
}

type StatusFilter = "all" | "attempted" | "not_attempted";
type SortOption = "mock_number" | "best_score" | "lowest_score";

export default function SubjectMocksListPage({ params }: SubjectPageProps) {
  const routeParams = useParams();
  const rawSubject = (params?.subject || routeParams?.subject || "") as string;
  const subjectKey = decodeURIComponent(rawSubject).toLowerCase().trim();

  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

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
      const testUuid = stringToUuid(testId);

      // Find all attempts matching this specific mock test
      const matchingAttempts = cleanAttempts.filter((att) => {
        const attTId = (att.testId || "").trim();
        const attId = (att.id || "").trim();
        const attTitle = (att.testTitle || "").toLowerCase().trim();

        if (attTId === testId || attId === testId) return true;
        if (attTId && stringToUuid(attTId) === testUuid) return true;
        if (
          attTitle.includes(`mock ${mockNum}`) ||
          attTitle.includes(`mock paper ${mockNum}`) ||
          attTitle === test.label.toLowerCase() ||
          attTitle === (test.mockLabel || "").toLowerCase()
        ) {
          return true;
        }
        return false;
      });

      // Sort matching attempts chronologically to assign stable attempt numbers
      const sortedChronological = [...matchingAttempts].sort(
        (a, b) => new Date(a.submittedAt || 0).getTime() - new Date(b.submittedAt || 0).getTime()
      );

      // Best attempt selection: highest totalMarks, tiebreak on accuracy then time
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

      // Latest attempt date formatted Indian
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
  }, [mockTests, cleanAttempts]);

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
      // default: mock_number
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
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Domain Mock Exams</span>
        </Link>
      </div>

      {/* 2. Compressed Header: Title, one-line subtitle, slim spec line, stat chips, progress, CTA */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {subjectName} Domain Mock Exams
            </h1>
            <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium truncate max-w-2xl">
              Authentic 50-question compulsory full syllabus CBT simulation papers with instant solutions.
            </p>
            {/* Slim spec line replacing old large tiles */}
            <div className="flex items-center gap-2 text-[13px] text-slate-600 font-medium pt-0.5">
              <span>{durationMinutes} min</span>
              <span className="text-slate-300">·</span>
              <span>50 questions</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-slate-700">+5 / −1 marking</span>
            </div>
          </div>

          {/* Primary CTA button in header: opens first unattempted mock */}
          <div className="shrink-0 flex items-center gap-2">
            <Link
              href={mockStats.isAllAttempted ? `/test/${mockTests[0]?.id || `${subjectKey}-mock-1`}?reattempt=true` : `/test/${nextMockId}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {mockStats.isAllAttempted ? (
                <>
                  <RotateCw className="w-4 h-4" />
                  <span>Re-attempt All Mocks</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Next Mock (Mock {mockStats.nextUnattemptedMockIndex})</span>
                </>
              )}
            </Link>
          </div>
        </div>

        {/* Stat Chips + Progress bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold">
            <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/60 tabular-nums">
              {mockStats.attemptedMocksCount} of {mockTests.length} Attempted
            </span>

            <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 tabular-nums">
              Peak Score: {mockStats.peakScore !== null ? `${mockStats.peakScore} / ${mockStats.peakMaxMarks}` : "—"}
            </span>

            <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 tabular-nums">
              Avg Accuracy: {mockStats.attemptedMocksCount > 0 ? `${mockStats.averageAccuracy}%` : "—"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-slate-500 min-w-[180px]">
            <span className="shrink-0 font-medium tabular-nums">{progressPercent}% Completed</span>
            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Toolbar: Status segmented filter & Sort control (slim 56px row) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Status segmented control */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[12px] font-semibold">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({mockCardsData.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("attempted")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusFilter === "attempted"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Attempted ({mockStats.attemptedMocksCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("not_attempted")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              statusFilter === "not_attempted"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Not attempted ({mockCardsData.length - mockStats.attemptedMocksCount})
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-slate-500">Sort by:</span>
          <div className="relative">
            <select
              aria-label="Sort mock tests"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-[13px] pl-3 pr-8 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none transition-colors"
            >
              <option value="mock_number">Mock Number (1 to 20)</option>
              <option value="best_score">Best Score (Highest)</option>
              <option value="lowest_score">Lowest Score</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Mock Cards Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      {displayedCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          {displayedCards.map((card) => {
            const { test, mockNum, attemptsCount, hasAttempted, bestAttempt, bestAttemptNumber, lastAttemptDate } =
              card;

            // TODO: If per-mock unit emphasis or difficulty metadata is added to data schema, render it here.
            const isNegativeScore = (bestAttempt?.totalMarks ?? 0) < 0;

            return (
              <div
                key={test.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 min-w-0"
              >
                <div className="space-y-3 flex-1 flex flex-col min-w-0">
                  {/* Title with mock number (no repeated badges or repeated tags) */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      Full Syllabus Mock {mockNum}
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                      Mock #{mockNum}
                    </span>
                  </div>

                  {/* Status area: Fixed minimum height (~56px) on every card */}
                  <div className="min-h-[56px] flex flex-col justify-center">
                    {hasAttempted && bestAttempt ? (
                      <div className="px-3.5 py-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-slate-900 space-y-1 text-[13px]">
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
                                className="inline-flex items-center text-rose-600 cursor-help focus:outline-none"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                          <span className="text-[12px] font-normal text-amber-800">
                            Attempt #{bestAttemptNumber}
                          </span>
                        </div>

                        {/* Accuracy, total attempts & last attempt date taken strictly from same attempt data */}
                        <div className="flex items-center gap-1 text-[12px] text-amber-900/80 font-normal truncate">
                          <span>{bestAttempt.accuracyPercentage}% accuracy</span>
                          <span>·</span>
                          <span>
                            {attemptsCount} {attemptsCount === 1 ? "attempt" : "attempts"}
                          </span>
                          {lastAttemptDate && (
                            <>
                              <span>·</span>
                              <span>Last: {lastAttemptDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full min-h-[56px] flex items-center gap-2 text-slate-400 text-[13px] bg-slate-50/70 border border-slate-100 rounded-2xl px-3.5 py-2.5">
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
                        href={`/dashboard/mocks/analysis/${bestAttempt.id || test.id}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-xs hover:shadow transition-all"
                      >
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>Analysis</span>
                      </Link>

                      <Link
                        href={`/test/${test.id}?reattempt=true`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] transition-all"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                        <span>Re-attempt</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={`/test/${test.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-[13px] shadow-xs hover:shadow transition-all"
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
        <div className="bg-white rounded-3xl border border-slate-100 p-10 text-center space-y-3">
          <p className="text-base font-semibold text-slate-800">No mock tests match the selected status filter.</p>
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
