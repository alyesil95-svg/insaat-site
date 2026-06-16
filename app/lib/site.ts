// Central content for DEMO İNŞAAT — single source of truth.

export type Project = {
  id: number;
  name: string;
  location: string;
  year: string;
  type: string;
  sqm: string;
  status: string;
  progress: number; // 0-100
  image: string;
};

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Maslak Tower",
    location: "İstanbul",
    year: "2024",
    type: "Ticari",
    sqm: "45.000 m²",
    status: "Tamamlandı",
    progress: 100,
    image: img("photo-1486406146926-c627a92ad1ab"),
  },
  {
    id: 2,
    name: "Alsancak Rezidans",
    location: "İzmir",
    year: "2023",
    type: "Konut",
    sqm: "28.000 m²",
    status: "Tamamlandı",
    progress: 100,
    image: img("photo-1545324418-cc1a3fa10c00"),
  },
  {
    id: 3,
    name: "Bornova AVM",
    location: "İzmir",
    year: "2023",
    type: "Ticari",
    sqm: "62.000 m²",
    status: "Tamamlandı",
    progress: 100,
    image: img("photo-1519567241046-7f570eee3ce6"),
  },
  {
    id: 4,
    name: "Karşıyaka Konut",
    location: "İzmir",
    year: "2024",
    type: "Konut",
    sqm: "18.000 m²",
    status: "Devam Ediyor",
    progress: 72,
    image: img("photo-1512917774080-9991f1c4c750"),
  },
  {
    id: 5,
    name: "Narlıdere Villa",
    location: "İzmir",
    year: "2022",
    type: "Villa",
    sqm: "8.500 m²",
    status: "Tamamlandı",
    progress: 100,
    image: img("photo-1600585154340-be6161a56a0c"),
  },
  {
    id: 6,
    name: "Çiğli Sanayi",
    location: "İzmir",
    year: "2024",
    type: "Endüstriyel",
    sqm: "35.000 m²",
    status: "Devam Ediyor",
    progress: 48,
    image: img("photo-1565008447742-97f6f38c985c"),
  },
];

export type Service = {
  no: string;
  title: string;
  desc: string;
  image: string;
};

export const SERVICES: Service[] = [
  {
    no: "01",
    title: "Konut İnşaatı",
    desc: "Lüks rezidanslardan müstakil villalara — yaşam alanlarını sanata dönüştüren, insan ölçeğinde tasarlanmış konut projeleri.",
    image: img("photo-1545324418-cc1a3fa10c00"),
  },
  {
    no: "02",
    title: "Ticari Yapılar",
    desc: "Plazalar, alışveriş merkezleri ve ofis kuleleri. Şehirlerin siluetini belirleyen, prestijli ticari mimari.",
    image: img("photo-1486406146926-c627a92ad1ab"),
  },
  {
    no: "03",
    title: "Endüstriyel Tesisler",
    desc: "Fabrikalar, lojistik üsleri ve üretim tesisleri. Verimliliği ve mühendislik hassasiyetini önceleyen geniş ölçekli yapılar.",
    image: img("photo-1565008447742-97f6f38c985c"),
  },
  {
    no: "04",
    title: "Restorasyon & Renovasyon",
    desc: "Tarihi dokuyu geleceğe taşıyan, mevcut yapıları yeniden hayata kavuşturan özenli restorasyon ve yenileme çalışmaları.",
    image: img("photo-1503387762-592deb58ef4e"),
  },
];

export const STATS = [
  { value: 25, suffix: "+", label: "Yıl Deneyim" },
  { value: 500, suffix: "+", label: "Tamamlanan Proje" },
  { value: 50, suffix: "+", label: "Ödül" },
  { value: 10000, suffix: "+", label: "Mutlu Müşteri" },
];

export const REFERENCES = [
  "Koç Holding",
  "Sabancı",
  "Türk Telekom",
  "Garanti BBVA",
  "Akbank",
];

export const TESTIMONIALS = [
  {
    quote:
      "DEMO İnşaat ile çalışmak, bir yapıyı değil bir vizyonu inşa etmekti. Zamanında teslimat ve kusursuz işçilik.",
    name: "Mehmet Aydın",
    role: "Yönetim Kurulu Başkanı, Aydın Group",
  },
  {
    quote:
      "Detaylara gösterdikleri özen olağanüstü. Projemizin her aşamasında şeffaf ve profesyonel bir iletişim sunuldu.",
    name: "Selin Kaya",
    role: "Genel Müdür, Kaya Yatırım",
  },
  {
    quote:
      "İzmir'deki en prestijli projelerimizi onlara emanet ettik. Sonuç, beklentilerimizin çok ötesinde bir kaliteydi.",
    name: "Cem Demir",
    role: "Kurucu Ortak, Demir Holding",
  },
];

export const WHY_US = [
  {
    title: "Kalite",
    desc: "Uluslararası standartlarda malzeme ve işçilik. Taviz vermeden, en yüksek kaliteyi her metrekareye işliyoruz.",
  },
  {
    title: "Zamanında Teslimat",
    desc: "Söz verdiğimiz tarihte, eksiksiz teslim. Planlama disiplinimiz projelerinizin güvencesidir.",
  },
  {
    title: "Şeffaf Fiyatlandırma",
    desc: "Sürprizsiz, net ve anlaşılır bütçeleme. Her kalemin hesabını açıkça paylaşıyoruz.",
  },
  {
    title: "25 Yıl Garantili İşçilik",
    desc: "İnşa ettiğimiz her yapının arkasında çeyrek asırlık garanti taahhüdümüz var.",
  },
  {
    title: "7/24 Destek",
    desc: "Teslimat sonrası da yanınızdayız. Kesintisiz teknik destek ekibimizle her an ulaşılabiliriz.",
  },
];

export const NAV_LINKS = [
  { label: "ANA SAYFA", href: "#hero" },
  { label: "PROJELERİMİZ", href: "#projeler" },
  { label: "HİZMETLER", href: "#hizmetler" },
  { label: "HAKKIMIZDA", href: "#rakamlar" },
  { label: "REFERANSLAR", href: "#referanslar" },
  { label: "İLETİŞİM", href: "#iletisim" },
];

export const PROJECT_TYPES = [
  "Konut",
  "Ticari",
  "Endüstriyel",
  "Villa",
  "Restorasyon",
];
