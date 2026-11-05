# CUETMATE — FORENSIC PAYMENT INFRASTRUCTURE REMEDIATION REPORT

**Application:** CUETMate (`cuetmate.vercel.app`)  
**Repository:** `negikarecode/CUET`  
**Remediation Branch:** `fix/payment-infrastructure-remediation`  
**Date of Audit & Remediation:** November 6, 2026  
**Auditor & Specialist Roles:** Principal Backend Engineer, PostgreSQL/Supabase Security Specialist, Razorpay Payment Infrastructure Engineer  

---

## 1. Executive Summary

A comprehensive forensic audit of the CUETMate payment infrastructure, Razorpay integration, promotional inventory state machines, and Supabase database functions was performed on the existing codebase. 

The audit identified five critical structural vulnerabilities:
1. **Premature Entitlement on Authorization:** `verifyPaymentStatus()` in `lib/payments/provider.ts` treated both `authorized` and `captured` statuses as `isPaid: true`. Candidates could potentially activate Premium without settled funds.
2. **Missing Provider Verification on Order:** The `fulfill_payment_order` RPC checked whether the incoming provider was in `('razorpay', 'cashfree', 'mock')`, but failed to compare it with the provider recorded on the locked `payment_orders` row.
3. **Unvalidated Client Tiers & Parameters:** The fulfillment RPC accepted arbitrary client-supplied `p_tier` strings and wrote them directly to `profiles.subscription_tier`, bypassing server-side plan authorization.
4. **Non-Atomic Promotional Slot Inventory & Silent Overflow:** The RPC `reserve_promotional_slot` was referenced in comments in migration `20261021_fix_cascade_and_seed_slots.sql` but was never actually implemented in SQL. As a result, order creation relied on non-atomic two-step client queries, and `fulfill_payment_order` granted Premium even when 0 promotional slots were available. Furthermore, `getPricingOffer()` failed to count active unexpired reservations.
5. **Non-Atomic Order Creation & Uncoordinated Refunds:** Razorpay orders were returned to clients even when local `payment_orders` insertion failed (`console.warn` only). Webhook refunds unconditionally wiped candidate Premium access without verifying if surviving valid purchases existed.

All vulnerabilities have been systematically resolved with backward-compatible, fail-closed implementations and backed by 32 new automated regression tests and 57 existing payment regression tests (100% passing).

---

## 2. Baseline Forensic Findings

Prior to modifying code, a read-only schema and table inspection was conducted against production:
- **`payment_orders` table:** 0 rows (clean slate, zero customer records impacted).
- **`payment_transactions` table:** 0 rows (no duplicate captured transactions exist).
- **`promotional_slots` table:** 0 rows currently populated in production (seed generation was missing).
- **`reserve_promotional_slot` RPC:** Missing from schema cache (`Could not find the function public.reserve_promotional_slot in the schema cache`).
- **`fulfill_payment_order` RPC:** Existed from migration `20261021_fix_cascade_and_seed_slots.sql`, but had unvalidated tier assignment, lacked stored provider comparison, and granted Premium on promotional orders even if slot claim updated 0 rows.

---

## 3. Vulnerability Breakdown & Remediation

### 3.1 Captured Payment Gate (Phase 2.1)
- **Vulnerability:** `lib/payments/provider.ts` evaluated `if (payment.status !== "captured" && payment.status !== "authorized")`. Both were treated as paid.
- **Root Cause:** Incomplete status mapping. In Razorpay, `authorized` indicates a temporary hold, not captured merchant funds.
- **Remediation:**
  - `authorized` is now strictly `isPaid: false`.
  - When `status === "authorized"`, the provider immediately attempts server-side capture via `this.client.payments.capture(paymentId, amount, currency)`.
  - If capture succeeds and returns `captured`, `isPaid: true` is returned.
  - If capture fails or cannot be confirmed, it fails closed: `isPaid: false`, `error: "Payment is authorized but not captured..."`.
  - In `app/api/payments/route.ts`, webhook event `payment.authorized` defers fulfillment until `payment.captured` or `order.paid`.
- **Status:** **FIXED AND TESTED** (Tests 1.1, 1.2, 1.5, 1.6).

### 3.2 Provider Validation Against Stored Order (Phase 2.2)
- **Vulnerability:** In `fulfill_payment_order`, `p_provider` was only validated against a generic allowlist, never compared with `payment_orders.provider`.
- **Root Cause:** Missing join comparison in the SQL function.
- **Remediation:**
  - Added strict assertion in `fulfill_payment_order`:
    ```sql
    IF v_order.provider IS DISTINCT FROM p_provider THEN
        RAISE EXCEPTION 'PAYMENT_PROVIDER_MISMATCH: Order was created for %, received payment via %',
            v_order.provider, p_provider
            USING ERRCODE = '22023';
    END IF;
    ```
  - Added frontend route check in `app/api/payments/route.ts` checking `existingOrder.provider !== provider.name`.
- **Status:** **FIXED AND TESTED** (Test 2.1).

### 3.3 Server-Side Plan & Entitlement Derivation (Phase 2.3)
- **Vulnerability:** RPC blindly assigned `subscription_tier = p_tier` using client-provided parameters.
- **Root Cause:** Trusting client parameters for entitlement duration and subscription tier.
- **Remediation:**
  - Implemented authoritative `SUPPORTED_PLANS` registry in [`lib/payments/entitlements.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/payments/entitlements.ts):
    - `all_access_pass_799`: Tier `all_access_pass`, standard 79900 paise, promotional 200 paise, 500 coins, 365 days.
    - `ai_practice_pass_499`: Tier `ai_practice_pass`, standard 49900 paise, 250 coins, 365 days.
    - `ai_pass_399`: Tier `all_access_pass`, standard 39900 paise, 200 coins, 365 days.
    - `all_access_pass`: Legacy alias.
  - In `fulfill_payment_order`, `v_order.plan_id` is locked and evaluated via a `CASE` statement. `v_derived_tier` and `v_base_bonus_coins` are computed server-side. Unrecognized plans raise `UNAUTHORIZED_PLAN`.
- **Status:** **FIXED AND TESTED** (Tests 2.3, 2.4, 2.7).

### 3.4 Promotional Inventory & Atomic Reservation (Phase 3)
- **Vulnerability:** Promotional slots were allocated through non-atomic JavaScript queries. In addition, `fulfill_payment_order` granted Premium even if slot claiming failed, and `getPricingOffer` ignored active unexpired reservations.
- **Root Cause:** Missing database-level concurrency control (`FOR UPDATE SKIP LOCKED`).
- **Remediation:**
  - Created atomic RPC `public.reserve_promotional_slot(p_user_id UUID, p_order_id UUID)` in migration `20261106_payment_infrastructure_remediation.sql`. Uses `FOR UPDATE SKIP LOCKED` on `status = 'released' OR (status = 'reserved' AND expires_at < clock_timestamp())`. Holds reservation for 30 minutes.
  - In `fulfill_payment_order`, if `v_order.is_promotional` is true:
    - Attempts to claim the reserved slot for the order.
    - Fallback: attempts to claim lowest available slot.
    - **CRITICAL INVARIANT:** If `v_slot_updated = 0`, it raises `PROMOTIONAL_INVENTORY_EXHAUSTED` (`ERRCODE = '55P03'`). Entire PostgreSQL transaction rolls back!
  - In `lib/payments/entitlements.ts`, `getPricingOffer()` sums both `claimed` and `reserved` (`expires_at > nowIso`) to prevent over-allocation.
- **Status:** **FIXED AND TESTED** (Tests 4.1, 4.2, 4.3, 4.4, 4.5).

### 3.5 Payment Order Persistence (Phase 4)
- **Vulnerability:** `app/api/payments/route.ts` returned Razorpay checkout orders even when local `payment_orders.insert()` failed (`insertError` was only logged as a warning).
- **Root Cause:** Missing fail-closed guard around local order persistence.
- **Remediation:**
  - If `insertError || !insertedOrder?.id`, the route immediately halts and fails closed with HTTP 500 (`code: "ORDER_PERSISTENCE_FAILED"`). No checkout payload is returned.
  - If promotional slot reservation fails, the order is marked `failed` in DB, and the request fails closed with HTTP 409 (`code: "PROMOTIONAL_SLOTS_EXHAUSTED"`).
- **Status:** **FIXED AND TESTED** (Tests 5.1, 5.2).

### 3.6 Transaction-Aware Refund Reconciliation (Phase 5)
- **Vulnerability:** Webhook refunds performed a blanket `is_premium = false, subscription_tier = "free"`, revoking access even if the student had another active, paid qualifying subscription.
- **Root Cause:** Lack of transaction history awareness.
- **Remediation:**
  - Implemented `reconcileUserEntitlements(userId: string)` in [`lib/payments/entitlements.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/payments/entitlements.ts).
  - Queries all surviving non-refunded `captured` transactions for the user where `verified_at + 1 year > now`.
  - If surviving purchases exist, Premium access is preserved, and expiration is set to the latest surviving date.
  - If zero valid purchases remain, Premium is revoked.
  - Released promotional slot if the refunded order was promotional.
- **Status:** **FIXED AND TESTED** (Tests 6.1, 6.2, 6.3).

---

## 4. Status of Findings

| ID | Description | Severity | Status | Verification Reference |
| :---: | :--- | :---: | :---: | :--- |
| **SEC-PAY-01** | Only captured payments activate Premium | CRITICAL | **FIXED AND TESTED** | `verifyPaymentStatus`, Test 1.1–1.6 |
| **SEC-PAY-02** | Validate provider against locked order | HIGH | **FIXED AND TESTED** | `fulfill_payment_order`, Test 2.1 |
| **SEC-PAY-03** | Server-side plan & tier derivation | CRITICAL | **FIXED AND TESTED** | `SUPPORTED_PLANS`, Test 2.3–2.7 |
| **SEC-PAY-04** | Atomic promotional slot reservation | HIGH | **FIXED AND TESTED** | `reserve_promotional_slot`, Test 4.1–4.5 |
| **SEC-PAY-05** | Inventory exhausted fulfillment rollback | CRITICAL | **FIXED AND TESTED** | `fulfill_payment_order`, Test 4.3 |
| **SEC-PAY-06** | Local order persistence fail-closed | CRITICAL | **FIXED AND TESTED** | `POST /api/payments`, Test 5.1 |
| **SEC-PAY-07** | Multi-purchase refund reconciliation | MEDIUM | **FIXED AND TESTED** | `reconcileUserEntitlements`, Test 6.1–6.3 |
| **SEC-PAY-08** | Partial unique index on captured transactions | HIGH | **FIXED AND TESTED** | Migration SQL, Test 3.3 |

---

## 5. Files Changed

1. **[`lib/payments/provider.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/payments/provider.ts)**
   - Hardened `verifyPaymentStatus()` in `RazorpayProvider` to reject `authorized` payments as unpaid and attempt auto-capture.
   - Hardened `MockSandboxProvider` with explicit status discrimination (`pay_sim_authorized_`, `pay_sim_failed_`).
   - Dynamic `isLive` flag based on `keyId.startsWith("rzp_live_")`.
2. **[`lib/payments/entitlements.ts`](file:///home/aryan/Documents/CUET%20(copy)/lib/payments/entitlements.ts)**
   - Added `SUPPORTED_PLANS` registry and `getPlanConfig()`.
   - Updated `getPricingOffer()` to count both claimed and active unexpired reservations.
   - Added `reconcileUserEntitlements(userId)` for multi-purchase refund handling.
3. **[`app/api/payments/route.ts`](file:///home/aryan/Documents/CUET%20(copy)/app/api/payments/route.ts)**
   - Deferred fulfillment on `payment.authorized` webhooks.
   - Integrated `reconcileUserEntitlements()` on refund webhooks.
   - Enforced provider matching and plan validation against `existingOrder`.
   - Enforced fail-closed local order persistence on `create-order`.
   - Enforced promotional inventory check and slot reservation.
4. **[`supabase/migrations/20261106_payment_infrastructure_remediation.sql`](file:///home/aryan/Documents/CUET%20(copy)/supabase/migrations/20261106_payment_infrastructure_remediation.sql)**
   - New database migration providing `public.reserve_promotional_slot` RPC.
   - Hardened `public.fulfill_payment_order` with provider check, plan check, and slot inventory rollback.
   - Partial unique index `idx_payment_transactions_order_captured`.
5. **[`tests/payment-infrastructure-remediation.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/tests/payment-infrastructure-remediation.test.ts)**
   - 32 comprehensive automated regression tests.

---

## 6. Environment Variable Inspection (Phase 8)

Inspection of payment-related environment variable references:
- `RAZORPAY_KEY_ID`: Client ID for Razorpay API (`rzp_test_...` or `rzp_live_...`).
- `RAZORPAY_KEY_SECRET`: Private API secret for Razorpay orders and capture.
- `RAZORPAY_WEBHOOK_SECRET`: Secret for HMAC-SHA256 webhook signature validation.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Public key passed to the browser checkout modal.
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: Privileged backend key for atomic database RPCs and table writes.
- `NODE_ENV`: Runtime environment (`development`, `test`, `production`).

*Note: In accordance with Rule 8, no secret values or credentials were printed or exposed.*

---

## 7. Production Deployment & Rollback Instructions

### Deployment Instructions
1. Review the git diff on branch `fix/payment-infrastructure-remediation`.
2. Apply the migration `supabase/migrations/20261106_payment_infrastructure_remediation.sql` to Supabase PostgreSQL via the Supabase Dashboard SQL Editor or Supabase CLI (`supabase db push`).
3. Merge `fix/payment-infrastructure-remediation` into `main` and allow Vercel to build and deploy.
4. Verify Razorpay webhook URL in Razorpay Dashboard points to `https://cuetmate.vercel.app/api/payments` with subscribed events:
   - `payment.captured`
   - `payment.authorized`
   - `order.paid`
   - `refund.created`
   - `refund.processed`

### Rollback Instructions
If rollback is required:
1. Revert application commit on git: `git revert <commit-sha>`.
2. The database migration is backward-compatible. If necessary to revert the RPC:
   - Re-run `supabase/migrations/20261021_fix_cascade_and_seed_slots.sql` to restore previous `fulfill_payment_order`.
   - Drop the partial unique index: `DROP INDEX IF EXISTS public.idx_payment_transactions_order_captured;`.
   - Drop reservation function: `DROP FUNCTION IF EXISTS public.reserve_promotional_slot(UUID, UUID);`.
