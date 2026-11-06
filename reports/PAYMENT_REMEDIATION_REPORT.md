# CUETMATE — FORENSIC PAYMENT INFRASTRUCTURE REMEDIATION REPORT (PASS 1, PASS 2 & PASS 3)

**Application:** CUETMate (`cuetmate.vercel.app`)  
**Repository:** `negikarecode/CUET`  
**Base Branch:** `main`  
**Working Branch:** `fix/payment-infrastructure-remediation`  
**Date:** November 6, 2026  
**Roles:** Principal Backend Engineer, PostgreSQL/Supabase Security Specialist, Razorpay Payment Infrastructure Engineer  

---

## 1. Executive Summary

Following a forensic audit, an independent review, and a final reliability hardening and safety audit (Pass 3), all payment integrity, webhook delivery, database concurrency, dispute monotonic state machines, and refund consistency issues have been permanently resolved.

The remediation encompasses three sequential passes of hardening:
- **Pass 1:** Elimination of authorization-only Premium activations, server-side plan authorization, partial unique indexing on captured transactions, atomic promotional slot reservation with inventory rollback, and fail-closed order persistence.
- **Pass 2:** Strict webhook payment entity separation, independent dispute lifecycle management, cumulative partial refund support, elimination of non-atomic promotional fallbacks, strict plan ID validation, exact amount checks (rejecting underpayment and overpayment), sequential subscription extension preservation during refund reconciliation, and cross-order payment reuse prevention.
- **Pass 3:** Production reliability hardening:
  - **Atomic SQL Refund Ledger RPC (`process_payment_refund`):** Confirmed `refund.processed` events compute cumulative refunds authoritatively via `SUM(amount_paise)` from `payment_refunds`; `refund.created` is safely recorded as pending without altering entitlements; duplicate webhooks cannot double-count; status is never downgraded; cumulative refund is clamped at `<= captured_amount_paise`.
  - **Monotonic Dispute State Machine RPC (`process_payment_dispute`):** Row-level locked (`FOR UPDATE`); dispute creation does not count as refund or release inventory; dispute won strictly cannot restore an already fully refunded transaction; dispute lost transitions to `disputed_lost`, releases promotional inventory, and revokes entitlement without falsely marking as a refund; delayed events cannot overwrite finalized states.
  - **Durable Webhook Inbox & Deduplication (`payment_webhook_events`):** Raw request body HMAC-SHA256 verification paired with atomic event inbox indexing on `(provider, event_id)` to deduplicate replayed deliveries.
  - **Client-Supplied User ID Precedence Elimination:** Enforces stored order candidate ownership (`orderRecord.user_id`) over any user IDs passed in webhook notes payload.
  - **Database Error Handling Audit:** Every Supabase query and mutation in `app/api/payments/route.ts` audits `{ error }` and fails safely.
  - **Real PostgreSQL 16 Integration Suite (39 Tests):** Verified directly against a local PostgreSQL 16 instance with 25 simultaneous client connections using native `pg` driver, testing actual row locks, 100 concurrent slot reservation attempts, concurrent partial refunds, concurrent dispute transitions, atomic rollback, and chronological subscription stacking.

---

## 2. Review Findings & Remediation (Pass 3)

### P1. Refund Processing & Authoritative SQL Ledger
- **Finding:** In `app/api/payments/route.ts`, `refund.created` was previously triggering status updates and entitlement reconciliation before money was confirmed refunded (`refund.processed`). Furthermore, cumulative refunds were calculated via JavaScript `Number(txRecord?.refunded_amount_paise || 0) + currentRefundPaise`, which risked double-counting on webhook replays or concurrent delivery.
- **Remediation:**
  - Implemented `public.process_payment_refund` atomic SQL RPC:
    - Serializes all refund operations per transaction using `SELECT ... FOR UPDATE` on `payment_transactions`.
    - Inspects `payment_refunds` for the unique `provider_refund_id`. Never downgrades a `processed` refund to `created` or `failed` if events arrive out of order.
    - **CRITICAL INVARIANT:** `refund.created` is recorded as pending/created, returning `should_reconcile: false`. Only confirmed `refund.processed` events alter transaction status or entitlement.
    - Authoritative cumulative processed refund is calculated directly from the ledger:
      ```sql
      SELECT coalesce(SUM(amount_paise), 0)
      INTO v_cumulative_refunded
      FROM public.payment_refunds
      WHERE payment_id = p_payment_id AND status = 'processed';
      ```
    - Invariant: Clamps `v_cumulative_refunded <= v_tx.amount_paise`.
    - **Full Refund:** Marks `payment_transactions.status = 'refunded'`, `payment_orders.status = 'refunded'`, releases promotional inventory (`status = 'released'`), and triggers `reconcile_user_entitlements()`.
    - **Partial Refund:** Marks `payment_transactions.status = 'partially_refunded'`. Preserves promotional slot and preserves candidate Premium access.

### P1. Dispute State Machine & Monotonic Invariants
- **Finding:** A dispute won event could theoretically reset an already refunded transaction back to `captured`. In addition, dispute lost previously marked orders as `refunded`, obscuring chargebacks from financial accounting.
- **Remediation:**
  - Implemented `public.process_payment_dispute` atomic SQL RPC:
    - Locks `payment_transactions` FOR UPDATE.
    - **Dispute Won Protection on Refunded Transactions:**
      ```sql
      IF v_tx.status = 'refunded' THEN
          UPDATE public.payment_transactions SET dispute_status = v_dispute_status WHERE id = v_tx.id;
          RETURN jsonb_build_object('success', true, 'tx_status', 'refunded', 'should_reconcile', false, ...);
      END IF;
      ```
      If a transaction was already fully refunded, winning a dispute resolution does NOT restore the transaction or grant Premium access.
    - **Dispute Creation:** Updates status to `disputed` with `dispute_status: 'under_review'`. Does NOT count as a refund, does NOT release promotional inventory, and does NOT revoke entitlement during the review window.
    - **Dispute Lost:** Updates transaction to `disputed_lost` and parent order to `disputed_lost`. Releases promotional slot back to inventory pool. Invokes `reconcile_user_entitlements()` to revoke access without falsely recording a refund.
    - **Delayed Event Guard:** A delayed `under_review` event cannot overwrite finalized `won` or `lost` states.

### P1. Durable Webhook Inbox & Deduplication
- **Remediation:**
  - Created `public.payment_webhook_events` table with unique index `ON public.payment_webhook_events(provider, event_id) WHERE event_id IS NOT NULL`.
  - Added atomic `public.record_webhook_event` and `public.finalize_webhook_event` RPCs.
  - Incoming webhook events matching an already processed `event_id` are acknowledged immediately with `{ status: "ok", received: true, deduplicated: true }`, completely avoiding redundant side-effects.

### P1. Real Database Concurrency & SKIP LOCKED Testing
- **Remediation:**
  - Spun up local PostgreSQL 16 server on port 54338.
  - Executed real concurrent tests across 25 simultaneous client connections competing for slots using native `pg` connection pool.
  - Verified: 100 concurrent reservation attempts against 10 slots allocates exactly 10 distinct slots with 90 clean inventory exhaustion rejections.
  - Verified: Atomic transaction rollback in `fulfill_payment_order` on slot exhaustion aborts all mutations, leaving 0 orphan rows and un-upgraded profile.

---

## 3. Classification of Issues

### FIXED AND INTEGRATION TESTED (Real PostgreSQL 16 Suite)
1. **Real PostgreSQL Concurrent Slot Reservation (`FOR UPDATE SKIP LOCKED`):** Verified across 5 and 100 simultaneous connections in `tests/payment-security-pass3-postgres.test.ts` (Tests 4.1, 4.3).
2. **Real PostgreSQL Transaction Rollback on Inventory Exhaustion:** Verified complete mutation rollback in `fulfill_payment_order` (Test 4.2).
3. **Atomic Refund Ledger & Cumulative Sum RPC (`process_payment_refund`):** Verified `refund.created` non-revocation (Test 1.1), duplicate delivery idempotency (Test 1.2), cumulative multi-partial refunds (Test 1.3), out-of-order delivery protection (Tests 1.4, 1.5), cumulative clamping (Test 1.6), and 5 concurrent partial refunds on distinct connections (Test 1.7).
4. **Monotonic Dispute State Machine RPC (`process_payment_dispute`):** Verified dispute created inventory preservation (Test 2.1), dispute won restoration (Test 2.2), dispute won protection on refunded transactions (Test 2.3), dispute lost chargeback revocation (Test 2.4), delayed event monotonicity (Test 2.5), duplicate event idempotency (Test 2.6), out-of-order dispute delivery (Test 2.7), and concurrent dispute serialization (Test 2.8).
5. **Webhook Durable Inbox Deduplication (`record_webhook_event`):** Verified replay returns `is_duplicate: true, action: 'ignore'`, reprocess on failure, and HMAC-SHA256 signature verification (Tests 3.1, 3.2, 3.3, 3.4).
6. **Chronological Subscription Duration Stacking:** Verified 2 consecutive 1-year purchases stack to 2 years, refund of one preserves survivor, chargeback loss of one preserves survivor, tier upgrades, and expired subscriptions (Tests 5.1 - 5.6).
7. **Database Error Injection & Fail-Closed Safety:** Verified negative amount, currency tampering, missing profiles, candidate mismatch, cross-order payment reuse, and amount mismatches all abort transactions cleanly (Tests 6.1 - 6.6).

### FIXED AND UNIT / INVARIANT TESTED
1. **Plan configuration registry resolution (`getPlanConfig`):** Resolves standard prices, promotional prices, tiers, and bonus coins; rejects invalid and empty strings.
2. **Cryptographic HMAC-SHA256 signature verification:** Rejects tampered, shortened, or placeholder signatures.
3. **Provider `isLive` detection:** Distinguishes live credentials (`rzp_live_`) from test keys.
4. **All database update errors checked and handled:** Audited every Supabase mutation in `app/api/payments/route.ts` and `lib/payments/entitlements.ts`.

### NOT FIXED
- **None.** All identified vulnerabilities from Pass 1, Pass 2, and Pass 3 have been remediated in code and SQL migrations.

### REQUIRES PRODUCTION VERIFICATION
1. **Supabase Production Migrations Execution:** The 3 delivered SQL migrations must be run against the production Supabase database via the Supabase Dashboard SQL Editor or Supabase CLI.
2. **Razorpay Live Dashboard Webhook URL Configuration:** Ensure the live webhook endpoint URL (`https://cuetmate.vercel.app/api/payments`) is configured with the correct webhook secret in Razorpay Dashboard.

---

## 4. Database Migrations Delivered

1. **[`supabase/migrations/20261106_payment_infrastructure_remediation.sql`](file:///home/aryan/Documents/CUET%20(copy)/supabase/migrations/20261106_payment_infrastructure_remediation.sql)** (Pass 1):
   - Partial unique index `idx_payment_transactions_order_captured`.
   - Initial `reserve_promotional_slot` RPC.
   - Initial `fulfill_payment_order` RPC.
   - Seed of 100 promotional slots.
2. **[`supabase/migrations/20261106_payment_remediation_pass2.sql`](file:///home/aryan/Documents/CUET%20(copy)/supabase/migrations/20261106_payment_remediation_pass2.sql)** (Pass 2):
   - `public.payment_refunds` audit ledger with unique `provider_refund_id`.
   - `public.payment_disputes` audit ledger with unique `provider_dispute_id`.
   - Added `refunded_amount_paise` and `dispute_status` columns to `payment_transactions`.
   - Status domain expansion: `CHECK (status IN ('captured', 'failed', 'refunded', 'partially_refunded', 'disputed', 'disputed_lost'))`.
   - Hardened `reserve_promotional_slot` with order ownership and status validation.
   - Hardened `fulfill_payment_order` with exact amount matching and cross-order replay prevention.
   - `reconcile_user_entitlements` RPC with row locking and chronological duration stacking.
3. **[`supabase/migrations/20261106_payment_security_pass3.sql`](file:///home/aryan/Documents/CUET%20(copy)/supabase/migrations/20261106_payment_security_pass3.sql)** (Pass 3):
   - `public.payment_webhook_events` durable event inbox with unique `(provider, event_id)` partial index.
   - `payment_orders_status_check` extended to include `'disputed_lost'`.
   - `public.record_webhook_event` and `public.finalize_webhook_event` RPCs.
   - `public.process_payment_refund` atomic SQL RPC with cumulative ledger sum calculation.
   - `public.process_payment_dispute` atomic SQL RPC with monotonic dispute state machine.
   - Updated `reconcile_user_entitlements` strictly excluding `disputed_lost` and `refunded` orders/transactions.

---

## 5. Production Readiness & Deployment Checklist

### A. Pre-Deployment Verification
- [x] TypeScript compilation: `npm run typecheck` passed (0 errors).
- [x] ESLint validation: `npm run lint` passed (0 errors).
- [x] Next.js production build: `npm run build` passed (all 47 pages generated).
- [x] Local PostgreSQL 16 migration testing: All 3 migrations applied cleanly with 0 errors.
- [x] Automated test suite execution:
  - `tests/payment-infrastructure-remediation.test.ts`: 32/32 Passed.
  - `tests/payment-remediation-pass2-behavioral.test.ts`: 20/20 Passed.
  - `tests/payment-security-pass3-postgres.test.ts`: 39/39 Passed.
  - Total: 91/91 Tests Passed (100% success rate).

### B. Production Migration Execution Sequence
When deploying to production, execute the migrations in order in the Supabase SQL Editor:
1. `supabase/migrations/20261106_payment_infrastructure_remediation.sql`
2. `supabase/migrations/20261106_payment_remediation_pass2.sql`
3. `supabase/migrations/20261106_payment_security_pass3.sql`

### C. Production Environment Variables Verification
Ensure the following environment variables are configured in Vercel / production:
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Live key (starts with `rzp_live_`)
- `RAZORPAY_KEY_SECRET`: Live secret key
- `RAZORPAY_WEBHOOK_SECRET`: Configured webhook secret matching Razorpay Dashboard
- `SUPABASE_SERVICE_ROLE_KEY`: Required for service-role-only RPC execution

### D. Post-Deployment Verification Queries
Run in Supabase SQL Editor to verify database functions and tables:
```sql
-- 1. Verify Pass 3 functions exist
SELECT proname, proargnames FROM pg_proc 
WHERE proname IN ('process_payment_refund', 'process_payment_dispute', 'record_webhook_event', 'finalize_webhook_event');

-- 2. Verify payment_webhook_events table exists with RLS enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'payment_webhook_events';

-- 3. Verify promotional slot inventory
SELECT status, count(*) FROM public.promotional_slots GROUP BY status;
```
