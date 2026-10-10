"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock3,
  FileText,
  GraduationCap,
  Lightbulb,
  MonitorCheck,
  Trophy,
  LayoutDashboard,
  Check,
  Star,
  Zap,
  Target,
  Menu,
  X,
} from "lucide-react";
import { ScrollSplitCard, PricingCardItem } from "@/components/ui/scroll-split-card";
import { StickyScrollCards, StickyScrollCardItem } from "@/components/ui/sticky-scroll-cards";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { AnnotatedText } from "@/components/ui/annotated-text";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@/components/animate-ui/primitives/headless/disclosure";
import {
  Particles,
  ParticlesEffect,
} from "@/components/animate-ui/primitives/effects/particles";
import { ShimmeringText } from "@/components/animate-ui/primitives/texts/shimmering";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import OnboardingModal from "@/components/auth/OnboardingModal";

const faqs: [string, string][] = [
  [
    "Are these mock tests based on the latest NTA CUET 2026 syllabus?",
    "Yes. Every test strictly follows the latest NTA notification and rationalized Class 12 NCERT curriculum with 50 compulsory questions.",
  ],
  [
    "Can I practice tests on mobile devices?",
    "Absolutely. Practice drills, CBT simulators, and performance analytics work seamlessly across smartphones, tablets, and desktops.",
  ],
  [
    "How does the negative marking calculation work?",
    "You earn +5 marks for every correct answer, receive a -1 penalty for incorrect responses, and 0 for unattempted questions, matching NTA rules.",
  ],
  [
    "Is the free plan really free to use?",
    "Yes. You can start immediately with diagnostic tests, chapter practice questions, and AI performance insights with zero credit card required.",
  ],
];

const colleges: StickyScrollCardItem[] = [
  {
    title: "Miranda College",
    src: "/assets/images/campus-life.jpg",
  },
  {
    title: "Hindu College",
    src: "/assets/images/hindu-college.jpg",
  },
  {
    title: "St. Stephen's College",
    src: "/assets/images/st-stephens.jpg",
  },
  {
    title: "Dare to Dream Big",
    src: "/assets/images/miranda-house.jpg",
  },
  {
    title: "SRCC",
    src: "/assets/images/srcc.jpg",
  },
  {
    title: "Find your place at Delhi University",
    src: "/assets/images/delhi-university.jpg",
  },
];

const pricingCards: PricingCardItem[] = [
  {
    title: "Free",
    description: "Build your preparation rhythm with daily practice and essential CUET resources.",
    price: "₹0",
    features: [
      "Daily practice questions",
      "Essential CUET resources",
      "Diagnostic mock tests",
      "NCERT concept explanations",
    ],
    cta: "Start for free",
    tier: "free",
    bgColor: "#f4f1e7",
    textColor: "#172033",
  },
  {
    title: "Gold Pass",
    description: "Get the focused practice, All-India percentiles, and AI insights you need to secure North Campus.",
    price: "₹699",
    originalPrice: "₹999",
    badge: "Most popular",
    features: [
      "Everything in Free",
      "Full-length NTA CBT mock tests",
      "100% Shift-wise PYQs (2022-2025)",
      "Granular AI Trap & Mistake Diagnosis",
      "Weekly All-India Percentile Leaderboard",
    ],
    cta: "Choose Gold",
    tier: "gold",
    bgColor: "#20232b",
    textColor: "#ffffff",
  },
];

const targetUniversities = [
  {
    name: "University of Delhi (DU)",
    badge: "RANK #1 TARGET",
    subBadge: "70+ Colleges",
    description: "Home to SRCC, St. Stephen's, Hindu College, Hansraj, Miranda House & LSR.",
    cutoff: "Avg Cutoff: 98.5+ Percentile",
    cta: "Take DU Mock",
    highlight: true,
  },
  {
    name: "Banaras Hindu University",
    badge: "PREMIER HERITAGE",
    subBadge: "Varanasi, UP",
    description: "Top faculties in Arts, Social Sciences, Commerce (FMC), and Agricultural Sciences.",
    cutoff: "Avg Cutoff: 95+ Percentile",
    cta: "Take BHU Mock",
    highlight: false,
  },
  {
    name: "Jawaharlal Nehru University",
    badge: "GLOBAL EXCELLENCE",
    subBadge: "New Delhi",
    description: "Renowned School of Language, Literature and International Studies programs.",
    cutoff: "Foreign Languages & BA (Hons)",
    cta: "Take JNU Mock",
    highlight: false,
  },
  {
    name: "Jamia Millia Islamia (JMI)",
    badge: "NAAC A++",
    subBadge: "New Delhi",
    description: "Ranked amongst India's top 3 central universities in NIRF rankings.",
    cutoff: "Programs: Eco, History, Hindi, Bio",
    cta: "Explore Tests",
    highlight: false,
  },
  {
    name: "Aligarh Muslim University",
    badge: "TOP RATED",
    subBadge: "Aligarh, UP",
    description: "High prestige courses in B.Sc (Hons), B.Com (Hons), and Humanities degrees.",
    cutoff: "Specialized Mocks Available",
    cta: "Explore Tests",
    highlight: false,
  },
  {
    name: "UoH, AUD, Tezpur & More",
    badge: "45+ UNIVERSITIES",
    subBadge: "Pan India",
    description: "Full coverage for State, Deemed & Central universities accepting CUET-UG scores.",
    cutoff: "Unified Pattern Mock Series",
    cta: "View Full List",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "Aarav Sharma",
    college: "SRCC, B.Com (Hons)",
    score: "796 / 800",
    quote: "The NTA CBT format in this platform was identical to the actual exam screen! Doing 20 full-length mocks here kept me calm and got me 100 percentile in Economics and Accountancy.",
    avatar: "/assets/images/avatar1.png",
  },
  {
    name: "Priya Nair",
    college: "St. Stephen's College, BA History",
    score: "792 / 800",
    quote: "Chapter-wise practice helped me master the micro-details in NCERT Political Science and History. The solutions were so clean and concept-focused. Best CUET tool out there!",
    avatar: "/assets/images/avatar2.png",
  },
  {
    name: "Rohan Verma",
    college: "Hindu College, B.Sc Physics (Hons)",
    score: "198 / 200",
    quote: "The General Test and English sections used to be my biggest worry. The timed speed drills and sectional test series gave me the exact timing tricks I needed to score 198/200.",
    avatar: "/assets/images/avatar3.png",
  },
];

function Icon({
  icon: IconComponent,
  size = 18,
  className = "",
}: {
  icon: React.ElementType;
  size?: number;
  className?: string;
}) {
  return <IconComponent size={size} strokeWidth={2} aria-hidden="true" className={className} />;
}

function ParticleButton({
  children,
  className,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}) {
  const [key, setKey] = useState(0);

  return (
    <Particles key={key} className="particle-button-wrapper">
      <button
        {...props}
        className={className}
        onClick={(event) => {
          setKey((value) => value + 1);
          onClick?.(event);
        }}
      >
        {children}
      </button>
      <ParticlesEffect className="particle-effect" />
    </Particles>
  );
}

function ParticleLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const [key, setKey] = useState(0);

  return (
    <Particles key={key} className="particle-button-wrapper">
      <Link
        href={href}
        className={className}
        onClick={() => setKey((value) => value + 1)}
      >
        {children}
      </Link>
      <ParticlesEffect className="particle-effect" />
    </Particles>
  );
}

function Navigation({
  onAuth,
  isLoggedIn,
}: {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="hero-content-layer site-header">
      <div className="nav-shell">
        <Link href="/" className="footer-brand" aria-label="CUET AI-Prep Home">
          <span className="footer-brand-mark bg-blue-600 text-white font-extrabold shadow-sm">C</span>
          <strong className="text-slate-900 text-lg font-extrabold tracking-tight">
            CUET<span className="text-blue-600">Prep</span>
          </strong>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <ParticleLink href="/dashboard/pyqs" className="nav-link font-semibold text-blue-600 hover:text-blue-700">
            Past Papers (PYQs)
          </ParticleLink>
          <ParticleLink href="#features" className="nav-link">
            Mock Tests
          </ParticleLink>
          <ParticleLink href="#colleges" className="nav-link">
            Colleges
          </ParticleLink>
          <ParticleLink href="#simulator" className="nav-link">
            CBT Simulator
          </ParticleLink>
          <ParticleLink href="#pricing" className="nav-link">
            Pricing
          </ParticleLink>
          <ParticleLink href="#faq" className="nav-link">
            FAQ
          </ParticleLink>
        </nav>

        <div className="nav-actions">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="btn-join flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <>
              <ParticleButton
                className="btn-login"
                onClick={() => onAuth("login")}
              >
                Login
              </ParticleButton>
              <ParticleButton
                className="btn-join"
                onClick={() => onAuth("signup")}
              >
                Join now <Icon icon={ArrowRight} size={15} />
              </ParticleButton>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-3">
          <Link
            href="/dashboard/pyqs"
            className="py-2.5 px-3 text-sm font-bold text-blue-600 bg-blue-50/80 rounded-xl hover:bg-blue-100/80 flex items-center justify-between"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Previous Year Papers</span>
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">411 Papers</span>
          </Link>
          <Link
            href="#features"
            className="py-2 px-3 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Mock Tests
          </Link>
          <Link
            href="#colleges"
            className="py-2 px-3 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Colleges
          </Link>
          <Link
            href="#simulator"
            className="py-2 px-3 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            CBT Simulator
          </Link>
          <Link
            href="#pricing"
            className="py-2 px-3 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="py-2 px-3 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full py-2.5 text-center bg-blue-600 text-white rounded-xl font-bold text-sm"
                onClick={() => setMobileMenuOpen(false)}
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
                  className="w-full py-2 text-center text-blue-600 border border-blue-400 rounded-xl font-semibold text-sm"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAuth("signup");
                  }}
                  className="w-full py-2.5 text-center bg-orange-600 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Join now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Feature({
  icon,
  text,
}: {
  icon: React.ElementType;
  text: React.ReactNode;
}) {
  return (
    <div className="feature-badge-item">
      <div className="feature-icon-box">
        <Icon icon={icon} size={19} />
      </div>
      <strong className="text-slate-800 font-bold text-xs sm:text-sm leading-snug">{text}</strong>
    </div>
  );
}

function Hero({
  onAuth,
  isLoggedIn,
}: {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  return (
    <section className="hero-wrapper">
      <div className="hero-bg-container" aria-hidden="true" />
      <div className="hero-gradient-mask" aria-hidden="true" />

      <Navigation onAuth={onAuth} isLoggedIn={isLoggedIn} />

      <main className="hero-content-layer hero-main">
        <div className="hero-copy">
          <div className="hero-badge">
            <Icon icon={Trophy} size={16} /> India&apos;s Most Trusted CUET Practice Platform
          </div>

          <h1>
            Your all-in-one<br />
            launchpad to<br />
            <span className="hero-shimmer">
              <ShimmeringText
                text="India's top universities."
                color="var(--primary-blue)"
                shimmeringColor="#7dd3fc"
                duration={2.2}
              />
            </span>
          </h1>

          <p>
            CUET mock tests, realistic practice, expert resources and everything you need to ace your preparation.
          </p>

          <div className="hero-actions flex flex-wrap items-center gap-6">
            <button
              className="btn-hero-cta"
              onClick={() => {
                if (isLoggedIn) {
                  router.push("/dashboard");
                } else {
                  onAuth("signup");
                }
              }}
            >
              <span>{isLoggedIn ? "Go to Dashboard" : "Start practicing free"}</span>
              <Icon icon={ArrowRight} size={19} />
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/assets/images/avatar_stack.png"
                alt="CUET Aspirants"
                className="h-9 w-auto object-contain"
              />
              <div className="trust-copy">
                Trusted by <strong>2L+</strong>
                <small>CUET aspirants</small>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="hero-content-layer hero-features">
        <Feature
          icon={FileText}
          text={
            <>
              Full-length<br />Mock Tests
            </>
          }
        />
        <Feature
          icon={BookOpen}
          text={
            <>
              Chapter-wise<br />Practice
            </>
          }
        />
        <Feature
          icon={Trophy}
          text={
            <>
              Detailed<br />Performance Insights
            </>
          }
        />
        <Feature
          icon={GraduationCap}
          text={
            <>
              Expert-curated<br />Study Resources
            </>
          }
        />
      </div>
    </section>
  );
}

function TargetUniversitiesSection({
  onAuth,
}: {
  onAuth: (mode: "login" | "signup") => void;
}) {
  return (
    <section id="colleges" className="content-section bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto">
        <div className="section-heading">
          <span className="eyebrow">TOP CENTRAL &amp; STATE UNIVERSITIES</span>
          <h2>Your Dream College is Just One CUET Score Away</h2>
          <p>
            We curate domain syllabus, test series, and past cutoff benchmarks tailored for the most coveted university campuses in India.
          </p>
        </div>

        <div className="universities-grid">
          {targetUniversities.map((item) => (
            <div key={item.name} className="university-card">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-md">
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.subBadge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                <span className="text-xs font-semibold text-slate-500">
                  {item.cutoff}
                </span>
                <button
                  type="button"
                  onClick={() => onAuth("signup")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSplit({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  return (
    <section id="pricing" className="pricing-section">
      <ScrollSplitCard
        imageSrc="/assets/images/PRICING_SECTION_BACKGROUND.png"
        cards={pricingCards}
        onSelect={() => onAuth("signup")}
      />
    </section>
  );
}

function CBTSimulatorSection({
  onAuth,
}: {
  onAuth: (mode: "login" | "signup") => void;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>("B");

  const options = [
    { id: "A", text: "Article 148", correct: false },
    { id: "B", text: "Article 124", correct: true },
    { id: "C", text: "Article 214", correct: false },
    { id: "D", text: "Article 280", correct: false },
  ];

  return (
    <section id="simulator" className="content-section bg-[#0a1120] text-white overflow-hidden">
      <div className="simulator-section">
        {/* Left Explanation Column */}
        <div className="section-copy">
          <span className="eyebrow orange mb-4">REAL NTA CBT INTERFACE SIMULATOR</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Experience the Exact NTA Exam Screen Before Test Day.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Eliminate exam anxiety. Our realistic simulator features the authentic NTA color palette, question navigation grid, question-skip options, marking scheme (+5 / -1), and live countdown timer.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <strong className="block text-white text-sm font-semibold">Authentic Question Palette</strong>
                <span className="text-xs text-slate-400 leading-normal">
                  Green for answered, Purple for marked for review, Grey for unvisited.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <strong className="block text-white text-sm font-semibold">Instant AI Explanation &amp; Concept Breakdown</strong>
                <span className="text-xs text-slate-400 leading-normal">
                  Understand the exact NCERT concept reference behind every question.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <Target className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <strong className="block text-white text-sm font-semibold">All-India Percentile &amp; Rank Predictor</strong>
                <span className="text-xs text-slate-400 leading-normal">
                  Benchmark your speed and accuracy against 200,000+ active CUET aspirants.
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAuth("signup")}
            className="btn-hero-cta"
          >
            <span>Try a Full 45-Min Mock</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Interactive Simulator Preview */}
        <div>
          <div className="simulator-card">
            <div className="simulator-top">
              <div className="flex items-center">
                <span className="live-dot" />
                <span className="font-bold tracking-wide">CUET 2026 SAMPLE DRILL</span>
              </div>
              <div className="timer">
                <Clock3 className="w-4 h-4" />
                <span>44:50 remaining</span>
              </div>
            </div>

            {/* Subject Tabs */}
            <div className="flex gap-2 my-4 overflow-x-auto pb-1 text-xs">
              <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded-md">General Test</span>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-md">Economics</span>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-md">Mathematics</span>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-md">English</span>
            </div>

            <div className="question-meta">
              Question 14 of 50 | Marks: +5, -1
            </div>

            <h3>
              Which Article of the Constitution of India provides for the establishment and constitution of the Supreme Court of India?
            </h3>

            <div className="answer-list">
              {options.map((option) => {
                const isSelected = selectedOption === option.id;
                const stateClass = isSelected
                  ? option.correct
                    ? "correct"
                    : "incorrect"
                  : "";

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedOption(option.id)}
                    className={`answer ${stateClass}`}
                  >
                    <span>
                      ({option.id}) {option.text}
                    </span>
                    <span className="answer-dot">
                      {isSelected ? (option.correct ? "✓" : "✕") : option.id}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedOption && (
              <div
                className={`feedback ${
                  options.find((o) => o.id === selectedOption)?.correct
                    ? "success"
                    : "error"
                }`}
              >
                {options.find((o) => o.id === selectedOption)?.correct ? (
                  <>
                    <strong>Correct! +5 Marks</strong>
                    <br />
                    Article 124 of the Indian Constitution establishes the Supreme Court of India. Article 148 deals with the Comptroller and Auditor General (CAG), while Article 214 provides for High Courts in States.
                  </>
                ) : (
                  <>
                    <strong>Incorrect (-1 Mark Penalty)</strong>
                    <br />
                    The correct answer is (B) Article 124. Article 148 is for the CAG of India.
                  </>
                )}
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-emerald-400 font-semibold">● 1 Answered</span>
              <span className="text-purple-400 font-semibold">● 0 Marked</span>
              <span className="text-slate-500 font-semibold">● 49 Not Visited</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentSections() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });
  const contentOpacity = useTransform(smoothProgress, [0, 0.8], [0, 1]);
  const contentY = useTransform(smoothProgress, [0, 1], [36, 0]);

  const cards = [
    {
      title: "Practice in the Exact Exam Environment",
      description:
        "Our mock tests replicate the real NTA interface: the same timer, colors, and question layout. When exam day arrives, nothing feels unfamiliar.",
      takeaway: "All 50 Questions, Exact Format",
      icon: MonitorCheck,
      tone: "blue",
    },
    {
      title: (
        <>
          Find Out <em>Why</em> You are Getting Questions Wrong
        </>
      ),
      description:
        'Most answer keys just say "Option A is correct." Ours explains why you chose Option C, what step you skipped, and which NCERT concept to revisit.',
      takeaway: "NCERT Concept-Level Explanations",
      icon: Lightbulb,
      tone: "green",
    },
    {
      title: "Fix Weak Spots in 5 Minutes a Day",
      description:
        "Short five-question drills built entirely from your past mistakes, not random questions. Catch the same errors before they cost you marks again.",
      takeaway: "Personalized Daily Practice Sprints",
      icon: Clock3,
      tone: "orange",
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="content-section feature-section">
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          y: shouldReduceMotion ? 0 : contentY,
        }}
      >
        <div className="section-heading">
          <span className="eyebrow">Everything You Need To Ace CUET</span>
          <h2>
            <KineticTextReveal
              text="Engineered for 100 Percentilers"
              splitBy="characters"
              stagger={0.06}
              distance={16}
              staggerFrom="center"
              inView
            />
          </h2>
          <p>Designed to maximize speed, accuracy and domain mastery.</p>
        </div>

        <div className="cards-grid feature-cards">
          {cards.map(({ title, description, takeaway, icon, tone }) => (
            <article className={`glass-card feature-promise-card ${tone}`} key={takeaway}>
              <div className="feature-promise-icon">
                <Icon icon={icon} size={28} />
              </div>
              <div className="feature-promise-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="feature-promise-takeaway">{takeaway}</span>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function AdmissionSection() {
  return (
    <section className="content-section admission-section">
      <div>
        <div className="section-heading admission-heading">
          <h2 className="admission-title">
            <span className="title-row">
              <span className="title-word">Turning</span>
              <AnnotatedText
                className="title-word annotated-word"
                variant="highlight"
                delay={0.08}
              >
                Ambition
              </AnnotatedText>
              <span className="title-word">into</span>
            </span>
            <span className="title-row title-row-bottom">
              <AnnotatedText
                className="title-word annotated-word"
                variant="highlight"
                delay={0.16}
              >
                Admission
              </AnnotatedText>
            </span>
          </h2>
        </div>
        <StickyScrollCards hint="Explore university campuses" cards={colleges} />
      </div>
    </section>
  );
}

function HallOfFameSection() {
  return (
    <section className="content-section bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-[1240px] mx-auto">
        <div className="section-heading">
          <span className="eyebrow">HALL OF FAME</span>
          <h2>From Our Mock Tests to DU North Campus</h2>
          <p>Hear directly from aspirants who cracked their target colleges in CUET 2025.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.name} className="testimonial-card">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">
                    {item.college} &bull; {item.score}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <section ref={sectionRef} id="faq" className="content-section light-section faq-section">
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          y: shouldReduceMotion ? 0 : contentY,
        }}
      >
        <div className="section-heading">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <Disclosure
              as="div"
              className="faq-item"
              key={question}
              open={open === index}
              onOpenChange={(isOpen) => setOpen(isOpen ? index : null)}
            >
              <DisclosureButton>
                <span>{question}</span>
                <Icon icon={ChevronDown} size={19} />
              </DisclosureButton>
              <DisclosurePanel>
                <p>{answer}</p>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FinalCTA({
  onAuth,
  isLoggedIn,
}: {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  return (
    <section className="final-cta">
      <div className="max-w-[780px] mx-auto">
        <h2>Ready to Step into Your Dream Campus?</h2>
        <p>
          Join over 200,000 students preparing with India&apos;s most realistic CUET mock test platform today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="btn-hero-cta"
            onClick={() => {
              if (isLoggedIn) {
                router.push("/dashboard");
              } else {
                onAuth("signup");
              }
            }}
          >
            <span>{isLoggedIn ? "Open Dashboard" : "Get Started Free"}</span>
            <Icon icon={ArrowRight} size={18} />
          </button>
          <Link
            href="/dashboard/mocks"
            className="px-6 py-4 rounded-[18px] border border-blue-400/40 text-blue-100 hover:text-white hover:border-white font-semibold text-sm transition-colors"
          >
            View Test Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}

function LandingFooter({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-art" aria-hidden="true" />
      <div className="footer-main">
        <div className="footer-brand-column">
          <Link className="footer-brand" href="/" aria-label="CUETPrep home">
            <span className="footer-brand-mark bg-blue-600 text-white font-extrabold shadow-sm">C</span>
            <strong className="text-slate-900 text-xl font-bold">
              CUET<span className="text-blue-600">Prep</span>
            </strong>
          </Link>
          <p>
            Know exactly where you stand. Practice smarter, build confidence, and get ready for your dream Delhi University college.
          </p>
          <div className="footer-socials" aria-label="Social media">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="CUETPrep on Twitter">
              <span aria-hidden="true">X</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="CUETPrep on LinkedIn">
              <span aria-hidden="true">in</span>
            </a>
          </div>
          <p className="footer-status">
            <span /> All systems operational
          </p>
        </div>
        <div className="footer-link-column">
          <h2>Prepare</h2>
          <Link href="#features">How it works</Link>
          <Link href="#pricing">Plans &amp; pricing</Link>
          <Link href="#faq">FAQs</Link>
          <Link href="/dashboard/mocks">Mock tests</Link>
        </div>
        <div className="footer-link-column">
          <h2>Explore</h2>
          <Link href="/dashboard/pyqs">Previous Year Papers</Link>
          <Link href="/dashboard/radar">Weakness Radar</Link>
          <Link href="/dashboard/leaderboard">Rankings &amp; Percentiles</Link>
          <Link href="/dashboard">Aspirant Command Hub</Link>
        </div>
        <div className="footer-link-column">
          <h2>Support</h2>
          <Link href="#faq">Help center</Link>
          <a href="mailto:support@cuetprep.com">Contact us</a>
          <Link href="#faq">Privacy policy</Link>
          <Link href="#faq">Terms of service</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 CUETPrep. All rights reserved.</span>
        <div>
          <button type="button" className="cursor-pointer" onClick={() => onAuth("login")}>
            Log in
          </button>
          <button
            type="button"
            className="footer-trial-link cursor-pointer"
            onClick={() => onAuth("signup")}
          >
            Start free trial <Icon icon={ArrowRight} size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPageClient() {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");

  return (
    <>
      {/* 1. Hero with DU Clock Tower, Shimmer, Avatar Proof & Feature Pills */}
      <Hero onAuth={setAuthMode} isLoggedIn={isLoggedIn} />

      {/* 2. Top Central & State Universities Benchmarks Grid */}
      <TargetUniversitiesSection onAuth={setAuthMode} />

      {/* 3. Interactive ScrollSplit 3D Perspective Flip Pricing Card */}
      <PricingSplit onAuth={setAuthMode} />

      {/* 4. Realistic NTA CBT Exam Interface Simulator */}
      <CBTSimulatorSection onAuth={setAuthMode} />

      {/* 5. Engineered for 100 Percentilers Feature Promise Cards */}
      <ContentSections />

      {/* 6. Turning Ambition into Admission & Sticky Campus Photo Stack */}
      <AdmissionSection />

      {/* 7. Hall of Fame Student Testimonials */}
      <HallOfFameSection />

      {/* 8. Collapsible Accordion FAQs */}
      <FAQ />

      {/* 9. High-Conversion Final CTA */}
      <FinalCTA onAuth={setAuthMode} isLoggedIn={isLoggedIn} />

      {/* 10. Illustrated Campus Artwork Footer */}
      <LandingFooter onAuth={setAuthMode} />

      {/* Authentic Supabase Auth & Multi-Step Onboarding Modal */}
      <OnboardingModal
        isOpen={Boolean(authMode)}
        onClose={() => setAuthMode(null)}
        initialMode={authMode || "signup"}
      />
    </>
  );
}
