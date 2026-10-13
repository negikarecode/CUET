"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Search,
  TrendingUp,
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
  userPct?: number | null; // legacy prop compatibility
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
}: CollegeStandingsTableProps) {
  const [standingFilter, setStandingFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");

  const categories: CategoryCode[] = ["UR", "OBC", "SC", "ST", "EWS", "PwBD"];

  const universities = useMemo(() => {
    return Array.from(new Set(standings.map((s) => s.universityName))).sort();
  }, [standings]);

  const filteredStandings = useMemo(() => {
    return standings.filter((item) => {
      const matchesSearch =
        !searchFilter ||
        item.collegeName.toLowerCase().includes(searchFilter.toLowerCase().trim()) ||
        item.universityName.toLowerCase().includes(searchFilter.toLowerCase().trim());

      const matchesUniversity =
        selectedUniversity === "all" || item.universityName === selectedUniversity;

      let matchesFilter = true;
      if (standingFilter === "above") {
        matchesFilter = item.status === "above_cutoff";
      } else if (standingFilter === "below") {
        matchesFilter = item.status === "below_cutoff";
      } else if (standingFilter === "incomplete") {
        matchesFilter = item.status === "incomplete" || item.status === "no_data";
      }

      return matchesSearch && matchesUniversity && matchesFilter;
    });
  }, [standings, searchFilter, selectedUniversity, standingFilter]);

  // Data for trend chart of the selected college
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
      {/* Controls Bar: Category, Year, Filter, Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 [scrollbar-width:none]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                category === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Year Selector, University Dropdown & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => onSelectYear("all")}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                selectedYear === "all"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              All Years
            </button>
            <button
              type="button"
              onClick={() => onSelectYear(2026)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                selectedYear === 2026
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              2026
            </button>
            <button
              type="button"
              onClick={() => onSelectYear(2025)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                selectedYear === 2025
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              2025
            </button>
            <button
              type="button"
              onClick={() => onSelectYear(2024)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                selectedYear === 2024
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              2024
            </button>
            <button
              type="button"
              onClick={() => onSelectYear(2023)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                selectedYear === 2023
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              2023
            </button>
          </div>

          {/* University Filter Dropdown */}
          {universities.length > 1 && (
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white font-medium focus:outline-hidden focus:border-blue-500 max-w-[180px] truncate"
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

          {/* Search Box */}
          <div className="relative flex-1 sm:w-44">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search colleges / unis..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Pills (Marks-Based Status) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <button
          type="button"
          onClick={() => setStandingFilter("all")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            standingFilter === "all"
              ? "bg-slate-900 text-white"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
          }`}
        >
          All Colleges ({standings.length})
        </button>
        <button
          type="button"
          onClick={() => setStandingFilter("above")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            standingFilter === "above"
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60"
          }`}
        >
          Meets Cutoff ({standings.filter((s) => s.status === "above_cutoff").length})
        </button>
        <button
          type="button"
          onClick={() => setStandingFilter("below")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            standingFilter === "below"
              ? "bg-amber-600 text-white"
              : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/60"
          }`}
        >
          Below Cutoff ({standings.filter((s) => s.status === "below_cutoff").length})
        </button>
        <button
          type="button"
          onClick={() => setStandingFilter("incomplete")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
            standingFilter === "incomplete"
              ? "bg-blue-600 text-white"
              : "bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/60"
          }`}
        >
          Incomplete / Awaiting ({standings.filter((s) => s.status === "incomplete" || s.status === "no_data").length})
        </button>
      </div>

      {/* College Trend Chart Card (For Selected College) */}
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
                  Your Current Performance ({combinedAverageMarks} marks)
                </span>
              )}
            </div>
          </div>

          {/* Accessible Chart Summary */}
          <p className="sr-only">
            Cutoff trend for {selectedStandingItem.collegeName} in {category} category:{" "}
            {trendData.map((d) => `${d.year}: ${d.cutoffMarks}/${d.cutoffMax} marks`).join(", ")}.
            {combinedAverageMarks !== null ? ` Candidate combined score is ${combinedAverageMarks} marks.` : ""}
          </p>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748B" }} />
                <YAxis
                  domain={["dataMin - 10", "dataMax + 10"]}
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  unit=" marks"
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
                      value: `Your Level (${combinedAverageMarks} marks)`,
                      fill: "#059669",
                      fontSize: 10,
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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Standings Table (Desktop Table / Mobile Cards) */}
      <div className="space-y-3">
        {/* Desktop View Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="py-3 px-4">College Name</th>
                <th scope="col" className="py-3 px-4">Admission Standing</th>
                <th scope="col" className="py-3 px-4">Expected Cutoff</th>
                <th scope="col" className="py-3 px-4">Marks Gap</th>
                <th scope="col" className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStandings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No colleges match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStandings.map((item) => {
                  const isSelected = item.collegeName === selectedCollegeForTrend;
                  const isAbove = item.status === "above_cutoff";
                  const isBelow = item.status === "below_cutoff";

                  return (
                    <tr
                      key={item.collegeName}
                      onClick={() => onSelectCollegeForTrend(item.collegeName)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        isSelected ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[240px]">
                              {item.collegeName}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 pl-5 truncate max-w-[240px]">
                            {item.universityName}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                            isAbove
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : isBelow
                              ? "bg-amber-50 text-amber-900 border-amber-200"
                              : item.status === "incomplete"
                              ? "bg-blue-50 text-blue-900 border-blue-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {item.statusLabel}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {item.cutoffDisplay}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Range: {item.cutoffRangeDisplay}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            isAbove
                              ? "text-emerald-700"
                              : isBelow
                              ? "text-orange-700"
                              : "text-slate-600"
                          }`}
                        >
                          {item.gapDisplay}
                        </span>
                      </td>

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
          {filteredStandings.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
              No colleges match your filter.
            </div>
          ) : (
            filteredStandings.map((item) => {
              const isSelected = item.collegeName === selectedCollegeForTrend;
              const isAbove = item.status === "above_cutoff";
              const isBelow = item.status === "below_cutoff";

              return (
                <div
                  key={item.collegeName}
                  onClick={() => onSelectCollegeForTrend(item.collegeName)}
                  className={`p-3.5 rounded-xl border transition-all space-y-2.5 cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/50 border-blue-200"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 leading-snug">
                        {item.collegeName}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        {item.universityName}
                      </span>
                    </div>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                        isAbove
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : isBelow
                          ? "bg-amber-50 text-amber-900 border-amber-200"
                          : item.status === "incomplete"
                          ? "bg-blue-50 text-blue-900 border-blue-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {item.statusLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Cutoff</span>
                      <span className="font-semibold text-slate-800">
                        {item.cutoffDisplay}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Marks Gap</span>
                      <span
                        className={`font-semibold ${
                          isAbove
                            ? "text-emerald-700"
                            : isBelow
                            ? "text-orange-700"
                            : "text-slate-600"
                        }`}
                      >
                        {item.gapDisplay}
                      </span>
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
      </div>
    </div>
  );
}
