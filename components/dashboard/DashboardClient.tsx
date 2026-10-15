"use client";

import React, { useEffect, useMemo } from "react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { TopicMastery, TimeSinkAlertData, SubjectCalibrationData, RecordedTestAttempt } from "@/types";
import { normalizeSubject, deduplicateTestAttempts, getCanonicalTestKey } from "@/lib/analytics";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { calculateCUETScore, MARKING_SCHEME } from "@/lib/config/dashboardConfig";
import { computeAuthoritativeDiagnosticProgress } from "@/lib/diagnostic-status";
import { safeStorage } from "@/lib/storage/safe-storage";
import { stringToUuid } from "@/lib/utils";

import { WelcomeBanner } from "@/components/dashboard/prep-pulse/WelcomeBanner";
import { NextBestActionCard } from "@/components/dashboard/prep-pulse/NextBestActionCard";
import { TopMetricsRow } from "@/components/dashboard/prep-pulse/TopMetricsRow";
import { CombinedPerformanceCard } from "@/components/dashboard/prep-pulse/CombinedPerformanceCard";
import { StrengthsWeaknesses } from "@/components/dashboard/prep-pulse/StrengthsWeaknesses";
import { RecentEvaluationsTable } from "@/components/dashboard/prep-pulse/RecentEvaluationsTable";
import { DailyPracticeCalendar } from "@/components/dashboard/prep-pulse/DailyPracticeCalendar";

export interface DashboardInitialData {
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
  kpi: {
    totalAttempted: number;
    correctCount?: number;
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
  serverAttempts?: RecordedTestAttempt[];
  currentCycleNumber?: number;
  currentCycleQuestionCount?: number;
  isDiagnosticUnlocked?: boolean;
}

export default function DashboardClient({
  initialData,
}: {
  initialData: DashboardInitialData;
}) {
  const isClient = useIsClient();
  const storeUser = useTestStore((state) => state.user);
  const clientAnalytics = useTestStore((state) => state.analytics);
  const testAttempts = useTestStore((state) => state.testAttempts);
  const storeCycleNumber = useTestStore((state) => state.currentCycleNumber || 1);
  const storeCycleQuestionCount = useTestStore((state) => state.currentCycleQuestionCount || 0);
  const storeDiagnosticCycles = useTestStore((state) => state.diagnosticCycles || []);

  const isServerUser = Boolean(initialData.user && initialData.user.id !== "guest");

  // Attempt recovery on mount: cleans stale cache and ingests any completed CBT session from storage that was missed
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        safeStorage.initStartupCleanup();
        const { recoverUnrecordedCBTSessions } = useTestStore.getState();
        if (typeof recoverUnrecordedCBTSessions === "function") {
          recoverUnrecordedCBTSessions();
        }
      } catch (err) {
        console.warn("Session recovery notice:", err);
      }
    }
  }, []);

  // Synchronize authenticated server data and test attempts into store
  useEffect(() => {
    if (isServerUser && initialData.user) {
      const state = useTestStore.getState();
      if (state.user.id !== initialData.user.id || !state.user.targetCollege) {
        state.loginUser({
          id: initialData.user.id,
          name: initialData.user.fullName,
          targetCollege: initialData.user.targetCollege,
          targetUniversity: initialData.user.targetUniversity,
          targetCourse: initialData.user.targetCourse,
          preferredStream: (initialData.user.targetStream?.toLowerCase() || "science") as any,
          selectedSubjects: initialData.user.selectedSubjects,
          xpPoints: initialData.user.xp,
          campusCoins: initialData.user.campusCoins,
          dailyStreak: initialData.user.currentStreak,
        });
      }

      if (initialData.serverAttempts && initialData.serverAttempts.length > 0) {
        const localAttempts = state.testAttempts || [];
        const localKeys = new Set(
          localAttempts.flatMap((a) => [
            (a.testId || "").trim(),
            (a.id || "").trim(),
            stringToUuid((a.testId || "").trim()),
          ])
        );
        initialData.serverAttempts.forEach((att) => {
          const k = (att.testId || att.id || "").trim();
          const uuidK = stringToUuid(k);
          const isExactSameAttempt = localAttempts.some(
            (la) =>
              (att.attemptId && la.attemptId && la.attemptId === att.attemptId) ||
              (att.id && la.id && la.id === att.id) ||
              (att.testId &&
                la.testId &&
                la.testId === att.testId &&
                Math.abs(new Date(la.submittedAt || 0).getTime() - new Date(att.submittedAt || 0).getTime()) < 60000)
          );
          if (k && !localKeys.has(k) && !localKeys.has(uuidK) && !isExactSameAttempt) {
            state.recordTestAttempt(att);
          }
        });
      }
    }
  }, [isServerUser, initialData.user, initialData.serverAttempts]);

  // ---------------------------------------------------------------------------
  // SINGLE SOURCE OF TRUTH FOR ALL NUMBERS (No fake defaults)
  // ---------------------------------------------------------------------------
  const storeAttemptsSum =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0)
      : 0;

  const clientQuestionsAttempted =
    isClient && clientAnalytics ? (clientAnalytics.totalQuestionsAttempted ?? 0) : 0;

  const serverAttempted = initialData?.kpi?.totalAttempted ?? 0;
  const serverCorrectCount = initialData?.kpi?.correctCount ?? 0;

  // Single source for total attempted
  const totalAttempted = isClient && testAttempts && testAttempts.length > 0
    ? storeAttemptsSum
    : (isServerUser ? serverAttempted : clientQuestionsAttempted);

  // Single source for correct answers
  const correctCount =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.correctCount || 0), 0)
      : (isServerUser ? serverCorrectCount : (clientAnalytics?.totalCorrectAnswers ?? 0));

  // Single source for accuracy: strictly correct / attempted
  const accuracyPercentage =
    totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  // Deduplicated attempts sorted newest first for authoritative latest session score
  const deduplicatedAttempts = useMemo(() => {
    const list = testAttempts || [];
    const clean = deduplicateTestAttempts(list);
    const seen = new Set<string>();
    const unique: RecordedTestAttempt[] = [];
    clean.forEach((att) => {
      const canonicalKey = getCanonicalTestKey(att);
      if (!seen.has(canonicalKey)) {
        seen.add(canonicalKey);
        unique.push(att);
      }
    });
    return unique.sort(
      (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
    );
  }, [testAttempts]);

  const latestSession = deduplicatedAttempts.length > 0 ? deduplicatedAttempts[0] : null;
  const latestSessionScore = latestSession
    ? (latestSession.totalMarks ?? 0)
    : (totalAttempted > 0 ? calculateCUETScore(correctCount, totalAttempted).score : 0);
  const latestSessionMaxMarks = latestSession
    ? (latestSession.totalQuestions ? latestSession.totalQuestions * 5 : (latestSession.maxMarks || 250))
    : MARKING_SCHEME.MAX_SCORE_PER_SUBJECT;
  const latestTestTitle = latestSession?.testTitle;

  // Authoritative diagnostic cycle progress driving unlock status, next-action card & cycles
  const diagnosticProgress = useMemo(() => {
    return computeAuthoritativeDiagnosticProgress({
      totalAttempted,
      currentCycleNumber: isClient && storeCycleNumber ? storeCycleNumber : initialData?.currentCycleNumber,
      currentCycleQuestionCount: isClient && storeCycleQuestionCount !== undefined ? storeCycleQuestionCount : initialData?.currentCycleQuestionCount,
      completedCyclesCount: isClient ? storeDiagnosticCycles.length : undefined,
    });
  }, [
    totalAttempted,
    isClient,
    storeCycleNumber,
    storeCycleQuestionCount,
    storeDiagnosticCycles.length,
    initialData?.currentCycleNumber,
    initialData?.currentCycleQuestionCount,
  ]);

  // User profile identifiers
  const fullName = isServerUser
    ? initialData.user.fullName
    : isClient && storeUser.name
    ? storeUser.name
    : initialData?.user?.fullName || "Aspirant";

  const targetStream = isServerUser
    ? initialData.user.targetStream
    : isClient && storeUser.preferredStream
    ? storeUser.preferredStream
    : initialData?.user?.targetStream || "Science";

  const streak =
    isClient && storeUser?.dailyStreak !== undefined
      ? storeUser.dailyStreak
      : initialData?.user?.currentStreak ?? 0;

  // Active Subject Calibration Map
  const subjectCalibrationMap = useMemo(() => {
    return isClient && clientAnalytics?.subjectCalibration && Object.keys(clientAnalytics.subjectCalibration).length > 0
      ? clientAnalytics.subjectCalibration
      : initialData?.subjectCalibration || {};
  }, [isClient, clientAnalytics?.subjectCalibration, initialData?.subjectCalibration]);

  // Stream Domain Subjects & User Selected Subjects
  const userChosenSubjects = isServerUser
    ? initialData.user.selectedSubjects
    : isClient && storeUser.selectedSubjects && storeUser.selectedSubjects.length > 0
    ? storeUser.selectedSubjects
    : initialData?.user?.selectedSubjects;

  const baseSubjects = useMemo(() => {
    return userChosenSubjects && userChosenSubjects.length > 0
      ? userChosenSubjects
      : getSubjectsForStream(targetStream);
  }, [userChosenSubjects, targetStream]);

  const candidateSubjectCalibrations: SubjectCalibrationData[] = useMemo(() => {
    const seenKeys = new Set<string>();
    const list: string[] = [];

    baseSubjects.forEach((subName) => {
      const key = normalizeSubject(subName).key;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        list.push(subName);
      }
    });

    Object.values(subjectCalibrationMap).forEach((cal) => {
      if (cal.totalAttempted > 0 && !seenKeys.has(cal.subjectKey)) {
        seenKeys.add(cal.subjectKey);
        list.push(cal.subject);
      }
    });

    return list.map((subName) => {
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
  }, [baseSubjects, subjectCalibrationMap]);

  // Weaknesses & Strengths derived from analytics or initialData
  const candidateWeaknesses = useMemo(() => {
    return isClient && clientAnalytics && clientAnalytics.weaknessRadar && clientAnalytics.weaknessRadar.length > 0
      ? clientAnalytics.weaknessRadar
      : initialData.weaknessRadar || [];
  }, [isClient, clientAnalytics, initialData.weaknessRadar]);

  const candidateStrengths = useMemo(() => {
    return isClient && clientAnalytics && clientAnalytics.strengthList && clientAnalytics.strengthList.length > 0
      ? clientAnalytics.strengthList
      : (initialData as any)?.strengthList || [];
  }, [isClient, clientAnalytics, initialData]);

  // Prioritized topic for "Next Best Action"
  const prioritizedTopic = useMemo(() => {
    return [...candidateWeaknesses]
      .filter((t) => !t.isRecovered)
      .sort((a, b) => {
        const aHasData = (a.attemptsCount || 0) >= 10 ? 1 : 0;
        const bHasData = (b.attemptsCount || 0) >= 10 ? 1 : 0;
        if (aHasData !== bHasData) return bHasData - aHasData;
        if (a.accuracyPercentage !== b.accuracyPercentage) {
          return a.accuracyPercentage - b.accuracyPercentage;
        }
        return (b.incorrectCount || 0) - (a.incorrectCount || 0);
      })[0] || candidateWeaknesses[0];
  }, [candidateWeaknesses]);

  return (
    <div className="space-y-6">
      {/* 1. Greeting line plus one-line summary */}
      <section aria-label="Greeting">
        <WelcomeBanner
          userName={fullName}
        />
      </section>

      {/* 2. Next action card: topic, one-sentence reason, one primary button ("Practice this topic") */}
      <section aria-label="Next action">
        <NextBestActionCard
          prioritizedTopic={prioritizedTopic}
          totalAttempted={totalAttempted}
          currentCycleNumber={diagnosticProgress.currentCycleNumber}
          currentCycleQuestionCount={diagnosticProgress.currentCycleQuestionCount}
          isUnlocked={diagnosticProgress.isUnlocked}
        />
      </section>

      {/* 3. Four stat cards (Latest score, Accuracy, Questions attempted, Streak) */}
      <section aria-label="Overview statistics">
        <TopMetricsRow
          score={latestSessionScore}
          maxScore={latestSessionMaxMarks}
          testTitle={latestTestTitle}
          accuracyPercentage={accuracyPercentage}
          correctCount={correctCount}
          totalAttempted={totalAttempted}
          completedTestsCount={deduplicatedAttempts.length}
          dailyStreak={streak}
        />
      </section>

      {/* 4 & 5. Performance (2/3 width) and Topics to fix (1/3 width) side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section aria-label="Performance" className="lg:col-span-8 min-w-0">
          <CombinedPerformanceCard
            calibrations={candidateSubjectCalibrations}
            weaknesses={candidateWeaknesses}
          />
        </section>

        <section aria-label="Topics to fix" className="lg:col-span-4 min-w-0">
          <StrengthsWeaknesses
            weaknesses={candidateWeaknesses}
            strengths={candidateStrengths}
          />
        </section>
      </div>

      {/* 6. Recent sessions */}
      <section aria-label="Recent sessions">
        <RecentEvaluationsTable />
      </section>

      {/* 7. Activity heatmap */}
      <section aria-label="Activity heatmap">
        <DailyPracticeCalendar />
      </section>
    </div>
  );
}
