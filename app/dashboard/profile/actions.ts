"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { StreamOption } from "@/types/database";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import { validateTargetPair } from "@/lib/college-offerings";
import { rateLimit } from "@/lib/security/rateLimiter";

export interface UpdateProfileGoalsInput {
  targetStream?: StreamOption | string;
  targetUniversity?: string;
  targetCollege?: string;
  targetCourse?: string;
  fullName?: string;
  selectedSubjects?: string[];
}

export async function updateProfileGoalsAction(input: UpdateProfileGoalsInput) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication session expired. Please log in again." };
    }

    const rateCheck = await rateLimit("user:profile_update", `usr:${user.id}`);
    if (!rateCheck.success) {
      return {
        success: false,
        error: rateCheck.error || "Profile update rate limit reached. Please wait a minute before updating again.",
      };
    }

    // Validate college-program combination
    if (input.targetCollege && input.targetCourse) {
      const validation = validateTargetPair(input.targetCollege, input.targetCourse);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error || `${input.targetCollege} does not offer ${input.targetCourse}.`,
        };
      }
    }

    let formattedStream: StreamOption = "Science";
    if (input.targetStream) {
      const streamLow = input.targetStream.toLowerCase();
      if (streamLow === "commerce") formattedStream = "Commerce";
      else if (streamLow === "humanities") formattedStream = "Humanities";
      else formattedStream = "Science";
    }

    const supabaseAdmin = createAdminClient();
    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (input.targetStream) {
      updatePayload.target_stream = formattedStream;
      updatePayload.selected_subjects =
        input.selectedSubjects && Array.isArray(input.selectedSubjects) && input.selectedSubjects.length > 0
          ? input.selectedSubjects
          : getSubjectsForStream(formattedStream);
    } else if (input.selectedSubjects && Array.isArray(input.selectedSubjects)) {
      updatePayload.selected_subjects = input.selectedSubjects;
    }
    if (input.targetUniversity !== undefined) updatePayload.target_university = input.targetUniversity;
    if (input.targetCollege !== undefined) updatePayload.target_college = input.targetCollege;
    if (input.targetCourse !== undefined) updatePayload.target_course = input.targetCourse;
    if (input.fullName) updatePayload.full_name = input.fullName;

    const { data: updatedProfile, error: dbError } = await supabaseAdmin
      .from("profiles")
      .update(updatePayload)
      .eq("id", user.id)
      .select()
      .single();

    if (dbError) {
      console.error("[Action Update Error]:", dbError);
      return { success: false, error: dbError.message || "Failed to update profile in database." };
    }

    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");

    return {
      success: true,
      profile: updatedProfile,
    };
  } catch (err: any) {
    console.error("[Action Unexpected Error]:", err);
    return { success: false, error: err?.message || "An unexpected error occurred." };
  }
}
