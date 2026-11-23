import { ArrowUpRight, Award, Medal, Star, Trophy } from "lucide-react";
import SectionShell from "./SectionShell";
import Reveal from "./Reveal";
import { ACHIEVEMENTS } from "../data/portfolio";

const ICONS = {
  award: Award,
  medal: Medal,
  star: Star,
  trophy: Trophy,
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden border-t border-white/[0.04] py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.05] blur-[140px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionShell
          eyebrow="06 — Achievements"
          title="Moments worth *highlighting*."
          description="Recognitions and milestones — sample rows until you send your real ones."
        >
          <Reveal>
            <div className="surface overflow-hidden rounded-[20px]" data-testid="achievement-cards">
              {ACHIEVEMENTS.map((a, i) => {
                const Icon = ICONS[a.icon];
                return (
                  <div
                    key={a.id}
                    data-testid={`achievement-card-${a.id}`}
                    className={`group flex items-start gap-5 px-8 py-8 transition-colors duration-300 hover:bg-white/[0.025] sm:items-center sm:gap-7 sm:px-10 ${
                      i > 0 ? "border-t border-white/[0.06]" : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300 transition-colors duration-300 group-hover:border-emerald-400/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-slate-100">
                        {a.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {a.org}
                      </p>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{a.description}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-[11px] tracking-[0.15em] text-slate-500">{a.period}</p>
                      <ArrowUpRight className="ml-auto mt-3 h-4 w-4 -translate-x-1 text-emerald-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </SectionShell>
      </div>
    </section>
  );
}
