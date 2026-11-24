import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollTop } from "../lib/scroll";

export default function FloatingBackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          data-testid="floating-back-to-top-button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={scrollTop}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-emerald-500 text-[#04110B] shadow-[0_16px_40px_-12px_rgba(16,185,129,0.7)] transition-colors duration-300 hover:bg-emerald-400"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
