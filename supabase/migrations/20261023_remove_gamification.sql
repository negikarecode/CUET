-- =============================================================================
-- CUETMATE MIGRATION: REMOVE GAMIFICATION (TROPHIES, LEADERBOARD & XP AWARDS)
-- Migration: 20261023_remove_gamification.sql
--
-- Purpose:
-- 1. Drop public.user_test_xp_awards table (if exists).
-- 2. Drop public.user_trophies table (if exists).
-- 3. Drop public.trophies table (if exists).
-- 4. Drop public.award_trophies RPC function (if exists).
-- 5. Drop public.award_xp_once RPC function (if exists).
--
-- HARD INVARIANTS:
-- - DO NOT drop public.profiles.xp or public.profiles.campus_coins.
--   Payment fulfillment (`fulfill_payment_order`) grants 500 campus coins upon
--   tier unlock, and database triggers/views maintain references to profiles columns.
-- - Personal progress analytics (streaks, attempts, scorecards, AI diagnosis)
--   remain fully operational and untouched.
-- =============================================================================

BEGIN;

-- 1. Drop Gamification RPC Functions
DROP FUNCTION IF EXISTS public.award_trophies(UUID, TEXT[]);
DROP FUNCTION IF EXISTS public.award_trophies(p_user_id UUID, p_trophy_ids TEXT[]);

DROP FUNCTION IF EXISTS public.award_xp_once(UUID, UUID, INTEGER);
DROP FUNCTION IF EXISTS public.award_xp_once(p_user_id UUID, p_test_id UUID, p_xp_amount INTEGER);

-- 2. Drop Gamification Tables & Dependent Constraints
-- Dropping with CASCADE cleans up any foreign keys, indexes, and RLS policies on these tables.
DROP TABLE IF EXISTS public.user_test_xp_awards CASCADE;
DROP TABLE IF EXISTS public.user_trophies CASCADE;
DROP TABLE IF EXISTS public.trophies CASCADE;

COMMIT;

-- =============================================================================
-- ROLLBACK SCRIPT (FOR EMERGENCY USE ONLY)
-- =============================================================================
/*
BEGIN;

-- 1. Recreate public.trophies
CREATE TABLE IF NOT EXISTS public.trophies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.trophies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to trophies"
    ON public.trophies FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow service role full access to trophies"
    ON public.trophies FOR ALL TO service_role USING (true) WITH CHECK (true);
GRANT SELECT ON public.trophies TO anon, authenticated;
GRANT ALL ON public.trophies TO service_role;

-- 2. Recreate public.user_trophies
CREATE TABLE IF NOT EXISTS public.user_trophies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    trophy_id TEXT NOT NULL REFERENCES public.trophies(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, trophy_id)
);
CREATE INDEX IF NOT EXISTS idx_user_trophies_user ON public.user_trophies (user_id);
ALTER TABLE public.user_trophies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view own unlocked trophies"
    ON public.user_trophies FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow service role full access to user trophies"
    ON public.user_trophies FOR ALL TO service_role USING (true) WITH CHECK (true);
GRANT SELECT ON public.user_trophies TO authenticated;
GRANT ALL ON public.user_trophies TO service_role;

-- 3. Recreate public.user_test_xp_awards
CREATE TABLE IF NOT EXISTS public.user_test_xp_awards (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    xp_awarded INTEGER NOT NULL DEFAULT 50,
    awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, test_id)
);
ALTER TABLE public.user_test_xp_awards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view own test xp awards"
    ON public.user_test_xp_awards FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow service role full access to user_test_xp_awards"
    ON public.user_test_xp_awards FOR ALL TO service_role USING (true) WITH CHECK (true);
GRANT SELECT ON public.user_test_xp_awards TO authenticated;
GRANT ALL ON public.user_test_xp_awards TO service_role;

-- 4. Recreate award_xp_once function
CREATE OR REPLACE FUNCTION public.award_xp_once(
    p_user_id UUID,
    p_test_id UUID,
    p_xp_amount INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $func$
DECLARE
    v_awarded INTEGER := 0;
BEGIN
    IF p_user_id IS NULL OR p_test_id IS NULL OR p_xp_amount IS NULL OR p_xp_amount <= 0 THEN
        RETURN 0;
    END IF;

    INSERT INTO public.user_test_xp_awards (user_id, test_id, xp_awarded, awarded_at)
    VALUES (p_user_id, p_test_id, p_xp_amount, NOW())
    ON CONFLICT (user_id, test_id) DO NOTHING;

    IF FOUND THEN
        UPDATE public.profiles
        SET xp = coalesce(xp, 0) + p_xp_amount,
            updated_at = NOW()
        WHERE id = p_user_id;
        v_awarded := p_xp_amount;
    ELSE
        v_awarded := 0;
    END IF;

    RETURN v_awarded;
END;
$func$;

REVOKE ALL ON FUNCTION public.award_xp_once(UUID, UUID, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.award_xp_once(UUID, UUID, INTEGER) TO service_role;

COMMIT;
*/
