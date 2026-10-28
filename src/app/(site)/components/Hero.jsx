"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Heart,
  Building2,
  Plus,
  Minus,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";

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
// SAFE IMAGE HELPER
// ============================================
const getSafeImg = (img) => {
  if (!img) return null;
  if (typeof img === "string" && img.trim() !== "") return img.trim();
  if (typeof img === "object" && img?.url) return img.url.trim();
  return null;
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80";

// ============================================
// STATUS HELPERS
// ============================================
const getStatusLabel = (status) => {
  const s = (status || "").toLowerCase().trim();
  switch (s) {
    case "available":
      return { text: "Available", dot: TEAL };
    case "sold":
      return { text: "Sold", dot: "#C84B3F" };
    case "rented":
      return { text: "Rented", dot: "#D9A441" };
    case "pending":
      return { text: "Pending", dot: "#E0C341" };
    case "new":
      return { text: "New", dot: "#5BB89F" };
    default:
      return { text: status || "Available", dot: TEAL };
  }
};

export default function HeroSection() {
  const heroImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
  ];

  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedIds, setLikedIds] = useState(new Set());
  const totalImages = heroImages.length;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setPropertiesLoading(true);
        const res = await axios.get(
          "/api/properties/get-all?page=1&limit=2&sortBy=isFeatured&sortOrder=desc"
        );
        const data = res.data?.data || [];
        setProperties(data.slice(0, 2));
      } catch {
        setProperties([]);
      } finally {
        setPropertiesLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, 4500);
    return () => clearInterval(interval);
  }, [totalImages]);

  const goToSlide = (idx) => {
    setCurrentImageIndex((idx + totalImages) % totalImages);
  };

  const toggleLike = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const PropertyCard = ({ property, index }) => {
    const img =
      getSafeImg(property.thumbnail) ||
      getSafeImg(property.images?.[0]) ||
      PLACEHOLDER;
    const isLiked = likedIds.has(property._id);
    const status = getStatusLabel(property.status);

    return (
      <Link
        href={`/properties/${property._id}`}
        className="group relative flex h-full flex-1 flex-col overflow-hidden bg-white transition-all duration-500 hover:-translate-y-1"
        style={{
          boxShadow: `0 18px 40px -20px ${INK}40`,
          border: `1px solid ${INK_10}`,
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ backgroundColor: INK, color: CREAM }}
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
            {String(index + 1).padStart(2, "0")} / Featured
          </span>
          <Plus
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </div>

        <div className="relative h-36 w-full overflow-hidden md:h-32 lg:h-36 xl:h-40">
          <Image
            src={img}
            alt={property.title || "Property"}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            sizes="260px"
          />

          <button
            onClick={(e) => toggleLike(property._id, e)}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center backdrop-blur-md transition-all hover:scale-110"
            style={{
              backgroundColor: CREAM_TINT,
              border: `1px solid ${INK_20}`,
            }}
            aria-label="Toggle like"
          >
            <Heart
              size={14}
              strokeWidth={2.5}
              className={isLiked ? "fill-red-500 text-red-500" : ""}
              style={!isLiked ? { color: INK } : undefined}
            />
          </button>

          <div
            className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-md"
            style={{ backgroundColor: CREAM_TINT }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: status.dot }}
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: INK }}
            >
              {status.text}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-4 py-3">
          <h3
            className="line-clamp-1 text-base font-bold leading-tight"
            style={{ color: INK }}
          >
            {property.title || "Untitled Property"}
          </h3>

          <div
            className="mt-2 flex items-center gap-1.5"
            style={{ color: DEEP_TEAL }}
          >
            <MapPin size={12} strokeWidth={2.5} className="shrink-0" />
            <span className="line-clamp-1 text-xs font-semibold uppercase tracking-wider">
              {property.location || property.city || "Location"}
            </span>
          </div>
        </div>

        <div
          className="absolute -right-12 bottom-0 flex h-12 w-14 items-center justify-center transition-all duration-500 group-hover:right-0"
          style={{ backgroundColor: TEAL, color: CREAM }}
        >
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </div>
      </Link>
    );
  };

  const CardSkeleton = () => (
    <div
      className="flex h-full flex-1 flex-col overflow-hidden bg-white"
      style={{ border: `1px solid ${INK_10}` }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: INK_05 }}
      >
        <div className="h-3 w-20 rounded" style={{ backgroundColor: INK_10 }} />
        <div className="h-3 w-3 rounded" style={{ backgroundColor: INK_10 }} />
      </div>
      <div
        className="h-36 w-full animate-pulse md:h-32 lg:h-36 xl:h-40"
        style={{ backgroundColor: INK_05 }}
      />
      <div className="flex flex-1 flex-col gap-2 px-4 py-3">
        <div
          className="h-4 w-3/4 animate-pulse rounded"
          style={{ backgroundColor: INK_10 }}
        />
        <div
          className="h-3 w-1/2 animate-pulse rounded"
          style={{ backgroundColor: INK_10 }}
        />
      </div>
    </div>
  );

  const EmptyCard = ({ icon: Icon, label, color }) => (
    <div
      className="flex h-full flex-1 flex-col items-center justify-center gap-3 bg-white px-4"
      style={{ border: `1px solid ${INK_10}` }}
    >
      <Icon size={32} strokeWidth={1.5} style={{ color }} />
      <span
        className="text-center text-sm font-bold uppercase tracking-wider"
        style={{ color: INK }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <>
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

      <section
        className="relative w-full overflow-hidden mt-12 sm:mt-16 md:mt-20 lg:mt-24"
        style={{ backgroundColor: CREAM, color: INK }}
      >
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(to right, ${INK_05} 1px, transparent 1px)`,
            backgroundSize: "calc(100% / 12) 100%",
          }}
        />

        <div className="relative z-20 flex flex-col lg:grid lg:grid-cols-12">
          {/* ================ LEFT : EDITORIAL TEXT ================ */}
          <div className="relative flex flex-1 flex-col justify-between px-6 pb-12 pt-8 sm:px-10 sm:pt-10 md:px-14 lg:col-span-5 lg:px-16 lg:pt-14 lg:pb-12">
            {/* Top meta row */}
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-sm font-bold tracking-[0.2em]"
                style={{ color: TEAL }}
              >
                [ 01 — COLLECTION 2026 ]
              </span>
            </div>

            {/* Main heading block */}
            <div className="mt-10 lg:mt-0">
              <h1 className="font-luxury font-luxury-tracking font-extrabold leading-[0.95]">
                <span
                  className="block text-[52px] sm:text-[68px] md:text-[80px] lg:text-[64px] xl:text-[76px]"
                  style={{ color: INK }}
                >
                  Find Your
                </span>
                <span
                  className="font-luxury-italic block text-[52px] font-medium italic sm:text-[68px] md:text-[80px] lg:text-[64px] xl:text-[76px]"
                  style={{ color: TEAL }}
                >
                  Address.
                </span>
                <span
                  className="mt-3 flex items-baseline gap-4 text-[28px] font-semibold sm:text-[36px] md:text-[42px] lg:text-[32px] xl:text-[40px]"
                  style={{ color: INK_60 }}
                >
                  <span
                    className="inline-block h-px w-16 sm:w-20"
                    style={{ backgroundColor: INK_40 }}
                  />
                  Live the Story.
                </span>
              </h1>

              <p
                className="mt-8 max-w-md text-base font-medium leading-8 sm:text-lg"
                style={{ color: INK_60 }}
              >
                A curated portfolio of architectural homes, urban residences, and
                investment-grade properties — selected for design integrity,
                location, and lasting value.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Link
                href="/properties"
                className="group relative flex items-center justify-between overflow-hidden px-8 py-5 transition-all duration-500"
                style={{ backgroundColor: INK, color: CREAM }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TEAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                <span className="font-luxury-italic relative z-10 text-base font-semibold italic uppercase tracking-[0.15em]">
                  Explore Properties
                </span>
                <ArrowRight
                  size={20}
                  strokeWidth={3}
                  className="relative z-10 ml-8 transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-3 px-2 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-colors"
                style={{ color: INK }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  style={{ backgroundColor: INK_10, color: INK }}
                >
                  <Plus size={18} strokeWidth={3} />
                </span>
                Book Consultation
              </Link>
            </div>

           
        
          </div>

          {/* ================ RIGHT : GALLERY + CARDS ================ */}
          <div className="relative flex flex-1 flex-col lg:col-span-7 lg:border-l" style={{ borderColor: INK_10 }}>
            <div className="absolute left-0 top-0 z-30 hidden h-full w-12 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-8">
              <span
                className="rotate-180 font-mono text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: INK_60, writingMode: "vertical-rl" }}
              >
                Marque / Estate — 2026
              </span>
              <div className="flex flex-col items-center gap-2">
                <span
                  className="font-luxury text-3xl font-extrabold"
                  style={{ color: INK }}
                >
                  {String(currentImageIndex + 1).padStart(2, "0")}
                </span>
                <div
                  className="h-16 w-px"
                  style={{ backgroundColor: INK_40 }}
                />
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: INK_60 }}
                >
                  {String(totalImages).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 px-6 py-6 sm:px-8 sm:py-8 lg:pl-16 lg:pr-10">
              <div
                className="relative aspect-16/10 w-full overflow-hidden sm:aspect-video"
                style={{
                  boxShadow: `0 30px 60px -25px ${INK}40`,
                  border: `1px solid ${INK_10}`,
                }}
              >
                {heroImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 transition-opacity duration-1000 ease-out"
                    style={{ opacity: idx === currentImageIndex ? 1 : 0 }}
                  >
                    <Image
                      src={img}
                      alt={`Featured property ${idx + 1}`}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 56vw"
                    />
                  </div>
                ))}

                <div
                  className="absolute left-4 top-4 flex items-center gap-2 px-3 py-2 backdrop-blur-md sm:left-5 sm:top-5"
                  style={{ backgroundColor: CREAM_TINT }}
                >
                  <MapPin size={14} strokeWidth={2.5} style={{ color: TEAL }} />
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: INK }}
                  >
                    Prime Location
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                  <div
                    className="max-w-[60%] px-4 py-3 backdrop-blur-md"
                    style={{ backgroundColor: `${INK}E6`, color: CREAM }}
                  >
                    <div
                      className="font-mono text-xs font-bold uppercase tracking-[0.3em]"
                      style={{ color: TEAL }}
                    >
                      Featured Collection
                    </div>
                    <div className="font-luxury-italic mt-1.5 text-lg font-semibold italic sm:text-xl">
                      {["The Hillside Residence", "Urban Loft Series", "Glass Pavilion", "Modern Heritage", "Coastal Retreat"][currentImageIndex]}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToSlide(currentImageIndex - 1)}
                      className="flex h-10 w-10 items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                      style={{
                        backgroundColor: CREAM_TINT,
                        color: INK,
                        border: `1px solid ${INK_20}`,
                      }}
                      aria-label="Previous slide"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => goToSlide(currentImageIndex + 1)}
                      className="flex h-10 w-10 items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                      style={{
                        backgroundColor: INK,
                        color: CREAM,
                      }}
                      aria-label="Next slide"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                <div className="absolute right-4 top-4 flex flex-col gap-2 sm:right-5 sm:top-5">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className="h-1 transition-all duration-500"
                      style={{
                        width: idx === currentImageIndex ? 32 : 16,
                        backgroundColor: idx === currentImageIndex ? TEAL : CREAM_TINT,
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                <div className="hidden md:flex md:flex-col md:gap-2">
                  {heroImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className="relative h-16 w-24 overflow-hidden transition-all duration-300"
                      style={{
                        border: `2px solid ${idx === currentImageIndex ? TEAL : "transparent"}`,
                        opacity: idx === currentImageIndex ? 1 : 0.55,
                      }}
                      aria-label={`View slide ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>

                <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4">
                  {propertiesLoading ? (
                    <>
                      <CardSkeleton />
                      <CardSkeleton />
                    </>
                  ) : properties.length > 0 ? (
                    properties.map((p, i) => (
                      <PropertyCard key={p._id} property={p} index={i} />
                    ))
                  ) : (
                    <>
                      <EmptyCard
                        icon={Building2}
                        label="No Properties Available"
                        color={TEAL}
                      />
                      <EmptyCard
                        icon={Plus}
                        label="Featured Coming Soon"
                        color={DEEP_TEAL}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}