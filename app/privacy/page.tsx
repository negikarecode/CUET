import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  Cpu,
  Database,
  Trash2,
  Users,
  Clock,
  Scale,
  Building,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | CUETMate (CUET AI-Prep)",
  description:
    "Privacy Policy for CUETMate (CUET AI-Prep). Explains data handling, telemetry, zero-PII AI governance, and student rights under India's Digital Personal Data Protection Act, 2023 (DPDP Act).",
  alternates: {
    canonical: getCanonicalUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy | CUETMate",
    description:
      "DPDP Act 2023 compliant privacy framework, candidate diagnostic rights, and zero-PII AI processing.",
    url: getCanonicalUrl("/privacy"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | CUETMate",
    description: "DPDP Act 2023 compliant privacy policy and data governance at CUETMate.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Digital Personal Data Protection Act, 2023 (DPDP Act) Compliant</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy &amp; Candidate Data Notice
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Last updated: [[DATE]] • Effective for all CUET UG 2027 Aspirants &amp; Candidates
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-600" />
              1. Who We Are &amp; Scope of This Notice
            </h2>
            <p>
              This Privacy Policy explains how <strong>[[BUSINESS_LEGAL_NAME]]</strong> (operating under the trade name <strong>[[BUSINESS_TRADE_NAME]]</strong>, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;CUETMate&rdquo;) collects, uses, stores, and protects personal and diagnostic data when you use our website, Computer-Based Test (CBT) simulators, and diagnostic practice tools.
            </p>
            <p>
              We operate exclusively within the jurisdiction of the Republic of India and comply with the <strong>Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act 2023&rdquo;)</strong> and the <strong>Digital Personal Data Protection Rules, 2025</strong>. Because most of our users are 17 to 19 years old preparing for university entrance, we have written this notice in straightforward language so candidates and their parents understand exactly what happens to their information.
            </p>
          </section>

          {/* Section 2: What We Collect */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-600" />
              2. Personal Data We Collect
            </h2>
            <p>We only collect information strictly required to run your CBT practice sessions and calibrate your diagnostic results:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Registration &amp; Profile Details:</strong> Full name, email address, password hash (salted and encrypted using bcrypt via Supabase Auth), date of birth, academic stream (Science, Commerce, or Humanities), target universities (e.g., Delhi University, BHU), target colleges (e.g., SRCC, Hindu College), target undergraduate course, selected domain subjects, and daily study goal.
              </li>
              <li>
                <strong>Minor Verification &amp; Guardian Details:</strong> For candidates under 18 years old, we record the parent or legal guardian&apos;s email address and confirmation of guardian consent.
              </li>
              <li>
                <strong>Exam Practice &amp; Question-Level Telemetry:</strong> When you complete a mock exam or unit drill, our platform logs:
                <ul className="list-[circle] pl-5 mt-1 space-y-1 text-slate-500">
                  <li>Your selected answer (Option A, B, C, D, or unattempted/skipped).</li>
                  <li>Whether you changed your answer (first saved option vs. final option submitted).</li>
                  <li>Time spent on each individual question (seconds elapsed).</li>
                  <li>Time-sink indicators (questions where more than 90 seconds were spent without a correct answer).</li>
                  <li>Raw scores calculated under the official CUET UG formula (+5 marks for correct, -1 mark penalty for incorrect).</li>
                </ul>
              </li>
              <li>
                <strong>Payment &amp; Billing Records:</strong> One-time pass transactions are processed securely through RBI-authorized payment aggregators (such as Razorpay). We retain payment order IDs, transaction timestamps, payment amounts, and bank reference IDs for statutory tax accounting. <em>We never see, handle, or store debit/credit card numbers, CVVs, net-banking credentials, or UPI PINs.</em>
              </li>
            </ul>
          </section>

          {/* Section 3: Why We Process Your Data */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-600" />
              3. Purpose Limitation: Why We Use Your Information
            </h2>
            <p>
              In accordance with Section 4 and Section 6 of the DPDP Act 2023, personal data is processed solely for specific, legitimate educational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>To simulate the authentic NTA CBT interface, timers, and question navigation palettes.</li>
              <li>To pinpoint specific concept gaps, silly errors, and distractor traps in your practice answers.</li>
              <li>To track your NCERT chapter accuracy, study streaks, and pacing benchmarks.</li>
              <li>To deliver one-time verification passcodes (OTPs) and account access links.</li>
              <li>To prevent unauthorized multi-device account sharing, automated scraping, or exam timer tampering.</li>
            </ul>
            <p className="text-slate-700 font-medium">
              We do <strong>not</strong> sell your personal data to commercial coaching institutes, lead brokers, or advertisers. We do <strong>not</strong> perform behavioral profiling or cross-site tracking for third-party commercial advertisements.
            </p>
          </section>

          {/* Section 4: AI Processing & Zero-PII Policy */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              4. AI Technologies &amp; Zero-PII Guarantee
            </h2>
            <p>
              CUETMate uses artificial intelligence models (including Google Gemini 2.0 Flash via <code>@google/genai</code> and Groq LPU inference engines) strictly to generate question mistake breakdowns, identify distractor traps, and generate NCERT concept hints.
            </p>
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-slate-700 space-y-2">
              <p className="font-semibold text-purple-950">Our Strict Zero-PII Policy with AI Providers:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Your name, email address, phone number, candidate ID, and IP address are <strong>never sent to AI models</strong>.</li>
                <li>AI requests contain only the question prompt, option text, your selected option letter, and the relevant NCERT chapter topic.</li>
                <li>AI inputs and outputs are not used to train or fine-tune public foundation models.</li>
                <li>AI explanations are supplemental self-study tools and should always be verified against standard NCERT Class 12 textbooks.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Third-Party Processors */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              5. Third-Party Service Providers (Data Processors)
            </h2>
            <p>We engage trusted technical infrastructure partners who process data strictly under our contractual instructions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Supabase Inc.</span>
                <p className="mt-1 text-slate-600">Database hosting, row-level security (RLS), and authentication services.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Vercel Inc.</span>
                <p className="mt-1 text-slate-600">Cloud hosting and secure edge application delivery.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Brevo (Sendinblue)</span>
                <p className="mt-1 text-slate-600">Delivery of 6-digit email verification codes (OTPs) and account notifications.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Razorpay Software Pvt. Ltd.</span>
                <p className="mt-1 text-slate-600">RBI-authorized payment aggregator for digital INR transactions (UPI, Cards, Net Banking).</p>
              </div>
            </div>
          </section>

          {/* Section 6: Cookies & Local Storage */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-600" />
              6. Cookies, Browser Storage &amp; Offline Resilience
            </h2>
            <p>We use essential cookies and browser storage strictly to ensure you do not lose exam progress if your internet connection fluctuates:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Session Cookies:</strong> Secure, encrypted cookies (such as <code>sb-*-auth-token</code>) to keep you signed in securely between test sessions.</li>
              <li><strong>Browser LocalStorage:</strong> Temporary caching of your active CBT exam progress, current question index, and target exam date so a page refresh does not reset your ongoing mock.</li>
              <li><strong>IndexedDB:</strong> Offline browser caching (<code>cuet_cbt_storage</code>) to protect question response state during active mock exams in case of unexpected network drops.</li>
            </ul>
            <p>We do not use invasive third-party tracking cookies or advertising pixels.</p>
          </section>

          {/* Section 7: Minor Candidates (DPDP Section 9) */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              7. Minor Candidates &amp; Parental/Guardian Consent (Section 9 DPDP Act)
            </h2>
            <p>
              A substantial portion of CUET UG aspirants are 17 or 18 years old. In full compliance with Section 9 of the DPDP Act 2023:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Registration for candidates under 18 years of age requires affirmative confirmation of parent or legal guardian consent and the provision of a guardian contact email.</li>
              <li>We <strong>do not</strong> engage in tracking or behavioral monitoring of children or minors, nor do we serve targeted advertising to candidates.</li>
              <li>Parents or legal guardians may review, correct, or request the deletion of their child&apos;s practice data at any time by contacting our Grievance Redressal Desk.</li>
            </ul>
          </section>

          {/* Section 8: Retention */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              8. Data Retention &amp; Storage Limitations
            </h2>
            <p>
              We retain candidate diagnostic data only as long as necessary to fulfill the academic purpose for which it was collected:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Active Account Data:</strong> Diagnostic attempts and study streaks are retained for <strong>[[RETENTION_PERIOD_ACTIVE]]</strong> (typically throughout the active CUET UG examination cycle and subsequent university counseling sessions).</li>
              <li><strong>Inactive Accounts:</strong> Inactive accounts with no sign-ins are retained for up to <strong>[[RETENTION_PERIOD_INACTIVE]]</strong> before automated purging, unless erasure is requested sooner.</li>
              <li><strong>Financial Ledgers:</strong> Transaction reference records are retained solely for the statutory period mandated under Indian tax and accounting legislation (as permitted under Section 8(7) of the DPDP Act 2023).</li>
            </ul>
          </section>

          {/* Section 9: Your Rights Under DPDP Act 2023 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-purple-600" />
              9. Your Rights Under the DPDP Act, 2023
            </h2>
            <p>As a candidate or Data Principal under Indian law, you have enforceable legal rights:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Right to Access (Section 11)</span>
                <p className="mt-1 text-slate-600">
                  Export a complete copy of your personal data, test records, and question telemetry in structured JSON format via your account settings.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Right to Correction (Section 12)</span>
                <p className="mt-1 text-slate-600">
                  Update, correct, or complete any inaccurate profile details or academic target settings directly from your Profile screen.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Right to Erasure (Section 12)</span>
                <p className="mt-1 text-slate-600">
                  Permanently delete your account, mock attempts, and pacing history using the self-service deletion option or by contacting our desk.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Right to Grievance Redressal (Section 13)</span>
                <p className="mt-1 text-slate-600">
                  File a privacy complaint with our designated Grievance Officer, with guaranteed resolution within 7 business days.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              You also hold the <strong>Right to Nominate (Section 14)</strong> an individual to exercise your data rights in the event of death or incapacity.
            </p>
          </section>

          {/* Section 10: Grievance Redressal Desk */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-600" />
              10. Data Protection &amp; Grievance Redressal Officer
            </h2>
            <p>
              In compliance with Section 8 and Section 13 of the DPDP Act 2023, you may contact our designated Grievance Redressal Officer for any questions, consent withdrawals, or privacy requests:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
              <p><strong>Entity:</strong> [[BUSINESS_LEGAL_NAME]]</p>
              <p><strong>Grievance Officer:</strong> [[GRIEVANCE_OFFICER_NAME]]</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:[[GRIEVANCE_OFFICER_EMAIL]]" className="text-purple-700 font-semibold underline">
                  [[GRIEVANCE_OFFICER_EMAIL]]
                </a>
              </p>
              <p><strong>Helpline:</strong> [[GRIEVANCE_OFFICER_PHONE]]</p>
              <p><strong>Address:</strong> [[BUSINESS_ADDRESS]], [[BUSINESS_STATE_COUNTRY]]</p>
              <p className="text-xs text-slate-500 pt-1">
                Grievance Turnaround: We acknowledge requests within 24–48 working hours and resolve all inquiries within 7 business days. If you remain dissatisfied with our resolution, you have the statutory right to escalate your complaint to the Data Protection Board of India.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
