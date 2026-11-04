"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap, QrCode } from "lucide-react";

interface CUETNavbarProps {
  isLoggedIn: boolean;
  onAuth: (mode: "login" | "signup") => void;
  onOpenQuickStart?: () => void;
}

export default function CUETNavbar({ isLoggedIn, onAuth, onOpenQuickStart }: CUETNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full pt-4 pb-2 px-3 sm:px-6 lg:px-8 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="CUET AI-Prep Homepage">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
              CUET<span className="text-purple-600"> AI-Prep</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
              NTA-Style CBT Simulator
            </span>
          </div>
        </Link>

        {/* Center Floating Dark Pill Navigation Bar (Desktop ≥1024px) */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center bg-[#18262E] text-slate-200 px-5 xl:px-6 py-2 rounded-full shadow-xl border border-slate-700/50 text-xs font-medium gap-4 xl:gap-6 whitespace-nowrap"
        >
          <Link
            href="#home"
            className="hover:text-white transition-colors py-1 px-1 relative font-semibold text-white"
          >
            Home
          </Link>
          <Link href="#features" className="hover:text-white transition-colors py-1 px-1 text-slate-300">
            Mock Tests
          </Link>
          <Link href="#simulator" className="hover:text-white transition-colors py-1 px-1 text-slate-300">
            CBT Simulator
          </Link>
          <Link href="#steps" className="hover:text-white transition-colors py-1 px-1 text-slate-300">
            How It Works
          </Link>
          <Link href="#curriculum" className="hover:text-white transition-colors py-1 px-1 text-slate-300">
            Syllabus
          </Link>
          <Link href="#articles" className="hover:text-white transition-colors py-1 px-1 text-slate-300">
            Strategy
          </Link>
          <Link href="#faq" className="hover:text-white transition-colors py-1 px-1 text-slate-300">
            FAQ
          </Link>
        </nav>

        {/* Right CTA Actions (Desktop ≥1024px) */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs xl:text-sm font-bold px-4 py-2 rounded-full shadow-md hover:shadow-emerald-500/30 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onAuth("login")}
                className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-purple-700 bg-white/90 hover:bg-white px-3.5 py-2 rounded-full border border-slate-200/90 shadow-2xs transition-all whitespace-nowrap"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onAuth("signup")}
                className="bg-[#18262E] hover:bg-purple-700 text-white text-xs xl:text-sm font-bold px-4 py-2 rounded-full shadow-md hover:shadow-purple-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 whitespace-nowrap"
              >
                Start Free
              </button>
            </>
          )}

          {onOpenQuickStart && (
            <button
              type="button"
              onClick={onOpenQuickStart}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center shrink-0"
              title="Mobile App & QR Code"
              aria-label="Mobile App QR Code"
            >
              <QrCode className="w-4 h-4 text-slate-700" />
            </button>
          )}
        </div>

        {/* Below 1024px: Single visible button + Accessible menu button */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="bg-emerald-600 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-full shadow-sm whitespace-nowrap"
            >
              Dashboard
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => onAuth("signup")}
              className="bg-[#18262E] hover:bg-purple-700 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-full shadow-sm whitespace-nowrap"
            >
              Start free mock
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-purple-600"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu (<1024px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden mt-3 max-w-md mx-auto bg-[#18262E] text-white p-5 rounded-3xl shadow-xl border border-slate-700/50 flex flex-col gap-3 text-center text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <Link
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:bg-slate-800 rounded-xl"
          >
            Home
          </Link>
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:bg-slate-800 rounded-xl text-slate-300"
          >
            Mock Tests
          </Link>
          <Link
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:bg-slate-800 rounded-xl text-slate-300"
          >
            CBT Simulator
          </Link>
          <Link
            href="#steps"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:bg-slate-800 rounded-xl text-slate-300"
          >
            How It Works
          </Link>
          <Link
            href="#curriculum"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:bg-slate-800 rounded-xl text-slate-300"
          >
            Syllabus
          </Link>
          <Link
            href="#articles"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:bg-slate-800 rounded-xl text-slate-300"
          >
            Strategy
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:bg-slate-800 rounded-xl text-slate-300"
          >
            FAQ
          </Link>

          <div className="pt-3 border-t border-slate-700 flex flex-col gap-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-full text-center"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAuth("login");
                  }}
                  className="w-full bg-slate-800 text-white font-semibold py-2.5 rounded-full"
                >
                  Log in to Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAuth("signup");
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-full"
                >
                  Start Practicing Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
