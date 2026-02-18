"use client";

import servicesData from "@/data/services.json";
import Link from "next/link";
import Card from "@/components/UI/Card";
import RevealWrapper from "@/components/UI/RevealWrapper";
import "./style/homeServices.css";

export default function HomeServices() {
  const services = servicesData.tabs.slice(0, 3);

  return (
    <section className="services-preview">

      <div className="services-header">

        <RevealWrapper>
          <div className="services-heading-block">
            <span className="services-eyebrow">What we do</span>
            <h2 className="services-heading">
              Services designed to drive real growth.
            </h2>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <Link href="/services" className="services-arrow">
            View all services →
          </Link>
        </RevealWrapper>

      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <RevealWrapper
            key={service.id}
            delay={index * 120}
            direction="up"
          >
            <Card variant="blue-accent" className="service-card">
              <h3 className="service-title-card">
                {service.label}
              </h3>

              <p className="service-description">
                {service.description}
              </p>

              <Link
                href={`/services/${service.id}`}
                className="service-link"
              >
                Know more →
              </Link>
            </Card>
          </RevealWrapper>
        ))}
      </div>

    </section>
  );
}
