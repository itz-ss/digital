/**
 * Custom Hooks for Geographic SEO
 * Modular, reusable hooks for location logic
 */

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import geoLocations from '@/data/geo-locations.json';
import geoKeywords from '@/data/geo-keywords.json';
import { getTierConfig, GEO_TIERS } from '@/config/geoConfig';
import {
  LocationFactory,
  MetadataFactory,
  SchemaFactory,
  BreadcrumbFactory,
  UrlFactory
} from '@/factories/geoFactory';

// ============================================
// useLocationData Hook
// ============================================
export function useLocationData(locationSlug) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);

      // Search through all tiers
      let foundLocation = null;
      for (const tier of Object.values(geoLocations.tiers)) {
        if (tier.locations) {
          foundLocation = tier.locations.find(
            loc => loc.slug === locationSlug
          );
          if (foundLocation) {
            foundLocation.tier = tier;
            break;
          }
        }
      }

      if (!foundLocation) {
        throw new Error(`Location not found: ${locationSlug}`);
      }

      // Create location with factory
      const processedLocation = LocationFactory.createLocation(foundLocation);
      setLocation(processedLocation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [locationSlug]);

  return { location, loading, error };
}

// ============================================
// useLocationsByTier Hook
// ============================================
export function useLocationsByTier(tierId) {
  const tier = getTierConfig(tierId);

  const locations = useMemo(() => {
    if (!tier) return [];

    const tierData = Object.values(geoLocations.tiers).find(
      t => t.id === tierId
    );

    if (!tierData?.locations) return [];

    return tierData.locations.map(loc =>
      LocationFactory.createLocation({ ...loc, tier })
    );
  }, [tierId, tier]);

  return { locations, tier, count: locations.length };
}

// ============================================
// useAllLocationsByTier Hook
// ============================================
export function useAllLocationsByTier() {
  const result = useMemo(() => {
    const grouped = {};

    for (const [tierKey, tierData] of Object.entries(geoLocations.tiers)) {
      if (tierData.locations) {
        const tierConfig = getTierConfig(tierData.id);
        grouped[tierData.id] = {
          tier: tierConfig,
          locations: tierData.locations.map(loc =>
            LocationFactory.createLocation({ ...loc, tier: tierConfig })
          ),
          count: tierData.locations.length
        };
      }
    }

    return grouped;
  }, []);

  return result;
}

// ============================================
// useLocationMetadata Hook
// ============================================
export function useLocationMetadata(location, service = null) {
  const metadata = useMemo(() => {
    return MetadataFactory.createLocationMetadata(location, service);
  }, [location, service]);

  return metadata;
}

// ============================================
// useLocationSchema Hook
// ============================================
export function useLocationSchema(location) {
  const schema = useMemo(() => {
    return SchemaFactory.createLocalBusinessSchema(location);
  }, [location]);

  return schema;
}

// ============================================
// useLocationBreadcrumbs Hook
// ============================================
export function useLocationBreadcrumbs(location, service = null) {
  const breadcrumbs = useMemo(() => {
    return BreadcrumbFactory.createLocationBreadcrumbs(location, service);
  }, [location, service]);

  return breadcrumbs;
}

// ============================================
// useLocationKeywords Hook
// ============================================
export function useLocationKeywords(locationSlug, serviceId = null) {
  const keywords = useMemo(() => {
    const locationKeywords = geoKeywords.geoKeywords[locationSlug]?.primary || [];

    if (serviceId) {
      const serviceKeywords =
        geoKeywords.serviceKeywords[serviceId]?.[locationSlug] || [];
      return [...new Set([...locationKeywords, ...serviceKeywords])];
    }

    return locationKeywords;
  }, [locationSlug, serviceId]);

  return keywords;
}

// ============================================
// useLocationFAQ Hook
// ============================================
export function useLocationFAQ(location, service = null) {
  const { ContentFactory } = require('@/factories/geoFactory');

  const faq = useMemo(() => {
    return ContentFactory.createLocationFAQ(location, service);
  }, [location, service]);

  return faq;
}

// ============================================
// useLocationFilter Hook
// ============================================
export function useLocationFilter(locations, filterOptions = {}) {
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const applyFilters = useCallback((options) => {
    let filtered = [...locations];

    if (options.searchTerm) {
      const term = options.searchTerm.toLowerCase();
      filtered = filtered.filter(
        loc =>
          loc.name.toLowerCase().includes(term) ||
          loc.state?.toLowerCase().includes(term) ||
          loc.description?.toLowerCase().includes(term)
      );
    }

    if (options.tier) {
      filtered = filtered.filter(loc => loc.tier === options.tier);
    }

    if (options.type) {
      filtered = filtered.filter(loc => loc.type === options.type);
    }

    setFilteredLocations(filtered);
  }, [locations]);

  return { filteredLocations, applyFilters };
}

// ============================================
// useLocationSearch Hook
// ============================================
export function useLocationSearch(initialLocations = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(initialLocations);

  const search = useCallback((term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setResults(initialLocations);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = initialLocations.filter(
      location =>
        location.name.toLowerCase().includes(lowerTerm) ||
        location.state?.toLowerCase().includes(lowerTerm) ||
        location.description?.toLowerCase().includes(lowerTerm) ||
        location.landmarks?.some(l => l.toLowerCase().includes(lowerTerm))
    );

    setResults(filtered);
  }, [initialLocations]);

  return { searchTerm, results, search };
}

// ============================================
// useTierLocations Hook
// ============================================
export function useTierLocations() {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const tiersData = [];

      Object.values(geoLocations.tiers).forEach(tier => {
        const tierConfig = getTierConfig(tier.id);
        if (tierConfig && tier.locations) {
          tiersData.push({
            config: tierConfig,
            locations: tier.locations.map(loc =>
              LocationFactory.createLocation(loc)
            ),
            count: tier.locations.length
          });
        }
      });

      setTiers(tiersData);
    } finally {
      setLoading(false);
    }
  }, []);

  return { tiers, loading };
}

// ============================================
// useLocationPagination Hook
// ============================================
export function useLocationPagination(locations, itemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(locations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      currentPage,
      totalPages,
      items: locations.slice(startIndex, endIndex),
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    };
  }, [locations, currentPage, itemsPerPage]);

  const goToPage = useCallback((page) => {
    const totalPages = Math.ceil(locations.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [locations.length, itemsPerPage]);

  const nextPage = useCallback(() => {
    const totalPages = Math.ceil(locations.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, locations.length, itemsPerPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  return {
    ...paginationData,
    goToPage,
    nextPage,
    prevPage
  };
}

// ============================================
// useGeoURL Hook
// ============================================
export function useGeoURL(locationSlug, service = null) {
  const url = useMemo(() => {
    if (service) {
      return UrlFactory.createServiceLocationUrl(service, locationSlug);
    }
    return UrlFactory.createLocationUrl(locationSlug);
  }, [locationSlug, service]);

  return url;
}

export default {
  useLocationData,
  useLocationsByTier,
  useAllLocationsByTier,
  useLocationMetadata,
  useLocationSchema,
  useLocationBreadcrumbs,
  useLocationKeywords,
  useLocationFAQ,
  useLocationFilter,
  useLocationSearch,
  useTierLocations,
  useLocationPagination,
  useGeoURL
};
