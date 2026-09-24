"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Play,
  FileCheck2,
  CheckCircle2,
  TrendingUp,
  Target,
  BookOpen,
  GraduationCap,
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
  Medal,
} from "lucide-react";
import TrophyCabinet from "@/components/dashboard/TrophyCabinet";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { TopicMastery, TimeSinkAlertData, SubjectCalibrationData } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { normalizeSubject } from "@/lib/analytics";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";

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
  const { t } = useTranslation();
  const router = useRouter();
  const isClient = useIsClient();
  const storeUser = useTestStore((state) => state.user);
  const clientAnalytics = useTestStore((state) => state.analytics);
  const testAttempts = useTestStore((state) => state.testAttempts);

  const [calibrationCategoryFilter, setCalibrationCategoryFilter] = useState<"all" | "in_progress" | "unlocked">("all");

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

  const isServerUser = initialData.user && initialData.user.id !== "guest";

  // Robust attempted count: Never drop questions solved on client or server
  const clientQuestionsAttempted =
    isClient && clientAnalytics ? (clientAnalytics.totalQuestionsAttempted || 0) : 0;
  const storeAttemptsSum =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0)
      : 0;
  const activeClientAttempted = Math.max(clientQuestionsAttempted, storeAttemptsSum);

  const serverAttempted = initialData?.kpi?.totalAttempted || 0;
  const totalAttempted = Math.max(serverAttempted, activeClientAttempted);

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

  const completedTestsCount =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.length
      : totalAttempted > 0
      ? Math.ceil(totalAttempted / 50)
      : 0;

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

  const xpPoints = isServerUser
    ? initialData.user.xp
    : isClient && storeUser.xpPoints !== undefined
    ? storeUser.xpPoints
    : initialData.user.xp;

  const targetCollege = isServerUser
    ? initialData.user.targetCollege
    : isClient && storeUser.targetCollege
    ? storeUser.targetCollege
    : initialData.user.targetCollege;

  const targetCourse = isServerUser
    ? initialData.user.targetCourse
    : isClient && storeUser.targetCourse
    ? storeUser.targetCourse
    : initialData.user.targetCourse;

  const targetStream = isServerUser
    ? initialData.user.targetStream
    : isClient && storeUser.preferredStream
    ? storeUser.preferredStream
    : initialData.user.targetStream;

  // Stream Domain Subjects (calibrated automatically from stream)
  const candidateSubjects = getSubjectsForStream(targetStream);

  // Candidate Subject Calibrations (strictly only candidate's selected subjects)
  const candidateSubjectCalibrations: SubjectCalibrationData[] = candidateSubjects.map((subName) => {
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

  // Calculate dynamic XP level
  const getLevelInfo = (xp: number) => {
    if (xp >= 3500) return { title: "Level 5 - All-India Ranker", levelNum: 5, progress: 100 };
    if (xp >= 2000) return { title: "Level 4 - Scholar", levelNum: 4, progress: Math.round(((xp - 2000) / 1500) * 100) };
    if (xp >= 1000) return { title: "Level 3 - Competitor", levelNum: 3, progress: Math.round(((xp - 1000) / 1000) * 100) };
    if (xp >= 500) return { title: "Level 2 - Apprentice", levelNum: 2, progress: Math.round(((xp - 500) / 500) * 100) };
    return { title: "Level 1 - Aspirant", levelNum: 1, progress: Math.round((xp / 500) * 100) };
  };

  const levelInfo = getLevelInfo(xpPoints);

  return (
    <div className="space-y-6">
      {/* 1. MINIMAL CRISP HEADER BAR */}
      <div className="bg-white rounded-xl border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
              {t("welcomeBack", "Welcome back,")} {fullName}
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_0px_#000]">
              {targetStream}
            </span>
          </div>
          <p className="text-xs text-black/70 font-semibold flex items-center gap-1.5 truncate">
            <GraduationCap className="w-3.5 h-3.5 text-[#FF5C5C] shrink-0" />
            <span className="truncate">Targeting: <strong>{targetCollege}</strong> ({targetCourse})</span>
          </p>
        </div>

        {/* Primary Action Button */}
        <Link
          href="/dashboard/mocks"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{t("practiceNow", "Start Full CBT Mock")}</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Dynamic Cold-Start Qualification Progress Meter */}
      {!isAiMentorUnlocked ? (
        <div className="p-4 rounded-xl border-2 border-black bg-[#FFFBEB] shadow-[3px_3px_0px_0px_#000] space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-black text-white shrink-0 shadow-[1px_1px_0px_0px_#000]">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-black flex items-center gap-2">
                  <span>Unlocking AI Mentor: {totalAttempted}/150 questions attempted</span>
                  <span className="px-2 py-0.2 rounded bg-amber-200 border border-black text-[9px] font-black uppercase">
                    Calibration Gate
                  </span>
                </p>
                <p className="text-[11px] text-black/70 font-medium mt-0.5">
                  Complete {attemptsToUnlock} more question{attemptsToUnlock === 1 ? "" : "s"} across CBT mocks to calibrate your baseline and unlock Adaptive Drills &amp; Deep Mistake Diagnostics.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-black text-white text-xs font-mono font-black shrink-0 self-start sm:self-auto shadow-[1px_1px_0px_0px_#000]">
              {unlockProgress}% Calibrated
            </span>
          </div>
          <div className="w-full h-2.5 bg-white border-2 border-black rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F59E0B] to-[#10B981] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(3, unlockProgress)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl border-2 border-black bg-[#ECFDF5] shadow-[3px_3px_0px_0px_#000] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-md bg-[#10B981] border border-black text-white shadow-[1px_1px_0px_0px_#000]">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-black">
                AI Diagnostic Matrix &amp; Adaptive Drills Unlocked
              </p>
              <p className="text-[10px] text-black/70 font-semibold">
                Sufficient calibration data ({totalAttempted} Qs evaluated). Active deep intelligence &amp; precision remediation.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#10B981] text-black text-[10px] font-black uppercase border border-black shadow-[1px_1px_0px_0px_#000] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-black fill-black" />
            AI Mentor Active
          </span>
        </div>
      )}

      {/* 2. MINIMAL 3-CARD VITAL METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Total Attempted */}
        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-black/60">
              {t("totalSolved", "Questions Solved")}
            </span>
            <FileCheck2 className="w-4 h-4 text-black/50" />
          </div>
          <p className="text-2xl font-black font-mono text-black">
            {totalAttempted}{" "}
            <span className="text-xs font-bold text-black/50 font-sans">Qs</span>
          </p>
          <p className="text-[10px] text-black/60 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            <span>
              {totalAttempted > 0
                ? `${completedTestsCount} ${
                    completedTestsCount === 1 ? "Test Attempted" : "Tests Attempted"
                  } • Calibrated`
                : "Zero mocks submitted yet"}
            </span>
          </p>
        </div>

        {/* Metric 2: Diagnostic Accuracy */}
        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-black/60">
              {t("overallAccuracy", "Diagnostic Accuracy")}
            </span>
            <Target className="w-4 h-4 text-[#059669]" />
          </div>
          <p className="text-2xl font-black font-mono text-black">
            {totalAttempted > 0 ? `${accuracyPercentage}%` : "--"}
          </p>
          <p className="text-[10px] text-black/60 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#059669]" />
            <span>
              {totalAttempted > 0
                ? `Calibrated across ${totalAttempted} answered Qs`
                : "Solve 1 mock to calibrate"}
            </span>
          </p>
        </div>

        {/* Metric 3: Rank & XP Progress */}
        <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-black/60">
              {levelInfo.title}
            </span>
            <span className="text-xs font-mono font-black text-[#D97706]">
              {xpPoints.toLocaleString()} XP
            </span>
          </div>
          <div className="w-full h-2 bg-[#FAF7EE] border border-black rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#FF5C5C] rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(8, levelInfo.progress))}%` }}
            />
          </div>
          <p className="text-[10px] text-black/60 font-bold font-mono text-right pt-0.5">
            {levelInfo.progress}% to next tier
          </p>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2.5 SUBJECT-WISE AI CALIBRATION MATRIX (150 Qs Goal Per Subject)   */}
      {/* =================================================================== */}
      <section className="bg-white rounded-xl border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] space-y-5 w-full max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b-2 border-black">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#000]">
                <BrainCircuit className="w-4 h-4 text-[#10B981]" />
              </div>
              <h2 className="text-base sm:text-lg font-black text-black tracking-tight">
                Subject-Wise AI Calibration Matrix
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] border border-black text-[10px] font-black text-black">
                {candidateSubjectCalibrations.length} Selected Domain Subjects
              </span>
            </div>
            <p className="text-xs text-black/70 font-medium max-w-2xl">
              Each of your chosen CUET domain subjects requires <strong>150 questions</strong> for the AI Performance Intelligence Engine to eliminate statistical noise, calibrate accuracy, and unlock personalized weakness remediation.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start md:self-auto overflow-x-auto max-w-full pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setCalibrationCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-lg border-2 border-black text-xs font-black transition-all ${
                calibrationCategoryFilter === "all"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FAF7EE]"
              }`}
            >
              All Selected ({candidateSubjectCalibrations.length})
            </button>
            <button
              type="button"
              onClick={() => setCalibrationCategoryFilter("in_progress")}
              className={`px-3 py-1.5 rounded-lg border-2 border-black text-xs font-black transition-all flex items-center gap-1.5 ${
                calibrationCategoryFilter === "in_progress"
                  ? "bg-[#FEF3C7] text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FAF7EE]"
              }`}
            >
              <span>Calibrating</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black text-white">
                {candidateSubjectCalibrations.filter((s) => s.totalAttempted > 0 && !s.isUnlocked).length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCalibrationCategoryFilter("unlocked")}
              className={`px-3 py-1.5 rounded-lg border-2 border-black text-xs font-black transition-all flex items-center gap-1.5 ${
                calibrationCategoryFilter === "unlocked"
                  ? "bg-[#10B981] text-black shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white text-black hover:bg-[#FAF7EE]"
              }`}
            >
              <span>Unlocked</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black text-white">
                {candidateSubjectCalibrations.filter((s) => s.isUnlocked).length}
              </span>
            </button>
          </div>
        </div>

        {/* Subject Cards Grid - Strictly for Candidate Selected Subjects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {candidateSubjectCalibrations
            .filter((sub) => {
              if (calibrationCategoryFilter === "in_progress") {
                return sub.totalAttempted > 0 && !sub.isUnlocked;
              }
              if (calibrationCategoryFilter === "unlocked") {
                return sub.isUnlocked;
              }
              return true;
            })
            .map((sub) => {
              return (
                <div
                  key={sub.subjectKey}
                  className={`rounded-xl border-2 border-black p-4 flex flex-col justify-between transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                    sub.isUnlocked
                      ? "bg-[#F0FDF4]"
                      : sub.totalAttempted > 0
                      ? "bg-[#FFFBEB]"
                      : "bg-[#FAF7EE]"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Icon, Title, Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-9 h-9 rounded-lg bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#000]">
                          <SubjectIcon name={sub.icon} className="w-5 h-5 text-black" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-black text-xs sm:text-sm text-black truncate">
                            {sub.subject}
                          </h3>
                          <span className="text-[10px] font-bold text-black/60 block">
                            {sub.category}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full border border-black text-[9px] font-black uppercase tracking-wider shrink-0 shadow-[1px_1px_0px_0px_#000] ${
                          sub.isUnlocked
                            ? "bg-[#10B981] text-black"
                            : sub.totalAttempted > 0
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : "bg-[#F3F4F6] text-black/60"
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
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="font-mono text-black">
                          {sub.totalAttempted} / 150 <span className="text-[10px] font-normal text-black/60">Qs</span>
                        </span>
                        <span className="text-[10px] font-bold text-black/70">
                          {sub.isUnlocked
                            ? "Calibrated"
                            : `${sub.attemptsToUnlock} Qs left to unlock`}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-white border-2 border-black rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F59E0B] to-[#10B981] rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.max(sub.totalAttempted > 0 ? 5 : 0, sub.unlockProgress)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Micro Metrics: Accuracy & Tests */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/10 text-center">
                      <div className="p-1.5 rounded-md bg-white border border-black/20">
                        <p className="text-[9px] uppercase tracking-wider font-bold text-black/60">
                          Accuracy
                        </p>
                        <p className="font-mono font-black text-xs text-black">
                          {sub.totalAttempted > 0 ? `${sub.accuracyPercentage}%` : "--"}
                        </p>
                      </div>
                      <div className="p-1.5 rounded-md bg-white border border-black/20">
                        <p className="text-[9px] uppercase tracking-wider font-bold text-black/60">
                          Mocks Given
                        </p>
                        <p className="font-mono font-black text-xs text-black">
                          {sub.testsCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions: View AI Radar & Launch Mock */}
                  <div className="pt-3 mt-3 border-t-2 border-black flex items-center gap-2">
                    <Link
                      href={`/dashboard/radar?subject=${sub.subjectKey}`}
                      className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-black border border-black bg-white text-black hover:bg-[#FAF7EE] shadow-[1px_1px_0px_0px_#000] transition-all flex items-center justify-center gap-1"
                    >
                      <span>AI Radar</span>
                      <Target className="w-3 h-3 text-[#FF5C5C]" />
                    </Link>

                    <Link
                      href={sub.mockUrl}
                      className="py-1.5 px-3 rounded-lg text-[11px] font-black bg-[#FF5C5C] hover:bg-[#FF4545] text-white border border-black shadow-[1px_1px_0px_0px_#000] flex items-center justify-center gap-1 shrink-0 transition-all"
                    >
                      <span>Practice Mock</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* 3. DEDICATED WEAKNESS RADAR & DIAGNOSTICS GATEWAY */}
      <div className="bg-[#FAF7EE] border-2 border-black rounded-xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center border-2 border-black shrink-0 shadow-[2px_2px_0px_0px_#000]">
            <Target className="w-6 h-6 text-[#FF5C5C]" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-black">
                Subject Weakness Radar &amp; Time-Sink Diagnostics
              </h3>
              <span className="px-2 py-0.2 rounded bg-[#FEF3C7] border border-black text-[9px] font-black uppercase">
                Dedicated Page
              </span>
            </div>
            <p className="text-xs text-black/70 font-medium">
              Analyze chapter-level accuracy, lethal &gt;72s clock drains, distractor trap exposure, and launch 5-question targeted AI repair drills.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Link
            href="/dashboard/radar"
            className="px-5 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
          >
            <span>Launch Weakness Radar</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* 4. COMPACT TROPHY CABINET ACCORDION */}
      <TrophyCabinet />
    </div>
  );
}
