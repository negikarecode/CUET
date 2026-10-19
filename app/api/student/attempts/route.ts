import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { fetchServerTestAttempts } from "@/lib/server-attempts";
import { stringToUuid } from "@/lib/utils";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";

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

/**
 * DELETE /api/student/attempts
 * Deletes all user_attempts for the specified testId for the authenticated student.
 */
export async function DELETE(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateId = getClientRateLimitIdentifier(req, user.id, "student:attempts_delete");
    const rateCheck = await rateLimit("student:attempts_delete", rateId);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    const { searchParams } = new URL(req.url);
    let testId = searchParams.get("testId");
    if (!testId) {
      const body = await req.json().catch(() => ({}));
      testId = body.testId || body.id;
    }

    if (!testId) {
      return NextResponse.json({ error: "testId is required" }, { status: 400 });
    }

    const testUuid = stringToUuid(testId);
    const supabaseAdmin = createAdminClient();

    // Delete matching rows in user_attempts
    await supabaseAdmin
      .from("user_attempts")
      .delete()
      .eq("user_id", user.id)
      .in("test_id", [testId, testUuid]);

    // Recompute total questions attempted for user
    const { count: remainingCount } = await supabaseAdmin
      .from("user_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);

    await supabaseAdmin
      .from("profiles")
      .update({ total_questions_attempted: remainingCount || 0 })
      .eq("id", user.id);

    return NextResponse.json({
      success: true,
      message: "Session deleted successfully",
      remainingCount: remainingCount || 0,
    });
  } catch (err: any) {
    console.error("[Student Attempts Delete Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
