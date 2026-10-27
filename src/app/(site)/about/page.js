"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Music,
  Home,
  Heart,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 5-COLOR SCHEME — "Deep Ocean Architectural"
// ============================================
const CREAM = "#F7F7F7";
const TEAL = "#347A85";
const DEEP_TEAL = "#28606B";
const INK = "#143336";
const BLACK = "#000000";

const INK_05 = `${INK}0D`;
const INK_10 = `${INK}1A`;
const INK_20 = `${INK}33`;
const INK_40 = `${INK}66`;
const INK_60 = `${INK}99`;
const TEAL_15 = `${TEAL}26`;
const TEAL_30 = `${TEAL}4D`;
const CREAM_TINT = `${CREAM}F2`;

// ============================================
// SOCIAL ICONS
// ============================================
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// Career highlights shown BELOW the portrait image
const careerHighlights = [
  {
    icon: Briefcase,
    year: "Early Career",
    title: "Coiffeur Artist",
    description: "Made every client feel like a star — discovered the Midas touch with people.",
  },
  {
    icon: Music,
    year: "Mid Journey",
    title: "Concert Promoter",
    description: "Promoted rock n' roll, salsa & Latin concerts across the Western U.S.",
  },
  {
    icon: Home,
    year: "Reno Era",
    title: "Mortgage Broker — C&A Home Loans",
    description: "Built the most productive brokerage in hardscrabble Reno, NV.",
  },
  {
    icon: Heart,
    year: "Today",
    title: "Realty Executives Tucson Elite",
    description: "Back home in the Ol' Pueblo, bringing calm & humor to every deal.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const galleryImages = [
    { src: "/images/about5up.jpg", alt: "Tucson Real Estate 1" },
    { src: "/images/about1up.jpg", alt: "Tucson Real Estate 2" },
    { src: "/images/about3up.jpg", alt: "Tucson Real Estate 3" },
    { src: "/images/about2up.jpg", alt: "Tucson Real Estate 4" },
  ];

  const socialLinks = [
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/",
      label: "Instagram",
      hoverColor: TEAL,
    },
    {
      icon: FacebookIcon,
      href: "https://www.facebook.com/",
      label: "Facebook",
      hoverColor: DEEP_TEAL,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* ============ LUXURY FONT ============ */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      <style jsx global>{`
        .font-luxury {
          font-family: "Playfair Display", "Cormorant Garamond", Georgia, serif;
        }
        .font-luxury-italic {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-style: italic;
        }
        .font-luxury-tracking {
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* ============ NO TOP BORDER ============ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-white"
        style={{ color: INK }}
      >
        {/* Soft background accents only */}
        <div
          className="absolute -top-40 -right-40 w-125 h-125 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: TEAL }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ backgroundColor: DEEP_TEAL }}
        />

        {/* ============ HERO BLOCK: Heading + Sub-text ============ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-10">
          <div ref={headingRef} className="text-center">
            <span
              className="inline-block px-5 py-2 text-xs sm:text-sm uppercase tracking-[0.3em] font-extrabold mb-6 sm:mb-8"
              style={{
                backgroundColor: INK,
                color: CREAM,
              }}
            >
              ( Who I Am )
            </span>

            <h2
              className="font-luxury font-luxury-tracking text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95]"
              style={{ color: INK }}
            >
              Patience with{" "}
              <span className="relative inline-block" style={{ color: TEAL }}>
                <span className="font-luxury-italic italic">Persnickety</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6C50 2 150 2 198 6"
                    stroke={TEAL}
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>{" "}
              Personalities
            </h2>

            <p
              className="mt-6 sm:mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-medium leading-relaxed"
              style={{ color: INK_60 }}
            >
              Whether one buys or sells a property, business, or home — Gerald
              brings a mediating source of calm, humor, and humility.
            </p>
          </div>
        </div>

        {/* ============ MAIN BIO GRID: Image LEFT | Text RIGHT ============ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">

            {/* ===== LEFT: PORTRAIT + CAREER TIMELINE BELOW IT ===== */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background accent */}
                <div
                  className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-3xl opacity-25 -z-10"
                  style={{ backgroundColor: TEAL }}
                />

                {/* Portrait container */}
                <div
                  className="relative aspect-4/5 sm:aspect-3/4 overflow-hidden"
                  style={{
                    boxShadow: `
                      0 25px 50px -12px ${INK}80,
                      0 10px 20px -5px ${DEEP_TEAL}40
                    `,
                    border: `1px solid ${INK_10}`,
                  }}
                >
                  <Image
                    src="/images/aboutgm.png"
                    alt="Gerald Mendoza, Jr."
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    priority={true}
                  />

                  {/* Color grade overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, transparent 60%, ${INK}95 100%)`,
                    }}
                  />

                  {/* Subtle teal tint */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      background: `linear-gradient(135deg, ${TEAL} 0%, transparent 100%)`,
                    }}
                  />

                  {/* Top-Right: Trusted Badge */}
                  <motion.div
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 px-3 py-1.5 backdrop-blur-md flex items-center gap-1.5"
                    style={{
                      backgroundColor: `${DEEP_TEAL}E6`,
                      border: `1px solid ${CREAM}40`,
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Award size={12} strokeWidth={2.5} style={{ color: CREAM }} />
                    <span
                      className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider"
                      style={{ color: CREAM }}
                    >
                      Trusted
                    </span>
                  </motion.div>

                  {/* NAME PLATE */}
                  <motion.div
                    className="absolute left-4 right-4 sm:left-5 sm:right-5 bottom-4 sm:bottom-5 px-5 py-4 backdrop-blur-md"
                    style={{
                      backgroundColor: `${INK}E6`,
                      border: `1px solid ${TEAL_30}`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <p
                      className="font-luxury text-xl sm:text-2xl lg:text-3xl font-extrabold"
                      style={{ color: CREAM }}
                    >
                      Gerald V Mendoza, Jr.
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div
                        className="h-0.5 w-10 sm:w-12"
                        style={{ backgroundColor: TEAL }}
                      />
                      <p
                        className="text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                        style={{ color: TEAL }}
                      >
                        Real Estate Promoter
                      </p>
                    </div>
                    <p
                      className="mt-1 text-[10px] sm:text-xs font-medium"
                      style={{ color: `${CREAM}99` }}
                    >
                      Realty Executives Tucson Elite – Oracle
                    </p>
                  </motion.div>
                </div>

                {/* Top-Left: "Since 2025" Badge */}
                <motion.div
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 p-3 sm:p-4 z-10"
                  style={{
                    backgroundColor: CREAM,
                    boxShadow: `0 10px 30px ${INK}40`,
                    border: `1px solid ${INK_10}`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <p
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                    style={{ color: TEAL }}
                  >
                    <Calendar size={11} strokeWidth={3} />
                    Since
                  </p>
                  <p
                    className="font-luxury text-2xl sm:text-3xl font-extrabold leading-none mt-1"
                    style={{ color: INK }}
                  >
                    2025
                  </p>
                </motion.div>
              </div>

              {/* ===================================================
                  NEW: CAREER TIMELINE — placed directly BELOW image
                  fills the empty gap that was under the portrait
              =================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 sm:mt-12 mx-auto max-w-md lg:max-w-none"
              >
                {/* Header strip */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ backgroundColor: INK, color: CREAM }}
                >
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-bold">
                    [ Career Path ]
                  </span>
                  <span
                    className="font-luxury-italic text-sm sm:text-base italic"
                    style={{ color: TEAL }}
                  >
                    The Journey
                  </span>
                </div>

                {/* Timeline list */}
                <div
                  className="border-x border-b"
                  style={{ borderColor: INK_10, backgroundColor: CREAM }}
                >
                  {careerHighlights.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                        className="relative flex gap-4 px-5 py-5 sm:px-6 sm:py-6"
                        style={{
                          borderBottom:
                            idx < careerHighlights.length - 1
                              ? `1px solid ${INK_10}`
                              : "none",
                        }}
                      >
                        {/* Icon block */}
                        <div className="shrink-0">
                          <div
                            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center"
                            style={{
                              backgroundColor: TEAL_15,
                              border: `1px solid ${TEAL_30}`,
                            }}
                          >
                            <Icon size={18} strokeWidth={2} style={{ color: TEAL }} />
                          </div>
                        </div>

                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold"
                              style={{ color: TEAL }}
                            >
                              {item.year}
                            </span>
                            <div
                              className="flex-1 h-px"
                              style={{ backgroundColor: INK_10 }}
                            />
                          </div>
                          <h4
                            className="font-luxury text-base sm:text-lg font-bold leading-tight"
                            style={{ color: INK }}
                          >
                            {item.title}
                          </h4>
                          <p
                            className="mt-1.5 text-sm sm:text-base leading-relaxed"
                            style={{ color: INK_60 }}
                          >
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom note */}
                <div
                  className="mt-4 px-5 py-4 flex items-center gap-3"
                  style={{ backgroundColor: TEAL_15, border: `1px solid ${TEAL_30}` }}
                >
                  <Heart size={18} strokeWidth={2.5} style={{ color: TEAL }} />
                  <p
                    className="font-luxury-italic text-sm sm:text-base italic font-medium"
                    style={{ color: INK }}
                  >
                    A mediating source of calm, humor & humility.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* ===== RIGHT: BIO TEXT ===== */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <motion.div variants={itemVariants} className="mb-5 sm:mb-6">
                <span
                  className="inline-block px-3 py-1.5 text-xs sm:text-sm uppercase tracking-[0.3em] font-bold"
                  style={{
                    backgroundColor: INK,
                    color: CREAM,
                  }}
                >
                  ( About Me )
                </span>
              </motion.div>

              <motion.h3
                variants={itemVariants}
                className="font-luxury font-luxury-tracking text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight"
                style={{ color: INK }}
              >
                Hi, I&apos;m{" "}
                <span className="relative inline-block">
                  <span className="font-luxury-italic italic" style={{ color: TEAL }}>
                    Gerald Mendoza, Jr.
                  </span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 6C50 2 150 2 198 6"
                      stroke={DEEP_TEAL}
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </svg>
                </span>
              </motion.h3>

              <motion.div
                variants={itemVariants}
                className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed"
                style={{ color: INK_60 }}
              >
                <p>
                  The son of a copper miner from Silver City, NM and a stay-at-home
                  mother from Solomon, AZ, Gerald Mendoza, Jr. was born, raised, and
                  schooled at Morenci, AZ — a Phelps Dodge town, a true company town.
                  After being the only member of his family to graduate college,
                  majoring in marketing and merchandising, Gerald went forth to see
                  the world and practice his earned knowledge.
                </p>

                <p>
                  Distinguishing himself as a coiffeur artist initially, Gerald found
                  he had the Midas touch where it came to people and how he made them
                  feel. He showed genuine interest in his clients who not only loved
                  his artistic hairstyling, but loved his verve for life even more.
                </p>

                <blockquote
                  className="border-l-4 pl-5 py-3 italic"
                  style={{
                    borderColor: TEAL,
                    backgroundColor: INK_05,
                    color: INK,
                  }}
                >
                  <span className="font-luxury-italic text-lg sm:text-xl">
                    &ldquo;Every client I had was a star to me.&rdquo;
                  </span>
                </blockquote>

                <p>
                  While making stars look beautiful, Gerald found rock n&apos; roll,
                  salsa, and that sexy Latin sound — and started promoting concerts
                  throughout the Western U.S. However, the life of a well-traveled
                  promoter didn&apos;t play well with building a family of his own; so
                  the man gravitated to another business venture, one that would keep
                  him in front of an audience that needed a visionary with deep
                  pockets. Gerald became a{" "}
                  <span className="font-bold" style={{ color: TEAL }}>
                    mortgage broker
                  </span>
                  ! His company, C&amp;A Home Loans, went on to become the most
                  productive in hardscrabble Reno, NV.
                </p>

                <p>
                  Back in his hometown in the Ol&apos; Pueblo with his lovely bride of
                  7 years, Gerald only recently became licensed in real estate and
                  joined Keller Williams. Now with Realty Executives Tucson Elite,
                  he brings decades of people-savvy experience to every transaction.
                </p>

                <blockquote
                  className="border-l-4 pl-5 py-3 italic"
                  style={{
                    borderColor: TEAL,
                    backgroundColor: INK_05,
                    color: INK,
                  }}
                >
                  <span className="font-luxury-italic text-base sm:text-lg">
                    &ldquo;Whether one buys or sells a property, business, or home,
                    the transaction process can be frustrating and uncertain, further
                    aggravating an already high-stress level. I am — always have
                    been — a mediating source of calm, humor, and humility which has
                    often helped my people.&rdquo;
                  </span>
                </blockquote>

                <p>
                  Gerald has come to achieve some of the highest acclaim and
                  affection from not only his colleagues over the years, but also from
                  his beloved family. His mother, Lydia Madrid Mendoza, was quoted
                  saying:{" "}
                  <span className="font-bold" style={{ color: INK }}>
                    &ldquo;I had a great life because of my son; but, he is a
                    mama&apos;s boy.&rdquo;
                  </span>
                </p>

                <p className="font-luxury-italic text-lg sm:text-xl italic font-semibold pt-2" style={{ color: TEAL }}>
                  Please give RETE&apos;s new man-of-action a warm, company-town
                  welcome!
                </p>
              </motion.div>

              {/* CONTACT INFO */}
              <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
                <p
                  className="font-mono text-xs uppercase tracking-[0.25em] font-bold mb-4 sm:mb-5"
                  style={{ color: INK_60 }}
                >
                  [ Get In Touch ]
                </p>
                <div className="flex flex-col gap-3 sm:gap-4 font-medium text-sm sm:text-base">
                  <a
                    href="mailto:geraldmendoza@realtyexecutives.com"
                    className="hover:translate-x-1 transition-transform flex items-center gap-3 group"
                    style={{ color: INK }}
                  >
                    <span
                      className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center shrink-0"
                      style={{
                        backgroundColor: TEAL_15,
                        border: `1px solid ${TEAL_30}`,
                      }}
                    >
                      <Mail size={18} strokeWidth={2} style={{ color: TEAL }} />
                    </span>
                    <span className="truncate group-hover:underline">
                      geraldmendoza@realtyexecutives.com
                    </span>
                  </a>

                  <a
                    href="tel:+15203027600"
                    className="hover:translate-x-1 transition-transform flex items-center gap-3 group"
                    style={{ color: INK }}
                  >
                    <span
                      className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center shrink-0"
                      style={{
                        backgroundColor: TEAL_15,
                        border: `1px solid ${TEAL_30}`,
                      }}
                    >
                      <Phone size={18} strokeWidth={2} style={{ color: TEAL }} />
                    </span>
                    <span className="group-hover:underline">+1 (520) 302-7600</span>
                  </a>

                  <div
                    className="flex items-center gap-3"
                    style={{ color: INK }}
                  >
                    <span
                      className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center shrink-0"
                      style={{
                        backgroundColor: TEAL_15,
                        border: `1px solid ${TEAL_30}`,
                      }}
                    >
                      <MapPin size={18} strokeWidth={2} style={{ color: TEAL }} />
                    </span>
                    <span>
                      6760 N. Oracle Road, Tucson, AZ
                      <span
                        className="block text-xs font-semibold uppercase tracking-wider mt-0.5"
                        style={{ color: INK_60 }}
                      >
                        Realty Executives Tucson Elite – Oracle
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* SOCIAL LINKS */}
              <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
                <p
                  className="font-mono text-xs uppercase tracking-[0.25em] font-bold mb-4 sm:mb-5"
                  style={{ color: INK_60 }}
                >
                  [ Connect With Me ]
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: INK,
                        color: CREAM,
                        border: `1px solid ${INK_20}`,
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -3,
                        backgroundColor: social.hoverColor,
                        borderColor: social.hoverColor,
                      }}
                      transition={{ duration: 0.2 }}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ============ GALLERY GRID ============ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
          <div className="flex items-center gap-4 mb-8 sm:mb-10">
            <span
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-bold"
              style={{ color: TEAL }}
            >
              [ Properties In Focus ]
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: INK_10 }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                <div
                  className="p-2 sm:p-3 bg-white transition-all duration-500"
                  style={{
                    boxShadow: `0 18px 40px -20px ${INK}40`,
                    border: `1px solid ${INK_10}`,
                  }}
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 25vw"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-all duration-500"
                      style={{ backgroundColor: TEAL }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${INK}60, transparent)`,
                      }}
                    />
                  </div>
                  <div className="mt-2 sm:mt-3 text-center">
                    <div
                      className="w-10 sm:w-12 h-0.5 mx-auto"
                      style={{ backgroundColor: TEAL }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}