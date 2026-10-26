import assert from "assert";
import { requireOwnership } from "../lib/security/auth-guard";
import { getRateLimitPolicy } from "../lib/security/rateLimitPolicy";

async function main() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: Shared Auth & Authorization Guard (Security Fix)");
  console.log("============================================================\n");

  let passed = 0;

  // 1. Ownership Guard Tests
  const ownRes = requireOwnership("user-123", "user-123", "report");
  assert.strictEqual(ownRes.isOwner, true);
  assert.strictEqual(ownRes.response, undefined);
  console.log("  PASS: requireOwnership permits identical user IDs");
  passed++;

  const idorRes = requireOwnership("user-123", "user-456", "report");
  assert.strictEqual(idorRes.isOwner, false);
  assert.ok(idorRes.response);
  assert.strictEqual(idorRes.response.status, 403);
  const idorJson = await idorRes.response.json();
  assert.strictEqual(idorJson.code, "FORBIDDEN_OWNERSHIP");
  console.log("  PASS: requireOwnership rejects mismatched user IDs (IDOR blocked)");
  passed++;

  // 2. Authoritative Rate Limit Policies
  const aiCoachPolicy = getRateLimitPolicy("ai_coach:generate");
  assert.strictEqual(aiCoachPolicy.max, 5);
  assert.strictEqual(aiCoachPolicy.windowSeconds, 60);
  assert.strictEqual(aiCoachPolicy.failClosed, true);
  console.log("  PASS: ai_coach:generate rate limit policy registered with failClosed=true");
  passed++;

  const ogImagePolicy = getRateLimitPolicy("progress_cards:image");
  assert.strictEqual(ogImagePolicy.max, 20);
  assert.strictEqual(ogImagePolicy.windowSeconds, 60);
  console.log("  PASS: progress_cards:image rate limit policy registered");
  passed++;

  const authSessionPolicy = getRateLimitPolicy("auth:session");
  assert.strictEqual(authSessionPolicy.max, 15);
  console.log("  PASS: auth:session rate limit policy registered");
  passed++;

  console.log(`\nAll ${passed} tests passed successfully! ✅\n`);
}

main().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
