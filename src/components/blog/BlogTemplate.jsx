'use client';

import React from 'react';
import Link from 'next/link';
import RevealWrapper from "../UI/RevealWrapper";
import ServicesBackground from "@/components/backgroundAnimation/ServicesBackground";
import siteData from "@/data/site.json";
import contactData from "@/data/contact.json";
import "./style/BlogTemplate.css";

export default function BlogTemplate({ blog }) {
  return (
    <>
      <ServicesBackground />
      <article className="blog-template">
        <div className="blog-container">
          <header className="blog-header">
            <RevealWrapper direction="up" delay={100}>
              <span className="blog-category">{blog.category}</span>
            </RevealWrapper>
            
            <RevealWrapper direction="up" delay={200}>
              <h1 className="blog-title">{blog.title}</h1>
            </RevealWrapper>
            
            <RevealWrapper direction="up" delay={300}>
              <div className="blog-meta">
                <span>{blog.date}</span> • <span>{blog.author}</span>
              </div>
            </RevealWrapper>
          </header>

          <RevealWrapper direction="up" delay={400}>
            <div className="blog-content">
              {/* This would normally be rendered from Markdown or CMS content */}
              <p className="blog-excerpt">{blog.excerpt}</p>
              <div className="blog-body">
                {blog.content}
                <p>
                  At {siteData.name}, we specialize in helping businesses in {siteData.city} and beyond reach their full potential. 
                  Our data-driven strategies are designed to deliver measurable results and sustainable growth.
                </p>
                <h3>Key Takeaways:</h3>
                <ul>
                  <li>Focus on local relevance for {siteData.city} audiences.</li>
                  <li>Optimize for both users and search engines.</li>
                  <li>Leverage social media to amplify your reach.</li>
                </ul>
              </div>
            </div>
          </RevealWrapper>

          <footer className="blog-footer">
            <RevealWrapper direction="up" delay={200}>
              <div className="blog-cta">
                <h3>Boost Your Business with {siteData.name}</h3>
                <p>{contactData.subtitle}</p>
                <Link href="/#contact" className="btn-primary">{siteData.uiContent.common.buttons.scheduleCall}</Link>
              </div>
            </RevealWrapper>
            <Link href="/blog" className="back-link">← Back to Blog</Link>
          </footer>
        </div>
      </article>
    </>
  );
}
