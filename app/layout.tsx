import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-barlow",
});

const BASE_URL = "https://dimensiwahyudi.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PT Dimensi Quantum Wahyudi — Distributor Resmi Schmalz & Binar Handling Indonesia",
    template: "%s | PT Dimensi Quantum Wahyudi",
  },
  description:
    "PT Dimensi Quantum Wahyudi adalah distributor resmi Schmalz (Jerman) dan Binar Handling (Swedia) di Indonesia. Solusi vacuum lifter, lift arm ergonomis, suction cup, dan crane system standar Eropa untuk industri manufaktur.",
  keywords: [
    "Vacuum Lifter Indonesia",
    "Distributor Schmalz Indonesia",
    "Binar Handling Indonesia",
    "Alat Angkat Ergonomis",
    "Lift Arm Industri",
    "Material Handling Indonesia",
    "PT Dimensi Quantum Wahyudi",
    "Suction Cup Industrial",
    "VacuMaster Indonesia",
    "Vakum Lifter Bekasi",
  ],
  authors: [{ name: "PT Dimensi Quantum Wahyudi", url: BASE_URL }],
  creator: "PT Dimensi Quantum Wahyudi",
  publisher: "PT Dimensi Quantum Wahyudi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "PT Dimensi Quantum Wahyudi",
    title: "PT Dimensi Quantum Wahyudi — Distributor Resmi Schmalz & Binar Handling Indonesia",
    description:
      "Solusi material handling terpercaya di Indonesia. Vacuum lifter, lift arm, & crane system standar Eropa.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PT Dimensi Quantum Wahyudi — Industrial Lifting Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Dimensi Quantum Wahyudi — Distributor Schmalz & Binar Handling",
    description: "Solusi material handling standar Eropa untuk industri Indonesia.",
    images: [`${BASE_URL}/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD: LocalBusiness schema — diindex Google untuk Knowledge Panel
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "PT Dimensi Quantum Wahyudi",
  description:
    "Distributor resmi Schmalz (Jerman) dan Binar Handling (Swedia) di Indonesia. Spesialis vacuum lifter, lift arm ergonomis, dan solusi material handling industri.",
  url: BASE_URL,
  telephone: "+62811-1916-8752",
  email: "sales@dimensiwahyudi.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "BizPark 3 Bekasi, Jl. Sultan Agung No.80 No. C37, Kali Baru, Medan Satria",
    addressLocality: "Bekasi",
    addressRegion: "West Java",
    postalCode: "17132",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.2279,
    longitude: 106.9849,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  sameAs: [
    "https://www.schmalz.com",
    "https://www.binarhandling.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${barlow.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFloat />
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}