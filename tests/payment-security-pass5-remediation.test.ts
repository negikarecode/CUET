import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { Pool, PoolClient } from "pg";
import { getPgTestConfig } from "./helpers/pg-test-helper";
import crypto from "crypto";
import { NextRequest } from "next/server";
import { POST } from "../app/api/payments/route";
import { setTestAdminClientOverride } from "../lib/supabase/admin";

/**
 * CUETMate Payment Security Pass 5: Final Remediation Integration Test Suite
 *
 * Verifies:
 * 1. Dispute reversal authorization:
 *    - Reversals cannot be triggered merely by event name payment.dispute.reversal_approved
 *    - Explicit authorization via dedicated RPC execute_authorized_dispute_reversal
 *    - Immutable audit entry in payment_dispute_reversal_audit (rejects UPDATE / DELETE)
 *    - Reversal cannot restore a refunded payment
 *    - Rejection of unauthorized and malformed reversal attempts
 * 2. Refund ledger immutability:
 *    - Once processed, status and raw_payload are strictly immutable against delayed events
 *    - Delayed refund.created after refund.failed cannot downgrade status to created
 *    - Duplicate events are idempotent without mutating original payload
 *    - Conflicting identity (payment_id, amount, currency, provider) is rejected
 *    - Cumulative processed refunds cannot exceed captured amount under concurrent requests
 */

import fs from "fs";
import path from "path";

describe("Payment Security Pass 5: Final Remediation Test Suite", () => {
  let pool: Pool;
  const WEBHOOK_SECRET = "test_pass5_webhook_secret_key_12345";

  before(async () => {
    process.env.RAZORPAY_KEY_ID = "rzp_test_pass5_key";
    process.env.RAZORPAY_KEY_SECRET = "test_pass5_key_secret";
    process.env.RAZORPAY_WEBHOOK_SECRET = WEBHOOK_SECRET;

    pool = new Pool({
      ...getPgTestConfig(),
      max: 20,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 5000,
    });

    const client = await pool.connect();
    try {
      await client.query("SELECT 1;");

      // Apply Pass 5 migration to ensure database functions are up-to-date
      const migPath = path.join(process.cwd(), "supabase", "migrations", "20261106_payment_security_pass5.sql");
      if (fs.existsSync(migPath)) {
        const sql = fs.readFileSync(migPath, "utf-8");
        await client.query(sql);
      }
    } finally {
      client.release();
    }
  });

  after(async () => {
    setTestAdminClientOverride(null);
    await pool.end();
  });

  // Helper to create test user, order and captured transaction
  async function createTestFixture(client: PoolClient, amountPaise = 79900) {
    const userId = crypto.randomUUID();
    const providerOrderId = `ord_p5_${crypto.randomBytes(6).toString("hex")}`;
    const paymentId = `pay_p5_${crypto.randomBytes(6).toString("hex")}`;

    await client.query(
      `INSERT INTO auth.users (id, email) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING;`,
      [userId, `user_${userId.slice(0, 8)}@example.com`]
    );

    await client.query(
      `INSERT INTO public.profiles (id, full_name, target_stream, is_premium, subscription_tier, campus_coins)
       VALUES ($1, 'Candidate Pass 5', 'Science', false, 'free', 0)
       ON CONFLICT (id) DO UPDATE SET is_premium = false, subscription_tier = 'free', campus_coins = 0;`,
      [userId]
    );

    const ordRes = await client.query(
      `INSERT INTO public.payment_orders (user_id, provider, provider_order_id, plan_id, amount_paise, currency, status)
       VALUES ($1, 'razorpay', $2, 'all_access_pass_799', $3, 'INR', 'paid')
       RETURNING id;`,
      [userId, providerOrderId, amountPaise]
    );
    const orderDbId = ordRes.rows[0].id;

    const txRes = await client.query(
      `INSERT INTO public.payment_transactions (order_id, user_id, provider, provider_payment_id, amount_paise, currency, status, verified_at)
       VALUES ($1, $2, 'razorpay', $3, $4, 'INR', 'captured', clock_timestamp())
       RETURNING id;`,
      [orderDbId, userId, paymentId, amountPaise]
    );

    return { userId, orderId: providerOrderId, orderDbId, paymentId, transactionId: txRes.rows[0].id };
  }

  // ─── 1. DISPUTE REVERSAL AUTHORIZATION ───────────────────────────────────────
  describe("1. Dispute Reversal Authorization [INTEGRATION]", () => {
    it("1.1 Webhook route rejects payment.dispute.reversal_approved with HTTP 403", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_unauth_${crypto.randomBytes(4).toString("hex")}`;

        setTestAdminClientOverride({
          rpc: async (fn: string) => {
            if (fn === "record_webhook_event") {
              return { data: { is_duplicate: false, action: "process", event_pk: crypto.randomUUID() }, error: null };
            }
            if (fn === "finalize_webhook_event") {
              return { data: null, error: null };
            }
            return { data: null, error: null };
          },
        });

        const payload = JSON.stringify({
          entity: "event",
          account_id: "acc_test",
          event: "payment.dispute.reversal_approved",
          contains: ["payment", "dispute"],
          payload: {
            payment: {
              entity: {
                id: fixture.paymentId,
                order_id: fixture.orderId,
                amount: 79900,
                currency: "INR",
                status: "captured",
              },
            },
            dispute: {
              entity: {
                id: disputeId,
                payment_id: fixture.paymentId,
                amount: 79900,
                status: "won",
              },
            },
          },
        });

        const signature = crypto
          .createHmac("sha256", WEBHOOK_SECRET)
          .update(payload)
          .digest("hex");

        const req = new NextRequest("http://localhost:3000/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-razorpay-signature": signature,
            "x-razorpay-event-id": `evt_rev_${crypto.randomBytes(4).toString("hex")}`,
          },
          body: payload,
        });

        const res = await POST(req);
        assert.equal(res.status, 403);
        const data = await res.json();
        assert.equal(data.code, "UNAUTHORIZED_REVERSAL_ATTEMPT");
      } finally {
        client.release();
      }
    });

    it("1.2 process_payment_dispute rejects payment.dispute.reversal_approved in SQL", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_sql_unauth_${crypto.randomBytes(4).toString("hex")}`;

        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.process_payment_dispute(
                'razorpay', $1, $2, 79900, 'INR', 'payment.dispute.reversal_approved', NULL, '{}'::jsonb
              );`,
              [disputeId, fixture.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /UNAUTHORIZED_DISPUTE_REVERSAL/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });

    it("1.3 execute_authorized_dispute_reversal rejects unauthorized actor source", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_actor_${crypto.randomBytes(4).toString("hex")}`;

        // Create dispute lost
        await client.query(
          `SELECT public.process_payment_dispute(
            'razorpay', $1, $2, 79900, 'INR', 'payment.dispute.lost', 'chargeback', '{}'::jsonb
          );`,
          [disputeId, fixture.paymentId]
        );

        // Attempt reversal with unauthorized actor
        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.execute_authorized_dispute_reversal(
                $1, $2, 'won', 'anonymous_hacker', 'Valid bank confirmation'
              );`,
              [disputeId, fixture.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /UNAUTHORIZED_REVERSAL_ACTOR/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });

    it("1.4 execute_authorized_dispute_reversal rejects missing or trivial reason", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_reason_${crypto.randomBytes(4).toString("hex")}`;

        // Create dispute lost
        await client.query(
          `SELECT public.process_payment_dispute(
            'razorpay', $1, $2, 79900, 'INR', 'payment.dispute.lost', 'chargeback', '{}'::jsonb
          );`,
          [disputeId, fixture.paymentId]
        );

        // Attempt reversal with empty or trivial reason
        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.execute_authorized_dispute_reversal(
                $1, $2, 'won', 'internal_admin:secops_1', 'ok'
              );`,
              [disputeId, fixture.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /REVERSAL_REASON_REQUIRED/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });
  });

  // ─── 2. AUTHORIZED REVERSAL & IMMUTABLE AUDIT ENTRY ─────────────────────────
  describe("2. Authorized Reversal with Immutable Audit Entry [INTEGRATION]", () => {
    it("2.1 Authorized reversal of lost dispute to won writes audit entry and restores transaction", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_rev_won_${crypto.randomBytes(4).toString("hex")}`;

        // 1. Dispute lost
        await client.query(
          `SELECT public.process_payment_dispute(
            'razorpay', $1, $2, 79900, 'INR', 'payment.dispute.lost', 'chargeback', '{}'::jsonb
          );`,
          [disputeId, fixture.paymentId]
        );

        // Verify transaction is disputed_lost
        const txBefore = await client.query(
          `SELECT status, dispute_status FROM public.payment_transactions WHERE id = $1;`,
          [fixture.transactionId]
        );
        assert.equal(txBefore.rows[0].status, "disputed_lost");
        assert.equal(txBefore.rows[0].dispute_status, "lost");

        // 2. Execute authorized reversal
        const revRes = await client.query(
          `SELECT public.execute_authorized_dispute_reversal(
            $1, $2, 'won', 'internal_admin:secops_lead', 'Merchant bank provided proof of cardholder authorization',
            '{"ticket": "INC-9941"}'::jsonb
          ) AS result;`,
          [disputeId, fixture.paymentId]
        );

        const resData = revRes.rows[0].result;
        assert.equal(resData.success, true);
        assert.equal(resData.previous_status, "lost");
        assert.equal(resData.new_status, "won");
        assert.equal(resData.tx_status, "captured");
        assert.equal(resData.actor_source, "internal_admin:secops_lead");
        assert.ok(resData.audit_id);

        // 3. Verify dispute status updated
        const dispAfter = await client.query(
          `SELECT status FROM public.payment_disputes WHERE provider_dispute_id = $1;`,
          [disputeId]
        );
        assert.equal(dispAfter.rows[0].status, "won");

        // 4. Verify transaction status restored to captured
        const txAfter = await client.query(
          `SELECT status, dispute_status FROM public.payment_transactions WHERE id = $1;`,
          [fixture.transactionId]
        );
        assert.equal(txAfter.rows[0].status, "captured");
        assert.equal(txAfter.rows[0].dispute_status, "won");

        // 5. Verify immutable audit ledger entry
        const auditRow = await client.query(
          `SELECT * FROM public.payment_dispute_reversal_audit WHERE id = $1;`,
          [resData.audit_id]
        );
        assert.equal(auditRow.rows.length, 1);
        assert.equal(auditRow.rows[0].provider_dispute_id, disputeId);
        assert.equal(auditRow.rows[0].payment_id, fixture.paymentId);
        assert.equal(auditRow.rows[0].previous_status, "lost");
        assert.equal(auditRow.rows[0].new_status, "won");
        assert.equal(auditRow.rows[0].actor_source, "internal_admin:secops_lead");
        assert.equal(auditRow.rows[0].reason, "Merchant bank provided proof of cardholder authorization");
        assert.deepEqual(auditRow.rows[0].metadata, { ticket: "INC-9941" });
      } finally {
        client.release();
      }
    });

    it("2.2 Authorized reversal of won dispute to lost writes audit entry and marks disputed_lost", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_rev_lost_${crypto.randomBytes(4).toString("hex")}`;

        // 1. Dispute won
        await client.query(
          `SELECT public.process_payment_dispute(
            'razorpay', $1, $2, 79900, 'INR', 'payment.dispute.won', NULL, '{}'::jsonb
          );`,
          [disputeId, fixture.paymentId]
        );

        // 2. Execute authorized reversal to lost
        const revRes = await client.query(
          `SELECT public.execute_authorized_dispute_reversal(
            $1, $2, 'lost', 'ops:chargeback_manager', 'Card network arbitration decision ruled against merchant',
            '{"arbitration_case": "ARB-7712"}'::jsonb
          ) AS result;`,
          [disputeId, fixture.paymentId]
        );

        const resData = revRes.rows[0].result;
        assert.equal(resData.success, true);
        assert.equal(resData.previous_status, "won");
        assert.equal(resData.new_status, "lost");
        assert.equal(resData.tx_status, "disputed_lost");

        // 3. Verify audit record
        const auditRow = await client.query(
          `SELECT * FROM public.payment_dispute_reversal_audit WHERE id = $1;`,
          [resData.audit_id]
        );
        assert.equal(auditRow.rows[0].previous_status, "won");
        assert.equal(auditRow.rows[0].new_status, "lost");
        assert.equal(auditRow.rows[0].actor_source, "ops:chargeback_manager");
      } finally {
        client.release();
      }
    });

    it("2.3 payment_dispute_reversal_audit table is strictly append-only (rejects UPDATE & DELETE)", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_audit_immut_${crypto.randomBytes(4).toString("hex")}`;

        await client.query(
          `SELECT public.process_payment_dispute(
            'razorpay', $1, $2, 79900, 'INR', 'payment.dispute.lost', 'chargeback', '{}'::jsonb
          );`,
          [disputeId, fixture.paymentId]
        );

        const revRes = await client.query(
          `SELECT public.execute_authorized_dispute_reversal(
            $1, $2, 'won', 'security_officer:audit_test', 'Legitimate customer clarification'
          ) AS result;`,
          [disputeId, fixture.paymentId]
        );
        const auditId = revRes.rows[0].result.audit_id;

        // Attempt UPDATE
        await assert.rejects(
          async () => {
            await client.query(
              `UPDATE public.payment_dispute_reversal_audit SET reason = 'tampered' WHERE id = $1;`,
              [auditId]
            );
          },
          (err: any) => {
            assert.match(err.message, /immutable and cannot be updated or deleted/);
            return true;
          }
        );

        // Attempt DELETE
        await assert.rejects(
          async () => {
            await client.query(
              `DELETE FROM public.payment_dispute_reversal_audit WHERE id = $1;`,
              [auditId]
            );
          },
          (err: any) => {
            assert.match(err.message, /immutable and cannot be updated or deleted/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });
  });

  // ─── 3. REVERSAL AFTER FULL REFUND ──────────────────────────────────────────
  describe("3. Reversal After a Full Refund [INTEGRATION]", () => {
    it("3.1 Reversal cannot restore a refunded payment (strictly raises CANNOT_REVERSE_REFUNDED_TRANSACTION)", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const disputeId = `disp_ref_rev_${crypto.randomBytes(4).toString("hex")}`;
        const refundId = `rfnd_full_${crypto.randomBytes(4).toString("hex")}`;

        // 1. Process full refund
        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.processed', '{"full": true}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        // Verify transaction is refunded
        const txCheck = await client.query(
          `SELECT status FROM public.payment_transactions WHERE id = $1;`,
          [fixture.transactionId]
        );
        assert.equal(txCheck.rows[0].status, "refunded");

        // 2. Record dispute lost
        await client.query(
          `SELECT public.process_payment_dispute(
            'razorpay', $1, $2, 79900, 'INR', 'payment.dispute.lost', 'chargeback', '{}'::jsonb
          );`,
          [disputeId, fixture.paymentId]
        );

        // 3. Attempt reversal of refunded transaction -> MUST FAIL
        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.execute_authorized_dispute_reversal(
                $1, $2, 'won', 'internal_admin:secops_1', 'Attempting illegal reversal of refunded transaction'
              );`,
              [disputeId, fixture.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /CANNOT_REVERSE_REFUNDED_TRANSACTION/);
            return true;
          }
        );

        // 4. Verify transaction status remains refunded
        const txFinal = await client.query(
          `SELECT status FROM public.payment_transactions WHERE id = $1;`,
          [fixture.transactionId]
        );
        assert.equal(txFinal.rows[0].status, "refunded");
      } finally {
        client.release();
      }
    });
  });

  // ─── 4. DELAYED REFUND.CREATED AFTER REFUND.FAILED ──────────────────────────
  describe("4. Delayed refund.created After refund.failed [INTEGRATION]", () => {
    it("4.1 Delayed refund.created after refund.failed cannot downgrade status to created", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const refundId = `rfnd_fail_first_${crypto.randomBytes(4).toString("hex")}`;

        // 1. Initial refund.failed
        const failRes = await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.failed', '{"error": "bank_rejection"}'::jsonb
          ) AS result;`,
          [refundId, fixture.paymentId]
        );
        assert.equal(failRes.rows[0].result.refund_status, "failed");

        // 2. Delayed refund.created arrives for same refund ID
        const createdRes = await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.created', '{"delayed": true}'::jsonb
          ) AS result;`,
          [refundId, fixture.paymentId]
        );

        const resData = createdRes.rows[0].result;
        assert.equal(resData.success, true);
        assert.equal(resData.is_duplicate, true);
        assert.equal(resData.refund_status, "failed");
        assert.equal(resData.action, "ignored_delayed_event");

        // 3. Verify in database: status is STILL 'failed'
        const refundRow = await client.query(
          `SELECT status, raw_payload FROM public.payment_refunds WHERE provider_refund_id = $1;`,
          [refundId]
        );
        assert.equal(refundRow.rows[0].status, "failed");
        assert.deepEqual(refundRow.rows[0].raw_payload, { error: "bank_rejection" });
      } finally {
        client.release();
      }
    });
  });

  // ─── 5. DELAYED REFUND.FAILED AFTER REFUND.PROCESSED ────────────────────────
  describe("5. Delayed refund.failed After refund.processed [INTEGRATION]", () => {
    it("5.1 Delayed refund.failed after refund.processed is ignored and original processed status preserved", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const refundId = `rfnd_proc_first_${crypto.randomBytes(4).toString("hex")}`;
        const originalPayload = { auth_code: "BANK_OK_999", confirmed: true };

        // 1. Processed refund
        const procRes = await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.processed', $3::jsonb
          ) AS result;`,
          [refundId, fixture.paymentId, JSON.stringify(originalPayload)]
        );
        assert.equal(procRes.rows[0].result.is_processed, true);

        // 2. Delayed refund.failed arrives
        const failRes = await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.failed', '{"error": "delayed_failure_notice"}'::jsonb
          ) AS result;`,
          [refundId, fixture.paymentId]
        );

        const resData = failRes.rows[0].result;
        assert.equal(resData.success, true);
        assert.equal(resData.is_duplicate, true);
        assert.equal(resData.refund_status, "processed");
        assert.equal(resData.action, "ignored_delayed_event");

        // 3. Verify in database: status is STILL 'processed' and payload untouched
        const refundRow = await client.query(
          `SELECT status, raw_payload FROM public.payment_refunds WHERE provider_refund_id = $1;`,
          [refundId]
        );
        assert.equal(refundRow.rows[0].status, "processed");
        assert.deepEqual(refundRow.rows[0].raw_payload, originalPayload);
      } finally {
        client.release();
      }
    });
  });

  // ─── 6. PROCESSED REFUND PAYLOAD IMMUTABILITY ───────────────────────────────
  describe("6. Processed Refund Payload Immutability [INTEGRATION]", () => {
    it("6.1 Processed refund payload cannot be overwritten by delayed created, delayed failed, or duplicate processed", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const refundId = `rfnd_immut_payload_${crypto.randomBytes(4).toString("hex")}`;
        const authoritativePayload = { receipt: "REC_CONFIRMED_777", rrn: "9988776655" };

        // 1. Insert created
        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.created', '{"step": "init"}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        // 2. Transition to processed with authoritative payload
        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.processed', $3::jsonb
          );`,
          [refundId, fixture.paymentId, JSON.stringify(authoritativePayload)]
        );

        // 3. Attempt delayed refund.created with forged payload
        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.created', '{"forged_step": true}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        // 4. Attempt delayed refund.failed with forged payload
        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.failed', '{"forged_failure": true}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        // 5. Attempt duplicate refund.processed with tampered payload
        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 79900, 'INR', 'refund.processed', '{"tampered_receipt": "FAKE"}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        // 6. Verify in database: payload is STILL the original authoritative payload
        const refundRow = await client.query(
          `SELECT status, raw_payload FROM public.payment_refunds WHERE provider_refund_id = $1;`,
          [refundId]
        );
        assert.equal(refundRow.rows[0].status, "processed");
        assert.deepEqual(refundRow.rows[0].raw_payload, authoritativePayload);
      } finally {
        client.release();
      }
    });
  });

  // ─── 7. DUPLICATE AND CONFLICTING REFUND IDS ────────────────────────────────
  describe("7. Duplicate and Conflicting Refund IDs [INTEGRATION]", () => {
    it("7.1 Duplicate processed delivery is idempotent and does not increment cumulative refund", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client, 100000);
        const refundId = `rfnd_dup_${crypto.randomBytes(4).toString("hex")}`;

        // First delivery (partial 40000 paise)
        const res1 = await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 40000, 'INR', 'refund.processed', '{}'::jsonb
          ) AS result;`,
          [refundId, fixture.paymentId]
        );
        assert.equal(res1.rows[0].result.cumulative_refunded_paise, 40000);

        // Duplicate delivery with same refundId
        const res2 = await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 40000, 'INR', 'refund.processed', '{}'::jsonb
          ) AS result;`,
          [refundId, fixture.paymentId]
        );
        assert.equal(res2.rows[0].result.is_duplicate, true);
        assert.equal(res2.rows[0].result.cumulative_refunded_paise, 40000);

        // Total refund on transaction must still be exactly 40000 paise (NOT 80000)
        const txCheck = await client.query(
          `SELECT refunded_amount_paise FROM public.payment_transactions WHERE id = $1;`,
          [fixture.transactionId]
        );
        assert.equal(txCheck.rows[0].refunded_amount_paise, 40000);
      } finally {
        client.release();
      }
    });

    it("7.2 Conflicting payment ID for same refund ID raises REFUND_IDENTITY_MISMATCH", async () => {
      const client = await pool.connect();
      try {
        const fixture1 = await createTestFixture(client);
        const fixture2 = await createTestFixture(client);
        const refundId = `rfnd_conflict_pay_${crypto.randomBytes(4).toString("hex")}`;

        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 50000, 'INR', 'refund.processed', '{}'::jsonb
          );`,
          [refundId, fixture1.paymentId]
        );

        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.process_payment_refund(
                'razorpay', $1, $2, 50000, 'INR', 'refund.processed', '{}'::jsonb
              );`,
              [refundId, fixture2.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /REFUND_IDENTITY_MISMATCH/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });

    it("7.3 Conflicting amount for same refund ID raises REFUND_IDENTITY_MISMATCH", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const refundId = `rfnd_conflict_amt_${crypto.randomBytes(4).toString("hex")}`;

        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 30000, 'INR', 'refund.processed', '{}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.process_payment_refund(
                'razorpay', $1, $2, 50000, 'INR', 'refund.processed', '{}'::jsonb
              );`,
              [refundId, fixture.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /REFUND_IDENTITY_MISMATCH/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });

    it("7.4 Conflicting currency for same refund ID raises REFUND_IDENTITY_MISMATCH", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const refundId = `rfnd_conflict_cur_${crypto.randomBytes(4).toString("hex")}`;

        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 30000, 'INR', 'refund.processed', '{}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.process_payment_refund(
                'razorpay', $1, $2, 30000, 'USD', 'refund.processed', '{}'::jsonb
              );`,
              [refundId, fixture.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /REFUND_IDENTITY_MISMATCH/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });

    it("7.5 Conflicting provider for same refund ID raises REFUND_IDENTITY_MISMATCH", async () => {
      const client = await pool.connect();
      try {
        const fixture = await createTestFixture(client);
        const refundId = `rfnd_conflict_prov_${crypto.randomBytes(4).toString("hex")}`;

        await client.query(
          `SELECT public.process_payment_refund(
            'razorpay', $1, $2, 30000, 'INR', 'refund.processed', '{}'::jsonb
          );`,
          [refundId, fixture.paymentId]
        );

        await assert.rejects(
          async () => {
            await client.query(
              `SELECT public.process_payment_refund(
                'cashfree', $1, $2, 30000, 'INR', 'refund.processed', '{}'::jsonb
              );`,
              [refundId, fixture.paymentId]
            );
          },
          (err: any) => {
            assert.match(err.message, /REFUND_IDENTITY_MISMATCH/);
            return true;
          }
        );
      } finally {
        client.release();
      }
    });
  });

  // ─── 8. CONCURRENT PARTIAL REFUNDS EXCEEDING CAPTURED AMOUNT ────────────────
  describe("8. Concurrent Partial Refunds Exceeding Captured Amount [INTEGRATION]", () => {
    it("8.1 5 concurrent partial refunds against 1000-paise captured payment: valid partials succeed, over-refund fails atomically", async () => {
      const client = await pool.connect();
      let fixture: any;
      try {
        // Captured payment of 1000 paise (INR 10)
        fixture = await createTestFixture(client, 1000);
      } finally {
        client.release();
      }

      // 5 concurrent partial refund requests of 300 paise each across 5 connections
      // Total attempted = 1500 paise against 1000 paise captured
      // Exactly 3 should succeed (900 paise <= 1000 paise)
      // The remaining 2 must fail with CUMULATIVE_REFUND_EXCEEDS_CAPTURED
      const promises = Array.from({ length: 5 }, async (_, i) => {
        const conn = await pool.connect();
        try {
          const refundId = `rfnd_conc_part_${i}_${crypto.randomBytes(4).toString("hex")}`;
          await conn.query("BEGIN;");
          const res = await conn.query(
            `SELECT public.process_payment_refund(
              'razorpay', $1, $2, 300, 'INR', 'refund.processed', '{}'::jsonb
            ) AS result;`,
            [refundId, fixture.paymentId]
          );
          await conn.query("COMMIT;");
          return { success: true, result: res.rows[0].result };
        } catch (err: any) {
          await conn.query("ROLLBACK;");
          return { success: false, error: err.message };
        } finally {
          conn.release();
        }
      });

      const results = await Promise.all(promises);
      const successes = results.filter((r) => r.success);
      const failures = results.filter((r) => !r.success);

      assert.equal(successes.length, 3, "Exactly 3 partial refunds of 300 paise must succeed (900 paise)");
      assert.equal(failures.length, 2, "Remaining 2 partial refunds must fail because 1200 > 1000 paise");

      for (const f of failures) {
        assert.match(f.error!, /CUMULATIVE_REFUND_EXCEEDS_CAPTURED/);
      }

      // Check final transaction status and ledger in database
      const verifyClient = await pool.connect();
      try {
        const txRow = await verifyClient.query(
          `SELECT status, refunded_amount_paise FROM public.payment_transactions WHERE id = $1;`,
          [fixture.transactionId]
        );
        assert.equal(txRow.rows[0].status, "partially_refunded");
        assert.equal(txRow.rows[0].refunded_amount_paise, 900);

        const refundRows = await verifyClient.query(
          `SELECT count(*) AS count FROM public.payment_refunds WHERE payment_id = $1 AND status = 'processed';`,
          [fixture.paymentId]
        );
        assert.equal(parseInt(refundRows.rows[0].count, 10), 3);
      } finally {
        verifyClient.release();
      }
    });
  });
});
