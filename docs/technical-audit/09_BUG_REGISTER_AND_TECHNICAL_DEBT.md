# 09 — BUG REGISTER & TECHNICAL DEBT
## Prioritized, Actionable Issues & Technical Debt Register

---

### Priority Definitions
- **P0**: Critical security vulnerability, data loss risk, or core exam engine broken.
- **P1**: Major functional defect, scoring mismatch, or persistence regression.
- **P2**: Analytics discrepancy, reliability risk, or important maintenance debt.
- **P3**: Minor visual polish, usability improvement, or non-blocking cleanup.

---

### 1. Active Issue Register

#### `CUET-P1-001`: Supabase Service Role Key Fallback to Anonymous Key
- **Priority**: P1
- **Confidence**: `VERIFIED`
- **Category**: Security / Persistence
- **Affected Routes**: `/api/payments/webhook`, `/api/admin/pyq`
- **Files & Functions**: `lib/supabase/admin.ts:createAdminClient()` (Lines 13–15)
- **Evidence**:
  ```typescript
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  ```
- **Expected Behavior**: If `SUPABASE_SERVICE_ROLE_KEY` is missing in production, the application should throw a fatal configuration error rather than silently degrading.
- **Actual Behavior**: The admin client initializes with the anon public key. When webhook handlers execute `.update()` on `public.profiles`, Supabase RLS rejects the update because anon clients cannot update other users' subscription rows, resulting in silent subscription activation failures.
- **User Impact**: A student pays via Razorpay, but their account remains on the "Free Plan" because the background database update was rejected by RLS.
- **Root Cause**: Permissive fallback to `NEXT_PUBLIC_SUPABASE_ANON_KEY` to allow local dev without `.env.local` service key.
- **Proposed Fix**: Check `process.env.NODE_ENV === "production"`. If production and service key is missing, throw `Error("FATAL: SUPABASE_SERVICE_ROLE_KEY is required in production")`.
- **Dependencies**: Vercel Environment Variables.
- **Regression Risk**: Low.
- **Verification Test**: Safe static inspection.

---

#### `CUET-P2-001`: Test Fixture Duplicate Suppression in `diagnostic-unlock-state.test.ts`
- **Priority**: P2
- **Confidence**: `VERIFIED`
- **Category**: Testing / Test Fixture Maintenance
- **Affected Files**: `__tests__/diagnostic-unlock-state.test.ts:210-217`
- **Evidence**: Test 8 creates 4 test attempts with identical `title: "Test Attempt"`, `subject: "Physics"`, `score: 250`, and identical `submittedAt` timestamps within the same minute. `deduplicateTestAttempts()` in `lib/analytics.ts:358-365` identifies tests 2 and 3 as spam duplicates, reducing the qualifying count from 205 to 105 and failing the test assertion.
- **Expected Behavior**: Test fixture should assign distinct `submittedAt` timestamps or test titles to simulate 4 distinct tests.
- **Actual Behavior**: Production deduplication logic correctly protects against spam, but the test assertion assumes all 4 identical fixtures survive.
- **User Impact**: Zero user impact (production engine is functioning correctly). Prevents automated CI test from passing cleanly.
- **Proposed Fix**: In `__tests__/diagnostic-unlock-state.test.ts`, offset the `submittedAt` timestamps for each mock attempt by 10 minutes (e.g., `new Date(Date.now() - idx * 600000).toISOString()`).
- **Regression Risk**: Zero (test fixture only).
- **Verification Test**: Run `npx tsx __tests__/diagnostic-unlock-state.test.ts`.

---

#### `CUET-P2-002`: Guest-to-Authenticated Session Migration Gap
- **Priority**: P2
- **Confidence**: `VERIFIED`
- **Category**: Persistence / Onboarding
- **Affected Routes**: `/signup`, `/login`, `/dashboard`
- **Files & Functions**: `lib/store/useTestStore.ts:loginUser()`
- **Evidence**: Guest users can complete multiple mock tests stored in `localStorage` under `cuet_ai_prep_session_storage:guest`. When they sign up, their active user ID switches to a UUID. `recoverUnrecordedCBTSessions()` imports unsubmitted CBT sessions, but historical completed attempts stored under `:guest` are not automatically bulk-migrated to Supabase `user_attempts`.
- **Expected Behavior**: On first sign-up, the client should query guest attempts and push them to the new user's Supabase account.
- **Actual Behavior**: Guest attempts stay in local client state, but do not sync to the cloud database until a subsequent test is completed.
- **User Impact**: If a user signs up on mobile after practicing as guest on desktop, their guest attempts are not reflected on mobile.
- **Proposed Fix**: In `loginUser()`, check if `cuet_ai_prep_session_storage:guest` contains attempts; if so, re-parent their `userId` to the new user ID and trigger an asynchronous cloud sync.
- **Regression Risk**: Low.
- **Verification Test**: Guest practice -> Signup -> Inspect `user_attempts` table.

---

#### `CUET-P3-001`: Campus Coins Missing Redemption Catalog
- **Priority**: P3
- **Confidence**: `VERIFIED`
- **Category**: Gamification / UX
- **Affected Routes**: `/dashboard/profile`
- **Files**: `components/profile/ProfileClient.tsx:822`
- **Evidence**: `profiles` schema has a `campus_coins` column, and users earn coins on mock completion. However, the redemption catalog is not yet built, so the coins widget was commented out in `ProfileClient.tsx`.
- **User Impact**: Minor; coins accumulate in database but have no active store to spend them.
- **Proposed Fix**: Implement a digital rewards catalog (e.g., unlock exclusive mock papers or printable cheat sheets for 200 coins).
- **Regression Risk**: Low.
