"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Zap,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Award,
  BookOpen,
  FileText,
  LogOut,
  Trophy,
  ArrowRight,
  Target,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { createClient } from "@/lib/supabase/client";
import UpgradeButton from "@/components/payments/UpgradeButton";
import OnboardingModal from "@/components/auth/OnboardingModal";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isClient = useIsClient();
  const isHomepage = pathname === "/";
  const isDashboard = pathname === "/dashboard";

  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<"signup" | "login">("signup");

  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");

  // Verify authentic Supabase session state and listen for sign-outs
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && user?.isLoggedIn) {
        logout();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.isLoggedIn, logout]);

  // Safe defaults
  const streak = isClient && isLoggedIn ? user.dailyStreak : 0;
  const xp = isClient && isLoggedIn ? user.xpPoints : 0;
  const userName = isClient && isLoggedIn && user.name ? user.name : "Aspirant";
  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "CU";

  const handleOpenOnboarding = (mode: "signup" | "login" = "signup") => {
    setOnboardingMode(mode);
    setOnboardingOpen(true);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    window.location.href = "/";
  };

  if (pathname === "/" || pathname.startsWith("/test/") || pathname.startsWith("/dashboard")) return null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs transition-all">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between min-h-[52px] sm:min-h-[58px] relative">
            {/* Left: Brand Logo & Dashboard Nav Items */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-3 group focus:outline-none rounded-xl py-1 px-1"
              >
                <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs group-hover:scale-105 transition-all shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2]" />
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 absolute -top-1 -right-1 fill-amber-300" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-sans leading-tight whitespace-nowrap">
                      CUET <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI-Prep</span>
                    </span>
                    <span className="rounded-full bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                      UG
                    </span>
                  </div>
                  <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase mt-0.5 hidden sm:block">
                    {t("appTagline", "NTA CBT Diagnostic Engine")}
                  </span>
                </div>
              </Link>

              {/* Dashboard Left-Aligned Navigation */}
              {isDashboard && (
                <>
                  <div className="hidden lg:block h-5 w-px bg-slate-200" />
                  <nav className="hidden lg:flex items-center space-x-1">
                    <Link
                      href="/dashboard"
                      className="px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/80 rounded-xl border border-indigo-100 flex items-center gap-1.5 shadow-xs"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t("commandHub", "Command Hub")}</span>
                    </Link>
                    <Link
                      href="/dashboard/pyqs"
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t("domainTests", "PYQs")}</span>
                    </Link>
                    <Link
                      href="/dashboard/mocks"
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t("mocks", "Mock Tests")}</span>
                    </Link>
                    <Link
                      href="/dashboard/radar"
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Target className="w-3.5 h-3.5 text-rose-500" />
                      <span>{t("radar", "Weakness Radar")}</span>
                    </Link>
                    <Link
                      href="/dashboard#leaderboard"
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{t("leaderboard", "Leaderboard")}</span>
                    </Link>
                  </nav>
                </>
              )}
            </div>

            {/* Right Action Items: Logged Out vs Logged In */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <LanguageSelector variant="navbar" />

              {!isLoggedIn ? (
                /* Logged Out State: Join Now & Log In CTAs */
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("login")}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  >
                    {t("logIn", "Log In")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("signup")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t("joinNow", "Join Now")}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>
              ) : (
                /* Logged In State: Show Streak/XP/Upgrade ONLY when NOT on Homepage */
                <div className="flex items-center gap-3">
                  {!isHomepage && (
                    <>
                      {/* Daily Streak Counter with Flame Icon */}
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100/70 border border-amber-200/80 rounded-full text-slate-800 text-xs font-semibold transition-all shadow-xs cursor-pointer group"
                        title={`${streak} Day Study Streak! Solve at least 1 mock daily to preserve streak.`}
                      >
                        <span className="relative flex items-center justify-center">
                          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
                        </span>
                        <span className="tracking-tight text-slate-900 font-bold text-xs">
                          {streak}
                        </span>
                        <span className="text-slate-500 text-[11px] font-medium hidden md:inline">
                          {t("days", "Days")} {t("streak", "Streak")}
                        </span>
                      </div>

                      {/* User XP Points Badge */}
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-200/80 rounded-full text-slate-800 text-xs font-semibold transition-all shadow-xs cursor-pointer group"
                        title={`${xp} Total Experience Points earned across mock tests and mistake diagnoses.`}
                      >
                        <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-900 font-bold tracking-tight text-xs">
                          {xp.toLocaleString()}
                        </span>
                        <span className="text-slate-500 text-[11px] font-medium hidden md:inline">
                          XP
                        </span>
                      </div>

                      {/* Quick Upgrade CTA */}
                      <UpgradeButton
                        planId="ai_practice_pass_499"
                        variant="amber"
                        className="py-1.5 px-3.5 text-xs rounded-xl hidden sm:flex font-semibold shadow-xs"
                        buttonText={t("upgrade", "Upgrade")}
                      />
                    </>
                  )}

                  {/* User Profile Button (Homepage) / Dropdown (Other Pages) */}
                  <div className="relative">
                    {isHomepage ? (
                      <Link
                        href="/dashboard"
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5"
                        aria-label="Go to dashboard"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 stroke-[2]" />
                        <span>{t("dashboard", "Dashboard")}</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 shadow-xs active:scale-[0.98] transition-all"
                        aria-label="User Profile menu"
                        aria-expanded={profileDropdownOpen}
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          {userInitials}
                        </div>
                        <span className="text-xs font-semibold text-slate-800 hidden lg:inline max-w-[110px] truncate">
                          {userName}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                            profileDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}

                    {/* Profile Dropdown Menu */}
                    {!isHomepage && profileDropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        onMouseLeave={() => setProfileDropdownOpen(false)}
                      >
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                          <p className="font-bold text-slate-900 text-sm truncate">
                            {userName}
                          </p>
                          <p className="text-slate-500 text-xs font-medium truncate">
                            {user.email || "aspirant@cuet-prep.in"}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-[11px]">
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                              <Award className="w-3 h-3 text-amber-600" />
                              Target: {user.targetCollege || "Top Central University"}
                            </span>
                          </div>
                        </div>

                        <div className="py-1 font-medium">
                          <Link
                            href="/dashboard/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <User className="w-4 h-4 text-slate-500" />
                            <span>Aspirant Profile</span>
                          </Link>
                          <Link
                            href="/dashboard/radar"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <Target className="w-4 h-4 text-rose-500" />
                            <span>Weakness Radar</span>
                          </Link>
                          <Link
                            href="/dashboard/pyqs"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <FileText className="w-4 h-4 text-slate-400" />
                            <span>Solve PYQs</span>
                          </Link>
                          <Link
                            href="/dashboard/mocks"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            <span>Mock Tests</span>
                          </Link>
                        </div>

                        <div className="border-t border-slate-100 pt-1">
                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 text-left hover:bg-rose-50 font-semibold cursor-pointer transition-colors"
                          >
                            <LogOut className="w-4 h-4 text-rose-600" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button & Language Switcher */}
            <div className="flex items-center gap-1.5 sm:hidden shrink-0">
              <LanguageSelector variant="navbar" />

              {!isLoggedIn ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("login")}
                    className="px-2.5 py-1.5 rounded-xl bg-white text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs active:scale-95 shrink-0"
                  >
                    {t("logIn", "Log In")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("signup")}
                    className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-xs active:scale-95 shrink-0"
                  >
                    {t("joinNow", "Join Now")}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-slate-800 text-xs font-semibold shadow-xs shrink-0">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{streak}</span>
                </div>
              )}

              {!isHomepage && (
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs focus:outline-none"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Only when NOT on Homepage) */}
        {!isHomepage && mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in duration-150">
            {isLoggedIn ? (
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {userInitials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{userName}</p>
                    <p className="text-slate-500 text-xs font-medium">
                      {user.targetCollege || "CUET UG Aspirant"}
                    </p>
                  </div>
                </div>
                {!isHomepage && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200/80 rounded-full text-slate-800 text-xs font-semibold shadow-xs">
                    <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                    <span>{xp} XP</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <p className="font-semibold text-slate-900 text-xs">
                  Prepare for CUET 2025/2026 Format
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("signup")}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-xs shadow-xs text-center"
                  >
                    {t("joinNow", "Join Now")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("login")}
                    className="flex-1 py-2 rounded-xl bg-white text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs text-center"
                  >
                    {t("logIn", "Log In")}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1 font-medium text-slate-700">
              {isDashboard ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100"
                  >
                    {t("commandHub", "Command Hub")}
                  </Link>
                  <Link
                    href="/dashboard/pyqs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    {t("domainTests", "PYQs")}
                  </Link>
                  <Link
                    href="/dashboard/mocks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    {t("mocks", "Mock Tests")}
                  </Link>
                  <Link
                    href="/dashboard/radar"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    {t("radar", "Weakness Radar")}
                  </Link>
                  <Link
                    href="/dashboard#leaderboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    {t("leaderboard", "Leaderboard")}
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  {t("commandHub", "My Dashboard")}
                </Link>
              )}
            </div>

            {/* Language Selector in Mobile Menu */}
            <div className="pt-2 border-t border-slate-100">
              <LanguageSelector variant="mobile" />
            </div>

            {isLoggedIn && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full py-2 px-3 rounded-xl bg-rose-50 text-rose-600 font-semibold text-xs border border-rose-200/60 text-left flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>{t("signOut", "Sign Out")}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Onboarding / Sign-Up / Log-In Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        initialMode={onboardingMode}
      />
    </>
  );
}
