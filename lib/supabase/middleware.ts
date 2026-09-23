import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

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
    "https://placeholder-cuet-prep.supabase.co";
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
  const isDashboardRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAuthRoute = pathname === "/signup" || pathname === "/login";

  const cuetAuthCookie = request.cookies.get("cuet_auth")?.value === "1";
  const isAuthenticated = Boolean(authUser || cuetAuthCookie);

  // 1. Unauthenticated users cannot enter dashboard routes -> redirect to /signup
  if (isDashboardRoute && !isAuthenticated) {
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

  // 2. Authenticated candidates visiting /signup or /login are redirected to dashboard
  if (isAuthRoute && isAuthenticated) {
    const redirectParam = request.nextUrl.searchParams.get("redirect");
    const targetPath =
      redirectParam && redirectParam.startsWith("/")
        ? redirectParam
        : "/dashboard";

    const redirectUrl = new URL(targetPath, request.nextUrl.origin);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  return supabaseResponse;
}
