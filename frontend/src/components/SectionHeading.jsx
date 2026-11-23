import Reveal from "./Reveal";

export function EmTitle({ text, className = "" }) {
  const parts = text.split("*");
  return (
    <h2
      className={`mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-slate-50 sm:text-5xl lg:text-6xl ${className}`}
    >
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <em key={i} className="text-gradient pr-1 font-serif font-normal italic">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </h2>
  );
}

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const centered = align === "center";
  return (
    <Reveal>
      <div className={centered ? "text-center" : ""}>
        <p
          className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-400 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-10 bg-gradient-to-r from-emerald-400 to-blue-400" aria-hidden="true" />
          {eyebrow}
          {centered && (
            <span className="h-px w-10 bg-gradient-to-r from-blue-400 to-emerald-400" aria-hidden="true" />
          )}
        </p>
        <EmTitle text={title} className={centered ? "mx-auto" : ""} />
        {description && (
          <p className={`mt-6 max-w-xl text-base leading-relaxed text-slate-400 ${centered ? "mx-auto" : ""}`}>
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
