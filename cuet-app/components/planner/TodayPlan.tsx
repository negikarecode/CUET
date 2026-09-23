'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Settings,
  Plus,
  ArrowRight,
  ListTodo,
} from 'lucide-react';
import CountdownBanner from './CountdownBanner';
import StreakCounter from './StreakCounter';
import DailyProgress from './DailyProgress';
import TaskCard from './TaskCard';
import WeekView from './WeekView';
import TaskCompleteAnimation from './TaskCompleteAnimation';
import ExamDayCard from './ExamDayCard';

interface TodayPlanData {
  plan_date: string;
  day_number: number;
  days_to_exam: number;
  day_type: string;
  daily_tip: string;
  daily_quote: string;
  daily_motivation: string;
  streak: any;
  completion: any;
  tasks: any[];
}

export default function TodayPlan() {
  const [data, setData] = useState<TodayPlanData | null>(null);
  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasPlan, setHasPlan] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchTodayData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/planner/today');
      const json = await res.json();
      if (json.success) {
        setData(json);
        setHasPlan(true);
      } else if (json.has_plan === false) {
        setHasPlan(false);
      }

      // Fetch calendar days for WeekView
      const calRes = await fetch('/api/planner/calendar');
      const calJson = await calRes.json();
      if (calJson.success) {
        setCalendarDays(calJson.days || []);
      }
    } catch (err) {
      console.error('Failed to fetch today plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

  const handleCompleteTask = async (taskId: number, minutes: number) => {
    try {
      const res = await fetch('/api/planner/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId, actual_minutes: minutes }),
      });
      const json = await res.json();
      if (json.success) {
        // Refresh local data
        setData((prev) => {
          if (!prev) return prev;
          const updatedTasks = prev.tasks.map((t) =>
            t.id === taskId ? { ...t, status: 'completed', actual_minutes: minutes } : t
          );
          const completedCount = updatedTasks.filter((t) => t.status === 'completed').length;
          const newPercentage = Math.round((completedCount / updatedTasks.length) * 100);
          const isDone = completedCount === updatedTasks.length;

          if (isDone) {
            setShowCelebration(true);
          }

          return {
            ...prev,
            tasks: updatedTasks,
            completion: {
              ...prev.completion,
              completed_tasks: completedCount,
              percentage: newPercentage,
              is_day_complete: isDone,
            },
            streak: {
              ...prev.streak,
              current: json.data.current_streak,
            },
          };
        });
      }
    } catch (err) {
      console.error('Task complete error:', err);
    }
  };

  const handleRescheduleTask = async (taskId: number) => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    try {
      const res = await fetch('/api/planner/reschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId, new_date: tomorrow, reason: 'Student moved to tomorrow' }),
      });
      const json = await res.json();
      if (json.success) {
        // Remove from today's list
        setData((prev) => {
          if (!prev) return prev;
          const remainingTasks = prev.tasks.filter((t) => t.id !== taskId);
          return {
            ...prev,
            tasks: remainingTasks,
          };
        });
      }
    } catch (err) {
      console.error('Reschedule error:', err);
    }
  };

  const handleGenerateFirstPlan = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/planner/generate', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        await fetchTodayData();
      }
    } catch (err) {
      console.error('Generate plan error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-xs font-semibold">Loading your study plan...</span>
        </div>
      </div>
    );
  }

  // First-time empty state CTA
  if (!hasPlan || !data) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
          <CalendarIcon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            You Don&apos;t Have a Study Plan Yet!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Let our AI build a personalized day-by-day CUET preparation plan based on your verified weakness scores, target college, and exam countdown.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Prioritizes weak topics automatically (Module 1)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Directly links to AI practice sessions (Module 2)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Includes 24/7 CUETBot doubt solving slots (Module 3)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Weekly mock tests & last 7 days pure revision</span>
          </div>
        </div>

        <button
          onClick={handleGenerateFirstPlan}
          disabled={isGenerating}
          className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? 'Building Your Plan (~10s)...' : 'Generate My Study Plan →'}
        </button>
      </div>
    );
  }

  const isExamDay = data.day_type === 'exam_day';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation & Settings Bar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Day {data.day_number} • {data.days_to_exam} Days to Exam
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Today&apos;s Plan
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/planner/calendar"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs transition"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Calendar</span>
          </Link>

          <Link
            href="/planner/settings"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-xs transition"
            title="Plan settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Countdown Banner */}
      <CountdownBanner daysToExam={data.days_to_exam} />

      {/* Streak Tracker */}
      {data.streak && <StreakCounter streak={data.streak} />}

      {/* AI Daily Motivation Card */}
      {data.daily_motivation && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3 text-xs leading-relaxed text-indigo-950 dark:text-indigo-200 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5 text-indigo-700 dark:text-indigo-300">
              CUETBot Coach Note:
            </span>
            <p>{data.daily_motivation}</p>
          </div>
        </div>
      )}

      {/* Today's Progress */}
      {data.completion && !isExamDay && (
        <DailyProgress completion={data.completion} />
      )}

      {/* Main Task List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ListTodo className="w-4 h-4 text-indigo-500" />
            Scheduled Tasks ({data.tasks?.length || 0})
          </h3>
          <span className="text-[11px] text-slate-400">
            {data.completion?.completed_tasks || 0} of {data.tasks?.length || 0} finished
          </span>
        </div>

        {isExamDay ? (
          <ExamDayCard />
        ) : data.tasks && data.tasks.length > 0 ? (
          data.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onReschedule={handleRescheduleTask}
            />
          ))
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
            No study tasks scheduled for today. Take rest or do quick revision!
          </div>
        )}
      </div>

      {/* Daily Tip */}
      {data.daily_tip && (
        <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <span><strong>Today&apos;s Tip:</strong> {data.daily_tip}</span>
        </div>
      )}

      {/* Week Overview */}
      {calendarDays.length > 0 && (
        <WeekView days={calendarDays} currentDateStr={data.plan_date} />
      )}

      {/* Task Complete Animation Modal */}
      <TaskCompleteAnimation
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        streakCount={data.streak?.current || 7}
      />
    </div>
  );
}
