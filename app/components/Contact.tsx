"use client";

import { useState } from "react";
import { PROJECT_TYPES } from "../lib/site";

const FIELD =
  "w-full border-0 border-b border-ink/20 bg-transparent py-3 text-ink placeholder-ink/35 outline-none transition-colors focus:border-gold";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="iletisim" className="bg-ivory">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Architectural image */}
        <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
            alt="DEMO İnşaat"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 text-white md:p-14">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">İletişim</span>
            </div>
            <h2
              className="font-display mt-5"
              style={{
                fontWeight: 300,
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                lineHeight: 1.05,
              }}
            >
              Bir Sonraki<br />Eserinizi Konuşalım
            </h2>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-20 md:px-16 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-xl">
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <input className={FIELD} placeholder="Ad Soyad" required />
              <input className={FIELD} placeholder="Şirket" />
              <input className={FIELD} placeholder="Telefon" type="tel" />
              <input className={FIELD} placeholder="Email" type="email" required />
              <select className={`${FIELD} text-ink/70`} defaultValue="" required>
                <option value="" disabled>
                  Proje Türü
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="sm:col-span-2">
                <textarea
                  className={FIELD}
                  placeholder="Mesajınız"
                  rows={3}
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-gold py-4 text-sm tracking-[0.25em] text-white transition-all duration-300 hover:bg-gold-deep disabled:opacity-60 sm:w-auto sm:px-14"
                  disabled={sent}
                >
                  {sent ? "TEŞEKKÜRLER ✓" : "TEKLİF AL"}
                </button>
              </div>
            </form>

            {/* Contact details */}
            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-ink/10 pt-10 sm:grid-cols-3">
              <Info label="ADRES" value="Mahmutbey Mah. No:12 Bağcılar / İstanbul" />
              <Info label="TELEFON" value="+90 212 000 00 00" />
              <Info label="EMAIL" value="info@demoinsaat.com" />
            </div>

            {/* Map placeholder */}
            <div className="mt-10 h-44 w-full overflow-hidden border border-ink/10">
              <iframe
                title="Harita"
                className="h-full w-full grayscale"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=28.78%2C41.0%2C29.0%2C41.1&layer=mapnik"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[0.65rem] tracking-[0.25em] text-gold-deep">
        {label}
      </div>
      <div className="mt-2 text-sm font-light leading-relaxed text-ink/70">
        {value}
      </div>
    </div>
  );
}
