-- =============================================================================
-- Migration: 20261106_razorpay_payments_table.sql
-- Description: Creates the authoritative public.payments ledger table for
--              Razorpay integration with strict RLS and immutability constraints.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'razorpay' CHECK (provider IN ('razorpay', 'mock')),
    razorpay_order_id TEXT NOT NULL UNIQUE,
    razorpay_payment_id TEXT UNIQUE,
    amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed', 'refunded')),
    plan TEXT NOT NULL DEFAULT 'Gold Pass',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

-- Optimize query performance for user lookups and provider reference queries
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order_id ON public.payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_payment_id ON public.payments(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can select own payments" ON public.payments;
DROP POLICY IF EXISTS "Deny all client inserts" ON public.payments;
DROP POLICY IF EXISTS "Deny all client updates" ON public.payments;
DROP POLICY IF EXISTS "Deny all client deletes" ON public.payments;

-- Authenticated candidates can read only their own payment records
CREATE POLICY "Users can select own payments"
    ON public.payments
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Explicitly revoke write permissions from client roles (anon, authenticated).
-- Only the privileged service_role can INSERT, UPDATE, or DELETE payment records.
REVOKE INSERT, UPDATE, DELETE ON public.payments FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.payments FROM authenticated;
GRANT ALL ON public.payments TO service_role;

COMMENT ON TABLE public.payments IS
'Immutable audit ledger for Razorpay checkout orders and verified transactions.';
