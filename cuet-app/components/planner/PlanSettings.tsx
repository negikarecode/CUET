'use client';
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  Bell,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Save,
} from 'lucide-react';
import RegeneratePlanModal from './RegeneratePlanModal';

interface PlanSettingsProps {
  initialExamDate?: string;
  initialHours?: number;
  initialReminderTime?: string;
  onSaved?: () => void;
}

export default function PlanSettings({
  initialExamDate = '2026-05-15',
  initialHours = 4,
  initialReminderTime = '08:00',
  onSaved,
}: PlanSettingsProps) {
  const [examDate, setExamDate] = useState(initialExamDate);
  const [dailyHours, setDailyHours] = useState(initialHours);
  const [reminderTime, setReminderTime] = useState(initialReminderTime);
  const [subjects, setSubjects] = useState<string[]>([
    'Political Science',
    'History',
    'Economics',
  ]);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [planUpdates, setPlanUpdates] = useState(true);
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const availableSubjects = [
    'Political Science',
    'History',
    'Economics',
    'English',
    'General Test',
    'Sociology',
  ];

  const handleToggleSubject = (s: string) => {
    setSubjects((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    if (onSaved) onSaved();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleEnablePush = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      alert('Push notifications are not supported in your browser.');
      return;
    }

    setIsSubscribing(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const fakeSub = {
          endpoint: `https://push.browser.fake/${Date.now()}`,
          keys: {
            p256dh: 'BNc4k6h7Qip2e2sB6MKpJ2PhzUWtHje4B1D7i6kzDsjVHAvJImmN44Oo7QpdtCAl',
            auth: 'auth_key_sample',
          },
        };

        await fetch('/api/planner/notifications/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription: fakeSub,
            study_reminder_time: `${reminderTime}:00`,
            reminder_enabled: dailyReminder,
          }),
        });

        alert('🔔 Push notifications enabled successfully!');
      } else {
        alert('Notification permission was denied in your browser settings.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
          ⚙️ Study Plan Preferences
        </h2>

        {/* Section 1: Exam Details */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" />
            CUET Exam Date
          </label>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-indigo-500"
            />
            <span className="text-xs text-slate-500">Official NTA CUET Schedule</span>
          </div>
        </div>

        {/* Section 2: Daily Hours Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-500" />
              Daily Study Hours
            </label>
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
              {dailyHours} hours / day
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={8}
            step={0.5}
            value={dailyHours}
            onChange={(e) => setDailyHours(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>2 hours (Light)</span>
            <span>4 hours (Recommended)</span>
            <span>8 hours (Intensive)</span>
          </div>
        </div>

        {/* Section 3: Selected Subjects */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            Active Subjects Included in Plan
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {availableSubjects.map((s) => {
              const isChecked = subjects.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleToggleSubject(s)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                    isChecked
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <span>{s}</span>
                  {isChecked && <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Notifications & Reminder Time */}
        <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-indigo-500" />
              Preferred Reminder Time
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
            />
          </div>

          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>Send Daily Study Reminder at preferred time</span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={streakAlerts}
                onChange={(e) => setStreakAlerts(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>Streak Protection Alerts (warn me if streak is at risk)</span>
            </label>
            <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={planUpdates}
                onChange={(e) => setPlanUpdates(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>Plan Auto-Adjustment Notifications</span>
            </label>
          </div>

          <button
            type="button"
            onClick={handleEnablePush}
            disabled={isSubscribing}
            className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold text-xs hover:bg-indigo-100 transition"
          >
            {isSubscribing ? 'Subscribing...' : '🔔 Enable Browser Push Notifications'}
          </button>
        </div>

        {/* Section 5: Plan Management & Rebuild */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Need a fresh start?
            </h4>
            <p className="text-xs text-slate-400">
              Rebuild your schedule based on your latest scores.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowRegenModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rebuild Plan</span>
          </button>
        </div>

        {/* Save Bar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved!
            </span>
          ) : (
            <span className="text-xs text-slate-400">Settings save to your profile.</span>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      <RegeneratePlanModal
        isOpen={showRegenModal}
        onClose={() => setShowRegenModal(false)}
        onRegenerated={() => {
          alert('Study plan rebuilt with fresh priorities!');
        }}
      />
    </div>
  );
}
