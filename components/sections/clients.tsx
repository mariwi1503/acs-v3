import Image from "next/image";
import { CLIENTS, PARTNER_GROUPS, type Logo } from "@/lib/content";

function LogoTile({ logo, className }: { logo: Logo; className: string }) {
  return (
    <li className={className}>
      <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} />
    </li>
  );
}

export function Clients() {
  return (
    <section className="section clients" id="klien" aria-labelledby="klien-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">05 / Klien &amp; Partner</p>
            <h2 id="klien-title">
              Dipercaya klien.
              <br />
              <span className="muted">Didukung brand global.</span>
            </h2>
          </div>
          <p>
            Bisnis, pengembang hunian, dan instansi pemerintah yang telah bekerja bersama kami, serta mitra
            teknologi di balik setiap solusi.
          </p>
        </div>

        <h3 className="label logo-group-title">Klien kami</h3>
        <ul className="client-grid reveal" aria-label="Klien kami">
          {CLIENTS.map((logo) => (
            <LogoTile key={logo.name} logo={logo} className="logo-tile client-tile" />
          ))}
        </ul>

        <div className="partner-groups reveal">
          {PARTNER_GROUPS.map((group) => (
            <div key={group.title} className="partner-group">
              <h3 className="label logo-group-title">Partner {group.title}</h3>
              <ul className="partner-grid" aria-label={`Partner ${group.title}`}>
                {group.partners.map((logo) => (
                  <LogoTile key={logo.name} logo={logo} className="logo-tile" />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
