"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Clock,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import OnboardingModal from "@/components/auth/OnboardingModal";

interface CollegeCardData {
  name: string;
  campus: string;
  university: string;
  initials: string;
  cutoffCourse: string;
  cutoffScore: string;
  courseParam: string;
  collegeParam: string;
}

const FEATURED_COLLEGES: CollegeCardData[] = [
  {
    name: "Shri Ram College of Commerce",
    campus: "North Campus",
    university: "University of Delhi",
    initials: "SRCC",
    cutoffCourse: "B.Com (Hons.)",
    cutoffScore: "897 / 1,000 (UR)",
    courseParam: "bcom_hons",
    collegeParam: "Shri Ram College of Commerce",
  },
  {
    name: "St. Stephen's College",
    campus: "North Campus",
    university: "University of Delhi",
    initials: "SSC",
    cutoffCourse: "B.A. (Hons.) Economics",
    cutoffScore: "906 / 1,000 (UR)",
    courseParam: "ba_hons_economics",
    collegeParam: "St. Stephen's College",
  },
  {
    name: "Hindu College",
    campus: "North Campus",
    university: "University of Delhi",
    initials: "HC",
    cutoffCourse: "B.A. (Hons.) Political Science",
    cutoffScore: "866 / 1,000 (UR)",
    courseParam: "ba_hons_political_science",
    collegeParam: "Hindu College",
  },
  {
    name: "Miranda House",
    campus: "North Campus",
    university: "University of Delhi",
    initials: "MH",
    cutoffCourse: "B.A. (Hons.) English",
    cutoffScore: "844 / 1,000 (UR)",
    courseParam: "ba_hons_english",
    collegeParam: "Miranda House",
  },
  {
    name: "Hansraj College",
    campus: "North Campus",
    university: "University of Delhi",
    initials: "HRC",
    cutoffCourse: "B.Sc (Hons.) Physics",
    cutoffScore: "845 / 1,000 (UR)",
    courseParam: "bsc_hons_physics",
    collegeParam: "Hansraj College",
  },
  {
    name: "Kirori Mal College",
    campus: "North Campus",
    university: "University of Delhi",
    initials: "KMC",
    cutoffCourse: "B.Com (Hons.)",
    cutoffScore: "831 / 1,000 (UR)",
    courseParam: "bcom_hons",
    collegeParam: "Kirori Mal College",
  },
];

export default function LandingPageClient() {
  const router = useRouter();
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");

  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[var(--accent)] text-white px-4 py-2 rounded-[8px] text-sm font-semibold focus:outline-2 focus:outline-offset-2"
      >
        Skip to main content
      </a>

      {/* 1. HEADER (64px tall, white, 1px bottom border, sticky) */}
      <header className="sticky top-0 z-40 h-16 bg-[var(--surface)] border-b border-[var(--border)] transition-colors">
        <div className="max-w-[1120px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo: single-color wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--text)] hover:opacity-90 transition-opacity shrink-0"
            aria-label="CUET AI-Prep home"
          >
            <div className="w-8 h-8 rounded-[8px] bg-[var(--accent)] text-white flex items-center justify-center font-bold text-sm shrink-0">
              <GraduationCap className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="font-semibold text-sm sm:text-base text-[var(--text)] tracking-tight whitespace-nowrap">
              CUET AI-Prep
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            <a
              href="#features"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              How it works
            </a>
            <a
              href="#colleges"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
            >
              Colleges
            </a>
          </nav>

          {/* Actions: Logged In vs Logged Out */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="h-9 px-3 sm:px-4 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 sm:gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              >
                <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Go to dashboard</span>
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleOpenAuth("login")}
                  className="h-9 px-2 sm:px-3 text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenAuth("signup")}
                  className="h-9 px-3 sm:px-4 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="main-content">
        {/* 2. HERO (Two columns desktop, stacked mobile) */}
        <section className="py-14 sm:py-20 bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Headline and CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-semibold text-[var(--text)] leading-[1.2] tracking-tight">
                  Practice CUET with mock tests that show you what to fix.
                </h1>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[560px]">
                  Timed CBT-style mock tests, mistake explanations, and college cutoff standings to guide your preparation.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (isLoggedIn) {
                        router.push("/dashboard");
                      } else {
                        handleOpenAuth("signup");
                      }
                    }}
                    className="h-11 px-6 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    <span>{isLoggedIn ? "Go to dashboard" : "Start practicing"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#how-it-works"
                    className="h-11 px-4 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] inline-flex items-center justify-center transition-colors rounded-[8px] border border-[var(--border)] hover:bg-[var(--bg)]"
                  >
                    See how it works
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Image with Aspect Ratio & Fallback */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[3/2] w-full rounded-[12px] overflow-hidden border border-[var(--border)] bg-[var(--bg)] shadow-none">
                  {!heroImageError ? (
                    <Image
                      src="/images/landing/hero-students-library.webp"
                      alt="Students studying together in a university library"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-cover"
                      onError={() => setHeroImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[var(--text-secondary)]">
                      <GraduationCap className="w-10 h-10 text-[var(--accent)] mb-2 stroke-[1.75]" />
                      <p className="text-sm font-semibold text-[var(--text)]">CUET Exam Preparation</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">Timed practice tests and diagnostic analysis</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES (Three simple columns) */}
        <section id="features" className="py-14 sm:py-20 max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="mb-10 text-left">
            <h2 className="text-[20px] font-semibold text-[var(--text)] tracking-tight">
              Features designed for focused preparation
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Simulate the test environment and diagnose where marks are lost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <article className="app-card flex flex-col text-left">
              <div className="w-10 h-10 rounded-[8px] bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4 shrink-0">
                <Clock className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-[16px] font-semibold text-[var(--text)] mb-2">
                Timed CBT-style mock tests
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Full-length tests with standard NTA marking (+5 for correct, -1 for incorrect) and 60-minute timers to develop consistent pacing.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="app-card flex flex-col text-left">
              <div className="w-10 h-10 rounded-[8px] bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4 shrink-0">
                <AlertCircle className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-[16px] font-semibold text-[var(--text)] mb-2">
                Mistake analysis
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Detailed review of incorrect questions explaining why common distractor options were chosen and which concepts to revise.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="app-card flex flex-col text-left">
              <div className="w-10 h-10 rounded-[8px] bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] mb-4 shrink-0">
                <BookOpen className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-[16px] font-semibold text-[var(--text)] mb-2">
                Topic-wise practice
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Targeted chapter drills in domain subjects and languages to build conceptual accuracy before taking full-length papers.
              </p>
            </article>
          </div>
        </section>

        {/* 4. HOW IT WORKS (Three numbered steps in a row) */}
        <section id="how-it-works" className="py-14 sm:py-20 bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <div className="mb-10 text-left">
              <h2 className="text-[20px] font-semibold text-[var(--text)] tracking-tight">
                How it works
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                A clear three-step cycle to improve your test scores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="space-y-3 text-left">
                <div className="w-8 h-8 rounded-[8px] bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--text)]">
                  Take a mock test
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Complete a timed CBT-style test under realistic conditions in your required subject combination.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3 text-left">
                <div className="w-8 h-8 rounded-[8px] bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--text)]">
                  See your mistakes
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Review complete question explanations, identify recurring trap options, and check your accuracy by topic.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3 text-left">
                <div className="w-8 h-8 rounded-[8px] bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-[16px] font-semibold text-[var(--text)]">
                  Practice the weak topics
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Solve targeted questions to fix weak areas and compare your progress with college cutoffs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COLLEGES SECTION ("Colleges you can aim for") */}
        <section id="colleges" className="py-14 sm:py-20 max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="mb-10 text-left">
            <h2 className="text-[20px] font-semibold text-[var(--text)] tracking-tight">
              Colleges you can aim for
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Compare your mock scores with historical cutoffs from Delhi University and other central institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_COLLEGES.map((college) => (
              <article key={college.name} className="app-card flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-[8px] bg-[var(--accent-subtle)] text-[var(--accent)] font-semibold text-xs flex items-center justify-center shrink-0">
                      {college.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-semibold text-[var(--text)] truncate">
                        {college.name}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] truncate">
                        {college.campus} • {college.university}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-[8px] bg-[var(--bg)] border border-[var(--border)] mb-4">
                    <p className="text-xs text-[var(--text-secondary)]">Historical benchmark</p>
                    <p className="text-sm font-semibold text-[var(--text)] mt-0.5 tabular-nums">
                      {college.cutoffCourse}: {college.cutoffScore}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/standing?college=${encodeURIComponent(college.collegeParam)}&course=${encodeURIComponent(college.courseParam)}`}
                  className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1 transition-colors pt-1"
                >
                  <span>View cutoff standings</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* 6. FINAL CALL TO ACTION (A simple band, no second hero) */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-[1120px] mx-auto rounded-[12px] bg-[var(--accent-subtle)] border border-[var(--border)] p-8 sm:p-12 text-center">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[var(--text)] tracking-tight">
              Start practicing today and see where you stand among top college cutoffs.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-[540px] mx-auto">
              Access timed CBT-style mock tests, mistake explanations, and college cutoff standings.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  if (isLoggedIn) {
                    router.push("/dashboard");
                  } else {
                    handleOpenAuth("signup");
                  }
                }}
                className="h-11 px-6 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              >
                <span>{isLoggedIn ? "Open dashboard" : "Start practicing free"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="bg-[var(--surface)] border-t border-[var(--border)] py-12 text-left">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px] bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <GraduationCap className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="font-semibold text-base text-[var(--text)]">
                  CUET AI-Prep
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Practice platform with timed CBT-style mock tests and college cutoff comparisons.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => setCreditsModalOpen(true)}
                  className="text-xs font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Image credits</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Links: Practice */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider">
                Practice
              </h3>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li>
                  <Link href="/dashboard/mocks" className="hover:text-[var(--text)] transition-colors">
                    Timed mock tests
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/pyqs" className="hover:text-[var(--text)] transition-colors">
                    Previous year papers
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/standing" className="hover:text-[var(--text)] transition-colors">
                    Where do I stand
                  </Link>
                </li>
              </ul>
            </div>

            {/* Links: Analysis */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider">
                Analysis
              </h3>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li>
                  <Link href="/dashboard/radar" className="hover:text-[var(--text)] transition-colors">
                    Weakness report
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/leaderboard" className="hover:text-[var(--text)] transition-colors">
                    Score rankings
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/profile" className="hover:text-[var(--text)] transition-colors">
                    Student profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Links: Platform */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider">
                Platform
              </h3>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li>
                  <a href="#features" className="hover:text-[var(--text)] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-[var(--text)] transition-colors">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#colleges" className="hover:text-[var(--text)] transition-colors">
                    Colleges directory
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="pt-6 border-t border-[var(--border)] text-xs text-[var(--text-muted)] leading-relaxed">
            <p>
              CUET AI-Prep is an independent practice platform and is not affiliated with NTA, the Government of India or any university.
            </p>
          </div>

          {/* Copyright & Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
            <p>© 2026 CUET AI-Prep. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCreditsModalOpen(true)}
                className="hover:text-[var(--text)] transition-colors cursor-pointer"
              >
                Image credits &amp; licenses
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Onboarding / Auth Modal */}
      <OnboardingModal
        isOpen={Boolean(authMode)}
        onClose={() => setAuthMode(null)}
        initialMode={authMode || "signup"}
      />

      {/* Image Credits Modal */}
      {creditsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.12)] space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-[var(--text)]">
                Image credits and licensing
              </h3>
              <button
                type="button"
                onClick={() => setCreditsModalOpen(false)}
                className="p-1.5 rounded-[8px] text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg)] cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed">
              <p>
                CUET AI-Prep strictly follows intellectual property rules. We do not use proprietary college crests or scraped photos.
              </p>
              <div className="p-3 rounded-[8px] bg-[var(--bg)] border border-[var(--border)] space-y-1.5">
                <p className="font-semibold text-[var(--text)]">Hero photograph</p>
                <p>
                  <strong>File:</strong> hero-students-library.webp
                </p>
                <p>
                  <strong>Author:</strong> Priscilla Du Preez (@priscilladupreez)
                </p>
                <p>
                  <strong>Source:</strong>{" "}
                  <a
                    href="https://unsplash.com/photos/photo-1523240795612-9a054b0db644"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--accent)] hover:underline"
                  >
                    Unsplash (photo-1523240795612-9a054b0db644)
                  </a>
                </p>
                <p>
                  <strong>License:</strong> Unsplash License (Permits free commercial and non-commercial use)
                </p>
              </div>

              <div className="p-3 rounded-[8px] bg-[var(--bg)] border border-[var(--border)] space-y-1.5">
                <p className="font-semibold text-[var(--text)]">College cards</p>
                <p>
                  All college listings render typographic data cards with historical cutoffs from official central university notifications. No unverified stand-in photos or logos are used.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setCreditsModalOpen(false)}
                className="h-9 px-4 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
