import Reveal from "./Reveal";
import { EmTitle } from "./SectionHeading";

// Shared editorial layout: sticky heading column + content column
export default function SectionShell({ eyebrow, title, description, children }) {
  return (
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-400">
              <span className="h-px w-10 bg-gradient-to-r from-emerald-400 to-blue-400" aria-hidden="true" />
              {eyebrow}
            </p>
            <EmTitle text={title} />
            {description && (
              <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-400">{description}</p>
            )}
          </Reveal>
        </div>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}
