-- =============================================================================
-- Migration: 20261102_user_otp_codes.sql
-- Description: Creates the secure table for Brevo transactional email OTP codes
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_otp_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    otp_type TEXT NOT NULL CHECK (otp_type IN ('signup', 'login', 'recovery')),
    otp_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for high-performance atomic lookups by email and type
CREATE INDEX IF NOT EXISTS idx_user_otp_codes_lookup 
ON public.user_otp_codes (email, otp_type, expires_at);

-- Row Level Security (RLS) Lockdown:
-- Disallow public anon access entirely; strictly accessed by backend service role.
ALTER TABLE public.user_otp_codes ENABLE ROW LEVEL SECURITY;

-- Auto-cleanup function for expired OTP records (runs safely without blocking)
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS trigger AS $$
BEGIN
    DELETE FROM public.user_otp_codes
    WHERE expires_at < NOW() - INTERVAL '1 hour';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_cleanup_expired_otps ON public.user_otp_codes;
CREATE TRIGGER trigger_cleanup_expired_otps
AFTER INSERT ON public.user_otp_codes
EXECUTE FUNCTION public.cleanup_expired_otps();
