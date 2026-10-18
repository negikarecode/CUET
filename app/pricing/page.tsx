import { Metadata } from "next";
import PricingView from "@/components/payments/PricingView";

export const metadata: Metadata = {
  title: "Pricing & Plans | CUETMate",
  description:
    "Upgrade to CUETMate Premium. Unlimited 50-question NTA mock exams, where do I stand college predictor, subject weakness radar, and NCERT mistake decrypter.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PricingView />
    </div>
  );
}
