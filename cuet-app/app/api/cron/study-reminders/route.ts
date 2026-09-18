import { NextRequest, NextResponse } from 'next/server';
import { sendDailyStudyReminder } from '@/lib/notification-service';
import { AppDataStore } from '@/lib/data-store';
import { format, differenceInDays, parseISO } from 'date-fns';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const secret = process.env.CRON_SECRET || 'cuet_cron_secret_2026';

  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const student = AppDataStore.student;
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const examDate = student.exam_date ? parseISO(student.exam_date) : new Date(Date.now() + 45 * 86400000);
    const daysToExam = Math.max(1, differenceInDays(examDate, new Date()));

    const todayDay = AppDataStore.studyPlanDays.find(
      (d) => d.student_id === student.id && d.plan_date === todayStr
    );

    const tasks = todayDay
      ? AppDataStore.studyTasks.filter((t) => t.plan_day_id === todayDay.id).map((t) => t.title)
      : ['Fundamental Rights Practice', 'Polity Notes Review'];

    await sendDailyStudyReminder(student.id, student.name, tasks, daysToExam);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      student_id: student.id,
      reminded_tasks: tasks,
    });
  } catch (error) {
    console.error('[Cron /api/cron/study-reminders] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
