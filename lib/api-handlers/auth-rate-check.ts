import { NextRequest, NextResponse } from "next/server";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";

export const dynamic = "force-dynamic";

const ALLOWED_AUTH_ACTIONS = new Set([
  "auth:login",
  "auth:signup",
  "auth:password_reset",
  "auth:resend_verification",
  "auth:resend_ip",
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

    if (!action || !ALLOWED_AUTH_ACTIONS.has(action)) {
      return NextResponse.json(
        { error: "Invalid or unsupported authentication action" },
        { status: 400 }
      );
    }

    const identifier = getClientRateLimitIdentifier(req, body.identifier, action);
    const result = await rateLimit(action, identifier);

    if (!result.success) {
      return rateLimitResponse(result);
    }

    return NextResponse.json({
      allowed: true,
      success: true,
      action: action || "auth",
      remaining: result.remaining,
      limit: result.limit,
      reset: result.reset,
    });
  } catch (err: any) {
    console.error("[Rate Check Error]:", err);
    return NextResponse.json(
      { error: "Rate limit check failed." },
      { status: 500 }
    );
  }
}

export { POST as handleRateCheck };
