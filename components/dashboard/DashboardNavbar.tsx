"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Zap,
  ChevronDown,
  Award,
  BookOpen,
  FileText,
  LogOut,
  Trophy,
  User,
  Search,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { createClient } from "@/lib/supabase/client";
import UpgradeButton from "@/components/payments/UpgradeButton";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function DashboardNavbar() {
  const { t } = useTranslation();
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");
  const streak = isClient && isLoggedIn ? user.dailyStreak : 1;
  const xp = isClient && isLoggedIn ? user.xpPoints : 0;
  const userName = isClient && isLoggedIn && user.name ? user.name : "CUET Aspirant";

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    logout();
    setProfileDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="hidden md:flex sticky top-0 z-30 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] items-center justify-between gap-4 transition-all select-none">
      {/* Left: Quick Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            readOnly
            onClick={() => {
              window.location.href = "/dashboard/mocks";
            }}
            placeholder="Search mock tests, topics, or subjects... (Click to browse)"
            className="w-full pl-10 pr-12 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          />
          <div className="hidden lg:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
            <kbd className="text-[10px] uppercase font-semibold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right-Aligned Student Utilities */}
      <div className="flex items-center gap-3 shrink-0">
        {/* 1. Language Selector Dropdown */}
        <LanguageSelector variant="navbar" />

        {/* 2. Daily Streak Indicator */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/60 rounded-full text-amber-800 text-xs font-semibold transition-all shadow-2xs cursor-pointer group"
          title={`${streak} Day Study Streak! Solve at least 1 mock daily to preserve streak.`}
        >
          <span className="relative flex items-center justify-center">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
          </span>
          <span className="tracking-tight font-bold text-xs">
            {streak}
          </span>
          <span className="text-amber-700/80 text-[11px] font-medium hidden lg:inline">
            {t("days", "Days")} {t("streak", "Streak")}
          </span>
        </div>

        {/* 3. XP Points Counter */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/60 rounded-full text-blue-800 text-xs font-semibold transition-all shadow-2xs cursor-pointer group"
          title={`${xp} Total Experience Points earned across mock tests and mistake diagnoses.`}
        >
          <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600 group-hover:scale-110 transition-transform" />
          <span className="font-bold tracking-tight text-xs">
            {xp.toLocaleString()}
          </span>
          <span className="text-blue-700/80 text-[11px] font-medium hidden lg:inline">
            XP
          </span>
        </div>

        {/* 4. Upgrade to Pro Button */}
        <UpgradeButton
          planId="ai_practice_pass_499"
          variant="amber"
          className="py-1.5 px-3.5 text-xs rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
          buttonText="Upgrade Pass"
        />

        {/* 5. Profile Avatar Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
            aria-label="User Profile menu"
            aria-expanded={profileDropdownOpen}
          >
            <div className="relative w-7 h-7 shrink-0">
              <img
                src="/assets/images/avatar1.png"
                alt={userName}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/20"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
            </div>
            <span className="text-xs font-semibold text-slate-800 hidden lg:inline max-w-[120px] truncate">
              {userName}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex items-center gap-3">
                <img
                  src="/assets/images/avatar1.png"
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 text-sm truncate">
                    {userName}
                  </p>
                  <p className="text-slate-500 text-xs truncate">
                    {user.email || "aspirant@cuet-prep.in"}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 shadow-2xs">
                      <Award className="w-2.5 h-2.5 text-amber-600" />
                      {user.targetCollege || "Delhi University"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-1 font-medium">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Aspirant Profile</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Command Hub & Radar</span>
                </Link>
                <Link
                  href="/dashboard/pyqs"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Solve PYQs</span>
                </Link>
                <Link
                  href="/dashboard/mocks"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>Mock Tests</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-600 text-left hover:bg-rose-50 font-semibold cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>{t("signOut", "Sign Out")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
