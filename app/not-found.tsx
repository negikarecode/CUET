import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Compass,
  FileText,
  ClipboardCheck,
  Home,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | CUET AI-Prep",
  description: "The requested CUET UG examination paper, mock test, or diagnostic resource could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      {/* Top Header with Clickable Logo */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200/80">
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="CUET AI-Prep Homepage"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <GraduationCap className="w-5 h-5 stroke-[2]" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 fill-amber-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              CUET <span className="text-blue-600">AI-Prep</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              NTA CBT Diagnostic Platform
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-slate-500" />
          <span>Homepage</span>
        </Link>
      </header>

      {/* Main 404 Hero Card */}
      <main className="max-w-xl mx-auto w-full my-auto py-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 text-center space-y-6">
          {/* 404 Badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-mono font-black text-3xl shadow-xs">
              404
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xs">
              <Compass className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Heading & Details */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Exam Paper or Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              The mock test, official past paper, or diagnostic view you requested does not exist or may have been relocated.
            </p>
          </div>

          {/* Primary Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
            <Link
              href="/"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Home className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Platform Home
                </strong>
                <span className="text-[11px] text-slate-500 truncate block">
                  Pattern, Syllabus &amp; Pricing
                </span>
              </div>
            </Link>

            <Link
              href="/dashboard/mocks"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Mock Tests Hub
                </strong>
                <span className="text-[11px] text-slate-500 truncate block">
                  50 Compulsory Questions
                </span>
              </div>
            </Link>

            <Link
              href="/dashboard/pyqs"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  251 Shift PYQs Vault
                </strong>
                <span className="text-[11px] text-slate-500 truncate block">
                  Official Papers 2022–2025
                </span>
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <strong className="block text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Aspirant Command Hub
                </strong>
                <span className="text-[11px] text-slate-500 truncate block">
                  Target College &amp; Standings
                </span>
              </div>
            </Link>
          </div>

          {/* Helpdesk & Support Callout */}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
            <p className="flex items-center justify-center gap-1.5 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Need help finding a question paper? Contact support:</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
              >
                <span>Academic Help Desk</span>
              </Link>
              <span>•</span>
              <a
                href="mailto:support@cuetprep.com"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>support@cuetprep.com</span>
              </a>
              <span>•</span>
              <a
                href="tel:01140759000"
                className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>011-40759000</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-400 pt-6">
        <span>&copy; {new Date().getFullYear()} CUET AI-Prep. Built strictly for NTA CBT Candidates.</span>
      </footer>
    </div>
  );
}
