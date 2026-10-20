import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "child_process";
import path from "path";

/**
 * Disposable PostgreSQL 16 Regression & Safety Test Suite
 * for supabase/inspect_production_schema.sql
 *
 * Verifies:
 * 1. Clean Baseline: All 15 checks report HEALTHY with 0 findings.
 * 2. Issue 1 (Check 9): Trigger search_path with extra schema is flagged (no false HEALTHY).
 * 3. Issue 2 (Check 2): Foreign key referencing table outside public is flagged (no false HEALTHY).
 * 4. Issue 3 (Check 7): Multiple overloads of check_profile_update_privileges flagged (no false HEALTHY).
 * 5. Issue 4 (Check 14): Captured transaction unrelated to Premium flagged (no false HEALTHY).
 */

const PG_HOST = "/tmp";
const PG_PORT = "54332";
const SQL_FILE = path.join(__dirname, "../supabase/inspect_production_schema.sql");
const baselineDb = "cuet_baseline";

function runPsql(db: string, sql: string): string {
  return execSync(`psql -h ${PG_HOST} -p ${PG_PORT} -d ${db}`, {
    input: sql,
    encoding: "utf-8",
  });
}

function recreateDb(db: string) {
  try {
    execSync(`dropdb -h ${PG_HOST} -p ${PG_PORT} ${db} 2>/dev/null || true`);
  } catch {}
  execSync(`createdb -h ${PG_HOST} -p ${PG_PORT} -T ${baselineDb} ${db}`);
}

function dropDbSafe(db: string) {
  try {
    execSync(`dropdb -h ${PG_HOST} -p ${PG_PORT} ${db} 2>/dev/null || true`);
  } catch {}
}

function runInspect(db: string): Array<{ check_number: number; check_name: string; status: string; finding_count: number; details: any }> {
  const output = execSync(
    `psql -h ${PG_HOST} -p ${PG_PORT} -d ${db} -A -F '|' -X -f "${SQL_FILE}"`,
    { encoding: "utf-8" }
  );
  const lines = output.trim().split("\n");
  const rows: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || (line.startsWith("(") && line.includes("rows)"))) continue;
    const parts = line.split("|");
    if (parts.length >= 5 && parts[0] !== undefined && parts[3] !== undefined) {
      rows.push({
        check_number: parseInt(parts[0], 10),
        check_name: parts[1] || "",
        status: parts[2] || "",
        finding_count: parseInt(parts[3], 10),
        details: JSON.parse(parts.slice(4).join("|")),
      });
    }
  }
  return rows;
}

describe("PostgreSQL 16 Schema Inspection Safety & Regression Tests", () => {
  it("Baseline: All 15 checks must report HEALTHY with 0 findings on properly configured database", () => {
    const results = runInspect(baselineDb);
    assert.equal(results.length, 15, "Expected exactly 15 checks");
    for (const r of results) {
      assert.equal(
        r.status,
        "HEALTHY",
        `Check ${r.check_number} (${r.check_name}) must report HEALTHY in baseline, got ${r.status}`
      );
      assert.equal(
        r.finding_count,
        0,
        `Check ${r.check_number} (${r.check_name}) must have 0 findings in baseline, got ${r.finding_count}`
      );
    }
  });

  it("Check 9 Safety: Trigger invoking same-named function in another schema must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_trigger_shadow_schema";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `CREATE SCHEMA shadow;
         CREATE OR REPLACE FUNCTION shadow.check_profile_update_privileges()
         RETURNS trigger LANGUAGE plpgsql SET search_path = public, pg_temp
         AS $$ BEGIN RETURN NEW; END; $$;
         DROP TRIGGER trg_protect_profiles_privileges ON public.profiles;
         CREATE TRIGGER trg_protect_profiles_privileges BEFORE UPDATE ON public.profiles
         FOR EACH ROW EXECUTE FUNCTION shadow.check_profile_update_privileges();`
      );

      const results = runInspect(testDb);
      const check9 = results.find((r) => r.check_number === 9);
      assert.ok(check9, "Check 9 must be present");
      assert.equal(check9.status, "INVESTIGATION_REQUIRED", "Check 9 must report INVESTIGATION_REQUIRED when trigger invokes function in non-public schema");
      assert.ok(check9.finding_count >= 1, "Check 9 finding count must be >= 1");
      assert.equal(check9.details.trigger_details.function_schema, "shadow", "Trigger details must report function_schema = shadow");
      assert.ok(
        JSON.stringify(check9.details).includes("shadow.check_profile_update_privileges"),
        "Check 9 details must explicitly flag shadow.check_profile_update_privileges"
      );
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 2 Safety: CHECK constraint with extra OR branch must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_check_or_bypass";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `ALTER TABLE public.promotional_slots DROP CONSTRAINT promotional_slots_status_check;
         ALTER TABLE public.promotional_slots ADD CONSTRAINT promotional_slots_status_check
         CHECK (status IN ('reserved', 'claimed', 'released') OR true);`
      );

      const results = runInspect(testDb);
      const check2 = results.find((r) => r.check_number === 2);
      assert.ok(check2, "Check 2 must be present");
      assert.equal(check2.status, "INVESTIGATION_REQUIRED", "Check 2 must report INVESTIGATION_REQUIRED when CHECK constraint contains OR true");
      assert.ok(check2.finding_count >= 1, "Check 2 finding count must be >= 1");
      const missing = check2.details.missing_required_constraints;
      assert.ok(
        missing.some((m: any) => m.constraint.includes("CHECK status IN (reserved, claimed, released)")),
        "Check 2 must report definition mismatch on promotional_slots status"
      );
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 2 Safety: Positive amount constraint with extra OR bypass must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_amount_or_bypass";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `ALTER TABLE public.payment_orders DROP CONSTRAINT payment_orders_amount_paise_check;
         ALTER TABLE public.payment_orders ADD CONSTRAINT payment_orders_amount_paise_check
         CHECK (amount_paise > 0 OR amount_paise = -1);`
      );

      const results = runInspect(testDb);
      const check2 = results.find((r) => r.check_number === 2);
      assert.ok(check2, "Check 2 must be present");
      assert.equal(check2.status, "INVESTIGATION_REQUIRED", "Check 2 must report INVESTIGATION_REQUIRED when amount CHECK contains OR");
      assert.ok(check2.finding_count >= 1, "Check 2 finding count must be >= 1");
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 2 Safety: Slot number range constraint altered from [1, 100] must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_slot_range_altered";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `ALTER TABLE public.promotional_slots DROP CONSTRAINT promotional_slots_slot_number_check;
         ALTER TABLE public.promotional_slots ADD CONSTRAINT promotional_slots_slot_number_check
         CHECK (slot_number >= 0 AND slot_number <= 100);`
      );

      const results = runInspect(testDb);
      const check2 = results.find((r) => r.check_number === 2);
      assert.ok(check2, "Check 2 must be present");
      assert.equal(check2.status, "INVESTIGATION_REQUIRED", "Check 2 must report INVESTIGATION_REQUIRED when slot range allows 0");
      assert.ok(check2.finding_count >= 1, "Check 2 finding count must be >= 1");
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 8 Safety: Function with EXECUTE granted to PUBLIC must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_func_public_execute";
    try {
      recreateDb(testDb);
      runPsql(testDb, "GRANT EXECUTE ON FUNCTION public.fulfill_payment_order TO PUBLIC;");

      const results = runInspect(testDb);
      const check8 = results.find((r) => r.check_number === 8);
      assert.ok(check8, "Check 8 must be present");
      assert.equal(check8.status, "INVESTIGATION_REQUIRED", "Check 8 must report INVESTIGATION_REQUIRED when function is granted to PUBLIC");
      assert.ok(check8.finding_count >= 1, "Check 8 finding count must be >= 1");
      const violations = check8.details.violations;
      assert.ok(
        violations.some((v: any) => v.target_role === "PUBLIC" && v.reason.includes("explicitly grants EXECUTE to PUBLIC")),
        "Check 8 must report PUBLIC grant violation"
      );
      assert.ok(
        violations.some((v: any) => v.target_role === "anon" && v.reason.includes("effectively executable by anonymous")),
        "Check 8 must report anonymous role exposure"
      );
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 8 Safety: Unexpected public RPC function must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_unexpected_rpc";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `CREATE FUNCTION public.unauthorized_rpc_leak() RETURNS text
         LANGUAGE plpgsql AS $$ BEGIN RETURN 'leaked'; END; $$;`
      );

      const results = runInspect(testDb);
      const check8 = results.find((r) => r.check_number === 8);
      assert.ok(check8, "Check 8 must be present");
      assert.equal(check8.status, "INVESTIGATION_REQUIRED", "Check 8 must report INVESTIGATION_REQUIRED for unexpected RPC");
      assert.ok(check8.finding_count >= 1, "Check 8 finding count must be >= 1");
      const violations = check8.details.violations;
      assert.ok(
        violations.some((v: any) => v.function_name === "unauthorized_rpc_leak"),
        "Check 8 must flag unexpected function unauthorized_rpc_leak"
      );
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 14 Safety: Substring match '%pass%' and standalone is_promotional = TRUE must NOT verify Premium", () => {
    const testDb = "cuet_test_substring_and_promotional_rejection";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `SET ROLE postgres;
         -- Candidate 1: Captured payment for 'counseling_pass' (contains '%pass%' but NOT on allowlist)
         INSERT INTO auth.users (id, email) VALUES ('11111111-1111-1111-1111-111111111111', 'cand1@example.com');
         UPDATE public.profiles
         SET full_name = 'Candidate Substring Pass',
             is_premium = true,
             subscription_tier = 'all_access_pass',
             subscription_expires_at = NOW() + INTERVAL '1 year'
         WHERE id = '11111111-1111-1111-1111-111111111111';
         INSERT INTO public.payment_orders (id, user_id, provider, provider_order_id, plan_id, amount_paise, is_promotional, status)
         VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'razorpay', 'order_sub_123', 'counseling_pass', 50000, false, 'paid');
         INSERT INTO public.payment_transactions (id, order_id, user_id, provider, provider_payment_id, amount_paise, status)
         VALUES ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'razorpay', 'pay_sub_123', 50000, 'captured');

         -- Candidate 2: Captured payment for non-premium order with is_promotional = TRUE alone
         INSERT INTO auth.users (id, email) VALUES ('44444444-4444-4444-4444-444444444444', 'cand2@example.com');
         UPDATE public.profiles
         SET full_name = 'Candidate Promo Non-Premium',
             is_premium = true,
             subscription_tier = 'all_access_pass',
             subscription_expires_at = NOW() + INTERVAL '1 year'
         WHERE id = '44444444-4444-4444-4444-444444444444';
         INSERT INTO public.payment_orders (id, user_id, provider, provider_order_id, plan_id, amount_paise, is_promotional, status)
         VALUES ('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'razorpay', 'order_promo_123', 'tshirt_merch', 49900, true, 'paid');
         INSERT INTO public.payment_transactions (id, order_id, user_id, provider, provider_payment_id, amount_paise, status)
         VALUES ('66666666-6666-6666-6666-666666666666', '55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'razorpay', 'pay_promo_123', 49900, 'captured');`
      );

      const results = runInspect(testDb);
      const check14 = results.find((r) => r.check_number === 14);
      assert.ok(check14, "Check 14 must be present");
      assert.equal(check14.status, "INVESTIGATION_REQUIRED", "Check 14 must report INVESTIGATION_REQUIRED for non-allowlist plans");
      assert.equal(check14.details.active_backed_count, 0, "active_backed_count must be 0 (neither plan should verify Premium)");
      assert.equal(check14.details.active_unrelated_payment_count, 2, "Both candidates must be flagged as active_unrelated_payment_count");
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 14 Grounded Allowlist: Verified Premium plan correctly confirms payment backing", () => {
    const testDb = "cuet_test_verified_premium_plan";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `SET ROLE postgres;
         INSERT INTO auth.users (id, email) VALUES ('77777777-7777-7777-7777-777777777777', 'verified@example.com');
         UPDATE public.profiles
         SET full_name = 'Verified Buyer',
             is_premium = true,
             subscription_tier = 'all_access_pass',
             subscription_expires_at = NOW() + INTERVAL '1 year'
         WHERE id = '77777777-7777-7777-7777-777777777777';
         INSERT INTO public.payment_orders (id, user_id, provider, provider_order_id, plan_id, amount_paise, is_promotional, status)
         VALUES ('88888888-8888-8888-8888-888888888888', '77777777-7777-7777-7777-777777777777', 'razorpay', 'order_verified_123', 'all_access_pass_799', 79900, false, 'paid');
         INSERT INTO public.payment_transactions (id, order_id, user_id, provider, provider_payment_id, amount_paise, status)
         VALUES ('99999999-9999-9999-9999-999999999999', '88888888-8888-8888-8888-888888888888', '77777777-7777-7777-7777-777777777777', 'razorpay', 'pay_verified_123', 79900, 'captured');`
      );

      const results = runInspect(testDb);
      const check14 = results.find((r) => r.check_number === 14);
      assert.ok(check14, "Check 14 must be present");
      assert.equal(check14.status, "HEALTHY", "Check 14 must report HEALTHY when candidate has verified allowlist Premium payment");
      assert.equal(check14.finding_count, 0, "finding_count must be 0 for verified Premium payment");
      assert.equal(check14.details.active_backed_count, 1, "active_backed_count must be 1");
      assert.equal(check14.details.active_unbacked_count, 0, "active_unbacked_count must be 0");
      assert.equal(check14.details.active_unrelated_payment_count, 0, "active_unrelated_payment_count must be 0");
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 2 Safety: Foreign key referencing same-named table outside public must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_foreign_key_schema";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `CREATE SCHEMA shadow;
         CREATE TABLE shadow.profiles (id UUID PRIMARY KEY);
         ALTER TABLE public.payment_orders DROP CONSTRAINT payment_orders_user_id_fkey;
         ALTER TABLE public.payment_orders ADD CONSTRAINT payment_orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES shadow.profiles(id);`
      );

      const results = runInspect(testDb);
      const check2 = results.find((r) => r.check_number === 2);
      assert.ok(check2, "Check 2 must be present");
      assert.equal(check2.status, "INVESTIGATION_REQUIRED", "Check 2 must report INVESTIGATION_REQUIRED when FK targets shadow schema");
      assert.ok(check2.finding_count >= 1, "Check 2 finding count must be >= 1");
      const missing = check2.details.missing_required_constraints;
      assert.ok(
        missing.some((m: any) => m.constraint.includes("public.profiles(id)")),
        "Check 2 must report missing foreign key reference to public.profiles(id)"
      );
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 7 Safety: Multiple overloads of check_profile_update_privileges must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_function_overloads";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `CREATE OR REPLACE FUNCTION public.check_profile_update_privileges(dummy text)
         RETURNS text LANGUAGE plpgsql SET search_path = public, pg_temp
         AS $$ BEGIN RETURN dummy; END; $$;`
      );

      const results = runInspect(testDb);
      const check7 = results.find((r) => r.check_number === 7);
      assert.ok(check7, "Check 7 must be present");
      assert.equal(check7.status, "INVESTIGATION_REQUIRED", "Check 7 must report INVESTIGATION_REQUIRED on function overload");
      assert.ok(check7.finding_count >= 1, "Check 7 finding count must be >= 1");
      const overloads = check7.details.overloads_detected;
      assert.ok(
        overloads.some((o: any) => o.function === "check_profile_update_privileges" && o.count === 2),
        "Check 7 must detect 2 overloads for check_profile_update_privileges"
      );
    } finally {
      dropDbSafe(testDb);
    }
  });

  it("Check 14 Safety: Captured transaction unrelated to Premium purchase must be flagged as INVESTIGATION_REQUIRED", () => {
    const testDb = "cuet_test_unrelated_payment";
    try {
      recreateDb(testDb);
      runPsql(
        testDb,
        `SET ROLE postgres;
         INSERT INTO auth.users (id, email) VALUES ('11111111-1111-1111-1111-111111111111', 'candidate@example.com');
         UPDATE public.profiles
         SET full_name = 'Unrelated Buyer',
             is_premium = true,
             subscription_tier = 'all_access_pass',
             subscription_expires_at = NOW() + INTERVAL '1 year'
         WHERE id = '11111111-1111-1111-1111-111111111111';
         INSERT INTO public.payment_orders (id, user_id, provider, provider_order_id, plan_id, amount_paise, status)
         VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'razorpay', 'order_coins_123', 'practice_coins_100', 9900, 'paid');
         INSERT INTO public.payment_transactions (id, order_id, user_id, provider, provider_payment_id, amount_paise, status)
         VALUES ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'razorpay', 'pay_coins_123', 9900, 'captured');`
      );

      const results = runInspect(testDb);
      const check14 = results.find((r) => r.check_number === 14);
      assert.ok(check14, "Check 14 must be present");
      assert.equal(check14.status, "INVESTIGATION_REQUIRED", "Check 14 must report INVESTIGATION_REQUIRED for unrelated payment");
      assert.ok(check14.finding_count >= 1, "Check 14 finding count must be >= 1");
      assert.equal(check14.details.active_backed_count, 0, "active_backed_count must be 0 for candidate with only unrelated payment");
      assert.equal(check14.details.active_unrelated_payment_count, 1, "active_unrelated_payment_count must be 1");
      const unbacked = check14.details.unbacked_profiles;
      assert.ok(
        unbacked.some((u: any) => u.classification === "CURRENTLY_ACTIVE_PREMIUM_UNRELATED_PAYMENT"),
        "Candidate must be classified as CURRENTLY_ACTIVE_PREMIUM_UNRELATED_PAYMENT"
      );
    } finally {
      dropDbSafe(testDb);
    }
  });
});
