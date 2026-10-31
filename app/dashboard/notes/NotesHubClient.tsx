"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  ArrowRight,
  Layers,
  GraduationCap,
  Briefcase,
  Globe2,
  Atom,
} from "lucide-react";
import { TaxonomySubject } from "@/lib/notes/taxonomy";

interface Props {
  subjects: TaxonomySubject[];
}

const STREAM_MAPPING: Record<string, string[]> = {
  science: ["physics", "chemistry", "maths", "bio", "applied-maths"],
  commerce: ["accountancy", "eco", "bst", "entrepreneurship"],
  humanities: [
    "history",
    "pol science",
    "geo",
    "psychology",
    "sociology",
    "legal studies",
    "anthropology",
    "home-science",
    "mass-comm",
    "fine-arts",
    "performing-arts",
  ],
  general: ["english", "hindi", "general-test"],
};

export function NotesHubClient({ subjects }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState<string>("all");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      // 1. Stream filter
      if (selectedStream !== "all") {
        const allowed = STREAM_MAPPING[selectedStream] || [];
        if (!allowed.includes(s.folder.toLowerCase())) {
          return false;
        }
      }

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesCode = s.code.toLowerCase().includes(q);
        const matchesTopic = s.units.some((u) =>
          u.topics.some((t) => t.title.toLowerCase().includes(q))
        );
        const matchesUnit = s.units.some((u) => u.unitTitle.toLowerCase().includes(q));

        return matchesName || matchesCode || matchesTopic || matchesUnit;
      }

      return true;
    });
  }, [subjects, selectedStream, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search & Stream Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Stream Filter Pills matching Warm Redesign */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FEF1E0] rounded-2xl border border-[#F6D3AF] self-stretch sm:self-auto">
          {[
            { id: "all", label: "All Subjects", icon: Layers },
            { id: "science", label: "Science", icon: Atom },
            { id: "commerce", label: "Commerce", icon: Briefcase },
            { id: "humanities", label: "Humanities", icon: Globe2 },
            { id: "general", label: "General & Lang", icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedStream === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStream(tab.id)}
                className={`flex items-center px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#9F3014] shadow-xs font-bold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search topics, units, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#EFE6DC] rounded-xl text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C] transition shadow-xs"
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => {
          const isPhysics = sub.folder.toLowerCase() === "physics";
          const firstTopic = sub.units[0]?.topics[0];

          return (
            <div
              key={sub.folder}
              className="bg-white rounded-3xl p-6 border border-[#EFE6DC] shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    Code {sub.code}
                  </span>
                  {isPhysics ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FEF1E0] text-[#9F3014] border border-[#F6D3AF]">
                      16 Notes Ready
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-50 text-stone-500">
                      Curated Syllabus
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#C2410C] transition">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {sub.units.length} Syllabus Units • {sub.totalTopics} High-Yield Topics
                  </p>
                </div>

                {/* Sample Topics List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Units & Topics
                  </span>
                  <div className="space-y-1">
                    {sub.units.slice(0, 3).map((u) => (
                      <div
                        key={u.unitNumber}
                        className="text-xs text-stone-700 flex items-center justify-between"
                      >
                        <span className="truncate pr-2">
                          Unit {u.unitNumber}: {u.unitTitle}
                        </span>
                        <span className="text-[10px] text-stone-400 flex-shrink-0">
                          {u.topics.length} topic{u.topics.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                    {sub.units.length > 3 && (
                      <div className="text-[11px] text-stone-400 italic">
                        +{sub.units.length - 3} more units...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#EFE6DC] flex items-center justify-between gap-3">
                <Link
                  href={`/dashboard/notes/${sub.folder}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-white hover:bg-[#FFF8F0] border border-[#EFE6DC] text-stone-700 font-semibold text-xs transition"
                >
                  View All Units
                </Link>

                {firstTopic && (
                  <Link
                    href={`/dashboard/notes/${sub.folder}/${firstTopic.slug}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold text-xs transition shadow-xs inline-flex items-center justify-center gap-1"
                  >
                    <span>Read Free</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No subjects found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or select &ldquo;All Subjects&rdquo; from the stream filter.
          </p>
        </div>
      )}
    </div>
  );
}
