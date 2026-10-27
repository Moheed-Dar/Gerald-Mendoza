"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ============================================
// Hydration-safe dynamic imports
// ============================================
// Hero / About / Testimonials all use <style jsx global> which generates
// different styled-jsx class hashes between server and client renders.
// Loading them with ssr:false skips server-side rendering entirely so
// there is nothing for the client to mismatch against.
const Hero = dynamic(() => import("@/app/(site)/components/Hero"), { ssr: false });
const About = dynamic(() => import("@/app/(site)/about/page"), { ssr: false });
const Testimonials = dynamic(() => import("@/app/(site)/testimonials/page"), { ssr: false });

// Lightweight placeholders shown until client mount (prevents layout shift flash)
const Block = () => (
  <div style={{ minHeight: "60vh", backgroundColor: "#F7F7F7" }} aria-hidden="true" />
);

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {!mounted ? (
        <>
          <Block />
          <Block />
          <Block />
        </>
      ) : (
        <>
          <Hero />
          <About />
          <Testimonials />
        </>
      )}
    </>
  );
}