"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
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
  HelpCircle,
  ArrowUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import OnboardingModal from "@/components/auth/OnboardingModal";
import { CUET_AUTHORITY } from "@/lib/constants/cuetAuthority";
import { createClient } from "@/lib/supabase/client";

/* ==========================================================================
   DATA DEFINITIONS (All original data preserved + enriched with official specs)
   ========================================================================== */

interface SyllabusSubject {
  code: string;
  name: string;
  unitsCount: number;
  units: { title: string; topics: string[] }[];
}

const syllabusByStream: Record<string, SyllabusSubject[]> = {
  science: [
    {
      code: "322",
      name: "Physics",
      unitsCount: 5,
      units: [
        {
          title: "Electrostatics & Current Electricity",
          topics: [
            "Electric Charges & Fields",
            "Electrostatic Potential & Capacitance",
            "Current Electricity & Ohm's Law",
          ],
        },
        {
          title: "Magnetic Effects & Magnetism",
          topics: [
            "Moving Charges & Magnetism",
            "Magnetism and Matter",
            "Cyclotron & Galvanometer",
          ],
        },
        {
          title: "Electromagnetic Induction & AC",
          topics: [
            "Faraday's & Lenz's Law",
            "Alternating Currents & Transformers",
            "LC Oscillations",
          ],
        },
        {
          title: "Optics & Optical Instruments",
          topics: [
            "Ray Optics & Telescopes",
            "Wave Optics & Interference",
            "Diffraction & Polarisation",
          ],
        },
        {
          title: "Modern Physics & Semiconductors",
          topics: [
            "Dual Nature of Radiation",
            "Atoms & Nuclei",
            "Semiconductor Diodes & Logic Gates",
          ],
        },
      ],
    },
    {
      code: "306",
      name: "Chemistry",
      unitsCount: 5,
      units: [
        {
          title: "Physical Chemistry",
          topics: [
            "Solutions & Colligative Properties",
            "Electrochemistry & Nernst Equation",
            "Chemical Kinetics & Rate Laws",
          ],
        },
        {
          title: "Inorganic Chemistry",
          topics: [
            "d and f-Block Elements",
            "Coordination Compounds & IUPAC",
            "Valence Bond & Crystal Field Theory",
          ],
        },
        {
          title: "Organic Chemistry: Haloalkanes to Alcohols",
          topics: [
            "Haloalkanes & Haloarenes",
            "Alcohols, Phenols & Ethers",
            "Nucleophilic Substitution Mechanisms",
          ],
        },
        {
          title: "Organic Chemistry: Carbonyls & Amines",
          topics: [
            "Aldehydes, Ketones & Carboxylic Acids",
            "Amines & Diazonium Salts",
          ],
        },
        {
          title: "Biomolecules & Everyday Chemistry",
          topics: [
            "Carbohydrates, Amino Acids & Proteins",
            "Nucleic Acids (DNA/RNA)",
            "Enzymes & Vitamins",
          ],
        },
      ],
    },
    {
      code: "319",
      name: "Mathematics",
      unitsCount: 5,
      units: [
        {
          title: "Relations, Functions & Algebra",
          topics: [
            "Types of Relations & Functions",
            "Inverse Trigonometric Functions",
            "Matrices & Determinants",
          ],
        },
        {
          title: "Calculus: Differentiation",
          topics: [
            "Continuity & Differentiability",
            "Applications of Derivatives",
            "Maxima & Minima Optimization",
          ],
        },
        {
          title: "Calculus: Integration",
          topics: [
            "Indefinite & Definite Integrals",
            "Area Under Curves (Bounded Regions)",
            "Differential Equations",
          ],
        },
        {
          title: "Vectors & 3D Geometry",
          topics: [
            "Vector Operations & Dot/Cross Products",
            "Direction Cosines & Direction Ratios",
            "Lines and Planes in Space",
          ],
        },
        {
          title: "Probability & Linear Programming",
          topics: [
            "Conditional Probability & Bayes' Theorem",
            "Random Variables & Probability Distributions",
            "LPP Graphical Method",
          ],
        },
      ],
    },
    {
      code: "304",
      name: "Biology",
      unitsCount: 5,
      units: [
        {
          title: "Reproduction",
          topics: [
            "Sexual Reproduction in Flowering Plants",
            "Human Reproduction & Gametogenesis",
            "Reproductive Health & Contraception",
          ],
        },
        {
          title: "Genetics and Evolution",
          topics: [
            "Principles of Inheritance & Mendelian Laws",
            "Molecular Basis of Inheritance (DNA/RNA)",
            "Evolution & Hardy-Weinberg Equilibrium",
          ],
        },
        {
          title: "Biology and Human Welfare",
          topics: [
            "Human Health and Disease",
            "Microbes in Human Welfare",
            "Immunology & Vaccines",
          ],
        },
        {
          title: "Biotechnology & Applications",
          topics: [
            "Genetic Engineering Principles & rDNA Tools",
            "Applications in Medicine and Agriculture",
          ],
        },
        {
          title: "Ecology and Environment",
          topics: [
            "Organisms and Populations",
            "Ecosystem Structure & Productivity",
            "Biodiversity and Conservation Strategies",
          ],
        },
      ],
    },
  ],
  commerce: [
    {
      code: "301",
      name: "Accountancy",
      unitsCount: 4,
      units: [
        {
          title: "Partnership Accounting",
          topics: [
            "Fundamentals, Goodwill Valuation",
            "Admission, Retirement & Death of Partner",
            "Dissolution of Partnership Firm",
          ],
        },
        {
          title: "Company Accounts",
          topics: [
            "Issue and Forfeiture of Equity Shares",
            "Pro-rata Allotment & Calls in Arrear",
            "Issue & Redemption of Debentures",
          ],
        },
        {
          title: "Financial Statement Analysis",
          topics: [
            "Financial Statements of a Company (Schedule III)",
            "Comparative & Common Size Statements",
            "Accounting Ratios (Liquidity, Solvency, Turnover)",
          ],
        },
        {
          title: "Cash Flow Statement",
          topics: [
            "Operating, Investing & Financing Activities",
            "Indirect Method Calculations",
            "AS-3 Cash Flow Statement Reporting",
          ],
        },
      ],
    },
    {
      code: "305",
      name: "Business Studies",
      unitsCount: 4,
      units: [
        {
          title: "Principles & Management Functions",
          topics: [
            "Nature & Significance of Management",
            "Principles of Fayol & Scientific Management (Taylor)",
            "Business Environment Dimensions",
          ],
        },
        {
          title: "Planning, Organising & Staffing",
          topics: [
            "Planning Process & Strategic Decision Making",
            "Organisational Structure (Functional & Divisional)",
            "Staffing, Recruitment & Selection Process",
          ],
        },
        {
          title: "Directing and Controlling",
          topics: [
            "Leadership Styles, Maslow's Need Hierarchy",
            "Communication Barriers & Overcoming Them",
            "Controlling Process & Techniques",
          ],
        },
        {
          title: "Business Finance & Marketing",
          topics: [
            "Financial Management & Capital Structure",
            "Financial Markets (Money Market, Capital Market, SEBI)",
            "Marketing Mix (4 Ps) & Consumer Protection Act 2019",
          ],
        },
      ],
    },
    {
      code: "309",
      name: "Economics",
      unitsCount: 4,
      units: [
        {
          title: "Macroeconomics: Income & Money",
          topics: [
            "National Income Aggregates (GDP, NDP, NNP)",
            "Money Creation & RBI Monetary Policy Tools",
            "Keynesian Theory of Income & Employment",
          ],
        },
        {
          title: "Macroeconomics: Budget & BoP",
          topics: [
            "Government Budget: Revenue & Fiscal Deficits",
            "Balance of Payments (Current & Capital Account)",
            "Foreign Exchange Rate Determination",
          ],
        },
        {
          title: "Indian Economic Development: 1947–1990",
          topics: [
            "Development Experience & Five Year Plans",
            "Economic Reforms since 1991 (LPG Policies)",
            "Agriculture, Industrial & Trade Policy Reforms",
          ],
        },
        {
          title: "Current Challenges & Comparative Growth",
          topics: [
            "Human Capital Formation & Rural Credit",
            "Employment Trends & Sustainable Development",
            "Comparative Development: India, China & Pakistan",
          ],
        },
      ],
    },
    {
      code: "319B",
      name: "Applied Mathematics",
      unitsCount: 4,
      units: [
        {
          title: "Numbers & Numerical Applications",
          topics: [
            "Modulo Arithmetic & Congruence",
            "Allegation, Mixtures & Numerical Inequalities",
            "Logarithms & Antilogarithms",
          ],
        },
        {
          title: "Algebra & Calculus in Commerce",
          topics: [
            "Matrices Applications in Business Models",
            "Marginal Revenue, Cost & Profit Maximisation",
            "Consumer & Producer Surplus",
          ],
        },
        {
          title: "Financial Mathematics",
          topics: [
            "Perpetuity, Sinking Funds & Amortisation",
            "Valuation of Bonds & Effective Interest Rates",
            "EMI Calculations & Depreciation Methods",
          ],
        },
        {
          title: "Probability & Linear Programming",
          topics: [
            "Poisson & Normal Probability Distributions",
            "Time Series Analysis & Moving Averages",
            "Linear Programming Formulations",
          ],
        },
      ],
    },
  ],
  humanities: [
    {
      code: "314",
      name: "History",
      unitsCount: 3,
      units: [
        {
          title: "Ancient India: Harappan & Vedic Civilization",
          topics: [
            "Bricks, Beads and Bones (Harappan Archaeology)",
            "Kings, Farmers and Towns (Early States c. 600 BCE)",
            "Kinship, Caste and Class (Mahabharata Society)",
            "Thinkers, Beliefs & Buildings (Buddhism & Sanchi)",
          ],
        },
        {
          title: "Medieval India: Society & Agrarian Structure",
          topics: [
            "Through the Eyes of Travellers (Al-Biruni, Ibn Battuta)",
            "Bhakti-Sufi Traditions & Religious Beliefs",
            "An Imperial Capital: Vijayanagara Architecture",
            "Peasants, Zamindars and State (Mughal Agrarian Order)",
          ],
        },
        {
          title: "Modern India: Colonialism & Independence",
          topics: [
            "Colonialism and the Countryside (Permanent Settlement)",
            "Rebels and the Raj (1857 Revolt & Representations)",
            "Mahatma Gandhi and the Nationalist Movement",
            "Framing the Constitution of India",
          ],
        },
      ],
    },
    {
      code: "323",
      name: "Political Science",
      unitsCount: 4,
      units: [
        {
          title: "Contemporary World Politics: Cold War & Power",
          topics: [
            "The End of Bipolarity (Soviet Collapse)",
            "New Centres of Power (European Union, ASEAN, BRICS)",
            "Contemporary South Asia & Regional Cooperation",
          ],
        },
        {
          title: "Global Organizations & Security",
          topics: [
            "United Nations & UNSC Restructuring",
            "Traditional and Non-Traditional Security",
            "Environment, Global Commons & Globalization Debates",
          ],
        },
        {
          title: "Politics in India Since Independence",
          topics: [
            "Challenges of Nation-Building & State Reorganisation",
            "Era of One-Party Dominance",
            "Politics of Planned Development & Planning Commission",
          ],
        },
        {
          title: "Democratic Resurgence & Recent Politics",
          topics: [
            "Crisis of Democratic Order (Emergency 1975)",
            "Regional Aspirations & Identity Assertions",
            "Coalition Politics & Electoral Reforms in Modern India",
          ],
        },
      ],
    },
    {
      code: "313",
      name: "Geography",
      unitsCount: 3,
      units: [
        {
          title: "Fundamentals of Human Geography",
          topics: [
            "Nature and Scope of Human Geography",
            "World Population: Distribution, Density & Growth",
            "Human Development Index (HDI) Dimensions",
            "Primary, Secondary, Tertiary & Quaternary Activities",
          ],
        },
        {
          title: "India: People and Economy",
          topics: [
            "Population Distribution, Density & Migration Dynamics",
            "Rural and Urban Settlement Patterns",
            "Land, Water, Mineral & Energy Resources of India",
            "Planning and Sustainable Development in India",
          ],
        },
        {
          title: "Transport, Communication & Trade",
          topics: [
            "Roadways, Railways, Waterways & Air Corridors",
            "International Trade Composition & Major Seaports",
            "Geographical Perspectives on Environmental Pollution",
          ],
        },
      ],
    },
    {
      code: "324",
      name: "Psychology",
      unitsCount: 4,
      units: [
        {
          title: "Variations in Psychological Attributes",
          topics: [
            "Theories of Intelligence (Gardner, Sternberg)",
            "Psychological Testing & Aptitude Assessment",
            "Emotional Intelligence & Creative Potential",
          ],
        },
        {
          title: "Self and Personality",
          topics: [
            "Concept of Self and Personality Structure",
            "Trait, Type & Psychodynamic Approaches (Freud)",
            "Personality Assessment (Projective Tests & Inventories)",
          ],
        },
        {
          title: "Stress & Psychological Disorders",
          topics: [
            "Nature and Types of Stress, Coping Mechanisms",
            "Concepts of Abnormality, DSM-5 Diagnostic Criteria",
            "Anxiety, Mood, Schizophrenia & Dissociative Disorders",
          ],
        },
        {
          title: "Therapeutic Approaches & Social Dynamics",
          topics: [
            "CBT, Psychodynamic & Humanistic-Existential Therapies",
            "Attitude Formation, Attitude Change & Social Cognition",
            "Prejudice, Discrimination & Group Influence",
          ],
        },
      ],
    },
  ],
  general: [
    {
      code: "101",
      name: "English",
      unitsCount: 5,
      units: [
        {
          title: "Reading Comprehension",
          topics: [
            "Factual Passages (Scientific reports & Data analysis)",
            "Narrative Passages (Biographies & Short stories)",
            "Literary Passages (Essays, Extracts & Critical prose)",
          ],
        },
        {
          title: "Verbal Ability & Para Jumbles",
          topics: [
            "Sentence Sequencing (P-Q-R-S Ordering)",
            "Rearranging Parts of a Sentence",
            "Paragraph Cohesion & Sentence Completion",
          ],
        },
        {
          title: "Contextual Word Usage & Grammar",
          topics: [
            "Subject-Verb Agreement, Tenses & Prepositions",
            "Active and Passive Voice, Direct/Indirect Speech",
            "Spotting Errors & Sentence Correction",
          ],
        },
        {
          title: "Synonyms and Antonyms",
          topics: [
            "Contextual Synonyms in Complex Passages",
            "Antonyms in Contrastive Sentences",
            "Etymology, Prefixes, Suffixes & Root Words",
          ],
        },
        {
          title: "Vocabulary, Idioms and Phrases",
          topics: [
            "CUET High-Frequency Idiomatic Expressions",
            "Phrasal Verbs & Their Grammatical Nuances",
            "One Word Substitution & Spelling Accuracy",
          ],
        },
      ],
    },
    {
      code: "501",
      name: "General Test",
      unitsCount: 4,
      units: [
        {
          title: "General Knowledge & Current Affairs",
          topics: [
            "Indian Constitution, History & Geography Landmarks",
            "National & International Awards, Major Summits",
            "Sports, Science Developments & Past 12-Month Headlines",
          ],
        },
        {
          title: "General Mental Ability",
          topics: [
            "Number Series, Alphabet Series & Analogy",
            "Coding-Decoding & Blood Relations",
            "Direction Sense Test & Venn Diagram Interpretation",
          ],
        },
        {
          title: "Numerical Ability & Quantitative Aptitude",
          topics: [
            "Percentages, Profit & Loss, Ratio & Proportion",
            "Simple & Compound Interest, Averages, Time & Work",
            "Speed, Time & Distance, 2D/3D Mensuration",
          ],
        },
        {
          title: "Logical and Analytical Reasoning",
          topics: [
            "Syllogisms & Statement-Assumption Arguments",
            "Linear & Circular Seating Arrangement",
            "Data Interpretation (Bar Graphs, Tables, Pie Charts)",
          ],
        },
      ],
    },
    {
      code: "102",
      name: "Hindi",
      unitsCount: 4,
      units: [
        {
          title: "बोधगम्यता (Reading Comprehension)",
          topics: [
            "अपठित गद्यांश (तथ्यात्मक, साहित्यिक एवं विचारात्मक)",
            "गद्यांश का मूल भाव एवं संदर्भ आधारित प्रश्न",
            "शीर्षक चयन एवं भाषाई विश्लेषण",
          ],
        },
        {
          title: "वाक्य व्यवस्था एवं मौखिक योग्यता",
          topics: [
            "वाक्यों का क्रमीकरण (Para Jumbles)",
            "रिक्त स्थान पूर्ति एवं वाक्य संयोजन",
            "वाक्य रूपांतरण एवं पदक्रम शुद्धि",
          ],
        },
        {
          title: "व्याकरण एवं शब्द भंडार",
          topics: [
            "संधि, समास, उपसर्ग एवं प्रत्यय",
            "पर्यायवाची, विलोम एवं अनेकार्थी शब्द",
            "समरूपी भिन्नार्थक शब्द एवं तत्सम-तद्भव",
          ],
        },
        {
          title: "मुहावरे, लोकोक्तियाँ एवं वाक्यांश",
          topics: [
            "प्रचलित मुहावरे एवं उनके व्यावहारिक प्रयोग",
            "लोकोक्तियाँ एवं कहावतें",
            "वाक्यांश के लिए एक शब्द एवं वर्तनी शुद्धि",
          ],
        },
      ],
    },
  ],
};

const targetUniversities = [
  {
    name: "University of Delhi (DU)",
    badge: "RANK #1 TARGET",
    subBadge: "70+ Colleges",
    category: "central",
    description:
      "Home to SRCC, St. Stephen's, Hindu College, Hansraj, Miranda House, and LSR.",
    cutoff: "Avg Cutoff: 98.5+ Percentile",
    cta: "Take DU Mock",
    highlight: true,
  },
  {
    name: "Banaras Hindu University",
    badge: "PREMIER HERITAGE",
    subBadge: "Varanasi, UP",
    category: "heritage",
    description:
      "Top faculties in Arts, Social Sciences, Commerce (FMC), and Agricultural Sciences.",
    cutoff: "Avg Cutoff: 95+ Percentile",
    cta: "Take BHU Mock",
    highlight: false,
  },
  {
    name: "Jawaharlal Nehru University",
    badge: "GLOBAL EXCELLENCE",
    subBadge: "New Delhi",
    category: "specialized",
    description:
      "Renowned School of Language, Literature and International Studies programs.",
    cutoff: "Foreign Languages & BA (Hons)",
    cta: "Take JNU Mock",
    highlight: false,
  },
  {
    name: "Jamia Millia Islamia (JMI)",
    badge: "NAAC A++",
    subBadge: "New Delhi",
    category: "specialized",
    description:
      "Ranked amongst India's top 3 central universities in NIRF rankings.",
    cutoff: "Programs: Eco, History, Hindi, Bio",
    cta: "Explore Tests",
    highlight: false,
  },
  {
    name: "Aligarh Muslim University",
    badge: "TOP RATED",
    subBadge: "Aligarh, UP",
    category: "heritage",
    description:
      "High prestige courses in B.Sc (Hons), B.Com (Hons), and Humanities degrees.",
    cutoff: "Specialized Mocks Available",
    cta: "Explore Tests",
    highlight: false,
  },
  {
    name: "UoH, AUD, Tezpur & More",
    badge: "45+ UNIVERSITIES",
    subBadge: "Pan India",
    category: "panindia",
    description:
      "Full coverage for State, Deemed & Central universities accepting CUET-UG scores.",
    cutoff: "Unified Pattern Mock Series",
    cta: "View Full List",
    highlight: false,
  },
];

const colleges = [
  {
    title: "Shri Ram College of Commerce (SRCC)",
    subtitle: "Delhi University • North Campus",
    cutoff: "99.4+ Percentile Target",
    src: "/assets/images/srcc.jpg",
  },
  {
    title: "St. Stephen's College",
    subtitle: "Delhi University • North Campus",
    cutoff: "99.2+ Percentile Target",
    src: "/assets/images/st-stephens.jpg",
  },
  {
    title: "Hindu College",
    subtitle: "Delhi University • North Campus",
    cutoff: "99.0+ Percentile Target",
    src: "/assets/images/hindu-college.jpg",
  },
  {
    title: "Miranda House",
    subtitle: "Delhi University • NIRF #1 College",
    cutoff: "98.8+ Percentile Target",
    src: "/assets/images/miranda-house.jpg",
  },
  {
    title: "Campus Life & Academics",
    subtitle: "Experience Premier Collegiate Life",
    cutoff: "All-India Community",
    src: "/assets/images/campus-life.jpg",
  },
  {
    title: "University of Delhi Main Campus",
    subtitle: "The Dream Landmark for Every Aspirant",
    cutoff: "Historic North Campus",
    src: "/assets/images/delhi-university.jpg",
  },
];

const pricingCards = [
  {
    title: "Free",
    subtitle: "Diagnostic Access",
    description:
      "Build your preparation rhythm with daily practice and essential CUET resources.",
    price: "₹0",
    period: "Free forever",
    features: [
      "Daily chapter-wise practice drills",
      "Essential CUET syllabus & formula sheets",
      "Full diagnostic mock test with score",
      "NCERT concept explanations for every answer",
      "Access on mobile, tablet & desktop",
    ],
    cta: "Start Practicing Free",
    tier: "free",
    highlight: false,
  },
  {
    title: "Gold Pass",
    subtitle: "Complete Exam Vault",
    description:
      "Get the focused practice, All-India percentiles, and AI insights you need to secure North Campus.",
    price: "₹699",
    originalPrice: "₹999",
    period: "One-time payment • Valid till CUET 2026",
    badge: "Most Popular",
    features: [
      "Everything included in Free tier",
      "All 251 official shift PYQ papers (2022–2025)",
      "Full-length NTA CBT timed mock tests",
      "Granular AI Trap & Mistake Diagnosis",
      "Target College Cutoffs & Realistic Admission Standing",
      "Unlimited test attempts with forensic answer logs",
    ],
    cta: "Get Gold Pass",
    tier: "gold",
    highlight: true,
  },
];

const testimonials = [
  {
    name: "Aarav Sharma",
    college: "SRCC, B.Com (Hons)",
    score: "796 / 800",
    quote:
      "The NTA CBT format in this platform was identical to the actual exam screen! Doing 20 full-length mocks here kept me calm and got me 100 percentile in Economics and Accountancy.",
    avatar: "/assets/images/avatar1.png",
  },
  {
    name: "Priya Nair",
    college: "St. Stephen's College, BA History",
    score: "792 / 800",
    quote:
      "Chapter-wise practice helped me master the micro-details in NCERT Political Science and History. The solutions were so clean and concept-focused. Best CUET tool out there!",
    avatar: "/assets/images/avatar2.png",
  },
  {
    name: "Rohan Verma",
    college: "Hindu College, B.Sc Physics (Hons)",
    score: "198 / 200",
    quote:
      "The General Test and English sections used to be my biggest worry. The timed speed drills and sectional test series gave me the exact timing tricks I needed to score 198/200.",
    avatar: "/assets/images/avatar3.png",
  },
];

const faqs = [
  {
    q: "Are these mock tests strictly based on the latest NTA CUET 2026 pattern?",
    a: "Yes. Every single mock test and practice paper strictly follows the latest official NTA Information Bulletin. This includes 50 compulsory questions per domain subject with zero internal choice and rationalized Class 12 NCERT curriculum alignment.",
  },
  {
    q: "How does the official CUET marking scheme calculate my score?",
    a: "You earn +5 marks for every correct response and receive a -1 mark penalty for each incorrect answer (-0.25 penalty ratio). Unattempted questions receive 0 marks with zero penalty. Our platform calculates this automatically with forensic scorecards.",
  },
  {
    q: "Can I practice tests on mobile phones and tablets?",
    a: "Absolutely. The CBT simulator, chapter drills, and performance analytics are fully responsive and work seamlessly across all smartphones, tablets, laptops, and desktops with zero app installation required.",
  },
  {
    q: "Is the Free plan genuinely free with zero credit card required?",
    a: "Yes. You can start immediately with diagnostic mock tests, chapter practice questions, NCERT explanations, and syllabus explorers with zero credit card or payment commitment.",
  },
  {
    q: "How do I choose the right domain subjects for Delhi University (DU)?",
    a: "University of Delhi requires candidates to appear in CUET in subjects they studied and passed in their Class 12 board examinations. Most honors courses require 1 Language + 3 Domain subjects (e.g. B.Com Hons requires English + Accounts/Maths + any two other domains).",
  },
  {
    q: "Are the 251 Previous Year Papers (PYQs) official shift papers?",
    a: "Yes. Our PYQ vault includes all authentic shift-wise question papers from CUET 2022, 2023, 2024, and 2025 across Science, Commerce, Humanities, and General Test streams, verified with authoritative NTA answer keys.",
  },
];

/* ==========================================================================
   SUBCOMPONENTS
   ========================================================================== */

/**
 * 1. Top Urgent Notice & Live Countdown Bar (Primary Hierarchy)
 */
function NoticeCountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    const calculate = () => {
      // Estimated CUET examination commencement from authoritative config
      const examDate = new Date(CUET_AUTHORITY.examDates.examStartDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, examDate - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft({ days, hours, minutes });
    };

    calculate();
    const timer = setInterval(calculate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside aria-label="Official announcement" className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {CUET_AUTHORITY.officialNotice.badge}
          </span>
          <span className="text-slate-300 font-medium">
            Exam Window: <strong>{CUET_AUTHORITY.examDates.examWindow}</strong> • {CUET_AUTHORITY.officialNotice.headline}
          </span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {timeLeft && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
              <Clock3 className="w-3.5 h-3.5" />
              <span>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m remaining
              </span>
            </div>
          )}
          <a
            href="#pattern"
            className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors"
          >
            Check Pattern
          </a>
        </div>
      </div>
    </aside>
  );
}

/**
 * 2. Sticky Clean Navigation Header (Primary Hierarchy)
 */
function Navigation({
  onAuth,
  isLoggedIn,
}: {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="CUET AI-Prep Home"
        >
          <span className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
            C
          </span>
          <div className="flex flex-col">
            <span className="text-slate-900 font-extrabold text-base tracking-tight leading-none">
              CUET<span className="text-blue-600">Prep</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
              NTA CBT Platform
            </span>
          </div>
        </Link>

        {/* Desktop Nav: Max 5 primary links + 'More' dropdown */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600" aria-label="Main navigation">
          <a
            href="#pattern"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Exam Pattern
          </a>
          <a
            href="#syllabus"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Syllabus
          </a>
          <a
            href="#colleges"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Target Colleges
          </a>
          <a
            href="#simulator"
            className="hover:text-blue-600 transition-colors py-1"
          >
            CBT Simulator
          </a>
          <a
            href="#pricing"
            className="hover:text-blue-600 transition-colors py-1"
          >
            Pricing
          </a>

          {/* More Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors py-1 cursor-pointer"
              aria-expanded={moreDropdownOpen}
            >
              <span>More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  moreDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-xs font-semibold">
                <Link
                  href="/dashboard/pyqs"
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>251 Shift PYQs Vault</span>
                </Link>
                <a
                  href="#eligibility"
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Eligibility &amp; Steps</span>
                </a>
                <a
                  href="#faq"
                  className="flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Candidate FAQs</span>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onAuth("login")}
                className="hidden sm:inline-flex px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => onAuth("signup")}
                className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>Join Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <Link
            href="/dashboard/pyqs"
            className="flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              251 Shift PYQs Vault
            </span>
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
              2022–2025
            </span>
          </Link>
          <a
            href="#pattern"
            className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Exam Pattern &amp; Marking
          </a>
          <a
            href="#syllabus"
            className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Stream Syllabus Explorer
          </a>
          <a
            href="#colleges"
            className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Target Universities &amp; Cutoffs
          </a>
          <a
            href="#simulator"
            className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            CBT Simulator Demo
          </a>
          <a
            href="#eligibility"
            className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Eligibility &amp; 4-Step Registration
          </a>
          <a
            href="#pricing"
            className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Plans &amp; Pricing
          </a>
          <a
            href="#faq"
            className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Frequently Asked Questions
          </a>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full py-3 text-center bg-blue-600 text-white rounded-xl font-bold text-sm"
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
                  className="w-full py-2.5 text-center text-slate-700 border border-slate-300 rounded-xl font-bold text-sm"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAuth("signup");
                  }}
                  className="w-full py-3 text-center bg-orange-600 text-white rounded-xl font-bold text-sm shadow-sm"
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

/**
 * 3. Hero Section (Primary Hierarchy)
 * - Focused focal point: H1, subtext (~65 chars per line), top 2 CTAs, trust metric pills.
 */
function Hero({
  onAuth,
  isLoggedIn,
}: {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-14 md:pb-20 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Eyebrow Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-blue-600" />
            <span>India&apos;s #1 Dedicated NTA CBT Practice Engine</span>
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            <span className="text-slate-500 font-semibold">200,000+ Aspirants</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Master CUET UG 2026 With{" "}
            <span className="text-blue-600">Authentic Exam Pacing</span> &amp; Confidence.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practice 50-question full-length CBT mocks, 251 official shift papers, and AI-powered
            NCERT mistake explanations to secure your dream Delhi University campus.
          </p>

          {/* Top Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              className="px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              onClick={() => {
                if (isLoggedIn) {
                  router.push("/dashboard");
                } else {
                  onAuth("signup");
                }
              }}
            >
              <span>{isLoggedIn ? "Open Dashboard" : "Join Now — Start Free"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/dashboard/pyqs"
              className="px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Solve 251+ Official PYQs</span>
            </Link>
          </div>

          {/* Trust Social Proof Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold border-t border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero internal choice format</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Authentic +5 / -1 marking scheme</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>All 27 Domain Subjects</span>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars (Equal Height Cards, Generous Padding) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
              <MonitorCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Exact NTA CBT Environment
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Familiarize with the authentic 60-minute timer, color-coded Question Palette (Answered,
              Marked for Review), and screen layout so test day feels natural.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              NCERT Concept Mistake Breakdown
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Don&apos;t just see the right answer. Discover why you fell into conceptual traps, what NCERT
              chapter to re-read, and how to turn negative marks into +5s.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              251 Official Shift PYQs (2022–2025)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every past paper preserved across Science, Commerce, and Humanities. Practice by real
              exam shift date with verified answer keys and forensic scorecards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 4. Official CUET UG 2026 Exam Pattern & Marking Scheme (Secondary Hierarchy)
 */
function ExamPatternSection() {
  const { examPattern, meta } = CUET_AUTHORITY;

  return (
    <section id="pattern" className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Official NTA Specification
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CUET UG Exam Pattern at a Glance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Standardized nationwide by {meta.authority}. All domain papers feature {examPattern.totalQuestionsPerDomain} compulsory
            questions with {examPattern.internalChoice.toLowerCase()}.
          </p>
        </div>

        {/* 3-Column Card Grid for the Exam Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examPattern.sections.map((sec) => {
            const isCore = sec.id === "2";
            return (
              <div
                key={sec.id}
                className={`bg-white rounded-2xl p-6 border ${
                  isCore ? "border-2 border-blue-500 shadow-md relative" : "border-slate-200 shadow-xs"
                } flex flex-col justify-between`}
              >
                {isCore && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    Core Subject Section
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100 uppercase">
                      {sec.name.includes(":") ? sec.name.split(":")[0]?.trim() : `Section ${sec.id}`}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{sec.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {sec.name.includes(":") ? sec.name.split(":")[1]?.trim() : sec.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {sec.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500 font-semibold">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <strong className="text-slate-900">{sec.questions} Questions</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <strong className="text-slate-900">{sec.format}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum Marks:</span>
                    <strong className="text-blue-600">{sec.maxMarks} Marks</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Marking Scheme Highlight Banner */}
        <div className="mt-8 bg-blue-50/70 border border-blue-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              +/-
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Authoritative Marking Formula</h4>
              <p className="text-xs text-slate-600">
                Calibrated per Question: {examPattern.markingScheme.correct} (Correct) &bull; {examPattern.markingScheme.incorrect} (Incorrect) &bull; {examPattern.markingScheme.unattempted} (Unattempted)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={examPattern.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2"
            >
              Verify on Official NTA Portal
            </a>
            <Link
              href="/dashboard/mocks"
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1.5"
            >
              <span>Practice Timed Tests</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 5. Stream-Wise Syllabus Explorer (Tabs + Progressive Accordions)
 */
function SyllabusSection() {
  const [activeStream, setActiveStream] = useState<string>("science");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const streams = [
    { id: "science", label: "Science (PCM / PCB)" },
    { id: "commerce", label: "Commerce" },
    { id: "humanities", label: "Humanities / Arts" },
    { id: "general", label: "Languages & General Test" },
  ];

  const currentSubjects = syllabusByStream[activeStream] || [];

  return (
    <section id="syllabus" className="py-20 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Rationalized NCERT Syllabus
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Stream-Wise Syllabus Explorer
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Inspect official units, chapters, and topics tested by NTA. Select your stream to explore.
          </p>
        </div>

        {/* Stream Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {streams.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveStream(s.id);
                setExpandedSubject(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeStream === s.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Subjects Grid (Max 3 per row on desktop, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSubjects.map((subject) => {
            const isExpanded = expandedSubject === subject.code;
            return (
              <div
                key={subject.code}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Code: {subject.code}
                    </span>
                    <span className="text-xs font-semibold text-blue-600">
                      {subject.unitsCount} Official Units
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-slate-500 mb-4">
                    Strictly covers rationalized Class 12 NCERT curriculum.
                  </p>

                  {/* Progressive Disclosure Toggle */}
                  <button
                    type="button"
                    onClick={() => setExpandedSubject(isExpanded ? null : subject.code)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-between border border-slate-200/80 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide Units" : "View Units & Chapters"}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expanded Accordion List */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                      {subject.units.map((unit, idx) => (
                        <div key={idx} className="bg-slate-50/70 p-2.5 rounded-lg text-xs">
                          <strong className="block text-slate-800 font-bold mb-1">
                            Unit {idx + 1}: {unit.title}
                          </strong>
                          <ul className="list-disc list-inside text-slate-500 space-y-0.5">
                            {unit.topics.map((t, tIdx) => (
                              <li key={tIdx}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/dashboard/practice`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Practice Chapter Drills</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/dashboard/mocks`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Take Mock
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 6. Interactive CBT Exam Simulator Preview (Secondary Hierarchy)
 * - Calm, bounded dark card container without jarring fullscreen color shifts.
 */
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
    <section id="simulator" className="py-20 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Context & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 tracking-wider uppercase">
              Real NTA CBT Simulator
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Experience the Exact NTA Exam Screen Before Test Day.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Eliminate exam-day friction. Our simulator faithfully recreates the authentic NTA color
              palette, question navigation palette, marking rules (+5 / -1), and countdown timer.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold">
                    Authentic Question Palette
                  </strong>
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
                  <strong className="block text-white text-sm font-semibold">
                    Instant AI NCERT Concept Breakdown
                  </strong>
                  <span className="text-xs text-slate-400 leading-normal">
                    Identify the exact NCERT textbook concept behind every question step.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <strong className="block text-white text-sm font-semibold">
                    All-India Percentile Benchmarking
                  </strong>
                  <span className="text-xs text-slate-400 leading-normal">
                    Compare your speed and score against 200,000+ active aspirants.
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAuth("signup")}
              className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer mt-4"
            >
              <span>Try a Full 60-Minute Mock Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Live Interactive Drill Preview */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold tracking-wide text-slate-200">
                    CUET 2026 SAMPLE DRILL
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
                  <Clock3 className="w-4 h-4" />
                  <span>44:50 remaining</span>
                </div>
              </div>

              {/* Subject Tabs */}
              <div className="flex gap-2 my-4 overflow-x-auto pb-1 text-xs">
                <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded-md whitespace-nowrap">
                  General Test
                </span>
                <span className="px-3 py-1 bg-slate-900 text-slate-400 rounded-md whitespace-nowrap">
                  Economics
                </span>
                <span className="px-3 py-1 bg-slate-900 text-slate-400 rounded-md whitespace-nowrap">
                  Mathematics
                </span>
                <span className="px-3 py-1 bg-slate-900 text-slate-400 rounded-md whitespace-nowrap">
                  English
                </span>
              </div>

              {/* Question Stem */}
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Question 14 of 50 | Marks: +5, -1
              </div>
              <h3 className="text-base font-bold text-slate-100 leading-relaxed mb-4">
                Which Article of the Constitution of India provides for the establishment and
                constitution of the Supreme Court of India?
              </h3>

              {/* Interactive Options */}
              <div className="grid gap-2.5 mb-4">
                {options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrect = option.correct;
                  let btnStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800/80";

                  if (isSelected) {
                    btnStyle = isCorrect
                      ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                      : "bg-rose-950/80 border-rose-500 text-rose-200";
                  }

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedOption(option.id)}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span>
                        ({option.id}) {option.text}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "border border-slate-700 text-slate-400"
                        }`}
                      >
                        {isSelected ? (isCorrect ? "✓" : "✕") : option.id}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation */}
              {selectedOption && (
                <div
                  className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    options.find((o) => o.id === selectedOption)?.correct
                      ? "bg-emerald-950/50 border-emerald-800 text-emerald-300"
                      : "bg-rose-950/50 border-rose-800 text-rose-300"
                  }`}
                >
                  {options.find((o) => o.id === selectedOption)?.correct ? (
                    <>
                      <strong className="block text-emerald-400 font-bold mb-1">
                        ✓ Correct (+5 Marks)
                      </strong>
                      Article 124 of the Indian Constitution establishes the Supreme Court of India.
                      Article 148 deals with the Comptroller and Auditor General (CAG), while Article
                      214 provides for High Courts in States.
                    </>
                  ) : (
                    <>
                      <strong className="block text-rose-400 font-bold mb-1">
                        ✕ Incorrect (-1 Mark Penalty)
                      </strong>
                      The correct answer is (B) Article 124. Article 148 provides for the Comptroller
                      and Auditor General (CAG).
                    </>
                  )}
                </div>
              )}

              {/* Status Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span className="text-emerald-400">● 1 Answered</span>
                <span className="text-purple-400">● 0 Marked for Review</span>
                <span className="text-slate-500">● 49 Not Visited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 7. Target Universities & Cutoff Benchmarks (Secondary Hierarchy)
 * - Organized into clean tabs (All, Central, Heritage, Specialized) with 3 equal-height cards per row.
 */
function TargetUniversitiesSection({
  onAuth,
}: {
  onAuth: (mode: "login" | "signup") => void;
}) {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? targetUniversities
      : targetUniversities.filter((item) => item.category === filter);

  return (
    <section id="colleges" className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Top Central &amp; State Universities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Target Your Dream Campus With Verified Cutoffs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            We calibrate domain syllabus, test series, and past cutoff benchmarks tailored for the
            most coveted university campuses in India.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Campuses (6)
          </button>
          <button
            type="button"
            onClick={() => setFilter("central")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "central"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Delhi University (DU)
          </button>
          <button
            type="button"
            onClick={() => setFilter("heritage")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "heritage"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Central Heritage (BHU &amp; AMU)
          </button>
          <button
            type="button"
            onClick={() => setFilter("specialized")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "specialized"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Specialized &amp; Language (JNU &amp; JMI)
          </button>
        </div>

        {/* 3 Cards per row (desktop), 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.name}
              className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                item.highlight
                  ? "border-blue-500 shadow-md ring-1 ring-blue-500/20"
                  : "border-slate-200 shadow-xs hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-md">
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{item.subBadge}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
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

/**
 * 8. Turning Ambition into Admission: Campus Inspiration Gallery (Secondary Hierarchy)
 * - Replaces 400vh scroll-trap with clean, elegant 3-column cards.
 */
function CampusGallerySection() {
  return (
    <section className="py-20 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Premier Campus Aspirations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Turning Ambition Into Admission
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            The road to North Campus starts with systematic daily testing. Find your place at
            India&apos;s leading institutions.
          </p>
        </div>

        {/* 3-Column Clean Campus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((c, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={c.src}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {c.cutoff}
                </span>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{c.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{c.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 9. CUET UG 2026 Eligibility & 4-Step Registration Guide (Secondary & Tertiary Hierarchy)
 * - 4-step progressive timeline + expandable official eligibility rules accordion.
 */
function EligibilityRegistrationSection() {
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const { eligibility, registrationSteps } = CUET_AUTHORITY;

  return (
    <section id="eligibility" className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Admissions Advisory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CUET UG Eligibility &amp; 4-Step Registration
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Follow this step-by-step roadmap to submit an error-free NTA application and align your
            Class 12 subjects with target college prerequisites.
          </p>
        </div>

        {/* 4 Progressive Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {registrationSteps.map((s) => (
            <div key={s.step} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-600 font-bold">
                {s.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Official Eligibility Rules Accordion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <button
            type="button"
            onClick={() => setEligibilityOpen(!eligibilityOpen)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
            aria-expanded={eligibilityOpen}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Detailed CUET UG Eligibility Guidelines
                </h3>
                <p className="text-xs text-slate-500">
                  Age limit, Class 12 qualifications, and university-specific mapping rules.
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform ${
                eligibilityOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {eligibilityOpen && (
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="bg-slate-50 p-3 rounded-xl">
                <strong className="text-slate-800 font-bold block mb-1">
                  1. Age Limit
                </strong>
                {eligibility.ageLimit}
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <strong className="text-slate-800 font-bold block mb-1">
                  2. Qualifying Examination (Class 12)
                </strong>
                {eligibility.qualifyingExam}
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <strong className="text-slate-800 font-bold block mb-1">
                  3. University Specific Mapping Rule
                </strong>
                {eligibility.universityMapping}
              </div>
              <div className="pt-2 flex items-center justify-end">
                <a
                  href={eligibility.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 text-xs"
                >
                  Verify on official NTA portal &rarr;
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * 10. Transparent Plans & Pricing (Secondary Hierarchy)
 * - Replaces 500vh scroll-trap with clean side-by-side comparison cards.
 */
function PricingSection({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  return (
    <section id="pricing" className="py-20 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Simple &amp; Predictable Access
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Invest in Your Dream College Admission
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Start 100% free with diagnostic practice or unlock the full 251-paper PYQ vault with Gold
            Pass. No hidden renewals.
          </p>
        </div>

        {/* 2 Clean Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {pricingCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all ${
                card.highlight
                  ? "bg-slate-900 text-white border-2 border-amber-400 shadow-xl relative"
                  : "bg-slate-50 text-slate-900 border border-slate-200 shadow-xs"
              }`}
            >
              {card.badge && (
                <span className="absolute -top-3 right-6 bg-amber-400 text-slate-950 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {card.badge}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      card.highlight
                        ? "bg-slate-800 text-amber-300"
                        : "bg-slate-200/70 text-slate-700"
                    }`}
                  >
                    {card.subtitle}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    card.highlight ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {card.description}
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold tracking-tight">{card.price}</span>
                  {card.originalPrice && (
                    <del className="text-sm font-semibold text-slate-500">
                      {card.originalPrice}
                    </del>
                  )}
                </div>
                <div
                  className={`text-xs font-semibold mb-6 ${
                    card.highlight ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {card.period}
                </div>

                {/* Features List */}
                <div
                  className={`pt-5 border-t space-y-3 mb-8 ${
                    card.highlight ? "border-slate-800" : "border-slate-200"
                  }`}
                >
                  {card.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          card.highlight ? "text-amber-400" : "text-blue-600"
                        }`}
                      />
                      <span className={card.highlight ? "text-slate-200" : "text-slate-700"}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAuth("signup")}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  card.highlight
                    ? "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                }`}
              >
                {card.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 11. Student Hall of Fame Testimonials (Secondary Hierarchy)
 * - 3 clean equal-height cards with real student scores.
 */
function HallOfFameSection() {
  return (
    <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Hall of Fame
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            From Our Mock Tests to DU North Campus
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Hear directly from aspirants who cracked 100 percentiles in CUET 2025.
          </p>
        </div>

        {/* 3 Testimonials in 1 row (desktop), 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.name}</h4>
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">
                    {item.college} &bull; <strong>{item.score}</strong>
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

/**
 * 12. Frequently Asked Questions Accordion (Tertiary Hierarchy)
 */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wider uppercase mb-3">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Everything you need to know about NTA exam patterns, syllabus coverage, and platform access.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 13. Final Call to Action (Primary Hierarchy)
 */
function FinalCTA({
  onAuth,
  isLoggedIn,
}: {
  onAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
          Your CUET Journey Starts Here
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Step Into Your Dream Campus?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Join over 200,000 students practicing with India&apos;s most authentic NTA CBT mock test platform today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            className="px-7 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (isLoggedIn) {
                router.push("/dashboard");
              } else {
                onAuth("signup");
              }
            }}
          >
            <span>{isLoggedIn ? "Open Dashboard" : "Join Now — Start Free"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/dashboard/mocks"
            className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/40 text-white font-bold text-sm transition-colors"
          >
            View Test Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * 14. Clean Structured Site Footer
 */
function LandingFooter({ onAuth }: { onAuth: (mode: "login" | "signup") => void }) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-base flex items-center justify-center">
                C
              </span>
              <strong className="text-white text-lg font-bold">
                CUET<span className="text-blue-500">Prep</span>
              </strong>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Practice smarter, master authentic NTA exam timing, and get ready for your dream Delhi
              University seat.
            </p>
            <div className="flex items-center gap-2 pt-2 text-emerald-400 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 251 test modules operational</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-2">
            <strong className="text-white text-xs uppercase tracking-wider block mb-1">
              Prepare
            </strong>
            <div>
              <a href="#pattern" className="hover:text-white transition-colors">
                Exam Pattern
              </a>
            </div>
            <div>
              <a href="#syllabus" className="hover:text-white transition-colors">
                Syllabus Explorer
              </a>
            </div>
            <div>
              <a href="#simulator" className="hover:text-white transition-colors">
                CBT Simulator
              </a>
            </div>
            <div>
              <Link href="/dashboard/mocks" className="hover:text-white transition-colors">
                Full-Length Mocks
              </Link>
            </div>
          </div>

          {/* Links 2 */}
          <div className="space-y-2">
            <strong className="text-white text-xs uppercase tracking-wider block mb-1">
              Explore
            </strong>
            <div>
              <Link href="/dashboard/pyqs" className="hover:text-white transition-colors">
                251 Shift PYQs Vault
              </Link>
            </div>
            <div>
              <a href="#colleges" className="hover:text-white transition-colors">
                College Cutoffs
              </a>
            </div>
            <div>
              <a href="#eligibility" className="hover:text-white transition-colors">
                Eligibility &amp; Steps
              </a>
            </div>
            <div>
              <Link href="/dashboard/standing" className="hover:text-white transition-colors">
                Target College Standings
              </Link>
            </div>
          </div>

          {/* Links 3 */}
          <div className="space-y-2">
            <strong className="text-white text-xs uppercase tracking-wider block mb-1">
              Support &amp; Legal
            </strong>
            <div>
              <a href="#faq" className="hover:text-white transition-colors">
                Candidate FAQs
              </a>
            </div>
            <div>
              <Link href="/pricing" className="hover:text-white transition-colors">
                Ranker Pass Pricing
              </Link>
            </div>
            <div>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Academic Support
              </Link>
            </div>
            <div>
              <a href={`mailto:${CUET_AUTHORITY.contactSupport.platformSupportEmail}`} className="hover:text-white transition-colors">
                Academic Support ({CUET_AUTHORITY.contactSupport.platformSupportEmail})
              </a>
            </div>
            <div>
              <a href="tel:01140759000" className="hover:text-white transition-colors">
                NTA Helpline: 011-40759000
              </a>
            </div>
            <div>
              <a href={`mailto:${CUET_AUTHORITY.contactSupport.officialNTAHelpdeskEmail}`} className="hover:text-white transition-colors">
                NTA Helpdesk ({CUET_AUTHORITY.contactSupport.officialNTAHelpdeskEmail})
              </a>
            </div>
            <div className="pt-1 flex flex-wrap gap-x-2 text-[11px] text-slate-400">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/refunds" className="hover:text-white transition-colors">
                Refunds
              </Link>
            </div>
            <div>
              <a
                href={CUET_AUTHORITY.meta.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Official NTA Portal &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-slate-500">
          <span>&copy; {new Date().getFullYear()} CUET AI-Prep. All rights reserved. Built for NTA CBT Candidates.</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onAuth("login")}
              className="hover:text-white cursor-pointer"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => onAuth("signup")}
              className="text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
            >
              Start Free Trial &rarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * 15. In-Page Floating 'Back to Top' Button (Navigation Helper)
 */
function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all hover:scale-105 cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

/* ==========================================================================
   MAIN LANDING PAGE CLIENT
   ========================================================================== */

export default function LandingPageClient() {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const logout = useTestStore((state) => state.logout);
  const [hasActiveSession, setHasActiveSession] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    // Detect code or token_hash if redirected to root by Supabase default Site URL
    if (typeof window !== "undefined" && window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const tokenHash = searchParams.get("token_hash") || searchParams.get("token");
      if (code || tokenHash) {
        window.location.replace(`/auth/callback${window.location.search}${window.location.hash || ""}`);
        return;
      }
    }

    // Detect implicit hash tokens if redirected to root by Supabase default Site URL
    if (typeof window !== "undefined" && window.location.hash) {
      const hashClean = window.location.hash.replace(/^#/, "");
      const hashParams = new URLSearchParams(hashClean);
      const hashType = hashParams.get("type");
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (hashType === "recovery") {
        window.location.replace("/reset-password" + window.location.hash);
        return;
      }

      if (accessToken && refreshToken) {
        supabase.auth
          .setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(({ data, error }) => {
            if (!error && data?.session) {
              fetch("/api/auth/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
              }).finally(() => {
                window.location.replace("/dashboard");
              });
            }
          });
        return;
      }
    }

    // Check authoritative Supabase session to prevent stale localStorage from falsely showing logged-in state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        setHasActiveSession(true);
      } else {
        setHasActiveSession(false);
        if (user?.isLoggedIn) {
          logout();
        }
      }
      setAuthChecked(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        setHasActiveSession(true);
      } else {
        setHasActiveSession(false);
        logout();
      }
      setAuthChecked(true);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [logout, user?.isLoggedIn]);

  // Strictly false until Supabase explicitly confirms an active authenticated session
  const isLoggedIn = isClient && authChecked && hasActiveSession;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Notice & Live Exam Countdown Pill */}
      <NoticeCountdownBanner />

      {/* 2. Sticky Header Navigation (5 primary links + 'More' dropdown + CTA) */}
      <Navigation onAuth={setAuthMode} isLoggedIn={isLoggedIn} />

      {/* 3. Hero Section (Single clear focal point, 2 CTAs, social proof) */}
      <Hero onAuth={setAuthMode} isLoggedIn={isLoggedIn} />

      {/* 4. Official CUET UG 2026 Exam Pattern & Marking Scheme */}
      <ExamPatternSection />

      {/* 5. Complete Stream-Wise Syllabus Explorer (Tabs + Progressive Accordions) */}
      <SyllabusSection />

      {/* 6. Realistic NTA CBT Exam Interface Simulator (Interactive Drill) */}
      <CBTSimulatorSection onAuth={setAuthMode} />

      {/* 7. Target Central Universities & Cutoff Benchmarks (Tabbed Grid) */}
      <TargetUniversitiesSection onAuth={setAuthMode} />

      {/* 8. Turning Ambition into Admission (Top DU Campuses Gallery) */}
      <CampusGallerySection />

      {/* 9. CUET UG 2026 Eligibility & 4-Step Registration Advisory */}
      <EligibilityRegistrationSection />

      {/* 10. Transparent Free vs. Gold Pass Plans & Pricing */}
      <PricingSection onAuth={setAuthMode} />

      {/* 11. Student Hall of Fame Testimonials */}
      <HallOfFameSection />

      {/* 12. Frequently Asked Questions (Accordion) */}
      <FAQSection />

      {/* 13. High-Conversion Final CTA */}
      <FinalCTA onAuth={setAuthMode} isLoggedIn={isLoggedIn} />

      {/* 14. Structured Site Footer */}
      <LandingFooter onAuth={setAuthMode} />

      {/* 15. Floating Back-to-Top Button */}
      <BackToTopButton />

      {/* Authentic Multi-Step Onboarding Modal */}
      <OnboardingModal
        isOpen={Boolean(authMode)}
        onClose={() => setAuthMode(null)}
        initialMode={authMode || "signup"}
      />
    </div>
  );
}
