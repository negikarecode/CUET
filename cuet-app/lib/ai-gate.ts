import { isSupabaseConfigured, supabase } from './supabase';
import { AppDataStore } from './data-store';

export interface AIQualificationStatus {
  isUnlocked: boolean;
  totalAttempts: number;
  requiredAttempts: number;
  remainingAttempts: number;
  progressPercentage: number;
}

export const AI_UNLOCK_REQUIRED_ATTEMPTS = 150;

/**
 * Evaluates the Cold-Start Qualification Gate for a user in cuet-app.
 * Deep AI features are locked until student reaches at least 150 attempts across tests/mocks.
 */
export async function checkAIQualificationGate(
  userId: string
): Promise<AIQualificationStatus> {
  let totalAttempts = 0;

  if (isSupabaseConfigured()) {
    try {
      const { count, error } = await supabase
        .from('user_attempts')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (!error && typeof count === 'number') {
        totalAttempts = count;
      }
    } catch (err) {
      console.warn('Error checking AI Qualification Gate in cuet-app:', err);
    }
  }

  // Fallback to local AppDataStore attempts if 0 or offline
  if (totalAttempts === 0 && AppDataStore.attempts) {
    totalAttempts = AppDataStore.attempts.filter(
      (a) => a.student_id === userId
    ).length;
  }

  const isUnlocked = totalAttempts >= AI_UNLOCK_REQUIRED_ATTEMPTS;
  const remainingAttempts = Math.max(
    0,
    AI_UNLOCK_REQUIRED_ATTEMPTS - totalAttempts
  );
  const progressPercentage = Math.min(
    100,
    Math.round((totalAttempts / AI_UNLOCK_REQUIRED_ATTEMPTS) * 100)
  );

  return {
    isUnlocked,
    totalAttempts,
    requiredAttempts: AI_UNLOCK_REQUIRED_ATTEMPTS,
    remainingAttempts,
    progressPercentage,
  };
}
