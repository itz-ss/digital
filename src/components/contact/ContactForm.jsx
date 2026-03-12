"use client";

import { useState } from "react";
import servicesData from "@/data/services.json";
import siteData from "@/data/site.json";
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
          <span className="contact-eyebrow">{siteData.uiContent.contact.eyebrow}</span>
          <h2>{siteData.uiContent.contact.heading}</h2>
          <p>{siteData.uiContent.contact.subheading}</p>
        </header>

        <form className="contact-form" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-field">
            <label>{siteData.uiContent.contact.fields.name}</label>
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
            <label>{siteData.uiContent.contact.fields.email}</label>
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
            <label>{siteData.uiContent.contact.fields.service}</label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">{siteData.uiContent.common.placeholders.chooseService}</option>
              {servicesData.tabs.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="form-field full">
            <label>{siteData.uiContent.contact.fields.message}</label>
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
            {loading ? siteData.uiContent.common.buttons.sending : siteData.uiContent.common.buttons.sendMessage}
          </Button>

          {status === "success" && (
            <p className="form-success">
              {siteData.uiContent.contact.success}
            </p>
          )}

          {status === "error" && (
            <p className="form-error">
              {siteData.uiContent.contact.error}
            </p>
          )}

        </form>
      </div>
    </section>
  );
}
