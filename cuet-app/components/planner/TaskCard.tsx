'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RotateCcw,
  Sparkles,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { TaskStatus, TaskPriority } from '@/lib/types';

interface TaskCardProps {
  task: {
    id: number;
    task_order: number;
    task_type: string;
    status: TaskStatus;
    title: string;
    description: string;
    planned_minutes: number;
    actual_minutes?: number;
    priority: TaskPriority;
    target_questions?: number | null;
    actual_questions?: number;
    target_accuracy?: number | null;
    link_url: string;
    link_label: string;
    topic_id?: number | null;
    completed_at?: string | null;
  };
  onComplete: (taskId: number, minutes: number) => void;
  onReschedule?: (taskId: number) => void;
  disabled?: boolean;
}

export default function TaskCard({
  task,
  onComplete,
  onReschedule,
  disabled = false,
}: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCompleted = task.status === 'completed';
  const isPending = task.status === 'pending';

  const priorityStyles: Record<TaskPriority, { border: string; badge: string; text: string }> = {
    critical: {
      border: 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10',
      badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
      text: 'CRITICAL',
    },
    high: {
      border: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
      text: 'HIGH',
    },
    medium: {
      border: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900',
      badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
      text: 'MEDIUM',
    },
    low: {
      border: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900',
      badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
      text: 'LOW',
    },
  };

  const style = priorityStyles[task.priority] || priorityStyles.medium;

  const handleMarkDone = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onComplete(task.id, task.planned_minutes);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build target practice link with planner metadata for auto-return
  let targetLink = task.link_url;
  if (task.task_type === 'ai_practice' && task.topic_id) {
    targetLink = `/practice/ai/${task.topic_id}?from_planner=true&task_id=${task.id}&planned_minutes=${task.planned_minutes}`;
  } else if (task.task_type === 'doubt_solving') {
    targetLink = `/chat?topic=${task.topic_id || 4}`;
  }

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 shadow-sm overflow-hidden ${
        isCompleted
          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
          : style.border
      }`}
    >
      <div className="p-4 sm:p-5 space-y-3">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 flex-1">
            <div className="mt-0.5">
              {isCompleted ? (
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold">
                  {task.task_order}
                </span>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4
                  className={`text-sm sm:text-base font-bold leading-snug ${
                    isCompleted
                      ? 'text-emerald-900 dark:text-emerald-200 line-through opacity-80'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h4>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${style.badge}`}
                >
                  {style.text}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {task.planned_minutes} min
                </span>
                {task.target_questions ? (
                  <span>• {task.target_questions} questions target</span>
                ) : null}
                {task.target_accuracy ? (
                  <span>• {task.target_accuracy}% accuracy aim</span>
                ) : null}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Collapsible Guidance & Instructions */}
        {isExpanded && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2 animate-fadeIn">
            <p className="leading-relaxed bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
              {task.description}
            </p>
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {isCompleted ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                Completed in {task.actual_minutes || task.planned_minutes} min
                {task.completed_at ? ` at ${new Date(task.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {targetLink && (
                <Link
                  href={targetLink}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition active:scale-95"
                >
                  {task.task_type === 'ai_practice' ? (
                    <Sparkles className="w-3.5 h-3.5" />
                  ) : task.task_type === 'doubt_solving' ? (
                    <MessageSquare className="w-3.5 h-3.5" />
                  ) : (
                    <BookOpen className="w-3.5 h-3.5" />
                  )}
                  <span>{task.link_label || 'Start Task'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <button
                onClick={handleMarkDone}
                disabled={disabled || isSubmitting}
                className="px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-semibold text-xs transition active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Mark Done '}
              </button>
            </div>
          )}

          {!isCompleted && onReschedule && (
            <button
              onClick={() => onReschedule(task.id)}
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium flex items-center gap-1 transition"
              title="Reschedule to tomorrow"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reschedule</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
