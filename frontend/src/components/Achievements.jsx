import { useRef } from "react";
import { ArrowUpRight, Award, Calendar, Check, ExternalLink, Medal, Star, Trophy } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionShell from "./SectionShell";
import Reveal from "./Reveal";
import { ACHIEVEMENTS } from "../data/portfolio";

const ICONS = {
  award: Award,
  medal: Medal,
  star: Star,
  trophy: Trophy,
};

function AchievementTimelineCard({ item, index }) {
  const cardRef = useRef(null);
  const Icon = ICONS[item.icon] || Award;
  const isCurrent = !item.certificateUrl;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 24, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), springConfig);

  const glowColor = item.certificateUrl ? "rgba(16, 185, 129, 0.16)" : "rgba(59, 130, 246, 0.14)";

  const glareBg = useMotionTemplate`radial-gradient(380px circle at ${useTransform(
    mouseX,
    [0, 1],
    [0, 100]
  )}% ${useTransform(mouseY, [0, 1], [0, 100])}%, ${glowColor}, transparent 70%)`;

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const CardWrapper = item.certificateUrl ? "a" : "div";
  const wrapperProps = item.certificateUrl
    ? {
        href: item.certificateUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        title: `View Certificate: ${item.title}`,
        "aria-label": `View Certificate: ${item.title}`,
      }
    : {};

  return (
    <Reveal delay={index * 0.05}>
      <div className="relative group" data-testid={`achievement-card-${item.id}`}>
        {/* Timeline Node Marker matching Experience.jsx */}
        <div
          className="absolute -left-[37px] sm:-left-[49px] top-6 flex h-5 w-5 items-center justify-center"
          aria-hidden="true"
        >
          {isCurrent ? (
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
            </span>
          ) : (
            <span className="h-3 w-3 rounded-full border-2 border-emerald-400/80 bg-[#070B12] shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
          )}
        </div>

        {/* Experience-styled Glassmorphic Card with Dynamic Cursor Spotlight */}
        <motion.article
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          }}
          className={`relative rounded-2xl border bg-[#070B12]/80 p-5 sm:p-7 backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85)] ${
            item.certificateUrl
              ? "border-white/[0.08] hover:border-emerald-400/40 cursor-pointer"
              : "border-emerald-500/25 hover:border-emerald-400/40"
          }`}
        >
          {/* Dynamic cursor-following spotlight glow matching Beyond the Code */}
          <motion.div
            className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: glareBg,
            }}
            aria-hidden="true"
          />

          {/* Top subtle highlight */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transition-colors group-hover:via-white/35"
            aria-hidden="true"
          />

          <CardWrapper {...wrapperProps} className="block">
            {/* Header: Title, Org & Badges */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-400">
                    {item.certificateUrl ? "Certification" : "Recognition"}
                  </span>
                </div>

                <div className="mt-1 flex items-start gap-2.5">
                  <h3 className="font-display text-xl font-bold tracking-tight text-slate-100 sm:text-2xl group-hover:text-emerald-300 transition-colors duration-300 break-words">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-1 flex items-center gap-2 font-display text-sm font-semibold text-slate-300 sm:text-[15px]">
                  <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{item.org}</span>
                </p>
              </div>

              {/* Period & Verification Status Pill */}
              <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end shrink-0">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-slate-300">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span>{item.period}</span>
                </div>

                {item.certificateUrl ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                    <span>View Certificate</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                    Verified Recognition
                  </span>
                )}
              </div>
            </div>

            {/* Description matching Experience layout */}
            {item.description && (
              <p className="mt-4 text-xs sm:text-[13.5px] leading-relaxed text-slate-300 border-t border-white/[0.06] pt-3.5">
                {item.description}
              </p>
            )}
          </CardWrapper>
        </motion.article>
      </div>
    </Reveal>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative border-t border-white/[0.04] py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.04] blur-[150px]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionShell
          eyebrow="06 — Achievements"
          title="Moments worth *highlighting*."
          description="Recognitions, certifications, and milestones acquired along the engineering journey."
        >
          {/* Modern Timeline Container exactly matching Experience.jsx */}
          <div
            className="relative space-y-10 border-l border-white/10 pl-7 sm:pl-10 ml-2 sm:ml-3"
            data-testid="achievement-cards"
          >
            {ACHIEVEMENTS.map((item, index) => (
              <AchievementTimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
