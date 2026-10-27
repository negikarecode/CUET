import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | CUET AI-Prep",
  description: "Reset your CUET AI-Prep candidate account password. Enter your registered email address to receive secure account recovery instructions.",
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
