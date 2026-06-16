"use client";

import { useRef } from "react";
import { REFERENCES, TESTIMONIALS } from "../lib/site";
import SectionHeading from "./SectionHeading";

function TiltCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${
      -py * 8
    }deg) translateY(-6px)`;
  };
  const reset = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group relative border border-ink/10 bg-white p-9 transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="font-display block text-6xl leading-none text-gold/40">
        &ldquo;
      </span>
      <p className="mt-2 font-light leading-relaxed text-ink/80">{quote}</p>
      <div className="mt-7 border-t border-ink/10 pt-5">
        <div className="font-display text-xl text-ink">{name}</div>
        <div className="mt-1 text-xs tracking-[0.18em] text-ink/45">{role}</div>
      </div>
    </div>
  );
}

export default function References() {
  return (
    <section id="referanslar" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <SectionHeading eyebrow="Bize Güvenenler" title="Referanslarımız" />

        {/* Logo wall */}
        <div className="mt-20 grid grid-cols-2 items-center gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-5">
          {REFERENCES.map((name) => (
            <div
              key={name}
              className="group flex h-32 items-center justify-center bg-ivory transition-colors duration-500 hover:bg-white"
            >
              <span
                className="font-display text-2xl tracking-wide text-ink/35 grayscale transition-all duration-500 group-hover:text-gold-deep group-hover:grayscale-0"
                style={{ fontWeight: 400 }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid grid-cols-1 gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TiltCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
