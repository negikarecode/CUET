import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';
import { format, addDays } from 'date-fns';
import { StudyTask } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { analysis_id, action_plan } = body;

    const studentId = AppDataStore.student.id;
    const activePlan = AppDataStore.getActivePlan(studentId);

    if (!activePlan) {
      return NextResponse.json(
        { success: false, error: 'No active study plan found' },
        { status: 400 }
      );
    }

    const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd');
    let planDay = AppDataStore.studyPlanDays.find(
      (d) => d.plan_id === activePlan.id && d.plan_date === tomorrowStr
    );

    if (!planDay) {
      planDay = AppDataStore.studyPlanDays.find((d) => d.plan_id === activePlan.id) || {
        id: AppDataStore.studyPlanDays.length + 1,
        plan_id: activePlan.id,
        student_id: studentId,
        plan_date: tomorrowStr,
        day_number: 2,
        day_type: 'study',
        total_minutes: 150,
        completed_minutes: 0,
        is_day_complete: false,
        completion_percentage: 0,
        daily_tip: 'Tackle high-yield mock test corrections early.',
        daily_quote: '"Mistakes are the stepping stones to 100 percentile."',
        created_at: new Date().toISOString(),
      };
      if (!AppDataStore.studyPlanDays.some((d) => d.id === planDay?.id)) {
        AppDataStore.studyPlanDays.push(planDay);
      }
    }

    const newTasks: StudyTask[] = [];
    const tasksToAdd = Array.isArray(action_plan) ? action_plan : [];

    tasksToAdd.forEach((item: any, idx: number) => {
      const task: StudyTask = {
        id: AppDataStore.studyTasks.length + 1 + idx,
        plan_id: activePlan.id,
        plan_day_id: planDay.id,
        student_id: studentId,
        task_order: 10 + idx,
        task_type: item.link_label?.toLowerCase().includes('bot') ? 'doubt_solving' : 'ai_practice',
        subject_id: 1,
        chapter_id: 10,
        topic_id: 4,
        title: `${item.action}`,
        description: item.why || 'Targeted fix from mock test analysis',
        planned_minutes: item.time_minutes || 35,
        actual_minutes: 0,
        status: 'pending',
        priority: 'critical',
        target_questions: 20,
        target_accuracy: 75,
        link_url: item.link_url || '/practice/ai/4',
        link_label: item.link_label || 'Start Practice',
        created_at: new Date().toISOString(),
      };

      AppDataStore.studyTasks.push(task);
      newTasks.push(task);
    });

    if (supabase) {
      try {
        for (const t of newTasks) {
          await supabase.from('study_tasks').insert({
            plan_id: t.plan_id,
            plan_day_id: t.plan_day_id,
            student_id: t.student_id,
            task_order: t.task_order,
            task_type: t.task_type,
            title: t.title,
            description: t.description,
            planned_minutes: t.planned_minutes,
            priority: t.priority,
            link_url: t.link_url,
            link_label: t.link_label,
          });
        }
      } catch (err) {
        console.warn('[API /api/analysis/apply-plan] Supabase sync warning:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `${newTasks.length} targeted tasks added to your study plan!`,
      tasks_added: newTasks.length,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API /api/analysis/apply-plan] Error:', errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
