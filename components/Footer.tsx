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

  if (pathname === "/" || pathname.startsWith("/test/") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-800 transition-all">
      {/* Upper Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Core Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs shrink-0">
                <GraduationCap className="w-5 h-5 stroke-[2]" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 fill-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans leading-tight">
                  CUET <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI-Prep</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                  {t("appTagline", "NTA CBT Diagnostic Engine")}
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-sm">
              {t("footerAbout", "Purpose-built for the updated 2025/2026 zero-internal-choice CUET UG format. We calibrate 72-second pacing and expose the exact conceptual traps that turn +5s into -1s.")}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[2]" />
                {t("patternAligned", "NTA Exam Pattern Aligned")}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 shadow-xs">
                100% NCERT Rules
              </span>
            </div>
          </div>

          {/* Col 2: Mock Tests & PYQs Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Mock Tests & PYQs
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-500">
              <li>
                <Link
                  href="/test/physics"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Physics (50 Compulsory Qs)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/chemistry"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Chemistry (Physical & Organic)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/mathematics"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Mathematics & Applied Math</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/accountancy"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Accountancy (Debentures & Capital)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/business-studies"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Business Studies & Management</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/economics"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>Economics (Micro & Macro)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/test/english"
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  <span>English Core & Grammar</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Diagnostic Tools & Radar (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Diagnostic Matrix
            </h3>
            <ul className="space-y-2 text-xs font-medium text-slate-500">
              <li>
                <Link
                  href="/#live-demo"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Interactive Diagnostic Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-indigo-600 transition-colors"
                >
                  72-Second Pacing Radar
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Aspirant Command Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Weekly All-India Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/radar"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Subject Weakness Radar
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Ranker Pass (₹499 Lifetime)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Cutoffs & System Status (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              North Campus
            </h3>
            <div className="space-y-2 text-xs font-normal text-slate-600">
              <p className="leading-snug">
                Target: <strong className="text-slate-900 font-semibold">960+ / 1,000</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                (99.5+ Percentile Benchmark for SRCC, St. Stephen&apos;s, Hindu & Hansraj)
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Bar: Official Marking Scheme Indicators */}
      <div className="border-t border-slate-200/80 bg-slate-50/70 py-3.5 sm:py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <FileCheck2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-semibold text-xs">Official NTA Scoring Engine:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/60 shadow-xs">
              +5 Correct Attempt
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 font-semibold border border-rose-200/60 shadow-xs">
              -1 Negative Marking
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200 shadow-xs">
              0 Unattempted
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white font-semibold shadow-xs">
              250 Marks / Paper (50 Qs)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Compliance & Policies */}
      <div className="border-t border-slate-200/80 bg-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-slate-400">
          <div>
            <span>&copy; 2025–2026 CUET AI-Prep. Built strictly for NTA CBT Candidates.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <Link href="/#pricing" className="hover:text-slate-900 transition-colors">
              Pricing Policy
            </Link>
            <span>•</span>
            <Link href="/#features" className="hover:text-slate-900 transition-colors">
              NCERT Compliance
            </Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
              Ranker Hub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
