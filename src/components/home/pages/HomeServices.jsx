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
            <span className="text-mono services-eyebrow">Module // 02 SERVICES</span>
            <h2 className="services-heading">
              Engineered for measurable impact.
            </h2>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <Link href="/services" className="services-arrow text-mono">
            View Protocol Directory →
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
            <Card variant="secondary" className="service-card">
              <span className="text-mono service-id">ID_{service.id.toUpperCase()}</span>
              
              <h3 className="service-title-card">
                {service.label}
              </h3>

              <p className="service-description">
                {service.description}
              </p>

              <Link
                href={`/services/${service.id}`}
                className="service-link text-mono"
              >
                DEPLOY PROTOCOL →
              </Link>
            </Card>
          </RevealWrapper>
        ))}
      </div>

    </section>
  );
}
