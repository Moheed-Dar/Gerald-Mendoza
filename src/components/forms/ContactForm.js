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
// ✅ NEW COLOR PALETTE (matches site-wide palette)
// Purple | Cyan | Pink | Magenta
// ==========================================
const PURPLE = "#3C1E74"; // main accent (buttons, gradients)
const CYAN = "#5CE1E6"; // light accent on dark bg (replaces MINT)
const PINK = "#FFA7E4"; // highlight (replaces BRIGHT_CYAN)
const MAGENTA = "#B462B6"; // bright accent (replaces TEAL)

// Dark purple backgrounds
const DARK_PURPLE = "#1E0F3D";
const CARD_PURPLE = "#251247";

// Cyan opacity helpers (replace CREAM_*)
const CYAN_30 = "#5CE1E64D";
const CYAN_40 = "#5CE1E666";
const CYAN_50 = "#5CE1E680";
const CYAN_60 = "#5CE1E699";
const CYAN_70 = "#5CE1E6B3";
const CYAN_75 = "#5CE1E6BF";
const CYAN_80 = "#5CE1E6CC";
const CYAN_90 = "#5CE1E6E6";

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

  // Updated input class with new color scheme
  const inputClass = (hasError) =>
    `w-full px-4 py-3.5 bg-[#5CE1E6]/10 border rounded-xl text-sm text-[#5CE1E6] placeholder-[#5CE1E6]/40 focus:outline-none focus:ring-2 focus:ring-[#B462B6]/30 focus:border-[#B462B6]/40 transition-all ${
      hasError ? "border-red-500/50" : "border-[#5CE1E6]/15"
    }`;

  return (
    <div className="transform-gpu will-change-auto">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${MAGENTA}10`, borderColor: `${MAGENTA}20` }}>
          <MessageSquare size={16} style={{ color: PINK }} />
        </div>
        <div>
          <h2 className="text-lg font-playfair" style={{ color: CYAN }}>Send Us a Message</h2>
          <p className="text-xs mt-0.5" style={{ color: CYAN_50 }}>We&apos;d love to hear from you</p>
        </div>
      </div>

      <div className="w-full h-px mb-6" style={{ background: `linear-gradient(to right, ${CYAN}10, ${CYAN}08, transparent)` }} />

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
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/15">
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
            <h3 className="text-xl mt-5 mb-1.5 font-playfair" style={{ color: CYAN }}>
              Message Sent!
            </h3>
            <p className="text-sm text-center max-w-xs" style={{ color: CYAN_50 }}>
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: CYAN_50 }}>
                <User size={10} /> Full Name <span style={{ color: MAGENTA }}>*</span>
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
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: CYAN_50 }}>
                <Mail size={10} /> Email <span style={{ color: MAGENTA }}>*</span>
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
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: CYAN_50 }}>
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
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: CYAN_50 }}>
                <MessageSquare size={10} /> Message <span style={{ color: MAGENTA }}>*</span>
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
                      ? "bg-[#FFA7E4]/5 border-[#FFA7E4]/20"
                      : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  {apiDown ? (
                    <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: PINK }} />
                  ) : (
                    <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm leading-relaxed ${apiDown ? "" : "text-red-300"}`} style={apiDown ? { color: PINK } : undefined}>
                      {error}
                    </p>
                    {apiDown && (
                      <p className="text-[11px] mt-1" style={{ color: CYAN_50 }}>
                        Call us: <span style={{ color: PINK }}>+1 (416) 996-4489</span>
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
                background: `linear-gradient(135deg, ${PURPLE}, ${MAGENTA})`,
                boxShadow: `0 4px 16px ${MAGENTA}30`,
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message <ArrowRight size={14} className="opacity-70" />
                </>
              )}
            </button>

            <p className="text-center text-[10px] mt-2" style={{ color: CYAN_30 }}>
              By submitting, you agree to our privacy policy.
            </p>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}