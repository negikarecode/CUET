-- =============================================================================
-- CUETMATE: PAYMENTS, PROMOTIONS, ENTITLEMENTS & USAGE LEDGER MIGRATION
-- Migration File: supabase/migrations/20261019_payments_and_entitlements.sql
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── 1. PAYMENT ORDERS TABLE ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payment_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'razorpay' CHECK (provider IN ('razorpay', 'cashfree', 'mock')),
    provider_order_id TEXT UNIQUE NOT NULL,
    plan_id TEXT NOT NULL,
    amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    is_promotional BOOLEAN NOT NULL DEFAULT FALSE,
    promotional_slot_number INTEGER CHECK (promotional_slot_number IS NULL OR (promotional_slot_number BETWEEN 1 AND 100)),
    status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'attempted', 'paid', 'failed', 'cancelled', 'refunded')),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_orders_user ON public.payment_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_provider_order ON public.payment_orders(provider_order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON public.payment_orders(status);

-- ─── 2. PAYMENT TRANSACTIONS TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.payment_orders(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'razorpay',
    provider_payment_id TEXT UNIQUE NOT NULL,
    provider_signature TEXT,
    amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL CHECK (status IN ('captured', 'failed', 'refunded', 'disputed')),
    raw_payload JSONB DEFAULT '{}'::JSONB,
    verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_user ON public.payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_payment_id ON public.payment_transactions(provider_payment_id);

-- ─── 3. PROMOTIONAL SLOTS (EXACTLY 100 SLOTS AT ₹499) ────────────────────────
CREATE TABLE IF NOT EXISTS public.promotional_slots (
    slot_number INTEGER PRIMARY KEY CHECK (slot_number BETWEEN 1 AND 100),
    order_id UUID REFERENCES public.payment_orders(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'reserved' CHECK (status IN ('reserved', 'claimed', 'released')),
    reserved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    claimed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_promotional_slots_status ON public.promotional_slots(status, expires_at);

-- ─── 4. USER USAGE LEDGER ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_usage_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_type TEXT NOT NULL CHECK (session_type IN ('mock', 'practice', 'pyq')),
    test_id TEXT NOT NULL,
    canonical_subject TEXT NOT NULL,
    session_id TEXT NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_usage_session UNIQUE (user_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_user_usage_ledger_user_type ON public.user_usage_ledger(user_id, session_type);
CREATE INDEX IF NOT EXISTS idx_user_usage_ledger_user_subject ON public.user_usage_ledger(user_id, session_type, canonical_subject);

-- ─── 5. ROW-LEVEL SECURITY POLICIES ──────────────────────────────────────────
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotional_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_usage_ledger ENABLE ROW LEVEL SECURITY;

-- Candidates can view their own payment orders and transactions
CREATE POLICY "Users can view own payment orders"
    ON public.payment_orders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
    ON public.payment_transactions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own usage ledger"
    ON public.user_usage_ledger FOR SELECT
    USING (auth.uid() = user_id);

-- Promotional slots public read (count only)
CREATE POLICY "Public can view claimed promotional slots count"
    ON public.promotional_slots FOR SELECT
    TO authenticated, anon
    USING (true);

-- Disallow client direct inserts/updates/deletes on payment tables
-- (Only Service Role / Admin client can write)
CREATE POLICY "Service role manages orders"
    ON public.payment_orders FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);

CREATE POLICY "Service role manages transactions"
    ON public.payment_transactions FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);

CREATE POLICY "Service role manages slots"
    ON public.promotional_slots FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);

CREATE POLICY "Service role manages usage"
    ON public.user_usage_ledger FOR ALL
    TO service_role
    USING (true) WITH CHECK (true);
