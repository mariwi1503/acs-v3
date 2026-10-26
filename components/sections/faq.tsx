import { FAQS } from "@/lib/content";

export function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="reveal">
          <p className="eyebrow">06 / Pertanyaan Umum</p>
          <h2 id="faq-title">
            Sebelum kita
            <br />
            <span className="muted">mulai terhubung.</span>
          </h2>
          <p className="intro">
            Kenali layanan kami dan langkah awal untuk mendiskusikan kebutuhan perusahaan Anda.
          </p>
        </div>
        <div className="reveal">
          {FAQS.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

