import { StreakData } from './types';

export const MILESTONES = [3, 7, 14, 21, 30, 60, 90];

export function getStreakStatus(streak: {
  current_streak: number;
  last_study_date: string;
}): StreakData['streak_status'] {
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString().split('T')[0];
  
  if (streak.last_study_date !== today && 
      streak.last_study_date !== yesterday) {
    return 'broken';
  }
  
  if (streak.last_study_date === yesterday && 
      streak.current_streak > 0) {
    return 'at_risk'; // Haven't studied today yet
  }
  
  if (streak.current_streak >= 7) return 'on_fire';
  if (streak.current_streak >= 1) return 'active';
  
  return 'broken';
}

export function getStreakEmoji(streak: number): string {
  if (streak === 0) return '💔';
  if (streak < 3) return '🌱';
  if (streak < 7) return '🔥';
  if (streak < 14) return '⚡';
  if (streak < 30) return '🌟';
  return '👑';
}

export function getStreakMessage(
  streak: number,
  status: StreakData['streak_status'],
  studentName: string
): string {
  const firstName = studentName ? studentName.split(' ')[0] : 'Champion';
  
  if (status === 'broken') {
    return `Start fresh today, ${firstName}! Every expert had a Day 1. 💪`;
  }
  
  if (status === 'at_risk') {
    return `Study today to keep your ${streak}-day streak alive! ⚡`;
  }
  
  if (streak === 1) return 'First day! Keep it up! 🌱';
  if (streak === 3) return '3 days! Building a solid habit! 🎯';
  if (streak === 7) return '1 WEEK! You\'re on fire! 🔥';
  if (streak === 14) return '2 weeks strong! Amazing consistency! ⚡';
  if (streak === 21) return '3 weeks! This is a lifestyle now! 🌟';
  if (streak >= 30) return `${streak} DAYS! Absolute legend! 👑`;
  
  return `${streak} days in a row! Stay consistent! 💪`;
}

export function getNextMilestone(current: number): number | null {
  return MILESTONES.find(m => m > current) || null;
}

export function calculateStreakDetails(
  rawStreak: {
    current_streak?: number;
    longest_streak?: number;
    last_study_date?: string;
    total_study_days?: number;
    milestones_reached?: number[];
  },
  studentName: string = 'Champion'
): StreakData {
  const current_streak = rawStreak.current_streak || 0;
  const longest_streak = rawStreak.longest_streak || current_streak;
  const last_study_date = rawStreak.last_study_date || new Date().toISOString().split('T')[0];
  const total_study_days = rawStreak.total_study_days || Math.max(current_streak, 1);
  const milestones_reached = rawStreak.milestones_reached || [3, 7];

  const status = getStreakStatus({ current_streak, last_study_date });
  const emoji = getStreakEmoji(current_streak);
  const message = getStreakMessage(current_streak, status, studentName);
  const nextMilestone = getNextMilestone(current_streak);
  const days_to_next_milestone = nextMilestone ? Math.max(0, nextMilestone - current_streak) : 0;

  return {
    current_streak,
    longest_streak,
    last_study_date,
    total_study_days,
    milestones_reached,
    next_milestone: nextMilestone,
    days_to_next_milestone,
    streak_status: status,
    streak_emoji: emoji,
    streak_message: message,
  };
}
