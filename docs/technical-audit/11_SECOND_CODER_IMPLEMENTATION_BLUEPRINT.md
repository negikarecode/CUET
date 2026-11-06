# 11 — SECOND-CODER IMPLEMENTATION BLUEPRINT & HANDOVER
## Master Developer Handover, Critical Code Map & Implementation Roadmap

**Audience:** Senior Full-Stack Engineer / Second Developer onboarding to CUET AI-Prep.  
**Purpose:** Enable an independent engineer to understand, maintain, debug, and extend this codebase without reverse-engineering from scratch.

---

### A. System Overview & User Archetypes

**CUET AI-Prep** is an ed-tech SaaS platform designed for Indian high school students preparing for the Common University Entrance Test for Undergraduate admissions (CUET UG), specifically targeting Delhi University (DU) colleges (SRCC, St. Stephen's, Hindu, LSR, Miranda House, etc.).

#### Primary User Archetypes
1. **The Unregistered Guest Aspirant**: Browses syllabus, takes practice tests or full CBT mocks offline. Telemetry is saved to `localStorage` under `:guest`.
2. **The Registered Free Student**: Signed in via Supabase Auth. Has 1 free full-length mock simulation per day, unlimited unit practice tests, and persistent All-India Leaderboard rank.
3. **The AI Practice Pass Subscriber**: Paid candidate (₹399 / ₹499 tier). Unlocks unlimited full mocks, AI option trap analysis ("Why is this wrong?"), interactive Doubt Solver, and adaptive weak-topic drills.

---

### B. Feature Implementation Status Matrix

| Feature | Status | Primary Implementation File | Verification Mechanism |
|---|:---:|---|---|
| **CBT Examination Engine** | `VERIFIED & PRODUCTION READY` | `lib/store/useCBTStore.ts`, `components/cbt/*` | `__tests__/cbt-storage-quota.test.ts` |
| **Official Scoring Formula (+5/-1)**| `VERIFIED & PRODUCTION READY` | `lib/config/examConfig.ts:calculateExamScore` | `__tests__/core-helpers.test.ts` |
| **Where Do I Stand (Cutoff Predictor)**| `VERIFIED & PRODUCTION READY` | `lib/standing-engine.ts`, `app/dashboard/standing` | `__tests__/standing-engine.test.ts` |
| **150-Q Diagnostic Cycle System** | `VERIFIED & PRODUCTION READY` | `lib/cycle-engine.ts`, `lib/diagnostic-status.ts` | `__tests__/diagnostic-cycle.test.ts` |
| **PYQ Past Paper Archive (251 Papers)**| `VERIFIED & PRODUCTION READY` | `app/dashboard/pyqs/*`, `pyq/` | `__tests__/pyq-provenance.test.ts` |
| **Unit Practice Grids (3,100 Tests)**| `VERIFIED & PRODUCTION READY` | `app/dashboard/practice/*`, `practice/` | `__tests__/routes-smoke.test.ts` |
| **Weakness Report (Topics to Fix)** | `VERIFIED & PRODUCTION READY` | `components/dashboard/WeaknessRadarClient.tsx` | Visual QA & responsive tests |
| **All-India Leaderboard** | `VERIFIED & PRODUCTION READY` | `components/dashboard/Leaderboard.tsx`, `/api/leaderboard` | `__tests__/security-hardening.test.ts` |
| **Razorpay Payments & Webhooks** | `VERIFIED & PRODUCTION READY` | `app/api/payments/*`, `UpgradeButton.tsx` | `__tests__/security-hardening.test.ts` |
| **NCERT Chapter Notes Reader** | `VERIFIED & PRODUCTION READY` | `app/dashboard/notes/*`, `lib/notes/` | Markdown KaTeX renderer |
| **Guest-to-Cloud Auto-Sync** | `PARTIALLY IMPLEMENTED` | `lib/store/useTestStore.ts:loginUser` | Needs bulk guest history sync to DB |
| **Campus Coins Redemption Catalog** | `PLANNED` | `components/profile/ProfileClient.tsx:822` | Coins earned, catalog UI pending |

---

### C. Critical Architecture Code Map

Before touching any code, the second developer **must** read and understand these 8 core files:

1. **`lib/config/examConfig.ts`**: Central authority on marking rules (+5 / -1), question durations (60m / 45m), and test instructions. **Never hardcode scoring in components.**
2. **`lib/store/useCBTStore.ts`**: The active CBT exam state machine. Handles answer recording, question palette navigation, timer countdown, and answer submission.
3. **`lib/store/useTestStore.ts`**: Persistent client store for completed test attempts, XP gamification, and daily practice streaks.
4. **`lib/diagnostic-status.ts`**: The single source of truth for the 150-question diagnostic unlock gate and cycle progression. Drives Dashboard, Radar, and Profile meters.
5. **`lib/cycle-engine.ts`**: Implements chronological window slicing to ensure non-overlapping 150-question cycle snapshots.
6. **`lib/standing-engine.ts`**: Resolves student domain averages against 14.6 MB of Delhi University cutoffs, evaluating required, one-of, and best-of course combinations.
7. **`app/api/test/[testId]/route.ts`**: The exam gatekeeper. Strips answer keys on GET; reveals authentic solutions on verified POST.
8. **`lib/storage/safe-storage.ts`**: The browser storage wrapper protecting against storage quota exhaustion via auto-pruning.

---

### D. Data Contracts & Invariants

#### Contract 1: Test Attempt Persistence Object (`RecordedTestAttempt`)
```typescript
export interface RecordedTestAttempt {
  id: string;                       // Unique attempt ID (UUID)
  userId: string;                   // Student ID
  testId: string;                   // E.g. "physics-mock-1" or "pyq_chemistry_p01"
  testTitle: string;                // Display title
  subject: string;                  // Canonical subject name
  totalQuestions: number;           // 50 or 20
  attemptedCount: number;           // Total answered (non-skipped) questions
  unattemptedCount: number;         // Total skipped questions
  correctCount: number;             // Total +5 answers
  incorrectCount: number;           // Total -1 answers
  totalMarks: number;               // (correctCount * 5) - incorrectCount
  maxMarks: number;                 // totalQuestions * 5
  accuracyPercentage: number;       // round((correct / attempted) * 100)
  timeTakenSeconds: number;         // Elapsed seconds
  timeSinkCount: number;            // Questions where timeSpent > 90s
  submittedAt: string;              // ISO timestamp
  questions: RecordedQuestionAttempt[];
}
```

#### Contract 2: Diagnostic Cycle Progress (`AuthoritativeDiagnosticProgress`)
```typescript
export interface AuthoritativeDiagnosticProgress {
  isUnlocked: boolean;              // totalQualifyingAttempts >= 150
  totalQualifyingAttempts: number;  // Count of unique answered questions
  completedCyclesCount: number;     // floor(total / 150)
  currentCycleNumber: number;       // completedCyclesCount + 1
  currentCycleQuestionCount: number;// total mod 150
  cycleWindowSize: 150;
  questionsToUnlock: number;        // max(0, 150 - total)
  unlockProgressPercentage: number; // min(100, round((total / 150) * 100))
}
```

---

### E. Do-Not-Break Invariants

The next developer **MUST NOT** break or alter these verified invariants:

1. **Do not modify the NTA Scoring Formula**: Never change `correctMarks: 5` or `incorrectMarks: -1`. Unanswered questions must remain 0 marks.
2. **Do not send answer keys in active test GET responses**: Never bypass `sanitizeQuestionForActiveExam` in `app/api/test/[testId]/route.ts`.
3. **Do not compute Diagnostic Cycles without Deduplication**: Always pass attempts through `deduplicateTestAttempts()` before counting questions.
4. **Do not fabricate college cutoffs**: All cutoff predictions in Where Do I Stand must resolve from `normalized_cutoffs.json`. If a subject has no attempts, display `Incomplete Data`; do not guess student marks.
5. **Do not exceed localStorage quota**: Never store full uncompacted question banks in browser `localStorage`. Always use `safeStorage` and `compactTestAttemptForPersistence()`.

---

### F. Dependency-Aware Implementation Roadmap

#### Phase 1: Security & Environment Hardening (Immediate Priority)
- **Objective**: Prevent RLS silent failures in production.
- **Files to Change**: `lib/supabase/admin.ts`.
- **Action**: Add explicit check: if `process.env.NODE_ENV === "production"` and `SUPABASE_SERVICE_ROLE_KEY` is missing or placeholder, throw a descriptive startup exception.
- **Test**: `npx tsx __tests__/security-hardening.test.ts`.

#### Phase 2: Guest-to-Authenticated History Sync
- **Objective**: Preserve guest student progress upon registration.
- **Files to Change**: `lib/store/useTestStore.ts:loginUser`.
- **Action**: Read guest attempts from `safeStorage`, update `userId` to the newly authenticated UUID, and invoke `POST /api/test/record-attempt`.
- **Test**: `__tests__/site-wide-storage-persistence.test.ts`.

#### Phase 3: Campus Coins Digital Redemption Catalog
- **Objective**: Provide utility for accumulated coins.
- **Files to Change**: `components/profile/ProfileClient.tsx`, new route `/dashboard/rewards`.
- **Action**: Build rewards catalog allowing students to redeem 200 coins for exclusive mock test PDFs or formula revision sheets.

---

### G. Recommended First Task for the Second Developer

**TASK**: **Implement Fail-Closed Validation for `SUPABASE_SERVICE_ROLE_KEY` in `lib/supabase/admin.ts`**.

**Why this comes first**:
1. It is a discrete, low-risk, high-impact security fix.
2. It eliminates the risk of silent payment webhook failures where a student's card is charged but their account is not upgraded in Supabase due to anonymous RLS policy rejection.
3. It takes less than 15 minutes to implement and verify.

**Files**:
- Modify: `lib/supabase/admin.ts:8-23`
- Verify with: `npm run typecheck && npm run test:smoke`
