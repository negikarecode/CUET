-- ════════════════════════════════════════════════════════════
-- MIGRATION 006: BRIDGE CORE CBT & AI ANALYTICS SCHEMAS
-- Integrates public.profiles with student accounts,
-- maps student_attempts to public.user_attempts,
-- and verifies public.pacing_analytics_summary view.
-- ════════════════════════════════════════════════════════════

-- 1. Ensure public.profiles has all necessary columns for AI Planning and Analysis
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS exam_date DATE DEFAULT '2026-05-15',
  ADD COLUMN IF NOT EXISTS daily_study_hours INTEGER DEFAULT 4,
  ADD COLUMN IF NOT EXISTS selected_subjects TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Compatibility View: students -> public.profiles
-- Allows any legacy query or module targeting "students" to transparently read public.profiles
CREATE OR REPLACE VIEW public.students AS
SELECT 
  p.id,
  p.id AS auth_user_id,
  p.full_name AS name,
  u.email,
  p.target_stream,
  p.target_college,
  p.target_university,
  p.exam_date,
  p.daily_study_hours,
  p.selected_subjects,
  p.xp,
  p.campus_coins,
  p.current_streak,
  p.last_practice_date,
  p.is_premium,
  p.subscription_tier AS plan_type,
  p.avatar_url,
  p.created_at,
  p.updated_at
FROM public.profiles p
LEFT JOIN auth.users u ON p.id = u.id;

-- 3. Compatibility View: student_attempts -> public.user_attempts
-- Maps user_attempts to student_attempts format for unified analysis
CREATE OR REPLACE VIEW public.student_attempts AS
SELECT 
  ua.id::TEXT AS id,
  ua.user_id AS student_id,
  ua.question_id::TEXT AS question_id,
  ua.test_id::TEXT AS test_id,
  q.subject,
  q.chapter,
  q.micro_topic,
  q.archetype,
  ua.selected_option,
  ua.is_correct,
  (ua.selected_option IS NULL) AS is_skipped,
  ua.time_spent_seconds AS time_taken_seconds,
  ua.is_time_sink,
  'mock_test'::VARCHAR(20) AS attempt_source,
  ua.test_id AS session_id,
  1 AS attempt_number,
  ua.diagnostic_report,
  ua.created_at AS attempted_at
FROM public.user_attempts ua
LEFT JOIN public.questions q ON ua.question_id = q.id;

-- 4. Verify & Ensure PACING_ANALYTICS_SUMMARY View exists with all required aggregations
CREATE OR REPLACE VIEW public.pacing_analytics_summary AS
SELECT 
  ua.user_id,
  q.subject,
  q.chapter,
  q.micro_topic,
  q.archetype,
  COUNT(ua.id) AS total_attempts,
  COUNT(CASE WHEN ua.is_correct = TRUE THEN 1 END) AS correct_attempts,
  COUNT(CASE WHEN ua.is_correct = FALSE AND ua.selected_option IS NOT NULL THEN 1 END) AS wrong_attempts,
  COUNT(CASE WHEN ua.selected_option IS NULL THEN 1 END) AS skipped_attempts,
  ROUND(AVG(ua.time_spent_seconds)::NUMERIC, 1) AS avg_time_seconds,
  COUNT(CASE WHEN ua.is_time_sink = TRUE THEN 1 END) AS time_sink_count,
  COUNT(CASE WHEN ua.is_time_sink = TRUE AND ua.is_correct = FALSE THEN 1 END) AS fatal_time_sinks,
  ROUND(
    (COUNT(CASE WHEN ua.is_correct = TRUE THEN 1 END)::NUMERIC / NULLIF(COUNT(ua.id), 0)) * 100, 
    2
  ) AS accuracy_percentage
FROM public.user_attempts ua
JOIN public.questions q ON ua.question_id = q.id
GROUP BY ua.user_id, q.subject, q.chapter, q.micro_topic, q.archetype;

-- 5. Grant access permissions
GRANT SELECT ON public.students TO anon, authenticated, service_role;
GRANT SELECT ON public.student_attempts TO anon, authenticated, service_role;
GRANT SELECT ON public.pacing_analytics_summary TO anon, authenticated, service_role;
