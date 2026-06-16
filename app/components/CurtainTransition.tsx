"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Theatrical curtain wipe between Hero and Projects.
 *
 * When the hero's bottom passes the top of the viewport (i.e. the user has
 * scrolled past the hero), a dark-gold curtain sweeps left→right to cover the
 * screen (0.6s), then sweeps back right→left to reveal the Projects act (0.6s).
 */
export default function CurtainTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    const hero = document.getElementById("hero");
    if (!curtain || !hero) return;

    const ctx = gsap.context(() => {
      // x:0 clears the px value GSAP would otherwise parse from the inline
      // translateX(-100%) — without it the curtain double-offsets to -200%.
      gsap.set(curtain, { x: 0, xPercent: -100 });

      const tl = gsap.timeline({ paused: true });
      // Cover: leading (right) edge sweeps from left to right.
      tl.to(curtain, { xPercent: 0, duration: 0.6, ease: "power2.inOut" });
      // Reveal: curtain slides back, uncovering right→left.
      tl.to(curtain, { xPercent: -100, duration: 0.6, ease: "power2.inOut" });

      ScrollTrigger.create({
        trigger: hero,
        start: "bottom top",
        onEnter: () => tl.restart(),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={curtainRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#1a1209",
        zIndex: 9999,
        pointerEvents: "none",
        transform: "translateX(-100%)",
        willChange: "transform",
      }}
    >
      {/* Ultra-thin gold leading edge (right) */}
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 2,
          height: "100%",
          background: "#B8963E",
          boxShadow: "0 0 24px rgba(184,150,62,0.7)",
        }}
      />
      {/* Faint gold trailing edge (left) for the reveal sweep */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1,
          height: "100%",
          background: "rgba(184,150,62,0.5)",
        }}
      />
    </div>
  );
}
