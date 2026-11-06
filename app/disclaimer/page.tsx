import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  Building,
  ExternalLink,
  BookOpen,
  Info,
  Scale,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Disclaimer & Non-Affiliation Notice | CUETMate (CUET AI-Prep)",
  description:
    "Official Disclaimer and NTA Non-Affiliation Notice for CUETMate (CUET AI-Prep). Independent educational practice platform statement.",
  alternates: {
    canonical: getCanonicalUrl("/disclaimer"),
  },
  openGraph: {
    title: "Disclaimer & Non-Affiliation Notice | CUETMate",
    description:
      "CUETMate independent educational platform disclaimer and National Testing Agency (NTA) non-affiliation policy.",
    url: getCanonicalUrl("/disclaimer"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer & Non-Affiliation Notice | CUETMate",
    description: "Independent platform disclaimer and regulatory notice for CUETMate.",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Disclaimer" }]} />

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Independent Platform Notice &amp; Regulatory Disclaimers</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Disclaimer &amp; Non-Affiliation Statement
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Last updated: [[DATE]] • Governing CUET UG 2027 Educational Practice
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1: Non-Affiliation */}
          <section className="space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-600" />
              1. Complete Non-Affiliation with Government Bodies &amp; NTA
            </h2>
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-3">
              <p className="font-bold text-xs sm:text-sm text-amber-900">
                Independent Platform Notice:
              </p>
              <p className="leading-relaxed">
                <strong>CUETMate (CUET AI-Prep)</strong> is an independent digital educational preparation platform owned and operated by <strong>[[BUSINESS_LEGAL_NAME]]</strong>.
              </p>
              <p className="leading-relaxed">
                CUETMate is <strong>not affiliated with, associated with, authorized by, sponsored by, or endorsed by</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-amber-900">
                <li>The National Testing Agency (NTA);</li>
                <li>The University Grants Commission (UGC);</li>
                <li>The Ministry of Education, Government of India;</li>
                <li>The University of Delhi (DU), Banaras Hindu University (BHU), or any participating central, state, or private university.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Nominative Fair Use of Trademarks */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              2. Nominative Fair Use of Exam Names &amp; Trademarks
            </h2>
            <p>
              The acronyms and terms &ldquo;CUET&rdquo;, &ldquo;CUET UG&rdquo;, &ldquo;NTA&rdquo;, &ldquo;NCERT&rdquo;, &ldquo;DU CSAS&rdquo;, and individual university and college titles (such as &ldquo;SRCC&rdquo;, &ldquo;Hindu College&rdquo;, &ldquo;Miranda House&rdquo;) are registered trademarks, designations, or trade names belonging exclusively to their respective statutory owners or institutions.
            </p>
            <p>
              Any reference to these names or marks on CUETMate is made strictly for <strong>descriptive, identification, and nominative fair-use purposes</strong> to inform candidates regarding the academic syllabus, test format, and historical admission criteria for which our practice materials are designed. Such use does not imply any official partnership, license, or endorsement.
            </p>
          </section>

          {/* Section 3: Diagnostic Nature & No Guarantee */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              3. Nature of Diagnostic Practice &amp; Disclaimer of Admissions
            </h2>
            <p>
              The mock examinations, question sets, pacing analytics, and college cutoff models provided on CUETMate are simulation tools designed to assist student self-study:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>No Admission Guarantees:</strong> Scoring highly on CUETMate mock tests does not guarantee admission to any college, university, or academic program. Actual admission cutoffs vary every year based on candidate volume, difficulty normalization across examination shifts, and institutional reservation policies.
              </li>
              <li>
                <strong>Cutoff Estimates:</strong> All college cutoff benchmarks displayed on the platform are derived from historical Common Seat Allocation System (CSAS) data and public counseling allocations from previous years (2022 to 2025). They represent indicative historical baselines, not official minimum eligibility standards for 2027.
              </li>
            </ul>
          </section>

          {/* Section 4: AI Explanations */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              4. AI-Generated Conceptual Guidance
            </h2>
            <p>
              Explanations, distractor breakdowns, and study recommendations generated by our artificial intelligence tools (including Google Gemini and Groq LPU models) are automated learning aids calibrated against the NCERT Class 12 curriculum.
            </p>
            <p>
              While we employ systematic accuracy validation, automated tools may occasionally generate explanations that require human clarification. Candidates must always verify complex formulas, facts, and definitions against authorized NCERT Class 12 textbooks and official NTA notifications.
            </p>
          </section>

          {/* Section 5: Official NTA Portal Guidance */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-purple-600" />
              5. Official NTA Candidate Information &amp; Portals
            </h2>
            <p>
              For all official matters concerning CUET UG registration, examination city slips, official admit cards, exam schedules, representation against provisional answer keys, and official normalized scores, candidates must visit the authorized National Testing Agency portals directly:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
              <p><strong>Official NTA CUET Portal:</strong> <a href="https://cuetug.ntaonline.in" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold underline inline-flex items-center gap-1">cuetug.ntaonline.in <ExternalLink className="w-3.5 h-3.5 inline" /></a></p>
              <p><strong>NTA Corporate Portal:</strong> <a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="text-purple-700 font-semibold underline inline-flex items-center gap-1">nta.ac.in <ExternalLink className="w-3.5 h-3.5 inline" /></a></p>
              <p><strong>Official NTA Helpline:</strong> 011-40759000 / 011-69227700</p>
              <p><strong>Official NTA Support Email:</strong> cuet-ug@nta.ac.in</p>
            </div>
          </section>

          {/* Section 6: Contact */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-600" />
              6. Questions Regarding This Disclaimer
            </h2>
            <p>
              For legal inquiries, trademark concerns, or questions regarding this disclaimer, please contact:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs sm:text-sm">
              <p><strong>Operating Entity:</strong> [[BUSINESS_LEGAL_NAME]]</p>
              <p><strong>Support Email:</strong> <a href="mailto:[[SUPPORT_EMAIL]]" className="text-purple-700 font-semibold underline">[[SUPPORT_EMAIL]]</a></p>
              <p><strong>Postal Address:</strong> [[BUSINESS_ADDRESS]], [[BUSINESS_STATE_COUNTRY]]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
