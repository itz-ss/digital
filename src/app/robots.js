import siteData from "@/data/site.json";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${siteData.baseUrl}/sitemap.xml`,
  }
}
