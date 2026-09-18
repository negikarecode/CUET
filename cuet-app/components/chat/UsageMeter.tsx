'use client';
import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface UsageMeterProps {
  currentCount: number;
  dailyLimit: number;
  planType: string;
  onUpgradeClick: () => void;
}

export default function UsageMeter({
  currentCount,
  dailyLimit,
  planType,
  onUpgradeClick,
}: UsageMeterProps) {
  const remaining = Math.max(0, dailyLimit - currentCount);
  const percentage = Math.min(100, Math.round((currentCount / dailyLimit) * 100));
  const isLow = remaining <= 5;
  const isExhausted = remaining === 0;

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs shadow-sm">
      <div className="flex flex-col gap-0.5 min-w-[110px]">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {remaining} / {dailyLimit} doubts left
          </span>
          <span className="capitalize px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold text-[10px]">
            {planType}
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isExhausted
                ? 'bg-rose-500'
                : isLow
                ? 'bg-amber-500'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        onClick={onUpgradeClick}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium text-[11px] shadow-sm transition active:scale-95"
      >
        <Zap className="w-3 h-3 fill-current" />
        <span>Upgrade</span>
      </button>
    </div>
  );
}
