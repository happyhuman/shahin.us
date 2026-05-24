"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./projects.module.css";

export default function ProjectsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.projectsContainer}>
      {/* Left panel menu with two main sections: Apps and Math */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarGroup}>
          <div className={styles.sidebarHeader}>Menu</div>
          <ul className={styles.sidebarMenu}>
            <li>
              <Link
                href="/projects/apps"
                className={`${styles.sidebarLink} ${
                  pathname?.startsWith("/projects/apps") ? styles.sidebarLinkActive : ""
                }`}
              >
                <span className={styles.icon}>📱</span>
                <span>Apps</span>
              </Link>
            </li>
            <li>
              <Link
                href="/projects/math"
                className={`${styles.sidebarLink} ${
                  pathname?.startsWith("/projects/math") ? styles.sidebarLinkActive : ""
                }`}
              >
                <span className={styles.icon}>📐</span>
                <span>Math</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main page content area */}
      <section className={styles.contentArea}>{children}</section>
    </div>
  );
}
