import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { task_id, new_date, reason = 'Student requested reschedule' } = body;

    if (!task_id || !new_date) {
      return NextResponse.json(
        { success: false, error: 'task_id and new_date are required' },
        { status: 400 }
      );
    }

    const task = AppDataStore.studyTasks.find((t) => t.id === task_id);
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Find target day or create placeholder
    let targetDay = AppDataStore.studyPlanDays.find(
      (d) => d.student_id === task.student_id && d.plan_date === new_date
    );

    if (!targetDay) {
      targetDay = {
        id: AppDataStore.studyPlanDays.length + 1,
        plan_id: task.plan_id,
        student_id: task.student_id,
        plan_date: new_date,
        day_number: 99,
        day_type: 'study',
        total_minutes: task.planned_minutes,
        completed_minutes: 0,
        is_day_complete: false,
        completion_percentage: 0,
        created_at: new Date().toISOString(),
      };
      AppDataStore.studyPlanDays.push(targetDay);
    }

    task.plan_day_id = targetDay.id;
    task.original_date = task.created_at;
    task.reschedule_reason = reason;
    task.status = 'pending';

    // Supabase sync
    try {
      if (supabase) {
        await supabase
          .from('study_tasks')
          .update({
            plan_day_id: targetDay.id,
            reschedule_reason: reason,
            status: 'pending',
          })
          .eq('id', task_id);
      }
    } catch (err) {
      console.warn('[API /api/planner/reschedule] Supabase update warning:', err);
    }

    return NextResponse.json({
      success: true,
      message: `Task rescheduled to ${new_date}`,
      task_id: task.id,
      new_date,
    });
  } catch (error) {
    console.error('[API /api/planner/reschedule] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
