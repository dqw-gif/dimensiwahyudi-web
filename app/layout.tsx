import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LayoutChrome from "../components/LayoutChrome";
import { LanguageProvider } from "../components/LanguageProvider";
import AnalyticsGate from "../components/AnalyticsGate";
import CookieConsentBanner from "../components/CookieConsentBanner";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-barlow",
});

const BASE_URL = "https://dimensiwahyudi.com";

const consentModeBootstrap = `
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  var consentKey = 'dwq-cookie-consent';
  var storedChoice = null;

  try {
    storedChoice = window.localStorage.getItem(consentKey);
  } catch (error) {
    storedChoice = null;
  }

  var analyticsState = storedChoice === 'accepted' ? 'granted' : 'denied';

  window.gtag('consent', 'default', {
    analytics_storage: analyticsState,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "PT Dimensi Quantum Wahyudi",
  category: "Industrial Equipment",
  title: {
    default: "PT Dimensi Quantum Wahyudi | Premium Vacuum Lifting & Ergonomic Handling Solutions",
    template: "%s | PT Dimensi Quantum Wahyudi",
  },
  description:
    "PT Dimensi Quantum Wahyudi delivers premium vacuum lifting and ergonomic handling solutions for industrial manufacturers across Indonesia, backed by engineering support and proven global technology.",
  keywords: [
    "Vacuum Lifter Indonesia",
    "Vacuum Lifting Solutions Indonesia",
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
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: BASE_URL,
    siteName: "PT Dimensi Quantum Wahyudi",
    title: "PT Dimensi Quantum Wahyudi | Premium Vacuum Lifting Solutions in Indonesia",
    description:
      "Trusted by manufacturers across Indonesia for vacuum lifters, lift-assist systems, and ergonomic material handling solutions with dependable engineering support.",
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
    title: "PT Dimensi Quantum Wahyudi | Premium Vacuum Lifting in Indonesia",
    description: "Premium vacuum lifting and ergonomic handling solutions for industrial manufacturers in Indonesia.",
    images: [`${BASE_URL}/opengraph-image`],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-ID": BASE_URL,
      "x-default": BASE_URL,
    },
  },
};

// JSON-LD: LocalBusiness + WebSite graph untuk memperkuat entity SEO Indonesia.
const seoStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#organization`,
      name: "PT Dimensi Quantum Wahyudi",
      description:
        "Established in 2009, PT Dimensi Quantum Wahyudi provides premium vacuum lifting and ergonomic material handling systems for industrial operations across Indonesia.",
      foundingDate: "2009",
      url: BASE_URL,
      telephone: "+62811-1916-8752",
      email: "sales@dimensiwahyudi.com",
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
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
        "https://www.linkedin.com/company/dimensiwahyudi",
        "https://www.instagram.com/nabelsakha/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "PT Dimensi Quantum Wahyudi",
      inLanguage: "en-ID",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLang = "en";
  const htmlLang = "en-ID";

  return (
    <html lang={htmlLang} className="scroll-smooth">
      <body className={`${barlow.variable} font-sans antialiased`}>
        <Script id="consent-mode-bootstrap" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: consentModeBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoStructuredData) }}
        />
        <LanguageProvider initialLang={initialLang}>
          <LayoutChrome>{children}</LayoutChrome>
          <CookieConsentBanner />
          <AnalyticsGate gaId={process.env.NEXT_PUBLIC_GA_ID} />
        </LanguageProvider>
      </body>
    </html>
  );
}