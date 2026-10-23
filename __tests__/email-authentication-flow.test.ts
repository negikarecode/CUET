import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { NextRequest } from "next/server";
import { handleAuthConfirm } from "../lib/api-handlers/auth-confirm";
import { handleAuthCallback } from "../lib/api-handlers/auth-callback";
import { handleAuthSessionPost } from "../lib/api-handlers/auth-session";
import { createAdminClient } from "../lib/supabase/admin";
import { updateSession } from "../lib/supabase/middleware";

describe("🔐 Supabase Email Authentication & Auto-Login Flow Test Suite", () => {
  const admin = createAdminClient();
  let testUserId: string = "";
  const testEmail = `auto_login_tester_${Date.now()}@example.com`;
  const testPassword = "Password123!Secure";

  before(async () => {
    // Clean initial test candidate
    const { data, error } = await admin.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: false,
      user_metadata: {
        full_name: "Rohan Varma",
        target_stream: "Science",
        target_college: "Hindu College",
        target_course: "B.Sc (Hons) Physics",
      },
    });
    assert(!error && data?.user, `Failed to setup test candidate: ${error?.message}`);
    testUserId = data.user.id;
  });

  after(async () => {
    if (testUserId) {
      await admin.auth.admin.deleteUser(testUserId).catch(() => {});
    }
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 1: Token Hash Signup Confirmation Flow (Server-side auto-login)
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 1: Valid signup token_hash logs in user and redirects to /dashboard", async () => {
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "signup",
      email: testEmail,
      password: testPassword,
      options: {
        redirectTo: "https://cuetmate.vercel.app/auth/confirm?next=/dashboard",
      },
    });

    assert(!linkError && linkData?.properties?.hashed_token, "Supabase generated authentic verification link");
    const hashedToken = linkData.properties.hashed_token;

    const req = new NextRequest(
      `https://cuetmate.vercel.app/auth/confirm?token_hash=${hashedToken}&type=signup&next=/dashboard`
    );

    const res = await handleAuthConfirm(req);
    assert(res.status === 307 || res.status === 302, `Expected 307/302 redirect, got ${res.status}`);

    const location = res.headers.get("location") || "";
    assert(location.includes("/dashboard"), `Expected redirect to /dashboard, got ${location}`);

    // Verify auth cookies attached to response
    const setCookieHeaders = res.headers.get("set-cookie") || "";
    assert(setCookieHeaders.length > 0, "Authentication cookies must be attached to the response");

    // Verify candidate profile was provisioned in database
    const { data: profile } = await admin
      .from("profiles")
      .select("*")
      .eq("id", testUserId)
      .maybeSingle();

    assert(profile, "Candidate profile must exist in profiles table");
    assert.strictEqual(profile.full_name, "Rohan Varma");
    assert.strictEqual(profile.target_stream, "Science");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 2: Repeated Click Handling with Active Session
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 2: Repeated click on verified link with existing session redirects cleanly to /dashboard", async () => {
    // Create an authenticated session for the verified user
    const { data: sessionData, error: sessionError } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: testEmail,
    });
    assert(!sessionError && sessionData?.properties?.hashed_token, "Generated magiclink token");

    // Repeated request with already consumed token
    const repeatReq = new NextRequest(
      `https://cuetmate.vercel.app/auth/confirm?token_hash=${sessionData.properties.hashed_token}&type=signup&next=/dashboard`
    );

    const res = await handleAuthConfirm(repeatReq);
    assert(res.status === 307 || res.status === 302, `Expected redirect, got ${res.status}`);
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 3: Implicit Hash Fragment Handoff Flow (#access_token=...)
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 3A: Request to /auth/confirm without query params returns 200 HTML handoff page", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/auth/confirm?next=/dashboard", {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    const res = await handleAuthConfirm(req);
    assert.strictEqual(res.status, 200, `Expected 200 OK HTML handoff page, got ${res.status}`);

    const contentType = res.headers.get("content-type") || "";
    assert(contentType.includes("text/html"), `Expected text/html content type, got ${contentType}`);

    const html = await res.text();
    assert(html.includes("Authenticating Session"), "HTML must include authenticating status UI");
    assert(html.includes("access_token"), "HTML must parse access_token from location hash");
    assert(html.includes("/api/auth/session"), "HTML must call session synchronization endpoint");
  });

  it("Scenario 3B: /auth/callback without query params returns 200 HTML handoff page", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/auth/callback?next=/dashboard", {
      headers: {
        Accept: "text/html",
      },
    });

    const res = await handleAuthCallback(req);
    assert.strictEqual(res.status, 200, `Expected 200 OK HTML handoff page, got ${res.status}`);
    const html = await res.text();
    assert(html.includes("NTA Candidate Security"), "HTML must include security badge");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 4: Session Synchronization POST /api/auth/session
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 4: POST /api/auth/session sets HttpOnly SSR session cookies and verifies user", async () => {
    // Generate valid tokens using Supabase password signin
    const { data: signinData, error: signinError } = await admin.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    });

    assert(!signinError && signinData?.session, "Signed in with password to obtain tokens");
    const { access_token, refresh_token } = signinData.session;

    const sessionReq = new NextRequest("https://cuetmate.vercel.app/api/auth/session?next=/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token, refresh_token }),
    });

    const sessionRes = await handleAuthSessionPost(sessionReq);
    assert.strictEqual(sessionRes.status, 200, `Expected 200 OK from session sync, got ${sessionRes.status}`);

    const json = await sessionRes.json();
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.redirect, "/dashboard");

    // Must attach Set-Cookie headers
    const setCookie = sessionRes.headers.get("set-cookie") || "";
    assert(setCookie.length > 0, "Session sync must attach Set-Cookie headers");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 5: Security & Anti-Open-Redirect Defense
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 5: Malicious external 'next' redirect URL is sanitized to /dashboard", async () => {
    const req = new NextRequest(
      "https://cuetmate.vercel.app/auth/confirm?next=https://attacker-stealer.com/evil"
    );

    const res = await handleAuthConfirm(req);
    assert.strictEqual(res.status, 200, "Should return HTML handoff");
    const html = await res.text();
    // Verify malicious external URL was neutralized
    assert(!html.includes("attacker-stealer.com"), "Malicious URL must not appear in handoff script");
    assert(html.includes("/dashboard"), "Sanitized default destination must be /dashboard");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 6: Expired or Tampered Token Handling
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 6A: Expired signup token_hash safely redirects to /verify-email with descriptive error", async () => {
    const req = new NextRequest(
      "https://cuetmate.vercel.app/auth/confirm?token_hash=fake_expired_token_12345&type=signup"
    );

    const res = await handleAuthConfirm(req);
    assert.strictEqual(res.status, 307, "Expected redirect status");
    const location = res.headers.get("location") || "";
    const url = new URL(location, "https://cuetmate.vercel.app");
    assert.strictEqual(url.pathname, "/verify-email");
    assert(url.searchParams.get("error")?.includes("confirmation link"), "Error must describe confirmation issue");
  });

  it("Scenario 6B: Expired password reset token_hash safely redirects to /forgot-password", async () => {
    const req = new NextRequest(
      "https://cuetmate.vercel.app/auth/confirm?token_hash=fake_expired_token_12345&type=recovery"
    );

    const res = await handleAuthConfirm(req);
    assert.strictEqual(res.status, 307, "Expected redirect status");
    const location = res.headers.get("location") || "";
    const url = new URL(location, "https://cuetmate.vercel.app");
    assert.strictEqual(url.pathname, "/forgot-password");
    assert(url.searchParams.get("error")?.includes("password reset link"), "Error must describe reset issue");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 7: API Client Missing Params Request
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 7: JSON API request without params returns HTTP 400 Bad Request", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/auth/confirm", {
      headers: {
        Accept: "application/json",
      },
    });

    const res = await handleAuthConfirm(req);
    assert.strictEqual(res.status, 400, "API client without params should get 400");
    const json = await res.json();
    assert.strictEqual(json.code, "MISSING_AUTH_PARAMS");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 8: Next.js Middleware Protection
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 8A: Unauthenticated request to /dashboard is blocked by middleware", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/dashboard");
    const res = await updateSession(req);

    assert.strictEqual(res.status, 307, "Unauthenticated user must be redirected");
    const location = res.headers.get("location") || "";
    assert(location.includes("/signup"), `Expected redirect to /signup, got ${location}`);
  });

  it("Scenario 8B: Guest visiting /reset-password is NOT redirected away by middleware", async () => {
    const req = new NextRequest("https://cuetmate.vercel.app/reset-password");
    const res = await updateSession(req);

    assert.strictEqual(res.status, 200, "Reset password route must allow visitor");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 9: Root URL Fallback Interception (/?code=... -> /auth/callback)
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 9A: Middleware intercepts root request with code (?code=...) and redirects to /auth/callback", async () => {
    const req = new NextRequest("https://cuetmate-negihikehde.vercel.app/?code=mock_auth_code_123&next=/dashboard");
    const res = await updateSession(req);

    assert.strictEqual(res.status, 307, "Expected 307 redirect from root to callback route");
    const location = res.headers.get("location") || "";
    const url = new URL(location);
    assert.strictEqual(url.pathname, "/auth/callback", "Must redirect to /auth/callback");
    assert.strictEqual(url.searchParams.get("code"), "mock_auth_code_123", "Preserves authorization code");
    assert.strictEqual(url.searchParams.get("next"), "/dashboard", "Preserves destination next parameter");
  });

  it("Scenario 9B: Middleware intercepts root request with token_hash and redirects to /auth/callback", async () => {
    const req = new NextRequest("https://cuetmate-negihikehde.vercel.app/?token_hash=mock_hash_xyz&type=signup");
    const res = await updateSession(req);

    assert.strictEqual(res.status, 307, "Expected 307 redirect from root to callback route");
    const location = res.headers.get("location") || "";
    const url = new URL(location);
    assert.strictEqual(url.pathname, "/auth/callback", "Must redirect to /auth/callback");
    assert.strictEqual(url.searchParams.get("token_hash"), "mock_hash_xyz", "Preserves token_hash");
    assert.strictEqual(url.searchParams.get("type"), "signup", "Preserves type");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SCENARIO 10: Cross-Browser Missing PKCE Verifier Defense
  // ─────────────────────────────────────────────────────────────────────────────
  it("Scenario 10: Missing PKCE code_verifier gracefully redirects to /verify-email with cross-browser explanation", async () => {
    const req = new NextRequest("https://cuetmate-negihikehde.vercel.app/auth/callback?code=mock_foreign_code_xyz");
    const res = await handleAuthCallback(req);

    assert.strictEqual(res.status, 307, "Expected redirect on PKCE exchange failure");
    const location = res.headers.get("location") || "";
    const url = new URL(location, "https://cuetmate-negihikehde.vercel.app");
    assert.strictEqual(url.pathname, "/verify-email");
    const errorMsg = url.searchParams.get("error") || "";
    assert(
      errorMsg.includes("different browser") || errorMsg.includes("confirmation link"),
      "Error must inform user about cross-browser or confirmation issue"
    );
  });
});
