'use client';
import React from 'react';
import { Flame, Award, Zap } from 'lucide-react';
import { StreakData } from '@/lib/types';

interface StreakCounterProps {
  streak: StreakData;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  const MILESTONES = [
    { days: 3, label: '3d', emoji: '' },
    { days: 7, label: '7d', emoji: '' },
    { days: 14, label: '14d', emoji: '' },
    { days: 21, label: '21d', emoji: '' },
    { days: 30, label: '30d', emoji: '' },
    { days: 60, label: '60d', emoji: '' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl select-none" role="img" aria-label="streak emoji">
            {streak.streak_emoji || ''}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {streak.current_streak}-Day Study Streak!
              </h3>
              {streak.streak_status === 'on_fire' && (
                <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider">
                  On Fire
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {streak.streak_message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Best: <strong>{streak.longest_streak} days</strong></span>
          </div>
          <span>•</span>
          <div>
            <span>Total: <strong>{streak.total_study_days} days</strong></span>
          </div>
        </div>
      </div>

      {/* Milestone Progress Track */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
          {MILESTONES.map((m) => {
            const isReached = streak.current_streak >= m.days;
            const isCurrentTarget = streak.next_milestone === m.days;

            return (
              <div
                key={m.days}
                className={`flex flex-col items-center gap-1 min-w-[50px] p-2 rounded-xl text-center transition-all ${
                  isReached
                    ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60'
                    : isCurrentTarget
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 opacity-60'
                }`}
              >
                <span className="text-base">{m.emoji}</span>
                <span className={`text-[10px] font-bold ${isReached ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        {streak.next_milestone && (
          <div className="mt-2 text-right">
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
              {streak.days_to_next_milestone} more {streak.days_to_next_milestone === 1 ? 'day' : 'days'} to reach {streak.next_milestone}-day milestone!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
