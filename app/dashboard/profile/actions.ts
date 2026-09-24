"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { StreamOption } from "@/types/database";

export interface UpdateProfileGoalsInput {
  targetStream?: StreamOption | string;
  targetUniversity?: string;
  targetCollege?: string;
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

    if (input.targetStream) updatePayload.target_stream = formattedStream;
    if (input.targetUniversity !== undefined) updatePayload.target_university = input.targetUniversity;
    if (input.targetCollege !== undefined) updatePayload.target_college = input.targetCollege;
    if (input.fullName) updatePayload.full_name = input.fullName;
    if (input.selectedSubjects && Array.isArray(input.selectedSubjects)) {
      updatePayload.selected_subjects = input.selectedSubjects;
    }

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
