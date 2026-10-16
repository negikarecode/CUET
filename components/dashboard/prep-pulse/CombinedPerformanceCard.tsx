"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, BarChart3, ArrowRight, BookOpen } from "lucide-react";
import { SubjectCalibrationData, TopicMastery } from "@/types";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { formatDateTimeIndian } from "@/lib/config/dashboardConfig";
import { deduplicateTestAttempts } from "@/lib/analytics";
import SearchableSelect from "@/components/ui/SearchableSelect";

type PerformanceTab = "trend" | "subjects";
type MetricType = "score" | "accuracy";

interface CombinedPerformanceCardProps {
  calibrations?: SubjectCalibrationData[];
  weaknesses?: TopicMastery[];
}

export const CombinedPerformanceCard: React.FC<CombinedPerformanceCardProps> = ({
  calibrations = [],
}) => {
  const [activeTab, setActiveTab] = useState<PerformanceTab>("trend");
  const [metric, setMetric] = useState<MetricType>("score");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("all");

  const isClient = useIsClient();
  const rawAttempts = useTestStore((state) => state.testAttempts);

  // Deduplicate attempts strictly: same deduplication rules as Recent Sessions
  const cleanAttempts = useMemo(() => {
    const attempts = rawAttempts || [];
    if (!isClient || attempts.length === 0) return [];
    const deduped = deduplicateTestAttempts(attempts);
    // Sort oldest to newest for chronological trend plotting
    return [...deduped].sort((a, b) => {
      const ta = new Date(a.submittedAt || (a as any).date || 0).getTime();
      const tb = new Date(b.submittedAt || (b as any).date || 0).getTime();
      return ta - tb;
    });
  }, [isClient, rawAttempts]);

  // Available subjects for the subject filter dropdown
  const availableSubjects = useMemo(() => {
    const set = new Set<string>();
    cleanAttempts.forEach((a) => {
      if (a.subject) set.add(a.subject.trim());
    });
    return Array.from(set).sort();
  }, [cleanAttempts]);

  // Filter attempts by subject if a filter is active
  const filteredAttempts = useMemo(() => {
    if (selectedSubjectFilter === "all") return cleanAttempts;
    return cleanAttempts.filter(
      (a) => (a.subject || "").toLowerCase().trim() === selectedSubjectFilter.toLowerCase().trim()
    );
  }, [cleanAttempts, selectedSubjectFilter]);

  const attemptsCount = filteredAttempts.length;

  // Construct chart data with sequential Mock labels and 5-mock rolling average
  const chartData = useMemo(() => {
    if (attemptsCount === 0) return [];

    return filteredAttempts.map((att, idx) => {
      const rawScore = Math.round(att.totalMarks ?? 0);
      const accuracy = Math.round(att.accuracyPercentage ?? 0);
      const plottedScore = Math.max(0, rawScore);
      const maxMarks = att.maxMarks || 250;

      // Compute rolling 5-mock average
      const windowStart = Math.max(0, idx - 4);
      const windowSlice = filteredAttempts.slice(windowStart, idx + 1);
      const avgScore =
        windowSlice.reduce((sum, item) => sum + Math.max(0, Math.round(item.totalMarks ?? 0)), 0) /
        windowSlice.length;
      const avgAccuracy =
        windowSlice.reduce((sum, item) => sum + Math.round(item.accuracyPercentage ?? 0), 0) /
        windowSlice.length;

      return {
        id: att.id || `mock-${idx + 1}`,
        mockLabel: `Mock ${idx + 1}`,
        rawScore,
        plottedScore,
        maxMarks,
        accuracy,
        rollingScore: Math.round(avgScore * 10) / 10,
        rollingAccuracy: Math.round(avgAccuracy * 10) / 10,
        testTitle: att.testTitle || `${att.subject || "Domain"} Mock Test`,
        subject: att.subject || "Domain",
        submittedAt: att.submittedAt || new Date().toISOString(),
        formattedDateTime: formatDateTimeIndian(att.submittedAt || new Date()),
      };
    });
  }, [filteredAttempts, attemptsCount]);

  // Calculate X-axis tick interval to show at most 6-8 labels cleanly
  const xAxisInterval = useMemo(() => {
    if (chartData.length <= 8) return 0;
    return Math.ceil(chartData.length / 7) - 1;
  }, [chartData.length]);

  const subjectsWithData = useMemo(() => {
    return calibrations.filter((c) => c.totalAttempted > 0);
  }, [calibrations]);

  // Custom accessible tooltip
  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      if (!item) return null;

      return (
        <div
          role="tooltip"
          className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-md text-xs min-w-[220px] max-w-[300px] space-y-2 z-30"
        >
          <div className="font-semibold text-slate-900 line-clamp-2 leading-snug" title={item.testTitle}>
            {item.testTitle}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span className="font-medium text-slate-600">{item.subject}</span>
            <span>{item.formattedDateTime}</span>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Score:</span>
              <span className="text-slate-900 tabular-nums font-bold text-sm">
                {item.rawScore} / {item.maxMarks}
                {item.rawScore < 0 && (
                  <span className="text-[10px] text-rose-500 ml-1 font-normal">(negative marking)</span>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Accuracy:</span>
              <span className="text-slate-900 tabular-nums font-semibold">{item.accuracy}%</span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-50">
              <span className="text-slate-400">5-mock rolling avg:</span>
              <span className="text-blue-700 tabular-nums font-semibold">
                {metric === "score" ? `${item.rollingScore} marks` : `${item.rollingAccuracy}%`}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-5">
      {/* Card Header with Tabs, Metric Toggle & Subject Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Performance Analytics
              </h2>
            </div>
          </div>

          {/* Underline Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <button
              type="button"
              onClick={() => setActiveTab("trend")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === "trend"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Trend View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("subjects")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeTab === "subjects"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              By Subject
            </button>
          </div>
        </div>

        {/* Controls (Only visible in Trend tab) */}
        {activeTab === "trend" && (
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Subject Filter Dropdown */}
            {availableSubjects.length > 1 && (
              <SearchableSelect
                ariaLabel="Filter performance by subject"
                value={selectedSubjectFilter}
                onChange={(val) => setSelectedSubjectFilter(val)}
                options={[
                  { value: "all", label: "All Subjects" },
                  ...availableSubjects.map((sub) => ({ value: sub, label: sub })),
                ]}
                buttonClassName="text-xs font-medium px-2.5 py-1.5 rounded-lg border-slate-200 bg-white text-slate-800 shadow-xs"
                placeholder="All Subjects"
                searchPlaceholder="Search subjects..."
              />
            )}

            {/* Score vs Accuracy Toggle */}
            <div
              role="group"
              aria-label="Toggle metric: Score or Accuracy"
              className="inline-flex items-center rounded-lg border border-slate-200/80 bg-slate-100 p-0.5"
            >
              <button
                type="button"
                onClick={() => setMetric("score")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  metric === "score"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Score
              </button>
              <button
                type="button"
                onClick={() => setMetric("accuracy")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  metric === "accuracy"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Accuracy %
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      <div>
        {activeTab === "trend" && (
          <div className="space-y-4">
            {attemptsCount < 2 ? (
              <div className="py-14 text-center space-y-3.5 bg-slate-50/60 rounded-xl border border-dashed border-slate-200 p-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 mx-auto">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {attemptsCount === 0
                      ? "No mock tests attempted yet"
                      : "Take at least 2 tests to unlock your trend"}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    {attemptsCount === 0
                      ? "Complete your first diagnostic test to establish your baseline score and start tracking your progress curve."
                      : "Complete one more mock exam to generate your score trajectory and rolling average curve."}
                  </p>
                </div>
                <Link
                  href="/dashboard/mocks"
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Take a mock test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Chart Header Indicators */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-medium text-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                      <span>{metric === "score" ? "Test Score (Marks)" : "Accuracy (%)"}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <span className="w-3 border-b-2 border-dashed border-blue-500 inline-block opacity-70" />
                      <span>5-mock rolling average</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {filteredAttempts.length} tests plotted
                  </span>
                </div>

                {/* Main Recharts Area */}
                <div
                  role="region"
                  aria-label="Performance score and accuracy trend chart"
                  className="h-[250px] sm:h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 16, right: 16, left: -16, bottom: 8 }}
                    >
                      <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="mockLabel"
                        stroke="transparent"
                        interval={xAxisInterval}
                        tick={{ fontSize: 11, fill: "#94A3B8" }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="transparent"
                        domain={metric === "score" ? [0, 250] : [0, 100]}
                        ticks={
                          metric === "score"
                            ? [0, 50, 100, 150, 200, 250]
                            : [0, 20, 40, 60, 80, 100]
                        }
                        tick={{ fontSize: 11, fill: "#94A3B8" }}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomChartTooltip />} />

                      {/* Rolling Average Line (dashed, lighter) */}
                      <Line
                        type="monotone"
                        dataKey={metric === "score" ? "rollingScore" : "rollingAccuracy"}
                        stroke="#3B82F6"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        strokeOpacity={0.65}
                        dot={false}
                        activeDot={false}
                        isAnimationActive={false}
                      />

                      {/* Main Metric Line */}
                      <Line
                        type="monotone"
                        dataKey={metric === "score" ? "plottedScore" : "accuracy"}
                        stroke="#2563EB"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#2563EB", strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: "#1D4ED8" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Informative footer footnote */}
                <p className="text-[12px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                  <span>Scores include negative marking: +5 for correct, -1 for incorrect.</span>
                  <span className="hidden sm:inline">Hover over points for test details</span>
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "subjects" && (
          <div>
            {subjectsWithData.length === 0 ? (
              <div className="py-12 text-center space-y-2 bg-slate-50/60 rounded-xl border border-dashed border-slate-200 p-6">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-sm font-semibold text-slate-900">
                  No subject attempts recorded yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Take domain-specific practice tests to calibrate performance by subject.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {subjectsWithData.map((sub) => {
                  return (
                    <div
                      key={sub.subjectKey}
                      className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            {sub.subject}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 tabular-nums">
                          {sub.totalAttempted} {sub.totalAttempted === 1 ? "question" : "questions"} attempted • {sub.totalCorrect} correct
                        </div>
                      </div>

                      <div className="w-full sm:w-56 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500 font-medium">Accuracy</span>
                          <span className="font-bold text-slate-900 tabular-nums">
                            {sub.accuracyPercentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              sub.accuracyPercentage >= 75
                                ? "bg-emerald-600"
                                : sub.accuracyPercentage >= 50
                                ? "bg-blue-600"
                                : "bg-amber-600"
                            }`}
                            style={{ width: `${sub.accuracyPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedPerformanceCard;
