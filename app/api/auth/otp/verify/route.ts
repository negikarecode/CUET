import { NextRequest, NextResponse } from "next/server";
import { verifyOtpCode, OtpType } from "@/lib/auth/otp-service";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { validateEmail, isPasswordValid } from "@/lib/auth/validation";

export const dynamic = "force-dynamic";

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
    const newPassword = body.newPassword ? String(body.newPassword) : undefined;

    if (!validateEmail(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email format." },
        { status: 400 }
      );
    }

    // 1. Verify 6-digit code against HMAC-SHA256 hash
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

    // 2. Lookup user in Supabase auth.users
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

    // 3. Handle action per type
    if (type === "signup") {
      if (targetUser) {
        // Mark user as email confirmed in Supabase
        await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
          email_confirm: true,
        });
      }

      // Generate a magiclink session token for immediate client authentication
      const link = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: cleanEmail,
      });

      return NextResponse.json({
        ok: true,
        verified: true,
        token_hash: link.data?.properties?.hashed_token,
        userId: targetUser?.id,
        message: "Email address successfully verified!",
      });
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

      return NextResponse.json({
        ok: true,
        verified: true,
        token_hash: link.data?.properties?.hashed_token,
        userId: targetUser.id,
        message: "One-time code verified. Signing you in...",
      });
    }

    if (type === "recovery") {
      if (!targetUser) {
        return NextResponse.json(
          { ok: false, error: "No account found registered with this email address." },
          { status: 404 }
        );
      }

      // If new password is provided directly in the request, update it immediately
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

        // Generate magiclink session token for automatic login
        const link = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: cleanEmail,
        });

        return NextResponse.json({
          ok: true,
          passwordUpdated: true,
          token_hash: link.data?.properties?.hashed_token,
          userId: targetUser.id,
          message: "Password successfully updated! Logging you in...",
        });
      }

      // Otherwise, return recovery token so the UI can prompt for new password
      const link = await supabaseAdmin.auth.admin.generateLink({
        type: "recovery",
        email: cleanEmail,
      });

      return NextResponse.json({
        ok: true,
        verified: true,
        token_hash: link.data?.properties?.hashed_token,
        email: cleanEmail,
        message: "Code verified. Please set your new password.",
      });
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
