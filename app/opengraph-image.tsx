import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "Build a ₹3 lakh a month business from home. Swapnil Shiwalay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let portrait: string | null = null;
  try {
    const buf = await readFile(join(process.cwd(), "public", "swapnil-portrait.jpg"));
    portrait = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    portrait = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#050506",
          color: "#F2F1EE",
          fontFamily: "Helvetica, Arial, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: "#F5C12E" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 56px 72px",
            width: portrait ? 760 : 1100,
          }}
        >
          <div style={{ fontSize: 20, letterSpacing: 4, color: "#A6A6A3" }}>
            DIGITAL SERVICES · CONSULTING · PRODUCTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>
              Build a ₹3 lakh a month business from home.
            </div>
            <div style={{ fontSize: 27, color: "#A6A6A3", lineHeight: 1.35 }}>
              A free call maps your skill, positioning, market, offer and earning. Then 7 days or 90 days, 1:1.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{site.name}</div>
            <div style={{ fontSize: 20, color: "#A6A6A3" }}>{`${site.years} · ${site.websites}`}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#F5C12E", marginTop: 6 }}>{site.domain}</div>
          </div>
        </div>
        {portrait && (
          <div style={{ position: "absolute", right: 0, bottom: 0, top: 12, width: 440, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden" }}>
            <img src={portrait} alt="" width={520} height={468} style={{ objectFit: "cover", objectPosition: "top", marginRight: -40 }} />
            {/* Dissolve the crop's edges into the page ground. */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to right, #050506 0%, rgba(5,5,6,0) 45%)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, #050506 0%, rgba(5,5,6,0) 40%)" }} />
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
