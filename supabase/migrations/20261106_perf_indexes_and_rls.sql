-- =============================================================================
-- Migration: 20261106_perf_indexes_and_rls.sql
-- Description: Performance optimization migration:
--   1. Wraps auth.uid() in (SELECT auth.uid()) for cached per-query evaluation in RLS policies.
--   2. Adds compound indexes for high-frequency queries on user_attempts, payments,
--      ai_reports, progress_cards, test_questions, and question_reports.
--
-- DO NOT RUN AUTOMATICALLY ON PRODUCTION. Review before executing in Supabase SQL editor.
-- =============================================================================

BEGIN;

-- 1. RLS OPTIMIZATION: CACHED (SELECT auth.uid()) EVALUATION
-- Postgres re-evaluates naked auth.uid() calls for every row scanned.
-- Wrapping in (SELECT auth.uid()) allows the planner to execute auth.uid() once per query.

-- Table: public.payments
DROP POLICY IF EXISTS "Users can select own payments" ON public.payments;
CREATE POLICY "Users can select own payments"
    ON public.payments
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Table: public.question_reports
DROP POLICY IF EXISTS "Users can insert own question reports" ON public.question_reports;
CREATE POLICY "Users can insert own question reports"
    ON public.question_reports
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can view own question reports" ON public.question_reports;
CREATE POLICY "Users can view own question reports"
    ON public.question_reports
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Table: public.profiles
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));

COMMIT;

-- 2. QUERY & LOOKUP PERFORMANCE INDEXES

-- Payments lookup by user and status
CREATE INDEX IF NOT EXISTS idx_payments_user_status
    ON public.payments (user_id, status);

-- Attempts lookup ordered by recency
CREATE INDEX IF NOT EXISTS idx_user_attempts_user_created_desc
    ON public.user_attempts (user_id, created_at DESC);

-- AI Reports lookup by user ordered by recency
CREATE INDEX IF NOT EXISTS idx_ai_reports_user_created_desc
    ON public.ai_reports (user_id, created_at DESC);

-- Progress cards lookup by user ordered by recency
CREATE INDEX IF NOT EXISTS idx_progress_cards_user_created_desc
    ON public.progress_cards (user_id, created_at DESC);

-- Test question association index
CREATE INDEX IF NOT EXISTS idx_test_questions_composite
    ON public.test_questions (test_id, question_id);
