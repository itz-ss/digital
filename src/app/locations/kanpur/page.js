/**
 * Kanpur Location Page
 * File: src/app/locations/kanpur/page.js
 * 
 * This is an example implementation for the primary location (Kanpur)
 */

import { notFound } from 'next/navigation';
import { generateLocalBusinessWithRatingsSchema, generateGeoServiceAreaSchema } from '@/utils/schema_markup';
import { GeoContentStrategies } from '@/utils/geoContentStrategy';
import geoLocations from '@/data/geo-locations.json';
import siteData from '@/data/site.json';
import styles from './kanpur.module.css';

const location = geoLocations.tiers.tier1.locations.find(l => l.slug === 'kanpur');

export const metadata = {
  title: `Digital Marketing Agency in ${location.name} | DigitalGram`,
  description: `${location.description} DigitalGram is the leading digital marketing agency in ${location.name} offering SEO, Social Media, Web Development and more.`,
  keywords: [
    `digital marketing agency ${location.name}`,
    `best digital agency ${location.name}`,
    `seo services ${location.name}`,
    `social media marketing ${location.name}`,
    `web development ${location.name}`,
    `performance marketing ${location.name}`,
    `top marketing agency ${location.name}`,
    `video editing ${location.name}`,
    `content creation ${location.name}`,
    `brand building ${location.name}`
  ],
  openGraph: {
    title: `Best Digital Marketing Agency in ${location.name}`,
    description: `Scale your business with DigitalGram - the leading digital marketing agency in ${location.name}.`,
    url: `${siteData.baseUrl}/locations/${location.slug}`,
  }
};

export default function KanpurPage() {
  const schema = generateLocalBusinessWithRatingsSchema(location);
  const breadcrumbs = GeoContentStrategies.getGeoBreadcrumbs(location);
  const faq = GeoContentStrategies.generateLocationFAQ(location, 'Digital Marketing');
  const messaging = GeoContentStrategies.getTierSpecificMessaging('tier1');

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>{messaging.heading}</h1>
            <p className={styles.subtitle}>{messaging.subheading}</p>
            <p className={styles.description}>{messaging.description}</p>
            <button className={styles.ctaButton}>Get Free Consultation</button>
          </div>
        </section>

        {/* Location Overview */}
        <section className={styles.locationOverview}>
          <div className={styles.wrapper}>
            <h2>About Our Service in {location.name}</h2>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewCard}>
                <h3>📍 Local Expertise</h3>
                <p>Deep understanding of {location.name}'s unique business landscape and consumer behavior</p>
              </div>
              <div className={styles.overviewCard}>
                <h3>🎯 Proven Results</h3>
                <p>Track record of success with businesses across {location.name} and nearby areas</p>
              </div>
              <div className={styles.overviewCard}>
                <h3>🤝 Dedicated Support</h3>
                <p>Local team ready to support your growth in {location.name}</p>
              </div>
              <div className={styles.overviewCard}>
                <h3>📊 Data-Driven</h3>
                <p>Strategic approach based on {location.name} market insights and analytics</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.services}>
          <div className={styles.wrapper}>
            <h2>Our Services in {location.name}</h2>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <h3>🔍 SEO & Local Search</h3>
                <p>Get found by customers in {location.name} searching for your services</p>
              </div>
              <div className={styles.serviceCard}>
                <h3>📱 Social Media Marketing</h3>
                <p>Build and engage your community on Instagram, Facebook, and more</p>
              </div>
              <div className={styles.serviceCard}>
                <h3>🎬 Content & Video</h3>
                <p>Professional content creation tailored to {location.name} audience</p>
              </div>
              <div className={styles.serviceCard}>
                <h3>🌐 Web Development</h3>
                <p>Beautiful, conversion-focused websites for {location.name} businesses</p>
              </div>
              <div className={styles.serviceCard}>
                <h3>📢 Public Relations</h3>
                <p>Build your brand reputation and credibility in {location.name}</p>
              </div>
              <div className={styles.serviceCard}>
                <h3>💰 Performance Marketing</h3>
                <p>Drive results with targeted campaigns for {location.name} market</p>
              </div>
            </div>
          </div>
        </section>

        {/* Area Coverage */}
        {location.vicinity && location.vicinity.length > 0 && (
          <section className={styles.areaCoverage}>
            <div className={styles.wrapper}>
              <h2>Areas We Serve in {location.name}</h2>
              <p>While {location.name} is our primary focus, we serve businesses across these areas:</p>
              <div className={styles.areasList}>
                {location.vicinity.map((area, idx) => (
                  <span key={idx} className={styles.areaTag}>{area}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        <section className={styles.whyChoose}>
          <div className={styles.wrapper}>
            <h2>Why Choose DigitalGram for Your {location.name} Business?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefit}>
                <h3>✓ Local Market Knowledge</h3>
                <p>We understand the {location.name} market dynamics and business culture</p>
              </div>
              <div className={styles.benefit}>
                <h3>✓ Proven Track Record</h3>
                <p>Successful campaigns for {location.name} businesses across all industries</p>
              </div>
              <div className={styles.benefit}>
                <h3>✓ Transparent Reporting</h3>
                <p>Clear metrics and ROI tracking for all your digital investments</p>
              </div>
              <div className={styles.benefit}>
                <h3>✓ Dedicated Team</h3>
                <p>Local support and quick turnaround times for {location.name} clients</p>
              </div>
              <div className={styles.benefit}>
                <h3>✓ Affordable Solutions</h3>
                <p>Tailored packages suitable for {location.name} business budgets</p>
              </div>
              <div className={styles.benefit}>
                <h3>✓ Long-term Partnership</h3>
                <p>We grow with your business, not just a one-time project</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.wrapper}>
            <h2>Frequently Asked Questions - {location.name}</h2>
            <div className={styles.faqContainer}>
              {faq.map((item, idx) => (
                <details key={idx} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{item.question}</summary>
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.finalCta}>
          <div className={styles.wrapper}>
            <h2>Ready to Transform Your Digital Presence in {location.name}?</h2>
            <p>Let's work together to grow your business</p>
            <button className={styles.ctaButton}>Schedule Free Consultation</button>
          </div>
        </section>
      </div>
    </>
  );
}
