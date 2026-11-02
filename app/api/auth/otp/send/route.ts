import { NextRequest, NextResponse } from "next/server";
import { generateNumericOtp, saveOtp, OtpType } from "@/lib/auth/otp-service";
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

    // Basic IP rate check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = (forwardedFor ? forwardedFor.split(",")[0]?.trim() : null) || "127.0.0.1";

    // For login or recovery, verify if user exists in auth.users to avoid spamming
    if (type === "login" || type === "recovery") {
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
    }

    // Generate 6-digit OTP
    const code = generateNumericOtp();

    // Store HMAC-SHA256 hash with 60-second cooldown enforcement
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
        expiryMinutes: 10,
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
