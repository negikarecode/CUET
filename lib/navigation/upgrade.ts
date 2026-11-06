/**
 * Centralized Upgrade Navigation Helpers.
 *
 * Guarantees consistent routing across all upgrade CTAs, paywalls, and lock icons:
 * - Authenticated users are directed to the dashboard upgrade screen (/dashboard/upgrade).
 * - Logged-out users are directed to the landing page pricing anchor (/#pricing).
 * - Direct checkout intent for logged-out users passes a redirect parameter so the user
 *   lands on /dashboard/upgrade?checkout=1 immediately after signup/login.
 */

export function getUpgradeHref(isAuthed: boolean): string {
  return isAuthed ? "/dashboard/upgrade" : "/#pricing";
}

export function getCheckoutRedirectHref(): string {
  return "/dashboard/upgrade?checkout=1";
}

export function getLoggedOutUpgradeLoginHref(): string {
  return `/login?mode=signup&redirect=${encodeURIComponent(getCheckoutRedirectHref())}`;
}
