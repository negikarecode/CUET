import assert from "assert";
import nextConfig from "../next.config.mjs";

async function main() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: Security Headers & CSP Hardening Verification");
  console.log("============================================================\n");

  let passed = 0;

  // Retrieve configured headers
  assert.ok(typeof nextConfig.headers === "function", "headers must be configured on nextConfig");
  const headerConfigs = await nextConfig.headers!();
  assert.ok(Array.isArray(headerConfigs), "headers() must return an array of routes");
  const allRouteHeaders = headerConfigs.find((h: any) => h.source === "/(.*)");
  assert.ok(allRouteHeaders, "Must contain global root header configuration for /(.*)");

  const headerMap: Record<string, string> = {};
  allRouteHeaders.headers.forEach((h: any) => {
    headerMap[h.key] = h.value;
  });

  // 1. Verify Frame-Options and Clickjacking Defenses
  assert.strictEqual(headerMap["X-Frame-Options"], "SAMEORIGIN");
  console.log("  PASS: X-Frame-Options is SAMEORIGIN");
  passed++;

  // 2. Verify Content-Security-Policy
  const csp = headerMap["Content-Security-Policy"];
  assert.ok(csp, "Content-Security-Policy must be set");
  assert.ok(csp.includes("frame-ancestors 'self'"), "CSP must include frame-ancestors 'self'");
  console.log("  PASS: CSP includes frame-ancestors 'self' for modern clickjacking protection");
  passed++;

  assert.ok(
    !csp.includes("api.groq.com"),
    "CSP must NOT whitelist api.groq.com for client connect-src (server only)"
  );
  assert.ok(
    !csp.includes("generativelanguage.googleapis.com"),
    "CSP must NOT whitelist generativelanguage.googleapis.com for client connect-src"
  );
  console.log("  PASS: CSP client connect-src correctly stripped of external server-only AI endpoints");
  passed++;

  // 3. Verify Transport & MIME Protections
  assert.strictEqual(headerMap["X-Content-Type-Options"], "nosniff");
  console.log("  PASS: X-Content-Type-Options is nosniff");
  passed++;

  assert.ok(headerMap["Strict-Transport-Security"]?.includes("max-age=63072000"));
  assert.ok(headerMap["Strict-Transport-Security"]?.includes("includeSubDomains"));
  console.log("  PASS: Strict-Transport-Security (HSTS) is enabled with 2-year duration and includeSubDomains");
  passed++;

  assert.strictEqual(headerMap["Referrer-Policy"], "strict-origin-when-cross-origin");
  console.log("  PASS: Referrer-Policy is strict-origin-when-cross-origin");
  passed++;

  assert.ok(headerMap["Permissions-Policy"]?.includes("camera=()"));
  assert.ok(headerMap["Permissions-Policy"]?.includes("microphone=()"));
  console.log("  PASS: Permissions-Policy restricts sensitive hardware APIs");
  passed++;

  console.log(`\nAll ${passed} security header tests passed successfully! ✅\n`);
}

main().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
