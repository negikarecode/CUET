import React from 'react';
import TodayPlan from '@/components/planner/TodayPlan';

export const dynamic = 'force-dynamic';

export default function PlannerPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 px-4 sm:px-6 md:px-8">
      <TodayPlan />
    </main>
  );
}
