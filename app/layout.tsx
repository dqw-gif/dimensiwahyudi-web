import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { LanguageProvider } from "../components/LanguageProvider";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-barlow",
});

const BASE_URL = "https://dimensiwahyudi.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PT Dimensi Quantum Wahyudi | Indonesia Market Leader in Vacuum Lifting Systems",
    template: "%s | PT Dimensi Quantum Wahyudi",
  },
  description:
    "PT Dimensi Quantum Wahyudi, established in 2009, is Indonesia's market leader in vacuum lifting and ergonomic handling systems. Official Schmalz and Binar Handling distributor for high-performance industrial material handling.",
  keywords: [
    "Vacuum Lifter Indonesia",
    "Indonesia Market Leader Vacuum Lifter",
    "Schmalz Distributor Indonesia",
    "Binar Handling Distributor Indonesia",
    "Ergonomic Lifting System",
    "Industrial Lift Assist",
    "Vacuum Tube Lifter Indonesia",
    "VacuMaster Indonesia",
    "PT Dimensi Quantum Wahyudi",
    "Material Handling Indonesia",
    "Industrial Vacuum Handling",
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
    locale: "en_US",
    url: BASE_URL,
    siteName: "PT Dimensi Quantum Wahyudi",
    title: "PT Dimensi Quantum Wahyudi | Market Leader in Vacuum Lifting in Indonesia",
    description:
      "Trusted by leading manufacturers across Indonesia for vacuum lifters, lift-assist systems, and ergonomic material handling solutions.",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "PT Dimensi Quantum Wahyudi — Industrial Lifting Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Dimensi Quantum Wahyudi | Vacuum Lifting Leader in Indonesia",
    description: "Market-leading vacuum lifting and ergonomic handling solutions for industrial manufacturers.",
    images: [`${BASE_URL}/opengraph-image`],
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
    "Established in 2009, PT Dimensi Quantum Wahyudi is Indonesia's market leader in vacuum lifting and ergonomic material handling systems.",
  foundingDate: "2009",
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
    "https://dimensiwahyudi.com",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLang = "en";

  return (
    <html lang={initialLang} className="scroll-smooth">
      <body className={`${barlow.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <LanguageProvider initialLang={initialLang}>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
          <Analytics />
          {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        </LanguageProvider>
      </body>
    </html>
  );
}