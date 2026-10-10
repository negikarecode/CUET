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
import { computeAnalyticsFromAttempts, buildDefaultSubjectCalibration } from "@/lib/analytics";
import { processQuestionsIntoCycles } from "@/lib/cycle-engine";
import { evaluateSessionValidity } from "@/lib/session-validity";

interface TestStoreState {
  // Gamification & User Auth state
  user: UserStats;
  selectedStream: StreamType;
  setSelectedStream: (stream: StreamType) => void;
  incrementStreak: () => void;
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
      "Complete your first 50-question diagnostic test to establish your baseline pace and detect trap options.",
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

export const useTestStore = create<TestStoreState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      selectedStream: "science",

      setSelectedStream: (stream: StreamType) => {
        set({ selectedStream: stream });
      },

      incrementStreak: () => {
        set((state) => ({
          user: {
            ...state.user,
            dailyStreak: state.user.dailyStreak + 1,
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
          window.localStorage.setItem("cuet_active_uid", targetId);
          // Check if this user already has persisted user-scoped data
          const existingDataStr = window.localStorage.getItem(`cuet_ai_prep_session_storage:${targetId}`);
          if (existingDataStr) {
            try {
              const parsed = JSON.parse(existingDataStr);
              if (parsed?.state?.user && parsed.state.user.id === targetId) {
                // Restore target user's existing isolated data merged with latest profile
                const savedAttempts = parsed.state.testAttempts || [];
                const savedCycles = parsed.state.diagnosticCycles || [];
                const savedAnalytics = parsed.state.analytics || computeAnalyticsFromAttempts(savedAttempts);

                set({
                  user: {
                    ...parsed.state.user,
                    ...profile,
                    id: targetId,
                    isLoggedIn: true,
                    lastActiveDate: new Date().toISOString(),
                  },
                  selectedStream: parsed.state.selectedStream || stream,
                  testAttempts: savedAttempts,
                  analytics: savedAnalytics,
                  currentCycleNumber: parsed.state.currentCycleNumber || 1,
                  currentCycleQuestionCount: parsed.state.currentCycleQuestionCount || 0,
                  diagnosticCycles: savedCycles,
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
            dailyStreak: profile.dailyStreak ?? 1,
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
          window.localStorage.removeItem("cuet_active_uid");
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

      recordTestAttempt: async (attempt: RecordedTestAttempt) => {
        const testKey = (attempt.testId || attempt.id || "").trim();
        if (!testKey) return;

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
        // Strictly deduplicate by testId: replace existing, otherwise prepend
        const existingIdx = currentAttempts.findIndex(
          (a) => (a.testId && a.testId.trim() === testKey) || a.id === attempt.id
        );

        let updatedAttempts: RecordedTestAttempt[];
        if (existingIdx >= 0) {
          updatedAttempts = [...currentAttempts];
          updatedAttempts[existingIdx] = enrichedAttempt;
        } else {
          updatedAttempts = [enrichedAttempt, ...currentAttempts];
        }

        // Canonical analytics computation (guarantees 1 question = 1 attempt)
        const analytics = computeAnalyticsFromAttempts(updatedAttempts);

        // Calculate XP delta: low effort gets 5 XP, normal gets full 50 XP
        const xpAward = validity.isLowEffort ? 5 : 50;

        // Synchronously update testAttempts and analytics IMMEDIATELY so any concurrent read sees the recorded attempt
        set((state) => ({
          testAttempts: updatedAttempts,
          analytics,
          user: {
            ...state.user,
            accuracyPercentage: analytics.overallAccuracyPercentage,
            completedTestsCount: analytics.completedTestsCount,
            xpPoints: (state.user.xpPoints || 0) + xpAward,
          },
        }));

        // Collect all individual question attempts across all recorded tests (ordered chronologically)
        const chronologicalAttempts = [...updatedAttempts].reverse();
        const allQuestions = chronologicalAttempts.flatMap((t) => t.questions || []);

        // Process questions into 150-question diagnostic cycles idempotently
        const existingCycles = get().diagnosticCycles || [];
        const {
          cycles,
          currentCycleNumber,
          currentCycleQuestionCount,
          justCompletedCycle,
        } = await processQuestionsIntoCycles(existingCycles, allQuestions);

        let completionNotification: CycleCompletionNotification | null = null;
        if (justCompletedCycle) {
          completionNotification = {
            cycleNumber: justCompletedCycle.cycleNumber,
            totalAnalyzed: justCompletedCycle.totalQuestionsAttempted,
            isBaseline: justCompletedCycle.cycleNumber === 1,
            completedAt: justCompletedCycle.completedAt || new Date().toISOString(),
            comparisonSummary: justCompletedCycle.comparison
              ? {
                  improvedCount: justCompletedCycle.comparison.improved.length,
                  recurringCount: justCompletedCycle.comparison.recurringWeak.length,
                  resolvedCount: justCompletedCycle.comparison.resolved.length,
                  newMistakesCount: justCompletedCycle.comparison.newMistakes.length,
                  declinedCount: justCompletedCycle.comparison.declined.length,
                }
              : undefined,
          };
        }

        set((state) => ({
          diagnosticCycles: cycles,
          currentCycleNumber,
          currentCycleQuestionCount,
          activeCompletionNotification: completionNotification || state.activeCompletionNotification,
        }));
      },

      recoverUnrecordedCBTSessions: () => {
        if (typeof window === "undefined") return;
        try {
          const currentAttempts = [...(get().testAttempts || [])];
          const activeUid = get().user?.id || (typeof window !== "undefined" ? window.localStorage.getItem("cuet_active_uid") : null);
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

                  const existingIdx = currentAttempts.findIndex((a) => a.testId === sTestId);

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
                  } else if (!seenTestIds.has(sTestId) && (finalAttempted > 0 || session.isSubmitted)) {
                    seenTestIds.add(sTestId);
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
                  }
                }
              } catch {}
            }
          }

          if (hasChanges || recovered.length > 0) {
            // Deduplicate all attempts strictly by testId
            const dedupMap = new Map<string, RecordedTestAttempt>();
            [...currentAttempts, ...recovered].forEach((att) => {
              const k = (att.testId || att.id).trim();
              if (!dedupMap.has(k)) {
                dedupMap.set(k, att);
              }
            });
            const allAttempts = Array.from(dedupMap.values());
            const analytics = computeAnalyticsFromAttempts(allAttempts);
            const chronologicalAttempts = [...allAttempts].reverse();
            const allQuestions = chronologicalAttempts.flatMap((t) => t.questions || []);
            const existingCycles = get().diagnosticCycles || [];

            set((state) => ({
              testAttempts: allAttempts,
              analytics,
              user: {
                ...state.user,
                accuracyPercentage: analytics.overallAccuracyPercentage,
                completedTestsCount: analytics.completedTestsCount,
              },
            }));

            processQuestionsIntoCycles(existingCycles, allQuestions).then(
              ({ cycles, currentCycleNumber, currentCycleQuestionCount }) => {
                set(() => ({
                  diagnosticCycles: cycles,
                  currentCycleNumber,
                  currentCycleQuestionCount,
                }));
              }
            );
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
            const activeUid = window.localStorage.getItem("cuet_active_uid");
            if (activeUid) {
              const userScoped = window.localStorage.getItem(`cuet_ai_prep_session_storage:${activeUid}`);
              if (userScoped) return userScoped;
            }
            // Fallback for guest
            const guestScoped = window.localStorage.getItem("cuet_ai_prep_session_storage:guest");
            if (guestScoped) return guestScoped;

            // Safe migration: ONLY if legacy data explicitly has an id that matches activeUid
            const legacy = window.localStorage.getItem("cuet_ai_prep_session_storage");
            if (legacy) {
              try {
                const parsed = JSON.parse(legacy);
                const legacyUserId = parsed?.state?.user?.id;
                // If legacy owner matches current activeUid, migrate it safely
                if (legacyUserId && activeUid && legacyUserId === activeUid) {
                  window.localStorage.setItem(`cuet_ai_prep_session_storage:${activeUid}`, legacy);
                  window.localStorage.removeItem("cuet_ai_prep_session_storage");
                  return legacy;
                }
              } catch {
                // Ignore parse errors
              }
            }
            return null;
          },
          setItem: (_name: string, value: string) => {
            try {
              const parsed = JSON.parse(value);
              const userId = parsed?.state?.user?.id;
              if (userId && userId !== "guest") {
                window.localStorage.setItem("cuet_active_uid", userId);
                window.localStorage.setItem(`cuet_ai_prep_session_storage:${userId}`, value);
              } else {
                window.localStorage.removeItem("cuet_active_uid");
                window.localStorage.setItem("cuet_ai_prep_session_storage:guest", value);
              }
            } catch {
              window.localStorage.removeItem("cuet_active_uid");
              window.localStorage.setItem(`cuet_ai_prep_session_storage:guest`, value);
            }
          },
          removeItem: (_name: string) => {
            const activeUid = window.localStorage.getItem("cuet_active_uid") || "guest";
            window.localStorage.removeItem(`cuet_ai_prep_session_storage:${activeUid}`);
          },
        };
      }),
      partialize: (state) => ({
        user: state.user,
        selectedStream: state.selectedStream,
        testAttempts: state.testAttempts,
        analytics: state.analytics,
        currentCycleNumber: state.currentCycleNumber,
        currentCycleQuestionCount: state.currentCycleQuestionCount,
        diagnosticCycles: state.diagnosticCycles,
        activeCompletionNotification: state.activeCompletionNotification,
      }),
    }
  )
);
