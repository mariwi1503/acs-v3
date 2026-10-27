import type { IconName } from "@/components/icon";

export const SITE = {
  name: "Alpha Core Solution",
  legalName: "PT. Alpha Core Solution",
  url: "https://www.alphacoresolution.id",
  tagline: "Your digital service partner",
} as const;

export const CONTACT = {
  phoneDisplay: "+62 821-2999-742",
  phoneSchema: "+62-821-2999-742",
  whatsapp: "628212999742",
  email: "info@alphacoresolution.id",
  street: "Kota Wisata Blok J4 No. 38",
  area: "Gunung Putri, Bogor, Jawa Barat",
  locality: "Bogor",
  region: "Jawa Barat",
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/alphacoresolution.it" },
  { label: "Facebook", icon: "facebook", url: "https://www.facebook.com/profile.php?id=61596075774409" },
  { label: "TikTok", icon: "tiktok", url: "https://www.tiktok.com/@alphacoresolution.it" },
] as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mailtoUrl = (subject?: string, body?: string) => {
  const params = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean);
  return `mailto:${CONTACT.email}${params.length ? `?${params.join("&")}` : ""}`;
};

export const NAV_LINKS = [
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#layanan", label: "Layanan" },
  { href: "#managed", label: "Managed Service" },
  { href: "#industri", label: "Industri" },
  { href: "#klien", label: "Klien & Partner" },
] as const;

export const FOOTER_LINKS = [
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#layanan", label: "Layanan" },
  { href: "#managed", label: "Managed Service" },
  { href: "#industri", label: "Industri" },
  { href: "#klien", label: "Klien & Partner" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontak", label: "Kontak" },
] as const;

export const EXPERTISE: { icon: IconName; label: string }[] = [
  { icon: "network", label: "Network Infrastructure" },
  { icon: "server", label: "Data Center & Power" },
  { icon: "shield", label: "Security & Surveillance" },
  { icon: "chip", label: "IoT & Smart System" },
];

export const VISION =
  "Menjadi perusahaan IT dan jasa terdepan di Indonesia yang memberikan solusi inovatif untuk mendorong pertumbuhan bisnis klien.";

export const MISSIONS = [
  "Memberikan solusi IT yang cepat, tepat, dan berkelanjutan.",
  "Menyediakan layanan jasa profesional dengan standar kualitas tinggi.",
  "Membangun kemitraan jangka panjang berbasis kepercayaan.",
  "Mengembangkan SDM yang kompeten dan berintegritas.",
] as const;

export const VALUES = [
  { letter: "C", title: "Collaborative", text: "Bekerja sama untuk hasil terbaik." },
  { letter: "O", title: "Optimized", text: "Solusi efisien dan efektif." },
  { letter: "R", title: "Reliable", text: "Dapat diandalkan." },
  { letter: "E", title: "Excellence", text: "Mengejar kualitas terbaik." },
] as const;

export type Service = {
  id: string;
  /** Ilustrasi brand (navy + oranye, latar transparan) di /public/images. */
  image: string;
  title: string;
  summary: string;
  /** Teks pembuka di dialog detail. */
  detail: string;
  points: string[];
};

export type ServiceGroup = {
  id: string;
  label: string;
  actionLabel: string;
  services: Service[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "it",
    label: "Solusi Teknologi",
    actionLabel: "Jelajahi solusi",
    services: [
      {
        id: "network",
        image: "/images/networking.png",
        title: "Networking & Network Security",
        summary:
          "Bangun konektivitas bisnis melalui wired network, wireless, SD-WAN, dan infrastruktur jaringan yang aman.",
        detail: "Bangun fondasi jaringan yang terhubung dengan kebutuhan operasional perusahaan Anda.",
        points: ["Wired & wireless network", "SD-WAN dan network security", "Cabling & network peripherals"],
      },
      {
        id: "datacenter",
        image: "/images/data-center.png",
        title: "Data Center & Power System",
        summary:
          "Infrastruktur data center, perangkat pendukung, dan sistem daya untuk mendukung operasional bisnis.",
        detail: "Dukung kebutuhan infrastruktur pusat data dan sistem daya bisnis Anda.",
        points: ["Data center infrastructure", "Perangkat pendukung data center", "Power system"],
      },
      {
        id: "camera",
        image: "/images/cctv.png",
        title: "Surveillance & AI Camera",
        summary: "Solusi pemantauan melalui CCTV, analytics camera, AI camera, dan kamera berbasis IoT.",
        detail:
          "Diskusikan sistem pemantauan yang sesuai dengan karakter lokasi dan kebutuhan pengawasan Anda.",
        points: ["Surveillance camera / CCTV", "Analytics & AI camera", "IoT camera"],
      },
      {
        id: "telecom",
        image: "/images/telecomunication.png",
        title: "Telecommunication",
        summary:
          "Radio link dan konektivitas metro untuk menghubungkan lokasi serta kebutuhan komunikasi bisnis.",
        detail: "Hubungkan kebutuhan komunikasi serta konektivitas antarlokasi bisnis Anda.",
        points: ["Radio link", "Konektivitas metro"],
      },
      {
        id: "iot",
        image: "/images/smarthome.png",
        title: "IoT & Smart Building",
        summary:
          "Integrasikan smart building, smart home, dan IoT untuk ruang yang lebih cerdas dan terkoneksi.",
        detail: "Integrasikan teknologi untuk mendukung bangunan dan ruang yang lebih terkoneksi.",
        points: ["Smart building", "Smart home", "Internet of Things (IoT)"],
      },
    ],
  },
  {
    id: "jasa",
    label: "Layanan Jasa",
    actionLabel: "Jelajahi layanan",
    services: [
      {
        id: "general",
        image: "/images/office.png",
        title: "General Service",
        summary:
          "Dukungan facility management dan operasional untuk membantu kelancaran aktivitas bisnis Anda.",
        detail: "Dukungan layanan untuk membantu operasional fasilitas perusahaan.",
        points: ["Facility management", "Dukungan operasional"],
      },
      {
        id: "manpower",
        image: "/images/manpower.png",
        title: "Manpower Supply",
        summary: "Penyediaan sumber daya manusia profesional yang disesuaikan dengan kebutuhan operasional.",
        detail: "Diskusikan kebutuhan tenaga profesional untuk mendukung operasional Anda.",
        points: ["Penyediaan SDM profesional"],
      },
      {
        id: "project",
        image: "/images/project-management.png",
        title: "Project Management",
        summary:
          "Pendampingan proyek IT dan non-IT, dari penyelarasan kebutuhan hingga koordinasi pelaksanaan.",
        detail: "Pendampingan untuk menyelaraskan kebutuhan dan pelaksanaan proyek Anda.",
        points: ["Pendampingan proyek IT", "Pendampingan proyek non-IT"],
      },
      {
        id: "procurement",
        image: "/images/operational.png",
        title: "Procurement",
        summary:
          "Pengadaan barang IT dan non-IT untuk melengkapi kebutuhan proyek serta operasional perusahaan.",
        detail: "Lengkapi kebutuhan barang untuk mendukung proyek dan aktivitas bisnis Anda.",
        points: ["Pengadaan barang IT", "Pengadaan barang non-IT"],
      },
    ],
  },
];

export const MANAGED_SERVICE_TITLE = "Network Managed Service";

export const MANAGED_ITEMS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "server",
    title: "Managed Colocation",
    text: "Kolokasi di pusat data Indonesia dan ASEAN, termasuk penyiapan, instalasi, dan pemeliharaan.",
  },
  {
    icon: "cloud",
    title: "Managed SD-WAN",
    text: "Perangkat SD-WAN dan konektivitas last-mile dengan pemantauan serta pengelolaan harian.",
  },
  {
    icon: "monitor",
    title: "Remote Network Monitoring",
    text: "Pemantauan access point, switch, dan router.",
  },
  {
    icon: "network",
    title: "Enterprise Network Management",
    text: "Pemantauan di tempat (onsite) dan jarak jauh (offsite), dukungan helpdesk, serta layanan teknik.",
  },
  {
    icon: "people",
    title: "Engineer On Site",
    text: "Dukungan teknisi di tempat sesuai kebutuhan.",
  },
  {
    icon: "globe",
    title: "IP Address Supply",
    text: "Konsultasikan kebutuhan alamat IP sebagai bagian dari perencanaan jaringan bisnis Anda.",
  },
];

export const INDUSTRIES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "hotel",
    title: "Hospitality",
    text: "Konektivitas dan smart system untuk mendukung pengalaman tamu serta operasional.",
  },
  {
    icon: "government",
    title: "Pemerintahan & Layanan Publik",
    text: "Infrastruktur dan jaringan untuk kebutuhan layanan publik yang terkoneksi.",
  },
  {
    icon: "factory",
    title: "Manufaktur",
    text: "Jaringan, surveillance, dan IoT untuk mendukung kebutuhan fasilitas industri.",
  },
  {
    icon: "school",
    title: "Pendidikan",
    text: "Infrastruktur digital untuk lingkungan belajar dan administrasi yang terhubung.",
  },
];

export const WHY_US = [
  { title: "Modern", text: "Menggunakan teknologi terbaru." },
  { title: "Minimalis", text: "Proses kerja sederhana, hasil maksimal." },
  { title: "Fleksibel", text: "Layanan bisa disesuaikan kebutuhan klien." },
  { title: "Terpercaya", text: "Tim berpengalaman & support 24/7." },
] as const;

export type Logo = { name: string; src: string; width: number; height: number };

export const CLIENTS: Logo[] = [
  { name: "Haus!", src: "/images/clients/haus.png", width: 157, height: 252 },
  { name: "DPUPR", src: "/images/clients/dpupr.png", width: 396, height: 526 },
  { name: "PT Andrea Berkat Abadi", src: "/images/clients/andrea-berkat-abadi.png", width: 199, height: 160 },
  { name: "Woodland Park Residence", src: "/images/clients/woodland-park.png", width: 554, height: 180 },
  { name: "Springwood Residence", src: "/images/clients/springwood.png", width: 304, height: 297 },
];

const partner = (name: string, file: string, width: number, height: number): Logo => ({
  name,
  src: `/images/partners/${file}.png`,
  width,
  height,
});

export const PARTNER_GROUPS: { title: string; partners: Logo[] }[] = [
  {
    title: "Networking",
    partners: [
      partner("Cisco", "cisco", 202, 111),
      partner("Aruba", "aruba", 384, 188),
      partner("Ruijie", "ruijie", 216, 70),
      partner("6COM", "6com", 208, 69),
      partner("MikroTik", "mikrotik", 216, 59),
      partner("Juniper Networks", "juniper", 470, 136),
      partner("Raisecom", "raisecom", 231, 44),
      partner("TP-Link", "tp-link", 288, 110),
    ],
  },
  {
    title: "Server & Storage",
    partners: [
      partner("Dell", "dell", 320, 102),
      partner("Supermicro", "supermicro", 518, 267),
      partner("Cisco", "cisco", 202, 111),
      partner("Lenovo", "lenovo", 295, 105),
    ],
  },
  {
    title: "Security & Access Control",
    partners: [
      partner("Hikvision", "hikvision", 309, 47),
      partner("ZKTeco", "zkteco", 234, 84),
      partner("Uniview", "unv", 252, 134),
      partner("Dahua", "dahua", 409, 128),
    ],
  },
  {
    title: "Audio System",
    partners: [partner("TOA", "toa", 354, 186)],
  },
];

export const FAQS = [
  {
    q: "Apa saja layanan Alpha Core Solution?",
    a: "Kami menyediakan networking dan network security, data center dan power system, surveillance dan AI camera, telekomunikasi, IoT, serta smart building. Layanan jasa mencakup general service, manpower supply, project management, dan procurement.",
  },
  {
    q: "Apa itu Network Managed Service?",
    a: "Network Managed Service adalah layanan pengelolaan infrastruktur jaringan bisnis. Cakupannya dapat meliputi monitoring perangkat, pengelolaan SD-WAN, colocation, dukungan helpdesk, dan engineer onsite sesuai lingkup yang disepakati.",
  },
  {
    q: "Di mana lokasi Alpha Core Solution?",
    a: `Kami berlokasi di ${CONTACT.street}, ${CONTACT.area}. Hubungi tim kami untuk membahas lokasi proyek, cakupan implementasi, dan kebutuhan layanan Anda.`,
  },
  {
    q: "Bagaimana cara meminta penawaran proyek?",
    a: "Sampaikan nama perusahaan, jenis layanan, lokasi, dan gambaran kebutuhan melalui formulir WhatsApp atau email kami. Tim Alpha Core Solution akan menindaklanjuti untuk memperjelas lingkup serta kebutuhan penawaran.",
  },
] as const;

/** Pilihan di formulir kontak, mengikuti urutan layanan di halaman. */
export const INQUIRY_OPTIONS = [
  ...SERVICE_GROUPS[0].services.map((s) => s.title),
  MANAGED_SERVICE_TITLE,
  ...SERVICE_GROUPS[1].services.map((s) => s.title),
  "Konsultasi kebutuhan lainnya",
];
