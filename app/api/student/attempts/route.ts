import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchServerTestAttempts } from "@/lib/server-attempts";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * GET /api/student/attempts
 * Returns the authoritative list of recorded test attempts for the authenticated candidate.
 */
export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const attempts = await fetchServerTestAttempts(null, user.id);
    return NextResponse.json({
      ok: true,
      attempts: attempts || [],
    });
  } catch (error: any) {
    console.error("[GET /api/student/attempts] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch student attempts" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/student/attempts?testId=<optional>
 * Deletes attempts for the authenticated user (either a specific test or all attempts).
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const testId = searchParams.get("testId");
    const clearAll = searchParams.get("all") === "true";

    if (testId) {
      // Delete specific test attempt
      await supabaseAdmin
        .from("user_attempts")
        .delete()
        .eq("user_id", user.id)
        .eq("test_id", testId);

      return NextResponse.json({
        ok: true,
        message: "Test attempt deleted successfully.",
      });
    }

    if (clearAll) {
      // Delete all attempts and reset progress for this user
      await supabaseAdmin
        .from("user_attempts")
        .delete()
        .eq("user_id", user.id);

      await supabaseAdmin
        .from("profiles")
        .update({
          total_questions_attempted: 0,
          current_streak: 0,
          xp: 0,
          campus_coins: 50,
        })
        .eq("id", user.id);

      return NextResponse.json({
        ok: true,
        message: "All test attempts wiped successfully.",
      });
    }

    return NextResponse.json(
      { ok: false, error: "Missing testId or all=true parameter" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[DELETE /api/student/attempts] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to delete attempt" },
      { status: 500 }
    );
  }
}
