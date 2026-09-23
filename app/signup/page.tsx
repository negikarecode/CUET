import { Metadata } from "next";
import { Suspense } from "react";
import AuthPageContent from "@/components/auth/AuthPageContent";

export const metadata: Metadata = {
  title: "Candidate Registration & Sign Up | CUET AI-Prep",
  description:
    "Register for CUET UG 2026 AI preparation. Personalize your domain subjects, target college, and unlock AI diagnostic mock tests.",
};

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7EE] flex items-center justify-center p-4">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthPageContent initialMode="signup" />
    </Suspense>
  );
}
