"use client";

import heroData from "@/data/hero.json";
import Button from "@/components/UI/Button";
import RevealWrapper from "@/components/UI/RevealWrapper";
import SplitText from "@/components/animations/SplitText";
import "./style/hero.css";

export default function Hero() {
  const { hero } = heroData;

  return (
    <section className="hero">

      {/* 🖼️ BACKGROUND IMAGE LAYER */}
      <div className="hero-bg-image">
        
      </div>

      {/* 🌫️ GRAIN/NOISE OVERLAY (PREMIUM TEXTURE) */}
      <div className="hero-noise"></div>

      {/* 🎨 COLOR OVERLAY (READABILITY CONTROL) */}
      <div className="hero-overlay"></div>

      {/* 🌈 DEPTH ELEMENTS */}
      <div className="hero-bg">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="hero-container">
        
        {/* 🤖 JARVIS HUD INTERFACE (DECORATIVE) */}
        <div className="hud-corner hud-tl"></div>
        <div className="hud-corner hud-tr"></div>
        <div className="hud-corner hud-bl"></div>
        <div className="hud-corner hud-br"></div>

        <div className="hero-content">
          <div className="hero-left">

            <RevealWrapper direction="down" delay={0}>
              <div className="system-status">
                <span className="pulse-dot"></span>
                <span className="text-mono">System Status: Active // Mark 85 Protocol</span>
              </div>
            </RevealWrapper>

            <div className="hero-title-wrapper">
              <SplitText
                text={hero.headline}
                className="hero-title"
                delay={20}
                duration={0.8}
                ease="expo.out"
                splitType="chars"
                from={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(5px)' }}
                to={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                tag="h1"
              />
            </div>

            <RevealWrapper direction="up" delay={400}>
              <div className="hero-description-container">
                <p className="hero-subtitle">
                  {hero.subheadline}
                </p>
                <div className="tech-readout">
                  <span className="text-mono">LAT: 26.4268° N // LNG: 80.3867° E</span>
                  <div className="tech-line"></div>
                </div>
              </div>
            </RevealWrapper>

            <RevealWrapper direction="up" delay={600}>
              <div className="hero-actions">
                <Button href={hero.primaryCta.href} variant="primary">
                  {hero.primaryCta.label}
                </Button>

                <Button href={hero.secondaryCta.href} variant="secondary">
                  <span className="btn-icon">⚡</span>
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </RevealWrapper>

            {/* 📊 FLOATING DATA POINTS */}
            <div className="floating-data">
              <div className="data-item">
                <span className="text-mono">Core Temp</span>
                <span className="data-val">32°C</span>
              </div>
              <div className="data-item">
                <span className="text-mono">Sync State</span>
                <span className="data-val">100%</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}