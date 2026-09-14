import { create } from "zustand";
import { Question, QuestionStatus } from "@/types";
import { FullTestMeta } from "@/lib/data/mock50Questions";

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
  isSubmitted: boolean;
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
  submitTest: () => void;
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
  if (!state || !state.visited) return "not_visited";
  const hasAnswer =
    state.selectedOption !== null && state.selectedOption !== undefined;
  if (hasAnswer && state.isMarkedForReview) return "answered_marked_review";
  if (hasAnswer && !state.isMarkedForReview) return "answered";
  if (!hasAnswer && state.isMarkedForReview) return "marked_review";
  return "not_answered";
}

function getStorageKey(testId: string): string {
  return `cuet_cbt_session_${testId}`;
}

interface StoredSession {
  testId: string;
  testMeta: FullTestMeta | null;
  currentQuestionIndex: number;
  durationSeconds: number;
  remainingSeconds: number;
  expiresAt: number | null;
  questionStates: Record<string, QuestionSessionState>;
  isSubmitted: boolean;
  submittedScore: CBTScoreSummary | null;
}

function loadSessionFromStorage(testId: string): StoredSession | null {
  if (typeof window === "undefined" || !testId) return null;
  try {
    const key = getStorageKey(testId);
    const raw =
      window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

function saveSessionToStorage(state: CBTStoreState): void {
  if (typeof window === "undefined" || !state.testId) return;
  try {
    const data: StoredSession = {
      testId: state.testId,
      testMeta: state.testMeta,
      currentQuestionIndex: state.currentQuestionIndex,
      durationSeconds: state.durationSeconds,
      remainingSeconds: state.remainingSeconds,
      expiresAt: state.expiresAt,
      questionStates: state.questionStates,
      isSubmitted: state.isSubmitted,
      submittedScore: state.submittedScore,
    };
    const key = getStorageKey(state.testId);
    const serialized = JSON.stringify(data);
    window.sessionStorage.setItem(key, serialized);
    window.localStorage.setItem(key, serialized);
  } catch {}
}

function clearSessionFromStorage(testId: string): void {
  if (typeof window === "undefined" || !testId) return;
  try {
    const key = getStorageKey(testId);
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
    window.localStorage.removeItem("cuet_cbt_active_session");
  } catch {}
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
  isSubmitted: false,
  submittedScore: null,

  initTest: (testId, meta, questionsList, forceFresh = false) => {
    // If the store is already initialized for this exact testId in memory and not submitted, avoid re-init
    const current = get();
    if (
      !forceFresh &&
      current.isInitialized &&
      current.testId === testId &&
      current.questions.length === questionsList.length &&
      !current.isSubmitted
    ) {
      return;
    }

    // Check storage for existing in-progress session
    // Check storage for existing in-progress session or submitted scorecard
    if (!forceFresh) {
      const stored = loadSessionFromStorage(testId);
      if (stored && stored.testId === testId) {
        // If the test was already submitted, restore the completed scorecard view
        if (stored.isSubmitted && stored.submittedScore) {
          set({
            isInitialized: true,
            testId,
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
              testMeta: meta,
              questions: questionsList,
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
          }
        }
      }
    }

    // Initialize a completely FRESH test session
    clearSessionFromStorage(testId);

    const initialStates: Record<string, QuestionSessionState> = {};
    questionsList.forEach((q, idx) => {
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

    const freshState: Partial<CBTStoreState> = {
      isInitialized: true,
      testId,
      testMeta: meta,
      questions: questionsList,
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
    saveSessionToStorage(get());
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
    saveSessionToStorage(get());
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
    saveSessionToStorage(get());
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
    saveSessionToStorage(get());
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
    saveSessionToStorage(get());
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
    saveSessionToStorage(get());
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
    saveSessionToStorage(get());
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
    saveSessionToStorage(get());
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

    // Save session periodically (every 5 seconds or on important events to reduce write thrashing)
    if (remaining % 5 === 0) {
      saveSessionToStorage(get());
    }
  },

  openSubmitModal: () => {
    set({ isSubmitModalOpen: true });
  },

  closeSubmitModal: () => {
    set({ isSubmitModalOpen: false });
  },

  submitTest: () => {
    const { questions, questionStates, remainingSeconds, durationSeconds } =
      get();

    let attemptedCount = 0;
    let markedReviewCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let timeSinkCount = 0;

    questions.forEach((q) => {
      const qState = questionStates[q.id];
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
        if (qState.selectedOption !== null && qState.selectedOption !== undefined) {
          if (qState.selectedOption === q.correctOptionId) {
            correctCount += 1;
          } else {
            incorrectCount += 1;
          }
        }
      }
    });

    const unattemptedCount = questions.length - attemptedCount;
    // Official CUET NTA Scoring: +5 per correct, -1 per incorrect, 0 for unattempted
    const totalMarks = correctCount * 5 - incorrectCount * 1;
    const maxMarks = questions.length * 5; // 250
    const accuracyPercentage =
      attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
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

    set({
      isSubmitted: true,
      isTimerRunning: false,
      isSubmitModalOpen: false,
      submittedScore: summary,
    });
    saveSessionToStorage(get());
  },

  resetSession: () => {
    const { testId, testMeta, questions } = get();
    if (!testId || !testMeta) return;
    get().initTest(testId, testMeta, questions, true);
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
