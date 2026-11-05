import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/auth/validation";
import { classifyEmail } from "@/lib/auth/email-classification";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const rawEmail = typeof body.email === "string" ? body.email : "";
    const cleanEmail = rawEmail.trim().toLowerCase();

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Authoritative email classification:
    // Only genuine permanent verified accounts (auth.users + email_confirmed_at != null) produce exists: true.
    // Pending registrations, expired codes, or unconfirmed accounts must NEVER block new registrations.
    const result = await classifyEmail(cleanEmail);

    if (result.category === "VERIFIED_EXISTING") {
      return NextResponse.json({
        ok: true,
        exists: true,
        category: result.category,
        message: result.message || "An account with this email already exists. Please log in instead.",
      });
    }

    return NextResponse.json({
      ok: true,
      exists: false,
      category: result.category,
      isPending: result.isPending,
      isExpired: result.isExpired,
      registrationId: result.registrationId,
    });
  } catch (error: any) {
    console.error("[check-email] Internal error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to verify email availability." },
      { status: 500 }
    );
  }
}
