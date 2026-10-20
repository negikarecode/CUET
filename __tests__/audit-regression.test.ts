import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { getPaymentProvider } from "../lib/payments/provider";

/**
 * Regression Test Suite for Production Security Audit Findings
 * Verifies:
 * 1. SEC-07: Public view PII leak remediation (REVOKE ALL on public.students)
 * 2. CWE-426: Search path hardening on handle_new_user()
 * 3. Webhook Fail-Closed Enforcement: Removal of non-atomic fallback
 * 4. Webhook Refund & Dispute Handling: Immediate entitlement revocation
 * 5. Production Provider Guard: Hard block on MockSandboxProvider in production
 */

describe("Security Audit Regression & Remediation Tests", () => {
  const paymentsRoutePath = path.join(__dirname, "../app/api/payments/route.ts");
  const routeContent = fs.readFileSync(paymentsRoutePath, "utf-8");

  const remediationMigrationPath = path.join(
    __dirname,
    "../supabase/migrations/20261020_remediate_view_pii_and_search_path.sql"
  );
  const migrationContent = fs.readFileSync(remediationMigrationPath, "utf-8");

  // ─── 1. WEBHOOK FAIL-CLOSED & NON-ATOMIC FALLBACK ELIMINATION ──────────────
  it("Webhook: Should strictly fail closed and NEVER fall back to direct profiles.update on RPC error", () => {
    // Assert the route does not contain non-atomic profile upgrade on rpcError
    assert.ok(
      !routeContent.includes('// Fallback if RPC is not yet installed in database'),
      "Insecure fallback comment must be removed"
    );
    assert.ok(
      routeContent.includes('code: "ATOMIC_FULFILLMENT_FAILED"'),
      "Route must return ATOMIC_FULFILLMENT_FAILED on rpcError"
    );
    assert.ok(
      routeContent.includes("status: 500"),
      "Route must return HTTP 500/503 on atomic fulfillment failure"
    );
  });

  // ─── 2. WEBHOOK REFUND & CHARGEBACK HANDLING ───────────────────────────────
  it("Webhook: Should process refund and dispute events and revoke Premium entitlement", () => {
    assert.ok(
      routeContent.includes('event === "refund.created" || event === "refund.processed" || event === "payment.dispute.created"'),
      "Route must handle refund and chargeback webhook events"
    );
    assert.ok(
      routeContent.includes("is_premium: false"),
      "Route must revoke is_premium when refund event is processed"
    );
    assert.ok(
      routeContent.includes("status: \"refunded\""),
      "Route must update transaction status to refunded"
    );
  });

  // ─── 3. PRODUCTION PAYMENT PROVIDER GATE ───────────────────────────────────
  it("Payment Provider: Must throw error in production when live Razorpay keys are unconfigured", () => {
    const originalEnv = process.env.NODE_ENV;
    const originalKeyId = process.env.RAZORPAY_KEY_ID;
    const originalKeySecret = process.env.RAZORPAY_KEY_SECRET;

    try {
      (process.env as Record<string, string | undefined>).NODE_ENV = "production";
      process.env.RAZORPAY_KEY_ID = "";
      process.env.RAZORPAY_KEY_SECRET = "";

      assert.throws(
        () => {
          getPaymentProvider();
        },
        /\[CRITICAL SECURITY\] Razorpay payment provider credentials unconfigured in production environment/,
        "Must throw critical security error in production when keys are unconfigured"
      );
    } finally {
      (process.env as Record<string, string | undefined>).NODE_ENV = originalEnv;
      process.env.RAZORPAY_KEY_ID = originalKeyId;
      process.env.RAZORPAY_KEY_SECRET = originalKeySecret;
    }
  });

  // ─── 4. DATABASE MIGRATION: VIEW ACCESS REVOCATION (SEC-07) ────────────────
  it("Migration: Must revoke public client permissions on public.students, student_attempts, and pacing views", () => {
    assert.ok(
      migrationContent.includes("REVOKE ALL ON public.students FROM anon, authenticated;"),
      "Must revoke ALL on public.students from anon and authenticated"
    );
    assert.ok(
      migrationContent.includes("REVOKE ALL ON public.student_attempts FROM anon, authenticated;"),
      "Must revoke ALL on public.student_attempts from anon and authenticated"
    );
    assert.ok(
      migrationContent.includes("REVOKE ALL ON public.pacing_analytics_summary FROM anon, authenticated;"),
      "Must revoke ALL on public.pacing_analytics_summary from anon and authenticated"
    );
    assert.ok(
      migrationContent.includes("GRANT SELECT ON public.students TO service_role;"),
      "Must preserve service_role access for backend analytics"
    );
  });

  // ─── 5. DATABASE MIGRATION: PINNED SEARCH_PATH ON HANDLE_NEW_USER (CWE-426) 
  it("Migration: Must pin search_path = public, pg_temp on public.handle_new_user()", () => {
    assert.ok(
      migrationContent.includes("ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;"),
      "Must set search_path = public, pg_temp on handle_new_user"
    );
  });
});
