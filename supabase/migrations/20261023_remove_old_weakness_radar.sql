-- ============================================================================
-- MIGRATION: 20261023_remove_old_weakness_radar.sql
-- DESCRIPTION: Reversible DB migration for Phase 2: Deprecate old Weakness Radar
--              and provision schema for AI Coach (Phase 3) & Progress Cards (Phase 4).
--
-- AUDIT INVENTORY:
-- 1. Old Weakness Radar (/dashboard/radar) was calculated dynamically on the fly
--    and stored ephemeral responses in localStorage ('radar_analysis_cache_v2').
-- 2. Zero exclusive database tables or columns existed for the legacy radar.
-- 3. CRITICAL DATA INTEGRITY: public.user_attempts, public.questions, public.profiles,
--    public.ai_diagnosis_cache, and public.sunday_mentor_reports are strictly PRESERVED
--    and NOT modified or dropped.
-- ============================================================================

-- ============================================================================
-- UP MIGRATION
-- ============================================================================

-- 1. Create ai_reports table for Phase 3 AI Coach
CREATE TABLE IF NOT EXISTS public.ai_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  stats_json JSONB NOT NULL,
  report_json JSONB NOT NULL,
  questions_analyzed INTEGER NOT NULL DEFAULT 0,
  score_snapshot JSONB,
  feedback TEXT CHECK (feedback IN ('up', 'down', null)),
  model TEXT NOT NULL DEFAULT 'gemini-2.0-flash',
  prompt_version TEXT NOT NULL DEFAULT 'v1.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast user subject history lookups & report comparison
CREATE INDEX IF NOT EXISTS idx_ai_reports_user_subject_created
  ON public.ai_reports (user_id, subject, created_at DESC);

-- Enable RLS
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI reports"
  ON public.ai_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own AI reports"
  ON public.ai_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI reports"
  ON public.ai_reports FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. Create ai_usage table for atomic daily quotas (3 reports/day reset midnight IST)
CREATE TABLE IF NOT EXISTS public.ai_usage (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, usage_date)
);

-- Enable RLS
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI usage"
  ON public.ai_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role manages AI usage"
  ON public.ai_usage FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. Create progress_cards table for Phase 4 Shareable Progress Cards
CREATE TABLE IF NOT EXISTS public.progress_cards (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  from_report_id UUID REFERENCES public.ai_reports(id) ON DELETE SET NULL,
  to_report_id UUID REFERENCES public.ai_reports(id) ON DELETE SET NULL,
  card_json JSONB NOT NULL,
  display_name TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_progress_cards_user_created
  ON public.progress_cards (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_progress_cards_public
  ON public.progress_cards (id)
  WHERE is_public = true;

-- Enable RLS
ALTER TABLE public.progress_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public progress cards"
  ON public.progress_cards FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress cards"
  ON public.progress_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress cards"
  ON public.progress_cards FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress cards"
  ON public.progress_cards FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================================================
-- DOWN MIGRATION (Reversal script)
-- To rollback, execute the statements below:
--
-- DROP TABLE IF EXISTS public.progress_cards CASCADE;
-- DROP TABLE IF EXISTS public.ai_usage CASCADE;
-- DROP TABLE IF EXISTS public.ai_reports CASCADE;
-- ============================================================================
