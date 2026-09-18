import { supabase } from './supabase';
import { AppDataStore } from './data-store';

export const CHAT_LIMITS: Record<string, number> = {
  free: Number(process.env.CHATBOT_DAILY_LIMIT_FREE) || 20,
  basic: Number(process.env.CHATBOT_DAILY_LIMIT_BASIC) || 50,
  pro: Number(process.env.CHATBOT_DAILY_LIMIT_PRO) || 200,
  ultimate: Number(process.env.CHATBOT_DAILY_LIMIT_ULTIMATE) || 1000,
};

export function getDailyLimitForPlan(plan: string = 'free'): number {
  const normalized = plan.toLowerCase();
  return CHAT_LIMITS[normalized] || CHAT_LIMITS.free;
}

export function getResetTime(): string {
  const now = new Date();
  const reset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return reset.toISOString();
}

export async function checkChatUsage(
  studentId: string,
  planType: 'free' | 'basic' | 'pro' | 'ultimate' = 'free'
): Promise<{
  allowed: boolean;
  remaining: number;
  dailyLimit: number;
  currentCount: number;
  resetTime: string;
}> {
  const dailyLimit = getDailyLimitForPlan(planType);
  const resetTime = getResetTime();
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('chat_usage_tracking')
        .select('message_count, daily_limit')
        .eq('student_id', studentId)
        .eq('usage_date', todayStr)
        .maybeSingle();

      if (!error && data) {
        const count = data.message_count || 0;
        const limit = data.daily_limit || dailyLimit;
        const remaining = Math.max(0, limit - count);
        return {
          allowed: count < limit,
          remaining,
          dailyLimit: limit,
          currentCount: count,
          resetTime,
        };
      }
    }
  } catch (err) {
    console.warn('[ChatRateLimiter] Supabase query failed, falling back to AppDataStore:', err);
  }

  // Fallback to in-memory store
  const usage = AppDataStore.getChatUsage(studentId, planType, dailyLimit);
  return {
    allowed: !usage.is_limit_reached,
    remaining: usage.remaining ?? Math.max(0, usage.daily_limit - usage.message_count),
    dailyLimit: usage.daily_limit,
    currentCount: usage.message_count,
    resetTime,
  };
}

export async function recordChatUsage(
  studentId: string,
  tokens: number = 0,
  planType: 'free' | 'basic' | 'pro' | 'ultimate' = 'free'
): Promise<{
  currentCount: number;
  remaining: number;
  isLimitReached: boolean;
}> {
  const dailyLimit = getDailyLimitForPlan(planType);
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    if (supabase) {
      // Call stored procedure or direct upsert
      const { data, error } = await supabase.rpc('increment_chat_usage', {
        p_student_id: studentId,
        p_tokens: tokens,
        p_plan_type: planType,
        p_daily_limit: dailyLimit,
      });

      if (!error && data && data.length > 0) {
        const row = data[0];
        return {
          currentCount: row.new_count,
          remaining: row.remaining,
          isLimitReached: row.is_limit_reached,
        };
      }
    }
  } catch (err) {
    console.warn('[ChatRateLimiter] increment_chat_usage RPC failed, using AppDataStore fallback:', err);
  }

  // Fallback to in-memory store
  const res = AppDataStore.incrementChatUsage(studentId, tokens, planType, dailyLimit);
  return {
    currentCount: res.count,
    remaining: res.remaining,
    isLimitReached: res.isLimitReached,
  };
}
