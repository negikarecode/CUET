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
  userPct: number | null;
}

export default function CollegeStandingsTable({
  standings,
  category,
  onSelectCategory,
  selectedYear,
  onSelectYear,
  selectedCollegeForTrend,
  onSelectCollegeForTrend,
  userPct,
}: CollegeStandingsTableProps) {
  const [bandFilter, setBandFilter] = useState<string>("all");
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

      let matchesBand = true;
      if (bandFilter === "likely") {
        matchesBand = item.band === "Safe" || item.band === "Likely";
      } else if (bandFilter === "possible") {
        matchesBand = item.band === "Possible";
      } else if (bandFilter === "reach") {
        matchesBand = item.band === "Reach" || item.band === "Far";
      }

      return matchesSearch && matchesUniversity && matchesBand;
    });
  }, [standings, searchFilter, selectedUniversity, bandFilter]);

  // Data for trend chart of the selected college
  const selectedStandingItem =
    standings.find((s) => s.collegeName === selectedCollegeForTrend) ||
    standings[0];

  const trendData = useMemo(() => {
    if (!selectedStandingItem?.multiYearStats?.yearlyData) return [];
    return selectedStandingItem.multiYearStats.yearlyData.map((d) => ({
      year: String(d.year),
      cutoffPct: d.cutoffPct,
      cutoffMarks: d.cutoffValue,
      cutoffMax: d.cutoffMax,
    }));
  }, [selectedStandingItem]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
      {/* Controls Bar: Category, Year, Band, Search */}
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
              className={`px-2 py-1 rounded-lg transition-all ${
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
              className={`px-2 py-1 rounded-lg transition-all ${
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
              className={`px-2 py-1 rounded-lg transition-all ${
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
              className={`px-2 py-1 rounded-lg transition-all ${
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
              className={`px-2 py-1 rounded-lg transition-all ${
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

      {/* Band Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <button
          type="button"
          onClick={() => setBandFilter("all")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            bandFilter === "all"
              ? "bg-slate-900 text-white"
              : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
          }`}
        >
          All Colleges ({standings.length})
        </button>
        <button
          type="button"
          onClick={() => setBandFilter("likely")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            bandFilter === "likely"
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60"
          }`}
        >
          Likely & Safe ({standings.filter((s) => s.band === "Safe" || s.band === "Likely").length})
        </button>
        <button
          type="button"
          onClick={() => setBandFilter("possible")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            bandFilter === "possible"
              ? "bg-amber-600 text-white"
              : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/60"
          }`}
        >
          Possible ({standings.filter((s) => s.band === "Possible").length})
        </button>
        <button
          type="button"
          onClick={() => setBandFilter("reach")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 ${
            bandFilter === "reach"
              ? "bg-rose-600 text-white"
              : "bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/60"
          }`}
        >
          Reach ({standings.filter((s) => s.band === "Reach" || s.band === "Far").length})
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
                Historical Cutoff
              </span>
              {userPct !== null && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 bg-emerald-600 inline-block" />
                  Your Current Level ({userPct}%)
                </span>
              )}
            </div>
          </div>

          {/* Accessible Chart Summary */}
          <p className="sr-only">
            Cutoff trend for {selectedStandingItem.collegeName} in {category} category:{" "}
            {trendData.map((d) => `${d.year}: ${d.cutoffPct}% (${d.cutoffMarks} marks)`).join(", ")}.
            {userPct !== null ? ` Candidate level is ${userPct}%.` : ""}
          </p>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#64748B" }} />
                <YAxis
                  domain={["dataMin - 5", "dataMax + 5"]}
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  unit="%"
                />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, "Historical Cutoff"]}
                  labelFormatter={(lbl) => `Year ${lbl}`}
                />
                {userPct !== null && (
                  <ReferenceLine
                    y={userPct}
                    stroke="#059669"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{
                      value: `Your Level (${userPct}%)`,
                      fill: "#059669",
                      fontSize: 10,
                      position: "insideBottomRight",
                    }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="cutoffPct"
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
                <th scope="col" className="py-3 px-4">Standing Band</th>
                <th scope="col" className="py-3 px-4">Historical Cutoff Range</th>
                <th scope="col" className="py-3 px-4">Score Gap</th>
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
                  const isTargetMet = item.gapPercentagePoints === 0;

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
                          className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold border ${item.bandInfo.badgeClass}`}
                        >
                          {item.bandInfo.label}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-700">
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {item.expectedRange.lowPct}% - {item.expectedRange.highPct}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ~{item.expectedRange.lowMarks} - {item.expectedRange.highMarks} pts
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            isTargetMet ? "text-emerald-700" : "text-orange-700"
                          }`}
                        >
                          {isTargetMet ? "Target Met" : `+${item.gapPercentagePoints}% (+${item.gapMarks} pts)`}
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

        {/* Mobile View: Collapses to Cards for < 640px / 390px screens */}
        <div className="md:hidden space-y-2.5">
          {filteredStandings.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
              No colleges match your filter.
            </div>
          ) : (
            filteredStandings.map((item) => {
              const isSelected = item.collegeName === selectedCollegeForTrend;
              const isTargetMet = item.gapPercentagePoints === 0;

              return (
                <div
                  key={item.collegeName}
                  onClick={() => onSelectCollegeForTrend(item.collegeName)}
                  className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
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
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${item.bandInfo.badgeClass}`}
                    >
                      {item.bandInfo.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Cutoff Range</span>
                      <span className="font-semibold text-slate-800">
                        {item.expectedRange.lowPct}% - {item.expectedRange.highPct}%
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Score Gap</span>
                      <span
                        className={`font-semibold ${
                          isTargetMet ? "text-emerald-700" : "text-orange-700"
                        }`}
                      >
                        {isTargetMet ? "Target Met" : `+${item.gapPercentagePoints}%`}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCollegeForTrend(item.collegeName);
                    }}
                    className="w-full py-1 text-center text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
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
