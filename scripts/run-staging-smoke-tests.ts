import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeQuestionForActiveExam, QuestionSessionState } from "../lib/store/useCBTStore";
import {
  saveCBTSessionSync,
  loadCBTSessionSync,
  compactQuestionStates,
  StoredCBTSession,
} from "../lib/storage/cbt-session-storage";
import {
  diagnoseMistakeDeterministically,
} from "../lib/mistake-detective";
import {
  getDiagnosticProgress,
  DIAGNOSTIC_UNLOCK_THRESHOLD,
} from "../lib/diagnostic-status";
import {
  getOrCreateTopicRepairPlanV2,
  recordRepairPlanProgress,
} from "../lib/repair-plan-v2";
import {
  enrollMissedQuestion,
  recordSpacedReviewAttempt,
  loadSpacedRepetitionItems,
  isItemDue,
} from "../lib/spaced-repetition";
import { CUET_UG_2026_CONFIG, calculateExamScore } from "../lib/config/examConfig";
import { Question, RecordedTestAttempt } from "../types";

// Setup browser window and storage mocks for Headless Node test environment
const mockLocalStorage = new Map<string, string>();
const mockSessionStorage = new Map<string, string>();

(global as any).window = {
  localStorage: {
    getItem: (k: string) => mockLocalStorage.get(k) || null,
    setItem: (k: string, v: string) => mockLocalStorage.set(k, v),
    removeItem: (k: string) => mockLocalStorage.delete(k),
    clear: () => mockLocalStorage.clear(),
  },
  sessionStorage: {
    getItem: (k: string) => mockSessionStorage.get(k) || null,
    setItem: (k: string, v: string) => mockSessionStorage.set(k, v),
    removeItem: (k: string) => mockSessionStorage.delete(k),
    clear: () => mockSessionStorage.clear(),
  },
};
(global as any).localStorage = (global as any).window.localStorage;
(global as any).sessionStorage = (global as any).window.sessionStorage;

describe("CUET AI Learning Coach V2 — Phase 4 Staging Smoke Tests", () => {
  const STAGING_USER_A = "usr_stage_alpha_9912";
  const STAGING_USER_B = "usr_stage_bravo_4481";
  const TEST_ID = "cuet_ug_physics_mock_01";

  // 1. Question Retrieval & Active Exam Sanitization
  it("Smoke 1: Strips answer keys and explanations during active CBT", () => {
    const rawQuestion: Question = {
      id: "q_phy_optics_101",
      questionNumber: 1,
      subject: "Physics",
      chapter: "Ray Optics",
      microTopic: "Refraction",
      archetype: "Numerical",
      questionText: "What is the focal length of a concave mirror?",
      options: [
        { id: "A", text: "-15 cm" },
        { id: "B", text: "+15 cm" },
        { id: "C", text: "-30 cm" },
        { id: "D", text: "+30 cm" },
      ],
      correctOptionId: "A",
      explanation: "For concave mirrors, focal length is always negative by convention.",
      difficulty: "medium",
    };

    const sanitized = sanitizeQuestionForActiveExam(rawQuestion);

    assert.equal(sanitized.correctOptionId, "");
    assert.equal(sanitized.explanation, "");
    assert.equal(sanitized.solution, undefined);
    assert.equal(sanitized.misconception, undefined);
    assert.equal(sanitized.id, "q_phy_optics_101");
    assert.equal(sanitized.options.length, 4);
    assert.equal(sanitized.options[0].text, "-15 cm");
  });

  // 2. Server-Side Scoring & Submission
  it("Smoke 2: Server-side scoring enforces NTA +5/-1 rule independent of client claims", () => {
    // 5 correct, 2 incorrect, 3 unattempted (Total 10)
    const { totalMarks, maxMarks } = calculateExamScore(5, 2, 3, CUET_UG_2026_CONFIG, 10);
    // 5 * 5 = +25, 2 * -1 = -2 => Total = 23. Max = 10 * 5 = 50.
    assert.equal(totalMarks, 23);
    assert.equal(maxMarks, 50);

    // Negative marks check: 0 correct, 4 incorrect, 6 unattempted => 4 * -1 = -4
    const negativeRun = calculateExamScore(0, 4, 6, CUET_UG_2026_CONFIG, 10);
    assert.equal(negativeRun.totalMarks, -4);
  });

  // 3. Session History & Persistence Across Refresh
  it("Smoke 3: CBT session survives browser refresh and rehydrates accurately", () => {
    const states: Record<string, QuestionSessionState> = {
      q_1: { visited: true, selectedOption: "B", isMarkedForReview: false, timeSpentSeconds: 32 },
      q_2: { visited: true, selectedOption: null, isMarkedForReview: true, timeSpentSeconds: 15 },
    };

    const compact = compactQuestionStates(states);
    const expiresAt = Date.now() + 1800000;

    const session: StoredCBTSession = {
      version: 2,
      userId: STAGING_USER_A,
      testId: TEST_ID,
      testMeta: {
        id: TEST_ID,
        title: "Physics Mock 01",
        subject: "Physics",
        totalQuestions: 50,
        durationMinutes: 60,
      },
      currentQuestionIndex: 0,
      durationSeconds: 3600,
      remainingSeconds: 1800,
      expiresAt,
      questionStates: compact,
      isSubmitted: false,
      submittedScore: null,
      lastSavedAt: Date.now(),
      saveSequence: 1,
    };

    const saved = saveCBTSessionSync(session);
    assert.equal(saved, true, "Session should be saved to persistent storage");

    // Rehydrate as if after page reload
    const rehydrated = loadCBTSessionSync(TEST_ID, STAGING_USER_A);
    assert.ok(rehydrated !== null, "Rehydrated session should not be null");
    assert.equal(rehydrated.testId, TEST_ID);
    assert.equal(rehydrated.userId, STAGING_USER_A);
    assert.equal(rehydrated.questionStates["q_1"].selectedOption, "B");
    assert.equal(rehydrated.questionStates["q_2"].isMarkedForReview, true);
  });

  // 4. User Data Isolation
  it("Smoke 4: Prevents cross-tenant session leakage between different staging users", () => {
    // User A has saved state
    const userAState = loadCBTSessionSync(TEST_ID, STAGING_USER_A);
    assert.ok(userAState !== null);

    // User B attempting to load session for same test on shared device
    const userBState = loadCBTSessionSync(TEST_ID, STAGING_USER_B);
    assert.equal(userBState, null, "User B must not see User A's session data");
  });

  // 5. Diagnostic Cycle Completion at 150 Qualifying Questions
  it("Smoke 5: Enforces 150-question cycle boundary and low-effort quarantine", () => {
    // Case A: 149 valid questions (locked)
    const test149: RecordedTestAttempt = {
      testId: "mock_test_series_01",
      submittedAt: new Date().toISOString(),
      questions: Array.from({ length: 149 }, (_, i) => ({
        questionId: `q_${i}`,
        questionNumber: i + 1,
        selectedOption: "A",
        correctOption: "A",
        isCorrect: true,
        timeSpentSeconds: 30, // >= 5s => qualifying
      })),
      totalMarks: 745,
      maxMarks: 745,
      correctCount: 149,
      incorrectCount: 0,
      attemptedCount: 149,
    };

    const progress149 = getDiagnosticProgress([test149]);
    assert.equal(progress149.isUnlocked, false, "Diagnostic should be locked at 149 questions");
    assert.equal(progress149.questionsToUnlock, 1);
    assert.equal(progress149.completedCyclesCount, 0);
    assert.equal(progress149.currentCycleQuestionCount, 149);

    // Case B: Exactly 150 valid questions (Cycle 1 complete, Cycle 2 active)
    const test150: RecordedTestAttempt = {
      testId: "mock_test_series_01",
      submittedAt: new Date().toISOString(),
      questions: Array.from({ length: 150 }, (_, i) => ({
        questionId: `q_${i}`,
        questionNumber: i + 1,
        selectedOption: "A",
        correctOption: "A",
        isCorrect: true,
        timeSpentSeconds: 30,
      })),
      totalMarks: 750,
      maxMarks: 750,
      correctCount: 150,
      incorrectCount: 0,
      attemptedCount: 150,
    };

    const progress150 = getDiagnosticProgress([test150]);
    assert.equal(progress150.isUnlocked, true, "Diagnostic must unlock at 150 questions");
    assert.equal(progress150.completedCyclesCount, 1);
    assert.equal(progress150.questionsToUnlock, 0);
    assert.equal(progress150.currentCycleNumber, 2);
    assert.equal(progress150.currentCycleQuestionCount, 0, "Counter resets to 0 for Cycle 2");

    // Case C: 150 attempts where 10 are flagged low-effort (< 5s)
    const testQuarantine: RecordedTestAttempt = {
      testId: "mock_test_series_quarantine",
      submittedAt: new Date().toISOString(),
      questions: [
        ...Array.from({ length: 140 }, (_, i) => ({
          questionId: `q_v_${i}`,
          questionNumber: i + 1,
          selectedOption: "A" as const,
          correctOption: "A" as const,
          isCorrect: true,
          timeSpentSeconds: 25,
        })),
        ...Array.from({ length: 10 }, (_, i) => ({
          questionId: `q_q_${i}`,
          questionNumber: 141 + i,
          selectedOption: "B" as const,
          correctOption: "A" as const,
          isCorrect: false,
          timeSpentSeconds: 2,
          isLowEffort: true, // Quarantined
        })),
      ],
      totalMarks: 690,
      maxMarks: 750,
      correctCount: 140,
      incorrectCount: 10,
      attemptedCount: 150,
    };

    const progressQuarantine = getDiagnosticProgress([testQuarantine]);
    assert.equal(progressQuarantine.totalQualifyingAttempts, 140);
    assert.equal(progressQuarantine.isUnlocked, false, "Quarantined attempts must NOT unlock diagnostic");
  });

  // 6. Mistake Diagnosis & Deterministic Fallback
  it("Smoke 6: Deterministic engine diagnoses error with zero tokens and sub-millisecond latency", () => {
    const start = performance.now();
    const diagnosis = diagnoseMistakeDeterministically({
      questionId: "q_test_qualifier_01",
      questionText: "Which of the following is NOT an essential amino acid?",
      selectedOption: "A",
      selectedOptionText: "Valine",
      correctOption: "D",
      correctOptionText: "Alanine",
      subject: "Chemistry",
      chapter: "Biomolecules",
      microTopic: "Amino Acids",
      timeSpentSeconds: 22,
      totalTopicAttempts: 12,
      recentMistakeCountOnTopic: 0,
    });
    const elapsed = performance.now() - start;

    assert.equal(diagnosis.category, "question_misinterpretation");
    assert.equal(diagnosis.nature, "INTERPRETATION");
    assert.equal(diagnosis.tokensUsed, 0);
    assert.ok(elapsed < 5.0, `Diagnosis should take < 5ms, took ${elapsed}ms`);
  });

  // 7. Repair Drill, Fresh Retest & Recovery Gating
  it("Smoke 7: Repair plan gates recovery at >= 80% accuracy on fresh items", () => {
    const initialPlan = getOrCreateTopicRepairPlanV2({
      userId: STAGING_USER_A,
      subject: "Physics",
      chapter: "Current Electricity",
      accuracy: 45,
      attemptsCount: 8,
    });

    assert.equal(initialPlan.steps.length, 4);
    assert.equal(initialPlan.steps[0].status, "available");
    assert.equal(initialPlan.steps[1].status, "locked");

    // Complete Step 1 (Concept Review) -> unlocks Step 2
    const afterStep1 = recordRepairPlanProgress({
      userId: STAGING_USER_A,
      subject: "Physics",
      chapter: "Current Electricity",
      completedStep: 1,
    });
    assert.equal(afterStep1.steps[0].status, "completed");
    assert.equal(afterStep1.steps[1].status, "available");

    // Complete Step 2 (Targeted Drill) with 60% -> unlocks Step 3
    const afterStep2 = recordRepairPlanProgress({
      userId: STAGING_USER_A,
      subject: "Physics",
      chapter: "Current Electricity",
      completedStep: 2,
      scoreOrAccuracy: 60,
    });
    assert.equal(afterStep2.steps[1].status, "completed");
    assert.equal(afterStep2.steps[2].status, "available");

    // Complete Step 3 (Mastery Retest) with 75% (< 80%) -> MUST NOT RECOVER
    const failedRetest = recordRepairPlanProgress({
      userId: STAGING_USER_A,
      subject: "Physics",
      chapter: "Current Electricity",
      completedStep: 3,
      scoreOrAccuracy: 75,
    });
    assert.equal(failedRetest.isRecovered, false, "Must not mark recovered when score is 75%");
    assert.equal(failedRetest.prerequisiteReviewSuggested, true);

    // Complete Step 3 (Mastery Retest) with 85% (>= 80%) -> MARKS RECOVERED
    const passedRetest = recordRepairPlanProgress({
      userId: STAGING_USER_A,
      subject: "Physics",
      chapter: "Current Electricity",
      completedStep: 3,
      scoreOrAccuracy: 85,
    });
    assert.equal(passedRetest.isRecovered, true, "Must mark recovered when score is 85%");
    assert.equal(passedRetest.currentStage, "RECOVERED");
  });

  // 8. Spaced Repetition Scheduling (SM-2 Interval Logic)
  it("Smoke 8: SM-2 progression increments intervals on success and resets on error", () => {
    const questionId = "q_sr_chem_kinetics_01";
    // 1. Enroll missed question
    const enrolled = enrollMissedQuestion(STAGING_USER_A, {
      questionId,
      subject: "Chemistry",
      chapter: "Chemical Kinetics",
      prompt: "What is the order of a radioactive decay reaction?",
      correctOption: "A",
      explanation: "Radioactive decay always follows first-order kinetics.",
      userSelectedOption: "B",
    });

    assert.equal(enrolled.currentIntervalIndex, 0);
    assert.equal(enrolled.intervalDays, 1);
    assert.equal(enrolled.isMastered, false);

    // 2. First review: Correct -> moves to interval 1 (3 days)
    const review1 = recordSpacedReviewAttempt(STAGING_USER_A, questionId, "A", true, 28);
    assert.ok(review1 !== null);
    assert.equal(review1.currentIntervalIndex, 1);
    assert.equal(review1.intervalDays, 3);
    assert.equal(review1.consecutiveSuccesses, 1);

    // 3. Second review: Correct -> moves to interval 2 (7 days)
    const review2 = recordSpacedReviewAttempt(STAGING_USER_A, questionId, "A", true, 30);
    assert.ok(review2 !== null);
    assert.equal(review2.currentIntervalIndex, 2);
    assert.equal(review2.intervalDays, 7);
    assert.equal(review2.consecutiveSuccesses, 2);

    // 4. Third review: Incorrect -> RESETS back to interval 0 (1 day)
    const review3 = recordSpacedReviewAttempt(STAGING_USER_A, questionId, "C", false, 45);
    assert.ok(review3 !== null);
    assert.equal(review3.currentIntervalIndex, 0);
    assert.equal(review3.intervalDays, 1);
    assert.equal(review3.consecutiveSuccesses, 0);
    assert.equal(review3.isMastered, false);
  });

  // 9. Error Handling When Database or External Services are Unavailable
  it("Smoke 9: Gracefully handles missing database connection via offline fallback", () => {
    // If window.localStorage is unavailable, loadCBTSessionSync returns null safely
    const originalGet = (global as any).window.sessionStorage.getItem;
    (global as any).window.sessionStorage.getItem = () => {
      throw new Error("QuotaExceededError / Network partition");
    };

    const fallbackResult = loadCBTSessionSync(TEST_ID, STAGING_USER_A);
    // Should safely fallback to safeStorage or return valid state without crashing
    assert.ok(fallbackResult !== undefined, "Should not throw unhandled exception");

    // Restore
    (global as any).window.sessionStorage.getItem = originalGet;
  });
});
