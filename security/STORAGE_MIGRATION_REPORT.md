# CUET AI-Prep Storage Migration & Persistence Architecture Report

**Date**: 2026-10-13  
**Status**: ACTIVE & MIGRATED  
**Engine**: `SafeStorageEngine` (`lib/storage/safe-storage.ts`)  

---

## 1. Safe Persistence Architecture

To guarantee that the application never encounters an unhandled `QuotaExceededError` or crashes during authentication, practice, or exam taking, all client-side storage operations are centralized under a unified, multi-tiered persistence layer.

### 1.1 Multi-Tier Storage Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Features                     │
│    (Auth Modals, CBT Engine, Gamification, Dashboard, etc.) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                safeStorage.setItem(key, value)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Tier 1: LocalStorage (Cross-tab, long-lived storage)        │
│ ├─ Succeeded: Return immediately                            │
│ └─ QuotaExceededError: Trigger proactive pruning of         │
│    disposable keys (token logs, old rate limits, completed  │
│    CBT exams) and retry write.                              │
└──────────────────────────────┬──────────────────────────────┘
                               │ (If still full / denied)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Tier 2: SessionStorage (Tab-isolated, dedicated 5MB)        │
│ ├─ Survives in-tab page reloads and back/forward navigation │
│ └─ Guarantees active candidate exam continuity              │
└──────────────────────────────┬──────────────────────────────┘
                               │ (If disabled / private mode)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Tier 3: In-Memory Map (Synchronous, zero-latency)           │
│ ├─ Guaranteed 100% safe execution                           │
│ └─ Zero uncaught exceptions thrown into React UI            │
└─────────────────────────────────────────────────────────────┘
                               ▲ (Disaster Recovery)
┌──────────────────────────────┴──────────────────────────────┐
│ Tier 4: IndexedDB (cuet_cbt_db / exam_sessions)             │
│ ├─ Asynchronous transaction-safe structured store           │
│ └─ Handles large datasets with >50MB browser capacity        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Proactive Eviction & Pruning Algorithm

When a write operation encounters storage congestion, `SafeStorage` executes a deterministic, multi-stage pruning routine (`pruneDisposableStorage(protectedKey)`):

1. **Stage 1 — Purge Obsolete Stores**:
   - Removes legacy un-scoped `cuet_ai_prep_session_storage` blobs (often 3–5 MB).
   - Removes transient debug logs and cache keys (`temp_*`, `*_cache_*`, `debug_*`).
2. **Stage 2 — Purge Non-Essential Telemetry**:
   - Evicts client AI token logs (`cuet_ai_token_logs`).
   - Evicts stale practice rate limits from previous dates (`cuet_rate_limit:*` where date $\ne$ today).
3. **Stage 3 — Clean Submitted CBT Scorecards**:
   - Identifies completed exams (`isSubmitted: true`) and evicts their local keys.
   - **Strict Protection**: In-progress exams (`isSubmitted: false`) and `cuet_active_uid` are **strictly protected** and never deleted.
4. **Stage 4 — Critical Key Guarantee**:
   - If the write is for a `CRITICAL` key (such as `cuet_active_uid`), `SafeStorage` evicts the single largest non-critical entry to ensure the tiny 30-byte pointer write succeeds immediately.

---

## 3. Legacy Data Preservation & Safe Migration

Existing users with historical exam attempts, answers, flags, and diagnostic cycles are preserved without disruption:

### 3.1 Transparent CBT Session Migration
- When `loadCBTSessionSync(testId)` loads a session, it inspects whether the session contains legacy bloated question arrays (`parsed.questions: [...]`).
- If detected, it extracts the candidate's answers and flags (`sanitizedStates`), deletes the bloated question bank payload, and re-persists the compact version ($<3$ KB) back into storage.
- The exam questions are dynamically and authoritatively re-hydrated from `getQuestionsForTest(testId)` using question ID mapping, ensuring zero question shifting.

### 3.2 Legacy Global Store (`useTestStore`) Migration
- Legacy un-scoped store (`cuet_ai_prep_session_storage`) is checked against the active user ID.
- If the owner matches `cuet_active_uid`, it is migrated to `cuet_ai_prep_session_storage:{userId}`, compacted, and the un-scoped legacy key is deleted to free up 3–5 MB.
- Corrupted JSON entries are dropped gracefully without crashing store initialization.

---

## 4. Codebase Files Modified

1. **[`lib/storage/safe-storage.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/storage/safe-storage.ts)** *(New)*:
   - Centralized safe storage engine with multi-tier fallback, priority classification, and proactive quota pruning.
2. **[`lib/store/useTestStore.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/store/useTestStore.ts)**:
   - Wrapped `loginUser` to safely persist `cuet_active_uid` via `safeStorage`.
   - Integrated `safeStorage` into Zustand `createJSONStorage` adapter.
   - Stripped full question banks from persisted `diagnosticCycles` and bounded attempt telemetry.
3. **[`lib/storage/cbt-session-storage.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/storage/cbt-session-storage.ts)**:
   - Integrated with `safeStorage` for all session reads, writes, and removals.
   - Preserved submitted scorecard views across reloads.
4. **[`lib/gamification.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/gamification.ts)**:
   - Wrapped practice streak and trophy persistence in `safeStorage`.
5. **[`lib/ai/token-logger.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/ai/token-logger.ts)**:
   - Replaced unbounded 500-log storage with bounded 20-log client storage via `safeStorage`.
6. **[`lib/config/dashboardConfig.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/config/dashboardConfig.ts)**:
   - Bound daily rate-limiting storage to `safeStorage` with automated daily expiration.
7. **[`lib/i18n/languages.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/i18n/languages.ts)**:
   - Safely persisted language preferences using `safeStorage`.
8. **[`lib/push-notifications.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/push-notifications.ts)**:
   - Safely persisted push reminder preferences using `safeStorage`.
9. **[`lib/spaced-repetition.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/spaced-repetition.ts)**:
   - Bound spaced repetition offline items to 30 items max and persisted using `safeStorage`.
10. **[`lib/repair-plan.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/repair-plan.ts)**:
    - Updated topic repair event caching to use `safeStorage`.
11. **[`components/cbt/CBTErrorBoundary.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/cbt/CBTErrorBoundary.tsx)**:
    - Added proactive quota pruning and safe reload handling to break infinite crash loops.
12. **[`components/profile/ProfileClient.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/profile/ProfileClient.tsx)**:
    - Replaced blunt `sessionStorage.clear()` with selective `safeStorage.clearUserScopedData(userId)`.
13. **[`components/dashboard/prep-pulse/ScheduleMockTest.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/dashboard/prep-pulse/ScheduleMockTest.tsx)**:
    - Bound scheduled mock lists to $\le 10$ items and persisted using `safeStorage`.
14. **[`components/dashboard/DashboardClient.tsx`](file:///home/aryan/Documents/CUET%20(copy)/components/dashboard/DashboardClient.tsx)**:
    - Added `safeStorage.initStartupCleanup()` on mount to proactively clean client caches.
