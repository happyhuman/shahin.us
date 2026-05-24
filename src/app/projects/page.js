"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Projects & Explorations</h1>
        <p className={styles.pageSubtitle}>
          A showcase of my software applications and mathematical investigations.
        </p>
      </div>

      {/* SECTION 1: Software Applications */}
      <h2 style={{ fontSize: "1.8rem", margin: "40px 0 20px 0", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
        💻 Software Applications
      </h2>
      <div className={styles.projectsList} style={{ marginBottom: "60px" }}>
        <section className="card">
          <div className={styles.projectHeader}>
            <div>
              <h3 className={styles.projectHeading} style={{ fontSize: "1.4rem" }}>
                The Truly Free QR Generator
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
                No hidden subscriptions, no ads, and no expiring links—just high-quality QR codes that work forever.
              </p>
            </div>
            <span className={styles.projectBadge}>Web App</span>
          </div>

          <p style={{ margin: "16px 0", fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            A lightweight, privacy-focused utility tool designed to help users generate secure, high-resolution QR codes for URLs, text, Wi-Fi passwords, and contact info. Free from the dark patterns of commercial generators.
          </p>

          <a 
            href="https://myfreeqr.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ textDecoration: "none" }}
          >
            Visit myfreeqr.app &rarr;
          </a>
        </section>
      </div>

      {/* SECTION 2: Mathematical Explorations */}
      <h2 style={{ fontSize: "1.8rem", margin: "40px 0 20px 0", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
        📐 Mathematical Explorations
      </h2>
      <div className={styles.projectsList}>
        {/* OEIS A394209 Sequence Visualizer */}
        <section className="card" id="oeis-sequence">
          <div className={styles.projectHeader}>
            <div>
              <h3 className={styles.projectHeading} style={{ fontSize: "1.4rem" }}>OEIS A394209: Prime Interval Count</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
                A custom integer sequence counting primes in half-open ternary intervals.
              </p>
            </div>
            <span className={styles.projectBadge}>Number Theory</span>
          </div>

          <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "16px" }}>
            The <em>n</em>-th term is defined as the number of primes in the half-open interval [3<sup><em>n</em>-1</sup>, 3<sup><em>n</em></sup>) for <em>n</em> &gt; 0.
            This sequence has been registered in the <strong>OEIS (Online Encyclopedia of Integer Sequences)</strong>.
          </p>

          <OeisSequenceVisualizer />
        </section>
      </div>
    </div>
  );
}



/* OEIS A394209 Sequence Visualizer */
function OeisSequenceVisualizer() {
  const [n, setN] = useState(3);
  const [primesList, setPrimesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hardcoded values of a(n) from n=1 to n=18 (OEIS A394209 registered dataset)
  const sequenceTerms = [
    1, 3, 5, 13, 31, 76, 198, 520, 1380, 3741, 10129, 27837, 76805, 213610, 596911, 1675905, 4724994, 13368647
  ];

  // Helper: check if prime
  const isPrime = (num) => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    const limit = Math.sqrt(num);
    for (let i = 3; i <= limit; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const lower = Math.pow(3, n - 1);
      const upper = Math.pow(3, n);
      const list = [];

      let current = lower;
      if (current < 2) current = 2;

      // Ensure start is odd if > 2
      let step = 1;
      if (current > 2) {
        if (current % 2 === 0) current += 1;
        step = 2;
      }

      // Stop once we find 200 primes to keep it lightweight and fast
      while (current < upper && list.length < 200) {
        if (isPrime(current)) {
          list.push(current);
        }
        current += step;
      }

      setPrimesList(list);
      setLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [n]);

  const lowerBound = Math.pow(3, n - 1);
  const upperBound = Math.pow(3, n);
  const totalPrimes = sequenceTerms[n - 1];

  return (
    <div className={styles.canvasWrapper} style={{ alignItems: "stretch" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between" }}>
        
        {/* Left Side: Controls & Details - Stabilized width with minWidth and flex-basis */}
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "16px", minWidth: "280px" }}>
          <div className={styles.rangeSliderRow}>
            <div className={styles.sliderHeader}>
              <span style={{ fontWeight: "700" }}>Select Term (n)</span>
              <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--color-primary)" }}>n = {n}</span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
            />
          </div>

          <div style={{ background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9rem" }}>
            <div style={{ marginBottom: "6px" }}>Interval: <strong>[{lowerBound.toLocaleString()}, {upperBound.toLocaleString()})</strong></div>
            <div>Primes Count: <strong style={{ color: "var(--color-accent)" }}>a({n}) = {totalPrimes.toLocaleString()}</strong></div>
          </div>

          <a 
            href="https://oeis.org/A394209" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            style={{ textDecoration: "none", fontSize: "0.8rem", padding: "8px" }}
          >
            Open A394209 in OEIS &rarr;
          </a>
        </div>

        {/* Right Side: Growth Chart - Stabilized width with minWidth */}
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "8px", minWidth: "280px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}>Growth log-scale (bars represent log10 of counts):</span>
          
          <svg viewBox="0 0 300 100" style={{ background: "rgba(0,0,0,0.3)", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
            {/* Draw Bar chart */}
            {sequenceTerms.map((term, index) => {
              const logVal = Math.log10(term + 1);
              const barHeight = Math.max(3, logVal * 10); 
              const x = 10 + index * 16;
              const y = 82 - barHeight;
              const isActive = index + 1 === n;

              return (
                <g key={index}>
                  <rect
                    x={x}
                    y={y}
                    width="10"
                    height={barHeight}
                    fill={isActive ? "var(--color-primary)" : "var(--border-color-active)"}
                    rx="1.5"
                    style={{ transition: "fill 0.3s ease" }}
                  />
                  <text x={x + 5} y="92" fill="var(--text-secondary)" fontSize="5.5" textAnchor="middle">
                    {index + 1}
                  </text>
                  {isActive && (
                    <text x={x + 5} y={y - 4} fill="var(--color-primary)" fontSize="4.5" textAnchor="middle" fontWeight="bold">
                      {term >= 1000000 ? `${(term/1000000).toFixed(1)}M` : term >= 1000 ? `${(term/1000).toFixed(0)}k` : term}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

      </div>

      {/* Primes list display - Fixed height and opacity-fade calculation state to prevent layout jumps */}
      <div style={{ marginTop: "16px", borderTop: "1px dashed var(--border-color)", paddingTop: "12px" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "8px", height: "16px" }}>
          Primes in [{lowerBound.toLocaleString()}, {upperBound.toLocaleString()}) {totalPrimes > 200 ? "(showing first 200)" : ""}: {loading ? "Computing..." : ""}
        </div>
        <div style={{ 
          height: "105px", 
          overflowY: "auto", 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "6px", 
          padding: "8px", 
          background: "rgba(0,0,0,0.15)", 
          borderRadius: "6px",
          opacity: loading ? 0.45 : 1,
          transition: "opacity 0.15s ease",
          alignContent: "flex-start"
        }}>
          {primesList.map((p, idx) => (
            <span 
              key={idx} 
              style={{ 
                background: "var(--bg-card-hover)", 
                border: "1px solid var(--border-color)", 
                padding: "2px 6px", 
                borderRadius: "4px", 
                fontSize: "0.75rem",
                color: "var(--text-primary)"
              }}
            >
              {p.toLocaleString()}
            </span>
          ))}
          {totalPrimes > 200 && (
            <span 
              style={{ 
                background: "rgba(99, 102, 241, 0.1)", 
                border: "1px dashed var(--border-color-active)", 
                padding: "2px 8px", 
                borderRadius: "4px", 
                fontSize: "0.75rem",
                color: "var(--color-primary)",
                fontWeight: "bold"
              }}
            >
              ... and {(totalPrimes - 200).toLocaleString()} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
