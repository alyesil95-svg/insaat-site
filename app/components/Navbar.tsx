"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "../lib/site";

function Logo({ dark }: { dark: boolean }) {
  return (
    <a
      href="#hero"
      className="font-display flex items-center gap-3 text-2xl tracking-[0.18em] select-none"
      style={{ color: dark ? "#1a1a1a" : "#ffffff" }}
    >
      <span>DEMO</span>
      <span
        className="inline-block h-2 w-2 rotate-45"
        style={{ background: "#c9a84c" }}
      />
      <span>İNŞAAT</span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.07)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-12">
          <Logo dark={scrolled} />

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-[0.7rem] font-light tracking-[0.22em] transition-colors duration-300"
                  style={{ color: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)" }}
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a
              href="#iletisim"
              className="hidden border border-gold px-6 py-2.5 text-[0.68rem] font-light tracking-[0.22em] text-gold transition-all duration-300 hover:bg-gold hover:text-white sm:inline-block"
            >
              TEKLİF AL
            </a>

            {/* Hamburger */}
            <button
              aria-label="Menü"
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span
                className="h-px w-7 transition-all duration-300"
                style={{
                  background: open ? "#1a1a1a" : scrolled ? "#1a1a1a" : "#fff",
                  transform: open ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="h-px w-7 transition-all duration-300"
                style={{
                  background: open ? "#1a1a1a" : scrolled ? "#1a1a1a" : "#fff",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="h-px w-7 transition-all duration-300"
                style={{
                  background: open ? "#1a1a1a" : scrolled ? "#1a1a1a" : "#fff",
                  transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ivory transition-all duration-500 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-3xl tracking-[0.1em] text-ink transition-all duration-500"
            style={{
              transform: open ? "translateY(0)" : "translateY(24px)",
              opacity: open ? 1 : 0,
              transitionDelay: `${i * 60}ms`,
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#iletisim"
          onClick={() => setOpen(false)}
          className="mt-4 border border-gold px-8 py-3 text-xs tracking-[0.22em] text-gold"
        >
          TEKLİF AL
        </a>
      </div>
    </>
  );
}
