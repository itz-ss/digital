import servicesData from "@/data/services.json";
import locationsData from "@/data/locations.json";
import geoLocations from "@/data/geo-locations.json";
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

  // Geographic Location Pages (Tier 1 - Kanpur & Nearby)
  const tier1Pages = geoLocations.tiers.tier1.locations.map(location => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.95,
  }));

  // Geographic Location Pages (Tier 2 - Uttar Pradesh)
  const tier2Pages = geoLocations.tiers.tier2.locations.map(location => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Geographic Location Pages (Tier 3 - India Major Cities)
  const tier3Pages = geoLocations.tiers.tier3.locations.map(location => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Main Locations Listing Page
  const locationListPage = [{
    url: `${baseUrl}/locations`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }];

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

  // Geo-Service combination pages (Service in specific locations)
  const geoServicePages = [];
  servicesData.tabs.forEach(service => {
    [...tier1Pages, ...tier2Pages, ...tier3Pages].forEach(locationPage => {
      const locationSlug = locationPage.url.split('/').pop();
      geoServicePages.push({
        url: `${baseUrl}/locations/${locationSlug}/${service.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    });
  });

  return [
    ...staticPages, 
    ...blogPages, 
    ...locationListPage,
    ...tier1Pages,
    ...tier2Pages,
    ...tier3Pages,
    ...serviceDetailPages, 
    ...nationalPages,
    ...geoServicePages,
    ...slPages, 
    ...siPages
  ];
}
