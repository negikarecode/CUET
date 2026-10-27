import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP | CUET AI-Prep",
  description: "Enter your 6-digit one-time code to authenticate your CUET AI-Prep account securely.",
};

export default function VerifyOtpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
