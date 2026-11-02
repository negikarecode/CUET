import { describe, it } from "node:test";
import assert from "node:assert";
import {
  generateNumericOtp,
  hashOtp,
  saveOtp,
  verifyOtpCode,
  deleteOtpRecord,
} from "../lib/auth/otp-service";
import { buildOtpEmailHtml } from "../lib/email/brevo";

describe("Brevo Email OTP Service Unit Tests", () => {
  it("generates a secure 6-digit numeric OTP", () => {
    for (let i = 0; i < 20; i++) {
      const otp = generateNumericOtp();
      assert.strictEqual(typeof otp, "string");
      assert.strictEqual(otp.length, 6);
      assert.match(otp, /^[0-9]{6}$/);
    }
  });

  it("produces consistent HMAC-SHA256 hashes", () => {
    const code = "123456";
    const hash1 = hashOtp(code);
    const hash2 = hashOtp(code);
    assert.strictEqual(hash1, hash2);
    assert.strictEqual(typeof hash1, "string");
    assert.strictEqual(hash1.length, 64); // 32 bytes hex
  });

  it("builds branded HTML email templates for signup, login, and recovery", () => {
    const signup = buildOtpEmailHtml({ code: "654321", type: "signup" });
    assert.ok(signup.subject.includes("654321"));
    assert.ok(signup.html.includes("654321"));
    assert.ok(signup.html.includes("Verify Your Email Address"));
    assert.ok(signup.html.includes("CUETMate"));

    const login = buildOtpEmailHtml({ code: "112233", type: "login" });
    assert.ok(login.subject.includes("112233"));
    assert.ok(login.html.includes("Sign In With One-Time Code"));

    const recovery = buildOtpEmailHtml({ code: "998877", type: "recovery" });
    assert.ok(recovery.subject.includes("998877"));
    assert.ok(recovery.html.includes("Reset Your Password"));
  });

  it("enforces 60-second cooldown on consecutive OTP requests for same email and type", async () => {
    const testEmail = `cooldown_test_${Date.now()}@test.com`;

    const first = await saveOtp({ email: testEmail, type: "signup", code: "123456" });
    assert.strictEqual(first.success, true);

    const second = await saveOtp({ email: testEmail, type: "signup", code: "654321" });
    assert.strictEqual(second.success, false);
    assert.ok(second.cooldownRemaining && second.cooldownRemaining > 0);
    assert.ok(second.error?.includes("Please wait"));

    // Cleanup
    await deleteOtpRecord(testEmail, "signup");
  });

  it("validates correct OTP code, handles wrong attempts, and enforces single use", async () => {
    const testEmail = `verify_test_${Date.now()}@test.com`;
    const code = "789012";

    await saveOtp({ email: testEmail, type: "login", code });

    // Wrong code attempt
    const wrong = await verifyOtpCode({ email: testEmail, type: "login", code: "000000" });
    assert.strictEqual(wrong.success, false);
    assert.ok(wrong.error?.includes("4 attempts remaining"));

    // Correct code attempt
    const correct = await verifyOtpCode({ email: testEmail, type: "login", code });
    assert.strictEqual(correct.success, true);

    // Replay / single-use test: code must now be consumed
    const replay = await verifyOtpCode({ email: testEmail, type: "login", code });
    assert.strictEqual(replay.success, false);
    assert.strictEqual(replay.isExpired, true);
  });

  it("invalidates code after 5 consecutive failed attempts", async () => {
    const testEmail = `max_attempts_${Date.now()}@test.com`;
    const code = "555555";

    await saveOtp({ email: testEmail, type: "recovery", code });

    // 4 wrong attempts
    for (let i = 0; i < 4; i++) {
      const res = await verifyOtpCode({ email: testEmail, type: "recovery", code: "000000" });
      assert.strictEqual(res.success, false);
    }

    // 5th wrong attempt triggers invalidation
    const fifth = await verifyOtpCode({ email: testEmail, type: "recovery", code: "000000" });
    assert.strictEqual(fifth.success, false);
    assert.strictEqual(fifth.isMaxAttempts, true);

    // Even with correct code now, it should be deleted
    const nowCorrect = await verifyOtpCode({ email: testEmail, type: "recovery", code });
    assert.strictEqual(nowCorrect.success, false);
  });
});
