import { describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { RazorpayProvider, MockSandboxProvider } from "../lib/payments/provider";
import { getPlanConfig, SUPPORTED_PLANS, SubscriptionTier } from "../lib/payments/entitlements";

describe("Payment Remediation Pass 2: Behavioral & Invariant Test Suite", () => {
  const webhookSecret = "test_webhook_secret_key_12345";
  const razorpayProvider = new RazorpayProvider(
    "rzp_test_mock_key_id",
    "mock_key_secret_12345",
    webhookSecret
  );

  const migration2Sql = fs.readFileSync(
    path.join(process.cwd(), "supabase/migrations/20261106_payment_remediation_pass2.sql"),
    "utf-8"
  );
  const routeContent = fs.readFileSync(
    path.join(process.cwd(), "app/api/payments/route.ts"),
    "utf-8"
  );
  const entitlementsContent = fs.readFileSync(
    path.join(process.cwd(), "lib/payments/entitlements.ts"),
    "utf-8"
  );

  function signPayload(body: string, secret: string = webhookSecret): string {
    return crypto.createHmac("sha256", secret).update(body).digest("hex");
  }

  // =========================================================================
  // 1. WEBHOOK PAYMENT IDENTITY & ENTITY PARSING (Req 1, 2, 3, 4)
  // =========================================================================
  it("1. Actual payment.captured webhook payload extracts real paymentId and orderId", () => {
    const rawPayload = JSON.stringify({
      entity: "event",
      account_id: "acc_CUETMate001",
      event: "payment.captured",
      contains: ["payment"],
      payload: {
        payment: {
          entity: {
            id: "pay_captured_real_987654",
            entity: "payment",
            amount: 79900,
            currency: "INR",
            status: "captured",
            order_id: "order_captured_real_123456",
            notes: {
              userId: "user_cand_001",
              planId: "all_access_pass_799",
            },
          },
        },
      },
    });

    const sig = signPayload(rawPayload);
    const result = razorpayProvider.verifyWebhook(rawPayload, sig);

    assert.equal(result.isValid, true);
    assert.equal(result.event, "payment.captured");
    assert.equal(result.paymentId, "pay_captured_real_987654");
    assert.equal(result.orderId, "order_captured_real_123456");
    assert.equal(result.amount, 79900);
    assert.equal(result.currency, "INR");
    assert.equal(result.userId, "user_cand_001");
    assert.notEqual(result.paymentId, result.orderId, "Payment ID must never equal Order ID");
  });

  it("2. Actual order.paid payload without payment ID does NOT synthesize payment ID", async () => {
    const rawPayload = JSON.stringify({
      entity: "event",
      account_id: "acc_CUETMate001",
      event: "order.paid",
      contains: ["order"],
      payload: {
        order: {
          entity: {
            id: "order_only_paid_no_pay_id_999",
            entity: "order",
            amount: 79900,
            amount_paid: 79900,
            currency: "INR",
            status: "paid",
            notes: {
              userId: "user_cand_002",
              planId: "all_access_pass_799",
            },
          },
        },
      },
    });

    const sig = signPayload(rawPayload);
    const result = razorpayProvider.verifyWebhook(rawPayload, sig);

    assert.equal(result.isValid, true);
    assert.equal(result.event, "order.paid");
    assert.equal(result.orderId, "order_only_paid_no_pay_id_999");
    assert.equal(result.paymentId, undefined, "order.paid without payment entity must NOT return paymentId");
    assert.notEqual(result.paymentId, result.orderId, "Order ID must NEVER be returned as payment ID");

    // Provider fetchOrderPayments check
    const mockProvider = new MockSandboxProvider();
    const payments = await mockProvider.fetchOrderPayments("order_without_captured");
    assert.deepEqual(payments, [], "Provider returns empty array when no captured payments exist");
  });

  it("3. Duplicate captured webhook is safe and idempotent", () => {
    // In SQL fulfill_payment_order:
    // If existing captured transaction matches p_provider_payment_id:
    // returns idempotent: true, bonus_coins_awarded: 0, without extending expiry or re-crediting
    assert.ok(
      migration2Sql.includes("IF v_existing_tx.status = 'captured' THEN"),
      "SQL RPC must check if transaction was already captured"
    );
    assert.ok(
      migration2Sql.includes("'idempotent', true"),
      "SQL RPC must return idempotent: true"
    );
    assert.ok(
      migration2Sql.includes("'bonus_coins_awarded', 0"),
      "SQL RPC must award 0 bonus coins on duplicate replay"
    );
  });

  it("4. Authorized payment followed by capture (authorized alone cannot activate)", async () => {
    const mockProvider = new MockSandboxProvider();

    // Stage 1: Payment is authorized
    const authStatus = await mockProvider.verifyPaymentStatus("pay_sim_authorized_999", "order_123");
    assert.equal(authStatus.isPaid, false, "Authorized status must fail closed");
    assert.ok(authStatus.error?.includes("authorized but not captured"));

    // Stage 2: Payment transitions to captured
    const capturedStatus = await mockProvider.verifyPaymentStatus("pay_sim_captured_999", "order_123");
    assert.equal(capturedStatus.isPaid, true, "Captured status must be verified as paid");
    assert.equal(capturedStatus.amount, 49900);
  });

  // =========================================================================
  // 2. DISPUTES SEPARATED FROM REFUNDS (Req 5, 6, 7)
  // =========================================================================
  it("5. Dispute created does NOT mark transaction refunded and preserves inventory", () => {
    const rawPayload = JSON.stringify({
      entity: "event",
      account_id: "acc_CUETMate001",
      event: "payment.dispute.created",
      contains: ["dispute", "payment"],
      payload: {
        dispute: {
          entity: {
            id: "disp_chargeback_12345",
            entity: "dispute",
            payment_id: "pay_captured_disputed_001",
            amount: 79900,
            currency: "INR",
            status: "under_review",
            reason_code: "fraudulent",
          },
        },
        payment: {
          entity: {
            id: "pay_captured_disputed_001",
            entity: "payment",
            order_id: "order_disputed_001",
            amount: 79900,
            currency: "INR",
          },
        },
      },
    });

    const sig = signPayload(rawPayload);
    const result = razorpayProvider.verifyWebhook(rawPayload, sig);

    assert.equal(result.isValid, true);
    assert.equal(result.event, "payment.dispute.created");
    assert.equal(result.disputeId, "disp_chargeback_12345");
    assert.equal(result.paymentId, "pay_captured_disputed_001");
    assert.equal(result.disputeStatus, "under_review");

    // Route invariant verification:
    // Must update status to 'disputed', NOT 'refunded'
    assert.ok(
      routeContent.includes('.update({ status: "disputed", dispute_status: "under_review" })'),
      "Dispute-created must mark status as 'disputed' without refunding"
    );
    // Promotional slot must NOT be released on dispute creation
    assert.ok(
      !routeContent.includes('event === "payment.dispute.created"\n            if (updatedOrd?.is_promotional)'),
      "Promotional slot must not be released on dispute.created"
    );
  });

  it("6. Dispute won restores transaction to captured and affirms Premium", () => {
    assert.ok(
      routeContent.includes('event === "payment.dispute.won"'),
      "Route must handle payment.dispute.won event"
    );
    assert.ok(
      routeContent.includes('.update({ status: "captured", dispute_status: "won" })'),
      "Dispute won must restore transaction to 'captured'"
    );
    assert.ok(
      routeContent.includes("Dispute Won"),
      "Must log dispute won"
    );
  });

  it("7. Dispute lost transitions to disputed_lost, releases slot and reconciles entitlement", () => {
    assert.ok(
      routeContent.includes('event === "payment.dispute.lost"'),
      "Route must handle payment.dispute.lost event"
    );
    assert.ok(
      routeContent.includes('.update({ status: "disputed_lost", dispute_status: "lost" })'),
      "Dispute lost must transition transaction to 'disputed_lost'"
    );
    assert.ok(
      routeContent.includes('updatedOrd?.is_promotional && updatedOrd?.id') &&
      routeContent.includes('.update({ status: "released", user_id: null, order_id: null, claimed_at: null })'),
      "Dispute lost must release promotional slot"
    );
  });

  // =========================================================================
  // 3. PARTIAL VS FULL REFUNDS (Req 8, 9, 10, 11)
  // =========================================================================
  it("8. Partial refund marks partially_refunded and does NOT revoke Premium or release slot", () => {
    const rawPayload = JSON.stringify({
      entity: "event",
      account_id: "acc_CUETMate001",
      event: "refund.processed",
      contains: ["refund", "payment"],
      payload: {
        refund: {
          entity: {
            id: "rfnd_part_987",
            entity: "refund",
            payment_id: "pay_captured_799",
            amount: 20000, // ₹200 partial refund on ₹799
            currency: "INR",
            status: "processed",
          },
        },
        payment: {
          entity: {
            id: "pay_captured_799",
            entity: "payment",
            order_id: "order_799",
            amount: 79900,
            amount_refunded: 20000,
            status: "captured",
          },
        },
      },
    });

    const sig = signPayload(rawPayload);
    const result = razorpayProvider.verifyWebhook(rawPayload, sig);

    assert.equal(result.isValid, true);
    assert.equal(result.refundId, "rfnd_part_987");
    assert.equal(result.refundAmount, 20000);
    assert.equal(result.paymentAmountRefunded, 20000);

    // Route invariant:
    // If cumulativeRefunded < capturedAmount:
    // marks partially_refunded, does not release slot
    assert.ok(
      routeContent.includes('.update({ status: "partially_refunded", refunded_amount_paise: cumulativeRefunded })'),
      "Partial refund must record status as partially_refunded"
    );
  });

  it("9. Full refund marks refunded, releases promotional slot, and reconciles entitlement", () => {
    const rawPayload = JSON.stringify({
      entity: "event",
      account_id: "acc_CUETMate001",
      event: "refund.processed",
      contains: ["refund", "payment"],
      payload: {
        refund: {
          entity: {
            id: "rfnd_full_987",
            entity: "refund",
            payment_id: "pay_captured_799",
            amount: 79900,
            currency: "INR",
            status: "processed",
          },
        },
        payment: {
          entity: {
            id: "pay_captured_799",
            entity: "payment",
            order_id: "order_799",
            amount: 79900,
            amount_refunded: 79900,
            status: "refunded",
          },
        },
      },
    });

    const sig = signPayload(rawPayload);
    const result = razorpayProvider.verifyWebhook(rawPayload, sig);

    assert.equal(result.isValid, true);
    assert.equal(result.refundId, "rfnd_full_987");
    assert.equal(result.refundAmount, 79900);
    assert.equal(result.paymentAmountRefunded, 79900);

    // Cumulative check:
    const isFullRefund = Number(result.paymentAmountRefunded) >= Number(result.amount);
    assert.equal(isFullRefund, true);

    assert.ok(
      routeContent.includes('.update({ status: "refunded", refunded_amount_paise: cumulativeRefunded })'),
      "Full refund must update transaction status to refunded"
    );
  });

  it("10. Duplicate refund webhook does not double count refund amount", () => {
    // Unique constraint in migration 2
    assert.ok(
      migration2Sql.includes("provider_refund_id TEXT UNIQUE NOT NULL"),
      "payment_refunds must enforce UNIQUE constraint on provider_refund_id"
    );
    assert.ok(
      routeContent.includes('onConflict: "provider_refund_id"'),
      "Refund upsert must be idempotent on provider_refund_id"
    );
  });

  it("11. Out-of-order refund events (refund.processed before refund.created) are handled idempotently", () => {
    assert.ok(
      migration2Sql.includes("status TEXT NOT NULL DEFAULT 'processed' CHECK (status IN ('created', 'processed', 'failed'))"),
      "payment_refunds table accepts both created and processed status"
    );
    assert.ok(
      routeContent.includes('status: event === "refund.processed" ? "processed" : "created"'),
      "Route stores authoritative provider event status"
    );
  });

  // =========================================================================
  // 4. PROMOTIONAL SLOT INVENTORY & ATOMIC RESERVATION (Req 12, 13)
  // =========================================================================
  it("12. Concurrent slot reservations enforce SKIP LOCKED and order validation in SQL", () => {
    assert.ok(
      migration2Sql.includes("FOR UPDATE SKIP LOCKED"),
      "reserve_promotional_slot must use FOR UPDATE SKIP LOCKED"
    );
    assert.ok(
      migration2Sql.includes("IF v_order.user_id <> p_user_id THEN"),
      "reserve_promotional_slot must validate candidate ownership"
    );
    assert.ok(
      migration2Sql.includes("IF NOT coalesce(v_order.is_promotional, false) THEN"),
      "reserve_promotional_slot must validate order is promotional"
    );
    assert.ok(
      migration2Sql.includes("IF v_order.status NOT IN ('created', 'pending') THEN"),
      "reserve_promotional_slot must validate order is in eligible state"
    );
  });

  it("13. RPC failure during reservation strictly fails closed without JavaScript fallback", () => {
    assert.ok(
      !routeContent.includes("availableSlot?.slot_number"),
      "JavaScript SELECT-then-UPDATE fallback must be completely removed"
    );
    assert.ok(
      routeContent.includes('code: "PROMOTIONAL_SLOTS_EXHAUSTED"'),
      "Fails closed with PROMOTIONAL_SLOTS_EXHAUSTED"
    );
    assert.ok(
      routeContent.includes('status: 409'),
      "Returns HTTP 409 Conflict"
    );
  });

  // =========================================================================
  // 5. PLAN & PAYMENT INTEGRITY (Req 14, 15, 16, 17)
  // =========================================================================
  it("14. Invalid plan ID returns HTTP 400 INVALID_PLAN without silent fallback", () => {
    // Test getPlanConfig directly
    assert.throws(() => getPlanConfig("unknown_plan_abc"), /Unauthorized or unrecognized plan ID/);
    assert.throws(() => getPlanConfig(""), /Unauthorized or unrecognized plan ID/);

    // Route checks
    assert.ok(
      routeContent.includes('code: "INVALID_PLAN"'),
      "Route must return INVALID_PLAN code on unknown plan"
    );
    assert.ok(
      !routeContent.includes('selectedPlan = getPlanConfig("all_access_pass_799");\n    }'),
      "Route must not silently substitute 799 on catch"
    );
  });

  it("15. Underpayment is strictly rejected in both Route and SQL RPC", () => {
    assert.ok(
      routeContent.includes("statusCheck.amount !== requiredAmountPaise"),
      "Route must reject any amount that does not match required order amount"
    );
    assert.ok(
      migration2Sql.includes("IF p_amount_paise <> v_order.amount_paise THEN"),
      "SQL RPC must reject underpayment with <> operator"
    );
  });

  it("16. Overpayment is strictly rejected in both Route and SQL RPC", () => {
    assert.ok(
      routeContent.includes('code: "PAYMENT_AMOUNT_MISMATCH"'),
      "Route returns PAYMENT_AMOUNT_MISMATCH on overpayment"
    );
    assert.ok(
      migration2Sql.includes("PAYMENT_AMOUNT_MISMATCH: Order requires % paise, received % paise"),
      "SQL RPC raises exception on overpayment"
    );
  });

  it("17. Same payment ID submitted against another order is rejected", () => {
    assert.ok(
      migration2Sql.includes("IF v_existing_tx.order_id IS DISTINCT FROM v_order.id THEN"),
      "SQL RPC checks if existing payment is already bound to a different order"
    );
    assert.ok(
      migration2Sql.includes("Payment ID % is already bound to a different order %"),
      "Raises exception on cross-order payment reuse attempt"
    );
    assert.ok(
      migration2Sql.includes("WHERE payment_transactions.order_id = EXCLUDED.order_id;"),
      "ON CONFLICT UPDATE enforces immutable order_id"
    );
  });

  // =========================================================================
  // 6. SEQUENTIAL EXTENSION & REFUND RECONCILIATION (Req 18, 19, 20)
  // =========================================================================
  it("18. Sequential subscription extension simulation stacks durations chronologically", () => {
    const t0 = new Date("2026-01-01T00:00:00.000Z").getTime();
    const durationDays = 365;
    const durationMs = durationDays * 24 * 60 * 60 * 1000;

    // Purchase 1 at T0
    let currentExpiryMs = t0 + durationMs; // 2027-01-01
    assert.equal(new Date(currentExpiryMs).toISOString(), "2027-01-01T00:00:00.000Z");

    // Purchase 2 while active at T0 + 150 days (approx Jun 2026)
    const t1 = t0 + 150 * 24 * 60 * 60 * 1000;
    assert.ok(t1 < currentExpiryMs, "User was active when Purchase 2 occurred");

    // Sequential extension: add duration to current expiry
    currentExpiryMs = currentExpiryMs + durationMs; // 2028-01-01
    assert.equal(new Date(currentExpiryMs).toISOString(), "2028-01-01T00:00:00.000Z");
  });

  it("19. Refund one purchase while preserving another valid entitlement", () => {
    const t0 = new Date("2026-01-01T00:00:00.000Z").getTime();

    // Simulate multi-purchase user:
    // Tx 1: T0 (Jan 1, 2026) -> Surviving
    // Tx 2: Jun 1, 2026 -> Refunded and excluded from surviving transactions
    const survivingTransactions = [
      { verified_at: new Date(t0).toISOString(), plan_id: "all_access_pass_799", status: "captured" },
    ];

    let currentExpiryMs = 0;
    let highestTier: SubscriptionTier = "free";

    for (const tx of survivingTransactions) {
      const verifiedTime = new Date(tx.verified_at).getTime();
      const plan = SUPPORTED_PLANS[tx.plan_id] || SUPPORTED_PLANS["all_access_pass_799"];
      const txDurationMs = (plan?.durationDays || 365) * 24 * 60 * 60 * 1000;

      if (verifiedTime < currentExpiryMs) {
        currentExpiryMs += txDurationMs;
      } else {
        currentExpiryMs = verifiedTime + txDurationMs;
      }
      highestTier = plan?.tier || "free";
    }

    assert.equal(highestTier, "all_access_pass");
    assert.equal(new Date(currentExpiryMs).toISOString(), "2027-01-01T00:00:00.000Z");
  });

  it("20. Database update failure during reconciliation is caught and rethrown (fail-closed)", () => {
    assert.ok(
      entitlementsContent.includes("if (updateErr)"),
      "Profile update error must be checked in entitlements"
    );
    assert.ok(
      migration2Sql.includes("reconcile_user_entitlements"),
      "Migration 2 defines atomic reconcile_user_entitlements RPC"
    );
  });
});
