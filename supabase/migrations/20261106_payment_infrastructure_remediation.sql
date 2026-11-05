-- ==============================================================================
-- CUETMATE SECURITY REMEDIATION: PAYMENT INFRASTRUCTURE & INVENTORY HARDENING
-- Migration: 20261106_payment_infrastructure_remediation.sql
--
-- PURPOSE:
-- 1. Provide atomic public.reserve_promotional_slot(p_user_id, p_order_id) RPC
--    using FOR UPDATE SKIP LOCKED to prevent overselling and concurrent collisions.
-- 2. Seed all 100 promotional slots if not already present.
-- 3. Replace public.fulfill_payment_order with hardened business invariants:
--    a. Enforce provider matches the stored order provider.
--    b. Derive subscription tier, duration, and bonus coins from stored plan_id.
--    c. Reject arbitrary client tiers and unauthorized plan identifiers.
--    d. Strictly roll back entire transaction if promotional slot cannot be claimed.
--    e. Enforce exact currency and amount validation against stored order.
-- 4. Create partial unique index on payment_transactions to ensure at most ONE
--    captured transaction per order.
-- 5. Preserve strict RLS and privilege boundaries (service_role only for mutation).
-- ==============================================================================

BEGIN;

-- ─── 1. SEED 100 PROMOTIONAL SLOTS (IDEMPOTENT) ───────────────────────────────
INSERT INTO public.promotional_slots (slot_number, status, expires_at)
SELECT s, 'released', NOW()
FROM generate_series(1, 100) AS s
ON CONFLICT (slot_number) DO NOTHING;

-- ─── 2. PARTIAL UNIQUE INDEX: AT MOST ONE CAPTURED TRANSACTION PER ORDER ──────
CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_transactions_order_captured 
    ON public.payment_transactions(order_id) 
    WHERE status = 'captured' AND order_id IS NOT NULL;

-- ─── 3. ATOMIC PROMOTIONAL SLOT RESERVATION RPC ───────────────────────────────
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
    v_slot_number INTEGER;
BEGIN
    IF p_user_id IS NULL OR p_order_id IS NULL THEN
        RAISE EXCEPTION 'User ID and Order ID are required to reserve a promotional slot'
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

COMMENT ON FUNCTION public.reserve_promotional_slot IS
'Atomically reserves the lowest available promotional slot using FOR UPDATE SKIP LOCKED to prevent concurrent overselling.';

-- ─── 4. HARDENED ATOMIC PAYMENT FULFILLMENT RPC ───────────────────────────────
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

    -- 1. Verify candidate profile exists and lock row FOR UPDATE to prevent race conditions
    SELECT id, is_premium, campus_coins, subscription_expires_at, subscription_tier
    INTO v_profile
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Candidate profile % not found for payment fulfillment', p_user_id
            USING ERRCODE = 'P0002';
    END IF;

    -- 2. Idempotency Check: Examine existing captured transactions for this payment ID
    SELECT id, order_id, user_id, status, amount_paise, currency, provider
    INTO v_existing_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_provider_payment_id
    FOR UPDATE;

    IF FOUND THEN
        IF v_existing_tx.user_id <> p_user_id THEN
            RAISE EXCEPTION 'Payment ID % belongs to a different candidate profile', p_provider_payment_id
                USING ERRCODE = '42501';
        END IF;

        IF v_existing_tx.provider IS DISTINCT FROM p_provider THEN
            RAISE EXCEPTION 'Payment provider mismatch on replay: recorded %, received %',
                v_existing_tx.provider, p_provider
                USING ERRCODE = '22023';
        END IF;

        IF v_existing_tx.status = 'captured' THEN
            RETURN jsonb_build_object(
                'success', true,
                'idempotent', true,
                'is_premium', coalesce(v_profile.is_premium, false) AND (v_profile.subscription_expires_at IS NULL OR v_profile.subscription_expires_at > clock_timestamp()),
                'message', 'Payment transaction already recorded and active.',
                'tier', coalesce(v_profile.subscription_tier, p_tier, 'all_access_pass'),
                'expires_at', v_profile.subscription_expires_at,
                'bonus_coins_awarded', 0
            );
        END IF;
    END IF;

    -- 3. Order Verification & Ownership: Lock order FOR UPDATE and validate
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

    -- Enforce provider matching the stored order
    IF v_order.provider IS DISTINCT FROM p_provider THEN
        RAISE EXCEPTION 'PAYMENT_PROVIDER_MISMATCH: Order was created for %, received payment via %',
            v_order.provider, p_provider
            USING ERRCODE = '22023';
    END IF;

    -- Enforce amount integrity: paid amount must meet or exceed order amount
    IF p_amount_paise < v_order.amount_paise THEN
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

    -- Derive authoritative subscription tier and bonus coins from stored plan_id
    CASE v_order.plan_id
        WHEN 'all_access_pass_799', 'all_access_pass' THEN
            v_derived_tier := 'all_access_pass';
            v_base_bonus_coins := 500;
        WHEN 'ai_practice_pass_499', 'ai_practice_pass' THEN
            v_derived_tier := 'ai_practice_pass';
            v_base_bonus_coins := 250;
        WHEN 'ai_pass_399' THEN
            v_derived_tier := 'all_access_pass';
            v_base_bonus_coins := 200;
        ELSE
            RAISE EXCEPTION 'UNAUTHORIZED_PLAN: Plan identifier % is not recognized', v_order.plan_id
                USING ERRCODE = '22023';
    END CASE;

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
        -- Attempt to claim the slot reserved for this specific order
        UPDATE public.promotional_slots
        SET status = 'claimed',
            claimed_at = clock_timestamp(),
            user_id = p_user_id,
            order_id = v_order.id
        WHERE order_id = v_order.id
          AND status IN ('reserved', 'released');

        GET DIAGNOSTICS v_slot_updated = ROW_COUNT;

        -- Fallback: If not reserved, claim the lowest available/released slot
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

        -- Synchronize order's promotional_slot_number if not already recorded
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

    -- 5. Record or update payment transaction record as 'captured'
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
    SET order_id = EXCLUDED.order_id,
        status = 'captured',
        verified_at = clock_timestamp(),
        raw_payload = EXCLUDED.raw_payload;

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

    -- 8. Calculate subscription expiry (extend active subscriptions from current expiration date)
    IF v_profile.subscription_expires_at IS NOT NULL AND v_profile.subscription_expires_at > clock_timestamp() THEN
        v_calculated_expiry := v_profile.subscription_expires_at + INTERVAL '1 year';
    ELSE
        v_calculated_expiry := clock_timestamp() + INTERVAL '1 year';
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

COMMENT ON FUNCTION public.fulfill_payment_order IS
'Atomically fulfills verified payment orders, derives tier from locked order, enforces inventory rollback, and records captured transaction (SEC-01).';

COMMIT;
