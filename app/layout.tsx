// layout.tsx
import type { Metadata } from "next";
import { Manrope, Big_Shoulders } from "next/font/google";
import "./globals.css";
import Noise from "@/components/Noise";
import Navbar from "../components/layout/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-bigShoulders",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rifandiysf | Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${bigShoulders.variable} antialiased relative min-h-screen`}
      >
        {/* PERSISTENT NOISE BACKGROUND - Fixed position */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>

        <div className="relative z-50">
          <Navbar />
        </div>

        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}