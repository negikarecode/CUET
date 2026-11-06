-- =============================================================================
-- Migration: 20261106_coach_chat_tables.sql
-- Description: Creates CUET Coach Chat persistence layer:
--   1. public.chat_threads
--   2. public.chat_messages
--   3. public.chat_feedback
--   4. public.chat_usage_daily
--   With cached (SELECT auth.uid()) Row-Level Security and performance indexes.
--
-- DO NOT RUN AUTOMATICALLY ON PRODUCTION. Review before executing in Supabase SQL editor.
-- =============================================================================

BEGIN;

-- 1. CHAT THREADS
CREATE TABLE IF NOT EXISTS public.chat_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'CUET Mentor Discussion',
    is_archived BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_threads_user_updated
    ON public.chat_threads (user_id, updated_at DESC);

ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own chat threads" ON public.chat_threads;
CREATE POLICY "Users can view own chat threads"
    ON public.chat_threads FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own chat threads" ON public.chat_threads;
CREATE POLICY "Users can insert own chat threads"
    ON public.chat_threads FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own chat threads" ON public.chat_threads;
CREATE POLICY "Users can update own chat threads"
    ON public.chat_threads FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete own chat threads" ON public.chat_threads;
CREATE POLICY "Users can delete own chat threads"
    ON public.chat_threads FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));


-- 2. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tool_calls JSONB,
    tokens_used INTEGER DEFAULT 0,
    model TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_thread_time
    ON public.chat_messages (thread_id, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_time
    ON public.chat_messages (user_id, created_at DESC);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own chat messages" ON public.chat_messages;
CREATE POLICY "Users can view own chat messages"
    ON public.chat_messages FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own chat messages" ON public.chat_messages;
CREATE POLICY "Users can insert own chat messages"
    ON public.chat_messages FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete own chat messages" ON public.chat_messages;
CREATE POLICY "Users can delete own chat messages"
    ON public.chat_messages FOR DELETE
    TO authenticated
    USING (user_id = (SELECT auth.uid()));


-- 3. CHAT FEEDBACK (UP/DOWN RATINGS)
CREATE TABLE IF NOT EXISTS public.chat_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES public.chat_messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating TEXT NOT NULL CHECK (rating IN ('up', 'down')),
    feedback_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_chat_feedback_user_msg UNIQUE (message_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_feedback_message
    ON public.chat_feedback (message_id);

ALTER TABLE public.chat_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own feedback" ON public.chat_feedback;
CREATE POLICY "Users can view own feedback"
    ON public.chat_feedback FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own feedback" ON public.chat_feedback;
CREATE POLICY "Users can insert own feedback"
    ON public.chat_feedback FOR INSERT
    TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own feedback" ON public.chat_feedback;
CREATE POLICY "Users can update own feedback"
    ON public.chat_feedback FOR UPDATE
    TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));


-- 4. DAILY CHAT USAGE (RATE LIMITING & QUOTAS)
CREATE TABLE IF NOT EXISTS public.chat_usage_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
    message_count INTEGER NOT NULL DEFAULT 1,
    tokens_total INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_chat_usage_user_date UNIQUE (user_id, usage_date)
);

CREATE INDEX IF NOT EXISTS idx_chat_usage_daily_lookup
    ON public.chat_usage_daily (user_id, usage_date);

ALTER TABLE public.chat_usage_daily ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own chat usage" ON public.chat_usage_daily;
CREATE POLICY "Users can view own chat usage"
    ON public.chat_usage_daily FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- Explicit Table Permissions
GRANT ALL ON public.chat_threads TO authenticated, service_role;
GRANT ALL ON public.chat_messages TO authenticated, service_role;
GRANT ALL ON public.chat_feedback TO authenticated, service_role;
REVOKE INSERT, UPDATE, DELETE ON public.chat_usage_daily FROM anon, authenticated;
GRANT ALL ON public.chat_usage_daily TO service_role;
GRANT SELECT ON public.chat_usage_daily TO authenticated;

COMMIT;

COMMENT ON TABLE public.chat_threads IS 'Conversational threads between CUET aspirants and the AI Academic Coach.';
COMMENT ON TABLE public.chat_messages IS 'Immutable chat message history and tool-call audit metadata.';
COMMENT ON TABLE public.chat_feedback IS 'Candidate response ratings (thumbs up/down) for diagnostic quality monitoring.';
COMMENT ON TABLE public.chat_usage_daily IS 'Daily candidate message counts and token consumption for fair-use governance.';
