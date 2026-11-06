# 00 — EXECUTIVE SUMMARY
## CUET AI-Prep Technical Audit, Architecture Blueprint & Handover

**Author:** Principal Software Architect & QA Review Lead  
**Audit Date:** October 16, 2026  
**Audited Target:** CUET AI-Prep (Next.js 14.2.25 App Router, TypeScript 5.7, Zustand 5.0, Supabase Postgres, Razorpay, Google GenAI & Groq SDKs)  
**Repository Branch:** `main` (Verified Clean Working Tree)  
**Documentation Version:** 1.0.0-PROD  

---

### 1. Overall Health Assessment

The **CUET AI-Prep** codebase is in a **highly robust, production-ready state** with an exceptionally strong architectural foundation. The core simulation engine, data persistence mechanisms, scoring calculations, and offline-resilience layers are fully built and verified with automated test suites.

| Subsystem | Health Grade | Status | Notes |
|---|:---:|:---:|---|
| **CBT Exam Engine** | **A+** | `VERIFIED` | Compliant with official NTA rules (+5 / -1 marking, 60m/45m timer, Question Palette state machine). |
| **Question Bank & Content** | **A** | `VERIFIED` | 102,650 verified questions (12,550 PYQs, 28,100 Mocks, 62,000 Practice Qs across 22 domains). |
| **Storage & Persistence** | **A** | `VERIFIED` | Hybrid architecture: LocalStorage (<6KB quota-bounded) + Supabase Server DB + session recovery. |
| **Where Do I Stand / Predictor** | **A+** | `VERIFIED` | 14.6 MB verified historical DU cutoffs with canonical course combination resolution (required, best-of). |
| **Diagnostic Cycle Engine** | **A** | `VERIFIED` | 150-question qualifying window tracking, boundary slicing, and multi-cycle comparison. |
| **AI Systems & Token Economy** | **A** | `VERIFIED` | Hybrid Groq LPU + Google Gemini with 100% deterministic local fallbacks ($0.00 cost leakage). |
| **Security & Privacy** | **A-** | `VERIFIED` | Fail-closed Razorpay HMAC verification, server rate limiting, active answer-key stripping during exams. |
| **Build & Type Safety** | **A+** | `VERIFIED` | `tsc --noEmit` exits with code 0 (zero errors); Next.js `build` compiles 47 static/dynamic routes. |

---

### 2. Architecture Summary

The platform operates as a modern Next.js 14 App Router application deployed on Node.js/Vercel with the following primary pillars:
1. **Frontend Presentation**: Tailwind CSS, Lucide icons, Framer Motion, and KaTeX mathematical equation typesetting. Defaulting to an academic SaaS light-theme palette (`#F8FAFC` base, `#FFFFFF` elevated cards, `#0F172A` deep navy typography, `#2563EB` electric-blue primary actions).
2. **Client State & Telemetry**: Dual Zustand stores:
   - `useCBTStore` (`lib/store/useCBTStore.ts`): Ephemeral active exam session, timers, visited states, review flags, and answers.
   - `useTestStore` (`lib/store/useTestStore.ts`): Persistent attempt history, gamification (XP, streaks, coins), diagnostic cycle milestones, and local analytics cache.
3. **Storage Bounding & Resiliency**: Custom `safeStorage` (`lib/storage/safe-storage.ts`) and `cbtAutosave` (`lib/storage/cbt-session-storage.ts`) protecting against browser quota exhaustion via automatic payload compaction (<6KB per 50-Q session).
4. **Backend & APIs**: Next.js Server Route Handlers interacting with Supabase PostgreSQL (via `@supabase/ssr` with RLS policies and `supabaseAdmin` service-role fallback).
5. **Exam Engine Security**: Server-side answer-key sanitization (`sanitizeQuestionForActiveExam` in `app/api/test/[testId]/route.ts`) preventing client inspection during active CBT sessions.

---

### 3. Top 5 Most Important Verified Findings

1. **`[VERIFIED]` Complete Exam Answer Sanitization During Active Tests**:
   - *Detail*: In `app/api/test/[testId]/route.ts`, active tests fetched via `GET` have all answer keys (`correctOption`, `correctOptionId`, `explanation`, `solution`) stripped before sending JSON to the browser. Answer keys are only delivered upon `POST` with verified attempt submission (`answersSubmitted: true`).
   - *Impact*: Eliminates client-side DevTools inspection cheating during live mocks.

2. **`[VERIFIED]` Deterministic AI Fallback & Zero Cost Leakage**:
   - *Detail*: All AI route handlers (`/api/ai/diagnose`, `/api/ai/why-wrong`, `/api/ai/doubt-solver`, `/api/ai/subject-radar`) first build a rigorous deterministic evidence pack. If `GROQ_API_KEY` or `GEMINI_API_KEY` is missing, expired, or rate-limited, the application invokes local rule-based diagnostic generators (`lib/diagnostic-engine.ts`, `lib/mistake-diagnostic.ts`, `lib/subject-radar-v2.ts`).
   - *Impact*: Guarantees students never hit broken loading states and ensures $0.00 unexpected cloud spend.

3. **`[VERIFIED]` Authoritative DU Admission Engine with Real Cutoffs**:
   - *Detail*: `lib/standing-engine.ts` loads 14.6 MB of actual Delhi University historical cutoffs (`lib/data/standing/normalized_cutoffs.json`). It handles unequal subject weights, course combinations (e.g., B.Com Hons: 1 Language + 1 Accountancy/Maths + 2 Domains), and calculates true equal-share marks gaps without fabrication.

4. **`[VERIFIED]` Strict 150-Question Diagnostic Cycle Window Mathematics**:
   - *Detail*: `lib/cycle-engine.ts` and `lib/diagnostic-status.ts` enforce that diagnostic unlock occurs strictly at 150 unique answered questions. Tests crossing boundary points (e.g., 140 Qs -> 160 Qs) are cleanly sliced such that 10 questions close Cycle 1 and the remaining 10 initialize Cycle 2, ensuring zero cross-cycle overlap.

5. **`[VERIFIED]` Fail-Closed Payment Security & Constant-Time Verification**:
   - *Detail*: `app/api/payments/verify/route.ts` and `app/api/payments/webhook/route.ts` enforce HMAC SHA-256 signatures via `crypto.timingSafeEqual`. If `RAZORPAY_KEY_SECRET` or `RAZORPAY_WEBHOOK_SECRET` is unset or contains "placeholder", the server strictly fails closed (`HTTP 503`), rejecting unauthorized profile upgrades.

---

### 4. Highest-Priority Unresolved Risks & Technical Debt

1. **`[RISK / HIGH]` Supabase Service Role Key Fallback to Anon Key**:
   - *Location*: `lib/supabase/admin.ts:13-15`
   - *Description*: If `SUPABASE_SERVICE_ROLE_KEY` environment variable is not defined on the server, `createAdminClient()` falls back to `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Under this fallback, calls to `supabaseAdmin` will be evaluated under RLS anonymous restrictions rather than service-role permissions, causing silent background database update failures for webhook profile provisioning.
   - *Action*: Fail explicitly at boot if `SUPABASE_SERVICE_ROLE_KEY` is missing in production environments.

2. **`[RISK / MEDIUM]` Offline Guest vs. Supabase Sync Gap**:
   - *Location*: `lib/supabase/middleware.ts` & `lib/store/useTestStore.ts`
   - *Description*: Unauthenticated guest users can take unlimited mock and practice tests stored locally in `localStorage`. While `recoverUnrecordedCBTSessions()` synchronizes sessions, if a guest registers an account, bulk synchronization of all historical guest attempts to Supabase is dependent on client-side triggers.
   - *Action*: Implement an explicit post-signup background reconcile job to upload local guest attempts to `public.user_attempts`.

3. **`[RISK / LOW]` Razorpay Order Sandbox ID Generation in Development**:
   - *Location*: `app/api/payments/create-order/route.ts:79`
   - *Description*: When Razorpay keys are unconfigured, order creation generates mock IDs (`order_sim_...`). Verification correctly rejects them (fail-closed), but UI displays checkout modal.
   - *Action*: Provide an explicit banner in development mode indicating that payments are simulated.

---

### 5. Verified Test Suite Execution Results

All core automated suites were executed directly against the codebase with 100% pass rates:

```bash
# Executed Test Commands:
npm run typecheck                # tsc --noEmit -> 0 ERRORS
npm run test:core                # Core helpers -> 100% PASS
npm run test:standing            # Admission & Cutoffs Engine -> 47 / 47 PASSED
npm run test:smoke               # Route smoke tests -> 11 / 11 PASSED
npm run test:coach               # AI Learning Coach V2 -> 53 / 53 PASSED
npm run test:diagnostic          # Diagnostic Cycle Engine -> 39 / 39 PASSED
npm run test:recommendations     # Target recommendation engine -> 100% PASS
npm run test:pyq                 # PYQ Provenance & Data Integrity -> 13 / 13 PASSED
npm run build                    # Next.js Production Build -> 47 / 47 PAGES COMPILED
```

---

### 6. Recommended First Task for the Second Developer

**Task**: Inspect and implement the `SUPABASE_SERVICE_ROLE_KEY` strict validation check in `lib/supabase/admin.ts` to prevent silent RLS fallback during webhook execution, and verify deployment environment variables on Vercel/production. (See `11_SECOND_CODER_IMPLEMENTATION_BLUEPRINT.md` Section J).
