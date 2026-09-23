import { Metadata } from "next";
import { Suspense } from "react";
import AuthPageContent from "@/components/auth/AuthPageContent";

export const metadata: Metadata = {
  title: "Aspirant Sign In | CUET AI-Prep",
  description:
    "Sign in to your CUET AI-Prep command hub. Track domain subject calibration, mock percentiles, and AI weakness radar.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7EE] flex items-center justify-center p-4">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthPageContent initialMode="login" />
    </Suspense>
  );
}
