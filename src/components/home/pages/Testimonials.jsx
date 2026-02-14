import testimonialsData from "@/data/testimonial.json";
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
          <h2 className="testimonials-title">{title}</h2>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={120}>  
          <p className="testimonials-subtitle">{subtitle}</p>
          </RevealWrapper>
        </div>

        {/* Horizontal Scroll */}
        <div className="testimonials-scroll">
          {items.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <RevealWrapper direction="up" delay={240}>  
              <div className="testimonial-rating">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={240}>  
              <p className="testimonial-review">“{item.review}”</p>
              </RevealWrapper>

              <RevealWrapper direction="up" delay={240}>  
              <div className="testimonial-author">
                <span className="author-name">{item.name}</span>
                <span className="author-designation">
                  {item.designation}
                </span>
                </div>
              </RevealWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
