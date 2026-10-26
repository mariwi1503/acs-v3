import { CONTACT, FAQS, MANAGED_ITEMS, MANAGED_SERVICE_TITLE, SERVICE_GROUPS, SITE, SOCIAL_LINKS } from "./content";

const orgId = `${SITE.url}/#organization`;

const offer = (name: string, description: string) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Service", name, description, provider: { "@id": orgId } },
});

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // ProfessionalService adalah turunan LocalBusiness: cocok untuk pencarian lokal (Bogor).
      "@type": "ProfessionalService",
      "@id": orgId,
      name: SITE.legalName,
      alternateName: SITE.name,
      slogan: SITE.tagline,
      url: `${SITE.url}/`,
      logo: `${SITE.url}/images/logo2.png`,
      image: `${SITE.url}/opengraph-image`,
      description:
        "Perusahaan teknologi informasi dan jasa yang menyediakan solusi networking, data center & power system, surveillance & AI camera, telekomunikasi, IoT & smart building, serta network managed service.",
      telephone: CONTACT.phoneSchema,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${CONTACT.street}, Gunung Putri`,
        addressLocality: CONTACT.locality,
        addressRegion: CONTACT.region,
        addressCountry: "ID",
      },
      areaServed: [
        { "@type": "City", name: "Bogor" },
        { "@type": "Country", name: "Indonesia" },
      ],
      knowsAbout: [
        "Networking",
        "Network Security",
        "SD-WAN",
        "Data Center",
        "Power System",
        "CCTV",
        "AI Camera",
        "Telekomunikasi",
        "IoT",
        "Smart Building",
        "Network Managed Service",
      ],
      sameAs: SOCIAL_LINKS.map((s) => s.url).filter(Boolean),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Alpha Core Solution",
        itemListElement: [
          ...SERVICE_GROUPS.map((group) => ({
            "@type": "OfferCatalog",
            name: group.label,
            itemListElement: group.services.map((s) => offer(s.title, s.summary)),
          })),
          {
            "@type": "OfferCatalog",
            name: MANAGED_SERVICE_TITLE,
            itemListElement: MANAGED_ITEMS.map((item) => offer(item.title, item.text)),
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: "id-ID",
      publisher: { "@id": orgId },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

/** JSON aman untuk disisipkan ke <script>: `<` di-escape agar tidak bisa menutup tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
