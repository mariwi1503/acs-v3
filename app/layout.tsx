import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/content";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const description =
  "PT Alpha Core Solution: partner IT & jasa di Bogor untuk networking, data center & power system, CCTV & AI camera, telekomunikasi, IoT, dan network managed service bagi bisnis di Indonesia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Alpha Core Solution | Solusi IT, Jaringan & Data Center di Bogor",
    template: "%s | Alpha Core Solution",
  },
  description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE.name,
    url: "/",
    title: "Alpha Core Solution — Your Digital Service Partner",
    description:
      "Solusi networking, data center, CCTV & AI camera, IoT, dan network managed service untuk bisnis di Bogor dan Indonesia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Core Solution | Solusi IT & Jaringan untuk Bisnis",
    description: "Partner infrastruktur jaringan, data center, keamanan, dan IoT untuk bisnis Anda.",
  },
};

export const viewport: Viewport = {
  themeColor: "#060b16",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
