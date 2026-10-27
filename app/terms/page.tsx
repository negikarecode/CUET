import { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  BookOpen,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  FileCheck,
  Building,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | CUET AI-Prep",
  description:
    "Terms of Service for CUET AI-Prep. Platform user agreement, NTA non-affiliation disclaimer, subscription pass validity, and candidate acceptable use guidelines.",
  alternates: {
    canonical: getCanonicalUrl("/terms"),
  },
  openGraph: {
    title: "Terms of Service | CUET AI-Prep",
    description:
      "CUET AI-Prep Terms of Service: Candidate usage terms, CBT practice exam disclaimers, and NTA non-affiliation policy.",
    url: getCanonicalUrl("/terms"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | CUET AI-Prep",
    description: "Terms of Service and Candidate Agreement for CUET AI-Prep.",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <Scale className="w-3.5 h-3.5" />
              <span>User Agreement &amp; CBT Exam Guidelines</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Last Updated: October 2026 • Effective for CUET UG 2026–2027 Academic Session
            </p>
          </div>
        </div>

        {/* Terms Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1: Acceptance */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              1. Acceptance of Terms &amp; Eligibility
            </h2>
            <p>
              By accessing, browsing, registering for, or using CUET AI-Prep (&ldquo;the Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service and our Privacy Policy.
            </p>
            <p>
              The platform is intended for students preparing for undergraduate entrance exams (specifically CUET UG), parents or legal guardians acting on behalf of candidate minors, and certified educational mentors. If you do not agree to these terms, you must discontinue use immediately.
            </p>
          </section>

          {/* Section 2: Non-Affiliation */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              2. Independent Platform &amp; NTA Non-Affiliation Disclaimer
            </h2>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
              <p className="font-semibold text-xs sm:text-sm">
                Official Regulatory Notice:
              </p>
              <p className="text-xs leading-relaxed">
                CUET AI-Prep is an independent educational technology platform and test preparation service. CUET AI-Prep is <strong>not affiliated with, endorsed by, sponsored by, or connected to</strong> the National Testing Agency (NTA), the University Grants Commission (UGC), the Ministry of Education, Government of India, or any central, state, or deemed university.
              </p>
              <p className="text-xs leading-relaxed">
                All registered trademarks, official logos, acronyms, and syllabus outlines (including &ldquo;CUET UG&rdquo;, &ldquo;NTA&rdquo;, and individual university names) referenced on this platform are used purely for descriptive, identification, and educational nominative fair-use purposes.
              </p>
            </div>
          </section>

          {/* Section 3: Diagnostic Nature & No Guarantees */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              3. Nature of Diagnostic Practice &amp; Disclaimer of Results
            </h2>
            <p>
              Our mock exams, time analytics, and college cutoff predictors are designed to help students simulate exam pressure, test pacing (72 seconds per question), and NCERT conceptual retention.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>No Guaranteed Ranks or Admissions:</strong> Practicing on CUET AI-Prep does not guarantee admission into Delhi University (DU), Banaras Hindu University (BHU), Jamia Millia Islamia, or any other institution. Admission cutoffs fluctuate annually based on official NTA percentile normalization and institutional counseling rounds.
              </li>
              <li>
                <strong>AI Explanations:</strong> AI-generated mistake diagnostics provide conceptual guidance based on standard NCERT textbooks. While calibrated for high accuracy, students should always consult authorized NCERT texts and official NTA answer keys for final scholastic verification.
              </li>
            </ul>
          </section>

          {/* Section 4: Acceptable Use & Account Integrity */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              4. Candidate Account Integrity &amp; Anti-Abuse
            </h2>
            <p>Each candidate registration is strictly for single-user educational usage. You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Share account credentials, login links, or session tokens with multiple users or commercial coaching centers.</li>
              <li>Scrape, extract, reverse engineer, or programmatically download proprietary questions, mock exam series, or AI explanations using bots, crawlers, or scripts.</li>
              <li>Tamper with client-side timers, submit simulated mock records via unauthorized API requests, or bypass paywalls.</li>
              <li>Post offensive, abusive, or defamatory content through public feedback channels or community features.</li>
            </ul>
            <p>Violation of these integrity guidelines may result in immediate account suspension without refund.</p>
          </section>

          {/* Section 5: Subscription Passes & Payments */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              5. Subscription Passes, Billing &amp; Validity
            </h2>
            <p>
              Paid tiers (e.g., Ranker Pass, All-Access Pass) provide enhanced features such as unlimited full-length mock exams, AI mistake decrypters, and detailed chapter radars.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>All payments are processed securely in Indian Rupees (INR) via Razorpay.</li>
              <li>Passes are valid for the full duration of the CUET UG 2026 examination cycle through the final counseling phase.</li>
              <li>Refunds are governed by our <Link href="/refunds" className="text-blue-600 font-semibold hover:underline">Cancellation &amp; Refund Policy</Link>, which offers a 48-hour satisfaction guarantee.</li>
            </ul>
          </section>

          {/* Section 6: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              6. Intellectual Property Rights
            </h2>
            <p>
              All proprietary platform software, user interface designs, custom question banks, algorithmically generated explanations, graphics, and performance analytics systems are the exclusive intellectual property of CUET AI-Prep.
            </p>
            <p>
              Candidates are granted a personal, non-exclusive, non-transferable, revocable license to access the materials solely for personal, non-commercial exam preparation.
            </p>
          </section>

          {/* Section 7: Governing Law & Jurisdiction */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              7. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Republic of India. In the event of any legal dispute arising out of or in connection with the platform, the courts located in New Delhi, India shall have exclusive jurisdiction.
            </p>
          </section>

          {/* Section 8: Support Contact */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              8. Contact Support &amp; Grievance Redressal
            </h2>
            <p>
              If you have any questions, legal concerns, or dispute notices regarding these Terms, contact our academic help desk:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <p>Email: <a href="mailto:support@cuetprep.com" className="text-blue-600 font-semibold hover:underline">support@cuetprep.com</a></p>
              <p>Helpline: <a href="tel:01140759000" className="text-slate-800 font-semibold hover:underline">011-40759000</a></p>
              <p className="text-xs text-slate-500">Available Monday to Saturday, 9:30 AM to 6:00 PM IST.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
