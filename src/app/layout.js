import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArcReactorBackground from "@/components/layout/ArcReactorBackground";
import ScrollManager from "@/components/UI/ScrollManager";
import siteData from "@/data/site.json";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateMultiRegionalSchema } from "@/utils/schema_markup";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";


const orgSchema = generateOrganizationSchema();
const multiRegionalSchema = generateMultiRegionalSchema();

const defaultLocalSchema = generateLocalBusinessSchema({
  location: {
    name: siteData.city,
    slug: siteData.city.toLowerCase(),
    landmarks: [siteData.city],
    pincode: "",
    state: siteData.state
  },
  service: { id: "digital-marketing", label: "Digital Marketing" }
});


export const metadata = {
  metadataBase: new URL(siteData.baseUrl),
  title: {
    default: `${siteData.name} | Digital Marketing Agency in ${siteData.city}`,
    template: `%s | ${siteData.name}`
  },
  description: `${siteData.name} (also known as ${siteData.brandVariations.join(', ')}) is the leading digital agency and marketing agency in ${siteData.city}, Uttar Pradesh, India. We build your digital presence through expert SEO, Social Media, and Performance Marketing.`,
  keywords: [
    ...siteData.brandVariations,
    ...siteData.searchTerms,
    `Digital Marketing Agency ${siteData.city}`, 
    `SEO Services ${siteData.city}`, 
    `Social Media Marketing ${siteData.city}`,
    `Digital Marketing Agency ${siteData.state}`,
    `SEO Services ${siteData.state}`,
    `Digital Marketing Agency India`,
    `Best Digital Agency ${siteData.city}`,
    `Performance Marketing ${siteData.country}`, 
    `Web Development ${siteData.city}`,
    `Content Marketing ${siteData.city}`,
    `Video Editing ${siteData.city}`,
    `PR Agency ${siteData.city}`,
    `International Digital Marketing`
  ],
  authors: [{ name: `${siteData.name} Team` }],
  creator: siteData.name,
  publisher: siteData.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteData.name} | Best Digital Marketing Agency in ${siteData.city}`,
    description: `Scale your business with the leading digital marketing agency in ${siteData.city}, ${siteData.state}. Expert SEO, SMM, and Performance Marketing. Serving India and International clients.`,
    url: siteData.baseUrl,
    siteName: siteData.name,
    images: [
      {
        url: "/logo/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "DigitalGram Branding",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.name} | Best Digital Marketing Agency in ${siteData.city}`,
    description: `Scale your business with the leading digital marketing agency in ${siteData.city}. Serving ${siteData.state}, India, and International markets.`,
    images: ["/logo/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Geographic metadata
  alternates: {
    canonical: siteData.baseUrl,
    languages: {
      'en-IN': `${siteData.baseUrl}/en-IN`,
      'en': `${siteData.baseUrl}/en`,
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.position" content="26.4499;80.3319" />
        <meta name="ICBM" content="26.4499, 80.3319" />
        <meta name="geo.placename" content={`${siteData.city}, ${siteData.state}, ${siteData.country}`} />
        <meta name="geo.region" content={`${siteData.country}-UP`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteData.baseUrl} />
        
        {/* Hreflang for international */}
        <link rel="alternate" hrefLang="en-IN" href={`${siteData.baseUrl}/en-IN`} />
        <link rel="alternate" hrefLang="en" href={`${siteData.baseUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={siteData.baseUrl} />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {/* Multi-Regional Schema for international reach */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(multiRegionalSchema) }}
        />

        {/* Default Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultLocalSchema) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <ScrollManager />
        <ArcReactorBackground />
        <Navbar />
        <div className="main-container">
          {children}
        </div>

        <ThemeSwitcher />
        <Footer />
      </body>
    </html>
  );
}
