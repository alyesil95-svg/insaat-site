"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { isMobileDevice } from "../lib/mobile";

/**
 * Keeps ScrollTrigger's measured positions correct.
 *
 * Triggers are created as each section mounts, but the page keeps growing
 * afterwards: the 500vh hero, the pinned Services spacer, web-font swaps and
 * remote images all change layout. Without a refresh once everything settles,
 * every trigger below the fold ends up with stale start/end pixels and never
 * fires — which made the lower project cards stay invisible.
 */
export default function ScrollManager() {
  useEffect(() => {
    // Mobile has no ScrollTriggers (animations fall back to a CSS fade), so
    // there's nothing to refresh — skip the work entirely.
    if (isMobileDevice()) return;

    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // After initial mount/layout.
    refresh();

    // After all images decode (project + service photos shift heights).
    const imgs = Array.from(document.images);
    let pending = imgs.length;
    if (pending) {
      imgs.forEach((img) => {
        if (img.complete) {
          if (--pending === 0) refresh();
        } else {
          const done = () => {
            img.removeEventListener("load", done);
            img.removeEventListener("error", done);
            if (--pending === 0) refresh();
          };
          img.addEventListener("load", done);
          img.addEventListener("error", done);
        }
      });
    }

    // After fonts swap in.
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    // Safety net + full window load.
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 1200);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
