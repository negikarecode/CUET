"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Target,
  Zap,
  Trophy,
  UserPlus,
  ClipboardCheck,
  FileText,
  User,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import OnboardingModal from "@/components/auth/OnboardingModal";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function BottomNav() {
  const { t } = useTranslation();
  const pathname = usePathname() || "";
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // CBT simulator screen is strict full-screen exam mode; landing page uses pure desktop/mobile header
  if (pathname === "/" || pathname.startsWith("/test/")) {
    return null;
  }

  const isDashboardRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  // Authenticated Dashboard Navigation Configuration
  const dashboardItems = [
    {
      id: "hub",
      label: t("commandHub", "Hub"),
      href: "/dashboard",
      icon: Trophy,
      isActive: pathname === "/dashboard",
    },
    {
      id: "mocks",
      label: t("mocks", "Mocks"),
      href: "/dashboard/mocks",
      icon: ClipboardCheck,
      isActive: pathname.startsWith("/dashboard/mocks"),
    },
    {
      id: "radar",
      label: t("radar", "Radar"),
      href: "/dashboard/radar",
      icon: Target,
      isActive: pathname.startsWith("/dashboard/radar"),
    },
    {
      id: "pyqs",
      label: t("domainTests", "PYQs"),
      href: "/dashboard/pyqs",
      icon: FileText,
      isActive: pathname.startsWith("/dashboard/pyqs"),
    },
    {
      id: "profile",
      label: t("profile", "Profile"),
      href: "/dashboard/profile",
      icon: User,
      isActive: pathname === "/dashboard/profile",
    },
  ];

  return (
    <>
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1 pb-[max(0.375rem,env(safe-area-inset-bottom,0px))] transition-all"
      >
        {isDashboardRoute ? (
          /* =============================================================== */
          /* 1. AUTHENTICATED DASHBOARD BOTTOM NAV TABS                      */
          /* =============================================================== */
          <div className="grid grid-cols-5 items-center justify-around text-center">
            {dashboardItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all touch-manipulation cursor-pointer ${
                    item.isActive
                      ? "text-blue-600 font-bold"
                      : "text-slate-500 hover:text-slate-800 font-medium"
                  }`}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  <div
                    className={`relative p-1.5 rounded-xl transition-all ${
                      item.isActive
                        ? "bg-blue-50 text-blue-600 shadow-2xs scale-105"
                        : "hover:bg-slate-100/70"
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                    {item.isActive && (
                      <span className="absolute -top-0.5 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    )}
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight leading-none truncate max-w-[56px]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          /* =============================================================== */
          /* 2. PUBLIC MARKETING STOREFRONT BOTTOM NAV TABS                  */
          /* =============================================================== */
          <div className="grid grid-cols-5 items-center justify-around text-center">
            {/* Home */}
            <Link
              href="/"
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all touch-manipulation cursor-pointer ${
                pathname === "/"
                  ? "text-blue-600 font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              }`}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  pathname === "/" ? "bg-blue-50 text-blue-600 shadow-2xs scale-105" : "hover:bg-slate-100/70"
                }`}
              >
                <Home className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none truncate max-w-[56px]">
                {t("home", "Home")}
              </span>
            </Link>

            {/* Mocks */}
            <Link
              href="/#stream-matrix"
              className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-slate-800 font-medium transition-all touch-manipulation cursor-pointer"
            >
              <div className="p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
                <BookOpen className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none truncate max-w-[56px]">
                {t("mocks", "Mocks")}
              </span>
            </Link>

            {/* Demo */}
            <Link
              href="/#live-demo"
              className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-slate-800 font-medium transition-all touch-manipulation cursor-pointer"
            >
              <div className="p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
                <Target className="w-4 h-4 stroke-[2] text-rose-500" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none truncate max-w-[56px]">
                {t("dailyDrill", "Demo")}
              </span>
            </Link>

            {/* Pricing */}
            <Link
              href="/#pricing"
              className="flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 hover:text-slate-800 font-medium transition-all touch-manipulation cursor-pointer"
            >
              <div className="p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
                <Zap className="w-4 h-4 stroke-[2] text-amber-500" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none truncate max-w-[56px]">
                {t("upgrade", "Pricing")}
              </span>
            </Link>

            {/* Hub or Join Now */}
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all touch-manipulation cursor-pointer ${
                  isDashboardRoute
                    ? "text-blue-600 font-bold"
                    : "text-slate-500 hover:text-slate-800 font-medium"
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isDashboardRoute
                      ? "bg-blue-50 text-blue-600 shadow-2xs scale-105"
                      : "hover:bg-slate-100/70"
                  }`}
                >
                  <Trophy className="w-4 h-4 stroke-[2.2] text-amber-500" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight leading-none truncate max-w-[56px]">
                  {t("commandHub", "Hub")}
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="flex flex-col items-center justify-center min-h-[44px] py-1 text-blue-600 font-semibold transition-all touch-manipulation cursor-pointer"
              >
                <div className="p-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                  <UserPlus className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight leading-none text-blue-600 truncate max-w-[56px]">
                  {t("join", "Join")}
                </span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Onboarding Modal for mobile Join button */}
      <OnboardingModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signup"
      />
    </>
  );
}
