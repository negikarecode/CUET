import { create } from "zustand";
import { Question, QuestionStatus, FullTestMeta, RecordedTestAttempt, RecordedQuestionAttempt } from "@/types";
import { CUET_UG_2026_CONFIG, calculateExamScore } from "@/lib/config/examConfig";
import { useTestStore } from "@/lib/store/useTestStore";
import {
  StoredCBTSession,
  compactQuestionStates,
  saveCBTSessionSync,
  loadCBTSessionSync,
  clearCBTSessionSync,
  cbtAutosave,
  getActiveUserId as getStorageActiveUid,
} from "@/lib/storage/cbt-session-storage";
import { stringToUuid } from "@/lib/utils";
import { normalizeSubject } from "@/lib/analytics";
import { recordRepairEvent } from "@/lib/repair-plan";
import { recordRepairPlanProgress } from "@/lib/repair-plan-v2";
import { resolveQuestionCorrectOptionId, isQuestionDropped, isQuestionUnresolved, isQuestionEligibleForActiveCBT } from "@/lib/scoring";

export interface QuestionSessionState {
  visited: boolean;
  selectedOption: "A" | "B" | "C" | "D" | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
}

export interface CBTScoreSummary {
  attemptedCount: number;
  unattemptedCount: number;
  markedReviewCount: number;
  correctCount: number;
  incorrectCount: number;
  totalMarks: number;
  maxMarks: number;
  accuracyPercentage: number;
  timeTakenSeconds: number;
  timeSinkCount: number;
}

export interface CBTStoreState {
  isInitialized: boolean;
  testId: string;
  testMeta: FullTestMeta | null;
  questions: Question[];
  currentQuestionIndex: number;
  durationSeconds: number;
  remainingSeconds: number;
  expiresAt: number | null;
  isTimerRunning: boolean;
  questionStates: Record<string, QuestionSessionState>;
  /** Backward compatibility alias for questionStates */
  answers: Record<string, QuestionSessionState>;
  isSubmitModalOpen: boolean;
  isExitModalOpen: boolean;
  isSubmitted: boolean;
  isSubmitting: boolean;
  attemptId: string | null;
  submittedScore: CBTScoreSummary | null;

  // Actions
  initTest: (
    testId: string,
    meta: FullTestMeta,
    questionsList: Question[],
    forceFresh?: boolean
  ) => void;
  selectOption: (opt: "A" | "B" | "C" | "D") => void;
  clearResponse: () => void;
  saveAndNext: () => void;
  markForReviewAndNext: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  jumpToQuestion: (index: number) => void;
  tickSecond: () => void;
  openSubmitModal: () => void;
  closeSubmitModal: () => void;
  openExitModal: () => void;
  closeExitModal: () => void;
  abandonTest: () => void;
  submitTest: () => Promise<void>;
  resetSession: () => void;

  // Selectors
  getQuestionStatus: (qId: string) => QuestionStatus;
  getSummaryCounts: () => {
    answered: number;
    notAnswered: number;
    notVisited: number;
    markedReview: number;
    answeredMarkedReview: number;
    total: number;
  };
}

/**
 * Pure state derivation:
 * Determines QuestionStatus based on independent state properties.
 */
export function deriveQuestionStatus(
  state?: QuestionSessionState
): QuestionStatus {
  if (!state) return "not_visited";
  const hasAnswer =
    state.selectedOption !== null && state.selectedOption !== undefined;
  if (hasAnswer && state.isMarkedForReview) return "answered_marked_review";
  if (hasAnswer && !state.isMarkedForReview) return "answered";
  if (!state.visited) return "not_visited";
  if (!hasAnswer && state.isMarkedForReview) return "marked_review";
  return "not_answered";
}

function getActiveUserId(): string {
  if (typeof window === "undefined") return "guest";
  return getStorageActiveUid() || useTestStore.getState().user?.id || "guest";
}

export type StoredSession = StoredCBTSession;

function loadSessionFromStorage(testId: string): StoredCBTSession | null {
  if (typeof window === "undefined" || !testId) return null;
  const currentUid = getActiveUserId();
  return loadCBTSessionSync(testId, currentUid);
}

function saveSessionToStorage(state: CBTStoreState, immediate = false): void {
  if (typeof window === "undefined" || !state.testId) return;
  try {
    const currentUid = getActiveUserId();
    const compactStates = compactQuestionStates(state.questionStates || {});

    const session: StoredCBTSession = {
      version: 2,
      userId: currentUid,
      testId: state.testId,
      attemptId: state.attemptId || undefined,
      testMeta: state.testMeta
        ? {
            id: state.testMeta.id,
            title: state.testMeta.title,
            subject: state.testMeta.subject,
            code: state.testMeta.code,
            totalQuestions: state.testMeta.totalQuestions,
            durationMinutes: state.testMeta.durationMinutes,
            practiceType: state.testMeta.practiceType,
            targetChapter: state.testMeta.targetChapter,
          }
        : null,
      currentQuestionIndex: state.currentQuestionIndex,
      durationSeconds: state.durationSeconds,
      remainingSeconds: state.remainingSeconds,
      expiresAt: state.expiresAt,
      questionStates: compactStates,
      isSubmitted: state.isSubmitted,
      submittedScore: state.submittedScore,
      lastSavedAt: Date.now(),
      saveSequence: 0,
    };

    if (immediate) {
      cbtAutosave.flush();
      saveCBTSessionSync(session);
    } else {
      cbtAutosave.schedule(session);
    }
  } catch (err) {
    console.warn("[useCBTStore] Safe storage save warning:", err);
  }
}

export function clearSessionFromStorage(testId: string): void {
  if (typeof window === "undefined" || !testId) return;
  const currentUid = getActiveUserId();
  clearCBTSessionSync(testId, currentUid);
}

/**
 * Module-level secure exam vault:
 * Retains authentic answer keys and solutions in private closure memory during active testing.
 * Prevents client-side answer inspection via React DevTools or Zustand state before test submission.
 */
const secureExamVault = new Map<string, Question[]>();

export function sanitizeQuestionForActiveExam(q: Question): Question {
  const sanitized = {
    ...q,
    // Withhold answer key, explanation, solutions, and misconception hints during active exam
    explanation: "",
    solution: undefined,
    detailedSolution: undefined,
    misconception: undefined,
    official_answer: undefined,
    solved_answer: undefined,
    wrong_option_analysis: undefined,
    aiDiagnosisNotes: undefined,
    answer_note: undefined,
    options: (q.options || []).map((opt) => ({
      id: opt.id,
      text: opt.text,
    })),
  };
  delete (sanitized as any).correctOptionId;
  delete (sanitized as any).correctOption;
  delete (sanitized as any).correct_option;
  delete (sanitized as any).isCorrect;
  delete (sanitized as any).detailedSolution;
  delete (sanitized as any).acceptedAnswers;
  delete (sanitized as any).acceptedOptions;
  delete (sanitized as any).accepted_answers;
  delete (sanitized as any).accepted_options;
  return sanitized as Question;
}

export const useCBTStore = create<CBTStoreState>()((set, get) => ({
  isInitialized: false,
  testId: "",
  testMeta: null,
  questions: [],
  currentQuestionIndex: 0,
  durationSeconds: 3600,
  remainingSeconds: 3600,
  expiresAt: null,
  isTimerRunning: false,
  questionStates: {},
  answers: {},
  isSubmitModalOpen: false,
  isExitModalOpen: false,
  isSubmitted: false,
  isSubmitting: false,
  attemptId: null,
  submittedScore: null,

  initTest: (testId, meta, questionsList, forceFresh = false) => {
    if (!questionsList || questionsList.length === 0) {
      console.warn(`[useCBTStore] Cannot initialize test "${testId}": questions list is empty.`);
      return;
    }

    // Store full question payload in private vault
    if (questionsList && questionsList.length > 0) {
      secureExamVault.set(testId, questionsList);
    }

    // If the store is already initialized for this exact testId in memory and not submitted, avoid re-init
    const current = get();
    if (
      !forceFresh &&
      current.isInitialized &&
      current.testId === testId &&
      current.questions.length === questionsList.length &&
      !current.isSubmitted
    ) {
      if (!current.attemptId) {
        set({
          attemptId:
            typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : stringToUuid(`${testId}_${Date.now()}`),
        });
      }
      return;
    }

    // Check storage for existing in-progress session
    // Check storage for existing in-progress session or submitted scorecard
    if (!forceFresh) {
      const stored = loadSessionFromStorage(testId);
      if (stored && stored.testId === testId) {
        const storedAttemptId =
          stored.attemptId ||
          (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : stringToUuid(`${testId}_${Date.now()}`));

        // If the test was already submitted, restore the completed scorecard view
        if (stored.isSubmitted && stored.submittedScore) {
          set({
            isInitialized: true,
            testId,
            attemptId: storedAttemptId,
            testMeta: meta,
            questions: questionsList,
            currentQuestionIndex: stored.currentQuestionIndex || 0,
            durationSeconds: stored.durationSeconds || (meta.durationMinutes || 60) * 60,
            remainingSeconds: stored.remainingSeconds || 0,
            expiresAt: stored.expiresAt,
            isTimerRunning: false,
            questionStates: stored.questionStates || {},
            answers: stored.questionStates || {},
            isSubmitModalOpen: false,
            isSubmitted: true,
            submittedScore: stored.submittedScore,
          });
          return;
        }

        // If the test was in-progress and still has time remaining
        if (
          !stored.isSubmitted &&
          stored.questionStates &&
          stored.expiresAt
        ) {
          const remaining = Math.max(
            0,
            Math.round((stored.expiresAt - Date.now()) / 1000)
          );

          if (remaining > 0) {
            // Restore in-progress attempt
            const validIndex =
              stored.currentQuestionIndex >= 0 &&
              stored.currentQuestionIndex < questionsList.length
                ? stored.currentQuestionIndex
                : 0;

            // Ensure the currently active question is marked visited
            const currentQ = questionsList[validIndex];
            const restoredStates = { ...stored.questionStates };
            if (currentQ) {
              restoredStates[currentQ.id] = {
                ...(restoredStates[currentQ.id] || {
                  selectedOption: null,
                  isMarkedForReview: false,
                  timeSpentSeconds: 0,
                }),
                visited: true,
              };
            }

            set({
              isInitialized: true,
              testId,
              attemptId: storedAttemptId,
              testMeta: meta,
              questions: questionsList.map(sanitizeQuestionForActiveExam),
              currentQuestionIndex: validIndex,
              durationSeconds: stored.durationSeconds || (meta.durationMinutes || 60) * 60,
              remainingSeconds: remaining,
              expiresAt: stored.expiresAt,
              isTimerRunning: true,
              questionStates: restoredStates,
              answers: restoredStates,
              isSubmitModalOpen: false,
              isSubmitted: false,
              submittedScore: null,
            });
            return;
          } else {
            // Timer expired while candidate was away: restore answers and auto-submit
            const validIndex =
              stored.currentQuestionIndex >= 0 &&
              stored.currentQuestionIndex < questionsList.length
                ? stored.currentQuestionIndex
                : 0;

            set({
              isInitialized: true,
              testId,
              attemptId: storedAttemptId,
              testMeta: meta,
              questions: questionsList.map(sanitizeQuestionForActiveExam),
              currentQuestionIndex: validIndex,
              durationSeconds: stored.durationSeconds || (meta.durationMinutes || 60) * 60,
              remainingSeconds: 0,
              expiresAt: stored.expiresAt,
              isTimerRunning: false,
              questionStates: stored.questionStates,
              answers: stored.questionStates,
              isSubmitModalOpen: false,
              isSubmitted: false,
              submittedScore: null,
            });
            setTimeout(() => {
              get().submitTest();
            }, 0);
            return;
          }
        }
      }
    }

    // Initialize a completely FRESH test session
    cbtAutosave.cancel(testId);
    clearSessionFromStorage(testId);

    // Defense-in-depth: Ensure quarantined/ineligible questions never enter candidate session
    const activeQuestions = questionsList.filter(isQuestionEligibleForActiveCBT);

    const initialStates: Record<string, QuestionSessionState> = {};
    activeQuestions.forEach((q, idx) => {
      initialStates[q.id] = {
        // ONLY Question 1 is initially visited! Questions 2-50 are NOT visited.
        visited: idx === 0,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };
    });

    const durationSec = (meta?.durationMinutes ?? 60) * 60;
    const expiresAt = Date.now() + durationSec * 1000;
    const freshAttemptId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : stringToUuid(`${testId}_${Date.now()}`);

    const freshState: Partial<CBTStoreState> = {
      isInitialized: true,
      testId,
      attemptId: freshAttemptId,
      testMeta: meta,
      questions: activeQuestions.map(sanitizeQuestionForActiveExam),
      currentQuestionIndex: 0,
      durationSeconds: durationSec,
      remainingSeconds: durationSec,
      expiresAt,
      isTimerRunning: true,
      questionStates: initialStates,
      answers: initialStates,
      isSubmitModalOpen: false,
      isSubmitted: false,
      submittedScore: null,
    };

    set(freshState);
    saveSessionToStorage(get(), true);
  },

  selectOption: (opt) => {
    const { isSubmitted, questions, currentQuestionIndex, questionStates } = get();
    if (isSubmitted) return;
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const existing = questionStates[currentQ.id] || {
      visited: true,
      selectedOption: null,
      isMarkedForReview: false,
      timeSpentSeconds: 0,
    };

    const updatedStates = {
      ...questionStates,
      [currentQ.id]: {
        ...existing,
        visited: true,
        selectedOption: opt,
      },
    };

    set({
      questionStates: updatedStates,
      answers: updatedStates,
    });
    saveSessionToStorage(get(), false);
  },

  clearResponse: () => {
    const { isSubmitted, questions, currentQuestionIndex, questionStates } = get();
    if (isSubmitted) return;
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const existing = questionStates[currentQ.id];
    if (!existing) return;

    // Clear answer, but keep visited: true!
    const updatedStates = {
      ...questionStates,
      [currentQ.id]: {
        ...existing,
        visited: true,
        selectedOption: null,
      },
    };

    set({
      questionStates: updatedStates,
      answers: updatedStates,
    });
    saveSessionToStorage(get(), false);
  },

  saveAndNext: () => {
    const { isSubmitted, questions, currentQuestionIndex, questionStates } = get();
    if (isSubmitted) return;
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const existing = questionStates[currentQ.id];
    let updatedStates = questionStates;

    // NTA CBT Standard: Save & Next clears Marked for Review on current question if an answer was provided
    if (existing) {
      updatedStates = {
        ...updatedStates,
        [currentQ.id]: {
          ...existing,
          visited: true,
          isMarkedForReview: false,
        },
      };
    }

    const nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
    const nextQ = questions[nextIndex];

    // Mark next question visited ONLY when navigated to
    if (nextQ) {
      const nextExisting = updatedStates[nextQ.id] || {
        visited: false,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };
      updatedStates = {
        ...updatedStates,
        [nextQ.id]: {
          ...nextExisting,
          visited: true,
        },
      };
    }

    set({
      questionStates: updatedStates,
      answers: updatedStates,
      currentQuestionIndex: nextIndex,
    });
    saveSessionToStorage(get(), false);
  },

  markForReviewAndNext: () => {
    const { isSubmitted, questions, currentQuestionIndex, questionStates } = get();
    if (isSubmitted) return;
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const existing = questionStates[currentQ.id] || {
      visited: true,
      selectedOption: null,
      isMarkedForReview: false,
      timeSpentSeconds: 0,
    };

    let updatedStates = {
      ...questionStates,
      [currentQ.id]: {
        ...existing,
        visited: true,
        isMarkedForReview: true,
      },
    };

    const nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
    const nextQ = questions[nextIndex];

    if (nextQ) {
      const nextExisting = updatedStates[nextQ.id] || {
        visited: false,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };
      updatedStates = {
        ...updatedStates,
        [nextQ.id]: {
          ...nextExisting,
          visited: true,
        },
      };
    }

    set({
      questionStates: updatedStates,
      answers: updatedStates,
      currentQuestionIndex: nextIndex,
    });
    saveSessionToStorage(get(), false);
  },

  goToPrevious: () => {
    const { currentQuestionIndex, questions, questionStates } = get();
    if (currentQuestionIndex <= 0) return;
    const prevIndex = currentQuestionIndex - 1;
    const prevQ = questions[prevIndex];

    let updatedStates = questionStates;
    if (prevQ) {
      const existing = updatedStates[prevQ.id] || {
        visited: false,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };
      updatedStates = {
        ...updatedStates,
        [prevQ.id]: {
          ...existing,
          visited: true,
        },
      };
    }

    set({
      currentQuestionIndex: prevIndex,
      questionStates: updatedStates,
      answers: updatedStates,
    });
    saveSessionToStorage(get(), false);
  },

  goToNext: () => {
    const { currentQuestionIndex, questions, questionStates } = get();
    if (currentQuestionIndex >= questions.length - 1) return;
    const nextIndex = currentQuestionIndex + 1;
    const nextQ = questions[nextIndex];

    let updatedStates = questionStates;
    if (nextQ) {
      const existing = updatedStates[nextQ.id] || {
        visited: false,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };
      updatedStates = {
        ...updatedStates,
        [nextQ.id]: {
          ...existing,
          visited: true,
        },
      };
    }

    set({
      currentQuestionIndex: nextIndex,
      questionStates: updatedStates,
      answers: updatedStates,
    });
    saveSessionToStorage(get(), false);
  },

  jumpToQuestion: (index) => {
    const { questions, questionStates } = get();
    if (index < 0 || index >= questions.length) return;
    const targetQ = questions[index];

    let updatedStates = questionStates;
    if (targetQ) {
      const existing = updatedStates[targetQ.id] || {
        visited: false,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };
      updatedStates = {
        ...updatedStates,
        [targetQ.id]: {
          ...existing,
          visited: true,
        },
      };
    }

    set({
      currentQuestionIndex: index,
      questionStates: updatedStates,
      answers: updatedStates,
    });
    saveSessionToStorage(get(), false);
  },

  tickSecond: () => {
    const {
      isSubmitted,
      isTimerRunning,
      expiresAt,
      questions,
      currentQuestionIndex,
      questionStates,
    } = get();

    if (isSubmitted || !isTimerRunning) return;

    const now = Date.now();
    let remaining = 0;

    if (expiresAt) {
      remaining = Math.max(0, Math.round((expiresAt - now) / 1000));
    } else {
      remaining = Math.max(0, get().remainingSeconds - 1);
    }

    if (remaining <= 0) {
      set({ remainingSeconds: 0, isTimerRunning: false });
      get().submitTest();
      return;
    }

    const currentQ = questions[currentQuestionIndex];
    let updatedStates = questionStates;

    if (currentQ) {
      const existing = questionStates[currentQ.id] || {
        visited: true,
        selectedOption: null,
        isMarkedForReview: false,
        timeSpentSeconds: 0,
      };

      updatedStates = {
        ...questionStates,
        [currentQ.id]: {
          ...existing,
          visited: true,
          timeSpentSeconds: existing.timeSpentSeconds + 1,
        },
      };
    }

    set({
      remainingSeconds: remaining,
      questionStates: updatedStates,
      answers: updatedStates,
    });

    // Save session periodically (every 30 seconds to prevent write thrashing while ensuring timer integrity)
    if (remaining % 30 === 0) {
      saveSessionToStorage(get(), false);
    }
  },

  openSubmitModal: () => {
    set({ isSubmitModalOpen: true });
  },

  closeSubmitModal: () => {
    set({ isSubmitModalOpen: false });
  },

  openExitModal: () => {
    set({ isExitModalOpen: true });
  },

  closeExitModal: () => {
    set({ isExitModalOpen: false });
  },

  abandonTest: () => {
    const { testId } = get();
    if (testId) {
      clearSessionFromStorage(testId);
    }
    set({
      isInitialized: false,
      testId: "",
      testMeta: null,
      questions: [],
      currentQuestionIndex: 0,
      durationSeconds: 3600,
      remainingSeconds: 3600,
      expiresAt: null,
      isTimerRunning: false,
      questionStates: {},
      answers: {},
      isSubmitModalOpen: false,
      isExitModalOpen: false,
      isSubmitted: false,
      isSubmitting: false,
      attemptId: null,
      submittedScore: null,
    });
  },

  submitTest: async () => {
    const { testId, questions, questionStates, remainingSeconds, durationSeconds, isSubmitted, isSubmitting } =
      get();

    // Prevent duplicate submissions atomically
    if (isSubmitted || isSubmitting) return;
    set({ isSubmitting: true, isTimerRunning: false });

    // Generate or retrieve one consistent attemptId UUID for this test submission
    let currentAttemptId = get().attemptId;
    if (!currentAttemptId) {
      currentAttemptId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : stringToUuid(`${testId || "cbt_exam"}_${Date.now()}`);
      set({ attemptId: currentAttemptId });
    }

    try {
      // Immediately flush any debounced state saves before computing final score
      cbtAutosave.flush();

      // Check if we need to reveal authoritative questions from server first
      let authQuestions = secureExamVault.get(testId) || questions;

      // Ensure all available question keys are resolved locally
      authQuestions = authQuestions.map((q) => {
        const resolvedKey = resolveQuestionCorrectOptionId(q);
        if (resolvedKey && !q.correctOptionId) {
          return { ...q, correctOptionId: resolvedKey };
        }
        return q;
      });

      const hasRevealedKey = Boolean(
        authQuestions.some((q) => Boolean(resolveQuestionCorrectOptionId(q)))
      );
      if (typeof window !== "undefined" && window.location?.origin && !hasRevealedKey) {
        try {
          const res = await fetch(`/api/test/${testId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "submit",
              attemptId: currentAttemptId,
              questionStates,
              answersSubmitted: true,
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.questions && Array.isArray(data.questions) && data.questions.length > 0) {
              authQuestions = data.questions.map((q: any) => {
                const resolvedKey = resolveQuestionCorrectOptionId(q);
                if (resolvedKey && !q.correctOptionId) {
                  return { ...q, correctOptionId: resolvedKey };
                }
                return q;
              });
              secureExamVault.set(testId, authQuestions);
            }
          }
        } catch (err) {
          console.warn("Error fetching authoritative exam solutions:", err);
        }
      }

      let attemptedCount = 0;
      let markedReviewCount = 0;
      let correctCount = 0;
      let incorrectCount = 0;
      let timeSinkCount = 0;

      authQuestions.forEach((q) => {
        const qState = questionStates[q.id] || questionStates[q.questionId || ""];
        const status = deriveQuestionStatus(qState);

        if (status === "answered" || status === "answered_marked_review") {
          attemptedCount += 1;
        }
        if (status === "marked_review" || status === "answered_marked_review") {
          markedReviewCount += 1;
        }

        if (qState) {
          if (qState.timeSpentSeconds > 72) {
            timeSinkCount += 1;
          }
          const isDrop = isQuestionDropped(q);
          const isUnres = isQuestionUnresolved(q);
          const correctKey = resolveQuestionCorrectOptionId(q);
          if (qState.selectedOption !== null && qState.selectedOption !== undefined) {
            if (isDrop) {
              correctCount += 1;
            } else if (isUnres) {
              // Unresolved question: candidate receives NO mark and NO penalty
            } else if (correctKey && qState.selectedOption === correctKey) {
              correctCount += 1;
            } else if (correctKey) {
              incorrectCount += 1;
            }
          }
        }
      });

      const isMathExam =
        authQuestions.length === 85 ||
        (get().testMeta?.subject && get().testMeta!.subject.toLowerCase().includes("math")) ||
        authQuestions.some((q) => q.section === "B1" || q.section === "B2");
      const targetTotalQuestions = isMathExam ? 40 : authQuestions.length;
      const unattemptedCount = Math.max(0, targetTotalQuestions - attemptedCount);
      // Official CUET NTA 2026 Scoring: +5 per correct, -1 per incorrect, 0 for unattempted
      const { totalMarks, maxMarks } = calculateExamScore(
        correctCount,
        incorrectCount,
        unattemptedCount,
        CUET_UG_2026_CONFIG,
        targetTotalQuestions
      );
      const scorableAttempted = correctCount + incorrectCount;
      const accuracyPercentage =
        scorableAttempted > 0 ? Math.round((correctCount / scorableAttempted) * 100) : 0;
      const timeTakenSeconds = Math.max(0, durationSeconds - remainingSeconds);

      const summary: CBTScoreSummary = {
        attemptedCount,
        unattemptedCount,
        markedReviewCount,
        correctCount,
        incorrectCount,
        totalMarks,
        maxMarks,
        accuracyPercentage,
        timeTakenSeconds,
        timeSinkCount,
      };

      let finalScoreSummary: CBTScoreSummary = summary;
      let finalQuestions: Question[] = authQuestions;

      // Build verified attempt record for store analytics and authoritative submission
      try {
        const storeUser = useTestStore.getState().user;
        const meta = get().testMeta;
        const questionAttempts: RecordedQuestionAttempt[] = authQuestions.map((q) => {
          const qState = questionStates[q.id] || questionStates[q.questionId || ""];
          const selectedOption = qState?.selectedOption ?? null;
          const isDrop = isQuestionDropped(q);
          const isUnres = isQuestionUnresolved(q);
          const correctKey = isDrop ? "DROPPED" : isUnres ? "" : (resolveQuestionCorrectOptionId(q) || "");
          const isCorrect = isDrop
            ? true
            : isUnres
            ? null
            : selectedOption !== null && selectedOption !== undefined && correctKey
            ? selectedOption === correctKey
            : null;
          const timeSpent = qState?.timeSpentSeconds ?? 0;
          return {
            questionId: q.id,
            conceptId: q.conceptId,
            questionNumber: q.questionNumber,
            subject: meta?.subject ?? "Physics",
            chapter: q.chapter || q.topic || "Domain Core",
            microTopic: q.topic,
            prompt: q.prompt,
            options: q.options,
            questionType: q.questionType,
            selectedOption,
            correctOption: (correctKey || "") as any,
            isCorrect,
            timeSpentSeconds: timeSpent,
            isTimeSink: timeSpent > 72,
            difficulty: String(q.difficulty),
            ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter || q.topic})`,
            explanation: isUnres ? "Pending expert verification." : q.explanation,
            solution: isUnres ? undefined : q.solution,
            formula: q.formula,
            keyConcept: q.keyConcept,
            misconception: q.misconception,
          };
        });

        const effectiveAttemptId =
          get().attemptId ||
          (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : stringToUuid(`${testId || meta?.id || "cbt_exam"}_${Date.now()}`));

        const canonicalAttemptId = `attempt_${effectiveAttemptId}`;
        const effectiveTestId = meta?.id ?? testId ?? "cbt_exam";
        const normSub = normalizeSubject(meta?.subject || effectiveTestId || "physics");
        const resolvedSubject = meta?.subject || normSub.name || "Physics";
        const resolvedTitle =
          meta?.title ||
          (effectiveTestId && effectiveTestId !== "cbt_exam"
            ? `CUET UG ${resolvedSubject} Test`
            : "CUET Domain Examination Paper");

        const attemptRecord: RecordedTestAttempt = {
          id: canonicalAttemptId,
          attemptId: effectiveAttemptId,
          userId: storeUser?.id || "guest",
          testId: effectiveTestId,
          testTitle: resolvedTitle,
          subject: resolvedSubject,
          totalQuestions: authQuestions.length,
          attemptedCount: summary.attemptedCount,
          unattemptedCount: summary.unattemptedCount,
          correctCount: summary.correctCount,
          incorrectCount: summary.incorrectCount,
          totalMarks: summary.totalMarks,
          maxMarks: summary.maxMarks,
          accuracyPercentage: summary.accuracyPercentage,
          timeTakenSeconds: summary.timeTakenSeconds,
          timeSinkCount: summary.timeSinkCount,
          submittedAt: new Date().toISOString(),
          questions: questionAttempts,
        };

        // Advance learning coach repair lifecycle if this was a targeted drill or retest
        try {
          const isDrill =
            meta?.practiceType === "drill" ||
            (effectiveTestId && typeof effectiveTestId === "string" && effectiveTestId.startsWith("repair_quiz") && !meta?.practiceType);
          const isRetest = meta?.practiceType === "retest";

          if (isDrill) {
            const targetTopic = meta?.targetChapter || resolvedSubject;
            recordRepairEvent(storeUser?.id || "guest", targetTopic, "drill_completed", { score: summary.accuracyPercentage });
            recordRepairPlanProgress({
              userId: storeUser?.id,
              subject: resolvedSubject,
              chapter: targetTopic,
              completedStep: 2,
              scoreOrAccuracy: summary.accuracyPercentage,
            });
          } else if (isRetest) {
            const targetTopic = meta?.targetChapter || resolvedSubject;
            recordRepairEvent(storeUser?.id || "guest", targetTopic, "retest_completed", { accuracy: summary.accuracyPercentage });
            recordRepairPlanProgress({
              userId: storeUser?.id,
              subject: resolvedSubject,
              chapter: targetTopic,
              completedStep: 3,
              scoreOrAccuracy: summary.accuracyPercentage,
            });
          }
        } catch (repairErr) {
          console.warn("Repair lifecycle update notice:", repairErr);
        }

        // Authoritative Server Evaluation and Persistence before opening scorecard
        let recordedOnServer = false;
        if (typeof window !== "undefined" && window.location?.origin) {
          try {
            const res = await fetch("/api/test/record-attempt", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(attemptRecord),
            });
            if (res.ok) {
              const data = await res.json();
              if (data?.questions && Array.isArray(data.questions) && data.questions.length > 0) {
                finalQuestions = data.questions.map((q: any) => {
                  const resolvedKey = resolveQuestionCorrectOptionId(q);
                  if (resolvedKey && !q.correctOptionId) {
                    return { ...q, correctOptionId: resolvedKey };
                  }
                  return q;
                });
                secureExamVault.set(testId, finalQuestions);
              }
              if (data?.attempt) {
                recordedOnServer = true;
                finalScoreSummary = {
                  attemptedCount: data.attempt.attemptedCount ?? summary.attemptedCount,
                  unattemptedCount: data.attempt.unattemptedCount ?? summary.unattemptedCount,
                  markedReviewCount: summary.markedReviewCount,
                  correctCount: data.attempt.correctCount ?? summary.correctCount,
                  incorrectCount: data.attempt.incorrectCount ?? summary.incorrectCount,
                  totalMarks: data.attempt.totalMarks ?? summary.totalMarks,
                  maxMarks: data.attempt.maxMarks ?? summary.maxMarks,
                  accuracyPercentage: data.attempt.accuracyPercentage ?? summary.accuracyPercentage,
                  timeTakenSeconds: summary.timeTakenSeconds,
                  timeSinkCount: summary.timeSinkCount,
                };
                useTestStore.getState().recordTestAttempt({
                  ...attemptRecord,
                  ...data.attempt,
                  questions: (data.attempt.questions && data.attempt.questions.length > 0)
                    ? data.attempt.questions
                    : attemptRecord.questions,
                });
              }
              if (typeof data?.streak === "number") {
                useTestStore.getState().setStreak(data.streak);
              }
            }
          } catch (err) {
            console.warn("Server attempt record notice:", err);
          }
        }

        if (!recordedOnServer) {
          useTestStore.getState().recordTestAttempt(attemptRecord);
        }
      } catch (err) {
        console.warn("Failed to record test attempt:", err);
      }

      set({
        questions: finalQuestions,
        isSubmitted: true,
        isTimerRunning: false,
        isSubmitModalOpen: false,
        submittedScore: finalScoreSummary,
      });

      // Synchronously persist submitted scorecard so refresh displays results rather than resetting
      saveSessionToStorage(get(), true);
    } finally {
      set({ isSubmitting: false });
    }
  },

  resetSession: () => {
    const { testId, testMeta, questions } = get();
    if (!testId || !testMeta) return;
    const fullQuestions = secureExamVault.get(testId) || questions;
    get().initTest(testId, testMeta, fullQuestions, true);
  },

  getQuestionStatus: (qId: string) => {
    const { questionStates } = get();
    return deriveQuestionStatus(questionStates[qId]);
  },

  getSummaryCounts: () => {
    const { questions, questionStates } = get();
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let markedReview = 0;
    let answeredMarkedReview = 0;

    questions.forEach((q) => {
      const status = deriveQuestionStatus(questionStates[q.id]);
      if (status === "answered") answered++;
      else if (status === "not_answered") notAnswered++;
      else if (status === "not_visited") notVisited++;
      else if (status === "marked_review") markedReview++;
      else if (status === "answered_marked_review") answeredMarkedReview++;
    });

    return {
      answered,
      notAnswered,
      notVisited,
      markedReview,
      answeredMarkedReview,
      total: questions.length,
    };
  },
}));
