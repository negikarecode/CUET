"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  ChevronRight,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Briefcase,
  TrendingUp,
  ScrollText,
  Landmark,
  Globe,
  BrainCircuit,
  Users,
  Activity,
  Laptop,
  Home,
  Tv,
  Leaf,
  Palette,
  Sprout,
  Footprints,
  FileText,
  Layers,
} from "lucide-react";
import practiceManifest from "@/lib/data/practice_test_manifest.json";

type StreamKey = "all" | "science" | "commerce" | "humanities" | "applied";

interface SubjectItem {
  id: string;
  name: string;
  code: string;
  stream: StreamKey;
  unitsCount: number;
  totalTests: number;
  totalQuestions: number;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
}

const SUBJECT_STREAM_MAP: Record<string, { stream: StreamKey; icon: any; accentColor: string; badgeBg: string }> = {
  physics: { stream: "science", icon: Atom, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  chemistry: { stream: "science", icon: FlaskConical, accentColor: "#7C3AED", badgeBg: "#EDE9FE" },
  maths: { stream: "science", icon: Calculator, accentColor: "#2563EB", badgeBg: "#DBEAFE" },
  bio: { stream: "science", icon: Dna, accentColor: "#059669", badgeBg: "#D1FAE5" },
  accountancy: { stream: "commerce", icon: Calculator, accentColor: "#D97706", badgeBg: "#FEF3C7" },
  eco: { stream: "commerce", icon: TrendingUp, accentColor: "#0D9488", badgeBg: "#CCFBF1" },
  bst: { stream: "commerce", icon: Briefcase, accentColor: "#4F46E5", badgeBg: "#E0E7FF" },
  history: { stream: "humanities", icon: ScrollText, accentColor: "#B45309", badgeBg: "#FEF3C7" },
  "pol science": { stream: "humanities", icon: Landmark, accentColor: "#DC2626", badgeBg: "#FEE2E2" },
  geo: { stream: "humanities", icon: Globe, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  psychology: { stream: "humanities", icon: BrainCircuit, accentColor: "#9333EA", badgeBg: "#F3E8FF" },
  sociology: { stream: "humanities", icon: Users, accentColor: "#EA580C", badgeBg: "#FFEDD5" },
  physical_education: { stream: "applied", icon: Activity, accentColor: "#16A34A", badgeBg: "#DCFCE7" },
  computer_science: { stream: "science", icon: Laptop, accentColor: "#0284C7", badgeBg: "#E0F2FE" },
  home_science: { stream: "applied", icon: Home, accentColor: "#DB2777", badgeBg: "#FCE7F3" },
  mass_media: { stream: "applied", icon: Tv, accentColor: "#6366F1", badgeBg: "#EEF2FF" },
  environmental_studies: { stream: "applied", icon: Leaf, accentColor: "#059669", badgeBg: "#D1FAE5" },
  fine_arts: { stream: "applied", icon: Palette, accentColor: "#CA8A04", badgeBg: "#FEF08A" },
  agriculture: { stream: "applied", icon: Sprout, accentColor: "#15803D", badgeBg: "#DCFCE7" },
  anthropology: { stream: "humanities", icon: Footprints, accentColor: "#854D0E", badgeBg: "#FEF9C3" },
  english: { stream: "applied", icon: FileText, accentColor: "#2563EB", badgeBg: "#DBEAFE" },
  "general-test": { stream: "applied", icon: Layers, accentColor: "#7C3AED", badgeBg: "#EDE9FE" },
};

export default function PracticeTestsHubPage() {
  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const subjectsList: SubjectItem[] = useMemo(() => {
    return Object.entries(practiceManifest).map(([folder, data]: [string, any]) => {
      const meta = SUBJECT_STREAM_MAP[folder] || {
        stream: "applied" as StreamKey,
        icon: BookOpen,
        accentColor: "#2563EB",
        badgeBg: "#DBEAFE",
      };
      const unitsCount = data.units.length;
      return {
        id: folder,
        name: data.name,
        code: data.code,
        stream: meta.stream,
        unitsCount,
        totalTests: unitsCount * 20,
        totalQuestions: unitsCount * 400,
        icon: meta.icon,
        accentColor: meta.accentColor,
        badgeBg: meta.badgeBg,
      };
    });
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjectsList.filter((s) => {
      const matchesStream = selectedStream === "all" || s.stream === selectedStream;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.includes(searchQuery) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStream && matchesSearch;
    });
  }, [subjectsList, selectedStream, searchQuery]);

  const totalTestsAcrossAll = useMemo(() => {
    return subjectsList.reduce((acc, s) => acc + s.totalTests, 0);
  }, [subjectsList]);

  const totalQuestionsAcrossAll = useMemo(() => {
    return subjectsList.reduce((acc, s) => acc + s.totalQuestions, 0);
  }, [subjectsList]);

  return (
    <div className="w-full min-w-0 max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Unit-Wise Practice Drills</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            CUET UG Unit Practice Tests
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Targeted 20-question unit drills calibrated with authentic CUET UG past paper trends and official NTA CBT interface. Every syllabus unit has 20 dedicated tests (400 questions per unit).
          </p>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Subjects</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">{subjectsList.length}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Syllabus Units</p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">155</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Practice Tests</p>
            <p className="text-xl sm:text-2xl font-extrabold text-blue-600 mt-0.5">{totalTestsAcrossAll.toLocaleString()}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Questions</p>
            <p className="text-xl sm:text-2xl font-extrabold text-indigo-600 mt-0.5">{totalQuestionsAcrossAll.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Stream Pills */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-100/80 border border-slate-200/60 overflow-x-auto max-w-full">
          {(
            [
              { key: "all", label: "All Subjects" },
              { key: "science", label: "Science" },
              { key: "commerce", label: "Commerce" },
              { key: "humanities", label: "Humanities" },
              { key: "applied", label: "Languages & General" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedStream(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedStream === tab.key
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search subject or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((s) => {
          const IconComp = s.icon;
          const urlSlug = encodeURIComponent(s.id);
          return (
            <Link
              key={s.id}
              href={`/dashboard/practice/${urlSlug}`}
              className="group bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: s.badgeBg, color: s.accentColor }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono bg-slate-100 text-slate-600 border border-slate-200/60">
                    Code {s.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {s.unitsCount} syllabus units • 20 practice tests per unit
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    {s.totalTests} Tests
                  </span>
                  <span>•</span>
                  <span>{s.totalQuestions} Questions</span>
                </div>
                <div className="inline-flex items-center gap-1 text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No matching subjects found</h3>
          <p className="text-xs text-slate-400">Try modifying your search query or switching streams.</p>
        </div>
      )}
    </div>
  );
}
