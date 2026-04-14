import type { Metadata } from "next";
import { Manrope, Big_Shoulders } from "next/font/google";
import "./globals.css";
import Noise from "@/components/Noise";
import Navbar from "../components/layout/Navbar";
import TransitionProvider from "@/lib/provider/TransitionProvider";
import ClientWrapper from "@/components/layout/ClientWrapper";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap"
});

const bigShoulders = Big_Shoulders({
  variable: "--font-bigShoulders",
  subsets: ["latin"],
  display: "swap"
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rifandiyusuf",
  url: "https://rifandiysf.vercel.app",
  jobTitle: "Junior Frontend Developer",
  address: { "@type": "PostalAddress", addressLocality: "Bandung", addressCountry: "ID" },
  sameAs: [
    "https://github.com/Rifandiysf",
    "https://linkedin.com/in/rifandiyusuf",
    "https://instagram.com/rifandiysf",
  ],
}

export const metadata: Metadata = {
  title: "Rifandiysf - Portfolio",
  description:
    "Frontend Developer based in Bandung, Indonesia. Crafting engaging and user-friendly digital experiences with Next.js, React, and Tailwind CSS.",
  metadataBase: new URL("https://rifandiysf.vercel.app"),
  openGraph: {
    title: "Rifandiyusuf — Frontend Developer",
    description:
      "Fresh graduate passionate about Frontend Development & UI/UX Design. Check out my projects and experience.",
    url: "https://rifandiysf.vercel.app",
    siteName: "Rifandiysf Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rifandiyusuf — Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientWrapper>
          <section className="fixed inset-0 w-full h-full z-[60] pointer-events-none">
            <Noise
              patternSize={250}
              patternScaleX={1}
              patternScaleY={1}
              patternRefreshInterval={2}
              patternAlpha={15}
            />
          </section>

          <section className="relative z-50">
            <TransitionProvider>
              <Navbar />
            </TransitionProvider>
          </section>

          <main className="relative z-10">
            {children}
          </main>
        </ClientWrapper>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}