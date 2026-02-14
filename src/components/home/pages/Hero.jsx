"use client";

import heroData from "@/data/hero.json";
import Button from "@/components/ui/Button";
import RevealWrapper from "@/components/UI/RevealWrapper";
import "./style/hero.css";


export default function Hero() {
  const { hero } = heroData;

  return (
    <section className="hero">
      
      <div className="hero-container">

        <RevealWrapper direction="up">
          <h1 className="hero-title">
            {hero.headline}
          </h1>
        </RevealWrapper>

        <RevealWrapper direction="up" delay={120}>
          <p className="hero-subtitle">
            {hero.subheadline}
          </p>
        </RevealWrapper>

        <RevealWrapper direction="up" delay={240}>
          <div className="hero-actions">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>

            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </RevealWrapper>

      </div>
    </section>
  );
}
