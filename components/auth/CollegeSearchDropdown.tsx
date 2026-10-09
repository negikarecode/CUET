"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Check,
  Building2,
  X,
  Compass,
} from "lucide-react";
import { DU_COLLEGES, OTHER_CENTRAL_UNIVERSITIES, DUCollegeItem } from "@/lib/constants/duColleges";

interface CollegeSearchDropdownProps {
  selectedCollege: string;
  onSelectCollege: (collegeName: string, universityName?: string) => void;
  label?: string;
  placeholder?: string;
}

export default function CollegeSearchDropdown({
  selectedCollege,
  onSelectCollege,
  label = "Dream Target College",
  placeholder = "Search DU colleges (e.g. SRCC, Hindu, Venky, Gargi)...",
}: CollegeSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [campusFilter, setCampusFilter] = useState<string>("all");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered DU colleges based on search query and campus filter
  const filteredColleges = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DU_COLLEGES.filter((col) => {
      // Match campus
      if (campusFilter !== "all" && col.campus !== campusFilter) {
        return false;
      }
      if (!q) return true;
      return (
        col.name.toLowerCase().includes(q) ||
        (col.shortName && col.shortName.toLowerCase().includes(q)) ||
        col.campus.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, campusFilter]);

  // Filtered other central universities
  const filteredOther = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q && campusFilter !== "all" && campusFilter !== "Other") return [];
    if (campusFilter !== "all" && campusFilter !== "Other") return [];
    return OTHER_CENTRAL_UNIVERSITIES.filter((u) =>
      !q ? true : u.toLowerCase().includes(q)
    );
  }, [searchQuery, campusFilter]);

  const handleSelect = (collegeName: string, universityName: string = "Delhi University") => {
    onSelectCollege(collegeName, universityName);
    setIsOpen(false);
    setSearchQuery("");
  };

  const campusBadges: Record<string, string> = {
    "North Campus": "bg-amber-50 text-amber-800 border-amber-200",
    "South Campus": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "Off Campus": "bg-blue-50 text-blue-800 border-blue-200",
    "Specialized Institution": "bg-purple-50 text-purple-800 border-purple-200",
  };

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{label}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {DU_COLLEGES.length} Official DU Colleges
          </span>
        </label>
      )}

      {/* Selected Value Trigger / Search Launcher */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-medium text-xs sm:text-sm flex items-center justify-between shadow-xs cursor-pointer transition-all"
      >
        <div className="flex items-center gap-2 truncate">
          <Building2 className="w-4 h-4 shrink-0 text-slate-400" />
          <span className={selectedCollege ? "text-slate-900 font-semibold truncate" : "text-slate-400"}>
            {selectedCollege || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-72 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input Box */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/70 space-y-2">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college name, acronym (e.g. SRCC, Hindu)..."
                className="w-full pl-8 pr-7 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 p-0.5 rounded text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Campus Quick-Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-semibold no-scrollbar">
              {[
                { id: "all", label: "All Colleges" },
                { id: "North Campus", label: "North Campus" },
                { id: "South Campus", label: "South Campus" },
                { id: "Off Campus", label: "Off Campus" },
                { id: "Specialized Institution", label: "Specialized" },
                { id: "Other", label: "Other Central Univs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCampusFilter(tab.id)}
                  className={`px-2.5 py-0.5 rounded-full border whitespace-nowrap transition-all shadow-xs ${
                    campusFilter === tab.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colleges Scrollable List */}
          <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
            {filteredColleges.length === 0 && filteredOther.length === 0 ? (
              <div className="p-4 text-center space-y-2">
                <p className="text-xs font-medium text-slate-500">
                  No colleges matched &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery, "Central University")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors shadow-xs"
                >
                  <span>Select &quot;{searchQuery}&quot; as custom college</span>
                </button>
              </div>
            ) : (
              <>
                {/* DU Colleges Section */}
                {filteredColleges.map((col: DUCollegeItem) => {
                  const isSelected = selectedCollege === col.name;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => handleSelect(col.name, "Delhi University")}
                      className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between text-xs transition-all hover:bg-slate-50 ${
                        isSelected ? "bg-blue-50/60 font-semibold" : "font-normal"
                      }`}
                    >
                      <div className="flex flex-col truncate pr-2">
                        <span className="truncate text-slate-900 font-medium">
                          {col.name}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-semibold border ${
                              campusBadges[col.campus] || "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {col.campus}
                          </span>
                          {col.popular && (
                            <span className="text-[9px] text-rose-600 font-semibold uppercase tracking-wider">
                              Top Aspirant Choice
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Other Central Universities */}
                {filteredOther.length > 0 && (
                  <div className="bg-slate-50/50">
                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100/70">
                      Other Prominent Central Universities
                    </div>
                    {filteredOther.map((univ) => {
                      const isSelected = selectedCollege === univ;
                      return (
                        <button
                          key={univ}
                          type="button"
                          onClick={() => handleSelect(univ, univ)}
                          className={`w-full px-3.5 py-2 text-left flex items-center justify-between text-xs transition-all hover:bg-white ${
                            isSelected ? "bg-blue-50/60 font-semibold" : "font-normal"
                          }`}
                        >
                          <span className="text-slate-800 font-medium truncate">
                            {univ}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Custom Input Bar at Bottom of Dropdown */}
          <div className="p-2.5 border-t border-slate-100 bg-white flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Or type custom college/university..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                  e.preventDefault();
                  handleSelect((e.target as HTMLInputElement).value.trim(), "Central University");
                }
              }}
              className="w-full text-xs font-normal focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
