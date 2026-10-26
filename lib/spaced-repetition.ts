/**
 * Spaced Repetition Mistake Notebook Engine
 * Intervals: Resurfaces for re-attempt after 2 days, then 7 days.
 * Mastery: Shows "Mastered" after 2 consecutive correct answers.
 * Tagging: Tracks one-tap mistake tags ("Didn't know concept" / "Misread" / "Guessed" / "Changed my answer").
 * Strictly non-time based.
 */

import { QuestionOption } from "@/types";
import { MistakeTag, MistakeTagCounts } from "@/types/ai-coach";
import { safeStorage } from "@/lib/storage/safe-storage";

export type { MistakeTag, MistakeTagCounts };

export interface SpacedRepetitionItem {
  id: string;
  questionId: string;
  subject: string;
  chapter: string;
  microTopic?: string;
  prompt: string;
  options?: QuestionOption[];
  correctOption: string;
  explanation: string;
  userLastSelectedOption: string;
  mistakeTag?: MistakeTag;
  source?: string;
  reviewed_by_human?: boolean;

  // Spaced repetition state
  currentIntervalIndex: number; // 0 (2d), 1 (7d)
  intervalDays: number; // 2, 7
  lastReviewedDate: string; // ISO date
  nextDueDate: string; // ISO date
  consecutiveSuccesses: number;
  totalAttempts: number;
  isMastered: boolean;
  history: Array<{
    date: string;
    selectedOption: string;
    isCorrect: boolean;
    intervalApplied: number;
  }>;
}

export const SPACED_INTERVALS_DAYS: readonly [number, number] = [2, 7] as const;

const STORAGE_KEY_PREFIX = "cuet_spaced_repetition_";
const MISTAKE_TAGS_STORAGE_KEY_PREFIX = "cuet_mistake_tags_";

function getStorageKey(userId: string): string {
  return `${STORAGE_KEY_PREFIX}${userId || "guest"}`;
}

function getTagsStorageKey(userId: string): string {
  return `${MISTAKE_TAGS_STORAGE_KEY_PREFIX}${userId || "guest"}`;
}

/**
 * Calculate the next due date by adding days to a baseline ISO string
 */
export function calculateNextDueDate(days: number, fromDate?: string): string {
  const base = fromDate ? new Date(fromDate) : new Date();
  const next = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
  return next.toISOString();
}

/**
 * Check if an item is due on or before target date (default today)
 */
export function isItemDue(nextDueDate: string, targetDate?: string): boolean {
  const target = targetDate ? new Date(targetDate) : new Date();
  const due = new Date(nextDueDate);
  return due.getTime() <= target.getTime();
}

const memorySpacedRepetitionStore = new Map<string, SpacedRepetitionItem[]>();
const memoryTagsStore = new Map<string, Record<string, MistakeTag>>();

/**
 * Load spaced repetition items for a user
 */
export function loadSpacedRepetitionItems(userId: string): SpacedRepetitionItem[] {
  const key = getStorageKey(userId);
  const inMemory = memorySpacedRepetitionStore.get(key);
  if (inMemory) return inMemory;

  if (typeof window === "undefined") return [];
  try {
    const raw = safeStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    memorySpacedRepetitionStore.set(key, parsed);
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Save spaced repetition items for a user
 */
export function saveSpacedRepetitionItems(userId: string, items: SpacedRepetitionItem[]): void {
  const key = getStorageKey(userId);
  // Bound to at most 500 items to prevent storage bloat while keeping comprehensive notebook
  const boundedItems = items.slice(0, 500);
  memorySpacedRepetitionStore.set(key, boundedItems);

  if (typeof window === "undefined") return;
  try {
    safeStorage.setItem(key, JSON.stringify(boundedItems));
  } catch (err) {
    console.warn("Failed to persist spaced repetition items", err);
  }
}

/**
 * Automatically enroll every wrong question into the Mistake Notebook.
 * Resurfaces for re-attempt after 2 days, then 7 days.
 */
export function enrollMissedQuestion(
  userId: string,
  question: {
    questionId: string;
    subject: string;
    chapter: string;
    microTopic?: string;
    prompt: string;
    options?: QuestionOption[];
    correctOption: string;
    userSelectedOption: string;
    explanation: string;
    mistakeTag?: MistakeTag;
    source?: string;
    reviewed_by_human?: boolean;
  },
  nowIso: string = new Date().toISOString()
): SpacedRepetitionItem {
  const items = loadSpacedRepetitionItems(userId);
  const existingIdx = items.findIndex((i) => i.questionId === question.questionId);

  if (existingIdx >= 0) {
    const existing = items[existingIdx];
    if (existing) {
      existing.userLastSelectedOption = question.userSelectedOption;
      if (question.mistakeTag) {
        existing.mistakeTag = question.mistakeTag;
      }
      existing.history.push({
        date: nowIso,
        selectedOption: question.userSelectedOption,
        isCorrect: false,
        intervalApplied: SPACED_INTERVALS_DAYS[0],
      });
      // Reset to interval 0 (2 days) on repeated wrong attempt
      existing.currentIntervalIndex = 0;
      existing.intervalDays = SPACED_INTERVALS_DAYS[0];
      existing.consecutiveSuccesses = 0;
      existing.isMastered = false;
      existing.lastReviewedDate = nowIso;
      existing.nextDueDate = calculateNextDueDate(SPACED_INTERVALS_DAYS[0], nowIso);
      items[existingIdx] = existing;
      saveSpacedRepetitionItems(userId, items);
      return existing;
    }
  }

  const initialInterval = SPACED_INTERVALS_DAYS[0]; // 2 days
  const newItem: SpacedRepetitionItem = {
    id: `sr_${question.questionId}`,
    questionId: question.questionId,
    subject: question.subject,
    chapter: question.chapter,
    microTopic: question.microTopic,
    prompt: question.prompt,
    options: question.options,
    correctOption: question.correctOption,
    explanation: question.explanation,
    userLastSelectedOption: question.userSelectedOption,
    mistakeTag: question.mistakeTag,
    source: question.source,
    reviewed_by_human: question.reviewed_by_human,
    currentIntervalIndex: 0,
    intervalDays: initialInterval,
    lastReviewedDate: nowIso,
    nextDueDate: calculateNextDueDate(initialInterval, nowIso),
    consecutiveSuccesses: 0,
    totalAttempts: 1,
    isMastered: false,
    history: [
      {
        date: nowIso,
        selectedOption: question.userSelectedOption,
        isCorrect: false,
        intervalApplied: initialInterval,
      },
    ],
  };

  items.unshift(newItem);
  saveSpacedRepetitionItems(userId, items);
  return newItem;
}

/**
 * Record a review attempt on a mistake notebook question.
 * If correct:
 * - consecutiveSuccesses++
 * - if consecutiveSuccesses >= 2: marked "Mastered"
 * - else: next interval is 7 days.
 * If wrong: resets to interval 0 (2 days), consecutiveSuccesses = 0.
 */
export function recordSpacedReviewAttempt(
  userId: string,
  questionId: string,
  selectedOption: string,
  isCorrect: boolean,
  nowIso: string = new Date().toISOString()
): SpacedRepetitionItem | null {
  const items = loadSpacedRepetitionItems(userId);
  const idx = items.findIndex((i) => i.questionId === questionId);
  if (idx < 0) return null;

  const item = items[idx];
  if (!item) return null;

  item.totalAttempts++;
  item.userLastSelectedOption = selectedOption;
  item.lastReviewedDate = nowIso;

  if (isCorrect) {
    item.consecutiveSuccesses++;
    if (item.consecutiveSuccesses >= 2) {
      // 2 consecutive correct answers -> Mastered
      item.isMastered = true;
      item.currentIntervalIndex = 1;
      item.intervalDays = 30; // Archived interval
      item.nextDueDate = calculateNextDueDate(30, nowIso);
    } else {
      // Advance to second interval (7 days)
      const nextInterval = SPACED_INTERVALS_DAYS[1] ?? 7;
      item.currentIntervalIndex = 1;
      item.intervalDays = nextInterval;
      item.nextDueDate = calculateNextDueDate(nextInterval, nowIso);
    }
  } else {
    // Reset to interval 0 (2 days)
    const baseInterval = SPACED_INTERVALS_DAYS[0] ?? 2;
    item.consecutiveSuccesses = 0;
    item.currentIntervalIndex = 0;
    item.intervalDays = baseInterval;
    item.nextDueDate = calculateNextDueDate(baseInterval, nowIso);
    item.isMastered = false;
  }

  item.history.push({
    date: nowIso,
    selectedOption,
    isCorrect,
    intervalApplied: item.intervalDays,
  });

  items[idx] = item;
  saveSpacedRepetitionItems(userId, items);
  return item;
}

/**
 * Store a one-tap mistake tag for a question
 */
export function setMistakeTag(
  userId: string,
  questionId: string,
  tag: MistakeTag
): void {
  // Update in notebook items if present
  const items = loadSpacedRepetitionItems(userId);
  const idx = items.findIndex((i) => i.questionId === questionId);
  if (idx >= 0 && items[idx]) {
    items[idx]!.mistakeTag = tag;
    saveSpacedRepetitionItems(userId, items);
  }

  // Update in dedicated tag store for high-performance lookup
  const key = getTagsStorageKey(userId);
  const map = loadMistakeTagsMap(userId);
  map[questionId] = tag;
  memoryTagsStore.set(key, map);

  if (typeof window !== "undefined") {
    try {
      safeStorage.setItem(key, JSON.stringify(map));
    } catch (err) {
      console.warn("Failed to persist mistake tag", err);
    }
  }
}

/**
 * Load raw mistake tags map (questionId -> MistakeTag)
 */
export function loadMistakeTagsMap(userId: string): Record<string, MistakeTag> {
  const key = getTagsStorageKey(userId);
  const inMemory = memoryTagsStore.get(key);
  if (inMemory) return inMemory;

  if (typeof window === "undefined") return {};
  try {
    const raw = safeStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    memoryTagsStore.set(key, parsed);
    return parsed;
  } catch {
    return {};
  }
}

/**
 * Get aggregated counts of mistake tags for a user
 */
export function getMistakeTagCounts(userId: string): MistakeTagCounts {
  const map = loadMistakeTagsMap(userId);
  const items = loadSpacedRepetitionItems(userId);

  // Combine items tags with tags map
  const combined = new Map<string, MistakeTag>();
  items.forEach((item) => {
    if (item.mistakeTag) {
      combined.set(item.questionId, item.mistakeTag);
    }
  });
  Object.entries(map).forEach(([qId, tag]) => {
    combined.set(qId, tag);
  });

  const counts: MistakeTagCounts = {
    didntKnowConcept: 0,
    misread: 0,
    guessed: 0,
    changedAnswer: 0,
  };

  combined.forEach((tag) => {
    if (tag === "Didn't know concept") counts.didntKnowConcept++;
    else if (tag === "Misread") counts.misread++;
    else if (tag === "Guessed") counts.guessed++;
    else if (tag === "Changed my answer") counts.changedAnswer++;
  });

  return counts;
}

/**
 * Get summary of spaced repetition mistake notebook items
 */
export function getSpacedRepetitionSummary(userId: string, targetDate?: string): {
  totalTracked: number;
  dueTodayCount: number;
  masteredCount: number;
  dueItems: SpacedRepetitionItem[];
  allMistakes: SpacedRepetitionItem[];
} {
  const items = loadSpacedRepetitionItems(userId);
  const dueItems = items.filter((i) => !i.isMastered && isItemDue(i.nextDueDate, targetDate));
  const masteredCount = items.filter((i) => i.isMastered).length;

  return {
    totalTracked: items.length,
    dueTodayCount: dueItems.length,
    masteredCount,
    dueItems,
    allMistakes: items,
  };
}
