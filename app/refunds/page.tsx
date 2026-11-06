import { Metadata } from "next";
import Link from "next/link";
import { RefreshCcw, ArrowLeft, CheckCircle2, Mail, Clock, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | CUETMate (CUET AI-Prep)",
  description:
    "Cancellation and Refund Policy for CUETMate paid passes. Governed by Indian Consumer Protection (E-Commerce) Rules, 2020 and Razorpay reconciliation.",
  alternates: {
    canonical: getCanonicalUrl("/refunds"),
  },
  openGraph: {
    title: "Cancellation & Refund Policy | CUETMate",
    description:
      "CUETMate Refund Policy: Transparent refund window, duplicate payment reversals, and Razorpay reconciliation.",
    url: getCanonicalUrl("/refunds"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation & Refund Policy | CUETMate",
    description: "Transparent cancellation and refund terms for CUETMate candidates.",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Refund Policy" }]} />

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Transparent Consumer Protection Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Last updated: [[DATE]] • In compliance with Consumer Protection (E-Commerce) Rules, 2020
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Section 1: Refund Window */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. [[REFUND_WINDOW_DAYS]] Refund Window
            </h2>
            <p>
              We want candidates to practice with complete peace of mind. If you purchase any premium pass on CUETMate (such as the All-Access Pass or Ranker Pass) and experience verifiable technical defects (such as failure of the CBT test engine to load or unlock questions):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                You may request a <strong>100% full refund within [[REFUND_WINDOW_DAYS]]</strong> of purchase.
              </li>
              <li>
                To prevent misuse of digital intellectual property, refund eligibility requires that no more than three (3) premium full-length mock exams have been submitted on your account.
              </li>
            </ul>
          </section>

          {/* Section 2: Duplicate / Failed Transactions */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-purple-600" />
              2. Duplicate Deductions &amp; Failed Transactions
            </h2>
            <p>
              If money was debited from your bank account or UPI app but your account status was not immediately upgraded due to a network glitch or banking server downtime:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Our automated webhook engine reconciles pending transactions with Razorpay every 15 minutes.</li>
              <li>If duplicate payments are charged for the same pass, the excess amount is automatically reversed back to the source bank account within <strong>3 to 5 business days</strong>.</li>
              <li>You can also email us directly with your Razorpay payment ID (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">pay_...</code>) for expedited manual activation.</li>
            </ul>
          </section>

          {/* Section 3: Processing Timelines */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              3. Refund Processing Timelines &amp; Methods
            </h2>
            <p>
              Once approved by our billing desk, refunds are credited back to the original source account via Razorpay:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">UPI (GPay / PhonePe / Paytm / BHIM)</span>
                <p className="mt-1 text-slate-600 text-xs">Typically credited back within 24 to 48 hours of approval.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block">Net Banking &amp; Debit / Credit Cards</span>
                <p className="mt-1 text-slate-600 text-xs">Credited within 5 to 7 business days, depending on issuing bank settlement cycles.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Non-Refundable Scenarios */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              4. Non-Refundable Scenarios
            </h2>
            <p>Refunds cannot be issued in the following situations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Requests submitted after the expiration of the [[REFUND_WINDOW_DAYS]] satisfaction window.</li>
              <li>Accounts where extensive question banks or full-length mock tests have been completed and downloaded.</li>
              <li>Accounts terminated due to violations of our Terms of Service (such as credential sharing or automated scraping).</li>
              <li>Post-examination requests submitted after the CUET UG exam window has commenced.</li>
            </ul>
          </section>

          {/* Section 5: How to Request a Refund */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-600" />
              5. How to Request a Refund
            </h2>
            <p>
              To initiate a refund, please send an email from your registered account address with your payment reference:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
              <p><strong>Entity:</strong> [[BUSINESS_LEGAL_NAME]]</p>
              <p>
                <strong>Billing Desk Email:</strong>{" "}
                <a href="mailto:[[SUPPORT_EMAIL]]" className="text-purple-700 font-semibold underline">
                  [[SUPPORT_EMAIL]]
                </a>
              </p>
              <p><strong>Platform Helpline:</strong> [[SUPPORT_PHONE]]</p>
              <p><strong>Required Details:</strong> Registered Email, Razorpay Payment ID, and reason for refund request.</p>
              <p className="text-xs text-slate-500 pt-1">
                Our support team will acknowledge and review your request within 24 working hours.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
