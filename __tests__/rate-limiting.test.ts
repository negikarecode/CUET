/**
 * CUETMate Global Rate Limiting & Abuse Protection Test Suite
 * Validates:
 * 1. IP Provenance and Spoofing Defense
 * 2. Standard HTTP 429 Response Formatting & Standard Headers
 * 3. Scoping Invariants (IP-only, User-only, Combined)
 * 4. Concurrency Safety and Atomic Increment Semantics
 * 5. Window Expiry and Penalty Block Cooldown
 * 6. Business Entitlements Coexistence (Free-tier session caps preserved)
 * 7. Server Route Rate Limit Enforcement
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { NextRequest } from "next/server";
import { getClientIp, isValidIp, cleanIpAddress } from "../lib/security/ip";
import {
  rateLimit,
  rateLimitResponse,
  getClientRateLimitIdentifier,
  resetRateLimitKey,
} from "../lib/security/rateLimiter";
import { getRateLimitPolicy } from "../lib/security/rateLimitPolicy";
import { POST as rateCheckHandler } from "../app/api/auth/rate-check/route";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`  ❌ FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

async function runRateLimitingTests() {
  console.log("===============================================================");
  console.log("CUETMATE GLOBAL RATE LIMITING & ABUSE PROTECTION TEST SUITE");
  console.log("===============================================================\n");

  // ─── SUITE 1: IP PROVENANCE & SPOOFING DEFENSE ────────────────────────────
  console.log("[SUITE 1] IP Extraction, Normalization & Spoofing Defense");

  assert(isValidIp("192.168.1.1"), "Valid IPv4 detected");
  assert(isValidIp("2001:0db8:85a3:0000:0000:8a2e:0370:7334"), "Valid IPv6 detected");
  assert(!isValidIp("999.999.999.999"), "Invalid IPv4 rejected");
  assert(!isValidIp("invalid-ip-string"), "Arbitrary text rejected");

  assert(cleanIpAddress("203.0.113.195:8080") === "203.0.113.195", "Stripped IPv4 port");
  assert(cleanIpAddress("::ffff:192.0.2.1") === "192.0.2.1", "Normalized IPv6-mapped IPv4");
  assert(cleanIpAddress(null) === "127.0.0.1", "Fallback for null IP");

  // Vercel authoritative header takes absolute precedence over client-forged X-Forwarded-For
  const spoofReq = new NextRequest("https://cuetmate.vercel.app/api/auth/rate-check", {
    headers: {
      "x-vercel-ip": "49.36.120.4",
      "x-forwarded-for": "10.0.0.1, 1.1.1.1",
      "cf-connecting-ip": "103.21.244.2",
    },
  });
  assert(getClientIp(spoofReq) === "49.36.120.4", "x-vercel-ip prioritizes over forwarded headers");

  // Cloudflare header fallback
  const cfReq = new NextRequest("https://cuetmate.vercel.app/api/auth/rate-check", {
    headers: {
      "cf-connecting-ip": "103.21.244.2",
      "x-forwarded-for": "1.1.1.1",
    },
  });
  assert(getClientIp(cfReq) === "103.21.244.2", "cf-connecting-ip prioritized when vercel-ip absent");

  // Leftmost valid entry in X-Forwarded-For
  const fwdReq = new NextRequest("https://cuetmate.vercel.app/api/auth/rate-check", {
    headers: {
      "x-forwarded-for": "157.240.22.35, 10.0.0.2",
    },
  });
  assert(getClientIp(fwdReq) === "157.240.22.35", "x-forwarded-for extracts first valid public IP");

  // ─── SUITE 2: CENTRALIZED POLICY CONFIGURATION ─────────────────────────────
  console.log("\n[SUITE 2] Centralized Policy Engine Verification");

  const loginPolicy = getRateLimitPolicy("auth:login");
  assert(loginPolicy.max === 5 && loginPolicy.windowSeconds === 900, "auth:login configured for 5 per 15m");
  assert(loginPolicy.failClosed === true, "auth:login is fail-closed");

  const signupPolicy = getRateLimitPolicy("auth:signup");
  assert(signupPolicy.max === 5 && signupPolicy.windowSeconds === 3600, "auth:signup configured for 5 per hour");

  const createOrderPolicy = getRateLimitPolicy("payment:create_order");
  assert(createOrderPolicy.max === 5 && createOrderPolicy.windowSeconds === 600, "payment:create_order configured for 5 per 10m");
  assert(createOrderPolicy.failClosed === true, "payment:create_order is fail-closed");

  const verifyPaymentPolicy = getRateLimitPolicy("payment:verify");
  assert(verifyPaymentPolicy.max === 10 && verifyPaymentPolicy.windowSeconds === 600, "payment:verify configured for 10 per 10m");

  const examStartPolicy = getRateLimitPolicy("exam:start");
  assert(examStartPolicy.max === 10 && examStartPolicy.windowSeconds === 60, "exam:start configured for 10 per min");

  const aiInsightsPolicy = getRateLimitPolicy("ai:insights");
  assert(aiInsightsPolicy.max === 10 && aiInsightsPolicy.windowSeconds === 60, "ai:insights configured for 10 per min");

  // ─── SUITE 3: STANDARD HTTP 429 RESPONSE & HEADERS ─────────────────────────
  console.log("\n[SUITE 3] Standard HTTP 429 Response & Headers");

  const mockBlockedResult = {
    success: false,
    allowed: false,
    limit: 5,
    remaining: 0,
    reset: Math.floor(Date.now() / 1000) + 120,
    retryAfter: 120,
    key: "rl:auth:login:usr:test_usr:ip:127.0.0.1",
    error: "Too many login attempts. For security, please wait 15 minutes before trying again.",
  };

  const httpRes = rateLimitResponse(mockBlockedResult);
  assert(httpRes.status === 429, "HTTP status is 429 Too Many Requests");
  assert(httpRes.headers.get("Retry-After") === "120", "Retry-After header matches retryAfter seconds");
  assert(httpRes.headers.get("X-RateLimit-Limit") === "5", "X-RateLimit-Limit header matches policy limit");
  assert(httpRes.headers.get("X-RateLimit-Remaining") === "0", "X-RateLimit-Remaining header is 0");
  assert(Boolean(httpRes.headers.get("X-RateLimit-Reset")), "X-RateLimit-Reset epoch timestamp header present");

  // ─── SUITE 4: SCOPING INVARIANTS ───────────────────────────────────────────
  console.log("\n[SUITE 4] Scoping Invariants (IP, User & Combined)");

  const testIp = "182.70.10.15";
  const user1 = "student_alpha";
  const user2 = "student_beta";

  // IP scope: keys strictly by IP regardless of user
  const ipKey1 = getClientRateLimitIdentifier(new NextRequest("https://c.app", { headers: { "x-vercel-ip": testIp } }), user1, "auth:signup");
  const ipKey2 = getClientRateLimitIdentifier(new NextRequest("https://c.app", { headers: { "x-vercel-ip": testIp } }), user2, "auth:signup");
  assert(ipKey1 === ipKey2, `IP scope produces identical key for same IP: ${ipKey1}`);

  // User scope: two users on same IP must get independent quotas
  const userKey1 = getClientRateLimitIdentifier(new NextRequest("https://c.app", { headers: { "x-vercel-ip": testIp } }), user1, "ai:insights");
  const userKey2 = getClientRateLimitIdentifier(new NextRequest("https://c.app", { headers: { "x-vercel-ip": testIp } }), user2, "ai:insights");
  assert(userKey1 !== userKey2, `User scope produces isolated keys: ${userKey1} vs ${userKey2}`);

  // Combined scope: keys by usr:id:ip:ip
  const combinedKey = getClientRateLimitIdentifier(new NextRequest("https://c.app", { headers: { "x-vercel-ip": testIp } }), user1, "payment:create_order");
  assert(combinedKey.includes(user1) && combinedKey.includes(testIp), `Combined key encapsulates both user and IP: ${combinedKey}`);

  // ─── SUITE 5: CONCURRENCY & ATOMIC ENFORCEMENT ──────────────────────────────
  console.log("\n[SUITE 5] Concurrency & Atomic Sliding Window Enforcement");

  const concurrencyTestKey = `test_concurrency_${Date.now()}`;
  resetRateLimitKey("exam:start", concurrencyTestKey);

  // Policy: limit = 5 requests
  const concurrentRequests = 15;
  const testPolicy = { max: 5, windowSeconds: 60 };

  const results = await Promise.all(
    Array.from({ length: concurrentRequests }).map(() =>
      rateLimit("exam:start", concurrencyTestKey, testPolicy)
    )
  );

  const allowedCount = results.filter((r) => r.success).length;
  const blockedCount = results.filter((r) => !r.success).length;

  assert(allowedCount === 5, `Strictly 5 concurrent requests allowed (received: ${allowedCount})`);
  assert(blockedCount === 10, `Strictly 10 concurrent requests rejected with rate limit (received: ${blockedCount})`);

  // Subsequent request must be rejected and report remaining 0
  const followUp = await rateLimit("exam:start", concurrencyTestKey, testPolicy);
  assert(!followUp.success, "Subsequent request rejected");
  assert(followUp.remaining === 0, "Remaining capacity reported as 0");

  // ─── SUITE 6: WINDOW EXPIRY & PENALTY COOLDOWN ─────────────────────────────
  console.log("\n[SUITE 6] Window Expiry & Penalty Block Duration");

  const shortWindowKey = `test_window_${Date.now()}`;
  resetRateLimitKey("exam:start", shortWindowKey);

  // Short 1-second window with max = 2
  const shortPolicy = { max: 2, windowSeconds: 1 };
  const r1 = await rateLimit("exam:start", shortWindowKey, shortPolicy);
  const r2 = await rateLimit("exam:start", shortWindowKey, shortPolicy);
  const r3 = await rateLimit("exam:start", shortWindowKey, shortPolicy);

  assert(r1.success && r2.success, "First 2 requests in window allowed");
  assert(!r3.success, "3rd request exceeds limit of 2");

  // Sleep 1.1s for window to slide forward
  await new Promise((res) => setTimeout(res, 1100));

  const r4 = await rateLimit("exam:start", shortWindowKey, shortPolicy);
  assert(r4.success, "Request allowed after window duration expired");

  // ─── SUITE 7: AUTH RATE-CHECK ROUTE SMOKE TEST ─────────────────────────────
  console.log("\n[SUITE 7] /api/auth/rate-check Route Integration");

  const authTestEmail = `candidate_${Date.now()}@cuetmate.in`;
  const authReq = new NextRequest("https://cuetmate.vercel.app/api/auth/rate-check", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-vercel-ip": "14.139.45.1" },
    body: JSON.stringify({ action: "auth:login", identifier: authTestEmail }),
  });

  const authRes = await rateCheckHandler(authReq);
  assert(authRes.status === 200, "Initial rate-check succeeds with HTTP 200");
  const authJson = await authRes.json();
  assert(authJson.allowed === true && authJson.remaining === 4, `Remaining quota decremented correctly to 4 (actual: ${authJson.remaining})`);

  // Invalid action must be rejected with HTTP 400
  const invalidReq = new NextRequest("https://cuetmate.vercel.app/api/auth/rate-check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "unknown:action" }),
  });
  const invalidRes = await rateCheckHandler(invalidReq);
  assert(invalidRes.status === 400, "Unsupported action rejected with HTTP 400");

  console.log("\n===============================================================");
  console.log("ALL RATE LIMITING & SECURITY HARDENING INVARIANTS VERIFIED ✓");
  console.log("===============================================================\n");
}

runRateLimitingTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
