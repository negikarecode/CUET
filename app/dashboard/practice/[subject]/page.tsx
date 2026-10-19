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

export default function SubjectPracticeDetailPage({ params }: PageProps) {
  const decodedSubject = decodeURIComponent(params.subject).toLowerCase();
  const storeUser = useTestStore((s) => s.user);
  const testAttempts = useTestStore((s) => s.testAttempts);
  const [isPremium, setIsPremium] = useState<boolean>(Boolean(storeUser?.isPremium));

  React.useEffect(() => {
    let isMounted = true;
    async function checkEntitlement() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) {
          const res = await fetch(`/api/auth/profile?id=${user.id}`);
          if (res.ok) {
            const json = await res.json();
            if (isMounted && json?.profile) {
              setIsPremium(Boolean(json.profile.is_premium));
            }
          }
        }
      } catch {}
    }
    checkEntitlement();
    return () => { isMounted = false; };
  }, []);

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

      {/* Free Plan Status & Limit Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-amber-50 via-white to-blue-50 rounded-2xl border border-amber-200/90 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                FREE PLAN STATUS
              </span>
              <span className="text-xs font-bold text-slate-700">
                {Math.min(3, totalCompletedPracticeSessions)} of 3 Free Practice Sessions Completed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Free plan includes Unit 1 practice tests 1–3 (up to 3 completed sessions). Additional units and unlimited practice tests require CUETMate Premium.
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
            {!isPremium && totalCompletedPracticeSessions >= 3 ? (
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
                  {subjectStats.hasAttempts ? "Continue Practice" : "Start First Test"}
                </span>
              </Link>
            )}

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

      {/* 3. Accordion Controls Bar */}
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

      {/* 4. Units Accordion List */}
      <div className="space-y-4">
        {units.map((unit: any) => {
          const isExpanded = !!expandedUnits[unit.unitNumber];
          const unitStat = unitStatsMap.get(unit.unitNumber);
          const attemptedInUnit = unitStat ? unitStat.attemptedCount : 0;
          const unitAccuracy = unitStat?.accuracy;
          const unitPct = Math.min(100, Math.round((attemptedInUnit / 20) * 100));

          return (
            <div
              key={unit.unitNumber}
              id={`unit-card-${unit.unitNumber}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
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
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 font-sans">
                        Unit {unit.unitNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {attemptedInUnit} / 20 completed
                        {unitAccuracy !== null && unitAccuracy !== undefined && (
                          <span className="ml-1 text-blue-600">· {unitAccuracy}% accuracy</span>
                        )}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {unit.unitTitle}
                    </h3>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 sm:w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          unitPct >= 100
                            ? "bg-emerald-600"
                            : unitPct > 0
                            ? "bg-blue-600"
                            : "bg-transparent"
                        }`}
                        style={{ width: `${unitPct}%` }}
                      />
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href={`/dashboard/notes/${folder}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read notes</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleUnit(unit.unitNumber)}
                    aria-label={isExpanded ? "Collapse unit" : "Expand unit"}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sub-topics chips row */}
              {unit.topics && unit.topics.length > 0 && (
                <div className="px-4 sm:px-5 pb-3.5 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">Topics:</span>
                  {unit.topics.map((topic: string, tIdx: number) => {
                    const acc = getTopicMetrics(topic);

                    if (acc === null) {
                      return (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/70"
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
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{topic}</span>
                        <span className="text-[10px]">({acc}%)</span>
                      </span>
                    );
                  })}
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

                      const isLocked = !isPremium && (unit.unitNumber > 1 || testNum > 3 || totalCompletedPracticeSessions >= 3);

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
                                : "1 attempt"}
                            </span>
                          </div>

                          {/* Reveal overlay on hover or focus-within */}
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2 z-10">
                            <Link
                              href={`/dashboard/pyqs/analysis/${testStat.bestAttempt?.id || ""}`}
                              className="flex-1 text-center py-1.5 px-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold transition-colors shadow-2xs"
                            >
                              Analysis
                            </Link>
                            {!isPremium && totalCompletedPracticeSessions >= 3 ? (
                              <Link
                                href="/pricing"
                                className="flex-1 text-center py-1.5 px-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[11px] font-semibold transition-colors inline-flex items-center justify-center gap-1"
                              >
                                <Lock className="w-3 h-3 text-amber-700" />
                                <span>Upgrade</span>
                              </Link>
                            ) : (
                              <Link
                                href={`/test/${testId}?reattempt=true`}
                                className="flex-1 text-center py-1.5 px-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors"
                              >
                                Re-attempt
                              </Link>
                            )}
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
