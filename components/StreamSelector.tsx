"use client";

import React from "react";
import Link from "next/link";
import {
  Atom,
  FlaskConical,
  Binary,
  Dna,
  Calculator,
  Briefcase,
  TrendingUp,
  Percent,
  Landmark,
  ScrollText,
  Globe,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  BookMarked,
  Timer,
} from "lucide-react";
import { CUET_SUBJECTS } from "@/lib/data/subjects";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { StreamType } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Atom,
  FlaskConical,
  Binary,
  Dna,
  Calculator,
  Briefcase,
  TrendingUp,
  Percent,
  Landmark,
  ScrollText,
  Globe,
  BrainCircuit,
};

export default function StreamSelector() {
  const { t } = useTranslation();
  const isClient = useIsClient();
  const selectedStream = useTestStore((state) => state.selectedStream);
  const setSelectedStream = useTestStore((state) => state.setSelectedStream);

  // Safe fallback during SSR
  const activeStream: StreamType = isClient ? selectedStream : "science";

  const streams: { id: StreamType; label: string; tag: string; description: string }[] = [
    {
      id: "science",
      label: t("scienceStream", "Science"),
      tag: "PCM / PCB",
      description: "Physics, Chemistry, Maths & Biology with formula diagnostics",
    },
    {
      id: "commerce",
      label: t("commerceStream", "Commerce"),
      tag: "Accounts & B.St",
      description: "Accountancy, Business Studies, Economics & Applied Mathematics",
    },
    {
      id: "humanities",
      label: t("humanitiesStream", "Humanities"),
      tag: "Arts & Social Sci",
      description: "Political Science, History, Geography & Psychology",
    },
  ];

  const currentSubjects = CUET_SUBJECTS.filter(
    (subj) => subj.stream === activeStream
  );

  return (
    <section id="stream-matrix" className="py-16 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
              {t("domainStreams", "Stream-Specific Mock Repository")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              {t("selectExamStream", "Select Your Examination Stream")}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl font-normal">
              NTA CUET domain subjects structured with official shift papers, full-length CBT tests, and chapter-wise difficulty tags.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-600">
            Showing <span className="bg-white px-2.5 py-1 rounded-xl border border-slate-200 text-slate-800 font-bold shadow-xs">{currentSubjects.length} Domain Subjects</span>
          </div>
        </div>

        {/* Stream Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2 bg-slate-100/80 rounded-2xl border border-slate-200/80 mb-10">
          {streams.map((stream) => {
            const isActive = activeStream === stream.id;
            return (
              <button
                key={stream.id}
                type="button"
                onClick={() => setSelectedStream(stream.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl font-semibold transition-all text-center ${
                  isActive
                    ? "bg-white text-slate-900 border border-slate-200/80 shadow-xs"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg tracking-tight font-bold">
                    {stream.label}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                        : "bg-slate-200/70 text-slate-600"
                    }`}
                  >
                    {stream.tag}
                  </span>
                </div>
                <span
                  className={`mt-1 text-xs line-clamp-1 ${
                    isActive ? "text-slate-600 font-medium" : "text-slate-400 font-normal"
                  }`}
                >
                  {stream.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Subjects Grid for Selected Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSubjects.map((subj) => {
            const IconComponent = ICON_MAP[subj.iconName] || BookMarked;

            return (
              <div
                key={subj.id}
                className="flex flex-col justify-between bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/60" translate="no">
                      Code: {subj.code}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {t(subj.id.toLowerCase().replace(/-/g, ""), subj.name)}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                    {subj.description}
                  </p>

                  {/* Badges */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-full shadow-xs">
                      <Timer className="w-3 h-3 text-slate-500" />
                      {subj.durationMinutes} Mins
                    </span>
                    <span className="inline-flex items-center gap-1 bg-indigo-50/70 border border-indigo-200/60 px-2.5 py-1 rounded-full text-indigo-700 shadow-xs">
                      <BookMarked className="w-3 h-3 text-indigo-600" />
                      {t("compulsoryBadge", "50 Compulsory Questions")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/dashboard/mocks"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs tracking-wide transition-all shadow-xs hover:shadow"
                  >
                    <span>{t("startTest", "Launch Free Official PYQ Mock")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <p className="text-[10px] text-center text-slate-400 mt-2 font-normal">
                    {subj.popularMockCount}+ full-length solved papers available
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

