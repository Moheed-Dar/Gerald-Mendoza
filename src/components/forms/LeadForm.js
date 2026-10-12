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
// ✅ NEW COLOR PALETTE (matches site-wide palette)
// Purple | Cyan | Pink | Magenta
// ==========================================
const PURPLE = "#3C1E74"; // main accent (button gradients)
const CYAN = "#5CE1E6"; // light accent (input text, borders — replaces WARM_CREAM/LIGHT_AQUA)
const PINK = "#FFA7E4"; // highlight (icons, subtitles — replaces TURQUOISE icon usage)
const MAGENTA = "#B462B6"; // bright accent (tints, borders — replaces TURQUOISE)
const DARK_PINK = "#D81B60"; // kept — semantic danger

// Dark purple backgrounds (replace Navy blues)
const DARK_PURPLE = "#1E0F3D";
const LIGHT_PURPLE = "#2A1454"; // inner card (replaces NAVY_CARD)
const CARD_PURPLE = "#251247"; // modal bg (replaces NAVY)

const CYAN_15 = "#5CE1E626";
const CYAN_20 = "#5CE1E633";
const CYAN_30 = "#5CE1E64D";
const CYAN_40 = "#5CE1E666";
const CYAN_50 = "#5CE1E680";
const CYAN_60 = "#5CE1E699";
const CYAN_70 = "#5CE1E6B3";

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
            background: `linear-gradient(135deg, ${PURPLE}, ${MAGENTA})`,
            boxShadow: `0 10px 25px -5px ${MAGENTA}25`,
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
                  backgroundColor: CARD_PURPLE,
                  borderColor: `${CYAN}10`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ---- HEADER ---- */}
                <div
                  className="relative px-4 sm:px-6 pt-5 sm:pt-6 pb-10 sm:pb-12"
                  style={{
                    background: `linear-gradient(to right, ${MAGENTA}15, ${MAGENTA}08, transparent)`,
                    borderBottom: `1px solid ${CYAN}10`,
                  }}
                >
                  {!submitting && !submitted && (
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                      style={{ backgroundColor: `${CYAN}0A` }}
                    >
                      <X size={16} />
                    </button>
                  )}

                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${MAGENTA}15`,
                        border: `1px solid ${MAGENTA}20`,
                      }}
                    >
                      {hasProperty ? (
                        <Heart size={16} style={{ color: PINK }} />
                      ) : (
                        <Send size={16} style={{ color: PINK }} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-base sm:text-lg text-white ${playfair.variable} font-(family-name:--font-playfair)`}
                      >
                        {title}
                      </h3>
                      {subtitle && (
                        <p className="text-[11px] sm:text-xs truncate" style={{ color: PINK }}>
                          {subtitle}
                        </p>
                      )}
                      {propertyTitle && !subtitle && (
                        <p className="text-[11px] sm:text-xs line-clamp-1" style={{ color: PINK }}>
                          {propertyTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs mt-1" style={{ color: CYAN_30 }}>
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
                      backgroundColor: LIGHT_PURPLE,
                      border: `1px solid ${CYAN}10`,
                    }}
                  >
                    {/* SUCCESS */}
                    {submitted ? (
                      <div className="flex flex-col items-center py-6 sm:py-8 gap-3">
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${MAGENTA}15`,
                            border: `1px solid ${MAGENTA}20`,
                          }}
                        >
                          <CheckCircle2 size={26} style={{ color: PINK }} />
                        </div>
                        <h4
                          className={`text-base sm:text-lg text-white ${playfair.variable} font-(family-name:--font-playfair)`}
                        >
                          Thank You!
                        </h4>
                        <p
                          className="text-xs sm:text-sm text-center max-w-60 sm:max-w-65"
                          style={{ color: CYAN_40 }}
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
                              backgroundColor: `${DARK_PINK}10`,
                              border: `1px solid ${DARK_PINK}20`,
                              color: "#F87171",
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
                            style={{ color: CYAN_30 }}
                          >
                            <User size={9} className="sm:w-2.5 sm:h-2.5" />
                            Full Name <span style={{ color: MAGENTA }}>*</span>
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
                              backgroundColor: `${CYAN}05`,
                              border: `1px solid ${CYAN}10`,
                              color: CYAN,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${MAGENTA}20`;
                              e.currentTarget.style.borderColor = `${MAGENTA}30`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${CYAN}10`;
                            }}
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5"
                            style={{ color: CYAN_30 }}
                          >
                            <Phone size={9} className="sm:w-2.5 sm:h-2.5" />
                            Phone <span style={{ color: MAGENTA }}>*</span>
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
                              backgroundColor: `${CYAN}05`,
                              border: `1px solid ${CYAN}10`,
                              color: CYAN,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${MAGENTA}20`;
                              e.currentTarget.style.borderColor = `${MAGENTA}30`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${CYAN}10`;
                            }}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5"
                            style={{ color: CYAN_30 }}
                          >
                            <Mail size={9} className="sm:w-2.5 sm:h-2.5" />
                            Email <span style={{ color: MAGENTA }}>*</span>
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
                              backgroundColor: `${CYAN}05`,
                              border: `1px solid ${CYAN}10`,
                              color: CYAN,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${MAGENTA}20`;
                              e.currentTarget.style.borderColor = `${MAGENTA}30`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${CYAN}10`;
                            }}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label
                            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5"
                            style={{ color: CYAN_30 }}
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
                              backgroundColor: `${CYAN}05`,
                              border: `1px solid ${CYAN}10`,
                              color: CYAN,
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.boxShadow = `0 0 0 2px ${MAGENTA}20`;
                              e.currentTarget.style.borderColor = `${MAGENTA}30`;
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = `${CYAN}10`;
                            }}
                          />
                        </div>

                        {/* Property Info Card */}
                        {hasProperty && (
                          <div
                            className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2.5 rounded-lg sm:rounded-xl"
                            style={{
                              backgroundColor: `${MAGENTA}05`,
                              border: `1px solid ${MAGENTA}10`,
                            }}
                          >
                            <Building2
                              size={13}
                              className="shrink-0"
                              style={{ color: PINK }}
                            />
                            <span
                              className="text-[11px] sm:text-xs truncate flex-1"
                              style={{ color: CYAN_30 }}
                            >
                              {propertyCode || propertyTitle}
                            </span>
                            {propertyPrice && (
                              <span
                                className="text-[11px] sm:text-xs font-bold shrink-0"
                                style={{ color: PINK }}
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
                            background: `linear-gradient(135deg, ${PURPLE}, ${MAGENTA})`,
                            boxShadow: `0 10px 25px -5px ${MAGENTA}25`,
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