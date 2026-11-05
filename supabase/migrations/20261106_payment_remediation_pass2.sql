-- ==============================================================================
-- CUETMATE SECURITY REMEDIATION: PAYMENT INFRASTRUCTURE PASS 2
-- Migration: 20261106_payment_remediation_pass2.sql
--
-- PURPOSE:
-- 1. Create public.payment_refunds and public.payment_disputes audit ledgers
--    with unique provider IDs to prevent duplicate webhook double-counting.
-- 2. Expand public.payment_transactions status domain to support partial refunds
--    ('partially_refunded') and lost disputes ('disputed_lost').
-- 3. Add refunded_amount_paise and dispute_status columns to payment_transactions.
-- 4. Harden public.reserve_promotional_slot RPC:
--    - Verify order exists, candidate ownership, is_promotional = true, and status IN ('created', 'pending').
-- 5. Harden public.fulfill_payment_order RPC:
--    - Enforce EXACT amount match (reject underpayment and overpayment).
--    - Validate existing transaction order_id matches incoming order on replay (never return
--      idempotent success for a payment bound to a different order).
--    - Prevent transaction reassignment via immutable order_id.
--    - Preserve sequential subscription extensions from existing expiration.
-- 6. Provide database-level public.reconcile_user_entitlements(UUID) RPC with
--    row-level lock (FOR UPDATE) and sequential duration stacking for concurrency safety.
-- ==============================================================================

BEGIN;

-- ─── 1. PAYMENT REFUNDS AUDIT LEDGER ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payment_refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES public.payment_transactions(id) ON DELETE SET NULL,
    provider TEXT NOT NULL DEFAULT 'razorpay',
    provider_refund_id TEXT UNIQUE NOT NULL,
    payment_id TEXT NOT NULL,
    amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'processed' CHECK (status IN ('created', 'processed', 'failed')),
    raw_payload JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_refunds_payment_id ON public.payment_refunds(payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_refunds_tx ON public.payment_refunds(transaction_id);

ALTER TABLE public.payment_refunds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own refunds" ON public.payment_refunds;
CREATE POLICY "Users can view own refunds"
    ON public.payment_refunds FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.payment_transactions pt
        WHERE pt.id = payment_refunds.transaction_id AND pt.user_id = auth.uid()
    ));

REVOKE ALL ON public.payment_refunds FROM PUBLIC;
REVOKE ALL ON public.payment_refunds FROM anon;
GRANT SELECT ON public.payment_refunds TO authenticated;
GRANT ALL ON public.payment_refunds TO service_role;

-- ─── 2. PAYMENT DISPUTES AUDIT LEDGER ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payment_disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID REFERENCES public.payment_transactions(id) ON DELETE SET NULL,
    provider TEXT NOT NULL DEFAULT 'razorpay',
    provider_dispute_id TEXT UNIQUE NOT NULL,
    payment_id TEXT NOT NULL,
    amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'under_review' CHECK (status IN ('under_review', 'action_required', 'won', 'lost', 'closed')),
    reason_code TEXT,
    raw_payload JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_disputes_payment_id ON public.payment_disputes(payment_id);
CREATE INDEX IF NOT EXISTS idx_payment_disputes_tx ON public.payment_disputes(transaction_id);

ALTER TABLE public.payment_disputes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own disputes" ON public.payment_disputes;
CREATE POLICY "Users can view own disputes"
    ON public.payment_disputes FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.payment_transactions pt
        WHERE pt.id = payment_disputes.transaction_id AND pt.user_id = auth.uid()
    ));

REVOKE ALL ON public.payment_disputes FROM PUBLIC;
REVOKE ALL ON public.payment_disputes FROM anon;
GRANT SELECT ON public.payment_disputes TO authenticated;
GRANT ALL ON public.payment_disputes TO service_role;

-- ─── 3. EXPAND PAYMENT TRANSACTIONS STATUS & COLUMNS ──────────────────────────
ALTER TABLE public.payment_transactions 
    ADD COLUMN IF NOT EXISTS refunded_amount_paise INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.payment_transactions 
    ADD COLUMN IF NOT EXISTS dispute_status TEXT;

ALTER TABLE public.payment_transactions 
    DROP CONSTRAINT IF EXISTS payment_transactions_status_check;

ALTER TABLE public.payment_transactions 
    ADD CONSTRAINT payment_transactions_status_check 
    CHECK (status IN ('captured', 'failed', 'refunded', 'partially_refunded', 'disputed', 'disputed_lost'));

-- ─── 4. HARDENED PROMOTIONAL SLOT RESERVATION RPC ─────────────────────────────
CREATE OR REPLACE FUNCTION public.reserve_promotional_slot(
    p_user_id UUID,
    p_order_id UUID
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_order RECORD;
    v_slot_number INTEGER;
BEGIN
    IF p_user_id IS NULL OR p_order_id IS NULL THEN
        RAISE EXCEPTION 'User ID and Order ID are required to reserve a promotional slot'
            USING ERRCODE = '22023';
    END IF;

    -- Validate order exists, candidate ownership, promotional flag, and status
    SELECT id, user_id, is_promotional, status
    INTO v_order
    FROM public.payment_orders
    WHERE id = p_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Order % not found for promotional slot reservation', p_order_id
            USING ERRCODE = 'P0002';
    END IF;

    IF v_order.user_id <> p_user_id THEN
        RAISE EXCEPTION 'Order % belongs to a different candidate', p_order_id
            USING ERRCODE = '42501';
    END IF;

    IF NOT coalesce(v_order.is_promotional, false) THEN
        RAISE EXCEPTION 'Order % is not marked as promotional', p_order_id
            USING ERRCODE = '22023';
    END IF;

    IF v_order.status NOT IN ('created', 'pending') THEN
        RAISE EXCEPTION 'Order % is in invalid state % for slot reservation', p_order_id, v_order.status
            USING ERRCODE = '22023';
    END IF;

    -- Atomically lock the lowest available or expired slot
    SELECT ps.slot_number INTO v_slot_number
    FROM public.promotional_slots ps
    WHERE ps.status = 'released'
       OR (ps.status = 'reserved' AND ps.expires_at < clock_timestamp())
    ORDER BY ps.slot_number ASC
    FOR UPDATE SKIP LOCKED
    LIMIT 1;

    IF v_slot_number IS NULL THEN
        RETURN NULL;
    END IF;

    -- Reserve the slot for 30 minutes
    UPDATE public.promotional_slots
    SET status = 'reserved',
        order_id = p_order_id,
        user_id = p_user_id,
        reserved_at = clock_timestamp(),
        expires_at = clock_timestamp() + INTERVAL '30 minutes',
        claimed_at = NULL
    WHERE slot_number = v_slot_number;

    -- Synchronize order record with the reserved slot number
    UPDATE public.payment_orders
    SET promotional_slot_number = v_slot_number,
        updated_at = clock_timestamp()
    WHERE id = p_order_id;

    RETURN v_slot_number;
END;
$$;

REVOKE ALL ON FUNCTION public.reserve_promotional_slot(UUID, UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reserve_promotional_slot(UUID, UUID) FROM anon;
REVOKE ALL ON FUNCTION public.reserve_promotional_slot(UUID, UUID) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_promotional_slot(UUID, UUID) TO service_role;

-- ─── 5. HARDENED PAYMENT FULFILLMENT RPC (PASS 2) ─────────────────────────────
CREATE OR REPLACE FUNCTION public.fulfill_payment_order(
    p_user_id UUID,
    p_provider TEXT,
    p_provider_order_id TEXT,
    p_provider_payment_id TEXT,
    p_provider_signature TEXT,
    p_amount_paise INTEGER,
    p_currency TEXT,
    p_tier TEXT,
    p_expires_at TIMESTAMPTZ,
    p_bonus_coins INTEGER DEFAULT 500,
    p_raw_payload JSONB DEFAULT '{}'::JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_order RECORD;
    v_profile RECORD;
    v_existing_tx RECORD;
    v_existing_order_payment_id TEXT;
    v_coins_to_award INTEGER := 0;
    v_calculated_expiry TIMESTAMPTZ;
    v_slot_updated INTEGER := 0;
    v_derived_tier TEXT;
    v_base_bonus_coins INTEGER := 500;
    v_duration_days INTEGER := 365;
BEGIN
    -- 0. Input invariant validations
    IF p_amount_paise IS NULL OR p_amount_paise <= 0 THEN
        RAISE EXCEPTION 'Invalid payment amount: % paise', p_amount_paise
            USING ERRCODE = '22023';
    END IF;

    IF p_currency IS NULL OR upper(btrim(p_currency)) <> 'INR' THEN
        RAISE EXCEPTION 'Invalid currency: %, expected INR', p_currency
            USING ERRCODE = '22023';
    END IF;

    IF p_provider IS NULL OR p_provider NOT IN ('razorpay', 'cashfree', 'mock') THEN
        RAISE EXCEPTION 'Invalid provider: %', p_provider
            USING ERRCODE = '22023';
    END IF;

    IF p_provider_order_id IS NULL OR btrim(p_provider_order_id) = '' THEN
        RAISE EXCEPTION 'Missing provider order ID: payment fulfillment requires a valid provider order'
            USING ERRCODE = '22023';
    END IF;

    IF p_provider_payment_id IS NULL OR btrim(p_provider_payment_id) = '' THEN
        RAISE EXCEPTION 'Missing provider payment ID: payment fulfillment requires a valid provider payment'
            USING ERRCODE = '22023';
    END IF;

    -- 1. Lock candidate profile row FOR UPDATE
    SELECT id, is_premium, campus_coins, subscription_expires_at, subscription_tier
    INTO v_profile
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Candidate profile % not found for payment fulfillment', p_user_id
            USING ERRCODE = 'P0002';
    END IF;

    -- 2. Lock payment order row FOR UPDATE and validate
    SELECT id, user_id, provider, plan_id, status, amount_paise, currency, is_promotional, promotional_slot_number
    INTO v_order
    FROM public.payment_orders
    WHERE provider_order_id = p_provider_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Payment order % not found for fulfillment', p_provider_order_id
            USING ERRCODE = 'P0002';
    END IF;

    -- Enforce candidate ownership
    IF v_order.user_id <> p_user_id THEN
        RAISE EXCEPTION 'Order candidate mismatch: order belongs to %, requested by %', v_order.user_id, p_user_id
            USING ERRCODE = '42501';
    END IF;

    -- Enforce provider matching
    IF v_order.provider IS DISTINCT FROM p_provider THEN
        RAISE EXCEPTION 'PAYMENT_PROVIDER_MISMATCH: Order was created for %, received payment via %',
            v_order.provider, p_provider
            USING ERRCODE = '22023';
    END IF;

    -- Enforce EXACT amount match (Requirement P1: reject both underpayment and overpayment)
    IF p_amount_paise <> v_order.amount_paise THEN
        RAISE EXCEPTION 'PAYMENT_AMOUNT_MISMATCH: Order requires % paise, received % paise',
            v_order.amount_paise, p_amount_paise
            USING ERRCODE = '22023';
    END IF;

    -- Enforce currency integrity
    IF upper(btrim(v_order.currency)) <> upper(btrim(p_currency)) THEN
        RAISE EXCEPTION 'PAYMENT_CURRENCY_MISMATCH: Order requires %, received %',
            v_order.currency, p_currency
            USING ERRCODE = '22023';
    END IF;

    -- Derive authoritative subscription tier, duration, and bonus coins from stored plan_id
    CASE v_order.plan_id
        WHEN 'all_access_pass_799', 'all_access_pass' THEN
            v_derived_tier := 'all_access_pass';
            v_base_bonus_coins := 500;
            v_duration_days := 365;
            IF v_order.is_promotional THEN
                IF v_order.amount_paise <> 200 THEN
                    RAISE EXCEPTION 'PAYMENT_AMOUNT_MISMATCH: Promotional all_access_pass requires 200 paise, order has %', v_order.amount_paise USING ERRCODE = '22023';
                END IF;
            ELSE
                IF v_order.amount_paise <> 79900 THEN
                    RAISE EXCEPTION 'PAYMENT_AMOUNT_MISMATCH: Standard all_access_pass requires 79900 paise, order has %', v_order.amount_paise USING ERRCODE = '22023';
                END IF;
            END IF;
        WHEN 'ai_practice_pass_499', 'ai_practice_pass' THEN
            v_derived_tier := 'ai_practice_pass';
            v_base_bonus_coins := 250;
            v_duration_days := 365;
            IF v_order.amount_paise <> 49900 THEN
                RAISE EXCEPTION 'PAYMENT_AMOUNT_MISMATCH: ai_practice_pass_499 requires 49900 paise, order has %', v_order.amount_paise USING ERRCODE = '22023';
            END IF;
        WHEN 'ai_pass_399' THEN
            v_derived_tier := 'all_access_pass';
            v_base_bonus_coins := 200;
            v_duration_days := 365;
            IF v_order.amount_paise <> 39900 THEN
                RAISE EXCEPTION 'PAYMENT_AMOUNT_MISMATCH: ai_pass_399 requires 39900 paise, order has %', v_order.amount_paise USING ERRCODE = '22023';
            END IF;
        ELSE
            RAISE EXCEPTION 'UNAUTHORIZED_PLAN: Plan identifier % is not recognized', v_order.plan_id
                USING ERRCODE = '22023';
    END CASE;

    -- 3. Idempotency Check: Examine existing captured transactions for this payment ID
    SELECT id, order_id, user_id, status, amount_paise, currency, provider
    INTO v_existing_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_provider_payment_id
    FOR UPDATE;

    IF FOUND THEN
        -- Requirement P2: Never return idempotent success for a payment associated with a different order
        IF v_existing_tx.order_id IS DISTINCT FROM v_order.id THEN
            RAISE EXCEPTION 'Payment ID % is already bound to a different order %',
                p_provider_payment_id, v_existing_tx.order_id
                USING ERRCODE = '23505';
        END IF;

        IF v_existing_tx.user_id <> p_user_id THEN
            RAISE EXCEPTION 'Payment ID % belongs to a different candidate profile', p_provider_payment_id
                USING ERRCODE = '42501';
        END IF;

        IF v_existing_tx.provider IS DISTINCT FROM p_provider THEN
            RAISE EXCEPTION 'Payment provider mismatch on replay: recorded %, received %',
                v_existing_tx.provider, p_provider
                USING ERRCODE = '22023';
        END IF;

        IF v_existing_tx.amount_paise <> p_amount_paise THEN
            RAISE EXCEPTION 'Payment amount mismatch on replay: recorded %, received %',
                v_existing_tx.amount_paise, p_amount_paise
                USING ERRCODE = '22023';
        END IF;

        IF upper(btrim(v_existing_tx.currency)) <> upper(btrim(p_currency)) THEN
            RAISE EXCEPTION 'Payment currency mismatch on replay: recorded %, received %',
                v_existing_tx.currency, p_currency
                USING ERRCODE = '22023';
        END IF;

        IF v_existing_tx.status = 'captured' THEN
            RETURN jsonb_build_object(
                'success', true,
                'idempotent', true,
                'is_premium', coalesce(v_profile.is_premium, false) AND (v_profile.subscription_expires_at IS NULL OR v_profile.subscription_expires_at > clock_timestamp()),
                'message', 'Payment transaction already recorded and active.',
                'tier', coalesce(v_profile.subscription_tier, v_derived_tier, 'all_access_pass'),
                'expires_at', v_profile.subscription_expires_at,
                'bonus_coins_awarded', 0
            );
        END IF;
    END IF;

    -- Prevent fulfilling an order already paid under a DIFFERENT payment ID
    IF v_order.status = 'paid' THEN
        SELECT provider_payment_id INTO v_existing_order_payment_id
        FROM public.payment_transactions
        WHERE order_id = v_order.id
          AND status = 'captured'
        LIMIT 1;

        IF v_existing_order_payment_id IS NOT NULL AND v_existing_order_payment_id <> p_provider_payment_id THEN
            RAISE EXCEPTION 'Order % is already fulfilled under different payment ID %',
                v_order.id, v_existing_order_payment_id
                USING ERRCODE = '23505';
        END IF;
    END IF;

    -- 4. Promotional Slot Allocation & Invariant Enforcement
    IF v_order.is_promotional THEN
        UPDATE public.promotional_slots
        SET status = 'claimed',
            claimed_at = clock_timestamp(),
            user_id = p_user_id,
            order_id = v_order.id
        WHERE order_id = v_order.id
          AND status IN ('reserved', 'released');

        GET DIAGNOSTICS v_slot_updated = ROW_COUNT;

        IF v_slot_updated = 0 THEN
            UPDATE public.promotional_slots
            SET status = 'claimed',
                claimed_at = clock_timestamp(),
                user_id = p_user_id,
                order_id = v_order.id
            WHERE slot_number = (
                SELECT ps.slot_number
                FROM public.promotional_slots ps
                WHERE ps.status = 'released'
                   OR (ps.status = 'reserved' AND ps.expires_at < clock_timestamp())
                ORDER BY ps.slot_number ASC
                FOR UPDATE SKIP LOCKED
                LIMIT 1
            );

            GET DIAGNOSTICS v_slot_updated = ROW_COUNT;
        END IF;

        -- INVARIANT: Promotional orders MUST have a successfully claimed slot
        IF v_slot_updated = 0 THEN
            RAISE EXCEPTION 'PROMOTIONAL_INVENTORY_EXHAUSTED: All promotional slots are claimed. Cannot fulfill promotional order %',
                p_provider_order_id
                USING ERRCODE = '55P03';
        END IF;

        UPDATE public.payment_orders
        SET promotional_slot_number = (
            SELECT ps.slot_number
            FROM public.promotional_slots ps
            WHERE ps.order_id = v_order.id
            LIMIT 1
        )
        WHERE id = v_order.id
          AND promotional_slot_number IS NULL;
    END IF;

    -- 5. Record payment transaction (IMMUTABLE order_id on conflict)
    INSERT INTO public.payment_transactions (
        order_id,
        user_id,
        provider,
        provider_payment_id,
        provider_signature,
        amount_paise,
        currency,
        status,
        raw_payload,
        verified_at
    ) VALUES (
        v_order.id,
        p_user_id,
        p_provider,
        p_provider_payment_id,
        p_provider_signature,
        p_amount_paise,
        p_currency,
        'captured',
        p_raw_payload,
        clock_timestamp()
    )
    ON CONFLICT (provider_payment_id) DO UPDATE
    SET status = 'captured',
        verified_at = clock_timestamp(),
        raw_payload = EXCLUDED.raw_payload
    WHERE payment_transactions.order_id = EXCLUDED.order_id;

    -- 6. Mark payment order as paid
    UPDATE public.payment_orders
    SET status = 'paid',
        updated_at = clock_timestamp()
    WHERE id = v_order.id;

    -- 7. Calculate bonus coins (award on first upgrade; do not double-award on renewals)
    IF NOT coalesce(v_profile.is_premium, false) THEN
        v_coins_to_award := v_base_bonus_coins;
    ELSE
        v_coins_to_award := 0;
    END IF;

    -- 8. Sequential Subscription Extension (Preserve chronological stacking)
    IF v_profile.subscription_expires_at IS NOT NULL AND v_profile.subscription_expires_at > clock_timestamp() THEN
        v_calculated_expiry := v_profile.subscription_expires_at + (v_duration_days || ' days')::INTERVAL;
    ELSE
        v_calculated_expiry := clock_timestamp() + (v_duration_days || ' days')::INTERVAL;
    END IF;

    -- 9. Grant Premium entitlement and bonus coins atomically
    UPDATE public.profiles
    SET is_premium = true,
        subscription_tier = v_derived_tier,
        subscription_expires_at = v_calculated_expiry,
        campus_coins = coalesce(v_profile.campus_coins, 50) + v_coins_to_award,
        updated_at = clock_timestamp()
    WHERE id = p_user_id;

    -- 10. Return authoritative success response
    RETURN jsonb_build_object(
        'success', true,
        'idempotent', false,
        'is_premium', true,
        'message', 'CUETMate Premium successfully activated!',
        'tier', v_derived_tier,
        'expires_at', v_calculated_expiry,
        'bonus_coins_awarded', v_coins_to_award
    );
END;
$$;

REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM anon;
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) TO service_role;

-- ─── 6. ATOMIC RECONCILE USER ENTITLEMENTS RPC ────────────────────────────────
CREATE OR REPLACE FUNCTION public.reconcile_user_entitlements(
    p_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_profile RECORD;
    v_tx RECORD;
    v_current_expiry TIMESTAMPTZ := NULL;
    v_highest_tier TEXT := 'free';
    v_tx_duration_days INTEGER := 365;
    v_has_valid_tx BOOLEAN := false;
BEGIN
    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'User ID is required for entitlement reconciliation'
            USING ERRCODE = '22023';
    END IF;

    -- Lock candidate profile row FOR UPDATE to prevent race conditions during concurrent webhooks
    SELECT id, is_premium, subscription_tier, subscription_expires_at
    INTO v_profile
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Profile % not found for entitlement reconciliation', p_user_id
            USING ERRCODE = 'P0002';
    END IF;

    -- Chronologically scan all qualifying transactions for this user:
    -- 'captured', 'partially_refunded', and 'disputed' (under review)
    -- Exclude parent orders that are refunded or cancelled.
    FOR v_tx IN
        SELECT pt.id, pt.verified_at, pt.status, po.plan_id, po.status AS order_status
        FROM public.payment_transactions pt
        JOIN public.payment_orders po ON pt.order_id = po.id
        WHERE pt.user_id = p_user_id
          AND pt.status IN ('captured', 'partially_refunded', 'disputed')
          AND po.status NOT IN ('refunded', 'cancelled')
        ORDER BY pt.verified_at ASC
    LOOP
        v_has_valid_tx := true;

        -- Determine plan duration and tier
        CASE v_tx.plan_id
            WHEN 'all_access_pass_799', 'all_access_pass' THEN
                v_tx_duration_days := 365;
                v_highest_tier := 'all_access_pass';
            WHEN 'ai_practice_pass_499', 'ai_practice_pass' THEN
                v_tx_duration_days := 365;
                IF v_highest_tier <> 'all_access_pass' THEN
                    v_highest_tier := 'ai_practice_pass';
                END IF;
            WHEN 'ai_pass_399' THEN
                v_tx_duration_days := 365;
                v_highest_tier := 'all_access_pass';
            ELSE
                v_tx_duration_days := 365;
                IF v_highest_tier = 'free' THEN
                    v_highest_tier := 'all_access_pass';
                END IF;
        END CASE;

        -- Sequential duration stacking
        IF v_current_expiry IS NOT NULL AND v_tx.verified_at < v_current_expiry THEN
            v_current_expiry := v_current_expiry + (v_tx_duration_days || ' days')::INTERVAL;
        ELSE
            v_current_expiry := v_tx.verified_at + (v_tx_duration_days || ' days')::INTERVAL;
        END IF;
    END LOOP;

    -- Zero qualifying transactions remain: revoke Premium
    IF NOT v_has_valid_tx OR v_current_expiry IS NULL OR v_current_expiry <= clock_timestamp() THEN
        UPDATE public.profiles
        SET is_premium = false,
            subscription_tier = 'free',
            subscription_expires_at = v_current_expiry,
            updated_at = clock_timestamp()
        WHERE id = p_user_id;

        RETURN jsonb_build_object(
            'is_premium', false,
            'subscription_tier', 'free',
            'subscription_expires_at', v_current_expiry
        );
    END IF;

    -- Surviving active purchases exist: reaffirm Premium
    UPDATE public.profiles
    SET is_premium = true,
        subscription_tier = v_highest_tier,
        subscription_expires_at = v_current_expiry,
        updated_at = clock_timestamp()
    WHERE id = p_user_id;

    RETURN jsonb_build_object(
        'is_premium', true,
        'subscription_tier', v_highest_tier,
        'subscription_expires_at', v_current_expiry
    );
END;
$$;

REVOKE ALL ON FUNCTION public.reconcile_user_entitlements(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reconcile_user_entitlements(UUID) FROM anon;
REVOKE ALL ON FUNCTION public.reconcile_user_entitlements(UUID) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.reconcile_user_entitlements(UUID) TO service_role;

COMMENT ON FUNCTION public.reconcile_user_entitlements IS
'Atomically reconciles candidate entitlements with row-level locking (FOR UPDATE) and sequential duration stacking for concurrency safety.';

COMMIT;
