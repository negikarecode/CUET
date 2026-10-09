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
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import OnboardingModal from "@/components/auth/OnboardingModal";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function BottomNav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name);

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Hide on test simulator screen and dashboard (dashboard uses dedicated left sidebar navbar)
  if (pathname.startsWith("/test/") || pathname.startsWith("/dashboard")) {
    return null;
  }

  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";

  return (
    <>
      <nav
        aria-label="Mobile Navigation Bar"
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] px-3 py-1.5 transition-all"
      >
        <div className="grid grid-cols-5 items-center justify-around text-center">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isHome
                ? "text-indigo-600 font-semibold"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                isHome ? "bg-indigo-50 text-indigo-600 shadow-xs" : "hover:bg-slate-100/70"
              }`}
            >
              <Home className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("home", "Home")}</span>
          </Link>

          {/* 2. Mock Tests */}
          <Link
            href="/#stream-matrix"
            className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 font-medium transition-all"
          >
            <div className="p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
              <BookOpen className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("mocks", "Mocks")}</span>
          </Link>

          {/* 3. Diagnostic Demo */}
          <Link
            href="/#live-demo"
            className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 font-medium transition-all"
          >
            <div className="p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
              <Target className="w-4 h-4 stroke-[2] text-rose-500" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("dailyDrill", "Demo")}</span>
          </Link>

          {/* 4. Pricing / Ranker Pass */}
          <Link
            href="/#pricing"
            className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 font-medium transition-all"
          >
            <div className="p-1.5 rounded-xl hover:bg-slate-100/70 transition-colors">
              <Zap className="w-4 h-4 stroke-[2] text-amber-500" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("upgrade", "Pricing")}</span>
          </Link>

          {/* 5. Dashboard or Join Now */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                isDashboard
                  ? "text-emerald-600 font-semibold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isDashboard
                    ? "bg-emerald-50 text-emerald-600 shadow-xs"
                    : "hover:bg-slate-100/70"
                }`}
              >
                <Trophy className="w-4 h-4 stroke-[2] text-emerald-600" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{t("commandHub", "Hub")}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="flex flex-col items-center justify-center py-1 text-indigo-600 font-semibold transition-all cursor-pointer"
            >
              <div className="p-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                <UserPlus className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight text-indigo-600">
                {t("join", "Join")}
              </span>
            </button>
          )}
        </div>
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
