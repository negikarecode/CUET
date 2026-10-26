import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeRedirectPath } from "@/lib/security/redirects";

/**
 * Updates the user's Supabase session in Next.js middleware and guards protected routes.
 * Ensures access tokens are refreshed, auth cookies are synced,
 * and unauthenticated visitors cannot access /dashboard or its sub-routes.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://djqgpcbjcszczcfrirri.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.mock-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options: CookieOptions;
        }[]
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  let authUser = null;
  try {
    const { data } = await supabase.auth.getUser();
    authUser = data.user;
  } catch (error) {
    // If Supabase URL or key is placeholder or network fails, proceed gracefully
    console.debug("Supabase auth check skipped/failed:", error);
  }

  const pathname = request.nextUrl.pathname;

  // 0. Intercept email confirmation links landing on application root (e.g. from Supabase fallback)
  // and route them immediately to the dedicated callback route preserving cookies
  if (
    pathname === "/" &&
    (request.nextUrl.searchParams.has("code") ||
      request.nextUrl.searchParams.has("token_hash") ||
      request.nextUrl.searchParams.has("token"))
  ) {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = "/auth/callback";
    const redirectResponse = NextResponse.redirect(callbackUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  const isDashboardRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isTestRoute =
    pathname === "/test" || pathname.startsWith("/test/");

  // Anti-flood rate limiting on public auth pages is temporarily disabled

  const isAuthenticated = Boolean(authUser);
  const isEmailVerified = Boolean(
    authUser?.email_confirmed_at ||
      (authUser as any)?.confirmed_at ||
      (authUser?.app_metadata?.provider &&
        authUser.app_metadata.provider !== "email")
  );

  // 1. Unauthenticated users cannot enter protected dashboard core routes or CBT test engine -> redirect to /signup
  if ((isDashboardRoute || isTestRoute) && !isAuthenticated) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/signup";
    redirectUrl.search = "";
    redirectUrl.searchParams.set("redirect", pathname + request.nextUrl.search);

    const redirectResponse = NextResponse.redirect(redirectUrl);
    // Preserve cookies set by Supabase
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  // 2. Authenticated but unverified users cannot enter dashboard or CBT test engine -> redirect to /verify-email
  if ((isDashboardRoute || isTestRoute) && isAuthenticated && !isEmailVerified) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/verify-email";
    redirectUrl.search = "";
    // Note: Email is not attached to URL query params to prevent PII leakage in history/logs
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  // 3. Authenticated candidates visiting auth routes:
  // If fully verified, redirect /signup, /login, /verify-email, /verify-otp to dashboard
  // NOTE: /reset-password and /forgot-password are intentionally excluded to allow password reset/recovery flows
  const isGuestOnlyAuthRoute =
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/verify-email" ||
    pathname === "/verify-otp";

  if (isGuestOnlyAuthRoute && isAuthenticated && isEmailVerified) {
    const redirectParam = request.nextUrl.searchParams.get("redirect") || request.nextUrl.searchParams.get("returnUrl");
    const targetPath = getSafeRedirectPath(redirectParam, "/dashboard");

    const redirectUrl = new URL(targetPath, request.nextUrl.origin);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  // If authenticated but unverified, redirect /signup and /login to /verify-email
  if (
    (pathname === "/signup" || pathname === "/login") &&
    isAuthenticated &&
    !isEmailVerified
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/verify-email";
    redirectUrl.search = "";
    // Note: Email is not attached to URL query params to prevent PII leakage in history/logs
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  return supabaseResponse;
}
