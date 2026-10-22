import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSafeRedirectPath } from "@/lib/security/redirects";
import { syncUserProfile, renderAuthHandoffHtml, handleAuthSessionPost } from "./auth-session";

export const dynamic = "force-dynamic";

/**
 * GET /auth/confirm
 * Authoritative Supabase SSR email confirmation and auto-login callback.
 * Supports token_hash (verifyOtp), PKCE code exchange, implicit URL fragment tokens (#access_token=...),
 * and graceful repeated clicks.
 */
export async function GET(request: NextRequest) {
  const origin =
    request.nextUrl.origin ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://cuetmate.vercel.app";
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash") || searchParams.get("token");
  const type = (searchParams.get("type") as EmailOtpType | null) || "signup";
  const code = searchParams.get("code");
  const defaultNext = type === "recovery" ? "/reset-password" : "/dashboard";
  const next = getSafeRedirectPath(searchParams.get("next"), defaultNext);

  // 1. Check for provider-level errors in query parameters
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  if (errorParam) {
    console.error("[Auth Confirm Callback Error]:", errorParam, errorDescription);
    const errorUrl = new URL(type === "recovery" ? "/forgot-password" : "/verify-email", origin);
    errorUrl.searchParams.set("error", errorDescription || errorParam);
    return NextResponse.redirect(errorUrl);
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://djqgpcbjcszczcfrirri.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.mock-key";

  // Pre-configure the redirect response so cookies can be set directly onto it
  const destinationUrl = new URL(next, origin);
  const response = NextResponse.redirect(destinationUrl);

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options: any;
        }[]
      ) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  let verificationSuccess = false;
  let verifiedUser: any = null;

  // 1. Primary Flow: Token Hash Verification (Email Confirmation Link)
  if (token_hash && type) {
    let { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    // Fallback: If signup type failed, try with 'email' (supported for general email confirmation)
    if (verifyError && type === "signup") {
      const retry = await supabase.auth.verifyOtp({
        type: "email",
        token_hash,
      });
      if (!retry.error && retry.data?.user) {
        verifyData = retry.data;
        verifyError = null;
      }
    }

    if (!verifyError && verifyData?.user) {
      verificationSuccess = true;
      verifiedUser = verifyData.user;
    } else {
      console.warn("[Auth VerifyOtp Notice]:", verifyError?.message);

      // Repeated Click Defense: If link already used, check if the browser has an active verified session
      // Strictly exclude 'recovery' type to ensure expired or invalid recovery tokens NEVER bypass verification
      if (type !== "recovery") {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        if (
          currentUser &&
          (currentUser.email_confirmed_at ||
            (currentUser as any).confirmed_at ||
            (currentUser.app_metadata?.provider &&
              currentUser.app_metadata.provider !== "email"))
        ) {
          console.log(`[Auth Confirm] Repeated click detected. User ${currentUser.id} is already verified. Redirecting to ${next}`);
          return response;
        }
      }
    }
  }

  // 2. Secondary Flow: PKCE Code Exchange (if authorization code was provided)
  if (!verificationSuccess && code) {
    const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (!exchangeError && exchangeData?.user) {
      verificationSuccess = true;
      verifiedUser = exchangeData.user;
    } else {
      console.warn("[Auth Code Exchange Notice]:", exchangeError?.message);
    }
  }

  // 3. Handshake Flow: If neither token_hash nor code is provided in query params
  if (!token_hash && !code) {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    // If candidate browser already has an active verified session, route directly to destination
    if (
      currentUser &&
      (currentUser.email_confirmed_at ||
        (currentUser as any).confirmed_at ||
        (currentUser.app_metadata?.provider &&
          currentUser.app_metadata.provider !== "email"))
    ) {
      console.log(`[Auth Confirm] Active verified session detected without query params. Redirecting to ${next}`);
      return response;
    }

    // If client requested JSON (API client), return 400 Bad Request
    if (request.headers.get("accept")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Missing token_hash or authorization code parameter", code: "MISSING_AUTH_PARAMS" },
        { status: 400 }
      );
    }

    // Otherwise, render client handoff HTML.
    // Handles implicit hash fragment redirects (#access_token=...&refresh_token=...) sent by Supabase email verify
    return new NextResponse(renderAuthHandoffHtml(next, type), {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }

  // 4. Process Successful Verification
  if (verificationSuccess) {
    try {
      if (!verifiedUser) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        verifiedUser = user;
      }

      if (verifiedUser) {
        await syncUserProfile(verifiedUser);
        console.log(`[Auth Confirm] User ${verifiedUser.id} verified successfully. Redirecting to ${next}`);
        return response;
      }
    } catch (profileError) {
      console.error("[Auth Confirm Profile Sync Notice]:", profileError);
      return response;
    }
  }

  // 5. Verification Failed / Expired Link
  const failurePath = type === "recovery" ? "/forgot-password" : "/verify-email";
  const failureUrl = new URL(failurePath, origin);
  failureUrl.searchParams.set(
    "error",
    type === "recovery"
      ? "The password reset link is invalid or has expired. Please request a new reset link."
      : "The confirmation link is invalid, expired, or has already been used. Please request a new confirmation email."
  );
  return NextResponse.redirect(failureUrl);
}

/**
 * POST /auth/confirm
 * Session synchronization handler for client-side tokens.
 */
export async function POST(request: NextRequest) {
  return handleAuthSessionPost(request);
}

export { GET as handleAuthConfirm };
