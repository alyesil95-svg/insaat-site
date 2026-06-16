"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { STATS } from "../lib/site";

function formatTr(n: number) {
  return Math.round(n).toLocaleString("tr-TR");
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray<HTMLElement>(".stat-number");
      numbers.forEach((el) => {
        const target = Number(el.dataset.value);
        const proxy = { v: 0 };
        gsap.to(proxy, {
          v: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
          onUpdate: () => {
            el.firstChild!.textContent = formatTr(proxy.v);
          },
        });
      });

      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Slow drifting backdrop lines.
      gsap.to(".stat-grid-bg", {
        backgroundPosition: "120px 80px",
        duration: 18,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rakamlar"
      ref={ref}
      className="relative overflow-hidden bg-obsidian py-28 text-ivory md:py-40"
    >
      {/* Decorative drifting grid */}
      <div
        className="stat-grid-bg pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Soft gold glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #c9a84c, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Güven</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h2
            className="font-display mt-5"
            style={{
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
              color: "#f9f6f0",
            }}
          >
            Rakamlarla Biz
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-y-16 md:grid-cols-4 md:gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item text-center">
              <div
                className="stat-number font-display text-gold-grad"
                data-value={s.value}
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(3.4rem, 7vw, 6rem)",
                  lineHeight: 1,
                }}
              >
                <span>0</span>
                {s.suffix}
              </div>
              <div className="mt-4 text-xs font-light tracking-[0.25em] text-ivory/65">
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
