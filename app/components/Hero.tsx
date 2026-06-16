"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Silent autoplay loop (no scrubbing) — kick playback in case the
  // autoplay attribute is blocked until the element is ready.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section
      id="hero"
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    >
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dqmjnp8ti/video/upload/q_auto:low,w_1280,f_mp4/v1781630695/hero_hquc97.mp4"
        autoPlay
        muted
        loop
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
    </section>
  );
}
