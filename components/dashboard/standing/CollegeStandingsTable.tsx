"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Search,
  TrendingUp,
  Pin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import {
  CollegeStandingResult,
} from "@/lib/standing-engine";
import { CategoryCode } from "@/lib/config/standingConfig";
import SearchableSelect from "@/components/ui/SearchableSelect";

interface CollegeStandingsTableProps {
  standings: CollegeStandingResult[];
  category: CategoryCode;
  onSelectCategory: (cat: CategoryCode) => void;
  selectedYear: number | "all";
  onSelectYear: (year: number | "all") => void;
  selectedCollegeForTrend: string;
  onSelectCollegeForTrend: (collegeName: string) => void;
  combinedAverageMarks?: number | null;
  targetCollege?: string;
  savedTargetCollege?: string;
  cutoffScale?: number;
  userPct?: number | null; // legacy prop compatibility
}

function MiniTrendSparkline({
  yearlyData,
}: {
  yearlyData?: Array<{ year: number; cutoffValue: number }>;
}) {
  if (!yearlyData || yearlyData.length < 2) {
    return <span className="text-slate-300 text-xs font-mono">—</span>;
  }

  const firstVal = yearlyData[0]?.cutoffValue;
  const lastItem = yearlyData[yearlyData.length - 1];
  const lastVal = lastItem?.cutoffValue;
  if (firstVal === undefined || lastVal === undefined || !lastItem) {
    return <span className="text-slate-300 text-xs font-mono">—</span>;
  }

  const width = 64;
  const height = 22;
  const padX = 5;
  const padY = 4;

  const values = yearlyData.map((d) => d.cutoffValue);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  const points = yearlyData.map((d, idx) => {
    const x = padX + (idx / (yearlyData.length - 1)) * (width - 2 * padX);
    const y = height - padY - ((d.cutoffValue - minVal) / valRange) * (height - 2 * padY);
    return { x, y, ...d };
  });

  const pathD = points.reduce(
    (acc, pt, i) =>
      i === 0 ? `M ${pt.x.toFixed(1)},${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`,
    ""
  );

  const lastPt = points[points.length - 1];
  if (!lastPt) return null;

  const isRising = lastVal > firstVal;
  const strokeColor = isRising ? "#2563EB" : "#64748B";
  const titleText = yearlyData.map((d) => `${d.year}: ${d.cutoffValue} marks`).join(" → ");

  return (
    <div className="inline-flex items-center justify-center" title={titleText}>
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={lastPt.x} cy={lastPt.y} r="2.5" fill={strokeColor} />
      </svg>
    </div>
  );
}

function formatRangeDisplay(item: CollegeStandingResult): string {
  const rangeRaw = item.multiYearStats?.projectedRange;
  if (typeof rangeRaw === "string") return rangeRaw;
  if (typeof rangeRaw === "object" && rangeRaw !== null) {
    const obj = rangeRaw as { low?: number; high?: number; label?: string };
    if (obj.label) return obj.label;
    if (obj.low !== undefined && obj.high !== undefined) return `${obj.low} - ${obj.high}`;
  }
  return (item.cutoffRangeDisplay || "").replace(/ marks?/i, "");
}

export default function CollegeStandingsTable({
  standings,
  category,
  onSelectCategory,
  selectedYear,
  onSelectYear,
  selectedCollegeForTrend,
  onSelectCollegeForTrend,
  combinedAverageMarks = null,
  targetCollege,
  savedTargetCollege,
  cutoffScale = 750,
}: CollegeStandingsTableProps) {
  const [standingFilter, setStandingFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"cutoff_desc" | "cutoff_asc" | "name_asc" | "name_desc">("cutoff_desc");
  const [pageSize, setPageSize] = useState<number | "all">(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories: CategoryCode[] = ["UR", "OBC", "SC", "ST", "EWS", "PwBD"];

  const universities = useMemo(() => {
    return Array.from(new Set(standings.map((s) => s.universityName))).sort();
  }, [standings]);

  // Counts for status filtering
  const aboveCount = useMemo(() => standings.filter((s) => s.status === "above_cutoff").length, [standings]);
  const belowCount = useMemo(() => standings.filter((s) => s.status === "below_cutoff").length, [standings]);
  const isAllIncomplete = aboveCount === 0 && belowCount === 0;

  const filteredStandings = useMemo(() => {
    return standings.filter((item) => {
      const matchesSearch =
        !searchFilter ||
        item.collegeName.toLowerCase().includes(searchFilter.toLowerCase().trim()) ||
        item.universityName.toLowerCase().includes(searchFilter.toLowerCase().trim());

      const matchesUniversity =
        selectedUniversity === "all" || item.universityName === selectedUniversity;

      let matchesFilter = true;
      if (!isAllIncomplete) {
        if (standingFilter === "above") {
          matchesFilter = item.status === "above_cutoff";
        } else if (standingFilter === "below") {
          matchesFilter = item.status === "below_cutoff";
        } else if (standingFilter === "incomplete") {
          matchesFilter = item.status === "incomplete" || item.status === "no_data";
        }
      }

      return matchesSearch && matchesUniversity && matchesFilter;
    });
  }, [standings, searchFilter, selectedUniversity, standingFilter, isAllIncomplete]);

  // Sort and pin target college to the top
  const effectiveTarget = savedTargetCollege || targetCollege;
  const sortedAndPinnedStandings: CollegeStandingResult[] = useMemo(() => {
    const list = [...filteredStandings].sort((a, b) => {
      if (sortOption === "cutoff_desc") {
        return b.cutoffMarks - a.cutoffMarks;
      }
      if (sortOption === "cutoff_asc") {
        return a.cutoffMarks - b.cutoffMarks;
      }
      if (sortOption === "name_asc") {
        return a.collegeName.localeCompare(b.collegeName);
      }
      if (sortOption === "name_desc") {
        return b.collegeName.localeCompare(a.collegeName);
      }
      return 0;
    });

    if (!effectiveTarget) return list;
    const targetIdx = list.findIndex(
      (s) => s.collegeName.toLowerCase() === effectiveTarget.toLowerCase()
    );
    if (targetIdx <= 0) return list;

    const copy = [...list];
    const targetItem = copy.splice(targetIdx, 1)[0];
    if (!targetItem) return list;
    return [targetItem, ...copy];
  }, [filteredStandings, sortOption, effectiveTarget]);

  const totalPages =
    pageSize === "all"
      ? 1
      : Math.ceil(sortedAndPinnedStandings.length / (pageSize as number)) || 1;

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedStandings: CollegeStandingResult[] = useMemo(() => {
    if (pageSize === "all") return sortedAndPinnedStandings;
    const start = (safeCurrentPage - 1) * (pageSize as number);
    return sortedAndPinnedStandings.slice(start, start + (pageSize as number));
  }, [sortedAndPinnedStandings, pageSize, safeCurrentPage]);

  // Trend data for selected college
  const selectedStandingItem =
    standings && standings.length > 0
      ? standings.find((s) => s.collegeName === selectedCollegeForTrend) || standings[0]
      : null;

  // Trend data including 2027 projected point
  const trendData = useMemo(() => {
    if (!selectedStandingItem?.multiYearStats?.yearlyData) return [];
    const yearly = selectedStandingItem.multiYearStats.yearlyData;
    if (yearly.length === 0) return [];

    const result: Array<{
      year: string;
      cutoffMarks?: number | null;
      projectedCutoffMarks?: number | null;
      isProjected?: boolean;
    }> = [];

    // Historical years (e.g. 2023 to 2026)
    yearly.forEach((d, idx) => {
      const isLatest = idx === yearly.length - 1;
      result.push({
        year: String(d.year),
        cutoffMarks: d.cutoffValue,
        // The bridge point connects historical line with projected dashed line
        projectedCutoffMarks: isLatest ? d.cutoffValue : null,
        isProjected: false,
      });
    });

    // 2027 Projected Point
    const projMarks = selectedStandingItem.multiYearStats.projectedCutoffMarks;
    const projYear = selectedStandingItem.multiYearStats.projectedYear || 2027;
    if (projMarks !== undefined && projMarks !== null) {
      result.push({
        year: `${projYear} (projected)`,
        cutoffMarks: null,
        projectedCutoffMarks: projMarks,
        isProjected: true,
      });
    }

    return result;
  }, [selectedStandingItem]);

  // Year-over-year delta calculation (e.g. +23.4 since 2023)
  const trendDelta = useMemo(() => {
    const yearly = selectedStandingItem?.multiYearStats?.yearlyData;
    if (!yearly || yearly.length < 2) return null;
    const first = yearly[0];
    const last = yearly[yearly.length - 1];
    if (!first || !last) return null;
    const diff = Math.round((last.cutoffValue - first.cutoffValue) * 10) / 10;
    const sign = diff >= 0 ? `+${diff}` : `${diff}`;
    return `${sign} since ${first.year}`;
  }, [selectedStandingItem]);

  // Calculate round bounds & ticks for Y-axis (zoomed to variation, does not start at 0)
  const yAxisConfig = useMemo(() => {
    if (!trendData || trendData.length === 0) {
      return { domain: [0, cutoffScale], ticks: [0, 200, 400, 600, cutoffScale] };
    }
    const marksList: number[] = [];
    trendData.forEach((d) => {
      if (typeof d.cutoffMarks === "number") marksList.push(d.cutoffMarks);
      if (typeof d.projectedCutoffMarks === "number") marksList.push(d.projectedCutoffMarks);
    });
    if (combinedAverageMarks !== null && combinedAverageMarks !== undefined) {
      marksList.push(combinedAverageMarks);
    }
    const minVal = Math.min(...marksList);
    const maxVal = Math.max(...marksList);
    const diff = maxVal - minVal;

    let step = 20;
    if (diff > 250) step = 50;
    else if (diff > 120) step = 25;
    else if (diff <= 30) step = 10;

    const roundMin = Math.max(0, Math.floor((minVal - 10) / step) * step);
    const roundMax = Math.ceil((maxVal + 10) / step) * step;

    const ticks: number[] = [];
    for (let t = roundMin; t <= roundMax; t += step) {
      ticks.push(t);
    }
    return { domain: [roundMin, roundMax], ticks };
  }, [trendData, combinedAverageMarks, cutoffScale]);

  const hasUserScore = combinedAverageMarks !== null && combinedAverageMarks !== undefined;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5 relative">
      {/* 1. Slim Sticky Toolbar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pt-1 pb-3 border-b border-slate-200/80 -mx-5 px-5 space-y-2.5">
        {/* Category Pills & Year Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Category Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 shrink-0">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  onSelectCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  category === cat
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold self-start sm:self-auto">
            {(["all", 2026, 2025, 2024, 2023] as const).map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => {
                  onSelectYear(yr);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  selectedYear === yr
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {yr === "all" ? "All Years" : yr}
              </button>
            ))}
          </div>
        </div>

        {/* University Filter, Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            {universities.length > 1 && (
              <div className="max-w-[200px]">
                <SearchableSelect
                  ariaLabel="Filter by University"
                  value={selectedUniversity}
                  onChange={(val) => {
                    setSelectedUniversity(val);
                    setCurrentPage(1);
                  }}
                  options={[
                    { value: "all", label: `All Universities (${universities.length})` },
                    ...universities.map((u) => ({ value: u, label: u })),
                  ]}
                  buttonClassName="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white font-medium truncate"
                  placeholder="All Universities"
                  searchPlaceholder="Search universities..."
                />
              </div>
            )}

            {!isAllIncomplete && (
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setStandingFilter("all");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    standingFilter === "all"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  All ({standings.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStandingFilter("above");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    standingFilter === "above"
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  Meets ({aboveCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStandingFilter("below");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    standingFilter === "below"
                      ? "bg-amber-600 text-white"
                      : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  Below ({belowCount})
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search colleges..."
                className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <SearchableSelect
              ariaLabel="Sort colleges"
              value={sortOption}
              onChange={(val) => {
                setSortOption(val as any);
                setCurrentPage(1);
              }}
              options={[
                { value: "cutoff_desc", label: "Cutoff: High to Low" },
                { value: "cutoff_asc", label: "Cutoff: Low to High" },
                { value: "name_asc", label: "Name: A to Z" },
                { value: "name_desc", label: "Name: Z to A" },
              ]}
              buttonClassName="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white font-medium"
            />
          </div>
        </div>
      </div>

      {/* 2. Historical Cutoff Trend Chart */}
      {selectedStandingItem && trendData.length > 0 && (
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
              <h4 className="text-sm font-bold text-slate-900">
                Cutoff Trend: {selectedStandingItem.collegeName}
              </h4>
              {trendDelta && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  {trendDelta}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                Historical Cutoffs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white inline-block" />
                2027 Projected
              </span>
              {hasUserScore && (
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-600 inline-block border-t-2 border-dashed border-emerald-600" />
                  Your Total ({combinedAverageMarks})
                </span>
              )}
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748B" }} />
                <YAxis
                  domain={yAxisConfig.domain}
                  ticks={yAxisConfig.ticks}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const itemData = payload.find((p) => p.value !== null && p.value !== undefined);
                      const val = itemData?.value;
                      return (
                        <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
                          {label}: {val} marks
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {/* Horizontal reference line for student composite when all subjects complete */}
                {hasUserScore && (
                  <ReferenceLine
                    y={combinedAverageMarks}
                    stroke="#059669"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{
                      value: `Your Total (${combinedAverageMarks})`,
                      fill: "#059669",
                      fontSize: 12,
                      fontWeight: 600,
                      position: "insideBottomRight",
                    }}
                  />
                )}
                {/* Historical solid line */}
                <Line
                  type="monotone"
                  dataKey="cutoffMarks"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  connectNulls={false}
                  dot={{ r: 4, fill: "#2563EB" }}
                  activeDot={{ r: 6 }}
                  label={{
                    position: "top",
                    fill: "#1E293B",
                    fontSize: 12,
                    fontWeight: 700,
                    offset: 8,
                    formatter: (val: any) => (val !== null && val !== undefined ? `${val}` : ""),
                  }}
                />
                {/* 2027 Projected dashed line segment with hollow dot */}
                <Line
                  type="monotone"
                  dataKey="projectedCutoffMarks"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  connectNulls
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (!payload?.isProjected || cx === undefined || cy === undefined) {
                      return <React.Fragment key={props.key || `${cx}-${cy}`} />;
                    }
                    return (
                      <circle
                        key="proj-dot"
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill="#FFFFFF"
                        stroke="#2563EB"
                        strokeWidth={2.5}
                      />
                    );
                  }}
                  activeDot={{ r: 6 }}
                  label={(props: any) => {
                    const { x, y, value, payload } = props;
                    if (!payload?.isProjected || value === undefined || value === null) {
                      return <g key={props.key || `empty-${x}-${y}`} />;
                    }
                    return (
                      <text
                        key={props.key || `proj-${x}-${y}`}
                        x={x}
                        y={y - 10}
                        fill="#2563EB"
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight={700}
                      >
                        {value} (projected)
                      </text>
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-400 italic">
            Note: Y-axis scale is zoomed to highlight year-over-year variation and does not start at zero.
          </p>
        </div>
      )}

      {/* 3. College Standings Table & Cards */}
      <div className="space-y-3">
        {/* Desktop View Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="py-3.5 px-4">College Name</th>
                <th scope="col" className="py-3.5 px-3 whitespace-nowrap">
                  Projected cutoff / {cutoffScale}
                </th>
                <th scope="col" className="py-3.5 px-3 whitespace-nowrap">Likely Range</th>
                <th scope="col" className="py-3.5 px-3 text-center">Trend</th>
                {hasUserScore && (
                  <>
                    <th scope="col" className="py-3.5 px-3">Admission Standing</th>
                    <th scope="col" className="py-3.5 px-3">Marks Gap</th>
                  </>
                )}
                <th scope="col" className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStandings.length === 0 ? (
                <tr>
                  <td colSpan={hasUserScore ? 7 : 5} className="py-8 text-center text-sm text-slate-500">
                    No colleges match your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedStandings.map((item) => {
                  const isSelected = item.collegeName === selectedCollegeForTrend;
                  const isSavedTarget =
                    savedTargetCollege &&
                    item.collegeName.toLowerCase() === savedTargetCollege.toLowerCase();
                  const isViewing =
                    targetCollege &&
                    item.collegeName.toLowerCase() === targetCollege.toLowerCase();
                  const isItemComplete = hasUserScore && item.isComplete;
                  const gap = item.marksGap ?? 0;

                  let standingBadge: { label: "Safe" | "Target" | "Reach"; className: string } | null = null;
                  if (isItemComplete) {
                    if (gap <= 0) {
                      standingBadge = {
                        label: "Safe",
                        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
                      };
                    } else if (gap <= 25) {
                      standingBadge = {
                        label: "Target",
                        className: "bg-amber-50 text-amber-800 border-amber-200",
                      };
                    } else {
                      standingBadge = {
                        label: "Reach",
                        className: "bg-rose-50 text-rose-800 border-rose-200",
                      };
                    }
                  }

                  const rangeDisplay = formatRangeDisplay(item);

                  return (
                    <tr
                      key={item.collegeName}
                      tabIndex={0}
                      onClick={() => onSelectCollegeForTrend(item.collegeName)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectCollegeForTrend(item.collegeName);
                        }
                      }}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                        isSavedTarget
                          ? "bg-blue-50/70 border-l-4 border-l-blue-600"
                          : isSelected || isViewing
                          ? "bg-blue-50/30"
                          : ""
                      }`}
                    >
                      {/* College Name & Badges */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="leading-snug break-words">
                              {item.collegeName}
                            </span>
                            {isSavedTarget && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold shrink-0">
                                <Pin className="w-3 h-3 text-blue-600" /> Target College
                              </span>
                            )}
                            {!isSavedTarget && isViewing && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold shrink-0">
                                Viewing
                              </span>
                            )}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-500 pl-6 break-words">
                            {item.universityName}
                          </span>
                        </div>
                      </td>

                      {/* Projected Cutoff: Numbers Only */}
                      <td className="py-3.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {item.cutoffMarks}
                      </td>

                      {/* Historical Range: Numbers Only */}
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap text-xs sm:text-sm">
                        {rangeDisplay}
                      </td>

                      {/* 3-Year Trend Sparkline */}
                      <td className="py-3.5 px-3 text-center">
                        <MiniTrendSparkline yearlyData={item.multiYearStats?.yearlyData} />
                      </td>

                      {/* Columns shown only when user has a score */}
                      {hasUserScore && (
                        <>
                          <td className="py-3.5 px-3">
                            {isItemComplete && standingBadge ? (
                              <span
                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${standingBadge.className}`}
                              >
                                {standingBadge.label}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-medium">—</span>
                            )}
                          </td>

                          <td className="py-3.5 px-3 whitespace-nowrap">
                            {isItemComplete ? (
                              gap <= 0 ? (
                                <span className="font-semibold text-emerald-700">
                                  {Math.abs(gap) === 0 ? "Meets cutoff" : `+${Math.abs(gap)} marks above`}
                                </span>
                              ) : (
                                <span className="font-semibold text-orange-700">
                                  {gap} marks needed
                                </span>
                              )
                            ) : (
                              <span className="text-slate-400 font-medium">—</span>
                            )}
                          </td>
                        </>
                      )}

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCollegeForTrend(item.collegeName);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          {isSelected ? "Viewing Trend" : "View Trend"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Stacked Cards (< 768px) */}
        <div className="md:hidden space-y-2.5">
          {paginatedStandings.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500 bg-slate-50 rounded-xl">
              No colleges match your filter.
            </div>
          ) : (
            paginatedStandings.map((item) => {
              const isSelected = item.collegeName === selectedCollegeForTrend;
              const isSavedTarget =
                savedTargetCollege &&
                item.collegeName.toLowerCase() === savedTargetCollege.toLowerCase();
              const isViewing =
                targetCollege &&
                item.collegeName.toLowerCase() === targetCollege.toLowerCase();
              const isItemComplete = hasUserScore && item.isComplete;
              const gap = item.marksGap ?? 0;

              let standingBadge: { label: "Safe" | "Target" | "Reach"; className: string } | null = null;
              if (isItemComplete) {
                if (gap <= 0) {
                  standingBadge = {
                    label: "Safe",
                    className: "bg-emerald-50 text-emerald-800 border-emerald-200",
                  };
                } else if (gap <= 25) {
                  standingBadge = {
                    label: "Target",
                    className: "bg-amber-50 text-amber-800 border-amber-200",
                  };
                } else {
                  standingBadge = {
                    label: "Reach",
                    className: "bg-rose-50 text-rose-800 border-rose-200",
                  };
                }
              }

              const rangeDisplay = formatRangeDisplay(item);

              return (
                <div
                  key={item.collegeName}
                  tabIndex={0}
                  onClick={() => onSelectCollegeForTrend(item.collegeName)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectCollegeForTrend(item.collegeName);
                    }
                  }}
                  className={`p-4 rounded-xl border transition-all space-y-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSavedTarget
                      ? "bg-blue-50/70 border-blue-300"
                      : isSelected || isViewing
                      ? "bg-blue-50/40 border-blue-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-bold text-slate-900 leading-snug break-words">
                          {item.collegeName}
                        </span>
                        {isSavedTarget && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800 text-xs font-bold">
                            <Pin className="w-3 h-3 text-blue-600" /> Target
                          </span>
                        )}
                        {!isSavedTarget && isViewing && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-slate-500 break-words">
                        {item.universityName}
                      </span>
                    </div>

                    {hasUserScore && isItemComplete && standingBadge && (
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border shrink-0 ${standingBadge.className}`}
                      >
                        {standingBadge.label}
                      </span>
                    )}
                  </div>

                  <div className={`grid ${hasUserScore ? "grid-cols-3" : "grid-cols-2"} gap-2 text-xs pt-2 border-t border-slate-100`}>
                    <div>
                      <span className="text-slate-400 block font-medium">Cutoff</span>
                      <span className="font-bold text-slate-800 text-sm">
                        {item.cutoffMarks}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Range</span>
                      <span className="font-semibold text-slate-700">
                        {rangeDisplay}
                      </span>
                    </div>

                    {hasUserScore && (
                      <div>
                        <span className="text-slate-400 block font-medium">Marks Gap</span>
                        {isItemComplete ? (
                          gap <= 0 ? (
                            <span className="font-semibold text-emerald-700">
                              {Math.abs(gap) === 0 ? "Meets" : `+${Math.abs(gap)}`}
                            </span>
                          ) : (
                            <span className="font-semibold text-orange-700">
                              {gap} needed
                            </span>
                          )
                        ) : (
                          <span className="text-slate-400 font-medium">—</span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCollegeForTrend(item.collegeName);
                    }}
                    className="w-full py-1.5 text-center text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100 cursor-pointer"
                  >
                    {isSelected ? "Viewing Cutoff Trend" : "View Cutoff Trend"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* 4. Pagination & Page Size Control */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span>Show:</span>
            {([10, 25, "all"] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-semibold cursor-pointer ${
                  pageSize === size
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {size === "all" ? "All" : size}
              </button>
            ))}
            <span className="ml-1 text-xs text-slate-500">
              ({sortedAndPinnedStandings.length} {sortedAndPinnedStandings.length === 1 ? "college" : "colleges"})
            </span>
          </div>

          {pageSize !== "all" && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <span className="text-slate-700 font-medium px-1 text-xs sm:text-sm">
                Page {safeCurrentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
