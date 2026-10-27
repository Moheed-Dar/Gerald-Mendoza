import Link from "next/link";
import LoginForm from "@/app/admin/login/LoginForm";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Admin Login",
  description: "Login to admin panel",
};

export default function AdminLoginPage() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-[#150A2B] overflow-hidden">
      {/* ===== BACKGROUND GRID ===== */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(92,225,230,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(92,225,230,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* ===== NOISE OVERLAY ===== */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ===== LOGO WATERMARK ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/images/logo12.png"
          alt="Logo Watermark"
          width={400}
          height={400}
          style={{ width: "auto", height: "auto" }}
          className="w-125 h-125 sm:w-150 sm:h-150 object-contain opacity-[0.25] animate-pulse"
        />
      </div>

      {/* ===== AMBIENT GLOWS ===== */}
      {/* Top Glow - Magenta */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#B462B6]/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Bottom Glow - Pink */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-62.5 bg-[#FFA7E4]/12 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Side accent glow - Cyan */}
      <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-80 h-80 bg-[#5CE1E6]/8 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* ===== BACK TO HOME ===== */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 group flex items-center gap-2 text-[#5CE1E6]/70 hover:text-[#5CE1E6] text-sm font-medium transition-all bg-[#5CE1E6]/5 hover:bg-[#5CE1E6]/10 px-4 py-2.5 rounded-xl border border-[#5CE1E6]/15 hover:border-[#5CE1E6]/40 backdrop-blur-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:-translate-x-0.5"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* ===== FORM CONTAINER ===== */}
      <div className="relative z-10 w-full max-w-105 mx-4">
        {/* Gradient border wrapper */}
        <div className="relative rounded-2xl p-px bg-linear-to-br from-[#5CE1E6]/30 via-[#B462B6]/20 to-[#FFA7E4]/30">
          <div className="rounded-2xl bg-[#150A2B]/80 backdrop-blur-xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}