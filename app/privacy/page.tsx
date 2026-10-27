import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  Cpu,
  Share2,
  Users,
  Database,
  Trash2,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | CUET AI-Prep",
  description:
    "Privacy Policy for CUET AI-Prep. Learn how we collect, protect, and handle candidate diagnostic data in full compliance with the Digital Personal Data Protection Act (DPDP 2023).",
  alternates: {
    canonical: getCanonicalUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy | CUET AI-Prep",
    description:
      "Privacy Policy for CUET AI-Prep. Learn how we collect, protect, and handle candidate diagnostic data with zero PII shared with AI models.",
    url: getCanonicalUrl("/privacy"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | CUET AI-Prep",
    description: "DPDP Act 2023 compliant privacy policy and data governance at CUET AI-Prep.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DPDP Act 2023 Compliant • Zero-PII AI Governance</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Last Updated: October 2026 • Governs all CUET UG 2026–2027 Candidates &amp; Aspirants
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1: Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              1. Information We Collect
            </h2>
            <p>
              CUET AI-Prep (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Platform&rdquo;) is an independent test preparation platform designed to help undergraduate candidates master the CUET UG Computer-Based Test (CBT). When you register and practice, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Candidate Account Profile:</strong> Your registered email address, name or chosen display handle, password hash (salted using bcrypt/Argon2 via Supabase Auth), and optional target academic preferences (e.g., target universities like DU, BHU, JNU, and target undergraduate degree programs).
              </li>
              <li>
                <strong>Diagnostic Exam &amp; Performance Telemetry:</strong> Question responses, options chosen, submission timestamps, time elapsed per question (measured against standard 72-second pacing), raw scores, negative marking tallies (+5 for correct, -1 for incorrect), and NCERT chapter-wise accuracy rates.
              </li>
              <li>
                <strong>Billing &amp; Transaction Logs:</strong> Razorpay order IDs, transaction reference codes, and plan upgrade timestamps. We <em>never</em> store, handle, or log credit card numbers, CVV codes, net banking credentials, or UPI PINs; all payments are processed directly by RBI-authorized payment aggregators.
              </li>
            </ul>
          </section>

          {/* Section 2: AI Processing & Zero PII Transmission */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              2. Third-Party AI Processing &amp; Zero PII Policy
            </h2>
            <p>
              CUET AI-Prep integrates advanced foundation models (including Google Gemini and Groq Llama inference engines) exclusively to generate contextual mistake explanations, NCERT concept clarifications, and adaptive drill recommendations.
            </p>
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700 space-y-2">
              <p className="font-semibold text-blue-900">Zero PII Policy with AI Providers:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Candidate name, email address, IP address, user ID, and personal identifiers are <strong>strictly stripped</strong> before any diagnostic request reaches AI APIs.</li>
                <li>AI models receive only the academic question stem, student&rsquo;s selected option, correct answer key, and the relevant NCERT curriculum reference.</li>
                <li>Our enterprise AI API agreements specify zero retention for training purposes; prompt payloads are not used to train or fine-tune public foundation models.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: How We Use Diagnostic Data */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              3. How We Use Diagnostic Data
            </h2>
            <p>Diagnostic performance data is utilized strictly for academic calibration and user experience:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Generating individualized mistake decrypters highlighting trap answers and timing anomalies.</li>
              <li>Calculating real-time admission probability against DU, BHU, and Central University historical cutoffs.</li>
              <li>Maintaining your study streak, completed test logs, and subject weakness heatmaps across devices.</li>
              <li>Preventing unauthorized multi-device account sharing to preserve platform integrity.</li>
            </ul>
          </section>

          {/* Section 4: Cookies & Local Storage */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              4. Cookies, Session Tokens &amp; Local Storage
            </h2>
            <p>
              We use strictly necessary cookies and browser LocalStorage to provide essential platform functionality:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Session Authentication:</strong> Secure, HTTP-only JWT tokens to keep you logged in between exam sessions.</li>
              <li><strong>Exam Timer &amp; State Persistence:</strong> LocalStorage caching of live exam question states to prevent candidate loss of progress in case of intermittent network drops or page reloads.</li>
              <li><strong>Locale Preferences:</strong> Storing language and accessibility preferences (e.g., Hindi/English question rendering).</li>
            </ul>
            <p>We do not use invasive third-party cross-site advertising trackers or sell browsing profiles to marketing brokers.</p>
          </section>

          {/* Section 5: Progress Card Sharing */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-600" />
              5. Voluntary Progress Card Sharing (`/r/[id]`)
            </h2>
            <p>
              Candidates may choose to celebrate milestones by generating shareable Progress Cards. This feature is <strong>100% voluntary and opt-in</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Public share links display only your chosen first name/alias, aggregate percentile, and accuracy gain.</li>
              <li>Personal email addresses, account passwords, and detailed question-by-question mistake logs are never visible on public card URLs.</li>
              <li>You can delete or revoke any public progress card at any time from your account dashboard.</li>
            </ul>
          </section>

          {/* Section 6: Minor & Under-18 Candidate Notice */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              6. Under-18 Candidates &amp; Parental/Guardian Guidance
            </h2>
            <p>
              Because CUET UG aspirants include Grade 12 students who may be under 18 years of age:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Account registration for candidates under 18 requires parental or legal guardian awareness and consent.</li>
              <li>Parents or guardians may inspect the diagnostic progress records of their ward, request data correction, or ask for complete account deletion by contacting our grievance officer with verification of guardianship.</li>
            </ul>
          </section>

          {/* Section 7: Data Retention & DPDP Act 2023 Rights */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-blue-600" />
              7. Your Rights Under the Digital Personal Data Protection (DPDP) Act 2023
            </h2>
            <p>
              In full accordance with Indian personal data protection law, all CUET AI-Prep users possess enforceable rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900">Right to Access:</span>
                <p className="mt-1 text-slate-600">Export a complete copy of your test history, diagnostic metrics, and account profile.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900">Right to Correction:</span>
                <p className="mt-1 text-slate-600">Update, rectify, or amend any inaccurate profile or target stream details.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900">Right to Erasure:</span>
                <p className="mt-1 text-slate-600">Request permanent deletion of your account, mock attempts, and analytics data.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900">Right to Grievance Redressal:</span>
                <p className="mt-1 text-slate-600">Timely resolution of privacy complaints within 7 business days.</p>
              </div>
            </div>
          </section>

          {/* Section 8: Contact Grievance Officer */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              8. Contact Our Data Protection &amp; Grievance Redressal Desk
            </h2>
            <p>
              For data access requests, deletion requests, or privacy questions, write directly to:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <p className="font-semibold text-slate-900">CUET AI-Prep Grievance Redressal Desk</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@cuetprep.com"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  support@cuetprep.com
                </a>
              </p>
              <p>
                Academic Helpline:{" "}
                <a
                  href="tel:01140759000"
                  className="text-slate-800 font-semibold hover:underline"
                >
                  011-40759000
                </a>
              </p>
              <p className="text-xs text-slate-500">
                Response Turnaround: Within 24–48 working hours.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
