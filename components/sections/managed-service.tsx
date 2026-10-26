import { Fragment } from "react";
import { Icon, type IconName } from "@/components/icon";
import { MANAGED_ITEMS, MANAGED_SERVICE_TITLE } from "@/lib/content";
import { InquiryLink } from "./inquiry-link";

const DIAGRAM_NODES: { icon: IconName; label: string }[] = [
  { icon: "building", label: "Akses bisnis" },
  { icon: "cloud", label: "SD-WAN" },
  { icon: "server", label: "Data center" },
];

export function ManagedService() {
  return (
    <section className="section managed" id="managed" aria-labelledby="managed-title">
      <div className="wrap managed-grid">
        <div className="managed-copy reveal">
          <p className="eyebrow">03 / {MANAGED_SERVICE_TITLE}</p>
          <h2 id="managed-title">
            Anda fokus bertumbuh.
            <br />
            <span className="muted">Kami kelola jaringannya.</span>
          </h2>
          <p>
            Dari pemantauan jarak jauh hingga teknisi di lokasi, kelola infrastruktur jaringan perusahaan
            bersama partner yang memahami kebutuhan operasional Anda.
          </p>

          <div
            className="network-diagram"
            role="img"
            aria-label="Ilustrasi konektivitas akses bisnis melalui SD-WAN menuju data center"
          >
            <div className="diagram-head">
              <span>CONNECTED BUSINESS</span>
              <span className="live">
                <span className="status-dot" /> TERINTEGRASI
              </span>
            </div>
            <div className="network-map">
              {DIAGRAM_NODES.map((node, i) => (
                <Fragment key={node.label}>
                  {i > 0 && <span className="network-path" />}
                  <div className="network-node">
                    <Icon name={node.icon} />
                    {node.label}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <InquiryLink service={MANAGED_SERVICE_TITLE}>
            Temukan layanan yang tepat <span aria-hidden="true">↗</span>
          </InquiryLink>
        </div>

        <div className="managed-list reveal">
          {MANAGED_ITEMS.map((item) => (
            <article key={item.title} className="managed-item">
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
