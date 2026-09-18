import { WeaknessScore, Alert } from './types';

export function generateSmartAlerts(scores: WeaknessScore[]): Alert[] {
  const alerts: Alert[] = [];
  let alertId = 1;

  for (const score of scores) {
    const topicName = score.topic?.topic_name || 'Selected Topic';
    const now = new Date().getTime();
    const lastAttemptTime = score.last_attempted ? new Date(score.last_attempted).getTime() : 0;
    const daysSinceLast = lastAttemptTime ? Math.floor((now - lastAttemptTime) / (1000 * 60 * 60 * 24)) : 999;

    // 1. Critical Weakness Alert
    if (score.weakness_level === 'critical') {
      alerts.push({
        id: alertId++,
        type: 'critical_weakness',
        title: `🔴 Urgent: ${topicName} needs immediate attention`,
        message: `Your accuracy in ${topicName} is only ${score.accuracy_score}%. Practice 10 questions today to raise your score above the critical zone.`,
        action_text: 'Fix This First →',
        action_url: `/practice/${score.topic_id}`,
        is_read: false,
        created_at: new Date().toISOString(),
      });
    }

    // 2. Neglected Topic Alert (Inactive for 4+ days)
    if (daysSinceLast >= 4 && score.total_attempts > 0 && score.weakness_level !== 'excellent') {
      alerts.push({
        id: alertId++,
        type: 'neglected_topic',
        title: `⚠️ ${topicName} not practiced in ${daysSinceLast} days!`,
        message: `Retention drops by 40% after 4 days without revision. Spend 15 minutes reviewing key concepts.`,
        action_text: 'Quick Revision →',
        action_url: `/practice/${score.topic_id}`,
        is_read: false,
        created_at: new Date().toISOString(),
      });
    }

    // 3. Speed Warning (Time Sink)
    if (score.avg_time_seconds > 60 && score.total_attempts >= 3) {
      alerts.push({
        id: alertId++,
        type: 'speed_warning',
        title: `⏱️ Speed Alert in ${topicName}`,
        message: `You're taking ${Math.round(score.avg_time_seconds)}s per question on average. CUET target is 45s. Practice time-management drills.`,
        action_text: 'Speed Drill →',
        action_url: `/practice/${score.topic_id}`,
        is_read: false,
        created_at: new Date().toISOString(),
      });
    }
  }

  return alerts.slice(0, 5); // Return top 5 most relevant alerts
}
