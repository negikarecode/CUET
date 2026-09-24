import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  StreamType,
  UserStats,
  UserAnswer,
  RecordedTestAttempt,
  UserAnalyticsSummary,
} from "@/types";
import { computeAnalyticsFromAttempts, buildDefaultSubjectCalibration } from "@/lib/analytics";

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
        const stream = (profile.preferredStream || "science") as StreamType;
        set((state) => {
          const isDifferentUser = state.user?.id !== profile.id;
          return {
            user: {
              ...DEFAULT_USER,
              ...profile,
              id: profile.id || `user_${Date.now()}`,
              name: profile.name || "Aspirant",
              email: profile.email || `${(profile.name || "aspirant").toLowerCase().replace(/\s+/g, "")}@example.com`,
              age: profile.age || "17",
              targetCollege: profile.targetCollege || "SRCC / St. Stephen's (Delhi University)",
              targetUniversity: profile.targetUniversity || "Delhi University",
              targetCourse: profile.targetCourse || "B.Com (Hons)",
              preferredStream: stream,
              selectedSubjects: profile.selectedSubjects || [],
              dailyStreak: profile.dailyStreak ?? 1,
              xpPoints: profile.xpPoints ?? 150,
              campusCoins: profile.campusCoins ?? 50,
              isLoggedIn: true,
              lastActiveDate: new Date().toISOString(),
            },
            selectedStream: stream,
            testAttempts: isDifferentUser ? [] : state.testAttempts,
            analytics: isDifferentUser ? DEFAULT_ANALYTICS : state.analytics,
            isSessionActive: false,
            recordedAnswers: {},
          };
        });
      },

      logout: () => {
        if (typeof document !== "undefined") {
          document.cookie = "cuet_auth=; path=/; max-age=0; SameSite=Lax";
        }
        set({
          user: DEFAULT_USER,
          testAttempts: [],
          analytics: DEFAULT_ANALYTICS,
          isSessionActive: false,
          activeSubject: null,
          recordedAnswers: {},
        });
      },

      // Attempt History & Analytics
      testAttempts: [],
      analytics: DEFAULT_ANALYTICS,

      recordTestAttempt: (attempt: RecordedTestAttempt) => {
        const currentAttempts = get().testAttempts || [];
        // Replace if existing attempt with identical ID or same testId, otherwise prepend
        const existingIdx = currentAttempts.findIndex(
          (a) => a.id === attempt.id || (a.testId && a.testId === attempt.testId)
        );
        let updatedAttempts: RecordedTestAttempt[];
        if (existingIdx >= 0) {
          updatedAttempts = [...currentAttempts];
          updatedAttempts[existingIdx] = attempt;
        } else {
          updatedAttempts = [attempt, ...currentAttempts];
        }

        const analytics = computeAnalyticsFromAttempts(updatedAttempts);

        set((state) => ({
          testAttempts: updatedAttempts,
          analytics,
          user: {
            ...state.user,
            accuracyPercentage: analytics.overallAccuracyPercentage,
            completedTestsCount: analytics.completedTestsCount,
          },
        }));
      },

      recoverUnrecordedCBTSessions: () => {
        if (typeof window === "undefined") return;
        try {
          const currentAttempts = [...(get().testAttempts || [])];
          const recovered: RecordedTestAttempt[] = [];
          let hasChanges = false;

          for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key && (key.startsWith("cuet_cbt_session_") || key === "cuet_cbt_active_session")) {
              const raw = window.localStorage.getItem(key);
              if (!raw) continue;
              try {
                const session = JSON.parse(raw);
                if (session && session.isSubmitted && session.testId) {
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

                  const existingIdx = currentAttempts.findIndex((a) => a.testId === session.testId);

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
                  } else if (finalAttempted > 0 || session.isSubmitted) {
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
                        ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter || "Core"})`,
                        explanation: q.explanation || "",
                      };
                    });

                    const attempt: RecordedTestAttempt = {
                      id: `recovered_${session.testId}`,
                      userId: get().user?.id || "guest",
                      testId: session.testId,
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
            const allAttempts = [...recovered, ...currentAttempts];
            const analytics = computeAnalyticsFromAttempts(allAttempts);
            set((state) => ({
              testAttempts: allAttempts,
              analytics,
              user: {
                ...state.user,
                accuracyPercentage: analytics.overallAccuracyPercentage,
                completedTestsCount: analytics.completedTestsCount,
              },
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
        if (typeof window !== "undefined") {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        user: state.user,
        selectedStream: state.selectedStream,
        testAttempts: state.testAttempts,
        analytics: state.analytics,
      }),
    }
  )
);
