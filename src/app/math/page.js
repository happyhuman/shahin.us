"use client";

import React, { useState, useEffect } from "react";
import styles from "./math.module.css";

export default function MathPage() {
  // Typeset math equations once loaded
  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, []);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Mathematical Explorations</h1>
        <p className={styles.pageSubtitle}>
          Interactive visualizations and investigations in number theory and discrete structures.
        </p>
      </div>

      {/* OEIS Sequences Section */}
      <section id="oeis-sequences" style={{ marginTop: "16px", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "8px", color: "var(--text-primary)" }}>
          OEIS Sequences
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "28px" }}>
          {"The On-Line Encyclopedia of Integer Sequences (OEIS) is a database of integer sequences. Below are my contributions:"}
        </p>

        <div className={styles.projectsList}>
          {/* OEIS A394209 Sequence Visualizer */}
          <section className="card" id="oeis-sequence">
            <div className={styles.projectHeader}>
              <div>
                <h3 className={styles.projectHeading} style={{ fontSize: "1.4rem" }}>
                  OEIS A394209: Prime Interval Count
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
                  A custom integer sequence counting primes in half-open ternary intervals.
                </p>
              </div>
              <span className={styles.projectBadge}>Number Theory</span>
            </div>

            <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "16px" }}>
              {"The \\(n\\)-th term is defined as the number of primes in the half-open interval \\([3^{n-1}, 3^n)\\) for \\(n > 0\\)."}
            </p>

            <OeisSequenceVisualizer />
          </section>

          {/* OEIS A392341 Sequence Visualizer */}
          <section className="card" id="oeis-sequence-square-gcd">
            <div className={styles.projectHeader}>
              <div>
                <h3 className={styles.projectHeading} style={{ fontSize: "1.4rem" }}>
                  OEIS A392341: Perfect Square GCD Pairs
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
                  A custom integer sequence counting pairs with perfect square greatest common divisors.
                </p>
              </div>
              <span className={styles.projectBadge}>Number Theory</span>
            </div>

            <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "16px" }}>
              {"The \\(n\\)-th term of this sequence counts the number of pairs \\((x, y)\\) with \\(1 \\le x < y \\le n\\) such that \\(\\gcd(x, y)\\) is a perfect square."}
            </p>

            <OeisSquareGcdVisualizer />
          </section>
        </div>
      </section>
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
        
        {/* Left Side: Controls & Details */}
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

        {/* Right Side: Growth Chart */}
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

      {/* Primes list display */}
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

/* OEIS A392341 Sequence Visualizer */
function OeisSquareGcdVisualizer() {
  const [n, setN] = useState(60);
  const [hoveredCell, setHoveredCell] = useState(null);
  const canvasRef = React.useRef(null);

  // Helper: compute greatest common divisor
  const gcd = (a, b) => {
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  // Helper: check if a number is a perfect square
  const isSquare = (num) => {
    const root = Math.round(Math.sqrt(num));
    return root * root === num;
  };

  // Calculate a(n) dynamically for the selected n limit
  const calculateAn = (limit) => {
    let count = 0;
    for (let x = 1; x <= limit; x++) {
      for (let y = x + 1; y <= limit; y++) {
        const g = gcd(x, y);
        const root = Math.round(Math.sqrt(g));
        if (root * root === g) {
          count++;
        }
      }
    }
    return count;
  };

  const totalPairs = (n * (n - 1)) / 2;
  const aN = calculateAn(n);
  const percentage = totalPairs > 0 ? ((aN / totalPairs) * 100).toFixed(2) : "0.00";

  // Draw grid on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const cellSize = width / n;

    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        const col = x - 1;
        const row = y - 1;
        const cx = col * cellSize;
        const cy = row * cellSize;

        if (x >= y) {
          // Empty lower triangular and diagonal
          continue;
        }

        const g = gcd(x, y);
        const square = isSquare(g);

        // Check if hovered
        const isHovered = hoveredCell && hoveredCell.x === x && hoveredCell.y === y;

        if (square) {
          ctx.fillStyle = isHovered ? "#22d3ee" : "#06b6d4"; // Cyan for perfect square GCD
        } else {
          ctx.fillStyle = isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.04)"; // Faint gray for non-square GCD
        }

        // Draw cell
        ctx.fillRect(cx + 0.5, cy + 0.5, cellSize - 1, cellSize - 1);

        // Highlight border if hovered
        if (isHovered) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = Math.max(1, cellSize * 0.15);
          ctx.strokeRect(cx + 0.5, cy + 0.5, cellSize - 1, cellSize - 1);
        }
      }
    }
  }, [n, hoveredCell]);

  // Handle canvas mouse move to set hovered cell
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const xPos = (e.clientX - rect.left) * scaleX;
    const yPos = (e.clientY - rect.top) * scaleY;

    const cellSize = canvas.width / n;
    const col = Math.floor(xPos / cellSize);
    const row = Math.floor(yPos / cellSize);

    const x = col + 1;
    const y = row + 1;

    if (x >= 1 && x <= n && y >= 1 && y <= n && x < y) {
      const g = gcd(x, y);
      setHoveredCell({ x, y, gcd: g, isSquare: isSquare(g) });
    } else {
      setHoveredCell(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className={styles.canvasWrapper} style={{ alignItems: "stretch" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between" }}>
        
        {/* Left Side: Controls & Details */}
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "16px", minWidth: "280px" }}>
          <div className={styles.rangeSliderRow}>
            <div className={styles.sliderHeader}>
              <span style={{ fontWeight: "700" }}>Grid Limit (n)</span>
              <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--color-primary)" }}>n = {n}</span>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
            />
          </div>

          <div style={{ background: "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>{"Total Pairs (\\(1 \\le x < y \\le n\\)): "}<strong>{totalPairs.toLocaleString()}</strong></div>
            <div>{"Square GCD Pairs: \\(a(n)\\) = "}<strong style={{ color: "var(--color-accent)" }}>{aN.toLocaleString()}</strong></div>
            <div>Proportion: <strong style={{ color: "var(--color-primary)" }}>{percentage}%</strong></div>
          </div>

          <a 
            href="https://oeis.org/A392341" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            style={{ textDecoration: "none", fontSize: "0.8rem", padding: "8px", textAlign: "center" }}
          >
            Open A392341 in OEIS &rarr;
          </a>
        </div>

        {/* Right Side: Grid Canvas */}
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "8px", minWidth: "280px", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)", alignSelf: "flex-start" }}>
            {"Upper-triangular pair grid (\\(1 \\le x < y \\le n\\)):"}
          </span>

          <div style={{ position: "relative", width: "300px", height: "300px" }}>
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className={styles.mathCanvas}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ display: "block" }}
            />
          </div>

          {/* Color Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", fontSize: "0.75rem", marginTop: "8px", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", background: "#06b6d4" }}></span>
              <span style={{ color: "var(--text-secondary)" }}>Perfect Square GCD</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "2px", background: "rgba(255, 255, 255, 0.08)", border: "1px solid var(--border-color)" }}></span>
              <span style={{ color: "var(--text-secondary)" }}>Non-Square GCD</span>
            </div>
          </div>
        </div>

      </div>

      {/* Live Tooltip / Status Display */}
      <div style={{ 
        width: "100%", 
        minHeight: "36px", 
        background: "rgba(0,0,0,0.3)", 
        borderRadius: "6px", 
        border: "1px solid var(--border-color)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        fontSize: "0.8rem", 
        color: hoveredCell ? "var(--text-primary)" : "var(--text-secondary)",
        padding: "8px",
        marginTop: "8px"
      }}>
        {hoveredCell ? (
          <div>
            Pair: <strong>({hoveredCell.x}, {hoveredCell.y})</strong> &nbsp;|&nbsp; 
            gcd({hoveredCell.x}, {hoveredCell.y}) = <strong style={{ color: hoveredCell.isSquare ? "var(--color-accent)" : "inherit" }}>{hoveredCell.gcd}</strong> &nbsp;|&nbsp;
            Status: <span style={{ color: hoveredCell.isSquare ? "#34d399" : "#f87171", fontWeight: "bold" }}>
              {hoveredCell.isSquare ? `Perfect Square (${Math.sqrt(hoveredCell.gcd)}²)` : "Not a Square"}
            </span>
          </div>
        ) : (
          <span>Hover over cells in the grid to inspect the pairs and their Greatest Common Divisors</span>
        )}
      </div>
    </div>
  );
}
