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
// ✅ NEW COLOR PALETTE (matches all updated components)
// Purple | Cyan | Pink | Magenta
// ==========================================
const PURPLE = "#3C1E74"; // main accent
const CYAN = "#5CE1E6"; // light accent on dark bg (replaces MINT)
const PINK = "#FFA7E4"; // highlight (replaces BRIGHT_CYAN)
const MAGENTA = "#B462B6"; // bright accent (replaces TEAL)

// Dark purple backgrounds (replace Navy greens)
const DARK_PURPLE = "#1E0F3D"; // page bg (replaces NAVY)
const LIGHT_PURPLE = "#2A1454"; // (replaces NAVY_LIGHT)
const DEEP_PURPLE = "#150A2B"; // (replaces NAVY_DARK)
const CARD_PURPLE = "#251247"; // card bg (replaces NAVY_CARD)

// Cyan opacity helpers (replace CREAM_*)
const CYAN_30 = "#5CE1E64D";
const CYAN_40 = "#5CE1E666";
const CYAN_50 = "#5CE1E680";
const CYAN_60 = "#5CE1E699";
const CYAN_70 = "#5CE1E6B3";
const CYAN_75 = "#5CE1E6BF";
const CYAN_80 = "#5CE1E6CC";
const CYAN_90 = "#5CE1E6E6";

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
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: DARK_PURPLE }}>
      {/* ===== BACKGROUND TEXTURE + WATERMARK ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${CYAN} 1px, transparent 0)`,
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
        {/* Ambient radial glows — Magenta & Pink */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top left, ${MAGENTA}15 0%, transparent 40%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom right, ${PINK}08 0%, transparent 50%)` }} />
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="relative z-10 pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: CYAN_50 }}>
            <Link href="/"
              className="hover:text-[#5CE1E6] transition-colors"
              style={{ color: CYAN_60 }}
            >
              Home
            </Link>
            <span style={{ color: CYAN_30 }}>/</span>
            <span style={{ color: CYAN_80 }}>Contact</span>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${MAGENTA}, transparent)` }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: PINK }}>
                Get In Touch
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-[4.25rem] tracking-tight leading-[1.15] mb-4 font-bold"
              style={{
                background: `linear-gradient(to right, ${CYAN}, ${PINK})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Contact Us
            </h1>
            <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: CYAN_70 }}>
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
            <div className="relative isolate rounded-2xl border overflow-hidden" style={{ backgroundColor: CARD_PURPLE, borderColor: `${CYAN}10` }}>
              {/* Blur layers */}
              <div className="hidden md:block absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${MAGENTA}10` }} />
              <div className="hidden md:block absolute bottom-0 right-0 w-48 h-48 rounded-full blur-3xl translate-x-1/3 translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${PINK}10` }} />
              <div className="relative z-10 p-5 sm:p-7">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              {/* Why Contact Us */}
              <div className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden" style={{ backgroundColor: CARD_PURPLE, borderColor: `${CYAN}10` }}>
                <div className="hidden md:block absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${MAGENTA}10` }} />
                <div className="relative z-10">
                  <h3 className="text-base mb-1 font-bold" style={{ color: CYAN }}>
                    Why Contact Us?
                  </h3>
                  <div className="w-10 h-0.5 rounded-full mb-4" style={{ background: `linear-gradient(to right, ${MAGENTA}, transparent)` }} />
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
                        desc: "Guidance every step of the way, from start to finish."
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${MAGENTA}15`, border: `1px solid ${MAGENTA}20` }}>
                          <CheckCircle2 size={11} style={{ color: PINK }} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold" style={{ color: CYAN_80 }}>
                            {item.title}
                          </p>
                          <p className="text-[11px] leading-snug mt-0.5" style={{ color: CYAN_50 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Our Services */}
              <div className="relative isolate rounded-2xl p-5 border overflow-hidden" style={{ backgroundColor: CARD_PURPLE, borderColor: `${CYAN}10` }}>
                <div className="hidden md:block absolute top-0 left-0 w-28 h-28 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${MAGENTA}10` }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={13} style={{ color: PINK }} />
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: CYAN_50 }}>
                      Our Services
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {SERVICES.map((item, i) => (
                      <Link
                        key={i}
                        href="/services"
                        className="flex items-center gap-3 p-2 rounded-lg border transition-all"
                        style={{ backgroundColor: `${CYAN}08`, borderColor: `${CYAN}10` }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${MAGENTA}10`;
                          e.currentTarget.style.borderColor = `${MAGENTA}25`;
                          e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${CYAN}08`;
                          e.currentTarget.style.borderColor = `${CYAN}10`;
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${MAGENTA}15` }}>
                          <item.icon size={13} style={{ color: PINK }} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold" style={{ color: CYAN_80 }}>
                            {item.title}
                          </p>
                          <p className="text-[11px] leading-snug" style={{ color: CYAN_50 }}>
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
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${MAGENTA}30, transparent)` }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: PINK }}>
              More Info
            </span>
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${MAGENTA}30, transparent)` }} />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{
              background: `linear-gradient(to right, ${CYAN}, ${PINK})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quick Access
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Call Now — Pink accent */}
          <div className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden group transition-colors" style={{ backgroundColor: CARD_PURPLE, borderColor: `${PINK}20` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${PINK}30` }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${PINK}20` }}>
            <div className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${PINK}15` }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${PINK}20`, border: `1px solid ${PINK}25` }}>
                  <PhoneCall size={15} style={{ color: PINK }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: PINK }}>Call Now</p>
                  <p className="text-[11px] mt-0.5" style={{ color: CYAN_50 }}>Urgent inquiries</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: `${PINK}15`, border: `1px solid ${PINK}20` }}>
                <Phone size={12} style={{ color: PINK }} />
                <span className="text-xs font-semibold" style={{ color: PINK }}>+1 (416) 996-4489</span>
              </div>
            </div>
          </div>

          {/* Office Hours — Magenta accent */}
          <div className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden transition-colors" style={{ backgroundColor: CARD_PURPLE, borderColor: `${CYAN}10` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${MAGENTA}20` }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${CYAN}10` }}>
            <div className="hidden md:block absolute bottom-0 left-0 w-20 h-20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${MAGENTA}10` }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} style={{ color: PINK }} />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: CYAN_50 }}>
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
                    <span className={`text-xs ${item.active ? "" : ""}`} style={{ color: item.active ? CYAN_70 : CYAN_30 }}>
                      {item.day}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.active ? "border" : ""}`} style={item.active ? { backgroundColor: `${MAGENTA}15`, color: PINK, borderColor: `${MAGENTA}20` } : { backgroundColor: `${CYAN}10`, color: CYAN_40, borderColor: `${CYAN}10` }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links — Cyan accent */}
          <div className="relative isolate rounded-2xl p-5 border overflow-hidden transition-colors" style={{ backgroundColor: CARD_PURPLE, borderColor: `${CYAN}10` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${MAGENTA}20` }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${CYAN}10` }}>
            <div className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${MAGENTA}10` }} />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: CYAN_50 }}>
                Quick Links
              </h4>
              <div className="space-y-1">
                {QUICK_LINKS.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center justify-between group py-1.5 px-2 -mx-2 rounded-lg transition-colors"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${CYAN}10` }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                  >
                    <span className="text-xs transition-colors" style={{ color: CYAN_60 }} onMouseEnter={(e) => { e.currentTarget.style.color = CYAN_80 }} onMouseLeave={(e) => { e.currentTarget.style.color = CYAN_60 }}>
                      {link.label}
                    </span>
                    <ArrowRight size={11} className="transition-all" style={{ color: CYAN_30 }} onMouseEnter={(e) => { e.currentTarget.style.color = PINK; e.currentTarget.style.transform = "translateX(2px)" }} onMouseLeave={(e) => { e.currentTarget.style.color = CYAN_30; e.currentTarget.style.transform = "translateX(0)" }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Trusted Agency — Magenta accent */}
          <div className="relative hidden md:block isolate rounded-2xl p-5 border overflow-hidden transition-colors" style={{ backgroundColor: CARD_PURPLE, borderColor: `${MAGENTA}20` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${MAGENTA}30` }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${MAGENTA}20` }}>
            <div className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3 pointer-events-none" style={{ backgroundColor: `${MAGENTA}10` }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${MAGENTA}20`, border: `1px solid ${MAGENTA}25` }}>
                  <ShieldCheck size={16} style={{ color: PINK }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: PINK }}>Trusted Agency</p>
                  <p className="text-[11px]" style={{ color: CYAN_50 }}>Since 2020</p>
                </div>
              </div>
              <div className="space-y-2">
                {["Verified Listings", "Secure Deals", "Happy Clients"].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${MAGENTA}15` }}>
                      <CheckCircle2 size={9} style={{ color: PINK }} />
                    </div>
                    <span className="text-[11px]" style={{ color: CYAN_50 }}>{tag}</span>
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
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${MAGENTA}30, transparent)` }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: PINK }}>
              Common Questions
            </span>
            <div className="w-12 h-px" style={{ background: `linear-gradient(to right, transparent, ${MAGENTA}30, transparent)` }} />
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{
              background: `linear-gradient(to right, ${CYAN}, ${PINK})`,
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
              style={{ backgroundColor: CARD_PURPLE, borderColor: `${CYAN}10` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${MAGENTA}20` }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${CYAN}10` }}
            >
              <div className="hidden md:block absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ backgroundColor: `${MAGENTA}10` }} />
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${MAGENTA}15`, border: `1px solid ${MAGENTA}20` }}>
                  <span className="font-bold text-sm" style={{ color: PINK }}>{index + 1}</span>
                </div>
                <h3 className="text-base mb-2 leading-snug font-bold" style={{ color: CYAN }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: CYAN_60 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}