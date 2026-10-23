/**
 * Canonical URL helpers for Supabase authentication redirects.
 * Ensures consistent callback URLs across SSR, client-side, preview, and production deployments.
 */

export function getAuthSiteUrl(): string {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  // Production fallback matching the authoritative Supabase Site URL
  return "https://cuetmate-negihikehde.vercel.app";
}

/**
 * Generates the canonical callback URL for email verification and OAuth.
 */
export function getAuthCallbackUrl(nextPath = "/dashboard"): string {
  const siteUrl = getAuthSiteUrl();
  const safeNext = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNext)}`;
}

/**
 * Generates the canonical recovery (password reset) callback URL.
 */
export function getAuthRecoveryUrl(nextPath = "/reset-password"): string {
  const siteUrl = getAuthSiteUrl();
  const safeNext = nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  return `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNext)}&type=recovery`;
}
