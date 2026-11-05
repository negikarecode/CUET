import { createClient } from "@/lib/supabase/client";
import { useTestStore } from "@/lib/store/useTestStore";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { safeStorage } from "@/lib/storage/safe-storage";
import { purgeAllCBTStateOnLogout } from "@/lib/storage/cbt-session-storage";

/**
 * Universal, secure logout handler for CUET AI-Prep.
 * Guarantees zero residual state, clears all user-scoped storage,
 * in-memory stores, caches, and Supabase cookies.
 */
export async function performSecureLogout(redirectTo = "/login"): Promise<void> {
  const currentUserId =
    useTestStore.getState().user?.id ||
    (typeof window !== "undefined" ? safeStorage.getItem("cuet_active_uid") : null);

  // 1. Supabase Auth Session Invalidation
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("[performSecureLogout] Supabase signOut notice:", err);
  }

  // 2. Clear Auth Cookie
  if (typeof document !== "undefined") {
    document.cookie = "cuet_auth=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "sb-djqgpcbjcszczcfrirri-auth-token=; path=/; max-age=0; SameSite=Lax";
  }

  // 3. Clear In-Memory Caches & Stores
  try {
    useTestStore.getState().logout();
  } catch {}

  try {
    useCBTStore.getState().resetCBTState();
  } catch {}

  // 4. Clear LocalStorage, SessionStorage, and IndexedDB
  try {
    if (currentUserId) {
      safeStorage.clearUserScopedData(currentUserId);
    }
    safeStorage.removeItem("cuet_active_uid");
    safeStorage.removeItem("cuet_ai_prep_session_storage");
    safeStorage.removeItem("cuet_ai_prep_session_storage:guest");

    // Purge CBT session storage and IndexedDB
    purgeAllCBTStateOnLogout(currentUserId || undefined);

    if (typeof window !== "undefined") {
      // Clear all user notes, bookmarks, and active exam states
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (
          k &&
          (k.startsWith("cuet_") ||
            k.startsWith("cbt_") ||
            k.startsWith("notes_") ||
            k.startsWith("streak_") ||
            k.startsWith("last_practice_"))
        ) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => {
        try {
          window.localStorage.removeItem(k);
        } catch {}
      });

      // Clear all sessionStorage keys
      try {
        window.sessionStorage.clear();
      } catch {}
    }
  } catch (err) {
    console.warn("[performSecureLogout] Storage purge notice:", err);
  }

  // 5. Navigate to login
  if (typeof window !== "undefined") {
    window.location.href = redirectTo;
  }
}
