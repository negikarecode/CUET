'use client';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

interface DailyProgressProps {
  completion: {
    percentage: number;
    completed_tasks: number;
    total_tasks: number;
    completed_minutes: number;
    total_minutes: number;
    is_day_complete: boolean;
  };
}

export default function DailyProgress({ completion }: DailyProgressProps) {
  const {
    percentage,
    completed_tasks,
    total_tasks,
    completed_minutes,
    total_minutes,
    is_day_complete,
  } = completion;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Stats and linear progress */}
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ListTodo className="w-4 h-4 text-indigo-500" />
              Today&apos;s Study Target
            </h3>
            {is_day_complete && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                Day Complete! 
              </span>
            )}
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {completed_tasks} / {total_tasks}
              </span>
              <span className="text-xs font-semibold text-slate-500">tasks completed</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {completed_minutes} of {total_minutes} minutes done
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                is_day_complete
                  ? 'bg-emerald-500'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Right Side: Circular Progress */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: '24px',
              pathColor: is_day_complete ? '#10b981' : '#6366f1',
              textColor: is_day_complete ? '#10b981' : '#4f46e5',
              trailColor: '#f1f5f9',
            })}
          />
        </div>
      </div>
    </div>
  );
}
