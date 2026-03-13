'use client';

import React from 'react';
import RevealWrapper from "../UI/RevealWrapper";
import ServicesBackground from "@/components/backgroundAnimation/ServicesBackground";
import "./style/LegalTemplate.css";

export default function LegalTemplate({ data }) {
  if (!data) return null;

  return (
    <div className="legal-template">
      <ServicesBackground />
      
      <header className="legal-hero">
        <div className="legal-container">
          <RevealWrapper direction="up" delay={100}>
            <span className="legal-eyebrow">DigitalGram Legal</span>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={200}>
            <h1 className="legal-title">{data.title}</h1>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={300}>
            <p className="legal-last-updated">Last Updated: {data.lastUpdated}</p>
          </RevealWrapper>
        </div>
      </header>

      <main className="legal-content">
        <div className="legal-container">
          {data.sections.map((section, index) => (
            <RevealWrapper key={index} direction="up" delay={100 * (index % 3)}>
              <section className="legal-section">
                <h2>{section.heading}</h2>
                <div className="legal-text">
                  {section.content.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            </RevealWrapper>
          ))}
        </div>
      </main>
    </div>
  );
}
