import Link from "next/link";
import siteData from "@/data/site.json";
import servicesData from "@/data/services.json";
import contactData from "@/data/contact.json";
import "./style/Footer.css";

export default function Footer() {
  const ui = siteData.uiContent;
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand-block">
            <Link href="/" className="footer-logo">
              {siteData.logo?.footer ? (
                <img 
                  src={siteData.logo.footer} 
                  alt={siteData.logo.alt || siteData.name} 
                  className="footer-logo-img"
                />
              ) : (
                <span className="footer-brand">{siteData.name}</span>
              )}
            </Link>
            <p className="footer-tagline">
              {siteData.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="footer-columns">

            {/* Services */}
            <div className="footer-column">
              <h4>{ui.pseo.titles.features}</h4>
              <ul>
                {servicesData.tabs.slice(0, 6).map(service => (
                  <li key={service.id}>
                    <Link href={`/services/${service.id}`}>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="footer-column">
            <h4>{ui.pseo.titles.company}</h4>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/work">Work</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-column">
            <h4>{ui.pseo.titles.resources}</h4>
              <ul>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-column">
              <h4>{ui.contact.eyebrow}</h4>
              <ul className="footer-contact-list">
                <li>
                  <a href={contactData.contactInfo.email.href}>
                    {contactData.contactInfo.email.value}
                  </a>
                </li>
                <li>
                  <a href={contactData.contactInfo.phone.href}>
                    {contactData.contactInfo.phone.value}
                  </a>
                </li>
                <li>
                  <a href={contactData.contactInfo.whatsapp.href} target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteData.name}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
