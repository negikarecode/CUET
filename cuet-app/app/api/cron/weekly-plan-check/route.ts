import { NextRequest, NextResponse } from 'next/server';
import { checkIfNeedsRegeneration } from '@/lib/plan-adjuster';
import { AppDataStore } from '@/lib/data-store';
import { sendPushNotification } from '@/lib/notification-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const secret = process.env.CRON_SECRET || 'cuet_cron_secret_2026';

  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const student = AppDataStore.student;
    const check = await checkIfNeedsRegeneration(student.id);

    if (check.shouldRegenerate) {
      await sendPushNotification(student.id, {
        title: 'Weekly Plan Check',
        body: check.reason || 'Your study plan needs an update! Tap to re-balance.',
        url: '/planner/settings',
        tag: 'weekly-check',
      });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      student_id: student.id,
      needs_regeneration: check.shouldRegenerate,
      reason: check.reason,
    });
  } catch (error) {
    console.error('[Cron /api/cron/weekly-plan-check] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
