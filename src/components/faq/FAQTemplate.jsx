'use client';

import React, { useState } from 'react';
import RevealWrapper from "../UI/RevealWrapper";
import siteData from "@/data/site.json";
import "./style/FAQTemplate.css";

export default function FAQTemplate({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const labels = siteData.uiContent.pseo.titles;

  // Flatten FAQs into a single array for the main FAQ page
  const allFaqs = [
    ...faqs.general,
    ...Object.values(faqs.services).flat()
  ];

  return (
    <div className="faq-template">
      <header className="faq-hero">
        <div className="faq-container">
          <RevealWrapper direction="up" delay={100}>
            <span className="faq-eyebrow">Support Center</span>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={200}>
            <h1 className="faq-title">{labels.faq}</h1>
          </RevealWrapper>
        </div>
      </header>

      <main className="faq-content">
        <div className="faq-container">
          <div className="faq-accordion">
            {allFaqs.map((faq, index) => (
              <RevealWrapper key={index} direction="up" delay={index * 50}>
                <div className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                  <button 
                    className="faq-question" 
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
