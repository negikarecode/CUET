'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PlanSettings from '@/components/planner/PlanSettings';

export const dynamic = 'force-dynamic';

export default function PlannerSettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto mb-4">
        <Link
          href="/planner"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Today&apos;s Plan</span>
        </Link>
      </div>
      <PlanSettings />
    </main>
  );
}
