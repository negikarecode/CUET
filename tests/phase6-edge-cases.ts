import { config } from "dotenv";
import path from "path";
config({ path: path.resolve(process.cwd(), ".env.local") });

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import { supabaseAdmin } from "../lib/supabase/admin";
import { NextRequest } from "next/server";
import { POST as sendOtpRoute } from "../app/api/auth/otp/send/route";
import { POST as verifyOtpRoute } from "../app/api/auth/otp/verify/route";
import { POST as checkEmailRoute } from "../app/api/auth/check-email/route";

describe("Phase 6: Full OTP and Registration Edge-Case Matrix", () => {
  const timestamp = Date.now();
  const testPassword = "Password!12345Secure";
  const createdUserIds: string[] = [];

  after(async () => {
    for (const uid of createdUserIds) {
      await supabaseAdmin.from("profiles").delete().eq("id", uid);
      await supabaseAdmin.auth.admin.deleteUser(uid);
    }
  });

  it("Edge Case 1: Candidate registers -> receives OTP -> never enters OTP (Zero permanent records)", async () => {
    const email = `edge1_abandoned_${timestamp}@cuet-edge.local`;
    const sendReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "signup",
        password: testPassword,
        fullName: "Edge Abandoned",
        targetCollege: "SRCC",
        targetUniversity: "Delhi University",
        targetCourse: "B.Com",
        targetStream: "Commerce",
        selectedSubjects: ["Economics"],
      }),
    });

    const res = await sendOtpRoute(sendReq);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.ok(json.registrationId);

    // Verify ZERO records in auth.users
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const foundAuth = usersData?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    assert.equal(foundAuth, undefined, "User must NOT exist in auth.users");
  });

  it("Edge Case 2: Candidate registers -> enters wrong OTP 5 times (Exhaustion & Lockout)", async () => {
    const email = `edge2_wrong5_${timestamp}@cuet-edge.local`;
    const sendReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "signup",
        password: testPassword,
        fullName: "Edge Wrong Attempts",
        targetCollege: "Miranda",
        targetUniversity: "Delhi University",
        targetCourse: "English",
        targetStream: "Humanities",
        selectedSubjects: ["English"],
      }),
    });

    const sendRes = await sendOtpRoute(sendReq);
    const sendJson = await sendRes.json();
    assert.equal(sendRes.status, 200);
    const regId = sendJson.registrationId;

    // Submit 5 wrong OTPs
    for (let i = 1; i <= 5; i++) {
      const verifyReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: "000000",
          type: "signup",
          registrationId: regId,
        }),
      });

      const verifyRes = await verifyOtpRoute(verifyReq);
      const verifyJson = await verifyRes.json();
      assert.equal(verifyRes.status, 400);

      if (i === 5) {
        assert.ok(
          verifyJson.isMaxAttempts === true ||
          verifyJson.isExhausted === true ||
          verifyJson.error?.includes("Too many") ||
          verifyJson.error?.includes("maximum"),
          `Expected attempt exhaustion on attempt 5, got: ${JSON.stringify(verifyJson)}`
        );
      }
    }

    // Verify 6th attempt is blocked as exhausted
    const verifyReq6 = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        code: "000000",
        type: "signup",
        registrationId: regId,
      }),
    });
    const verifyRes6 = await verifyOtpRoute(verifyReq6);
    assert.equal(verifyRes6.status, 400);

    // Verify ZERO records created in auth.users
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const foundAuth = usersData?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    assert.equal(foundAuth, undefined, "Exhausted OTP must NOT create an auth user");
  });

  it("Edge Case 3: Candidate registers -> waits past expiration -> enters correct OTP (Expired rejection)", async () => {
    const email = `edge3_expired_${timestamp}@cuet-edge.local`;
    const sendReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "signup",
        password: testPassword,
        fullName: "Edge Expired",
        targetCollege: "Hindu College",
        targetUniversity: "Delhi University",
        targetCourse: "Economics",
        targetStream: "Commerce",
        selectedSubjects: ["Economics"],
      }),
    });

    const sendRes = await sendOtpRoute(sendReq);
    const sendJson = await sendRes.json();
    assert.equal(sendRes.status, 200);

    const testOtp = "998877";
    const otpSecret = process.env.OTP_SECRET || "cuetmate-default-otp-secret-salt-2026";
    const otpHash = crypto.createHmac("sha256", otpSecret).update(testOtp).digest("hex");
    // Force expired timestamp in DB
    const expiredTimestamp = new Date(Date.now() - 1000 * 60 * 10).toISOString();

    await supabaseAdmin
      .from("user_otp_codes")
      .update({
        otp_hash: otpHash,
        expires_at: expiredTimestamp,
      })
      .eq("email", email.toLowerCase())
      .eq("otp_type", "signup");

    const verifyReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        code: testOtp,
        type: "signup",
        registrationId: sendJson.registrationId,
      }),
    });

    const verifyRes = await verifyOtpRoute(verifyReq);
    const verifyJson = await verifyRes.json();
    assert.equal(verifyRes.status, 400);
    assert.equal(verifyJson.isExpired, true);

    // Verify ZERO records created in auth.users
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const foundAuth = usersData?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    assert.equal(foundAuth, undefined, "Expired OTP must NOT create an auth user");
  });

  it("Edge Case 4: Candidate requests OTP resend (Enforces 60-second cooldown and updates hash)", async () => {
    const email = `edge4_resend_${timestamp}@cuet-edge.local`;
    const sendPayload = {
      email,
      type: "signup",
      password: testPassword,
      fullName: "Edge Resend",
      targetCollege: "Hansraj",
      targetUniversity: "Delhi University",
      targetCourse: "B.Sc.",
      targetStream: "Science",
      selectedSubjects: ["Physics"],
    };

    // First send
    const sendReq1 = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendPayload),
    });
    const res1 = await sendOtpRoute(sendReq1);
    assert.equal(res1.status, 200);

    // Immediate second send within 60s cooldown
    const sendReq2 = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendPayload),
    });
    const res2 = await sendOtpRoute(sendReq2);
    const json2 = await res2.json();

    assert.equal(res2.status, 429, "Immediate resend within cooldown must return 429 Too Many Requests");
    assert.ok(
      json2.cooldownRemaining !== undefined || json2.retryAfterSeconds !== undefined,
      "Response must specify cooldown"
    );
  });

  it("Edge Case 5: Candidate tries to register with existing verified email (Accounts exists rejection)", async () => {
    // Existing verified production candidate: aryannegiofficial@gmail.com
    const existingEmail = "aryannegiofficial@gmail.com";

    // 1. Check email endpoint
    const checkReq = new NextRequest("https://cuetmate.vercel.app/api/auth/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: existingEmail }),
    });
    const checkRes = await checkEmailRoute(checkReq);
    const checkJson = await checkRes.json();

    assert.equal(checkRes.status, 200);
    assert.equal(checkJson.exists, true, "Verified existing email must return exists: true");
    assert.equal(checkJson.category, "VERIFIED_EXISTING");

    // 2. Attempt signup OTP send for existing verified email
    const sendReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: existingEmail,
        type: "signup",
        password: testPassword,
        fullName: "Imposter",
      }),
    });
    const sendRes = await sendOtpRoute(sendReq);
    const sendJson = await sendRes.json();

    assert.ok(sendRes.status === 409 || sendRes.status === 400, `Expected 409 or 400, got ${sendRes.status}`);
    assert.equal(sendJson.code, "ACCOUNT_EXISTS");
  });

  it("Edge Case 6: Email normalization (Trims whitespace and handles mixed case)", async () => {
    const unnormalizedEmail = "   ArYaNneGiOfficial@GMAIL.com   ";
    const checkReq = new NextRequest("https://cuetmate.vercel.app/api/auth/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: unnormalizedEmail }),
    });
    const checkRes = await checkEmailRoute(checkReq);
    const checkJson = await checkRes.json();

    assert.equal(checkRes.status, 200);
    assert.equal(checkJson.exists, true, "Normalized email must detect existing account");
    assert.equal(checkJson.category, "VERIFIED_EXISTING");
  });

  it("Edge Case 7: Concurrent verification attempts with same OTP (Race-condition safety)", async () => {
    const email = `edge7_concurrent_${timestamp}@cuet-edge.local`;
    const sendReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "signup",
        password: testPassword,
        fullName: "Edge Concurrent",
        targetCollege: "SRCC",
        targetUniversity: "Delhi University",
        targetCourse: "B.Com",
        targetStream: "Commerce",
        selectedSubjects: ["Economics"],
      }),
    });

    const sendRes = await sendOtpRoute(sendReq);
    const sendJson = await sendRes.json();
    assert.equal(sendRes.status, 200);

    const testOtp = "123789";
    const otpSecret = process.env.OTP_SECRET || "cuetmate-default-otp-secret-salt-2026";
    const otpHash = crypto.createHmac("sha256", otpSecret).update(testOtp).digest("hex");
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

    // Launch 3 simultaneous verification requests with the identical OTP and registrationId
    const makeReq = () =>
      new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: testOtp,
          type: "signup",
          registrationId: sendJson.registrationId,
        }),
      });

    const [res1, res2, res3] = await Promise.all([
      verifyOtpRoute(makeReq()),
      verifyOtpRoute(makeReq()),
      verifyOtpRoute(makeReq()),
    ]);

    const results = [
      { status: res1.status, json: await res1.json() },
      { status: res2.status, json: await res2.json() },
      { status: res3.status, json: await res3.json() },
    ];

    const successes = results.filter((r) => r.status === 200 && r.json.ok);
    assert.ok(successes.length >= 1, "At least one verification must succeed");
    
    // Capture user ID for cleanup
    const firstSuccess = successes[0];
    const winningUid = firstSuccess?.json?.userId || firstSuccess?.json?.user?.id;
    if (winningUid) createdUserIds.push(winningUid);

    // Verify EXACTLY one user exists in auth.users
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const matchingUsers = usersData?.users?.filter((u) => u.email?.toLowerCase() === email.toLowerCase());
    assert.equal(matchingUsers?.length, 1, "Concurrency must produce EXACTLY ONE auth.users account");

    // Verify EXACTLY one profile exists in public.profiles
    const { data: profiles } = await supabaseAdmin.from("profiles").select("*").eq("id", winningUid);
    assert.equal(profiles?.length, 1, "Concurrency must produce EXACTLY ONE public.profiles record");
  });

  it("Edge Case 8: Replay attack prevention (Consumed OTP cannot be reused)", async () => {
    // Attempt to verify with the consumed OTP from Edge Case 7 again
    const email = `edge7_concurrent_${timestamp}@cuet-edge.local`;
    const replayReq = new NextRequest("https://cuetmate.vercel.app/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        code: "123789",
        type: "signup",
      }),
    });

    const replayRes = await verifyOtpRoute(replayReq);
    assert.equal(replayRes.status, 400, "Replayed consumed OTP must be rejected with 400");
  });
});
