import { useRef } from "react";
import { Award, Building2, Calendar, Check, GraduationCap, MapPin } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionShell from "./SectionShell";
import Reveal from "./Reveal";
import { EDUCATION_CARDS } from "../data/portfolio";

function EducationCardItem({ card, i }) {
  const cardRef = useRef(null);
  const isCurrent = card.isCurrent;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 24, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), springConfig);

  const glowColor = isCurrent ? "rgba(16, 185, 129, 0.16)" : "rgba(59, 130, 246, 0.15)";

  const glareBg = useMotionTemplate`radial-gradient(400px circle at ${useTransform(
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

  return (
    <Reveal delay={0.1 * i}>
      <div className="relative group" data-testid={`education-card-${card.id}`}>
        {/* Timeline Node Marker */}
        <div
          className="absolute -left-[35px] sm:-left-[51px] top-6 flex h-5 w-5 items-center justify-center"
          aria-hidden="true"
        >
          {isCurrent ? (
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
            </span>
          ) : (
            <span className="h-3 w-3 rounded-full border-2 border-blue-400/80 bg-[#070B12] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          )}
        </div>

        {/* Glassmorphic Education Card with Dynamic Cursor Spotlight */}
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
          className={`relative rounded-2xl border bg-[#070B12]/80 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85)] ${
            isCurrent
              ? "border-emerald-500/30 hover:border-emerald-400/50 shadow-[0_4px_24px_-6px_rgba(16,185,129,0.12)]"
              : "border-white/[0.08] hover:border-white/20"
          }`}
        >
          {/* Dynamic Cursor Spotlight Glare */}
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

          {/* Header: Degree Title, Status & Duration */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-slate-500">
                  0{i + 1}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] font-semibold ${
                    isCurrent ? "text-emerald-400" : "text-blue-400"
                  }`}
                >
                  {isCurrent ? "Undergraduate Degree" : "Higher Secondary"}
                </span>
              </div>

              <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
                {card.degree}
              </h3>

              {/* Institution & Location */}
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-300 sm:text-sm">
                <div className="flex items-center gap-1.5 font-medium text-slate-200">
                  <Building2 className={`h-4 w-4 ${isCurrent ? "text-emerald-400" : "text-blue-400"}`} />
                  <span>{card.institution}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{card.location}</span>
                </div>
              </div>
            </div>

            {/* Status & Period Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
              {isCurrent ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-emerald-300 font-bold shadow-[0_0_14px_rgba(16,185,129,0.25)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Currently Pursuing
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-slate-400 font-medium">
                  Completed
                </span>
              )}

              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-slate-300">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span>{card.period}</span>
              </div>
            </div>
          </div>

          {/* Prominent Grade / Metric Showcase */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
            <div className="flex items-center gap-3.5 min-w-0">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                  isCurrent
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                    : "border-blue-400/30 bg-blue-400/10 text-blue-400"
                }`}
              >
                <Award className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-wider text-slate-400 truncate">
                  {card.scoreType} Score ({card.scoreLabel})
                </p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span
                    className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight ${
                      isCurrent ? "text-emerald-300" : "text-blue-300"
                    }`}
                  >
                    {card.scoreValue}
                  </span>
                  {card.scoreMax && (
                    <span className="font-mono text-xs text-slate-400 font-medium">
                      {card.scoreMax}
                    </span>
                  )}
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-300 shrink-0">
                    {isCurrent ? "Top Academic Tier" : "Science Stream"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Program Highlights */}
          {card.highlights && (
            <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
              {card.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 sm:text-[13px] leading-relaxed">
                  <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isCurrent ? "text-emerald-400" : "text-blue-400"}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </Reveal>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative border-t border-white/[0.04] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionShell
          eyebrow="05 — Education"
          title="Academic *foundations* & qualifications."
          description="Formal academic education paired with disciplined technical learning and practical engineering."
        >
          <div
            className="relative space-y-10 border-l border-white/10 pl-7 sm:pl-11"
            data-testid="education-cards"
          >
            {EDUCATION_CARDS.map((card, i) => (
              <EducationCardItem key={card.id} card={card} i={i} />
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
