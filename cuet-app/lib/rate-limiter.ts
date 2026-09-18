import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase as defaultSupabase } from './supabase';
import { AppDataStore } from './data-store';

export interface UsageCheck {
  allowed: boolean;
  usedToday: number;
  dailyLimit: number;
  remaining: number;
  reason?: string;
}

export async function checkAndIncrementUsage(
  studentId: string,
  planType: 'free' | 'basic' | 'pro' | 'ultimate' = 'free',
  client?: ReturnType<typeof createClient>
): Promise<UsageCheck> {
  const freeLimit = parseInt(process.env.AI_QUESTION_DAILY_LIMIT_FREE || '10', 10);
  const proLimit = parseInt(process.env.AI_QUESTION_DAILY_LIMIT_PRO || '100', 10);

  // Daily limits by plan
  const DAILY_LIMITS: Record<string, number> = {
    free: isNaN(freeLimit) ? 10 : freeLimit,
    basic: 30,
    pro: isNaN(proLimit) ? 100 : proLimit,
    ultimate: 500,
  };

  const dailyLimit = DAILY_LIMITS[planType] || DAILY_LIMITS.free;
  const today = new Date().toISOString().split('T')[0];

  const sb = client || (isSupabaseConfigured() ? defaultSupabase : null);
  let usedToday = 0;

  if (sb) {
    try {
      const { data, error } = await sb
        .from('ai_usage_tracking')
        .select('id')
        .eq('student_id', studentId)
        .eq('usage_date', today)
        .eq('was_cached', false);

      if (!error && data) {
        usedToday = data.length;
      }
    } catch (err) {
      console.warn('Supabase usage check fallback to store:', err);
      usedToday = (AppDataStore.usageTracking || []).filter(
        (u) =>
          u.student_id === studentId &&
          u.usage_date === today &&
          !u.was_cached
      ).length;
    }
  } else {
    usedToday = (AppDataStore.usageTracking || []).filter(
      (u) =>
        u.student_id === studentId &&
        u.usage_date === today &&
        !u.was_cached
    ).length;
  }

  const remaining = Math.max(0, dailyLimit - usedToday);

  if (usedToday >= dailyLimit) {
    return {
      allowed: false,
      usedToday,
      dailyLimit,
      remaining: 0,
      reason: `Daily limit of ${dailyLimit} AI questions reached. Upgrade your plan for more!`,
    };
  }

  return {
    allowed: true,
    usedToday,
    dailyLimit,
    remaining,
  };
}

export async function logAIUsage(
  studentId: string,
  topicId: number,
  model: string,
  tokens: number,
  cost: number,
  wasCached: boolean,
  cacheKey: string,
  client?: ReturnType<typeof createClient>
): Promise<void> {
  const record = {
    id: (AppDataStore.usageTracking?.length || 0) + 1,
    student_id: studentId,
    usage_date: new Date().toISOString().split('T')[0],
    call_type: 'question_generation',
    topic_id: topicId,
    model_used: model,
    input_tokens: Math.round(tokens * 0.7),
    output_tokens: Math.round(tokens * 0.3),
    total_tokens: tokens,
    estimated_cost_usd: cost,
    was_cached: wasCached,
    cache_key: cacheKey,
    created_at: new Date().toISOString(),
  };

  if (!AppDataStore.usageTracking) {
    AppDataStore.usageTracking = [];
  }
  AppDataStore.usageTracking.push(record);

  const sb = client || (isSupabaseConfigured() ? defaultSupabase : null);
  if (sb) {
    try {
      await sb.from('ai_usage_tracking').insert({
        student_id: studentId,
        usage_date: record.usage_date,
        call_type: record.call_type,
        topic_id: topicId,
        model_used: model,
        input_tokens: record.input_tokens,
        output_tokens: record.output_tokens,
        total_tokens: tokens,
        estimated_cost_usd: cost,
        was_cached: wasCached,
        cache_key: cacheKey,
      });
    } catch (err) {
      console.warn('Supabase log AI usage fallback:', err);
    }
  }
}
