"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CalendarCheck, Clock, ArrowRight, Sparkles, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionPlanItem {
  priority: number;
  action: string;
  time_minutes: number;
  topic_or_subject?: string;
  why: string;
  link_label: string;
  link_url: string;
}

interface ActionPlanProps {
  analysisId: string;
  actionPlan: ActionPlanItem[];
}

export function ActionPlan({ analysisId, actionPlan = [] }: ActionPlanProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [appliedCount, setAppliedCount] = useState<number | null>(null);

  const handleApplyToPlan = async () => {
    try {
      setIsApplying(true);
      const res = await fetch("/api/analysis/apply-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis_id: analysisId }),
      });
      const data = await res.json();
      if (data.success) {
        setAppliedSuccess(true);
        setAppliedCount(data.tasks_added || actionPlan.length);
      }
    } catch (err) {
      console.error("Failed to apply plan:", err);
    } finally {
      setIsApplying(false);
    }
  };

  const getPriorityStyle = (priority: number) => {
    switch (priority) {
      case 1:
        return {
          badge: "bg-rose-100 text-rose-800 border-rose-200",
          border: "border-rose-200 hover:border-rose-300",
          numBg: "bg-rose-600 text-white",
        };
      case 2:
        return {
          badge: "bg-amber-100 text-amber-800 border-amber-200",
          border: "border-amber-200 hover:border-amber-300",
          numBg: "bg-amber-500 text-white",
        };
      case 3:
      default:
        return {
          badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
          border: "border-indigo-200 hover:border-indigo-300",
          numBg: "bg-indigo-600 text-white",
        };
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-indigo-600" />
            48-Hour High-Impact Action Plan
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            3 prioritized steps to eliminate your biggest score leaks before your next test
          </p>
        </div>

        {/* Sync with Module 4 Study Planner Button */}
        <div>
          {appliedSuccess ? (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Added {appliedCount} tasks to Study Plan!</span>
            </div>
          ) : (
            <Button
              onClick={handleApplyToPlan}
              disabled={isApplying}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 text-xs shadow-md transition-all"
            >
              {isApplying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Syncing with Planner...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>⚡ Add all to Study Plan</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actionPlan.map((item) => {
          const style = getPriorityStyle(item.priority);

          return (
            <div
              key={item.priority}
              className={`rounded-2xl border p-5 bg-slate-50/50 flex flex-col justify-between space-y-4 transition-all ${style.border}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-black ${style.numBg}`}
                    >
                      {item.priority}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${style.badge}`}
                    >
                      Priority {item.priority}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {item.time_minutes} mins
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.action}
                </h4>

                <div className="rounded-xl bg-white p-3 border border-slate-200/70 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 block mb-0.5">Why this matters:</span>
                  <p className="leading-relaxed font-medium">{item.why}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link href={item.link_url} className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-bold gap-1.5 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                  >
                    <span>{item.link_label || "Start Action"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
