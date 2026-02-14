import data from "@/data/whoWeWorkWith.json";
import RevealWrapper from "@/components/UI/RevealWrapper";
import "./style/WhoWeWorkWith.css";

export default function WhoWeWorkWith() {
  return (
    <section className="who-we-work-with">
      <div className="who-we-work-with-container">

        {/* Header */}
        <header className="who-we-work-with-header">
          <RevealWrapper direction="up">  
          <h2 className="section-title">
            {data.sectionTitle}
          </h2>
          </RevealWrapper>

          <RevealWrapper direction="up" delay={120}>  
          <p className="section-subtitle">
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
        <div className="industries-grid">
          {data.industries.map(industry => (
            <div key={industry.id} className="industry-card">
              <RevealWrapper direction="up" delay={240}>  
              <span className="industry-icon">
                {industry.icon}
              </span>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={240}>  
              <h3 className="industry-title">
                {industry.title}
              </h3>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={240}>  
              <p className="industry-description">
                {industry.description}
              </p>
              </RevealWrapper>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
