"use client";

import { useEffect, useState } from "react";
import "./style/ThemeSwitcher.css";

const themes = [
  {
    id: "cyan",
    label: "MK-85 CYAN",
    color: "#00D1FF",
    gradient: "linear-gradient(135deg, #00D1FF, #0088CC)",
  },
  {
    id: "orange",
    label: "STARK LEGACY",
    color: "#FF7B00",
    gradient: "linear-gradient(135deg, #FF7B00, #CC6200)",
  },
  {
    id: "red",
    label: "WARPATH",
    color: "#E11D48",
    gradient: "linear-gradient(135deg, #E11D48, #9F1239)",
  },
  {
    id: "green",
    label: "OVERRIDE",
    color: "#22C55E",
    gradient: "linear-gradient(135deg, #22C55E, #15803D)",
  },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("cyan");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("jarvis_theme") || "cyan";
    setCurrentTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (themeId) => {
    if (themeId === "cyan") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem("jarvis_theme", themeId);
  };

  const active = themes.find((t) => t.id === currentTheme);

  return (
    <div className={`theme-switcher-wrapper ${isOpen ? "open" : ""}`}>
      {/* Toggle Button */}
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen((p) => !p)}
        title="Color Scheme"
        aria-label="Toggle theme switcher"
        style={{ "--btn-color": active?.color }}
      >
        <span className="theme-toggle-icon">◈</span>
      </button>

      {/* Panel */}
      <div className="theme-panel" role="listbox" aria-label="Color scheme options">
        <div className="theme-panel-header">
          <span className="theme-panel-label">COLOR SCHEME</span>
          <span className="theme-panel-status">{active?.label}</span>
        </div>

        <div className="theme-options-grid">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`theme-option-btn ${currentTheme === theme.id ? "active" : ""}`}
              onClick={() => handleThemeChange(theme.id)}
              title={theme.label}
              aria-label={theme.label}
              aria-selected={currentTheme === theme.id}
              style={{ "--option-gradient": theme.gradient, "--option-color": theme.color }}
            >
              <span className="theme-swatch" />
              {currentTheme === theme.id && (
                <span className="theme-check">✓</span>
              )}
              <span className="theme-option-label">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
