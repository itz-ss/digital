"use client";

import { useEffect, useRef } from "react";

const ScrollManager = () => {
  const requestRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (requestRef.current) return;
      
      requestRef.current = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        document.documentElement.style.setProperty("--scroll-y", `${scrolled}px`);
        document.documentElement.style.setProperty("--scroll-ratio", `${scrolled / (document.body.scrollHeight - window.innerHeight)}`);
        requestRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return null;
};

export default ScrollManager;
