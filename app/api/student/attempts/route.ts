import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchServerTestAttempts } from "@/lib/server-attempts";

export const dynamic = "force-dynamic";

/**
 * GET /api/student/attempts
 * Returns authentic test attempts for the authenticated user directly synced from Supabase.
 */
export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({
        success: true,
        authenticated: false,
        attempts: [],
      });
    }

    const attempts = await fetchServerTestAttempts(supabase, user.id);

    return NextResponse.json(
      {
        success: true,
        authenticated: true,
        userId: user.id,
        attempts,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    console.error("[Student Attempts Route Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
