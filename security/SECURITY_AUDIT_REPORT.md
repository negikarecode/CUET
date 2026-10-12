# Comprehensive Application Security Audit Report
**Target Platform:** CUET AI-Prep Examination & Adaptive Diagnostic System  
**Audit Type:** Full Source-Code Review, Threat Modeling, Architecture Assessment & Penetration Hardening  
**Date:** October 2026  
**Auditor Classification:** Lead Application Security & DevSecOps Engineer  
**Status:** All Confirmed Critical, High, and Medium Vulnerabilities Remediated & Verified  

---

## 1. Executive Summary

A comprehensive, production-oriented application security audit was performed across the entire CUET AI-Prep web application repository (`CUET (copy)`). The scope encompassed all frontend pages, server actions, 23 Next.js API endpoints, authentication flows, middleware session management, database interactions, role-based and ownership access controls, external AI (Groq LPU, Google Gemini) and payment gateway (Razorpay) integrations, rate limiting, and HTTP security headers.

Prior to hardening, the application exhibited several high-impact vulnerabilities characteristic of rapid feature development:
1. **Broken Access Control & IDOR Vulnerabilities** in student profiles, academic goals, adaptive drill cadence, and attempt histories.
2. **Pre-Submission Examination Integrity Weakness**, allowing clients to inspect complete 50-question answer keys and explanations prior to verified test submission.
3. **Absence of Server-Side Rate Limiting** on costly LLM reasoning routes (`/api/ai/doubt-solver`, `/api/ai/diagnose-mistake`, `/api/ai/repair-quiz`, `/api/ai/subject-radar`, `/api/standing/explain`), exposing the platform to denial-of-service (DoS) and API wallet exhaustion.
4. **Cryptographic Exception Denial-of-Service** in payment signature verification via untrusted input length mismatches in `crypto.timingSafeEqual`.
5. **Student Privacy Leakage** in the public leaderboard exposing internal PostgreSQL primary key UUIDs.

**Remediation Summary:**
- **Confirmed Vulnerabilities:** 12
- **Vulnerabilities Remediated:** 12 (100% remediation of all confirmed issues)
- **Automated Security Regression Tests:** 9 test cases in `__tests__/security-hardening.test.ts` passing 100%.
- **Zero Build / Type Regressions:** TypeScript typecheck (`tsc --noEmit`) and production Next.js build pass with exit code 0.

---

## 2. System Architecture & Threat Model

### 2.1 Technology Stack & Trust Boundaries
- **Framework & Runtime:** Next.js 14.2.35 (App Router), React 18, Node.js runtime.
- **Database Layer:** Supabase PostgreSQL with Row Level Security (RLS) and Service-Role Admin Client (`createAdminClient`).
- **Authentication Provider:** Supabase Auth with JWT cookies and session middleware (`lib/supabase/middleware.ts`).
- **External Payment Processor:** Razorpay (HMAC SHA-256 webhook and verification signatures).
- **External AI Providers:** Groq LPU (Llama 3.1 8B Instant) and Google Gemini (gemini-1.5-flash / gemini-2.0-flash).

### 2.2 Threat Model Analysis
```mermaid
flowchart TD
    Client[Candidate Browser / HTTP Client] -->|HTTPS Requests| Edge[Next.js Middleware & Security Headers]
    Edge -->|Guarded Dashboard| Pages[Protected Dashboard Pages]
    Edge -->|Practice Routes| CBT[Computer-Based Testing Engine]
    Client -->|API Invocations| RateLimiter[Server Rate Limiting & Abuse Limiter]
    RateLimiter --> API[API Endpoints /api/*]
    API -->|Session Validation| SupabaseAuth[Supabase Auth]
    API -->|HMAC SHA-256| Razorpay[Razorpay Gateway]
    API -->|Token Logger / Metered| LLM[Groq / Gemini AI APIs]
    API -->|Authenticated Scoped Ops| DB[(Supabase PostgreSQL)]
```

### 2.3 Key Trust Boundaries
1. **Client Browser $\rightarrow$ Next.js Server:** Any request parameter (query strings, JSON body, client headers, unauthenticated cookies) is untrusted.
2. **Server Route $\rightarrow$ Supabase Database:** Service-role client operates with superuser bypass; endpoints must strictly authorize caller identity before querying or modifying records.
3. **Server Route $\rightarrow$ Third-Party AI Services:** Outbound token usage must be strictly throttled to prevent resource amplification.

---

## 3. Comprehensive Findings & Vulnerability Matrix

| Finding ID | Severity | Category | Vulnerable Endpoint / Component | Status |
| :--- | :--- | :--- | :--- | :--- |
| **VULN-01** | **CRITICAL** | Broken Access Control (IDOR) | `POST /api/auth/profile` | **REMEDIATED** |
| **VULN-02** | **HIGH** | Sensitive Data Exposure | `GET /api/auth/profile` | **REMEDIATED** |
| **VULN-03** | **HIGH** | Broken Access Control (IDOR) | `POST /api/profile/update` | **REMEDIATED** |
| **VULN-04** | **HIGH** | Broken Access Control (IDOR) | `GET /api/student/sunday-ritual` | **REMEDIATED** |
| **VULN-05** | **CRITICAL** | Exam Integrity & Answer Leak | `POST /api/test/[testId]` | **REMEDIATED** |
| **VULN-06** | **HIGH** | Database Tampering & IDOR | `POST /api/test/record-attempt` | **REMEDIATED** |
| **VULN-07** | **HIGH** | Account Cadence Lockout & IDOR | `POST /api/tests/generate-adaptive-drill` | **REMEDIATED** |
| **VULN-08** | **HIGH** | Cost Amplification & Unmetered AI | `POST /api/ai/*` (Doubt, Mistake, Radar) | **REMEDIATED** |
| **VULN-09** | **MEDIUM** | Exception Crash & IDOR | `POST /api/payments/verify` | **REMEDIATED** |
| **VULN-10** | **MEDIUM** | Student PII & UUID Harvesting | `GET /api/leaderboard` | **REMEDIATED** |
| **VULN-11** | **MEDIUM** | Authentication Bypass Cookie | `lib/supabase/middleware.ts` | **REMEDIATED** |
| **VULN-12** | **LOW** | Missing Security Headers | `next.config.mjs` | **REMEDIATED** |

---

## 4. Deep-Dive Vulnerability Analysis & Root Causes

### Finding VULN-01 & VULN-02 [CRITICAL/HIGH]: IDOR and Arbitrary Profile Overwrite in Profile Routes
- **Vulnerable Code:** `app/api/auth/profile/route.ts`
- **Root Cause:**
  ```typescript
  // PREVIOUS VULNERABLE CODE
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (authUser && authUser.id !== id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  ```
  When an unauthenticated request was sent without session cookies, `authUser` evaluated to `null`. As a consequence, `authUser && authUser.id !== id` evaluated to `false`. The unauthenticated request proceeded directly to `supabaseAdmin.from("profiles").upsert(profilePayload)`, allowing anyone to overwrite any student's name, stream, and target college.
- **Remediation:** Enforced mandatory session verification:
  ```typescript
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }
  if (authUser.id !== id) {
    return NextResponse.json({ error: "Forbidden: Cannot update profile of another user." }, { status: 403 });
  }
  ```
  In `GET /api/auth/profile`, non-owner callers are restricted to public safe display fields (`full_name`, `avatar_url`, `target_stream`, `target_college`, `xp`, `current_streak`), preventing leak of internal metadata.

---

### Finding VULN-05 [CRITICAL]: Pre-Submission Exam Answer Key & Solution Leakage
- **Vulnerable Code:** `app/api/test/[testId]/route.ts`
- **Root Cause:** `POST /api/test/[testId]` accepted `{ action: "reveal" }` with an empty payload and returned the full 50-question array complete with `correctOptionId`, explanations, and multi-level solutions while a candidate was actively taking the exam.
- **Remediation:** Restructured test submission protocol:
  - Client sends `{ action: "submit", questionStates, answersSubmitted: true }`.
  - Server denies any request lacking verified attempt data with HTTP 403 Forbidden.
  - Client state store sanitizes active exam questions (`correctOptionId: ""`, `explanation: ""`, `solution: undefined`).

---

### Finding VULN-06 [HIGH]: Database Tampering & Attempt Record Deletion
- **Vulnerable Code:** `app/api/test/record-attempt/route.ts`
- **Root Cause:**
  ```typescript
  // PREVIOUS VULNERABLE CODE
  const canPersistToDatabase = isSupabaseAuthenticated || uuidRegex.test(targetUserId);
  ```
  Any caller passing an arbitrary victim UUID triggered `uuidRegex.test(targetUserId) === true`, executing `supabaseAdmin.from("user_attempts").delete().eq("user_id", targetUserId)`. An attacker could wipe out any student's test history.
- **Remediation:** Strict authorization gating:
  ```typescript
  const canPersistToDatabase = isSupabaseAuthenticated;
  ```
  Guest users retain calculated analytics in-memory without mutating the database, while authenticated students are strictly bound to `authUser.id`.

---

### Finding VULN-08 [HIGH]: Server Rate Limiting & AI Abuse Prevention
- **Vulnerable Code:** `app/api/ai/*`
- **Root Cause:** Client-side rate checking helper in `dashboardConfig.ts` bypassed checks on the server (`if (typeof window === "undefined") return { allowed: true };`). Several endpoints (`diagnose-mistake`, `subject-radar`, `standing/explain`) lacked any rate check.
- **Remediation:** Built a centralized server rate limiter (`lib/rate-limiter.ts`) featuring:
  - Accurate IP extraction via `getClientIp` across proxies (`x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`).
  - Unified client resolution via `getClientIdentifier(req, authUserId)`.
  - In-memory sliding daily counter with UTC midnight reset and standard `X-RateLimit-*` response headers.
  - Applied across all AI endpoints: `doubt-solver` (40/day), `why-wrong` (40/day), `diagnose` (3-25/day), `diagnose-mistake` (30-60/day), `repair-quiz` (30/day), `standing/explain` (30/day), `subject-radar` (30/day), and `diagnostic-cycle` (30/day).

---

### Finding VULN-09 [MEDIUM]: Cryptographic Timing Attack & RangeError Crash in Payment Verification
- **Vulnerable Code:** `app/api/payments/verify/route.ts`
- **Root Cause:**
  `crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature))` threw an uncaught `RangeError` whenever the input signature was not exactly 64 hex characters, resulting in server 500 errors. Furthermore, `targetUserId` fell back to unauthenticated `body.userId`.
- **Remediation:**
  1. Enforced authenticated user session (`authUser.id`).
  2. Implemented length-guarded constant-time verification:
  ```typescript
  const expectedBuf = Buffer.from(expectedSignature, "utf-8");
  const actualBuf = Buffer.from(razorpay_signature, "utf-8");
  const signaturesMatch =
    expectedBuf.length === actualBuf.length &&
    crypto.timingSafeEqual(expectedBuf, actualBuf);
  ```

---

### Finding VULN-10 [MEDIUM]: Student Internal UUID Exposure on Leaderboard
- **Vulnerable Code:** `app/api/leaderboard/route.ts`
- **Root Cause:** The public leaderboard returned raw PostgreSQL `p.id` UUIDs for all students.
- **Remediation:** For entries where `p.id !== currentUserId`, the user ID is pseudonymized as `student_${p.id.substring(0, 8)}`, preserving frontend React keys while preventing database UUID harvesting.

---

### Finding VULN-11 [MEDIUM]: Insecure Cookie Authentication Bypass in Middleware
- **Vulnerable Code:** `lib/supabase/middleware.ts`
- **Root Cause:** Visiting any practice route set an unauthenticated cookie `cuet_auth=1`, which was subsequently accepted as `isAuthenticated = true` for sensitive dashboard core routes.
- **Remediation:** Authenticated state is now strictly derived from `authUser` (`Boolean(authUser)`). Practice routes permit guest access directly without setting an artificial authentication cookie.

---

### Finding VULN-12 [LOW]: Content Security Policy & Hardening Headers
- **Vulnerable Code:** `next.config.mjs`
- **Remediation:** Added `Content-Security-Policy` and `X-XSS-Protection` headers:
  ```javascript
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.razorpay.com https://generativelanguage.googleapis.com https://api.groq.com; frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com; object-src 'none'; base-uri 'self';"
  }
  ```

---

## 5. Verification & Testing Evidence

Automated security regression tests were executed and validated:
- **Test Command:** `npx tsx --test __tests__/security-hardening.test.ts`
- **Results:**
  - `Server Rate Limiting & Abuse Prevention`: 5/5 PASSED
  - `Cryptographic Timing Safety & Payment Verification`: 2/2 PASSED
  - `Exam Integrity & Answer Key Sanitization`: 1/1 PASSED
  - `Leaderboard Student UUID Privacy Masking`: 1/1 PASSED
  - **Total:** 9 Passed, 0 Failed (Duration: ~54ms)

TypeScript typecheck verification:
- **Command:** `npx tsc --noEmit`
- **Result:** Exit Code 0 (0 errors)

---

## 6. Residual Risk Assessment & Recommendations

1. **Production Secret Management:**
   - Ensure all `.env.local` placeholders (`RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `CRON_SECRET`, `PYQ_ADMIN_TOKEN`) are populated with cryptographically random $\ge 32$-byte strings in the production deployment environment (e.g. Vercel / Railway).
2. **Supabase Row Level Security (RLS):**
   - RLS policies on `public.profiles` and `public.user_attempts` should mirror the server-side access controls (`auth.uid() = id`).
3. **Distributed Rate Limiting (Horizontal Scaling):**
   - For multi-instance container deployments, consider backing `memoryUsageStore` in `lib/rate-limiter.ts` with Upstash Redis / Redis cluster.
