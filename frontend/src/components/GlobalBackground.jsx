import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function GlobalBackground() {
  const canvasRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Global mouse coordinates for full-page cursor-following ambient glow spotlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth physics spring for the cursor-following glow
  const springConfig = { damping: 32, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const spotlightBg = useMotionTemplate`radial-gradient(750px circle at ${smoothX}px ${smoothY}px, rgba(16, 185, 129, 0.055), rgba(59, 130, 246, 0.035), transparent 70%)`;

  useEffect(() => {
    // Detect touch / coarse pointer
    const checkTouch = () => {
      const hasTouch =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        "ontouchstart" in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      setIsTouch(hasTouch);
    };
    checkTouch();

    const onGlobalMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onGlobalMouseMove, { passive: true });
    window.addEventListener("resize", checkTouch);

    return () => {
      window.removeEventListener("mousemove", onGlobalMouseMove);
      window.removeEventListener("resize", checkTouch);
    };
  }, [mouseX, mouseY]);

  // Global Interactive Particle Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf;

    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    // Number of particles: optimized for performance (mobile: 32, desktop: 68)
    const isMobileDevice = window.innerWidth < 768 || isTouch;
    const N = isMobileDevice ? 32 : 68;

    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * (w || 1200),
      y: Math.random() * (h || 800),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.6,
      blue: Math.random() > 0.65,
    }));

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      const isLight = document.documentElement.classList.contains("light");

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges smoothly
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        // Interactive mouse repulsion force
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0.01) {
          const force = (1 - dist / 140) * 1.2;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Constellation connecting lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 115) {
            const alpha = (1 - d / 115) * (isLight ? 0.22 : 0.13);
            ctx.strokeStyle =
              a.blue || b.blue
                ? isLight
                  ? `rgba(37, 99, 235, ${alpha})`
                  : `rgba(96, 165, 250, ${alpha})`
                : isLight
                  ? `rgba(5, 150, 105, ${alpha})`
                  : `rgba(52, 211, 153, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particle dots
      for (const p of pts) {
        ctx.fillStyle = p.blue
          ? isLight
            ? "rgba(37, 99, 235, 0.55)"
            : "rgba(96, 165, 250, 0.65)"
          : isLight
            ? "rgba(5, 150, 105, 0.55)"
            : "rgba(52, 211, 153, 0.65)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isTouch]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Subtle Global Geometric Grid Texture */}
      <div className="absolute inset-0 grid-lines opacity-20 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,black,transparent)]" />

      {/* 2. Full-Page Dynamic Cursor-Following Glow Spotlight */}
      {!isTouch && (
        <motion.div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: spotlightBg }}
        />
      )}

      {/* 3. Global Interactive Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
      />

      {/* 4. Ambient Floating Gradient Orbs Across All Sections */}
      {/* Top Left: Emerald Aurora (Hero / About) */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 35, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-36 -left-36 h-[650px] w-[650px] rounded-full bg-emerald-500/[0.06] blur-[160px]"
      />

      {/* Mid Right: Electric Blue & Cyan Aurora (Projects / Skills) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 -right-36 h-[600px] w-[600px] rounded-full bg-blue-500/[0.05] blur-[160px]"
      />

      {/* Center Depth: Teal Ambient Glow (Skills / Experience) */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.03, 0.065, 0.03],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-2/3 left-1/4 h-[550px] w-[550px] rounded-full bg-teal-500/[0.045] blur-[170px]"
      />

      {/* Bottom Left: Violet / Indigo Aurora (Education / Contact) */}
      <motion.div
        animate={{
          scale: [1, 1.22, 1],
          x: [0, 30, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-36 left-1/3 h-[680px] w-[680px] rounded-full bg-indigo-500/[0.04] blur-[180px]"
      />
    </div>
  );
}
