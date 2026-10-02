"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Target,
  BookOpen,
  Award,
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
  X,
  FileText,
  Lightbulb,
  Layers,
  Activity,
  Check,
  ShieldAlert,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { RepairQuizResponse } from "@/app/api/ai/repair-quiz/route";
import {
  TopicMastery,
  TimeSinkAlertData,
  SubjectCalibrationData,
  FullTopicDiagnosis,
} from "@/types";
import { normalizeSubject } from "@/lib/analytics";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import {
  generateFullTopicDiagnosis,
  generateDiagnosticSummaryReport,
} from "@/lib/diagnostic-engine";
import { CycleCompletionModal } from "@/components/dashboard/CycleCompletionModal";
import { CycleAnalysisModal } from "@/components/dashboard/CycleAnalysisModal";
import { CycleHistorySelector } from "@/components/dashboard/CycleHistorySelector";
import { SubjectRadarAISection } from "@/components/dashboard/SubjectRadarAISection";
import { DiagnosticCycle } from "@/types/cycle";
import { SubjectRadarAIAnalysis, SubjectRadarAIPayload } from "@/types/subject-ai";

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

// Helper to ensure full diagnosis exists on a TopicMastery
function getOrGenerateDiagnosis(topic: TopicMastery): FullTopicDiagnosis {
  if (topic.fullDiagnosis) {
    if (!topic.fullDiagnosis.recordedMistakes && topic.recordedMistakes) {
      topic.fullDiagnosis.recordedMistakes = topic.recordedMistakes;
    }
    return topic.fullDiagnosis;
  }
  const diag = generateFullTopicDiagnosis(
    topic.subject,
    topic.chapter,
    topic.microTopic || topic.chapter,
    topic.attemptsCount,
    topic.correctCount,
    topic.incorrectCount,
    topic.avgTimeSeconds
  );
  if (topic.recordedMistakes && (!diag.recordedMistakes || diag.recordedMistakes.length === 0)) {
    diag.recordedMistakes = topic.recordedMistakes;
  }
  return diag;
}

function renderProblemClassificationBadge(classification?: FullTopicDiagnosis["problemClassification"]) {
  switch (classification) {
    case "PERFORMANCE_PROBLEM":
      return "⚡ Performance Issue";
    case "QUESTION_INTERPRETATION":
      return "🎯 Distractor Trap / Interpretation";
    case "LIMITED_DATA":
      return "📊 Limited Telemetry";
    case "KNOWLEDGE_PROBLEM":
    default:
      return "🧠 Knowledge Gap";
  }
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
  const currentCycleNumber = useTestStore((state) => state.currentCycleNumber || 1);
  const currentCycleQuestionCount = useTestStore((state) => state.currentCycleQuestionCount || 0);
  const diagnosticCycles = useTestStore((state) => state.diagnosticCycles || []);
  const activeCompletionNotification = useTestStore((state) => state.activeCompletionNotification);
  const dismissCycleCompletionNotification = useTestStore(
    (state) => state.dismissCycleCompletionNotification
  );

  // Subject selector & tab state
  const paramSubject = searchParams.get("subject") || "all";
  const [selectedRadarSubject, setSelectedRadarSubject] = useState<string>(paramSubject);
  const [activeRepairTopic, setActiveRepairTopic] = useState<string | null>(null);
  const [expandedChapterKey, setExpandedChapterKey] = useState<string | null>(null);
  const [selectedModalDiagnosis, setSelectedModalDiagnosis] = useState<FullTopicDiagnosis | null>(null);
  const [selectedCycleForReport, setSelectedCycleForReport] = useState<DiagnosticCycle | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<SubjectRadarAIAnalysis | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const toggleChapterExpand = (key: string) => {
    setExpandedChapterKey((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (paramSubject) {
      setSelectedRadarSubject(paramSubject);
    }
  }, [paramSubject]);

  // Session recovery on mount
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

  // Auth check
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

  const activeStream =
    (storeUser.preferredStream || initialData.user.targetStream || "science").toLowerCase();
  const candidateSubjects = getSubjectsForStream(activeStream);

  const clientQuestionsAttempted =
    isClient && clientAnalytics ? clientAnalytics.totalQuestionsAttempted || 0 : 0;
  const storeAttemptsSum =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0)
      : 0;
  const activeClientAttempted = Math.max(clientQuestionsAttempted, storeAttemptsSum);
  const serverAttempted = initialData.totalAttempted || 0;
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

  const serverAccuracy = initialData.accuracyPercentage || 0;

  const overallAccuracyPercentage =
    directClientAccuracy > 0 && serverAccuracy > 0
      ? activeClientAttempted >= serverAttempted
        ? directClientAccuracy
        : serverAccuracy
      : directClientAccuracy > 0
      ? directClientAccuracy
      : serverAccuracy;

  const completedTestsCount =
    isClient && clientAnalytics
      ? clientAnalytics.completedTestsCount || (testAttempts?.length || 1)
      : 1;

  const subjectCalibrationMap =
    isClient &&
    clientAnalytics?.subjectCalibration &&
    Object.keys(clientAnalytics.subjectCalibration).length > 0
      ? clientAnalytics.subjectCalibration
      : initialData.subjectCalibration || {};

  const candidateSubjectCalibrations: SubjectCalibrationData[] = candidateSubjects.map((subName) => {
    const info = normalizeSubject(subName);
    const existing = subjectCalibrationMap[info.key];
    if (existing) return existing;
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

  const rawWeaknessRadar =
    isClient && clientAnalytics && clientAnalytics.weaknessRadar.length > 0
      ? clientAnalytics.weaknessRadar
      : initialData.weaknessRadar;

  const rawStrengthList =
    isClient && clientAnalytics && clientAnalytics.strengthList.length > 0
      ? clientAnalytics.strengthList
      : initialData.strengthList && initialData.strengthList.length > 0
      ? initialData.strengthList
      : initialData.weaknessRadar.filter((t) => t.status === "mastered" || t.accuracyPercentage >= 75);

  const weaknessRadar =
    selectedRadarSubject === "all"
      ? rawWeaknessRadar
      : rawWeaknessRadar.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

  const strengthList =
    selectedRadarSubject === "all"
      ? rawStrengthList
      : rawStrengthList.filter((t) => normalizeSubject(t.subject).key === selectedRadarSubject);

  // Generate all topic diagnoses
  const allDiagnoses: FullTopicDiagnosis[] = [...weaknessRadar, ...strengthList].map(getOrGenerateDiagnosis);
  const summaryReport = generateDiagnosticSummaryReport(allDiagnoses, totalAttempted, completedTestsCount);

  // Synchronize overall accuracy with unified metric (or subject calibration if subject is filtered)
  const displayAccuracy =
    selectedRadarSubject === "all"
      ? overallAccuracyPercentage
      : subjectCalibrationMap[selectedRadarSubject]?.accuracyPercentage ?? summaryReport.overallAccuracy;
  summaryReport.overallAccuracy = displayAccuracy;

  // Compute deterministic "Next Best Action" topic
  // Prioritizes established/emerging weaknesses with lowest accuracy and high error impact
  const prioritizedCandidate = [...weaknessRadar]
    .filter((t) => !t.isRecovered)
    .sort((a, b) => {
      // Prioritize topics with enough data first (>=5 attempts)
      const aHasData = (a.attemptsCount || 0) >= 5 ? 1 : 0;
      const bHasData = (b.attemptsCount || 0) >= 5 ? 1 : 0;
      if (aHasData !== bHasData) return bHasData - aHasData;
      // Then lowest accuracy
      if (a.accuracyPercentage !== b.accuracyPercentage) {
        return a.accuracyPercentage - b.accuracyPercentage;
      }
      // Then highest error count
      return (b.incorrectCount || 0) - (a.incorrectCount || 0);
    })[0] || weaknessRadar[0];

  const nextActionDiagnosis = prioritizedCandidate ? getOrGenerateDiagnosis(prioritizedCandidate) : null;

  // Evidence-Based AI Analysis for current subject
  const fetchSubjectAIAnalysis = React.useCallback(async () => {
    const activeSubjectName =
      selectedRadarSubject === "all"
        ? candidateSubjects[0] || "Physics"
        : candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.subject || "Physics";

    // Gather questions for this subject across all recorded attempts
    const subjectQuestions = (testAttempts || []).flatMap((t) =>
      (t.questions || []).filter((q) => {
        if (selectedRadarSubject === "all") return true;
        return normalizeSubject(q.subject || "").key === selectedRadarSubject;
      })
    );

    // Calculate difficulty stats
    const diffStats = {
      easy: { attempted: 0, correct: 0, accuracy: 0 },
      medium: { attempted: 0, correct: 0, accuracy: 0 },
      hard: { attempted: 0, correct: 0, accuracy: 0 },
    };

    subjectQuestions.forEach((q) => {
      const diff = ((q.difficulty as string) || "medium").toLowerCase();
      const target = diff.includes("easy") ? diffStats.easy : diff.includes("hard") ? diffStats.hard : diffStats.medium;
      if (q.selectedOption) {
        target.attempted++;
        if (q.isCorrect === true) target.correct++;
      }
    });

    ["easy", "medium", "hard"].forEach((k) => {
      const t = diffStats[k as keyof typeof diffStats];
      t.accuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0;
    });

    const subAttempted = subjectQuestions.filter((q) => q.selectedOption).length;
    const subCorrect = subjectQuestions.filter((q) => q.isCorrect === true).length;
    const subIncorrect = subAttempted - subCorrect;
    const subAccuracy = subAttempted > 0 ? Math.round((subCorrect / subAttempted) * 100) : 0;
    const subTime = subjectQuestions.reduce((s, q) => s + (q.timeSpentSeconds || 0), 0);
    const subAvgTime = subAttempted > 0 ? Math.round(subTime / subAttempted) : 0;

    const payload: SubjectRadarAIPayload = {
      subject: activeSubjectName,
      userId: storeUser?.id || initialData.user.id,
      questions: subjectQuestions.map((q) => ({
        questionId: q.questionId,
        prompt: q.prompt || `Question on ${q.chapter}`,
        options: q.options || [],
        selectedOption: q.selectedOption,
        correctOption: q.correctOption,
        isCorrect: q.isCorrect,
        chapter: q.chapter,
        microTopic: q.microTopic,
        difficulty: (q.difficulty as string) || "medium",
        timeSpentSeconds: q.timeSpentSeconds || 0,
        ncertReference: q.ncertReference,
        explanation: q.explanation,
        errorCategory: q.errorCategory,
      })),
      deterministicStats: {
        totalAttempted: subAttempted,
        correctCount: subCorrect,
        incorrectCount: subIncorrect,
        accuracyPercentage: subAccuracy,
        avgTimeSeconds: subAvgTime,
        difficultyStats: diffStats,
        chapterPerformance: weaknessRadar.map((w) => ({
          chapter: w.chapter,
          attempted: w.attemptsCount,
          correct: w.correctCount,
          accuracy: w.accuracyPercentage,
          avgTimeSeconds: w.avgTimeSeconds,
          primaryDiagnosis: w.diagnosisLabel,
        })),
        errorTaxonomy: {
          totalErrors: subIncorrect,
          conceptualGapCount: Math.round(subIncorrect * 0.4),
          applicationGapCount: Math.round(subIncorrect * 0.3),
          calculationCount: Math.round(subIncorrect * 0.15),
          distractorTrapCount: Math.round(subIncorrect * 0.1),
          questionInterpretationCount: Math.round(subIncorrect * 0.05),
          factualRecallCount: 0,
          formulaMethodCount: 0,
          carelessCount: 0,
          multiStepReasoningCount: 0,
          timePacingCount: 0,
          guessingCount: 0,
          memoryConfusionCount: 0,
        },
        diagnosticConfidence:
          subAttempted >= 20 ? "HIGH" : subAttempted >= 10 ? "MEDIUM" : subAttempted >= 5 ? "LOW" : "INSUFFICIENT_EVIDENCE",
        evidenceThresholdLabel:
          subAttempted >= 20 ? "Established weakness" : subAttempted >= 10 ? "Emerging weakness" : subAttempted >= 5 ? "Early signal" : "Insufficient evidence",
      },
      cycleInfo: {
        currentCycleNumber,
        currentCycleQuestionCount,
        resolvedWeaknesses: diagnosticCycles.flatMap((c) => c.comparison?.resolved.map((r) => r.name) || []),
        recurringWeaknesses: diagnosticCycles.flatMap((c) => c.comparison?.recurringWeak.map((r) => r.name) || []),
      },
    };

    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/subject-radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.analysis) {
          setAiAnalysis(data.analysis);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch subject AI analysis:", err);
    } finally {
      setIsAiLoading(false);
    }
  }, [
    selectedRadarSubject,
    candidateSubjects,
    candidateSubjectCalibrations,
    testAttempts,
    storeUser?.id,
    initialData.user.id,
    weaknessRadar,
    currentCycleNumber,
    currentCycleQuestionCount,
    diagnosticCycles,
  ]);

  // Fetch subject AI analysis whenever active subject or cycle changes
  useEffect(() => {
    if (isClient) {
      fetchSubjectAIAnalysis();
    }
  }, [isClient, selectedRadarSubject, currentCycleNumber, fetchSubjectAIAnalysis]);

  // Launch targeted practice drill
  const handleLaunchTargetedPractice = async (topic: string, subject: string, practiceType?: string) => {
    setActiveRepairTopic(topic);
    try {
      const res = await fetch("/api/ai/repair-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: initialData.user.id,
          weakMicroTopics: [topic],
          subject,
          practiceType,
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
          totalQuestions: quizData.totalQuestions || 5,
          durationMinutes: quizData.durationMinutes || 6,
        },
        quizData.questions
      );

      router.push(`/test/${quizData.testId}`);
    } catch (err) {
      console.error("Targeted practice launch failed:", err);
      alert("Unable to generate targeted practice drill. Please retry.");
      setActiveRepairTopic(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & NAVIGATION */}
      <div className="bg-white rounded-xl border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="p-1 rounded-lg border border-black bg-[#FAF7EE] hover:bg-white text-black transition-all"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-2">
              <span>Diagnostic &amp; Remediation Engine</span>
              <span className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-black text-[10px] font-black uppercase">
                Weakness Radar
              </span>
            </h1>
          </div>
          <p className="text-xs text-black/70 font-semibold pl-7">
            Root-cause analysis, error taxonomy, exam tactics, and adaptive remediation plans for your CUET domain subjects.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Cycle Badge Indicator */}
          <div className="px-3 py-1.5 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <div className="text-left font-mono">
              <span className="text-[10px] font-black uppercase text-black block tracking-tight">
                DIAGNOSTIC CYCLE {currentCycleNumber}
              </span>
              <span className="text-[11px] font-bold text-black/70">
                {currentCycleQuestionCount} / 150 QUESTIONS
              </span>
            </div>
          </div>

          {/* Cycle History Selector */}
          <CycleHistorySelector
            currentCycleNumber={currentCycleNumber}
            currentCycleQuestionCount={currentCycleQuestionCount}
            diagnosticCycles={diagnosticCycles}
            onSelectCycle={(cycle) => setSelectedCycleForReport(cycle)}
          />

          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Take Full CBT Mock</span>
          </Link>
        </div>
      </div>

      {/* 2. PROMINENT "YOUR NEXT BEST ACTION" HERO CARD */}
      {prioritizedCandidate && nextActionDiagnosis && (
        <div className="bg-white rounded-2xl border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_0px_#000] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded bg-black text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-[1px_1px_0px_0px_#000]">
                  <Zap className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                  <span>YOUR NEXT BEST ACTION</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FAF7EE] text-black border border-black text-[10px] font-bold uppercase">
                  {prioritizedCandidate.subject}
                </span>
                <span
                  className={`px-2 py-0.5 rounded border border-black text-[10px] font-black uppercase ${
                    nextActionDiagnosis.diagnosticConfidence === "HIGH"
                      ? "bg-[#DCFCE7] text-[#16A34A]"
                      : nextActionDiagnosis.diagnosticConfidence === "MEDIUM"
                      ? "bg-[#FEF3C7] text-[#B45309]"
                      : nextActionDiagnosis.diagnosticConfidence === "LOW"
                      ? "bg-[#F3F4F6] text-black/70"
                      : "bg-[#F3F4F6] text-black/60"
                  }`}
                >
                  {nextActionDiagnosis.evidenceThresholdLabel}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                  {prioritizedCandidate.chapter}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-black/80 font-mono mt-0.5">
                  {prioritizedCandidate.accuracyPercentage}% Accuracy · {prioritizedCandidate.attemptsCount} Attempts
                  {prioritizedCandidate.avgTimeSeconds ? ` · Avg response time: ${prioritizedCandidate.avgTimeSeconds}s / Q` : ""}
                </p>
              </div>

              {/* Taxonomy badges: Primary Diagnosis & Contributing Factor */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <div className="px-2.5 py-1 rounded-lg bg-[#FEF2F2] border-2 border-black font-black text-black flex items-center gap-1.5 shadow-[1px_1px_0px_0px_#000]">
                  <span className="text-[10px] text-[#DC2626] uppercase">PRIMARY PATTERN:</span>
                  <span>{nextActionDiagnosis.primaryDiagnosis}</span>
                </div>
                {nextActionDiagnosis.contributingFactor && (
                  <div className="px-2.5 py-1 rounded-lg bg-[#FAF7EE] border-2 border-black font-bold text-black/80 flex items-center gap-1.5 shadow-[1px_1px_0px_0px_#000]">
                    <span className="text-[10px] text-black/60 uppercase">CONTRIBUTING PATTERN:</span>
                    <span>{nextActionDiagnosis.contributingFactor}</span>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7EE] border-2 border-black text-xs space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626] block">
                  Evidence Behind Priority:
                </span>
                <p className="text-black/90 font-bold leading-relaxed">
                  {nextActionDiagnosis.diagnosticConfidence === "INSUFFICIENT_EVIDENCE"
                    ? `Limited Data: Only ${prioritizedCandidate.attemptsCount} question attempts recorded. Solve 5 adaptive questions to build reliable diagnostic telemetry.`
                    : `Prioritized because this topic currently has ${prioritizedCandidate.accuracyPercentage}% accuracy across ${prioritizedCandidate.attemptsCount} attempts.`}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-3 shrink-0">
              <button
                type="button"
                disabled={activeRepairTopic === (prioritizedCandidate.troubleTopics?.[0] || prioritizedCandidate.chapter)}
                onClick={() =>
                  handleLaunchTargetedPractice(
                    prioritizedCandidate.troubleTopics?.[0] || prioritizedCandidate.chapter,
                    prioritizedCandidate.subject,
                    nextActionDiagnosis.recommendedPracticeType
                  )
                }
                className="px-6 py-3.5 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white shrink-0" />
                <span>
                  {activeRepairTopic === (prioritizedCandidate.troubleTopics?.[0] || prioritizedCandidate.chapter)
                    ? "Building Drill..."
                    : "START 6-MIN REPAIR"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedModalDiagnosis(nextActionDiagnosis)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Diagnosis</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. REAL DIAGNOSTIC SUMMARY DASHBOARD REPORT (SECTIONS 18 & 25) */}
      <div className="bg-white rounded-xl border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FF5C5C]" />
            <h2 className="text-base sm:text-lg font-black text-black tracking-tight">
              YOUR CURRENT DIAGNOSTIC SUMMARY
            </h2>
          </div>
          <span className="text-[11px] font-black uppercase text-black/60 font-mono">
            {totalAttempted} Questions Analyzed Across {completedTestsCount} Mock{completedTestsCount === 1 ? "" : "s"}
          </span>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg bg-[#FAF7EE] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
            <span className="text-[10px] font-black text-black/60 uppercase tracking-wider">Overall Accuracy</span>
            <p className="text-2xl font-black text-black font-mono">{summaryReport.overallAccuracy}%</p>
            <p className="text-[10px] text-black/70 font-semibold">{totalAttempted} Total Attempts</p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#F0FDF4] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
            <span className="text-[10px] font-black text-[#15803D] uppercase tracking-wider">Strongest Domain</span>
            <p className="text-sm font-black text-black truncate">
              {summaryReport.strongestArea ? summaryReport.strongestArea.topic : "Pending Calibration"}
            </p>
            <p className="text-[10px] text-black/70 font-semibold">
              {summaryReport.strongestArea ? `${summaryReport.strongestArea.accuracy}% accuracy` : "Requires more attempts"}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FEF2F2] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
            <span className="text-[10px] font-black text-[#DC2626] uppercase tracking-wider">Primary Weakness</span>
            <p className="text-sm font-black text-black truncate">
              {summaryReport.biggestWeakness ? summaryReport.biggestWeakness.topic : "None Detected"}
            </p>
            <p className="text-[10px] text-black/70 font-semibold">
              {summaryReport.biggestWeakness ? `${summaryReport.biggestWeakness.accuracy}% accuracy` : "Maintain practice pace"}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1">
            <span className="text-[10px] font-black text-[#B45309] uppercase tracking-wider">
              {summaryReport.pacingLabel || "Response Pattern"}
            </span>
            <p className="text-xs font-black text-black line-clamp-2">{summaryReport.pacingIssue}</p>
          </div>
        </div>

        {/* Priority Action Highlight */}
        <div className="p-3.5 rounded-lg bg-[#FFFBEB] border-2 border-black text-xs shadow-[2px_2px_0px_0px_#000] flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-black text-black uppercase tracking-wider text-[11px]">Priority Action Before Next Mock:</span>
            <p className="text-black/90 font-bold">{summaryReport.priorityAction}</p>
          </div>
        </div>
      </div>

      {/* 3. FILTER BY DOMAIN SUBJECT */}
      <div className="bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#FF5C5C]" />
            <span>Filter By Domain Subject</span>
          </span>
          <span className="text-[11px] font-bold text-black/60 capitalize">
            {activeStream} Stream ({candidateSubjects.length} Domains)
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
            <span>All Domains ({totalAttempted} Qs)</span>
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
                  {sub.totalAttempted} Qs
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. REAL EVIDENCE-BASED AI ANALYST SECTION */}
      <SubjectRadarAISection
        subject={
          selectedRadarSubject === "all"
            ? "Domain Overview"
            : candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.subject || "Domain"
        }
        analysis={aiAnalysis}
        isLoading={isAiLoading}
        onRefresh={fetchSubjectAIAnalysis}
        onLaunchRepairDrill={(topic, practiceType) => {
          const sub =
            selectedRadarSubject === "all"
              ? candidateSubjects[0] || "Physics"
              : candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.subject || "Physics";
          handleLaunchTargetedPractice(topic, sub, practiceType);
        }}
      />

      {/* 5. DIAGNOSTIC WEAKNESS CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-black tracking-tight flex items-center gap-2">
            <span>Diagnosed Weak Areas</span>
            <span className="px-2 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626] border border-black text-xs font-black font-mono">
              {weaknessRadar.length} Topic{weaknessRadar.length === 1 ? "" : "s"}
            </span>
          </h2>
        </div>

        {weaknessRadar.length === 0 ? (
          <div className="p-8 rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000] text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto stroke-[2.5]" />
            <div className="space-y-1">
              <p className="text-base font-black text-black">No Critical Weaknesses Detected</p>
              <p className="text-xs text-black/70 font-semibold max-w-md mx-auto">
                Your performance across tested questions is solid. Continue solving full CBT mocks to unlock deeper micro-topic analysis as sample size grows.
              </p>
            </div>
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <span>Attempt Full Practice Mock</span>
            </Link>
          </div>
        ) : (
          weaknessRadar.map((topicItem) => {
            const diag = getOrGenerateDiagnosis(topicItem);
            const isExpanded = expandedChapterKey === topicItem.chapter;
            const isRepairing = activeRepairTopic === (topicItem.troubleTopics?.[0] || topicItem.chapter);

            return (
              <div
                key={topicItem.chapter}
                className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden transition-all"
              >
                {/* Topic Card Header */}
                <div className="p-4 sm:p-5 border-b-2 border-black space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-black text-base sm:text-lg tracking-tight">
                          {diag.chapter}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/5 text-black/70 border border-black/10">
                          {diag.subject}
                        </span>

                        {/* Confidence Badge */}
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border border-black ${
                            diag.diagnosticConfidence === "HIGH"
                              ? "bg-[#DCFCE7] text-[#16A34A]"
                              : diag.diagnosticConfidence === "MEDIUM"
                              ? "bg-[#FEF3C7] text-[#B45309]"
                              : diag.diagnosticConfidence === "LOW"
                              ? "bg-[#F3F4F6] text-black/70"
                              : "bg-[#F3F4F6] text-black/60"
                          }`}
                        >
                          {diag.evidenceThresholdLabel} ({diag.observedPerformance.accuracyPercentage}%)
                        </span>

                        {/* Pipeline Stage Badge */}
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#1E293B] text-white border border-black">
                          {diag.remediationStage || topicItem.remediationStage || "DETECTED"}
                        </span>

                        {/* Problem Type: Classification Badge */}
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#FAF7EE] text-black border border-black">
                          {renderProblemClassificationBadge(diag.problemClassification)}
                        </span>
                      </div>

                      {/* Primary Diagnosis & Contributing Factor */}
                      <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                        <div className="px-2 py-0.5 rounded bg-[#FEF2F2] border border-black font-black text-black text-[11px] flex items-center gap-1 shadow-[1px_1px_0px_0px_#000]">
                          <span className="text-[9px] text-[#DC2626] uppercase">PRIMARY PATTERN:</span>
                          <span>{diag.primaryDiagnosis}</span>
                        </div>
                        {diag.contributingFactor && (
                          <div className="px-2 py-0.5 rounded bg-[#FAF7EE] border border-black font-bold text-black/80 text-[11px] flex items-center gap-1 shadow-[1px_1px_0px_0px_#000]">
                            <span className="text-[9px] text-black/60 uppercase">CONTRIBUTING PATTERN:</span>
                            <span>{diag.contributingFactor}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-black/80 font-bold">
                        Evidence: {diag.observedPerformance.attemptsCount} attempted · {diag.observedPerformance.incorrectCount} incorrect · Avg Response: {diag.observedPerformance.avgTimeSeconds}s (Target ≤{diag.observedPerformance.targetTimeSeconds}s)
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedModalDiagnosis(diag)}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Full Diagnosis</span>
                      </button>

                      <button
                        type="button"
                        disabled={isRepairing}
                        onClick={() =>
                          handleLaunchTargetedPractice(
                            topicItem.troubleTopics?.[0] || topicItem.chapter,
                            topicItem.subject,
                            diag.recommendedPracticeType
                          )
                        }
                        className="px-3.5 py-1.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{isRepairing ? "Building Drill..." : diag.observedPerformance.attemptsCount < 5 ? "Practice 5 Questions" : "Start Repair Plan"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleChapterExpand(topicItem.chapter)}
                        className="p-1.5 rounded-lg border-2 border-black bg-[#FAF7EE] hover:bg-white text-black transition-colors"
                        aria-label={isExpanded ? "Collapse card" : "Expand card"}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 stroke-[2.5]" /> : <ChevronDown className="w-4 h-4 stroke-[2.5]" />}
                      </button>
                    </div>
                  </div>

                  {/* Primary Issue Summary */}
                  <div className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black text-xs space-y-1">
                    <span className="font-black text-black uppercase tracking-wider text-[10px] text-[#DC2626] block">
                      PRIMARY DIAGNOSED ISSUE:
                    </span>
                    <p className="text-black/90 font-bold">{diag.specificWeakness}</p>
                  </div>
                </div>

                {/* Collapsible / Expandable Details */}
                {isExpanded && (
                  <div className="p-5 bg-white space-y-5">
                    {/* SECTION: EVIDENCE BEHIND THIS DIAGNOSIS */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#F8FAFC] space-y-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>WHY WE THINK THIS (EVIDENCE BEHIND THIS DIAGNOSIS)</span>
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-black/80 font-bold">
                        {diag.evidenceList.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                    </div>

                    {/* SECTION: WHY YOU'RE LOSING MARKS (SECTION 7) */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                        <span>WHY YOU&apos;RE LOSING MARKS (ERROR TAXONOMY)</span>
                      </h3>

                      {diag.errorTaxonomy.percentages ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {Object.entries(diag.errorTaxonomy.percentages)
                            .filter(([_, pct]) => pct > 0)
                            .map(([cat, pct]) => (
                              <div key={cat} className="p-2.5 rounded-lg bg-[#FAF7EE] border border-black text-center space-y-0.5">
                                <span className="text-[10px] font-bold text-black/70 block truncate">{cat}</span>
                                <span className="text-base font-black text-black font-mono">{pct}%</span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-[#FAF7EE] border border-black text-xs space-y-1">
                          <span className="font-bold text-black/80 block">Error Distribution (Counts from {diag.errorTaxonomy.totalErrors} total errors):</span>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {diag.errorTaxonomy.conceptualGapCount > 0 && (
                              <span className="px-2 py-1 bg-white border border-black rounded text-[11px] font-bold">
                                Conceptual: {diag.errorTaxonomy.conceptualGapCount} error{diag.errorTaxonomy.conceptualGapCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.applicationGapCount > 0 && (
                              <span className="px-2 py-1 bg-white border border-black rounded text-[11px] font-bold">
                                Application: {diag.errorTaxonomy.applicationGapCount} error{diag.errorTaxonomy.applicationGapCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.calculationCount > 0 && (
                              <span className="px-2 py-1 bg-white border border-black rounded text-[11px] font-bold">
                                Calculation: {diag.errorTaxonomy.calculationCount} error{diag.errorTaxonomy.calculationCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.distractorTrapCount > 0 && (
                              <span className="px-2 py-1 bg-white border border-black rounded text-[11px] font-bold">
                                Distractor Trap: {diag.errorTaxonomy.distractorTrapCount} error{diag.errorTaxonomy.distractorTrapCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.questionInterpretationCount > 0 && (
                              <span className="px-2 py-1 bg-white border border-black rounded text-[11px] font-bold">
                                Interpretation: {diag.errorTaxonomy.questionInterpretationCount} error{diag.errorTaxonomy.questionInterpretationCount > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION: YOUR MISTAKES (REPRESENTATIVE ATTEMPT LOGS) */}
                    {topicItem.recordedMistakes && topicItem.recordedMistakes.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                          <span>YOUR MISTAKES ({topicItem.recordedMistakes.length} RECORDED)</span>
                        </h3>
                        <div className="space-y-2">
                          {topicItem.recordedMistakes.slice(0, 3).map((m, idx) => (
                            <div key={idx} className="p-3 rounded-lg border border-black bg-white space-y-1 text-xs">
                              <p className="font-bold text-black">{m.prompt}</p>
                              <div className="flex items-center gap-3 text-[11px] font-mono">
                                <span className="text-[#DC2626] font-bold">Your Ans: {m.userAnswer}</span>
                                <span className="text-[#16A34A] font-bold">Correct Ans: {m.correctAnswer}</span>
                                <span className="px-1.5 py-0.2 rounded bg-black/5 text-black font-sans font-bold text-[10px]">
                                  {m.errorCategory}
                                </span>
                              </div>
                              <p className="text-[11px] text-black/70 font-semibold">{m.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SECTION: EXACT SUBTOPICS (SECTION 8) */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>WEAK SUBTOPICS BREAKDOWN</span>
                      </h3>

                      <div className="space-y-1.5">
                        {diag.weakSubtopics.map((sub, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg border border-black bg-white flex items-center justify-between text-xs gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-black block truncate">{sub.name}</span>
                              <span className="text-[10px] text-black/60 font-semibold">{sub.errorPattern}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 font-mono">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border border-black ${
                                  sub.status === "Critical"
                                    ? "bg-[#FEF2F2] text-[#DC2626]"
                                    : sub.status === "Moderate"
                                    ? "bg-[#FEF3C7] text-[#B45309]"
                                    : "bg-[#DCFCE7] text-[#16A34A]"
                                }`}
                              >
                                {sub.status}
                              </span>
                              <span className="font-black text-black text-xs">{sub.accuracyPercentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION: HOW TO FIX THIS (SECTION 9) */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#FAF7EE] space-y-3">
                      <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>HOW TO FIX THIS</span>
                      </h3>

                      <div className="space-y-2 text-xs">
                        <div className="space-y-1">
                          <span className="font-black text-black uppercase text-[10px] block">{diag.remediationPlan.step1Rebuild.title}:</span>
                          <ul className="list-disc pl-4 space-y-0.5 text-black/80 font-semibold">
                            {diag.remediationPlan.step1Rebuild.topicsToReview.map((t, i) => {
                              const isHeader = t.startsWith("FOCUS FIRST:") || t.startsWith("THEN SECONDARY:");
                              return isHeader ? (
                                <li key={i} className="list-none font-black text-black pt-1.5 -ml-4 tracking-wider text-[10px] uppercase">
                                  {t}
                                </li>
                              ) : (
                                <li key={i}>{t}</li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="space-y-1">
                          <span className="font-black text-black uppercase text-[10px] block">{diag.remediationPlan.step2DecisionFramework.title}:</span>
                          <ol className="list-decimal pl-4 space-y-0.5 text-black/80 font-semibold">
                            {diag.remediationPlan.step2DecisionFramework.checklist.map((c, i) => (
                              <li key={i}>{c.replace(/^\d+[\.\)]\s*/, "").replace(/^Step\s*\d+:\s*/i, "")}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* EXAM TACTIC & TRAP (SECTIONS 10 & 11) */}
                    {diag.examTactic && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-lg border-2 border-black bg-[#EFF6FF] space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                          <span className="font-black text-[#1D4ED8] uppercase text-[10px] block flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-[#1D4ED8]" />
                            EXAM TACTIC / SHORTCUT
                          </span>
                          <p className="font-bold text-black">QUICK METHOD: {diag.examTactic.quickMethod}</p>
                          <p className="text-[10px] text-[#DC2626] font-bold">CAUTION: {diag.examTactic.caution}</p>
                        </div>

                        <div className="p-3.5 rounded-lg border-2 border-black bg-[#FEF2F2] space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                          <span className="font-black text-[#DC2626] uppercase text-[10px] block flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 fill-[#DC2626]" />
                            COMMON EXAM TRAP
                          </span>
                          <p className="font-semibold text-black/90 leading-relaxed">{diag.commonTrap}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 5. STRENGTHS SECTION ("WHAT YOU'RE GOOD AT") (SECTION 19) */}
      <div className="bg-white rounded-xl border-2 border-black p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#16A34A]" />
            <h2 className="text-base sm:text-lg font-black text-black tracking-tight">
              WHAT YOU&apos;RE GOOD AT (CORE STRENGTHS)
            </h2>
          </div>
          <span className="text-[11px] font-black uppercase text-[#16A34A] font-mono">
            {strengthList.length} Mastered Topic{strengthList.length === 1 ? "" : "s"}
          </span>
        </div>

        {strengthList.length === 0 ? (
          <p className="text-xs text-black/60 font-semibold italic">
            Complete more question attempts to establish verified core strengths (≥75% accuracy threshold).
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {strengthList.map((st) => (
              <div key={st.chapter} className="p-3.5 rounded-lg border-2 border-black bg-[#F0FDF4] space-y-1 shadow-[2px_2px_0px_0px_#000]">
                <div className="flex items-center justify-between">
                  <span className="font-black text-black text-xs sm:text-sm">{st.chapter}</span>
                  <span className="font-mono font-black text-xs text-[#16A34A]">{st.accuracyPercentage}%</span>
                </div>
                <p className="text-[11px] text-black/70 font-semibold">
                  Tested across {st.attemptsCount} questions · Avg speed {st.avgTimeSeconds}s/Q.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] font-bold text-[#15803D]">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Maintain with 5–10 mixed practice questions per week.</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. FULL TOPIC DIAGNOSIS MODAL (SECTION 20) */}
      {selectedModalDiagnosis &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border-4 border-black max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-6 shadow-[8px_8px_0px_0px_#000] my-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b-2 border-black pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-black text-black tracking-tight">{selectedModalDiagnosis.chapter}</h2>
                    <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black uppercase">
                      {selectedModalDiagnosis.subject}
                    </span>
                  </div>
                  <p className="text-xs text-black/70 font-mono font-bold">{selectedModalDiagnosis.ncertReference}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModalDiagnosis(null)}
                  className="p-1.5 rounded-lg border-2 border-black bg-[#FAF7EE] hover:bg-[#FF5C5C] hover:text-white text-black transition-colors"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Modal Content Sections */}
              <div className="space-y-6 text-xs">
                {/* 1. TOPIC OVERVIEW */}
                <div className="p-4 rounded-xl border-2 border-black bg-[#FAF7EE] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-black uppercase text-xs tracking-wider">TOPIC OVERVIEW</h3>
                    <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-black uppercase">
                      {selectedModalDiagnosis.evidenceThresholdLabel}
                    </span>
                  </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                    <div className="p-2 bg-white rounded border border-black">
                      <span className="text-[10px] text-black/60 block uppercase">Accuracy</span>
                      <span className="text-base font-black">{selectedModalDiagnosis.observedPerformance.accuracyPercentage}%</span>
                    </div>
                    <div className="p-2 bg-white rounded border border-black">
                      <span className="text-[10px] text-black/60 block uppercase">Attempts</span>
                      <span className="text-base font-black">{selectedModalDiagnosis.observedPerformance.attemptsCount}</span>
                    </div>
                    <div className="p-2 bg-white rounded border border-black">
                      <span className="text-[10px] text-black/60 block uppercase">Avg Response</span>
                      <span className="text-base font-black">{selectedModalDiagnosis.observedPerformance.avgTimeSeconds}s</span>
                    </div>
                    <div className="p-2 bg-white rounded border border-black flex flex-col justify-between items-center overflow-hidden">
                      <span className="text-[10px] text-black/60 block uppercase">Confidence</span>
                      <span
                        className={`inline-block px-1.5 py-0.5 mt-0.5 rounded text-[11px] sm:text-xs font-black uppercase tracking-tight text-center max-w-full truncate ${
                          selectedModalDiagnosis.diagnosticConfidence === "HIGH"
                            ? "bg-[#DCFCE7] text-[#16A34A] border border-[#16A34A]/40"
                            : selectedModalDiagnosis.diagnosticConfidence === "MEDIUM"
                            ? "bg-[#FEF3C7] text-[#B45309] border border-[#B45309]/40"
                            : selectedModalDiagnosis.diagnosticConfidence === "LOW"
                            ? "bg-[#F3F4F6] text-black/70 border border-black/20"
                            : "bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/40"
                        }`}
                        title={selectedModalDiagnosis.diagnosticConfidence.replace(/_/g, " ")}
                      >
                        {selectedModalDiagnosis.diagnosticConfidence === "INSUFFICIENT_EVIDENCE"
                          ? "Limited Data"
                          : selectedModalDiagnosis.diagnosticConfidence}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-black/80">{selectedModalDiagnosis.confidenceRationale}</p>
                </div>

                {/* CONDITIONAL CONTENT: LIMITED DATA (<5 attempts) VS ESTABLISHED DIAGNOSIS */}
                {selectedModalDiagnosis.observedPerformance.attemptsCount < 5 ? (
                  <div className="p-6 rounded-xl border-2 border-black bg-[#FAF7EE] text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#FEF3C7] border-2 border-black flex items-center justify-center mx-auto text-[#B45309] shadow-[2px_2px_0px_0px_#000]">
                      <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-black">LIMITED DATA TELEMETRY</h4>
                      <p className="text-xs text-black/70 font-semibold max-w-md mx-auto">
                        Not enough evidence to diagnose a weakness yet. You have only solved{" "}
                        <span className="font-black text-black">{selectedModalDiagnosis.observedPerformance.attemptsCount}</span> question
                        {selectedModalDiagnosis.observedPerformance.attemptsCount === 1 ? "" : "s"} in this topic (need at least 5 to detect patterns).
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto font-mono text-center pt-2">
                      <div className="p-2.5 bg-white rounded-lg border border-black">
                        <span className="text-[10px] text-black/60 uppercase block">Accuracy</span>
                        <span className="text-sm font-black">{selectedModalDiagnosis.observedPerformance.accuracyPercentage}%</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-black">
                        <span className="text-[10px] text-black/60 uppercase block">Attempts</span>
                        <span className="text-sm font-black">{selectedModalDiagnosis.observedPerformance.attemptsCount}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-black">
                        <span className="text-[10px] text-black/60 uppercase block">Avg Response</span>
                        <span className="text-sm font-black">{selectedModalDiagnosis.observedPerformance.avgTimeSeconds}s</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-black">
                        <span className="text-[10px] text-black/60 uppercase block">Needed Qs</span>
                        <span className="text-sm font-black text-[#2563EB]">
                          +{Math.max(1, 5 - selectedModalDiagnosis.observedPerformance.attemptsCount)} more
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const topic = selectedModalDiagnosis.chapter;
                          const subject = selectedModalDiagnosis.subject;
                          setSelectedModalDiagnosis(null);
                          handleLaunchTargetedPractice(topic, subject);
                        }}
                        className="px-6 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Practice 5 Questions</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* 2. PRIMARY DIAGNOSIS & CONTRIBUTING FACTOR */}
                    <div className="p-4 rounded-xl border-2 border-black bg-white space-y-3 shadow-[2px_2px_0px_0px_#000]">
                      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-black/10 pb-2">
                        <span className="text-[10px] font-black text-black/60 uppercase tracking-wider">
                          EVALUATION TAXONOMY
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#FAF7EE] text-black border border-black">
                          {renderProblemClassificationBadge(selectedModalDiagnosis.problemClassification)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[#FEF2F2] border-2 border-black space-y-1">
                          <span className="text-[10px] font-black text-[#DC2626] uppercase tracking-wider block">
                            PRIMARY PATTERN:
                          </span>
                          <span className="text-sm font-black text-black block">
                            {selectedModalDiagnosis.primaryDiagnosis}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black space-y-1">
                          <span className="text-[10px] font-black text-black/60 uppercase tracking-wider block">
                            CONTRIBUTING PATTERN:
                          </span>
                          <span className="text-sm font-bold text-black/90 block">
                            {selectedModalDiagnosis.contributingFactor || "Isolated Topic Variation"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3. EVIDENCE BEHIND THIS DIAGNOSIS */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#F8FAFC] space-y-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                        <span>WHY WE THINK THIS (EVIDENCE BEHIND THIS DIAGNOSIS)</span>
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-black/90 font-semibold text-xs">
                        {selectedModalDiagnosis.evidenceList.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. WHAT TO DO NOW (REPAIR ACTION) + START REPAIR */}
                    <div className="p-4 rounded-xl border-2 border-black bg-[#FFFBEB] space-y-3 shadow-[3px_3px_0px_0px_#000]">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#B45309] flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-[#B45309] fill-[#B45309]" />
                          <span>WHAT TO DO NOW (REPAIR ACTION)</span>
                        </span>
                        <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-black text-white">
                          Est. Time: 6–8 Mins
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2 p-2 bg-white rounded border border-black">
                          <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0">1</span>
                          <span className="font-bold text-black">Review formula / core NCERT principle</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border border-black">
                          <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0">2</span>
                          <span className="font-bold text-black">Eliminate qualifying keyword traps (&apos;NOT/EXCEPT&apos;)</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border border-black">
                          <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0">3</span>
                          <span className="font-bold text-black">Execute 5-question targeted adaptive drill</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white rounded border border-black">
                          <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0">4</span>
                          <span className="font-bold text-black">Reach ≥80% on the targeted drill to continue.</span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const topic = selectedModalDiagnosis.chapter;
                            const subject = selectedModalDiagnosis.subject;
                            const practiceType = selectedModalDiagnosis.recommendedPracticeType;
                            setSelectedModalDiagnosis(null);
                            handleLaunchTargetedPractice(topic, subject, practiceType);
                          }}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>START TARGETED REPAIR DRILL</span>
                        </button>
                      </div>
                    </div>

                    {/* 5. DETAILED EXPLANATION (WHAT THE DATA SUGGESTS) */}
                    <div className="space-y-2">
                      <h3 className="font-black text-black uppercase text-xs tracking-wider">DETAILED EXPLANATION (WHAT THE DATA SUGGESTS)</h3>
                      <div className="p-3.5 rounded-xl border-2 border-black bg-[#FAF7EE] text-xs font-medium text-black/90 leading-relaxed space-y-1.5">
                        <p>{selectedModalDiagnosis.interpretation}</p>
                        <p className="text-[11px] text-black/70 font-semibold">
                          Primary breakdown localized to {selectedModalDiagnosis.weakSubtopics?.[0]?.name || selectedModalDiagnosis.chapter}.
                        </p>
                      </div>
                    </div>

                    {/* 6. WHAT TO STUDY & DECISION TREE (HOW TO STUDY) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-lg border-2 border-black bg-[#F0FDF4] space-y-2">
                        <h4 className="font-black text-black uppercase text-[11px]">WHAT TO STUDY</h4>
                        <ul className="list-disc pl-4 space-y-1 font-semibold text-black/80">
                          {selectedModalDiagnosis.remediationPlan.step1Rebuild.topicsToReview.map((t, i) => {
                            const isHeader = t.startsWith("FOCUS FIRST:") || t.startsWith("THEN SECONDARY:");
                            return isHeader ? (
                              <li key={i} className="list-none font-black text-black pt-1.5 -ml-4 tracking-wider text-[10px] uppercase">
                                {t}
                              </li>
                            ) : (
                              <li key={i}>{t}</li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-lg border-2 border-black bg-[#EFF6FF] space-y-2">
                        <h4 className="font-black text-black uppercase text-[11px]">HOW TO STUDY (DECISION TREE)</h4>
                        <ol className="list-decimal pl-4 space-y-1 font-semibold text-black/80">
                          {selectedModalDiagnosis.remediationPlan.step2DecisionFramework.checklist.map((c, i) => (
                            <li key={i}>{c.replace(/^\d+[\.\)]\s*/, "").replace(/^Step\s*\d+:\s*/i, "")}</li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* 7. EXAM TACTICS & COMMON TRAPS */}
                    {selectedModalDiagnosis.examTactic && (
                      <div className="p-4 rounded-xl border-2 border-black bg-[#FFFBEB] space-y-2">
                        <h3 className="font-black text-black uppercase text-xs tracking-wider">EXAM TACTICS &amp; COMMON TRAPS</h3>
                        <p className="font-bold text-black">QUICK METHOD: {selectedModalDiagnosis.examTactic.quickMethod}</p>
                        <p className="font-semibold text-black/80">FULL METHOD: {selectedModalDiagnosis.examTactic.fullMethod}</p>
                        <p className="font-bold text-[#DC2626]">CAUTION: {selectedModalDiagnosis.examTactic.caution}</p>
                        {selectedModalDiagnosis.commonTrap && (
                          <p className="text-[11px] text-black/80 font-medium pt-1 border-t border-black/10">
                            <strong>Common Trap:</strong> {selectedModalDiagnosis.commonTrap}
                          </p>
                        )}
                      </div>
                    )}

                    {/* 8. MISTAKE HISTORY (YOUR RECENT MISTAKES) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-black uppercase text-xs tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                          <span>YOUR RECENT MISTAKES (ACTUAL QUESTION HISTORY)</span>
                        </h3>
                        {selectedModalDiagnosis.recordedMistakes && selectedModalDiagnosis.recordedMistakes.length > 0 && (
                          <span className="text-[10px] font-black uppercase text-[#DC2626] font-mono">
                            {selectedModalDiagnosis.recordedMistakes.length} Logged
                          </span>
                        )}
                      </div>

                      {selectedModalDiagnosis.recordedMistakes && selectedModalDiagnosis.recordedMistakes.length > 0 ? (
                        <div className="space-y-2">
                          {selectedModalDiagnosis.recordedMistakes.slice(0, 4).map((m, idx) => (
                            <div key={idx} className="p-3 rounded-lg border-2 border-black bg-white space-y-1.5 text-xs shadow-[2px_2px_0px_0px_#000]">
                              <div className="flex items-center justify-between">
                                <span className="font-black text-[#DC2626] text-[11px]">❌ Question #{idx + 1}</span>
                                <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-[10px] font-bold">
                                  {m.timeSpentSeconds ? `~${m.timeSpentSeconds}s` : "Timed"}
                                </span>
                              </div>
                              <p className="font-bold text-black leading-snug">{m.prompt}</p>
                              <div className="flex items-center gap-3 text-[11px] font-mono pt-0.5">
                                <span className="text-[#DC2626] font-black">Selected: {m.userAnswer}</span>
                                <span className="text-[#16A34A] font-black">Correct: {m.correctAnswer}</span>
                                <span className="px-1.5 py-0.2 rounded bg-black/5 text-black font-sans font-bold text-[10px]">
                                  Error: {m.errorCategory}
                                </span>
                              </div>
                              <p className="text-[11px] text-black/70 font-semibold border-t border-black/10 pt-1">
                                {m.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border border-black bg-[#FAF7EE] text-center text-black/70 font-semibold text-xs">
                          Detailed question attempt history is unavailable for this topic. Complete a full CBT mock to log question-level telemetry.
                        </div>
                      )}
                    </div>

                    {/* 9. REPAIR PLAN PROGRESSION (4 PHASES) */}
                    <div className="p-4 rounded-xl border-2 border-black bg-white space-y-3 shadow-[2px_2px_0px_0px_#000]">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="font-black text-black uppercase text-xs tracking-wider flex items-center gap-1.5">
                          <Target className="w-4 h-4 text-[#FF5C5C]" />
                          <span>REPAIR PLAN PROGRESSION</span>
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-[#1E293B] text-white text-[10px] font-black uppercase">
                          Stage: {selectedModalDiagnosis.remediationStage || "DETECTED"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        {/* Phase 1 */}
                        <div className="p-2.5 rounded-lg border-2 border-black bg-[#FAF7EE] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-black">① CONCEPT REPAIR</span>
                            <span className="text-xs font-black text-[#16A34A]">✓</span>
                          </div>
                          <p className="text-[10px] text-black/70 font-semibold leading-tight">NCERT core formulas &amp; definitions reviewed.</p>
                        </div>

                        {/* Phase 2 */}
                        <div className="p-2.5 rounded-lg border-2 border-black bg-[#FFFBEB] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-black">② GUIDED DRILL</span>
                            <span className="text-xs font-black text-[#B45309]">→ Active</span>
                          </div>
                          <p className="text-[10px] text-black/70 font-semibold leading-tight">5 targeted adaptive questions on weak patterns.</p>
                        </div>

                        {/* Phase 3 */}
                        <div className="p-2.5 rounded-lg border-2 border-black bg-white space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-black/60">③ TIMED RETEST</span>
                            <span className="text-xs font-black text-black/40">○</span>
                          </div>
                          <p className="text-[10px] text-black/60 font-semibold leading-tight">10 Qs at ≤{selectedModalDiagnosis.observedPerformance.targetTimeSeconds}s/Q pacing.</p>
                        </div>

                        {/* Phase 4 */}
                        <div className="p-2.5 rounded-lg border-2 border-black bg-white space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-black/60">④ RECOVERY CHECK</span>
                            <span className="text-xs font-black text-black/40">○</span>
                          </div>
                          <p className="text-[10px] text-black/60 font-semibold leading-tight">Verified only when ≥80% accuracy over 10+ attempts.</p>
                        </div>
                      </div>

                      {/* Measurable Recovery Verdict */}
                      <div className="p-3 rounded-lg border border-black bg-[#FAF7EE] text-[11px] font-bold text-black/80 flex items-center justify-between gap-2">
                        <span>Recovery Status:</span>
                        <span className="font-mono">
                          {selectedModalDiagnosis.isRecovered
                            ? "✅ RECOVERED (≥80% accuracy across 10+ attempts verified)"
                            : "Validation incomplete — more evidence required"}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Modal Action CTA */}
                <div className="pt-2 flex items-center justify-end gap-3 border-t-2 border-black">
                  <button
                    type="button"
                    onClick={() => setSelectedModalDiagnosis(null)}
                    className="px-4 py-2 rounded-lg bg-[#FAF7EE] hover:bg-white text-black font-black text-xs border-2 border-black transition-all"
                  >
                    Close Diagnosis
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const topic = selectedModalDiagnosis.chapter;
                      const subject = selectedModalDiagnosis.subject;
                      const practiceType = selectedModalDiagnosis.recommendedPracticeType;
                      setSelectedModalDiagnosis(null);
                      handleLaunchTargetedPractice(topic, subject, practiceType);
                    }}
                    className="px-5 py-2 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>
                      {selectedModalDiagnosis.observedPerformance.attemptsCount < 5
                        ? "Practice 5 Questions"
                        : "START REPAIR PLAN"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Cycle Completion Celebration Modal (Portal) */}
      {isClient &&
        activeCompletionNotification &&
        createPortal(
          <CycleCompletionModal
            notification={activeCompletionNotification}
            onClose={() => dismissCycleCompletionNotification()}
            onViewAnalysis={() => {
              const completed = diagnosticCycles.find(
                (c) => c.cycleNumber === activeCompletionNotification.cycleNumber
              );
              dismissCycleCompletionNotification();
              if (completed) {
                setSelectedCycleForReport(completed);
              }
            }}
          />,
          document.body
        )}

      {/* Cycle Deep Analysis Modal (Portal) */}
      {isClient &&
        selectedCycleForReport &&
        createPortal(
          <CycleAnalysisModal
            cycle={selectedCycleForReport}
            onClose={() => setSelectedCycleForReport(null)}
          />,
          document.body
        )}
    </div>
  );
}
