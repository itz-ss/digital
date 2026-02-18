import contactData from "@/data/contact.json";
import Card from "@/components/UI/Card";
import "./style/ContactCTA.css";
import RevealWrapper from "@/components/UI/RevealWrapper";

export default function ContactCTA() {
  const { title, subtitle, contactInfo, socialLinks } = contactData;

  return (
    <section className="contact-cta">
      <div className="contact-cta-container">
        {/* Header */}
        <div className="contact-cta-header">
          <RevealWrapper direction="up">
            <h2 className="contact-cta-title">{title}</h2>
          </RevealWrapper>
          <RevealWrapper direction="up" delay={120}>
            <p className="contact-cta-subtitle">{subtitle}</p>
          </RevealWrapper>
        </div>

        {/* Contact Info */}
        <div className="contact-cta-info">
          {Object.values(contactInfo).map((item, index) => (
            <Card
              key={index}
              href={item.href}
              className="contact-info-item"
              variant="blue-accent"
            >
              <RevealWrapper direction="up" delay={240}>
                <span className="contact-info-label">{item.label}</span>
              </RevealWrapper>
              <RevealWrapper direction="up" delay={240}>
                <span className="contact-info-value">{item.value}</span>
              </RevealWrapper>
            </Card>
          ))}
        </div>

        {/* Social Links */}
        <div className="contact-cta-social">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <RevealWrapper direction="up" delay={240}>
                {social.platform}
              </RevealWrapper>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
