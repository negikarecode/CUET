# Security Remediation Log
**Platform:** CUET AI-Prep  
**Status:** All Confirmed Issues Patched & Verified  
**Date:** October 2026  

---

## Remediated Vulnerabilities Log

### 1. [CRITICAL] IDOR in Profile Onboarding
- **Vulnerability ID:** `VULN-01`
- **File Changed:** `app/api/auth/profile/route.ts`
- **Root Cause:** Missing check when `authUser` was null allowed unauthenticated callers to pass arbitrary `id` and upsert records into `profiles`.
- **Fix Implemented:** Enforced `if (!authUser) return 401;` and strictly validated `if (authUser.id !== id) return 403;`.
- **Verification:** Unit test validated; unauthenticated calls rejected with HTTP 401.

---

### 2. [HIGH] Data Disclosure in Profile GET
- **Vulnerability ID:** `VULN-02`
- **File Changed:** `app/api/auth/profile/route.ts`
- **Root Cause:** `GET /api/auth/profile?id=<userId>` returned complete database row to unauthenticated callers.
- **Fix Implemented:** Required active session; restricted non-owner callers to public card fields (`full_name`, `avatar_url`, `target_stream`, `target_college`, `target_university`, `xp`, `current_streak`).
- **Verification:** Verified in code and test suite.

---

### 3. [HIGH] IDOR in Academic Goals Update
- **Vulnerability ID:** `VULN-03`
- **File Changed:** `app/api/profile/update/route.ts`
- **Root Cause:** Target user ID fell back to untrusted `body.userId` when session check failed, allowing arbitrary updates.
- **Fix Implemented:** Enforced `if (!authUser) return 401;` and bound `targetUserId = authUser.id`.
- **Verification:** Verified in code; unauthorized attempts blocked.

---

### 4. [HIGH] Sunday Ritual IDOR & Data Leakage
- **Vulnerability ID:** `VULN-04`
- **File Changed:** `app/api/student/sunday-ritual/route.ts`
- **Root Cause:** Accepted `searchParams.get("userId")` from unauthenticated clients to trigger or view weekly analytics.
- **Fix Implemented:** Replaced query param fallback with mandatory `authUser.id` verification.
- **Verification:** Verified in code; unauthenticated requests receive HTTP 401.

---

### 5. [CRITICAL] Pre-Submission Exam Answer Key Leak
- **Vulnerability ID:** `VULN-05`
- **Files Changed:**
  - `app/api/test/[testId]/route.ts`
  - `lib/store/useCBTStore.ts`
- **Root Cause:** Calling `POST /api/test/[testId]` with `{ action: "reveal" }` leaked all 50 questions, answers, and solutions before test submission.
- **Fix Implemented:**
  - Replaced reveal action with verified submission handshake `{ action: "submit", questionStates, answersSubmitted: true }`.
  - Server denies reveal requests without verified attempt submissions (HTTP 403).
  - CBT store sanitizes questions (`correctOptionId: ""`, `explanation: ""`, `solution: undefined`).
- **Verification:** Automated regression test `__tests__/security-hardening.test.ts` passing.

---

### 6. [HIGH] Attempt Tampering and Deletion in Test Record API
- **Vulnerability ID:** `VULN-06`
- **File Changed:** `app/api/test/record-attempt/route.ts`
- **Root Cause:** `canPersistToDatabase = isSupabaseAuthenticated || uuidRegex.test(targetUserId)` permitted unauthenticated callers with valid UUIDs to delete and overwrite existing attempts in `user_attempts`.
- **Fix Implemented:** Changed condition to `canPersistToDatabase = isSupabaseAuthenticated`. Guest users obtain scored analytics in-memory without database mutation.
- **Verification:** Verified in code; unauthorized attempt deletion eliminated.

---

### 7. [HIGH] Adaptive Drill Cadence Lockout & Telemetry Probing
- **Vulnerability ID:** `VULN-07`
- **File Changed:** `app/api/tests/generate-adaptive-drill/route.ts`
- **Root Cause:** Accepted `body.userId` from unauthenticated callers, exposing victim weak topics and updating `last_adaptive_drill_at`, causing a 12-hour cadence lockout.
- **Fix Implemented:** Required authenticated session (`if (!authUser) return 401;`) and strictly bound `userId = authUser.id`.
- **Verification:** Verified in code; unauthorized cadence updates prevented.

---

### 8. [HIGH] Unmetered LLM Invocations & Denial-of-Wallet
- **Vulnerability ID:** `VULN-08`
- **Files Changed:**
  - `lib/rate-limiter.ts`
  - `app/api/ai/doubt-solver/route.ts`
  - `app/api/ai/why-wrong/route.ts`
  - `app/api/ai/diagnose/route.ts`
  - `app/api/ai/diagnose-mistake/route.ts`
  - `app/api/ai/repair-quiz/route.ts`
  - `app/api/ai/subject-radar/route.ts`
  - `app/api/ai/post-mock/route.ts`
  - `app/api/standing/explain/route.ts`
  - `app/api/student/diagnostic-cycle/route.ts`
- **Root Cause:** Rate limiter was bypassed on server (`if (typeof window === "undefined") return { allowed: true };`); multiple AI endpoints lacked any rate limit checks.
- **Fix Implemented:** Implemented server rate limiter engine with IP and user tracking (`checkServerRateLimit`), daily UTC midnight reset, and HTTP 429 response headers.
- **Verification:** Automated tests verify quota decrement, exhaustion rejection, and header generation.

---

### 9. [MEDIUM] RangeError Exception Crash & IDOR in Payment Verification
- **Vulnerability ID:** `VULN-09`
- **File Changed:** `app/api/payments/verify/route.ts`
- **Root Cause:** `crypto.timingSafeEqual` threw `RangeError` if signature lengths differed; unauthenticated callers could pass `body.userId`.
- **Fix Implemented:**
  - Required active `authUser.id` session.
  - Implemented length-guarded comparison: `expectedBuf.length === actualBuf.length && crypto.timingSafeEqual(expectedBuf, actualBuf)`.
- **Verification:** Automated test verified constant-time evaluation and zero RangeError crashes on short/empty signatures.

---

### 10. [MEDIUM] Student Database UUID Exposure in Public Leaderboard
- **Vulnerability ID:** `VULN-10`
- **File Changed:** `app/api/leaderboard/route.ts`
- **Root Cause:** Exposing raw PostgreSQL primary keys `p.id` enabled targeted IDOR and enumeration attacks against students.
- **Fix Implemented:** Masked other students' UUIDs as `student_${p.id.substring(0, 8)}` while preserving the active student's ID for client matching.
- **Verification:** Automated test verified peer UUID masking.

---

### 11. [MEDIUM] Insecure Practice Cookie Authentication Bypass
- **Vulnerability ID:** `VULN-11`
- **File Changed:** `lib/supabase/middleware.ts`
- **Root Cause:** `cuet_auth=1` cookie set on practice routes was treated as authenticated session across protected dashboard routes.
- **Fix Implemented:** Evaluated `isAuthenticated` strictly from `authUser`. Practice routes allow guest access without granting dashboard credentials.
- **Verification:** Verified in code; unauthorized dashboard navigation redirected to `/signup`.

---

### 12. [LOW] Missing Security Headers & CSP
- **Vulnerability ID:** `VULN-12`
- **File Changed:** `next.config.mjs`
- **Root Cause:** Missing Content Security Policy allowed arbitrary inline frame/script execution.
- **Fix Implemented:** Configured comprehensive CSP supporting Next.js, Razorpay checkout, Google Fonts, and Supabase; added `X-XSS-Protection: 1; mode=block`.
- **Verification:** Production build compiles and exports headers.
