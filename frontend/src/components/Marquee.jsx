import { MARQUEE_ITEMS } from "../data/portfolio";

export default function Marquee() {
  return (
    <section
      aria-label="Technologies I work with"
      className="marquee relative overflow-hidden border-y border-white/5 bg-[#070B12]/80 py-8"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center">
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={`${copy}-${item}`}
                className={`flex items-center whitespace-nowrap font-display text-base font-semibold uppercase tracking-[0.18em] sm:text-lg ${
                  i % 2 === 1 ? "text-stroke" : "text-slate-500 transition-colors duration-300 hover:text-emerald-300"
                }`}
              >
                <span className="mx-10 h-1.5 w-1.5 rounded-full bg-emerald-400/60" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="marquee-fade left" aria-hidden="true" />
      <div className="marquee-fade right" aria-hidden="true" />
    </section>
  );
}
