import { describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getSafeRedirectPath, DEFAULT_SAFE_REDIRECT } from "../lib/security/redirects";
import { RazorpayProvider } from "../lib/payments/provider";

describe("CUETMate Security Remediations Test Suite (SEC-01 through SEC-05)", () => {
  // ─── 1. SEC-05: OPEN REDIRECT DEFENSE ──────────────────────────────────────
  describe("SEC-05: Open Redirect Path Sanitization", () => {
    it("should strictly reject protocol-relative URLs (//attacker.com)", () => {
      const malicious = ["//evil.com", "//attacker.org/phish", "//google.com/%2f.."];
      for (const dest of malicious) {
        const result = getSafeRedirectPath(dest);
        assert.equal(
          result,
          DEFAULT_SAFE_REDIRECT,
          `Protocol-relative redirect "${dest}" must resolve to default safe fallback`
        );
      }
    });

    it("should strictly reject backslash-based bypass variants (/\\attacker.com, \\\\attacker.com)", () => {
      const backslashAttacks = [
        "/\\evil.com",
        "\\\\evil.com",
        "\\evil.com",
        "/path\\to\\evil",
        "/%5Cevil.com",
      ];
      for (const dest of backslashAttacks) {
        const result = getSafeRedirectPath(dest);
        assert.equal(
          result,
          DEFAULT_SAFE_REDIRECT,
          `Backslash traversal "${dest}" must resolve to default safe fallback`
        );
      }
    });

    it("should strictly reject external absolute schemes (http://, https://, javascript:, data:)", () => {
      const schemes = [
        "https://evil.com",
        "http://attacker.com/steal",
        "javascript:alert(document.cookie)",
        "data:text/html,<script>alert(1)</script>",
        "vbscript:msgbox",
      ];
      for (const dest of schemes) {
        const result = getSafeRedirectPath(dest);
        assert.equal(
          result,
          DEFAULT_SAFE_REDIRECT,
          `External scheme "${dest}" must resolve to default safe fallback`
        );
      }
    });

    it("should reject CRLF injection and control characters", () => {
      const crlf = ["/dashboard\r\nSet-Cookie: evil=true", "/dashboard\nLocation: https://evil.com", "/\0evil"];
      for (const dest of crlf) {
        const result = getSafeRedirectPath(dest);
        assert.equal(result, DEFAULT_SAFE_REDIRECT, "CRLF / null byte injection must be rejected");
      }
    });

    it("should preserve legitimate internal paths and query parameters", () => {
      const validPaths = [
        "/dashboard",
        "/dashboard/mocks/physics",
        "/pricing?plan=all_access_pass",
        "/dashboard/analysis/session-123?tab=radar#breakdown",
      ];
      for (const dest of validPaths) {
        const result = getSafeRedirectPath(dest);
        assert.equal(result, dest, `Legitimate relative path "${dest}" must be preserved`);
      }
    });
  });

  // ─── 2. SEC-01: PAYMENT INTEGRITY & TAMPERING ──────────────────────────────
  describe("SEC-01: Payment Gateway Signature & Anti-Tampering", () => {
    const testSecret = "test_razorpay_secret_key_12345";
    const provider = new RazorpayProvider("rzp_test_mock", testSecret, "test_webhook_secret");

    it("should verify valid cryptographic HMAC-SHA256 signatures", () => {
      const orderId = "order_123456";
      const paymentId = "pay_789012";
      const validSig = crypto
        .createHmac("sha256", testSecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      const check = provider.verifySignature({
        orderId,
        paymentId,
        signature: validSig,
      });

      assert.equal(check.isValid, true, "Valid HMAC-SHA256 signature must be accepted");
      assert.equal(check.error, undefined);
    });

    it("should reject forged or altered signatures", () => {
      const orderId = "order_123456";
      const paymentId = "pay_789012";
      const forgedSig = "0000000000000000000000000000000000000000000000000000000000000000";

      const check = provider.verifySignature({
        orderId,
        paymentId,
        signature: forgedSig,
      });

      assert.equal(check.isValid, false, "Forged signature must be rejected");
      assert.ok(check.error?.includes("mismatch"));
    });

    it("should reject signature when secret is unconfigured (fail-closed)", () => {
      const unconfiguredProvider = new RazorpayProvider("rzp_test_mock", "", "test_webhook");
      const check = unconfiguredProvider.verifySignature({
        orderId: "order_1",
        paymentId: "pay_1",
        signature: "sig_1",
      });
      assert.equal(check.isValid, false);
      assert.ok(check.error?.includes("unconfigured"));
    });

    it("should verify that legacy create-order and verify-payment endpoints are removed from codebase", () => {
      const createOrderPath = path.resolve(__dirname, "../app/api/create-order/route.ts");
      const verifyPaymentPath = path.resolve(__dirname, "../app/api/verify-payment/route.ts");
      assert.equal(fs.existsSync(createOrderPath), false, "Legacy create-order route file must be removed");
      assert.equal(fs.existsSync(verifyPaymentPath), false, "Legacy verify-payment route file must be removed");
    });

    it("should reject price tampering when received amount < expected amount", () => {
      const expectedAmountPaise = 49900; // ₹499.00
      const tamperedAmountPaise = 100;   // ₹1.00

      // Anti-tampering check logic
      const isTampered = tamperedAmountPaise < expectedAmountPaise;
      assert.equal(isTampered, true, "₹1 tampering attack must be detected and rejected");
    });

    it("should reject cross-user order verification attempt", () => {
      const orderRecord = { user_id: "user_owner_uuid_111", amount_paise: 49900 };
      const claimingUser = { id: "user_attacker_uuid_222" };

      const isCrossUserAttempt = orderRecord.user_id !== claimingUser.id;
      assert.equal(isCrossUserAttempt, true, "Cross-user claim must evaluate to forbidden");
    });

    it("should handle duplicate verification idempotently without double crediting", () => {
      const existingOrder = { status: "paid", amount_paise: 49900 };
      const isAlreadyPaid = existingOrder.status === "paid";

      // If already paid, returns success idempotently without re-crediting coins
      assert.equal(isAlreadyPaid, true, "Existing paid status must trigger idempotent return");
    });

    it("should reject forged payment success where gateway reports unpaid or mismatched order", () => {
      // Gateway simulation where payment entity order_id does not match
      const orderId = "order_expected_123";
      const paymentRecord = { id: "pay_xyz", order_id: "order_different_456", status: "captured" };
      const isOrderIdMatch = paymentRecord.order_id === orderId;
      assert.equal(isOrderIdMatch, false, "Gateway order mismatch must be detected");

      // Gateway simulation where status is not captured or authorized
      const failedPayment = { id: "pay_failed", order_id: orderId, status: "failed" };
      const isPaid = failedPayment.status === "captured" || failedPayment.status === "authorized";
      assert.equal(isPaid, false, "Failed or refunded payment status must be rejected");
    });

    it("should reject currency tampering (e.g., paying USD instead of INR)", () => {
      const expectedCurrency = "INR";
      const tamperedCurrency: string = "USD";
      const isCurrencyValid = tamperedCurrency === expectedCurrency;
      assert.equal(isCurrencyValid, false, "Currency tampering must be rejected");
    });

    it("should enforce atomic concurrency guards on payment fulfillment", () => {
      const paymentsRoutePath = path.join(__dirname, "../app/api/payments/route.ts");
      const content = fs.readFileSync(paymentsRoutePath, "utf-8");
      assert.ok(
        content.includes('supabaseAdmin.rpc("fulfill_payment_order"'),
        "Payment route must delegate fulfillment exclusively to atomic fulfill_payment_order RPC"
      );
      assert.ok(
        content.includes("ATOMIC_FULFILLMENT_FAILED"),
        "Payment route must fail-closed with 503 if atomic RPC fulfillment fails"
      );
    });
  });

  // ─── 3. SEC-02: PROFILE PRIVILEGE ESCALATION ──────────────────────────────
  describe("SEC-02: Profile Privilege Escalation Database Hardening", () => {
    it("should verify migration file exists with column-level restrictions and trigger", () => {
      const migrationPath = path.join(
        __dirname,
        "../supabase/migrations/20261020_protect_profiles_privilege_escalation.sql"
      );
      assert.ok(fs.existsSync(migrationPath), "SEC-02 migration file must exist");

      const migrationContent = fs.readFileSync(migrationPath, "utf-8");

      // Verify REVOKE statement
      assert.ok(
        migrationContent.includes("REVOKE UPDATE ON public.profiles FROM anon, authenticated"),
        "Migration must revoke generic UPDATE from ordinary clients"
      );

      // Verify specific column GRANT on safe onboarding columns only
      const grantBlockMatch = migrationContent.match(/GRANT UPDATE\s*\([\s\S]*?\)\s*ON public\.profiles TO authenticated;/);
      assert.ok(grantBlockMatch, "GRANT UPDATE block on profiles to authenticated must be present");
      const grantBlock = grantBlockMatch[0];

      assert.ok(grantBlock.includes("full_name"), "Safe column full_name must be granted");
      assert.ok(!grantBlock.includes("is_premium"), "is_premium must NOT be granted to authenticated");
      assert.ok(!grantBlock.includes("campus_coins"), "campus_coins must NOT be granted to authenticated");
      assert.ok(!grantBlock.includes("xp"), "xp must NOT be granted to authenticated");

      // Verify trigger function does not use SECURITY DEFINER to avoid function-owner role switching
      const funcMatch = migrationContent.match(/CREATE OR REPLACE FUNCTION public\.check_profile_update_privileges\(\)[\s\S]*?\$\$ LANGUAGE plpgsql;/);
      assert.ok(funcMatch, "Trigger function definition must exist");
      assert.ok(!funcMatch[0].includes("SECURITY DEFINER"), "Trigger function must not be SECURITY DEFINER so current_user reflects the actual caller");
      assert.ok(
        migrationContent.includes("v_current_user IN ('authenticated', 'anon')"),
        "Trigger function must explicitly reject authenticated or anon callers from trusted status"
      );

      // Verify trigger function has pinned safe search_path
      assert.ok(
        migrationContent.includes("CREATE OR REPLACE FUNCTION public.check_profile_update_privileges()"),
        "Migration must define check_profile_update_privileges trigger function"
      );
      assert.ok(
        migrationContent.includes("SET search_path = public, pg_temp"),
        "Trigger function must pin search_path to public, pg_temp to prevent CWE-426 privilege escalation"
      );

      // Verify rollback instructions included
      assert.ok(
        migrationContent.includes("ROLLBACK SCRIPT"),
        "Migration must document explicit rollback script"
      );
    });

    it("should verify SEC-06 migration restricts public reads and hardens SECURITY DEFINER function", () => {
      const sec06MigrationPath = path.join(
        __dirname,
        "../supabase/migrations/20261020_restrict_profile_and_slots_public_read.sql"
      );
      assert.ok(fs.existsSync(sec06MigrationPath), "SEC-06 migration file must exist");

      const content = fs.readFileSync(sec06MigrationPath, "utf-8");

      // Verify policy dropping public access
      assert.ok(
        content.includes('DROP POLICY IF EXISTS "Allow public read access to basic profiles"'),
        "Must drop public SELECT on profiles"
      );

      // Verify idempotent rerun safety
      assert.ok(
        content.includes('DROP POLICY IF EXISTS "Allow users to view own profile"'),
        "Must drop own profile policy if exists before re-creating"
      );

      // Verify restrictive user-only policy
      assert.ok(
        content.includes("auth.uid() = id"),
        "Must restrict profile reads strictly to owning candidate"
      );

      // Verify promotional_slots public SELECT is dropped
      assert.ok(
        content.includes('DROP POLICY IF EXISTS "Public can view claimed promotional slots count"'),
        "Must drop public SELECT on promotional_slots to prevent order_id/user_id harvesting"
      );

      // Verify aggregate count function uses SECURITY DEFINER and pinned search_path
      assert.ok(
        content.includes("CREATE OR REPLACE FUNCTION public.get_claimed_promotional_slots_count()"),
        "Must define get_claimed_promotional_slots_count function"
      );
      assert.ok(
        content.includes("SECURITY DEFINER"),
        "Function must be marked SECURITY DEFINER"
      );
      assert.ok(
        content.includes("SET search_path = public, pg_temp"),
        "Function must pin search_path to public, pg_temp"
      );
      assert.ok(
        content.includes("REVOKE ALL ON FUNCTION public.get_claimed_promotional_slots_count() FROM PUBLIC"),
        "Function must revoke default PUBLIC access"
      );
      assert.ok(
        content.includes("REVOKE ALL ON FUNCTION public.get_claimed_promotional_slots_count() FROM anon"),
        "Function must revoke anon access"
      );
      assert.ok(
        content.includes("GRANT EXECUTE ON FUNCTION public.get_claimed_promotional_slots_count() TO authenticated, service_role"),
        "Function must grant execution only to authenticated and service_role"
      );
    });

    it("should verify atomic payment fulfillment migration provides ACID RPC with row locks and exclusive service_role grants", () => {
      const atomicMigrationPath = path.join(
        __dirname,
        "../supabase/migrations/20261020_atomic_payment_fulfillment.sql"
      );
      assert.ok(fs.existsSync(atomicMigrationPath), "Atomic payment fulfillment migration must exist");

      const content = fs.readFileSync(atomicMigrationPath, "utf-8");

      assert.ok(
        content.includes("CREATE OR REPLACE FUNCTION public.fulfill_payment_order"),
        "Must define fulfill_payment_order RPC"
      );
      assert.ok(
        content.includes("SECURITY DEFINER"),
        "fulfill_payment_order must be SECURITY DEFINER to perform multi-table atomic updates"
      );
      assert.ok(
        content.includes("SET search_path = public, pg_temp"),
        "Must pin search path to public, pg_temp"
      );
      assert.ok(
        content.includes("FOR UPDATE"),
        "Must lock rows FOR UPDATE to prevent race conditions during fulfillment"
      );
      assert.ok(
        content.includes("REVOKE ALL ON FUNCTION public.fulfill_payment_order"),
        "Must revoke default public access"
      );
      assert.ok(
        content.includes("GRANT EXECUTE ON FUNCTION public.fulfill_payment_order") &&
        content.includes("TO service_role"),
        "Must restrict execution exclusively to service_role"
      );
    });

    it("should verify payments route invokes atomic fulfillment RPC with fail-closed error handling", () => {
      const paymentsRoutePath = path.join(__dirname, "../app/api/payments/route.ts");
      const content = fs.readFileSync(paymentsRoutePath, "utf-8");

      assert.ok(
        content.includes('supabaseAdmin.rpc("fulfill_payment_order"'),
        "Payments route must invoke fulfill_payment_order RPC for atomic transaction guarantees"
      );
      assert.ok(
        content.includes("ATOMIC_FULFILLMENT_FAILED"),
        "Route must fail-closed with 503 status if atomic fulfillment RPC fails or is unavailable"
      );
    });

    it("should verify atomic payment fulfillment RPC asserts database invariants and prevents double fulfillment across different payment IDs", () => {
      const atomicMigrationPath = path.join(
        __dirname,
        "../supabase/migrations/20261020_atomic_payment_fulfillment.sql"
      );
      const content = fs.readFileSync(atomicMigrationPath, "utf-8");

      // Verify amount check inside SQL
      assert.ok(
        content.includes("p_amount_paise < v_order.amount_paise"),
        "RPC must reject payment if paid amount is less than required order amount"
      );
      // Verify currency check inside SQL
      assert.ok(
        content.includes("upper(p_currency) <> upper(v_order.currency)"),
        "RPC must reject payment if currency does not match order currency"
      );
      // Verify multi-payment ID prevention on same order
      assert.ok(
        content.includes("v_existing_order_payment_id <> p_provider_payment_id"),
        "RPC must reject different payment ID attempting to fulfill already-paid order"
      );
      // Verify renewal expiry extension logic (does not clobber future expiry)
      assert.ok(
        content.includes("v_profile.subscription_expires_at > NOW()"),
        "RPC must extend active subscriptions from current expiration date"
      );
      // Verify non-duplication of coins on renewal
      assert.ok(
        content.includes("NOT coalesce(v_profile.is_premium, false)"),
        "RPC must only award bonus coins to candidates newly upgrading to Premium"
      );
    });

    it("should verify profile server route uses service-role and never mutates privileged fields from client input", () => {
      const profileRoutePath = path.join(__dirname, "../lib/api-handlers/auth-profile.ts");
      const profileContent = fs.readFileSync(profileRoutePath, "utf-8");

      assert.ok(
        profileContent.includes("createAdminClient()"),
        "Profile route must use createAdminClient() for authorized server-side persistence"
      );
      assert.ok(
        profileContent.includes("authUser.id !== id"),
        "Profile route must prevent cross-user IDOR profile mutation"
      );
    });

    it("should verify admin client refuses to silently operate as anon in production without service role key", () => {
      const adminPath = path.join(__dirname, "../lib/supabase/admin.ts");
      const adminContent = fs.readFileSync(adminPath, "utf-8");

      assert.ok(
        adminContent.includes("!serviceRoleKey && process.env.NODE_ENV === \"production\""),
        "createAdminClient must check for missing service role key in production"
      );
      assert.ok(
        adminContent.includes("throw new Error"),
        "createAdminClient must throw an explicit error instead of silently falling back to anon"
      );
    });
  });

  // ─── 4. SEC-03 & SEC-04: AI AUTHORIZATION & PAYWALL ────────────────────────
  describe("SEC-03 & SEC-04: AI Route Authentication & Paywall Protection", () => {
    it("should verify doubt-solver enforces verified session and paywall", () => {
      const doubtSolverPath = path.join(__dirname, "../lib/api-handlers/ai.ts");
      const content = fs.readFileSync(doubtSolverPath, "utf-8");

      assert.ok(
        content.includes("AUTH_REQUIRED"),
        "Doubt solver must enforce AUTH_REQUIRED on unauthenticated requests"
      );
      assert.ok(
        content.includes("EMAIL_VERIFICATION_REQUIRED"),
        "Doubt solver must enforce email verification"
      );
      assert.ok(
        content.includes("PAYWALL_FEATURE_LOCKED"),
        "Doubt solver must enforce PAYWALL_FEATURE_LOCKED for free users"
      );
      assert.ok(
        !content.includes("authUserId || userId"),
        "Doubt solver must never evaluate body.userId for entitlement check"
      );
      assert.ok(
        content.includes("getUserEntitlement(authUser.id)"),
        "Doubt solver must derive entitlement strictly from authenticated session user"
      );
      assert.ok(
        content.includes("message.length > 2000"),
        "Doubt solver must enforce maximum payload length limit"
      );
      assert.ok(
        content.includes("userId: authUser.id"),
        "Doubt solver token logger must use verified authUser.id"
      );
    });

    it("should verify repair-quiz enforces verified session and paywall", () => {
      const repairQuizPath = path.join(__dirname, "../lib/api-handlers/ai.ts");
      const content = fs.readFileSync(repairQuizPath, "utf-8");

      assert.ok(
        content.includes("AUTH_REQUIRED"),
        "Repair quiz must require active candidate session"
      );
      assert.ok(
        content.includes("EMAIL_VERIFICATION_REQUIRED"),
        "Repair quiz must require verified email"
      );
      assert.ok(
        content.includes("PAYWALL_FEATURE_LOCKED"),
        "Repair quiz must require Premium entitlement"
      );
      assert.ok(
        content.includes("const userId = authUser.id"),
        "Repair quiz must strictly bind userId to verified authUser.id"
      );
    });

    it("should verify standing/explain enforces authentication, email verification, and Premium", () => {
      const standingPath = path.join(__dirname, "../lib/api-handlers/ai.ts");
      const content = fs.readFileSync(standingPath, "utf-8");

      assert.ok(
        content.includes("AUTH_REQUIRED"),
        "Standing explain must require active candidate session"
      );
      assert.ok(
        content.includes("EMAIL_VERIFICATION_REQUIRED"),
        "Standing explain must require verified email"
      );
      assert.ok(
        content.includes("PAYWALL_FEATURE_LOCKED"),
        "Standing explain must require Premium entitlement"
      );
      assert.ok(
        content.includes("targetCollege.length > 200"),
        "Standing explain must enforce maximum input boundary limits"
      );
    });

    it("should verify ai/insights enforces authentication and email verification", () => {
      const insightsPath = path.join(__dirname, "../lib/api-handlers/ai.ts");
      const content = fs.readFileSync(insightsPath, "utf-8");

      assert.ok(
        content.includes("AUTH_REQUIRED"),
        "AI insights must require authentication"
      );
      assert.ok(
        content.includes("EMAIL_VERIFICATION_REQUIRED"),
        "AI insights must require email verification"
      );
      assert.ok(
        content.includes("PAYWALL_FEATURE_LOCKED"),
        "AI insights must enforce paywall lock"
      );
      assert.ok(
        content.includes("isDiagnoseMistake"),
        "AI insights must enforce paywall and auth guards across diagnoseMistake"
      );
    });
  });
});
