import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Turn your skill into paying clients. In 90 days, from home. Swapnil Shiwalay.";
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
          background: "#F8F7F3",
          color: "#14211B",
          padding: "64px 72px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: "#F5C12E" }} />
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#55615A" }}>
          FOR FREELANCERS · CONSULTANTS · SOLOPRENEURS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2, maxWidth: 1000 }}>
            Turn your skill into paying clients in 90 days.
          </div>
          <div style={{ fontSize: 30, color: "#55615A", maxWidth: 940, lineHeight: 1.35 }}>
            From home. 1:1 guidance from someone who has done it for 20 years. Ends with a client, or we keep going.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 30, fontWeight: 800 }}>{site.name}</div>
            <div style={{ fontSize: 22, color: "#55615A" }}>{`${site.years} · ${site.websites}`}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#0F5C4B" }}>{site.domain}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
