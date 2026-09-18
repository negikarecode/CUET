"use client";

import React from "react";
import { useWeakness } from "@/hooks/useWeakness";
import { WeaknessDashboard } from "@/components/weakness/WeaknessDashboard";

export default function WeaknessPage() {
  const { data, isLoading, error, refetch } = useWeakness();

  return (
    <div className="w-full min-h-screen py-6 sm:py-8">
      <WeaknessDashboard
        data={data}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
      />
    </div>
  );
}
