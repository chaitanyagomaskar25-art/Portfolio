import { GraduationCap } from "lucide-react";
import SectionShell from "./SectionShell";
import Reveal from "./Reveal";
import { EDUCATION_CARDS } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="relative border-t border-white/[0.04] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionShell
          eyebrow="05 — Education"
          title="Grounded in *fundamentals*."
          description="Formal foundations plus the habit of always being mid-course on something new."
        >
          <div
            className="relative space-y-12 border-l border-white/10 pl-9 sm:pl-12"
            data-testid="education-cards"
          >
            {EDUCATION_CARDS.map((card, i) => (
              <Reveal key={card.id} delay={0.08 * i}>
                <div className="relative" data-testid={`education-card-${card.id}`}>
                  <span
                    className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.9)] sm:-left-[49px]"
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300">{card.period}</p>
                  </div>
                  <h3 className="mt-3 font-serif text-3xl italic leading-snug text-slate-100">{card.degree}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-300">{card.school}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">{card.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionShell>
      </div>
    </section>
  );
}
