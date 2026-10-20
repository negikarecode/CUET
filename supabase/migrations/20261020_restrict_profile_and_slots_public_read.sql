-- =============================================================================
-- CUETMATE SECURITY REMEDIATION: SEC-06 & SECURITY DEFINER HARDENING
-- Migration: 20261020_restrict_profile_and_slots_public_read.sql
-- Purpose: 
-- 1. Restrict SELECT on public.profiles to owning candidate (auth.uid() = id)
--    preventing anonymous scrapers from harvesting student names, study hours,
--    target universities, and subscription metadata.
-- 2. Restrict direct SELECT on public.promotional_slots to prevent anonymous
--    scrapers from viewing user_id and order_id columns.
-- 3. Expose a minimal-privilege, SECURITY DEFINER aggregate-count function
--    with a pinned search_path (public, pg_temp) for promotional slot counters.
-- =============================================================================

-- ─── 1. RESTRICT PROFILES SELECT & UPDATE TO OWNING USER ────────────────────
-- Ensure RLS is active on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop the overly permissive public read policy from initial schema
DROP POLICY IF EXISTS "Allow public read access to basic profiles" ON public.profiles;

-- Create restrictive row-level policy: authenticated candidates can only read their own row
DROP POLICY IF EXISTS "Allow users to view own profile" ON public.profiles;
CREATE POLICY "Allow users to view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Create restrictive row-level policy: authenticated candidates can only update their own row
-- (Note: Column-level permissions from Migration 1 further restrict which columns can be updated)
DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
CREATE POLICY "Allow users to update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Ensure service_role retains full access for server-side leaderboard & analytics
DROP POLICY IF EXISTS "Allow service role full access to profiles" ON public.profiles;
CREATE POLICY "Allow service role full access to profiles"
    ON public.profiles FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ─── 2. HARDEN PAYMENT ORDERS & TRANSACTIONS PRIVILEGES ──────────────────────
-- Ensure RLS is enabled on payment tables
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Revoke all direct client write access (INSERT, UPDATE, DELETE)
REVOKE ALL ON public.payment_orders FROM anon, authenticated;
REVOKE ALL ON public.payment_transactions FROM anon, authenticated;

-- Preserve strictly SELECT for authenticated candidates to view their own history
GRANT SELECT ON public.payment_orders TO authenticated;
GRANT SELECT ON public.payment_transactions TO authenticated;

-- Ensure service_role retains full administrative management
GRANT ALL ON public.payment_orders TO service_role;
GRANT ALL ON public.payment_transactions TO service_role;

-- Ensure owner-based read policies exist and service_role has full management
DROP POLICY IF EXISTS "Users can view own payment orders" ON public.payment_orders;
CREATE POLICY "Users can view own payment orders"
    ON public.payment_orders FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role manages payment orders" ON public.payment_orders;
CREATE POLICY "Service role manages payment orders"
    ON public.payment_orders FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own transactions" ON public.payment_transactions;
CREATE POLICY "Users can view own transactions"
    ON public.payment_transactions FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role manages payment transactions" ON public.payment_transactions;
CREATE POLICY "Service role manages payment transactions"
    ON public.payment_transactions FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ─── 3. RESTRICT PROMOTIONAL SLOTS ROW ACCESS ────────────────────────────────
-- Ensure RLS is enabled
ALTER TABLE public.promotional_slots ENABLE ROW LEVEL SECURITY;

-- Revoke all direct client table privileges (SELECT, INSERT, UPDATE, DELETE)
REVOKE ALL ON public.promotional_slots FROM anon, authenticated;

-- Ensure service_role maintains administrative management of promotional slots
GRANT ALL ON public.promotional_slots TO service_role;

-- Drop the public SELECT policy that exposed customer user_id and order_id
DROP POLICY IF EXISTS "Public can view claimed promotional slots count" ON public.promotional_slots;

-- Ensure service role maintains administrative management policy
DROP POLICY IF EXISTS "Service role manages slots" ON public.promotional_slots;
CREATE POLICY "Service role manages slots"
    ON public.promotional_slots FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- ─── 3. MINIMAL-PRIVILEGE SECURITY DEFINER AGGREGATE FUNCTION ────────────────
-- Expose strictly the scalar count of claimed promotional slots.
-- Pinned search_path prevents search_path hijacking attacks (CWE-426).
-- Cannot reveal underlying rows, user_ids, or order_ids.
CREATE OR REPLACE FUNCTION public.get_claimed_promotional_slots_count()
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
    SELECT count(*)::INTEGER 
    FROM public.promotional_slots 
    WHERE status = 'claimed';
$$;

-- Revoke default public execution rights and grant minimal required roles
REVOKE ALL ON FUNCTION public.get_claimed_promotional_slots_count() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_claimed_promotional_slots_count() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_claimed_promotional_slots_count() TO authenticated, service_role;

COMMENT ON FUNCTION public.get_claimed_promotional_slots_count() IS
'Returns aggregate count of claimed launch slots without revealing customer IDs or order records (SEC-06).';


-- =============================================================================
-- VERIFICATION TEST SCRIPT (RUN IN SUPABASE SQL EDITOR OR TEST HARNESS)
-- =============================================================================
/*
-- Test 1: Verify anonymous client cannot read profiles table directly
SET ROLE anon;
SET request.jwt.claim.role = 'anon';

-- EXPECTED RESULT: 0 rows returned (Empty set)
SELECT count(*) FROM public.profiles;

-- Test 2: Verify anonymous client cannot read promotional_slots rows directly
-- EXPECTED RESULT: 0 rows returned / permission denied
SELECT * FROM public.promotional_slots;

-- Test 3: Verify anonymous client cannot invoke aggregate count function
-- EXPECTED RESULT: Permission denied (error 42501)
SELECT public.get_claimed_promotional_slots_count();

-- Test 4: Verify authenticated user can only view their own profile and can call aggregate function
SET ROLE authenticated;
SET request.jwt.claim.role = 'authenticated';
SET request.jwt.claim.sub = '00000000-0000-0000-0000-000000000001';

-- EXPECTED RESULT: Returns single integer without leaking user_id or order_id
SELECT public.get_claimed_promotional_slots_count();

-- EXPECTED RESULT: Exactly 1 row (own profile only)
SELECT id, full_name FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000001';

-- EXPECTED RESULT: 0 rows (Cannot see another user's profile)
SELECT id, full_name FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000002';

RESET ROLE;
*/

-- =============================================================================
-- ROLLBACK CONSIDERATIONS & SAFETY NOTICE
-- =============================================================================
/*
-- CAUTION: Re-establishing "USING (true)" on public.profiles will re-expose all candidate
-- names, target colleges, study habits, and subscription status to unauthenticated
-- anonymous scrapers across the internet.
--
-- If rollback of the restrictive policy is strictly required during a staging emergency:
-- 1. Remove the aggregate count RPC
DROP FUNCTION IF EXISTS public.get_claimed_promotional_slots_count();

-- 2. Drop the restrictive owner-only policy
DROP POLICY IF EXISTS "Allow users to view own profile" ON public.profiles;

-- 3. Restore the original schema.sql policy (NOT recommended for public production):
CREATE POLICY "Allow public read access to basic profiles"
    ON public.profiles FOR SELECT
    TO anon, authenticated
    USING (true);

-- 4. Restore the original migration 20261019 promotional slots policy:
CREATE POLICY "Public can view claimed promotional slots count"
    ON public.promotional_slots FOR SELECT
    TO authenticated, anon
    USING (true);
*/
