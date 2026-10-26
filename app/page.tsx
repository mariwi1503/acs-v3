import { BackgroundMesh } from "@/components/motion/background-mesh";
import { MotionProvider } from "@/components/motion/motion-provider";
import { MotionToggle } from "@/components/motion/motion-toggle";
import { About } from "@/components/sections/about";
import { Clients } from "@/components/sections/clients";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { ManagedService } from "@/components/sections/managed-service";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { serializeJsonLd, structuredData } from "@/lib/structured-data";

export default function Home() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <a className="skip" href="#utama">
        Langsung ke konten
      </a>
      <BackgroundMesh />
      <SiteHeader />

      <div className="site">
        <main id="utama">
          <Hero />
          <About />
          <Services />
          <ManagedService />
          <Industries />
          <Clients />
          <Faq />
          <Contact />
        </main>
        <SiteFooter />
      </div>

      <MotionToggle />
    </MotionProvider>
  );
}
