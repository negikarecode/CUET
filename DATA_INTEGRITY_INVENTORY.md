# DATA INTEGRITY INVENTORY — CUET AI-PREP PLATFORM

**Audit Date**: October 2026  
**Status**: Comprehensive Baseline & Verification Complete  
**Scope**: All Frontend Routes, Backend API Endpoints, Database Entities, State Stores, and Source Files

---

## 1. Executive Summary

This inventory establishes a complete data lineage and provenance mapping for every data point displayed across the CUET AI-Prep platform. All displayed data is classified under one of four provenance categories:
1. **Authoritative Primary Data**: Official National Testing Agency (NTA) CUET UG syllabi, verified past year question (PYQ) archives, and official university admission cutoffs.
2. **Authoritative User Data**: Real student attempts, question responses, timestamps, bookmarks, targets, and diagnostic logs recorded in Supabase / LocalStorage.
3. **Derived Analytical Data**: Computed percentiles, readiness indices, weakness scores, radar metrics, projected cutoffs, and session scores calculated via deterministic server-side algorithms.
4. **Fallback & Mock Reference Data**: Strictly bounded offline fallback constants clearly labeled and separated from live transactional databases.

---

## 2. Frontend Routes & Pages Inventory

| Route | Primary Component | Data Sources | Provenance Classification | Lineage & Transformation Pipeline |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Static marketing copy, feature list, syllabus preview | Authoritative Primary + Static | Static layout rendered via Next.js App Router |
| `/dashboard` | `app/dashboard/page.tsx` | Supabase `profiles`, `user_targets`, `mock_attempts`, `practice_sessions` | Authoritative User + Derived | Fetches user targets and recent test attempts via `createClient()`; computes readiness index and weak areas via `lib/command-center.ts` |
| `/practice` | `app/practice/page.tsx` | `lib/data/practice_test_manifest.json`, `lib/data/pyq_chapters.json` | Authoritative Primary | Chapter lists and unit manifests loaded statically; session progress tracked via `usePracticeStore` |
| `/practice/[id]` | `app/practice/[id]/page.tsx` | Practice question repository, `practice_sessions` | Authoritative Primary + User | Loads sanitized questions without answer keys; captures user selections in real time |
| `/mock` | `app/mock/page.tsx` | Mock test manifest, syllabus structure | Authoritative Primary + User | Displays available full-length mocks and student previous attempt history |
| `/mock/[id]` | `app/mock/[id]/page.tsx` | Mock question sets (`mock/**`), `mock_attempts` | Authoritative Primary + User | Server-side rendered; loads questions without client-side solutions; enforces NTA CBT UI rules |
| `/pyq` | `app/pyq/page.tsx` | `pyq/**` canonical test archives | Authoritative Primary | Standardized official PYQ papers with metadata (shift, year, subject) |
| `/pyq/[id]` | `app/pyq/[id]/page.tsx` | PYQ question bank, `question_attempts` | Authoritative Primary + User | Standard CBT simulator mode with timing and section navigation |
| `/where-i-stand` | `app/where-i-stand/page.tsx` | `lib/data/standing/**`, `data/cutoff/**` | Authoritative Primary + Derived | Computes relative percentile rank across stream, category, and target university program |
| `/target-college` | `app/target-college/page.tsx` | `data/cuet.json`, `data/cutoff/**` | Authoritative Primary | Searchable database of 90+ universities, 500+ programs, and multi-year cutoff trends |
| `/analytics` | `app/analytics/page.tsx` | `mock_attempts`, `practice_sessions`, `lib/subject-radar-v2.ts` | Derived Analytical | Aggregates user attempts into Knowledge, Performance, and Interpretation dimensions |
| `/ai-coach` | `app/ai-coach/page.tsx` | `lib/repair-plan-v2.ts`, `lib/command-center.ts` | Derived Analytical | Generates student performance command center, 10-category mistake diagnostics, and micro-repair plans |

---

## 3. Backend API Endpoints & Server Handlers

| Endpoint | Method | Purpose | Input Source | Authorization Check | Data Integrity Guard |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/student/attempts` | `GET`, `POST` | Retrieve and record student test attempts | Request Body / Supabase Auth | `supabase.auth.getUser()` (Enforced) | Validates payload against Zod schema; derives user ID strictly from JWT session |
| `/api/profile/update` | `POST` | Update student profile, stream, category | Request Body / Supabase Auth | `supabase.auth.getUser()` (Enforced) | Prevents user ID spoofing; rejects invalid category/stream values |
| `/api/test/record-attempt` | `POST` | Authoritative submission of full-length test | Questions, Answers, Time Taken | `supabase.auth.getUser()` (Enforced) | Server recalculates score using `+5 / -1` formula; discards client-submitted score |
| `/api/ai/diagnose-mistake` | `POST` | Diagnose root cause of student mistake | Question, User Answer, Correct Answer, Time | Public / Authenticated | Deterministic 10-category Mistake Detective engine; $0.00 external LLM cost |
| `/api/cron/sunday-ritual` | `POST` | Generate weekly revision digests and score reset | Scheduled Webhook | `crypto.timingSafeEqual` (Enforced) | Validates `Authorization: Bearer <CRON_SECRET>` with constant-time equality |
| `/api/admin/pyq` | `POST`, `PUT` | Admin ingestion and updates of PYQ datasets | Multipart Form Data / JSON | `crypto.timingSafeEqual` (Enforced) | Validates `x-admin-token` with `PYQ_ADMIN_TOKEN` secret |

---

## 4. Database Entities & Schemas

### 4.1. Core PostgreSQL / Supabase Tables
1. **`profiles`**:
   - `id`: UUID (Primary Key, Foreign Key -> `auth.users.id`).
   - `full_name`: Text.
   - `category`: Text (`UR`, `OBC-NCL`, `SC`, `ST`, `EWS`, `PwD`).
   - `stream`: Text (`Science`, `Commerce`, `Humanities`, `General`).
   - `created_at`: Timestamp with timezone.
   - `updated_at`: Timestamp with timezone.
   - *Integrity Rule*: Row-Level Security (RLS) ensures users can only read and update their own profile (`auth.uid() = id`).

2. **`user_targets`**:
   - `id`: UUID (Primary Key).
   - `user_id`: UUID (Foreign Key -> `profiles.id`).
   - `target_college_id`: Text.
   - `target_program_id`: Text.
   - `target_score`: Integer.
   - *Integrity Rule*: Unique constraint on `(user_id, target_program_id)`. RLS scoped to `auth.uid() = user_id`.

3. **`mock_attempts`**:
   - `id`: UUID (Primary Key).
   - `user_id`: UUID (Foreign Key -> `profiles.id`).
   - `test_id`: Text.
   - `subject`: Text.
   - `score`: Integer (Computed server-side).
   - `total_marks`: Integer (e.g. 200 or 250).
   - `accuracy`: Float.
   - `time_spent_seconds`: Integer.
   - `answers`: JSONB (Array of `{ questionId, selectedOption, correctOption, isCorrect, timeSpent }`).
   - *Integrity Rule*: `score` is strictly computed server-side: `(correct_count * 5) - (incorrect_count * 1)`.

4. **`practice_sessions`**:
   - `id`: UUID (Primary Key).
   - `user_id`: UUID (Foreign Key -> `profiles.id`).
   - `chapter_id`: Text.
   - `subject`: Text.
   - `total_questions`: Integer.
   - `correct_answers`: Integer.
   - `completed_at`: Timestamp with timezone.

5. **`user_repair_plans`**:
   - `id`: UUID (Primary Key).
   - `user_id`: UUID (Foreign Key -> `profiles.id`).
   - `weak_area_id`: Text.
   - `status`: Text (`NOT_STARTED`, `CONCEPT_REVIEWED`, `DRILL_COMPLETED`, `RETEST_COMPLETED`, `RECOVERED`).
   - `priority_score`: Float.
   - `last_attempted_at`: Timestamp with timezone.

---

## 5. Fallback, Constant, and Mock Reference Data Audit

| File / Location | Data Represented | Active in Production? | Replacement / Guard Strategy |
| :--- | :--- | :--- | :--- |
| `data/cuet.json` | Comprehensive university, program, eligibility database | Yes (Authoritative Canonical) | Statically verified against official DU/BHU/JNU 2024-2026 admissions bulletins |
| `data/cutoff/**` | Historical cutoff marks by category & round | Yes (Authoritative Reference) | Extracted from official university seat allotment lists |
| `lib/data/official_cuet_ug_syllabus.json` | Canonical NTA CUET UG syllabus units & chapters | Yes (Authoritative Syllabus) | Generated from official NTA PDF syllabi via deterministic extractors |
| `lib/data/standing/**` | Score distribution tables and percentile curves | Yes (Authoritative Distribution) | Calibrated from 2023-2025 NTA CUET UG score percentile releases |
| `lib/mock-data/**` | Local development mock profiles & demo tests | Dev / Fallback Only | Guarded by environment checks (`NODE_ENV === 'development'`); never exposed in production SSR |

---

## 6. Verification Status

- **Routes Scanned**: 12 / 12 verified.
- **API Endpoints Audited**: 6 / 6 verified with RLS / Timing-Safe authentication.
- **Database Tables Audited**: 5 core tables mapped with integrity constraints.
- **Data Lineage**: 100% of displayed scores, percentiles, and cutoffs trace directly to verified data sources or deterministic server calculators.
