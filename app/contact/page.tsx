import { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactForm from "@/components/contact/ContactForm";
import { getCanonicalUrl } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact Academic Support | CUET AI-Prep",
  description:
    "Reach the CUET AI-Prep academic help desk for mock test support, previous year question inquiries, and billing assistance. Fast 24-hour turnaround.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
  openGraph: {
    title: "Contact Academic Support | CUET AI-Prep",
    description:
      "Get in touch with CUET AI-Prep academic mentors for mock test queries, account help, and technical support.",
    url: getCanonicalUrl("/contact"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Academic Support | CUET AI-Prep",
    description:
      "CUET AI-Prep Helpdesk: Academic queries, mock test support, and candidate assistance.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200/80 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Candidate Assistance Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact CUET AI-Prep Academic Support
          </h1>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            Have questions regarding NTA CBT mock tests, NCERT mistake diagnosis, or Ranker Pass upgrades? We respond within 24 working hours.
          </p>
        </div>

        {/* Main Grid: Form + Support Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Direct Helpdesk & NTA Guidance */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Support Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900">
                Direct Helpdesk Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs font-medium">Academic Support Email</span>
                    <a
                      href="mailto:support@cuetprep.com"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      support@cuetprep.com
                    </a>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Average reply time: Under 4 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs font-medium">Platform Helpline</span>
                    <a
                      href="tel:01140759000"
                      className="font-semibold text-slate-900 hover:text-blue-600"
                    >
                      011-40759000
                    </a>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Mon–Sat, 9:30 AM to 6:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs font-medium">Operating Hours</span>
                    <span className="font-semibold text-slate-800">
                      Monday to Saturday • 9:30 AM – 6:00 PM
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Automated test submission is live 24/7</span>
                  </div>
                </div>
              </div>

              {/* Quick Legal Links */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                <Link href="/privacy" className="hover:text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-blue-600 hover:underline">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link href="/refunds" className="hover:text-blue-600 hover:underline">
                  Refund Guarantee
                </Link>
              </div>
            </div>

            {/* Official NTA Advisory Notice */}
            <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Notice for Official NTA Exam Inquiries</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                CUET AI-Prep is an independent practice platform. For official candidate registration corrections, official NTA admit cards, or exam city slip grievances, please contact the National Testing Agency directly:
              </p>
              <div className="text-xs text-amber-900 font-medium space-y-1 pt-1">
                <p>NTA Helpline: <a href="tel:01140759000" className="underline font-bold">011-40759000</a> / <a href="tel:01169227700" className="underline font-bold">011-69227700</a></p>
                <p>Official NTA Email: <a href="mailto:cuet-ug@nta.ac.in" className="underline font-bold">cuet-ug@nta.ac.in</a></p>
                <p>Official Portal: <a href="https://cuetug.ntaonline.in" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center gap-1 font-bold">cuetug.ntaonline.in <ExternalLink className="w-3 h-3 inline" /></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
