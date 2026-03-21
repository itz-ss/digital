'use client';

import servicesData from "@/data/services.json";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RevealWrapper from "../UI/RevealWrapper";
import "./style/ServiceDetail.css";

export default function ServiceDetail({ id }) {
  const router = useRouter();

  const service = servicesData.tabs.find((s) => s.id === id);

  if (!service) {
    return (
      <section className="service-not-found">
        <RevealWrapper direction="up" delay={240}>
          <h1>Service not found</h1>
        </RevealWrapper>
        <Link href="/services">Back to services</Link>
      </section>
    );
  }

  return (
    <>
      <section className="service-detail">
        <div className="service-detail-container">

          {/* ===== Header / Hero ===== */}
          <header className="service-hero">
            <RevealWrapper direction="up" delay={240}>
              <span className="service-eyebrow">
                {service.label}
              </span>
            </RevealWrapper>

            <RevealWrapper direction="up" delay={250}>
              <h1 className="service-title">
                {service.title}
              </h1>
            </RevealWrapper>

            <RevealWrapper direction="up" delay={260}>
              <p className="service-intro">
                {service.description}
              </p>
            </RevealWrapper>
          </header>

          {/* ===== Visual ===== */}
          <RevealWrapper direction="left" delay={260}>
            {service.image && (
              <div className="service-image">
                <Image
                  src={`/service/${service.image}`}
                  alt={service.title}
                  width={1200}
                  height={700}
                  priority
                />
              </div>
            )}
          </RevealWrapper>

          {/* ===== Long Content ===== */}
          <RevealWrapper direction="up" delay={240}>
            <div className="service-content">
              {service.detailedDescription
                .split("\n\n")
                .map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
            </div>
          </RevealWrapper>

          {/* ===== Deliverables ===== */}
          <RevealWrapper direction="up" delay={240}>
            <section className="service-deliverables">
              <h2 className="deliverables-title">What’s included</h2>

              <ul className="deliverables-list">
                {service.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          </RevealWrapper>

          {/* ===== Footer CTA ===== */}
          <RevealWrapper direction="up" delay={240}>
            <footer className="service-footer">
              <Link href="/services" className="service-back">
                ← Back to all services
              </Link>
            </footer>
          </RevealWrapper>

        </div>
      </section>
    </>
  );
}
