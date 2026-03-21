import data from "@/data/whoWeWorkWith.json";
import Card from "@/components/UI/Card";
import RevealWrapper from "@/components/UI/RevealWrapper";
import "./style/WhoWeWorkWith.css";

export default function WhoWeWorkWith() {
  return (
    <section className="who-we-work-with">
      <div className="who-we-work-with-container">

        {/* Header */}
        <header className="who-we-work-with-header">
          <RevealWrapper direction="up">
            <span className="text-mono section-module">Module // 03 ANALYSIS</span>
            <h2 className="section-title">
              {data.sectionTitle}
            </h2>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={120}>
            <p className="section-subtitle text-mono">
              {data.sectionSubtitle}
            </p>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={240}>
            <p className="section-description">
              {data.description}
            </p>
          </RevealWrapper>
        </header>

        {/* Grid */}
        <RevealWrapper direction="up" delay={240}>
        <div className="industries-grid">
          {data.industries.map(industry => (
            <Card key={industry.id} className="industry-card" variant="secondary">
              <div className="hud-corner hud-tl"></div>
              <div className="hud-corner hud-tr"></div>
              
              <RevealWrapper direction="up" delay={260}>
                <span className="industry-icon-wrapper">
                  <span className="industry-icon">{industry.icon}</span>
                  <div className="icon-ring"></div>
                </span>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={280}>
                <h3 className="industry-title">
                  {industry.title}
                </h3>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={300}>
                <p className="industry-description">
                  {industry.description}
                </p>
              </RevealWrapper>
              
              <div className="text-mono card-status">DATABASE_MATCH_FOUND</div>
            </Card>
          ))}
        </div>
        </RevealWrapper>

      </div>
    </section>
  );
}
