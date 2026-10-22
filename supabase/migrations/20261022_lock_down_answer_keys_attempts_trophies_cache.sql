-- =============================================================================
-- CUETMATE SECURITY REMEDIATION: SEC-08
-- Migration: 20261022_lock_down_answer_keys_attempts_trophies_cache.sql
-- Purpose:
-- 1. questions & test_questions: Drop public/authenticated SELECT policies.
--    Revoke ALL on both tables from anon and authenticated. Prevent PostgREST answer key dumping.
-- 2. user_attempts: Revoke INSERT, UPDATE, DELETE from anon and authenticated.
--    Drop authenticated write policies. Preserve authenticated SELECT strictly on own rows (auth.uid() = user_id).
-- 3. user_trophies: Drop authenticated INSERT policy. Revoke INSERT, UPDATE, DELETE from anon/authenticated.
--    Restrict SELECT so anon cannot read it and authenticated can read only own rows (auth.uid() = user_id).
-- 4. ai_diagnosis_cache: Drop all public/authenticated policies. Revoke ALL from anon, authenticated, PUBLIC.
--    Isolate to service_role to eliminate public cache reads and cache poisoning.
-- 5. handle_new_user: Revoke EXECUTE from PUBLIC, anon, and authenticated. (Trigger function runs as owner).
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. QUESTIONS & TEST_QUESTIONS: LOCK DOWN TO SERVICE_ROLE ONLY
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop public read policies on questions
DROP POLICY IF EXISTS "Allow public read access to questions" ON public.questions;
DROP POLICY IF EXISTS "Allow service role full access to questions" ON public.questions;

-- Ensure RLS is active on questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Recreate service_role policy on questions
CREATE POLICY "Allow service role full access to questions"
    ON public.questions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Revoke all table permissions on questions from anon and authenticated
REVOKE ALL ON public.questions FROM anon, authenticated;
GRANT ALL ON public.questions TO service_role;


-- Drop public read policies on test_questions
DROP POLICY IF EXISTS "Allow public read access to test questions" ON public.test_questions;
DROP POLICY IF EXISTS "Allow service role full access to test questions" ON public.test_questions;

-- Ensure RLS is active on test_questions
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;

-- Recreate service_role policy on test_questions
CREATE POLICY "Allow service role full access to test questions"
    ON public.test_questions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Revoke all table permissions on test_questions from anon and authenticated
REVOKE ALL ON public.test_questions FROM anon, authenticated;
GRANT ALL ON public.test_questions TO service_role;


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. USER_ATTEMPTS: REVOKE CLIENT WRITES, PRESERVE OWN-ROW SELECT
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop client insert and update policies on user_attempts
DROP POLICY IF EXISTS "Allow users to record own attempts" ON public.user_attempts;
DROP POLICY IF EXISTS "Allow users to update own attempts" ON public.user_attempts;
DROP POLICY IF EXISTS "Allow users to view own attempts" ON public.user_attempts;
DROP POLICY IF EXISTS "Allow service role full access to user attempts" ON public.user_attempts;

-- Ensure RLS is active on user_attempts
ALTER TABLE public.user_attempts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated candidates to SELECT only their own attempts
CREATE POLICY "Allow users to view own attempts"
    ON public.user_attempts
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Service role retains full management for backend scoring and cleanup
CREATE POLICY "Allow service role full access to user attempts"
    ON public.user_attempts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Revoke all client write privileges on user_attempts
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.user_attempts FROM anon, authenticated;
REVOKE ALL ON public.user_attempts FROM anon;
GRANT SELECT ON public.user_attempts TO authenticated;
GRANT ALL ON public.user_attempts TO service_role;


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. USER_TROPHIES: REVOKE CLIENT WRITES, RESTRICT SELECT TO OWN ROWS
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop client insert policy and legacy public select policy
DROP POLICY IF EXISTS "Allow users to unlock own trophies" ON public.user_trophies;
DROP POLICY IF EXISTS "Allow users to view unlocked trophies" ON public.user_trophies;
DROP POLICY IF EXISTS "Allow users to view own unlocked trophies" ON public.user_trophies;
DROP POLICY IF EXISTS "Allow service role full access to user trophies" ON public.user_trophies;

-- Ensure RLS is active on user_trophies
ALTER TABLE public.user_trophies ENABLE ROW LEVEL SECURITY;

-- Allow authenticated candidates to SELECT only their own trophies (anon cannot read)
CREATE POLICY "Allow users to view own unlocked trophies"
    ON public.user_trophies
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Service role retains full management for server-side trophy awards
CREATE POLICY "Allow service role full access to user trophies"
    ON public.user_trophies
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Revoke client write privileges on user_trophies
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.user_trophies FROM anon, authenticated;
REVOKE ALL ON public.user_trophies FROM anon;
GRANT SELECT ON public.user_trophies TO authenticated;
GRANT ALL ON public.user_trophies TO service_role;


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. AI_DIAGNOSIS_CACHE: ISOLATE FULLY TO SERVICE_ROLE
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop public read and client insert policies
DROP POLICY IF EXISTS "Public read for ai_diagnosis_cache" ON public.ai_diagnosis_cache;
DROP POLICY IF EXISTS "Authenticated users and service role can insert ai_diagnosis_cache" ON public.ai_diagnosis_cache;
DROP POLICY IF EXISTS "Authenticated users and service role can insert ai_diagnosis_ca" ON public.ai_diagnosis_cache;
DROP POLICY IF EXISTS "Allow service role full access to ai_diagnosis_cache" ON public.ai_diagnosis_cache;

-- Ensure RLS is active on ai_diagnosis_cache
ALTER TABLE public.ai_diagnosis_cache ENABLE ROW LEVEL SECURITY;

-- Allow only service_role full management
CREATE POLICY "Allow service role full access to ai_diagnosis_cache"
    ON public.ai_diagnosis_cache
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Revoke all access from anon, authenticated, and public
REVOKE ALL ON public.ai_diagnosis_cache FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.ai_diagnosis_cache TO service_role;


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. HANDLE_NEW_USER: REVOKE EXECUTE FROM CLIENTS
-- ─────────────────────────────────────────────────────────────────────────────

-- Note: Trigger function handle_new_user() runs on auth.users under superuser privileges.
-- PostgREST clients do not need and should not have EXECUTE permission on this function.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

COMMIT;

-- =============================================================================
-- ROLLBACK SCRIPT (FOR EMERGENCY USE ONLY)
-- =============================================================================
/*
BEGIN;

-- 1. Restore questions public read
CREATE POLICY "Allow public read access to questions" ON public.questions
    FOR SELECT TO anon, authenticated USING (true);
GRANT SELECT ON public.questions TO anon, authenticated;

-- 2. Restore test_questions public read
CREATE POLICY "Allow public read access to test questions" ON public.test_questions
    FOR SELECT TO anon, authenticated USING (true);
GRANT SELECT ON public.test_questions TO anon, authenticated;

-- 3. Restore user_attempts client writes
CREATE POLICY "Allow users to record own attempts" ON public.user_attempts
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update own attempts" ON public.user_attempts
    FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
GRANT INSERT, UPDATE ON public.user_attempts TO authenticated;

-- 4. Restore user_trophies client writes & public view
DROP POLICY IF EXISTS "Allow users to view own unlocked trophies" ON public.user_trophies;
CREATE POLICY "Allow users to view unlocked trophies" ON public.user_trophies
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow users to unlock own trophies" ON public.user_trophies
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
GRANT SELECT, INSERT ON public.user_trophies TO authenticated;
GRANT SELECT ON public.user_trophies TO anon;

-- 5. Restore ai_diagnosis_cache public read & client insert
CREATE POLICY "Public read for ai_diagnosis_cache" ON public.ai_diagnosis_cache
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users and service role can insert ai_diagnosis_cache" ON public.ai_diagnosis_cache
    FOR INSERT WITH CHECK ((auth.role() = 'authenticated') OR (auth.role() = 'service_role'));
GRANT SELECT, INSERT ON public.ai_diagnosis_cache TO authenticated;
GRANT SELECT ON public.ai_diagnosis_cache TO anon;

-- 6. Restore handle_new_user grants
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;

COMMIT;
*/
