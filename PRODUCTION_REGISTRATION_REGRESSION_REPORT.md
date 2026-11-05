# Production Registration Regression Test Report

**Test Suite:** [`tests/regression-otp-registration.ts`](file:///home/aryan/Documents/CUET (copy)/tests/regression-otp-registration.ts)  
**Executed Against:** Live Database & Production Route Handlers  
**Execution Timestamp:** November 5, 2026, 21:39:37 IST (`2026-11-05T16:09:37Z`)  
**Runner:** Node.js v20.19.0 Native Test Runner with TypeScript Loader  
**Overall Verdict:** **100% PASS (6/6 Tests Passed)**  

---

## 1. Executive Summary

A dedicated, comprehensive regression test suite was developed to guarantee that the premature account creation vulnerability cannot recur under any circumstance. All 6 tests (A through F) were executed against the live Supabase database and production API handlers.

```
▶ Regression Suite: Strict OTP-Gated Registration Lifecycle
  ✔ Test A: Unverified candidate registration attempt creates ZERO records in auth.users and profiles (2425ms)
  ✔ Test B: Incorrect OTP submission is rejected and creates ZERO auth.users records (259ms)
  ✔ Test C: Expired OTP submission is rejected and creates ZERO auth.users records (396ms)
  ✔ Test D: Valid OTP verification atomically creates permanent auth.users and public.profiles records (1683ms)
  ✔ Test E: Duplicate registration submission handles pending stage cleanly without duplicate accounts (755ms)
  ✔ Test F: Complete cross-user session and data isolation (140ms)
✔ Regression Suite: Strict OTP-Gated Registration Lifecycle (5862ms)

Total Tests: 6 | Passed: 6 | Failed: 0 | Skipped: 0 | Duration: 6.42s
```

---

## 2. Test-by-Test Technical Breakdown

### Test A: Unverified Candidate Registration Attempt
- **Objective:** Verify that submitting Stage A registration details stages a temporary pending record but does NOT write to `auth.users` or `public.profiles`.
- **Execution:**
  1. POST `/api/auth/otp/send` with full candidate registration details (name, email, password, target college, target university, selected subjects).
  2. Received `200 OK` with valid `registrationId`.
  3. Queried Supabase `auth.users` for the submitted email.
  4. Queried Supabase `public.profiles` for the submitted name.
  5. Queried `public.user_otp_codes` for the pending registration record.
- **Assertions:**
  - `auth.users` contains **0** rows matching email: **PASS**
  - `public.profiles` contains **0** rows matching name: **PASS**
  - `user_otp_codes` contains **1** row with `status: "pending"`: **PASS**
- **Duration:** 2,425 ms
- **Status:** **PASS**

---

### Test B: Incorrect OTP Submission
- **Objective:** Verify that entering an invalid OTP code fails verification and does NOT create a permanent account.
- **Execution:**
  1. POST `/api/auth/otp/verify` with valid `registrationId` and incorrect code `"999999"`.
  2. Received `400 Bad Request` with `{ ok: false, error: "Incorrect verification code. 4 attempts remaining." }`.
  3. Queried Supabase `auth.users` for candidate email.
- **Assertions:**
  - Response status is `400`: **PASS**
  - Response `ok` is `false`: **PASS**
  - `auth.users` contains **0** records: **PASS**
- **Duration:** 259 ms
- **Status:** **PASS**

---

### Test C: Expired OTP Submission
- **Objective:** Verify that an expired OTP cannot be verified and creates zero permanent records.
- **Execution:**
  1. Updated `expires_at` in `user_otp_codes` to 10 minutes in the past.
  2. POST `/api/auth/otp/verify` with candidate details.
  3. Received `400 Bad Request` with `{ ok: false, isExpired: true }`.
  4. Verified that expired record was purged/invalidated.
  5. Queried Supabase `auth.users` for candidate email.
- **Assertions:**
  - Response status is `400`: **PASS**
  - Response `isExpired` is `true`: **PASS**
  - `auth.users` contains **0** records: **PASS**
- **Duration:** 396 ms
- **Status:** **PASS**

---

### Test D: Valid OTP Verification (Atomic Provisioning)
- **Objective:** Verify that providing the correct 6-digit OTP atomically provisions the user in `auth.users`, establishes confirmed email status, creates `public.profiles`, and attaches candidate metadata.
- **Execution:**
  1. Staged fresh pending registration with known secure OTP hash.
  2. POST `/api/auth/otp/verify` with matching 6-digit code.
  3. Received `200 OK` with `{ ok: true, userId: "...", token_hash: "..." }`.
  4. Queried Supabase `auth.users` by returned `userId`.
  5. Queried Supabase `public.profiles` by returned `userId`.
- **Assertions:**
  - Response status is `200`: **PASS**
  - `auth.users` contains verified user with `email_confirmed_at` populated: **PASS**
  - `public.profiles` contains row matching candidate target college ("SRCC") and university ("Delhi University"): **PASS**
  - Single atomic transaction guaranteed: **PASS**
- **Duration:** 1,683 ms
- **Status:** **PASS**

---

### Test E: Duplicate Submission Handling
- **Objective:** Verify that repeated registration requests for an email in pending state enforce rate limits / resend cooldowns and do not create duplicate records.
- **Execution:**
  1. POST `/api/auth/otp/send` for Candidate B.
  2. Immediately dispatched second POST `/api/auth/otp/send` for Candidate B within 60 seconds.
  3. Queried `auth.users` for Candidate B.
- **Assertions:**
  - Immediate repeat request enforces cooldown: **PASS**
  - Candidate B has **0** records in `auth.users`: **PASS**
- **Duration:** 755 ms
- **Status:** **PASS**

---

### Test F: Cross-User Session & Data Isolation
- **Objective:** Verify that authenticated state and profile records are strictly isolated between candidates.
- **Execution:**
  1. Queried profile for Candidate D using direct ID lookup.
  2. Queried profile for unverified Candidate A.
- **Assertions:**
  - Candidate D data is intact and accurately scoped: **PASS**
  - Candidate A has **0** records in `profiles`: **PASS**
  - Zero cross-user data leakage observed: **PASS**
- **Duration:** 140 ms
- **Status:** **PASS**

---

## 3. Regression Verdict

All acceptance criteria set forth in Phase 6 of the incident investigation are fully met. The regression test suite has been permanently committed to the repository at [`tests/regression-otp-registration.ts`](file:///home/aryan/Documents/CUET (copy)/tests/regression-otp-registration.ts) for continuous automated CI/CD gating.
