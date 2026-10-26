import assert from "assert";
import { rateLimit } from "../lib/security/rateLimiter";
import { getRateLimitPolicy } from "../lib/security/rateLimitPolicy";

async function main() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: Progress Cards DoS Hardening & Rate Limiting");
  console.log("============================================================\n");

  let passed = 0;

  // 1. Verify Image Rate Limit Policy
  const imgPolicy = getRateLimitPolicy("progress_cards:image");
  assert.strictEqual(imgPolicy.max, 20);
  assert.strictEqual(imgPolicy.windowSeconds, 60);
  assert.strictEqual(imgPolicy.scope, "ip");
  console.log("  PASS: progress_cards:image policy is 20 req/60s scoped to IP");
  passed++;

  // 2. Verify Card Creation Rate Limit Policy
  const createPolicy = getRateLimitPolicy("progress_cards:create");
  assert.strictEqual(createPolicy.max, 10);
  assert.strictEqual(createPolicy.windowSeconds, 60);
  assert.strictEqual(createPolicy.scope, "user");
  console.log("  PASS: progress_cards:create policy is 10 req/60s scoped to user");
  passed++;

  // 3. Test sliding window rate limiter trip on image generation
  const testIp = `test-ip-${Date.now()}`;
  for (let i = 0; i < 20; i++) {
    const res = await rateLimit("progress_cards:image", `progress_cards:image:${testIp}`);
    assert.strictEqual(res.success, true);
  }
  const blockedRes = await rateLimit("progress_cards:image", `progress_cards:image:${testIp}`);
  assert.strictEqual(blockedRes.success, false);
  assert.ok(blockedRes.retryAfter > 0);
  console.log("  PASS: 21st image render request is rate-limited with HTTP 429 semantics");
  passed++;

  console.log(`\nAll ${passed} tests passed successfully! ✅\n`);
}

main().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
