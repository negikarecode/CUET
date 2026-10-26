import assert from "assert";
import fs from "fs";
import path from "path";
import { getRateLimitPolicy } from "../lib/security/rateLimitPolicy";
import { DELETE as deleteProfileHandler } from "../lib/api-handlers/auth-profile";

async function main() {
  console.log("\n============================================================");
  console.log("UNIT TESTS: Privacy Hardening & DPDP Erasure Verification");
  console.log("============================================================\n");

  let passed = 0;

  // 1. Verify Middleware does NOT leak email in URL parameters
  const middlewarePath = path.resolve(process.cwd(), "lib/supabase/middleware.ts");
  const middlewareContent = fs.readFileSync(middlewarePath, "utf-8");
  assert.ok(
    !middlewareContent.includes('redirectUrl.searchParams.set("email"'),
    "Middleware must not append email query param to redirects"
  );
  console.log("  PASS: Middleware redirects stripped of email query parameters (PII protection)");
  passed++;

  // 2. Verify CBT Exam LockedFeaturePaywall does NOT leak email in returnUrl
  const testPagePath = path.resolve(process.cwd(), "app/test/[testId]/page.tsx");
  const testPageContent = fs.readFileSync(testPagePath, "utf-8");
  assert.ok(
    !testPageContent.includes("returnUrl={`/verify-email?email="),
    "Test page returnUrl must not append email query parameter"
  );
  assert.ok(
    testPageContent.includes('returnUrl="/verify-email"'),
    "Test page returnUrl must cleanly point to /verify-email"
  );
  console.log("  PASS: CBT locked feature paywall uses sanitized returnUrl without email query string");
  passed++;

  // 3. Verify Account Enumeration Defense in AuthPageContent
  const authPagePath = path.resolve(process.cwd(), "components/auth/AuthPageContent.tsx");
  const authPageContent = fs.readFileSync(authPagePath, "utf-8");
  assert.ok(
    !authPageContent.includes("No candidate account found with this email. Please register as a new candidate first."),
    "AuthPageContent must not reveal user absence during OTP sign-in"
  );
  assert.ok(
    authPageContent.includes("// Account enumeration defense: transition to OTP verification"),
    "AuthPageContent must include defense against candidate enumeration"
  );
  console.log("  PASS: Candidate enumeration defense verified for OTP sign-in");
  passed++;

  // 4. Verify Rate Limit Policy for DPDP Profile Deletion
  const deletePolicy = getRateLimitPolicy("user:profile_delete");
  assert.ok(deletePolicy, "Rate limit policy for user:profile_delete must exist");
  assert.strictEqual(deletePolicy.max, 3, "Max 3 profile deletions per hour");
  assert.strictEqual(deletePolicy.windowSeconds, 3600, "Window duration must be 3600 seconds (1 hour)");
  assert.strictEqual(deletePolicy.scope, "user", "Scope must be user");
  assert.strictEqual(deletePolicy.failClosed, true, "Must fail closed for security");
  console.log("  PASS: user:profile_delete rate limit policy verified (3 req/hour, failClosed)");
  passed++;

  // 5. Verify Route Dispatcher for DELETE /api/auth/profile
  const routeDispatcherPath = path.resolve(process.cwd(), "app/api/[...route]/route.ts");
  const routeDispatcherContent = fs.readFileSync(routeDispatcherPath, "utf-8");
  assert.ok(
    routeDispatcherContent.includes('if (path === "auth/profile")'),
    "Catch-all route must route DELETE /api/auth/profile"
  );
  assert.ok(
    routeDispatcherContent.includes("deleteProfile"),
    "Catch-all route must import and invoke deleteProfile"
  );
  console.log("  PASS: Catch-all route dispatcher correctly maps DELETE /api/auth/profile");
  passed++;

  // 6. Test Unauthenticated Request to deleteProfileHandler returns 401
  const unauthReq = new Request("https://cuetmate.vercel.app/api/auth/profile", {
    method: "DELETE",
  });
  const unauthRes = await deleteProfileHandler(unauthReq);
  assert.strictEqual(unauthRes.status, 401, "Unauthenticated deletion must return HTTP 401");
  const unauthData = await unauthRes.json();
  assert.strictEqual(unauthData.code, "AUTH_REQUIRED", "Must return AUTH_REQUIRED error code");
  console.log("  PASS: DELETE /api/auth/profile rejects unauthenticated requests with 401 AUTH_REQUIRED");
  passed++;

  console.log(`\nAll ${passed} privacy & DPDP tests passed successfully! ✅\n`);
}

main().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
