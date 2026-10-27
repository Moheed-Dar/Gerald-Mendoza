"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  ShieldCheck,
  X,
  Home,
  Building2,
  BookOpen,
  Phone,
  Star,
  FileText,
  User,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// 5-COLOR SCHEME — "Deep Ocean Architectural"
// ============================================
// #F7F7F7 → Cream       (background / surfaces)
// #347A85 → Teal        (primary brand / accents)
// #28606B → Deep Teal   (secondary)
// #143336 → Ink         (dark text / surfaces)
// #000000 → Black       (pure highlights)
const CREAM = "#F7F7F7";
const TEAL = "#347A85";
const DEEP_TEAL = "#28606B";
const INK = "#143336";
const BLACK = "#000000";

// Derived tints (fully defined — no missing references)
const INK_05 = `${INK}0D`;
const INK_10 = `${INK}1A`;
const INK_20 = `${INK}33`;
const INK_30 = `${INK}4D`;
const INK_40 = `${INK}66`;
const INK_60 = `${INK}99`;
const INK_80 = `${INK}CC`;
const TEAL_05 = `${TEAL}0D`;
const TEAL_10 = `${TEAL}1A`;
const TEAL_15 = `${TEAL}26`;
const TEAL_20 = `${TEAL}33`;
const TEAL_25 = `${TEAL}40`;
const TEAL_30 = `${TEAL}4D`;
const TEAL_40 = `${TEAL}66`;
const TEAL_60 = `${TEAL}99`;
const CREAM_80 = `${CREAM}CC`;
const CREAM_60 = `${CREAM}99`;
const CREAM_40 = `${CREAM}66`;
const CREAM_20 = `${CREAM}33`;

const DEFAULT_NAV_LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Blogs", href: "/blogs", icon: BookOpen },
];

const CMS_LINKS = [
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Services", href: "/services", icon: Star },
  { label: "Contact Us", href: "/contact", icon: Phone },
];

const LUXURY_FONT_FAMILY =
  '"Playfair Display", "Cormorant Garamond", Georgia, serif';
const LUXURY_ITALIC_FAMILY = '"Cormorant Garamond", Georgia, serif';

export default function FullscreenMenu({ isOpen, onClose }) {
  const circleRef = useRef(null);
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    setMounted(true);

    const checkAuthStatus = () => {
      try {
        const cookies = document.cookie.split(";");
        const authCookieNames = [
          "token",
          "auth_token",
          "session",
          "auth-session",
          "next-auth.session-token",
          "sb-access-token",
          "supabase-auth-token",
        ];

        const hasAuthCookie = cookies.some((cookie) => {
          const trimmedCookie = cookie.trim();
          return authCookieNames.some((name) =>
            trimmedCookie.startsWith(`${name}=`)
          );
        });

        if (hasAuthCookie) {
          setIsLoggedIn(true);
          return;
        }

        const localStorageKeys = [
          "token",
          "auth_token",
          "access_token",
          "user",
          "auth",
        ];

        const hasLocalToken = localStorageKeys.some((key) => {
          const value = localStorage.getItem(key);
          if (!value) return false;
          try {
            const parsed = JSON.parse(value);
            return parsed?.token || parsed?.access_token || parsed?.session;
          } catch {
            return value && value.length > 10;
          }
        });

        if (hasLocalToken) {
          setIsLoggedIn(true);
          return;
        }

        const sessionKeys = ["token", "auth_token", "access_token"];
        const hasSessionToken = sessionKeys.some((key) => {
          const value = sessionStorage.getItem(key);
          return value && value.length > 10;
        });

        if (hasSessionToken) {
          setIsLoggedIn(true);
          return;
        }

        setIsLoggedIn(false);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();

    if (isOpen) {
      checkAuthStatus();
    }
  }, [isOpen]);

  const adminLinkConfig = {
    href: isLoggedIn ? "/admin/dashboard" : "/admin/login",
    label: isLoggedIn ? "Dashboard" : "Admin",
    icon: isLoggedIn ? LayoutDashboard : ShieldCheck,
  };

  const handleClose = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    onClose();
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    handleClose();
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // GSAP Pulse Animation
  useEffect(() => {
    if (!isOpen || !circleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(circleRef.current, {
        scale: 1.3,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(circleRef.current, {
        opacity: 0.6,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
    return () => ctx.revert();
  }, [isOpen]);

  // GSAP slide-in for desktop
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        menuRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Google Font link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      {/* Plain <style> tag (NOT styled-jsx) — no hydration mismatch */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .font-luxury {
              font-family: ${LUXURY_FONT_FAMILY};
              letter-spacing: 0.02em;
            }
            .font-luxury-italic {
              font-family: ${LUXURY_ITALIC_FAMILY};
              font-style: italic;
            }
          `,
        }}
      />

      {/* ===== DESKTOP BACKDROP — only md+ ===== */}
      <div
        className="hidden md:block fixed inset-0 z-998"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={handleClose}
      />

      {/* ========== DESKTOP MENU (md and above) ========== */}
      <div
        ref={menuRef}
        className="hidden md:flex fixed top-25 left-0 right-0 z-999 justify-center px-4 lg:px-8"
      >
        <div
          className="w-full max-w-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: CREAM,
            border: `1px solid ${INK_10}`,
            borderRadius: "0",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Hero Preview Image */}
            <div className="relative h-44 lg:h-auto lg:min-h-70">
              <Image
                src="/banner/banner2.jpg"
                alt="Gerald Mendoza Properties Preview"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 128px, 160px"
              />
              {/* Ink overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${INK}CC 0%, ${INK}33 50%, transparent 100%)`,
                }}
              />

              <div className="absolute top-3 left-3">
                <div className="relative w-24 h-8 flex items-center justify-center">
                  <div className="relative z-10 mt-10 w-50 h-20">
                    <Image
                      src="/images/logo12.png"
                      alt="Gerald Mendoza"
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 left-3">
                <h2
                  className="font-luxury text-2xl lg:text-3xl font-extrabold tracking-tight"
                  style={{ color: CREAM }}
                >
                  Gerald Mendoza
                </h2>
              </div>
            </div>

            {/* Right: Navigation Links */}
            <div className="p-5 lg:p-6" style={{ backgroundColor: CREAM }}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold mb-3 pb-2 border-b"
                    style={{ color: TEAL, borderColor: TEAL_20 }}
                  >
                    Main Pages
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {DEFAULT_NAV_LINKS.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={handleLinkClick}
                        className="group relative py-1.5 text-sm font-medium transition-colors"
                        style={{ color: INK_60 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = INK_60)}
                      >
                        <span className="relative">
                          {link.label}
                          <span
                            className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                            style={{ backgroundColor: TEAL }}
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold mb-3 pb-2 border-b"
                    style={{ color: TEAL, borderColor: TEAL_20 }}
                  >
                    Explore
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {CMS_LINKS.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={handleLinkClick}
                        className="group relative py-1.5 text-sm font-medium transition-colors"
                        style={{ color: INK_60 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = INK_60)}
                      >
                        <span className="relative">
                          {link.label}
                          <span
                            className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                            style={{ backgroundColor: TEAL }}
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className="p-4 flex items-center justify-between gap-3"
            style={{
              borderTop: `1px solid ${INK_10}`,
              backgroundColor: CREAM,
            }}
          >
            {/* ✅ Updated email */}
            <a
              href="mailto:geraldmendoza@realtyexecutives.com"
              className="flex items-center gap-2 transition-colors"
              style={{ color: INK_60 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = INK_60)}
            >
              <Mail size={15} style={{ color: TEAL }} />
              <span className="text-sm font-medium">
                geraldmendoza@realtyexecutives.com
              </span>
            </a>

            <div className="flex items-center gap-2">
              {/* Dynamic Admin/Dashboard Link */}
              <Link
                href={adminLinkConfig.href}
                onClick={handleLinkClick}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-all"
                style={
                  isLoggedIn
                    ? {
                        backgroundColor: TEAL_10,
                        border: `1px solid ${TEAL_30}`,
                        color: TEAL,
                      }
                    : {
                        backgroundColor: TEAL_05,
                        border: `1px solid ${TEAL_20}`,
                        color: TEAL,
                      }
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = TEAL_20;
                  e.currentTarget.style.borderColor = TEAL_40;
                }}
                onMouseLeave={(e) => {
                  if (isLoggedIn) {
                    e.currentTarget.style.backgroundColor = TEAL_10;
                    e.currentTarget.style.borderColor = TEAL_30;
                  } else {
                    e.currentTarget.style.backgroundColor = TEAL_05;
                    e.currentTarget.style.borderColor = TEAL_20;
                  }
                }}
              >
                {(() => {
                  const AdminIcon = adminLinkConfig.icon;
                  return <AdminIcon size={16} />;
                })()}
                <span>{adminLinkConfig.label}</span>
              </Link>
              <Link
                href="/properties"
                onClick={handleLinkClick}
                className="px-4 py-2 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: INK }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                All Properties
              </Link>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: INK }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE SIDEBAR (below md) ========== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-998"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
              onClick={handleClose}
            />

            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-999 w-80 shadow-2xl flex flex-col"
              style={{ backgroundColor: CREAM }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                onClick={handleClose}
                className="absolute top-3 right-3 z-50 w-9 h-9 flex items-center justify-center text-white transition-colors shadow-lg"
                style={{ backgroundColor: INK }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                <X size={18} />
              </motion.button>

              {/* Hero Image */}
              <div className="relative h-40 shrink-0">
                <Image
                  src="/banner/banner2.jpg"
                  alt="Gerald Mendoza"
                  fill
                  className="object-cover"
                  sizes="320px"
                  priority
                />
                {/* Ink overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${INK}CC 0%, ${INK}33 50%, transparent 100%)`,
                  }}
                />

                <div className="absolute top-3 left-3">
                  <div
                    className="flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{
                      backgroundColor: "rgba(247,247,247,0.2)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(247,247,247,0.3)",
                    }}
                  >
                    <div
                      className="relative w-6 h-6 rounded-full flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: "rgba(247,247,247,0.9)" }}
                    >
                      <Image
                        src="/images/logo12.png"
                        alt="Gerald Mendoza Logo"
                        fill
                        className="object-contain p-0.5"
                        sizes="24px"
                      />
                    </div>
                    <span
                      className="font-luxury text-white font-semibold text-xs"
                    >
                      Gerald Mendoza
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3">
                  <p
                    className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold"
                    style={{ color: TEAL }}
                  >
                    Tucson Real Estate
                  </p>
                  <h2
                    className="font-luxury text-lg font-extrabold text-white tracking-tight mt-0.5"
                  >
                    Find Your Dream Home
                  </h2>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 px-4 py-4 overflow-y-auto">
                {/* Main Pages */}
                <div className="mb-3">
                  <h3
                    className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-2"
                    style={{ color: INK_60 }}
                  >
                    Main Pages
                  </h3>
                  <div className="flex flex-col gap-1">
                    {DEFAULT_NAV_LINKS.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={index}
                          href={link.href}
                          onClick={handleLinkClick}
                          className="group flex items-center gap-3 px-3 py-3 transition-all duration-200"
                          style={{ backgroundColor: "transparent" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = TEAL_10)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                          }
                        >
                          <div
                            className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                            style={{
                              backgroundColor: TEAL_10,
                              border: `1px solid ${TEAL_20}`,
                            }}
                          >
                            <Icon
                              size={16}
                              className="transition-colors duration-200"
                              style={{ color: TEAL }}
                            />
                          </div>
                          <span
                            className="font-luxury text-sm font-medium transition-colors duration-200"
                            style={{ color: INK }}
                          >
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px my-3" style={{ backgroundColor: INK_10 }} />

                {/* CMS Pages */}
                <div>
                  <h3
                    className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mb-2"
                    style={{ color: INK_60 }}
                  >
                    Explore
                  </h3>
                  <div className="flex flex-col gap-1">
                    {CMS_LINKS.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={index}
                          href={link.href}
                          onClick={handleLinkClick}
                          className="group flex items-center gap-3 px-3 py-3 transition-all duration-200"
                          style={{ backgroundColor: "transparent" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = TEAL_10)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                          }
                        >
                          <div
                            className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                            style={{
                              backgroundColor: TEAL_10,
                              border: `1px solid ${TEAL_20}`,
                            }}
                          >
                            <Icon
                              size={16}
                              className="transition-colors duration-200"
                              style={{ color: TEAL }}
                            />
                          </div>
                          <span
                            className="font-luxury text-sm font-medium transition-colors duration-200"
                            style={{ color: INK }}
                          >
                            {link.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div
                className="px-4 py-4 shrink-0"
                style={{
                  borderTop: `1px solid ${INK_10}`,
                  backgroundColor: TEAL_05,
                }}
              >
                {/* ✅ Updated email */}
                <a
                  href="mailto:geraldmendoza@realtyexecutives.com"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-1.5 transition-colors mb-3"
                  style={{ color: INK_60 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK_60)}
                >
                  <Mail size={12} style={{ color: TEAL }} />
                  <span className="text-[11px] font-medium">
                    geraldmendoza@realtyexecutives.com
                  </span>
                </a>

                <div className="flex flex-col items-center gap-2">
                  {/* Dynamic Admin/Dashboard Link */}
                  <Link
                    href={adminLinkConfig.href}
                    onClick={handleLinkClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                    style={
                      isLoggedIn
                        ? {
                            backgroundColor: TEAL_10,
                            border: `1px solid ${TEAL_30}`,
                            color: TEAL,
                          }
                        : {
                            backgroundColor: TEAL_05,
                            border: `1px solid ${TEAL_20}`,
                            color: TEAL,
                          }
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = TEAL_20;
                      e.currentTarget.style.borderColor = TEAL_40;
                    }}
                    onMouseLeave={(e) => {
                      if (isLoggedIn) {
                        e.currentTarget.style.backgroundColor = TEAL_10;
                        e.currentTarget.style.borderColor = TEAL_30;
                      } else {
                        e.currentTarget.style.backgroundColor = TEAL_05;
                        e.currentTarget.style.borderColor = TEAL_20;
                      }
                    }}
                  >
                    {(() => {
                      const AdminIcon = adminLinkConfig.icon;
                      return <AdminIcon size={16} />;
                    })()}
                    <span>{isLoggedIn ? "Go to Dashboard" : "Admin Login"}</span>
                  </Link>

                  <Link
                    href="/properties"
                    onClick={handleLinkClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200"
                    style={{ backgroundColor: INK }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                  >
                    <FileText size={16} />
                    <span>All Properties</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}