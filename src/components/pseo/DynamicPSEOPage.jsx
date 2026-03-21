'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RevealWrapper from "../UI/RevealWrapper";
import siteData from "@/data/site.json";
import locationsData from "@/data/locations.json";
import faqsData from "@/data/faqs.json";
import industriesData from "@/data/industries.json";
import contactData from "@/data/contact.json";
import "./style/DynamicPSEOPage.css";

export default function DynamicPSEOPage({ type, data }) {
  const { service, location, industry } = data;
  
  let title, description, eyebrow;

  if (type === 'service-location') {
    title = `${service.label} in ${location.name}`;
    description = `Dominate the ${location.name} market with our expert ${service.label} solutions. We help local businesses in ${location.name}, ${location.state || 'Kanpur'} scale their growth.`;
    eyebrow = location.name;
  } else if (type === 'service-industry') {
    title = `${service.label} for ${industry.name}`;
    description = `Specialized ${service.label} strategies tailored for the ${industry.name} industry. Drive more leads and conversions for your ${industry.name} business.`;
    eyebrow = industry.name;
  } else if (type === 'national') {
    title = `Best ${service.label} Agency in India`;
    description = `Leading ${service.label} services across India. DigitalGram helps brands in Delhi, Mumbai, Bangalore, and beyond scale with premium performance-driven marketing.`;
    eyebrow = "India";
  }

  const faqs = faqsData.services?.[service.id] || [];
  const allFaqs = [...faqs, ...faqsData.general].slice(0, 4);

  return (
    <>
      <section className={`pseo-page theme-${service.theme || 'blue'}`}>
        <div className="pseo-container">
          
          {/* ===== Hero Section ===== */}
          <header className="pseo-hero">
            <RevealWrapper direction="up" delay={100}>
              <span className="pseo-eyebrow">
                {eyebrow}
              </span>
            </RevealWrapper>
            
            <RevealWrapper direction="up" delay={200}>
              <h1 className="pseo-title">
                {title} <span className="gradient-text">{siteData.uiContent.pseo.labels.agency}</span>
              </h1>
            </RevealWrapper>
            
            <RevealWrapper direction="up" delay={300}>
              <p className="pseo-description">{description}</p>
            </RevealWrapper>

            <RevealWrapper direction="up" delay={400}>
              <div className="pseo-cta-group">
                <Link href="/#contact" className="btn-primary">{siteData.uiContent.common.buttons.getStarted}</Link>
                <Link href="/services" className="btn-secondary">{siteData.uiContent.common.buttons.viewAllServices}</Link>
              </div>
            </RevealWrapper>
          </header>

          {/* ===== Content Section ===== */}
          <div className="pseo-main-content">
            <RevealWrapper direction="left" delay={200}>
              <div className="pseo-text">
                <h2>{siteData.uiContent.pseo.labels.critical.replace(/{service}/g, service.label).replace(/{location}/g, eyebrow)}</h2>
                <p>
                  In today's competitive landscape, having a strong digital presence is no longer optional. 
                  For businesses in {type === 'service-location' ? `${location.name}, ${location.state || 'UP'}` : type === 'national' ? 'India' : `the ${industry.name} sector`}, 
                  {service.label} provides the visibility and authority needed to stand out.
                </p>
                {type === 'service-location' && (
                  <p>
                    Our team understands the local nuances of {location.name}. Whether you are near {location.landmarks?.[0]} or operating across {location.pincode}, 
                    we tailor our strategies to reach your ideal local customers.
                  </p>
                )}
                {type === 'service-industry' && (
                  <div className="pseo-pain-points">
                    <h3>{siteData.uiContent.pseo.titles.challenges}</h3>
                    <ul>
                      {industry.pain_points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </RevealWrapper>

            <RevealWrapper direction="right" delay={200}>
              <div className="pseo-visual">
                <Image 
                  src={`/service/${service.image}`} 
                  alt={`${service.label} solutions for businesses in ${eyebrow}`} 
                  width={600} 
                  height={400}
                  className="pseo-image"
                  priority
                />
              </div>
            </RevealWrapper>
          </div>

          {/* ===== Service Items ===== */}
          <section className="pseo-features">
            <RevealWrapper direction="up" delay={200}>
              <h2 className="section-title">{siteData.uiContent.pseo.titles.features}</h2>
            </RevealWrapper>
            <div className="pseo-features-grid">
              {service.items.map((item, i) => (
                <RevealWrapper key={i} direction="up" delay={100 * (i + 1)}>
                  <div className="feature-card">
                    <img 
                      src={`/service/icons/${service.id}-${i}.svg`} 
                      alt={`${service.label} ${item} support in ${eyebrow}`} 
                      className="feature-icon"
                      onError={(e) => e.target.style.display = 'none'}
                      loading="lazy"
                    />
                    <h3>{item}</h3>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </section>

          {/* ===== FAQ Section ===== */}
          <section className="pseo-faq">
            <RevealWrapper direction="up" delay={200}>
              <h2 className="section-title">{siteData.uiContent.pseo.titles.faq}</h2>
            </RevealWrapper>
            <div className="faq-list">
              {allFaqs.map((faq, i) => (
                <RevealWrapper key={i} direction="up" delay={100}>
                  <div className="faq-item">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </section>

          {/* ===== Internal Linking Section ===== */}
          <section className="pseo-linking">
            <RevealWrapper direction="up" delay={200}>
              <h2 className="section-title">{siteData.uiContent.pseo.titles.linking}</h2>
            </RevealWrapper>
            
            <div className="linking-grid">
              <div className="linking-group">
                <h3>{siteData.uiContent.pseo.titles.areas}</h3>
                <ul>
                  {locationsData.target_areas.map(l => (
                    <li key={l.slug}>
                      <Link href={`/${service.id}-services-${l.slug}`}>
                        {service.label} in {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="linking-group">
                <h3>{siteData.uiContent.pseo.titles.industries}</h3>
                <ul>
                  {industriesData.industries.map(i => (
                    <li key={i.slug}>
                      <Link href={`/${service.id}-for-${i.slug}`}>
                        {service.label} for {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ===== Footer CTA ===== */}
          <footer className="pseo-footer">
            <RevealWrapper direction="up" delay={200}>
              <div className="footer-cta-card">
                <h3>{siteData.uiContent.pseo.titles.cta.replace(/{eyebrow}/g, eyebrow)}</h3>
                <p>{contactData.subtitle}</p>
                <Link href="/#contact" className="btn-primary">{siteData.uiContent.common.buttons.scheduleCall}</Link>
              </div>
            </RevealWrapper>
          </footer>

        </div>
      </section>
    </>
  );
}
