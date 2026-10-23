import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { GET, POST, PATCH, DELETE } from "../app/api/[...route]/route";
import DashboardCatchAllPage, { generateMetadata } from "../app/dashboard/[[...slug]]/page";

describe("Unified Router Invariants (Vercel Hobby Serverless Limit Consolidation)", () => {
  // ─── 1. API ROUTE DISPATCH & UNAUTHENTICATED GUARDS ───────────────────────
  describe("API Catch-All Dispatcher & Authentication Guards", () => {
    it("POST /api/auth/profile without auth session strictly returns 401", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/auth/profile", {
        method: "POST",
        body: JSON.stringify({ id: "user-123", fullName: "Test User" }),
      });
      const res = await POST(req, { params: { route: ["auth", "profile"] } });
      assert.equal(res.status, 401, "Unauthenticated profile update must return 401");
      const data = await res.json();
      assert.ok(data.error.includes("Unauthorized"), "Must state session required");
    });

    it("POST /api/auth/rate-check functions correctly without requiring user auth", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/auth/rate-check", {
        method: "POST",
        body: JSON.stringify({ action: "auth:login" }),
      });
      const res = await POST(req, { params: { route: ["auth", "rate-check"] } });
      assert.equal(res.status, 200, "Rate check must return 200 for valid action");
      const data = await res.json();
      assert.equal(data.allowed, true);
    });

    it("GET /api/student/attempts without auth session returns unauthenticated status", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/student/attempts", {
        method: "GET",
      });
      const res = await GET(req, { params: { route: ["student", "attempts"] } });
      assert.equal(res.status, 200, "Attempts endpoint returns 200 with authenticated: false when unauthenticated");
      const data = await res.json();
      assert.equal(data.authenticated, false);
      assert.deepEqual(data.attempts, []);
    });

    it("DELETE /api/student/attempts without auth session strictly returns 401", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/student/attempts?testId=mock-1", {
        method: "DELETE",
      });
      const res = await DELETE(req, { params: { route: ["student", "attempts"] } });
      assert.equal(res.status, 401, "Unauthenticated attempt deletion must return 401");
    });

    it("GET /api/admin/pyq without PYQ_ADMIN_TOKEN strictly returns 401", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/admin/pyq?status=review", {
        method: "GET",
      });
      const res = await GET(req, { params: { route: ["admin", "pyq"] } });
      assert.equal(res.status, 401, "Unauthorized admin access must return 401");
      const data = await res.json();
      assert.ok(data.error.includes("Admin access required"));
    });

    it("PATCH /api/admin/pyq without PYQ_ADMIN_TOKEN strictly returns 401", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/admin/pyq", {
        method: "PATCH",
        body: JSON.stringify({ id: "q_1", action: "approve" }),
      });
      const res = await PATCH(req, { params: { route: ["admin", "pyq"] } });
      assert.equal(res.status, 401, "Unauthorized admin patch must return 401");
      const data = await res.json();
      assert.equal(data.error, "Admin access required");
    });

    it("GET /api/cron/sunday-ritual without CRON_SECRET strictly returns 401", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/cron/sunday-ritual", {
        method: "GET",
      });
      const res = await GET(req, { params: { route: ["cron", "sunday-ritual"] } });
      assert.equal(res.status, 401, "Unauthorized cron trigger must return 401");
    });

    it("GET /api/auth/callback without valid token cleanly redirects to /verify-email", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/auth/callback?token_hash=bad_token&type=signup", {
        method: "GET",
      });
      const res = await GET(req, { params: { route: ["auth", "callback"] } });
      assert.equal(res.status, 307, "Invalid auth callback must redirect");
      const location = res.headers.get("Location") || "";
      assert.ok(location.includes("/verify-email"), "Redirect destination must be /verify-email");
    });

    it("GET /api/auth/confirm without valid token cleanly redirects to /verify-email", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/auth/confirm?token_hash=bad_token&type=signup", {
        method: "GET",
      });
      const res = await GET(req, { params: { route: ["auth", "confirm"] } });
      assert.equal(res.status, 307, "Invalid auth confirm must redirect");
      const location = res.headers.get("Location") || "";
      assert.ok(location.includes("/verify-email"), "Redirect destination must be /verify-email");
    });

    it("POST /api/ai/doubt-solver without auth session strictly returns 401 AUTH_REQUIRED", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/ai/doubt-solver", {
        method: "POST",
        body: JSON.stringify({ message: "Explain electromagnetic waves" }),
      });
      const res = await POST(req, { params: { route: ["ai", "doubt-solver"] } });
      assert.equal(res.status, 401, "Unauthenticated doubt solver must return 401");
      const data = await res.json();
      assert.equal(data.code, "AUTH_REQUIRED");
    });

    it("POST /api/ai/repair-quiz without auth session strictly returns 401 AUTH_REQUIRED", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/ai/repair-quiz", {
        method: "POST",
        body: JSON.stringify({ subject: "physics", weakMicroTopics: ["kinematics"] }),
      });
      const res = await POST(req, { params: { route: ["ai", "repair-quiz"] } });
      assert.equal(res.status, 401, "Unauthenticated repair quiz must return 401");
      const data = await res.json();
      assert.equal(data.code, "AUTH_REQUIRED");
    });

    it("POST /api/ai/standing-explain without auth session strictly returns 401 AUTH_REQUIRED", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/ai/standing-explain", {
        method: "POST",
        body: JSON.stringify({ targetCollege: "SRCC", targetCourse: "B.Com (Hons)" }),
      });
      const res = await POST(req, { params: { route: ["ai", "standing-explain"] } });
      assert.equal(res.status, 401, "Unauthenticated standing explain must return 401");
      const data = await res.json();
      assert.equal(data.code, "AUTH_REQUIRED");
    });

    it("Unrecognized /api route returns 404", async () => {
      const req = new NextRequest("https://cuetmate.vercel.app/api/unknown-endpoint-xyz", {
        method: "GET",
      });
      const res = await GET(req, { params: { route: ["unknown-endpoint-xyz"] } });
      assert.equal(res.status, 404, "Unknown route must return 404");
    });
  });

  // ─── 2. DASHBOARD CATCH-ALL METADATA & DISPATCHER ─────────────────────────
  describe("Dashboard Catch-All Metadata & View Dispatching", () => {
    it("generates root /dashboard metadata when slug is empty", async () => {
      const meta = await generateMetadata({ params: { slug: [] } });
      assert.ok(meta.title?.toString().includes("Dashboard"), "Root dashboard title must include Dashboard");
    });

    it("generates /dashboard/standing metadata accurately", async () => {
      const meta = await generateMetadata({ params: { slug: ["standing"] } });
      assert.ok(meta.title?.toString().includes("Where Do I Stand"), "Standing title must include Where Do I Stand");
    });

    it("generates /dashboard/profile metadata accurately", async () => {
      const meta = await generateMetadata({ params: { slug: ["profile"] } });
      assert.ok(meta.title?.toString().includes("Profile"), "Profile title must include Profile");
    });

    it("generates /dashboard/sessions metadata accurately", async () => {
      const meta = await generateMetadata({ params: { slug: ["sessions"] } });
      assert.ok(meta.title?.toString().includes("Session History"), "Sessions title must include Session History");
    });

    it("generates /dashboard/ai-coach and /dashboard/reports metadata accurately", async () => {
      const coachMeta = await generateMetadata({ params: { slug: ["ai-coach"] } });
      assert.ok(coachMeta.title?.toString().includes("AI Coach"), "AI Coach title must include AI Coach");

      const reportsMeta = await generateMetadata({ params: { slug: ["reports"] } });
      assert.ok(reportsMeta.title?.toString().includes("Reports"), "Reports title must include Reports");
    });

    it("generates /dashboard/mocks/physics metadata accurately", async () => {
      const meta = await generateMetadata({ params: { slug: ["mocks", "physics"] } });
      assert.ok(meta.title?.toString().includes("Physics"), "Mocks subject title must include Physics");
    });

    it("generates /dashboard/pyqs/physics metadata accurately", async () => {
      const meta = await generateMetadata({ params: { slug: ["pyqs", "physics"] } });
      assert.ok(meta.title?.toString().includes("Physics"), "PYQs subject title must include Physics");
    });

    it("generates /dashboard/practice/physics metadata accurately", async () => {
      const meta = await generateMetadata({ params: { slug: ["practice", "physics"] } });
      assert.ok(meta.title?.toString().includes("Physics"), "Practice subject title must include Physics");
    });

    it("renders root /dashboard component cleanly", async () => {
      const element = await DashboardCatchAllPage({ params: { slug: [] } });
      assert.ok(element, "Root dashboard view must return React element");
    });
  });
});
