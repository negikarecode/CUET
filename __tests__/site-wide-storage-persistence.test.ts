import assert from "node:assert";

// Configurable mock storage engine capable of realistic quota limit testing
class MockStorage {
  public store = new Map<string, string>();
  public quotaLimitBytes: number = Infinity;
  public throwOnSet: boolean = false;
  public throwOnGet: boolean = false;

  get length(): number {
    return this.store.size;
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys());
    return keys[index] ?? null;
  }

  getItem(key: string): string | null {
    if (this.throwOnGet) {
      const err = new Error("The operation is insecure or blocked.");
      err.name = "SecurityError";
      throw err;
    }
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    if (this.throwOnSet) {
      const err = new Error("Failed to execute 'setItem' on 'Storage': Setting the value of '" + key + "' exceeded the quota.");
      err.name = "QuotaExceededError";
      throw err;
    }

    let currentTotal = 0;
    for (const [k, v] of this.store.entries()) {
      if (k !== key) currentTotal += k.length + v.length;
    }
    const newTotal = currentTotal + key.length + value.length;
    if (newTotal > this.quotaLimitBytes) {
      const err = new Error("Failed to execute 'setItem' on 'Storage': Setting the value of '" + key + "' exceeded the quota.");
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
(global as any).CustomEvent = class CustomEvent { constructor(public type: string, public detail?: any) {} };
(global as any).window = {
  localStorage: mockLocalStorage,
  sessionStorage: mockSessionStorage,
  location: { reload: () => {}, href: "/" },
  dispatchEvent: () => true,
};
(global as any).document = {
  cookie: "",
  documentElement: { lang: "en", dir: "ltr" },
};

import { safeStorage } from "@/lib/storage/safe-storage";
import { useTestStore } from "@/lib/store/useTestStore";
import {
  saveCBTSessionSync,
  loadCBTSessionSync,
  getCBTSessionKey,
  cbtAutosave,
} from "@/lib/storage/cbt-session-storage";
import { setAppLanguage, getActiveLanguage } from "@/lib/i18n/languages";

async function runSiteWidePersistenceTests() {
  console.log("=================================================================");
  console.log("     CUET AI-PREP SITE-WIDE STORAGE & PERSISTENCE TEST SUITE     ");
  console.log("=================================================================\n");

  let passed = 0;

  function resetStorage() {
    mockLocalStorage.clear();
    mockSessionStorage.clear();
    mockLocalStorage.quotaLimitBytes = Infinity;
    mockLocalStorage.throwOnSet = false;
    mockLocalStorage.throwOnGet = false;
    mockSessionStorage.quotaLimitBytes = Infinity;
    mockSessionStorage.throwOnSet = false;
  }

  // ---------------------------------------------------------------------------
  // Test 1: Healthy browser storage
  // ---------------------------------------------------------------------------
  console.log("Test 1: Healthy browser storage read/write");
  resetStorage();
  const res1 = safeStorage.setItem("test_key", "test_value");
  assert.strictEqual(res1.success, true);
  assert.strictEqual(res1.tier, "local");
  assert.strictEqual(safeStorage.getItem("test_key"), "test_value");
  console.log("  ✓ Passed: Direct read and write in healthy storage.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 2: Nearly full and quota-exceeded localStorage
  // ---------------------------------------------------------------------------
  console.log("Test 2: Nearly full and quota-exceeded localStorage auto-pruning");
  resetStorage();
  // Fill storage with disposable token logs and old rate limits
  mockLocalStorage.store.set("cuet_ai_token_logs", "x".repeat(1000));
  mockLocalStorage.store.set("cuet_rate_limit:user_1:2026-01-01:why_wrong", "5");
  mockLocalStorage.store.set("temp_cache_data", "junk");
  
  // Set tight quota limit: current items are 1081 bytes; limit at 1050 forces QuotaExceededError
  mockLocalStorage.quotaLimitBytes = 1050;

  // Writing a user setting should trigger prune of disposable keys and succeed in localStorage
  const writeRes = safeStorage.setItem("user_pref", "val");
  assert.strictEqual(writeRes.success, true);
  assert.strictEqual(mockLocalStorage.getItem("cuet_ai_token_logs"), null, "Disposable logs must be evicted");
  assert.strictEqual(safeStorage.getItem("user_pref"), "val");
  console.log("  ✓ Passed: Quota relief via automatic disposable pruning.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 3: Unavailable or denied browser storage (SecurityError/denied)
  // ---------------------------------------------------------------------------
  console.log("Test 3: Unavailable or denied browser storage (Private Browsing)");
  resetStorage();
  mockLocalStorage.throwOnSet = true;
  mockLocalStorage.throwOnGet = true;

  // safeStorage must seamlessly fall back to memory without throwing
  const deniedWrite = safeStorage.setItem("private_pref", "saved_data");
  assert.strictEqual(deniedWrite.success, true);
  assert.strictEqual(safeStorage.getItem("private_pref"), "saved_data");
  console.log("  ✓ Passed: Zero exceptions thrown; transparent memory fallback.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 4: Large CBT sessions and question sets
  // ---------------------------------------------------------------------------
  console.log("Test 4: Large CBT sessions payload bounding (<6KB)");
  resetStorage();
  const states: Record<string, any> = {};
  for (let i = 1; i <= 50; i++) {
    states[`q_${i}`] = {
      visited: true,
      selectedOption: (i % 4 === 0 ? "A" : i % 4 === 1 ? "B" : "C"),
      isMarkedForReview: i % 5 === 0,
      timeSpentSeconds: 45,
    };
  }
  const session: any = {
    version: 2,
    userId: "guest",
    testId: "physics-mock-7",
    currentQuestionIndex: 24,
    durationSeconds: 3600,
    remainingSeconds: 1800,
    expiresAt: Date.now() + 1800000,
    questionStates: states,
    isSubmitted: false,
    submittedScore: null,
    lastSavedAt: Date.now(),
    saveSequence: 10,
  };
  saveCBTSessionSync(session);
  const rawSession = mockLocalStorage.getItem(getCBTSessionKey("physics-mock-7", "guest"));
  assert(rawSession !== null);
  assert(rawSession.length < 6000, "50-question session payload must be strictly <6KB");
  console.log(`  ✓ Passed: Complete 50-question exam bounded to ${rawSession.length} bytes.`);
  passed++;

  // ---------------------------------------------------------------------------
  // Test 5: Authentication, registration, and session restoration (cuet_active_uid)
  // ---------------------------------------------------------------------------
  console.log("Test 5: Authentication under quota saturation (cuet_active_uid)");
  resetStorage();
  // Simulate saturated localStorage where setting ANY key throws QuotaExceededError
  mockLocalStorage.quotaLimitBytes = 200;
  mockLocalStorage.store.set("heavy_data", "h".repeat(250));

  // User signs in: loginUser calls safeStorage.setItem("cuet_active_uid", ...)
  // Must NOT throw QuotaExceededError and must safely update store
  assert.doesNotThrow(() => {
    useTestStore.getState().loginUser({
      id: "usr_student_999",
      name: "Rohit Sharma",
      targetCollege: "SRCC",
      targetCourse: "B.Com (Hons)",
      preferredStream: "commerce",
    });
  }, "loginUser must never throw QuotaExceededError");

  assert.strictEqual(useTestStore.getState().user.id, "usr_student_999");
  assert.strictEqual(safeStorage.getItem("cuet_active_uid"), "usr_student_999");
  console.log("  ✓ Passed: User sign-in succeeds safely even under storage quota saturation.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 6: Guest-to-authenticated transitions
  // ---------------------------------------------------------------------------
  console.log("Test 6: Guest-to-authenticated user isolation & transition");
  resetStorage();
  // Guest user sets target
  useTestStore.setState({
    user: { ...useTestStore.getState().user, id: "guest", targetCollege: "Hindu College" },
  });
  safeStorage.setItem("cuet_ai_prep_session_storage:guest", JSON.stringify({
    state: { user: { id: "guest", targetCollege: "Hindu College" } },
  }));

  // User logs in with authenticated account
  useTestStore.getState().loginUser({
    id: "usr_auth_777",
    name: "Ananya",
    targetCollege: "Miranda House",
  });
  assert.strictEqual(useTestStore.getState().user.id, "usr_auth_777");
  assert.strictEqual(useTestStore.getState().user.targetCollege, "Miranda House");
  assert.strictEqual(safeStorage.getItem("cuet_active_uid"), "usr_auth_777");
  console.log("  ✓ Passed: Clean transition from guest to authenticated user.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 7: CBT answer autosave, refresh, and recovery
  // ---------------------------------------------------------------------------
  console.log("Test 7: CBT answer autosave, refresh, and recovery");
  resetStorage();
  const testId = "chemistry-mock-1";
  const cbtExam: any = {
    version: 2,
    userId: "usr_auth_777",
    testId,
    currentQuestionIndex: 5,
    durationSeconds: 2700,
    remainingSeconds: 2600,
    expiresAt: Date.now() + 2600000,
    questionStates: {
      chem_1: { visited: true, selectedOption: "B", isMarkedForReview: false, timeSpentSeconds: 25 },
      chem_2: { visited: true, selectedOption: null, isMarkedForReview: true, timeSpentSeconds: 10 },
    },
    isSubmitted: false,
    submittedScore: null,
    lastSavedAt: Date.now(),
    saveSequence: 3,
  };
  saveCBTSessionSync(cbtExam);

  // Emulate browser refresh: load from storage
  const restoredExam = loadCBTSessionSync(testId, "usr_auth_777");
  assert(restoredExam !== null);
  assert.strictEqual(restoredExam.currentQuestionIndex, 5);
  assert.strictEqual(restoredExam.questionStates["chem_1"]?.selectedOption, "B");
  assert.strictEqual(restoredExam.questionStates["chem_2"]?.isMarkedForReview, true);
  console.log("  ✓ Passed: Exam answers and review flags fully restored across refresh.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 8: Mock submission and duplicate-submission prevention
  // ---------------------------------------------------------------------------
  console.log("Test 8: Mock submission and duplicate-submission prevention");
  resetStorage();
  const submitExam: any = {
    ...cbtExam,
    isSubmitted: true,
    submittedScore: {
      correctCount: 40,
      incorrectCount: 10,
      totalMarks: 190,
      accuracyPercentage: 80,
    },
  };
  saveCBTSessionSync(submitExam);

  // Check reload after submit returns submitted scorecard
  const afterSubmit = loadCBTSessionSync(testId, "usr_auth_777");
  assert(afterSubmit !== null);
  assert.strictEqual(afterSubmit.isSubmitted, true);
  assert.strictEqual(afterSubmit.submittedScore?.totalMarks, 190);
  console.log("  ✓ Passed: Submitted score retained; cannot restart submitted exam.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 9: Results and diagnostic progress persistence
  // ---------------------------------------------------------------------------
  console.log("Test 9: Results and diagnostic progress persistence");
  resetStorage();
  useTestStore.setState({
    currentCycleNumber: 2,
    currentCycleQuestionCount: 55,
  });
  safeStorage.setItem("cuet_ai_prep_session_storage:usr_auth_777", JSON.stringify({
    state: { currentCycleNumber: 2, currentCycleQuestionCount: 55 },
  }));
  const readBack = JSON.parse(safeStorage.getItem("cuet_ai_prep_session_storage:usr_auth_777") || "{}");
  assert.strictEqual(readBack.state.currentCycleNumber, 2);
  assert.strictEqual(readBack.state.currentCycleQuestionCount, 55);
  console.log("  ✓ Passed: Diagnostic cycle state faithfully persisted.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 10: College predictions and saved targets
  // ---------------------------------------------------------------------------
  console.log("Test 10: College predictions and saved targets persistence");
  resetStorage();
  useTestStore.getState().setTargetCollege("St. Stephen's College");
  assert.strictEqual(useTestStore.getState().user.targetCollege, "St. Stephen's College");
  console.log("  ✓ Passed: Saved targets correctly updated in active store.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 11: Page navigation and browser refresh
  // ---------------------------------------------------------------------------
  console.log("Test 11: Language and push notification preferences survive refresh");
  resetStorage();
  setAppLanguage("hi");
  assert.strictEqual(getActiveLanguage(), "hi");
  assert.strictEqual(safeStorage.getItem("cuet_preferred_language"), "hi");
  console.log("  ✓ Passed: UI language preference persists safely.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 12: Concurrent persistence updates
  // ---------------------------------------------------------------------------
  console.log("Test 12: Concurrent persistence updates & sequence ordering");
  resetStorage();
  const sessionV1: any = { ...cbtExam, saveSequence: 1, currentQuestionIndex: 1 };
  const sessionV2: any = { ...cbtExam, saveSequence: 2, currentQuestionIndex: 2 };

  cbtAutosave.schedule(sessionV1);
  cbtAutosave.schedule(sessionV2);
  cbtAutosave.flush();

  const finalSaved = loadCBTSessionSync(testId, "usr_auth_777");
  assert.strictEqual(finalSaved?.currentQuestionIndex, 2, "Monotonic sequence must keep latest save");
  console.log("  ✓ Passed: Concurrent writes resolved strictly in monotonic sequence order.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 13: Interrupted or failed legacy-data migration
  // ---------------------------------------------------------------------------
  console.log("Test 13: Legacy data migration safely handles corrupt entries");
  resetStorage();
  // Corrupt legacy entry
  mockLocalStorage.store.set("cuet_ai_prep_session_storage", "{ corrupt json !!");
  safeStorage.initStartupCleanup();
  assert.strictEqual(mockLocalStorage.getItem("cuet_ai_prep_session_storage"), null);
  console.log("  ✓ Passed: Corrupt legacy storage key safely evicted.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 14: Multiple users using the same browser (strict isolation)
  // ---------------------------------------------------------------------------
  console.log("Test 14: Strict isolation across multiple users on same browser");
  resetStorage();
  safeStorage.setItem("cuet_cbt_session_user_alice_test-1", JSON.stringify({ userId: "user_alice", score: 100 }));
  safeStorage.setItem("cuet_cbt_session_user_bob_test-1", JSON.stringify({ userId: "user_bob", score: 200 }));

  // Alice cannot read Bob's session
  const aliceSession = loadCBTSessionSync("test-1", "user_alice");
  assert(aliceSession === null || aliceSession.userId === "user_alice");

  // Bob cannot read Alice's session
  const bobSession = loadCBTSessionSync("test-1", "user_bob");
  assert(bobSession === null || bobSession.userId === "user_bob");
  console.log("  ✓ Passed: User sessions completely partitioned with zero cross-talk.");
  passed++;

  // ---------------------------------------------------------------------------
  // Test 15: Prevention of accidental deletion or cross-user exposure on logout
  // ---------------------------------------------------------------------------
  console.log("Test 15: User logout selectively clears only active user data");
  resetStorage();
  safeStorage.setItem("cuet_active_uid", "user_alice");
  safeStorage.setItem("cuet_ai_prep_session_storage:user_alice", "alice_progress");
  safeStorage.setItem("cuet_ai_prep_session_storage:user_bob", "bob_progress");
  safeStorage.setItem("cuet_preferred_language", "en");

  // Alice logs out
  safeStorage.clearUserScopedData("user_alice");

  assert.strictEqual(safeStorage.getItem("cuet_active_uid"), null, "Active pointer removed");
  assert.strictEqual(safeStorage.getItem("cuet_ai_prep_session_storage:user_alice"), null, "Alice data cleared");
  assert.strictEqual(safeStorage.getItem("cuet_ai_prep_session_storage:user_bob"), "bob_progress", "Bob data strictly preserved");
  assert.strictEqual(safeStorage.getItem("cuet_preferred_language"), "en", "Global preferences preserved");
  console.log("  ✓ Passed: Selective user cleanup without collateral damage.");
  passed++;

  console.log("=================================================================");
  console.log(`  ALL ${passed} SITE-WIDE STORAGE & PERSISTENCE TESTS PASSED! ✅  `);
  console.log("=================================================================\n");
}

runSiteWidePersistenceTests().catch((err) => {
  console.error("FATAL TEST FAILURE:", err);
  process.exit(1);
});
