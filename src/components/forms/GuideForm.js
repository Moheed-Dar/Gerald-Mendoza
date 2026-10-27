"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  BookOpen,
  CheckCircle2,
  Loader2,
  Download,
  FileText,
} from "lucide-react";
import { downloadGuide } from "@/lib/guides/api";
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
const NAVY = "#0A1628"; // dark background (replaces DARK_PURPLE / DEEP_PURPLE)
const NAVY_LIGHT = "#0F1F33"; // slightly lighter navy for layers
const DARK_TEAL = "#143336"; // card background (replaces CARD_PURPLE)
const WHITE = "#FFFFFF"; // foreground / text
const TEAL = "#347A85"; // main accent (replaces PURPLE / MAGENTA / PINK)

// Teal opacity helpers (replaces CYAN_* tints)
const TEAL_10 = "#347A851A";
const TEAL_15 = "#347A8526";
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

/**
 * =============================================
 * REUSABLE GUIDE DOWNLOAD FORM
 * =============================================
 *
 * BUYER GUIDE:
 *   <GuideForm guideType="buyer" />
 *
 * SELLER GUIDE:
 *   <GuideForm guideType="seller" />
 *
 * CUSTOM TRIGGER:
 *   <GuideForm
 *     guideType="buyer"
 *     trigger={<button>Get Free Guide</button>}
 *   />
 *
 * CONTROLLED:
 *   <GuideForm
 *     guideType="seller"
 *     open={isOpen}
 *     onOpenChange={setIsOpen}
 *   />
 * =============================================
 */
export default function GuideForm({
  guideType,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onSuccess,
  className = "",
}) {
  // ---- Open State ----
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;

  // ---- Form State ----
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const nameRef = useRef(null);

  // ---- Guide Config ----
  const isBuyer = guideType === "buyer";
  const guideLabel = isBuyer ? "Buyer" : "Seller";
  const guideColor = TEAL;

  // ---- Auto-focus ----
  useEffect(() => {
    if (isOpen && !submitted) {
      const t = setTimeout(() => nameRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen, submitted]);

  // ---- Reset form when modal closes ----
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm({ name: "", email: "", phone: "" });
        setSubmitted(false);
        setError("");
        setDownloadUrl(null);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ---- FIX SCROLLBAR ----
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

  // ---- Handlers ----
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("All fields are required.");
      return;
    }

    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        guideType: guideType,
      };

      const response = await downloadGuide(payload);

      setSubmitted(true);
      setDownloadUrl(response?.data?.downloadUrl);
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

  // ---- Download handler ----
  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setOpen(false), 1000);
  };

  // ============================================
  // RENDER
  // ============================================
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
          className={`w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-white text-sm cursor-pointer font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg ${className}`}
          style={{
            background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
            boxShadow: `0 10px 25px -5px ${TEAL}40`,
          }}
        >
          <Download size={16} /> Download {guideLabel} Guide
        </button>
      )}

      {/* ---- MODAL ---- */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-9999 bg-black/70 rounded-2xl backdrop-blur-sm"
            onClick={() => !submitting && setOpen(false)}
          />

          {/* Panel wrapper */}
          <div className="fixed inset-0 z-10000 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            {/* Panel */}
            <div
              className="relative w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden pointer-events-auto"
              style={{
                backgroundColor: DARK_TEAL,
                border: `1px solid ${TEAL}20`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ---- HEADER ---- */}
              <div
                className="relative px-6 pt-6 pb-12"
                style={{
                  background: `linear-gradient(to right, ${guideColor}25, ${guideColor}10, transparent)`,
                  borderBottom: `1px solid ${TEAL}15`,
                }}
              >
                {!submitting && !submitted && (
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer"
                    style={{
                      backgroundColor: `${TEAL}15`,
                    }}
                  >
                    <X size={16} />
                  </button>
                )}

                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${guideColor}25`,
                      border: `1px solid ${guideColor}40`,
                    }}
                  >
                    {submitted ? (
                      <CheckCircle2 size={18} style={{ color: TEAL }} />
                    ) : (
                      <BookOpen size={18} style={{ color: TEAL }} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-white text-lg ${playfair.variable} font-(family-name:--font-playfair)`}
                    >
                      {submitted ? "Guide Ready!" : `${guideLabel} Guide`}
                    </h3>
                    <p className="text-xs truncate" style={{ color: TEAL }}>
                      {submitted
                        ? "Your download is ready below"
                        : `Free ${guideLabel.toLowerCase()} resource`}
                    </p>
                  </div>
                </div>

                {!submitted && (
                  <p style={{ color: WHITE_60 }} className="text-xs mt-1">
                    Fill in your details to get instant access to our comprehensive {guideLabel.toLowerCase()} guide.
                  </p>
                )}
              </div>

              {/* ---- BODY ---- */}
              <div className="relative px-6 pb-6 -mt-6">
                {/* Inner card bg */}
                <div
                  className="rounded-2xl shadow-lg p-5"
                  style={{
                    backgroundColor: NAVY,
                    border: `1px solid ${TEAL}15`,
                  }}
                >
                  {/* SUCCESS + DOWNLOAD */}
                  {submitted ? (
                    <div className="flex flex-col items-center py-8 gap-4">
                      {/* PDF Icon */}
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${guideColor}15`,
                          border: `1px solid ${guideColor}25`,
                        }}
                      >
                        <FileText size={32} style={{ color: TEAL }} />
                      </div>

                      <div className="text-center">
                        <h4
                          className={`text-lg text-white mb-1 ${playfair.variable} font-(family-name:--font-playfair)`}
                        >
                          {guideLabel} Guide PDF
                        </h4>
                        <p className="text-sm" style={{ color: WHITE_60 }}>
                          Click below to download your free guide
                        </p>
                      </div>

                      {/* Download Button */}
                      {downloadUrl && (
                        <button
                          onClick={handleDownload}
                          className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-white text-sm font-bold rounded-xl cursor-pointer transition-all active:scale-[0.98] shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
                            boxShadow: `0 10px 25px -5px ${TEAL}40`,
                          }}
                        >
                          <Download size={18} />
                          Download {guideLabel} Guide
                        </button>
                      )}

                      <button
                        onClick={() => setOpen(false)}
                        className="text-xs transition-colors cursor-pointer"
                        style={{ color: WHITE_40 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = WHITE_60)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = WHITE_40)}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    /* ---- FORM ---- */
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      {/* Error */}
                      {error && (
                        <div
                          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs"
                          style={{
                            backgroundColor: `${TEAL}10`,
                            border: `1px solid ${TEAL}25`,
                            color: "#F87171",
                          }}
                        >
                          <X size={14} className="shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      {/* Name */}
                      <div>
                        <label
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                          style={{ color: TEAL_80 }}
                        >
                          <User size={10} />
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
                          className="w-full px-4 py-2.5 rounded-xl text-sm text-white transition-all focus:outline-none focus:border-transparent"
                          style={{
                            backgroundColor: `${TEAL}0A`,
                            border: `1px solid ${TEAL}20`,
                            color: WHITE,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 0 2px ${guideColor}40`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                          style={{ color: TEAL_80 }}
                        >
                          <Mail size={10} />
                          Email Address <span style={{ color: TEAL }}>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          required
                          className="w-full px-4 py-2.5 rounded-xl text-sm text-white transition-all focus:outline-none focus:border-transparent"
                          style={{
                            backgroundColor: `${TEAL}0A`,
                            border: `1px solid ${TEAL}20`,
                            color: WHITE,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 0 2px ${guideColor}40`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5"
                          style={{ color: TEAL_80 }}
                        >
                          <Phone size={10} />
                          Phone Number <span style={{ color: TEAL }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                          className="w-full px-4 py-2.5 rounded-xl text-sm text-white transition-all focus:outline-none focus:border-transparent"
                          style={{
                            backgroundColor: `${TEAL}0A`,
                            border: `1px solid ${TEAL}20`,
                            color: WHITE,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 0 2px ${guideColor}40`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Guide Type Badge */}
                      <div
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
                        style={{
                          backgroundColor: `${guideColor}10`,
                          border: `1px solid ${guideColor}20`,
                        }}
                      >
                        <FileText
                          size={14}
                          style={{ color: TEAL }}
                          className="shrink-0"
                        />
                        <span className="text-xs flex-1" style={{ color: WHITE_60 }}>
                          {guideLabel} Guide — Free PDF Download
                        </span>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${guideColor}20`,
                            color: TEAL,
                          }}
                        >
                          Free
                        </span>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex cursor-pointer items-center justify-center gap-2 px-5 py-3 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
                          boxShadow: `0 10px 25px -5px ${TEAL}40`,
                        }}
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Processing...
                          </>
                        ) : (
                          <>
                            <Download size={16} /> Get Free {guideLabel} Guide
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-center" style={{ color: WHITE_40 }}>
                        We respect your privacy. No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}