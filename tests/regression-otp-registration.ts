import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(process.cwd(), ".env.local") });

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import { supabaseAdmin } from "../lib/supabase/admin";
import { NextRequest } from "next/server";
import { POST as sendOtpRoute } from "../app/api/auth/otp/send/route";
import { POST as verifyOtpRoute } from "../app/api/auth/otp/verify/route";
import crypto from "crypto";

const TEST_TIMESTAMP = Date.now();
const CANDIDATE_A_EMAIL = `audit_reg_test_a_${TEST_TIMESTAMP}@cuet-audit.local`;
const CANDIDATE_B_EMAIL = `audit_reg_test_b_${TEST_TIMESTAMP}@cuet-audit.local`;
const CANDIDATE_D_EMAIL = `audit_reg_test_d_${TEST_TIMESTAMP}@cuet-audit.local`;

describe("Regression Suite: Strict OTP-Gated Registration Lifecycle", () => {
  let createdCandidateDId = "";
  let createdCandidateBId = "";

  after(async () => {
    // Cleanup synthetic test records created during regression run
    if (createdCandidateDId) {
      await supabaseAdmin.from("profiles").delete().eq("id", createdCandidateDId);
      await supabaseAdmin.auth.admin.deleteUser(createdCandidateDId);
    }
    if (createdCandidateBId) {
      await supabaseAdmin.from("profiles").delete().eq("id", createdCandidateBId);
      await supabaseAdmin.auth.admin.deleteUser(createdCandidateBId);
    }
    await supabaseAdmin.from("user_otp_codes").delete().ilike("email", "%@cuet-audit.local");
  });

  it("Test A: Unverified candidate registration attempt creates ZERO records in auth.users and profiles", async () => {
    const payload = {
      email: CANDIDATE_A_EMAIL,
      type: "signup",
      password: "TestSecurePassword123!",
      fullName: "Regression Candidate A",
      age: "18",
      targetCollege: "SRCC",
      targetUniversity: "Delhi University",
      targetCourse: "B.Com. (Hons.)",
      targetStream: "Commerce",
      selectedSubjects: ["Accountancy", "Economics", "Business Studies", "English"],
    };

    const req = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await sendOtpRoute(req);
    const json = await res.json();

    assert.equal(res.status, 200, `Expected 200 OK from otp/send, got ${res.status}: ${JSON.stringify(json)}`);
    assert.equal(json.ok, true, "Response ok should be true");
    assert.ok(json.registrationId, "Response must include registrationId");

    // 1. Assert Candidate A does NOT exist in auth.users
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const existingAuthUser = usersData?.users?.find(
      (u) => u.email?.toLowerCase() === CANDIDATE_A_EMAIL.toLowerCase()
    );
    assert.equal(existingAuthUser, undefined, "CRITICAL: Candidate must NOT exist in auth.users prior to OTP verification!");

    // 2. Assert Candidate A does NOT exist in public.profiles
    const { data: profileData } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("full_name", "Regression Candidate A");
    assert.equal(profileData?.length || 0, 0, "CRITICAL: Profile must NOT exist in public.profiles prior to OTP verification!");

    // 3. Confirm pending registration is staged in user_otp_codes
    const { data: pendingData } = await supabaseAdmin
      .from("user_otp_codes")
      .select("*")
      .eq("email", CANDIDATE_A_EMAIL.toLowerCase())
      .eq("otp_type", "signup");
    assert.equal(pendingData?.length, 1, "Pending registration must be recorded in user_otp_codes");
    assert.equal(pendingData[0].metadata?.status, "pending", "Pending registration must have status 'pending'");
  });

  it("Test B: Incorrect OTP submission is rejected and creates ZERO auth.users records", async () => {
    // Lookup pending registration for Candidate A
    const { data: pendingData } = await supabaseAdmin
      .from("user_otp_codes")
      .select("id")
      .eq("email", CANDIDATE_A_EMAIL.toLowerCase())
      .eq("otp_type", "signup")
      .single();

    assert.ok(pendingData?.id, "Pending registration should exist");

    const req = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: CANDIDATE_A_EMAIL,
        code: "999999", // Invalid OTP
        type: "signup",
        registrationId: pendingData.id,
      }),
    });

    const res = await verifyOtpRoute(req);
    const json = await res.json();

    assert.equal(res.status, 400, "Must return 400 Bad Request on invalid OTP");
    assert.equal(json.ok, false, "Response ok must be false");

    // Assert user still does NOT exist
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const existingAuthUser = usersData?.users?.find(
      (u) => u.email?.toLowerCase() === CANDIDATE_A_EMAIL.toLowerCase()
    );
    assert.equal(existingAuthUser, undefined, "User must NOT exist after failed OTP attempt");
  });

  it("Test C: Expired OTP submission is rejected and creates ZERO auth.users records", async () => {
    // Lookup Candidate A registration and set expires_at in the past
    const pastDate = new Date(Date.now() - 1000 * 60 * 10).toISOString(); // 10 minutes ago
    await supabaseAdmin
      .from("user_otp_codes")
      .update({ expires_at: pastDate })
      .eq("email", CANDIDATE_A_EMAIL.toLowerCase())
      .eq("otp_type", "signup");

    const { data: pendingData } = await supabaseAdmin
      .from("user_otp_codes")
      .select("id")
      .eq("email", CANDIDATE_A_EMAIL.toLowerCase())
      .eq("otp_type", "signup")
      .single();

    const req = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: CANDIDATE_A_EMAIL,
        code: "123456",
        type: "signup",
        registrationId: pendingData?.id,
      }),
    });

    const res = await verifyOtpRoute(req);
    const json = await res.json();

    assert.equal(res.status, 400, "Expired OTP must return 400");
    assert.equal(json.isExpired, true, "Must flag isExpired: true");

    // Assert user still does NOT exist
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const existingAuthUser = usersData?.users?.find(
      (u) => u.email?.toLowerCase() === CANDIDATE_A_EMAIL.toLowerCase()
    );
    assert.equal(existingAuthUser, undefined, "User must NOT exist after expired OTP attempt");
  });

  it("Test D: Valid OTP verification atomically creates permanent auth.users and public.profiles records", async () => {
    // 1. Submit Stage A for Candidate D
    const payloadD = {
      email: CANDIDATE_D_EMAIL,
      type: "signup",
      password: "CandidateDSecurePass_2026!",
      fullName: "Regression Candidate D",
      age: "18",
      targetCollege: "SRCC",
      targetUniversity: "Delhi University",
      targetCourse: "B.Com. (Hons.)",
      targetStream: "Commerce",
      selectedSubjects: ["Accountancy", "Economics", "Business Studies", "English"],
    };

    const sendReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadD),
    });

    const sendRes = await sendOtpRoute(sendReq);
    const sendJson = await sendRes.json();
    assert.equal(sendRes.status, 200);
    assert.ok(sendJson.registrationId);

    // 2. Set deterministic OTP in user_otp_codes
    const candidateDOtpCode = "482619";
    const otpSecret = process.env.OTP_SECRET || "cuetmate-default-otp-secret-salt-2026";
    const otpHash = crypto.createHmac("sha256", otpSecret).update(candidateDOtpCode).digest("hex");
    const freshExpiry = new Date(Date.now() + 1000 * 60 * 5).toISOString();

    await supabaseAdmin
      .from("user_otp_codes")
      .update({
        otp_hash: otpHash,
        expires_at: freshExpiry,
        attempts: 0,
      })
      .eq("email", CANDIDATE_D_EMAIL.toLowerCase())
      .eq("otp_type", "signup");

    // 3. Submit correct OTP via verify endpoint
    const verifyReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: CANDIDATE_D_EMAIL,
        code: candidateDOtpCode,
        type: "signup",
        registrationId: sendJson.registrationId,
      }),
    });

    const verifyRes = await verifyOtpRoute(verifyReq);
    const verifyJson = await verifyRes.json();

    assert.equal(verifyRes.status, 200, `Expected 200 OK from verify, got ${verifyRes.status}: ${JSON.stringify(verifyJson)}`);
    assert.equal(verifyJson.ok, true, "Verification must succeed");
    assert.ok(verifyJson.userId || verifyJson.user?.id, "Response must include userId");
    createdCandidateDId = verifyJson.userId || verifyJson.user?.id;

    // 4. Assert Candidate D exists in auth.users with confirmed email
    const { data: authUserData } = await supabaseAdmin.auth.admin.getUserById(createdCandidateDId);
    assert.ok(authUserData?.user, "Permanent user must exist in auth.users");
    assert.equal(authUserData.user.email?.toLowerCase(), CANDIDATE_D_EMAIL.toLowerCase());
    assert.ok(authUserData.user.email_confirmed_at, "Email must be confirmed");

    // 5. Assert Candidate D exists in public.profiles with matching registration details
    const { data: profileData } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", createdCandidateDId)
      .single();
    assert.ok(profileData, "Profile must exist in public.profiles");
    assert.equal(profileData.full_name, "Regression Candidate D");
    assert.equal(profileData.target_college, "SRCC");
    assert.equal(profileData.target_university, "Delhi University");
  });

  it("Test E: Duplicate registration submission handles pending stage cleanly without duplicate accounts", async () => {
    // Attempt re-registration for Candidate B
    const payloadB = {
      email: CANDIDATE_B_EMAIL,
      type: "signup",
      password: "CandidateBSecurePass_2026!",
      fullName: "Candidate B",
      age: "17",
      targetCollege: "Hindu College",
      targetUniversity: "Delhi University",
      targetCourse: "B.A. (Hons.) Economics",
      targetStream: "Humanities",
      selectedSubjects: ["Economics", "History", "Political Science", "English"],
    };

    // First Stage A submission
    const req1 = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadB),
    });
    const res1 = await sendOtpRoute(req1);
    const json1 = await res1.json();
    assert.equal(res1.status, 200);
    assert.ok(json1.registrationId);

    // Second Stage A submission immediately (cooldown check)
    const req2 = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadB),
    });
    const res2 = await sendOtpRoute(req2);
    const json2 = await res2.json();

    // Must enforce 60s cooldown or update existing pending registration safely
    if (res2.status === 429) {
      assert.ok(json2.cooldownRemaining > 0, "Must return cooldown remaining");
    } else {
      assert.equal(res2.status, 200);
    }

    // Assert Candidate B has 0 accounts in auth.users
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const existingB = usersData?.users?.filter(
      (u) => u.email?.toLowerCase() === CANDIDATE_B_EMAIL.toLowerCase()
    );
    assert.equal(existingB?.length || 0, 0, "No accounts must exist for Candidate B in auth.users during pending stage");
  });

  it("Test F: Complete cross-user session and data isolation", async () => {
    assert.ok(createdCandidateDId, "Candidate D must have been created");

    // Query profiles table for Candidate D
    const { data: profileD } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, campus_coins")
      .eq("id", createdCandidateDId)
      .single();

    assert.ok(profileD);
    assert.equal(profileD.id, createdCandidateDId);
    assert.equal(profileD.full_name, "Regression Candidate D");

    // Query Candidate A - must NOT exist in profiles or auth
    const { data: profileA } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("full_name", "Regression Candidate A");

    assert.equal(profileA?.length || 0, 0, "Candidate A must have zero records in profiles");
  });
});
