import { Metadata } from "next";
import CheckoutTestClient from "./CheckoutTestClient";

export const metadata: Metadata = {
  title: "Razorpay Standard Web Checkout | CUETMate",
  description: "Secure 256-bit SSL encrypted checkout powered by Razorpay Standard Web Checkout.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            Razorpay Integration
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Razorpay Standard Web Checkout
          </h1>
          <p className="text-sm text-slate-500">
            Official Razorpay modal integration with backend order creation and cryptographic HMAC-SHA256 signature verification.
          </p>
        </div>

        <CheckoutTestClient />
      </div>
    </div>
  );
}
