import { NextRequest, NextResponse } from "next/server";
import { handleAI, WhyWrongResponse, RepairQuizResponse } from "@/lib/api-handlers/ai";
import { getProfile, postProfile } from "@/lib/api-handlers/auth-profile";
import { handleRateCheck } from "@/lib/api-handlers/auth-rate-check";
import { getStudentAttempts, deleteStudentAttempts } from "@/lib/api-handlers/student-attempts";
import { getAdminPYQ, patchAdminPYQ } from "@/lib/api-handlers/admin-pyq";
import { handleSundayRitual } from "@/lib/api-handlers/cron-sunday-ritual";
import { handleAuthCallback } from "@/lib/api-handlers/auth-callback";
import { handleAuthConfirm } from "@/lib/api-handlers/auth-confirm";
import { handleAuthSessionPost } from "@/lib/api-handlers/auth-session";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Re-export types for clients and tests
export type { WhyWrongResponse, RepairQuizResponse };

interface RouteContext {
  params?: {
    route?: string[];
  };
}

function parseRoute(req: NextRequest | Request, context?: RouteContext): string[] {
  if (context?.params?.route && Array.isArray(context.params.route) && context.params.route.length > 0) {
    return context.params.route;
  }
  try {
    const url = req instanceof NextRequest ? req.nextUrl : new URL(req.url, "https://cuetmate.vercel.app");
    const cleanPath = url.pathname
      .replace(/^\/api\//, "")
      .replace(/^\//, "");
    return cleanPath.split("/").filter(Boolean);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/[...route]
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest, context?: RouteContext): Promise<Response> {
  const segments = parseRoute(req, context);
  const path = segments.join("/");

  // 1. /api/auth/profile
  if (path === "auth/profile") {
    return getProfile(req);
  }

  // 2. /api/student/attempts
  if (path === "student/attempts") {
    return getStudentAttempts();
  }

  // 3. /api/admin/pyq or /api/admin/pyq/export
  if (segments[0] === "admin" && segments[1] === "pyq") {
    return getAdminPYQ(req);
  }

  // 4. /api/cron/sunday-ritual
  if (path === "cron/sunday-ritual") {
    return handleSundayRitual(req);
  }

  // 5. /api/auth/callback (or rewritten /auth/callback)
  if (path === "auth/callback") {
    return handleAuthCallback(req);
  }

  // 6. /api/auth/confirm (or rewritten /auth/confirm)
  if (path === "auth/confirm") {
    return handleAuthConfirm(req);
  }

  return NextResponse.json(
    { error: `GET not supported for route /api/${path}` },
    { status: 404 }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/[...route]
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest, context?: RouteContext): Promise<Response> {
  const segments = parseRoute(req, context);
  const path = segments.join("/");

  // 1. /api/ai/* (e.g. doubt-solver, repair-quiz, insights, standing-explain)
  if (segments[0] === "ai") {
    const action = segments.slice(1).join("/") || "";
    return handleAI(req, action);
  }

  // 2. /api/auth/profile
  if (path === "auth/profile") {
    return postProfile(req);
  }

  // 3. /api/auth/rate-check
  if (path === "auth/rate-check") {
    return handleRateCheck(req);
  }

  // 4. /api/auth/session, /api/auth/callback, /api/auth/confirm
  if (path === "auth/session" || path === "auth/callback" || path === "auth/confirm") {
    return handleAuthSessionPost(req);
  }

  return NextResponse.json(
    { error: `POST not supported for route /api/${path}` },
    { status: 404 }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/[...route]
// ─────────────────────────────────────────────────────────────────────────────
export async function PATCH(req: NextRequest, context?: RouteContext): Promise<NextResponse> {
  const segments = parseRoute(req, context);
  const path = segments.join("/");

  // /api/admin/pyq
  if (segments[0] === "admin" && segments[1] === "pyq") {
    return patchAdminPYQ(req);
  }

  return NextResponse.json(
    { error: `PATCH not supported for route /api/${path}` },
    { status: 404 }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/[...route]
// ─────────────────────────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest, context?: RouteContext): Promise<NextResponse> {
  const segments = parseRoute(req, context);
  const path = segments.join("/");

  // /api/student/attempts
  if (path === "student/attempts") {
    return deleteStudentAttempts(req);
  }

  return NextResponse.json(
    { error: `DELETE not supported for route /api/${path}` },
    { status: 404 }
  );
}
