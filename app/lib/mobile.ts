"use client";

import { useEffect, useState } from "react";

// Single source of truth for "is this a phone / touch device".
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || navigator.maxTouchPoints > 0;
}

// React state version (for layout that must re-render on the client).
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(isMobileDevice());
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

// Picks the device-appropriate video URL. Returns undefined until mounted so
// the wrong (heavy) file is never requested on a phone.
export function useDeviceVideo(desktop: string, mobile: string): string | undefined {
  const [src, setSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    setSrc(isMobileDevice() ? mobile : desktop);
  }, [desktop, mobile]);
  return src;
}

// Lightweight, GSAP-free reveal for mobile: a simple opacity/translate fade as
// elements enter the viewport. One IntersectionObserver, no 3D, no scrubbing.
export function fadeInOnView(els: (HTMLElement | null | undefined)[]): () => void {
  const targets = els.filter((e): e is HTMLElement => !!e);
  if (!targets.length) return () => {};
  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        }
      }),
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
  );
  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
