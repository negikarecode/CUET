import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-8 w-64 bg-black/10 rounded-lg border-2 border-black/20" />

      {/* Card 1: Hero & Academic Identity */}
      <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-black/10 border-2 border-black/20" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-black/10 rounded" />
              <div className="h-4 w-36 bg-black/10 rounded" />
              <div className="h-5 w-24 bg-black/10 rounded-full" />
            </div>
          </div>
          <div className="h-10 w-32 bg-black/10 rounded-lg border-2 border-black/20" />
        </div>

        <div className="p-4 bg-[#FAF7EE] rounded-xl border-2 border-black/20 space-y-2">
          <div className="h-4 w-40 bg-black/10 rounded" />
          <div className="h-6 w-72 bg-black/10 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="h-16 bg-[#FEF3C7]/60 rounded-xl border-2 border-black/20" />
          <div className="h-16 bg-[#FEE2E2]/60 rounded-xl border-2 border-black/20" />
          <div className="h-16 bg-[#EEF2FF]/60 rounded-xl border-2 border-black/20" />
        </div>
      </div>

      {/* Grid: Card 2 & Card 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 2: AI Diagnostic & Exam Readiness */}
        <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 space-y-5">
          <div className="h-6 w-56 bg-black/10 rounded" />
          <div className="h-20 bg-[#FAF7EE] rounded-xl border-2 border-black/20" />
          <div className="h-24 bg-[#FAF7EE] rounded-xl border-2 border-black/20" />
          <div className="h-28 bg-[#FAF7EE] rounded-xl border-2 border-black/20" />
        </div>

        {/* Card 4: Subscription & Study Alerts */}
        <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 space-y-5">
          <div className="h-6 w-52 bg-black/10 rounded" />
          <div className="h-28 bg-[#FAF7EE] rounded-xl border-2 border-black/20" />
          <div className="h-24 bg-[#FAF7EE] rounded-xl border-2 border-black/20" />
        </div>
      </div>

      {/* Card 3: Gamification & Trophy Shelf */}
      <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-black/10 rounded" />
          <div className="h-6 w-24 bg-black/10 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-xl bg-[#FAF7EE] border-2 border-black/20 shadow-[2px_2px_0px_0px_#000]"
            />
          ))}
        </div>
      </div>

      {/* Sign Out Card Skeleton */}
      <div className="h-16 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000]" />
    </div>
  );
}
