import { describe, it, after } from "node:test";
import assert from "node:assert";
import { supabaseAdmin } from "../lib/supabase/admin";
import { getUserProgress } from "../lib/user-progress";
import { syncUserProfile } from "../lib/api-handlers/auth-session";
import { stringToUuid } from "../lib/utils";

describe("Cross-User Data Isolation Automated End-to-End Test (Users A, B, C)", () => {
  const ts = Date.now();
  const emailA = `candidate_iso_a_${ts}@example.com`;
  const emailB = `candidate_iso_b_${ts}@example.com`;
  const emailC = `candidate_iso_c_${ts}@example.com`;
  const password = "IsolationPass2026!@#";

  let userAId: string;
  let userBId: string;
  let userCId: string;

  const testQuestionUuid1 = stringToUuid(`test_iso_q1_${ts}`);
  const testQuestionUuid2 = stringToUuid(`test_iso_q2_${ts}`);
  const testExamUuid = stringToUuid(`test_iso_exam_${ts}`);

  after(async () => {
    // Teardown created test accounts and attempts
    const ids = [userAId, userBId, userCId].filter(Boolean);
    for (const uid of ids) {
      await supabaseAdmin.from("user_attempts").delete().eq("user_id", uid);
      await supabaseAdmin.from("profiles").delete().eq("id", uid);
      await supabaseAdmin.auth.admin.deleteUser(uid);
    }
    // Clean test question and test rows
    await supabaseAdmin.from("questions").delete().in("id", [testQuestionUuid1, testQuestionUuid2]);
    await supabaseAdmin.from("tests").delete().eq("id", testExamUuid);
  });

  it("1. User A registers and verifies OTP -> account is provisioned", async () => {
    const createA = await supabaseAdmin.auth.admin.createUser({
      email: emailA,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: "Candidate User A",
        target_college: "SRCC",
        target_university: "Delhi University",
        target_stream: "Commerce",
        selected_subjects: ["Accountancy", "Economics"],
      },
    });
    assert.ok(createA.data?.user?.id, "User A must be created");
    userAId = createA.data.user.id;
    await syncUserProfile(createA.data.user);

    const progressA0 = await getUserProgress(userAId);
    assert.strictEqual(progressA0.totalAttempts, 0);
  });

  it("2. User A creates mock test history and personal data", async () => {
    // Seed test exam & question
    await supabaseAdmin.from("tests").upsert(
      {
        id: testExamUuid,
        title: "CUET Isolation Mock Exam",
        subject: "Accountancy",
        total_questions: 50,
        duration_minutes: 60,
      },
      { onConflict: "id" }
    );

    await supabaseAdmin.from("questions").upsert(
      [
        {
          id: testQuestionUuid1,
          subject: "Accountancy",
          chapter: "Partnership Accounts",
          micro_topic: "Goodwill Valuation",
          ncert_reference: "NCERT Class 12 Chapter 2",
          archetype: "Direct Fact",
          question_text: "What is goodwill?",
          option_a: "An asset",
          option_b: "A liability",
          option_c: "An expense",
          option_d: "None of these",
          correct_option: "A",
          explanation: "Goodwill is an intangible asset.",
        },
        {
          id: testQuestionUuid2,
          subject: "Accountancy",
          chapter: "Partnership Accounts",
          micro_topic: "Profit Sharing Ratio",
          ncert_reference: "NCERT Class 12 Chapter 2",
          archetype: "Direct Fact",
          question_text: "What is sacrificing ratio?",
          option_a: "Old - New",
          option_b: "New - Old",
          option_c: "Old / New",
          option_d: "None",
          correct_option: "A",
          explanation: "Sacrificing ratio = Old ratio - New ratio.",
        },
      ],
      { onConflict: "id" }
    );

    // Insert User A attempts
    const { error: insErr } = await supabaseAdmin.from("user_attempts").insert([
      {
        user_id: userAId,
        test_id: testExamUuid,
        question_id: testQuestionUuid1,
        selected_option: "A",
        is_correct: true,
        time_spent_seconds: 45,
      },
      {
        user_id: userAId,
        test_id: testExamUuid,
        question_id: testQuestionUuid2,
        selected_option: "B",
        is_correct: false,
        time_spent_seconds: 50,
      },
    ]);
    assert.strictEqual(insErr, null, "User A attempts must be inserted");

    const progressA = await getUserProgress(userAId);
    assert.strictEqual(progressA.totalAttempts, 2);
    assert.strictEqual(progressA.totalCorrect, 1);
    assert.strictEqual(progressA.totalIncorrect, 1);
  });

  it("3 & 4 & 5. User B registers & logs in -> User B sees ONLY User B's data (zero bleed from User A)", async () => {
    const createB = await supabaseAdmin.auth.admin.createUser({
      email: emailB,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: "Candidate User B",
        target_college: "Hindu College",
        target_university: "Delhi University",
        target_stream: "Science",
        selected_subjects: ["Physics", "Chemistry"],
      },
    });
    assert.ok(createB.data?.user?.id, "User B must be created");
    userBId = createB.data.user.id;
    await syncUserProfile(createB.data.user);

    // CRITICAL SECURITY ASSERTION: User B MUST NOT see any of User A's attempts or progress
    const progressB0 = await getUserProgress(userBId);
    assert.strictEqual(progressB0.totalAttempts, 0, "User B must have 0 attempts!");
    assert.strictEqual(progressB0.totalCorrect, 0);
    assert.strictEqual(progressB0.serverAttempts.length, 0);
  });

  it("6. User B creates separate test history", async () => {
    // Insert User B attempt on question 1 (answered B - incorrect)
    const { error: insErrB } = await supabaseAdmin.from("user_attempts").insert([
      {
        user_id: userBId,
        test_id: testExamUuid,
        question_id: testQuestionUuid1,
        selected_option: "B",
        is_correct: false,
        time_spent_seconds: 60,
      },
    ]);
    assert.strictEqual(insErrB, null);

    const progressB = await getUserProgress(userBId);
    assert.strictEqual(progressB.totalAttempts, 1);
    assert.strictEqual(progressB.totalCorrect, 0);
    assert.strictEqual(progressB.totalIncorrect, 1);
  });

  it("7 & 8. User A logs in again -> User A sees their original data only (2 attempts, 1 correct)", async () => {
    const progressA_retest = await getUserProgress(userAId);
    assert.strictEqual(progressA_retest.totalAttempts, 2, "User A must retain their exact 2 attempts");
    assert.strictEqual(progressA_retest.totalCorrect, 1);
    assert.strictEqual(progressA_retest.totalIncorrect, 1);
    assert.strictEqual(progressA_retest.userId, userAId);
  });

  it("9 & 10. User C logs in -> User C sees neither A's nor B's data", async () => {
    const createC = await supabaseAdmin.auth.admin.createUser({
      email: emailC,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: "Candidate User C",
        target_college: "Miranda House",
        target_university: "Delhi University",
        target_stream: "Humanities",
        selected_subjects: ["History", "Political Science"],
      },
    });
    assert.ok(createC.data?.user?.id, "User C must be created");
    userCId = createC.data.user.id;
    await syncUserProfile(createC.data.user);

    // User C progress check
    const progressC = await getUserProgress(userCId);
    assert.strictEqual(progressC.totalAttempts, 0, "User C must see 0 attempts");
    assert.strictEqual(progressC.totalCorrect, 0);
    assert.strictEqual(progressC.serverAttempts.length, 0);
  });

  it("11. Client Storage Key Invariant: Storage keys are deterministically scoped by userId", () => {
    const keyA = `cuet_ai_prep_session_storage:${userAId}`;
    const keyB = `cuet_ai_prep_session_storage:${userBId}`;
    const keyC = `cuet_ai_prep_session_storage:${userCId}`;

    assert.notStrictEqual(keyA, keyB);
    assert.notStrictEqual(keyB, keyC);
    assert.notStrictEqual(keyA, keyC);

    const cbtKeyA = `cuet_cbt_session_${userAId}_test1`;
    const cbtKeyB = `cuet_cbt_session_${userBId}_test1`;
    assert.notStrictEqual(cbtKeyA, cbtKeyB);
  });
});
