// Alur percakapan berbasis pilihan. Jawaban mengikuti data yang ditampilkan di situs.
import {
  CLIENTS,
  CONTACT,
  INDUSTRIES,
  MANAGED_ITEMS,
  MANAGED_SERVICE_TITLE,
  PARTNER_GROUPS,
  SERVICE_GROUPS,
  SITE,
  VALUES,
  WHY_US,
} from "@/lib/content";

export type ChatOption =
  | { label: string; next: string }
  | { label: string; whatsapp: string }
  | { label: string; href: string; external?: boolean };

export type ChatNode = { messages: string[]; options: ChatOption[] };

export const chatbot = {
  name: "Asisten ACS",
  status: "Jawaban otomatis · pilih topik",
  launcherLabel: "Buka Asisten ACS",
  teaser: "Ada pertanyaan soal layanan ACS? Saya bantu jawab.",
  restartLabel: "Menu utama",
  humanLabel: "Chat dengan tim",
  startNode: "start",
} as const;

const consult = (topic: string) => `Halo ACS, saya tertarik dengan ${topic}. Bisa dibantu konsultasinya?`;
const bullets = (items: readonly string[]) => items.map((item) => `• ${item}`).join("\n");

const serviceNodes = Object.fromEntries(
  SERVICE_GROUPS.flatMap((group) =>
    group.services.map((service): [string, ChatNode] => [
      `service-${service.id}`,
      {
        messages: [
          `${service.title}\n${service.summary}`,
          `Cakupannya:\n${bullets(service.points)}`,
        ],
        options: [
          { label: `Konsultasi ${service.title}`, whatsapp: consult(`layanan ${service.title}`) },
          { label: "Lihat di halaman", href: "#layanan" },
          { label: "Layanan lainnya", next: `services-${group.id}` },
        ],
      },
    ]),
  ),
);

const managedNodes = Object.fromEntries(
  MANAGED_ITEMS.map((item, index): [string, ChatNode] => [
    `managed-${index}`,
    {
      messages: [`${item.title}\n${item.text}`],
      options: [
        { label: `Konsultasi ${item.title}`, whatsapp: consult(`layanan ${item.title}`) },
        { label: "Lihat di halaman", href: "#managed" },
        { label: "Managed service lainnya", next: "services-managed" },
      ],
    },
  ]),
);

const industryNodes = Object.fromEntries(
  INDUSTRIES.map((industry, index): [string, ChatNode] => [
    `industry-${index}`,
    {
      messages: [
        `${industry.title}\n${industry.text}`,
        "Ceritakan kebutuhan di lokasi Anda agar tim kami dapat membantu memetakan solusi yang sesuai.",
      ],
      options: [
        { label: "Konsultasi untuk sektor ini", whatsapp: consult(`solusi IT untuk sektor ${industry.title}`) },
        { label: "Lihat semua layanan", next: "services" },
        { label: "Industri lainnya", next: "industries" },
      ],
    },
  ]),
);

const partners = [...new Set(PARTNER_GROUPS.flatMap((group) => group.partners.map((item) => item.name)))];
const address = `${CONTACT.street}, ${CONTACT.area}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const chatNodes: Record<string, ChatNode> = {
  start: {
    messages: [
      `Halo! Saya ${chatbot.name}, asisten otomatis ${SITE.name}.`,
      "Pilih topik di bawah ini, saya bantu jawab.",
    ],
    options: [
      { label: "Apa itu ACS?", next: "about" },
      { label: "Layanan apa saja?", next: "services" },
      { label: "Industri yang dilayani", next: "industries" },
      { label: "Berapa biayanya?", next: "pricing" },
      { label: "Kontak & alamat", next: "contact" },
    ],
  },
  about: {
    messages: [
      `${SITE.legalName} adalah perusahaan di bidang Teknologi Informasi dan Jasa. Kami membantu bisnis berkembang melalui solusi digital yang efisien, aman, dan sesuai kebutuhan.`,
      `Kami bekerja dengan nilai CORE: ${VALUES.map((value) => value.title).join(", ")}.`,
    ],
    options: [
      { label: "Kenapa memilih ACS?", next: "why" },
      { label: "Siapa klien ACS?", next: "clients" },
      { label: "Layanan apa saja?", next: "services" },
    ],
  },
  why: {
    messages: [
      `Keunggulan kami:\n${bullets(WHY_US.map((item) => `${item.title}: ${item.text}`))}`,
    ],
    options: [
      { label: "Siapa klien ACS?", next: "clients" },
      { label: "Lihat layanan", next: "services" },
      { label: "Konsultasi sekarang", whatsapp: consult("layanan IT ACS") },
    ],
  },
  clients: {
    messages: [
      `Beberapa klien kami:\n${bullets(CLIENTS.map((client) => client.name))}`,
      `Kami juga didukung brand teknologi, di antaranya ${partners.slice(0, 6).join(", ")}.`,
    ],
    options: [
      { label: "Lihat klien & partner", href: "#klien" },
      { label: "Lihat layanan", next: "services" },
      { label: "Konsultasi sekarang", whatsapp: consult("layanan IT ACS") },
    ],
  },
  services: {
    messages: ["Layanan kami mencakup solusi teknologi, layanan jasa, dan Network Managed Service. Mana yang ingin Anda ketahui?"],
    options: [
      ...SERVICE_GROUPS.map((group) => ({ label: group.label, next: `services-${group.id}` })),
      { label: MANAGED_SERVICE_TITLE, next: "services-managed" },
    ],
  },
  ...Object.fromEntries(
    SERVICE_GROUPS.map((group): [string, ChatNode] => [
      `services-${group.id}`,
      {
        messages: [`${group.label} mencakup pilihan berikut. Pilih layanan untuk melihat detailnya:`],
        options: group.services.map((service) => ({ label: service.title, next: `service-${service.id}` })),
      },
    ]),
  ),
  "services-managed": {
    messages: [`${MANAGED_SERVICE_TITLE} membantu pengelolaan infrastruktur jaringan bisnis. Pilih layanan untuk detailnya:`],
    options: MANAGED_ITEMS.map((item, index) => ({ label: item.title, next: `managed-${index}` })),
  },
  industries: {
    messages: [`Kami melayani ${INDUSTRIES.length} sektor utama. Sektor Anda yang mana?`],
    options: INDUSTRIES.map((industry, index) => ({ label: industry.title, next: `industry-${index}` })),
  },
  pricing: {
    messages: [
      "Biaya menyesuaikan kebutuhan, skala, dan lokasi proyek Anda, sehingga penawaran dibuat berdasarkan lingkup pekerjaan.",
      "Ceritakan kebutuhan Anda lewat WhatsApp, tim kami akan membantu menyiapkan penawaran.",
    ],
    options: [
      { label: "Minta penawaran", whatsapp: "Halo ACS, saya ingin meminta penawaran untuk kebutuhan perusahaan saya." },
      { label: "Lihat layanan dulu", next: "services" },
    ],
  },
  contact: {
    messages: [
      `Hubungi kami melalui:\n• WhatsApp: ${CONTACT.phoneDisplay}\n• Email: ${CONTACT.email}`,
      `Kantor kami:\n${address}`,
    ],
    options: [
      { label: "Chat via WhatsApp", whatsapp: consult("layanan ACS") },
      { label: "Kirim email", href: `mailto:${CONTACT.email}` },
      { label: "Buka Google Maps", href: mapsUrl, external: true },
    ],
  },
  ...serviceNodes,
  ...managedNodes,
  ...industryNodes,
};
