import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";

export const dynamic = "force-dynamic";

/**
 * Validates redirect paths to prevent open redirect vulnerabilities.
 * Disallows external schemes, protocol-relative paths (//), and backslashes (/\).
 */
function getSafeRedirectPath(target: string | null): string {
  if (!target) return "/dashboard";
  if (
    target.startsWith("//") ||
    target.startsWith("/\\") ||
    target.includes("://") ||
    target.includes("\\") ||
    target.includes("\r") ||
    target.includes("\n")
  ) {
    return "/dashboard";
  }
  if (target.startsWith("/")) {
    return target;
  }
  return "/dashboard";
}

/**
 * GET /auth/confirm
 * Authoritative Supabase SSR email confirmation and auto-login callback.
 * Supports token_hash (verifyOtp), PKCE code exchange, and graceful repeated clicks.
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
  const next = getSafeRedirectPath(searchParams.get("next"));

  // 1. Check for provider-level errors in query parameters
  const errorParam = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  if (errorParam) {
    console.error("[Auth Confirm Callback Error]:", errorParam, errorDescription);
    const errorUrl = new URL("/verify-email", origin);
    errorUrl.searchParams.set("error", errorDescription || errorParam);
    return NextResponse.redirect(errorUrl);
  }

  // 2. Custom rate limiting on email confirmation is temporarily disabled

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

  // 2. Secondary Flow: PKCE Code Exchange (if code was provided instead)
  if (!verificationSuccess && code) {
    const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (!exchangeError && exchangeData?.user) {
      verificationSuccess = true;
      verifiedUser = exchangeData.user;
    } else {
      console.warn("[Auth Code Exchange Notice]:", exchangeError?.message);
    }
  }

  // 3. Repeated Click Handling if neither token_hash nor code is provided
  if (!token_hash && !code) {
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
      console.log(`[Auth Confirm] Active verified session detected without query params. Redirecting to ${next}`);
      return response;
    }
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
        // Load or create the expected profile safely using existing schema
        const supabaseAdmin = createAdminClient();
        const { data: existingProfile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("id", verifiedUser.id)
          .maybeSingle();

        if (!existingProfile) {
          const metadata = verifiedUser.user_metadata || {};
          const streamRaw = (metadata.target_stream || "Commerce").toLowerCase();
          const formattedStream =
            streamRaw === "science"
              ? "Science"
              : streamRaw === "humanities"
              ? "Humanities"
              : "Commerce";

          const subjectsToPersist =
            Array.isArray(metadata.selected_subjects) && metadata.selected_subjects.length > 0
              ? metadata.selected_subjects
              : getSubjectsForStream(formattedStream);

          await supabaseAdmin.from("profiles").upsert(
            {
              id: verifiedUser.id,
              full_name: metadata.full_name || verifiedUser.email?.split("@")[0] || "CUET Aspirant",
              target_stream: formattedStream,
              target_university: metadata.target_university || "Delhi University",
              target_college: metadata.target_college || "SRCC",
              target_course: metadata.target_course || "B.Com (Hons)",
              selected_subjects: subjectsToPersist,
              xp: 0,
              campus_coins: 50,
              current_streak: 0,
              is_premium: false,
              subscription_tier: "free",
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        }

        console.log(`[Auth Confirm] User ${verifiedUser.id} verified successfully. Redirecting to ${next}`);
        return response;
      }
    } catch (profileError) {
      console.error("[Auth Confirm Profile Sync Notice]:", profileError);
      return response;
    }
  }

  // 5. Verification Failed / Expired Link
  const failureUrl = new URL("/verify-email", origin);
  failureUrl.searchParams.set(
    "error",
    "The confirmation link is invalid, expired, or has already been used. Please request a new confirmation email."
  );
  return NextResponse.redirect(failureUrl);
}
