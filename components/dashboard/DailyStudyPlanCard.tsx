"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Play,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { generateDailyStudyPlan, DailyStudyPlan } from "@/lib/daily-study-planner";

interface DailyStudyPlanCardProps {
  topWeakTopics: Array<{ chapter: string; subject: string; accuracy: number }>;
  spacedDueCount: number;
  calibrationProgressPct: number;
  onLaunchDrill?: (topic: string, subject: string) => void;
  onOpenSpacedRepetition?: () => void;
}

export function DailyStudyPlanCard({
  topWeakTopics,
  spacedDueCount,
  calibrationProgressPct,
  onLaunchDrill,
  onOpenSpacedRepetition,
}: DailyStudyPlanCardProps) {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(40);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [plan, setPlan] = useState<DailyStudyPlan>(() =>
    generateDailyStudyPlan({
      availableMinutes: 40,
      topWeakTopics,
      spacedDueCount,
      calibrationProgressPct,
    })
  );

  useEffect(() => {
    setPlan(
      generateDailyStudyPlan({
        availableMinutes: selectedMinutes,
        topWeakTopics,
        spacedDueCount,
        calibrationProgressPct,
      })
    );
  }, [selectedMinutes, topWeakTopics, spacedDueCount, calibrationProgressPct]);

  const toggleTask = (id: string) => {
    setCompletedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const completedMinutes = plan.tasks
    .filter((t) => completedTaskIds.has(t.id))
    .reduce((s, t) => s + t.durationMinutes, 0);

  const progressPct = Math.min(100, Math.round((completedMinutes / plan.totalMinutes) * 100));

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 shadow-sm space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Today&apos;s Targeted Study Plan</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                {plan.totalMinutes} MINS
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Personalized from your diagnosed weak areas &amp; review schedule
            </p>
          </div>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200/80 shrink-0 self-start sm:self-auto">
          {[20, 40, 60].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setSelectedMinutes(mins)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                selectedMinutes === mins
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 font-mono">
          <span>Today&apos;s Progress</span>
          <span>{completedMinutes} / {plan.totalMinutes} mins completed ({progressPct}%)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {plan.tasks.map((task) => {
          const isDone = completedTaskIds.has(task.id);

          return (
            <div
              key={task.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDone
                  ? "bg-slate-50/60 border-slate-200/60 opacity-75"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                    isDone
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 hover:border-slate-400 bg-white"
                  }`}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                >
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {task.durationMinutes} MIN
                    </span>
                    <span className="text-xs font-bold text-slate-900 tracking-tight">
                      {task.title}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">
                      · {task.topic}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 pl-8 sm:pl-0">
                {task.taskType === "repair_drill" && onLaunchDrill ? (
                  <button
                    type="button"
                    onClick={() => onLaunchDrill(task.topic, task.subject)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Start Drill</span>
                  </button>
                ) : task.taskType === "spaced_review" && onOpenSpacedRepetition ? (
                  <button
                    type="button"
                    onClick={onOpenSpacedRepetition}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Review Due ({spacedDueCount})</span>
                  </button>
                ) : (
                  <Link
                    href={task.actionUrl}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                  >
                    <span>{task.actionLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
