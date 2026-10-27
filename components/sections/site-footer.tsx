import { cacheLife } from "next/cache";
import { Brand, Icon } from "@/components/icon";
import { SocialLinks } from "@/components/social-links";
import { CONTACT, FOOTER_LINKS, MANAGED_SERVICE_TITLE, SERVICE_GROUPS, SITE, whatsappUrl } from "@/lib/content";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const FOOTER_SERVICES = [
  ...SERVICE_GROUPS[0].services.map((s) => s.title),
  MANAGED_SERVICE_TITLE,
  "Layanan Jasa",
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand label="Alpha Core Solution — kembali ke atas" />
            <p className="footer-tagline">
              {SITE.legalName}, perusahaan teknologi informasi dan jasa. {SITE.tagline}.
            </p>
            <SocialLinks className="footer-social" />
          </div>

          <nav className="footer-col" aria-label="Navigasi footer">
            <h2 className="label">Navigasi</h2>
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="label">Layanan</h2>
            <ul>
              {FOOTER_SERVICES.map((title) => (
                <li key={title}>
                  <a href="#layanan">{title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-contact">
            <h2 className="label">Kontak</h2>
            <ul>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <Icon name="phone" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>
                  <Icon name="mail" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <address>
                  <Icon name="pin" />
                  <span>{CONTACT.street}, {CONTACT.area}</span>
                </address>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © <CopyrightYear /> {SITE.legalName}. Seluruh hak dilindungi.
          </span>
          <span>Let&apos;s build future together.</span>
        </div>
      </div>
    </footer>
  );
}
