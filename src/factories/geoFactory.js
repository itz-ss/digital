/**
 * Geographic SEO Factory Functions
 * Factories for creating reusable geo objects and components
 * Enables scalability and DRY principles
 */

import {
  getTierConfig,
  SEO_CONFIG,
  SCHEMA_CONFIG,
  CONTENT_CONFIG
} from '@/config/geoConfig';

// ============================================
// LOCATION FACTORY
// ============================================
export class LocationFactory {
  /**
   * Create a location object with defaults
   */
  static createLocation(data) {
    return {
      slug: data.slug,
      name: data.name,
      type: data.type || 'city',
      state: data.state,
      country: data.country || 'India',
      pincode: data.pincode,
      latitude: data.latitude,
      longitude: data.longitude,
      landmarks: data.landmarks || [],
      description: data.description,
      vicinity: data.vicinity || [],
      distance: data.distance,
      tier: data.tier,
      keywords: data.keywords || [],
      services: data.services || [],
      // Auto-generated fields
      url: `/locations/${data.slug}`,
      canonicalUrl: `${SCHEMA_CONFIG.baseUrl}/locations/${data.slug}`,
      createdAt: new Date().toISOString(),
      metadata: {
        population: data.metadata?.population,
        businessDensity: data.metadata?.businessDensity,
        averageIncome: data.metadata?.averageIncome,
        ...data.metadata
      }
    };
  }

  /**
   * Create multiple locations from array
   */
  static createLocations(locationsData) {
    return locationsData.map(loc => this.createLocation(loc));
  }

  /**
   * Create location with full content
   */
  static createLocationWithContent(location, contentGenerator) {
    return {
      ...location,
      content: contentGenerator.generateContent(location)
    };
  }

  /**
   * Create location group by tier
   */
  static createLocationGroup(tier, locations) {
    return {
      tierId: tier.id,
      tierName: tier.name,
      tierLabel: tier.label,
      icon: tier.icon,
      priority: tier.priority,
      locations: locations,
      count: locations.length,
      sitemapPriority: tier.priority,
      changeFrequency: tier.priority > 0.8 ? 'monthly' : 'quarterly'
    };
  }
}

// ============================================
// METADATA FACTORY
// ============================================
export class MetadataFactory {
  /**
   * Create SEO metadata for location
   */
  static createLocationMetadata(location, service = null) {
    const title = service
      ? `Best ${service} Agency in ${location.name} | DigitalGram`
      : `Digital Marketing Agency in ${location.name} | DigitalGram`;

    const description = service
      ? `Looking for top-rated ${service} services in ${location.name}? DigitalGram offers professional solutions.`
      : `${location.description || location.name}. Serving ${location.state} with expert digital marketing.`;

    return {
      title: title.substring(0, SEO_CONFIG.titleMaxLength),
      description: description.substring(0, SEO_CONFIG.descriptionMaxLength),
      keywords: this.generateKeywords(location, service),
      canonical: location.canonicalUrl,
      ogImage: {
        ...SEO_CONFIG.ogImage,
        url: `${SCHEMA_CONFIG.baseUrl}/og-images/locations/${location.slug}.jpg`
      },
      twitter: {
        card: 'summary_large_image',
        title: title.substring(0, 70),
        description: description.substring(0, 100)
      },
      robots: {
        index: true,
        follow: true,
        maxSnippet: -1,
        maxImagePreview: 'large'
      },
      alternates: {
        canonical: location.canonicalUrl,
        languages: {
          'en-IN': location.canonicalUrl,
          'en': `${location.canonicalUrl}?lang=en`
        }
      }
    };
  }

  /**
   * Generate keywords for location
   */
  static generateKeywords(location, service) {
    const keywords = [];

    // Location keywords
    keywords.push(`${location.name}`);
    keywords.push(`${location.name}, ${location.state}`);
    keywords.push(`Digital marketing ${location.name}`);
    keywords.push(`Best agency in ${location.name}`);

    // Service keywords
    if (service) {
      keywords.push(`${service} ${location.name}`);
      keywords.push(`${service} agency ${location.name}`);
      keywords.push(`Best ${service} ${location.name}`);
    }

    // State keywords
    if (location.state) {
      keywords.push(`Digital marketing ${location.state}`);
    }

    return keywords.slice(0, 15);
  }

  /**
   * Create metadata for locations page
   */
  static createLocationsPageMetadata() {
    return {
      title: 'Digital Marketing Services by Location | DigitalGram',
      description: 'Find the best digital marketing and SEO services in your city. DigitalGram serves Kanpur, Uttar Pradesh, and Indian cities.',
      keywords: [
        'digital marketing agencies near me',
        'local seo services by location',
        'marketing agency directory'
      ]
    };
  }
}

// ============================================
// SCHEMA FACTORY
// ============================================
export class SchemaFactory {
  /**
   * Create LocalBusiness schema for location
   */
  static createLocalBusinessSchema(location) {
    return {
      '@context': 'https://schema.org',
      '@type': SCHEMA_CONFIG.schemaTypes.LOCAL_BUSINESS,
      name: `DigitalGram - ${location.name}`,
      url: location.canonicalUrl,
      image: `${SCHEMA_CONFIG.baseUrl}/logo/android-chrome-512x512.png`,
      description: location.description,
      telephone: CONTENT_CONFIG.supportPhone,
      email: CONTENT_CONFIG.supportEmail,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.landmarks?.[0] || location.name,
        addressLocality: location.name,
        addressRegion: location.state,
        postalCode: location.pincode,
        addressCountry: location.country
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.latitude,
        longitude: location.longitude
      },
      areaServed: location.vicinity || [],
      serviceArea: {
        '@type': 'City',
        name: location.name
      }
    };
  }

  /**
   * Create BreadcrumbList schema
   */
  static createBreadcrumbSchema(items) {
    return {
      '@context': 'https://schema.org',
      '@type': SCHEMA_CONFIG.schemaTypes.BREADCRUMB,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  /**
   * Create multiple schemas in one graph
   */
  static createSchemaGraph(schemas) {
    return {
      '@context': 'https://schema.org',
      '@graph': schemas
    };
  }
}

// ============================================
// URL FACTORY
// ============================================
export class UrlFactory {
  /**
   * Create location URL
   */
  static createLocationUrl(locationSlug) {
    return `/locations/${locationSlug}`;
  }

  /**
   * Create service-location URL
   */
  static createServiceLocationUrl(serviceId, locationSlug) {
    return `/locations/${locationSlug}/${serviceId}`;
  }

  /**
   * Create tier URL
   */
  static createTierUrl(tierId) {
    return `/locations?tier=${tierId}`;
  }

  /**
   * Create canonical URL
   */
  static createCanonicalUrl(path) {
    return `${SCHEMA_CONFIG.baseUrl}${path}`;
  }

  /**
   * Create sitemap URL
   */
  static createSitemapUrl(tier) {
    return `${SCHEMA_CONFIG.baseUrl}/sitemap-${tier.id}.xml`;
  }
}

// ============================================
// BREADCRUMB FACTORY
// ============================================
export class BreadcrumbFactory {
  /**
   * Create breadcrumbs for location
   */
  static createLocationBreadcrumbs(location, service = null) {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/locations' },
      { name: location.name, url: UrlFactory.createLocationUrl(location.slug) }
    ];

    if (service) {
      breadcrumbs.push({
        name: service,
        url: UrlFactory.createServiceLocationUrl(service.toLowerCase(), location.slug)
      });
    }

    return breadcrumbs;
  }

  /**
   * Create breadcrumbs for tier
   */
  static createTierBreadcrumbs(tier) {
    return [
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/locations' },
      { name: tier.name, url: UrlFactory.createTierUrl(tier.id) }
    ];
  }
}

// ============================================
// CONTENT FACTORY
// ============================================
export class ContentFactory {
  /**
   * Create FAQ content for location
   */
  static createLocationFAQ(location, service = null) {
    return [
      {
        question: `Why choose DigitalGram for ${service ? service : 'digital marketing'} in ${location.name}?`,
        answer: `DigitalGram has established expertise in ${location.name} with proven results. We understand the local market dynamics and provide tailored solutions.`
      },
      {
        question: `How do we serve ${location.name}?`,
        answer: `We work with businesses across ${location.name}${location.vicinity?.length ? ` including ${location.vicinity.join(', ')}` : ''}. Our approach ensures seamless collaboration.`
      },
      {
        question: `Can we help businesses outside ${location.name}?`,
        answer: `Absolutely! While ${location.name} is our primary focus, we serve clients across ${location.state}, India, and internationally.`
      }
    ];
  }

  /**
   * Create service description for location
   */
  static createLocationServiceDescription(location, service) {
    return `
At DigitalGram, we provide specialized ${service} services in ${location.name}. 
With our deep understanding of the local market, we help businesses build their digital presence and drive growth.

Our expertise in ${location.name} includes:
- Local market research and strategy
- ${location.name}-focused content creation
- Community engagement and reputation management
- Performance tracking and optimization

Why choose us for ${service} in ${location.name}?
✓ Local market expertise
✓ Proven track record
✓ Dedicated support team
✓ Results-driven approach
    `;
  }

  /**
   * Create CTA text for location
   */
  static createLocationCTA(location) {
    return {
      main: `Ready to Transform Your Digital Presence in ${location.name}?`,
      subtitle: `Let's work together to grow your business`,
      button: CONTENT_CONFIG.defaultCTA
    };
  }
}

export default {
  LocationFactory,
  MetadataFactory,
  SchemaFactory,
  UrlFactory,
  BreadcrumbFactory,
  ContentFactory
};
