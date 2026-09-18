import { NextRequest, NextResponse } from 'next/server';
import { adjustPlanForTomorrow } from '@/lib/plan-adjuster';
import { AppDataStore } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const secret = process.env.CRON_SECRET || 'cuet_cron_secret_2026';

  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const student = AppDataStore.student;
    const result = await adjustPlanForTomorrow(student.id);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      student_id: student.id,
      adjustment: result,
    });
  } catch (error) {
    console.error('[Cron /api/cron/daily-adjustment] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
