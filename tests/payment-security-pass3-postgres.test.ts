import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Client, Pool } from "pg";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { RazorpayProvider } from "../lib/payments/provider";

const PG_CONFIG = {
  host: process.env.TEST_PG_HOST || "/tmp",
  port: Number(process.env.TEST_PG_PORT || process.env.PGPORT || 54338),
  user: process.env.TEST_PG_USER || process.env.USER || "aryan",
  database: process.env.TEST_PG_DATABASE || "postgres",
};

describe("Payment Security Pass 3: Real PostgreSQL Integration Suite", () => {
  let client: Client;
  let pool: Pool;
  const webhookSecret = "test_webhook_secret_key_12345";
  const razorpayProvider = new RazorpayProvider(
    "rzp_test_mock_key_id",
    "mock_key_secret_12345",
    webhookSecret
  );

  function signPayload(body: string, secret: string = webhookSecret): string {
    return crypto.createHmac("sha256", secret).update(body).digest("hex");
  }

  before(async () => {
    // 1. Ensure postgres server is reachable on PG_CONFIG
    try {
      client = new Client(PG_CONFIG);
      await client.connect();
    } catch {
      // Attempt to start local postgres if installed
      try {
        const { execSync } = await import("child_process");
        try {
          execSync('/usr/lib/postgresql/16/bin/pg_ctl -D /tmp/pg_test_54338 status', { stdio: 'ignore' });
        } catch {
          execSync('/usr/lib/postgresql/16/bin/pg_ctl -D /tmp/pg_test_54338 -o "-p 54338 -k /tmp" -l /tmp/pg_test_54338/logfile start', { stdio: 'ignore' });
        }
      } catch {}
      client = new Client(PG_CONFIG);
      await client.connect();
    }

    // 2. Initialize schemas, mock roles, tables, triggers, and RPCs idempotently
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      CREATE SCHEMA IF NOT EXISTS auth;
      
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
          CREATE ROLE anon;
        END IF;
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
          CREATE ROLE authenticated;
        END IF;
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN
          CREATE ROLE service_role;
        END IF;
      END
      $$;

      CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid AS $$
        SELECT null::uuid;
      $$ LANGUAGE sql STABLE;

      CREATE OR REPLACE FUNCTION auth.role() RETURNS text AS $$
        SELECT 'anon'::text;
      $$ LANGUAGE sql STABLE;

      CREATE TABLE IF NOT EXISTS auth.users (
        id UUID PRIMARY KEY,
        email TEXT
      );

      CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT NOT NULL DEFAULT 'Candidate',
        target_stream TEXT NOT NULL DEFAULT 'Commerce',
        target_university TEXT DEFAULT 'Delhi University',
        target_college TEXT DEFAULT 'SRCC',
        xp INTEGER NOT NULL DEFAULT 0,
        campus_coins INTEGER NOT NULL DEFAULT 0,
        is_premium BOOLEAN NOT NULL DEFAULT FALSE,
        subscription_tier TEXT DEFAULT 'free',
        subscription_expires_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$
      BEGIN
        INSERT INTO public.profiles (id, full_name, target_stream, is_premium, subscription_tier)
        VALUES (new.id, 'Candidate', 'Commerce', false, 'free')
        ON CONFLICT (id) DO NOTHING;
        RETURN new;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `);

    // Run core migrations in strict dependency order
    const migrationFiles = [
      "supabase/migrations/20261019_payments_and_entitlements.sql",
      "supabase/migrations/20261106_payment_infrastructure_remediation.sql",
      "supabase/migrations/20261106_payment_remediation_pass2.sql",
      "supabase/migrations/20261106_payment_security_pass3.sql",
    ];

    for (const file of migrationFiles) {
      const sqlPath = path.join(process.cwd(), file);
      if (fs.existsSync(sqlPath)) {
        const sql = fs.readFileSync(sqlPath, "utf-8");
        try {
          await client.query(sql);
        } catch (migErr: any) {
          if (!migErr.message?.includes("already exists")) {
            console.warn(`Migration ${file} notice:`, migErr.message);
          }
        }
      }
    }

    pool = new Pool({ ...PG_CONFIG, max: 25 });
  });

  after(async () => {
    if (client) await client.end();
    if (pool) await pool.end();
  });

  // Helper: create a candidate user profile via auth.users
  async function createTestUser(): Promise<string> {
    const userId = crypto.randomUUID();
    await client.query(
      `INSERT INTO auth.users (id, email)
       VALUES ($1, $2)`,
      [userId, `candidate_${userId.slice(0, 8)}@test.in`]
    );
    // Profile row was automatically generated by handle_new_user() trigger
    await client.query(
      `UPDATE public.profiles
       SET is_premium = false, subscription_tier = 'free', target_stream = 'Commerce', campus_coins = 0, xp = 0
       WHERE id = $1`,
      [userId]
    );
    return userId;
  }

  // Helper: create a payment order
  async function createTestOrder(
    userId: string,
    amountPaise: number = 79900,
    planId: string = "all_access_pass_799",
    isPromotional: boolean = false,
    status: string = "paid"
  ): Promise<{ orderDbId: string; providerOrderId: string; userId: string; amountPaise: number }> {
    const providerOrderId = `order_test_${crypto.randomUUID().slice(0, 12)}`;
    const effectiveAmount = isPromotional ? 200 : amountPaise;
    const res = await client.query(
      `INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, is_promotional, status)
       VALUES ($1, 'razorpay', $2, $3, $4, 'INR', $5, $6)
       RETURNING id`,
      [userId, providerOrderId, planId, effectiveAmount, isPromotional, status]
    );
    return { orderDbId: res.rows[0].id, providerOrderId, userId, amountPaise: effectiveAmount };
  }

  // Helper: create a captured transaction
  async function createCapturedTransaction(
    orderDbId: string,
    userId: string,
    amountPaise: number = 79900
  ): Promise<{ txDbId: string; providerPaymentId: string }> {
    const providerPaymentId = `pay_test_${crypto.randomUUID().slice(0, 14)}`;
    const res = await client.query(
      `INSERT INTO public.payment_transactions (
         order_id, user_id, provider, provider_payment_id, provider_signature,
         amount_paise, currency, status, refunded_amount_paise, verified_at
       )
       VALUES ($1, $2, 'razorpay', $3, 'sig_test_valid', $4, 'INR', 'captured', 0, NOW())
       RETURNING id`,
      [orderDbId, userId, providerPaymentId, amountPaise]
    );
    return { txDbId: res.rows[0].id, providerPaymentId };
  }

  // =========================================================================
  // 1. REFUND PROCESSING TESTS (CRITICAL AUDIT & IDEMPOTENCY)
  // =========================================================================
  describe("1. Refund Processing & Cumulative Ledger Verification [INTEGRATION]", () => {
    it("1.1 refund.created does NOT mark transaction refunded or alter entitlement", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      // Reconcile user to active premium first
      await client.query("SELECT public.reconcile_user_entitlements($1)", [userId]);
      const profBefore = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(profBefore.rows[0].is_premium, true, "User should be premium before refund");

      const refundId = `rfnd_pending_${crypto.randomUUID().slice(0, 8)}`;
      const res = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.created", JSON.stringify({ note: "init" })]
      );
      const r = res.rows[0].result;

      assert.equal(r.success, true);
      assert.equal(r.is_processed, false);
      assert.equal(r.should_reconcile, false);
      assert.equal(r.refund_status, "created");

      // Verify transaction remains captured
      const tx = await client.query(
        "SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "captured");
      assert.equal(tx.rows[0].refunded_amount_paise, 0);

      // Verify ledger recorded refund as created
      const refRec = await client.query(
        "SELECT status, amount_paise FROM public.payment_refunds WHERE provider_refund_id = $1",
        [refundId]
      );
      assert.equal(refRec.rows[0].status, "created");
      assert.equal(refRec.rows[0].amount_paise, 79900);

      // Verify user entitlement is NOT altered
      const profAfter = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(profAfter.rows[0].is_premium, true, "Entitlement must NOT be revoked on refund.created");
    });

    it("1.2 Duplicate refund webhook delivery does NOT increase cumulative refund amount twice", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refundId = `rfnd_dup_${crypto.randomUUID().slice(0, 8)}`;

      // Delivery 1: refund.processed for 30000 paise (partial)
      const res1 = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", refundId, providerPaymentId, 30000, "INR", "refund.processed", JSON.stringify({})]
      );
      assert.equal(res1.rows[0].result.cumulative_refunded_paise, 30000);

      // Delivery 2: Exact duplicate delivery of the same refund.processed event
      const res2 = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", refundId, providerPaymentId, 30000, "INR", "refund.processed", JSON.stringify({})]
      );
      assert.equal(
        res2.rows[0].result.cumulative_refunded_paise,
        30000,
        "Duplicate delivery must NOT increase cumulative refund total to 60000"
      );

      // Invariant: payment_refunds ledger has exactly 1 entry for this provider_refund_id
      const refCount = await client.query(
        "SELECT count(*) as count FROM public.payment_refunds WHERE provider_refund_id = $1",
        [refundId]
      );
      assert.equal(refCount.rows[0].count, "1");

      const tx = await client.query(
        "SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "partially_refunded");
      assert.equal(tx.rows[0].refunded_amount_paise, 30000);
    });

    it("1.3 Multiple partial refunds accumulate correctly and full refund revokes entitlement", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);
      await client.query("SELECT public.reconcile_user_entitlements($1)", [userId]);

      const ref1 = `rfnd_pt1_${crypto.randomUUID().slice(0, 8)}`;
      const ref2 = `rfnd_pt2_${crypto.randomUUID().slice(0, 8)}`;
      const ref3 = `rfnd_pt3_${crypto.randomUUID().slice(0, 8)}`;

      // Step 1: Refund 20000 paise
      const r1 = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", ref1, providerPaymentId, 20000, "INR", "refund.processed", JSON.stringify({})]
      );
      assert.equal(r1.rows[0].result.cumulative_refunded_paise, 20000);
      assert.equal(r1.rows[0].result.is_full_refund, false);

      // Step 2: Refund 30000 paise (total 50000)
      const r2 = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", ref2, providerPaymentId, 30000, "INR", "refund.processed", JSON.stringify({})]
      );
      assert.equal(r2.rows[0].result.cumulative_refunded_paise, 50000);
      assert.equal(r2.rows[0].result.is_full_refund, false);

      // Partial refund: user should still be premium
      await client.query("SELECT public.reconcile_user_entitlements($1)", [userId]);
      const profMid = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(profMid.rows[0].is_premium, true, "Partial refund retains access");

      // Step 3: Complete remaining refund 29900 paise (total 79900)
      const r3 = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", ref3, providerPaymentId, 29900, "INR", "refund.processed", JSON.stringify({})]
      );
      assert.equal(r3.rows[0].result.cumulative_refunded_paise, 79900);
      assert.equal(r3.rows[0].result.is_full_refund, true);

      // Verify transaction is refunded
      const tx = await client.query(
        "SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "refunded");
      assert.equal(tx.rows[0].refunded_amount_paise, 79900);

      // Verify parent order is refunded
      const ord = await client.query("SELECT status FROM public.payment_orders WHERE id = $1", [orderDbId]);
      assert.equal(ord.rows[0].status, "refunded");

      // Reconcile and verify premium is revoked
      await client.query("SELECT public.reconcile_user_entitlements($1)", [userId]);
      const profFinal = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(profFinal.rows[0].is_premium, false, "Full refund must revoke premium access");
    });

    it("1.4 Out-of-order delivery: refund.created arriving AFTER refund.processed cannot downgrade status", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refundId = `rfnd_ooo_${crypto.randomUUID().slice(0, 8)}`;

      // Arrives first: refund.processed
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      // Arrives delayed: refund.created for the same refund ID
      const res = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.created", JSON.stringify({})]
      );
      assert.equal(res.rows[0].result.refund_status, "processed");

      // Verify ledger entry status was not downgraded
      const ref = await client.query(
        "SELECT status FROM public.payment_refunds WHERE provider_refund_id = $1",
        [refundId]
      );
      assert.equal(ref.rows[0].status, "processed", "Must not downgrade processed refund to created");

      const tx = await client.query(
        "SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "refunded", "Transaction status must remain refunded");
    });

    it("1.5 Out-of-order delivery: refund.failed arriving AFTER refund.processed cannot downgrade status", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refundId = `rfnd_failed_ooo_${crypto.randomUUID().slice(0, 8)}`;

      // Step 1: refund.processed arrives
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      // Step 2: Delayed refund.failed arrives for same refund ID
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.failed", JSON.stringify({})]
      );

      const tx = await client.query(
        "SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "refunded");
      assert.equal(tx.rows[0].refunded_amount_paise, 79900);
    });

    it("1.6 Cumulative refund amount is strictly capped at captured amount", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refund1 = `rfnd_cap1_${crypto.randomUUID().slice(0, 8)}`;
      const refund2 = `rfnd_cap2_${crypto.randomUUID().slice(0, 8)}`;

      // Refund 1: 50,000 paise
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refund1, providerPaymentId, 50000, "INR", "refund.processed", JSON.stringify({})]
      );

      // Refund 2: 60,000 paise (50,000 + 60,000 = 110,000 > 79,900)
      const res = await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", refund2, providerPaymentId, 60000, "INR", "refund.processed", JSON.stringify({})]
      );

      assert.equal(res.rows[0].result.cumulative_refunded_paise, 79900, "Cumulative refund must clamp to 79900");
      assert.equal(res.rows[0].result.is_full_refund, true);

      const tx = await client.query(
        "SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "refunded");
      assert.equal(tx.rows[0].refunded_amount_paise, 79900);
    });

    it("1.7 Concurrency: 5 concurrent partial refunds on same transaction aggregate without lost updates", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 100000);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 100000);

      // 5 concurrent partial refunds of 15000 each (total 75000)
      const refundIds = Array.from({ length: 5 }, (_, i) => `rfnd_conc_${i}_${crypto.randomUUID().slice(0, 6)}`);

      await Promise.all(
        refundIds.map(rid =>
          pool.query(
            `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7) AS result`,
            ["razorpay", rid, providerPaymentId, 15000, "INR", "refund.processed", JSON.stringify({})]
          )
        )
      );

      // Verify authoritative ledger has exactly 5 entries
      const countRes = await client.query(
        "SELECT count(*) as count, sum(amount_paise) as sum FROM public.payment_refunds WHERE payment_id = $1 AND status = 'processed'",
        [providerPaymentId]
      );
      assert.equal(countRes.rows[0].count, "5");
      assert.equal(countRes.rows[0].sum, "75000");

      const tx = await client.query(
        "SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "partially_refunded");
      assert.equal(tx.rows[0].refunded_amount_paise, 75000);
    });
  });

  // =========================================================================
  // 2. DISPUTE STATE MACHINE TESTS (CRITICAL INVARIANTS)
  // =========================================================================
  describe("2. Dispute State Machine & Monotonic Invariants [INTEGRATION]", () => {
    it("2.1 Dispute created marks transaction 'disputed' WITHOUT counting as refund or releasing inventory", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const disputeId = `disp_cr_${crypto.randomUUID().slice(0, 8)}`;
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.created", "fraudulent", JSON.stringify({})]
      );
      const r = res.rows[0].result;

      assert.equal(r.success, true);
      assert.equal(r.dispute_status, "under_review");
      assert.equal(r.tx_status, "disputed");
      assert.equal(r.should_reconcile, false, "Dispute created must not trigger premature entitlement revocation");

      const tx = await client.query(
        "SELECT status, dispute_status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "disputed");
      assert.equal(tx.rows[0].dispute_status, "under_review");
      assert.equal(tx.rows[0].refunded_amount_paise, 0, "Dispute created must NOT increase refunded amount");
    });

    it("2.2 Dispute won restores transaction to 'captured' and confirms Premium", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const disputeId = `disp_won_${crypto.randomUUID().slice(0, 8)}`;

      // First mark disputed
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.created", "disputed", JSON.stringify({})]
      );

      // Now dispute won
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );
      const r = res.rows[0].result;

      assert.equal(r.dispute_status, "won");
      assert.equal(r.tx_status, "captured");
      assert.equal(r.should_reconcile, true);

      const tx = await client.query(
        "SELECT status, dispute_status FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "captured");
      assert.equal(tx.rows[0].dispute_status, "won");

      // Entitlement confirmation
      const recon = await client.query("SELECT public.reconcile_user_entitlements($1) as rec", [userId]);
      assert.equal(recon.rows[0].rec.is_premium, true);
    });

    it("2.3 CRITICAL: Dispute won strictly CANNOT restore an already refunded transaction", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      // 1. Transaction is fully refunded
      const refundId = `rfnd_prior_${crypto.randomUUID().slice(0, 8)}`;
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, providerPaymentId, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      const txBefore = await client.query(
        "SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(txBefore.rows[0].status, "refunded", "Transaction must be refunded");

      // 2. External dispute event arrives claiming dispute won
      const disputeId = `disp_after_refund_${crypto.randomUUID().slice(0, 8)}`;
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );
      const r = res.rows[0].result;

      assert.equal(r.tx_status, "refunded", "Tx status MUST remain refunded");
      assert.equal(r.should_reconcile, false, "Must not trigger entitlement restoration");
      assert.ok(r.notice.includes("previously fully refunded"), "Must return refunded protection notice");

      // Invariant: Transaction strictly remains refunded
      const txAfter = await client.query(
        "SELECT status, dispute_status FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(txAfter.rows[0].status, "refunded");
      assert.equal(txAfter.rows[0].dispute_status, "won");

      // Invariant: Profile strictly remains non-premium
      await client.query("SELECT public.reconcile_user_entitlements($1)", [userId]);
      const prof = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(prof.rows[0].is_premium, false, "User must NOT regain Premium on refunded transaction");
    });

    it("2.4 Dispute lost updates status to 'disputed_lost', releases promotional slot, and revokes entitlement", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 200, "all_access_pass_799", true);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 200);

      // Reserve slot 99 for this promotional order
      await client.query(
        `UPDATE public.promotional_slots
         SET order_id = $1, user_id = $2, status = 'claimed', claimed_at = NOW()
         WHERE slot_number = 99`,
        [orderDbId, userId]
      );

      // Reconcile user as premium first
      await client.query("SELECT public.reconcile_user_entitlements($1)", [userId]);
      const profBefore = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(profBefore.rows[0].is_premium, true);

      // Dispute lost
      const disputeId = `disp_lost_${crypto.randomUUID().slice(0, 8)}`;
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 200, "INR", "payment.dispute.lost", "bank_ruled_lost", JSON.stringify({})]
      );
      const r = res.rows[0].result;

      assert.equal(r.dispute_status, "lost");
      assert.equal(r.tx_status, "disputed_lost");
      assert.equal(r.should_reconcile, true);

      // Verify transaction status is disputed_lost (NOT refunded)
      const tx = await client.query(
        "SELECT status, dispute_status, refunded_amount_paise FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "disputed_lost");
      assert.equal(tx.rows[0].dispute_status, "lost");
      assert.equal(tx.rows[0].refunded_amount_paise, 0, "Dispute lost is not a refund");

      // Verify promotional slot was released back into pool
      const slot = await client.query("SELECT status, user_id, order_id FROM public.promotional_slots WHERE slot_number = 99");
      assert.equal(slot.rows[0].status, "released");
      assert.equal(slot.rows[0].user_id, null);
      assert.equal(slot.rows[0].order_id, null);

      // Verify entitlement revocation
      await client.query("SELECT public.reconcile_user_entitlements($1)", [userId]);
      const profAfter = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(profAfter.rows[0].is_premium, false, "Dispute lost revokes Premium");
    });

    it("2.5 Delayed under_review event CANNOT overwrite finalized 'won' or 'lost' dispute state", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const disputeId = `disp_monotonic_${crypto.randomUUID().slice(0, 8)}`;

      // Finalize dispute as 'won'
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );

      // Now a delayed 'payment.dispute.created' event arrives
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.created", null, JSON.stringify({})]
      );

      // Monotonic guard ensures status stays 'won'
      assert.equal(res.rows[0].result.dispute_status, "won");

      const disputeRecord = await client.query(
        "SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1",
        [disputeId]
      );
      assert.equal(disputeRecord.rows[0].status, "won", "Delayed event must not overwrite finalized dispute state");
    });

    it("2.6 Duplicate dispute events are idempotent", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const disputeId = `disp_dup_${crypto.randomUUID().slice(0, 8)}`;

      // Delivery 1
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );

      // Delivery 2 (Duplicate)
      const res2 = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})]
      );
      assert.equal(res2.rows[0].result.dispute_status, "won");

      const count = await client.query(
        "SELECT count(*) as count FROM public.payment_disputes WHERE provider_dispute_id = $1",
        [disputeId]
      );
      assert.equal(count.rows[0].count, "1");
    });

    it("2.7 Out-of-order dispute: dispute.lost followed by dispute.created maintains disputed_lost status", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const disputeId = `disp_ooo_lost_${crypto.randomUUID().slice(0, 8)}`;

      // Step 1: dispute.lost arrives first
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.lost", "chargeback_closed", JSON.stringify({})]
      );

      // Step 2: dispute.created arrives delayed
      const res = await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) AS result`,
        ["razorpay", disputeId, providerPaymentId, 79900, "INR", "payment.dispute.created", "chargeback_opened", JSON.stringify({})]
      );
      assert.equal(res.rows[0].result.dispute_status, "lost");

      const tx = await client.query(
        "SELECT status, dispute_status FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rows[0].status, "disputed_lost");
      assert.equal(tx.rows[0].dispute_status, "lost");
    });

    it("2.8 Concurrency: Concurrent dispute events on distinct connections serialize via row lock without deadlock", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const disp1 = `disp_conc_a_${crypto.randomUUID().slice(0, 6)}`;
      const disp2 = `disp_conc_b_${crypto.randomUUID().slice(0, 6)}`;

      // Launch 2 simultaneous dispute updates on distinct pool connections
      const results = await Promise.all([
        pool.query(`SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) as res`, [
          "razorpay", disp1, providerPaymentId, 79900, "INR", "payment.dispute.created", "dispute_a", JSON.stringify({})
        ]),
        pool.query(`SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8) as res`, [
          "razorpay", disp2, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})
        ]),
      ]);

      assert.equal(results.length, 2);
      assert.ok(results[0].rows[0].res.success);
      assert.ok(results[1].rows[0].res.success);
    });
  });

  // =========================================================================
  // 3. WEBHOOK INBOX & DEDUPLICATION TESTS
  // =========================================================================
  describe("3. Webhook Inbox & Event Deduplication [INTEGRATION]", () => {
    it("3.1 First delivery records event and returns action: 'process'", async () => {
      const eventId = `evt_first_${crypto.randomUUID().slice(0, 10)}`;
      const res = await client.query(
        `SELECT public.record_webhook_event($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", eventId, "payment.captured", "pay_001", "order_001", "sig_xyz", JSON.stringify({ test: 1 })]
      );
      const r = res.rows[0].result;

      assert.equal(r.is_duplicate, false);
      assert.equal(r.action, "process");
      assert.ok(r.event_pk);

      // Finalize as processed
      await client.query("SELECT public.finalize_webhook_event($1, 'processed')", [r.event_pk]);
    });

    it("3.2 Replay of processed webhook returns is_duplicate: true and action: 'ignore'", async () => {
      const eventId = `evt_replay_${crypto.randomUUID().slice(0, 10)}`;

      // Delivery 1
      const res1 = await client.query(
        `SELECT public.record_webhook_event($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", eventId, "payment.captured", "pay_002", "order_002", "sig_xyz", JSON.stringify({})]
      );
      await client.query("SELECT public.finalize_webhook_event($1, 'processed')", [res1.rows[0].result.event_pk]);

      // Delivery 2 (Duplicate replay)
      const res2 = await client.query(
        `SELECT public.record_webhook_event($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", eventId, "payment.captured", "pay_002", "order_002", "sig_xyz", JSON.stringify({})]
      );
      const r2 = res2.rows[0].result;

      assert.equal(r2.is_duplicate, true);
      assert.equal(r2.action, "ignore");
      assert.equal(r2.status, "processed");
    });

    it("3.3 Failed webhook event allows reprocessing (action: 'reprocess')", async () => {
      const eventId = `evt_failed_${crypto.randomUUID().slice(0, 10)}`;

      // Delivery 1 fails
      const res1 = await client.query(
        `SELECT public.record_webhook_event($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", eventId, "payment.captured", "pay_003", "order_003", "sig_xyz", JSON.stringify({})]
      );
      await client.query("SELECT public.finalize_webhook_event($1, 'failed', 'Temporary gateway error')", [res1.rows[0].result.event_pk]);

      // Delivery 2 (Retry of failed event)
      const res2 = await client.query(
        `SELECT public.record_webhook_event($1, $2, $3, $4, $5, $6, $7) AS result`,
        ["razorpay", eventId, "payment.captured", "pay_003", "order_003", "sig_xyz", JSON.stringify({})]
      );
      const r2 = res2.rows[0].result;

      assert.equal(r2.is_duplicate, false);
      assert.equal(r2.action, "reprocess");
      assert.equal(r2.status, "failed");
    });

    it("3.4 Webhook HMAC-SHA256 signature verification with authentic and tampered Razorpay payloads", () => {
      const rawPayload = JSON.stringify({
        entity: "event",
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: "pay_verified_12345",
              order_id: "order_verified_12345",
              amount: 79900,
              currency: "INR",
              status: "captured",
            },
          },
        },
      });

      // Valid signature
      const validSig = signPayload(rawPayload, webhookSecret);
      const resultValid = razorpayProvider.verifyWebhook(rawPayload, validSig);
      assert.equal(resultValid.isValid, true);
      assert.equal(resultValid.paymentId, "pay_verified_12345");
      assert.equal(resultValid.orderId, "order_verified_12345");

      // Tampered payload
      const tamperedPayload = rawPayload.replace("79900", "10000");
      const resultTampered = razorpayProvider.verifyWebhook(tamperedPayload, validSig);
      assert.equal(resultTampered.isValid, false, "Tampered payload must fail cryptographic verification");

      // Wrong secret
      const wrongSig = signPayload(rawPayload, "wrong_secret_key");
      const resultWrong = razorpayProvider.verifyWebhook(rawPayload, wrongSig);
      assert.equal(resultWrong.isValid, false, "Wrong secret must fail cryptographic verification");
    });
  });

  // =========================================================================
  // 4. REAL CONCURRENCY & ROW LOCKING TESTS
  // =========================================================================
  describe("4. Database Concurrency & SKIP LOCKED Row Locking [INTEGRATION]", () => {
    it("4.1 5 concurrent connections competing for 2 slots allocate exactly 2 slots with 0 duplicates", async () => {
      // Clean up test slots: mark slot 1 and 2 as released, all others claimed for isolation
      await client.query("UPDATE public.promotional_slots SET status = 'claimed' WHERE slot_number NOT IN (1, 2)");
      await client.query("UPDATE public.promotional_slots SET status = 'released', order_id = null, user_id = null WHERE slot_number IN (1, 2)");

      // Prepare 5 candidate users and orders sequentially with status 'created'
      const orders = [];
      for (let i = 0; i < 5; i++) {
        const uid = await createTestUser();
        const ord = await createTestOrder(uid, 200, "all_access_pass_799", true, "created");
        orders.push(ord);
      }

      // Launch 5 simultaneous reservations across distinct pool connections
      const results = await Promise.all(
        orders.map(ord =>
          pool.query("SELECT public.reserve_promotional_slot($1, $2) as slot", [ord.userId, ord.orderDbId])
            .then(res => res.rows[0].slot)
            .catch(() => null)
        )
      );

      const successfulReservations = results.filter(slot => slot !== null && typeof slot === "number");
      const failedReservations = results.filter(slot => slot === null);

      assert.equal(successfulReservations.length, 2, "Exactly 2 slots must be successfully reserved");
      assert.equal(failedReservations.length, 3, "Exactly 3 reservations must fail cleanly due to inventory exhaustion");

      // Verify no duplicate slot allocations
      const uniqueSlots = new Set(successfulReservations);
      assert.equal(uniqueSlots.size, 2, "Each allocated slot number must be distinct (zero race collision)");
    });

    it("4.2 fulfill_payment_order rolls back atomically on slot exhaustion", async () => {
      // Ensure zero slots available
      await client.query("UPDATE public.promotional_slots SET status = 'claimed'");

      const userId = await createTestUser();
      const providerOrderId = `ord_promo_exhausted_${crypto.randomUUID().slice(0, 8)}`;
      const providerPaymentId = `pay_promo_exhausted_${crypto.randomUUID().slice(0, 8)}`;

      // Insert promotional order with required 200 paise
      const ordRes = await client.query(
        `INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, is_promotional, status)
         VALUES ($1, 'razorpay', $2, 'all_access_pass_799', 200, 'INR', true, 'created')
         RETURNING id`,
        [userId, providerOrderId]
      );
      assert.ok(ordRes.rows[0].id);

      // Attempt fulfillment of promotional order without available slots -> MUST ROLLBACK
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            userId,
            "razorpay",
            providerOrderId,
            providerPaymentId,
            "sig_promo_test",
            200,
            "INR",
            "all_access_pass",
            new Date(Date.now() + 365 * 86400000).toISOString(),
            500,
            JSON.stringify({})
          ]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("PROMOTIONAL_INVENTORY_EXHAUSTED"), "Should throw slot exhaustion exception");
      }
      assert.equal(errorThrown, true, "Must throw error and abort transaction");

      // Verify ATOMIC ROLLBACK: No captured transaction was recorded
      const tx = await client.query(
        "SELECT * FROM public.payment_transactions WHERE provider_payment_id = $1",
        [providerPaymentId]
      );
      assert.equal(tx.rowCount, 0, "Transaction insertion must be rolled back");

      // Verify profile is NOT premium
      const prof = await client.query("SELECT is_premium FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(prof.rows[0].is_premium, false, "Profile upgrade must be rolled back");
    });

    it("4.3 100 concurrent reservation attempts against 10 available slots", async () => {
      // Set exactly slots 1..10 to released, all others to claimed
      await client.query("UPDATE public.promotional_slots SET status = 'claimed'");
      await client.query("UPDATE public.promotional_slots SET status = 'released', order_id = null, user_id = null WHERE slot_number BETWEEN 1 AND 10");

      // Create 100 candidate users and orders sequentially
      const candidates = [];
      for (let i = 0; i < 100; i++) {
        const uid = await createTestUser();
        const ord = await createTestOrder(uid, 200, "all_access_pass_799", true, "created");
        candidates.push({ uid, ordId: ord.orderDbId });
      }

      // Fire 100 concurrent reservation attempts across pool connections
      const reservationResults = await Promise.all(
        candidates.map(c =>
          pool.query("SELECT public.reserve_promotional_slot($1, $2) as slot", [c.uid, c.ordId])
            .then(res => res.rows[0].slot)
            .catch(() => null)
        )
      );

      const successful = reservationResults.filter(s => s !== null && typeof s === "number");
      const failed = reservationResults.filter(s => s === null);

      assert.equal(successful.length, 10, "Exactly 10 reservations must succeed for 10 slots");
      assert.equal(failed.length, 90, "Exactly 90 reservations must fail cleanly due to exhaustion");

      const uniqueAllocated = new Set(successful);
      assert.equal(uniqueAllocated.size, 10, "All 10 allocated slots must be distinct");
    });

    it("4.4 Expired reservations (< clock_timestamp()) are safely reclaimed by incoming orders", async () => {
      // Slot 15 is reserved but expired 10 minutes ago
      await client.query("UPDATE public.promotional_slots SET status = 'claimed'");
      await client.query(`
        UPDATE public.promotional_slots
        SET status = 'reserved',
            expires_at = clock_timestamp() - interval '10 minutes',
            order_id = null,
            user_id = null
        WHERE slot_number = 15
      `);

      const userId = await createTestUser();
      const order = await createTestOrder(userId, 200, "all_access_pass_799", true, "created");

      const res = await client.query(
        "SELECT public.reserve_promotional_slot($1, $2) as slot",
        [userId, order.orderDbId]
      );
      assert.equal(res.rows[0].slot, 15, "Expired slot 15 must be safely reclaimed");

      const slotState = await client.query("SELECT status, user_id FROM public.promotional_slots WHERE slot_number = 15");
      assert.equal(slotState.rows[0].status, "reserved");
      assert.equal(slotState.rows[0].user_id, userId);
    });

    it("4.5 Abandoned checkout: reservation expires, second order claims the slot cleanly", async () => {
      // Clean slate: all claimed except slot 20
      await client.query("UPDATE public.promotional_slots SET status = 'claimed'");
      await client.query("UPDATE public.promotional_slots SET status = 'released', order_id = null, user_id = null WHERE slot_number = 20");

      // User 1 reserves slot 20
      const user1 = await createTestUser();
      const order1 = await createTestOrder(user1, 200, "all_access_pass_799", true, "created");
      const res1 = await client.query("SELECT public.reserve_promotional_slot($1, $2) as slot", [user1, order1.orderDbId]);
      assert.equal(res1.rows[0].slot, 20);

      // User 1 abandons checkout -> simulate expiry
      await client.query(
        "UPDATE public.promotional_slots SET expires_at = clock_timestamp() - interval '1 minute' WHERE slot_number = 20"
      );

      // User 2 arrives and reserves
      const user2 = await createTestUser();
      const order2 = await createTestOrder(user2, 200, "all_access_pass_799", true, "created");
      const res2 = await client.query("SELECT public.reserve_promotional_slot($1, $2) as slot", [user2, order2.orderDbId]);
      assert.equal(res2.rows[0].slot, 20, "User 2 must claim slot 20 after User 1 abandoned");
    });

    it("4.6 Payment success after reservation expiry: order reclaims another available slot", async () => {
      // Order A reserved slot 25, which expired. Slot 26 is released.
      await client.query("UPDATE public.promotional_slots SET status = 'claimed'");
      await client.query("UPDATE public.promotional_slots SET status = 'released', order_id = null, user_id = null WHERE slot_number = 26");

      const userA = await createTestUser();
      const orderA = `ord_promo_late_${crypto.randomUUID().slice(0, 8)}`;
      const payA = `pay_promo_late_${crypto.randomUUID().slice(0, 8)}`;

      await client.query(
        `INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, is_promotional, status)
         VALUES ($1, 'razorpay', $2, 'all_access_pass_799', 200, 'INR', true, 'created')`,
        [userA, orderA]
      );

      // Fulfill order: it will claim slot 26
      const res = await client.query(
        `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) as result`,
        [userA, "razorpay", orderA, payA, "sig_late", 200, "INR", "all_access_pass", new Date(Date.now() + 365 * 86400000).toISOString(), 500, JSON.stringify({})]
      );
      assert.equal(res.rows[0].result.success, true);

      const slot26 = await client.query("SELECT status, user_id FROM public.promotional_slots WHERE slot_number = 26");
      assert.equal(slot26.rows[0].status, "claimed");
      assert.equal(slot26.rows[0].user_id, userA);
    });

    it("4.7 Two orders attempting to claim the same slot: row lock serializes, one succeeds, one rolls back", async () => {
      // Exactly 1 slot available (slot 30)
      await client.query("UPDATE public.promotional_slots SET status = 'claimed'");
      await client.query("UPDATE public.promotional_slots SET status = 'released', order_id = null, user_id = null WHERE slot_number = 30");

      const user1 = await createTestUser();
      const user2 = await createTestUser();
      const ord1 = `ord_compete_1_${crypto.randomUUID().slice(0, 8)}`;
      const ord2 = `ord_compete_2_${crypto.randomUUID().slice(0, 8)}`;
      const pay1 = `pay_compete_1_${crypto.randomUUID().slice(0, 8)}`;
      const pay2 = `pay_compete_2_${crypto.randomUUID().slice(0, 8)}`;

      await client.query(`INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, is_promotional, status) VALUES ($1, 'razorpay', $2, 'all_access_pass_799', 200, 'INR', true, 'created')`, [user1, ord1]);
      await client.query(`INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, is_promotional, status) VALUES ($1, 'razorpay', $2, 'all_access_pass_799', 200, 'INR', true, 'created')`, [user2, ord2]);

      const [res1, res2] = await Promise.allSettled([
        pool.query(`SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [user1, "razorpay", ord1, pay1, "sig1", 200, "INR", "all_access_pass", new Date(Date.now() + 365 * 86400000).toISOString(), 500, JSON.stringify({})]),
        pool.query(`SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [user2, "razorpay", ord2, pay2, "sig2", 200, "INR", "all_access_pass", new Date(Date.now() + 365 * 86400000).toISOString(), 500, JSON.stringify({})]),
      ]);

      const fulfilled = [res1, res2].filter(r => r.status === "fulfilled");
      const rejected = [res1, res2].filter(r => r.status === "rejected");

      assert.equal(fulfilled.length, 1, "Exactly one order must claim the single slot");
      assert.equal(rejected.length, 1, "Competing order must fail with slot exhaustion");
    });

    it("4.8 Duplicate fulfillment replay is idempotent and does not award duplicate bonus coins", async () => {
      const user = await createTestUser();
      const { providerOrderId } = await createTestOrder(user, 79900, "all_access_pass_799", false, "created");
      const providerPaymentId = `pay_replay_${crypto.randomUUID().slice(0, 10)}`;

      // Fulfillment 1
      const res1 = await client.query(
        `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) as r`,
        [user, "razorpay", providerOrderId, providerPaymentId, "sig_replay", 79900, "INR", "all_access_pass", new Date(Date.now() + 365 * 86400000).toISOString(), 500, JSON.stringify({})]
      );
      assert.equal(res1.rows[0].r.success, true);
      assert.equal(res1.rows[0].r.bonus_coins_awarded, 500);

      // Fulfillment 2 (Duplicate replay)
      const res2 = await client.query(
        `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) as r`,
        [user, "razorpay", providerOrderId, providerPaymentId, "sig_replay", 79900, "INR", "all_access_pass", new Date(Date.now() + 365 * 86400000).toISOString(), 500, JSON.stringify({})]
      );
      assert.equal(res2.rows[0].r.success, true);
      assert.equal(res2.rows[0].r.idempotent, true);
      assert.equal(res2.rows[0].r.bonus_coins_awarded, 0, "Duplicate replay must award 0 bonus coins");

      // Verify user campus_coins = 500 (not 1000)
      const prof = await client.query("SELECT campus_coins FROM public.profiles WHERE id = $1", [user]);
      assert.equal(prof.rows[0].campus_coins, 500);
    });
  });

  // =========================================================================
  // 5. ENTITLEMENT STACKING & MULTI-PURCHASE SURVIVAL
  // =========================================================================
  describe("5. Entitlement Stacking & Multi-Purchase Survival [INTEGRATION]", () => {
    it("5.1 Two consecutive 1-year purchases stack durations sequentially (2 years total)", async () => {
      const userId = await createTestUser();

      // Purchase 1: Today
      const { orderDbId: ord1 } = await createTestOrder(userId, 79900);
      const { providerPaymentId: pay1 } = await createCapturedTransaction(ord1, userId, 79900);

      // Reconcile purchase 1
      const rec1 = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      const exp1 = new Date(rec1.rows[0].r.subscription_expires_at).getTime();
      const approx1Year = Date.now() + 365 * 86400000;
      assert.ok(Math.abs(exp1 - approx1Year) < 10000, "First purchase expires in ~1 year");

      // Purchase 2: Consecutive subscription
      const { orderDbId: ord2 } = await createTestOrder(userId, 79900);
      await createCapturedTransaction(ord2, userId, 79900);

      // Reconcile purchases
      const rec2 = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      const exp2 = new Date(rec2.rows[0].r.subscription_expires_at).getTime();
      const approx2Years = Date.now() + 2 * 365 * 86400000;
      assert.ok(Math.abs(exp2 - approx2Years) < 10000, "Stacked purchases expire in ~2 years");

      // Step 2: Refund Purchase 1, Purchase 2 MUST survive
      const refundId = `rfnd_stack_${crypto.randomUUID().slice(0, 8)}`;
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, pay1, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      // Reconcile after refund
      const recAfterRefund = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      assert.equal(recAfterRefund.rows[0].r.is_premium, true, "User must retain Premium via surviving purchase");

      const expAfterRefund = new Date(recAfterRefund.rows[0].r.subscription_expires_at).getTime();
      assert.ok(
        Math.abs(expAfterRefund - approx1Year) < 10000,
        "Surviving purchase provides 1 year from its verification date"
      );
    });

    it("5.2 User with 1 valid purchase and 1 chargeback lost retains access from valid purchase", async () => {
      const userId = await createTestUser();

      // Purchase 1: Valid purchase
      const { orderDbId: ord1 } = await createTestOrder(userId, 79900);
      await createCapturedTransaction(ord1, userId, 79900);

      // Purchase 2: Disputed and lost
      const { orderDbId: ord2 } = await createTestOrder(userId, 49900);
      const { providerPaymentId: pay2 } = await createCapturedTransaction(ord2, userId, 49900);

      const dispId = `disp_stack_lost_${crypto.randomUUID().slice(0, 8)}`;
      await client.query(
        `SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`,
        ["razorpay", dispId, pay2, 49900, "INR", "payment.dispute.lost", "fraud", JSON.stringify({})]
      );

      // Reconcile
      const rec = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      assert.equal(rec.rows[0].r.is_premium, true, "Valid purchase preserves premium access");
      assert.equal(rec.rows[0].r.subscription_tier, "all_access_pass");
    });

    it("5.3 User with 1 valid purchase and 1 refunded purchase retains access from valid purchase", async () => {
      const userId = await createTestUser();

      // Purchase 1: Valid purchase (ai_practice_pass)
      const { orderDbId: ord1 } = await createTestOrder(userId, 49900, "ai_practice_pass_499");
      await createCapturedTransaction(ord1, userId, 49900);

      // Purchase 2: Refunded purchase
      const { orderDbId: ord2 } = await createTestOrder(userId, 79900, "all_access_pass_799");
      const { providerPaymentId: pay2 } = await createCapturedTransaction(ord2, userId, 79900);

      const refundId = `rfnd_surv_${crypto.randomUUID().slice(0, 8)}`;
      await client.query(
        `SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`,
        ["razorpay", refundId, pay2, 79900, "INR", "refund.processed", JSON.stringify({})]
      );

      const rec = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      assert.equal(rec.rows[0].r.is_premium, true, "Surviving purchase grants access");
      assert.equal(rec.rows[0].r.subscription_tier, "ai_practice_pass");
    });

    it("5.4 Tier upgrade: purchasing all_access_pass upgrades tier from ai_practice_pass", async () => {
      const userId = await createTestUser();

      // Purchase 1: ai_practice_pass
      const { orderDbId: ord1 } = await createTestOrder(userId, 49900, "ai_practice_pass_499");
      await createCapturedTransaction(ord1, userId, 49900);
      const rec1 = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      assert.equal(rec1.rows[0].r.subscription_tier, "ai_practice_pass");

      // Purchase 2: all_access_pass
      const { orderDbId: ord2 } = await createTestOrder(userId, 79900, "all_access_pass_799");
      await createCapturedTransaction(ord2, userId, 79900);
      const rec2 = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      assert.equal(rec2.rows[0].r.subscription_tier, "all_access_pass", "Tier must upgrade to all_access_pass");
    });

    it("5.5 Expired subscription reconciles to is_premium: false and tier: free", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);

      // Create transaction verified 2 years ago (expired)
      const payId = `pay_exp_${crypto.randomUUID().slice(0, 8)}`;
      await client.query(
        `INSERT INTO public.payment_transactions (
           order_id, user_id, provider, provider_payment_id, provider_signature,
           amount_paise, currency, status, refunded_amount_paise, verified_at
         )
         VALUES ($1, $2, 'razorpay', $3, 'sig_exp', 79900, 'INR', 'captured', 0, NOW() - interval '400 days')`,
        [orderDbId, userId, payId]
      );

      const rec = await client.query("SELECT public.reconcile_user_entitlements($1) as r", [userId]);
      assert.equal(rec.rows[0].r.is_premium, false);
      assert.equal(rec.rows[0].r.subscription_tier, "free");

      const prof = await client.query("SELECT is_premium, subscription_tier FROM public.profiles WHERE id = $1", [userId]);
      assert.equal(prof.rows[0].is_premium, false);
      assert.equal(prof.rows[0].subscription_tier, "free");
    });

    it("5.6 Concurrent refund and dispute processing serializes cleanly via transaction lock", async () => {
      const userId = await createTestUser();
      const { orderDbId } = await createTestOrder(userId, 79900);
      const { providerPaymentId } = await createCapturedTransaction(orderDbId, userId, 79900);

      const refId = `rfnd_race_${crypto.randomUUID().slice(0, 6)}`;
      const dispId = `disp_race_${crypto.randomUUID().slice(0, 6)}`;

      // Execute refund and dispute concurrently on distinct pool connections
      const results = await Promise.allSettled([
        pool.query(`SELECT public.process_payment_refund($1, $2, $3, $4, $5, $6, $7)`, [
          "razorpay", refId, providerPaymentId, 79900, "INR", "refund.processed", JSON.stringify({})
        ]),
        pool.query(`SELECT public.process_payment_dispute($1, $2, $3, $4, $5, $6, $7, $8)`, [
          "razorpay", dispId, providerPaymentId, 79900, "INR", "payment.dispute.won", null, JSON.stringify({})
        ]),
      ]);

      assert.equal(results.filter(r => r.status === "fulfilled").length, 2, "Both operations must serialize without deadlocking");

      // Transaction must end in a valid deterministic status (refunded or captured)
      const tx = await client.query("SELECT status FROM public.payment_transactions WHERE provider_payment_id = $1", [providerPaymentId]);
      assert.ok(["refunded", "captured"].includes(tx.rows[0].status));
    });
  });

  // =========================================================================
  // 6. DATABASE ERROR INJECTION & FAIL-CLOSED SAFETY
  // =========================================================================
  describe("6. Database Error Injection & Fail-Closed Safety [INTEGRATION]", () => {
    it("6.1 Negative or zero payment amount paise throws error and aborts transaction", async () => {
      const userId = await createTestUser();
      const { providerOrderId } = await createTestOrder(userId, 79900, "all_access_pass_799", false, "created");

      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [userId, "razorpay", providerOrderId, "pay_neg", "sig", -500, "INR", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("Invalid payment amount"));
      }
      assert.equal(errorThrown, true);
    });

    it("6.2 Invalid payment currency (e.g. 'USD') throws error and aborts transaction", async () => {
      const userId = await createTestUser();
      const { providerOrderId } = await createTestOrder(userId, 79900, "all_access_pass_799", false, "created");

      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [userId, "razorpay", providerOrderId, "pay_usd", "sig", 79900, "USD", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("Invalid currency"));
      }
      assert.equal(errorThrown, true);
    });

    it("6.3 Non-existent candidate profile throws error and aborts transaction", async () => {
      const nonExistentUserId = crypto.randomUUID();

      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [nonExistentUserId, "razorpay", "ord_missing", "pay_missing", "sig", 79900, "INR", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("not found"));
      }
      assert.equal(errorThrown, true);
    });

    it("6.4 Order candidate mismatch (cross-user claim) throws security error and aborts transaction", async () => {
      const userA = await createTestUser();
      const userB = await createTestUser();
      const { providerOrderId } = await createTestOrder(userA, 79900, "all_access_pass_799", false, "created");

      let errorThrown = false;
      try {
        // User B attempts to fulfill User A's order
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [userB, "razorpay", providerOrderId, "pay_cross", "sig", 79900, "INR", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("Order candidate mismatch"));
      }
      assert.equal(errorThrown, true);
    });

    it("6.5 Cross-order payment ID reuse throws unique constraint violation and aborts transaction", async () => {
      const userA = await createTestUser();
      const userB = await createTestUser();
      const { providerOrderId: ordIdA } = await createTestOrder(userA, 79900, "all_access_pass_799", false, "created");
      const { providerOrderId: ordIdB } = await createTestOrder(userB, 79900, "all_access_pass_799", false, "created");

      const sharedPaymentId = `pay_shared_${crypto.randomUUID().slice(0, 8)}`;

      // Fulfill order A
      await client.query(
        `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [userA, "razorpay", ordIdA, sharedPaymentId, "sigA", 79900, "INR", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
      );

      // Attempt to reuse same payment ID on order B
      let errorThrown = false;
      try {
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [userB, "razorpay", ordIdB, sharedPaymentId, "sigB", 79900, "INR", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("already bound to a different order"));
      }
      assert.equal(errorThrown, true);
    });

    it("6.6 Payment amount mismatch between order and captured payment throws exception", async () => {
      const user = await createTestUser();
      const { providerOrderId } = await createTestOrder(user, 79900, "all_access_pass_799", false, "created");

      let errorThrown = false;
      try {
        // Order requires 79900, payment submitted with 49900
        await client.query(
          `SELECT public.fulfill_payment_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [user, "razorpay", providerOrderId, "pay_mismatch", "sig", 49900, "INR", "all_access_pass", new Date().toISOString(), 500, JSON.stringify({})]
        );
      } catch (err: any) {
        errorThrown = true;
        assert.ok(err.message.includes("PAYMENT_AMOUNT_MISMATCH"));
      }
      assert.equal(errorThrown, true);
    });
  });
});
