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
  const incompleteCount = useMemo(
    () => standings.filter((s) => s.status === "incomplete" || s.status === "no_data").length,
    [standings]
  );
  // Hide Meets / Below / Incomplete filter pills while all counts are 0 except Incomplete
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

    if (!targetCollege) return list;
    const targetIdx = list.findIndex(
      (s) => s.collegeName.toLowerCase() === targetCollege.toLowerCase()
    );
    if (targetIdx <= 0) return list;

    const copy = [...list];
    const targetItem = copy.splice(targetIdx, 1)[0];
    if (!targetItem) return list;
    return [targetItem, ...copy];
  }, [filteredStandings, sortOption, targetCollege]);

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

  const trendData = useMemo(() => {
    if (!selectedStandingItem?.multiYearStats?.yearlyData) return [];
    return selectedStandingItem.multiYearStats.yearlyData.map((d) => ({
      year: String(d.year),
      cutoffMarks: d.cutoffValue,
      cutoffMax: d.cutoffMax,
    }));
  }, [selectedStandingItem]);

  // Calculate sensible round bounds & ticks for the Y-axis
  const yAxisConfig = useMemo(() => {
    if (!trendData || trendData.length === 0) {
      return { domain: [0, 800], ticks: [0, 200, 400, 600, 800] };
    }
    const marksList = trendData.map((d) => d.cutoffMarks);
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
  }, [trendData, combinedAverageMarks]);

  const isUserComplete = combinedAverageMarks !== null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
      {/* 5. Filters Toolbar: Two Spacious Rows */}
      <div className="space-y-3 border-b border-slate-100 pb-4">
        {/* Row 1: Category Selector (Left) & Year Selector (Right) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
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
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  category === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-semibold self-start sm:self-auto">
            {(["all", 2026, 2025, 2024, 2023] as const).map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => {
                  onSelectYear(yr);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedYear === yr
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {yr === "all" ? "All Years" : yr}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: University Filter, Status Filter Pills (if active), Search Box & Sort Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          {/* University Filter & Status Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {universities.length > 1 && (
              <select
                value={selectedUniversity}
                onChange={(e) => {
                  setSelectedUniversity(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white font-medium focus:outline-hidden focus:border-blue-500 max-w-[200px] truncate"
                title="Filter by University"
              >
                <option value="all">All Universities ({universities.length})</option>
                {universities.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            )}

            {/* Status Pills: Only shown when student has complete results */}
            {!isAllIncomplete && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setStandingFilter("all");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    standingFilter === "all"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
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
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60"
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
                      : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/60"
                  }`}
                >
                  Below ({belowCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStandingFilter("incomplete");
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    standingFilter === "incomplete"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/60"
                  }`}
                >
                  Incomplete ({incompleteCount})
                </button>
              </div>
            )}
          </div>

          {/* Search Box & Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="relative w-56 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search colleges..."
                className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white font-medium focus:outline-hidden focus:border-blue-500"
              title="Sort colleges"
            >
              <option value="cutoff_desc">Cutoff: High to Low</option>
              <option value="cutoff_asc">Cutoff: Low to High</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Chart: Historical Cutoff Trend */}
      {selectedStandingItem && trendData.length > 0 && (
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
              <h4 className="text-xs font-bold text-slate-900">
                Historical Cutoff Trend: {selectedStandingItem.collegeName}
              </h4>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                Historical Cutoff Marks
              </span>
              {combinedAverageMarks !== null && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-emerald-600 inline-block" />
                  Your Current Total ({combinedAverageMarks} marks)
                </span>
              )}
            </div>
          </div>

          <p className="sr-only">
            Cutoff trend for {selectedStandingItem.collegeName} in {category} category:{" "}
            {trendData.map((d) => `${d.year}: ${d.cutoffMarks}/${d.cutoffMax} marks`).join(", ")}.
            {combinedAverageMarks !== null ? ` Candidate combined score is ${combinedAverageMarks} marks.` : ""}
          </p>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748B" }} />
                <YAxis
                  domain={yAxisConfig.domain}
                  ticks={yAxisConfig.ticks}
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  unit=" m"
                />
                <Tooltip
                  formatter={(val: any) => [`${val} marks`, "Historical Cutoff"]}
                  labelFormatter={(lbl) => `Year ${lbl}`}
                />
                {combinedAverageMarks !== null && (
                  <ReferenceLine
                    y={combinedAverageMarks}
                    stroke="#059669"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{
                      value: `Your Score (${combinedAverageMarks} marks)`,
                      fill: "#059669",
                      fontSize: 11,
                      fontWeight: 600,
                      position: "insideBottomRight",
                    }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="cutoffMarks"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#2563EB" }}
                  activeDot={{ r: 6 }}
                  label={{
                    position: "top",
                    fill: "#1E293B",
                    fontSize: 11,
                    fontWeight: 700,
                    offset: 8,
                    formatter: (val: any) => `${val}`,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 6. College Table (Desktop) & Cards (Mobile) */}
      <div className="space-y-3">
        {/* Desktop View Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="py-3 px-4">College Name</th>
                <th scope="col" className="py-3 px-3">Expected Cutoff</th>
                <th scope="col" className="py-3 px-3">Range</th>
                <th scope="col" className="py-3 px-3 text-center">Trend</th>
                <th scope="col" className="py-3 px-3">Admission Standing</th>
                <th scope="col" className="py-3 px-3">Marks Gap</th>
                <th scope="col" className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStandings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No colleges match your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedStandings.map((item) => {
                  const isSelected = item.collegeName === selectedCollegeForTrend;
                  const isTarget = targetCollege && item.collegeName.toLowerCase() === targetCollege.toLowerCase();
                  const isItemComplete = isUserComplete && item.isComplete;
                  const gap = item.marksGap ?? 0;

                  // Safe / Target / Reach status badge
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

                  return (
                    <tr
                      key={item.collegeName}
                      onClick={() => onSelectCollegeForTrend(item.collegeName)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        isTarget
                          ? "bg-blue-50/70 border-l-4 border-l-blue-600"
                          : isSelected
                          ? "bg-blue-50/30"
                          : ""
                      }`}
                    >
                      {/* College Name & Target Badge */}
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[220px]">
                              {item.collegeName}
                            </span>
                            {isTarget && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold shrink-0">
                                <Pin className="w-2.5 h-2.5 text-blue-600" /> Target College
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 pl-5 truncate max-w-[220px]">
                            {item.universityName}
                          </span>
                        </div>
                      </td>

                      {/* Expected Cutoff */}
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {item.cutoffDisplay}
                      </td>

                      {/* Historical Range */}
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap text-[11px]">
                        {item.cutoffRangeDisplay}
                      </td>

                      {/* 3-Year Trend Sparkline */}
                      <td className="py-3 px-3 text-center">
                        <MiniTrendSparkline yearlyData={item.multiYearStats?.yearlyData} />
                      </td>

                      {/* Admission Standing */}
                      <td className="py-3 px-3">
                        {isItemComplete && standingBadge ? (
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold border ${standingBadge.className}`}
                          >
                            {standingBadge.label}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">—</span>
                        )}
                      </td>

                      {/* Marks Gap */}
                      <td className="py-3 px-3 whitespace-nowrap">
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

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCollegeForTrend(item.collegeName);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
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

        {/* Mobile View: Collapses to Cards for small screens */}
        <div className="md:hidden space-y-2.5">
          {paginatedStandings.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
              No colleges match your filter.
            </div>
          ) : (
            paginatedStandings.map((item) => {
              const isSelected = item.collegeName === selectedCollegeForTrend;
              const isTarget = targetCollege && item.collegeName.toLowerCase() === targetCollege.toLowerCase();
              const isItemComplete = isUserComplete && item.isComplete;
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

              return (
                <div
                  key={item.collegeName}
                  onClick={() => onSelectCollegeForTrend(item.collegeName)}
                  className={`p-3.5 rounded-xl border transition-all space-y-2.5 cursor-pointer ${
                    isTarget
                      ? "bg-blue-50/70 border-blue-300"
                      : isSelected
                      ? "bg-blue-50/40 border-blue-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 leading-snug">
                          {item.collegeName}
                        </span>
                        {isTarget && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-sm bg-blue-100 text-blue-800 text-[9px] font-bold">
                            <Pin className="w-2.5 h-2.5 text-blue-600" /> Target
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-medium text-slate-500">
                        {item.universityName}
                      </span>
                    </div>

                    {isItemComplete && standingBadge && (
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${standingBadge.className}`}
                      >
                        {standingBadge.label}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Cutoff</span>
                      <span className="font-semibold text-slate-800">
                        {item.cutoffDisplay}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Range</span>
                      <span className="font-semibold text-slate-700 text-[10px]">
                        {item.cutoffRangeDisplay}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Marks Gap</span>
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
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCollegeForTrend(item.collegeName);
                    }}
                    className="w-full py-1 text-center text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100 cursor-pointer"
                  >
                    {isSelected ? "Viewing Cutoff Trend" : "View Cutoff Trend"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination & Page Size Control */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
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
                className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                  pageSize === size
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {size === "all" ? "All" : size}
              </button>
            ))}
            <span className="ml-2 text-slate-400">
              ({sortedAndPinnedStandings.length} {sortedAndPinnedStandings.length === 1 ? "college" : "colleges"})
            </span>
          </div>

          {pageSize !== "all" && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <span className="text-slate-600 font-medium px-1">
                Page {safeCurrentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
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
