import { NextRequest, NextResponse } from 'next/server';
import { format, differenceInDays, parseISO } from 'date-fns';
import { AppDataStore } from '@/lib/data-store';
import { calculateStreakDetails } from '@/lib/streak-tracker';
import { generateStudyPlan } from '@/lib/planner-engine';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const student = AppDataStore.student;
    const studentId = student.id;
    const todayStr = format(new Date(), 'yyyy-MM-dd');

    // 1. Check if active plan exists, if not generate one automatically
    let activePlan = AppDataStore.getActivePlan(studentId);
    if (!activePlan) {
      const generated = await generateStudyPlan(studentId);
      if (generated.success) {
        activePlan = AppDataStore.getActivePlan(studentId);
      }
    }

    if (!activePlan) {
      return NextResponse.json({
        success: false,
        has_plan: false,
        message: 'No study plan found. Please generate your plan.',
      });
    }

    // 2. Find today's plan day
    let todayDay = AppDataStore.studyPlanDays.find(
      (d) => d.plan_id === activePlan?.id && d.plan_date === todayStr
    );

    // If today's day not found (e.g. today is day 1), use the first plan day
    if (!todayDay) {
      todayDay = AppDataStore.studyPlanDays.find((d) => d.plan_id === activePlan?.id) || {
        id: 1,
        plan_id: activePlan.id,
        student_id: studentId,
        plan_date: todayStr,
        day_number: 1,
        day_type: 'study',
        daily_tip: 'Start with your most critical topic when your mind is fresh!',
        daily_quote: '"CUET jita wahi hai jo consistent rehta hai."',
        total_minutes: 150,
        completed_minutes: 0,
        is_day_complete: false,
        completion_percentage: 0,
        created_at: new Date().toISOString(),
      };
    }

    // 3. Get tasks for today's plan day
    const tasks = AppDataStore.studyTasks.filter(
      (t) => t.plan_day_id === todayDay?.id
    );

    const completedTasks = tasks.filter((t) => t.status === 'completed');
    const completedMinutes = completedTasks.reduce(
      (sum, t) => sum + (t.actual_minutes || t.planned_minutes),
      0
    );
    const totalMinutes = tasks.reduce((sum, t) => sum + t.planned_minutes, 0);
    const completionPercentage = tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

    // 4. Streak information
    const rawStreak = AppDataStore.getStreak(studentId);
    const streakDetails = calculateStreakDetails(rawStreak, student.name);

    // 5. Days to exam
    const examDate = activePlan.exam_date ? parseISO(activePlan.exam_date) : new Date(Date.now() + 45 * 86400000);
    const daysToExam = Math.max(1, differenceInDays(examDate, new Date()));

    // 6. Cross-module activity today
    const aiQuestionsToday = AppDataStore.attempts.filter(
      (a) => a.student_id === studentId && a.attempt_source === 'practice'
    ).length;
    const chatDoubtsToday = AppDataStore.doubtLogs.filter(
      (d) => d.student_id === studentId
    ).length;

    // 7. Daily personalized motivation message
    const mainTopicName = tasks.find((t) => t.task_type === 'ai_practice' || t.task_type === 'practice')?.title || 'CUET topics';
    const motivationMessage = `Kal aapne solid effort kiya — streak is ${streakDetails.current_streak} days! Aaj ${mainTopicName} complete karo aur track pe raho! 💪`;

    return NextResponse.json({
      success: true,
      has_plan: true,
      plan_id: activePlan.id,
      plan_date: todayDay.plan_date,
      day_number: todayDay.day_number,
      days_to_exam: daysToExam,
      day_type: todayDay.day_type,
      daily_tip: todayDay.daily_tip,
      daily_quote: todayDay.daily_quote,
      daily_motivation: motivationMessage,
      streak: {
        current: streakDetails.current_streak,
        longest: streakDetails.longest_streak,
        status: streakDetails.streak_status,
        emoji: streakDetails.streak_emoji,
        message: streakDetails.streak_message,
        next_milestone: streakDetails.next_milestone,
        days_to_next: streakDetails.days_to_next_milestone,
      },
      completion: {
        percentage: completionPercentage,
        completed_tasks: completedTasks.length,
        total_tasks: tasks.length,
        completed_minutes: completedMinutes,
        total_minutes: totalMinutes,
        is_day_complete: completedTasks.length > 0 && completedTasks.length === tasks.length,
      },
      tasks: tasks.map((t) => ({
        id: t.id,
        task_order: t.task_order,
        task_type: t.task_type,
        status: t.status,
        title: t.title,
        description: t.description,
        planned_minutes: t.planned_minutes,
        actual_minutes: t.actual_minutes,
        priority: t.priority,
        target_questions: t.target_questions,
        actual_questions: t.actual_questions,
        target_accuracy: t.target_accuracy,
        actual_accuracy: t.actual_accuracy,
        link_url: t.link_url,
        link_label: t.link_label,
        topic_id: t.topic_id,
        completed_at: t.completed_at,
      })),
      modules_used_today: {
        ai_questions: aiQuestionsToday,
        chat_messages: chatDoubtsToday,
      },
    });
  } catch (error) {
    console.error('[API /api/planner/today] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
