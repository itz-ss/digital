import { generateLocalBusinessWithRatingsSchema, generateGeoServiceAreaSchema, generateGeoBreadcrumbSchema } from '@/utils/schema_markup';
import { GeoContentStrategies } from '@/utils/geoContentStrategy';
import geoLocations from '@/data/geo-locations.json';

export const metadata = {
  title: 'Digital Marketing Services by Location | DigitalGram',
  description: 'Find the best digital marketing and SEO services in your city. DigitalGram operates across Kanpur, Uttar Pradesh, and India.',
  keywords: [
    'digital marketing near me',
    'local seo services',
    'marketing agency by location',
    'digital services in my city',
    'local digital agency'
  ]
};

/**
 * LOCATION PAGES TEMPLATE
 * Use this template to create individual location pages
 * 
 * File: src/app/locations/[slug]/page.js
 */

import { notFound } from 'next/navigation';
import siteData from '@/data/site.json';

export async function generateStaticParams() {
  const params = [];
  
  // Generate params for all locations
  const allTiers = Object.values(geoLocations.tiers);
  
  allTiers.forEach(tier => {
    if (tier.locations) {
      tier.locations.forEach(location => {
        params.push({ slug: location.slug });
      });
    }
  });
  
  return params;
}

export async function generateMetadata({ params }) {
  const location = findLocation(params.slug);
  
  if (!location) {
    notFound();
  }

  const metadata = GeoContentStrategies.getLocationMetadata(location, 'Digital Marketing');

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.og.title,
      description: metadata.og.description,
      url: metadata.og.url,
      type: 'website',
      locale: 'en_IN'
    }
  };
}

function findLocation(slug) {
  const allTiers = Object.values(geoLocations.tiers);
  
  for (const tier of allTiers) {
    if (tier.locations) {
      const found = tier.locations.find(loc => loc.slug === slug);
      if (found) return found;
    }
  }
  
  return null;
}

export default function LocationPage({ params }) {
  const location = findLocation(params.slug);
  
  if (!location) {
    notFound();
  }

  const schema = generateLocalBusinessWithRatingsSchema(location);
  const breadcrumbs = GeoContentStrategies.getGeoBreadcrumbs(location);
  const breadcrumbSchema = generateGeoBreadcrumbSchema(breadcrumbs);
  const faq = GeoContentStrategies.generateLocationFAQ(location, 'Digital Marketing');

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      <div className="location-page">
        <header className="location-header">
          <h1>{location.name} | Digital Marketing & SEO Services</h1>
          <p className="subtitle">
            Professional digital marketing agency serving {location.name} 
            {location.state && location.state !== 'Uttar Pradesh' ? ` and ${location.state}` : ''}
          </p>
        </header>

        <section className="location-intro">
          <h2>Digital Marketing Services in {location.name}</h2>
          <p>{location.description}</p>
          
          {location.vicinity && location.vicinity.length > 0 && (
            <div className="vicinity-areas">
              <h3>We Also Serve These Areas:</h3>
              <ul>
                {location.vicinity.map((area, idx) => (
                  <li key={idx}>{area}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="location-services">
          <h2>Our Services in {location.name}</h2>
          <p>Tailored solutions for businesses in {location.name}:</p>
          <ul>
            <li>SEO & Local Search Optimization</li>
            <li>Social Media Marketing</li>
            <li>Content Creation & Video Marketing</li>
            <li>Web Development & Funnels</li>
            <li>Public Relations & Brand Building</li>
            <li>Performance Marketing & Lead Generation</li>
          </ul>
        </section>

        <section className="location-cta">
          <h2>Ready to Grow Your Business in {location.name}?</h2>
          <p>Contact us today for a free consultation</p>
          <button className="cta-button">Get Started</button>
        </section>

        <section className="location-faq">
          <h2>FAQs - {location.name}</h2>
          {faq.map((item, idx) => (
            <div key={idx} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </section>
      </div>

      <style>{`
        .location-page {
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .location-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .location-intro,
        .location-services,
        .location-faq {
          margin-bottom: 3rem;
        }

        .location-intro h2,
        .location-services h2,
        .location-faq h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #222;
        }

        .vicinity-areas {
          background: #f5f5f5;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .vicinity-areas ul {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          list-style: none;
          padding: 0;
        }

        .vicinity-areas li {
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border-left: 3px solid #007bff;
        }

        .location-services ul {
          list-style: none;
          padding: 0;
        }

        .location-services li {
          padding: 0.75rem 0;
          padding-left: 2rem;
          position: relative;
        }

        .location-services li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #28a745;
          font-weight: bold;
        }

        .location-cta {
          background: #007bff;
          color: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }

        .cta-button {
          background: white;
          color: #007bff;
          border: none;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 1rem;
        }

        .faq-item {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .faq-item h3 {
          color: #007bff;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
}

/**
 * LOCATIONS LIST PAGE
 * File: src/app/locations/page.js
 */

export function LocationsListPage() {
  const allLocations = getAllLocations();
  
  return (
    <div className="locations-list">
      <h1>Our Service Locations</h1>
      
      <section className="tier tier-1">
        <h2>Kanpur & Nearby Areas (Primary Service Area)</h2>
        <div className="locations-grid">
          {allLocations.tier1.map(loc => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </section>

      <section className="tier tier-2">
        <h2>Uttar Pradesh</h2>
        <div className="locations-grid">
          {allLocations.tier2.map(loc => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </section>

      <section className="tier tier-3">
        <h2>India - Major Cities</h2>
        <div className="locations-grid">
          {allLocations.tier3.map(loc => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </section>
    </div>
  );
}

function LocationCard({ location }) {
  return (
    <a href={`/locations/${location.slug}`} className="location-card">
      <h3>{location.name}</h3>
      {location.state && <p className="state">{location.state}</p>}
      <p className="description">{location.description}</p>
    </a>
  );
}

function getAllLocations() {
  const result = {
    tier1: [],
    tier2: [],
    tier3: []
  };

  const allTiers = Object.entries(geoLocations.tiers);
  
  allTiers.forEach(([tierKey, tier]) => {
    if (tier.locations) {
      if (tierKey === 'tier1') {
        result.tier1 = tier.locations;
      } else if (tierKey === 'tier2') {
        result.tier2 = tier.locations;
      } else if (tierKey === 'tier3') {
        result.tier3 = tier.locations;
      }
    }
  });

  return result;
}
