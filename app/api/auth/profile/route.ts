import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/profile
 * Upserts user profile in public.profiles table using admin client to guarantee
 * storage even before email confirmations or custom RLS policies.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      fullName,
      targetStream,
      targetUniversity,
      targetCollege,
    } = body;

    if (!id || !fullName) {
      return NextResponse.json(
        { error: "User ID and Full Name are required" },
        { status: 400 }
      );
    }

    // Capitalize target stream for database constraint: 'Science' | 'Commerce' | 'Humanities'
    const formattedStream =
      targetStream?.toLowerCase() === "commerce"
        ? "Commerce"
        : targetStream?.toLowerCase() === "humanities"
        ? "Humanities"
        : "Science";

    const supabaseAdmin = createAdminClient();

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id,
          full_name: fullName,
          target_stream: formattedStream,
          target_university: targetUniversity || "Delhi University",
          target_college: targetCollege || "SRCC",
          xp: 0,
          campus_coins: 50,
          current_streak: 1,
          last_practice_date: new Date().toISOString().split("T")[0],
          is_premium: false,
          subscription_tier: "free",
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      console.error("[Auth Profile Upsert Error]:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (err: any) {
    console.error("[Auth Profile Unexpected Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/profile?id=<userId>
 * Retrieves authentic user profile data from public.profiles
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID parameter required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !profile) {
      return NextResponse.json(
        { error: error?.message || "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
