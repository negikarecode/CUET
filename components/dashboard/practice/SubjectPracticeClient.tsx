"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Play,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Briefcase,
  TrendingUp,
  ScrollText,
  Landmark,
  Globe,
  BrainCircuit,
  Users,
  Activity,
  Laptop,
  Home,
  Tv,
  Leaf,
  Palette,
  Sprout,
  Footprints,
  FileText,
  Layers,
  Compass,
  Lock,
} from "lucide-react";
import practiceManifest from "@/lib/data/practice_test_manifest.json";
import { useTestStore } from "@/lib/store/useTestStore";
import { useEntitlement } from "@/lib/hooks/useEntitlement";
import {
  getPracticeStats,
  PracticeStatsResult,
  normalizePracticeFolder,
} from "@/lib/practice-stats";

export interface SubjectPracticeClientProps {
  subject?: string;
  initialIsPremium?: boolean;
  initialIsVerified?: boolean;
  initialUserId?: string;
}

const SUBJECT_STREAM_MAP: Record<
  string,
  { icon: any; accentColor: string; badgeBg: string }
> = {
  physics: { icon: Atom, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  chemistry: { icon: FlaskConical, accentColor: "#7C3AED", badgeBg: "#EDE9FE" },
  maths: { icon: Calculator, accentColor: "#2563EB", badgeBg: "#DBEAFE" },
  bio: { icon: Dna, accentColor: "#059669", badgeBg: "#D1FAE5" },
  accountancy: { icon: Calculator, accentColor: "#D97706", badgeBg: "#FEF3C7" },
  eco: { icon: TrendingUp, accentColor: "#0D9488", badgeBg: "#CCFBF1" },
  bst: { icon: Briefcase, accentColor: "#4F46E5", badgeBg: "#E0E7FF" },
  history: { icon: ScrollText, accentColor: "#B45309", badgeBg: "#FEF3C7" },
  "pol science": { icon: Landmark, accentColor: "#DC2626", badgeBg: "#FEE2E2" },
  geo: { icon: Globe, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  psychology: { icon: BrainCircuit, accentColor: "#9333EA", badgeBg: "#F3E8FF" },
  sociology: { icon: Users, accentColor: "#EA580C", badgeBg: "#FFEDD5" },
  physical_education: { icon: Activity, accentColor: "#16A34A", badgeBg: "#DCFCE7" },
  computer_science: { icon: Laptop, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  home_science: { icon: Home, accentColor: "#DB2777", badgeBg: "#FCE7F3" },
  mass_media: { icon: Tv, accentColor: "#6366F1", badgeBg: "#EEF2FF" },
  environmental_studies: { icon: Leaf, accentColor: "#059669", badgeBg: "#D1FAE5" },
  fine_arts: { icon: Palette, accentColor: "#CA8A04", badgeBg: "#FEF08A" },
  agriculture: { icon: Sprout, accentColor: "#15803D", badgeBg: "#DCFCE7" },
  anthropology: { icon: Footprints, accentColor: "#854D0E", badgeBg: "#FEF9C3" },
  english: { icon: FileText, accentColor: "#2563EB", badgeBg: "#DBEAFE" },
  "general-test": { icon: Layers, accentColor: "#7C3AED", badgeBg: "#EDE9FE" },
};

// In-memory module-level cache to remember expanded unit state per subject during session
const subjectExpandedStateCache: Record<string, Record<number, boolean>> = {};

export default function SubjectPracticeClient({
  subject: propSubject,
  initialIsPremium = false,
  initialIsVerified = false,
  initialUserId,
}: SubjectPracticeClientProps) {
  const routeParams = useParams();
  const rawSubject = (propSubject || routeParams?.subject || "") as string;
  const decodedSubject = decodeURIComponent(rawSubject).toLowerCase();

  const testAttempts = useTestStore((s) => s.testAttempts);

  // Authoritative entitlement hook
  const { isPremium, isConfirmedFree } = useEntitlement({
    initialIsPremium,
    initialIsVerified,
    initialUserId,
  });

  const totalCompletedPracticeSessions = useMemo(() => {
    return (testAttempts || []).filter((att) => {
      const id = (att.testId || "").toLowerCase();
      const title = (att.testTitle || "").toLowerCase();
      return (
        id.includes("practice") ||
        id.includes("unit") ||
        title.includes("practice") ||
        title.includes("drill") ||
        (att.totalQuestions !== undefined && att.totalQuestions <= 25)
      );
    }).length;
  }, [testAttempts]);

  // Distinct unlocked practice test IDs across all subjects on the platform
  const unlockedDistinctPracticeIds = useMemo(() => {
    const set = new Set<string>();
    (testAttempts || []).forEach((att) => {
      const id = (att.testId || "").toLowerCase();
      const title = (att.testTitle || "").toLowerCase();
      if (
        id.includes("practice") ||
        id.includes("unit") ||
        title.includes("practice") ||
        title.includes("drill") ||
        (att.totalQuestions !== undefined && att.totalQuestions <= 25)
      ) {
        if (att.testId) set.add(att.testId.toLowerCase().trim());
      }
    });
    return set;
  }, [testAttempts]);

  const totalUnlockedDistinctPractice = unlockedDistinctPracticeIds.size;

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
  const units: any[] = useMemo(() => subjectEntry?.units || [], [subjectEntry]);
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

  const { name, code } = subjectEntry;
  const meta = SUBJECT_STREAM_MAP[folder] || {
    icon: BookOpen,
    accentColor: "#2563EB",
    badgeBg: "#DBEAFE",
  };
  const IconComp = meta.icon;

  const progressPct = totalTests > 0 ? Math.round((subjectStats.attemptedCount / totalTests) * 100) : 0;
  const nextTestTarget = subjectStats.nextUnattemptedTestId || `practice-${folder}-unit1-test1`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
      {/* 1. Breadcrumb navigation */}
      <div>
        <Link
          href="/dashboard/practice"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Practice Tests</span>
        </Link>
      </div>

      {/* Free Plan Status & Limit Banner - Rendered ONLY after confirming user is on Free Plan */}
      {isConfirmedFree && (
        <div className="bg-gradient-to-r from-amber-50 via-white to-blue-50 rounded-2xl border border-amber-200/90 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                FREE PLAN STATUS
              </span>
              <span className="text-xs font-bold text-slate-700">
                {Math.min(3, totalUnlockedDistinctPractice)} of 3 Free Practice Tests Unlocked
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Free plan includes 3 distinct unit practice tests with unlimited retries. Additional units and unlimited practice tests require CUETMate Premium.
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

      {/* 2. Subject Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 tracking-wide uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>CUET UG 2026 Curriculum · Code {code}</span>
            </div>

            <div className="flex items-start sm:items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: meta.badgeBg, color: meta.accentColor }}
              >
                <IconComp className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {name} Practice Tests
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {units.length} syllabus units · {totalTests} practice tests · 20 questions each · 25 min · +5 / -1 marking
                </p>
              </div>
            </div>

            {/* Progress summary bar */}
            <div className="pt-1 space-y-1.5 max-w-md">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>
                  {subjectStats.attemptedCount} / {totalTests} completed ({progressPct}%)
                </span>
                {subjectStats.accuracy !== null ? (
                  <span className="text-blue-600 font-bold">{subjectStats.accuracy}% accuracy</span>
                ) : (
                  <span className="text-slate-400 font-normal">Not started</span>
                )}
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    progressPct >= 100
                      ? "bg-emerald-600"
                      : progressPct > 0
                      ? "bg-blue-600"
                      : "bg-transparent"
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {!isPremium && isConfirmedFree && totalCompletedPracticeSessions >= 3 ? (
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock All Practice Tests (₹499)</span>
              </Link>
            ) : (
              <Link
                href={`/test/${nextTestTarget}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {subjectStats.attemptedCount === 0 ? "Start First Test" : "Continue Next Practice Test"}
                </span>
              </Link>
            )}

            {lowestAccuracyUnit && (
              <button
                type="button"
                onClick={handlePracticeWeakTopics}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-all shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Target Weak Units</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Units Section Toolbar */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Syllabus Units ({units.length})
        </h2>
        <div className="flex items-center gap-3 text-xs font-semibold text-blue-600">
          <button
            type="button"
            onClick={expandAll}
            className="hover:underline focus:outline-none"
          >
            Expand All
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={collapseAll}
            className="hover:underline focus:outline-none"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* 4. Units Accordion List */}
      <div className="space-y-4">
        {units.map((unit) => {
          const unitStat = unitStatsMap.get(unit.unitNumber);
          const isExpanded = !!expandedUnits[unit.unitNumber];
          const isComplete = (unitStat?.attemptedCount || 0) >= 20;
          const hasAttempts = (unitStat?.attemptedCount || 0) > 0;
          const unitAccuracy = unitStat?.accuracy;

          return (
            <div
              key={unit.unitNumber}
              id={`unit-card-${unit.unitNumber}`}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                isExpanded ? "border-slate-300 shadow-xs" : "border-slate-200/90 hover:border-slate-300"
              }`}
            >
              {/* Unit Header Row */}
              <button
                type="button"
                onClick={() => toggleUnit(unit.unitNumber)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-slate-50/50 focus:outline-none"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 text-xs sm:text-sm font-bold ${
                      isComplete
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : hasAttempts
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <span>U{unit.unitNumber}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Unit {unit.unitNumber}
                      </span>
                      {unitAccuracy !== null && unitAccuracy !== undefined && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            unitAccuracy >= 80
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : unitAccuracy >= 50
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {unitAccuracy}% Accuracy
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {unit.unitName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                  {/* Progress Indicator */}
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-800">
                      {unitStat?.attemptedCount || 0} / 20 Completed
                    </div>
                    <div className="text-[11px] font-medium text-slate-600">
                      {unitStat?.attemptedCount === 0
                        ? "Not started"
                        : unitStat?.nextUnattemptedTestId
                        ? `Next: Test ${unitStat.nextUnattemptedTestId.split("-test")[1]}`
                        : "All attempted"}
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Topics chips summary */}
              {!isExpanded && unit.topics && unit.topics.length > 0 && (
                <div className="px-4 pb-3.5 pt-0 flex flex-wrap gap-1.5">
                  {unit.topics.slice(0, 4).map((t: string, i: number) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 truncate max-w-[200px]"
                    >
                      {t}
                    </span>
                  ))}
                  {unit.topics.length > 4 && (
                    <span className="text-[11px] font-semibold text-slate-600 px-1 pt-0.5">
                      +{unit.topics.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Unit Tests Grid (Visible when expanded) */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50">
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((testNum) => {
                      const testId = `practice-${folder}-unit${unit.unitNumber}-test${testNum}`;
                      const testStat = subjectStats.testsMap.get(testId);
                      const isAttempted = !!testStat?.hasAttempted;
                      const isNext = testId === subjectStats.nextUnattemptedTestId;
                      const isNegative = isAttempted && testStat.bestScore !== null && testStat.bestScore < 0;

                      const isLocked = !isPremium && isConfirmedFree && !isAttempted && (unit.unitNumber > 1 || testNum > 3 || totalUnlockedDistinctPractice >= 3);

                      if (!isAttempted) {
                        if (isLocked) {
                          return (
                            <Link
                              key={testNum}
                              href="/pricing"
                              className="group relative h-[82px] rounded-xl border border-amber-200/90 bg-amber-50/50 p-2.5 flex flex-col justify-between transition-all hover:border-amber-300"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800">
                                  Test {testNum}
                                </span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-0.5">
                                  <Lock className="w-2.5 h-2.5 text-amber-600" />
                                  Premium
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs font-semibold text-amber-800">
                                <span className="text-[11px] font-medium text-amber-700">
                                  Unlock
                                </span>
                                <Lock className="w-3 h-3 text-amber-600" />
                              </div>
                            </Link>
                          );
                        }

                        return (
                          <Link
                            key={testNum}
                            href={`/test/${testId}`}
                            className={`group relative h-[82px] rounded-xl border p-2.5 flex flex-col justify-between transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              isNext
                                ? "bg-blue-50/60 border-blue-400 ring-2 ring-blue-500/20 shadow-xs"
                                : "bg-white border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800">
                                Test {testNum}
                              </span>
                              {isNext ? (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-2xs">
                                  Next
                                </span>
                              ) : !isPremium && isConfirmedFree && !isLocked ? (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  FREE
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
                          className={`group relative h-[82px] rounded-xl border p-2.5 flex flex-col justify-between transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isNext
                              ? "bg-blue-50/50 border-blue-400 ring-2 ring-blue-500/20"
                              : "bg-slate-50/80 border-slate-200/90 hover:border-blue-300"
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
                            <span
                              className={`text-[11px] font-bold tabular-nums inline-flex items-center gap-0.5 ${
                                isNegative
                                  ? "text-rose-600"
                                  : (testStat?.bestScore ?? 0) >= 80
                                  ? "text-emerald-700"
                                  : "text-blue-700"
                              }`}
                            >
                              {testStat?.bestScore} / 100
                              {isNegative && (
                                <span
                                  tabIndex={0}
                                  role="tooltip"
                                  aria-label="Score reflects negative marking (-1 per wrong answer)."
                                  title="Score reflects negative marking (-1 per wrong answer)."
                                  className="inline-flex items-center text-rose-600 cursor-help focus:outline-none"
                                >
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                            <span>{testStat?.accuracy ?? 0}% acc</span>
                            <span className="text-slate-600">
                              {testStat?.attemptsCount}{" "}
                              {testStat?.attemptsCount === 1 ? "att" : "atts"}
                            </span>
                          </div>

                          {/* Reveal overlay on hover or focus-within */}
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2 z-10">
                            <Link
                              href={`/dashboard/pyqs/analysis/${testStat?.bestAttempt?.id || ""}`}
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
