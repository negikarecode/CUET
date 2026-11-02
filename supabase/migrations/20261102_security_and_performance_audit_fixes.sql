-- =============================================================================
-- CUETMATE SECURITY & PERFORMANCE AUDIT REMEDIATION
-- Migration: 20261102_security_and_performance_audit_fixes.sql
-- Purpose:
-- 1. [SEC-01] Revoke client INSERT forgery on sunday_mentor_reports.
-- 2. [SEC-02] Pin search_path = public, pg_temp on cleanup_expired_otps() (CWE-426).
-- 3. [SEC-03] Revoke user_otp_codes table access from anon and authenticated.
-- 4. [AUTH-01/02] Harden handle_new_user() against stream case-sensitivity crash.
-- 5. [PERF-01] Wrap auth.uid() with (SELECT auth.uid()) across all RLS policies.
-- 6. [PERF-02..06] Add missing foreign key & compound query indexes.
-- =============================================================================

BEGIN;

-- 1. SECURITY HARDENING: MENTOR REPORTS & OTP TABLE

-- Drop client insert on sunday_mentor_reports (SEC-01)
DROP POLICY IF EXISTS "Students can insert own sunday_mentor_reports" ON public.sunday_mentor_reports;
REVOKE INSERT, UPDATE, DELETE ON public.sunday_mentor_reports FROM anon, authenticated;
GRANT ALL ON public.sunday_mentor_reports TO service_role;

-- Harden cleanup_expired_otps search_path (SEC-02)
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    DELETE FROM public.user_otp_codes
    WHERE expires_at < NOW() - INTERVAL '1 hour';
    RETURN NEW;
END;
$$;

-- Revoke user_otp_codes table grants from clients (SEC-03)
REVOKE ALL ON public.user_otp_codes FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.user_otp_codes TO service_role;

-- 2. AUTH RESILIENCE: NORMALIZED STREAM & ERROR-TOLERANT SIGNUP

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_raw_stream TEXT;
    v_normalized_stream TEXT;
    v_target_course TEXT;
BEGIN
    v_raw_stream := LOWER(TRIM(COALESCE(NEW.raw_user_meta_data->>'target_stream', 'commerce')));
    
    -- Normalize stream so it strictly matches: 'Commerce', 'Science', 'Humanities'
    IF v_raw_stream LIKE '%sci%' THEN
        v_normalized_stream := 'Science';
    ELSIF v_raw_stream LIKE '%hum%' OR v_raw_stream LIKE '%art%' THEN
        v_normalized_stream := 'Humanities';
    ELSE
        v_normalized_stream := 'Commerce';
    END IF;

    v_target_course := COALESCE(
        NEW.raw_user_meta_data->>'target_course',
        CASE v_normalized_stream
            WHEN 'Commerce' THEN 'B.Com (Hons)'
            WHEN 'Science' THEN 'B.Sc Computer Science'
            ELSE 'B.A. (Hons) Economics'
        END
    );

    BEGIN
        INSERT INTO public.profiles (
            id,
            full_name,
            target_stream,
            target_course,
            target_university,
            target_college,
            exam_date,
            daily_study_hours,
            xp,
            campus_coins,
            current_streak,
            selected_subjects
        )
        VALUES (
            NEW.id,
            COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''), 'CUET Aspirant'),
            v_normalized_stream,
            v_target_course,
            COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'target_university'), ''), 'Delhi University'),
            COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'target_college'), ''), 'SRCC'),
            '2026-05-15',
            4,
            0,
            50,
            0,
            COALESCE(NEW.raw_user_meta_data->'selected_subjects', '[]'::jsonb)
        )
        ON CONFLICT (id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            target_stream = COALESCE(public.profiles.target_stream, EXCLUDED.target_stream),
            target_course = COALESCE(public.profiles.target_course, EXCLUDED.target_course);
    EXCEPTION WHEN OTHERS THEN
        RAISE WARNING 'handle_new_user profile provisioning warning: %', SQLERRM;
    END;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- 3. RLS PERFORMANCE: CACHED (SELECT AUTH.UID()) SUBQUERIES

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Students can view own attempts" ON public.user_attempts;
CREATE POLICY "Students can view own attempts" 
ON public.user_attempts FOR SELECT 
TO authenticated 
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can view their own AI reports" ON public.ai_reports;
CREATE POLICY "Users can view their own AI reports" 
ON public.ai_reports FOR SELECT 
TO authenticated 
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can read own progress cards" ON public.progress_cards;
CREATE POLICY "Users can read own progress cards" 
ON public.progress_cards FOR SELECT 
TO authenticated 
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Students can view own sunday_mentor_reports" ON public.sunday_mentor_reports;
CREATE POLICY "Students can view own sunday_mentor_reports" 
ON public.sunday_mentor_reports FOR SELECT 
TO authenticated 
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Students can view own orders" ON public.payment_orders;
CREATE POLICY "Students can view own orders" 
ON public.payment_orders FOR SELECT 
TO authenticated 
USING (user_id = (SELECT auth.uid()));

COMMIT;

-- 4. PERFORMANCE & FOREIGN KEY INDEXES
CREATE INDEX IF NOT EXISTS idx_user_otp_codes_expires_at ON public.user_otp_codes (expires_at);
CREATE INDEX IF NOT EXISTS idx_test_questions_question_id ON public.test_questions (question_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_order_id ON public.payment_transactions (order_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_user_created ON public.user_attempts (user_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_tests_subject_active ON public.tests (subject, is_active);
CREATE INDEX IF NOT EXISTS idx_promotional_slots_order_id ON public.promotional_slots (order_id);
