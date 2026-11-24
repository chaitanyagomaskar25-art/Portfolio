import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Download, Menu, Moon, Sun, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../data/portfolio";
import { forceUnlockScroll, scrollTop, scrollToId, startScroll, stopScroll } from "../lib/scroll";
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
  const [activeSection, setActiveSection] = useState("");

  // Scroll depth tracking for glass navbar header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section scroll spy
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140;

      // Check if at the very top
      if (window.scrollY < 180) {
        setActiveSection("");
        return;
      }

      // Check each section position in reverse order (bottom to top)
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 80) {
            setActiveSection(link.href);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Lock body scroll when mobile menu is open, restore on unmount
  useEffect(() => {
    if (open) {
      stopScroll();
    } else {
      startScroll();
    }
    return () => {
      forceUnlockScroll();
    };
  }, [open]);

  // Navigate to section safely
  const handleNavClick = (href) => {
    setOpen(false);
    forceUnlockScroll();
    // Allow drawer exit animation to start, then smoothly scroll
    setTimeout(() => {
      scrollToId(href);
    }, 40);
  };

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    applyTheme(next);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-[#05070C]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12"
          aria-label="Main Navigation"
        >
          {/* Logo & Name */}
          <button
            data-testid="nav-logo-button"
            onClick={() => {
              if (open) setOpen(false);
              scrollTop();
            }}
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
            aria-label="Back to top"
          >
            <LogoMark />
            <span className="font-display text-lg font-bold tracking-tight text-slate-100 transition-colors group-hover:text-white">
              {PROFILE.name}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  data-testid={`nav-${link.label.toLowerCase()}-link`}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative flex items-center gap-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 ${
                    isActive ? "text-emerald-300 font-bold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <span className={isActive ? "text-emerald-400 font-bold" : "text-emerald-400/60"}>
                    0{i + 1}
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons: Theme, Resume, Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              data-testid="theme-toggle-button"
              onClick={toggleTheme}
              aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
              title={light ? "Switch to dark theme" : "Switch to light theme"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-200 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300 active:scale-95"
            >
              {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <a
              data-testid="nav-resume-button"
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/[0.08] px-4 py-2 font-display text-xs font-semibold text-emerald-300 transition-all duration-200 hover:bg-emerald-400/15 hover:shadow-[0_0_24px_-4px_rgba(16,185,129,0.45)] sm:inline-flex active:scale-95"
            >
              <Download className="h-3.5 w-3.5" /> Resume
            </a>

            {/* Mobile Hamburger Button with Smooth Icon Animation */}
            <button
              data-testid="nav-mobile-menu-button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 lg:hidden active:scale-95 ${
                open
                  ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white"
              }`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile & Small-Screen Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#05070C]/98 pt-[90px] pb-8 px-5 sm:px-8 backdrop-blur-2xl lg:hidden overflow-y-auto"
            data-testid="nav-mobile-menu"
          >
            {/* Ambient Background Gradient for Drawer */}
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <div className="absolute top-1/4 -right-20 h-64 w-64 rounded-full bg-emerald-500/[0.08] blur-[100px]" />
              <div className="absolute bottom-1/4 -left-20 h-64 w-64 rounded-full bg-blue-500/[0.08] blur-[100px]" />
            </div>

            {/* Navigation Links List */}
            <div className="flex flex-col space-y-1.5 py-2">
              <p className="px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
                Navigation
              </p>

              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.button
                    key={link.href}
                    data-testid={`nav-mobile-${link.label.toLowerCase()}-link`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNavClick(link.href)}
                    className={`group flex items-center justify-between w-full min-h-[50px] rounded-xl px-4 py-3 text-left transition-all duration-200 active:scale-[0.99] ${
                      isActive
                        ? "border border-emerald-400/35 bg-emerald-400/[0.12] text-white shadow-[0_4px_20px_rgba(16,185,129,0.18)]"
                        : "border border-white/[0.04] bg-white/[0.02] text-slate-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`font-mono text-xs font-semibold ${
                          isActive ? "text-emerald-300 font-bold" : "text-emerald-400/70"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="font-display text-lg font-bold tracking-tight">
                        {link.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                      )}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${
                          isActive ? "text-emerald-300" : "text-slate-500"
                        }`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Drawer Bottom Actions: Resume Button & Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.35 }}
              className="mt-6 pt-4 border-t border-white/[0.08]"
            >
              <a
                data-testid="nav-mobile-resume-button"
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 font-display text-sm font-bold text-[#04110B] shadow-[0_8px_25px_-4px_rgba(16,185,129,0.45)] transition-all active:scale-[0.98]"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{PROFILE.name} · Portfolio</span>
                <span className="text-emerald-400">Available for Work</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
