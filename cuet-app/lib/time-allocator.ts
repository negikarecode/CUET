import { WeaknessScore, TopicTimeAllocation } from './types';

// ─────────────────────────────────────────────────────
// Minutes needed per topic based on weakness level
// ─────────────────────────────────────────────────────
export const BASE_MINUTES_PER_LEVEL: Record<string, number> = {
  critical:  120,  // 2 hours total across plan
  weak:       90,  // 1.5 hours
  average:    60,  // 1 hour
  strong:     30,  // 30 min (just revision)
  excellent:  15,  // 15 min (quick check)
  untested:   75,  // 1h 15min (need to cover from scratch)
};

// Minutes to allocate per SESSION (not total)
export const SESSION_MINUTES_PER_LEVEL: Record<string, number> = {
  critical:  40,  // 40 min per session, 3 sessions total
  weak:      35,  // 35 min per session, 2-3 sessions
  average:   30,  // 30 min per session, 2 sessions
  strong:    20,  // 20 min, 1-2 sessions
  excellent: 15,  // 15 min, 1 session
  untested:  35,  // 35 min per session
};

// How many times to revisit each level before exam
export const SESSIONS_PER_LEVEL: Record<string, number> = {
  critical:  4,  // Visit 4 times before exam
  weak:      3,
  average:   2,
  strong:    1,
  excellent: 1,
  untested:  2,
};

// ─────────────────────────────────────────────────────
// Calculate priority score for each topic
// Higher priority = more urgent to study
// ─────────────────────────────────────────────────────
export function calculateTopicPriority(
  weaknessScore: WeaknessScore | any,
  daysToExam: number,
  cuetWeightage: number,
  doubtCount: number
): number {
  
  // Base priority from weakness level
  const levelPriority: Record<string, number> = {
    critical:  100,
    weak:       75,
    average:    50,
    strong:     25,
    excellent:  10,
    untested:   80,
    // Untested is high priority — we don't know if it's weak!
  };
  
  let priority = levelPriority[
    weaknessScore.weakness_level as keyof typeof levelPriority
  ] || 50;
  
  // Boost for high CUET weightage topics
  // If 8+ questions come from this chapter → critical to cover
  priority += (cuetWeightage / 10) * 20;
  
  // Boost for topics with chat doubts (Module 3 signal)
  // If student asked about this in chat → they're confused
  priority += Math.min(doubtCount * 5, 20);
  
  // Urgency boost when exam is close
  if (daysToExam <= 7) {
    // Close to exam → deprioritize new topics
    // Focus on what's already partially known
    if (weaknessScore.weakness_level === 'untested') {
      priority -= 30; // Too late to start new topics
    }
    if (weaknessScore.weakness_level === 'critical') {
      priority += 20; // But still fix critical gaps
    }
  } else if (daysToExam <= 30) {
    // 30 days → balance new and weak topics
    if (weaknessScore.weakness_level === 'critical') {
      priority += 10;
    }
  }
  
  return Math.max(0, Math.min(100, priority));
}

// ─────────────────────────────────────────────────────
// Allocate time for ALL topics
// Returns sorted list (most urgent first)
// ─────────────────────────────────────────────────────
export function allocateTimeForAllTopics(
  weaknessScores: (WeaknessScore | any)[],
  daysToExam: number,
  dailyMinutes: number,
  doubtTopicsCount: Record<number, number>
): TopicTimeAllocation[] {
  
  const allocations: TopicTimeAllocation[] = [];
  
  for (const ws of weaknessScores) {
    const level = (ws.weakness_level || 'average') as string;
    const doubtCount = doubtTopicsCount[ws.topic_id] || 0;
    const weightage = ws.chapter?.weightage || ws.topic?.chapter?.weightage || 5;
    
    const priority = calculateTopicPriority(
      ws,
      daysToExam,
      weightage,
      doubtCount
    );
    
    const sessionsNeeded = SESSIONS_PER_LEVEL[level] || 2;
    const minutesPerSession = SESSION_MINUTES_PER_LEVEL[level] || 30;
    const totalMinutes = sessionsNeeded * minutesPerSession;
    
    allocations.push({
      topic_id:             ws.topic_id,
      topic_name:           ws.topic?.topic_name || `Topic ${ws.topic_id}`,
      subject_id:           ws.subject_id,
      subject_name:         ws.subject?.name || 'Subject',
      chapter_id:           ws.chapter_id,
      weakness_level:       ws.weakness_level || 'average',
      weakness_score:       ws.final_weakness_score || 0,
      priority_score:       priority,
      total_minutes_needed: totalMinutes,
      sessions_needed:      sessionsNeeded,
      minutes_per_session:  minutesPerSession,
      importance:           ws.topic?.importance || 'medium',
      cuet_weightage:       weightage,
    });
  }
  
  // Sort by priority (highest first)
  return allocations.sort((a, b) => b.priority_score - a.priority_score);
}

// ─────────────────────────────────────────────────────
// Check if total time fits in available days
// ─────────────────────────────────────────────────────
export function checkTimeFeasibility(
  allocations: TopicTimeAllocation[],
  daysToExam: number,
  dailyMinutes: number
): {
  isFeasible: boolean;
  totalMinutesNeeded: number;
  totalMinutesAvailable: number;
  deficit: number;
  recommendation: string;
} {
  
  const totalNeeded = allocations.reduce(
    (sum, a) => sum + a.total_minutes_needed, 0
  );
  
  // Reserve 20% of time for mock tests and revision
  const studyMinutes = dailyMinutes * Math.max(1, daysToExam) * 0.8;
  
  const isFeasible = totalNeeded <= studyMinutes;
  const deficit = totalNeeded - studyMinutes;
  
  let recommendation = '';
  if (!isFeasible) {
    recommendation = `You need ${Math.round(deficit / 60)} more hours than available. Consider increasing daily study time, or focusing only on critical and weak topics.`;
  } else {
    const surplus = studyMinutes - totalNeeded;
    recommendation = `Great! You have ${Math.round(surplus / 60)} extra hours for additional mock tests and revision.`;
  }
  
  return {
    isFeasible,
    totalMinutesNeeded: totalNeeded,
    totalMinutesAvailable: studyMinutes,
    deficit: Math.max(0, Math.round(deficit)),
    recommendation: recommendation.trim(),
  };
}
