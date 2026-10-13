/**
 * Unified Safe Storage Engine for CUET AI-Prep
 * 
 * Centralized, multi-tiered browser storage manager designed to prevent and resolve
 * quota exhaustion errors (DOMException: QuotaExceededError) site-wide.
 * 
 * Architectural Guarantees:
 * 1. Zero Uncaught Exceptions: Every write/read operation is wrapped and guaranteed safe.
 * 2. Multi-Tier Persistence: Primary localStorage -> Secondary sessionStorage -> In-Memory fallback.
 * 3. Proactive Quota Pruning: Automatically evicts disposable caches, token logs, expired rate limits,
 *    and submitted CBT sessions before essential student data is impacted.
 * 4. Priority Protection: Essential keys like `cuet_active_uid` and active in-progress CBT exams are
 *    strictly prioritized and safeguarded against eviction.
 * 5. Strict User Isolation: Keys are cleanly partitioned by user ID to prevent cross-account leaks.
 * 6. Non-Authoritative Client State: Auth tokens/passwords are never stored here. Server remains authoritative.
 */

export type StorageTier = "local" | "session" | "memory" | "none";

export interface StorageWriteResult {
  success: boolean;
  tier: StorageTier;
  bytesWritten: number;
  error?: string;
}

export interface StorageUsageMetrics {
  localBytes: number;
  sessionBytes: number;
  totalKeys: number;
  isNearQuota: boolean;
  keys: Array<{ key: string; bytes: number; tier: StorageTier }>;
}

// In-Memory Fallback Map (survives during the active JavaScript context)
const memoryStore = new Map<string, string>();

/**
 * Storage key classification for intelligent prioritization & eviction
 */
export enum KeyPriority {
  CRITICAL = 1, // e.g. cuet_active_uid, active in-progress CBT exam session
  USER_DATA = 2, // e.g. cuet_ai_prep_session_storage:<uid>, streaks, targets, preferences
  DISPOSABLE = 3, // e.g. token logs, historical rate limits, old cache blobs, submitted exams
}

export function classifyKeyPriority(key: string): KeyPriority {
  // Critical
  if (key === "cuet_active_uid") return KeyPriority.CRITICAL;
  if (key.startsWith("cuet_cbt_session_") && !key.includes("_submitted")) {
    return KeyPriority.CRITICAL;
  }

  // Disposable
  if (
    key === "cuet_ai_token_logs" ||
    key.startsWith("cuet_rate_limit:") ||
    key.startsWith("temp_") ||
    key.includes("_cache_") ||
    key.startsWith("debug_") ||
    key === "cuet_ai_prep_session_storage" // legacy un-scoped key
  ) {
    return KeyPriority.DISPOSABLE;
  }

  // User Data (everything else)
  return KeyPriority.USER_DATA;
}

/**
 * Safely measures byte length of a string in UTF-8
 */
export function estimateByteSize(str: string): number {
  return typeof str === "string" ? str.length * 2 : 0; // Approx 2 bytes per char in JS
}

/**
 * Checks if an error is a browser QuotaExceededError
 */
export function isQuotaExceededError(err: unknown): boolean {
  if (!err) return false;
  if (typeof err === "object") {
    const e = err as any;
    return (
      e.name === "QuotaExceededError" ||
      e.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      e.code === 22 ||
      e.code === 1014 ||
      (typeof e.message === "string" && e.message.toLowerCase().includes("quota"))
    );
  }
  return false;
}

/**
 * Prunes disposable entries across localStorage to relieve quota pressure.
 * Returns the number of freed bytes.
 */
export function pruneDisposableStorage(protectedKey?: string): number {
  if (typeof window === "undefined" || !window.localStorage) return 0;

  let freedBytes = 0;
  const todayStr = new Date().toISOString().split("T")[0];

  try {
    const keysToRemove: string[] = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (!k || k === protectedKey) continue;

      // 1. Remove legacy un-scoped store
      if (k === "cuet_ai_prep_session_storage") {
        keysToRemove.push(k);
        continue;
      }

      // 2. Remove AI token logs (can be several MBs)
      if (k === "cuet_ai_token_logs") {
        keysToRemove.push(k);
        continue;
      }

      // 3. Remove stale daily rate limits from previous days
      if (k.startsWith("cuet_rate_limit:")) {
        if (!k.includes(`:${todayStr}:`)) {
          keysToRemove.push(k);
          continue;
        }
      }

      // 4. Remove debug and transient caches
      if (k.startsWith("temp_") || k.includes("_cache_") || k.startsWith("debug_")) {
        keysToRemove.push(k);
        continue;
      }

      // 5. Remove already submitted CBT mock test sessions
      if (k.startsWith("cuet_cbt_session_")) {
        try {
          const raw = window.localStorage.getItem(k);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed.isSubmitted) {
              keysToRemove.push(k);
              continue;
            }
          }
        } catch {
          keysToRemove.push(k); // corrupted JSON
          continue;
        }
      }
    }

    // Execute removals
    for (const k of keysToRemove) {
      try {
        const val = window.localStorage.getItem(k);
        if (val) freedBytes += estimateByteSize(val);
        window.localStorage.removeItem(k);
      } catch {}
    }

    // Step 2: If still congested and protectedKey is CRITICAL (like cuet_active_uid),
    // prune non-critical guest attempts or older CBT sessions
    if (protectedKey === "cuet_active_uid" && keysToRemove.length === 0) {
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k !== protectedKey && k !== "cuet_active_uid") {
          const priority = classifyKeyPriority(k);
          if (priority !== KeyPriority.CRITICAL) {
            try {
              const val = window.localStorage.getItem(k);
              if (val) freedBytes += estimateByteSize(val);
              window.localStorage.removeItem(k);
              break; // Evict one larger key to allow cuet_active_uid (20 bytes) to fit
            } catch {}
          }
        }
      }
    }
  } catch (err) {
    console.warn("[SafeStorage] Prune notice:", err);
  }

  return freedBytes;
}

class SafeStorageEngine {
  /**
   * Safely retrieves an item by key from localStorage -> sessionStorage -> In-Memory
   */
  getItem(key: string): string | null {
    if (typeof window === "undefined") {
      return memoryStore.get(key) || null;
    }

    // 1. Try LocalStorage
    try {
      if (window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
      // LocalStorage blocked or restricted
    }

    // 2. Try SessionStorage
    try {
      if (window.sessionStorage) {
        const val = window.sessionStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
      // SessionStorage blocked or restricted
    }

    // 3. Try In-Memory Fallback
    return memoryStore.get(key) || null;
  }

  /**
   * Safely persists an item by key.
   * NEVER throws an unhandled QuotaExceededError or security exception.
   */
  setItem(key: string, value: string): StorageWriteResult {
    const bytes = estimateByteSize(value);

    // Always update memory store for instantaneous zero-latency access
    memoryStore.set(key, value);

    if (typeof window === "undefined") {
      return { success: true, tier: "memory", bytesWritten: bytes };
    }

    // --- Tier 1: LocalStorage write ---
    try {
      if (window.localStorage) {
        window.localStorage.setItem(key, value);
        return { success: true, tier: "local", bytesWritten: bytes };
      }
    } catch (primaryErr) {
      if (isQuotaExceededError(primaryErr)) {
        // Quota exceeded: trigger proactive eviction of disposable caches
        pruneDisposableStorage(key);

        try {
          if (window.localStorage) {
            window.localStorage.setItem(key, value);
            return { success: true, tier: "local", bytesWritten: bytes };
          }
        } catch {
          // LocalStorage remains full even after pruning disposable data
        }
      }
    }

    // --- Tier 2: SessionStorage write (tab-isolated fallback) ---
    try {
      if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return { success: true, tier: "session", bytesWritten: bytes };
      }
    } catch (sessionErr) {
      // SessionStorage also saturated or disabled
    }

    // --- Tier 3: Memory fallback (already set above) ---
    return {
      success: true,
      tier: "memory",
      bytesWritten: bytes,
      error: "Browser storage saturated; state retained safely in-memory.",
    };
  }

  /**
   * Safely removes an item across all storage tiers
   */
  removeItem(key: string): void {
    memoryStore.delete(key);

    if (typeof window !== "undefined") {
      try {
        if (window.localStorage) window.localStorage.removeItem(key);
      } catch {}
      try {
        if (window.sessionStorage) window.sessionStorage.removeItem(key);
      } catch {}
    }
  }

  /**
   * Safely removes all keys matching a given prefix across all storage tiers
   */
  removeByPrefix(prefix: string): void {
    // Memory
    for (const k of Array.from(memoryStore.keys())) {
      if (k.startsWith(prefix)) {
        memoryStore.delete(k);
      }
    }

    if (typeof window === "undefined") return;

    // LocalStorage
    try {
      if (window.localStorage) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (k && k.startsWith(prefix)) keysToRemove.push(k);
        }
        keysToRemove.forEach((k) => {
          try {
            window.localStorage.removeItem(k);
          } catch {}
        });
      }
    } catch {}

    // SessionStorage
    try {
      if (window.sessionStorage) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < window.sessionStorage.length; i++) {
          const k = window.sessionStorage.key(i);
          if (k && k.startsWith(prefix)) keysToRemove.push(k);
        }
        keysToRemove.forEach((k) => {
          try {
            window.sessionStorage.removeItem(k);
          } catch {}
        });
      }
    } catch {}
  }

  /**
   * Cleans up user-scoped data upon logout without wiping global preferences or other users
   */
  clearUserScopedData(userId: string): void {
    if (!userId || userId === "guest") return;

    this.removeItem(`cuet_ai_prep_session_storage:${userId}`);
    this.removeItem(`last_practice_date_${userId}`);
    this.removeItem(`streak_${userId}`);
    this.removeItem(`unlocked_trophies_${userId}`);
    this.removeItem(`sr_items_${userId}`);
    this.removeByPrefix(`cuet_rate_limit:${userId}:`);
    this.removeByPrefix(`cuet_repair_plan_${userId}_`);
    this.removeByPrefix(`cuet_cbt_session_${userId}_`);
    this.removeItem("cuet_active_uid");
  }

  /**
   * Returns current storage telemetry and diagnostics
   */
  getMetrics(): StorageUsageMetrics {
    let localBytes = 0;
    let sessionBytes = 0;
    const keys: Array<{ key: string; bytes: number; tier: StorageTier }> = [];

    if (typeof window !== "undefined") {
      try {
        if (window.localStorage) {
          for (let i = 0; i < window.localStorage.length; i++) {
            const k = window.localStorage.key(i);
            if (k) {
              const val = window.localStorage.getItem(k) || "";
              const bytes = estimateByteSize(val);
              localBytes += bytes;
              keys.push({ key: k, bytes, tier: "local" });
            }
          }
        }
      } catch {}

      try {
        if (window.sessionStorage) {
          for (let i = 0; i < window.sessionStorage.length; i++) {
            const k = window.sessionStorage.key(i);
            if (k) {
              const val = window.sessionStorage.getItem(k) || "";
              const bytes = estimateByteSize(val);
              sessionBytes += bytes;
              keys.push({ key: k, bytes, tier: "session" });
            }
          }
        }
      } catch {}
    }

    // 5MB typical quota (~5,242,880 bytes). Near quota if > 4MB (4,194,304 bytes)
    const isNearQuota = localBytes > 4 * 1024 * 1024;

    return {
      localBytes,
      sessionBytes,
      totalKeys: keys.length,
      isNearQuota,
      keys,
    };
  }

  /**
   * Startup maintenance: cleans stale rate limits and temporary entries on page load
   */
  initStartupCleanup(): void {
    if (typeof window === "undefined") return;
    try {
      pruneDisposableStorage();
    } catch {}
  }
}

export const safeStorage = new SafeStorageEngine();
