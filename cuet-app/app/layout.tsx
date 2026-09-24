import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "katex/dist/katex.min.css";
import { LayoutDashboard, Target, BookOpen, User, Flame, Calendar, MessageSquare, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "CUET AI Weakness Detector | India's Smartest Prep Platform",
  description: "Detect accuracy leaks, speed traps, and knowledge gaps in real-time for CUET UG.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white pb-20 md:pb-0">
        {/* Desktop & Tablet Top Navigation */}
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                C
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 block leading-tight">
                  CUET Prep <span className="text-indigo-600 font-bold">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                  Adaptive Prep Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/planner"
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50/90 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-indigo-600" />
                Study Planner
              </Link>
              <Link
                href="/weakness"
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <Target className="w-4 h-4 text-slate-500" />
                Weakness Detector
              </Link>
              <Link
                href="/chat"
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                DoubtBot
              </Link>
              <Link
                href="/analysis/history"
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                Mock Reports
              </Link>
              <Link
                href="/practice/4"
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Practice Hub
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>5 Day Streak</span>
              </div>

              <Link
                href="/dashboard"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Student Profile"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-200">
                  AS
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Viewport */}
        <main className="flex-1 w-full">{children}</main>

        {/* Mobile Bottom Tab Navigation (Fixed for 360px+ screens) */}
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg px-1 py-1 flex justify-around items-center h-16 safe-area-bottom"
        >
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center w-full py-1 text-[10px] font-medium text-slate-500 hover:text-indigo-600 active:scale-95 transition-all min-h-[44px]"
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>Home</span>
          </Link>

          <Link
            href="/planner"
            className="flex flex-col items-center justify-center w-full py-1 text-[10px] font-bold text-indigo-600 active:scale-95 transition-all min-h-[44px]"
          >
            <div className="relative">
              <Calendar className="w-5 h-5 mb-0.5 text-indigo-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span>Planner</span>
          </Link>

          <Link
            href="/weakness"
            className="flex flex-col items-center justify-center w-full py-1 text-[10px] font-medium text-slate-500 hover:text-indigo-600 active:scale-95 transition-all min-h-[44px]"
          >
            <Target className="w-5 h-5 mb-0.5" />
            <span>Weakness</span>
          </Link>

          <Link
            href="/chat"
            className="flex flex-col items-center justify-center w-full py-1 text-[10px] font-medium text-slate-500 hover:text-indigo-600 active:scale-95 transition-all min-h-[44px]"
          >
            <MessageSquare className="w-5 h-5 mb-0.5" />
            <span>DoubtBot</span>
          </Link>

          <Link
            href="/practice/4"
            className="flex flex-col items-center justify-center w-full py-1 text-[10px] font-medium text-slate-500 hover:text-indigo-600 active:scale-95 transition-all min-h-[44px]"
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span>Practice</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}
