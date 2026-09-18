'use client';
import React from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
}

export default function UpgradeModal({ isOpen, onClose, currentPlan = 'free' }: UpgradeModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      limit: '20 doubts / day',
      features: ['Basic CUETBot access', 'Hindi, English & Hinglish', 'NCERT verified answers', 'Standard speed'],
      current: currentPlan === 'free',
      popular: false,
    },
    {
      name: 'Basic',
      price: '₹299',
      period: 'per month',
      limit: '50 doubts / day',
      features: ['50 doubts every day', 'Fast response time', 'Module 1 Weakness sync', 'Practice MCQ generation'],
      current: currentPlan === 'basic',
      popular: false,
    },
    {
      name: 'Pro',
      price: '₹599',
      period: 'per month',
      limit: '200 doubts / day',
      features: [
        '200 doubts every day',
        'Instant ultra-fast streaming',
        'Unlimited AI practice questions',
        'Detailed step-by-step solutions',
        'Full Mock test weakness analysis',
      ],
      current: currentPlan === 'pro',
      popular: true,
    },
    {
      name: 'Ultimate',
      price: '₹999',
      period: 'per month',
      limit: '1000 doubts / day',
      features: [
        '1000 doubts every day (Virtually Unlimited)',
        'Highest priority AI server lane',
        'Dedicated human SME doubt review',
        'College & Cutoff predictor access',
      ],
      current: currentPlan === 'ultimate',
      popular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:to-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Supercharge Your CUET Prep
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ask unlimited doubts, generate verified NCERT questions, and crack DU North Campus.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Cards Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-5 border flex flex-col justify-between relative transition-all ${
                p.popular
                  ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{p.price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/{p.period}</span>
                </div>
                <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {p.limit}
                </div>

                <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                {p.current ? (
                  <button
                    disabled
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold text-xs text-center cursor-default"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      alert(`Plan upgrade to ${p.name} clicked! In production this opens Razorpay.`);
                      onClose();
                    }}
                    className={`w-full py-2 px-3 rounded-xl font-semibold text-xs text-center shadow-sm transition active:scale-95 ${
                      p.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
                        : 'bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900'
                    }`}
                  >
                    Upgrade to {p.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% verified NCERT answers & 7-day money-back guarantee.</span>
          </div>
          <button
            onClick={onClose}
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Continue with free plan
          </button>
        </div>
      </div>
    </div>
  );
}
