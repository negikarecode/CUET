"use client";

import { useState, useEffect } from "react";
import CUETNavbar from "./CUETNavbar";
import CUETHero from "./CUETHero";
import CUETStats from "./CUETStats";
import CUETSteps from "./CUETSteps";
import CozyStudyRoomScene from "./illustrations/CozyStudyRoomScene";
import CUETSystemTabs from "./CUETSystemTabs";
import CUETArticles from "./CUETArticles";
import CUETFAQ from "./CUETFAQ";
import CUETFooter from "./CUETFooter";
import CUETQuickStartModal from "./CUETQuickStartModal";
import OnboardingModal from "@/components/auth/OnboardingModal";
import { createClient } from "@/lib/supabase/client";

export default function LandingPageClient() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [quickStartModalOpen, setQuickStartModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sync auth state with Supabase session
  useEffect(() => {
    let isMounted = true;
    let cleanup = () => {};
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (isMounted) {
          setIsLoggedIn(Boolean(user));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) {
          setIsLoggedIn(Boolean(session?.user));
        }
      });

      cleanup = () => {
        subscription?.unsubscribe();
      };
    } catch {
      // Fallback gracefully
    }

    return () => {
      isMounted = false;
      cleanup();
    };
  }, []);

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* 1. Top Navbar (Floating Dark Pill Navigation Bar) */}
      <CUETNavbar
        isLoggedIn={isLoggedIn}
        onAuth={handleOpenAuth}
        onOpenQuickStart={() => setQuickStartModalOpen(true)}
      />

      {/* 2. Hero Section (Gradient Banner, Top Feature Card, Headlines & Campus Illustration) */}
      <CUETHero
        isLoggedIn={isLoggedIn}
        onAuth={handleOpenAuth}
        onOpenQuickStart={() => setQuickStartModalOpen(true)}
      />

      {/* 3. Stats Section (3 Large Statistics with Divider Borders) */}
      <CUETStats />

      {/* 4. Admission Steps Section (Everything You Need & 3 Simple Steps with Pastel Cards) */}
      <CUETSteps />

      {/* 5. Interactive Mobile Experience in Cozy Study Room */}
      <section id="simulator" className="py-16 md:py-24 bg-[#0E2E24] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 text-white space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-800">
              Interactive Mobile CBT Simulator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight pt-2">
              Your Daily CUET Exam Companion
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 font-normal">
              Click the domain subjects on the phone screen below to test real-time cutoff projections, target accuracy, and priority NCERT fixes.
            </p>
          </div>

          <CozyStudyRoomScene onStartTest={() => handleOpenAuth("signup")} />
        </div>
      </section>

      {/* 6. System Architecture & Product Process Tabs (5 Pill Tabs) */}
      <CUETSystemTabs />

      {/* 7. Daily Insights & CUET Strategy Articles (Featured Mascot Guide + 3 Sub-Articles) */}
      <CUETArticles />

      {/* 8. FAQ Accordion Section */}
      <CUETFAQ />

      {/* 9. Bottom Footer with Green Wave Hills & Newsletter */}
      <CUETFooter isLoggedIn={isLoggedIn} onAuth={handleOpenAuth} />

      {/* 10. Quick Start / QR Code Modal */}
      <CUETQuickStartModal
        isOpen={quickStartModalOpen}
        onClose={() => setQuickStartModalOpen(false)}
        onStartSignUp={() => handleOpenAuth("signup")}
      />

      {/* 11. Authentication & Onboarding Modal */}
      <OnboardingModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
