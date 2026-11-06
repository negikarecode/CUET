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
  Mail,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | CUETMate (CUET AI-Prep)",
  description:
    "Terms of Service for CUETMate (CUET AI-Prep). Candidate user agreement, NTA non-affiliation notice, single-user license, and exam practice guidelines.",
  alternates: {
    canonical: getCanonicalUrl("/terms"),
  },
  openGraph: {
    title: "Terms of Service | CUETMate",
    description:
      "CUETMate Terms of Service: Candidate usage rules, CBT practice exam disclaimers, and NTA non-affiliation policy.",
    url: getCanonicalUrl("/terms"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | CUETMate",
    description: "Terms of Service and Candidate Agreement for CUETMate.",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
              <Scale className="w-3.5 h-3.5" />
              <span>Candidate User Agreement &amp; Exam Guidelines</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Last updated: [[DATE]] • Effective for the CUET UG 2027 Academic Cycle
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1: Agreement & Eligibility */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              1. Acceptance of Terms &amp; Candidate Eligibility
            </h2>
            <p>
              These Terms of Service constitute a legally binding agreement between you (&ldquo;you&rdquo; or &ldquo;Candidate&rdquo;) and <strong>[[BUSINESS_LEGAL_NAME]]</strong> (trading as <strong>[[BUSINESS_TRADE_NAME]]</strong>, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;CUETMate&rdquo;). By creating an account, accessing, or purchasing mock tests on our platform, you agree to these Terms and our <Link href="/privacy" className="text-purple-700 font-semibold underline">Privacy Policy</Link>.
            </p>
            <p>
              <strong>Age Requirement &amp; Minors:</strong> Our platform is designed for students preparing for undergraduate college entrance (typically ages 17 to 19). If you are under 18 years of age, you represent and warrant that your parent or legal guardian has reviewed and affirmatively agreed to these Terms on your behalf.
            </p>
          </section>

          {/* Section 2: Non-Affiliation Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-600" />
              2. Independent Platform &amp; NTA Non-Affiliation Notice
            </h2>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
              <p className="font-bold text-xs sm:text-sm text-amber-900">
                Official Regulatory Notice:
              </p>
              <p className="text-xs leading-relaxed">
                CUETMate is an independent educational practice platform and self-study test preparation tool. CUETMate is <strong>not affiliated with, authorized by, endorsed by, or connected to</strong> the National Testing Agency (NTA), the University Grants Commission (UGC), the Ministry of Education (Government of India), or any participating central, state, or private university.
              </p>
              <p className="text-xs leading-relaxed">
                All references to &ldquo;CUET UG&rdquo;, &ldquo;NTA&rdquo;, exam structures, marking guidelines, or specific universities (such as Delhi University or BHU) are used strictly for descriptive, identification, and nominative fair-use educational purposes.
              </p>
            </div>
          </section>

          {/* Section 3: Nature of Practice & No Guarantee of Admission */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-purple-600" />
              3. Nature of Diagnostic Practice &amp; Disclaimer of Results
            </h2>
            <p>
              Our Computer-Based Test (CBT) simulators, pacing clocks (72-second pacing recommendation), and cutoff estimators are designed to help candidates build exam stamina and identify conceptual weak spots.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>No Guaranteed Admission or Ranks:</strong> Completing mock tests on CUETMate does not guarantee admission into Delhi University (DU), Banaras Hindu University (BHU), SRCC, or any specific college program. College admission cutoffs fluctuate annually based on official NTA percentile normalization, reservation quotas, and CSAS counseling rounds.
              </li>
              <li>
                <strong>AI Explanations:</strong> Automated mistake breakdowns and distractor analyses are supplemental learning tools calibrated against standard NCERT Class 12 curricula. While systematically audited, students should always consult authorized NCERT textbooks and official NTA answer keys for authoritative verification.
              </li>
            </ul>
          </section>

          {/* Section 4: Single User License & Anti-Abuse */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              4. Single-User Personal License &amp; Candidate Code of Conduct
            </h2>
            <p>
              Each candidate account is granted a personal, revocable, non-exclusive, non-transferable license strictly for individual self-study. You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Share, lend, or resell account credentials, session tokens, or login links with multiple individuals or commercial coaching institutes.</li>
              <li>Scrape, extract, crawl, or programmatically download questions, answer keys, or AI explanations using bots or automated scripts.</li>
              <li>Manipulate client-side timers, submit forged mock attempt payloads, or attempt to bypass platform paywalls or rate limits.</li>
              <li>Submit offensive, defamatory, or abusive content through feedback or question reporting tools.</li>
            </ul>
            <p>Violations of these integrity rules may result in immediate account termination without refund.</p>
          </section>

          {/* Section 5: Pass Validity & Payment Terms */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              5. Pass Validity, Billing &amp; One-Time Payment Model
            </h2>
            <p>
              Paid upgrades (such as the All-Access Pass or Ranker Pass) provide full access to premium mock series, AI mistake decrypters, and personalized repair quizzes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>One-Time Flat Fee:</strong> All purchases are processed as single, one-time flat payments in Indian Rupees (INR). <strong>There are zero recurring auto-debits or hidden subscription renewals.</strong></li>
              <li><strong>Validity Window:</strong> Passes remain active throughout the full CUET UG 2027 examination cycle and conclude upon completion of that cycle&apos;s primary admission counseling.</li>
              <li><strong>Refund Terms:</strong> Refunds are handled strictly under our <Link href="/refunds" className="text-purple-700 font-semibold underline">Cancellation &amp; Refund Policy</Link>.</li>
            </ul>
          </section>

          {/* Section 6: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-purple-600" />
              6. Intellectual Property Rights
            </h2>
            <p>
              The platform software, user interface design, diagnostic algorithms, question classifications, and proprietary explanatory notes are the exclusive intellectual property of <strong>[[BUSINESS_LEGAL_NAME]]</strong>. You may not reproduce, republish, distribute, or create derivative works without prior written authorization.
            </p>
          </section>

          {/* Section 7: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by Indian law, CUETMate and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of admission opportunity or test scores, arising out of or related to your use of the platform. In any event, our aggregate liability shall not exceed the total amount paid by you for platform access.
            </p>
          </section>

          {/* Section 8: Governing Law & Jurisdiction */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              8. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, claim, or controversy arising out of or relating to these Terms or platform access shall be subject to the exclusive jurisdiction of the competent courts located in <strong>[[JURISDICTION_CITY]]</strong>, India.
            </p>
          </section>

          {/* Section 9: Contact */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-600" />
              9. Contact &amp; Support Channels
            </h2>
            <p>If you have questions regarding these Terms, contact our administrative helpdesk:</p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs sm:text-sm">
              <p><strong>Entity:</strong> [[BUSINESS_LEGAL_NAME]]</p>
              <p><strong>Support Email:</strong> <a href="mailto:[[SUPPORT_EMAIL]]" className="text-purple-700 font-semibold underline">[[SUPPORT_EMAIL]]</a></p>
              <p><strong>Platform Helpline:</strong> [[SUPPORT_PHONE]]</p>
              <p><strong>Operating Hours:</strong> Monday to Saturday, 9:30 AM to 6:00 PM IST</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
