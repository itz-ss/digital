import aboutData from "@/data/about.json";
import RevealWrapper from "../UI/RevealWrapper";
import Card from "../UI/Card";
import AboutBackground from "@/components/backgroundAnimation/AboutBackground";
import "./style/About.css";

export default function About() {
  return (
    <>
      <AboutBackground />
      <section className="about">
        <div className="about-container">
          {/* Header */}
          <header className="about-header">
            <RevealWrapper direction="up" delay={240}>
              <h1 className="about-title">{aboutData.company}</h1>
            </RevealWrapper>
            <RevealWrapper direction="up" delay={240}>
              <p className="about-tagline">{aboutData.tagline}</p>
            </RevealWrapper>
            <RevealWrapper direction="up" delay={240}>
              <p className="about-intro">{aboutData.about.intro}</p>
            </RevealWrapper>
          </header>

          {/* Vision + Mission */}
          <RevealWrapper direction="up" delay={240}>
            <div className="about-duo">
              <Card className="about-card" variant="blue-accent">
                <RevealWrapper direction="up" delay={240}>
                  <h3>{aboutData.vision.title}</h3>
                </RevealWrapper>
                <RevealWrapper direction="up" delay={240}>
                  <p>{aboutData.vision.description}</p>
                </RevealWrapper>
              </Card>
              <Card className="about-card"  variant="blue-accent">
                <RevealWrapper direction="up" delay={240}>
                  <h3>{aboutData.mission.title}</h3>
                </RevealWrapper>
                <RevealWrapper direction="up" delay={240}>
                  <p>{aboutData.mission.description}</p>
                </RevealWrapper>
              </Card>
            </div>
          </RevealWrapper>

          {/* What we do */}
          <RevealWrapper direction="up" delay={240}>
            <div className="about-what">
              <RevealWrapper direction="up" delay={240}>
                <h3 className="section-heading">What We Do</h3>
              </RevealWrapper>
              <ul className="about-list">
                {aboutData.whatWeDo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </RevealWrapper>

          {/* Expertise */}
          <RevealWrapper direction="up" delay={240}>
            <div className="about-expertise">
              <RevealWrapper direction="up" delay={240}>
                <h3 className="section-heading">Core Expertise</h3>
              </RevealWrapper>
              <div className="expertise-grid">
                {aboutData.coreExpertise.map((item, i) => (
                  <Card key={i} className="expertise-card" variant="blue-accent">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </RevealWrapper>

          {/* Why choose us */}
          <RevealWrapper direction="up" delay={240}>
            <Card className="about-why" variant="blue-accent">
              <RevealWrapper direction="up" delay={240}>
                <h3 className="section-heading">
                  {aboutData.whyChooseUs.title}
                </h3>
              </RevealWrapper>
              <ul className="about-list muted">
                {aboutData.whyChooseUs.points.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Card>
          </RevealWrapper>

          {/* Philosophy */}
          <RevealWrapper direction="up" delay={240}>
            <Card variant="blue-accent">
              <blockquote className="about-quote">
                “{aboutData.philosophy.quote}”
              </blockquote>
            </Card>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
