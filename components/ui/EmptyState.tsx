import React from 'react';
import Link from 'next/link';
import { LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Sparkles,
  title,
  description,
  actionText,
  actionHref,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`h-full min-h-[220px] w-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-blue-600 shadow-2xs">
        <Icon className="w-6 h-6 stroke-[1.8]" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h4 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>
      {(actionText && (actionHref || onAction)) && (
        <div className="pt-1">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs"
            >
              <span>{actionText}</span>
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs"
            >
              <span>{actionText}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
