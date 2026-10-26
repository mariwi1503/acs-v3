"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { SERVICE_GROUPS, type Service } from "@/lib/content";
import { requestInquiry } from "@/lib/inquiry";

const pad = (n: number) => String(n).padStart(2, "0");

export function ServiceExplorer() {
  const [activeGroup, setActiveGroup] = useState(SERVICE_GROUPS[0].id);
  const [selected, setSelected] = useState<Service | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const skipFocusRestore = useRef(false);

  // Navigasi keyboard pola WAI-ARIA Tabs.
  const onTabKeyDown = (e: KeyboardEvent, index: number) => {
    const last = SERVICE_GROUPS.length - 1;
    const next =
      e.key === "ArrowRight" ? (index + 1) % SERVICE_GROUPS.length
      : e.key === "ArrowLeft" ? (index + last) % SERVICE_GROUPS.length
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActiveGroup(SERVICE_GROUPS[next].id);
    tabRefs.current[next]?.focus();
  };

  const openDetail = (service: Service, trigger: HTMLElement) => {
    setSelected(service);
    triggerRef.current = trigger;
    skipFocusRestore.current = false;
    dialogRef.current?.showModal();
  };

  const closeDialog = () => dialogRef.current?.close();

  const onDialogClose = () => {
    // Kembalikan fokus ke tombol pemicu, kecuali pengunjung lanjut ke formulir.
    if (!skipFocusRestore.current) triggerRef.current?.focus();
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Kategori layanan">
        {SERVICE_GROUPS.map((group, i) => {
          const active = group.id === activeGroup;
          return (
            <button
              key={group.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              className="tab"
              role="tab"
              id={`tab-${group.id}`}
              aria-controls={`panel-${group.id}`}
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveGroup(group.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
            >
              {group.label}
              <span aria-hidden="true"> / {pad(group.services.length)}</span>
            </button>
          );
        })}
      </div>

      {SERVICE_GROUPS.map((group, groupIndex) => {
        // Hanya panel pertama yang terlihat saat halaman dimuat, jadi hanya ia yang dianimasikan.
        const cardClass = groupIndex === 0 ? "service-card reveal" : "service-card";
        return (
          <div
            key={group.id}
            className="cards"
            id={`panel-${group.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${group.id}`}
            hidden={group.id !== activeGroup}
          >
            {group.services.map((service, i) => (
              <article key={service.id} className={cardClass}>
                <div className="card-media">
                  <Image
                    src={service.image}
                    alt=""
                    width={1254}
                    height={1254}
                    sizes="(max-width: 600px) 160px, 180px"
                  />
                  <span className="card-no" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`${group.actionLabel}: ${service.title}`}
                  onClick={(e) => openDetail(service, e.currentTarget)}
                >
                  {group.actionLabel}
                </button>
              </article>
            ))}
            {groupIndex === 0 && (
              <article className="service-card service-cta reveal">
                <h3>Setiap bisnis punya tantangan unik.</h3>
                <p>Mari temukan solusi yang sesuai dengan kebutuhan Anda.</p>
                <a className="btn primary" href="#kontak">
                  Diskusikan kebutuhan <span className="arrow">↗</span>
                </a>
              </article>
            )}
          </div>
        );
      })}

      <dialog
        ref={dialogRef}
        className="service-dialog"
        aria-labelledby="modal-title"
        onClose={onDialogClose}
        onClick={(e) => {
          // Klik di backdrop menutup dialog.
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            const outside =
              e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
            if (outside) closeDialog();
          }
        }}
      >
        <button type="button" className="modal-close" aria-label="Tutup detail layanan" onClick={closeDialog}>
          ×
        </button>
        <div className="modal-head">
          {selected && (
            <Image src={selected.image} alt="" width={1254} height={1254} sizes="88px" className="modal-image" />
          )}
          <div>
            <p className="modal-tag">Alpha Core / Service</p>
            <h2 id="modal-title">{selected?.title}</h2>
          </div>
        </div>
        <p>{selected?.detail}</p>
        <ul>
          {selected?.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <a
          className="btn primary"
          href="#kontak"
          onClick={() => {
            if (!selected) return;
            skipFocusRestore.current = true;
            requestInquiry(selected.title, { focus: true });
            closeDialog();
          }}
        >
          Konsultasikan kebutuhan <span className="arrow">↗</span>
        </a>
      </dialog>
    </>
  );
}
