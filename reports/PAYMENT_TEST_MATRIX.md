# CUETMATE — PAYMENT TEST MATRIX & VERIFICATION REPORT (PASS 1, PASS 2 & PASS 3)

**Application:** CUETMate (`cuetmate.vercel.app`)  
**Test Suites:**
- [`tests/payment-security-pass3-postgres.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/tests/payment-security-pass3-postgres.test.ts) (39/39 Passed — Real PostgreSQL 16 Integration Suite)
- [`tests/payment-remediation-pass2-behavioral.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/tests/payment-remediation-pass2-behavioral.test.ts) (20/20 Passed — Unit, Webhook Signature Verification, & Source Invariant Suite)
- [`tests/payment-infrastructure-remediation.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/tests/payment-infrastructure-remediation.test.ts) (32/32 Passed — Unit & Source Invariant Suite)
- [`__tests__/atomic-payment-scenarios.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/__tests__/atomic-payment-scenarios.test.ts) (14/14 Passed)
- [`__tests__/premium-entitlements.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/__tests__/premium-entitlements.test.ts) (28/28 Passed)
- [`__tests__/free-tier-access-entitlements.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/__tests__/free-tier-access-entitlements.test.ts) (13/13 Passed)
- [`__tests__/production-entitlements-sessions.test.ts`](file:///home/aryan/Documents/CUET%20(copy)/__tests__/production-entitlements-sessions.test.ts) (43/43 Passed)

**Execution Date:** November 6, 2026  
**Total Tests Executed:** 189 Tests  
**Total Tests Passed:** 189 Tests (100% Success Rate)  
**Total Failures:** 0  

---

## 1. Pass 3 Real PostgreSQL 16 Integration Suite (39 Scenarios)

Executed directly against a local PostgreSQL 16 server (`localhost:54338`) using native `pg` driver and connection pool (25 connections), testing actual row locks (`FOR UPDATE SKIP LOCKED`), transactional integrity, concurrency, and monotonic state machine transitions.

### Suite 1: Refund Processing & Cumulative Ledger Verification [INTEGRATION]
| # | Test Scenario | Target Function / RPC | Verification Method | Status |
| :-: | :--- | :--- | :--- | :-: |
| **1.1** | `refund.created` non-revocation | `process_payment_refund` | Records refund as `created`, preserves `captured` tx status, `should_reconcile = false`, preserves Premium | **PASS** |
| **1.2** | Duplicate refund webhook delivery idempotency | `process_payment_refund` | Replay of same `provider_refund_id` never increases cumulative refund amount twice | **PASS** |
| **1.3** | Multiple partial refunds accumulation | `process_payment_refund` | Cumulative sum in ledger computed authoritatively via `SUM()`; full refund revokes Premium | **PASS** |
| **1.4** | Out-of-order delivery (processed before created) | `process_payment_refund` | `refund.created` arriving after `refund.processed` cannot downgrade ledger status | **PASS** |
| **1.5** | Out-of-order delivery (failed after processed) | `process_payment_refund` | `refund.failed` arriving after `refund.processed` cannot downgrade transaction status | **PASS** |
| **1.6** | Cumulative refund capped at captured amount | `process_payment_refund` | Cumulative refund total strictly clamps to `v_tx.amount_paise` | **PASS** |
| **1.7** | Concurrency: 5 concurrent partial refunds | `process_payment_refund` | 5 concurrent partial refunds across distinct pool connections serialize and aggregate accurately | **PASS** |

### Suite 2: Dispute State Machine & Monotonic Invariants [INTEGRATION]
| # | Test Scenario | Target Function / RPC | Verification Method | Status |
| :-: | :--- | :--- | :--- | :-: |
| **2.1** | Dispute created non-refund invariant | `process_payment_dispute` | Dispute created updates status to `disputed`, does NOT refund or release inventory | **PASS** |
| **2.2** | Dispute won affirmation | `process_payment_dispute` | Dispute won restores transaction to `captured`, confirms candidate active Premium | **PASS** |
| **2.3** | Dispute won on refunded transaction | `process_payment_dispute` | **CRITICAL:** Dispute won strictly CANNOT restore an already refunded transaction | **PASS** |
| **2.4** | Dispute lost chargeback revocation | `process_payment_dispute` | Transitions to `disputed_lost`, releases promotional inventory, revokes Premium without marking as refund | **PASS** |
| **2.5** | Delayed event monotonic guard | `process_payment_dispute` | Delayed `under_review` event cannot overwrite finalized `won` or `lost` dispute | **PASS** |
| **2.6** | Duplicate dispute event delivery | `process_payment_dispute` | Duplicate delivery of `won`/`lost` is idempotent and retains authoritative state | **PASS** |
| **2.7** | Out-of-order dispute (lost before created) | `process_payment_dispute` | `dispute.created` arriving after `dispute.lost` preserves `disputed_lost` | **PASS** |
| **2.8** | Concurrency: Concurrent dispute events | `process_payment_dispute` | Simultaneous dispute events across pool connections serialize safely via row lock | **PASS** |

### Suite 3: Webhook Inbox & Event Deduplication [INTEGRATION]
| # | Test Scenario | Target Function / RPC | Verification Method | Status |
| :-: | :--- | :--- | :--- | :-: |
| **3.1** | Webhook inbox event recording | `record_webhook_event` | Inserts record into `payment_webhook_events` with status `processing` | **PASS** |
| **3.2** | Webhook inbox replay deduplication | `record_webhook_event` | Replay of processed event returns `is_duplicate: true, action: 'ignore'` | **PASS** |
| **3.3** | Webhook event retry/reprocessing | `record_webhook_event` | Re-delivery of failed webhook event returns `action: 'reprocess'` | **PASS** |
| **3.4** | Webhook HMAC-SHA256 signature verification | `provider.ts` -> `verifyWebhook` | Rejects tampered payloads and mismatched secrets; accepts authentic signatures | **PASS** |

### Suite 4: Database Concurrency & SKIP LOCKED Row Locking [INTEGRATION]
| # | Test Scenario | Target Function / RPC | Verification Method | Status |
| :-: | :--- | :--- | :--- | :-: |
| **4.1** | 5 concurrent connections for 2 slots | `reserve_promotional_slot` | Real pool race: exactly 2 distinct slots allocated, 3 clean rejections, 0 duplicates | **PASS** |
| **4.2** | Atomic rollback on slot exhaustion | `fulfill_payment_order` | Slot exhaustion aborts transaction, rolls back captured transaction insertion | **PASS** |
| **4.3** | 100 concurrent reservation attempts | `reserve_promotional_slot` | 100 concurrent attempts for 10 slots: exactly 10 allocated, 90 cleanly exhausted | **PASS** |
| **4.4** | Reclaiming expired reservations | `reserve_promotional_slot` | Expired reservations (`< clock_timestamp()`) safely reclaimed without collision | **PASS** |
| **4.5** | Abandoned checkout slot reclamation | `reserve_promotional_slot` | Abandoned un-purchased reservation reclaimed by subsequent order | **PASS** |
| **4.6** | Payment success after reservation expiry | `fulfill_payment_order` | Order paying after expiry safely claims next available released slot | **PASS** |
| **4.7** | Competing orders claiming last slot | `fulfill_payment_order` | Row lock serializes 2 competing orders: exactly one claims, competing rolls back | **PASS** |
| **4.8** | Duplicate fulfillment replay idempotency | `fulfill_payment_order` | Returns `idempotent: true`, awards 0 duplicate bonus coins | **PASS** |

### Suite 5: Entitlement Stacking & Multi-Purchase Survival [INTEGRATION]
| # | Test Scenario | Target Function / RPC | Verification Method | Status |
| :-: | :--- | :--- | :--- | :-: |
| **5.1** | Consecutive 1-year purchases stacking | `reconcile_user_entitlements` | Chronological stacking extends duration to ~2 years; refunding one preserves survivor | **PASS** |
| **5.2** | Multi-purchase chargeback survival | `reconcile_user_entitlements` | User with 1 valid purchase and 1 `disputed_lost` retains Premium from valid purchase | **PASS** |
| **5.3** | Multi-purchase refund survival | `reconcile_user_entitlements` | User with 1 valid purchase and 1 refunded purchase retains Premium from valid purchase | **PASS** |
| **5.4** | Subscription tier upgrade | `reconcile_user_entitlements` | Upgrades tier from `ai_practice_pass` to `all_access_pass` on higher tier purchase | **PASS** |
| **5.5** | Expired subscription reconciliation | `reconcile_user_entitlements` | Purchases with elapsed validity reconcile to `is_premium: false`, `tier: 'free'` | **PASS** |
| **5.6** | Concurrent refund and dispute processing | SQL Row Locks | Simultaneous refund and dispute serialize cleanly via row lock without deadlocks | **PASS** |

### Suite 6: Database Error Injection & Fail-Closed Safety [INTEGRATION]
| # | Test Scenario | Target Function / RPC | Verification Method | Status |
| :-: | :--- | :--- | :--- | :-: |
| **6.1** | Negative or zero amount paise | `fulfill_payment_order` | Rejects with error `Invalid payment amount`, aborts transaction | **PASS** |
| **6.2** | Invalid payment currency | `fulfill_payment_order` | Non-INR (e.g. `USD`) rejects with `Invalid currency`, aborts transaction | **PASS** |
| **6.3** | Non-existent candidate profile | `fulfill_payment_order` | Rejects with profile not found, aborts transaction | **PASS** |
| **6.4** | Order candidate mismatch (cross-user) | `fulfill_payment_order` | Cross-user claim throws security exception `Order candidate mismatch` | **PASS** |
| **6.5** | Cross-order payment ID reuse | `fulfill_payment_order` | Reusing payment ID across different orders throws constraint violation | **PASS** |
| **6.6** | Payment amount mismatch | `fulfill_payment_order` | Payment amount differing from order amount throws `PAYMENT_AMOUNT_MISMATCH` | **PASS** |

---

## 2. Pass 2 Behavioral Invariant Test Matrix (20 Scenarios) [UNIT / SOURCE INVARIANT]

| # | Test Scenario | Target Layer | Verification Method | Status |
| :-: | :--- | :--- | :--- | :-: |
| **1** | Actual `payment.captured` webhook payload | `provider.ts` | Authentic Razorpay HMAC webhook payload; extracts distinct `paymentId` & `orderId` | **PASS** |
| **2** | Actual `order.paid` payload without payment ID | `provider.ts` & Route | Verified payload without payment entity; returns `paymentId: undefined`, never synthesizes fake ID | **PASS** |
| **3** | Duplicate captured webhook replay | SQL RPC | Idempotency replay check returns `idempotent: true`, 0 bonus coins, retains expiry | **PASS** |
| **4** | Authorized payment followed by capture | `provider.ts` | `authorized` returns `isPaid: false`, subsequent `captured` returns `isPaid: true` | **PASS** |
| **5** | Dispute created without refund | Route & DB | Dispute created records audit, updates status to `disputed`, does NOT refund or release slot | **PASS** |
| **6** | Dispute won affirmation | Route & DB | Dispute won restores status to `captured`, affirms candidate Premium access | **PASS** |
| **7** | Dispute lost revocation | Route & DB | Dispute lost updates to `disputed_lost`, releases slot, revokes entitlement if no other purchases | **PASS** |
| **8** | Partial refund retention | Route & DB | Cumulative refund < captured amount; marks `partially_refunded`, retains Premium & slot | **PASS** |
| **9** | Full refund revocation | Route & DB | Cumulative refund >= captured amount; marks `refunded`, releases slot, revokes Premium | **PASS** |
| **10** | Duplicate refund webhook | `payment_refunds` | Unique constraint on `provider_refund_id` prevents duplicate refund counting | **PASS** |
| **11** | Out-of-order refund events | Route & DB | `refund.processed` before `refund.created` handled idempotently without corrupting ledger | **PASS** |
| **12** | Concurrent slot reservations | SQL RPC | `FOR UPDATE SKIP LOCKED` with order validation prevents race conditions | **PASS** |
| **13** | RPC failure during reservation | Route | Fails closed with HTTP 409 `PROMOTIONAL_SLOTS_EXHAUSTED` without JavaScript fallback | **PASS** |
| **14** | Invalid plan ID rejection | Route & Registry | Throws on unknown plans, returns HTTP 400 `INVALID_PLAN` without silent fallback | **PASS** |
| **15** | Underpayment rejection | Route & SQL RPC | Exact amount match (`<>`) rejects payment less than order amount | **PASS** |
| **16** | Overpayment rejection | Route & SQL RPC | Exact amount match (`<>`) rejects payment greater than order amount | **PASS** |
| **17** | Same payment ID on another order | SQL RPC | Asserts `v_existing_tx.order_id = v_order.id`; rejects cross-order payment reuse | **PASS** |
| **18** | Sequential subscription extension | Entitlements & RPC | Multi-purchase chronological stacking sequentially extends active subscriptions | **PASS** |
| **19** | Refund one purchase, preserve another | Entitlements & RPC | Multi-purchase reconciliation keeps valid surviving purchase without gaps | **PASS** |
| **20** | Database update failure handling | Entitlements | Profile update errors during reconciliation are checked and thrown (fail closed) | **PASS** |

---

## 3. Pass 1 Remediation Test Matrix (32 Scenarios) [UNIT / SOURCE INVARIANT]

| Category | Test Case Name | Target File / Function | Result |
| :--- | :--- | :--- | :---: |
| **Payment Status** | 1.1 Captured payment verification | `provider.ts` -> `verifyPaymentStatus` | **PASS** |
| **Payment Status** | 1.2 Authorized payment rejection | `provider.ts` -> `verifyPaymentStatus` | **PASS** |
| **Payment Status** | 1.3 Failed payment rejection | `provider.ts` -> `verifyPaymentStatus` | **PASS** |
| **Payment Status** | 1.4 Unknown status rejection | `provider.ts` -> `verifyPaymentStatus` | **PASS** |
| **Payment Status** | 1.5 Webhook authorized handling | `app/api/payments/route.ts` | **PASS** |
| **Payment Status** | 1.6 Razorpay auto-capture attempt | `provider.ts` -> `verifyPaymentStatus` | **PASS** |
| **Order Integrity** | 2.1 Provider mismatch rejection | `app/api/payments/route.ts` & SQL RPC | **PASS** |
| **Order Integrity** | 2.2 Cross-user verification block | `app/api/payments/route.ts` | **PASS** |
| **Order Integrity** | 2.3 Server-side plan derivation | `fulfill_payment_order` SQL | **PASS** |
| **Order Integrity** | 2.4 Unauthorized plan rejection | `fulfill_payment_order` SQL | **PASS** |
| **Order Integrity** | 2.5 Amount match validation | `fulfill_payment_order` & Route | **PASS** |
| **Order Integrity** | 2.6 Currency tampering rejection | `fulfill_payment_order` & Route | **PASS** |
| **Order Integrity** | 2.7 Plan registry resolution | `entitlements.ts` -> `getPlanConfig` | **PASS** |
| **Idempotency** | 3.1 Duplicate payment verification | `fulfill_payment_order` SQL | **PASS** |
| **Idempotency** | 3.2 Conflicting payment ID for order | `fulfill_payment_order` SQL | **PASS** |
| **Idempotency** | 3.3 Partial unique captured index | `payment_transactions` schema | **PASS** |
| **Idempotency** | 3.4 Concurrency row locks | `fulfill_payment_order` SQL | **PASS** |
| **Promotional Inventory**| 4.1 Atomic slot reservation | `reserve_promotional_slot` SQL | **PASS** |
| **Promotional Inventory**| 4.2 Reclaim expired reservations | `reserve_promotional_slot` SQL | **PASS** |
| **Promotional Inventory**| 4.3 Slot exhaustion rollback | `fulfill_payment_order` SQL | **PASS** |
| **Promotional Inventory**| 4.4 Standard order unconstrained | `fulfill_payment_order` SQL | **PASS** |
| **Promotional Inventory**| 4.5 Active reservation counting | `entitlements.ts` -> `getPricingOffer` | **PASS** |
| **Persistence** | 5.1 Local order insertion failure | `app/api/payments/route.ts` | **PASS** |
| **Persistence** | 5.2 Promotional slot exhaust check | `app/api/payments/route.ts` | **PASS** |
| **Persistence** | 5.3 Atomic RPC failure handling | `app/api/payments/route.ts` | **PASS** |
| **Refunds** | 6.1 Multi-purchase reconciliation | `entitlements.ts` -> `reconcile` | **PASS** |
| **Refunds** | 6.2 Webhook refund handler | `app/api/payments/route.ts` | **PASS** |
| **Refunds** | 6.3 Promotional slot release | `app/api/payments/route.ts` | **PASS** |
| **Security & Grants** | 7.1 fulfill_payment_order security | Migration SQL | **PASS** |
| **Security & Grants** | 7.2 reserve_promotional_slot security | Migration SQL | **PASS** |
| **Security & Grants** | 7.3 Pinned search_path | Migration SQL | **PASS** |
| **Security & Grants** | 7.4 Live credential discriminator | `provider.ts` -> `RazorpayProvider` | **PASS** |

---

## 4. Execution Verification Commands

```bash
# Pass 3 Real PostgreSQL 16 Integration Suite (39 Scenarios)
npx tsx tests/payment-security-pass3-postgres.test.ts
# Result: 39 passed, 0 failed

# Pass 2 Behavioral Invariant Test Suite (20 Scenarios)
npx tsx tests/payment-remediation-pass2-behavioral.test.ts
# Result: 20 passed, 0 failed

# Pass 1 Forensic Remediation Test Suite (32 Scenarios)
npx tsx tests/payment-infrastructure-remediation.test.ts
# Result: 32 passed, 0 failed

# All Payment Suites Combined
npm run test:payments:all
# Result: 91 passed, 0 failed

# TypeScript Typecheck
npm run typecheck
# Result: 0 errors

# ESLint
npm run lint
# Result: 0 errors

# Production Build
npm run build
# Result: Compiled successfully (47/47 static pages generated)
```
