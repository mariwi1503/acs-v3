import type { ReactNode } from "react";
import { LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo-paths";

const ICONS = {
  network: (
    <>
      <rect x="8" y="2" width="8" height="6" rx="1" />
      <path d="M12 8v5M4 17v-4h16v4M12 13v4" />
      <rect x="1" y="17" width="6" height="5" rx="1" />
      <rect x="9" y="17" width="6" height="5" rx="1" />
      <rect x="17" y="17" width="6" height="5" rx="1" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="3" width="16" height="7" rx="1.5" />
      <rect x="4" y="14" width="16" height="7" rx="1.5" />
      <path d="M8 6.5h.1M8 17.5h.1M13 6.5h4M13 17.5h4M12 10v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 3.5 6v6c0 5 8.5 10 8.5 10s8.5-5 8.5-10V6z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  camera: <path d="m3 4 17 4-3 8L1 10zM8 12l-2 6h11M12 18v4M20 8l3-1v6l-5-1" />,
  radio: (
    <>
      <path d="m8 22 4-13 4 13M9 18h6M6 5a8 8 0 0 0 0 11M18 5a8 8 0 0 1 0 11M3 2a12 12 0 0 0 0 17M21 2a12 12 0 0 1 0 17" />
      <circle cx="12" cy="8" r="2" />
    </>
  ),
  building: (
    <path d="M3 22V7h11v15M14 12h7v10M1 22h22M6 10h1M10 10h1M6 14h1M10 14h1M6 18h1M10 18h1M17 15h1M17 18h1M5 7V3h7v4" />
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 22v-4a7 7 0 0 1 14 0v4M17 4a4 4 0 0 1 0 8M18 15a6 6 0 0 1 4 6" />
    </>
  ),
  project: (
    <>
      <rect x="4" y="4" width="16" height="18" rx="2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="m8 12 2 2 5-5M8 18h8" />
    </>
  ),
  box: <path d="m12 2 10 5v10l-10 5-10-5V7zM2 7l10 5 10-5M12 12v10M7 4.5l10 5" />,
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 22h8M12 17v5M5 11h4l2-4 3 7 2-3h3" />
    </>
  ),
  cloud: <path d="M7 19a5 5 0 1 1 0-10 7 7 0 0 1 14 1 4.5 4.5 0 0 1-1 9z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20M4 6h16M4 18h16" />
    </>
  ),
  hotel: <path d="M4 22V4h16v18M2 22h20M9 22v-5h6v5M8 7h1M15 7h1M8 11h1M15 11h1M8 2h8" />,
  government: <path d="m2 8 10-6 10 6zM4 10v9M9 10v9M15 10v9M20 10v9M2 22h20M3 19h18" />,
  factory: (
    <path d="M2 22V11l7-4v5l7-5v15M16 12h6v10M3 22h19M18 12l1-10h2l1 10M5 17h1M11 17h1M18 17h1" />
  ),
  school: <path d="m1 8 11-6 11 6-11 6zM5 10v7c4 4 10 4 14 0v-7M23 8v10" />,
  phone: <path d="m5 2 4 5-3 3a18 18 0 0 0 8 8l3-3 5 4c-1 3-3 4-6 3C9 20 4 15 2 8 1 5 2 3 5 2z" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  facebook: (
    <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />
  ),
  tiktok: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.7 2.3 4.3 5 4.5" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a3 3 0 0 1 6 0V17" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  pause: <path d="M9 5v14M15 5v14" />,
  play: <path d="m8 4 12 8-12 8z" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

/** Ikon garis dekoratif; selalu disembunyikan dari pembaca layar. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}

export function Logo() {
  return (
    <svg className="logo" viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
      {LOGO_PATHS.map((p) => (
        <path key={p.d} fill={p.fill} d={p.d} />
      ))}
    </svg>
  );
}

export function Brand({ label }: { label: string }) {
  return (
    <a href="#utama" className="brand" aria-label={label}>
      <Logo />
      <div className="brand-text" aria-hidden="true">
        ALPHA CORE<span>SOLUTION</span>
      </div>
    </a>
  );
}
