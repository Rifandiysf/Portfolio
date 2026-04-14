import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Rifandiyusuf — Frontend Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0a0a0a",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "60px 72px",
                    fontFamily: "sans-serif",
                }}
            >
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#ffffff30", fontSize: 14, textTransform: "uppercase", letterSpacing: 6 }}>
                        Portfolio
                    </span>
                    <span style={{ color: "#ffffff30", fontSize: 14, textTransform: "uppercase", letterSpacing: 6 }}>
                        rifandiysf.vercel.app
                    </span>
                </div>

                {/* Center — name */}
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <span style={{ color: "#ffffff15", fontSize: 13, textTransform: "uppercase", letterSpacing: 8, marginBottom: 16 }}>
                        Frontend Developer · Bandung, Indonesia
                    </span>
                    <span
                        style={{
                            color: "#ffffff",
                            fontSize: 140,
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: -6,
                            textTransform: "uppercase",
                        }}
                    >
                        RIFANDI
                    </span>
                    <span
                        style={{
                            color: "#ffffff",
                            fontSize: 140,
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: -6,
                            textTransform: "uppercase",
                        }}
                    >
                        YUSUF
                    </span>
                </div>

                {/* Bottom row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div style={{ display: "flex", gap: 12 }}>
                        {["Next.js", "TypeScript", "Tailwind CSS", "React"].map((tech) => (
                            <span
                                key={tech}
                                style={{
                                    color: "#ffffff50",
                                    fontSize: 12,
                                    textTransform: "uppercase",
                                    letterSpacing: 4,
                                    border: "1px solid #ffffff20",
                                    padding: "6px 14px",
                                    borderRadius: 100,
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <span style={{ color: "#ffffff20", fontSize: 13, letterSpacing: 3, textTransform: "uppercase" }}>
                        © 2025
                    </span>
                </div>
            </div>
        ),
        { ...size }
    )
}