import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

// ─── MOCK SETUP FOR SUPABASE & ENTITLEMENTS ─────────────────────────────────
const serverSupabasePath = require.resolve("../lib/supabase/server");
require(serverSupabasePath);

const adminSupabasePath = require.resolve("../lib/supabase/admin");
require(adminSupabasePath);

const entitlementsPath = require.resolve("../lib/payments/entitlements");
require(entitlementsPath);

let mockAuthUserId = "test-candidate-uuid-12345";
let mockDbAttemptsCount = 0;
let mockUsageLedgerThrows = false;
let insertedAttempts: any[] = [];
let upsertedTests: any[] = [];
let awardedTrophyIds: string[] = [];
let mockDbTest: any = null;
let mockDbTestQuestions: any[] = [];
let mockDbTestQuestionsTestId: string | null = null;
let mockEligibilityOverride: any = null;
let mockInsertAttemptsError: any = null;
let deletedLedgerEntries: any[] = [];
let mockExistingLedgerRow: any = null;
const mockDbQuestions = new Map<string, any>();
const mockDbTests = new Map<string, any>();
let mockDbTestQuestionsRows: any[] = [];
let mockQuestionsUpsertError: any = null;
let mockTestsUpsertError: any = null;
let mockTestQuestionsUpsertError: any = null;
let recordedCompletions: any[] = [];
let mockProfileUpdates: any[] = [];
let mockAwardXpOnceCalls: any[] = [];
let mockAwardXpOnceError: any = null;
let mockAwardedXpMap = new Map<string, number>();
let mockPriorAttemptsQueryError: any = null;
let mockProfilesData: any[] = [];

// Override createClient for authenticated SSR session
require.cache[serverSupabasePath]!.exports = {
  createClient: () => ({
    auth: {
      getUser: async () => ({
        data: {
          user: {
            id: mockAuthUserId,
            email: "candidate@cuetmate.test",
            email_confirmed_at: "2026-01-01T00:00:00Z",
            confirmed_at: "2026-01-01T00:00:00Z",
            app_metadata: { provider: "email" },
          },
        },
      }),
    },
    from: (_table: string) => ({
      select: (_cols?: string, _opts?: any) => {
        const queryResult: any = Promise.resolve({
          count: mockDbAttemptsCount,
          data: [],
          error: null,
        });
        queryResult.eq = (_c: string, _v: any) => queryResult;
        queryResult.order = () => queryResult;
        queryResult.limit = () => queryResult;
        return queryResult;
      },
    }),
  }),
};

// Override createAdminClient for database operations
const createMockAdmin = () => ({
  from: (table: string) => {
    if (table === "user_attempts") {
      return {
        select: (_cols: string, opts?: any) => {
          const filterCriteria: Record<string, any> = {};
          const queryBuilder: any = {
            eq: (col: string, val: any) => {
              filterCriteria[col] = val;
              return queryBuilder;
            },
            limit: async () => {
              if (opts?.count === "exact" && opts?.head === true) {
                if (mockPriorAttemptsQueryError) {
                  throw mockPriorAttemptsQueryError;
                }
                return { count: mockDbAttemptsCount, error: null };
              }
              const matching = insertedAttempts.filter((row) => {
                for (const [k, v] of Object.entries(filterCriteria)) {
                  if (row[k] !== v) return false;
                }
                return true;
              });
              return { data: matching, error: null };
            },
            then: (resolve: any, reject: any) => {
              if (opts?.count === "exact" && opts?.head === true) {
                if (mockPriorAttemptsQueryError) {
                  return Promise.reject(mockPriorAttemptsQueryError).then(resolve, reject);
                }
                const matchingRows = insertedAttempts.filter((row) => {
                  for (const [k, v] of Object.entries(filterCriteria)) {
                    if (row[k] !== v) return false;
                  }
                  return true;
                });
                let count: number;
                if (filterCriteria.test_id) {
                  if (matchingRows.length > 0) {
                    count = matchingRows.length;
                  } else {
                    count = insertedAttempts.length === 0 ? mockDbAttemptsCount : 0;
                  }
                } else {
                  count = mockDbAttemptsCount > 0 ? mockDbAttemptsCount : insertedAttempts.length;
                }
                return Promise.resolve({ count, error: null }).then(resolve, reject);
              }
              const matching = insertedAttempts.filter((row) => {
                for (const [k, v] of Object.entries(filterCriteria)) {
                  if (row[k] !== v) return false;
                }
                return true;
              });
              return Promise.resolve({ data: matching, error: null }).then(resolve, reject);
            },
          };
          return queryBuilder;
        },
        delete: () => {
          const deleteCriteria: Record<string, any> = {};
          const deleteBuilder: any = {
            eq: (col: string, val: any) => {
              deleteCriteria[col] = val;
              return deleteBuilder;
            },
            then: (resolve: any, reject: any) => {
              insertedAttempts = insertedAttempts.filter((row) => {
                for (const [k, v] of Object.entries(deleteCriteria)) {
                  if (row[k] === v) return false;
                }
                return true;
              });
              return Promise.resolve({ error: null }).then(resolve, reject);
            },
          };
          return deleteBuilder;
        },
        insert: async (rows: any[]) => {
          if (mockInsertAttemptsError) {
            return { error: mockInsertAttemptsError };
          }
          insertedAttempts.push(...rows);
          return { error: null };
        },
      };
    }
    if (table === "user_usage_ledger") {
      return {
        select: (_cols?: string) => ({
          eq: (_col1: string, _val1: any) => ({
            eq: (_col2: string, val2: any) => ({
              maybeSingle: async () => ({
                data:
                  mockExistingLedgerRow &&
                  (mockExistingLedgerRow.session_id === val2 ||
                    mockExistingLedgerRow.sessionId === val2 ||
                    stringToUuid(mockExistingLedgerRow.session_id) === val2 ||
                    (typeof val2 === "string" && mockExistingLedgerRow.session_id && val2.endsWith(`:${mockExistingLedgerRow.session_id}`)))
                    ? mockExistingLedgerRow
                    : null,
                error: null,
              }),
            }),
          }),
        }),
        delete: () => ({
          eq: (col1: string, val1: any) => ({
            eq: (col2: string, val2: any) => {
              deletedLedgerEntries.push({ [col1]: val1, [col2]: val2 });
              return Promise.resolve({ error: null });
            },
          }),
        }),
      };
    }
    if (table === "tests") {
      return {
        select: () => ({
          eq: (_col: string, val: any) => ({
            maybeSingle: async () => ({
              data:
                mockDbTest && (mockDbTest.id === val || mockDbTest.test_id === val)
                  ? mockDbTest
                  : mockDbTests.get(val) || null,
              error: null,
            }),
          }),
        }),
        upsert: async (row: any) => {
          if (mockTestsUpsertError) return { error: mockTestsUpsertError };
          mockDbTests.set(row.id, row);
          upsertedTests.push(row);
          return { error: null };
        },
      };
    }
    if (table === "test_questions") {
      return {
        select: () => ({
          eq: (_col: string, val: any) => ({
            order: async () => {
              if (mockDbTestQuestionsTestId === val) {
                return { data: mockDbTestQuestions, error: null };
              }
              const matching = mockDbTestQuestionsRows.filter((r) => r.test_id === val);
              return { data: matching, error: null };
            },
          }),
        }),
        upsert: async (rows: any[]) => {
          if (mockTestQuestionsUpsertError) return { error: mockTestQuestionsUpsertError };
          if (Array.isArray(rows)) {
            mockDbTestQuestionsRows.push(...rows);
          } else {
            mockDbTestQuestionsRows.push(rows);
          }
          return { error: null };
        },
      };
    }
    if (table === "questions") {
      return {
        select: () => ({
          eq: () => ({
            limit: async () => ({ data: Array.from(mockDbQuestions.values()), error: null }),
          }),
          in: () => ({
            limit: async () => ({ data: Array.from(mockDbQuestions.values()), error: null }),
          }),
          ilike: () => ({
            limit: async () => ({ data: [], error: null }),
          }),
          limit: async () => ({ data: Array.from(mockDbQuestions.values()), error: null }),
        }),
        upsert: async (rows: any[]) => {
          if (mockQuestionsUpsertError) return { error: mockQuestionsUpsertError };
          const list = Array.isArray(rows) ? rows : [rows];
          for (const r of list) {
            mockDbQuestions.set(r.id, r);
          }
          return { error: null };
        },
      };
    }
    if (table === "profiles") {
      return {
        select: (_cols?: string) => {
          const profileQuery: any = {
            order: (_col: string, _opts?: any) => Promise.resolve({
              data: mockProfilesData.length > 0 ? mockProfilesData : [
                {
                  id: mockAuthUserId,
                  full_name: "Test Aspirant",
                  target_stream: "science",
                  target_college: "Hindu College",
                  target_university: "Delhi University",
                  current_streak: 2,
                  last_practice_date: "2026-10-21",
                  xp: 100,
                  selected_subjects: ["Physics"],
                  created_at: "2026-01-01T00:00:00Z",
                },
              ],
              error: null,
            }),
            eq: (_col: string, _val: any) => ({
              maybeSingle: async () => ({
                data: { is_premium: true, subscription_tier: "super_50", xp: 100, current_streak: 2, last_practice_date: "2026-10-21" },
                error: null,
              }),
            }),
            maybeSingle: async () => ({
              data: { is_premium: true, subscription_tier: "super_50", xp: 100, current_streak: 2, last_practice_date: "2026-10-21" },
              error: null,
            }),
          };
          return profileQuery;
        },
        update: (updates: any) => ({
          eq: async () => {
            mockProfileUpdates.push(updates);
            return { error: null };
          },
        }),
      };
    }
    return {
      select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }),
      upsert: async () => ({ error: null }),
    };
  },
  rpc: async (fn: string, args: any) => {
    if (fn === "award_trophies") {
      awardedTrophyIds.push(...(args.p_trophy_ids || []));
      return { data: args.p_trophy_ids, error: null };
    }
    if (fn === "award_xp_once") {
      if (mockAwardXpOnceError) {
        return { data: null, error: mockAwardXpOnceError };
      }
      mockAwardXpOnceCalls.push(args);
      const key = `${args.p_user_id}_${args.p_test_id}`;
      if (mockAwardedXpMap.has(key)) {
        return { data: 0, error: null };
      }
      mockAwardedXpMap.set(key, args.p_xp_amount);
      return { data: args.p_xp_amount, error: null };
    }
    return { data: null, error: null };
  },
});

const mockAdminClient = createMockAdmin();
require.cache[adminSupabasePath]!.exports = {
  createAdminClient: () => mockAdminClient,
  supabaseAdmin: mockAdminClient,
};

// Override entitlements checks
require.cache[entitlementsPath]!.exports = {
  ...require.cache[entitlementsPath]!.exports,
  getUserEntitlement: async (userId: string) => ({
    userId,
    isPremium: true,
    accessState: "ACTIVE_PREMIUM",
    subscriptionTier: "super_50",
    subscriptionExpiresAt: null,
    isActive: true,
  }),
  checkTestSessionEligibility: async (userId: string, testId: string) => {
    if (mockEligibilityOverride) {
      return mockEligibilityOverride(userId, testId);
    }
    return {
      allowed: true,
      limitReached: false,
      testType: "mock",
      currentUsage: 0,
      maxAllowed: Infinity,
      canonicalSubject: "physics",
    };
  },
  recordSessionCompletion: async (args: any) => {
    if (mockUsageLedgerThrows) {
      throw new Error("[TEST] Simulated user_usage_ledger database failure");
    }
    recordedCompletions.push(args);
  },
};

const { GET, POST } = require("../app/api/test/[testId]/route");
const { handleAI: postRepairQuiz } = require("../lib/api-handlers/ai");
const { resolveCanonicalTestId } = require("../lib/canonical-tests");
const { stringToUuid } = require("../lib/utils");
const { isDesignatedFreeTest, DESIGNATED_FREE_TEST_IDS } = require("../lib/payments/entitlements");
const { buildScoredSet } = require("../lib/scoring");
const { resetRateLimitKey } = require("../lib/security/rateLimiter");

describe("Test Route Authoritative Answer Key Hardening & Phoenix Lockdown", () => {
  beforeEach(() => {
    mockAuthUserId = "test-candidate-uuid-12345";
    resetRateLimitKey("ai:repair_quiz", "usr:test-candidate-uuid-12345");
    mockDbAttemptsCount = 0;
    mockUsageLedgerThrows = false;
    insertedAttempts = [];
    recordedCompletions = [];
    mockProfileUpdates = [];
    mockAwardXpOnceCalls = [];
    mockAwardXpOnceError = null;
    mockAwardedXpMap.clear();
    mockPriorAttemptsQueryError = null;
    mockProfilesData = [];
    upsertedTests = [];
    awardedTrophyIds = [];
    mockDbTest = null;
    mockDbTestQuestions = [];
    mockDbTestQuestionsTestId = null;
    mockEligibilityOverride = null;
    mockInsertAttemptsError = null;
    deletedLedgerEntries = [];
    mockExistingLedgerRow = null;
    mockDbQuestions.clear();
    mockDbTests.clear();
    mockDbTestQuestionsRows = [];
    mockQuestionsUpsertError = null;
    mockTestsUpsertError = null;
    mockTestQuestionsUpsertError = null;
  });

  // ─── TEST 1: UNKNOWN TEST ID REJECTED ──────────────────────────────────────
  it("should strictly reject unknown testId (400) and write nothing to database", async () => {
    const unknownPayload = {
      testId: "unknown-arbitrary-test-9999",
      questions: [
        {
          questionNumber: 1,
          selectedOption: "A",
          timeSpentSeconds: 30,
        },
      ],
    };

    const req = new NextRequest("http://localhost:3000/api/test/unknown-arbitrary-test-9999", {
      method: "POST",
      body: JSON.stringify(unknownPayload),
    });

    const res = await POST(req, { params: { testId: "unknown-arbitrary-test-9999" } });
    assert.equal(res.status, 400, "Unknown testId must return HTTP 400 Bad Request");

    const data = await res.json();
    assert.equal(data.code, "INVALID_TEST");
    assert.ok(data.error.includes("No authoritative question set found"));
    assert.equal(insertedAttempts.length, 0, "Must write nothing to user_attempts");
    assert.equal(upsertedTests.length, 0, "Must write nothing to tests table");
  });

  // ─── TEST 2: QUESTION WITHOUT SERVER KEY REJECTED ───────────────────────────
  it("should strictly reject question without server key (400) and write nothing", async () => {
    const validTestWithFakeQuestion = {
      testId: "physics-mock-1",
      questions: [
        {
          questionId: "completely-fabricated-question-uuid",
          questionNumber: 9999, // Question 9999 does not exist in Physics Mock 1
          selectedOption: "A",
          timeSpentSeconds: 40,
        },
      ],
    };

    const req = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify(validTestWithFakeQuestion),
    });

    const res = await POST(req, { params: { testId: "physics-mock-1" } });
    assert.equal(res.status, 400, "Question without server key must return HTTP 400");

    const data = await res.json();
    assert.equal(data.code, "MISSING_AUTHORITATIVE_KEY");
    assert.ok(data.error.includes("has no authoritative answer key"));
    assert.equal(insertedAttempts.length, 0, "Must write nothing to database on missing key");
  });

  // ─── TEST 3: CLIENT CORRECTOPTION IGNORED ───────────────────────────────────
  it("should completely ignore client correctOption and score strictly against authoritative key", async () => {
    // In physics-mock-1, question 1 authoritative key is 'C'
    const submissionWithForgedKey = {
      testId: "physics-mock-1",
      attemptId: "attempt-test-scoring-3",
      questions: [
        {
          questionNumber: 1,
          selectedOption: "A",
          correctOption: "A", // Client falsely claims 'A' is correct
          timeSpentSeconds: 30,
        },
        {
          questionNumber: 2,
          selectedOption: "B",
          correctOption: "D", // Client claims 'D', but let server score authoritative answer
          timeSpentSeconds: 30,
        },
      ],
    };

    const req = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify(submissionWithForgedKey),
    });

    const res = await POST(req, { params: { testId: "physics-mock-1" } });
    assert.equal(res.status, 200, "Valid test with answered questions must succeed");

    const data = await res.json();
    assert.equal(data.success, true);

    const q1 = data.attempt.questions[0];
    assert.equal(q1.correctOption, "C", "Server must overwrite client correctOption with authoritative key 'C'");
    assert.equal(q1.isCorrect, false, "Candidate selected 'A' against authoritative 'C', must be marked incorrect");

    // Verify database inserted row has server-derived is_correct
    const insertedRowQ1 = insertedAttempts.find((r) => r.selected_option === "A");
    assert.ok(insertedRowQ1, "Inserted row for Q1 must exist");
    assert.equal(insertedRowQ1.is_correct, false, "Inserted DB attempt row must be false regardless of client payload");
  });

  // ─── TEST 4: EMPTY SUBMISSION REJECTED AND RETURNS NO ANSWERS ──────────────
  it("should reject empty submission with 0 answered questions (400) and return no answers", async () => {
    // Case A: Completely empty questions array
    const emptyArraySubmission = {
      testId: "physics-mock-1",
      questions: [],
    };

    const reqA = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify(emptyArraySubmission),
    });

    const resA = await POST(reqA, { params: { testId: "physics-mock-1" } });
    assert.equal(resA.status, 400, "Empty questions array must return HTTP 400");
    const dataA = await resA.json();
    assert.equal(dataA.code, "EMPTY_SUBMISSION");
    assert.equal(dataA.questions, undefined, "No questions or answers returned on empty submission");
    assert.equal(insertedAttempts.length, 0, "Must write nothing to database");

    // Case B: Questions present but all unattempted (selectedOption is null)
    const allNullSubmission = {
      testId: "physics-mock-1",
      questions: [
        { questionNumber: 1, selectedOption: null, timeSpentSeconds: 0 },
        { questionNumber: 2, selectedOption: null, timeSpentSeconds: 0 },
      ],
    };

    const reqB = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify(allNullSubmission),
    });

    const resB = await POST(reqB, { params: { testId: "physics-mock-1" } });
    assert.equal(resB.status, 400, "All null answers must return HTTP 400");
    const dataB = await resB.json();
    assert.equal(dataB.code, "EMPTY_SUBMISSION");
    assert.equal(dataB.questions, undefined, "No answers returned on zero answered questions");
    assert.equal(insertedAttempts.length, 0, "Must write nothing to database");
  });

  // ─── TEST 5: 'repair-x' TESTID CANNOT AWARD THE-PHOENIX ─────────────────────
  it("'repair-x' testId cannot award the-phoenix trophy", async () => {
    // 1. Client submits attempt with testId: 'repair-x'
    const forgedRepairSubmission = {
      testId: "repair-x",
      questions: [
        { questionNumber: 1, selectedOption: "A", timeSpentSeconds: 20 },
      ],
    };

    const req = new NextRequest("http://localhost:3000/api/test/repair-x", {
      method: "POST",
      body: JSON.stringify(forgedRepairSubmission),
    });

    const res = await POST(req, { params: { testId: "repair-x" } });
    // 'repair-x' has no authoritative question set (not in file bank and not in tests/test_questions)
    assert.equal(res.status, 400, "'repair-x' must be rejected as an unauthoritative test");

    const data = await res.json();
    assert.equal(data.code, "INVALID_TEST");

    // Trophy RPC was never invoked for the-phoenix
    assert.ok(
      !awardedTrophyIds.includes("the-phoenix"),
      "'repair-x' must never trigger award of 'the-phoenix' trophy"
    );

    // 2. Verify static route code does NOT use substring matching on client testId
    const routeSource = fs.readFileSync(path.join(__dirname, "../app/api/test/[testId]/route.ts"), "utf-8");
    assert.ok(
      !routeSource.includes('targetTestId.toLowerCase().includes("repair")'),
      "Route must NOT use substring matching on targetTestId for repair quiz derivation"
    );
    assert.ok(
      !routeSource.includes('targetTestId.toLowerCase().includes("drill")'),
      "Route must NOT use substring matching on targetTestId for drill derivation"
    );
  });

  // ─── TEST 6: REVEAL BRANCH (action === 'submit') REQUIRES USER_ATTEMPTS ──────
  it("in action === 'submit' reveal branch, only returns answers if user already has user_attempts rows (otherwise 403)", async () => {
    // Candidate has 0 attempts recorded in DB
    mockDbAttemptsCount = 0;

    const revealReq = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        action: "submit",
        answersSubmitted: true,
      }),
    });

    const res = await POST(revealReq, { params: { testId: "physics-mock-1" } });
    assert.equal(res.status, 403, "Must return HTTP 403 if candidate has not recorded attempts for this test");

    const data = await res.json();
    assert.equal(data.code, "NO_ATTEMPTS_FOUND");
    assert.equal(data.questions, undefined, "Must not reveal questions or answers");

    // Now simulate candidate DOES have attempts in DB
    mockDbAttemptsCount = 50;

    const authRevealReq = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        action: "submit",
        answersSubmitted: true,
      }),
    });

    const authRes = await POST(authRevealReq, { params: { testId: "physics-mock-1" } });
    assert.equal(authRes.status, 200, "Must return 200 once attempts are confirmed in database");

    const authData = await authRes.json();
    assert.equal(authData.success, true);
    assert.ok(Array.isArray(authData.questions) && authData.questions.length > 0, "Authoritative questions revealed");
  });

  // ─── TEST 7: recordSessionCompletion FAILS CLOSED ───────────────────────────
  it("recordSessionCompletion must be called before returning answers, and fail closed if it errors", async () => {
    mockUsageLedgerThrows = true; // Simulate failure in user_usage_ledger recording

    const validSubmission = {
      testId: "physics-mock-1",
      attemptId: "attempt-test-ledger-fail-7",
      questions: [
        {
          questionNumber: 1,
          selectedOption: "C",
          timeSpentSeconds: 30,
        },
      ],
    };

    const req = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify(validSubmission),
    });

    const res = await POST(req, { params: { testId: "physics-mock-1" } });
    assert.equal(res.status, 500, "Route must fail closed with HTTP 500 if recordSessionCompletion errors");

    const data = await res.json();
    assert.equal(data.code, "USAGE_RECORDING_FAILED");
    assert.equal(data.questions, undefined, "No questions or answers must be returned if ledger recording fails");
  });

  // ─── TEST 8: PHYSICS MOCK 4 REJECTED FOR FREE USER ──────────────────────────
  it("Physics mock 4 rejected for free user", async () => {
    // 1. Verify registry designations: mock-1 is free, mock-4 is NOT free (since free allowance is first 3 mocks)
    assert.equal(isDesignatedFreeTest("physics-mock-1"), true, "Physics Mock 1 is in designated free tests");
    assert.equal(isDesignatedFreeTest("physics-mock-4"), false, "Physics Mock 4 is NOT in designated free tests");

    // 2. Configure eligibility check to enforce free user restriction against DESIGNATED_FREE_TEST_IDS
    mockEligibilityOverride = async (_userId: string, testId: string) => {
      const allowed = isDesignatedFreeTest(testId);
      return {
        allowed,
        limitReached: !allowed,
        reason: allowed ? undefined : "This test is exclusive to CUETMate Premium. The Free plan includes up to 3 distinct mock exams. Upgrade to CUETMate Premium to unlock all tests.",
        testType: "mock",
        currentUsage: 0,
        maxAllowed: 3,
        canonicalSubject: "physics",
      };
    };

    // 3. Test GET /api/test/physics-mock-4 returns HTTP 403
    const getReq = new NextRequest("http://localhost:3000/api/test/physics-mock-4", {
      method: "GET",
    });
    const getRes = await GET(getReq, { params: { testId: "physics-mock-4" } });
    assert.equal(getRes.status, 403, "Free user GET on physics-mock-4 must return HTTP 403");
    const getData = await getRes.json();
    assert.equal(getData.code, "PAYWALL_LIMIT_REACHED");
    assert.equal(getData.questions, undefined, "Sanitized questions must not be released to free user");

    // 4. Test POST record on physics-mock-4 returns HTTP 403
    const postPayload = {
      testId: "physics-mock-4",
      questions: [
        { questionNumber: 1, selectedOption: "A", timeSpentSeconds: 30 },
      ],
    };
    const postReq = new NextRequest("http://localhost:3000/api/test/physics-mock-4", {
      method: "POST",
      body: JSON.stringify(postPayload),
    });
    const postRes = await POST(postReq, { params: { testId: "physics-mock-4" } });
    assert.equal(postRes.status, 403, "Free user POST submission on physics-mock-4 must return HTTP 403");
    const postData = await postRes.json();
    assert.equal(postData.code, "PAYWALL_LIMIT_REACHED");
    assert.equal(insertedAttempts.length, 0, "No attempts recorded for unauthorized free mock-4 attempt");

    // 5. Test POST reveal branch on physics-mock-4 returns HTTP 403
    const revealReq = new NextRequest("http://localhost:3000/api/test/physics-mock-4", {
      method: "POST",
      body: JSON.stringify({ action: "submit", answersSubmitted: true }),
    });
    const revealRes = await POST(revealReq, { params: { testId: "physics-mock-4" } });
    assert.equal(revealRes.status, 403, "Reveal on physics-mock-4 must return HTTP 403");
  });

  // ─── TEST 9: ALIAS IDS RESOLVE TO THE SAME UUID ─────────────────────────────
  it("alias IDs resolve to the same UUID", () => {
    const canonicalKey = "physics-mock-1";
    const expectedUuid = stringToUuid(canonicalKey);

    const aliases = [
      "physics-mock-1",
      "Physics_Mock_1",
      "physics-mock-01",
      "phys-mock-1",
      "Physics Mock 1",
      "PHYSICS-MOCK-1",
      "phys_mock_01",
    ];

    for (const alias of aliases) {
      const resolved = resolveCanonicalTestId(alias);
      assert.equal(
        resolved,
        canonicalKey,
        `Alias "${alias}" must resolve to canonical key "${canonicalKey}"`
      );
      assert.equal(
        stringToUuid(resolved!),
        expectedUuid,
        `Alias "${alias}" canonical UUID must match expected UUID`
      );
    }

    // Practice test aliases resolve to the same canonical key and UUID
    const practiceResolved1 = resolveCanonicalTestId("practice_physics_unit01_test01");
    const practiceResolved2 = resolveCanonicalTestId("practice-physics-unit1-test1");
    assert.equal(practiceResolved1, "practice-physics-unit1-test1");
    assert.equal(practiceResolved2, "practice-physics-unit1-test1");
    assert.equal(stringToUuid(practiceResolved1!), stringToUuid(practiceResolved2!));

    // PYQ aliases resolve to the same canonical key and UUID
    const pyqResolved1 = resolveCanonicalTestId("Physics_PYQ_01");
    const pyqResolved2 = resolveCanonicalTestId("physics-pyq-1");
    assert.equal(pyqResolved1, "physics-pyq-1");
    assert.equal(pyqResolved2, "physics-pyq-1");
    assert.equal(stringToUuid(pyqResolved1!), stringToUuid(pyqResolved2!));

    // Non-existent or invalid aliases return null
    assert.equal(resolveCanonicalTestId("unknown-subject-mock-1"), null);
    assert.equal(resolveCanonicalTestId("physics-mock-999"), null);
    assert.equal(resolveCanonicalTestId(""), null);
    assert.equal(resolveCanonicalTestId(null as any), null);
  });

  // ─── TEST 10: LEDGER FAILURE LEAVES NO ATTEMPT ROWS ────────────────────────
  it("ledger failure leaves no attempt rows", async () => {
    mockUsageLedgerThrows = true; // Force recordSessionCompletion to fail

    const attemptPayload = {
      testId: "physics-mock-1",
      attemptId: "attempt-ledger-failure-check-10",
      questions: [
        { questionNumber: 1, selectedOption: "C", timeSpentSeconds: 25 },
        { questionNumber: 2, selectedOption: "B", timeSpentSeconds: 35 },
      ],
    };

    const req = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify(attemptPayload),
    });

    const res = await POST(req, { params: { testId: "physics-mock-1" } });
    assert.equal(res.status, 500, "Ledger failure must return HTTP 500");
    const data = await res.json();
    assert.equal(data.code, "USAGE_RECORDING_FAILED");

    // Critical assertion: user_attempts must NOT contain any inserted rows
    assert.equal(
      insertedAttempts.length,
      0,
      "Ledger failure must leave zero rows in user_attempts"
    );

    // Verify subsequent reveal call fails with 403 NO_ATTEMPTS_FOUND
    const revealReq = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({ action: "submit", answersSubmitted: true }),
    });
    const revealRes = await POST(revealReq, { params: { testId: "physics-mock-1" } });
    assert.equal(revealRes.status, 403, "Reveal must return 403 because no attempts were inserted");
    const revealData = await revealRes.json();
    assert.equal(revealData.code, "NO_ATTEMPTS_FOUND");
    assert.equal(revealData.questions, undefined, "Answers cannot be released when ledger failed");
  });

  // ─── TEST 11: REPAIR QUIZ SUBMISSION SCORES ACCURATELY ─────────────────────
  it("Repair quiz submission scores accurately for a real repair test", async () => {
    const repairTestId = "repair_quiz_test-can_physics_core_98765";
    const repairTestUuid = stringToUuid(repairTestId);

    // 1. Configure mock database with authoritative test record and test_questions
    mockDbTest = {
      id: repairTestUuid,
      title: "15-Question Adaptive Micro-Drill (Kinematics & Newton Laws)",
      subject: "Physics",
      total_questions: 5,
      duration_minutes: 10,
      is_active: true,
      is_repair_quiz: true,
      test_type: "repair_quiz",
    };
    mockDbTestQuestionsTestId = repairTestUuid;

    // 5 authoritative questions in database with correct_option: 'A'
    mockDbTestQuestions = [1, 2, 3, 4, 5].map((num) => ({
      order_index: num,
      question_id: `q-uuid-repair-${num}`,
      questions: {
        id: `q-uuid-repair-${num}`,
        question_text: `Repair Question ${num}`,
        option_a: "Correct Option A",
        option_b: "Distractor B",
        option_c: "Distractor C",
        option_d: "Distractor D",
        correct_option: "A",
        explanation: "Authoritative concept remediation",
        subject: "Physics",
        chapter: "Kinematics",
        micro_topic: "Motion in 1D",
        ncert_reference: "NCERT Class 11 Chapter 3",
      },
    }));

    // 2. Candidate answers 4 out of 5 correctly (80% accuracy >= 80%)
    const submissionPayload = {
      testId: repairTestId,
      attemptId: "attempt-phoenix-award-11",
      questions: [
        { questionNumber: 1, selectedOption: "A", timeSpentSeconds: 20 },
        { questionNumber: 2, selectedOption: "A", timeSpentSeconds: 20 },
        { questionNumber: 3, selectedOption: "A", timeSpentSeconds: 20 },
        { questionNumber: 4, selectedOption: "A", timeSpentSeconds: 20 },
        { questionNumber: 5, selectedOption: "B", timeSpentSeconds: 20 }, // 1 wrong -> 80% accuracy
      ],
    };

    const req = new NextRequest(`http://localhost:3000/api/test/${repairTestId}`, {
      method: "POST",
      body: JSON.stringify(submissionPayload),
    });

    const res = await POST(req, { params: { testId: repairTestId } });
    assert.equal(res.status, 200, "Submission for valid repair quiz must succeed with 200");

    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.attempt.correctCount, 4);
    assert.equal(data.attempt.incorrectCount, 1);
    assert.equal(data.attempt.accuracyPercentage, 80);
  });

  // ─── TEST 12: ALL ENTRIES IN DESIGNATED_FREE_TEST_IDS SATISFY CANONICAL ID ─
  it("every entry in DESIGNATED_FREE_TEST_IDS satisfies resolveCanonicalTestId(id) === id", () => {
    const registryArray = Array.from(DESIGNATED_FREE_TEST_IDS as Set<string>);
    const failedEntries: Array<{ id: string; resolved: string | null }> = [];

    for (const testId of registryArray) {
      const canonical = resolveCanonicalTestId(testId);
      if (canonical !== testId) {
        failedEntries.push({ id: testId, resolved: canonical });
      }
    }

    if (failedEntries.length > 0) {
      console.error("Non-canonical entries in DESIGNATED_FREE_TEST_IDS:", failedEntries);
    }

    // Print the full registry without any ellipses (no "...")
    console.log(`\n=== FULL DESIGNATED_FREE_TEST_IDS REGISTRY (${registryArray.length} entries) ===`);
    registryArray.forEach((id, idx) => {
      console.log(`${idx + 1}. ${id}`);
    });
    console.log("===============================================================================\n");

    assert.equal(
      failedEntries.length,
      0,
      `All entries in DESIGNATED_FREE_TEST_IDS must resolve to themselves. Failed: ${JSON.stringify(failedEntries)}`
    );
  });

  // ─── TEST 13: DRILL AND REPAIR QUIZ SUBMIT WORKS END TO END (DB-BACKED) ────
  it("drill and repair quiz submit works end to end against a DB-backed test", async () => {
    // Part A: 15-Question Adaptive Micro-Drill
    const drillTestId = "adaptive_drill_test-can_1792600000000";
    const drillTestUuid = stringToUuid(drillTestId);

    mockDbTest = {
      id: drillTestUuid,
      title: "15-Question Adaptive Micro-Drill (Optics)",
      subject: "Physics",
      total_questions: 15,
      duration_minutes: 18,
      is_active: true,
    };
    mockDbTestQuestionsTestId = drillTestUuid;
    mockDbTestQuestions = Array.from({ length: 15 }, (_, i) => ({
      order_index: i + 1,
      question_id: `q-uuid-drill-${i + 1}`,
      questions: {
        id: `q-uuid-drill-${i + 1}`,
        question_text: `Adaptive Drill Question ${i + 1}`,
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
        correct_option: "B",
        explanation: "Authoritative Drill Explanation",
        subject: "Physics",
        chapter: "Ray Optics",
        micro_topic: "Refraction",
        ncert_reference: "NCERT Class 12 Chapter 9",
      },
    }));

    const drillSubmission = {
      testId: drillTestId,
      attemptId: "attempt-adaptive-drill-e2e",
      questions: Array.from({ length: 15 }, (_, i) => ({
        questionNumber: i + 1,
        selectedOption: "B",
        timeSpentSeconds: 30,
      })),
    };

    const drillReq = new NextRequest(`http://localhost:3000/api/test/${drillTestId}`, {
      method: "POST",
      body: JSON.stringify(drillSubmission),
    });

    const drillRes = await POST(drillReq, { params: { testId: drillTestId } });
    assert.equal(drillRes.status, 200, "Adaptive drill submission must succeed with HTTP 200");
    const drillData = await drillRes.json();
    assert.equal(drillData.success, true);
    assert.equal(drillData.attempt.correctCount, 15);
    assert.equal(drillData.attempt.accuracyPercentage, 100);
    assert.equal(insertedAttempts.length, 15, "All 15 drill attempt rows inserted in user_attempts");

    // Part B: 5-Question Remedial Repair Quiz
    insertedAttempts = [];
    const repairQuizId = "repair_quiz_test-can_physics_1792600000000";
    const repairQuizUuid = stringToUuid(repairQuizId);

    mockDbTest = {
      id: repairQuizUuid,
      title: "Adaptive Repair Drill • Optics",
      subject: "Physics",
      total_questions: 5,
      duration_minutes: 6,
      is_active: true,
      is_repair_quiz: true,
    };
    mockDbTestQuestionsTestId = repairQuizUuid;
    mockDbTestQuestions = Array.from({ length: 5 }, (_, i) => ({
      order_index: i + 1,
      question_id: `q-uuid-repair-${i + 1}`,
      questions: {
        id: `q-uuid-repair-${i + 1}`,
        question_text: `Remedial Question ${i + 1}`,
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
        correct_option: "A",
        explanation: "Authoritative Remedial Explanation",
        subject: "Physics",
        chapter: "Ray Optics",
        micro_topic: "Total Internal Reflection",
        ncert_reference: "NCERT Class 12 Chapter 9",
      },
    }));

    const repairSubmission = {
      testId: repairQuizId,
      attemptId: "attempt-repair-quiz-e2e",
      questions: Array.from({ length: 5 }, (_, i) => ({
        questionNumber: i + 1,
        selectedOption: "A",
        timeSpentSeconds: 25,
      })),
    };

    const repairReq = new NextRequest(`http://localhost:3000/api/test/${repairQuizId}`, {
      method: "POST",
      body: JSON.stringify(repairSubmission),
    });

    const repairRes = await POST(repairReq, { params: { testId: repairQuizId } });
    assert.equal(repairRes.status, 200, "Remedial repair quiz submission must succeed with HTTP 200");
    const repairData = await repairRes.json();
    assert.equal(repairData.success, true);
    assert.equal(repairData.attempt.correctCount, 5);
    assert.equal(repairData.attempt.accuracyPercentage, 100);
    assert.equal(insertedAttempts.length, 5, "All 5 repair quiz attempt rows inserted in user_attempts");
  });

  // ─── TEST 14: ANOTHER USER'S DRILL ID IS REJECTED (403) ─────────────────────
  it("another user's drill ID is rejected", async () => {
    // Current authenticated candidate user id is "test-candidate-uuid-12345" (prefix "test-can")
    // Foreign user prefix is "diffuser"
    const foreignDrillId = "adaptive_drill_diffuser_1792600000000";
    const foreignRepairId = "repair_quiz_diffuser_physics_1792600000000";
    const foreignRitualId = "sunday_redemption_diffuser_20261022";

    // 1. GET foreign adaptive drill rejected
    const getReq = new NextRequest(`http://localhost:3000/api/test/${foreignDrillId}`, { method: "GET" });
    const getRes = await GET(getReq, { params: { testId: foreignDrillId } });
    assert.equal(getRes.status, 403, "GET on another user's drill ID must return HTTP 403");
    const getData = await getRes.json();
    assert.equal(getData.code, "FORBIDDEN_TEST_OWNERSHIP");

    // 2. POST attempt record on foreign repair quiz rejected
    const postPayload = {
      testId: foreignRepairId,
      questions: [{ questionNumber: 1, selectedOption: "A", timeSpentSeconds: 20 }],
    };
    const postReq = new NextRequest(`http://localhost:3000/api/test/${foreignRepairId}`, {
      method: "POST",
      body: JSON.stringify(postPayload),
    });
    const postRes = await POST(postReq, { params: { testId: foreignRepairId } });
    assert.equal(postRes.status, 403, "POST on another user's repair quiz ID must return HTTP 403");
    const postData = await postRes.json();
    assert.equal(postData.code, "FORBIDDEN_TEST_OWNERSHIP");
    assert.equal(insertedAttempts.length, 0, "No attempts recorded for foreign test submission");

    // 3. POST reveal on foreign Sunday ritual rejected
    const revealReq = new NextRequest(`http://localhost:3000/api/test/${foreignRitualId}`, {
      method: "POST",
      body: JSON.stringify({ action: "submit", answersSubmitted: true }),
    });
    const revealRes = await POST(revealReq, { params: { testId: foreignRitualId } });
    assert.equal(revealRes.status, 403, "Reveal on another user's ritual ID must return HTTP 403");
    const revealData = await revealRes.json();
    assert.equal(revealData.code, "FORBIDDEN_TEST_OWNERSHIP");
  });

  // ─── TEST 15: REVEAL WORKS AFTER FREE QUOTA IS USED ─────────────────────────
  it("reveal works after free quota is used", async () => {
    // Simulate candidate having completed all 3 free mock sessions
    mockDbAttemptsCount = 50; // Candidate already recorded attempts for physics-mock-1 in DB

    // Quota check returns limitReached: true (no more mocks can be started)
    mockEligibilityOverride = async () => ({
      allowed: false,
      limitReached: true,
      reason: "You have completed all 3 free mock exams. Unlock unlimited full-length mocks with CUETMate Premium.",
      testType: "mock",
      currentUsage: 3,
      maxAllowed: 3,
      canonicalSubject: "physics",
    });

    // Calling GET to start a new mock is blocked
    const getReq = new NextRequest("http://localhost:3000/api/test/physics-mock-1", { method: "GET" });
    const getRes = await GET(getReq, { params: { testId: "physics-mock-1" } });
    assert.equal(getRes.status, 403, "Starting a test must be blocked when quota is exhausted");

    // Calling POST reveal for the test that the candidate ALREADY completed must SUCCEED with 200
    const revealReq = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({ action: "submit", answersSubmitted: true }),
    });
    const revealRes = await POST(revealReq, { params: { testId: "physics-mock-1" } });
    assert.equal(
      revealRes.status,
      200,
      "Reveal for previously completed test must return HTTP 200 even after free quota is exhausted"
    );
    const revealData = await revealRes.json();
    assert.equal(revealData.success, true);
    assert.ok(Array.isArray(revealData.questions) && revealData.questions.length > 0, "Solutions revealed");
  });

  // ─── TEST 16: ATTEMPTS INSERTION FAILURE ROLLS BACK LEDGER ──────────────────
  it("if user_attempts insert fails, removes the ledger row just written and returns 500 (no partial state)", async () => {
    // Simulate failure during user_attempts insertion
    mockInsertAttemptsError = new Error("Simulated PostgreSQL connection failure during user_attempts insert");

    const validSubmission = {
      testId: "physics-mock-1",
      attemptId: "attempt-insert-fail-rollback",
      questions: [
        { questionNumber: 1, selectedOption: "C", timeSpentSeconds: 30 },
      ],
    };

    const req = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify(validSubmission),
    });

    const res = await POST(req, { params: { testId: "physics-mock-1" } });
    assert.equal(res.status, 500, "Must return HTTP 500 if user_attempts insert fails");
    const data = await res.json();
    assert.equal(data.code, "ATTEMPTS_INSERTION_FAILED");

    // Assert that the ledger row written before the insert attempt was deleted
    assert.ok(
      deletedLedgerEntries.length > 0,
      "Must delete the user_usage_ledger row just written to prevent partial consumption state"
    );

    // Assert zero attempt rows were recorded
    assert.equal(insertedAttempts.length, 0, "No attempt rows must remain in database");
  });

  // ─── TEST 17: ONE stringToUuid IMPLEMENTATION ACROSS ALL MODULES ────────────
  it("uses ONE stringToUuid implementation everywhere and asserts they match", async () => {
    const { stringToUuid: utilsUuid } = require("../lib/utils");
    const { stringToUuid: entitlementsUuid } = require("../lib/payments/entitlements");
    const { stringToUuid: analyticsUuid } = require("../lib/analytics");
    const { stringToUuid: sundayRitualUuid } = require("../lib/sunday-ritual");

    // 1. Assert reference identity: modules export the exact same function reference from lib/utils
    assert.strictEqual(utilsUuid, entitlementsUuid, "entitlements must export the exact same stringToUuid from lib/utils");
    assert.strictEqual(utilsUuid, analyticsUuid, "analytics must re-export the exact same stringToUuid from lib/utils");
    assert.strictEqual(utilsUuid, sundayRitualUuid, "sunday-ritual must export the exact same stringToUuid from lib/utils");

    // 2. Assert route.ts and repair-quiz/route.ts import stringToUuid directly from lib/utils
    const testRouteSource = fs.readFileSync(path.join(process.cwd(), "app/api/test/[testId]/route.ts"), "utf-8");
    assert.ok(
      testRouteSource.includes('from "@/lib/utils"') && testRouteSource.includes("stringToUuid"),
      "app/api/test/[testId]/route.ts must import stringToUuid directly from @/lib/utils"
    );
    const repairQuizSource = fs.readFileSync(path.join(process.cwd(), "lib/api-handlers/ai.ts"), "utf-8");
    assert.ok(
      repairQuizSource.includes('from "@/lib/utils"') && repairQuizSource.includes("stringToUuid"),
      "lib/api-handlers/ai.ts must import stringToUuid directly from @/lib/utils"
    );

    // 3. Assert determinism on arbitrary string keys
    const testKey = "physics-mock-1";
    const expectedHash = utilsUuid(testKey);
    assert.equal(entitlementsUuid(testKey), expectedHash);
    assert.equal(analyticsUuid(testKey), expectedHash);
    assert.equal(sundayRitualUuid(testKey), expectedHash);

    // 4. Assert RFC 4122 UUID passthrough: stringToUuid returns valid UUIDs unchanged (in lowercase)
    const validUuid = "f47ac10b-58cc-4372-a567-0e02b2c3d479";
    assert.equal(utilsUuid(validUuid), validUuid);
    assert.equal(utilsUuid(validUuid.toUpperCase()), validUuid);
  });

  // ─── TEST 18: LEDGER ROLLBACK ONLY DELETES ROW IF THIS REQUEST INSERTED IT ──
  it("ledger rollback only deletes the ledger row if this request inserted it", async () => {
    // Case A: Fresh submission where ledger row DID NOT exist before
    mockExistingLedgerRow = null;
    mockInsertAttemptsError = new Error("Simulated insertion failure");
    deletedLedgerEntries = [];

    const reqA = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        attemptId: "fresh-attempt-id",
        questions: [{ questionNumber: 1, selectedOption: "A", timeSpentSeconds: 15 }],
      }),
    });
    const resA = await POST(reqA, { params: { testId: "physics-mock-1" } });
    assert.equal(resA.status, 500);
    assert.equal(
      deletedLedgerEntries.length,
      1,
      "Ledger row must be deleted on failure because this request inserted it"
    );

    // Case B: Retry submission where ledger row ALREADY existed before this request
    deletedLedgerEntries = [];
    const preexistingSessionUuid = "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d";
    mockExistingLedgerRow = { id: "preexisting-ledger-row-uuid", session_id: preexistingSessionUuid };

    const reqB = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        attemptId: preexistingSessionUuid,
        questions: [{ questionNumber: 1, selectedOption: "A", timeSpentSeconds: 15 }],
      }),
    });
    const resB = await POST(reqB, { params: { testId: "physics-mock-1" } });
    assert.equal(resB.status, 500);
    assert.equal(
      deletedLedgerEntries.length,
      0,
      "Preexisting ledger row must NOT be deleted when attempt insert fails"
    );
  });

  // ─── TEST 19: TWO USERS WITH AI QUESTION ID 'q1' DO NOT OVERWRITE EACH OTHER ─
  it("two users with an AI question id 'q1' do not overwrite each other in the database", async () => {
    mockDbQuestions.clear();
    mockDbTests.clear();
    mockDbTestQuestionsRows = [];

    // User A generates remedial repair quiz
    mockAuthUserId = "usera123-uuid-4567";
    const reqUserA = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        weakMicroTopics: ["Electromagnetic Induction & Lenz Law"],
        subject: "physics",
        drillType: "remedial",
      }),
    });
    const resUserA = await postRepairQuiz(reqUserA);
    const dataA = await resUserA.json();
    assert.equal(resUserA.status, 200, "User A quiz generation must succeed");
    assert.ok(dataA.testId.startsWith("repair_quiz_usera123_"));
    const userAQuestionIds = dataA.questions.map((q: any) => q.id);

    // User B generates remedial repair quiz on the exact same topic
    mockAuthUserId = "userb999-uuid-8888";
    const reqUserB = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        weakMicroTopics: ["Electromagnetic Induction & Lenz Law"],
        subject: "physics",
        drillType: "remedial",
      }),
    });
    const resUserB = await postRepairQuiz(reqUserB);
    assert.equal(resUserB.status, 200, "User B quiz generation must succeed");
    const dataB = await resUserB.json();
    assert.ok(dataB.testId.startsWith("repair_quiz_userb999_"));
    const userBQuestionIds = dataB.questions.map((q: any) => q.id);

    // Assert that question IDs follow ${testId}_q_${idx} pattern and are disjoint
    userAQuestionIds.forEach((id: string, idx: number) => {
      assert.equal(id, `${dataA.testId}_q_${idx}`);
    });
    userBQuestionIds.forEach((id: string, idx: number) => {
      assert.equal(id, `${dataB.testId}_q_${idx}`);
    });

    const userASet = new Set(userAQuestionIds);
    for (const bId of userBQuestionIds) {
      assert.ok(!userASet.has(bId), `User B question ID ${bId} must not collide with User A`);
    }

    // Assert that in the database questions table, both sets of questions exist and were not overwritten
    const dbQuestionUuids = Array.from(mockDbQuestions.keys());
    for (const qId of userAQuestionIds) {
      const qUuid = stringToUuid(qId);
      assert.ok(dbQuestionUuids.includes(qUuid), `User A question ${qUuid} must be stored in DB`);
    }
    for (const qId of userBQuestionIds) {
      const qUuid = stringToUuid(qId);
      assert.ok(dbQuestionUuids.includes(qUuid), `User B question ${qUuid} must be stored in DB`);
    }
  });

  // ─── TEST 20: BANK QUESTION IS NOT MODIFIED BY DRILL GENERATION ────────────
  it("a bank question is not modified by drill generation (Case A)", async () => {
    mockDbQuestions.clear();
    mockDbTestQuestionsRows = [];
    mockDbAttemptsCount = 200; // Unlocks AI Qualification Gate (>= 150 attempts)

    const bankQuestionUuid = stringToUuid("physics_mock_q1_fixed");
    const originalBankQuestion = {
      id: bankQuestionUuid,
      subject: "physics",
      chapter: "Wave Optics",
      micro_topic: "Electromagnetic Induction & Lenz Law",
      ncert_reference: "NCERT Class 12 Chapter 6",
      archetype: "Direct Fact",
      question_text: "Original immutable bank question text for Faraday's law",
      option_a: "Original Option A",
      option_b: "Original Option B",
      option_c: "Original Option C",
      option_d: "Original Option D",
      correct_option: "B",
      explanation: "Original official explanation",
    };
    mockDbQuestions.set(bankQuestionUuid, { ...originalBankQuestion });

    const req = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        drillType: "adaptive",
        questionCount: 15,
      }),
    });

    const res = await postRepairQuiz(req);
    assert.equal(res.status, 200, "Adaptive drill generation must succeed");
    const data = await res.json();
    assert.ok(data.testId.startsWith("adaptive_drill_"));

    // Assert bank question in questions table was NOT modified or overwritten
    const persistedBankQ = mockDbQuestions.get(bankQuestionUuid);
    assert.deepEqual(
      persistedBankQ,
      originalBankQuestion,
      "Bank question record in questions table must remain strictly unchanged"
    );

    // Assert that test_questions junction rows were written
    assert.ok(
      mockDbTestQuestionsRows.length > 0,
      "test_questions rows must be persisted linking drill to bank questions"
    );
  });

  // ─── TEST 21: PERSISTENCE FAILURE RETURNS 500 AND OMITS TESTID ─────────────
  it("persistence failure returns 500 and does not return a testId", async () => {
    // 1. Simulated tests row persistence failure in repair quiz
    mockTestsUpsertError = new Error("Simulated PostgreSQL disk failure on tests table");

    const req1 = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        weakMicroTopics: ["Thermodynamics & Carnot Cycle"],
        subject: "physics",
        drillType: "remedial",
      }),
    });

    const res1 = await postRepairQuiz(req1);
    assert.equal(res1.status, 500, "Must return HTTP 500 when tests persistence fails");
    const data1 = await res1.json();
    assert.equal(data1.code, "PERSISTENCE_FAILED");
    assert.strictEqual(data1.testId, undefined, "testId must NOT be returned on persistence failure");

    // 2. Simulated questions row persistence failure
    mockTestsUpsertError = null;
    mockQuestionsUpsertError = new Error("Simulated conflict on questions table");

    const req2 = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        weakMicroTopics: ["Thermodynamics & Carnot Cycle"],
        subject: "physics",
        drillType: "remedial",
      }),
    });

    const res2 = await postRepairQuiz(req2);
    assert.equal(res2.status, 500, "Must return HTTP 500 when questions persistence fails");
    const data2 = await res2.json();
    assert.equal(data2.code, "PERSISTENCE_FAILED");
    assert.strictEqual(data2.testId, undefined, "testId must NOT be returned on persistence failure");

    // 3. Simulated test_questions junction row persistence failure in adaptive drill
    mockQuestionsUpsertError = null;
    mockTestQuestionsUpsertError = new Error("Simulated junction foreign key constraint error");
    mockDbAttemptsCount = 200;

    const req3 = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        drillType: "adaptive",
        questionCount: 15,
      }),
    });

    const res3 = await postRepairQuiz(req3);
    assert.equal(res3.status, 500, "Must return HTTP 500 when test_questions persistence fails");
    const data3 = await res3.json();
    assert.equal(data3.code, "PERSISTENCE_FAILED");
    assert.strictEqual(data3.testId, undefined, "testId must NOT be returned on persistence failure");
  });

  // ─── TEST 22: POST WITH 1,000 DUPLICATE ENTRIES RETURNS 400 AND WRITES NOTHING
  it("POST with 1,000 duplicate entries returns 400 and writes nothing", async () => {
    insertedAttempts = [];
    recordedCompletions = [];

    // 1. Scoring engine verification:
    // Create 1 authoritative question where correct answer is 'C'
    const authQuestions = [
      {
        id: "q-auth-1",
        questionId: "q-auth-1",
        questionNumber: 1,
        correctOptionId: "C",
      },
    ];

    // Create 1,000 duplicate client submissions for question 1 claiming 'C'
    const duplicateClientEntries = Array.from({ length: 1000 }, () => ({
      questionId: "q-auth-1",
      questionNumber: 1,
      selectedOption: "C",
      timeSpentSeconds: 10,
    }));

    const scoredSet = buildScoredSet(authQuestions, duplicateClientEntries);
    assert.equal(scoredSet.length, 1, "Authoritative iteration must match at most one client entry per question");
    assert.equal(scoredSet[0].isCorrect, true);
    assert.equal(scoredSet[0].selectedOption, "C");
    assert.equal(scoredSet[0].expectedOption, "C");

    // 2. HTTP POST route validation:
    // Submitting duplicate entries or payload exceeding test question count is strictly rejected with 400
    const req = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        attemptId: "dup-attack-attempt-1",
        questions: duplicateClientEntries,
      }),
    });

    const res = await POST(req, { params: { testId: "physics-mock-1" } });
    assert.equal(res.status, 400, "POST payload with duplicated entries must be rejected with HTTP 400");
    const data = await res.json();
    assert.ok(
      data.code === "EXCESSIVE_QUESTION_ENTRIES" || data.code === "DUPLICATE_QUESTION_ENTRY",
      `Expected duplication error code, got: ${data.code}`
    );
    assert.equal(insertedAttempts.length, 0, "No attempt rows must be written to user_attempts");
    assert.equal(recordedCompletions.length, 0, "No ledger rows must be written on rejected payload");
  });

  // ─── TEST 23: SUBMITTING TEST B WITH TEST A'S ATTEMPTID CONSUMES QUOTA ─────
  it("submitting test B with test A's attemptId does not return test B's answers and does consume quota", async () => {
    const sharedAttemptUuid = "77777777-8888-9999-aaaa-bbbbccccdddd";

    // 1. Submit Test A (physics-mock-1) with sharedAttemptUuid
    const reqTestA = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        attemptId: sharedAttemptUuid,
        questions: [{ questionNumber: 1, selectedOption: "C", timeSpentSeconds: 20 }],
      }),
    });

    const resA = await POST(reqTestA, { params: { testId: "physics-mock-1" } });
    assert.equal(resA.status, 200, "Submission for Test A must succeed");
    const dataA = await resA.json();
    assert.equal(dataA.success, true);
    assert.equal(dataA.deduplicated, undefined, "First submission of Test A is not deduplicated");

    // Ensure Test A recorded completion in ledger under ${canonicalTestId}:${attemptUuid}
    const ledgerTestA = recordedCompletions.find((c) => c.testId === "physics-mock-1");
    assert.ok(ledgerTestA, "Test A must consume quota via recordSessionCompletion");
    assert.equal(ledgerTestA.sessionId, `physics-mock-1:${sharedAttemptUuid}`);

    // Verify user_attempts rows exist for Test A
    const testAUuid = stringToUuid("physics-mock-1");
    const testARows = insertedAttempts.filter((r) => r.test_id === testAUuid);
    assert.ok(testARows.length > 0, "user_attempts rows for Test A must exist");

    // 2. Now submit Test B (chemistry-mock-1) reusing the EXACT SAME attemptId
    const completionsBeforeB = recordedCompletions.length;
    const reqTestB = new NextRequest("http://localhost:3000/api/test/chemistry-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "chemistry-mock-1",
        attemptId: sharedAttemptUuid,
        questions: [{ questionNumber: 1, selectedOption: "A", timeSpentSeconds: 25 }],
      }),
    });

    const resB = await POST(reqTestB, { params: { testId: "chemistry-mock-1" } });
    assert.equal(resB.status, 200, "Submission for Test B must succeed as a new attempt");
    const dataB = await resB.json();

    // MUST NOT hit dedup branch and must not release test B's answers via dedup
    assert.notEqual(
      dataB.deduplicated,
      true,
      "Dedup check must NOT match across different tests even if attemptId is identical"
    );

    // MUST consume quota for Test B
    assert.equal(
      recordedCompletions.length,
      completionsBeforeB + 1,
      "Test B submission must consume new quota via recordSessionCompletion"
    );
    const ledgerTestB = recordedCompletions.find((c) => c.testId === "chemistry-mock-1");
    assert.ok(ledgerTestB, "Test B must have its own ledger record");
    assert.equal(ledgerTestB.sessionId, `chemistry-mock-1:${sharedAttemptUuid}`);

    // Verify user_attempts rows were inserted specifically for Test B
    const testBUuid = stringToUuid("chemistry-mock-1");
    const testBRows = insertedAttempts.filter((r) => r.test_id === testBUuid);
    assert.ok(testBRows.length > 0, "user_attempts rows for Test B must be inserted");
  });

  // ─── TEST 24: REPAIR-QUIZ RESPONSE CONTAINS NO CORRECTOPTIONID ─────────────
  it("the repair-quiz response contains no correctOptionId (Case A and Case B)", async () => {
    // 1. Case A: Adaptive Micro-Drill (15 questions from bank)
    mockDbAttemptsCount = 200; // Unlock gate
    mockDbQuestions.clear();
    mockDbTestQuestionsRows = [];

    const reqCaseA = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        drillType: "adaptive",
        questionCount: 15,
      }),
    });

    const resCaseA = await postRepairQuiz(reqCaseA);
    assert.equal(resCaseA.status, 200, "Case A adaptive drill generation must succeed");
    const dataCaseA = await resCaseA.json();

    assert.ok(Array.isArray(dataCaseA.questions), "Case A must return questions array");
    assert.ok(dataCaseA.questions.length > 0, "Case A must have questions");

    for (const q of dataCaseA.questions) {
      assert.strictEqual(
        q.correctOptionId,
        undefined,
        `Case A question ${q.id} must NOT include correctOptionId`
      );
      assert.strictEqual(
        "correctOptionId" in q,
        false,
        `Case A question ${q.id} must omit correctOptionId key completely`
      );
      assert.equal(q.explanation, "", "Explanation must be sanitized and empty during active test");
      assert.strictEqual(q.solution, undefined, "Solution must be undefined during active test");
      assert.strictEqual(q.misconception, undefined, "Misconception must be undefined during active test");
    }

    // 2. Case B: Targeted 5-Question Remedial Repair Quiz
    const reqCaseB = new NextRequest("http://localhost:3000/api/ai/repair-quiz", {
      method: "POST",
      body: JSON.stringify({
        weakMicroTopics: ["Electric Charges and Fields", "Electrostatic Potential"],
        subject: "physics",
        drillType: "remedial",
      }),
    });

    const resCaseB = await postRepairQuiz(reqCaseB);
    assert.equal(resCaseB.status, 200, "Case B repair quiz generation must succeed");
    const dataCaseB = await resCaseB.json();

    assert.ok(Array.isArray(dataCaseB.questions), "Case B must return questions array");
    assert.ok(dataCaseB.questions.length > 0, "Case B must have questions");

    for (const q of dataCaseB.questions) {
      assert.strictEqual(
        q.correctOptionId,
        undefined,
        `Case B question ${q.id} must NOT include correctOptionId`
      );
      assert.strictEqual(
        "correctOptionId" in q,
        false,
        `Case B question ${q.id} must omit correctOptionId key completely`
      );
      assert.equal(q.explanation, "", "Explanation must be sanitized and empty during active test");
      assert.strictEqual(q.solution, undefined, "Solution must be undefined during active test");
      assert.strictEqual(q.misconception, undefined, "Misconception must be undefined during active test");
    }
  });

  // ─── TEST 25: SUBMISSION WITHOUT ATTEMPTID CANNOT SHARE LEDGER ROW OR BYPASS DEDUP
  it("submission without attemptId cannot share a ledger row or bypass dedup", async () => {
    insertedAttempts = [];
    recordedCompletions = [];

    // Submission 1: Missing attemptId
    const req1 = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        questions: [{ questionNumber: 1, selectedOption: "C", timeSpentSeconds: 15 }],
      }),
    });

    const res1 = await POST(req1, { params: { testId: "physics-mock-1" } });
    assert.equal(res1.status, 200, "Submission 1 without attemptId must succeed");
    const data1 = await res1.json();
    assert.equal(data1.success, true);
    assert.equal(data1.deduplicated, undefined);
    const attemptId1 = data1.attempt?.attemptId;
    assert.ok(attemptId1, "Server must assign a valid UUID attemptId");
    assert.match(
      attemptId1,
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "Generated attemptId must be a valid UUID"
    );

    // Verify ledger row 1 was recorded
    assert.equal(recordedCompletions.length, 1);
    const ledger1 = recordedCompletions[0];
    assert.equal(ledger1.sessionId, `physics-mock-1:${attemptId1}`);
    assert.ok(!ledger1.sessionId.includes("null"), "ledgerSessionId must never contain 'null'");

    // Submission 2: Another submission without attemptId within 60s
    const req2 = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        questions: [{ questionNumber: 1, selectedOption: "C", timeSpentSeconds: 15 }],
      }),
    });

    const res2 = await POST(req2, { params: { testId: "physics-mock-1" } });
    assert.equal(res2.status, 200, "Submission 2 without attemptId must succeed as a new attempt");
    const data2 = await res2.json();

    // MUST NOT bypass dedup or share ledger row
    assert.notEqual(data2.deduplicated, true, "Submission without attemptId cannot bypass dedup");
    const attemptId2 = data2.attempt?.attemptId;
    assert.ok(attemptId2);
    assert.notEqual(attemptId1, attemptId2, "Each submission without attemptId must get a distinct server UUID");

    // Must have its own distinct ledger entry
    assert.equal(recordedCompletions.length, 2, "Submission 2 must consume its own quota");
    const ledger2 = recordedCompletions[1];
    assert.equal(ledger2.sessionId, `physics-mock-1:${attemptId2}`);
    assert.notEqual(ledger1.sessionId, ledger2.sessionId, "Submissions without attemptId cannot share a ledger row");
  });

  // ─── TEST 26: TEST SUBMISSION SCORES AND UPDATES STREAK / STATS ─────────────
  it("test submission scores accurately and updates profile streak and questions attempted without XP", async () => {
    insertedAttempts = [];
    mockProfileUpdates = [];

    // Attempt 1 on physics-mock-1 (First attempt on this canonical test)
    const req1 = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        attemptId: "first-attempt-xp-1",
        questions: [{ questionNumber: 1, selectedOption: "C", timeSpentSeconds: 20 }], // Q1 answer 'C' is correct
      }),
    });

    const res1 = await POST(req1, { params: { testId: "physics-mock-1" } });
    assert.equal(res1.status, 200);
    const data1 = await res1.json();
    assert.equal(data1.attempt.correctCount, 1);
    assert.equal(data1.earnedXP, undefined, "XP is deprecated and strictly undefined in response");
    assert.equal(data1.newlyUnlockedTrophies, undefined, "Trophies are deprecated and strictly undefined in response");
    assert.equal(mockProfileUpdates.length > 0, true);
    assert.equal(mockProfileUpdates[0].xp, undefined, "Profile update should not modify xp directly");
    assert.ok(mockProfileUpdates[0].total_questions_attempted >= 1, "Profile updates total_questions_attempted");
    assert.ok(mockProfileUpdates[0].last_practice_date !== undefined, "Profile updates last_practice_date");

    // Attempt 2 on physics-mock-1 (Resubmit on same canonical test)
    mockProfileUpdates = [];
    const req2 = new NextRequest("http://localhost:3000/api/test/physics-mock-1", {
      method: "POST",
      body: JSON.stringify({
        testId: "physics-mock-1",
        attemptId: "second-attempt-resubmit-2",
        questions: [{ questionNumber: 1, selectedOption: "C", timeSpentSeconds: 15 }], // Q1 answer 'C' is correct
      }),
    });

    const res2 = await POST(req2, { params: { testId: "physics-mock-1" } });
    assert.equal(res2.status, 200);
    const data2 = await res2.json();
    assert.equal(data2.attempt.correctCount, 1);
    assert.equal(data2.earnedXP, undefined);
    assert.equal(mockProfileUpdates.length > 0, true);
    assert.equal(mockProfileUpdates[0].xp, undefined, "Profile update on resubmit must not modify xp");
  });

  // ─── TEST 27: BUILDSCOREDSET MATCHES BY QUESTION ID FIRST, NUMBER AS FALLBACK
  it("buildScoredSet must match by question ID first, number only as fallback, and never read client correctOption/isCorrect", () => {
    const authQuestions = [
      { id: "q-alpha", questionId: "q-alpha", questionNumber: 1, correctOptionId: "A" },
      { id: "q-beta", questionId: "q-beta", questionNumber: 2, correctOptionId: "B" },
    ];

    // Client submission where client entry 0 has questionNumber: 1, BUT questionId: "q-beta"!
    // ID match must take precedence over number match so Entry 0 pairs with Q2 ("q-beta").
    // Also, client includes forged correctOption and isCorrect fields which must be completely ignored.
    const clientQuestions = [
      {
        questionId: "q-beta",
        questionNumber: 1, // Mismatched number, but matching ID
        selectedOption: "B",
        correctOption: "D", // Client falsely claims 'D'
        isCorrect: false, // Client claims incorrect
        timeSpentSeconds: 25,
      },
      {
        // No questionId, so fallback to questionNumber: 1 pairs with Q1 ("q-alpha")
        questionNumber: 1,
        selectedOption: "A",
        correctOption: "C", // Client falsely claims 'C'
        isCorrect: false,
        timeSpentSeconds: 15,
      },
    ];

    const scored = buildScoredSet(authQuestions, clientQuestions);
    assert.equal(scored.length, 2);

    // Q1 ("q-alpha") matched by fallback number: 1
    const scoredQ1 = scored.find((s: any) => s.authQuestion.id === "q-alpha");
    assert.ok(scoredQ1, "q-alpha must be matched");
    assert.equal(scoredQ1.expectedOption, "A");
    assert.equal(scoredQ1.selectedOption, "A");
    assert.equal(scoredQ1.isCorrect, true, "Authoritative match must score as correct, ignoring forged client keys");

    // Q2 ("q-beta") matched by ID precedence even though questionNumber was 1
    const scoredQ2 = scored.find((s: any) => s.authQuestion.id === "q-beta");
    assert.ok(scoredQ2, "q-beta must be matched by ID first");
    assert.equal(scoredQ2.expectedOption, "B");
    assert.equal(scoredQ2.selectedOption, "B");
    assert.equal(scoredQ2.isCorrect, true, "Authoritative match must score as correct, ignoring forged client keys");
  });
});
