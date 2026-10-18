"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  AlertTriangle,
  X,
  XCircle,
  FileText,
  Activity,
  Check,
  Lock,
} from "lucide-react";
import { diagnoseMistakeDeterministically } from "@/lib/mistake-detective";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { RepairQuizResponse } from "@/app/api/ai/repair-quiz/route";
import { stringToUuid } from "@/lib/utils";
import {
  TopicMastery,
  TimeSinkAlertData,
  SubjectCalibrationData,
  FullTopicDiagnosis,
  RecordedTestAttempt,
  RecordedQuestionAttempt,
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
import { buildSubjectRadarV2Report } from "@/lib/subject-radar-v2";
import { DiagnosticCycle } from "@/types/cycle";
import { SubjectRadarAIAnalysis, SubjectRadarAIPayload } from "@/types/subject-ai";
import { deriveTopicRepairPlan, recordRepairEvent, TopicRepairState } from "@/lib/repair-plan";
import { enrollMissedQuestion, getSpacedRepetitionSummary } from "@/lib/spaced-repetition";
import { generateWeeklyReportData } from "@/lib/weekly-report-engine";
import { WhyWrongExplanationModal } from "@/components/dashboard/WhyWrongExplanationModal";
import { DoubtSolverDrawer } from "@/components/dashboard/DoubtSolverDrawer";
import { WeeklyReportModal } from "@/components/dashboard/WeeklyReportModal";
import { DailyStudyPlanCard } from "@/components/dashboard/DailyStudyPlanCard";
import { SpacedRepetitionModal } from "@/components/dashboard/SpacedRepetitionModal";
import { RetentionLeaderboardCard } from "@/components/dashboard/RetentionLeaderboardCard";
import { getDiagnosticProgress } from "@/lib/diagnostic-status";
import { HelpCircle, ShieldCheck, TrendingDown, Minus } from "lucide-react";

export type TopicStatusType = "Needs work" | "Developing" | "Strong" | "Low confidence";

export function getTopicStatus(accuracy: number, attempts: number): {
  label: TopicStatusType;
  badgeClass: string;
  ruleTooltip: string;
} {
  if (attempts < 5) {
    return {
      label: "Low confidence",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      ruleTooltip: "Fewer than 5 questions: sample size too small for diagnostic confidence.",
    };
  }
  if (accuracy < 40) {
    return {
      label: "Needs work",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      ruleTooltip: "Under 40% accuracy across 5+ questions: requires targeted concept repair.",
    };
  }
  if (accuracy <= 70) {
    return {
      label: "Developing",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      ruleTooltip: "40% to 70% accuracy: foundational principles understood, needs application drills.",
    };
  }
  if (attempts >= 8) {
    return {
      label: "Strong",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      ruleTooltip: "Over 70% accuracy with 8+ questions: verified core strength.",
    };
  }
  return {
    label: "Developing",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    ruleTooltip: "Over 70% accuracy, but requires 8+ questions to qualify as Strong.",
  };
}

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
  serverAttempts?: RecordedTestAttempt[];
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
      return (
        <span className="inline-flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-500" /> Performance Issue
        </span>
      );
    case "QUESTION_INTERPRETATION":
      return (
        <span className="inline-flex items-center gap-1">
          <Target className="w-3 h-3 text-indigo-500" /> Distractor Trap / Interpretation
        </span>
      );
    case "LIMITED_DATA":
      return (
        <span className="inline-flex items-center gap-1">
          <BarChart3 className="w-3 h-3 text-slate-500" /> Limited Telemetry
        </span>
      );
    case "KNOWLEDGE_PROBLEM":
    default:
      return (
        <span className="inline-flex items-center gap-1">
          <Brain className="w-3 h-3 text-rose-500" /> Knowledge Gap
        </span>
      );
  }
}

function RenderMistakeItem({
  mistake,
  idx,
  onWhyWrong,
}: {
  mistake: any;
  idx: number;
  onWhyWrong: (m: any) => void;
}) {
  return (
    <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50 space-y-2 text-xs">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-bold text-rose-600 text-[11px] inline-flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-500 inline" /> Question #{idx + 1}
          </span>
          {mistake.timeSpentSeconds !== undefined && mistake.timeSpentSeconds > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-mono text-[10px] font-medium">
              ~{mistake.timeSpentSeconds}s answered
            </span>
          )}
        </div>

        {/* Content verification flag (Phase 1 Item 15) */}
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
            mistake.reviewed_by_human
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-purple-50 text-purple-700 border border-purple-200"
          }`}
        >
          {mistake.reviewed_by_human ? (
            <>
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Explanation Reviewed</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>AI-generated</span>
            </>
          )}
        </span>
      </div>

      <p className="font-semibold text-slate-900 leading-snug">{mistake.prompt}</p>

      {/* Answer options breakdown (Phase 1 Item 13) */}
      {mistake.options && mistake.options.length > 0 && (
        <div className="space-y-1.5 pt-0.5">
          {mistake.options.map((opt: any) => {
            const isUser = opt.id === mistake.userAnswer;
            const isCorr = opt.id === mistake.correctAnswer;
            return (
              <div
                key={opt.id}
                className={`p-2 rounded-xl border flex items-start gap-2 text-xs transition-all ${
                  isUser
                    ? "bg-rose-50/80 border-rose-300 text-rose-950 font-medium"
                    : isCorr
                    ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isUser
                      ? "bg-rose-600 text-white"
                      : isCorr
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {opt.id}
                </span>
                <span className="flex-1 text-xs leading-normal">{opt.text}</span>
                {isUser && (
                  <span className="text-[10px] uppercase font-bold text-rose-700 shrink-0 font-mono px-1.5 py-0.5 rounded bg-rose-100">
                    Your Choice
                  </span>
                )}
                {isCorr && (
                  <span className="text-[10px] uppercase font-bold text-emerald-700 shrink-0 font-mono px-1.5 py-0.5 rounded bg-emerald-100">
                    Correct Answer
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Explanation text */}
      <p className="text-[11px] text-slate-600 font-medium pt-1 border-t border-slate-200/60 leading-relaxed">
        {mistake.explanation}
      </p>

      {/* Citation if source exists */}
      {mistake.source && (
        <p className="text-[10px] text-slate-400 font-mono">
          Verified source: {mistake.source}
        </p>
      )}

      {/* Why did I get this wrong button (Phase 2 Item 1) */}
      <div className="pt-1 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onWhyWrong(mistake)}
          className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
          <span>Why did I get this wrong?</span>
        </button>
      </div>
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
  const [selectedModalDiagnosis, setSelectedModalDiagnosis] = useState<FullTopicDiagnosis | null>(null);
  const [selectedCycleForReport, setSelectedCycleForReport] = useState<DiagnosticCycle | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<SubjectRadarAIAnalysis | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysisStatus, setAiAnalysisStatus] = useState<"idle" | "running" | "complete" | "error">("idle");
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisTriggered, setAnalysisTriggered] = useState(false);

  // Phase 2 feature state
  const [selectedMistakeForExplanation, setSelectedMistakeForExplanation] = useState<any | null>(null);
  const [isDoubtDrawerOpen, setIsDoubtDrawerOpen] = useState(false);
  const [isWeeklyReportOpen, setIsWeeklyReportOpen] = useState(false);
  const [isSpacedModalOpen, setIsSpacedModalOpen] = useState(false);
  const [topicRepairState, setTopicRepairState] = useState<TopicRepairState | null>(null);

  // In-flight request controller and fingerprint cache to avoid duplicate/stuck fetches
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const lastFingerprintRef = React.useRef<string>("");

  useEffect(() => {
    if (paramSubject) {
      setSelectedRadarSubject(paramSubject);
    }
  }, [paramSubject]);

  // Synchronize authentic server attempts if present and store has missing attempts
  useEffect(() => {
    if (initialData.serverAttempts && initialData.serverAttempts.length > 0) {
      const { testAttempts: localAttempts, recordTestAttempt } = useTestStore.getState();
      const localKeys = new Set(
        (localAttempts || []).flatMap((a) => [
          (a.testId || "").trim(),
          (a.id || "").trim(),
          stringToUuid((a.testId || "").trim()),
        ])
      );
      initialData.serverAttempts.forEach((att) => {
        const k = (att.testId || att.id || "").trim();
        const uuidK = stringToUuid(k);
        const matchesLocal = (localAttempts || []).some(
          (la) =>
            la.testTitle?.toLowerCase().trim() === att.testTitle?.toLowerCase().trim() &&
            la.subject?.toLowerCase().trim() === att.subject?.toLowerCase().trim()
        );
        if (k && !localKeys.has(k) && !localKeys.has(uuidK) && !matchesLocal) {
          recordTestAttempt(att);
        }
      });
    }
  }, [initialData.serverAttempts]);

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

  // Candidates can view Weakness Radar with local or server session data
  useEffect(() => {
    // No redirect: guest candidates can view report based on their completed test sessions
  }, []);

  const activeStream =
    (storeUser.preferredStream || initialData.user.targetStream || "science").toLowerCase();
  const candidateSubjects = getSubjectsForStream(activeStream);

  // Deduplicate test attempts by testId/id so duplicate sessions are never counted twice
  const cleanTestAttempts = React.useMemo(() => {
    if (!isClient || !testAttempts || testAttempts.length === 0) return [];
    const map = new Map<string, RecordedTestAttempt>();
    testAttempts.forEach((a) => {
      const k = (a.testId || a.id || "").trim();
      if (!k) return;
      if (!map.has(k)) {
        map.set(k, a);
      }
    });
    return Array.from(map.values());
  }, [isClient, testAttempts]);

  // Compute canonical unique qualifying question count across cleanTestAttempts
  const clientUniqueMetrics = React.useMemo(() => {
    const seen = new Set<string>();
    let count = 0;
    let correct = 0;
    cleanTestAttempts.forEach((t) => {
      const tKey = (t.testId || t.id || "test").trim();
      (t.questions || []).forEach((q: RecordedQuestionAttempt, idx: number) => {
        if (q.selectedOption === null || q.selectedOption === undefined) return;
        const qKey = (q.questionId || (q.questionNumber !== undefined ? `q_${q.questionNumber}` : `q_${idx + 1}`)).trim();
        const k = `${tKey}:::${qKey}`;
        if (!seen.has(k)) {
          seen.add(k);
          count++;
          if (q.isCorrect === true) correct++;
        }
      });
    });
    return { count, correct };
  }, [cleanTestAttempts]);

  const serverAttempted = initialData.totalAttempted || 0;
  // Database / server canonical count is authoritative if present; otherwise clean client unique questions
  const totalAttempted =
    serverAttempted > 0
      ? serverAttempted
      : clientUniqueMetrics.count > 0
      ? clientUniqueMetrics.count
      : (clientAnalytics?.totalQuestionsAttempted || 0);

  const clientAccuracy =
    clientUniqueMetrics.count > 0
      ? Math.round((clientUniqueMetrics.correct / clientUniqueMetrics.count) * 100)
      : clientAnalytics?.overallAccuracyPercentage || 0;

  const serverAccuracy = initialData.accuracyPercentage || 0;
  const overallAccuracyPercentage = serverAttempted > 0 ? serverAccuracy : clientAccuracy;

  const completedTestsCount =
    serverAttempted > 0
      ? Math.max(1, Math.ceil(serverAttempted / 50))
      : cleanTestAttempts.length > 0
      ? cleanTestAttempts.length
      : 1;

  const subjectCalibrationMap = React.useMemo(() => {
    return isClient &&
      clientAnalytics?.subjectCalibration &&
      Object.keys(clientAnalytics.subjectCalibration).length > 0
        ? clientAnalytics.subjectCalibration
        : initialData.subjectCalibration || {};
  }, [isClient, clientAnalytics?.subjectCalibration, initialData.subjectCalibration]);

  // Build full subjects list derived from actual test attempts + initial data + stream candidates
  const allSubjectsList = React.useMemo(() => {
    const keysSeen = new Set<string>();
    const list: string[] = [];

    cleanTestAttempts.forEach((t) => {
      (t.questions || []).forEach((q) => {
        if (q.subject || t.subject) {
          const norm = normalizeSubject(q.subject || t.subject || "");
          if (!keysSeen.has(norm.key)) {
            keysSeen.add(norm.key);
            list.push(norm.name);
          }
        }
      });
    });

    [...(initialData.weaknessRadar || []), ...(initialData.strengthList || [])].forEach((t) => {
      if (t.subject) {
        const norm = normalizeSubject(t.subject);
        if (!keysSeen.has(norm.key)) {
          keysSeen.add(norm.key);
          list.push(norm.name);
        }
      }
    });

    candidateSubjects.forEach((subName) => {
      const norm = normalizeSubject(subName);
      if (!keysSeen.has(norm.key)) {
        keysSeen.add(norm.key);
        list.push(norm.name);
      }
    });

    return list;
  }, [cleanTestAttempts, initialData, candidateSubjects]);

  const candidateSubjectCalibrations: SubjectCalibrationData[] = React.useMemo(() => {
    return allSubjectsList.map((subName) => {
      const info = normalizeSubject(subName);
      const existing = subjectCalibrationMap[info.key];
      if (existing && existing.totalAttempted > 0) return existing;

      // Extract telemetry from clean test attempts for this subject
      const subAttempts = cleanTestAttempts.flatMap((t) =>
        (t.questions || []).filter((q) => normalizeSubject(q.subject || t.subject || "").key === info.key)
      );
      const subTotal = subAttempts.filter((q) => q.selectedOption !== null && q.selectedOption !== undefined).length;
      const subCorrect = subAttempts.filter((q) => q.isCorrect === true).length;
      const subIncorrect = subTotal - subCorrect;
      const subAccuracy = subTotal > 0 ? Math.round((subCorrect / subTotal) * 100) : 0;

      return {
        subject: info.name,
        subjectKey: info.key,
        icon: info.icon,
        category: info.category,
        totalAttempted: subTotal,
        totalCorrect: subCorrect,
        totalIncorrect: subIncorrect,
        accuracyPercentage: subAccuracy,
        testsCount: subTotal > 0 ? Math.max(1, Math.ceil(subTotal / 50)) : 0,
        isUnlocked: subTotal >= 150,
        attemptsToUnlock: Math.max(0, 150 - subTotal),
        unlockProgress: Math.min(100, Math.round((subTotal / 150) * 100)),
        mockUrl: info.mockUrl,
      };
    });
  }, [allSubjectsList, subjectCalibrationMap, cleanTestAttempts]);

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

  // Authoritative cycle calculation: single source of truth shared with dashboard
  const authDiagnostic = useMemo(() => {
    return getDiagnosticProgress({
      attempts: cleanTestAttempts,
      totalAttempted,
    } as any);
  }, [cleanTestAttempts, totalAttempted]);

  const effectiveCompletedCycles =
    authDiagnostic.completedCycles.length > 0
      ? authDiagnostic.completedCycles
      : diagnosticCycles.slice(0, authDiagnostic.completedCyclesCount);
  const currentCycleNumber = authDiagnostic.currentCycleNumber;
  const effectiveCycleQuestionCount = authDiagnostic.currentCycleQuestionCount;
  const isCurrentCycleComplete = authDiagnostic.isUnlocked;
  const isCalibrationLocked = !authDiagnostic.isUnlocked;

  // Evidence-driven Subject Weakness Radar V2 Report (deterministic zero-token baseline)
  const radarV2Report = useMemo(() => {
    const activeSubjectName =
      selectedRadarSubject === "all"
        ? candidateSubjects[0] || "Physics"
        : candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.subject || "Physics";

    const allAttempts = cleanTestAttempts.flatMap((t) => t.questions || []);

    return buildSubjectRadarV2Report({
      subject: activeSubjectName,
      attempts: allAttempts,
      currentCycleNumber,
      currentCycleQuestionCount: effectiveCycleQuestionCount,
    });
  }, [
    selectedRadarSubject,
    candidateSubjects,
    candidateSubjectCalibrations,
    cleanTestAttempts,
    currentCycleNumber,
    effectiveCycleQuestionCount,
  ]);

  // Verified Core Strengths require minimum 8+ questions and 80%+ accuracy
  const qualifiedStrengths = useMemo(() => {
    return strengthList.filter((s) => s.attemptsCount >= 8 && s.accuracyPercentage >= 80);
  }, [strengthList]);

  // Priority sort: topics with >= 5 attempts sorted by lowest accuracy first; < 5 attempts placed at bottom
  const sortedTopics = useMemo(() => {
    return [...weaknessRadar].sort((a, b) => {
      const aAdequate = a.attemptsCount >= 5;
      const bAdequate = b.attemptsCount >= 5;
      if (aAdequate && !bAdequate) return -1;
      if (!aAdequate && bAdequate) return 1;
      if (aAdequate && bAdequate) {
        if (a.accuracyPercentage !== b.accuracyPercentage) {
          return a.accuracyPercentage - b.accuracyPercentage;
        }
        return b.attemptsCount - a.attemptsCount;
      }
      if (b.attemptsCount !== a.attemptsCount) {
        return b.attemptsCount - a.attemptsCount;
      }
      return a.accuracyPercentage - b.accuracyPercentage;
    });
  }, [weaknessRadar]);

  // Synchronize missed questions with spaced repetition
  useEffect(() => {
    if (isClient && cleanTestAttempts.length > 0) {
      const uId = storeUser?.id || initialData.user.id;
      cleanTestAttempts.forEach((t) => {
        (t.questions || []).forEach((q) => {
          if (q.selectedOption !== null && q.selectedOption !== undefined && q.isCorrect === false) {
            enrollMissedQuestion(uId, {
              questionId: q.questionId || `q_${q.questionNumber}`,
              subject: q.subject || t.subject || "Domain",
              chapter: q.chapter || "Core Concepts",
              microTopic: q.microTopic,
              prompt: q.prompt || "Practice question",
              options: q.options,
              correctOption: q.correctOption || "A",
              userSelectedOption: q.selectedOption,
              explanation: q.explanation || "",
              source: q.source,
              reviewed_by_human: q.reviewed_by_human,
              isLowEffort: q.isLowEffort || t.isLowEffort,
            });
          }
        });
      });
    }
  }, [isClient, cleanTestAttempts, storeUser, initialData]);

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
  const prioritizedCandidate = [...weaknessRadar]
    .filter((t) => !t.isRecovered)
    .sort((a, b) => {
      const aHasData = (a.attemptsCount || 0) >= 5 ? 1 : 0;
      const bHasData = (b.attemptsCount || 0) >= 5 ? 1 : 0;
      if (aHasData !== bHasData) return bHasData - aHasData;
      if (a.accuracyPercentage !== b.accuracyPercentage) {
        return a.accuracyPercentage - b.accuracyPercentage;
      }
      return (b.incorrectCount || 0) - (a.incorrectCount || 0);
    })[0] || weaknessRadar[0];

  const nextActionDiagnosis = prioritizedCandidate ? getOrGenerateDiagnosis(prioritizedCandidate) : null;

  // Dynamically derive attempted subjects for accurate overview
  const attemptedSubjectNames = React.useMemo(() => {
    const map = new Map<string, number>();
    cleanTestAttempts.forEach((t) => {
      (t.questions || []).forEach((q) => {
        if (q.subject || t.subject) {
          const norm = normalizeSubject(q.subject || t.subject || "");
          map.set(norm.name, (map.get(norm.name) || 0) + 1);
        }
      });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
  }, [cleanTestAttempts]);

  // Evidence-Based AI Analysis for current completed cycle
  const fetchSubjectAIAnalysis = React.useCallback(async (forceRefresh = false) => {
    if (!isCurrentCycleComplete) {
      console.warn("Blocked AI analysis trigger: Current cycle is still in calibration window (<150 Qs).");
      return;
    }

    const activeSubjectName =
      selectedRadarSubject === "all"
        ? attemptedSubjectNames[0] || allSubjectsList[0] || "Domain Overview"
        : candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.subject || "Domain";

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

    const taxonomyCounts = {
      conceptualGapCount: 0,
      factualRecallCount: 0,
      formulaMethodCount: 0,
      calculationCount: 0,
      questionInterpretationCount: 0,
      distractorTrapCount: 0,
      carelessCount: 0,
      multiStepReasoningCount: 0,
      applicationGapCount: 0,
      timePacingCount: 0,
      guessingCount: 0,
      memoryConfusionCount: 0,
    };

    const incorrectQuestions = subjectQuestions.filter((q) => q.selectedOption && q.isCorrect === false);
    for (const q of incorrectQuestions) {
      const diag = diagnoseMistakeDeterministically({
        questionId: q.questionId,
        selectedOption: q.selectedOption || "A",
        correctOption: q.correctOption || "A",
        questionText: q.prompt || "",
        explanation: q.explanation || "",
        chapter: q.chapter,
        microTopic: q.microTopic,
        subject: activeSubjectName,
        timeSpentSeconds: q.timeSpentSeconds,
      });

      switch (diag.category) {
        case "conceptual_misunderstanding":
          taxonomyCounts.conceptualGapCount++;
          break;
        case "missing_prerequisite":
          taxonomyCounts.factualRecallCount++;
          break;
        case "formula_method_error":
          taxonomyCounts.formulaMethodCount++;
          break;
        case "calculation_execution_error":
          taxonomyCounts.calculationCount++;
          break;
        case "question_misinterpretation":
          taxonomyCounts.questionInterpretationCount++;
          break;
        case "incorrect_concept_application":
          taxonomyCounts.applicationGapCount++;
          break;
        case "time_management_pacing":
          taxonomyCounts.timePacingCount++;
          break;
        case "careless_error":
          taxonomyCounts.carelessCount++;
          break;
        case "repeated_error_pattern":
          taxonomyCounts.multiStepReasoningCount++;
          break;
        default:
          taxonomyCounts.distractorTrapCount++;
          break;
      }
    }

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
          ...taxonomyCounts,
        },
        diagnosticConfidence:
          subAttempted >= 20 ? "HIGH" : subAttempted >= 10 ? "MEDIUM" : subAttempted >= 5 ? "LOW" : "INSUFFICIENT_EVIDENCE",
        evidenceThresholdLabel:
          subAttempted >= 20 ? "Established weakness" : subAttempted >= 10 ? "Emerging weakness" : subAttempted >= 5 ? "Early signal" : "Insufficient evidence",
      },
      cycleInfo: {
        currentCycleNumber,
        currentCycleQuestionCount: effectiveCycleQuestionCount,
        resolvedWeaknesses: diagnosticCycles.flatMap((c) => c.comparison?.resolved.map((r) => r.name) || []),
        recurringWeaknesses: diagnosticCycles.flatMap((c) => c.comparison?.recurringWeak.map((r) => r.name) || []),
      },
    };

    // Calculate a stable deterministic fingerprint to prevent duplicate in-flight requests
    const currentFingerprint = `${selectedRadarSubject}:${subAttempted}:${subAccuracy}:${currentCycleNumber}:${effectiveCycleQuestionCount}:${weaknessRadar.length}`;
    if (!forceRefresh && lastFingerprintRef.current === currentFingerprint && aiAnalysis !== null) {
      setAiAnalysisStatus("complete");
      setAnalysisTriggered(true);
      return;
    }
    lastFingerprintRef.current = currentFingerprint;

    // Abort previous in-flight request to avoid race condition overwrite
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsAiLoading(true);
    setAiAnalysisStatus("running");
    setAnalysisTriggered(true);
    setAnalysisError(null);

    try {
      const res = await fetch("/api/ai/subject-radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.analysis) {
          setAiAnalysis(data.analysis);
          setAiAnalysisStatus("complete");
        } else {
          setAiAnalysisStatus("error");
          setAnalysisError("AI interpretation could not be generated right now.");
        }
      } else {
        setAiAnalysisStatus("error");
        setAnalysisError("AI interpretation could not be generated right now.");
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        return;
      }
      console.warn("Failed to fetch subject AI analysis:", err);
      setAiAnalysisStatus("error");
      setAnalysisError("AI interpretation could not be generated right now.");
    } finally {
      if (abortControllerRef.current === controller) {
        setIsAiLoading(false);
      }
    }
  }, [
    isCurrentCycleComplete,
    selectedRadarSubject,
    candidateSubjectCalibrations,
    testAttempts,
    storeUser?.id,
    initialData.user.id,
    weaknessRadar,
    currentCycleNumber,
    effectiveCycleQuestionCount,
    diagnosticCycles,
    aiAnalysis,
    allSubjectsList,
    attemptedSubjectNames,
  ]);

  // Abort in-flight requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

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
          practiceType: (practiceType as "drill" | "retest") || "drill",
          targetChapter: topic,
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

  // Wire event-driven repair plan for selected modal topic
  useEffect(() => {
    if (selectedModalDiagnosis) {
      const uId = storeUser?.id || initialData.user.id;
      const plan = deriveTopicRepairPlan(
        uId,
        selectedModalDiagnosis.chapter,
        cleanTestAttempts
      );
      setTopicRepairState(plan);
    }
  }, [selectedModalDiagnosis, storeUser, initialData, cleanTestAttempts]);

  const handleMarkConceptReviewed = (topic: string) => {
    const uId = storeUser?.id || initialData.user.id;
    const updated = recordRepairEvent(uId, topic, "concept_reviewed");
    setTopicRepairState(updated);
  };

  const calibrationProgressPct = Math.min(
    100,
    Math.round((effectiveCycleQuestionCount / 150) * 100)
  );
  const remainingQuestions = Math.max(0, 150 - effectiveCycleQuestionCount);

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & TOOLBAR ROW */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-2xs"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                Weakness Report
              </h1>
              <p className="text-[13px] text-slate-500 font-medium">
                Topic-level accuracy, error patterns, and targeted practice.
              </p>
            </div>
          </div>

          {/* Cycle Badge Indicator (Single source of truth) */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Cycle {currentCycleNumber} · {effectiveCycleQuestionCount} / 150 Qs</span>
          </div>
        </div>

        {/* Toolbar row under the title */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsDoubtDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <Brain className="w-4 h-4 text-indigo-600" />
              <span>Ask doubt solver</span>
            </button>

            <button
              type="button"
              onClick={() => setIsWeeklyReportOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Weekly report</span>
            </button>

            {effectiveCompletedCycles.length > 0 && (
              <CycleHistorySelector
                currentCycleNumber={currentCycleNumber}
                currentCycleQuestionCount={effectiveCycleQuestionCount}
                diagnosticCycles={effectiveCompletedCycles}
                onSelectCycle={(cycle) => setSelectedCycleForReport(cycle)}
              />
            )}
          </div>

          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold shadow-xs hover:shadow transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Take CBT Mock</span>
          </Link>
        </div>
      </div>


      {/* ============================================================== */}
      {/* 2. CALIBRATION GATED EXPERIENCE                                */}
      {/* ============================================================== */}

      {/* CASE A: UNDER 150 QUESTIONS -> CALIBRATION LOCKED STATE */}
      {isCalibrationLocked ? (
        <div className="space-y-6">
          {/* Diagnostic Cycle Progress Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm text-center space-y-5">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider font-mono inline-block">
                DIAGNOSTIC CYCLE {currentCycleNumber}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-mono">
                {effectiveCycleQuestionCount} / 150 QUESTIONS
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 font-semibold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>CALIBRATION IN PROGRESS</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto leading-relaxed">
              We need enough question-level evidence to reliably identify recurring strengths, weaknesses, and cross-chapter patterns.
            </p>

            {/* Calibration Progress Bar */}
            <div className="max-w-md mx-auto space-y-2">
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(4, calibrationProgressPct)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-500 px-1">
                <span>{calibrationProgressPct}% Calibrated</span>
                <span>{remainingQuestions} {remainingQuestions === 1 ? "question" : "questions"} remaining</span>
              </div>
            </div>
          </div>

          {/* Locked Radar Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>SUBJECT WEAKNESS RADAR LOCKED</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Complete the 150-question diagnostic window to unlock:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span className="text-xs font-semibold text-slate-800">Evidence-based subject analysis</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span className="text-xs font-semibold text-slate-800">Cross-chapter pattern detection</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span className="text-xs font-semibold text-slate-800">Difficulty analysis</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span className="text-xs font-semibold text-slate-800">Personalized learning profile</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span className="text-xs font-semibold text-slate-800">Targeted repair recommendations</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                <span className="text-xs font-semibold text-slate-800">AI diagnostic analysis</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/dashboard/mocks"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>CONTINUE PRACTICING</span>
              </Link>

              {effectiveCompletedCycles.length > 0 && effectiveCompletedCycles[effectiveCompletedCycles.length - 1] && (
                <button
                  type="button"
                  onClick={() => setSelectedCycleForReport(effectiveCompletedCycles[effectiveCompletedCycles.length - 1] || null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>VIEW CYCLE {effectiveCompletedCycles[effectiveCompletedCycles.length - 1]?.cycleNumber} ANALYSIS</span>
                </button>
              )}
            </div>
          </div>

          {/* Daily Study Plan to achieve calibration */}
          <DailyStudyPlanCard
            topWeakTopics={weaknessRadar.map((w) => ({
              chapter: w.chapter,
              subject: w.subject,
              accuracy: w.accuracyPercentage,
            }))}
            spacedDueCount={getSpacedRepetitionSummary(storeUser?.id || initialData.user.id).dueTodayCount}
            calibrationProgressPct={calibrationProgressPct}
            onLaunchDrill={(topic, subject) => handleLaunchTargetedPractice(topic, subject)}
            onOpenSpacedRepetition={() => setIsSpacedModalOpen(true)}
          />

          {/* Retention & Daily Target Habit Tracker */}
          <RetentionLeaderboardCard
            currentStreak={storeUser?.currentStreak || initialData.user.currentStreak || 1}
            todayQuestionsAttempted={cleanTestAttempts.length > 0 ? (cleanTestAttempts[0]?.questions?.length || 50) : 0}
            dailyGoalQuestions={25}
            userRankData={[]}
          />
        </div>
      ) : !analysisTriggered && aiAnalysisStatus !== "running" && aiAnalysisStatus !== "complete" ? (
        /* CASE B: 150/150 REACHED, BUT ANALYSIS NOT TRIGGERED YET */
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm text-center space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-600" /> DIAGNOSTIC CYCLE {authDiagnostic.completedCyclesCount || 1} COMPLETE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              150 / 150 QUESTIONS
            </h2>
            <p className="text-base font-bold text-slate-800">
              Your baseline evidence is now ready.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            You&apos;ve completed enough qualifying questions for the system to analyze your performance across subjects, chapters, difficulty levels, error patterns, and response behavior.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => fetchSubjectAIAnalysis(false)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all flex items-center gap-2.5 shadow-xs hover:shadow cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-white" />
              <span>RUN AI ANALYSIS</span>
            </button>
          </div>
        </div>
      ) : aiAnalysisStatus === "running" ? (
        /* CASE C: ANALYSIS IS CURRENTLY RUNNING (SECTION 6 SPEC) */
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center animate-spin">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight uppercase">
                AI SUBJECT ANALYSIS
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Analyzing your 150-question diagnostic cycle...
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Question telemetry verified</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Chapter performance calculated</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Difficulty patterns calculated</span>
            </div>
            <div className="flex items-center gap-2.5 text-indigo-600 font-semibold animate-pulse">
              <span className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin inline-block" />
              <span>Identifying recurring error patterns</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400 font-medium">
              <span className="w-4 h-4 rounded-full border border-slate-300 inline-block" />
              <span>Building subject learning profile</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-medium text-slate-400 italic">Please wait...</span>
            <button
              disabled
              className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed flex items-center gap-2"
            >
              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
              <span>ANALYZING YOUR 150 QUESTIONS...</span>
            </button>
          </div>
        </div>
      ) : aiAnalysisStatus === "error" && !aiAnalysis ? (
        /* CASE D: ANALYSIS FAILURE STATE (SECTION 13 SPEC) */
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-600 tracking-tight uppercase">
                AI ANALYSIS UNAVAILABLE
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Your 150-question diagnostic data has been successfully recorded, but AI interpretation could not be generated right now.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => fetchSubjectAIAnalysis(true)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>TRY AGAIN</span>
            </button>
          </div>
        </div>
      ) : (
        /* CASE E: 150/150 UNLOCKED & ANALYSIS COMPLETE -> FULL RADAR EXPERIENCE */
        <div className="space-y-6">
          {/* Analysis Complete Badge / View Mode Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              <span className="text-xs font-bold text-emerald-900">
                150-QUESTION DIAGNOSTIC ANALYSIS COMPLETE
              </span>
            </div>
            <button
              type="button"
              onClick={() => fetchSubjectAIAnalysis(true)}
              disabled={isAiLoading}
              className="px-3 py-1 rounded-xl bg-white hover:bg-emerald-100/60 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{isAiLoading ? "Refreshing..." : "Re-run Analysis"}</span>
            </button>
          </div>
      {/* 2. PROMINENT "YOUR NEXT BEST ACTION" HERO CARD */}
      {prioritizedCandidate && nextActionDiagnosis && (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>YOUR NEXT BEST ACTION</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold uppercase">
                  {prioritizedCandidate.subject}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    nextActionDiagnosis.diagnosticConfidence === "HIGH"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : nextActionDiagnosis.diagnosticConfidence === "MEDIUM"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {nextActionDiagnosis.evidenceThresholdLabel}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {prioritizedCandidate.chapter}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 font-mono mt-0.5">
                  {prioritizedCandidate.accuracyPercentage}% Accuracy · {prioritizedCandidate.attemptsCount} Questions Attempted
                </p>
              </div>

              {/* Taxonomy badges: Primary Diagnosis & Contributing Factor */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <div className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-100 font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-[10px] text-rose-600 uppercase tracking-wider">PRIMARY PATTERN:</span>
                  <span>{nextActionDiagnosis.primaryDiagnosis}</span>
                </div>
                {nextActionDiagnosis.contributingFactor && (
                  <div className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/60 font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">CONTRIBUTING PATTERN:</span>
                    <span>{nextActionDiagnosis.contributingFactor}</span>
                  </div>
                )}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                  Evidence Behind Priority:
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white shrink-0" />
                <span>
                  {activeRepairTopic === (prioritizedCandidate.troubleTopics?.[0] || prioritizedCandidate.chapter)
                    ? "Building Drill..."
                    : "START 6-MIN REPAIR"}
                </span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/dashboard/notes/${normalizeSubject(prioritizedCandidate.subject).key}`}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Read Notes</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedModalDiagnosis(nextActionDiagnosis)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full Diagnosis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. REAL DIAGNOSTIC SUMMARY DASHBOARD REPORT (SECTIONS 18 & 25) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-[1.25]">
              Diagnostic summary
            </h2>
            <div
              className="group relative cursor-pointer"
              title="Valid attempt: A unique question where an option was submitted across completed test sessions."
            >
              <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />
            </div>
          </div>
          <span className="text-xs sm:text-sm text-slate-500 tabular-nums pl-4 font-medium">
            {totalAttempted} questions analyzed
          </span>
        </div>

        {/* Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Accuracy</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">{summaryReport.overallAccuracy}%</p>
            <p className="text-xs text-slate-500">Across all practice questions</p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Questions analyzed</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">{totalAttempted}</p>
            <p className="text-xs text-slate-500">Valid test attempts</p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1">
            <span className="text-xs sm:text-sm font-semibold text-slate-600">Main issue</span>
            <p className="text-sm sm:text-base font-bold text-slate-900 whitespace-normal break-words mt-1">
              {summaryReport.biggestWeakness?.topic || "None detected"}
            </p>
            <p className="text-xs text-slate-500">
              {summaryReport.biggestWeakness ? `${summaryReport.biggestWeakness.accuracy}% accuracy` : "No critical weaknesses"}
            </p>
          </div>
        </div>
      </div>

      {/* Verified Core Strengths Summary (Qualified topics only) */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Verified Core Strengths</h3>
          </div>
          <span
            className="text-[11px] text-slate-500 font-medium cursor-help"
            title="Qualification rule: At least 8 questions attempted in topic with 80%+ accuracy"
          >
            Rule: ≥8 Qs &amp; ≥80% accuracy
          </span>
        </div>
        {qualifiedStrengths.length === 0 ? (
          <p className="text-[13px] text-slate-500 italic py-1">
            Not enough data yet. Complete at least 8 questions with ≥80% accuracy in a topic to establish verified core strength.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {qualifiedStrengths.map((st: TopicMastery) => (
              <div key={st.chapter} className="p-3.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{st.chapter}</span>
                  <span className="font-mono font-bold text-xs text-emerald-700">{st.accuracyPercentage}%</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {st.subject} · {st.attemptsCount} questions verified
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. FILTER BY DOMAIN SUBJECT */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>Filter By Domain Subject</span>
          </span>
          <span className="text-xs font-medium text-slate-500 capitalize">
            {activeStream} Stream ({candidateSubjects.length} Domains)
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setSelectedRadarSubject("all");
              router.replace("/dashboard/radar", { scroll: false });
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
              selectedRadarSubject === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>All Domains ({totalAttempted} Qs)</span>
          </button>

          {/* Sort subjects: attempted domains first, 0-question domains moved to end in muted style */}
          {[...candidateSubjectCalibrations]
            .sort((a, b) => {
              if ((a.totalAttempted > 0) !== (b.totalAttempted > 0)) {
                return b.totalAttempted - a.totalAttempted;
              }
              return a.subject.localeCompare(b.subject);
            })
            .map((sub) => {
              const isSelected = selectedRadarSubject === sub.subjectKey;
              const hasAttempts = sub.totalAttempted > 0;
              return (
                <button
                  key={sub.subjectKey}
                  type="button"
                  onClick={() => {
                    setSelectedRadarSubject(sub.subjectKey);
                    router.replace(`/dashboard/radar?subject=${sub.subjectKey}`, { scroll: false });
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                      : hasAttempts
                      ? "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                      : "bg-slate-50/60 text-slate-400 hover:bg-slate-100 border border-slate-200/50 opacity-70"
                  }`}
                >
                  <SubjectIcon name={sub.icon} className={`w-4 h-4 ${isSelected ? "text-white" : hasAttempts ? "text-slate-600" : "text-slate-400"}`} />
                  <span>{sub.subject}</span>
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : hasAttempts ? "bg-slate-200/80 text-slate-700" : "bg-slate-100 text-slate-400"
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
        status={aiAnalysisStatus}
        errorMessage={analysisError}
        isUnlocked={
          (selectedRadarSubject === "all"
            ? currentCycleQuestionCount >= 150 || totalAttempted >= 150
            : (candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.totalAttempted || 0) >= 150)
        }
        currentQuestionsCount={
          selectedRadarSubject === "all"
            ? (currentCycleQuestionCount || totalAttempted)
            : (candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.totalAttempted || 0)
        }
        requiredQuestionsCount={150}
        radarV2Report={radarV2Report}
        onRefresh={() => fetchSubjectAIAnalysis(true)}
        onLaunchRepairDrill={(topic, practiceType) => {
          const sub =
            selectedRadarSubject === "all"
              ? candidateSubjects[0] || "Physics"
              : candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.subject || "Physics";
          handleLaunchTargetedPractice(topic, sub, practiceType);
        }}
      />

      {/* 5. Topics Table & Visual Benchmark */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-[1.25]">
              Topics to fix
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
              Review topic accuracy, error patterns, and practice weak concepts.
            </p>
          </div>
          <span className="text-xs sm:text-sm text-slate-500 tabular-nums font-medium">
            {sortedTopics.length} {sortedTopics.length === 1 ? "topic" : "topics"}
          </span>
        </div>

        {/* Visual Topic Accuracy vs 80% Mastery Benchmark */}
        {sortedTopics.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Topic Accuracy vs. 80% Mastery Benchmark
                </h3>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  &lt;50% Critical
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  50–79% Polish
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  ≥80% Mastered
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {sortedTopics.slice(0, 6).map((topic: TopicMastery, idx: number) => {
                const acc = Math.max(0, Math.min(100, topic.accuracyPercentage));
                const isAdequate = topic.attemptsCount >= 5;
                const barColor =
                  acc >= 80 ? "bg-emerald-500" : acc >= 50 ? "bg-amber-500" : "bg-rose-500";
                return (
                  <div key={`bench-${topic.chapter}`} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 max-w-[75%] min-w-0">
                        {isAdequate && idx < 3 && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700 shrink-0">
                            #{idx + 1}
                          </span>
                        )}
                        <span className="font-medium text-slate-800 truncate" title={topic.chapter}>
                          {topic.chapter}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal shrink-0">
                          ({topic.attemptsCount} Qs)
                        </span>
                      </div>
                      <span className="font-mono font-semibold text-slate-700 tabular-nums">
                        {topic.accuracyPercentage}%
                      </span>
                    </div>

                    {/* Relative Bar Container with 80% guideline */}
                    <div className="relative w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      {/* Target 80% benchmark line */}
                      <div
                        className="absolute top-0 bottom-0 w-[2px] bg-slate-400 z-10"
                        style={{ left: "80%" }}
                        title="80% Mastery benchmark"
                      />
                      {/* Accuracy fill */}
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${acc}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end text-[10px] text-slate-400 font-mono pr-0.5">
              <span>Dashed guideline indicates 80% NTA mastery target</span>
            </div>
          </div>
        )}

        {sortedTopics.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              No weak topics detected. Take more mock tests to calibrate your diagnosis.
            </p>
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
            >
              Take a mock test
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="hidden sm:table w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 pr-4">Topic</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4 text-left">Accuracy</th>
                  <th className="py-3 px-4 text-right">Questions</th>
                  <th className="py-3 px-4 text-center">Trend</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedTopics.map((topicItem: TopicMastery, idx: number) => {
                  const diag = getOrGenerateDiagnosis(topicItem);
                  const isRepairing = activeRepairTopic === (topicItem.troubleTopics?.[0] || topicItem.chapter);
                  const accuracy = diag.observedPerformance.accuracyPercentage;
                  const attempts = diag.observedPerformance.attemptsCount;
                  const isAdequate = attempts >= 5;
                  const isTopPriority = isAdequate && idx < 3;
                  const statusInfo = getTopicStatus(accuracy, attempts);

                  return (
                    <tr
                      key={topicItem.chapter}
                      onClick={() => setSelectedModalDiagnosis(diag)}
                      className="h-12 border-b border-slate-100 text-xs sm:text-sm hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 pr-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          {isTopPriority && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 whitespace-nowrap">
                              #{idx + 1} Priority
                            </span>
                          )}
                          <span className="group-hover:text-blue-600 transition-colors">
                            {diag.chapter}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {diag.subject}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="tabular-nums text-slate-900 font-bold w-8 text-right">
                            {accuracy}%
                          </span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                            <div
                              className={`h-full rounded-full ${
                                accuracy >= 80
                                  ? "bg-emerald-500"
                                  : accuracy >= 50
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                              }`}
                              style={{ width: `${Math.min(100, Math.max(4, accuracy))}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-slate-600 font-medium">
                        {attempts}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {attempts < 10 ? (
                          <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            New
                          </span>
                        ) : accuracy >= 75 ? (
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                            <TrendingUp className="w-3.5 h-3.5" /> Up
                          </span>
                        ) : accuracy < 50 ? (
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-600">
                            <TrendingDown className="w-3.5 h-3.5" /> Down
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-slate-400">
                            <Minus className="w-3.5 h-3.5" /> Flat
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-lg border ${statusInfo.badgeClass}`}
                          title={statusInfo.ruleTooltip}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-3 pl-4 text-right whitespace-nowrap">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Link
                            href={`/dashboard/notes/${normalizeSubject(topicItem.subject).key}`}
                            className="inline-flex items-center justify-center h-8 px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
                            title="Read high-yield NCERT revision notes"
                          >
                            <BookOpen className="w-3.5 h-3.5 mr-1 text-sky-600" />
                            Notes
                          </Link>
                          <button
                            type="button"
                            disabled={isRepairing}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLaunchTargetedPractice(
                                topicItem.troubleTopics?.[0] || topicItem.chapter,
                                topicItem.subject,
                                diag.recommendedPracticeType
                              );
                            }}
                            className="inline-flex items-center justify-center h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors cursor-pointer disabled:opacity-50 shadow-2xs"
                          >
                            {isRepairing ? "Building..." : "Practice"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Mobile Collapsed Cards (<640px) */}
            <div className="sm:hidden space-y-3">
              {sortedTopics.map((topicItem: TopicMastery, idx: number) => {
                const diag = getOrGenerateDiagnosis(topicItem);
                const isRepairing = activeRepairTopic === (topicItem.troubleTopics?.[0] || topicItem.chapter);
                const accuracy = diag.observedPerformance.accuracyPercentage;
                const attempts = diag.observedPerformance.attemptsCount;
                const isAdequate = attempts >= 5;
                const isTopPriority = isAdequate && idx < 3;
                const statusInfo = getTopicStatus(accuracy, attempts);

                return (
                  <div
                    key={`mob-${topicItem.chapter}`}
                    onClick={() => setSelectedModalDiagnosis(diag)}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-white shadow-2xs space-y-2.5 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isTopPriority && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                              #{idx + 1}
                            </span>
                          )}
                          <h3 className="text-sm font-bold text-slate-900 truncate">
                            {diag.chapter}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">
                          {diag.subject} • {attempts} questions
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg border shrink-0 ${statusInfo.badgeClass}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="tabular-nums text-slate-700 font-bold">Accuracy: {accuracy}%</span>
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${accuracy >= 80 ? "bg-emerald-500" : accuracy >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                            style={{ width: `${Math.min(100, Math.max(5, accuracy))}%` }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={isRepairing}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunchTargetedPractice(
                            topicItem.troubleTopics?.[0] || topicItem.chapter,
                            topicItem.subject,
                            diag.recommendedPracticeType
                          );
                        }}
                        className="h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-2xs"
                      >
                        {isRepairing ? "..." : "Practice"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. STRENGTHS SECTION ("WHAT YOU'RE GOOD AT") (SECTION 19) */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              WHAT YOU&apos;RE GOOD AT (CORE STRENGTHS)
            </h2>
          </div>
          <span className="text-[11px] font-semibold uppercase text-emerald-700 font-mono">
            {strengthList.length} Mastered Topic{strengthList.length === 1 ? "" : "s"}
          </span>
        </div>

        {strengthList.length === 0 ? (
          <p className="text-xs text-slate-500 font-medium italic">
            Complete more question attempts to establish verified core strengths (≥75% accuracy threshold).
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {strengthList.map((st) => (
              <div key={st.chapter} className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{st.chapter}</span>
                  <span className="font-mono font-bold text-xs text-emerald-700">{st.accuracyPercentage}%</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">
                  Tested across {st.attemptsCount} verified questions.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Maintain with 5–10 mixed practice questions per week.</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        </div>
      )}
      {/* 6. FULL TOPIC DIAGNOSIS MODAL (SECTION 20) */}
      {selectedModalDiagnosis &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-slate-100 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl my-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{selectedModalDiagnosis.chapter}</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {selectedModalDiagnosis.subject}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono font-medium">{selectedModalDiagnosis.ncertReference}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModalDiagnosis(null)}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Modal Content Sections */}
              <div className="space-y-6 text-xs">
                {/* 1. TOPIC OVERVIEW */}
                <div className="p-5 rounded-2xl border border-slate-200/60 bg-slate-50 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">TOPIC OVERVIEW</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                      {selectedModalDiagnosis.evidenceThresholdLabel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans font-medium">Accuracy</span>
                      <span className="text-base font-bold text-slate-900">{selectedModalDiagnosis.observedPerformance.accuracyPercentage}%</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans font-medium">Attempts</span>
                      <span className="text-base font-bold text-slate-900">{selectedModalDiagnosis.observedPerformance.attemptsCount}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans font-medium">Target Accuracy</span>
                      <span className="text-base font-bold text-emerald-600">≥80%</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex flex-col justify-between items-center overflow-hidden">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans font-medium">Confidence</span>
                      <span
                        className={`inline-block px-2 py-0.5 mt-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight text-center max-w-full truncate ${
                          selectedModalDiagnosis.diagnosticConfidence === "HIGH"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : selectedModalDiagnosis.diagnosticConfidence === "MEDIUM"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : selectedModalDiagnosis.diagnosticConfidence === "LOW"
                            ? "bg-slate-100 text-slate-700 border border-slate-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                        title={selectedModalDiagnosis.diagnosticConfidence.replace(/_/g, " ")}
                      >
                        {selectedModalDiagnosis.diagnosticConfidence === "INSUFFICIENT_EVIDENCE"
                          ? "Limited Data"
                          : selectedModalDiagnosis.diagnosticConfidence}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-slate-600">{selectedModalDiagnosis.confidenceRationale}</p>
                </div>

                {/* CONDITIONAL CONTENT: LIMITED DATA (<5 attempts) VS ESTABLISHED DIAGNOSIS */}
                {selectedModalDiagnosis.observedPerformance.attemptsCount < 5 ? (
                  <div className="p-6 rounded-2xl border border-amber-200/60 bg-amber-50/50 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center mx-auto text-amber-700 shadow-xs">
                      <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900">LIMITED DATA TELEMETRY</h4>
                      <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
                        Not enough evidence to diagnose a weakness yet. You have only solved{" "}
                        <span className="font-bold text-slate-900">{selectedModalDiagnosis.observedPerformance.attemptsCount}</span> question
                        {selectedModalDiagnosis.observedPerformance.attemptsCount === 1 ? "" : "s"} in this topic (need at least 5 to detect patterns).
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto font-mono text-center pt-2">
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-sans">Accuracy</span>
                        <span className="text-sm font-bold text-slate-900">{selectedModalDiagnosis.observedPerformance.accuracyPercentage}%</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-sans">Attempts</span>
                        <span className="text-sm font-bold text-slate-900">{selectedModalDiagnosis.observedPerformance.attemptsCount}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-sans">Target Accuracy</span>
                        <span className="text-sm font-bold text-emerald-600">≥80%</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-500 uppercase block font-sans">Needed Qs</span>
                        <span className="text-sm font-bold text-blue-600">
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
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow inline-flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Practice 5 Questions</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* 2. PRIMARY DIAGNOSIS & CONTRIBUTING FACTOR */}
                    <div className="p-5 rounded-2xl border border-slate-200/60 bg-white space-y-3.5 shadow-xs">
                      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 pb-2.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          EVALUATION TAXONOMY
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200/80">
                          {renderProblemClassificationBadge(selectedModalDiagnosis.problemClassification)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 space-y-1">
                          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                            PRIMARY PATTERN:
                          </span>
                          <span className="text-sm font-bold text-slate-900 block">
                            {selectedModalDiagnosis.primaryDiagnosis}
                          </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                            CONTRIBUTING PATTERN:
                          </span>
                          <span className="text-sm font-semibold text-slate-700 block">
                            {selectedModalDiagnosis.contributingFactor || "Isolated Topic Variation"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3. EVIDENCE BEHIND THIS DIAGNOSIS */}
                    <div className="p-4.5 rounded-2xl border border-slate-200/60 bg-slate-50 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>WHY WE THINK THIS (EVIDENCE BEHIND THIS DIAGNOSIS)</span>
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium text-xs">
                        {selectedModalDiagnosis.evidenceList.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. WHAT TO DO NOW (REPAIR ACTION) + START REPAIR */}
                    <div className="p-5 rounded-2xl border border-amber-200/80 bg-amber-50/50 space-y-3.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
                          <span>WHAT TO DO NOW (REPAIR ACTION)</span>
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                          Est. Time: 6–8 Mins
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        <div className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200/80">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                          <span className="font-semibold text-slate-800">Review formula / core NCERT principle</span>
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200/80">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                          <span className="font-semibold text-slate-800">Eliminate qualifying keyword traps (&apos;NOT/EXCEPT&apos;)</span>
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200/80">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                          <span className="font-semibold text-slate-800">Execute 5-question targeted adaptive drill</span>
                        </div>
                        <div className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-slate-200/80">
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                          <span className="font-semibold text-slate-800">Reach ≥80% on the targeted drill to continue.</span>
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
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>START TARGETED REPAIR DRILL</span>
                        </button>
                      </div>
                    </div>

                    {/* 5. DETAILED EXPLANATION (WHAT THE DATA SUGGESTS) */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">DETAILED EXPLANATION (WHAT THE DATA SUGGESTS)</h3>
                      <div className="p-4 rounded-2xl border border-slate-200/60 bg-slate-50 text-xs font-medium text-slate-700 leading-relaxed space-y-1.5">
                        <p>{selectedModalDiagnosis.interpretation}</p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Primary breakdown localized to {selectedModalDiagnosis.weakSubtopics?.[0]?.name || selectedModalDiagnosis.chapter}.
                        </p>
                      </div>
                    </div>

                    {/* 6. WHAT TO STUDY & DECISION TREE (HOW TO STUDY) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 space-y-2">
                        <h4 className="font-bold text-emerald-800 uppercase text-[11px]">WHAT TO STUDY</h4>
                        <ul className="list-disc pl-4 space-y-1 font-medium text-slate-700">
                          {selectedModalDiagnosis.remediationPlan.step1Rebuild.topicsToReview.map((t, i) => {
                            const isHeader = t.startsWith("FOCUS FIRST:") || t.startsWith("THEN SECONDARY:");
                            return isHeader ? (
                              <li key={i} className="list-none font-bold text-slate-900 pt-1.5 -ml-4 tracking-wider text-[10px] uppercase">
                                {t}
                              </li>
                            ) : (
                              <li key={i}>{t}</li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/60 space-y-2">
                        <h4 className="font-bold text-blue-800 uppercase text-[11px]">HOW TO STUDY (DECISION TREE)</h4>
                        <ol className="list-decimal pl-4 space-y-1 font-medium text-slate-700">
                          {selectedModalDiagnosis.remediationPlan.step2DecisionFramework.checklist.map((c, i) => (
                            <li key={i}>{c.replace(/^\d+[\.\)]\s*/, "").replace(/^Step\s*\d+:\s*/i, "")}</li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* 7. EXAM TACTICS & COMMON TRAPS */}
                    {selectedModalDiagnosis.examTactic && (
                      <div className="p-4.5 rounded-2xl border border-amber-200/70 bg-amber-50/50 space-y-2">
                        <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider">EXAM TACTICS &amp; COMMON TRAPS</h3>
                        <p className="font-semibold text-slate-900">QUICK METHOD: {selectedModalDiagnosis.examTactic.quickMethod}</p>
                        <p className="font-medium text-slate-700">FULL METHOD: {selectedModalDiagnosis.examTactic.fullMethod}</p>
                        <p className="font-semibold text-rose-600">CAUTION: {selectedModalDiagnosis.examTactic.caution}</p>
                        {selectedModalDiagnosis.commonTrap && (
                          <p className="text-[11px] text-slate-600 font-medium pt-1.5 border-t border-amber-200/60">
                            <strong>Common Trap:</strong> {selectedModalDiagnosis.commonTrap}
                          </p>
                        )}
                      </div>
                    )}

                    {/* 8. MISTAKE HISTORY (YOUR RECENT MISTAKES) */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span>YOUR RECENT MISTAKES (ACTUAL QUESTION HISTORY)</span>
                        </h3>
                        {selectedModalDiagnosis.recordedMistakes && selectedModalDiagnosis.recordedMistakes.length > 0 && (
                          <span className="text-[10px] font-semibold uppercase text-rose-600 font-mono">
                            {selectedModalDiagnosis.recordedMistakes.length} Logged
                          </span>
                        )}
                      </div>

                      {selectedModalDiagnosis.recordedMistakes && selectedModalDiagnosis.recordedMistakes.length > 0 ? (
                        <div className="space-y-2.5">
                          {selectedModalDiagnosis.recordedMistakes.slice(0, 4).map((m, idx) => (
                            <RenderMistakeItem
                              key={idx}
                              mistake={m}
                              idx={idx}
                              onWhyWrong={(item) =>
                                setSelectedMistakeForExplanation({
                                  questionId: item.questionId || `q_${idx + 1}`,
                                  prompt: item.prompt,
                                  options: item.options || [],
                                  selectedOption: item.userAnswer,
                                  correctOption: item.correctAnswer,
                                  subject: selectedModalDiagnosis.subject,
                                  chapter: selectedModalDiagnosis.chapter,
                                  explanation: item.explanation,
                                  source: item.source,
                                  reviewed_by_human: item.reviewed_by_human,
                                  timeSpentSeconds: item.timeSpentSeconds,
                                })
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl border border-slate-200/60 bg-slate-50 text-center text-slate-500 font-medium text-xs">
                          Detailed question attempt history is unavailable for this topic. Complete a full CBT mock to log question-level telemetry.
                        </div>
                      )}
                    </div>

                    {/* 9. REPAIR PLAN PROGRESSION (EVENT-DRIVEN: PHASE 1 ITEM 8) */}
                    <div className="p-5 rounded-2xl border border-slate-200/60 bg-white space-y-3.5 shadow-xs">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
                          <Target className="w-4 h-4 text-blue-600" />
                          <span>EVENT-DRIVEN REPAIR PLAN</span>
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                          Stage: {topicRepairState?.currentStage || "NOT_STARTED"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                        {/* Phase 1 */}
                        <div
                          className={`p-3 rounded-xl border space-y-1 ${
                            topicRepairState?.step1.status === "completed"
                              ? "border-emerald-200 bg-emerald-50/60"
                              : "border-slate-200/60 bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-700">① CONCEPT REVIEW</span>
                            <span
                              className={`text-[10px] font-bold uppercase font-mono ${
                                topicRepairState?.step1.status === "completed"
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step1.status === "completed" ? "Done" : "Pending"}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            NCERT core definitions &amp; distinctions reviewed.
                          </p>
                          {topicRepairState?.step1.status !== "completed" && (
                            <button
                              type="button"
                              onClick={() => handleMarkConceptReviewed(selectedModalDiagnosis.chapter)}
                              className="mt-1 px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold transition-all cursor-pointer"
                            >
                              Mark Reviewed
                            </button>
                          )}
                        </div>

                        {/* Phase 2 */}
                        <div
                          className={`p-3 rounded-xl border space-y-1 ${
                            topicRepairState?.step2.status === "completed"
                              ? "border-emerald-200 bg-emerald-50/60"
                              : topicRepairState?.step2.status === "active"
                              ? "border-amber-200/80 bg-amber-50/60"
                              : "border-slate-200/60 bg-slate-50 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-700">② GUIDED DRILL</span>
                            <span
                              className={`text-[10px] font-bold uppercase font-mono ${
                                topicRepairState?.step2.status === "completed"
                                  ? "text-emerald-600"
                                  : topicRepairState?.step2.status === "active"
                                  ? "text-amber-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step2.status === "completed"
                                ? "Done"
                                : topicRepairState?.step2.status === "active"
                                ? "Active"
                                : "Pending"}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            5 targeted adaptive questions on weak patterns.
                          </p>
                        </div>

                        {/* Phase 3 */}
                        <div
                          className={`p-3 rounded-xl border space-y-1 ${
                            topicRepairState?.step3.status === "completed"
                              ? "border-emerald-200 bg-emerald-50/60"
                              : topicRepairState?.step3.status === "active"
                              ? "border-amber-200/80 bg-amber-50/60"
                              : "border-slate-200/60 bg-slate-50 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-700">③ TIMED RETEST</span>
                            <span
                              className={`text-[10px] font-bold uppercase font-mono ${
                                topicRepairState?.step3.status === "completed"
                                  ? "text-emerald-600"
                                  : topicRepairState?.step3.status === "active"
                                  ? "text-amber-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step3.status === "completed"
                                ? "Done"
                                : topicRepairState?.step3.status === "active"
                                ? "Active"
                                : "Pending"}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            10 Qs at expected pace.
                          </p>
                        </div>

                        {/* Phase 4 */}
                        <div
                          className={`p-3 rounded-xl border space-y-1 ${
                            topicRepairState?.step4.status === "completed"
                              ? "border-emerald-200 bg-emerald-50/60"
                              : "border-slate-200/60 bg-slate-50 opacity-60"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-700">④ RECOVERY CHECK</span>
                            <span
                              className={`text-[10px] font-bold uppercase font-mono ${
                                topicRepairState?.step4.status === "completed"
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step4.status === "completed" ? "Done" : "Pending"}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight">
                            Verified only when ≥80% accuracy over 10+ attempts.
                          </p>
                        </div>
                      </div>

                      {/* Measurable Recovery Verdict */}
                      <div className="p-3 rounded-xl border border-slate-200/60 bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center justify-between gap-2">
                        <span>Recovery Status:</span>
                        <span className="font-mono text-slate-900 inline-flex items-center gap-1.5">
                          {topicRepairState?.isRecovered ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>RECOVERED (≥80% accuracy across 10+ attempts verified)</span>
                            </>
                          ) : (
                            "Validation incomplete — more evidence required"
                          )}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Modal Action CTA */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedModalDiagnosis(null)}
                    className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
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
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
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

      {/* Why Did I Get This Wrong Deep Explanation Modal (Portal) */}
      {isClient &&
        selectedMistakeForExplanation &&
        typeof document !== "undefined" &&
        createPortal(
          <WhyWrongExplanationModal
            question={selectedMistakeForExplanation}
            onClose={() => setSelectedMistakeForExplanation(null)}
          />,
          document.body
        )}

      {/* Grounded Doubt Solver Drawer (Portal) */}
      {isClient &&
        typeof document !== "undefined" &&
        createPortal(
          <DoubtSolverDrawer
            isOpen={isDoubtDrawerOpen}
            onClose={() => setIsDoubtDrawerOpen(false)}
            studentContext={{
              subject:
                selectedRadarSubject === "all"
                  ? attemptedSubjectNames[0] || "Domain Overview"
                  : candidateSubjectCalibrations.find((c) => c.subjectKey === selectedRadarSubject)?.subject || "Domain",
              weakTopics: weaknessRadar.map((w) => w.chapter),
              strongTopics: strengthList.map((s) => s.chapter),
              recentMistakes: cleanTestAttempts.flatMap((t) =>
                (t.questions || [])
                  .filter((q) => q.isCorrect === false)
                  .map((q) => ({
                    prompt: q.prompt,
                    userAnswer: q.selectedOption,
                    correctAnswer: q.correctOption,
                    chapter: q.chapter,
                  }))
              ),
            }}
          />,
          document.body
        )}

      {/* Weekly Performance Report Modal (Portal) */}
      {isClient &&
        isWeeklyReportOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <WeeklyReportModal
            report={generateWeeklyReportData({
              studentName: storeUser?.name || initialData.user.fullName || "Student",
              streakDays: storeUser?.currentStreak || initialData.user.currentStreak || 1,
              testAttempts: cleanTestAttempts,
              weaknessRadar,
              strengthList,
            })}
            onClose={() => setIsWeeklyReportOpen(false)}
          />,
          document.body
        )}

      {/* Spaced Repetition Review Modal (Portal) */}
      {isClient &&
        isSpacedModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <SpacedRepetitionModal
            isOpen={isSpacedModalOpen}
            onClose={() => setIsSpacedModalOpen(false)}
            userId={storeUser?.id || initialData.user.id}
            onLaunchCBTDrill={(dueItems) => {
              setIsSpacedModalOpen(false);
              const formattedQuestions = dueItems.map((item, idx) => ({
                id: item.questionId,
                questionNumber: idx + 1,
                subject: item.subject,
                chapter: item.chapter,
                topic: item.chapter,
                microTopic: item.microTopic || item.chapter,
                questionText: item.prompt,
                prompt: item.prompt,
                options: (item.options || []).map((o) => ({ id: o.id, text: o.text })),
                correctOptionId: item.correctOption,
                difficulty: "medium",
                explanation: item.explanation,
              }));

              const testId = `spaced_repetition_${Date.now()}`;
              initTest(
                testId,
                {
                  id: testId,
                  title: "Spaced Repetition Review Drill",
                  subject: dueItems[0]?.subject || "Domain",
                  code: "CUET-SR",
                  totalQuestions: dueItems.length,
                  durationMinutes: Math.max(3, Math.ceil(dueItems.length * 1.5)),
                  practiceType: "drill",
                  targetChapter: dueItems[0]?.chapter || "Spaced Review",
                },
                formattedQuestions as any
              );
              router.push(`/test/${testId}`);
            }}
          />,
          document.body
        )}
    </div>
  );
}
