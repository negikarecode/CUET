-- =============================================================================
-- Migration: 20261105_pending_registrations.sql
-- Description: Creates the pending_registrations table for strict two-stage OTP registration
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.pending_registrations (
    registration_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_normalized TEXT NOT NULL,
    encrypted_password TEXT NOT NULL,
    candidate_details JSONB NOT NULL DEFAULT '{}'::jsonb,
    otp_hash TEXT NOT NULL,
    attempts_remaining INTEGER NOT NULL DEFAULT 5,
    resend_count INTEGER NOT NULL DEFAULT 0,
    last_otp_sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'consumed', 'expired')),
    ip TEXT
);

-- Index for rapid lookup by email and status
CREATE INDEX IF NOT EXISTS idx_pending_registrations_lookup
ON public.pending_registrations (email_normalized, status, expires_at);

-- Row Level Security (RLS) Lockdown:
-- Exclusively accessed by backend service role. No anonymous public access.
ALTER TABLE public.pending_registrations ENABLE ROW LEVEL SECURITY;

-- Auto-cleanup function for expired pending registration records
CREATE OR REPLACE FUNCTION public.cleanup_expired_pending_registrations()
RETURNS trigger AS $$
BEGIN
    DELETE FROM public.pending_registrations
    WHERE expires_at < NOW() - INTERVAL '1 hour'
       OR status IN ('consumed', 'expired');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_cleanup_expired_pending_registrations ON public.pending_registrations;
CREATE TRIGGER trigger_cleanup_expired_pending_registrations
AFTER INSERT ON public.pending_registrations
EXECUTE FUNCTION public.cleanup_expired_pending_registrations();
