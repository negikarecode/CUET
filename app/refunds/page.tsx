import { Metadata } from "next";
import Link from "next/link";
import { RefreshCcw, ArrowLeft, CheckCircle2, Mail, Clock } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | CUET AI-Prep",
  description:
    "Cancellation and Refund Policy for CUET AI-Prep paid subscriptions and passes. Transparent terms for Razorpay digital payment reconciliations.",
  alternates: {
    canonical: getCanonicalUrl("/refunds"),
  },
  openGraph: {
    title: "Cancellation & Refund Policy | CUET AI-Prep",
    description:
      "CUET AI-Prep Refund Policy: Transparent 48-hour satisfaction guarantee and Razorpay payment reconciliation details.",
    url: getCanonicalUrl("/refunds"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation & Refund Policy | CUET AI-Prep",
    description: "48-Hour Guarantee and transparent refund policy for CUET AI-Prep.",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Refund Policy" }]} />

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Transparent 48-Hour Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Last Updated: October 2026 • Governed by Indian Consumer Protection (E-Commerce) Rules
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. 48-Hour Refund Window
            </h2>
            <p>
              We want every candidate to practice with total confidence. If you upgrade to any paid tier (such as the Ranker Pass or All-Access Pass) and experience technical dissatisfaction, you may request a <strong>100% full refund within 48 hours</strong> of purchase, provided fewer than three (3) premium full-length mock tests have been submitted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-blue-600" />
              2. Duplicate or Failed Transactions
            </h2>
            <p>
              In case of a payment deduction where your account was not immediately upgraded due to a network timeout or banking downtime:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Our automated webhook system reconciles transactions with Razorpay every 15 minutes.</li>
              <li>If a duplicate payment is charged, the excess transaction is automatically reversed back to the source bank account within 3 to 5 business days.</li>
              <li>You may also email us directly with your Razorpay Payment ID (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">pay_...</code>) for manual expedited unlock.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              3. Processing Timelines &amp; Modes
            </h2>
            <p>
              Once approved, refunds are credited back to the original source account via Razorpay:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>UPI (GPay / PhonePe / Paytm):</strong> Usually credited within 24 to 48 hours.</li>
              <li><strong>Debit / Credit Cards &amp; Net Banking:</strong> 5 to 7 working days depending on issuing bank settlement cycles.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              4. How to Initiate a Refund
            </h2>
            <p>
              Simply email our academic accounts desk with your registered email and Razorpay payment reference:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <p className="font-semibold text-slate-900">CUET AI-Prep Billing Desk</p>
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
                <a href="tel:01140759000" className="text-slate-800 font-semibold hover:underline">
                  011-40759000
                </a>
              </p>
              <p className="text-slate-400 text-xs">
                Refunds are processed through Razorpay directly to the original payment source.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
