/**
 * Geographic SEO Configuration
 * Centralized config for all geo-related settings
 * Makes the entire system scalable and maintainable
 */

// ============================================
// TIER CONFIGURATION
// ============================================
export const GEO_TIERS = {
  TIER_1: {
    id: 'tier1',
    name: 'Kanpur & Nearby Areas',
    label: 'Primary Service Area',
    priority: 0.95,
    icon: '🏘️',
    description: 'Serving the Kanpur region with dedicated local expertise',
    targetAudience: 'Local businesses in Kanpur',
    focusLevel: 'HIGH'
  },
  TIER_2: {
    id: 'tier2',
    name: 'Uttar Pradesh',
    label: 'State-Wide Presence',
    priority: 0.85,
    icon: '🏢',
    description: 'Expanding our expert services across UP\'s major business hubs',
    targetAudience: 'Businesses across Uttar Pradesh',
    focusLevel: 'MEDIUM'
  },
  TIER_3: {
    id: 'tier3',
    name: 'Major Indian Cities',
    label: 'National Coverage',
    priority: 0.75,
    icon: '🇮🇳',
    description: 'Serving businesses across India\'s top markets',
    targetAudience: 'Indian businesses nationwide',
    focusLevel: 'MEDIUM'
  },
  TIER_4: {
    id: 'tier4',
    name: 'Global Markets',
    label: 'International Reach',
    priority: 0.65,
    icon: '🌐',
    description: 'Serving clients worldwide',
    targetAudience: 'International clients',
    focusLevel: 'LOW'
  }
};

// ============================================
// SCHEMA CONFIGURATION
// ============================================
export const SCHEMA_CONFIG = {
  defaultCountry: 'India',
  defaultLanguage: 'en-IN',
  schemaTypes: {
    LOCAL_BUSINESS: 'LocalBusiness',
    SERVICE: 'Service',
    ORGANIZATION: 'Organization',
    BREADCRUMB: 'BreadcrumbList',
    FAQ: 'FAQPage',
    SERVICE_AREA: 'ServiceArea'
  },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.thedigitalgram.in'
};

// ============================================
// SEO CONFIGURATION
// ============================================
export const SEO_CONFIG = {
  titleMaxLength: 60,
  descriptionMaxLength: 160,
  defaultLocale: 'en-IN',
  supportedLocales: ['en-IN', 'en'],
  metaTags: {
    charset: 'utf-8',
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow'
  },
  ogImage: {
    width: 1200,
    height: 630,
    alt: 'DigitalGram'
  }
};

// ============================================
// PAGINATION & PAGINATION CONFIGURATION
// ============================================
export const PAGINATION_CONFIG = {
  locationsPerPage: 12,
  tiersPerPage: 6,
  serviceLocationsPerPage: 20
};

// ============================================
// FEATURE FLAGS
// ============================================
export const FEATURE_FLAGS = {
  enableLocationPages: true,
  enableServiceLocationPages: true,
  enableInternationalTargeting: true,
  enableLocationFiltering: true,
  enableLocationComparison: false,
  enableLocationReviews: false,
  enableLocationAnalytics: true,
  enableDynamicSitemaps: true
};

// ============================================
// CONTENT CONFIGURATION
// ============================================
export const CONTENT_CONFIG = {
  defaultCTA: 'Get Free Consultation',
  supportEmail: 'support@thedigitalgram.in',
  supportPhone: '+91-9876543210',
  businessHours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed'
  }
};

// ============================================
// API CONFIGURATION
// ============================================
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  endpoints: {
    locations: '/locations',
    locationsByTier: '/locations/tier',
    locationBySlug: '/locations/slug',
    services: '/services',
    keywords: '/keywords',
    schema: '/schema'
  },
  cache: {
    enabled: true,
    ttl: 3600, // 1 hour
    staleWhileRevalidate: 86400 // 24 hours
  }
};

// ============================================
// UTILITY: Get tier config by ID
// ============================================
export function getTierConfig(tierId) {
  const tierKey = Object.keys(GEO_TIERS).find(
    key => GEO_TIERS[key].id === tierId
  );
  return tierKey ? GEO_TIERS[tierKey] : null;
}

// ============================================
// UTILITY: Get all tiers ordered
// ============================================
export function getAllTiers() {
  return [
    GEO_TIERS.TIER_1,
    GEO_TIERS.TIER_2,
    GEO_TIERS.TIER_3,
    GEO_TIERS.TIER_4
  ];
}

// ============================================
// UTILITY: Get tier by priority
// ============================================
export function getTierByPriority(priority) {
  return getAllTiers().find(tier => tier.priority === priority);
}

export default {
  GEO_TIERS,
  SCHEMA_CONFIG,
  SEO_CONFIG,
  PAGINATION_CONFIG,
  FEATURE_FLAGS,
  CONTENT_CONFIG,
  API_CONFIG,
  getTierConfig,
  getAllTiers,
  getTierByPriority
};
