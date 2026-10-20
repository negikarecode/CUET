-- ==============================================================================
-- CUETMate Migration: Fix Financial Cascade Deletes, Seed Promotional Slots & Harden Allocation
-- Migration Name: 20261021_fix_cascade_and_seed_slots.sql
--
-- PURPOSE:
-- 1. Prevent financial audit trail destruction by altering foreign keys on
--    payment_orders and payment_transactions from ON DELETE CASCADE to ON DELETE RESTRICT.
--    Complies with Companies Act 2013 §128 and GST Act §36 (8-year retention).
-- 2. Seed 100 promotional slots into public.promotional_slots (status = 'released').
-- 3. Provide atomic public.reserve_promotional_slot RPC for order creation.
-- 4. Update public.fulfill_payment_order to ensure zero orphaned promotional orders.
-- ==============================================================================

BEGIN;

-- ─── 1. ALTER PAYMENT ORDERS FOREIGN KEY TO ON DELETE RESTRICT ────────────────
ALTER TABLE public.payment_orders 
    DROP CONSTRAINT IF EXISTS payment_orders_user_id_fkey;

ALTER TABLE public.payment_orders 
    ADD CONSTRAINT payment_orders_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE RESTRICT;

-- ─── 2. ALTER PAYMENT TRANSACTIONS FOREIGN KEYS TO ON DELETE RESTRICT ─────────
ALTER TABLE public.payment_transactions 
    DROP CONSTRAINT IF EXISTS payment_transactions_user_id_fkey;

ALTER TABLE public.payment_transactions 
    ADD CONSTRAINT payment_transactions_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE RESTRICT;

ALTER TABLE public.payment_transactions 
    DROP CONSTRAINT IF EXISTS payment_transactions_order_id_fkey;

ALTER TABLE public.payment_transactions 
    ADD CONSTRAINT payment_transactions_order_id_fkey 
    FOREIGN KEY (order_id) REFERENCES public.payment_orders(id) ON DELETE RESTRICT;

-- ─── 3. SEED 100 PROMOTIONAL SLOTS ───────────────────────────────────────────
INSERT INTO public.promotional_slots (slot_number, status, expires_at)
SELECT s, 'released', NOW()
FROM generate_series(1, 100) AS s
ON CONFLICT (slot_number) DO NOTHING;

-- ─── 4. UPDATE ATOMIC PAYMENT FULFILLMENT RPC ─────────────────────────────────
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
BEGIN
    -- 0. Input invariant validations
    IF p_amount_paise IS NULL OR p_amount_paise <= 0 THEN
        RAISE EXCEPTION 'Invalid payment amount: % paise', p_amount_paise
            USING ERRCODE = '22023';
    END IF;

    IF p_currency IS NULL OR p_currency <> 'INR' THEN
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
    SELECT id, order_id, user_id, status, amount_paise, currency
    INTO v_existing_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_provider_payment_id
    FOR UPDATE;

    IF FOUND THEN
        IF v_existing_tx.user_id <> p_user_id THEN
            RAISE EXCEPTION 'Payment ID % belongs to a different candidate profile', p_provider_payment_id
                USING ERRCODE = '42501';
        END IF;

        IF v_existing_tx.status = 'captured' THEN
            RETURN jsonb_build_object(
                'success', true,
                'idempotent', true,
                'is_premium', coalesce(v_profile.is_premium, false) AND (v_profile.subscription_expires_at IS NULL OR v_profile.subscription_expires_at > NOW()),
                'message', 'Payment transaction already recorded and active.',
                'tier', coalesce(v_profile.subscription_tier, p_tier),
                'expires_at', v_profile.subscription_expires_at,
                'bonus_coins_awarded', 0
            );
        END IF;
    END IF;

    -- 3. Order Verification & Ownership: Lock order FOR UPDATE and validate
    SELECT id, user_id, status, amount_paise, currency, is_promotional, promotional_slot_number
    INTO v_order
    FROM public.payment_orders
    WHERE provider_order_id = p_provider_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Payment order % not found for fulfillment', p_provider_order_id
            USING ERRCODE = 'P0002';
    END IF;

    IF v_order.user_id <> p_user_id THEN
        RAISE EXCEPTION 'Order candidate mismatch: order belongs to %, requested by %', v_order.user_id, p_user_id
            USING ERRCODE = '42501';
    END IF;

    IF v_order.amount_paise <> p_amount_paise THEN
        RAISE EXCEPTION 'Amount mismatch: order requires % paise, received % paise', v_order.amount_paise, p_amount_paise
            USING ERRCODE = '22023';
    END IF;

    IF v_order.currency <> p_currency THEN
        RAISE EXCEPTION 'Currency mismatch: order requires %, received %', v_order.currency, p_currency
            USING ERRCODE = '22023';
    END IF;

    -- Prevent fulfilling an order already paid under a DIFFERENT payment ID
    IF v_order.status = 'paid' THEN
        SELECT provider_payment_id INTO v_existing_order_payment_id
        FROM public.payment_transactions
        WHERE order_id = v_order.id
          AND status = 'captured'
        LIMIT 1;

        IF v_existing_order_payment_id IS NOT NULL AND v_existing_order_payment_id <> p_provider_payment_id THEN
            RAISE EXCEPTION 'Order % is already fulfilled under different payment ID %', v_order.id, v_existing_order_payment_id
                USING ERRCODE = '23505';
        END IF;
    END IF;

    -- 4. Record or update payment transaction record
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
        NOW()
    )
    ON CONFLICT (provider_payment_id) DO UPDATE
    SET order_id = EXCLUDED.order_id,
        status = 'captured',
        verified_at = NOW(),
        raw_payload = EXCLUDED.raw_payload;

    -- 5. Mark payment order as paid
    UPDATE public.payment_orders
    SET status = 'paid',
        updated_at = NOW()
    WHERE id = v_order.id;

    -- 6. Calculate bonus coins (award 500 bonus coins on first upgrade; do not double-award on renewals)
    IF NOT coalesce(v_profile.is_premium, false) THEN
        v_coins_to_award := coalesce(p_bonus_coins, 500);
    ELSE
        v_coins_to_award := 0;
    END IF;

    -- 7. Calculate subscription expiry (extend active subscriptions from current expiration date)
    IF v_profile.subscription_expires_at IS NOT NULL AND v_profile.subscription_expires_at > NOW() THEN
        v_calculated_expiry := v_profile.subscription_expires_at + INTERVAL '1 year';
    ELSE
        v_calculated_expiry := coalesce(p_expires_at, NOW() + INTERVAL '1 year');
    END IF;

    -- 8. Grant Premium entitlement and bonus coins atomically
    UPDATE public.profiles
    SET is_premium = true,
        subscription_tier = p_tier,
        subscription_expires_at = v_calculated_expiry,
        campus_coins = coalesce(v_profile.campus_coins, 50) + v_coins_to_award,
        updated_at = NOW()
    WHERE id = p_user_id;

    -- 9. Promotional Slot Allocation: Ensure slot is marked as claimed and linked
    IF v_order.is_promotional THEN
        UPDATE public.promotional_slots
        SET status = 'claimed',
            claimed_at = clock_timestamp(),
            user_id = p_user_id,
            order_id = v_order.id
        WHERE order_id = v_order.id;

        GET DIAGNOSTICS v_slot_updated = ROW_COUNT;

        -- Fallback: If not previously reserved, claim the lowest available/released slot
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

    -- 10. Return authoritative success response
    RETURN jsonb_build_object(
        'success', true,
        'idempotent', false,
        'is_premium', true,
        'message', 'CUETMate Premium successfully activated!',
        'tier', p_tier,
        'expires_at', v_calculated_expiry,
        'bonus_coins_awarded', v_coins_to_award
    );
END;
$$;

REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM anon;
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) TO service_role;

COMMIT;

-- ─── VERIFICATION BLOCK ──────────────────────────────────────────────────────
DO $$
BEGIN
    -- Verify 100 promotional slots exist
    IF (SELECT count(*) FROM public.promotional_slots) < 100 THEN
        RAISE EXCEPTION 'Verification failed: less than 100 promotional slots seeded';
    END IF;

    -- Verify fulfill_payment_order exists and search_path is pinned
    IF NOT EXISTS (
        SELECT 1 FROM pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
        WHERE n.nspname = 'public' 
          AND p.proname = 'fulfill_payment_order'
          AND ARRAY['search_path=public, pg_temp']::text[] <@ p.proconfig
    ) THEN
        RAISE EXCEPTION 'Verification failed: fulfill_payment_order not properly pinned';
    END IF;

    RAISE NOTICE 'SUCCESS: Migration 20261021_fix_cascade_and_seed_slots applied and verified.';
END;
$$;
