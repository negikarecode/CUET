import assert from "assert";
import fs from "fs";
import path from "path";
import { AI_COACH_CONFIG } from "../lib/ai-coach/config";
import {
  getCurrentISTDate,
  getNextMidnightIST,
  isGenerationLocked,
  acquireGenerationLock,
  releaseGenerationLock,
} from "../lib/ai-coach/quota-engine";
import { getRateLimitPolicy } from "../lib/security/rateLimitPolicy";

async function main() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: AI Coach Quota & Cost Abuse Defense (Security Fix)");
  console.log("============================================================\n");

  let passed = 0;

  // 1. Rate Limiting Protection Policy
  assert.strictEqual(AI_COACH_CONFIG.DAILY_REPORT_LIMIT, 3);
  const policy = getRateLimitPolicy("ai_coach:generate");
  assert.strictEqual(policy.max, 5);
  assert.strictEqual(policy.windowSeconds, 60);
  assert.strictEqual(policy.failClosed, true);
  console.log("  PASS: ai_coach:generate enforces 5 req/min rate limit with failClosed=true");
  passed++;

  // 2. IST Date & Midnight Math (Prevents Client Timezone Bypass)
  const istDate = getCurrentISTDate();
  assert.match(istDate, /^\d{4}-\d{2}-\d{2}$/);
  console.log(`  PASS: Server authoritative IST date format verified: ${istDate}`);
  passed++;

  const nextMidnight = getNextMidnightIST();
  assert.ok(new Date(nextMidnight).getTime() > Date.now());
  console.log(`  PASS: Next midnight IST ISO correctly calculated in the future`);
  passed++;

  // 3. Double-Click Lock Safety
  const testUser = "test-user-quota-defense";
  const testSub = "Physics";
  assert.strictEqual(isGenerationLocked(testUser, testSub), false);
  assert.strictEqual(acquireGenerationLock(testUser, testSub), true);
  // Subsequent acquisition rejected while locked
  assert.strictEqual(acquireGenerationLock(testUser, testSub), false);
  assert.strictEqual(isGenerationLocked(testUser, testSub), true);
  releaseGenerationLock(testUser, testSub);
  assert.strictEqual(isGenerationLocked(testUser, testSub), false);
  console.log("  PASS: Generation lock prevents rapid double-clicks");
  passed++;

  // 4. SQL Migration Integrity Check
  const migrationPath = path.join(
    process.cwd(),
    "supabase/migrations/20261027_atomic_ai_usage_and_rls_lockdown.sql"
  );
  assert.ok(fs.existsSync(migrationPath), "Migration file must exist on disk");
  const sql = fs.readFileSync(migrationPath, "utf-8");

  assert.ok(sql.includes("FUNCTION public.reserve_ai_usage_slot"));
  assert.ok(sql.includes("FUNCTION public.refund_ai_usage_slot"));
  assert.ok(sql.includes("WHERE public.ai_usage.count < 3"));
  assert.ok(sql.includes("REVOKE INSERT, DELETE, TRUNCATE ON public.ai_reports FROM anon, authenticated"));
  assert.ok(sql.includes("REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.progress_cards FROM anon, authenticated"));
  console.log("  PASS: Migration script locks down public.ai_reports and public.progress_cards client writes");
  passed++;

  console.log(`\nAll ${passed} security tests passed successfully! ✅\n`);
}

main().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
