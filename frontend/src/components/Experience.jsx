import { Briefcase, Calendar, Check, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import SectionShell from "./SectionShell";
import Reveal from "./Reveal";
import { EXPERIENCE } from "../data/portfolio";

function TimelineCard({ item, index }) {
  const isCurrent = item.isCurrent;

  return (
    <Reveal delay={index * 0.1}>
      <div className="relative group">
        {/* Timeline Node Marker */}
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

        {/* Experience Glassmorphic Card */}
        <motion.article
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          className={`relative rounded-2xl border bg-[#070B12]/80 p-5 sm:p-7 backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85)] ${
            isCurrent
              ? "border-emerald-500/25 hover:border-emerald-400/40"
              : "border-white/[0.08] hover:border-white/20"
          }`}
        >
          {/* Subtle ambient card glow */}
          <div
            className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: isCurrent
                ? "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.12), transparent 70%)"
                : "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08), transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Header: Role, Company & Badges */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-slate-500">
                  0{index + 1}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-400">
                  {item.type || "Professional Role"}
                </span>
              </div>

              <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
                {item.role}
              </h3>

              <p className="mt-1 flex items-center gap-2 font-display text-sm font-semibold text-slate-300 sm:text-[15px]">
                {item.role.includes("Facilitator") ? (
                  <GraduationCap className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <Briefcase className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
                <span>{item.company}</span>
              </p>
            </div>

            {/* Duration & Status Pill */}
            <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-slate-300">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span>{item.period}</span>
              </div>

              {isCurrent ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ongoing · Present
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Responsibilities and Learning Points */}
          {item.points && (
            <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-4">
              {item.points.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-[13.5px] leading-relaxed text-slate-300"
                >
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Competency / Technology Badges */}
          {item.tech && (
            <div className="mt-5 flex flex-wrap gap-1.5 pt-1">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-colors hover:border-emerald-400/35 hover:text-emerald-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-white/[0.04] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionShell
          eyebrow="04 — Experience"
          title="Professional *roles* & experience."
          description="Real-world software development internship and academic mentorship roles."
        >
          {/* Modern Timeline Container */}
          <div
            className="relative space-y-10 border-l border-white/10 pl-7 sm:pl-10 ml-2 sm:ml-3"
            data-testid="experience-timeline"
          >
            {EXPERIENCE.map((item, index) => (
              <TimelineCard key={item.role + item.company} item={item} index={index} />
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
