import { MISSIONS, VISION } from "@/lib/content";

export function About() {
  return (
    <section className="section about" id="tentang" aria-labelledby="tentang-title">
      <div className="wrap">
        <div className="about-grid reveal">
          <div>
            <p className="eyebrow">01 / Tentang Alpha Core</p>
            <h2 id="tentang-title">
              Teknologi yang tepat.
              <br />
              <span className="muted">Dampak yang nyata.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              PT. Alpha Core Solution adalah perusahaan yang bergerak di bidang Teknologi Informasi dan Jasa.
              Kami hadir untuk membantu bisnis berkembang melalui solusi digital yang efisien, aman, dan
              sesuai kebutuhan.
            </p>
            <p>
              Dengan tim profesional dan semangat inovasi, kami berkomitmen menjadi partner terpercaya dalam
              transformasi digital dan layanan pendukung bisnis Anda.
            </p>
            <a className="text-link" href="#kontak">
              Kenali kebutuhan bisnis Anda bersama kami <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="vision-mission reveal">
          <div className="vision">
            <h3 className="label">Visi</h3>
            <p>{VISION}</p>
          </div>
          <div className="mission">
            <h3 className="label">Misi</h3>
            <ol>
              {MISSIONS.map((m, i) => (
                <li key={m}>
                  <span className="mission-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
