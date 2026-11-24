import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, MousePointer2 } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { PROFILE } from "../data/portfolio";
import { scrollToId } from "../lib/scroll";

const EASE = [0.22, 1, 0.36, 1];

const CODE = `const developer = {
  name: "Chaitanya Gomaskar",
  role: "Full-Stack Developer",
  stack: ["React", "JavaScript", "Python", "FastAPI"],
  passion: "clean, resilient systems",
  status: "open_to_work",
};`;

function MaskLine({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [typed, setTyped] = useState("");
  const rotateX = useSpring(0, { stiffness: 120, damping: 16 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 16 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yBackdrop = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 2;
        setTyped(CODE.slice(0, i));
        if (i >= CODE.length) clearInterval(interval);
      }, 22);
    }, 1500);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);

  const onTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  };
  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-36">
      {/* Hero Atmosphere Parallax Layer */}
      <motion.div style={{ y: yBackdrop }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Dynamic breathing atmospheric orbs */}
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 h-[540px] w-[540px] rounded-full bg-emerald-500/[0.08] blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.22, 1],
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full bg-blue-500/[0.08] blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.07, 0.03],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-teal-500/[0.05] blur-[170px]"
        />
      </motion.div>

      <motion.div
        style={{ y: yContent, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12"
      >
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Status Pill with interactive subtle hover */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04, borderColor: "rgba(52, 211, 153, 0.5)" }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              data-testid="hero-status-pill"
              className="inline-flex items-center gap-3 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-colors cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new opportunities
            </motion.p>

            <h1 className="mt-7 sm:mt-9 font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.96] tracking-[-0.025em] text-slate-50 break-words">
              <MaskLine delay={0.2}>{PROFILE.name}</MaskLine>
              <MaskLine delay={0.34}>
                <span className="text-gradient pr-2 font-serif font-normal italic tracking-normal">
                  {PROFILE.role}
                </span>
              </MaskLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="mt-8 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              {PROFILE.intro}
            </motion.p>

            {/* Interactive Call-To-Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              className="mt-12 flex flex-wrap items-center gap-5"
            >
              <MagneticButton>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="hero-cta-contact"
                  onClick={() => scrollToId("#contact")}
                  className="group relative overflow-hidden inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 font-display text-sm font-semibold text-[#04110B] shadow-[0_12px_44px_-14px_rgba(16,185,129,0.55)] transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_16px_48px_-10px_rgba(16,185,129,0.7)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <span className="relative z-10">Get in Touch</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </MagneticButton>

              <MagneticButton>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="hero-cta-about"
                  onClick={() => scrollToId("#about")}
                  className="group inline-flex items-center gap-2 rounded-full border border-blue-400/35 bg-blue-400/[0.06] px-8 py-4 font-display text-sm font-semibold text-blue-300 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-400/[0.14] hover:text-white hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.5)]"
                >
                  <span>More About Me</span>
                </motion.button>
              </MagneticButton>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="hero-resume-button"
                href={PROFILE.resume}
                download
                className="group inline-flex items-center gap-2 px-3 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 hover:text-emerald-300"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Resume</span>
              </motion.a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: EASE }}
              onMouseMove={onTilt}
              onMouseLeave={resetTilt}
              data-testid="hero-terminal"
            >
              <motion.div
                style={{ rotateX, rotateY, transformPerspective: 900 }}
                className="glass rounded-2xl p-2 shadow-[0_48px_90px_-40px_rgba(0,0,0,0.9)] hover:border-white/20 transition-colors duration-300"
              >
                <div className="rounded-xl bg-[#0A0F16]/95 p-5 font-mono text-[12.5px] leading-relaxed sm:p-6 sm:text-[13px]">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F57] hover:brightness-125 transition-all cursor-default" />
                    <span className="h-3 w-3 rounded-full bg-[#FEBC2E] hover:brightness-125 transition-all cursor-default" />
                    <span className="h-3 w-3 rounded-full bg-[#28C840] hover:brightness-125 transition-all cursor-default" />
                    <span className="ml-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      <MousePointer2 className="h-3 w-3 text-emerald-400/80" /> developer.js
                    </span>
                  </div>
                  <pre className="mt-4 min-h-[9.5rem] whitespace-pre-wrap text-slate-300">
                    {typed}
                    <span className="text-emerald-400">▌</span>
                  </pre>
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    <span>dev@chaitanya: ~/portfolio</span>
                    <span className="flex items-center gap-1.5 text-emerald-400/80">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      live
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
