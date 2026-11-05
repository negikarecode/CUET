import { NextRequest, NextResponse } from "next/server";
import {
  generateNumericOtp,
  saveOtp,
  OtpType,
  OTP_EXPIRY_MS,
} from "@/lib/auth/otp-service";
import {
  createPendingRegistration,
  generateRegistrationId,
  generateSecureNumericOtp,
  consumePendingRegistration,
} from "@/lib/auth/pending-registration-service";
import { sendOtpEmail, BrevoError } from "@/lib/email/brevo";
import { validateEmail } from "@/lib/auth/validation";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !body.email) {
      return NextResponse.json(
        { ok: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(body.email).trim().toLowerCase();
    const type = (body.type || "signup") as OtpType;
    const metadata = body.metadata || {};

    if (!validateEmail(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email format." },
        { status: 400 }
      );
    }

    // IP rate check identifier
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = (forwardedFor ? forwardedFor.split(",")[0]?.trim() : null) || "127.0.0.1";

    // ─────────────────────────────────────────────────────────────────────────
    // STAGE A: PENDING REGISTRATION (type === 'signup')
    // ─────────────────────────────────────────────────────────────────────────
    if (type === "signup") {
      // 1. Check if user already exists and is verified in auth.users
      try {
        const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 50,
        });
        const existingVerifiedUser = usersData?.users?.find(
          (u) =>
            u.email?.toLowerCase() === cleanEmail &&
            Boolean(u.email_confirmed_at || (u as any).confirmed_at)
        );

        if (existingVerifiedUser) {
          return NextResponse.json(
            {
              ok: false,
              error: "An account with this email already exists. Please log in instead.",
              code: "ACCOUNT_EXISTS",
            },
            { status: 409 }
          );
        }
      } catch (checkErr) {
        // Proceed if listing fails
      }

      // 2. Validate required registration payload fields if provided
      const password = body.password ? String(body.password) : "";
      const fullName = body.fullName || body.full_name || body.name || "CUET Aspirant";
      const targetCollege = body.targetCollege || body.target_college || "Central University";
      const targetUniversity = body.targetUniversity || body.target_university || "Delhi University";
      const targetCourse = body.targetCourse || body.target_course || "Undergraduate Program";
      const targetStream = body.targetStream || body.target_stream || "Science";
      const selectedSubjects = Array.isArray(body.selectedSubjects || body.selected_subjects)
        ? body.selectedSubjects || body.selected_subjects
        : [];
      const age = body.age ? String(body.age) : "18";

      // 3. Generate cryptographic transaction ID & 6-digit OTP
      const registrationId = body.registrationId || generateRegistrationId();
      const code = generateSecureNumericOtp();

      // 4. Store in pending registration record (Passcode encrypted via AES-256-GCM, OTP hashed via HMAC-SHA256)
      const saveResult = await createPendingRegistration({
        registrationId,
        email: cleanEmail,
        password: password || "TempCandidateSecureKey_2026!",
        candidateDetails: {
          fullName,
          age,
          targetCollege,
          targetUniversity,
          targetCourse,
          targetStream,
          selectedSubjects,
        },
        otpCode: code,
        ip,
      });

      if (!saveResult.success) {
        return NextResponse.json(
          {
            ok: false,
            error: saveResult.error || "Please wait before requesting another code.",
            cooldownRemaining: saveResult.cooldownRemaining,
          },
          { status: 429 }
        );
      }

      // 5. Dispatch email via Brevo REST API
      try {
        await sendOtpEmail({
          email: cleanEmail,
          code,
          type: "signup",
          expiryMinutes: Math.round(OTP_EXPIRY_MS / 60000), // 5 minutes
        });
      } catch (emailErr: any) {
        console.error("[OTP Send Error via Brevo]:", emailErr);

        // Fail-Closed: Rollback the pending registration record so no orphan state remains
        await consumePendingRegistration(registrationId, "expired");

        if (emailErr instanceof BrevoError && emailErr.isIpBlocked) {
          return NextResponse.json(
            {
              ok: false,
              error:
                "Brevo IP authorization required. Please visit Brevo Settings -> Security -> Authorized IPs and deactivate IP blocking or authorize your server IP.",
              code: "BREVO_IP_UNAUTHORIZED",
            },
            { status: 403 }
          );
        }

        return NextResponse.json(
          {
            ok: false,
            error: emailErr?.message || "Failed to dispatch verification email. Please try again shortly.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        ok: true,
        registrationId,
        message: "A 6-digit verification code has been dispatched to your email address.",
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // LOGIN / RECOVERY FLOWS (type === 'login' || type === 'recovery')
    // ─────────────────────────────────────────────────────────────────────────
    try {
      const { data: usersData } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 50,
      });
      const existingUser = usersData?.users?.find(
        (u) => u.email?.toLowerCase() === cleanEmail
      );

      if (!existingUser) {
        // Account enumeration defense: respond with success to avoid leaking registration state
        return NextResponse.json({
          ok: true,
          message: "If your email is registered, a 6-digit verification code has been dispatched.",
        });
      }
    } catch (checkErr) {
      // Proceed even if admin listing fails
    }

    // Generate 6-digit OTP
    const code = generateNumericOtp();

    // Store HMAC-SHA256 hash with 60-second cooldown enforcement and 5-min expiry
    const saveResult = await saveOtp({
      email: cleanEmail,
      type,
      code,
      metadata: { ...metadata, ip },
    });

    if (!saveResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: saveResult.error || "Please wait before requesting another code.",
          cooldownRemaining: saveResult.cooldownRemaining,
        },
        { status: 429 }
      );
    }

    // Dispatch email via Brevo REST API
    try {
      await sendOtpEmail({
        email: cleanEmail,
        code,
        type,
        expiryMinutes: Math.round(OTP_EXPIRY_MS / 60000), // 5 minutes
      });
    } catch (emailErr: any) {
      console.error("[OTP Send Error via Brevo]:", emailErr);

      if (emailErr instanceof BrevoError && emailErr.isIpBlocked) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Brevo IP authorization required. Please visit Brevo Settings -> Security -> Authorized IPs and deactivate IP blocking or authorize your server IP.",
            code: "BREVO_IP_UNAUTHORIZED",
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          ok: false,
          error: emailErr?.message || "Failed to dispatch email. Please try again shortly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "A 6-digit verification code has been sent to your email address.",
    });
  } catch (error: any) {
    console.error("[OTP Send Fatal Error]:", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while sending verification code." },
      { status: 500 }
    );
  }
}
