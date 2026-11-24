import { ArrowUp } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../data/portfolio";
import { LogoMark } from "./Navbar";
import { scrollTop, scrollToId } from "../lib/scroll";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <LogoMark size={30} />
            <span className="font-display font-bold text-slate-100">{PROFILE.name}</span>
          </div>
          <div className="flex flex-wrap gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                data-testid={`footer-${l.label.toLowerCase()}-link`}
                onClick={() => scrollToId(l.href)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 hover:text-emerald-300"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            data-testid="back-to-top-button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="group rounded-full border border-white/10 p-3.5 text-slate-300 transition-all duration-300 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-[0_0_28px_-8px_rgba(16,185,129,0.5)]"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display text-[6.5vw] font-extrabold leading-[0.85] tracking-[-0.02em] text-stroke transition-colors duration-700 max-w-full overflow-hidden"
        >
          {PROFILE.name.toUpperCase()}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 py-9 font-mono text-[11px] text-slate-600 sm:flex-row">
          <p data-testid="footer-copyright">
            © {new Date().getFullYear()} {PROFILE.name} · All rights reserved
          </p>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
