import { createClient } from "@supabase/supabase-js";

/**
 * Creates a privileged Supabase client with the Service Role key.
 * Used exclusively in secure server route handlers for profile synchronization
 * and transaction handling bypassing RLS.
 */
export function createAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://djqgpcbjcszczcfrirri.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey && process.env.NODE_ENV === "production" && typeof window === "undefined" && !process.env.NEXT_PHASE) {
    // In production runtime, refuse to silently operate as anon for admin tasks
    console.error(
      "[SECURITY FATAL]: SUPABASE_SERVICE_ROLE_KEY is missing in production environment. Admin client cannot safely authenticate."
    );
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for admin database operations in production."
    );
  }

  const effectiveKey =
    serviceRoleKey ||
    (process.env.NODE_ENV !== "production" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined) ||
    "dummy-service-role-key-for-test-environments";

  return createClient(supabaseUrl, effectiveKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export const supabaseAdmin = createAdminClient();
