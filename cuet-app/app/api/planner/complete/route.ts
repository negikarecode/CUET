import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { task_id, actual_minutes = 30 } = body;

    if (!task_id) {
      return NextResponse.json(
        { success: false, error: 'task_id is required' },
        { status: 400 }
      );
    }

    const { task, day, isDayComplete } = AppDataStore.completeTask(task_id, actual_minutes);

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Sync with Module 1: If task was on a topic, simulate practice improvement
    if (task.topic_id) {
      AppDataStore.recordChatAttempt({
        student_id: task.student_id,
        subject_id: task.subject_id || 1,
        chapter_id: task.chapter_id || 10,
        topic_id: task.topic_id,
        selected_option: 'B',
        is_correct: true,
        time_taken_seconds: 35,
      });
    }

    // Background sync to Supabase
    try {
      if (supabase) {
        await supabase
          .from('study_tasks')
          .update({
            status: 'completed',
            actual_minutes,
            completed_at: new Date().toISOString(),
          })
          .eq('id', task_id);

        if (day) {
          await supabase
            .from('study_plan_days')
            .update({
              completed_minutes: day.completed_minutes,
              completion_percentage: day.completion_percentage,
              is_day_complete: isDayComplete,
            })
            .eq('id', day.id);
        }
      }
    } catch (err) {
      console.warn('[API /api/planner/complete] Supabase update warning:', err);
    }

    const streak = AppDataStore.getStreak(task.student_id);

    return NextResponse.json({
      success: true,
      data: {
        task_id: task.id,
        status: task.status,
        actual_minutes: task.actual_minutes,
        completed_at: task.completed_at,
        day_completion_percentage: day?.completion_percentage || 100,
        is_day_complete: isDayComplete,
        current_streak: streak.current_streak,
      },
    });
  } catch (error) {
    console.error('[API /api/planner/complete] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
