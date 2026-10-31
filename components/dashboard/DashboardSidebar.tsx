"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Compass,
  User,
  LogOut,
  X,
  Menu,
  History,
  BookOpen,
  Sparkles,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { createClient } from "@/lib/supabase/client";
import { useEntitlement } from "@/lib/hooks/useEntitlement";
import { useIsClient } from "@/lib/hooks/useIsClient";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  useEntitlement();

  const userName = isClient && user?.name ? user.name : "Aryan 3";
  const userEmail = isClient && user?.email ? user.email : "";

  // Close mobile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setMobileProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const navSections = [
    {
      title: null,
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          active: pathname === "/dashboard",
        },
      ],
    },
    {
      title: "Prepare",
      items: [
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
          id: "practice",
          label: "Practice tests",
          href: "/dashboard/practice",
          icon: BookOpen,
          active: pathname.startsWith("/dashboard/practice"),
        },
      ],
    },
    {
      title: "Track",
      items: [
        {
          id: "standing",
          label: "Where do I stand",
          href: "/dashboard/standing",
          icon: Compass,
          active: pathname.startsWith("/dashboard/standing"),
        },
        {
          id: "ai-coach",
          label: "AI Coach",
          href: "/dashboard/ai-coach",
          icon: Sparkles,
          active: pathname.startsWith("/dashboard/ai-coach"),
        },
        {
          id: "reports",
          label: "My Reports",
          href: "/dashboard/reports",
          icon: FileText,
          active: pathname.startsWith("/dashboard/reports"),
        },
      ],
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
      id: "ai-coach",
      label: "AI Coach",
      href: "/dashboard/ai-coach",
      icon: Sparkles,
      active: pathname.startsWith("/dashboard/ai-coach"),
    },
    {
      id: "reports",
      label: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
      active: pathname.startsWith("/dashboard/reports"),
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-white text-[#1C1917] select-none">
      {/* Brand Header & Nav links */}
      <div className="space-y-6">
        {/* Brand Logo - Terracotta square with rounded corners and 'C' as in design.pdf */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-2 py-2 rounded-xl transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-[#C2410C] text-white flex items-center justify-center font-bold text-base leading-none shadow-xs shrink-0">
            C
          </div>
          <span className="text-base font-bold text-[#1C1917] tracking-tight">
            CUET AI-Prep
          </span>
        </Link>

        {/* Grouped Nav Items */}
        <nav className="space-y-4" aria-label="Main navigation">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.title && (
                <div className="px-3 pt-2 pb-1 text-xs font-medium text-[#8C7D73] tracking-normal">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm transition-colors ${
                    item.active
                      ? "bg-[#FDF0E6] text-[#9F3014] font-semibold"
                      : "text-[#5C524A] font-normal hover:bg-[#FAF3EB] hover:text-[#1C1917]"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer: Premium plan active pill & Sign out */}
      <div className="pt-4 border-t border-[#EFE6DC] space-y-2">
        <Link
          href="/pricing"
          className="w-full flex items-center justify-center h-10 px-3 rounded-xl border border-[#EADDCF] bg-white/70 hover:bg-[#FAF3EB] text-xs font-medium text-[#5C524A] transition-colors"
        >
          <span>Premium plan active</span>
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 h-9 px-3 rounded-xl text-xs font-medium text-[#8C7D73] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Mobile Top Header (Only on screens < 768px) */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#EFE6DC] px-4 h-14 flex items-center justify-between w-full max-w-full">
        <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#C2410C] text-white flex items-center justify-center font-bold text-sm shrink-0">
            C
          </div>
          <span className="font-bold text-sm text-[#1C1917] tracking-tight">
            CUET AI-Prep
          </span>
        </Link>

        <div className="flex items-center gap-2" ref={mobileDropdownRef}>
          {/* Mobile Avatar & Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-[#FAF3EB] transition-colors cursor-pointer"
              aria-label="User profile menu"
              aria-expanded={mobileProfileOpen}
            >
              <div className="w-7 h-7 rounded-full bg-[#C2410C] text-white flex items-center justify-center text-xs font-bold">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#8C7D73] transition-transform ${
                  mobileProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-[#EFE6DC] py-1.5 text-xs z-50 shadow-xl">
                <div className="px-4 py-2.5 border-b border-[#EFE6DC]">
                  <p className="font-bold text-xs text-[#1C1917] truncate">{userName}</p>
                  <p className="text-[11px] text-[#8C7D73] truncate mt-0.5">{userEmail || "Aspirant Account"}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMobileProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#5C524A] hover:bg-[#FAF3EB] font-medium"
                  >
                    <User className="w-4 h-4 text-[#8C7D73]" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMobileProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#5C524A] hover:bg-[#FAF3EB] font-medium"
                  >
                    <Settings className="w-4 h-4 text-[#8C7D73]" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    href="/dashboard/sessions"
                    onClick={() => setMobileProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#5C524A] hover:bg-[#FAF3EB] font-medium"
                  >
                    <History className="w-4 h-4 text-[#8C7D73]" />
                    <span>Past Sessions</span>
                  </Link>
                </div>
                <div className="border-t border-[#EFE6DC] pt-1">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#EFE6DC] text-[#5C524A] hover:bg-[#FAF3EB] cursor-pointer"
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
      </div>

      {/* 2. Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard Navigation"
          className="md:hidden fixed inset-0 z-50 bg-[#441408]/30 backdrop-blur-xs flex"
        >
          <div className="w-64 max-w-[80vw] h-full bg-white border-r border-[#EFE6DC] p-4 flex flex-col shadow-lg">
            <div className="flex justify-end pb-2">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#EFE6DC] text-[#5C524A] hover:bg-[#FAF3EB] cursor-pointer"
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
      <aside className="hidden md:flex flex-col w-[240px] fixed inset-y-0 left-0 h-screen overflow-y-auto shrink-0 z-40 bg-white border-r border-[#EFE6DC] p-4">
        <SidebarContent />
      </aside>

      {/* 4. Mobile Bottom Tab Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EFE6DC] px-2 py-1.5 flex items-center justify-around shadow-sm"
      >
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[11px] font-semibold transition-colors ${
                item.active
                  ? "text-[#C2410C]"
                  : "text-[#8C7D73] hover:text-[#1C1917]"
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" strokeWidth={item.active ? 2 : 1.75} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
