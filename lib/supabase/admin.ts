import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedAdminClient: { key: string; client: SupabaseClient } | null = null;
let testAdminClientOverride: any = null;

/**
 * Allows integration test suites to inject a database adapter or mock client.
 */
export function setTestAdminClientOverride(override: any) {
  testAdminClientOverride = override;
}

/**
 * Creates a privileged Supabase client with the Service Role key.
 * Used exclusively in secure server route handlers for profile synchronization
 * and transaction handling bypassing RLS.
 */
export function createAdminClient(): SupabaseClient {
  if (testAdminClientOverride) {
    return testAdminClientOverride;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://djqgpcbjcszczcfrirri.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (cachedAdminClient && serviceRoleKey && cachedAdminClient.key === serviceRoleKey) {
    return cachedAdminClient.client;
  }

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

  const client = createClient(supabaseUrl, effectiveKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  if (serviceRoleKey) {
    cachedAdminClient = { key: serviceRoleKey, client };
  }

  return client;
}

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = createAdminClient();
    const val = (client as any)[prop];
    if (typeof val === "function") {
      return val.bind(client);
    }
    return val;
  },
});
