'use client';
import React from 'react';
import { QuickReplyOption } from '@/lib/quick-replies';

interface QuickRepliesProps {
  options: QuickReplyOption[];
  onSelect: (query: string) => void;
  disabled?: boolean;
}

export default function QuickReplies({ options, onSelect, disabled = false }: QuickRepliesProps) {
  if (!options || options.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-none">
      {options.map((option) => (
        <button
          key={option.id}
          disabled={disabled}
          onClick={() => onSelect(option.query)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium whitespace-nowrap transition-all shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {option.icon && <span>{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
