import type { Metadata, Viewport } from "next";
import Script from "next/script";
import AppShell from "@/components/layout/AppShell";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import GoogleTranslateSync from "@/components/i18n/GoogleTranslateSync";
import { SITE_CONFIG } from "@/lib/config/site";
import "./globals.css";
import "katex/dist/katex.min.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "CUET AI-Prep | NTA-Grade CBT Practice & AI Mistake Diagnosis",
  description:
    "India's practice-first test preparation platform for CUET UG entrance examination. Experience authentic NTA CBT interface, real 60-minute timers, and granular AI mistake diagnosis for Science, Commerce, and Humanities.",
  keywords: [
    "CUET UG 2026",
    "CUET Mock Test",
    "NTA CBT Simulator",
    "CUET Previous Year Papers",
    "CUET Science",
    "CUET Commerce",
    "CUET Humanities",
    "AI Mistake Diagnosis",
    "Delhi University Cutoffs",
  ],
  authors: [{ name: "CUET AI-Prep Academic Team" }],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: "CUET AI-Prep",
    title: "CUET AI-Prep | NTA-Grade CBT Practice & AI Mistake Diagnosis",
    description:
      "India's practice-first test preparation platform for CUET UG entrance examination. Experience authentic NTA CBT interface, real 60-minute timers, and granular AI mistake diagnosis.",
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: "CUET AI-Prep" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CUET AI-Prep | NTA-Grade CBT Practice & AI Mistake Diagnosis",
    description:
      "India's practice-first test preparation platform for CUET UG entrance examination. Experience authentic NTA CBT interface, real 60-minute timers, and granular AI mistake diagnosis.",
    images: [SITE_CONFIG.ogImage],
  },
  other: {
    "strix-verification": "strix-verify-325cf40f42b8e96a8bad6c7e99ea5e67",
    ...(gscVerification ? { "google-site-verification": gscVerification } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth overflow-x-hidden">
      <head>
        <meta name="strix-verification" content="strix-verify-325cf40f42b8e96a8bad6c7e99ea5e67" />
        {gscVerification && (
          <meta name="google-site-verification" content={gscVerification} />
        )}
      </head>
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full max-w-full">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <LanguageProvider>
          <GoogleTranslateSync />
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
