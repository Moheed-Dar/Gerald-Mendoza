"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import FullscreenMenu from "@/components/ui/FullscreenMenu";
import { CONTACT_INFO } from "@/lib/constants";

// ============================================
// 5-COLOR SCHEME — "Deep Ocean Architectural"
// ============================================
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

const LUXURY_FONT_FAMILY =
  '"Playfair Display", "Cormorant Garamond", Georgia, serif';
const LUXURY_ITALIC_FAMILY = '"Cormorant Garamond", Georgia, serif';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Google Font link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      {/* Plain <style> tag (NOT styled-jsx) — prevents hydration mismatch */}
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
            .navbar-link {
              position: relative;
            }
            .navbar-link::after {
              content: '';
              position: absolute;
              left: 0;
              bottom: -2px;
              height: 1px;
              width: 0;
              background-color: ${TEAL};
              transition: width 0.3s ease;
            }
            .navbar-link:hover::after {
              width: 100%;
            }
          `,
        }}
      />

      <header
        className={`fixed top-0 left-0 w-full z-999 transition-all duration-500 ${
          mounted && scrolled ? "backdrop-blur-md" : ""
        }`}
        style={{
          backgroundColor:
            mounted && scrolled ? `${INK}E6` : "transparent",
          borderBottom:
            mounted && scrolled ? `1px solid ${TEAL_20}` : "1px solid transparent",
        }}
      >
        <nav className="container mx-auto px-6 lg:px-5 md:py-2 py-3 flex items-center justify-between">
          {/* Logo + Address Container */}
          <Link href="/" className="flex flex-col items-start gap-0 group">
            {/* Desktop Logo (md and up) */}
            <div className="relative w-56 h-20 hidden md:block">
              <Image
                src="/images/navlogo234.png"
                alt="Gerald Mendoza Properties"
                fill
                className="object-contain brightness-125 contrast-150 drop-shadow-[0_0_15px_rgba(247,247,247,0.6)]"
                sizes="288px"
                priority
              />
            </div>

            {/* Mobile Logo (below md) */}
            <div className="relative w-36 h-12 md:hidden">
              <Image
                src="/images/navlogo234.png"
                alt="Gerald Mendoza Properties"
                fill
                className="object-contain brightness-125 contrast-150 drop-shadow-[0_0_10px_rgba(247,247,247,0.6)]"
                sizes="160px"
                priority
              />
            </div>
          </Link>

          {/* Right Side: Phone + Let's Talk + Menu */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Phone Number — Updated colors */}
            <a
              href={`tel:${CONTACT_INFO?.phone || "+15203027600"}`}
              className="hidden md:flex items-center gap-2 transition-colors navbar-link"
              style={{ color: CREAM }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TEAL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = CREAM)}
            >
              <Phone size={16} style={{ color: TEAL }} />
              <span className="text-sm font-medium tracking-wide">
                {CONTACT_INFO?.phone || "+1 (520) 302-7600"}
              </span>
            </a>

            {/* Divider */}
            <div
              className="hidden md:block w-px h-6"
              style={{ backgroundColor: CREAM_20 }}
            />

            {/* Let's Talk Button — Updated colors */}
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-2 px-4 py-2 backdrop-blur-sm transition-all duration-300"
              style={{
                backgroundColor: TEAL_10,
                border: `1px solid ${TEAL_30}`,
                color: CREAM,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_20;
                e.currentTarget.style.borderColor = TEAL_40;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_10;
                e.currentTarget.style.borderColor = TEAL_30;
              }}
            >
              <MessageCircle size={18} style={{ color: TEAL }} />
              <span className="font-luxury-italic text-sm font-semibold italic">
                Let&apos;s Talk
              </span>
            </Link>

            {/* Divider */}
            <div
              className="hidden sm:block w-px h-6"
              style={{ backgroundColor: CREAM_20 }}
            />

            {/* Menu Button — Updated colors */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 transition-all duration-300"
              style={{
                backgroundColor: isMenuOpen ? TEAL_20 : TEAL_10,
                border: `1px solid ${isMenuOpen ? TEAL_40 : TEAL_20}`,
              }}
              onMouseEnter={(e) => {
                if (!isMenuOpen) {
                  e.currentTarget.style.backgroundColor = TEAL_20;
                  e.currentTarget.style.borderColor = TEAL_40;
                }
              }}
              onMouseLeave={(e) => {
                if (!isMenuOpen) {
                  e.currentTarget.style.backgroundColor = TEAL_10;
                  e.currentTarget.style.borderColor = TEAL_20;
                }
              }}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? (
                <>
                  <X size={18} style={{ color: CREAM }} />
                  <span
                    className="hidden sm:inline text-sm font-medium"
                    style={{ color: CREAM }}
                  >
                    Close
                  </span>
                </>
              ) : (
                <>
                  <Menu size={18} style={{ color: CREAM }} />
                  <span
                    className="hidden sm:inline text-sm font-medium"
                    style={{ color: CREAM }}
                  >
                    Menu
                  </span>
                </>
              )}
            </button>
          </div>
        </nav>
      </header>

      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}