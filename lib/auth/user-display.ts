/**
 * Authoritative user display helper.
 * Derives authentic user names, emails, and avatar initials.
 * Strictly prevents placeholder leaks ("Aspirant", "aspirant@gmail.com", "CUET Aspirant", "Aryan 3").
 */

export interface UserDisplayInfo {
  displayName: string;
  displayEmail: string;
  initials: string;
  isRealUser: boolean;
}

export function isPlaceholderName(name?: string | null): boolean {
  if (!name) return true;
  const normalized = name.trim().toLowerCase();
  return (
    normalized === "cuet aspirant" ||
    normalized === "aspirant" ||
    normalized === "cuet candidate" ||
    normalized === "candidate" ||
    normalized === "aryan 3" ||
    normalized === "guest" ||
    normalized === "student" ||
    normalized === "erased candidate" ||
    normalized === ""
  );
}

export function isPlaceholderEmail(email?: string | null): boolean {
  if (!email) return true;
  const normalized = email.trim().toLowerCase();
  return (
    normalized.startsWith("aspirant@") ||
    normalized.startsWith("cuet") ||
    normalized.startsWith("student@") ||
    normalized.startsWith("candidate@") ||
    normalized.startsWith("test@") ||
    normalized.includes("aspirant@") ||
    normalized.includes("cuet-prep.in") ||
    normalized.includes("cuetmate.in") ||
    normalized.includes("example.com") ||
    normalized === "aspirant@gmail.com" ||
    normalized === ""
  );
}

/**
 * Synchronously retrieves stored Supabase Auth user credentials from browser localStorage.
 * Enables instantaneous first-paint hydration of authentic candidate name and email without waiting for async IPC hops.
 */
export function getClientAuthSession(): {
  id?: string;
  email?: string;
  fullName?: string;
} | null {
  if (typeof window === "undefined") return null;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        ((key.startsWith("sb-") && key.endsWith("-auth-token")) ||
          key === "supabase.auth.token")
      ) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          const u = parsed?.user || parsed?.currentSession?.user;
          if (u?.id || u?.email) {
            return {
              id: u.id,
              email: u.email,
              fullName:
                u.user_metadata?.full_name ||
                u.user_metadata?.name ||
                "",
            };
          }
        }
      }
    }
  } catch {}
  return null;
}

export function formatNameFromEmail(email: string): string {
  if (!email || isPlaceholderEmail(email)) return "";
  const prefix = email.split("@")[0] || "";
  // Strip numbers and replace separators with space
  const lettersOnly = prefix.replace(/[._-]+/g, " ").replace(/\d+/g, "").trim();

  if (lettersOnly) {
    return lettersOnly
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  // If prefix was pure numbers or symbols, capitalize prefix
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

export function resolveUserDisplay(
  authUser?: {
    email?: string | null;
    user_metadata?: { full_name?: string; name?: string } | null;
  } | null,
  profile?: {
    full_name?: string | null;
    email?: string | null;
  } | null,
  storeUser?: {
    name?: string | null;
    email?: string | null;
  } | null
): UserDisplayInfo {
  // Retrieve synchronous client session from storage if in browser
  const clientAuth = typeof window !== "undefined" ? getClientAuthSession() : null;

  // 1. Resolve authentic email (ignore any fake placeholder emails)
  const candidateEmails = [
    authUser?.email,
    profile?.email,
    clientAuth?.email,
    storeUser?.email,
  ];

  let displayEmail = "";
  for (const email of candidateEmails) {
    if (email && !isPlaceholderEmail(email)) {
      displayEmail = email.trim();
      break;
    }
  }

  // 2. Resolve authentic full name
  const candidateNames = [
    profile?.full_name,
    authUser?.user_metadata?.full_name,
    authUser?.user_metadata?.name,
    clientAuth?.fullName,
    storeUser?.name,
  ];

  let resolvedName = "";
  for (const name of candidateNames) {
    if (name && !isPlaceholderName(name)) {
      resolvedName = name.trim();
      break;
    }
  }

  // 3. If no name found, derive from authentic email prefix
  if (!resolvedName && displayEmail) {
    resolvedName = formatNameFromEmail(displayEmail);
  }

  const isRealUser = Boolean(displayEmail || (resolvedName && !isPlaceholderName(resolvedName)));
  const emailPrefix = displayEmail ? displayEmail.split("@")[0] || "" : "";
  const displayName: string = resolvedName || emailPrefix || "Candidate";

  // 4. Derive initials
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CU";

  return {
    displayName,
    displayEmail,
    initials,
    isRealUser,
  };
}
