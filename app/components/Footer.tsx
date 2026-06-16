import { NAV_LINKS } from "../lib/site";

const SOCIAL = [
  {
    name: "Instagram",
    path: "M16 11a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5-9.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM26 11a6 6 0 0 0-6-6h-8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-8Zm-2 8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8Z",
  },
  {
    name: "LinkedIn",
    path: "M9 12H6v14h3V12Zm-1.5-5A1.7 1.7 0 1 0 7.5 10.4 1.7 1.7 0 0 0 7.5 7ZM26 18c0-3.3-1.8-5-4.4-5a3.8 3.8 0 0 0-3.4 1.8V12H12v14h3v-7c0-1.5.6-2.6 2-2.6s1.9 1.1 1.9 2.6v7h3v-8Z",
  },
  {
    name: "X",
    path: "M20.5 7h2.7l-5.9 6.7L24 26h-5.4l-4.2-5.5L9.5 26H6.8l6.3-7.2L7 7h5.5l3.8 5 4.2-5Zm-1 17h1.5L11.5 8.5H9.9L19.5 24Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian text-ivory">
      <div className="mx-auto max-w-[1300px] px-6 py-20 md:px-12">
        {/* Logo */}
        <div className="flex flex-col items-center text-center">
          <a
            href="#hero"
            className="font-display flex items-center gap-3 text-3xl tracking-[0.18em]"
          >
            <span>DEMO</span>
            <span className="inline-block h-2 w-2 rotate-45 bg-gold" />
            <span>İNŞAAT</span>
          </a>
          <p className="mt-5 max-w-md font-light text-ivory/55">
            Türkiye&apos;nin en prestijli yapılarını, çeyrek asırlık deneyimle
            inşa ediyoruz.
          </p>
        </div>

        <div className="mt-16 h-px w-full bg-ivory/10" />

        {/* Columns */}
        <div className="mt-14 grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <div className="eyebrow mb-5">Menü</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-light text-ivory/65 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5">İletişim</div>
            <ul className="space-y-3 font-light text-ivory/65">
              <li>Mahmutbey Mah. No:12</li>
              <li>Bağcılar / İstanbul</li>
              <li>+90 212 000 00 00</li>
              <li>info@demoinsaat.com</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5">Takip Edin</div>
            <div className="flex justify-center gap-4 sm:justify-start">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center border border-ivory/15 transition-colors hover:border-gold"
                >
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="#c9a84c">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs tracking-[0.15em] text-ivory/45 sm:flex-row">
          <span>© {new Date().getFullYear()} DEMO İNŞAAT. Tüm hakları saklıdır.</span>
          <span className="text-gold/80">Designed by ALY Ajans</span>
        </div>
      </div>
    </footer>
  );
}
