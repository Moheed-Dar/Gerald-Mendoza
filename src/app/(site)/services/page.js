"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  BarChart3,
  Target,
  Check,
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Users,
  TrendingUp,
  Home,
  Search,
  Scale,
  Star,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GuideForm from "@/components/forms/GuideForm";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// ✅ COLOR PALETTE — matches Footer
// "Deep Ocean Architectural": Cream | Teal | Deep Teal | Ink
// (variable names kept identical so all references stay valid)
// ==========================================
const PURPLE = "#347A85";   // TEAL — main accent
const CYAN = "#F7F7F7";     // CREAM — light text on dark
const PINK = "#347A8566";   // TEAL_40 — highlight accent
const MAGENTA = "#28606B";  // DEEP_TEAL — secondary accent

// Dark ink backgrounds
const DARK_PURPLE = "#143336"; // INK — page bg
const LIGHT_PURPLE = "#0F2A2E"; // LIGHT_INK
const DEEP_PURPLE = "#0A1A1C";  // DEEP_INK
const CARD_PURPLE = "#1A3D42";  // CARD_INK — card bg

// Cream opacity helpers (kept CYAN_* var names so refs stay valid)
const CYAN_30 = "#F7F7F74D";
const CYAN_40 = "#F7F7F766";
const CYAN_50 = "#F7F7F780";
const CYAN_60 = "#F7F7F799";
const CYAN_70 = "#F7F7F7B3";
const CYAN_75 = "#F7F7F7BF";
const CYAN_80 = "#F7F7F7CC";
const CYAN_90 = "#F7F7F7E6";

// ============================================
// SERVICES DATA
// ============================================
const services = [
  {
    icon: ShieldCheck,
    title: "Buyer Representation",
    description:
      "Personalized guidance throughout your home-buying journey. We help you find the right property, evaluate opportunities, negotiate confidently, and navigate every step through closing.",
    features: [
      "Property search & selection guidance",
      "Market analysis & property evaluation",
      "Skilled negotiation on your behalf",
      "Support from consultation to closing",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Seller Representation",
    description:
      "A strategic approach to selling your property with confidence. From pricing and preparation to marketing and negotiations, we help position your property to attract qualified buyers and achieve the best possible outcome.",
    features: [
      "Strategic pricing & market analysis",
      "Professional property marketing & exposure",
      "Skilled negotiation with buyers",
      "Support from listing to closing",
    ],
  },
  {
    icon: BarChart3,
    title: "Home Valuations",
    description:
      "Know what your home is worth with a comprehensive market evaluation. We provide honest advice and local market expertise so you can plan your next move with confidence.",
    features: [
      "Accurate comparative market analysis",
      "Current Toronto market insights",
      "Pricing strategies for today's market",
      "No-obligation consultation",
    ],
  },
  // {
  //   icon: Target,
  //   title: "Downsizing Services",
  //   description:
  //     "Moving to a home that better fits your lifestyle is about more than buying and selling. We provide personalized guidance to help make your transition as smooth and stress-free as possible.",
  //   features: [
  //     "Customized downsizing plan",
  //     "Neighbourhood & lifestyle guidance",
  //     "Trusted local professional referrals",
  //     "Step-by-step support from start to finish",
  //   ],
  // },
];

// ============================================
// GUIDE DATA
// ============================================
const guides = [
  {
    type: "buyer",
    title: "Buyer's Guide",
    description:
      "Everything you need to know before purchasing your dream property. A step-by-step roadmap for first-time and experienced buyers.",
    contents: [
      "Complete buying process explained",
      "Financing options & mortgage tips",
      "Property inspection checklist",
      "Common mistakes to avoid",
      "Negotiation strategies that work",
    ],
    icon: Home,
  },
  {
    type: "seller",
    title: "Seller's Guide",
    description:
      "Maximize your property's value with our proven selling strategies. Learn how to attract the right buyers and close at the best price.",
    contents: [
      "How to price your property right",
      "Home staging & preparation tips",
      "Marketing strategies that sell",
      "Negotiation tactics for sellers",
      "Legal requirements simplified",
    ],
    icon: TrendingUp,
  },
];

// ============================================
// MAIN PAGE
// ============================================
export default function ServicesPage() {
  const pageRef = useRef(null);
  const servicesRef = useRef(null);
  const guidesRef = useRef(null);

  // ---- GSAP Animations ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      );
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.out", delay: 0.1 },
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".guide-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: guidesRef.current,
            start: "top 85%",
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen relative overflow-x-hidden"
      style={{ backgroundColor: DARK_PURPLE }}
    >
      {/* ===== BACKGROUND EFFECTS + WATERMARK ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
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
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at top left, ${MAGENTA}10 0%, transparent 40%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at bottom right, ${PINK}08 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="relative z-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="hero-line flex items-center justify-center gap-3 mb-6 origin-left">
              <div
                className="w-8 h-px"
                style={{
                  background: `linear-gradient(to right, ${MAGENTA}, transparent)`,
                }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ color: PINK }}
              >
                What We Offer
              </span>
              <div
                className="w-8 h-px"
                style={{
                  background: `linear-gradient(to left, ${MAGENTA}, transparent)`,
                }}
              />
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6 font-bold">
              Our{" "}
              <span
                style={{
                  background: `linear-gradient(to right, ${PINK}, ${MAGENTA})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Services
              </span>
            </h1>

            <p
              className="hero-sub text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: CYAN_70 }}
            >
              Comprehensive real estate solutions tailored to your needs. From
              finding your dream home to maximizing your investment returns.
            </p>
          </div>
        </div>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <div ref={servicesRef} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="service-card group relative rounded-2xl p-7 sm:p-8 transition-all duration-500 overflow-hidden"
                  style={{
                    backgroundColor: CARD_PURPLE,
                    border: `1px solid ${CYAN}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${MAGENTA}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${CYAN}10`;
                  }}
                >
                  {/* Subtle glow */}
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: MAGENTA }}
                  />

                  <div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      border: `1px solid ${MAGENTA}20`,
                      backgroundColor: `${MAGENTA}10`,
                    }}
                  >
                    <Icon
                      size={24}
                      style={{ color: PINK }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="relative text-xl text-white mb-3 leading-tight font-semibold">
                    {service.title}
                  </h3>

                  <p
                    className="relative text-sm leading-relaxed mb-6"
                    style={{ color: CYAN_70 }}
                  >
                    {service.description}
                  </p>

                  <ul className="relative space-y-2.5">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: CYAN_70 }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300"
                          style={{
                            border: `1px solid ${MAGENTA}20`,
                            backgroundColor: `${MAGENTA}10`,
                          }}
                        >
                          <Check size={10} style={{ color: PINK }} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="relative mt-7 pt-5"
                    style={{ borderTop: `1px solid ${CYAN}10` }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link"
                      style={{ color: PINK }}
                    >
                      Learn More
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== GUIDES DOWNLOAD SECTION ===== */}
      <div ref={guidesRef} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="w-8 h-px"
                style={{
                  background: `linear-gradient(to right, ${MAGENTA}, transparent)`,
                }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ color: PINK }}
              >
                Free Resources
              </span>
              <div
                className="w-8 h-px"
                style={{
                  background: `linear-gradient(to left, ${MAGENTA}, transparent)`,
                }}
              />
            </div>

            <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-[1.1] mb-4 font-bold">
              Download Our{" "}
              <span
                style={{
                  background: `linear-gradient(to right, ${PINK}, ${MAGENTA})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Free Guides
              </span>
            </h2>

            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: CYAN_70 }}
            >
              Comprehensive resources to help you make informed real estate
              decisions. Download instantly after filling a quick form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {guides.map((guide) => {
              const GuideIcon = guide.icon;
              return (
                <div
                  key={guide.type}
                  className="guide-card group relative rounded-2xl transition-all duration-500"
                  style={{
                    backgroundColor: CARD_PURPLE,
                    border: `1px solid ${CYAN}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${MAGENTA}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${CYAN}10`;
                  }}
                >
                  {/* Subtle glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: MAGENTA }}
                  />

                  <div className="relative p-7 sm:p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                        style={{
                          border: `1px solid ${MAGENTA}20`,
                          backgroundColor: `${MAGENTA}10`,
                        }}
                      >
                        <GuideIcon size={22} style={{ color: PINK }} />
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{
                          border: `1px solid ${MAGENTA}20`,
                          backgroundColor: `${MAGENTA}10`,
                          color: PINK,
                        }}
                      >
                        Free PDF
                      </span>
                    </div>

                    <h3 className="text-xl text-white mb-2 font-semibold">
                      {guide.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: CYAN_70 }}
                    >
                      {guide.description}
                    </p>

                    <ul className="space-y-2 mb-7">
                      {guide.contents.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2.5 text-xs"
                          style={{ color: CYAN_60 }}
                        >
                          <div
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: PINK }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <GuideForm guideType={guide.type} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{
                backgroundColor: `${CYAN}05`,
                border: `1px solid ${CYAN}10`,
              }}
            >
              <ShieldCheck size={14} style={{ color: `${MAGENTA}90` }} />
              <span className="text-xs" style={{ color: CYAN_50 }}>
                Your information is secure. We never share your data.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}