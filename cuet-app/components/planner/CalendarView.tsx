'use client';
import React, { useState } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';

interface CalendarDayData {
  id: number;
  date: string;
  day_number: number;
  day_type: string;
  total_tasks: number;
  completed_tasks: number;
  completion_percentage: number;
  is_day_complete: boolean;
  total_minutes: number;
  completed_minutes: number;
  tasks: Array<{
    id: number;
    title: string;
    status: string;
    priority: string;
    planned_minutes: number;
    task_type: string;
  }>;
}

interface CalendarViewProps {
  days: CalendarDayData[];
  examDate?: string;
}

export default function CalendarView({ days = [], examDate = 'May 15, 2026' }: CalendarViewProps) {
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    days[0]?.date || format(new Date(), 'yyyy-MM-dd')
  );

  const selectedDay = days.find((d) => d.date === selectedDateStr) || days[0];

  const getDayColor = (day: CalendarDayData) => {
    if (day.day_type === 'exam_day') return 'bg-amber-500 text-white font-bold ring-2 ring-amber-400';
    if (day.day_type === 'mock_test') return 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300';
    if (day.day_type === 'revision') return 'bg-purple-50 dark:bg-purple-950/50 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300';
    if (day.completion_percentage === 100) return 'bg-emerald-500 text-white font-bold';
    if (day.completion_percentage >= 50) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
    if (day.completion_percentage > 0) return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
    if (day.day_type === 'light' || day.day_type === 'rest') return 'bg-slate-100 dark:bg-slate-800 text-slate-500';
    return 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex items-center gap-3 overflow-x-auto text-[11px] text-slate-600 dark:text-slate-400 pb-1">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded bg-emerald-500"></span>
          <span>100% Done</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded bg-emerald-200 dark:bg-emerald-950"></span>
          <span>50-99% Done</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded bg-blue-100 dark:bg-blue-900"></span>
          <span>Mock Test Day</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded bg-purple-100 dark:bg-purple-900"></span>
          <span>Revision Day</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded bg-amber-500"></span>
          <span>Exam Day 🎓</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span key={d} className="text-xs font-bold uppercase tracking-wider text-slate-400 py-1">
              {d}
            </span>
          ))}

          {days.map((day) => {
            const dateObj = parseISO(day.date);
            const isSelected = day.date === selectedDateStr;
            const colorClass = getDayColor(day);

            return (
              <button
                key={day.date}
                onClick={() => setSelectedDateStr(day.date)}
                className={`min-h-[58px] sm:min-h-[70px] p-2 rounded-2xl flex flex-col items-center justify-between text-left transition-all relative ${colorClass} ${
                  isSelected ? 'ring-2 ring-indigo-600 scale-[1.03] shadow-md' : 'hover:scale-[1.01]'
                }`}
              >
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="font-bold">{format(dateObj, 'd')}</span>
                  {day.day_type === 'exam_day' ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : day.day_type === 'mock_test' ? (
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                  ) : null}
                </div>

                <div className="w-full text-right mt-1">
                  <span className="text-[10px] font-semibold opacity-90 block">
                    {day.completion_percentage > 0 ? `${day.completion_percentage}%` : `${day.total_tasks} tasks`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details Card */}
      {selectedDay && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {format(parseISO(selectedDay.date), 'EEEE, MMMM d, yyyy')}
                </h3>
              </div>
              <span className="text-xs text-slate-500 capitalize">
                Day {selectedDay.day_number} • Type: {selectedDay.day_type.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {selectedDay.completed_tasks} of {selectedDay.total_tasks} completed ({selectedDay.completion_percentage}%)
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {selectedDay.tasks?.map((t, idx) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{t.title}</h4>
                    <span className="text-slate-400 text-[11px]">{t.planned_minutes} min • Priority: {t.priority}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      t.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
