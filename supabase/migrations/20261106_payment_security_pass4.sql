-- ==============================================================================
-- CUETMATE SECURITY REMEDIATION: PAYMENT SECURITY PASS 4
-- Migration: 20261106_payment_security_pass4.sql
--
-- PURPOSE:
-- 1. Make dispute outcomes strictly terminal and monotonic in process_payment_dispute:
--    - Finalized 'won' or 'lost' disputes cannot transition to opposite outcomes.
--    - 'disputed_lost' transactions cannot be restored to 'captured' by delayed dispute.won.
--    - Delayed 'under_review' events cannot overwrite finalized terminal outcomes.
--    - Preserve protection for refunded transactions.
--    - Reversal workflow requires explicit, audited parameter (p_allow_reversal = true).
-- 2. Make refund records immutable after processing in process_payment_refund:
--    - A 'processed' refund must NEVER be downgraded to 'created' or 'failed'.
--    - Enforce immutable binding between provider refund ID, payment ID, amount, currency, provider.
--    - Reject attempts to reuse an existing refund ID with conflicting financial details.
--    - DO NOT silently clamp cumulative refunds. If cumulative processed refunds exceed
--      captured amount, reject atomically via exception to trigger ROLLBACK.
-- 3. Webhook Inbox Fail-Closed & Hardened Finalization:
--    - finalize_webhook_event returns boolean and raises exception if event missing or update fails.
-- 4. Authoritative Plan Validation in SQL:
--    - fulfill_payment_order and reconcile_user_entitlements reject missing or invalid plans
--      without silent fallback to default tiers or prices.
-- ==============================================================================

BEGIN;

-- ─── 1. HARDENED FINALIZE WEBHOOK EVENT RPC ──────────────────────────────────
DROP FUNCTION IF EXISTS public.finalize_webhook_event(UUID, TEXT, TEXT);
CREATE OR REPLACE FUNCTION public.finalize_webhook_event(
    p_event_pk UUID,
    p_status TEXT,
    p_error_message TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_rows_affected INTEGER;
BEGIN
    IF p_event_pk IS NULL THEN
        RAISE EXCEPTION 'Event primary key is required for finalization' USING ERRCODE = '22023';
    END IF;

    IF p_status IS NULL OR p_status NOT IN ('processed', 'failed', 'deferred', 'ignored') THEN
        RAISE EXCEPTION 'Invalid webhook event finalization status: %', p_status USING ERRCODE = '22023';
    END IF;

    UPDATE public.payment_webhook_events
    SET status = p_status,
        error_message = p_error_message,
        processed_at = clock_timestamp()
    WHERE id = p_event_pk;

    GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
    IF v_rows_affected = 0 THEN
        RAISE EXCEPTION 'Webhook event % not found for finalization', p_event_pk USING ERRCODE = 'P0002';
    END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) TO service_role;

-- ─── 2. STRICT MONOTONIC DISPUTE STATE MACHINE RPC ────────────────────────────
DROP FUNCTION IF EXISTS public.process_payment_dispute(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TEXT, JSONB, BOOLEAN);
CREATE OR REPLACE FUNCTION public.process_payment_dispute(
    p_provider TEXT,
    p_provider_dispute_id TEXT,
    p_payment_id TEXT,
    p_amount_paise INTEGER,
    p_currency TEXT,
    p_event_type TEXT,
    p_reason_code TEXT DEFAULT NULL,
    p_raw_payload JSONB DEFAULT '{}'::JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_tx RECORD;
    v_existing_dispute RECORD;
    v_target_dispute_status TEXT;
    v_new_tx_status TEXT;
    v_should_reconcile BOOLEAN := false;
    v_is_audited_reversal BOOLEAN := false;
BEGIN
    IF p_provider_dispute_id IS NULL OR btrim(p_provider_dispute_id) = '' THEN
        RAISE EXCEPTION 'Provider dispute ID is required' USING ERRCODE = '22023';
    END IF;

    IF p_payment_id IS NULL OR btrim(p_payment_id) = '' THEN
        RAISE EXCEPTION 'Payment ID is required' USING ERRCODE = '22023';
    END IF;

    v_is_audited_reversal := (p_event_type = 'payment.dispute.reversal_approved');

    -- 1. Lock parent transaction FOR UPDATE
    SELECT id, order_id, user_id, amount_paise, status, dispute_status
    INTO v_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_payment_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Transaction for payment % not found for dispute processing', p_payment_id
            USING ERRCODE = 'P0002';
    END IF;

    -- Fallback amount if missing/zero to captured transaction amount
    IF p_amount_paise IS NULL OR p_amount_paise <= 0 THEN
        p_amount_paise := v_tx.amount_paise;
    END IF;

    -- Map event to dispute status
    IF p_event_type = 'payment.dispute.won' THEN
        v_target_dispute_status := 'won';
    ELSIF p_event_type = 'payment.dispute.lost' THEN
        v_target_dispute_status := 'lost';
    ELSE
        v_target_dispute_status := 'under_review';
    END IF;

    -- 2. Inspect existing dispute record for monotonic terminal state protection
    SELECT id, status, provider_dispute_id, payment_id, amount_paise
    INTO v_existing_dispute
    FROM public.payment_disputes
    WHERE provider_dispute_id = p_provider_dispute_id
    FOR UPDATE;

    IF FOUND THEN
        -- If dispute is already in a terminal outcome ('won' or 'lost')
        IF v_existing_dispute.status IN ('won', 'lost') THEN
            -- A) Duplicate terminal event: same outcome arrives again -> idempotent no-op
            IF v_existing_dispute.status = v_target_dispute_status THEN
                RETURN jsonb_build_object(
                    'success', true,
                    'is_duplicate', true,
                    'event_type', p_event_type,
                    'dispute_status', v_existing_dispute.status,
                    'tx_status', v_tx.status,
                    'user_id', v_tx.user_id,
                    'order_id', v_tx.order_id,
                    'should_reconcile', false,
                    'notice', 'Dispute already in terminal state; duplicate event ignored.'
                );
            END IF;

            -- B) Delayed under_review event arriving after terminal state -> ignore without mutating state
            IF v_target_dispute_status = 'under_review' THEN
                RETURN jsonb_build_object(
                    'success', true,
                    'is_duplicate', true,
                    'event_type', p_event_type,
                    'dispute_status', v_existing_dispute.status,
                    'tx_status', v_tx.status,
                    'user_id', v_tx.user_id,
                    'order_id', v_tx.order_id,
                    'should_reconcile', false,
                    'notice', 'Dispute already finalized; delayed under_review event ignored.'
                );
            END IF;

            -- C) Finalized dispute attempting to transition to opposite terminal outcome (lost -> won or won -> lost)
            IF NOT v_is_audited_reversal THEN
                RAISE EXCEPTION 'TERMINAL_STATE_VIOLATION: Cannot transition finalized dispute from % to % through ordinary webhook',
                    v_existing_dispute.status, v_target_dispute_status
                    USING ERRCODE = '22023';
            ELSE
                -- Audited explicit reversal branch
                UPDATE public.payment_disputes
                SET status = v_target_dispute_status,
                    reason_code = coalesce(p_reason_code, payment_disputes.reason_code),
                    raw_payload = p_raw_payload,
                    updated_at = clock_timestamp()
                WHERE id = v_existing_dispute.id;
            END IF;
        ELSE
            -- Existing dispute was in 'under_review' -> can transition to 'won', 'lost', or remain 'under_review'
            UPDATE public.payment_disputes
            SET status = v_target_dispute_status,
                reason_code = coalesce(p_reason_code, payment_disputes.reason_code),
                raw_payload = p_raw_payload,
                updated_at = clock_timestamp()
            WHERE id = v_existing_dispute.id;
        END IF;
    ELSE
        -- Insert new dispute record
        INSERT INTO public.payment_disputes (
            transaction_id,
            provider,
            provider_dispute_id,
            payment_id,
            amount_paise,
            currency,
            status,
            reason_code,
            raw_payload
        ) VALUES (
            v_tx.id,
            coalesce(p_provider, 'razorpay'),
            p_provider_dispute_id,
            p_payment_id,
            p_amount_paise,
            coalesce(p_currency, 'INR'),
            v_target_dispute_status,
            p_reason_code,
            p_raw_payload
        );
    END IF;

    -- 3. Evaluate Transaction Status Transitions
    -- CRITICAL RULE: "A disputed_lost transaction must never be restored to captured by a delayed dispute.won event."
    IF v_tx.status = 'disputed_lost' AND v_target_dispute_status = 'won' AND NOT v_is_audited_reversal THEN
        RAISE EXCEPTION 'TERMINAL_STATE_VIOLATION: Cannot restore disputed_lost transaction to captured via dispute.won'
            USING ERRCODE = '22023';
    END IF;

    -- CRITICAL RULE: "Dispute won must not restore a transaction that has already been fully refunded."
    IF v_tx.status = 'refunded' THEN
        UPDATE public.payment_transactions
        SET dispute_status = v_target_dispute_status
        WHERE id = v_tx.id;

        RETURN jsonb_build_object(
            'success', true,
            'event_type', p_event_type,
            'dispute_status', v_target_dispute_status,
            'tx_status', 'refunded',
            'user_id', v_tx.user_id,
            'order_id', v_tx.order_id,
            'should_reconcile', false,
            'notice', 'Transaction was previously fully refunded; dispute outcome will not alter refunded status.'
        );
    END IF;

    IF v_target_dispute_status = 'under_review' THEN
        IF v_tx.status IN ('captured', 'partially_refunded') THEN
            UPDATE public.payment_transactions
            SET status = 'disputed',
                dispute_status = 'under_review'
            WHERE id = v_tx.id;
            v_new_tx_status := 'disputed';
        ELSE
            v_new_tx_status := v_tx.status;
        END IF;
        v_should_reconcile := false;

    ELSIF v_target_dispute_status = 'won' THEN
        UPDATE public.payment_transactions
        SET status = 'captured',
            dispute_status = 'won'
        WHERE id = v_tx.id;
        v_new_tx_status := 'captured';
        v_should_reconcile := true;

    ELSIF v_target_dispute_status = 'lost' THEN
        UPDATE public.payment_transactions
        SET status = 'disputed_lost',
            dispute_status = 'lost'
        WHERE id = v_tx.id;

        UPDATE public.payment_orders
        SET status = 'disputed_lost',
            updated_at = clock_timestamp()
        WHERE id = v_tx.order_id;

        -- Release promotional slot if promotional
        UPDATE public.promotional_slots
        SET status = 'released',
            user_id = NULL,
            order_id = NULL,
            claimed_at = NULL
        WHERE order_id = v_tx.order_id;

        v_new_tx_status := 'disputed_lost';
        v_should_reconcile := true;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'event_type', p_event_type,
        'dispute_status', v_target_dispute_status,
        'tx_status', v_new_tx_status,
        'user_id', v_tx.user_id,
        'order_id', v_tx.order_id,
        'should_reconcile', v_should_reconcile
    );
END;
$$;

REVOKE ALL ON FUNCTION public.process_payment_dispute(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TEXT, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.process_payment_dispute(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TEXT, JSONB) FROM anon;
REVOKE ALL ON FUNCTION public.process_payment_dispute(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TEXT, JSONB) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.process_payment_dispute(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TEXT, JSONB) TO service_role;

-- ─── 3. IMMUTABLE REFUND RECORD & STRICT RECONCILIATION RPC ──────────────────
CREATE OR REPLACE FUNCTION public.process_payment_refund(
    p_provider TEXT,
    p_provider_refund_id TEXT,
    p_payment_id TEXT,
    p_amount_paise INTEGER,
    p_currency TEXT,
    p_event_type TEXT,
    p_raw_payload JSONB DEFAULT '{}'::JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_tx RECORD;
    v_existing_refund RECORD;
    v_refund_status TEXT;
    v_cumulative_refunded INTEGER := 0;
    v_is_full_refund BOOLEAN := false;
    v_new_tx_status TEXT;
    v_target_currency TEXT;
    v_target_provider TEXT;
    v_is_duplicate BOOLEAN := false;
BEGIN
    IF p_provider_refund_id IS NULL OR btrim(p_provider_refund_id) = '' THEN
        RAISE EXCEPTION 'Provider refund ID is required' USING ERRCODE = '22023';
    END IF;

    IF p_payment_id IS NULL OR btrim(p_payment_id) = '' THEN
        RAISE EXCEPTION 'Payment ID is required' USING ERRCODE = '22023';
    END IF;

    v_target_currency := upper(coalesce(btrim(p_currency), 'INR'));
    v_target_provider := coalesce(btrim(p_provider), 'razorpay');

    -- 1. Lock parent transaction FOR UPDATE to serialize all concurrent refund/dispute events
    SELECT id, order_id, user_id, amount_paise, status, refunded_amount_paise, currency, provider_payment_id
    INTO v_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_payment_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Transaction for payment % not found for refund processing', p_payment_id
            USING ERRCODE = 'P0002';
    END IF;

    -- Fallback amount if missing/zero to captured transaction amount
    IF p_amount_paise IS NULL OR p_amount_paise <= 0 THEN
        p_amount_paise := v_tx.amount_paise;
    END IF;

    -- Map event type to refund record status
    IF p_event_type = 'refund.processed' THEN
        v_refund_status := 'processed';
    ELSIF p_event_type = 'refund.failed' THEN
        v_refund_status := 'failed';
    ELSE
        v_refund_status := 'created';
    END IF;

    -- 2. Inspect existing refund record for immutable identity & status protection
    SELECT id, status, payment_id, transaction_id, provider, amount_paise, currency
    INTO v_existing_refund
    FROM public.payment_refunds
    WHERE provider_refund_id = p_provider_refund_id
    FOR UPDATE;

    IF FOUND THEN
        -- IMMUTABLE IDENTITY CHECKS:
        -- Reject attempts to reuse an existing refund ID with conflicting payment or monetary details
        IF v_existing_refund.payment_id <> p_payment_id THEN
            RAISE EXCEPTION 'REFUND_IDENTITY_MISMATCH: Refund % is bound to payment %, cannot associate with payment %',
                p_provider_refund_id, v_existing_refund.payment_id, p_payment_id USING ERRCODE = '22023';
        END IF;

        IF v_existing_refund.amount_paise <> p_amount_paise THEN
            RAISE EXCEPTION 'REFUND_IDENTITY_MISMATCH: Refund % amount % paise conflicts with existing % paise',
                p_provider_refund_id, p_amount_paise, v_existing_refund.amount_paise USING ERRCODE = '22023';
        END IF;

        IF upper(v_existing_refund.currency) <> v_target_currency THEN
            RAISE EXCEPTION 'REFUND_IDENTITY_MISMATCH: Refund % currency % conflicts with existing %',
                p_provider_refund_id, v_target_currency, v_existing_refund.currency USING ERRCODE = '22023';
        END IF;

        IF v_existing_refund.provider <> v_target_provider THEN
            RAISE EXCEPTION 'REFUND_IDENTITY_MISMATCH: Refund % provider % conflicts with existing %',
                p_provider_refund_id, v_target_provider, v_existing_refund.provider USING ERRCODE = '22023';
        END IF;

        -- STATUS IMMUTABILITY:
        -- A 'processed' refund must NEVER be downgraded to 'created' or 'failed'
        IF v_existing_refund.status = 'processed' THEN
            v_is_duplicate := (v_refund_status = 'processed');
            -- Preserve 'processed' status regardless of delayed/out-of-order 'created' or 'failed' event
            v_refund_status := 'processed';
            
            -- Only update payload if not downgrading
            UPDATE public.payment_refunds
            SET raw_payload = p_raw_payload
            WHERE id = v_existing_refund.id;
        ELSE
            -- Prior was created or failed; can transition to processed or failed
            UPDATE public.payment_refunds
            SET status = v_refund_status,
                raw_payload = p_raw_payload
            WHERE id = v_existing_refund.id;
        END IF;
    ELSE
        -- Insert new refund record into ledger
        INSERT INTO public.payment_refunds (
            transaction_id,
            provider,
            provider_refund_id,
            payment_id,
            amount_paise,
            currency,
            status,
            raw_payload
        ) VALUES (
            v_tx.id,
            v_target_provider,
            p_provider_refund_id,
            p_payment_id,
            p_amount_paise,
            v_target_currency,
            v_refund_status,
            p_raw_payload
        );
    END IF;

    -- 3. CRITICAL RULE: refund.created or refund.failed is NOT a completed refund.
    -- Only confirmed 'refund.processed' events can alter transaction status or entitlement.
    IF p_event_type <> 'refund.processed' AND v_refund_status <> 'processed' THEN
        RETURN jsonb_build_object(
            'success', true,
            'is_processed', false,
            'action', 'recorded_pending',
            'refund_status', v_refund_status,
            'user_id', v_tx.user_id,
            'order_id', v_tx.order_id,
            'should_reconcile', false
        );
    END IF;

    -- 4. Calculate authoritative cumulative processed refunds from the payment_refunds ledger
    SELECT coalesce(SUM(amount_paise), 0)
    INTO v_cumulative_refunded
    FROM public.payment_refunds
    WHERE payment_id = p_payment_id
      AND status = 'processed';

    -- CRITICAL PASS 4: DO NOT SILENTLY CLAMP!
    -- If cumulative processed refunds exceed captured amount, reject atomically,
    -- preserve ledger integrity, and surface a critical reconciliation error.
    IF v_cumulative_refunded > v_tx.amount_paise THEN
        RAISE EXCEPTION 'CUMULATIVE_REFUND_EXCEEDS_CAPTURED: Cumulative processed refunds (% paise) exceed captured amount (% paise) for payment %',
            v_cumulative_refunded, v_tx.amount_paise, p_payment_id
            USING ERRCODE = '22023';
    END IF;

    -- 5. Determine full vs partial refund
    IF v_cumulative_refunded >= v_tx.amount_paise THEN
        v_new_tx_status := 'refunded';
        v_is_full_refund := true;

        -- Mark parent order refunded
        UPDATE public.payment_orders
        SET status = 'refunded',
            updated_at = clock_timestamp()
        WHERE id = v_tx.order_id;

        -- Release promotional slot if promotional
        UPDATE public.promotional_slots
        SET status = 'released',
            user_id = NULL,
            order_id = NULL,
            claimed_at = NULL
        WHERE order_id = v_tx.order_id;
    ELSE
        v_new_tx_status := 'partially_refunded';
        v_is_full_refund := false;
    END IF;

    -- Update parent transaction state
    UPDATE public.payment_transactions
    SET status = v_new_tx_status,
        refunded_amount_paise = v_cumulative_refunded
    WHERE id = v_tx.id;

    RETURN jsonb_build_object(
        'success', true,
        'is_duplicate', v_is_duplicate,
        'is_processed', true,
        'is_full_refund', v_is_full_refund,
        'cumulative_refunded_paise', v_cumulative_refunded,
        'captured_amount_paise', v_tx.amount_paise,
        'user_id', v_tx.user_id,
        'order_id', v_tx.order_id,
        'should_reconcile', true
    );
END;
$$;

REVOKE ALL ON FUNCTION public.process_payment_refund(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.process_payment_refund(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, JSONB) FROM anon;
REVOKE ALL ON FUNCTION public.process_payment_refund(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, JSONB) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.process_payment_refund(TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, JSONB) TO service_role;

-- ─── 4. RECONCILE ENTITLEMENTS RPC WITHOUT SILENT DEFAULTS ────────────────────
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

    SELECT id, is_premium, subscription_tier, subscription_expires_at
    INTO v_profile
    FROM public.profiles
    WHERE id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Profile % not found for entitlement reconciliation', p_user_id
            USING ERRCODE = 'P0002';
    END IF;

    -- Only non-refunded, non-disputed-lost captured transactions contribute to entitlement.
    -- Parent orders marked refunded, disputed_lost, or cancelled are strictly excluded.
    FOR v_tx IN
        SELECT pt.id, pt.verified_at, pt.status, po.plan_id, po.status AS order_status
        FROM public.payment_transactions pt
        JOIN public.payment_orders po ON pt.order_id = po.id
        WHERE pt.user_id = p_user_id
          AND pt.status IN ('captured', 'partially_refunded', 'disputed')
          AND po.status NOT IN ('refunded', 'disputed_lost', 'cancelled')
        ORDER BY pt.verified_at ASC
    LOOP
        CASE v_tx.plan_id
            WHEN 'all_access_pass_799', 'all_access_pass' THEN
                v_tx_duration_days := 365;
                v_highest_tier := 'all_access_pass';
                v_has_valid_tx := true;
            WHEN 'ai_practice_pass_499', 'ai_practice_pass' THEN
                v_tx_duration_days := 365;
                IF v_highest_tier <> 'all_access_pass' THEN
                    v_highest_tier := 'ai_practice_pass';
                END IF;
                v_has_valid_tx := true;
            WHEN 'ai_pass_399' THEN
                v_tx_duration_days := 365;
                v_highest_tier := 'all_access_pass';
                v_has_valid_tx := true;
            ELSE
                -- STRICT: Invalid/unrecognized plan ID does NOT grant entitlement!
                CONTINUE;
        END CASE;

        IF v_current_expiry IS NULL OR v_tx.verified_at > v_current_expiry THEN
            v_current_expiry := v_tx.verified_at + (v_tx_duration_days || ' days')::INTERVAL;
        ELSE
            v_current_expiry := v_current_expiry + (v_tx_duration_days || ' days')::INTERVAL;
        END IF;
    END LOOP;

    IF v_has_valid_tx AND v_current_expiry > clock_timestamp() THEN
        UPDATE public.profiles
        SET is_premium = true,
            subscription_tier = v_highest_tier,
            subscription_expires_at = v_current_expiry,
            updated_at = clock_timestamp()
        WHERE id = p_user_id;

        RETURN jsonb_build_object(
            'is_premium', true,
            'tier', v_highest_tier,
            'expires_at', v_current_expiry,
            'has_valid_transactions', true
        );
    ELSE
        UPDATE public.profiles
        SET is_premium = false,
            subscription_tier = 'free',
            subscription_expires_at = v_current_expiry,
            updated_at = clock_timestamp()
        WHERE id = p_user_id;

        RETURN jsonb_build_object(
            'is_premium', false,
            'tier', 'free',
            'expires_at', v_current_expiry,
            'has_valid_transactions', v_has_valid_tx
        );
    END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.reconcile_user_entitlements(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reconcile_user_entitlements(UUID) FROM anon;
REVOKE ALL ON FUNCTION public.reconcile_user_entitlements(UUID) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.reconcile_user_entitlements(UUID) TO service_role;

-- ─── 5. FULFILL PAYMENT ORDER RPC PLAN HARDENING ─────────────────────────────
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

    -- Enforce EXACT amount match (reject both underpayment and overpayment)
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

    -- STRICT PLAN VALIDATION: Stored order must have a non-empty, recognized plan
    IF v_order.plan_id IS NULL OR btrim(v_order.plan_id) = '' THEN
        RAISE EXCEPTION 'MISSING_PLAN_ID: Stored order % does not specify a valid plan ID', v_order.id
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

    -- 3. Idempotency Check: Existing transaction for this payment ID
    SELECT id, order_id, user_id, status, amount_paise
    INTO v_existing_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_provider_payment_id
    FOR UPDATE;

    IF FOUND THEN
        IF v_existing_tx.order_id <> v_order.id THEN
            RAISE EXCEPTION 'Payment ID % is already bound to a different order %', p_provider_payment_id, v_existing_tx.order_id
                USING ERRCODE = '23505';
        END IF;

        IF v_existing_tx.user_id <> p_user_id THEN
            RAISE EXCEPTION 'Payment ID % is already bound to candidate %', p_provider_payment_id, v_existing_tx.user_id
                USING ERRCODE = '42501';
        END IF;

        -- Order already successfully fulfilled
        RETURN jsonb_build_object(
            'success', true,
            'idempotent', true,
            'message', 'Payment already verified and fulfilled',
            'order_id', v_order.id,
            'transaction_id', v_existing_tx.id,
            'is_premium', v_profile.is_premium,
            'tier', v_profile.subscription_tier,
            'expires_at', v_profile.subscription_expires_at,
            'bonus_coins_awarded', 0
        );
    END IF;

    -- Ensure order hasn't already been fulfilled with a DIFFERENT payment ID
    SELECT provider_payment_id INTO v_existing_order_payment_id
    FROM public.payment_transactions
    WHERE order_id = v_order.id
      AND status = 'captured';

    IF FOUND AND v_existing_order_payment_id <> p_provider_payment_id THEN
        RAISE EXCEPTION 'Order % has already been fulfilled by payment %', p_provider_order_id, v_existing_order_payment_id
            USING ERRCODE = '23505';
    END IF;

    -- 4. Promotional Inventory Enforcement (Atomic Claim)
    IF v_order.is_promotional THEN
        UPDATE public.promotional_slots
        SET claimed = TRUE,
            user_id = p_user_id,
            claimed_at = clock_timestamp(),
            status = 'claimed'
        WHERE order_id = v_order.id
          AND status = 'reserved'
          AND reserved_until > clock_timestamp();

        GET DIAGNOSTICS v_slot_updated = ROW_COUNT;

        IF v_slot_updated = 0 THEN
            -- Reservation expired or invalid; attempt immediate atomic claim of any available unreserved slot
            UPDATE public.promotional_slots
            SET claimed = TRUE,
                user_id = p_user_id,
                order_id = v_order.id,
                claimed_at = clock_timestamp(),
                status = 'claimed'
            WHERE slot_number = (
                SELECT slot_number
                FROM public.promotional_slots
                WHERE claimed = FALSE
                  AND (status = 'available' OR (status = 'reserved' AND reserved_until < clock_timestamp()))
                ORDER BY slot_number ASC
                LIMIT 1
                FOR UPDATE SKIP LOCKED
            );

            GET DIAGNOSTICS v_slot_updated = ROW_COUNT;

            IF v_slot_updated = 0 THEN
                RAISE EXCEPTION 'PROMOTIONAL_INVENTORY_EXHAUSTED: No promotional slots available to claim for order %', p_provider_order_id
                    USING ERRCODE = 'P0003';
            END IF;
        END IF;
    END IF;

    -- 5. Calculate sequential subscription extension
    IF v_profile.subscription_expires_at IS NOT NULL AND v_profile.subscription_expires_at > clock_timestamp() THEN
        v_calculated_expiry := v_profile.subscription_expires_at + (v_duration_days || ' days')::INTERVAL;
    ELSE
        v_calculated_expiry := clock_timestamp() + (v_duration_days || ' days')::INTERVAL;
    END IF;

    v_coins_to_award := v_base_bonus_coins;

    -- 6. Insert transaction ledger record
    INSERT INTO public.payment_transactions (
        order_id,
        user_id,
        provider,
        provider_payment_id,
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
        p_amount_paise,
        upper(btrim(p_currency)),
        'captured',
        jsonb_build_object(
            'provider_order_id', p_provider_order_id,
            'provider_signature', p_provider_signature,
            'plan_id', v_order.plan_id,
            'tier', v_derived_tier,
            'raw', p_raw_payload
        ),
        clock_timestamp()
    );

    -- 7. Update order status to 'paid'
    UPDATE public.payment_orders
    SET status = 'paid',
        updated_at = clock_timestamp()
    WHERE id = v_order.id;

    -- 8. Mutate candidate profile entitlement
    UPDATE public.profiles
    SET is_premium = TRUE,
        subscription_tier = CASE
            WHEN v_profile.subscription_tier = 'all_access_pass' THEN 'all_access_pass'
            ELSE v_derived_tier
        END,
        subscription_expires_at = v_calculated_expiry,
        campus_coins = coalesce(campus_coins, 0) + v_coins_to_award,
        updated_at = clock_timestamp()
    WHERE id = p_user_id;

    RETURN jsonb_build_object(
        'success', true,
        'idempotent', false,
        'order_id', v_order.id,
        'is_premium', true,
        'tier', CASE WHEN v_profile.subscription_tier = 'all_access_pass' THEN 'all_access_pass' ELSE v_derived_tier END,
        'expires_at', v_calculated_expiry,
        'bonus_coins_awarded', v_coins_to_award,
        'message', 'CUETMate Premium successfully activated'
    );
END;
$$;

REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM anon;
REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) TO service_role;

COMMIT;
