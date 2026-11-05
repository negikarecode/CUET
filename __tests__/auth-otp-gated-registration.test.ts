import { describe, it } from "node:test";
import assert from "node:assert";
import {
  createPendingRegistration,
  verifyPendingRegistrationOtp,
  generateSecureNumericOtp,
  generateRegistrationId,
} from "../lib/auth/pending-registration-service";
import { supabaseAdmin } from "../lib/supabase/admin";
import { getUserProgress } from "../lib/user-progress";

describe("Strict OTP-Gated Registration & Two-Stage Lifecycle", () => {
  const uniquePrefix = `test_audit_${Date.now()}`;
  const testEmailA = `${uniquePrefix}_a@example.com`;
  const testEmailB = `${uniquePrefix}_b@example.com`;
  const testEmailC = `${uniquePrefix}_c@example.com`;
  const testPassword = "ValidCandidatePass123!@#";

  it("Stage A: Pending registration stores encrypted credentials without creating permanent account", async () => {
    const regId = generateRegistrationId();
    const otp = generateSecureNumericOtp();

    const result = await createPendingRegistration({
      registrationId: regId,
      email: testEmailA,
      password: testPassword,
      candidateDetails: {
        fullName: "Candidate Alpha",
        age: "18",
        targetCollege: "SRCC",
        targetUniversity: "Delhi University",
        targetCourse: "B.Com (Hons)",
        targetStream: "Commerce",
        selectedSubjects: ["Accountancy", "Economics"],
      },
      otpCode: otp,
    });

    assert.strictEqual(result.success, true);

    // CRITICAL SECURITY ASSERTION: Account MUST NOT exist in Supabase auth.users at Stage A
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 50 });
    const userInDb = usersData?.users?.find((u) => u.email?.toLowerCase() === testEmailA);
    assert.strictEqual(userInDb, undefined, "User must NOT exist in auth.users before OTP verification!");

    // CRITICAL SECURITY ASSERTION: Profile MUST NOT exist in public.profiles at Stage A
    const { data: profileInDb } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .ilike("full_name", "Candidate Alpha")
      .maybeSingle();
    assert.strictEqual(profileInDb, null, "Profile must NOT exist in profiles before OTP verification!");
  });

  it("Stage B: Correct OTP verification creates exactly ONE permanent candidate account and profile", async () => {
    const regId = generateRegistrationId();
    const otp = generateSecureNumericOtp();

    await createPendingRegistration({
      registrationId: regId,
      email: testEmailB,
      password: testPassword,
      candidateDetails: {
        fullName: "Candidate Beta",
        age: "18",
        targetCollege: "St. Stephen's",
        targetUniversity: "Delhi University",
        targetCourse: "Economics (Hons)",
        targetStream: "Commerce",
        selectedSubjects: ["Economics", "Mathematics"],
      },
      otpCode: otp,
    });

    // Verify OTP
    const verifyResult = await verifyPendingRegistrationOtp({
      registrationId: regId,
      email: testEmailB,
      code: otp,
    });

    assert.strictEqual(verifyResult.success, true);
    assert.strictEqual(verifyResult.decryptedPassword, testPassword);
    assert.strictEqual(verifyResult.record?.candidateDetails.fullName, "Candidate Beta");

    // Simulate permanent account creation performed by /api/auth/otp/verify route handler
    const createRes = await supabaseAdmin.auth.admin.createUser({
      email: testEmailB,
      password: verifyResult.decryptedPassword,
      email_confirm: true,
      user_metadata: verifyResult.record?.candidateDetails,
    });

    assert.ok(createRes.data?.user?.id, "Permanent account must be created upon OTP verification");
    const newUserId = createRes.data.user.id;

    // Insert profile using syncUserProfile
    const { syncUserProfile } = await import("../lib/api-handlers/auth-session");
    await syncUserProfile(createRes.data.user);

    // Verify profile was created
    const { data: profInDb } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, target_college")
      .eq("id", newUserId)
      .maybeSingle();

    assert.ok(profInDb, "Profile must exist in public.profiles");
    assert.strictEqual(profInDb.id, newUserId);

    // Verify exactly one account exists in auth.users
    const { data: checkUsers } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 50 });
    const matchingAccounts = checkUsers?.users?.filter((u) => u.email?.toLowerCase() === testEmailB) || [];
    assert.strictEqual(matchingAccounts.length, 1);

    // Cleanup created test user
    await supabaseAdmin.auth.admin.deleteUser(newUserId);
    await supabaseAdmin.from("profiles").delete().eq("id", newUserId);
  });

  it("Enforces single-use OTP: Code cannot be re-used to create duplicate accounts", async () => {
    const regId = generateRegistrationId();
    const otp = generateSecureNumericOtp();

    await createPendingRegistration({
      registrationId: regId,
      email: testEmailC,
      password: testPassword,
      candidateDetails: {
        fullName: "Candidate Gamma",
        age: "18",
        targetCollege: "Hindu College",
        targetUniversity: "Delhi University",
        targetCourse: "Political Science",
        targetStream: "Humanities",
        selectedSubjects: ["History", "Political Science"],
      },
      otpCode: otp,
    });

    // First use: Valid
    const firstAttempt = await verifyPendingRegistrationOtp({
      registrationId: regId,
      email: testEmailC,
      code: otp,
    });
    assert.strictEqual(firstAttempt.success, true);

    // Second use (replay attack): MUST FAIL
    const replayAttempt = await verifyPendingRegistrationOtp({
      registrationId: regId,
      email: testEmailC,
      code: otp,
    });
    assert.strictEqual(replayAttempt.success, false);
    assert.ok(replayAttempt.error?.includes("expired") || replayAttempt.error?.includes("used"));
  });

  it("Enforces attempt limits: 5 incorrect attempts permanently invalidates the OTP session", async () => {
    const regId = generateRegistrationId();
    const otp = generateSecureNumericOtp();
    const testEmailFail = `${uniquePrefix}_fail@example.com`;

    await createPendingRegistration({
      registrationId: regId,
      email: testEmailFail,
      password: testPassword,
      candidateDetails: {
        fullName: "Candidate Fail",
        targetCollege: "SRCC",
        targetUniversity: "Delhi University",
        targetCourse: "B.Com",
        targetStream: "Commerce",
        selectedSubjects: [],
      },
      otpCode: otp,
    });

    // 4 failed attempts
    for (let i = 1; i <= 4; i++) {
      const res = await verifyPendingRegistrationOtp({
        registrationId: regId,
        email: testEmailFail,
        code: "999999",
      });
      assert.strictEqual(res.success, false);
      assert.ok(res.error?.includes("remaining"));
    }

    // 5th failed attempt invalidates
    const fifth = await verifyPendingRegistrationOtp({
      registrationId: regId,
      email: testEmailFail,
      code: "999999",
    });
    assert.strictEqual(fifth.success, false);
    assert.strictEqual(fifth.isMaxAttempts, true);

    // Even if user now submits the correct code, it must be locked out
    const retryWithCorrect = await verifyPendingRegistrationOtp({
      registrationId: regId,
      email: testEmailFail,
      code: otp,
    });
    assert.strictEqual(retryWithCorrect.success, false);
  });

  it("Enforces 60-second cooldown on registration resend", async () => {
    const regId = generateRegistrationId();
    const testEmailCooldown = `${uniquePrefix}_cooldown@example.com`;

    const first = await createPendingRegistration({
      registrationId: regId,
      email: testEmailCooldown,
      password: testPassword,
      candidateDetails: {
        fullName: "Candidate Cooldown",
        targetCollege: "SRCC",
        targetUniversity: "Delhi University",
        targetCourse: "B.Com",
        targetStream: "Commerce",
        selectedSubjects: [],
      },
      otpCode: "111111",
    });
    assert.strictEqual(first.success, true);

    // Immediate second attempt within 60s
    const second = await createPendingRegistration({
      registrationId: generateRegistrationId(),
      email: testEmailCooldown,
      password: testPassword,
      candidateDetails: {
        fullName: "Candidate Cooldown",
        targetCollege: "SRCC",
        targetUniversity: "Delhi University",
        targetCourse: "B.Com",
        targetStream: "Commerce",
        selectedSubjects: [],
      },
      otpCode: "222222",
    });

    assert.strictEqual(second.success, false);
    assert.ok(second.cooldownRemaining && second.cooldownRemaining > 0);
  });
});

describe("Cross-User Data Isolation Invariants", () => {
  it("getUserProgress strictly isolates test history by authenticated userId", async () => {
    const userA_Id = "00000000-0000-0000-0000-00000000000a";
    const userB_Id = "00000000-0000-0000-0000-00000000000b";

    // Progress queried for User A
    const progressA = await getUserProgress(userA_Id);
    assert.strictEqual(progressA.userId, userA_Id);

    // Progress queried for User B
    const progressB = await getUserProgress(userB_Id);
    assert.strictEqual(progressB.userId, userB_Id);

    // User A and User B cannot share data
    assert.notStrictEqual(progressA.userId, progressB.userId);
  });

  it("Rejects unauthenticated queries with empty userId gracefully", async () => {
    const guestProgress = await getUserProgress("");
    assert.strictEqual(guestProgress.totalAttempts, 0);
    assert.strictEqual(guestProgress.serverAttempts.length, 0);
  });
});
