/**
 * GEO Content Generator
 * Creates location-specific content for SEO optimization
 */

import geoLocations from "@/data/geo-locations.json";
import geoKeywords from "@/data/geo-keywords.json";
import siteData from "@/data/site.json";

export const GeoContentStrategies = {
  /**
   * Get location metadata for SEO
   */
  getLocationMetadata: (location, service) => {
    const tier = Object.entries(geoLocations.tiers)
      .find(([_, tier]) => 
        tier.locations?.some(loc => loc.slug === location.slug)
      )?.[0];

    return {
      title: `Best ${service} Agency in ${location.name} | DigitalGram`,
      description: `Looking for top-rated ${service} services in ${location.name}? DigitalGram offers professional ${service.toLowerCase()} solutions. ${location.description || ''}`,
      keywords: buildGeoKeywords(location, service),
      og: {
        title: `${service} in ${location.name} | DigitalGram`,
        description: `Professional ${service} agency serving ${location.name} and nearby areas.`,
        url: `${siteData.baseUrl}/locations/${location.slug}/${service.toLowerCase()}`
      }
    };
  },

  /**
   * Generate location-specific service description
   */
  generateLocationServiceDescription: (location, service) => {
    return `
At DigitalGram, we provide specialized ${service} services in ${location.name}. 
With our deep understanding of the local market in ${location.name}, ${location.state}, 
we help businesses build their digital presence and drive growth.

Our ${service} expertise in ${location.name} includes:
- Local market research and strategy
- ${location.name}-focused content creation
- Community engagement and reputation management
- Performance tracking and optimization

Why choose us for ${service} in ${location.name}?
✓ Local market expertise
✓ Proven track record in ${location.name}
✓ Dedicated support team
✓ Results-driven approach
    `;
  },

  /**
   * Get breadcrumb data for geographic navigation
   */
  getGeoBreadcrumbs: (location, service) => {
    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations' },
      { name: location.name, path: `/locations/${location.slug}` }
    ];

    if (service) {
      breadcrumbs.push({
        name: `${service}`,
        path: `/locations/${location.slug}/${service.toLowerCase()}`
      });
    }

    return breadcrumbs;
  },

  /**
   * Generate FAQ for specific location and service
   */
  generateLocationFAQ: (location, service) => [
    {
      question: `Why choose DigitalGram for ${service} in ${location.name}?`,
      answer: `DigitalGram has established expertise in ${location.name} with proven results. We understand the local market dynamics and provide tailored ${service} solutions.`
    },
    {
      question: `How do we serve ${location.name}?`,
      answer: `We work with businesses across ${location.name} including ${location.vicinity?.join(', ') || 'surrounding areas'}. Our remote-first approach ensures seamless collaboration.`
    },
    {
      question: `What ${service} services do we offer in ${location.name}?`,
      answer: `Our ${service} services in ${location.name} include strategy, implementation, optimization, and ongoing management tailored to local market needs.`
    },
    {
      question: `Can we help businesses outside ${location.name}?`,
      answer: `Absolutely! While ${location.name} is our primary focus, we serve clients across Uttar Pradesh, India, and internationally.`
    }
  ],

  /**
   * Generate hreflang tags for location pages
   */
  generateHrefLangTags: (location) => {
    return {
      self: `${siteData.baseUrl}/locations/${location.slug}`,
      hrefLang: {
        "en-IN": `${siteData.baseUrl}/locations/${location.slug}`,
        "en": `${siteData.baseUrl}/locations/${location.slug}`
      }
    };
  },

  /**
   * Get tier-specific messaging
   */
  getTierSpecificMessaging: (tier) => {
    const messages = {
      tier1: {
        heading: "Your Local Digital Marketing Partner in Kanpur",
        subheading: "Trusted by businesses across Kanpur and nearby areas",
        description: "Serving the Kanpur region with expert digital marketing solutions"
      },
      tier2: {
        heading: "Digital Marketing Excellence Across Uttar Pradesh",
        subheading: "Expanding opportunities in UP",
        description: "DigitalGram brings Kanpur's expertise to cities across Uttar Pradesh"
      },
      tier3: {
        heading: "India's Digital Growth Agency",
        subheading: "National presence, local expertise",
        description: "Serving businesses nationwide with specialized local market knowledge"
      },
      tier4: {
        heading: "Global Digital Marketing Partner",
        subheading: "International reach, proven expertise",
        description: "Bringing Indian innovation to global markets"
      }
    };
    return messages[tier] || messages.tier1;
  }
};

/**
 * Build location + service keywords
 */
function buildGeoKeywords(location, service) {
  const keywords = [];

  // Primary location keywords
  if (geoKeywords.geoKeywords[location.slug]) {
    keywords.push(...(geoKeywords.geoKeywords[location.slug].primary || []));
  }

  // Service + location keywords
  if (geoKeywords.serviceKeywords[service?.id]) {
    const serviceKeywords = geoKeywords.serviceKeywords[service.id];
    if (serviceKeywords[location.slug]) {
      keywords.push(...serviceKeywords[location.slug]);
    }
  }

  // Generic combinations
  keywords.push(
    `${service} in ${location.name}`,
    `${service} agency ${location.name}`,
    `${service} services ${location.name}`,
    `best ${service} in ${location.name}`
  );

  return keywords.slice(0, 15);
}

export default GeoContentStrategies;
