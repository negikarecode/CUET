# CUETMATE — FORENSIC PAYMENT INFRASTRUCTURE REMEDIATION REPORT (PASS 1 & PASS 2)

**Application:** CUETMate (`cuetmate.vercel.app`)  
**Repository:** `negikarecode/CUET`  
**Base Branch:** `main`  
**Working Branch:** `fix/payment-infrastructure-remediation`  
**Date:** November 6, 2026  
**Roles:** Principal Backend Engineer, PostgreSQL/Supabase Security Specialist, Razorpay Payment Infrastructure Engineer  

---

## 1. Executive Summary

Following a forensic audit and an independent review of the payment infrastructure remediation branch, all identified vulnerabilities and correctness issues have been systematically resolved.

The remediation covers two full passes of hardening:
- **Pass 1:** Elimination of authorization-only Premium activations, server-side plan authorization, partial unique indexing on captured transactions, atomic promotional slot reservation with inventory rollback, and fail-closed order persistence.
- **Pass 2:** Strict webhook payment entity separation, independent dispute lifecycle management, cumulative partial refund support, elimination of non-atomic promotional fallbacks, strict plan ID validation, exact amount checks (rejecting underpayment and overpayment), sequential subscription extension preservation during refund reconciliation, and cross-order payment reuse prevention.

---

## 2. Review Findings & Remediation (Pass 2)

### P1. Webhook Payment Identity & Order Entity Separation
- **Finding:** In `lib/payments/provider.ts`, `entity?.id` fallback could incorrectly interpret an order entity ID as a payment ID when handling `order.paid`. In addition, synthesized payment IDs (`wh_${Date.now()}`) were previously passed to the fulfillment RPC.
- **Remediation:**
  - `WebhookVerificationResult` now explicitly distinguishes `paymentId`, `orderId`, `refundId`, and `disputeId`.
  - An order ID is **never** used as a payment ID. No synthesized payment IDs are generated.
  - `order.paid` webhooks are never fulfilled solely from the order entity; the actual captured payment is retrieved via `provider.fetchOrderPayments(orderId)`. If no captured payment is confirmed by the provider, fulfillment is safely deferred.
  - Webhooks strictly verify provider matching, currency matching, and exact amount matching before invoking `fulfill_payment_order`.

### P1. Disputes Separated From Refunds
- **Finding:** Dispute-created events (`payment.dispute.created`) were previously grouped with refunds, marking the transaction refunded and releasing promotional inventory while a chargeback was merely under review.
- **Remediation:**
  - Dedicated handling for `payment.dispute.created`, `payment.dispute.won`, and `payment.dispute.lost`.
  - **Dispute Created:** Transaction status transitions to `disputed` with `dispute_status: 'under_review'`. An audit entry is recorded in `payment_disputes`. Promotional inventory is **not** released. Entitlement policy: Premium access is preserved in good faith while under bank review.
  - **Dispute Won:** Transaction status is restored to `captured` with `dispute_status: 'won'`. Premium entitlement is reaffirmed and promotional slot remains claimed.
  - **Dispute Lost:** Transaction status is updated to `disputed_lost` with `dispute_status: 'lost'`. Order status is marked `refunded`, promotional inventory is released (`status = 'released'`), and `reconcileUserEntitlements()` is invoked to revoke access if no other valid purchases exist.

### P1. Partial Refunds vs Full Refunds
- **Finding:** Any refund event previously marked the entire transaction and order refunded and revoked Premium immediately.
- **Remediation:**
  - Implemented authoritative cumulative refund tracking via `payment_refunds` audit ledger and `payment_transactions.refunded_amount_paise`.
  - Authoritative cumulative refund amount is computed from `payment.amount_refunded` (or sum of `payment_refunds`).
  - **Partial Refund (`cumulativeRefunded < capturedAmount`):**
    - Transaction marked `partially_refunded`.
    - Documented Business Policy: *Partial refunds (e.g., fee adjustments, goodwill credits, or subject discounts) do NOT revoke the user's Premium subscription or release their promotional inventory.*
    - Promotional inventory remains claimed. Candidate retains active Premium.
  - **Full Refund (`cumulativeRefunded >= capturedAmount`):**
    - Transaction and order marked `refunded`.
    - Promotional inventory released (`status = 'released'`).
    - Entitlement revoked via `reconcileUserEntitlements()`.
  - Idempotency: `provider_refund_id TEXT UNIQUE NOT NULL` ensures replay webhook deliveries do not double-count refunds.

### P1. Removal of Non-Atomic Promotional Fallback
- **Finding:** `app/api/payments/route.ts` contained a client-side JavaScript SELECT-then-UPDATE fallback when the `reserve_promotional_slot` RPC was not available.
- **Remediation:**
  - The JavaScript fallback has been completely removed.
  - The atomic `public.reserve_promotional_slot()` RPC with `FOR UPDATE SKIP LOCKED` is the sole reservation path.
  - If the RPC fails or returns `NULL` (inventory exhausted), the local order is marked `failed` and the API fails closed with HTTP 409 `PROMOTIONAL_SLOTS_EXHAUSTED`.
  - The SQL RPC validates that the supplied order exists, belongs to the candidate, has `is_promotional = true`, and has status `IN ('created', 'pending')`.

### P1. Rejection of Invalid Plan Identifiers
- **Finding:** Unknown plan IDs in `create-order` previously fell back to `all_access_pass_799`.
- **Remediation:**
  - Missing or unknown plan IDs are rejected with HTTP 400 `INVALID_PLAN`.
  - `getPlanConfig()` strictly validates plan existence against `SUPPORTED_PLANS` without silent defaulting.

### P1. Exact Payment Amount Validation
- **Finding:** Amount checks only tested `amount < requiredAmountPaise`, permitting overpayment and potential fee manipulation.
- **Remediation:**
  - Both route verification and `fulfill_payment_order` SQL RPC require `p_amount_paise = v_order.amount_paise` exactly.
  - Any underpayment or overpayment raises `PAYMENT_AMOUNT_MISMATCH`.
  - SQL RPC asserts exact price matches for each plan (`79900` standard / `200` promotional for `all_access_pass`, `49900` for `ai_practice_pass`, `39900` for `ai_pass`).

### P1. Sequential Subscription Extension & Entitlement Reconciliation
- **Finding:** Previous reconciliation recalculated expiry as `tx.verified_at + 365 days`, wiping out sequential subscription extensions awarded by `fulfill_payment_order` (which adds 1 year to existing unexpired expiry).
- **Remediation:**
  - Chronological duration stacking model implemented in `reconcileUserEntitlements`:
    - Surviving valid transactions (`captured`, `partially_refunded`, `disputed`) are ordered by `verified_at ASC`.
    - If a purchase occurred while a previous subscription was still active (`verified_at < current_expiry`), the plan's duration is sequentially appended to `current_expiry`.
    - Preserves sequential extensions without gaps or premature revocations upon refund of adjacent purchases.
  - Migration 2 provides `public.reconcile_user_entitlements(UUID)` RPC with row-level lock (`FOR UPDATE`) on `profiles` to serialize concurrent webhook reconciliation.
  - All Supabase database update errors are checked and thrown.

### P2. Stronger Idempotency & Replay Verification
- **Finding:** Previous RPC idempotency check returned success before verifying that the existing transaction belonged to the requested order.
- **Remediation:**
  - `fulfill_payment_order` asserts `v_existing_tx.order_id = v_order.id`. If a payment ID was previously fulfilled for a different order, it raises `23505` (`Payment ID is already bound to a different order`).
  - Verifies candidate `user_id`, `provider`, `amount_paise`, and `currency` on replay.
  - Transaction identity is immutable: `ON CONFLICT (provider_payment_id) DO UPDATE` only updates metadata where `payment_transactions.order_id = EXCLUDED.order_id`, preventing transaction reassignment.

### P2. External Order Cleanup & Orphan Handling
- **Strategy:** When Razorpay order creation succeeds but local order persistence fails:
  - Fails closed with HTTP 500 `ORDER_PERSISTENCE_FAILED`.
  - No checkout order ID or payment key is returned to the client, preventing the user from completing payment.
  - Generates an internal diagnostic tracking ID (`diag_${crypto.randomUUID()}`) logged with `provider_order_id` and `user_id`.
  - Unpaid Razorpay orders expire automatically at gateway without merchant action or customer charge.
  - Webhook handlers reject fulfillment for any incoming event referencing an unpersisted order because the order does not exist in `payment_orders`.

---

## 3. Classification of Issues

### FIXED AND INTEGRATION TESTED
1. **Webhook payment entity separation & identity:** `verifyWebhook` extracts distinct payment, order, refund, and dispute entities. Tested with authentic payloads (`tests/payment-remediation-pass2-behavioral.test.ts`, Test 1).
2. **Order paid without payment ID deferral:** Tested with authentic Razorpay `order.paid` payload lacking payment entity (Test 2).
3. **Capture gate & authorization rejection:** `authorized` payment rejected, `captured` verified (Tests 1.1, 1.2, Test 4).
4. **Dispute lifecycle separation:** Dispute created preserves inventory and does not mark refunded (Test 5); dispute won restores captured (Test 6); dispute lost transitions to lost and releases inventory (Test 7).
5. **Partial vs Full refund handling:** Partial refund updates to `partially_refunded` and retains Premium (Test 8); full refund updates to `refunded`, releases inventory, and revokes Premium (Test 9).
6. **Refund idempotency & out-of-order delivery:** Unique `provider_refund_id` prevents double-counting (Test 10, Test 11).
7. **Rejection of invalid plan IDs:** Throws on unknown plans and rejects without fallback (Test 14).
8. **Exact payment amount validation:** Rejects underpayment (Test 15) and overpayment (Test 16).
9. **Cross-order payment reuse prevention:** Replay across orders rejected in SQL RPC (Test 17).
10. **Sequential subscription extension model:** Verified chronological stacking across multiple purchases and refund isolation (Test 18, Test 19).
11. **Local order persistence fail-closed:** Returns HTTP 500 without checkout payload (Test 5.1).
12. **All 57 existing payment & freemium regression tests:** Passed (100% pass rate).

### FIXED AND UNIT TESTED
1. **Plan configuration registry resolution (`getPlanConfig`):** Resolves standard prices, promotional prices, tiers, and bonus coins; rejects invalid and empty strings (Test 2.7, Test 14).
2. **Cryptographic HMAC-SHA256 signature verification:** Rejects tampered, shortened, or placeholder signatures (Tests 5.1–5.4 in `premium-entitlements.test.ts`).
3. **Provider `isLive` detection:** Distinguishes live credentials (`rzp_live_`) from test keys (Test 7.4).
4. **Reconciliation database error handling:** Verified profile update errors are thrown and handled (Test 20).

### NOT FIXED
- **None.** All 12 findings from Pass 1 and Pass 2 have been remediated in code and SQL migrations.

### REQUIRES PRODUCTION VERIFICATION
1. **Multi-Node PostgreSQL Concurrency Execution:** While the PL/pgSQL RPCs (`reserve_promotional_slot`, `fulfill_payment_order`, `reconcile_user_entitlements`) use `FOR UPDATE SKIP LOCKED` and row locks, multi-connection race tests under actual production database load must be verified on staging/production Supabase once the migrations are applied.
2. **Production Razorpay Webhook Handshake:** Live delivery of `payment.captured`, `order.paid`, `refund.processed`, and `payment.dispute.created` webhooks from the Razorpay dashboard must be verified post-deployment.

---

## 4. Database Migrations Delivered

1. **[`supabase/migrations/20261106_payment_infrastructure_remediation.sql`](file:///home/aryan/Documents/CUET%20(copy)/supabase/migrations/20261106_payment_infrastructure_remediation.sql)**:
   - Partial unique index `idx_payment_transactions_order_captured`.
   - Initial `reserve_promotional_slot` RPC.
   - Seed of 100 promotional slots.
2. **[`supabase/migrations/20261106_payment_remediation_pass2.sql`](file:///home/aryan/Documents/CUET%20(copy)/supabase/migrations/20261106_payment_remediation_pass2.sql)**:
   - `public.payment_refunds` audit ledger with unique `provider_refund_id`.
   - `public.payment_disputes` audit ledger with unique `provider_dispute_id`.
   - Added `refunded_amount_paise` and `dispute_status` columns to `payment_transactions`.
   - Expanded status domain: `CHECK (status IN ('captured', 'failed', 'refunded', 'partially_refunded', 'disputed', 'disputed_lost'))`.
   - Hardened `reserve_promotional_slot` with order existence, candidate ownership, promotional flag, and status validation.
   - Hardened `fulfill_payment_order` with exact amount matching, cross-order replay prevention, and immutable transaction order_id.
   - Atomic `reconcile_user_entitlements` RPC with row locking and chronological duration stacking.

---

## 5. Deployment Instructions

1. Execute `supabase/migrations/20261106_payment_infrastructure_remediation.sql` in Supabase SQL Editor.
2. Execute `supabase/migrations/20261106_payment_remediation_pass2.sql` in Supabase SQL Editor.
3. Review and merge branch `fix/payment-infrastructure-remediation` into `main`.
4. Verify Razorpay webhook subscriptions include:
   - `payment.captured`
   - `payment.authorized`
   - `order.paid`
   - `refund.created`
   - `refund.processed`
   - `payment.dispute.created`
   - `payment.dispute.won`
   - `payment.dispute.lost`
