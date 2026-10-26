import { TopicPracticeDelta } from "@/types/ai-coach";
import { safeStorage } from "@/lib/storage/safe-storage";

const DELTAS_STORAGE_KEY_PREFIX = "cuet_topic_deltas_";

function getDeltasStorageKey(userId?: string): string {
  return `${DELTAS_STORAGE_KEY_PREFIX}${userId || "guest"}`;
}

const memoryDeltasStore = new Map<string, TopicPracticeDelta[]>();

/**
 * Load saved topic practice deltas for a student
 */
export function loadTopicPracticeDeltas(userId?: string): TopicPracticeDelta[] {
  const key = getDeltasStorageKey(userId);
  const inMemory = memoryDeltasStore.get(key);
  if (inMemory) return inMemory;

  if (typeof window === "undefined") return [];
  try {
    const raw = safeStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    memoryDeltasStore.set(key, parsed);
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Save an immediate topic practice before/after delta (5+ attempts)
 */
export function recordTopicPracticeDelta(
  userId: string,
  delta: TopicPracticeDelta
): TopicPracticeDelta[] {
  const key = getDeltasStorageKey(userId);
  const current = loadTopicPracticeDeltas(userId);
  const updated = [delta, ...current.filter((d) => d.topic.toLowerCase() !== delta.topic.toLowerCase())].slice(0, 50);

  memoryDeltasStore.set(key, updated);

  if (typeof window !== "undefined") {
    try {
      safeStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to persist topic delta to storage:", e);
    }
  }

  return updated;
}
