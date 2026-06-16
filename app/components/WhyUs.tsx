"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { WHY_US } from "../lib/site";
import SectionHeading from "./SectionHeading";

// Thin gold line icons, one per reason.
const ICONS = [
  // Kalite — diamond
  <path key="i" d="M16 3 29 16 16 29 3 16Z" />,
  // Zamanında — clock
  <>
    <circle cx="16" cy="16" r="13" />
    <path d="M16 8v8l6 4" />
  </>,
  // Şeffaf — layers
  <>
    <path d="M16 4 4 11l12 7 12-7Z" />
    <path d="M4 18l12 7 12-7" />
  </>,
  // Garanti — shield
  <path key="s" d="M16 3 27 7v8c0 7-5 11-11 14-6-3-11-7-11-14V7Z" />,
  // 7/24 — headset
  <>
    <path d="M5 18v-2a11 11 0 0 1 22 0v2" />
    <path d="M27 18v4a3 3 0 0 1-3 3h-3" />
    <rect x="3" y="17" width="5" height="9" rx="2" />
    <rect x="24" y="17" width="5" height="9" rx="2" />
  </>,
];

function Reason({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x: fromLeft ? -90 : 90, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [fromLeft]);

  return (
    <div
      ref={ref}
      className={`reveal flex items-start gap-7 ${
        fromLeft ? "md:mr-auto md:flex-row" : "md:ml-auto md:flex-row-reverse md:text-right"
      } max-w-2xl`}
    >
      <div className="shrink-0">
        <svg
          width="48"
          height="48"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[index]}
        </svg>
      </div>
      <div>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl text-gold/60">
            0{index + 1}
          </span>
          <h3
            className="font-display"
            style={{
              fontWeight: 300,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            }}
          >
            {title}
          </h3>
        </div>
        <p className="mt-3 font-light leading-relaxed text-ink/65">{desc}</p>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <SectionHeading eyebrow="Farkımız" title="Neden Biz" />
        <div className="mt-24 flex flex-col gap-16 md:gap-20">
          {WHY_US.map((r, i) => (
            <Reason key={r.title} index={i} title={r.title} desc={r.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}
