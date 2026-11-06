"use client";

import React, { useMemo } from "react";
import Link from "next/link";
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
import { TrendingUp, ArrowRight } from "lucide-react";
import { SubjectCalibrationData, TopicMastery } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { deduplicateTestAttempts } from "@/lib/analytics";

interface CombinedPerformanceCardProps {
  calibrations?: SubjectCalibrationData[];
  weaknesses?: TopicMastery[];
}

export const CombinedPerformanceCard: React.FC<CombinedPerformanceCardProps> = () => {
  const rawAttempts = useTestStore((state) => state.testAttempts);

  // Deduplicate attempts strictly
  const cleanAttempts = useMemo(() => {
    const attempts = rawAttempts || [];
    if (attempts.length === 0) return [];
    const deduped = deduplicateTestAttempts(attempts);
    return [...deduped].sort((a, b) => {
      const ta = new Date(a.submittedAt || (a as any).date || 0).getTime();
      const tb = new Date(b.submittedAt || (b as any).date || 0).getTime();
      return ta - tb;
    });
  }, [rawAttempts]);

  const chartData = useMemo(() => {
    if (cleanAttempts.length === 0) return [];
    return cleanAttempts.map((att, idx) => {
      const rawScore = Math.round(att.totalMarks ?? 0);
      return {
        mockLabel: `Mock ${idx + 1}`,
        score: rawScore,
        rawScore,
        displayVal: String(rawScore),
      };
    });
  }, [cleanAttempts]);

  const testsCount = cleanAttempts.length;

  const { minY, maxY } = useMemo(() => {
    if (chartData.length === 0) return { minY: -10, maxY: 100 };
    const scores = chartData.map((d) => d.score);
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    return {
      minY: Math.min(-10, Math.floor(min / 10) * 10 - 10),
      maxY: Math.max(50, Math.ceil(max / 10) * 10 + 10),
    };
  }, [chartData]);

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
          {testsCount} {testsCount === 1 ? "test" : "tests"} plotted
        </span>
      </div>

      {/* Main Area: Real chart if data exists, clean empty state otherwise */}
      {chartData.length === 0 ? (
        <div className="h-[220px] sm:h-[250px] w-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">No test data plotted</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Complete full-length CBT mock tests to track your score improvement trend and accuracy calibration.
            </p>
          </div>
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline pt-0.5"
          >
            <span>Take a CBT Mock Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
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
                domain={[minY, maxY]}
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
      )}

      {/* Footer caption */}
      <div className="pt-2 border-t border-[#EFE6DC] text-xs text-[#8C7D73]">
        +5 for correct, −1 for incorrect.
      </div>
    </div>
  );
};

export default CombinedPerformanceCard;
