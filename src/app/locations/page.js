/**
 * Main Locations Listing Page
 * File: src/app/locations/page.js
 */

import { generateMultiLocationSchema } from '@/utils/schema_markup';
import geoLocations from '@/data/geo-locations.json';
import siteData from '@/data/site.json';
import styles from './locations.module.css';

export const metadata = {
  title: 'Digital Marketing Services by Location | DigitalGram',
  description: 'Find the best digital marketing and SEO services in your city. DigitalGram serves Kanpur, Uttar Pradesh, all major Indian cities, and international clients.',
  keywords: [
    'digital marketing agencies near me',
    'local seo services by location',
    'marketing agency directory',
    'digital agency finder',
    'local digital services',
    'city-wise digital marketing',
    'regional agencies'
  ],
  openGraph: {
    title: 'Our Service Locations | DigitalGram',
    description: 'Explore our digital marketing services across multiple locations',
    url: `${siteData.baseUrl}/locations`
  }
};

export default function LocationsPage() {
  const allLocations = getAllLocations();
  const multiLocationSchema = generateMultiLocationSchema(
    [...allLocations.tier1, ...allLocations.tier2, ...allLocations.tier3]
  );

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(multiLocationSchema)}
      </script>

      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.wrapper}>
            <h1>Find Digital Marketing Services Near You</h1>
            <p>DigitalGram serves multiple locations across India and internationally</p>
          </div>
        </section>

        {/* Tier 1: Kanpur & Nearby */}
        <section className={styles.tier}>
          <div className={styles.wrapper}>
            <div className={styles.tierHeader}>
              <h2>🏘️ Kanpur & Nearby Areas (Our Primary Service Area)</h2>
              <p>Serving the Kanpur region with dedicated local expertise</p>
            </div>
            <div className={styles.locationsGrid}>
              {allLocations.tier1.map(location => (
                <LocationCard key={location.slug} location={location} />
              ))}
            </div>
          </div>
        </section>

        {/* Tier 2: Uttar Pradesh */}
        <section className={styles.tier}>
          <div className={styles.wrapper}>
            <div className={styles.tierHeader}>
              <h2>🏢 Uttar Pradesh Cities (State-Wide Presence)</h2>
              <p>Expanding our expert services across UP's major business hubs</p>
            </div>
            <div className={styles.locationsGrid}>
              {allLocations.tier2.map(location => (
                <LocationCard key={location.slug} location={location} />
              ))}
            </div>
          </div>
        </section>

        {/* Tier 3: India Major Cities */}
        <section className={styles.tier}>
          <div className={styles.wrapper}>
            <div className={styles.tierHeader}>
              <h2>🇮🇳 Major Indian Cities (National Coverage)</h2>
              <p>Serving businesses across India's top markets</p>
            </div>
            <div className={styles.locationsGrid}>
              {allLocations.tier3.map(location => (
                <LocationCard key={location.slug} location={location} />
              ))}
            </div>
          </div>
        </section>

        {/* Global Reach */}
        <section className={styles.globalReach}>
          <div className={styles.wrapper}>
            <h2>🌍 Global Reach</h2>
            <p>While we're primarily based in Kanpur, we serve clients worldwide</p>
            <div className={styles.regionsList}>
              <div className={styles.region}>South Asia</div>
              <div className={styles.region}>Southeast Asia</div>
              <div className={styles.region}>Middle East & GCC</div>
              <div className={styles.region}>North America</div>
              <div className={styles.region}>Europe</div>
              <div className={styles.region}>Australia & Oceania</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.wrapper}>
            <h2>Can't find your location?</h2>
            <p>We serve many more areas than listed. Reach out to discuss your specific needs.</p>
            <button className={styles.ctaButton}>Contact Us</button>
          </div>
        </section>
      </div>
    </>
  );
}

function LocationCard({ location }) {
  const distance = location.distance ? ` (${location.distance})` : '';
  
  return (
    <a href={`/locations/${location.slug}`} className={styles.locationCard}>
      <div className={styles.cardContent}>
        <h3>{location.name}</h3>
        {location.state && location.state !== 'Uttar Pradesh' && (
          <p className={styles.state}>{location.state}</p>
        )}
        {distance && <p className={styles.distance}>{distance}</p>}
        <p className={styles.description}>{location.description}</p>
        {location.landmarks && location.landmarks.length > 0 && (
          <div className={styles.landmarks}>
            {location.landmarks.slice(0, 2).map((landmark, idx) => (
              <span key={idx} className={styles.landmark}>{landmark}</span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.arrow}>→</div>
    </a>
  );
}

function getAllLocations() {
  return {
    tier1: geoLocations.tiers.tier1.locations,
    tier2: geoLocations.tiers.tier2.locations,
    tier3: geoLocations.tiers.tier3.locations
  };
}
