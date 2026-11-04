"use client";

import React, { useState } from "react";
import Link from "next/link";
import FooterHills from "./illustrations/FooterHills";
import { Check, Mail, ShieldAlert } from "lucide-react";

interface CUETFooterProps {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
}

export default function CUETFooter({ onAuth, isLoggedIn }: CUETFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#123E30] text-emerald-100 select-none">
      {/* Top Green Hills Wave */}
      <FooterHills className="-mb-1" />

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 z-10">
        {/* Top Newsletter & Brand Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-emerald-800/80">
          <div className="max-w-md text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-3xl">🦉</span>
              <span className="font-extrabold text-3xl tracking-tight text-white">
                CUET<span className="text-purple-400"> AI-Prep</span>
              </span>
            </Link>
            <p className="mt-2 text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-normal">
              India&apos;s practice-first test preparation engine for CUET UG. Experience authentic NTA CBT simulators, granular AI mistake diagnosis, and verified DU cutoffs.
            </p>
          </div>

          {/* Newsletter Subscription Box */}
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-900/80 text-emerald-200 px-6 py-3 rounded-full border border-emerald-600/50 text-xs sm:text-sm font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! You are subscribed to weekly high-yield NCERT drills &amp; exam alerts.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 p-1.5 rounded-full border border-white/20 backdrop-blur-sm max-w-md mx-auto"
              >
                <div className="flex items-center gap-2 px-4 py-2 w-full">
                  <Mail className="w-4 h-4 text-emerald-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for weekly NCERT drills"
                    required
                    className="bg-transparent text-white placeholder-emerald-200/60 text-xs sm:text-sm focus:outline-none w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#6C5CE7] hover:bg-[#5846E0] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all hover:shadow-purple-500/30 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Navigation Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs sm:text-sm">
          {/* Column 1: Test Series */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Test Series
            </h4>
            <ul className="space-y-2.5 text-emerald-200/80">
              <li><Link href="/dashboard/mocks" className="hover:text-white transition-colors">Full-Length NTA Mocks</Link></li>
              <li><Link href="/dashboard/pyqs" className="hover:text-white transition-colors">251+ Shift PYQs (2022–2025)</Link></li>
              <li><Link href="/dashboard/practice" className="hover:text-white transition-colors">Unit Practice Drills</Link></li>
              <li><Link href="/dashboard/mocks" className="hover:text-white transition-colors">Diagnostic Mock Baseline</Link></li>
            </ul>
          </div>

          {/* Column 2: University Cutoffs */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Cutoffs &amp; Colleges
            </h4>
            <ul className="space-y-2.5 text-emerald-200/80">
              <li><Link href="/dashboard/standing" className="hover:text-white transition-colors">Delhi University (DU)</Link></li>
              <li><Link href="/dashboard/standing" className="hover:text-white transition-colors">SRCC &amp; North Campus</Link></li>
              <li><Link href="/dashboard/standing" className="hover:text-white transition-colors">Banaras Hindu University (BHU)</Link></li>
              <li><Link href="/dashboard/standing" className="hover:text-white transition-colors">Dream College Gap Analysis</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform Features */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              AI Tools
            </h4>
            <ul className="space-y-2.5 text-emerald-200/80">
              <li><Link href="/dashboard/ai-coach" className="hover:text-white transition-colors">AI Mistake Diagnosis</Link></li>
              <li><Link href="/dashboard/ai-coach" className="hover:text-white transition-colors">7-Day Score Accelerator</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing &amp; Gold Pass</Link></li>
              <li>
                {isLoggedIn ? (
                  <Link href="/dashboard" className="text-white font-bold hover:underline">
                    Candidate Dashboard
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAuth("login")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Candidate Login
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Support */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Legal &amp; Help
            </h4>
            <ul className="space-y-2.5 text-emerald-200/80">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/refunds" className="hover:text-white transition-colors">Refund &amp; Cancellation Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Academic Support Helpdesk</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-emerald-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <p>© {new Date().getFullYear()} CUET AI-Prep. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 text-center md:text-right max-w-xl">
            <ShieldAlert className="w-4 h-4 shrink-0 text-emerald-300" />
            <span>
              Disclaimer: CUET AI-Prep is an independent academic assessment tool and is not officially affiliated with or endorsed by the National Testing Agency (NTA).
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
