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
  const userInitials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CU";

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
    <header className="hidden md:flex sticky top-0 z-30 w-full border-b-2 border-black bg-[#FAF7EE] px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-[0_2px_0px_0px_#000] items-center justify-end gap-3 transition-all select-none">
      {/* Right-Aligned Student Utilities */}
      <div className="flex items-center gap-3 shrink-0">
        {/* 1. Language Selector Dropdown */}
        <LanguageSelector variant="navbar" />

        {/* 2. Daily Streak Indicator */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] hover:bg-[#FDE68A] border-2 border-black rounded-full text-black text-xs font-black transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000]"
          title={`${streak} Day Study Streak! Solve at least 1 mock daily to preserve streak.`}
        >
          <span className="relative flex items-center justify-center">
            <Flame className="w-4 h-4 text-[#D97706] fill-[#F59E0B] group-hover:scale-110 transition-transform" />
          </span>
          <span className="tracking-tight text-black font-black text-[13px]">
            {streak}
          </span>
          <span className="text-black text-[11px] font-bold hidden lg:inline">
            {t("days", "Days")} {t("streak", "Streak")}
          </span>
        </div>

        {/* 3. XP Points Counter */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] border-2 border-black rounded-full text-black text-xs font-black transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000]"
          title={`${xp} Total Experience Points earned across mock tests and mistake diagnoses.`}
        >
          <Zap className="w-3.5 h-3.5 text-[#4F46E5] fill-[#4F46E5] group-hover:scale-110 transition-transform" />
          <span className="text-black font-black tracking-tight text-[13px]">
            {xp.toLocaleString()}
          </span>
          <span className="text-black text-[11px] font-bold hidden lg:inline">
            XP
          </span>
        </div>

        {/* 4. Upgrade to Pro Button */}
        <UpgradeButton
          planId="ai_practice_pass_499"
          variant="amber"
          className="py-1.5 px-3.5 text-[11px] rounded-lg font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          buttonText="Upgrade to Pro"
        />

        {/* 5. Profile Avatar Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border-2 border-black bg-white hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            aria-label="User Profile menu"
            aria-expanded={profileDropdownOpen}
          >
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">
              {userInitials}
            </div>
            <span className="text-xs font-black text-black hidden lg:inline max-w-[120px] truncate">
              {userName}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-[5px_5px_0px_0px_#000] border-2 border-black py-2 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div className="px-4 py-3 border-b-2 border-black bg-[#FAF7EE]">
                <p className="font-black text-black text-sm truncate">
                  {userName}
                </p>
                <p className="text-black/60 text-xs font-medium truncate">
                  {user.email || "aspirant@cuet-prep.in"}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 font-bold text-black bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
                    <Award className="w-3 h-3 text-[#D97706]" />
                    Target: {user.targetCollege || "Delhi University"}
                  </span>
                </div>
              </div>

              <div className="py-1 font-bold">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-black hover:bg-[#FEF3C7]/50"
                >
                  <User className="w-4 h-4 text-black" />
                  <span>Aspirant Profile</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-black hover:bg-[#FEF3C7]/50"
                >
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                  <span>Command Hub & Radar</span>
                </Link>
                <Link
                  href="/dashboard/pyqs"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-black hover:bg-[#FEF3C7]/50"
                >
                  <FileText className="w-4 h-4 text-black/60" />
                  <span>Solve PYQs</span>
                </Link>
                <Link
                  href="/dashboard/mocks"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-black hover:bg-[#FEF3C7]/50"
                >
                  <BookOpen className="w-4 h-4 text-black/60" />
                  <span>Mock Tests</span>
                </Link>
              </div>

              <div className="border-t-2 border-black pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[#EF4444] text-left hover:bg-[#FEE2E2] font-black cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-[#EF4444]" />
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
