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
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t-2 border-black shadow-[0_-4px_0px_0px_#000] px-2 py-1.5 transition-all"
      >
        <div className="grid grid-cols-5 items-center justify-around text-center">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all ${
              isHome
                ? "text-black font-black"
                : "text-black/60 hover:text-black font-bold"
            }`}
          >
            <div
              className={`p-1 rounded-md transition-all ${
                isHome ? "bg-[#FEF3C7] border border-black shadow-[1px_1px_0px_0px_#000]" : ""
              }`}
            >
              <Home className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("home", "Home")}</span>
          </Link>

          {/* 2. Domain Tests */}
          <Link
            href="/#stream-matrix"
            className="flex flex-col items-center justify-center py-1 text-black/60 hover:text-black font-bold transition-all"
          >
            <div className="p-1 rounded-md hover:bg-[#FAF7EE]">
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("mocks", "Tests")}</span>
          </Link>

          {/* 3. Diagnostic Demo */}
          <Link
            href="/#live-demo"
            className="flex flex-col items-center justify-center py-1 text-black/60 hover:text-black font-bold transition-all"
          >
            <div className="p-1 rounded-md hover:bg-[#FAF7EE]">
              <Target className="w-4 h-4 stroke-[2.5] text-[#FF5C5C]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("dailyDrill", "Demo")}</span>
          </Link>

          {/* 4. Pricing / Ranker Pass */}
          <Link
            href="/#pricing"
            className="flex flex-col items-center justify-center py-1 text-black/60 hover:text-black font-bold transition-all"
          >
            <div className="p-1 rounded-md hover:bg-[#FAF7EE]">
              <Zap className="w-4 h-4 stroke-[2.5] text-[#D97706]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{t("upgrade", "Pricing")}</span>
          </Link>

          {/* 5. Dashboard or Join Now */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all ${
                isDashboard
                  ? "text-black font-black"
                  : "text-black/60 hover:text-black font-bold"
              }`}
            >
              <div
                className={`p-1 rounded-md transition-all ${
                  isDashboard
                    ? "bg-[#D1FAE5] border border-black shadow-[1px_1px_0px_0px_#000]"
                    : "hover:bg-[#FAF7EE]"
                }`}
              >
                <Trophy className="w-4 h-4 stroke-[2.5] text-[#059669]" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{t("commandHub", "Hub")}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="flex flex-col items-center justify-center py-1 text-black font-black transition-all cursor-pointer"
            >
              <div className="p-1 rounded-md bg-[#FF5C5C] text-white border border-black shadow-[1px_1px_0px_0px_#000]">
                <UserPlus className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight text-[#DC2626]">
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
