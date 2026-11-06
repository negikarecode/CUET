-- ==============================================================================
-- CUETMATE SECURITY REMEDIATION: PAYMENT SECURITY PASS 5
-- Migration: 20261106_payment_security_pass5.sql
--
-- PURPOSE:
-- 1. Dispute Reversal Authorization & Immutable Audit Ledger:
--    - Reversals CANNOT be triggered merely by incoming events named 'payment.dispute.reversal_approved'.
--    - process_payment_dispute strictly rejects 'payment.dispute.reversal_approved' as an unauthorized webhook event.
--    - Creates public.payment_dispute_reversal_audit table with immutable trigger (rejects UPDATE / DELETE).
--    - Implements dedicated public.execute_authorized_dispute_reversal RPC:
--      * Restricted exclusively to service_role.
--      * Validates authorized actor_source (e.g., internal_admin:, ops:, security_officer:).
--      * Requires explicit justification reason (minimum 5 characters).
--      * Strictly forbids restoring a refunded transaction (CANNOT_REVERSE_REFUNDED_TRANSACTION).
--      * Enforces terminal state protections and records immutable audit ledger entry.
-- 2. Refund Ledger Immutability & Status Transition Hardening:
--    - Once a refund is 'processed', its status and original audit payload (raw_payload) are strictly immutable.
--    - Delayed 'refund.created' or 'refund.failed' events do NOT overwrite status or raw_payload.
--    - Duplicate 'refund.processed' events are idempotent and do NOT overwrite original raw_payload.
--    - Prevents invalid 'failed -> created' transitions when a delayed 'refund.created' arrives after 'failed'.
--    - Preserves strict immutable identity (payment_id, amount, currency, provider) and atomic over-refund rejection.
-- ==============================================================================

BEGIN;

-- ─── 1. IMMUTABLE DISPUTE REVERSAL AUDIT TABLE ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.payment_dispute_reversal_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispute_id UUID NOT NULL REFERENCES public.payment_disputes(id) ON DELETE RESTRICT,
    provider_dispute_id TEXT NOT NULL,
    payment_id TEXT NOT NULL,
    previous_status TEXT NOT NULL,
    new_status TEXT NOT NULL,
    actor_source TEXT NOT NULL,
    reason TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS idx_dispute_reversal_audit_dispute
    ON public.payment_dispute_reversal_audit(dispute_id);
CREATE INDEX IF NOT EXISTS idx_dispute_reversal_audit_payment
    ON public.payment_dispute_reversal_audit(payment_id);
CREATE INDEX IF NOT EXISTS idx_dispute_reversal_audit_created
    ON public.payment_dispute_reversal_audit(created_at DESC);

-- Trigger to enforce append-only immutability
CREATE OR REPLACE FUNCTION public.prevent_dispute_audit_modification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION 'Dispute reversal audit entries are immutable and cannot be updated or deleted'
        USING ERRCODE = '22023';
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_dispute_audit_modification ON public.payment_dispute_reversal_audit;
CREATE TRIGGER trg_prevent_dispute_audit_modification
BEFORE UPDATE OR DELETE ON public.payment_dispute_reversal_audit
FOR EACH ROW
EXECUTE FUNCTION public.prevent_dispute_audit_modification();

ALTER TABLE public.payment_dispute_reversal_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.payment_dispute_reversal_audit FROM PUBLIC;
REVOKE ALL ON TABLE public.payment_dispute_reversal_audit FROM anon;
REVOKE ALL ON TABLE public.payment_dispute_reversal_audit FROM authenticated;
GRANT SELECT, INSERT ON TABLE public.payment_dispute_reversal_audit TO service_role;

-- ─── 2. DEDICATED AUTHORIZED DISPUTE REVERSAL RPC ────────────────────────────
DROP FUNCTION IF EXISTS public.execute_authorized_dispute_reversal(TEXT, TEXT, TEXT, TEXT, TEXT, JSONB);
CREATE OR REPLACE FUNCTION public.execute_authorized_dispute_reversal(
    p_provider_dispute_id TEXT,
    p_payment_id TEXT,
    p_target_dispute_status TEXT,
    p_actor_source TEXT,
    p_reason TEXT,
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_tx RECORD;
    v_existing_dispute RECORD;
    v_audit_id UUID;
    v_new_tx_status TEXT;
    v_should_reconcile BOOLEAN := false;
BEGIN
    -- 1. Validate inputs
    IF p_provider_dispute_id IS NULL OR btrim(p_provider_dispute_id) = '' THEN
        RAISE EXCEPTION 'Provider dispute ID is required for authorized reversal' USING ERRCODE = '22023';
    END IF;

    IF p_payment_id IS NULL OR btrim(p_payment_id) = '' THEN
        RAISE EXCEPTION 'Payment ID is required for authorized reversal' USING ERRCODE = '22023';
    END IF;

    IF p_target_dispute_status IS NULL OR p_target_dispute_status NOT IN ('won', 'lost', 'under_review') THEN
        RAISE EXCEPTION 'Invalid target dispute status: %. Must be won, lost, or under_review', p_target_dispute_status
            USING ERRCODE = '22023';
    END IF;

    -- Actor validation: Must follow an explicit, trusted internal or provider actor pattern
    IF p_actor_source IS NULL OR btrim(p_actor_source) = '' THEN
        RAISE EXCEPTION 'Actor/source is required for authorized dispute reversal' USING ERRCODE = '22023';
    END IF;

    IF NOT (
        p_actor_source LIKE 'internal_admin:%' OR
        p_actor_source LIKE 'ops:%' OR
        p_actor_source LIKE 'security_officer:%' OR
        p_actor_source LIKE 'system_reconciliation:%' OR
        p_actor_source LIKE 'provider_verified:%'
    ) THEN
        RAISE EXCEPTION 'UNAUTHORIZED_REVERSAL_ACTOR: Actor source % is not authorized to execute dispute reversals', p_actor_source
            USING ERRCODE = '42501';
    END IF;

    -- Reason validation: non-empty justification
    IF p_reason IS NULL OR length(btrim(p_reason)) < 5 THEN
        RAISE EXCEPTION 'REVERSAL_REASON_REQUIRED: A valid explanation (minimum 5 chars) is required for dispute reversal'
            USING ERRCODE = '22023';
    END IF;

    -- 2. Lock parent transaction FOR UPDATE
    SELECT id, order_id, user_id, amount_paise, status, dispute_status
    INTO v_tx
    FROM public.payment_transactions
    WHERE provider_payment_id = p_payment_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Transaction for payment % not found', p_payment_id USING ERRCODE = 'P0002';
    END IF;

    -- CRITICAL INVARIANT: Reversal cannot restore a refunded payment
    IF v_tx.status = 'refunded' THEN
        RAISE EXCEPTION 'CANNOT_REVERSE_REFUNDED_TRANSACTION: Cannot reverse dispute for payment % because transaction is already fully refunded', p_payment_id
            USING ERRCODE = '22023';
    END IF;

    -- 3. Lock dispute record FOR UPDATE
    SELECT id, status, provider_dispute_id, payment_id, amount_paise
    INTO v_existing_dispute
    FROM public.payment_disputes
    WHERE provider_dispute_id = p_provider_dispute_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Dispute % not found for reversal', p_provider_dispute_id USING ERRCODE = 'P0002';
    END IF;

    IF v_existing_dispute.payment_id <> p_payment_id THEN
        RAISE EXCEPTION 'DISPUTE_PAYMENT_MISMATCH: Dispute % belongs to payment %, not %',
            p_provider_dispute_id, v_existing_dispute.payment_id, p_payment_id USING ERRCODE = '22023';
    END IF;

    IF v_existing_dispute.status = p_target_dispute_status THEN
        RAISE EXCEPTION 'REVERSAL_NOOP_SAME_STATUS: Dispute is already in % status', p_target_dispute_status
            USING ERRCODE = '22023';
    END IF;

    -- 4. Record immutable audit entry
    INSERT INTO public.payment_dispute_reversal_audit (
        dispute_id,
        provider_dispute_id,
        payment_id,
        previous_status,
        new_status,
        actor_source,
        reason,
        metadata
    ) VALUES (
        v_existing_dispute.id,
        p_provider_dispute_id,
        p_payment_id,
        v_existing_dispute.status,
        p_target_dispute_status,
        p_actor_source,
        p_reason,
        coalesce(p_metadata, '{}'::jsonb)
    )
    RETURNING id INTO v_audit_id;

    -- 5. Update dispute status
    UPDATE public.payment_disputes
    SET status = p_target_dispute_status,
        updated_at = clock_timestamp()
    WHERE id = v_existing_dispute.id;

    -- 6. Apply state transition to transaction and orders
    IF p_target_dispute_status = 'won' THEN
        UPDATE public.payment_transactions
        SET status = 'captured',
            dispute_status = 'won'
        WHERE id = v_tx.id;
        v_new_tx_status := 'captured';
        v_should_reconcile := true;

    ELSIF p_target_dispute_status = 'lost' THEN
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

    ELSIF p_target_dispute_status = 'under_review' THEN
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
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'audit_id', v_audit_id,
        'previous_status', v_existing_dispute.status,
        'new_status', p_target_dispute_status,
        'tx_status', v_new_tx_status,
        'user_id', v_tx.user_id,
        'order_id', v_tx.order_id,
        'actor_source', p_actor_source,
        'reason', p_reason,
        'should_reconcile', v_should_reconcile
    );
END;
$$;

REVOKE ALL ON FUNCTION public.execute_authorized_dispute_reversal(TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.execute_authorized_dispute_reversal(TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) FROM anon;
REVOKE ALL ON FUNCTION public.execute_authorized_dispute_reversal(TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.execute_authorized_dispute_reversal(TEXT, TEXT, TEXT, TEXT, TEXT, JSONB) TO service_role;

-- ─── 3. STRICT MONOTONIC DISPUTE STATE MACHINE (NO WEBHOOK REVERSALS) ────────
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
BEGIN
    IF p_provider_dispute_id IS NULL OR btrim(p_provider_dispute_id) = '' THEN
        RAISE EXCEPTION 'Provider dispute ID is required' USING ERRCODE = '22023';
    END IF;

    IF p_payment_id IS NULL OR btrim(p_payment_id) = '' THEN
        RAISE EXCEPTION 'Payment ID is required' USING ERRCODE = '22023';
    END IF;

    -- REVERSAL GUARD: Ordinary webhook events CANNOT authorize dispute reversals!
    IF p_event_type = 'payment.dispute.reversal_approved' THEN
        RAISE EXCEPTION 'UNAUTHORIZED_DISPUTE_REVERSAL: Dispute reversals cannot be performed via webhook events. They require explicit authorization via execute_authorized_dispute_reversal.'
            USING ERRCODE = '42501';
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
            RAISE EXCEPTION 'TERMINAL_STATE_VIOLATION: Cannot transition finalized dispute from % to % through ordinary webhook. Dispute reversals require explicit authorized internal operation via execute_authorized_dispute_reversal.',
                v_existing_dispute.status, v_target_dispute_status
                USING ERRCODE = '22023';
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
    IF v_tx.status = 'disputed_lost' AND v_target_dispute_status = 'won' THEN
        RAISE EXCEPTION 'TERMINAL_STATE_VIOLATION: Cannot restore disputed_lost transaction to captured via dispute.won webhook. Dispute reversals require execute_authorized_dispute_reversal.'
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

-- ─── 4. HARDENED REFUND LEDGER WITH STRICT PAYLOAD IMMUTABILITY ───────────────
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
    SELECT id, status, payment_id, transaction_id, provider, amount_paise, currency, raw_payload
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

        -- STATUS & PAYLOAD IMMUTABILITY RULES:
        -- Rule 1: A 'processed' refund is strictly terminal and immutable.
        -- Its status cannot be downgraded, and its original raw_payload MUST NOT be overwritten.
        IF v_existing_refund.status = 'processed' THEN
            -- Duplicate delivery of processed event or delayed created/failed event:
            -- NEVER overwrite raw_payload or status.
            RETURN jsonb_build_object(
                'success', true,
                'is_duplicate', true,
                'is_processed', true,
                'action', CASE WHEN v_refund_status = 'processed' THEN 'duplicate_processed_ignored' ELSE 'ignored_delayed_event' END,
                'refund_status', 'processed',
                'cumulative_refunded_paise', v_tx.refunded_amount_paise,
                'captured_amount_paise', v_tx.amount_paise,
                'user_id', v_tx.user_id,
                'order_id', v_tx.order_id,
                'should_reconcile', false,
                'notice', 'Refund is already processed; status and original payload are immutable.'
            );
        END IF;

        -- Rule 2: A 'failed' refund must NEVER transition back to 'created' (delayed event).
        IF v_existing_refund.status = 'failed' AND v_refund_status = 'created' THEN
            RETURN jsonb_build_object(
                'success', true,
                'is_duplicate', true,
                'is_processed', false,
                'action', 'ignored_delayed_event',
                'refund_status', 'failed',
                'user_id', v_tx.user_id,
                'order_id', v_tx.order_id,
                'should_reconcile', false,
                'notice', 'Delayed refund.created after refund.failed ignored; failed state is immutable against created.'
            );
        END IF;

        -- Rule 3: Duplicate 'failed' event is idempotent without mutating payload
        IF v_existing_refund.status = 'failed' AND v_refund_status = 'failed' THEN
            RETURN jsonb_build_object(
                'success', true,
                'is_duplicate', true,
                'is_processed', false,
                'action', 'duplicate_failed_ignored',
                'refund_status', 'failed',
                'user_id', v_tx.user_id,
                'order_id', v_tx.order_id,
                'should_reconcile', false
            );
        END IF;

        -- Rule 4: Duplicate 'created' event is idempotent without mutating payload
        IF v_existing_refund.status = 'created' AND v_refund_status = 'created' THEN
            RETURN jsonb_build_object(
                'success', true,
                'is_duplicate', true,
                'is_processed', false,
                'action', 'duplicate_created_ignored',
                'refund_status', 'created',
                'user_id', v_tx.user_id,
                'order_id', v_tx.order_id,
                'should_reconcile', false
            );
        END IF;

        -- Valid transitions:
        -- created -> processed, created -> failed, or failed -> processed
        UPDATE public.payment_refunds
        SET status = v_refund_status,
            raw_payload = p_raw_payload
        WHERE id = v_existing_refund.id;

    ELSE
        -- Insert new refund record into ledger with initial payload
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

    -- CRITICAL INVARIANT: DO NOT SILENTLY CLAMP!
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

COMMIT;
