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
  X,
  LayoutDashboard,
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
    src: "/assets/images/download (9).jpg",
  },
  {
    title: "Hindu College",
    src: "/assets/images/Hindu College, University of Delhi.jpg",
  },
  {
    title: "St. Stephen's College",
    src: "/assets/images/St Stephen’s College, University Of Delhi.jpg",
  },
  {
    title: "Dare to Dream Big",
    src: "/assets/images/download (10).jpg",
  },
  {
    title: "SRCC",
    src: "/assets/images/@Shri Ram College of commerce (1).jpg",
  },
  {
    title: "Find your place at Delhi University",
    src: "/assets/images/Delhi University vibezzz.jpg",
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
          <ParticleLink href="#features" className="nav-link">
            Mock Tests
          </ParticleLink>
          <ParticleLink href="#faq" className="nav-link">
            F&amp;Q
          </ParticleLink>
          <ParticleLink href="#pricing" className="nav-link">
            Pricing
          </ParticleLink>
          <ParticleLink href="/dashboard" className="nav-link">
            Dashboard
          </ParticleLink>
        </nav>

        <div className="nav-actions">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="btn-join flex items-center gap-1.5"
            >
              <LayoutDashboard size={15} />
              <span>Go to Dashboard</span>
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
        </div>
      </div>
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
      <strong className="text-slate-800 text-sm font-semibold">{text}</strong>
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
            Your all-in-one
            <br />
            launchpad to
            <br />
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
            Authentic NTA CBT simulator, shift-wise PYQs, instant AI mistake diagnosis, and everything you need to ace your CUET 2026 preparation.
          </p>
          <div className="hero-actions">
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
              {isLoggedIn ? "Open Student Dashboard" : "Start practicing free"}{" "}
              <Icon icon={ArrowRight} size={19} className="cta-arrow" />
            </button>
            <div className="trust-copy">
              Trusted by <strong>2L+</strong>
              <small>CUET aspirants</small>
            </div>
          </div>
        </div>
      </main>

      <div className="hero-content-layer hero-features">
        <Feature
          icon={FileText}
          text={
            <>
              Full-length
              <br />
              Mock Tests
            </>
          }
        />
        <Feature
          icon={BookOpen}
          text={
            <>
              Chapter-wise
              <br />
              Practice
            </>
          }
        />
        <Feature
          icon={Trophy}
          text={
            <>
              Detailed
              <br />
              Performance Insights
            </>
          }
        />
        <Feature
          icon={GraduationCap}
          text={
            <>
              Expert-curated
              <br />
              Study Resources
            </>
          }
        />
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
        "Our mock tests replicate the real NTA interface: the identical countdown timer, palette colors, and question layout. When exam day arrives, nothing feels unfamiliar.",
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
        'Most answer keys just say "Option A is correct." Ours explains why you fell for Option C, what step you skipped, and which NCERT concept to revisit.',
      takeaway: "NCERT Concept-Level Explanations",
      icon: Lightbulb,
      tone: "green",
    },
    {
      title: "Fix Weak Spots in 5 Minutes a Day",
      description:
        "Short five-question drills built entirely from your past mistakes, not generic questions. Catch the same conceptual errors before they cost you negative marks.",
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

function AuthModal({
  mode,
  onClose,
}: {
  mode: "login" | "signup";
  onClose: () => void;
}) {
  const router = useRouter();
  const [signup, setSignup] = useState(mode === "signup");

  const handleRedirect = (target: string) => {
    onClose();
    router.push(target);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="auth-modal shadow-2xl border border-slate-100">
        <button
          className="modal-close p-1 hover:text-slate-900 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <Icon icon={X} size={20} />
        </button>
        <div className="modal-tabs">
          <button
            type="button"
            className={!signup ? "active text-blue-600 font-bold" : "text-slate-400 font-semibold"}
            onClick={() => setSignup(false)}
          >
            Login
          </button>
          <button
            type="button"
            className={signup ? "active text-blue-600 font-bold" : "text-slate-400 font-semibold"}
            onClick={() => setSignup(true)}
          >
            Create Account
          </button>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          {signup ? "Create your Free Account" : "Welcome back to CUETPrep"}
        </h2>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          {signup
            ? "Start with full-length mocks, PYQs and personalized diagnostics."
            : "Enter your credentials to continue your practice session."}
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleRedirect(signup ? "/signup" : "/login")}
            className="btn-hero-cta w-full justify-center text-sm py-3"
          >
            {signup ? "Continue to Sign Up" : "Continue to Log In"}{" "}
            <Icon icon={ArrowRight} size={16} />
          </button>

          <div className="text-center text-xs text-slate-400 pt-2">
            Instant access to NTA CBT Simulators
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingFooter({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-art" aria-hidden="true" />
      <div className="footer-main">
        <div className="footer-brand-column">
          <Link className="footer-brand" href="#top" aria-label="CUETPrep home">
            <span className="footer-brand-mark bg-blue-600 text-white font-extrabold shadow-sm">C</span>
            <strong className="text-slate-900 text-xl font-bold">
              CUET<span className="text-blue-600">Prep</span>
            </strong>
          </Link>
          <p>
            Know exactly where you stand. Practice smarter, build confidence, and get ready for your dream Delhi University college.
          </p>
          <div className="footer-socials" aria-label="Social media">
            <a href="https://twitter.com" aria-label="CUETPrep on Twitter">
              <span aria-hidden="true">X</span>
            </a>
            <a href="https://linkedin.com" aria-label="CUETPrep on LinkedIn">
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
        <span>© 2026 CUETPrep. All rights reserved.</span>
        <div>
          <button onClick={() => onAuth("login")}>Log in</button>
          <button className="footer-trial-link" onClick={() => onAuth("signup")}>
            Start free trial <Icon icon={ArrowRight} size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const isLoggedIn = isClient && Boolean(user?.isLoggedIn && user?.name && user?.id !== "guest");

  return (
    <>
      <Hero onAuth={setAuthMode} isLoggedIn={isLoggedIn} />
      <PricingSplit onAuth={setAuthMode} />
      <ContentSections />
      <AdmissionSection />
      <FAQ />
      <LandingFooter onAuth={setAuthMode} />
      {authMode && (
        <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
      )}
    </>
  );
}
