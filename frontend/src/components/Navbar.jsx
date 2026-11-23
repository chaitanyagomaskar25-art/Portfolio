import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../data/portfolio";
import { scrollTop, scrollToId, startScroll, stopScroll } from "../lib/scroll";
import { applyTheme, isLight } from "../lib/theme";

export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" stroke="url(#logo-grad)" strokeWidth="3" fill="#0A0F16" />
      <text
        x="32"
        y="33"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'JetBrains Mono',monospace"
        fontSize="30"
        fontWeight="800"
        fill="url(#logo-grad)"
      >
        C
      </text>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(() => isLight());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      stopScroll();
      return () => {
        startScroll();
      };
    }
  }, [open]);

  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    applyTheme(next);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            data-testid="nav-logo-button"
            onClick={scrollTop}
            className="flex items-center gap-3"
            aria-label="Back to top"
          >
            <LogoMark />
            <span className="font-display text-lg font-bold tracking-tight text-slate-100">
              {PROFILE.name}
            </span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                data-testid={`nav-${link.label.toLowerCase()}-link`}
                onClick={() => go(link.href)}
                className="link-underline flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400 transition-colors duration-300 hover:text-slate-100"
              >
                <span className="text-emerald-400/70">0{i + 1}</span> {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              data-testid="theme-toggle-button"
              onClick={toggleTheme}
              aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
              title={light ? "Switch to dark theme" : "Switch to light theme"}
              className="rounded-full border border-white/10 p-2.5 text-slate-300 transition-colors duration-300 hover:border-emerald-400/40 hover:text-emerald-300"
            >
              {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <a
              data-testid="nav-resume-button"
              href={PROFILE.resume}
              download
              className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/[0.08] px-5 py-2.5 text-xs font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-400/15 hover:shadow-[0_0_28px_-6px_rgba(16,185,129,0.5)] sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" /> Resume
            </a>
            <button
              data-testid="nav-mobile-menu-button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-white/10 p-2.5 text-slate-300 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#05070C]/95 backdrop-blur-xl lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  data-testid={`nav-mobile-${link.label.toLowerCase()}-link`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(link.href)}
                  className="border-b border-white/5 py-4 text-left font-display text-3xl font-bold text-slate-100"
                >
                  <span className="mr-3 font-mono text-xs text-emerald-400">0{i + 1}</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                data-testid="nav-mobile-resume-button"
                href={PROFILE.resume}
                download
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-display text-sm font-semibold text-[#04110B]"
              >
                <Download className="h-4 w-4" /> Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
