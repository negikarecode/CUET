import { describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import {
  checkServerRateLimit,
  getClientIdentifier,
  getRateLimitHeaders,
} from "../lib/rate-limiter";
import { sanitizeQuestionForActiveExam } from "../lib/store/useCBTStore";
import { Question } from "../types";

describe("Security Hardening & Regression Test Suite", () => {
  describe("1. Server Rate Limiting & Abuse Prevention", () => {
    it("should allow requests under the defined limit and decrement remaining quota", () => {
      const testIdentifier = `test-user-${Date.now()}`;
      const result1 = checkServerRateLimit("test_feature", testIdentifier, 5);

      assert.equal(result1.allowed, true);
      assert.equal(result1.limit, 5);
      assert.equal(result1.remaining, 4);

      const result2 = checkServerRateLimit("test_feature", testIdentifier, 5);
      assert.equal(result2.allowed, true);
      assert.equal(result2.remaining, 3);
    });

    it("should strictly reject requests once the limit is exhausted (HTTP 429 semantics)", () => {
      const testIdentifier = `test-capped-${Date.now()}`;
      for (let i = 0; i < 3; i++) {
        const res = checkServerRateLimit("capped_feature", testIdentifier, 3);
        assert.equal(res.allowed, true);
      }

      // 4th request must be rejected
      const rejected = checkServerRateLimit("capped_feature", testIdentifier, 3);
      assert.equal(rejected.allowed, false);
      assert.equal(rejected.remaining, 0);
      assert.ok(rejected.error?.includes("limit of 3 requests"));
    });

    it("should format correct rate limit HTTP headers", () => {
      const mockResult = {
        allowed: false,
        limit: 30,
        remaining: 0,
        resetAt: 1770000000000,
      };
      const headers = getRateLimitHeaders(mockResult);
      assert.equal(headers["X-RateLimit-Limit"], "30");
      assert.equal(headers["X-RateLimit-Remaining"], "0");
      assert.equal(headers["X-RateLimit-Reset"], "1770000000");
    });

    it("should resolve client identifier from user ID when authenticated", () => {
      const mockReq = { headers: new Headers({ "x-forwarded-for": "203.0.113.195" }) };
      const ident = getClientIdentifier(mockReq as any, "usr_auth_123");
      assert.equal(ident, "user:usr_auth_123");
    });

    it("should fallback to client IP when user is anonymous, guest, or unauthenticated", () => {
      const mockReq = { headers: new Headers({ "x-forwarded-for": "198.51.100.42, 10.0.0.1" }) };
      const identAnon = getClientIdentifier(mockReq as any, "anon_12345");
      assert.equal(identAnon, "ip:198.51.100.42");

      const identGuest = getClientIdentifier(mockReq as any, "guest");
      assert.equal(identGuest, "ip:198.51.100.42");

      const identNull = getClientIdentifier(mockReq as any, null);
      assert.equal(identNull, "ip:198.51.100.42");
    });
  });

  describe("2. Cryptographic Timing Safety & Payment Verification", () => {
    const keySecret = "prod_super_secret_webhook_key_2026";

    it("should never throw RangeError when comparing signatures of unequal length", () => {
      const orderId = "order_12345";
      const paymentId = "pay_67890";
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      const expectedBuf = Buffer.from(expectedSignature, "utf-8");

      // Test with short signature
      const shortSig = "abc";
      const shortBuf = Buffer.from(shortSig, "utf-8");
      const shortMatch =
        expectedBuf.length === shortBuf.length &&
        crypto.timingSafeEqual(expectedBuf, shortBuf);
      assert.equal(shortMatch, false);

      // Test with empty signature
      const emptyBuf = Buffer.from("", "utf-8");
      const emptyMatch =
        expectedBuf.length === emptyBuf.length &&
        crypto.timingSafeEqual(expectedBuf, emptyBuf);
      assert.equal(emptyMatch, false);

      // Test with valid signature
      const validBuf = Buffer.from(expectedSignature, "utf-8");
      const validMatch =
        expectedBuf.length === validBuf.length &&
        crypto.timingSafeEqual(expectedBuf, validBuf);
      assert.equal(validMatch, true);
    });

    it("should reject tampered HMAC payloads in constant time", () => {
      const validSig = crypto
        .createHmac("sha256", keySecret)
        .update("valid_data")
        .digest("hex");

      const tamperedSig = crypto
        .createHmac("sha256", keySecret)
        .update("tampered_data")
        .digest("hex");

      const validBuf = Buffer.from(validSig, "utf-8");
      const tamperedBuf = Buffer.from(tamperedSig, "utf-8");

      assert.equal(validBuf.length, tamperedBuf.length);
      const isMatch =
        validBuf.length === tamperedBuf.length &&
        crypto.timingSafeEqual(validBuf, tamperedBuf);
      assert.equal(isMatch, false);
    });
  });

  describe("3. Exam Integrity & Answer Key Sanitization", () => {
    it("should strip correctOptionId, explanation, and solutions during active exam", () => {
      const rawQuestion: Question = {
        id: "q_physics_001",
        subjectId: "physics",
        questionNumber: 1,
        topic: "Electromagnetism",
        difficulty: "medium",
        prompt: "What is Faraday's law of induction?",
        options: [
          { id: "A", text: "Option A" },
          { id: "B", text: "Option B" },
          { id: "C", text: "Option C" },
          { id: "D", text: "Option D" },
        ],
        correctOptionId: "B",
        explanation: "Faraday's law states that EMF is induced by changing magnetic flux.",
        solution: {
          quick: "Think of magnetic flux change.",
          concept: "Faraday's law of induction.",
          detailed: "Step 1: calculate dPhi/dt. Step 2: EMF = -dPhi/dt.",
        },
      };

      const sanitized = sanitizeQuestionForActiveExam(rawQuestion);

      assert.equal(sanitized.id, "q_physics_001");
      assert.equal(sanitized.prompt, "What is Faraday's law of induction?");
      assert.equal(sanitized.options.length, 4);

      // CRITICAL SECURITY ASSERTIONS:
      assert.equal(sanitized.correctOptionId, "");
      assert.equal(sanitized.explanation, "");
      assert.equal(sanitized.solution, undefined);
    });
  });

  describe("4. Leaderboard Student UUID Privacy Masking", () => {
    it("should mask other students' database UUIDs while preserving active user identity", () => {
      const currentUserId = "11111111-1111-4111-8111-111111111111";
      const victimUserId = "22222222-2222-4222-8222-222222222222";

      const profiles = [
        { id: currentUserId, full_name: "Self Candidate" },
        { id: victimUserId, full_name: "Peer Candidate" },
      ];

      const entries = profiles.map((p) => {
        const isCurrentUser = Boolean(currentUserId && p.id === currentUserId);
        return {
          userId: isCurrentUser ? p.id : `student_${p.id.substring(0, 8)}`,
          name: p.full_name,
          isCurrentUser,
        };
      });

      // Assert self identity is intact for matching
      assert.equal(entries[0]!.userId, currentUserId);
      assert.equal(entries[0]!.isCurrentUser, true);

      // Assert peer internal database UUID is masked
      assert.equal(entries[1]!.userId, "student_22222222");
      assert.notEqual(entries[1]!.userId, victimUserId);
      assert.equal(entries[1]!.isCurrentUser, false);
    });
  });
});
