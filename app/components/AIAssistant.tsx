"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { from: "bot" | "user"; text: string };

const GOLD = "#B8963E";

const GREETING =
  "DEMO İNŞAAT'a hoşgeldiniz. Size nasıl yardımcı olabilirim? Projeler, hizmetler veya teklif hakkında sorabilirsiniz.";

const WELCOME_BUBBLE =
  "DEMO İNŞAAT'a Hoşgeldiniz 👋 Ben yapay zeka asistanınızım, yardımcı olmamı istediğiniz bir konu var mı?";

// Pre-programmed concierge replies.
function reply(input: string): string {
  const q = input.toLowerCase();
  if (/(proje|referans|portföy|maslak|rezidans|avm)/.test(q))
    return "Öne çıkan altı projemiz: Maslak Tower, Alsancak Rezidans, Bornova AVM, Karşıyaka Konut, Narlıdere Villa ve Çiğli Sanayi. “Projelerimiz” bölümünden detayları inceleyebilirsiniz.";
  if (/(hizmet|ne yap|inşaat türü|konut|ticari|endüstri|restorasyon)/.test(q))
    return "Dört uzmanlık alanımız var: Konut İnşaatı, Ticari Yapılar, Endüstriyel Tesisler ve Restorasyon & Renovasyon. Hangisi ilginizi çekiyor?";
  if (/(fiyat|teklif|maliyet|bütçe)/.test(q))
    return "Şeffaf fiyatlandırma ilkemizle çalışıyoruz. “TEKLİF AL” formunu doldurun, 24 saat içinde size özel bir teklifle dönelim.";
  if (/(iletişim|telefon|adres|email|ulaş|nerede)/.test(q))
    return "Bağcılar / İstanbul · +90 212 000 00 00 · info@demoinsaat.com. İletişim bölümündeki formu da kullanabilirsiniz.";
  if (/(garanti|kalite|güven|deneyim|yıl)/.test(q))
    return "25 yıllık deneyim, 500+ tamamlanan proje ve 25 yıl garantili işçilik. Kalite bizim için bir taahhüttür.";
  if (/(merhaba|selam|hey|iyi günler|günaydın)/.test(q))
    return "Merhaba, hoşgeldiniz. Projeler, hizmetler ya da teklif konusunda size yardımcı olabilirim.";
  return "Bu konuda size en doğru yanıtı uzman ekibimiz versin. “TEKLİF AL” formundan bize ulaşın, hemen dönelim.";
}

const QUICK = ["Projeleriniz", "Hizmetler", "Teklif almak istiyorum"];

function Diamond({ color = GOLD, size = "0.8em" }: { color?: string; size?: string }) {
  return (
    <span style={{ color, fontSize: size, lineHeight: 1 }} aria-hidden>
      ✦
    </span>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState<"hidden" | "in" | "out">("hidden");
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: GREETING }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Welcome bubble: in at 3s, out at 9s (visible 6s).
  useEffect(() => {
    const t1 = setTimeout(() => setBubble("in"), 3000);
    const t2 = setTimeout(() => setBubble("out"), 9000);
    const t3 = setTimeout(() => setBubble("hidden"), 9600);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const send = (text: string) => {
    const v = text.trim();
    if (!v) return;
    setMessages((m) => [...m, { from: "user", text: v }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: reply(v) }]);
    }, 900);
  };

  const openPanel = () => {
    setOpen(true);
    setBubble("hidden");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 14,
      }}
    >
      {/* Welcome bubble */}
      {bubble !== "hidden" && !open && (
        <div
          className="font-display"
          style={{
            maxWidth: 268,
            background: "#fff",
            border: `1px solid ${GOLD}`,
            borderRadius: "16px 16px 4px 16px",
            boxShadow: "0 10px 34px rgba(0,0,0,0.12)",
            padding: "16px 18px",
            fontWeight: 300,
            fontSize: "1.02rem",
            lineHeight: 1.5,
            color: "#1a1a1a",
            display: "flex",
            gap: 10,
            animation: `${bubble === "in" ? "aiBubbleIn" : "aiBubbleOut"} 0.5s cubic-bezier(0.22,1,0.36,1) both`,
          }}
        >
          <span style={{ marginTop: 2 }}>
            <Diamond />
          </span>
          <span>{WELCOME_BUBBLE}</span>
        </div>
      )}

      {/* Chat panel */}
      <div
        style={{
          position: "absolute",
          bottom: 72,
          right: 0,
          width: 360,
          maxWidth: "92vw",
          maxHeight: 480,
          height: 480,
          background: "#fff",
          border: "1px solid rgba(184,150,62,0.3)",
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transformOrigin: "bottom right",
          transform: open ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition:
            "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.34s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px",
            borderBottom: "1px solid rgba(184,150,62,0.2)",
          }}
        >
          <div
            className="font-display"
            style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 200, fontSize: "1.3rem", letterSpacing: "0.06em", color: "#1a1a1a" }}
          >
            <Diamond size="0.7em" />
            DEMO İNŞAAT AI
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Kapat"
            style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, fontSize: "1.4rem", lineHeight: 1, fontWeight: 200, padding: 4 }}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "18px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
          {messages.map((m, i) => (
            <div
              key={i}
              className="ai-msg-in"
              style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}
            >
              {m.from === "bot" && (
                <span
                  style={{
                    flex: "none",
                    width: 24,
                    height: 24,
                    borderRadius: 9999,
                    border: "1px solid rgba(184,150,62,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  <Diamond size="0.65rem" />
                </span>
              )}
              <div
                className="font-body"
                style={{
                  maxWidth: "78%",
                  fontWeight: 300,
                  fontSize: "0.86rem",
                  lineHeight: 1.55,
                  padding: "10px 13px",
                  whiteSpace: "pre-line",
                  color: "#1a1a1a",
                  ...(m.from === "user"
                    ? {
                        background: "rgba(184,150,62,0.1)",
                        border: "1px solid rgba(184,150,62,0.35)",
                        borderRadius: "14px 14px 4px 14px",
                      }
                    : {
                        background: "#fff",
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "14px 14px 14px 4px",
                      }),
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <span
                style={{ flex: "none", width: 24, height: 24, borderRadius: 9999, border: "1px solid rgba(184,150,62,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Diamond size="0.65rem" />
              </span>
              <div style={{ display: "flex", gap: 5, padding: "12px 14px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "14px 14px 14px 4px" }}>
                <span className="ai-dot" style={{ animationDelay: "0s" }} />
                <span className="ai-dot" style={{ animationDelay: "0.2s" }} />
                <span className="ai-dot" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}

          {/* Quick suggestions (only at start) */}
          {messages.length <= 1 && !typing && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="font-body"
                  style={{ fontWeight: 300, fontSize: "0.74rem", letterSpacing: "0.04em", color: "#a8862f", background: "none", border: "1px solid rgba(184,150,62,0.4)", borderRadius: 9999, padding: "6px 13px", cursor: "pointer" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px 16px" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nasıl yardımcı olabilirim..."
            className="font-body"
            style={{
              flex: 1,
              fontWeight: 300,
              fontSize: "0.86rem",
              color: "#1a1a1a",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(184,150,62,0.3)",
              outline: "none",
              padding: "8px 2px",
            }}
          />
          <button
            type="submit"
            aria-label="Gönder"
            style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, fontSize: "1.3rem", lineHeight: 1, padding: "4px 2px" }}
          >
            →
          </button>
        </form>
      </div>

      {/* Closed-state button */}
      <button
        onClick={open ? () => setOpen(false) : openPanel}
        aria-label="Yapay zeka asistanı"
        className={open ? "" : "ai-pulse"}
        style={{
          width: 56,
          height: 56,
          borderRadius: 9999,
          background: "#fff",
          border: `1px solid ${GOLD}`,
          boxShadow: "0 4px 20px rgba(184,150,62,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open ? (
          <span style={{ color: GOLD, fontSize: "1.5rem", fontWeight: 200, lineHeight: 1 }}>✕</span>
        ) : (
          <span className="font-display" style={{ color: GOLD, fontWeight: 200, fontSize: "1.35rem", letterSpacing: "0.08em", lineHeight: 1 }}>
            AI
          </span>
        )}
      </button>
    </div>
  );
}
