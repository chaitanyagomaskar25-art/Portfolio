import { MapPin, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ABOUT_IMAGE, CURRENT_STRIP, PROFILE } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/[0.04] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="01 — About"
          title="Engineer by craft, *product thinker* by habit."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <Reveal delay={0.05} className="md:col-span-5 md:row-span-2">
            <div className="group relative h-full min-h-[340px] overflow-hidden rounded-[20px] border border-white/8 bg-[#0B0F17]">
              <img
                src={ABOUT_IMAGE.url}
                alt={ABOUT_IMAGE.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070C] via-[#05070C]/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                  {PROFILE.name}
                </p>
                <p className="mt-1.5 font-display text-lg font-semibold text-slate-100">
                  {PROFILE.role}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <div className="surface card-hover h-full rounded-[20px] p-9 sm:p-11" data-testid="about-bio-card">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-400">// about me</p>
              {PROFILE.about.map((p, i) => (
                <p key={i} className={`text-base leading-relaxed text-slate-400 ${i === 0 ? "mt-6" : "mt-4"}`}>
                  {p}
                </p>
              ))}
              <p className="mt-7 font-mono text-sm text-slate-500">
                — {PROFILE.name}, {PROFILE.detailedRole}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-4">
            <div className="surface card-hover flex h-full flex-col justify-between rounded-[20px] p-9">
              <div>
                <Quote className="h-6 w-6 text-emerald-400" />
                <p className="mt-6 font-serif text-2xl italic leading-snug text-slate-100">
                  “{PROFILE.philosophy}”
                </p>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                How I work
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-3">
            <div className="surface card-hover flex h-full flex-col justify-between rounded-[20px] p-9" data-testid="about-location-card">
              <div>
                <MapPin className="h-6 w-6 text-emerald-400" />
                <p className="mt-6 font-display text-xl font-semibold leading-snug text-slate-100">
                  {PROFILE.location}
                </p>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Location
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="md:col-span-12">
            <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border border-white/[0.06] bg-[#0C1017]/50 px-9 py-7 sm:flex-row sm:items-center">
              {CURRENT_STRIP.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.label} <span className="text-slate-200">{item.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
