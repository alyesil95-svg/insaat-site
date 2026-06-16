import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEMO İNŞAAT — Türkiye'nin En Prestijli Yapıları",
  description:
    "DEMO İNŞAAT — İstanbul, İzmir ve Ankara'da prestijli konut, ticari, endüstriyel ve restorasyon projeleri inşa ediyoruz. 25 yıllık deneyim, 500+ tamamlanan proje.",
  keywords: [
    "inşaat",
    "lüks inşaat",
    "İstanbul inşaat",
    "İzmir inşaat",
    "rezidans",
    "ticari yapı",
    "DEMO İNŞAAT",
  ],
  openGraph: {
    title: "DEMO İNŞAAT",
    description: "Türkiye'nin En Prestijli Yapılarını İnşa Ediyoruz",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
