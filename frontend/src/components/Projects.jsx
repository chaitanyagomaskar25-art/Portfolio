import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code2,
  Cpu,
  ExternalLink,
  Layers,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PROJECTS } from "../data/portfolio";
import { GitHubIcon } from "./SocialIcon";
import Reveal from "./Reveal";
import { EmTitle } from "./SectionHeading";
import { scrollToId, startScroll, stopScroll } from "../lib/scroll";

// Vector SVG Logos for Project Technology Badges
function ProjectTechIcon({ name, className = "h-3 w-3" }) {
  const n = (name || "").toLowerCase().replace(/[\s\.\-_]/g, "");

  if (n.includes("python")) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-label="Python">
        <path fill="#3776AB" d="M11.9 2c-4 0-3.8 1.7-3.8 1.7v1.8h3.9v.6H6.4S4 5.8 4 9.9c0 4.1 2.1 4 2.1 4h1.2v-1.7s-.1-2 2-2h3.9s1.9 0 1.9-1.9V4.1S15.4 2 11.9 2zm-1.1 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" />
        <path fill="#FFD43B" d="M12.1 22c4 0 3.8-1.7 3.8-1.7v-1.8h-3.9v-.6h5.6s2.4.3 2.4-3.8c0-4.1-2.1-4-2.1-4h-1.2v1.7s.1 2-2 2H10.8s-1.9 0-1.9 1.9v2.1s-.3 2.2 3.2 2.2zm1.1-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
      </svg>
    );
  }
  if (n.includes("fastapi")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="FastAPI">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" fill="#009688" />
        <path d="M13 7L8.5 12.5H12V17l4.5-5.5H13V7z" fill="#FFF" />
      </svg>
    );
  }
  if (n.includes("streamlit")) {
    return (
      <svg viewBox="0 0 24 24" fill="#FF4B4B" className={className} aria-label="Streamlit">
        <path d="M8.7 13.4l-4.4 2.8 1.7 3.8 6.4-1.2-3.7-5.4zm3.6-7.4l-3.3 5.4 3.7 5.4 6.7-1.3-7.1-9.5zm-5 4.3l-3.3 2.1.8 1.7 4.1-1.4-1.6-2.4zm10.7 4.9l-5.6 1.1 2.3 3.3 5.3-1.6-2-2.8z" />
      </svg>
    );
  }
  if (n.includes("numpy")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="NumPy">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#013243" stroke="#38BDF8" strokeWidth="1.2" />
        <path d="M12 2v10l9-5M12 12l-9-5M12 12v10" stroke="#38BDF8" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="2" fill="#38BDF8" />
      </svg>
    );
  }
  if (n.includes("pandas")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Pandas">
        <rect x="3" y="4" width="4" height="16" rx="1.5" fill="#E70488" />
        <rect x="10" y="8" width="4" height="12" rx="1.5" fill="#FFD43B" />
        <rect x="17" y="2" width="4" height="18" rx="1.5" fill="#150458" stroke="#38BDF8" strokeWidth="1" />
      </svg>
    );
  }
  if (n.includes("reactnative")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="React Native">
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="#61DAFB" strokeWidth="1.5" fill="#070D18" />
        <circle cx="12" cy="11.5" r="1.4" fill="#61DAFB" />
      </svg>
    );
  }
  if (n.includes("react")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="React.js">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
      </svg>
    );
  }
  if (n.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" fill="#38BDF8" className={className} aria-label="Tailwind CSS">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }
  if (n.includes("framer") || n.includes("motion")) {
    return (
      <svg viewBox="0 0 24 24" fill="#A855F7" className={className} aria-label="Framer Motion">
        <path d="M4 2h16v7h-8L4 2zm0 7h8v7H4V9zm8 7h8l-8 7v-7z" />
      </svg>
    );
  }
  if (n.includes("node")) {
    return (
      <svg viewBox="0 0 24 24" fill="#22C55E" className={className} aria-label="Node.js">
        <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4zm-1 3.5h2v8.4h-2V7.8z" />
      </svg>
    );
  }
  if (n.includes("express")) {
    return (
      <svg viewBox="0 0 24 24" fill="#F1F5F9" className={className} aria-label="Express.js">
        <path d="M14.7 6.4c-1.4 0-2.4.7-3.1 1.7-.6-1-1.7-1.7-3.1-1.7-2.1 0-3.8 1.7-3.8 4s1.7 4 3.8 4c1.4 0 2.5-.7 3.1-1.7.6 1 1.7 1.7 3.1 1.7 2.1 0 3.8-1.7 3.8-4s-1.7-4-3.8-4zm-6.2 6.2c-1.2 0-2-.9-2-2.2s.8-2.2 2-2.2 2 .9 2 2.2-.8 2.2-2 2.2zm6.2 0c-1.2 0-2-.9-2-2.2s.8-2.2 2-2.2 2 .9 2 2.2-.8 2.2-2 2.2zM21 7l-2.5 3.5L21 14h-2l-1.5-2.2-1.5 2.2h-2l2.5-3.5L14 7h2l1.5 2.2L19 7h2z" />
      </svg>
    );
  }
  if (n.includes("socket")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Socket.IO">
        <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="1.5" fill="#1C1917" />
        <path d="M13.5 6L8 13.5h4L10.5 18 16 10.5h-4L13.5 6z" fill="#F59E0B" />
      </svg>
    );
  }
  if (n.includes("mongo")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="MongoDB">
        <path d="M12 2C11.5 5 8 9 8 13.5c0 3 2 5.5 4 6.5 2-1 4-3.5 4-6.5C16 9 12.5 5 12 2z" fill="#10B981" />
        <path d="M12 2v18c.2-.1.4-.2.6-.3 1.8-.9 3.4-3.2 3.4-6.2 0-4.5-3.5-8.5-4-11.5z" fill="#059669" />
        <path d="M12 18.5v3.5c0 .6-.4 1-.9 1-.4 0-.8-.3-.9-.8L12 18.5z" fill="#34D399" />
      </svg>
    );
  }
  if (n.includes("tanstack") || n.includes("query")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="TanStack Query">
        <circle cx="12" cy="12" r="9" stroke="#FF4154" strokeWidth="1.8" fill="#18181B" />
        <circle cx="12" cy="12" r="5" stroke="#F59E0B" strokeWidth="1.6" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="2" fill="#E11D48" />
      </svg>
    );
  }
  if (n.includes("javascript") || n === "js") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-label="JavaScript">
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path fill="#000" d="M12.5 17.5c.5.8 1.2 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.5 0-1.8 1.4-3.1 3.5-3.1 1.5 0 2.6.5 3.3 1.8l-1.6 1c-.4-.7-.8-1-1.7-1-.8 0-1.3.5-1.3 1.1 0 .7.5 1 1.6 1.4l.6.2c2 .9 3 1.7 3 3.6 0 2.1-1.6 3.3-3.8 3.3-2.1 0-3.4-1-4-2.2l1.7-1zm-6 .2c.3.5.7.9 1.4.9.7 0 1.2-.3 1.2-1.4V9.5h2.1v7.6c0 2.2-1.3 3.2-3.2 3.2-1.7 0-2.7-.9-3.2-2l1.7-1z" />
      </svg>
    );
  }

  return <Code2 className={className} />;
}

// Accent glow & styling configurations for 3D cards
const CARD_ACCENTS = {
  emerald: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.16)",
    glowRgb: "16, 185, 129",
    borderHover: "hover:border-emerald-400/40",
    badgeHover: "hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300",
    buttonPrimary:
      "bg-emerald-500 hover:bg-emerald-400 text-[#04110B] shadow-[0_4px_20px_-4px_rgba(16,185,129,0.5)]",
  },
  blue: {
    dot: "bg-blue-400",
    text: "text-blue-400",
    glow: "rgba(59, 130, 246, 0.16)",
    glowRgb: "59, 130, 246",
    borderHover: "hover:border-blue-400/40",
    badgeHover: "hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-300",
    buttonPrimary:
      "bg-blue-500 hover:bg-blue-400 text-white shadow-[0_4px_20px_-4px_rgba(59,130,246,0.5)]",
  },
  teal: {
    dot: "bg-teal-400",
    text: "text-teal-400",
    glow: "rgba(20, 184, 166, 0.16)",
    glowRgb: "20, 184, 166",
    borderHover: "hover:border-teal-400/40",
    badgeHover: "hover:border-teal-400/40 hover:bg-teal-400/10 hover:text-teal-300",
    buttonPrimary:
      "bg-teal-500 hover:bg-teal-400 text-[#04110B] shadow-[0_4px_20px_-4px_rgba(20,184,166,0.5)]",
  },
  purple: {
    dot: "bg-purple-400",
    text: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.16)",
    glowRgb: "168, 85, 247",
    borderHover: "hover:border-purple-400/40",
    badgeHover: "hover:border-purple-400/40 hover:bg-purple-400/10 hover:text-purple-300",
    buttonPrimary:
      "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_4px_20px_-4px_rgba(168,85,247,0.5)]",
  },
};

// Compact & Elegant Modal for Full Project Case Study Details
function ProjectDetailsModal({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    stopScroll();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      startScroll();
    };
  }, [onClose]);

  if (!project) return null;
  const accent = CARD_ACCENTS[project.accent] || CARD_ACCENTS.emerald;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3.5 sm:p-6 pt-[86px] sm:pt-24 pb-4 sm:pb-8"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        onWheel={(e) => e.stopPropagation()}
        className="fixed inset-0 bg-[#04060A]/85 backdrop-blur-md"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex max-h-[calc(100dvh-6.5rem)] sm:max-h-[calc(100dvh-7.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#0E131E]/95 px-5 sm:px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">
              {project.category}
            </span>
            {project.inProgress && (
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-amber-300 font-semibold">
                ● In Progress
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div data-lenis-prevent="true" className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-6 space-y-6 text-slate-300">
          <div>
            <h3 id="modal-project-title" className="font-display text-2xl font-bold text-slate-50 sm:text-3xl">
              {project.title}
            </h3>
            <p className={`mt-1 font-mono text-xs uppercase tracking-wider ${accent.text} font-medium`}>
              {project.tagline}
            </p>
          </div>

          {/* Project Screenshot Preview in Modal */}
          {project.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-[#070A11] shadow-xl">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F17]/70 via-transparent to-transparent" />
            </div>
          )}

          <div>
            <p className="text-sm leading-relaxed text-slate-300">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Metrics Grid */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
              {project.stats.map((stat, i) => (
                <div key={i}>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 font-display text-sm font-bold text-slate-100">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Key Contributions */}
          {project.myContribution && (
            <div>
              <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" /> Key Engineering Features & Architecture
              </h4>
              <div className="space-y-2">
                {project.myContribution.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Features */}
          {project.features && (
            <div>
              <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                <Layers className="h-3.5 w-3.5 text-emerald-400" /> Platform Highlights
              </h4>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((feat, i) => (
                  <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <h5 className="font-display text-xs font-bold text-slate-200">
                      {feat.title}
                    </h5>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-slate-400">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Technology Stack */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
              Complete Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-300"
                >
                  <ProjectTechIcon name={t} className="h-3.5 w-3.5 shrink-0" />
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-white/[0.08] bg-[#0E131E]/95 px-5 sm:px-6 py-3.5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => toast.success("Opening GitHub repository...")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-display text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:text-white"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => toast.success("Opening Live Application...")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-display text-xs font-semibold ${accent.buttonPrimary}`}
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-mono text-xs text-amber-300 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              In Active Development
            </span>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

// Modern 3D Tilted Project Card with layered depth and mouse-tracking perspective
function Modern3DTiltedCard({ project, onOpenDetails, isTouchDevice }) {
  const accent = CARD_ACCENTS[project.accent] || CARD_ACCENTS.emerald;
  const visibleTech = project.tech ? project.tech.slice(0, 4) : [];
  const extraTechCount = project.tech && project.tech.length > 4 ? project.tech.length - 4 : 0;

  // Spring physics configuration for silky smooth perspective and transitions
  const springConfig = { damping: 26, stiffness: 220, mass: 0.6 };

  // Normalized mouse coordinates: [0, 1] with center at 0.5
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  // Dynamic 3D tilt rotations for desktop
  const dynamicRotateX = useSpring(useTransform(mouseY, [0, 1], [6.5, -6.5]), springConfig);
  const dynamicRotateY = useSpring(useTransform(mouseX, [0, 1], [-6.5, 6.5]), springConfig);

  // Smooth hover lift (elevation) and scale springs
  const liftY = useSpring(useTransform(isHovered, [0, 1], [0, -7]), springConfig);
  const cardScale = useSpring(useTransform(isHovered, [0, 1], [1, 1.015]), springConfig);

  // Dynamic cursor-following glare spotlight
  const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);
  const glareOpacity = useSpring(useTransform(isHovered, [0, 1], [0, 1]), springConfig);
  const glareBg = useMotionTemplate`radial-gradient(380px circle at ${glareX}% ${glareY}%, ${accent.glow}, transparent 70%)`;

  const handleMouseMove = (e) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    isHovered.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Determine active 3D transform properties
  const cardStyle = isTouchDevice
    ? {
        transformPerspective: 1200,
        rotateX: 3.5,
        rotateY: -3,
        rotateZ: -0.5,
        transformStyle: "preserve-3d",
      }
    : {
        transformPerspective: 1200,
        rotateX: dynamicRotateX,
        rotateY: dynamicRotateY,
        y: liftY,
        scale: cardScale,
        transformStyle: "preserve-3d",
      };

  return (
    <div className="h-full w-full [perspective:1200px]">
      <motion.article
        data-testid={`project-card-${project.id}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={cardStyle}
        className={`group relative flex flex-col justify-between h-full rounded-2xl border border-white/[0.08] bg-[#0B0F17]/85 p-4 sm:p-5 backdrop-blur-md transition-colors duration-300 ${accent.borderHover} overflow-hidden shadow-[0_12px_28px_-8px_rgba(0,0,0,0.7),0_4px_12px_-2px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.95),0_12px_24px_-6px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.18)]`}
      >
        {/* Dynamic / Static Ambient Card Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl transition-opacity duration-300"
          style={
            isTouchDevice
              ? {
                  background: `radial-gradient(400px circle at 85% 15%, ${accent.glow}, transparent 70%)`,
                  opacity: 0.7,
                }
              : {
                  background: glareBg,
                  opacity: glareOpacity,
                }
          }
          aria-hidden="true"
        />

        {/* Top subtle hairline highlight reflecting 3D light */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transition-colors group-hover:via-white/35"
          aria-hidden="true"
        />

        {/* Layer 1: Thumbnail & Header with 3D Depth */}
        <div className="[transform-style:preserve-3d]">
          {/* Micro Browser Window Thumbnail with subtle forward 3D layer pop */}
          <div
            onClick={() => onOpenDetails(project)}
            style={{ transform: "translateZ(18px)" }}
            className="group/thumb relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#070A0F] cursor-pointer shadow-inner transition-transform duration-300"
          >
            {/* Micro Window Top Bar */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[#0A0E17]/90 px-3 py-1.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
              </div>

              <div className="font-mono text-[9.5px] text-slate-400 tracking-wider truncate max-w-[140px]">
                {project.urlPreview || "application.dev"}
              </div>

              {project.inProgress ? (
                <div className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-amber-300 font-semibold">
                    In Progress
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${accent.dot} opacity-75`} />
                    <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                    {project.statusBadge || "Live"}
                  </span>
                </div>
              )}
            </div>

            {/* Project screenshot with smooth zoom on hover */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-top pt-8 opacity-90 transition-all duration-500 ease-out group-hover/thumb:scale-105 group-hover/thumb:opacity-100 group-hover/thumb:brightness-105"
            />

            {/* Bottom vignette shade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-75" />

            {/* Floating Overview Pill on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/thumb:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0B0F17]/90 px-3.5 py-1.5 font-display text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-transform duration-200 group-hover/thumb:scale-105">
                <span>View Details</span>
                <ArrowUpRight className={`h-3.5 w-3.5 ${accent.text} transition-transform duration-200 group-hover/thumb:translate-x-0.5 group-hover/thumb:-translate-y-0.5`} />
              </span>
            </div>
          </div>

          {/* Title & Metadata with 3D Depth */}
          <div
            style={{ transform: "translateZ(14px)" }}
            className="mt-4 flex items-start justify-between gap-3 transition-transform duration-300"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-slate-500">
                  {project.number || "01"}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className={`font-mono text-[10px] uppercase tracking-[0.22em] font-semibold ${accent.text}`}>
                  {project.category}
                </span>
              </div>
              <h3
                onClick={() => onOpenDetails(project)}
                className="mt-1 font-display text-lg sm:text-[19px] font-bold tracking-tight text-slate-100 transition-colors group-hover:text-white cursor-pointer truncate"
              >
                {project.title}{" "}
                <em className="text-gradient pr-1 font-serif font-normal italic text-sm">
                  {project.titleEm}
                </em>
              </h3>
            </div>

            {/* Interactive GitHub and Live Demo Action Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pt-1">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.success("Opening repository...");
                }}
                data-testid={`project-github-${project.id}`}
                aria-label={`GitHub source for ${project.title}`}
                title="GitHub Repository"
                className="group/btn relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.09] hover:text-white hover:scale-105 active:scale-95"
              >
                <GitHubIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-110" />
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success("Opening live demo...");
                  }}
                  data-testid={`project-demo-${project.id}`}
                  aria-label={`Live demo for ${project.title}`}
                  title="Live Demo"
                  className={`group/btn relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-200 ${accent.badgeHover} hover:scale-105 active:scale-95`}
                >
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Short 2–3 Line Description */}
          <p
            style={{ transform: "translateZ(10px)" }}
            className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2 sm:text-[13px] transition-transform duration-300"
          >
            {project.description}
          </p>
        </div>

        {/* Layer 2: Card Footer with Animated Tech Badges & Details Action */}
        <div
          style={{ transform: "translateZ(16px)" }}
          className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between gap-2 transition-transform duration-300"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleTech.map((t) => (
              <motion.span
                key={t}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-slate-300 transition-all duration-200 cursor-default ${accent.badgeHover}`}
              >
                <ProjectTechIcon name={t} className="h-3 w-3 shrink-0" />
                <span>{t}</span>
              </motion.span>
            ))}
            {extraTechCount > 0 && (
              <button
                type="button"
                onClick={() => onOpenDetails(project)}
                className="font-mono text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                +{extraTechCount}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            data-testid={`project-details-${project.id}`}
            className={`group/details shrink-0 font-mono text-[11px] uppercase tracking-wider text-slate-400 transition-colors ${accent.text} flex items-center gap-1 hover:text-white`}
          >
            <span>Details</span>
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5" />
          </button>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  // Responsive items-per-page calculation:
  // Large desktop (>= 1024px): 3 project cards
  // Tablet (>= 768px): 2 project cards
  // Mobile (< 768px): 1 project card
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const nextItems = getItemsPerPage();
      setItemsPerPage(nextItems);
      // Ensure currentIndex remains valid within new page count
      setCurrentIndex((prev) => {
        const total = filteredProjects.length;
        const totalP = Math.max(1, Math.ceil(total / nextItems));
        return Math.min(prev, totalP - 1);
      });
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect touch / coarse pointer devices for static tilted appearance
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

  // Professional project category filters with counts
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend / Python" },
    { id: "realtime", label: "Real-Time" },
    { id: "hackathon", label: "Hackathon" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    return p.filterCategories?.includes(filter);
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));

  // Reset to first page when filter changes
  const handleFilterChange = (catId) => {
    setFilter(catId);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePageSelect = (pageIndex) => {
    if (pageIndex !== currentIndex) {
      setDirection(pageIndex > currentIndex ? 1 : -1);
      setCurrentIndex(pageIndex);
    }
  };

  const startIndex = currentIndex * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    }),
  };

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative border-t border-white/[0.04] py-20 sm:py-24 overflow-hidden"
    >
      {/* Subtle Ambient Background Gradient Lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 -left-40 h-[450px] w-[450px] rounded-full bg-emerald-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 h-[450px] w-[450px] rounded-full bg-blue-500/[0.04] blur-[140px]" />
        <div className="absolute inset-0 grid-lines opacity-25 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Clean, Modern Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-400 to-blue-400" aria-hidden="true" />
              02 — Projects
            </p>
            <EmTitle text="Featured *projects* & platforms." className="mt-3 text-3xl sm:text-4xl lg:text-[44px]" />
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              A showcase of full-stack web applications, real-time communication platforms, frontend interfaces, and Python data analytics services.
            </p>
          </Reveal>

          {/* Modern Pill Filter Tabs & Navigation Arrows Header Controls - Fully Responsive */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full lg:w-auto">
            <Reveal delay={0.08} className="w-full sm:w-auto">
              <div className="project-filter-outer relative -mx-5 px-5 sm:mx-0 sm:px-0">
                <div
                  className="project-filter-wrapper flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth rounded-2xl sm:rounded-full border border-white/[0.08] bg-[#0A0F1A]/85 p-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl max-w-full"
                  role="tablist"
                  aria-label="Project category filters"
                >
                  {categories.map((cat) => {
                    const isActive = filter === cat.id;
                    const catCount =
                      cat.id === "all"
                        ? PROJECTS.length
                        : PROJECTS.filter((p) => p.filterCategories?.includes(cat.id)).length;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleFilterChange(cat.id)}
                        role="tab"
                        aria-selected={isActive}
                        data-testid={`project-filter-${cat.id}`}
                        className={`project-filter-btn relative flex shrink-0 items-center gap-2 rounded-xl sm:rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 select-none ${
                          isActive
                            ? "text-emerald-300 font-bold project-active-tab"
                            : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeFilterPill"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="project-active-tab-indicator absolute inset-0 rounded-xl sm:rounded-full border border-emerald-400/50 bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-teal-500/20 shadow-[0_0_18px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]"
                          />
                        )}
                        <span className="relative z-10">{cat.label}</span>
                        <span
                          className={`relative z-10 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 font-mono text-[9.5px] font-semibold transition-colors ${
                            isActive
                              ? "bg-emerald-400/25 text-emerald-200 border border-emerald-400/40"
                              : "bg-white/[0.05] text-slate-400 border border-white/[0.06]"
                          }`}
                        >
                          {catCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Navigation Arrow Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous projects"
                  data-testid="projects-prev-desktop"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0A0F1A]/85 text-slate-300 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/15 disabled:hover:bg-[#0A0F1A]/85 disabled:hover:text-slate-300 active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1 px-1 font-mono text-xs text-slate-400 select-none">
                  <span className="font-semibold text-emerald-400">{currentIndex + 1}</span>
                  <span className="opacity-40">/</span>
                  <span>{totalPages}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === totalPages - 1}
                  aria-label="Next projects"
                  data-testid="projects-next-desktop"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0A0F1A]/85 text-slate-300 shadow-sm backdrop-blur-xl transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:border-white/15 disabled:hover:bg-[#0A0F1A]/85 disabled:hover:text-slate-300 active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Interactive Project Carousel Container */}
        <div className="relative mt-12 overflow-hidden min-h-[580px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${filter}-${currentIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
            >
              {currentProjects.map((project) => (
                <div key={project.id} className="h-full">
                  <Modern3DTiltedCard
                    project={project}
                    onOpenDetails={setActiveProject}
                    isTouchDevice={isTouchDevice}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Indicators & Progress Counter */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Group info counter */}
            <div className="font-mono text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-emerald-400">
                {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredProjects.length)}
              </span>{" "}
              of <span className="font-semibold text-slate-200">{filteredProjects.length}</span> projects
            </div>

            {/* Pagination Bullet Indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Project groups">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePageSelect(idx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to project group ${idx + 1}`}
                    data-testid={`projects-page-indicator-${idx}`}
                    className={`relative h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-8 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                        : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailsModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
