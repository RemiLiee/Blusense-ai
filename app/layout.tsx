import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  metadataBase: new URL('https://aquaenergy.ai'),
  title: {
    default: "AquaEnergy AI — Energioptimalisering for oppdrett",
    template: "%s | AquaEnergy AI"
  },
  description: "Plug & Play sensorpakker + AI for energibesparelse. Sanntids overvåking og optimalisering for akvakulturanlegg. Reduser strømforbruk med 10-30%.",
  keywords: ["akvakultur", "energibesparelse", "sensorovervåkning", "AI", "oppdrett", "energistyring", "fiskeoppdrett", "energioptimalisering", "IoT sensorer", "prediktivt vedlikehold"],
  authors: [{ name: "AquaEnergy AI" }],
  creator: "AquaEnergy AI",
  publisher: "AquaEnergy AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: "https://aquaenergy.ai",
    siteName: "AquaEnergy AI",
    title: "AquaEnergy AI — Energioptimalisering for oppdrett",
    description: "Plug & Play sensorpakker + AI for energibesparelse. Reduser strømforbruk med 10-30% i akvakulturanlegg.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AquaEnergy AI - Energioptimalisering for oppdrett",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaEnergy AI — Energioptimalisering for oppdrett",
    description: "Plug & Play sensorpakker + AI for energibesparelse. Reduser strømforbruk med 10-30%.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://aquaenergy.ai",
  },
  verification: {
    // Legg til Google Search Console verification code her når du har det
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

