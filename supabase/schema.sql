-- =============================================================================
-- CUET AI-PREP: MASTER PRODUCTION POSTGRESQL SCHEMA (CLEAN SLATE)
-- Architecture: Single Source of Truth for CBT Engine, 4D Question Matrix,
--               Pacing Analytics, Zero-Token AI Diagnosis Cache, and Sunday Ritual
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. PROFILES TABLE (public.profiles)
-- Synchronized with Supabase auth.users
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    target_stream TEXT NOT NULL DEFAULT 'Commerce' CHECK (target_stream IN ('Science', 'Commerce', 'Humanities')),
    target_university TEXT DEFAULT 'Delhi University',
    target_college TEXT DEFAULT 'SRCC',
    exam_date DATE DEFAULT '2026-05-15',
    daily_study_hours INTEGER DEFAULT 4,
    selected_subjects TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    campus_coins INTEGER NOT NULL DEFAULT 0 CHECK (campus_coins >= 0),
    current_streak INTEGER NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
    last_practice_date DATE,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    subscription_tier TEXT DEFAULT 'free',
    subscription_expires_at TIMESTAMPTZ,
    last_adaptive_drill_at TIMESTAMPTZ,
    total_questions_attempted INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles (xp DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_stream ON public.profiles (target_stream);

-- =============================================================================
-- 2. QUESTIONS TABLE WITH 4D DIAGNOSTIC METADATA (public.questions)
-- Dimensions: Subject -> Chapter -> Micro-Topic -> NCERT Reference & Archetype
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    chapter TEXT NOT NULL,
    micro_topic TEXT NOT NULL,
    ncert_reference TEXT NOT NULL,
    archetype TEXT NOT NULL CHECK (
        archetype IN (
            'Direct Fact',
            'Assertion-Reasoning',
            'Match the Following',
            'Case-Study MCQ',
            'Numerical'
        )
    ),
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    explanation TEXT NOT NULL,
    is_pyq BOOLEAN NOT NULL DEFAULT FALSE,
    pyq_year INTEGER CHECK (pyq_year IS NULL OR (pyq_year >= 2020 AND pyq_year <= 2030)),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_subject_chapter ON public.questions (subject, chapter);
CREATE INDEX IF NOT EXISTS idx_questions_micro_topic ON public.questions (micro_topic);
CREATE INDEX IF NOT EXISTS idx_questions_archetype ON public.questions (archetype);
CREATE INDEX IF NOT EXISTS idx_questions_pyq ON public.questions (is_pyq, pyq_year);

-- =============================================================================
-- 3. TESTS & JUNCTION TABLES (public.tests & public.test_questions)
-- Strict NTA CBT 50-Question Model (40 to attempt within 45-60 minutes)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    total_questions INTEGER NOT NULL DEFAULT 50 CHECK (total_questions > 0),
    duration_minutes INTEGER NOT NULL DEFAULT 60 CHECK (duration_minutes > 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.test_questions (
    test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL CHECK (order_index >= 1),
    PRIMARY KEY (test_id, question_id),
    CONSTRAINT uq_test_question_order UNIQUE (test_id, order_index)
);

CREATE INDEX IF NOT EXISTS idx_test_questions_test_id ON public.test_questions (test_id, order_index ASC);

-- =============================================================================
-- 4. USER ATTEMPTS & PACING ANALYTICS (public.user_attempts)
-- Captures question-level time sinks (>90s) and choice evaluation
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.user_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_option CHAR(1) CHECK (selected_option IS NULL OR selected_option IN ('A', 'B', 'C', 'D')),
    is_correct BOOLEAN,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0 CHECK (time_spent_seconds >= 0),
    is_time_sink BOOLEAN GENERATED ALWAYS AS (time_spent_seconds > 90) STORED,
    diagnostic_report JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_attempts_user_test ON public.user_attempts (user_id, test_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_time_sink ON public.user_attempts (user_id, is_time_sink) WHERE is_time_sink = TRUE;
CREATE INDEX IF NOT EXISTS idx_user_attempts_question ON public.user_attempts (question_id);

-- =============================================================================
-- 5. GAMIFICATION TROPHIES (public.trophies & public.user_trophies)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.trophies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    xp_reward INTEGER NOT NULL DEFAULT 0 CHECK (xp_reward >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_trophies (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    trophy_id TEXT NOT NULL REFERENCES public.trophies(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, trophy_id)
);

CREATE INDEX IF NOT EXISTS idx_user_trophies_user ON public.user_trophies (user_id);

-- =============================================================================
-- 6. ZERO-TOKEN AI DIAGNOSIS CACHE (public.ai_diagnosis_cache)
-- Indexed by hash(question_id + "_" + selected_option)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.ai_diagnosis_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cache_key TEXT UNIQUE NOT NULL,
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

-- =============================================================================
-- 7. SUNDAY MENTOR REPORTS (public.sunday_mentor_reports)
-- Persists weekly personalized debriefs generated once per Sunday
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.sunday_mentor_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    mentor_debrief TEXT NOT NULL,
    stats_summary JSONB NOT NULL DEFAULT '{}'::JSONB,
    redemption_test_id UUID REFERENCES public.tests(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_sunday_report_user_week UNIQUE (user_id, week_start_date)
);

CREATE INDEX IF NOT EXISTS idx_sunday_mentor_user_date ON public.sunday_mentor_reports(user_id, week_start_date DESC);

-- =============================================================================
-- 8. ANALYTICAL VIEW: PACING & TIME-SINK DIAGNOSTICS
-- Identifies questions where students waste >90 seconds with incorrect answers
-- =============================================================================
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

-- =============================================================================
-- 9. COMPATIBILITY VIEWS (students -> profiles, student_attempts -> user_attempts)
-- Ensures all submodules and background scripts resolve seamlessly
-- =============================================================================
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

-- =============================================================================
-- 10. AUTOMATIC USER PROFILE PROVISIONING TRIGGER
-- Seamlessly provisions public.profiles row whenever a new user signs up
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        target_stream,
        target_university,
        target_college,
        exam_date,
        daily_study_hours,
        xp,
        campus_coins,
        current_streak
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'CUET Aspirant'),
        COALESCE(NEW.raw_user_meta_data->>'target_stream', 'Commerce'),
        COALESCE(NEW.raw_user_meta_data->>'target_university', 'Delhi University'),
        COALESCE(NEW.raw_user_meta_data->>'target_college', 'SRCC'),
        '2026-05-15',
        4,
        0,
        50,
        0
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 11. ROW LEVEL SECURITY (RLS) & ACCESS CONTROL
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_diagnosis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunday_mentor_reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, User update own
CREATE POLICY "Allow public read access to basic profiles" ON public.profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow users to update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow service role full access to profiles" ON public.profiles FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Questions & Tests: Public read, Service Role write
CREATE POLICY "Allow public read access to questions" ON public.questions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow service role full access to questions" ON public.questions FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access to active tests" ON public.tests FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Allow service role full access to tests" ON public.tests FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access to test questions" ON public.test_questions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow service role full access to test questions" ON public.test_questions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- User Attempts: Strictly user private
CREATE POLICY "Allow users to view own attempts" ON public.user_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Allow users to record own attempts" ON public.user_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update own attempts" ON public.user_attempts FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow service role full access to user attempts" ON public.user_attempts FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Gamification Trophies
CREATE POLICY "Allow public read access to trophies" ON public.trophies FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow service role full access to trophies" ON public.trophies FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow users to view unlocked trophies" ON public.user_trophies FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow users to unlock own trophies" ON public.user_trophies FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow service role full access to user trophies" ON public.user_trophies FOR ALL TO service_role USING (true) WITH CHECK (true);

-- AI Diagnosis Cache: Shared zero-token read across all users
CREATE POLICY "Public read for ai_diagnosis_cache" ON public.ai_diagnosis_cache FOR SELECT USING (true);
CREATE POLICY "Authenticated users and service role can insert ai_diagnosis_cache" ON public.ai_diagnosis_cache FOR INSERT WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Allow service role full access to ai_diagnosis_cache" ON public.ai_diagnosis_cache FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Sunday Reports: User private
CREATE POLICY "Students can view own sunday_mentor_reports" ON public.sunday_mentor_reports FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Students can insert own sunday_mentor_reports" ON public.sunday_mentor_reports FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Allow service role full access to sunday_mentor_reports" ON public.sunday_mentor_reports FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Grant permissions on views
GRANT SELECT ON public.students TO anon, authenticated, service_role;
GRANT SELECT ON public.student_attempts TO anon, authenticated, service_role;
GRANT SELECT ON public.pacing_analytics_summary TO anon, authenticated, service_role;

-- =============================================================================
-- 12. SEED CORE GAMIFICATION TROPHIES
-- =============================================================================
INSERT INTO public.trophies (id, title, description, icon, xp_reward)
VALUES
    (
        'consistency-king',
        'Consistency King',
        'Maintained a continuous 7-day practice streak on NTA-style domain mocks.',
        'Flame',
        200
    ),
    (
        'ncert-sharpshooter',
        'NCERT Sharpshooter',
        'Achieved 90%+ accuracy across 50 questions with verified NCERT textbook page references.',
        'Crosshair',
        350
    ),
    (
        'speed-demon',
        'Speed Demon',
        'Solved domain questions in under 45 seconds average per question with positive net score.',
        'Zap',
        250
    ),
    (
        'the-phoenix',
        'The Phoenix',
        'Successfully remediated a flagged conceptual weak topic with 3 consecutive correct answers.',
        'Sparkles',
        500
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    xp_reward = EXCLUDED.xp_reward;
