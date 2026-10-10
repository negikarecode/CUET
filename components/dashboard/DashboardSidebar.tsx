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
  LogOut,
  Menu,
  X,
  FileText,
  ClipboardCheck,
  User,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { createClient } from "@/lib/supabase/client";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import { useTranslation } from "@/lib/i18n/LanguageContext";

import Avatar from "@/components/ui/Avatar";

export default function DashboardSidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Lock body scroll and listen for Escape key when mobile drawer is open
  React.useEffect(() => {
    if (!mobileDrawerOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileDrawerOpen]);

  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");
  const streak = isClient && isLoggedIn ? user.dailyStreak : 1;
  const userName = isClient && isLoggedIn && user.name ? user.name : "CUET Aspirant";
  const targetCollege = isClient && isLoggedIn && user.targetCollege ? user.targetCollege : "Hindu College";
  const userStream = isClient && isLoggedIn && user.preferredStream ? user.preferredStream : "Science";

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
      href: "/dashboard/radar",
      icon: Target,
      active: pathname.startsWith("/dashboard/radar"),
    },
    {
      id: "leaderboard",
      label: t("leaderboard", "Leaderboard"),
      href: "/dashboard/leaderboard",
      icon: Award,
      active: pathname === "/dashboard/leaderboard",
    },
    {
      id: "profile",
      label: "Aspirant Profile",
      href: "/dashboard/profile",
      icon: User,
      active: pathname === "/dashboard/profile",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-white text-slate-800">
      {/* Top: Brand Header & Aspirant Snapshot */}
      <div className="space-y-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none p-1.5 rounded-2xl hover:bg-slate-50 transition-all"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all shrink-0">
            <GraduationCap className="w-5 h-5 stroke-[2.5]" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 fill-amber-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">
                CUET <span className="text-blue-600">AI-Prep</span>
              </span>
              <span className="rounded-md bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 text-[10px] uppercase">
                UG
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 mt-0.5">
              Command Hub
            </span>
          </div>
        </Link>

        {/* Aspirant Profile Card */}
        <Link
          href="/dashboard/profile"
          onClick={() => setMobileDrawerOpen(false)}
          className="block p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/70 transition-all space-y-2 group"
        >
          <div className="flex items-center gap-3">
            <Avatar
              src="/assets/images/avatar1.png"
              name={userName}
              size="md"
              showStatusDot
            />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-bold text-slate-900 text-sm truncate leading-tight group-hover:text-blue-600 transition-colors">
                {userName}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-slate-500 truncate" title={targetCollege}>
                  {targetCollege}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-600 shrink-0">
                  {userStream}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Vertical Left Navbar Links */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    item.active
                      ? "bg-blue-50 text-blue-600 border border-blue-200/60 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      item.active ? "text-blue-600" : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom: Daily Inspiration Strip & Sign Out */}
      <div className="space-y-3 pt-4 border-t border-slate-200/60">
        {/* Compact Daily Inspiration in sidebar footer */}
        <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/70 text-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Daily Inspiration</span>
          </div>
          <p className="text-slate-700 italic text-[11px] leading-snug">
            &ldquo;Discipline today creates options tomorrow.&rdquo;
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-semibold text-xs border border-slate-200/80 transition-all cursor-pointer"
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
      <div className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between shadow-xs w-full max-w-full">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <GraduationCap className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-bold text-sm text-slate-900 truncate">
            CUET <span className="text-blue-600">AI-Prep</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSelector variant="navbar" />

          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200/60 text-xs font-semibold text-amber-800 shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs">{streak}d</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 shrink-0 touch-manipulation cursor-pointer"
            aria-label="Toggle Dashboard Menu"
            aria-expanded={mobileDrawerOpen}
          >
            {mobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard Navigation Menu"
          className="md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex"
        >
          <div className="w-72 max-w-[85vw] h-full bg-white border-r border-slate-200/80 p-5 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex justify-end pb-3">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 touch-manipulation cursor-pointer"
                aria-label="Close navigation menu"
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

      {/* 3. Desktop Left Sidebar Navbar (Fixed permanently on left, stays fixed while scrolling) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 fixed inset-y-0 left-0 h-screen overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0 z-40 bg-white border-r border-slate-200/80 p-5 shadow-xs">
        <SidebarContent />
      </aside>

      {/* 4. Mobile Bottom Tab Bar (Phase 5 requirement) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-around shadow-lg"
      >
        <Link
          href="/dashboard"
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname === '/dashboard' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Trophy className="w-5 h-5 mb-0.5" />
          <span>Hub</span>
        </Link>
        <Link
          href="/dashboard/mocks"
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname.startsWith('/dashboard/mocks') ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardCheck className="w-5 h-5 mb-0.5" />
          <span>Mocks</span>
        </Link>
        <Link
          href="/dashboard/radar"
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname.startsWith('/dashboard/radar') ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Target className="w-5 h-5 mb-0.5" />
          <span>Radar</span>
        </Link>
        <Link
          href="/dashboard/profile"
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname === '/dashboard/profile' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
}
