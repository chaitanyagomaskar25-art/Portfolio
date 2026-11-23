import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default"); // "default" | "hover" | "click"

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy physics for inner precision dot
  const dotX = useSpring(mouseX, { damping: 45, stiffness: 1200 });
  const dotY = useSpring(mouseY, { damping: 45, stiffness: 1200 });

  // Fluid follower spring for outer aura ring
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 240, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 240, mass: 0.6 });

  useEffect(() => {
    // Detect mobile or touch devices (disabled to retain native touch experience)
    const checkTouch = () => {
      const hasTouch =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        "ontouchstart" in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      setIsTouch(hasTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setCursorVariant("click");
    const onMouseUp = () => setCursorVariant("default");

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        target.closest &&
        target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer, article'
        )
      ) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Outer Interactive Follower Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "hover" ? 54 : cursorVariant === "click" ? 28 : 34,
          height: cursorVariant === "hover" ? 54 : cursorVariant === "click" ? 28 : 34,
          backgroundColor:
            cursorVariant === "hover"
              ? "rgba(16, 185, 129, 0.14)"
              : cursorVariant === "click"
              ? "rgba(16, 185, 129, 0.22)"
              : "rgba(16, 185, 129, 0.04)",
          borderColor:
            cursorVariant === "hover"
              ? "rgba(52, 211, 153, 0.8)"
              : cursorVariant === "click"
              ? "rgba(52, 211, 153, 0.95)"
              : "rgba(16, 185, 129, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="rounded-full border shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-[1px]"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorVariant === "hover" ? 0.75 : cursorVariant === "click" ? 1.3 : 1,
          backgroundColor: cursorVariant === "hover" ? "#34D399" : "#10B981",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="h-2 w-2 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.9)]"
      />
    </div>
  );
}
