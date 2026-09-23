"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { WeaknessLevel } from "@/lib/types";

interface OverallHealthScoreProps {
  score: number; // 0-100
  level: WeaknessLevel;
  criticalCount: number;
  weakCount: number;
  averageCount: number;
  strongCount: number;
  untestedCount?: number;
}

export function OverallHealthScore({
  score,
  criticalCount,
  weakCount,
  averageCount,
  strongCount,
}: OverallHealthScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, score));
    if (start === end) {
      setAnimatedScore(end);
      return;
    }

    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Determine score color
  const getScoreColor = (val: number) => {
    if (val < 40) return { stroke: "#dc2626", bg: "text-red-600", border: "border-red-200", badge: "bg-red-50 text-red-700" };
    if (val < 55) return { stroke: "#ea580c", bg: "text-orange-500", border: "border-orange-200", badge: "bg-orange-50 text-orange-700" };
    if (val < 70) return { stroke: "#ca8a04", bg: "text-yellow-600", border: "border-yellow-200", badge: "bg-yellow-50 text-yellow-700" };
    return { stroke: "#16a34a", bg: "text-green-600", border: "border-green-200", badge: "bg-green-50 text-green-700" };
  };

  const colors = getScoreColor(score);

  const chartData = [
    {
      name: "HealthScore",
      value: animatedScore,
      fill: colors.stroke,
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm w-full">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            barSize={14}
            data={chartData}
            startAngle={225}
            endAngle={-45}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: "#f1f5f9" }}
              dataKey="value"
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline"
          >
            <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${colors.bg}`}>
              {animatedScore}
            </span>
            <span className="text-sm sm:text-base font-semibold text-slate-400 ml-1">/100</span>
          </motion.div>
          <span className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Exam Readiness
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Overall Health Score: <span className={colors.bg}>{score}/100</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Based on speed, accuracy & consistency in your selected subjects
        </p>

        {/* Sub-stats pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            {criticalCount} Critical
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            {weakCount} Weak
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
            {averageCount} Average
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            {strongCount} Strong
          </span>
        </div>
      </div>
    </div>
  );
}
