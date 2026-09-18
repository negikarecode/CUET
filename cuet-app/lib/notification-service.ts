import webPush from 'web-push';
import { supabase } from './supabase';
import { AppDataStore } from './data-store';

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';
const vapidEmail = process.env.VAPID_EMAIL || 'admin@cuet-prep.in';

if (vapidPublicKey && vapidPrivateKey) {
  try {
    webPush.setVapidDetails(
      `mailto:${vapidEmail}`,
      vapidPublicKey,
      vapidPrivateKey
    );
  } catch (err) {
    console.warn('[PushNotification] Failed to initialize VAPID:', err);
  }
}

export interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  tag?: string;
}

export async function sendPushNotification(
  studentId: string,
  payload: PushPayload
): Promise<void> {
  let subscriptions = AppDataStore.pushSubscriptions.filter(
    (s) => s.student_id === studentId && s.reminder_enabled !== false
  );

  try {
    if (supabase) {
      const { data } = await supabase
        .from('push_subscriptions')
        .select('*')
        .eq('student_id', studentId)
        .eq('reminder_enabled', true);

      if (data && data.length > 0) {
        subscriptions = data;
      }
    }
  } catch (err) {
    console.warn('[PushNotification] Supabase query fallback:', err);
  }

  if (!subscriptions || subscriptions.length === 0) {
    console.log(`[PushNotification] No active subscription for student ${studentId}. Simulated send.`);
    return;
  }

  const notificationString = JSON.stringify({
    title: payload.title,
    body: payload.body,
    icon: payload.icon || '/icons/cuetbot-192.png',
    badge: payload.badge || '/icons/badge-72.png',
    data: { url: payload.url || '/planner' },
    tag: payload.tag || 'study-reminder',
  });

  for (const sub of subscriptions) {
    try {
      if (vapidPublicKey && vapidPrivateKey) {
        await webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh_key,
              auth: sub.auth_key,
            },
          },
          notificationString
        );
      }
    } catch (err: any) {
      if (err.statusCode === 410 || err.statusCode === 404) {
        try {
          if (supabase) {
            await supabase.from('push_subscriptions').delete().eq('id', sub.id);
          }
        } catch (delErr) {
          console.warn('Failed to delete expired subscription:', delErr);
        }
      } else {
        console.warn('Web-push delivery warning:', err);
      }
    }
  }
}

// ─────────────────────────────────────────────────────
// Notification Templates
// ─────────────────────────────────────────────────────
export async function sendDailyStudyReminder(
  studentId: string,
  studentName: string,
  todayTasks: string[],
  daysToExam: number
): Promise<void> {
  const firstName = studentName ? studentName.split(' ')[0] : 'Champion';

  await sendPushNotification(studentId, {
    title: `📚 Study Time, ${firstName}!`,
    body: daysToExam <= 7
      ? `${daysToExam} days to CUET! Focus on: ${todayTasks[0] || 'your plan'}. You've got this!`
      : `Today: ${todayTasks.slice(0, 2).join(' + ')}. ${daysToExam} days to go!`,
    url: '/planner',
    tag: 'daily-reminder',
  });
}

export async function sendStreakAlertNotification(
  studentId: string,
  currentStreak: number
): Promise<void> {
  await sendPushNotification(studentId, {
    title: `⚡ Don't break your ${currentStreak}-day streak!`,
    body: 'You haven\'t studied today yet. Quick — even 1 task keeps the streak alive!',
    url: '/planner',
    tag: 'streak-alert',
  });
}

export async function sendMilestoneNotification(
  studentId: string,
  milestone: number
): Promise<void> {
  const messages: Record<number, { title: string; body: string }> = {
    3:  { title: '🌱 3-Day Streak!', body: 'You\'re building a habit. Keep going!' },
    7:  { title: '🔥 ONE WEEK!', body: 'A full week of consistent study. Incredible!' },
    14: { title: '⚡ 14 DAYS!', body: 'Two weeks strong. You\'re unstoppable!' },
    21: { title: '🌟 21 DAYS!', body: 'Three weeks! This is now your lifestyle. 🏆' },
    30: { title: '👑 30 DAYS!', body: 'ONE MONTH! You\'re a legend. DU/JNU is yours!' },
  };

  const msg = messages[milestone] || {
    title: `🎉 ${milestone}-Day Streak!`,
    body: 'Incredible consistency. Keep going!',
  };

  await sendPushNotification(studentId, {
    ...msg,
    url: '/planner',
    tag: 'milestone',
  });
}

export async function sendMissedStudyNotification(
  studentId: string
): Promise<void> {
  await sendPushNotification(studentId, {
    title: '📚 We missed you today!',
    body: 'Koi baat nahi — kal fresh start karo. Your plan is ready! 💪',
    url: '/planner',
    tag: 'missed-study',
  });
}
