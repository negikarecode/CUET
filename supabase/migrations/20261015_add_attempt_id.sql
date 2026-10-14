-- Migration: Add attempt_id to user_attempts table and enforce idempotency
-- Date: 2026-10-15

-- 1. Add attempt_id UUID column to public.user_attempts
ALTER TABLE public.user_attempts 
ADD COLUMN IF NOT EXISTS attempt_id UUID;

-- 2. Create index on (user_id, attempt_id) for rapid idempotent lookups
CREATE INDEX IF NOT EXISTS idx_user_attempts_user_attempt 
ON public.user_attempts (user_id, attempt_id);

-- 3. Comment explaining attempt_id lifecycle
COMMENT ON COLUMN public.user_attempts.attempt_id IS 'Unique client-generated session attempt UUID ensuring idempotent test submissions';
