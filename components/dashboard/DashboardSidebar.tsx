"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Compass,
  Target,
  Award,
  User,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { createClient } from "@/lib/supabase/client";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const logout = useTestStore((state) => state.logout);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Lock body scroll and listen for Escape key when mobile drawer is open
  useEffect(() => {
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
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      id: "pyqs",
      label: "PYQs",
      href: "/dashboard/pyqs",
      icon: FileText,
      active: pathname.startsWith("/dashboard/pyqs"),
    },
    {
      id: "mocks",
      label: "Mock tests",
      href: "/dashboard/mocks",
      icon: ClipboardCheck,
      active: pathname.startsWith("/dashboard/mocks"),
    },
    {
      id: "standing",
      label: "Where Do I Stand",
      href: "/dashboard/standing",
      icon: Compass,
      active: pathname.startsWith("/dashboard/standing"),
    },
    {
      id: "radar",
      label: "Weakness report",
      href: "/dashboard/radar",
      icon: Target,
      active: pathname.startsWith("/dashboard/radar"),
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: Award,
      active: pathname === "/dashboard/leaderboard",
    },
    {
      id: "profile",
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
      active: pathname === "/dashboard/profile",
    },
  ];

  const bottomNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      id: "mocks",
      label: "Mocks",
      href: "/dashboard/mocks",
      icon: ClipboardCheck,
      active: pathname.startsWith("/dashboard/mocks"),
    },
    {
      id: "standing",
      label: "Standing",
      href: "/dashboard/standing",
      icon: Compass,
      active: pathname.startsWith("/dashboard/standing"),
    },
    {
      id: "radar",
      label: "Weakness",
      href: "/dashboard/radar",
      icon: Target,
      active: pathname.startsWith("/dashboard/radar"),
    },
    {
      id: "profile",
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
      active: pathname === "/dashboard/profile",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-white text-[var(--text)]">
      {/* Brand Header & Nav links */}
      <div className="space-y-6">
        {/* Brand Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-[8px] hover:bg-slate-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-[8px] bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] font-semibold text-[var(--text)]">
              CUET AI-Prep
            </span>
            <span className="text-[12px] text-[var(--text-muted)]">
              UG Preparation
            </span>
          </div>
        </Link>

        {/* Nav Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex items-center gap-3 px-3 h-10 rounded-[8px] text-[14px] font-medium transition-colors ${
                  item.active
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    item.active ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                  }`}
                  strokeWidth={1.75}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer: Single text/outline upgrade link and Sign out */}
      <div className="pt-4 border-t border-[var(--border)] space-y-2">
        <Link
          href="/pricing"
          className="w-full flex items-center justify-center h-10 px-3 rounded-[8px] border border-[var(--border-strong)] bg-white hover:bg-slate-50 text-[14px] font-medium text-[var(--text)] transition-colors"
        >
          Upgrade plan
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 h-10 px-3 rounded-[8px] text-[14px] text-[var(--text-secondary)] hover:text-[var(--danger)] hover:bg-[var(--danger-subtle)] transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.75} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile Header (Only on screens < 768px) */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[var(--border)] px-4 h-14 flex items-center justify-between w-full max-w-full">
        <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-[8px] bg-[var(--accent)] text-white flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <span className="font-semibold text-[14px] text-[var(--text)]">
            CUET AI-Prep
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-[8px] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-slate-50 cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileDrawerOpen}
        >
          {mobileDrawerOpen ? (
            <X className="w-4 h-4" strokeWidth={1.75} />
          ) : (
            <Menu className="w-4 h-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      {/* 2. Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard Navigation"
          className="md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex"
        >
          <div className="w-64 max-w-[80vw] h-full bg-white border-r border-[var(--border)] p-4 flex flex-col shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
            <div className="flex justify-end pb-2">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-[8px] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-slate-50 cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
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

      {/* 3. Desktop Left Sidebar (Fixed 240px width, white, 1px right border) */}
      <aside className="hidden md:flex flex-col w-[240px] fixed inset-y-0 left-0 h-screen overflow-y-auto shrink-0 z-40 bg-white border-r border-[var(--border)] p-4">
        <SidebarContent />
      </aside>

      {/* 4. Mobile Bottom Tab Bar (5 items max, 12px labels, fixed bottom) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--border)] px-2 py-1 flex items-center justify-around"
      >
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-[8px] text-[12px] font-medium transition-colors ${
                item.active
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
