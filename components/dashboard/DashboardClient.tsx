"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Play,
  Target,
  Sparkles,
  BrainCircuit,
  Calculator,
  FlaskConical,
  Zap,
  Dna,
  BarChart3,
  Briefcase,
  Scale,
  Landmark,
  Globe,
  Brain,
  Users,
  Laptop,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Medal,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { TopicMastery, TimeSinkAlertData, SubjectCalibrationData } from "@/types";
import { normalizeSubject } from "@/lib/analytics";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { WelcomeBanner } from "@/components/dashboard/prep-pulse/WelcomeBanner";
import { TopMetricsRow } from "@/components/dashboard/prep-pulse/TopMetricsRow";
import { ScoreImprovementTrend } from "@/components/dashboard/prep-pulse/ScoreImprovementTrend";
import { SubjectWisePerformance } from "@/components/dashboard/prep-pulse/SubjectWisePerformance";
import { DetailedPerformanceAnalysis } from "@/components/dashboard/prep-pulse/DetailedPerformanceAnalysis";
import { StrengthsWeaknesses } from "@/components/dashboard/prep-pulse/StrengthsWeaknesses";
import { ScheduleMockTest } from "@/components/dashboard/prep-pulse/ScheduleMockTest";
import { DailyPracticeCalendar } from "@/components/dashboard/prep-pulse/DailyPracticeCalendar";

const SUBJECT_ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  FlaskConical,
  Zap,
  Dna,
  BarChart3,
  TrendingUp,
  Briefcase,
  Scale,
  Landmark,
  Globe,
  Brain,
  Users,
  BookOpen,
  Target,
  Laptop,
  Medal,
  GraduationCap,
};

function SubjectIcon({
  name,
  className = "w-5 h-5 text-black",
}: {
  name: string;
  className?: string;
}) {
  const IconComponent = SUBJECT_ICON_MAP[name] || GraduationCap;
  return <IconComponent className={className} />;
}

export interface DashboardInitialData {
  user: {
    id: string;
    fullName: string;
    targetStream: string;
    targetUniversity: string;
    targetCollege: string;
    targetCourse: string;
    selectedSubjects?: string[];
    xp: number;
    campusCoins: number;
    currentStreak: number;
  };
  kpi: {
    totalAttempted: number;
    accuracyPercentage: number;
    dailyStreak: number;
    xpLevel: string;
    xpLevelNumber: number;
    xpProgressInLevel: number;
    xpForNextLevel: number;
  };
  recommendedPractice: {
    topic: string;
    chapter: string;
    subject: string;
    durationMinutes: number;
    questionCount: number;
    reason: string;
  };
  weaknessRadar: TopicMastery[];
  timeSinkAlerts: TimeSinkAlertData[];
  subjectCalibration?: Record<string, SubjectCalibrationData>;
}

export default function DashboardClient({
  initialData,
}: {
  initialData: DashboardInitialData;
}) {
  const router = useRouter();
  const isClient = useIsClient();
  const storeUser = useTestStore((state) => state.user);
  const clientAnalytics = useTestStore((state) => state.analytics);
  const testAttempts = useTestStore((state) => state.testAttempts);
  const currentCycleNumber = useTestStore((state) => state.currentCycleNumber || 1);
  const currentCycleQuestionCount = useTestStore((state) => state.currentCycleQuestionCount || 0);

  const subjectScrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = React.useCallback(() => {
    const el = subjectScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const el = subjectScrollRef.current;
    if (!el) return;
    const scrollAmount = 340;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Attempt recovery on mount: ingests any completed CBT session from localStorage that was missed
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const { recoverUnrecordedCBTSessions } = useTestStore.getState();
        if (typeof recoverUnrecordedCBTSessions === "function") {
          recoverUnrecordedCBTSessions();
        }
      } catch (err) {
        console.warn("Session recovery notice:", err);
      }
    }
  }, []);

  // Client-side authentication guard: redirect to /signup if unauthenticated
  useEffect(() => {
    if (isClient) {
      const isAuth = Boolean(
        (storeUser?.isLoggedIn && storeUser?.name && storeUser?.id !== "guest") ||
        (initialData?.user && initialData.user.id !== "guest")
      );
      if (!isAuth) {
        router.replace("/signup?redirect=/dashboard");
      }
    }
  }, [isClient, storeUser, initialData, router]);

  useEffect(() => {
    checkScroll();
    const el = subjectScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [checkScroll]);

  const isServerUser = initialData.user && initialData.user.id !== "guest";

  // Authoritative completed attempt counting:
  // If client has test attempts, compute questions attempted strictly from test attempts
  const clientQuestionsAttempted =
    isClient && clientAnalytics ? (clientAnalytics.totalQuestionsAttempted || 0) : 0;
  const storeAttemptsSum =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0)
      : 0;
  const activeClientAttempted = Math.max(clientQuestionsAttempted, storeAttemptsSum);

  const serverAttempted = initialData?.kpi?.totalAttempted || 0;
  // If active client attempts exist and match/exceed server, client store is latest
  const totalAttempted =
    activeClientAttempted > 0 && serverAttempted > 0
      ? activeClientAttempted >= serverAttempted
        ? activeClientAttempted
        : serverAttempted
      : Math.max(serverAttempted, activeClientAttempted);

  // Compute robust client accuracy from testAttempts directly if clientAnalytics is stale
  const clientCorrectCount =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.correctCount || 0), 0)
      : clientAnalytics?.totalCorrectAnswers || 0;

  const directClientAccuracy =
    activeClientAttempted > 0
      ? Math.round((clientCorrectCount / activeClientAttempted) * 100)
      : clientAnalytics?.overallAccuracyPercentage || 0;

  const serverAccuracy = initialData?.kpi?.accuracyPercentage || 0;

  const accuracyPercentage =
    directClientAccuracy > 0 && serverAccuracy > 0
      ? activeClientAttempted >= serverAttempted
        ? directClientAccuracy
        : serverAccuracy
      : directClientAccuracy > 0
      ? directClientAccuracy
      : serverAccuracy;

  // Active Subject Calibration Map
  const subjectCalibrationMap =
    isClient && clientAnalytics?.subjectCalibration && Object.keys(clientAnalytics.subjectCalibration).length > 0
      ? clientAnalytics.subjectCalibration
      : initialData?.subjectCalibration || {};

  const isAiMentorUnlocked = totalAttempted >= 150;
  const attemptsToUnlock = Math.max(0, 150 - totalAttempted);
  const unlockProgress = Math.min(100, Math.round((totalAttempted / 150) * 100));

  // Authentic user display: Server profile is the primary source of truth
  const fullName = isServerUser
    ? initialData.user.fullName
    : isClient && storeUser.name
    ? storeUser.name
    : initialData.user.fullName;

  const targetCollege = isServerUser
    ? initialData.user.targetCollege
    : isClient && storeUser.targetCollege
    ? storeUser.targetCollege
    : initialData.user.targetCollege;

  const targetStream = isServerUser
    ? initialData.user.targetStream
    : isClient && storeUser.preferredStream
    ? storeUser.preferredStream
    : initialData.user.targetStream;

  // Stream Domain Subjects & User Selected Subjects
  const userChosenSubjects = isServerUser
    ? initialData.user.selectedSubjects
    : isClient && storeUser.selectedSubjects && storeUser.selectedSubjects.length > 0
    ? storeUser.selectedSubjects
    : initialData.user.selectedSubjects;

  const baseSubjects =
    userChosenSubjects && userChosenSubjects.length > 0
      ? userChosenSubjects
      : getSubjectsForStream(targetStream);

  const seenSubjectKeys = new Set<string>();
  const candidateSubjectsList: string[] = [];

  baseSubjects.forEach((subName) => {
    const key = normalizeSubject(subName).key;
    if (!seenSubjectKeys.has(key)) {
      seenSubjectKeys.add(key);
      candidateSubjectsList.push(subName);
    }
  });

  Object.values(subjectCalibrationMap).forEach((cal) => {
    if (cal.totalAttempted > 0 && !seenSubjectKeys.has(cal.subjectKey)) {
      seenSubjectKeys.add(cal.subjectKey);
      candidateSubjectsList.push(cal.subject);
    }
  });

  // Candidate Subject Calibrations
  const candidateSubjectCalibrations: SubjectCalibrationData[] = candidateSubjectsList.map((subName) => {
    const info = normalizeSubject(subName);
    const existing = subjectCalibrationMap[info.key];
    if (existing) {
      return existing;
    }
    return {
      subject: info.name,
      subjectKey: info.key,
      icon: info.icon,
      category: info.category,
      totalAttempted: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      accuracyPercentage: 0,
      testsCount: 0,
      isUnlocked: false,
      attemptsToUnlock: 150,
      unlockProgress: 0,
      mockUrl: info.mockUrl,
    };
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Welcome & Motivation Banner */}
      <section aria-label="Welcome and Motivation">
        <WelcomeBanner
          userName={fullName}
          targetStream={targetStream}
          targetCollege={targetCollege}
          streak={isClient && storeUser?.dailyStreak ? storeUser.dailyStreak : (initialData?.user?.currentStreak || 1)}
        />
      </section>

      {/* 2. Top Metrics Row */}
      <section aria-label="Top Metrics">
        <TopMetricsRow
          totalAttempted={totalAttempted}
          averageScore={accuracyPercentage > 0 ? Math.round(accuracyPercentage * 20) : 1550}
          percentile={accuracyPercentage > 0 ? Math.min(99.9, Math.max(50, accuracyPercentage * 1.15)) : 88.5}
        />
      </section>

      {/* 3. Main Performance Charts (2 Columns: ~65% / 35%) */}
      <section aria-label="Performance Charts" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <ScoreImprovementTrend />
        </div>
        <div className="lg:col-span-4">
          <SubjectWisePerformance />
        </div>
      </section>

      {/* 4. Detailed Analytics & AI Diagnostic Suggestions (2 Columns: 8 cols / 4 cols) */}
      <section aria-label="Detailed Analytics" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <DetailedPerformanceAnalysis />
        </div>
        <div className="lg:col-span-4">
          <StrengthsWeaknesses />
        </div>
      </section>

      {/* 5. Dynamic Cold-Start Qualification Progress Meter & Active Cycle Window */}
      {!isAiMentorUnlocked ? (
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>
                    Cycle {currentCycleNumber}: {currentCycleQuestionCount || totalAttempted}/150 questions attempted
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                    Calibration Gate
                  </span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete {attemptsToUnlock} more question{attemptsToUnlock === 1 ? "" : "s"} across CBT mocks to calibrate your baseline and unlock Adaptive Drills &amp; Deep Mistake Diagnostics.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold shrink-0 self-start sm:self-auto shadow-2xs">
              {unlockProgress}% Calibrated
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(3, unlockProgress)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ml-1" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>ACTIVE DIAGNOSTIC CYCLE {currentCycleNumber}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                  {currentCycleQuestionCount} / 150 QUESTIONS
                </span>
              </p>
              <p className="text-xs text-slate-500">
                {150 - currentCycleQuestionCount} more questions until Cycle {currentCycleNumber} completes and comparison analysis runs.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/radar"
            className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all text-center self-start sm:self-auto shrink-0"
          >
            View Weakness Radar &rarr;
          </Link>
        </div>
      )}

      {/* 6. PROMINENT "YOUR NEXT BEST ACTION" HERO CARD */}
      {(() => {
        const candidateWeaknesses =
          isClient && clientAnalytics && clientAnalytics.weaknessRadar.length > 0
            ? clientAnalytics.weaknessRadar
            : initialData.weaknessRadar || [];

        const prioritizedCandidate = [...candidateWeaknesses]
          .filter((t) => !t.isRecovered)
          .sort((a, b) => {
            const aHasData = (a.attemptsCount || 0) >= 5 ? 1 : 0;
            const bHasData = (b.attemptsCount || 0) >= 5 ? 1 : 0;
            if (aHasData !== bHasData) return bHasData - aHasData;
            if (a.accuracyPercentage !== b.accuracyPercentage) {
              return a.accuracyPercentage - b.accuracyPercentage;
            }
            return (b.incorrectCount || 0) - (a.incorrectCount || 0);
          })[0] || candidateWeaknesses[0];

        if (!prioritizedCandidate) return null;

        const isLimited = (prioritizedCandidate.attemptsCount || 0) < 5;

        return (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 text-blue-600 fill-blue-600" />
                    <span>YOUR NEXT BEST ACTION</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold uppercase">
                    {prioritizedCandidate.subject}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      isLimited
                        ? "bg-slate-100 text-slate-600"
                        : prioritizedCandidate.accuracyPercentage < 50
                        ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                        : "bg-amber-50 text-amber-700 border border-amber-200/60"
                    }`}
                  >
                    {isLimited
                      ? "LIMITED DATA"
                      : prioritizedCandidate.attemptsCount >= 20
                      ? "ESTABLISHED WEAKNESS"
                      : prioritizedCandidate.attemptsCount >= 10
                      ? "EMERGING PATTERN"
                      : "EARLY SIGNAL"}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {prioritizedCandidate.chapter}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 font-mono mt-0.5">
                    {prioritizedCandidate.accuracyPercentage}% Accuracy · {prioritizedCandidate.attemptsCount} Attempts
                    {prioritizedCandidate.avgTimeSeconds ? ` · Avg Response: ${prioritizedCandidate.avgTimeSeconds}s` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <div className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200/60 font-semibold text-rose-800 text-[11px] flex items-center gap-1.5">
                    <span className="text-[10px] text-rose-600 uppercase font-bold">PRIMARY PATTERN:</span>
                    <span>{prioritizedCandidate.fullDiagnosis?.primaryDiagnosis || (prioritizedCandidate.accuracyPercentage < 50 ? "Conceptual Gap" : "Precision Slip")}</span>
                  </div>
                  {prioritizedCandidate.fullDiagnosis?.contributingFactor && (
                    <div className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-medium text-slate-600 text-[11px] flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">CONTRIBUTING PATTERN:</span>
                      <span>{prioritizedCandidate.fullDiagnosis.contributingFactor}</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                    Evidence Behind Priority:
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {isLimited
                      ? `Insufficient data (${prioritizedCandidate.attemptsCount}/5 attempts). Practice 5 questions to calibrate baseline and detect genuine misconceptions.`
                      : `Prioritized because this topic currently has ${prioritizedCandidate.accuracyPercentage}% accuracy across ${prioritizedCandidate.attemptsCount} attempts.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end justify-center gap-3 shrink-0">
                <Link
                  href={`/dashboard/radar?subject=${normalizeSubject(prioritizedCandidate.subject).key}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white shrink-0" />
                  <span>START 6-MIN REPAIR</span>
                </Link>

                <Link
                  href="/dashboard/radar"
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open Weakness Radar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 7. SUBJECT-WISE AI CALIBRATION MATRIX */}
      <section className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm space-y-5 w-full max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex-[1_1_320px] min-w-0 space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Subject-Wise AI Calibration Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl">
              Each domain subject requires <strong>150 questions</strong> for the AI Performance Intelligence Engine to eliminate statistical noise, calibrate accuracy, and unlock personalized weakness remediation.
            </p>
          </div>

          {/* Scroll Navigation Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition-all"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Subject Cards Horizontal Scrollable List */}
        <div className="relative group">
          <div
            ref={subjectScrollRef}
            className="flex items-stretch gap-4 overflow-x-auto scroll-smooth pb-3 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {candidateSubjectCalibrations.map((sub) => {
              return (
                <div
                  key={sub.subjectKey}
                  className={`w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl border p-5 flex flex-col justify-between transition-all shadow-sm hover:shadow-md ${
                    sub.isUnlocked
                      ? "bg-emerald-50/40 border-emerald-200/70"
                      : sub.totalAttempted > 0
                      ? "bg-amber-50/40 border-amber-200/70"
                      : "bg-slate-50/60 border-slate-200/70"
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Icon, Title, Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                          <SubjectIcon name={sub.icon} className="w-4 h-4 text-slate-700" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {sub.subject}
                          </h3>
                          <span className="text-[10px] font-medium text-slate-500 block">
                            {sub.category}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                          sub.isUnlocked
                            ? "bg-emerald-100 text-emerald-800"
                            : sub.totalAttempted > 0
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-200/70 text-slate-600"
                        }`}
                      >
                        {sub.isUnlocked
                          ? "AI Unlocked"
                          : sub.totalAttempted > 0
                          ? `${sub.unlockProgress}% Calibrated`
                          : "Not Started"}
                      </span>
                    </div>

                    {/* Progress Bar & Questions Count */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="font-mono text-slate-800">
                          {sub.totalAttempted} / 150 <span className="text-[10px] font-normal text-slate-500">Qs</span>
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {sub.isUnlocked
                            ? "Calibrated"
                            : `${sub.attemptsToUnlock} Qs left to unlock`}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/80 rounded-full overflow-hidden border border-slate-200/50">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.max(sub.totalAttempted > 0 ? 5 : 0, sub.unlockProgress)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Micro Metrics: Accuracy & Tests */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50 text-center">
                      <div className="p-2 rounded-xl bg-white/80 border border-slate-200/50">
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                          Accuracy
                        </p>
                        <p className="font-mono font-bold text-xs text-slate-800">
                          {sub.totalAttempted > 0 ? `${sub.accuracyPercentage}%` : "--"}
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-white/80 border border-slate-200/50">
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                          Mocks Given
                        </p>
                        <p className="font-mono font-bold text-xs text-slate-800">
                          {sub.testsCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions: View AI Radar & Launch Mock */}
                  <div className="pt-3 mt-3 border-t border-slate-200/50 flex items-center gap-2">
                    <Link
                      href={`/dashboard/radar?subject=${sub.subjectKey}`}
                      className="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <span>AI Radar</span>
                      <Target className="w-3 h-3 text-blue-600" />
                    </Link>

                    <Link
                      href={sub.mockUrl}
                      className="py-1.5 px-3 rounded-xl text-[11px] font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-1 shrink-0 shadow-2xs transition-all"
                    >
                      <span>Practice Mock</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Bottom Row: Schedule Mock Test (50%) & Daily Practice Heatmap (50%) */}
      <section aria-label="Schedule Test and Activity Heatmap" className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div>
          <ScheduleMockTest />
        </div>
        <div>
          <DailyPracticeCalendar />
        </div>
      </section>
    </div>
  );
}
