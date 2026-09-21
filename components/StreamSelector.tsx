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
    <section id="stream-matrix" className="py-16 bg-[#FAF7EE] border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EEF2FF] text-black text-xs font-black uppercase tracking-wider mb-3 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5] fill-[#4F46E5]" />
              {t("domainStreams", "Stream-Specific Mock Repository")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              {t("selectExamStream", "Select Your Examination Stream")}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-black/70 max-w-2xl font-medium">
              NTA CUET domain subjects structured with official shift papers, full-length CBT tests, and chapter-wise difficulty tags.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-black text-black">
            Showing <span className="bg-white px-2 py-1 rounded border-2 border-black shadow-[1px_1px_0px_0px_#000]">{currentSubjects.length} Domain Subjects</span>
          </div>
        </div>

        {/* Stream Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 bg-white rounded-xl border-2 border-black mb-10 shadow-[3px_3px_0px_0px_#000]">
          {streams.map((stream) => {
            const isActive = activeStream === stream.id;
            return (
              <button
                key={stream.id}
                type="button"
                onClick={() => setSelectedStream(stream.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg font-black transition-all text-center border-2 border-black ${
                  isActive
                    ? "bg-[#FF5C5C] text-white shadow-[3px_3px_0px_0px_#000] scale-[1.01]"
                    : "bg-[#FAF7EE] text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FEF3C7] hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg tracking-tight font-black">
                    {stream.label}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border border-black ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-white text-black"
                    }`}
                  >
                    {stream.tag}
                  </span>
                </div>
                <span
                  className={`mt-1 text-xs font-bold line-clamp-1 ${
                    isActive ? "text-white/90" : "text-black/60"
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
                className="flex flex-col justify-between bg-white rounded-xl border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-black text-black bg-[#FAF7EE] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_0px_#000]" translate="no">
                      Code: {subj.code}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-black tracking-tight group-hover:text-[#FF5C5C] transition-colors">
                    {t(subj.id.toLowerCase().replace(/-/g, ""), subj.name)}
                  </h3>

                  <p className="mt-2 text-xs text-black/70 line-clamp-2 leading-relaxed font-medium">
                    {subj.description}
                  </p>

                  {/* Badges */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-black">
                    <span className="inline-flex items-center gap-1 bg-[#FAF7EE] border border-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#000]">
                      <Timer className="w-3 h-3 text-black" />
                      {subj.durationMinutes} Mins
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#FAF7EE] border border-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#000]">
                      <BookMarked className="w-3 h-3 text-black" />
                      {t("compulsoryBadge", "50 Compulsory Questions")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-black/10">
                  <Link
                    href="/dashboard/mocks"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] active:bg-[#E03E3E] text-white border-2 border-black font-black text-xs tracking-wide transition-all shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <span>{t("startTest", "Launch Free Official PYQ Mock")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <p className="text-[10px] text-center text-black/50 mt-2 font-bold">
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

