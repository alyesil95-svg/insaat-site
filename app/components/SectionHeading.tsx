"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { isMobileDevice, fadeInOnView } from "../lib/mobile";

export default function SectionHeading({
  eyebrow,
  title,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (root && isMobileDevice()) {
      return fadeInOnView([...root.querySelectorAll<HTMLElement>(".sh-anim")]);
    }
    const ctx = gsap.context(() => {
      gsap.from(".sh-anim", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <div
        className={`sh-anim flex items-center gap-4 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-px w-10 bg-gold" />
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px w-10 bg-gold" />
      </div>
      <h2
        className="sh-anim font-display mt-5"
        style={{
          fontWeight: 300,
          letterSpacing: "0.03em",
          fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
          color: dark ? "#f9f6f0" : "#1a1a1a",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h2>
    </div>
  );
}
