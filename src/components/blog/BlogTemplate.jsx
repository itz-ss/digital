'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RevealWrapper from "../UI/RevealWrapper";
import ServicesBackground from "@/components/backgroundAnimation/ServicesBackground";
import blogsData from "@/data/blogs.json";
import siteData from "@/data/site.json";
import contactData from "@/data/contact.json";
import "./style/BlogTemplate.css";

export default function BlogTemplate({ blog }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [randomBlogs, setRandomBlogs] = useState([]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    // Initialize random blogs on mount to avoid hydration mismatch
    const filtered = blogsData.blogs
      .filter(b => b.slug !== blog.slug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setRandomBlogs(filtered);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog.slug]);

  // Calculate reading time
  const readingTime = Math.ceil((blog.content + blog.excerpt).split(/\s+/).length / 200);

  const allBlogs = blogsData.blogs;
  const currentIndex = allBlogs.findIndex(b => b.slug === blog.slug);
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  const labels = siteData.uiContent.blog.labels;
  const ctaHeading = labels.ctaHeading.replace('{name}', siteData.name);

  // Takeaways logic: use blog specific or default from site.json
  const rawTakeaways = blog.takeaways || siteData.uiContent.blog.defaultTakeaways;
  const takeaways = rawTakeaways.map(t => t.replace('{city}', siteData.city));

  return (
    <>
      <ServicesBackground />
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <article className="blog-template">
        <header className="blog-hero">
          <div className={`hero-overlay theme-${blog.theme || 'default'}`}></div>
          <div className="blog-container">
            <RevealWrapper direction="up" delay={100}>
              <div className="blog-badge-wrapper">
                <span className="blog-category-badge">{blog.category}</span>
                <span className="reading-time">{readingTime} {labels.minRead}</span>
              </div>
            </RevealWrapper>
            
            <RevealWrapper direction="up" delay={200}>
              <h1 className="blog-title-main">{blog.title}</h1>
            </RevealWrapper>
            
            <RevealWrapper direction="up" delay={300}>
              <div className="blog-author-meta">
                <div className="author-avatar">{blog.author.charAt(0)}</div>
                <div className="author-info">
                  <span className="author-name">{blog.author}</span>
                  <span className="blog-publish-date">{blog.date}</span>
                </div>
              </div>
            </RevealWrapper>
          </div>
        </header>

        <div className="blog-container">

          <RevealWrapper direction="left" delay={400}>
            <div className="blog-content">
              <p className="blog-excerpt">{blog.excerpt}</p>
              <div className="blog-body">
                {blog.content}
                
                <div className="key-takeaways">
                  <div className="takeaways-header">
                    <span className="takeaways-icon">💡</span>
                    <h3>{labels.keyTakeaways}</h3>
                  </div>
                  <ul className="takeaways-list">
                    {takeaways.map((point, i) => (
                      <li key={i}>
                        <span className="check-icon">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealWrapper>


          <RevealWrapper direction="up" delay={200}>
            <div className="blog-highlights-section">
              <h2 className="highlights-title">{labels.weeklyHighlights}</h2>
              <div className="highlights-grid-container">
                <div className="highlights-grid">
                  {mounted && randomBlogs.map(item => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="small-highlight-card">
                      <span className="card-tag">{item.category}</span>
                      <h4>{item.title}</h4>
                      <p>{item.excerpt.substring(0, 80)}...</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </RevealWrapper>

          <footer className="blog-footer">
            <RevealWrapper direction="up" delay={200}>
              <div className="blog-cta">
                <h3>{ctaHeading}</h3>
                <p>{contactData.subtitle}</p>
                <Link href="/#contact" className="btn-primary">{siteData.uiContent.common.buttons.scheduleCall}</Link>
              </div>
            </RevealWrapper>
            <Link href="/blog" className="back-link">← {labels.backToBlog}</Link>
          </footer>
        </div>
      </article>
    </>
  );
}
