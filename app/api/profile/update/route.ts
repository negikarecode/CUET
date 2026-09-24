import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { StreamOption } from "@/types/database";

export const dynamic = "force-dynamic";

interface ProfileUpdatePayload {
  userId?: string;
  targetStream?: StreamOption | string;
  targetUniversity?: string;
  targetCollege?: string;
  fullName?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as ProfileUpdatePayload;
    const { targetStream, targetUniversity, targetCollege, fullName } = body;

    let targetUserId = body.userId;

    // 1. Authenticate user from Supabase Server Session
    try {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        targetUserId = authUser.id;
      }
    } catch {
      // Local dev fallback
    }

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Unauthorized: User session not found." },
        { status: 401 }
      );
    }

    // Normalize stream option
    let formattedStream: StreamOption = "Science";
    if (targetStream) {
      const streamLow = targetStream.toLowerCase();
      if (streamLow === "commerce") formattedStream = "Commerce";
      else if (streamLow === "humanities") formattedStream = "Humanities";
      else formattedStream = "Science";
    }

    const supabaseAdmin = createAdminClient();

    // Prepare update payload
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (targetStream) updatePayload.target_stream = formattedStream;
    if (targetUniversity !== undefined) updatePayload.target_university = targetUniversity;
    if (targetCollege !== undefined) updatePayload.target_college = targetCollege;
    if (fullName) updatePayload.full_name = fullName;

    // Execute update
    const { data: updatedProfile, error } = await supabaseAdmin
      .from("profiles")
      .update(updatePayload)
      .eq("id", targetUserId)
      .select()
      .single();

    if (error) {
      console.error("[Profile Update Database Error]:", error);
      return NextResponse.json(
        { error: error.message || "Failed to update profile." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Academic goals updated successfully.",
      profile: updatedProfile,
    });
  } catch (error: any) {
    console.error("[Profile Update Route Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
