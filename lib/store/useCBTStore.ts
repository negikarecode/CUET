import { create } from "zustand";
import { Question, QuestionStatus, FullTestMeta, RecordedTestAttempt, RecordedQuestionAttempt } from "@/types";
import { CUET_UG_2026_CONFIG, calculateExamScore } from "@/lib/config/examConfig";
import { useTestStore } from "@/lib/store/useTestStore";

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

function pruneOldStorageSessions(): void {
  if (typeof window === "undefined") return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith("cuet_cbt_session_")) {
        keysToRemove.push(k);
      }
    }
    // Remove oldest completed sessions to relieve quota pressure
    keysToRemove.slice(0, Math.max(1, Math.ceil(keysToRemove.length / 2))).forEach((k) => {
      window.localStorage.removeItem(k);
    });
  } catch {}
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
    try {
      window.sessionStorage.setItem(key, serialized);
    } catch {}

    try {
      window.localStorage.setItem(key, serialized);
    } catch (storageErr) {
      // Safe Quota Handling: Prune old completed sessions and retry
      pruneOldStorageSessions();
      try {
        window.localStorage.setItem(key, serialized);
      } catch {
        // Fallback gracefully without crashing the exam interface
      }
    }
  } catch {}
}

export function clearSessionFromStorage(testId: string): void {
  if (typeof window === "undefined" || !testId) return;
  try {
    const key = getStorageKey(testId);
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
    window.localStorage.removeItem("cuet_cbt_active_session");
  } catch {}
}

/**
 * Module-level secure exam vault:
 * Retains authentic answer keys and solutions in private closure memory during active testing.
 * Prevents client-side answer inspection via React DevTools or Zustand state before test submission.
 */
const secureExamVault = new Map<string, Question[]>();

export function sanitizeQuestionForActiveExam(q: Question): Question {
  return {
    ...q,
    // Withhold answer key, explanation, solutions, and misconception hints during active exam
    correctOptionId: "" as "A",
    explanation: "",
    solution: undefined,
    misconception: undefined,
  };
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
  submittedScore: null,

  initTest: (testId, meta, questionsList, forceFresh = false) => {
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
      questions: questionsList.map(sanitizeQuestionForActiveExam),
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
      submittedScore: null,
    });
  },

  submitTest: async () => {
    const { testId, questions, questionStates, remainingSeconds, durationSeconds } =
      get();

    // Check if we need to reveal authoritative questions from server first
    let authQuestions = secureExamVault.get(testId) || questions;
    if (typeof window !== "undefined" && (!authQuestions[0]?.correctOptionId)) {
      try {
        const res = await fetch(`/api/test/${testId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "reveal" }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.questions && Array.isArray(data.questions) && data.questions.length > 0) {
            authQuestions = data.questions;
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

    const unattemptedCount = authQuestions.length - attemptedCount;
    // Official CUET NTA 2026 Scoring: +5 per correct, -1 per incorrect, 0 for unattempted
    const { totalMarks, maxMarks } = calculateExamScore(
      correctCount,
      incorrectCount,
      unattemptedCount,
      CUET_UG_2026_CONFIG
    );
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
      questions: authQuestions,
      isSubmitted: true,
      isTimerRunning: false,
      isSubmitModalOpen: false,
      submittedScore: summary,
    });
    saveSessionToStorage(get());

    // Immediately record completed attempt to useTestStore & background API so all solved questions are counted
    try {
      const storeUser = useTestStore.getState().user;
      const meta = get().testMeta;
      const questionAttempts: RecordedQuestionAttempt[] = authQuestions.map((q) => {
        const qState = questionStates[q.id];
        const selectedOption = qState?.selectedOption ?? null;
        const isCorrect =
          selectedOption !== null && selectedOption !== undefined
            ? selectedOption === q.correctOptionId
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
          correctOption: q.correctOptionId,
          isCorrect,
          timeSpentSeconds: timeSpent,
          isTimeSink: timeSpent > 72,
          ncertReference: q.pyqSource || `NCERT Class 12 (${q.chapter || q.topic})`,
          explanation: q.explanation,
        };
      });

      const attemptRecord: RecordedTestAttempt = {
        id: `attempt_${testId}_${Date.now()}`,
        userId: storeUser?.id || "guest",
        testId: meta?.id ?? testId ?? "cbt_exam",
        testTitle: meta?.title ?? "CUET Domain Examination Paper",
        subject: meta?.subject ?? "Physics",
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

      useTestStore.getState().recordTestAttempt(attemptRecord);

      if (typeof window !== "undefined") {
        fetch("/api/test/record-attempt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(attemptRecord),
        }).catch((err) => console.warn("Background API attempt record notice:", err));
      }
    } catch (err) {
      console.warn("Failed to immediately record test attempt:", err);
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
