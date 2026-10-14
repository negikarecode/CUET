"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  BookOpen,
} from "lucide-react";
import practiceManifest from "@/lib/data/practice_test_manifest.json";
import { useTestStore } from "@/lib/store/useTestStore";
import {
  getPracticeStats,
  PracticeStatsResult,
  normalizePracticeFolder,
} from "@/lib/practice-stats";
import type { TopicMastery } from "@/types";

interface PageProps {
  params: {
    subject: string;
  };
}

// In-memory module-level cache to remember expanded unit state per subject during session
const subjectExpandedStateCache: Record<string, Record<number, boolean>> = {};

export default function SubjectPracticeDetailPage({ params }: PageProps) {
  const decodedSubject = decodeURIComponent(params.subject).toLowerCase();
  const testAttempts = useTestStore((s) => s.testAttempts);
  const topicMastery: TopicMastery[] = useTestStore((s) => {
    const an = s.analytics;
    if (!an) return [];
    return an.allTopics || [...(an.weaknessRadar || []), ...(an.strengthList || [])];
  });

  // Find canonical subject data from manifest
  const subjectEntry = useMemo(() => {
    const rawData = (practiceManifest as Record<string, any>)[decodedSubject];
    if (rawData) return { ...rawData, folder: decodedSubject };

    for (const [folder, data] of Object.entries(practiceManifest)) {
      if (
        folder.toLowerCase() === decodedSubject ||
        data.name.toLowerCase() === decodedSubject ||
        data.code === decodedSubject
      ) {
        return { ...data, folder };
      }
    }
    return null;
  }, [decodedSubject]);

  const folder = subjectEntry ? subjectEntry.folder : normalizePracticeFolder(decodedSubject);
  const units: any[] = subjectEntry?.units || [];
  const totalTests = units.length * 20;

  // Single authoritative practice stats for this subject
  const subjectStats = useMemo(() => {
    return getPracticeStats(folder, undefined, testAttempts);
  }, [folder, testAttempts]);

  // Per-unit authoritative practice stats
  const unitStatsMap = useMemo(() => {
    const map = new Map<number, PracticeStatsResult>();
    for (const u of units) {
      map.set(u.unitNumber, getPracticeStats(folder, u.unitNumber, testAttempts));
    }
    return map;
  }, [folder, units, testAttempts]);

  // In-memory expanded units state: default open unit with next unattempted test
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>(() => {
    if (subjectExpandedStateCache[folder]) {
      return subjectExpandedStateCache[folder];
    }
    const defaultUnit = subjectStats.nextUnattemptedUnit || units[0]?.unitNumber || 1;
    const initial = { [defaultUnit]: true };
    subjectExpandedStateCache[folder] = initial;
    return initial;
  });

  // Keep cache synced
  const updateExpanded = (newVal: Record<number, boolean>) => {
    subjectExpandedStateCache[folder] = newVal;
    setExpandedUnits(newVal);
  };

  const toggleUnit = (unitNumber: number) => {
    updateExpanded({
      ...expandedUnits,
      [unitNumber]: !expandedUnits[unitNumber],
    });
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    units.forEach((u) => {
      all[u.unitNumber] = true;
    });
    updateExpanded(all);
  };

  const collapseAll = () => {
    updateExpanded({});
  };

  // Find lowest accuracy unit for "Practice weak topics" CTA
  const lowestAccuracyUnit = useMemo(() => {
    let minAcc = 101;
    let targetUnitNum: number | null = null;
    unitStatsMap.forEach((uStat, uNum) => {
      if (uStat.attemptedCount > 0 && uStat.accuracy !== null && uStat.accuracy < minAcc) {
        minAcc = uStat.accuracy;
        targetUnitNum = uNum;
      }
    });
    return targetUnitNum;
  }, [unitStatsMap]);

  const handlePracticeWeakTopics = () => {
    const targetUnit = lowestAccuracyUnit || subjectStats.nextUnattemptedUnit || 1;
    updateExpanded({
      ...expandedUnits,
      [targetUnit]: true,
    });
    const el = document.getElementById(`unit-card-${targetUnit}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!subjectEntry) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Subject Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested subject &quot;{decodedSubject}&quot; is not available in the curriculum manifest.
        </p>
        <Link
          href="/dashboard/practice"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Practice Tests</span>
        </Link>
      </div>
    );
  }

  const { name } = subjectEntry;
  const progressPct = totalTests > 0 ? Math.round((subjectStats.attemptedCount / totalTests) * 100) : 0;
  const nextTestTarget = subjectStats.nextUnattemptedTestId || `practice-${folder}-unit1-test1`;

  // Helper for topic mastery matching
  const getTopicMetrics = (topicName: string) => {
    if (!topicMastery || topicMastery.length === 0) return null;
    const cleanTopic = topicName.toLowerCase().trim();
    const match = topicMastery.find((tm: TopicMastery) => {
      const s = (tm.subject || "").toLowerCase();
      const c = (tm.chapter || "").toLowerCase();
      const m = (tm.microTopic || "").toLowerCase();
      const matchesSubject = s.includes(folder) || folder.includes(s);
      const matchesTopic =
        c.includes(cleanTopic) ||
        cleanTopic.includes(c) ||
        m.includes(cleanTopic) ||
        cleanTopic.includes(m);
      return matchesSubject && matchesTopic && tm.attemptsCount > 0;
    });
    if (!match || match.attemptsCount === 0) return null;
    return match.accuracyPercentage;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Navigation */}
      <div>
        <Link
          href="/dashboard/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Practice Tests</span>
        </Link>
      </div>

      {/* Compressed Header Banner (Fits above fold at 1366px) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {name} Practice Tests
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {units.length} units · {totalTests} tests · 25 min each · +5 / -1 marking
            </p>

            {/* Progress summary bar */}
            <div className="pt-1 space-y-1.5 max-w-md">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>
                  {subjectStats.attemptedCount} / {totalTests} done ({progressPct}%)
                </span>
                {subjectStats.accuracy !== null ? (
                  <span className="text-blue-600 font-bold">{subjectStats.accuracy}% accuracy</span>
                ) : (
                  <span className="text-slate-400 font-normal">Not started</span>
                )}
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/test/${nextTestTarget}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {subjectStats.hasAttempts ? "Continue Practice" : "Start First Test"}
              </span>
            </Link>

            <button
              onClick={handlePracticeWeakTopics}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Practice weak topics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Syllabus Units ({units.length})
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Expand All
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Units Accordion List */}
      <div className="space-y-4">
        {units.map((unit: any) => {
          const isExpanded = !!expandedUnits[unit.unitNumber];
          const unitStat = unitStatsMap.get(unit.unitNumber);
          const attemptedInUnit = unitStat ? unitStat.attemptedCount : 0;
          const unitAccuracy = unitStat?.accuracy;
          const unitPct = Math.round((attemptedInUnit / 20) * 100);

          return (
            <div
              key={unit.unitNumber}
              id={`unit-card-${unit.unitNumber}`}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Unit Header Bar */}
              <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.unitNumber)}
                  className="flex-1 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-sans">
                        Unit {unit.unitNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {attemptedInUnit} / 20 done
                        {unitAccuracy !== null && (
                          <span className="ml-1 text-blue-600">· {unitAccuracy}% accuracy</span>
                        )}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {unit.unitTitle}
                    </h3>
                  </div>

                  {/* Thin Progress bar */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 sm:w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${unitPct}%` }}
                      />
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-3 shrink-0">
                  {/* TODO: notes feature removed; will link to rich revision notes when re-enabled */}
                  <Link
                    href={`/dashboard/notes/${folder}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read notes</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleUnit(unit.unitNumber)}
                    aria-label={isExpanded ? "Collapse unit" : "Expand unit"}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sub-topics chips row */}
              {unit.topics && unit.topics.length > 0 && (
                <div className="px-4 sm:px-5 pb-3 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">Topics:</span>
                  {unit.topics.map((topic: string, tIdx: number) => {
                    const acc = getTopicMetrics(topic);

                    if (acc === null) {
                      return (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {topic}
                        </span>
                      );
                    }

                    if (acc < 40) {
                      return (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200"
                        >
                          <AlertTriangle className="w-3 h-3 text-rose-500 shrink-0" />
                          <span>{topic}</span>
                          <span className="text-[10px] font-bold">({acc}% · Needs work)</span>
                        </span>
                      );
                    }

                    if (acc <= 70) {
                      return (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200"
                        >
                          <span>{topic}</span>
                          <span className="text-[10px]">({acc}%)</span>
                        </span>
                      );
                    }

                    return (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        <span>{topic}</span>
                        <span className="text-[10px]">({acc}%)</span>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Unit Tests Grid (Visible when expanded) */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/40">
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
                    {/* TODO: practice_test_manifest.json currently generates tests 1-20 dynamically without per-test names or subtopic metadata. Displaying 'Test N' until per-test metadata is added. */}
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((testNum) => {
                      const testId = `practice-${folder}-unit${unit.unitNumber}-test${testNum}`;
                      const testStat = subjectStats.testsMap.get(testId);
                      const isAttempted = !!testStat?.hasAttempted;
                      const isNext = testId === subjectStats.nextUnattemptedTestId;
                      const isNegative = isAttempted && testStat.bestScore !== null && testStat.bestScore < 0;

                      if (!isAttempted) {
                        return (
                          <Link
                            key={testNum}
                            href={`/test/${testId}`}
                            className={`group relative h-[78px] rounded-xl border p-2.5 flex flex-col justify-between transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              isNext
                                ? "bg-blue-50/50 border-blue-300 ring-2 ring-blue-500 shadow-xs"
                                : "bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50/60"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800">
                                Test {testNum}
                              </span>
                              {isNext ? (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                                  Next
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium text-slate-400">
                                  20 Qs
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between text-xs font-semibold text-blue-600">
                              <span className="text-[11px] font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                                Start
                              </span>
                              <Play className="w-3 h-3 fill-current group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={testNum}
                          tabIndex={0}
                          className={`group relative h-[78px] rounded-xl border p-2.5 flex flex-col justify-between transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isNext
                              ? "bg-blue-50/40 border-blue-300 ring-2 ring-blue-500"
                              : "bg-slate-50/70 border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          {/* Default content */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="text-xs font-bold text-slate-800 truncate">
                                Test {testNum}
                              </span>
                            </div>

                            {isNegative ? (
                              <span
                                className="inline-flex items-center gap-0.5 text-[11px] font-bold text-rose-600 cursor-help"
                                title="Includes negative marking (+5 / -1). Wrong answers can reduce your score below 0."
                              >
                                {testStat.bestScore}/{testStat.maxMarks}
                                <AlertCircle className="w-3 h-3 shrink-0" />
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-700">
                                {testStat.bestScore}/{testStat.maxMarks}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-semibold text-slate-600">
                              {testStat.accuracy}% acc
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {testStat.attemptsCount > 1
                                ? `${testStat.attemptsCount} attempts`
                                : "Attempted"}
                            </span>
                          </div>

                          {/* Reveal overlay on hover or focus-within: Analysis first, then Re-attempt */}
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2 z-10">
                            <Link
                              href={`/dashboard/pyqs/analysis/${testStat.bestAttempt?.id || ""}`}
                              className="flex-1 text-center py-1.5 px-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold transition-colors shadow-2xs"
                            >
                              Analysis
                            </Link>
                            <Link
                              href={`/test/${testId}?reattempt=true`}
                              className="flex-1 text-center py-1.5 px-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors"
                            >
                              Re-attempt
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
