import React from 'react';

interface SkeletonCardProps {
  className?: string;
  variant?: 'metric' | 'chart' | 'table-row' | 'card';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
  variant = 'card',
}) => {
  if (variant === 'metric') {
    return (
      <div className={`rounded-3xl p-5 bg-slate-100 animate-pulse min-h-[160px] flex flex-col justify-between ${className}`}>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="w-16 h-3 bg-slate-200 rounded" />
            <div className="w-28 h-7 bg-slate-300 rounded" />
          </div>
          <div className="w-14 h-5 bg-slate-200 rounded-full" />
        </div>
        <div className="w-36 h-3 bg-slate-200 rounded" />
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={`rounded-3xl p-6 bg-white border border-slate-100 shadow-sm animate-pulse min-h-[300px] flex flex-col justify-between ${className}`}>
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="space-y-2">
            <div className="w-40 h-4 bg-slate-200 rounded" />
            <div className="w-64 h-3 bg-slate-100 rounded" />
          </div>
          <div className="w-24 h-8 bg-slate-100 rounded-xl" />
        </div>
        <div className="h-48 w-full bg-slate-50 rounded-xl my-4 flex items-end gap-3 p-4">
          <div className="w-1/6 h-1/3 bg-slate-200 rounded-t" />
          <div className="w-1/6 h-1/2 bg-slate-200 rounded-t" />
          <div className="w-1/6 h-2/3 bg-slate-200 rounded-t" />
          <div className="w-1/6 h-1/4 bg-slate-200 rounded-t" />
          <div className="w-1/6 h-3/4 bg-slate-200 rounded-t" />
          <div className="w-1/6 h-4/5 bg-slate-200 rounded-t" />
        </div>
        <div className="w-48 h-3 bg-slate-100 rounded" />
      </div>
    );
  }

  if (variant === 'table-row') {
    return (
      <div className={`flex items-center justify-between p-4 bg-slate-50 rounded-xl animate-pulse ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-200" />
          <div className="space-y-1.5">
            <div className="w-32 h-3.5 bg-slate-200 rounded" />
            <div className="w-20 h-2.5 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="w-24 h-4 bg-slate-200 rounded" />
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-6 bg-white border border-slate-100 shadow-sm animate-pulse space-y-4 ${className}`}>
      <div className="w-1/3 h-5 bg-slate-200 rounded" />
      <div className="w-full h-24 bg-slate-100 rounded-xl" />
      <div className="w-2/3 h-4 bg-slate-100 rounded" />
    </div>
  );
};

export default SkeletonCard;
