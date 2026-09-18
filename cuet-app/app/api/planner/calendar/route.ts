import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { generateStudyPlan } from '@/lib/planner-engine';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const student = AppDataStore.student;
    const studentId = student.id;

    let activePlan = AppDataStore.getActivePlan(studentId);
    if (!activePlan) {
      await generateStudyPlan(studentId);
      activePlan = AppDataStore.getActivePlan(studentId);
    }

    const planDays = AppDataStore.studyPlanDays.filter(
      (d) => d.plan_id === activePlan?.id
    );

    const enrichedDays = planDays.map((d) => {
      const tasks = AppDataStore.studyTasks.filter((t) => t.plan_day_id === d.id);
      const completed = tasks.filter((t) => t.status === 'completed');
      return {
        id: d.id,
        date: d.plan_date,
        day_number: d.day_number,
        day_type: d.day_type,
        total_tasks: tasks.length,
        completed_tasks: completed.length,
        completion_percentage: tasks.length > 0 ? Math.round((completed.length / tasks.length) * 100) : 0,
        total_minutes: d.total_minutes,
        completed_minutes: d.completed_minutes,
        is_day_complete: d.is_day_complete,
        tasks: tasks.map((t) => ({
          id: t.id,
          title: t.title,
          status: t.status,
          priority: t.priority,
          planned_minutes: t.planned_minutes,
          task_type: t.task_type,
        })),
      };
    });

    return NextResponse.json({
      success: true,
      plan_id: activePlan?.id,
      exam_date: activePlan?.exam_date,
      total_days: planDays.length,
      days: enrichedDays,
    });
  } catch (error) {
    console.error('[API /api/planner/calendar] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
