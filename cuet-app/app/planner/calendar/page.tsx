'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import CalendarView from '@/components/planner/CalendarView';

export const dynamic = 'force-dynamic';

export default function PlannerCalendarPage() {
  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  const [examDate, setExamDate] = useState('May 15, 2026');
  const [isLoading, setIsLoading] = useState(true);

  const fetchCalendar = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/planner/calendar');
      const json = await res.json();
      if (json.success) {
        setCalendarDays(json.days || []);
        if (json.exam_date) setExamDate(json.exam_date);
      }
    } catch (err) {
      console.error('Failed to fetch calendar:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/planner"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Today&apos;s Plan</span>
          </Link>

          <button
            onClick={fetchCalendar}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            title="Refresh calendar"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Full Schedule Calendar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your day-by-day roadmap leading up to exam day ({examDate}).
          </p>
        </div>

        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center text-xs text-slate-400">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading schedule...
          </div>
        ) : (
          <CalendarView days={calendarDays} examDate={examDate} />
        )}
      </div>
    </main>
  );
}
