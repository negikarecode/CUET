"use client";

import React, { useState } from "react";
import {
  X,
  TrendingUp,
  Award,
  Share2,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
} from "lucide-react";
import { WeeklyReportData } from "@/lib/weekly-report-engine";

interface WeeklyReportModalProps {
  report: WeeklyReportData;
  onClose: () => void;
}

export function WeeklyReportModal({ report, onClose }: WeeklyReportModalProps) {
  const [copied, setCopied] = useState(false);
  const m = report.deterministicMetrics;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto print:max-w-full print:shadow-none print:border-none">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Weekly Performance Report
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                  {report.weekLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium font-mono">
                Student: {report.studentName} · Generated: {report.generatedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-200/60 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-200/60 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">PDF / Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Weekly Accuracy</span>
              <p className="text-2xl font-extrabold text-slate-900 font-mono">{m.currentAccuracy}%</p>
              <p className="text-[10px] font-semibold text-slate-500">
                {m.accuracyDelta >= 0 ? `+${m.accuracyDelta}% WoW` : `${m.accuracyDelta}% WoW`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Questions Solved</span>
              <p className="text-2xl font-extrabold text-slate-900 font-mono">{m.questionsPracticed}</p>
              <p className="text-[10px] font-semibold text-slate-500">across {m.completedMocks} mock{m.completedMocks === 1 ? "" : "s"}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Streak</span>
              <p className="text-2xl font-extrabold text-slate-900 font-mono">{m.streakDays}d</p>
              <p className="text-[10px] font-semibold text-slate-500">Consistent effort</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Study Minutes</span>
              <p className="text-2xl font-extrabold text-slate-900 font-mono">~{m.studyMinutes}m</p>
              <p className="text-[10px] font-semibold text-slate-500">Practice time logged</p>
            </div>
          </div>

          {/* Before-and-After Progress Trend Line */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Accuracy Evolution Over Time (4-Week Trend)</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-300">
                Week 1 ({m.weeklyTrend[0]?.accuracy ?? 0}%) → {m.weeklyTrend[3]?.weekLabel ?? "Week 4"} ({m.weeklyTrend[3]?.accuracy ?? 0}%)
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {m.weeklyTrend.map((wt, idx) => (
                <div key={idx} className="space-y-1.5 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{wt.weekLabel}</span>
                  <div className="h-16 bg-slate-800 rounded-xl flex items-end p-1 overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-lg transition-all"
                      style={{ height: `${Math.max(10, wt.accuracy)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-white block">{wt.accuracy}%</span>
                  <span className="text-[9px] text-slate-500 font-mono block">{wt.questions} Qs</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Narrative & Parent Takeaway */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Student Performance Summary</span>
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                {report.narrativeSummary}
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Parent / Mentor Takeaway</span>
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                {report.parentTakeaway}
              </p>
            </div>
          </div>

          {/* Weakest vs Improved Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>High-Priority Weak Areas</span>
              </span>
              {m.weakestTopics.length === 0 ? (
                <p className="text-slate-500 italic">No critical weak clusters diagnosed.</p>
              ) : (
                <div className="space-y-1.5">
                  {m.weakestTopics.map((w, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{w.name}</span>
                      <span className="font-mono font-bold text-rose-600">{w.accuracy}% Acc</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Demonstrated Improvements</span>
              </span>
              {m.improvedTopics.length === 0 ? (
                <p className="text-slate-500 italic">Maintain practice to track score gains.</p>
              ) : (
                <div className="space-y-1.5">
                  {m.improvedTopics.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-emerald-100 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="font-mono font-bold text-emerald-700">+{item.delta}% pts</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Next Week's Action Plan */}
          <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Recommended Next Week Action Plan</span>
            </span>
            <ul className="space-y-1.5">
              {report.nextWeekActionPlan.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700 font-medium">
                  <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-mono text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs transition-all"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
