import { Icon } from "@/components/icon";
import { INDUSTRIES, WHY_US } from "@/lib/content";

export function Industries() {
  return (
    <section className="section industry" id="industri" aria-labelledby="industri-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">04 / Industri yang Kami Layani</p>
            <h2 id="industri-title">
              Teknologi beradaptasi.
              <br />
              <span className="muted">Bisnis melaju.</span>
            </h2>
          </div>
          <p>
            Kami melayani berbagai sektor, menggunakan skala dan efisiensi untuk memberikan hasil yang
            berkualitas tinggi dan hemat biaya. Kesuksesan global kami adalah bukti nilai yang kami bawa ke bisnis
            Anda.
          </p>
        </div>

        <p className="industry-intro reveal">
          Alpha Core Solution mengatasi tantangan industri, dari tekanan pasar hingga biaya tinggi, dengan
          solusi inovatif yang disesuaikan dengan tujuan Anda. Didukung oleh insinyur berpengalaman, kami
          menawarkan solusi komprehensif di semua industri.
        </p>

        <div className="industry-grid reveal">
          {INDUSTRIES.map((item) => (
            <article key={item.title} className="industry-card">
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="process reveal">
          <div>
            <h3>Mengapa memilih kami?</h3>
            <p>Modern dalam pendekatan, sederhana dalam proses, dan fleksibel mengikuti kebutuhan Anda.</p>
          </div>
          <ol className="steps">
            {WHY_US.map((item, i) => (
              <li key={item.title} className="step">
                <span className="step-no" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <b>{item.title}</b>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
