import { NextRequest, NextResponse } from "next/server";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";

export const dynamic = "force-dynamic";

const ALLOWED_AUTH_ACTIONS = new Set([
  "auth:login",
  "auth:signup",
  "auth:password_reset",
  "auth:resend_verification",
]);

/**
 * POST /api/auth/rate-check
 * Server-side rate limit enforcement endpoint for candidate authentication operations.
 * Allows client auth flows to atomically enforce server rate limits with HTTP 429 semantics.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action as string;
    const identifier = typeof body.identifier === "string" ? body.identifier.trim().toLowerCase() : undefined;

    if (!action || !ALLOWED_AUTH_ACTIONS.has(action)) {
      return NextResponse.json(
        { error: "Invalid or unsupported authentication action" },
        { status: 400 }
      );
    }

    const rateId = getClientRateLimitIdentifier(req, identifier, action);
    const rateCheck = await rateLimit(action, rateId);

    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    return NextResponse.json({
      allowed: true,
      success: true,
      action,
      remaining: rateCheck.remaining,
      limit: rateCheck.limit,
      reset: rateCheck.reset,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Rate limit check failed" },
      { status: 500 }
    );
  }
}
