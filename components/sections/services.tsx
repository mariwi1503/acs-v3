import { ServiceExplorer } from "./service-explorer";

export function Services() {
  return (
    <section className="section services" id="layanan" aria-labelledby="layanan-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">02 / Layanan Kami</p>
            <h2 id="layanan-title">
              Satu partner.
              <br />
              <span className="muted">Berbagai kemungkinan.</span>
            </h2>
          </div>
          <p>
            Solusi teknologi informasi dan jasa profesional yang disesuaikan dengan tantangan serta tujuan
            bisnis Anda.
          </p>
        </div>
        <ServiceExplorer />
      </div>
    </section>
  );
}
