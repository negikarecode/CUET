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
      // Clamped score for plotting (Y-axis never goes negative)
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

  // Accessible custom tooltip showing full test name, subject, date & time, score, and accuracy
  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      if (!item) return null;

      return (
        <div
          role="tooltip"
          className="bg-white rounded-[10px] p-3.5 border border-[var(--border)] shadow-[0_10px_25px_rgba(15,23,42,0.12)] text-[13px] min-w-[220px] max-w-[320px] space-y-1.5 z-30"
        >
          <div className="font-semibold text-[var(--text)] line-clamp-2 leading-snug" title={item.testTitle}>
            {item.testTitle}
          </div>
          <div className="text-[12px] text-[var(--text-muted)] flex items-center justify-between">
            <span>{item.subject}</span>
            <span>{item.formattedDateTime}</span>
          </div>

          <div className="pt-1.5 border-t border-[var(--border)] space-y-1">
            <div className="flex items-center justify-between font-medium">
              <span className="text-[var(--text-secondary)]">Score:</span>
              <span className="text-[var(--text)] tabular-nums font-semibold">
                {item.rawScore} / {item.maxMarks}
                {item.rawScore < 0 && (
                  <span className="text-[11px] text-rose-500 ml-1 font-normal">(negative marking)</span>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between font-medium">
              <span className="text-[var(--text-secondary)]">Accuracy:</span>
              <span className="text-[var(--text)] tabular-nums font-semibold">{item.accuracy}%</span>
            </div>

            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[var(--text-muted)]">5-mock average:</span>
              <span className="text-[var(--text-secondary)] tabular-nums font-medium">
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
    <div className="app-card flex flex-col justify-between space-y-4">
      {/* Card Header with Tabs, Metric Toggle & Subject Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3 gap-3">
        <div className="flex items-center gap-4">
          <h3 className="text-[18px] font-semibold text-[var(--text)]">Performance</h3>

          {/* Underline Tabs: Trend vs By Subject */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab("trend")}
              className={`pb-1 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === "trend"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              Trend
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("subjects")}
              className={`pb-1 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === "subjects"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              By subject
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
                buttonClassName="text-[13px] font-medium px-2.5 py-1 rounded-[6px] border-[var(--border)] bg-white text-[var(--text)] shadow-xs"
                placeholder="All Subjects"
                searchPlaceholder="Search subjects..."
              />
            )}

            {/* Score vs Accuracy Toggle */}
            <div
              role="group"
              aria-label="Toggle metric: Score or Accuracy"
              className="inline-flex items-center rounded-[6px] border border-[var(--border)] bg-slate-100/80 p-0.5"
            >
              <button
                type="button"
                onClick={() => setMetric("score")}
                className={`px-2.5 py-1 text-[12px] font-semibold rounded-[4px] transition-all cursor-pointer ${
                  metric === "score"
                    ? "bg-white text-[var(--text)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                Score
              </button>
              <button
                type="button"
                onClick={() => setMetric("accuracy")}
                className={`px-2.5 py-1 text-[12px] font-semibold rounded-[4px] transition-all cursor-pointer ${
                  metric === "accuracy"
                    ? "bg-white text-[var(--text)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
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
          <div className="space-y-3">
            <div className="sr-only">
              Score trend chart showing historical test attempts.
            </div>

            {attemptsCount < 2 ? (
              <div className="py-14 text-center space-y-3">
                <p className="text-[15px] font-medium text-[var(--text)]">
                  {attemptsCount === 0
                    ? "No mock tests attempted yet"
                    : "Take at least 2 mocks to see your trend."}
                </p>
                <p className="text-[13px] text-[var(--text-secondary)] max-w-sm mx-auto">
                  {attemptsCount === 0
                    ? "Complete your first diagnostic test to establish your baseline score and start tracking your performance trend."
                    : "Complete one more mock exam to unlock your progress curve and rolling average."}
                </p>
                <Link
                  href="/dashboard/mocks"
                  className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[13px] font-semibold transition-colors shadow-xs"
                >
                  Take a mock test
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Chart Header Indicator */}
                <div className="flex flex-wrap items-center justify-between text-[12px] text-[var(--text-secondary)] gap-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block" />
                      <span className="font-medium text-[var(--text)]">
                        {metric === "score" ? "Raw Score" : "Accuracy %"}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 border-b-2 border-dashed border-[var(--accent)] inline-block opacity-70" />
                      <span>5-mock rolling average</span>
                    </span>
                  </div>
                </div>

                {/* Main Recharts Area: 320px Desktop, 240px Mobile */}
                <div
                  role="region"
                  aria-label="Performance score and accuracy trend chart"
                  className="h-[240px] sm:h-[320px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 16, right: 16, left: -16, bottom: 8 }}
                    >
                      <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="mockLabel"
                        stroke="transparent"
                        interval={xAxisInterval}
                        tick={{ fontSize: 12, fill: "var(--text-muted)" }}
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
                        tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomChartTooltip />} />

                      {/* Rolling Average Line (dashed, lighter) */}
                      <Line
                        type="monotone"
                        dataKey={metric === "score" ? "rollingScore" : "rollingAccuracy"}
                        stroke="var(--accent)"
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
                        stroke="var(--accent)"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: "var(--accent)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Small grey note under the chart */}
                <p className="text-[13px] text-[var(--text-muted)] pt-1">
                  Scores are out of 250 and include negative marking (+5 for correct, -1 for incorrect).
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "subjects" && (
          <div>
            {subjectsWithData.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-[14px] font-medium text-[var(--text)]">
                  No subject attempts recorded yet
                </p>
                <p className="text-[13px] text-[var(--text-secondary)] max-w-sm mx-auto">
                  Take domain-specific practice tests to calibrate performance by subject.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {subjectsWithData.map((sub) => {
                  return (
                    <div
                      key={sub.subjectKey}
                      className="p-3.5 rounded-[8px] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-semibold text-[var(--text)]">
                            {sub.subject}
                          </span>
                        </div>
                        <div className="text-[13px] text-[var(--text-secondary)] tabular-nums">
                          {sub.totalAttempted} questions attempted • {sub.totalCorrect} correct
                        </div>
                      </div>

                      <div className="w-full sm:w-48 space-y-1.5">
                        <div className="flex justify-between text-[13px]">
                          <span className="text-[var(--text-secondary)]">Accuracy</span>
                          <span className="font-semibold text-[var(--text)] tabular-nums">
                            {sub.accuracyPercentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
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
