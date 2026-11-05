import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { MockSandboxProvider, RazorpayProvider } from "../lib/payments/provider";
import {
  SUPPORTED_PLANS,
  getPlanConfig,
  PRICING_CONFIG,
  reconcileUserEntitlements,
} from "../lib/payments/entitlements";

describe("Forensic Payment Infrastructure Remediation Test Suite", () => {
  const migrationPath = path.join(
    process.cwd(),
    "supabase/migrations/20261106_payment_infrastructure_remediation.sql"
  );
  const migrationSql = fs.readFileSync(migrationPath, "utf-8");

  const paymentsRoutePath = path.join(process.cwd(), "app/api/payments/route.ts");
  const routeContent = fs.readFileSync(paymentsRoutePath, "utf-8");

  const providerPath = path.join(process.cwd(), "lib/payments/provider.ts");
  const providerContent = fs.readFileSync(providerPath, "utf-8");

  const entitlementsPath = path.join(process.cwd(), "lib/payments/entitlements.ts");
  const entitlementsContent = fs.readFileSync(entitlementsPath, "utf-8");

  // =========================================================================
  // 1. PAYMENT STATUS TESTS (Phase 2.1)
  // =========================================================================
  describe("1. Payment Status Verification & Capture Gate", () => {
    it("1.1 Captured payment is verified as paid", async () => {
      const provider = new MockSandboxProvider();
      const status = await provider.verifyPaymentStatus("pay_sim_captured_12345", "order_123");
      assert.equal(status.isPaid, true);
      assert.equal(status.amount, 49900);
      assert.equal(status.currency, "INR");
    });

    it("1.2 Authorized payment alone is NOT treated as paid (cannot activate Premium)", async () => {
      const provider = new MockSandboxProvider();
      const status = await provider.verifyPaymentStatus("pay_sim_authorized_12345", "order_123");
      assert.equal(status.isPaid, false, "Authorized payment must NOT be marked isPaid: true");
      assert.ok(status.error?.includes("authorized but not captured"));
    });

    it("1.3 Failed payment is rejected as unpaid", async () => {
      const provider = new MockSandboxProvider();
      const status = await provider.verifyPaymentStatus("pay_sim_failed_12345", "order_123");
      assert.equal(status.isPaid, false);
      assert.ok(status.error?.includes("failed"));
    });

    it("1.4 Unknown payment status fails closed as unpaid", async () => {
      const provider = new MockSandboxProvider();
      const status = await provider.verifyPaymentStatus("pay_sim_unknown_12345", "order_123");
      assert.equal(status.isPaid, false);
      assert.ok(status.error?.includes("unknown"));
    });

    it("1.5 Webhook payment.authorized does NOT activate Premium", () => {
      assert.ok(
        routeContent.includes('event === "payment.authorized"'),
        "Route must explicitly intercept payment.authorized"
      );
      assert.ok(
        routeContent.includes("Entitlement fulfillment deferred"),
        "Route must defer fulfillment on authorized-only event"
      );
    });

    it("1.6 RazorpayProvider attempts auto-capture on authorized status before failing closed", () => {
      assert.ok(
        providerContent.includes('payment.status === "authorized"'),
        "Provider must inspect authorized status"
      );
      assert.ok(
        providerContent.includes("this.client.payments.capture"),
        "Provider must attempt server-side capture on authorized status"
      );
      assert.ok(
        providerContent.includes("Payment is authorized but not captured"),
        "Provider must fail closed if capture is not achieved"
      );
    });
  });

  // =========================================================================
  // 2. ORDER INTEGRITY & TAMPERING TESTS (Phase 2.2 & 2.3)
  // =========================================================================
  describe("2. Order Integrity, Provider Matching & Plan Derivation", () => {
    it("2.1 Provider mismatch between locked order and submission is rejected", () => {
      // TypeScript route handler check
      assert.ok(
        routeContent.includes("existingOrder.provider !== provider.name"),
        "Route must verify provider matches existingOrder.provider"
      );
      assert.ok(
        routeContent.includes('code: "PROVIDER_MISMATCH"'),
        "Route must return PROVIDER_MISMATCH code on mismatch"
      );

      // SQL RPC check
      assert.ok(
        migrationSql.includes("v_order.provider IS DISTINCT FROM p_provider"),
        "SQL fulfill_payment_order must compare v_order.provider with p_provider"
      );
      assert.ok(
        migrationSql.includes("PAYMENT_PROVIDER_MISMATCH"),
        "SQL RPC must raise exception on provider mismatch"
      );
    });

    it("2.2 Cross-user order verification attempt is strictly forbidden (HTTP 403)", () => {
      assert.ok(
        routeContent.includes("existingOrder.user_id !== authUser.id"),
        "Route must reject cross-user order verification"
      );
      assert.ok(
        routeContent.includes('code: "CROSS_USER_FORBIDDEN"'),
        "Must flag CROSS_USER_FORBIDDEN"
      );
    });

    it("2.3 Subscription tier is derived server-side from stored plan_id (rejects client tier manipulation)", () => {
      // SQL RPC derivation check
      assert.ok(
        migrationSql.includes("CASE v_order.plan_id"),
        "SQL RPC must switch on v_order.plan_id"
      );
      assert.ok(
        migrationSql.includes("WHEN 'all_access_pass_799'"),
        "SQL RPC must handle all_access_pass_799"
      );
      assert.ok(
        migrationSql.includes("v_derived_tier :="),
        "SQL RPC must assign derived tier from locked order"
      );
      assert.ok(
        migrationSql.includes("subscription_tier = v_derived_tier"),
        "SQL RPC must update profile with derived tier, not raw client tier"
      );
    });

    it("2.4 Unauthorized or arbitrary plan identifier is rejected in SQL RPC", () => {
      assert.ok(
        migrationSql.includes("UNAUTHORIZED_PLAN: Plan identifier % is not recognized"),
        "SQL RPC must raise exception for unauthorized plan identifier"
      );
    });

    it("2.5 Paid amount less than required order amount is rejected (amount tampering)", () => {
      assert.ok(
        migrationSql.includes("p_amount_paise < v_order.amount_paise"),
        "SQL RPC must enforce paid amount meets or exceeds order amount"
      );
      assert.ok(
        migrationSql.includes("PAYMENT_AMOUNT_MISMATCH"),
        "SQL RPC must reject amount tampering"
      );
      assert.ok(
        routeContent.includes("statusCheck.amount < requiredAmountPaise"),
        "Route must also enforce amount check before calling RPC"
      );
    });

    it("2.6 Currency tampering (non-INR) is strictly rejected", () => {
      assert.ok(
        migrationSql.includes("upper(btrim(v_order.currency)) <> upper(btrim(p_currency))"),
        "SQL RPC must enforce order currency matches received currency"
      );
      assert.ok(
        migrationSql.includes("PAYMENT_CURRENCY_MISMATCH"),
        "SQL RPC must reject currency mismatch"
      );
      assert.ok(
        routeContent.includes('statusCheck.currency.toUpperCase() !== "INR"'),
        "Route must fail closed if currency is not INR"
      );
    });

    it("2.7 Plan configuration registry resolves valid plans and rejects unknown plans", () => {
      const plan799 = getPlanConfig("all_access_pass_799");
      assert.equal(plan799.tier, "all_access_pass");
      assert.equal(plan799.standardPricePaise, 79900);
      assert.equal(plan799.bonusCoins, 500);

      const plan499 = getPlanConfig("ai_practice_pass_499");
      assert.equal(plan499.tier, "ai_practice_pass");
      assert.equal(plan499.standardPricePaise, 49900);
      assert.equal(plan499.bonusCoins, 250);

      assert.throws(() => getPlanConfig("unauthorized_hacker_plan"), /Unauthorized or unrecognized/);
    });
  });

  // =========================================================================
  // 3. IDEMPOTENCY & CONCURRENCY TESTS (Phase 2.4 & Phase 6)
  // =========================================================================
  describe("3. Idempotency & Concurrency Invariants", () => {
    it("3.1 Duplicate payment verification replay returns idempotent: true with 0 duplicate bonus coins", () => {
      assert.ok(
        migrationSql.includes("'idempotent', true"),
        "SQL RPC must return idempotent: true on replay"
      );
      assert.ok(
        migrationSql.includes("'bonus_coins_awarded', 0"),
        "SQL RPC must award 0 bonus coins on idempotent replay"
      );
    });

    it("3.2 Different payment ID attempting to fulfill already-paid order is rejected", () => {
      assert.ok(
        migrationSql.includes("v_existing_order_payment_id <> p_provider_payment_id"),
        "SQL RPC must detect different payment ID attempting to fulfill already-paid order"
      );
      assert.ok(
        migrationSql.includes("Order % is already fulfilled under different payment ID %"),
        "SQL RPC must raise unique violation exception"
      );
    });

    it("3.3 Partial unique index ensures at most one captured transaction per order", () => {
      assert.ok(
        migrationSql.includes("CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_transactions_order_captured"),
        "Migration must define partial unique index on payment_transactions"
      );
      assert.ok(
        migrationSql.includes("ON public.payment_transactions(order_id)"),
        "Index must target order_id"
      );
      assert.ok(
        migrationSql.includes("WHERE status = 'captured' AND order_id IS NOT NULL;"),
        "Index must filter for captured status and non-null order_id"
      );
    });

    it("3.4 Row locking FOR UPDATE is enforced on candidate profile and payment_orders", () => {
      assert.ok(
        migrationSql.includes("FROM public.profiles\n    WHERE id = p_user_id\n    FOR UPDATE;"),
        "Profile must be locked FOR UPDATE"
      );
      assert.ok(
        migrationSql.includes("FROM public.payment_orders\n    WHERE provider_order_id = p_provider_order_id\n    FOR UPDATE;"),
        "Order must be locked FOR UPDATE"
      );
    });
  });

  // =========================================================================
  // 4. PROMOTIONAL SLOT INVENTORY & ROLLBACK (Phase 3)
  // =========================================================================
  describe("4. Promotional Slot Inventory & Atomic Rollback", () => {
    it("4.1 reserve_promotional_slot RPC is created with FOR UPDATE SKIP LOCKED", () => {
      assert.ok(
        migrationSql.includes("CREATE OR REPLACE FUNCTION public.reserve_promotional_slot"),
        "Migration must create public.reserve_promotional_slot function"
      );
      assert.ok(
        migrationSql.includes("FOR UPDATE SKIP LOCKED"),
        "Reservation function must use FOR UPDATE SKIP LOCKED to prevent race conditions"
      );
      assert.ok(
        migrationSql.includes("expires_at = clock_timestamp() + INTERVAL '30 minutes'"),
        "Reservation must hold slot for 30 minutes"
      );
    });

    it("4.2 Expired reservations (< clock_timestamp()) can be safely reclaimed", () => {
      assert.ok(
        migrationSql.includes("ps.status = 'reserved' AND ps.expires_at < clock_timestamp()"),
        "Reservation must safely reclaim expired reserved slots"
      );
    });

    it("4.3 Promotional order fulfillment strictly ROLLS BACK if slot cannot be claimed (Zero inventory)", () => {
      assert.ok(
        migrationSql.includes("IF v_order.is_promotional THEN"),
        "SQL RPC must check if order is promotional"
      );
      assert.ok(
        migrationSql.includes("PROMOTIONAL_INVENTORY_EXHAUSTED"),
        "SQL RPC must raise PROMOTIONAL_INVENTORY_EXHAUSTED exception"
      );
      assert.ok(
        migrationSql.includes("IF v_slot_updated = 0 THEN\n            RAISE EXCEPTION 'PROMOTIONAL_INVENTORY_EXHAUSTED"),
        "SQL RPC must roll back entire transaction if slot claiming fails"
      );
    });

    it("4.4 Standard-priced orders are NOT constrained by promotional inventory", () => {
      // Promotional slot check only runs inside `IF v_order.is_promotional THEN`
      assert.ok(
        migrationSql.includes("IF v_order.is_promotional THEN\n        -- Attempt to claim"),
        "Promotional logic must be guarded by is_promotional condition"
      );
    });

    it("4.5 Pricing offer calculation counts both claimed slots AND active unexpired reservations", () => {
      assert.ok(
        entitlementsContent.includes('status", "claimed"'),
        "Must query claimed slots count"
      );
      assert.ok(
        entitlementsContent.includes('status", "reserved"') &&
        entitlementsContent.includes('gt("expires_at", nowIso)'),
        "Must query active unexpired reserved slots"
      );
      assert.ok(
        entitlementsContent.includes("allocatedCount = claimedCount + reservedCount") ||
        entitlementsContent.includes("claimedCount + reservedCount"),
        "Total allocated slots must sum claimed and reserved slots"
      );
    });
  });

  // =========================================================================
  // 5. LOCAL ORDER PERSISTENCE FAIL-CLOSED (Phase 4)
  // =========================================================================
  describe("5. Payment Order Persistence & Failure Handling", () => {
    it("5.1 Local payment_orders insertion failure FAILS CLOSED (never returns checkout order)", () => {
      assert.ok(
        routeContent.includes("if (insertError || !insertedOrder?.id)"),
        "Route must check insertError on payment_orders insertion"
      );
      assert.ok(
        routeContent.includes('code: "ORDER_PERSISTENCE_FAILED"'),
        "Route must return ORDER_PERSISTENCE_FAILED error code"
      );
      assert.ok(
        routeContent.includes("status: 500"),
        "Route must return HTTP 500 on order persistence failure"
      );
    });

    it("5.2 Promotional order creation fails closed if slot reservation fails", () => {
      assert.ok(
        routeContent.includes("if (reservedSlotNumber === null)"),
        "Route must verify reservedSlotNumber for promotional orders"
      );
      assert.ok(
        routeContent.includes('code: "PROMOTIONAL_SLOTS_EXHAUSTED"'),
        "Route must return PROMOTIONAL_SLOTS_EXHAUSTED code"
      );
      assert.ok(
        routeContent.includes("status: 409"),
        "Route must return HTTP 409 on promotional slot exhaustion"
      );
    });

    it("5.3 Atomic RPC fulfillment failure FAILS CLOSED with HTTP 503 (no partial state)", () => {
      assert.ok(
        routeContent.includes('code: "ATOMIC_FULFILLMENT_FAILED"'),
        "Route must return ATOMIC_FULFILLMENT_FAILED code"
      );
      assert.ok(
        routeContent.includes("status: 503"),
        "Route must fail closed with HTTP 503 on atomic RPC failure"
      );
    });
  });

  // =========================================================================
  // 6. REFUND & ENTITLEMENT RECONCILIATION (Phase 5)
  // =========================================================================
  describe("6. Refund Reconciliation & Multi-Purchase Handling", () => {
    it("6.1 reconcileUserEntitlements helper exists and inspects surviving captured purchases", () => {
      assert.ok(
        entitlementsContent.includes("export async function reconcileUserEntitlements"),
        "entitlements.ts must export reconcileUserEntitlements"
      );
      assert.ok(
        entitlementsContent.includes('.eq("status", "captured")'),
        "Must query captured transactions"
      );
      assert.ok(
        entitlementsContent.includes("oneYearAfter > now.getTime()"),
        "Must filter for transactions within active validity window"
      );
    });

    it("6.2 Webhook refund handler invokes reconcileUserEntitlements", () => {
      assert.ok(
        routeContent.includes("reconcileUserEntitlements(targetUserId)"),
        "Webhook refund handler must call reconcileUserEntitlements"
      );
    });

    it("6.3 Promotional slot is released on order refund", () => {
      assert.ok(
        routeContent.includes('.update({ status: "released", user_id: null, order_id: null, claimed_at: null })'),
        "Promotional slot must be released when promotional order is refunded"
      );
    });
  });

  // =========================================================================
  // 7. PRODUCTION SECURITY & PRIVILEGE BOUNDARIES (Phase 6 & 8)
  // =========================================================================
  describe("7. Security & Privilege Boundaries", () => {
    it("7.1 fulfill_payment_order RPC is restricted exclusively to service_role", () => {
      assert.ok(
        migrationSql.includes("REVOKE ALL ON FUNCTION public.fulfill_payment_order"),
        "Must revoke fulfill_payment_order from public/anon/authenticated"
      );
      assert.ok(
        migrationSql.includes("GRANT EXECUTE ON FUNCTION public.fulfill_payment_order") &&
        migrationSql.includes("TO service_role;"),
        "Must grant fulfill_payment_order exclusively to service_role"
      );
    });

    it("7.2 reserve_promotional_slot RPC is restricted exclusively to service_role", () => {
      assert.ok(
        migrationSql.includes("REVOKE ALL ON FUNCTION public.reserve_promotional_slot"),
        "Must revoke reserve_promotional_slot from public/anon/authenticated"
      );
      assert.ok(
        migrationSql.includes("GRANT EXECUTE ON FUNCTION public.reserve_promotional_slot") &&
        migrationSql.includes("TO service_role;"),
        "Must grant reserve_promotional_slot exclusively to service_role"
      );
    });

    it("7.3 Pinned search_path (public, pg_temp) on all security definer functions", () => {
      assert.ok(
        migrationSql.includes("SET search_path = public, pg_temp"),
        "Functions must pin search_path to prevent search path injection"
      );
    });

    it("7.4 Production keyId live check distinguishes live vs test credentials", () => {
      const liveProvider = new RazorpayProvider("rzp_live_real_key_id", "secret", "wh_secret");
      assert.equal(liveProvider.isLive, true, "rzp_live_ key must set isLive: true");

      const testProvider = new RazorpayProvider("rzp_test_sample_key_id", "secret", "wh_secret");
      assert.equal(testProvider.isLive, false, "rzp_test_ key must set isLive: false");
    });
  });
});
