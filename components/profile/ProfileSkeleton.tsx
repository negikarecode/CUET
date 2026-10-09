import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-8 w-64 bg-slate-200 rounded-xl" />

      {/* Card 1: Hero & Academic Identity */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-slate-200 rounded-lg" />
              <div className="h-4 w-36 bg-slate-100 rounded-md" />
              <div className="h-5 w-24 bg-slate-100 rounded-full" />
            </div>
          </div>
          <div className="h-10 w-32 bg-slate-100 rounded-xl" />
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="h-4 w-40 bg-slate-200 rounded-md" />
          <div className="h-6 w-72 bg-slate-200 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="h-18 bg-indigo-50/50 rounded-2xl border border-indigo-100/50" />
          <div className="h-18 bg-amber-50/50 rounded-2xl border border-amber-100/50" />
          <div className="h-18 bg-emerald-50/50 rounded-2xl border border-emerald-100/50" />
        </div>
      </div>

      {/* Grid: Card 2 & Card 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 2: AI Diagnostic & Exam Readiness */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="h-6 w-56 bg-slate-200 rounded-lg" />
          <div className="h-20 bg-slate-50 rounded-2xl border border-slate-100" />
          <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100" />
          <div className="h-28 bg-slate-50 rounded-2xl border border-slate-100" />
        </div>

        {/* Card 4: Subscription & Study Alerts */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="h-6 w-52 bg-slate-200 rounded-lg" />
          <div className="h-28 bg-slate-50 rounded-2xl border border-slate-100" />
          <div className="h-24 bg-slate-50 rounded-2xl border border-slate-100" />
        </div>
      </div>

      {/* Sign Out Card Skeleton */}
      <div className="h-20 bg-white rounded-3xl border border-slate-100 shadow-sm" />
    </div>
  );
}
