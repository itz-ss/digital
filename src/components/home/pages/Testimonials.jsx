import testimonialsData from "@/data/testimonial.json";
import Card from "@/components/UI/Card";
import RevealWrapper from "@/components/UI/RevealWrapper";
import "./style/Testimonials.css";

export default function Testimonials() {
  const { title, subtitle, items } = testimonialsData;

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <RevealWrapper direction="up">
            <span className="text-mono section-module">Module // 04 FEEDBACK</span>
            <h2 className="testimonials-title">{title}</h2>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={120}>
            <p className="testimonials-subtitle text-mono">{subtitle}</p>
          </RevealWrapper>
        </div>

        {/* Horizontal Scroll */}
        <div className="testimonials-scroll">
          {items.map((item, index) => (
            <Card className="testimonial-card" key={index} variant="secondary">
              <RevealWrapper direction="up" delay={240}>
                <div className="testimonial-rating">
                  {"★".repeat(item.rating)}
                  <span className="rating-empty">{"☆".repeat(5 - item.rating)}</span>
                </div>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={240}>
                <p className="testimonial-review">“{item.review}”</p>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={240}>
                <div className="testimonial-author">
                  <span className="author-name">{item.name}</span>
                  <span className="text-mono author-designation">
                    SOURCE_{item.designation.replace(/\s+/g, '_').toUpperCase()}
                  </span>
                </div>
              </RevealWrapper>
              
              <div className="text-mono card-status">VERIFIED_SOURCE</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
