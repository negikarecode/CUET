"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { TopicMastery, TimeSinkAlertData, SubjectCalibrationData } from "@/types";
import { normalizeSubject } from "@/lib/analytics";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { calculateCUETScore, MARKING_SCHEME } from "@/lib/config/dashboardConfig";

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

  const isServerUser = initialData?.user && initialData.user.id !== "guest";

  // ---------------------------------------------------------------------------
  // SINGLE SOURCE OF TRUTH FOR ALL NUMBERS
  // ---------------------------------------------------------------------------
  const storeAttemptsSum =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.attemptedCount || 0), 0)
      : 0;

  const clientQuestionsAttempted =
    isClient && clientAnalytics ? (clientAnalytics.totalQuestionsAttempted || 0) : 0;

  const serverAttempted = initialData?.kpi?.totalAttempted || 50;

  // Single source for total attempted
  const totalAttempted = Math.max(serverAttempted, storeAttemptsSum, clientQuestionsAttempted);

  // Single source for correct and incorrect answers
  const correctCount =
    isClient && testAttempts && testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + (a.correctCount || 0), 0)
      : clientAnalytics?.totalCorrectAnswers || 10;

  // Single source for accuracy: strictly correct / attempted (10/50 = 20%)
  const accuracyPercentage =
    totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

  // Single source for score: CUET marking scheme (+5 correct, -1 incorrect)
  const currentScore = calculateCUETScore(correctCount, totalAttempted).score;

  // User profile identifiers
  const fullName = isServerUser
    ? initialData.user.fullName
    : isClient && storeUser.name
    ? storeUser.name
    : initialData.user.fullName || "Aryan Negi";

  const targetStream = isServerUser
    ? initialData.user.targetStream
    : isClient && storeUser.preferredStream
    ? storeUser.preferredStream
    : initialData.user.targetStream || "Science";

  const streak =
    isClient && storeUser?.dailyStreak
      ? storeUser.dailyStreak
      : initialData?.user?.currentStreak || 1;

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

  // Check if pacing guidance is relevant
  const hasPacingIssue = Boolean(
    candidateWeaknesses.some((w) => w.fullDiagnosis?.primaryDiagnosis === "Rapid Response Pacing") ||
    (testAttempts && testAttempts.some((a) => a.isLowEffort))
  );

  return (
    <div className="space-y-6">
      {/* 1. Greeting line plus one-line summary */}
      <section aria-label="Greeting">
        <WelcomeBanner
          userName={fullName}
        />
      </section>

      {/* Single pacing guidance banner if relevant */}
      {hasPacingIssue && (
        <div className="p-3 bg-[var(--warning-subtle)] text-[var(--warning)] border border-[var(--warning)]/20 rounded-[8px] text-[14px] leading-[1.5]">
          Pacing note: Rapid answering under 10 seconds per question leads to avoidable errors. Take time to read each question completely.
        </div>
      )}

      {/* 2. Next action card: topic, one-sentence reason, one primary button ("Practice this topic") */}
      <section aria-label="Next action">
        <NextBestActionCard
          prioritizedTopic={prioritizedTopic}
          totalAttempted={totalAttempted}
          currentCycleNumber={currentCycleNumber}
          currentCycleQuestionCount={currentCycleQuestionCount}
        />
      </section>

      {/* 3. Four stat cards (Latest score, Accuracy, Questions attempted, Streak) */}
      <section aria-label="Overview statistics">
        <TopMetricsRow
          score={currentScore}
          maxScore={MARKING_SCHEME.MAX_SCORE_PER_SUBJECT}
          accuracyPercentage={accuracyPercentage}
          correctCount={correctCount}
          totalAttempted={totalAttempted}
          dailyStreak={streak}
        />
      </section>

      {/* 4. Performance (trend and by-subject tabs in one card) */}
      <section aria-label="Performance">
        <CombinedPerformanceCard
          calibrations={candidateSubjectCalibrations}
          weaknesses={candidateWeaknesses}
          targetScore={238}
        />
      </section>

      {/* 5. Topics to fix (top 3, each with a secondary "Practice" button and a "View all" link) */}
      <section aria-label="Topics to fix">
        <StrengthsWeaknesses
          weaknesses={candidateWeaknesses}
          strengths={candidateStrengths}
        />
      </section>

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
