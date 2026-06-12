import siteData from "@/data/site.json";

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/*.json$'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'bingbot',
        allow: '/',
      }
    ],
    sitemap: [
      `${siteData.baseUrl}/sitemap.xml`,
      `${siteData.baseUrl}/sitemap-locations.xml`,
      `${siteData.baseUrl}/sitemap-services.xml`,
      `${siteData.baseUrl}/sitemap-kanpur.xml`,
      `${siteData.baseUrl}/sitemap-up.xml`,
      `${siteData.baseUrl}/sitemap-india.xml`,
    ],
    // Additional directives for better crawling
    crawlDelay: 0.5,
  }
}
