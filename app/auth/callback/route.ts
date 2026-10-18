import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /auth/callback
 * Handles Supabase Auth redirection callbacks (PKCE code exchange)
 * for email confirmation, magic links, and password recovery.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    console.error("[Auth Callback Error]:", error, errorDescription);
    const redirectUrl = new URL("/login", origin);
    redirectUrl.searchParams.set("error", errorDescription || error);
    return NextResponse.redirect(redirectUrl);
  }

  if (code) {
    try {
      const supabase = createClient();
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

      if (!exchangeError) {
        // Safe redirect to desired internal target
        const safeNext = next.startsWith("/") ? next : "/dashboard";
        return NextResponse.redirect(new URL(safeNext, origin));
      }

      console.error("[Auth Code Exchange Error]:", exchangeError.message);
    } catch (err: any) {
      console.error("[Auth Callback Unexpected Error]:", err?.message);
    }
  }

  // Fallback to login with descriptive message
  const fallbackUrl = new URL("/login", origin);
  fallbackUrl.searchParams.set("error", "The verification link is invalid or has expired. Please sign in or request a new code.");
  return NextResponse.redirect(fallbackUrl);
}
