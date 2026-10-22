/**
 * CBT Exam Session Persistence Engine
 * 
 * Provides compact, transaction-safe, multi-tiered persistence for CUET CBT exams.
 * Storage Tiers:
 * 1. In-Memory: Instant reactive updates with zero latency.
 * 2. SessionStorage: Tab-isolated synchronous backup (survives in-tab reloads).
 * 3. LocalStorage: Cross-session persistent storage with proactive quota management.
 * 4. IndexedDB: Asynchronous structured storage for large datasets & disaster recovery.
 */

import { CBTScoreSummary } from "@/lib/store/useCBTStore";
import { safeStorage, pruneDisposableStorage } from "@/lib/storage/safe-storage";

export interface CompactQuestionState {
  visited: boolean;
  selectedOption: "A" | "B" | "C" | "D" | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
}

export interface StoredCBTSession {
  version: number;
  userId: string;
  testId: string;
  attemptId?: string;
  testMeta: {
    id: string;
    title: string;
    subject: string;
    code?: string;
    totalQuestions: number;
    durationMinutes: number;
    practiceType?: "drill" | "retest" | string;
    targetChapter?: string;
  } | null;
  currentQuestionIndex: number;
  durationSeconds: number;
  remainingSeconds: number;
  expiresAt: number | null;
  questionStates: Record<string, CompactQuestionState>;
  isSubmitted: boolean;
  submittedScore: CBTScoreSummary | null;
  lastSavedAt: number;
  saveSequence: number;
}

const CBT_SESSION_VERSION = 2;
const CBT_STORAGE_PREFIX = "cuet_cbt_session_";
const IDB_NAME = "cuet_cbt_db";
const IDB_VERSION = 1;
const IDB_STORE_NAME = "exam_sessions";

// ============================================================================
// Storage Key & User Resolver
// ============================================================================

export function getActiveUserId(): string {
  if (typeof window === "undefined") return "guest";
  try {
    return safeStorage.getItem("cuet_active_uid") || "guest";
  } catch {
    return "guest";
  }
}

export function getCBTSessionKey(testId: string, userId?: string): string {
  const uid = userId || getActiveUserId();
  return `${CBT_STORAGE_PREFIX}${uid}_${testId}`;
}

// ============================================================================
// Compact Question States Serializer
// ============================================================================

/**
 * Strips all question bank text, prompt strings, solutions, options, and base64
 * data. Stores ONLY the minimal interaction telemetry required to restore exam state.
 */
export function compactQuestionStates(
  rawStates: Record<string, any>
): Record<string, CompactQuestionState> {
  const compacted: Record<string, CompactQuestionState> = {};
  if (!rawStates || typeof rawStates !== "object") return compacted;

  for (const [qId, state] of Object.entries(rawStates)) {
    if (!state) continue;
    // Only store questions with activity (visited, answered, or marked for review)
    // to strictly conserve storage quota.
    if (state.visited || state.selectedOption !== null || state.isMarkedForReview || (state.timeSpentSeconds || 0) > 0) {
      compacted[qId] = {
        visited: Boolean(state.visited),
        selectedOption: state.selectedOption ?? null,
        isMarkedForReview: Boolean(state.isMarkedForReview),
        timeSpentSeconds: Number(state.timeSpentSeconds || 0),
      };
    }
  }

  return compacted;
}

// ============================================================================
// IndexedDB Engine (Asynchronous Disaster Recovery)
// ============================================================================

function openIndexedDB(): Promise<IDBDatabase | null> {
  if (typeof window === "undefined" || !window.indexedDB) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);

      request.onupgradeneeded = (event) => {
        try {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
            db.createObjectStore(IDB_STORE_NAME, { keyPath: "id" });
          }
        } catch {
          // Ignore upgrade errors
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
      request.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function saveSessionToIndexedDB(session: StoredCBTSession): Promise<boolean> {
  try {
    const db = await openIndexedDB();
    if (!db) return false;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, "readwrite");
        const store = tx.objectStore(IDB_STORE_NAME);
        const record = {
          id: `${session.userId}_${session.testId}`,
          ...session,
          updatedAt: Date.now(),
        };

        const putReq = store.put(record);
        putReq.onsuccess = () => resolve(true);
        putReq.onerror = () => resolve(false);

        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          try { db.close(); } catch {}
          resolve(false);
        };
        tx.onabort = () => {
          try { db.close(); } catch {}
          resolve(false);
        };
      } catch {
        try { db.close(); } catch {}
        resolve(false);
      }
    });
  } catch {
    return false;
  }
}

export async function loadSessionFromIndexedDB(
  testId: string,
  userId: string
): Promise<StoredCBTSession | null> {
  try {
    const db = await openIndexedDB();
    if (!db) return null;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, "readonly");
        const store = tx.objectStore(IDB_STORE_NAME);
        const id = `${userId}_${testId}`;
        const req = store.get(id);

        req.onsuccess = () => {
          try { db.close(); } catch {}
          const result = req.result;
          if (result && result.testId === testId) {
            resolve(result as StoredCBTSession);
          } else {
            resolve(null);
          }
        };

        req.onerror = () => {
          try { db.close(); } catch {}
          resolve(null);
        };
      } catch {
        try { db.close(); } catch {}
        resolve(null);
      }
    });
  } catch {
    return null;
  }
}

export async function clearSessionFromIndexedDB(
  testId: string,
  userId: string
): Promise<boolean> {
  try {
    const db = await openIndexedDB();
    if (!db) return false;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE_NAME, "readwrite");
        const store = tx.objectStore(IDB_STORE_NAME);
        const id = `${userId}_${testId}`;
        const req = store.delete(id);

        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          try { db.close(); } catch {}
          resolve(false);
        };
      } catch {
        try { db.close(); } catch {}
        resolve(false);
      }
    });
  } catch {
    return false;
  }
}

// ============================================================================
// Proactive Storage Quota Management & Pruning
// ============================================================================

/**
 * Safely removes submitted/completed test sessions, stale guest sessions, and
 * transient cache entries from localStorage to relieve quota pressure.
 * NEVER deletes the currently active in-progress test session.
 */
export function pruneOldCBTSessionsSafely(
  currentUserId: string,
  activeTestId?: string
): void {
  if (typeof window === "undefined") return;

  try {
    const activeKey = activeTestId ? getCBTSessionKey(activeTestId, currentUserId) : null;
    pruneDisposableStorage(activeKey || undefined);

    const sessionKeys: string[] = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(CBT_STORAGE_PREFIX)) {
        if (activeKey && k === activeKey) {
          // Strictly protect active exam session
          continue;
        }
        sessionKeys.push(k);
      }
    }

    // Step 1: Remove already submitted sessions first
    sessionKeys.forEach((key) => {
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.isSubmitted) {
            window.localStorage.removeItem(key);
          }
        }
      } catch {
        // Corrupted session, safe to remove
        window.localStorage.removeItem(key);
      }
    });

    // Step 2: Remove temporary and cache keys
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const k = window.localStorage.key(i);
      if (k && (k.startsWith("temp_") || k.includes("_cache_") || k.startsWith("debug_"))) {
        window.localStorage.removeItem(k);
      }
    }

    // Step 3: If still under severe quota pressure (many old sessions), prune oldest half
    const remainingKeys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(CBT_STORAGE_PREFIX) && k !== activeKey) {
        remainingKeys.push(k);
      }
    }

    if (remainingKeys.length > 2) {
      remainingKeys.slice(0, Math.ceil(remainingKeys.length / 2)).forEach((k) => {
        try {
          window.localStorage.removeItem(k);
        } catch {}
      });
    }
  } catch (err) {
    console.warn("[CBTSessionStorage] Pruning notice:", err);
  }
}

// ============================================================================
// Synchronous Multi-Tier Session Persistence
// ============================================================================

export interface SaveSessionOptions {
  activeTestId?: string;
  skipIndexedDB?: boolean;
}

/**
 * Persists the compact CBT session to sessionStorage and localStorage synchronously,
 * then enqueues an asynchronous write to IndexedDB.
 * Returns true if saved to at least one reliable persistent layer.
 */
export function saveCBTSessionSync(
  session: StoredCBTSession,
  options?: SaveSessionOptions
): boolean {
  if (typeof window === "undefined" || !session.testId) return false;

  const serialized = JSON.stringify(session);
  const key = getCBTSessionKey(session.testId, session.userId);
  let savedToPersistentLayer = false;

  // 1. SessionStorage Write (tab-isolated, 5MB dedicated, synchronous)
  try {
    window.sessionStorage.setItem(key, serialized);
    savedToPersistentLayer = true;
  } catch {
    // SessionStorage unavailable or full
  }

  // 2. LocalStorage Write via safeStorage
  try {
    const writeResult = safeStorage.setItem(key, serialized);
    if (writeResult.tier === "local") {
      savedToPersistentLayer = true;
    }
  } catch {
    // safeStorage handles errors internally
  }

  // 3. IndexedDB Asynchronous Write
  if (!options?.skipIndexedDB) {
    saveSessionToIndexedDB(session).catch(() => {});
  }

  return savedToPersistentLayer;
}

// ============================================================================
// Session Loader & Sanitizer
// ============================================================================

/**
 * Loads and validates a persisted CBT exam session.
 * Reads SessionStorage -> LocalStorage -> (Async IndexedDB fallback available).
 */
export function loadCBTSessionSync(
  testId: string,
  userId?: string
): StoredCBTSession | null {
  if (typeof window === "undefined" || !testId) return null;

  const targetUid = userId || getActiveUserId();
  const key = getCBTSessionKey(testId, targetUid);

  try {
    const raw =
      window.sessionStorage.getItem(key) ||
      safeStorage.getItem(key) ||
      // Backward compatibility with legacy un-scoped key
      safeStorage.getItem(`cuet_cbt_session_${testId}`);

    if (!raw) return null;

    const parsed = JSON.parse(raw) as any;
    if (!parsed || parsed.testId !== testId) return null;

    // Validate user isolation: authenticated user cannot adopt another user's session
    if (parsed.userId && targetUid !== "guest" && parsed.userId !== targetUid) {
      return null;
    }

    // Check schema and sanitize questionStates
    const sanitizedStates: Record<string, CompactQuestionState> = {};
    const rawStates = parsed.questionStates || parsed.answers || {};

    for (const [qId, s] of Object.entries(rawStates as Record<string, any>)) {
      if (!s) continue;
      sanitizedStates[qId] = {
        visited: Boolean(s.visited),
        selectedOption: s.selectedOption ?? null,
        isMarkedForReview: Boolean(s.isMarkedForReview),
        timeSpentSeconds: Number(s.timeSpentSeconds || 0),
      };
    }

    // Check for legacy session bloated with full question bank array
    if (parsed.questions && Array.isArray(parsed.questions)) {
      // Migrate legacy session: delete bloated questions array and re-save compact version
      delete parsed.questions;
      try {
        const compactJson = JSON.stringify({
          ...parsed,
          questionStates: sanitizedStates,
        });
        safeStorage.setItem(key, compactJson);
      } catch {}
    }

    const session: StoredCBTSession = {
      version: parsed.version || CBT_SESSION_VERSION,
      userId: parsed.userId || targetUid,
      testId: parsed.testId,
      testMeta: parsed.testMeta || null,
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === "number" && parsed.currentQuestionIndex >= 0
          ? parsed.currentQuestionIndex
          : 0,
      durationSeconds: parsed.durationSeconds || 3600,
      remainingSeconds:
        typeof parsed.remainingSeconds === "number" ? parsed.remainingSeconds : 3600,
      expiresAt: parsed.expiresAt ?? null,
      questionStates: sanitizedStates,
      isSubmitted: Boolean(parsed.isSubmitted),
      submittedScore: parsed.submittedScore || null,
      lastSavedAt: parsed.lastSavedAt || Date.now(),
      saveSequence: parsed.saveSequence || 1,
    };

    return session;
  } catch (err) {
    console.warn(`[CBTSessionStorage] Failed to parse session for ${testId}:`, err);
    return null;
  }
}

/**
 * Completely removes an exam session from all client storage tiers.
 */
export function clearCBTSessionSync(testId: string, userId?: string): void {
  if (typeof window === "undefined" || !testId) return;

  // Cancel any pending debounced autosave for this test immediately
  cbtAutosave.cancel(testId);

  const targetUid = userId || getActiveUserId();
  const key = getCBTSessionKey(testId, targetUid);

  try {
    safeStorage.removeItem(key);
    safeStorage.removeItem(`cuet_cbt_session_${testId}`);
    safeStorage.removeItem(`cuet_cbt_active_session_${targetUid}`);
  } catch {}

  clearSessionFromIndexedDB(testId, targetUid).catch(() => {});
}

// ============================================================================
// Debounced Autosave Engine & Race-Prevention Manager
// ============================================================================

class CBTAutosaveManager {
  private pendingTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingSession: StoredCBTSession | null = null;
  private sequenceCounter: number = 0;
  private lastSavedSequence: number = 0;
  private saveStatus: "idle" | "saving" | "saved" | "error" = "idle";

  /**
   * Schedules a debounced save operation.
   * Batches rapid clicks/keystrokes to prevent synchronous I/O thrashing.
   */
  public schedule(session: StoredCBTSession, delayMs = 250): void {
    this.sequenceCounter += 1;
    session.saveSequence = this.sequenceCounter;
    session.lastSavedAt = Date.now();
    this.pendingSession = session;
    this.saveStatus = "saving";

    if (this.pendingTimer) {
      clearTimeout(this.pendingTimer);
    }

    this.pendingTimer = setTimeout(() => {
      this.flush();
    }, delayMs);
  }

  /**
   * Synchronously flushes any pending save immediately.
   * Essential before window unloads, question submission, or navigation.
   */
  public flush(): boolean {
    if (this.pendingTimer) {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = null;
    }

    if (!this.pendingSession) return true;

    const sessionToSave = this.pendingSession;
    this.pendingSession = null;

    // Concurrency guard: avoid saving an older sequence over a newer one
    if (sessionToSave.saveSequence < this.lastSavedSequence) {
      return true;
    }

    const success = saveCBTSessionSync(sessionToSave);
    if (success) {
      this.lastSavedSequence = sessionToSave.saveSequence;
      this.saveStatus = "saved";
    } else {
      this.saveStatus = "error";
    }

    return success;
  }

  /**
   * Cancels any pending debounced autosave.
   * If a testId is specified, cancels only if the pending session matches that testId.
   */
  public cancel(testId?: string): void {
    if (this.pendingTimer) {
      if (!testId || this.pendingSession?.testId === testId) {
        clearTimeout(this.pendingTimer);
        this.pendingTimer = null;
        this.pendingSession = null;
        this.saveStatus = "idle";
      }
    } else if (!testId || this.pendingSession?.testId === testId) {
      this.pendingSession = null;
      this.saveStatus = "idle";
    }
  }

  public getStatus(): "idle" | "saving" | "saved" | "error" {
    return this.saveStatus;
  }
}

export const cbtAutosave = new CBTAutosaveManager();
