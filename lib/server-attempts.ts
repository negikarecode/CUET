import { SupabaseClient } from "@supabase/supabase-js";
import { RecordedTestAttempt } from "@/types";
import { getUserProgress } from "@/lib/user-progress";

/**
 * Reconstructs authentic RecordedTestAttempt[] from public.user_attempts in Supabase
 * using the authoritative getUserProgress single source of truth.
 * Authoritative single source of truth for student test history directly synced to database.
 * Requires an authenticated, non-empty userId and queries via privileged admin client
 * to join authoritative question metadata while strictly enforcing user ownership.
 */
export async function fetchServerTestAttempts(
  _supabase: SupabaseClient | null,
  userId: string
): Promise<RecordedTestAttempt[]> {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new Error("[SECURITY FATAL] fetchServerTestAttempts requires a non-empty authenticated userId.");
  }

  try {
    const progress = await getUserProgress(userId);
    return progress.serverAttempts;
  } catch (err) {
    console.error("[fetchServerTestAttempts Exception]:", err);
    return [];
  }
}
