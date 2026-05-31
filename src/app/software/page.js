"use client";

import React from "react";
import styles from "./software.module.css";

export default function SoftwarePage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Software Applications</h1>
        <p className={styles.pageSubtitle}>
          A showcase of my utility applications and software tools.
        </p>
      </div>

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
    </div>
  );
}
