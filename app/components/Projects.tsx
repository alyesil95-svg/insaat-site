"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { PROJECTS } from "../lib/site";

// Cinematic card imagery (per the requested Unsplash set).
const CARD_IMAGES: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
  2: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
  3: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800",
  4: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  5: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  6: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800",
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          window.matchMedia("(pointer: coarse)").matches
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-driven video scrubbing behind the cards.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (isMobile) {
      video.loop = true;
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.loop = false;
      video.pause();
      video.currentTime = 0;
    }

    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      if (isMobile || !video.duration || !isFinite(video.duration)) return;
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        total
      );
      const progress = total > 0 ? scrolled / total : 0;
      const t = Math.min(progress * video.duration, video.duration - 0.001);
      if (video.fastSeek) {
        try {
          video.fastSeek(t);
        } catch {
          video.currentTime = t;
        }
      } else {
        video.currentTime = t;
      }
    };
    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    const prime = () => {
      if (isMobile) return;
      video
        .play()
        .then(() => {
          video.pause();
          video.currentTime = 0;
          update();
        })
        .catch(() => {
          video.currentTime = 0;
          update();
        });
    };
    if (video.readyState >= 2) prime();
    else video.addEventListener("loadeddata", prime, { once: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadeddata", prime);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // GSAP scroll-linked card entrances + header reveal.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveals first.
      gsap.from(".proj-head-anim", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      // Each card floats up like a heavy luxury object, scrubbed to scroll,
      // reversing when scrolling back up. Staggered ~150px down the list.
      const outers = gsap.utils.toArray<HTMLElement>(".proj-card-outer");
      outers.forEach((outer, i) => {
        const inner = outer.querySelector(".proj-card");
        gsap.fromTo(
          inner,
          {
            y: 120,
            rotateX: 15,
            rotateY: -5,
            scale: 0.85,
            opacity: 0,
            transformPerspective: 1100,
            transformOrigin: "center bottom",
          },
          {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: outer,
              start: () => `top+=${i * 30} 90%`,
              end: "top 48%",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, section);

    // Positions depend on the 500vh hero + fonts/images; recompute once mounted.
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="projeler"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#0e0e0e",
      }}
    >
      {/* Scroll-scrubbed video background (sticky) */}
      <div
        style={{
          position: isMobile ? "absolute" : "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dqmjnp8ti/video/upload/q_auto,f_auto/v1781630869/projects_alk3hp.mp4"
          muted
          playsInline
          preload="auto"
          autoPlay={isMobile}
          loop={isMobile}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
      </div>

      {/* Content over the video */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: isMobile ? 0 : "-100vh",
          padding: isMobile ? "120px 20px 100px" : "0 24px 18vh",
        }}
      >
        {/* Header — owns the first screen */}
        <div
          className="proj-head"
          style={{
            minHeight: isMobile ? "auto" : "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            paddingBottom: isMobile ? 64 : 0,
          }}
        >
          <span className="proj-head-anim eyebrow">Projelerimiz</span>
          <h2
            className="proj-head-anim font-display"
            style={{
              fontWeight: 200,
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              lineHeight: 1.02,
              letterSpacing: "0.03em",
              marginTop: 18,
            }}
          >
            <span style={{ fontWeight: 300, opacity: 0.92 }}>Tamamlanan</span>
            <br />
            Projeler
          </h2>
          <span
            className="proj-head-anim"
            style={{ display: "block", width: 60, height: 1, background: "#c9a84c", margin: "26px 0 22px" }}
          />
          <p
            className="proj-head-anim font-body"
            style={{ fontWeight: 300, fontSize: "0.95rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.75)" }}
          >
            500+ tamamlanan projeden öne çıkanlar
          </p>
        </div>

        {/* Card grid */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <div className="proj-card-outer" key={p.id}>
                <article className="proj-card">
                  <div className="proj-imgwrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="proj-img"
                      src={CARD_IMAGES[p.id]}
                      alt={p.name}
                      loading="lazy"
                    />
                    <div className="proj-imggrad" />
                    <span className="proj-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="proj-badge">{p.type}</span>
                  </div>
                  <div className="proj-text">
                    <h3 className="proj-name">{p.name}</h3>
                    <span className="proj-rule" />
                    <div className="proj-meta">
                      {p.location} · {p.year}
                    </div>
                    <div className="proj-sqm">{p.sqm}</div>
                    <a href="#iletisim" className="proj-link">
                      Projeyi İncele
                      <span className="arr">â†’</span>
                      <span className="u" />
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
