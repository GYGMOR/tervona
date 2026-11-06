import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** App-Icon für iPhone/iPad (Startbildschirm). */
export default function AppleIcon() {
  const tiles = [
    { x: 22, y: 50, c: "linear-gradient(135deg, #4fb0ff, #2386ff)" },
    { x: 68, y: 50, c: "linear-gradient(135deg, #8a87ff, #5f5bff)" },
    { x: 114, y: 50, c: "linear-gradient(135deg, #c77dff, #a64dff)" },
    { x: 68, y: 96, c: "linear-gradient(135deg, #ff8aa6, #ff5c84)" },
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#ffffff" }}>
        {tiles.map((t, i) => (
          <div key={i} style={{ position: "absolute", left: t.x, top: t.y, width: 42, height: 42, borderRadius: 13, backgroundImage: t.c, display: "flex" }} />
        ))}
      </div>
    ),
    size,
  );
}
