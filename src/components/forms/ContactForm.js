"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { submitContact } from "@/lib/contact/api";

// ==========================================
// ✅ NEW COLOR PALETTE
// Navy / White / Dark Teal / Teal
// ==========================================
const NAVY = "#0A1628"; // dark background
const WHITE = "#FFFFFF"; // foreground / text
const DARK_TEAL = "#143336"; // card background
const TEAL = "#347A85"; // main accent

// Teal opacity helpers (for text/background tints)
const TEAL_20 = "#347A8533";
const TEAL_30 = "#347A854D";
const TEAL_40 = "#347A8566";
const TEAL_50 = "#347A8580";
const TEAL_60 = "#347A8599";
const TEAL_70 = "#347A85B3";
const TEAL_80 = "#347A85CC";
const TEAL_90 = "#347A85E6";

// White opacity helpers (for muted text)
const WHITE_30 = "#FFFFFF4D";
const WHITE_40 = "#FFFFFF66";
const WHITE_50 = "#FFFFFF80";
const WHITE_60 = "#FFFFFF99";
const WHITE_70 = "#FFFFFFB3";
const WHITE_80 = "#FFFFFFCC";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [apiDown, setApiDown] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (apiDown) setApiDown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      setApiDown(false);
      const result = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      });
      if (result.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      const status = err?.response?.status;
      if (status === 404) {
        setApiDown(true);
        setError(
          "Service is temporarily unavailable. Please try again later or contact us directly via phone.",
        );
      } else {
        setError(
          err?.response?.data?.message ||
            "Network error. Please check your connection and try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Updated input class with new teal/navy scheme
  const inputClass = (hasError) =>
    `w-full px-4 py-3.5 bg-[#0A1628]/60 border rounded-xl text-sm text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#347A85]/30 focus:border-[#347A85]/60 transition-all ${
      hasError ? "border-red-500/50" : "border-[#FFFFFF]/10"
    }`;

  return (
    <div className="transform-gpu will-change-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border"
          style={{ backgroundColor: `${TEAL}15`, borderColor: `${TEAL}30` }}
        >
          <MessageSquare size={16} style={{ color: TEAL }} />
        </div>
        <div>
          <h2 className="text-lg font-playfair" style={{ color: WHITE }}>
            Send Us a Message
          </h2>
          <p className="text-xs mt-0.5" style={{ color: WHITE_50 }}>
            We&apos;d love to hear from you
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mb-6"
        style={{
          background: `linear-gradient(to right, ${TEAL}30, ${TEAL}10, transparent)`,
        }}
      />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-14"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/25">
                <CheckCircle2 size={36} className="text-emerald-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h3
              className="text-xl mt-5 mb-1.5 font-playfair"
              style={{ color: WHITE }}
            >
              Message Sent!
            </h3>
            <p
              className="text-sm text-center max-w-xs"
              style={{ color: WHITE_60 }}
            >
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                style={{ color: TEAL_80 }}
              >
                <User size={10} /> Full Name{" "}
                <span style={{ color: TEAL }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className={inputClass(!!error && !form.name.trim())}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                style={{ color: TEAL_80 }}
              >
                <Mail size={10} /> Email <span style={{ color: TEAL }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={inputClass(!!error && !form.email.trim())}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                style={{ color: TEAL_80 }}
              >
                <Phone size={10} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Your Phone Number (Optional)"
                className={inputClass(false)}
              />
            </div>

            {/* Message */}
            <div>
              <label
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                style={{ color: TEAL_80 }}
              >
                <MessageSquare size={10} /> Message{" "}
                <span style={{ color: TEAL }}>*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Enter your message here..."
                className={`${inputClass(!!error && !form.message.trim())} resize-none`}
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`flex items-start gap-2.5 px-4 py-3 rounded-xl border ${
                    apiDown
                      ? "bg-[#347A85]/10 border-[#347A85]/30"
                      : "bg-red-500/10 border-red-500/25"
                  }`}
                >
                  {apiDown ? (
                    <AlertCircle
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: TEAL }}
                    />
                  ) : (
                    <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm leading-relaxed ${
                        apiDown ? "" : "text-red-300"
                      }`}
                      style={apiDown ? { color: TEAL } : undefined}
                    >
                      {error}
                    </p>
                    {apiDown && (
                      <p
                        className="text-[11px] mt-1"
                        style={{ color: WHITE_60 }}
                      >
                        Call us:{" "}
                        <span style={{ color: TEAL }}>+1 (416) 996-4489</span>
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex cursor-pointer items-center justify-center gap-2.5 px-6 py-3.5 text-white text-sm font-bold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
                boxShadow: `0 4px 16px ${TEAL}40`,
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message{" "}
                  <ArrowRight size={14} className="opacity-70" />
                </>
              )}
            </button>

            <p
              className="text-center text-[10px] mt-2"
              style={{ color: WHITE_40 }}
            >
              By submitting, you agree to our privacy policy.
            </p>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}