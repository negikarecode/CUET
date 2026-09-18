import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import BottomNavClient from "@/components/BottomNavClient";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import GoogleTranslateSync from "@/components/i18n/GoogleTranslateSync";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "CUET AI-Prep | NTA-Grade CBT Practice & AI Mistake Diagnosis",
  description:
    "India's practice-first test preparation platform for CUET UG entrance examination. Experience authentic NTA CBT interface, real 60-minute timers, and granular AI mistake diagnosis for Science, Commerce, and Humanities.",
  keywords: [
    "CUET UG 2025",
    "CUET Mock Test",
    "NTA CBT Simulator",
    "CUET Previous Year Papers",
    "CUET Science",
    "CUET Commerce",
    "CUET Humanities",
    "AI Mistake Diagnosis",
  ],
  authors: [{ name: "CUET AI-Prep Academic Team" }],
};

export const viewport: Viewport = {
  themeColor: "#FF5C5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col bg-[#FAF7EE] font-sans text-black antialiased selection:bg-[#FECDD3] selection:text-black pb-16 sm:pb-0">
        <LanguageProvider>
          <GoogleTranslateSync />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNavClient />
        </LanguageProvider>
      </body>
    </html>
  );
}
