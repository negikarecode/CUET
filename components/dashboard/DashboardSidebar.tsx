"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Sparkles,
  Trophy,
  Target,
  Award,
  Flame,
  Zap,
  LogOut,
  Menu,
  X,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { createClient } from "@/lib/supabase/client";
import UpgradeButton from "@/components/payments/UpgradeButton";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function DashboardSidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");
  const streak = isClient && isLoggedIn ? user.dailyStreak : 1;
  const xp = isClient && isLoggedIn ? user.xpPoints : 0;
  const userName = isClient && isLoggedIn && user.name ? user.name : "CUET Aspirant";
  const targetCollege = isClient && isLoggedIn && user.targetCollege ? user.targetCollege : "Delhi University";
  const userStream = isClient && isLoggedIn && user.preferredStream ? user.preferredStream : "Science";

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
    } catch (e) {
      console.error("Sign out error:", e);
    }
    logout();
    setMobileDrawerOpen(false);
    window.location.href = "/";
  };

  const navItems = [
    {
      id: "hub",
      label: t("commandHub", "Command Hub"),
      href: "/dashboard",
      icon: Trophy,
      active: pathname === "/dashboard",
    },
    {
      id: "pyqs",
      label: t("domainTests", "PYQs"),
      href: "/dashboard/pyqs",
      icon: FileText,
      active: pathname.startsWith("/dashboard/pyqs"),
    },
    {
      id: "mocks",
      label: t("mocks", "Mock Tests"),
      href: "/dashboard/mocks",
      icon: ClipboardCheck,
      active: pathname.startsWith("/dashboard/mocks"),
    },
    {
      id: "radar",
      label: t("radar", "Weakness Radar"),
      href: "/dashboard#radar",
      icon: Target,
      active: false,
    },
    {
      id: "leaderboard",
      label: t("leaderboard", "Leaderboard"),
      href: "/dashboard/leaderboard",
      icon: Award,
      active: pathname === "/dashboard/leaderboard",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-[#FAF7EE] text-black">
      {/* Top: Brand Header & Aspirant Snapshot */}
      <div className="space-y-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none p-2 rounded-xl hover:bg-black/5 transition-all"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF5C5C] text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[3px_3px_0px_0px_#000] transition-all shrink-0">
            <GraduationCap className="w-5 h-5 stroke-[2.5]" />
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] absolute -top-1.5 -right-1.5 fill-[#F59E0B]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg font-black tracking-tight text-black font-sans">
                CUET <span className="text-[#FF5C5C]">AI-Prep</span>
              </span>
              <span className="rounded-full bg-[#FEF3C7] border border-black px-1.5 py-0.2 text-[9px] font-black text-black uppercase">
                UG
              </span>
            </div>
            <span className="text-[10px] font-black tracking-wider text-black/60 uppercase mt-0.5">
              Command Hub
            </span>
          </div>
        </Link>

        {/* Aspirant Profile Card */}
        <div className="p-3.5 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_#FF5C5C] shrink-0">
              {userInitials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-black text-black text-sm truncate leading-tight">
                {userName}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-bold text-black/60 truncate" title={targetCollege}>
                  {targetCollege}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-[#FAF7EE] border border-black shrink-0">
                  {userStream}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar: Streak + XP */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black/10">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#FEF3C7] rounded-md border border-black text-[11px] font-black">
              <Flame className="w-3.5 h-3.5 text-[#D97706] fill-[#F59E0B] shrink-0" />
              <span className="truncate">{streak}d Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#EEF2FF] rounded-md border border-black text-[11px] font-black">
              <Zap className="w-3.5 h-3.5 text-[#4F46E5] fill-[#4F46E5] shrink-0" />
              <span className="truncate">{xp} XP</span>
            </div>
          </div>
        </div>

        {/* Vertical Left Navbar Links */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-black uppercase tracking-wider text-black/50 mb-2">
            Aspirant Navigation
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-xs font-black transition-all ${
                    item.active
                      ? "bg-[#FEF3C7] text-black border-black shadow-[3px_3px_0px_0px_#000] -translate-y-0.5"
                      : "bg-transparent text-black/80 border-transparent hover:border-black hover:bg-white hover:text-black"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      item.active ? "text-black stroke-[2.5]" : "text-black/60"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom: Upgrade CTA & Sign Out */}
      <div className="space-y-3 pt-6 border-t-2 border-black/10">
        <LanguageSelector variant="sidebar" />

        <UpgradeButton
          planId="ai_practice_pass_499"
          variant="amber"
          className="w-full py-2.5 px-3 text-xs rounded-xl font-black border-2 border-black shadow-[3px_3px_0px_0px_#000] text-center flex items-center justify-center gap-2"
          buttonText={t("upgradeToPro", "Upgrade Pass")}
        />

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-[#FEE2E2] text-black hover:text-[#DC2626] font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{t("signOut", "Sign Out")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile Header (Only on small screens) with Hamburger Drawer Trigger */}
      <div className="md:hidden sticky top-0 z-40 bg-[#FAF7EE] border-b-2 border-black px-3 sm:px-4 py-2 flex items-center justify-between shadow-[0_2px_0px_0px_#000] w-full max-w-full">
        <Link href="/" className="flex items-center gap-1.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#FF5C5C] text-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_0px_#000] shrink-0">
            <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="font-black text-xs sm:text-sm text-black truncate">
            CUET <span className="text-[#FF5C5C]">AI-Prep</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <LanguageSelector variant="navbar" />

          <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 py-1 bg-[#FEF3C7] rounded-full border-2 border-black text-xs font-black shrink-0">
            <Flame className="w-3 h-3 text-[#D97706] fill-[#F59E0B]" />
            <span className="text-[11px] sm:text-xs">{streak}d</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-1.5 rounded-lg border-2 border-black bg-white text-black shadow-[1px_1px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] shrink-0"
            aria-label="Toggle Dashboard Menu"
          >
            {mobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-72 max-w-[85vw] h-full bg-[#FAF7EE] border-r-2 border-black p-4 flex flex-col shadow-[4px_0px_0px_0px_#000] animate-in slide-in-from-left duration-200">
            <div className="flex justify-end pb-2">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg border-2 border-black bg-white text-black shadow-[1px_1px_0px_0px_#000]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarContent />
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileDrawerOpen(false)}
          />
        </div>
      )}

      {/* 3. Desktop Left Sidebar Navbar (Persistent on left side) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 fixed left-0 top-0 bottom-0 z-40 bg-[#FAF7EE] border-r-2 border-black p-5 shadow-[4px_0px_0px_0px_#000] overflow-y-auto">
        <SidebarContent />
      </aside>
    </>
  );
}
