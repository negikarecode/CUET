import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { validateEmail } from "@/lib/auth/validation";

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

    // 1. Check in students view (direct DB join with auth.users)
    try {
      const { data: studentMatches } = await supabaseAdmin
        .from("students")
        .select("id, email")
        .ilike("email", cleanEmail)
        .limit(1);

      if (studentMatches && studentMatches.length > 0) {
        return NextResponse.json({
          ok: true,
          exists: true,
          message: "An account with this email already exists. Please log in instead.",
        });
      }
    } catch {
      // Continue to listUsers fallback
    }

    // 2. Check directly against Supabase Auth users catalog
    let page = 1;
    const perPage = 500;
    let found = false;

    while (page <= 5) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });

      if (error || !data?.users || data.users.length === 0) {
        break;
      }

      if (data.users.some((u) => u.email?.toLowerCase() === cleanEmail)) {
        found = true;
        break;
      }

      if (data.users.length < perPage) {
        break;
      }
      page++;
    }

    if (found) {
      return NextResponse.json({
        ok: true,
        exists: true,
        message: "An account with this email already exists. Please log in instead.",
      });
    }

    return NextResponse.json({
      ok: true,
      exists: false,
    });
  } catch (error: any) {
    console.error("[check-email] Internal error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to verify email availability." },
      { status: 500 }
    );
  }
}
