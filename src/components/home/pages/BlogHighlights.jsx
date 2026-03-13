"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import RevealWrapper from "../../UI/RevealWrapper";
import blogsData from "@/data/blogs.json";
import siteData from "@/data/site.json";
import "./style/BlogHighlights.css";

export default function BlogHighlights() {
  const blogs = blogsData.blogs;
  
  // Logic to rotate 3 blogs every 7 days
  const highlightedBlogs = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    
    // Get current date and week number
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);
    
    // Use weekNumber as a seed to pick 3 blogs
    const startIndex = (weekNumber % Math.max(1, blogs.length - 2)) % blogs.length;
    
    // Pick 3 blogs starting from that index (wrap around if needed)
    return [
      blogs[startIndex],
      blogs[(startIndex + 1) % blogs.length],
      blogs[(startIndex + 2) % blogs.length]
    ];
  }, [blogs]);

  return (
    <section className="blog-highlights">
      <div className="container">
        <RevealWrapper direction="up" delay={100}>
          <div className="section-header">
            <span className="eyebrow">{siteData.uiContent.common.buttons.viewAllServices}</span>
            <h2 className="section-title">Weekly <span className="gradient-text">Highlights</span></h2>
            <p className="section-subtitle">Stay updated with the latest digital marketing trends and strategies from DigitalGram.</p>
          </div>
        </RevealWrapper>

        <div className="highlights-grid-container">
          <div className="highlights-grid">
            {highlightedBlogs.map((blog, index) => (
              <RevealWrapper key={blog.slug} direction="up" delay={200 * (index + 1)}>
                <Link href={`/blog/${blog.slug}`} className="highlight-card">
                  <div className="card-content">
                    <span className="card-category">{blog.category}</span>
                    <h3 className="card-title">{blog.title}</h3>
                    <p className="card-excerpt">{blog.excerpt}</p>
                    <div className="card-footer">
                      <span className="card-date">{blog.date}</span>
                      <span className="read-more">Read Article →</span>
                    </div>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
