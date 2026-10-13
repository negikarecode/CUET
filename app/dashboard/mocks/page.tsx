"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Atom,
  FlaskConical,
  Binary,
  Dna,
  Calculator,
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
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Clock,
} from "lucide-react";

type SubjectKey =
  | "all"
  | "physics"
  | "chemistry"
  | "mathematics"
  | "biology"
  | "accountancy"
  | "business-studies"
  | "economics"
  | "history"
  | "political-science"
  | "geography"
  | "psychology"
  | "sociology"
  | "physical-education"
  | "computer-science"
  | "home-science"
  | "mass-media"
  | "environmental-studies"
  | "fine-arts"
  | "agriculture"
  | "anthropology";

type StreamKey = "all" | "science" | "commerce" | "humanities";

interface SubjectMeta {
  key: SubjectKey;
  name: string;
  code: string;
  isLive: boolean;
  durationMinutes: number;
  totalQuestions: number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StreamInfo {
  key: StreamKey;
  name: string;
  shortName: string;
  badge: string;
  accentBg: string;
  accentText: string;
  subjects: Array<Exclude<SubjectKey, "all">>;
}

const STREAM_CONFIGS: Record<Exclude<StreamKey, "all">, StreamInfo> = {
  science: {
    key: "science",
    name: "Science Stream",
    shortName: "Science",
    badge: "7 Domains",
    accentBg: "#E0F2FE",
    accentText: "#0369A1",
    subjects: [
      "physics",
      "chemistry",
      "mathematics",
      "biology",
      "computer-science",
      "environmental-studies",
      "agriculture",
    ],
  },
  commerce: {
    key: "commerce",
    name: "Commerce Stream",
    shortName: "Commerce",
    badge: "4 Domains",
    accentBg: "#FEF3C7",
    accentText: "#92400E",
    subjects: [
      "accountancy",
      "business-studies",
      "economics",
      "mathematics",
    ],
  },
  humanities: {
    key: "humanities",
    name: "Humanities & Arts",
    shortName: "Humanities",
    badge: "10 Domains",
    accentBg: "#FCE7F3",
    accentText: "#9D174D",
    subjects: [
      "history",
      "political-science",
      "geography",
      "psychology",
      "sociology",
      "physical-education",
      "home-science",
      "mass-media",
      "fine-arts",
      "anthropology",
    ],
  },
};

const SUBJECT_CONFIGS: Record<Exclude<SubjectKey, "all">, SubjectMeta> = {
  physics: {
    key: "physics",
    name: "Physics",
    code: "322",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Electrostatics, Optics, Magnetism & Modern Physics",
    icon: Atom,
  },
  chemistry: {
    key: "chemistry",
    name: "Chemistry",
    code: "306",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Physical, Inorganic & Organic Chemistry",
    icon: FlaskConical,
  },
  mathematics: {
    key: "mathematics",
    name: "Mathematics",
    code: "319",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Calculus, Algebra, Vectors & 3D Geometry",
    icon: Binary,
  },
  biology: {
    key: "biology",
    name: "Biology",
    code: "304",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Genetics, Ecology, Physiology & Biotechnology",
    icon: Dna,
  },
  accountancy: {
    key: "accountancy",
    name: "Accountancy",
    code: "301",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Partnership, Company Accounts & Financial Analysis",
    icon: Calculator,
  },
  "business-studies": {
    key: "business-studies",
    name: "Business Studies",
    code: "305",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Principles of Management, Marketing & Finance",
    icon: Briefcase,
  },
  economics: {
    key: "economics",
    name: "Economics",
    code: "309",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Microeconomics, Macroeconomics & Indian Economy",
    icon: TrendingUp,
  },
  history: {
    key: "history",
    name: "History",
    code: "314",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Ancient, Medieval & Modern Indian History",
    icon: ScrollText,
  },
  "political-science": {
    key: "political-science",
    name: "Political Science",
    code: "323",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Contemporary World Politics & Politics in India",
    icon: Landmark,
  },
  geography: {
    key: "geography",
    name: "Geography",
    code: "313",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Human Geography, India: People & Economy",
    icon: Globe,
  },
  psychology: {
    key: "psychology",
    name: "Psychology",
    code: "324",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Psychological Attributes, Self & Personality",
    icon: BrainCircuit,
  },
  sociology: {
    key: "sociology",
    name: "Sociology",
    code: "326",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Indian Society & Social Change in India",
    icon: Users,
  },
  "physical-education": {
    key: "physical-education",
    name: "Physical Education",
    code: "321",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Management of Sporting Events, Yoga & Nutrition",
    icon: Activity,
  },
  "computer-science": {
    key: "computer-science",
    name: "Computer Science / IP",
    code: "308",
    isLive: true,
    durationMinutes: 60,
    totalQuestions: 50,
    subtitle: "Computational Thinking, SQL & Computer Networks",
    icon: Laptop,
  },
  "home-science": {
    key: "home-science",
    name: "Home Science",
    code: "315",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Human Development, Nutrition, Resource Management",
    icon: Home,
  },
  "mass-media": {
    key: "mass-media",
    name: "Mass Media & Communication",
    code: "318",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Communication Concepts, Journalism & Digital Media",
    icon: Tv,
  },
  "environmental-studies": {
    key: "environmental-studies",
    name: "Environmental Science",
    code: "307",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Ecology, Sustainable Development & Environmental Issues",
    icon: Leaf,
  },
  "fine-arts": {
    key: "fine-arts",
    name: "Fine Arts / Visual Arts",
    code: "312",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Painting, Graphics, Sculpture & Applied Art",
    icon: Palette,
  },
  agriculture: {
    key: "agriculture",
    name: "Agriculture",
    code: "302",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Agronomy, Soil Science & Plant Genetics",
    icon: Sprout,
  },
  anthropology: {
    key: "anthropology",
    name: "Anthropology",
    code: "303",
    isLive: true,
    durationMinutes: 45,
    totalQuestions: 50,
    subtitle: "Physical Anthropology, Cultural & Social Anthropology",
    icon: Footprints,
  },
};

export default function MocksPage() {
  const [selectedStream, setSelectedStream] = useState<StreamKey>("all");
  const [selectedTab, setSelectedTab] = useState<SubjectKey>("all");

  const activeSubjectInfo = selectedTab !== "all" ? SUBJECT_CONFIGS[selectedTab] : null;

  const handleSelectStream = (stream: StreamKey) => {
    setSelectedStream(stream);
    setSelectedTab("all");
  };

  const handleSelectSubject = (subjKey: SubjectKey, streamKey?: StreamKey) => {
    setSelectedTab(subjKey);
    if (streamKey) {
      setSelectedStream(streamKey);
    } else if (subjKey !== "all") {
      for (const [stKey, stInfo] of Object.entries(STREAM_CONFIGS)) {
        if (stInfo.subjects.includes(subjKey as any)) {
          setSelectedStream(stKey as StreamKey);
          break;
        }
      }
    } else {
      setSelectedStream("all");
    }
  };

  const displayedSubjects = useMemo(() => {
    if (selectedTab !== "all" && activeSubjectInfo) {
      return [activeSubjectInfo];
    }
    if (selectedStream !== "all") {
      return STREAM_CONFIGS[selectedStream].subjects.map((k) => SUBJECT_CONFIGS[k]);
    }
    return Object.values(SUBJECT_CONFIGS);
  }, [selectedStream, selectedTab, activeSubjectInfo]);

  const availableSubjectsForDropdown = useMemo(() => {
    if (selectedStream === "all") {
      return Object.values(SUBJECT_CONFIGS);
    }
    return STREAM_CONFIGS[selectedStream].subjects.map((k) => SUBJECT_CONFIGS[k]);
  }, [selectedStream]);

  return (
    <div className="w-full min-w-0 max-w-[1120px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-semibold text-[var(--text)] leading-[1.25]">
          Domain Mock Assessments
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
          Official NTA CUET UG domain examination specifications, syllabus coverage, and verified practice papers.
        </p>
      </div>

      {/* Stream & Subject Dropdown Controls */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Select Stream */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
              Filter by Stream:
            </label>
            <div className="relative">
              <select
                value={selectedStream}
                onChange={(e) => handleSelectStream(e.target.value as StreamKey)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-sm px-4 py-3 rounded-2xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-10 transition-all"
              >
                <option value="all">All Domain Streams (20 Subjects)</option>
                <option value="science">Science Stream (7 Subjects)</option>
                <option value="commerce">Commerce Stream (4 Subjects)</option>
                <option value="humanities">Humanities & Arts (10 Subjects)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Select Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
              Filter by Subject:
            </label>
            <div className="relative">
              <select
                value={selectedTab}
                onChange={(e) => handleSelectSubject(e.target.value as SubjectKey)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 text-slate-800 font-semibold text-sm px-4 py-3 rounded-2xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer appearance-none pr-10 transition-all"
              >
                <option value="all">
                  {selectedStream === "all"
                    ? "All 20 Domain Subjects"
                    : `All Subjects in ${STREAM_CONFIGS[selectedStream].name} (${STREAM_CONFIGS[selectedStream].subjects.length} Subjects)`}
                </option>
                {selectedStream === "all" ? (
                  <>
                    <optgroup label="Science Stream">
                      {STREAM_CONFIGS.science.subjects.map((k) => (
                        <option key={`sci-${k}`} value={k}>
                          {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Commerce Stream">
                      {STREAM_CONFIGS.commerce.subjects.map((k) => (
                        <option key={`com-${k}`} value={k}>
                          {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Humanities & Arts Stream">
                      {STREAM_CONFIGS.humanities.subjects.map((k) => (
                        <option key={`hum-${k}`} value={k}>
                          {SUBJECT_CONFIGS[k].name} (Code {SUBJECT_CONFIGS[k].code})
                        </option>
                      ))}
                    </optgroup>
                  </>
                ) : (
                  availableSubjectsForDropdown.map((sub) => (
                    <option key={sub.key} value={sub.key}>
                      {sub.name} (Code {sub.code})
                    </option>
                  ))
                )}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Domain Subjects Overview Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {selectedTab !== "all" && activeSubjectInfo
              ? `${activeSubjectInfo.name} Domain Specification`
              : selectedStream !== "all"
              ? `${STREAM_CONFIGS[selectedStream].name} (${displayedSubjects.length} Domains)`
              : `All CUET UG Domain Subjects (${displayedSubjects.length})`}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          {displayedSubjects.map((sub) => {
            const Icon = sub.icon;
            return (
              <div
                key={sub.key}
                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 min-w-0"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-blue-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono">
                      Code {sub.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {sub.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-2">
                      {sub.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sub.durationMinutes} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sub.totalQuestions} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium col-span-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>NTA Marking: +5 / -1</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/dashboard/pyqs?subject=${sub.key}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all text-center"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Official PYQs</span>
                  </Link>
                  <Link
                    href={`/dashboard/radar?subject=${sub.key}`}
                    className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all text-center"
                  >
                    <span>Diagnostics</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
