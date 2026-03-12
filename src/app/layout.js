import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import siteData from "@/data/site.json";
import { generateOrganizationSchema } from "@/utils/schema_markup";

const orgSchema = generateOrganizationSchema();


export const metadata = {
  metadataBase: new URL(siteData.baseUrl),
  title: {
    default: `${siteData.name} | Digital Marketing Agency in ${siteData.city}`,
    template: `%s | ${siteData.name}`
  },
  description: `${siteData.name} is the leading digital marketing agency in ${siteData.city}, specializing in SEO, Social Media, and Performance Marketing for growth-focused businesses.`,
  keywords: [`Digital Marketing Agency ${siteData.city}`, `SEO Services ${siteData.city}`, `Social Media Marketing ${siteData.city}`, `Performance Marketing ${siteData.country}`, `Web Development ${siteData.city}`],
  authors: [{ name: `${siteData.name} Team` }],
  creator: siteData.name,
  publisher: siteData.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: siteData.verification?.google,
  },
    openGraph: {
    title: `${siteData.name} | Best Digital Marketing Agency in ${siteData.city}`,
    description: `Scale your business with the leading digital marketing agency in ${siteData.city}. Expert SEO, SMM, and Performance Marketing.`,
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
    description: `Scale your business with the leading digital marketing agency in ${siteData.city}.`,
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Navbar />
          <div className="main-container">
            {children}
          </div>
        
        <Footer />
      </body>
    </html>
  );
}
