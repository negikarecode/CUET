import { createAdminClient } from "@/lib/supabase/admin";
import { AI_COACH_CONFIG } from "./config";

// In-memory generation locks to prevent double-click duplicates (userId:subject -> timestamp)
const activeGenerationLocks = new Map<string, number>();
const LOCK_TIMEOUT_MS = 60 * 1000; // 60 seconds

/**
 * Returns current date string in Asia/Kolkata (IST) timezone: "YYYY-MM-DD"
 */
export function getCurrentISTDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: AI_COACH_CONFIG.RESET_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Computes next midnight in Asia/Kolkata (IST) as ISO timestamp string
 */
export function getNextMidnightIST(): string {
  const now = new Date();
  const istString = now.toLocaleString("en-US", {
    timeZone: AI_COACH_CONFIG.RESET_TIMEZONE,
  });
  const istDate = new Date(istString);
  const nextMidnight = new Date(istDate);
  nextMidnight.setDate(nextMidnight.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);

  const diffMs = nextMidnight.getTime() - istDate.getTime();
  return new Date(now.getTime() + diffMs).toISOString();
}

/**
 * Check if a double-click generation lock is currently active
 */
export function isGenerationLocked(userId: string, subject: string): boolean {
  const lockKey = `${userId}:${subject.toLowerCase()}`;
  const lockTime = activeGenerationLocks.get(lockKey);
  if (!lockTime) return false;
  if (Date.now() - lockTime > LOCK_TIMEOUT_MS) {
    activeGenerationLocks.delete(lockKey);
    return false;
  }
  return true;
}

/**
 * Acquire generation lock
 */
export function acquireGenerationLock(userId: string, subject: string): boolean {
  if (isGenerationLocked(userId, subject)) {
    return false;
  }
  const lockKey = `${userId}:${subject.toLowerCase()}`;
  activeGenerationLocks.set(lockKey, Date.now());
  return true;
}

/**
 * Release generation lock
 */
export function releaseGenerationLock(userId: string, subject: string): void {
  const lockKey = `${userId}:${subject.toLowerCase()}`;
  activeGenerationLocks.delete(lockKey);
}

/**
 * Atomically reserve 1 report quota slot for today (limit: 3 per day resetting midnight IST)
 * Returns { success: true, count: number } if slot reserved,
 * or { success: false, count: 3 } if daily limit reached.
 */
export async function reserveDailyReportSlot(
  userId: string
): Promise<{ success: boolean; count: number }> {
  const usageDate = getCurrentISTDate();
  const supabaseAdmin = createAdminClient();

  try {
    // 1. Try PostgreSQL atomic function if provisioned
    const { data: rpcCount, error: rpcError } = await supabaseAdmin.rpc(
      "reserve_ai_usage_slot",
      { p_user_id: userId, p_usage_date: usageDate }
    );

    if (!rpcError && typeof rpcCount === "number") {
      if (rpcCount > 0 && rpcCount <= AI_COACH_CONFIG.DAILY_REPORT_LIMIT) {
        return { success: true, count: rpcCount };
      }
      return { success: false, count: AI_COACH_CONFIG.DAILY_REPORT_LIMIT };
    }
  } catch {
    // Fall back to direct atomic SQL pattern below
  }

  // 2. Direct atomic check & update pattern via Supabase
  try {
    const { data: existing } = await supabaseAdmin
      .from("ai_usage")
      .select("count")
      .eq("user_id", userId)
      .eq("usage_date", usageDate)
      .maybeSingle();

    const currentCount = existing?.count || 0;
    if (currentCount >= AI_COACH_CONFIG.DAILY_REPORT_LIMIT) {
      return { success: false, count: currentCount };
    }

    const nextCount = currentCount + 1;
    const { error: upsertErr } = await supabaseAdmin.from("ai_usage").upsert(
      {
        user_id: userId,
        usage_date: usageDate,
        count: nextCount,
      },
      { onConflict: "user_id,usage_date" }
    );

    if (upsertErr) {
      return { success: false, count: currentCount };
    }

    return { success: true, count: nextCount };
  } catch (err) {
    console.error("Failed to reserve daily report slot:", err);
    return { success: false, count: AI_COACH_CONFIG.DAILY_REPORT_LIMIT };
  }
}

/**
 * Atomically refund 1 report quota slot if AI generation or validation fails
 */
export async function refundDailyReportSlot(userId: string): Promise<void> {
  const usageDate = getCurrentISTDate();
  const supabaseAdmin = createAdminClient();

  try {
    // 1. Try RPC refund if provisioned
    const { error: rpcError } = await supabaseAdmin.rpc("refund_ai_usage_slot", {
      p_user_id: userId,
      p_usage_date: usageDate,
    });

    if (!rpcError) return;
  } catch {
    // Fall back to direct decrement
  }

  try {
    const { data: existing } = await supabaseAdmin
      .from("ai_usage")
      .select("count")
      .eq("user_id", userId)
      .eq("usage_date", usageDate)
      .maybeSingle();

    if (existing && existing.count > 0) {
      await supabaseAdmin
        .from("ai_usage")
        .update({ count: Math.max(0, existing.count - 1) })
        .eq("user_id", userId)
        .eq("usage_date", usageDate);
    }
  } catch (err) {
    console.error("Failed to refund daily report slot:", err);
  }
}

/**
 * Query current daily usage count for user
 */
export async function getDailyUsageCount(userId: string): Promise<number> {
  const usageDate = getCurrentISTDate();
  const supabaseAdmin = createAdminClient();

  try {
    const { data } = await supabaseAdmin
      .from("ai_usage")
      .select("count")
      .eq("user_id", userId)
      .eq("usage_date", usageDate)
      .maybeSingle();

    return data?.count || 0;
  } catch {
    return 0;
  }
}
