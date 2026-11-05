# CUET AI-Prep — Forensic Authentication, OTP Security & Data Isolation Audit

**Date:** 2026-11-05  
**Auditor:** Senior Backend Security Engineer & Database Architect  
**Project:** CUET AI-Prep (Production: https://cuetmate.vercel.app/)  
**Environment:** Next.js 14.2 App Router, Supabase PostgreSQL, Brevo Transactional Email Engine, Zustand  

---

## 1. Executive Summary

A comprehensive forensic audit of the authentication lifecycle, registration workflows, transactional OTP pipelines, database schemas, and frontend session management was conducted across the CUET AI-Prep codebase.

The audit identified two critical systemic architectural defects:
1. **Premature Permanent Account Creation:** Candidate accounts are written directly to the permanent `auth.users` database catalog by client-side execution before email ownership is proven through OTP verification. If Brevo fails, or if the candidate abandons registration, an unverified account remains in the database permanently, causing subsequent registrations to fail and leaving the account in limbo.
2. **Cross-User Data Leakage & Incomplete Logout Cleanup:** Client-side caching and state persistence mechanisms (`useTestStore`, `safeStorage`, `localStorage`, `sessionStorage`, `IndexedDB`, and un-scoped query loops) retain candidate telemetry across account switches. Logging out does not purge tab-isolated `sessionStorage`, `IndexedDB` (`cuet_cbt_db`), or un-scoped keys (e.g. `notes_bookmarked_*`, `cuet_cbt_session_*`), allowing a subsequent login on the same browser to briefly or persistently expose the previous candidate's test attempts, standing analytics, and progress.

Production data has **NOT** been modified during this forensic audit.

---

## 2. Existing System Architecture

### 2.1 Technology Stack & Providers
- **Framework:** Next.js 14.2.35 (React 18.3, App Router, SSR Server Components, Route Handlers).
- **Authentication Provider:** Supabase Auth (PostgreSQL managed auth service via `@supabase/ssr` and `@supabase/supabase-js`).
- **Transactional Email Provider:** Brevo (formerly Sendinblue) REST API v3 (`https://api.brevo.com/v3/smtp/email`).
- **Database:** Supabase PostgreSQL with Row Level Security (RLS) policies.
- **Client State Management:** Zustand stores (`useTestStore`, `useCBTStore`), React Hooks (`useTarget`, `useEntitlement`), and custom storage abstraction (`safeStorage`).
- **Session Persistence:** Dual-tier token strategy:
  - HTTP-only cookie synchronization via `@supabase/ssr` (`sb-<project-ref>-auth-token`).
  - Client-side storage mirroring in `localStorage` (`cuet_ai_prep_session_storage`, `cuet_active_uid`).

### 2.2 Existing Flow Map

```
[Candidate Browser]
   │
   ├─► Step 1 (Sign Up Form): Submits name, email, password, dream college, stream, subjects
   │
   ├─► Flawed Action: Browser calls supabase.auth.signUp() directly!
   │      │
   │      ▼
   │   [Supabase auth.users & public.profiles]  <-- ACCOUNT CREATED PREMATURELY (UNVERIFIED)
   │
   ├─► Step 2: Browser calls POST /api/auth/otp/send { email, type: 'signup' }
   │      │
   │      ▼
   │   [Brevo API v3] -- Dispatches 6-digit numeric OTP to candidate inbox
   │   [public.user_otp_codes] -- Records HMAC-SHA256 hash of OTP
   │
   ├─► Step 3: Candidate inputs OTP in OtpVerificationView
   │      │
   │      ▼
   │   POST /api/auth/otp/verify { email, code, type: 'signup' }
   │      │
   │      ├─► Validates hash against public.user_otp_codes
   │      ├─► Calls supabaseAdmin.auth.admin.updateUserById(id, { email_confirm: true })
   │      └─► Generates Supabase magiclink token_hash and sends back to browser in JSON
   │
   └─► Step 4: Browser calls supabase.auth.verifyOtp({ token_hash })
          │
          └─► Synchronizes session cookies via POST /api/auth/session
```

---

## 3. Vulnerability Inventory & Root Cause Analysis

### Vulnerability 1: Premature Account Creation (Severity: Critical — Release Blocker)
- **File:** `components/auth/AuthPageContent.tsx` (Lines 430–485)
- **Root Cause:** When a user completes the signup form, `components/auth/AuthPageContent.tsx` executes:
  ```typescript
  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: { data: { ... } }
  });
  ```
  This immediately inserts a record into `auth.users` and invokes PostgreSQL triggers that populate `public.profiles`. Only *after* this database write succeeds does the frontend request an OTP from `/api/auth/otp/send`.
- **Impact:**
  - Candidates exist in `auth.users` before verifying email ownership.
  - If the Brevo delivery fails, times out, or is blocked by an IP policy, the permanent user account already exists.
  - If the candidate abandons the page, the unverified account prevents subsequent registration attempts with "An account with this email already exists."
  - Direct database or API requests can potentially interact with unverified user profiles.

### Vulnerability 2: Client-Side Session Token Exposure via Magic Link (Severity: High)
- **File:** `app/api/auth/otp/verify/route.ts` (Lines 73–84)
- **Root Cause:** Upon verifying the OTP hash, the backend calls `supabaseAdmin.auth.admin.generateLink({ type: "magiclink", email })` and returns `token_hash` directly in the HTTP JSON response body.
- **Impact:**
  - Session establishment relies on the frontend client receiving a sensitive token hash and then executing `supabase.auth.verifyOtp({ token_hash })`.
  - Exposing the magic link token hash across the wire creates an unnecessary attack vector and couples authentication completion to client script execution.

### Vulnerability 3: Cross-User Data Leakage & Incomplete Storage Purge (Severity: Critical — Release Blocker)
- **Files:**
  - `lib/store/useTestStore.ts` (Lines 392–423, 907–943)
  - `components/dashboard/DashboardNavbar.tsx` (Lines 53–63)
  - `components/dashboard/DashboardSidebar.tsx` (Lines 68–78)
  - `components/dashboard/DashboardClient.tsx` (Lines 85–135)
  - `app/dashboard/pyqs/page.tsx` (Lines 291–319)
  - `components/notes/NoteReader.tsx` (Lines 63–103)
- **Root Causes:**
  1. **Un-scoped LocalStorage Scans:** In `app/dashboard/pyqs/page.tsx`, the code iterates across `window.localStorage` searching for any key starting with `cuet_cbt_session_` without verifying that the key belongs to the currently authenticated user (`cuet_cbt_session_${activeUid}_*`). An active or paused exam from User A is immediately displayed in User B's dashboard.
  2. **Incomplete Logout Cleanup:** The `logout()` function in `useTestStore.ts` deletes only `cuet_active_uid` and generic `cuet_*` keys from `localStorage`. It completely ignores:
     - `sessionStorage` (which retains the active CBT exam session and temporary metrics).
     - `IndexedDB` (`cuet_cbt_db`), which stores full question responses and exam state.
     - `useCBTStore` in-memory state (retains completed test scores, answers, and questions).
     - Notes bookmarks and revisions (`notes_bookmarked_*`, `notes_revised_*`).
  3. **Hydration Race Condition in DashboardClient:** When User B logs in, `DashboardClient` reads `useTestStore.getState().testAttempts` during the initial client-side render before the `useEffect` hook receives `initialData.serverAttempts`. If User A's data was stored in `useTestStore`, User B's browser renders User A's scores, streak, and recent evaluations before (or instead of) clearing them.
  4. **Missing clearUserScopedData invocation:** Neither `DashboardNavbar.tsx` nor `DashboardSidebar.tsx` calls `safeStorage.clearUserScopedData()`.

### Vulnerability 4: Lack of Cryptographic Registration Transaction IDs & Temporary Storage (Severity: High)
- **Files:** `lib/auth/otp-service.ts`, `app/api/auth/otp/send/route.ts`
- **Root Cause:** Registration attempts are identified solely by `email`. There is no unique, cryptographically generated `registration_id` (transaction ID) to bind the submitted profile data to the exact OTP issued.
- **Impact:**
  - Parallel registration attempts or rapid re-submissions can collide.
  - The system has nowhere to safely store candidate details (stream, subjects, targets, and encrypted credential) during the pending verification window without writing to `auth.users`.

### Vulnerability 5: Missing Per-Hour Resend Rate Limiting & Overextended OTP Expiry (Severity: Medium)
- **File:** `lib/auth/otp-service.ts` (Lines 28–32)
- **Root Cause:**
  - `OTP_EXPIRY_MS` is set to 10 minutes (600,000 ms) instead of the recommended maximum of 5 minutes (300,000 ms).
  - While a 60-second cooldown is enforced, there is no hourly cap (maximum 5 resends per hour per email/IP).

### Vulnerability 6: Incomplete Candidate Data Cleanup Scope (Severity: High)
- **Files:** `supabase/delete_all_users_and_data.sql`, `scripts/wipe-user-data.ts`
- **Root Cause:** The existing cleanup scripts delete from `profiles`, `user_attempts`, and `auth.users`, but miss:
  - `public.user_usage_ledger`
  - `public.ai_diagnosis_cache`
  - `public.user_trophies`
  - `public.user_test_xp_awards`
  - `public.user_otp_codes`
  - Orphaned `payment_orders` and `payment_transactions`

---

## 4. Database Inventory & Dependencies

### 4.1 Production Database Verification
A live read-only inspection was executed using `createAdminClient()`. The current database contains:
- **`auth.users`:** 4 candidate accounts.
- **`public.profiles`:** 4 candidate profile records.
- **`public.user_otp_codes`:** 3 OTP verification records.
- **`public.tests`:** 940 tests (**STATIC CUET QUESTION REPOSITORY — PROTECTED**).
- **`public.questions`:** 23,536 questions (**STATIC CUET QUESTION REPOSITORY — PROTECTED**).
- **`public.user_attempts`:** 0 rows.
- **`public.user_usage_ledger`:** 0 rows.
- **`public.progress_cards`:** 0 rows.
- **`public.ai_reports`:** 0 rows.
- **`public.sunday_mentor_reports`:** 0 rows.
- **`public.payment_orders`:** 0 rows.
- **`public.payment_transactions`:** 0 rows.

### 4.2 Candidate-Related vs. Static Protected Tables

| Table Name | Category | Action During Data Reset |
| :--- | :--- | :--- |
| `auth.users` | Candidate Auth Accounts | **PURGE** (Candidate accounts only) |
| `public.profiles` | Candidate Profile Data | **PURGE** |
| `public.user_otp_codes` | OTP Logs & Security | **PURGE** |
| `public.pending_registrations` | Temporary Pending Registrations | **NEW TABLE / PURGE** |
| `public.user_attempts` | Candidate Test Responses | **PURGE** |
| `public.user_usage_ledger` | Session Completion Audit | **PURGE** |
| `public.progress_cards` | Candidate Shareable Cards | **PURGE** |
| `public.ai_reports` | Candidate Diagnostic Reports | **PURGE** |
| `public.ai_usage` | Candidate AI Token Limits | **PURGE** |
| `public.sunday_mentor_reports`| Candidate Weekly Mentorship | **PURGE** |
| `public.payment_orders` | Candidate Orders | **PURGE** |
| `public.payment_transactions` | Candidate Transactions | **PURGE** |
| `public.promotional_slots` | Entitlement Slots | **RESET** (Release user claims) |
| `public.user_trophies` | Candidate Gamification | **PURGE** |
| `public.user_test_xp_awards` | Candidate Gamification | **PURGE** |
| **`public.tests`** | **Official CUET Test Registry** | **STRICTLY PRESERVE (940 rows)** |
| **`public.questions`** | **Official CUET Question Bank** | **STRICTLY PRESERVE (23,536 rows)** |
| **`public.test_questions`** | **Test-Question Map** | **STRICTLY PRESERVE** |
| **`public.trophies`** | **Master Trophy Definitions** | **STRICTLY PRESERVE** |

---

## 5. Remediation Architecture & Implementation Plan

### 5.1 Strict Two-Stage Registration Lifecycle

```
[Candidate Submits Registration]
         │
         ▼
[POST /api/auth/register/pending]
  1. Validate email, name, password complexity, stream, subjects.
  2. Verify that no verified account exists in auth.users.
  3. Generate registration_id (UUIDv4) and 6-digit numeric OTP.
  4. Encrypt candidate password using AES-256-GCM with server secret.
  5. Hash OTP using HMAC-SHA256 with OTP_SECRET.
  6. Store in pending_registrations:
     - registration_id (UUID)
     - email_normalized
     - encrypted_payload (password, full_name, target_stream, target_college, etc.)
     - otp_hash
     - expires_at (NOW() + 5 minutes)
     - attempts_remaining (5)
     - resend_count (0)
  7. Dispatch OTP via Brevo API v3.
  8. If Brevo fails: Roll back pending record and fail closed.
  9. Return { ok: true, registrationId: registration_id }.
  ==> ZERO permanent account or profile created at this stage.

[Candidate Submits OTP]
         │
         ▼
[POST /api/auth/register/verify]
  1. Fetch pending_registrations record by registration_id and email.
  2. Validate expiration (expires_at > NOW()).
  3. Verify attempts_remaining > 0.
  4. Compare submitted OTP against otp_hash using timing-safe comparison.
  5. Decrement attempts_remaining on failure.
  6. On successful match:
     a. Atomically consume pending registration (status = 'verified').
     b. Create permanent Supabase account using supabaseAdmin.auth.admin.createUser({
          email,
          password: decryptedPassword,
          email_confirm: true,
          user_metadata: { ... }
        }).
     c. Create public.profiles record with verified profile details.
     d. Generate secure authenticated session tokens.
     e. Set HttpOnly SSR cookies on response.
     f. Return authenticated candidate details.
```

### 5.2 OTP Hardening Controls
1. **Configurable Expiry:** 5 minutes (300 seconds).
2. **Brute-Force Lockout:** Maximum 5 incorrect attempts before permanent invalidation of that registration transaction.
3. **Resend Cooldown:** 60-second cooldown between resend requests.
4. **Hourly Rate Limit:** Maximum 5 resends per hour per email/IP.
5. **Single-Use Enforcement:** The OTP is consumed and deleted/marked verified immediately upon first successful check.
6. **No Plaintext Logging:** Plaintext OTPs are never logged, stored, or returned in responses.

### 5.3 Complete User Data Isolation & Cache Cleansing
1. **Universal Logout Protocol:**
   - Server-side session invalidation via `supabase.auth.signOut()`.
   - Complete purging of all `localStorage` and `sessionStorage` keys prefixed with `cuet_`, `cbt_`, `notes_`, `streak_`, `last_practice_`.
   - Deletion of IndexedDB `cuet_cbt_db` records.
   - Complete reset of Zustand `useTestStore` and `useCBTStore` to initial empty state.
   - Invalidation of server-side in-memory caches in `lib/ai-cache.ts`.
2. **Deterministic Cache Scoping:**
   - CBT storage keys strictly formatted as `cuet_cbt_session_${userId}_${testId}`.
   - Note bookmarks formatted as `notes_bookmarked_${userId}_${noteId}`.
   - PYQ in-progress detector in `app/dashboard/pyqs/page.tsx` strictly queries only keys containing the current user's ID.
3. **Database Ownership Enforcement:**
   - Reject any API query where `user_id` does not match `authUser.id` obtained from server-side session.

---

## 6. Files Requiring Modifications

| File | Proposed Modifications |
| :--- | :--- |
| `supabase/migrations/20261105_pending_registrations.sql` | New migration creating `pending_registrations` table with RLS and auto-cleanup. |
| `lib/auth/pending-registration-service.ts` | Server-side cryptographic registration lifecycle, password encryption/decryption, OTP hashing, and rate limiting. |
| `app/api/auth/otp/send/route.ts` | Refactor to support pending registration creation and passwordless login OTPs with strict 5-min expiry and rate limits. |
| `app/api/auth/otp/verify/route.ts` | Refactor to verify pending registration, atomically create Supabase user upon OTP success, and establish SSR cookies. |
| `components/auth/AuthPageContent.tsx` | Eliminate premature `supabase.auth.signUp()`. Call pending registration API, pass `registrationId` to OTP view. |
| `components/auth/OtpVerificationView.tsx` | Pass `registrationId` to verification route, handle session initialization via server response cookies. |
| `lib/store/useTestStore.ts` | Harden `logout()` to purge `sessionStorage`, clear all user-scoped caches, and prevent cross-user attempt bleeding. |
| `lib/store/useCBTStore.ts` | Add store reset method and export `resetCBTStore()`. |
| `lib/storage/cbt-session-storage.ts` | Add `clearAllCBTStorageForUser()` and IndexedDB purge routines. |
| `components/dashboard/DashboardNavbar.tsx` | Implement comprehensive logout handler calling store resets and storage purges. |
| `components/dashboard/DashboardSidebar.tsx` | Implement comprehensive logout handler. |
| `components/Navbar.tsx` | Align logout handler with global storage cleanup. |
| `app/dashboard/pyqs/page.tsx` | Scope in-progress session lookup to current user ID. |
| `components/notes/NoteReader.tsx` | Scope bookmarks and revisions to authenticated `userId`. |
| `scripts/reset-candidate-database.ts` | Safe, transaction-verified candidate reset script preserving 940 tests and 23,536 questions. |

---

## 7. Migration & Backup Strategy

1. **Backup Verification:**
   - Full dump/export of `public.profiles`, `public.user_otp_codes`, and `auth.users` before executing any reset.
2. **Schema Migration:**
   - Create `public.pending_registrations` table. If running via PostgREST/service role without DDL permissions, implement the pending registration state engine utilizing an isolated, securely encrypted record in `public.user_otp_codes` (with JSONB `metadata` holding AES-256-GCM encrypted candidate payload) or via Supabase migration.
3. **Destructive Cleanup Gate:**
   - A detailed deletion inventory will be presented with exact record counts. No data deletion will occur without explicit confirmation.

---

## 8. Conclusion

The root causes of premature user creation and cross-user data leakage have been definitively traced to client-side `signUp()` execution and incomplete frontend storage purging. The proposed architecture permanently eliminates both issues through a two-stage registration lifecycle and deterministic user-scoped cache isolation.
