-- =============================================================================
-- Migration: 20261106_dpdp_consent_and_reporting.sql
-- Description: Adds DPDP Act 2023 consent tracking, minor candidate guardian
--              fields to public.profiles, and creates public.question_reports
--              with Row-Level Security (RLS) and audit indexes.
--
-- DO NOT RUN AUTOMATICALLY ON PRODUCTION. Review before executing in Supabase SQL editor.
-- =============================================================================

-- 1. Extend public.profiles with DPDP consent and guardian verification fields
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS consent_accepted_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS consent_version TEXT DEFAULT 'v1.0',
    ADD COLUMN IF NOT EXISTS dob DATE,
    ADD COLUMN IF NOT EXISTS guardian_consent BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS guardian_email TEXT;

-- Index for consent audit compliance
CREATE INDEX IF NOT EXISTS idx_profiles_consent_audit 
    ON public.profiles (consent_accepted_at, consent_version);

-- 2. Create public.question_reports for candidate feedback & question flagging
CREATE TABLE IF NOT EXISTS public.question_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    test_id TEXT,
    report_reason TEXT NOT NULL CHECK (
        report_reason IN (
            'wrong_answer',
            'ambiguous_question',
            'factual_error',
            'out_of_syllabus',
            'formatting_or_typo',
            'other'
        )
    ),
    comment TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance & Rate Limiting Indexes
CREATE INDEX IF NOT EXISTS idx_question_reports_user_time 
    ON public.question_reports (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_question_reports_question 
    ON public.question_reports (question_id);

CREATE INDEX IF NOT EXISTS idx_question_reports_status 
    ON public.question_reports (status);

-- 3. Row-Level Security (RLS) for public.question_reports
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to submit their own question reports
DROP POLICY IF EXISTS "Users can insert own question reports" ON public.question_reports;
CREATE POLICY "Users can insert own question reports"
    ON public.question_reports
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to view only their own question reports
DROP POLICY IF EXISTS "Users can view own question reports" ON public.question_reports;
CREATE POLICY "Users can view own question reports"
    ON public.question_reports
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Service role bypass is automatic in Supabase for backend review/admin processing.

-- 4. Comment annotations for database documentation
COMMENT ON TABLE public.question_reports IS 'Aspirant error reports and question quality feedback under DPDP 2023 accuracy governance.';
COMMENT ON COLUMN public.profiles.guardian_consent IS 'Explicit parental or legal guardian consent flag for aspirants under 18 years of age (DPDP Act 2023 Section 9).';
COMMENT ON COLUMN public.profiles.guardian_email IS 'Registered parent or legal guardian email for minor notification and verification records.';
