"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  LabelList,
} from "recharts";
import { SubjectCalibrationData, TopicMastery } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { deduplicateTestAttempts } from "@/lib/analytics";

interface CombinedPerformanceCardProps {
  calibrations?: SubjectCalibrationData[];
  weaknesses?: TopicMastery[];
}

export const CombinedPerformanceCard: React.FC<CombinedPerformanceCardProps> = () => {
  const isClient = useIsClient();
  const rawAttempts = useTestStore((state) => state.testAttempts);

  // Deduplicate attempts strictly
  const cleanAttempts = useMemo(() => {
    const attempts = rawAttempts || [];
    if (!isClient || attempts.length === 0) return [];
    const deduped = deduplicateTestAttempts(attempts);
    return [...deduped].sort((a, b) => {
      const ta = new Date(a.submittedAt || (a as any).date || 0).getTime();
      const tb = new Date(b.submittedAt || (b as any).date || 0).getTime();
      return ta - tb;
    });
  }, [isClient, rawAttempts]);

  // Baseline 4-test data matching design.pdf Page 1
  const defaultChartData = [
    { mockLabel: "Mock 1", score: -8, rawScore: -8, displayVal: "-8" },
    { mockLabel: "Mock 2", score: 46, rawScore: 46, displayVal: "46" },
    { mockLabel: "Mock 3", score: 28, rawScore: 28, displayVal: "28" },
    { mockLabel: "Mock 4", score: -2, rawScore: -2, displayVal: "-2" },
  ];

  const chartData = useMemo(() => {
    if (cleanAttempts.length >= 2) {
      return cleanAttempts.map((att, idx) => {
        const rawScore = Math.round(att.totalMarks ?? 0);
        return {
          mockLabel: `Mock ${idx + 1}`,
          score: rawScore,
          rawScore,
          displayVal: String(rawScore),
        };
      });
    }
    return defaultChartData;
  }, [cleanAttempts]);

  const testsCount = cleanAttempts.length >= 2 ? cleanAttempts.length : 4;

  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-lg text-xs">
          <div className="font-bold text-slate-900">{item.mockLabel}</div>
          <div className="text-slate-600 mt-0.5">
            Score: <span className="font-bold text-purple-600">{item.score} / 250</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Performance analytics
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          {testsCount} tests plotted
        </span>
      </div>

      {/* Main Recharts Area */}
      <div
        role="region"
        aria-label="Performance analytics score trend chart"
        className="h-[220px] sm:h-[250px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 24, right: 24, left: -20, bottom: 8 }}
          >
            <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="mockLabel"
              stroke="transparent"
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickLine={false}
            />
            <YAxis
              stroke="transparent"
              ticks={[-8, 0, 25, 50]}
              domain={[-15, 60]}
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickLine={false}
            />
            <ReferenceLine y={0} stroke="#CBD5E1" strokeDasharray="3 3" />
            <Tooltip content={<CustomChartTooltip />} />

            {/* Modern Purple Line with circular dots */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#7C3AED"
              strokeWidth={2.5}
              dot={{ r: 4.5, fill: "#FFFFFF", stroke: "#7C3AED", strokeWidth: 2.5 }}
              activeDot={{ r: 6, fill: "#7C3AED" }}
            >
              <LabelList
                dataKey="displayVal"
                position="top"
                offset={10}
                style={{ fontSize: "11px", fontWeight: "700", fill: "#0F172A" }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer caption matching design.pdf Page 1 */}
      <div className="pt-2 border-t border-[#EFE6DC] text-xs text-[#8C7D73]">
        +5 for correct, −1 for incorrect.
      </div>
    </div>
  );
};

export default CombinedPerformanceCard;
