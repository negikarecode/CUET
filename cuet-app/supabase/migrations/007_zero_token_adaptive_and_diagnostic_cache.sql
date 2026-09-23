-- ════════════════════════════════════════════════════════════
-- MIGRATION 007: ZERO-TOKEN ADAPTIVE COMPILER & LOW-TOKEN DIAGNOSTIC CACHE
-- 1. Cold-start qualification tracking & daily cadence limiter for adaptive drills
-- 2. Mistake diagnosis cache table: hash(question_id + "_" + selected_option)
-- 3. Sunday Ritual analytics & weekly mentor debriefs
-- ════════════════════════════════════════════════════════════

-- 1. Add cadence tracking to public.profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS last_adaptive_drill_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS total_questions_attempted INTEGER DEFAULT 0;

-- 2. Mistake Diagnosis Cache Table
-- Stores high-speed distractor analyses so subsequent students hitting the exact same option trap consume 0 LLM tokens
CREATE TABLE IF NOT EXISTS public.ai_diagnosis_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key TEXT UNIQUE NOT NULL, -- SHA-256 hash or deterministic key: question_id + "_" + selected_option
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option CHAR(1) NOT NULL,
  error_classification TEXT NOT NULL CHECK (
    error_classification IN ('Conceptual Gap', 'Trap Option', 'Time Pressure Panic')
  ),
  diagnosis_message TEXT NOT NULL,
  ncert_correction TEXT NOT NULL,
  hit_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_diagnosis_cache_key ON public.ai_diagnosis_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_ai_diagnosis_cache_question ON public.ai_diagnosis_cache(question_id);

-- 3. Sunday Mentor Reports Table
-- Persists weekly personalized debriefs generated once per Sunday
CREATE TABLE IF NOT EXISTS public.sunday_mentor_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  mentor_debrief TEXT NOT NULL, -- 3-paragraph debrief (Major win, Persistent habit, 2 Actionable strategies)
  stats_summary JSONB NOT NULL DEFAULT '{}'::JSONB,
  redemption_test_id UUID REFERENCES public.tests(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_sunday_report_user_week UNIQUE (user_id, week_start_date)
);

CREATE INDEX IF NOT EXISTS idx_sunday_mentor_user_date ON public.sunday_mentor_reports(user_id, week_start_date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.ai_diagnosis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunday_mentor_reports ENABLE ROW LEVEL SECURITY;

-- Diagnosis cache is readable by all authenticated users (shared cross-student zero-token cache)
CREATE POLICY "Public read for ai_diagnosis_cache" ON public.ai_diagnosis_cache
  FOR SELECT USING (true);

-- Insert policy for authenticated users / service role
CREATE POLICY "Authenticated users can insert ai_diagnosis_cache" ON public.ai_diagnosis_cache
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Sunday reports are strictly private to each student
CREATE POLICY "Students can view own sunday_mentor_reports" ON public.sunday_mentor_reports
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students can insert own sunday_mentor_reports" ON public.sunday_mentor_reports
  FOR INSERT WITH CHECK (user_id = auth.uid());
