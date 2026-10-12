"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Send,
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { subscribe } from "@/lib/subscribers/api"; // ✅ Subscribe API

// ============================================
// NEW 4-COLOR SCHEME (matches About section)
// Purple | Cyan | Pink | Magenta
// ============================================
const PURPLE = "#3C1E74";
const CYAN = "#5CE1E6";
const PINK = "#FFA7E4";
const MAGENTA = "#B462B6";
const DARK = "#1E0F3D"; // derived dark-purple base for backgrounds

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMsg, setSubscribeMsg] = useState(null); // { type: 'success' | 'error', text }
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ============================================
  // ✅ SUBSCRIBE HANDLER
  // ============================================
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeMsg(null);

    // ---- Client-side validation ----
    if (!name.trim() || name.trim().length < 2) {
      setSubscribeMsg({ type: "error", text: "Please enter your name" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubscribeMsg({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setSubscribing(true);

    const res = await subscribe({ name: name.trim(), email: email.trim() });

    if (res.success) {
      setSubscribeMsg({
        type: "success",
        text: res.message || "Successfully subscribed to our newsletter!",
      });
      setName("");
      setEmail("");
      // Success message 6 sec baad auto-hide
      setTimeout(() => setSubscribeMsg(null), 6000);
    } else {
      setSubscribeMsg({
        type: "error",
        text: res.message || "Something went wrong. Please try again.",
      });
    }

    setSubscribing(false);
  };

  const footerLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Properties", href: "/properties" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [{ name: "Blog", href: "/blogs" }],
  };

  // ✅ Only LinkedIn — consistent with About section
  // TODO: Update with Matt Vatcher's actual LinkedIn URL
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/matt-vatcher/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: DARK }}
    >
      {/* ===== LAYERED BACKGROUND (DARK PURPLE) ===== */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(0deg, 
                #150A2B 0%, 
                #1A0C36 30%, 
                ${DARK} 55%, 
                #271451 80%,
                #31196A 100%
              )
            `,
          }}
        />

        <div
          className="absolute inset-x-0 top-0 h-112.5 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${CYAN} 0%, ${CYAN}B3 25%, ${CYAN}66 55%, transparent 100%)`,
          }}
        />

        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-250 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${CYAN}CC 0%, ${CYAN}66 45%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />

        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${MAGENTA}25 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />

        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${CYAN}15 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url('/images/logo12.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "45% auto",
            mixBlendMode: "screen",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${CYAN} 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== SECTION 1: LARGE CTA BANNER (Hidden on Mobile) ===== */}
        <div
          className="relative mt-12 sm:mt-16 mb-16 rounded-3xl overflow-hidden hidden md:block"
          style={{
            background: `linear-gradient(135deg, ${MAGENTA} 0%, ${DARK} 70%, ${CYAN} 140%)`,
            border: `1px solid ${CYAN}20`,
          }}
        >
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${CYAN} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${PINK} 0%, transparent 70%)`,
            }}
          />

          <div className="relative px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mb-3"
                style={{
                  backgroundColor: `${CYAN}20`,
                  color: CYAN,
                  border: `1px solid ${CYAN}30`,
                }}
              >
                <Sparkles size={12} />
                Let's Start Your Journey
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-[-0.02em]">
                Ready to find your <br className="hidden sm:block" />
                <span style={{ color: CYAN }}>next chapter?</span>
              </h3>
              <p
                className="mt-3 text-sm sm:text-base max-w-md mx-auto lg:mx-0"
                style={{ color: `${CYAN}CC` }}
              >
                Whether you're downsizing, upgrading, or investing — I'm here
                to guide you every step of the way.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              {/* TODO: Update with Matt's booking calendar link */}
              <Link
                href="https://calendar.app.google/zf9eeGFTRRb44AKU6"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm font-extrabold transition-all duration-300 hover:scale-105 shadow-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: PURPLE,
                }}
              >
                Book a Consultation
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm font-extrabold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${CYAN}15`,
                  color: CYAN,
                  border: `1px solid ${CYAN}40`,
                }}
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>

        {/* ===== SECTION 2: MAIN FOOTER GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 pt-12 md:pt-0">
          {/* LEFT: Brand Column - 6/12 cols */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-6">
              <Image
                src="/images/navlogo12.png"
                alt="Matt Vatcher Logo"
                width={180}
                height={55}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>

            <p
              className="text-sm sm:text-base leading-relaxed mb-6 max-w-md"
              style={{ color: `${CYAN}CC` }}
            >
              Helping homeowners, buyers and sellers across the Beaches, East
              York, Scarborough and the rest of Toronto move to the next chapter
              of their life — with thoughtful guidance, local knowledge, and a
              real estate experience built on trust, kindness, and connection.
            </p>

            {/* Contact Mini Cards */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+14169964489"
                className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:-translate-x-1"
                style={{
                  backgroundColor: `${CYAN}08`,
                  border: `1px solid ${CYAN}15`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${MAGENTA}20`;
                  e.currentTarget.style.borderColor = `${MAGENTA}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${CYAN}08`;
                  e.currentTarget.style.borderColor = `${CYAN}15`;
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    backgroundColor: `${MAGENTA}25`,
                    color: CYAN,
                  }}
                >
                  <Phone size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: PINK }}>
                    Call Anytime
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    +1 (416) 996-4489
                  </p>
                </div>
              </a>

              <a
                href="mailto:matt@torontosrunningrealtor.com"
                className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:-translate-x-1"
                style={{
                  backgroundColor: `${CYAN}08`,
                  border: `1px solid ${CYAN}15`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${MAGENTA}20`;
                  e.currentTarget.style.borderColor = `${MAGENTA}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${CYAN}08`;
                  e.currentTarget.style.borderColor = `${CYAN}15`;
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    backgroundColor: `${MAGENTA}25`,
                    color: CYAN,
                  }}
                >
                  <Mail size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: PINK }}>
                    Email Me
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    matt@torontosrunningrealtor.com
                  </p>
                </div>
              </a>

              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  backgroundColor: `${CYAN}08`,
                  border: `1px solid ${CYAN}15`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${MAGENTA}25`,
                    color: CYAN,
                  }}
                >
                  <MapPin size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: PINK }}>
                    Serving Area
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    BEACHES, EAST YORK, SCARBOROUGH, TORONTO
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: CYAN }}>
                Follow Along
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: `${CYAN}15`,
                      border: `1px solid ${CYAN}30`,
                      color: CYAN,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = MAGENTA;
                      e.currentTarget.style.borderColor = MAGENTA;
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${CYAN}15`;
                      e.currentTarget.style.borderColor = `${CYAN}30`;
                      e.currentTarget.style.color = CYAN;
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Links Columns - 6/12 cols, 2-column layout */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 sm:gap-6">
            {/* Column 1: Company */}
            <div>
              <h4
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-extrabold mb-5"
                style={{ color: "#FFFFFF" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: PINK }} />
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm transition-all duration-300"
                      style={{ color: `${CYAN}B0` }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `${CYAN}B0`)}
                    >
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-300"
                        style={{ color: PINK }}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h4
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-extrabold mb-5"
                style={{ color: "#FFFFFF" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CYAN }} />
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm transition-all duration-300"
                      style={{ color: `${CYAN}B0` }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = `${CYAN}B0`)}
                    >
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-300"
                        style={{ color: CYAN }}
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Quick Contact CTA under Resources for balance */}
              <div
                className="mt-6 p-4 rounded-xl"
                style={{
                  backgroundColor: `${CYAN}08`,
                  border: `1px solid ${CYAN}15`,
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-wider font-bold mb-1"
                  style={{ color: PINK }}
                >
                  Quick Question?
                </p>
                <p className="text-sm mb-3" style={{ color: `${CYAN}CC` }}>
                  Let's talk about your real estate goals.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold transition-all duration-300 hover:gap-2.5"
                  style={{ color: CYAN }}
                >
                  Reach Out
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECTION 3: NEWSLETTER CARD (✅ SUBSCRIBE IMPLEMENTED) ===== */}
        <div
          className="relative rounded-2xl overflow-hidden mb-12"
          style={{
            backgroundColor: `${CYAN}08`,
            border: `1px solid ${CYAN}20`,
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-0.5"
            style={{
              background: `linear-gradient(to right, transparent, ${CYAN}, ${MAGENTA}, transparent)`,
            }}
          />
          <div
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${MAGENTA} 0%, transparent 70%)`,
            }}
          />

          <div className="relative px-5 sm:px-8 lg:px-12 py-6 sm:py-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Send size={16} style={{ color: PINK }} />
                <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold" style={{ color: PINK }}>
                  Newsletter
                </p>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold mb-1" style={{ color: "#FFFFFF" }}>
                Stay Updated with Toronto Real Estate
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: `${CYAN}B0` }}>
                Get market insights, new listings, and tips delivered monthly.
              </p>
            </div>

            {/* ✅ SUBSCRIBE FORM — Name + Email */}
            <div className="w-full md:w-auto md:min-w-105">
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Name Input */}
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={subscribing}
                    required
                    minLength={2}
                    maxLength={100}
                    className="flex-1 sm:w-44 rounded-full py-3 px-5 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 disabled:opacity-50"
                    style={{
                      backgroundColor: `${CYAN}10`,
                      border: `1px solid ${CYAN}25`,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = CYAN;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${CYAN}25`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = `${CYAN}25`;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />

                  {/* Email Input */}
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribing}
                    required
                    maxLength={200}
                    className="flex-1 sm:w-52 rounded-full py-3 px-5 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 disabled:opacity-50"
                    style={{
                      backgroundColor: `${CYAN}10`,
                      border: `1px solid ${CYAN}25`,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = CYAN;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${CYAN}25`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = `${CYAN}25`;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />

                  {/* Subscribe Button */}
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="shrink-0 px-5 sm:px-6 py-3 rounded-full text-sm font-extrabold text-white transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})`,
                      boxShadow: `0 6px 20px ${MAGENTA}50`,
                    }}
                    aria-label="Subscribe"
                  >
                    {subscribing ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowUpRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {/* ✅ Success / Error Message */}
                {subscribeMsg && (
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium"
                    style={{
                      backgroundColor:
                        subscribeMsg.type === "success"
                          ? `${CYAN}15`
                          : "rgba(239, 68, 68, 0.12)",
                      border: `1px solid ${
                        subscribeMsg.type === "success"
                          ? `${CYAN}40`
                          : "rgba(239, 68, 68, 0.3)"
                      }`,
                      color: subscribeMsg.type === "success" ? CYAN : "#fca5a5",
                    }}
                  >
                    {subscribeMsg.type === "success" ? (
                      <CheckCircle2 size={13} className="shrink-0" />
                    ) : (
                      <AlertCircle size={13} className="shrink-0" />
                    )}
                    {subscribeMsg.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ===== SECTION 4: FINAL COPYRIGHT LINE (LAST) ===== */}
        <div
          className="pt-6 pb-4 flex flex-col items-center"
          style={{ borderTop: `1px solid ${CYAN}15` }}
        >
          <p
            className="text-xs sm:text-sm transition-colors text-center"
            style={{ color: `${CYAN}80` }}
          >
            © {currentYear} Matt Vatcher. All rights reserved.
          </p>
        </div>
      </div>

      {/* SCROLL TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: `linear-gradient(135deg, ${MAGENTA}, ${PURPLE})`,
          boxShadow: `0 8px 24px ${MAGENTA}60`,
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </button>
    </footer>
  );
}