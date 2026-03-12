import servicesData from "@/data/services.json";
import locationsData from "@/data/locations.json";
import industriesData from "@/data/industries.json";
import blogsData from "@/data/blogs.json";
import pagesData from "@/data/pages.json";
import siteData from "@/data/site.json";

export default function sitemap() {
  const baseUrl = siteData.baseUrl;

  // Static Pages
  const staticPages = pagesData.pages.map(page => ({
    url: `${baseUrl}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  }));

  // Blog Pages
  const blogPages = blogsData.blogs.map(blog => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Service-Location Pages
  const slPages = [];
  servicesData.tabs.forEach(service => {
    locationsData.target_areas.forEach(location => {
      slPages.push({
        url: `${baseUrl}/${service.id}-services-${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Service-Industry Pages
  const siPages = [];
  servicesData.tabs.forEach(service => {
    industriesData.industries.forEach(industry => {
      siPages.push({
        url: `${baseUrl}/${service.id}-for-${industry.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  // National Service Pages
  const nationalPages = servicesData.tabs.map(service => ({
    url: `${baseUrl}/best-${service.id}-agency-in-india`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Individual Service Detail Pages
  const serviceDetailPages = servicesData.tabs.map(service => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...staticPages, 
    ...blogPages, 
    ...serviceDetailPages, 
    ...nationalPages, 
    ...slPages, 
    ...siPages
  ];
}
