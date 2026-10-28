"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Heart,
} from "lucide-react";
import { subscribe } from "@/lib/subscribers/api";

// ============================================
// 5-COLOR SCHEME — "Deep Ocean Architectural"
// ============================================
const CREAM = "#F7F7F7";
const TEAL = "#347A85";
const DEEP_TEAL = "#28606B";
const INK = "#143336";

// Derived tints
const INK_05 = `${INK}0D`;
const TEAL_05 = `${TEAL}0D`;
const TEAL_10 = `${TEAL}1A`;
const TEAL_15 = `${TEAL}26`;
const TEAL_20 = `${TEAL}33`;
const TEAL_25 = `${TEAL}40`;
const TEAL_30 = `${TEAL}4D`;
const TEAL_40 = `${TEAL}66`;
const CREAM_20 = `${CREAM}33`;
const CREAM_40 = `${CREAM}66`;
const CREAM_60 = `${CREAM}99`;
const CREAM_80 = `${CREAM}CC`;

// ============================================
// SOCIAL ICONS
// ============================================
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMsg, setSubscribeMsg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeMsg(null);

    if (!name.trim() || name.trim().length < 2) {
      setSubscribeMsg({ type: "error", text: "Please enter your name" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubscribeMsg({
        type: "error",
        text: "Please enter a valid email address",
      });
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
      setTimeout(() => setSubscribeMsg(null), 6000);
    } else {
      setSubscribeMsg({
        type: "error",
        text: res.message || "Something went wrong. Please try again.",
      });
    }

    setSubscribing(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
   
    {
      name: "Facebook",
      href: "https://www.facebook.com/mendozafirst/",
      icon: <FacebookIcon size={18} />,
    },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: INK, color: CREAM }}
    >
      {/* ============ BACKGROUND LAYERS ============ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${INK} 0%, #0F2226 50%, #0A1A1C 100%)`,
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-125 h-125 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: TEAL }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-125 h-125 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: DEEP_TEAL }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${TEAL} 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ============ BLOCK 1: CTA STRIP ============ */}
      <div
        className="relative z-10 border-b"
        style={{ backgroundColor: TEAL, borderColor: CREAM_20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-3"
                style={{ backgroundColor: `${CREAM}20`, color: CREAM }}
              >
                <Sparkles size={12} strokeWidth={2.5} />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                  Let&apos;s Work Together
                </span>
              </div>
              <h3
                className="font-luxury font-luxury-tracking text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[0.95]"
                style={{ color: CREAM }}
              >
                Move to your{" "}
                <span
                  className="font-luxury-italic italic"
                  style={{ color: INK }}
                >
                  next chapter
                </span>
              </h3>
              <p
                className="mt-3 text-sm sm:text-base max-w-lg mx-auto lg:mx-0"
                style={{ color: `${CREAM}CC` }}
              >
                Buying, selling, or just exploring options — Gerald brings calm,
                humor &amp; decades of experience to every transaction.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-extrabold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: CREAM, color: INK }}
              >
                Book a Consultation
                <ArrowUpRight
                  size={16}
                  strokeWidth={3}
                  className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-extrabold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "transparent",
                  color: CREAM,
                  border: `1.5px solid ${CREAM_40}`,
                }}
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============ BLOCK 2: 4-COLUMNS MAIN GRID ============ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* COL 1: BRAND */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              {/* ✅ LOGO IMAGE — replaces Building2 icon */}
              <div
                className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg"
                style={{
                  backgroundColor: `${CREAM}10`,
                  border: `1px solid ${TEAL_30}`,
                }}
              >
                <Image
                  src="/images/logo12.png"
                  alt="Gerald Mendoza Jr. Real Estate Logo"
                  fill
                  className="object-contain p-1.5"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-luxury text-xl font-extrabold tracking-tight"
                  style={{ color: CREAM }}
                >
                  Gerald Mendoza<span style={{ color: TEAL }}>, Jr.</span>
                </span>
                <span
                  className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: CREAM_60 }}
                >
                  Real Estate Promoter
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: CREAM_80 }}
            >
              A mediating source of calm, humor &amp; humility. Helping Tucson
              buyers and sellers move to the next chapter of their lives.
            </p>

            <div
              className="p-4"
              style={{
                backgroundColor: TEAL_10,
                border: `1px solid ${TEAL_20}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Heart size={14} strokeWidth={2.5} style={{ color: TEAL }} />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
                  style={{ color: TEAL }}
                >
                  Realty Executives
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: CREAM_80 }}
              >
                Tucson Elite — Oracle Office
              </p>
            </div>
          </div>

          {/* COL 2: NAVIGATION */}
          <div>
            <h4
              className="font-mono text-xs uppercase tracking-[0.25em] font-extrabold mb-5 pb-3 border-b"
              style={{ color: CREAM, borderColor: TEAL_20 }}
            >
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm transition-all duration-300"
                    style={{ color: CREAM_80 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = CREAM_80)
                    }
                  >
                    <span
                      className="w-3 h-px transition-all duration-300 group-hover:w-5"
                      style={{ backgroundColor: TEAL }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: CONTACT */}
          <div>
            <h4
              className="font-mono text-xs uppercase tracking-[0.25em] font-extrabold mb-5 pb-3 border-b"
              style={{ color: CREAM, borderColor: TEAL_20 }}
            >
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+15203027600"
                  className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-1"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center shrink-0"
                    style={{
                      backgroundColor: TEAL_15,
                      border: `1px solid ${TEAL_30}`,
                    }}
                  >
                    <Phone
                      size={14}
                      strokeWidth={2.5}
                      style={{ color: TEAL }}
                    />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className="block font-mono text-[9px] uppercase tracking-wider font-bold mb-0.5"
                      style={{ color: TEAL }}
                    >
                      Phone
                    </span>
                    <span
                      className="block text-sm font-semibold"
                      style={{ color: CREAM }}
                    >
                      +1 (520) 302-7600
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:geraldmendoza@realtyexecutives.com"
                  className="group flex items-start gap-3 transition-all duration-300 hover:translate-x-1"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center shrink-0"
                    style={{
                      backgroundColor: TEAL_15,
                      border: `1px solid ${TEAL_30}`,
                    }}
                  >
                    <Mail size={14} strokeWidth={2.5} style={{ color: TEAL }} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className="block font-mono text-[9px] uppercase tracking-wider font-bold mb-0.5"
                      style={{ color: TEAL }}
                    >
                      Email
                    </span>
                    <span
                      className="block text-sm font-semibold break-all"
                      style={{ color: CREAM }}
                    >
                      geraldmendoza@realtyexecutives.com
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <div className="group flex items-start gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center shrink-0"
                    style={{
                      backgroundColor: TEAL_15,
                      border: `1px solid ${TEAL_30}`,
                    }}
                  >
                    <MapPin
                      size={14}
                      strokeWidth={2.5}
                      style={{ color: TEAL }}
                    />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className="block font-mono text-[9px] uppercase tracking-wider font-bold mb-0.5"
                      style={{ color: TEAL }}
                    >
                      Office
                    </span>
                    <span
                      className="block text-sm font-semibold"
                      style={{ color: CREAM }}
                    >
                      6760 N. Oracle Road
                    </span>
                    <span
                      className="block text-xs mt-0.5"
                      style={{ color: CREAM_60 }}
                    >
                      Tucson, AZ
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* COL 4: NEWSLETTER */}
          <div>
            <h4
              className="font-mono text-xs uppercase tracking-[0.25em] font-extrabold mb-5 pb-3 border-b"
              style={{ color: CREAM, borderColor: TEAL_20 }}
            >
              Newsletter
            </h4>

            <div className="flex items-center gap-2 mb-3">
              <Send size={14} strokeWidth={2.5} style={{ color: TEAL }} />
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
                style={{ color: TEAL }}
              >
                Stay Updated
              </p>
            </div>

            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: CREAM_80 }}
            >
              Get market insights, new listings &amp; tips delivered monthly.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={subscribing}
                required
                minLength={2}
                maxLength={100}
                className="w-full py-2.5 px-4 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{
                  backgroundColor: TEAL_10,
                  border: `1px solid ${TEAL_25}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = TEAL;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${TEAL_25}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = TEAL_25;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribing}
                required
                maxLength={200}
                className="w-full py-2.5 px-4 text-sm text-white placeholder-white/40 focus:outline-none transition-all duration-300 disabled:opacity-50"
                style={{
                  backgroundColor: TEAL_10,
                  border: `1px solid ${TEAL_25}`,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = TEAL;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${TEAL_25}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = TEAL_25;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                disabled={subscribing}
                className="w-full py-2.5 px-4 text-sm font-extrabold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${TEAL}, ${DEEP_TEAL})`,
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
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </>
                )}
              </button>

              {subscribeMsg && (
                <div
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium"
                  style={{
                    backgroundColor:
                      subscribeMsg.type === "success"
                        ? TEAL_15
                        : "rgba(239, 68, 68, 0.12)",
                    border: `1px solid ${
                      subscribeMsg.type === "success"
                        ? TEAL_40
                        : "rgba(239, 68, 68, 0.3)"
                    }`,
                    color: subscribeMsg.type === "success" ? TEAL : "#fca5a5",
                  }}
                >
                  {subscribeMsg.type === "success" ? (
                    <CheckCircle2 size={12} className="shrink-0" />
                  ) : (
                    <AlertCircle size={12} className="shrink-0" />
                  )}
                  {subscribeMsg.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ============ BLOCK 3: BOTTOM BAR ============ */}
      <div
        className="relative z-10 border-t"
        style={{ borderColor: TEAL_20, backgroundColor: "#0A1A1C" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* ===== TOP ROW: Leatonic Credit ===== */}
          <div
            className="flex justify-center mb-4 pb-4 border-b"
            style={{ borderColor: TEAL_15 }}
          >
            <Link
              href="https://leatonic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm transition-all duration-300 hover:gap-2"
              style={{ color: CREAM_60 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = CREAM_60)}
            >
              <span>© 2026 Leatonic. All rights reserved.</span>
              <ArrowUpRight
                size={12}
                strokeWidth={2.5}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>

          {/* ===== BOTTOM ROW: Social + Gerald Copyright + Back to Top ===== */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold"
                style={{ color: CREAM_60 }}
              >
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: TEAL_15,
                      border: `1px solid ${TEAL_30}`,
                      color: TEAL,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = TEAL;
                      e.currentTarget.style.borderColor = TEAL;
                      e.currentTarget.style.color = CREAM;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = TEAL_15;
                      e.currentTarget.style.borderColor = TEAL_30;
                      e.currentTarget.style.color = TEAL;
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <p
              className="font-luxury text-sm text-center order-first md:order-0"
              style={{ color: CREAM_80 }}
            >
              © {currentYear} Gerald V Mendoza, Jr. — Realty Executives Tucson
              Elite.
            </p>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:gap-3"
              style={{
                color: CREAM,
                backgroundColor: TEAL_10,
                border: `1px solid ${TEAL_30}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = TEAL;
                e.currentTarget.style.color = CREAM;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_10;
                e.currentTarget.style.color = CREAM;
              }}
              aria-label="Back to top"
            >
              Back To Top
              <ArrowUp
                size={12}
                strokeWidth={3}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
      {/* FLOATING SCROLL-TO-TOP BUTTON */}
      {mounted && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          style={{
            background: `linear-gradient(135deg, ${TEAL}, ${DEEP_TEAL})`,
            boxShadow: `0 8px 24px ${TEAL}66`,
            color: CREAM,
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      )}
    </footer>
  );
}
