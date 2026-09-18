import { createClient } from '@supabase/supabase-js';
import { GeneratedQuestion } from './question-validator';
import crypto from 'crypto';
import NodeCache from 'node-cache';
import { isSupabaseConfigured, supabase as defaultSupabase } from './supabase';
import { AppDataStore } from './data-store';

// In-memory fallback cache (default 6 hour TTL = 21600 seconds)
const localMemoryCache = new NodeCache({ stdTTL: 21600, checkperiod: 600 });

export function buildCacheKey(
  topicId: number,
  difficulty: string,
  _studentId?: string
): string {
  // Cache is per-topic + difficulty
  // NOT per-student (so multiple students share cache)
  const baseKey = `topic_${topicId}_diff_${difficulty}`;
  return crypto.createHash('md5').update(baseKey).digest('hex');
}

export async function checkCache(
  cacheKey: string,
  client?: ReturnType<typeof createClient>
): Promise<GeneratedQuestion | null> {
  const sb = client || (isSupabaseConfigured() ? defaultSupabase : null);

  // 1. Try Supabase if configured
  if (sb) {
    try {
      const { data, error } = await sb
        .from('ai_question_cache')
        .select('cached_questions, hit_count')
        .eq('cache_key', cacheKey)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      if (!error && data?.cached_questions) {
        const questions = Array.isArray(data.cached_questions)
          ? (data.cached_questions as GeneratedQuestion[])
          : [];

        if (questions.length > 0) {
          const randomIndex = Math.floor(Math.random() * questions.length);

          // Fire and forget hit count increment
          Promise.resolve(
            sb.from('ai_question_cache')
              .update({ hit_count: (data.hit_count || 0) + 1 })
              .eq('cache_key', cacheKey)
          ).catch(() => {});

          return questions[randomIndex] || null;

        }
      }
    } catch (err) {
      console.warn('Supabase cache check fallback to memory:', err);
    }
  }

  // 2. Fallback to in-memory NodeCache / AppDataStore
  const inMemory = localMemoryCache.get<GeneratedQuestion[]>(cacheKey);
  if (inMemory && inMemory.length > 0) {
    const randomIndex = Math.floor(Math.random() * inMemory.length);
    return inMemory[randomIndex];
  }

  // Check AppDataStore cache
  const storeCached = AppDataStore.questionCache?.get(cacheKey);
  if (storeCached && storeCached.length > 0) {
    const randomIndex = Math.floor(Math.random() * storeCached.length);
    return storeCached[randomIndex];
  }

  return null;
}

export async function saveToCache(
  cacheKey: string,
  question: GeneratedQuestion,
  ttlSeconds: number = 3600 * 6,
  client?: ReturnType<typeof createClient>
): Promise<void> {
  // Always save to memory cache
  const existing = localMemoryCache.get<GeneratedQuestion[]>(cacheKey) || [];
  localMemoryCache.set(cacheKey, [...existing, question], ttlSeconds);

  // Save to AppDataStore
  if (!AppDataStore.questionCache) {
    AppDataStore.questionCache = new Map();
  }
  const storeExisting = AppDataStore.questionCache.get(cacheKey) || [];
  AppDataStore.questionCache.set(cacheKey, [...storeExisting, question]);

  const sb = client || (isSupabaseConfigured() ? defaultSupabase : null);
  if (sb) {
    try {
      const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
      await sb.from('ai_question_cache').upsert(
        {
          cache_key: cacheKey,
          topic_id: question.topic_tested ? undefined : undefined,
          difficulty: question.difficulty,
          cached_questions: [question],
          expires_at: expiresAt,
          hit_count: 0,
        },
        { onConflict: 'cache_key' }
      );
    } catch (err) {
      console.warn('Supabase cache save fallback:', err);
    }
  }
}
