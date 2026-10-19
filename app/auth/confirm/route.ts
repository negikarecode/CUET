import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { rateLimit, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";

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
 * Supports both token_hash (verifyOtp) and code (exchangeCodeForSession).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
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

  // 2. Check rate limit on email confirmation verification attempts (20 per 15 min per IP)
  if (token_hash || code) {
    const rateId = getClientRateLimitIdentifier(request, null, "auth:confirm");
    const rateCheck = await rateLimit("auth:confirm", rateId);
    if (!rateCheck.success) {
      const errorUrl = new URL("/verify-email", origin);
      errorUrl.searchParams.set("error", "Too many confirmation attempts. Please wait 15 minutes before trying again.");
      return NextResponse.redirect(errorUrl);
    }
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

  // 1. Primary Flow: Token Hash Verification (Email Confirmation Link)
  if (token_hash && type) {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!verifyError) {
      verificationSuccess = true;
    } else {
      console.warn("[Auth VerifyOtp Notice]:", verifyError.message);
    }
  }

  // 2. Secondary Flow: PKCE Code Exchange (if code was provided instead)
  if (!verificationSuccess && code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (!exchangeError) {
      verificationSuccess = true;
    } else {
      console.warn("[Auth Code Exchange Notice]:", exchangeError.message);
    }
  }

  // 3. Process Successful Verification
  if (verificationSuccess) {
    try {
      // Confirm authenticated user is verified
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Load or create the expected profile safely using existing schema
        const supabaseAdmin = createAdminClient();
        const { data: existingProfile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (!existingProfile) {
          const metadata = user.user_metadata || {};
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
              id: user.id,
              full_name: metadata.full_name || user.email?.split("@")[0] || "CUET Aspirant",
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

        console.log(`[Auth Confirm] User ${user.id} verified successfully. Redirecting to ${next}`);
        return response;
      }
    } catch (profileError) {
      console.error("[Auth Confirm Profile Sync Notice]:", profileError);
      return response;
    }
  }

  // 4. Verification Failed / Expired Link
  const failureUrl = new URL("/verify-email", origin);
  failureUrl.searchParams.set(
    "error",
    "The confirmation link is invalid, expired, or has already been used. Please request a new confirmation email."
  );
  return NextResponse.redirect(failureUrl);
}
