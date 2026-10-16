"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Search,
  LogOut,
  User,
  ClipboardCheck,
  Compass,
  Target,
  ChevronDown,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { createClient } from "@/lib/supabase/client";
import LanguageSelector from "@/components/i18n/LanguageSelector";
import Avatar from "@/components/ui/Avatar";

export default function DashboardNavbar() {
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const streak = isClient && user?.dailyStreak !== undefined ? user.dailyStreak : 0;
  const userName = isClient && user?.name ? user.name : "Aspirant";
  const userEmail = isClient && user?.email ? user.email : "";

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
    <header className="hidden md:flex sticky top-0 z-30 h-14 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xs px-6 items-center justify-between gap-4 select-none">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </div>
          <input
            type="text"
            readOnly
            onClick={() => {
              window.location.href = "/dashboard/mocks";
            }}
            placeholder="Search mock tests, topics, or subjects..."
            className="w-full h-9 pl-9 pr-12 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 transition-colors cursor-pointer"
          />
          <div className="hidden lg:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
            <kbd className="text-[11px] text-slate-400 font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Language, Streak, Profile Menu */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Language Selector */}
        <LanguageSelector variant="navbar" />

        {/* Streak counter */}
        <div
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-amber-50/80 border border-amber-200/60 px-2.5 py-1 rounded-lg"
          title={`${streak} day study streak`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" strokeWidth={1.75} />
          <span className="tabular-nums font-bold text-slate-900">{streak}</span>
          <span className="text-slate-500 font-medium hidden lg:inline">
            {streak === 1 ? "day streak" : "days streak"}
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="User profile menu"
            aria-expanded={profileDropdownOpen}
          >
            <Avatar
              name={userName}
              size="sm"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 hidden lg:inline max-w-[120px] truncate">
              {userName}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
              strokeWidth={1.75}
            />
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 py-1.5 text-xs sm:text-sm z-50 shadow-lg"
            >
              {/* User details header */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="font-bold text-sm text-slate-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {userEmail || "Aspirant Account"}
                </p>
              </div>

              {/* Navigation links */}
              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                  <span>Profile & Goals</span>
                </Link>
                <Link
                  href="/dashboard/radar"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Target className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                  <span>Weakness Report</span>
                </Link>
                <Link
                  href="/dashboard/standing"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Compass className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                  <span>Where Do I Stand</span>
                </Link>
                <Link
                  href="/dashboard/mocks"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <ClipboardCheck className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                  <span>Mock Tests</span>
                </Link>
              </div>

              {/* Sign out */}
              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left font-medium cursor-pointer transition-colors"
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.75} />
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
