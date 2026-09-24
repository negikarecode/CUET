"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Target,
  Clock,
  BookOpen,
  Award,
  Lock,
  Sparkles,
  CheckCircle2,
  Zap,
  Calculator,
  FlaskConical,
  Dna,
  BarChart3,
  TrendingUp,
  Briefcase,
  Scale,
  Landmark,
  Globe,
  Brain,
  Users,
  Laptop,
  Medal,
  GraduationCap,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { RepairQuizResponse } from "@/app/api/ai/repair-quiz/route";
import { TopicMastery, TimeSinkAlertData, SubjectCalibrationData, StreamType } from "@/types";
import { normalizeSubject } from "@/lib/analytics";
import { DEFAULT_STREAM_SUBJECTS } from "@/lib/constants/cuetSubjects";

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

export interface WeaknessRadarInitialData {
  user: {
    id: string;
    fullName: string;
    targetStream: string;
    targetUniversity: string;
    targetCollege: string;
    targetCourse: string;
    selectedSubjects: string[];
    xp: number;
    campusCoins: number;
    currentStreak: number;
  };
  totalAttempted: number;
  accuracyPercentage: number;
  weaknessRadar: TopicMastery[];
  strengthList: TopicMastery[];
  timeSinkAlerts: TimeSinkAlertData[];
  recommendedPractice: {
    topic: string;
    chapter: string;
    subject: string;
    durationMinutes: number;
    questionCount: number;
    reason: string;
  };
  subjectCalibration: Record<string, SubjectCalibrationData>;
}

export default function WeaknessRadarClient({
  initialData,
}: {
  initialData: WeaknessRadarInitialData;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isClient = useIsClient();
  const storeUser = useTestStore((state) => state.user);
  const initTest = useCBTStore((state) => state.initTest);
  const clientAnalytics = useTestStore((state) => state.analytics);
  const testAttempts = useTestStore((state) => state.testAttempts);

  // Subject selector state from URL query or default to "all"
  const paramSubject = searchParams.get("subject") || "all";
  const [selectedRadarSubject, setSelectedRadarSubject] = useState<string>(paramSubject);
  const [radarTab, setRadarTab] = useState<"weaknesses" | "strengths" | "all">("weaknesses");
  const [activeRepairTopic, setActiveRepairTopic] = useState<string | null>(null);

  // Sync state if URL search param changes
  useEffect(() => {
    if (paramSubject) {
      setSelectedRadarSubject(paramSubject);
    }
  }, [paramSubject]);

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

  // Client authentication check
  useEffect(() => {
    if (isClient) {
      const isAuth = Boolean(
        (storeUser?.isLoggedIn && storeUser?.name && storeUser?.id !== "guest") ||
        (initialData?.user && initialData.user.id !== "guest")
      );
      if (!isAuth) {
        router.replace("/signup?redirect=/dashboard/radar");
      }
    }
  }, [isClient, storeUser, initialData, router]);

  // Determine Candidate Subjects
  const candidateSubjects =
    isClient && storeUser.selectedSubjects && storeUser.selectedSubjects.length > 0
      ? storeUser.selectedSubjects
      : initialData.user.selectedSubjects && initialData.user.selectedSubjects.length > 0
      ? initialData.user.selectedSubjects
      : DEFAULT_STREAM_SUBJECTS[(initialData.user.targetStream?.toLowerCase() as StreamType) || "commerce"] || [
          "Physics",
          "Chemistry",
          "Mathematics",
          "English",
        ];

  // Attempt count calculations
  const clientQuestionsAttempted =
    isClient && clientAnalytics ? clientAnalytics.totalQuestionsAttempted || 0 : 0;
  const storeAttemptsSum =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0)
      : 0;
  const activeClientAttempted = Math.max(clientQuestionsAttempted, storeAttemptsSum);
  const serverAttempted = initialData.totalAttempted || 0;
  const totalAttempted = Math.max(serverAttempted, activeClientAttempted);

  // Subject Calibration Map
  const subjectCalibrationMap =
    isClient &&
    clientAnalytics?.subjectCalibration &&
    Object.keys(clientAnalytics.subjectCalibration).length > 0
      ? clientAnalytics.subjectCalibration
      : initialData.subjectCalibration || {};

  // Build subject calibrations specifically for candidate subjects
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

  // Active Subject details
  const activeSubjectCal =
    selectedRadarSubject !== "all" ? subjectCalibrationMap[selectedRadarSubject] : null;

  // Calibration gate status
  const isSubjectUnlocked = activeSubjectCal ? activeSubjectCal.isUnlocked : totalAttempted >= 150;
  const attemptsToUnlock = activeSubjectCal
    ? activeSubjectCal.attemptsToUnlock
    : Math.max(0, 150 - totalAttempted);
  const unlockProgress = activeSubjectCal
    ? activeSubjectCal.unlockProgress
    : Math.min(100, Math.round((totalAttempted / 150) * 100));

  // Analytics sources
  const rawWeaknessRadar =
    isClient && clientAnalytics && clientAnalytics.weaknessRadar.length > 0
      ? clientAnalytics.weaknessRadar
      : initialData.weaknessRadar;

  const rawStrengthList =
    isClient && clientAnalytics && clientAnalytics.strengthList.length > 0
      ? clientAnalytics.strengthList
      : initialData.strengthList && initialData.strengthList.length > 0
      ? initialData.strengthList
      : initialData.weaknessRadar.filter(
          (t) => t.status === "mastered" || t.accuracyPercentage >= 75
        );

  const rawTimeSinkAlerts =
    isClient && clientAnalytics && clientAnalytics.timeSinkAlerts.length > 0
      ? clientAnalytics.timeSinkAlerts
      : initialData.timeSinkAlerts;

  const rawAllTopics =
    isClient && clientAnalytics && clientAnalytics.allTopics && clientAnalytics.allTopics.length > 0
      ? clientAnalytics.allTopics
      : [...rawWeaknessRadar, ...rawStrengthList];

  // Filtered by selected subject
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
      ? rawAllTopics
      : rawAllTopics.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

  const timeSinkAlerts =
    selectedRadarSubject === "all"
      ? rawTimeSinkAlerts
      : rawTimeSinkAlerts.filter(
          (t) =>
            normalizeSubject(t.chapter || t.topic).key === selectedRadarSubject ||
            (activeSubjectCal &&
              (t.topic?.toLowerCase().includes(activeSubjectCal.subject.toLowerCase()) ||
                t.chapter?.toLowerCase().includes(activeSubjectCal.subject.toLowerCase())))
        );

  const weakTopics = weaknessRadar.filter(
    (t) => t.status === "critical" || t.status === "polish"
  );
  const strengthsCount = strengthList.length;
  const weakCount = weakTopics.length;
  const allCount = allDomainTopics.length;

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
      {/* 1. TOP HEADER & BREADCRUMBS */}
      <div className="bg-white rounded-xl border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="p-1 rounded-lg border border-black bg-[#FAF7EE] hover:bg-white text-black transition-all"
              title="Return to Command Hub"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-2">
              <span>Subject Weakness Radar</span>
              <span className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-black text-[10px] font-black uppercase">
                AI Diagnostic Engine
              </span>
            </h1>
          </div>
          <p className="text-xs text-black/70 font-semibold pl-7">
            Identify fatal distractor traps, clock-drain calculations, and NCERT-backed micro-topic weaknesses across your selected domains.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Practice Full CBT Mock</span>
          </Link>
        </div>
      </div>

      {/* 2. CANDIDATE SUBJECT SELECTOR PILLS */}
      <div className="bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#FF5C5C]" />
            <span>Filter By Domain Subject</span>
          </span>
          <span className="text-[11px] font-bold text-black/60">
            {candidateSubjects.length} Active Selected Subjects
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setSelectedRadarSubject("all");
              router.replace("/dashboard/radar", { scroll: false });
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all border-2 border-black flex items-center gap-1.5 ${
              selectedRadarSubject === "all"
                ? "bg-black text-white shadow-[2px_2px_0px_0px_#000]"
                : "bg-[#FAF7EE] text-black hover:bg-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>All Selected Domains ({totalAttempted} Qs)</span>
          </button>

          {candidateSubjectCalibrations.map((sub) => {
            const isSelected = selectedRadarSubject === sub.subjectKey;
            return (
              <button
                key={sub.subjectKey}
                type="button"
                onClick={() => {
                  setSelectedRadarSubject(sub.subjectKey);
                  router.replace(`/dashboard/radar?subject=${sub.subjectKey}`, { scroll: false });
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition-all border-2 border-black flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#FF5C5C] text-white shadow-[2px_2px_0px_0px_#000]"
                    : "bg-white text-black hover:bg-[#FAF7EE]"
                }`}
              >
                <SubjectIcon name={sub.icon} className={`w-4 h-4 ${isSelected ? "text-white" : "text-black"}`} />
                <span>{sub.subject}</span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full border border-black ${
                    isSelected ? "bg-white text-black" : "bg-[#FEF3C7] text-black"
                  }`}
                >
                  {sub.totalAttempted}/150
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CALIBRATION GATE METER FOR CURRENT SELECTION */}
      {!isSubjectUnlocked ? (
        <div className="p-4 rounded-xl border-2 border-black bg-[#FFFBEB] shadow-[3px_3px_0px_0px_#000] space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-black text-white shrink-0 shadow-[1px_1px_0px_0px_#000]">
                <Lock className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-black flex items-center gap-2">
                  <span>
                    {activeSubjectCal
                      ? `${activeSubjectCal.subject} Calibration Gate: ${activeSubjectCal.totalAttempted}/150 Questions`
                      : `Overall AI Mentor Calibration: ${totalAttempted}/150 Questions`}
                  </span>
                  <span className="px-2 py-0.2 rounded bg-amber-200 border border-black text-[9px] font-black uppercase">
                    Statistical Gate
                  </span>
                </p>
                <p className="text-[11px] text-black/70 font-medium mt-0.5">
                  Complete {attemptsToUnlock} more question{attemptsToUnlock === 1 ? "" : "s"} in {activeSubjectCal ? activeSubjectCal.subject : "domain"} CBT mocks to eliminate false positives and unlock personalized trap diagnostics.
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
                {activeSubjectCal
                  ? `${activeSubjectCal.subject} Intelligence Engine Active`
                  : "AI Diagnostic Engine Active Across All Domains"}
              </p>
              <p className="text-[10px] text-black/70 font-semibold">
                Baseline calibrated with high sample statistical significance. Real-time distractor analysis active.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#10B981] text-black text-[10px] font-black uppercase border border-black shadow-[1px_1px_0px_0px_#000] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-black fill-black" />
            AI Calibrated
          </span>
        </div>
      )}

      {/* 4. MAIN RADAR WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topic Mastery Radar (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-black">
              <div>
                <h2 className="text-base font-black text-black tracking-tight flex items-center gap-2">
                  <span>Diagnostic Topic Radar</span>
                  {selectedRadarSubject !== "all" && (
                    <span className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-black text-[10px] font-black">
                      {activeSubjectCal?.subject || selectedRadarSubject}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-black/60 font-medium">
                  Micro-topic accuracy, clock drains, and distractor trap exposure
                </p>
              </div>

              {/* View Tabs */}
              <div className="flex items-center gap-1 p-0.5 bg-[#FAF7EE] rounded-lg border border-black text-[11px] font-black self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setRadarTab("weaknesses")}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    radarTab === "weaknesses"
                      ? "bg-[#FF5C5C] text-white shadow-[1px_1px_0px_0px_#000]"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <span>Weak Areas</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black text-white">
                    {weakCount}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRadarTab("strengths")}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    radarTab === "strengths"
                      ? "bg-[#10B981] text-white shadow-[1px_1px_0px_0px_#000]"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <span>Strengths</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black text-white">
                    {strengthsCount}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRadarTab("all")}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    radarTab === "all"
                      ? "bg-black text-white shadow-[1px_1px_0px_0px_#000]"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <span>All Topics</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/20 text-black">
                    {allCount}
                  </span>
                </button>
              </div>
            </div>

            {/* List Content */}
            {!isSubjectUnlocked ? (
              <div className="py-12 px-6 text-center rounded-xl bg-[#FAF7EE] border-2 border-dashed border-black/30 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                  <Lock className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-black">
                    Diagnostic Radar Calibrating ({activeSubjectCal ? activeSubjectCal.totalAttempted : totalAttempted}/150 Questions)
                  </h3>
                  <p className="text-xs text-black/70 max-w-md mx-auto leading-relaxed">
                    NTA CBT preparation requires at least 150 questions evaluated per subject to reliably classify your errors into concept gaps vs. calculation traps.
                  </p>
                </div>
                <Link
                  href={activeSubjectCal ? activeSubjectCal.mockUrl : "/dashboard/mocks"}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5C5C] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>
                    {activeSubjectCal ? `Practice ${activeSubjectCal.subject} CBT Mock` : "Start Full CBT Mock"}
                  </span>
                </Link>
              </div>
            ) : allCount === 0 ? (
              <div className="py-12 px-6 text-center rounded-xl bg-[#FAF7EE] border-2 border-dashed border-black/30 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
                  <Target className="w-6 h-6 text-[#FF5C5C]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-black">No Diagnostic Attempts Recorded</h3>
                  <p className="text-xs text-black/70 max-w-md mx-auto leading-relaxed">
                    Complete your first 50-question mock test to calibrate your Weakness Radar, Accuracy, and Strengths for this domain.
                  </p>
                </div>
                <Link
                  href="/dashboard/mocks"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5C5C] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                >
                  <span>Launch Baseline Mock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : radarTab === "weaknesses" ? (
              weakTopics.length === 0 ? (
                <div className="py-8 px-6 text-center rounded-xl bg-[#D1FAE5] border-2 border-black text-xs font-bold text-[#065F46] space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                  <CheckCircle2 className="w-7 h-7 text-[#059669] mx-auto stroke-[2.5]" />
                  <p className="font-black text-base text-black">Zero Critical Weaknesses Detected!</p>
                  <p className="text-xs text-black/70 max-w-md mx-auto">
                    You have demonstrated high accuracy and stable time management across all tested chapters in this domain.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 divide-y-2 divide-black/10">
                  {weakTopics.map((topicItem, idx) => {
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
                      <div key={idx} className="pt-4 first:pt-0 space-y-2.5">
                        <div className="flex items-start justify-between gap-3 text-xs">
                          <div className="min-w-0 pr-1 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-black text-black text-sm">
                                {topicItem.chapter || topicItem.microTopic}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border border-black ${badgeStyle}`}
                              >
                                {topicItem.diagnosisLabel || (isCritical ? "Critical Trap" : "Needs Polish")}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/5 text-black/60 border border-black/10">
                                {topicItem.subject}
                              </span>
                            </div>

                            <span className="text-[11px] text-black/60 font-bold block">
                              {topicItem.attemptsCount} Qs tested &bull; {topicItem.avgTimeSeconds}s avg/Q
                              {topicItem.masteryScore !== undefined && ` &bull; Mastery: ${topicItem.masteryScore}/100`}
                              {topicItem.timeSinksCount > 0 && ` &bull; ${topicItem.timeSinksCount} time-sinks`}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`font-mono font-black text-sm ${
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
                              className="px-3 py-1.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                              title={`Launch 5-Question Instant Fix Drill for ${drillTargetTopic}`}
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>{activeRepairTopic === drillTargetTopic ? "Building Drill..." : "Fix with 5-Q Drill"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Progress Line */}
                        <div className="w-full h-2 bg-[#FAF7EE] border border-black rounded-full overflow-hidden">
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
                          <div className="p-3 rounded-lg bg-[#FAF7EE] border border-black text-xs text-black/90 leading-relaxed space-y-1">
                            <p className="font-semibold">{topicItem.diagnosticInsight}</p>
                            {topicItem.remedialPrescription && (
                              <p className="text-[11px] text-black/70">
                                <strong className="text-black">Remediation Prescription:</strong> {topicItem.remedialPrescription}
                              </p>
                            )}
                          </div>
                        )}

                        {/* NCERT Textbook Citation */}
                        {topicItem.ncertReference && (
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-black/60 pt-0.5">
                            <BookOpen className="w-3.5 h-3.5 text-black/50" />
                            <span>NCERT Reference: <strong>{topicItem.ncertReference}</strong></span>
                          </div>
                        )}

                        {/* Vulnerable Concepts Tags */}
                        {topicItem.troubleTopics && topicItem.troubleTopics.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            <span className="text-[10px] font-black text-black/50 uppercase">
                              Vulnerable Micro-Concepts:
                            </span>
                            {topicItem.troubleTopics.map((sub, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-white border border-black text-[10px] font-bold text-black shadow-[1px_1px_0px_0px_#000]"
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
              strengthList.length === 0 ? (
                <div className="py-8 px-6 text-center rounded-xl bg-[#FAF7EE] border-2 border-dashed border-black/30 text-xs font-bold text-black/70 space-y-2">
                  <Award className="w-8 h-8 text-[#F59E0B] mx-auto" />
                  <p className="font-black text-base text-black">No Core Strengths Established Yet</p>
                  <p className="text-xs text-black/70 max-w-md mx-auto">
                    Achieve &ge;75% accuracy with consistent question pacing across curriculum chapters to establish verified strongholds.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 divide-y-2 divide-black/10">
                  {strengthList.map((topicItem, idx) => (
                    <div key={idx} className="pt-4 first:pt-0 space-y-2.5">
                      <div className="flex items-start justify-between text-xs gap-3">
                        <div className="min-w-0 pr-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-black text-sm">
                              {topicItem.chapter || topicItem.microTopic}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#D1FAE5] border border-black text-[9px] font-black text-[#065F46] uppercase">
                              {topicItem.diagnosisLabel || "Core Pillar"}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/5 text-black/60 border border-black/10">
                              {topicItem.subject}
                            </span>
                          </div>
                          <span className="text-[11px] text-black/60 font-bold block">
                            {topicItem.attemptsCount} Qs solved &bull; {topicItem.avgTimeSeconds}s avg/Q
                            {topicItem.masteryScore !== undefined && ` &bull; Mastery: ${topicItem.masteryScore}/100`}
                          </span>
                        </div>
                        <span className="font-mono font-black text-base text-[#059669] shrink-0">
                          {topicItem.accuracyPercentage}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-[#FAF7EE] border border-black rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#10B981] transition-all"
                          style={{
                            width: `${Math.min(100, Math.max(10, topicItem.masteryScore ?? topicItem.accuracyPercentage))}%`,
                          }}
                        />
                      </div>

                      {topicItem.diagnosticInsight && (
                        <div className="p-3 rounded-lg bg-[#FAF7EE] border border-black text-xs text-black/90 leading-relaxed space-y-1">
                          <p className="font-semibold">{topicItem.diagnosticInsight}</p>
                          {topicItem.remedialPrescription && (
                            <p className="text-[11px] text-black/70">
                              <strong className="text-black">Strategy:</strong> {topicItem.remedialPrescription}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-4 divide-y-2 divide-black/10">
                {allDomainTopics.map((topicItem, idx) => {
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
                    <div key={idx} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex items-center justify-between text-xs gap-3">
                        <div className="min-w-0 pr-1 truncate">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-black truncate block text-sm">
                              {topicItem.chapter || topicItem.microTopic}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border border-black shrink-0 ${badgeStyle}`}
                            >
                              {topicItem.diagnosisLabel || (isCritical ? "Critical Trap" : isPolish ? "Needs Polish" : "Mastered")}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/5 text-black/60 border border-black/10">
                              {topicItem.subject}
                            </span>
                          </div>
                          <span className="text-[11px] text-black/60 font-bold block truncate mt-1">
                            {topicItem.attemptsCount} Qs &bull; {topicItem.avgTimeSeconds}s avg/Q
                            {topicItem.masteryScore !== undefined && ` &bull; Score: ${topicItem.masteryScore}/100`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`font-mono font-black text-sm ${
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
                              className="px-2.5 py-1 rounded bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border border-black shadow-[1px_1px_0px_0px_#000] flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                              title={`Launch targeted drill for ${drillTargetTopic}`}
                            >
                              <Play className="w-2.5 h-2.5 fill-white" />
                              <span>{activeRepairTopic === drillTargetTopic ? "..." : "Fix"}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="w-full h-2 bg-[#FAF7EE] border border-black rounded-full overflow-hidden">
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
        </div>

        {/* Right Column: Time Sinks & Exam Tactics (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Time Sinks Card */}
          <div className="bg-white rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#DC2626] stroke-[2.5]" />
                <h3 className="font-black text-sm text-black">
                  Pacing &gt;72s Time Sinks
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] border border-black text-[9px] font-black text-[#DC2626]">
                Exam Lethal
              </span>
            </div>

            {timeSinkAlerts.length === 0 ? (
              <div className="p-4 rounded-lg bg-[#FAF7EE] border border-black text-center space-y-1">
                <CheckCircle2 className="w-5 h-5 text-[#059669] mx-auto" />
                <p className="text-xs font-black text-black">Zero Fatal Time Sinks</p>
                <p className="text-[11px] text-black/60">
                  You are keeping pace within the 72-second NTA question threshold.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {timeSinkAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border-2 border-black bg-[#FFFBEB] space-y-1.5 shadow-[2px_2px_0px_0px_#000]"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-black truncate">{alert.topic}</span>
                      <span className="font-mono font-black text-[#DC2626] shrink-0">
                        {alert.avgTimeSpent}s / {alert.errorRate}% Error
                      </span>
                    </div>
                    <p className="text-[11px] text-black/80 font-medium leading-snug">
                      {alert.recoveryTactic}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Target Practice Recommendation */}
          <div className="bg-[#FEF3C7] rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D97706] fill-[#D97706]" />
              <h3 className="font-black text-sm text-black">
                AI Remediation Practice
              </h3>
            </div>
            <p className="text-xs text-black/80 font-medium leading-relaxed">
              Targeted 5-minute drills dynamically rebalance your question accuracy by training you on distractor traps from actual NTA CBT exams.
            </p>
            {weakTopics.length > 0 && weakTopics[0] && (
              <button
                type="button"
                onClick={() => {
                  const topTopic = weakTopics[0];
                  if (!topTopic) return;
                  handleLaunchInstantRepair(
                    topTopic.troubleTopics?.[0] || topTopic.chapter,
                    topTopic.subject
                  );
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Launch Priority Fix: {weakTopics[0].chapter}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
