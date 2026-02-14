"use client";

import { useState } from "react";
import servicesData from "@/data/services.json";
import Button from "../UI/Button";
import "./style/ContactForm.css";

export default function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        message: ""
      });

    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-container">

        <header className="contact-header">
          <span className="contact-eyebrow">Contact</span>
          <h2>Let’s start the conversation</h2>
          <p>Tell us about your goals and we’ll get back to you shortly.</p>
        </header>

        <form className="contact-form" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-field">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-field">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Service Dropdown */}
          <div className="form-field full">
            <label>Select Service *</label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">Choose a service</option>
              {servicesData.tabs.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="form-field full">
            <label>Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="contact-submit"
            disabled={loading}
            variant="secondary"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>

          {status === "success" && (
            <p className="form-success">
              Message sent successfully. We’ll contact you soon.
            </p>
          )}

          {status === "error" && (
            <p className="form-error">
              Something went wrong. Please try again.
            </p>
          )}

        </form>
      </div>
    </section>
  );
}
