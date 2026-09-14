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
    "North Campus": "bg-[#FEF3C7] text-black border-black",
    "South Campus": "bg-[#D1FAE5] text-[#065F46] border-black",
    "Off Campus": "bg-[#E0F2FE] text-[#0369A1] border-black",
    "Specialized Institution": "bg-[#F3E8FF] text-[#6B21A8] border-black",
  };

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      {label && (
        <label className="text-xs font-black uppercase tracking-wider text-black flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#FF5C5C]" />
            <span>{label}</span>
          </span>
          <span className="text-[10px] text-black/60 font-mono">
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
        className="w-full px-3 py-2 rounded-lg border-2 border-black bg-[#FAF7EE] hover:bg-white text-black font-bold text-xs sm:text-sm flex items-center justify-between shadow-[2px_2px_0px_0px_#000] cursor-pointer transition-all"
      >
        <div className="flex items-center gap-2 truncate">
          <Building2 className="w-4 h-4 shrink-0 text-black/60" />
          <span className={selectedCollege ? "text-black font-black truncate" : "text-black/50"}>
            {selectedCollege || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#000] overflow-hidden flex flex-col max-h-72 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input Box */}
          <div className="p-2.5 border-b-2 border-black bg-[#FAF7EE] space-y-2">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-black/50 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search college name, acronym (e.g. SRCC, Hindu)..."
                className="w-full pl-8 pr-7 py-1.5 text-xs font-bold bg-white border-2 border-black rounded-md focus:outline-none placeholder:text-black/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 p-0.5 rounded text-black/60 hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Campus Quick-Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-black no-scrollbar">
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
                  className={`px-2 py-0.5 rounded-full border whitespace-nowrap transition-all ${
                    campusFilter === tab.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-black/70 border-black/30 hover:border-black hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colleges Scrollable List */}
          <div className="overflow-y-auto divide-y divide-black/10 flex-1">
            {filteredColleges.length === 0 && filteredOther.length === 0 ? (
              <div className="p-4 text-center space-y-2">
                <p className="text-xs font-bold text-black/70">
                  No colleges matched &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery, "Central University")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FEF3C7] border border-black text-xs font-black text-black hover:bg-[#FDE68A]"
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
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-all hover:bg-[#FAF7EE] ${
                        isSelected ? "bg-[#D1FAE5]/60 font-black" : "font-medium"
                      }`}
                    >
                      <div className="flex flex-col truncate pr-2">
                        <span className="truncate text-black font-bold">
                          {col.name}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-black border ${
                              campusBadges[col.campus] || "bg-gray-100 text-black border-black"
                            }`}
                          >
                            {col.campus}
                          </span>
                          {col.popular && (
                            <span className="text-[9px] text-[#DC2626] font-black uppercase tracking-wider">
                              Top Aspirant Choice
                            </span>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 border border-black shadow-[1px_1px_0px_0px_#000]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Other Central Universities */}
                {filteredOther.length > 0 && (
                  <div className="bg-[#FAF7EE]/50">
                    <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black/50 bg-[#FAF7EE]">
                      Other Prominent Central Universities
                    </div>
                    {filteredOther.map((univ) => {
                      const isSelected = selectedCollege === univ;
                      return (
                        <button
                          key={univ}
                          type="button"
                          onClick={() => handleSelect(univ, univ)}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-all hover:bg-white ${
                            isSelected ? "bg-[#D1FAE5]/60 font-black" : "font-medium"
                          }`}
                        >
                          <span className="text-black font-bold truncate">
                            {univ}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 border border-black">
                              <Check className="w-3 h-3 stroke-[3]" />
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
          <div className="p-2 border-t border-black bg-white flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-black/50 shrink-0" />
            <input
              type="text"
              placeholder="Or type custom college/university..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                  e.preventDefault();
                  handleSelect((e.target as HTMLInputElement).value.trim(), "Central University");
                }
              }}
              className="w-full text-xs font-medium focus:outline-none placeholder:text-black/40"
            />
          </div>
        </div>
      )}
    </div>
  );
}
