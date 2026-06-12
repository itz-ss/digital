/**
 * Geographic SEO Service Layer
 * Business logic abstraction for location operations
 * Enables scalability and testability
 */

import geoLocations from '@/data/geo-locations.json';
import geoKeywords from '@/data/geo-keywords.json';
import {
  LocationFactory,
  SchemaFactory,
  MetadataFactory,
  UrlFactory
} from '@/factories/geoFactory';

// ============================================
// Location Service
// ============================================
export class LocationService {
  /**
   * Get single location by slug
   */
  static getLocationBySlug(slug) {
    for (const tier of Object.values(geoLocations.tiers)) {
      if (tier.locations) {
        const location = tier.locations.find(loc => loc.slug === slug);
        if (location) {
          return LocationFactory.createLocation(location);
        }
      }
    }
    return null;
  }

  /**
   * Get all locations
   */
  static getAllLocations() {
    const all = [];
    for (const tier of Object.values(geoLocations.tiers)) {
      if (tier.locations) {
        all.push(
          ...tier.locations.map(loc => LocationFactory.createLocation(loc))
        );
      }
    }
    return all;
  }

  /**
   * Get locations by tier
   */
  static getLocationsByTier(tierId) {
    const tier = Object.values(geoLocations.tiers).find(t => t.id === tierId);
    if (!tier?.locations) return [];
    return tier.locations.map(loc => LocationFactory.createLocation(loc));
  }

  /**
   * Get locations by type
   */
  static getLocationsByType(type) {
    const all = this.getAllLocations();
    return all.filter(loc => loc.type === type);
  }

  /**
   * Get locations near coordinates
   */
  static getLocationsNearby(latitude, longitude, radiusKm = 50) {
    const all = this.getAllLocations();
    return all.filter(loc => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        loc.latitude,
        loc.longitude
      );
      return distance <= radiusKm;
    });
  }

  /**
   * Calculate distance between coordinates (Haversine formula)
   */
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Search locations
   */
  static searchLocations(term) {
    const lowerTerm = term.toLowerCase();
    return this.getAllLocations().filter(
      loc =>
        loc.name.toLowerCase().includes(lowerTerm) ||
        loc.state?.toLowerCase().includes(lowerTerm) ||
        loc.description?.toLowerCase().includes(lowerTerm) ||
        loc.landmarks?.some(l => l.toLowerCase().includes(lowerTerm))
    );
  }

  /**
   * Get location statistics
   */
  static getStatistics() {
    const stats = {
      total: 0,
      byTier: {},
      byType: {},
      byState: {}
    };

    const allLocations = this.getAllLocations();
    stats.total = allLocations.length;

    allLocations.forEach(loc => {
      // By tier
      stats.byTier[loc.tier] = (stats.byTier[loc.tier] || 0) + 1;

      // By type
      stats.byType[loc.type] = (stats.byType[loc.type] || 0) + 1;

      // By state
      if (loc.state) {
        stats.byState[loc.state] = (stats.byState[loc.state] || 0) + 1;
      }
    });

    return stats;
  }
}

// ============================================
// Keyword Service
// ============================================
export class KeywordService {
  /**
   * Get keywords for location
   */
  static getLocationKeywords(locationSlug) {
    const keywords = geoKeywords.geoKeywords[locationSlug];
    return keywords ? keywords.primary || [] : [];
  }

  /**
   * Get keywords for service in location
   */
  static getServiceLocationKeywords(serviceId, locationSlug) {
    const serviceKeywords =
      geoKeywords.serviceKeywords[serviceId]?.[locationSlug] || [];
    const locationKeywords = this.getLocationKeywords(locationSlug);
    return [...new Set([...locationKeywords, ...serviceKeywords])];
  }

  /**
   * Get all keywords by tier
   */
  static getKeywordsByTier(tier) {
    const tierKeywords = geoKeywords.geoKeywords[tier];
    return tierKeywords || {};
  }

  /**
   * Search keywords
   */
  static searchKeywords(term) {
    const lowerTerm = term.toLowerCase();
    const results = [];

    for (const [location, data] of Object.entries(geoKeywords.geoKeywords)) {
      const keywords = data.primary || [];
      keywords.forEach(kw => {
        if (kw.toLowerCase().includes(lowerTerm)) {
          results.push({ keyword: kw, location, type: 'location' });
        }
      });
    }

    for (const [service, data] of Object.entries(geoKeywords.serviceKeywords)) {
      for (const [location, keywords] of Object.entries(data)) {
        keywords.forEach(kw => {
          if (kw.toLowerCase().includes(lowerTerm)) {
            results.push({
              keyword: kw,
              location,
              service,
              type: 'service-location'
            });
          }
        });
      }
    }

    return results;
  }

  /**
   * Get trending keywords
   */
  static getTrendingKeywords(limit = 10) {
    const all = [];

    for (const keywords of Object.values(geoKeywords.geoKeywords)) {
      all.push(...(keywords.primary || []));
    }

    for (const serviceData of Object.values(geoKeywords.serviceKeywords)) {
      for (const keywords of Object.values(serviceData)) {
        all.push(...keywords);
      }
    }

    // Return unique keywords
    return [...new Set(all)].slice(0, limit);
  }
}

// ============================================
// Schema Service
// ============================================
export class SchemaService {
  /**
   * Generate schema for location
   */
  static generateLocationSchema(location) {
    return SchemaFactory.createLocalBusinessSchema(location);
  }

  /**
   * Generate schemas batch
   */
  static generateLocationsBatch(locations) {
    return locations.map(loc => this.generateLocationSchema(loc));
  }

  /**
   * Generate schema graph
   */
  static generateLocationSchemaGraph(location) {
    const localBusiness = this.generateLocationSchema(location);
    return {
      '@context': 'https://schema.org',
      '@graph': [localBusiness]
    };
  }
}

// ============================================
// Metadata Service
// ============================================
export class MetadataService {
  /**
   * Generate metadata for location
   */
  static generateLocationMetadata(location, service = null) {
    return MetadataFactory.createLocationMetadata(location, service);
  }

  /**
   * Generate metadata batch
   */
  static generateMetadataBatch(locations) {
    return locations.map(loc =>
      this.generateLocationMetadata(loc)
    );
  }

  /**
   * Validate metadata
   */
  static validateMetadata(metadata) {
    const errors = [];

    if (!metadata.title || metadata.title.length > 60) {
      errors.push('Title must be under 60 characters');
    }

    if (!metadata.description || metadata.description.length > 160) {
      errors.push('Description must be under 160 characters');
    }

    if (!Array.isArray(metadata.keywords) || metadata.keywords.length === 0) {
      errors.push('At least one keyword is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// ============================================
// URL Service
// ============================================
export class UrlService {
  /**
   * Generate sitemap entries for locations
   */
  static generateSitemapEntries(locations) {
    return locations.map(loc => ({
      url: loc.canonicalUrl || UrlFactory.createCanonicalUrl(UrlFactory.createLocationUrl(loc.slug)),
      lastModified: loc.createdAt || new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: loc.tier?.priority || 0.75
    }));
  }

  /**
   * Generate bulk URLs
   */
  static generateBulkUrls(locations, options = {}) {
    const baseUrl = options.baseUrl || '';
    return locations.map(loc => ({
      location: loc.name,
      url: `${baseUrl}/locations/${loc.slug}`,
      ...options.includeServices && {
        services: (options.services || []).map(
          svc => `${baseUrl}/locations/${loc.slug}/${svc}`
        )
      }
    }));
  }
}

// ============================================
// Analytics Service
// ============================================
export class AnalyticsService {
  /**
   * Get location performance data
   * (Mock implementation - integrate with actual analytics)
   */
  static getLocationPerformance(locationSlug) {
    return {
      location: locationSlug,
      metrics: {
        pageviews: 0,
        uniqueVisitors: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
        conversions: 0
      },
      keywords: {
        tracked: 0,
        ranking: 0,
        top10: 0,
        top3: 0
      }
    };
  }

  /**
   * Track location event
   */
  static trackLocationEvent(locationSlug, eventType, eventData) {
    return {
      timestamp: new Date().toISOString(),
      location: locationSlug,
      eventType,
      data: eventData
    };
  }
}

// ============================================
// Export all services
// ============================================
export default {
  LocationService,
  KeywordService,
  SchemaService,
  MetadataService,
  UrlService,
  AnalyticsService
};
