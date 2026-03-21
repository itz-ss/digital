"use client";

import { useEffect, useRef } from "react";
import "./style/ArcReactor.css";

export default function ArcReactorBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const layerRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!layerRef.current) return;
      const xPct = (e.clientX / window.innerWidth - 0.5) * 12;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 12;
      layerRef.current.style.transform = `translate(${xPct}px, ${yPct}px)`;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="arc-bg" aria-hidden="true">

      {/* ── BASE GRID ── */}
      <div className="arc-grid" />
      <div className="arc-grid arc-grid--diagonal" />

      {/* ── PARALLAX LAYER (mouse-reactive) ── */}
      <div ref={layerRef} className="arc-parallax">

        {/* ── GYROSCOPE SYSTEM ── */}
        <div className="gyro-wrap">

          {/* Central singularity */}
          <div className="singularity">
            <div className="singularity-inner" />
            <div className="singularity-ring" />
          </div>

          {/* Rings */}
          <div className="gyro-ring gyro-r1" />
          <div className="gyro-ring gyro-r2" />
          <div className="gyro-ring gyro-r3" />
          <div className="gyro-ring gyro-r4" />
          <div className="gyro-ring gyro-r5" />

          {/* Orbital arc (asymmetric) */}
          <div className="arc-orbit arc-orbit--a" />
          <div className="arc-orbit arc-orbit--b" />
          <div className="arc-orbit arc-orbit--c" />

          {/* Data nodes on orbit */}
          <div className="orbit-nodes orbit-nodes--1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`data-node node-${i}`} />
            ))}
          </div>
          <div className="orbit-nodes orbit-nodes--2">
            {[0, 1].map((i) => (
              <div key={i} className={`data-node data-node--sm node-sm-${i}`} />
            ))}
          </div>

          {/* Pulse waves */}
          <div className="pulse-wave pw-1" />
          <div className="pulse-wave pw-2" />
          <div className="pulse-wave pw-3" />
        </div>

      </div>

      {/* ── CORNER HUD BRACKETS ── */}
      <div className="hud-bracket hud-bracket--tl">
        <div className="bracket-line bl-h" />
        <div className="bracket-line bl-v" />
        <span className="bracket-code">SYS:ACTIVE</span>
      </div>
      <div className="hud-bracket hud-bracket--tr">
        <div className="bracket-line bl-h" />
        <div className="bracket-line bl-v" />
        <span className="bracket-code">MK·85</span>
      </div>
      <div className="hud-bracket hud-bracket--bl">
        <div className="bracket-line bl-h" />
        <div className="bracket-line bl-v" />
        <span className="bracket-code">Ω 3.14</span>
      </div>
      <div className="hud-bracket hud-bracket--br">
        <div className="bracket-line bl-h" />
        <div className="bracket-line bl-v" />
        <span className="bracket-code">JARVIS</span>
      </div>

      {/* ── EDGE SCAN LINES ── */}
      <div className="scan-h scan-h--top" />
      <div className="scan-h scan-h--bot" />

      {/* ── ENERGY PIPS ── */}
      <div className="pips-layer">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`pip pip-${i + 1}`} />
        ))}
      </div>

      {/* ── VIGNETTE ── */}
      <div className="arc-vignette" />
    </div>
  );
}
