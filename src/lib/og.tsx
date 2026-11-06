import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Gemeinsames Vorschaubild (WhatsApp, LinkedIn, Slack …) im Trevona-Look. */
export function renderOg({ eyebrow, title, subtitle, slogan }: { eyebrow: string; title: string; subtitle: string; slogan: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 82% 28%, rgba(111,107,255,0.5) 0%, rgba(180,92,255,0.22) 22%, rgba(0,0,0,0) 48%), radial-gradient(circle at 98% 92%, rgba(255,106,141,0.25) 0%, rgba(0,0,0,0) 30%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", position: "relative", width: 72, height: 72 }}>
            {[
              { x: 0, y: 10, c: "linear-gradient(135deg, #4fb0ff, #2386ff)" },
              { x: 24, y: 10, c: "linear-gradient(135deg, #8a87ff, #5f5bff)" },
              { x: 48, y: 10, c: "linear-gradient(135deg, #c77dff, #a64dff)" },
              { x: 24, y: 34, c: "linear-gradient(135deg, #ff8aa6, #ff5c84)" },
            ].map((tile, i) => (
              <div key={i} style={{ position: "absolute", left: tile.x, top: tile.y, width: 21, height: 21, borderRadius: 6.5, backgroundImage: tile.c, display: "flex" }} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "white", fontSize: 44, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>trevona</div>
            <div style={{ color: "#a1a1a6", fontSize: 20, marginTop: 6 }}>{slogan}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              backgroundImage: "linear-gradient(90deg, #2997ff, #b45cff, #ff6a8d)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ marginTop: 14, fontSize: 76, fontWeight: 800, color: "white", letterSpacing: -3, lineHeight: 1.05, display: "flex", maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ marginTop: 20, fontSize: 30, color: "#a1a1a6", display: "flex", maxWidth: 980 }}>{subtitle}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
