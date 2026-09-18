"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  ArrowUp,
  FileCheck2,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (pathname.startsWith("/test/") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t-2 border-black bg-[#FAF7EE] text-black transition-all">
      {/* Upper Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Core Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF5C5C] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] shrink-0">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] absolute -top-1 -right-1 fill-[#F59E0B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-black font-sans leading-tight">
                  CUET <span className="text-[#FF5C5C]">AI-Prep</span>
                </span>
                <span className="text-[10px] font-black tracking-wider text-black/60 uppercase">
                  {t("appTagline", "NTA CBT Diagnostic Engine")}
                </span>
              </div>
            </Link>

            <p className="text-xs text-black/80 font-medium leading-relaxed max-w-sm">
              {t("footerAbout", "Purpose-built for the updated 2025/2026 zero-internal-choice CUET UG format. We calibrate 72-second pacing and expose the exact conceptual traps that turn +5s into -1s.")}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-black bg-[#D1FAE5] px-2.5 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669] stroke-[2.5]" />
                {t("patternAligned", "NTA Exam Pattern Aligned")}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-black bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
                100% NCERT Rules
              </span>
            </div>
          </div>

          {/* Col 2: Domain Tests Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-mono">
              Domain Mock Papers
            </h3>
            <ul className="space-y-2 text-xs font-bold text-black/80">
              <li>
                <Link
                  href="/test/physics"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2 flex items-center gap-1.5"
                >
                  <span>Physics (50 Compulsory Qs)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/chemistry"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2 flex items-center gap-1.5"
                >
                  <span>Chemistry (Physical & Organic)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/mathematics"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2 flex items-center gap-1.5"
                >
                  <span>Mathematics & Applied Math</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/accountancy"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2 flex items-center gap-1.5"
                >
                  <span>Accountancy (Debentures & Capital)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/business-studies"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2 flex items-center gap-1.5"
                >
                  <span>Business Studies & Management</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/economics"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2 flex items-center gap-1.5"
                >
                  <span>Economics (Micro & Macro)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/english"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2 flex items-center gap-1.5"
                >
                  <span>English Core & Grammar</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Diagnostic Tools & Radar (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-mono">
              Diagnostic Matrix
            </h3>
            <ul className="space-y-2 text-xs font-bold text-black/80">
              <li>
                <Link
                  href="/#live-demo"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2"
                >
                  Interactive Diagnostic Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2"
                >
                  72-Second Pacing Radar
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2"
                >
                  Aspirant Command Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2"
                >
                  Weekly All-India Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2"
                >
                  Academic Trophy Cabinet
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="hover:text-black hover:underline decoration-[#FF5C5C] decoration-2 underline-offset-2"
                >
                  Ranker Pass (₹499 Lifetime)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Cutoffs & System Status (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-black font-mono">
              North Campus
            </h3>
            <div className="space-y-2 text-xs font-medium text-black/80">
              <p className="leading-snug">
                Target: <strong className="text-black font-black">960+ / 1,000</strong>
              </p>
              <p className="text-[11px] text-black/60">
                (99.5+ Percentile Benchmark for SRCC, St. Stephen&apos;s, Hindu & Hansraj)
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-full py-2 px-3 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black font-black text-xs shadow-[2px_2px_0px_0px_#000] active:shadow-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Bar: Official Marking Scheme Indicators */}
      <div className="border-t-2 border-black bg-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-black">
            <FileCheck2 className="w-4 h-4 text-[#FF5C5C]" />
            <span className="font-black">Official NTA Scoring Engine:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#D1FAE5] text-black font-black border border-black shadow-[1px_1px_0px_0px_#000]">
              +5 Correct Attempt
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] font-black border border-black shadow-[1px_1px_0px_0px_#000]">
              -1 Negative Marking
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-black font-black border border-black shadow-[1px_1px_0px_0px_#000]">
              0 Unattempted
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black text-white font-black border border-black">
              250 Marks / Paper (50 Qs)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Compliance & Policies */}
      <div className="border-t-2 border-black bg-[#FAF7EE] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-black/70">
          <div>
            <span>&copy; 2025–2026 CUET AI-Prep. Built strictly for NTA CBT Candidates.</span>
          </div>

          <div className="flex items-center gap-4 text-black font-bold">
            <Link href="/#pricing" className="hover:underline">
              Pricing Policy
            </Link>
            <span>•</span>
            <Link href="/#features" className="hover:underline">
              NCERT Compliance
            </Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:underline">
              Ranker Hub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
