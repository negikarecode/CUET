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

    const isEmailVerified = Boolean(
      user.email_confirmed_at ||
      (user as any).confirmed_at ||
      (user.app_metadata?.provider && user.app_metadata.provider !== "email")
    );

    if (!isEmailVerified) {
      return {
        success: false,
        error: "Email verification required before updating candidate goals.",
      };
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

    // 1. Authoritative synchronization of user_metadata
    try {
      await supabaseAdmin.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...(user.user_metadata || {}),
          ...(input.fullName ? { full_name: input.fullName } : {}),
          ...(input.targetStream ? { target_stream: formattedStream } : {}),
          ...(input.targetUniversity !== undefined ? { target_university: input.targetUniversity } : {}),
          ...(input.targetCollege !== undefined ? { target_college: input.targetCollege } : {}),
          ...(input.targetCourse !== undefined ? { target_course: input.targetCourse } : {}),
          ...(updatePayload.selected_subjects ? { selected_subjects: updatePayload.selected_subjects } : {}),
        },
      });
    } catch (metaErr) {
      console.warn("[Action Metadata Sync Notice]:", metaErr);
    }

    // 2. Update public.profiles in database
    let { data: updatedProfile, error: dbError } = await supabaseAdmin
      .from("profiles")
      .update(updatePayload)
      .eq("id", user.id)
      .select()
      .single();

    // Resilient fallback: If target_course does not exist in profiles schema cache,
    // strip target_course from the update payload and retry so candidate updates succeed.
    if (
      dbError &&
      (dbError.message?.includes("target_course") ||
        (dbError as any).code === "42703" ||
        (dbError as any).code === "PGRST204")
    ) {
      const fallbackPayload = { ...updatePayload };
      delete fallbackPayload.target_course;

      const fallbackResult = await supabaseAdmin
        .from("profiles")
        .update(fallbackPayload)
        .eq("id", user.id)
        .select()
        .single();

      updatedProfile = fallbackResult.data;
      dbError = fallbackResult.error;
    }

    if (dbError) {
      console.error("[Action Update Error]:", dbError);
      return { success: false, error: dbError.message || "Failed to update profile in database." };
    }

    if (updatedProfile && input.targetCourse !== undefined && !updatedProfile.target_course) {
      updatedProfile.target_course = input.targetCourse;
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
