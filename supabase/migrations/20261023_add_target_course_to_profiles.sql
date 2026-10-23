-- =============================================================================
-- CUETMATE MIGRATION: ADD TARGET_COURSE TO PROFILES TABLE
-- Migration: 20261023_add_target_course_to_profiles.sql
--
-- Purpose:
-- 1. Add target_course column to public.profiles table (defaults to 'B.Com (Hons)').
-- 2. Grant column-level UPDATE permission on target_course to authenticated role,
--    in accordance with SEC-02 (20261020_protect_profiles_privilege_escalation.sql).
-- 3. Notify PostgREST to reload schema cache so the column is immediately accessible.
-- =============================================================================

BEGIN;

-- 1. Add target_course column to public.profiles if not exists
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS target_course TEXT DEFAULT 'B.Com (Hons)';

-- 2. Grant column-level UPDATE permissions to authenticated candidates
GRANT UPDATE (
    target_course
) ON public.profiles TO authenticated;

-- 3. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

COMMIT;
