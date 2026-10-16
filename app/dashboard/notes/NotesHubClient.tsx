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
        {/* Stream Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 self-stretch sm:self-auto">
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
                className={`flex items-center px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
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
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics, units, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition shadow-sm"
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
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Code {sub.code}
                  </span>
                  {isPhysics ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      16 Notes Ready
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      Curated Syllabus
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {sub.units.length} Syllabus Units • {sub.totalTopics} High-Yield Topics
                  </p>
                </div>

                {/* Sample Topics List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Units & Topics
                  </span>
                  <div className="space-y-1">
                    {sub.units.slice(0, 3).map((u) => (
                      <div
                        key={u.unitNumber}
                        className="text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between"
                      >
                        <span className="truncate pr-2">
                          Unit {u.unitNumber}: {u.unitTitle}
                        </span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {u.topics.length} topic{u.topics.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                    {sub.units.length > 3 && (
                      <div className="text-[11px] text-slate-400 italic">
                        +{sub.units.length - 3} more units...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <Link
                  href={`/dashboard/notes/${sub.folder}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition"
                >
                  View All Units
                </Link>

                {firstTopic && (
                  <Link
                    href={`/dashboard/notes/${sub.folder}/${firstTopic.slug}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition shadow-sm inline-flex items-center justify-center"
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
