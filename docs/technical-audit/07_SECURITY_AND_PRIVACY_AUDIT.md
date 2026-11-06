# 07 — SECURITY, PRIVACY & ACCESS CONTROL AUDIT
## Vulnerability Review, Cryptographic Verification & Access Controls

---

### 1. Security Architecture & Threat Model

The application enforces a multi-layered security posture:
1. **Perimeter & Headers**: Next.js configuration (`next.config.mjs`) injects strict security headers across all routes:
   - `X-Frame-Options: SAMEORIGIN` (prevents clickjacking).
   - `X-Content-Type-Options: nosniff` (prevents MIME sniffing).
   - `Referrer-Policy: strict-origin-when-cross-origin`.
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` (HSTS).
   - Strict `Content-Security-Policy` permitting only authorized Razorpay, Supabase, and Google Fonts endpoints.
2. **Exam Integrity (CBT)**: Active test fetching (`GET /api/test/[testId]`) server-side sanitizes all question objects via `sanitizeQuestionForActiveExam`. Answers are never delivered to the client during active test-taking.
3. **Cryptographic Signatures**: Razorpay order verifications and webhooks use constant-time HMAC SHA-256 signature verification via `crypto.timingSafeEqual`.
4. **Rate Limiting**: Server endpoints enforce sliding-window IP/user rate limiting (`lib/rate-limiter.ts`).

---

### 2. Prioritized Security Findings Register

| ID | Title | Severity | Evidence | Impact | Remediation | Verification |
|---|---|:---:|---|---|---|---|
| **SEC-001** | `SUPABASE_SERVICE_ROLE_KEY` fallback to anonymous key | **MEDIUM** | `lib/supabase/admin.ts:13-15`: `serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY \|\| process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY \|\| ""` | If the service role key is omitted in production environment variables, `supabaseAdmin` calls run under anonymous RLS rules, failing background webhook updates. | Throw an explicit error on server boot if `SUPABASE_SERVICE_ROLE_KEY` is undefined in production. | Safe static inspection |
| **SEC-002** | CBT Question Sanitization | **RESOLVED / PASS** | `app/api/test/[testId]/route.ts:14` strips `correctOption`, `explanation`, and `solution` from active GET responses. | Prevents students from opening Chrome DevTools or inspecting network packets to cheat on CBT exams. | Maintain existing server-side sanitization. | `__tests__/security-hardening.test.ts` |
| **SEC-003** | Constant-Time HMAC Signature Check | **RESOLVED / PASS** | `app/api/payments/verify/route.ts:80-83` and `app/api/payments/webhook/route.ts:34-37` use `crypto.timingSafeEqual` with buffer length validation. | Eliminates timing side-channel attacks against payment signature verification. | Maintain existing implementation. | `__tests__/security-hardening.test.ts` |
| **SEC-004** | Fail-Closed Payment Verification | **RESOLVED / PASS** | `app/api/payments/verify/route.ts:50-59`: returns `HTTP 503` if secret contains "placeholder" or is empty. | Prevents granting free premium access if webhook or gateway credentials are unconfigured. | Maintain fail-closed policy. | `__tests__/security-hardening.test.ts` |
| **SEC-005** | Leaderboard Candidate UUID Masking | **RESOLVED / PASS** | `app/api/leaderboard/route.ts` masks foreign user IDs while preserving current candidate identity. | Prevents enumeration and harvesting of internal candidate database UUIDs. | Maintain masking helper. | `__tests__/security-hardening.test.ts` |

---

### 3. Row-Level Security (RLS) Policy Summary

Verified in `supabase/schema.sql`:
- **`public.profiles`**: Public read access to basic profile fields (name, stream, XP); write operations strictly restricted to the authenticated row owner (`auth.uid() = id`).
- **`public.user_attempts`**: Strictly user-private (`auth.uid() = user_id`). Users can only query, insert, or update their own attempt records.
- **`public.questions` & `public.tests`**: Read-only for `anon` and `authenticated`; write access restricted strictly to `service_role`.
- **`public.ai_diagnosis_cache`**: Public read for cached option diagnostics; insert restricted to `authenticated` and `service_role`.
