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
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from "lucide-react";
import LatexRenderer from "@/components/common/LatexRenderer";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { RepairQuizResponse } from "@/app/api/ai/repair-quiz/route";
import { TopicMastery, TimeSinkAlertData, SubjectCalibrationData } from "@/types";
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

function getSeverityBadge(accuracy: number, diagnosisLabel?: string) {
  if (accuracy < 25) {
    return {
      bg: "bg-[#FEE2E2]",
      text: "text-[#DC2626]",
      label: diagnosisLabel || "Critical (<25%)",
      colorName: "red",
    };
  } else if (accuracy <= 50) {
    return {
      bg: "bg-[#FEF3C7]",
      text: "text-[#B45309]",
      label: diagnosisLabel || "Needs Polish (25-50%)",
      colorName: "amber",
    };
  } else if (accuracy < 75) {
    return {
      bg: "bg-[#DBEAFE]",
      text: "text-[#1D4ED8]",
      label: diagnosisLabel || "Moderate (>50%)",
      colorName: "blue",
    };
  } else {
    return {
      bg: "bg-[#D1FAE5]",
      text: "text-[#065F46]",
      label: diagnosisLabel || "Mastered (≥75%)",
      colorName: "green",
    };
  }
}

function getPrimaryDistractorTrap(topic: TopicMastery): string {
  if (
    topic.diagnosticInsight &&
    (topic.diagnosticInsight.toLowerCase().includes("trap choices") ||
      topic.diagnosticInsight.toLowerCase().includes("negative marking") ||
      topic.diagnosticInsight.toLowerCase().includes("clock drain"))
  ) {
    return topic.diagnosticInsight;
  }

  const primaryTopic = topic.troubleTopics?.[0] || topic.microTopic || topic.chapter;

  if (topic.diagnosisLabel === "Impulsive Trap Exposure") {
    return `Impulsive Negation Trap: Falling for tempting distractor choices in ${primaryTopic} without verifying 'NOT/INCORRECT' qualifiers.`;
  }
  if (topic.diagnosisLabel === "Calculation & Clock Drain") {
    return `Clock-Drain Trap: Multi-step algebraic dead-ends in ${primaryTopic} exceeding standard 72s NTA pacing. Practice formula shortcuts and dimensional elimination.`;
  }
  if (topic.diagnosisLabel === "Critical Conceptual Gap") {
    return `Conceptual Reversal Trap: Confusing inverse reaction mechanisms, boundary conditions, or core formulas in ${primaryTopic}.`;
  }
  if (topic.diagnosisLabel === "Careless / Precision Slip") {
    return `Precision Slip: Sign reversal or unit conversion slip on the final arithmetic step of ${primaryTopic}.`;
  }
  if (topic.diagnosisLabel === "Needs Polish & Consistency") {
    return `Variant Vulnerability: Sub-optimal accuracy on indirect or multi-concept application questions in ${primaryTopic}.`;
  }
  if (topic.status === "mastered" || topic.accuracyPercentage >= 75) {
    return `Low Vulnerability: High resistance against distractor options in ${primaryTopic} under timed exam conditions.`;
  }

  return `Distractor Trap: Susceptible to high-frequency wrong answer choices in ${primaryTopic}. Verify question qualifiers before locking.`;
}

function getTargetNcertReference(topic: TopicMastery): string {
  if (topic.ncertReference && topic.ncertReference.trim()) {
    return topic.ncertReference;
  }
  return `NCERT Class 12 ${topic.subject} • Chapter: ${topic.chapter}`;
}

function MicroConceptPills({
  concepts,
  label = "Vulnerable Micro-Concepts:",
}: {
  concepts: string[];
  label?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!concepts || concepts.length === 0) return null;

  const visibleConcepts = expanded ? concepts : concepts.slice(0, 3);
  const remainingCount = concepts.length - 3;

  return (
    <div className="flex items-center gap-1.5 flex-wrap pt-1">
      <span className="text-[10px] font-black text-black/60 uppercase tracking-wider shrink-0">
        {label}
      </span>
      {visibleConcepts.map((concept, i) => (
        <span
          key={i}
          className="px-2 py-0.5 rounded-md bg-white border border-black text-[10px] font-bold text-black shadow-[1px_1px_0px_0px_#000] inline-flex items-center"
        >
          <LatexRenderer content={concept} inline />
        </span>
      ))}
      {remainingCount > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="px-2 py-0.5 rounded-md bg-[#FEF3C7] hover:bg-[#FDE68A] border border-black text-[10px] font-black text-black shadow-[1px_1px_0px_0px_#000] transition-colors cursor-pointer shrink-0"
          title={expanded ? "Show fewer micro-concepts" : `Show ${remainingCount} more micro-concepts`}
        >
          {expanded ? "Show less" : `+${remainingCount} more`}
        </button>
      )}
    </div>
  );
}

interface DiagnosticChapterRowProps {
  topicItem: TopicMastery;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onLaunchRepair: (topic: string, subject: string) => void;
  isRepairing: boolean;
}

function DiagnosticChapterRow({
  topicItem,
  isExpanded,
  onToggleExpand,
  onLaunchRepair,
  isRepairing,
}: DiagnosticChapterRowProps) {
  const severity = getSeverityBadge(
    topicItem.accuracyPercentage,
    topicItem.diagnosisLabel
  );
  const isPacingCalibrated = topicItem.avgTimeSeconds > 2;
  const pacingText = isPacingCalibrated
    ? `${topicItem.avgTimeSeconds}s avg/Q`
    : "Pacing not calibrated (Mocks rushed)";
  const drillTargetTopic = topicItem.troubleTopics?.[0] || topicItem.chapter;
  const distractorTrap = getPrimaryDistractorTrap(topicItem);
  const ncertRef = getTargetNcertReference(topicItem);
  const troubleConcepts =
    topicItem.troubleTopics && topicItem.troubleTopics.length > 0
      ? topicItem.troubleTopics
      : [topicItem.microTopic || topicItem.chapter].filter(Boolean);

  return (
    <div className="bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all overflow-hidden">
      {/* 1. Collapsible Compact Row Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggleExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleExpand();
          }
        }}
        className="p-3.5 sm:p-4 hover:bg-[#FAF7EE] transition-colors cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-3"
      >
        {/* Left: Chapter name, subject tag, severity badge, subtitle */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-black text-sm sm:text-base tracking-tight">
              {topicItem.chapter || topicItem.microTopic}
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/5 text-black/70 border border-black/10">
              {topicItem.subject}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border border-black ${severity.bg} ${severity.text}`}
            >
              {severity.label}
            </span>
          </div>

          <div className="text-[11px] text-black/60 font-bold flex items-center gap-1.5 flex-wrap">
            <span>{topicItem.attemptsCount} Qs tested</span>
            <span>•</span>
            <span className={!isPacingCalibrated ? "text-amber-700 italic" : ""}>
              {pacingText}
            </span>
            {topicItem.masteryScore !== undefined && (
              <>
                <span>•</span>
                <span>Mastery: {topicItem.masteryScore}/100</span>
              </>
            )}
            {topicItem.timeSinksCount > 0 && (
              <>
                <span>•</span>
                <span className="text-[#DC2626] font-black">
                  {topicItem.timeSinksCount} time-sink{topicItem.timeSinksCount > 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: Mini progress bar + percentage, CTA button, expand/collapse chevron */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end md:self-center">
          {/* Mini Accuracy Progress Bar and percentage */}
          <div className="flex items-center gap-2">
            <div className="w-14 sm:w-20 h-2 bg-[#FAF7EE] border border-black rounded-full overflow-hidden hidden sm:block">
              <div
                className={`h-full rounded-full transition-all ${
                  topicItem.accuracyPercentage < 25
                    ? "bg-[#EF4444]"
                    : topicItem.accuracyPercentage <= 50
                    ? "bg-[#F59E0B]"
                    : topicItem.accuracyPercentage < 75
                    ? "bg-[#3B82F6]"
                    : "bg-[#10B981]"
                }`}
                style={{ width: `${Math.max(5, Math.min(100, topicItem.accuracyPercentage))}%` }}
              />
            </div>
            <span
              className={`font-mono font-black text-xs sm:text-sm ${
                topicItem.accuracyPercentage < 25
                  ? "text-[#DC2626]"
                  : topicItem.accuracyPercentage <= 50
                  ? "text-[#D97706]"
                  : topicItem.accuracyPercentage < 75
                  ? "text-[#2563EB]"
                  : "text-[#059669]"
              }`}
            >
              {topicItem.accuracyPercentage}%
            </span>
          </div>

          {/* Primary CTA: Fix with 5-Q Drill */}
          <button
            type="button"
            disabled={isRepairing}
            onClick={(e) => {
              e.stopPropagation();
              onLaunchRepair(drillTargetTopic, topicItem.subject);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shrink-0"
            title={`Launch 5-Question Instant Fix Drill for ${drillTargetTopic}`}
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{isRepairing ? "Building Drill..." : "Fix with 5-Q Drill"}</span>
          </button>

          {/* Expand/Collapse chevron toggle */}
          <div
            className="p-1 rounded-md border border-black bg-white hover:bg-[#FAF7EE] text-black transition-transform"
            aria-label={isExpanded ? "Collapse chapter details" : "Expand chapter details"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Expanded Detailed Diagnostic Panel */}
      {isExpanded && (
        <div className="p-4 pt-3 border-t-2 border-black bg-white space-y-3.5">
          {/* Detailed Progress Line */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-black text-black">
              <span>Curriculum Retention Metric</span>
              <span className="font-mono">{topicItem.accuracyPercentage}% Accuracy</span>
            </div>
            <div className="w-full h-2 bg-[#FAF7EE] border border-black rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  topicItem.accuracyPercentage < 25
                    ? "bg-[#EF4444]"
                    : topicItem.accuracyPercentage <= 50
                    ? "bg-[#F59E0B]"
                    : topicItem.accuracyPercentage < 75
                    ? "bg-[#3B82F6]"
                    : "bg-[#10B981]"
                }`}
                style={{
                  width: `${Math.min(100, Math.max(5, topicItem.masteryScore ?? topicItem.accuracyPercentage))}%`,
                }}
              />
            </div>
          </div>

          {/* High-Signal Remediation Box: Crisp 2-column summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#FAF7EE] border-2 border-black text-xs shadow-[2px_2px_0px_0px_#000]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-black text-black">
                <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Primary Distractor Trap</span>
              </div>
              <p className="text-[11px] text-black/80 font-medium leading-relaxed">
                {distractorTrap}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-black text-black">
                <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Target NCERT Reference</span>
              </div>
              <p className="text-[11px] text-black/90 font-bold leading-relaxed font-mono">
                {ncertRef}
              </p>
            </div>
          </div>

          {/* Vulnerable Micro-Concepts with Rule of 3 Limiter */}
          <MicroConceptPills
            concepts={troubleConcepts}
            label={topicItem.accuracyPercentage >= 75 ? "Tested Micro-Concepts:" : "Vulnerable Micro-Concepts:"}
          />
        </div>
      )}
    </div>
  );
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
  const [expandedChapterKey, setExpandedChapterKey] = useState<string | null>(null);

  const toggleChapterExpand = (key: string) => {
    setExpandedChapterKey((prev) => (prev === key ? null : key));
  };

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

  // Automatically calibrate Candidate Subjects directly from academic stream
  const activeStream =
    (storeUser.preferredStream || initialData.user.targetStream || "commerce").toLowerCase();
  const candidateSubjects = getSubjectsForStream(activeStream);

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

  // Filtered by selected subject
  const weaknessRadar =
    selectedRadarSubject === "all"
      ? rawWeaknessRadar
      : rawWeaknessRadar.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

  const strengthList =
    selectedRadarSubject === "all"
      ? rawStrengthList
      : rawStrengthList.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

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
    (t) => (t.status === "critical" || t.status === "polish") && t.accuracyPercentage < 75
  );
  const strengthListFiltered = strengthList.filter(
    (t) =>
      (t.status === "mastered" || t.accuracyPercentage >= 75) &&
      !weakTopics.some((w) => w.chapter === t.chapter && w.subject === t.subject)
  );
  const allTestedChapters = [...weakTopics, ...strengthListFiltered];
  const strengthsCount = strengthListFiltered.length;
  const weakCount = weakTopics.length;
  const testedChaptersCount = weakCount + strengthsCount;

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
          <span className="text-[11px] font-bold text-black/60 capitalize">
            {activeStream} Stream ({candidateSubjects.length} Calibrated Domains)
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
            <span>All Stream Domains ({totalAttempted} Qs)</span>
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
                  onClick={() => {
                    setRadarTab("weaknesses");
                    setExpandedChapterKey(null);
                  }}
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
                  onClick={() => {
                    setRadarTab("strengths");
                    setExpandedChapterKey(null);
                  }}
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
                  onClick={() => {
                    setRadarTab("all");
                    setExpandedChapterKey(null);
                  }}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    radarTab === "all"
                      ? "bg-black text-white shadow-[1px_1px_0px_0px_#000]"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  <span>Chapters Tested</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/20 text-black">
                    {testedChaptersCount}
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
            ) : testedChaptersCount === 0 ? (
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
                <div className="space-y-3">
                  {weakTopics.map((topicItem, idx) => {
                    const key = `weak-${topicItem.subject}-${topicItem.chapter}-${idx}`;
                    return (
                      <DiagnosticChapterRow
                        key={key}
                        topicItem={topicItem}
                        isExpanded={expandedChapterKey === key}
                        onToggleExpand={() => toggleChapterExpand(key)}
                        onLaunchRepair={handleLaunchInstantRepair}
                        isRepairing={activeRepairTopic === (topicItem.troubleTopics?.[0] || topicItem.chapter)}
                      />
                    );
                  })}
                </div>
              )
            ) : radarTab === "strengths" ? (
              strengthsCount === 0 ? (
                <div className="py-8 px-6 text-center rounded-xl bg-[#FAF7EE] border-2 border-dashed border-black/30 text-xs font-bold text-black/70 space-y-2">
                  <Award className="w-8 h-8 text-[#F59E0B] mx-auto" />
                  <p className="font-black text-base text-black">No Core Strengths Established Yet</p>
                  <p className="text-xs text-black/70 max-w-md mx-auto">
                    Achieve &ge;75% accuracy with consistent question pacing across curriculum chapters to establish verified strongholds.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {strengthListFiltered.map((topicItem, idx) => {
                    const key = `strength-${topicItem.subject}-${topicItem.chapter}-${idx}`;
                    return (
                      <DiagnosticChapterRow
                        key={key}
                        topicItem={topicItem}
                        isExpanded={expandedChapterKey === key}
                        onToggleExpand={() => toggleChapterExpand(key)}
                        onLaunchRepair={handleLaunchInstantRepair}
                        isRepairing={activeRepairTopic === (topicItem.troubleTopics?.[0] || topicItem.chapter)}
                      />
                    );
                  })}
                </div>
              )
            ) : (
              <div className="space-y-3">
                {allTestedChapters.map((topicItem, idx) => {
                  const key = `all-${topicItem.subject}-${topicItem.chapter}-${idx}`;
                  return (
                    <DiagnosticChapterRow
                      key={key}
                      topicItem={topicItem}
                      isExpanded={expandedChapterKey === key}
                      onToggleExpand={() => toggleChapterExpand(key)}
                      onLaunchRepair={handleLaunchInstantRepair}
                      isRepairing={activeRepairTopic === (topicItem.troubleTopics?.[0] || topicItem.chapter)}
                    />
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
                        {alert.avgTimeSpent <= 2 ? "Pacing uncalibrated" : `${alert.avgTimeSpent}s`} / {alert.errorRate}% Error
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
