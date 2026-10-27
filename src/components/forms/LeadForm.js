"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  User,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  CheckCircle2,
  Loader2,
  Heart,
} from "lucide-react";
import { submitLead } from "@/lib/api";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ==========================================
// ✅ NEW COLOR PALETTE
// Navy / White / Dark Teal / Teal
// ==========================================
const NAVY = "#0A1628"; // dark background (replaces DARK_PURPLE)
const NAVY_LIGHT = "#0F1F33"; // inner card (replaces LIGHT_PURPLE)
const DARK_TEAL = "#143336"; // modal bg (replaces CARD_PURPLE)
const WHITE = "#FFFFFF"; // foreground / text (replaces CYAN)
const TEAL = "#347A85"; // main accent (replaces PURPLE/MAGENTA/PINK)
const RED = "#EF4444"; // semantic danger (replaces DARK_PINK)

// Teal opacity helpers (for accent tints — replaces MAGENTA_* and CYAN_*)
const TEAL_05 = "#347A850D";
const TEAL_08 = "#347A8514";
const TEAL_10 = "#347A851A";
const TEAL_15 = "#347A8526";
const TEAL_20 = "#347A8533";
const TEAL_25 = "#347A8540";
const TEAL_30 = "#347A854D";
const TEAL_40 = "#347A8566";
const TEAL_60 = "#347A8599";
const TEAL_80 = "#347A85CC";

// White opacity helpers (for muted text — replaces CYAN_* muted)
const WHITE_30 = "#FFFFFF4D";
const WHITE_40 = "#FFFFFF66";
const WHITE_50 = "#FFFFFF80";
const WHITE_60 = "#FFFFFF99";
const WHITE_70 = "#FFFFFFB3";

/**
 * REUSABLE LEAD FORM
 */
export default function LeadForm({
  propertyId,
  propertyTitle,
  propertyCode,
  propertyPrice,
  propertyCurrency = "PKR",
  title = "Interested",
  subtitle,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onSuccess,
  className = "",
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef(null);

  const hasProperty = !!(propertyId || propertyTitle);

  useEffect(() => {
    if (isOpen && !submitted) {
      const t = setTimeout(() => nameRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen, submitted]);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, setOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm({ name: "", phone: "", email: "", message: "" });
        setSubmitted(false);
        setError("");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Scrollbar fix
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Name and Phone are required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim() || undefined,
        property: propertyId || undefined,
        title: propertyTitle || title || "General Inquiry",
      };

      Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
      );

      const response = await submitLead(payload);
      setSubmitted(true);
      onSuccess?.(response?.data);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price, currency) => {
    if (!price) return null;
    const symbol = currency === "PKR" ? "Rs" : "$";
    return `${symbol} ${Number(price).toLocaleString()}`;
  };

  return (
    <>
      {/* ---- TRIGGER ---- */}
      {trigger ? (
        <div onClick={() => setOpen(true)} className={className}>
          {trigger}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className={`w-full flex items-center justify-center gap-2.5 px-5 py-3 sm:py-3.5 text-white text-sm cursor-pointer font-bold rounded-xl active:scale-[0.98] transition-all shadow-lg ${className}`}
          style={{
            background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
            boxShadow: `0 10px 25px -5px ${TEAL}40`,
          }}
        >
          <Heart size={16} /> I&apos;m Interested
        </button>
      )}

      {/* ---- MODAL ---- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-1000 bg-black/70 backdrop-blur-sm"
              onClick={() => !submitting && setOpen(false)}
            />

            {/* Container */}
            <div className="fixed inset-0 z-1001 flex items-start justify-center overflow-y-auto">
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="relative w-full sm:max-w-md sm:rounded-2xl sm:my-6 shadow-2xl overflow-hidden sm:border-t sm:border-x"
                style={{
                  backgroundColor: DARK_TEAL,
                  borderColor: `${TEAL}20`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ---- HEADER ---- */}
                <div
                  className="relative px-4 sm:px-6 pt-5 sm:pt-6 pb-10 sm:pb-12"
                  style={{
                    background: `linear-gradient(to right, ${TEAL}20, ${TEAL}10, transparent)`,
                    borderBottom: `1px solid ${TEAL}15`,
                  }}
                >
                  {!submitting && !submitted && (
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                      style={{ backgroundColor: `${TEAL}15` }}
                    >
                      <X size={16} />
                    </button>
                  )}

                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${TEAL}20`,
                        border: `1px solid ${TEAL}30`,
                      }}
                    >
                      {hasProperty ? (
                        <Heart size={16} style={{ color: TEAL }} />
                      ) : (
                        <Send size={16} style={{ color: TEAL }} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-base sm:text-lg text-white ${playfair.variable} font-(family-name:--font-playfair)`}
                      >
                        {title}
                      </h3>
                      {subtitle && (
                        <p className="text-[11px] sm:text-xs truncate" style={{ color: TEAL }}>
                          {subtitle}
                        </p>
                      )}
                      {propertyTitle && !subtitle && (
                        <p className="text-[11px] sm:text-xs line-clamp-1" style={{ color: TEAL }}>
                          {propertyTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs mt-1" style={{ color: WHITE_60 }}>
                    {hasProperty
                      ? "Fill in your details and we'll get back to you shortly."
                      : "Send us a message and we'll respond promptly."}
                  </p>
                </div>

                {/* ---- BODY ---- */}
                <div className="relative px-4 sm:px-6 pb-5 sm:pb-6 -mt-5 sm:-mt-6">
                  <div
                    className="rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5"
                    style={{
                      backgroundColor: NAVY,
                      border: `1px solid ${TEAL}15`,
                    }}
                  >
                    {/* SUCCESS */}
                    {submitted ? (
                      <div className="flex flex-col items-center py-6 sm:py-8 gap-3">
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${TEAL}20`,
                            border: `1px solid ${TEAL}30`,
                          }}
                        >
                          <CheckCircle2 size={26} style={{ color: TEAL }} />
                        </div>
                        <h4
                          className={`text-base sm:text-lg text-white ${playfair.variable} font-(family-name:--font-playfair)`}
                        >
                          Thank You!
                        </h4>
                        <p
                          className="text-xs sm:text-sm text-center max-w-60 sm:max-w-65"
                          style={{ color: WHITE_60 }}
                        >
                          {hasProperty
                            ? "Your interest has been submitted. We'll contact you soon."
                            : "Your message has been sent. We'll get back to you shortly."}
                        </p>
                      </div>
                    ) : (
                      /* FORM */
                      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                        {/* Error */}
                        {error && (
                          <div
                            className="flex items-start gap-2 px-3 sm:px-3.5 py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs"
                            style={{
                              backgroundColor: `${RED}15`,
                              border: `1px solid ${RED}30`,
                              color: "#FCA5A5",
                            }}
                          >
                            <X size={13} className="shrink-0 mt-0.5" />
                            <span>{error}</span>
                          </div>
                        )}

                        {/* Name */}
                        <div>
                          <label
                            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5"
                            style={{ color: TEAL_80 }}
                          >
                            <User size={9} className="sm:w-2.5 sm:h-2.5" />
                            Full Name <span style={{ color: TEAL }}>*</span>
                          </label>
                          <input
                            ref={nameRef}
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg sm:rounded-xl text-sm transition-all focus:outline-none focus:border-transparent"
                            style={{
                              backgroundColor: `${TEAL}0A`,
                              border: `1px solid ${TEAL}20`,
                              color: WHITE,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${TEAL}30`;
                              e.currentTarget.style.borderColor = `${TEAL}50`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${TEAL}20`;
                            }}
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5"
                            style={{ color: TEAL_80 }}
                          >
                            <Phone size={9} className="sm:w-2.5 sm:h-2.5" />
                            Phone <span style={{ color: TEAL }}>*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                            className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg sm:rounded-xl text-sm transition-all focus:outline-none focus:border-transparent"
                            style={{
                              backgroundColor: `${TEAL}0A`,
                              border: `1px solid ${TEAL}20`,
                              color: WHITE,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${TEAL}30`;
                              e.currentTarget.style.borderColor = `${TEAL}50`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${TEAL}20`;
                            }}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5"
                            style={{ color: TEAL_80 }}
                          >
                            <Mail size={9} className="sm:w-2.5 sm:h-2.5" />
                            Email <span style={{ color: TEAL }}>*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            required
                            className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg sm:rounded-xl text-sm transition-all focus:outline-none focus:border-transparent"
                            style={{
                              backgroundColor: `${TEAL}0A`,
                              border: `1px solid ${TEAL}20`,
                              color: WHITE,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${TEAL}30`;
                              e.currentTarget.style.borderColor = `${TEAL}50`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${TEAL}20`;
                            }}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5"
                            style={{ color: TEAL_80 }}
                          >
                            <MessageSquare size={9} className="sm:w-2.5 sm:h-2.5" />
                            Message
                          </label>
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={3}
                            placeholder="I'm interested in this property..."
                            className="w-full px-3.5 sm:px-4 py-2.5 rounded-lg sm:rounded-xl text-sm transition-all focus:outline-none focus:border-transparent resize-none"
                            style={{
                              backgroundColor: `${TEAL}0A`,
                              border: `1px solid ${TEAL}20`,
                              color: WHITE,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${TEAL}30`;
                              e.currentTarget.style.borderColor = `${TEAL}50`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${TEAL}20`;
                            }}
                          />
                        </div>

                        {/* Property Info Card */}
                        {hasProperty && (
                          <div
                            className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2.5 rounded-lg sm:rounded-xl"
                            style={{
                              backgroundColor: `${TEAL}10`,
                              border: `1px solid ${TEAL}20`,
                            }}
                          >
                            <Building2
                              size={13}
                              className="shrink-0"
                              style={{ color: TEAL }}
                            />
                            <span
                              className="text-[11px] sm:text-xs truncate flex-1"
                              style={{ color: WHITE_60 }}
                            >
                              {propertyCode || propertyTitle}
                            </span>
                            {propertyPrice && (
                              <span
                                className="text-[11px] sm:text-xs font-bold shrink-0"
                                style={{ color: TEAL }}
                              >
                                {formatPrice(propertyPrice, propertyCurrency)}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 sm:py-3 text-white text-sm font-bold rounded-lg sm:rounded-xl disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
                            boxShadow: `0 10px 25px -5px ${TEAL}40`,
                          }}
                        >
                          {submitting ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send size={16} />
                              <span>Submit Interest</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Bottom safe area */}
                <div className="h-[env(safe-area-inset-bottom)]" />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}