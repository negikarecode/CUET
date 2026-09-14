"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
  Trophy,
  ArrowRight,
  Target,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import UpgradeButton from "@/components/payments/UpgradeButton";
import OnboardingModal from "@/components/auth/OnboardingModal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isClient = useIsClient();
  const isHomepage = pathname === "/";
  const isDashboard = pathname === "/dashboard";

  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<"signup" | "login">("signup");

  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name);

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

  const handleSignOut = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    if (pathname === "/dashboard") {
      router.push("/");
    }
  };

  if (pathname.startsWith("/test/") || pathname === "/dashboard") return null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-[#FAF7EE] transition-all">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between min-h-[56px] sm:min-h-[64px] relative">
            {/* Left: Brand Logo & Dashboard Nav Items */}
            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3 group focus:outline-none rounded-lg py-1 px-1.5"
              >
                <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF5C5C] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[3px_3px_0px_0px_#000] transition-all shrink-0">
                  <GraduationCap className="w-5 h-5 text-white stroke-[2.5]" />
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] absolute -top-1.5 -right-1.5 fill-[#F59E0B]" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-black font-sans leading-tight">
                      CUET <span className="text-[#FF5C5C]">AI-Prep</span>
                    </span>
                    <span className="rounded-full bg-[#FEF3C7] border-2 border-black px-1.5 py-0.2 text-[10px] font-black text-black uppercase tracking-wide shadow-[1px_1px_0px_0px_#000]">
                      UG
                    </span>
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-black/60 uppercase mt-0.5">
                    NTA CBT Diagnostic Engine
                  </span>
                </div>
              </Link>

              {/* Dashboard Left-Aligned Navigation */}
              {isDashboard && (
                <>
                  <div className="hidden lg:block h-6 w-px bg-black/20" />
                  <nav className="hidden lg:flex items-center space-x-1.5">
                    <Link
                      href="/dashboard"
                      className="px-3 py-1.5 text-xs font-black text-black bg-[#FEF3C7] rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
                    >
                      <Trophy className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Command Hub</span>
                    </Link>
                    <Link
                      href="/dashboard/mocks"
                      className="px-3 py-1.5 text-xs font-bold text-black hover:bg-black/5 rounded-lg border-2 border-transparent hover:border-black transition-all flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-black/70" />
                      <span>Practice Mocks</span>
                    </Link>
                    <Link
                      href="/dashboard#radar"
                      className="px-3 py-1.5 text-xs font-bold text-black hover:bg-black/5 rounded-lg border-2 border-transparent hover:border-black transition-all flex items-center gap-1.5"
                    >
                      <Target className="w-3.5 h-3.5 text-[#FF5C5C]" />
                      <span>Weakness Radar</span>
                    </Link>
                    <Link
                      href="/dashboard#leaderboard"
                      className="px-3 py-1.5 text-xs font-bold text-black hover:bg-black/5 rounded-lg border-2 border-transparent hover:border-black transition-all flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>Leaderboard</span>
                    </Link>
                  </nav>
                </>
              )}
            </div>

            {/* Right Action Items: Logged Out vs Logged In */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {!isLoggedIn ? (
                /* Logged Out State: Join Now & Log In CTAs */
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("login")}
                    className="px-3.5 py-2 text-xs font-black text-black hover:bg-black/5 rounded-lg border-2 border-transparent hover:border-black transition-all cursor-pointer"
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("signup")}
                    className="px-4 py-2 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] active:bg-[#E03E3E] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Join Now</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              ) : (
                /* Logged In State: Show Streak/XP/Upgrade ONLY when NOT on Homepage */
                <div className="flex items-center gap-3">
                  {!isHomepage && (
                    <>
                      {/* Daily Streak Counter with Flame Icon */}
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
                        <span className="text-black text-[11px] font-bold hidden md:inline">
                          Days Streak
                        </span>
                      </div>

                      {/* User XP Points Badge */}
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] border-2 border-black rounded-full text-black text-xs font-black transition-all shadow-[2px_2px_0px_0px_#000] cursor-pointer group hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000]"
                        title={`${xp} Total Experience Points earned across mock tests and mistake diagnoses.`}
                      >
                        <Zap className="w-3.5 h-3.5 text-[#4F46E5] fill-[#4F46E5] group-hover:scale-110 transition-transform" />
                        <span className="text-black font-black tracking-tight text-[13px]">
                          {xp.toLocaleString()}
                        </span>
                        <span className="text-black text-[11px] font-bold hidden md:inline">
                          XP
                        </span>
                      </div>

                      {/* Quick Upgrade CTA */}
                      <UpgradeButton
                        planId="ai_practice_pass_499"
                        variant="amber"
                        className="py-1.5 px-3.5 text-[11px] rounded-lg hidden sm:flex font-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                        buttonText="Upgrade"
                      />
                    </>
                  )}

                  {/* User Profile Button (Homepage) / Dropdown (Other Pages) */}
                  <div className="relative">
                    {isHomepage ? (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border-2 border-black bg-white hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                        aria-label="Go to dashboard"
                      >
                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">
                          {userInitials}
                        </div>
                        <span className="text-xs font-black text-black hidden lg:inline max-w-[110px] truncate">
                          {userName}
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border-2 border-black bg-white hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                        aria-label="User Profile menu"
                        aria-expanded={profileDropdownOpen}
                      >
                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-black text-xs">
                          {userInitials}
                        </div>
                        <span className="text-xs font-black text-black hidden lg:inline max-w-[110px] truncate">
                          {userName}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-black transition-transform duration-200 ${
                            profileDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}

                    {/* Profile Dropdown Menu */}
                    {!isHomepage && profileDropdownOpen && (
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
                              Target: {user.targetCollege || "Top Central University"}
                            </span>
                          </div>
                        </div>

                        <div className="py-1 font-bold">
                          <Link
                            href="/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-black hover:bg-[#FEF3C7]/50"
                          >
                            <Trophy className="w-4 h-4 text-[#F59E0B]" />
                            <span>Trophy Cabinet & Radar</span>
                          </Link>
                          <Link
                            href="/dashboard/mocks"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-black hover:bg-[#FEF3C7]/50"
                          >
                            <BookOpen className="w-4 h-4 text-black/60" />
                            <span>Practice Domain Test</span>
                          </Link>
                        </div>

                        <div className="border-t-2 border-black pt-1">
                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-[#EF4444] text-left hover:bg-[#FEE2E2] font-black cursor-pointer"
                          >
                            <LogOut className="w-4 h-4 text-[#EF4444]" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:hidden">
              {!isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => handleOpenOnboarding("signup")}
                  className="px-3 py-1.5 rounded-lg bg-[#FF5C5C] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] active:shadow-none"
                >
                  Join Now
                </button>
              ) : (
                !isHomepage && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-[#FEF3C7] border-2 border-black rounded-full text-black text-xs font-black shadow-[1px_1px_0px_0px_#000]">
                    <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#D97706]" />
                    <span>{streak}</span>
                  </div>
                )
              )}

              {!isHomepage && (
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] focus:outline-none"
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
          <div className="sm:hidden border-t-2 border-black bg-[#FAF7EE] px-4 pt-3 pb-6 space-y-4 shadow-[4px_4px_0px_0px_#000]">
            {isLoggedIn ? (
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    {userInitials}
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">{userName}</p>
                    <p className="text-black/60 text-xs font-bold">
                      {user.targetCollege || "CUET UG Aspirant"}
                    </p>
                  </div>
                </div>
                {!isHomepage && (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-[#EEF2FF] border-2 border-black rounded-full text-black text-xs font-black shadow-[1px_1px_0px_0px_#000]">
                    <Zap className="w-3.5 h-3.5 text-[#4F46E5] fill-[#4F46E5]" />
                    <span>{xp} XP</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-white border-2 border-black space-y-2">
                <p className="font-black text-black text-xs">
                  Prepare for CUET 2025/2026 Format
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("signup")}
                    className="flex-1 py-2 rounded-lg bg-[#FF5C5C] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center"
                  >
                    Join Now
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenOnboarding("login")}
                    className="flex-1 py-2 rounded-lg bg-white text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center"
                  >
                    Log In
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1 font-bold text-black">
              {isDashboard ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-black bg-[#FEF3C7] border-2 border-black"
                  >
                    Command Hub
                  </Link>
                  <Link
                    href="/dashboard/mocks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-bold border-2 border-transparent hover:border-black hover:bg-white"
                  >
                    Practice Mocks
                  </Link>
                  <Link
                    href="/dashboard#radar"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-bold border-2 border-transparent hover:border-black hover:bg-white"
                  >
                    Weakness Radar
                  </Link>
                  <Link
                    href="/dashboard#leaderboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-bold border-2 border-transparent hover:border-black hover:bg-white"
                  >
                    Leaderboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm border-2 border-transparent hover:border-black hover:bg-white"
                >
                  My Dashboard
                </Link>
              )}
            </div>

            {isLoggedIn && (
              <div className="pt-2 border-t-2 border-black">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full py-2 px-3 rounded-lg bg-[#FEE2E2] text-[#DC2626] font-black text-xs border-2 border-black text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-[#DC2626]" />
                  <span>Sign Out</span>
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
