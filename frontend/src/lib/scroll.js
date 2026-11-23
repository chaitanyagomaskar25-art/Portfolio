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
      try {
        lenisInstance.stop();
      } catch (e) {}
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
      try {
        lenisInstance.start();
      } catch (e) {}
    }
    document.body.style.overflow = originalBodyOverflow || "";
    document.documentElement.style.overflow = originalHtmlOverflow || "";
    document.body.classList.remove("modal-open");
  }
}

export function forceUnlockScroll() {
  scrollLockCount = 0;
  if (lenisInstance) {
    try {
      lenisInstance.start();
    } catch (e) {}
  }
  document.body.style.overflow = originalBodyOverflow || "";
  document.documentElement.style.overflow = originalHtmlOverflow || "";
  document.body.classList.remove("modal-open");
}

export function scrollToId(id) {
  if (!id) return;
  const cleanId = id.startsWith("#") ? id.slice(1) : id;
  const el = document.getElementById(cleanId) || document.querySelector(id);
  if (!el) return;

  // Make sure scroll lock is completely dismantled
  forceUnlockScroll();

  const navOffset = -76;
  if (lenisInstance) {
    try {
      lenisInstance.start();
      lenisInstance.scrollTo(el, { offset: navOffset, duration: 1.2 });
      return;
    } catch (e) {}
  }

  // Native smooth scroll fallback
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset + navOffset;
  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: "smooth",
  });
}

export function scrollTop() {
  forceUnlockScroll();
  if (lenisInstance) {
    try {
      lenisInstance.start();
      lenisInstance.scrollTo(0, { duration: 1.2 });
      return;
    } catch (e) {}
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
