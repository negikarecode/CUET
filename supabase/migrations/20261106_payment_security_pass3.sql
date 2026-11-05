-- ==============================================================================
-- CUETMATE SECURITY REMEDIATION: PAYMENT SECURITY PASS 3
-- Migration: 20261106_payment_security_pass3.sql
--
-- PURPOSE:
-- 1. Create public.payment_webhook_events durable event inbox/ledger with
--    unique provider event ID indexing to prevent replay and out-of-order corruption.
-- 2. Update payment_orders status check constraint to include 'disputed_lost'.
-- 3. Provide atomic public.record_webhook_event and public.finalize_webhook_event RPCs.
-- 4. Provide atomic public.process_payment_refund RPC:
--    - Do NOT treat refund.created as completed; only confirmed refund.processed
--      can alter transaction and entitlement state.
--    - Calculate cumulative refunds authoritative from public.payment_refunds ledger.
--    - Prevent double counting on duplicate webhooks.
--    - Enforce cumulative refunded amount <= captured amount.
--    - Handle out-of-order events without downgrading processed status.
-- 5. Provide atomic public.process_payment_dispute RPC:
--    - Monotonic dispute state machine with row-level locks (FOR UPDATE).
--    - Dispute creation does NOT count as refund and does NOT release promotional inventory.
--    - Dispute won strictly CANNOT restore a transaction that was already refunded.
--    - Dispute lost revokes entitlement as 'disputed_lost' without falsely marking as refunded.
--    - Delayed/out-of-order events cannot overwrite newer authoritative states.
-- 6. Harden public.reconcile_user_entitlements to guarantee only verified, non-refunded,
--    non-lost captured purchases contribute to active subscription access.
-- ==============================================================================

BEGIN;

-- ─── 1. EXTEND PAYMENT ORDERS STATUS ENUM FOR DISPUTE OUTCOME ──────────────────
ALTER TABLE public.payment_orders DROP CONSTRAINT IF EXISTS payment_orders_status_check;
ALTER TABLE public.payment_orders ADD CONSTRAINT payment_orders_status_check 
    CHECK (status = ANY (ARRAY['created'::text, 'attempted'::text, 'paid'::text, 'failed'::text, 'cancelled'::text, 'refunded'::text, 'disputed_lost'::text]));

-- ─── 2. PAYMENT WEBHOOK EVENTS DURABLE INBOX ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.payment_webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL DEFAULT 'razorpay',
    event_id TEXT,
    event_type TEXT NOT NULL,
    payment_id TEXT,
    order_id TEXT,
    signature TEXT,
    payload JSONB NOT NULL DEFAULT '{}'::JSONB,
    status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'processed', 'failed', 'deferred', 'ignored')),
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_payment_id ON public.payment_webhook_events(payment_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_order_id ON public.payment_webhook_events(order_id);
CREATE UNIQUE INDEX IF NOT EXISTS uq_payment_webhook_events_provider_event 
    ON public.payment_webhook_events(provider, event_id) 
    WHERE event_id IS NOT NULL;

ALTER TABLE public.payment_webhook_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_webhook_events FROM PUBLIC;
REVOKE ALL ON public.payment_webhook_events FROM anon;
REVOKE ALL ON public.payment_webhook_events FROM authenticated;
GRANT ALL ON public.payment_webhook_events TO service_role;

-- ─── 3. WEBHOOK INBOX RECORDING & DEDUPLICATION RPCs ───────────────────────────
CREATE OR REPLACE FUNCTION public.record_webhook_event(
    p_provider TEXT,
    p_event_id TEXT,
    p_event_type TEXT,
    p_payment_id TEXT,
    p_order_id TEXT,
    p_signature TEXT,
    p_payload JSONB DEFAULT '{}'::JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_existing RECORD;
    v_new_id UUID;
BEGIN
    IF p_event_id IS NOT NULL AND btrim(p_event_id) <> '' THEN
        -- Check if event already exists
        SELECT id, status, created_at
        INTO v_existing
        FROM public.payment_webhook_events
        WHERE provider = coalesce(p_provider, 'razorpay')
          AND event_id = p_event_id;

        IF FOUND THEN
            IF v_existing.status = 'processed' THEN
                RETURN jsonb_build_object(
                    'is_duplicate', true,
                    'status', 'processed',
                    'action', 'ignore',
                    'event_pk', v_existing.id
                );
            ELSE
                -- Previous delivery is still processing or had failed; allow reprocessing
                RETURN jsonb_build_object(
                    'is_duplicate', false,
                    'status', v_existing.status,
                    'action', 'reprocess',
                    'event_pk', v_existing.id
                );
            END IF;
        END IF;
    END IF;

    -- Insert new event record
    INSERT INTO public.payment_webhook_events (
        provider,
        event_id,
        event_type,
        payment_id,
        order_id,
        signature,
        payload,
        status
    ) VALUES (
        coalesce(p_provider, 'razorpay'),
        NULLIF(btrim(p_event_id), ''),
        p_event_type,
        p_payment_id,
        p_order_id,
        p_signature,
        p_payload,
        'processing'
    )
    RETURNING id INTO v_new_id;

    RETURN jsonb_build_object(
        'is_duplicate', false,
        'status', 'processing',
        'action', 'process',
        'event_pk', v_new_id
    );
EXCEPTION
    WHEN unique_violation THEN
        -- Concurrently inserted matching event_id
        SELECT id, status
        INTO v_existing
        FROM public.payment_webhook_events
        WHERE provider = coalesce(p_provider, 'razorpay')
          AND event_id = p_event_id;

        RETURN jsonb_build_object(
            'is_duplicate', true,
            'status', coalesce(v_existing.status, 'processing'),
            'action', 'ignore',
            'event_pk', v_existing.id
        );
END;
$$;

REVOKE ALL ON FUNCTION public.record_webhook_event(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.record_webhook_event(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) FROM anon;
REVOKE ALL ON FUNCTION public.record_webhook_event(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.record_webhook_event(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) TO service_role;

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
BEGIN
    UPDATE public.payment_webhook_events
    SET status = p_status,
        error_message = p_error_message,
        processed_at = clock_timestamp()
    WHERE id = p_event_pk;
END;
$$;

REVOKE ALL ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_webhook_event(UUID, TEXT, TEXT) TO service_role;

-- ─── 4. ATOMIC PROCESS PAYMENT REFUND RPC ─────────────────────────────────────
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
BEGIN
    IF p_provider_refund_id IS NULL OR btrim(p_provider_refund_id) = '' THEN
        RAISE EXCEPTION 'Provider refund ID is required' USING ERRCODE = '22023';
    END IF;

    IF p_payment_id IS NULL OR btrim(p_payment_id) = '' THEN
        RAISE EXCEPTION 'Payment ID is required' USING ERRCODE = '22023';
    END IF;

    -- 1. Lock parent transaction FOR UPDATE to serialize all concurrent refund/dispute events
    SELECT id, order_id, user_id, amount_paise, status, refunded_amount_paise
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

    -- 2. Inspect existing refund record for this refund ID
    SELECT id, status, amount_paise
    INTO v_existing_refund
    FROM public.payment_refunds
    WHERE provider_refund_id = p_provider_refund_id
    FOR UPDATE;

    IF FOUND THEN
        -- Out-of-order guard: Never downgrade a 'processed' refund to 'created'
        IF v_existing_refund.status = 'processed' AND v_refund_status = 'created' THEN
            v_refund_status := 'processed';
        END IF;

        UPDATE public.payment_refunds
        SET status = v_refund_status,
            raw_payload = p_raw_payload
        WHERE provider_refund_id = p_provider_refund_id;
    ELSE
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
            coalesce(p_provider, 'razorpay'),
            p_provider_refund_id,
            p_payment_id,
            p_amount_paise,
            coalesce(p_currency, 'INR'),
            v_refund_status,
            p_raw_payload
        );
    END IF;

    -- 3. CRITICAL RULE: refund.created is NOT a completed refund.
    -- Only confirmed 'refund.processed' events can alter transaction status or entitlement.
    IF p_event_type <> 'refund.processed' THEN
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

    -- Enforce invariant: cumulative refunded cannot exceed captured amount
    IF v_cumulative_refunded > v_tx.amount_paise THEN
        v_cumulative_refunded := v_tx.amount_paise;
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

-- ─── 5. ATOMIC PROCESS PAYMENT DISPUTE RPC ────────────────────────────────────
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
    v_dispute_status TEXT;
    v_new_tx_status TEXT;
    v_should_reconcile BOOLEAN := false;
BEGIN
    IF p_provider_dispute_id IS NULL OR btrim(p_provider_dispute_id) = '' THEN
        RAISE EXCEPTION 'Provider dispute ID is required' USING ERRCODE = '22023';
    END IF;

    IF p_payment_id IS NULL OR btrim(p_payment_id) = '' THEN
        RAISE EXCEPTION 'Payment ID is required' USING ERRCODE = '22023';
    END IF;

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
        v_dispute_status := 'won';
    ELSIF p_event_type = 'payment.dispute.lost' THEN
        v_dispute_status := 'lost';
    ELSE
        v_dispute_status := 'under_review';
    END IF;

    -- 2. Inspect existing dispute record for monotonic state protection
    SELECT id, status
    INTO v_existing_dispute
    FROM public.payment_disputes
    WHERE provider_dispute_id = p_provider_dispute_id
    FOR UPDATE;

    IF FOUND THEN
        -- Delayed event guard: Do NOT let a delayed 'under_review' event overwrite finalized 'won' or 'lost'
        IF v_existing_dispute.status IN ('won', 'lost') AND v_dispute_status = 'under_review' THEN
            v_dispute_status := v_existing_dispute.status;
        ELSE
            UPDATE public.payment_disputes
            SET status = v_dispute_status,
                reason_code = coalesce(p_reason_code, payment_disputes.reason_code),
                raw_payload = p_raw_payload,
                updated_at = clock_timestamp()
            WHERE provider_dispute_id = p_provider_dispute_id;
        END IF;
    ELSE
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
            v_dispute_status,
            p_reason_code,
            p_raw_payload
        );
    END IF;

    -- 3. Evaluate Transaction Status Transitions
    -- CRITICAL INVARIANT: "Dispute won must not restore a transaction that has already been fully refunded."
    IF v_tx.status = 'refunded' THEN
        -- Record dispute resolution in ledger, but transaction remains refunded.
        UPDATE public.payment_transactions
        SET dispute_status = v_dispute_status
        WHERE id = v_tx.id;

        RETURN jsonb_build_object(
            'success', true,
            'event_type', p_event_type,
            'dispute_status', v_dispute_status,
            'tx_status', 'refunded',
            'user_id', v_tx.user_id,
            'order_id', v_tx.order_id,
            'should_reconcile', false,
            'notice', 'Transaction was previously fully refunded; dispute outcome will not alter refunded status.'
        );
    END IF;

    IF v_dispute_status = 'under_review' THEN
        -- Dispute creation: Mark transaction as disputed (under review).
        -- Does NOT count as a refund! Does NOT release promotional inventory!
        IF v_tx.status IN ('captured', 'partially_refunded') THEN
            UPDATE public.payment_transactions
            SET status = 'disputed',
                dispute_status = 'under_review'
            WHERE id = v_tx.id;
        END IF;
        v_new_tx_status := 'disputed';
        v_should_reconcile := false;

    ELSIF v_dispute_status = 'won' THEN
        -- Dispute won: Reaffirm captured status.
        UPDATE public.payment_transactions
        SET status = 'captured',
            dispute_status = 'won'
        WHERE id = v_tx.id;
        v_new_tx_status := 'captured';
        v_should_reconcile := true;

    ELSIF v_dispute_status = 'lost' THEN
        -- Dispute lost: Update transaction to disputed_lost.
        -- Revokes entitlement without falsely pretending a refund occurred.
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
        'dispute_status', v_dispute_status,
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

-- ─── 6. REAFFIRM RECONCILE ENTITLEMENTS INVARIANTS ───────────────────────────
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
        v_has_valid_tx := true;

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

        IF v_current_expiry IS NOT NULL AND v_tx.verified_at < v_current_expiry THEN
            v_current_expiry := v_current_expiry + (v_tx_duration_days || ' days')::INTERVAL;
        ELSE
            v_current_expiry := v_tx.verified_at + (v_tx_duration_days || ' days')::INTERVAL;
        END IF;
    END LOOP;

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

COMMIT;
