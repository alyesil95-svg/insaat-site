"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { SERVICES } from "../lib/site";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return; // mobile = vertical stack, no pin
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".service-panel");
      const totalX = () => track.scrollWidth - window.innerWidth;

      const horizontal = gsap.to(track, {
        x: () => -totalX(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + totalX(),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Each panel's image parallax-zooms as it crosses the viewport,
      // driven by the horizontal container animation.
      panels.forEach((panel) => {
        const image = panel.querySelector(".service-img");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.2, xPercent: 6 },
            {
              scale: 1,
              xPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="hizmetler" ref={sectionRef} className="bg-obsidian text-ivory">
      <div
        ref={trackRef}
        className={
          isMobile
            ? "flex flex-col"
            : "flex h-[100svh] w-max flex-nowrap items-stretch"
        }
      >
        {/* Intro panel */}
        <div
          className={
            "service-panel relative flex shrink-0 flex-col justify-center px-8 md:px-24 " +
            (isMobile ? "py-24" : "h-full w-screen")
          }
        >
          <div className="service-copy max-w-xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow">Ne İnşa Ediyoruz</span>
            </div>
            <h2
              className="font-display mt-6"
              style={{
                fontWeight: 300,
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                lineHeight: 1.05,
              }}
            >
              Hizmetlerimiz
            </h2>
            <p className="mt-6 max-w-md font-light leading-relaxed text-ivory/70">
              Dört ana disiplinde, fikirden teslim anahtara kadar uçtan uca
              inşaat çözümleri. Kaydırarak keşfedin.
            </p>
            {!isMobile && (
              <div className="mt-10 flex items-center gap-3 text-xs tracking-[0.25em] text-ivory/50">
                <span>KAYDIR</span>
                <span className="text-gold">→</span>
              </div>
            )}
          </div>
        </div>

        {/* Service panels */}
        {SERVICES.map((s, i) => (
          <article
            key={s.no}
            className={
              "service-panel group relative shrink-0 overflow-hidden " +
              (isMobile ? "h-[80svh]" : "h-full w-screen")
            }
          >
            {/* Background image */}
            <div className="service-img absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/55 to-obsidian/25" />

            {/* Giant watermark number */}
            <span
              className="font-display pointer-events-none absolute -right-2 bottom-[-3rem] select-none leading-none text-gold/15"
              style={{ fontSize: "clamp(14rem, 34vw, 32rem)" }}
            >
              {s.no}
            </span>

            {/* Copy */}
            <div className="service-copy relative z-10 flex h-full max-w-2xl flex-col justify-center px-8 md:px-24">
              <span className="eyebrow">Hizmet {s.no}</span>
              <h3
                className="font-display mt-4"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
                  lineHeight: 1.05,
                }}
              >
                {s.title}
              </h3>
              <p className="mt-6 max-w-md font-light leading-relaxed text-ivory/80">
                {s.desc}
              </p>
            </div>

            {/* Gold divider between panels */}
            {i < SERVICES.length - 1 && !isMobile && (
              <span className="absolute right-0 top-1/2 h-1/3 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
