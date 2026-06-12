/**
 * GEO SEO IMPLEMENTATION GUIDE
 * 
 * This file documents how to implement geographic SEO for the DigitalGram website
 */

# Geographic SEO Implementation Guide

## Overview
This website now has comprehensive geographic SEO optimization with 4 tiers:
1. **Tier 1 (Primary)**: Kanpur & Nearby Areas
2. **Tier 2 (Secondary)**: Uttar Pradesh Cities
3. **Tier 3 (Tertiary)**: Major Indian Cities
4. **Tier 4 (Global)**: International Markets

## New Files Created

### 1. Data Files
- **src/data/geo-locations.json** - Complete geographic hierarchy with coordinates, landmarks, descriptions
- **src/data/geo-keywords.json** - Geographic keywords organized by tier and service

### 2. Utility Files
- **src/utils/schema_markup.js** - Enhanced with geographic schema generators
  - `generateGeoServiceAreaSchema()` - For multi-location service areas
  - `generateMultiLocationSchema()` - For organization with multiple locations
  - `generateServiceAreaSpecializationSchema()` - For service-specific areas
  - `generateLocalBusinessWithRatingsSchema()` - Improved local business schema
  - `generateMultiRegionalSchema()` - For international reach

- **src/utils/geoContentStrategy.js** - Content generation utilities
  - Location-specific metadata generation
  - Service descriptions customized by location
  - Geographic breadcrumbs
  - Location-specific FAQs
  - Hreflang tag generation
  - Tier-specific messaging

### 3. Template Files
- **src/app/locations-template.js** - Template for location pages
  - Single location page template with proper schema
  - Locations listing page template
  - Location card component

### 4. Enhanced Files
- **src/app/layout.js** - Added:
  - Geographic meta tags (geo.position, ICBM, geo.placename, geo.region)
  - Hreflang tags for international versions
  - Enhanced keywords including state and national keywords
  - Multi-regional schema markup

- **src/app/robots.js** - Added:
  - Multiple sitemaps for different geographic regions
  - Better crawl directives

- **src/app/sitemap.js** - Added:
  - Tier 1, 2, 3 location pages
  - Service-location combinations
  - Geographic hierarchy prioritization

## Implementation Steps

### Step 1: Create Location Pages Folder Structure
```
src/app/locations/
  ├── page.js (Locations listing page)
  └── [slug]/
      ├── page.js (Individual location page)
      ├── [service]/
      │   └── page.js (Service in specific location)
```

### Step 2: Create Individual Location Pages

Copy the template from `locations-template.js` and adapt for each location:

```javascript
// File: src/app/locations/kanpur/page.js
import { generateLocalBusinessWithRatingsSchema } from '@/utils/schema_markup';
import { GeoContentStrategies } from '@/utils/geoContentStrategy';
import geoLocations from '@/data/geo-locations.json';

// Get Kanpur location data
const location = geoLocations.tiers.tier1.locations.find(l => l.slug === 'kanpur');

export const metadata = {
  title: `Digital Marketing Services in ${location.name}`,
  description: location.description,
  // ... more metadata
};

// ... page component
```

### Step 3: Enable Geographic Breadcrumbs

Use `GeoContentStrategies.getGeoBreadcrumbs()` in your pages:

```javascript
const breadcrumbs = GeoContentStrategies.getGeoBreadcrumbs(location, service);
```

### Step 4: Add Location-Specific Schema Markup

In each location page, add:

```javascript
<script type="application/ld+json">
  {JSON.stringify(generateLocalBusinessWithRatingsSchema(location))}
</script>
```

### Step 5: Generate Service-Location Pages

For each service in each location, create:
- URL: `/locations/[location-slug]/[service-id]`
- Use: `GeoContentStrategies.generateLocationServiceDescription(location, service)`

### Step 6: Update Navigation

Add location pages to your navigation or create a locations dropdown:

```javascript
<nav>
  <a href="/locations">All Locations</a>
  <a href="/locations/kanpur">Kanpur</a>
  <a href="/locations/lucknow-up">Lucknow</a>
  // ... more locations
</nav>
```

## Geographic SEO Best Practices Implemented

### 1. Local Business Schema
✅ Geographic coordinates (latitude/longitude)
✅ Service areas specified
✅ Multiple location support
✅ Contact information with location context

### 2. Geo Meta Tags
✅ geo.position - Precise GPS coordinates
✅ ICBM - International Coordinates
✅ geo.placename - Full location name
✅ geo.region - Geographic region code

### 3. Hreflang Tags
✅ Language-region variants (en-IN)
✅ Generic language versions (en)
✅ Canonical URLs

### 4. Location Hierarchy
✅ Tier 1: Kanpur with nearby areas (highest priority)
✅ Tier 2: Uttar Pradesh cities (secondary)
✅ Tier 3: India major cities (national)
✅ Tier 4: International regions (global reach)

### 5. Dynamic Content
✅ Location-specific keywords
✅ Service descriptions customized by location
✅ FAQ content for each location
✅ Geographic breadcrumbs
✅ Location-aware internal linking

### 6. Sitemaps
✅ Main sitemap includes all location pages
✅ High priority for Tier 1 locations (0.95)
✅ Descending priority for lower tiers
✅ Service-location combinations included

## SEO Keywords Used

### Kanpur (Primary)
- "Digital marketing agency in Kanpur"
- "Best SEO company Kanpur"
- "Social media marketing Kanpur"
- "Web development Kanpur"
- "Top digital agency Kanpur"

### Uttar Pradesh (Secondary)
- "Digital marketing agency Uttar Pradesh"
- "SEO services UP India"
- "Digital agency Lucknow"
- "Marketing agency Agra"

### India (National)
- "Digital marketing agency India"
- "Best SEO services India"
- "Performance marketing India"
- "Growth agency India"

### International
- "Digital marketing agency"
- "Global SEO services"
- "International marketing"

## Content Strategy by Tier

### Tier 1: Kanpur Focus
- Local case studies and testimonials
- Nearby area-specific content
- Strong internal linking
- High content frequency

### Tier 2: Uttar Pradesh Expansion
- Regional comparison content
- City-specific guides
- Service area maps
- Monthly content

### Tier 3: National Coverage
- India-wide success stories
- National industry insights
- Competitive analysis
- Quarterly updates

### Tier 4: International
- Global case studies
- Multi-country operations
- Language-specific content
- Annual updates

## Monitoring & Optimization

### Google Search Console
1. Verify all location pages
2. Monitor geographic performance
3. Check for indexation issues
4. Review search queries by location

### Local SEO Metrics
- Rankings by location
- Local pack visibility
- Direction requests
- Call conversions by location

### Schema Validation
- Use Google Rich Results Test
- Validate all schema markup
- Monitor for errors

## Next Steps

1. **Create location landing pages** for all tier locations
2. **Optimize content** with location-specific keywords
3. **Build local citations** on business directories
4. **Implement review schema** with ratings
5. **Create location-specific blog content**
6. **Setup location funnels** for each tier
7. **Monitor local search performance**

## Files to Update/Create

- [ ] `src/app/locations/page.js` - Main locations page
- [ ] `src/app/locations/[slug]/page.js` - Individual location pages
- [ ] `src/app/locations/[slug]/[service]/page.js` - Service-location pages
- [ ] Update Navbar with location links
- [ ] Create location cards component
- [ ] Add location filtering to services
- [ ] Create location-specific blog categories
- [ ] Setup location-based funnel tracking

## Schema Markup Validation

All generated schema markup should pass:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Yandex Rich Results: https://webmaster.yandex.com/tools/

## Support & Questions

For questions about implementing this geographic SEO strategy:
1. Review the utility functions in `geoContentStrategy.js`
2. Check the schema generators in `schema_markup.js`
3. Reference the location data in `geo-locations.json`
4. Use the keyword data in `geo-keywords.json`
