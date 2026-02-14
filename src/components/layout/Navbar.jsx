"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import siteData from "@/data/site.json";
import ContactForm from "@/components/contact/ContactForm";
import "./style/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = contactModalOpen ? "hidden" : "";
  }, [contactModalOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          {/* Logo */}
          <Link href="/" className="navbar-logo">
            {siteData.logoText}
          </Link>

          {/* Center Navigation */}
          <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {siteData.navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA inside dropdown */}
            <div className="mobile-cta">
              <button
                className="navbar-cta"
                onClick={() => {
                  setMenuOpen(false);
                  setContactModalOpen(true);
                }}
              >
                Get in Touch
              </button>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-cta">
            <button
              className="navbar-cta"
              onClick={() => setContactModalOpen(true)}
            >
              Get in Touch
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Contact Modal */}
      {contactModalOpen && (
        <div
          className="contact-modal-overlay"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="contact-modal-close"
              onClick={() => setContactModalOpen(false)}
            >
              ✕
            </button>

            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
}
