import { Icon } from "@/components/icon";
import { CONTACT, mailtoUrl, whatsappUrl } from "@/lib/content";
import { InquiryForm } from "./inquiry-form";

export function Contact() {
  return (
    <section className="section contact" id="kontak" aria-labelledby="kontak-title">
      <div className="wrap contact-grid">
        <div className="contact-copy reveal">
          <p className="eyebrow">07 / Let&apos;s Build Future Together</p>
          <h2 id="kontak-title">
            Masa depan digital
            <br />
            dimulai dari
            <br />
            <span className="accent">satu percakapan.</span>
          </h2>
          <p>
            Transformasi digital bukan lagi pilihan, melainkan kunci keunggulan kompetitif. Bersama Alpha Core
            Solution, wujudkan efisiensi, inovasi, dan skalabilitas bisnis masa depan Anda melalui solusi
            teknologi yang tepat sasaran. Hubungi kami hari ini dan mulailah langkah awal kesuksesan digital
            Anda.
          </p>

          {/* Dua jalur kontak dengan kegunaan yang jelas agar pengunjung tidak perlu menebak. */}
          <div className="channels">
            <a
              className="channel channel-wa"
              href={whatsappUrl("Halo tim Alpha Core Solution, saya ingin berkonsultasi.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="phone" />
              <span className="channel-body">
                <small>Tanya cepat &amp; konsultasi</small>
                <b>WhatsApp {CONTACT.phoneDisplay}</b>
                <span>Pertanyaan awal, jadwal survei lokasi, atau kebutuhan mendesak.</span>
              </span>
              <span className="channel-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="channel channel-mail" href={mailtoUrl("Permintaan Penawaran")}>
              <Icon name="mail" />
              <span className="channel-body">
                <small>Penawaran resmi &amp; dokumen</small>
                <b>{CONTACT.email}</b>
                <span>Permintaan penawaran (RFQ), tender, atau kirim BoQ, spesifikasi, dan lampiran.</span>
              </span>
              <span className="channel-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <div className="contact-info">
            <div className="contact-row">
              <Icon name="pin" />
              <div>
                <small>Kantor</small>
                <address>
                  {CONTACT.street}
                  <br />
                  {CONTACT.area}
                </address>
              </div>
            </div>
          </div>
        </div>

        <InquiryForm />
      </div>
    </section>
  );
}
