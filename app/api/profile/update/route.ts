import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { StreamOption } from "@/types/database";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { validateTargetPair } from "@/lib/college-offerings";

export const dynamic = "force-dynamic";

interface ProfileUpdatePayload {
  userId?: string;
  targetStream?: StreamOption | string;
  targetUniversity?: string;
  targetCollege?: string;
  targetCourse?: string;
  fullName?: string;
  selectedSubjects?: string[];
  selected_subjects?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as ProfileUpdatePayload;
    const { targetStream, targetUniversity, targetCollege, targetCourse, fullName, selectedSubjects, selected_subjects } = body;

    let authUser = null;
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      authUser = user;
    } catch {}

    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized: Active user session required." },
        { status: 401 }
      );
    }

    if (targetCollege && targetCourse) {
      const validation = validateTargetPair(targetCollege, targetCourse);
      if (!validation.isValid) {
        return NextResponse.json(
          { error: validation.error || `${targetCollege} does not offer ${targetCourse}.` },
          { status: 400 }
        );
      }
    }

    const targetUserId = authUser.id;

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

    if (targetStream) {
      updatePayload.target_stream = formattedStream;
      const subjectsToUpdate = selectedSubjects || selected_subjects;
      updatePayload.selected_subjects =
        subjectsToUpdate && Array.isArray(subjectsToUpdate) && subjectsToUpdate.length > 0
          ? subjectsToUpdate
          : getSubjectsForStream(formattedStream);
    } else {
      const subjectsToUpdate = selectedSubjects || selected_subjects;
      if (subjectsToUpdate && Array.isArray(subjectsToUpdate)) {
        updatePayload.selected_subjects = subjectsToUpdate;
      }
    }
    if (targetUniversity !== undefined) updatePayload.target_university = targetUniversity;
    if (targetCollege !== undefined) updatePayload.target_college = targetCollege;
    if (targetCourse !== undefined) updatePayload.target_course = targetCourse;
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
