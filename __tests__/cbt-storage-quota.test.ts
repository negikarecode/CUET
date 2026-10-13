import assert from "node:assert";

// Mock localStorage and sessionStorage with configurable quota simulation
class MockStorage {
  private store = new Map<string, string>();
  public quotaLimitBytes: number = Infinity;
  public throwOnSet: boolean = false;

  get length(): number {
    return this.store.size;
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys());
    return keys[index] ?? null;
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    if (this.throwOnSet) {
      const err = new Error("Failed to execute 'setItem' on 'Storage': Setting the value exceeded the quota.");
      err.name = "QuotaExceededError";
      throw err;
    }

    let currentTotal = 0;
    for (const [k, v] of this.store.entries()) {
      if (k !== key) currentTotal += k.length + v.length;
    }
    const newTotal = currentTotal + key.length + value.length;
    if (newTotal > this.quotaLimitBytes) {
      const err = new Error("Failed to execute 'setItem' on 'Storage': Setting the value exceeded the quota.");
      err.name = "QuotaExceededError";
      throw err;
    }
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

const mockLocalStorage = new MockStorage();
const mockSessionStorage = new MockStorage();

// Set globals for Node environment
(global as any).window = {
  localStorage: mockLocalStorage,
  sessionStorage: mockSessionStorage,
};

import {
  loadCBTSessionSync,
  cbtAutosave,
  StoredCBTSession,
} from "@/lib/storage/cbt-session-storage";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTestStore } from "@/lib/store/useTestStore";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { Question } from "@/types";

describeAllRegressionTests();

async function describeAllRegressionTests() {
  console.log("=================================================================");
  console.log("      CUET CBT LOCALSTORAGE EXAM PERSISTENCE TEST SUITE          ");
  console.log("=================================================================\n");

  resetEnvironment();

  test1_StartingExamAndAnsweringQuestions();
  test2_RefreshingBrowserDuringExam();
  test3_RecoveringPartiallyCompletedExam();
  test4_SavingAllAnswersAndReviewFlags();
  test5_NavigatingBetweenQuestionsWithoutLosingAnswers();
  test6_LongSessionsAndLargeQuestionSets();
  test7_StorageQuotaErrorsAndUnavailableStorage();
  test8_InterruptedAndConcurrentAutosaves();
  test9_SwitchingBetweenGuestAndAuthenticatedUsers();
  await test10_SubmittingExamAndRefreshingAfterward();
  await test11_PreventingDuplicateSubmissions();
  test12_RestoringCorrectExamAndQuestionOrder();

  console.log("\n=================================================================");
  console.log("  ALL 12 CBT PERSISTENCE & RECOVERY REGRESSION TESTS PASSED! ✅   ");
  console.log("=================================================================\n");
}

function resetEnvironment() {
  mockLocalStorage.clear();
  mockSessionStorage.clear();
  mockLocalStorage.quotaLimitBytes = Infinity;
  mockLocalStorage.throwOnSet = false;
  useCBTStore.getState().abandonTest();
  useTestStore.getState().clearAttempts();
  mockLocalStorage.removeItem("cuet_active_uid");
}

function createSampleQuestions(count = 50, testId = "physics-mock-7"): Question[] {
  const { questions } = getQuestionsForTest(testId);
  if (questions && questions.length >= count) {
    return questions.slice(0, count);
  }

  // Fallback programmatic fixtures if dataset varies
  const list: Question[] = [];
  for (let i = 1; i <= count; i++) {
    list.push({
      id: `${testId}_q_${i.toString().padStart(2, "0")}`,
      questionNumber: i,
      prompt: `Physics Question ${i}: Calculate electromagnetic wavelength in free space.`,
      subjectId: "Physics",
      chapter: "Electromagnetic Waves",
      topic: "Electromagnetic Waves",
      options: [
        { id: "A", text: "1.0 cm", isCorrect: false },
        { id: "B", text: "2.0 cm", isCorrect: true },
        { id: "C", text: "3.0 cm", isCorrect: false },
        { id: "D", text: "4.0 cm", isCorrect: false },
      ],
      correctOptionId: "B",
      explanation: "Detailed wave solution.",
      difficulty: "medium",
      difficultyLevel: 2,
      estimatedTimeSeconds: 60,
      tags: ["CUET UG 2026", "Physics"],
      qualityScore: 95,
      hasDiagram: false,
    });
  }
  return list;
}

// ---------------------------------------------------------------------------
// 1. Starting an exam and answering questions
// ---------------------------------------------------------------------------
function test1_StartingExamAndAnsweringQuestions() {
  console.log("Test 1: Starting an exam and answering questions");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  useCBTStore.getState().selectOption("B");

  const state = useCBTStore.getState();
  const q1 = questions[0]!;
  assert.strictEqual(state.questionStates[q1.id]?.selectedOption, "B", "Q1 selected option must be B");
  assert.strictEqual(state.questionStates[q1.id]?.visited, true, "Q1 must be visited");

  // Verify compact storage format
  cbtAutosave.flush();
  const stored = loadCBTSessionSync("physics-mock-7", "guest");
  assert(stored !== null, "Stored session must exist");
  assert.strictEqual(stored?.testId, "physics-mock-7");
  assert.strictEqual(stored?.questionStates[q1.id]?.selectedOption, "B");

  // Verify full questions bank is NOT in storage
  const rawJson = mockLocalStorage.getItem("cuet_cbt_session_guest_physics-mock-7") || "";
  assert(!rawJson.includes("Calculate electromagnetic wavelength"), "Question prompts must not be serialized");
  assert(rawJson.length < 3000, `Stored session must be compact (<3KB, found ${rawJson.length} bytes)`);

  console.log("  ✓ Passed: Exam started, option selected, compact storage bounded <3KB.");
}

// ---------------------------------------------------------------------------
// 2. Refreshing the browser during an exam
// ---------------------------------------------------------------------------
function test2_RefreshingBrowserDuringExam() {
  console.log("Test 2: Refreshing the browser during an exam");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  useCBTStore.getState().selectOption("A");
  useCBTStore.getState().saveAndNext();
  useCBTStore.getState().selectOption("C");
  cbtAutosave.flush();

  const originalExpiresAt = useCBTStore.getState().expiresAt;

  // Simulate full page reload / store re-instantiation
  useCBTStore.setState({
    isInitialized: false,
    testId: "",
    questionStates: {},
    answers: {},
    currentQuestionIndex: 0,
  });

  // Re-run initTest on mount after reload
  useCBTStore.getState().initTest("physics-mock-7", meta, questions, false);

  const restored = useCBTStore.getState();
  assert.strictEqual(restored.isInitialized, true);
  assert.strictEqual(restored.testId, "physics-mock-7");
  assert.strictEqual(restored.currentQuestionIndex, 1, "Should resume on question index 1");
  assert.strictEqual(restored.questionStates[questions[0]!.id]?.selectedOption, "A");
  assert.strictEqual(restored.questionStates[questions[1]!.id]?.selectedOption, "C");
  assert.strictEqual(restored.expiresAt, originalExpiresAt, "Timer deadline must be preserved");

  console.log("  ✓ Passed: Browser reload recovers question index, answers, and timer deadline.");
}

// ---------------------------------------------------------------------------
// 3. Recovering a partially completed exam
// ---------------------------------------------------------------------------
function test3_RecoveringPartiallyCompletedExam() {
  console.log("Test 3: Recovering a partially completed exam");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  useCBTStore.getState().selectOption("B"); // Q1 answered
  useCBTStore.getState().saveAndNext(); // Navigate to Q2
  useCBTStore.getState().markForReviewAndNext(); // Q2 marked review, navigate to Q3
  useCBTStore.getState().jumpToQuestion(4); // Jump to Q5 (idx 4)
  useCBTStore.getState().selectOption("D"); // Q5 answered
  cbtAutosave.flush();

  // Reset in-memory state
  useCBTStore.setState({ isInitialized: false, questionStates: {}, answers: {} });
  useCBTStore.getState().initTest("physics-mock-7", meta, questions, false);

  const counts = useCBTStore.getState().getSummaryCounts();
  assert.strictEqual(counts.answered, 2, "2 questions answered (Q1 and Q5)");
  assert.strictEqual(counts.markedReview, 1, "1 question marked for review (Q2)");
  assert.strictEqual(counts.notVisited, 46, "46 questions unvisited");

  console.log("  ✓ Passed: Partial exam recovery restores precise answered, marked, and unvisited counts.");
}

// ---------------------------------------------------------------------------
// 4. Saving all answers and marked-for-review flags
// ---------------------------------------------------------------------------
function test4_SavingAllAnswersAndReviewFlags() {
  console.log("Test 4: Saving all answers and marked-for-review flags");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  // Q1: Answered & Marked for Review
  useCBTStore.getState().selectOption("C");
  useCBTStore.getState().markForReviewAndNext();

  cbtAutosave.flush();
  const q1Status = useCBTStore.getState().getQuestionStatus(questions[0]!.id);
  assert.strictEqual(q1Status, "answered_marked_review");

  // Reload
  useCBTStore.setState({ isInitialized: false, questionStates: {} });
  useCBTStore.getState().initTest("physics-mock-7", meta, questions, false);

  const restoredQ1Status = useCBTStore.getState().getQuestionStatus(questions[0]!.id);
  assert.strictEqual(restoredQ1Status, "answered_marked_review");

  console.log("  ✓ Passed: 'answered_marked_review' flag survives persistence and reload.");
}

// ---------------------------------------------------------------------------
// 5. Navigating between questions without losing answers
// ---------------------------------------------------------------------------
function test5_NavigatingBetweenQuestionsWithoutLosingAnswers() {
  console.log("Test 5: Navigating between questions without losing answers");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);

  // Jump around and answer
  useCBTStore.getState().jumpToQuestion(14); // Q15
  useCBTStore.getState().selectOption("A");

  useCBTStore.getState().jumpToQuestion(29); // Q30
  useCBTStore.getState().selectOption("C");

  useCBTStore.getState().goToPrevious(); // Q29
  useCBTStore.getState().goToNext(); // Q30

  // Navigate back to Q15
  useCBTStore.getState().jumpToQuestion(14);
  assert.strictEqual(
    useCBTStore.getState().questionStates[questions[14]!.id]?.selectedOption,
    "A",
    "Q15 answer must be preserved"
  );

  // Check Q30
  assert.strictEqual(
    useCBTStore.getState().questionStates[questions[29]!.id]?.selectedOption,
    "C",
    "Q30 answer must be preserved"
  );

  console.log("  ✓ Passed: Complex navigation preserves all selected answers.");
}

// ---------------------------------------------------------------------------
// 6. Long sessions and large question sets
// ---------------------------------------------------------------------------
function test6_LongSessionsAndLargeQuestionSets() {
  console.log("Test 6: Long sessions and large question sets");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);

  // Simulate answering all 50 questions
  const options: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
  for (let i = 0; i < 50; i++) {
    useCBTStore.getState().jumpToQuestion(i);
    useCBTStore.getState().selectOption(options[i % 4]!);
    // Simulate timer ticks
    useCBTStore.getState().tickSecond();
  }

  cbtAutosave.flush();
  const raw = mockLocalStorage.getItem("cuet_cbt_session_guest_physics-mock-7") || "";
  const sizeBytes = raw.length;

  assert(sizeBytes > 0, "Session must be persisted");
  assert(
    sizeBytes < 6000,
    `Full 50-question session payload must remain bounded (<6KB, found ${sizeBytes} bytes)`
  );

  console.log(`  ✓ Passed: 50-question complete session bounded to ${sizeBytes} bytes (<6KB).`);
}

// ---------------------------------------------------------------------------
// 7. Storage quota errors and unavailable storage
// ---------------------------------------------------------------------------
function test7_StorageQuotaErrorsAndUnavailableStorage() {
  console.log("Test 7: Storage quota errors and unavailable storage");
  resetEnvironment();

  // Set mock limit to 500 bytes to force quota exceeded
  mockLocalStorage.quotaLimitBytes = 500;

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  let threwUncaught = false;
  try {
    useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
    useCBTStore.getState().selectOption("A");
    cbtAutosave.flush();
  } catch (err) {
    threwUncaught = true;
  }

  assert.strictEqual(threwUncaught, false, "QuotaExceededError must NOT throw uncaught");
  assert.strictEqual(
    useCBTStore.getState().questionStates[questions[0]!.id]?.selectedOption,
    "A",
    "In-memory state must remain 100% functional despite storage quota error"
  );

  // Verify fallback to sessionStorage
  const sessionRaw = mockSessionStorage.getItem("cuet_cbt_session_guest_physics-mock-7");
  assert(sessionRaw !== null, "SessionStorage must serve as fallback when localStorage is full");

  console.log("  ✓ Passed: QuotaExceededError handled gracefully with sessionStorage fallback.");
}

// ---------------------------------------------------------------------------
// 8. Interrupted or concurrent autosaves
// ---------------------------------------------------------------------------
function test8_InterruptedAndConcurrentAutosaves() {
  console.log("Test 8: Interrupted or concurrent autosaves");
  resetEnvironment();

  const session1: StoredCBTSession = {
    version: 2,
    userId: "guest",
    testId: "physics-mock-7",
    testMeta: null,
    currentQuestionIndex: 0,
    durationSeconds: 3600,
    remainingSeconds: 3600,
    expiresAt: Date.now() + 3600000,
    questionStates: {
      q1: { visited: true, selectedOption: "A", isMarkedForReview: false, timeSpentSeconds: 5 },
    },
    isSubmitted: false,
    submittedScore: null,
    lastSavedAt: Date.now(),
    saveSequence: 1,
  };

  const session2: StoredCBTSession = {
    ...session1,
    questionStates: {
      q1: { visited: true, selectedOption: "C", isMarkedForReview: false, timeSpentSeconds: 10 },
    },
    saveSequence: 2,
  };

  // Schedule rapid changes
  cbtAutosave.schedule(session1, 500);
  cbtAutosave.schedule(session2, 500);

  // Immediate flush before unmount
  cbtAutosave.flush();

  const restored = loadCBTSessionSync("physics-mock-7", "guest");
  assert.strictEqual(
    restored?.questionStates?.q1?.selectedOption,
    "C",
    "Latest change ('C') must win after flush"
  );

  console.log("  ✓ Passed: Monotonic autosave flush guarantees newest state is saved.");
}

// ---------------------------------------------------------------------------
// 9. Switching between guest and authenticated users
// ---------------------------------------------------------------------------
function test9_SwitchingBetweenGuestAndAuthenticatedUsers() {
  console.log("Test 9: Switching between guest and authenticated users");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  // 1. Guest takes test and answers Q1 with 'A'
  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  useCBTStore.getState().selectOption("A");
  cbtAutosave.flush();

  assert(mockLocalStorage.getItem("cuet_cbt_session_guest_physics-mock-7") !== null);

  // 2. Candidate logs in as user_candidate_888
  mockLocalStorage.setItem("cuet_active_uid", "user_candidate_888");

  // Load session for authenticated user - must NOT adopt guest session
  const userSession = loadCBTSessionSync("physics-mock-7", "user_candidate_888");
  assert.strictEqual(userSession, null, "Authenticated user must have clean session isolated from guest");

  // User answers Q1 with 'D'
  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  useCBTStore.getState().selectOption("D");
  cbtAutosave.flush();

  assert(mockLocalStorage.getItem("cuet_cbt_session_user_candidate_888_physics-mock-7") !== null);

  // 3. Log out back to guest
  mockLocalStorage.removeItem("cuet_active_uid");
  const guestSession = loadCBTSessionSync("physics-mock-7", "guest");
  assert.strictEqual(
    guestSession?.questionStates[questions[0]!.id]?.selectedOption,
    "A",
    "Guest session remains isolated with original option 'A'"
  );

  console.log("  ✓ Passed: Complete user isolation between guest and authenticated candidates.");
}

// ---------------------------------------------------------------------------
// 10. Submitting an exam and refreshing afterward
// ---------------------------------------------------------------------------
async function test10_SubmittingExamAndRefreshingAfterward() {
  console.log("Test 10: Submitting an exam and refreshing afterward");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  useCBTStore.getState().selectOption("B"); // Correct option

  await useCBTStore.getState().submitTest();

  const submittedState = useCBTStore.getState();
  assert.strictEqual(submittedState.isSubmitted, true);
  assert(submittedState.submittedScore !== null);
  assert.strictEqual(submittedState.submittedScore.correctCount, 1);

  // Simulate reload
  useCBTStore.setState({ isInitialized: false, isSubmitted: false, submittedScore: null });
  useCBTStore.getState().initTest("physics-mock-7", meta, questions, false);

  const reloadedState = useCBTStore.getState();
  assert.strictEqual(
    reloadedState.isSubmitted,
    true,
    "Test must remain submitted after refresh"
  );
  assert(
    reloadedState.submittedScore !== null,
    "Scorecard summary must be restored on refresh"
  );
  assert.strictEqual(
    reloadedState.isTimerRunning,
    false,
    "Timer must NOT be resurrected on submitted exam"
  );

  console.log("  ✓ Passed: Submitted test retains scorecard view across refresh; no resurrection.");
}

// ---------------------------------------------------------------------------
// 11. Preventing duplicate submissions and result records
// ---------------------------------------------------------------------------
async function test11_PreventingDuplicateSubmissions() {
  console.log("Test 11: Preventing duplicate submissions and result records");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);
  useCBTStore.getState().selectOption("B");

  // Call submit twice concurrently
  await Promise.all([
    useCBTStore.getState().submitTest(),
    useCBTStore.getState().submitTest(),
  ]);

  const attempts = useTestStore.getState().testAttempts;
  const physics7Attempts = attempts.filter((a) => a.testId === "physics-mock-7");
  assert.strictEqual(
    physics7Attempts.length,
    1,
    `Must record exactly 1 attempt record for physics-mock-7 (found ${physics7Attempts.length})`
  );

  console.log("  ✓ Passed: Concurrent submission attempts deduplicated to single record.");
}

// ---------------------------------------------------------------------------
// 12. Restoring the correct exam and question order
// ---------------------------------------------------------------------------
function test12_RestoringCorrectExamAndQuestionOrder() {
  console.log("Test 12: Restoring the correct exam and question order");
  resetEnvironment();

  const questions = createSampleQuestions(50, "physics-mock-7");
  const meta = {
    id: "physics-mock-7",
    title: "CUET UG Physics Mock 7",
    subject: "Physics",
    code: "312",
    totalQuestions: 50,
    durationMinutes: 60,
  };

  useCBTStore.getState().initTest("physics-mock-7", meta, questions, true);

  // Set answers by ID
  useCBTStore.getState().jumpToQuestion(0);
  useCBTStore.getState().selectOption("A");

  useCBTStore.getState().jumpToQuestion(25);
  useCBTStore.getState().selectOption("C");

  useCBTStore.getState().jumpToQuestion(49);
  useCBTStore.getState().selectOption("D");

  cbtAutosave.flush();

  // Re-load questions from trusted source
  const freshLoadedQuestions = createSampleQuestions(50, "physics-mock-7");
  useCBTStore.setState({ isInitialized: false, questionStates: {} });
  useCBTStore.getState().initTest("physics-mock-7", meta, freshLoadedQuestions, false);

  const restored = useCBTStore.getState();

  // Verify Question 1, 26, 50
  assert.strictEqual(
    restored.questionStates[freshLoadedQuestions[0]!.id]?.selectedOption,
    "A"
  );
  assert.strictEqual(
    restored.questionStates[freshLoadedQuestions[25]!.id]?.selectedOption,
    "C"
  );
  assert.strictEqual(
    restored.questionStates[freshLoadedQuestions[49]!.id]?.selectedOption,
    "D"
  );

  // Verify intermediate question (e.g. Q10) remains unattempted
  assert.strictEqual(
    restored.questionStates[freshLoadedQuestions[9]!.id]?.selectedOption ?? null,
    null
  );

  console.log("  ✓ Passed: Question ID mapping guarantees exact question order and option alignment.");
}
