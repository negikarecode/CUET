-- =============================================================================
-- CUETMATE SECURITY REMEDIATION: SEC-02
-- Migration: 20261020_protect_profiles_privilege_escalation.sql
-- Purpose: Prevent ordinary authenticated users from mutating privileged
--          profile fields (is_premium, subscription_tier, subscription_expires_at,
--          campus_coins, xp, streak, exam counters) via direct PostgREST client updates.
-- =============================================================================

-- ─── 1. TABLE & COLUMN-LEVEL PERMISSION HARDENING ─────────────────────────────
-- Revoke generic UPDATE table privileges from anon and authenticated roles
REVOKE UPDATE ON public.profiles FROM anon, authenticated;

-- Revoke all table-level write privileges (INSERT, DELETE, TRUNCATE) from anon and authenticated
REVOKE INSERT, DELETE, TRUNCATE ON public.profiles FROM anon, authenticated;
REVOKE ALL ON public.profiles FROM anon;

-- Restore strictly SELECT to authenticated (access further constrained by RLS auth.uid() = id)
GRANT SELECT ON public.profiles TO authenticated;

-- Grant column-level UPDATE permission strictly for non-privileged candidate fields
GRANT UPDATE (
    full_name,
    target_stream,
    target_university,
    target_college,
    exam_date,
    daily_study_hours,
    selected_subjects,
    avatar_url,
    updated_at
) ON public.profiles TO authenticated;

-- Ensure service_role retains full administrative management
GRANT ALL ON public.profiles TO service_role;

-- NOTE ON SIGNUP / PROFILE CREATION:
-- Profile provisioning on candidate signup is executed by public.handle_new_user(),
-- which is a SECURITY DEFINER trigger function on auth.users running with superuser
-- privileges. Server fallback routes utilize createAdminClient() (service_role).
-- Neither path relies on client-role direct INSERT on public.profiles.


-- ─── 2. DEFENSE-IN-DEPTH TRIGGER ENFORCEMENT ─────────────────────────────────
-- A database trigger ensures that even if column grants are inadvertently
-- altered, any direct client attempt to mutate privileged columns will abort.
CREATE OR REPLACE FUNCTION public.check_profile_update_privileges()
RETURNS TRIGGER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_jwt_role TEXT;
    v_current_user TEXT;
    v_is_trusted_service BOOLEAN;
BEGIN
    -- Extract active Postgres user and PostgREST JWT claim role
    v_current_user := current_user;
    v_jwt_role := coalesce(
        nullif(current_setting('request.jwt.claim.role', true), ''),
        (auth.jwt() ->> 'role')
    );

    -- Determine whether execution context is an authoritative backend service:
    -- 1. Database superuser / migration runner (postgres, supabase_admin)
    -- 2. PostgREST service_role connection used by createAdminClient()
    v_is_trusted_service := (
        v_current_user IN ('postgres', 'supabase_admin')
        OR (
            v_current_user = 'service_role'
            AND (v_jwt_role IS NULL OR v_jwt_role = 'service_role')
        )
    );

    -- Explicitly enforce that client callers (authenticated / anon) are never classified as trusted
    IF v_current_user IN ('authenticated', 'anon') OR v_jwt_role IN ('authenticated', 'anon') THEN
        v_is_trusted_service := FALSE;
    END IF;

    -- If the mutation is executed by an ordinary authenticated candidate or anon client:
    IF NOT v_is_trusted_service THEN
        IF (
            NEW.is_premium IS DISTINCT FROM OLD.is_premium OR
            NEW.subscription_tier IS DISTINCT FROM OLD.subscription_tier OR
            NEW.subscription_expires_at IS DISTINCT FROM OLD.subscription_expires_at OR
            NEW.campus_coins IS DISTINCT FROM OLD.campus_coins OR
            NEW.xp IS DISTINCT FROM OLD.xp OR
            NEW.current_streak IS DISTINCT FROM OLD.current_streak OR
            NEW.last_practice_date IS DISTINCT FROM OLD.last_practice_date OR
            NEW.total_questions_attempted IS DISTINCT FROM OLD.total_questions_attempted OR
            NEW.last_adaptive_drill_at IS DISTINCT FROM OLD.last_adaptive_drill_at OR
            NEW.created_at IS DISTINCT FROM OLD.created_at OR
            NEW.id IS DISTINCT FROM OLD.id
        ) THEN
            RAISE EXCEPTION 'Access Denied: Ordinary authenticated clients cannot modify privileged profile columns (is_premium, campus_coins, xp, subscription_tier, subscription_expires_at).'
                USING ERRCODE = '42501'; -- insufficient_privilege
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if existing and attach to profiles
DROP TRIGGER IF EXISTS trg_protect_profiles_privileges ON public.profiles;

CREATE TRIGGER trg_protect_profiles_privileges
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.check_profile_update_privileges();

COMMENT ON FUNCTION public.check_profile_update_privileges() IS 
'Security gate preventing authenticated clients from modifying is_premium, campus_coins, or XP without server authorization (SEC-02).';


-- =============================================================================
-- VERIFICATION TEST SCRIPT (RUN IN SUPABASE SQL EDITOR OR LOCAL DB)
-- =============================================================================
/*
-- Test 1: Verify ordinary authenticated client cannot escalate is_premium
SET ROLE authenticated;
SET request.jwt.claim.role = 'authenticated';
SET request.jwt.claim.sub = '00000000-0000-0000-0000-000000000001';

-- EXPECTED RESULT: Permission denied (error 42501)
UPDATE public.profiles SET is_premium = true WHERE id = '00000000-0000-0000-0000-000000000001';

-- Test 2: Verify ordinary authenticated client can update legitimate fields
-- EXPECTED RESULT: Update succeeds
UPDATE public.profiles SET full_name = 'Verified Candidate', updated_at = NOW() WHERE id = '00000000-0000-0000-0000-000000000001';

-- Test 3: Verify service_role can perform authoritative entitlement grants
SET ROLE service_role;
SET request.jwt.claim.role = 'service_role';

-- EXPECTED RESULT: Update succeeds
UPDATE public.profiles SET is_premium = true, subscription_tier = 'all_access_pass' WHERE id = '00000000-0000-0000-0000-000000000001';

RESET ROLE;
*/

-- =============================================================================
-- ROLLBACK SCRIPT (IF REVERSION TO EXACT ORIGINAL STATE IS REQUIRED)
-- =============================================================================
/*
-- CRITICAL SECURITY NOTICE:
-- Reverting this migration will re-expose public.profiles to client-side privilege
-- escalation (SEC-02). Any authenticated candidate will once again be able to directly
-- modify is_premium, campus_coins, and xp via PostgREST client calls.
-- Only execute this rollback in an isolated staging emergency.

-- 1. Drop trigger and enforcement function
DROP TRIGGER IF EXISTS trg_protect_profiles_privileges ON public.profiles;
DROP FUNCTION IF EXISTS public.check_profile_update_privileges();

-- 2. Revoke custom column-level permissions
REVOKE UPDATE (
    full_name,
    target_stream,
    target_university,
    target_college,
    exam_date,
    daily_study_hours,
    selected_subjects,
    avatar_url,
    updated_at
) ON public.profiles FROM authenticated;

-- 3. Restore exact original table-level privileges defined prior to migration
-- (Supabase default table grant: authenticated role has table-level UPDATE constrained only by RLS)
GRANT UPDATE ON public.profiles TO authenticated;
REVOKE UPDATE ON public.profiles FROM anon;

-- 4. Confirm original RLS policy remains intact as established in schema.sql:
-- Policy: "Allow users to update own profile" FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
*/
