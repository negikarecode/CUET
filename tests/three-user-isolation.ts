import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(process.cwd(), ".env.local") });

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import { supabaseAdmin } from "../lib/supabase/admin";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { POST as sendOtpRoute } from "../app/api/auth/otp/send/route";
import { POST as verifyOtpRoute } from "../app/api/auth/otp/verify/route";
import { getUserProgress } from "../lib/user-progress";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

describe("Phase 5: Three-User Cross-Account Isolation Test", () => {
  const timestamp = Date.now();
  const testPassword = "Password!12345Secure";

  const userA_Email = `isolation_user_a_${timestamp}@cuet-isolation.local`;
  const userB_Email = `isolation_user_b_${timestamp}@cuet-isolation.local`;
  const userC_Email = `isolation_user_c_${timestamp}@cuet-isolation.local`;

  let userA_Id: string = "";
  let userB_Id: string = "";
  let userC_Id: string = "";

  let sampleTestIds: string[] = [];
  let sampleQuestionIds: string[] = [];

  before(async () => {
    // Fetch 4 sample tests and questions from Supabase
    const { data: tests } = await supabaseAdmin
      .from("tests")
      .select("id, title, subject")
      .limit(4);

    assert.ok(tests && tests.length >= 4, "Must have at least 4 tests in database");
    sampleTestIds = tests.map((t) => t.id);

    const { data: questions } = await supabaseAdmin
      .from("questions")
      .select("id, subject")
      .limit(10);

    assert.ok(questions && questions.length >= 4, "Must have at least 4 questions in database");
    sampleQuestionIds = questions.map((q) => q.id);
  });

  after(async () => {
    const userIds = [userA_Id, userB_Id, userC_Id].filter(Boolean);
    for (const uid of userIds) {
      await supabaseAdmin.from("user_attempts").delete().eq("user_id", uid);
      await supabaseAdmin.from("profiles").delete().eq("id", uid);
      await supabaseAdmin.auth.admin.deleteUser(uid);
    }
  });

  async function registerCandidateViaOtp(email: string, fullName: string, stream: string, college: string): Promise<string> {
    const sendReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "signup",
        password: testPassword,
        fullName,
        age: "18",
        targetCollege: college,
        targetUniversity: "Delhi University",
        targetCourse: "Undergraduate Degree",
        targetStream: stream,
        selectedSubjects: ["Economics", "English"],
      }),
    });

    const sendRes = await sendOtpRoute(sendReq);
    const sendJson = await sendRes.json();
    assert.equal(sendRes.status, 200, `sendOtp failed for ${email}`);
    assert.ok(sendJson.registrationId);

    const otpCode = "582914";
    const otpSecret = process.env.OTP_SECRET || "cuetmate-default-otp-secret-salt-2026";
    const otpHash = crypto.createHmac("sha256", otpSecret).update(otpCode).digest("hex");
    const freshExpiry = new Date(Date.now() + 1000 * 60 * 5).toISOString();

    await supabaseAdmin
      .from("user_otp_codes")
      .update({
        otp_hash: otpHash,
        expires_at: freshExpiry,
        attempts: 0,
      })
      .eq("email", email.toLowerCase())
      .eq("otp_type", "signup");

    const verifyReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        code: otpCode,
        type: "signup",
        registrationId: sendJson.registrationId,
      }),
    });

    const verifyRes = await verifyOtpRoute(verifyReq);
    const verifyJson = await verifyRes.json();
    assert.equal(verifyRes.status, 200, `verifyOtp failed for ${email}`);
    const userId = verifyJson.userId || verifyJson.user?.id;
    assert.ok(userId, `Missing userId for ${email}`);
    return userId;
  }

  it("Step 1: Register and provision User A, User B, and User C via OTP", async () => {
    userA_Id = await registerCandidateViaOtp(userA_Email, "Test Candidate A", "Commerce", "SRCC");
    userB_Id = await registerCandidateViaOtp(userB_Email, "Test Candidate B", "Humanities", "Miranda House");
    userC_Id = await registerCandidateViaOtp(userC_Email, "Test Candidate C", "Science", "St. Stephen's");

    assert.ok(userA_Id && userB_Id && userC_Id);
    assert.notEqual(userA_Id, userB_Id);
    assert.notEqual(userB_Id, userC_Id);
    assert.notEqual(userA_Id, userC_Id);
  });

  it("Step 2: User A completes four mock tests with distinct performance", async () => {
    const userAAttempts = [
      {
        user_id: userA_Id,
        test_id: sampleTestIds[0],
        question_id: sampleQuestionIds[0],
        selected_option: "A",
        is_correct: true,
        time_spent_seconds: 45,
        diagnostic_report: { first_saved_option: "A", final_option: "A", answer_changed: false },
      },
      {
        user_id: userA_Id,
        test_id: sampleTestIds[1],
        question_id: sampleQuestionIds[1],
        selected_option: "B",
        is_correct: false,
        time_spent_seconds: 55,
        diagnostic_report: { first_saved_option: "C", final_option: "B", answer_changed: true },
      },
      {
        user_id: userA_Id,
        test_id: sampleTestIds[2],
        question_id: sampleQuestionIds[2],
        selected_option: "C",
        is_correct: true,
        time_spent_seconds: 35,
        diagnostic_report: { first_saved_option: "C", final_option: "C", answer_changed: false },
      },
      {
        user_id: userA_Id,
        test_id: sampleTestIds[3],
        question_id: sampleQuestionIds[3],
        selected_option: "D",
        is_correct: true,
        time_spent_seconds: 40,
        diagnostic_report: { first_saved_option: "D", final_option: "D", answer_changed: false },
      },
    ];

    const { error } = await supabaseAdmin.from("user_attempts").insert(userAAttempts);
    assert.equal(error, null, "User A attempts insertion must succeed");

    // Verify User A progress metrics
    const progressA = await getUserProgress(userA_Id);
    assert.equal(progressA.totalAttempts, 4, "User A must have 4 total question attempts");
    assert.equal(progressA.completedTests.length, 4, "User A must have 4 completed tests");
    const expectedMockCount = progressA.completedTests.filter((t) => t.testType === "mock").length;
    assert.equal(progressA.testHistoryForChart.length, expectedMockCount, `User A must have ${expectedMockCount} mock points on trend chart`);
    assert.ok(progressA.latestMock !== null, "User A latestMock must exist");
  });

  it("Step 3: User B dashboard progress is completely CLEAN (Zero leakage from User A)", async () => {
    const progressB = await getUserProgress(userB_Id);

    // Verify completely clean initial metrics
    assert.equal(progressB.totalAttempts, 0, "User B must have 0 total attempts");
    assert.equal(progressB.totalUniqueQuestionsAttempted, 0, "User B must have 0 unique questions attempted");
    assert.equal(progressB.overallAccuracyPercentage, 0, "User B must have 0% accuracy");
    assert.equal(progressB.completedTests.length, 0, "User B must have 0 completed tests");
    assert.equal(progressB.testHistoryForChart.length, 0, "User B must have 0 chart points (no phantom line chart)");
    assert.equal(progressB.latestMock, null, "User B must have null latest mock (no phantom -2/250 score)");
    assert.equal(progressB.activeStreak, 0, "User B must have 0 streak");
  });

  it("Step 4: User C completes ONE mock test and sees ONLY User C metrics", async () => {
    const userCAttempt = {
      user_id: userC_Id,
      test_id: sampleTestIds[0],
      question_id: sampleQuestionIds[0],
      selected_option: "B",
      is_correct: true,
      time_spent_seconds: 60,
      diagnostic_report: { first_saved_option: "B", final_option: "B", answer_changed: false },
    };

    const { error } = await supabaseAdmin.from("user_attempts").insert([userCAttempt]);
    assert.equal(error, null, "User C attempt insertion must succeed");

    const progressC = await getUserProgress(userC_Id);
    assert.equal(progressC.totalAttempts, 1, "User C must have exactly 1 total attempt");
    assert.equal(progressC.completedTests.length, 1, "User C must have exactly 1 completed test");
    assert.equal(progressC.testHistoryForChart.length, 1, "User C must have exactly 1 chart point");
    assert.ok(progressC.latestMock !== null, "User C latestMock must exist");

    assert.notEqual(progressC.totalAttempts, 4, "User C must NOT see User A's 4 attempts");
    assert.notEqual(progressC.totalAttempts, 0, "User C must NOT see User B's 0 attempts");
  });

  it("Step 5: Client-level Row Level Security (RLS) and cross-session isolation", async () => {
    const clientA = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: authA, error: loginErrA } = await clientA.auth.signInWithPassword({
      email: userA_Email,
      password: testPassword,
    });
    assert.equal(loginErrA, null, "User A login must succeed");
    assert.equal(authA.user?.id, userA_Id);

    const clientB = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: authB, error: loginErrB } = await clientB.auth.signInWithPassword({
      email: userB_Email,
      password: testPassword,
    });
    assert.equal(loginErrB, null, "User B login must succeed");
    assert.equal(authB.user?.id, userB_Id);

    const clientC = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: authC, error: loginErrC } = await clientC.auth.signInWithPassword({
      email: userC_Email,
      password: testPassword,
    });
    assert.equal(loginErrC, null, "User C login must succeed");
    assert.equal(authC.user?.id, userC_Id);

    // User B attempts to query user_attempts with their client session
    const { data: attemptsB, error: rlsErrB } = await clientB
      .from("user_attempts")
      .select("*");
    
    assert.equal(rlsErrB, null);
    assert.equal(attemptsB?.length, 0, "User B must see 0 attempts via client query");

    // User A queries user_attempts
    const { data: attemptsA } = await clientA.from("user_attempts").select("*");
    assert.equal(attemptsA?.length, 4, "User A sees only their own 4 attempts");

    // User C queries user_attempts
    const { data: attemptsC } = await clientC.from("user_attempts").select("*");
    assert.equal(attemptsC?.length, 1, "User C sees only their own 1 attempt");

    await clientA.auth.signOut();
    await clientB.auth.signOut();
    await clientC.auth.signOut();
  });
});
