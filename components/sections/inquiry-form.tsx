"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { INQUIRY_OPTIONS, mailtoUrl, whatsappUrl } from "@/lib/content";
import { onInquiryRequest } from "@/lib/inquiry";

type Channel = "whatsapp" | "email";

const CHANNELS: { id: Channel; label: string; hint: string }[] = [
  { id: "whatsapp", label: "WhatsApp", hint: "Balasan lebih cepat" },
  { id: "email", label: "Email", hint: "Penawaran resmi & lampiran" },
];

const COPY: Record<Channel, { button: string; note: string; ready: string; retry: string }> = {
  whatsapp: {
    button: "Lanjutkan ke WhatsApp",
    note: "Pesan akan dibuka di WhatsApp untuk Anda tinjau sebelum dikirim.",
    ready: "Pesan siap. Jika WhatsApp belum terbuka:",
    retry: "Buka pesan di WhatsApp ↗",
  },
  email: {
    button: "Lanjutkan ke Email",
    note: "Pesan akan dibuka di aplikasi email Anda. Lampiran seperti BoQ atau spesifikasi bisa ditambahkan di sana sebelum dikirim.",
    ready: "Email siap. Jika aplikasi email belum terbuka:",
    retry: "Buka email ↗",
  },
};

/**
 * Formulir konsultasi. Tidak ada data yang dikirim ke server: isian disusun
 * menjadi pesan WhatsApp atau email yang bisa ditinjau pengunjung sebelum dikirim.
 */
export function InquiryForm() {
  const [service, setService] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [link, setLink] = useState<{ channel: Channel; href: string } | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      onInquiryRequest(({ service, focus }) => {
        setService(service);
        // Tunggu scroll ke #kontak selesai dulu agar fokus tidak membuat layar melompat.
        if (focus) setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 350);
      }),
    [],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Tolak isian yang hanya berisi spasi.
    for (const el of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input:not([type=radio]), textarea",
    )) {
      el.setCustomValidity(el.value.trim() ? "" : "Mohon isi kolom ini.");
      el.addEventListener("input", () => el.setCustomValidity(""), { once: true });
    }
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const details = [
      `Nama: ${field("name")}`,
      `Perusahaan: ${field("company")}`,
      `Email: ${field("email")}`,
      `Layanan: ${field("service")}`,
      "",
      "Kebutuhan:",
      field("message"),
    ];

    if (channel === "whatsapp") {
      const href = whatsappUrl(["Halo tim Alpha Core Solution, saya ingin berkonsultasi.", "", ...details].join("\n"));
      setLink({ channel, href });
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      const subject = `Permintaan Penawaran: ${field("service")} (${field("company")})`;
      const body = ["Halo tim Alpha Core Solution,", "", ...details, "", "Terima kasih."].join("\n");
      const href = mailtoUrl(subject, body);
      setLink({ channel, href });
      window.location.href = href;
    }
  };

  const copy = COPY[channel];

  return (
    <form className="form-panel reveal" onSubmit={onSubmit}>
      <h3>Mari bicarakan proyek Anda.</h3>
      <p>Lengkapi informasi berikut untuk memulai diskusi.</p>

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">
            Nama lengkap <span aria-hidden="true">*</span>
          </label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            placeholder="Nama Anda"
            autoComplete="name"
            maxLength={100}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="company">
            Perusahaan <span aria-hidden="true">*</span>
          </label>
          <input
            id="company"
            name="company"
            placeholder="Nama perusahaan"
            autoComplete="organization"
            maxLength={150}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">
          Email bisnis <span aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="nama@perusahaan.com"
          autoComplete="email"
          maxLength={180}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="service">
          Layanan yang dibutuhkan <span aria-hidden="true">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Pilih layanan</option>
          {INQUIRY_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">
          Ceritakan kebutuhan Anda <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Gambaran proyek, lokasi, atau kebutuhan yang ingin didiskusikan…"
          maxLength={1500}
          required
        />
      </div>

      <fieldset className="channel-choice">
        <legend>Kirim melalui</legend>
        <div className="channel-options">
          {CHANNELS.map((c) => (
            <label key={c.id} className="channel-option">
              <input
                type="radio"
                name="channel"
                value={c.id}
                checked={channel === c.id}
                onChange={() => setChannel(c.id)}
              />
              <span>
                <b>{c.label}</b>
                <small>{c.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="btn primary">
        {copy.button} <span className="arrow">↗</span>
      </button>
      <div className="form-note">{copy.note} Informasi formulir tidak disimpan di website ini.</div>
      <div className="form-status" role="status">
        {link && (
          <>
            {COPY[link.channel].ready}{" "}
            <a
              className="text-link"
              href={link.href}
              {...(link.channel === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {COPY[link.channel].retry}
            </a>
          </>
        )}
      </div>
    </form>
  );
}
