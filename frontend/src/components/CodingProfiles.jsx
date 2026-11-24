import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Code, Terminal } from "lucide-react";
import { CODING_PROFILES } from "../data/portfolio";
import Reveal from "./Reveal";
import { EmTitle } from "./SectionHeading";

// Official Platform SVG Vector Logos
export function LeetCodeLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="LeetCode" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116" />
    </svg>
  );
}

export function CodeChefLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="CodeChef" fill="currentColor">
      {/* CodeChef Chef Hat & Face Vector Representation */}
      <path d="M12 2C9.5 2 7.5 3.5 7 5.5c-1.8.3-3 1.8-3 3.5 0 1.2.6 2.2 1.5 2.8C5.2 12.4 5 13.2 5 14c0 3.9 3.1 7 7 7s7-3.1 7-7c0-.8-.2-1.6-.5-2.2.9-.6 1.5-1.6 1.5-2.8 0-1.7-1.2-3.2-3-3.5C16.5 3.5 14.5 2 12 2zm-2.5 10c.8 0 1.5.7 1.5 1.5S10.3 15 9.5 15 8 14.3 8 13.5 8.7 12 9.5 12zm5 0c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm-5 4.5h5c-.3 1.2-1.3 2-2.5 2s-2.2-.8-2.5-2z" fill="#9A6136" />
      <path d="M7.5 7c.3-1.4 1.8-2.5 3.5-2.5h2c1.7 0 3.2 1.1 3.5 2.5H7.5z" fill="#D4A373" />
    </svg>
  );
}

export function GitHubOfficialLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-white dark:fill-white text-white`} aria-label="GitHub">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedInOfficialLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="#0A66C2" className={className} aria-label="LinkedIn">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function HackerRankOfficialLogo({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="HackerRank" fill="currentColor">
      {/* Official HackerRank 'H' polygon logo mark */}
      <path
        d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm3.87 14.862c0 .245-.198.444-.444.444h-1.57a.444.444 0 0 1-.444-.444v-2.22h-2.824v2.22a.444.444 0 0 1-.444.444H8.574a.444.444 0 0 1-.444-.444V9.138c0-.245.198-.444.444-.444h1.57c.245 0 .444.198.444.444v2.22h2.824v-2.22c0-.245.198-.444.444-.444h1.57c.245 0 .444.198.444.444v5.724z"
        fill="#00EA64"
      />
    </svg>
  );
}

const PROFILE_LOGOS = {
  leetcode: LeetCodeLogo,
  codechef: CodeChefLogo,
  github: GitHubOfficialLogo,
  linkedin: LinkedInOfficialLogo,
  hackerrank: HackerRankOfficialLogo,
};

// 3D Interactive Profile Card
function ProfileCard({ profile, index, isTouchDevice }) {
  const cardRef = useRef(null);
  const Logo = PROFILE_LOGOS[profile.id] || Code;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    damping: 24,
    stiffness: 220,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    damping: 24,
    stiffness: 220,
  });

  const glareBg = useMotionTemplate`radial-gradient(380px circle at ${useTransform(
    mouseX,
    [0, 1],
    [0, 100]
  )}% ${useTransform(mouseY, [0, 1], [0, 100])}%, ${profile.glow}, transparent 75%)`;

  const onMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={
        isTouchDevice
          ? {}
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            }
      }
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070B12]/85 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.9)] cursor-pointer select-none"
      onClick={() => window.open(profile.url, "_blank", "noopener,noreferrer")}
      data-testid={`coding-profile-card-${profile.id}`}
    >
      {/* Glare and Ambient Light Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isTouchDevice
            ? `radial-gradient(350px circle at 80% 20%, ${profile.glow}, transparent 75%)`
            : glareBg,
        }}
        aria-hidden="true"
      />

      {/* Top subtle highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-colors group-hover:via-white/40"
        aria-hidden="true"
      />

      <div style={isTouchDevice ? {} : { transform: "translateZ(16px)" }}>
        {/* Header: Logo, Platform & Badge */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3 border-b border-white/[0.06] pb-3.5 sm:pb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0B0F17] p-2 sm:p-2.5 shadow-md transition-transform duration-300 group-hover:scale-110"
              style={{
                boxShadow: `0 8px 24px -6px ${profile.glow}`,
              }}
            >
              <Logo className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] font-semibold text-slate-400">
                  {profile.tag}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20 hidden sm:inline-block" />
                <span
                  style={{ color: profile.color }}
                  className="font-mono text-[9.5px] uppercase tracking-wider font-bold truncate max-w-[130px] sm:max-w-none"
                >
                  {profile.category}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-white truncate">
                {profile.name}
              </h3>
            </div>
          </div>

          <span
            className="rounded-full border border-white/10 bg-white/[0.03] px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[9px] uppercase tracking-wider text-slate-300 font-medium shrink-0"
            style={{ borderColor: `${profile.color}40`, color: profile.color }}
          >
            {profile.badge}
          </span>
        </div>

        {/* Headline */}
        <p className="mt-3.5 sm:mt-4 font-display text-xs sm:text-sm font-semibold text-slate-200 line-clamp-2">
          {profile.headline}
        </p>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-400 line-clamp-3">
          {profile.description}
        </p>

        {/* Platform Info Pills */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] p-2 sm:p-2.5">
          {profile.stats.map((s, i) => (
            <div key={i} className="min-w-0">
              <p className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider text-slate-500 truncate">
                {s.label}
              </p>
              <p className="font-display text-xs font-semibold text-slate-200 truncate mt-0.5">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div
        style={isTouchDevice ? {} : { transform: "translateZ(18px)" }}
        className="mt-5 sm:mt-6 flex items-center justify-between border-t border-white/[0.06] pt-3.5 sm:pt-4"
      >
        <span className="font-mono text-[10.5px] sm:text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors truncate max-w-[120px] sm:max-w-[140px]">
          @{profile.username}
        </span>

        <span
          className="inline-flex items-center gap-1 sm:gap-1.5 font-display text-xs font-semibold transition-colors duration-200 shrink-0"
          style={{ color: profile.color }}
        >
          <span>Explore Profile</span>
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.div>
  );
}

export default function CodingProfiles() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const checkTouch = () => {
      setIsTouchDevice(
        mq.matches ||
          "ontouchstart" in window ||
          (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
      );
    };
    checkTouch();
    if (mq.addEventListener) {
      mq.addEventListener("change", checkTouch);
      return () => mq.removeEventListener("change", checkTouch);
    }
  }, []);

  return (
    <section
      id="coding-profiles"
      data-testid="coding-profiles-section"
      className="relative border-t border-white/[0.04] py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Ambient background atmosphere glow matching Skills / Experience */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-blue-500/[0.04] blur-[150px]" />
        <div className="absolute inset-0 grid-lines opacity-20 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-400 to-amber-400" aria-hidden="true" />
              04 — Coding & Profiles
            </p>
            <EmTitle
              text="Beyond the *code*."
              className="mt-3 text-3xl sm:text-4xl lg:text-[44px]"
            />
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Explore my coding journey, algorithmic problem-solving profiles, production repositories, and professional network.
            </p>
          </Reveal>

          {/* Interactive Code Bracket Badge */}
          <Reveal delay={0.08}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 sm:px-4 sm:py-2 font-mono text-xs text-slate-300 backdrop-blur-md">
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">{`<dev />`}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">5 Platforms</span>
            </div>
          </Reveal>
        </div>

        {/* 5-Card Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CODING_PROFILES.map((profile, index) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              index={index}
              isTouchDevice={isTouchDevice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
