# AUDIT COVERAGE & VERIFICATION MATRIX
## Comprehensive Verification Status of All Subsystems, Routes & Data Sources

**Generated:** October 16, 2026  
**Auditor:** Principal Software Architect & QA Lead  
**Scope:** Complete Codebase Inspection & Non-Destructive Validation  

---

### 1. Application Routes & Pages Coverage

| Route Path | Inspection Status | Evidence Source | Remaining Unknowns / Notes |
|---|:---:|---|---|
| `/` | `INSPECTED` | `app/page.tsx`, `components/landing/LandingPageClient.tsx` | None. Landing page renders static stream previews. |
| `/login` | `INSPECTED` | `app/login/page.tsx`, `components/auth/LoginForm.tsx` | Dependent on live Supabase Auth credentials for production login. |
| `/signup` | `INSPECTED` | `app/signup/page.tsx`, `components/auth/SignupForm.tsx` | Auto-provisions profile via Supabase trigger. |
| `/dashboard` | `INSPECTED` | `app/dashboard/page.tsx`, `components/dashboard/prep-pulse/*` | None. Fully driven by `useTestStore` and `diagnostic-status`. |
| `/dashboard/pyqs` | `INSPECTED` | `app/dashboard/pyqs/page.tsx`, `pyq_manifest.json` | None. 251 authentic papers verified. |
| `/dashboard/pyqs/[subject]` | `INSPECTED` | `app/dashboard/pyqs/[subject]/page.tsx` | None. Dynamic subject folder mapping verified. |
| `/dashboard/pyqs/analysis/[attemptId]`| `INSPECTED` | `app/dashboard/pyqs/analysis/[attemptId]/page.tsx` | None. Rehydrates from attempt history. |
| `/dashboard/mocks` | `INSPECTED` | `app/dashboard/mocks/page.tsx`, `lib/data/mock50Questions.ts` | None. Target recommendations filter domain mocks. |
| `/dashboard/mocks/[subject]` | `INSPECTED` | `app/dashboard/mocks/[subject]/page.tsx` | None. 20 full-length mocks per subject. |
| `/dashboard/mocks/analysis/[attemptId]`| `INSPECTED` | `app/dashboard/mocks/analysis/[attemptId]/page.tsx` | None. Mistake detective integrates with attempt ID. |
| `/dashboard/practice` | `INSPECTED` | `app/dashboard/practice/page.tsx`, `practice_test_manifest.json`| None. 22 subjects mapped. |
| `/dashboard/practice/[subject]` | `INSPECTED` | `app/dashboard/practice/[subject]/page.tsx` | None. 20 unit-level tests grid per unit. |
| `/dashboard/standing` | `INSPECTED` | `app/dashboard/standing/page.tsx`, `lib/standing-engine.ts` | None. 14.6MB cutoff data verified. |
| `/dashboard/radar` | `INSPECTED` | `app/dashboard/radar/page.tsx`, `WeaknessRadarClient.tsx` | None. 150-Q calibration gate verified. |
| `/dashboard/sessions` | `INSPECTED` | `app/dashboard/sessions/page.tsx`, `SessionsHistoryClient.tsx`| None. Responsive table/card presentation verified. |
| `/dashboard/leaderboard` | `INSPECTED` | `app/dashboard/leaderboard/page.tsx`, `Leaderboard.tsx` | None. Horizontal overflow fixed; mobile cards verified. |
| `/dashboard/notes` | `INSPECTED` | `app/dashboard/notes/page.tsx`, `NotesHubClient.tsx` | None. NCERT taxonomy mapped across domains. |
| `/dashboard/notes/[subject]` | `INSPECTED` | `app/dashboard/notes/[subject]/page.tsx` | None. Chapter card listing. |
| `/dashboard/notes/[subject]/[slug]` | `INSPECTED` | `app/dashboard/notes/[subject]/[slug]/page.tsx` | None. KaTeX formula rendering verified. |
| `/dashboard/profile` | `INSPECTED` | `app/dashboard/profile/page.tsx`, `ProfileClient.tsx` | None. Readiness meter, goals modal verified. |
| `/dashboard/admin/pyq` | `INSPECTED` | `app/dashboard/admin/pyq/page.tsx` | Admin session required in production. |
| `/test/[testId]` | `INSPECTED` | `app/test/[testId]/page.tsx`, `components/cbt/*` | None. Active exam state, autosave, and timer verified. |

---

### 2. Backend API Handlers Coverage

| API Endpoint | Method | Inspection Status | Evidence Source | Security / Safety |
|---|:---:|:---:|---|---|
| `/api/test/[testId]` | `GET` | `VERIFIED` | `app/api/test/[testId]/route.ts` | Answer keys stripped server-side. |
| `/api/test/[testId]` | `POST` | `VERIFIED` | `app/api/test/[testId]/route.ts` | Solutions revealed only on verified submission. |
| `/api/test/record-attempt` | `POST` | `VERIFIED` | `app/api/test/record-attempt/route.ts` | Validates attempt payload; authenticated check. |
| `/api/ai/diagnose` | `POST` | `VERIFIED` | `app/api/ai/diagnose/route.ts` | Groq LPU with local deterministic fallback. |
| `/api/ai/why-wrong` | `POST` | `VERIFIED` | `app/api/ai/why-wrong/route.ts` | Cache check -> Groq -> local rule engine. |
| `/api/ai/doubt-solver` | `POST` | `VERIFIED` | `app/api/ai/doubt-solver/route.ts` | Groq LPU with local rule fallback. |
| `/api/ai/subject-radar` | `POST` | `VERIFIED` | `app/api/ai/subject-radar/route.ts` | 150-Q gate enforced before execution. |
| `/api/payments/create-order` | `POST` | `VERIFIED` | `app/api/payments/create-order/route.ts`| Requires active user session. |
| `/api/payments/verify` | `POST` | `VERIFIED` | `app/api/payments/verify/route.ts` | HMAC-SHA256 constant-time check. |
| `/api/payments/webhook` | `POST` | `VERIFIED` | `app/api/payments/webhook/route.ts` | Webhook signature check; service role update. |
| `/api/leaderboard` | `GET` | `VERIFIED` | `app/api/leaderboard/route.ts` | Student UUIDs masked. |
| `/api/standing/explain` | `POST` | `VERIFIED` | `app/api/standing/explain/route.ts` | Gemini 2.5 Flash with mathematical fallback. |

---

### 3. Core Engine & Data Coverage

| Subsystem | Inspection Status | Verification Method | Pass Rate |
|---|:---:|---|:---:|
| **Scoring Formula (+5/-1)** | `VERIFIED` | `__tests__/core-helpers.test.ts` | 100% |
| **Admission Engine & Cutoffs** | `VERIFIED` | `__tests__/standing-engine.test.ts` | 47 / 47 PASSED |
| **150-Q Diagnostic Cycles** | `VERIFIED` | `__tests__/diagnostic-cycle.test.ts` | 39 / 39 PASSED |
| **AI Learning Coach V2** | `VERIFIED` | `__tests__/ai-coach-v2.test.ts` | 53 / 53 PASSED |
| **PYQ Provenance Audit** | `VERIFIED` | `__tests__/pyq-provenance.test.ts` | 13 / 13 PASSED |
| **Target Recommendations** | `VERIFIED` | `__tests__/target-recommendations.test.ts` | 18 / 18 PASSED |
| **Storage Persistence Quota** | `VERIFIED` | `__tests__/cbt-storage-quota.test.ts` | 12 / 12 PASSED |
| **Streak Tracker** | `VERIFIED` | `__tests__/streak-tracker.test.ts` | 22 / 22 PASSED |
| **Security Hardening** | `VERIFIED` | `__tests__/security-hardening.test.ts` | 9 / 9 PASSED |
| **Production Build** | `VERIFIED` | `npm run build` | 47 / 47 ROUTES |
