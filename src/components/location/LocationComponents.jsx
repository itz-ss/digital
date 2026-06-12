/**
 * Reusable Location Components
 * Generic, configurable components for location pages
 */

'use client';

import React from 'react';
import styles from './locationComponents.module.css';

// ============================================
// LocationHero Component
// ============================================
export function LocationHero({ location, tier, cta = null }) {
  const heading = `${tier?.name || ''} Digital Marketing Services`;
  const subtitle = `Professional solutions for ${location.name}`;

  return (
    <section className={styles.hero}>
      <div className={styles.wrapper}>
        <h1 className={styles.heroTitle}>{heading}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <p className={styles.heroDescription}>{location.description}</p>
        {cta && (
          <button className={styles.ctaButton}>
            {cta.button || 'Get Free Consultation'}
          </button>
        )}
      </div>
    </section>
  );
}

// ============================================
// LocationCard Component
// ============================================
export function LocationCard({ location, showDistance = false, onClick = null }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{location.name}</h3>

        {location.state && (
          <p className={styles.cardState}>{location.state}</p>
        )}

        {showDistance && location.distance && (
          <p className={styles.cardDistance}>{location.distance}</p>
        )}

        <p className={styles.cardDescription}>{location.description}</p>

        {location.landmarks && location.landmarks.length > 0 && (
          <div className={styles.landmarks}>
            {location.landmarks.slice(0, 2).map((landmark, idx) => (
              <span key={idx} className={styles.landmark}>
                {landmark}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.arrow}>→</div>
    </div>
  );
}

// ============================================
// LocationGrid Component
// ============================================
export function LocationGrid({ locations, onLocationClick = null, columns = 3 }) {
  const columnStyle = { gridTemplateColumns: `repeat(auto-fill, minmax(${300 / columns}px, 1fr))` };

  return (
    <div className={styles.grid} style={columnStyle}>
      {locations.map(location => (
        <div key={location.slug} onClick={() => onLocationClick?.(location)}>
          <LocationCard location={location} />
        </div>
      ))}
    </div>
  );
}

// ============================================
// TierSection Component
// ============================================
export function TierSection({ tier, locations, onLocationClick = null }) {
  return (
    <section className={styles.tierSection}>
      <div className={styles.wrapper}>
        <div className={styles.tierHeader}>
          <h2 className={styles.tierTitle}>
            {tier.icon} {tier.name}
          </h2>
          <p className={styles.tierSubtitle}>{tier.description}</p>
        </div>

        <LocationGrid
          locations={locations}
          onLocationClick={onLocationClick}
        />
      </div>
    </section>
  );
}

// ============================================
// LocationServices Component
// ============================================
export function LocationServices({ location, services = [] }) {
  const defaultServices = [
    'SEO & Local Search',
    'Social Media Marketing',
    'Content & Video',
    'Web Development',
    'Public Relations',
    'Performance Marketing'
  ];

  const serviceList = services.length > 0 ? services : defaultServices;

  return (
    <section className={styles.services}>
      <div className={styles.wrapper}>
        <h2>Our Services in {location.name}</h2>
        <p>Tailored solutions for businesses in {location.name}:</p>

        <div className={styles.servicesList}>
          {serviceList.map((service, idx) => (
            <div key={idx} className={styles.serviceItem}>
              <div className={styles.serviceIcon}>✓</div>
              <div className={styles.serviceContent}>
                <h3>{service}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LocationFAQ Component
// ============================================
export function LocationFAQ({ location, faqItems = [] }) {
  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <section className={styles.faq}>
      <div className={styles.wrapper}>
        <h2>Frequently Asked Questions - {location.name}</h2>

        <div className={styles.faqContainer}>
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className={styles.faqItem}
              open={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <summary className={styles.faqQuestion}>
                {item.question}
              </summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LocationVicinityAreas Component
// ============================================
export function LocationVicinityAreas({ location, onAreaClick = null }) {
  if (!location.vicinity || location.vicinity.length === 0) {
    return null;
  }

  return (
    <section className={styles.vicinity}>
      <div className={styles.wrapper}>
        <h2>Areas We Serve in {location.name}</h2>
        <p>We also serve businesses in these nearby areas:</p>

        <div className={styles.areasList}>
          {location.vicinity.map((area, idx) => (
            <button
              key={idx}
              className={styles.areaTag}
              onClick={() => onAreaClick?.(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LocationWhyChoose Component
// ============================================
export function LocationWhyChoose({ location }) {
  const benefits = [
    {
      icon: '✓',
      title: 'Local Market Knowledge',
      description: `We understand the ${location.name} market dynamics and business culture`
    },
    {
      icon: '✓',
      title: 'Proven Track Record',
      description: `Successful campaigns for ${location.name} businesses across all industries`
    },
    {
      icon: '✓',
      title: 'Transparent Reporting',
      description: 'Clear metrics and ROI tracking for all your digital investments'
    },
    {
      icon: '✓',
      title: 'Dedicated Team',
      description: `Local support and quick turnaround times for ${location.name} clients`
    },
    {
      icon: '✓',
      title: 'Affordable Solutions',
      description: `Tailored packages suitable for ${location.name} business budgets`
    },
    {
      icon: '✓',
      title: 'Long-term Partnership',
      description: 'We grow with your business, not just a one-time project'
    }
  ];

  return (
    <section className={styles.whyChoose}>
      <div className={styles.wrapper}>
        <h2>Why Choose DigitalGram for Your {location.name} Business?</h2>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, idx) => (
            <div key={idx} className={styles.benefit}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LocationCTA Component
// ============================================
export function LocationCTA({ location, cta = null }) {
  const defaultCTA = {
    main: `Ready to Transform Your Digital Presence in ${location.name}?`,
    subtitle: `Let's work together to grow your business`,
    button: 'Schedule Free Consultation'
  };

  const finalCTA = cta || defaultCTA;

  return (
    <section className={styles.cta}>
      <div className={styles.wrapper}>
        <h2>{finalCTA.main}</h2>
        <p>{finalCTA.subtitle}</p>
        <button className={styles.ctaButton}>{finalCTA.button}</button>
      </div>
    </section>
  );
}

// ============================================
// LocationBreadcrumbs Component
// ============================================
export function LocationBreadcrumbs({ breadcrumbs }) {
  return (
    <nav className={styles.breadcrumbs}>
      <div className={styles.wrapper}>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <a href={crumb.url} className={styles.breadcrumb}>
              {crumb.name}
            </a>
            {idx < breadcrumbs.length - 1 && (
              <span className={styles.separator}>/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}

// ============================================
// LocationStats Component
// ============================================
export function LocationStats({ location }) {
  const stats = [
    { label: 'Service Areas', value: location.vicinity?.length || 1 },
    { label: 'Key Landmarks', value: location.landmarks?.length || 0 },
    { label: 'State', value: location.state },
    { label: 'Type', value: location.type }
  ];

  return (
    <section className={styles.stats}>
      <div className={styles.wrapper}>
        <div className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default {
  LocationHero,
  LocationCard,
  LocationGrid,
  TierSection,
  LocationServices,
  LocationFAQ,
  LocationVicinityAreas,
  LocationWhyChoose,
  LocationCTA,
  LocationBreadcrumbs,
  LocationStats
};
