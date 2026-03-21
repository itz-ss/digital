"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import siteData from "@/data/site.json";
import Button from "@/components/UI/Button";
import ContactForm from "@/components/contact/ContactForm";
import "./style/Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Scroll Detection for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = contactModalOpen ? "hidden" : "";
  }, [contactModalOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">

          {/* Logo */}
          <Link href="/" className="navbar-logo">
            {siteData.logo?.header ? (
              <img
                src={siteData.logo.header}
                alt={siteData.logo.alt || siteData.name}
                className="nav-logo-img"
              />
            ) : (
              siteData.logoText
            )}
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
            <div className="mobile-cta-container">
              <Button
                className="navbar-cta w-full"
                onClick={() => {
                  setMenuOpen(false);
                  setContactModalOpen(true);
                }}
                variant="primary"
              >
                {siteData.uiContent.common.buttons.getInTouch}
              </Button>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-cta">
            <Button
              className="navbar-cta"
              onClick={() => setContactModalOpen(true)}
              variant="primary"
            >
              {siteData.uiContent.common.buttons.getInTouch}
            </Button>
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
