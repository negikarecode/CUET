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

  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");
  const streak = isClient && isLoggedIn ? user.dailyStreak : 1;
  const userName = isClient && isLoggedIn && user.name ? user.name : "Aryan Negi";
  const userEmail = isClient && isLoggedIn && user.email ? user.email : "student@cuetprep.in";

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
    <header className="hidden md:flex sticky top-0 z-30 h-14 w-full border-b border-[var(--border)] bg-white px-6 items-center justify-between gap-4 select-none">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </div>
          <input
            type="text"
            readOnly
            onClick={() => {
              window.location.href = "/dashboard/mocks";
            }}
            placeholder="Search mock tests, topics, or subjects..."
            className="w-full h-9 pl-9 pr-12 bg-[var(--bg)] hover:bg-slate-100 text-[14px] text-[var(--text)] placeholder-[var(--text-muted)] rounded-[8px] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
          />
          <div className="hidden lg:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
            <kbd className="text-[12px] text-[var(--text-muted)] font-mono">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Language, Streak (plain text item), Profile Menu */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Language Selector */}
        <LanguageSelector variant="navbar" />

        {/* Streak: small text item with icon (not a pill) */}
        <div
          className="flex items-center gap-1.5 text-[14px] text-[var(--text-secondary)]"
          title={`${streak} day study streak`}
        >
          <Flame className="w-4 h-4 text-[var(--warning)]" strokeWidth={1.75} />
          <span className="tabular-nums font-medium text-[var(--text)]">{streak}</span>
          <span className="text-[12px] text-[var(--text-muted)] hidden lg:inline">
            {streak === 1 ? "day streak" : "days streak"}
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="User profile menu"
            aria-expanded={profileDropdownOpen}
          >
            <Avatar
              name={userName}
              size="sm"
            />
            <span className="text-[14px] font-medium text-[var(--text)] hidden lg:inline max-w-[120px] truncate">
              {userName}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-150 ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
              strokeWidth={1.75}
            />
          </button>

          {profileDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-[12px] border border-[var(--border)] py-1 text-[14px] z-50 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
            >
              {/* User details header */}
              <div className="px-4 py-3 border-b border-[var(--border)]">
                <p className="font-semibold text-[14px] text-[var(--text)] truncate">
                  {userName}
                </p>
                <p className="text-[12px] text-[var(--text-muted)] truncate">
                  {userEmail}
                </p>
              </div>

              {/* Navigation links */}
              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-slate-50 transition-colors"
                >
                  <User className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.75} />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/dashboard/radar"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-slate-50 transition-colors"
                >
                  <Target className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.75} />
                  <span>Weakness report</span>
                </Link>
                <Link
                  href="/dashboard/standing"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-slate-50 transition-colors"
                >
                  <Compass className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.75} />
                  <span>Where Do I Stand</span>
                </Link>
                <Link
                  href="/dashboard/mocks"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-slate-50 transition-colors"
                >
                  <ClipboardCheck className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.75} />
                  <span>Mock tests</span>
                </Link>
              </div>

              {/* Sign out */}
              <div className="border-t border-[var(--border)] pt-1">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[var(--danger)] hover:bg-[var(--danger-subtle)] text-left font-medium cursor-pointer transition-colors"
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
