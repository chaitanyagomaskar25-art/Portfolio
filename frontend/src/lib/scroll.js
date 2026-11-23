import Lenis from "lenis";

let lenisInstance = null;
let scrollLockCount = 0;
let originalBodyOverflow = "";
let originalHtmlOverflow = "";

export function initLenis() {
  if (lenisInstance) return () => {};
  lenisInstance = new Lenis({ lerp: 0.09, smoothWheel: true });
  let raf;
  const loop = (t) => {
    if (!lenisInstance) return;
    lenisInstance.raf(t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenisInstance = null;
  };
}

export function stopScroll() {
  scrollLockCount++;
  if (scrollLockCount === 1) {
    if (lenisInstance) {
      lenisInstance.stop();
    }
    originalBodyOverflow = document.body.style.overflow;
    originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("modal-open");
  }
}

export function startScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    if (lenisInstance) {
      lenisInstance.start();
    }
    document.body.style.overflow = originalBodyOverflow || "";
    document.documentElement.style.overflow = originalHtmlOverflow || "";
    document.body.classList.remove("modal-open");
  }
}

export function scrollToId(id) {
  const el = document.querySelector(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.4 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
