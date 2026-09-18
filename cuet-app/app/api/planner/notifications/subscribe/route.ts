import { NextRequest, NextResponse } from 'next/server';
import { AppDataStore } from '@/lib/data-store';
import { supabase } from '@/lib/supabase';
import { sendPushNotification } from '@/lib/notification-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      subscription,
      study_reminder_time = '08:00:00',
      reminder_enabled = true,
      streak_alerts = true,
      plan_updates = true,
      device_type = 'desktop',
    } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { success: false, error: 'Subscription endpoint is required' },
        { status: 400 }
      );
    }

    const studentId = AppDataStore.student.id;
    const p256dh = subscription.keys?.p256dh || '';
    const auth = subscription.keys?.auth || '';

    // Save in AppDataStore
    const existingIdx = AppDataStore.pushSubscriptions.findIndex(
      (s) => s.endpoint === subscription.endpoint
    );
    const subRecord = {
      student_id: studentId,
      endpoint: subscription.endpoint,
      p256dh_key: p256dh,
      auth_key: auth,
      study_reminder_time,
      reminder_enabled,
      streak_alerts,
      plan_updates,
      device_type,
      created_at: new Date().toISOString(),
    };

    if (existingIdx !== -1) {
      AppDataStore.pushSubscriptions[existingIdx] = subRecord;
    } else {
      AppDataStore.pushSubscriptions.push(subRecord);
    }

    // Save in Supabase if configured
    try {
      if (supabase) {
        await supabase.from('push_subscriptions').upsert(
          {
            student_id: studentId,
            endpoint: subscription.endpoint,
            p256dh_key: p256dh,
            auth_key: auth,
            study_reminder_time,
            reminder_enabled,
            streak_alerts,
            plan_updates,
            device_type,
          },
          { onConflict: 'student_id,endpoint' }
        );
      }
    } catch (dbErr) {
      console.warn('[PushSub] Supabase upsert fallback:', dbErr);
    }

    // Send immediate test welcome notification
    sendPushNotification(studentId, {
      title: '🔔 Notifications Enabled!',
      body: `You'll get daily study reminders at ${study_reminder_time.substring(0, 5)} AM/PM.`,
      url: '/planner',
      tag: 'welcome-notification',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'Subscribed to push notifications successfully',
    });
  } catch (error) {
    console.error('[API /api/planner/notifications/subscribe] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
