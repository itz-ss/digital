import howWeWorkData from "@/data/howWeWork.json";
import RevealWrapper from "@/components/UI/RevealWrapper";
import "./style/HowWeWorkTimeline.css";
import Card from "@/components/UI/Card";

export default function HowWeWorkTimeline() {
  return (
    <section className="how-we-work">
      <div className="how-we-work-container">

        {/* Header */}
        <header className="how-we-work-header">
          <RevealWrapper direction="up">  
             <span className="how-we-work-eyebrow">
            {howWeWorkData.title}
           </span>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={120}>  
            <h2 className="how-we-work-title">
            {howWeWorkData.subheading}
          </h2>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={240}>  
          <p className="how-we-work-description">
            {howWeWorkData.description}
          </p>
          </RevealWrapper>
        </header>

        {/* Timeline */}
        <div className="how-we-work-timeline">
          <div className="how-we-work-line" />
          <RevealWrapper direction="up" delay={240}>  
          {howWeWorkData.steps.map((step, index) => (
            <div key={step.id} className="how-we-work-step">
              <span className="step-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="step-dot" />
              <Card variant="blue-accent">  
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              </Card>
            </div>
          ))}
          </RevealWrapper>
        </div>

      </div>
    </section>
  );
}
