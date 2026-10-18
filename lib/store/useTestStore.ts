import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  StreamType,
  UserStats,
  UserAnswer,
  RecordedTestAttempt,
  UserAnalyticsSummary,
  DiagnosticCycle,
  CycleCompletionNotification,
} from "@/types";
import {
  computeAnalyticsFromAttempts,
  buildDefaultSubjectCalibration,
  deduplicateTestAttempts,
} from "@/lib/analytics";
import { evaluateSessionValidity } from "@/lib/session-validity";
import { calculateStreakFromAttempts, calculateActiveStreak } from "@/lib/gamification";
import { getDiagnosticProgress } from "@/lib/diagnostic-status";
import { safeStorage } from "@/lib/storage/safe-storage";
import { stringToUuid } from "@/lib/utils";

interface TestStoreState {
  // Gamification & User Auth state
  user: UserStats;
  selectedStream: StreamType;
  setSelectedStream: (stream: StreamType) => void;
  incrementStreak: () => void;
  setStreak: (streak: number) => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  setTargetCollege: (college: string) => void;
  loginUser: (profile: Partial<UserStats>) => void;
  logout: () => void;

  // Attempt History & Analytics
  testAttempts: RecordedTestAttempt[];
  analytics: UserAnalyticsSummary;
  // Diagnostic Cycle System (150-question window tracking)
  currentCycleNumber: number;
  currentCycleQuestionCount: number;
  diagnosticCycles: DiagnosticCycle[];
  activeCompletionNotification: CycleCompletionNotification | null;
  dismissCycleCompletionNotification: () => void;
  recordTestAttempt: (attempt: RecordedTestAttempt) => void;
  deleteTestAttempt: (attemptOrTestId: string) => void;
  recoverUnrecordedCBTSessions: () => void;
  getAnalytics: () => UserAnalyticsSummary;
  clearAttempts: () => void;

  // Active Test Session preview/mock
  isSessionActive: boolean;
  activeSubject: string | null;
  activeTimeRemaining: number; // in seconds
  currentQuestionIndex: number;
  recordedAnswers: Record<string, UserAnswer>;
  startSession: (subjectId: string, durationMinutes?: number) => void;
  answerQuestion: (questionId: string, optionId: "A" | "B" | "C" | "D") => void;
  clearAnswer: (questionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  endSession: () => void;
  decrementTimer: () => void;
}

const DEFAULT_ANALYTICS: UserAnalyticsSummary = {
  totalQuestionsAttempted: 0,
  totalCorrectAnswers: 0,
  totalIncorrectAnswers: 0,
  totalTimeSpentSeconds: 0,
  overallAccuracyPercentage: 0,
  completedTestsCount: 0,
  weaknessRadar: [],
  strengthList: [],
  timeSinkAlerts: [],
  recommendedPractice: {
    topic: "Initial Diagnostic Mock",
    chapter: "Domain Knowledge Calibration",
    subject: "Physics",
    durationMinutes: 60,
    questionCount: 50,
    reason:
      "Complete your first 50-question diagnostic test to establish your baseline accuracy and detect trap options.",
  },
  subjectCalibration: buildDefaultSubjectCalibration(),
};

const DEFAULT_USER: UserStats = {
  id: "guest",
  name: "",
  email: "",
  age: "",
  dailyStreak: 0,
  lastActiveDate: new Date().toISOString(),
  xpPoints: 0,
  campusCoins: 0,
  targetCollege: "",
  targetUniversity: "Delhi University",
  targetCourse: "",
  preferredStream: "science",
  selectedSubjects: [],
  accuracyPercentage: 0,
  completedTestsCount: 0,
  isLoggedIn: false,
};

function compactQuestionAttempt(q: import("@/types").RecordedQuestionAttempt): import("@/types").RecordedQuestionAttempt {
  return {
    questionId: q.questionId,
    conceptId: q.conceptId,
    questionNumber: q.questionNumber,
    subject: q.subject,
    chapter: q.chapter,
    microTopic: q.microTopic,
    selectedOption: q.selectedOption,
    correctOption: q.correctOption,
    isCorrect: q.isCorrect,
    timeSpentSeconds: q.timeSpentSeconds,
    isTimeSink: q.isTimeSink,
    difficulty: q.difficulty,
    errorCategory: q.errorCategory,
    isLowEffort: q.isLowEffort,
    source: q.source,
    reviewed_by_human: q.reviewed_by_human,
  };
}

function compactTestAttemptForPersistence(
  attempt: RecordedTestAttempt,
  includeQuestions = true
): RecordedTestAttempt {
  return {
    id: attempt.id,
    userId: attempt.userId,
    testId: attempt.testId,
    testTitle: attempt.testTitle,
    subject: attempt.subject,
    totalQuestions: attempt.totalQuestions,
    attemptedCount: attempt.attemptedCount,
    unattemptedCount: attempt.unattemptedCount,
    correctCount: attempt.correctCount,
    incorrectCount: attempt.incorrectCount,
    totalMarks: attempt.totalMarks,
    maxMarks: attempt.maxMarks,
    accuracyPercentage: attempt.accuracyPercentage,
    timeTakenSeconds: attempt.timeTakenSeconds,
    timeSinkCount: attempt.timeSinkCount,
    submittedAt: attempt.submittedAt,
    date: attempt.date,
    timestamp: attempt.timestamp,
    score: attempt.score,
    isLowEffort: attempt.isLowEffort,
    sessionConfidence: attempt.sessionConfidence,
    sessionMessage: attempt.sessionMessage,
    questions:
      includeQuestions && Array.isArray(attempt.questions)
        ? attempt.questions.map(compactQuestionAttempt)
        : [],
  };
}

function compactCycleForPersistence(cycle: DiagnosticCycle): DiagnosticCycle {
  return {
    ...cycle,
    questions: [],
  };
}

function compactAnalyticsForPersistence(analytics: UserAnalyticsSummary): UserAnalyticsSummary {
  if (!analytics) return analytics;
  return {
    ...analytics,
    weaknessRadar: (analytics.weaknessRadar || []).map((t) => ({
      ...t,
      questionsData: [],
      recordedMistakes: (t.recordedMistakes || []).slice(0, 3).map((m) => ({
        ...m,
        options: undefined,
        prompt: (m.prompt || "").slice(0, 80),
        explanation: (m.explanation || "").slice(0, 100),
      })),
    })),
    strengthList: (analytics.strengthList || []).map((t) => ({
      ...t,
      questionsData: [],
      recordedMistakes: [],
    })),
    allTopics: (analytics.allTopics || []).map((t) => ({
      ...t,
      questionsData: [],
      recordedMistakes: [],
    })),
  };
}

function emergencyCompactPayload(parsed: any): string {
  try {
    const state = parsed?.state || {};
    const minimalAttempts = (state.testAttempts || []).slice(0, 15).map((att: any, idx: number) => ({
      ...att,
      questions: idx < 3 ? (att.questions || []).slice(0, 50).map(compactQuestionAttempt) : [],
    }));
    const minimalCycles = (state.diagnosticCycles || []).map((c: any) => ({
      ...c,
      questions: [],
    }));
    return JSON.stringify({
      ...parsed,
      state: {
        ...state,
        testAttempts: minimalAttempts,
        diagnosticCycles: minimalCycles,
        analytics: state.analytics
          ? {
              ...state.analytics,
              weaknessRadar: (state.analytics.weaknessRadar || []).map((w: any) => ({
                ...w,
                questionsData: [],
                recordedMistakes: [],
              })),
              strengthList: (state.analytics.strengthList || []).map((s: any) => ({
                ...s,
                questionsData: [],
                recordedMistakes: [],
              })),
              allTopics: [],
            }
          : state.analytics,
      },
    });
  } catch {
    return JSON.stringify({
      version: parsed?.version ?? 0,
      state: {
        user: parsed?.state?.user,
        selectedStream: parsed?.state?.selectedStream,
        currentCycleNumber: parsed?.state?.currentCycleNumber ?? 1,
        currentCycleQuestionCount: parsed?.state?.currentCycleQuestionCount ?? 0,
      },
    });
  }
}

export const useTestStore = create<TestStoreState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      selectedStream: "science",

      setSelectedStream: (stream: StreamType) => {
        set((state) => ({
          selectedStream: stream,
          user: {
            ...state.user,
            preferredStream: stream,
          },
        }));
      },

      incrementStreak: () => {
        set((state) => ({
          user: {
            ...state.user,
            dailyStreak: state.user.dailyStreak + 1,
          },
        }));
      },

      setStreak: (streak: number) => {
        set((state) => ({
          user: {
            ...state.user,
            dailyStreak: Math.max(0, streak),
          },
        }));
      },

      addXP: (amount: number) => {
        set((state) => ({
          user: {
            ...state.user,
            xpPoints: state.user.xpPoints + amount,
          },
        }));
      },

      addCoins: (amount: number) => {
        set((state) => ({
          user: {
            ...state.user,
            campusCoins: (state.user.campusCoins ?? 0) + amount,
          },
        }));
      },

      setTargetCollege: (college: string) => {
        set((state) => ({
          user: {
            ...state.user,
            targetCollege: college,
          },
        }));
      },

      loginUser: (profile: Partial<UserStats>) => {
        if (typeof document !== "undefined") {
          document.cookie = "cuet_auth=1; path=/; max-age=2592000; SameSite=Lax";
        }
        const targetId = profile.id || `user_${Date.now()}`;
        const stream = (profile.preferredStream || "science") as StreamType;

        if (typeof window !== "undefined") {
          safeStorage.setItem("cuet_active_uid", targetId);
          // Check if this user already has persisted user-scoped data
          const existingDataStr = safeStorage.getItem(`cuet_ai_prep_session_storage:${targetId}`);
          if (existingDataStr) {
            try {
              const parsed = JSON.parse(existingDataStr);
              if (parsed?.state?.user && parsed.state.user.id === targetId) {
                // Restore target user's existing isolated data merged with latest profile
                const savedAttempts = parsed.state.testAttempts || [];
                const cleanSaved = deduplicateTestAttempts(savedAttempts);
                const derivedProgress = getDiagnosticProgress(cleanSaved);
                const savedAnalytics = parsed.state.analytics || computeAnalyticsFromAttempts(cleanSaved);
                const computedStreak = cleanSaved.length > 0
                  ? calculateStreakFromAttempts(cleanSaved)
                  : calculateActiveStreak(
                      profile.dailyStreak !== undefined
                        ? profile.dailyStreak
                        : parsed.state?.user?.dailyStreak ?? 0,
                      parsed.state?.user?.lastActiveDate
                    );

                set({
                  user: {
                    ...parsed.state.user,
                    ...profile,
                    dailyStreak: computedStreak,
                    id: targetId,
                    isLoggedIn: true,
                    lastActiveDate: new Date().toISOString(),
                  },
                  selectedStream: parsed.state.selectedStream || stream,
                  testAttempts: cleanSaved,
                  analytics: savedAnalytics,
                  currentCycleNumber: derivedProgress.currentCycleNumber,
                  currentCycleQuestionCount: derivedProgress.currentCycleQuestionCount,
                  diagnosticCycles: derivedProgress.completedCycles,
                  activeCompletionNotification: parsed.state.activeCompletionNotification || null,
                  isSessionActive: false,
                  recordedAnswers: {},
                });
                return;
              }
            } catch {
              // Parse error, proceed to fresh initialization
            }
          }
        }

        // Fresh initialization for new or unpersisted user - ZERO inherited metrics
        set({
          user: {
            ...DEFAULT_USER,
            ...profile,
            id: targetId,
            name: profile.name || "Aspirant",
            email: profile.email || `${(profile.name || "aspirant").toLowerCase().replace(/\s+/g, "")}@example.com`,
            age: profile.age || "17",
            targetCollege: profile.targetCollege || "SRCC / St. Stephen's (Delhi University)",
            targetUniversity: profile.targetUniversity || "Delhi University",
            targetCourse: profile.targetCourse || "B.Com (Hons)",
            preferredStream: stream,
            selectedSubjects: profile.selectedSubjects || [],
            dailyStreak: profile.dailyStreak ?? 0,
            xpPoints: profile.xpPoints ?? 0,
            campusCoins: profile.campusCoins ?? 0,
            accuracyPercentage: profile.accuracyPercentage ?? 0,
            completedTestsCount: profile.completedTestsCount ?? 0,
            isLoggedIn: true,
            lastActiveDate: new Date().toISOString(),
          },
          selectedStream: stream,
          testAttempts: [],
          analytics: DEFAULT_ANALYTICS,
          currentCycleNumber: 1,
          currentCycleQuestionCount: 0,
          diagnosticCycles: [],
          activeCompletionNotification: null,
          isSessionActive: false,
          recordedAnswers: {},
        });
      },

      logout: () => {
        if (typeof document !== "undefined") {
          document.cookie = "cuet_auth=; path=/; max-age=0; SameSite=Lax";
        }
        if (typeof window !== "undefined") {
          safeStorage.removeItem("cuet_active_uid");
        }
        set({
          user: DEFAULT_USER,
          testAttempts: [],
          analytics: DEFAULT_ANALYTICS,
          currentCycleNumber: 1,
          currentCycleQuestionCount: 0,
          diagnosticCycles: [],
          activeCompletionNotification: null,
          isSessionActive: false,
          activeSubject: null,
          recordedAnswers: {},
        });
      },

      // Attempt History & Analytics
      testAttempts: [],
      analytics: DEFAULT_ANALYTICS,

      // Diagnostic Cycle System (150-question window tracking)
      currentCycleNumber: 1,
      currentCycleQuestionCount: 0,
      diagnosticCycles: [],
      activeCompletionNotification: null,

      dismissCycleCompletionNotification: () => {
        set({ activeCompletionNotification: null });
      },

      deleteTestAttempt: (attemptOrTestId: string) => {
        if (!attemptOrTestId) return;
        const targetKey = attemptOrTestId.trim();
        const targetUuid = stringToUuid(targetKey);

        const currentAttempts = get().testAttempts || [];
        const updatedAttempts = currentAttempts.filter((a) => {
          if (!a) return false;
          if (a.id === targetKey || a.testId === targetKey) return false;
          if (a.testId && stringToUuid(a.testId.trim()) === targetUuid) return false;
          return true;
        });

        if (updatedAttempts.length === currentAttempts.length) return;

        const analytics = computeAnalyticsFromAttempts(updatedAttempts);
        const dynamicStreak = calculateStreakFromAttempts(updatedAttempts);

        set((state) => ({
          testAttempts: updatedAttempts,
          analytics,
          user: {
            ...state.user,
            dailyStreak: dynamicStreak,
            accuracyPercentage: analytics.overallAccuracyPercentage,
            completedTestsCount: analytics.completedTestsCount,
          },
        }));
      },

      recordTestAttempt: async (attempt: RecordedTestAttempt) => {
        const testKey = (attempt.testId || attempt.id || "").trim();
        if (!testKey) return;
        const testCanonicalUuid = stringToUuid(testKey);

        // Evaluate session validity gate
        const validity = evaluateSessionValidity(attempt.questions || []);
        const enrichedAttempt: RecordedTestAttempt = {
          ...attempt,
          isLowEffort: validity.isLowEffort,
          sessionConfidence: validity.confidence,
          sessionMessage: validity.message,
          questions: (attempt.questions || []).map((q) => ({
            ...q,
            isLowEffort: validity.isLowEffort,
          })),
        };

        const currentAttempts = get().testAttempts || [];
        const isGenericTestKey =
          !testKey || testKey === "cbt_exam" || testKey === "default" || /^[0-9a-f-]{36}$/i.test(testKey);
        // Strictly deduplicate by canonical attemptId/id, or duplicate network submission within 60s
        const existingIdx = currentAttempts.findIndex((a) => {
          if (!a) return false;
          if (attempt.attemptId && a.attemptId && a.attemptId === attempt.attemptId) return true;
          if (attempt.id && a.id && a.id === attempt.id) return true;

          const aKey = (a.testId || "").trim();
          const timeA = new Date(a.submittedAt || 0).getTime();
          const timeB = new Date(attempt.submittedAt || 0).getTime();
          const isWithin60s = timeA > 0 && timeB > 0 && Math.abs(timeA - timeB) <= 60000;

          if (!isGenericTestKey && aKey && aKey !== "cbt_exam" && !/^[0-9a-f-]{36}$/i.test(aKey)) {
            if ((aKey === testKey || stringToUuid(aKey) === testCanonicalUuid) && isWithin60s) {
              return true;
            }
          }

          // Duplicate network submission within 60s
          if (
            isGenericTestKey &&
            (!aKey || aKey === "cbt_exam" || /^[0-9a-f-]{36}$/i.test(aKey)) &&
            a.testTitle &&
            attempt.testTitle &&
            a.testTitle.trim().toLowerCase() === attempt.testTitle.trim().toLowerCase() &&
            a.subject &&
            attempt.subject &&
            a.subject.trim().toLowerCase() === attempt.subject.trim().toLowerCase() &&
            isWithin60s
          ) {
            return true;
          }
          return false;
        });

        let updatedAttempts: RecordedTestAttempt[];
        if (existingIdx >= 0) {
          const old = currentAttempts[existingIdx];
          // Preserve friendly non-UUID testId if available for router paths
          const preservedTestId =
            attempt.testId && !/^[0-9a-f-]{36}$/i.test(attempt.testId) && attempt.testId !== "cbt_exam"
              ? attempt.testId
              : (old && old.testId && !/^[0-9a-f-]{36}$/i.test(old.testId) && old.testId !== "cbt_exam"
                ? old.testId
                : attempt.testId);
          updatedAttempts = [...currentAttempts];
          updatedAttempts[existingIdx] = {
            ...enrichedAttempt,
            testId: preservedTestId,
          };
        } else {
          updatedAttempts = [enrichedAttempt, ...currentAttempts];
        }

        // Canonical analytics computation (guarantees 1 question = 1 attempt)
        const analytics = computeAnalyticsFromAttempts(updatedAttempts);

        // Calculate XP delta: low effort gets 5 XP, normal gets full 50 XP
        const xpAward = validity.isLowEffort ? 5 : 50;

        // Synchronously update testAttempts and analytics IMMEDIATELY so any concurrent read sees the recorded attempt
        const dynamicStreak = calculateStreakFromAttempts(updatedAttempts);
        set((state) => ({
          testAttempts: updatedAttempts,
          analytics,
          user: {
            ...state.user,
            dailyStreak: dynamicStreak,
            accuracyPercentage: analytics.overallAccuracyPercentage,
            completedTestsCount: analytics.completedTestsCount,
            xpPoints: (state.user.xpPoints || 0) + xpAward,
          },
        }));

        // Derives cycles and active progression strictly from deduplicated attempts
        const derived = getDiagnosticProgress(updatedAttempts);

        let completionNotification: CycleCompletionNotification | null = null;
        if (derived.completedCycles.length > 0) {
          const latestCycle = derived.completedCycles[derived.completedCycles.length - 1];
          const prevCyclesCount = (get().diagnosticCycles || []).length;
          if (latestCycle && derived.completedCycles.length > prevCyclesCount) {
            completionNotification = {
              cycleNumber: latestCycle.cycleNumber,
              totalAnalyzed: latestCycle.totalQuestionsAttempted,
              isBaseline: latestCycle.cycleNumber === 1,
              completedAt: latestCycle.completedAt || new Date().toISOString(),
              comparisonSummary: latestCycle.comparison
                ? {
                    improvedCount: latestCycle.comparison.improved.length,
                    recurringCount: latestCycle.comparison.recurringWeak.length,
                    resolvedCount: latestCycle.comparison.resolved.length,
                    newMistakesCount: latestCycle.comparison.newMistakes.length,
                    declinedCount: latestCycle.comparison.declined.length,
                  }
                : undefined,
            };
          }
        }

        set((state) => ({
          diagnosticCycles: derived.completedCycles,
          currentCycleNumber: derived.currentCycleNumber,
          currentCycleQuestionCount: derived.currentCycleQuestionCount,
          activeCompletionNotification: completionNotification || state.activeCompletionNotification,
        }));
      },

      recoverUnrecordedCBTSessions: () => {
        if (typeof window === "undefined") return;
        try {
          const currentAttempts = [...(get().testAttempts || [])];
          const activeUid = get().user?.id || (typeof window !== "undefined" ? safeStorage.getItem("cuet_active_uid") : null);
          if (!activeUid || activeUid === "guest") return;

          // Track already registered testIds to prevent any duplication
          const seenTestIds = new Set<string>();
          currentAttempts.forEach((a) => {
            if (a.testId) seenTestIds.add(a.testId.trim());
          });

          const recovered: RecordedTestAttempt[] = [];
          let hasChanges = false;

          for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (
              key &&
              (key.startsWith(`cuet_cbt_session_${activeUid}_`) ||
                key === `cuet_cbt_active_session_${activeUid}`)
            ) {
              const raw = window.localStorage.getItem(key);
              if (!raw) continue;
              try {
                const session = JSON.parse(raw);
                if (session && session.isSubmitted && session.testId) {
                  const sTestId = String(session.testId).trim();
                  // Verify session user ownership strictly
                  if (session.userId && session.userId !== activeUid) continue;

                  // Reconstruct actual correct count from questionStates & questions to heal any 0-correct states
                  let derivedCorrect = 0;
                  let derivedAttempted = 0;
                  const qStates = session.questionStates || {};
                  const questionsList = session.questions || [];

                  questionsList.forEach((q: any) => {
                    const st = qStates[q.id];
                    if (st && st.selectedOption) {
                      derivedAttempted++;
                      const trueOpt =
                        q.correctOptionId ||
                        q.correctOption ||
                        q.options?.find((o: any) => o.isCorrect === true)?.id;
                      if (trueOpt && st.selectedOption === trueOpt) {
                        derivedCorrect++;
                      }
                    }
                  });

                  const sessionScore = session.submittedScore || {};
                  const finalCorrect = Math.max(sessionScore.correctCount || 0, derivedCorrect);
                  const finalAttempted = Math.max(sessionScore.attemptedCount || 0, derivedAttempted);
                  const finalAccuracy =
                    finalAttempted > 0 ? Math.round((finalCorrect / finalAttempted) * 100) : 0;

                  const sTestUuid = stringToUuid(sTestId);
                  const isGenericSession =
                    !sTestId || sTestId === "cbt_exam" || /^[0-9a-f-]{36}$/i.test(sTestId);
                  const existingIdx = currentAttempts.findIndex((a) => {
                    if (!a) return false;
                    if (session.attemptId && a.attemptId && a.attemptId === session.attemptId) return true;
                    if (!isGenericSession && a.testId && a.testId !== "cbt_exam" && !/^[0-9a-f-]{36}$/i.test(a.testId)) {
                      if (a.testId === sTestId) return true;
                      if (stringToUuid(a.testId) === sTestUuid) return true;
                    }
                    if (
                      isGenericSession &&
                      (!a.testId || a.testId === "cbt_exam" || /^[0-9a-f-]{36}$/i.test(a.testId)) &&
                      session.testMeta?.title &&
                      a.testTitle &&
                      a.testTitle.trim().toLowerCase() === session.testMeta.title.trim().toLowerCase() &&
                      session.testMeta?.subject &&
                      a.subject &&
                      a.subject.trim().toLowerCase() === session.testMeta.subject.trim().toLowerCase()
                    ) {
                      return true;
                    }
                    return false;
                  });

                  if (existingIdx >= 0 && currentAttempts[existingIdx]) {
                    const existing = currentAttempts[existingIdx]!;
                    if (
                      finalCorrect > (existing.correctCount || 0) ||
                      ((existing.accuracyPercentage || 0) === 0 && finalAccuracy > 0)
                    ) {
                      currentAttempts[existingIdx] = {
                        ...existing,
                        correctCount: finalCorrect,
                        attemptedCount: finalAttempted,
                        accuracyPercentage: finalAccuracy,
                        totalMarks: finalCorrect * 5 - Math.max(0, finalAttempted - finalCorrect),
                      };
                      hasChanges = true;
                    }
                  } else if (
                    !seenTestIds.has(sTestId) &&
                    !seenTestIds.has(sTestUuid) &&
                    (finalAttempted > 0 || session.isSubmitted)
                  ) {
                    seenTestIds.add(sTestId);
                    seenTestIds.add(sTestUuid);
                    const testMeta = session.testMeta;
                    const questionAttempts = questionsList.map((q: any, idx: number) => {
                      const st = qStates[q.id];
                      const selectedOption = st?.selectedOption ?? null;
                      const trueOpt =
                        q.correctOptionId ||
                        q.correctOption ||
                        q.options?.find((o: any) => o.isCorrect === true)?.id;
                      const isCorrect =
                        selectedOption !== null && selectedOption !== undefined
                          ? Boolean(trueOpt && selectedOption === trueOpt)
                          : null;
                      return {
                        questionId: q.id || `q_${idx + 1}`,
                        conceptId: q.conceptId,
                        questionNumber: q.questionNumber || idx + 1,
                        subject: testMeta?.subject || "Physics",
                        chapter: q.chapter || "Domain Core",
                        microTopic: q.topic || "Core Concept",
                        prompt: q.prompt || q.questionText || `Question ${idx + 1}`,
                        options: q.options || [],
                        questionType: q.questionType || "conceptual",
                        selectedOption,
                        correctOption: trueOpt,
                        isCorrect,
                        timeSpentSeconds: st?.timeSpentSeconds || 0,
                        isTimeSink: (st?.timeSpentSeconds || 0) > 72,
                        difficulty: q.difficulty,
                        ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter || "Core"})`,
                        explanation: q.explanation || "",
                      };
                    });

                    const attempt: RecordedTestAttempt = {
                      id: `recovered_${sTestId}`,
                      attemptId: session.attemptId || sTestUuid,
                      userId: get().user?.id || "guest",
                      testId: sTestId,
                      testTitle: testMeta?.title || "CUET Domain Examination Paper",
                      subject: testMeta?.subject || "Physics",
                      totalQuestions: questionsList.length || 50,
                      attemptedCount: finalAttempted,
                      unattemptedCount: Math.max(0, (questionsList.length || 50) - finalAttempted),
                      correctCount: finalCorrect,
                      incorrectCount: Math.max(0, finalAttempted - finalCorrect),
                      totalMarks: finalCorrect * 5 - Math.max(0, finalAttempted - finalCorrect),
                      maxMarks: (questionsList.length || 50) * 5,
                      accuracyPercentage: finalAccuracy,
                      timeTakenSeconds: sessionScore.timeTakenSeconds || 0,
                      timeSinkCount: sessionScore.timeSinkCount || 0,
                      submittedAt: new Date().toISOString(),
                      questions: questionAttempts,
                    };
                    recovered.push(attempt);
                    hasChanges = true;
                    try {
                      window.localStorage.removeItem(key);
                    } catch {}
                  }
                }
              } catch {}
            }
          }

          if (hasChanges || recovered.length > 0) {
            // Deduplicate all attempts strictly
            const allAttempts = deduplicateTestAttempts([...currentAttempts, ...recovered]);
            const analytics = computeAnalyticsFromAttempts(allAttempts);
            const dynamicStreak = calculateStreakFromAttempts(allAttempts);
            set((state) => ({
              testAttempts: allAttempts,
              analytics,
              user: {
                ...state.user,
                dailyStreak: dynamicStreak,
                accuracyPercentage: analytics.overallAccuracyPercentage,
                completedTestsCount: analytics.completedTestsCount,
              },
            }));

            const derived = getDiagnosticProgress(allAttempts);
            set(() => ({
              diagnosticCycles: derived.completedCycles,
              currentCycleNumber: derived.currentCycleNumber,
              currentCycleQuestionCount: derived.currentCycleQuestionCount,
            }));
          }
        } catch (err) {
          console.warn("Session recovery notice:", err);
        }
      },

      getAnalytics: () => {
        return get().analytics || DEFAULT_ANALYTICS;
      },

      clearAttempts: () => {
        set((state) => ({
          testAttempts: [],
          analytics: DEFAULT_ANALYTICS,
          currentCycleNumber: 1,
          currentCycleQuestionCount: 0,
          diagnosticCycles: [],
          activeCompletionNotification: null,
          user: {
            ...state.user,
            dailyStreak: 0,
            accuracyPercentage: 0,
            completedTestsCount: 0,
          },
        }));
      },

      // Test Session
      isSessionActive: false,
      activeSubject: null,
      activeTimeRemaining: 60 * 60, // 60 minutes
      currentQuestionIndex: 0,
      recordedAnswers: {},

      startSession: (subjectId: string, durationMinutes = 60) => {
        set({
          isSessionActive: true,
          activeSubject: subjectId,
          activeTimeRemaining: durationMinutes * 60,
          currentQuestionIndex: 0,
          recordedAnswers: {},
        });
      },

      answerQuestion: (questionId, optionId) => {
        const current = get().recordedAnswers[questionId];
        set((state) => ({
          recordedAnswers: {
            ...state.recordedAnswers,
            [questionId]: {
              questionId,
              selectedOptionId: optionId,
              isMarkedForReview: current?.isMarkedForReview ?? false,
              timeSpentSeconds: (current?.timeSpentSeconds ?? 0) + 1,
            },
          },
        }));
      },

      clearAnswer: (questionId) => {
        const current = get().recordedAnswers[questionId];
        if (!current) return;
        set((state) => ({
          recordedAnswers: {
            ...state.recordedAnswers,
            [questionId]: {
              ...current,
              selectedOptionId: null,
            },
          },
        }));
      },

      toggleMarkForReview: (questionId) => {
        const current = get().recordedAnswers[questionId];
        set((state) => ({
          recordedAnswers: {
            ...state.recordedAnswers,
            [questionId]: {
              questionId,
              selectedOptionId: current?.selectedOptionId ?? null,
              isMarkedForReview: !(current?.isMarkedForReview ?? false),
              timeSpentSeconds: current?.timeSpentSeconds ?? 0,
            },
          },
        }));
      },

      setCurrentQuestionIndex: (index) => {
        set({ currentQuestionIndex: index });
      },

      decrementTimer: () => {
        const current = get().activeTimeRemaining;
        if (current <= 1) {
          set({ activeTimeRemaining: 0, isSessionActive: false });
        } else {
          set({ activeTimeRemaining: current - 1 });
        }
      },

      endSession: () => {
        set({
          isSessionActive: false,
        });
      },
    }),
    {
      name: "cuet_ai_prep_session_storage",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return {
          getItem: (_name: string) => {
            // Priority 1: Check active user pointer
            const activeUid = safeStorage.getItem("cuet_active_uid");
            if (activeUid) {
              const userScoped = safeStorage.getItem(`cuet_ai_prep_session_storage:${activeUid}`);
              if (userScoped) return userScoped;
            }
            // Fallback for guest
            const guestScoped = safeStorage.getItem("cuet_ai_prep_session_storage:guest");
            if (guestScoped) return guestScoped;

            // Safe migration: ONLY if legacy data explicitly has an id that matches activeUid
            const legacy = safeStorage.getItem("cuet_ai_prep_session_storage");
            if (legacy) {
              try {
                const parsed = JSON.parse(legacy);
                const legacyUserId = parsed?.state?.user?.id;
                // If legacy owner matches current activeUid, migrate it safely
                if (legacyUserId && activeUid && legacyUserId === activeUid) {
                  safeStorage.setItem(`cuet_ai_prep_session_storage:${activeUid}`, legacy);
                  safeStorage.removeItem("cuet_ai_prep_session_storage");
                  return legacy;
                }
              } catch {
                // Ignore parse errors
              }
            }
            return null;
          },
          setItem: (_name: string, value: string) => {
            if (typeof window === "undefined") return;
            try {
              let parsed: any = null;
              try {
                parsed = JSON.parse(value);
              } catch {
                parsed = null;
              }
              const userId = parsed?.state?.user?.id;
              const targetKey =
                userId && userId !== "guest"
                  ? `cuet_ai_prep_session_storage:${userId}`
                  : "cuet_ai_prep_session_storage:guest";

              if (userId && userId !== "guest") {
                safeStorage.setItem("cuet_active_uid", userId);
              } else {
                safeStorage.removeItem("cuet_active_uid");
              }

              // 1. Direct write attempt via safeStorage
              const writeResult = safeStorage.setItem(targetKey, value);
              if (writeResult.tier === "local") {
                return;
              }

              // 2. If storage was degraded or full, try emergency compacted payload
              if (parsed) {
                try {
                  const emergencyPayload = emergencyCompactPayload(parsed);
                  const compactResult = safeStorage.setItem(targetKey, emergencyPayload);
                  if (compactResult.tier === "local") return;
                } catch {}
              }

              // 3. Ultimate fallback: store minimal user & stream
              try {
                const minimal = JSON.stringify({
                  version: parsed?.version ?? 0,
                  state: {
                    user: parsed?.state?.user,
                    selectedStream: parsed?.state?.selectedStream,
                    currentCycleNumber: parsed?.state?.currentCycleNumber ?? 1,
                    currentCycleQuestionCount: parsed?.state?.currentCycleQuestionCount ?? 0,
                  },
                });
                safeStorage.setItem(targetKey, minimal);
              } catch (finalErr) {
                console.warn(
                  "[useTestStore] Storage completely saturated; state retained safely in-memory.",
                  finalErr
                );
              }
            } catch (outerErr) {
              console.warn("[useTestStore] Safe storage save warning:", outerErr);
            }
          },
          removeItem: (_name: string) => {
            const activeUid = safeStorage.getItem("cuet_active_uid") || "guest";
            safeStorage.removeItem(`cuet_ai_prep_session_storage:${activeUid}`);
          },
        };
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.testAttempts) && state.testAttempts.length > 0) {
          const deduped = deduplicateTestAttempts(state.testAttempts);
          state.testAttempts = deduped;
          state.analytics = computeAnalyticsFromAttempts(deduped);
          const derived = getDiagnosticProgress(deduped);
          state.currentCycleNumber = derived.currentCycleNumber;
          state.currentCycleQuestionCount = derived.currentCycleQuestionCount;
          state.diagnosticCycles = derived.completedCycles;
        }
      },
      partialize: (state) => {
        // Keep question telemetry on the latest 5 attempts; keep summary metrics on older attempts
        const dedupedAttempts = deduplicateTestAttempts(state.testAttempts || []);
        const compactedAttempts = dedupedAttempts.map((att: RecordedTestAttempt, idx: number) =>
          compactTestAttemptForPersistence(att, idx < 5)
        );
        const compactedCycles = (state.diagnosticCycles || []).map(compactCycleForPersistence);
        const compactedAnalytics = compactAnalyticsForPersistence(state.analytics);

        return {
          user: state.user,
          selectedStream: state.selectedStream,
          testAttempts: compactedAttempts,
          analytics: compactedAnalytics,
          currentCycleNumber: state.currentCycleNumber,
          currentCycleQuestionCount: state.currentCycleQuestionCount,
          diagnosticCycles: compactedCycles,
          activeCompletionNotification: state.activeCompletionNotification,
        };
      },
    }
  )
);
