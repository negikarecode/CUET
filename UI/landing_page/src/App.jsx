import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  GraduationCap,
  Lightbulb,
  MonitorCheck,
  Trophy,
  X,
} from 'lucide-react'
import { ScrollSplitCard } from '@/components/ui/scroll-split-card'
import { StickyScrollCards } from '@/components/ui/sticky-scroll-cards'
import { KineticTextReveal } from '@/components/ui/kinetic-text-reveal'
import { AnnotatedText } from '@/components/ui/annotated-text'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@/components/animate-ui/primitives/headless/disclosure'
import { Particles, ParticlesEffect } from '@/components/animate-ui/primitives/effects/particles'
import { ShimmeringText } from '@/components/animate-ui/primitives/texts/shimmering'
import hinduCollegeImage from '../assets/images/Hindu College, University of Delhi.jpg'
import stStephensImage from '../assets/images/St Stephen’s College, University Of Delhi.jpg'
import srccImage from '../assets/images/download (9).jpg'
import jamiaImage from '../assets/images/download (10).jpg'
import mirandaHouseImage from '../assets/images/@Shri Ram College of commerce (1).jpg'
import campusLifeImage from '../assets/images/Delhi University vibezzz.jpg'

const faqs = [
  ['Are these mock tests based on the latest NTA CUET 2026 syllabus?', 'Yes. Every test follows the latest NTA notification and rationalized Class 12 NCERT curriculum.'],
  ['Can I practice tests on mobile devices?', 'Absolutely. Practice drills and performance analytics work across phones, tablets and desktop.'],
  ['How does the negative marking calculation work?', 'You earn +5 marks for a correct answer and receive a -1 penalty for an incorrect response.'],
  ['Is the free plan really free to use?', 'Yes. Start with free diagnostic tests, daily questions and performance insights without a card.'],
]

function Icon({ icon: IconComponent, size = 18 }) {
  return <IconComponent size={size} strokeWidth={2} aria-hidden="true" />
}

function ParticleButton({ children, className, onClick, ...props }) {
  const [key, setKey] = useState(0)

  return <Particles key={key} className="particle-button-wrapper">
    <button {...props} className={className} onClick={(event) => { setKey((value) => value + 1); onClick?.(event) }}>
      {children}
    </button>
    <ParticlesEffect className="particle-effect" />
  </Particles>
}

function ParticleLink({ children, className, href }) {
  const [key, setKey] = useState(0)

  return <Particles key={key} className="particle-button-wrapper">
    <a href={href} className={className} onClick={() => setKey((value) => value + 1)}>
      {children}
    </a>
    <ParticlesEffect className="particle-effect" />
  </Particles>
}

function Navigation({ onAuth }) {
  return (
    <header className="hero-content-layer site-header">
      <div className="nav-shell">
        <nav className="desktop-nav" aria-label="Main navigation">
          <ParticleLink href="#features" className="nav-link">Mock Tests</ParticleLink>
          <ParticleLink href="#faq" className="nav-link">F&amp;Q</ParticleLink>
          <ParticleLink href="#pricing-cards" className="nav-link">Pricing</ParticleLink>
        </nav>
        <div className="nav-actions">
          <ParticleButton className="btn-login" onClick={() => onAuth('login')}>Login</ParticleButton>
          <ParticleButton className="btn-join" onClick={() => onAuth('signup')}>Join now <Icon icon={ArrowRight} size={16} /></ParticleButton>
        </div>
      </div>
    </header>
  )
}

function Hero({ onAuth }) {
  return <section className="hero-wrapper">
    <div className="hero-bg-container" aria-hidden="true" /><div className="hero-gradient-mask" aria-hidden="true" />
    <Navigation onAuth={onAuth} />
    <main className="hero-content-layer hero-main"><div className="hero-copy">
      <div className="hero-badge"><Icon icon={Trophy} size={16} /> India's Most Trusted CUET Practice Platform</div>
      <h1>Your all-in-one<br />launchpad to<br /><span className="hero-shimmer"><ShimmeringText text="India's top universities." color="var(--primary-blue)" shimmeringColor="#7dd3fc" duration={2.2} /></span></h1>
      <p>CUET mock tests, realistic practice, expert resources and everything you need to ace your preparation.</p>
      <div className="hero-actions"><button className="btn-hero-cta" onClick={() => onAuth('signup')}>Start practicing free <Icon icon={ArrowRight} size={19} /></button><div className="trust-copy">Trusted by <strong>2L+</strong><small>CUET aspirants</small></div></div>
    </div></main>
    <div className="hero-content-layer hero-features"><Feature icon={FileText} text={<>Full-length<br />Mock Tests</>} /><Feature icon={BookOpen} text={<>Chapter-wise<br />Practice</>} /><Feature icon={Trophy} text={<>Detailed<br />Performance Insights</>} /><Feature icon={GraduationCap} text={<>Expert-curated<br />Study Resources</>} /></div>
  </section>
}

function Feature({ icon, text }) { return <div className="feature-badge-item"><div className="feature-icon-box"><Icon icon={icon} size={19} /></div><strong>{text}</strong></div> }

function ContentSections() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 })
  const contentOpacity = useTransform(smoothProgress, [0, 0.8], [0, 1])
  const contentY = useTransform(smoothProgress, [0, 1], [36, 0])

  const cards = [
    {
      title: 'Practice in the Exact Exam Environment',
      description: 'Our mock tests replicate the real NTA interface: the same timer, colors and question layout. When exam day arrives, nothing feels unfamiliar.',
      takeaway: 'All 50 Questions, Exact Format',
      icon: MonitorCheck,
      tone: 'blue',
    },
    {
      title: <>Find Out <em>Why</em> You are Getting Questions Wrong</>,
      description: 'Most answer keys just say "Option A is correct." Ours explains why you chose Option C, what step you skipped and which NCERT concept to revisit.',
      takeaway: 'NCERT Concept-Level Explanations',
      icon: Lightbulb,
      tone: 'green',
    },
    {
      title: 'Fix Weak Spots in 5 Minutes a Day',
      description: 'Short five-question drills built entirely from your past mistakes, not random questions. Catch the same errors before they cost you marks again.',
      takeaway: 'Personalized Daily Practice Sprints',
      icon: Clock3,
      tone: 'orange',
    },
  ]

  return <section ref={sectionRef} id="features" className="content-section feature-section"><motion.div style={{ opacity: shouldReduceMotion ? 1 : contentOpacity, y: shouldReduceMotion ? 0 : contentY }}><div className="section-heading"><span className="eyebrow">Everything You Need To Ace CUET</span><h2><KineticTextReveal text="Engineered for 100 Percentilers" splitBy="characters" stagger={0.06} distance={16} staggerFrom="center" inView /></h2><p>Designed to maximize speed, accuracy and domain mastery.</p></div><div className="cards-grid feature-cards">{cards.map(({ title, description, takeaway, icon, tone }) => <article className={`glass-card feature-promise-card ${tone}`} key={takeaway}><div className="feature-promise-icon"><Icon icon={icon} size={28} /></div><div className="feature-promise-copy"><h3>{title}</h3><p>{description}</p></div><span className="feature-promise-takeaway">{takeaway}</span></article>)}</div></motion.div></section>
}

function AdmissionSection() {
  const colleges = [
    {
      title: 'Miranda college',
      src: srccImage,
    },
    {
      title: 'Hindu College',
      src: hinduCollegeImage,
    },
    {
      title: "St. Stephen's College",
      src: stStephensImage,
    },
    {
      title: 'Dare to Dream big',
      src: jamiaImage,
    },
    {
      title: 'SRCC',
      src: mirandaHouseImage,
    },
    {
      title: 'Find your place at Delhi University',
      src: campusLifeImage,
    },
  ]

  return <section className="content-section admission-section">
    <div>
      <div className="section-heading admission-heading">
        <h2 className="admission-title">
          <span className="title-row">
            <span className="title-word">Turning</span>
            <AnnotatedText className="title-word annotated-word" variant="highlight" delay={0.08}>Ambition</AnnotatedText>
            <span className="title-word">into</span>
          </span>
          <span className="title-row title-row-bottom">
            <AnnotatedText className="title-word annotated-word" variant="highlight" delay={0.16}>Admission</AnnotatedText>
          </span>
        </h2>
      </div>
      <StickyScrollCards hint="Explore university campuses" cards={colleges} />
    </div>
  </section>
}

function FAQ() {
  const [open, setOpen] = useState(null)
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const contentY = useTransform(scrollYProgress, [0, 1], [28, 0])

  return <section ref={sectionRef} id="faq" className="content-section light-section faq-section">
    <motion.div style={{ opacity: shouldReduceMotion ? 1 : contentOpacity, y: shouldReduceMotion ? 0 : contentY }}>
      <div className="section-heading"><h2>Frequently Asked Questions</h2></div>
      <div className="faq-list">{faqs.map(([question, answer], index) => <Disclosure as="div" className="faq-item" key={question} open={open === index} onOpenChange={isOpen => setOpen(isOpen ? index : null)}><DisclosureButton><span>{question}</span><Icon icon={ChevronDown} size={19} /></DisclosureButton><DisclosurePanel><p>{answer}</p></DisclosurePanel></Disclosure>)}</div>
    </motion.div>
  </section>
}

function PricingSplit({ onAuth }) {
  const cards = [
    {
      title: 'Free',
      description: 'Build your preparation rhythm with daily practice and essential CUET resources.',
      price: '₹0',
      features: ['Daily practice questions', 'Essential CUET resources', 'Diagnostic mock tests'],
      cta: 'Start for free',
      tier: 'free',
      bgColor: '#f4f1e7',
      textColor: '#172033',
    },
    {
      title: 'Gold',
      description: 'Get the focused practice and insights you need to move your score forward.',
      price: '₹699',
      originalPrice: '₹999',
      badge: 'Most popular',
      features: ['Everything in Free', 'Full-length mock tests', 'Chapter-wise practice', 'Performance insights'],
      cta: 'Choose Gold',
      tier: 'gold',
      bgColor: '#20232b',
      textColor: '#ffffff',
    },
  ]

  return <section id="pricing" className="pricing-section">
    <ScrollSplitCard imageSrc="/assets/images/PRICING_SECTION_BACKGROUND.png" cards={cards} onSelect={() => onAuth('signup')} />
  </section>
}

function AuthModal({ mode, onClose }) { const [signup, setSignup] = useState(mode === 'signup'); return <div className="modal-overlay" role="dialog" aria-modal="true"><div className="auth-modal"><button className="modal-close" onClick={onClose} aria-label="Close"><Icon icon={X} /></button><div className="modal-tabs"><button className={!signup ? 'active' : ''} onClick={() => setSignup(false)}>Login</button><button className={signup ? 'active' : ''} onClick={() => setSignup(true)}>Create Account</button></div><h2>{signup ? 'Create your Free Account' : 'Welcome back to CUETPrep'}</h2><p>{signup ? 'Start with full-length mocks and personalized analytics.' : 'Enter your details to continue your practice session.'}</p><form onSubmit={(event) => { event.preventDefault(); onClose() }}>{signup && <input placeholder="Full Name" />}{<input required placeholder="Email or Mobile Number" />}<input required type="password" placeholder="Password" /><button className="btn-hero-cta" type="submit">{signup ? 'Join Free' : 'Log In'}</button></form></div></div> }

function Footer({ onAuth }) {
  return <footer className="site-footer">
    <div className="footer-art" aria-hidden="true" />
    <div className="footer-main">
      <div className="footer-brand-column">
        <a className="footer-brand" href="#top" aria-label="CUETPrep home">
          <span className="footer-brand-mark">C</span>
          <strong>CUET<span>Prep</span></strong>
        </a>
        <p>Know exactly where you stand. Practice smarter, build confidence and get ready for your CUET journey.</p>
        <div className="footer-socials" aria-label="Social media">
          <a href="https://twitter.com" aria-label="CUETPrep on Twitter"><span aria-hidden="true">X</span></a>
          <a href="https://linkedin.com" aria-label="CUETPrep on LinkedIn"><span aria-hidden="true">in</span></a>
        </div>
        <p className="footer-status"><span /> All systems operational</p>
      </div>
      <div className="footer-link-column"><h2>Prepare</h2><a href="#features">How it works</a><a href="#pricing">Plans &amp; pricing</a><a href="#faq">FAQs</a><a href="#features">Mock tests</a></div>
      <div className="footer-link-column"><h2>Explore</h2><a href="#features">Study resources</a><a href="#features">Performance insights</a><a href="#faq">CUET 2026 guide</a><a href="#features">About CUETPrep</a></div>
      <div className="footer-link-column"><h2>Support</h2><a href="#faq">Help center</a><a href="mailto:hello@cuetprep.com">Contact us</a><a href="#faq">Privacy policy</a><a href="#faq">Terms of service</a></div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 CUETPrep. All rights reserved.</span>
      <div><button onClick={() => onAuth('login')}>Log in</button><button className="footer-trial-link" onClick={() => onAuth('signup')}>Start free trial <Icon icon={ArrowRight} size={15} /></button></div>
    </div>
  </footer>
}

export default function App() { const [authMode, setAuthMode] = useState(null); return <><Hero onAuth={setAuthMode} /><PricingSplit onAuth={setAuthMode} /><ContentSections /><AdmissionSection /><FAQ /><Footer onAuth={setAuthMode} />{authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />}</> }
