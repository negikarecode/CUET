# Production Authentication & Data Isolation Incident Baseline Report

**Incident Identification:** `INC-20261105-AUTH-ISOLATION-BASELINE`  
**Target Environment:** Production (`https://cuetmate.vercel.app/`)  
**Repository Branch:** `main`  
**Current Git Commit:** `1420dfd67bcb9dc875549c5146b1ab0fcd8e4aed`  
**Deployed Production Commit:** `1420dfd6` (Vercel deployment: `bom1::c8b45-1793901972733-623c463f3cc1`)  
**Supabase Database:** `djqgpcbjcszczcfrirri.supabase.co` (PostgreSQL)  
**Date of Baseline:** November 5, 2026  
**Status:** ESTABLISHED & SECURED (Zero Destructive Operations Performed)

---

## 1. Baseline Summary

Prior to making any code modifications or testing actions, a full forensic inspection of the repository, deployed production artifacts, and live Supabase PostgreSQL database was conducted. All candidate accounts, OTP tokens, profiles, and historical records have been preserved and backed up to an immutable snapshot.

### Protected Static Assets Verified:
- **`public.questions`**: **23,536 questions** intact (Curated CUET domain, general, and language questions with LaTeX explanations and options).
- **`public.tests`**: **940 tests** intact (Full syllabus CBT mocks, chapter practice drills, and past year papers).

### Live Candidate Catalog Verified:
- **`auth.users`**: **1 account** (`ac88156f-c265-47df-89b9-815d163a6341` — `aryannegiofficial@gmail.com`, verified and active).
- **`public.profiles`**: **1 row** matching `ac88156f-c265-47df-89b9-815d163a6341`.
- **`public.user_otp_codes`**: **2 rows** (pending/expired stage A test registrations from prior test runs).
- **`public.user_attempts`**: **0 rows**.
- **`public.user_usage_ledger`**: **0 rows**.
- **`public.progress_cards`**: **0 rows**.
- **`public.ai_reports`**: **0 rows**.
- **`public.sunday_mentor_reports`**: **0 rows**.
- **`public.payment_orders`**: **0 rows**.
- **`public.payment_transactions`**: **0 rows**.
- **`public.promotional_slots`**: **0 rows**.

---

## 2. Authentication History & Commit Audit

The git commit log reveals the progression of recent authentication remediation efforts:

| Commit Hash | Commit Message | Scope of Changes | Observed Incident Relevance |
| :--- | :--- | :--- | :--- |
| `1420dfd6` | `fix(security): eliminate premature client signup in OnboardingModal and enforce strict two-stage OTP registration` | Refactored `OnboardingModal.tsx` to remove `supabase.auth.signUp()`, added `tests/regression-otp-registration.ts`. | Addressed premature signup in modal, but legacy fallback data in dashboard components remained unresolved. |
| `5cc9b95e` | `docs: update DATABASE_CLEANUP_REPORT with execution confirmation and verified post-reset counts` | Updated audit documentation for database reset. | Confirmed clean slate post-reset. |
| `4d462865` | `fix(brevo): defensively validate and auto-recover swapped or invalid sender email env vars` | Added fallback handling for Brevo sender configuration. | Ensured Brevo transactional email stability. |
| `4211f4b7` | `fix(auth): implement strict OTP-gated registration, persistent DB storage, and multi-user data isolation` | Introduced `pending-registration-service.ts`, AES-256-GCM encryption, HMAC-SHA256 OTP hashing, and DB storage in `user_otp_codes`. | Laid groundwork for serverless OTP registration. |
| `501f5944` | `feat(landing): complete layout overhaul, design tokens, accessibility, and conversion components` | UI changes across landing page and marketing components. | Introduced modal registration entry points. |

---

## 3. Environment & Service Connectivity Verification

| Service | Environment Variable | Status | Verification Note |
| :--- | :--- | :--- | :--- |
| **Supabase URL** | `NEXT_PUBLIC_SUPABASE_URL` | Configured | `https://djqgpcbjcszczcfrirri.supabase.co` |
| **Supabase Anon Key** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Configured | Valid JWT anon client token |
| **Supabase Service Key**| `SUPABASE_SERVICE_ROLE_KEY` | Configured | Admin privileges verified |
| **Brevo API** | `BREVO_API_KEY` | Configured | Transactional email provider |
| **Brevo Sender Email** | `BREVO_SENDER_EMAIL` | Configured | `teamcuetmate@gmail.com` |
| **Brevo Sender Name** | `BREVO_SENDER_NAME` | Configured | `CUET AI-Prep Team` |
| **OTP Secret** | `OTP_SECRET` | Configured | Salt used for HMAC-SHA256 OTP hashing & AES-256-GCM encryption |
| **Groq / Gemini AI** | `GROQ_API_KEY`, `GEMINI_API_KEY` | Configured | AI diagnostic engines |
| **Razorpay** | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Configured | Payment processing |

---

## 4. Immutable Backup Verification

A pre-incident baseline backup was programmatically captured and verified:
- **Archive Path:** [`backups/incident_baseline_backup_20261105.json`](file:///home/aryan/Documents/CUET (copy)/backups/incident_baseline_backup_20261105.json)
- **Captured At:** `2026-11-05T18:06:45.321Z`
- **Integrity Status:** Valid JSON, non-destructive export.
- **Account Preservation Guarantee:** All existing records (`ac88156f-c265-47df-89b9-815d163a6341`, profiles, OTP codes) remain intact. No accounts or rows were deleted or altered.

---

## 5. Architectural Findings: The Two Incident Roots

### Root Cause 1: Email Availability Classification Defect
In `/api/auth/check-email`:
1. It queried `public.students` (a view joining `public.profiles` and `auth.users`). If any unconfirmed or stale row matched, it returned `exists: true`.
2. More critically, in `supabaseAdmin.auth.admin.listUsers()`, it checked `page: 1` through `5` with `perPage: 500`. However, in `/api/auth/otp/send`, it checked only `page: 1` with `perPage: 50`!
3. If a candidate had an expired pending registration record in `user_otp_codes` from an abandoned registration, there was no structured state differentiation between:
   - A. Verified existing account (`auth.users` with `email_confirmed_at != null` AND profile).
   - B. Pending registration without permanent account (`user_otp_codes` with active OTP).
   - C. Expired pending registration (`user_otp_codes` with `expires_at < now`).
   - D. Failed or abandoned registration.
   - E. Completely new email.
4. Crucially, any legacy entry point or unhandled signup route that invoked client-side signup created an unverified user in `auth.users`, which subsequently caused `/api/auth/check-email` and `/api/auth/otp/send` to block registration with "An account with this email already exists".

### Root Cause 2: Hardcoded UI Fallback Metrics ("Demo" Mock Data)
The reported historical dashboard data:
- Latest mock score: **-2/250**
- Recent accuracy: **22%**
- Questions attempted: **200**
- Mock attempts: **4**
- Test Title: **"Physics Full Mock 50"**
- Performance analytics plot: **Mock 1 (-8), Mock 2 (46), Mock 3 (28), Mock 4 (-2)**
- Topics to fix: **Electrostatic Potential (0%), Electromagnetic Waves (0%), Alternating Current (9%)**
- Recent evaluations table: **4 default sessions matching design.pdf Page 1**

**Definitive Evidence:**
These values were NOT retrieved from the database from another candidate! The database has **0 rows** in `user_attempts`. Instead, the dashboard components ([`TopMetricsRow.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/dashboard/prep-pulse/TopMetricsRow.tsx), [`RecentEvaluationsTable.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/dashboard/prep-pulse/RecentEvaluationsTable.tsx), [`CombinedPerformanceCard.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/dashboard/prep-pulse/CombinedPerformanceCard.tsx), and [`StrengthsWeaknesses.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/dashboard/prep-pulse/StrengthsWeaknesses.tsx)) contained hardcoded `defaultSessions`, `defaultChartData`, `defaultItems`, and fallback metrics designed to match the visual mockups from `design.pdf Page 1` when `attempts.length === 0`!

Consequently, whenever a genuinely new user registered, their 0-attempt clean slate caused every one of these components to fall back to the hardcoded "demo" numbers, making it appear that a prior account's data was leaking!

---

## 6. Action Plan for Phase 1 through Phase 8

1. **Phase 1 & 2:** Standardize the single authoritative registration pipeline:
   - Make `/api/auth/check-email` authoritative, checking verified `auth.users` accounts only.
   - Provide explicit email classification (Verified, Pending, Expired, Completely New).
   - Allow expired or pending registrations to be safely restarted.
   - Audit all entry points to guarantee zero client-side `auth.signUp` calls remain.
   - Enforce cryptographic OTP storage in `user_otp_codes` and atomic account creation in `/api/auth/otp/verify`.
2. **Phase 3 & 4:** Eliminate all hardcoded demo fallback data across all dashboard components:
   - Implement elegant, clean empty states for new candidates with 0 attempts.
   - Enforce server-side user ID verification across all queries (`user_id = authenticated_user_id`).
   - Clean client store and cache across user lifecycles.
3. **Phase 5 & 6:** Comprehensive multi-user isolation and OTP regression matrix testing against live production.
4. **Phase 7 & 8:** Build, typecheck, deploy to Vercel, verify on live URL, and publish final forensic signoff reports.
