import { NextRequest, NextResponse } from 'next/server';
import { sendPushNotification } from '@/lib/notification-service';
import { AppDataStore } from '@/lib/data-store';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const secret = process.env.CRON_SECRET || 'cuet_cron_secret_2026';

    if (authHeader !== `Bearer ${secret}`) {
      // In development / demo allow if secret matches default
      if (process.env.NODE_ENV === 'production') {
        return new Response('Unauthorized', { status: 401 });
      }
    }

    const body = await request.json().catch(() => ({}));
    const { student_id = AppDataStore.student.id, title, body: content, url = '/planner', tag = 'manual-reminder' } = body;

    await sendPushNotification(student_id, {
      title: title || '📚 Time for CUET Prep!',
      body: content || 'Your daily tasks are waiting. Complete them to keep your streak alive!',
      url,
      tag,
    });

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
    });
  } catch (error) {
    console.error('[API /api/planner/notifications/send] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
