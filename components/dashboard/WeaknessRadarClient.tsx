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
  Lock,
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
import { DiagnosticCycle } from "@/types/cycle";
import { SubjectRadarAIAnalysis, SubjectRadarAIPayload } from "@/types/subject-ai";
import { getSubjectMetadata, getTopicDiagnosticState } from "@/lib/config/dashboardConfig";
import { deriveTopicRepairPlan, recordRepairEvent, TopicRepairState } from "@/lib/repair-plan";
import { enrollMissedQuestion, getSpacedRepetitionSummary } from "@/lib/spaced-repetition";
import { generateWeeklyReportData } from "@/lib/weekly-report-engine";
import { WhyWrongExplanationModal } from "@/components/dashboard/WhyWrongExplanationModal";
import { DoubtSolverDrawer } from "@/components/dashboard/DoubtSolverDrawer";
import { WeeklyReportModal } from "@/components/dashboard/WeeklyReportModal";
import { DailyStudyPlanCard } from "@/components/dashboard/DailyStudyPlanCard";
import { RetentionLeaderboardCard } from "@/components/dashboard/RetentionLeaderboardCard";
import { HelpCircle, ShieldCheck } from "lucide-react";

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
          <span className="font-bold text-rose-600 text-[11px]">❌ Question #{idx + 1}</span>
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
                    Your Choice ✗
                  </span>
                )}
                {isCorr && (
                  <span className="text-[10px] uppercase font-bold text-emerald-700 shrink-0 font-mono px-1.5 py-0.5 rounded bg-emerald-100">
                    Correct ✓
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
  const [expandedChapterKey, setExpandedChapterKey] = useState<string | null>(null);
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
  const [topicRepairState, setTopicRepairState] = useState<TopicRepairState | null>(null);

  // In-flight request controller and fingerprint cache to avoid duplicate/stuck fetches
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const lastFingerprintRef = React.useRef<string>("");

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

  const subjectCalibrationMap =
    isClient &&
    clientAnalytics?.subjectCalibration &&
    Object.keys(clientAnalytics.subjectCalibration).length > 0
      ? clientAnalytics.subjectCalibration
      : initialData.subjectCalibration || {};

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

  // Exact cycle calculation: 150 qualifying questions per cycle
  // Fixes Cycle 2: 150/150 bug
  const completedCycleCount = diagnosticCycles.filter((c) => c.status === "completed").length;
  const currentCycleNumber = completedCycleCount + 1;
  const effectiveCycleQuestionCount =
    completedCycleCount > 0
      ? (totalAttempted % 150)
      : Math.min(150, totalAttempted);

  const isCurrentCycleComplete = totalAttempted >= 150 && completedCycleCount >= 1;
  const isCalibrationLocked = totalAttempted < 150;

  // Session-level pacing pattern alert (Phase 1 Item 11)
  const sessionPacingAlert = React.useMemo(() => {
    if (!weaknessRadar || weaknessRadar.length === 0) return null;
    const fastTopics = weaknessRadar.filter(
      (t) => (t.avgTimeSeconds || 0) > 0 && (t.avgTimeSeconds || 0) < 15
    );
    const ratio = fastTopics.length / weaknessRadar.length;
    if (ratio >= 0.5) {
      const avgSec = Math.round(
        fastTopics.reduce((s, t) => s + (t.avgTimeSeconds || 0), 0) / fastTopics.length
      );
      return {
        avgSec,
        title: "Session Pacing Observation",
        message: `You answered in about ${avgSec}s per question across most weak topics. Slow down and read every option carefully before selecting.`,
      };
    }
    return null;
  }, [weaknessRadar]);

  // Synchronize missed questions with spaced repetition
  useEffect(() => {
    if (isClient && cleanTestAttempts.length > 0) {
      const uId = storeUser?.id || initialData.user.id;
      cleanTestAttempts.forEach((t) => {
        if (t.isLowEffort) return; // Skip low effort
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
        currentCycleQuestionCount: 150,
        resolvedWeaknesses: diagnosticCycles.flatMap((c) => c.comparison?.resolved.map((r) => r.name) || []),
        recurringWeaknesses: diagnosticCycles.flatMap((c) => c.comparison?.recurringWeak.map((r) => r.name) || []),
      },
    };

    // Calculate a stable deterministic fingerprint to prevent duplicate in-flight requests
    const currentFingerprint = `${selectedRadarSubject}:${subAttempted}:${subAccuracy}:${currentCycleNumber}:150:${weaknessRadar.length}`;
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
    candidateSubjects,
    candidateSubjectCalibrations,
    testAttempts,
    storeUser?.id,
    initialData.user.id,
    weaknessRadar,
    currentCycleNumber,
    diagnosticCycles,
    aiAnalysis,
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
      {/* 1. TOP HEADER & NAVIGATION */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all shadow-xs"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Diagnostic &amp; Remediation Engine</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                Weakness Radar
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-10">
            Root-cause analysis, error taxonomy, exam tactics, and adaptive remediation plans for your CUET domain subjects.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Doubt Solver Drawer CTA */}
          <button
            type="button"
            onClick={() => setIsDoubtDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Brain className="w-4 h-4 text-purple-600" />
            <span>Ask Doubt Solver</span>
          </button>

          {/* Weekly Report CTA */}
          <button
            type="button"
            onClick={() => setIsWeeklyReportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Weekly Report</span>
          </button>

          {/* Cycle Badge Indicator */}
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left font-mono">
              <span className="text-[10px] font-bold uppercase text-emerald-800 block tracking-wider">
                DIAGNOSTIC CYCLE {currentCycleNumber}
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                {effectiveCycleQuestionCount} / 150 QUESTIONS
              </span>
            </div>
          </div>

          {/* Cycle History Selector */}
          <CycleHistorySelector
            currentCycleNumber={currentCycleNumber}
            currentCycleQuestionCount={effectiveCycleQuestionCount}
            diagnosticCycles={diagnosticCycles}
            onSelectCycle={(cycle) => setSelectedCycleForReport(cycle)}
          />

          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Take Full CBT Mock</span>
          </Link>
        </div>
      </div>

      {/* Session Pacing Behavior Alert (Phase 1 Item 11 & 12) */}
      {sessionPacingAlert && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px] block">
                {sessionPacingAlert.title}
              </span>
              <p className="text-amber-800 font-medium">
                {sessionPacingAlert.message}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-amber-200/70 text-amber-900 shrink-0">
            Avg {sessionPacingAlert.avgSec}s / question
          </span>
        </div>
      )}

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
                <span>{remainingQuestions} questions remaining</span>
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

              {diagnosticCycles.length > 0 && diagnosticCycles[diagnosticCycles.length - 1] && (
                <button
                  type="button"
                  onClick={() => setSelectedCycleForReport(diagnosticCycles[diagnosticCycles.length - 1] || null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>VIEW CYCLE {diagnosticCycles[diagnosticCycles.length - 1]?.cycleNumber} ANALYSIS</span>
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
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold uppercase tracking-wider font-mono inline-block">
              🎯 DIAGNOSTIC CYCLE {currentCycleNumber} COMPLETE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-mono">
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
                ✓ 150-QUESTION DIAGNOSTIC ANALYSIS COMPLETE
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
                  {prioritizedCandidate.accuracyPercentage}% Accuracy · {prioritizedCandidate.attemptsCount} Attempts
                  {prioritizedCandidate.avgTimeSeconds ? ` · Avg response time: ${prioritizedCandidate.avgTimeSeconds}s / Q` : ""}
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

              <button
                type="button"
                onClick={() => setSelectedModalDiagnosis(nextActionDiagnosis)}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Diagnosis</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. REAL DIAGNOSTIC SUMMARY DASHBOARD REPORT (SECTIONS 18 & 25) */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              YOUR CURRENT DIAGNOSTIC SUMMARY
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 font-mono">
            {totalAttempted} Questions Analyzed Across {completedTestsCount} Mock{completedTestsCount === 1 ? "" : "s"}
          </span>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overall Accuracy</span>
            <p className="text-2xl font-bold text-slate-900 font-mono">{summaryReport.overallAccuracy}%</p>
            <p className="text-[11px] text-slate-500 font-medium">{totalAttempted} Total Attempts</p>
          </div>

          <div
            className={`p-4 rounded-2xl space-y-1 ${
              summaryReport.strongestArea
                ? "bg-emerald-50/60 border border-emerald-100"
                : "bg-slate-50 border border-slate-200/70"
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                summaryReport.strongestArea ? "text-emerald-700" : "text-slate-500"
              }`}
            >
              Strongest Domain
            </span>
            <p
              className="text-sm font-bold text-slate-900 break-words line-clamp-2"
              title={summaryReport.strongestArea ? summaryReport.strongestArea.topic : "Pending Calibration"}
            >
              {summaryReport.strongestArea ? summaryReport.strongestArea.topic : "Pending Calibration"}
            </p>
            <p
              className={`text-[11px] font-medium ${
                summaryReport.strongestArea ? "text-emerald-800/80" : "text-slate-500"
              }`}
            >
              {summaryReport.strongestArea ? `${summaryReport.strongestArea.accuracy}% accuracy` : "Requires ≥5 attempts in topic"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Primary Weakness</span>
            <p
              className="text-sm font-bold text-slate-900 break-words line-clamp-2"
              title={summaryReport.biggestWeakness ? summaryReport.biggestWeakness.topic : "None Detected"}
            >
              {summaryReport.biggestWeakness ? summaryReport.biggestWeakness.topic : "None Detected"}
            </p>
            <p className="text-[11px] text-rose-800/80 font-medium">
              {summaryReport.biggestWeakness ? `${summaryReport.biggestWeakness.accuracy}% accuracy` : "Maintain practice pace"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
              {summaryReport.pacingLabel || "Response Pattern"}
            </span>
            <p className="text-xs font-bold text-slate-900 line-clamp-2">{summaryReport.pacingIssue}</p>
          </div>
        </div>

        {/* Priority Action Highlight */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">Priority Action Before Next Mock:</span>
            <p className="text-slate-700 font-medium">{summaryReport.priorityAction}</p>
          </div>
        </div>
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

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <SubjectIcon name={sub.icon} className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-600"}`} />
                <span>{sub.subject}</span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-700"
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
        onRefresh={() => fetchSubjectAIAnalysis(true)}
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
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Diagnosed Weak Areas</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold font-mono">
              {weaknessRadar.length} Topic{weaknessRadar.length === 1 ? "" : "s"}
            </span>
          </h2>
        </div>

        {weaknessRadar.length === 0 ? (
          <div className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto stroke-[2.5]" />
            <div className="space-y-1">
              <p className="text-base font-bold text-slate-900">No Critical Weaknesses Detected</p>
              <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                Your performance across tested questions is solid. Continue solving full CBT mocks to unlock deeper micro-topic analysis as sample size grows.
              </p>
            </div>
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
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
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md"
              >
                {/* Topic Card Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 space-y-3.5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                          {diag.chapter}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {diag.subject}
                        </span>

                        {/* Canonical Diagnostic State Badge (Phase 1 Item 6) */}
                        {(() => {
                          const topicState = getTopicDiagnosticState(topicItem);
                          const badgeColorClass =
                            topicState.color === "red"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : topicState.color === "amber"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : topicState.color === "green"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-700 border-slate-200";

                          return (
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeColorClass}`}
                            >
                              {topicState.badgeLabel} ({diag.observedPerformance.accuracyPercentage}%)
                            </span>
                          );
                        })()}

                        {/* Pipeline Stage Badge */}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                          {diag.remediationStage || topicItem.remediationStage || "DETECTED"}
                        </span>

                        {/* Problem Type: Classification Badge */}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200/80">
                          {renderProblemClassificationBadge(diag.problemClassification)}
                        </span>
                      </div>

                      {/* Primary Diagnosis & Contributing Factor */}
                      <div className="flex items-center gap-2 flex-wrap text-xs pt-0.5">
                        <div className="px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-100 font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                          <span className="text-[10px] text-rose-600 uppercase tracking-wider">PRIMARY PATTERN:</span>
                          <span>{diag.primaryDiagnosis}</span>
                        </div>
                        {diag.contributingFactor && (
                          <div className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/60 font-medium text-slate-700 text-[11px] flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">CONTRIBUTING PATTERN:</span>
                            <span>{diag.contributingFactor}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 font-medium">
                        Evidence: {diag.observedPerformance.attemptsCount} attempted · {diag.observedPerformance.incorrectCount} incorrect · Avg Response: {diag.observedPerformance.avgTimeSeconds}s ({getSubjectMetadata(diag.subject).expectedPaceText})
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedModalDiagnosis(diag)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
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
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{isRepairing ? "Building Drill..." : diag.observedPerformance.attemptsCount < 5 ? "Practice 5 Questions" : "Start Repair Plan"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleChapterExpand(topicItem.chapter)}
                        className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                        aria-label={isExpanded ? "Collapse card" : "Expand card"}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 stroke-[2.5]" /> : <ChevronDown className="w-4 h-4 stroke-[2.5]" />}
                      </button>
                    </div>
                  </div>

                  {/* Primary Issue Summary */}
                  <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs space-y-1">
                    <span className="font-bold text-rose-600 uppercase tracking-wider text-[10px] block">
                      PRIMARY DIAGNOSED ISSUE:
                    </span>
                    <p className="text-slate-700 font-medium">{diag.specificWeakness}</p>
                  </div>
                </div>

                {/* Collapsible / Expandable Details */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-white space-y-5">
                    {/* SECTION: EVIDENCE BEHIND THIS DIAGNOSIS */}
                    <div className="p-4.5 rounded-2xl border border-slate-200/60 bg-slate-50 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>WHY WE THINK THIS (EVIDENCE BEHIND THIS DIAGNOSIS)</span>
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 font-medium">
                        {diag.evidenceList.map((ev, i) => (
                          <li key={i}>{ev}</li>
                        ))}
                      </ul>
                    </div>

                    {/* SECTION: WHY YOU'RE LOSING MARKS (SECTION 7) */}
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>WHY YOU&apos;RE LOSING MARKS (ERROR TAXONOMY)</span>
                      </h3>

                      {diag.errorTaxonomy.percentages ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {Object.entries(diag.errorTaxonomy.percentages)
                            .filter(([_, pct]) => pct > 0)
                            .map(([cat, pct]) => (
                              <div key={cat} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center space-y-0.5">
                                <span className="text-[10px] font-medium text-slate-500 block truncate">{cat}</span>
                                <span className="text-base font-bold text-slate-900 font-mono">{pct}%</span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1.5">
                          <span className="font-semibold text-slate-700 block">Error Distribution (Counts from {diag.errorTaxonomy.totalErrors} total errors):</span>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {diag.errorTaxonomy.conceptualGapCount > 0 && (
                              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700">
                                Conceptual: {diag.errorTaxonomy.conceptualGapCount} error{diag.errorTaxonomy.conceptualGapCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.applicationGapCount > 0 && (
                              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700">
                                Application: {diag.errorTaxonomy.applicationGapCount} error{diag.errorTaxonomy.applicationGapCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.calculationCount > 0 && (
                              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700">
                                Calculation: {diag.errorTaxonomy.calculationCount} error{diag.errorTaxonomy.calculationCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.distractorTrapCount > 0 && (
                              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700">
                                Distractor Trap: {diag.errorTaxonomy.distractorTrapCount} error{diag.errorTaxonomy.distractorTrapCount > 1 ? "s" : ""}
                              </span>
                            )}
                            {diag.errorTaxonomy.questionInterpretationCount > 0 && (
                              <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700">
                                Interpretation: {diag.errorTaxonomy.questionInterpretationCount} error{diag.errorTaxonomy.questionInterpretationCount > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION: YOUR MISTAKES (REPRESENTATIVE ATTEMPT LOGS) */}
                    {topicItem.recordedMistakes && topicItem.recordedMistakes.length > 0 && (
                      <div className="space-y-2.5">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span>YOUR MISTAKES ({topicItem.recordedMistakes.length} RECORDED)</span>
                        </h3>
                        <div className="space-y-2">
                          {topicItem.recordedMistakes.slice(0, 3).map((m, idx) => (
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
                                  subject: diag.subject,
                                  chapter: diag.chapter,
                                  explanation: item.explanation,
                                  source: item.source,
                                  reviewed_by_human: item.reviewed_by_human,
                                  timeSpentSeconds: item.timeSpentSeconds,
                                })
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SECTION: EXACT SUBTOPICS (SECTION 8) */}
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                        <span>WEAK SUBTOPICS BREAKDOWN</span>
                      </h3>

                      <div className="space-y-2">
                        {diag.weakSubtopics.map((sub, idx) => (
                          <div key={idx} className="p-3 rounded-xl border border-slate-200/60 bg-slate-50 flex items-center justify-between text-xs gap-3">
                            <div className="min-w-0 flex-1">
                              <span className="font-semibold text-slate-900 block truncate">{sub.name}</span>
                              <span className="text-[11px] text-slate-500 font-medium">{sub.errorPattern}</span>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0 font-mono">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  sub.status === "Critical"
                                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                                    : sub.status === "Moderate"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                }`}
                              >
                                {sub.status}
                              </span>
                              <span className="font-bold text-slate-900 text-xs">{sub.accuracyPercentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SECTION: HOW TO FIX THIS (SECTION 9) */}
                    <div className="p-5 rounded-2xl border border-slate-200/60 bg-slate-50 space-y-3">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>HOW TO FIX THIS</span>
                      </h3>

                      <div className="space-y-2.5 text-xs">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 uppercase text-[10px] block">{diag.remediationPlan.step1Rebuild.title}:</span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-600 font-medium">
                            {diag.remediationPlan.step1Rebuild.topicsToReview.map((t, i) => {
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

                        <div className="space-y-1">
                          <span className="font-bold text-slate-900 uppercase text-[10px] block">{diag.remediationPlan.step2DecisionFramework.title}:</span>
                          <ol className="list-decimal pl-4 space-y-0.5 text-slate-600 font-medium">
                            {diag.remediationPlan.step2DecisionFramework.checklist.map((c, i) => (
                              <li key={i}>{c.replace(/^\d+[\.\)]\s*/, "").replace(/^Step\s*\d+:\s*/i, "")}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* EXAM TACTIC & TRAP (SECTIONS 10 & 11) */}
                    {diag.examTactic && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                        <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/60 space-y-1.5">
                          <span className="font-bold text-blue-700 uppercase text-[10px] block flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 fill-blue-700" />
                            EXAM TACTIC / SHORTCUT
                          </span>
                          <p className="font-semibold text-slate-900">QUICK METHOD: {diag.examTactic.quickMethod}</p>
                          <p className="text-[11px] text-rose-600 font-medium">CAUTION: {diag.examTactic.caution}</p>
                        </div>

                        <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/60 space-y-1.5">
                          <span className="font-bold text-rose-700 uppercase text-[10px] block flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 fill-rose-700" />
                            COMMON EXAM TRAP
                          </span>
                          <p className="font-medium text-slate-700 leading-relaxed">{diag.commonTrap}</p>
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
                  Tested across {st.attemptsCount} questions · Avg speed {st.avgTimeSeconds}s/Q.
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
                      <span className="text-[10px] text-slate-500 block uppercase font-sans font-medium">Avg Response</span>
                      <span className="text-base font-bold text-slate-900">{selectedModalDiagnosis.observedPerformance.avgTimeSeconds}s</span>
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
                        <span className="text-[10px] text-slate-500 uppercase block font-sans">Avg Response</span>
                        <span className="text-sm font-bold text-slate-900">{selectedModalDiagnosis.observedPerformance.avgTimeSeconds}s</span>
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
                              className={`text-xs font-bold font-mono ${
                                topicRepairState?.step1.status === "completed"
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step1.status === "completed" ? "✓" : "○"}
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
                              className={`text-xs font-bold font-mono ${
                                topicRepairState?.step2.status === "completed"
                                  ? "text-emerald-600"
                                  : topicRepairState?.step2.status === "active"
                                  ? "text-amber-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step2.status === "completed"
                                ? "✓"
                                : topicRepairState?.step2.status === "active"
                                ? "→ Active"
                                : "○"}
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
                              className={`text-xs font-bold font-mono ${
                                topicRepairState?.step3.status === "completed"
                                  ? "text-emerald-600"
                                  : topicRepairState?.step3.status === "active"
                                  ? "text-amber-700"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step3.status === "completed"
                                ? "✓"
                                : topicRepairState?.step3.status === "active"
                                ? "→ Active"
                                : "○"}
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
                              className={`text-xs font-bold font-mono ${
                                topicRepairState?.step4.status === "completed"
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {topicRepairState?.step4.status === "completed" ? "✓" : "○"}
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
                        <span className="font-mono text-slate-900">
                          {topicRepairState?.isRecovered
                            ? "✅ RECOVERED (≥80% accuracy across 10+ attempts verified)"
                            : "Validation incomplete — more evidence required"}
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
    </div>
  );
}
