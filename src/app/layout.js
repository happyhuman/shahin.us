import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { siteConfig } from "@/config";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Shahin | Personal Website",
  description: "Explore my interactive projects, applications, mathematical visualizations, and personal portfolio.",
  authors: [{ name: "Shahin Saadati" }],
  openGraph: {
    title: "Shahin Saadati | Personal Website",
    description: "Explore my interactive projects, applications, mathematical visualizations, and personal portfolio.",
    url: "https://shahin.us",
    siteName: "Shahin | Personal Website",
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shahin Saadati",
  "givenName": "Shahin",
  "familyName": "Saadati",
  "jobTitle": "Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Google",
  },
  "alumniOf": [
    {
      "@type": "EducationalOrganization",
      "name": "UC Berkeley",
    },
  ],
  "url": "https://shahin.us",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable}`}
      data-palette="aurora"
      data-background="mesh"
    >
      <body>
        {/* JSON-LD Structured Data for Search Engine Optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* MathJax Configuration and Script */}
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
            window.MathJax = {
              tex: {
                inlineMath: [['\\\\(', '\\\\)']],
                displayMath: [['\\\\[', '\\\\]']]
              },
              options: {
                enableMenu: false
              }
            };
          `}
        </Script>
        <Script
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="lazyOnload"
        />

        {/* Decorative dynamic background mesh/grid wrapper */}
        <div className="app-bg-wrapper"></div>

        <header className="header">
          <div className="container nav-container">
            <Link href="/" className="logo">
              {siteConfig.logoText}
            </Link>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/software" className="nav-link">
                    Software
                  </Link>
                </li>
                <li>
                  <Link href="/math" className="nav-link">
                    Math
                  </Link>
                </li>
                <li>
                  <Link href="/interests" className="nav-link">
                    Interests
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <div className="container">{children}</div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
