'use client';
import React from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { CheckCircle2, Calendar, Target, Sparkles, Moon } from 'lucide-react';
import { DayType } from '@/lib/types';

interface WeekDay {
  id: number;
  date: string;
  day_number: number;
  day_type: DayType;
  total_tasks: number;
  completed_tasks: number;
  completion_percentage: number;
  is_day_complete: boolean;
}

interface WeekViewProps {
  days: WeekDay[];
  currentDateStr: string;
  onSelectDay?: (dateStr: string) => void;
}

export default function WeekView({
  days = [],
  currentDateStr,
  onSelectDay,
}: WeekViewProps) {
  // Take current week (up to 7 days around current date)
  const currentIdx = days.findIndex((d) => d.date === currentDateStr);
  const startIdx = Math.max(0, currentIdx - 2);
  const weekDays = days.slice(startIdx, startIdx + 7);

  const getDayIcon = (dayType: DayType, percentage: number) => {
    if (percentage === 100) return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    switch (dayType) {
      case 'mock_test':
        return <Target className="w-4 h-4 text-amber-500" />;
      case 'revision':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'light':
      case 'rest':
        return <Moon className="w-4 h-4 text-slate-400" />;
      case 'exam_day':
        return <span className="text-sm"></span>;
      default:
        return <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{percentage}%</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-indigo-500" />
          7-Day Week Overview
        </h3>
        <span className="text-[11px] text-slate-400">Click any day to view</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 overflow-x-auto pb-1">
        {weekDays.map((d) => {
          const dateObj = parseISO(d.date);
          const isToday = d.date === currentDateStr;
          const dayName = format(dateObj, 'EEE');
          const dayDate = format(dateObj, 'd');

          return (
            <button
              key={d.date}
              onClick={() => onSelectDay && onSelectDay(d.date)}
              className={`flex flex-col items-center gap-1 p-2 sm:p-2.5 rounded-xl text-center transition-all ${
                isToday
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                {dayName}
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">
                {dayDate}
              </span>
              <div className="h-5 flex items-center justify-center mt-0.5">
                {getDayIcon(d.day_type, d.completion_percentage)}
              </div>
              <span className="text-[9px] text-slate-400 capitalize truncate max-w-[45px]">
                {d.day_type === 'mock_test' ? 'Mock' : d.day_type}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
