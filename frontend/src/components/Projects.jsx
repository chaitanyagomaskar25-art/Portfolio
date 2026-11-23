import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
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
import { startScroll, stopScroll } from "../lib/scroll";

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
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
        className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0E131E]/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/25 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div data-lenis-prevent="true" className="overflow-y-auto px-6 py-6 space-y-6 text-slate-300">
          <div>
            <h3 id="modal-project-title" className="font-display text-2xl font-bold text-slate-50 sm:text-3xl">
              {project.title}
            </h3>
            <p className={`mt-1 font-mono text-xs uppercase tracking-wider ${accent.text} font-medium`}>
              {project.tagline}
            </p>
            <p className="mt-3.5 text-sm leading-relaxed text-slate-300">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Metrics Grid */}
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

          {/* Key Contributions */}
          {project.myContribution && (
            <div>
              <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" /> Architectural Contribution & Role
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
                <Layers className="h-3.5 w-3.5 text-emerald-400" /> Core System Features
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
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/[0.08] bg-[#0E131E]/90 px-6 py-3.5">
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
        </div>
      </motion.div>
    </div>
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
  // On mobile/touch: apply a subtle static perspective tilt (rotateX: 3.5deg, rotateY: -3deg, rotateZ: -0.5deg)
  // On desktop: dynamic spring values following mouse position with hover lift
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

              <div className="font-mono text-[9.5px] text-slate-400 tracking-wider">
                {project.urlPreview || "system.dev"}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${accent.dot} opacity-75`} />
                  <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                  {project.statusBadge || "Live"}
                </span>
              </div>
            </div>

            {/* Project screenshot with smooth zoom on hover */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-center pt-6 opacity-85 transition-all duration-500 ease-out group-hover/thumb:scale-105 group-hover/thumb:opacity-100 group-hover/thumb:brightness-105"
            />

            {/* Bottom vignette shade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-75" />

            {/* Floating Overview Pill on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/thumb:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0B0F17]/90 px-3.5 py-1.5 font-display text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-transform duration-200 group-hover/thumb:scale-105">
                <span>Overview</span>
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
            </div>
          </div>

          {/* Short 1–2 Line Description */}
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
                className={`inline-flex items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-slate-300 transition-all duration-200 cursor-default ${accent.badgeHover}`}
              >
                <span className={`h-1 w-1 rounded-full ${accent.dot}`} />
                {t}
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

  const categories = [
    { id: "all", label: "All" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "backend", label: "Backend" },
    { id: "cloud", label: "Cloud" },
    { id: "ai", label: "AI" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    return p.filterCategories?.includes(filter);
  });

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
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-400 to-blue-400" aria-hidden="true" />
              02 — Projects
            </p>
            <EmTitle text="Featured *projects* & platforms." className="mt-3 text-3xl sm:text-4xl lg:text-[44px]" />
            <p className="mt-2 text-sm text-slate-400 max-w-lg">
              A curated selection of production distributed systems, developer tools, and full-stack software.
            </p>
          </Reveal>

          {/* Modern Pill Filter Tabs */}
          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 backdrop-blur-md">
              {categories.map((cat) => {
                const isActive = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    data-testid={`project-filter-${cat.id}`}
                    className={`relative rounded-full px-3.5 py-1 font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                      isActive ? "text-emerald-300 font-semibold" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                        className="absolute inset-0 rounded-full border border-emerald-400/40 bg-emerald-400/15 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Responsive 3-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <Modern3DTiltedCard
                  project={project}
                  onOpenDetails={setActiveProject}
                  isTouchDevice={isTouchDevice}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
