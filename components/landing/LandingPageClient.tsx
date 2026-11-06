"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CUETNavbar from "./CUETNavbar";
import CUETHero from "./CUETHero";
import CUETStats from "./CUETStats";
import CUETSteps from "./CUETSteps";
import PricingSection from "@/components/payments/PricingSection";
import CUETFooter from "./CUETFooter";
import { createClient } from "@/lib/supabase/client";

const CozyStudyRoomScene = dynamic(() => import("./illustrations/CozyStudyRoomScene"), {
  loading: () => <div className="h-96 w-full animate-pulse bg-emerald-950/20 rounded-2xl" />,
});
const CUETSystemTabs = dynamic(() => import("./CUETSystemTabs"));
const CUETArticles = dynamic(() => import("./CUETArticles"));
const CUETFAQ = dynamic(() => import("./CUETFAQ"));
const CUETClosingCTA = dynamic(() => import("./CUETClosingCTA"));
const CUETQuickStartModal = dynamic(() => import("./CUETQuickStartModal"), { ssr: false });
const OnboardingModal = dynamic(() => import("@/components/auth/OnboardingModal"), { ssr: false });

export default function LandingPageClient() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [authRedirectUrl, setAuthRedirectUrl] = useState("/dashboard");
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

  const handleOpenAuth = (mode: "login" | "signup", redirectUrl = "/dashboard") => {
    setAuthMode(mode);
    setAuthRedirectUrl(redirectUrl);
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
      <section id="simulator" className="py-14 md:py-24 bg-[#0E2E24] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 text-white space-y-2.5">
            <span className="inline-block text-xs uppercase font-extrabold tracking-wider text-emerald-300 bg-emerald-950/70 px-4 py-1.5 rounded-full border border-emerald-700/60 shadow-xs">
              Interactive Mobile CBT Simulator
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight pt-1">
              Your Daily CUET Exam Companion
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 font-normal max-w-lg mx-auto">
              Tap the domain subjects on the phone simulator below to test real-time cutoff projections, target accuracy, and priority NCERT fixes.
            </p>
          </div>

          <CozyStudyRoomScene onStartTest={() => handleOpenAuth("signup")} />
        </div>
      </section>

      {/* 6. System Architecture & Product Process Tabs (5 Pill Tabs) */}
      <CUETSystemTabs />

      {/* 7. Daily Insights & CUET Strategy Articles (Featured Mascot Guide + 3 Sub-Articles) */}
      <CUETArticles />

      {/* 8. Free vs Gold Pass Comparison */}
      <PricingSection
        id="pricing"
        onSelectPlan={(plan) =>
          handleOpenAuth(
            "signup",
            plan === "gold" ? "/dashboard/upgrade?checkout=1" : "/dashboard"
          )
        }
      />

      {/* 9. FAQ Accordion Section */}
      <CUETFAQ />

      {/* 10. Closing Call To Action Band */}
      <CUETClosingCTA onStartFreeMock={() => handleOpenAuth("signup")} />

      {/* 11. Bottom Footer with Green Wave Hills & Newsletter */}
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
        redirectUrl={authRedirectUrl}
      />
    </div>
  );
}
