import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { getSafeRedirectPath } from "@/lib/security/redirects";

export const dynamic = "force-dynamic";

/**
 * Synchronizes a verified Supabase auth user into the public.profiles database table.
 * Ensures initial default metrics (coins, stream, subjects) are provisioned.
 */
export async function syncUserProfile(user: any): Promise<void> {
  if (!user?.id) return;
  try {
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
  } catch (err) {
    console.error("[Profile Sync Error]:", err);
  }
}

/**
 * Generates a clean, responsive client-side authentication handoff HTML page.
 * Parses URL hash fragments (#access_token=...&refresh_token=...) sent by Supabase email verification,
 * synchronizes the server session cookies, and redirects the candidate directly to their dashboard.
 */
export function renderAuthHandoffHtml(targetNext: string, type: string): string {
  const safeNext = getSafeRedirectPath(targetNext, type === "recovery" ? "/reset-password" : "/dashboard");
  const isRecovery = type === "recovery";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifying Authentication | CUETMate</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #F8FAFC;
      color: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1.5rem;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 1.5rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
      max-width: 28rem;
      width: 100%;
      padding: 2.25rem 2rem;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.6875rem;
      font-weight: 600;
      color: #065F46;
      background: #ECFDF5;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      border: 1px solid rgba(167, 243, 208, 0.6);
      margin-bottom: 1.5rem;
    }
    .spinner {
      width: 2.75rem;
      height: 2.75rem;
      border: 3.5px solid #EEF2FF;
      border-top-color: #4F46E5;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 1.25rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    h1 { font-size: 1.25rem; font-weight: 700; color: #0F172A; margin-bottom: 0.5rem; }
    p { font-size: 0.875rem; color: #64748B; line-height: 1.5; margin-bottom: 1.5rem; }
    .btn {
      display: block;
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 0.75rem;
      text-decoration: none;
      transition: all 0.15s ease;
      cursor: pointer;
      border: none;
      margin-bottom: 0.625rem;
    }
    .btn-primary { background: #4F46E5; color: #FFFFFF; }
    .btn-primary:hover { background: #4338CA; }
    .btn-secondary { background: #F1F5F9; color: #475569; }
    .btn-secondary:hover { background: #E2E8F0; }
    .hidden { display: none !important; }
    .error-icon {
      width: 3.25rem;
      height: 3.25rem;
      background: #FFF1F2;
      color: #E11D48;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.25rem;
    }
  </style>
</head>
<body>
  <div class="card" id="card">
    <!-- State 1: Active Verifying / Processing -->
    <div id="loading-state">
      <div class="badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>NTA Candidate Security</span>
      </div>
      <div class="spinner"></div>
      <h1 id="status-title">Authenticating Session</h1>
      <p id="status-desc">Verifying your email credentials. You will be redirected to your dashboard in a moment...</p>
    </div>

    <!-- State 2: Error (hidden by default) -->
    <div id="error-state" class="hidden">
      <div class="error-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      </div>
      <h1 id="error-title">Verification Link Expired</h1>
      <p id="error-desc">This confirmation link has already been used or has expired. Please request a new confirmation email.</p>
      <a href="/verify-email" id="action-resend" class="btn btn-primary">Request New Link</a>
      <a href="/login" class="btn btn-secondary">Back to Sign In</a>
    </div>
  </div>

  <script>
    (function() {
      var nextPath = ${JSON.stringify(safeNext)};
      var defaultType = ${JSON.stringify(type)};
      var isDefaultRecovery = ${JSON.stringify(isRecovery)};

      function parseParams() {
        var hash = (window.location.hash || '').replace(/^#/, '');
        var search = (window.location.search || '').replace(/^\\?/, '');
        var params = new URLSearchParams(hash || search);
        return params;
      }

      function showError(title, message, isRecovery) {
        var loading = document.getElementById('loading-state');
        var errBox = document.getElementById('error-state');
        if (loading) loading.classList.add('hidden');
        if (errBox) errBox.classList.remove('hidden');
        var titleEl = document.getElementById('error-title');
        var descEl = document.getElementById('error-desc');
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = message;
        var resendBtn = document.getElementById('action-resend');
        if (resendBtn) {
          if (isRecovery) {
            resendBtn.textContent = 'Request Password Reset';
            resendBtn.href = '/forgot-password';
          } else {
            resendBtn.textContent = 'Request New Confirmation Email';
            resendBtn.href = '/verify-email';
          }
        }
      }

      var params = parseParams();
      var err = params.get('error_description') || params.get('error');
      var otpType = params.get('type') || defaultType;
      var isRecovery = isDefaultRecovery || otpType === 'recovery';

      if (err) {
        showError(
          isRecovery ? 'Reset Link Error' : 'Verification Link Error',
          decodeURIComponent(err.replace(/\\+/g, ' ')),
          isRecovery
        );
        return;
      }

      var code = params.get('code');
      if (code) {
        window.location.replace('/auth/callback' + (window.location.search || ''));
        return;
      }

      var accessToken = params.get('access_token');
      var refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        var targetDest = isRecovery ? '/reset-password' : nextPath;
        // Post tokens to server to establish HttpOnly SSR session cookies
        fetch('/api/auth/session?next=' + encodeURIComponent(targetDest), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_token: accessToken,
            refresh_token: refreshToken
          })
        }).then(function(res) {
          window.location.replace(targetDest);
        }).catch(function() {
          window.location.replace(targetDest);
        });
        return;
      }

      // Check if user already has an active session via cookie or client
      fetch('/api/auth/profile')
        .then(function(res) {
          if (res.ok) {
            window.location.replace(isRecovery ? '/reset-password' : nextPath);
          } else {
            showError(
              isRecovery ? 'Reset Link Expired or Invalid' : 'Confirmation Link Expired or Invalid',
              isRecovery
                ? 'This password reset link is invalid or has expired. Please request a new reset link.'
                : 'This email confirmation link is invalid, expired, or has already been used.',
              isRecovery
            );
          }
        })
        .catch(function() {
          showError(
            'Authentication Error',
            'Unable to complete verification. Please check your network connection and try again.',
            isRecovery
          );
        });
    })();
  </script>
</body>
</html>`;
}

/**
 * POST /api/auth/session
 * Establishes and synchronizes an authoritative server-side session from valid client-supplied tokens.
 * Attaches HttpOnly SSR session cookies to the response and ensures the user profile exists in database.
 */
export async function handleAuthSessionPost(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json().catch(() => ({}));
    const { access_token, refresh_token } = body || {};

    if (!access_token || !refresh_token || typeof access_token !== "string" || typeof refresh_token !== "string") {
      return NextResponse.json(
        { error: "access_token and refresh_token are required strings." },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const next = getSafeRedirectPath(searchParams.get("next"), "/dashboard");

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://djqgpcbjcszczcfrirri.supabase.co";
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.mock-key";

    const response = NextResponse.json({
      success: true,
      redirect: next,
    });

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

    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (sessionError || !sessionData?.user) {
      console.warn("[Auth Session Post Warning]:", sessionError?.message);
      return NextResponse.json(
        { error: sessionError?.message || "Invalid or expired session tokens." },
        { status: 401 }
      );
    }

    // Provision or sync candidate profile in the database
    await syncUserProfile(sessionData.user);

    return response;
  } catch (err: any) {
    console.error("[Auth Session Post Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error during session synchronization." },
      { status: 500 }
    );
  }
}
