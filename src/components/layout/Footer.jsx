import Link from "next/link";
import siteData from "@/data/site.json";
import servicesData from "@/data/services.json";
import "./style/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand-block">
            <span className="footer-brand">
              {siteData.name}
            </span>
            <p className="footer-tagline">
              {siteData.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="footer-columns">

            {/* Services */}
            <div className="footer-column">
              <h4>Services</h4>
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
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/work">Work</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
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
