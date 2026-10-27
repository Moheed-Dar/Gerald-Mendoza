"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Home,
  Building2,
  Briefcase,
  PhoneCall,
} from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

// ==========================================
// ✅ UPDATED COLOR PALETTE — matches Footer
// "Deep Ocean Architectural"
// Cream | Teal | Deep Teal | Ink
// ==========================================
const CREAM = "#F7F7F7"; // light text on dark (replaces CYAN)
const TEAL = "#347A85"; // main accent (replaces PURPLE)
const DEEP_TEAL = "#28606B"; // secondary accent (replaces MAGENTA)
const INK = "#143336"; // page bg (replaces DARK_PURPLE)
const LIGHT_INK = "#0F2A2E"; // (replaces LIGHT_PURPLE)
const DEEP_INK = "#0A1A1C"; // (replaces DEEP_PURPLE)
const CARD_INK = "#1A3D42"; // card bg (replaces CARD_PURPLE) — slightly lifted teal

// Cream opacity helpers (replaces CYAN_*)
const CREAM_30 = `${CREAM}4D`;
const CREAM_40 = `${CREAM}66`;
const CREAM_50 = `${CREAM}80`;
const CREAM_60 = `${CREAM}99`;
const CREAM_70 = `${CREAM}B3`;
const CREAM_75 = `${CREAM}BF`;
const CREAM_80 = `${CREAM}CC`;
const CREAM_90 = `${CREAM}E6`;

// Teal opacity helpers (for accent fills)
const TEAL_10 = `${TEAL}1A`;
const TEAL_15 = `${TEAL}26`;
const TEAL_20 = `${TEAL}33`;
const TEAL_25 = `${TEAL}40`;
const TEAL_30 = `${TEAL}4D`;
const TEAL_40 = `${TEAL}66`;
const TEAL_60 = `${TEAL}99`;
const TEAL_80 = `${TEAL}CC`;

// ============================================
// DATA
// ============================================
const FAQS = [
  {
    q: "How quickly do you respond to inquiries?",
    a: "We typically respond within 24 hours during business days. For urgent matters, please call us directly.",
  },
  {
    q: "Do you charge any consultation fee?",
    a: "No, our initial consultation is completely free. We believe in building trust first.",
  },
  {
    q: "Can I schedule a property visit?",
    a: "Absolutely! Just mention the property you're interested in and we'll arrange a visit at your convenience.",
  },
];

const SERVICES = [
  {
    icon: Home,
    title: "Buy Property",
    desc: "Find your dream home with expert guidance & local market knowledge.",
  },
  {
    icon: Building2,
    title: "Sell Property",
    desc: "Maximize your home's value with a proven marketing strategy.",
  },
  {
    icon: Briefcase,
    title: "Downsize with Confidence",
    desc: "Simplify your move with personalized planning & support.",
  },
  {
    icon: MessageSquare,
    title: "Relocate to Toronto",
    desc: "Discover the right neighbourhood to match your lifestyle & goals.",
  },
];

const QUICK_LINKS = [
  { label: "Browse Properties", href: "/properties" },
  { label: "About Us", href: "/about" },
  { label: "Home", href: "/" },
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function ContactPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: INK }}>
      {/* ===== BACKGROUND TEXTURE + WATERMARK ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${CREAM} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Watermark logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
          <div className="relative w-75 h-75 sm:w-100 sm:h-100">
            <Image
              src="/images/logo12.png"
              alt="Watermark"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
        {/* Ambient radial glows — Teal & Cream (replaces Magenta & Pink) */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top left, ${TEAL}15 0%, transparent 40%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom right, ${DEEP_TEAL}12 0%, transparent 50%)` }} />
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: CREAM_50 }}>
            <Link
              href="/"
              className="transition-colors"
              style={{ color: CREAM_60 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
              onMouseLeave={(e) => (e.currentTarget.style.color = CREAM_60)}
            >
              Home
            </Link>
            <span style={{ color: CREAM_30 }}>/</span>
            <span style={{ color: CREAM_80 }}>Contact</span>
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${TEAL}, transparent)` }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: TEAL_40 }}>
                Get In Touch
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-[4.25rem] tracking-tight leading-[1.15] mb-4 font-bold"
              style={{
                background: `linear-gradient(to right, ${CREAM}, ${TEAL_40})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Contact Us
            </h1>

            <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: CREAM_70 }}>
              Have a question about a property or need expert advice? Our
              dedicated team is ready to help you find your perfect investment.
            </p>
          </div>
        </div>
      </div>

      {/* ===== FORM + SIDEBAR ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* LEFT – FORM */}
          <div className="lg:col-span-2">
            <div
              className="relative isolate rounded-2xl border overflow-hidden"
              style={{ backgroundColor: CARD_INK, borderColor: `${TEAL}15` }}
            >
              {/* Blur layers — Teal & Cream (replaces Magenta & Pink) */}
              <div
                className="hidden md:block absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2 pointer-events-none"
                style={{ backgroundColor: `${TEAL}10` }}
              />
              <div
                className="hidden md:block absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl translate-x-1/3 translate-y-1/2 pointer-events-none"
                style={{ backgroundColor: `${CREAM}10` }}
              />
              <div className="relative z-10 p-5 sm:p-7">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              {/* Why Contact Us */}
              <div
                className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden"
                style={{ backgroundColor: CARD_INK, borderColor: `${TEAL}15` }}
              >
                <div
                  className="hidden md:block absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ backgroundColor: `${TEAL}10` }}
                />
                <div className="relative z-10">
                  <h3 className="text-base mb-1 font-bold" style={{ color: CREAM }}>
                    Why Contact Us?
                  </h3>
                  <div
                    className="w-10 h-0.5 rounded-full mb-4"
                    style={{ background: `linear-gradient(to right, ${TEAL}, transparent)` }}
                  />
                  <div className="space-y-3">
                    {[
                      {
                        title: "Expert Guidance",
                        desc: "Personalized recommendations based on your budget & preferences.",
                      },
                      {
                        title: "A Clear Plan",
                        desc: "Tailored to your goals & timelines",
                      },
                      {
                        title: "Honest Advice",
                        desc: "Straightforward insights to help you make confident decisions.",
                      },
                      {
                        title: "Dedicated Support",
                        desc: "Guidance every step of the way, from start to finish.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${TEAL}15`, border: `1px solid ${TEAL}25` }}
                        >
                          <CheckCircle2 size={11} style={{ color: CREAM }} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold" style={{ color: CREAM_80 }}>
                            {item.title}
                          </p>
                          <p className="text-[11px] leading-snug mt-0.5" style={{ color: CREAM_50 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Our Services */}
              <div
                className="relative isolate rounded-2xl p-5 border overflow-hidden"
                style={{ backgroundColor: CARD_INK, borderColor: `${TEAL}15` }}
              >
                <div
                  className="hidden md:block absolute top-0 left-0 w-28 h-28 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ backgroundColor: `${TEAL}10` }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={13} style={{ color: TEAL_40 }} />
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: CREAM_50 }}>
                      Our Services
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {SERVICES.map((item, i) => (
                      <Link
                        key={i}
                        href="/services"
                        className="flex items-center gap-3 p-2 rounded-lg border transition-all"
                        style={{ backgroundColor: `${CREAM}08`, borderColor: `${CREAM}10` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${TEAL}10`;
                          e.currentTarget.style.borderColor = `${TEAL}25`;
                          e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${CREAM}08`;
                          e.currentTarget.style.borderColor = `${CREAM}10`;
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${TEAL}15` }}
                        >
                          <item.icon size={13} style={{ color: CREAM }} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold" style={{ color: CREAM_80 }}>
                            {item.title}
                          </p>
                          <p className="text-[11px] leading-snug" style={{ color: CREAM_50 }}>
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MORE INFO SECTION ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${TEAL}30, transparent)` }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: TEAL_40 }}>
              More Info
            </span>
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${TEAL}30, transparent)` }} />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{
              background: `linear-gradient(to right, ${CREAM}, ${TEAL_40})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quick Access
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Call Now — Teal accent (replaces Pink) */}
          <div
            className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden group transition-colors"
            style={{ backgroundColor: CARD_INK, borderColor: `${TEAL}20` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${TEAL}30` }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${TEAL}20` }}
          >
            <div
              className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ backgroundColor: `${TEAL}15` }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${TEAL}20`, border: `1px solid ${TEAL}25` }}
                >
                  <PhoneCall size={15} style={{ color: CREAM }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: CREAM }}>Call Now</p>
                  <p className="text-[11px] mt-0.5" style={{ color: CREAM_50 }}>Urgent inquiries</p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ backgroundColor: `${TEAL}15`, border: `1px solid ${TEAL}20` }}
              >
                <Phone size={12} style={{ color: CREAM }} />
                <span className="text-xs font-semibold" style={{ color: CREAM }}>+1 (416) 996-4489</span>
              </div>
            </div>
          </div>

          {/* Office Hours — Deep Teal accent (replaces Magenta) */}
          <div
            className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden transition-colors"
            style={{ backgroundColor: CARD_INK, borderColor: `${CREAM}10` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${DEEP_TEAL}20` }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${CREAM}10` }}
          >
            <div
              className="hidden md:block absolute bottom-0 left-0 w-20 h-20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2 pointer-events-none"
              style={{ backgroundColor: `${DEEP_TEAL}10` }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} style={{ color: TEAL_40 }} />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: CREAM_50 }}>
                  Office Hours
                </h4>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Mon - Fri", time: "9 AM - 7 PM", active: true },
                  { day: "Saturday", time: "10 AM - 5 PM", active: true },
                  { day: "Sunday", time: "Closed", active: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <span className="text-xs" style={{ color: item.active ? CREAM_70 : CREAM_30 }}>
                      {item.day}
                    </span>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                      style={
                        item.active
                          ? { backgroundColor: `${DEEP_TEAL}15`, color: CREAM, borderColor: `${DEEP_TEAL}25` }
                          : { backgroundColor: `${CREAM}10`, color: CREAM_40, borderColor: `${CREAM}10` }
                      }
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="relative isolate rounded-2xl p-5 border overflow-hidden transition-colors"
            style={{ backgroundColor: CARD_INK, borderColor: `${CREAM}10` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${TEAL}20` }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${CREAM}10` }}
          >
            <div
              className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ backgroundColor: `${TEAL}10` }}
            />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: CREAM_50 }}>
                Quick Links
              </h4>
              <div className="space-y-1">
                {QUICK_LINKS.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center justify-between group py-1.5 px-2 -mx-2 rounded-lg transition-colors"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${CREAM}10` }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                  >
                    <span
                      className="text-xs transition-colors"
                      style={{ color: CREAM_60 }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = CREAM_80 }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = CREAM_60 }}
                    >
                      {link.label}
                    </span>
                    <ArrowRight
                      size={11}
                      className="transition-all"
                      style={{ color: CREAM_30 }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = TEAL_40; e.currentTarget.style.transform = "translateX(2px)" }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = CREAM_30; e.currentTarget.style.transform = "translateX(0)" }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Trusted Agency — Deep Teal accent (replaces Magenta) */}
          <div
            className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden transition-colors"
            style={{ backgroundColor: CARD_INK, borderColor: `${DEEP_TEAL}20` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${DEEP_TEAL}30` }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${DEEP_TEAL}20` }}
          >
            <div
              className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3 pointer-events-none"
              style={{ backgroundColor: `${DEEP_TEAL}10` }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${DEEP_TEAL}20`, border: `1px solid ${DEEP_TEAL}25` }}
                >
                  <ShieldCheck size={16} style={{ color: CREAM }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: CREAM }}>Trusted Agency</p>
                  <p className="text-[11px]" style={{ color: CREAM_50 }}>Since 2020</p>
                </div>
              </div>
              <div className="space-y-2">
                {["Verified Listings", "Secure Deals", "Happy Clients"].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${DEEP_TEAL}15` }}
                    >
                      <CheckCircle2 size={9} style={{ color: CREAM }} />
                    </div>
                    <span className="text-[11px]" style={{ color: CREAM_50 }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FAQ SECTION ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${TEAL}30, transparent)` }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: TEAL_40 }}>
              Common Questions
            </span>
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${TEAL}30, transparent)` }} />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{
              background: `linear-gradient(to right, ${CREAM}, ${TEAL_40})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="relative isolate rounded-2xl p-6 border overflow-hidden transition-colors group"
              style={{ backgroundColor: CARD_INK, borderColor: `${CREAM}10` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${TEAL}20` }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${CREAM}10` }}
            >
              <div
                className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ backgroundColor: `${TEAL}10` }}
              />
              <div className="relative z-10">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${TEAL}15`, border: `1px solid ${TEAL}25` }}
                >
                  <span className="font-bold text-sm" style={{ color: CREAM }}>{index + 1}</span>
                </div>
                <h3 className="text-base mb-2 leading-snug font-bold" style={{ color: CREAM }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: CREAM_60 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}