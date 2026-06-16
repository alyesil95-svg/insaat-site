"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const outerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const outer = outerRef.current;
    if (!video || !outer) return;

    // Mobile / touch: silent autoplay loop instead of scroll scrubbing.
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      video.loop = true;
      video.muted = true;
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;

    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      if (!video.duration || !isFinite(video.duration)) return;
      // scrollY relative to the outer (500vh) container, via getBoundingClientRect.
      const rect = outer.getBoundingClientRect();
      const total = outer.offsetHeight - window.innerHeight; // == innerHeight * 4
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
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

    // Prime the decoder so seeked frames actually paint (a never-played
    // <video> stays frozen on currentTime changes in Chrome/Safari).
    const prime = () => {
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
  }, []);

  return (
    <section
      id="hero"
      ref={outerRef}
      style={{ height: "500vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dqmjnp8ti/video/upload/q_auto,f_auto/v1781630695/hero_hquc97.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Max ~20% dark overlay so footage stays clearly visible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.32) 100%)",
          }}
        />

        {/* Centered hero copy */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "26px",
              animation: "fadeIn 1.4s ease both 0.2s",
            }}
          >
            Türkiye&apos;nin Öncü İnşaat Firması
          </p>

          <h1
            className="font-display"
            style={{
              fontWeight: 200,
              fontSize: "clamp(3.4rem, 12vw, 9rem)",
              letterSpacing: "0.05em",
              lineHeight: 1,
              margin: 0,
              animation: "fadeIn 1.6s ease both 0.35s",
            }}
          >
            DEMO İNŞAAT
          </h1>

          <p
            className="font-body"
            style={{
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
              letterSpacing: "0.08em",
              opacity: 0.9,
              marginTop: "26px",
              maxWidth: "40rem",
              animation: "fadeIn 1.6s ease both 0.55s",
            }}
          >
            Türkiye&apos;nin En Prestijli Yapılarını İnşa Ediyoruz
          </p>

          <div
            className="font-body"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontWeight: 300,
              fontSize: "0.8rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.85)",
              marginTop: "28px",
              animation: "fadeIn 1.6s ease both 0.75s",
            }}
          >
            <span>İSTANBUL</span>
            <span style={{ width: 4, height: 4, borderRadius: 9999, background: "#c9a84c" }} />
            <span>İZMİR</span>
            <span style={{ width: 4, height: 4, borderRadius: 9999, background: "#c9a84c" }} />
            <span>ANKARA</span>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          <span
            className="font-body"
            style={{ fontWeight: 300, fontSize: "0.62rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)" }}
          >
            KAYDIR
          </span>
          <span
            style={{
              position: "relative",
              display: "block",
              width: "1px",
              height: "60px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.15)",
            }}
          >
            <span
              className="scroll-cue-line"
              style={{ position: "absolute", inset: 0, display: "block", width: "1px", background: "#c9a84c" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
