# 04 — DATA MODEL, SCHEMAS & PERSISTENCE AUDIT
## Database Architecture, Client-Side Stores & Persistence Boundaries

---

### 1. Database Entity-Relationship Diagram (PostgreSQL)

```mermaid
erDiagram
    PROFILES ||--o{ USER_ATTEMPTS : owns
    PROFILES ||--o{ USER_TROPHIES : unlocks
    PROFILES ||--o{ SUNDAY_MENTOR_REPORTS : receives
    TESTS ||--o{ TEST_QUESTIONS : contains
    TESTS ||--o{ USER_ATTEMPTS : evaluated_in
    QUESTIONS ||--o{ TEST_QUESTIONS : referenced_by
    QUESTIONS ||--o{ USER_ATTEMPTS : answered_in
    QUESTIONS ||--o{ AI_DIAGNOSIS_CACHE : diagnosed_in
    TROPHIES ||--o{ USER_TROPHIES : awarded_in

    PROFILES {
        uuid id PK "references auth.users(id)"
        text full_name
        text target_stream "Science | Commerce | Humanities"
        text target_university
        text target_college
        integer xp ">= 0"
        integer campus_coins ">= 0"
        integer current_streak ">= 0"
        boolean is_premium
        text subscription_tier "free | ai_pass_399 | ai_practice_pass"
        timestamptz subscription_expires_at
        text[] selected_subjects
        timestamptz created_at
        timestamptz updated_at
    }

    QUESTIONS {
        uuid id PK
        text subject
        text chapter
        text micro_topic
        text ncert_reference
        text archetype "Direct Fact | Assertion-Reasoning | Match | Case | Numerical"
        text question_text
        text option_a
        text option_b
        text option_c
        text option_d
        char correct_option "A | B | C | D"
        text explanation
        boolean is_pyq
        integer pyq_year
        timestamptz created_at
    }

    TESTS {
        uuid id PK
        text title
        text subject
        integer total_questions "default 50"
        integer duration_minutes "default 60"
        boolean is_active
        timestamptz created_at
    }

    TEST_QUESTIONS {
        uuid test_id PK, FK
        uuid question_id PK, FK
        integer order_index "unique per test"
    }

    USER_ATTEMPTS {
        uuid id PK
        uuid user_id FK
        uuid test_id FK
        uuid question_id FK
        char selected_option "A | B | C | D | NULL"
        boolean is_correct
        integer time_spent_seconds ">= 0"
        boolean is_time_sink "generated: time > 90s"
        jsonb diagnostic_report
        timestamptz created_at
    }

    AI_DIAGNOSIS_CACHE {
        uuid id PK
        text cache_key UK "hash(q_id + selected_opt)"
        uuid question_id FK
        char selected_option
        text error_classification
        text diagnosis_message
        text ncert_correction
        integer hit_count
        timestamptz created_at
    }
```

---

### 2. Client-Side Browser Storage (`localStorage`) Schema

Due to the 5MB browser storage ceiling, all client-side data is managed through `safeStorage` (`lib/storage/safe-storage.ts`).

| Storage Key | Managed By | Max Payload Size | Eviction Policy | Purpose |
|---|---|---|---|---|
| `cuet_ai_prep_session_storage:<uid>` | `useTestStore` | ~45 KB | Bounded to 15 recent attempts | Stores user stats, active streak, 150-Q cycle counts, and deduplicated test summaries. |
| `cbt_active_session:<testId>:<uid>` | `useCBTStore` | < 6 KB | Cleared upon test submission | High-frequency autosave storing visited questions, selected options, and timer deadline. |
| `cuet_active_uid` | Auth hook | ~36 B | Retained until logout | Pointer indicating the currently active authenticated or guest user ID. |
| `cuet_leaderboard_anonymous` | Profile UI | ~5 B | Retained | Privacy toggle (`"true"` / `"false"`) determining name visibility on the leaderboard. |
| `cuet_ui_lang` | Language context | ~5 B | Retained | Selected UI interface language (`"en"` / `"hi"`). |
| `cuet_push_reminder_time` | Profile UI | ~5 B | Retained | Daily revision reminder time (e.g. `"20:00"`). |

---

### 3. Source of Truth Matrix

| Entity | Primary Source of Truth | Secondary / Cache | Reconciliation Behavior |
|---|---|---|---|
| **Active Exam Answers & Timer** | `useCBTStore` memory | `localStorage` (`cbt_active_session:*`) | On reload, memory rehydrates from `localStorage`. On submit, persisted to `useTestStore` and Supabase. |
| **Historical Test Attempts** | `useTestStore` (`testAttempts`) | Supabase (`public.user_attempts`) | Merged and deduplicated via `deduplicateTestAttempts()` using composite hash (`testId + timestamp + marks`). |
| **Target College & Course** | `useTarget()` hook | `useTestStore.user` & Supabase `profiles` | Single source of truth driven by `useTarget()`; propagates to Profile, Standing, and Dashboard. |
| **Diagnostic Cycles (150-Q)** | `lib/diagnostic-status.ts` | Computed on-the-fly from qualifying Qs | Fully derived from deduplicated answered attempts; completed cycles = `floor(total / 150)`. |
| **DU Admission Cutoffs** | `lib/data/standing/normalized_cutoffs.json` | None (Read-only static 14.6MB) | Authoritative historical benchmarks; zero synthetic cutoffs. |
| **Question Bank Content** | Local JSON files in `/mock`, `/pyq`, `/practice` | Supabase `public.questions` | File system is the canonical repository build source; Supabase questions table provides DB querying. |
| **Subscription Status** | Supabase `public.profiles.is_premium` | `useTestStore.user.isPremium` | Set by Razorpay webhook using `supabaseAdmin`; checked server-side before paid actions. |

---

### 4. Persistence Risks and Safeguards

1. **`[SAFEGUARD / VERIFIED]` Storage Quota Protection (`QuotaExceededError`)**:
   - `safeStorage.setItem()` catches storage quota exceptions. If storage is full, it automatically purges disposable items (cached token logs, expired sessions) and compacts attempt payloads to <6KB before falling back to in-memory storage.
2. **`[SAFEGUARD / VERIFIED]` Cross-User Data Partitioning**:
   - All session keys are scoped with the user ID (`...:<uid>`). Logging in as a different user immediately switches the active pointer (`cuet_active_uid`), completely preventing student data cross-talk.
3. **`[RISK / LOW]` Private Browsing Storage Limitations**:
   - In Safari Private Browsing or strict incognito modes where `localStorage` is disabled or throws on write, `safeStorage` transparently uses an in-memory Map. Sessions persist throughout the tab lifecycle but do not survive tab closures.
