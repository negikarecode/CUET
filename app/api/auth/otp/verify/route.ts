import { NextRequest, NextResponse } from "next/server";
import { verifyOtpCode, OtpType } from "@/lib/auth/otp-service";
import {
  verifyPendingRegistrationOtp,
  consumePendingRegistration,
} from "@/lib/auth/pending-registration-service";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { validateEmail, isPasswordValid } from "@/lib/auth/validation";
import { createServerClient } from "@supabase/ssr";
import { syncUserProfile } from "@/lib/api-handlers/auth-session";

export const dynamic = "force-dynamic";

/**
 * Attaches Supabase SSR session cookies directly to the outgoing NextResponse
 * using the generated magic link token_hash.
 */
async function attachSessionCookies(
  request: NextRequest,
  response: NextResponse,
  tokenHash: string,
  type: "magiclink" | "recovery" = "magiclink"
): Promise<boolean> {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://djqgpcbjcszczcfrirri.supabase.co";
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.mock-key";

    const ssrClient = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data, error } = await ssrClient.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    if (!error && data?.session) {
      return true;
    }
  } catch (err) {
    console.warn("[attachSessionCookies warning]:", err);
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.email || !body.code) {
      return NextResponse.json(
        { ok: false, error: "Email and 6-digit verification code are required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(body.email).trim().toLowerCase();
    const cleanCode = String(body.code).trim();
    const type = (body.type || "signup") as OtpType;
    const registrationId = body.registrationId ? String(body.registrationId).trim() : undefined;
    const newPassword = body.newPassword ? String(body.newPassword) : undefined;

    if (!validateEmail(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email format." },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAGE B: OTP VERIFICATION & ATOMIC ACCOUNT CREATION (type === 'signup')
    // ─────────────────────────────────────────────────────────────────────────
    if (type === "signup") {
      // 1. Verify submitted OTP against HMAC-SHA256 hash in pending registrations
      const verifyResult = await verifyPendingRegistrationOtp({
        registrationId,
        email: cleanEmail,
        code: cleanCode,
      });

      if (!verifyResult.success) {
        return NextResponse.json(
          {
            ok: false,
            error: verifyResult.error || "Incorrect verification code.",
            isExpired: verifyResult.isExpired,
            isMaxAttempts: verifyResult.isMaxAttempts,
          },
          { status: 400 }
        );
      }

      const { record, decryptedPassword } = verifyResult;
      if (!record) {
        return NextResponse.json(
          { ok: false, error: "Pending registration session record not found." },
          { status: 400 }
        );
      }

      // 2. Atomically create permanent candidate account in Supabase
      let targetUser: any = null;
      try {
        const { data: existingData } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 50,
        });
        targetUser = existingData?.users?.find(
          (u) => u.email?.toLowerCase() === cleanEmail
        );

        if (!targetUser) {
          // Fresh permanent user creation
          const createResult = await supabaseAdmin.auth.admin.createUser({
            email: cleanEmail,
            password: decryptedPassword,
            email_confirm: true,
            user_metadata: {
              full_name: record.candidateDetails.fullName,
              age: record.candidateDetails.age,
              target_college: record.candidateDetails.targetCollege,
              target_university: record.candidateDetails.targetUniversity,
              target_course: record.candidateDetails.targetCourse,
              target_stream: record.candidateDetails.targetStream,
              selected_subjects: record.candidateDetails.selectedSubjects,
            },
          });

          if (createResult.error || !createResult.data?.user) {
            console.error("[Account Creation Fatal Error]:", createResult.error);
            return NextResponse.json(
              {
                ok: false,
                error:
                  createResult.error?.message ||
                  "Failed to create verified candidate account. Please retry.",
              },
              { status: 500 }
            );
          }
          targetUser = createResult.data.user;
        } else {
          // Account existed unconfirmed: confirm email and sync password/metadata
          await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
            email_confirm: true,
            password: decryptedPassword,
            user_metadata: {
              full_name: record.candidateDetails.fullName,
              age: record.candidateDetails.age,
              target_college: record.candidateDetails.targetCollege,
              target_university: record.candidateDetails.targetUniversity,
              target_course: record.candidateDetails.targetCourse,
              target_stream: record.candidateDetails.targetStream,
              selected_subjects: record.candidateDetails.selectedSubjects,
            },
          });
        }
      } catch (createErr: any) {
        console.error("[Account Creation Exception]:", createErr);
        return NextResponse.json(
          { ok: false, error: "Database error during account creation." },
          { status: 500 }
        );
      }

      // 3. Associate all candidate profile information with that account
      try {
        await syncUserProfile(targetUser);
      } catch (syncErr) {
        console.warn("[Profile sync warning on signup]:", syncErr);
      }

      // 4. Mark pending registration as completely consumed
      await consumePendingRegistration(record.registrationId, "consumed");

      // 5. Generate magiclink session token and establish SSR cookies directly on response
      const link = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: cleanEmail,
      });

      const tokenHash = link.data?.properties?.hashed_token;
      const response = NextResponse.json({
        ok: true,
        verified: true,
        token_hash: tokenHash,
        userId: targetUser?.id,
        user: {
          id: targetUser?.id,
          email: cleanEmail,
          user_metadata: targetUser?.user_metadata || {},
        },
        message: "Email address successfully verified! Your account is active.",
      });

      if (tokenHash) {
        await attachSessionCookies(request, response, tokenHash, "magiclink");
      }

      return response;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGIN / RECOVERY VERIFICATION (type === 'login' || type === 'recovery')
    // ─────────────────────────────────────────────────────────────────────────
    const verifyResult = await verifyOtpCode({
      email: cleanEmail,
      type,
      code: cleanCode,
    });

    if (!verifyResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: verifyResult.error || "Incorrect verification code.",
          isExpired: verifyResult.isExpired,
          isMaxAttempts: verifyResult.isMaxAttempts,
        },
        { status: 400 }
      );
    }

    // Lookup user in Supabase auth.users
    let targetUser: any = null;
    try {
      const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 100,
      });
      targetUser = usersData?.users?.find(
        (u) => u.email?.toLowerCase() === cleanEmail
      );
    } catch (e) {
      console.error("[OTP Verify] User lookup error:", e);
    }

    if (type === "login") {
      if (!targetUser) {
        return NextResponse.json(
          { ok: false, error: "No account found registered with this email address." },
          { status: 404 }
        );
      }

      // Generate magiclink session token
      const link = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: cleanEmail,
      });

      const tokenHash = link.data?.properties?.hashed_token;
      const response = NextResponse.json({
        ok: true,
        verified: true,
        token_hash: tokenHash,
        userId: targetUser.id,
        user: {
          id: targetUser.id,
          email: cleanEmail,
          user_metadata: targetUser.user_metadata || {},
        },
        message: "One-time code verified. Signing you in...",
      });

      if (tokenHash) {
        await attachSessionCookies(request, response, tokenHash, "magiclink");
      }

      return response;
    }

    if (type === "recovery") {
      if (!targetUser) {
        return NextResponse.json(
          { ok: false, error: "No account found registered with this email address." },
          { status: 404 }
        );
      }

      if (newPassword) {
        if (!isPasswordValid(newPassword)) {
          return NextResponse.json(
            {
              ok: false,
              error:
                "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and a special character.",
            },
            { status: 400 }
          );
        }

        await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
          password: newPassword,
          email_confirm: true,
        });

        const link = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: cleanEmail,
        });

        const tokenHash = link.data?.properties?.hashed_token;
        const response = NextResponse.json({
          ok: true,
          passwordUpdated: true,
          token_hash: tokenHash,
          userId: targetUser.id,
          message: "Password successfully updated! Logging you in...",
        });

        if (tokenHash) {
          await attachSessionCookies(request, response, tokenHash, "magiclink");
        }

        return response;
      }

      const link = await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email: cleanEmail,
      });

      const tokenHash = link.data?.properties?.hashed_token;
      const response = NextResponse.json({
        ok: true,
        verified: true,
        token_hash: tokenHash,
        email: cleanEmail,
        message: "Code verified. Please set your new password.",
      });

      if (tokenHash) {
        await attachSessionCookies(request, response, tokenHash, "recovery");
      }

      return response;
    }

    return NextResponse.json({
      ok: true,
      verified: true,
    });
  } catch (error: any) {
    console.error("[OTP Verify Fatal Error]:", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while verifying code." },
      { status: 500 }
    );
  }
}
