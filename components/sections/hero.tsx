import { Icon } from "@/components/icon";
import { HeroCore } from "@/components/motion/hero-core";
import { EXPERTISE, VALUES } from "@/lib/content";

// Posisi kartu searah jarum jam mengelilingi chip CORE: C kiri atas, O kanan atas, R kanan bawah, E kiri bawah.
const FLOAT_POSITIONS = ["float-a", "float-b", "float-c", "float-d"];

export function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Your digital service partner</p>
            <h1 id="hero-title">
              Solusi IT &amp; jaringan untuk lompatan <span className="accent">bisnis Anda.</span>
            </h1>
            <p className="hero-lead">
              Partner teknologi informasi dan jasa dari Bogor untuk bisnis di Indonesia: networking, data
              center, CCTV &amp; AI camera, hingga smart system yang efisien, aman, dan sesuai kebutuhan.
            </p>
            <div className="hero-buttons">
              <a href="#kontak" className="btn primary">
                Mulai Konsultasi <span className="arrow">↗</span>
              </a>
              <a href="#layanan" className="btn secondary">
                Lihat Layanan <span className="arrow">↓</span>
              </a>
            </div>
            <ul className="hero-note" aria-label="Keunggulan layanan">
              <li>
                <span className="status-dot" aria-hidden="true" /> Solusi sesuai kebutuhan
              </li>
              <li>
                <span className="status-dot" aria-hidden="true" /> Tim berpengalaman &amp; support 24/7
              </li>
            </ul>
          </div>

          <div className="hero-art">
            <div className="core-ambient" aria-hidden="true" />
            <HeroCore />
            <div className="core-chip" aria-hidden="true">
              <div className="chip-inner">
                <span>CORE</span>
              </div>
            </div>
            <ul aria-label="Nilai perusahaan: CORE">
              {VALUES.map((v, i) => (
                <li key={v.letter} className={`floating ${FLOAT_POSITIONS[i]}`}>
                  <span className="floating-letter" aria-hidden="true">
                    {v.letter}
                  </span>
                  <div>
                    <b>{v.title}</b>
                    <small>{v.text}</small>
                  </div>
                </li>
              ))}
            </ul>
            <div className="art-caption" aria-hidden="true">
              THE CORE OF YOUR DIGITAL FUTURE
            </div>
          </div>
        </div>
      </section>

      <nav className="expertise" aria-label="Bidang keahlian">
        <ul className="wrap">
          {EXPERTISE.map((item) => (
            <li key={item.label}>
              <a className="item" href="#layanan">
                <Icon name={item.icon} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
