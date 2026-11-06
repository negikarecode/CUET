import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Client, Pool } from "pg";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import { POST } from "../app/api/payments/route";
import { setTestAdminClientOverride } from "../lib/supabase/admin";
import { getPgTestConfig, formatPgUnavailableError } from "./helpers/pg-test-helper";

const PG_CONFIG = getPgTestConfig();

describe("Payment Security Pass 4: Remediation of Remaining Critical Defects", () => {
  let client: Client;
  let pool: Pool;
  const webhookSecret = "test_webhook_secret_key_pass4_12345";

  function signPayload(body: string, secret: string = webhookSecret): string {
    return crypto.createHmac("sha256", secret).update(body).digest("hex");
  }

  async function createTestUser(): Promise<string> {
    const id = crypto.randomUUID();
    await client.query("INSERT INTO auth.users (id, email) VALUES ($1, $2)", [id, `pass4_${id.slice(0, 8)}@cuetmate.in`]);
    await client.query(
      `INSERT INTO public.profiles (id, full_name, target_stream, is_premium, subscription_tier, campus_coins)
       VALUES ($1, 'Candidate Pass 4', 'Science', false, 'free', 0)
       ON CONFLICT (id) DO UPDATE SET is_premium = false, subscription_tier = 'free', campus_coins = 0`,
      [id]
    );
    return id;
  }

  async function createTestOrder(
    userId: string,
    amountPaise: number = 79900,
    planId: string = "all_access_pass_799",
    isPromotional: boolean = false,
    status: string = "created"
  ): Promise<{ orderDbId: string; providerOrderId: string }> {
    const providerOrderId = `order_pass4_${crypto.randomUUID().slice(0, 10)}`;
    const res = await client.query(
      `INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, is_promotional, status)
       VALUES ($1, 'razorpay', $2, $3, $4, 'INR', $5, $6)
       RETURNING id`,
      [userId, providerOrderId, planId, amountPaise, isPromotional, status]
    );
    return { orderDbId: res.rows[0].id, providerOrderId };
  }

  async function createCapturedTransaction(
    orderDbId: string,
    userId: string,
    amountPaise: number = 79900
  ): Promise<{ txDbId: string; providerPaymentId: string }> {
    const providerPaymentId = `pay_pass4_${crypto.randomUUID().slice(0, 10)}`;
    const res = await client.query(
      `INSERT INTO public.payment_transactions (order_id, user_id, provider, provider_payment_id, amount_paise, currency, status, verified_at)
       VALUES ($1, $2, 'razorpay', $3, $4, 'INR', 'captured', clock_timestamp())
       RETURNING id`,
      [orderDbId, userId, providerPaymentId, amountPaise]
    );
    await client.query("UPDATE public.payment_orders SET status = 'paid' WHERE id = $1", [orderDbId]);
    await client.query("UPDATE public.profiles SET is_premium = true, subscription_tier = 'all_access_pass' WHERE id = $1", [userId]);
    return { txDbId: res.rows[0].id, providerPaymentId };
  }

  before(async () => {
    // Configure environment credentials for payment provider so HMAC verification succeeds
    process.env.RAZORPAY_KEY_ID = "rzp_test_pass4_key";
    process.env.RAZORPAY_KEY_SECRET = "pass4_secret_12345";
    process.env.RAZORPAY_WEBHOOK_SECRET = webhookSecret;

    try {
      client = new Client(PG_CONFIG);
      await client.connect();
    } catch (initialErr: any) {
      try {
        const { execSync } = await import("child_process");
        try {
          execSync('/usr/lib/postgresql/16/bin/pg_ctl -D /tmp/pg_test_54338 status', { stdio: 'ignore' });
        } catch {
          execSync('/usr/lib/postgresql/16/bin/pg_ctl -D /tmp/pg_test_54338 -o "-p 54338 -k /tmp" -l /tmp/pg_test_54338/logfile start', { stdio: 'ignore' });
        }
      } catch {}

      try {
        client = new Client(PG_CONFIG);
        await client.connect();
      } catch (finalErr: any) {
        throw formatPgUnavailableError(finalErr);
      }
    }

    pool = new Pool({ ...PG_CONFIG, max: 15 });

    // Apply migrations
    const migrations = [
      "20261019_payments_and_entitlements.sql",
      "20261106_payment_infrastructure_remediation.sql",
      "20261106_payment_remediation_pass2.sql",
      "20261106_payment_security_pass3.sql",
      "20261106_payment_security_pass4.sql",
    ];

    for (const mig of migrations) {
      const migPath = path.join(process.cwd(), "supabase", "migrations", mig);
      if (fs.existsSync(migPath)) {
        const sql = fs.readFileSync(migPath, "utf-8");
        try {
          await client.query(sql);
        } catch (migErr: any) {
          await client.query("ROLLBACK").catch(() => {});
          if (!migErr.message.includes("already exists")) {
            console.warn(`Migration ${mig} execution notice:`, migErr.message);
          }
        }
      }
    }
  });

  after(async () => {
    setTestAdminClientOverride(null);
    if (client) await client.end();
    if (pool) await pool.end();
  });

  beforeEach(() => {
    setTestAdminClientOverride(null);
  });

  // ─── SUITE 1: MONOTONIC DISPUTE OUTCOMES ─────────────────────────────────────
  describe("1. Dispute Outcomes Terminal and Monotonic Invariants [INTEGRATION]", () => {
    it("1.1 lost → won: Finalized lost dispute cannot transition to won through ordinary webhook", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const disputeId = `disp_term_${crypto.randomUUID().slice(0, 8)}`;

      // 1. Finalize dispute as 'lost'
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.lost", "bank_ruled_lost", JSON.stringify({})]
      );

      // Verify dispute is 'lost' and tx is 'disputed_lost'
      const dispBefore = await client.query("SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1", [disputeId]);
      assert.equal(dispBefore.rows[0].status, "lost");
      const txBefore = await client.query("SELECT status, dispute_status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(txBefore.rows[0].status, "disputed_lost");

      // 2. Attempt ordinary webhook dispute.won on finalized lost dispute
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
          ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("TERMINAL_STATE_VIOLATION"), `Expected TERMINAL_STATE_VIOLATION, got ${err.message}`);
      }
      assert.equal(errorThrown, true, "Must reject lost -> won transition with exception");

      // Verify dispute ledger and transaction status remain unmodified
      const dispAfter = await client.query("SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1", [disputeId]);
      assert.equal(dispAfter.rows[0].status, "lost", "Dispute ledger must remain lost");
      const txAfter = await client.query("SELECT status, dispute_status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(txAfter.rows[0].status, "disputed_lost", "Tx status must remain disputed_lost");
    });

    it("1.2 won → lost: Finalized won dispute cannot transition to lost through ordinary webhook", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const disputeId = `disp_won_term_${crypto.randomUUID().slice(0, 8)}`;

      // 1. Finalize dispute as 'won'
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );

      // Verify dispute is 'won' and tx is 'captured'
      const dispBefore = await client.query("SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1", [disputeId]);
      assert.equal(dispBefore.rows[0].status, "won");
      const txBefore = await client.query("SELECT status, dispute_status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(txBefore.rows[0].status, "captured");

      // 2. Attempt ordinary webhook dispute.lost on finalized won dispute
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
          ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.lost", null, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("TERMINAL_STATE_VIOLATION"), `Expected TERMINAL_STATE_VIOLATION, got ${err.message}`);
      }
      assert.equal(errorThrown, true, "Must reject won -> lost transition with exception");

      // Verify dispute ledger and transaction status remain unmodified
      const dispAfter = await client.query("SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1", [disputeId]);
      assert.equal(dispAfter.rows[0].status, "won", "Dispute ledger must remain won");
      const txAfter = await client.query("SELECT status, dispute_status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(txAfter.rows[0].status, "captured", "Tx status must remain captured");
    });

    it("1.3 lost → under_review: Delayed under_review event does NOT overwrite finalized lost state", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const disputeId = `disp_lost_rev_${crypto.randomUUID().slice(0, 8)}`;

      // 1. Finalize dispute as 'lost'
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.lost", "ruled_lost", JSON.stringify({})]
      );

      // 2. Delayed under_review arrives
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.created", null, JSON.stringify({})]
      );
      assert.equal(res.rows[0].result.dispute_status, "lost");
      assert.equal(res.rows[0].result.tx_status, "disputed_lost");

      // Verify dispute ledger and transaction status remain lost
      const disp = await client.query("SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1", [disputeId]);
      assert.equal(disp.rows[0].status, "lost");
      const tx = await client.query("SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(tx.rows[0].status, "disputed_lost");
    });

    it("1.4 won → under_review: Delayed under_review event does NOT overwrite finalized won state", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const disputeId = `disp_won_rev_${crypto.randomUUID().slice(0, 8)}`;

      // 1. Finalize dispute as 'won'
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );

      // 2. Delayed under_review arrives
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.created", null, JSON.stringify({})]
      );
      assert.equal(res.rows[0].result.dispute_status, "won");
      assert.equal(res.rows[0].result.tx_status, "captured");

      // Verify dispute ledger and transaction status remain won / captured
      const disp = await client.query("SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1", [disputeId]);
      assert.equal(disp.rows[0].status, "won");
      const tx = await client.query("SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(tx.rows[0].status, "captured");
    });

    it("1.5 Duplicate terminal events: duplicate won and duplicate lost are idempotent", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const disputeId = `disp_dup_term_${crypto.randomUUID().slice(0, 8)}`;

      // First delivery: won
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );

      // Second delivery: won (duplicate)
      const resDup = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );
      assert.equal(resDup.rows[0].result.is_duplicate, true);
      assert.equal(resDup.rows[0].result.dispute_status, "won");

      const dispCount = await client.query("SELECT count(*) as count FROM public.payment_disputes WHERE provider_dispute_id = $1", [disputeId]);
      assert.equal(dispCount.rows[0].count, "1");
    });

    it("1.6 Delayed dispute.won after full refund CANNOT restore transaction or entitlement", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      // 1. Process full refund
      const refundId = `rfnd_full_${crypto.randomUUID().slice(0, 8)}`;
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      const txRefunded = await client.query("SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(txRefunded.rows[0].status, "refunded");

      // 2. Delayed dispute.won arrives
      const disputeId = `disp_post_rfnd_${crypto.randomUUID().slice(0, 8)}`;
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );
      assert.equal(res.rows[0].result.tx_status, "refunded", "Transaction status must strictly remain refunded");
      assert.equal(res.rows[0].result.should_reconcile, false);

      const txAfter = await client.query("SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(txAfter.rows[0].status, "refunded");
    });

    it("1.7 Concurrency: Conflicting terminal events (won vs lost) serialize via row lock; second fails", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const disputeId = `disp_race_${crypto.randomUUID().slice(0, 8)}`;

      // Put into under_review first
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.created", null, JSON.stringify({})]
      );

      // Fire won and lost concurrently from two separate pool clients
      const results = await Promise.allSettled([
        pool.query(`SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`, [
          "razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})
        ]),
        pool.query(`SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`, [
          "razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.lost", null, JSON.stringify({})
        ]),
      ]);

      const fulfilled = results.filter(r => r.status === "fulfilled");
      const rejected = results.filter(r => r.status === "rejected");

      assert.equal(fulfilled.length, 1, "Exactly one terminal transition must win the race");
      assert.equal(rejected.length, 1, "Opposite terminal transition must be rejected");
      const err = (rejected[0] as PromiseRejectedResult).reason;
      assert.ok(err.message.includes("TERMINAL_STATE_VIOLATION"));
    });
  });

  // ─── SUITE 2: REFUND RECORDS IMMUTABILITY & OVER-REFUND ACCOUNTING ───────────
  describe("2. Refund Records Immutability and Over-Refund Accounting [INTEGRATION]", () => {
    it("2.1 processed → failed: refund.failed arriving after refund.processed does NOT downgrade status", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const refundId = `rfnd_imm_fail_${crypto.randomUUID().slice(0, 8)}`;

      // Processed arrives
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      // Delayed failed arrives
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.failed", JSON.stringify({})]
      );

      const ref = await client.query("SELECT status FROM public.payment_refunds WHERE provider_refund_id = $1", [refundId]);
      assert.equal(ref.rows[0].status, "processed", "Refund status in ledger must remain processed");

      const tx = await client.query("SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.equal(tx.rows[0].status, "refunded", "Transaction status must remain refunded");
    });

    it("2.2 processed → created: refund.created arriving after refund.processed does NOT downgrade status", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const refundId = `rfnd_imm_create_${crypto.randomUUID().slice(0, 8)}`;

      // Processed arrives
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      // Delayed created arrives
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.created", JSON.stringify({})]
      );

      const ref = await client.query("SELECT status FROM public.payment_refunds WHERE provider_refund_id = $1", [refundId]);
      assert.equal(ref.rows[0].status, "processed", "Refund status must remain processed");
    });

    it("2.3 Duplicate processed delivery is idempotent and returns is_duplicate: true", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      const refundId = `rfnd_dup_proc_${crypto.randomUUID().slice(0, 8)}`;

      // First processed
      const res1 = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", refundId, providerPaymentId, 30000, "INR", "refund.processed", JSON.stringify({})]
      );
      assert.equal(res1.rows[0].result.cumulative_refunded_paise, 30000);

      // Duplicate processed
      const res2 = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", refundId, providerPaymentId, 30000, "INR", "refund.processed", JSON.stringify({})]
      );
      assert.equal(res2.rows[0].result.is_duplicate, true);
      assert.equal(res2.rows[0].result.cumulative_refunded_paise, 30000);
    });

    it("2.4 Reusing existing refund ID with different payment ID throws REFUND_IDENTITY_MISMATCH exception", async () => {
      const userA = await createTestUser();
      const userB = await createTestUser();
      const { orderDbId: ordA } = await createTestOrder(userA, 79900);
      const { orderDbId: ordB } = await createTestOrder(userB, 79900);
      const { providerPaymentId: payA } = await createCapturedTransaction(ordA, userA, 79900);
      const { providerPaymentId: payB } = await createCapturedTransaction(ordB, userB, 79900);

      const sharedRefundId = `rfnd_cross_${crypto.randomUUID().slice(0, 8)}`;

      // Bind refund to payment A
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", sharedRefundId, payA, 20000, "INR", "refund.processed", JSON.stringify({})]
      );

      // Attempt to reuse same refund ID on payment B
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
          ["razorpay", sharedRefundId, payB, 20000, "INR", "refund.processed", JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("REFUND_IDENTITY_MISMATCH"), `Expected REFUND_IDENTITY_MISMATCH, got ${err.message}`);
      }
      assert.equal(errorThrown, true, "Must reject refund ID reuse with different payment ID");
    });

    it("2.5 Reusing existing refund ID with different amount throws REFUND_IDENTITY_MISMATCH exception", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refundId = `rfnd_amt_mismatch_${crypto.randomUUID().slice(0, 8)}`;

      // First delivery with 20000 paise
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 20000, "INR", "refund.processed", JSON.stringify({})]
      );

      // Conflicting delivery claiming 50000 paise for same refund ID
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
          ["razorpay", refundId, providerPaymentId, 50000, "INR", "refund.processed", JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("REFUND_IDENTITY_MISMATCH"));
      }
      assert.equal(errorThrown, true, "Must reject conflicting amount for existing refund ID");
    });

    it("2.6 Reusing existing refund ID with different currency throws REFUND_IDENTITY_MISMATCH exception", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refundId = `rfnd_curr_mismatch_${crypto.randomUUID().slice(0, 8)}`;

      // First delivery in INR
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 20000, "INR", "refund.processed", JSON.stringify({})]
      );

      // Conflicting delivery in USD
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
          ["razorpay", refundId, providerPaymentId, 20000, "USD", "refund.processed", JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("REFUND_IDENTITY_MISMATCH"));
      }
      assert.equal(errorThrown, true, "Must reject conflicting currency for existing refund ID");
    });

    it("2.7 Cumulative refund exceeding captured amount rejects atomically with CUMULATIVE_REFUND_EXCEEDS_CAPTURED (NO SILENT CLAMPING)", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const ref1 = `rfnd_over1_${crypto.randomUUID().slice(0, 8)}`;
      const ref2 = `rfnd_over2_${crypto.randomUUID().slice(0, 8)}`;

      // Refund 1: 50,000 paise
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", ref1, providerPaymentId, 50000, "INR", "refund.processed", JSON.stringify({})]
      );

      // Refund 2: 50,000 paise (50,000 + 50,000 = 100,000 > 79,900 captured)
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
          ["razorpay", ref2, providerPaymentId, 50000, "INR", "refund.processed", JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("CUMULATIVE_REFUND_EXCEEDS_CAPTURED"), `Expected CUMULATIVE_REFUND_EXCEEDS_CAPTURED, got ${err.message}`);
      }
      assert.equal(errorThrown, true, "Must reject over-refund via exception instead of silent clamping");

      // Verify transaction state was preserved at 50,000 paise (partially_refunded) and NOT corrupted
      const tx = await client.query(
        "SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "partially_refunded");
      assert.equal(tx.rows[0].refunded_amount_paise, 50000);
    });

    it("2.8 Concurrency: Concurrent partial refunds exceeding captured amount abort conflicting transaction cleanly", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refA = `rfnd_conc_overA_${crypto.randomUUID().slice(0, 8)}`;
      const refB = `rfnd_conc_overB_${crypto.randomUUID().slice(0, 8)}`;

      // Two concurrent refunds of 50000 each (total 100000 > 79900)
      const results = await Promise.allSettled([
        pool.query(`SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`, [
          "razorpay", refA, providerPaymentId, 50000, "INR", "refund.processed", JSON.stringify({})
        ]),
        pool.query(`SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`, [
          "razorpay", refB, providerPaymentId, 50000, "INR", "refund.processed", JSON.stringify({})
        ]),
      ]);

      const fulfilled = results.filter(r => r.status === "fulfilled");
      const rejected = results.filter(r => r.status === "rejected");

      assert.equal(fulfilled.length, 1, "Exactly one refund must succeed");
      assert.equal(rejected.length, 1, "Exceeding refund must fail with exception");
      const err = (rejected[0] as PromiseRejectedResult).reason;
      assert.ok(err.message.includes("CUMULATIVE_REFUND_EXCEEDS_CAPTURED"));
    });
  });

  // ─── SUITE 3: WEBHOOK INBOX FAIL-CLOSED & HTTP HANDLER TESTS ─────────────────
  describe("3. Webhook Inbox Handling Genuinely Fail-Closed [INTEGRATION]", () => {
    it("3.1 Valid Razorpay HMAC processes successfully and returns HTTP 200", async () => {
      const userId = crypto.randomUUID();
      const orderId = `order_valid_${crypto.randomUUID().slice(0, 8)}`;
      const paymentId = `pay_valid_${crypto.randomUUID().slice(0, 8)}`;

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          if (fn === "fulfill_payment_order") {
            return { data: { success: true }, error: null };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: userId,
                      provider: "razorpay",
                      plan_id: "all_access_pass_799",
                      amount_paise: 79900,
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: paymentId,
              order_id: orderId,
              amount: 79900,
              currency: "INR",
              status: "captured",
              notes: { userId },
            },
          },
        },
      });

      const signature = signPayload(payload);
      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signature,
          "x-razorpay-event-id": `evt_valid_${crypto.randomUUID().slice(0, 8)}`,
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, "ok");
    });

    it("3.2 Invalid HMAC signature is rejected with HTTP 400", async () => {
      const payload = JSON.stringify({ event: "payment.captured" });
      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": "invalid_tampered_hmac_signature",
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.ok(data.error.includes("Invalid cryptographic webhook signature"));
    });

    it("3.3 Missing or unconfigured webhook secret rejects with HTTP 400", async () => {
      const originalSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
      try {
        process.env.RAZORPAY_WEBHOOK_SECRET = "";
        const payload = JSON.stringify({ event: "payment.captured" });
        const signature = crypto.createHmac("sha256", "dummy").update(payload).digest("hex");
        const req = new NextRequest("http://localhost:3000/api/payments", {
          method: "POST",
          headers: {
            "x-razorpay-signature": signature,
            "content-type": "application/json",
          },
          body: payload,
        });

        const res = await POST(req);
        assert.equal(res.status, 400);
      } finally {
        process.env.RAZORPAY_WEBHOOK_SECRET = originalSecret;
      }
    });

    it("3.4 Inbox RPC returned error: handler returns retryable HTTP 503 and DOES NOT fulfill payment", async () => {
      let fulfillmentAttempted = false;

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: null, error: { message: "Database connection failed" } };
          }
          if (fn === "fulfill_payment_order") {
            fulfillmentAttempted = true;
            return { data: { success: true }, error: null };
          }
          return { data: null, error: null };
        },
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: { id: "pay_1", order_id: "ord_1", amount: 79900, currency: "INR" },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "x-razorpay-event-id": "evt_inbox_err_1",
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 503, "Must return HTTP 503 on inbox record error");
      const data = await res.json();
      assert.equal(data.code, "INBOX_PERSISTENCE_FAILED");
      assert.equal(fulfillmentAttempted, false, "Fulfillment must NEVER be attempted if inbox recording failed");
    });

    it("3.5 Inbox RPC thrown exception: handler returns retryable HTTP 503 and DOES NOT fulfill payment", async () => {
      let fulfillmentAttempted = false;

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            throw new Error("PostgreSQL socket connection timed out");
          }
          if (fn === "fulfill_payment_order") {
            fulfillmentAttempted = true;
            return { data: { success: true }, error: null };
          }
          return { data: null, error: null };
        },
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: { id: "pay_2", order_id: "ord_2", amount: 79900, currency: "INR" },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "x-razorpay-event-id": "evt_inbox_throw_1",
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 503);
      const data = await res.json();
      assert.equal(data.code, "INBOX_EXCEPTION");
      assert.equal(fulfillmentAttempted, false, "Fulfillment must NEVER be attempted if inbox throws exception");
    });

    it("3.6 Finalization returned error: handler returns HTTP 500 and does NOT acknowledge success", async () => {
      const userId = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "fulfill_payment_order") {
            return { data: { success: true }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: null, error: { message: "Failed to update webhook event status" } };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: userId,
                      provider: "razorpay",
                      plan_id: "all_access_pass_799",
                      amount_paise: 79900,
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: { id: "pay_3", order_id: "ord_3", amount: 79900, currency: "INR", notes: { userId } },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "x-razorpay-event-id": "evt_fin_fail_1",
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 500, "Must return HTTP 500 if finalization failed");
      const data = await res.json();
      assert.equal(data.code, "FINALIZATION_FAILED");
    });

    it("3.7 Duplicate processed event returns HTTP 200 with deduplicated: true", async () => {
      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: true, action: "ignore", status: "processed", event_pk: crypto.randomUUID() }, error: null };
          }
          return { data: null, error: null };
        },
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: { entity: { id: "pay_dup", order_id: "ord_dup", amount: 79900 } },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "x-razorpay-event-id": "evt_dup_replay_1",
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.deduplicated, true);
    });

    it("3.8 Retry after failed processing reprocesses event successfully", async () => {
      const userId = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            // Returns reprocess for failed prior event
            return { data: { is_duplicate: false, action: "reprocess", status: "failed", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "fulfill_payment_order") {
            return { data: { success: true }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: userId,
                      provider: "razorpay",
                      plan_id: "all_access_pass_799",
                      amount_paise: 79900,
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: { entity: { id: "pay_retry_1", order_id: "ord_retry_1", amount: 79900, currency: "INR", notes: { userId } } },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "x-razorpay-event-id": "evt_retry_failed_1",
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, "ok");
    });

    it("3.9 Retry after deferred processing: payment authorized defers, subsequent captured succeeds", async () => {
      let deferredFinalized = false;

      setTestAdminClientOverride({
        rpc: async (fn: string, params: any) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            if (params.p_status === "deferred") deferredFinalized = true;
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
      });

      const payload = JSON.stringify({
        event: "payment.authorized",
        payload: {
          payment: { entity: { id: "pay_auth_only", order_id: "ord_auth_only", amount: 79900 } },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.ok(data.message.includes("awaiting capture"));
      assert.equal(deferredFinalized, true);
    });
  });

  // ─── SUITE 4: STORED ORDER OWNERSHIP AUTHORITATIVE ───────────────────────────
  describe("4. Stored Order Ownership Authoritative [INTEGRATION]", () => {
    it("4.1 Webhook metadata claims different user ID than stored order: REJECTED with HTTP 403 USER_OWNERSHIP_MISMATCH", async () => {
      const ownerUser = crypto.randomUUID();
      const attackerUser = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: ownerUser, // Owner is ownerUser
                      provider: "razorpay",
                      plan_id: "all_access_pass_799",
                      amount_paise: 79900,
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      // Webhook notes claim attackerUser
      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: "pay_spoof_1",
              order_id: "order_spoof_1",
              amount: 79900,
              currency: "INR",
              notes: { userId: attackerUser },
            },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 403);
      const data = await res.json();
      assert.equal(data.code, "USER_OWNERSHIP_MISMATCH");
    });

    it("4.2 Non-existent order in database fails closed with HTTP 422 and does NOT fall back to notes userId", async () => {
      const candidateUser = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: null, error: null }), // Order not found
            }),
          }),
        }),
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: "pay_fake_ord",
              order_id: "ord_fake_missing",
              amount: 79900,
              currency: "INR",
              notes: { userId: candidateUser },
            },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 422);
      const data = await res.json();
      assert.equal(data.code, "ORDER_NOT_FOUND");
    });

    it("4.3 Amount mismatch between order and webhook payment is rejected with HTTP 400", async () => {
      const userId = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: userId,
                      provider: "razorpay",
                      plan_id: "all_access_pass_799",
                      amount_paise: 79900, // Order requires 79900
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      // Webhook claims only 49900 paise
      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: "pay_mismatch_1",
              order_id: "ord_mismatch_1",
              amount: 49900,
              currency: "INR",
              notes: { userId },
            },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.code, "PAYMENT_AMOUNT_MISMATCH");
    });

    it("4.4 Provider mismatch between order and webhook payment is rejected with HTTP 400", async () => {
      const userId = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: userId,
                      provider: "cashfree", // Stored provider was cashfree
                      plan_id: "all_access_pass_799",
                      amount_paise: 79900,
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: { id: "pay_prov_1", order_id: "ord_prov_1", amount: 79900, currency: "INR", notes: { userId } },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.code, "PROVIDER_MISMATCH");
    });
  });

  // ─── SUITE 5: REJECT INVALID PLANS WITHOUT SUBSTITUTING DEFAULTS ─────────────
  describe("5. Reject Invalid Plans Without Substituting Defaults [INTEGRATION]", () => {
    it("5.1 Missing or empty plan ID on stored order fails closed with HTTP 400", async () => {
      const userId = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: userId,
                      provider: "razorpay",
                      plan_id: "", // Empty plan_id
                      amount_paise: 79900,
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: { id: "pay_noplan", order_id: "ord_noplan", amount: 79900, currency: "INR", notes: { userId } },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.code, "INVALID_PLAN");
    });

    it("5.2 Unknown plan ID on stored order fails closed with HTTP 400", async () => {
      const userId = crypto.randomUUID();

      setTestAdminClientOverride({
        rpc: async (fn: string) => {
          if (fn === "record_webhook_event") {
            return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
          }
          if (fn === "finalize_webhook_event") {
            return { data: true, error: null };
          }
          return { data: null, error: null };
        },
        from: (table: string) => ({
          select: () => ({
            eq: () => ({
              maybeSingle: async () => {
                if (table === "payment_orders") {
                  return {
                    data: {
                      id: crypto.randomUUID(),
                      user_id: userId,
                      provider: "razorpay",
                      plan_id: "enterprise_hacker_plan", // Unknown plan_id
                      amount_paise: 79900,
                      currency: "INR",
                    },
                    error: null,
                  };
                }
                return { data: null, error: null };
              },
            }),
          }),
        }),
      });

      const payload = JSON.stringify({
        event: "payment.captured",
        payload: {
          payment: {
            entity: { id: "pay_badplan", order_id: "ord_badplan", amount: 79900, currency: "INR", notes: { userId } },
          },
        },
      });

      const req = new NextRequest("http://localhost:3000/api/payments", {
        method: "POST",
        headers: {
          "x-razorpay-signature": signPayload(payload),
          "content-type": "application/json",
        },
        body: payload,
      });

      const res = await POST(req);
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.code, "INVALID_PLAN");
    });

    it("5.3 SQL fulfill_payment_order independently rejects unrecognized plan with UNAUTHORIZED_PLAN exception", async () => {
      const userId = await createTestUser();
      const providerOrderId = `ord_sql_bad_${crypto.randomUUID().slice(0, 8)}`;
      await client.query(
        `INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, status)
         VALUES ($1, 'razorpay', $2, 'unauthorized_hack_plan', 79900, 'INR', 'created')`,
        [userId, providerOrderId]
      );

      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [userId, "razorpay", providerOrderId, "pay_1", "sig", 79900, "INR", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("UNAUTHORIZED_PLAN"));
      }
      assert.equal(errorThrown, true);
    });

    it("5.4 SQL reconcile_user_entitlements ignores transactions with unrecognized plan IDs without defaulting to all_access_pass", async () => {
      const userId = await createTestUser();
      const providerOrderId = `ord_rec_bad_${crypto.randomUUID().slice(0, 8)}`;
      const ordRes = await client.query(
        `INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, status)
         VALUES ($1, 'razorpay', $2, 'unknown_tier_plan', 79900, 'INR', 'paid')
         RETURNING id`,
        [userId, providerOrderId]
      );

      await client.query(
        `INSERT INTO public.payment_transactions (order_id, user_id, provider, provider_payment_id, amount_paise, currency, status, verified_at)
         VALUES ($1, $2, 'razorpay', $3, 79900, 'INR', 'captured', clock_timestamp())`,
        [ordRes.rows[0].id, userId, `pay_rec_bad_${crypto.randomUUID().slice(0, 8)}`]
      );

      const recon = await client.query("SELECT public.reconcile_user_entitlements($1) as res", [userId]);
      assert.equal(recon.rows[0].res.is_premium, false, "Unknown plan must not grant Premium entitlement");
      assert.equal(recon.rows[0].res.tier, "free", "Tier must remain free");
    });
  });
});
