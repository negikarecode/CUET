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
  Clock,
  BookOpen,
  GraduationCap,
  Award,
  Lock,
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
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { RepairQuizResponse } from "@/app/api/ai/repair-quiz/route";
import { TopicMastery, TimeSinkAlertData, SubjectCalibrationData } from "@/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { normalizeSubject } from "@/lib/analytics";

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
  const initTest = useCBTStore((state) => state.initTest);
  const clientAnalytics = useTestStore((state) => state.analytics);
  const testAttempts = useTestStore((state) => state.testAttempts);

  const [activeRepairTopic, setActiveRepairTopic] = useState<string | null>(null);
  const [radarTab, setRadarTab] = useState<"weaknesses" | "strengths" | "all">("weaknesses");
  const [selectedRadarSubject, setSelectedRadarSubject] = useState<string>("all");
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

  const accuracyPercentage =
    activeClientAttempted > 0 && clientAnalytics?.overallAccuracyPercentage !== undefined
      ? clientAnalytics.overallAccuracyPercentage
      : initialData?.kpi?.accuracyPercentage || 0;

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

  const allSubjectCalibrations: SubjectCalibrationData[] = Object.values(subjectCalibrationMap);

  // Determine current active subject for AI Weakness Radar
  const activeSubjectCal =
    selectedRadarSubject !== "all" ? subjectCalibrationMap[selectedRadarSubject] : null;

  // Subject-specific unlock metrics for active radar subject
  const isAiMentorUnlocked = activeSubjectCal
    ? activeSubjectCal.isUnlocked
    : totalAttempted >= 150;
  const attemptsToUnlock = activeSubjectCal
    ? activeSubjectCal.attemptsToUnlock
    : Math.max(0, 150 - totalAttempted);
  const unlockProgress = activeSubjectCal
    ? activeSubjectCal.unlockProgress
    : Math.min(100, Math.round((totalAttempted / 150) * 100));

  // Base raw analytics from client or server
  const rawWeaknessRadar =
    isClient && clientAnalytics && clientAnalytics.weaknessRadar.length > 0
      ? clientAnalytics.weaknessRadar
      : initialData.weaknessRadar;

  const rawStrengthList =
    isClient && clientAnalytics && clientAnalytics.strengthList.length > 0
      ? clientAnalytics.strengthList
      : initialData.weaknessRadar.filter(
          (t) => t.status === "mastered" || t.accuracyPercentage >= 75
        );

  const rawTimeSinkAlerts =
    isClient && clientAnalytics && clientAnalytics.timeSinkAlerts.length > 0
      ? clientAnalytics.timeSinkAlerts
      : initialData.timeSinkAlerts;

  const rawRecommendedPractice =
    isClient && clientAnalytics && clientAnalytics.recommendedPractice
      ? clientAnalytics.recommendedPractice
      : initialData.recommendedPractice;

  const rawAllDomainTopics =
    isClient && clientAnalytics && clientAnalytics.allTopics && clientAnalytics.allTopics.length > 0
      ? clientAnalytics.allTopics
      : [...rawWeaknessRadar, ...rawStrengthList];

  // Subject-partitioned topics
  const weaknessRadar =
    selectedRadarSubject === "all"
      ? rawWeaknessRadar
      : rawWeaknessRadar.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

  const strengthList =
    selectedRadarSubject === "all"
      ? rawStrengthList
      : rawStrengthList.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

  const allDomainTopics =
    selectedRadarSubject === "all"
      ? rawAllDomainTopics
      : rawAllDomainTopics.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

  const timeSinkAlerts =
    selectedRadarSubject === "all"
      ? rawTimeSinkAlerts
      : rawTimeSinkAlerts.filter((t) => normalizeSubject(t.chapter || t.topic).key === selectedRadarSubject);

  // Dynamic recommended practice for the selected subject
  let recommendedPractice = rawRecommendedPractice;
  if (selectedRadarSubject !== "all" && weaknessRadar.length > 0 && weaknessRadar[0]) {
    const topW = weaknessRadar[0];
    recommendedPractice = {
      topic: topW.troubleTopics?.[0] || topW.chapter,
      chapter: topW.chapter,
      subject: topW.subject,
      durationMinutes: 5,
      questionCount: 5,
      reason: `${topW.diagnosisLabel || "Targeted Fix"} (${topW.accuracyPercentage}% accuracy). Focus drill on ${topW.chapter} to eliminate distractor traps.`,
    };
  } else if (selectedRadarSubject !== "all" && activeSubjectCal) {
    recommendedPractice = {
      topic: `${activeSubjectCal.subject} Diagnostic Mock`,
      chapter: `${activeSubjectCal.subject} Core Syllabus`,
      subject: activeSubjectCal.subject,
      durationMinutes: 60,
      questionCount: 50,
      reason: `Complete a 50-question ${activeSubjectCal.subject} mock test to calibrate your baseline and unlock AI Weak Area Detection.`,
    };
  }

  const weakTopics = weaknessRadar.filter(
    (t) => t.status === "critical" || t.status === "polish"
  );
  const strengthsCount = strengthList.length;
  const weakCount = weakTopics.length;
  const allCount = allDomainTopics.length;

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

  // Selected Domain Subjects (from onboarding)
  const candidateSubjects =
    isClient && storeUser.selectedSubjects && storeUser.selectedSubjects.length > 0
      ? storeUser.selectedSubjects
      : targetStream.toLowerCase() === "commerce"
      ? ["Accountancy", "Business Studies", "Economics", "English"]
      : targetStream.toLowerCase() === "humanities"
      ? ["Political Science", "History", "Economics", "English"]
      : ["Physics", "Chemistry", "Mathematics", "English"];

  // Calculate dynamic XP level
  const getLevelInfo = (xp: number) => {
    if (xp >= 3500) return { title: "Level 5 - All-India Ranker", levelNum: 5, progress: 100 };
    if (xp >= 2000) return { title: "Level 4 - Scholar", levelNum: 4, progress: Math.round(((xp - 2000) / 1500) * 100) };
    if (xp >= 1000) return { title: "Level 3 - Competitor", levelNum: 3, progress: Math.round(((xp - 1000) / 1000) * 100) };
    if (xp >= 500) return { title: "Level 2 - Apprentice", levelNum: 2, progress: Math.round(((xp - 500) / 500) * 100) };
    return { title: "Level 1 - Aspirant", levelNum: 1, progress: Math.round((xp / 500) * 100) };
  };

  const levelInfo = getLevelInfo(xpPoints);

  // Handle launching the 5-Question Instant AI Repair Drill
  const handleLaunchInstantRepair = async (topic: string, subject: string) => {
    setActiveRepairTopic(topic);
    try {
      const res = await fetch("/api/ai/repair-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: initialData.user.id,
          weakMicroTopics: [topic],
          subject,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate repair quiz");

      const quizData = (await res.json()) as RepairQuizResponse;

      initTest(
        quizData.testId,
        {
          id: quizData.testId,
          title: quizData.title,
          subject: quizData.subject,
          code: quizData.code,
          totalQuestions: 5,
          durationMinutes: 8,
        },
        quizData.questions
      );

      router.push(`/test/${quizData.testId}`);
    } catch (err) {
      console.error("Instant repair launch failed:", err);
      alert("Unable to generate repair drill. Please retry.");
      setActiveRepairTopic(null);
    }
  };

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
                150 Qs / Subject Goal
              </span>
            </div>
            <p className="text-xs text-black/70 font-medium max-w-2xl">
              Each CUET domain requires <strong>150 questions of the same subject</strong> for the AI Performance Intelligence Engine to eliminate statistical noise, diagnose trap options, and unlock personalized weakness remediation.
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
              All Domains ({allSubjectCalibrations.length})
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
                {allSubjectCalibrations.filter((s) => s.totalAttempted > 0 && !s.isUnlocked).length}
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
                {allSubjectCalibrations.filter((s) => s.isUnlocked).length}
              </span>
            </button>
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allSubjectCalibrations
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
              const isSelected = selectedRadarSubject === sub.subjectKey;
              return (
                <div
                  key={sub.subjectKey}
                  className={`rounded-xl border-2 border-black p-4 flex flex-col justify-between transition-all shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                    sub.isUnlocked
                      ? "bg-[#F0FDF4]"
                      : sub.totalAttempted > 0
                      ? "bg-[#FFFBEB]"
                      : "bg-[#FAF7EE]"
                  } ${isSelected ? "ring-2 ring-black" : ""}`}
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
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRadarSubject(sub.subjectKey);
                        const radarEl = document.getElementById("radar");
                        if (radarEl) {
                          radarEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-black border border-black transition-all flex items-center justify-center gap-1 ${
                        isSelected
                          ? "bg-black text-white shadow-[1px_1px_0px_0px_#000]"
                          : "bg-white text-black hover:bg-[#FAF7EE] shadow-[1px_1px_0px_0px_#000]"
                      }`}
                    >
                      <span>AI Radar</span>
                      <Target className="w-3 h-3" />
                    </button>

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

      {/* 3. CORE 2-COLUMN WORKSPACE: MOCK PAPERS & WEAKNESS RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Domain Mock Papers (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div>
                <h2 className="text-base font-black text-black tracking-tight">
                  Domain Mock Papers
                </h2>
                <p className="text-xs text-black/60 font-medium">
                  50 Compulsory Questions • 60-Minute Countdown • NTA +5 / -1 Marking
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#D1FAE5] border border-black text-[10px] font-black text-black">
                2025/2026 Format
              </span>
            </div>

            {/* Candidate Domain Subject Cards */}
            <div className="space-y-2.5">
              {candidateSubjects.map((subName) => {
                return (
                  <div
                    key={subName}
                    className="p-3.5 rounded-lg border-2 border-black bg-[#FAF7EE] hover:bg-white transition-all flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#000]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-md bg-white border border-black flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-black/70" />
                      </div>
                      <div className="truncate">
                        <p className="font-black text-xs sm:text-sm text-black truncate">
                          {subName}
                        </p>
                        <p className="text-[10px] text-black/60 font-mono font-bold">
                          50 Compulsory Questions • 60 Mins
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard/mocks"
                      className="px-3 py-1.5 rounded-md bg-black hover:bg-[#222] text-white font-black text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-[1px_1px_0px_0px_#000]"
                    >
                      <span>Start Mock</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Quick Diagnostic Sprint Box */}
            <div className={`p-3.5 rounded-lg border-2 border-black flex items-center justify-between gap-3 ${
              isAiMentorUnlocked ? "bg-[#FEF3C7]" : "bg-[#F3F4F6] opacity-90"
            }`}>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-black text-white">
                  {isAiMentorUnlocked ? "5-Min Target Drill" : "Target Drill (Locked)"}
                </span>
                <p className="font-black text-xs text-black truncate">
                  {isAiMentorUnlocked
                    ? `${recommendedPractice.topic} (${recommendedPractice.subject})`
                    : "Personalized Adaptive Weakness Drill"}
                </p>
                <p className="text-[10px] text-black/70 font-medium truncate">
                  {isAiMentorUnlocked
                    ? recommendedPractice.reason
                    : `Unlocks at 150 questions (${totalAttempted}/150 solved). Complete CBT mocks to unlock.`}
                </p>
              </div>

              <button
                type="button"
                disabled={!isAiMentorUnlocked || activeRepairTopic !== null}
                onClick={() =>
                  isAiMentorUnlocked &&
                  handleLaunchInstantRepair(
                    recommendedPractice.topic,
                    recommendedPractice.subject
                  )
                }
                className={`px-3 py-1.5 rounded-md font-black text-xs shrink-0 flex items-center gap-1 border border-black shadow-[1px_1px_0px_0px_#000] ${
                  !isAiMentorUnlocked
                    ? "bg-[#E5E7EB] text-black/60 cursor-not-allowed"
                    : "bg-[#FF5C5C] hover:bg-[#FF4545] text-white cursor-pointer"
                }`}
                title={!isAiMentorUnlocked ? "Complete 150 questions to unlock" : "Start targeted drill"}
              >
                {!isAiMentorUnlocked ? (
                  <>
                    <Lock className="w-3 h-3 text-black/60" />
                    <span>Locked</span>
                  </>
                ) : activeRepairTopic === recommendedPractice.topic ? (
                  <span>{t("loading", "Loading...")}</span>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-white" />
                    <span>{t("startDrill", "Quick Drill")}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Weakness Radar & Core Strengths (5 Cols) */}
        <div id="radar" className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black">
              <div>
                <h2 className="text-base font-black text-black tracking-tight flex items-center gap-2">
                  <span>{t("weaknessRadar", "AI Diagnostic Radar")}</span>
                  {totalAttempted > 0 && (
                    <span className="px-1.5 py-0.2 rounded bg-[#FEF3C7] border border-black text-[9px] font-black uppercase shadow-[1px_1px_0px_0px_#000]">
                      Live
                    </span>
                  )}
                </h2>
                <p className="text-xs text-black/60 font-medium">
                  Weakness Radar, Core Strengths & Trap Option Exposure
                </p>
              </div>

              {/* View Tabs */}
              {allCount > 0 && (
                <div className="flex items-center gap-1 p-0.5 bg-[#FAF7EE] rounded-lg border border-black text-[11px] font-black self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setRadarTab("weaknesses")}
                    className={`px-2 py-1 rounded transition-all flex items-center gap-1 ${
                      radarTab === "weaknesses"
                        ? "bg-[#FF5C5C] text-white shadow-[1px_1px_0px_0px_#000]"
                        : "text-black/70 hover:text-black"
                    }`}
                  >
                    <span>{t("needsWork", "Weak Areas")}</span>
                    <span className="px-1 py-0.1 rounded-full text-[9px] bg-black text-white">
                      {weakCount}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRadarTab("strengths")}
                    className={`px-2 py-1 rounded transition-all flex items-center gap-1 ${
                      radarTab === "strengths"
                        ? "bg-[#10B981] text-white shadow-[1px_1px_0px_0px_#000]"
                        : "text-black/70 hover:text-black"
                    }`}
                  >
                    <span>{t("mastered", "Strengths")}</span>
                    <span className="px-1 py-0.1 rounded-full text-[9px] bg-black text-white">
                      {strengthsCount}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRadarTab("all")}
                    className={`px-2 py-1 rounded transition-all flex items-center gap-1 ${
                      radarTab === "all"
                        ? "bg-black text-white shadow-[1px_1px_0px_0px_#000]"
                        : "text-black/70 hover:text-black"
                    }`}
                  >
                    <span>{t("allTopics", "All")}</span>
                    <span className="px-1 py-0.1 rounded-full text-[9px] bg-white/30 text-white">
                      {allCount}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Subject Selector Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
              <button
                type="button"
                onClick={() => setSelectedRadarSubject("all")}
                className={`px-2.5 py-1 rounded-md text-xs font-black shrink-0 transition-all border ${
                  selectedRadarSubject === "all"
                    ? "bg-black text-white border-black shadow-[1px_1px_0px_0px_#000]"
                    : "bg-[#FAF7EE] text-black/70 border-black/30 hover:border-black"
                }`}
              >
                All Subjects ({totalAttempted} Qs)
              </button>
              {allSubjectCalibrations
                .filter(
                  (s) =>
                    s.totalAttempted > 0 ||
                    candidateSubjects.some((cs) => normalizeSubject(cs).key === s.subjectKey)
                )
                .map((s) => (
                  <button
                    key={s.subjectKey}
                    type="button"
                    onClick={() => setSelectedRadarSubject(s.subjectKey)}
                    className={`px-2.5 py-1 rounded-md text-xs font-black shrink-0 transition-all border flex items-center gap-1 ${
                      selectedRadarSubject === s.subjectKey
                        ? "bg-[#FF5C5C] text-white border-black shadow-[1px_1px_0px_0px_#000]"
                        : "bg-[#FAF7EE] text-black/70 border-black/30 hover:border-black"
                    }`}
                  >
                    <SubjectIcon name={s.icon} className="w-3.5 h-3.5 shrink-0" />
                    <span>{s.subject}</span>
                    <span className="font-mono text-[10px] opacity-80">
                      ({s.totalAttempted}/150)
                    </span>
                  </button>
                ))}
            </div>

            {/* Empty State vs Radar Items */}
            {!isAiMentorUnlocked ? (
              <div className="py-8 px-4 text-center rounded-lg bg-[#FAF7EE] border-2 border-dashed border-black/30 space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                  <Lock className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black text-black">
                    {activeSubjectCal
                      ? `${activeSubjectCal.subject} AI Diagnostic Matrix Calibrating`
                      : "AI Diagnostic Matrix Calibrating"}
                  </p>
                  <p className="text-[11px] text-black/70 leading-relaxed max-w-xs mx-auto">
                    {activeSubjectCal
                      ? `Unlocking ${activeSubjectCal.subject} AI Mentor: ${activeSubjectCal.totalAttempted}/150 questions attempted. Solve ${activeSubjectCal.attemptsToUnlock} more ${activeSubjectCal.subject} questions to eliminate noise and reveal your calibrated Weakness Radar.`
                      : `Unlocking AI Mentor: ${totalAttempted}/150 questions attempted. Solve ${attemptsToUnlock} more questions in CBT mocks to eliminate statistical noise and reveal your calibrated Weakness Radar.`}
                  </p>
                </div>
                <Link
                  href={activeSubjectCal ? activeSubjectCal.mockUrl : "/dashboard/mocks"}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#FF5C5C] text-white font-black text-xs border border-black shadow-[2px_2px_0px_0px_#000]"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>
                    {activeSubjectCal
                      ? `Practice ${activeSubjectCal.subject} Mock`
                      : "Continue Mock Practice"}
                  </span>
                </Link>
              </div>
            ) : allCount === 0 ? (
              <div className="py-8 px-4 text-center rounded-lg bg-[#FAF7EE] border-2 border-dashed border-black/30 space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-white border-2 border-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                  <Target className="w-5 h-5 text-[#FF5C5C]" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black text-black">
                    No Diagnostic Attempts Recorded
                  </p>
                  <p className="text-[11px] text-black/70 leading-relaxed max-w-xs mx-auto">
                    Complete your first 50-question mock test to calibrate your Weakness Radar, Accuracy, and Strengths.
                  </p>
                </div>
                <Link
                  href="/dashboard/mocks"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#FF5C5C] text-white font-black text-xs border border-black shadow-[2px_2px_0px_0px_#000]"
                >
                  <span>Launch Baseline Mock</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : radarTab === "weaknesses" ? (
              // TAB 1: WEAK AREAS
              weakTopics.length === 0 ? (
                <div className="py-6 px-4 text-center rounded-lg bg-[#D1FAE5] border-2 border-black text-xs font-bold text-[#065F46] space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-[#059669] mx-auto" />
                  <p className="font-black text-sm text-black">Zero Critical Weaknesses!</p>
                  <p className="text-xs text-black/70">
                    You have maintained high mastery across all tested domains. Keep up the high precision!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 divide-y divide-black/10">
                  {weakTopics.slice(0, 6).map((topicItem, idx) => {
                    const isCritical = topicItem.status === "critical";
                    const isClockDrain = topicItem.diagnosisLabel === "Calculation & Clock Drain";
                    const isTrapExposure = topicItem.diagnosisLabel === "Impulsive Trap Exposure";

                    const badgeStyle = isClockDrain
                      ? "bg-[#EDE9FE] text-[#7C3AED]"
                      : isTrapExposure
                      ? "bg-[#FFEDD5] text-[#C2410C]"
                      : isCritical
                      ? "bg-[#FEE2E2] text-[#DC2626]"
                      : "bg-[#FEF3C7] text-[#D97706]";

                    const drillTargetTopic = topicItem.troubleTopics?.[0] || topicItem.chapter;

                    return (
                      <div key={idx} className="pt-3 first:pt-0 space-y-2">
                        <div className="flex items-start justify-between gap-2 text-xs">
                          <div className="min-w-0 pr-1 space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-black text-black text-xs">
                                {topicItem.chapter || topicItem.microTopic}
                              </span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase border border-black ${badgeStyle}`}
                              >
                                {topicItem.diagnosisLabel || (isCritical ? "Critical Trap" : "Needs Polish")}
                              </span>
                              {topicItem.confidenceLevel && (
                                <span className="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase bg-black/5 text-black/60 border border-black/10">
                                  {topicItem.confidenceLevel === "high"
                                    ? "High Confidence"
                                    : topicItem.confidenceLevel === "medium"
                                    ? "Calibrated"
                                    : "Early Signal"}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-black/60 font-bold block truncate">
                              {topicItem.attemptsCount} Qs tested • {topicItem.avgTimeSeconds}s avg/Q
                              {topicItem.masteryScore !== undefined && ` • Mastery: ${topicItem.masteryScore}/100`}
                              {topicItem.timeSinksCount > 0 && ` • ${topicItem.timeSinksCount} time-sinks`}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`font-mono font-black text-xs ${
                                isCritical ? "text-[#DC2626]" : "text-[#D97706]"
                              }`}
                            >
                              {topicItem.accuracyPercentage}%
                            </span>

                            <button
                              type="button"
                              disabled={activeRepairTopic !== null}
                              onClick={() =>
                                handleLaunchInstantRepair(
                                  drillTargetTopic,
                                  topicItem.subject
                                )
                              }
                              className="px-2 py-0.5 rounded bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-[10px] border border-black shadow-[1px_1px_0px_0px_#000] flex items-center gap-0.5 disabled:opacity-50 cursor-pointer"
                              title={`Launch targeted drill for ${drillTargetTopic}`}
                            >
                              <Play className="w-2.5 h-2.5 fill-white" />
                              <span>{activeRepairTopic === drillTargetTopic ? "..." : "Fix"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Progress Line */}
                        <div className="w-full h-1.5 bg-[#FAF7EE] border border-black rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isCritical ? "bg-[#FF5C5C]" : "bg-[#F59E0B]"
                            }`}
                            style={{
                              width: `${Math.min(100, Math.max(5, topicItem.masteryScore ?? topicItem.accuracyPercentage))}%`,
                            }}
                          />
                        </div>

                        {/* Diagnostic Insight Callout */}
                        {topicItem.diagnosticInsight && (
                          <div className="p-2 rounded bg-[#FAF7EE] border border-black/10 text-[11px] text-black/80 leading-snug space-y-1">
                            <p className="font-medium text-black/90">{topicItem.diagnosticInsight}</p>
                            {topicItem.remedialPrescription && (
                              <p className="text-[10px] text-black/60 font-semibold">
                                <span className="font-black text-black">Prescription:</span> {topicItem.remedialPrescription}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Vulnerable Concepts Tags */}
                        {topicItem.troubleTopics && topicItem.troubleTopics.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            <span className="text-[10px] font-black text-black/40">Vulnerable:</span>
                            {topicItem.troubleTopics.map((sub, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-white border border-black/20 text-[9px] font-bold text-black/80"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            ) : radarTab === "strengths" ? (
              // TAB 2: CORE STRENGTHS
              strengthList.length === 0 ? (
                <div className="py-6 px-4 text-center rounded-lg bg-[#FAF7EE] border-2 border-dashed border-black/30 text-xs font-bold text-black/70 space-y-1">
                  <Award className="w-6 h-6 text-[#F59E0B] mx-auto" />
                  <p className="font-black text-sm text-black">No Core Strengths Established Yet</p>
                  <p className="text-xs text-black/70">
                    Achieve ≥75% accuracy with consistent pacing across curriculum domains to establish strongholds.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 divide-y divide-black/10">
                  {strengthList.slice(0, 6).map((topicItem, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 space-y-2">
                      <div className="flex items-start justify-between text-xs gap-2">
                        <div className="min-w-0 pr-1 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-black text-xs">
                              {topicItem.chapter || topicItem.microTopic}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-[#D1FAE5] border border-black text-[9px] font-black text-[#065F46] uppercase">
                              {topicItem.diagnosisLabel || "Core Pillar"}
                            </span>
                            {topicItem.confidenceLevel && (
                              <span className="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase bg-black/5 text-black/60 border border-black/10">
                                {topicItem.confidenceLevel === "high" ? "High Confidence" : "Calibrated"}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-black/60 font-bold block truncate">
                            {topicItem.attemptsCount} Qs solved • {topicItem.avgTimeSeconds}s avg/Q
                            {topicItem.masteryScore !== undefined && ` • Mastery: ${topicItem.masteryScore}/100`}
                          </span>
                        </div>
                        <span className="font-mono font-black text-xs text-[#059669] shrink-0">
                          {topicItem.accuracyPercentage}%
                        </span>
                      </div>

                      {/* Progress Line */}
                      <div className="w-full h-1.5 bg-[#FAF7EE] border border-black rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#10B981] transition-all"
                          style={{
                            width: `${Math.min(100, Math.max(10, topicItem.masteryScore ?? topicItem.accuracyPercentage))}%`,
                          }}
                        />
                      </div>

                      {/* Diagnostic Insight */}
                      {topicItem.diagnosticInsight && (
                        <div className="p-2 rounded bg-[#FAF7EE] border border-black/10 text-[11px] text-black/80 leading-snug space-y-1">
                          <p className="font-medium text-black/90">{topicItem.diagnosticInsight}</p>
                          {topicItem.remedialPrescription && (
                            <p className="text-[10px] text-black/60 font-semibold">
                              <span className="font-black text-black">Strategy:</span> {topicItem.remedialPrescription}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Mastered Sub-Topics */}
                      {topicItem.strongTopics && topicItem.strongTopics.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          <span className="text-[10px] font-black text-black/40">Mastered:</span>
                          {topicItem.strongTopics.map((sub, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-white border border-black/20 text-[9px] font-bold text-[#065F46]"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              // TAB 3: ALL DOMAINS
              <div className="space-y-3 divide-y divide-black/10">
                {allDomainTopics.slice(0, 10).map((topicItem, idx) => {
                  const isCritical = topicItem.status === "critical";
                  const isPolish = topicItem.status === "polish";
                  const isMastered = topicItem.status === "mastered" || (!isCritical && !isPolish);

                  const badgeStyle = isCritical
                    ? "bg-[#FEE2E2] text-[#DC2626]"
                    : isPolish
                    ? "bg-[#FEF3C7] text-[#D97706]"
                    : "bg-[#D1FAE5] text-[#065F46]";

                  const drillTargetTopic = topicItem.troubleTopics?.[0] || topicItem.chapter;

                  return (
                    <div key={idx} className="pt-3 first:pt-0 space-y-1.5">
                      <div className="flex items-center justify-between text-xs gap-2">
                        <div className="min-w-0 pr-1 truncate">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-black truncate block">
                              {topicItem.chapter || topicItem.microTopic}
                            </span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase border border-black shrink-0 ${badgeStyle}`}
                            >
                              {topicItem.diagnosisLabel || (isCritical ? "Critical Trap" : isPolish ? "Needs Polish" : "Mastered")}
                            </span>
                          </div>
                          <span className="text-[10px] text-black/60 font-bold block truncate mt-0.5">
                            {topicItem.attemptsCount} Qs • {topicItem.avgTimeSeconds}s avg/Q
                            {topicItem.masteryScore !== undefined && ` • Score: ${topicItem.masteryScore}/100`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`font-mono font-black text-xs ${
                              isCritical
                                ? "text-[#DC2626]"
                                : isPolish
                                ? "text-[#D97706]"
                                : "text-[#059669]"
                            }`}
                          >
                            {topicItem.accuracyPercentage}%
                          </span>

                          {!isMastered && (
                            <button
                              type="button"
                              disabled={activeRepairTopic !== null}
                              onClick={() =>
                                handleLaunchInstantRepair(
                                  drillTargetTopic,
                                  topicItem.subject
                                )
                              }
                              className="px-2 py-0.5 rounded bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-[10px] border border-black shadow-[1px_1px_0px_0px_#000] flex items-center gap-0.5 disabled:opacity-50 cursor-pointer"
                              title={`Launch targeted drill for ${drillTargetTopic}`}
                            >
                              <Play className="w-2.5 h-2.5 fill-white" />
                              <span>{activeRepairTopic === drillTargetTopic ? "..." : "Fix"}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-[#FAF7EE] border border-black rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isCritical
                              ? "bg-[#FF5C5C]"
                              : isPolish
                              ? "bg-[#F59E0B]"
                              : "bg-[#10B981]"
                          }`}
                          style={{
                            width: `${Math.min(100, Math.max(5, topicItem.masteryScore ?? topicItem.accuracyPercentage))}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Time-Sink Alert (Compact) */}
          {timeSinkAlerts.length > 0 && (
            <div className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#DC2626]">
                <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Pacing Alert: &gt;72s Time-Sinks Detected</span>
              </div>
              <p className="text-[11px] text-black/70 font-medium">
                {timeSinkAlerts[0]?.topic} ({timeSinkAlerts[0]?.avgTimeSpent}s avg,{" "}
                {timeSinkAlerts[0]?.errorRate}% error rate) is consuming critical exam
                minutes with wrong answers. Skip and flag on your first pass!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. COMPACT TROPHY CABINET ACCORDION */}
      <TrophyCabinet />
    </div>
  );
}
