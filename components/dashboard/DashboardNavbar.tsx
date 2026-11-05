"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  LogOut,
  User,
  Compass,
  ChevronDown,
  Settings,
  History,
  Sparkles,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { performSecureLogout } from "@/lib/auth/logout-handler";
import LanguageSelector from "@/components/i18n/LanguageSelector";

export default function DashboardNavbar() {
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const streak = isClient && user?.dailyStreak !== undefined ? user.dailyStreak : 0;
  const userName = isClient && user?.name ? user.name : "CUET Aspirant";
  const userEmail = isClient && user?.email ? user.email : "";

  // Derive 2-character initials (e.g. "Aryan 3" -> "A3")
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "A3";

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setProfileDropdownOpen(false);
    await performSecureLogout("/login");
  };

  return (
    <header className="hidden md:flex sticky top-0 z-30 h-14 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 items-center justify-between gap-4 select-none">
      {/* Left: Search Bar as in design */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            readOnly
            onClick={() => {
              window.location.href = "/dashboard/mocks";
            }}
            placeholder="Search mock tests, topics, subjects..."
            className="w-full h-9 pl-3.5 pr-14 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-600 transition-colors cursor-pointer"
          />
          <div className="flex absolute inset-y-0 right-0 pr-2.5 items-center pointer-events-none">
            <kbd className="text-[11px] text-slate-500 font-sans bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
              Ctrl K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Streak & Profile Pill */}
      <div className="flex items-center gap-5 shrink-0">
        {/* Language Selector */}
        <LanguageSelector variant="navbar" />

        {/* Streak counter: e.g. "1-day streak" */}
        <div
          className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60"
          title={`${streak} day study streak`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" strokeWidth={1.5} />
          <span className="tabular-nums font-bold text-slate-900">{streak}</span>
          <span className="text-slate-500 font-semibold">
            {streak === 1 ? "day streak" : "days streak"}
          </span>
        </div>

        {/* Profile Pill */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="User profile menu"
            aria-expanded={profileDropdownOpen}
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
              {initials}
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 max-w-[130px] truncate">
              {userName}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
              strokeWidth={1.75}
            />
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200/80 py-1.5 text-xs sm:text-sm z-50 shadow-xl"
            >
              {/* User details header */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="font-bold text-sm text-slate-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {userEmail || "Aspirant Account"}
                </p>
              </div>

              {/* Navigation links */}
              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium"
                >
                  <User className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
                  <span>Settings</span>
                </Link>
                <Link
                  href="/dashboard/sessions"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium"
                >
                  <History className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
                  <span>Past Sessions</span>
                </Link>
                <Link
                  href="/dashboard/ai-coach"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors font-medium"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" strokeWidth={1.75} />
                  <span>AI Coach</span>
                </Link>
                <Link
                  href="/dashboard/standing"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium"
                >
                  <Compass className="w-4 h-4 text-slate-500" strokeWidth={1.75} />
                  <span>Where Do I Stand</span>
                </Link>
              </div>

              {/* Sign out */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left font-medium cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-500" strokeWidth={1.75} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
