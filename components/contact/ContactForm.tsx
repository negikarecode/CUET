"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "general",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketId, setTicketId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please provide a detailed message (at least 10 characters).");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit support request.");
      }

      setTicketId(data.ticketId || "CUET-REF");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        category: "general",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Send Us a Message
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        Have questions about NTA pattern mock exams, pass upgrades, or AI mistake decrypters? Our academic mentors are here to help.
      </p>

      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3"
        >
          <div className="flex items-center gap-2 font-bold text-emerald-800 text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Ticket Successfully Registered!</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
            Your support reference number is{" "}
            <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-900">
              {ticketId}
            </code>
            . A confirmation has been logged, and our academic counseling team will reply to your email within 24 working hours.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-3 text-xs font-semibold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 px-4 py-2 rounded-xl transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {status === "error" && (
            <div
              role="alert"
              aria-live="polite"
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                aria-required="true"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aryan Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Inquiry Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="general">General Platform Inquiry</option>
              <option value="mocks">Mock Tests &amp; CBT Simulator</option>
              <option value="pyqs">Previous Year Questions (PYQs)</option>
              <option value="payments">Ranker Pass &amp; Razorpay Billing</option>
              <option value="academic">AI Mistake Diagnosis &amp; Academic Content</option>
              <option value="technical">Technical Issue or Bug Report</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Your Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              aria-required="true"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your inquiry, test issue, or question in detail..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Your Request...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Support Ticket</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
