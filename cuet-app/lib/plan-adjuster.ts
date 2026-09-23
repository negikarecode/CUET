import { format, addDays } from 'date-fns';
import { AppDataStore } from './data-store';
import { supabase } from './supabase';
import {
  sendMilestoneNotification,
  sendMissedStudyNotification,
  sendStreakAlertNotification,
} from './notification-service';

export async function adjustPlanForTomorrow(
  studentId: string
): Promise<{
  completionRate: number;
  rescheduledCount: number;
  streakUpdated: boolean;
  statusMessage: string;
}> {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const tomorrowStr = format(addDays(today, 1), 'yyyy-MM-dd');

  // Find today's plan day
  const todayPlanDay = AppDataStore.studyPlanDays.find(
    (d) => d.student_id === studentId && d.plan_date === todayStr
  );

  let tomorrowPlanDay = AppDataStore.studyPlanDays.find(
    (d) => d.student_id === studentId && d.plan_date === tomorrowStr
  );

  if (!todayPlanDay) {
    return {
      completionRate: 0,
      rescheduledCount: 0,
      streakUpdated: false,
      statusMessage: 'No plan day found for today.',
    };
  }

  const todayTasks = AppDataStore.studyTasks.filter(
    (t) => t.plan_day_id === todayPlanDay.id
  );

  const completedTasks = todayTasks.filter((t) => t.status === 'completed');
  const incompleteTasks = todayTasks.filter(
    (t) => t.status === 'pending' && t.task_type !== 'break'
  );

  const completionRate = todayTasks.length > 0
    ? completedTasks.length / todayTasks.length
    : 0;

  let rescheduledCount = 0;

  // ── SCENARIO 1: Completed 100% ────────────────────
  if (completionRate >= 1.0) {
    const streak = AppDataStore.getStreak(studentId);
    streak.current_streak += 1;
    streak.longest_streak = Math.max(streak.current_streak, streak.longest_streak);
    streak.last_study_date = todayStr;
    streak.total_study_days += 1;
    streak.updated_at = new Date().toISOString();

    const MILESTONES = [3, 7, 14, 21, 30, 60];
    const newMilestone = MILESTONES.find(
      (m) => m === streak.current_streak && !streak.milestones_reached.includes(m)
    );

    if (newMilestone) {
      streak.milestones_reached.push(newMilestone);
      await sendMilestoneNotification(studentId, newMilestone);
    }

    return {
      completionRate: 1.0,
      rescheduledCount: 0,
      streakUpdated: true,
      statusMessage: `Amazing work! 100% completed today. Streak is now ${streak.current_streak} days.`,
    };
  }

  // ── SCENARIO 2: Completed 50% - 99% ───────────────
  if (completionRate >= 0.5) {
    if (tomorrowPlanDay) {
      for (const task of incompleteTasks) {
        task.plan_day_id = tomorrowPlanDay.id;
        task.original_date = todayStr;
        task.reschedule_reason = 'Moved from yesterday (50%+ completed)';
        rescheduledCount++;
      }
    }

    const streak = AppDataStore.getStreak(studentId);
    streak.last_study_date = todayStr;
    streak.total_study_days += 1;

    return {
      completionRate,
      rescheduledCount,
      streakUpdated: true,
      statusMessage: `Good progress! Rescheduled ${rescheduledCount} tasks to tomorrow.`,
    };
  }

  // ── SCENARIO 3: Completed < 50% but > 0 ────────────
  if (completionRate > 0 && completionRate < 0.5) {
    const criticalTasks = incompleteTasks.filter((t) => t.priority === 'critical');
    if (tomorrowPlanDay) {
      for (const task of criticalTasks) {
        task.plan_day_id = tomorrowPlanDay.id;
        task.original_date = todayStr;
        task.reschedule_reason = 'Critical task rescheduled';
        rescheduledCount++;
      }
    }

    return {
      completionRate,
      rescheduledCount,
      streakUpdated: false,
      statusMessage: `Prioritized ${rescheduledCount} critical tasks for tomorrow.`,
    };
  }

  // ── SCENARIO 4: Did not study today (0%) ──────────
  const streak = AppDataStore.getStreak(studentId);
  streak.current_streak = 0;
  await sendMissedStudyNotification(studentId);

  return {
    completionRate: 0,
    rescheduledCount: 0,
    streakUpdated: true,
    statusMessage: 'Missed study session today. Streak reset to 0.',
  };
}

export async function checkIfNeedsRegeneration(
  studentId: string
): Promise<{ shouldRegenerate: boolean; reason?: string }> {
  const missedTasks = AppDataStore.studyTasks.filter(
    (t) => t.student_id === studentId && (t.status === 'skipped' || !!t.reschedule_reason)
  );

  if (missedTasks.length >= 6) {
    return {
      shouldRegenerate: true,
      reason: 'Multiple missed sessions recently. A realistic re-balance is recommended.',
    };
  }

  return { shouldRegenerate: false };
}
