import { type NextRequest } from "next/server";
import { handleAuthCallback, POST as handleAuthCallbackPost } from "./auth-callback";

export const dynamic = "force-dynamic";

/**
 * GET /auth/confirm
 * Authoritative Supabase SSR email confirmation and auto-login callback.
 * Shared implementation with /auth/callback for complete backward compatibility.
 */
export async function GET(request: NextRequest) {
  return handleAuthCallback(request);
}

/**
 * POST /auth/confirm
 * Session synchronization handler for client-side tokens.
 */
export async function POST(request: NextRequest) {
  return handleAuthCallbackPost(request);
}

export { GET as handleAuthConfirm };
