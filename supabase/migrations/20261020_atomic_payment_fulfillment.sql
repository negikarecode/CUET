-- =============================================================================
-- CUETMATE SECURITY REMEDIATION: SEC-01 ATOMIC PAYMENT FULFILLMENT
-- Migration: 20261020_atomic_payment_fulfillment.sql
-- Purpose: Provide an ACID-compliant, atomic transaction function to fulfill
--          payments, record transactions, and grant Premium entitlements in a
--          single atomic PostgreSQL transaction, preventing partial fulfillment.
-- =============================================================================

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
BEGIN
    -- 0. Input invariant validations
    IF p_amount_paise IS NULL OR p_amount_paise <= 0 THEN
        RAISE EXCEPTION 'Invalid payment amount: % paise', p_amount_paise
            USING ERRCODE = '22023';
    END IF;

    IF p_currency IS NULL OR upper(p_currency) <> 'INR' THEN
        RAISE EXCEPTION 'Invalid payment currency: expected INR, received %', p_currency
            USING ERRCODE = '22023';
    END IF;

    IF p_provider_order_id IS NULL OR trim(p_provider_order_id) = '' THEN
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
        RAISE EXCEPTION 'Candidate profile not found: %', p_user_id
            USING ERRCODE = 'P0002';
    END IF;

    -- 2. Idempotency Check: Verify if transaction was already recorded for this payment ID
    SELECT id, user_id, order_id, provider, status INTO v_existing_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_provider_payment_id;

    IF FOUND THEN
        -- Verify status is captured (reject replays of failed/refunded/disputed transactions)
        IF v_existing_tx.status <> 'captured' THEN
            RAISE EXCEPTION 'Payment transaction % is in non-captured status: %',
                p_provider_payment_id, v_existing_tx.status
                USING ERRCODE = '22023';
        END IF;

        -- Reject cross-user payment reuse: Cannot claim someone else's payment ID
        IF v_existing_tx.user_id <> p_user_id THEN
            RAISE EXCEPTION 'Cross-user payment reuse attempt: payment % already belongs to user %',
                p_provider_payment_id, v_existing_tx.user_id
                USING ERRCODE = '42501';
        END IF;

        -- Verify provider consistency
        IF v_existing_tx.provider IS DISTINCT FROM p_provider THEN
            RAISE EXCEPTION 'Payment provider mismatch for %: recorded %, received %',
                p_provider_payment_id, v_existing_tx.provider, p_provider
                USING ERRCODE = '22023';
        END IF;

        -- Verify order binding consistency: Cannot reuse payment across different or unknown orders
        SELECT id INTO v_order
        FROM public.payment_orders
        WHERE provider_order_id = p_provider_order_id;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Payment order not found: %', p_provider_order_id
                USING ERRCODE = 'P0002';
        END IF;

        IF v_existing_tx.order_id IS DISTINCT FROM v_order.id THEN
            RAISE EXCEPTION 'Cross-order payment reuse attempt: payment % is bound to order %, cannot fulfill order %',
                p_provider_payment_id, v_existing_tx.order_id, p_provider_order_id
                USING ERRCODE = '23505';
        END IF;

        -- Self-healing: If payment was captured but profile is not currently active Premium
        IF NOT coalesce(v_profile.is_premium, false) OR v_profile.subscription_expires_at IS NULL OR v_profile.subscription_expires_at <= NOW() THEN
            IF v_profile.subscription_expires_at IS NOT NULL AND v_profile.subscription_expires_at > NOW() THEN
                v_calculated_expiry := v_profile.subscription_expires_at + INTERVAL '1 year';
            ELSE
                v_calculated_expiry := coalesce(p_expires_at, NOW() + INTERVAL '1 year');
            END IF;

            UPDATE public.profiles
            SET is_premium = true,
                subscription_tier = coalesce(v_profile.subscription_tier, p_tier),
                subscription_expires_at = v_calculated_expiry,
                updated_at = NOW()
            WHERE id = p_user_id;

            v_profile.subscription_expires_at := v_calculated_expiry;
            v_profile.is_premium := true;
        END IF;

        -- Legitimate idempotent replay for the SAME user, provider, order, and captured state
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

    -- 3. Order Verification & Ownership: Lock order FOR UPDATE and validate
    SELECT id, user_id, status, amount_paise, currency
    INTO v_order
    FROM public.payment_orders
    WHERE provider_order_id = p_provider_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Payment order not found: %', p_provider_order_id
            USING ERRCODE = 'P0002';
    END IF;

    -- Reject cross-user fulfillment attempts
    IF v_order.user_id <> p_user_id THEN
        RAISE EXCEPTION 'Cross-user order fulfillment attempt: order belongs to %', v_order.user_id
            USING ERRCODE = '42501';
    END IF;

    -- Invariant: Reject amount tampering (paid amount must meet or exceed required order price)
    IF p_amount_paise < v_order.amount_paise THEN
        RAISE EXCEPTION 'PAYMENT_AMOUNT_MISMATCH: Paid amount % paise is less than required % paise',
            p_amount_paise, v_order.amount_paise
            USING ERRCODE = '22023';
    END IF;

    -- Invariant: Reject currency tampering
    IF v_order.currency IS NOT NULL AND upper(p_currency) <> upper(v_order.currency) THEN
        RAISE EXCEPTION 'PAYMENT_CURRENCY_MISMATCH: Order requires % but received %',
            v_order.currency, p_currency
            USING ERRCODE = '22023';
    END IF;

    -- Invariant: Verify order is not already fulfilled by a DIFFERENT payment ID
    SELECT provider_payment_id INTO v_existing_order_payment_id
    FROM public.payment_transactions
    WHERE order_id = v_order.id AND status = 'captured'
    LIMIT 1;

    IF FOUND AND v_existing_order_payment_id <> p_provider_payment_id THEN
        RAISE EXCEPTION 'Order % already fulfilled by payment %; cannot fulfill with %',
            p_provider_order_id, v_existing_order_payment_id, p_provider_payment_id
            USING ERRCODE = '23505';
    END IF;

    -- If order is already paid, but this payment ID was NOT previously recorded (since step 2 did not match)
    IF v_order.status = 'paid' THEN
        RAISE EXCEPTION 'Order % is already marked as paid and cannot be fulfilled by another payment %',
            p_provider_order_id, p_provider_payment_id
            USING ERRCODE = '23505';
    END IF;

    -- Mark order as paid atomically
    UPDATE public.payment_orders
    SET status = 'paid', updated_at = NOW()
    WHERE id = v_order.id;

    -- 4. Atomically insert into payment_transactions
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
    );

    -- 5. Calculate bonus coins (award 500 bonus coins on first upgrade; do not double-award on renewals)
    IF NOT coalesce(v_profile.is_premium, false) THEN
        v_coins_to_award := coalesce(p_bonus_coins, 500);
    ELSE
        v_coins_to_award := 0;
    END IF;

    -- 6. Calculate subscription expiry (extend active subscriptions from current expiration date)
    IF v_profile.subscription_expires_at IS NOT NULL AND v_profile.subscription_expires_at > NOW() THEN
        v_calculated_expiry := v_profile.subscription_expires_at + INTERVAL '1 year';
    ELSE
        v_calculated_expiry := coalesce(p_expires_at, NOW() + INTERVAL '1 year');
    END IF;

    -- 7. Grant Premium entitlement and bonus coins atomically
    UPDATE public.profiles
    SET is_premium = true,
        subscription_tier = p_tier,
        subscription_expires_at = v_calculated_expiry,
        campus_coins = coalesce(v_profile.campus_coins, 50) + v_coins_to_award,
        updated_at = NOW()
    WHERE id = p_user_id;

    -- 8. If promotional slot was reserved for this order or user, atomically mark as claimed
    IF v_order.id IS NOT NULL THEN
        UPDATE public.promotional_slots
        SET status = 'claimed', claimed_at = NOW()
        WHERE order_id = v_order.id AND status = 'reserved';
    ELSIF p_user_id IS NOT NULL THEN
        UPDATE public.promotional_slots
        SET status = 'claimed', claimed_at = NOW()
        WHERE user_id = p_user_id AND status = 'reserved';
    END IF;

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

-- Revoke all permissions from public, anon, and authenticated
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM anon, authenticated;

-- Grant EXECUTE exclusively to service_role (called by server API handler after Razorpay cryptographic verification)
GRANT EXECUTE ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) TO service_role;

COMMENT ON FUNCTION public.fulfill_payment_order IS
'Atomically fulfills verified payment orders, records transactions, grants Premium entitlements, and claims launch slots in a single PostgreSQL transaction (SEC-01).';

-- =============================================================================
-- ROLLBACK SCRIPT (IF REQUIRED)
-- =============================================================================
/*
-- NOTICE ON ROLLBACK:
-- If this function is dropped while the updated application code is deployed,
-- checkout verification on /api/payments will fail closed with HTTP 503 (ATOMIC_FULFILLMENT_FAILED).
-- Rollback must be coordinated with application code reversion.

DROP FUNCTION IF EXISTS public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB);
*/
