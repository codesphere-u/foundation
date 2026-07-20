import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #2f1b55 0%, #4A2E80 48%, #3a2466 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4B45A",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 600,
          }}
        >
          {site.tagline}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 900,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            Child education · Sustainable agriculture · Community care across Uganda
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "system-ui, sans-serif",
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>Masaka District, Uganda</span>
          <span style={{ color: "#D4B45A", fontWeight: 600 }}>hafisamagezi.org</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
