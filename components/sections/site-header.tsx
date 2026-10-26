"use client";

import { useEffect, useRef, useState } from "react";
import { Brand, Icon } from "@/components/icon";
import { NAV_LINKS } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Tutup menu mobile: Escape, klik di luar header, atau layar melebar.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const wide = matchMedia("(min-width: 961px)");
    const onWide = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  // Tandai link section yang sedang dibaca.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Bar progres baca di bawah header.
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header ref={headerRef} className="topbar">
      <nav className="nav wrap" aria-label="Navigasi utama">
        <Brand label="Alpha Core Solution — beranda" />
        <div className={open ? "navlinks open" : "navlinks"} id="navlinks">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className="btn primary nav-menu-cta" href="#kontak" onClick={() => setOpen(false)}>
            Diskusikan Proyek <span className="arrow">↗</span>
          </a>
        </div>
        <a className="btn primary nav-cta" href="#kontak">
          Diskusikan Proyek <span className="arrow">↗</span>
        </a>
        <button
          ref={menuRef}
          type="button"
          className="menu"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-controls="navlinks"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name="menu" />
        </button>
      </nav>
      <div ref={progressRef} className="progress" aria-hidden="true" />
    </header>
  );
}
