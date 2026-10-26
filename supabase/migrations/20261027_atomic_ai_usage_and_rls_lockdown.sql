-- =============================================================================
-- CUETMATE SECURITY HARDENING MIGRATION
-- Migration: 20261027_atomic_ai_usage_and_rls_lockdown.sql
-- Purpose:
-- 1. Atomic Quota Reservation: Add reserve_ai_usage_slot and refund_ai_usage_slot
--    stored procedures to prevent race condition bypasses across serverless lambdas.
-- 2. RLS Lockdown on ai_reports: Revoke direct client INSERT/UPDATE/DELETE.
--    Allow authenticated users to SELECT only their own reports, and UPDATE only the feedback column.
-- 3. RLS Lockdown on progress_cards: Revoke direct client INSERT/UPDATE/DELETE.
--    Progress cards must be created and modified exclusively through server-side service_role.
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. ATOMIC AI USAGE QUOTA RESERVATION (CONCURRENCY HARDENING)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.reserve_ai_usage_slot(
  p_user_id UUID,
  p_usage_date DATE
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Atomically insert or increment usage count strictly if under limit (3)
  INSERT INTO public.ai_usage (user_id, usage_date, count)
  VALUES (p_user_id, p_usage_date, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET count = public.ai_usage.count + 1
  WHERE public.ai_usage.count < 3
  RETURNING count INTO v_count;

  -- If condition (count < 3) failed, v_count will be null
  IF v_count IS NULL THEN
    RETURN 4; -- Limit reached indicator (> 3)
  END IF;

  RETURN v_count;
END;
$$;

-- Revoke execute from public/anon/authenticated; grant strictly to service_role
REVOKE ALL ON FUNCTION public.reserve_ai_usage_slot(UUID, DATE) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_ai_usage_slot(UUID, DATE) TO service_role;


CREATE OR REPLACE FUNCTION public.refund_ai_usage_slot(
  p_user_id UUID,
  p_usage_date DATE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.ai_usage
  SET count = GREATEST(0, count - 1)
  WHERE user_id = p_user_id AND usage_date = p_usage_date;
END;
$$;

REVOKE ALL ON FUNCTION public.refund_ai_usage_slot(UUID, DATE) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.refund_ai_usage_slot(UUID, DATE) TO service_role;


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. LOCK DOWN AI_REPORTS: PREVENT CLIENT-SIDE REPORT FORGERY
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop client insert and generic update policies on ai_reports
DROP POLICY IF EXISTS "Users can create their own AI reports" ON public.ai_reports;
DROP POLICY IF EXISTS "Users can update their own AI reports" ON public.ai_reports;
DROP POLICY IF EXISTS "Users can view their own AI reports" ON public.ai_reports;
DROP POLICY IF EXISTS "Service role manages AI reports" ON public.ai_reports;

-- Ensure RLS is enabled
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view only their own AI reports
CREATE POLICY "Users can view their own AI reports"
  ON public.ai_reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role retains full management for generation and scoring
CREATE POLICY "Service role manages AI reports"
  ON public.ai_reports
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Revoke all table-level write privileges from anon and authenticated
REVOKE INSERT, DELETE, TRUNCATE ON public.ai_reports FROM anon, authenticated;
REVOKE UPDATE ON public.ai_reports FROM anon, authenticated;
REVOKE ALL ON public.ai_reports FROM anon;

-- Grant column-level UPDATE strictly on feedback column for thumbs up/down
GRANT UPDATE (feedback) ON public.ai_reports TO authenticated;
GRANT SELECT ON public.ai_reports TO authenticated;
GRANT ALL ON public.ai_reports TO service_role;


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. LOCK DOWN PROGRESS_CARDS: PREVENT CLIENT-SIDE PROGRESS CARD FORGERY
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop client insert, update, and delete policies
DROP POLICY IF EXISTS "Users can insert their own progress cards" ON public.progress_cards;
DROP POLICY IF EXISTS "Users can update their own progress cards" ON public.progress_cards;
DROP POLICY IF EXISTS "Users can delete their own progress cards" ON public.progress_cards;
DROP POLICY IF EXISTS "Anyone can view public progress cards" ON public.progress_cards;
DROP POLICY IF EXISTS "Service role manages progress cards" ON public.progress_cards;

-- Ensure RLS is enabled
ALTER TABLE public.progress_cards ENABLE ROW LEVEL SECURITY;

-- Read policy: Anyone can view public cards, authenticated users can view their own cards
CREATE POLICY "Anyone can view public progress cards"
  ON public.progress_cards
  FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

-- Service role retains full management for creating, updating, and deleting progress cards
CREATE POLICY "Service role manages progress cards"
  ON public.progress_cards
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Revoke all write privileges from anon and authenticated
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.progress_cards FROM anon, authenticated;
REVOKE ALL ON public.progress_cards FROM anon;
GRANT SELECT ON public.progress_cards TO authenticated;
GRANT ALL ON public.progress_cards TO service_role;

COMMIT;
