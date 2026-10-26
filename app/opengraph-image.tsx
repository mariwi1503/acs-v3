import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";
import { LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo-paths";

export const alt = "Alpha Core Solution — solusi IT, jaringan & data center untuk bisnis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERVICES = ["Networking", "Data Center", "CCTV & AI Camera", "IoT & Smart Building", "Managed Service"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#eef4ff",
          background: "radial-gradient(circle at 85% 30%, #0d2f66 0%, #060b16 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="170" height="60" viewBox={LOGO_VIEWBOX}>
            {LOGO_PATHS.map((p) => (
              <path key={p.d} fill={p.fill} d={p.d} />
            ))}
          </svg>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 22, letterSpacing: 4, fontWeight: 700 }}>
            <span>ALPHA CORE</span>
            <span style={{ color: "#8a9bb6", fontSize: 18, letterSpacing: 8 }}>SOLUTION</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, display: "flex", flexWrap: "wrap" }}>
            <span>Solusi IT &amp; jaringan untuk lompatan&nbsp;</span>
            <span style={{ color: "#4c8dff" }}>bisnis Anda.</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {SERVICES.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid #3b5f95",
                  color: "#c3d4ec",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#a9b6cb" }}>
          <span>Bogor · Indonesia</span>
          <span style={{ color: "#ff7a29", fontWeight: 700 }}>{new URL(SITE.url).host}</span>
        </div>
      </div>
    ),
    size,
  );
}
