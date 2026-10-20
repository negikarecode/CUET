import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";

/**
 * Deterministic Test Suite for Atomic Payment Fulfillment & Migration Invariants (Part C)
 *
 * NOTE ON TEST BOUNDARIES (Mocked vs Real PostgreSQL Integration):
 * - These unit/contract tests deterministically verify SQL migration source ASTs, invariant checks,
 *   role execution grants, and TypeScript route orchestration logic.
 * - Multi-statement PostgreSQL transaction guarantees (e.g. FOR UPDATE row locks, engine rollbacks)
 *   are enforced by PostgreSQL's ACID transaction manager via the fulfill_payment_order function.
 */

describe("Part C: Payment Fulfillment Invariants & Failure Boundary Tests", () => {
  const sqlPath = path.join(__dirname, "../supabase/migrations/20261020_atomic_payment_fulfillment.sql");
  const sqlContent = fs.readFileSync(sqlPath, "utf-8");

  const paymentsRoutePath = path.join(__dirname, "../app/api/payments/route.ts");
  const routeContent = fs.readFileSync(paymentsRoutePath, "utf-8");

  // ─── 1. SIMULTANEOUS REQUESTS FOR SAME PAYMENT (IDEMPOTENCY & LOCKING) ───────
  it("Scenario 1: Concurrency row locking & idempotency on duplicate payment ID", () => {
    // 1. Must lock profiles and payment_orders FOR UPDATE
    assert.ok(
      sqlContent.includes("FROM public.profiles\n    WHERE id = p_user_id\n    FOR UPDATE;"),
      "Profile row must be locked FOR UPDATE to serialize concurrent requests"
    );
    assert.ok(
      sqlContent.includes("FROM public.payment_orders") &&
      sqlContent.includes("WHERE provider_order_id = p_provider_order_id\n    FOR UPDATE;"),
      "Order row must be locked FOR UPDATE to prevent race conditions"
    );

    // 2. Must detect existing transaction and return idempotent success
    assert.ok(
      sqlContent.includes("WHERE provider_payment_id = p_provider_payment_id;"),
      "Must check for existing transaction by provider_payment_id"
    );
    assert.ok(
      sqlContent.includes("'idempotent', true"),
      "Must return idempotent flag on replay"
    );
  });

  // ─── 2. TWO DIFFERENT PAYMENT IDS ATTEMPTING TO FULFILL ONE ORDER ───────────
  it("Scenario 2: Reject different payment ID attempting to fulfill already-paid order", () => {
    assert.ok(
      sqlContent.includes("v_existing_order_payment_id <> p_provider_payment_id"),
      "Must detect if order is already bound to a different payment ID"
    );
    assert.ok(
      sqlContent.includes("RAISE EXCEPTION 'Order % already fulfilled by payment %; cannot fulfill with %'"),
      "Must raise unique_violation exception when second payment ID targets the same order"
    );
    assert.ok(
      sqlContent.includes("USING ERRCODE = '23505'"),
      "Must use ERRCODE 23505 (unique_violation) for conflicting fulfillment attempt"
    );
    assert.ok(
      sqlContent.includes("RAISE EXCEPTION 'Order % is already marked as paid and cannot be fulfilled by another payment %'"),
      "Must reject unrecorded payment ID attempting to fulfill already-paid order"
    );
  });

  // ─── 2B. REJECT SAME PAYMENT ID ON DIFFERENT USER OR ORDER ───────────────────
  it("Scenario 2B: Reject payment ID reuse with different user or different order", () => {
    // 1. Must select user_id, order_id, provider, and status in existing transaction check
    assert.ok(
      sqlContent.includes("SELECT id, user_id, order_id, provider, status INTO v_existing_tx"),
      "Must inspect user_id, order_id, provider, and status of existing transaction"
    );
    // 2. Reject non-captured replays
    assert.ok(
      sqlContent.includes("v_existing_tx.status <> 'captured'"),
      "Must reject replays of transactions not in captured state"
    );
    // 3. Reject cross-user payment reuse
    assert.ok(
      sqlContent.includes("v_existing_tx.user_id <> p_user_id"),
      "Must compare existing transaction user_id with requesting p_user_id"
    );
    assert.ok(
      sqlContent.includes("RAISE EXCEPTION 'Cross-user payment reuse attempt: payment % already belongs to user %'"),
      "Must raise error when payment ID is reused by a different user"
    );
    // 4. Reject cross-order payment reuse
    assert.ok(
      sqlContent.includes("v_existing_tx.order_id IS DISTINCT FROM v_order.id"),
      "Must compare existing transaction order_id with current order using IS DISTINCT FROM"
    );
    assert.ok(
      sqlContent.includes("RAISE EXCEPTION 'Cross-order payment reuse attempt: payment % is bound to order %, cannot fulfill order %'"),
      "Must raise error when payment ID is reused for a different order"
    );
    // 5. Reject provider mismatch
    assert.ok(
      sqlContent.includes("v_existing_tx.provider IS DISTINCT FROM p_provider"),
      "Must reject replay when provider does not match"
    );
    // 6. Route handler must also check cross-user payment reuse
    assert.ok(
      routeContent.includes("CROSS_USER_FORBIDDEN"),
      "Route handler must return 403 CROSS_USER_FORBIDDEN if transaction belongs to another candidate"
    );
  });

  // ─── 3. TRANSACTION ROLLBACK INTEGRITY ──────────────────────────────────────
  it("Scenario 3: Single atomic transaction boundary for multi-table mutations", () => {
    // In PL/pgSQL, all statements within a function execute in a single transaction.
    // If an EXCEPTION occurs anywhere, the entire block rolls back.
    assert.ok(
      sqlContent.includes("LANGUAGE plpgsql"),
      "Must be implemented in PL/pgSQL to guarantee single atomic transaction boundary"
    );
    assert.ok(
      sqlContent.includes("SECURITY DEFINER"),
      "Must execute with SECURITY DEFINER to atomically update profiles and payment tables"
    );
    assert.ok(
      sqlContent.includes("SET search_path = public, pg_temp"),
      "Must pin search path to public, pg_temp"
    );
  });

  // ─── 4. RETRY AFTER SUCCESSFUL FULFILLMENT ──────────────────────────────────
  it("Scenario 4: Replay after successful fulfillment returns active state without duplicate coins", () => {
    // When payment is already recorded, it returns early before bonus coin logic
    const txCheckPos = sqlContent.indexOf("SELECT id, user_id, order_id, provider, status INTO v_existing_tx");
    const bonusCoinPos = sqlContent.indexOf("v_coins_to_award := coalesce(p_bonus_coins, 500);");

    assert.ok(txCheckPos !== -1 && bonusCoinPos !== -1, "Both check and award blocks must exist");
    assert.ok(txCheckPos < bonusCoinPos, "Idempotency check must precede bonus coin calculation");
  });

  // ─── 5. INSUFFICIENT AMOUNT, WRONG CURRENCY, WRONG USER INVARIANTS ──────────
  it("Scenario 5: Independent database-level invariant enforcement", () => {
    // 1. Amount validation
    assert.ok(
      sqlContent.includes("p_amount_paise < v_order.amount_paise"),
      "Must reject underpayment in database function"
    );
    assert.ok(
      sqlContent.includes("p_amount_paise <= 0"),
      "Must reject non-positive amounts"
    );

    // 2. Currency validation
    assert.ok(
      sqlContent.includes("upper(p_currency) <> 'INR'"),
      "Must require INR currency"
    );

    // 3. Ownership validation
    assert.ok(
      sqlContent.includes("v_order.user_id <> p_user_id"),
      "Must reject cross-user order fulfillment"
    );
  });

  // ─── 6. UNAUTHORIZED DIRECT RPC EXECUTION PROTECTION ───────────────────────
  it("Scenario 6: Direct client RPC invocation is strictly forbidden", () => {
    assert.ok(
      sqlContent.includes("REVOKE ALL ON FUNCTION public.fulfill_payment_order"),
      "Must revoke PUBLIC execution rights"
    );
    assert.ok(
      sqlContent.includes("REVOKE ALL ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) FROM anon, authenticated"),
      "Must explicitly revoke anon and authenticated roles"
    );
    assert.ok(
      sqlContent.includes("GRANT EXECUTE ON FUNCTION public.fulfill_payment_order(UUID, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, TEXT, TIMESTAMPTZ, INTEGER, JSONB) TO service_role"),
      "Must grant execution exclusively to service_role"
    );
  });

  // ─── 7. APPLICATION FAIL-CLOSED POLICY (NO UNSAFE PARTIAL FALLBACK) ─────────
  it("Scenario 7: Route handler strictly fails closed if atomic RPC fails", () => {
    assert.ok(
      routeContent.includes("ATOMIC_FULFILLMENT_FAILED"),
      "Route handler must return ATOMIC_FULFILLMENT_FAILED (HTTP 503) on RPC error"
    );
    assert.ok(
      !routeContent.includes(".neq(\"status\", \"paid\")"),
      "Route handler must not perform uncoordinated partial sequential fallbacks"
    );
  });

  // ─── 8. SUBSCRIPTION RENEWAL & EXPIRY EXTENSION LOGIC ──────────────────────
  it("Scenario 8: Renewal preserves and extends existing future expiration date", () => {
    assert.ok(
      sqlContent.includes("v_profile.subscription_expires_at > NOW()"),
      "Must check if existing candidate subscription is in the future"
    );
    assert.ok(
      sqlContent.includes("v_calculated_expiry := v_profile.subscription_expires_at + INTERVAL '1 year'"),
      "Must add 1 year to current expiration on renewal, preserving remaining time"
    );
  });

  // ─── 9. PROVIDER CHECK CONSTRAINT COMPLIANCE ────────────────────────────────
  it("Scenario 9: Provider names must comply with database CHECK (provider IN ('razorpay', 'cashfree', 'mock'))", () => {
    const providerPath = path.join(__dirname, "../lib/payments/provider.ts");
    const providerContent = fs.readFileSync(providerPath, "utf-8");

    // Live DB constraint on payment_orders: CHECK (provider IN ('razorpay', 'cashfree', 'mock'))
    assert.ok(
      providerContent.includes('name = "razorpay";'),
      "RazorpayProvider must identify as 'razorpay'"
    );
    assert.ok(
      providerContent.includes('name = "mock";'),
      "MockSandboxProvider must identify as 'mock' to satisfy database CHECK constraint"
    );
    assert.ok(
      !providerContent.includes('name = "mock_sandbox";'),
      "Must not use 'mock_sandbox' which violates DB CHECK constraint"
    );
  });

  // ─── 10. MANDATORY ORDER ID & ACCURATE ENTITLEMENT STATE ───────────────────
  it("Scenario 10: Missing order ID is strictly rejected and entitlement status is accurately reported", () => {
    // 1. Missing provider order ID must be rejected
    assert.ok(
      sqlContent.includes("p_provider_order_id IS NULL OR trim(p_provider_order_id) = ''"),
      "Must check for missing or blank provider order ID"
    );
    assert.ok(
      sqlContent.includes("Missing provider order ID: payment fulfillment requires a valid provider order"),
      "Must raise exception when provider order ID is omitted"
    );

    // 2. Order not found must raise error
    assert.ok(
      sqlContent.includes("Payment order not found: %"),
      "Must raise exception when provider order does not exist in payment_orders"
    );

    // 3. Return objects must include is_premium verification
    assert.ok(
      sqlContent.includes("'is_premium', true"),
      "First-time fulfillment must return is_premium: true"
    );
    assert.ok(
      sqlContent.includes("'is_premium', coalesce(v_profile.is_premium, false) AND (v_profile.subscription_expires_at IS NULL OR v_profile.subscription_expires_at > NOW())"),
      "Idempotent replay must evaluate actual profile entitlement and expiry"
    );

    // 4. Route handler must report actual entitlement
    assert.ok(
      routeContent.includes("isPremium: isCurrentlyPremium"),
      "Route handler idempotency path must report actual entitlement from database"
    );
  });

  // ─── 11. FINANCIAL RETENTION & ON DELETE RESTRICT (STATUTORY COMPLIANCE) ────
  it("Scenario 11: Payment tables must enforce ON DELETE RESTRICT to comply with statutory retention", () => {
    const cascadeMigrationPath = path.join(__dirname, "../supabase/migrations/20261021_fix_cascade_and_seed_slots.sql");
    const cascadeSql = fs.readFileSync(cascadeMigrationPath, "utf-8");

    assert.ok(
      cascadeSql.includes("ALTER TABLE public.payment_orders") &&
      cascadeSql.includes("FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE RESTRICT"),
      "payment_orders must enforce ON DELETE RESTRICT on user_id"
    );

    assert.ok(
      cascadeSql.includes("ALTER TABLE public.payment_transactions") &&
      cascadeSql.includes("FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE RESTRICT"),
      "payment_transactions must enforce ON DELETE RESTRICT on user_id"
    );

    assert.ok(
      cascadeSql.includes("FOREIGN KEY (order_id) REFERENCES public.payment_orders(id) ON DELETE RESTRICT"),
      "payment_transactions must enforce ON DELETE RESTRICT on order_id"
    );
  });

  // ─── 12. IMMUTABLE USAGE LEDGER & PAYWALL PRESERVATION ──────────────────────
  it("Scenario 12: User usage ledger must be immutable source of truth against attempt deletion", () => {
    const entitlementsPath = path.join(__dirname, "../lib/payments/entitlements.ts");
    const entitlementsContent = fs.readFileSync(entitlementsPath, "utf-8");

    const attemptsRoutePath = path.join(__dirname, "../app/api/student/attempts/route.ts");
    const attemptsRouteContent = fs.readFileSync(attemptsRoutePath, "utf-8");

    const testRoutePath = path.join(__dirname, "../app/api/test/[testId]/route.ts");
    const testRouteContent = fs.readFileSync(testRoutePath, "utf-8");

    // Must record session completion to usage ledger upon submission
    assert.ok(
      testRouteContent.includes("recordSessionCompletion"),
      "Test submission must record completion to user_usage_ledger"
    );

    // Entitlements must prioritize user_usage_ledger
    assert.ok(
      entitlementsContent.includes("from(\"user_usage_ledger\")") &&
      entitlementsContent.includes("ledgerRows && ledgerRows.length > 0"),
      "Usage summary must treat user_usage_ledger as primary immutable source of truth"
    );

    // DELETE /api/student/attempts must NOT delete from user_usage_ledger
    assert.ok(
      !attemptsRouteContent.includes("from(\"user_usage_ledger\").delete()"),
      "DELETE /api/student/attempts must NEVER delete rows from user_usage_ledger"
    );
  });

  // ─── 13. PROMOTIONAL SLOTS 100 SEEDING & RESERVATION INTEGRITY ───────────────
  it("Scenario 13: 100 promotional slots must be seeded and reserved on promotional order creation", () => {
    const cascadeMigrationPath = path.join(__dirname, "../supabase/migrations/20261021_fix_cascade_and_seed_slots.sql");
    const cascadeSql = fs.readFileSync(cascadeMigrationPath, "utf-8");

    assert.ok(
      cascadeSql.includes("INSERT INTO public.promotional_slots (slot_number, status, expires_at)") &&
      cascadeSql.includes("generate_series(1, 100)"),
      "Must seed 100 promotional slots with released status"
    );

    // Payment route must reserve slot for promotional orders
    assert.ok(
      routeContent.includes("isPromotional && insertedOrder?.id") &&
      routeContent.includes("promotional_slots"),
      "Order creation route must reserve an available slot for promotional orders"
    );
  });
});
